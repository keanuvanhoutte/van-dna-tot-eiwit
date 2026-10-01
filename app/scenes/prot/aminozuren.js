import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, clamp, lerp, f1, CLASSCOL, THREE } from '../../kit.js';
import { at, bd, wedge, ACOL } from './_a_chem.js';

/* De 20 standaard-aminozuren, gegroepeerd zoals in de cursus (BIT 03, deel 1). */
const NAME = {
  G: ['Glycine', 'Glycine'], A: ['Alanine', 'Alanine'], V: ['Valine', 'Valine'], L: ['Leucine', 'Leucine'], I: ['Isoleucine', 'Isoleucine'],
  M: ['Methionine', 'Methionine'], F: ['Fenylalanine', 'Phenylalanine'], W: ['Tryptofaan', 'Tryptophan'], P: ['Proline', 'Proline'],
  S: ['Serine', 'Serine'], T: ['Threonine', 'Threonine'], C: ['Cysteïne', 'Cysteine'], N: ['Asparagine', 'Asparagine'], Q: ['Glutamine', 'Glutamine'], Y: ['Tyrosine', 'Tyrosine'],
  K: ['Lysine', 'Lysine'], R: ['Arginine', 'Arginine'], H: ['Histidine', 'Histidine'], D: ['Aspartaat (asparaginezuur)', 'Aspartic acid (aspartate)'], E: ['Glutamaat (glutaminezuur)', 'Glutamic acid (glutamate)'],
};
const GROUPS = [
  { key: 'h', list: 'GAVLIMFWP', col: CLASSCOL.h, nl: 'Hydrofoob (apolair)', en: 'Hydrophobic (non-polar)' },
  { key: 'p', list: 'STCNQY', col: CLASSCOL.p, nl: 'Polair (hydrofiel)', en: 'Polar (hydrophilic)' },
  { key: 'c', list: 'KRHDE', col: CLASSCOL['+'], nl: 'Geladen (pH 7): positief (basisch)  ·  negatief (zuur)', en: 'Charged (pH 7): positive (basic)  ·  negative (acidic)' },
];
const CW = 160, CH = 122, GAP = 8, ROWY = [175, 365, 555];
const CARDS = [];
GROUPS.forEach((g, r) => {
  const n = g.list.length, extra = r === 2 ? 60 : 0;
  const x0 = r === 2 ? 48 : (1600 - (n * CW + (n - 1) * GAP)) / 2;
  [...g.list].forEach((a, i) => CARDS.push({ a, row: r, x: x0 + i * (CW + GAP) + (r === 2 && i >= 3 ? extra : 0), y: ROWY[r], col: r === 2 ? (i < 3 ? CLASSCOL['+'] : CLASSCOL['-']) : (a === 'G' || a === 'P') ? CLASSCOL.s : g.col }));
});
const EXTRA = [{ a: 'U', three: 'Sec', nl: 'Selenocysteïne', en: 'Selenocysteine', x: 1110 }, { a: 'O', three: 'Pyl', nl: 'Pyrrolysine', en: 'Pyrrolysine', x: 1300 }];

