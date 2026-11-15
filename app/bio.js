/*
 * Gedeelde biologische tekenset (detailronde 15-11-2026).
 * Doel: overal in de app dezelfde, representatieve vormen in plaats van losse lijnen en ellipsen:
 *   - membraan(d)      : elke membraan als lipidedubbellaag (kopjes aan beide kanten, staartjes in het midden),
 *                        langs elk SVG-pad (recht, gebogen, cirkel). Licht: 6 <path>-elementen, geen honderden lipiden.
 *   - blaasje / organel: gesloten membraan met lumen.
 *   - eiwit(...)       : bobbelige, onregelmatige eiwitvorm (deterministisch via seed) i.p.v. een gladde ellips.
 *   - ribosoomOpER     : 60S zit op het Sec61-kanaal, 40S erboven, mRNA tussen beide eenheden, de keten loopt door de
 *                        tunnel van de 60S rechtstreeks het kanaal in (Voorhees & Hegde 2016; Gemmer & Förster 2020).
 *   - m6pReceptor      : ontvanger als dimeer (kationafhankelijke MPR): per monomeer een lumendomein, één
 *                        transmembraanhelix en een korte staart in het cytosol (geen Y-vorm: die lijkt op een antilichaam).
 *   - vATPase          : protonpomp (V1-kop in het cytosol, V0-ring in het membraan).
 * Alle maten in scènecoördinaten (viewBox 1600×900). Alle functies geven een SVG-string terug.
 */
import { C, f1, rng } from './kit.js';

export const LIPID = { head: '#e2bd7e', tail: '#9a8160', core: 'rgba(138,115,80,.18)' };

/* ---------- membraan als lipidedubbellaag ----------
 * Getekend langs een lijst punten (open of gesloten). Per laag: een rij ronde kopjes (fosfolipidekop, waterminnend)
 * en daaronder twee vetzuurstaartjes per lipide (waterafstotend), naar het midden gericht. Techniek: per laag twee
 * paden met stroke-dasharray (ronde kopjes via lijnkapjes, staartjes als korte streepjes) → 4 paden per membraan,
 * ook voor lange of gebogen membranen. w = totale dikte in px (echte membraan ≈ 4 nm). */
const offsetPts = (P, dist, closed) => P.map((p, i) => {
  const a = P[i === 0 ? (closed ? P.length - 1 : 0) : i - 1], b = P[i === P.length - 1 ? (closed ? 0 : i) : i + 1];
  let dx = b[0] - a[0], dy = b[1] - a[1]; const n = Math.hypot(dx, dy) || 1; dx /= n; dy /= n;
  return [p[0] - dy * dist, p[1] + dx * dist];
});
const ptsD = (P, closed) => 'M' + P.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L') + (closed ? 'Z' : '');
export function membraanPts(P, { w = 24, closed = false, op = 1, head = LIPID.head, tail = LIPID.tail, kern = true } = {}) {
  if (op <= .01 || P.length < 2) return '';
  const hr = Math.max(2.2, w * .13), pitch = hr * 2.3, tl = w / 2 - hr * 2 - .5;      // kopstraal, afstand, staartlengte
  let g = `<g opacity="${f1(op)}" fill="none" stroke-linecap="round">`;
  if (kern) g += `<path d="${ptsD(P, closed)}" stroke="${LIPID.core}" stroke-width="${f1(w - 2 * hr)}" stroke-linecap="butt"/>`;
  for (const side of [-1, 1]) {
    const heads = offsetPts(P, side * (w / 2 - hr), closed), tails = offsetPts(P, side * (w / 2 - 2 * hr - tl / 2 + .3), closed);
    g += `<path d="${ptsD(tails, closed)}" stroke="${tail}" stroke-width="${f1(tl)}" stroke-linecap="butt" stroke-dasharray="${f1(hr * .32)} ${f1(hr * .5)} ${f1(hr * .32)} ${f1(pitch - hr * 1.14)}" stroke-dashoffset="${f1(hr * .57)}"/>`;
    g += `<path d="${ptsD(heads, closed)}" stroke="${head}" stroke-width="${f1(hr * 2)}" stroke-dasharray="0 ${f1(pitch)}"/>`;
  }
  return g + '</g>';
}
/* lijst punten langs een SVG-achtige curve: rechte lijn, cirkel, kwadratische boog */
export const ptsLijn = (x0, y0, x1, y1, n = 2) => Array.from({ length: n }, (_, i) => [x0 + (x1 - x0) * i / (n - 1), y0 + (y1 - y0) * i / (n - 1)]);
export const ptsCirkel = (cx, cy, r, n = null) => { const N = n ?? Math.max(24, Math.round(r * .5)); return Array.from({ length: N }, (_, i) => [cx + r * Math.cos(i / N * 6.2832), cy + r * Math.sin(i / N * 6.2832)]); };
export const ptsBoog = (x0, y0, cx, cy, x1, y1, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1]; });

