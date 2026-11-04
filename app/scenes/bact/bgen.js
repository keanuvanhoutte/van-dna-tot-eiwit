import { C, T2, svgOpen, txt, mono, cam, sub, ease, lerp, f1, nt } from '../../kit.js';
import { K, prot, panel, dsRing, onCircle } from './_bkit.js';

/* Onderdelen van een bacterieel gen + σ-factoren + "splicen?" + noodzakelijke delen (oriC, essentiële genen).
 * Bronnen: Cooper (Transcription in Prokaryotes), Feklístov et al. 2014 (σ-factoren), Shine & Dalgarno 1974,
 * Ray-Soni et al. 2016 (terminatie), Edgell et al. 2000 + Lambowitz & Zimmerly 2011 (introns), Mills et al. 2014 (inteïnes),
 * Katayama et al. 2010 (DnaA/oriC), Baba et al. 2006 (Keio: essentiële genen). */
const Y0 = 300;
const E = { m35: [150, 240], m10: [330, 420], op: [455, 545], sd: [610, 700], orf: [740, 1220], start: [740, 800], stop: [1160, 1220], term: [1280, 1420] };
const TSS = 450;
/* x-bereik van elk onderdeel (kader + label) op de genkaart */
const PARTS = [['m35', 150, 240], ['m10', 330, 420], ['plab', 235, 335], ['op', 455, 545], ['tss', 450, 500], ['sd', 610, 700], ['start', 740, 800], ['orf', 740, 1220], ['stop', 1160, 1220], ['term', 1280, 1420]];
const COL = { prom: K.sig, op: K.laci, sd: K.sd, orf: '#b98cff', term: K.term };

const SIGMA = [
  ['σ70', 'RpoD', { nl: 'huishoudgenen (de meeste genen)', en: 'housekeeping genes (most genes)' }],
  ['σ38', 'RpoS', { nl: 'stress en stilstaande groei', en: 'stress and stationary phase' }],
  ['σ32', 'RpoH', { nl: 'hitte (hitteschokeiwitten)', en: 'heat (heat-shock proteins)' }],
  ['σ24', 'RpoE', { nl: 'schade aan de celenvelop', en: 'damage to the cell envelope' }],
  ['σ54', 'RpoN', { nl: 'stikstoftekort', en: 'nitrogen limitation' }],
  ['σ28', 'FliA', { nl: 'zweepharen (zwemmen)', en: 'flagella (swimming)' }],
  ['σ19', 'FecI', { nl: 'ijzeropname (ijzercitraat)', en: 'iron uptake (ferric citrate)' }],
];

