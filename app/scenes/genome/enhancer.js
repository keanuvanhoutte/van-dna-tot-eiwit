import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';
import { eiwitPad, polII } from '../../bio.js';

/*
 * Enhancers (zijpad epigenetica, 05-11-2026): een verre versterker met activatoren komt via een chromatinelus bij de
 * promoter; Mediator geeft het signaal door aan het preinitiatiecomplex met RNA-polymerase II (Soutourina 2018;
 * Schoenfelder & Fraser 2019). Voorbeeld: de ZRS ligt ≈ 1 Mb van SHH; puntmutaties erin geven preaxiale polydactylie
 * (Lettice et al. 2003). Namen (enhancer, Mediator, ZRS, SHH) staan in de uitleg, niet in de ondertitels.
 */
const L3 = (nl, en) => ({ nl, en });
const Y = 640;
const ENH = '#ffb27a', ACT = C.prot, MED = '#6f5bd6', POL = C.prot, GENE = C.ok;   // zelfde kleuren als genregulatie/promoter: Pol II #9b7bff, Mediator #6f5bd6
const E0 = [230, Y], E1 = [600, Y], P0 = [1060, Y], P1 = [800, Y];   // versterker en startplaats: voor en na de lus

const box = (x, y, w, col, lab, op = 1) => op <= .01 ? '' : `<rect x="${f1(x - w / 2)}" y="${f1(y - 22)}" width="${w}" height="44" rx="10" fill="${col}" opacity="${f1(op)}"/>` + T(x, y + 9, lab, { size: 22, col: '#0a1224', w: 700, halo: false, op });
// eiwit met donkere ondergrond: de DNA-lus loopt er zichtbaar áchter langs, niet doorheen
const blob = (x, y, rx, ry, col, lab, op = 1, fs = 22) => op <= .01 ? '' : `<g opacity="${f1(op)}"><path d="${eiwitPad(x, y, rx, ry, 120, .07)}" fill="#0b1224"/><path d="${eiwitPad(x, y, rx, ry, 120, .07)}" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="3"/></g>` + (lab ? T(x, y + fs * .36, lab, { size: fs, op }) : '');

