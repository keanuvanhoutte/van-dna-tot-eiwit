/* Structuurformules van de 20 aminozuren, zoals in een schoolboek: H₂N–C–COOH bovenaan (bij elk aminozuur gelijk) en
 * de zijketen naar onder, gekleurd volgens soort. Getekend met lijnen (koolstof = hoekpunt) en letters voor N, O, S.
 * Eenheden: één binding = 1; y groeit naar onder. */
const S = Math.sqrt(3) / 2;
const rot = ([x, y], deg) => { const r = deg * Math.PI / 180; return [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)]; };
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const unit = deg => [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];
/* ring: begint met de rand v0→v1 en draait telkens over de buitenhoek (teken bepaalt de kant) */
function ring(v0, v1, n, sign) {
  const v = [v0, v1];
  while (v.length < n) { const d = sub(v.at(-1), v.at(-2)); v.push(add(v.at(-1), rot(d, sign * 360 / n))); }
  return v;
}
// zigzag naar onder: B, p2, p3, …
const P = [[0, 1], [S, 1.5], [S, 2.5], [2 * S, 3], [2 * S, 4], [3 * S, 4.5]];

export const AACLASS = {
  ALA: 'hyd', VAL: 'hyd', LEU: 'hyd', ILE: 'hyd', PHE: 'aro', TRP: 'aro', TYR: 'aro', SER: 'pol', THR: 'pol', ASN: 'pol', GLN: 'pol',
  ASP: 'neg', GLU: 'neg', LYS: 'pos', ARG: 'pos', HIS: 'pos', CYS: 'sul', MET: 'sul', GLY: 'spe', PRO: 'spe',
};
export const CLASSES = {
  hyd: { col: '#ff9a52', nl: 'waterafstotend', en: 'water-repelling' },
  aro: { col: '#7fdc6a', nl: 'met een ring (aromatisch)', en: 'with a ring (aromatic)' },
  pol: { col: '#5fd3e6', nl: 'houdt van water (polair)', en: 'likes water (polar)' },
  neg: { col: '#ff6b6b', nl: 'negatief geladen', en: 'negatively charged' },
  pos: { col: '#6aa4ff', nl: 'positief geladen', en: 'positively charged' },
  sul: { col: '#ffd23f', nl: 'met zwavel', en: 'with sulphur' },
  spe: { col: '#c39bff', nl: 'bijzonder', en: 'special' },
};

/* per aminozuur: atomen van de zijketen [naam, [x,y], label?] en bindingen [a, b, dubbel?]; CA = (0,0) */
function side(r) {
  const A = {}, B = [];
  const at = (k, p, lab = '') => { A[k] = { p, lab }; };
  const bd = (a, b, dbl = false, inner = null) => B.push({ a, b, dbl, inner });
  at('B', P[0]); bd('CA', 'B');
  switch (r) {
    case 'GLY': A.B.lab = 'H'; break;
    case 'ALA': break;
    case 'VAL': at('G1', [-S, 1.5]); at('G2', [S, 1.5]); bd('B', 'G1'); bd('B', 'G2'); break;
    case 'LEU': at('G', P[1]); at('D1', P[2]); at('D2', [2 * S, 1]); bd('B', 'G'); bd('G', 'D1'); bd('G', 'D2'); break;
    case 'ILE': at('G1', P[1]); at('D1', P[2]); at('G2', [-S, 1.5]); bd('B', 'G1'); bd('G1', 'D1'); bd('B', 'G2'); break;
    case 'SER': at('OG', P[1], 'OH'); bd('B', 'OG'); break;
    case 'THR': at('OG', [-S, 1.5], 'OH'); at('G2', P[1]); bd('B', 'OG'); bd('B', 'G2'); break;
    case 'CYS': at('S', P[1], 'SH'); bd('B', 'S'); break;
    case 'MET': at('G', P[1]); at('S', P[2], 'S'); at('E', P[3]); bd('B', 'G'); bd('G', 'S'); bd('S', 'E'); break;
    case 'ASP': case 'ASN':
      at('G', P[1]); at('O1', P[2], 'O'); at('X', [2 * S, 1], r === 'ASP' ? 'O⁻' : 'NH₂'); bd('B', 'G'); bd('G', 'O1', true); bd('G', 'X'); break;
    case 'GLU': case 'GLN':
      at('G', P[1]); at('D', P[2]); at('O1', [0, 3], 'O'); at('X', [2 * S, 3], r === 'GLU' ? 'O⁻' : 'NH₂');
      bd('B', 'G'); bd('G', 'D'); bd('D', 'O1', true); bd('D', 'X'); break;
    case 'LYS': at('G', P[1]); at('D', P[2]); at('E', P[3]); at('Z', P[4], 'NH₃⁺'); bd('B', 'G'); bd('G', 'D'); bd('D', 'E'); bd('E', 'Z'); break;
    case 'ARG':
      at('G', P[1]); at('D', P[2]); at('NE', P[3], 'NH'); at('CZ', P[4]); at('N1', [S, 4.5], 'H₂N'); at('N2', [3 * S, 4.5], 'NH₂⁺');
      bd('B', 'G'); bd('G', 'D'); bd('D', 'NE'); bd('NE', 'CZ'); bd('CZ', 'N1'); bd('CZ', 'N2', true); break;
    case 'PHE': case 'TYR': {
      const v = ring(P[1], add(P[1], unit(90)), 6, -1), c = [(v[0][0] + v[3][0]) / 2, (v[0][1] + v[3][1]) / 2];
      v.forEach((p, i) => at('R' + i, p)); bd('B', 'R0');
      for (let i = 0; i < 6; i++) bd('R' + i, 'R' + ((i + 1) % 6), i % 2 === 1, c);
      if (r === 'TYR') { at('OH', add(v[3], sub(v[3], c)), 'OH'); bd('R3', 'OH'); }
      break;
    }
    case 'HIS': case 'TRP': {
      const v = ring(P[1], add(P[1], unit(84)), 5, -1), c = v.reduce((t, p) => [t[0] + p[0] / 5, t[1] + p[1] / 5], [0, 0]);
      v.forEach((p, i) => at('R' + i, p, r === 'HIS' ? ['', 'N', '', 'NH', ''][i] : ['', '', 'NH', '', ''][i])); bd('B', 'R0');
      for (let i = 0; i < 5; i++) bd('R' + i, 'R' + ((i + 1) % 5), r === 'HIS' ? i === 1 || i === 4 : i === 0, c);
      if (r === 'TRP') {   // benzeenring vastgemaakt aan de rand R3–R4, aan de andere kant dan de vijfring
        const w = ring(v[3], v[4], 6, 1), c2 = [(w[0][0] + w[3][0]) / 2, (w[0][1] + w[3][1]) / 2];
        w.slice(2).forEach((p, i) => at('W' + (i + 2), p));
        const nm = i => i === 0 ? 'R3' : i === 1 ? 'R4' : 'W' + i;
        for (let i = 0; i < 6; i++) bd(nm(i), nm((i + 1) % 6), i % 2 === 0 && i !== 0 ? true : i === 0, c2);
      }
      break;
    }
    case 'PRO': {
      // ring N–CA–CB–CG–CD; de N heeft maar één H
      const v = ring([-S, -0.5], [0, 0], 5, 1);
      at('B', v[2]); at('G', v[3]); at('D', v[4]); B.length = 0; bd('CA', 'B'); bd('B', 'G'); bd('G', 'D'); bd('D', 'N');
      break;
    }
  }
  return { A, B };
}

