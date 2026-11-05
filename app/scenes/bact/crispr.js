import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { rodCell } from './_bkit.js';
import { T, btn, hbtn, phage, PHDNA, rnaWave } from '../entry/_corona.js';

/*
 * CRISPR: het geheugen van bacteriën tegen fagen (zijpad virussen, 05-11-2026). Na een infectie bouwt de bacterie een stukje
 * faag-DNA (spacer) in de CRISPR-rij in (Barrangou et al. 2007); de rij wordt afgeschreven en geknipt tot korte gids-RNA's (crRNA)
 * die met Cas-eiwitten passend faag-DNA opsporen en laten knippen (Brouns et al. 2008: E. coli, Cascade + Cas3; Jinek et al. 2012:
 * Cas9 van Streptococcus pyogenes met dubbel RNA). Mensen gebruiken Cas9 met een zelfgekozen gids om genen te bewerken (Cong et al. 2013).
 * CRISPR–cas in 42,3 % van de bacteriële en 85,2 % van de archaeagenomen (Makarova et al. 2020).
 */
const L3 = (nl, en) => ({ nl, en });
const AY = 300, AX0 = 170, SP = 112;                         // CRISPR-rij: hoogte, begin, afstand tussen herhalingen
const OLD = ['#5fd3e6', '#ffc247', '#9cc0ff', '#7fdc6a', '#ffb27a'];
const DY = 560, DX0 = 560, DX1 = 1050;                       // faag-DNA in de cel
const HIT = [740, 840];                                      // stuk van het faag-DNA dat bewaard wordt / later past
const CAS = C.prot, REP = '#93a0bb';
const spacer = (x, col, op = 1, w = 70) => op <= .01 ? '' : `<rect x="${f1(x - w / 2)}" y="${AY - 15}" width="${w}" height="30" rx="6" fill="${col}" opacity="${f1(op)}"/>`;
const repeat = (x, op = 1) => op <= .01 ? '' : `<path d="M${f1(x)},${AY - 18} l12,18 l-12,18 l-12,-18 z" fill="${REP}" opacity="${f1(op)}"/>`;
const dsDNA = (x0, x1, y, col, op = 1) => op <= .01 || x1 <= x0 ? '' : `<g opacity="${f1(op)}"><path d="M${f1(x0)},${f1(y - 7)} L${f1(x1)},${f1(y - 7)} M${f1(x0)},${f1(y + 7)} L${f1(x1)},${f1(y + 7)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/></g>`;
const casBlob = (x, y, op = 1, lab = '') => op <= .01 ? '' : `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="78" ry="50" fill="rgba(155,123,255,.22)" stroke="${CAS}" stroke-width="4"/>${lab}</g>`;

