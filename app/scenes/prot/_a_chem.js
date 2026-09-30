/*
 * Kleine 2D-chemietekenhulp (agent prot-a): atoomletters, bindingen, wiggen — alles als SVG-string.
 */
import { f1 } from '../../kit.js';

export const ACOL = { C: '#dfe6f3', N: '#6fa8ff', O: '#ff7b7b', S: '#ffd84a', Se: '#ffa94a', H: '#b8c2d6', R: '#7fdc6a' };
/* atoomlabel met donkere achtergrond zodat bindingen niet door de letter lopen */
export function at(x, y, s, col, size = 26) {
  const c = col ?? ACOL[s.replace(/[^A-Za-z]/g, '').slice(0, 2)] ?? ACOL[s[0]] ?? '#dfe6f3';
  return `<text x="${f1(x)}" y="${f1(y + size * .36)}" font-size="${size}" text-anchor="middle" fill="${c}" font-family="Inter" font-weight="700" paint-order="stroke" stroke="#0b1224" stroke-width="10" stroke-linejoin="round">${s}</text>`;
}
/* binding, ingekort aan beide kanten (sh = afstand tot atoomcentrum) */
export function bd(x1, y1, x2, y2, { dbl = false, sh = 18, sh2, col = '#c9d2e4', w = 3.5, dash = false } = {}) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
  const a = [x1 + ux * sh, y1 + uy * sh], b = [x2 - ux * (sh2 ?? sh), y2 - uy * (sh2 ?? sh)];
  const ln = (o) => `<line x1="${f1(a[0] - uy * o)}" y1="${f1(a[1] + ux * o)}" x2="${f1(b[0] - uy * o)}" y2="${f1(b[1] + ux * o)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${dash ? 'stroke-dasharray="7 6"' : ''}/>`;
  return dbl ? ln(-4) + ln(4) : ln(0);
}
/* wig (naar de kijker toe) of streepjeswig (van de kijker weg) */
export function wedge(x1, y1, x2, y2, { hash = false, sh = 16, col = '#c9d2e4' } = {}) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
  const a = [x1 + ux * 6, y1 + uy * 6], b = [x2 - ux * sh, y2 - uy * sh], w = 8;
  if (!hash) return `<path d="M${f1(a[0])},${f1(a[1])} L${f1(b[0] - uy * w)},${f1(b[1] + ux * w)} L${f1(b[0] + uy * w)},${f1(b[1] - ux * w)}Z" fill="${col}"/>`;
  let s = ''; for (let k = 1; k <= 6; k++) { const t = k / 6, cx = a[0] + (b[0] - a[0]) * t, cy = a[1] + (b[1] - a[1]) * t, ww = w * t; s += `<line x1="${f1(cx - uy * ww)}" y1="${f1(cy + ux * ww)}" x2="${f1(cx + uy * ww)}" y2="${f1(cy - ux * ww)}" stroke="${col}" stroke-width="3"/>`; }
  return s;
}