export function aaSVG(r, L) {
  const cls = AACLASS[r]; if (!cls) return '';
  const col = CLASSES[cls].col, base = '#c9d2e4';
  const { A, B } = side(r);
  const all = {
    N: { p: [-S, -0.5], lab: r === 'PRO' ? 'HN' : 'H₂N', bb: 1 }, CA: { p: [0, 0], lab: '', bb: 1 },
    C: { p: [S, -0.5], lab: '', bb: 1 }, O: { p: [S, -1.5], lab: 'O', bb: 1 }, OX: { p: [2 * S, 0], lab: 'OH', bb: 1 }, ...A,
  };
  const bonds = [{ a: 'N', b: 'CA', bb: 1 }, { a: 'CA', b: 'C', bb: 1 }, { a: 'C', b: 'O', dbl: true, bb: 1 }, { a: 'C', b: 'OX', bb: 1 }, ...B];
  const u = 26, xs = Object.values(all).map(a => a.p[0]), ys = Object.values(all).map(a => a.p[1]);
  const x0 = Math.min(...xs) - .9, y0 = Math.min(...ys) - .6, W = (Math.max(...xs) - x0 + .9) * u, H = (Math.max(...ys) - y0 + .6) * u;
  const X = p => ((p[0] - x0) * u).toFixed(1), Y = p => ((p[1] - y0) * u).toFixed(1);
  const cut = (p, q, lab) => lab ? add(p, rot(sub(q, p), 0).map(v => v * (lab.length > 2 ? .42 : .3))) : p;   // lijn stopt voor een letter
  let out = '';
  for (const b of bonds) {
    const A1 = all[b.a], B1 = all[b.b], c = b.bb ? base : col;
    const p = cut(A1.p, B1.p, A1.lab), q = cut(B1.p, A1.p, B1.lab);
    out += `<line x1="${X(p)}" y1="${Y(p)}" x2="${X(q)}" y2="${Y(q)}" stroke="${c}"/>`;
    if (b.dbl) {   // tweede lijn: naar het midden van de ring, of gewoon ernaast
      const d = sub(q, p), l = Math.hypot(...d), nrm = [-d[1] / l, d[0] / l];
      let o = nrm.map(v => v * .17);
      if (b.inner) { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], toC = sub(b.inner, m); if (toC[0] * o[0] + toC[1] * o[1] < 0) o = o.map(v => -v); }
      const sh = b.inner ? .15 : 0, p2 = add(add(p, d.map(v => v * sh)), o), q2 = add(sub(q, d.map(v => v * sh)), o);
      out += `<line x1="${X(p2)}" y1="${Y(p2)}" x2="${X(q2)}" y2="${Y(q2)}" stroke="${c}"/>`;
    }
  }
  for (const [k, a] of Object.entries(all)) if (a.lab) out += `<text x="${X(a.p)}" y="${(+Y(a.p) + 4.5).toFixed(1)}" fill="${a.bb ? base : col}">${a.lab}</text>`;
  // de α-koolstof: het punt waar elk aminozuur zijn eigen zijketen aan hangt
  out += `<circle cx="${X([0, 0])}" cy="${Y([0, 0])}" r="2.6" fill="${base}"/>`;
  return `<svg class="aa" viewBox="0 0 ${W.toFixed(0)} ${H.toFixed(0)}" width="${Math.min(W, 230).toFixed(0)}" role="img">${out}</svg>`;
}
