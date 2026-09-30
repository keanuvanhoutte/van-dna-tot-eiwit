/*
 * Structuuranalyse op echte PDB-coördinaten (uitbreiding van poc/02-dna-vormen).
 *  - classificatie van atomen: nucleotide / eiwit / ion / ligand / water & additieven
 *  - per nucleotide: suikerpuckering (pseudorotatiefase P) en glycosidische hoek χ (syn/anti)
 *  - waterstofbruggen tussen basen (N/O, 2,6–3,3 Å), met ruimtelijk rooster (ook voor ribosomen)
 *  - helixparameters (enkel voor dubbelhelices): cilinderfit-as, twist per basenpaar over
 *    volledige dinucleotiden, stijging, diameter  (identiek aan de goedgekeurde POC)
 *  - extra's: G-kwartetten, C·C⁺-paren (i-motief), Hoogsteen-paren van een derde streng,
 *    ioncoördinatie door O6 (quadruplex)
 */

/* ---------- kleine vectorbibliotheek ---------- */
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
export const P = a => [a.x, a.y, a.z];
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : NaN;

export function torsion(a, b, c, d) {
  const b0 = sub(a, b), b1 = norm(sub(c, b)), b2 = sub(d, c);
  const v = sub(b0, b1.map(x => x * dot(b0, b1))), w = sub(b2, b1.map(x => x * dot(b2, b1)));
  return Math.atan2(dot(cross(b1, v), w), dot(v, w)) * 180 / Math.PI;
}

/* deterministische toevalsgenerator: dezelfde structuur geeft altijd dezelfde getallen */
function rng(seed = 12345) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

/* ---------- residutypes ---------- */
export const STD_NT = new Set(['A', 'C', 'G', 'U', 'DA', 'DC', 'DG', 'DT', 'DU', 'I', 'DI']);
const AA = new Set('ALA ARG ASN ASP CYS GLN GLU GLY HIS ILE LEU LYS MET PHE PRO SER THR TRP TYR VAL MSE SEC PYL HYP SEP TPO PTR MLY'.split(' '));
const WATER = new Set(['HOH', 'WAT', 'DOD', 'H2O']);
const IONS = new Set(['K', 'NA', 'MG', 'MN', 'CA', 'ZN', 'CL', 'SR', 'BA', 'CS', 'RB', 'CO', 'NI', 'CD', 'TL', 'LI', 'IOD', 'BR', 'CU', 'FE', 'HG', 'NH4']);
/* kristallisatie-additieven en buffercomponenten: samen met water verborgen */
const ADDITIVE = new Set(['GOL', 'EDO', 'SO4', 'PO4', 'ACT', 'MPD', 'PEG', 'PG4', 'PGE', '1PE', 'IPH', 'TRS', 'EPE', 'MES', 'CAC', 'FMT', 'DMS', 'BME', 'SPM', 'SPK', 'NO3', 'ACY', 'MRD', 'IPA', 'EOH', 'MOH', 'CIT', 'TAR', 'P6G', 'BU3', 'NCO', 'HEZ', 'UNX', 'UNL', 'UNK']);

/* liganden met suikerachtige atoomnamen (C1', O4' …) die geen nucleotide zijn */
const NOT_NT = new Set(['DM1', 'DM2', 'DM5', 'DM6', 'NT', 'CPT', 'ADE', 'HPA', 'GUN', 'SAM', 'SAH', 'FMN', 'TPP']);

/* gemodificeerde nucleotiden → stamletter (voor 'kleur per base') */
const MOD_PARENT = {
  PSU: 'U', H2U: 'U', '5MU': 'U', '4SU': 'U', BRU: 'U', '5BU': 'U', OMU: 'U', UR3: 'U', '70U': 'U', UMS: 'U',
  '5MC': 'C', '5CM': 'C', OMC: 'C', CBR: 'C', C5M: 'C', CCC: 'C', '4OC': 'C', M5M: 'C',
  OMG: 'G', '2MG': 'G', M2G: 'G', '7MG': 'G', YYG: 'G', '1MG': 'G', GTP: 'G', G7M: 'G', GDP: 'G', '6OG': 'G', '8OG': 'G',
  '1MA': 'A', MIA: 'A', '6MA': 'A', T6A: 'A', A2M: 'A', MA6: 'A', '2MA': 'A', ATP: 'A',
};
export function parentBase(resn) {
  if (MOD_PARENT[resn]) return MOD_PARENT[resn];
  const r = resn.replace(/^D/, '');
  return 'ACGTU'.includes(r) && r.length === 1 ? r : null;
}

