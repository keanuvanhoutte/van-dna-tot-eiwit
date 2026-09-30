/*
 * SVG-tekenhulp (agent prot-a): ball-and-stick van backbone-atomen en Cα-sporen, met diepte-sortering.
 */
import { f1 } from '../../kit.js';
import { P, amideH } from './_a_geo.js';

export const EL = { N: '#4f8ff7', O: '#ff6b6b', C: '#c9d2e4', H: '#ffffff', CB: '#7fdc6a' };
const RAD = { N: 10, O: 10, C: 9, H: 6, CB: 10 };

/* index van residuen per nummer (één keten) */
export function byResi(res, chain) {
  const m = {};
  for (const r of res) if (!chain || r.chain === chain) m[r.resi] = r;
  return m;
}
/* voeg berekende amide-H toe (niet voor Pro en niet voor het eerste residu) */
export function addH(R) {
  for (const k of Object.keys(R)) {
    const r = R[k], pr = R[+k - 1];
    if (r.resn !== 'PRO' && pr && pr.at.C && r.at.N && r.at.CA) r.H = amideH(pr.at.C, r.at.N, r.at.CA);
  }
}

/*
 * ballStick(R, ids, proj, opt) → SVG-string
 *  opt.cb: Cβ tonen; opt.dim(resi) → true = gedimd; opt.hb: [[i,j,col,w]] H-bruggen O(i)···H–N(j);
 *  opt.scale: vermenigvuldiging voor atoomgrootte
 */
export function ballStick(R, ids, proj, opt = {}) {
  const prims = [];
  const sc = opt.scale ?? 1;
  const set = new Set(ids);
  const pos = {};
  const at = (r, n) => n === 'H' ? r.H : r.at[n] && P(r.at[n]);
  const pp = (r, n) => { const key = r.resi + n; if (!(key in pos)) { const p = at(r, n); pos[key] = p ? proj(p) : null; } return pos[key]; };
  const bond = (a, b, col, w, op) => { if (!a || !b) return; prims.push([(a[2] + b[2]) / 2 - .01, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${col}" stroke-width="${f1(w * sc * (a[3] + b[3]) / 2)}" stroke-linecap="round" opacity="${op}"/>`]); };
  const atom = (a, el, op) => { if (!a) return; const r = RAD[el] * sc * a[3]; prims.push([a[2], `<circle cx="${f1(a[0])}" cy="${f1(a[1])}" r="${f1(r)}" fill="${EL[el]}" stroke="#0a1224" stroke-width="1.5" opacity="${op}"/>`]); };
  for (const i of ids) {
    const r = R[i]; if (!r) continue;
    const op = opt.dim?.(i) ? .25 : 1;
    const N = pp(r, 'N'), CA = pp(r, 'CA'), Cc = pp(r, 'C'), O = pp(r, 'O'), H = r.H ? pp(r, 'H') : null;
    bond(N, CA, '#8a96b3', 6, op); bond(CA, Cc, '#8a96b3', 6, op); bond(Cc, O, '#8a96b3', 6, op);
    if (H && opt.h !== false) { bond(N, H, '#8a96b3', 4, op); atom(H, 'H', op); }
    if (opt.cb && r.at.CB) { const CB = pp(r, 'CB'); bond(CA, CB, EL.CB, 6, op); atom(CB, 'CB', op); }
    const nx = R[i + 1];
    if (nx && set.has(i + 1)) bond(Cc, pp(nx, 'N'), '#8a96b3', 6, op);
    atom(N, 'N', op); atom(CA, 'C', op); atom(Cc, 'C', op); atom(O, 'O', op);
  }
  for (const [i, j, col, w] of opt.hb ?? []) {
    const O = R[i] && pp(R[i], 'O'), H = R[j]?.H ? pp(R[j], 'H') : null;
    if (!O || !H) continue;
    prims.push([Math.max(O[2], H[2]) + .02, `<line x1="${f1(O[0])}" y1="${f1(O[1])}" x2="${f1(H[0])}" y2="${f1(H[1])}" stroke="${col ?? '#ffc247'}" stroke-width="${w ?? 3.5}" stroke-dasharray="6 5" stroke-linecap="round"/>`]);
  }
  prims.sort((a, b) => a[0] - b[0]);
  return { svg: prims.map(p => p[1]).join(''), pos: (i, n) => R[i] && pp(R[i], n) };
}

/* Cα-spoor: dikke lijn per segment, kleur per residu (col(resi)) */
export function caTrace(R, ids, proj, col, w = 12, dim) {
  const prims = [];
  for (let k = 0; k < ids.length - 1; k++) {
    const a = R[ids[k]], b = R[ids[k + 1]];
    if (!a?.at.CA || !b?.at.CA || ids[k + 1] !== ids[k] + 1) continue;
    const p = proj(P(a.at.CA)), q = proj(P(b.at.CA));
    const c = col(ids[k + 1]) === col(ids[k]) ? col(ids[k]) : col(ids[k]);
    const op = dim?.(ids[k]) ? .25 : 1;
    prims.push([(p[2] + q[2]) / 2, `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" stroke="${c}" stroke-width="${f1(w * (p[3] + q[3]) / 2)}" stroke-linecap="round" opacity="${op}"/>`]);
  }
  prims.sort((a, b) => a[0] - b[0]);
  return prims.map(p => p[1]).join('');
}
