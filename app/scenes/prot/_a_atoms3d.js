/*
 * atoms3d(): echte 3D-weergave (3Dmol) op atoomniveau als venster in een 2D-scène, met een kijkrichting die de scène
 * zelf per beeld bepaalt (rotatiematrix M zoals bij projector() in _a_geo.js: rijen = schermassen x rechts, y omhoog,
 * z naar de kijker). Bedoeld voor de backbone-stappen van 'secundair': bolletjes en staafjes per element, berekende
 * amide-H, gestippelde H-bruggen als 3D-staafjes, labels op de atomen, optioneel een doorschijnende cartoon (strengpijl).
 *
 *   const a3 = atoms3d(svg, { box: 'se-box', steps: { 1: true, … } });
 *   a3.setAtoms(R, sheetLines)            // residuen (byResi + addH) en HELIX/SHEET-regels uit het PDB-bestand
 *   const op = a3.update(s, spec)         // spec = { key, ids, M, center, zoom, hb, dim, cb, cart, labels, cap }
 *   a3.destroy()
 * Het venster ligt dekkend boven het SVG-kader (box); zonder WebGL of in testhulpmiddelen (off) tekent de scène zelf.
 */
import { L } from '../../kit.js';
import { load3Dmol, insetOp } from '../../kit3d.js';
import { EL } from './_a_draw.js';

const BG = '#0b1224';
const mix = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
/* rotatiematrix (rijen) → quaternion [x, y, z, w] */
export function quat(M) {
  const [[a, b, c], [d, e, f], [g, h, i]] = M, tr = a + e + i;
  if (tr > 0) { const s = Math.sqrt(tr + 1) * 2; return [(h - f) / s, (c - g) / s, (d - b) / s, s / 4]; }
  if (a > e && a > i) { const s = Math.sqrt(1 + a - e - i) * 2; return [s / 4, (b + d) / s, (c + g) / s, (h - f) / s]; }
  if (e > i) { const s = Math.sqrt(1 + e - a - i) * 2; return [(b + d) / s, s / 4, (f + h) / s, (c - g) / s]; }
  const s = Math.sqrt(1 + i - a - e) * 2; return [(c + g) / s, (f + h) / s, s / 4, (d - b) / s];
}
/* PDB-tekst met enkel N, CA, C, O, CB en de berekende H (3Dmol legt de bindingen zelf op afstand) */
function pdbText(R, extra) {
  const out = [...extra]; let n = 1;
  const line = (name, resn, resi, p, el) => {
    const nm = name.length < 4 ? ' ' + name.padEnd(3) : name;
    out.push('ATOM  ' + String(n++).padStart(5) + ' ' + nm + ' ' + resn.padEnd(3) + ' A' + String(resi).padStart(4) + '    ' +
      p.map(v => v.toFixed(3).padStart(8)).join('') + '  1.00  0.00          ' + el.padStart(2));
  };
  for (const k of Object.keys(R).map(Number).sort((a, b) => a - b)) {
    const r = R[k];
    for (const a of ['N', 'CA', 'C', 'O', 'CB']) if (r.at[a]) line(a, r.resn, k, [r.at[a].x, r.at[a].y, r.at[a].z], a[0]);
    if (r.H) line('H', r.resn, k, r.H, 'H');
  }
  return out.join('\n') + '\nEND\n';
}

