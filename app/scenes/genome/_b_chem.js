/*
 * _b_chem.js — 2D-chemie van de nucleobasen (genome deel B).
 * Coördinaten in Å (wiskundige oriëntatie: y omhoog). Ringen als regelmatige veelhoeken (binding 1,4 Å),
 * Kekulé-structuren volgens de standaard tautomeren (amino/keto). Orientatie = Watson–Crick-standaard:
 * purine links, pyrimidine rechts, glycosidische bindingen naar onder (kleine groef), grote groef boven.
 */
import { f1 } from '../../kit.js';

const B = 1.4, EX = 1.28, GLY = 1.47, NH = 1.0;
const rad = d => d * Math.PI / 180;
const pol = (r, a, o = [0, 0]) => [o[0] + r * Math.cos(rad(a)), o[1] + r * Math.sin(rad(a))];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const subv = (a, b) => [a[0] - b[0], a[1] - b[1]];
const len = a => Math.hypot(a[0], a[1]);
const unit = a => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
const ang = a => Math.atan2(a[1], a[0]) * 180 / Math.PI;
export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function pyrimidine(kind) {
  const A = {};
  const ring = { N3: 180, C4: 120, C5: 60, C6: 0, N1: 300, C2: 240 };
  for (const [k, a] of Object.entries(ring)) A[k] = pol(B, a);
  A.O2 = pol(EX, 240, A.C2);
  A["C1'"] = pol(GLY, 300, A.N1);
  const bonds = [['N1', 'C2', 1], ['C2', 'O2', 2], ['C2', 'N3', 1], ['C5', 'C6', 2], ['C6', 'N1', 1], ['N1', "C1'", 1]];
  const H = [];
  if (kind === 'C') {
    A.N4 = pol(EX + .06, 120, A.C4);
    bonds.push(['N3', 'C4', 2], ['C4', 'N4', 1], ['C4', 'C5', 1]);
    H.push(['N4', 180], ['N4', 60]);
  } else {
    A.O4 = pol(EX, 120, A.C4);
    bonds.push(['N3', 'C4', 1], ['C4', 'O4', 2], ['C4', 'C5', 1]);
    H.push(['N3', 180]);
    if (kind === 'T') { A.C7 = pol(1.5, 60, A.C5); bonds.push(['C5', 'C7', 1]); }
  }
  return { kind, pur: false, A, bonds, H, att: 'N1', ring6: ['N1', 'C2', 'N3', 'C4', 'C5', 'C6'], ring5: null };
}
function purine(kind) {
  const A = {};
  const ring = { N1: 0, C6: 60, C5: 120, C4: 180, N3: 240, C2: 300 };
  for (const [k, a] of Object.entries(ring)) A[k] = pol(B, a);
  // vijfring op de binding C4–C5, naar buiten
  const m = [(A.C4[0] + A.C5[0]) / 2, (A.C4[1] + A.C5[1]) / 2], n = unit(m);
  const P5 = add(m, [n[0] * B / (2 * Math.tan(rad(36))), n[1] * B / (2 * Math.tan(rad(36)))]);
  const R5 = B / (2 * Math.sin(rad(36)));
  const a4 = ang(subv(A.C4, P5)), a5 = ang(subv(A.C5, P5));
  let d = a4 - a5; while (d > 180) d -= 360; while (d < -180) d += 360;
  A.N9 = pol(R5, a4 + d, P5); A.C8 = pol(R5, a4 + 2 * d, P5); A.N7 = pol(R5, a4 + 3 * d, P5);
  const g = ang(subv(A.N9, P5));
  A["C1'"] = pol(GLY, g, A.N9);
  const bonds = [['N3', 'C4', 1], ['C4', 'C5', 2], ['C5', 'C6', 1], ['C5', 'N7', 1], ['N7', 'C8', 2], ['C8', 'N9', 1], ['N9', 'C4', 1], ['N9', "C1'", 1]];
  const H = [];
  if (kind === 'A') {
    A.N6 = pol(EX + .06, 60, A.C6);
    bonds.push(['C6', 'N1', 2], ['N1', 'C2', 1], ['C2', 'N3', 2], ['C6', 'N6', 1]);
    H.push(['N6', 0], ['N6', 120]);
  } else {
    A.O6 = pol(EX, 60, A.C6);
    A.N2 = pol(EX + .06, 300, A.C2);
    bonds.push(['C6', 'O6', 2], ['C6', 'N1', 1], ['N1', 'C2', 1], ['C2', 'N2', 1], ['C2', 'N3', 2]);
    H.push(['N1', 0], ['N2', 0], ['N2', 240]);
  }
  return { kind, pur: true, A, bonds, H, att: 'N9', gdir: g, ring6: ['N1', 'C2', 'N3', 'C4', 'C5', 'C6'], ring5: ['C4', 'C5', 'N7', 'C8', 'N9'] };
}
export const BASEDEF = { A: purine('A'), G: purine('G'), C: pyrimidine('C'), T: pyrimidine('T'), U: pyrimidine('U') };

