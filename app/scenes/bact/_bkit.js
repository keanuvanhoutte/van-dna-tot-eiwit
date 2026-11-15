/* Gedeelde tekenhulpjes voor de bacteriescènes (verhaallijn 3). Hergebruikt prot/panel/arrow uit de transcriptie-kit. */
import { C, f1 } from '../../kit.js';
import { bacterieWand, bacterieWandDikte, ptsStaaf, ptsLijn, ribosoomKlein, eiwitPad, LIPID, PG, LPS } from '../../bio.js';
export { prot, panel, arrow, blobPath } from '../txn/_txn.js';

/* vaste kleuren binnen de bacterie-route */
export const K = {
  cell: C.bact, plas: '#f0a3d0', ori: '#ffc247', res: '#ff6b6b', tra: '#5fd3e6', rnap: '#9b7bff', sig: '#e8a23a',
  ribo: C.rrna, laci: '#ff6b6b', cap: '#5fd3e6', term: '#7fdc6a', sd: '#ffc247', amp: '#c9d2e4',
};

/* ribosoom (70S) in overzichtsbeelden: kleine eenheid (30S) onder op het mRNA, grote eenheid (50S) erboven; de keten
 * komt bovenaan uit de 50S. Bobbelige vorm uit de gedeelde tekenset (ribosoomKlein, 180° gedraaid). Parameters ongewijzigd. */
const riboVorm = new Map();
export const ribo = (x, y, s = 1, op = 1, col = K.ribo) => {
  if (op <= .01) return '';
  const k = f1(s) + col; if (!riboVorm.has(k)) riboVorm.set(k, ribosoomKlein(0, 0, { s, rot: 180, col }));
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)})">${riboVorm.get(k)}</g>`;
};

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

/* staafvormige bacterie met gramnegatieve celenvelop (E. coli): binnenmembraan – periplasma met dunne peptidoglycaanlaag –
 * buitenmembraan met LPS, elk membraan als lipidedubbellaag (Silhavy, Kahne & Walker 2010).
 * (x, y, w, h) = omhullende rechthoek zoals vroeger; de buitenrand van de envelop valt op die rechthoek.
 * Dikte: echt is de envelop ≈ 30–40 nm op een cel van ≈ 0,8–1 µm breed (≈ 4 % per kant). Om leesbaar te blijven is ze hier
 * ≈ 7–9 % van de celdiameter per kant: membraandikte mw ≈ (0,075·h − 2) / 4, tussen 3,5 en 12 px. Vanaf mw 10 tekent bacterieWand
 * (app/bio.js) elk membraan met lipidekopjes en staartjes; dunner gaat dat niet, dus daaronder een vereenvoudigde dunne envelop
 * met dezelfde opbouw (twee lijnen per dubbellaag) en dezelfde maten, zodat rodLagen voor beide klopt.
 * Statisch per maat → opgeslagen, zodat scènes die rodCell in update() oproepen geen rekenwerk per frame hebben. */
