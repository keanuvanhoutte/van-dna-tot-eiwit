/*
 * structure3d(): bouwt een 3D-scène rond een echte PDB-structuur (3Dmol.js, globaal geladen in app/index.html).
 *
 * structure3d({
 *   id: 'nucleosoom', pdb: '1KX5', format: 'cif' | 'pdb' (standaard 'cif'),
 *   title, scale, time, org, legend, simplified, extra,     // zoals elke scène
 *   base: [ { sel: {...3Dmol-selectie}, style: {...} }, ... ],   // basisweergave (volgorde telt)
 *   steps: [ { dur, title, text,
 *              focus: { sel, style, label: {nl,en} } | null,     // wat deze stap uitlicht (rest wordt gedimd)
 *              zoom: sel | null,                                  // waarop inzoomen (standaard focus.sel of alles)
 *              spin: 0.02 } ],                                    // graden per ms rond de y-as
 *   hotspots: [ { node: 'histonmod', label: {nl,en}, color } ],   // klikbare knoppen links in beeld
 *   hide: { resn: ['HOH'] },                                      // wat te verbergen (standaard water)
 * })
 */
import { L, C, SPIN } from './kit.js';
import { pdbUrl } from '../shared/pdb.js';

/* 3Dmol.js pas laden wanneer een 3D-scène het nodig heeft (anders wacht de hele app op ~1 MB van de CDN) */
let lib = null;
export function load3Dmol() {
  if (window.$3Dmol) return Promise.resolve(window.$3Dmol);
  return lib ??= new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/3dmol@2.5.5/build/3Dmol-min.js';
    sc.onload = () => res(window.$3Dmol); sc.onerror = () => { lib = null; rej(new Error('3Dmol.js')); };
    document.head.append(sc);
  });
}

export function structure3d(o) {
  const fmt = o.format ?? 'cif';
  return {
    ...o,
    kind: '3d',
    html() {
      const hs = (o.hotspots ?? []).map(h => `<button class="h3" data-node="${h.node}" data-nolabel style="--c:${h.color ?? C.accent ?? '#7cc4ff'}">${L(h.label)}</button>`).join('');
      return `<div class="v3d"></div>
        <div class="h3wrap">${hs}</div>
        <div class="load3d">${L({ nl: `Structuur ${o.pdb} laden uit de Protein Data Bank…`, en: `Loading structure ${o.pdb} from the Protein Data Bank…` })}</div>
        <a class="pdbtag" href="https://www.rcsb.org/structure/${o.pdb}" target="_blank" rel="noopener">PDB ${o.pdb} ↗</a>`;
    },
    init(layer) {
      const el = layer.querySelector('.v3d');
      let viewer = null, dead = false;
      let ready = false, lastStep = -1, lastT = performance.now(), labels = [];
      const hide = o.hide ?? { resn: ['HOH', 'WAT', 'DOD'] };
      Promise.all([load3Dmol(), fetch(pdbUrl(o.pdb, fmt)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })]).then(([M, txt]) => {
        if (dead) return;
        viewer = M.createViewer(el, { backgroundColor: '#0b1224', antialias: true });
        viewer.addModel(txt, fmt === 'cif' ? 'cif' : 'pdb');
        viewer.setStyle({}, {});
        applyBase();
        viewer.zoomTo(); viewer.render();
        layer.querySelector('.load3d')?.remove();
        ready = true; lastStep = -1;
      }).catch(e => { const l = layer.querySelector('.load3d'); if (l) l.textContent = L({ nl: `Structuur ${o.pdb} kon niet geladen worden (geen internet?)`, en: `Structure ${o.pdb} could not be loaded (offline?)` }) + ` · ${e.message}`; });

      function applyBase(dim = false) {
        viewer.setStyle({}, {});
        for (const b of o.base ?? [{ sel: {}, style: { cartoon: { color: 'spectrum' } } }]) {
          const st = JSON.parse(JSON.stringify(b.style));
          if (dim) for (const k of Object.keys(st)) st[k].opacity = Math.min(st[k].opacity ?? 1, .28);
          viewer.setStyle(b.sel, st);
        }
        viewer.setStyle(hide, {});
      }
      function applyStep(i) {
        const st = o.steps[i];
        labels.forEach(l => viewer.removeLabel(l)); labels = [];
        if (st.focus) {
          applyBase(true);
          for (const f of [].concat(st.focus)) {
            viewer.setStyle(f.sel, f.style);
            if (f.label) labels.push(viewer.addLabel(L(f.label), { fontSize: 15, fontColor: 'white', backgroundColor: '#0b1224', backgroundOpacity: .85, borderThickness: 1, borderColor: '#7cc4ff', inFront: true }, f.sel));
          }
        } else applyBase(false);
        const z = st.zoom === undefined ? ([].concat(st.focus ?? [])[0]?.sel ?? {}) : st.zoom;
        viewer.zoomTo(z ?? {}, 900);
        viewer.render();
      }
      return {
        update(t, s) {
          if (!ready) return;
          if (s.step !== lastStep) { lastStep = s.step; applyStep(s.step); }
          // draaien op de echte klok: ook terwijl een stap op het eindbeeld wacht, blijft de structuur rustig draaien
          // ~30 beelden/s volstaat voor rustig draaien en halveert het werk voor de grafische kaart
          const now = performance.now(), dt = now - lastT;
          if (dt < 32) return;
          lastT = now;
          const spin = (o.steps[s.step].spin ?? .012) * SPIN;
          if (dt < 200 && spin) { viewer.rotate(dt * spin, 'y'); viewer.render(); }
        },
        destroy() {
          dead = true;
          try { viewer?.clear(); } catch {}
          // WebGL-geheugen meteen vrijgeven (anders stapelen de 3D-beelden zich op bij elke scènewissel)
          try { for (const cv of el.querySelectorAll('canvas')) (cv.getContext('webgl2') ?? cv.getContext('webgl'))?.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
        },
      };
    },
  };
}
