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
import { C, f1, rng, BASE, RNA_PAIR, THREE, AACLASS, CLASSCOL, TRNA_SITE } from './kit.js';
export { TRNA_SITE };

export const LIPID = { head: '#e2bd7e', tail: '#9a8160', core: 'rgba(138,115,80,.18)' };
/* kleine ribosoomeenheid (40S/30S): lichtere tint van C.rrna, overal in 2D (grote eenheid = C.rrna), zoals in de 3D-structuurscène */
export const RRNA_KLEIN = '#8df0dc';

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
  /* dunne membraan (w < 10): kleinere kopjes zonder staartjes, zodat elke membraan zichtbaar TWEE rijen kopjes houdt
   * (anders smelten beide rijen tot één rij en leest een kernenvelop als één enkele dubbellaag). */
  if (w < 10) {
    const hr = Math.max(.9, w * .17), pitch = hr * 2.6;
    let g = `<g opacity="${f1(op)}" fill="none" stroke-linecap="round">`;
    g += `<path d="${ptsD(P, closed)}" stroke="#0b1224" stroke-opacity=".75" stroke-width="${f1(Math.max(1, w - 2 * hr))}" stroke-linecap="butt"/>`;
    for (const side of [-1, 1]) g += `<path d="${ptsD(offsetPts(P, side * (w / 2 - hr), closed), closed)}" stroke="${head}" stroke-width="${f1(hr * 2)}" stroke-dasharray="0 ${f1(pitch)}"/>`;
    return g + '</g>';
  }
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

/* ---------- RNA-polymerase (zijaanzicht), app-vorm van Pol II ----------
 * Bouw (Cramer et al. 2001, Science 292:1863; Alberts/MBoC hfst. 6): één grote eiwitklomp met een diepe geul (kloof)
 * waar het DNA dwars doorheen loopt. Bovenaan de beweeglijke klem, onderaan de kaak; aan de voorkant (stroomafwaarts,
 * in de leesrichting) gaat de geul open als een krabbenschaar. Het RNA verlaat het enzym bovenaan aan de achterkant
 * (stroomopwaarts), 5′-uiteinde eerst. Enkel Pol II heeft de lange CTD-staart (heptade YSPTSPS), die onderaan achter uitsteekt.
 * (cx, cy) = middenlijn van het DNA in de geul; rx, ry = halve breedte/hoogte; dir = +1 leest naar rechts, −1 naar links;
 * ctdHoek = richting van de staart (90° = recht omlaag, groter = schuin naar achter); ctdStap = afstand tussen de CTD-kraaltjes (polCTD geeft hun posities voor S5P/S2P-merktekens);
 * gul = halve hoogte van de geul (standaard ry·0,24); uit = hoek (rad) van de RNA-uitgang boven de achterkant;
 * diep = hoe ver de geul naar achter loopt (fractie van rx); hoog = hoogte van de bovenhelft (klem) t.o.v. ry; ctd = lengte van de CTD-staart in px (0 = geen); vul = vulsterkte.
 * Het lichaam is doorschijnend, zodat het DNA (en de bel met het RNA) erdoor zichtbaar blijft. Pol I en Pol III krijgen
 * dezelfde vorm in hun eigen kleur (col) en zonder CTD. Geeft een SVG-string terug. */
