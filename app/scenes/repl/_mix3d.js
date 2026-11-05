/*
 * with3d(): voegt aan een gewone 2D-scène (SVG) stappen toe die een echte PDB-structuur in 3D tonen.
 *
 *   export default with3d(scene2d, {
 *     models: { ku: { pdb: '1JEY', format: 'pdb', up: [selA, selB], rotate: [['x', 90]] }, … },   // up/rotate: beginoriëntatie
 *     after: { 1: [ { dur, title, text, model: 'ku', show: [ { sel, style, label? }, … ], zoom: sel, spin }, … ] },
 *   });
 *
 * - after[k]: 3D-stappen die na 2D-stap k (index in scene2d.steps) worden ingevoegd. De 2D-stappen blijven ongewijzigd:
 *   de oorspronkelijke update() krijgt altijd haar eigen stapnummers en tijden. Tijdens een 3D-stap blijft de SVG op het
 *   eindbeeld van stap k staan (zelfde camera), zodat de overgang 2D → 3D → 2D aansluit zoals vroeger k → k+1.
 * - Een 3D-laag per model ligt over de SVG (eigen achtergrond) en vloeit in ~0,7 s in en uit; de engine laat het vorige
 *   SVG-beeld er nog onder vervagen. Zo is er nooit een leeg beeld, ook niet bij terugspringen of klikken op de tijdlijn.
 * - Elke 3D-stap legt zijn stijlen volledig vast (show), dus het beeld hangt alleen van de stap af (vooruit/achteruit gelijk).
 *   Draaien gebeurt rustig op de echte klok (zoals structure3d), ook terwijl de stap op het eindbeeld wacht.
 * - In de testhulpmiddelen (tools/*.html, zonder api.node) wordt er geen 3D geladen: daar telt alleen de SVG.
 */
import { L, SPIN } from '../../kit.js';
import { load3Dmol } from '../../kit3d.js';
import { pdbUrl } from '../../../shared/pdb.js';

const FADE = 700;                                  // ms in- of uitvloeien van de 3D-laag

