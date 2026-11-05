/*
 * Gedeelde tekenhulpjes voor het zijpad "Waar een eiwit heen gaat en hoe het verdwijnt" (05-11-2026):
 * sortering, membraan, lysosoom, mito, perox, autofagie. Kleuren volgen app/kit.js (keten groen, membranen C.mem).
 */
import { C, f1 } from '../../kit.js';
import { T } from './_b_kit.js';

/* vaste kleur per bestemming (ook in de legendes) */
export const DEST = { cyt: '#93a0bb', er: '#e0b25c', kern: C.dna, mito: '#ff8a3d', perox: '#5fd3e6', lyso: '#ff6b6b' };
export const HYD = '#ffc247';          // waterafstotend (vettig) stuk
export const PLUS = '#4f8ff7';         // positief geladen
export const LUMEN = 'rgba(201,165,116,.08)';

/* keten van bolletjes; lab = [{ from, to, col }] kleurt een deel (index 0 = begin van het eiwit) */
export function beads(x0, y, n, { sp = 22, r = 9, col = C.chain, lab = [], op = 1, dy = () => 0, dx = null } = {}) {
  if (op <= .01) return '';
  const X = i => dx ? dx(i) : x0 + i * sp;
  let line = '', b = '';
  for (let i = 0; i < n; i++) {
    const x = X(i), yy = y + dy(i);
    if (i) line += `L${f1(x)},${f1(yy)}`; else line = `M${f1(x)},${f1(yy)}`;
    const L = lab.find(l => i >= l.from && i <= l.to);
    b += `<circle cx="${f1(x)}" cy="${f1(yy)}" r="${L?.r ?? r}" fill="${L ? L.col : col}" stroke="#0a1224" stroke-width="2"/>`;
  }
  return `<g opacity="${f1(op)}"><path d="${line}" stroke="${col}" stroke-width="${f1(r * .55)}" fill="none" stroke-linecap="round"/>${b}</g>`;
}

/* ribosoom (twee lobben) */
export function ribo(cx, cy, s = 1, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(s)})">` +
    `<ellipse cx="0" cy="22" rx="78" ry="46" fill="rgba(44,198,168,.2)" stroke="${C.rrna}" stroke-width="3"/>` +
    `<ellipse cx="0" cy="-34" rx="54" ry="30" fill="rgba(44,198,168,.12)" stroke="${C.rrna}" stroke-width="3"/>` +
    `<path d="M-120,-4 L120,-4" stroke="${C.rna}" stroke-width="5" stroke-linecap="round"/></g>`;
}

/* pictogrammen van bestemmingen (middelpunt cx, cy; grootte s ≈ straal) */
export function icon(kind, cx, cy, s = 34, op = 1) {
  if (op <= .01) return '';
  const c = DEST[kind];
  let g = '';
  if (kind === 'cyt') g = `<circle r="${s}" fill="rgba(147,160,187,.10)" stroke="${c}" stroke-width="3" stroke-dasharray="6 5"/>` +
    [[-12, -8], [10, 6], [-4, 14], [14, -12]].map(([x, y]) => `<circle cx="${f1(x * s / 34)}" cy="${f1(y * s / 34)}" r="${f1(4 * s / 34)}" fill="${c}"/>`).join('');
  if (kind === 'er') g = [-1, 0, 1].map(k => `<path d="M${f1(-s)},${f1(k * s * .5)} Q0,${f1(k * s * .5 - s * .35)} ${f1(s)},${f1(k * s * .5)}" stroke="${c}" stroke-width="${f1(s * .2)}" fill="none" stroke-linecap="round" opacity=".9"/>`).join('');
  if (kind === 'kern') g = `<circle r="${s}" fill="rgba(79,143,247,.15)" stroke="${c}" stroke-width="3"/><circle r="${f1(s - 6)}" fill="none" stroke="${c}" stroke-width="2"/>` +
    [0, 1.6, 3.2, 4.8].map(a => `<circle cx="${f1(Math.cos(a) * (s - 3))}" cy="${f1(Math.sin(a) * (s - 3))}" r="4" fill="#0a1224" stroke="${c}" stroke-width="2"/>`).join('');
  if (kind === 'mito') g = `<ellipse rx="${f1(s * 1.3)}" ry="${f1(s * .75)}" fill="rgba(255,138,61,.15)" stroke="${c}" stroke-width="3"/>` +
    `<path d="M${f1(-s * .95)},0 q${f1(s * .16)},${f1(-s * .5)} ${f1(s * .32)},0 t${f1(s * .32)},0 t${f1(s * .32)},0 t${f1(s * .32)},0 t${f1(s * .32)},0 t${f1(s * .32)},0" stroke="${c}" stroke-width="2.5" fill="none"/>`;
  if (kind === 'perox') g = `<circle r="${f1(s * .8)}" fill="rgba(95,211,230,.14)" stroke="${c}" stroke-width="3"/><rect x="${f1(-s * .3)}" y="${f1(-s * .3)}" width="${f1(s * .6)}" height="${f1(s * .6)}" rx="3" fill="${c}" opacity=".55" transform="rotate(20)"/>`;
  if (kind === 'lyso') g = `<circle r="${f1(s * .85)}" fill="rgba(255,107,107,.15)" stroke="${c}" stroke-width="3"/>` +
    [[-8, -6], [8, -8], [0, 8], [-10, 8], [10, 6]].map(([x, y]) => `<path d="M${f1(x * s / 34 - 4)},${f1(y * s / 34)} l8,0" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`).join('');
  return `<g opacity="${f1(op)}" transform="translate(${f1(cx)} ${f1(cy)})">${g}</g>`;
}