/* ligandnamen die we herkennen */
export const LIGNAME = {
  NT: { nl: 'netropsine', en: 'netropsin' }, DM1: { nl: 'daunomycine', en: 'daunomycin' }, DM2: { nl: 'doxorubicine', en: 'doxorubicin' },
  CPT: { nl: 'cisplatine (Pt(NH₃)₂)', en: 'cisplatin (Pt(NH₃)₂)' }, ADE: { nl: 'adenine', en: 'adenine' }, HPA: { nl: 'hypoxanthine', en: 'hypoxanthine' },
  IPH: { nl: 'fenol', en: 'phenol' },
};
export const IONLABEL = { K: 'K⁺', NA: 'Na⁺', MG: 'Mg²⁺', MN: 'Mn²⁺', CA: 'Ca²⁺', ZN: 'Zn²⁺', CL: 'Cl⁻', SR: 'Sr²⁺', BA: 'Ba²⁺', CS: 'Cs⁺', RB: 'Rb⁺', CO: 'Co²⁺', NI: 'Ni²⁺', CD: 'Cd²⁺', TL: 'Tl⁺', LI: 'Li⁺', IOD: 'I⁻', BR: 'Br⁻', CU: 'Cu²⁺', FE: 'Fe', HG: 'Hg²⁺', NH4: 'NH₄⁺' };

/* ---------- PDB-tekst voorbereiden ----------
 * - eerste model (NMR) of alle modellen samengevoegd (biologische assemblage, ketens hernoemd)
 * - geen waterstofatomen, geen alternatieve posities B, eventueel enkel bepaalde ketens */
export function preparePdb(txt, { assembly = false, keep = null } = {}) {
  const lines = txt.split(/\r?\n/);
  const out = [], serials = new Set();
  let model = 0, seenModel = false;
  const used = new Set(), rename = new Map();
  if (assembly) for (const l of lines) if (/^(ATOM|HETATM)/.test(l)) used.add(l[21]);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let serial = 0;
  for (const l of lines) {
    if (l.startsWith('MODEL')) { model++; seenModel = true; continue; }
    if (l.startsWith('ENDMDL')) { if (!assembly) break; continue; }
    if (l.startsWith('ANISOU') || l.startsWith('MASTER')) continue;
    if (/^(ATOM|HETATM)/.test(l)) {
      if (!(l[16] === ' ' || l[16] === 'A')) continue;
      const el = (l.slice(76, 78).trim() || l.slice(12, 14).trim().replace(/\d/g, '')).toUpperCase();
      if (el === 'H' || el === 'D') continue;
      let ch = l[21];
      if (keep && !keep.includes(ch)) continue;
      let s = l;
      if (assembly && model > 1) {
        const k = model + ':' + ch;
        if (!rename.has(k)) { const free = [...letters].find(c => !used.has(c)); used.add(free); rename.set(k, free); }
        ch = rename.get(k);
        s = s.slice(0, 21) + ch + s.slice(22);
      }
      if (assembly) { serial++; s = s.slice(0, 6) + String(serial).padStart(5) + s.slice(11); }
      else serials.add(+l.slice(6, 11));
      s = s.slice(0, 16) + ' ' + s.slice(17);  // altloc wissen
      out.push(s);
    } else if (l.startsWith('CONECT')) {
      if (assembly) continue;
      const ids = [6, 11, 16, 21, 26].map(i => l.slice(i, i + 5).trim()).filter(Boolean).map(Number);
      if (ids.every(i => serials.has(i))) out.push(l);
    } else if (/^(TER|HEADER|CRYST1|END)/.test(l)) out.push(l);
  }
  return out.join('\n');
}

