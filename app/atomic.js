/*
 * Atoomniveau (fase 4): rekent uit echte PDB-coördinaten wat een structuur bij elkaar houdt. Pure functies, geen DOM.
 *  - eiwit: waterstofbruggen in de ruggengraat met het elektrostatische DSSP-criterium (Kabsch & Sander 1983),
 *           helix/blad uit het bruggenpatroon, φ/ψ per residu en Ramachandran-gebieden (benadering van Lovell et al. 2003).
 *  - DNA-dubbelhelix: Watson-Crick-paren (A–T: N6–O4, N1–N3; G–C: O6–N4, N1–N3, N2–O2) met gemeten afstanden.
 * Gebruikt door app/real3d.js. Alleen de eerste eiwitketen wordt geanalyseerd (en niet als ze > MAX_RES residuen heeft).
 */
import { torsion, P } from '../atlas/analyse.js';

export const MAX_RES = 3000;
const AA = new Set(['ALA', 'ARG', 'ASN', 'ASP', 'CYS', 'GLN', 'GLU', 'GLY', 'HIS', 'ILE', 'LEU', 'LYS', 'MET', 'PHE', 'PRO', 'SER', 'THR', 'TRP', 'TYR', 'VAL', 'MSE', 'SEC']);
const DNA = { DA: 'A', DT: 'T', DG: 'G', DC: 'C' };
export const WATER_IONS = ['HOH', 'WAT', 'DOD', 'NA', 'K', 'CL', 'MG', 'CA', 'ZN', 'MN', 'SO4', 'PO4', 'CD', 'CO', 'NI', 'SR', 'BA', 'CS', 'RB', 'LI', 'IOD', 'BR', 'NH4', 'TL', 'HG', 'CU', 'FE'];
const d3 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

/* atomen → residuen per keten, in volgorde van het bestand */
export function residues(atoms) {
  const chains = new Map();
  let last = null;
  for (const a of atoms) {
    const key = `${a.chain}|${a.resi}|${a.icode ?? ''}`;
    if (!last || last.key !== key) {
      if (!chains.has(a.chain)) chains.set(a.chain, []);
      const list = chains.get(a.chain);
      last = list.find(r => r.key === key) ?? null;
      if (!last) { last = { key, chain: a.chain, resi: a.resi, resn: a.resn, at: {} }; list.push(last); }
    }
    if (!last.at[a.atom]) last.at[a.atom] = a;
  }
  return chains;
}

/* wat kan er op atoomniveau getoond worden? */
export function inspect(atoms) {
  const chains = residues(atoms);
  let prot = null, nRes = 0, nAtoms = 0, nNuc = 0, nRna = 0;
  for (const [, list] of chains) {
    nRes += list.length;
    for (const r of list) {
      nAtoms += Object.keys(r.at).length;
      if (DNA[r.resn]) nNuc++;
      else if (['A', 'U', 'G', 'C'].includes(r.resn)) nRna++;
    }
    if (!prot) {
      const aa = list.filter(r => AA.has(r.resn) && r.at.CA);
      if (aa.length >= 20) prot = aa;
    }
  }
  const coarse = nRes > 0 && nAtoms / nRes < 2.5;             // ingekorte kopie: alleen Cα/P-atomen
  const full = prot && prot.filter(r => r.at.N && r.at.C && r.at.O).length >= .8 * prot.length;
  const pairs = coarse ? [] : dnaPairs(chains);
  return {
    coarse, nRna, nNuc,
    prot: !coarse && full && prot.length <= MAX_RES ? prot : null,
    protTooBig: !!(full && prot.length > MAX_RES),
    pairs: pairs.length >= 4 ? pairs : null,
  };
}

/* ================= eiwit ================= */
/* DSSP-energie: E = 0,084 · 332 · (1/rON + 1/rCH − 1/rOH − 1/rCN) kcal/mol; brug als E < −0,5 (Kabsch & Sander 1983) */
const Q = 0.084 * 332, E_MAX = -0.5;
export function hbEnergy(N, H, C, O) {
  return Q * (1 / d3(O, N) + 1 / d3(C, H) - 1 / d3(O, H) - 1 / d3(C, N));
}
/* FAV/ALLOW: rechthoeken die de "general case"-gebieden van Lovell et al. (2003) benaderen (vereenvoudigd) */
export const FAV = [[-180, -45, 100, 180], [-180, -45, -180, -165], [-160, -45, -70, -5], [45, 90, 0, 90]];
export const ALLOW = [[-180, -30, -110, 180], [-180, -30, -180, -150], [30, 130, -40, 110]];
const inR = (R, f, p) => R.some(([a, b, c, d]) => f >= a && f <= b && p >= c && p <= d);
export const region = (f, p) => inR(FAV, f, p) ? 'fav' : inR(ALLOW, f, p) ? 'allow' : 'out';

