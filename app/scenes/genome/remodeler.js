import { C, T2, svgOpen, FULL, sub, ease, lerp, f1, pill } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';
import { arrow } from '../repl/_draw.js';
import { nucleo } from './_a_kit.js';

/*
 * Chromatine-remodeling (zijpad epigenetica, 05-11-2026): ATP-afhankelijke machines verschuiven nucleosomen of nemen ze
 * weg, zodat een stuk DNA vrijkomt om afgelezen te worden (Clapier et al. 2017). Namen van families (SWI/SNF, ISWI, CHD,
 * INO80) en de kankerhaak (mSWI/SNF-subeenheden gemuteerd in 19,6 % van de tumoren, Kadoch et al. 2013) staan in de uitleg.
 */
const L3 = (nl, en) => ({ nl, en });
const Y = 470, R = 58;                    // hoogte van het DNA, straal van een nucleosoom
const REM = '#5fd3e6', READ = C.prot, FREE = C.ok;
const N1 = 260, N2 = 820, N2B = 560, N3 = 1090, N4 = 1390;
const GENE = [740, 900];                  // begin van het gen (dat door N2 bedekt is)

/* de machine: een grote C-vorm die het nucleosoom vastgrijpt */
function machine(x, y, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><path d="M${f1(x - 105)},${f1(y + 40)} C${f1(x - 120)},${f1(y - 110)} ${f1(x + 120)},${f1(y - 110)} ${f1(x + 105)},${f1(y + 40)}" stroke="${REM}" stroke-width="34" fill="none" stroke-linecap="round" opacity=".55"/>` +
    `<path d="M${f1(x - 105)},${f1(y + 40)} C${f1(x - 120)},${f1(y - 110)} ${f1(x + 120)},${f1(y - 110)} ${f1(x + 105)},${f1(y + 40)}" stroke="${REM}" stroke-width="4" fill="none"/></g>` +
    T(x, y - 92, T2('machine', 'machine'), { size: 26, col: REM, w: 700, op });
}
/* activator: eiwit dat een vrij stuk DNA nodig heeft om een gen aan te zetten */
const reader = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="62" ry="38" fill="${READ}" fill-opacity=".3" stroke="${READ}" stroke-width="3"/></g>` + T(x, y + 9, T2('activator', 'activator'), { size: 22, op });

export default {
  id: 'remodeler',
  title: L3('Machines schuiven nucleosomen opzij', 'Machines slide nucleosomes aside'),
  scale: L3('≈ 10 nm per nucleosoom (schematisch)', '≈ 10 nm per nucleosome (schematic)'),
  time: L3('seconden tot minuten (vertraagd)', 'seconds to minutes (slowed down)'),
  org: L3('mens', 'human'),
  legend: [[C.dna, L3('DNA', 'DNA')], [C.histone, L3('nucleosoom (histonkern)', 'nucleosome (histone core)')], [REM, L3('machine die nucleosomen verplaatst (remodeler)', 'machine that moves nucleosomes (remodeller)')],
    [READ, L3('activator: eiwit dat op vrij DNA een gen helpt aanzetten', 'activator: protein that helps switch on a gene on free DNA')], [FREE, L3('begin van een gen', 'start of a gene')]],
  simplified: {
    nl: 'Schematisch en niet op schaal: een nucleosoom is ≈ 11 nm breed en de machines zijn grote complexen van meerdere eiwitten. Getoond zijn twee uitkomsten (verschuiven en wegnemen); remodelers kunnen ook histonen omwisselen of juist nucleosomen netjes op een rij zetten. Het getal "1 op 5" is een gemiddelde over veel soorten tumoren.',
    en: 'Schematic and not to scale: a nucleosome is ≈ 11 nm wide and the machines are large complexes of several proteins. Two outcomes are shown (sliding and removing); remodellers can also swap histones or line nucleosomes up neatly. The figure "1 in 5" is an average over many kinds of tumour.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Een nucleosoom kan een gen afdekken', 'A nucleosome can cover a gene'),
      text: L3('DNA dat rond een nucleosoom gewonden is, is moeilijk te lezen. Hier ligt er een op het begin van een gen.', 'DNA wound around a nucleosome is hard to read. Here one sits on the start of a gene.') },
    { dur: 8000, cam: FULL, title: L3('Een machine grijpt het nucleosoom vast', 'A machine grabs the nucleosome'),
      text: L3('Een eiwitmachine (een remodeler) hecht aan het nucleosoom. Ze verbruikt energie van de cel: ATP.', 'A protein machine (a remodeller) attaches to the nucleosome. It uses the cell’s energy: ATP.') },
    { dur: 8500, cam: FULL, title: L3('Schuiven maakt het DNA vrij', 'Sliding frees the DNA'),
      text: L3('De machine trekt het DNA stukje voor stukje door. Zo schuift het nucleosoom opzij en ligt het begin van het gen vrij.', 'The machine pulls the DNA through bit by bit. The nucleosome slides aside and the start of the gene is free.') },
    { dur: 8500, cam: FULL, title: L3('Of ze tilt het nucleosoom eraf', 'Or it lifts the nucleosome off'),
      text: L3('Een machine kan een nucleosoom ook helemaal van het DNA halen.', 'A machine can also remove a nucleosome from the DNA completely.') },
    { dur: 8000, cam: FULL, title: L3('Vrij DNA kan afgelezen worden', 'Free DNA can be read'),
      text: L3('Nu kan een eiwit dat genen aanzet, een activator, op het DNA gaan zitten.', 'Now a protein that switches genes on, an activator, can sit down on the DNA.') },
    { dur: 8500, cam: FULL, title: L3('Kapotte machines spelen mee bij kanker', 'Broken machines play a part in cancer'),
      text: L3('In ongeveer één op de vijf tumoren is een onderdeel van zo’n machine veranderd.', 'In about one in five tumours a part of such a machine is altered.') },
  ],
  svg() {
    return svgOpen() + `
    <path d="M-60,${Y} L1660,${Y}" stroke="${C.dna}" stroke-width="12" stroke-linecap="round"/>
    <g id="rm-gene"></g>
    <g data-node="nucleosoom" data-nolabel data-color="${C.histone}"><g id="rm-nuc"></g></g>
    <g id="rm-fx"></g>
    ${btn('nucleosoom', 40, 330, T2('← nucleosoom in 3D', '← nucleosome in 3D'), C.histone)}
    ${btn('histonmod', 1190, 370, T2('volgende: merktekens →', 'next: chemical marks →'), C.chain)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kGrab = ph(1, .1, .6), kSlide = ph(2, .1, .85), kMove = ph(3, .0, .3), kLift = ph(3, .35, .85), kRead = ph(4, .1, .6), kDis = ph(5, .1, .5);
        // nucleosomen
        const x2 = lerp(N2, N2B, kSlide);
        let n = nucleo(N1, Y, R, { rot: -90 }).svg + nucleo(x2, Y, R, { rot: -90 + 140 * kSlide }).svg + nucleo(N4, Y, R, { rot: -90 }).svg;
        n += nucleo(N3, Y, R, { rot: -90, op: 1 - kLift }).svg;
        if (kLift > .01) n += `<circle cx="${N3}" cy="${f1(Y - 230 * kLift)}" r="${R * .86}" fill="${C.histone}" stroke="#0a1224" stroke-width="2" opacity="${f1(1 - sub(kLift, .6, 1))}"/>`;
        $('rm-nuc').innerHTML = n;
        // begin van het gen: pijl onder het DNA, groen zodra het vrij ligt
        const free = kSlide;
        let g = `<path d="M${GENE[0]},${Y + 70} L${GENE[0]},${Y + 100} L${GENE[1] + 160},${Y + 100}" stroke="${FREE}" stroke-width="6" fill="none" stroke-linejoin="round"/>` +
          `<path d="M${GENE[1] + 160},${Y + 88} L${GENE[1] + 182},${Y + 100} L${GENE[1] + 160},${Y + 112}Z" fill="${FREE}"/>` +
          T(GENE[0] + 10, Y + 150, T2('begin van een gen', 'start of a gene'), { size: 28, col: FREE, anchor: 'start', w: 700 });
        if (free > .01) g += `<rect x="${GENE[0] - 10}" y="${Y - 26}" width="${GENE[1] - GENE[0] + 20}" height="52" rx="14" fill="none" stroke="${FREE}" stroke-width="4" stroke-dasharray="10 6" opacity="${f1(free * (1 - kRead))}"/>` +
          T((GENE[0] + GENE[1]) / 2, Y - 46, T2('vrij', 'free'), { size: 26, col: FREE, w: 700, op: free * (1 - kRead) });
        $('rm-gene').innerHTML = g;
        // machine: komt aan (stap 1), schuift mee (stap 2), gaat naar N3 (stap 3), verdwijnt (stap 4)
        let fx = '';
        const mx = step === 1 ? lerp(N2 - 260, N2, kGrab) : step <= 2 ? lerp(N2, N2B, kSlide) : lerp(N2B, N3, kMove);
        const my = step === 1 ? lerp(Y - 190, Y, kGrab) : Y;
        const mop = step === 0 ? 0 : step === 1 ? ease(sub(p, 0, .3)) : step === 4 ? 1 - ease(sub(p, 0, .3)) : step > 4 ? 0 : 1;
        fx += machine(mx, my, mop);
        // ATP in, ADP uit (stap 1–3)
        if (step >= 1 && step <= 3) {
          for (let k = 0; k < 3; k++) {
            const u = (p * 2.2 + k / 3) % 1, o = Math.sin(Math.PI * u) * mop;
            fx += pill(mx - 190 + 60 * u, Y - 210 + 90 * u, 74, 34, 'ATP', '#1f7a8c', o, 20) + pill(mx + 130 + 60 * u, Y - 120 - 90 * u, 74, 34, 'ADP', '#3d4a66', o * .9, 20);
          }
        }
        // activator: wacht boven (stap 0–3), gaat zitten (stap 4)
        const rx = lerp(1010, (GENE[0] + GENE[1]) / 2, kRead), ry = lerp(225, Y - 50, kRead);
        fx += reader(rx, ry, 1);
        if (step === 0) fx += T(rx + 90, 230, '?', { size: 44, col: C.trna, w: 800, op: ease(sub(p, .3, .6)) });
        if (kRead > .01) fx += T(rx, ry - 58, T2('✓ gen kan aan', '✓ gene can switch on'), { size: 26, col: FREE, w: 700, op: sub(kRead, .6, 1) });
        // stap 5: één op vijf tumoren
        if (kDis > .01) {
          let b = `<g opacity="${f1(kDis)}"><rect x="1060" y="130" width="500" height="200" rx="18" fill="rgba(13,20,38,.9)" stroke="${C.danger}" stroke-width="2"/>`;
          for (let i = 0; i < 5; i++) {
            const x = 1130 + i * 90, col = i === 0 ? C.danger : '#58677f';
            b += `<circle cx="${x}" cy="190" r="22" fill="${col}"/><path d="M${x - 30},262 Q${x - 30},222 ${x},222 Q${x + 30},222 ${x + 30},262Z" fill="${col}"/>`;
          }
          b += '</g>' + T(1310, 310, T2('≈ 1 op 5 tumoren', '≈ 1 in 5 tumours'), { size: 28, col: C.danger, w: 700, op: kDis });
          fx += b;
        }
        $('rm-fx').innerHTML = fx;
      },
    };
  },
};
