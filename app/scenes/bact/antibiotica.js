import { C, T2, svgOpen, txt, cam, FULL, sub, ease, f1 } from '../../kit.js';
import { K, ribo, rodCell, rodLagen, porine, prot, panel, arrow } from './_bkit.js';
import { PG, LIPID, polymerase } from '../../bio.js';

/* Overzicht: waar antibiotica een bacterie raken en waarom onze cellen gespaard blijven.
 * Bronnen (shared/details/bact3.js): Kohanski, Dwyer & Collins 2010 (vier doelwitten, werking per klasse), Vollmer et al. 2008
 * (peptidoglycaan uniek voor bacteriën), Aldred et al. 2014 (menselijk topoisomerase II mist de ankerplaatsen), Lin et al. 2018
 * (G1408 en G2058 in ons ribosoom), Molodtsov et al. 2017 (rifampicineholte niet bewaard bij eukaryoten). */
const CEL = [70, 190, 900, 440], LG = rodLagen(...CEL);   // gramnegatieve envelop: buitenmembraan, peptidoglycaan, binnenmembraan
const PORX = [380, 520, 660], POR = '#7fc8ff';
const TG = {                          // doelwitten in de cel: [x, y] en kleur
  wall: [520, LG.pg, PG], gyr: [400, 525, '#5fd3e6'], pol: [545, 372, K.rnap], ribo: [790, 430, K.ribo],
};
const DRUG = '#ff6b6b';
const DNA = 'M190,430 C230,330 330,330 360,400 S470,500 520,420 S600,330 640,400 S660,520 560,520 S330,540 260,500 S170,480 190,430Z';

