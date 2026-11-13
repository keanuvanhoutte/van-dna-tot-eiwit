/* Basen en suikers zoals in een schoolboek (zie bv. de klassieke overzichten "RNA bases / DNA bases"):
 * - pyrimidines (C, T, U): één zesring, N1 onderaan (aan de suiker), C4 bovenaan
 * - purines (A, G): zesring rechts + vijfring links, N9 onderaan links (aan de suiker)
 * - suiker (ribose / deoxyribose) in Haworth-vorm: zuurstof achteraan, dikke rand vooraan
 * Eenheden: één binding = 1; y groeit naar onder. */
const rot = ([x, y], deg) => { const r = deg * Math.PI / 180; return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]; };
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const unit = deg => [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];
function ring(v0, v1, n, sign) {
  const v = [v0, v1];
  while (v.length < n) { const d = sub(v.at(-1), v.at(-2)); v.push(add(v.at(-1), rot(d, sign * 360 / n))); }
  return v;
}
const mid = pts => pts.reduce((t, p) => [t[0] + p[0] / pts.length, t[1] + p[1] / pts.length], [0, 0]);
const out = (p, c, l = 1) => add(p, mul(sub(p, c), l / Math.hypot(...sub(p, c))));   // naar buiten, weg van het ringmidden

function base(b) {
  const A = {}, B = [];
  const at = (k, p, lab = '') => { A[k] = { p, lab }; };
  const bd = (a, c, dbl = false, inner = null) => B.push({ a, b: c, dbl, inner });
  // zesring met spits bovenaan: C4/C6 boven, dan met de klok mee
  const hex = [-90, -30, 30, 90, 150, 210].map(d => unit(d));
  const c6 = [0, 0];
  if ('CTU'.includes(b)) {
    const [C4, N3, C2, N1, C6, C5] = hex;
    at('C4', C4); at('N3', N3, b === 'C' ? 'N' : 'NH'); at('C2', C2); at('N1', N1, 'N'); at('C6', C6); at('C5', C5);
    at('H1', add(N1, [0, .8]), 'H'); bd('N1', 'H1');
    at('O2', out(C2, c6), 'O'); bd('C2', 'O2', true);
    if (b === 'C') { at('N4', out(C4, c6), 'NH₂'); bd('C4', 'N4'); }
    else { at('O4', out(C4, c6), 'O'); bd('C4', 'O4', true); }
    if (b === 'T') { at('M', out(C5, c6)); bd('C5', 'M'); }
    const ringB = [['C4', 'N3', b === 'C'], ['N3', 'C2', false], ['C2', 'N1', false], ['N1', 'C6', false], ['C6', 'C5', true], ['C5', 'C4', false]];
    for (const [x, y, d] of ringB) bd(x, y, d, c6);
  } else {
    const [C6, N1, C2, N3, C4, C5] = hex;
    at('C6', C6); at('N1', N1, b === 'G' ? 'NH' : 'N'); at('C2', C2); at('N3', N3, 'N'); at('C4', C4); at('C5', C5);
    const pent = ring(C5, C4, 5, 1), c5 = mid(pent);   // C5, C4, N9, C8, N7
    at('N9', pent[2], 'N'); at('C8', pent[3]); at('N7', pent[4], 'N');
    at('H9', add(pent[2], mul(unit(120), .8)), 'H'); bd('N9', 'H9');
    if (b === 'A') { at('N6', out(C6, c6), 'NH₂'); bd('C6', 'N6'); }
    else { at('O6', out(C6, c6), 'O'); bd('C6', 'O6', true); at('N2', out(C2, c6), 'NH₂'); bd('C2', 'N2'); }
    const six = b === 'A'
      ? [['C6', 'N1', true], ['N1', 'C2', false], ['C2', 'N3', true], ['N3', 'C4', false], ['C4', 'C5', true], ['C5', 'C6', false]]
      : [['C6', 'N1', false], ['N1', 'C2', false], ['C2', 'N3', true], ['N3', 'C4', false], ['C4', 'C5', true], ['C5', 'C6', false]];
    for (const [x, y, d] of six) bd(x, y, d, c6);
    for (const [x, y, d] of [['C4', 'N9', false], ['N9', 'C8', false], ['C8', 'N7', true], ['N7', 'C5', false]]) bd(x, y, d, c5);
  }
  return { A, B };
}

