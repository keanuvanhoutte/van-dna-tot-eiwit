/*
 * Gedeelde tekenhulpjes voor de scènes van prot deel B (ptm, ubiquitine, chaperones, glyco, disulfide, golgi, misvouwing, idp).
 * Kleurcodes volgen app/kit.js: keten groen (C.chain), enzymen paars (C.prot/prot2/prot3), membranen C.mem.
 */
import { C, f1 } from '../../kit.js';

export const UB = '#ffd166';          // ubiquitine
export const PHOS = '#ff6b6b';        // fosfaatgroep (negatief geladen = rood, zoals CLASSCOL['-'])
export const ATPC = '#5fd3e6';        // ATP/ADP/GTP-pillen
export const LUMEN = 'rgba(201,165,116,.07)';

/* tekst met donkere rand (leesbaar op elke achtergrond) */
export function T(x, y, s, o = {}) {
  const { col = C.text, size = 20, anchor = 'middle', w = 600, font = 'Inter', op = 1, halo = true, italic = false } = o;
  if (op <= .01) return '';
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" text-anchor="${anchor}" fill="${col}" font-family="${font}" font-weight="${w}"` +
    `${italic ? ' font-style="italic"' : ''}${halo ? ` stroke="#070b16" stroke-width="${f1(size * .22)}" stroke-linejoin="round" paint-order="stroke"` : ''}${op < 1 ? ` opacity="${f1(op)}"` : ''}>${s}</text>`;
}
/* meerdere regels */
export function TL(x, y, lines, o = {}) { const lh = (o.size ?? 20) * 1.25; return lines.map((s, i) => T(x, y + i * lh, s, o)).join(''); }

/* vloeiend pad door punten (Catmull-Rom → Bézier) */
export function smooth(pts) {
  if (pts.length < 2) return '';
  let d = `M${f1(pts[0][0])},${f1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)},${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)},${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d;
}
export const chain = (pts, o = {}) => `<path d="${smooth(pts)}" stroke="${o.col ?? C.chain}" stroke-width="${o.w ?? 8}" fill="none" stroke-linecap="round" stroke-linejoin="round"${o.op !== undefined ? ` opacity="${f1(o.op)}"` : ''}${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;

/* enzym/eiwit als afgeronde vorm met label */
export function enz(x, y, rx, ry, label, o = {}) {
  const { col = C.prot, op = 1, fs = 22, rot = 0, fillOp = .28, tcol = '#fff', dy = 0 } = o;
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><ellipse rx="${rx}" ry="${ry}" fill="${col}" fill-opacity="${fillOp}" stroke="${col}" stroke-width="3"/></g>` +
    (label ? T(x, y + fs * .35 + dy, label, { size: fs, col: tcol, op }) : '');
}
/* pil (label met achtergrond) */
export function tag(x, y, s, col = ATPC, o = {}) {
  const { fs = 18, op = 1, w = Math.max(40, s.replace(/<[^>]+>/g, '').length * fs * .62 + 22), tc = '#071022' } = o;
  if (op <= .01) return '';
  const h = fs * 1.6;
  return `<g opacity="${f1(op)}"><rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${col}"/>` +
    `<text x="${f1(x)}" y="${f1(y + fs * .36)}" font-size="${fs}" text-anchor="middle" fill="${tc}" font-family="Inter" font-weight="700">${s}</text></g>`;
}
/* pijl-markers (eigen id's per scène) */
export function arrowDefs(p, cols = { m: C.muted }) {
  return `<defs>${Object.entries(cols).map(([k, c]) => `<marker id="${p}-${k}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${c}"/></marker>`).join('')}</defs>`;
}
export function arr(x0, y0, x1, y1, col, mk, o = {}) {
  const { w = 4, op = 1, dash = '', bend = 0 } = o;
  if (op <= .01) return '';
  const mx = (x0 + x1) / 2 - (y1 - y0) * bend, my = (y0 + y1) / 2 + (x1 - x0) * bend;
  return `<path d="M${f1(x0)},${f1(y0)} Q${f1(mx)},${f1(my)} ${f1(x1)},${f1(y1)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" marker-end="url(#${mk})"${dash ? ` stroke-dasharray="${dash}"` : ''} opacity="${f1(op)}"/>`;
}
/* ubiquitine en fosfaat */
export function ub(x, y, r = 20, op = 1, lab = 'Ub') {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${UB}" stroke="#7a5a00" stroke-width="2"/>` +
    `<text x="${f1(x)}" y="${f1(y + r * .33)}" font-size="${f1(r * .9)}" text-anchor="middle" fill="#3a2a00" font-family="Inter" font-weight="800">${lab}</text></g>`;
}
export function phos(x, y, r = 18, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${PHOS}" stroke="#fff" stroke-width="2"/>` +
    `<text x="${f1(x)}" y="${f1(y + r * .36)}" font-size="${f1(r * 1.05)}" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">P</text></g>`;
}
/* SNFG-suikersymbolen (Symbol Nomenclature for Glycans) */
export const SNFG = { GlcNAc: '#0072BC', Glc: '#0072BC', Man: '#00A651', Gal: '#FFD400', GalNAc: '#FFD400', Fuc: '#ED1C24', Sia: '#A54399' };
export function sugar(type, x, y, r = 11, op = 1) {
  if (op <= .01) return '';
  const c = SNFG[type], st = `stroke="#0a1224" stroke-width="1.6" opacity="${f1(op)}"`;
  if (type === 'GlcNAc' || type === 'GalNAc') return `<rect x="${f1(x - r)}" y="${f1(y - r)}" width="${2 * r}" height="${2 * r}" fill="${c}" ${st}/>`;
  if (type === 'Fuc') return `<path d="M${f1(x)},${f1(y - r)} L${f1(x + r)},${f1(y + r)} L${f1(x - r)},${f1(y + r)}Z" fill="${c}" ${st}/>`;
  if (type === 'Sia') return `<path d="M${f1(x)},${f1(y - r * 1.2)} L${f1(x + r * 1.2)},${f1(y)} L${f1(x)},${f1(y + r * 1.2)} L${f1(x - r * 1.2)},${f1(y)}Z" fill="${c}" ${st}/>`;
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${c}" ${st}/>`;
}
/* kader/paneel */
export function panel(x, y, w, h, o = {}) {
  const { col = 'rgba(147,160,187,.35)', fill = 'rgba(13,20,38,.72)', op = 1, r = 18 } = o;
  if (op <= .01) return '';
  return `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${r}" fill="${fill}" stroke="${col}" stroke-width="2" opacity="${f1(op)}"/>`;
}
/* ATP-verbruik-flits */
export const spark = (x, y, k, col = ATPC) => k > .01 && k < .99 ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(10 + 40 * k)}" fill="none" stroke="${col}" stroke-width="3" opacity="${f1(1 - k)}"/>` : '';
/* lineaire interpolatie van punten */
export const lerpPts = (a, b, k) => a.map((p, i) => [p[0] + (b[i][0] - p[0]) * k, p[1] + (b[i][1] - p[1]) * k]);