/*
 * Plaats een base: eerst (optioneel) spiegelen rond de glycosidische as (f = cos van de rotatiehoek rond N–C1'),
 * dan draaien (rot, graden) en verschuiven (tx, ty). Geeft atoomposities + H-posities terug.
 */
export function place(def, { tx = 0, ty = 0, rot = 0, f = 1, hbCharge = null } = {}) {
  const o = def.A[def.att], c1 = def.A["C1'"], ax = unit(subv(c1, o)), pp = [-ax[1], ax[0]];
  const cr = Math.cos(rad(rot)), sr = Math.sin(rad(rot));
  const T = p => {
    const r = subv(p, o), a = r[0] * ax[0] + r[1] * ax[1], b = (r[0] * pp[0] + r[1] * pp[1]) * f;
    const q = [o[0] + a * ax[0] + b * pp[0], o[1] + a * ax[1] + b * pp[1]];
    return [q[0] * cr - q[1] * sr + tx, q[0] * sr + q[1] * cr + ty];
  };
  const A = {};
  for (const [k, p] of Object.entries(def.A)) A[k] = T(p);
  const H = def.H.map(([k, a]) => [k, T(pol(NH, a, def.A[k]))]);
  if (hbCharge) H.push(...hbCharge.map(([k, a]) => [k, T(pol(NH, a, def.A[k]))]));
  return { def, A, H, f };
}
/* H-atoom dat aan donor k vastzit en het dichtst bij punt p ligt */
export function hOf(pl, k, p) {
  let best = null, bd = 1e9;
  for (const [kk, h] of pl.H) if (kk === k) { const d = dist(h, p); if (d < bd) { bd = d; best = h; } }
  return best;
}

export const ELCOL = { N: '#8fb3ff', O: '#ff8f8f', H: '#e8edf7', C: '#c9d2e4' };
/*
 * Teken een geplaatste base. v = view { S (px/Å), ox, oy } ; opts: col (ringkleur), op, label (letter in de ring),
 * names (Set of true: atoomnamen tonen), hl (Set: atomen oplichten), sugar (C1' tonen als bolletje), fs (lettergrootte),
 * c1text (false: bolletje zonder "C1'"-tekst), hs (false: geen H-atomen)
 */