export function atoms3d(svg, o) {
  if (o.off) return { live: false, setAtoms() {}, update: s => insetOp(o.steps, s), destroy() {} };
  const host = svg.parentNode, box = svg.getElementById(o.box);
  const el = document.createElement('div');
  el.className = 'v3d-inset';
  el.style.cssText = 'position:absolute;left:0;top:0;width:10px;height:10px;opacity:0;pointer-events:none;z-index:2;visibility:hidden';
  const vdiv = document.createElement('div'); vdiv.style.cssText = 'position:absolute;inset:0';
  const cap = document.createElement('div');
  cap.style.cssText = 'position:absolute;left:0;right:0;top:4%;text-align:center;font:700 clamp(14px,1.6vw,25px) Inter,sans-serif;color:#7fdc6a;text-shadow:0 0 6px #070b16,0 0 3px #070b16;transition:opacity .4s;opacity:0';
  el.append(vdiv, cap); host.append(el);
  let R = null, text = '', viewer = null, model = null, loading = false, dead = false, lastKey = '', lastSize = '', shapes = [], labels = [], base = null;

  function ensure() {
    if (viewer || loading || !R) return;
    loading = true;
    load3Dmol().then(M => {
      if (dead) return;
      viewer = M.createViewer(vdiv, { backgroundColor: BG, antialias: true });
      model = viewer.addModel(text, 'pdb', { keepH: true });
      viewer.setStyle({}, {});
      lastKey = '';
    }).catch(e => console.warn('[atoms3d] ' + e.message));
  }
  function apply(spec) {
    labels.forEach(l => viewer.removeLabel(l)); labels = [];
    shapes.forEach(s => viewer.removeShape(s)); shapes = [];
    viewer.setStyle({}, {});
    const dim = spec.dim ?? (() => false);
    const col = a => { const c = a.atom === 'CB' ? EL.CB : (EL[a.atom === 'CA' ? 'C' : a.atom] ?? EL.C); return dim(a.resi) ? mix(c, BG, .5) : c; };
    const bond = a => dim(a.resi) ? mix('#8a96b3', BG, .5) : '#8a96b3';
    const sel = { resi: spec.ids };
    viewer.setStyle(sel, { stick: { radius: .17, colorfunc: bond }, sphere: { scale: .3, colorfunc: col } });
    if (!spec.cb) viewer.setStyle({ resi: spec.ids, atom: 'CB' }, {});
    for (const [a, b, c, arrows = true] of spec.cart ?? []) viewer.addStyle({ resi: Array.from({ length: b - a + 1 }, (_, i) => a + i) }, { cartoon: { color: c, opacity: spec.cartOp ?? .6, arrows, thickness: .3 } });
    const at = (i, n) => n === 'H' ? R[i]?.H : R[i]?.at[n] && [R[i].at[n].x, R[i].at[n].y, R[i].at[n].z];
    for (const [i, j, c, w] of spec.hb ?? []) {
      const A = at(i, 'O'), B = at(j, 'H'); if (!A || !B) continue;
      shapes.push(viewer.addCylinder({ start: { x: A[0], y: A[1], z: A[2] }, end: { x: B[0], y: B[1], z: B[2] }, radius: (w ?? 3) * .028, color: c ?? '#ffc247', dashed: true, dashLength: .25, gapLength: .2, fromCap: 1, toCap: 1 }));
    }
    for (const lb of spec.labels ?? []) {
      labels.push(viewer.addLabel(L(lb.text), { position: { x: lb.pos[0], y: lb.pos[1], z: lb.pos[2] }, fontSize: lb.size ?? 19, fontColor: lb.color ?? '#fff',
        backgroundColor: BG, backgroundOpacity: .85, borderThickness: 1.5, borderColor: lb.color ?? '#7cc4ff', inFront: true, alignment: 'center' }));
    }
    /* camera: midden en afstand van het geheel (los van de draaiing, die zet update() elk beeld) */
    viewer.zoomTo(spec.zoomSel ?? sel, 0);
    base = viewer.getView().slice(0, 4);
    if (spec.center) { base[0] = -spec.center[0]; base[1] = -spec.center[1]; base[2] = -spec.center[2]; }
    if (spec.zoom) base[3] = 150 - (150 - base[3]) / spec.zoom;   // zelfde rekenwijze als viewer.zoom() (CAMERA_Z = 150)
  }
  return {
    live: false,
    setAtoms(r, extra = []) { if (R) return; R = r; text = pdbText(r, extra); },
    update(s, spec) {
      const op = insetOp(o.steps, s);
      this.live = op > .005;
      el.style.opacity = op.toFixed(3);
      el.style.visibility = this.live ? 'visible' : 'hidden';
      if (!this.live) { lastKey = ''; return op; }
      ensure();
      const hb = host.getBoundingClientRect(), bb = box.getBoundingClientRect();
      el.style.left = `${(bb.left - hb.left).toFixed(1)}px`; el.style.top = `${(bb.top - hb.top).toFixed(1)}px`;
      el.style.width = `${bb.width.toFixed(1)}px`; el.style.height = `${bb.height.toFixed(1)}px`;
      cap.textContent = spec?.cap ? L(spec.cap) : ''; cap.style.opacity = spec?.cap ? 1 : 0;
      if (spec?.capColor) cap.style.color = spec.capColor;
      if (!viewer || !spec) return op;
      const size = `${Math.round(bb.width)}x${Math.round(bb.height)}`;
      if (size !== lastSize) { lastSize = size; viewer.resize(); lastKey = ''; }
      if (spec.key !== lastKey) { lastKey = spec.key; apply(spec); }
      viewer.setView([...base, ...quat(spec.M)]);
      viewer.render();
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
