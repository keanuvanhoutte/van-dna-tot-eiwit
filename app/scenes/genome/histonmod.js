import { C, L, T2, svgOpen, txt, mono, pill, cam, FULL, sub, ease, lerp, clamp, f1, AACLASS, CLASSCOL } from '../../kit.js';
import { ST, HC, nucleo, flag, smooth } from './_a_kit.js';
import { eiwitPad } from '../../bio.js';

/*
 * Histonmodificaties op de H3-staart (humaan H3.1, residuen 1–30 na verwijdering van Met1):
 * ARTKQTARKSTGGKAPRKQLATKAARKSAP — lysines K4, K9, K14, K18, K23, K27.
 */
const H3TAIL = 'ARTKQTARKSTGGKAPRKQLATKAARKSAP';
const NX = [320, 430], NR = 150;                      // nucleosoom
const TY = 330, DY = 225, PITCH = 29;                  // hoogte staart, hoogte DNA, residu-afstand
const rx = i => 1530 - (i - 1) * PITCH;               // residu i (1 = N-terminus, rechts)
const ACK = [9, 14, 18, 23, 27];                       // geacetyleerd in stap 2
const COLS = { ac: C.acetyl, act: C.methyl, rep: C.methyl };
const EFF = { aan: C.ok, stil: C.danger };   // het effect apart van de chemische groep: rand + ▲ aan / ▼ stil (K4me3 aan; K9me3, K27me3 stil)
/* merktekenvlag met effectrand en een klein '▲ aan' / '▼ stil' ernaast */
const effFlag = (x, y, lbl, col, eff, fs) => { const w = lbl.length * fs * .62 + 10, ec = EFF[eff]; return flag(x, y, lbl, col, 1, fs).replace(`fill="${col}"/>`, `fill="${col}" stroke="${ec}" stroke-width="${f1(fs * .2)}"/>`) + txt(x + w + 4, y - fs * 1.62, eff === 'aan' ? T2('▲ aan', '▲ on') : T2('▼ stil', '▼ off'), ec, fs * 1.25, 'start', 800); };   // iets groter dan de vlagtekst: blijft ≥ 13 px in het overzicht   // één kleur per merkteken (kit C.methyl / C.acetyl); actief of onderdrukkend hangt af van de plaats, niet van de groep

