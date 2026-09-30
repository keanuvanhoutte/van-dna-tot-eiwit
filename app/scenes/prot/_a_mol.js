/*
 * molScene() (agent prot-a): 3D-scène met 3Dmol.js links en een SVG-paneel (1600×900-coördinaten) rechts.
 * Uitbreiding op kit3d.structure3d(): stappen krijgen een functie `show(ctx)` die stijlen, labels en zoom zet,
 * en `panel(ctx)` die de uitleg rechts tekent. De draaiing is een zuivere functie van t (deterministisch),
 * de camera schuift in 0,9 s vloeiend naar de zoom van de nieuwe stap.
 *
 *   molScene({ id, pdb, title, …, overlay: () => svg-string (hotspots e.d.),
 *              onload(ctx) (berekeningen op de atomen), steps: [{ dur, title, text, spin, show(ctx), panel(ctx) }] })
 */
import { pdbUrl } from '../../../shared/pdb.js';
import { L, C, f1, clamp, ease, SPIN } from '../../kit.js';
import { load3Dmol } from '../../kit3d.js';

export const PANEL_X = 1000;

export function molScene(o) {
  const fmt = o.format ?? 'cif';
  return {
    ...o,
    kind: '3d',
    html() {
      return `<div class="v3d" style="left:0;right:auto;width:${f1(100 * PANEL_X / 1600)}%;top:84px;bottom:150px"></div>
        <svg class="a-ov" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid meet" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none">
          <rect x="${PANEL_X + 10}" y="110" width="560" height="610" rx="18" fill="#0d1426" fill-opacity=".92" stroke="#2a3550" stroke-width="2"/>
          <g class="a-panel"></g>
          ${o.overlay ? o.overlay() : ''}
        </svg>
        <div class="load3d" style="width:${f1(100 * PANEL_X / 1600)}%">${L({ nl: `Structuur ${o.pdb} laden uit de Protein Data Bank…`, en: `Loading structure ${o.pdb} from the Protein Data Bank…` })}</div>
        <a class="pdbtag" href="https://www.rcsb.org/structure/${o.pdb}" target="_blank" rel="noopener">PDB ${o.pdb} ↗</a>`;
    },
    init(layer) {
      layer.querySelectorAll('.a-ov [data-node]').forEach(e => { e.style.pointerEvents = 'auto'; });
      const el = layer.querySelector('.v3d'), panelEl = layer.querySelector('.a-panel'), ov = layer.querySelector('.a-ov');
      let viewer = null, dead = false;
      let ready = false, lastStep = -1, labels = [], shapes = [], model = null, q0 = [0, 0, 0, 1];
      const zoomCache = {};
      let vFrom = null, vTo = null, stepT0 = 0, lastPanelKey = '';
      const ctx = {
        get viewer() { return viewer; }, L, C, layer, ov,
        get atoms() { return model ? model.selectedAtoms({}) : []; },
        sel: s => model ? model.selectedAtoms(s) : [],
        style(sel, st) { viewer.setStyle(sel, st); },
        addStyle(sel, st) { viewer.addStyle(sel, st); },
        label(text, pos, opt = {}) {
          labels.push(viewer.addLabel(text, { fontSize: Math.max(16, opt.size ?? 18), fontColor: opt.color ?? 'white', backgroundColor: opt.bg ?? '#0b1224', backgroundOpacity: .82, borderThickness: 1.5, borderColor: opt.border ?? '#7cc4ff', inFront: true, alignment: 'center', position: pos }));
        },
        cyl(a, b, col, r = .12, dashed = true) { shapes.push(viewer.addCylinder({ start: { x: a.x, y: a.y, z: a.z }, end: { x: b.x, y: b.y, z: b.z }, radius: r, color: col, dashed, fromCap: 1, toCap: 1 })); },
        sphere(p, col, r = .6) { shapes.push(viewer.addSphere({ center: { x: p.x, y: p.y, z: p.z }, radius: r, color: col })); },
        center(atoms) { const n = atoms.length || 1; return atoms.reduce((s, a) => ({ x: s.x + a.x / n, y: s.y + a.y / n, z: s.z + a.z / n }), { x: 0, y: 0, z: 0 }); },
        data: {},
      };
      Promise.all([load3Dmol(), fetch(pdbUrl(o.pdb, fmt)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })]).then(([M, txt]) => {
        if (dead) return;
        viewer = M.createViewer(el, { backgroundColor: '#0b1224', backgroundAlpha: 0, antialias: true });
        model = viewer.addModel(txt, fmt);
        viewer.setStyle({}, {});
        o.onload?.(ctx);
        viewer.zoomTo(); viewer.render();
        const v = viewer.getView(); q0 = v.slice(4, 8);
        layer.querySelector('.load3d')?.remove();
        ready = true; lastStep = -1;
      }).catch(e => { const l = layer.querySelector('.load3d'); if (l) l.textContent = L({ nl: `Structuur ${o.pdb} kon niet geladen worden (geen internet?)`, en: `Structure ${o.pdb} could not be loaded (offline?)` }) + ` · ${e.message}`; });

      /* camera per stap (positie + zoom; onafhankelijk van de draaiing) */
      function zoomView(i) {
        if (zoomCache[i]) return zoomCache[i];
        const st = o.steps[i];
        const cur = viewer.getView();
        viewer.zoomTo(st.zoom ?? {}, 0);
        const v = viewer.getView().slice(0, 4);
        if (st.zoomFactor) v[3] = v[3] * st.zoomFactor;
        viewer.setView(cur);
        return (zoomCache[i] = v);
      }
      function applyStep(i) {
        labels.forEach(l => viewer.removeLabel(l)); labels = [];
        shapes.forEach(s => viewer.removeShape(s)); shapes = [];
        viewer.removeAllSurfaces?.();
        viewer.setStyle({}, {});
        o.steps[i].show(ctx);
        viewer.setStyle({ resn: ['HOH', 'WAT'] }, {});
      }
      /* totale draaihoek (graden) tot tijd t: som over de stappen van spin × duur */
      function angle(t) {
        let a = 0, acc = 0;
        for (const st of o.steps) { const sp = (st.spin ?? .012) * SPIN; if (t <= acc + st.dur) return a + (t - acc) * sp; a += st.dur * sp; acc += st.dur; }
        return a;
      }
      const qmul = (a, b) => [
        a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
        a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
        a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
        a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]];
      return {
        update(t, s) {
          const key = s.step + '|' + (o.panelKey ? o.panelKey(t, s, ctx) : '') + '|' + ready;
          if (key !== lastPanelKey && o.steps[s.step].panel) { lastPanelKey = key; panelEl.innerHTML = o.steps[s.step].panel(ctx, t, s); }
          o.overlayUpdate?.(ov, t, s, ctx);
          if (!ready) return;
          if (s.step !== lastStep) {
            const prev = lastStep; lastStep = s.step;
            applyStep(s.step);
            vFrom = prev >= 0 ? zoomView(prev) : zoomView(s.step);
            vTo = zoomView(s.step);
            stepT0 = o.steps.slice(0, s.step).reduce((a, x) => a + x.dur, 0);
          }
          const k = ease(clamp((t - stepT0) / 900));
          const v = vFrom.map((x, i) => x + (vTo[i] - x) * k);
          const a = angle(t) * Math.PI / 180, tilt = (o.tilt ?? 0) * Math.PI / 180;
          const qy = [0, Math.sin(a / 2), 0, Math.cos(a / 2)], qx = [Math.sin(tilt / 2), 0, 0, Math.cos(tilt / 2)];
          const q = qmul(qx, qmul(qy, q0));
          viewer.setView([...v, ...q]);
          viewer.render();
        },
        destroy() { dead = true; try { viewer?.clear(); } catch {} },
      };
    },
  };
}

/* hulpjes voor paneelteksten (SVG) */
export const PX = PANEL_X + 34;
export function ptxt(x, y, s, col = C.text, size = 23, w = 600, anchor = 'start') {
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" text-anchor="${anchor}" fill="${col}" font-family="Inter" font-weight="${w}">${s}</text>`;
}
export const phead = s => ptxt(PX, 162, s, C.text, 27, 700);
/* regels met automatische y (elk item: [tekst, kleur?, grootte?, gewicht?] of '' = witregel) */
export function plines(y0, items, dy = 38) {
  let y = y0, out = '';
  for (const it of items) {
    if (!it) { y += dy * .6; continue; }
    const [s, col, size, w] = [].concat(it);
    out += ptxt(PX, y, s, col ?? '#c3cde2', size ?? 23, w ?? 600); y += dy;
  }
  return out;
}
