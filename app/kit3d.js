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
 *   hotspots: [ { node: 'histonmod', label: {nl,en}, color, href? } ],   // klikbare knoppen links in beeld (href: bv. '../atlas/index.html?pdb=1TUP')
 *   hide: { resn: ['HOH'] },                                      // wat te verbergen (standaard water)
 *   dimOpacity: false,                                            // optioneel: niet doorschijnend dimmen (bv. bij bolletjesmodellen)
 *   rotate: [['x', 90]],                                          // optioneel: beginoriëntatie (draaiingen in graden, na het laden)
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
      const hs = (o.hotspots ?? []).map(h => `<button class="h3" data-node="${h.node}"${h.href ? ` data-href="${h.href}"` : ''} data-nolabel style="--c:${h.color ?? C.accent ?? '#7cc4ff'}">${L(h.label)}</button>`).join('');
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
        viewer.zoomTo();
        for (const [axis, deg] of o.rotate ?? []) viewer.rotate(deg, axis);   // optioneel: beginoriëntatie (bv. lange as verticaal)
        viewer.render();
        layer.querySelector('.load3d')?.remove();
        ready = true; lastStep = -1;
      }).catch(e => { const l = layer.querySelector('.load3d'); if (l) l.textContent = L({ nl: `Structuur ${o.pdb} kon niet geladen worden (geen internet?)`, en: `Structure ${o.pdb} could not be loaded (offline?)` }) + ` · ${e.message}`; });

      function applyBase(dim = false) {
        viewer.setStyle({}, {});
        for (const b of o.base ?? [{ sel: {}, style: { cartoon: { color: 'spectrum' } } }]) {
          const st = JSON.parse(JSON.stringify(b.style));
          // dimOpacity: false → niet doorschijnend dimmen (3Dmol waarschuwt bij bollen met gemengde opaciteit); de scène dimt dan zelf
          if (dim && o.dimOpacity !== false) for (const k of Object.keys(st)) st[k].opacity = Math.min(st[k].opacity ?? 1, .28);
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

/*
 * inset3d(): een echte 3D-structuur als venster in een 2D-scène (SVG), alleen tijdens bepaalde stappen.
 * De 2D-scène tekent zelf het kader (een <rect id="…"> in de SVG); het 3D-venster volgt dat kader op het scherm,
 * ook als de camera van de engine zoomt of het scherm smal is.
 *
 *   const v = inset3d(svg, { pdb, format, box: 'mi-box', base, dimOpacity, off: !api?.node, steps: { 2: { focus, zoom, spin }, 3: {…} } });
 *   in update(t, s):  const op = v.update(s);     // 0..1: zichtbaarheid (zelfde waarde gebruiken voor het SVG-kader)
 *   in destroy():     v.destroy();
 *   in init():        return withInset({ update(t, s) {…}, destroy() {…} }, v);
 * withInset zorgt dat de engine update() elk beeld blijft aanroepen zolang het 3D-venster te zien is (de engine slaat
 * update anders over als t niet verandert, bv. tijdens het wachten op het eindbeeld): de sleutel api.__k klopt dan nooit.
 * Zichtbaarheid: een 3D-stap na een 2D-stap fadet in (eerste 15 % van de stap); een 2D-stap na een 3D-stap fadet uit.
 * Het 3D-venster is dekkend: teken in het SVG-kader een eenvoudige plaatsvervanger (die zien de testhulpmiddelen en wie geen WebGL heeft).
 */
export const insetOp = (steps, s) => {
  const now = !!steps[s.step], prev = !!steps[s.step - 1], k = Math.min(1, Math.max(0, s.p / .15));
  return now ? (prev || s.step === 0 ? 1 : k) : (prev ? 1 - k : 0);   // een 3D-eerste stap is er meteen (geen leeg beginbeeld)
};
export function inset3d(svg, o) {
  // in de testhulpmiddelen (tools/*.html: init zonder api.node) geen 3D laden: daar telt alleen de SVG
  if (o.off) return { live: false, update: s => insetOp(o.steps, s), destroy() {} };
  const host = svg.parentNode, box = svg.getElementById(o.box);
  const el = document.createElement('div');
  el.className = 'v3d-inset';
  el.style.cssText = 'position:absolute;left:0;top:0;width:10px;height:10px;opacity:0;pointer-events:none;z-index:2';
  host.append(el);
  let viewer = null, dead = false, ready = false, lastStep = -1, lastT = performance.now(), labels = [], lastSize = '';
  const fmt = o.format ?? 'pdb';
  Promise.all([load3Dmol(), fetch(pdbUrl(o.pdb, fmt)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })]).then(([M, txt]) => {
    if (dead) return;
    viewer = M.createViewer(el, { backgroundColor: '#0b1224', antialias: true });   // dekkend: de SVG-plaatsvervanger in het kader verdwijnt eronder
    viewer.addModel(txt, fmt === 'cif' ? 'cif' : 'pdb');
    applyBase(); viewer.zoomTo(); viewer.render();
    ready = true; lastStep = -1;
  }).catch(e => console.warn(`[inset3d] ${o.pdb}: ${e.message}`));
  function applyBase(dim = false) {
    viewer.setStyle({}, {});
    for (const b of o.base) {
      const st = JSON.parse(JSON.stringify(b.style));
      if (dim && o.dimOpacity !== false) for (const k of Object.keys(st)) st[k].opacity = Math.min(st[k].opacity ?? 1, .28);
      viewer.setStyle(b.sel, st);
    }
    viewer.setStyle({ resn: ['HOH', 'WAT', 'DOD'] }, {});
  }
  function applyStep(st) {
    labels.forEach(l => viewer.removeLabel(l)); labels = [];
    if (st.focus) {
      applyBase(true);
      for (const f of [].concat(st.focus)) {
        viewer.setStyle(f.sel, f.style);
        if (f.label) labels.push(viewer.addLabel(L(f.label), { fontSize: 16, fontColor: 'white', backgroundColor: '#0b1224', backgroundOpacity: .85, borderThickness: 1, borderColor: '#7cc4ff', inFront: true }, f.sel));
      }
    } else applyBase(false);
    viewer.zoomTo(st.zoom ?? {}, 900);
    viewer.render();
  }
  return {
    live: false,                                      // true zolang het venster zichtbaar is
    update(s) {
      const op = insetOp(o.steps, s);
      this.live = op > .005;
      el.style.opacity = op.toFixed(3);
      el.style.visibility = op > .005 ? 'visible' : 'hidden';
      if (op <= .005) return op;
      // het kader volgen (de engine kan de camera van de SVG veranderen)
      const hb = host.getBoundingClientRect(), bb = box.getBoundingClientRect();
      const size = `${Math.round(bb.width)}x${Math.round(bb.height)}`;
      el.style.left = `${(bb.left - hb.left).toFixed(1)}px`; el.style.top = `${(bb.top - hb.top).toFixed(1)}px`;
      el.style.width = `${bb.width.toFixed(1)}px`; el.style.height = `${bb.height.toFixed(1)}px`;
      if (!ready) return op;
      if (size !== lastSize) { lastSize = size; viewer.resize(); viewer.render(); }
      const st = o.steps[s.step] ?? o.steps[s.step - 1];
      const key = o.steps[s.step] ? s.step : s.step - 1;
      if (key !== lastStep && st) { lastStep = key; applyStep(st); }
      const now = performance.now(), dt = now - lastT;
      if (dt < 32) return op;
      lastT = now;
      const spin = (st?.spin ?? .012) * SPIN;
      if (dt < 200 && spin) { viewer.rotate(dt * spin, 'y'); viewer.render(); }
      return op;
    },
    destroy() {
      dead = true;
      try { viewer?.clear(); } catch {}
      try { for (const cv of el.querySelectorAll('canvas')) (cv.getContext('webgl2') ?? cv.getContext('webgl'))?.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
      el.remove();
    },
  };
}

/* het api-object van een 2D-scène met inset3d: elk beeld opnieuw tekenen zolang het 3D-venster zichtbaar is */
export function withInset(api, v) {
  let k;
  Object.defineProperty(api, '__k', { get: () => (v.live ? null : k), set: x => { k = x; }, configurable: true });
  return api;
}
