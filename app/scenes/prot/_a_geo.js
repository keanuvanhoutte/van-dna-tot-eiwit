import { pdbUrl } from '../../../shared/pdb.js';
/*
 * Hulpfuncties (agent prot-a): PDB inlezen, torsiehoeken, eenvoudige 3D-projectie naar SVG.
 * Alle coördinaten komen uit echte PDB-bestanden (RCSB); niets is met de hand geplaatst.
 */

/* ---------- PDB-bestanden (gedeelde cache: één download per sessie) ---------- */
const CACHE = {};
export function fetchPDB(id) {
  if (!CACHE[id]) CACHE[id] = fetch(pdbUrl(id, 'pdb')).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); });
  return CACHE[id];
}
/* ATOM/HETATM-regels → atoomlijst (alleen eerste model, alternatieve posities: eerste) */
export function parsePDB(text, { het = false } = {}) {
  const atoms = [];
  for (const ln of text.split('\n')) {
    if (ln.startsWith('ENDMDL')) break;
    const rec = ln.slice(0, 6);
    if (rec !== 'ATOM  ' && !(het && rec === 'HETATM')) continue;
    const alt = ln[16];
    if (alt !== ' ' && alt !== 'A') continue;
    atoms.push({
      name: ln.slice(12, 16).trim(), resn: ln.slice(17, 20).trim(), chain: ln[21], resi: +ln.slice(22, 26),
      x: +ln.slice(30, 38), y: +ln.slice(38, 46), z: +ln.slice(46, 54), el: (ln.slice(76, 78).trim() || ln.slice(12, 14).trim()[0]), het: rec === 'HETATM',
    });
  }
  return atoms;
}
/* residuen per keten met backbone-atomen */
export function residues(atoms) {
  const out = [], idx = {};
  for (const a of atoms) {
    if (a.het) continue;
    const k = a.chain + a.resi;
    if (!(k in idx)) { idx[k] = out.length; out.push({ chain: a.chain, resi: a.resi, resn: a.resn, at: {} }); }
    out[idx[k]].at[a.name] = a;
  }
  return out;
}

/* ---------- vectoren ---------- */
export const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const mul3 = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
export const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const len3 = a => Math.hypot(a[0], a[1], a[2]);
export const norm3 = a => mul3(a, 1 / (len3(a) || 1));
export const P = a => [a.x, a.y, a.z];
export const dist = (a, b) => len3(sub3(P(a), P(b)));

/* torsiehoek (graden) tussen vier punten */
export function dihedral(p0, p1, p2, p3) {
  const b0 = sub3(p0, p1), b1 = norm3(sub3(p2, p1)), b2 = sub3(p3, p2);
  const v = sub3(b0, mul3(b1, dot3(b0, b1))), w = sub3(b2, mul3(b1, dot3(b2, b1)));
  const x = dot3(v, w), y = dot3(cross3(b1, v), w);
  return Math.atan2(y, x) * 180 / Math.PI;
}
/* φ/ψ per residu (enkel als de buren in dezelfde keten aansluiten: C(i−1)–N(i) < 2 Å) */
export function phiPsi(res) {
  const out = [];
  for (let i = 0; i < res.length; i++) {
    const r = res[i], a = r.at, pr = res[i - 1], nx = res[i + 1];
    if (!a.N || !a.CA || !a.C) continue;
    const okP = pr && pr.chain === r.chain && pr.at.C && dist(pr.at.C, a.N) < 2;
    const okN = nx && nx.chain === r.chain && nx.at.N && dist(a.C, nx.at.N) < 2;
    if (!okP || !okN) continue;
    out.push({ chain: r.chain, resi: r.resi, resn: r.resn,
      phi: dihedral(P(pr.at.C), P(a.N), P(a.CA), P(a.C)), psi: dihedral(P(a.N), P(a.CA), P(a.C), P(nx.at.N)) });
  }
  return out;
}
/* amide-H bij benadering (bissectrice, 1,01 Å) — PDB-kristalstructuren bevatten meestal geen H */
export function amideH(prevC, N, CA) {
  const u = norm3(add3(norm3(sub3(P(N), P(prevC))), norm3(sub3(P(N), P(CA)))));
  return add3(P(N), mul3(u, 1.01));
}

/* ---------- rotatie & projectie ---------- */
export function rotY(a) { const c = Math.cos(a), s = Math.sin(a); return [[c, 0, s], [0, 1, 0], [-s, 0, c]]; }
export function rotX(a) { const c = Math.cos(a), s = Math.sin(a); return [[1, 0, 0], [0, c, -s], [0, s, c]]; }
export function rotZ(a) { const c = Math.cos(a), s = Math.sin(a); return [[c, -s, 0], [s, c, 0], [0, 0, 1]]; }
export const mm = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
export const mv = (M, v) => [dot3(M[0], v), dot3(M[1], v), dot3(M[2], v)];
/* rotatiematrix die richting `d` op de x-as (scherm horizontaal) legt en `up` zo goed mogelijk naar boven */
export function frameAlong(d, up = [0, 1, 0]) {
  const ex = norm3(d); let ey = sub3(up, mul3(ex, dot3(up, ex)));
  if (len3(ey) < 1e-3) ey = cross3(ex, [0, 0, 1]);
  ey = norm3(ey); const ez = cross3(ex, ey);
  return [ex, ey, ez];                                  // rijen = nieuwe assen
}
/* hoofdas van een puntenwolk (machtsmethode op de covariantiematrix) */
export function mainAxis(pts) {
  const c = centroid(pts); const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const p of pts) { const d = sub3(p, c); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) M[i][j] += d[i] * d[j]; }
  let v = [1, .3, .2]; for (let k = 0; k < 40; k++) v = norm3(mv(M, v));
  return v;
}
export const centroid = pts => mul3(pts.reduce((s, p) => add3(s, p), [0, 0, 0]), 1 / pts.length);

/* projector: wereld → scherm. M = rotatie, c = centrum (wereld), sc = px per Å, [ox,oy] = schermcentrum, persp = perspectief */
export function projector(M, c, sc, ox, oy, persp = 0.012) {
  return p => { const q = mv(M, sub3(p, c)); const k = 1 / (1 - q[2] * persp); return [ox + q[0] * sc * k, oy - q[1] * sc * k, q[2], k]; };
}
