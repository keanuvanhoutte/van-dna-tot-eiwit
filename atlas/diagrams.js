/*
 * Schema's voor items zonder één 3D-structuur (mRNA, pre-mRNA, mtDNA, plasmide, cDNA, lncRNA, T-DNA).
 * Kleuren volgen shared/theme.css (zelfde betekenis als in de rest van de app).
 *
 * Elke functie krijgt L({nl,en}) en geeft terug:
 *   { svg, w, h, legend: [{ c, t, d, line?, op? }], steps?: [..], notes?: [..] }
 * In de SVG staan enkel de tekening en een paar korte, grote labels (viewBox ≈ 600 breed,
 * lettergrootte ≥ 20 eenheden → ook in een vergelijkkaart van ~450 px nog ≥ 12 px).
 * Legende, stappen en uitleg worden door atlas.js als gewone HTML onder het schema gezet.
 */
const C = {
  dna: '#4f8ff7', dna2: '#9cc0ff', tdna: '#f06bc0', rna: '#ff8a3d', trna: '#ffc247', rrna: '#2cc6a8', prot: '#9b7bff',
  text: '#e8edf7', muted: '#93a0bb', line: 'rgba(160,180,220,.28)', intron: '#a9876f', cap: '#ffb27a', bg: '#0d1426', ok: '#7fdc6a',
};
const RED = '#ff6b6b', CTRL = '#8a93a8', INK = '#0a1224';
const f = n => (+n).toFixed(1);
const T = (x, y, s, o = {}) => `<text x="${f(x)}" y="${f(y)}" font-size="${o.size ?? 20}" text-anchor="${o.anchor ?? 'middle'}" fill="${o.col ?? C.text}" font-family="${o.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif'}" font-weight="${o.w ?? 600}"${o.extra ?? ''}>${s}</text>`;
const R = (x, y, w, h, col, o = {}) => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${o.rx ?? 4}" fill="${col}"${o.op ? ` fill-opacity="${o.op}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw ?? 1.5}"` : ''}/>`;
const Ln = (x1, y1, x2, y2, col = C.muted, w = 2, extra = '') => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
const Ci = (x, y, r, col, extra = '') => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${col}"${extra}/>`;
const defs = `<defs><marker id="dg-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${C.muted}"/></marker></defs>`;
const arrow = (x1, y1, x2, y2, col = C.muted) => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="2.5" marker-end="url(#dg-arr)"/>`;
/* genummerd bolletje: koppelt een plek in het schema aan een stap in de HTML-lijst */
const badge = (x, y, n) => Ci(x, y, 15, C.text) + T(x, y + 7, n, { size: 20, w: 700, col: INK });
const out = (w, h, body, rest) => ({ svg: `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${defs}${body}</svg>`, w, h, ...rest });

/* boog-segment op een cirkel (hoek 0 = boven, met de klok mee) */
function arc(cx, cy, r, a0, a1, col, w) {
  const p = a => [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `<path d="M${f(x0)},${f(y0)} A${r},${r} 0 ${large} 1 ${f(x1)},${f(y1)}" stroke="${col}" stroke-width="${w}" fill="none"/>`;
}
/* label rond een cirkel; tekst groeit naar buiten (links: end, rechts: start) */
function ringLabel(cx, cy, rr, a, s, o = {}) {
  const x = cx + rr * Math.sin(a), y = cy - rr * Math.cos(a);
  const sn = Math.sin(a), cs = Math.cos(a), inward = o.inward;
  let anchor = sn > .3 ? 'start' : sn < -.3 ? 'end' : 'middle';
  if (inward) anchor = anchor === 'start' ? 'end' : anchor === 'end' ? 'start' : 'middle';
  const size = o.size ?? 20;
  const dy = size * .35 + (anchor === 'middle' ? (inward ? 1 : -1) * cs * size * .45 : 0);
  return T(x, y + dy, s, { ...o, size, anchor });
}

/* ---------------- mRNA ---------------- */
function mrna(L) {
  const y = 96, h = 46, m = y + h / 2;
  let s = '';
  // cap
  s += Ci(38, m, 30, C.cap) + T(38, m + 7, 'm⁷G', { size: 19, col: INK, w: 700 });
  s += Ln(68, m, 80, m, C.cap, 4);
  // 5'UTR, CDS, 3'UTR, poly(A)
  s += R(80, y + 8, 94, h - 16, C.rna, { op: .45 });
  s += R(174, y, 222, h, C.rna) + T(285, m + 8, 'CDS', { size: 24, col: INK, w: 800 });
  s += R(396, y + 8, 92, h - 16, C.rna, { op: .45 });
  s += R(488, y + 10, 104, h - 20, C.trna) + T(540, m + 6, 'AAA…A', { size: 18, mono: true, col: INK, w: 700 });
  s += T(38, y - 22, L({ nl: '5\'-cap', en: '5\' cap' })) + T(128, y - 22, "5'-UTR") + T(442, y - 22, "3'-UTR") + T(540, y - 22, 'poly(A)');
  // start/stop
  s += Ln(174, y - 6, 174, y + h + 8, C.ok, 3.5) + T(174, y + h + 32, 'AUG', { mono: true, col: C.ok, w: 700 });
  s += Ln(396, y - 6, 396, y + h + 8, RED, 3.5) + T(396, y + h + 32, 'stop', { mono: true, col: RED, w: 700 });
  s += T(540, y + h + 32, '~200–250 nt', { size: 18, mono: true, col: C.muted, w: 500 });
  // richting
  s += T(22, 232, "5'", { mono: true, col: C.muted }) + arrow(48, 225, 552, 225) + T(578, 232, "3'", { mono: true, col: C.muted });
  return out(600, 256, s, {
    legend: [
      { c: C.cap, t: L({ nl: '5\'-cap (m⁷GpppNm)', en: '5\' cap (m⁷GpppNm)' }), d: L({ nl: 'eIF4E bindt de cap → 43S-complex laadt; de cap beschermt tegen 5\'→3\'-afbraak', en: 'eIF4E binds the cap → 43S complex loads; the cap protects against 5\'→3\' decay' }) },
      { c: C.rna, op: .45, t: "5'-UTR", d: L({ nl: 'scannen 5\'→3\' naar het eerste AUG, in een goede Kozak-context: gccRccAUGG', en: 'scanning 5\'→3\' to the first AUG, in a good Kozak context: gccRccAUGG' }) },
      { c: C.rna, t: L({ nl: 'CDS (coderende sequentie)', en: 'CDS (coding sequence)' }), d: L({ nl: 'codons in één leesraam, van AUG (Met) tot het stopcodon; exon-exonovergangen dragen EJC\'s (controle via NMD)', en: 'codons in a single reading frame, from AUG (Met) to the stop codon; exon–exon junctions carry EJCs (surveillance by NMD)' }) },
      { c: C.ok, line: true, t: L({ nl: 'startcodon AUG', en: 'start codon AUG' }) },
      { c: RED, line: true, t: L({ nl: 'stopcodon UAA / UAG / UGA', en: 'stop codon UAA / UAG / UGA' }) },
      { c: C.rna, op: .45, t: "3'-UTR", d: L({ nl: 'miRNA-bindingsplaatsen (seed), AU-rijke elementen, eiwitbinding; bevat het polyadenyleringssignaal AAUAAA', en: 'miRNA binding sites (seed), AU-rich elements, protein binding; contains the polyadenylation signal AAUAAA' }) },
      { c: C.trna, t: L({ nl: 'poly(A)-staart (~200–250 nt)', en: 'poly(A) tail (~200–250 nt)' }), d: L({ nl: 'PABP op poly(A) ↔ eIF4G: "gesloten lus"; deadenylatie start de afbraak', en: 'PABP on poly(A) ↔ eIF4G: "closed loop"; deadenylation starts decay' }) },
    ],
    notes: [L({ nl: 'Rijp menselijk mRNA, 5\'→3\' van links naar rechts; schematisch, niet op schaal.', en: 'Mature human mRNA, 5\'→3\' from left to right; schematic, not to scale.' })],
  });
}

/* ---------------- pre-mRNA ---------------- */
function premrna(L) {
  let s = '';
  const y = 64, h = 38, m = y + h / 2;
  const exon = (a, b, n, yy) => R(a, yy, b - a, h, C.rna, { stroke: INK, sw: 1.5 }) + T((a + b) / 2, yy + h / 2 + 7, n, { size: 20, col: INK, w: 800 });
  // pre-mRNA
  s += Ci(20, m, 14, C.cap);
  s += Ln(118, m, 298, m, C.intron, 8) + Ln(382, m, 490, m, C.intron, 8);
  s += Ln(266, m, 294, m, C.dna2, 8);
  s += exon(34, 118, 'exon 1', y) + exon(298, 382, 'exon 2', y) + exon(490, 574, 'exon 3', y);
  s += R(574, y + 9, 22, h - 18, C.trna);
  s += T(208, y - 16, 'intron 1', { col: C.intron }) + T(436, y - 16, 'intron 2', { col: C.intron });
  // splicingsignalen in intron 1
  const sig = (x, lx, ly, label, col) => Ln(x, y + h + 2, lx, ly - 22, col, 2) + T(lx, ly, label, { mono: true, size: 20, col, w: 700 });
  s += sig(122, 128, 136, 'GU', C.ok);
  s += sig(246, 222, 136, 'A', C.trna);
  s += sig(280, 280, 170, '(Y)n', C.dna2);
  s += sig(295, 330, 136, 'AG', RED);
  // spliceosoom
  s += arrow(420, 180, 420, 236);
  s += T(438, 214, L({ nl: 'spliceosoom', en: 'spliceosome' }), { anchor: 'start', col: C.muted });
  // rijp mRNA
  const y2 = 256, m2 = y2 + h / 2;
  s += Ci(20, m2, 14, C.cap);
  s += exon(34, 118, 'exon 1', y2) + exon(118, 202, 'exon 2', y2) + exon(202, 286, 'exon 3', y2);
  s += R(286, y2 + 9, 22, h - 18, C.trna);
  s += T(160, y2 + h + 34, 'mRNA');
  // lariat
  s += `<circle cx="440" cy="${m2}" r="32" fill="none" stroke="${C.intron}" stroke-width="7"/>` + Ln(472, m2, 572, m2, C.intron, 7);
  s += Ci(408, m2, 7, C.trna) + T(390, m2 + 7, 'A', { mono: true, col: C.trna, w: 700, anchor: 'end' });
  s += T(480, y2 + h + 34, 'lariat', { col: C.intron });
  return out(600, 336, s, {
    legend: [
      { c: C.rna, t: 'exon', d: L({ nl: 'blijft in het rijpe mRNA', en: 'retained in the mature mRNA' }) },
      { c: C.intron, t: 'intron', d: L({ nl: 'wordt verwijderd', en: 'removed' }) },
      { c: C.cap, t: L({ nl: '5\'-cap', en: '5\' cap' }) },
      { c: C.trna, t: 'poly(A)' },
      { c: C.ok, t: 'GU', d: L({ nl: '5\'-splicingsite', en: '5\' splice site' }) },
      { c: C.trna, t: 'A', d: L({ nl: 'vertakkingspunt (branch point)', en: 'branch point' }) },
      { c: C.dna2, t: '(Y)n', d: L({ nl: 'polypyrimidinestuk', en: 'polypyrimidine tract' }) },
      { c: RED, t: 'AG', d: L({ nl: '3\'-splicingsite', en: '3\' splice site' }) },
    ],
    notes: [
      L({ nl: 'Het spliceosoom voert 2 transesterificaties uit.', en: 'The spliceosome carries out 2 transesterifications.' }),
      L({ nl: 'Het intron komt vrij als lariat (2\'–5\'-binding op het vertakkingspunt-A) en wordt afgebroken.', en: 'The intron is released as a lariat (2\'–5\' bond at the branch-point A) and degraded.' }),
      L({ nl: 'Het mRNA draagt EJC\'s op de exonovergangen. Schematisch, niet op schaal.', en: 'The mRNA carries EJCs at the exon junctions. Schematic, not to scale.' }),
    ],
  });
}

/* ---------------- mtDNA ---------------- */
const MT = [ // [naam, start, einde, streng, type]  (rCRS / MITOMAP)
  ['F', 577, 647, 'H', 't'], ['12S', 648, 1601, 'H', 'r'], ['V', 1602, 1670, 'H', 't'], ['16S', 1671, 3229, 'H', 'r'], ['L', 3230, 3304, 'H', 't'],
  ['ND1', 3307, 4262, 'H', 'p'], ['I', 4263, 4331, 'H', 't'], ['Q', 4329, 4400, 'L', 't'], ['M', 4402, 4469, 'H', 't'], ['ND2', 4470, 5511, 'H', 'p'],
  ['W', 5512, 5579, 'H', 't'], ['A', 5587, 5655, 'L', 't'], ['N', 5657, 5729, 'L', 't'], ['C', 5761, 5826, 'L', 't'], ['Y', 5826, 5891, 'L', 't'],
  ['COX1', 5904, 7445, 'H', 'p'], ['S', 7446, 7514, 'L', 't'], ['D', 7518, 7585, 'H', 't'], ['COX2', 7586, 8269, 'H', 'p'], ['K', 8295, 8364, 'H', 't'],
  ['ATP8', 8366, 8572, 'H', 'p'], ['ATP6', 8527, 9207, 'H', 'p'], ['COX3', 9207, 9990, 'H', 'p'], ['G', 9991, 10058, 'H', 't'], ['ND3', 10059, 10404, 'H', 'p'],
  ['R', 10405, 10469, 'H', 't'], ['ND4L', 10470, 10766, 'H', 'p'], ['ND4', 10760, 12137, 'H', 'p'], ['H', 12138, 12206, 'H', 't'], ['S', 12207, 12265, 'H', 't'],
  ['L', 12266, 12336, 'H', 't'], ['ND5', 12337, 14148, 'H', 'p'], ['ND6', 14149, 14673, 'L', 'p'], ['E', 14674, 14742, 'L', 't'], ['CYTB', 14747, 15887, 'H', 'p'],
  ['T', 15888, 15953, 'H', 't'], ['P', 15956, 16023, 'L', 't'],
];
/* labels: overlappende/aangrenzende genen samen (ATP8/6, ND4L/4) zodat alles leesbaar blijft */
const MT_LABELS = [['12S', 648, 1601], ['16S', 1671, 3229], ['ND1', 3307, 4262], ['ND2', 4470, 5511], ['COX1', 5904, 7445], ['COX2', 7586, 8269],
  ['ATP8/6', 8366, 9207], ['COX3', 9207, 9990], ['ND3', 10059, 10404], ['ND4L/4', 10470, 12137], ['ND5', 12337, 14148], ['CYTB', 14747, 15887]];
function mtdna(L) {
  const N = 16569, cx = 300, cy = 296, rH = 200, rL = 160;
  const ang = p => (p - 1) / N * 2 * Math.PI;
  const col = { p: C.prot, r: C.rrna, t: C.trna };
  let s = '';
  s += `<circle cx="${cx}" cy="${cy}" r="${rH}" fill="none" stroke="${C.dna}" stroke-width="3" stroke-opacity=".6"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${rL}" fill="none" stroke="${C.dna2}" stroke-width="3" stroke-opacity=".6"/>`;
  // controleregio 16024–576
  s += arc(cx, cy, (rH + rL) / 2, ang(16024) - 2 * Math.PI, ang(576), CTRL, rH - rL + 24);
  for (const [, a, b, st, t] of MT) {
    const r = st === 'H' ? rH : rL;
    s += arc(cx, cy, r, ang(a), ang(b), col[t], t === 't' ? 16 : 26);
  }
  const lab = (n, a, b) => ringLabel(cx, cy, rH + (n === 'ATP8/6' ? 50 : 24), (ang(a) + ang(b)) / 2, n, { size: 21, w: 700, col: /S$/.test(n) ? C.rrna : C.prot });
  for (const [n, a, b] of MT_LABELS) s += lab(n, a, b);
  // ND6 (L-streng) binnenin
  s += ringLabel(cx, cy, rL - 26, (ang(14149) + ang(14673)) / 2, 'ND6', { size: 21, w: 700, col: C.prot, inward: true });
  s += ringLabel(cx, cy, rH + 24, 0, 'D-loop', { size: 21, w: 700, col: '#c3cadb' });
  // OH, OL
  const mark = (p, r) => { const a = ang(p); return Ci(cx + r * Math.sin(a), cy - r * Math.cos(a), 7, '#fff', ` stroke="${INK}" stroke-width="2"`); };
  s += mark(191, (rH + rL) / 2) + ringLabel(cx, cy, rL - 30, ang(191), 'O<tspan baseline-shift="sub" font-size="15">H</tspan>', { size: 21, w: 700, inward: true });
  s += mark(5750, rL) + ringLabel(cx, cy, rL - 30, ang(5750), 'O<tspan baseline-shift="sub" font-size="15">L</tspan>', { size: 21, w: 700, inward: true });
  // centrum
  s += T(cx, cy - 12, 'mtDNA', { size: 28, w: 800 });
  s += T(cx, cy + 18, '16 569 bp', { size: 20, mono: true, col: C.muted, w: 500 });
  s += T(cx, cy + 44, L({ nl: '37 genen', en: '37 genes' }), { size: 20, col: C.muted, w: 500 });
  return out(600, 592, s, {
    legend: [
      { c: C.prot, t: L({ nl: '13 eiwitgenen', en: '13 protein genes' }), d: L({ nl: 'complex I (ND1–ND6, ND4L), III (CYTB), IV (COX1–3), V (ATP6, ATP8) van de OXPHOS', en: 'complexes I (ND1–ND6, ND4L), III (CYTB), IV (COX1–3), V (ATP6, ATP8) of OXPHOS' }) },
      { c: C.rrna, t: L({ nl: '2 rRNA-genen', en: '2 rRNA genes' }), d: '12S, 16S' },
      { c: C.trna, t: L({ nl: '22 tRNA-genen', en: '22 tRNA genes' }), d: L({ nl: 'de korte gele streepjes tussen de andere genen (twee voor Leu en twee voor Ser)', en: 'the short yellow ticks between the other genes (two for Leu and two for Ser)' }) },
      { c: CTRL, t: L({ nl: 'controleregio (D-lus)', en: 'control region (D-loop)' }), d: L({ nl: 'promotoren HSP/LSP en OH', en: 'promoters HSP/LSP and OH' }) },
      { c: '#fff', t: 'OH / OL', d: L({ nl: 'replicatieoorsprong van de H- en de L-streng', en: 'origins of replication of the H and L strand' }) },
      { c: C.dna, line: true, t: L({ nl: 'buitenring: H-streng-gecodeerd (28 genen)', en: 'outer ring: H-strand-encoded (28 genes)' }) },
      { c: C.dna2, line: true, t: L({ nl: 'binnenring: L-streng-gecodeerd (9 genen: ND6 + 8 tRNA\'s)', en: 'inner ring: L-strand-encoded (9 genes: ND6 + 8 tRNAs)' }) },
    ],
    notes: [
      L({ nl: 'ATP8/ATP6 en ND4L/ND4 overlappen en hebben daarom één label.', en: 'ATP8/ATP6 and ND4L/ND4 overlap and therefore share one label.' }),
      L({ nl: 'Posities: rCRS (NC_012920), start boven, nummering met de klok mee.', en: 'Positions: rCRS (NC_012920), start at top, numbering runs clockwise.' }),
    ],
  });
}

