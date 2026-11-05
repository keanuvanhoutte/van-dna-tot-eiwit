import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';

/*
 * Genomische imprinting (zijpad epigenetica, 05-11-2026): bij ≈ 100 genen (zoogdieren; Bartolomei & Ferguson-Smith 2011)
 * werkt alleen de kopie van één ouder. Het merkteken is DNA-methylatie die in eicel of zaadcel gezet wordt.
 * IGF2/H19: vaderlijk gemethyleerde controleregio → CTCF kan niet binden → de gedeelde enhancer bereikt IGF2; op het
 * moederlijke allel bindt CTCF (isolator) en bereikt de enhancer alleen H19 (Bell & Felsenfeld 2000).
 * 15q11–q13-deletie: vaderlijk → Prader-Willi, moederlijk → Angelman (Buiting 2010). Merktekens worden in de kiemlijn
 * gewist en opnieuw gezet (Bartolomei & Ferguson-Smith 2011; Monk et al. 2019).
 */
const L3 = (nl, en) => ({ nl, en });
const MOM = '#ff9ec7', DAD = '#6fd3ff', ON = C.ok, OFFG = '#3a4560', ME = C.danger, STOP = '#ff8a3d', ENH = '#ffb27a';

const bar = (x0, x1, y, col, op = 1, h = 44) => op <= .01 ? '' : `<rect x="${x0}" y="${y - h / 2}" width="${x1 - x0}" height="${h}" rx="${h / 2}" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="3" opacity="${f1(op)}"/>`;
const gene = (x, y, w, on, lab, op = 1) => op <= .01 ? '' : `<rect x="${f1(x - w / 2)}" y="${y - 26}" width="${w}" height="52" rx="10" fill="${on ? ON : OFFG}" stroke="#0a1224" stroke-width="2" opacity="${f1(op)}"/>` + T(x, y + 8, lab, { size: 22, col: on ? '#0a1224' : '#c9d2e4', w: 700, halo: false, op });
/* methylgroepen als lollies (rood) */
const marks = (x, y, n, op = 1) => { if (op <= .01) return ''; let s = `<g opacity="${f1(op)}">`; for (let i = 0; i < n; i++) { const xx = x - (n - 1) * 14 + i * 28; s += `<line x1="${xx}" y1="${y - 22}" x2="${xx}" y2="${y - 46}" stroke="${ME}" stroke-width="4"/><circle cx="${xx}" cy="${y - 52}" r="9" fill="${ME}"/>`; } return s + '</g>'; };
const arc = (x0, x1, y, col, op = 1, h = 120) => op <= .01 ? '' : `<path d="M${x0},${y - 30} C${x0},${y - 30 - h} ${x1},${y - 30 - h} ${x1},${y - 30}" stroke="${col}" stroke-width="5" fill="none" stroke-dasharray="10 7" opacity="${f1(op)}"/>`;