export function drawBase(pl, v, o = {}) {
  const { S, ox, oy } = v, X = p => ox + p[0] * S, Y = p => oy - p[1] * S;
  const op = o.op ?? 1; if (op <= .01) return '';
  const fs = o.fs ?? Math.max(12, S * .5), col = o.col ?? '#9cc0ff';
  const def = pl.def, A = pl.A;
  let s = `<g opacity="${f1(op)}">`;
  const poly = ks => ks.map(k => `${f1(X(A[k]))},${f1(Y(A[k]))}`).join(' ');
  s += `<polygon points="${poly(def.ring6)}" fill="${col}" fill-opacity=".28" stroke="none"/>`;
  if (def.ring5) s += `<polygon points="${poly(def.ring5)}" fill="${col}" fill-opacity=".28" stroke="none"/>`;
  const lw = Math.max(2, S * .09);
  const cen = k => { // midden van de ring waartoe de binding hoort (voor de binnenste tweede lijn)
    const r = def.ring5 && def.ring5.includes(k[0]) && def.ring5.includes(k[1]) ? def.ring5 : def.ring6;
    const pts = r.map(x => A[x]); return [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
  };
  const inRing = (a, b) => (def.ring6.includes(a) && def.ring6.includes(b)) || (def.ring5 && def.ring5.includes(a) && def.ring5.includes(b));
  const hideC1 = o.sugar === false;
  for (const [a, b, n] of def.bonds) {
    if (hideC1 && (a === "C1'" || b === "C1'")) continue;
    const pa = A[a], pb = A[b];
    const sh = (k, p) => { // atoomletters niet overlappen
      const el = k[0]; if (el === 'C' && k !== "C1'") return p;
      const d = unit(subv(k === a ? pb : pa, p)); return [p[0] + d[0] * .32, p[1] + d[1] * .32];
    };
    const p1 = sh(a, pa), p2 = sh(b, pb);
    const ln = (u, w) => `<line x1="${f1(X(u))}" y1="${f1(Y(u))}" x2="${f1(X(w))}" y2="${f1(Y(w))}" stroke="#d7def0" stroke-width="${f1(lw)}" stroke-linecap="round"/>`;
    if (n === 2 && !inRing(a, b)) {
      const d = unit(subv(pb, pa)), nn = [-d[1] * .17, d[0] * .17];
      s += ln(add(p1, nn), add(p2, nn)) + ln(subv(p1, nn), subv(p2, nn));
    } else {
      s += ln(p1, p2);
      if (n === 2) {
        const c = cen([a, b]), k = .22;
        let q1 = [p1[0] + (c[0] - p1[0]) * k, p1[1] + (c[1] - p1[1]) * k], q2 = [p2[0] + (c[0] - p2[0]) * k, p2[1] + (c[1] - p2[1]) * k];
        const t = subv(q2, q1); q1 = add(q1, [t[0] * .14, t[1] * .14]); q2 = subv(q2, [t[0] * .14, t[1] * .14]);
        s += ln(q1, q2);
      }
    }
  }
  // H-atomen op donoren
  if (o.hs !== false) for (const [k, h] of pl.H) {
    const p = A[k], d = unit(subv(h, p)), p1 = [p[0] + d[0] * .32, p[1] + d[1] * .32], p2 = [h[0] - d[0] * .22, h[1] - d[1] * .22];
    s += `<line x1="${f1(X(p1))}" y1="${f1(Y(p1))}" x2="${f1(X(p2))}" y2="${f1(Y(p2))}" stroke="#d7def0" stroke-width="${f1(lw * .8)}" stroke-linecap="round"/>`;
    s += `<text x="${f1(X(h))}" y="${f1(Y(h) + fs * .36)}" font-size="${f1(fs * .8)}" text-anchor="middle" fill="${ELCOL.H}" font-family="Inter" font-weight="600">H</text>`;
  }
  // heteroatomen
  for (const [k, p] of Object.entries(A)) {
    if (k === "C1'") continue;
    const el = k[0]; if (el === 'C' && !(o.names === true || o.names?.has?.(k))) { if (k === 'C7') s += `<text x="${f1(X(p))}" y="${f1(Y(p) + fs * .36)}" font-size="${f1(fs * .8)}" text-anchor="middle" fill="${ELCOL.C}" font-family="Inter" font-weight="600">CH₃</text>`; continue; }
    const hl = o.hl?.has?.(k);
    if (el !== 'C') {
      s += `<circle cx="${f1(X(p))}" cy="${f1(Y(p))}" r="${f1(fs * .62)}" fill="#0b1224" stroke="${hl ? '#fff' : 'none'}" stroke-width="2"/>`;
      s += `<text x="${f1(X(p))}" y="${f1(Y(p) + fs * .36)}" font-size="${f1(fs)}" text-anchor="middle" fill="${ELCOL[el]}" font-family="Inter" font-weight="700">${el}</text>`;
    }
    if (o.names === true || o.names?.has?.(k)) {
      const r6 = def.ring6.map(x => A[x]); const c = [r6.reduce((a, q) => a + q[0], 0) / 6, r6.reduce((a, q) => a + q[1], 0) / 6];
      // nummer schuin naast het atoom: weg van bindingen en H-atomen, en niet recht naar buiten (daar lopen de H-bruggen)
      const out = unit(subv(p, c)), rot = (v, g) => [v[0] * Math.cos(rad(g)) - v[1] * Math.sin(rad(g)), v[0] * Math.sin(rad(g)) + v[1] * Math.cos(rad(g))];
      const nb = [...def.bonds.filter(b => b[0] === k || b[1] === k).map(b => A[b[0] === k ? b[1] : b[0]]), ...pl.H.filter(([kk]) => kk === k).map(([, h]) => h)]
        .map(q => unit(subv(q, p)));
      const clear = v => Math.min(...nb.map(e => e[0] * v[0] + e[1] * v[1] >= 1 ? 0 : Math.acos(Math.max(-1, Math.min(1, e[0] * v[0] + e[1] * v[1])))));
      let d = out, best = -1;
      const ringAtom = def.ring6.includes(k) || def.ring5?.includes(k);
      for (const g of ringAtom ? [55, -55, 85, -85, 0] : [0, 55, -55, 85, -85]) { const v = rot(out, g), cl = clear(v); if (cl > best + .01) { best = cl; d = v; } if (cl > rad(50)) break; }
      const q = [p[0] + d[0] * .62, p[1] + d[1] * .62];
      s += `<text x="${f1(X(q))}" y="${f1(Y(q) + fs * .3)}" font-size="${f1(fs * .62)}" text-anchor="middle" fill="#93a0bb" font-family="JetBrains Mono" font-weight="600">${k.replace(/^[A-Z]/, '')}</text>`;
    }
  }
  if (o.letter) {
    const r6 = def.ring6.map(x => A[x]); const c = [r6.reduce((a, q) => a + q[0], 0) / 6, r6.reduce((a, q) => a + q[1], 0) / 6];
    s += `<text x="${f1(X(c))}" y="${f1(Y(c) + fs * .45)}" font-size="${f1(fs * 1.25)}" text-anchor="middle" fill="${col}" font-family="JetBrains Mono" font-weight="700">${o.letter}</text>`;
  }
  if (o.sugar !== false) {
    const p = A["C1'"];
    s += `<circle cx="${f1(X(p))}" cy="${f1(Y(p))}" r="${f1(fs * .55)}" fill="${o.sugarCol ?? '#4f8ff7'}" stroke="#0b1224" stroke-width="2"/>`;
    if (o.c1text !== false) s += `<text x="${f1(X(p))}" y="${f1(Y(p) + fs * .28)}" font-size="${f1(fs * .6)}" text-anchor="middle" fill="#0b1224" font-family="Inter" font-weight="700">C1'</text>`;
  }
  return s + '</g>';
}
/* waterstofbrug: van H (donor) naar acceptor-atoom */
export function hbond(h, acc, v, op = 1, col = '#fff') {
  if (op <= .01 || !h || !acc) return '';
  const { S, ox, oy } = v, d = unit(subv(acc, h));
  const a = [h[0] + d[0] * .3, h[1] + d[1] * .3], b = [acc[0] - d[0] * .38, acc[1] - d[1] * .38];
  return `<line x1="${f1(ox + a[0] * S)}" y1="${f1(oy - a[1] * S)}" x2="${f1(ox + b[0] * S)}" y2="${f1(oy - b[1] * S)}" stroke="${col}" stroke-width="${f1(Math.max(2, S * .08))}" stroke-dasharray="${f1(S * .14)} ${f1(S * .12)}" opacity="${f1(op)}"/>`;
}
/* waterstofbruggen tussen twee geplaatste basen: lijst [donorAtoom, donorBase(0/1), acceptorAtoom] */
export function hbonds(p0, p1, list, v, op = 1) {
  let s = '';
  for (const [d, which, a] of list) {
    const don = which === 0 ? p0 : p1, acc = which === 0 ? p1 : p0;
    s += hbond(hOf(don, d, acc.A[a]), acc.A[a], v, op);
  }
  return s;
}

/*
 * Eenvoudige, deterministische optimalisatie: zoek (tx, ty, rot) zodat de gevraagde atoomafstanden ≈ doel.
 * pairs: [[mijnAtoom, puntVast, doelafstand]]; andere atomen mogen niet te dicht bij `avoid` komen.
 */
export function dock(def, pairs, { f = 1, init = [0, 0, 0], avoid = [], extra = null } = {}) {
  const cost = x => {
    const pl = place(def, { tx: x[0], ty: x[1], rot: x[2], f });
    let c = 0;
    for (const [k, p, d0] of pairs) c += (dist(pl.A[k], p) - d0) ** 2;
    for (const q of avoid) for (const [k, p] of Object.entries(pl.A)) { const d = dist(p, q); if (d < 2.6) c += (2.6 - d) ** 2 * 4; }
    if (extra) c += extra(pl);
    return c;
  };
  let best = init.slice(), bc = cost(best);
  // grof raster over de rotatie, daan coördinaatafdaling
  for (let r = -180; r < 180; r += 10) for (const dx of [-3, 0, 3]) for (const dy of [-3, 0, 3]) {
    const x = [init[0] + dx, init[1] + dy, r], c = cost(x); if (c < bc) { bc = c; best = x; }
  }
  let step = [1, 1, 8];
  for (let it = 0; it < 400; it++) {
    let improved = false;
    for (let i = 0; i < 3; i++) for (const sg of [1, -1]) {
      const x = best.slice(); x[i] += sg * step[i]; const c = cost(x);
      if (c < bc) { bc = c; best = x; improved = true; }
    }
    if (!improved) { step = step.map(s => s * .6); if (step[0] < 1e-4) break; }
  }
  return { tx: best[0], ty: best[1], rot: best[2], f, cost: bc };
}