export function polymerase(cx, cy, rx, ry, { col = C.prot, dir = 1, op = 1, gul = null, ctd = 0, label = '', fs = 18, lc = '#fff', labelY = null, vul = .24, achter = 0, seed = 7, sw = null, uit = .78, diep = .5, hoog = 1, ctdStap = null, ctdHoek = 90 } = {}) {
  if (op <= .01) return '';
  const G = gul ?? ry * .24, ryT = ry * hoog, R = rng(seed * 4241 + 7), h = [2, 3, 5].map(k => [k, (R() - .5) * .1 / Math.sqrt(k), R() * 6.283]);
  const m = G * .55, a0 = Math.asin(Math.min(.9, m / ry)), N = 56, rear = -rx * diep;
  let d = '';
  for (let i = 0; i <= N; i++) {            // buitenomtrek: van de onderste kaakpunt, langs de achterkant, tot de punt van de klem
    const a = a0 + (2 * Math.PI - 2 * a0) * i / N, aw = Math.atan2(Math.sin(a), Math.cos(a));
    let k = 1; for (const [n, amp, ph] of h) k += amp * Math.cos(n * a + ph);
    const ab = Math.PI - Math.abs(aw); k -= .06 * Math.exp(-(ab * ab) / .03);      // achterkant: hier verlaat het DNA het enzym
    const dU = aw + (Math.PI - uit); k -= .1 * Math.exp(-(dU * dU) / .025);        // RNA-uitgang: inkeping boven-achter
    d += (i ? ' L' : 'M') + f1(Math.cos(a) * rx * k) + ',' + f1(Math.sin(a) * (Math.sin(a) < 0 ? ryT : ry) * k);
  }
  const gr = Math.min(G, rx * .2), xt = Math.cos(a0) * rx, xi = xt - rx * .2;
  d += ` Q${f1(xi + rx * .06)},${f1(-m)} ${f1(xi)},${f1(-G)} L${f1(rear + gr)},${f1(-G)} Q${f1(rear)},${f1(-G)} ${f1(rear)},0 Q${f1(rear)},${f1(G)} ${f1(rear + gr)},${f1(G)} L${f1(xi)},${f1(G)} Q${f1(xi + rx * .06)},${f1(m)} ${f1(xt)},${f1(m)} Z`;   // de geul: smalle bek vooraan, ruimer binnenin, tot diep in het enzym
  const sw0 = sw ?? Math.max(1.6, Math.min(3, rx / 40));
  const ua = Math.PI + uit, ux = Math.cos(ua) * rx * .8, uy = Math.sin(ua) * ryT * .8;
  let s = `<g opacity="${f1(op)}" transform="translate(${f1(cx)} ${f1(cy)})"><g transform="scale(${dir < 0 ? -1 : 1} 1)">`;
  if (ctd > 0) {                             // CTD: soepele staart met kraaltjes (heptaden), onderaan achter
    const Q = ctdLokaal(rx, ry, ctd, ctdStap, ctdHoek); let p = `M${f1(Q[0][0])},${f1(Q[0][1])}`, b = '';
    for (const [x, y] of Q.slice(1)) { p += ` L${f1(x)},${f1(y)}`; b += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(Math.max(2, Math.min(5, (Q[1][1] - Q[0][1]) * .3)))}" fill="${col}"/>`; }
    s += `<path d="${p}" stroke="${col}" stroke-width="${f1(sw0)}" fill="none" stroke-linejoin="round" opacity=".8"/>${b}`;
  }
  if (achter > 0) s += `<path d="${d}" fill="#0b1224" fill-opacity="${f1(achter)}"/>`;
  s += `<path d="${d}" fill="${col}" fill-opacity="${f1(vul)}" stroke="${col}" stroke-width="${f1(sw0)}" stroke-linejoin="round"/>` +
    `<path d="${eiwitPad(-rx * .08, -G - (ryT - G) * .48, rx * .5, (ryT - G) * .3, seed + 3, .08)}" fill="#fff" fill-opacity=".09"/>` +   // klem (bovenste lob)
    `<ellipse cx="${f1(ux * .97)}" cy="${f1(uy * .97)}" rx="${f1(Math.max(3, rx * .07))}" ry="${f1(Math.max(2.5, ry * .06))}" fill="#0b1224" fill-opacity=".55" stroke="${col}" stroke-width="${f1(sw0 * .6)}"/>` +   // RNA-uitgang
    '</g>';
  if (label) s += `<text x="0" y="${f1(labelY ?? (-G - (ryT - G) * .45 + fs * .35))}" font-size="${fs}" text-anchor="middle" fill="${lc}" font-family="Inter" font-weight="700">${label}</text>`;
  return s + '</g>';
}
export const polII = (cx, cy, rx, ry, o = {}) => polymerase(cx, cy, rx, ry, { col: C.prot, ...o });
/* CTD-geometrie (lokaal, leesrichting +x): beginpunt onderaan achter + kraaltjes naar beneden */
function ctdLokaal(rx, ry, ctd, stap = null, hoek = 90) {
  const x0 = -rx * .42, y0 = ry * .86, st = stap ?? Math.max(8, ry * .11), n = Math.max(3, Math.round(ctd / st)), Q = [[x0, y0]];
  const a = hoek * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a);   // hoek 90 = recht naar onder, > 90 = schuin naar achter
  for (let i = 1; i <= n; i++) { const w = Math.sin(i * 1.3) * st * .55; Q.push([x0 + i * st * dx - w * dy, y0 + i * st * dy + w * dx]); }
  return Q;
}
/* absolute posities van de CTD-kraaltjes (zelfde plaats als de ctd-optie), om er S5P/S2P-merktekens of een label aan te hangen */
export const polCTD = (cx, cy, rx, ry, ctd, { dir = 1, ctdStap = null, ctdHoek = 90 } = {}) => ctdLokaal(rx, ry, ctd, ctdStap, ctdHoek).slice(1).map(([x, y]) => [cx + (dir < 0 ? -x : x), cy + y]);

