/*
 * Gedeelde tekenhulpjes voor de scènes signaal, gpcr en steroid (verhaallijn 2).
 * Tijdlijn: alle beweging is een functie van g = stap + p (0..aantal stappen). Zo sluit het eindbeeld van stap i
 * (g = i + 1) vanzelf aan op het beginbeeld van stap i + 1.
 */
import { C, f1, clamp, ease } from '../../kit.js';
import { npc } from '../entry/_bits.js';
export { T, TL, tag, arrowDefs, arr, phos, panel } from '../prot/_b_kit.js';

export const EGFC = '#7fdc6a';    // EGF (peptide, groen zoals een keten)
export const ADRC = '#ffd166';    // adrenaline
export const CORTC = '#ff8fa3';   // cortisol
export const GTPC = '#5fd3e6';    // GTP/GDP/ATP/cAMP
export const HSPC = '#58c4a0';    // Hsp90
export const GAC = '#e4b363';     // Gα
export const GBC = '#9fb0d6';     // Gβγ
export const NLSC = '#7fdc6a';

/* ---------- tijd ---------- */
export const K = (g, a, b) => ease(clamp((g - a) / (b - a)));
/* keyframes [[g, v1, v2, ...], ...] → geïnterpoleerde waarden (met easing per segment) */
export function track(g, keys) {
  if (g <= keys[0][0]) return keys[0].slice(1);
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (g <= b[0]) { const u = ease(clamp((g - a[0]) / (b[0] - a[0]))); return a.slice(1).map((v, j) => v + (b[j + 1] - v) * u); }
  }
  return keys[keys.length - 1].slice(1);
}

/* ---------- membranen, kern, DNA ---------- */
export function bilayer(x0, x1, y, o = {}) {
  const { h = 64, step = 16, skip = [] } = o;
  let tails = '', heads = '';
  for (let x = x0 + step / 2; x < x1; x += step) {
    if (skip.some(([a, b]) => x > a && x < b)) continue;
    const l = h / 2 - 13;
    tails += `M${f1(x - 2.5)},${f1(y + 11)}v${f1(l)}M${f1(x + 2.5)},${f1(y + 11)}v${f1(l)}M${f1(x - 2.5)},${f1(y + h - 11)}v${f1(-l)}M${f1(x + 2.5)},${f1(y + h - 11)}v${f1(-l)}`;
    heads += `<circle cx="${f1(x)}" cy="${f1(y + 7)}" r="6.5"/><circle cx="${f1(x)}" cy="${f1(y + h - 7)}" r="6.5"/>`;
  }
  return `<rect x="${x0}" y="${y + 8}" width="${x1 - x0}" height="${h - 16}" fill="${C.mem}" fill-opacity=".10"/>` +
    `<path d="${tails}" stroke="#a88d66" stroke-width="1.8" opacity=".75" fill="none"/><g fill="${C.mem}">${heads}</g>`;
}
/* kernenvelop (dubbel membraan) met poriën */
export function nucEnv(x0, x1, y, pores, s = .6) {
  const gap = 58 * s / .6;
  let segs = [], x = x0;
  for (const p of [...pores].sort((a, b) => a - b)) { segs.push([x, p - gap]); x = p + gap; }
  segs.push([x, x1]);
  let out = '';
  for (const [a, b] of segs) {
    out += `<path d="M${f1(a)},${y - 14}L${f1(b)},${y - 14}" stroke="#7aa0d8" stroke-width="8"/><path d="M${f1(a)},${y + 14}L${f1(b)},${y + 14}" stroke="#9cc0ff" stroke-width="8"/>`;
  }
  for (const p of pores) out += `<g transform="translate(${p} ${y})">${npc(0, 0, s, { fg: .6 })}</g>`;
  return out;
}
/* dubbelstrengig DNA als ladder-helix */
export function dna(x0, x1, y, o = {}) {
  const { amp = 13, per = 72, op = 1, hl = null } = o;
  let a = '', b = '', r = '';
  for (let x = x0; x <= x1; x += 4) {
    const ph = (x / per) * Math.PI * 2;
    a += `${x === x0 ? 'M' : 'L'}${x},${f1(y + Math.sin(ph) * amp)}`;
    b += `${x === x0 ? 'M' : 'L'}${x},${f1(y - Math.sin(ph) * amp)}`;
    if (x % 12 === 0) r += `M${x},${f1(y + Math.sin(ph) * amp)}L${x},${f1(y - Math.sin(ph) * amp)}`;
  }
  const hlr = hl ? `<rect x="${hl[0]}" y="${y - amp - 8}" width="${hl[1] - hl[0]}" height="${2 * amp + 16}" rx="10" fill="${hl[2] ?? '#ffffff'}" opacity="${f1(hl[3] ?? .12)}"/>` : '';
  return `<g opacity="${f1(op)}">${hlr}<path d="${r}" stroke="#6d7fa6" stroke-width="2" opacity=".7"/><path d="${a}" stroke="${C.dna}" stroke-width="5" fill="none"/><path d="${b}" stroke="${C.dna2}" stroke-width="5" fill="none"/></g>`;
}
/* groeiend mRNA (oranje golflijn) vanaf (x, y) naar rechts-boven, lengte-fractie u */
export function mrna(x, y, u, len = 150, op = 1) {
  if (u <= .01 || op <= .01) return '';
  const n = Math.max(2, Math.round(u * len / 6));
  let d = `M${f1(x)},${f1(y)}`;
  for (let i = 1; i <= n; i++) { const s = i * 6; d += `L${f1(x + s * .8)},${f1(y - s * .45 + Math.sin(s / 7) * 5)}`; }
  return `<path d="${d}" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round" opacity="${f1(op)}"/>`;
}

