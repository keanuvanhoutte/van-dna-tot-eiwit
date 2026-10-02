import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { BASEDEF, place, drawBase, hbonds, hbond, hOf, dock, dist } from './_b_chem.js';
import { buildHelix, drawHelix } from './_b_helix.js';

/* Watson–Crick-geometrie: purine links, pyrimidine rechts (middelpunten 5,7 Å uit elkaar → N1···N3 ≈ 2,9 Å) */
const D = 5.7, S = 42, OX = 800 - 1.65 * S, OY = 440;
const V = { S, ox: OX, oy: OY };
const pA = place(BASEDEF.A), pT = place(BASEDEF.T, { tx: D }), pG = place(BASEDEF.G), pC = place(BASEDEF.C, { tx: D });
const WC_AT = [['N6', 0, 'O4'], ['N3', 1, 'N1']];
const WC_GC = [['N4', 1, 'O6'], ['N1', 0, 'N3'], ['N2', 0, 'O2']];
/* Hoogsteen: adenine draait syn (180° rond de glycosidische binding) en biedt N7/N6 aan thymine */
const HOOG = dock(BASEDEF.A, [['N7', pT.A.N3, 2.9], ['N6', pT.A.O4, 2.95]], { f: -1, avoid: Object.values(pT.A) });
/* wobble G·U: uracil ~2,4 Å naar de grote groef verschoven: G O6···H-N3 U en G N1-H···O2 U */
const WOB = { tx: D, ty: 1.732 * 1.4 };
const pU = place(BASEDEF.U, WOB);

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const CAMP = cam(800, 430, 1050);
const STEPS = [
  ST(8000, CAMP, 'A paart met T', 'A pairs with T', 'A (twee ringen) paart met T (één ring) via twee waterstofbruggen.', 'A (two rings) pairs with T (one ring) through two hydrogen bonds.'),
  ST(8000, CAMP, 'G paart met C', 'G pairs with C', 'G paart met C via drie waterstofbruggen. GC-rijk DNA gaat moeilijker open, vooral omdat die paren beter stapelen.', 'G pairs with C through three hydrogen bonds. GC-rich DNA comes apart less easily, mainly because those pairs stack better.'),
  ST(8500, cam(800, 420, 1400), 'Elk paar is even breed', 'Every pair is equally wide', "Een paar heeft altijd één base met twee ringen en één met één ring. Zo is elk paar even breed.", "A pair always has one base with two rings and one with one ring. So every pair is equally wide."),
  ST(8500, CAMP, 'Twee randen, twee groeven', 'Two edges, two grooves', 'In de grote groef toont elk basenpaar een eigen patroon. Eiwitten lezen dat zonder het DNA te openen.', 'In the major groove each base pair shows its own pattern. Proteins read it without opening the DNA.'),
  ST(8000, FULL, 'Evenveel A als T, G als C', "As much A as T, G as C", 'In DNA is er evenveel A als T, en evenveel G als C. Bij de mens is ongeveer 41 % van de basen G of C.', 'In DNA there is as much A as T, and as much G as C. In humans about 41% of the bases are G or C.'),
  ST(8000, cam(800, 430, 1150), 'Basen op een stapel', 'Bases in a stack', 'De basenparen liggen plat op elkaar. Dat stapelen houdt de helix sterker samen dan de waterstofbruggen.', 'The base pairs lie flat on top of each other. This stacking holds the helix together more strongly than the hydrogen bonds.'),
  ST(9000, CAMP, 'Paren via een andere kant', 'Pairing along another edge', "Een A of G kan omdraaien en via een andere kant paren (Hoogsteen-paring), zoals in triplexen en G-kwartetten.", "An A or G can flip round and pair along another edge (Hoogsteen pairing), as in triplexes and G-quartets."),
  ST(8500, CAMP, 'In RNA: G met U', 'In RNA: G with U', 'In RNA kan G ook met U paren. Zo kan één tRNA meer dan één codon (drieletterwoord) lezen.', 'In RNA, G can also pair with U. This lets one tRNA read more than one codon (three-letter word).'),
  ST(8000, FULL, 'Kort samengevat', 'In short', 'De gewone paren A–T en G–C bouwen de helix. Andere paringen maken andere vormen mogelijk.', 'The usual pairs A–T and G–C build the helix. Other pairings make other shapes possible.'),
];