/* ---------- tRNA: één 2D-symbool voor de hele app ----------
 * Vereenvoudigde L-vorm: zo is een tRNA echt gevouwen, ook los in de cel en in het ribosoom (Kim et al. 1974 Science 185:435;
 * Robertus et al. 1974 Nature 250:546; in het ribosoom: Yusupov et al. 2001 Science 292:883). Het klaverblad is enkel de
 * 2D-kaart van de basenparen; dat (en het vouwen tot een L) toont de tRNA-scène (tl/trna.js).
 * Twee armen haaks op elkaar: de anticodonarm (anticodonstam + D-stam) loopt van de anticodonlus naar de elleboog, de
 * acceptorarm (TΨC-stam + acceptorstam) van de elleboog naar het CCA-uiteinde met het aminozuur. In de elleboog raken de
 * D-lus en de TΨC-lus elkaar. Verhouding van de armen zoals in 1EHZ (anticodonarm iets langer). Onderaan de anticodonlus
 * met de 3 basen van het anticodon (tegels in de basekleuren, zoals overal). Het anticodon en het CCA-uiteinde liggen
 * ~7 nm uit elkaar: in het ribosoom zit het anticodon op het codon (kleine eenheid) en het CCA-uiteinde in het PTC.
 * Richting: in de app loopt het mRNA altijd 5′→3′ van links naar rechts. Het anticodon paart antiparallel, dus staat het
 * van links naar rechts als 3′→5′ (bv. codon AUG ↔ tegels U A C = anticodon 5′-CAU-3′). Bij een plat klaverblad
 * loopt de anticodonlus van 5′ naar 3′ in dezelfde richting als de acceptorstam van 5′ naar 3′; om beide kloppend te
 * houden, staat het symbool standaard gespiegeld t.o.v. de tRNA-scène (3′-CCA-uiteinde links, D-arm rechts).
 * std = true geeft de tekstboekstand van de tRNA-scène (5′ links, CCA rechts, anticodon 5′→3′ van links naar rechts).
 * (x, y) = het anticodonpunt: midden van de bovenrand van de anticodontegels (de tegels hangen eronder, op het codon).
 * Afmetingen bij s = 1: aminozuur ≈ 222 boven (x, y), breedte armen ± 47; tegelafstand nt (lokaal, standaard 40).
 * Opties: s, rot (graden, om (x, y)), op, col, anticodon ('UAC' = van links naar rechts zoals getekend), aa ('M' →
 * kleur per klasse + 'Met', of een eigen tekst zoals 'fMet'/'Sec'), aaCol, letters (tekst in tegels en bolletje),
 * mini (eenvoudig vol silhouet zonder tekst, voor kleine ribosomen), ends (3′/5′ naast het anticodon), acLabel
 * (woord achter het rechterlabel), tip ([x, y] absoluut: het CCA-uiteinde buigt daarheen, aminozuur tekent de oproeper),
 * acHi (0..1: tegels wit omrand), acTop (extra ruimte boven de tegels in de lus), tile ([b, h] als deel van nt), aaR (straal bolletje). */