/* rechte membraan van (x0,y) naar (x1,y) */
export function membraanLijn(x0, x1, y, o = {}) {
  /* o.gaten = [[xa, xb], …]: openingen waar een eiwit door het membraan steekt (het eiwit vult de opening) */
  const gaten = (o.gaten ?? []).slice().sort((a, b) => a[0] - b[0]);
  if (!gaten.length) return membraanPts(ptsLijn(x0, y, x1, y), o);
  let out = '', from = x0;
  for (const [a, b] of gaten) { if (a > from) out += membraanPts(ptsLijn(from, y, a, y), o); from = Math.max(from, b); }
  if (x1 > from) out += membraanPts(ptsLijn(from, y, x1, y), o);
  return out;
}
/* achterwaarts compatibel: membraan langs punten */
export const membraan = (P, o = {}) => membraanPts(P, o);

/* blaasje of rond organel: lumen + dubbellaag */
export function blaasje(cx, cy, r, { lumen = 'rgba(201,165,116,.10)', w = null, op = 1, rand = null } = {}) {
  if (op <= .01) return '';
  const mw = w ?? Math.max(8, Math.min(24, r * .22));
  return `<g opacity="${f1(op)}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${lumen}"/>` +
    (rand ? `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r + mw / 2 + 2)}" fill="none" stroke="${rand}" stroke-width="2.4" opacity=".9"/>` : '') +
    membraanPts(ptsCirkel(cx, cy, r), { w: mw, closed: true }) + '</g>';
}

/* Golgi-cisterne: platte zak met opgezwollen randen, als gesloten dubbellaag rond een lumen.
 * (x, y) = midden, len = lengte, dik = dikte van de zak, buig = kromming (px), vert = verticaal */
export function cisterne(x, y, { len = 360, dik = 30, buig = 40, vert = true, lumen = 'rgba(201,165,116,.14)', w = 10, op = 1 } = {}) {
  if (op <= .01) return '';
  const a = len / 2, t = dik / 2, rim = t * 1.5;
  const pt = (u, v) => { const bend = buig * (1 - (u / a) ** 2); return vert ? [x - bend + v, y + u] : [x + u, y - bend + v]; };
  const N = 24, top = [], bot = [];
  for (let i = 0; i <= N; i++) {
    const u = -a + 2 * a * i / N, e = Math.abs(u / a), half = t + (rim - t) * Math.max(0, (e - .7) / .3) ** 1.5;
    top.push(pt(u, -half)); bot.push(pt(u, half));
  }
  const capPts = (from, to, end) => { const c = pt(end * (a + rim * .7), 0); return ptsBoog(from[0], from[1], c[0], c[1], to[0], to[1], 6).slice(1, -1); };
  const P = [...top, ...capPts(top[N], bot[N], 1), ...bot.slice().reverse(), ...capPts(bot[0], top[0], -1)];
  return `<g opacity="${f1(op)}"><path d="${ptsD(P, true)}" fill="${lumen}"/>${membraanPts(P, { w, closed: true })}</g>`;
}

/* ---------- eiwitten ---------- */
/* bobbelige eiwitvorm: straal varieert met enkele harmonischen (seed = vaste vorm). Met lichte schaduw voor volume. */
export function eiwitPad(cx, cy, rx, ry, seed = 1, bumps = 0.12) {
  const R = rng(seed * 7919 + 13), h = [1, 2, 3, 5].map(k => [k, (R() - .5) * 2 * bumps / Math.sqrt(k), R() * 6.283]);
  const N = 36; let d = '';
  for (let i = 0; i <= N; i++) {
    const a = i / N * 6.2832; let k = 1;
    for (const [n, amp, ph] of h) k += amp * Math.cos(n * a + ph);
    const x = cx + Math.cos(a) * rx * k, y = cy + Math.sin(a) * ry * k;
    d += (i ? ' L' : 'M') + f1(x) + ',' + f1(y);
  }
  return d + 'Z';
}
export function eiwit(cx, cy, rx, ry, col = C.prot, { seed = 1, op = 1, stroke = null, label = '', fs = 18, bumps = .12, holte = false } = {}) {
  if (op <= .01) return '';
  const d = eiwitPad(cx, cy, rx, ry, seed, bumps);
  return `<g opacity="${f1(op)}"><path d="${d}" fill="#0b1224"/><path d="${d}" fill="${col}" fill-opacity=".55" stroke="${stroke ?? col}" stroke-width="2.5"/>` +
    `<path d="${eiwitPad(cx - rx * .18, cy - ry * .2, rx * .55, ry * .5, seed + 3, bumps)}" fill="#fff" fill-opacity=".10"/>` +
    (holte ? `<path d="M${f1(cx + rx * .55)},${f1(cy - ry * .25)} Q${f1(cx + rx * .15)},${f1(cy)} ${f1(cx + rx * .55)},${f1(cy + ry * .25)}" fill="#0b1224" fill-opacity=".55" stroke="${col}" stroke-width="2"/>` : '') +
    (label ? `<text x="${f1(cx)}" y="${f1(cy + fs * .35)}" font-size="${fs}" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">${label}</text>` : '') + '</g>';
}

