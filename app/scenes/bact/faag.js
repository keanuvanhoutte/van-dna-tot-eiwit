import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { rodCell } from './_bkit.js';
import { membraanPts, ptsBoog, LIPID } from '../../bio.js';
import { T, btn, phage, PHDNA } from '../entry/_corona.js';

/*
 * Bacteriofagen (zijpad virussen, 05-11-2026). Een faag hecht aan E. coli en spuit zijn DNA via de staart naar binnen.
 * Lytisch: de cel maakt nieuwe fagen en barst open (T-even fagen: latente periode ≈ 20–25 min; Abedon 2019).
 * Lysogeen: faag λ bouwt zijn DNA met integrase (Int) in op de att-plaats van het chromosoom (profaag) en wordt mee gekopieerd;
 * bij DNA-schade (UV) wordt de repressor CI via RecA afgebroken; Int knipt de profaag samen met Xis weer los en de lytische cyclus start
 * (Casjens & Hendrix 2015). Bronnen: zie shared/details/virus2.js.
 */
const L3 = (nl, en) => ({ nl, en });
const A = [60, 330, 560, 400], B = [980, 330, 560, 400];   // twee bacteriën: x, y, w, h
const AX = 340, BX = 1260, TIP = 338;                      // staartpunt op het celoppervlak
const MINI = [[185, 395], [262, 405], [418, 405], [495, 395], [112, 525], [568, 525], [250, 655], [430, 655]];   // vrij in het cytoplasma rond het chromosoom (boven, opzij, onder), niet binnen de lus van het chromosoom
const UV = '#b388ff';
/* chromosoom als lus; gap = deel van de bovenkant dat roze (ingebouwd faag-DNA) wordt */
const chrom = (cx, cy, op = 1) => `<ellipse cx="${cx}" cy="${cy}" rx="180" ry="95" fill="none" stroke="${C.dna}" stroke-width="7" opacity="${f1(op)}"/>`;
const ring = (x, y, r, op = 1) => op <= .01 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${PHDNA}" stroke-width="7" opacity="${f1(op)}"/>`;
const arcTop = (cx, cy, op = 1) => op <= .01 ? '' : `<path d="M${cx - 70},${f1(cy - 95 * Math.sqrt(1 - (70 / 180) ** 2))} A180,95 0 0 1 ${cx + 70},${f1(cy - 95 * Math.sqrt(1 - (70 / 180) ** 2))}" fill="none" stroke="${PHDNA}" stroke-width="9" opacity="${f1(op)}"/>`;