/* dubbele lipidelaag (horizontaal) tussen x0 en x1, middellijn y, dikte h; gat tussen gx0 en gx1 (optioneel) */
export function bilayer(x0, x1, y, { h = 60, col = C.mem, gap = null, op = 1 } = {}) {
  if (op <= .01) return '';
  // vlak als <path> (geen <rect>): membranen lopen bewust tot buiten beeld
  const seg = (a, b) => b - a < 4 ? '' : `<path d="M${f1(a)},${f1(y - h / 2)}H${f1(b)}V${f1(y + h / 2)}H${f1(a)}Z" fill="rgba(201,165,116,.16)"/>` +
    `<line x1="${f1(a)}" y1="${f1(y - h / 2)}" x2="${f1(b)}" y2="${f1(y - h / 2)}" stroke="${col}" stroke-width="10" stroke-dasharray="2 12" stroke-linecap="round"/>` +
    `<line x1="${f1(a)}" y1="${f1(y + h / 2)}" x2="${f1(b)}" y2="${f1(y + h / 2)}" stroke="${col}" stroke-width="10" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  const body = gap ? seg(x0, gap[0]) + seg(gap[1], x1) : seg(x0, x1);
  return `<g opacity="${f1(op)}">${body}</g>`;
}

/* kader voor een 3D-venster (de echte structuur komt erbovenop via inset3d) */
export function frame3d(id, x, y, w, h, title, sub, op = 1) {
  return `<g opacity="${f1(op)}" id="${id}-g"><rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="22" fill="#0b1224" stroke="#2a3550" stroke-width="3"/>` +
    `<rect id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0b1224"/>` +
    (title ? T(x + 24, y + 44, title, { size: 28, anchor: 'start', w: 700 }) : '') + (sub ? T(x + 24, y + 80, sub, { size: 22, anchor: 'start', col: C.muted, w: 500 }) : '') + '</g>';
}

/* punt op booglengte d langs een polylijn (voorbij het einde: verder in de richting van het laatste stuk) */
export function at(pts, d) {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1], l = Math.hypot(x1 - x0, y1 - y0);
    if (d <= l || i === pts.length - 2) { const u = l ? d / l : 0; return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u]; }
    d -= l;
  }
  return pts[0];
}
/* bolletjes op gegeven posities, verbonden door een lijn; col(i) geeft de kleur van bolletje i */
export function beadsAt(P, col, r = 12, op = 1, line = C.chain) {
  if (op <= .01 || !P.length) return '';
  let d = '', b = '';
  P.forEach(([x, y], i) => { d += `${i ? 'L' : 'M'}${f1(x)},${f1(y)}`; b += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col(i)}" stroke="#0a1224" stroke-width="2"/>`; });
  return `<g opacity="${f1(op)}"><path d="${d}" stroke="${line}" stroke-width="${f1(r * .5)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${b}</g>`;
}
/* knop bovenaan (zoals in de herstel-scènes) */
export const btn = (node, x, w, label, col, y = 40) => `<g data-node="${node}" data-nolabel data-color="${col}"><rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="rgba(13,20,38,.75)" stroke="${col}" stroke-width="2"/>${T(x + w / 2, y + 35, label, { size: 22, halo: false })}</g>`;