export default {
  id: 'histonmod',
  title: { nl: 'Histonmodificaties', en: 'Histone modifications' },
  scale: { nl: '≈ 1–10 nm', en: '≈ 1–10 nm' },
  time: { nl: 'acetylatie: snel omkeerbaar; methylatie: stabieler, deels doorgegeven bij celdeling', en: 'acetylation: quickly reversible; methylation: more stable, partly passed on at cell division' },
  org: { nl: 'mens (histon H3.1)', en: 'human (histone H3.1)' },
  legend: [[HC.H3, 'H3'], [HC.H4, 'H4'], [HC.H2A, 'H2A'], [HC.H2B, 'H2B'], [CLASSCOL['+'], { nl: 'lysine (K, positief)', en: 'lysine (K, positive)' }],
    [COLS.ac, { nl: 'acetylgroep (ac)', en: 'acetyl group (ac)' }], [C.methyl, { nl: 'methylgroep (me)', en: 'methyl group (me)' }], [EFF.aan, { nl: 'groene rand: gen aan', en: 'green edge: gene on' }], [EFF.stil, { nl: 'rode rand: gen stil', en: 'red edge: gene off' }], [C.prot, { nl: 'schrijvers / wissers / lezers', en: 'writers / erasers / readers' }]],
  simplified: {
    nl: 'Alleen de eerste 30 residuen van één H3-staart zijn getekend; er zijn per nucleosoom acht N-terminale staarten (plus twee C-terminale staarten van H2A) en nog veel meer modificaties (fosforylatie, ubiquitinering, …), ook in de bolvormige kern. Dat acetylatie de staart "loslaat" van het DNA is een vereenvoudiging: het verzwakt vooral elektrostatische contacten en creëert bindingsplaatsen voor lezers. De combinaties in beeld zijn voorbeelden.',
    en: 'Only the first 30 residues of one H3 tail are drawn; each nucleosome has eight N-terminal tails (plus two C-terminal tails of H2A) and many more modifications (phosphorylation, ubiquitination, …), also in the globular core. That acetylation "releases" the tail from the DNA is a simplification: it mainly weakens electrostatic contacts and creates binding sites for readers. The combinations shown are examples.' },
  steps: [
    ST(7500, cam(390, 440, 900), 'Staarten voor merktekens', 'Tails for marks',
      'Elk histon heeft een soepele staart die uitsteekt. Daar komen de meeste chemische merktekens op.',
      'Each histone has a flexible tail that sticks out. Most chemical marks go there.'),
    ST(8000, cam(1100, 320, 960), 'Een staart vol lysines', 'A tail full of lysines',
      'In het begin van de H3-staart zitten zes lysines (K). Hun plus-lading trekt het negatief geladen DNA aan.',
      'The start of the H3 tail holds six lysines (K). Their positive charge attracts the negatively charged DNA.'),
    ST(9000, cam(1100, 380, 960), 'Een merkteken maakt het losser', 'A mark loosens it',
      'Een enzym zet een klein groepje (acetyl) op een lysine. De plus-lading verdwijnt en het chromatine wordt losser.',
      'An enzyme puts a small group (acetyl) on a lysine. The positive charge disappears and the chromatin loosens.'),
    ST(7500, cam(1100, 380, 960), 'Het merkteken gaat er weer af', 'The mark comes off again',
      'Andere enzymen halen het acetyl weer weg. Dit merkteken is dus snel omkeerbaar.',
      'Other enzymes remove the acetyl again. So this mark is quickly reversible.'),
    ST(8500, cam(1100, 380, 960), 'Methylgroepen erbij', 'Adding methyl groups',
      'Een lysine kan ook 1, 2 of 3 methylgroepen krijgen; de lading blijft. Drie op lysine 4 wijst op een actief gen.',
      'A lysine can also get 1, 2 or 3 methyl groups; the charge stays. Three on lysine 4 points to an active gene.'),
    ST(8500, cam(1100, 320, 960), 'Merktekens die genen stilleggen', 'Marks that silence genes',
      'Methylgroepen op andere lysines (9 en 27) houden genen juist stil, bijvoorbeeld in compact chromatine.',
      'Methyl groups on other lysines (9 and 27) keep genes silent instead, for example in compact chromatin.'),
    ST(9000, cam(1115, 560, 1060), 'Eiwitten lezen de merktekens', 'Proteins read the marks',
      'Lezer-eiwitten hebben een stukje dat op één soort merkteken past: het ene leest acetyl, het andere methyl.',
      'Reader proteins have a part that fits one kind of mark: one reads acetyl, another reads methyl.'),
    ST(7500, FULL, 'Schrijven, wissen, lezen', 'Writing, erasing, reading',
      'Schrijvers zetten merktekens, wissers halen ze weg, lezers herkennen ze. Zo bepalen ze welke genen aan kunnen.',
      'Writers place marks, erasers remove them, readers recognise them. Together they decide which genes can be on.'),
  ],
  svg() {
    const nu = nucleo(NX[0], NX[1], NR, { rot: -90, octa: true, lab: 18, w: 26 });
    // acht staarten rond het deeltje (de H3-staart rechtsboven gaat naar het sequentiepaneel)
    const tails = [[-60, HC.H3], [-120, HC.H3], [-20, HC.H4], [-160, HC.H4], [30, HC.H2B], [150, HC.H2B], [70, HC.H2A], [110, HC.H2A]];
    let tl = '';
    tails.forEach(([a, col], k) => {
      if (k === 0) return;
      const t = a * Math.PI / 180, r0 = NR * .75, r1 = NR * 1.55;
      const p0 = [NX[0] + r0 * Math.cos(t), NX[1] + r0 * Math.sin(t)], p1 = [NX[0] + r1 * Math.cos(t + .25), NX[1] + r1 * Math.sin(t + .25)];
      const pm = [NX[0] + NR * 1.2 * Math.cos(t - .15), NX[1] + NR * 1.2 * Math.sin(t - .15)];
      tl += `<path d="${smooth([p0, pm, p1])}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    });
    // DNA-ruggengraat boven de staart (negatief)
    let dna = `<path d="M660,${DY} L1560,${DY}" stroke="${C.dna}" stroke-width="10" stroke-linecap="round"/>`;
    for (let x = 680; x < 1560; x += PITCH * 1.5) dna += `<circle cx="${f1(x)}" cy="${DY}" r="9" fill="#0a1224" stroke="${C.dna2}" stroke-width="2"/><text x="${f1(x)}" y="${DY + 5}" font-size="16" text-anchor="middle" fill="${C.dna2}" font-family="Inter" font-weight="800">−</text>`;
    dna += `<g id="hm-dnalab">${txt(1560, DY - 22, T2('DNA (fosfaten, negatief)', 'DNA (phosphates, negative)'), C.dna2, 16, 'end')}</g>`;

    // lezer-tabel
    const rows = [
      [T2('acetyl-lezer', 'acetyl reader'), T2('bromodomein', 'bromodomain'), 'ac', COLS.ac, 'aan'],
      [T2('methyl-lezer', 'methyl reader'), T2('chromodomein', 'chromodomain'), T2('me3 op K9 / K27', 'me3 on K9 / K27'), COLS.rep, 'stil'],
      [T2('methyl-lezer', 'methyl reader'), T2('PHD-vinger', 'PHD finger'), T2('me3 op K4', 'me3 on K4'), COLS.act, 'aan'],
    ];
    let tab = `<rect x="690" y="560" width="850" height="270" rx="18" fill="rgba(13,20,38,.6)" stroke="#2a3a60" stroke-width="2"/>` +
      txt(715, 600, T2('Elke lezer past op één merkteken', 'Each reader fits one mark'), '#c9d2e4', 22, 'start', 700) + txt(1150, 600, T2('leest', 'reads'), C.muted, 17, 'middle', 600) + txt(1390, 600, T2('gevolg', 'result'), C.muted, 17, 'middle', 600);
    rows.forEach(([nm, vak, mark, col, eff], i) => {
      const y = 656 + i * 62;
      tab += `<path d="M720,${y - 18} q20,-12 44,0 q16,10 0,26 q-24,12 -44,0 z" fill="rgba(155,123,255,.45)" stroke="${C.prot}" stroke-width="2"/>` +
        txt(785, y - 2, nm, C.text, 21, 'start', 700) + txt(785, y + 18, vak, C.muted, 14, 'start', 600) +
        pill(1150, y - 5, 200, 34, mark, col, 1, 18).replace('fill="#fff"', 'fill="#0a1224"').replace('opacity=".9"/>', `opacity=".9" stroke="${EFF[eff]}" stroke-width="3"/>`) +
        txt(1390, y + 2, eff === 'aan' ? T2('▲ gen aan', '▲ gene on') : T2('▼ gen stil', '▼ gene off'), EFF[eff], 20, 'middle', 800);
    });

    return svgOpen() + `
    <g id="hm-nuc" data-node="nucleosoom" data-color="${HC.H3}" data-nolabel>
      ${tl}${nu.svg}
      <path id="hm-h3link" stroke="${HC.H3}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g id="hm-nuclab">${txt(NX[0], NX[1] + NR + 66, T2('nucleosoom met 8 N-staarten', 'nucleosome with 8 N-tails'), '#c9d2e4', 20).replace('<text', '<text stroke="#0a1224" stroke-width="6" paint-order="stroke"')}</g>
    </g>
    <g data-node="nucleosoom" data-color="${HC.H3}" data-label="${T2('← Nucleosoom', '← Nucleosome')}" data-nolabel><circle cx="${NX[0]}" cy="${NX[1]}" r="${NR * .8}" fill="transparent"/></g>
    <g id="hm-dna" data-node="dnahelix" data-color="${C.dna}" data-nolabel>${dna}</g>
    <g data-node="ptm" data-color="${CLASSCOL['+']}" data-label="${T2('Post-translationele modificaties', 'Post-translational modifications')}">
      <g id="hm-tail"></g><circle data-anchor="ptm" cx="800" cy="${TY + 175}" r="1" fill="none" data-pos="below"/>
    </g>
    <g id="hm-enz"></g>
    <g id="hm-chem"></g>
    <g id="hm-tab" data-node="genregulatie" data-color="${C.prot}" data-label="${T2('Genregulatie →', 'Gene regulation →')}"><g id="hm-rows">${tab}</g><g id="hm-tabsum" opacity="0">${txt(1115, 600, T2('schrijvers · wissers · lezers', 'writers · erasers · readers'), '#fff', 28, 'middle', 700)}${[[860, T2('schrijvers', 'writers'), 'HAT · KMT', COLS.ac], [1115, T2('wissers', 'erasers'), T2('HDAC · demethylase', 'HDAC · demethylase'), C.danger], [1375, T2('lezers', 'readers'), T2('bromo · chromo · PHD', 'bromo · chromo · PHD'), COLS.act]].map(([x, h, v, c]) => txt(x, 660, h, c, 28, 'middle', 700) + txt(x, 700, v, '#fff', 22)).join('')}${txt(1115, 752, T2('bepalen samen welke genen actief zijn', 'together decide which genes are active'), C.muted, 25)}</g><circle data-anchor="genregulatie" cx="1400" cy="570" r="1" fill="none"/></g>
    <g id="hm-sum"></g>
    <g data-node="chromatine" data-color="${C.dna}" data-label="${T2('Chromatine: open ↔ dicht', 'Chromatin: open ↔ closed')}" id="hm-chrom" opacity="0">
      ${pill(340, 720, 600, 50, T2('me3 op K4 · acetyl → open, gen aan', 'me3 on K4 · acetyl → open, gene on'), '#1f7a5c', 1, 22)}
      ${pill(340, 790, 600, 50, T2('me3 op K9 / K27 → compact, gen stil', 'me3 on K9 / K27 → compact, gene off'), '#8a2e3b', 1, 22)}
      <circle data-anchor="chromatine" cx="330" cy="672" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const fade = step === 7 ? ease(sub(p, 0, .3)) : 0;   // overzicht: detailtekst verdwijnt
        // --- toestand van elke lysine: '' | 'ac' | 'me1..3' ---
        const mark = {};
        const acOn = step === 2 ? ease(sub(p, .15, .6)) : step === 3 ? 1 - ease(sub(p, .2, .7)) : 0;
        if (acOn > .5) ACK.forEach(k => mark[k] = 'ac');
        if (step === 4) mark[4] = p < .35 ? 'me1' : p < .6 ? 'me2' : 'me3';
        if (step >= 5) { mark[4] = 'me3'; }
        if (step === 5) { mark[9] = 'me3r'; mark[27] = 'me3r'; delete mark[4]; }
        if (step === 6) { mark[4] = 'me3'; mark[14] = 'ac'; }
        if (step === 7) { mark[4] = 'me3'; mark[27] = 'ac'; }
        // staart zakt weg van het DNA bij acetylatie
        const drop = acOn * 55;
        let g = '';
        const pts = [];
        for (let i = 1; i <= 30; i++) pts.push([rx(i), TY + drop * (0.4 + .6 * Math.sin(i * .9) ** 2)]);
        g += `<path d="${smooth(pts)}" stroke="${HC.H3}" stroke-width="6" fill="none"/>`;
        // aantrekking lysine ↔ DNA (stippellijnen) zolang niet geacetyleerd
        pts.forEach(([x, y], k) => {
          const i = k + 1, aa = H3TAIL[k];
          if (aa === 'K' && step >= 1 && mark[i] !== 'ac') g += `<line x1="${f1(x)}" y1="${f1(y - 16)}" x2="${f1(x)}" y2="${DY + 12}" stroke="#fff" stroke-width="2" stroke-dasharray="3 5" opacity=".55"/>`;
        });
        pts.forEach(([x, y], k) => {
          const i = k + 1, aa = H3TAIL[k], isK = aa === 'K';
          const col = isK ? CLASSCOL['+'] : (CLASSCOL[AACLASS[aa]] ?? '#aaa');
          const r = isK ? 15 : 11;
          g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}" stroke="#0a1224" stroke-width="2"/>` +
            `<text x="${f1(x)}" y="${f1(y + (isK ? 6 : 4))}" font-size="${isK ? 16 : 12}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700" opacity="${f1(1 - fade)}">${aa}</text>`;
          if (isK || i === 1 || i % 5 === 0) g += `<g opacity="${f1(1 - fade)}">${txt(x, y + (isK ? 36 : 30), String(i), isK ? '#fff' : C.muted, isK ? 14 : 12, 'middle', isK ? 700 : 500)}</g>`;
          if (isK && !mark[i] && step >= 1 && step <= 3) g += txt(x + 12, y - 14, '+', '#fff', 15, 'middle', 800);
          if (isK && mark[i] && mark[i].startsWith('me') && step >= 4 && step <= 6) g += txt(x - 12, y - 14, '+', '#fff', 15, 'middle', 800);   // methyl-lysine blijft positief: '+' links van de vlag
          const m = mark[i];
          const ffs = lerp(13, 17, fade);
          if (m === 'ac') g += flag(x, y - 16, 'ac', COLS.ac, 1, ffs);
          else if (m && m.startsWith('me')) {
            const n = m.slice(2, 3), rep = m.endsWith('r');
            g += effFlag(x, y - 16, `me${n}`, rep ? COLS.rep : COLS.act, rep ? 'stil' : 'aan', ffs);
          }
        });
        g += txt(rx(1) + 30, TY + 6, 'N', C.muted, 18, 'start', 700);
        if (step <= 1) g += txt(1100, TY + 90 + drop * .5, T2('H3-staart: residuen 1–30 (N-terminus rechts)', 'H3 tail: residues 1–30 (N-terminus on the right)'), C.muted, 16);
        $('hm-tail').innerHTML = g;
        // verbinding met het nucleosoom
        const a = -60 * Math.PI / 180;
        $('hm-h3link').setAttribute('d', smooth([[NX[0] + NR * .75 * Math.cos(a), NX[1] + NR * .75 * Math.sin(a)], [NX[0] + NR * 1.35, NX[1] - NR * .95], [rx(30) - 60, TY + drop * .5], [rx(30), pts[29][1]]]));

        // --- enzymen ---
        let e = '';
        // arm van het enzym tot tegen de lysine (actieve plaats), langs het nummerlabel
        const arm = (x, y, op) => op < .9 ? '' : `<path d="M${f1(x + 14)},${f1(y + 50)} Q${f1(x + 16)},${f1(y + 28)} ${f1(x + 9)},${f1(y + 12)}" stroke="${C.prot}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
        // enzym (bobbelig) dat met een arm tegen de staart ligt
        const enz = (x, y, label, op, col = C.prot) => op < .01 ? '' : `<g opacity="${f1(op)}"><path d="${eiwitPad(x, y, 14 + label.length * 5.2, 28, 1093 + label.length, .14)}" fill="rgba(155,123,255,.3)" stroke="${col}" stroke-width="3"/>${txt(x, y + 6, label, '#fff', 17, 'middle', 700)}</g>`;
        if (step === 2) { const k = ease(sub(p, 0, .3)); e += enz(lerp(1650, rx(14) + 24, k), pts[13][1] + 74, T2('schrijver (HAT)', 'writer (HAT)'), 1 - sub(p, .8, 1)) + arm(rx(14), pts[13][1], k * (1 - sub(p, .8, 1))); }
        if (step === 3) { const k = ease(sub(p, 0, .3)); e += enz(lerp(1650, rx(18) + 24, k), pts[17][1] + 74, T2('wisser (HDAC)', 'eraser (HDAC)'), 1 - sub(p, .8, 1)) + arm(rx(18), pts[17][1], k * (1 - sub(p, .8, 1))); }
        if (step === 4) e += enz(rx(4) - 30, TY + 100, T2('schrijver (KMT)', 'writer (KMT)'), sub(p, 0, .2) * (1 - sub(p, .85, 1)));
        if (step === 5) { e += enz(rx(9), TY + 100, T2('schrijver (SUV39H1)', 'writer (SUV39H1)'), sub(p, 0, .2)); e += enz(rx(27), TY + 100, T2('schrijver (PRC2)', 'writer (PRC2)'), sub(p, .2, .4)); }
        if (step === 6) {
          // lezers dokken op hun merkteken
          const k = ease(sub(p, .1, .5));
          const reader = (x, label, vak, col) => { const y0 = TY + 44 + (1 - k) * 60; return `<g opacity="${f1(k)}"><path d="M${f1(x - 34)},${f1(y0 + 30)} q34,30 68,0 l-12,-26 q-22,12 -44,0 z" fill="rgba(155,123,255,.45)" stroke="${col}" stroke-width="3"/>${txt(x, y0 + 84, label, '#fff', 20, 'middle', 700)}${txt(x, y0 + 104, vak, C.muted, 14, 'middle', 600)}</g>`; };
          e += reader(rx(4), T2('methyl-lezer', 'methyl reader'), T2('PHD-vinger', 'PHD finger'), COLS.act) + reader(rx(14), T2('acetyl-lezer', 'acetyl reader'), T2('bromodomein', 'bromodomain'), COLS.ac);
        }
        $('hm-enz').innerHTML = e;

        // --- chemie-inzet ---
        let ch = '';
        /* pictogram i.p.v. chemie: een lysine-bolletje met of zonder '+' en zijn merkteken, plus één zin */
        const box = (op, html) => op < .01 ? '' : `<g opacity="${f1(op)}"><rect x="960" y="476" width="580" height="76" rx="14" fill="rgba(13,20,38,.85)" stroke="#2a3a60" stroke-width="2"/>${html}</g>`;
        const kIco = (x, plus, m, mc) => `<circle cx="${x}" cy="520" r="17" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>${txt(x, 526, 'K', '#0a1224', 17, 'middle', 800, 'JetBrains Mono')}` +
          (plus ? txt(x + 15, 504, '+', '#fff', 20, 'middle', 800) : '') + (m ? flag(x, 504, m, mc, 1, 14) : '');
        const pijl = x => `<path d="M${x},514 L${x + 40},514" stroke="#fff" stroke-width="3" marker-end="url(#arrow)"/>`;
        if (step === 2) ch = box(1, kIco(1005, true) + pijl(1040) + kIco(1115, false, 'ac', COLS.ac) + txt(1150, 524, T2('+ lading weg → DNA laat los', '+ charge gone → DNA lets go'), '#fff', 21, 'start', 700));
        if (step === 3) ch = box(1, kIco(1005, false, 'ac', COLS.ac) + pijl(1040) + kIco(1115, true) + txt(1150, 524, T2('+ lading terug → DNA hecht weer', '+ charge back → DNA binds again'), '#fff', 21, 'start', 700));
        if (step === 4) ch = box(1, kIco(1005, true, 'me3', COLS.act) + txt(1065, 524, T2('1, 2 of 3 methyl: de + lading blijft', '1, 2 or 3 methyl: the + charge stays'), '#fff', 21, 'start', 700));
        $('hm-chem').innerHTML = ch;

        // tabel en samenvatting
        $('hm-tab').setAttribute('opacity', f1(step >= 7 ? 1 : step === 6 ? ease(sub(p, .45, .75)) : 0));   // pas in stap 7, eerst dokken de lezers
        [...$('hm-rows').children].slice(1).forEach(el => el.setAttribute('opacity', f1(1 - fade)));   // kader blijft, inhoud wijkt voor de samenvatting
        $('hm-tabsum').setAttribute('opacity', f1(fade));
        $('hm-dnalab').setAttribute('opacity', f1(1 - fade));
        $('hm-nuclab').setAttribute('opacity', f1(step === 0 ? 1 : step === 7 ? 0 : .5));
        $('hm-dna').setAttribute('opacity', step === 0 ? .4 : 1);
        $('hm-chrom').setAttribute('opacity', step === 7 ? ease(sub(p, .1, .4)) : 0);
      },
    };
  },
};
