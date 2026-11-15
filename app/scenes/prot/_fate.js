/*
 * Gedeelde tekenhulpjes voor het zijpad "Waar een eiwit heen gaat en hoe het verdwijnt" (05-11-2026):
 * sortering, membraan, lysosoom, mito, perox, autofagie. Kleuren volgen app/kit.js (keten groen, membranen C.mem).
 */
import { C, f1 } from '../../kit.js';
import { T } from './_b_kit.js';
import { eiwitPad, cisterne, ribosoomKlein, kernEnvelop, ptsCirkel, mitochondrion, blaasje, membraanLijn, membraanPts, LIPID } from '../../bio.js';

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

/* ribosoom (zijaanzicht, overzicht): grote eenheid onder, kleine eenheid erboven, het mRNA in de spleet ertussen
 * (de kleine eenheid leest het), en de uitgangstunnel door de grote eenheid naar onderen (daar komt de keten uit).
 * Detailronde 15-11-2026: bobbelige eenheden die tegen elkaar liggen i.p.v. twee ellipsen; zelfde parameters en voetafdruk.
 * Tunneluitgang (bij s = 1): (cx, cy + 70). */
export function ribo(cx, cy, s = 1, op = 1) {
  if (op <= .01) return '';
  const big = eiwitPad(0, 26, 80, 46, 60, .05), sm = eiwitPad(-6, -32, 58, 27, 40, .06);
  return `<g opacity="${f1(op)}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(s)})">` +
    `<path d="${big}" fill="#0b1224"/><path d="${big}" fill="${C.rrna}" fill-opacity=".34" stroke="${C.rrna}" stroke-width="3"/>` +
    `<path d="M4,-2 C22,18 -10,42 0,72" stroke="#0b1224" stroke-opacity=".75" stroke-width="13" fill="none" stroke-linecap="round"/>` +
    `<path d="${sm}" fill="#0b1224"/><path d="${sm}" fill="${C.rrna}" fill-opacity=".2" stroke="${C.rrna}" stroke-width="3"/>` +
    `<path d="M-120,-6 C-60,-10 40,-1 120,-7" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
}

/* pictogrammen van bestemmingen (middelpunt cx, cy; grootte s ≈ straal). Detailronde 15-11-2026: echte vormen uit bio.js
 * (dubbellaag, kernenvelop met poriën, mitochondrion met cristae, ruw ER met ribosomen), getekend op referentiegrootte 60
 * en geschaald; de kleur van de bestemming zit in een dunne rand en in het lumen. */
export function icon(kind, cx, cy, s = 34, op = 1) {
  if (op <= .01) return '';
  const c = DEST[kind], R = 60, k = s / R;
  const tint = a => c + Math.round(a * 255).toString(16).padStart(2, '0');
  let g = '';
  if (kind === 'cyt') g = `<circle r="${R}" fill="rgba(147,160,187,.10)" stroke="${c}" stroke-width="${f1(3 / k)}" stroke-dasharray="${f1(10)} ${f1(9)}"/>` +
    [[-22, -14, 1], [18, 10, 2], [-6, 26, 3], [26, -22, 4]].map(([x, y, sd]) => `<path d="${eiwitPad(x, y, 9, 7.5, sd, .12)}" fill="${c}" fill-opacity=".85"/>`).join('');
  if (kind === 'er') {
    for (const j of [-1, 0, 1]) g += cisterne(0, j * 34, { len: 118 - Math.abs(j) * 10, dik: 16, buig: 14, vert: false, w: 9, lumen: tint(.28) });
    for (const [x, y] of [[-40, -48], [-8, -52], [26, -50], [-30, -14], [10, -16], [40, -13], [-20, 20], [20, 21]]) g += ribosoomKlein(x, y, { s: .55 });
  }
  if (kind === 'kern') g = `<circle r="${R - 9}" fill="${tint(.16)}"/>` + kernEnvelop(ptsCirkel(0, 0, R - 9, 48), { poriën: [.06, .31, .56, .81], w: 8, gap: 7, poreW: 14, lumen: 'rgba(201,165,116,.18)', npc: false }) +
    `<circle r="${R + 2}" fill="none" stroke="${c}" stroke-width="${f1(2.2 / k)}" opacity=".8"/>` + `<circle cx="12" cy="-6" r="13" fill="${c}" fill-opacity=".35"/>`;
  if (kind === 'mito') g = mitochondrion(0, 0, R * 1.3, R * .74, { n: 4, w: 8, matrix: tint(.18), ims: 'rgba(201,165,116,.10)' }) +
    `<ellipse rx="${f1(R * 1.3 + 4)}" ry="${f1(R * .74 + 4)}" fill="none" stroke="${c}" stroke-width="${f1(2.2 / k)}" opacity=".8"/>`;
  if (kind === 'perox') g = blaasje(0, 0, R * .78, { w: 10, lumen: tint(.16), rand: c }) +
    [[-14, -12, 5], [14, -6, 6], [-4, 16, 7]].map(([x, y, sd]) => `<path d="${eiwitPad(x, y, 11, 9, sd, .12)}" fill="${c}" fill-opacity=".75"/>`).join('');
  if (kind === 'lyso') g = blaasje(0, 0, R * .84, { w: 10, lumen: tint(.18), rand: c }) +
    [[-16, -14, 8], [16, -12, 9], [0, 16, 10], [-20, 14, 11]].map(([x, y, sd]) => `<path d="${eiwitPad(x, y, 10, 8, sd, .12)}" fill="${c}" fill-opacity=".8"/>`).join('');
  return `<g opacity="${f1(op)}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(k)})">${g}</g>`;
}

/* lipidedubbellaag (horizontaal) tussen x0 en x1, middellijn y, dikte h; gat tussen gap[0] en gap[1] (optioneel).
 * Detailronde 15-11-2026: getekend met bio.js (kopjes buiten, staartjes binnen) i.p.v. twee stippellijnen; zelfde parameters.
 * col = kleur van de kopjes (C.mem → de gewone lipidekleur). */
export function bilayer(x0, x1, y, { h = 60, col = C.mem, gap = null, op = 1 } = {}) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}">${membraanLijn(x0, x1, y, { w: h, gaten: gap ? [gap] : [], head: col === C.mem ? LIPID.head : col })}</g>`;
}

