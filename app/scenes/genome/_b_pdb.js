import { pdbUrl } from '../../../shared/pdb.js';
/*
 * _b_pdb.js — kleine 2D-weergave van een echte PDB-structuur (atomen als bolletjes, dieptegesorteerd) binnen een SVG-scène.
 * Laadt het PDB-bestand één keer (RCSB), zet de helixas horizontaal (hoofdas van de traagheid) en meet enkele
 * helixparameters rechtstreeks uit de coördinaten.
 */
import { C, BASE, f1 } from '../../kit.js';
import { projector } from './_b_helix.js';

const cache = {};
export function loadPDB(id) {
  if (!cache[id]) cache[id] = fetch(pdbUrl(id, 'pdb')).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).then(parse);
  return cache[id];
}
const BB = new Set(['P', 'OP1', 'OP2', 'O1P', 'O2P', "O5'", "C5'", "C4'", "O4'", "C3'", "O3'", "C2'", "C1'"]);
function parse(txt) {
  const atoms = [];
  for (const l of txt.split('\n')) {
    if (!/^(ATOM|HETATM)/.test(l)) continue;
    const resn = l.slice(17, 20).trim(); if (!/^D[ATGC]$/.test(resn)) continue;
    const alt = l[16]; if (alt !== ' ' && alt !== 'A') continue;
    const name = l.slice(12, 16).trim();
    atoms.push({ chain: l[21], resi: +l.slice(22, 26), resn, name, el: (l.slice(76, 78).trim() || name[0]), p: [+l.slice(30, 38), +l.slice(38, 46), +l.slice(46, 54)] });
  }
  // hoofdas via covariantiematrix (machtsiteratie)
  const n = atoms.length, c = [0, 1, 2].map(k => atoms.reduce((s, a) => s + a.p[k], 0) / n);
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const a of atoms) { const d = [0, 1, 2].map(k => a.p[k] - c[k]); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) M[i][j] += d[i] * d[j]; }
  let v = [1, .3, .2];
  for (let it = 0; it < 100; it++) { const w = [0, 1, 2].map(i => M[i][0] * v[0] + M[i][1] * v[1] + M[i][2] * v[2]); const l = Math.hypot(...w); v = w.map(x => x / l); }
  const chains = [...new Set(atoms.map(a => a.chain))];
  const c1 = (ch, r) => atoms.find(a => a.chain === ch && a.resi === r && a.name === "C1'");
  const rA = [...new Set(atoms.filter(a => a.chain === chains[0]).map(a => a.resi))].sort((a, b) => a - b);
  const rB = [...new Set(atoms.filter(a => a.chain === chains[1]).map(a => a.resi))].sort((a, b) => b - a);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  if (dot(sub(c1(chains[0], rA[rA.length - 1]).p, c1(chains[0], rA[0]).p), v) < 0) v = v.map(x => -x);
  let e1 = cross(v, Math.abs(v[0]) < .9 ? [1, 0, 0] : [0, 1, 0]); const l1 = Math.hypot(...e1); e1 = e1.map(x => x / l1);
  const e2 = cross(v, e1);
  for (const a of atoms) { const d = sub(a.p, c); a.m = [dot(d, e1), dot(d, e2), dot(d, v)]; a.bb = BB.has(a.name); a.s = a.chain === chains[0] ? 1 : 2; }
  // metingen: basenparen = residu i van streng I met het i-de van achter van streng II
  const pairs = rA.map((r, i) => [c1(chains[0], r), c1(chains[1], rB[i])]).filter(p => p[0] && p[1]);
  const yv = pairs.map(([a, b]) => { const d = sub(a.m, b.m); return [d[0], d[1]]; });
  const zs = pairs.map(([a, b]) => (a.m[2] + b.m[2]) / 2);
  const tw = [], rs = [];
  for (let i = 1; i < pairs.length; i++) {
    const a = yv[i - 1], b = yv[i];
    tw.push(Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]) * 180 / Math.PI);
    rs.push(zs[i] - zs[i - 1]);
  }
  const mean = x => x.reduce((s, y) => s + y, 0) / x.length;
  const cc = mean(pairs.map(([a, b]) => Math.hypot(...sub(a.p, b.p))));
  const P = atoms.filter(a => a.name === 'P'), pd = mean(P.map(a => Math.hypot(a.m[0], a.m[1]))) * 2;
  return { atoms, meas: { twist: mean(tw), rise: mean(rs), c1c1: cc, pp: pd, nbp: pairs.length } };
}

const shade = (hex, k) => { const n = parseInt(hex.slice(1), 16), m = x => Math.round(x * (1 - k) + 11 * k); return `rgb(${m(n >> 16)},${m((n >> 8) & 255)},${m(n & 255)})`; };
const RAD = { P: 1.9, O: 1.5, N: 1.55, C: 1.7 };
const BCOL = { DA: BASE.A, DT: BASE.T, DG: BASE.G, DC: BASE.C };
/* teken; v = projectie (zoals projector), o = { hlBackbone, hlBases, op } */
export function drawPDB(mol, v, o = {}) {
  const pr = projector({ zc: 0, ...v });
  const out = [];
  for (const a of mol.atoms) {
    const q = pr(a.m), k = Math.max(0, Math.min(1, (q[2] + 12) / 24)) * .6;
    let col = a.name === 'P' ? '#ff9f43' : a.bb ? (a.s === 1 ? C.dna : C.dna2) : BCOL[a.resn];
    let op = 1;
    if (o.focus === 'bb' && !a.bb) op = .25;
    if (o.focus === 'base' && a.bb) op = .25;
    out.push([q[2], `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1((RAD[a.el] ?? 1.6) * v.S * .78)}" fill="${shade(col, k)}" stroke="#0b1224" stroke-width="1" opacity="${op}"/>`]);
  }
  out.sort((a, b) => b[0] - a[0]);
  return out.map(x => x[1]).join('');
}
