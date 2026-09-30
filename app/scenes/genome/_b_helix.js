/*
 * _b_helix.js — geïdealiseerde dubbelhelix (A, B, Z) als 3D-puntmodel, geprojecteerd naar SVG (genome deel B).
 *
 * Geometrie per basenpaar in het standaard basenpaar-referentiekader (Olson et al. 2001, J Mol Biol 313:229):
 *   x → grote groef, y → streng I, z = helixas in 5'→3'-richting van streng I (rechtshandig assenstelsel).
 * Parameters zijn afgeleid uit echte kristalstructuren (1BNA = B, 440D = A, 1DCG = Z; zelf gemeten:
 * cilinderfit op de fosforatomen, posities van C1' en P t.o.v. het basenpaar) en afgerond naar handboekwaarden
 * (B: 10,5 bp/winding, 3,38 Å; A: 11 bp/winding, 2,56 Å, basenparen ~5 Å naar de kleine groef en 20° gekanteld;
 *  Z: linkshandig, dinucleotide-herhaling met twist −9° (CpG) en −51° (GpC), gem. 3,7 Å).
 */
import { C, BASE, COMP, f1 } from '../../kit.js';

export const FORMS = {
  B: { twist: [360 / 10.5], rise: [3.38], c1: [2.3, 5.4], disp: 0, incl: 0, pr: 9.3, p: { any: [90, -2.0] } },
  A: { twist: [360 / 11], rise: [2.56], c1: [7.0, 5.0], disp: 5.2, incl: 20, pr: 9.5, p: { any: [64, 3.5] } },
  // Z: streng I = afwisselend C, G. twist na C (CpG) −9°, na G (GpC) −51°; P-posities per base (az, dz)
  Z: { twist: [-9, -51], rise: [4.4, 3.0], c1: [-1.2, 5.2], disp: -1.0, incl: -7, pr: 7.6, p: { C: [78, 1.2], G: [120, -3.3] }, zig: true },
};
const rad = d => d * Math.PI / 180;

/* bouw het model: lijst basenparen met hoogte z en richting ψ (richting van de kleine groef, graden) */
export function buildHelix(form, seq) {
  const F = FORMS[form], n = seq.length, pairs = [];
  let z = 0, psi = 0;
  for (let i = 0; i < n; i++) {
    pairs.push({ i, z, psi, b1: seq[i], b2: COMP[seq[i]] });
    const k = i % F.twist.length;
    psi += F.twist[k]; z += F.rise[k % F.rise.length];
  }
  const L = pairs[n - 1].z;
  // wereldpunten (x, y, z) — azimut a (graden), straal r
  const W = (r, a, zz) => [r * Math.cos(rad(a)), r * Math.sin(rad(a)), zz];
  // punt in basenpaarkader (m = naar kleine groef, y = naar streng I, dz) → wereld
  const PF = (p, m, y, dz = 0) => {
    // kleine groef-richting u = ψ, y-as = ψ − 90°
    const u = [Math.cos(rad(p.psi)), Math.sin(rad(p.psi))], yy = [Math.cos(rad(p.psi - 90)), Math.sin(rad(p.psi - 90))];
    return [m * u[0] + y * yy[0], m * u[1] + y * yy[1], p.z + dz];
  };
  const incl = Math.tan(rad(F.incl));
  for (const p of pairs) {
    const [cm, cy] = F.c1;
    // inclinatie: rotatie rond de x-as kantelt de lange as y → hoogteverschil ±y·tan(incl)
    p.c1a = PF(p, cm, cy, -cy * incl * .6);
    p.c1b = PF(p, cm, -cy, cy * incl * .6);
    p.mid = PF(p, F.disp, 0);
    // fosfaten: streng I (5'-P van nucleotide i), streng II (5'-P van de partner)
    const pa = F.p.any ?? F.p[p.b1], pb = F.p.any ?? F.p[p.b2];
    p.pa = W(F.pr, p.psi - pa[0], p.z + pa[1]);
    p.pb = W(F.pr, p.psi + pb[0], p.z - pb[1]);
  }
  // ruggengraatcurve: A/B glad (helix door de fosforatomen), Z zigzag (P → suiker → P)
  const strand = (s) => {
    const pts = [];
    if (!F.zig) {
      const k = F.twist[0] / F.rise[0], [az, dz] = F.p.any;
      const z0 = -F.rise[0] * .5, z1 = L + F.rise[0] * .5;
      for (let zz = z0; zz <= z1 + 1e-6; zz += F.rise[0] / 5) {
        const a = s === 1 ? k * (zz - dz) - az : k * (zz + dz) + az;
        pts.push(W(F.pr, a, zz));
      }
    } else {
      for (const p of pairs) {
        const P = s === 1 ? p.pa : p.pb, c1 = s === 1 ? p.c1a : p.c1b;
        const sg = [(c1[0] * .45 + P[0] * .55) * 1.08, (c1[1] * .45 + P[1] * .55) * 1.08, (c1[2] + P[2]) / 2 + (s === 1 ? 1 : -1) * .9];
        if (s === 1) pts.push(P, sg); else pts.push(sg, P);
      }
    }
    return pts;
  };
  // suikers: tussen C1' en de ruggengraat
  for (const p of pairs) {
    const sug = (c1, P) => [c1[0] * .55 + P[0] * .45, c1[1] * .55 + P[1] * .45, c1[2] * .6 + P[2] * .4];
    p.sa = sug(p.c1a, p.pa); p.sb = sug(p.c1b, p.pb);
  }
  return { form, F, pairs, n, L, s1: strand(1), s2: strand(2) };
}