export default {
  id: 'imprinting',
  title: L3('Soms telt van welke ouder je een gen kreeg', 'Sometimes it matters which parent gave you a gene'),
  scale: L3('genen en chromosomen (schematisch)', 'genes and chromosomes (schematic)'),
  time: L3('merkteken gezet in eicel of zaadcel, daarna een leven lang', 'mark set in egg or sperm, then for a lifetime'),
  org: L3('mens', 'human'),
  legend: [[MOM, L3('kopie van de moeder', 'copy from the mother')], [DAD, L3('kopie van de vader', 'copy from the father')], [ON, L3('gen aan', 'gene on')], [OFFG, L3('gen uit', 'gene off')],
    [ME, L3('merkteken (methylgroepen)', 'mark (methyl groups)')], [STOP, L3('stop-eiwit', 'stop protein')], [ENH, L3('versterker', 'switch')]],
  simplified: {
    nl: 'Schematisch: de genen staan niet op hun echte plaats en zijn veel te groot getekend. Het groeigen en zijn buurgen (IGF2 en H19) liggen op chromosoom 11; het getal "ongeveer honderd" komt uit een overzicht van 2011 en later zijn er meer kandidaten gevonden. De ziekten op chromosoom 15 kunnen ook andere oorzaken hebben dan een verlies van een stukje.',
    en: 'Schematic: the genes are not at their real positions and are drawn far too large. The growth gene and its neighbour (IGF2 and H19) lie on chromosome 11; the figure "about a hundred" comes from a 2011 overview and more candidates have been found since. The disorders on chromosome 15 can also have causes other than a lost piece.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Van elk gen heb je twee kopieën', 'You have two copies of every gene'),
      text: L3('Je krijgt één kopie van je moeder en één van je vader. Meestal werken ze allebei.', 'You get one copy from your mother and one from your father. Usually both work.') },
    { dur: 8500, cam: FULL, title: L3('Bij sommige genen werkt maar één kopie', 'For some genes only one copy works'),
      text: L3('Bij ongeveer honderd genen werkt alleen de kopie van de moeder, of alleen die van de vader.', 'For about a hundred genes only the mother’s copy works, or only the father’s.') },
    { dur: 8500, cam: FULL, title: L3('Het merkteken komt uit de eicel of de zaadcel', 'The mark comes from the egg or the sperm'),
      text: L3('In de zaadcel of de eicel krijgt een stukje DNA methylgroepen. Dat merkteken blijft in elke cel van het kind.', 'In the sperm or the egg a piece of DNA gets methyl groups. That mark stays in every cell of the child.') },
    { dur: 9500, cam: FULL, title: L3('Het merkteken bepaalt welk gen de versterker bereikt', 'The mark decides which gene the switch reaches'),
      text: L3('Bij de vader houdt het merkteken een stop-eiwit weg. Zo bereikt de versterker daar het groeigen.', 'On the father’s copy the mark keeps a stop protein away. So there the switch reaches the growth gene.') },
    { dur: 9500, cam: FULL, title: L3('Hetzelfde stukje kwijt, twee ziektes', 'The same piece lost, two disorders'),
      text: L3('Mist een stukje van chromosoom 15 bij de vader, dan ontstaat het syndroom van Prader-Willi. Mist het bij de moeder: Angelman.', 'If a piece of chromosome 15 is missing from the father’s copy, Prader-Willi syndrome results. If it is missing from the mother’s: Angelman.') },
    { dur: 8500, cam: FULL, title: L3('Elke generatie worden de merktekens opnieuw gezet', 'Each generation the marks are set anew'),
      text: L3('In de eicellen of zaadcellen van het kind worden de merktekens gewist en opnieuw gezet.', 'In the child’s eggs or sperm the marks are erased and set again.') },
  ],
  svg() {
    return svgOpen() + `<g id="im-v"></g>
    ${btn('dnamethyl', 40, 340, T2('↑ DNA-methylatie', '↑ DNA methylation'), ME)}
    ${btn('enhancer', 1190, 370, T2('↑ verre versterkers', '↑ distant switches'), ENH)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const fin = ease(sub(p, 0, .25)), fout = 1 - fin;
        const vis = (a, b) => (step >= a && step <= b) ? (step === a && a > 0 ? fin : 1) : step === b + 1 ? fout : 0;
        let o = '';
        // A: twee kopieën
        const vA = vis(0, 1);
        if (vA > .01) {
          const k1 = step === 1 ? ease(sub(p, .2, .6)) : step > 1 ? 1 : 0;
          o += bar(300, 1300, 330, MOM, vA) + bar(300, 1300, 570, DAD, vA);
          o += T(280, 340, T2('moeder', 'mother'), { size: 28, col: MOM, anchor: 'end', w: 700, op: vA }) + T(280, 580, T2('vader', 'father'), { size: 28, col: DAD, anchor: 'end', w: 700, op: vA });
          o += gene(480, 330, 150, true, T2('gen A', 'gene A'), vA) + gene(480, 570, 150, true, T2('gen A', 'gene A'), vA);
          o += gene(820, 330, 170, k1 < .5, T2('groeigen', 'growth gene'), vA * (step === 0 ? .35 : 1)) + gene(820, 570, 170, true, T2('groeigen', 'growth gene'), vA * (step === 0 ? .35 : 1));
          o += gene(1120, 330, 150, true, T2('buurgen', 'neighbour'), vA * (step === 0 ? .35 : 1)) + gene(1120, 570, 150, k1 < .5, T2('buurgen', 'neighbour'), vA * (step === 0 ? .35 : 1));
          o += T(480, 680, T2('✓ allebei aan', '✓ both on'), { size: 26, col: ON, w: 700, op: vA * (step === 0 ? ease(sub(p, .3, .6)) : 1) });
          o += T(970, 680, T2('maar één kopie aan', 'only one copy on'), { size: 26, col: C.trna, w: 700, op: vA * k1 });
        }
        // B: eicel en zaadcel
        const vB = vis(2, 2);
        if (vB > .01) {
          const km = step === 2 ? ease(sub(p, .3, .75)) : 1;
          o += `<g opacity="${f1(vB)}"><circle cx="460" cy="460" r="200" fill="${MOM}" fill-opacity=".14" stroke="${MOM}" stroke-width="4"/>` +
            `<ellipse cx="1110" cy="460" rx="110" ry="80" fill="${DAD}" fill-opacity=".16" stroke="${DAD}" stroke-width="4"/><path d="M1220,460 C1300,420 1360,500 1450,450" stroke="${DAD}" stroke-width="6" fill="none"/></g>`;
          o += bar(340, 580, 500, MOM, vB, 30) + bar(1030, 1190, 500, DAD, vB, 30) + marks(1110, 500, 3, vB * km);
          o += T(460, 720, T2('eicel', 'egg'), { size: 30, col: MOM, w: 700, op: vB }) + T(1110, 720, T2('zaadcel', 'sperm'), { size: 30, col: DAD, w: 700, op: vB });
          o += T(1110, 360, T2('merkteken', 'mark'), { size: 28, col: ME, w: 700, op: vB * km });
          o += T(800, 200, T2('dit stukje: alleen in de zaadcel gemerkt', 'this piece: marked only in the sperm'), { size: 26, op: vB * km });
        }
        // C: groeigen of buurgen
        const vC = vis(3, 3);
        if (vC > .01) {
          const kd = step === 3 ? ease(sub(p, .3, .8)) : 1;
          const row = (y, col, dad) => bar(240, 1360, y, col, vC) + gene(370, y, 200, dad, T2('groeigen', 'growth gene'), vC) + gene(900, y, 170, !dad, T2('buurgen', 'neighbour'), vC) +
            `<rect x="1150" y="${y - 22}" width="140" height="44" rx="10" fill="${ENH}" opacity="${f1(vC)}"/>` + T(1220, y + 8, T2('versterker', 'switch'), { size: 22, col: '#0a1224', w: 700, halo: false, op: vC }) +
            `<rect x="610" y="${y - 18}" width="90" height="36" rx="8" fill="#8a93a8" opacity="${f1(vC)}"/>`;
          o += row(330, DAD, true) + row(640, MOM, false);
          o += T(220, 340, T2('vader', 'father'), { size: 26, col: DAD, anchor: 'end', w: 700, op: vC }) + T(220, 650, T2('moeder', 'mother'), { size: 26, col: MOM, anchor: 'end', w: 700, op: vC });
          // vader: merkteken, geen stop → versterker bereikt het groeigen
          o += marks(655, 330, 3, vC) + arc(1190, 400, 330, ON, vC * kd, 170);
          // moeder: stop-eiwit op het controlestuk → versterker bereikt alleen het buurgen
          o += `<path d="M620,${640 - 70} L690,${640 - 70} L700,${640 - 30} L610,${640 - 30}Z" fill="${STOP}" opacity="${f1(vC)}"/>` + T(655, 640 - 84, T2('stop', 'stop'), { size: 22, col: STOP, w: 700, op: vC });
          o += arc(1190, 940, 640, ON, vC * kd, 110) + T(560, 520, T2('✗', '✗'), { size: 36, col: ME, w: 800, op: vC * kd });
          o += T(800, 450, T2('↑ merkteken: stop-eiwit kan niet binden', '↑ mark: stop protein cannot bind'), { size: 24, col: ME, op: vC });
          o += T(800, 760, T2('controlestuk met stop-eiwit: de versterker komt er niet voorbij', 'control piece with stop protein: the switch cannot get past'), { size: 24, col: STOP, op: vC });
        }
        // D: chromosoom 15
        const vD = vis(4, 4);
        if (vD > .01) {
          const kg = step === 4 ? ease(sub(p, .2, .6)) : 1;
          const pair = (x, dadLost, name, col) => {
            let s = bar(x, x + 560, 330, MOM, vD) + bar(x, x + 560, 450, DAD, vD) +
              `<rect x="${x + 200}" y="290" width="150" height="200" rx="14" fill="none" stroke="${C.trna}" stroke-width="3" stroke-dasharray="8 6" opacity="${f1(vD)}"/>`;
            const yy = dadLost ? 450 : 330;
            s += `<rect x="${x + 204}" y="${yy - 26}" width="142" height="52" fill="#070b16" opacity="${f1(vD * kg)}"/>` + T(x + 275, yy + 9, T2('kwijt', 'lost'), { size: 24, col: ME, w: 700, op: vD * kg });
            s += T(x + 280, 580, dadLost ? T2('kwijt bij de vader', 'lost from the father') : T2('kwijt bij de moeder', 'lost from the mother'), { size: 26, op: vD * kg }) +
              T(x + 280, 640, name, { size: 32, col, w: 800, op: vD * kg });
            return s;
          };
          o += pair(160, true, 'Prader-Willi', DAD) + pair(880, false, 'Angelman', MOM);
          o += T(800, 230, T2('chromosoom 15: stukje met genen die maar van één ouder werken', 'chromosome 15: piece with genes that work from one parent only'), { size: 26, col: C.trna, op: vD });
        }
        // E: wissen en opnieuw zetten
        const vE = vis(5, 5);
        if (vE > .01) {
          const ke = step === 5 ? ease(sub(p, .15, .45)) : 1, kn = step === 5 ? ease(sub(p, .55, .85)) : 1;
          const xs = [330, 800, 1270];
          o += bar(xs[0] - 180, xs[0] + 180, 470, DAD, vE) + marks(xs[0], 470, 3, vE);
          o += bar(xs[1] - 180, xs[1] + 180, 470, C.muted, vE * ke) + marks(xs[1], 470, 3, vE * (1 - ke) * .6);
          o += bar(xs[2] - 180, xs[2] + 180, 470, C.muted, vE * kn) + marks(xs[2], 470, 3, vE * kn);
          o += `<path d="M${xs[0] + 200},470 L${xs[1] - 200},470 M${xs[1] + 200},470 L${xs[2] - 200},470" stroke="${C.muted}" stroke-width="4" marker-end="url(#arrow)" opacity="${f1(vE)}"/>`;
          o += T(xs[0], 580, T2('in het kind', 'in the child'), { size: 26, op: vE }) + T(xs[1], 580, T2('gewist', 'erased'), { size: 26, op: vE * ke }) + T(xs[2], 580, T2('opnieuw gezet', 'set again'), { size: 26, op: vE * kn });
          o += T(xs[2], 620, T2('(zoon: zoals bij een vader)', '(son: as in a father)'), { size: 22, col: C.muted, op: vE * kn });
          o += T(xs[1], 680, T2('in de eicellen of zaadcellen van het kind', 'in the child’s eggs or sperm'), { size: 26, col: C.trna, op: vE * ke });
        }
        $('im-v').innerHTML = o;
      },
    };
  },
};