const TG = { W: 16, J: -94, ACC: -176, ACS: -16, ARM: 33, LR: 14, VAR: [12, -64, 6], TAIL: [[4, -176], [5, -195], [15, -204]], AA: [22, -222], AAR: 19,
  EL: [79, -108], ER: 15 };   // L-vorm: elleboog (x naar de kant tegenover het CCA-uiteinde) en straal van de elleboog
export const hexMix = (a, b, t) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
const tLocal = (x, y, s, rot, lx, ly) => { const r = rot * Math.PI / 180, c = Math.cos(r), si = Math.sin(r); return [x + s * (lx * c - ly * si), y + s * (lx * si + ly * c)]; };
/* anticodon zoals getekend (links→rechts = 3′→5′) bij een codon 5′→3′ */
export const anticodonVan = codon => codon.split('').map(b => RNA_PAIR[b] ?? b).join('');
/* absolute plek van het aminozuur (naar = 'aa') of van het uiterste CCA-uiteinde (naar = 'cca') */
export function trnaPunt(x, y, { s = 1, rot = 0, std = false, naar = 'aa' } = {}) {
  const m = std ? 1 : -1, P = naar === 'aa' ? TG.AA : TG.TAIL[2];
  return tLocal(x, y, s, rot, m * P[0], P[1]);
}
export function trna2d(x, y, { s = 1, rot = 0, op = 1, col = C.trna, anticodon = null, aa = null, aaCol = null, letters = true, nt = 40, mini = false,
  ends = false, acLabel = '', std = false, tip = null, acHi = 0, acTop = 0, tile = [.8, .7], aaR = TG.AAR } = {}) {
  if (op <= .01 || !(s > 0)) return '';
  const m = std ? 1 : -1, W = mini ? Math.max(22, 11 / s) : TG.W, rim = mini ? Math.max(3, 1.6 / s) : 3;   // mini: dik genoeg om als L te lezen, ook in uitgezoomde scènes
  // mini zonder lettertegels: compacte anticodonlus (anders leest de L als een Z); met tegels: breed genoeg voor 3 letters
  const tw = nt * tile[0], th = nt * tile[1], bw = mini && !anticodon ? 20 : nt * 1.4 + 2, b0 = TG.ACS - acTop, b1 = th + 2, brx = Math.min((b1 - b0) / 2, 22);
  const up = (px, py) => rot ? ` transform="rotate(${f1(-rot)} ${f1(px)} ${f1(py)})"` : '';   // tekst rechtop houden
  // L-vorm: anticodonarm (anticodonlus → elleboog) en acceptorarm (elleboog → CCA), haaks; elleboog en variabele lus als bolletjes
  const E = [-m * TG.EL[0], TG.EL[1]], A0 = [0, b0 + 2], CC = [m * 4, TG.ACC];
  const skel = `M${f1(A0[0])},${f1(A0[1])} L${f1(E[0])},${f1(E[1])} L${f1(CC[0])},${f1(CC[1])}`;
  const vp = [A0[0] + (E[0] - A0[0]) * .62, A0[1] + (E[1] - A0[1]) * .62], vn = [-(E[1] - A0[1]), E[0] - A0[0]], vl = Math.hypot(...vn);
  const vs = Math.sign(vn[0] * -m || 1);   // variabele lus aan de buitenkant van de L
  const loops = [[E[0], E[1], Math.max(TG.ER, W * .72)], [vp[0] + vs * vn[0] / vl * (W / 2 + 3), vp[1] + vs * vn[1] / vl * (W / 2 + 3), TG.VAR[2]]];
  const shape = (fill, d) => `<path d="${skel}" stroke="${fill}" stroke-width="${f1(W + 2 * d)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
    loops.map(([cx, cy, r]) => `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r + d)}" fill="${fill}"/>`).join('') +
    `<rect x="${f1(-bw - d)}" y="${f1(b0 - d)}" width="${f1(2 * (bw + d))}" height="${f1(b1 - b0 + 2 * d)}" rx="${f1(brx + d)}" fill="${fill}"/>`;
  let g = `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)})${rot ? ` rotate(${f1(rot)})` : ''}${s !== 1 ? ` scale(${s.toFixed(4)})` : ''}">`;
  // CCA-uiteinde (enkelstrengs 3′-einde): standaard kort haakje naar buiten, of gebogen naar een gegeven punt (tip)
  let tail;
  if (tip) {
    const r = -rot * Math.PI / 180, dx = (tip[0] - x) / s, dy = (tip[1] - y) / s, lx = dx * Math.cos(r) - dy * Math.sin(r), ly = dx * Math.sin(r) + dy * Math.cos(r);
    tail = `M${f1(m * 4)},${TG.ACC} Q${f1(m * 4 + (lx - m * 4) * .2)},${f1(TG.ACC - 40)} ${f1(lx)},${f1(ly)}`;
  } else tail = `M${f1(m * TG.TAIL[0][0])},${TG.TAIL[0][1]} Q${f1(m * TG.TAIL[1][0])},${TG.TAIL[1][1]} ${f1(m * TG.TAIL[2][0])},${TG.TAIL[2][1]}`;
  if (mini) {
    // klein symbool: zonder CCA-haakje (op deze schaal leest L + haakje als een zigzag); de acceptorarm eindigt zelf op het doel
    const tl = tip ? tail : '';
    g += (tl ? `<path d="${tl}" stroke="#0b1224" stroke-width="${f1(7 + 2 * rim)}" fill="none" stroke-linecap="round"/>` : '') + shape('#0b1224', rim) +
      shape(col, 0) + (tl ? `<path d="${tl}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>` : '');
  } else {
    const inner = hexMix(col, '#0b1224', .74);
    g += `<path d="${tail}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>` + shape(col, rim) + shape(inner, 0);
    // basenparen in beide armen (korte streepjes dwars op de arm): zo lees je 'gepaarde stam' en 'lus'
    let r = '';
    const ticks = (P, Q, from, to, step) => {
      const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, h = W / 2 - 3;
      for (let t = from; t <= L - to; t += step) { const cx = P[0] + ux * t, cy = P[1] + uy * t; r += `M${f1(cx - uy * h)},${f1(cy + ux * h)} L${f1(cx + uy * h)},${f1(cy - ux * h)}`; }
    };
    ticks(A0, E, 10, TG.ER + 4, 11); ticks(E, CC, TG.ER + 6, 4, 12);
    g += `<path d="${r}" stroke="${col}" stroke-opacity=".6" stroke-width="2" fill="none"/>`;
  }
  // anticodontegels
  if (anticodon) [...anticodon].forEach((b, j) => {
    const bx = (j - 1) * nt, fill = BASE[b] ?? (b === 'I' ? '#d9c7ff' : '#c8cfdd');
    const hi = acHi > .01 ? ` stroke="#fff" stroke-width="${f1(1 + 3 * acHi)}"` : '';
    g += `<rect x="${f1(bx - tw / 2)}" y="-4" width="${f1(tw)}" height="${f1(th)}" rx="${f1(Math.min(5, th * .2))}" fill="${fill}"${hi}/>`;
    if (letters && !mini) g += `<text x="${f1(bx)}" y="${f1(-4 + th * .72)}" font-size="${f1(th * .62)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700"${up(bx, -4 + th / 2)}>${b}</text>`;
  });
  if (ends && !mini) {
    // boven de hoeken van de anticodonlus: los van een buur-tRNA dat er vlak naast staat
    const yy = b0 - 7, xl = -bw + 8;
    g += `<text x="${f1(xl)}" y="${f1(yy)}" font-size="16" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700"${up(xl, yy)}>${std ? '5′' : '3′'}</text>` +
      `<text x="${f1(-xl)}" y="${f1(yy)}" font-size="16" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700"${up(-xl, yy)}>${std ? '3′' : '5′'}</text>`;
    if (acLabel) g += `<text x="${f1(-xl + 12)}" y="${f1(yy)}" font-size="15" text-anchor="start" fill="#fff" font-family="Inter" font-weight="600"${up(-xl + 12, yy)}>${acLabel}</text>`;
  }
  // aminozuur op het 3′-CCA-uiteinde (nooit aan de anticodonkant)
  if (!tip && (aa || aaCol)) {
    const [ax, ay] = [m * TG.AA[0], TG.AA[1] - (aaR - TG.AAR)], one = aa && aa.length === 1;
    const fill = aaCol ?? (one ? CLASSCOL[AACLASS[aa]] ?? '#aaa' : C.chain), lab = one ? THREE[aa] : aa;
    g += `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="${f1(aaR)}" fill="${fill}" stroke="#0a1224" stroke-width="${f1(2 / s)}"/>`;
    if (lab && letters && !mini) g += `<text x="${f1(ax)}" y="${f1(ay + aaR * .3)}" font-size="${f1(aaR * (lab.length > 3 ? .68 : .74))}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800"${up(ax, ay)}>${lab}</text>`;
  }
  return g + '</g>';
}
/* tRNA tussen twee punten: anticodonpunt a en aminozuur (of, zonder aminozuur, het CCA-uiteinde) op b; s en rot volgen daaruit */
export function trna2dSpan(a, b, o = {}) {
  const m = o.std ? 1 : -1, P = (o.aa || o.aaCol) ? TG.AA : o.mini ? [4, TG.ACC] : TG.TAIL[2];   // mini: geen haakje, dus het einde van de acceptorarm
  const lx = m * P[0], ly = P[1], dx = b[0] - a[0], dy = b[1] - a[1];
  const s = Math.hypot(dx, dy) / Math.hypot(lx, ly), rot = (Math.atan2(dy, dx) - Math.atan2(ly, lx)) * 180 / Math.PI;
  return trna2d(a[0], a[1], { ...o, s, rot });
}

