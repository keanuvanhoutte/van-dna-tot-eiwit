import { C, T2, svgOpen, txt, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { K, prot, panel, arcPath, rodCell } from './_bkit.js';

/* Fluorochinolonen (bv. ciprofloxacine) zetten gyrase vast op geknipt DNA; een botsing met de replicatievork maakt er een blijvende
 * breuk van; ons topoisomerase II mist de twee ankerplaatsen (water–metaalionbrug) en muteren van die plaatsen geeft resistentie.
 * Bronnen: Aldred, Kerns & Osheroff 2014 (PMC3985860), Kohanski et al. 2010 (PMC2896384), Hooper & Jacoby 2016 (PMC5008060). */
const GY = '#5fd3e6', DRUG = '#ff6b6b';
const Y = 470, GX = 800;                 // hoogte van het DNA en plaats van gyrase
const RC = 185;                          // straal van het chromosoom in stap 4 (binnen het binnenmembraan van de cel)

/* dubbelstrengs DNA van x0 tot x1 */
const ds = (x0, x1, y, op = 1, col = C.dna) => op <= .01 || x1 <= x0 ? '' :
  `<g opacity="${f1(op)}"><line x1="${f1(x0)}" y1="${f1(y - 9)}" x2="${f1(x1)}" y2="${f1(y - 9)}" stroke="${col}" stroke-width="9" stroke-linecap="round"/>` +
  `<line x1="${f1(x0)}" y1="${f1(y + 9)}" x2="${f1(x1)}" y2="${f1(y + 9)}" stroke="${C.dna2}" stroke-width="7" stroke-linecap="round"/></g>`;
const pill = (x, y, op = 1, r = 13) => op <= .01 ? '' : `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${DRUG}" stroke="#fff" stroke-width="2.5"/></g>`;

export default {
  id: 'gyraseremmers',
  title: { nl: 'Fluorochinolonen: gyrase blijft in het DNA steken', en: 'Fluoroquinolones: gyrase gets stuck in the DNA' },
  scale: { nl: 'knip: 4 basenparen verschoven', en: 'cut: 4 base pairs apart' }, time: { nl: 'het medicijn grijpt in tijdens de knip', en: 'the drug strikes during the cut' },
  org: { nl: 'bacterie (Escherichia coli) en mens', en: 'bacterium (Escherichia coli) and human' },
  legend: [[C.dna, 'DNA'], [GY, 'gyrase'], [DRUG, { nl: 'fluorochinolon (bv. ciprofloxacine)', en: 'fluoroquinolone (e.g. ciprofloxacin)' }], [K.ori, { nl: 'replicatievork', en: 'replication fork' }]],
  simplified: {
    nl: 'Schema, niet op schaal. Gyrase bestaat uit vier eiwitten (2 × GyrA, 2 × GyrB) en knipt de twee strengen 4 basenparen verschoven; hier is het één blok met een rechte knip. Per knip binden twee medicijnmoleculen. Naast gyrase raken fluorochinolonen ook topoisomerase IV; bij E. coli is gyrase het belangrijkste doelwit. De Mg²⁺-brug is alleen vermeld, niet getekend.',
    en: 'Schematic, not to scale. Gyrase consists of four proteins (2 × GyrA, 2 × GyrB) and cuts the two strands 4 base pairs apart; here it is one block with a straight cut. Two drug molecules bind per cut. Besides gyrase, fluoroquinolones also hit topoisomerase IV; in E. coli gyrase is the main target. The Mg²⁺ bridge is only mentioned, not drawn.' },
  parts: [
    { c: C.dna, t: 'DNA', d: { nl: 'De dubbele blauwe draad. Gyrase knipt hem even door en laat er een ander stuk DNA door.', en: 'The double blue strand. Gyrase briefly cuts it and lets another piece of DNA pass through.' },
      p: { nl: 'G-segment (geknipt) en T-segment (doorgevoerd) van dsDNA.', en: 'G segment (cleaved) and T segment (transported) of dsDNA.' } },
    { c: GY, t: 'gyrase', m: ['bacterie: gyrase', 'bacterium: gyrase'], d: { nl: 'Het blauwe enzym dat het DNA knipt, een ander stuk erdoor laat en weer dichtplakt. Zo raakt het DNA niet in de knoop.', en: 'The blue enzyme that cuts the DNA, lets another piece through and seals it again. This keeps the DNA from tangling.' },
      p: { nl: 'DNA-gyrase (GyrA₂GyrB₂), type II-topoisomerase die ATP-afhankelijk negatieve supercoils invoert via een tijdelijke dubbelstrengsbreuk.', en: 'DNA gyrase (GyrA₂GyrB₂), a type II topoisomerase that introduces negative supercoils ATP-dependently via a transient double-strand break.' } },
    { c: DRUG, t: { nl: 'fluorochinolon', en: 'fluoroquinolone' }, m: ['open en vastgezet', 'open and locked'], d: { nl: 'De rode bolletjes: het medicijn (bv. ciprofloxacine). Het kruipt in de knip en zet gyrase vast terwijl het DNA open is.', en: 'The red dots: the drug (e.g. ciprofloxacin). It slips into the cut and locks gyrase while the DNA is open.' },
      p: { nl: 'Twee moleculen intercaleren op de splitsingsplaats en stabiliseren het splitsingscomplex, zodat religatie uitblijft.', en: 'Two molecules intercalate at the cleavage site and stabilise the cleavage complex, preventing religation.' } },
    { c: K.ori, t: { nl: 'kopieermachine', en: 'copying machine' }, d: { nl: 'De gele vork: de machine die het DNA kopieert. Ze botst op het vastgezette gyrase.', en: 'The yellow fork: the machine that copies the DNA. It collides with the locked gyrase.' },
      p: { nl: 'Replicatievork (replisoom) die op het gestabiliseerde splitsingscomplex botst.', en: 'Replication fork (replisome) colliding with the stabilised cleavage complex.' } },
    { c: DRUG, t: { nl: 'blijvende breuk', en: 'permanent break' }, m: ['in stukken', 'in pieces'], d: { nl: 'Door de botsing wordt de tijdelijke knip een echte breuk. Met veel breuken valt het chromosoom in stukken.', en: 'The collision turns the temporary cut into a real break. With many breaks the chromosome falls apart.' },
      p: { nl: 'Omzetting van omkeerbare splitsingscomplexen in dubbelstrengsbreuken, wat de SOS-respons en celdood uitlokt.', en: 'Conversion of reversible cleavage complexes into double-strand breaks, triggering the SOS response and cell death.' } },
    { c: C.dna, t: { nl: 'chromosoom', en: 'chromosome' }, d: { nl: 'De blauwe ring: al het DNA van de bacterie.', en: 'The blue ring: all of the bacterium’s DNA.' },
      p: { nl: 'Circulair chromosoom met meerdere vastgezette gyrasecomplexen.', en: 'Circular chromosome with several trapped gyrase complexes.' } },
    { c: C.ok, t: { nl: 'mens: topoisomerase II', en: 'human: topoisomerase II' }, m: ['ankerplaatsen ontbreken', 'anchor points missing'], d: { nl: 'Ons eigen knip-enzym lijkt op gyrase, maar mist de twee plekken waar het medicijn zich vastgrijpt. Daarom blijft ons DNA veilig.', en: 'Our own cutting enzyme resembles gyrase, but lacks the two spots the drug grips. That is why our DNA stays safe.' },
      p: { nl: 'Humaan topoisomerase IIα/β mist de serine en het zure residu die de water–metaalionbrug met het chinolon vormen.', en: 'Human topoisomerase IIα/β lacks the serine and acidic residue that form the water–metal ion bridge with the quinolone.' } },
    { c: '#ffc247', t: { nl: '2 ankerplaatsen: houdt vast', en: '2 anchor points: holds on' }, m: ['mutatie: houdt niet meer vast', 'mutation: no longer holds'], d: { nl: 'De gele bolletjes: twee bouwstenen van gyrase waaraan het medicijn vastzit. Verandert er één (mutatie), dan houdt het medicijn niet meer vast.', en: 'The yellow dots: two building blocks of gyrase that the drug holds on to. If one changes (mutation), the drug no longer holds.' },
      p: { nl: 'Ser83 en Asp87 van GyrA (E. coli) vormen de water–Mg²⁺-brug; mutaties hier zijn de klassieke oorzaak van chinolonresistentie.', en: 'Ser83 and Asp87 of GyrA (E. coli) form the water–Mg²⁺ bridge; mutations here are the classic cause of quinolone resistance.' } },
  ],
  steps: [
    { dur: 9500, cam: FULL, title: { nl: 'Gyrase knipt, haalt door en plakt', en: 'Gyrase cuts, passes through and reseals' },
      text: { nl: 'Gyrase knipt beide strengen, haalt een ander stuk DNA door de opening en plakt de breuk weer dicht.', en: 'Gyrase cuts both strands, passes another piece of DNA through the gap and reseals the break.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Het medicijn grijpt in tijdens het knippen', en: 'The drug strikes during cutting' },
      text: { nl: 'Ciprofloxacine bindt gyrase op het moment dat het DNA open is. Dichtplakken lukt dan niet meer.', en: 'Ciprofloxacin binds gyrase at the moment the DNA is open. Resealing no longer works.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Een botsing maakt er een echte breuk van', en: 'A collision turns it into a real break' },
      text: { nl: 'Komt de kopieermachine tegen zo’n vastgezet gyrase, dan wordt de tijdelijke knip een blijvende breuk.', en: 'When the copying machine runs into such a locked gyrase, the temporary cut becomes a lasting break.' } },
    { dur: 8500, cam: FULL, title: { nl: 'Het chromosoom valt in stukken', en: 'The chromosome falls apart' },
      text: { nl: 'Zo maakt het medicijn van gyrase een gif voor de cel: het knipt het chromosoom in stukken.', en: 'In this way the drug turns gyrase into a poison for the cell: it cuts the chromosome into pieces.' } },
    { dur: 10000, cam: FULL, title: { nl: 'Waarom ons DNA veilig blijft', en: 'Why our DNA stays safe' },
      text: { nl: 'Het medicijn hecht aan twee bouwstenen van gyrase. Ons topoisomerase II mist die twee.', en: 'The drug attaches to two building blocks of gyrase. Our topoisomerase II lacks those two.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Resistentie: precies die bouwstenen veranderen', en: 'Resistance: exactly those building blocks change' },
      text: { nl: 'Bij resistente bacteriën is vaak één van die twee bouwstenen veranderd. Het medicijn houdt dan niet meer vast.', en: 'In resistant bacteria one of those two building blocks has often changed. The drug then no longer holds on.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="gy-main"></g>
    <g id="gy-h1" data-node="bnucleoid" data-color="${GY}" data-label="${T2('Wat gyrase normaal doet', 'What gyrase normally does')}"><circle cx="${GX}" cy="${Y}" r="80" fill="transparent"/><circle data-anchor="bnucleoid" cx="${GX}" cy="${Y - 175}" r="1" fill="none"/></g>
    <g id="gy-h2" data-node="breplicatie" data-color="${K.ori}" data-label="${T2('DNA kopiëren in de bacterie', 'Copying DNA in the bacterium')}"><rect x="140" y="${Y - 60}" width="200" height="120" fill="transparent"/><circle data-anchor="breplicatie" cx="240" cy="${Y + 110}" r="1" fill="none"/></g>
    <g id="gy-h3" data-node="resistentie" data-color="${C.ok}" data-label="${T2('Hoe bacteriën resistent worden', 'How bacteria become resistant')}"><rect x="1100" y="640" width="420" height="60" fill="transparent"/><circle data-anchor="resistentie" cx="1310" cy="700" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        let g = '';
        const gap = (w, op = 1) => ds(120, GX - w, Y, op) + ds(GX + w, 1480, Y, op);
        if (step <= 2) {
          let open = 0, pass = 0, drug = 0, fork = 0, perm = 0;
          if (step === 0) { open = ease(sub(p, .1, .3)) * (1 - ease(sub(p, .7, .9))); pass = ease(sub(p, .3, .7)); }
          if (step === 1) { open = ease(sub(p, .1, .3)); drug = ease(sub(p, .3, .5)); }
          if (step === 2) { open = 1; drug = 1; fork = ease(sub(p, .05, .55)); perm = ease(sub(p, .55, .8)); }
          const w = 6 + 30 * open;
          g += open > .02 ? gap(w) : ds(120, 1480, Y);
          // tweede DNA-stuk dat door de opening gaat (stap 0)
          if (step === 0) { const yy = lerp(Y - 210, Y + 210, pass); g += `<g opacity="${f1(sub(p, .2, .3) * (1 - sub(p, .75, .9)))}"><line x1="${GX}" y1="${f1(yy - 140)}" x2="${GX}" y2="${f1(yy + 140)}" stroke="${C.dna}" stroke-width="9" stroke-linecap="round"/><line x1="${GX + 18}" y1="${f1(yy - 140)}" x2="${GX + 18}" y2="${f1(yy + 140)}" stroke="${C.dna2}" stroke-width="7" stroke-linecap="round"/></g>`; }
          // gyrase (achter en voor het DNA)
          g += `<g opacity="${f1(1 - perm * .6)}">` + prot(GX, Y - 70, 95, 55, GY, 1, 5, 'gyrase', 24) + prot(GX, Y + 72, 95, 50, GY, 1, 8, '', 18) + '</g>';
          g += pill(GX - 26, Y, drug) + pill(GX + 26, Y, drug);
          if (step === 1) g += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(GX, Y + 180, T2('open en vastgezet', 'open and locked'), DRUG, 26, 'middle', 800) + '</g>';
          // replicatievork die naar rechts schuift (stap 2)
          if (step === 2) {
            const fx = lerp(160, GX - 70, fork);
            g += `<path d="M${f1(fx)},${Y} l-60,-50 M${f1(fx)},${Y} l-60,50" stroke="${K.ori}" stroke-width="9" stroke-linecap="round" fill="none"/>` + prot(fx + 6, Y, 34, 30, K.ori, 1, 4, '', 14);
            g += `<g opacity="${f1(sub(fork, .2, .35))}">` + txt(fx - 75, Y - 62, T2('kopieermachine', 'copying machine'), K.ori, 24, 'end', 700) + '</g>';   // links van de vork, los van het label gyrase
            g += `<g opacity="${f1(perm)}"><path d="M${GX - 40},${Y - 30} l-14,30 l14,30 M${GX + 40},${Y - 30} l14,30 l-14,30" stroke="${DRUG}" stroke-width="7" fill="none" stroke-linejoin="round"/>` + txt(GX, Y + 180, T2('blijvende breuk', 'permanent break'), DRUG, 26, 'middle', 800) + '</g>';
          }
        }
        if (step === 3) {
          const k = ease(sub(p, .15, .7));
          g += rodCell(240, 165, 1120, 570);
          const cuts = [20, 75, 140, 205, 260, 320];
          let a0 = cuts[cuts.length - 1] - 360;
          for (const c of cuts) {
            const mid = (a0 + c) / 2 * Math.PI / 180, d = 12 * k;   // stukken schuiven een beetje uit elkaar, binnen het binnenmembraan
            g += `<g transform="translate(${f1(Math.sin(mid) * d)} ${f1(-Math.cos(mid) * d)})"><path d="${arcPath(GX, Y - 20, RC, a0 + 4, c - 4)}" stroke="${C.dna}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
            a0 = c;
          }
          for (const c of cuts) { const x = GX + RC * Math.sin(c * Math.PI / 180), y = Y - 20 - RC * Math.cos(c * Math.PI / 180); g += prot(x, y, 26, 20, GY, 1, 3, '', 12) + pill(x, y, 1, 10); }
          g += txt(GX, Y - 10, T2('chromosoom', 'chromosome'), C.muted, 26) + `<g opacity="${f1(sub(p, .55, .8))}">` + txt(GX, Y + 32, T2('in stukken', 'in pieces'), DRUG, 26, 'middle', 800) + '</g>';
        }
        if (step >= 4) {
          // twee naast elkaar: bacteriële gyrase (links) en menselijk topoisomerase II (rechts)
          const box = (x, title, col) => panel(x, 200, 600, 420, 1, col) + txt(x + 300, 250, title, col, 28, 'middle', 800);
          g += box(140, T2('bacterie: gyrase', 'bacterium: gyrase'), GY) + box(860, T2('mens: topoisomerase II', 'human: topoisomerase II'), C.ok);
          const site = (x, ok, mutated) => {
            let s = prot(x + 300, 430, 150, 95, ok ? GY : C.ok, 1, 6, '', 18);
            const a1 = [x + 250, 390], a2 = [x + 350, 390];
            if (ok) s += mutated ? `<circle cx="${a1[0]}" cy="${a1[1]}" r="17" fill="#ffc247" stroke="#0a1224" stroke-width="2"/>` + txt(a1[0], a1[1] + 7, '✕', '#0a1224', 20, 'middle', 800) + `<circle cx="${a2[0]}" cy="${a2[1]}" r="17" fill="#ffc247"/>`
              : `<circle cx="${a1[0]}" cy="${a1[1]}" r="17" fill="#ffc247"/><circle cx="${a2[0]}" cy="${a2[1]}" r="17" fill="#ffc247"/>`;
            else s += `<circle cx="${a1[0]}" cy="${a1[1]}" r="17" fill="none" stroke="#5d6a88" stroke-width="3" stroke-dasharray="5 4"/><circle cx="${a2[0]}" cy="${a2[1]}" r="17" fill="none" stroke="#5d6a88" stroke-width="3" stroke-dasharray="5 4"/>`;
            return s;
          };
          const mut = step === 5 ? ease(sub(p, .2, .45)) > .5 : false;
          g += site(140, true, mut) + site(860, false);
          const hold = step === 4 ? ease(sub(p, .2, .45)) : 1 - ease(sub(p, .45, .7));
          g += pill(440, lerp(300, 345, hold), 1, 16) + (hold > .5 ? `<line x1="440" y1="345" x2="390" y2="375" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/><line x1="440" y1="345" x2="490" y2="375" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>` : '');
          g += pill(1160, 300, 1, 16);
          g += txt(440, 565, step === 5 && hold < .5 ? T2('mutatie: houdt niet meer vast', 'mutation: no longer holds') : T2('2 ankerplaatsen: houdt vast', '2 anchor points: holds on'), step === 5 && hold < .5 ? '#ffc247' : DRUG, 23, 'middle', 700);
          g += txt(1160, 565, T2('ankerplaatsen ontbreken', 'anchor points missing'), C.ok, 23, 'middle', 700);
        }
        $('gy-main').innerHTML = g;
        $('gy-h1').setAttribute('opacity', step <= 2 ? 1 : 0); $('gy-h2').setAttribute('opacity', step === 2 ? 1 : 0); $('gy-h3').setAttribute('opacity', step === 5 ? 1 : 0);
      },
    };
  },
};