export default {
  id: 'faag',
  title: L3('Een virus van bacteriën: kopiëren of verstoppen', 'A virus of bacteria: copy or hide'),
  scale: L3('bacterie ≈ 2 µm · faag ≈ 0,2 µm (niet op schaal)', 'bacterium ≈ 2 µm · phage ≈ 0.2 µm (not to scale)'),
  time: L3('weg 1: ≈ 20–30 minuten · weg 2: generaties lang', 'path 1: ≈ 20–30 minutes · path 2: for generations'),
  org: L3('bacterie (Escherichia coli) met fagen zoals T4 en lambda', 'bacterium (Escherichia coli) with phages such as T4 and lambda'),
  legend: [['#c7d2e8', L3('faag (eiwitjas met staart)', 'phage (protein coat with tail)')], [PHDNA, L3('DNA van de faag', 'DNA of the phage')], [C.dna, L3('chromosoom van de bacterie', 'chromosome of the bacterium')], [LIPID.head, L3('celenvelop (twee membranen en een dunne celwand)', 'cell envelope (two membranes and a thin cell wall)')]],
  simplified: {
    nl: 'Niet op schaal en twee fagen in één beeld: weg 1 (lytisch) is getekend zoals bij faag T4, weg 2 (lysogeen) zoals bij faag lambda; lambda kan ook weg 1 kiezen. Echte fagen hechten eerst aan een bepaald eiwit op de buitenkant (zoals een sleutel op een slot). In één bacterie ontstaan veel meer nieuwe fagen dan getekend. Het inbouwen gebeurt op één vaste plaats in het chromosoom.',
    en: 'Not to scale, and two phages in one picture: path 1 (lytic) is drawn as for phage T4, path 2 (lysogenic) as for phage lambda; lambda can also take path 1. Real phages first attach to a specific protein on the outside (like a key in a lock). One bacterium yields many more new phages than drawn. Integration happens at one fixed site in the chromosome.' },
  parts: [
    { c: '#c7d2e8', t: { nl: 'faag', en: 'phage' }, d: { nl: 'Een virus dat bacteriën aanvalt: een eiwitkop vol DNA op een staart met pootjes. Het landt op de bacterie.', en: 'A virus that attacks bacteria: a protein head full of DNA on a tail with legs. It lands on the bacterium.' },
      p: { nl: 'Bacteriofaag met staart (Caudovirales, zoals T4 of λ): icosaëdrische kop met dsDNA en een staart voor adsorptie en injectie.', en: 'Tailed bacteriophage (Caudovirales, such as T4 or λ): icosahedral head with dsDNA and a tail for adsorption and injection.' } },
    { c: LIPID.head, t: { nl: 'bacterie', en: 'bacterium' }, d: { nl: 'De staafvormige cel met dubbele rand (twee vliezen en een dunne wand): de bacterie E. coli.', en: 'The rod-shaped cell with a double border (two membranes and a thin wall): the bacterium E. coli.' },
      p: { nl: 'Gramnegatieve gastheercel (E. coli) met een celenvelop van binnen- en buitenmembraan en peptidoglycaan.', en: 'Gram-negative host cell (E. coli) with an envelope of inner and outer membrane and peptidoglycan.' } },
    { c: C.dna, t: { nl: 'chromosoom', en: 'chromosome' }, d: { nl: 'De blauwe lus: het eigen DNA van de bacterie.', en: 'The blue loop: the bacterium’s own DNA.' },
      p: { nl: 'Circulair bacterieel chromosoom.', en: 'Circular bacterial chromosome.' } },
    { c: PHDNA, t: { nl: 'faag-DNA', en: 'phage DNA' }, d: { nl: 'Het roze DNA dat de faag via zijn staart in de bacterie spuit. Binnen sluit het zich tot een ringetje.', en: 'The pink DNA the phage injects into the bacterium through its tail. Inside, it closes into a small ring.' },
      p: { nl: 'Geïnjecteerd faaggenoom; bij λ circulariseert het via de cohesieve cos-uiteinden.', en: 'Injected phage genome; in λ it circularises via the cohesive cos ends.' } },
    { c: C.text, t: { nl: 'weg 1: kopiëren (lytisch)', en: 'path 1: copy (lytic)' }, m: ['barst open!', 'bursts open!', 'nieuwe fagen komen vrij', 'new phages are released', 'na ≈ 20 minuten', 'after ≈ 20 minutes'], d: { nl: 'De bacterie moet nieuwe fagen bouwen. Na ongeveer 20 minuten barst ze open en komen de nieuwe fagen vrij.', en: 'The bacterium is forced to build new phages. After about 20 minutes it bursts open and the new phages are released.' },
      p: { nl: 'Lytische cyclus: replicatie, assemblage en lysis (holine/endolysine); latente periode van T-even fagen ≈ 20–25 min.', en: 'Lytic cycle: replication, assembly and lysis (holin/endolysin); latent period of T-even phages ≈ 20–25 min.' } },
    { c: C.text, t: { nl: 'weg 2: verstoppen (lysogeen)', en: 'path 2: hide (lysogenic)' }, d: { nl: 'Het faag-DNA bouwt zich in het chromosoom in en wordt bij elke deling stil mee gekopieerd.', en: 'The phage DNA builds itself into the chromosome and is quietly copied along at every division.' },
      p: { nl: 'Lysogenie: λ-integrase recombineert attP met attB; de repressor CI houdt de lytische genen uit.', en: 'Lysogeny: λ integrase recombines attP with attB; the CI repressor keeps the lytic genes off.' } },
    { c: PHDNA, t: { nl: 'ingebouwd faag-DNA', en: 'built-in phage DNA' }, d: { nl: 'Het roze stuk in de blauwe lus: faag-DNA dat nu deel is van het chromosoom.', en: 'The pink piece in the blue loop: phage DNA that is now part of the chromosome.' },
      p: { nl: 'Profaag, geïntegreerd op de att-plaats en mee gerepliceerd met het chromosoom.', en: 'Prophage, integrated at the att site and replicated along with the chromosome.' } },
    { c: UV, t: { nl: 'UV-licht', en: 'UV light' }, m: ['komt los → weg 1', 'comes loose → path 1'], d: { nl: 'UV-licht beschadigt het DNA. Dat is een gevaarsignaal: het faag-DNA knipt zich weer los en kiest alsnog weg 1.', en: 'UV light damages the DNA. That is a danger signal: the phage DNA cuts itself loose again and takes path 1 after all.' },
      p: { nl: 'DNA-schade activeert RecA, wat zelfsplitsing van CI uitlokt; Int en Xis excideren de profaag (inductie).', en: 'DNA damage activates RecA, which triggers CI self-cleavage; Int and Xis excise the prophage (induction).' } },
  ],
  steps: [
    { dur: 7500, cam: FULL, title: L3('Ook bacteriën hebben virussen', 'Bacteria have viruses too'),
      text: L3('Virussen die bacteriën besmetten heten bacteriofagen, kortweg fagen.', 'Viruses that infect bacteria are called bacteriophages, or phages for short.') },
    { dur: 8500, cam: FULL, title: L3('De faag spuit zijn DNA naar binnen', 'The phage injects its DNA'),
      text: L3('De faag zet zich met zijn poten op de bacterie en spuit zijn DNA erin. De lege jas blijft buiten.', 'The phage lands on the bacterium with its legs and injects its DNA. The empty coat stays outside.') },
    { dur: 8500, cam: FULL, title: L3('Weg 1: de bacterie bouwt nieuwe fagen', 'Path 1: the bacterium builds new phages'),
      text: L3('De bacterie leest het faag-DNA af alsof het van haarzelf is. Zo bouwt ze veel nieuwe fagen.', 'The bacterium reads the phage DNA as if it were its own. That way it builds many new phages.') },
    { dur: 8000, cam: FULL, title: L3('De bacterie barst open', 'The bacterium bursts open'),
      text: L3('Al na zo’n twintig minuten barst de bacterie open. De nieuwe fagen komen vrij.', 'After only about twenty minutes the bacterium bursts open. The new phages are released.') },
    { dur: 9000, cam: FULL, title: L3('Weg 2: het faag-DNA verstopt zich', 'Path 2: the phage DNA hides'),
      text: L3('Sommige fagen bouwen hun DNA in het chromosoom in. Het wordt dan bij elke deling mee gekopieerd.', 'Some phages build their DNA into the chromosome. It is then copied along at every division.') },
    { dur: 9000, cam: FULL, title: L3('Bij gevaar komt het DNA weer los', 'In danger the DNA comes loose again'),
      text: L3('Raakt het DNA van de bacterie beschadigd, bv. door UV-licht, dan knipt het faag-DNA zich los. Dan volgt toch weg 1.', 'If the bacterium’s DNA gets damaged, e.g. by UV light, the phage DNA cuts itself loose. Then path 1 follows after all.') },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="bcel" data-nolabel data-color="${C.bact}"><g id="fa-cells"></g></g>
    <g data-node="integratie" data-nolabel data-color="${PHDNA}"><g id="fa-pro"></g></g>
    <g id="fa-ph"></g>
    <g id="fa-fx"></g>
    ${btn('bcel', 400, 250, T2('↑ de bacteriecel', '↑ the bacterial cell'), C.bact)}
    ${btn('crispr', 670, 400, T2('hoe bacteriën terugvechten →', 'how bacteria fight back →'), '#7fdc6a')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const burst = ph(3, .25, .7), bOn = ph(4, 0, .2);

        /* cellen + chromosomen */
        let c = rodCell(...A, 1 - burst * .96) + `<g opacity="${f1(1 - burst)}">${chrom(AX, 560)}</g>`;
        if (burst > .01) for (let k = 0; k < 10; k++) {          // brokstukken van de envelop: groter en duidelijk naar buiten
          const a = k * 36 + 10, r = 150 + 230 * burst;
          const x0 = AX + r * Math.cos(a * Math.PI / 180), y0 = 530 + .6 * r * Math.sin(a * Math.PI / 180);
          c += membraanPts(ptsBoog(x0 - 30, y0, x0, y0 - 24, x0 + 30, y0, 10), { w: 14, op: 1 - burst * .35 });   // stukjes membraan
        }
        if (step === 3) {
          // flits op het moment dat de cel openscheurt
          const fl = sub(p, .22, .32) * (1 - sub(p, .4, .6));
          if (fl > .01) c += `<g opacity="${f1(fl)}">` + Array.from({ length: 12 }, (_, k) => { const a = k * 30 * Math.PI / 180; return `<path d="M${f1(AX + 90 * Math.cos(a))},${f1(530 + 60 * Math.sin(a))} L${f1(AX + 260 * Math.cos(a))},${f1(530 + 170 * Math.sin(a))}" stroke="#fff3b0" stroke-width="6" stroke-linecap="round"/>`; }).join('') + '</g>';
          c += T(AX, 530, T2('barst open!', 'bursts open!'), { size: 44, col: C.danger, w: 800, anchor: 'middle', op: ease(sub(p, .3, .45)) });
          c += T(AX, 574, T2('nieuwe fagen komen vrij', 'new phages are released'), { size: 28, col: C.text, w: 600, anchor: 'middle', op: ease(sub(p, .5, .7)) });
        }
        if (bOn > .01) c += rodCell(...B, bOn) + `<g opacity="${f1(bOn)}">${chrom(BX, 560)}</g>`;
        c += T(AX, 780, T2('weg 1: kopiëren (lytisch)', 'path 1: copy (lytic)'), { size: 28, col: C.text, w: 700, op: ph(2, 0, .2) });
        if (bOn > .01) c += T(BX, 780, T2('weg 2: verstoppen (lysogeen)', 'path 2: hide (lysogenic)'), { size: 28, col: C.text, w: 700, op: bOn });
        $('fa-cells').innerHTML = c;

        /* faag A: landt (stap 0→1), spuit DNA (stap 1) */
        let f = '', fx = '';
        const land = step === 0 ? ease(sub(p, .3, 1)) * .5 : ph(1, 0, .3) * .5 + .5;
        const inj = ph(1, .35, .9);
        const yA = lerp(250, TIP, land);
        f += phage(AX, yA, .85, 1 - ph(3, .1, .5) * .7, 1 - inj);
        if (step === 0) fx += T(AX + 90, 175, T2('faag', 'phage'), { size: 30, col: '#c7d2e8', w: 700, anchor: 'start', op: ease(sub(p, .2, .45)) });
        if (inj > .01 && burst < .99) {
          const len = Math.min(1, inj * 1.6);
          f += `<path d="M${AX},${TIP} L${AX},${f1(TIP + 50 * len)}" stroke="${PHDNA}" stroke-width="6" opacity="${f1((1 - ph(2, 0, .3)) * (1 - burst))}"/>`;
          f += ring(AX, 418, 30 * ease(sub(inj, .5, 1)), 1 - burst);   // los in het cytoplasma, boven het chromosoom
          if (step === 1) fx += T(AX + 46, 440, T2('faag-DNA', 'phage DNA'), { size: 26, col: PHDNA, w: 700, anchor: 'start', op: ease(sub(p, .6, .8)) });
        }
        /* nieuwe fagen in A (stap 2) en vrij na het openbarsten (stap 3) */
        MINI.forEach(([x, y], i) => {
          const k = ph(2, .15 + i * .07, .4 + i * .07);
          if (k <= .01) return;
          const dx = (x - AX) * 1.3 * burst, dy = (y - 540) * 1.2 * burst - 40 * burst;
          f += phage(x + dx, y + dy + 40, .3, k, 1, (x - AX) * .25 * burst);
        });
        if (step === 3) fx += T(AX, 470, T2('na ≈ 20 minuten', 'after ≈ 20 minutes'), { size: 26, col: C.trna, w: 700, anchor: 'middle', op: ease(sub(p, .3, .45)) });

        /* faag B: landt, spuit, DNA wordt ingebouwd (stap 4); komt los bij UV (stap 5) */
        let pro = '';
        if (step >= 4) {
          const landB = ph(4, .05, .3), injB = ph(4, .3, .55), intg = ph(4, .6, .95), out = ph(5, .3, .8);
          f += phage(BX, lerp(250, TIP, landB), .85, landB > 0 ? 1 - .7 * intg : 0, 1 - injB);
          if (injB > .01 && intg < 1) {
            f += `<path d="M${BX},${TIP} L${BX},${f1(TIP + 80 * Math.min(1, injB * 1.5))}" stroke="${PHDNA}" stroke-width="6" opacity="${f1(1 - intg)}"/>`;
            f += ring(BX, lerp(450, 470, intg), 28 * ease(sub(injB, .4, 1)) * (1 - intg), 1);
          }
          pro += arcTop(BX, 560, intg * (1 - out));
          if (out > .01) pro += ring(BX, lerp(465, 430, out), 28 * out, out);
          if (step === 4) fx += T(BX, 420, T2('ingebouwd faag-DNA', 'built-in phage DNA'), { size: 26, col: PHDNA, w: 700, op: ease(sub(p, .85, 1)) });
          if (step === 5) {
            const kU = ease(sub(p, 0, .25));
            fx += `<g opacity="${f1(kU)}"><path d="M1480,170 L1450,240 L1480,240 L1445,320" stroke="${UV}" stroke-width="8" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g>` +
              T(1475, 150, T2('UV-licht', 'UV light'), { size: 26, col: UV, w: 700, op: kU }) +
              T(BX - 70, 300, T2('komt los → weg 1', 'comes loose → path 1'), { size: 26, col: PHDNA, w: 700, anchor: 'end', op: ease(sub(p, .75, .95)) });
          }
        }
        $('fa-pro').innerHTML = pro;
        $('fa-ph').innerHTML = f;
        $('fa-fx').innerHTML = fx;
      },
    };
  },
};
