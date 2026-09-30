/*
 * Scène-kit: gedeelde kleuren, SVG-helpers en wiskunde voor alle scènes.
 * Lees ook app/SCENES.md (het contract waaraan elke scène moet voldoen).
 */
import { L, lang } from '../shared/i18n.js';
export { L, lang };

/* vaste kleurcodes (zelfde betekenis in de hele app) */
export const C = {
  dna: '#4f8ff7', dna2: '#9cc0ff', tdna: '#f06bc0', rna: '#ff8a3d', trna: '#ffc247', rrna: '#2cc6a8',
  prot: '#9b7bff', prot2: '#6f5bd6', prot3: '#5a4bb8', chain: '#7fdc6a', mem: '#c9a574', bact: '#d65a5a', histone: '#8a93a8',
  text: '#e8edf7', muted: '#93a0bb', bg: '#070b16', panel: '#0d1426', intron: '#a9876f', cap: '#ffb27a', danger: '#ff6b6b', ok: '#7fdc6a',
};
export const BASE = { A: '#5ad17a', T: '#ff6b6b', U: '#ff6b6b', G: '#ffc247', C: '#4fb0ff' };
export const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
export const RNA_COMP = { A: 'U', T: 'A', G: 'C', C: 'G' };
export const RNA_PAIR = { A: 'U', U: 'A', G: 'C', C: 'G' };

/* genetische code (standaard), volgorde U C A G */
const AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const IDX = { U: 0, C: 1, A: 2, G: 3 };
export const translate = cod => AA[IDX[cod[0]] * 16 + IDX[cod[1]] * 4 + IDX[cod[2]]];
export const THREE = { A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly', H: 'His', I: 'Ile', L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val', '*': 'Stop' };
export const AACLASS = { A: 'h', V: 'h', L: 'h', I: 'h', M: 'h', F: 'h', W: 'h', G: 's', P: 's', S: 'p', T: 'p', C: 'p', N: 'p', Q: 'p', Y: 'p', K: '+', R: '+', H: '+', D: '-', E: '-' };
export const CLASSCOL = { h: '#7fdc6a', s: '#ffc247', p: '#5fd3e6', '+': '#4f8ff7', '-': '#ff6b6b' };

/* wiskunde */
export const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = t => 1 - Math.pow(1 - t, 3);
/* deel van een stap: sub(p, a, b) = 0 vóór a, 1 na b, lineair ertussen */
export const sub = (p, a, b) => clamp((p - a) / (b - a));
/* deterministische toevalsgenerator */
export function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

/* SVG-helpers (geven strings terug) */
export const f1 = n => (+n).toFixed(1);
export const T2 = (nl, en) => L({ nl, en });
export function pill(x, y, w, h, text, col = C.prot, op = 1, fs = 12) {
  if (op <= 0.01) return '';
  return `<g opacity="${f1(op)}"><rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${w}" height="${h}" rx="${h / 2}" fill="${col}" opacity=".9"/>` +
    `<text x="${f1(x)}" y="${f1(y + fs * .36)}" font-size="${fs}" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="600">${text}</text></g>`;
}
export function txt(x, y, s, col = C.text, size = 13, anchor = 'middle', weight = 600, font = 'Inter') {
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" text-anchor="${anchor}" fill="${col}" font-family="${font}" font-weight="${weight}">${s}</text>`;
}
export const mono = (x, y, s, col = C.text, size = 13) => txt(x, y, s, col, size, 'middle', 700, 'JetBrains Mono');
export const line = (x0, y0, x1, y1, col, w = 3, extra = '') => `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
export const path = (pts, col, w = 3, extra = '') => `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('')}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
export const blob = (cx, cy, rx, ry, col, op = .22, stroke = col) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity="${op}" stroke="${stroke}" stroke-width="2.5"/>`;
/* nucleotide-blokje met letter */
export function nt(x, y, b, w = 24, h = 22, op = 1) {
  return `<g opacity="${f1(op)}"><rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${h}" rx="4" fill="${BASE[b]}"/>` +
    `<text x="${f1(x)}" y="${f1(y + h * .7)}" font-size="${Math.round(h * .6)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text></g>`;
}
/* aminozuurbolletje */
export function aa(x, y, a, r = 14) {
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]] ?? '#aaa'}" stroke="#0a1224" stroke-width="2"/>` +
    `<text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .72)}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${THREE[a]}</text>`;
}
/* golvende lijn */
export function squiggle(r, x, y, n, step, amp) {
  let d = `M${f1(x)},${f1(y)}`, a = r() * 6.28;
  for (let i = 0; i < n; i++) {
    a += (r() - .5) * 1.4; x += Math.cos(a) * step; y += Math.sin(a) * step;
    d += ` Q${f1(x + (r() - .5) * amp)},${f1(y + (r() - .5) * amp)} ${f1(x)},${f1(y)}`;
  }
  return d;
}
/* gemeenschappelijke <defs> */
export const defs = `
<defs>
  <radialGradient id="gNuc" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#1a2a4f"/><stop offset="1" stop-color="#0f1a33"/></radialGradient>
  <radialGradient id="gCyto" cx="45%" cy="50%" r="70%"><stop offset="0" stop-color="#132143"/><stop offset="1" stop-color="#0c1530"/></radialGradient>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#93a0bb"/></marker>
</defs>`;
/* lege scène-achtergrond met optionele titel in beeld */
export const svgOpen = (extra = '') => `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}<rect x="-2000" y="-2000" width="5600" height="4900" fill="transparent"/>${extra}`;

/* camera-hulpje: rechthoek rond een middelpunt met breedte w (16:9) */
export const cam = (cx, cy, w) => [cx - w / 2, cy - w * 9 / 32, w, w * 9 / 16];
export const FULL = [0, 0, 1600, 900];

/* Snelheid van vanzelf draaiende figuren (1 = oorspronkelijk). Gebruikersfeedback: te snel draaien kost overzicht. */
export const SPIN = 0.35;