/* ---------- atomen classificeren (na addModel) ---------- */
export function classify(atoms) {
  const res = new Map();
  for (const a of atoms) {
    const k = a.chain + '|' + a.resi + '|' + a.resn;
    if (!res.has(k)) res.set(k, { key: k, chain: a.chain, resi: a.resi, resn: a.resn, at: {}, list: [] });
    const r = res.get(k); r.at[a.atom] = a; r.list.push(a);
  }
  for (const r of res.values()) {
    const at = r.at, n = r.list.length;
    let kind;
    if (WATER.has(r.resn)) kind = 'water';
    else if (ADDITIVE.has(r.resn)) kind = 'water';
    else if (n <= 1 && IONS.has(r.resn)) kind = 'ion';
    else if (NOT_NT.has(r.resn)) kind = 'lig';
    else if (STD_NT.has(r.resn) && !r.list[0].hetflag && n >= 3) kind = 'na';
    else if (at["C1'"] && at["C2'"] && at["C3'"] && at["O4'"] && (at.P || at["O3'"] || at["O5'"]) && (at.N9 || at.N1 || (r.resn === 'PSU' && at.C5))) kind = 'na';
    else if (AA.has(r.resn) || (at.CA && at.N && at.C && !r.list[0].hetflag)) kind = 'prot';
    else kind = 'lig';
    r.kind = kind;
    for (const a of r.list) { a.kind = kind; a.rkey = r.key; }
  }
  // ketentype: DNA of RNA (meerderheid van nucleotiden met O2')
  const chainType = {};
  const tally = {};
  for (const r of res.values()) {
    if (r.kind === 'na') { const t = tally[r.chain] ??= { rna: 0, dna: 0 }; r.at["O2'"] ? t.rna++ : t.dna++; }
    if (r.kind === 'prot') chainType[r.chain] = 'prot';
  }
  for (const [c, t] of Object.entries(tally)) chainType[c] = t.rna > t.dna ? 'rna' : 'dna';
  for (const r of res.values()) { r.ctype = chainType[r.chain]; for (const a of r.list) a.ctype = r.kind === 'na' || r.kind === 'prot' ? chainType[r.chain] : r.kind; }
  return { res, chainType };
}

/* ---------- ruimtelijk rooster voor snelle burenzoektocht ---------- */
function grid(list, cell) {
  const g = new Map();
  const key = (x, y, z) => x + ',' + y + ',' + z;
  for (const a of list) { const k = key(Math.floor(a.x / cell), Math.floor(a.y / cell), Math.floor(a.z / cell)); if (!g.has(k)) g.set(k, []); g.get(k).push(a); }
  return (a, fn) => {
    const cx = Math.floor(a.x / cell), cy = Math.floor(a.y / cell), cz = Math.floor(a.z / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const l = g.get(key(cx + dx, cy + dy, cz + dz)); if (l) for (const b of l) fn(b);
    }
  };
}

const BACKBONE = new Set(['P', 'OP1', 'OP2', 'OP3', 'O1P', 'O2P', 'O3P', "O3'", "O5'", "O4'", "O2'"]);

/* ---------- helixas: cilinderfit op fosforatomen (zoals de POC) ---------- */
function perp(v) { const e1 = norm(cross(v, Math.abs(v[0]) < .9 ? [1, 0, 0] : [0, 1, 0])); return [e1, cross(v, e1)]; }
function circleFit(pts, v) {
  const [e1, e2] = perp(v);
  const uv = pts.map(p => [dot(p, e1), dot(p, e2)]);
  const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], b = [0, 0, 0];
  for (const [u, w] of uv) { const r = [u, w, 1], y = -(u * u + w * w); for (let i = 0; i < 3; i++) { b[i] += r[i] * y; for (let j = 0; j < 3; j++) A[i][j] += r[i] * r[j]; } }
  const det = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  const d0 = det(A), sol = [0, 1, 2].map(k => det(A.map((row, i) => row.map((x, j) => j === k ? b[i] : x))) / d0);
  const cu = -sol[0] / 2, cw = -sol[1] / 2, r = Math.sqrt(cu * cu + cw * cw - sol[2]);
  const err = uv.reduce((s, [u, w]) => s + (Math.hypot(u - cu, w - cw) - r) ** 2, 0);
  const zc = pts.reduce((s, p) => s + dot(p, v), 0) / pts.length;
  return { err, r, c: [0, 1, 2].map(i => cu * e1[i] + cw * e2[i] + zc * v[i]) };
}
function helixAxis(pts) {
  let best = null;
  const rnd = rng(4242);
  const tryDir = v => { v = norm(v); if (v[2] < 0) v = v.map(x => -x); const f = circleFit(pts, v); if (f.r && (!best || f.err < best.err)) best = { ...f, v }; };
  for (let i = 0; i < 3000; i++) {
    const z = i / 3000, t = Math.PI * (3 - Math.sqrt(5)) * i, s = Math.sqrt(1 - z * z);
    tryDir([s * Math.cos(t), s * Math.sin(t), z]);
  }
  for (const spread of [.06, .015, .004]) {
    const v0 = best.v, [a, b] = perp(v0);
    for (let i = 0; i < 600; i++) { const r = spread * Math.sqrt(rnd()), t = rnd() * 2 * Math.PI; tryDir([0, 1, 2].map(k => v0[k] + r * (Math.cos(t) * a[k] + Math.sin(t) * b[k]))); }
  }
  return best;
}