export function with3d(scene, { models, after }) {
  /* stappen samenstellen + per stap: welke 2D-stap (o) en of het een 3D-stap is */
  const steps = [], map = [];
  scene.steps.forEach((st, i) => {
    steps.push(st); map.push({ o: i, d3: null });
    for (const s3 of after[i] ?? []) { steps.push({ cam: st.cam, ...s3 }); map.push({ o: i, d3: s3 }); }
  });
  const oStart = i => scene.steps.slice(0, i).reduce((a, x) => a + x.dur, 0);

  return {
    ...scene,
    steps,
    init(svg, api = {}) {
      const inner = scene.init?.(svg, api) ?? null;
      let lastKey = '';
      const upd2d = (o, p) => {
        const t = oStart(o) + scene.steps[o].dur * p, key = `${o}|${p}`;
        if (key === lastKey) return;
        lastKey = key;
        inner?.update?.(t, { step: o, p, t, total: 0 });
      };
      const live = !!api.node && svg.parentNode;       // alleen in de echte app 3D tonen
      if (!live) return {
        update(t, s) { const m = map[s.step]; upd2d(m.o, m.d3 ? 1 - 1 / scene.steps[m.o].dur : s.p); },
        destroy() { inner?.destroy?.(); },
      };

      /* SVG-inhoud in één groep, zodat de klikbare onderdelen (en hun labels) tijdens 3D-stappen verdwijnen */
      const NS = 'http://www.w3.org/2000/svg', g2d = document.createElementNS(NS, 'g');
      for (const ch of [...svg.childNodes]) if (!(ch.nodeName === 'defs' || ch.nodeName === 'style')) g2d.append(ch);
      svg.append(g2d);

      /* één 3D-laag per model */
      const layer = svg.parentNode, panes = {};
      for (const [key, m] of Object.entries(models)) {
        const el = document.createElement('div');
        el.className = 'mix3d';
        el.style.cssText = 'position:absolute;inset:0;background:#0b1224;opacity:0;visibility:hidden;pointer-events:none';
        el.innerHTML = `<div class="v3d"></div>
          <div class="load3d">${L({ nl: `Structuur ${m.pdb} laden uit de Protein Data Bank…`, en: `Loading structure ${m.pdb} from the Protein Data Bank…` })}</div>
          <a class="pdbtag" href="https://www.rcsb.org/structure/${m.pdb}" target="_blank" rel="noopener">PDB ${m.pdb} ↗</a>`;
        layer.append(el);
        panes[key] = { m, el, v: el.querySelector('.v3d'), viewer: null, ready: false, op: 0, step: -1, labels: [], w: 0, h: 0 };
      }
      let dead = false, started = false, first = true, lastNow = performance.now(), lastSpin = lastNow, k2d = '';

      function start() {
        started = true;
        for (const P of Object.values(panes)) {
          Promise.all([load3Dmol(), fetch(pdbUrl(P.m.pdb, P.m.format ?? 'cif')).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })]).then(([M, txt]) => {
            if (dead) return;
            P.viewer = M.createViewer(P.v, { backgroundColor: '#0b1224', antialias: true });
            P.viewer.addModel(txt, (P.m.format ?? 'cif') === 'cif' ? 'cif' : 'pdb');
            P.viewer.setStyle({}, {});
            P.viewer.zoomTo();
            if (P.m.up) orient(P.viewer, P.m.up);
            for (const [axis, deg] of P.m.rotate ?? []) P.viewer.rotate(deg, axis);
            P.el.querySelector('.load3d')?.remove();
            P.ready = true; P.step = -1; P.w = P.v.clientWidth; P.h = P.v.clientHeight;
          }).catch(e => { const l = P.el.querySelector('.load3d'); if (l) l.textContent = L({ nl: `Structuur ${P.m.pdb} kon niet geladen worden (geen internet?)`, en: `Structure ${P.m.pdb} could not be loaded (offline?)` }) + ` · ${e.message}`; });
        }
      }
      /* up: [selA, selB] → draai zo dat de lijn van het zwaartepunt van A naar dat van B verticaal (omhoog) staat;
       * het draaien rond de verticale as toont het onderdeel dan steeds van opzij (bv. DNA door een ring) */
      function orient(V, [a, b]) {
        const c = sel => { const at = V.selectedAtoms(sel), n = at.length || 1; return at.reduce((s, x) => [s[0] + x.x / n, s[1] + x.y / n, s[2] + x.z / n], [0, 0, 0]); };
        const A = c(a), B = c(b), v = [B[0] - A[0], B[1] - A[1], B[2] - A[2]], len = Math.hypot(...v) || 1;
        const u = v.map(x => x / len);                                   // eenheidsvector; doel = (0, 1, 0)
        const ax = [-u[2], 0, u[0]], s = Math.hypot(...ax), ang = Math.atan2(s, u[1]);   // as = u × y
        if (s < 1e-6) return;
        const h = Math.sin(ang / 2) / s, view = V.getView();
        V.setView([...view.slice(0, 4), ax[0] * h, ax[1] * h, ax[2] * h, Math.cos(ang / 2)]);
      }
      function apply(P, st, animate) {
        const V = P.viewer;
        P.labels.forEach(l => V.removeLabel(l)); P.labels = [];
        V.setStyle({}, {});
        for (const f of st.show) {
          V.setStyle(f.sel, f.style);
          if (f.label) P.labels.push(V.addLabel(L(f.label), { fontSize: 17, fontColor: 'white', backgroundColor: '#0b1224', backgroundOpacity: .85, borderThickness: 1, borderColor: '#7cc4ff', inFront: true }, f.sel));
        }
        V.setStyle({ resn: ['HOH', 'WAT', 'DOD'] }, {});
        V.zoomTo(st.zoom ?? {}, animate ? 900 : 0);
        V.render();
      }

      const self = {
        update(t, s) {
          if (!started) start();
          const m = map[s.step], now = performance.now(), dt = first ? 1e9 : now - lastNow;
          first = false; lastNow = now;
          upd2d(m.o, m.d3 ? 1 - 1 / scene.steps[m.o].dur : s.p);
          let cover = 0;
          for (const [key, P] of Object.entries(panes)) {
            const want = m.d3?.model === key ? 1 : 0;
            P.op = want > P.op ? Math.min(want, P.op + dt / FADE) : Math.max(want, P.op - dt / FADE);
            const k = P.op * P.op * (3 - 2 * P.op);
            P.el.style.opacity = k.toFixed(3);
            P.el.style.visibility = k > 0 ? 'visible' : 'hidden';
            P.el.style.pointerEvents = k > .5 ? 'auto' : 'none';
            cover = Math.max(cover, k);
            if (!P.ready || k === 0) continue;
            // stijl van de stap: alleen als deze laag de huidige 3D-stap toont (anders blijft het laatste beeld staan tijdens het uitvloeien)
            if (want && P.step !== s.step) { const animate = P.step >= 0 && k > .02; P.step = s.step; apply(P, m.d3, animate); }
            if (P.v.clientWidth !== P.w || P.v.clientHeight !== P.h) { P.w = P.v.clientWidth; P.h = P.v.clientHeight; P.viewer.resize(); }
            const ds = now - lastSpin, spin = (m.d3?.spin ?? .012) * SPIN;
            if (ds >= 32 && ds < 200 && spin) P.viewer.rotate(ds * spin, 'y');
            P.viewer.render();
          }
          if (now - lastSpin >= 32) lastSpin = now;
          // 2D-onderdelen (en hun labels) verbergen zodra de 3D-laag het beeld bedekt
          const hide = cover > .95 ? '0' : '';
          if (hide !== k2d) { k2d = hide; if (hide) g2d.setAttribute('opacity', hide); else g2d.removeAttribute('opacity'); }
          self.live = Object.values(panes).some(P => P.op > 0);
        },
        destroy() {
          dead = true;
          for (const P of Object.values(panes)) {
            try { P.viewer?.clear(); } catch {}
            try { for (const cv of P.v.querySelectorAll('canvas')) (cv.getContext('webgl2') ?? cv.getContext('webgl'))?.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
          }
          inner?.destroy?.();
        },
        live: false,
      };
      /* De engine roept update() bij 2D-scènes alleen aan als de tijd verandert. Terwijl een 3D-laag zichtbaar is of
       * vervloeit, moet dat elk beeld gebeuren (draaien, uitvloeien), daarom geeft __k dan nooit de vorige sleutel terug. */
      let kk;
      Object.defineProperty(self, '__k', { get: () => self.live ? NaN : kk, set: v => { kk = v; } });
      return self;
    },
  };
}
