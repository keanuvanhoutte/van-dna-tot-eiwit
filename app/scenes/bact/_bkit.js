/* Gedeelde tekenhulpjes voor de bacteriescènes (verhaallijn 3). Hergebruikt prot/panel/arrow uit de transcriptie-kit. */
import { C, f1 } from '../../kit.js';
export { prot, panel, arrow, blobPath } from '../txn/_txn.js';

/* vaste kleuren binnen de bacterie-route */
export const K = {
  cell: C.bact, plas: '#f0a3d0', ori: '#ffc247', res: '#ff6b6b', tra: '#5fd3e6', rnap: '#9b7bff', sig: '#e8a23a',
  ribo: C.rrna, laci: '#ff6b6b', cap: '#5fd3e6', term: '#7fdc6a', sd: '#ffc247', amp: '#c9d2e4',
};

/* ribosoom (70S) van opzij: kleine eenheid (30S) onder, grote eenheid (50S) boven */
export const ribo = (x, y, s = 1, op = 1, col = K.ribo) => op <= .01 ? '' :
  `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><ellipse cx="0" cy="-6" rx="11" ry="8" fill="${col}" fill-opacity=".55" stroke="${col}" stroke-width="1.6"/>` +
  `<ellipse cx="0" cy="6" rx="8" ry="5" fill="${col}" fill-opacity=".75" stroke="${col}" stroke-width="1.6"/></g>`;

/* dubbelstrengs DNA-ring (twee strengen) */
export const dsRing = (cx, cy, r, col = C.dna, w = 3, op = 1) => op <= .01 ? '' :
  `<g opacity="${f1(op)}" fill="none"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" stroke="${col}" stroke-width="${w}"/>` +
  `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(Math.max(1, r - w * 1.8))}" stroke="${C.dna2}" stroke-width="${f1(w * .7)}" stroke-opacity=".8"/></g>`;

/* boog op een cirkel (hoeken in graden, 0 = boven, met de klok mee) */
export function arcPath(cx, cy, r, a0, a1) {
  const P = a => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
  const [x0, y0] = P(a0), [x1, y1] = P(a1);
  return `M${f1(x0)},${f1(y0)} A${r},${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)}`;
}
export const onCircle = (cx, cy, r, a) => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];

/* staafvormige bacterie met Gram-negatieve envelop (buitenmembraan · dunne peptidoglycaanlaag · binnenmembraan) */
export function rodCell(x, y, w, h, op = 1, labelled = false) {
  if (op <= .01) return '';
  const r = h / 2, ring = (d, col, sw, extra = '') => `<rect x="${f1(x + d)}" y="${f1(y + d)}" width="${f1(w - 2 * d)}" height="${f1(h - 2 * d)}" rx="${f1(r - d)}" fill="none" stroke="${col}" stroke-width="${sw}" ${extra}/>`;
  return `<g opacity="${f1(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="url(#gCyto)"/>` +
    ring(0, C.mem, 5) + ring(11, '#8a93a8', 3, 'stroke-dasharray="7 5"') + ring(22, C.mem, 5) + (labelled ? '' : '') + '</g>';
}