/* ---------- 80S-ribosoom (zijaanzicht) ----------
 * Bouw (Alberts/MBoC; Voorhees & Hegde 2016): de kleine eenheid (40S) leest het mRNA, dat tussen beide eenheden loopt.
 * tRNA's overspannen beide eenheden: het anticodon zit op het codon (40S-kant), het aminozuurende reikt tot het
 * peptidyltransferasecentrum (PTC) in de grote eenheid (60S), vlak onder de grens tussen de eenheden.
 * Van het PTC loopt de uitgangstunnel dwars door de 60S naar de andere kant. Op het ER zit die uitgang op het Sec61-kanaal.
 * (x, yUit) = waar de tunnel de 60S verlaat. Standaard (ER-stand) zit de 40S boven en de 60S onder het mRNA, tunnel naar onder.
 * grootBoven = true: de app-afspraak voor vrije ribosomen (zoals in translatie): 60S boven het mRNA, 40S eronder, tunnel
 * en keten naar boven; (x, yUit) is dan de tunneluitgang bovenaan. Geeft { svg, ptc, uit, tunnelD, mrnaY, L, S } terug. */
export function ribosoom80S(x, yUit, { s = 1, op = 1, label = '', labelSmall = '', tRNAs = 2, mrna = true, grootBoven = false } = {}) {
  const Y = v => grootBoven ? 2 * yUit - v : v;                                        // spiegelen rond de tunneluitgang
  const Lcy = yUit - 66 * s, L = { cx: x, cy: Y(Lcy), rx: 122 * s, ry: 64 * s };       // 60S
  const Scy = Lcy - L.ry - 36 * s, S = { cx: x - 10 * s, cy: Y(Scy), rx: 100 * s, ry: 42 * s };   // 40S: raakt de 60S over een groot vlak (bruggen tussen de eenheden)
  const mY = Lcy - L.ry - 10 * s, mrnaY = Y(mY);                                       // mRNA loopt door die spleet, gebonden aan de 40S
  const ptcY = Lcy - L.ry + 26 * s, ptc = [x + 4 * s, Y(ptcY)];                       // actief centrum: in de 60S, vlak bij de grens
  const tunnelD = `M${f1(ptc[0])},${f1(ptc[1])} C${f1(x + 26 * s)},${f1(Y(Lcy - 6 * s))} ${f1(x - 10 * s)},${f1(Y(Lcy + 26 * s))} ${f1(x)},${f1(Y(yUit + 2))}`;
  let g = `<g opacity="${f1(op)}">`;
  g += eiwit(L.cx, L.cy, L.rx, L.ry, C.rrna, { seed: 60, bumps: .07 });
  g += `<path d="${tunnelD}" stroke="#0b1224" stroke-opacity=".6" stroke-width="${f1(13 * s)}" fill="none" stroke-linecap="round"/>`;
  g += eiwit(S.cx, S.cy, S.rx, S.ry, RRNA_KLEIN, { seed: 40, bumps: .08 });
  // tRNA's: P-plaats (draagt de keten) en A-plaats (brengt het volgende aminozuur); anticodon op het mRNA, voet in het PTC
  const tr = (dx, col) => {                   // tRNA-symbool (trna2d, mini): anticodon op het codon, CCA-uiteinde tot in het PTC
    const a = [x + dx * s, Y(mY + 5 * s)], b = [ptc[0] + (dx < 0 ? -5 : 7) * s, Y(ptcY - 3 * s)];
    return trna2dSpan(a, b, { col, mini: true });
  };
  if (tRNAs >= 1) g += tr(-16, TRNA_SITE.P);
  if (tRNAs >= 2) g += tr(18, TRNA_SITE.A);
  if (mrna) g += `<path d="M${f1(x - 210 * s)},${f1(Y(mY + 2 * s))} C${f1(x - 120 * s)},${f1(Y(mY - 4 * s))} ${f1(x + 100 * s)},${f1(Y(mY + 5 * s))} ${f1(x + 220 * s)},${f1(Y(mY - 1 * s))}" stroke="${C.rna}" stroke-width="${f1(6 * s)}" fill="none" stroke-linecap="round"/>`;
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
    g += `<path d="M-4,-21 v-35 M-4,-56 l-9,-12 M-4,-56 l9,-12" stroke="#c9d2e4" stroke-width="2.4" fill="none"/>`;
    g += `<rect x="-10" y="-34" width="12" height="12" rx="2" fill="#0072BC"/><rect x="-10" y="-47" width="12" height="12" rx="2" fill="#0072BC"/>` +   // twee GlcNAc (SNFG blauw vierkant), zoals de kern van elk N-glycaan
      `<circle cx="-4" cy="-56" r="6.5" fill="#00A651"/>` +                                                                 // centrale β-mannose (kern Man₃GlcNAc₂)
      `<circle cx="-14" cy="-70" r="6.5" fill="#00A651"/><circle cx="6" cy="-70" r="6.5" fill="#00A651"/>`;          // twee armmannoses (α1-3, α1-6)
    if (tag > .01) g += `<g opacity="${f1(tag)}"><circle cx="20" cy="-80" r="15" fill="#ff9f43"/><text x="20" y="-72" font-size="22" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">P</text></g>`;
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
export function kernEnvelop(P, { closed = true, poriën = [], w = 12, gap = 12, poreW = 26, op = 1, binnen = 1, lumen = 'rgba(143,179,232,.16)', npc = true, s = 1 } = {}) {   // perinucleaire ruimte = ER-lumen (één doorlopende ruimte): zelfde blauwe tint
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
export function ribosoomKlein(x, y, { s = 1, rot = 0, op = 1, col = C.rrna, colKlein = null } = {}) {
  if (op <= .01) return '';
  const ck = colKlein ?? (col === C.rrna ? RRNA_KLEIN : col);
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})">` +
    `<path d="${eiwitPad(0, 4, 13, 8.5, 60, .07)}" fill="${col}" fill-opacity=".75" stroke="${col}" stroke-width="1.6"/>` +
    `<path d="${eiwitPad(-1, -8.5, 10, 5, 40, .08)}" fill="${ck}" fill-opacity=".45" stroke="${ck}" stroke-width="1.6"/></g>`;
}

/* dubbelmembraanblaasje (autofagosoom): twee dubbellagen met een smalle ruimte ertussen */
export function blaasjeDubbel(cx, cy, r, { lumen = 'rgba(201,165,116,.08)', w = 10, gap = 6, op = 1 } = {}) {
  if (op <= .01) return '';
  const ri = r - w / 2 - gap / 2, ro = r + w / 2 + gap / 2;
  return `<g opacity="${f1(op)}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ro)}" fill="rgba(201,165,116,.12)"/><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(ri)}" fill="${lumen}"/>` +
    membraanPts(ptsCirkel(cx, cy, ri), { w, closed: true }) + membraanPts(ptsCirkel(cx, cy, ro), { w, closed: true }) + '</g>';
}