function card(c, { op = 1, nameOp = 0, full = false, hideName = false, glow = false } = {}) {
  const { x, y, a, col } = c;
  const name = hideName ? `<text x="${x + CW / 2 + 4}" y="${y + 100}" font-size="26" text-anchor="middle" fill="${C.muted}" font-family="Inter" font-weight="700">?</text>`
    : nameOp > .01 ? `<g opacity="${f1(nameOp)}">${nameText(x, y, L({ nl: NAME[a][0], en: NAME[a][1] }), full)}</g>` : '';
  return `<g opacity="${f1(op)}">
    <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="14" fill="#0f1830" stroke="${glow ? '#fff' : col}" stroke-width="${glow ? 4 : 2.5}"/>
    <rect x="${x}" y="${y}" width="10" height="${CH}" rx="5" fill="${col}"/>
    <text x="${x + 24}" y="${y + 56}" font-size="48" fill="${col}" font-family="JetBrains Mono" font-weight="700">${a}</text>
    <text x="${x + CW - 14}" y="${y + 46}" font-size="26" text-anchor="end" fill="${C.text}" font-family="JetBrains Mono" font-weight="700">${THREE[a]}</text>
    ${name}
  </g>`;
}
/* naam onderaan de kaart; lange namen worden passend gemaakt; "X (Y)" → enkel X, of twee regels als full */
function nameText(x, y, s, full) {
  const m = s.match(/^(.*) \((.*)\)$/);
  const fit = (yy, str, size, col) => `<text x="${x + CW / 2 + 5}" y="${y + yy}" font-size="${size}" text-anchor="middle" fill="${col}" font-family="Inter" font-weight="600"${str.length * size * .56 > CW - 22 ? ` textLength="${CW - 22}" lengthAdjust="spacingAndGlyphs"` : ''}>${str}</text>`;
  if (m && full) return fit(88, m[1], 20, C.text) + fit(111, `(${m[2]})`, 17, C.muted);
  return fit(100, m ? m[1] : s, 21, C.text);
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'aminozuren',
  title: { nl: 'De 20 aminozuren', en: 'The 20 amino acids' },
  scale: { nl: '≈ 0,5–1 nm', en: '≈ 0.5–1 nm' }, time: { nl: 'geen tijdsas', en: 'no time axis' },
  org: { nl: 'alle organismen (standaardset)', en: 'all organisms (standard set)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.s, { nl: 'hydrofoob, speciaal (Gly, Pro)', en: 'hydrophobic, special (Gly, Pro)' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief geladen', en: 'positively charged' }], [CLASSCOL['-'], { nl: 'negatief geladen', en: 'negatively charged' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb"><b>Examenstof</b> (cursus): volledige naam, drielettercode, éénlettercode en de biochemische eigenschap (hydrofoob, polair, geladen). Structuurformules tekenen hoeft niet. Dezelfde kleuren worden in de hele app gebruikt (translatie, hemoglobine, Ramachandran).</p>',
    en: '<p style="font-size:13px;color:#93a0bb"><b>Exam material</b> (course): full name, three-letter code, one-letter code and the biochemical property (hydrophobic, polar, charged). You do not need to draw the structures. The same colours are used throughout the app (translation, haemoglobin, Ramachandran).</p>' },
  simplified: {
    nl: 'De indeling volgt de cursus; handboeken verschillen in de details (bv. Gly, Cys, Tyr, Trp en His worden soms anders ingedeeld). Ladingen gelden rond pH 7; His (pKa van de zijketen ≈ 6) is dan maar gedeeltelijk geladen. De structuurformules zijn 2D-schetsen.',
    en: 'The grouping follows the course; textbooks differ in the details (e.g. Gly, Cys, Tyr, Trp and His are sometimes grouped differently). Charges apply around pH 7; His (side-chain pKa ≈ 6) is then only partly charged. The structural formulas are 2D sketches.' },
  steps: [
    ST(8000, cam(800, 450, 1250), 'Bouwsteen: het aminozuur', 'Building block: the amino acid', 'Een centraal Cα-atoom draagt een aminogroep, een carboxylgroep, een H-atoom en een zijketen R. Alleen R verschilt tussen de 20 aminozuren.', 'A central Cα atom carries an amino group, a carboxyl group, an H atom and a side chain R. Only R differs between the 20 amino acids.'),
    ST(8000, FULL, '20 standaard-aminozuren', '20 standard amino acids', 'Alle organismen gebruiken dezelfde set van 20. Ken van elk de naam, de drie- en de éénlettercode en de eigenschap: dat is examenstof.', 'All organisms use the same set of 20. Know the name, three- and one-letter code and the property of each: that is exam material.'),
    ST(7500, FULL, 'Hydrofoob', 'Hydrophobic', 'Zijketens van vooral C en H: ze mijden water en zitten meestal in de kern van het eiwit. Gly en Pro zijn klein en speciaal (geel).', 'Side chains of mostly C and H: they avoid water and usually sit in the core of the protein. Gly and Pro are small and special (yellow).'),
    ST(7500, FULL, 'Polair', 'Polar', 'Zijketens met O–H, S–H of amidegroepen maken H-bruggen met water: meestal aan het oppervlak.', 'Side chains with O–H, S–H or amide groups form H-bonds with water: mostly at the surface.'),
    ST(8000, cam(468, 545, 1000), 'Geladen: + en −', 'Charged: + and −', 'Lys en Arg zijn positief, Asp en Glu negatief. His kan positief worden: de ring neemt in zuur milieu een proton op.', 'Lys and Arg are positive, Asp and Glu negative. His can become positive: the ring picks up a proton in an acidic environment.'),
    ST(8500, FULL, 'Speciaal: glycine en proline', 'Special: glycine and proline', 'Glycine heeft als R enkel een H: het is achiraal en zeer flexibel. Bij proline is de zijketen verbonden met de eigen N: een star imino-zuur.', 'Glycine has only an H as R: it is achiral and very flexible. In proline the side chain is bonded to its own N: a rigid imino acid.'),
    ST(8000, FULL, 'Cysteïne: de disulfidebrug', 'Cysteine: the disulfide bridge', 'Twee cysteïnes kunnen hun SH-groepen oxideren tot een covalente S–S-brug die de vouwing verstevigt, vooral in eiwitten buiten de cel (gevormd in het ER).', 'Two cysteines can oxidise their SH groups into a covalent S–S bridge that reinforces the fold, mainly in proteins outside the cell (formed in the ER).'),
    ST(8500, FULL, 'L en D: spiegelbeelden', 'L and D: mirror images', 'Cα met vier verschillende groepen is chiraal. Eiwitten worden gemaakt uit L-aminozuren (glycine is niet chiraal). In de Fischer-projectie staat NH₃⁺ bij L links.', 'A Cα with four different groups is chiral. Proteins are made of L-amino acids (glycine is not chiral). In the Fischer projection, L has NH₃⁺ on the left.'),
    ST(8000, FULL, 'Nummer 21 en 22: Sec en Pyl', 'Numbers 21 and 22: Sec and Pyl', 'Selenocysteïne (Sec, U: als Cys, maar met Se i.p.v. S) wordt ingebouwd op een UGA-codon met SECIS-element, pyrrolysine (Pyl, O) op UAG in sommige archaea en bacteriën.', 'Selenocysteine (Sec, U: like Cys, but with Se instead of S) is inserted at a UGA codon with a SECIS element, pyrrolysine (Pyl, O) at UAG in some archaea and bacteria.'),
    ST(9000, FULL, 'Test jezelf', 'Test yourself', 'Welk aminozuur hoort bij elke letter? De namen verschijnen één voor één.', 'Which amino acid belongs to each letter? The names appear one by one.'),
  ],
  svg() {
    /* algemene structuur (zwitterion, pH 7) */
    const X = 800, Y = 440;
    const gen = `
      ${bd(X - 170, Y, X, Y, { sh: 50, sh2: 24 })}${bd(X, Y, X + 170, Y, { sh: 24, sh2: 18 })}
      ${bd(X, Y, X, Y - 120, { sh: 24, sh2: 20 })}${bd(X, Y, X, Y + 120, { sh: 24, sh2: 26 })}
      ${bd(X + 170, Y, X + 250, Y - 70, { dbl: true, sh: 18, sh2: 18 })}${bd(X + 170, Y, X + 250, Y + 70, { sh: 18, sh2: 20 })}
      ${at(X - 205, Y, 'H₃N⁺', ACOL.N, 34)}${at(X, Y, 'Cα', '#fff', 36)}${at(X + 170, Y, 'C', ACOL.C, 34)}
      ${at(X + 262, Y - 80, 'O', ACOL.O, 34)}${at(X + 268, Y + 82, 'O⁻', ACOL.O, 34)}${at(X, Y - 136, 'H', ACOL.H, 34)}
      <circle cx="${X}" cy="${Y + 150}" r="34" fill="${CLASSCOL.h}" opacity=".9"/>${txt(X, Y + 163, 'R', '#0a1224', 36, 'middle', 800)}
      ${txt(X - 205, Y + 70, T2('aminogroep', 'amino group'), ACOL.N, 22)}${txt(X + 250, Y + 150, T2('carboxylgroep', 'carboxyl group'), ACOL.O, 22)}
      ${txt(X + 60, Y + 205, T2('zijketen (R-groep): bepaalt de eigenschappen', 'side chain (R group): determines the properties'), CLASSCOL.h, 22, 'start')}
      ${txt(X + 34, Y - 30, T2('α-koolstof', 'α-carbon'), '#fff', 20, 'start')}
      ${txt(X, Y - 215, T2('bij pH 7 als zwitterion: NH₃⁺ en COO⁻', 'at pH 7 as a zwitterion: NH₃⁺ and COO⁻'), C.muted, 20)}`;
    return svgOpen() + `
    <g id="az-gen">${gen}</g>
    <g id="az-heads"></g>
    <g id="az-cards"></g>
    <g id="az-extra" data-node="seleno" data-color="#ffa94a" data-label="${T2('Sec en Pyl: hercodering van stopcodons', 'Sec and Pyl: stop-codon recoding')}">
      ${EXTRA.map(e => `<rect x="${e.x}" y="${ROWY[2]}" width="${CW}" height="${CH}" rx="14" fill="#1a1426" stroke="#ffa94a" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${e.x + 22}" y="${ROWY[2] + 56}" font-size="48" fill="#ffa94a" font-family="JetBrains Mono" font-weight="700">${e.a}</text>
        <text x="${e.x + CW - 14}" y="${ROWY[2] + 46}" font-size="26" text-anchor="end" fill="${C.text}" font-family="JetBrains Mono" font-weight="700">${e.three}</text>
        <text x="${e.x + CW / 2 + 4}" y="${ROWY[2] + 100}" font-size="21" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="600" textLength="${CW - 22}" lengthAdjust="spacingAndGlyphs">${L(e)}</text>
        ${txt(e.x + CW / 2, ROWY[2] + CH + 40, e.a === 'U' ? 'UGA → Sec' : 'UAG → Pyl', '#ffa94a', 25)}`).join('')}
      <circle data-anchor="seleno" cx="1285" cy="${ROWY[2] - 8}" r="1" fill="none"/>
    </g>
    <g id="az-codon" data-node="codon" data-color="${C.rna}" data-label="${T2('Elk aminozuur ← codon(s): genetische code', 'Each amino acid ← codon(s): genetic code')}">
      <rect x="1150" y="84" width="400" height="54" rx="27" fill="rgba(255,138,61,.12)" stroke="${C.rna}"/>
      ${txt(1350, 120, T2('mRNA-codon → aminozuur', 'mRNA codon → amino acid'), C.rna, 24)}
      <circle data-anchor="codon" cx="1350" cy="84" r="1" fill="none"/>
    </g>
    <g id="az-pep" data-node="peptide" data-color="${C.chain}" data-label="${T2('Volgende: de peptidebinding', 'Next: the peptide bond')}">
      <rect x="1010" y="740" width="500" height="56" rx="28" fill="rgba(127,220,106,.12)" stroke="${C.chain}"/>
      ${txt(1260, 777, T2('aminozuren koppelen → peptidebinding', 'linking amino acids → peptide bond'), C.chain, 24)}
      <circle data-anchor="peptide" cx="1260" cy="740" r="1" fill="none"/>
    </g>
    <g id="az-ov"></g>
    <g data-node="disulfide" data-color="#ffd84a" data-nolabel><g id="az-ov6"></g></g>
    <g id="az-ss" data-node="disulfide" data-color="#ffd84a" data-label="${T2('Disulfidebruggen', 'Disulfide bridges')}">
      <rect x="540" y="560" width="520" height="56" rx="28" fill="rgba(255,216,74,.12)" stroke="#ffd84a"/>
      ${txt(800, 597, T2('meer over disulfidebruggen', 'more about disulfide bridges'), '#ffd84a', 24)}
      <circle data-anchor="disulfide" cx="800" cy="560" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const heads = GROUPS.map((g, r) => {
      if (r < 2) return txt(CARDS.find(c => c.row === r).x, ROWY[r] - 16, L({ nl: g.nl, en: g.en }), g.col, 25, 'start');
      return txt(48, ROWY[r] - 16, T2('Positief geladen (basisch)', 'Positively charged (basic)'), CLASSCOL['+'], 25, 'start') +
        txt(48 + 3 * (CW + GAP) + 60, ROWY[r] - 16, T2('Negatief geladen (zuur)', 'Negatively charged (acidic)'), CLASSCOL['-'], 25, 'start');
    });
    const hisNote = txt(48 + 2 * (CW + GAP) + CW / 2 + 5, ROWY[2] + CH + 30, T2('His: + in zuur milieu', 'His: + in acidic conditions'), C.muted, 20);

    /* overlay-panelen voor de speciale stappen */
    const panel = inner => `<rect x="170" y="150" width="1260" height="560" rx="22" fill="#0b1224" fill-opacity=".96" stroke="#2a3550" stroke-width="2"/>${inner}`;
    const gly = (x, y) => bd(x - 110, y, x, y, { sh: 40, sh2: 22 }) + bd(x, y, x + 110, y, { sh: 22, sh2: 40 }) + bd(x, y, x, y - 80) + bd(x, y, x, y + 80) +
      at(x - 140, y, 'H₃N⁺', ACOL.N, 28) + at(x, y, 'Cα', '#fff', 30) + at(x + 145, y, 'COO⁻', ACOL.O, 28) + at(x, y - 94, 'H', ACOL.H, 30) + at(x, y + 94, 'H', CLASSCOL.s, 32);
    const pro = (x, y) => {
      const N = [x - 80, y], CA = [x, y], CB = [x + 22, y + 78], CG = [x - 38, y + 126], CD = [x - 100, y + 80];
      let r = bd(N[0], N[1], CA[0], CA[1], { sh: 44, sh2: 24 });
      r += bd(CA[0], CA[1], CB[0], CB[1], { sh: 22, sh2: 0, col: CLASSCOL.s, w: 4 }) + bd(CB[0], CB[1], CG[0], CG[1], { sh: 0, sh2: 0, col: CLASSCOL.s, w: 4 }) +
        bd(CG[0], CG[1], CD[0], CD[1], { sh: 0, sh2: 0, col: CLASSCOL.s, w: 4 }) + bd(CD[0], CD[1], N[0], N[1], { sh: 0, sh2: 22, col: CLASSCOL.s, w: 4 });
      r += bd(x, y, x + 110, y, { sh: 22, sh2: 40 }) + bd(x, y, x, y - 75);
      r += at(N[0] - 14, N[1], 'H₂N⁺', ACOL.N, 28) + at(x, y, 'Cα', '#fff', 30) + at(x + 145, y, 'COO⁻', ACOL.O, 28) + at(x, y - 90, 'H', ACOL.H, 28);
            return r;
    };
    const cys = (x, y, flip) => {
      const d = flip ? -1 : 1;
      return bd(x, y, x, y - 70) + bd(x, y, x, y + 70) + bd(x, y, x + d * 90, y, { sh: 22 }) + at(x, y, 'Cα', '#fff', 26) + at(x, y - 84, '···', C.muted, 26) + at(x, y + 84, '···', C.muted, 26) + at(x + d * 100, y, 'CH₂', ACOL.C, 24);
    };
    const fischer = (x, y, left) => `<line x1="${x}" y1="${y - 90}" x2="${x}" y2="${y + 90}" stroke="#c9d2e4" stroke-width="3.5"/><line x1="${x - 90}" y1="${y}" x2="${x + 90}" y2="${y}" stroke="#c9d2e4" stroke-width="3.5"/>` +
      at(x, y - 112, 'COO⁻', ACOL.O, 26) + at(x, y + 114, 'CH₃', CLASSCOL.h, 26) + at(x + (left ? -128 : 128), y, 'H₃N⁺', ACOL.N, 26) + at(x + (left ? 112 : -112), y, 'H', ACOL.H, 26) +
      `<circle cx="${x}" cy="${y}" r="7" fill="#fff"/>`;
    const OV = {
      5: panel(txt(470, 225, 'Glycine (Gly, G)', CLASSCOL.s, 32) + gly(470, 390) + txt(470, 580, T2('R = H → achiraal, flexibel', 'R = H → achiral, flexible'), C.text, 25) +
        `<line x1="800" y1="200" x2="800" y2="660" stroke="#2a3550" stroke-width="2"/>` +
        txt(1120, 225, 'Proline (Pro, P)', CLASSCOL.s, 32) + pro(1140, 350) + txt(1120, 580, T2('ring op eigen N → star', 'ring on its own N → rigid'), C.text, 25)),
      6: panel(txt(800, 225, 'Cys–SH + HS–Cys  →  Cys–S–S–Cys (+ 2 H⁺ + 2 e⁻)', '#ffd84a', 28) +
        cys(330, 400, false) + bd(430, 400, 520, 400, { sh: 24, sh2: 22 }) + at(535, 400, 'SH', ACOL.S, 28) + at(700, 400, 'HS', ACOL.S, 28) + bd(715, 400, 800, 400, { sh: 22, sh2: 24 }) + cys(890, 400, true).replace(/x/g, 'x') +
        `<path d="M940,400 h110" stroke="#ffd84a" stroke-width="4" marker-end="url(#arrow)"/>` + txt(995, 380, T2('oxidatie', 'oxidation'), '#ffd84a', 24) +
        at(1130, 400, 'S', ACOL.S, 32) + bd(1130, 400, 1230, 400, { sh: 20, sh2: 20, col: '#ffd84a', w: 6 }) + at(1230, 400, 'S', ACOL.S, 32) + bd(1130, 400, 1100, 330, { sh: 20, sh2: 10 }) + bd(1230, 400, 1260, 470, { sh: 20, sh2: 10 }) +
        txt(1180, 500, T2('disulfidebrug', 'disulfide bridge'), '#ffd84a', 25)),
      7: panel(txt(480, 225, 'L-alanine', CLASSCOL.h, 32) + fischer(480, 400, true) + txt(1120, 225, 'D-alanine', '#93a0bb', 32) + fischer(1120, 400, false) +
        `<line x1="800" y1="190" x2="800" y2="610" stroke="#fff" stroke-width="2.5" stroke-dasharray="10 8"/>` + txt(800, 645, T2('spiegelvlak', 'mirror plane'), C.text, 24) +
        txt(480, 590, T2('in eiwitten', 'in proteins'), C.text, 25) + txt(1120, 590, T2('zeldzaam, niet via ribosomen', 'rare, not via ribosomes'), C.muted, 24)),
    };
    let lastKey = '';
    return {
      update(t, s) {
        const { step, p } = s;
        $('az-gen').setAttribute('opacity', f1(step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .25)) : 0));
        const cardsOp = step === 0 ? 0 : step === 1 ? ease(sub(p, .15, .45)) : 1;
        // quiz: de namen verschijnen één voor één; er staan er nooit meer dan QWIN tegelijk (oudere vervagen weer tot hun 3-lettercode)
        const QWIN = 11, qz = step === 9 ? clamp(p / .9) * (CARDS.length + 1) : 99, quiz = Math.floor(qz);
        const key = `${step}|${f1(cardsOp)}|${step === 9 ? qz.toFixed(2) : ''}|${f1(ease(sub(p, 0, .3)))}`;
        $('az-ov').innerHTML = step === 6 ? '' : OV[step] ?? '';
        $('az-ov6').innerHTML = step === 6 ? OV[6] : '';
        $('az-ov').setAttribute('opacity', f1(step === 5 ? ease(sub(p, 0, .25)) : 1));
        $('az-ss').setAttribute('opacity', step === 6 ? 1 : 0);
        $('az-extra').setAttribute('opacity', step === 8 ? 1 : 0);
        $('az-codon').setAttribute('opacity', step >= 1 && step <= 4 ? 1 : 0);
        $('az-pep').setAttribute('opacity', step === 9 ? 1 : 0);
        if (key === lastKey) return; lastKey = key;
        /* per stap: welke rij is actief (rest gedimd) en van welke rij staan de namen er */
        const ACT = { 2: 0, 3: 1, 4: 2 };
        const rowOp = (row, k) => (k >= 5 && k <= 8) ? .2 : (ACT[k] !== undefined && ACT[k] !== row) ? .2 : 1;
        const nameOp = (row, k) => k === 9 ? 1 : ACT[k] === row ? 1 : 0;
        const e = step >= 2 ? ease(sub(p, 0, .3)) : 1;
        let h = '';
        CARDS.forEach((c, i) => {
          const op = step >= 2 ? lerp(rowOp(c.row, step - 1), rowOp(c.row, step), e) : 1;
          const nop = step === 9 ? Math.min(clamp((qz - i) * 2), 1 - clamp(qz - i - QWIN)) : step >= 2 ? lerp(nameOp(c.row, step - 1), nameOp(c.row, step), e) : 0;
          h += card(c, { op, nameOp: nop, full: step === 4, glow: step === 4 && c.a === 'H', hideName: step === 9 && i >= quiz });
        });
        $('az-cards').innerHTML = `<g opacity="${f1(cardsOp)}">${h}</g>`;
        const headOp = r => step === 9 ? 0 : step >= 2 ? lerp(rowOp(r, step - 1), rowOp(r, step), e) : 1;
        $('az-heads').innerHTML = heads.map((hh, r) => `<g opacity="${f1(cardsOp * headOp(r))}">${hh}</g>`).join('') +
          `<g opacity="${f1(step === 4 ? e : step === 5 ? 1 - e : 0)}">${hisNote}</g>`;
      },
    };
  },
};