export function analyseProtein(R) {
  const n = R.length;
  /* ketenbreuk vóór residu i als C(i−1)–N(i) > 2,0 Å (peptidebinding ≈ 1,33 Å) */
  const brk = R.map((r, i) => i === 0 || !R[i - 1].at.C || !r.at.N || d3(R[i - 1].at.C, r.at.N) > 2.0);
  const noBreak = (a, b) => { for (let k = Math.max(a, 0) + 1; k <= Math.min(b, n - 1); k++) if (brk[k]) return false; return true; };
  R.forEach((r, i) => {
    const p = R[i - 1], q = R[i + 1], A = r.at;
    r.i = i; r.ss = 'other'; r.partners = [];
    r.phi = !brk[i] && A.N && A.CA && A.C ? torsion(P(p.at.C), P(A.N), P(A.CA), P(A.C)) : null;
    r.psi = q && !brk[i + 1] && A.N && A.CA && A.C ? torsion(P(A.N), P(A.CA), P(A.C), P(q.at.N)) : null;
    r.kind = r.resn === 'GLY' ? 'gly' : r.resn === 'PRO' ? 'pro' : 'gen';
    r.reg = r.phi != null && r.psi != null && r.kind === 'gen' ? region(r.phi, r.psi) : null;
    /* H-atoom: 1,0 Å van N, tegengesteld aan de C=O-richting van het vorige residu (zoals DSSP) */
    r.H = null;
    if (!brk[i] && A.N && r.resn !== 'PRO' && p.at.C && p.at.O) {
      const v = { x: p.at.C.x - p.at.O.x, y: p.at.C.y - p.at.O.y, z: p.at.C.z - p.at.O.z }, l = Math.hypot(v.x, v.y, v.z);
      r.H = { x: A.N.x + v.x / l, y: A.N.y + v.y / l, z: A.N.z + v.z / l };
    }
  });
  /* per donor (N–H van residu d) de twee beste acceptoren (C=O van residu a) met E < −0,5 kcal/mol */
  const hb = [], H = new Set();
  for (const d of R) {
    if (!d.H) continue;
    const best = [];
    for (const a of R) {
      if (a.i === d.i || a.i === d.i - 1 || !a.at.C || !a.at.O) continue;
      if (d3(a.at.CA, d.at.CA) > 9) continue;
      const E = hbEnergy(d.at.N, d.H, a.at.C, a.at.O);
      if (E < E_MAX) best.push({ a, E });
    }
    best.sort((x, y) => x.E - y.E);
    for (const { a, E } of best.slice(0, 2)) {
      hb.push({ o: a.at.O, n: d.at.N, E, acc: a.i, don: d.i, dON: d3(a.at.O, d.at.N) });
      H.add(a.i + '>' + d.i); a.partners.push(d.i); d.partners.push(a.i);
    }
  }
  const h = (a, d) => H.has(a + '>' + d);                     // Hbond(a, d): C=O van a ··· H–N van d
  /* α-helix: 4-bochten bij i−1 en i → residuen i..i+3 */
  for (let i = 1; i + 4 < n; i++) if (h(i - 1, i + 3) && h(i, i + 4) && noBreak(i - 1, i + 4)) for (let k = i; k <= i + 3; k++) R[k].ss = 'helix';
  /* β-bruggen (DSSP) en ladders: blad = minstens twee opeenvolgende bruggen; losse brug telt als 'rest' */
  const br = new Map();                                        // 'i,j' → 'p' | 'a'
  for (let i = 1; i < n - 1; i++) for (let j = i + 3; j < n - 1; j++) {
    if (!noBreak(i - 1, i + 1) || !noBreak(j - 1, j + 1)) continue;
    const par = (h(i - 1, j) && h(j, i + 1)) || (h(j - 1, i) && h(i, j + 1));
    const anti = (h(i, j) && h(j, i)) || (h(i - 1, j + 1) && h(j - 1, i + 1));
    if (par || anti) br.set(i + ',' + j, par ? 'p' : 'a');
  }
  for (const [k, t] of br) {
    const [i, j] = k.split(',').map(Number);
    const nb = t === 'p' ? [[i + 1, j + 1], [i - 1, j - 1]] : [[i + 1, j - 1], [i - 1, j + 1]];
    if (nb.some(([a, b]) => br.get(a + ',' + b) === t)) for (const r of [R[i], R[j]]) if (r.ss !== 'helix') r.ss = 'sheet';
  }
  const judged = R.filter(r => r.reg), fav = judged.filter(r => r.reg === 'fav').length, allow = judged.filter(r => r.reg === 'allow').length;
  const cnt = k => R.filter(r => r.ss === k).length;
  return {
    res: R, hb, chain: R[0]?.chain,
    nPhiPsi: R.filter(r => r.phi != null && r.psi != null).length,
    nJudged: judged.length, nFav: fav, nAllow: allow,
    nGly: R.filter(r => r.kind === 'gly' && r.phi != null && r.psi != null).length,
    nPro: R.filter(r => r.kind === 'pro' && r.phi != null && r.psi != null).length,
    ss: { helix: cnt('helix'), sheet: cnt('sheet'), other: cnt('other') },
  };
}

