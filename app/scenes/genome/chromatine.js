import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { ST, HC, nucleo, flag, smooth, panel } from './_a_kit.js';

/*
 * Chromatine: van chromosoomterritorium → lussen/TADs → eu- vs heterochromatine → 10 nm-vezel → (30 nm?) → nucleosoom.
 * Panelen: A kern (links), B lussen + Hi-C (midden boven), C eu/hetero (midden onder), D van vezel tot nucleosoom (rechts).
 */
const TERR = [ // chromosoomterritoria in de kern (x, y, rx, ry, kleur)
  [215, 345, 70, 58, '#6fa8ff'], [335, 330, 62, 70, '#b39ddb'], [390, 455, 58, 55, '#7fc8a9'],
  [300, 560, 72, 52, '#e0bd6e'], [185, 505, 58, 66, '#e08f8f'], [245, 440, 30, 28, '#5fd3e6'],
];
const FB_Y = 300;                       // hoogte van de chromatinevezel in paneel B
const TADS = [[640, 820], [860, 1050]]; // CTCF-ankers (x) van twee domeinen

export default {
  id: 'chromatine',
  title: { nl: 'Chromatine', en: 'Chromatin' },
  scale: { nl: '≈ 10 µm → 10 nm', en: '≈ 10 µm → 10 nm' },
  time: { nl: 'lusextrusie tot ~2 kb/s (in vitro); hier vertraagd', en: 'loop extrusion up to ~2 kb/s (in vitro); slowed down here' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'DNA / chromatinevezel', en: 'DNA / chromatin fibre' }], [C.histone, { nl: 'nucleosoom (histonkern)', en: 'nucleosome (histone core)' }],
    ['#ff8a3d', 'CTCF'], ['#ffc247', { nl: 'cohesine', en: 'cohesin' }], [C.chain, { nl: 'acetylatie (Ac)', en: 'acetylation (Ac)' }], [C.danger, { nl: 'H3K9me3 / 5mC', en: 'H3K9me3 / 5mC' }], ['#f06bc0', 'HP1'], [C.prot, 'RNA-pol II']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Meer over het DNA rond een nucleosoom in de <a href="../atlas/index.html?id=nucleosome&lang=nl">DNA/RNA-atlas: nucleosoom</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">More about the DNA around a nucleosome in the <a href="../atlas/index.html?id=nucleosome&lang=en">DNA/RNA atlas: nucleosome</a>.</p>' },
  simplified: {
    nl: 'Niets is op schaal: een territorium is enkele µm, een lus ~50 kb–1 Mb, een nucleosoom ~11 nm. De kleuren van de territoria volgen "chromosome painting" (FISH). Lusextrusie is getekend met één cohesinering; het exacte mechanisme (één of twee ringen, hoe CTCF de ring stopt) wordt nog onderzocht. De Hi-C-kaart is een schets, geen echte data. De klassieke 30 nm-vezel is in vitro gezien; in de meeste levende cellen vindt men vooral een onregelmatige 5–24 nm-keten.',
    en: 'Nothing is to scale: a territory is a few µm, a loop ~50 kb–1 Mb, a nucleosome ~11 nm. Territory colours mimic chromosome painting (FISH). Loop extrusion is drawn with one cohesin ring; the exact mechanism (one or two rings, how CTCF stops the ring) is still being studied. The Hi-C map is a sketch, not real data. The classical 30 nm fibre was seen in vitro; in most living cells mainly an irregular 5–24 nm chain is found.' },
  steps: [
    ST(7000, FULL, 'Van kern naar nucleosoom', 'From nucleus to nucleosome',
      'Zoom in op het DNA van de kern: ~2 m DNA per cel past in een kern van ~5–10 µm dankzij verpakking in chromatine (DNA + eiwitten).',
      'Zooming in on the DNA of the nucleus: ~2 m of DNA per cell fits into a nucleus of ~5–10 µm because it is packed into chromatin (DNA + proteins).'),
    ST(7500, cam(290, 450, 820), 'Chromosoomterritoria', 'Chromosome territories',
      'In de interfasekern neemt elk chromosoom een eigen gebied in. Compact heterochromatine ligt vooral tegen de kernlamina en rond de nucleolus.',
      'In the interphase nucleus each chromosome occupies its own region. Compact heterochromatin lies mainly against the nuclear lamina and around the nucleolus.'),
    ST(9000, cam(840, 295, 680), 'Lusextrusie: cohesine en CTCF', 'Loop extrusion: cohesin and CTCF',
      'Cohesine trekt de chromatinevezel ATP-afhankelijk tot een steeds grotere lus, tot het botst op CTCF-eiwitten die naar elkaar toe gericht zijn.',
      'Cohesin reels the chromatin fibre into a growing loop (ATP-dependent) until it meets CTCF proteins bound in convergent orientation.'),
    ST(8000, cam(840, 308, 730), 'TADs in Hi-C-data', 'TADs in Hi-C data',
      'Binnen zo\'n domein (TAD) raken DNA-stukken elkaar veel vaker: in een Hi-C-contactkaart vormt elk domein een donkere driehoek.',
      'Within such a domain (TAD) pieces of DNA touch each other much more often: in a Hi-C contact map each domain forms a dark triangle.'),
    ST(8500, cam(840, 672, 600), 'Euchromatine en heterochromatine', 'Euchromatin and heterochromatin',
      'Euchromatine is open (geacetyleerde histonen, actieve genen). Heterochromatine is compact: H3K9me3, HP1 en gemethyleerd DNA houden het stil.',
      'Euchromatin is open (acetylated histones, active genes). Heterochromatin is compact: H3K9me3, HP1 and methylated DNA keep it silent.'),
    ST(8000, cam(1355, 235, 480), 'De 10 nm-vezel: "kralen aan een snoer"', 'The 10 nm fibre: "beads on a string"',
      'Uitgerekt chromatine toont nucleosomen (~11 nm) verbonden door linker-DNA: om de ~200 bp een nucleosoom. Histon H1 bindt waar het DNA in- en uitgaat.',
      'Stretched-out chromatin shows nucleosomes (~11 nm) joined by linker DNA: one nucleosome every ~200 bp. Histone H1 binds where the DNA enters and exits.'),
    ST(8500, cam(1355, 490, 480), 'De 30 nm-vezel: een open vraag', 'The 30 nm fibre: an open question',
      'In vitro vouwt de 10 nm-vezel tot een regelmatige 30 nm-vezel. In intacte kernen ziet men meestal een onregelmatige keten van 5–24 nm die dicht opeengepakt ligt.',
      'In vitro the 10 nm fibre folds into a regular 30 nm fibre. In intact nuclei one mostly sees an irregular 5–24 nm chain that is densely packed.'),
    ST(7500, cam(1355, 745, 470), 'Inzoomen op één nucleosoom', 'Zooming in on one nucleosome',
      'De basiseenheid van chromatine: ~147 bp DNA rond een eiwitkern van acht histonen. Volgende hoofdstuk: het nucleosoom in 3D.',
      'The basic unit of chromatin: ~147 bp of DNA around a protein core of eight histones. Next chapter: the nucleosome in 3D.'),
  ],
  svg() {
    const r = rng(7);
    // ---------- paneel A: kern met territoria ----------
    let terr = '';
    TERR.forEach(([x, y, rx, ry, col], k) => {
      terr += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".13" stroke="${col}" stroke-opacity=".5" stroke-width="2"/>`;
      for (let i = 0; i < 9; i++) terr += `<path d="${squiggle(r, x + (r() - .5) * rx, y + (r() - .5) * ry, 7, 8, 9)}" stroke="${col}" stroke-width="2.2" fill="none" opacity=".75"/>`;
    });
    let het = '';
    for (let a = 0; a < 360; a += 4) if (r() > .3) {
      const rr = 205 - r() * 12, x = 290 + Math.cos(a * Math.PI / 180) * rr, y = 450 + Math.sin(a * Math.PI / 180) * rr;
      het += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 + r() * 4)}" fill="#27457e" opacity=".85"/>`;
    }
    for (let a = 0; a < 360; a += 25) het += `<circle cx="${f1(262 + Math.cos(a / 57.3) * 34)}" cy="${f1(425 + Math.sin(a / 57.3) * 28)}" r="4" fill="#27457e" opacity=".85"/>`;

    // ---------- paneel C: eu- en heterochromatine ----------
    let eu = '', hetc = '';
    const euPts = [[585, 700], [620, 640], [660, 690], [700, 625], [745, 680], [790, 620], [820, 660]];
    eu += `<path d="${smooth(euPts)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    euPts.slice(1, -1).forEach(([x, y], i) => {
      eu += nucleo(x, y, 15, { rot: -90 + i * 40, w: 3.2 }).svg;
      if (i % 2 === 0) eu += flag(x + 4, y - 14, 'Ac', C.chain, 1, 9);
    });
    eu += `<path d="M700,745 C 690,705 730,690 745,720" stroke="${C.rna}" stroke-width="3" fill="none"/>`;
    const hPts = [];
    const r2 = rng(3);
    for (let i = 0; i < 16; i++) hPts.push([900 + (i % 4) * 36 + (r2() - .5) * 10 + (Math.floor(i / 4) % 2) * 16, 610 + Math.floor(i / 4) * 34 + (r2() - .5) * 8]);
    hetc += `<path d="${smooth(hPts)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    hPts.forEach(([x, y], i) => {
      hetc += nucleo(x, y, 14, { rot: i * 50, w: 3 }).svg;
    });
    let hp1 = '';
    [[930, 628], [985, 662], [940, 700], [1020, 700], [960, 735], [1030, 630]].forEach(([x, y]) => {
      hp1 += `<g><ellipse cx="${x - 5}" cy="${y}" rx="7" ry="5" fill="#f06bc0"/><ellipse cx="${x + 5}" cy="${y}" rx="7" ry="5" fill="#f06bc0"/></g>`;
    });
    let me = '';
    [[905, 612], [1013, 646], [925, 681], [1008, 716]].forEach(([x, y]) => { me += flag(x, y, 'K9me3', C.danger, 1, 8); });
    [[1055, 600], [1062, 745]].forEach(([x, y]) => { me += `<circle cx="${x}" cy="${y}" r="5" fill="${C.danger}" stroke="#0a1224" stroke-width="1.5"/><text x="${x + 8}" y="${y + 3}" font-size="8" fill="${C.danger}" font-family="Inter" font-weight="700">5mC</text>`; });

    // ---------- paneel D: 10 nm-vezel ----------
    let bead = '';
    let prev = [1150, 250];
    const bx = [1205, 1285, 1365, 1445, 1525], by = [225, 245, 222, 248, 226];
    let links = '';
    bx.forEach((x, i) => {
      const nu = nucleo(x, by[i], 24, { rot: -60 + i * 35, w: 5.5 });
      links += `<path d="M${f1(prev[0])},${f1(prev[1])} Q${f1((prev[0] + nu.a[0]) / 2)},${f1((prev[1] + nu.a[1]) / 2 + (i % 2 ? -14 : 14))} ${f1(nu.a[0])},${f1(nu.a[1])}" stroke="${C.dna}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
      bead += nu.svg + `<circle cx="${f1((nu.a[0] + nu.b[0]) / 2)}" cy="${f1((nu.a[1] + nu.b[1]) / 2)}" r="6" fill="${HC.H1}" stroke="#0a1224" stroke-width="1.5"/>`;
      prev = nu.b;
    });
    links += `<path d="M${f1(prev[0])},${f1(prev[1])} L1575,240" stroke="${C.dna}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;

    // 30 nm: in-vitro-model (zigzag, twee starts) en in-vivo-keten (onregelmatig)
    let z30 = '';
    const zz = [];
    for (let i = 0; i < 10; i++) zz.push([1180 + i * 17, 470 + (i % 2 ? -22 : 22)]);
    z30 += `<path d="${zz.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join('')}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    zz.forEach(([x, y], i) => { z30 += nucleo(x, y, 13, { rot: i * 70, w: 3 }).svg; });
    z30 += `<rect x="1165" y="430" width="190" height="80" rx="40" fill="none" stroke="${C.muted}" stroke-dasharray="5 4"/>`;
    let vivo = '';
    const r3 = rng(21), vv = [];
    let vx = 1400, vy = 520;
    for (let i = 0; i < 14; i++) { vv.push([vx, vy]); vx += 12 + (r3() - .3) * 16; vy += (r3() - .5) * 52; vy = clamp(vy, 425, 545); }
    vivo += `<path d="${smooth(vv)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    vv.forEach(([x, y], i) => { vivo += nucleo(x, y, 12, { rot: i * 83, w: 2.8 }).svg; });

    // groot nucleosoom
    const big = nucleo(1355, 745, 66, { rot: -90, w: 12, octa: true, lab: 9 });

    return svgOpen() + `
    <!-- paneel A -->
    <g id="cr-pA">
      ${panel(40, 150, 500, 600, T2('① Territoria', '① Territories'), '#2a3a60', 21)}
      <circle cx="290" cy="450" r="215" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>
      <circle cx="290" cy="450" r="221" fill="none" stroke="#7aa0d8" stroke-width="3" opacity=".6"/>
      ${het}
      <path d="M232,420 C236,392 285,388 297,412 C310,438 282,462 255,458 C235,455 229,440 232,420Z" fill="#2a3d63" stroke="#4d6aa0" stroke-width="2"/>
      <text x="266" y="400" font-size="13" text-anchor="middle" fill="#cfdcf5" font-family="Inter" font-weight="700" stroke="#0a1224" stroke-width="3" paint-order="stroke">${T2('nucleolus', 'nucleolus')}</text>
      <g data-node="chromosoom" data-color="${C.dna}" data-label="${T2('Chromosoom', 'Chromosome')}">${terr}<circle data-anchor="chromosoom" cx="335" cy="265" r="1" fill="none"/></g>
      <rect x="360" y="410" width="80" height="80" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/>
    </g>
    <path d="M440,410 L560,110 M440,490 L560,480" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5" opacity=".45"/>
    <!-- paneel B -->
    <g id="cr-pB">
      ${panel(560, 110, 560, 370, T2('② Lussen & TADs', '② Loops & TADs'), '#2a3a60', 21)}
      <g data-node="genregulatie" data-color="#ff8a3d" data-label="${T2('Lussen: enhancer ↔ promoter', 'Loops: enhancer ↔ promoter')}" data-nolabel>
        <g id="cr-fibre"></g>
      </g>
      <g id="cr-hic"></g>
    </g>
    <!-- paneel C -->
    <g id="cr-pC">
      ${panel(560, 520, 560, 290, T2('③ Eu- en heterochromatine', '③ Eu- and heterochromatin'), '#2a3a60', 21)}
      <g data-node="histonmod" data-color="${C.chain}" data-label="${T2('Histonmodificaties', 'Histone modifications')}">${eu}<circle data-anchor="histonmod" cx="640" cy="600" r="1" fill="none"/></g>
      <g data-node="genregulatie" data-color="${C.prot}" data-label="${T2('Actief gen', 'Active gene')}" data-nolabel>
        <ellipse cx="735" cy="742" rx="26" ry="18" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="2"/>
        <text x="735" y="746" font-size="10" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Pol II</text>
      </g>
      <g data-node="dnamethyl" data-color="${C.danger}" data-label="${T2('DNA-methylatie', 'DNA methylation')}">${hetc}${hp1}${me}<circle data-anchor="dnamethyl" cx="1000" cy="590" r="1" fill="none"/></g>
      ${txt(700, 790, T2('euchromatine: open, actief', 'euchromatin: open, active'), C.chain, 14)}
      ${txt(975, 790, T2('heterochromatine: compact, stil', 'heterochromatin: compact, silent'), '#f3a6d3', 14)}
      <line x1="840" y1="560" x2="840" y2="770" stroke="#2a3a60" stroke-width="2" stroke-dasharray="4 4"/>
    </g>
    <!-- paneel D -->
    <g id="cr-pD1">
      ${panel(1140, 110, 450, 230, T2('④ 10 nm-vezel', '④ 10 nm fibre'), '#2a3a60', 21)}
      <g data-node="nucleosoom" data-color="${C.histone}" data-label="${T2('Nucleosoom', 'Nucleosome')}" data-nolabel>${links}${bead}</g>
      <line x1="1181" y1="290" x2="1229" y2="290" stroke="#fff" stroke-width="2"/><line x1="1181" y1="285" x2="1181" y2="295" stroke="#fff" stroke-width="2"/><line x1="1229" y1="285" x2="1229" y2="295" stroke="#fff" stroke-width="2"/>
      ${txt(1205, 310, '≈ 11 nm', '#fff', 12)}
      ${txt(1325, 176, T2('linker-DNA', 'linker DNA'), C.dna2, 12)}
      <path d="M1325,181 L1325,210" stroke="${C.dna2}" stroke-width="1.5" marker-end="url(#arrow)"/>
      ${txt(1445, 300, T2('H1 (linkerhiston)', 'H1 (linker histone)'), HC.H1, 12)}
      <path d="M1445,288 L1447,266" stroke="${HC.H1}" stroke-width="1.5" marker-end="url(#arrow)"/>
      ${txt(1480, 322, T2('herhaling ≈ 200 bp', 'repeat ≈ 200 bp'), C.muted, 12)}
    </g>
    <g id="cr-pD2">
      ${panel(1140, 370, 450, 230, T2('⑤ Hogere vouwing', '⑤ Higher-order folding'), '#2a3a60', 21)}
      ${z30}${vivo}
      ${txt(1260, 540, T2('in vitro: "30 nm-vezel"', 'in vitro: "30 nm fibre"'), C.muted, 12)}
      ${txt(1260, 556, T2('(regelmatig, zigzag)', '(regular, zigzag)'), C.muted, 11)}
      ${txt(1490, 572, T2('in de cel: onregelmatige', 'in the cell: irregular'), C.text, 12)}
      ${txt(1490, 588, T2('keten van 5–24 nm', 'chain of 5–24 nm'), C.text, 12)}
      <text x="1375" y="485" font-size="34" text-anchor="middle" fill="${C.trna}" font-family="Inter" font-weight="800">?</text>
    </g>
    <g id="cr-pD3">
      ${panel(1140, 630, 450, 240, T2('⑥ Nucleosoom', '⑥ Nucleosome'), '#2a3a60', 21)}
      <g data-node="dnahelix" data-color="${C.dna}" data-label="${T2('DNA-dubbelhelix →', 'DNA double helix →')}">
        <path d="M1170,${f1(big.a[1] + 40)} Q1230,${f1(big.a[1] + 30)} ${f1(big.a[0])},${f1(big.a[1])}" stroke="${C.dna}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <path d="M${f1(big.b[0])},${f1(big.b[1])} Q1470,${f1(big.b[1] + 50)} 1560,${f1(big.b[1] + 40)}" stroke="${C.dna}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <circle data-anchor="dnahelix" cx="1520" cy="${f1(big.b[1] + 30)}" r="1" fill="none"/>
      </g>
      <g data-node="nucleosoom" data-color="${HC.H3}" data-label="${T2('Nucleosoom (3D) →', 'Nucleosome (3D) →')}">${big.svg}<circle data-anchor="nucleosoom" cx="1425" cy="690" r="1" fill="none"/></g>

      ${txt(1572, 656, T2('~147 bp · ~1,7 windingen · histonoctameer', '~147 bp · ~1.7 turns · histone octamer'), C.muted, 12, 'end')}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const panels = ['cr-pA', 'cr-pB', 'cr-pC', 'cr-pD1', 'cr-pD2', 'cr-pD3'];
    const focus = [null, 0, 1, 1, 2, 3, 4, 5];
    // paneeltitels: 21 px in het overzicht, maar kleiner in de ingezoomde stappen (≈ 18 px op het scherm = fs × 1000 / cambreedte)
    const CAMW = [1600, 820, 680, 730, 600, 480, 480, 470];
    const tfs = k => Math.min(21, 18 * CAMW[k] / 1000);
    const pAframe = $('cr-pA').querySelector('rect');
    const titles = [...svg.querySelectorAll('.ptitle')].map(el => ({ el, y0: +el.getAttribute('y') - 31 }));

    function fibre(u1, u2) {
      // chromatinevezel met twee domeinen; u = voortgang van de lusextrusie per domein
      let s = '';
      const pts = [[570, FB_Y]];
      const loops = [];
      [[TADS[0], u1], [TADS[1], u2]].forEach(([[a, b], u]) => {
        const mid = (a + b) / 2, half = (b - a) / 2;
        const cL = mid - half * (1 - u), cR = mid + half * (1 - u);     // CTCF-posities schuiven naar de ring
        pts.push([cL, FB_Y]);
        loops.push({ mid, cL, cR, u, h: 20 + u * 105, w: 16 + u * 32 });
        pts.push([cR, FB_Y]);
      });
      pts.push([1110, FB_Y]);
      // basislijn (flanken)
      s += `<path d="M570,${FB_Y} L${f1(loops[0].cL)},${FB_Y} M${f1(loops[0].cR)},${FB_Y} L${f1(loops[1].cL)},${FB_Y} M${f1(loops[1].cR)},${FB_Y} L1110,${FB_Y}" stroke="${C.dna}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
      for (const lp of loops) {
        // stuk tussen CTCF en ring (nog niet geëxtrudeerd) + lus boven de ring
        const top = FB_Y - 14 - lp.h;
        const d = `M${f1(lp.cL)},${FB_Y} L${f1(lp.mid - 6)},${FB_Y - 6} C${f1(lp.mid - lp.w * 1.6)},${f1(FB_Y - 14 - lp.h * .45)} ${f1(lp.mid - lp.w)},${f1(top)} ${f1(lp.mid)},${f1(top)} C${f1(lp.mid + lp.w)},${f1(top)} ${f1(lp.mid + lp.w * 1.6)},${f1(FB_Y - 14 - lp.h * .45)} ${f1(lp.mid + 6)},${FB_Y - 6} L${f1(lp.cR)},${FB_Y}`;
        s += `<path d="${d}" stroke="${C.dna}" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
        s += `<path d="${d}" stroke="#cfe0ff" stroke-width="2" fill="none" stroke-dasharray="3 9" opacity=".6"/>`;
        // cohesinering
        s += `<ellipse cx="${f1(lp.mid)}" cy="${FB_Y - 8}" rx="17" ry="12" fill="none" stroke="#ffc247" stroke-width="5"/>`;
        // CTCF: convergente pijlpunten (motief-oriëntatie)
        s += `<path d="M${f1(lp.cL - 12)},${FB_Y - 13} L${f1(lp.cL + 10)},${FB_Y} L${f1(lp.cL - 12)},${FB_Y + 13} Z" fill="#ff8a3d" stroke="#0a1224" stroke-width="1.5"/>`;
        s += `<path d="M${f1(lp.cR + 12)},${FB_Y - 13} L${f1(lp.cR - 10)},${FB_Y} L${f1(lp.cR + 12)},${FB_Y + 13} Z" fill="#ff8a3d" stroke="#0a1224" stroke-width="1.5"/>`;
      }
      return s;
    }
    function hic(op) {
      if (op < .01) return '';
      // lineaire genoomas + driehoekige contactkaart (schets): hoge intensiteit binnen de domeinen
      const y0 = 340, x0 = 590, x1 = 1090, n = 20, cw = (x1 - x0) / n;
      const pos = i => x0 + (i + .5) * cw;
      const inTad = (i, j) => TADS.some(([a, b]) => pos(i) > a - 12 && pos(j) < b + 12);
      let s = `<g opacity="${f1(op)}"><line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${C.muted}" stroke-width="3"/>`;
      for (let i = 0; i < n; i++) for (let j = i; j < Math.min(n, i + 9); j++) {
        const d = j - i, v = inTad(i, j) ? .95 - d * .05 : Math.max(.05, .45 - d * .12);
        const cx = x0 + (i + j + 1) * cw / 2, cy = y0 + 6 + d * cw / 2 + cw / 2 * .0, h = cw / 2;
        s += `<path d="M${f1(cx)},${f1(cy)} L${f1(cx + h)},${f1(cy + h)} L${f1(cx)},${f1(cy + 2 * h)} L${f1(cx - h)},${f1(cy + h)} Z" fill="#ff4d4d" fill-opacity="${f1(clamp(v, 0, 1))}"/>`;
      }
      for (const [a, b] of TADS) s += `<path d="M${a},${y0 + 6} L${(a + b) / 2},${y0 + 6 + (b - a) / 2} L${b},${y0 + 6}" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="5 4"/>` + txt((a + b) / 2, y0 + 60, 'TAD', '#fff', 16);
      s += txt(1100, 505, T2('Hi-C-contactkaart (schets)', 'Hi-C contact map (sketch)'), C.muted, 15, 'end');
      return s + '</g>';
    }
    return {
      update(t, s) {
        const { step, p } = s;
        // focus: de andere panelen dimmen
        panels.forEach((id, k) => $(id).setAttribute('opacity', focus[step] === null || focus[step] === k ? 1 : .2));
        // ingezoomd op paneel ① (hoger dan het beeld): kader weg, de kern zelf staat volledig in beeld
        pAframe.setAttribute('opacity', step === 1 ? 0 : 1);
        const fsT = step === 0 ? tfs(0) : lerp(tfs(step - 1), tfs(step), ease(sub(p, 0, .2)));
        titles.forEach(({ el, y0 }) => { el.setAttribute('font-size', f1(fsT)); el.setAttribute('y', f1(y0 + fsT + 10)); });
        // detaillabels alleen in de stap waarin hun paneel centraal staat (paneeltitels blijven)
        const cur = focus[step] ?? -1, prev = step > 0 ? focus[step - 1] ?? -1 : -1, fin = sub(p, 0, .3);
        const u1 = step < 2 ? 0 : step === 2 ? .92 * ease(sub(p, .05, .55)) : .92;
        const u2 = step < 2 ? 0 : step === 2 ? .92 * ease(sub(p, .35, .9)) : .92;
        $('cr-fibre').innerHTML = fibre(u1, u2) +
          (step === 2 ? txt(845, 365, T2('cohesine (ring) → lus tot aan CTCF ▶ ◀', 'cohesin (ring) → loop up to CTCF ▶ ◀'), '#ffc247', 16) : '');
        $('cr-hic').innerHTML = hic(step < 3 ? 0 : step === 3 ? ease(sub(p, 0, .35)) : 1);
        panels.forEach((id, k) => {
          const o = cur === k && prev === k ? 1 : cur === k ? fin : prev === k ? 1 - fin : 0;
          $(id).querySelectorAll('text:not(.ptitle)').forEach(el => el.setAttribute('opacity', f1(o)));
        });
      },
    };
  },
};