function draw(A, B, col, opts = {}) {
  const u = opts.u ?? 24, xs = Object.values(A).map(a => a.p[0]), ys = Object.values(A).map(a => a.p[1]);
  const x0 = Math.min(...xs) - .9, y0 = Math.min(...ys) - .55, W = (Math.max(...xs) - x0 + .9) * u, H = (Math.max(...ys) - y0 + .55) * u;
  const X = p => ((p[0] - x0) * u).toFixed(1), Y = p => ((p[1] - y0) * u).toFixed(1);
  const cut = (p, q, lab) => lab ? add(p, mul(sub(q, p), lab.length > 2 ? .4 : .28)) : p;
  let s = '';
  for (const b of B) {
    const a1 = A[b.a], a2 = A[b.b], p = cut(a1.p, a2.p, a1.lab), q = cut(a2.p, a1.p, a2.lab);
    s += `<line x1="${X(p)}" y1="${Y(p)}" x2="${X(q)}" y2="${Y(q)}" stroke="${col}"${b.w ? ` style="stroke-width:${b.w}"` : ''}/>`;
    if (b.dbl) {
      const d = sub(q, p), l = Math.hypot(...d); let o = [-d[1] / l * .16, d[0] / l * .16];
      if (b.inner) { const m = mid([p, q]), toC = sub(b.inner, m); if (toC[0] * o[0] + toC[1] * o[1] < 0) o = mul(o, -1); }
      const sh = b.inner ? .14 : 0, p2 = add(add(p, mul(d, sh)), o), q2 = add(sub(q, mul(d, sh)), o);
      s += `<line x1="${X(p2)}" y1="${Y(p2)}" x2="${X(q2)}" y2="${Y(q2)}" stroke="${col}"/>`;
    }
  }
  for (const a of Object.values(A)) if (a.lab) s += `<text x="${X(a.p)}" y="${(+Y(a.p) + 4.5).toFixed(1)}" fill="${a.col ?? '#e2e8f4'}">${a.lab}</text>`;
  return `<svg class="aa" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" width="${Math.min(W, 230).toFixed(0)}" role="img">${s}</svg>`;
}

export function baseSVG(b, col) {
  if (!'ACGTU'.includes(b) || !b) return '';
  const { A, B } = base(b);
  return draw(A, B, col);
}

/* suiker in Haworth-vorm; in een streng hangt aan C5' en C3' een fosfaat (naar de buren), aan C1' de base */
export function sugarSVG(rna, col) {
  const A = {}, B = [];
  const at = (k, p, lab = '', c) => { A[k] = { p, lab, col: c }; };
  at('O4', [0, -.5], 'O'); at('C1', [1.05, -.1]); at('C2', [.62, .62]); at('C3', [-.62, .62]); at('C4', [-1.05, -.1]);
  at('R', [1.05, -1.05], 'base', col); at('C5', [-1.05, -1.0]); at('O5', [-1.75, -1.45], 'O–P', '#ffb347');
  at('O3', [-.62, 1.5], 'O–P', '#ffb347'); at('X2', [.62, 1.5], rna ? 'OH' : 'H');
  const bd = (a, b, w) => B.push({ a, b, w });
  bd('C4', 'O4'); bd('O4', 'C1'); bd('C1', 'C2', 3); bd('C2', 'C3', 5); bd('C3', 'C4', 3);
  bd('C1', 'R'); bd('C4', 'C5'); bd('C5', 'O5'); bd('C3', 'O3'); bd('C2', 'X2');
  return draw(A, B, '#c9d2e4');
}
