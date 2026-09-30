import { C, BASE, L, T2, svgOpen, txt, pill, nt, aa, cam, sub, ease, lerp, clamp, f1, translate, THREE, AACLASS, CLASSCOL } from '../../kit.js';
import { seg, pth, endl, prot, tag, arrow } from './_draw.js';

/*
 * Mutaties in het begin van het menselijke β-globinegen (HBB), coderende streng 5'→3'.
 * Sequentie: Ensembl ENST00000335295 (CDS). Codonnummering traditioneel: start-Met = 0, Val = 1 …
 *  - stil (echte benigne variant rs713040): codon 2 CAT → CAC (His → His)
 *  - missense (HbS, sikkelcelziekte): codon 6 GAG → GTG (Glu → Val)
 *  - nonsense (β⁰-thalassemie): codon 17 AAG → TAG (Lys → stop)
 *  - frameshift (β⁰-thalassemie): codons 8/9 +G (c.27_28insG, p.Ser10Valfs*14)
 */
const CDS = 'ATGGTGCATCTGACTCCTGAGGAGAAGTCTGCCGTTACTGCCCTGTGGGGCAAGGTGAACGTGGATGAAGTTGGTGGTGAGG';
const NC = 23;                                   // getoonde codons (0..22)
const REF = CDS.slice(0, NC * 3);
const NTW = 22, CW = 72, X0 = 80, BH = 26;
const YD = 290, YM = 380, YA = 500;              // rijen: DNA, mRNA, aminozuren
const cx = i => X0 + CW / 2 + i * CW;             // midden van codon i
const bx = k => X0 + (CW - 3 * NTW) / 2 + NTW / 2 + Math.floor(k / 3) * CW + (k % 3) * NTW;   // x van nucleotide k