/* α-helix door een membraan (zijaanzicht): cilinder met windingen */
export function tmHelix(x, y0, y1, col = C.prot, op = 1, w = 14) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}"><rect x="${f1(x - w / 2)}" y="${f1(Math.min(y0, y1))}" width="${w}" height="${f1(Math.abs(y1 - y0))}" rx="${f1(w / 2)}" fill="${col}" fill-opacity=".8"/>`;
  const n = Math.max(2, Math.round(Math.abs(y1 - y0) / 9));
  for (let i = 1; i < n; i++) { const y = Math.min(y0, y1) + i * Math.abs(y1 - y0) / n; s += `<path d="M${f1(x - w / 2)},${f1(y - 3)} L${f1(x + w / 2)},${f1(y + 3)}" stroke="#0b1224" stroke-opacity=".35" stroke-width="2"/>`; }
  return s + '</g>';
}

/* ---------- 80S-ribosoom (zijaanzicht) ----------
 * Bouw (Alberts/MBoC; Voorhees & Hegde 2016): de kleine eenheid (40S) leest het mRNA, dat tussen beide eenheden loopt.
 * tRNA's overspannen beide eenheden: het anticodon zit op het codon (40S-kant), het aminozuurende reikt tot het
 * peptidyltransferasecentrum (PTC) in de grote eenheid (60S), vlak onder de grens tussen de eenheden.
 * Van het PTC loopt de uitgangstunnel dwars door de 60S naar de andere kant. Op het ER zit die uitgang op het Sec61-kanaal.
 * (x, yUit) = waar de tunnel de 60S verlaat (onderaan). Geeft { svg, ptc, uit, tunnelD, mrnaY, L, S } terug. */
export function ribosoom80S(x, yUit, { s = 1, op = 1, label = '', labelSmall = '', tRNAs = 2, mrna = true } = {}) {
  const L = { cx: x, cy: yUit - 66 * s, rx: 122 * s, ry: 64 * s };                 // 60S
  const S = { cx: x - 10 * s, cy: L.cy - L.ry - 36 * s, rx: 100 * s, ry: 42 * s };   // 40S: raakt de 60S over een groot vlak (bruggen tussen de eenheden)
  const mrnaY = L.cy - L.ry - 10 * s;                                                // mRNA loopt door die spleet, gebonden aan de 40S
  const ptc = [x + 4 * s, L.cy - L.ry + 26 * s];                                     // actief centrum: bovenaan in de 60S
  const tunnelD = `M${f1(ptc[0])},${f1(ptc[1])} C${f1(x + 26 * s)},${f1(L.cy - 6 * s)} ${f1(x - 10 * s)},${f1(L.cy + 26 * s)} ${f1(x)},${f1(yUit + 2)}`;
  let g = `<g opacity="${f1(op)}">`;
  g += eiwit(L.cx, L.cy, L.rx, L.ry, C.rrna, { seed: 60, bumps: .07 });
  g += `<path d="${tunnelD}" stroke="#0b1224" stroke-opacity=".6" stroke-width="${f1(13 * s)}" fill="none" stroke-linecap="round"/>`;
  g += eiwit(S.cx, S.cy, S.rx, S.ry, C.rrna, { seed: 40, bumps: .08 });
  // tRNA's: P-plaats (draagt de keten) en A-plaats (brengt het volgende aminozuur); anticodon op het mRNA, voet in het PTC
  const tr = (dx, col, o = 1) => {            // L-vormig tRNA: anticodonarm op het codon, elleboog, acceptorarm tot in het PTC
    const ax = x + dx * s, ay = mrnaY + 2 * s, ex = ax + (dx < 0 ? -16 : 16) * s, ey = mrnaY + 22 * s, tx = ptc[0] + (dx < 0 ? -5 : 7) * s, ty = ptc[1] - 3 * s;
    return `<path d="M${f1(ax)},${f1(ay)} L${f1(ex)},${f1(ey)} L${f1(tx)},${f1(ty)}" stroke="${col}" stroke-width="${f1(10 * s)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(o)}"/>` +
      `<rect x="${f1(ax - 9 * s)}" y="${f1(ay - 3 * s)}" width="${f1(18 * s)}" height="${f1(6 * s)}" rx="${f1(2 * s)}" fill="${col}" opacity="${f1(o)}"/>`;
  };
  if (tRNAs >= 1) g += tr(-16, C.trna);
  if (tRNAs >= 2) g += tr(18, '#ffe08a', .9);
  if (mrna) g += `<path d="M${f1(x - 210 * s)},${f1(mrnaY + 2 * s)} C${f1(x - 120 * s)},${f1(mrnaY - 4 * s)} ${f1(x + 100 * s)},${f1(mrnaY + 5 * s)} ${f1(x + 220 * s)},${f1(mrnaY - 1 * s)}" stroke="${C.rna}" stroke-width="${f1(6 * s)}" fill="none" stroke-linecap="round"/>`;
  g += `<circle cx="${f1(ptc[0])}" cy="${f1(ptc[1])}" r="${f1(5 * s)}" fill="#fff" fill-opacity=".85"/>`;     // PTC
  if (label) g += `<text x="${f1(L.cx + L.rx * .5)}" y="${f1(L.cy + 14 * s)}" font-size="${f1(20 * s)}" text-anchor="middle" fill="#dff7f1" font-family="Inter" font-weight="700">${label}</text>`;
  if (labelSmall) g += `<text x="${f1(S.cx - S.rx * .45)}" y="${f1(S.cy + 2 * s)}" font-size="${f1(18 * s)}" text-anchor="middle" fill="#dff7f1" font-family="Inter" font-weight="700">${labelSmall}</text>`;
  g += '</g>';
  return { svg: g, ptc, uit: [x, yUit], tunnelD, mrnaY, L, S };
}