/*
 * Projectie. v = { cx, cy, S (px/Å), spin (°, rond de helixas), tilt (°, 0 = zijaanzicht, 90 = van boven),
 *                  rot (° schermrotatie; 90 = as horizontaal, 5'-uiteinde van streng I links), zc (Å, middelpunt) }
 */
export function projector(v) {
  const cs = Math.cos(rad(v.spin ?? 0)), ss = Math.sin(rad(v.spin ?? 0)), ct = Math.cos(rad(v.tilt ?? 0)), st = Math.sin(rad(v.tilt ?? 0));
  const cr = Math.cos(rad(v.rot ?? 0)), sr = Math.sin(rad(v.rot ?? 0)), S = v.S, zc = v.zc ?? 0, pers = v.pers ?? 0;
  return p => {
    const x1 = p[0] * cs - p[1] * ss, y1 = p[0] * ss + p[1] * cs, z1 = p[2] - zc;
    const depth = y1 * ct - z1 * st, up = z1 * ct + y1 * st;
    const k = pers ? 1 / (1 + depth * pers) : 1;
    const X = (x1 * cr + up * sr) * k, V = (-x1 * sr + up * cr) * k;
    return [v.cx + X * S, v.cy - V * S, depth];
  };
}

const shade = (hex, k) => { // k 0..1 donkerder
  const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, m = x => Math.round(x * (1 - k) + 11 * k);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
};

/*
 * Teken het model. o: { bb (0..1 ruggengraat), base (0..1), P (0..1 fosfaatbolletjes), sugar (0..1), letters, hb (0..1),
 *   grooves: { minor: op, major: op }, hl: { strand: 1|2, i } (één nucleotide oplichten), hlPair: i, col1, col2, arrows }
 * Geeft { svg, pr (projector), ends } terug.
 */
