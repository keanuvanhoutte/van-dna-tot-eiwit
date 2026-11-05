import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';

/*
 * Enhancers (zijpad epigenetica, 05-11-2026): een verre versterker met activatoren komt via een chromatinelus bij de
 * promoter; Mediator geeft het signaal door aan het preinitiatiecomplex met RNA-polymerase II (Soutourina 2018;
 * Schoenfelder & Fraser 2019). Voorbeeld: de ZRS ligt ≈ 1 Mb van SHH; puntmutaties erin geven preaxiale polydactylie
 * (Lettice et al. 2003). Namen (enhancer, Mediator, ZRS, SHH) staan in de uitleg, niet in de ondertitels.
 */
const L3 = (nl, en) => ({ nl, en });
const Y = 640;
const ENH = '#ffb27a', ACT = C.prot, MED = '#5fd3e6', POL = '#6f5bd6', GENE = C.ok;
const E0 = [230, Y], E1 = [600, Y], P0 = [1060, Y], P1 = [800, Y];   // versterker en startplaats: voor en na de lus

const box = (x, y, w, col, lab, op = 1) => op <= .01 ? '' : `<rect x="${f1(x - w / 2)}" y="${f1(y - 22)}" width="${w}" height="44" rx="10" fill="${col}" opacity="${f1(op)}"/>` + T(x, y + 9, lab, { size: 22, col: '#0a1224', w: 700, halo: false, op });
const blob = (x, y, rx, ry, col, lab, op = 1, fs = 22) => op <= .01 ? '' : `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="3" opacity="${f1(op)}"/>` + (lab ? T(x, y + fs * .36, lab, { size: fs, op }) : '');

export default {
  id: 'enhancer',
  title: L3('Een verre versterker komt dichtbij via een lus', 'A distant switch comes close through a loop'),
  scale: L3('versterker tot ≈ 1 miljoen basenparen van het gen (schematisch)', 'switch up to ≈ 1 million base pairs from the gene (schematic)'),
  time: L3('minuten (vertraagd)', 'minutes (slowed down)'),
  org: L3('mens', 'human'),
  legend: [[C.dna, L3('DNA', 'DNA')], [ENH, L3('versterker (enhancer)', 'switch (enhancer)')], [GENE, L3('gen met zijn startplaats', 'gene with its start site')], [ACT, L3('activator', 'activator')],
    [MED, L3('brugcomplex', 'bridge complex')], [POL, L3('afleesapparaat (RNA-polymerase)', 'reading machine (RNA polymerase)')], [C.rna, L3('RNA', 'RNA')]],
  simplified: {
    nl: 'Schematisch: de lus is veel korter getekend dan in het echt, en er is maar één activator en één versterker getoond. Een gen heeft vaak meerdere versterkers, en één versterker kan meer dan één gen aansturen. Hoe vaak en hoe lang versterker en startplaats elkaar raken, wordt nog onderzocht.',
    en: 'Schematic: the loop is drawn much shorter than in reality, and only one activator and one switch are shown. A gene often has several switches, and one switch can control more than one gene. How often and for how long switch and start site touch is still being studied.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Een gen begint bij een startplaats', 'A gene begins at a start site'),
      text: L3('Vlak voor een gen ligt de startplaats. Daar kan het afleesapparaat beginnen, maar alleen gaat dat traag.', 'Just before a gene lies the start site. The reading machine can begin there, but on its own that is slow.') },
    { dur: 8000, cam: FULL, title: L3('Een versterker kan ver weg liggen', 'A switch can lie far away'),
      text: L3('Een versterker is een stukje DNA dat een gen sterker aanzet. Hij kan tot een miljoen letters verder liggen.', 'A switch is a piece of DNA that turns a gene on more strongly. It can lie up to a million letters away.') },
    { dur: 7500, cam: FULL, title: L3('Activatoren gaan op de versterker zitten', 'Activators sit down on the switch'),
      text: L3('Eiwitten die het gen willen aanzetten, activatoren, binden aan de versterker.', 'Proteins that want to switch the gene on, activators, bind to the switch.') },
    { dur: 9000, cam: FULL, title: L3('Een lus brengt de versterker naar het gen', 'A loop brings the switch to the gene'),
      text: L3('Het DNA ertussen vormt een lus. Zo komt de verre versterker vlak naast de startplaats.', 'The DNA in between forms a loop. That brings the distant switch right next to the start site.') },
    { dur: 9000, cam: FULL, title: L3('Een brug zet het aflezen in gang', 'A bridge gets reading started'),
      text: L3('Een groot brugcomplex verbindt de activatoren met het afleesapparaat. Dan wordt het gen volop afgelezen.', 'A large bridge complex connects the activators with the reading machine. Then the gene is read in full.') },
    { dur: 9000, cam: FULL, title: L3('Een fout in een verre versterker telt ook', 'A fault in a distant switch matters too'),
      text: L3('Een versterker voor de groei van vingers ligt een miljoen letters van zijn gen. Een fout erin kan een extra vinger geven.', 'A switch for finger growth lies a million letters from its gene. A fault in it can cause an extra finger.') },
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
        fx += blob(P[0] + 6, Y - 70, 70, 44, POL, T2('aflezer', 'reader'), 1, 22);
        if (step === 0) fx += T(P[0] + 120, Y - 130, T2('traag…', 'slow…'), { size: 26, col: C.muted, op: ease(sub(p, .4, .7)) });
        if (kE > .01 && kL < .99) {
          const o = kE * (1 - kL);
          fx += `<g opacity="${f1(o)}"><path d="M${E0[0]},${Y + 100} L${E0[0]},${Y + 130} L${P0[0]},${Y + 130} L${P0[0]},${Y + 100}" stroke="${C.muted}" stroke-width="3" fill="none"/></g>` +
            T((E0[0] + P0[0]) / 2, Y + 172, T2('tot ≈ 1 miljoen letters', 'up to ≈ 1 million letters'), { size: 26, col: C.text, op: o });
        }
        // activatoren: vallen op de versterker en reizen mee
        for (let k = 0; k < 2; k++) {
          const ax = E[0] - 30 + k * 60, ay = lerp(300 + k * 40, Y - 56, kA);
          fx += blob(ax, ay, 32, 30, ACT, '', step >= 2 ? 1 : 0);
        }
        if (step === 2) fx += T(E[0], Y - 120, T2('activatoren', 'activators'), { size: 26, col: ACT, w: 700, op: ease(sub(p, .5, .8)) });
        if (kM > .01) {
          const mx = (E[0] + P[0]) / 2;
          fx += blob(mx, Y - 140, 100, 44, MED, T2('brug', 'bridge'), kM, 24);
        }
        if (kR > .01) {
          const len = 400 * kR;
          fx += `<path d="M${f1(gx)},${Y + 36} L${f1(gx + len)},${Y + 36}" stroke="${C.rna}" stroke-width="8" stroke-linecap="round"/>` +
            T(gx + 210, Y + 120, T2('✓ veel RNA', '✓ lots of RNA'), { size: 26, col: C.rna, w: 700, op: sub(kR, .6, 1) });
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
