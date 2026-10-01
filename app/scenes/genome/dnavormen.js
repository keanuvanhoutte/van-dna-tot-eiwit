import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, f1, SPIN } from '../../kit.js';
import { buildHelix, drawHelix, grooveFront } from './_b_helix.js';

/* drie helices, zelfde schaal (S px/Å) en zelfde aantal basenparen → lengteverschil is echt */
const S = 9.5, NBP = 16, CY = 440;
const HX = {
  A: { x: 330, H: buildHelix('A', 'GCATGGCCATGCAGTC'), col: '#ffb27a' },
  B: { x: 800, H: buildHelix('B', 'GCATGGCCATGCAGTC'), col: C.dna },
  Z: { x: 1270, H: buildHelix('Z', 'CGCGCGCGCGCGCGCG'), col: '#f06bc0' },
};
const dec = s => s.replace(/(\d),(\d)/g, L({ nl: '$1,$2', en: '$1.$2' }));
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const STEPS = [
  ST(8000, FULL, 'Eén molecuul, drie vormen', 'One molecule, three shapes', 'Dezelfde dubbelhelix kan verschillende conformaties aannemen. Hier drie helices van 16 bp op dezelfde schaal: A-, B- en Z-DNA.', 'The same double helix can adopt different conformations. Here three 16-bp helices at the same scale: A-, B- and Z-DNA.'),
  ST(9000, cam(1000, 400, 1150), 'B-DNA: de standaardvorm', 'B-DNA: the standard form', 'Rechtshandig, ≈ 10,5 bp per winding, 3,4 Å per bp, ≈ 20 Å breed. Suikers C2′-endo, basen anti en loodrecht op de as. Brede, diepe grote groef.', 'Right-handed, ≈ 10.5 bp per turn, 3.4 Å per bp, ≈ 20 Å wide. Sugars C2′-endo, bases anti and perpendicular to the axis. Wide, deep major groove.'),
  ST(9000, cam(560, 430, 1150), 'A-DNA: korter en breder', 'A-DNA: shorter and wider', 'Rechtshandig, ≈ 11 bp per winding, ≈ 2,6 Å per bp, ≈ 23 Å breed. Suikers C3′-endo; basenparen ≈ 20° gekanteld en van de as weggeschoven. Grote groef smal en diep, kleine groef breed en ondiep.', 'Right-handed, ≈ 11 bp per turn, ≈ 2.6 Å per bp, ≈ 23 Å wide. Sugars C3′-endo; base pairs tilted ≈ 20° and pushed off the axis. Major groove narrow and deep, minor groove wide and shallow.'),
  ST(9000, cam(1000, 400, 1150), 'Z-DNA: linkshandig zigzag', 'Z-DNA: left-handed zigzag', 'Linkshandig, 12 bp per winding, ≈ 3,7 Å per bp, ≈ 18 Å breed. De herhalende eenheid is een dinucleotide: G syn (C3′-endo), C anti (C2′-endo) → zigzaggende ruggengraat.', 'Left-handed, 12 bp per turn, ≈ 3.7 Å per bp, ≈ 18 Å wide. The repeating unit is a dinucleotide: G syn (C3′-endo), C anti (C2′-endo) → zigzag backbone.'),
  ST(8500, FULL, 'Spoed en draairichting', 'Pitch and handedness', 'Eén volledige winding is ≈ 28 Å (A), ≈ 36 Å (B) en ≈ 45 Å (Z). A en B draaien rechtsom, Z linksom.', 'One full turn is ≈ 28 Å (A), ≈ 36 Å (B) and ≈ 45 Å (Z). A and B turn right-handed, Z left-handed.'),
  ST(8500, cam(800, 430, 1300), 'Langs de as bekeken', 'Viewed down the axis', 'In A-DNA liggen de basenparen naast de as: er ontstaat een holte in het midden. In B-DNA loopt de as door de basenparen.', 'In A-DNA the base pairs lie beside the axis: a hollow core appears. In B-DNA the axis runs through the base pairs.'),
  ST(9500, FULL, 'Vergelijking', 'Comparison', 'De kernverschillen op een rij (groeven en diameter: zie de vorige stappen). C3′-endo brengt de fosfaten van één streng dichter bij elkaar (≈ 5,9 i.p.v. ≈ 7,0 Å).', 'The key differences side by side (grooves and diameter: see the previous steps). C3′-endo brings the phosphates of one strand closer together (≈ 5.9 instead of ≈ 7.0 Å).'),
  ST(8500, FULL, 'Waar komt welke vorm voor?', 'Where does each form occur?', 'B: bijna al het DNA. A: dsRNA en RNA–DNA-hybriden (transcriptie, primers), of DNA bij weinig water. Z: alternerende (CG)n bij hoog zout of negatieve supercoiling; herkend door Zα (ADAR1, ZBP1).', 'B: almost all DNA. A: dsRNA and RNA–DNA hybrids (transcription, primers), or DNA at low water activity. Z: alternating (CG)n at high salt or negative supercoiling; recognised by Zα (ADAR1, ZBP1).'),
  ST(7000, FULL, 'Bekijk ze in 3D', 'Explore them in 3D', 'Open de atlas voor de echte kristalstructuren (440D, 1BNA, 1DCG) om zelf te draaien en te meten.', 'Open the atlas for the real crystal structures (440D, 1BNA, 1DCG) to rotate and measure yourself.'),
];

