/* Gedeelde tekenhulpjes voor de scènes van stage 'repl' (replicatie & herstel). */
import { C, BASE, COMP, f1, txt } from '../../kit.js';

export const NEW = '#5fd3e6';          // nieuw gesynthetiseerd DNA (niet te verwarren met de ouderstrengen)
export const PRIMER = C.rna;           // RNA-primer = RNA = oranje
export const ADNA = '#ffb27a';         // door Pol α gemaakt DNA-stukje van de primer
export const PCNA = '#ffe08a';

export const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('');
export const seg = (x0, y0, x1, y1, col, w = 7, op = 1, extra = '') =>
  op <= .01 ? '' : `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${f1(op)}" ${extra}/>`;
export const pth = (pts, col, w = 7, op = 1, extra = '') =>
  op <= .01 || pts.length < 2 ? '' : `<path d="${d(pts)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(op)}" ${extra}/>`;
/* uiteinde-label 5'/3' */
export const endl = (x, y, s, col = C.text, size = 17, op = 1) =>
  op <= .01 ? '' : `<g opacity="${f1(op)}">${txt(x, y, s, col, size, 'middle', 700, 'JetBrains Mono')}</g>`;
/* eiwitbolletje met label */
export function prot(cx, cy, rx, ry, col, label, fs = 15, op = 1, sub = '') {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="3"/>` +
    txt(cx, cy + fs * .36 - (sub ? fs * .5 : 0), label, '#fff', fs, 'middle', 700) +
    (sub ? txt(cx, cy + fs * .36 + fs * .75, sub, '#dfe6f5', fs * .72, 'middle', 500) : '') + '</g>';
}
/* ring (klem) gezien van opzij: ellips met drie segmenten (trimeer) */
export function clamp3(cx, cy, rx, ry, col = PCNA, op = 1, label = '', fs = 13) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">`;
  for (let k = 0; k < 3; k++) {
    const a0 = k * 2 * Math.PI / 3 + .12, a1 = (k + 1) * 2 * Math.PI / 3 - .12;
    const p0 = [cx + rx * Math.cos(a0), cy + ry * Math.sin(a0)], p1 = [cx + rx * Math.cos(a1), cy + ry * Math.sin(a1)];
    s += `<path d="M${f1(p0[0])},${f1(p0[1])} A${rx},${ry} 0 0 1 ${f1(p1[0])},${f1(p1[1])}" stroke="${col}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  }
  if (label) s += txt(cx, cy - ry - 10, label, col, fs, 'middle', 700);
  return s + '</g>';
}
/* recht dubbelstrengig stuk met basenparen (sporten) */
export function duplex(x0, x1, y, seq, { gap = 36, c1 = C.dna, c2 = C.dna2, bp = 18, w = 7, op = 1, letters = false, fs = 13 } = {}) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">`;
  const n = Math.floor((x1 - x0) / bp);
  for (let i = 0; i < n; i++) {
    const x = x0 + bp / 2 + i * bp, b = seq[i % seq.length], m = COMP[b];
    s += `<line x1="${f1(x)}" y1="${f1(y - gap / 2)}" x2="${f1(x)}" y2="${f1(y)}" stroke="${BASE[b]}" stroke-width="4.5"/>`;
    s += `<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y + gap / 2)}" stroke="${BASE[m]}" stroke-width="4.5"/>`;
    if (letters) s += txt(x, y - gap / 2 - 8, b, BASE[b], fs, 'middle', 700, 'JetBrains Mono') + txt(x, y + gap / 2 + fs + 4, m, BASE[m], fs, 'middle', 700, 'JetBrains Mono');
  }
  s += seg(x0, y - gap / 2, x1, y - gap / 2, c1, w) + seg(x0, y + gap / 2, x1, y + gap / 2, c2, w);
  return s + '</g>';
}
/* onderschrift-kader (groot en leesbaar) */
export function tag(x, y, s, col = C.text, fs = 16, anchor = 'middle', op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}">${txt(x, y, s, col, fs, anchor, 600)}</g>`;
}
/* pijl */
export function arrow(x0, y0, x1, y1, col = C.muted, w = 3, op = 1) {
  if (op <= .01) return '';
  const a = Math.atan2(y1 - y0, x1 - x0), h = 6 + w * 2.2;
  const p1 = [x1 - h * Math.cos(a - .45), y1 - h * Math.sin(a - .45)], p2 = [x1 - h * Math.cos(a + .45), y1 - h * Math.sin(a + .45)];
  return `<g opacity="${f1(op)}"><line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1 - Math.cos(a) * h * .6)}" y2="${f1(y1 - Math.sin(a) * h * .6)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${f1(x1)},${f1(y1)}L${f1(p1[0])},${f1(p1[1])}L${f1(p2[0])},${f1(p2[1])}Z" fill="${col}"/></g>`;
}
/* kleine RPA-bolletjes op enkelstrengig DNA */
export function rpaRow(x0, x1, y, op = 1, sp = 44, ry = 13) {
  if (op <= .01 || x1 - x0 < 20) return '';
  let s = `<g opacity="${f1(op)}">`;
  for (let x = x0 + sp / 2; x < x1 - 8; x += sp) s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(sp / 2 - 3)}" ry="${ry}" fill="#d9a8f5" fill-opacity=".35" stroke="#d9a8f5" stroke-width="2.5"/>`;
  return s + '</g>';
}
export const RPA = '#d9a8f5';