export default {
  id: 'enhancer',
  title: L3('Een verre versterker komt dichtbij via een lus', 'A distant switch comes close through a loop'),
  scale: L3('versterker soms ≈ 1 miljoen basenparen van het gen (schematisch)', 'switch sometimes ≈ 1 million base pairs from the gene (schematic)'),
  time: L3('minuten (vertraagd)', 'minutes (slowed down)'),
  org: L3('mens', 'human'),
  legend: [[C.dna, L3('DNA', 'DNA')], [ENH, L3('versterker (enhancer)', 'switch (enhancer)')], [GENE, L3('gen met zijn startplaats', 'gene with its start site')], [ACT, L3('activator', 'activator')],
    [MED, L3('brugcomplex (Mediator)', 'bridge complex (Mediator)')], [POL, L3('afleesapparaat (RNA-polymerase II, Pol II)', 'reading machine (RNA polymerase II, Pol II)')], [C.rna, L3('RNA', 'RNA')]],
  simplified: {
    nl: 'Schematisch: de lus is veel korter getekend dan in het echt, en er is maar één activator en één versterker getoond. Een gen heeft vaak meerdere versterkers, en één versterker kan meer dan één gen aansturen. Hoe vaak en hoe lang versterker en startplaats elkaar raken, wordt nog onderzocht.',
    en: 'Schematic: the loop is drawn much shorter than in reality, and only one activator and one switch are shown. A gene often has several switches, and one switch can control more than one gene. How often and for how long switch and start site touch is still being studied.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: 'DNA', d: { nl: 'De blauwe draad: het DNA. Het stuk tussen versterker en gen kan een lus vormen.', en: 'The blue thread: the DNA. The stretch between the switch and the gene can form a loop.' },
      p: { nl: 'Chromatinevezel; het tussenliggende segment vormt een lus tussen enhancer en promoter.', en: 'Chromatin fibre; the intervening segment forms a loop between enhancer and promoter.' } },
    { c: ENH, t: { nl: 'versterker', en: 'switch' }, d: { nl: 'Een stukje DNA (enhancer) dat een gen sterker aanzet. Het kan ver van dat gen liggen.', en: 'A piece of DNA (enhancer) that turns a gene on more strongly. It can lie far from that gene.' },
      p: { nl: 'Enhancer: cis-regulatorisch element met bindingsplaatsen voor transcriptiefactoren; werkt onafhankelijk van afstand en oriëntatie.', en: 'Enhancer: cis-regulatory element with transcription factor binding sites; acts independently of distance and orientation.' } },
    { c: C.text, t: { nl: 'afstand', en: 'distance' }, m: ['soms ≈ 1 miljoen letters', 'sometimes ≈ 1 million letters'], d: { nl: 'Een versterker kan wel een miljoen DNA-letters van zijn gen liggen.', en: 'A switch can lie as much as a million DNA letters from its gene.' },
      p: { nl: 'Enhancer–promoterafstanden tot ≈ 1 Mb (bv. de ZRS-enhancer van SHH).', en: 'Enhancer–promoter distances of up to ≈ 1 Mb (e.g. the ZRS enhancer of SHH).' } },
    { c: GENE, t: { nl: 'gen', en: 'gene' }, d: { nl: 'Het stuk DNA dat wordt afgelezen.', en: 'The piece of DNA that gets read.' },
      p: { nl: 'Doelgen van de enhancer.', en: 'Target gene of the enhancer.' } },
    { c: GENE, t: { nl: 'startplaats', en: 'start site' }, d: { nl: 'Het begin van het gen (promoter): daar kan het afleesapparaat beginnen.', en: 'The beginning of the gene (promoter): that is where the reading machine can start.' },
      p: { nl: 'Kernpromoter waar het preinitiatiecomplex met RNA-polymerase II assembleert.', en: 'Core promoter where the preinitiation complex with RNA polymerase II assembles.' } },
    { c: POL, t: 'Pol II', m: ['traag…', 'slow…'], d: { nl: 'Het afleesapparaat dat van het gen een RNA-kopie maakt. Op zichzelf start het maar traag.', en: 'The reading machine that makes an RNA copy of the gene. On its own it starts only slowly.' },
      p: { nl: 'RNA-polymerase II; zonder activatie is de basale transcriptie laag.', en: 'RNA polymerase II; without activation basal transcription is low.' } },
    { c: ACT, t: { nl: 'activatoren', en: 'activators' }, d: { nl: 'Eiwitten die op de versterker gaan zitten omdat ze het gen willen aanzetten.', en: 'Proteins that sit on the switch because they want to turn the gene on.' },
      p: { nl: 'Sequentiespecifieke transcriptiefactoren met een activatiedomein, gebonden aan de enhancer.', en: 'Sequence-specific transcription factors with an activation domain, bound to the enhancer.' } },
    { c: MED, t: { nl: 'brug', en: 'bridge' }, d: { nl: 'Een groot eiwitcomplex (Mediator) dat de activatoren verbindt met het afleesapparaat.', en: 'A large protein complex (Mediator) that connects the activators with the reading machine.' },
      p: { nl: 'Mediator-complex; geeft signalen van activatoren door aan het preinitiatiecomplex en Pol II.', en: 'Mediator complex; relays signals from activators to the preinitiation complex and Pol II.' } },
    { c: C.rna, t: 'RNA', m: ['✓ veel RNA', '✓ lots of RNA'], d: { nl: 'De oranje draden: RNA-kopieën van het gen. Met versterker worden er veel gemaakt.', en: 'The orange strands: RNA copies of the gene. With the switch, many are made.' },
      p: { nl: 'Transcripten; enhanceractivatie verhoogt de transcriptiefrequentie.', en: 'Transcripts; enhancer activation increases the transcription rate.' } },
    { c: C.danger, t: { nl: 'extra vinger', en: 'extra finger' }, m: ['extra', 'vinger', 'finger'], d: { nl: 'Een fout in een verre versterker voor de aanleg van vingers kan een extra vinger geven.', en: 'A fault in a distant switch for forming fingers can cause an extra finger.' },
      p: { nl: 'Puntmutaties in de ZRS-enhancer (≈ 1 Mb van SHH) veroorzaken preaxiale polydactylie (Lettice et al. 2003).', en: 'Point mutations in the ZRS enhancer (≈ 1 Mb from SHH) cause preaxial polydactyly (Lettice et al. 2003).' } },
  ],
  steps: [
    { dur: 7500, cam: FULL, title: L3('Een gen begint bij een startplaats', 'A gene begins at a start site'),
      text: L3('Aan het begin van een gen ligt de startplaats. Daar kan het afleesapparaat beginnen, maar alleen gaat dat traag.', 'At the beginning of a gene lies the start site. The reading machine can begin there, but on its own that is slow.') },
    { dur: 8000, cam: FULL, title: L3('Een versterker kan ver weg liggen', 'A switch can lie far away'),
      text: L3('Een versterker is een stukje DNA dat een gen sterker aanzet. Hij kan wel een miljoen letters verder liggen.', 'A switch is a piece of DNA that turns a gene on more strongly. It can lie as much as a million letters away.') },
    { dur: 7500, cam: FULL, title: L3('Activatoren gaan op de versterker zitten', 'Activators sit down on the switch'),
      text: L3('Eiwitten die het gen willen aanzetten, activatoren, binden aan de versterker.', 'Proteins that want to switch the gene on, activators, bind to the switch.') },
    { dur: 9000, cam: FULL, title: L3('Een lus brengt de versterker naar het gen', 'A loop brings the switch to the gene'),
      text: L3('Het DNA ertussen vormt een lus. Zo komt de verre versterker vlak naast de startplaats.', 'The DNA in between forms a loop. That brings the distant switch right next to the start site.') },
    { dur: 9000, cam: FULL, title: L3('Een brug zet het aflezen in gang', 'A bridge gets reading started'),
      text: L3('Een groot brugcomplex verbindt de activatoren met het afleesapparaat. Dan wordt het gen volop afgelezen.', 'A large bridge complex connects the activators with the reading machine. Then the gene is read in full.') },
    { dur: 9000, cam: FULL, title: L3('Een fout in een verre versterker telt ook', 'A fault in a distant switch matters too'),
      text: L3('Een versterker voor de aanleg van vingers ligt een miljoen letters van zijn gen. Een fout erin kan een extra vinger geven.', 'A switch for forming fingers lies a million letters from its gene. A fault in it can cause an extra finger.') },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="lussen" data-nolabel data-color="${C.dna}"><g id="en-dna"></g></g>
    <g data-node="promoter" data-nolabel data-color="${GENE}"><g id="en-gene"></g></g>
    <g id="en-fx"></g>
    ${btn('lussen', 40, 250, T2('↑ lussen', '↑ loops'), '#ffc247')}
    ${btn('promoter', 310, 360, T2('de startplaats in detail', 'the start site in detail'), C.prot)}
    ${btn('xinact', 1150, 410, T2('volgende: één X gaat op slot →', 'next: one X is locked away →'), '#ff9ec7')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kE = ph(1, .05, .3), kA = ph(2, .1, .6), kL = ph(3, .1, .9), kM = ph(4, .05, .35), kR = ph(4, .45, .95), kF = ph(5, .1, .4);
        const E = [lerp(E0[0], E1[0], kL), Y], P = [lerp(P0[0], P1[0], kL), Y];
        // DNA: links tot de versterker, de lus, dan van de startplaats naar rechts
        const c1 = [lerp(E[0] + 120, E[0] - 260, kL), lerp(Y, Y - 560, kL)], c2 = [lerp(P[0] - 120, P[0] + 260, kL), lerp(Y, Y - 560, kL)];
        let d = `<path d="M-60,${Y} L${f1(E[0])},${Y} C${f1(c1[0])},${f1(c1[1])} ${f1(c2[0])},${f1(c2[1])} ${f1(P[0])},${Y} L1660,${Y}" stroke="${C.dna}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
        d += box(E[0], Y, 140, ENH, T2('versterker', 'switch'), kE > .01 ? 1 : 0);
        $('en-dna').innerHTML = d;
        // gen + startplaats
        const gx = P[0] + 40;
        let g = `<rect x="${f1(P[0] - 24)}" y="${Y - 22}" width="48" height="44" rx="8" fill="${GENE}" opacity=".55"/>` +
          `<rect x="${f1(gx)}" y="${Y - 16}" width="420" height="32" rx="8" fill="${GENE}"/>` + T(gx + 210, Y + 9, T2('gen', 'gene'), { size: 24, col: '#0a1224', w: 700, halo: false }) +
          T(P[0], Y + 64, T2('startplaats', 'start site'), { size: 24, col: GENE, w: 700 });
        $('en-gene').innerHTML = g;
        // afleesapparaat (wacht bij de startplaats), activatoren, brug, RNA
        let fx = '';
        fx += polII(P[0] + 6, Y, 72, 30, { col: POL, gul: 24, hoog: 3.6, vul: .35, achter: .6, uit: 1.3, seed: 120, label: 'Pol II', fs: 22, labelY: -58 });   // app-vorm (bio.js): het DNA loopt door de geul
        if (step === 0) fx += T(P[0] + 120, Y - 130, T2('traag…', 'slow…'), { size: 26, col: C.muted, op: ease(sub(p, .4, .7)) });
        if (kE > .01 && kL < .99) {
          const o = kE * (1 - kL);
          fx += `<g opacity="${f1(o)}"><path d="M${E0[0]},${Y + 100} L${E0[0]},${Y + 130} L${P0[0]},${Y + 130} L${P0[0]},${Y + 100}" stroke="${C.muted}" stroke-width="3" fill="none"/></g>` +
            T((E0[0] + P0[0]) / 2, Y + 172, T2('soms ≈ 1 miljoen letters', 'sometimes ≈ 1 million letters'), { size: 26, col: C.text, op: o });
        }
        // activatoren: vallen op de versterker en reizen mee
        for (let k = 0; k < 2; k++) {
          const ax = E[0] - 30 + k * 60, ay = lerp(300 + k * 40, Y - 56, kA);
          fx += blob(ax, ay, 32, 30, ACT, '', step >= 2 ? 1 : 0);
        }
        if (step === 2) fx += T(E[0], Y - 120, T2('activatoren', 'activators'), { size: 26, col: ACT, w: 700, op: ease(sub(p, .5, .8)) });
        if (kM > .01) {
          const mx = (E[0] + P[0]) / 2;
          // Mediator in modules: staart (bindt de activatoren), midden, kop (bindt Pol II) (Soutourina 2018)
          const mod = (x, y, rx, ry, sd, lab) => `<path d="${eiwitPad(x, y, rx, ry, sd, .09)}" fill="#0b1224"/><path d="${eiwitPad(x, y, rx, ry, sd, .09)}" fill="${MED}" fill-opacity=".45" stroke="#a593ff" stroke-width="3"/>` + T(x, y + 6, lab, { size: 16, col: '#e2dbff', w: 700 });
          fx += `<g opacity="${f1(kM)}">` + mod(mx - 64, Y - 112, 42, 36, 121, T2('staart', 'tail')) + mod(mx + 66, Y - 108, 44, 38, 123, T2('kop', 'head')) + mod(mx, Y - 132, 36, 40, 122, T2('midden', 'middle')) + '</g>' +
            T(mx, Y - 186, T2('brug', 'bridge'), { size: 24, op: kM, col: '#c9b8ff', w: 700 });
        }
        if (kR > .01) {
          // het RNA komt bovenaan achteraan uit Pol II (RNA-uitgang) en groeit naar achteren/omhoog, weg van het gen waar het enzym nog moet komen;
          // "veel RNA" = eerdere kopieën die al los zijn en wegdrijven (schematisch)
          const x0 = P[0] - 6, y0 = Y - 100;
          fx += `<path d="M${f1(x0)},${y0} C${f1(x0 - 10)},${Y - 160} ${f1(x0 - 70)},${Y - 170} ${f1(x0 - 90)},${Y - 230} S${f1(x0 - 110)},${Y - 300} ${f1(x0 - 150)},${Y - 310}" pathLength="1" stroke-dasharray="${f1(kR)} 1" stroke="${C.rna}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
          const los = (x, y, o) => o <= .01 ? '' : `<path d="M${x},${y} q20,-16 40,0 t40,0 t40,0 t40,0" stroke="${C.rna}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${f1(o)}"/>`;
          fx += los(P[0] + 90, Y - 250, sub(kR, .5, .8)) + los(P[0] + 150, Y - 320, sub(kR, .7, 1));
          fx += T(P[0] + 250, Y - 190, T2('✓ veel RNA', '✓ lots of RNA'), { size: 26, col: C.rna, w: 700, op: sub(kR, .6, 1) });
        }
        // stap 5: hand met een extra vinger (schematisch)
        if (kF > .01) {
          let h = `<g opacity="${f1(kF)}"><rect x="1080" y="130" width="480" height="300" rx="18" fill="rgba(13,20,38,.92)" stroke="${ENH}" stroke-width="2"/>`;
          const hx = 1230, hy = 330;
          h += `<rect x="${hx - 70}" y="${hy - 60}" width="140" height="110" rx="34" fill="#e8c4a8"/>`;
          [-52, -18, 18, 52].forEach((dx, i) => { h += `<rect x="${hx + dx - 15}" y="${hy - 150 + (i % 3 ? 0 : 14)}" width="30" height="100" rx="15" fill="#e8c4a8"/>`; });
          h += `<rect x="${hx - 140}" y="${hy - 40}" width="80" height="30" rx="15" fill="#e8c4a8" transform="rotate(-30 ${hx - 70} ${hy - 25})"/>`;
          h += `<rect x="${hx - 158}" y="${hy - 92}" width="70" height="28" rx="14" fill="#ffb27a" stroke="${C.danger}" stroke-width="3" transform="rotate(-45 ${hx - 100} ${hy - 78})"/>`;
          h += '</g>' + T(1430, 260, T2('extra', 'extra'), { size: 26, col: C.danger, w: 700, op: kF }) + T(1430, 296, T2('vinger', 'finger'), { size: 26, col: C.danger, w: 700, op: kF });
          fx += h;
        }
        $('en-fx').innerHTML = fx;
      },
    };
  },
};
