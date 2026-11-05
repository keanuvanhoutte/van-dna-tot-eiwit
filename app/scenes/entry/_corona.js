/*
 * Gedeelde tekenhulpjes voor het zijpad "Hoe een virus zichzelf laat maken" (05-11-2026):
 * viruskopie, assemblage (entry) en faag, crispr (bact). Kleuren volgen app/kit.js en entry/virus.js:
 * viraal RNA oranje (C.rna), uitsteeksels (spikes) #ff9d5c, receptor #7fc9b6, eiwitketen groen (C.chain), membranen C.mem.
 */
import { C, f1 } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn, ribo } from '../prot/_fate.js';
export { T, btn, ribo };

export const SPIKE = '#ff9d5c', REC = '#7fc9b6', CUT = '#e070ff', COPY = C.prot2, DRUG = '#5fd3e6', NPROT = '#ffd166';
export const PHAGE = '#c7d2e8', PHDNA = C.tdna;

/* knop met link (bv. naar de atlas): zoals btn, maar met data-href */
export const hbtn = (node, x, w, label, col, href, y = 40) => `<g data-node="${node}" data-href="${href}" data-nolabel data-color="${col}"><rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="rgba(13,20,38,.75)" stroke="${col}" stroke-width="2"/>${T(x + w / 2, y + 35, label, { size: 22, halo: false })}</g>`;

/* coronavirusdeeltje: envelop met uitsteeksels (spikes) en ingepakt RNA; R = straal */
export function corona(x, y, R, op = 1, spikes = 14) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)})">`;
  for (let i = 0; i < spikes; i++) {
    const a = (i + .5) * 2 * Math.PI / spikes, cx = Math.cos(a), sy = Math.sin(a);
    s += `<line x1="${f1(cx * R)}" y1="${f1(sy * R)}" x2="${f1(cx * R * 1.3)}" y2="${f1(sy * R * 1.3)}" stroke="${SPIKE}" stroke-width="${f1(R * .1)}"/>`;
    s += `<circle cx="${f1(cx * R * 1.36)}" cy="${f1(sy * R * 1.36)}" r="${f1(R * .13)}" fill="${SPIKE}"/>`;
  }
  s += `<circle r="${f1(R)}" fill="rgba(201,165,116,.14)" stroke="${C.mem}" stroke-width="${f1(R * .12)}"/>`;
  s += `<path d="M${f1(-R * .55)},${f1(R * .1)} q${f1(R * .18)},${f1(-R * .4)} ${f1(R * .36)},0 t${f1(R * .36)},0 t${f1(R * .36)},0" stroke="${C.rna}" stroke-width="${f1(R * .1)}" fill="none" stroke-linecap="round"/>`;
  for (const [u, v] of [[-.4, -.05], [0, .15], [.38, -.1]]) s += `<circle cx="${f1(u * R)}" cy="${f1(v * R)}" r="${f1(R * .12)}" fill="${NPROT}" opacity=".85"/>`;
  return s + '</g>';
}

/* blaasje met dubbel membraan (vervormd ER) */
export function dmv(x, y, r, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="rgba(201,165,116,.08)" stroke="${C.mem}" stroke-width="7"/>` +
    `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(0, r - 13))}" fill="rgba(10,18,36,.6)" stroke="${C.mem}" stroke-width="5"/></g>`;
}

/* golvende RNA-streng van x0 naar x1 op hoogte y */
export function rnaWave(x0, x1, y, op = 1, w = 7, col = C.rna, amp = 7) {
  if (op <= .01 || x1 - x0 < 2) return '';
  let d = `M${f1(x0)},${f1(y)}`;
  for (let x = x0 + 10; x <= x1; x += 10) d += ` L${f1(x)},${f1(y + amp * Math.sin((x - x0) / 18))}`;
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(op)}"/>`;
}

/* schaartje (pictogram) */
export function scissors(x, y, s = 1, op = 1, open = .5, col = CUT) {
  if (op <= .01) return '';
  const a = 12 + 18 * open;
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})" stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round">` +
    `<g transform="rotate(${f1(-a)})"><line x1="-4" y1="0" x2="34" y2="0"/><circle cx="-14" cy="0" r="9"/></g>` +
    `<g transform="rotate(${f1(a)})"><line x1="-4" y1="0" x2="34" y2="0"/><circle cx="-14" cy="0" r="9"/></g></g>`;
}

/* bacteriofaag: kop (zeshoek) + staart + poten; (x, y) = punt van de staart; DNA in de kop zichtbaar als full > 0 */
export function phage(x, y, s = 1, op = 1, full = 1, ang = 0) {
  if (op <= .01) return '';
  const hex = [0, 60, 120, 180, 240, 300].map(a => `${f1(46 * Math.sin(a * Math.PI / 180))},${f1(-150 - 46 * Math.cos(a * Math.PI / 180))}`).join(' ');
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)}) scale(${f1(s)})">`;
  g += `<polygon points="${hex}" fill="rgba(199,210,232,.12)" stroke="${PHAGE}" stroke-width="5" stroke-linejoin="round"/>`;
  if (full > .01) g += `<path d="M-22,-170 q11,-14 22,0 t22,0 M-24,-148 q12,-14 24,0 t24,0 M-20,-126 q10,-12 20,0 t20,0" stroke="${PHDNA}" stroke-width="4" fill="none" opacity="${f1(full)}"/>`;
  g += `<rect x="-9" y="-104" width="18" height="78" rx="4" fill="rgba(199,210,232,.25)" stroke="${PHAGE}" stroke-width="4"/>`;
  for (let i = 0; i < 5; i++) g += `<line x1="-9" y1="${-96 + i * 15}" x2="9" y2="${-96 + i * 15}" stroke="${PHAGE}" stroke-width="2" opacity=".7"/>`;
  g += `<rect x="-22" y="-28" width="44" height="10" rx="4" fill="${PHAGE}"/>`;
  g += `<path d="M-20,-20 L-46,4 L-40,22 M20,-20 L46,4 L40,22 M-10,-20 L-20,16 M10,-20 L20,16" stroke="${PHAGE}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return g + '</g>';
}
