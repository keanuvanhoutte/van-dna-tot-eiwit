/* Gedeelde tekenhulpjes voor de RNA-scènes (export, nmd, rnai, mrnaafbraak, editing, rnastructuur). */
import { C, BASE, f1, clamp, lerp } from '../../kit.js';

/* ---------- polylijn met booglengte: punt op afstand s ---------- */
export function polyPath(pts) {
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = acc[acc.length - 1];
  function at(s) {
    if (s <= 0) { const [a, b] = [pts[0], pts[1]], l = acc[1] || 1; return [a[0] + (b[0] - a[0]) * s / l, a[1] + (b[1] - a[1]) * s / l]; }
    if (s >= total) { const n = pts.length, a = pts[n - 2], b = pts[n - 1], l = (acc[n - 1] - acc[n - 2]) || 1, e = s - total; return [b[0] + (b[0] - a[0]) * e / l, b[1] + (b[1] - a[1]) * e / l]; }
    let lo = 0, hi = acc.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (acc[m] <= s) lo = m; else hi = m; }
    const k = (s - acc[lo]) / ((acc[hi] - acc[lo]) || 1);
    return [lerp(pts[lo][0], pts[hi][0], k), lerp(pts[lo][1], pts[hi][1], k)];
  }
  return { at, total };
}
/* kubische bezier bemonsteren */
export function bez(p0, p1, p2, p3, n = 24) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]);
  }
  return out;
}
export const dpath = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('');

/* ---------- vormen ---------- */
/* eiwitblob met naam (afgeronde rechthoek), goed leesbaar */
export function prot(x, y, w, h, label, col = C.prot, op = 1, fs = 16, extra = '') {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" ${extra}><rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="${Math.min(h / 2, 16)}" fill="${col}" fill-opacity=".88" stroke="#0a1224" stroke-width="1.5"/>` +
    `<text x="${f1(x)}" y="${f1(y + fs * .36)}" font-size="${fs}" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">${label}</text></g>`;
}
/* m7G-cap */
export function capG(x, y, r = 16, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/>` +
    `<text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .68)}" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text></g>`;
}
/* ribosoom (80S) schematisch; x,y = midden van de mRNA-bindingsgoot */
export function ribo(x, y, s = 1, op = 1, lab = '80S') {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <path d="M-62,-8 C-70,-60 -30,-92 5,-92 C45,-92 72,-62 64,-8 Z" fill="rgba(44,198,168,.28)" stroke="${C.rrna}" stroke-width="3"/>
    <path d="M-50,10 C-52,40 -20,52 4,52 C30,52 54,40 50,10 Z" fill="rgba(44,198,168,.4)" stroke="${C.rrna}" stroke-width="3"/>
    <text x="2" y="-40" font-size="18" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">${lab}</text></g>`;
}
/* nucleotiden als rijtje letters langs een horizontale lijn */
export function ntRow(x0, y, seq, w = 30, h = 30, op = 1, fs) {
  let s = `<g opacity="${f1(op)}">`;
  for (let i = 0; i < seq.length; i++) {
    const b = seq[i], x = x0 + i * w;
    if (b === ' ') continue;
    s += `<rect x="${f1(x - w / 2 + 2)}" y="${f1(y)}" width="${w - 4}" height="${h}" rx="5" fill="${BASE[b] ?? (b === 'I' ? '#e0e0e0' : '#888')}"/>` +
      `<text x="${f1(x)}" y="${f1(y + h * .72)}" font-size="${fs ?? Math.round(h * .62)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`;
  }
  return s + '</g>';
}
/* één nucleotide-blokje gecentreerd in (x,y) */
export function ntBox(x, y, b, sz = 30, op = 1, rot = 0) {
  if (op <= .01) return '';
  const col = b === 'I' ? '#e7e7e7' : BASE[b] ?? '#888';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><rect x="${-sz / 2 + 1}" y="${-sz / 2 + 1}" width="${sz - 2}" height="${sz - 2}" rx="5" fill="${col}"/>` +
    `<text x="0" y="${f1(sz * .22)}" font-size="${Math.round(sz * .6)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text></g>`;
}
/* waterstofbruggen tussen twee punten (n streepjes) */
export function hb(x0, y0, x1, y1, n = 2, op = 1, col = '#fff') {
  if (op <= .01) return '';
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
  let s = `<g opacity="${f1(op)}">`;
  for (let k = 0; k < n; k++) { const o = (k - (n - 1) / 2) * 6; s += `<line x1="${f1(x0 + nx * o)}" y1="${f1(y0 + ny * o)}" x2="${f1(x1 + nx * o)}" y2="${f1(y1 + ny * o)}" stroke="${col}" stroke-width="2.2" stroke-dasharray="3 3"/>`; }
  return s + '</g>';
}
export const npairs = (a, b) => ((a === 'G' && b === 'C') || (a === 'C' && b === 'G') ? 3 : 2);
/* pijl */
export const arrow = (x0, y0, x1, y1, col = C.muted, w = 3, op = 1) => op <= .01 ? '' :
  `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="${col}" stroke-width="${w}" marker-end="url(#arrow)" opacity="${f1(op)}"/>`;
/* schaarsymbool / knip */
export const snip = (x, y, op = 1, col = '#fff') => op <= .01 ? '' :
  `<path d="M${f1(x - 12)},${f1(y - 22)} l24,44 M${f1(x + 12)},${f1(y - 22)} l-24,44" stroke="${col}" stroke-width="3.5" opacity="${f1(op)}" stroke-linecap="round"/>`;
/* tekst met achtergrondkader (goed leesbaar boven drukke achtergrond) */
export function note(x, y, s, col = C.text, fs = 16, anchor = 'middle', op = 1) {
  if (op <= .01) return '';
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="${fs}" text-anchor="${anchor}" fill="${col}" font-family="Inter" font-weight="600" opacity="${f1(op)}" paint-order="stroke" stroke="#070b16" stroke-width="5" stroke-linejoin="round">${s}</text>`;
}
export const fade = (p, a, b) => clamp((p - a) / (b - a));

/* ---------- hotspots los van de tekening ----------
 * hot() maakt een onzichtbare, klikbare rechthoek die ook het label-anker is.
 * setHot(svg, id, [cx, cy, w, h] | null) verplaatst hem; null = verborgen (geen label). below = label onder het anker. */
export const hot = (node, label, color, id, href = '', below = false) =>
  `<g data-node="${node}" data-color="${color}" data-label="${label}"${href ? ` data-href="${href}"` : ''}><rect id="${id}" data-anchor="${node}"${below ? ' data-pos="below"' : ''} x="-9999" y="0" width="0" height="0" fill="transparent" style="cursor:pointer"/></g>`;
export function setHot(svg, id, box) {
  const r = svg.getElementById(id);
  if (!r) return;
  if (!box) { r.setAttribute('width', 0); r.setAttribute('height', 0); r.setAttribute('x', -9999); return; }
  const [cx, cy, w, h] = box;
  r.setAttribute('x', f1(cx - w / 2)); r.setAttribute('y', f1(cy - h / 2)); r.setAttribute('width', f1(w)); r.setAttribute('height', f1(h));
}
