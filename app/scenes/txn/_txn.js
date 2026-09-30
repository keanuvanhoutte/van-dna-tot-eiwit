/* Gedeelde tekenhulpjes voor de txn-scènes (genregulatie, promoter, operon, polymerasen). */
import { C, BASE, f1, rng } from '../../kit.js';

/* Dubbelhelix langs een willekeurige middellijn.
 * center(u) → [x, y] voor u ∈ [u0, u1] (u = "rechte" coördinaat in px, bepaalt de fase),
 * geeft { s1, s2, rungs } als SVG-strings terug. seq: string met basen (optioneel). */
export function helixAlong(center, u0, u1, { amp = 16, period = 72, step = 4, rungEvery = 9, seq = null, seed = 7, open = null } = {}) {
  const K = 2 * Math.PI / period;
  let d1 = '', d2 = '', rungs = '';
  const r = rng(seed);
  const BS = 'ACGT';
  const pt = u => center(u);
  const nrm = u => { const a = pt(u - 1.5), b = pt(u + 1.5); const dx = b[0] - a[0], dy = b[1] - a[1]; const L = Math.hypot(dx, dy) || 1; return [-dy / L, dx / L]; };
  let first = true;
  for (let u = u0; u <= u1; u += step) {
    const c = pt(u), n = nrm(u), o = open ? open(u) : 0;
    const a1 = amp * Math.sin(K * u) * (1 - o) + (amp + 22) * o, a2 = amp * Math.sin(K * u + 2.3) * (1 - o) - (amp + 22) * o;
    d1 += `${first ? 'M' : 'L'}${f1(c[0] + n[0] * a1)},${f1(c[1] + n[1] * a1)}`;
    d2 += `${first ? 'M' : 'L'}${f1(c[0] + n[0] * a2)},${f1(c[1] + n[1] * a2)}`;
    first = false;
  }
  for (let u = u0 + 3, i = 0; u <= u1; u += rungEvery, i++) {
    const c = pt(u), n = nrm(u), o = open ? open(u) : 0;
    const b = seq ? seq[i % seq.length] : BS[Math.floor(r() * 4)];
    const m = { A: 'T', T: 'A', G: 'C', C: 'G' }[b];
    const a1 = amp * Math.sin(K * u) * (1 - o) + (amp + 22) * o, a2 = amp * Math.sin(K * u + 2.3) * (1 - o) - (amp + 22) * o;
    const p1 = [c[0] + n[0] * a1, c[1] + n[1] * a1], p2 = [c[0] + n[0] * a2, c[1] + n[1] * a2];
    if (o > .5) {
      rungs += `<line x1="${f1(p1[0])}" y1="${f1(p1[1])}" x2="${f1(p1[0] - n[0] * 12)}" y2="${f1(p1[1] - n[1] * 12)}" stroke="${BASE[b]}" stroke-width="3.5"/>`;
      rungs += `<line x1="${f1(p2[0])}" y1="${f1(p2[1])}" x2="${f1(p2[0] + n[0] * 12)}" y2="${f1(p2[1] + n[1] * 12)}" stroke="${BASE[m]}" stroke-width="3.5"/>`;
    } else {
      const pm = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
      rungs += `<line x1="${f1(p1[0])}" y1="${f1(p1[1])}" x2="${f1(pm[0])}" y2="${f1(pm[1])}" stroke="${BASE[b]}" stroke-width="3.5"/><line x1="${f1(pm[0])}" y1="${f1(pm[1])}" x2="${f1(p2[0])}" y2="${f1(p2[1])}" stroke="${BASE[m]}" stroke-width="3.5"/>`;
    }
  }
  return { s1: d1, s2: d2, rungs };
}

/* organische eiwitvorm (deterministisch) rond (cx, cy) */
export function blobPath(cx, cy, rx, ry, seed = 3, wob = .12, n = 10) {
  const r = rng(seed);
  const pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * 2 * Math.PI, k = 1 + (r() - .5) * 2 * wob; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
  let d = '';
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    if (!i) d += `M${f1(p1[0])},${f1(p1[1])}`;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d + 'Z';
}
export const prot = (cx, cy, rx, ry, col, op = 1, seed = 3, label = '', fs = 15, lc = '#fff') => op <= .01 ? '' :
  `<g opacity="${f1(op)}"><path d="${blobPath(cx, cy, rx, ry, seed)}" fill="${col}" fill-opacity=".32" stroke="${col}" stroke-width="2.5"/>` +
  (label ? `<text x="${f1(cx)}" y="${f1(cy + fs * .35)}" font-size="${fs}" text-anchor="middle" fill="${lc}" font-family="Inter" font-weight="700">${label}</text>` : '') + '</g>';

/* nucleosoom (histonoctameer met ~1,65 winding DNA eromheen, schematisch) */
export function nucleosome(x, y, op = 1, ac = 0, rot = 0) {
  if (op <= .01) return '';
  let s = `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" opacity="${f1(op)}">` +
    `<ellipse rx="30" ry="24" fill="${C.histone}" fill-opacity=".85" stroke="#5d6578" stroke-width="2"/>` +
    `<path d="M-34,6 C-34,-30 34,-30 34,-4 C34,26 -28,28 -31,-6" stroke="${C.dna}" stroke-width="5" fill="none" opacity=".9"/>` +
    `<line x1="-6" y1="-24" x2="-4" y2="-40" stroke="${C.histone}" stroke-width="3"/><line x1="8" y1="-23" x2="12" y2="-38" stroke="${C.histone}" stroke-width="3"/>`;
  if (ac > .01) s += `<g opacity="${f1(ac)}"><circle cx="-4" cy="-45" r="8" fill="${C.ok}" stroke="#0a1224" stroke-width="1.5"/><circle cx="13" cy="-43" r="8" fill="${C.ok}" stroke="#0a1224" stroke-width="1.5"/></g>`;
    `<text x="-4" y="-40.5" font-size="8" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">Ac</text><text x="12" y="-38.5" font-size="8" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">Ac</text></g>`;
  return s + '</g>';
}

/* afgeronde paneelachtergrond */
export const panel = (x, y, w, h, op = 1, stroke = '#2a3a5f') => op <= .01 ? '' :
  `<rect x="${f1(x)}" y="${f1(y)}" width="${w}" height="${h}" rx="16" fill="#0b1224" fill-opacity="${f1(.92 * op)}" stroke="${stroke}" stroke-opacity="${f1(op)}" stroke-width="2"/>`;

/* pijl */
export const arrow = (x0, y0, x1, y1, col = C.muted, w = 3, op = 1) => op <= .01 ? '' :
  `<g opacity="${f1(op)}"><line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="${col}" stroke-width="${w}" marker-end="url(#arrow)"/></g>`;
