/*
 * Kleine hulpfuncties voor de scènes van stage 'tl' (alleen door deze map gebruikt).
 *  - hud(): vaste knoppen ("chips") die op het scherm blijven staan terwijl de camera zoomt
 *  - stepper(): vloeiende overgang van waarden tussen stappen (deterministisch uit (step, p))
 */
import { C, L, f1, ease, sub, lerp, rng } from '../../kit.js';
import { eiwit } from '../../bio.js';

/* Chips links bovenaan in beeld (of met row:true naast elkaar, bv. onderaan). items: [{ node, label:{nl,en}, color, href? }] */
export function hud(id, items, { row = false } = {}) {
  let x = 0, y = 0, s = '';
  for (const it of items) {
    const t = L(it.label), fs = 21, w = Math.round(t.length * fs * .56 + 48), h = 38;
    s += `<g data-node="${it.node}" data-nolabel ${it.href ? `data-href="${it.href}"` : ''} data-color="${it.color ?? C.rrna}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="11" fill="rgba(9,14,28,.86)" stroke="${it.color ?? C.rrna}" stroke-opacity=".75" stroke-width="1.6"/>
      <circle cx="${x + 17}" cy="${y + h / 2}" r="5.5" fill="${it.color ?? C.rrna}"/>
      <text x="${x + 31}" y="${y + h / 2 + fs * .36}" font-size="${fs}" fill="${C.text}" font-family="Inter" font-weight="600">${t}${it.href ? ' ↗' : ''}</text></g>`;
    if (row) x += w + 10; else y += h + 9;
  }
  return `<g id="${id}">${s}</g>`;
}
/* zet de hud-groep op een vaste plek binnen de huidige camera (leest de viewBox van het vorige frame).
 * tcam = doelcamera van de stap: gebruikt zolang de lopende camera de viewBox nog niet zette (die schrijft altijd
 * met decimalen), bv. vóór het eerste frame of in de meet-tools; zo staat de hud ook dan in het eindbeeld. */
export function placeHud(svg, id, fx = .015, fy = .105, tcam = null) {
  const raw = svg.getAttribute('viewBox') || '0 0 1600 900';
  const vb = tcam && raw.trim() === '0 0 1600 900' ? tcam : raw.split(/[\s,]+/).map(Number);
  const k = vb[2] / 1600;
  svg.getElementById(id)?.setAttribute('transform', `translate(${f1(vb[0] + fx * vb[2])} ${f1(vb[1] + fy * vb[3])}) scale(${k.toFixed(4)})`);
}

/* waarde die per stap een doel heeft en in het begin van elke stap vloeiend overgaat: val(steps, key, s, frac) */
export function stepVal(vals, s, frac = .3, def = 0) {
  const cur = vals[s.step] ?? def, prev = s.step > 0 ? (vals[s.step - 1] ?? def) : cur;
  const k = ease(sub(s.p, 0, frac));
  if (Array.isArray(cur)) return cur.map((v, i) => lerp(prev[i], v, k));
  return lerp(prev, cur, k);
}

/* kleur-helpers */
export const hex2rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export const rgb = a => `rgb(${a.map(v => Math.round(v)).join(',')})`;
export const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k);

/* tekstvak met meerdere regels (links uitgelijnd) */
export function textBox(x, y, w, lines, { title = null, col = C.rrna, fs = 20, lh = 1.45, op = 1, pad = 18 } = {}) {
  if (op <= .01) return '';
  const th = title ? fs * 1.25 * lh : 0, h = pad * 2 + th + lines.length * fs * lh;
  let s = `<g opacity="${f1(op)}"><rect x="${x}" y="${y}" width="${w}" height="${f1(h)}" rx="14" fill="rgba(9,14,28,.84)" stroke="${col}" stroke-opacity=".6" stroke-width="2"/>`;
  let yy = y + pad + fs;
  if (title) { s += `<text x="${x + pad}" y="${f1(yy + 2)}" font-size="${f1(fs * 1.2)}" fill="${col}" font-family="Inter" font-weight="700">${title}</text>`; yy += th; }
  for (const l of lines) { s += `<text x="${x + pad}" y="${f1(yy)}" font-size="${fs}" fill="${C.text}" font-family="Inter" font-weight="500">${l}</text>`; yy += fs * lh; }
  return s + '</g>';
}