export function drawHelix(H, v, o = {}) {
  const pr = projector({ zc: H.L / 2, ...v });
  const S = v.S, items = [];
  const push = (d, s) => items.push([d, s]);
  const dmax = 12, dk = d => Math.max(0, Math.min(1, (d + dmax) / (2 * dmax)));   // 0 = voor, 1 = achter
  const col1 = o.col1 ?? C.dna, col2 = o.col2 ?? C.dna2;
  const bbw = (o.bbw ?? 1.7) * S, bop = o.bb ?? 1;
  // groeven: aan de voorkant, tussen twee opeenvolgende strengdoorgangen door het vlak van de as (enkel zijaanzicht)
  if (o.grooves && Math.abs(v.tilt ?? 0) < 1) {
    const cr = [], rr = rad(v.rot ?? 0), sn = Math.sin(rr), cs = Math.cos(rr);
    const off = q => (q[0] - v.cx) * cs + (q[1] - v.cy) * sn;       // afstand loodrecht op de as (px)
    const along = q => (q[0] - v.cx) * sn - (q[1] - v.cy) * cs;     // positie langs de as (px)
    for (const [pts, sid] of [[H.s1, 1], [H.s2, 2]]) {
      const P = pts.map(pr);
      for (let j = 1; j < P.length; j++) {
        const a = P[j - 1], b = P[j], oa = off(a), ob = off(b);
        if (oa * ob <= 0 && a[2] + b[2] < 0 && oa !== ob) {
          const t = oa / (oa - ob), q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
          cr.push({ s: along(q), q, d: [b[0] - a[0], b[1] - a[1]], do: ob - oa, sid });
        }
      }
    }
    cr.sort((x, y) => x.s - y.s);
    const hh = H.F.pr * S * (o.grooveH ?? .6);
    const at = (c, h) => { const k = h / (c.do || 1); return [c.q[0] + c.d[0] * k, c.q[1] + c.d[1] * k]; };
    for (let j = 1; j < cr.length; j++) {
      const c0 = cr[j - 1], c1 = cr[j]; if (c0.sid === c1.sid) continue;
      const w = Math.abs(c1.s - c0.s) / S;                       // groefbreedte langs de as (Å)
      const key = w < (360 / Math.abs(H.F.twist[0])) * H.F.rise[0] / 2 ? 'minor' : 'major';
      const op = o.grooves[key] ?? 0; if (op <= .01) continue;
      const col = key === 'minor' ? '#ffc247' : '#7fdc6a';
      const pts2 = [at(c0, -hh), at(c1, -hh), at(c1, hh), at(c0, hh)];
      push(-.5, `<polygon points="${pts2.map(q => f1(q[0]) + ',' + f1(q[1])).join(' ')}" fill="${col}" fill-opacity="${f1(op * .35)}" stroke="${col}" stroke-opacity="${f1(op * .8)}" stroke-width="2" stroke-dasharray="6 5"/>`);
    }
  }
  // ruggengraat
  const strandSvg = (pts, col, sid) => {
    if (bop <= .01) return;
    for (let j = 1; j < pts.length; j++) {
      if (o.zMax != null && pts[j][2] > o.zMax + 2) break;
      const a = pr(pts[j - 1]), b = pr(pts[j]), d = (a[2] + b[2]) / 2;
      push(d, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${shade(col, dk(d) * .6)}" stroke-width="${f1(bbw)}" stroke-linecap="round" opacity="${f1(bop)}"/>`);
    }
  };
  strandSvg(H.s1, col1, 1); strandSvg(H.s2, col2, 2);
  // basen, suikers, fosfaten
  const bop2 = o.base ?? 1, pop = o.P ?? 1, sop = o.sugar ?? 1;
  const bw = (o.bw ?? 1.25) * S;
  for (const p of H.pairs) {
    if (o.zMax != null && p.z > o.zMax + .01) continue;
    const ca = pr(p.c1a), cb = pr(p.c1b), m = pr(p.mid);
    const hlP = o.hlPair === p.i;
    if (bop2 > .01) {
      const da = (ca[2] + m[2]) / 2, db = (cb[2] + m[2]) / 2;
      const opA = bop2 * (o.hl && !(o.hl.strand === 1 && o.hl.i === p.i) ? (o.hlDim ?? 1) : 1);
      const opB = bop2 * (o.hl && !(o.hl.strand === 2 && o.hl.i === p.i) ? (o.hlDim ?? 1) : 1);
      push(da, `<line x1="${f1(ca[0])}" y1="${f1(ca[1])}" x2="${f1(m[0])}" y2="${f1(m[1])}" stroke="${shade(BASE[p.b1], dk(da) * .55)}" stroke-width="${f1(bw)}" stroke-linecap="butt" opacity="${f1(opA)}"/>`);
      push(db, `<line x1="${f1(m[0])}" y1="${f1(m[1])}" x2="${f1(cb[0])}" y2="${f1(cb[1])}" stroke="${shade(BASE[p.b2], dk(db) * .55)}" stroke-width="${f1(bw)}" stroke-linecap="butt" opacity="${f1(opB)}"/>`);
      if (hlP) push(Math.min(da, db) - .01, `<line x1="${f1(ca[0])}" y1="${f1(ca[1])}" x2="${f1(cb[0])}" y2="${f1(cb[1])}" stroke="#fff" stroke-width="${f1(bw + 6)}" stroke-opacity=".25" stroke-linecap="round"/>`);
      if ((o.hb ?? 0) > .01) {
        const nb = p.b1 === 'G' || p.b1 === 'C' ? 3 : 2;
        // korte streepjes loodrecht op het paar, in het midden
        const dx = cb[0] - ca[0], dy = cb[1] - ca[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l;
        for (let h = 0; h < nb; h++) {
          const off = (h - (nb - 1) / 2) * bw * .45, cx = m[0] + nx * off, cy = m[1] + ny * off;
          push(m[2] - .02, `<line x1="${f1(cx - dx / l * 5)}" y1="${f1(cy - dy / l * 5)}" x2="${f1(cx + dx / l * 5)}" y2="${f1(cy + dy / l * 5)}" stroke="#fff" stroke-width="2" opacity="${f1(o.hb * (1 - dk(m[2]) * .7))}"/>`);
        }
      }
      if (o.letters && l2(ca, cb) > bw * 2.2) {
        const fs = Math.max(11, Math.min(bw * .95, 22));
        const la = [(ca[0] * .45 + m[0] * .55), (ca[1] * .45 + m[1] * .55)], lb = [(cb[0] * .45 + m[0] * .55), (cb[1] * .45 + m[1] * .55)];
        if (da < 4) push(da - .01, `<text x="${f1(la[0])}" y="${f1(la[1] + fs * .36)}" font-size="${f1(fs)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="800" opacity="${f1(opA * o.letters)}">${p.b1}</text>`);
        if (db < 4) push(db - .01, `<text x="${f1(lb[0])}" y="${f1(lb[1] + fs * .36)}" font-size="${f1(fs)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="800" opacity="${f1(opB * o.letters)}">${p.b2}</text>`);
      }
    }
    for (const [sg, c1, P, col, sid] of [[p.sa, p.c1a, p.pa, col1, 1], [p.sb, p.c1b, p.pb, col2, 2]]) {
      const hl = o.hl && o.hl.strand === sid && o.hl.i === p.i;
      const dim = o.hl && !hl ? (o.hlDim ?? 1) : 1;
      if (sop > .01) {
        const q = pr(sg), c = pr(c1);
        push(q[2] - .05, `<line x1="${f1(c[0])}" y1="${f1(c[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${shade('#c9a574', dk(q[2]) * .5)}" stroke-width="${f1(S * .5)}" opacity="${f1(sop * dim)}"/>`);
        push(q[2] - .1, `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(S * .95)}" fill="${shade('#c9a574', dk(q[2]) * .55)}" stroke="#0b1224" stroke-width="1.5" opacity="${f1(sop * dim)}"/>`);
      }
      if (pop > .01) {
        const q = pr(P);
        push(q[2] - .2, `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(S * 1.25)}" fill="${shade('#ff9f43', dk(q[2]) * .55)}" stroke="#0b1224" stroke-width="1.5" opacity="${f1(pop * dim)}"/>`);
      }
      if (hl) {
        const q = pr(sg);
        push(-99, `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(S * 3.2)}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="6 5"/>`);
      }
    }
  }
  items.sort((a, b) => b[0] - a[0]);
  const ends = {
    s1_5: pr(H.s1[0]), s1_3: pr(H.s1[H.s1.length - 1]), s2_3: pr(H.s2[0]), s2_5: pr(H.s2[H.s2.length - 1]),
  };
  return { svg: items.map(x => x[1]).join(''), pr, ends };
}
const l2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/* groefpunt aan de voorkant: zoek z waar het groefmidden naar de kijker wijst (voor labels) */
export function grooveFront(H, v, which = 'minor', zmin = 0, zmax = null) {
  const pr = projector({ zc: H.L / 2, ...v }), F = H.F, k = F.twist[0] / F.rise[0], off = which === 'minor' ? 0 : 180;
  let best = null;
  for (let zz = zmin; zz <= (zmax ?? H.L); zz += .25) {
    const a = k * zz + off, q = pr([F.pr * Math.cos(rad(a)), F.pr * Math.sin(rad(a)), zz]);
    if (!best || q[2] < best[2]) best = q;
  }
  return best;
}
