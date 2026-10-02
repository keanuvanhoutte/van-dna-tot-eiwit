import { C, BASE, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1, aa } from '../../kit.js';
import { prot, note, arrow, ntBox, ntRow, hb, npairs, hot, setHot } from './_rna.js';

/*
 * RNA-editing bij de mens. Links: A→I door ADAR2 (GluA2-pre-mRNA, Q/R-plaats). Rechts: C→U door APOBEC1 (apoB-mRNA, C6666).
 * Flankerende sequenties zijn schematisch; de codons (CAG → CIG, CAA → UAA) zijn echt.
 */
const TOP = 'GUCCAGAUUGC', BOT = 'CAGGCCUAACG';     // BOT staat onder TOP (antiparallel, 3'→5' van links naar rechts); positie 4: A tegenover C
const EA = 4, W = 44, X0 = 170, YT = 420, YB = 510;
const AX = 900, AY = 470, AW = 42;                // apoB-rij
const APO = ['N', 'N', 'N', ' ', 'C', 'A', 'A', ' ', 'N', 'N', 'N', ' ', 'N', 'N', 'N'];
const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'editing',
  title: { nl: 'RNA-editing', en: 'RNA editing' },
  scale: '≈ 10 nm',
  time: { nl: 'tijdens/na transcriptie (hier vertraagd)', en: 'during/after transcription (slowed down here)' },
  org: { nl: 'mens (hersenen, dunne darm)', en: 'human (brain, small intestine)' },
  legend: [[BASE.A, 'A'], [BASE.U, 'U'], [BASE.G, 'G'], [BASE.C, 'C'], ['#e7e7e7', { nl: 'I (inosine)', en: 'I (inosine)' }], [C.prot, { nl: 'ADAR2, APOBEC1, A1CF', en: 'ADAR2, APOBEC1, A1CF' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Beide reacties zijn <b>hydrolytische deamineringen</b>: een aminogroep (–NH₂) wordt vervangen door een ketogroep (=O). Adenine wordt zo hypoxanthine (nucleoside: inosine), cytosine wordt uracil. Het genoom blijft onveranderd.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Both reactions are <b>hydrolytic deaminations</b>: an amino group (–NH₂) is replaced by a keto group (=O). Adenine thus becomes hypoxanthine (nucleoside: inosine), cytosine becomes uracil. The genome stays unchanged.</p>' },
  simplified: {
    nl: 'De flankerende basen zijn schematisch (N = willekeurige base); enkel de codons CAG/CIG (GluA2, Q/R-plaats) en CAA/UAA (apoB, codon 2153) zijn echt. De GluA2-duplex wordt gevormd door het exon en een complementaire intronsequentie (ECS) en is langer en onregelmatiger dan getekend. ADAR2 werkt als dimeer; APOBEC1 vormt met A1CF (en RBM47) een editosoom dat bindt aan een “mooring”-sequentie net stroomafwaarts van C6666.',
    en: 'Flanking bases are schematic (N = any base); only the codons CAG/CIG (GluA2, Q/R site) and CAA/UAA (apoB, codon 2153) are real. The GluA2 duplex is formed by the exon and a complementary intronic sequence (ECS) and is longer and more irregular than drawn. ADAR2 acts as a dimer; APOBEC1 forms an editosome with A1CF (and RBM47) that binds a “mooring” sequence just downstream of C6666.' },
  steps: [
    ST(7000, FULL, "Het RNA zegt iets anders dan het DNA", "The RNA says something different from the DNA",
      "Een enzym verandert één base in het RNA; het DNA blijft hetzelfde. Dat heet RNA-editing.",
      "An enzyme changes one base in the RNA; the DNA stays the same. This is called RNA editing."),
    ST(7500, cam(420, 460, 900), "Een enzym herkent dubbel RNA", "An enzyme spots double RNA",
      "Een stuk van dit RNA (voor een receptor in de hersenen) vormt een dubbele streng. Een enzym herkent die.",
      "Part of this RNA (for a receptor in the brain) forms a double strand. An enzyme recognises it."),
    ST(8000, cam(360, 380, 740), "Een A wordt een I", "An A becomes an I",
      "Het enzym klapt een A uit de streng en verandert die chemisch in een andere base: inosine (I).",
      "The enzyme flips an A out of the strand and chemically changes it into another base: inosine (I)."),
    ST(8500, cam(420, 454, 1000), "I wordt gelezen als G", "I is read as G",
      "Het ribosoom leest I als G, dus komt er een ander aminozuur. Daardoor laat de receptor geen calcium meer door.",
      "The ribosome reads I as G, so a different amino acid is built in. As a result the receptor no longer lets calcium through."),
    ST(7500, cam(1200, 425, 900), "Een ander enzym, in de darm", "Another enzyme, in the gut",
      "In de darm bindt een ander enzym het RNA voor apoB, een eiwit dat vetten door het bloed vervoert.",
      "In the gut another enzyme binds the RNA for apoB, a protein that carries fats through the blood."),
    ST(7500, cam(1210, 440, 830), "Een C wordt een U", "A C becomes a U",
      "Het enzym maakt daar van een C een U. Zo ontstaat halverwege een stopsein: CAA wordt UAA.",
      "The enzyme turns a C into a U there. This creates a stop signal halfway: CAA becomes UAA."),
    ST(8500, cam(1200, 500, 1000), "Eén gen, twee eiwitten", "One gene, two proteins",
      "De lever maakt het volledige eiwit. De darm stopt bij het nieuwe stopsein en maakt ongeveer de voorste helft.",
      "The liver makes the full protein. The gut stops at the new stop signal and makes roughly the front half."),
  ],
  svg() {
    return svgOpen() + `
    <line x1="800" y1="170" x2="800" y2="760" stroke="#1d2946" stroke-width="3" stroke-dasharray="8 8"/>
    ${note(420, 200, T2('A → I (ADAR)', 'A → I (ADAR)'), '#e7e7e7', 26)}${note(1200, 200, T2('C → U (APOBEC1)', 'C → U (APOBEC1)'), BASE.U, 26)}
    <g data-node="rnastructuur" data-color="${C.rna}" data-nolabel><g id="ed-ds"></g></g><g id="ed-adar"></g><g data-node="codon" data-color="${C.trna}" data-nolabel><g id="ed-code"></g></g><g data-node="editing" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-nolabel><g id="ed-apo"></g></g><g id="ed-apob"></g>
    ${hot('rnastructuur', T2('dsRNA-substraat (atlas)', 'dsRNA substrate (atlas)'), C.rna, 'ed-hD', '../atlas/index.html?id=dsrna', true)}
    ${hot('codon', T2('Genetische code', 'Genetic code'), C.trna, 'ed-cA')}
    ${hot('editing', T2('apoB-mRNA (atlas)', 'apoB mRNA (atlas)'), C.rna, 'ed-hM', '../atlas/index.html?id=mrna', true)}
    ${hot('splicing', T2('Editing vóór splicing', 'Editing before splicing'), C.prot, 'ed-sA', '', true)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const tx = i => X0 + i * W;
    return {
      update(t, s) {
        const { step, p } = s;
        // ---------- links: dsRNA met A (positie 4) tegenover C ----------
        const flip = step === 2 ? Math.sin(Math.PI * sub(p, .05, .95)) : 0;   // uit de helix en terug
        const edited = step > 2 || (step === 2 && p > .5);
        let ds = '';
        const n = TOP.length, xe = tx(n - 1) + 30;
        ds += `<line x1="${tx(0) - 20}" y1="${YT + 15}" x2="${xe}" y2="${YT + 15}" stroke="${C.rna}" stroke-width="6"/><line x1="${tx(0) - 20}" y1="${YB + 15}" x2="${xe}" y2="${YB + 15}" stroke="#d9854a" stroke-width="6"/>`;
        ds += `<path d="M${xe},${YT + 15} C${xe + 70},${YT + 15} ${xe + 70},${YB + 15} ${xe},${YB + 15}" stroke="#d9854a" stroke-width="6" fill="none"/>`;
        for (let i = 0; i < n; i++) {
          const top = i === EA ? (edited ? 'I' : 'A') : TOP[i];
          const dy = i === EA ? -70 * flip : 0;
          ds += ntBox(tx(i), YT + 15 + dy, top, 34);
          ds += ntBox(tx(i), YB + 15, BOT[i], 34);
          if (i !== EA) ds += hb(tx(i), YT + 34, tx(i), YB - 4, npairs(TOP[i], BOT[i]), .8);
          else if (edited && flip < .2) ds += hb(tx(i), YT + 34, tx(i), YB - 4, 3, 1, '#ffd36b');
        }
        ds += note(tx(0) - 34, YT + 22, "5'", C.text, 18, 'end') + note(tx(0) - 34, YB + 22, "3'", C.text, 18, 'end');
        if (step >= 1) ds += note(tx(1), YT - 30, 'exon', C.rna, 18) + note(tx(2), YB + 64, T2('intron (complementair)', 'intron (complementary)'), '#d9854a', 18);
        // codonkader CAG
        if (step >= 1 && step <= 3) ds += `<rect x="${tx(3) - 22}" y="${YT - 6 - (step === 2 ? 70 * flip : 0) * 0}" width="${3 * W}" height="44" rx="8" fill="none" stroke="#fff" stroke-width="2.5" opacity=".8"/>`;
        const opL = step === 0 ? 1 : step <= 3 ? 1 : .35;
        $('ed-ds').innerHTML = `<g opacity="${opL}">${ds}</g>`;
        setHot(svg, 'ed-hD', step <= 1 ? [tx(10) + 90, YT + 60, 30, 60] : null);

        // ADAR2
        let ad = '';
        const adOp = step === 1 ? ease(sub(p, .2, .6)) : step === 2 ? 1 : step === 3 ? 1 - sub(p, 0, .3) : 0;
        if (adOp > 0) {
          ad += `<g opacity="${f1(adOp)}"><path d="M${tx(2) - 30},${YT - 50} C${tx(2) - 30},${YT - 190} ${tx(6) + 30},${YT - 190} ${tx(6) + 30},${YT - 50} Z" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/>` +
            `<text x="${tx(4)}" y="${YT - 118}" font-size="18" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">${T2('deaminase', 'deaminase')}</text>` +
            `<text x="${tx(4)}" y="${YT - 196}" font-size="20" text-anchor="middle" fill="#c9b8ff" font-family="Inter" font-weight="800">ADAR2</text></g>`;
          ad += prot(tx(7) + 20, YB + 70, 84, 30, 'dsRBD1', '#5a4bb8', adOp, 15) + prot(tx(9) + 30, YB + 70, 84, 30, 'dsRBD2', '#5a4bb8', adOp, 15);
        }
        if (step === 2) {
          ad += note(tx(4) + 150, YT - 60, edited ? T2('inosine (=O)', 'inosine (=O)') : T2('adenosine (–NH₂)', 'adenosine (–NH₂)'), edited ? '#fff' : BASE.A, 18, 'start', sub(p, .1, .25));
          ad += note(tx(4) + 150, YT - 30, 'H₂O → NH₃', '#ffd36b', 17, 'start', sub(p, .45, .6));
        }
        $('ed-adar').innerHTML = ad;

        // stap 3: de code
        let cd = '';
        if (step === 3) {
          const k = ease(sub(p, .1, .4)), k2 = ease(sub(p, .45, .7));
          const cx = 420, cy = 628;
          cd += `<g opacity="${f1(k)}">` + ntRow(cx - 250, cy, 'CAG', 38, 38) + note(cx - 212, cy - 14, T2('genoom: CAG', 'genome: CAG'), C.muted, 16) +
            arrow(cx - 120, cy + 19, cx - 70, cy + 19, C.muted) + ntRow(cx - 30, cy, 'CIG', 38, 38) + note(cx + 8, cy - 14, 'RNA', C.muted, 16) +
            `<text x="${cx + 105}" y="${cy + 28}" font-size="24" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">≙</text>` + ntRow(cx + 150, cy, 'CGG', 38, 38) + note(cx + 188, cy - 14, T2('ribosoom leest', 'ribosome reads'), C.muted, 16) + '</g>';
          cd += `<g opacity="${f1(k2)}">${aa(cx - 212, cy + 76, 'Q', 22)}${aa(cx + 188, cy + 76, 'R', 22)}</g>` + note(cx - 10, cy + 84, T2('Gln → Arg', 'Gln → Arg'), '#ffd36b', 20, 'middle', k2);
        }
        $('ed-code').innerHTML = cd;
        setHot(svg, 'ed-cA', step === 3 && p > .4 ? [608, 628, 120, 40] : null);
        setHot(svg, 'ed-sA', step === 1 && p > .6 ? [tx(2), YB + 90, 40, 16] : null);
        setHot(svg, 'ed-hM', step === 4 || step === 5 ? [AX + 60, AY + 54, 80, 10] : null);

        // ---------- rechts: apoB ----------
        const cu = step > 5 || (step === 5 && p > .45);
        let ap = '';
        const opR = step === 0 ? 1 : step >= 4 ? 1 : .35;
        ap += `<g opacity="${opR}"><line x1="${AX - 50}" y1="${AY + 19}" x2="${AX + 15 * AW + 40}" y2="${AY + 19}" stroke="${C.rna}" stroke-width="6"/>`;
        APO.forEach((b, i) => {
          if (b === ' ') return;
          const bb = i === 4 && cu ? 'U' : b;
          ap += ntBox(AX + i * AW, AY + 19, bb, 36, b === 'N' ? .55 : 1);
        });
        if (step >= 4) ap += note(AX - 60, AY + 26, "5' …", C.text, 18, 'end') + note(AX + 15 * AW + 50, AY + 26, "… 3'", C.text, 18, 'start');
        if (step >= 4) [['2152', 1], ['2153', 5], ['2154', 9], ['2155', 13]].forEach(([c, i]) => { ap += note(AX + i * AW, AY - 22, c, i === 5 ? C.text : C.muted, 16); });
        ap += `<rect x="${AX + 4 * AW - 24}" y="${AY - 6}" width="${3 * AW - 2}" height="50" rx="8" fill="none" stroke="${cu ? C.danger : '#fff'}" stroke-width="2.5" opacity="${step >= 4 ? 1 : .6}"/>`;
        ap += note(AX + 5 * AW, AY + 84, cu ? T2('UAA = stop', 'UAA = stop') : T2('CAA = Gln', 'CAA = Gln'), cu ? C.danger : C.text, 18, 'middle', step >= 4 ? 1 : 0);
        if (step >= 4) ap += `<path d="M${AX + 8 * AW - 20},${AY + 60} v10 H${AX + 14 * AW + 18} v-10" stroke="#ffd36b" stroke-width="2.5" fill="none"/>` + note(AX + 11.5 * AW, AY + 96, T2('mooring-sequentie', 'mooring sequence'), '#ffd36b', 15);
        ap += '</g>';
        $('ed-apo').innerHTML = ap;

        let ab = '';
        const eo = step === 4 ? ease(sub(p, .2, .6)) : step === 5 ? 1 : step === 6 ? 1 - sub(p, 0, .2) : 0;
        if (eo > 0) {
          ab += `<g opacity="${f1(eo)}"><ellipse cx="${AX + 5 * AW}" cy="${AY - 90}" rx="110" ry="48" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/>` +
            `<text x="${AX + 5 * AW}" y="${AY - 84}" font-size="18" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="800">APOBEC1 (2×)</text></g>`;
          ab += prot(AX + 11 * AW, AY - 60, 76, 32, 'A1CF', '#5a4bb8', eo, 16);
        }
        if (step === 5) ab += note(AX + 5 * AW + 130, AY - 150, 'C → U  (+ NH₃)', '#ffd36b', 18, 'start', sub(p, .4, .55));
        if (step === 6) {
          const k = ease(sub(p, .15, .5)), k2 = ease(sub(p, .4, .75));
          const bx = 880, len = 620, y1 = 616, y2 = 704;
          ab += `<g opacity="${f1(k)}"><rect x="${bx}" y="${y1}" width="${len}" height="30" rx="8" fill="${C.prot}"/>` + note(bx, y1 - 12, T2('lever: apoB-100 (niet ge-edit) → VLDL/LDL', 'liver: apoB-100 (unedited) → VLDL/LDL'), C.text, 17, 'start') +
            `<rect x="${bx + len - 90}" y="${y1 + 4}" width="84" height="22" rx="5" fill="#ffd36b"/><text x="${bx + len - 48}" y="${y1 + 21}" font-size="13" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">LDLR</text></g>`;
          ab += `<g opacity="${f1(k2)}"><rect x="${bx}" y="${y2}" width="${f1(len * .48)}" height="30" rx="8" fill="${C.prot2}"/>` + note(bx, y2 - 12, T2('dunne darm: apoB-48 (≈ 48 %) → chylomicronen', 'small intestine: apoB-48 (≈ 48 %) → chylomicrons'), C.text, 17, 'start') +
            `<line x1="${f1(bx + len * .48)}" y1="${y2 - 6}" x2="${f1(bx + len * .48)}" y2="${y2 + 38}" stroke="${C.danger}" stroke-width="3"/>` + note(bx + len * .48 + 10, y2 + 22, T2('stop (codon 2153)', 'stop (codon 2153)'), C.danger, 16, 'start') + '</g>';
        }
        $('ed-apob').innerHTML = ab;
      },
    };
  },
};