export default {
  id: 'dnavormen',
  title: { nl: 'DNA-conformaties A, B, Z', en: 'A-, B- and Z-DNA' },
  scale: { nl: '≈ 2 nm breed · 16 bp', en: '≈ 2 nm wide · 16 bp' },
  time: { nl: 'overgangen B ↔ Z/A: ms – min', en: 'B ↔ Z/A transitions: ms – min' },
  org: { nl: 'alle organismen (in vitro gedefinieerd)', en: 'all organisms (defined in vitro)' },
  legend: [[C.dna, { nl: 'streng I', en: 'strand I' }], [C.dna2, { nl: 'streng II', en: 'strand II' }], ['#ff9f43', { nl: 'fosfaat', en: 'phosphate' }], ['#c9a574', { nl: 'suiker', en: 'sugar' }], [BASE.A, 'A'], [BASE.T, 'T'], [BASE.G, 'G'], [BASE.C, 'C']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De drie modellen zijn berekend, niet getekend: basenpaarhoogte, twist, verplaatsing van de basenparen, inclinatie en de ligging van fosfaat en C1′ zijn afgeleid uit de kristalstructuren 440D (A), 1BNA (B) en 1DCG (Z) en afgerond naar handboekwaarden. Handboekwaarden variëren licht tussen bronnen (bv. A-DNA 2,3–2,6 Å/bp, 23–26 Å breed).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The three models are computed, not drawn: base-pair rise, twist, base-pair displacement, inclination and the positions of phosphate and C1′ were derived from the crystal structures 440D (A), 1BNA (B) and 1DCG (Z) and rounded to textbook values. Textbook values differ slightly between sources (e.g. A-DNA 2.3–2.6 Å/bp, 23–26 Å wide).</p>' },
  simplified: {
    nl: 'Geïdealiseerde, rechte helices met gemiddelde parameters; basen als staafjes. Z-DNA is sterk vereenvoudigd: de zigzag wordt benaderd door afwisselend −9° en −51° twist en twee fosfaatposities per dinucleotide. In cellen zijn A- en Z-vormen lokaal en tijdelijk; de kristalstructuren zijn korte stukjes (6–12 bp).',
    en: 'Idealised straight helices with average parameters; bases as bars. Z-DNA is strongly simplified: the zigzag is approximated by alternating −9° and −51° twist and two phosphate positions per dinucleotide. In cells A and Z forms are local and transient; the crystal structures are short pieces (6–12 bp).' },
  steps: STEPS,
  svg() {
    const btn = (x, y, id, nl, en, col) => `<g data-node="dnavormen" data-href="../atlas/index.html?id=${id}" data-nolabel class="vf-at"><rect x="${x - 125}" y="${y - 25}" width="250" height="50" rx="25" fill="#0d1426" stroke="${col}" stroke-width="3"/><text x="${x}" y="${y + 8}" font-size="21" text-anchor="middle" fill="${col}" font-family="Inter" font-weight="700">${T2(nl, en)}</text></g>`;
    return svgOpen() + `<g id="vf-main"><g id="vf-mA"></g><g id="vf-mB" data-node="dnahelix" data-color="${C.dna}" data-nolabel></g><g id="vf-mZ"></g></g><g id="vf-ann"></g>
      <g id="vf-hs-rna" data-node="rnastructuur" data-color="${C.rna}" data-label="${T2('dsRNA is A-vorm → RNA-structuur', 'dsRNA is A-form → RNA structure')}"><circle data-anchor="rnastructuur" cx="330" cy="150" r="20" fill="transparent"/></g>
      <g id="vf-hs-sc" data-node="supercoiling" data-color="${C.dna}" data-label="${T2('Z-DNA ← negatieve supercoiling', 'Z-DNA ← negative supercoiling')}"><circle data-anchor="supercoiling" cx="1270" cy="150" r="20" fill="transparent"/></g>
      <g id="vf-hs-nt" data-node="nucleotide" data-color="#c9a574" data-label="${T2('Suikerpuckering (nucleotide)', 'Sugar pucker (nucleotide)')}"><circle data-anchor="nucleotide" cx="800" cy="100" r="20" fill="transparent"/></g>
      <g id="vf-atlas">${btn(330, 790, 'adna', 'A-DNA in 3D ↗', 'A-DNA in 3D ↗', '#ffb27a')}${btn(800, 790, 'bdna', 'B-DNA in 3D ↗', 'B-DNA in 3D ↗', C.dna)}${btn(1270, 790, 'zdna', 'Z-DNA in 3D ↗', 'Z-DNA in 3D ↗', '#f06bc0')}</g>
      </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const panel = (x, y, title, col, lines, op = 1, w = 380) => {
      if (op <= .01) return '';
      let s = `<g opacity="${f1(op)}"><rect x="${x}" y="${y}" width="${w}" height="${66 + lines.length * 40}" rx="14" fill="#0d1426" stroke="${col}" stroke-width="2" opacity=".95"/>` + txt(x + 20, y + 40, title, col, 28, 'start', 800);
      lines.forEach((l, i) => { s += txt(x + 20, y + 86 + i * 40, dec(l), '#e8edf7', 24, 'start', 500); });
      return s + '</g>';
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const spin = t * .012 * SPIN;
        const tilt = step === 5 ? 90 * ease(sub(p, .05, .35)) : step === 6 ? 90 * (1 - ease(sub(p, 0, .3))) : 0;
        const m = {};
        let ann = '', mainOp = 1;
        const focus = { 1: 'B', 2: 'A', 3: 'Z' }[step];
        for (const [k, h] of Object.entries(HX)) {
          const op = focus && focus !== k ? .25 : 1;
          const v = { cx: h.x, cy: CY, S, spin: spin * (k === 'Z' ? .7 : 1), tilt, rot: 0 };
          const hx = drawHelix(h.H, v, { bw: 1.1, bbw: 1.5 });
          m[k] = `<g opacity="${f1(op)}">${hx.svg}</g>`;
          h.pr = hx.pr; h.v = v;
        }
        // koppen
        const heads = { A: ['A-DNA', T2('rechtshandig', 'right-handed')], B: ['B-DNA', T2('rechtshandig', 'right-handed')], Z: ['Z-DNA', T2('linkshandig', 'left-handed')] };
        if (step !== 5 && step !== 6) for (const [k, h] of Object.entries(HX)) {
          const op = focus && focus !== k ? .3 : 1, top = CY - h.H.L / 2 * S - 60;
          ann += `<g opacity="${f1(op)}">${txt(h.x, Math.min(top, 190), heads[k][0], h.col, 34, 'middle', 800)}</g>`;
        } else if (step === 5) for (const [k, h] of Object.entries(HX)) ann += txt(h.x, 200, heads[k][0], h.col, 34, 'middle', 800);
        // lengte-aanduiding (zelfde 16 bp)
        if (step === 0) {
          const k = ease(sub(p, .4, .7));
          for (const [key, h] of Object.entries(HX)) {
            const L = h.H.L * S, x = h.x + 140;
            ann += `<g opacity="${f1(k)}"><path d="M${x},${f1(CY - L / 2)} V${f1(CY + L / 2)}" stroke="#fff" stroke-width="2.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt(x + 12, CY + 8, dec(`${h.H.L.toFixed(0)} Å`), '#fff', 22, 'start', 700)}</g>`;
          }
          ann += `<g opacity="${f1(k)}">${txt(800, 750, T2('elk 16 basenparen — let op het lengteverschil', 'each 16 base pairs — note the difference in length'), C.muted, 24)}</g>`;
        }
        if (step === 1) {
          ann += panel(1000, 250, 'B-DNA', C.dna, [T2('rechtshandig', 'right-handed'), T2('≈ 10,5 bp/winding', '≈ 10,5 bp/turn'), '3,4 Å/bp · Ø ≈ 20 Å', "C2′-endo"], ease(sub(p, .1, .3)), 330);
          const g = grooveFront(HX.B.H, HX.B.v, 'major', 10, 45), gm = grooveFront(HX.B.H, HX.B.v, 'minor', 10, 45);
          const k = ease(sub(p, .45, .6));
          const lx = HX.B.x - 125, lead = (q, col) => `<path d="M${f1(lx + 6)},${f1(q[1])} H${f1(q[0] - 8)}" stroke="${col}" stroke-width="2" stroke-dasharray="5 4"/>`;
          ann += `<g opacity="${f1(k)}"><circle cx="${f1(g[0])}" cy="${f1(g[1])}" r="7" fill="#7fdc6a"/>${lead(g, '#7fdc6a')}${txt(lx, g[1] + 8, T2('grote groef', 'major groove'), '#7fdc6a', 24, 'end')}
            <circle cx="${f1(gm[0])}" cy="${f1(gm[1])}" r="7" fill="#ffc247"/>${lead(gm, '#ffc247')}${txt(lx, gm[1] + 8, T2('kleine groef', 'minor groove'), '#ffc247', 24, 'end')}</g>`;
        }
        if (step === 2) {
          ann += panel(530, 250, 'A-DNA', '#ffb27a', [T2('rechtshandig', 'right-handed'), T2('≈ 11 bp/winding', '≈ 11 bp/turn'), '≈ 2,6 Å/bp · Ø ≈ 23 Å', "C3′-endo"], ease(sub(p, .1, .3)), 330);
        }
        if (step === 3) {
          ann += panel(770, 250, 'Z-DNA', '#f06bc0', [T2('linkshandig', 'left-handed'), T2('12 bp/winding', '12 bp/turn'), '≈ 3,7 Å/bp · Ø ≈ 18 Å', T2('G syn · C anti', 'G syn · C anti')], ease(sub(p, .1, .3)), 330);
        }
        if (step === 4) {
          const pitch = { A: 11 * 2.56, B: 10.5 * 3.38, Z: 44.6 };
          const lab = { A: '≈ 28 Å', B: '≈ 36 Å', Z: '≈ 45 Å' };
          const k = ease(sub(p, .1, .4));
          for (const [key, h] of Object.entries(HX)) {
            const P = pitch[key] * S, x = h.x - 130, y0 = CY + h.H.L / 2 * S;
            ann += `<g opacity="${f1(k)}"><path d="M${x},${f1(y0)} V${f1(y0 - P)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
              <path d="M${x - 10},${f1(y0)} h20 M${x - 10},${f1(y0 - P)} h20" stroke="#fff" stroke-width="2"/>${txt(x - 16, y0 - P / 2 + 8, lab[key], '#fff', 24, 'end', 700)}${key === 'A' ? txt(x - 16, y0 - P / 2 + 40, T2('1 winding', '1 turn'), C.muted, 22, 'end') : ''}</g>`;
          }
          const k2 = ease(sub(p, .45, .7));
          for (const [key, h] of Object.entries(HX)) {
            const rh = key !== 'Z', y = 745, x = h.x;
            // gebogen pijl: rechtshandig = tegen de klok in gezien van boven (vooraan naar rechts omhoog)
            ann += `<g opacity="${f1(k2)}"><path d="M${x - 60},${y} A60,18 0 0 ${rh ? 0 : 1} ${x + 60},${y}" stroke="${h.col}" stroke-width="4" fill="none" marker-end="url(#arrow)"/>${txt(x, y + 44, rh ? T2('rechtshandig', 'right-handed') : T2('linkshandig', 'left-handed'), h.col, 22)}</g>`;
          }
        }
        if (step === 5) {
          const k = ease(sub(p, .45, .65));
          ann += `<g opacity="${f1(k)}">${txt(330, 690, T2('holte in het midden', 'hollow core'), '#ffb27a', 24)}${txt(800, 690, T2('as door de basenparen', 'axis through the base pairs'), C.dna, 24)}${txt(1270, 690, T2('smalle, diepe kleine groef', 'narrow, deep minor groove'), '#f06bc0', 24)}</g>`;
          for (const h of Object.values(HX)) ann += `<g opacity="${f1(k)}"><circle cx="${h.x}" cy="${CY}" r="6" fill="#fff"/></g>`;
        }
        if (step === 6) {
          // vergelijkingstabel bovenop gedimde helices
          const rows = [
            ['', 'A-DNA', 'B-DNA', 'Z-DNA'],
            [T2('draairichting', 'handedness'), T2('rechts', 'right'), T2('rechts', 'right'), T2('links', 'left')],
            [T2('bp per winding', 'bp per turn'), '≈ 11', '≈ 10,5', '12'],
            [T2('stijging per bp', 'rise per bp'), '≈ 2,6 Å', '≈ 3,4 Å', '≈ 3,7 Å'],
            [T2('suikerpuckering', 'sugar pucker'), "C3′-endo", "C2′-endo", "C2′ (C) / C3′ (G)"],
          ];
          const k = ease(sub(p, .15, .35));
          const xs = [120, 540, 850, 1160], y0 = 250, dy = 80;
          let tb = `<rect x="80" y="${y0 - 60}" width="1440" height="${rows.length * dy + 30}" rx="16" fill="#0b1224" opacity=".93" stroke="rgba(124,196,255,.3)"/>`;
          rows.forEach((r, i) => {
            const y = y0 + i * dy;
            if (i === 1) tb += `<path d="M100,${y - 50} H1500" stroke="${C.muted}" stroke-width="1.5" opacity=".6"/>`;
            r.forEach((c, j) => { tb += txt(xs[j], y, dec(c), i === 0 ? ['#fff', '#ffb27a', C.dna, '#f06bc0'][j] : j === 0 ? C.muted : '#e8edf7', i === 0 ? 34 : 28, 'start', i === 0 || j === 0 ? 700 : 500); });
          });
          ann += `<g opacity="${f1(k)}">${tb}</g>`;
          mainOp = 1 - .8 * k;
        }
        if (step === 7) {
          const k = ease(sub(p, .1, .3));
          ann += panel(145, 640, T2('A-vorm', 'A form'), '#ffb27a', [T2('dsRNA, RNA–DNA-hybride', 'dsRNA, RNA–DNA hybrid'), T2('DNA bij weinig water', 'DNA, little water')], k, 370);
          ann += panel(615, 640, T2('B-vorm', 'B form'), C.dna, [T2('bijna al het DNA', 'almost all DNA'), T2('in de cel', 'in the cell')], ease(sub(p, .25, .45)), 370);
          ann += panel(1085, 640, T2('Z-vorm', 'Z form'), '#f06bc0', [T2('(CG)n, hoog zout', '(CG)n, high salt'), T2('negatieve supercoiling', 'negative supercoiling')], ease(sub(p, .4, .6)), 370);
        }
        for (const k of Object.keys(HX)) $('vf-m' + k).innerHTML = m[k];
        // stap 6: helices gedimd onder de tabel (attribuut alleen als het nodig is, zoals voorheen een omhullende groep)
        if (mainOp < 1) $('vf-main').setAttribute('opacity', f1(mainOp)); else $('vf-main').removeAttribute('opacity');
        $('vf-ann').innerHTML = ann;
        vis('vf-atlas', step === 0 ? ease(sub(p, .7, .85)) : step === 8 ? ease(sub(p, .1, .3)) : 0);
        vis('vf-hs-rna', step === 2 || step === 7 ? 1 : 0);
        vis('vf-hs-sc', step === 3 || step === 7 ? 1 : 0);
        vis('vf-hs-nt', step === 6 ? 1 : 0);
      },
    };
  },
};