/* hoofdassen (voor oriëntatie van niet-helicale structuren) — Jacobi-eigenwaarden */
function principal(pts) {
  const c = [0, 1, 2].map(i => mean(pts.map(p => p[i])));
  const C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  for (const p of pts) { const d = sub(p, c); for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) C[i][j] += d[i] * d[j]; }
  const V = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], A = C.map(r => r.slice());
  for (let sweep = 0; sweep < 30; sweep++) for (let p = 0; p < 2; p++) for (let q = p + 1; q < 3; q++) {
    if (Math.abs(A[p][q]) < 1e-9) continue;
    const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
    const cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
    for (let k = 0; k < 3; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = cs * akp - sn * akq; A[k][q] = sn * akp + cs * akq; }
    for (let k = 0; k < 3; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = cs * apk - sn * aqk; A[q][k] = sn * apk + cs * aqk; }
    for (let k = 0; k < 3; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = cs * vkp - sn * vkq; V[k][q] = sn * vkp + cs * vkq; }
  }
  const ev = [0, 1, 2].map(i => ({ val: A[i][i], vec: [V[0][i], V[1][i], V[2][i]] })).sort((a, b) => b.val - a.val);
  return { c, axes: ev.map(e => e.vec) };
}

/* ---------- hoofdanalyse ---------- */
export function analyse(atoms, entry) {
  const { res, chainType } = classify(atoms);
  const nts = [...res.values()].filter(r => r.kind === 'na');
  const prots = [...res.values()].filter(r => r.kind === 'prot');
  const out = { chainType, nts: nts.length, prot: prots.length, heavy: atoms.length };

  /* per nucleotide: puckering en χ */
  let north = 0, south = 0, other = 0, syn = 0, anti = 0, border = 0;
  const synRes = [], puck = {}; const mods = {};
  for (const r of nts) {
    const g = k => r.at[k] && P(r.at[k]);
    if (!STD_NT.has(r.resn)) mods[r.resn] = (mods[r.resn] ?? 0) + 1;
    const n = [["C4'", "O4'", "C1'", "C2'"], ["O4'", "C1'", "C2'", "C3'"], ["C1'", "C2'", "C3'", "C4'"], ["C2'", "C3'", "C4'", "O4'"], ["C3'", "C4'", "O4'", "C1'"]];
    const pc = puck[r.ctype] ??= { n: 0, s: 0, o: 0 };
    if (n.flat().every(k => r.at[k])) {
      const [v0, v1, v2, v3, v4] = n.map(q => torsion(...q.map(g)));
      let ph = Math.atan2(v4 + v1 - v3 - v0, 2 * v2 * (Math.sin(36 * Math.PI / 180) + Math.sin(72 * Math.PI / 180))) * 180 / Math.PI;
      ph = (ph + 360) % 360;
      if (ph < 90 || ph > 324) { north++; pc.n++; } else if (ph >= 108 && ph <= 216) { south++; pc.s++; } else { other++; pc.o++; }
    }
    let q;
    if (r.resn === 'PSU') q = ["O4'", "C1'", 'C5', 'C4'];            // pseudouridine: C-glycoside
    else if (r.at.N9 && r.at.C4 && r.at.C8) q = ["O4'", "C1'", 'N9', 'C4'];
    else if (r.at.N1 && r.at.C2) q = ["O4'", "C1'", 'N1', 'C2'];
    if (q && q.every(k => r.at[k])) {
      const chi = torsion(...q.map(g));
      // syn: −45° < χ < +90°; hoog-anti: −90° … −45°; anti: overige (IUPAC-sectoren, met hoog-anti apart)
      if (chi > -45 && chi < 90) { syn++; synRes.push({ chain: r.chain, resi: r.resi, resn: r.resn }); }
      else if (chi >= -90 && chi <= -45) border++;
      else anti++;
    }
  }
  Object.assign(out, { north, south, other, syn, anti, border, synRes, puck, mods });

  /* waterstofbruggen tussen basen (alle nucleotiden) */
  const polar = atoms.filter(a => a.kind === 'na' && (a.elem === 'N' || a.elem === 'O') && !BACKBONE.has(a.atom));
  const near = grid(polar, 3.4);
  const hbonds = [];
  for (const a of polar) near(a, b => {
    if (b.index <= a.index || b.rkey === a.rkey) return;
    if (a.chain === b.chain && Math.abs(a.resi - b.resi) === 1) {
      // opeenvolgende nucleotiden: vrijwel altijd stapeling, geen paring
      return;
    }
    const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    if (d >= 2.6 && d <= 3.3) hbonds.push([a, b, d]);
  });
  out.hbonds = hbonds;
  const pairCnt = new Map();
  for (const [a, b] of hbonds) { const k = a.rkey < b.rkey ? a.rkey + '#' + b.rkey : b.rkey + '#' + a.rkey; pairCnt.set(k, (pairCnt.get(k) ?? 0) + 1); }
  out.pairs = [...pairCnt.values()].filter(n => n >= 2).length;

  /* ionen en liganden */
  const ions = {}, ligs = {};
  for (const r of res.values()) {
    if (r.kind === 'ion') ions[r.resn] = (ions[r.resn] ?? 0) + 1;
    if (r.kind === 'lig') ligs[r.resn] = (ligs[r.resn] ?? 0) + 1;
  }
  out.ions = ions; out.ligs = ligs;

  /* extra: G-kwartetten (cycli van 4 guanines verbonden door ≥1 H-brug) */
  if (entry.cls.includes('quad')) {
    const gs = nts.filter(r => parentBase(r.resn) === 'G').map(r => r.key);
    const nb = new Map(gs.map(k => [k, new Set()]));
    for (const [a, b] of hbonds) if (nb.has(a.rkey) && nb.has(b.rkey)) { nb.get(a.rkey).add(b.rkey); nb.get(b.rkey).add(a.rkey); }
    const quartets = new Set();
    for (const a of gs) for (const b of nb.get(a)) for (const c of nb.get(b)) { if (c === a) continue; for (const d of nb.get(c)) { if (d === a || d === b) continue; if (nb.get(d).has(a)) quartets.add([a, b, c, d].sort().join()); } }
    out.quartets = quartets.size;
    // C·C⁺-paren (i-motief): N3–N3 ≈ 2,8 Å
    const cs = nts.filter(r => parentBase(r.resn) === 'C' && r.at.N3);
    let cc = 0;
    const dd = (a, b) => a && b ? Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) : 99;
    for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
      const A = cs[i].at, B = cs[j].at;
      // hemigeprotoneerd C·C⁺-paar: N3–N3 plus minstens één N4–O2-brug (sluit gestapelde buren uit)
      if (dd(A.N3, B.N3) < 3.2 && (dd(A.N4, B.O2) < 3.3 || dd(A.O2, B.N4) < 3.3)) cc++;
    }
    out.ccpairs = cc;
    // ioncoördinatie door O6 van guanines
    const o6 = atoms.filter(a => a.atom === 'O6' && a.kind === 'na');
    out.ionCoord = atoms.filter(a => a.kind === 'ion').map(ion => {
      const ds = o6.map(o => Math.hypot(ion.x - o.x, ion.y - o.y, ion.z - o.z)).filter(d => d < 3.4);
      return { el: ion.resn, n: ds.length, d: mean(ds) };
    }).filter(x => x.n);
  }

  /* extra: Hoogsteen-paren van de derde streng (triplex) */
  if (entry.third) {
    const c3 = new Set();
    const cnt = new Map();
    for (const [a, b] of hbonds) {
      const [t, o] = a.chain === entry.third ? [a, b] : b.chain === entry.third ? [b, a] : [null];
      if (!t || o.chain === entry.third) continue;
      cnt.set(t.rkey, (cnt.get(t.rkey) ?? 0) + 1);
    }
    for (const [k, n] of cnt) if (n >= 2) c3.add(k);
    out.hoogsteen = c3.size;
  }

  /* helixparameters: enkel voor een (min of meer rechte) dubbelhelix */
  if (entry.helix) {
    const hc = entry.helix;
    const hat = atoms.filter(a => a.kind === 'na' && hc.includes(a.chain));
    const { c, v } = helixAxis(hat.filter(a => a.atom === 'P').map(P));
    const e3 = v, e1 = norm(cross(e3, Math.abs(e3[0]) < .9 ? [1, 0, 0] : [0, 1, 0])), e2 = cross(e3, e1);
    // waterstofbruggen tussen de strengen, exact zoals in de POC (alle polaire base-atomen)
    const bb = new Set(['OP1', 'OP2', 'O1P', 'O2P', "O3'", "O5'", "O4'"]);
    const pol = hat.filter(a => (a.elem === 'N' || a.elem === 'O') && !bb.has(a.atom));
    const hb = [];
    const nearH = grid(pol, 3.4);
    for (const a of pol) nearH(a, b => { if (a.chain >= b.chain) return; const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z); if (d >= 2.6 && d <= 3.3) hb.push([a, b, d]); });
    const cnt = new Map();
    for (const [x, y] of hb) { const k = x.rkey + '#' + y.rkey; cnt.set(k, (cnt.get(k) ?? 0) + 1); }
    const pairs = [];
    for (const [k, n] of [...cnt].sort((p, q) => q[1] - p[1])) {
      const [ka, kb] = k.split('#');
      if (n >= 2 && !pairs.some(p => p[0] === ka || p[1] === kb)) pairs.push([ka, kb]);
    }
    const bp = pairs.map(([ka, kb]) => {
      const c1 = res.get(ka)?.at["C1'"], c2 = res.get(kb)?.at["C1'"];
      if (!c1 || !c2) return null;
      const t = sub(P(c2), P(c1)), tp = sub(t, e3.map(x => x * dot(t, e3)));
      const mid = [(c1.x + c2.x) / 2, (c1.y + c2.y) / 2, (c1.z + c2.z) / 2];
      return { t: norm(tp), z: dot(mid, e3) };
    }).filter(Boolean).sort((p, q) => p.z - q.z);
    const twists = [], rises = [];
    for (let i = 1; i < bp.length; i++) {
      twists.push(Math.atan2(dot(cross(bp[i - 1].t, bp[i].t), e3), dot(bp[i - 1].t, bp[i].t)) * 180 / Math.PI);
      rises.push(bp[i].z - bp[i - 1].z);
    }
    const rad = a => { const d = sub(P(a), c); return Math.hypot(dot(d, e1), dot(d, e2)); };
    const radii = hat.filter(a => a.atom === 'P').map(rad);
    const twist = mean(twists.slice(0, twists.length - twists.length % 2));
    const radial = hat.map(rad).sort((x, y) => x - y);
    out.helix = {
      c, e1, e2, e3, twist, nbp: bp.length, twists, rises, bpt: 360 / Math.abs(twist), rise: mean(rises),
      diam: 2 * mean(radii), outer: 2 * radial[Math.floor(radial.length * .98)], hand: twist > 0 ? 'r' : 'l', hb: hb.length,
    };
    out.frame = { c, e1, e2, e3 };
  } else {
    const pts = atoms.filter(a => a.kind === 'na' || a.kind === 'prot').map(P);
    const { c, axes } = principal(pts.length ? pts : atoms.map(P));
    const e3 = axes[0], e1 = axes[1], e2 = cross(e3, e1);
    out.frame = { c, e1, e2, e3 };
  }
  return out;
}

/* helixas (of langste hoofdas) verticaal en in het midden; coördinaten worden enkel geroteerd */
export function orient(atoms, f) {
  for (const a of atoms) {
    const d = sub(P(a), f.c);
    a.x = dot(d, f.e1); a.y = dot(d, f.e3); a.z = -dot(d, f.e2);
  }
}