/* ================= DNA ================= */
const WC = { AT: [['N6', 'O4'], ['N1', 'N3']], GC: [['O6', 'N4'], ['N1', 'N3'], ['N2', 'O2']] };
export function dnaPairs(chains) {
  const pur = [], pyr = [];
  for (const [, list] of chains) for (const r of list) {
    const b = DNA[r.resn]; if (!b) continue;
    r.base = b;
    if ((b === 'A' || b === 'G') && r.at.N1) pur.push(r);
    if ((b === 'T' || b === 'C') && r.at.N3) pyr.push(r);
  }
  const comp = { A: 'T', G: 'C' }, out = [], used = new Set();
  for (const p of pur) {
    let best = null, bd = 3.4;                                 // centrale brug N1···N3 korter dan 3,4 Å
    for (const y of pyr) if (y.chain !== p.chain && y.base === comp[p.base]) { const d = d3(p.at.N1, y.at.N3); if (d < bd) { bd = d; best = y; } }
    if (!best || used.has(best.key)) continue;
    used.add(best.key);
    const type = p.base === 'A' ? 'AT' : 'GC';
    const bonds = WC[type].map(([pa, ya]) => { const a = p.at[pa], b = best.at[ya]; return { a, b, lbl: `${pa}–${ya}`, d: a && b ? d3(a, b) : NaN }; });
    out.push({ pur: p, pyr: best, type, bonds });
  }
  /* volgorde langs de eerste streng (die van de eerste DNA-keten) */
  const first = [...chains.keys()].find(c => chains.get(c).some(r => DNA[r.resn]));
  const one = x => x.pur.chain === first ? x.pur : x.pyr, two = x => x.pur.chain === first ? x.pyr : x.pur;
  const order = r => chains.get(r.chain).indexOf(r);
  out.sort((a, b) => order(one(a)) - order(one(b)));
  return out.map((x, k) => ({ ...x, k: k + 1, s1: one(x), s2: two(x), name: `${one(x).base}${one(x).resi}–${two(x).base}${two(x).resi}` }));
}

/* ================= oriëntatie ================= */
/* hoofdassen (PCA) van de Cα/P-atomen; geeft een starre draaiing (rechtshandig) terug: langste as → x */
export function principalFrame(atoms) {
  let pts = atoms.filter(a => a.atom === 'CA' || a.atom === 'P' || a.atom === "C4'");
  if (pts.length < 4) pts = atoms;
  const c = { x: 0, y: 0, z: 0 };
  for (const a of pts) { c.x += a.x; c.y += a.y; c.z += a.z; }
  c.x /= pts.length; c.y /= pts.length; c.z /= pts.length;
  const M = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const a of pts) { const v = [a.x - c.x, a.y - c.y, a.z - c.z]; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) M[i][j] += v[i] * v[j]; }
  const { vecs } = jacobi(M);
  const e1 = vecs[0], e2 = vecs[1], e3 = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
  return { c, e: [e1, e2, e3] };
}
export function applyFrame(atoms, { c, e }) {
  for (const a of atoms) {
    const v = [a.x - c.x, a.y - c.y, a.z - c.z];
    a.x = v[0] * e[0][0] + v[1] * e[0][1] + v[2] * e[0][2];
    a.y = v[0] * e[1][0] + v[1] * e[1][1] + v[2] * e[1][2];
    a.z = v[0] * e[2][0] + v[1] * e[2][1] + v[2] * e[2][2];
  }
}
/* eigenvectoren van een symmetrische 3×3-matrix, gesorteerd van grootste naar kleinste eigenwaarde */
function jacobi(A) {
  const a = A.map(r => r.slice()), V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let sweep = 0; sweep < 50; sweep++) {
    let off = 0;
    for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) off += a[p][q] ** 2;
    if (off < 1e-12) break;
    for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) {
      if (Math.abs(a[p][q]) < 1e-15) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      const cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
      for (let k = 0; k < 3; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = cs * x - sn * y; a[k][q] = sn * x + cs * y; }
      for (let k = 0; k < 3; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = cs * x - sn * y; a[q][k] = sn * x + cs * y; }
      for (let k = 0; k < 3; k++) { const x = V[k][p], y = V[k][q]; V[k][p] = cs * x - sn * y; V[k][q] = sn * x + cs * y; }
    }
  }
  const idx = [0, 1, 2].sort((i, j) => a[j][j] - a[i][i]);
  return { vals: idx.map(i => a[i][i]), vecs: idx.map(i => [V[0][i], V[1][i], V[2][i]]) };
}