/* ribosoom op het ER: de tunneluitgang van de 60S zit op het Sec61-kanaal (membraan horizontaal op yMem, cytosol boven).
 * uit = waar de keten aan de lumenkant uit het kanaal komt. */
export function ribosoomOpER(x, yMem, { s = 1, mw = 22, op = 1, label = '', labelSmall = '', tRNAs = 2 } = {}) {
  const secTop = yMem - mw / 2 - 8 * s;
  const r = ribosoom80S(x, secTop, { s, op, label, labelSmall, tRNAs });
  r.svg = `<g opacity="${f1(op)}">${sec61(x, yMem, { mw, s })}</g>` + r.svg;
  r.uit = [x, yMem + mw / 2 + 6 * s];
  return r;
}

/* Sec61-kanaal: twee helften met een porie in het midden, door het membraan */
export function sec61(x, yMem, { mw = 22, s = 1, op = 1, col = C.prot } = {}) {
  if (op <= .01) return '';
  const h = mw + 18 * s, y0 = yMem - h / 2, w = 22 * s;
  return `<g opacity="${f1(op)}"><path d="${eiwitPad(x - w * .9, yMem, w, h / 2, 61, .06)}" fill="#0b1224"/><path d="${eiwitPad(x + w * .9, yMem, w, h / 2, 62, .06)}" fill="#0b1224"/><path d="${eiwitPad(x - w * .9, yMem, w, h / 2, 61, .06)}" fill="${col}" fill-opacity=".6" stroke="${col}" stroke-width="2"/>` +
    `<path d="${eiwitPad(x + w * .9, yMem, w, h / 2, 62, .06)}" fill="${col}" fill-opacity=".6" stroke="${col}" stroke-width="2"/>` +
    `<rect x="${f1(x - 4 * s)}" y="${f1(y0)}" width="${f1(8 * s)}" height="${f1(h)}" fill="#0b1224" fill-opacity=".5"/></g>`;
}

/* ---------- mannose-6-fosfaatreceptor (membraaneiwit) ----------
 * Getekend als de kationafhankelijke MPR: een dimeer van twee type I-eiwitten. Elk monomeer heeft één bolvormig
 * lumendomein (met een M6P-bindingsplaats), één transmembraanhelix en een korte staart in het cytosol.
 * dir = -1 → lumendomeinen naar boven (membraan onder), +1 → naar beneden. */
export function m6pReceptor(x, yMem, { dir = -1, mw = 18, col = '#ffc247', op = 1, s = 1 } = {}) {
  if (op <= .01) return '';
  const d = dir, half = mw / 2 + 4, kopY = yMem + d * (half + 34 * s);
  let g = `<g opacity="${f1(op)}">`;
  for (const k of [-1, 1]) {                                   // twee monomeren
    const hx = x + k * 9 * s;
    g += tmHelix(hx, yMem - half, yMem + half, col, 1, 9 * s);
    g += `<path d="M${f1(hx)},${f1(yMem - d * half)} q${f1(k * 7 * s)},${f1(-d * 9 * s)} ${f1(k * 2 * s)},${f1(-d * 16 * s)}" stroke="${col}" stroke-width="${f1(4.5 * s)}" fill="none" stroke-linecap="round"/>`;   // korte staart in het cytosol
    g += `<line x1="${f1(hx)}" y1="${f1(yMem + d * half)}" x2="${f1(x + k * 14 * s)}" y2="${f1(kopY - d * 12 * s)}" stroke="${col}" stroke-width="${f1(4.5 * s)}"/>`;
    g += eiwit(x + k * 15 * s, kopY, 18 * s, 16 * s, col, { seed: 71 + k });
  }
  // bindingsplaatsen aan de top van elk domein (waar het M6P-label in past)
  for (const k of [-1, 1]) g += `<path d="M${f1(x + k * 15 * s - 7 * s)},${f1(kopY + d * 14 * s)} q${f1(7 * s)},${f1(-d * 7 * s)} ${f1(14 * s)},0" stroke="#0b1224" stroke-opacity=".6" stroke-width="${f1(3.5 * s)}" fill="none"/>`;
  return g + '</g>';
}

/* ---------- V-ATPase: protonpomp in het membraan van endosoom/lysosoom ----------
 * (x,y) = punt op het membraan, ang = richting naar het cytosol (radialen). Pijlen: H⁺ naar het lumen. */