const wandDik = h => Math.max(3.5, Math.min(12, (h * .075 - 2) / 4));
export const rodInner = (x, y, w, h) => { const mw = wandDik(h), d = bacterieWandDikte('neg', mw) + 2; return { cx: x + w / 2, cy: y + h / 2, len: w - 2 * d, r: h / 2 - d, mw, d }; };
/* dunne envelop rond een staaf (binnenmembraan: middelpunt cx,cy, totale lengte len, straal r); elke laag = afgeronde rechthoek */
function dunneWand(cx, cy, len, r, m) {
  const R = (t, sw, col, extra = '') => `<rect x="${f1(cx - len / 2 - t)}" y="${f1(cy - r - t)}" width="${f1(len + 2 * t)}" height="${f1(2 * (r + t))}" rx="${f1(r + t)}" stroke="${col}" stroke-width="${f1(sw)}"${extra}/>`;
  const hw = Math.max(1.1, m * .22);
  const mem = t => R(t, m, LIPID.tail, ' stroke-opacity=".45"') + [-1, 1].map(sd => R(t + sd * (m / 2 - hw / 2), hw, LIPID.head,
    m >= 5 ? ` stroke-linecap="round" stroke-dasharray="0 ${f1(hw * 1.9)}"` : '')).join('');
  return '<g fill="none">' + R(1.3 * m, 1.6 * m, 'rgba(185,163,227,.10)') +                                   // periplasma
    R(1.3 * m, Math.max(1.2, m * .25), PG) + R(1.3 * m, Math.max(2, m * .55), PG, ' stroke-dasharray="1.4 4" opacity=".8"') +   // dunne peptidoglycaanlaag
    mem(0) + mem(2.6 * m) +                                                                                           // binnen- en buitenmembraan
    R(3.55 * m, .9 * m, LPS, ` stroke-dasharray="1.4 ${f1(Math.max(2.4, m * .45))}" opacity=".9"`) + '</g>';        // LPS op de buitenkant
}
const rodCache = new Map();
export function rodCell(x, y, w, h, op = 1, labelled = false) {
  if (op <= .01) return '';
  const key = [x, y, w, h].join(',');
  let body = rodCache.get(key);
  if (!body) {
    const { cx, cy, len, r, mw } = rodInner(x, y, w, h), P = ptsStaaf(cx, cy, len, r);
    body = `<path d="M${P.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L')}Z" fill="url(#gCyto)"/>` +
      (mw >= 10 ? bacterieWand(P, { type: 'neg', w: mw }) : dunneWand(cx, cy, len, r, mw));
    rodCache.set(key, body);
  }
  return `<g opacity="${f1(op)}">${body}</g>`;
}
/* recht stuk gramnegatieve envelop (ingezoomd), binnenmembraan op hoogte y, buitenwereld boven */
export const wandLijn = (x0, x1, y, w = 14, op = 1) => bacterieWand(ptsLijn(x0, y, x1, y, Math.max(2, Math.round((x1 - x0) / 12))), { type: 'neg', closed: false, w, op });
/* hoogtes van de lagen aan de bovenkant van een rodCell (recht stuk): buitenmembraan (om), peptidoglycaan (pg),
 * binnenmembraan (im), bovenrand LPS (top) en membraandikte (mw) */
export const rodLagen = (x, y, w, h) => { const mw = wandDik(h); return { top: y + 2, om: y + 2 + 1.4 * mw, pg: y + 2 + 2.7 * mw, im: y + 2 + 4 * mw, mw }; };

/* porine (bv. OmpF) in het buitenmembraan, zijaanzicht: β-vat met een waterkanaal in het midden.
 * (x, y) = midden in het membraan, h = hoogte (iets meer dan de membraandikte). rot in graden (0 = membraan horizontaal). */
export function porine(x, y, h = 30, { op = 1, col = '#7fc8ff', rot = 0 } = {}) {
  if (op <= .01) return '';
  const w = h * 1.25, hw = w / 2, hh = h / 2;
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})">` +
    `<rect x="${f1(-hw)}" y="${f1(-hh)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w * .22)}" fill="#0b1224"/>` +
    `<rect x="${f1(-hw)}" y="${f1(-hh)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w * .22)}" fill="${col}" fill-opacity=".45" stroke="${col}" stroke-width="2"/>`;
  for (let k = 1; k < 6; k++) { const sx = -hw + w * k / 6; if (Math.abs(sx) > w * .14) g += `<line x1="${f1(sx - 2)}" y1="${f1(-hh + 3)}" x2="${f1(sx + 2)}" y2="${f1(hh - 3)}" stroke="${col}" stroke-width="1.6" stroke-opacity=".8"/>`; }   // β-strengen
  return g + `<rect x="${f1(-w * .12)}" y="${f1(-hh - 1)}" width="${f1(w * .24)}" height="${f1(h + 2)}" rx="${f1(w * .1)}" fill="#0b1224"/></g>`;     // kanaal (water)
}

/* ribosoomeenheid op grote schaal (schema's): bobbelige vorm met lichte vulling, zodat tRNA's en keten erin zichtbaar blijven */
export const eenheid = (cx, cy, rx, ry, seed, fo = .22, col = K.ribo, op = 1) => op <= .01 ? '' :
  `<path d="${eiwitPad(cx, cy, rx, ry, seed, .035)}" fill="${col}" fill-opacity="${fo}" stroke="${col}" stroke-width="3" opacity="${f1(op)}"/>`;