const MUT = {
  silent: { pos: 8, to: 'C' },
  missense: { pos: 19, to: 'T' },
  nonsense: { pos: 51, to: 'T' },
};
const withSub = (s, m) => s.slice(0, m.pos) + m.to + s.slice(m.pos + 1);
const FS = REF.slice(0, 27) + 'G' + CDS.slice(27, NC * 3 - 1);   // + G tussen c.27 en c.28 (zelfde lengte getoond)
const codonsOf = s => Array.from({ length: NC }, (_, i) => s.slice(i * 3, i * 3 + 3));
const rnaOf = c => c.replace(/T/g, 'U');

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'mutaties',
  title: { nl: 'Mutaties', en: 'Mutations' },
  scale: '≈ 1–5 nm',
  time: { nl: 'mutatiesnelheid: zeer laag per base per deling', en: 'mutation rate: very low per base per division' },
  org: { nl: 'mens (β-globinegen, HBB)', en: 'human (β-globin gene, HBB)' },
  legend: [[BASE.A, 'A'], [BASE.T, 'T / U'], [BASE.G, 'G'], [BASE.C, 'C'], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }],
    [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [CLASSCOL.s, 'Gly / Pro'], [C.danger, { nl: 'mutatie / stop', en: 'mutation / stop' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De aminozuren worden niet getekend maar berekend met de standaard genetische code. De sequentie is het echte begin van het humane HBB-gen (β-globine, een keten van hemoglobine).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The amino acids are not drawn by hand but computed with the standard genetic code. The sequence is the real start of the human HBB gene (β-globin, one chain of haemoglobin).</p>' },
  simplified: {
    nl: 'Alleen de coderende streng en de eerste 22 codons worden getoond. Codonnummers volgen de traditionele hemoglobinenummering (start-Met niet meegeteld; in HGVS-notatie is HbS p.Glu7Val). De stille mutatie in codon 2 (CAT→CAC) is een echte, onschadelijke variant (rs713040); HbS (codon 6), codon 17 A>T en codons 8/9 +G zijn bekende ziektemutaties. NMD is sterk vereenvoudigd (EJC\'s, UPF1-activatie en afbraakroutes niet in detail).',
    en: 'Only the coding strand and the first 22 codons are shown. Codon numbers follow the traditional haemoglobin numbering (start Met not counted; in HGVS notation HbS is p.Glu7Val). The silent mutation in codon 2 (CAT→CAC) is a real, harmless variant (rs713040); HbS (codon 6), codon 17 A>T and codons 8/9 +G are known disease mutations. NMD is strongly simplified (EJCs, UPF1 activation and decay routes not in detail).' },
  steps: [
    S(8000, cam(480, 400, 1150), 'Gen → mRNA → eiwit', 'Gene → mRNA → protein',
      'Het begin van het β-globinegen (HBB). Elk codon van drie basen codeert voor één aminozuur; een mutatie verandert de DNA-sequentie.',
      'The start of the β-globin gene (HBB). Each codon of three bases encodes one amino acid; a mutation changes the DNA sequence.'),
    S(8000, cam(480, 660, 1150), 'Transitie of transversie', 'Transition or transversion',
      'Een puntmutatie vervangt één base. Transitie: purine ↔ purine of pyrimidine ↔ pyrimidine. Transversie: purine ↔ pyrimidine.',
      'A point mutation replaces one base. Transition: purine ↔ purine or pyrimidine ↔ pyrimidine. Transversion: purine ↔ pyrimidine.'),
    S(8000, cam(330, 430, 900), 'Stille mutatie', 'Silent mutation',
      'CAT → CAC: beide codons coderen voor histidine. Door de gedegenereerde code (vaak op de 3e positie) verandert het eiwit niet.',
      'CAT → CAC: both codons encode histidine. Because the code is degenerate (often at the 3rd position), the protein does not change.'),
    S(9000, cam(560, 470, 1050), 'Missense: sikkelcelhemoglobine', 'Missense: sickle-cell haemoglobin',
      'GAG → GTG in codon 6: glutamaat (negatief) wordt valine (hydrofoob). Die plakkerige plek laat deoxy-HbS aaneenklitten tot vezels: sikkelvormige rode bloedcellen.',
      'GAG → GTG in codon 6: glutamate (negative) becomes valine (hydrophobic). This sticky patch makes deoxy-HbS aggregate into fibres: sickle-shaped red blood cells.'),
    S(8000, cam(1180, 470, 1150), 'Nonsense: een vroeg stopcodon', 'Nonsense: an early stop codon',
      'AAG → TAG in codon 17: lysine wordt een stopcodon (UAG). Er zou een sterk ingekort eiwit ontstaan (β⁰-thalassemie).',
      'AAG → TAG in codon 17: lysine becomes a stop codon (UAG). This would give a severely truncated protein (β⁰-thalassaemia).'),
    S(9000, cam(1150, 700, 1150), 'Nonsense-mediated decay', 'Nonsense-mediated decay',
      'Ligt een stopcodon meer dan ~50–55 nt vóór de laatste exon-exonovergang, dan wordt het mRNA als foutief herkend en afgebroken (NMD).',
      'If a stop codon lies more than ~50–55 nt upstream of the last exon–exon junction, the mRNA is recognised as faulty and degraded (NMD).'),
    S(10000, cam(1110, 430, 1250), 'Insertie → frameshift', 'Insertion → frameshift',
      'Eén extra G tussen codon 8 en 9 verschuift het leeskader: alle volgende codons veranderen, tot er toevallig een stopcodon opduikt. (Indels van 3 nt behouden het kader.)',
      'One extra G between codons 8 and 9 shifts the reading frame: all following codons change until a stop codon appears by chance. (Indels of 3 nt keep the frame.)'),
    S(8000, cam(800, 650, 1500), 'Waar komen mutaties vandaan?', 'Where do mutations come from?',
      'Replicatiefouten die proeflezen en MMR ontsnappen, en schade die niet (goed) hersteld wordt, zoals deaminatie van 5-methylcytosine (C→T in CpG) of UV-dimeren.',
      'Replication errors that escape proofreading and MMR, and damage that is not (correctly) repaired, such as deamination of 5-methylcytosine (C→T at CpG) or UV dimers.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="mu-rows"></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${T2('Genetische code', 'Genetic code')}"><rect x="${X0}" y="${YM - 6}" width="${NC * CW}" height="${BH + 12}" fill="transparent"/><circle id="mu-coa" data-anchor="codon" cx="${cx(1)}" cy="${YM - 30}" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="${C.prot}" data-label="${T2('Aminozuren', 'Amino acids')}"><rect x="${X0}" y="${YA - 30}" width="${NC * CW}" height="60" fill="transparent"/><circle id="mu-aaa" data-anchor="aminozuren" cx="${cx(4)}" cy="${YA - 30}" r="1" fill="none"/></g>
    <g id="mu-extra"></g>
    <g data-node="quaternair" data-color="${C.prot}" data-label="${T2('Hemoglobine (quaternaire structuur)', 'Haemoglobin (quaternary structure)')}"><g id="mu-hb"></g><circle id="mu-hba" data-anchor="quaternair" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="nmd" data-color="${C.rna}" data-label="${T2('NMD in detail', 'NMD in detail')}"><g id="mu-nmd"></g><circle id="mu-nmda" data-anchor="nmd" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="herstel" data-color="${C.ok}" data-label="${T2('DNA-herstel', 'DNA repair')}"><g id="mu-her"></g><circle id="mu-hera" data-anchor="herstel" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="replisoom" data-color="${C.prot}" data-label="${T2('Replisoom (proeflezen)', 'Replisome (proofreading)')}"><g id="mu-rep"></g><circle id="mu-repa" data-anchor="replisoom" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const place = (id, x, y) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); };

    /* teken DNA-, mRNA- en aminozuurrij voor een sequentie; hl = set nucleotide-indexen om te markeren; aaK = hoeveel codons al 'nieuw' vertaald zijn */
    function rows(seq, { hl = new Set(), mark = new Set(), stopAfter = true, dim = () => 1, ins = -1, insOp = 1 } = {}) {
      let s = '';
      const cods = codonsOf(seq);
      let stopped = false;
      cods.forEach((c, i) => {
        const op = dim(i);
        const x = cx(i);
        // codonnummer
        s += txt(x, YD - 22, i === 0 ? 'start' : String(i), C.muted, i === 0 ? 16 : 14, 'middle', 600);
        let g = '';
        for (let k = 0; k < 3; k++) {
          const n = i * 3 + k, b = c[k];
          if (!b) continue;
          g += nt(bx(n), YD, b, NTW - 2, BH, n === ins ? insOp : 1);
          g += nt(bx(n), YM, rnaOf(b), NTW - 2, BH, n === ins ? insOp : 1);
          if (hl.has(n)) g += `<rect x="${f1(bx(n) - NTW / 2 - 2)}" y="${YD - 3}" width="${NTW + 2}" height="${BH + 6}" rx="5" fill="none" stroke="#fff" stroke-width="3"/>` +
            `<rect x="${f1(bx(n) - NTW / 2 - 2)}" y="${YM - 3}" width="${NTW + 2}" height="${BH + 6}" rx="5" fill="none" stroke="#fff" stroke-width="3"/>`;
        }
        if (mark.has(i)) g += `<rect x="${f1(x - CW / 2 + 1)}" y="${YD - 8}" width="${CW - 2}" height="${YA - YD + 50}" rx="10" fill="none" stroke="${C.danger}" stroke-width="3"/>`;
        // aminozuur
        const a = c.length === 3 ? translate(rnaOf(c)) : '';
        if (!stopped && a) {
          if (a === '*') { g += `<g transform="translate(${f1(x)} ${YA})"><path d="M-11,-26 L11,-26 L26,-11 L26,11 L11,26 L-11,26 L-26,11 L-26,-11Z" fill="${C.danger}"/>${txt(0, 6, 'Stop', '#fff', 17, 'middle', 700)}</g>`; if (stopAfter) stopped = true; }
          else g += aa(x, YA, a, 23);
        } else if (stopped) g += `<circle cx="${f1(x)}" cy="${YA}" r="8" fill="none" stroke="#3b4c70" stroke-width="2" stroke-dasharray="3 3"/>`;
        s += `<g opacity="${f1(op)}">${g}</g>`;
      });
      // rijlabels + uiteinden
      s += txt(X0 - 14, YD + 18, "5'", C.dna, 16, 'end', 700, 'JetBrains Mono') + txt(X0 - 14, YM + 18, "5'", C.rna, 16, 'end', 700, 'JetBrains Mono');
      s += txt(X0 - 14, YA + 6, 'N', C.prot, 16, 'end', 700, 'JetBrains Mono');
      return s;
    }
    const rowLabels = op => `<g opacity="${f1(op)}">` + txt(X0, YD - 50, T2('DNA (coderende streng)', 'DNA (coding strand)'), C.dna, 17, 'start', 700) +
      txt(X0, YM + BH + 26, 'mRNA', C.rna, 17, 'start', 700) + txt(X0, YA + 52, T2('eiwit (β-globine)', 'protein (β-globin)'), C.prot, 17, 'start', 700) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        let r = '', ex = '', hb = '', nm = '', her = '', rep = '';
        const effect = (i, nl, en, col, op) => tag(cx(i), YA + 64, T2(nl, en), col, 17, 'middle', op);

        if (step === 0 || step === 1) {
          r = rows(REF) + rowLabels(1);
          if (step === 0) ex += tag(cx(6), YD - 80, T2('begin van het HBB-gen · 3 basen = 1 codon = 1 aminozuur', 'start of the HBB gene · 3 bases = 1 codon = 1 amino acid'), C.text, 18, 'middle', sub(p, .1, .3));
          if (step === 1) {
            // puriness en pyrimidines in een vierkant
            const k = ease(sub(p, .05, .3));
            const P = { A: [220, 640], G: [220, 800], C: [620, 640], T: [620, 800] };
            ex += `<g opacity="${f1(k)}">`;
            ex += txt(220, 600, T2('purines', 'purines'), C.text, 17) + txt(620, 600, T2('pyrimidines', 'pyrimidines'), C.text, 17);
            const ts = ease(sub(p, .25, .45)), tv = ease(sub(p, .5, .7));
            ex += `<g opacity="${f1(ts)}">${seg(220, 668, 220, 772, C.ok, 5)}${seg(620, 668, 620, 772, C.ok, 5)}${txt(170, 726, T2('transitie', 'transition'), C.ok, 16, 'end')}${txt(670, 726, T2('transitie', 'transition'), C.ok, 16, 'start')}</g>`;
            ex += `<g opacity="${f1(tv)}">${seg(252, 640, 588, 640, '#ffc247', 4)}${seg(252, 800, 588, 800, '#ffc247', 4)}${seg(250, 660, 590, 780, '#ffc247', 4)}${seg(250, 780, 590, 660, '#ffc247', 4)}${txt(420, 626, T2('transversie', 'transversion'), '#ffc247', 16)}</g>`;
            for (const [b, [x, y]] of Object.entries(P)) ex += nt(x, y - 20, b, 44, 40);
            ex += '</g>';
            ex += tag(780, 690, T2('4 transities', '4 transitions'), C.ok, 17, 'start', ts) + tag(780, 720, T2('8 transversies', '8 transversions'), '#ffc247', 17, 'start', tv);
            ex += tag(780, 770, T2('transities komen vaker voor,', 'transitions are more common,'), C.muted, 16, 'start', sub(p, .75, .9)) + tag(780, 796, T2('bv. C→T na deaminatie', 'e.g. C→T after deamination'), C.muted, 16, 'start', sub(p, .75, .9));
          }
        } else if (step >= 2 && step <= 4) {
          const key = ['silent', 'missense', 'nonsense'][step - 2];
          const m = MUT[key], ci = Math.floor(m.pos / 3);
          const kMut = ease(sub(p, .15, .35));
          const seq = kMut > .5 ? withSub(REF, m) : REF;
          r = rows(seq, { hl: new Set([m.pos]), mark: new Set([ci]), dim: i => (Math.abs(i - ci) <= 7 ? 1 : .35) });
          const old = REF.slice(ci * 3, ci * 3 + 3), nw = withSub(REF, m).slice(ci * 3, ci * 3 + 3);
          const ts = (a, b) => ('AG'.includes(a) && 'AG'.includes(b)) || ('CT'.includes(a) && 'CT'.includes(b));
          const kind = ts(REF[m.pos], m.to) ? T2('transitie', 'transition') : T2('transversie', 'transversion');
          ex += tag(cx(ci), YD - 60, `${old} → ${nw}  (${REF[m.pos]}→${m.to}, ${kind})`, '#fff', 19, 'middle', sub(p, .3, .45));
          const oa = THREE[translate(rnaOf(old))], na = THREE[translate(rnaOf(nw))];
          if (step === 2) ex += effect(ci, `${oa} → ${na}: eiwit onveranderd`, `${oa} → ${na}: protein unchanged`, C.ok, sub(p, .55, .7));
          if (step === 3) {
            ex += effect(ci, `${oa} (−) → ${na} (hydrofoob)`, `${oa} (−) → ${na} (hydrophobic)`, C.danger, sub(p, .5, .65));
            const k = ease(sub(p, .6, .8));
            hb = `<g opacity="${f1(k)}"><rect x="${cx(ci) - 260}" y="${YA + 96}" width="520" height="60" rx="16" fill="rgba(155,123,255,.10)" stroke="${C.prot}" stroke-width="2"/>` +
              txt(cx(ci), YA + 133, T2('HbS polymeriseert → sikkelcellen', 'HbS polymerises → sickle cells'), C.text, 20) + '</g>';
            place('mu-hba', cx(ci), YA + 160);
          }
          if (step === 4) {
            ex += effect(ci, `${oa} → STOP (UAG)`, `${oa} → STOP (UAG)`, C.danger, sub(p, .55, .7));
            ex += tag(cx(ci + 3), YA + 110, T2('rest van de keten (tot codon 146) wordt niet gemaakt', 'rest of the chain (up to codon 146) is not made'), C.muted, 16, 'middle', sub(p, .7, .85));
          }
        } else if (step === 5) {
          r = rows(withSub(REF, MUT.nonsense), { mark: new Set([17]), dim: () => .3 });
          // NMD-cartoon: mRNA met 3 exonen (HBB) en EJC's
          const Y = 700, x0 = 640, e1 = 900, e2 = 1330, x1 = 1680;
          const k = ease(sub(p, .0, .15)), kR = sub(p, .2, .5), kU = ease(sub(p, .5, .65)), kD = ease(sub(p, .72, .95));
          nm += `<g opacity="${f1(k)}">`;
          nm += `<g opacity="${f1(1 - kD * .85)}">`;
          nm += seg(x0, Y, e1, Y, C.rna, 12) + seg(e1, Y, e2, Y, '#ffb27a', 12) + seg(e2, Y, x1, Y, C.rna, 12);
          nm += `<circle cx="${x0 - 22}" cy="${Y}" r="21" fill="${C.cap}"/>` + txt(x0 - 22, Y + 5, 'm⁷G', '#3a1a05', 14, 'middle', 700);
          nm += txt(x1 + 10, Y + 5, 'AAAA…', C.rna, 15, 'start', 700, 'JetBrains Mono');
          nm += txt((x0 + e1) / 2 + 30, Y + 48, 'exon 1', C.muted, 17) + txt((e1 + e2) / 2, Y + 48, 'exon 2', C.muted, 17) + txt((e2 + x1) / 2, Y + 48, 'exon 3', C.muted, 17);
          // EJC's (~20–24 nt stroomopwaarts van elke junctie)
          for (const j of [e1, e2]) nm += `<g><rect x="${j - 52}" y="${Y - 48}" width="48" height="30" rx="8" fill="#e0708f"/>${txt(j - 28, Y - 28, 'EJC', '#fff', 15, 'middle', 700)}</g>`;
          // stopcodon (PTC) in exon 1
          const ptc = x0 + 150;
          nm += `<g transform="translate(${ptc} ${Y})"><path d="M-10,-24 L10,-24 L24,-10 L24,10 L10,24 L-10,24 L-24,10 L-24,-10Z" fill="${C.danger}"/>${txt(0, 5, 'UAG', '#fff', 13, 'middle', 700)}</g>`;
          // ribosoom
          const rx = lerp(x0 + 20, ptc, clamp(kR * 1.4));
          nm += `<g opacity="${f1(1 - kD)}"><ellipse cx="${f1(rx)}" cy="${Y - 30}" rx="44" ry="26" fill="${C.rrna}" fill-opacity=".35" stroke="${C.rrna}" stroke-width="3"/><ellipse cx="${f1(rx)}" cy="${Y + 22}" rx="34" ry="16" fill="${C.rrna}" fill-opacity=".35" stroke="${C.rrna}" stroke-width="3"/></g>`;
          nm += `<g opacity="${f1(kU * (1 - kD))}"><rect x="${ptc - 38}" y="${Y - 114}" width="76" height="34" rx="10" fill="${C.prot2}"/>${txt(ptc, Y - 91, 'UPF1', '#fff', 17, 'middle', 700)}</g>`;
          nm += `<g opacity="${f1(kU * (1 - kD))}">${seg(ptc + 34, Y - 94, e2 - 60, Y - 50, C.prot2, 3, 1, 'stroke-dasharray="6 5"')}</g>`;
          nm += '</g>';
          nm += tag(1160, Y - 140, T2('stop in exon 1: ver vóór de laatste exon-exonovergang', 'stop in exon 1: far upstream of the last exon–exon junction'), C.text, 18, 'middle', sub(p, .3, .45));
          nm += tag(1160, Y + 100, T2('→ mRNA wordt afgebroken: weinig of geen afgeknot eiwit', '→ mRNA is degraded: little or no truncated protein'), C.danger, 18, 'middle', kD);
          nm += '</g>';
          place('mu-nmda', 1160, Y + 116);
        } else if (step === 6) {
          const kI = ease(sub(p, .08, .25));
          const kRe = sub(p, .3, .85);
          const nRe = Math.floor(kRe * (NC - 9 + 1));   // codons ≥ 9 die al opnieuw gelezen zijn
          const seq = kI < .5 ? REF : FS;
          r = rows(seq, { hl: new Set(kI > .5 ? [27] : []), dim: i => i < 9 ? 1 : (kI < .5 || i < 9 + nRe ? 1 : .15), ins: kI > .5 ? 27 : -1, insOp: kI });
          // codons ≥ 9 die nog niet opnieuw gelezen zijn: grijze sluier
          if (kI > .5) for (let i = 9 + nRe; i < NC; i++) r += `<rect x="${cx(i) - CW / 2 + 2}" y="${YD - 6}" width="${CW - 4}" height="${YA - YD + 40}" rx="8" fill="${C.bg}" opacity=".6"/>`;
          ex += tag(bx(27), YD - 60, T2('+ G (insertie)', '+ G (insertion)'), '#fff', 19, 'middle', kI);
          ex += arrow(cx(9) - 20, YA + 64, cx(16), YA + 64, C.danger, 4, sub(p, .35, .5)) + tag(cx(12.5), YA + 96, T2('nieuw leeskader → andere aminozuren', 'new reading frame → different amino acids'), C.danger, 18, 'middle', sub(p, .35, .5));
          ex += tag(cx(22) + 26, YA + 96, T2('vroeg stopcodon', 'premature stop'), C.danger, 18, 'end', sub(p, .85, .95));
          ex += tag(cx(6), YA + 96, T2('ongewijzigd', 'unchanged'), C.ok, 18, 'middle', sub(p, .35, .5));
        } else if (step === 7) {
          r = `<g opacity="${f1(lerp(1, .12, ease(sub(p, 0, .2))))}">${rows(FS, { hl: new Set([27]), ins: 27 })}</g>`;   // = eindbeeld stap 6, vervaagt
          const items = [
            [T2('replicatiefouten', 'replication errors'), T2('ontsnapt aan proeflezen + MMR', 'escaped proofreading + MMR'), C.prot],
            [T2('spontane schade', 'spontaneous damage'), T2('5-methyl-C → T (CpG)', '5-methyl-C → T (CpG)'), '#ffc247'],
            [T2('mutagenen', 'mutagens'), T2('UV, straling, chemicaliën', 'UV, radiation, chemicals'), C.danger],
          ];
          items.forEach(([a, b, col], i) => {
            const op = ease(sub(p, .05 + i * .15, .2 + i * .15)), x = 290 + i * 510, y = 630;
            ex += `<g opacity="${f1(op)}"><rect x="${x - 230}" y="${y - 62}" width="460" height="128" rx="18" fill="rgba(13,20,38,.85)" stroke="${col}" stroke-width="2.5"/>${txt(x, y - 12, a, col, 28, 'middle', 700)}${txt(x, y + 34, b, C.text, 23, 'middle', 500)}</g>`;
          });
          ex += tag(800, 770, T2('kiemcel → erfelijk · lichaamscel → o.a. kanker', 'germ cell → inherited · somatic cell → e.g. cancer'), C.text, 24, 'middle', sub(p, .6, .75));
          her = `<g opacity="${f1(sub(p, .7, .85))}"><rect x="825" y="812" width="260" height="56" rx="28" fill="rgba(127,220,106,.12)" stroke="${C.ok}" stroke-width="2"/>${txt(955, 848, T2('→ DNA-herstel', '→ DNA repair'), C.text, 23)}</g>`;
          rep = `<g opacity="${f1(sub(p, .7, .85))}"><rect x="515" y="812" width="260" height="56" rx="28" fill="rgba(155,123,255,.12)" stroke="${C.prot}" stroke-width="2"/>${txt(645, 848, T2('→ proeflezen', '→ proofreading'), C.text, 23)}</g>`;
          place('mu-hera', 955, 868); place('mu-repa', 645, 868);
        }
        if (step !== 3) place('mu-hba', -99, -99);
        if (step !== 5) place('mu-nmda', -99, -99);
        if (step !== 7) { place('mu-hera', -99, -99); place('mu-repa', -99, -99); }
        place('mu-coa', cx(step === 4 || step === 6 ? 12 : 1), YM - 30 - 0);
        $('mu-rows').innerHTML = r; $('mu-extra').innerHTML = ex; $('mu-hb').innerHTML = hb; $('mu-nmd').innerHTML = nm; $('mu-her').innerHTML = her; $('mu-rep').innerHTML = rep;
      },
    };
  },
};