export function vATPase(x, y, ang = -Math.PI / 2, { s = 1, op = 1, k = 1, hTekst = false } = {}) {
  if (op <= .01) return '';
  const deg = ang * 180 / Math.PI + 90;
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(deg)}) scale(${f1(s)})">`;
  g += `<rect x="-22" y="-9" width="44" height="18" rx="8" fill="#5fd3e6" fill-opacity=".7" stroke="#5fd3e6" stroke-width="2"/>`;      // V0-ring in het membraan
  g += `<rect x="-4" y="-34" width="8" height="26" fill="#5fd3e6" fill-opacity=".7"/>`;                                                   // steel
  g += `<path d="${eiwitPad(0, -50, 24, 17, 91, .07)}" fill="#5fd3e6" fill-opacity=".6" stroke="#5fd3e6" stroke-width="2"/>`;            // V1-kop (cytosol, verbruikt ATP)
  if (k > .01) g += `<g opacity="${f1(k)}"><path d="M0,10 v22" stroke="#ffd166" stroke-width="3" marker-end="url(#bioH)"/>${hTekst ? '<text x="10" y="34" font-size="22" fill="#ffd166" font-family="Inter" font-weight="800">H⁺</text>' : ''}</g>`;
  return g + '</g>';
}
export const bioDefs = `<defs><marker id="bioH" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0L10,5L0,10z" fill="#ffd166"/></marker></defs>`;

/* zuur knipenzym (hydrolase) met een N-glycaan; tag (0..1) = fosfaat op de mannose (het M6P-label) */
export function hydrolase(x, y, { s = 1, op = 1, tag = 0, glycaan = true, seed = 5, col = C.prot } = {}) {
  if (op <= .01) return '';
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">` + eiwit(0, 0, 30, 23, col, { seed, holte: true });
  if (glycaan) {
    g += `<path d="M-4,-21 v-26 M-4,-47 l-9,-10 M-4,-47 l9,-10" stroke="#c9d2e4" stroke-width="2.4" fill="none"/>`;
    g += `<rect x="-10" y="-34" width="12" height="12" rx="2" fill="#0072BC"/><rect x="-10" y="-47" width="12" height="12" rx="2" fill="#0072BC"/>` +   // twee GlcNAc (SNFG blauw vierkant), zoals de kern van elk N-glycaan
      `<circle cx="-14" cy="-56" r="6.5" fill="#00A651"/><circle cx="6" cy="-56" r="6.5" fill="#00A651"/>`;          // mannose (groen)
    if (tag > .01) g += `<g opacity="${f1(tag)}"><circle cx="20" cy="-66" r="15" fill="#ff6b6b"/><text x="20" y="-58" font-size="22" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">P</text></g>`;
  }
  return g + '</g>';
}

/* =====================================================================================================
 * Uitbreiding detailronde (hele app): kernenvelop, mitochondrion, bacteriewand, 70S-ribosoom, klein ribosoom.
 * ===================================================================================================== */

/* hulp: lengte langs een puntenlijst en een stuk ervan (op booglengte) */
const cumLen = (P, closed) => { const Q = closed ? [...P, P[0]] : P, L = [0]; for (let i = 1; i < Q.length; i++) L.push(L[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1])); return { Q, L }; };
const puntOp = ({ Q, L }, s) => { let i = 1; while (i < L.length - 1 && L[i] < s) i++; const t = (s - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return [Q[i - 1][0] + (Q[i][0] - Q[i - 1][0]) * t, Q[i - 1][1] + (Q[i][1] - Q[i - 1][1]) * t, Math.atan2(Q[i][1] - Q[i - 1][1], Q[i][0] - Q[i - 1][0])]; };
const stuk = (cl, s0, s1, step = 6) => { const n = Math.max(2, Math.ceil((s1 - s0) / step) + 1); return Array.from({ length: n }, (_, i) => puntOp(cl, s0 + (s1 - s0) * i / (n - 1))); };
export const ptsEllips = (cx, cy, rx, ry, n = null) => { const N = n ?? Math.max(28, Math.round((rx + ry) * .3)); return Array.from({ length: N }, (_, i) => [cx + rx * Math.cos(i / N * 6.2832), cy + ry * Math.sin(i / N * 6.2832)]); };
/* staafvorm (bacterie): middelpunt, totale lengte, straal, hoek (radialen) */
export const ptsStaaf = (cx, cy, len, r, ang = 0) => {
  const a = len / 2 - r, P = [], ca = Math.cos(ang), sa = Math.sin(ang), rot = (x, y) => [cx + x * ca - y * sa, cy + x * sa + y * ca];
  for (let i = 0; i <= 16; i++) { const t = -Math.PI / 2 + Math.PI * i / 16; P.push(rot(a + r * Math.cos(t), r * Math.sin(t))); }
  for (let i = 0; i <= 16; i++) { const t = Math.PI / 2 + Math.PI * i / 16; P.push(rot(-a + r * Math.cos(t), r * Math.sin(t))); }
  const out = []; for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; out.push(p); const d = Math.hypot(q[0] - p[0], q[1] - p[1]); if (d > 20) for (let k = 1; k < d / 14; k++) out.push([p[0] + (q[0] - p[0]) * k * 14 / d, p[1] + (q[1] - p[1]) * k * 14 / d]); }
  return out;
};