/* ---------- signaalmoleculen ---------- */
export function egf(x, y, sc = 1, op = 1) {
  if (op <= .01) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}"><ellipse rx="24" ry="19" fill="${EGFC}" fill-opacity=".3" stroke="${EGFC}" stroke-width="3"/>` +
    `<path d="M-15,4 C-12,-12 -4,-10 -2,0 S8,12 12,-2 S16,-10 17,2" stroke="${EGFC}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
const HEX = (r, x = 0, y = 0) => [30, 90, 150, 210, 270, 330].map(a => `${f1(x + Math.cos(a * Math.PI / 180) * r)},${f1(y + Math.sin(a * Math.PI / 180) * r)}`).join(' ');
/* adrenaline: catecholring (2 OH) + zijketen met secundair amine */
export function adr(x, y, sc = 1, op = 1, rot = 0) {
  if (op <= .01) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(sc)})" opacity="${f1(op)}">` +
    `<polygon points="${HEX(13, -14, 0)}" fill="${ADRC}" fill-opacity=".25" stroke="${ADRC}" stroke-width="3.2" stroke-linejoin="round"/>` +
    `<path d="M-25.3,-6.5 L-33,-11 M-25.3,6.5 L-33,11 M-2.7,-6.5 L7,-1 L17,-7 L27,-1 M7,-1 L7,9" stroke="${ADRC}" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<circle cx="-35" cy="-12" r="3.6" fill="#ff6b6b"/><circle cx="-35" cy="12" r="3.6" fill="#ff6b6b"/><circle cx="7" cy="11" r="3.6" fill="#ff6b6b"/><circle cx="28" cy="-1" r="4" fill="${C.dna}"/>` +
    `<path d="M31,-3 L38,-8" stroke="${ADRC}" stroke-width="3" stroke-linecap="round"/></g>`;
}
/* cortisol: steroïdskelet (ringen A, B, C, D) met 3-keto, 11-OH en zijketen */
export function cort(x, y, sc = 1, op = 1, rot = 0) {
  if (op <= .01) return '';
  const a = 11, s3 = Math.sqrt(3) * a;
  const hex = (cx, cy) => [90, 150, 210, 270, 330, 30].map(d => `${f1(cx + Math.cos(d * Math.PI / 180) * a)},${f1(cy + Math.sin(d * Math.PI / 180) * a)}`).join(' ');
  const pc = [2 * s3 + .688 * a, -1.5 * a], R = .8507 * a;
  const pent = [144, 72, 0, -72, -144].map(d => `${f1(pc[0] + Math.cos(d * Math.PI / 180) * R)},${f1(pc[1] + Math.sin(d * Math.PI / 180) * R)}`).join(' ');
  const st = `fill="${CORTC}" fill-opacity=".22" stroke="${CORTC}" stroke-width="2.8" stroke-linejoin="round"`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(sc)}) translate(-24 8)" opacity="${f1(op)}">` +
    `<polygon points="${hex(0, 0)}" ${st}/><polygon points="${hex(s3, 0)}" ${st}/><polygon points="${hex(1.5 * s3, -1.5 * a)}" ${st}/><polygon points="${pent}" ${st}/>` +
    `<path d="M${f1(-s3 / 2)},${f1(a / 2)} l-8,5 M${f1(1.5 * s3 - s3 / 2)},${f1(-a)} l-3,-9 M${f1(pc[0] + R * .31)},${f1(pc[1] - R * .95)} l6,-11 l12,0" stroke="${CORTC}" stroke-width="2.8" fill="none" stroke-linecap="round"/>` +
    `<circle cx="${f1(-s3 / 2 - 10)}" cy="${f1(a / 2 + 6)}" r="3.6" fill="#ff6b6b"/><circle cx="${f1(1.5 * s3 - s3 / 2 - 3)}" cy="${f1(-a - 11)}" r="3.6" fill="#ff6b6b"/>` +
    `<circle cx="${f1(pc[0] + R * .31 + 20)}" cy="${f1(pc[1] - R * .95 - 11)}" r="3.6" fill="#ff6b6b"/></g>`;
}

