import { C, T2, svgOpen, txt, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { K, rodCell, dsRing, porine, prot, panel, arrow } from './_bkit.js';
import { membraanLijn, eiwit, PG, LPS, LIPID } from '../../bio.js';

/* Hoe bacteriën resistent worden: mutatie of overname van een gen; doelwit verandert, antibioticum kapot (β-lactamase),
 * minder poorten (porines), pompen; verspreiding via plasmiden en conjugatie.
 * Bronnen: Munita & Arias 2016 (Microbiol Spectr, PMC4888801), Molodtsov et al. 2017 (rifampicine), Lin et al. 2018 (pompen voor tetracycline),
 * Oswald, Tam & Pos 2016 (Nat Commun 7:13819, PMC5171871): AcrB neemt geneesmiddelen op uit het periplasma en de buitenste laag van het
 * binnenmembraan; daarom stappen de bolletjes in stap 5 daar in de pomp, niet uit het cytoplasma. */
const DRUG = '#ff6b6b', MUT = '#ffc247', OM = '#7fc8ff';   // OM = kleur van de porines (poorten in het buitenmembraan)
const pill = (x, y, op = 1, r = 13) => op <= .01 ? '' : `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${DRUG}" stroke="#fff" stroke-width="2.5"/></g>`;
const half = (x, y, dx, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><path d="M${f1(x - dx)},${f1(y - 13)} a13,13 0 0,0 0,26 z" fill="${DRUG}" stroke="#fff" stroke-width="2"/><path d="M${f1(x + dx)},${f1(y - 13)} a13,13 0 0,1 0,26 z" fill="${DRUG}" stroke="#fff" stroke-width="2"/></g>`;

/* doorsnede van de gramnegatieve envelop (buiten = boven): buitenmembraan met LPS (yO), periplasma met een dunne
 * peptidoglycaanlaag vlak onder het buitenmembraan, binnenmembraan (yI). Elk membraan als lipidedubbellaag; gaten = waar
 * een eiwit door het membraan steekt. Het periplasma is breder getekend dan echt. */
const YO = 317, YI = 537, MW = 22;
function envelop(gatenO = [], gatenI = []) {
  let g = `<rect x="120" y="${YO + MW / 2}" width="800" height="${YI - YO - MW}" fill="rgba(185,163,227,.07)"/>`;
  const yP = YO + MW / 2 + 22;
  g += `<path d="M120,${yP - 4} H920 M120,${yP + 4} H920" stroke="${PG}" stroke-width="2.2"/><path d="M120,${yP} H920" stroke="${PG}" stroke-width="8" stroke-dasharray="2 9"/>`;
  g += membraanLijn(120, 920, YO, { w: MW, gaten: gatenO }) + membraanLijn(120, 920, YI, { w: MW, gaten: gatenI });
  // LPS-ketens op de buitenste laag, niet over de eiwitten heen
  let from = 120;
  for (const [a, b] of [...gatenO, [920, 920]].sort((u, v) => u[0] - v[0])) { if (a > from) g += `<path d="M${from},${YO - MW / 2 - 9} H${a}" stroke="${LPS}" stroke-width="16" stroke-dasharray="2 4.5" opacity=".9"/>`; from = Math.max(from, b); }
  return g;
}

/* doelwit-enzym met een holte; changed = de holte heeft een andere vorm (mutatie) */
function target(x, y, changed) {
  const body = `<path d="M${x - 120},${y + 70} L${x - 120},${y - 60} Q${x - 120},${y - 80} ${x - 100},${y - 80} L${x - 40},${y - 80} ` +
    (changed ? `L${x - 30},${y - 50} L${x},${y - 30} L${x + 30},${y - 50} L${x + 40},${y - 80}` : `L${x - 28},${y - 30} Q${x},${y - 6} ${x + 28},${y - 30} L${x + 40},${y - 80}`) +
    ` L${x + 100},${y - 80} Q${x + 120},${y - 80} ${x + 120},${y - 60} L${x + 120},${y + 70} Z" fill="${K.rnap}" fill-opacity=".32" stroke="${K.rnap}" stroke-width="3"/>`;
  return body + (changed ? `<circle cx="${x}" cy="${y - 30}" r="10" fill="${MUT}"/>` : '');
}

export default {
  id: 'resistentie',
  title: { nl: 'Hoe bacteriën resistent worden', en: 'How bacteria become resistant' },
  scale: { nl: 'cel ≈ 2 µm', en: 'cell ≈ 2 µm' }, time: { nl: 'verspreiding: via deling en via genoverdracht', en: 'spread: by cell division and by gene transfer' },
  org: { nl: 'bacteriën (o.a. Escherichia coli)', en: 'bacteria (e.g. Escherichia coli)' },
  legend: [[DRUG, { nl: 'antibioticum', en: 'antibiotic' }], [K.rnap, { nl: 'doelwit (bv. RNA-polymerase)', en: 'target (e.g. RNA polymerase)' }], [MUT, { nl: 'mutatie', en: 'mutation' }],
    [K.res, 'β-lactamase'], [LIPID.head, { nl: 'binnen- en buitenmembraan', en: 'inner and outer membrane' }], [LPS, { nl: 'LPS (buitenkant)', en: 'LPS (outer surface)' }], [PG, { nl: 'celwand (peptidoglycaan)', en: 'cell wall (peptidoglycan)' }], [OM, { nl: 'porine (poort)', en: 'porin (pore)' }], [K.tra, { nl: 'pomp', en: 'pump' }], [K.plas, { nl: 'plasmide', en: 'plasmid' }]],
  simplified: {
    nl: 'Schema, niet op schaal. Vaak werken meerdere manieren samen in dezelfde bacterie, en minder poorten geeft op zich meestal maar een kleine resistentie. Genen gaan ook over via opname van los DNA of via virussen van bacteriën; hier staat alleen conjugatie. De pomp is getekend als één buis door beide membranen, zoals de grote pompen van Gram-negatieve bacteriën; zo’n pomp neemt het antibioticum op uit het periplasma en de buitenste laag van het binnenmembraan. De ruimte tussen beide membranen (periplasma) is breder getekend dan echt.',
    en: 'Schematic, not to scale. Often several ways work together in the same bacterium, and fewer pores on its own usually gives only low-level resistance. Genes also move by uptake of loose DNA or via viruses of bacteria; only conjugation is shown here. The pump is drawn as one tube through both membranes, like the large pumps of Gram-negative bacteria; such a pump picks up the antibiotic from the periplasm and the outer leaflet of the inner membrane. The space between the two membranes (periplasm) is drawn wider than it really is.' },
  parts: [
    { c: C.dna, t: { nl: 'eigen DNA', en: 'own DNA' }, d: { nl: 'De blauwe ring: het chromosoom van de bacterie zelf.', en: 'The blue ring: the bacterium’s own chromosome.' },
      p: { nl: 'Circulair chromosoom; bron van verticaal overgeërfde resistentiemutaties.', en: 'Circular chromosome; source of vertically inherited resistance mutations.' } },
    { c: MUT, t: { nl: 'mutatie', en: 'mutation' }, m: ['na de mutatie', 'after the mutation', 'doelwit verandert', 'target changes'], d: { nl: 'De gele stip: een kleine verandering in het DNA. Daardoor krijgt het doelwit-eiwit een iets andere vorm.', en: 'The yellow dot: a small change in the DNA. Because of it, the target protein gets a slightly different shape.' },
      p: { nl: 'Puntmutatie in het gen van het doelwit (bv. rpoB, gyrA) die de bindingsplaats van het antibioticum wijzigt.', en: 'Point mutation in the target gene (e.g. rpoB, gyrA) that alters the antibiotic binding site.' } },
    { c: K.plas, t: { nl: 'gen overnemen', en: 'gene taken over' }, m: ['van een andere bacterie', 'from another bacterium', '+ verspreiding via plasmiden', '+ spread via plasmids'], d: { nl: 'De roze ring: een plasmide met een resistentiegen, overgenomen van een andere bacterie.', en: 'The pink ring: a plasmid carrying a resistance gene, taken over from another bacterium.' },
      p: { nl: 'Horizontale genoverdracht (hier conjugatie van een R-plasmide; ook transformatie en transductie).', en: 'Horizontal gene transfer (here conjugation of an R plasmid; also transformation and transduction).' } },
    { c: K.rnap, t: { nl: 'doelwit (bv. RNA-polymerase)', en: 'target (e.g. RNA polymerase)' }, m: ['past → enzym geremd', 'fits → enzyme blocked', 'past niet → enzym werkt', 'no fit → enzyme works'], d: { nl: 'Het paarse enzym met een holte. Past het antibioticum erin, dan werkt het enzym niet meer. Na de mutatie past het niet meer.', en: 'The purple enzyme with a pocket. If the antibiotic fits into it, the enzyme stops working. After the mutation it no longer fits.' },
      p: { nl: 'Doelwitmodificatie: verlaagde affiniteit van het antibioticum voor zijn bindingsplaats (bv. rifampicine op RpoB).', en: 'Target modification: reduced affinity of the antibiotic for its binding site (e.g. rifampicin on RpoB).' } },
    { c: DRUG, t: { nl: 'antibioticum', en: 'antibiotic' }, d: { nl: 'De rode bolletjes: het geneesmiddel dat de bacterie probeert te remmen.', en: 'The red dots: the drug trying to stop the bacterium.' },
      p: { nl: 'Antibioticummoleculen.', en: 'Antibiotic molecules.' } },
    { c: K.res, t: 'β-lactamase', m: ['antibioticum kapot', 'antibiotic destroyed', 'opengeknipt = werkt niet meer', 'cut open = no longer works'], d: { nl: 'Een enzym dat penicilline-achtige antibiotica openknipt, zodat ze niet meer werken.', en: 'An enzyme that cuts open penicillin-like antibiotics, so they no longer work.' },
      p: { nl: 'Enzymatische inactivatie: hydrolyse van de β-lactamring in het periplasma.', en: 'Enzymatic inactivation: hydrolysis of the β-lactam ring in the periplasm.' } },
    { c: OM, t: { nl: 'porine (poort)', en: 'porin (pore)' }, m: ['minder poorten', 'fewer pores', 'veel poorten → veel binnen', 'many pores → much gets in', 'minder poorten → minder binnen', 'fewer pores → less gets in'], d: { nl: 'Poortjes in het buitenvlies. Maakt de bacterie er minder, dan komt er minder antibioticum binnen.', en: 'Pores in the outer membrane. If the bacterium makes fewer of them, less antibiotic gets in.' },
      p: { nl: 'Verminderde expressie of mutatie van porines (bv. OmpF) verlaagt de permeabiliteit van het buitenmembraan.', en: 'Reduced expression or mutation of porins (e.g. OmpF) lowers outer-membrane permeability.' } },
    { c: LIPID.head, t: { nl: 'binnenmembraan', en: 'inner membrane' }, m: ['buitenmembraan ↑', 'outer membrane ↑'], d: { nl: 'De twee vliezen van de bacterie: een buitenste en een binnenste, elk uit een dubbele laag vetmoleculen.', en: 'The two membranes of the bacterium: an outer and an inner one, each made of a double layer of fat molecules.' },
      p: { nl: 'Binnenmembraan (fosfolipidedubbellaag) en asymmetrisch buitenmembraan met LPS in de buitenste laag.', en: 'Inner membrane (phospholipid bilayer) and asymmetric outer membrane with LPS in the outer leaflet.' } },
    { c: PG, t: { nl: 'dunne celwand ↑', en: 'thin cell wall ↑' }, d: { nl: 'De dunne, stevige wand van suikerketens tussen de twee vliezen.', en: 'The thin, strong wall of sugar chains between the two membranes.' },
      p: { nl: 'Dunne peptidoglycaanlaag in het periplasma.', en: 'Thin peptidoglycan layer in the periplasm.' } },
    { c: LPS, t: 'LPS', d: { nl: 'De suikerketens aan de buitenkant van het buitenvlies.', en: 'The sugar chains on the outside of the outer membrane.' },
      p: { nl: 'Lipopolysacharide, permeabiliteitsbarrière voor hydrofobe stoffen.', en: 'Lipopolysaccharide, permeability barrier for hydrophobic compounds.' } },
    { c: C.muted, t: { nl: 'tussen de membranen', en: 'between the membranes' }, d: { nl: 'De ruimte tussen het buiten- en het binnenvlies (periplasma). Hier werkt β-lactamase.', en: 'The space between the outer and inner membrane (periplasm). β-lactamase works here.' },
      p: { nl: 'Periplasma, hier breder getekend dan in werkelijkheid.', en: 'Periplasm, drawn wider here than in reality.' } },
    { c: K.tra, t: { nl: 'pomp', en: 'pump' }, m: ['naar buiten pompen', 'pumped out'], d: { nl: 'Een buis door beide vliezen die het antibioticum weer naar buiten pompt voordat het kan werken.', en: 'A tube through both membranes that pumps the antibiotic back out before it can work.' },
      p: { nl: 'Tripartiete RND-effluxpomp (AcrAB–TolC): AcrB neemt substraat op uit het periplasma en de buitenste laag van het binnenmembraan.', en: 'Tripartite RND efflux pump (AcrAB–TolC): AcrB takes up substrate from the periplasm and the outer leaflet of the inner membrane.' } },
    { c: K.plas, t: { nl: 'resistente bacterie', en: 'resistant bacterium' }, d: { nl: 'De bovenste bacterie heeft het plasmide met het resistentiegen al.', en: 'The top bacterium already has the plasmid with the resistance gene.' },
      p: { nl: 'Donor met een conjugatief R-plasmide.', en: 'Donor carrying a conjugative R plasmid.' } },
    { c: C.text, t: { nl: 'ontvanger', en: 'recipient' }, d: { nl: 'De onderste bacterie krijgt een kopie van het plasmide via het buisje en wordt zo ook resistent.', en: 'The bottom bacterium receives a copy of the plasmid through the tube and so becomes resistant too.' },
      p: { nl: 'Recipiënte cel, na overdracht een resistente transconjugant.', en: 'Recipient cell, a resistant transconjugant after transfer.' } },
    { c: K.res, t: 'bla', m: ['bla → ook resistent', 'bla → resistant too'], d: { nl: 'Het resistentiegen op het plasmide: het bevat de code voor β-lactamase.', en: 'The resistance gene on the plasmid: it carries the code for β-lactamase.' },
      p: { nl: 'bla-gen voor een β-lactamase, vaak plasmide- of transposongebonden.', en: 'bla gene for a β-lactamase, often plasmid- or transposon-borne.' } },
  ],
  steps: [
    { dur: 8500, cam: FULL, title: { nl: 'Twee wegen naar resistentie', en: 'Two roads to resistance' },
      text: { nl: 'Een bacterie wordt resistent door een mutatie in haar eigen DNA, of door een resistentiegen over te nemen.', en: 'A bacterium becomes resistant through a mutation in its own DNA, or by taking over a resistance gene.' } },
    { dur: 9000, cam: FULL, title: { nl: '1 · Het doelwit verandert', en: '1 · The target changes' },
      text: { nl: 'Door een mutatie krijgt de plek waar het antibioticum past een andere vorm. Het past er niet meer goed op.', en: 'A mutation changes the shape of the spot where the antibiotic fits. It no longer fits well.' } },
    { dur: 9000, cam: FULL, title: { nl: '2 · Het antibioticum kapotmaken', en: '2 · Destroying the antibiotic' },
      text: { nl: 'Enzymen zoals β-lactamase knippen het antibioticum open voor het zijn werk kan doen.', en: 'Enzymes such as β-lactamase cut the antibiotic open before it can do its job.' } },
    { dur: 9000, cam: FULL, title: { nl: '3 · Minder poorten', en: '3 · Fewer pores' },
      text: { nl: 'Veel antibiotica komen binnen via poorten in het buitenmembraan. Met minder poorten komt er minder binnen.', en: 'Many antibiotics get in through pores in the outer membrane. With fewer pores, less gets in.' } },
    { dur: 9000, cam: FULL, title: { nl: '4 · Naar buiten pompen', en: '4 · Pumping it out' },
      text: { nl: 'Pompen in de membranen werken het antibioticum weer naar buiten.', en: 'Pumps in the membranes push the antibiotic back out.' } },
    { dur: 9500, cam: FULL, title: { nl: 'Resistentie springt over via plasmiden', en: 'Resistance jumps across via plasmids' },
      text: { nl: 'Resistentiegenen zitten vaak op plasmiden. Via conjugatie gaan ze van de ene bacterie naar de andere.', en: 'Resistance genes often sit on plasmids. Through conjugation they pass from one bacterium to another.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="rs-main"></g>
    <g id="rs-h1" data-node="rifampicine" data-color="${K.rnap}" data-label="${T2('Voorbeeld: rifampicine', 'Example: rifampicin')}"><rect x="580" y="340" width="240" height="170" fill="transparent"/><circle data-anchor="rifampicine" cx="700" cy="640" r="1" fill="none"/></g>
    <g id="rs-h2" data-node="bplasmide" data-color="${K.plas}" data-label="${T2('Plasmiden', 'Plasmids')}"><rect x="140" y="420" width="760" height="240" fill="transparent"/><circle data-anchor="bplasmide" cx="790" cy="735" r="1" fill="none"/></g>
    <g id="rs-h3" data-node="antibiotica" data-color="${DRUG}" data-label="${T2('Waar antibiotica aangrijpen', 'Where antibiotics strike')}"><rect x="1010" y="640" width="530" height="50" fill="transparent"/><circle data-anchor="antibiotica" cx="1275" cy="690" r="1" fill="none"/></g>
    <g id="rs-side"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        let g = '';
        if (step === 0) {
          // links: mutatie in het eigen chromosoom; rechts: gen overnemen (plasmide komt binnen)
          g += rodCell(90, 260, 380, 230) + dsRing(280, 375, 58, C.dna, 5);
          const m = ease(sub(p, .2, .45));
          g += `<g opacity="${f1(m)}"><circle cx="338" cy="375" r="16" fill="${MUT}"/>` + txt(280, 540, T2('mutatie', 'mutation'), MUT, 26, 'middle', 800) + '</g>';
          g += rodCell(560, 260, 380, 230) + dsRing(700, 375, 58, C.dna, 5);
          const q = ease(sub(p, .45, .75));
          g += dsRing(lerp(1000, 850, q), lerp(300, 360, q), 26, K.plas, 4) + `<g opacity="${f1(q)}">` + txt(750, 540, T2('gen overnemen', 'gene taken over'), K.plas, 26, 'middle', 800) + '</g>';
          g += txt(280, 225, T2('eigen DNA', 'own DNA'), C.muted, 24) + txt(750, 225, T2('van een andere bacterie', 'from another bacterium'), C.muted, 24);
        }
        if (step === 1) {
          // links: gewoon doelwit (antibioticum past); rechts: na de mutatie (antibioticum botst af)
          const fit = ease(sub(p, .1, .35)), ch = ease(sub(p, .35, .5)), off = ease(sub(p, .55, .85));
          g += txt(260, 225, T2('gewone bacterie', 'normal bacterium'), C.muted, 24, 'middle', 800) + target(260, 430, false) + pill(260, lerp(260, 392, fit), 1, 18);
          g += `<g opacity="${f1(fit)}">` + txt(260, 560, T2('past → enzym geremd', 'fits → enzyme blocked'), DRUG, 22, 'middle', 700) + '</g>';
          g += txt(700, 225, T2('na de mutatie', 'after the mutation'), MUT, 24, 'middle', 800) + target(700, 430, ch > .5);
          g += pill(lerp(700, 790, off), ch > .5 ? lerp(330, 280, off) : lerp(260, 330, ch * 2), 1, 18);
          g += `<g opacity="${f1(off)}">` + txt(700, 560, T2('past niet → enzym werkt', 'no fit → enzyme works'), C.ok, 22, 'middle', 700) + '</g>';
        }
        if (step === 2) {
          const a = ease(sub(p, .1, .4)), cut = ease(sub(p, .45, .7));
          g += prot(420, 430, 110, 80, K.res, 1, 6, 'β-lactamase', 24);
          const x = lerp(760, 560, a);
          g += cut < .02 ? pill(x, 430, 1, 22) : half(x + 40 * cut, 430, 10 + 30 * cut, 1);
          g += `<g opacity="${f1(sub(p, .7, .9))}">` + txt(620, 560, T2('opengeknipt = werkt niet meer', 'cut open = no longer works'), C.ok, 24, 'middle', 800) + '</g>';
        }
        if (step === 3 || step === 4) {
          // membraansnede: buitenmembraan (boven), binnenmembraan (onder); buiten = boven
          const fewer = step === 3 && ease(sub(p, .45, .6)) > .5;
          const pores = step === 4 ? [] : fewer ? [520] : [260, 420, 620, 780];
          const PUMP = [478, 562];
          g += envelop(step === 4 ? [PUMP] : pores.map(x => [x - 21, x + 21]), step === 4 ? [PUMP] : []);
          g += txt(140, 245, T2('buiten', 'outside'), C.muted, 22, 'start', 700) + txt(140, 470, T2('tussen de membranen', 'between the membranes'), C.muted, 22, 'start', 500) + txt(140, 620, T2('binnen in de cel', 'inside the cell'), C.muted, 22, 'start', 700);
          g += txt(910, YO + 72, T2('buitenmembraan ↑', 'outer membrane ↑'), C.muted, 21, 'end', 600) + txt(910, YO + 98, T2('dunne celwand ↑', 'thin cell wall ↑'), PG, 21, 'end', 600) + txt(910, YI + 46, T2('binnenmembraan', 'inner membrane'), C.muted, 21, 'end', 600);
          if (step === 3) {
            for (const x of pores) g += porine(x, YO, MW + 12, { col: OM });
            const ps = [180, 300, 420, 540, 660, 780, 860];
            ps.forEach((x0, i) => {
              const u = clamp((fewer ? sub(p, .6, 1) : sub(p, .05, .45)) * 1.4 - i * .06);
              const through = pores.some(px => Math.abs(px - x0) < 70);
              const tx = pores.reduce((b, px) => Math.abs(px - x0) < Math.abs(b - x0) ? px : b, pores[0]);
              const y = through ? lerp(230, 420, u) : lerp(230, 270, u);
              g += pill(through ? lerp(x0, tx, Math.min(1, u * 1.5)) : x0, y, 1, 11);
            });
            g += txt(520, 720, fewer ? T2('minder poorten → minder binnen', 'fewer pores → less gets in') : T2('veel poorten → veel binnen', 'many pores → much gets in'), fewer ? C.ok : DRUG, 24, 'middle', 800);
          }
          if (step === 4) {
            // pomp met drie delen: buis door het buitenmembraan, verbindingsstuk in het periplasma, pompdeel in het binnenmembraan
            // pompdeel (AcrB): grote kop in het periplasma, smal deel door het binnenmembraan, nauwelijks iets in het cytoplasma (Murakami et al. 2002)
            g += `<rect x="498" y="${YI - 16}" width="44" height="28" rx="8" fill="${K.tra}" fill-opacity=".6" stroke="${K.tra}" stroke-width="2.5"/>` + eiwit(520, YI - 54, 52, 40, K.tra, { seed: 17, bumps: .06 }) + `<rect x="494" y="${YO + 70}" width="52" height="${YI - YO - 162}" rx="10" fill="${K.tra}" fill-opacity=".3" stroke="${K.tra}" stroke-width="2.5"/>` +
              `<rect x="488" y="250" width="64" height="${YO - 250 + 80}" rx="18" fill="#0b1224"/><rect x="488" y="250" width="64" height="${YO - 250 + 80}" rx="18" fill="${K.tra}" fill-opacity=".45" stroke="${K.tra}" stroke-width="3"/>` +
              `<rect x="512" y="256" width="16" height="${YI - 286}" rx="8" fill="#0b1224" fill-opacity=".55"/>` + txt(620, 420, T2('pomp', 'pump'), K.tra, 26, 'start', 800);   // kanaal dicht naar het cytoplasma
            // de bolletjes stappen in de pomp vanuit het periplasma of de buitenste laag van het binnenmembraan (Oswald et al. 2016)
            const IN = [[300, 455], [350, YI - 5], [400, 420]];
            for (let i = 0; i < 3; i++) {
              const u = clamp(sub(p, .1 + i * .2, .45 + i * .2)), [x0, y0] = IN[i];
              const y = u < .3 ? lerp(y0, YI - 40, u / .3) : lerp(YI - 40, 190, (u - .3) / .7);
              const x = u < .3 ? lerp(x0, 520, u / .3) : lerp(520, 520 + (i - 1) * 70, clamp((u - .85) / .15));
              g += pill(x, y, 1, 12);
            }
            g += arrow(520, 248, 520, 212, K.tra, 4);
          }
        }
        if (step === 5) {
          const DX = 160, W = 700, H = 190, Y1 = 190, Y2 = 460;
          const pil = ease(sub(p, 0, .25)), tr = ease(sub(p, .25, .8));
          g += rodCell(DX, Y1, W, H) + rodCell(DX, Y2, W, H);
          g += txt(DX + W / 2, Y1 - 16, T2('resistente bacterie', 'resistant bacterium'), K.plas, 23, 'middle', 700) + txt(DX + W / 2, Y2 + H + 36, T2('ontvanger', 'recipient'), C.text, 23);
          g += `<line x1="${DX + W / 2}" y1="${Y1 + H - 4}" x2="${DX + W / 2}" y2="${f1(lerp(Y1 + H, Y2 + 4, pil))}" stroke="${K.tra}" stroke-width="7" stroke-linecap="round"/>`;
          g += dsRing(DX + 180, Y1 + H / 2, 42, K.plas, 4) + txt(DX + 260, Y1 + H / 2 + 8, 'bla', K.res, 22, 'start', 800);
          if (tr > .01) g += dsRing(DX + 180, Y2 + H / 2, 42, K.plas, 4, tr) + `<g opacity="${f1(tr)}">` + txt(DX + 260, Y2 + H / 2 + 8, T2('bla → ook resistent', 'bla → resistant too'), C.ok, 22, 'start', 800) + '</g>';
        }
        $('rs-main').innerHTML = g;
        $('rs-h1').setAttribute('opacity', step === 1 ? 1 : 0); $('rs-h2').setAttribute('opacity', step === 5 ? 1 : 0); $('rs-h3').setAttribute('opacity', step === 0 ? 1 : 0);

        // rechterpaneel: overzicht van de vier manieren, de actieve oplichtend
        const X = 1010, W = 530;
        let sd = panel(X, 170, W, 450) + txt(X + W / 2, 220, T2('Vier manieren', 'Four ways'), C.text, 28, 'middle', 800);
        const items = [[T2('doelwit verandert', 'target changes'), MUT], [T2('antibioticum kapot', 'antibiotic destroyed'), K.res], [T2('minder poorten', 'fewer pores'), OM], [T2('naar buiten pompen', 'pumped out'), K.tra]];
        items.forEach(([a, col], i) => {
          const y = 290 + i * 70, act = step === i + 1;
          sd += `<g opacity="${f1(step === 0 || step === 5 || act ? 1 : .35)}"><circle cx="${X + 48}" cy="${y - 8}" r="16" fill="${col}"/>` + txt(X + 48, y, String(i + 1), '#0a1224', 20, 'middle', 800) + txt(X + 80, y, a, act ? C.text : C.muted, 24, 'start', act ? 800 : 600) + '</g>';
        });
        sd += txt(X + W / 2, 590, step === 5 ? T2('+ verspreiding via plasmiden', '+ spread via plasmids') : T2('vaak meerdere tegelijk', 'often several at once'), step === 5 ? K.plas : C.muted, 22, 'middle', 700);
        // (geen tweede tekst hier: het klikbare label 'Waar antibiotica aangrijpen' staat al op deze plek)
        $('rs-side').innerHTML = sd;
      },
    };
  },
};