/* ---------- kernenvelop ----------
 * Twee membranen (buiten- en binnenmembraan) met de perinucleaire ruimte ertussen; bij elke kernporie gaan beide
 * membranen in elkaar over (Alberts/MBoC; Beck & Hurt 2017). Elk stuk envelop tussen twee poriën is daarom één
 * platte, gesloten zak. P = puntenlijst (cirkel, ellips of lijn), poriën = posities als fractie (0..1) van de lengte.
 * binnen = +1 als de kern aan de +normaal-kant ligt (bij ptsCirkel/ptsEllips: +1 = binnenkant). */
export function kernEnvelop(P, { closed = true, poriën = [], w = 12, gap = 12, poreW = 26, op = 1, binnen = 1, lumen = 'rgba(201,165,116,.14)', npc = true, s = 1 } = {}) {
  if (op <= .01) return '';
  const cl = cumLen(P, closed), tot = cl.L[cl.L.length - 1], half = (gap + w) / 2;
  const pos = poriën.map(f => ((f % 1) + 1) % 1 * tot).sort((a, b) => a - b);
  const segs = [];
  if (!pos.length) segs.push([0, tot, closed ? 'ring' : 'open']);
  else if (closed) pos.forEach((p, i) => { const q = i + 1 < pos.length ? pos[i + 1] : pos[0] + tot; segs.push([p + poreW / 2 + half, q - poreW / 2 - half, 'zak']); });
  else { let from = 0; pos.forEach((p, i) => { segs.push([from, p - poreW / 2 - half, i === 0 ? 'start' : 'zak']); from = p + poreW / 2 + half; }); segs.push([from, tot, 'eind']); }
  const off = (p, d) => [p[0] - Math.sin(p[2]) * d, p[1] + Math.cos(p[2]) * d];     // zelfde normaal als offsetPts
  const cap = (p, from, to) => { const T = [Math.cos(p[2]), Math.sin(p[2])], n = [-Math.sin(p[2]), Math.cos(p[2])], o = []; for (let k = 1; k < 8; k++) { const th = from + (to - from) * k / 8; o.push([p[0] + half * (Math.cos(th) * T[0] + Math.sin(th) * n[0]), p[1] + half * (Math.cos(th) * T[1] + Math.sin(th) * n[1])]); } return o; };
  let g = `<g opacity="${f1(op)}">`;
  for (const [s0, s1, soort] of segs) {
    if (s1 - s0 < 4) continue;
    const sub = s1 <= tot ? stuk(cl, s0, s1) : [...stuk(cl, s0, tot), ...stuk(cl, 0, s1 - tot).slice(1)];
    const top = sub.map(p => off(p, -half)), bot = sub.map(p => off(p, half));
    if (soort === 'ring') { g += `<path d="${ptsD(top, true)}" fill="none" stroke="${lumen}" stroke-width="${f1(gap + w)}"/>` + membraanPts(top, { w, closed: true }) + membraanPts(bot, { w, closed: true }); continue; }
    g += `<path d="${ptsD([...top, ...bot.slice().reverse()], true)}" fill="${lumen}"/>`;
    if (soort === 'open') { g += membraanPts(top, { w }) + membraanPts(bot, { w }); continue; }
    if (soort === 'zak') { const pts = [...top, ...cap(sub[sub.length - 1], -Math.PI / 2, Math.PI / 2), ...bot.slice().reverse(), ...cap(sub[0], Math.PI / 2, Math.PI * 1.5)]; g += membraanPts(pts, { w, closed: true }); continue; }
    // start/eind: één kant open (rand van het beeld), andere kant afgerond bij de porie
    if (soort === 'start') g += membraanPts([...top, ...cap(sub[sub.length - 1], -Math.PI / 2, Math.PI / 2), ...bot.slice().reverse()], { w });
    else g += membraanPts([...bot.slice().reverse(), ...cap(sub[0], Math.PI / 2, Math.PI * 1.5), ...top], { w });
  }
  if (npc) for (const p of pos) { const [x, y, a] = puntOp(cl, p % tot); g += kernporie(x, y, a * 180 / Math.PI + (binnen > 0 ? 0 : 180), { s, H: gap + 2 * w, poreW }); }
  return g + '</g>';
}
/* rechte kernenvelop (cytoplasma boven, kern onder) met poriën op x-posities */
export const kernEnvelopLijn = (x0, x1, y, o = {}) => kernEnvelop(ptsLijn(x0, y, x1, y, 2), { ...o, closed: false, binnen: 1, poriën: (o.poriën ?? []).map(x => (x - x0) / (x1 - x0)) });

/* kernporiecomplex (zijaanzicht): eiwitring rond een centraal kanaal, filamenten aan de cytoplasmakant en een korf
 * (nuclear basket) aan de kernkant. Lokaal: +y = kern. rot in graden. */