/* ---------- receptoren en eiwitten ---------- */
/* 7TM-receptor; y = bovenkant bilaag, h = dikte; tilt6 = uitzwaai van helix 6 (graden) */
export function gpcr7(x, y, h = 64, tilt6 = 0, op = 1, col = C.prot) {
  if (op <= .01) return '';
  let s = '';
  const top = y - 18, bot = y + h + 18;
  for (let i = 0; i < 7; i++) {
    const hx = x + (i - 3) * 21;
    if (i < 6) {
      const ly = i % 2 === 0 ? bot : top, dy = i % 2 === 0 ? 14 : -14;
      s += `<path d="M${f1(hx)},${ly} q10.5,${dy * 1.6} 21,0" stroke="${col}" stroke-width="4" fill="none" opacity=".85"/>`;
    }
    const rot = i === 5 ? tilt6 : 0;
    const hl6 = i === 5 && tilt6 > 1;
    s += `<rect x="${f1(hx - 8.5)}" y="${top}" width="17" height="${bot - top}" rx="8" fill="${hl6 ? '#c9b6ff' : col}" fill-opacity=".55" stroke="${hl6 ? '#e4dbff' : col}" stroke-width="2.5" transform="rotate(${f1(rot)} ${f1(hx)} ${top})"/>`;
  }
  s += `<path d="M${x - 63},${top} q-10,-26 6,-44" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M${x + 63},${bot} q14,20 2,44" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return `<g opacity="${f1(op)}">${s}</g>`;
}
/* EGFR-monomeer: ectodomein boven, één TM-helix, kinasedomein onder */
export function egfr(x, y, h = 64, op = 1, pN = 0) {
  if (op <= .01) return '';
  let s = `<path d="M${f1(x - 6)},${y - 2} C${f1(x - 30)},${y - 20} ${f1(x - 34)},${y - 70} ${f1(x - 10)},${y - 82} C${f1(x + 14)},${y - 92} ${f1(x + 30)},${y - 60} ${f1(x + 22)},${y - 34} C${f1(x + 16)},${y - 14} ${f1(x + 8)},${y - 6} ${f1(x + 5)},${y - 2}Z" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>`;
  s += `<rect x="${f1(x - 5)}" y="${y - 4}" width="10" height="${h + 8}" rx="4" fill="${C.prot}"/>`;
  s += `<ellipse cx="${f1(x)}" cy="${y + h + 34}" rx="23" ry="30" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>`;
  s += `<path d="M${f1(x)},${y + h + 64} q-6,16 4,30" stroke="${C.prot}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (pN > .01) s += `<g opacity="${f1(pN)}"><circle cx="${f1(x + 4)}" cy="${y + h + 100}" r="13" fill="#ff6b6b" stroke="#fff" stroke-width="1.6"/><text x="${f1(x + 4)}" y="${y + h + 106}" font-size="17" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">P</text></g>`;
  return `<g opacity="${f1(op)}">${s}</g>`;
}
/* glucocorticoïdreceptor: NTD (ongeordend), DBD (2 zinkvingers), LBD; ligand en NLS optioneel */
export function gr(x, y, o = {}) {
  const { op = 1, lig = 0, nls = 0, rot = 0, sc = 1, flip = 1 } = o;
  if (op <= .01) return '';
  let s = `<path d="M-40,0 C-54,-16 -66,10 -80,-2 S-100,-14 -106,4" stroke="${C.prot}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="-42" y="-16" width="30" height="32" rx="9" fill="${C.prot}" fill-opacity=".6" stroke="${C.prot}" stroke-width="3"/>`;
  s += `<circle cx="-33" cy="8" r="4" fill="#cfd6e6"/><circle cx="-21" cy="8" r="4" fill="#cfd6e6"/>`;
  s += `<path d="M-12,0 L4,0" stroke="${C.prot}" stroke-width="5"/>`;
  s += `<g transform="rotate(${f1(-18 * lig)} 30 0)"><ellipse cx="30" cy="0" rx="30" ry="27" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>` +
    `<path d="M44,-24 q16,8 12,26" stroke="${C.prot}" stroke-width="5" fill="none" stroke-linecap="round" transform="rotate(${f1(40 * lig)} 44 -24)"/></g>`;
  if (nls > .01) s += `<g opacity="${f1(nls)}"><rect x="-14" y="-32" width="22" height="16" rx="5" fill="${NLSC}"/></g>`;
  const L = lig > .01 ? cort(30, 2, .6, 1, 0) : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc * flip)} ${f1(sc)}) rotate(${f1(rot)})" opacity="${f1(op)}">${s}${L}</g>`;
}
/* GR op het DNA: DBD op de halve plaats, LBD schuin erboven (side = -1 links, +1 rechts) */
export function grBound(x, side, dy, op = 1, sc = 1) {
  if (op <= .01) return '';
  const y = 0;
  return `<g opacity="${f1(op)}" transform="translate(0 ${f1(dy - 38 * sc)}) translate(${f1(x)} 0) scale(${f1(sc)}) translate(${f1(-x)} 0)">
    <path d="M${x + side * 18},${y - 6} C${x + side * 50},${y - 20} ${x + side * 44},${y - 60} ${x + side * 78},${y - 64} S${x + side * 96},${y - 30} ${x + side * 128},${y - 40}" stroke="${C.prot}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <rect x="${x - 22}" y="${y - 22}" width="44" height="46" rx="12" fill="${C.prot}" fill-opacity=".6" stroke="${C.prot}" stroke-width="3"/>
    <circle cx="${x - 9}" cy="${y + 10}" r="5.5" fill="#cfd6e6"/><circle cx="${x + 9}" cy="${y + 10}" r="5.5" fill="#cfd6e6"/>
    <path d="M${x},${y - 22} L${x + side * 14},${y - 52}" stroke="${C.prot}" stroke-width="6"/>
    <ellipse cx="${x + side * 20}" cy="${y - 92}" rx="44" ry="40" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>
    ${cort(x + side * 20, y - 90, .9, 1)}</g>`;
}
/* Hsp90-dimeer als klem (twee armen) */
export function hsp90(x, y, op = 1, open = 0, sc = 1) {
  if (op <= .01) return '';
  const arm = side => `<path d="M${side * 8},-50 C${side * (40 + 30 * open)},-44 ${side * (48 + 30 * open)},0 ${side * (26 + 20 * open)},46" stroke="${HSPC}" stroke-width="15" fill="none" stroke-linecap="round" opacity=".85"/>` +
    `<circle cx="${side * (10 + 14 * open)}" cy="-54" r="15" fill="${HSPC}" opacity=".9"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}">${arm(-1)}${arm(1)}</g>`;
}
/* kinase/klein eiwit als cirkel met symbool */
export function bead(x, y, r, col, lab = '', op = 1, fs = 18, tcol = '#fff') {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="3"/>` +
    (lab ? `<text x="${f1(x)}" y="${f1(y + fs * .36)}" font-size="${fs}" text-anchor="middle" fill="${tcol}" font-family="Inter" font-weight="700">${lab}</text>` : '') + '</g>';
}
export function cAMP(x, y, op = 1, r = 9, col = GTPC) {
  if (op <= .01) return '';
  const pts = [-90, -18, 54, 126, 198].map(d => `${f1(x + Math.cos(d * Math.PI / 180) * r)},${f1(y + Math.sin(d * Math.PI / 180) * r)}`).join(' ');
  return `<polygon points="${pts}" fill="${col}" opacity="${f1(op)}" stroke="#0a1224" stroke-width="1.5"/>`;
}
/* anker voor een hotspot-label */
export const anchor = (node, x, y, below = false) => `<circle data-anchor="${node}"${below ? ' data-pos="below"' : ''} cx="${f1(x)}" cy="${f1(y)}" r="1.5" fill="none"/>`;