/* ---------------- plasmide ---------------- */
function plasmid(L) {
  const cx = 272, cy = 236, r = 170;
  const deg = d => d / 360 * 2 * Math.PI;
  let s = '';
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.dna}" stroke-width="9"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r - 12}" fill="none" stroke="${C.dna2}" stroke-width="3" stroke-opacity=".7"/>`;
  const feat = (a0, a1, col, lab, inward = false) => arc(cx, cy, r, deg(a0), deg(a1), col, 26) +
    ringLabel(cx, cy, inward ? r - 34 : r + 28, deg((a0 + a1) / 2), lab, { size: 22, w: 700, col, inward });
  s += feat(20, 60, RED, L({ nl: 'promotor', en: 'promoter' }));
  s += feat(62, 72, C.trna, 'MCS');
  s += feat(74, 140, C.rna, L({ nl: 'gen (insert)', en: 'gene (insert)' }));
  s += feat(142, 160, C.cap, 'pA');
  s += feat(200, 270, C.prot, 'AmpR');
  s += feat(300, 330, C.ok, 'ori');
  s += T(cx, cy - 6, L({ nl: 'expressie-', en: 'expression' }), { size: 24, w: 800 }) + T(cx, cy + 22, L({ nl: 'plasmide', en: 'plasmid' }), { size: 24, w: 800 });
  s += T(cx, cy + 52, '~5 kb', { size: 20, col: C.muted, mono: true, w: 500 });
  return out(600, 450, s, {
    legend: [
      { c: RED, t: L({ nl: 'promotor', en: 'promoter' }), d: L({ nl: 'bv. CMV of T7; voor expressie in menselijke cellen een eukaryote promotor (bv. CMV)', en: 'e.g. CMV or T7; for expression in human cells a eukaryotic promoter (e.g. CMV)' }) },
      { c: C.trna, t: L({ nl: 'MCS (multiple cloning site)', en: 'MCS (multiple cloning site)' }), d: L({ nl: 'knipplaatsen: plaats om een gen in te knippen', en: 'restriction sites: site to insert a gene' }) },
      { c: C.rna, t: L({ nl: 'ingevoegd gen', en: 'insert (gene)' }), d: L({ nl: 'bv. cDNA', en: 'e.g. cDNA' }) },
      { c: C.cap, t: 'pA', d: L({ nl: 'polyadenyleringssignaal na het gen', en: 'polyadenylation signal after the gene' }) },
      { c: C.prot, t: 'AmpR (bla)', d: L({ nl: 'selectiemerker: enkel bacteriën mét plasmide overleven op ampicilline', en: 'selection marker: only bacteria with the plasmid survive on ampicillin' }) },
      { c: C.ok, t: 'ori', d: L({ nl: 'replicatieoorsprong: replicatie in E. coli (kopieaantal)', en: 'origin of replication: replication in E. coli (copy number)' }) },
    ],
    notes: [
      L({ nl: '~5 kb, dubbelstrengig, circulair. Na transfectie blijft het plasmide episomaal.', en: '~5 kb, double-stranded, circular. After transfection the plasmid stays episomal.' }),
      L({ nl: 'Schematisch: posities en groottes zijn illustratief, niet van één bestaande vector.', en: 'Schematic: positions and sizes are illustrative, not of one real vector.' }),
    ],
  });
}

/* ---------------- cDNA ---------------- */
function cdna(L) {
  let s = '';
  const x0 = 150, x1 = 520, x2 = 580;
  const row = (y, n, label) => badge(22, y, n) + T(46, y + 7, label, { anchor: 'start', col: C.muted });
  const strand = (y, col, from = x0, to = x1, w = 9, dash = '') => Ln(from, y, to, y, col, w, dash);
  // 1 mRNA
  let y = 58;
  s += row(y, 1, 'mRNA');
  s += Ci(x0 - 12, y, 10, C.cap) + strand(y, C.rna) + R(x1, y - 7, x2 - x1, 14, C.trna);
  s += T(x0, y - 20, "5'", { mono: true, col: C.muted }) + T(x2 + 6, y - 20, "3'", { mono: true, col: C.muted });
  // 2 primer + RT
  y = 140;
  s += row(y, 2, 'RT');
  s += Ci(x0 - 12, y - 12, 10, C.cap) + strand(y - 12, C.rna) + R(x1, y - 19, x2 - x1, 14, C.trna);
  s += R(x1, y + 1, x2 - x1, 12, C.dna) + strand(y + 7, C.dna, 390, x1) + arrow(390, y + 7, 340, y + 7, C.dna);
  s += T(550, y + 40, 'oligo(dT)', { size: 18, mono: true, col: C.dna2, w: 600 });
  // 3 hybride
  y = 230;
  s += row(y, 3, L({ nl: 'hybride', en: 'hybrid' }));
  s += strand(y - 8, C.rna) + strand(y + 8, C.dna, x0, x2);
  // 4 RNase H
  y = 310;
  s += row(y, 4, 'RNase H');
  for (let x = x0; x < x1; x += 74) s += Ln(x, y - 8, x + 36, y - 8, C.rna, 7, 'stroke-opacity=".75"');
  s += strand(y + 8, C.dna, x0, x2);
  // 5 ds cDNA
  y = 390;
  s += row(y, 5, 'ds cDNA');
  s += strand(y - 8, C.dna2, x0, x2) + strand(y + 8, C.dna, x0, x2);
  return out(600, 420, s, {
    legend: [
      { c: C.rna, line: true, t: 'RNA' },
      { c: C.dna, line: true, t: L({ nl: 'DNA (eerste streng)', en: 'DNA (first strand)' }) },
      { c: C.dna2, line: true, t: L({ nl: 'DNA (tweede streng)', en: 'DNA (second strand)' }) },
      { c: C.cap, t: L({ nl: '5\'-cap', en: '5\' cap' }) },
      { c: C.trna, t: 'poly(A)' },
    ],
    steps: [
      L({ nl: 'mRNA met 5\'-cap en poly(A)-staart.', en: 'mRNA with 5\' cap and poly(A) tail.' }),
      L({ nl: 'RT: een oligo(dT)-primer bindt de poly(A); reverse transcriptase verlengt de primer (5\'→3\').', en: 'RT: an oligo(dT) primer binds the poly(A); reverse transcriptase extends the primer (5\'→3\').' }),
      L({ nl: 'RNA–DNA-hybride (A-achtig).', en: 'RNA–DNA hybrid (A-like).' }),
      L({ nl: 'RNase H: RNA geknipt → de fragmenten dienen als primers.', en: 'RNase H: RNA nicked → the fragments serve as primers.' }),
      L({ nl: 'Dubbelstrengig cDNA: geen intronen, geen promotor.', en: 'Double-stranded cDNA: no introns, no promoter.' }),
    ],
  });
}

/* ---------------- lncRNA ---------------- */
function lncrna(L) {
  let s = '';
  const PW = 290, PH = 262;
  const wave = (x, y, w, col = C.rna) => { let d = `M${f(x)},${f(y)}`; const n = 9; for (let i = 0; i < n; i++) d += ` Q${f(x + (i + .5) * w / n)},${f(y + (i % 2 ? 12 : -12))} ${f(x + (i + 1) * w / n)},${f(y)}`; return `<path d="${d}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`; };
  const panel = (x, y, n, title, ex, art) => R(x, y, PW, PH, 'rgba(16,24,44,.9)', { stroke: C.line, rx: 14 }) +
    badge(x + 26, y + 30, n) + T(x + 50, y + 38, title, { anchor: 'start', size: 23, w: 700 }) + art(x, y) + T(x + PW / 2, y + PH - 22, ex, { col: C.muted, w: 600 });
  const nucl = (x, y) => { let o = Ln(x - 16, y, x + 128, y, C.dna, 4); for (let i = 0; i < 5; i++) o += Ci(x + i * 28, y, 12, CTRL); return o; };
  s += panel(6, 6, 1, L({ nl: 'Gids', en: 'Guide' }), 'XIST → PRC2',
    (x, y) => nucl(x + 30, y + 176) + wave(x + 176, y + 110, 100) + Ci(x + 196, y + 150, 20, C.prot) + arrow(x + 176, y + 160, x + 156, y + 168));
  s += panel(304, 6, 2, L({ nl: 'Steiger', en: 'Scaffold' }), 'NEAT1',
    (x, y) => wave(x + 30, y + 146, 230) + [[72, 116], [145, 176], [218, 116]].map(([px, py], i) => Ci(x + px, y + py, 20, [C.prot, '#6f5bd6', '#c3b1ff'][i])).join(''));
  s += panel(6, 276, 3, L({ nl: 'Lokvogel', en: 'Decoy' }), 'miRNA / RBP',
    (x, y) => wave(x + 30, y + 160, 230) + [80, 145, 210].map(px => R(x + px - 16, y + 110, 32, 22, C.trna, { rx: 4 })).join(''));
  s += panel(304, 276, 4, L({ nl: 'Signaal', en: 'Signal' }), L({ nl: 'in cis', en: 'in cis' }),
    (x, y) => Ln(x + 20, y + 170, x + 270, y + 170, C.dna, 6) + `<ellipse cx="${x + 100}" cy="${y + 170}" rx="34" ry="22" fill="${C.prot}" fill-opacity=".9"/>` +
      wave(x + 112, y + 118, 110) + arrow(x + 190, y + 170, x + 262, y + 170, C.dna2));
  return out(600, 544, s, {
    legend: [
      { c: C.rna, line: true, t: 'lncRNA' },
      { c: C.prot, t: L({ nl: 'eiwit (bv. chromatine-enzym, RNA-polymerase)', en: 'protein (e.g. chromatin enzyme, RNA polymerase)' }) },
      { c: C.trna, t: L({ nl: 'miRNA of RNA-bindend eiwit (RBP)', en: 'miRNA or RNA-binding protein (RBP)' }) },
      { c: CTRL, t: L({ nl: 'nucleosomen op DNA', en: 'nucleosomes on DNA' }) },
    ],
    steps: [
      L({ nl: 'Gids: brengt chromatine-enzymen naar een locus — bv. XIST → PRC2, stillegging van de X.', en: 'Guide: brings chromatin enzymes to a locus — e.g. XIST → PRC2, silencing of the X.' }),
      L({ nl: 'Steiger: brengt meerdere eiwitten samen — bv. NEAT1 in paraspeckles.', en: 'Scaffold: brings several proteins together — e.g. NEAT1 in paraspeckles.' }),
      L({ nl: 'Lokvogel (decoy): vangt eiwitten of miRNA\'s weg van hun eigenlijke doelwit.', en: 'Decoy: sequesters proteins or miRNAs away from their real targets.' }),
      L({ nl: 'Signaal / transcriptie zelf: de daad van transcriptie regelt naburige genen (in cis).', en: 'Signal / transcription itself: the act of transcription regulates neighbouring genes (in cis).' }),
    ],
    notes: [L({ nl: 'Vier klassieke werkingswijzen van lncRNA\'s (schematisch).', en: 'Four classic modes of action of lncRNAs (schematic).' })],
  });
}