export function kernporie(x, y, rot = 0, { s = 1, H = 36, poreW = 26, op = 1, col = '#9db4d8' } = {}) {
  if (op <= .01) return '';
  const hw = poreW / 2, bh = H / 2 + 8 * s;
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})">`;
  for (const k of [-1, 1]) {
    const d = eiwitPad(k * (hw + 7 * s), 0, 9 * s, bh, 80 + k, .05);
    g += `<path d="${d}" fill="#0b1224"/><path d="${d}" fill="${col}" fill-opacity=".6" stroke="${col}" stroke-width="2"/>`;
    g += `<path d="M${f1(k * (hw + 7 * s))},${f1(-bh + 2)} q${f1(k * 6 * s)},${f1(-12 * s)} ${f1(k * 2 * s)},${f1(-22 * s)}" stroke="${col}" stroke-width="${f1(3 * s)}" fill="none" stroke-linecap="round"/>`;   // filament (cytoplasma)
    g += `<path d="M${f1(k * (hw + 7 * s))},${f1(bh - 2)} L${f1(k * 7 * s)},${f1(bh + 24 * s)}" stroke="${col}" stroke-width="${f1(3 * s)}" fill="none" stroke-linecap="round"/>`;   // korf (kern)
  }
  g += `<path d="M${f1(-8 * s)},${f1(bh + 24 * s)} H${f1(8 * s)}" stroke="${col}" stroke-width="${f1(4 * s)}" stroke-linecap="round"/>`;
  return g + '</g>';
}

/* ---------- mitochondrion ----------
 * Buitenmembraan (glad) + binnenmembraan met cristae (plooien die de matrix in steken) (Alberts/MBoC; Kühlbrandt 2015).
 * (cx,cy) midden, rx/ry halve assen, rot in graden, n = aantal cristae, w = membraandikte. */
export function mitochondrion(cx, cy, rx, ry, { rot = 0, n = 5, w = 8, op = 1, matrix = 'rgba(120,200,160,.13)', ims = 'rgba(201,165,116,.10)', diep = .62 } = {}) {
  if (op <= .01) return '';
  const gap = w * .9 + 3, irx = rx - gap - w, iry = ry - gap - w, hw = w * .75 + 3;
  const cr = Array.from({ length: n }, (_, i) => ({ x: -irx * .78 + irx * 1.56 * (i + .5) / n, side: i % 2 ? 1 : -1 }));
  const yb = (x, sg) => sg * iry * Math.sqrt(Math.max(0, 1 - (x / irx) ** 2));
  const P = [], N = 140;
  for (let i = 0; i <= N; i++) {
    const a0 = (i - 1) / N * 6.2832, a1 = i / N * 6.2832, x0 = irx * Math.cos(a0), x1 = irx * Math.cos(a1), sg = Math.sin((a0 + a1) / 2) < 0 ? -1 : 1;
    if (i > 0) for (const c of cr) {
      if (c.side !== sg) continue;
      const hit = sg < 0 ? (x0 < c.x - hw && x1 >= c.x - hw) : (x0 > c.x + hw && x1 <= c.x + hw);
      if (!hit) continue;
      const ycen = yb(c.x, sg) - sg * 2 * iry * diep;          // naar binnen
      if (sg < 0) { P.push([c.x - hw, yb(c.x - hw, sg)], [c.x - hw, ycen]); for (let k = 1; k < 8; k++) { const th = Math.PI - Math.PI * k / 8; P.push([c.x + hw * Math.cos(th), ycen + hw * Math.sin(th)]); } P.push([c.x + hw, ycen], [c.x + hw, yb(c.x + hw, sg)]); }
      else { P.push([c.x + hw, yb(c.x + hw, sg)], [c.x + hw, ycen]); for (let k = 1; k < 8; k++) { const th = -Math.PI * k / 8; P.push([c.x + hw * Math.cos(th), ycen + hw * Math.sin(th)]); } P.push([c.x - hw, ycen], [c.x - hw, yb(c.x - hw, sg)]); }
    }
    if (i < N && !cr.some(c => c.side === sg && Math.abs(x1 - c.x) < hw + w)) P.push([x1, iry * Math.sin(a1)]);
  }
  const Pt = P.map(p => [cx + p[0], cy + p[1]]);
  return `<g opacity="${f1(op)}" transform="rotate(${f1(rot)} ${f1(cx)} ${f1(cy)})"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${ims}"/>` +
    `<path d="${ptsD(Pt, true)}" fill="${matrix}"/>` + membraanPts(Pt, { w, closed: true }) + membraanPts(ptsEllips(cx, cy, rx - w / 2, ry - w / 2), { w, closed: true }) + '</g>';
}