export default {
  id: 'basenparing',
  title: { nl: 'Basenparing', en: 'Base pairing' },
  scale: { nl: '≈ 1 nm (één basenpaar)', en: '≈ 1 nm (one base pair)' },
  time: { nl: 'basenparen openen spontaan, één voor één: levensduur ≈ ms', en: 'base pairs open spontaneously, one at a time: lifetime ≈ ms' },
  org: { nl: 'alle organismen', en: 'all organisms' },
  legend: [[BASE.A, 'adenine'], [BASE.T, 'thymine / uracil'], [BASE.G, 'guanine'], [BASE.C, 'cytosine'], ['#8fb3ff', { nl: 'N (stikstof)', en: 'N (nitrogen)' }], ['#ff8f8f', { nl: 'O (zuurstof)', en: 'O (oxygen)' }], ['#fff', { nl: '- - - waterstofbrug', en: '- - - hydrogen bond' }], [C.dna, "C1' (suiker)"]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Kekulé-structuren van de gebruikelijke (amino/keto) tautomeren. De Hoogsteen-positie is niet getekend maar berekend: het programma zoekt de ligging waarin N7 en N6 op ≈ 2,9 Å van N3 en O4 van thymine liggen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Kekulé structures of the usual (amino/keto) tautomers. The Hoogsteen position is not drawn by hand but computed: the program searches the placement in which N7 and N6 lie ≈ 2.9 Å from N3 and O4 of thymine.</p>' },
  simplified: {
    nl: 'Ringen zijn als regelmatige veelhoeken getekend (echte bindingslengtes en -hoeken verschillen licht), waardoor de getekende C1\'–C1\'-afstand iets groter is dan de werkelijke ≈ 10,5 Å. Waterstofatomen op koolstof zijn weggelaten. De percentages van Chargaff gelden voor het hele menselijke genoom; lokaal varieert het GC-gehalte sterk (isochoren, CpG-eilanden).',
    en: 'Rings are drawn as regular polygons (real bond lengths and angles differ slightly), so the drawn C1\'–C1\' distance is a little larger than the real ≈ 10.5 Å. Hydrogens on carbon are omitted. Chargaff percentages apply to the whole human genome; locally the GC content varies strongly (isochores, CpG islands).' },
  steps: STEPS,
  svg() {
    const menu = (x, y, node, nl, en, col, w = 340) => `<g data-node="${node}" data-nolabel><rect x="${x - w / 2}" y="${y - 28}" width="${w}" height="56" rx="28" fill="#0d1426" stroke="${col}" stroke-width="3"/><circle cx="${x - w / 2 + 28}" cy="${y}" r="8" fill="${col}"/><text x="${x + 12}" y="${y + 8}" font-size="22" text-anchor="middle" fill="#e8edf7" font-family="Inter" font-weight="600">${T2(nl, en)}</text></g>`;
    return svgOpen() + `
    <g id="bp-main"></g>
    <g id="bp-ann"></g>
    <g id="bp-hs-codon" data-node="codon" data-color="${C.rna}" data-label="${T2('Codon–anticodon (wobble)', 'Codon–anticodon (wobble)')}"><circle id="bp-a-codon" data-anchor="codon" cx="800" cy="210" r="30" fill="transparent"/></g>
    <g id="bp-hs-nc" data-node="noncanon" data-color="${BASE.T}" data-label="${T2('Hoogsteen → triplex & G-quadruplex', 'Hoogsteen → triplex & G-quadruplex')}"><circle id="bp-a-nc" data-anchor="noncanon" cx="640" cy="215" r="30" fill="transparent"/></g>
    <g id="bp-menu">
      ${menu(430, 710, 'nucleotide', 'Bouwstenen: nucleotide', 'Building blocks: nucleotide', '#c9a574', 400)}
      ${menu(800, 780, 'dnahelix', '↑ De dubbelhelix', '↑ The double helix', C.dna)}
      ${menu(1170, 710, 'noncanon', 'G-quadruplex, triplex…', 'G-quadruplex, triplex…', BASE.T, 400)}
      ${menu(470, 150, 'codon', 'Codon & anticodon', 'Codon & anticodon', C.rna)}
      ${menu(1130, 150, 'dnavormen', 'A-, B- en Z-DNA', 'A-, B- and Z-DNA', C.dna2)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const X = (v, p) => v.ox + p[0] * v.S, Y = (v, p) => v.oy - p[1] * v.S;
    const NAMES = new Set(['N1', 'N3', 'N6', 'O4', 'O6', 'N4', 'N2', 'O2', 'N7', 'N9']);
    const pairSVG = (p0, p1, list, v, o = {}) => drawBase(p0, v, { col: BASE[p0.def.kind], names: o.names ?? NAMES, op: o.op ?? 1, fs: o.fs, c1text: o.c1text }) +
      drawBase(p1, v, { col: BASE[p1.def.kind], names: o.names ?? NAMES, op: o.op ?? 1, fs: o.fs, c1text: o.c1text }) + hbonds(p0, p1, list, v, (o.hb ?? 1) * (o.op ?? 1));
    const tag = (x, y, s, col, fs = 24, anchor = 'middle') => txt(x, y, s, col, fs, anchor, 700);
    const c1c1 = (a, b, v, label, op = 1, dy = -70) => {
      const p = a.A["C1'"], q = b.A["C1'"];
      const x1 = X(v, p), y1 = Y(v, p), x2 = X(v, q), y2 = Y(v, q), yy = Math.max(y1, y2) - dy * -1 + 0;
      const yl = Math.max(y1, y2) + 46;
      return `<g opacity="${f1(op)}"><path d="M${f1(x1)},${f1(y1 + 16)} V${f1(yl)} M${f1(x2)},${f1(y2 + 16)} V${f1(yl)}" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 4"/>
        <path d="M${f1(x1)},${f1(yl)} H${f1(x2)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt((x1 + x2) / 2, yl + 32, label, '#fff', 24, 'middle', 700)}</g>`;
    };
    return {
      update(t, s) {
        const { step, p } = s;
        let m = '', ann = '';
        if (step === 0 || step === 1) {
          const kx = step === 1 ? ease(sub(p, 0, .25)) : 0;
          if (kx < .99) m += pairSVG(pA, pT, WC_AT, V, { op: 1 - kx, hb: step === 0 ? ease(sub(p, .25, .5)) : 1 });
          if (kx > .01) m += pairSVG(pG, pC, WC_GC, V, { op: kx, hb: ease(sub(p, .3, .55)) });
          const L1 = step === 0 ? T2('adenine (purine)', 'adenine (purine)') : T2('guanine (purine)', 'guanine (purine)');
          const L2 = step === 0 ? T2('thymine (pyrimidine)', 'thymine (pyrimidine)') : T2('cytosine (pyrimidine)', 'cytosine (pyrimidine)');
          ann += tag(X(V, [-1.2, 0]), Y(V, [0, 4.6]), L1, step === 0 ? BASE.A : BASE.G, 26) + tag(X(V, [D + .6, 0]), Y(V, [0, 4.6]), L2, step === 0 ? BASE.T : BASE.C, 26);
          const n = step === 0 ? 2 : 3, k = step === 0 ? ease(sub(p, .5, .7)) : ease(sub(p, .55, .75));
          ann += `<g opacity="${f1(k)}">${tag(X(V, [2.85, 0]), Y(V, [0, -4.7]), T2(`${n} waterstofbruggen (≈ 2,9 Å)`, `${n} hydrogen bonds (≈ 2.9 Å)`), '#fff', 26)}</g>`;
        } else if (step === 2) {
          const v1 = { S: 46, ox: 379, oy: 380 }, v2 = { S: 46, ox: 1069, oy: 380 };
          m += pairSVG(pA, pT, WC_AT, v1, { fs: 24, names: new Set() }) + pairSVG(pG, pC, WC_GC, v2, { fs: 24, names: new Set() });
          ann += tag(X(v1, [1.6, 0]), 172, 'A–T', '#fff', 38) + tag(X(v2, [1.6, 0]), 172, 'G–C', '#fff', 38);
          const k = ease(sub(p, .2, .45));
          ann += c1c1(pA, pT, v1, "C1′–C1′ ≈ 10,5 Å".replace(',', L({ nl: ',', en: '.' })), k) + c1c1(pG, pC, v2, "C1′–C1′ ≈ 10,5 Å".replace(',', L({ nl: ',', en: '.' })), k);
          const k2 = ease(sub(p, .55, .8));
          ann += `<g opacity="${f1(k2)}">${txt(800, 680, T2('purine + pyrimidine = zelfde breedte', 'purine + pyrimidine = same width'), '#fff', 32)}</g>`;
        } else if (step === 3) {
          m += pairSVG(pG, pC, WC_GC, V, { names: new Set() });
          const k1 = ease(sub(p, .05, .3)), k2 = ease(sub(p, .3, .55)), k3 = ease(sub(p, .55, .8));
          // kleine groef onderaan (suikerkant), grote groef bovenaan
          ann += `<g opacity="${f1(k1)}"><rect x="${f1(X(V, [-4.8, 0]))}" y="${f1(Y(V, [0, -1.6]))}" width="${f1(13.2 * S)}" height="${f1(1.9 * S)}" rx="18" fill="#ffc247" fill-opacity=".12" stroke="#ffc247" stroke-dasharray="7 6"/>
            ${tag(X(V, [1.65, 0]), Y(V, [0, -4.2]), T2('kleine groef (kant van de suikers)', 'minor groove (sugar side)'), '#ffc247', 26)}</g>`;
          ann += `<g opacity="${f1(k2)}"><rect x="${f1(X(V, [-4.8, 0]))}" y="${f1(Y(V, [0, 3.3]))}" width="${f1(13.2 * S)}" height="${f1(1.9 * S)}" rx="18" fill="#7fdc6a" fill-opacity=".12" stroke="#7fdc6a" stroke-dasharray="7 6"/>
            ${tag(X(V, [1.65, 0]), Y(V, [0, 4.1]), T2('grote groef', 'major groove'), '#7fdc6a', 26)}</g>`;
          // donor/acceptor-code
          const mark = (pl, k, kind) => { const q = pl.A[k]; const col = kind === 'A' ? '#ff8f8f' : '#8fb3ff'; return `<circle cx="${f1(X(V, q))}" cy="${f1(Y(V, q))}" r="24" fill="none" stroke="${col}" stroke-width="4"/>${txt(X(V, q) + (k === 'N7' ? -30 : k === 'N4' ? 46 : 30), Y(V, q) + (k === 'N4' ? 8 : -22), kind, col, 22, 'middle', 800)}`; };
          ann += `<g opacity="${f1(k3)}">${mark(pG, 'N7', 'A')}${mark(pG, 'O6', 'A')}${mark(pC, 'N4', 'D')}${mark(pG, 'N3', 'A')}${mark(pG, 'N2', 'D')}${mark(pC, 'O2', 'A')}
            ${txt(800, Y(V, [0, -5.6]), T2('A = H-brugacceptor · D = H-brugdonor', 'A = H-bond acceptor · D = H-bond donor'), C.text, 24)}</g>`;
        } else if (step === 4) {
          const bars = [['A', 29.5], ['T', 29.5], ['G', 20.5], ['C', 20.5]], k = ease(sub(p, .05, .5));
          const x0 = 470, w = 120, gap = 50, yb = 640, hmax = 380 / 30;
          bars.forEach(([b, v], i) => {
            const x = x0 + i * (w + gap), h = v * hmax * k;
            // omtrek van de volledige staaf staat er vanaf p = 0; de vulling groeit erin
            ann += `<rect x="${x}" y="${f1(yb - v * hmax)}" width="${w}" height="${f1(v * hmax)}" rx="8" fill="${BASE[b]}" fill-opacity=".3" stroke="${BASE[b]}" stroke-width="2.5"/><rect x="${x}" y="${f1(yb - h)}" width="${w}" height="${f1(h)}" rx="8" fill="${BASE[b]}"/>` + txt(x + w / 2, yb + 44, b, BASE[b], 36, 'middle', 800, 'JetBrains Mono') +
              txt(x + w / 2, yb - v * hmax - 16, `${v.toFixed(1).replace('.', L({ nl: ',', en: '.' }))} %`, '#fff', 24);
          });
          ann += `<path d="M${x0 - 20},${yb} H${x0 + 4 * (w + gap) - 30}" stroke="${C.muted}" stroke-width="2"/>`;
          const k2 = ease(sub(p, .5, .75));
          ann += `<g opacity="${f1(lerp(.3, 1, k2))}">${txt(1250, 330, 'A = T', BASE.A, 48, 'middle', 800, 'JetBrains Mono')}${txt(1250, 400, 'G = C', BASE.G, 48, 'middle', 800, 'JetBrains Mono')}
            ${txt(1250, 470, T2('A + G = T + C', 'A + G = T + C'), C.muted, 30, 'middle', 700, 'JetBrains Mono')}${txt(1250, 530, T2('(purines = pyrimidines)', '(purines = pyrimidines)'), C.muted, 22)}</g>`;
          ann += txt(800, 190, T2('Basensamenstelling van het menselijk genoom', 'Base composition of the human genome'), C.text, 30);
        } else if (step === 5) {
          // gestapelde basenparen als platen, schuin van boven bekeken; elk paar ≈ 34° gedraaid t.o.v. het vorige
          const el = 22 * Math.PI / 180, SS = 34, cx = 760, cy = 470, pairs = ['GC', 'AT', 'TA', 'CG', 'GC'];
          const spin = 20 + p * 50;
          for (let i = 0; i < pairs.length; i++) {
            const th = (spin + i * 34.3) * Math.PI / 180, z = (i - 2) * 3.4, c = Math.cos(th), sn = Math.sin(th);
            const P = (x, y) => [cx + (x * c - y * sn) * SS, cy - z * SS * Math.cos(el) + (x * sn + y * c) * SS * Math.sin(el)];
            const half = (x0, x1, col) => { const q = [P(x0, -1.7), P(x1, -1.7), P(x1, 1.7), P(x0, 1.7)]; return `<polygon points="${q.map(r => f1(r[0]) + ',' + f1(r[1])).join(' ')}" fill="${col}" fill-opacity=".9" stroke="#0b1224" stroke-width="2"/>`; };
            const [b1, b2] = pairs[i].split('');
            m += half(-5.4, 0, BASE[b1]) + half(0, 5.4, BASE[b2]);
            const lb = P(-2.7, 0), rb = P(2.7, 0);
            m += txt(lb[0], lb[1] + 8, b1, '#0a1224', 22, 'middle', 800, 'JetBrains Mono') + txt(rb[0], rb[1] + 8, b2, '#0a1224', 22, 'middle', 800, 'JetBrains Mono');
          }
          const y0 = cy + 1 * 3.4 * SS * Math.cos(el) - 0, y1 = y0 - 3.4 * SS * Math.cos(el);
          ann += `<g opacity="${f1(ease(sub(p, .15, .35)))}"><path d="M1060,${f1(y0)} V${f1(y1)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt(1080, (y0 + y1) / 2 + 9, '3,4 Å'.replace(',', L({ nl: ',', en: '.' })), '#fff', 28, 'start', 700)}${txt(1080, (y0 + y1) / 2 + 40, T2('≈ 34° gedraaid', 'turned ≈ 34°'), C.muted, 20, 'start')}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .4, .6)))}">${txt(800, 180, T2('π-stapeling van de vlakke ringen', 'π-stacking of the flat rings'), C.text, 28)}</g>`;
        } else if (step === 6) {
          const kf = ease(sub(p, .05, .4)), km = ease(sub(p, .4, .7));
          const f = Math.cos(Math.PI * kf);
          const pl = place(BASEDEF.A, { tx: lerp(0, HOOG.tx, km), ty: lerp(0, HOOG.ty, km), rot: lerp(0, HOOG.rot, km), f });
          m += drawBase(pl, V, { col: BASE.A, names: NAMES }) + drawBase(pT, V, { col: BASE.T, names: NAMES });
          const hk = ease(sub(p, .7, .85));
          m += hbond(hOf(pT, 'N3', pl.A.N7), pl.A.N7, V, hk) + hbond(hOf(pl, 'N6', pT.A.O4), pT.A.O4, V, hk);
          ann += tag(X(V, [0, 0]), Y(V, [0, 5.1]), kf < .5 ? 'anti' : 'syn', BASE.A, 28);
          if (kf > 0 && kf < 1) ann += txt(X(V, pA.A["C1'"]) - 10, Y(V, pA.A["C1'"]) + 60, T2('180° rond N9–C1′', '180° about N9–C1′'), C.muted, 22, 'middle');
          ann += `<g opacity="${f1(hk)}">${tag(X(V, [2.4, 0]), Y(V, [0, -4.9]), T2("Hoogsteen A·T: C1′–C1′ ≈ 8,5 Å", "Hoogsteen A·T: C1′–C1′ ≈ 8.5 Å"), '#fff', 26)}</g>`;
        } else if (step === 7) {
          const k = ease(sub(p, .05, .35));
          const pl = place(BASEDEF.U, { tx: D, ty: WOB.ty * k });
          m += drawBase(pG, V, { col: BASE.G, names: NAMES }) + drawBase(pl, V, { col: BASE.U, names: NAMES });
          const hk = ease(sub(p, .35, .5));
          m += hbond(hOf(pl, 'N3', pG.A.O6), pG.A.O6, V, hk) + hbond(hOf(pG, 'N1', pl.A.O2), pl.A.O2, V, hk);
          ann += tag(X(V, [-1.2, 0]), Y(V, [0, 4.6]), 'guanine', BASE.G, 26) + tag(X(V, [D + 2.6, 0]), Y(V, [0, 1.6 + WOB.ty * k]), 'uracil', BASE.U, 26, 'start');
          ann += `<g opacity="${f1(ease(sub(p, .5, .7)))}">${tag(X(V, [2.6, 0]), Y(V, [0, -4.8]), T2('G·U wobble: 2 H-bruggen', 'G·U wobble: 2 H-bonds'), '#fff', 26)}</g>`;
        } else if (step === 8) {
          const SS = 30, o8 = { names: new Set(), fs: 22, c1text: false };
          const v1 = { S: SS, ox: 330 - 1.7 * SS, oy: 450 }, v2 = { S: SS, ox: 800 - 1.7 * SS, oy: 450 }, v3 = { S: SS, ox: 1270 - 1.7 * SS, oy: 450 };
          const pl = place(BASEDEF.A, HOOG);
          m += pairSVG(pG, pC, WC_GC, v1, o8) + drawBase(pl, v2, { ...o8, col: BASE.A }) + drawBase(pT, v2, { ...o8, col: BASE.T }) +
            hbond(hOf(pT, 'N3', pl.A.N7), pl.A.N7, v2) + hbond(hOf(pl, 'N6', pT.A.O4), pT.A.O4, v2) +
            drawBase(pG, v3, { ...o8, col: BASE.G }) + drawBase(pU, v3, { ...o8, col: BASE.U }) + hbond(hOf(pU, 'N3', pG.A.O6), pG.A.O6, v3) + hbond(hOf(pG, 'N1', pU.A.O2), pU.A.O2, v3);
          ann += txt(330, 262, 'Watson–Crick', '#fff', 30) + txt(800, 262, 'Hoogsteen', '#fff', 30) + txt(1270, 262, T2('wobble (RNA)', 'wobble (RNA)'), '#fff', 30);
          ann += txt(330, 622, T2('dubbelhelix', 'double helix'), C.muted, 24) + txt(800, 622, T2('triplex, G-quadruplex', 'triplex, G-quadruplex'), C.muted, 24) + txt(1270, 622, T2('tRNA, rRNA', 'tRNA, rRNA'), C.muted, 24);
        }
        $('bp-main').innerHTML = m; $('bp-ann').innerHTML = ann;
        vis('bp-hs-codon', step === 7 ? sub(p, .6, .7) : 0);
        vis('bp-hs-nc', step === 6 ? sub(p, .85, .95) : 0);
        vis('bp-menu', step === 8 ? ease(sub(p, .2, .4)) : 0);
      },
    };
  },
};