/* ---------------- T-DNA ---------------- */
function tdna(L) {
  let s = '';
  s += R(6, 6, 588, 44, 'rgba(240,107,192,.12)', { stroke: C.tdna, rx: 10 });
  s += T(300, 35, L({ nl: 'Plant — niet in de menselijke cel', en: 'Plant — not in the human cell' }), { size: 21, w: 700, col: C.tdna });
  // Ti-plasmide
  const cx = 160, cy = 206, r = 92, deg = d => d / 360 * 2 * Math.PI;
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.dna}" stroke-width="8"/>`;
  s += arc(cx, cy, r, deg(-50), deg(50), C.tdna, 20);
  s += arc(cx, cy, r, deg(150), deg(230), C.prot, 20);
  s += arc(cx, cy, r, deg(255), deg(275), C.ok, 20);
  const lab = (a, t, col) => ringLabel(cx, cy, r + 24, deg(a), t, { size: 21, w: 700, col });
  s += lab(0, 'T-DNA', C.tdna) + lab(-58, 'LB', C.text) + lab(58, 'RB', C.text) + lab(190, 'vir', C.prot) + lab(265, 'ori', C.ok);
  s += T(cx, cy + 2, 'Ti', { size: 24, w: 800 }) + T(cx, cy + 28, '~200 kb', { size: 18, col: C.muted, mono: true, w: 500 });
  s += T(cx, 366, 'Agrobacterium', { size: 20, col: C.muted, w: 500, extra: ' font-style="italic"' });
  // 1: knippen → T-streng
  s += arrow(282, 206, 330, 206) + badge(306, 180, 1);
  const y = 206;
  s += Ln(354, y, 580, y, C.tdna, 7);
  for (let x = 376; x < 580; x += 25) s += Ci(x, y - 14, 9, '#c3b1ff', ' fill-opacity=".85"');
  s += Ci(352, y, 16, C.prot);
  s += T(466, y - 40, L({ nl: 'T-streng', en: 'T-strand' }), { col: C.tdna, w: 700 });
  s += T(352, y + 44, 'VirD2', { col: C.prot, w: 700 }) + T(476, y + 44, 'VirE2', { col: '#c3b1ff', w: 700 });
  // 2: naar de plantencel
  s += arrow(466, 268, 466, 330) + badge(492, 298, 2);
  // plantencel
  s += R(20, 378, 572, 170, 'rgba(127,220,106,.08)', { stroke: C.ok, rx: 18 });
  s += T(40, 410, L({ nl: 'plantencel (kern)', en: 'plant cell (nucleus)' }), { anchor: 'start', col: C.ok, w: 700 });
  s += Ln(50, 470, 562, 470, C.dna, 8) + Ln(50, 484, 562, 484, C.dna2, 5);
  s += R(246, 460, 130, 34, C.tdna, { rx: 5 }) + T(311, 484, 'T-DNA', { size: 21, w: 800, col: INK });
  s += badge(222, 440, 3);
  s += T(306, 530, L({ nl: 'plantenchromosoom', en: 'plant chromosome' }), { col: C.muted, w: 500 });
  return out(600, 560, s, {
    legend: [
      { c: C.tdna, t: 'T-DNA', d: L({ nl: 'tussen de grenssequenties LB en RB', en: 'between the border sequences LB and RB' }) },
      { c: C.prot, t: L({ nl: 'vir-genen', en: 'vir genes' }) },
      { c: C.ok, t: 'ori' },
      { c: C.dna, line: true, t: L({ nl: 'Ti-plasmide (~200 kb) in Agrobacterium tumefaciens', en: 'Ti plasmid (~200 kb) in Agrobacterium tumefaciens' }) },
    ],
    steps: [
      L({ nl: 'VirD1/D2 knippen; VirD2 blijft aan het 5\'-uiteinde van de T-streng.', en: 'VirD1/D2 nick; VirD2 stays attached to the 5\' end of the T-strand.' }),
      L({ nl: 'De enkelstrengige T-streng, bedekt met VirE2, gaat via type IV-secretie naar de plantencel → kern.', en: 'The single-stranded T-strand, coated with VirE2, goes by type IV secretion to the plant cell → nucleus.' }),
      L({ nl: 'Geïntegreerd in een plantenchromosoom (dubbelstrengig).', en: 'Integrated into a plant chromosome (double-stranded).' }),
    ],
    notes: [L({ nl: 'Plant & biotechnologie — dit gebeurt niet in de menselijke cel.', en: 'Plant & biotechnology — this does not happen in the human cell.' })],
  });
}

export const DIAGRAMS = { mrna, premrna, mtdna, plasmid, cdna, lncrna, tdna };

/* HTML-legende onder het schema (gewone tekst, leesbaar formaat) */
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
export function diagramLegend(d) {
  const sw = it => `<i class="${it.line ? 'ln' : ''}" style="background:${it.c};${it.op ? `opacity:${it.op};` : ''}"></i>`;
  const items = (d.legend ?? []).map(it => `<li>${sw(it)}<span><b>${esc(it.t)}</b>${it.d ? ` — ${esc(it.d)}` : ''}</span></li>`).join('');
  const steps = (d.steps ?? []).map(t => `<li>${esc(t)}</li>`).join('');
  const notes = (d.notes ?? []).map(t => `<p>${esc(t)}</p>`).join('');
  return (items ? `<ul class="dl">${items}</ul>` : '') + (steps ? `<ol class="ds">${steps}</ol>` : '') + (notes ? `<div class="dn">${notes}</div>` : '');
}