/* ---------- bacteriewand ----------
 * type 'neg' (gramnegatief, bv. E. coli): binnenmembraan – periplasma met een dunne peptidoglycaanlaag – buitenmembraan
 * met lipopolysachariden (LPS) aan de buitenkant. type 'pos' (grampositief): binnenmembraan + dikke peptidoglycaanlaag
 * met teichoïnezuren, geen buitenmembraan (Silhavy, Kahne & Walker 2010).
 * P = lijn van het binnenmembraan (cytoplasmamembraan); buiten = -1/+1: aan welke normaalkant de buitenwereld ligt
 * (bij ptsCirkel/ptsEllips/ptsStaaf: -1 = buitenkant; bij ptsLijn van links naar rechts: -1 = boven). */
export const PG = '#b9a3e3', LPS = '#7fd1a8';
export function bacterieWand(P, { type = 'neg', closed = true, w = 12, buiten = -1, op = 1, periplasma = 'rgba(185,163,227,.10)' } = {}) {
  if (op <= .01) return '';
  const off = d => offsetPts(P, buiten * d, closed), D = Q => ptsD(Q, closed), hr = Math.max(2.2, w * .13);
  let g = `<g opacity="${f1(op)}" fill="none">`;
  if (type === 'neg') {
    const per = w * 1.6, dPG = w / 2 + per * .5, dOM = w + per;
    g += `<path d="${D(off(w / 2 + per / 2))}" stroke="${periplasma}" stroke-width="${f1(per)}"/>`;
    g += `<path d="${D(off(dPG - 2.5))}" stroke="${PG}" stroke-width="1.8"/><path d="${D(off(dPG + 2.5))}" stroke="${PG}" stroke-width="1.8"/>`;
    g += `<path d="${D(off(dPG))}" stroke="${PG}" stroke-width="5" stroke-dasharray="1.6 5.4"/>`;          // peptidebruggen tussen de suikerketens
    g += membraanPts(off(0), { w, closed });                                                                  // binnenmembraan
    g += membraanPts(off(dOM), { w, closed });                                                                // buitenmembraan
    g += `<path d="${D(off(dOM + w / 2 + w * .45))}" stroke="${LPS}" stroke-width="${f1(w * .9)}" stroke-dasharray="1.6 ${f1(hr * 2.3 - 1.6)}" opacity=".9"/>`;   // LPS-ketens op de buitenlaag
  } else {
    const d0 = w / 2 + 3, dik = w * 2.4;
    for (let k = 0; k <= 5; k++) g += `<path d="${D(off(d0 + dik * k / 5))}" stroke="${PG}" stroke-width="1.6"/>`;
    g += `<path d="${D(off(d0 + dik / 2))}" stroke="${PG}" stroke-width="${f1(dik)}" stroke-dasharray="1.5 6" opacity=".8"/>`;
    g += `<path d="${D(off(d0 + dik + 4))}" stroke="#ffd59e" stroke-width="8" stroke-dasharray="1.6 14" opacity=".9"/>`;   // teichoïnezuren steken uit
    g += membraanPts(off(0), { w, closed });
  }
  return g + '</g>';
}
/* totale dikte van de wand vanaf het midden van het binnenmembraan (handig om iets er net buiten te tekenen) */
export const bacterieWandDikte = (type = 'neg', w = 12) => type === 'neg' ? w + w * 1.6 + w / 2 + w * .9 : w / 2 + 3 + w * 2.4 + 8;

/* ---------- 70S-ribosoom (bacterie) ----------
 * Zelfde bouw als het 80S-ribosoom (kleine eenheid leest het mRNA, tRNA's tot het PTC, tunnel door de grote eenheid),
 * maar kleiner: 30S + 50S = 70S (≈ 20 nm tegenover ≈ 25–30 nm). */
export const ribosoom70S = (x, yUit, o = {}) => ribosoom80S(x, yUit, { ...o, s: (o.s ?? 1) * .85 });

/* klein ribosoom voor overzichtsbeelden: grote en kleine eenheid die tegen elkaar liggen (geen bolletje).
 * rot in graden: 0 = kleine eenheid boven. */
export function ribosoomKlein(x, y, { s = 1, rot = 0, op = 1, col = C.rrna } = {}) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})">` +
    `<path d="${eiwitPad(0, 4, 13, 8.5, 60, .07)}" fill="${col}" fill-opacity=".75" stroke="${col}" stroke-width="1.6"/>` +
    `<path d="${eiwitPad(-1, -8.5, 10, 5, 40, .08)}" fill="${col}" fill-opacity=".45" stroke="${col}" stroke-width="1.6"/></g>`;
}

/* dubbelmembraanblaasje (autofagosoom): twee dubbellagen met een smalle ruimte ertussen */
export function blaasjeDubbel(cx, cy, r, { lumen = 'rgba(201,165,116,.08)', w = 10, gap = 6, op = 1 } = {}) {
  if (op <= .01) return '';
  const ri = r - w / 2 - gap / 2, ro = r + w / 2 + gap / 2;
  return `<g opacity="${f1(op)}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ro)}" fill="rgba(201,165,116,.12)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ri)}" fill="${lumen}"/>` +
    membraanPts(ptsCirkel(cx, cy, ri), { w, closed: true }) + membraanPts(ptsCirkel(cx, cy, ro), { w, closed: true }) + '</g>';
}