/* ---------- schematisch ribosoom in de 'leesweergave' (mRNA horizontaal, 60S erboven, 40S eronder) ----------
 * Zelfde bouw als ribosoom80S in bio.js, maar groot genoeg om tRNA's met letters in de A-, P- en E-plaats te tonen:
 * de kleine eenheid (40S) houdt het mRNA vast, de tRNA's reiken van het codon tot het peptidyltransferasecentrum (PTC)
 * in de grote eenheid (60S), en de uitgangstunnel loopt van het PTC dwars door de 60S naar de buitenkant.
 * koepelPad: bobbelige halve koepel met een vlakke kant op hoogte yb (dir -1 = koepel naar boven, +1 = naar beneden). */
export function koepelPad(cx, yb, rx, h, { seed = 1, bumps = .035, dir = -1 } = {}) {
  const R = rng(seed * 7919 + 17), hs = [2, 3, 5, 7].map(k => [k, (R() - .5) * 2 * bumps / Math.sqrt(k), R() * 6.283]);
  const N = 40, pts = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N * Math.PI; let k = 1;
    for (const [n, a, ph] of hs) k += a * Math.cos(n * t + ph) * Math.sin(t);           // rand blijft vast op de vlakke kant
    pts.push([cx - rx * Math.cos(t) * k, yb + dir * h * Math.pow(Math.sin(t), .8) * k]);
  }
  const c = 14;   // afgeronde hoeken aan de vlakke kant
  return 'M' + pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L') + ` Q${f1(cx + rx)},${f1(yb)} ${f1(cx + rx - c)},${f1(yb)} L${f1(cx - rx + c)},${f1(yb)} Q${f1(cx - rx)},${f1(yb)} ${f1(pts[0][0])},${f1(pts[0][1])}Z`;
}
/* één subeenheid in rRNA-kleur, in dezelfde stijl als eiwit()/ribosoom80S (donkere onderlaag, doorschijnend vlak, rand) */
export function subeenheid(d, { col = C.rrna, fill = .2, op = 1 } = {}) {
  return `<g opacity="${f1(op)}"><path d="${d}" fill="#0b1224" fill-opacity=".55"/><path d="${d}" fill="${col}" fill-opacity="${fill}" stroke="${col}" stroke-width="3" stroke-linejoin="round"/></g>`;
}
/* uitgangstunnel: donkere buis van het PTC (a) tot de rand van de 60S (b), met een lichte rand */
export function tunnel(a, b, { w = 34, op = 1 } = {}) {
  const d = `M${f1(a[0])},${f1(a[1])} C${f1(a[0] + 18)},${f1(lerp(a[1], b[1], .4))} ${f1(b[0] - 14)},${f1(lerp(a[1], b[1], .65))} ${f1(b[0])},${f1(b[1])}`;
  return `<g opacity="${f1(op)}"><path d="${d}" stroke="${C.rrna}" stroke-opacity=".55" stroke-width="${w + 6}" fill="none" stroke-linecap="butt"/><path d="${d}" stroke="#0b1224" stroke-opacity=".85" stroke-width="${w}" fill="none" stroke-linecap="butt"/>` +
    `<circle cx="${f1(a[0])}" cy="${f1(a[1])}" r="${f1(w * .62)}" fill="#0b1224" fill-opacity=".85"/></g>`;
}
/* factor-eiwit (zelfde aanroep als pill(): midden x,y, breedte, hoogte, tekst) maar als bobbelig eiwit (bio.js) i.p.v. een pil */
export function factor(x, y, w, h, text, col = C.prot, op = 1, fs = 18, seed = null) {
  if (op <= .01) return '';
  return eiwit(x, y, w / 2 + 4, h / 2 + 5, col, { seed: seed ?? (String(text).length * 7 + 3), label: text, fs, op, bumps: .09 });
}