/* Knop: een blaasje ontstaat uit een membraan (zelfde werkwijze als in lysosoom.js). m = punt op het moedermembraan,
 * n = eenheidsvector naar de kant waar het blaasje heen gaat, r = straal, k = 0 (vlak) … 1 (afgesnoerd).
 * Versmelten = dezelfde knop met k van 1 naar 0. hole = kleur van het lumen achter de hals (bedekt het moedermembraan).
 * Geeft { svg, c, top } terug (c = middelpunt van het blaasje). */
export function knop(m, n, r, k, { hole = '#1d2030', w = 10, gap = null, op = 1, lumen = 'rgba(201,165,116,.10)' } = {}) {
  const G = gap ?? w / 2 + 6;
  const rho = r * (.1 + .9 * Math.min(1, k / .6));
  const d = k < .75 ? rho * .8 * k / .75 : (.8 * r) + ((r + G) - .8 * r) * (k - .75) / .25;
  const c = [m[0] + n[0] * d, m[1] + n[1] * d], top = [c[0] + n[0] * rho, c[1] + n[1] * rho];
  const o = op * Math.min(1, k / .08);
  let svg = '';
  if (o > .01) {
    if (d < rho) {
      const a = Math.acos(d / rho), phi = Math.atan2(-n[1], -n[0]), P = [];
      for (let i = 0; i <= 40; i++) { const t = phi + a + (2 * Math.PI - 2 * a) * i / 40; P.push([c[0] + rho * Math.cos(t), c[1] + rho * Math.sin(t)]); }
      svg = `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(Math.max(0, rho - w / 2 + 1))}" fill="${hole}" opacity="${f1(o)}"/>` +
        `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(Math.max(0, rho - w / 2 + 1))}" fill="${lumen}" opacity="${f1(o)}"/>` + membraanPts(P, { w, op: o });
    } else svg = blaasje(c[0], c[1], rho, { op: o, w, lumen });
  }
  return { svg, c, top: k < .1 ? [m[0] + (top[0] - m[0]) * k / .1, m[1] + (top[1] - m[1]) * k / .1] : top };
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
