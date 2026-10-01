import { C, L, T2, svgOpen, txt, mono, pill, cam, FULL, sub, ease, lerp, clamp, f1, AACLASS, CLASSCOL } from '../../kit.js';
import { ST, HC, nucleo, flag, smooth } from './_a_kit.js';

/*
 * Histonmodificaties op de H3-staart (humaan H3.1, residuen 1–30 na verwijdering van Met1):
 * ARTKQTARKSTGGKAPRKQLATKAARKSAP — lysines K4, K9, K14, K18, K23, K27.
 */
const H3TAIL = 'ARTKQTARKSTGGKAPRKQLATKAARKSAP';
const NX = [320, 430], NR = 150;                      // nucleosoom
const TY = 330, DY = 225, PITCH = 29;                  // hoogte staart, hoogte DNA, residu-afstand
const rx = i => 1530 - (i - 1) * PITCH;               // residu i (1 = N-terminus, rechts)
const ACK = [9, 14, 18, 23, 27];                       // geacetyleerd in stap 2
const COLS = { ac: C.chain, act: '#5fd3e6', rep: C.danger };

export default {
  id: 'histonmod',
  title: { nl: 'Histonmodificaties', en: 'Histone modifications' },
  scale: { nl: '≈ 1–10 nm', en: '≈ 1–10 nm' },
  time: { nl: 'acetylatie: minuten; methylatie: uren tot celgeneraties', en: 'acetylation: minutes; methylation: hours to cell generations' },
  org: { nl: 'mens (histon H3.1)', en: 'human (histone H3.1)' },
  legend: [[HC.H3, 'H3'], [HC.H4, 'H4'], [HC.H2A, 'H2A'], [HC.H2B, 'H2B'], [CLASSCOL['+'], { nl: 'lysine (K, positief)', en: 'lysine (K, positive)' }],
    [COLS.ac, { nl: 'acetyl (ac)', en: 'acetyl (ac)' }], [COLS.act, { nl: 'activerende methylatie', en: 'activating methylation' }], [COLS.rep, { nl: 'onderdrukkende methylatie', en: 'repressive methylation' }], [C.prot, { nl: 'schrijvers / wissers / lezers', en: 'writers / erasers / readers' }]],
  simplified: {
    nl: 'Alleen de eerste 30 residuen van één H3-staart zijn getekend; er zijn acht staarten per nucleosoom en nog veel meer modificaties (fosforylatie, ubiquitinering, …), ook in de bolvormige kern. Dat acetylatie de staart "loslaat" van het DNA is een vereenvoudiging: het verzwakt vooral elektrostatische contacten en creëert bindingsplaatsen voor lezers. De combinaties in beeld zijn voorbeelden; een lysine draagt nooit tegelijk acetyl en methyl.',
    en: 'Only the first 30 residues of one H3 tail are drawn; there are eight tails per nucleosome and many more modifications (phosphorylation, ubiquitination, …), also in the globular core. That acetylation "releases" the tail from the DNA is a simplification: it mainly weakens electrostatic contacts and creates binding sites for readers. The combinations shown are examples; a lysine never carries acetyl and methyl at the same time.' },
  steps: [
    ST(7500, cam(390, 440, 900), 'Histonstaarten', 'Histone tails',
      'Elk van de acht kernhistonen heeft een flexibele N-terminale staart die buiten het nucleosoom uitsteekt. Hier worden de meeste merktekens aangebracht.',
      'Each of the eight core histones has a flexible N-terminal tail that sticks out of the nucleosome. Most marks are placed here.'),
    ST(8000, cam(1100, 320, 960), 'De H3-staart: rijk aan lysine', 'The H3 tail: rich in lysine',
      'De eerste 30 aminozuren van H3 bevatten zes lysines (K). Hun positieve lading trekt het negatief geladen DNA aan.',
      'The first 30 amino acids of H3 contain six lysines (K). Their positive charge attracts the negatively charged DNA.'),
    ST(9000, cam(1100, 380, 960), 'Acetylatie door HATs', 'Acetylation by HATs',
      'Histonacetyltransferasen (HATs, bv. p300/CBP, GCN5) zetten een acetylgroep van acetyl-CoA op lysine. De positieve lading verdwijnt: chromatine wordt losser.',
      'Histone acetyltransferases (HATs, e.g. p300/CBP, GCN5) transfer an acetyl group from acetyl-CoA onto lysine. The positive charge is lost: chromatin loosens.'),
    ST(7500, cam(1100, 380, 960), 'Deacetylatie door HDACs', 'Deacetylation by HDACs',
      'Histondeacetylasen (HDACs) halen de acetylgroepen weer weg. Zo is acetylatie snel omkeerbaar.',
      'Histone deacetylases (HDACs) remove the acetyl groups again. This makes acetylation quickly reversible.'),
    ST(8500, cam(1100, 380, 960), 'Methylatie: me1, me2, me3', 'Methylation: me1, me2, me3',
      'Methyltransferasen (met SAM) zetten 1, 2 of 3 methylgroepen op een lysine. De lading blijft! H3K4me3 markeert actieve promoters.',
      'Methyltransferases (using SAM) add 1, 2 or 3 methyl groups to a lysine. The charge remains! H3K4me3 marks active promoters.'),
    ST(8500, cam(1100, 320, 960), 'Onderdrukkende merktekens', 'Repressive marks',
      'H3K9me3 (SUV39H1, SETDB1) kenmerkt heterochromatine; H3K27me3 (PRC2/EZH2) houdt ontwikkelingsgenen stil via Polycomb.',
      'H3K9me3 (SUV39H1, SETDB1) marks heterochromatin; H3K27me3 (PRC2/EZH2) keeps developmental genes silent via Polycomb.'),
    ST(9000, cam(1115, 560, 1060), 'Lezers: de "histoncode"', 'Readers: the "histone code"',
      'Eiwitdomeinen herkennen specifieke merktekens: bromodomein ↔ acetyl-K, chromodomein ↔ methyl-K (HP1 ↔ H3K9me3), PHD-vinger ↔ H3K4me3.',
      'Protein domains recognise specific marks: bromodomain ↔ acetyl-K, chromodomain ↔ methyl-K (HP1 ↔ H3K9me3), PHD finger ↔ H3K4me3.'),
    ST(7500, FULL, 'Schrijvers, wissers, lezers', 'Writers, erasers, readers',
      'Samen bepalen ze of chromatine open (actief) of dicht (stil) is. Dat stuurt welke genen afgelezen kunnen worden → genregulatie.',
      'Together they determine whether chromatin is open (active) or closed (silent). This controls which genes can be read → gene regulation.'),
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
      [T2('bromodomein', 'bromodomain'), 'K-ac', COLS.ac, T2('bv. BRD4, in veel HATs en remodelers', 'e.g. BRD4, in many HATs and remodellers')],
      [T2('chromodomein', 'chromodomain'), 'K9me3 / K27me3', COLS.rep, T2('HP1 (K9me3), Polycomb-CBX (K27me3)', 'HP1 (K9me3), Polycomb CBX (K27me3)')],
      [T2('PHD-vinger', 'PHD finger'), 'K4me3', COLS.act, T2('bv. TAF3 (TFIID), ING-eiwitten', 'e.g. TAF3 (TFIID), ING proteins')],
    ];
    let tab = `<rect x="690" y="560" width="850" height="270" rx="18" fill="rgba(13,20,38,.6)" stroke="#2a3a60" stroke-width="2"/>` +
      txt(715, 598, T2('Lezerdomeinen', 'Reader domains'), '#c9d2e4', 20, 'start', 700);
    rows.forEach(([nm, mark, col, ex], i) => {
      const y = 650 + i * 62;
      tab += `<path d="M720,${y - 18} q20,-12 44,0 q16,10 0,26 q-24,12 -44,0 z" fill="rgba(155,123,255,.45)" stroke="${C.prot}" stroke-width="2"/>` +
        txt(785, y + 1, nm, C.text, 19, 'start', 700) + pill(1060, y - 5, 170, 30, mark, col, 1, 15) + txt(1160, y + 1, ex, C.muted, 15, 'start', 500);
    });

    return svgOpen() + `
    <g id="hm-nuc">
      ${tl}${nu.svg}
      <path id="hm-h3link" stroke="${HC.H3}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <g id="hm-nuclab">${txt(NX[0], NX[1] + NR + 66, T2('nucleosoom met 8 staarten', 'nucleosome with 8 tails'), '#c9d2e4', 20).replace('<text', '<text stroke="#0a1224" stroke-width="6" paint-order="stroke"')}</g>
    </g>
    <g data-node="nucleosoom" data-color="${HC.H3}" data-label="${T2('← Nucleosoom', '← Nucleosome')}" data-nolabel><circle cx="${NX[0]}" cy="${NX[1]}" r="${NR * .8}" fill="transparent"/></g>
    <g id="hm-dna">${dna}</g>
    <g data-node="ptm" data-color="${CLASSCOL['+']}" data-label="${T2('Post-translationele modificaties', 'Post-translational modifications')}">
      <g id="hm-tail"></g><circle data-anchor="ptm" cx="660" cy="${TY + 60}" r="1" fill="none" data-pos="below"/>
    </g>
    <g id="hm-enz"></g>
    <g id="hm-chem"></g>
    <g id="hm-tab" data-node="genregulatie" data-color="${C.prot}" data-label="${T2('Genregulatie →', 'Gene regulation →')}"><g id="hm-rows">${tab}</g><g id="hm-tabsum" opacity="0">${txt(1115, 690, T2('schrijvers · wissers · lezers', 'writers · erasers · readers'), '#fff', 28, 'middle', 700)}${txt(1115, 740, T2('bepalen samen welke genen actief zijn', 'together decide which genes are active'), C.muted, 22)}</g><circle data-anchor="genregulatie" cx="1400" cy="570" r="1" fill="none"/></g>
    <g id="hm-sum"></g>
    <g data-node="chromatine" data-color="${C.dna}" data-label="${T2('Chromatine: open ↔ dicht', 'Chromatin: open ↔ closed')}" id="hm-chrom" opacity="0">
      ${pill(340, 720, 600, 50, T2('H3K4me3 · H3K27ac → open, actief', 'H3K4me3 · H3K27ac → open, active'), '#1f7a5c', 1, 22)}
      ${pill(340, 790, 600, 50, T2('H3K9me3 · H3K27me3 → compact, stil', 'H3K9me3 · H3K27me3 → compact, silent'), '#8a2e3b', 1, 22)}
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
          const m = mark[i];
          const ffs = lerp(13, 17, fade);
          if (m === 'ac') g += flag(x, y - 16, 'ac', COLS.ac, 1, ffs);
          else if (m && m.startsWith('me')) {
            const n = m.slice(2, 3), rep = m.endsWith('r');
            g += flag(x, y - 16, `me${n}`, rep ? COLS.rep : COLS.act, 1, ffs);
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
        const enz = (x, y, label, op, col = C.prot) => op < .01 ? '' : `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${14 + label.length * 5.2}" ry="28" fill="rgba(155,123,255,.3)" stroke="${col}" stroke-width="3"/>${txt(x, y + 6, label, '#fff', 17, 'middle', 700)}</g>`;
        if (step === 2) { const k = ease(sub(p, 0, .3)); e += enz(lerp(1650, rx(14), k), TY + 100, 'HAT', 1 - sub(p, .8, 1)); }
        if (step === 3) { const k = ease(sub(p, 0, .3)); e += enz(lerp(1650, rx(18), k), TY + 100, 'HDAC', 1 - sub(p, .8, 1)); }
        if (step === 4) e += enz(rx(4) - 30, TY + 100, T2('KMT (SET1/MLL)', 'KMT (SET1/MLL)'), sub(p, 0, .2) * (1 - sub(p, .85, 1)));
        if (step === 5) { e += enz(rx(9), TY + 100, 'SUV39H1', sub(p, 0, .2)); e += enz(rx(27), TY + 100, 'PRC2 (EZH2)', sub(p, .2, .4)); }
        if (step === 6) {
          // lezers dokken op hun merkteken
          const k = ease(sub(p, .1, .5));
          const reader = (x, label, col) => { const y0 = TY + 44 + (1 - k) * 60; return `<g opacity="${f1(k)}"><path d="M${f1(x - 34)},${f1(y0 + 30)} q34,30 68,0 l-12,-26 q-22,12 -44,0 z" fill="rgba(155,123,255,.45)" stroke="${col}" stroke-width="3"/>${txt(x, y0 + 82, label, '#fff', 17, 'middle', 700)}</g>`; };
          e += reader(rx(4), T2('PHD-vinger', 'PHD finger'), COLS.act) + reader(rx(14), T2('bromodomein', 'bromodomain'), COLS.ac);
        }
        $('hm-enz').innerHTML = e;

        // --- chemie-inzet ---
        let ch = '';
        const box = (op, html) => op < .01 ? '' : `<g opacity="${f1(op)}"><rect x="690" y="470" width="850" height="84" rx="14" fill="rgba(13,20,38,.85)" stroke="#2a3a60" stroke-width="2"/>${html}</g>`;
        if (step === 2 || step === 3) {
          ch = box(1, mono(830, 522, 'Lys–NH₃⁺', CLASSCOL['+'], 22) + `<path d="M${step === 2 ? '950,512 L1090,512' : '1090,512 L950,512'}" stroke="#fff" stroke-width="3" marker-end="url(#arrow)"/>` +
            txt(1020, 498, step === 2 ? T2('HAT + acetyl-CoA', 'HAT + acetyl-CoA') : 'HDAC', '#fff', 15) + mono(1290, 522, 'Lys–NH–CO–CH₃', COLS.ac, 22) + txt(1290, 545, T2('neutraal', 'neutral'), COLS.ac, 14));
        }
        if (step === 4) ch = box(1, mono(800, 522, 'NH₃⁺', CLASSCOL['+'], 20) + txt(870, 518, '→', '#fff', 22) + mono(960, 522, 'NH₂⁺CH₃', COLS.act, 20) + txt(1050, 518, '→', '#fff', 22) +
          mono(1150, 522, 'NH⁺(CH₃)₂', COLS.act, 20) + txt(1250, 518, '→', '#fff', 22) + mono(1350, 522, 'N⁺(CH₃)₃', COLS.act, 20) + txt(1115, 548, T2('me1 · me2 · me3 — blijft positief geladen (methyldonor: SAM)', 'me1 · me2 · me3 — stays positively charged (methyl donor: SAM)'), C.muted, 14));
        $('hm-chem').innerHTML = ch;

        // tabel en samenvatting
        $('hm-tab').setAttribute('opacity', f1(step >= 6 ? 1 : step === 0 ? .2 : .08));
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
