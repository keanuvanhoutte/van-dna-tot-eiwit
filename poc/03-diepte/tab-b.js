/* B · atoomniveau, live uit de coördinaten berekend.
 *  - 1UBQ: waterstofbruggen in de ruggengraat (vereenvoudigd: N···O ≤ 3,5 Å, |i−j| ≥ 3), helix/blad volgens het
 *          DSSP-patroon op die bruggen, φ/ψ per residu (torsion() uit de atlas) en een Ramachandran-grafiek.
 *  - 1BNA: Watson-Crick-bruggen per basenpaar (A–T: N6–O4, N1–N3; G–C: O6–N4, N1–N3, N2–O2). */
import { torsion, P } from '../../atlas/analyse.js';
import { pdbUrl } from '../../shared/pdb.js';
import { $, t, sources } from './common.js';

const BG = '#0d1426';
const COL = { helix: '#f06bc0', sheet: '#ffc247', other: '#8a93a8' };
const HB = '#7cc4ff', AT = '#ffc247', GC = '#7fdc6a';
const HB_MAX = 3.5;
const d3 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2);
const fmt = s => s.replace(/(\d)\.(\d)/g, document.documentElement.lang === 'nl' ? '$1,$2' : '$1.$2');
const load = code => fetch(pdbUrl(code)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
let cite = () => '';

/* ---------- vereenvoudigde Ramachandran-gebieden (rechthoeken die de vorm uit Lovell et al. 2003 benaderen) ---------- */
const FAV = [[-180, -45, 100, 180], [-180, -45, -180, -165], [-160, -45, -70, -5], [45, 90, 0, 90]];
const ALLOW = [[-180, -30, -110, 180], [-180, -30, -180, -150], [30, 130, -40, 110]];
const inR = (R, f, p) => R.some(([a, b, c, d]) => f >= a && f <= b && p >= c && p <= d);
const region = (f, p) => inR(FAV, f, p) ? 'fav' : inR(ALLOW, f, p) ? 'allow' : 'out';

/* ================= eiwit ================= */
const prot = { v: null, res: [], byResi: new Map(), hb: [], sel: null };

function analyseProtein(atoms) {
  for (const a of atoms) {
    let r = prot.byResi.get(a.resi);
    if (!r) { r = { resi: a.resi, resn: a.resn }; prot.byResi.set(a.resi, r); prot.res.push(r); }
    if (['N', 'CA', 'C', 'O'].includes(a.atom)) r[a.atom] = a;
  }
  prot.res.sort((a, b) => a.resi - b.resi);
  const R = prot.res, by = prot.byResi;
  for (const r of R) {
    const p = by.get(r.resi - 1), n = by.get(r.resi + 1);
    r.phi = p?.C && r.N && r.CA && r.C ? torsion(P(p.C), P(r.N), P(r.CA), P(r.C)) : null;
    r.psi = n?.N && r.N && r.CA && r.C ? torsion(P(r.N), P(r.CA), P(r.C), P(n.N)) : null;
    r.ss = 'other'; r.partners = [];
  }
  /* brug O(i) → N(j) */
  const H = new Set();
  for (const i of R) for (const j of R) {
    if (!i.O || !j.N || j.resn === 'PRO' || Math.abs(i.resi - j.resi) < 3) continue;
    const d = d3(i.O, j.N);
    if (d <= HB_MAX) { H.add(i.resi + '>' + j.resi); prot.hb.push({ o: i.O, n: j.N, d, i: i.resi, j: j.resi }); i.partners.push(j.resi); j.partners.push(i.resi); }
  }
  const h = (i, j) => H.has(i + '>' + j);
  /* helix (DSSP): bruggen i−1→i+3 én i→i+4 → residuen i..i+3 */
  for (const r of R) { const i = r.resi; if (h(i - 1, i + 3) && h(i, i + 4)) for (let k = i; k <= i + 3; k++) if (by.get(k)) by.get(k).ss = 'helix'; }
  /* blad: DSSP-bruggen (parallel en antiparallel) */
  for (const a of R) for (const b of R) {
    const i = a.resi, j = b.resi; if (j - i < 3) continue;
    const par = (h(i - 1, j) && h(j, i + 1)) || (h(j - 1, i) && h(i, j + 1));
    const anti = (h(i, j) && h(j, i)) || (h(i - 1, j + 1) && h(j - 1, i + 1));
    if (par || anti) for (const r of [a, b]) if (r.ss !== 'helix') r.ss = 'sheet';
  }
  for (const r of R) r.reg = r.phi != null && r.psi != null ? region(r.phi, r.psi) : null;
}

function protStyle() {
  const v = prot.v; if (!v) return;
  const ss = a => COL[prot.byResi.get(a.resi)?.ss ?? 'other'];
  v.setStyle({}, {});
  v.setStyle({ hetflag: false }, { cartoon: { colorfunc: ss, opacity: .85 } });
  v.addStyle({ hetflag: false, atom: ['N', 'CA', 'C', 'O'] }, { stick: { radius: .1, colorfunc: ss } });
  v.removeAllLabels();
  const s = prot.sel && prot.byResi.get(prot.sel);
  if (s) {
    v.addStyle({ resi: s.resi, hetflag: false }, { stick: { radius: .22, colorscheme: 'whiteCarbon' } });
    v.addLabel(`${s.resn} ${s.resi}`, { position: s.CA, backgroundColor: '#0a1224', backgroundOpacity: .85, fontColor: '#ffffff', fontSize: 16, borderColor: '#7cc4ff', borderThickness: 1, inFront: true });
  }
  v.render();
}

function rama() {
  const S = 380, m = 52, X = f => m + (f + 180) / 360 * S, Y = p => 14 + (180 - p) / 360 * S;
  const rect = ([a, b, c, d], fill) => `<rect x="${X(a)}" y="${Y(d)}" width="${X(b) - X(a)}" height="${Y(c) - Y(d)}" fill="${fill}" rx="3"/>`;
  let s = `<svg viewBox="0 0 ${S + m + 16} ${S + 64}" font-family="Inter">`;
  s += `<rect x="${m}" y="14" width="${S}" height="${S}" fill="#070b16" stroke="rgba(160,180,220,.3)"/>`;
  s += ALLOW.map(r => rect(r, 'rgba(124,196,255,.12)')).join('') + FAV.map(r => rect(r, 'rgba(124,196,255,.30)')).join('');
  for (const v of [-180, -90, 0, 90, 180]) {
    s += `<line x1="${X(v)}" y1="14" x2="${X(v)}" y2="${14 + S}" stroke="rgba(160,180,220,.12)"/><line x1="${m}" y1="${Y(v)}" x2="${m + S}" y2="${Y(v)}" stroke="rgba(160,180,220,.12)"/>`;
    s += `<text x="${X(v)}" y="${S + 34}" font-size="14" fill="#93a0bb" text-anchor="middle">${v}</text><text x="${m - 8}" y="${Y(v) + 5}" font-size="14" fill="#93a0bb" text-anchor="end">${v}</text>`;
  }
  s += `<text x="${m + S / 2}" y="${S + 58}" font-size="17" fill="#e8edf7" text-anchor="middle">φ (°)</text><text x="16" y="${14 + S / 2}" font-size="17" fill="#e8edf7" text-anchor="middle">ψ</text>`;
  s += `<text x="${X(-112)}" y="${Y(160)}" font-size="16" fill="#e8edf7" text-anchor="middle">β</text><text x="${X(-100)}" y="${Y(-38) + 6}" font-size="16" fill="#e8edf7" text-anchor="middle">α</text><text x="${X(68)}" y="${Y(45) + 6}" font-size="16" fill="#e8edf7" text-anchor="middle">Lα</text>`;
  for (const r of prot.res) if (r.reg) {
    const on = r.resi === prot.sel;
    s += `<circle class="pt" data-r="${r.resi}" cx="${X(r.phi).toFixed(1)}" cy="${Y(r.psi).toFixed(1)}" r="${on ? 9 : 5.5}" fill="${COL[r.ss]}" stroke="${on ? '#fff' : '#070b16'}" stroke-width="${on ? 3 : 1}"><title>${r.resn} ${r.resi}</title></circle>`;
  }
  if (prot.sel) { const r = prot.byResi.get(prot.sel); if (r?.reg) s += `<circle cx="${X(r.phi)}" cy="${Y(r.psi)}" r="9" fill="${COL[r.ss]}" stroke="#fff" stroke-width="3" pointer-events="none"/>`; }
  $('rama').innerHTML = s + '</svg>';
  for (const c of $('rama').querySelectorAll('.pt')) c.onclick = () => selectRes(+c.dataset.r);
}

function protInfo() {
  const R = prot.res.filter(r => r.reg), fav = R.filter(r => r.reg === 'fav').length;
  const n = k => prot.res.filter(r => r.ss === k).length;
  const s = prot.sel && prot.byResi.get(prot.sel);
  const selHtml = s ? `<div class="sel"><b>${s.resn} ${s.resi}</b> · <span style="color:${COL[s.ss]}">${t(s.ss)}</span><br>
      φ = ${s.phi == null ? '—' : f1(s.phi) + '°'} · ψ = ${s.psi == null ? '—' : f1(s.psi) + '°'} · ${s.reg ? t(s.reg === 'fav' ? 'inFav' : s.reg === 'allow' ? 'inAllow' : 'inOut') : ''}<br>
      <span class="muted">${t('partners')}: ${s.partners.length ? [...new Set(s.partners)].sort((a, b) => a - b).join(', ') : '—'}</span></div>` : `<div class="sel muted">${t('selNone')}</div>`;
  $('pInfo').innerHTML = fmt(`<div class="big3">
      <div><b>${prot.hb.length}</b><span>${t('nHb')}</span></div>
      <div><b>${f1(100 * fav / R.length)}%</b><span>${fav}/${R.length} ${t('nFav')} ${cite('lovell')}</span></div>
      <div style="grid-column:span 2"><b>${n('helix')} · ${n('sheet')} · ${n('other')}</b><span>${t('nSS')} ${cite('kabsch')}</span></div>
    </div>${selHtml}<p style="margin:0">${t('phipsi')} ${cite('rama')}</p><div class="rule">${t('ruleP')}</div>`);
}

function selectRes(resi) { prot.sel = resi; protStyle(); rama(); protInfo(); }

async function initProt() {
  $('ssLeg').innerHTML = ['helix', 'sheet', 'other'].map(k => `<span><i style="background:${COL[k]}"></i>${t(k)}</span>`).join('') + `<span><i style="background:none;border-top:2px dashed ${HB};border-radius:0;height:0;width:16px"></i>${t('hbLeg')}</span>`;
  $('ramaLeg').innerHTML = `<span><i style="background:rgba(124,196,255,.45)"></i>${t('fav')}</span><span><i style="background:rgba(124,196,255,.18)"></i>${t('allow')}</span>`;
  const el = $('pView');
  try {
    const txt = await load('1UBQ');
    const v = prot.v = $3Dmol.createViewer(el, { backgroundColor: BG, antialias: true });
    const m = v.addModel(txt, 'pdb');
    analyseProtein(m.selectedAtoms({ hetflag: false }));
    for (const h of prot.hb) v.addCylinder({ start: P2(h.o), end: P2(h.n), radius: .07, color: HB, dashed: true, dashLength: .25, gapLength: .18, fromCap: 1, toCap: 1 });
    v.setClickable({ hetflag: false }, true, a => selectRes(a.resi));
    el.querySelector('.load')?.remove();
    v.zoomTo({ hetflag: false }); v.zoom(1.5); protStyle();
  } catch (e) { el.querySelector('.load').textContent = t('loadErr'); console.warn(e); return; }
  const q = +new URLSearchParams(location.search).get('res');
  if (prot.byResi.has(q)) selectRes(q); else { rama(); protInfo(); }
}
const P2 = a => ({ x: a.x, y: a.y, z: a.z });

/* ================= DNA ================= */
const dna = { v: null, pairs: [], sel: 4 };
const ATOMS = { AT: [['N6', 'O4'], ['N1', 'N3']], GC: [['O6', 'N4'], ['N1', 'N3'], ['N2', 'O2']] };

function analyseDna(atoms) {
  const key = (c, r, n) => `${c}:${r}:${n}`, A = new Map(), resn = new Map();
  for (const a of atoms) { A.set(key(a.chain, a.resi, a.atom), a); resn.set(a.chain + ':' + a.resi, a.resn.replace(/^D/, '')); }
  for (let i = 1; i <= 12; i++) {
    const j = 25 - i, bi = resn.get('A:' + i), bj = resn.get('B:' + j);
    const pur = bi === 'A' || bi === 'G';
    const [pc, pr, yc, yr] = pur ? ['A', i, 'B', j] : ['B', j, 'A', i];
    const type = (bi === 'A' || bi === 'T') ? 'AT' : 'GC';
    const bonds = ATOMS[type].map(([pa, ya]) => { const a = A.get(key(pc, pr, pa)), b = A.get(key(yc, yr, ya)); return { a, b, lbl: `${pa}–${ya}`, d: a && b ? d3(a, b) : NaN }; });
    dna.pairs.push({ k: i, i, j, bi, bj, type, bonds });
  }
}

function dnaStyle() {
  const v = dna.v; if (!v) return;
  const p = dna.pairs[dna.sel - 1];
  v.setStyle({}, {});
  v.setStyle({ hetflag: false }, { stick: { radius: .13, colorfunc: a => a.chain === 'A' ? '#4f8ff7' : '#9cc0ff' } });
  if (p) for (const [c, r] of [['A', p.i], ['B', p.j]]) v.setStyle({ chain: c, resi: r }, { stick: { radius: .22, colorscheme: 'whiteCarbon' } });
  v.removeAllLabels();
  if (p) for (const b of p.bonds) if (b.a && b.b) {
    const mid = { x: (b.a.x + b.b.x) / 2, y: (b.a.y + b.b.y) / 2, z: (b.a.z + b.b.z) / 2 };
    v.addLabel(fmt(f2(b.d)) + ' Å', { position: mid, backgroundColor: '#0a1224', backgroundOpacity: .85, fontColor: p.type === 'AT' ? AT : GC, fontSize: 15, inFront: true, alignment: 'center' });
  }
  v.render();
}

function dnaInfo() {
  const all = dna.pairs.flatMap(p => p.bonds).filter(b => isFinite(b.d)), ds = all.map(b => b.d);
  const mean = ds.reduce((s, x) => s + x, 0) / ds.length;
  const nAT = dna.pairs.filter(p => p.type === 'AT').length, nGC = dna.pairs.length - nAT;
  const rows = dna.pairs.map(p => `<tr data-k="${p.k}" class="${p.k === dna.sel ? 'on' : ''}"><td class="n">${p.k}</td><td class="${p.type === 'AT' ? 'at' : 'gc'}"><b>${p.bi}${p.i}–${p.bj}${p.j}</b></td><td class="n">${p.bonds.length}</td><td class="n">${p.bonds.map(b => `<span title="${b.lbl}">${f2(b.d)}</span>`).join(' · ')}</td></tr>`).join('');
  $('dInfo').innerHTML = fmt(`<p style="margin:0 0 10px">${t('dP')} ${cite('alb_dna')}</p>
    <div class="big3"><div><b>${all.length}</b><span>${t('dSum')} ${f2(mean)} Å · ${nAT}×2 + ${nGC}×3</span></div><div><b>${f2(Math.min(...ds))}–${f2(Math.max(...ds))}</b><span>${t('dRange')} (Å)</span></div></div>
    <table class="dt"><thead><tr><th>${t('bp')}</th><th>${t('pair')}</th><th>${t('nb')}</th><th>${t('dist')}: ${['N6–O4 · N1–N3', 'O6–N4 · N1–N3 · N2–O2'].join(' / ')}</th></tr></thead><tbody>${rows}</tbody></table>`);
  for (const tr of $('dInfo').querySelectorAll('tbody tr')) tr.onclick = () => selectPair(+tr.dataset.k);
}
function selectPair(k) { dna.sel = k; dnaStyle(); dnaInfo(); }

async function initDna() {
  const el = $('dView');
  try {
    const txt = await load('1BNA');
    const v = dna.v = $3Dmol.createViewer(el, { backgroundColor: BG, antialias: true });
    const m = v.addModel(txt, 'pdb');
    analyseDna(m.selectedAtoms({ hetflag: false }));
    for (const p of dna.pairs) for (const b of p.bonds) if (b.a && b.b) v.addCylinder({ start: P2(b.a), end: P2(b.b), radius: .09, color: p.type === 'AT' ? AT : GC, dashed: true, dashLength: .22, gapLength: .16, fromCap: 1, toCap: 1 });
    v.setClickable({ hetflag: false }, true, a => selectPair(a.chain === 'A' ? a.resi : 25 - a.resi));
    el.querySelector('.load')?.remove();
    v.rotate(90, 'x'); v.rotate(90, 'y'); v.zoomTo({ hetflag: false }); v.zoom(1.2);
  } catch (e) { el.querySelector('.load').textContent = t('loadErr'); console.warn(e); return; }
  const q = +new URLSearchParams(location.search).get('bp');
  if (q >= 1 && q <= 12) dna.sel = q;
  dnaStyle(); dnaInfo();
}

/* ================= tab ================= */
let part = 'prot', dnaStarted = null;
function setPart(p) {
  part = p;
  for (const b of $('bPart').children) b.setAttribute('aria-pressed', String(b.dataset.v === p));
  $('bProt').hidden = p !== 'prot'; $('bDna').hidden = p !== 'dna';
  $('bHint').textContent = t(p === 'prot' ? 'hintProt' : 'hintDna');
  if (p === 'dna' && !dnaStarted) dnaStarted = initDna();
  (p === 'prot' ? prot.v : dna.v)?.resize();
}

export async function init() {
  cite = sources($('srcB'), ['vijay', 'drew', 'pauling', 'kabsch', 'rama', 'lovell', 'alb_dna', 'mol3d']);
  for (const b of $('bPart').children) b.onclick = () => setPart(b.dataset.v);
  const q = new URLSearchParams(location.search).get('part');
  setPart(q === 'dna' ? 'dna' : 'prot');
  await initProt();
  window.__diepte = { prot, dna };      /* alleen voor tests: gemeten getallen uitlezen */
  return { shown: () => (part === 'prot' ? prot.v : dna.v)?.resize() };
}