export default {
  id: 'crispr',
  title: L3('Bacteriën onthouden hun vijanden', 'Bacteria remember their enemies'),
  scale: L3('één bewaard stukje ≈ 30 letters (schematisch)', 'one stored piece ≈ 30 letters (schematic)'),
  time: L3('het geheugen blijft in de dochtercellen', 'the memory stays in the daughter cells'),
  org: L3('bacteriën (en archaea) · in het lab ook in menselijke cellen', 'bacteria (and archaea) · in the lab also in human cells'),
  legend: [[PHDNA, L3('DNA van de faag', 'DNA of the phage')], [C.dna, L3('DNA van de bacterie', 'DNA of the bacterium')], [REP, L3('herhaling in de CRISPR-rij', 'repeat in the CRISPR array')],
    [C.rna, L3('RNA-gids', 'RNA guide')], [CAS, L3('eiwitschaar (Cas)', 'protein scissors (Cas)')]],
  simplified: {
    nl: 'Schematisch. Echte bewaarde stukjes zijn ≈ 30 letters lang (bij E. coli meestal 32) en de rij kan veel stukjes bevatten. Bacteriën gebruiken verschillende soorten scharen: E. coli gebruikt een groep eiwitten (Cascade) met een aparte knipper (Cas3), Streptococcus pyogenes één groot eiwit (Cas9). Cas9 knipt alleen als naast de passende letters ook een kort herkenningsstukje (PAM) ligt. Niet elke bacterie overleeft een faag; de overlevers met een nieuw stukje zijn voortaan beschermd.',
    en: 'Schematic. Real stored pieces are ≈ 30 letters long (mostly 32 in E. coli) and the array can hold many pieces. Bacteria use different kinds of scissors: E. coli uses a group of proteins (Cascade) with a separate cutter (Cas3), Streptococcus pyogenes a single large protein (Cas9). Cas9 only cuts if a short recognition piece (PAM) lies next to the matching letters. Not every bacterium survives a phage; the survivors with a new piece are protected from then on.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Bacteriën onthouden hun vijanden', 'Bacteria remember their enemies'),
      text: L3('Sommige bacteriën overleven een faag. Ze knippen een stukje uit zijn DNA en bewaren dat.', 'Some bacteria survive a phage. They cut a piece out of its DNA and keep it.') },
    { dur: 8500, cam: FULL, title: L3('Een geheugen in het eigen DNA', 'A memory in their own DNA'),
      text: L3('Het stukje komt vooraan in een rij in het eigen DNA: de CRISPR-rij. Elke nieuwe faag voegt een stukje toe.', 'The piece goes to the front of a row in the bacterium’s own DNA: the CRISPR array. Each new phage adds a piece.') },
    { dur: 8500, cam: FULL, title: L3('Het geheugen wordt een gids', 'The memory becomes a guide'),
      text: L3('De bacterie schrijft de rij over naar RNA en knipt dat in korte gidsen. Elke gids past op één faag.', 'The bacterium copies the array into RNA and cuts it into short guides. Each guide matches one phage.') },
    { dur: 8000, cam: FULL, title: L3('Gids en schaar zoeken samen', 'Guide and scissors search together'),
      text: L3('Een eiwitschaar neemt een gids mee en zoekt DNA met dezelfde letters.', 'A protein scissors takes a guide along and looks for DNA with the same letters.') },
    { dur: 9000, cam: FULL, title: L3('Past de gids, dan knipt de schaar', 'If the guide fits, the scissors cut'),
      text: L3('Komt dezelfde faag terug, dan past de gids op zijn DNA. De schaar knipt het door en de faag is onschadelijk.', 'If the same phage returns, the guide fits its DNA. The scissors cut it and the phage is harmless.') },
    { dur: 9500, cam: FULL, title: L3('Mensen maakten er een knipgereedschap van', 'People turned it into a cutting tool'),
      text: L3('Onderzoekers geven de schaar een zelfgekozen gids. Zo knippen ze een gen op een gekozen plek om het aan te passen.', 'Researchers give the scissors a guide of their choice. That way they cut a gene at a chosen spot to change it.') },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="bcel" data-nolabel data-color="${C.bact}">${rodCell(60, 150, 1010, 560)}</g>
    <g id="cr-arr"></g>
    <g id="cr-dna"></g>
    <g id="cr-fx"></g>
    <g id="cr-lab" opacity="0"></g>
    ${btn('faag', 60, 230, T2('↑ fagen', '↑ phages'), '#c7d2e8')}
    ${btn('dsb', 310, 400, T2('hoe de cel een knip herstelt', 'how the cell repairs a cut'), C.dna)}
    ${hbtn('crispr', 1100, 460, T2('de echte schaar in 3D (atlas) ↗', 'the real scissors in 3D (atlas) ↗'), CAS, '../atlas/index.html?pdb=4OO8')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));

        /* CRISPR-rij: leider + herhalingen + stukjes; het nieuwe roze stukje schuift vooraan in (stap 1) */
        const ins = ph(1, .2, .75);
        let a = `<path d="M${AX0 - 80},${AY} L1000,${AY}" stroke="${C.dna}" stroke-width="8"/>`;
        a += `<rect x="${AX0 - 70}" y="${AY - 15}" width="50" height="30" rx="6" fill="#3a4a6a"/>`;
        const shift = SP * ins;
        a += repeat(AX0);
        if (ins > .01) a += spacer(AX0 + SP / 2, PHDNA, ins) + repeat(AX0 + shift);
        OLD.forEach((col, i) => { const x = AX0 + shift + SP / 2 + i * SP; if (x < 980) a += spacer(x, col, 1) + repeat(x + SP / 2); });
        a += T(AX0 - 50, AY - 40, T2('CRISPR-rij', 'CRISPR array'), { size: 26, col: C.text, w: 700, anchor: 'start', op: step === 0 ? .6 : 1 });
        if (step === 1) a += T(560, AY + 70, T2('bij ≈ 4 op 10 bacteriën', 'in ≈ 4 out of 10 bacteria'), { size: 24, col: C.muted, op: ease(sub(p, .7, .9)) });
        $('cr-arr').innerHTML = a;

        /* faag + faag-DNA (stap 0–1) en tweede faag (stap 4) */
        let d = '', fx = '';
        const ph1 = step <= 1 ? 1 : step === 2 ? 1 - ease(sub(p, 0, .3)) : 0;          // eerste faag-DNA verdwijnt
        const ph2 = ph(4, 0, .3) * (1 - ph(5, 0, .3));                                   // tweede faag
        const pOp = Math.max(ph1, ph2);
        if (pOp > .01) d += phage(1070, DY, .8, pOp * (step === 0 ? 1 : .6), step === 0 ? 1 - ease(sub(p, 0, .3)) : 0, 90);
        // eerste faag-DNA; stuk HIT wordt uitgeknipt (stap 0) en gaat naar de rij (stap 1)
        if (ph1 > .01) {
          const grow = step === 0 ? ease(sub(p, 0, .35)) : 1;
          const x0 = lerp(DX1, DX0, grow), lift = ph(0, .55, .9);
          d += `<g opacity="${f1(ph1)}">` + dsDNA(x0, HIT[0] - 6 * lift, DY, PHDNA) + dsDNA(HIT[1] + 6 * lift, DX1, DY, PHDNA) + '</g>';
          const mx = lerp((HIT[0] + HIT[1]) / 2, AX0 + SP / 2, ins), my = lerp(DY - 70 * lift, AY, ins);
          if (ins < .99) d += dsDNA(mx - 50, mx + 50, my, PHDNA, x0 < HIT[0] ? 1 : 0);
          if (step === 0) fx += T(800, DY + 70, T2('faag-DNA', 'phage DNA'), { size: 26, col: PHDNA, w: 700, op: ease(sub(p, .2, .4)) });
        }
        /* RNA-kopie van de rij → gidsen (stap 2) */
        const kR = ph(2, .1, .45), kCut = ph(2, .5, .85);
        const GUIDES = [[PHDNA, 330], [OLD[0], 520], [OLD[1], 710], [OLD[2], 900]];
        if (kR > .01) {
          if (kCut < .99) d += `<g opacity="${f1(1 - kCut)}">${rnaWave(AX0, lerp(AX0, 960, kR), AY + 60, 1, 6)}</g>`;
          GUIDES.forEach(([col, gx], i) => {
            if (kCut <= .01) return;
            const x = lerp(AX0 + SP / 2 + i * SP, gx, kCut), y = lerp(AY + 60, 420, kCut);
            if (i === 0 && step >= 3) return;
            d += `<g opacity="${f1(kCut)}">${rnaWave(x - 40, x + 10, y, 1, 6)}<rect x="${f1(x + 10)}" y="${f1(y - 7)}" width="34" height="14" rx="5" fill="${col}"/></g>`;
          });
          if (step === 2) fx += T(620, 480, T2('korte RNA-gidsen', 'short RNA guides'), { size: 26, col: C.rna, w: 700, op: ease(sub(p, .75, .95)) });
        }
        /* schaar + roze gids (stap 3–4) */
        if (step >= 3 && step <= 5) {
          const kC = ph(3, 0, .35), mv = ph(4, .25, .6);
          const cx = lerp(330, (HIT[0] + HIT[1]) / 2, mv), cy = lerp(450, DY - 2, mv);
          const op = 1 - ph(5, 0, .3) * .7;
          d += casBlob(cx, cy, kC * op, `${rnaWave(cx - 50, cx, cy - 14, 1, 6)}<rect x="${f1(cx)}" y="${f1(cy - 21)}" width="40" height="14" rx="5" fill="${PHDNA}"/>`);
          if (step === 3) fx += T(330, 540, T2('schaar + gids', 'scissors + guide'), { size: 26, col: CAS, w: 700, op: ease(sub(p, .35, .55)) });
        }
        /* tweede faag-DNA: past → geknipt (stap 4) */
        if (ph2 > .01) {
          const grow = ph(4, .05, .3), cut = ph(4, .65, .85);
          const x0 = lerp(DX1, DX0, grow), mid = (HIT[0] + HIT[1]) / 2;
          d += `<g opacity="${f1(ph2 * (1 - .6 * ph(4, .9, 1)))}">` + dsDNA(x0, mid - 30 * cut, DY + (step >= 4 ? 0 : 0), PHDNA) + dsDNA(mid + 30 * cut, DX1, DY, PHDNA) + '</g>';
          if (step === 4) fx += T(mid, DY + 90, T2('past → knip', 'fits → cut'), { size: 28, col: C.danger, w: 800, op: ease(sub(p, .65, .8)) });
        }
        $('cr-dna').innerHTML = d;
        $('cr-fx').innerHTML = fx;

        /* stap 5: in het lab */
        const kL = ph(5, .15, .45);
        $('cr-lab').setAttribute('opacity', f1(kL));
        if (step === 5) {
          $('cr-lab').innerHTML = `<rect x="1100" y="150" width="470" height="560" rx="20" fill="rgba(13,20,38,.92)" stroke="${CAS}" stroke-width="3"/>` +
            T(1335, 200, T2('in het lab', 'in the lab'), { size: 30, col: CAS, w: 700 }) +
            dsDNA(1150, 1520, 330, C.dna) + `<rect x="1300" y="310" width="70" height="40" rx="6" fill="none" stroke="${C.trna}" stroke-width="4"/>` +
            T(1335, 290, T2('gekozen plek in een gen', 'chosen spot in a gene'), { size: 24, col: C.trna }) +
            casBlob(1335, 430, 1, `${rnaWave(1285, 1335, 416, 1, 6)}<rect x="1335" y="409" width="40" height="14" rx="5" fill="${C.trna}"/>`) +
            T(1335, 520, T2('zelfgekozen gids', 'guide of choice'), { size: 24, col: C.text }) +
            T(1335, 590, T2('bacterie: faag kapotknippen', 'bacterium: cut up the phage'), { size: 23, col: C.muted }) +
            T(1335, 640, T2('lab: een gen aanpassen', 'lab: change a gene'), { size: 23, col: C.trna, w: 700 });
        } else $('cr-lab').innerHTML = '';
      },
    };
  },
};