const SC = {
  id: 'bgen',
  title: { nl: 'De onderdelen van een bacterieel gen', en: 'The parts of a bacterial gene' },
  scale: { nl: 'gemiddeld ≈ 1 kb per gen', en: 'on average ≈ 1 kb per gene' }, time: '—',
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[COL.prom, { nl: 'promoter (−35, −10)', en: 'promoter (−35, −10)' }], [COL.op, 'operator'], [COL.sd, 'Shine-Dalgarno'], [COL.orf, { nl: 'coderend deel', en: 'coding part' }], [COL.term, 'terminator'], [C.dna, 'DNA']],
  simplified: {
    nl: 'Lengtes niet op schaal. Niet elk gen heeft een operator, en de plaats ervan verschilt (bij lac overlapt hij het startpunt). Er zijn ook terminators die het eiwit Rho nodig hebben in plaats van een haarspeld. De consensusvolgordes (TTGACA, TATAAT, AGGAGG) zijn idealen: echte genen wijken er meestal wat van af. Het getal 303 komt uit één genoombrede knock-outstudie in rijk medium; welke genen onmisbaar zijn, hangt af van de groeiomstandigheden.',
    en: 'Lengths not to scale. Not every gene has an operator, and its position varies (in lac it overlaps the start site). Some terminators need the protein Rho instead of a hairpin. The consensus sequences (TTGACA, TATAAT, AGGAGG) are ideals: real genes usually differ somewhat. The number 303 comes from one genome-wide knockout study in rich medium; which genes are essential depends on growth conditions.' },
  steps: [
    { dur: 8000, cam: cam(800, 430, 1600), title: { nl: 'Een gen is een rij onderdelen', en: 'A gene is a row of parts' },
      text: { nl: 'Elk stukje heeft een taak: aanzetten, starten, vertalen en stoppen. Samen vormen ze één gen.', en: 'Each piece has a job: switching on, starting, translating and stopping. Together they form one gene.' } },
    { dur: 8000, cam: cam(300, 300, 760), title: { nl: 'Promoter: hier begint het kopiëren', en: 'Promoter: copying starts here' },
      text: { nl: 'Twee korte stukjes, −35 en −10, wijzen de startplek aan. Een σ-factor herkent ze.', en: 'Two short pieces, −35 and −10, mark the start site. A σ factor recognises them.' } },
    { dur: 10000, cam: cam(800, 470, 1600), title: { nl: 'σ-factoren: schakelaars voor groepen genen', en: 'σ factors: switches for groups of genes' },
      text: { nl: 'E. coli heeft zeven σ-factoren. Elke σ-factor zet een eigen groep genen aan, bv. bij hitte.', en: 'E. coli has seven σ factors. Each σ factor switches on its own group of genes, e.g. in heat.' } },
    { dur: 8000, cam: cam(400, 290, 860), title: { nl: 'Operator: de aan/uit-knop', en: 'Operator: the on/off button' },
      text: { nl: 'Een rem-eiwit (repressor) kan op de operator zitten. Een activator helpt het kopiëren juist op gang.', en: 'A brake protein (repressor) can sit on the operator. An activator helps copying get going instead.' } },
    { dur: 8000, cam: cam(680, 270, 760), title: { nl: 'Shine-Dalgarno: hier landt het ribosoom', en: 'Shine-Dalgarno: where the ribosome lands' },
      text: { nl: 'Vlak voor het startcodon ligt AGGAGG. Daar bindt het ribosoom, zodat het op de juiste plek begint.', en: 'Just before the start codon lies AGGAGG. The ribosome binds there, so it starts at the right spot.' } },
    { dur: 9000, cam: cam(1040, 270, 1000), title: { nl: 'Coderend deel en terminator', en: 'Coding part and terminator' },
      text: { nl: 'Van start- tot stopcodon staat de code voor het eiwit. Daarna vouwt het RNA een haarspeld die het kopiëren stopt.', en: 'From start to stop codon lies the code for the protein. Then the RNA folds a hairpin that stops copying.' } },
    { dur: 10000, cam: cam(800, 470, 1600), title: { nl: 'Splicen? Bijna nooit', en: 'Splicing? Almost never' },
      text: { nl: 'Bacteriën hebben geen spliceosoom. De zeldzame introns knippen zichzelf eruit.', en: 'Bacteria have no spliceosome. The rare introns cut themselves out.' } },
    { dur: 10000, cam: cam(800, 470, 1600), title: { nl: 'Onmisbaar: oriC en ≈ 300 genen', en: 'Essential: oriC and ≈ 300 genes' },
      text: { nl: 'Het chromosoom heeft één startplaats voor kopiëren: oriC. Ongeveer 300 genen kan de cel niet missen.', en: 'The chromosome has one starting point for copying: oriC. The cell cannot do without about 300 genes.' } },
  ],
  svg() {
    const box = (k, col, lab, size = 24, dy = 64) => { const [a, b] = E[k]; return `<rect x="${a}" y="${Y0 - 20}" width="${b - a}" height="40" rx="6" fill="${col}" fill-opacity=".18" stroke="${col}" stroke-width="2.5"/>` + txt((a + b) / 2, Y0 + dy, lab, col, size, 'middle', 700); };
    return svgOpen() + `
    <g id="bg-dna">
      <line x1="60" y1="${Y0 - 9}" x2="1540" y2="${Y0 - 9}" stroke="${C.dna}" stroke-width="5"/><line x1="60" y1="${Y0 + 9}" x2="1540" y2="${Y0 + 9}" stroke="${C.dna2}" stroke-width="5"/>
      ${txt(40, Y0 - 2, "5′", C.muted, 18)}${txt(1562, Y0 - 2, "3′", C.muted, 18)}
      <g data-node="bpol" data-color="${COL.prom}" data-label="${T2('RNA-polymerase in 3D', 'RNA polymerase in 3D')}"><g id="bg-m35">${box('m35', COL.prom, '−35')}</g><g id="bg-m10">${box('m10', COL.prom, '−10')}</g><circle data-anchor="bpol" cx="190" cy="40" r="1" fill="none"/></g>
      <g id="bg-plab">${txt(285, Y0 + 104, 'promoter', COL.prom, 22)}</g>
      <g data-node="operon" data-color="${COL.op}" data-label="${T2('Voorbeeld: lac-operon', 'Example: lac operon')}"><g id="bg-op">${box('op', COL.op, 'operator', 22, 104)}</g><circle data-anchor="operon" cx="480" cy="40" r="1" fill="none"/></g>
      <g id="bg-tss"><path d="M${TSS},${Y0 - 24} v-36 h28" stroke="${C.text}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>${txt(TSS - 8, Y0 - 40, '+1', C.text, 22, 'end')}</g>
      <g data-node="bmrna" data-color="${COL.sd}" data-label="${T2('mRNA & ribosoom', 'mRNA & ribosome')}"><g id="bg-sd">${box('sd', COL.sd, 'SD', 24)}</g><circle data-anchor="bmrna" cx="760" cy="40" r="1" fill="none"/></g>
      <g id="bg-orf">${box('orf', COL.orf, T2('coderend deel', 'coding part'), 24, 104)}</g>
      <g id="bg-start">${box('start', '#7fdc6a', 'ATG', 22)}</g><g id="bg-stop">${box('stop', C.danger, 'TAA', 22)}</g>
      <g id="bg-term">${box('term', COL.term, 'terminator', 22, 64)}</g>
      <g data-node="bterm" data-color="${COL.term}" data-label="${T2('Hoe de terminator werkt', 'How the terminator works')}"><circle data-anchor="bterm" cx="1110" cy="40" r="1" fill="none"/><rect x="1109" y="39" width="2" height="2" fill="none"/></g>
      <g data-node="bsplicing" data-color="${C.intron}" data-label="${T2('Introns die zichzelf uitknippen (3D)', 'Introns that cut themselves out (3D)')}"><circle data-anchor="bsplicing" cx="330" cy="92" r="1" fill="none"/><rect x="329" y="91" width="2" height="2" fill="none"/></g>
      <g data-node="breplicatie" data-color="${K.ori}" data-label="${T2('Replicatie vanaf oriC', 'Replication from oriC')}"><circle data-anchor="breplicatie" cx="1250" cy="92" r="1" fill="none"/><rect x="1249" y="91" width="2" height="2" fill="none"/></g>
      <g data-node="gen" data-color="${C.text}" data-label="${T2('Vergelijk: menselijk gen', 'Compare: human gene')}"><rect x="1400" y="39" width="1" height="1" fill="none"/><circle data-anchor="gen" cx="1400" cy="40" r="1" fill="none"/></g>
    </g>
    <g id="bg-over"></g>
    <g id="bg-panel"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const panelStep = i => i === 2 || i === 6 || i === 7;
        const k = ease(sub(p, 0, .3)), prev = Math.max(0, step - 1);
        $('bg-dna').setAttribute('opacity', f1(lerp(panelStep(prev) && step ? .45 : panelStep(step) ? 1 : 1, panelStep(step) ? .45 : 1, k)));
        for (const [id, a, b] of PARTS) {
          const vis = i => { const [cx, , cw] = SC.steps[i].cam; return a >= cx - 2 && b <= cx + cw + 2 ? 1 : 0; };
          const v0 = vis(step ? prev : 0), v1 = vis(step);
          $('bg-' + id).setAttribute('opacity', f1(v1 >= v0 ? lerp(v0, v1, k) : 1 - sub(p, 0, .04)));   // weg: snel (anders half buiten de nieuwe camera)
        }
        let o = '';
        // stap 0: rode draad van links naar rechts
        if (step === 0) {
          const u = ease(sub(p, .15, .85));
          o += `<line x1="150" y1="${Y0 - 120}" x2="${f1(150 + u * 1270)}" y2="${Y0 - 120}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>`;
          const W = [[285, T2('aanzetten', 'switch on')], [500, T2('regelen', 'regulate')], [655, T2('ribosoom laten landen', 'let the ribosome land')], [980, T2('code voor het eiwit', 'code for the protein')], [1350, T2('stoppen', 'stop')]];
          W.forEach(([x, w], i) => { o += `<g opacity="${f1(sub(p, .15 + i * .13, .25 + i * .13))}">` + txt(x, Y0 - (i % 2 ? 176 : 140), w, C.text, 22, 'middle', 700) + '</g>'; });
        }
        // stap 1: consensus + σ70
        if (step === 1 || (step === 2 && p < .3)) {
          const fo = step === 2 ? 1 - sub(p, 0, .25) : 1;
          const a = (step === 1 ? sub(p, .15, .35) : 1) * fo, b = (step === 1 ? ease(sub(p, .45, .7)) : 1) * fo;
          o += `<g opacity="${f1(a)}">` + mono(195, Y0 - 40, 'TTGACA', COL.prom, 24) + mono(375, Y0 - 40, 'TATAAT', COL.prom, 24) +
            `<path d="M245,${Y0 + 28} v10 H325 v-10" stroke="${C.muted}" fill="none" stroke-width="2"/>` + txt(285, Y0 + 60, '17 bp', C.muted, 20) + '</g>';
          o += `<g opacity="${f1(b)}">` + prot(285, Y0 - 104, 170, 34, COL.prom, 1, 11, T2('σ-factor (σ70)', 'σ factor (σ70)'), 22) + '</g>';
        }
        // stap 3: repressor op operator, activator ervoor
        if (step === 3) {
          const a = ease(sub(p, .1, .4)), b = ease(sub(p, .5, .8));
          o += `<g opacity="${f1(a)}">` + prot(522, Y0 - 50, 54, 32, COL.op, 1, 21, T2('repressor', 'repressor'), 19) + `<path d="M${TSS + 130},${Y0 - 64} l26,26 m0,-26 l-26,26" stroke="${C.danger}" stroke-width="5" opacity=".9"/>` + '</g>';
          o += `<g opacity="${f1(b)}">` + prot(98, Y0 - 62, 52, 34, K.cap, 1, 22, T2('activator', 'activator'), 18) + txt(98, Y0 - 112, T2('bv. CAP', 'e.g. CAP'), K.cap, 18) + '</g>';
        }
        // stap 4: SD in het mRNA + startcodon (vloeit uit in het begin van stap 5)
        if (step === 4 || (step === 5 && p < .3)) {
          const fo = step === 5 ? 1 - sub(p, 0, .25) : 1;
          const a = (step === 4 ? sub(p, .1, .35) : 1) * fo, b = (step === 4 ? sub(p, .45, .7) : 1) * fo;
          const seq = 'AGGAGGUAAAUCAUG';
          o += `<g opacity="${f1(a)}">` + (step === 4 ? txt(560, Y0 - 104, "5′ mRNA", C.rna, 18, 'end') : '') + [...seq].map((c, i) => nt(585 + i * 26, Y0 - 126, c, 23, 24, i < 6 || i > 11 ? 1 : .55)).join('') + '</g>';
          o += `<g opacity="${f1(b)}">` + `<path d="M574,${Y0 - 136} v-10 H735 v10" stroke="${COL.sd}" fill="none" stroke-width="2.5"/>` + txt(655, Y0 - 156, 'Shine-Dalgarno', COL.sd, 20, 'middle', 700) +
            `<path d="M730,${Y0 - 94} v10 H880 v-10" stroke="${C.muted}" fill="none" stroke-width="2"/>` + txt(800, Y0 - 62, '≈ 5–10 nt', C.muted, 18) +
            txt(923, Y0 - 156, T2('startcodon', 'start codon'), '#7fdc6a', 20, 'middle', 700) + '</g>';
        }
        // stap 5: haarspeld-terminator
        if (step === 5) {
          const a = ease(sub(p, .35, .7));
          const hx = 1335, hy = Y0 - 46;
          let hp = '';
          for (let i = 0; i < 5; i++) hp += `<line x1="${hx - 14}" y1="${hy - i * 18}" x2="${hx + 14}" y2="${hy - i * 18}" stroke="${COL.term}" stroke-width="2.5"/>`;
          o += `<g opacity="${f1(a)}"><path d="M${hx - 14},${hy + 12} V${hy - 82} a14,14 0 0 1 28,0 V${hy + 12}" stroke="${C.rna}" stroke-width="4" fill="none"/>${hp}` +
            txt(hx - 30, hy - 40, 'GC', COL.term, 18, 'end', 700) + mono(hx + 70, hy + 6, 'UUUU', C.rna, 20) + txt(hx, hy - 118, T2('haarspeld in het RNA', 'hairpin in the RNA'), COL.term, 20, 'middle', 700) + '</g>';
          o += `<g opacity="${f1(sub(p, .05, .25))}">` + txt(770, Y0 - 50, 'START', '#7fdc6a', 18, 'middle', 800) + txt(1190, Y0 - 50, 'STOP', C.danger, 18, 'middle', 800) + '</g>';
        }
        $('bg-over').innerHTML = o;

        // panelen
        let pn = '';
        if (step === 2) {
          const a = sub(p, 0, .12);
          pn += `<g opacity="${f1(a)}">` + panel(250, 380, 1100, 470) + txt(800, 430, T2('Zeven σ-factoren in E. coli', 'Seven σ factors in E. coli'), C.text, 28, 'middle', 700);
          SIGMA.forEach(([s1, gene, what], i) => {
            const y = 482 + i * 50, on = sub(p, .15 + i * .08, .22 + i * .08);
            pn += `<g opacity="${f1(.25 + .75 * on)}">` + txt(330, y, s1, K.sig, 26, 'start', 800) + txt(450, y, gene, C.muted, 22, 'start', 600, 'JetBrains Mono') + txt(590, y, T2(what.nl, what.en), C.text, 24, 'start', 600) + '</g>';
          });
          pn += '</g>';
        }
        if (step === 6) {
          const a = sub(p, .05, .2);
          pn += `<g opacity="${f1(a)}">` + panel(120, 380, 1360, 470) + txt(800, 432, T2('Geen spliceosoom: dat hebben alleen eukaryoten', 'No spliceosome: only eukaryotes have one'), C.text, 28, 'middle', 700);
          const cards = [
            [T2('Groep I-intron', 'Group I intron'), C.intron, [T2('RNA dat zichzelf uitknipt', 'RNA that cuts itself out'), T2('zeldzaam: bv. in tRNA-', 'rare: e.g. in tRNA'), T2('en faaggenen', 'and phage genes')]],
            [T2('Groep II-intron', 'Group II intron'), C.intron, [T2('RNA dat zichzelf uitknipt,', 'RNA that cuts itself out,'), T2('met eigen hulpeiwit; in', 'with its own helper protein;'), T2('≈ ¼ van de genomen', 'in ≈ ¼ of genomes')]],
            [T2('Inteïne', 'Intein'), C.prot, [T2('stuk EIWIT dat zichzelf', 'piece of PROTEIN that cuts'), T2('uit het eiwit knipt', 'itself out of the protein'), T2('(eiwitsplicing)', '(protein splicing)')]],
          ];
          cards.forEach(([h, col, lines], i) => {
            const x = 160 + i * 440, on = sub(p, .2 + i * .2, .3 + i * .2);
            pn += `<g opacity="${f1(.15 + .85 * on)}"><rect x="${x}" y="470" width="400" height="300" rx="14" fill="${col}" fill-opacity=".08" stroke="${col}" stroke-width="2"/>` +
              txt(x + 200, 520, h, col, 26, 'middle', 800) + lines.map((l, k) => txt(x + 200, 590 + k * 44, l, C.text, 22)).join('') + '</g>';
          });
          pn += `<g opacity="${f1(sub(p, .85, .95))}">` + txt(800, 818, T2('De gewone bacteriegenen: één doorlopend stuk code', 'Ordinary bacterial genes: one continuous stretch of code'), C.ok, 22, 'middle', 700) + '</g></g>';
        }
        if (step === 7) {
          const a = sub(p, .05, .2), b = sub(p, .45, .65);
          pn += `<g opacity="${f1(a)}">` + panel(120, 360, 640, 500) + dsRing(440, 620, 150, C.dna, 5) +
            `<circle cx="${f1(onCircle(440, 620, 150, 0)[0])}" cy="${f1(onCircle(440, 620, 150, 0)[1])}" r="12" fill="${K.ori}"/>` + txt(440, 448, 'oriC', K.ori, 28, 'middle', 800) +
            txt(440, 606, T2('één startplaats', 'one origin'), C.text, 22) + txt(440, 638, T2('voor het hele', 'for the whole'), C.text, 22) + txt(440, 670, T2('chromosoom', 'chromosome'), C.text, 22) +
            txt(440, 810, T2('DnaA bindt hier en opent het DNA', 'DnaA binds here and opens the DNA'), C.muted, 21) + '</g>';
          const frac = 303 / 4288;
          pn += `<g opacity="${f1(b)}">` + panel(840, 360, 640, 500) + txt(1160, 420, T2('Onmisbare genen', 'Essential genes'), C.text, 28, 'middle', 700) +
            `<rect x="900" y="480" width="520" height="56" rx="10" fill="${C.muted}" fill-opacity=".15" stroke="${C.muted}"/><rect x="900" y="480" width="${f1(520 * frac)}" height="56" rx="10" fill="${C.danger}" fill-opacity=".7"/>` +
            txt(1160, 590, T2('≈ 4 300 genen in E. coli K-12', '≈ 4,300 genes in E. coli K-12'), C.text, 22) + txt(1160, 650, T2('303 konden niet uitgeschakeld worden', '303 could not be knocked out'), C.danger, 24, 'middle', 800) +
            txt(1160, 700, T2('bv. RNA-polymerase, ribosoomeiwitten,', 'e.g. RNA polymerase, ribosomal proteins,'), C.muted, 21) + txt(1160, 734, T2('DNA-kopieerenzymen', 'DNA-copying enzymes'), C.muted, 21) + '</g>';
        }
        $('bg-panel').innerHTML = pn;
      },
    };
  },
};
export default SC;