/* klein schema van de celwand: suikerketens (horizontaal) met dwarsbruggen; open = bruggen ontbreken (gat) */
function mesh(x, y, cut, op = 1) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">`;
  for (let r = 0; r < 4; r++) s += `<line x1="${x}" y1="${y + r * 46}" x2="${x + 360}" y2="${y + r * 46}" stroke="#c9d2e4" stroke-width="6" stroke-linecap="round"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
    const bx = x + 30 + c * 60 + (r % 2) * 25, nieuw = c >= 2 && c <= 3, y0 = y + r * 46 + 4, y1 = y + r * 46 + 42;
    // nieuw stuk wand: de bruggen die er nog bij moesten komen, lukken niet meer (gestippeld + ✕); bestaande bruggen blijven
    s += !nieuw ? `<line x1="${bx}" y1="${y0}" x2="${bx}" y2="${y1}" stroke="#7fdc6a" stroke-width="5"/>`
      : `<line x1="${bx}" y1="${y0}" x2="${bx}" y2="${y1}" stroke="#7fdc6a" stroke-width="4" stroke-dasharray="4 5" opacity=".55"/>` +
        (cut > .01 ? `<path d="M${bx - 9},${(y0 + y1) / 2 - 9} l18,18 M${bx + 9},${(y0 + y1) / 2 - 9} l-18,18" stroke="${DRUG}" stroke-width="4" stroke-linecap="round" opacity="${f1(cut)}"/>` : '');
  }
  return s + '</g>';
}

export default {
  id: 'antibiotica',
  title: { nl: 'Waar antibiotica een bacterie raken', en: 'Where antibiotics hit a bacterium' },
  scale: { nl: 'cel ≈ 2 µm', en: 'cell ≈ 2 µm' }, time: { nl: 'werking: verschilt per middel en per soort', en: 'effect: differs per drug and per species' },
  org: { nl: 'bacterie (Escherichia coli) en mens', en: 'bacterium (Escherichia coli) and human' },
  legend: [[LIPID.head, { nl: 'binnen- en buitenmembraan', en: 'inner and outer membrane' }], [PG, { nl: 'celwand (peptidoglycaan)', en: 'cell wall (peptidoglycan)' }], [POR, { nl: 'porine (poort in het buitenmembraan)', en: 'porin (pore in the outer membrane)' }], [C.dna, 'DNA'], ['#5fd3e6', 'gyrase'], [K.rnap, { nl: 'RNA-polymerase', en: 'RNA polymerase' }],
    [K.ribo, { nl: '70S-ribosoom', en: '70S ribosome' }], [C.rna, 'mRNA'], [DRUG, { nl: 'antibioticum', en: 'antibiotic' }]],
  simplified: {
    nl: 'Niet op schaal; één exemplaar van elk doelwit. E. coli is gramnegatief: de dunne celwand ligt tussen het binnen- en het buitenmembraan, en penicilline-achtigen komen er vooral via porines (poorten in het buitenmembraan). Er zijn nog andere klassen (bv. middelen die het celmembraan aantasten, zoals daptomycine); hier staan de vier groepen uit de bron. Of een antibioticum de bacterie doodt of alleen de groei remt, verschilt per middel en per soort. "Gespaard" betekent niet "zonder bijwerkingen": sommige antibiotica, zoals chlooramfenicol, remmen ook de ribosomen in onze mitochondriën.',
    en: 'Not to scale; one copy of each target. E. coli is Gram-negative: the thin cell wall lies between the inner and the outer membrane, and penicillin-like drugs reach it mainly through porins (pores in the outer membrane). There are other classes too (e.g. drugs that damage the cell membrane, such as daptomycin); shown here are the four groups from the source. Whether an antibiotic kills the bacterium or only stops its growth differs per drug and per species. "Spared" does not mean "without side effects": some antibiotics, such as chloramphenicol, also inhibit the ribosomes in our mitochondria.' },
  steps: [
    { dur: 8000, cam: FULL, title: { nl: 'Vier plekken waar antibiotica aangrijpen', en: 'Four places where antibiotics strike' },
      text: { nl: 'De meeste antibiotica die bacteriën doden, remmen één van vier dingen: de celwand, het DNA, het maken van RNA of het maken van eiwit.', en: 'Most antibiotics that kill bacteria block one of four things: the cell wall, the DNA, making RNA or making protein.' } },
    { dur: 9000, cam: FULL, title: { nl: '1 · De celwand', en: '1 · The cell wall' },
      text: { nl: 'Penicilline en verwanten blokkeren de enzymen die de celwand aan elkaar knopen. De wand verzwakt en de bacterie barst.', en: 'Penicillin and its relatives block the enzymes that knit the cell wall together. The wall weakens and the bacterium bursts.' } },
    { dur: 9000, cam: FULL, title: { nl: '2 · Het DNA', en: '2 · The DNA' },
      text: { nl: 'Fluorochinolonen zetten gyrase vast terwijl het DNA geknipt is. Er ontstaan breuken in het DNA.', en: 'Fluoroquinolones lock gyrase while the DNA is cut. Breaks appear in the DNA.' } },
    { dur: 8500, cam: FULL, title: { nl: '3 · Het maken van RNA', en: '3 · Making RNA' },
      text: { nl: 'Rifampicine blokkeert het RNA-polymerase. Er komt geen nieuw RNA meer.', en: 'Rifampicin blocks RNA polymerase. No new RNA is made.' } },
    { dur: 9000, cam: FULL, title: { nl: '4 · Het maken van eiwit', en: '4 · Making protein' },
      text: { nl: 'Veel antibiotica zitten op het ribosoom: sommige op de kleine eenheid (30S), andere op de grote (50S).', en: 'Many antibiotics sit on the ribosome: some on the small subunit (30S), others on the large one (50S).' } },
    { dur: 10000, cam: FULL, title: { nl: 'Waarom onze cellen gespaard blijven', en: 'Why our cells are spared' },
      text: { nl: 'Wij hebben geen celwand van peptidoglycaan. Ons topoisomerase, RNA-polymerase en ribosoom zijn net anders gebouwd.', en: 'We have no peptidoglycan cell wall. Our topoisomerase, RNA polymerase and ribosome are built slightly differently.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="ab-cell"></g>
    <g data-node="gyraseremmers" data-color="#5fd3e6" data-label="${T2('Gyrase blijft steken', 'Gyrase gets stuck')}"><circle cx="${TG.gyr[0]}" cy="${TG.gyr[1]}" r="46" fill="transparent"/><circle data-anchor="gyraseremmers" cx="${TG.gyr[0]}" cy="${TG.gyr[1] + 134}" r="1" fill="none"/></g>
    <g data-node="rifampicine" data-color="${K.rnap}" data-label="${T2('Rifampicine in 3D', 'Rifampicin in 3D')}"><circle cx="${TG.pol[0]}" cy="${TG.pol[1]}" r="48" fill="transparent"/><circle data-anchor="rifampicine" cx="${TG.pol[0]}" cy="${TG.pol[1] - 95}" r="1" fill="none"/></g>
    <g data-node="ribosoomremmers" data-color="${K.ribo}" data-label="${T2('Antibiotica op het ribosoom', 'Antibiotics on the ribosome')}"><circle cx="${TG.ribo[0]}" cy="${TG.ribo[1]}" r="50" fill="transparent"/><circle data-anchor="ribosoomremmers" cx="${TG.ribo[0]}" cy="${TG.ribo[1] + 105}" r="1" fill="none"/></g>
    <g id="ab-side"></g>
    <g data-node="resistentie" data-nolabel data-color="${C.ok}" data-label="${T2('Hoe bacteriën resistent worden', 'How bacteria become resistant')}"><rect x="1010" y="690" width="550" height="50" rx="12" fill="transparent"/><circle data-anchor="resistentie" cx="1285" cy="715" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const on = k => step === 0 || step === 5 || ({ wall: 1, gyr: 2, pol: 3, ribo: 4 }[k] === step);
        const op = k => (on(k) ? 1 : .25);
        const fade = sub(p, .15, .4);
        // ---- de cel met de vier doelwitten ----
        let g = rodCell(...CEL) + PORX.map(x => porine(x, LG.om, LG.mw + 10, { col: POR })).join('');
        // celwand-markering bovenaan: de peptidoglycaanlaag tussen beide membranen
        g += `<g opacity="${f1(op('wall'))}"><rect x="300" y="${f1(LG.pg - 10)}" width="440" height="20" rx="8" fill="none" stroke="${TG.wall[2]}" stroke-width="3" stroke-dasharray="${step === 1 ? '0' : '8 6'}"/></g>`;
        // DNA (nucleoïd, sterk vereenvoudigd) + gyrase
        g += `<path d="${DNA}" fill="none" stroke="${C.dna}" stroke-width="7" opacity="${f1(step === 2 || step === 0 || step === 5 || step === 3 ? 1 : .45)}"/>`;
        g += `<g opacity="${f1(op('gyr'))}">` + prot(TG.gyr[0], TG.gyr[1], 44, 36, TG.gyr[2], 1, 5, 'gyrase', 22) + '</g>';   // gyrase zit op het DNA (onderste stuk van de lus loopt hier horizontaal)
        // RNA-polymerase + mRNA naar het ribosoom
        g += `<g opacity="${f1(op('pol'))}">` + `<g transform="rotate(-47 554 373)">` + polymerase(554, 373, 48, 28, { col: TG.pol[2], dir: -1, gul: 8, hoog: 1.35, vul: .45, seed: 7 }) + '</g>' + txt(526, 394, 'RNAP', TG.pol[2], 22, 'end', 800) + '</g>';   // bacteriële RNAP (bio.js) met het DNA door de geul
        g += `<path d="M559,342 C620,330 680,${TG.ribo[1] + 42} 730,${TG.ribo[1] + 42} L860,${TG.ribo[1] + 42}" fill="none" stroke="${C.rna}" stroke-width="5" opacity="${f1(Math.max(op('pol'), op('ribo')))}"/>`;   // mRNA loopt onder langs de kleine eenheid (30S)
        g += `<g opacity="${f1(op('ribo'))}">` + ribo(TG.ribo[0], TG.ribo[1], 3.6) + '</g>';
        // nummers bij de doelwitten
        const badge = (n, x, y, k) => `<g opacity="${f1(op(k))}"><circle cx="${x}" cy="${y}" r="21" fill="${DRUG}"/>` + txt(x, y + 8, n, '#fff', 22, 'middle', 800) + '</g>';
        g += badge('1', 760, 166, 'wall') + badge('2', 330, 455, 'gyr') + badge('3', 470, 300, 'pol') + badge('4', 880, 375, 'ribo');
        // antibioticum-bolletjes op het actieve doelwit
        const pill = (x, y, r = 11) => `<g opacity="${f1(fade)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${DRUG}" stroke="#fff" stroke-width="2"/></g>`;
        if (step === 1) { const d = ease(sub(p, .1, .45)); g += PORX.map(x => pill(x, LG.top - 40 + (LG.pg - LG.top + 40) * d, 8)).join(''); }   // door de porines naar de celwand
        if (step === 2) g += pill(TG.gyr[0] + 30, TG.gyr[1] - 22);
        if (step === 3) g += pill(TG.pol[0] + 22, TG.pol[1] + 24);   // onder het woord RNAP, niet erover
        if (step === 4) g += pill(TG.ribo[0] - 4, TG.ribo[1] + 26) + pill(TG.ribo[0] + 6, TG.ribo[1] - 30);
        // breuken in het DNA (stap 2) en barstende wand (stap 1)
        if (step === 2) { const b = ease(sub(p, .55, .8)); if (b > .01) g += `<g opacity="${f1(b)}"><path d="M${TG.gyr[0] - 66},${TG.gyr[1] + 13} l14,-26 M${TG.gyr[0] - 54},${TG.gyr[1] + 13} l14,-26 M${TG.gyr[0] + 40},${TG.gyr[1] + 13} l14,-26 M${TG.gyr[0] + 52},${TG.gyr[1] + 13} l14,-26" stroke="${C.danger}" stroke-width="6" stroke-linecap="round"/></g>`; }
        if (step === 1) { const b = ease(sub(p, .6, .85)); if (b > .01) g += `<g opacity="${f1(b)}"><path d="M505,196 l15,-22 l15,22" fill="none" stroke="${C.danger}" stroke-width="6" stroke-linejoin="round"/></g>`; }
        g += txt(520, 716, T2('bacterie (E. coli)', 'bacterium (E. coli)'), C.muted, 24);
        $('ab-cell').innerHTML = g;

        // ---- rechterpaneel ----
        const X = 1010, W = 550, MX = X + W / 2;
        let sd = panel(X, 150, W, 520);
        const row = (y, col, a, b) => `<circle cx="${X + 40}" cy="${y - 8}" r="9" fill="${col}"/>` + txt(X + 62, y, a, C.text, 24, 'start', 700) + (b ? txt(X + 62, y + 32, b, C.muted, 21, 'start', 500) : '');
        if (step === 0) {
          sd += txt(MX, 205, T2('Vier doelwitten', 'Four targets'), C.text, 30, 'middle', 800);
          sd += row(275, TG.wall[2], T2('1 · celwand', '1 · cell wall'), T2('penicilline, ampicilline', 'penicillin, ampicillin'));
          sd += row(375, '#5fd3e6', T2('2 · DNA (gyrase)', '2 · DNA (gyrase)'), T2('ciprofloxacine', 'ciprofloxacin'));
          sd += row(475, K.rnap, T2('3 · RNA maken', '3 · making RNA'), T2('rifampicine', 'rifampicin'));
          sd += row(575, K.ribo, T2('4 · eiwit maken', '4 · making protein'), T2('tetracycline, gentamicine, erytromycine', 'tetracycline, gentamicin, erythromycin'));
        }
        if (step === 1) {
          sd += txt(MX, 205, T2('β-lactams', 'β-lactams'), C.text, 30, 'middle', 800) + txt(MX, 242, T2('(penicilline, ampicilline)', '(penicillin, ampicillin)'), C.muted, 22);
          const cut = ease(sub(p, .3, .7));
          sd += mesh(X + 95, 290, cut) + `<g opacity="${f1(cut)}">` + txt(MX, 470, T2('geen nieuwe dwarsbruggen', 'no new cross-links'), C.danger, 24, 'middle', 700) + '</g>';
          sd += `<g opacity="${f1(sub(p, .6, .85))}">` + txt(MX, 540, T2('de wand verzwakt', 'the wall weakens'), C.text, 24) + txt(MX, 580, T2('→ de bacterie barst open', '→ the bacterium bursts'), C.text, 24, 'middle', 700) + '</g>';
          sd += txt(MX, 624, T2('groen = dwarsbrug, grijs = suikerketen', 'green = cross-link, grey = sugar chain'), C.muted, 21, 'middle', 500) +
            txt(MX, 654, T2('gestippeld = nieuwe brug die er niet bij komt', 'dotted = new cross-link that is not made'), C.muted, 21, 'middle', 500);
        }
        if (step === 2) {
          sd += txt(MX, 205, T2('Fluorochinolonen', 'Fluoroquinolones'), C.text, 30, 'middle', 800) + txt(MX, 242, T2('(ciprofloxacine)', '(ciprofloxacin)'), C.muted, 22);
          sd += `<path d="M${X + 70},350 h170 M${X + 310},350 h170" stroke="${C.dna}" stroke-width="10" stroke-linecap="round"/><path d="M${X + 70},372 h170 M${X + 310},372 h170" stroke="${C.dna2}" stroke-width="8" stroke-linecap="round"/>`;
          sd += prot(MX, 361, 70, 50, '#5fd3e6', 1, 5, '', 18) + `<g opacity="${f1(fade)}"><circle cx="${MX}" cy="361" r="14" fill="${DRUG}" stroke="#fff" stroke-width="2"/></g>`;
          sd += txt(MX, 450, T2('gyrase knipt het DNA…', 'gyrase cuts the DNA…'), C.text, 24);
          sd += `<g opacity="${f1(sub(p, .35, .6))}">` + txt(MX, 495, T2('…maar kan niet meer dichtplakken', '…but can no longer rejoin it'), C.danger, 24, 'middle', 700) + '</g>';
          sd += `<g opacity="${f1(sub(p, .6, .85))}">` + txt(MX, 570, T2('→ breuken in het DNA', '→ breaks in the DNA'), C.text, 24, 'middle', 700) + '</g>';
        }
        if (step === 3) {
          sd += txt(MX, 205, T2('Rifampicine', 'Rifampicin'), C.text, 30, 'middle', 800);
          sd += prot(MX, 340, 110, 80, K.rnap, 1, 7, T2('RNA-polymerase', 'RNA polymerase'), 22);
          sd += `<g opacity="${f1(fade)}"><circle cx="${MX + 40}" cy="378" r="16" fill="${DRUG}" stroke="#fff" stroke-width="2"/></g>`;
          sd += `<path d="M${MX + 60},330 q30,-10 40,-30" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${f1(1 - sub(p, .3, .55))}"/>`;
          sd += `<g opacity="${f1(sub(p, .35, .6))}">` + txt(MX, 470, T2('het nieuwe RNA kan niet', 'the new RNA cannot'), C.text, 24) + txt(MX, 506, T2('verder groeien', 'grow any further'), C.text, 24) + '</g>';
          sd += `<g opacity="${f1(sub(p, .6, .85))}">` + txt(MX, 575, T2('→ geen nieuw RNA', '→ no new RNA'), C.text, 24, 'middle', 700) + '</g>';
        }
        if (step === 4) {
          sd += txt(MX, 205, T2('Op het ribosoom', 'On the ribosome'), C.text, 30, 'middle', 800);
          sd += ribo(X + 130, 380, 6.5);
          sd += `<g opacity="${f1(fade)}">` + arrow(X + 230, 300, X + 185, 335, DRUG, 3) + arrow(X + 230, 440, X + 180, 420, DRUG, 3) + '</g>';
          sd += txt(X + 245, 290, T2('50S (groot):', '50S (large):'), C.text, 23, 'start', 700) + txt(X + 245, 322, T2('erytromycine,', 'erythromycin,'), C.muted, 21, 'start', 500) + txt(X + 245, 350, T2('chlooramfenicol', 'chloramphenicol'), C.muted, 21, 'start', 500);
          sd += txt(X + 245, 430, T2('30S (klein):', '30S (small):'), C.text, 23, 'start', 700) + txt(X + 245, 462, T2('tetracycline,', 'tetracycline,'), C.muted, 21, 'start', 500) + txt(X + 245, 490, T2('gentamicine', 'gentamicin'), C.muted, 21, 'start', 500);
          sd += `<g opacity="${f1(sub(p, .55, .8))}">` + txt(MX, 585, T2('→ geen of foute eiwitten', '→ no proteins or faulty ones'), C.text, 24, 'middle', 700) + '</g>';
        }
        if (step === 5) {
          sd += txt(X + 30, 205, T2('Doelwit', 'Target'), C.muted, 21, 'start', 700) + txt(X + 215, 205, T2('Bacterie', 'Bacterium'), C.muted, 21, 'start', 700) + txt(X + 345, 205, T2('Mens', 'Human'), C.muted, 21, 'start', 700);
          const rows = [
            [T2('celwand', 'cell wall'), T2('ja', 'yes'), T2('geen', 'none')],
            ['gyrase', T2('ja', 'yes'), T2('topo II: anders', 'topo II: different')],
            [T2('RNA-pol.', 'RNA pol.'), T2('ja', 'yes'), T2('geen holte', 'no pocket')],
            [T2('ribosoom', 'ribosome'), '70S', T2('80S: G, geen A', '80S: G, not A')],
          ];
          rows.forEach((r, i) => {
            const y = 270 + i * 82, o = sub(p, .1 + i * .15, .25 + i * .15);
            sd += `<g opacity="${f1(o)}"><line x1="${X + 24}" y1="${y - 40}" x2="${X + W - 24}" y2="${y - 40}" stroke="#2a3a5f" stroke-width="2"/>` +
              txt(X + 30, y, r[0], C.text, 23, 'start', 700) + txt(X + 215, y, r[1], DRUG, 23, 'start', 700) + txt(X + 345, y, r[2], C.ok, 22, 'start', 700) + '</g>';
          });
          sd += `<g opacity="${f1(sub(p, .75, .95))}">` + txt(MX, 630, T2('rood = doelwit · groen = gespaard', 'red = target · green = spared'), C.muted, 22, 'middle', 500) + '</g>';
        }
        sd += txt(X + W / 2, 722, T2('Hoe bacteriën zich verweren →', 'How bacteria fight back →'), C.ok, 22, 'middle', 700);
        $('ab-side').innerHTML = sd;
      },
    };
  },
};
