import { C, BASE, L, T2, svgOpen, txt, pill, nt, aa, cam, sub, ease, lerp, clamp, f1, translate, THREE, AACLASS, CLASSCOL } from '../../kit.js';
import { seg, pth, endl, prot, tag, arrow } from './_draw.js';
import { eiwit, ribosoom80S } from '../../bio.js';

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
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: { nl: 'DNA (coderende streng)', en: 'DNA (coding strand)' }, m: ['5′'], d: { nl: 'Bovenste rij: de DNA-letters van het begin van het gen voor hemoglobine, gelezen van 5′ naar 3′.', en: 'Top row: the DNA letters of the start of the gene for haemoglobin, read from 5′ to 3′.' },
      p: { nl: 'Coderende streng van HBB (β-globine), begin van de CDS (Ensembl ENST00000335295).', en: 'Coding strand of HBB (β-globin), start of the CDS (Ensembl ENST00000335295).' } },
    { c: C.text, t: 'codon', m: ['start', 'begin van het HBB-gen · 3 basen = 1 codon = 1 aminozuur', 'start of the HBB gene · 3 bases = 1 codon = 1 amino acid'], d: { nl: 'Elke groep van drie letters is een codon; het getal erboven is zijn nummer. Elk codon bepaalt één aminozuur.', en: 'Each group of three letters is a codon; the number above it is its number. Each codon specifies one amino acid.' },
      p: { nl: 'Tripletcodons, traditioneel genummerd (start-Met = 0); in HGVS-notatie telt de start-Met mee.', en: 'Triplet codons, numbered traditionally (start Met = 0); in HGVS notation the start Met is counted.' } },
    { c: C.rna, t: 'mRNA', d: { nl: 'Middelste rij: de RNA-kopie van het gen. Dezelfde letters, maar met U in plaats van T.', en: 'Middle row: the RNA copy of the gene. The same letters, but with U instead of T.' },
      p: { nl: 'Boodschapper-RNA, sequentie gelijk aan de coderende streng (U i.p.v. T); wordt in codons afgelezen.', en: 'Messenger RNA, sequence identical to the coding strand (U instead of T); read in codons.' } },
    { c: C.prot, t: { nl: 'eiwit (β-globine)', en: 'protein (β-globin)' }, m: ['N', 'Met', 'Val', 'His', 'Leu', 'Thr', 'Pro', 'Glu', 'Lys', 'Ser', 'Ala', 'Trp', 'Gly', 'Asn', 'Asp', 'Cys', 'Arg', 'Tyr', 'Gln'], d: { nl: 'Onderste rij: de aminozuren (afkorting van drie letters), in de kleur van hun soort. Ze vormen de eiwitketen van hemoglobine, beginnend bij N.', en: 'Bottom row: the amino acids (three-letter abbreviation), in the colour of their kind. They form the protein chain of haemoglobin, starting at N.' },
      p: { nl: 'β-globineketen vanaf de N-terminus, berekend met de standaard genetische code; kleur = eigenschap van de zijketen.', en: 'β-globin chain from the N-terminus, computed with the standard genetic code; colour = side-chain property.' } },
    { c: BASE.A, t: { nl: 'purines', en: 'purines' }, m: ['pyrimidines'], d: { nl: 'A en G zijn grote letters met twee ringen (purines); C en T zijn kleine met één ring (pyrimidines).', en: 'A and G are large letters with two rings (purines); C and T are small ones with one ring (pyrimidines).' },
      p: { nl: 'Purines (A, G) hebben een dubbele ring, pyrimidines (C, T) een enkele ring.', en: 'Purines (A, G) have a double ring, pyrimidines (C, T) a single ring.' } },
    { c: C.ok, t: { nl: 'transitie', en: 'transition' }, m: ['4 transities', '4 transitions', 'vaak bij ziekten: C→T bij CpG,', 'common in disease: C→T at CpG,', 'na deaminatie van gemethyleerd C', 'after deamination of methylated C'], d: { nl: 'Een letter wordt vervangen door een letter van hetzelfde soort (A↔G of C↔T). Een vaak voorkomende is C→T.', en: 'A letter is replaced by a letter of the same kind (A↔G or C↔T). A common one is C→T.' },
      p: { nl: 'Purine↔purine- of pyrimidine↔pyrimidinesubstitutie; C→T op CpG na deaminatie van 5-methylcytosine is een frequente ziekte-oorzaak.', en: 'Purine↔purine or pyrimidine↔pyrimidine substitution; C→T at CpG after deamination of 5-methylcytosine is a frequent cause of disease.' } },
    { c: '#ffc247', t: { nl: 'transversie', en: 'transversion' }, m: ['8 transversies', '8 transversions'], d: { nl: 'Een letter wordt vervangen door een letter van het andere soort (bv. A→T).', en: 'A letter is replaced by a letter of the other kind (e.g. A→T).' },
      p: { nl: 'Purine↔pyrimidinesubstitutie; er zijn 8 mogelijke transversies tegenover 4 transities.', en: 'Purine↔pyrimidine substitution; there are 8 possible transversions versus 4 transitions.' } },
    { c: C.ok, t: { nl: 'stille mutatie', en: 'silent mutation' }, m: ['CAT → CAC (T→C, transitie)', 'CAT → CAC (T→C, transition)', 'His → His: eiwit onveranderd', 'His → His: protein unchanged'], d: { nl: 'Een letter verandert, maar het nieuwe codon geeft hetzelfde aminozuur. Het eiwit blijft dus gelijk.', en: 'A letter changes, but the new codon gives the same amino acid. So the protein stays the same.' },
      p: { nl: 'Synonieme substitutie in codon 2 (CAT→CAC, His); een echte benigne variant (rs713040).', en: 'Synonymous substitution in codon 2 (CAT→CAC, His); a real benign variant (rs713040).' } },
    { c: C.danger, t: { nl: 'sikkelcelmutatie', en: 'sickle-cell mutation' }, m: ['GAG → GTG (A→T, transversie)', 'GAG → GTG (A→T, transversion)', 'Glu (−) → Val (hydrofoob)', 'Glu (−) → Val (hydrophobic)', 'HbS polymeriseert → sikkelcellen', 'HbS polymerises → sickle cells'], d: { nl: 'Eén letter geeft een ander aminozuur: een geladen glutamaat wordt een waterschuw valine. Bij weinig zuurstof klitten de hemoglobines dan aaneen en worden rode bloedcellen sikkelvormig.', en: 'One letter gives a different amino acid: a charged glutamate becomes a water-repelling valine. At low oxygen the haemoglobins then clump together and red blood cells become sickle-shaped.' },
      p: { nl: 'Missensemutatie in codon 6 (GAG→GTG, Glu6Val; HGVS p.Glu7Val): HbS polymeriseert in gedeoxygeneerde toestand.', en: 'Missense mutation in codon 6 (GAG→GTG, Glu6Val; HGVS p.Glu7Val): HbS polymerises when deoxygenated.' } },
    { c: C.danger, t: { nl: 'te vroeg stopteken', en: 'stop signal too early' }, m: ['Stop', 'AAG → TAG (A→T, transversie)', 'AAG → TAG (A→T, transversion)', 'Lys → STOP (UAG)', 'rest van de keten (tot codon 146) wordt niet gemaakt', 'rest of the chain (up to codon 146) is not made'], d: { nl: 'Eén letter maakt van een codon een stopteken (rode achthoek). Het eiwit zou veel te kort worden.', en: 'One letter turns a codon into a stop signal (red octagon). The protein would be far too short.' },
      p: { nl: 'Nonsensemutatie in codon 17 (AAG→TAG, Lys→stop), een oorzaak van β⁰-thalassemie.', en: 'Nonsense mutation in codon 17 (AAG→TAG, Lys→stop), a cause of β⁰ thalassaemia.' } },
    { c: C.cap, t: 'm⁷G', d: { nl: 'Het kapje aan het begin van het mRNA.', en: 'The cap at the start of the mRNA.' },
      p: { nl: '7-methylguanosinekap aan het 5′-uiteinde.', en: '7-methylguanosine cap at the 5′ end.' } },
    { c: '#ffb27a', t: 'exon 1', m: ['exon 2', 'exon 3'], d: { nl: 'Het mRNA van dit gen bestaat uit drie aaneengeplakte stukken (exons).', en: 'The mRNA of this gene consists of three joined pieces (exons).' },
      p: { nl: 'HBB heeft drie exons; na splicing ligt op elke exon-exonovergang een EJC.', en: 'HBB has three exons; after splicing an EJC sits at each exon–exon junction.' } },
    { c: '#e0708f', t: 'EJC', d: { nl: 'Een eiwitje dat achterblijft op elke naad tussen twee exons, als een merkteken.', en: 'A small protein left behind at each seam between two exons, as a marker.' },
      p: { nl: 'Exon-junctiecomplex, ≈ 20–24 nt stroomopwaarts van elke exon-exonovergang afgezet tijdens splicing.', en: 'Exon junction complex, deposited ≈ 20–24 nt upstream of each exon–exon junction during splicing.' } },
    { c: C.danger, t: 'UAG', m: ['stop in exon 1: ver vóór de laatste exon-exonovergang', 'stop in exon 1: far upstream of the last exon–exon junction'], d: { nl: 'Het te vroege stopteken op het mRNA. Het ligt in het eerste exon, ver vóór de laatste naad.', en: 'The premature stop signal on the mRNA. It lies in the first exon, far before the last seam.' },
      p: { nl: 'Premature terminatiecodon (PTC) ruim stroomopwaarts van de laatste exon-exonovergang: substraat voor NMD.', en: 'Premature termination codon (PTC) well upstream of the last exon–exon junction: substrate for NMD.' } },
    { c: C.prot2, t: 'UPF1', m: ['✂ in stukjes geknipt', '✂ cut into pieces', '→ mRNA wordt afgebroken: weinig of geen afgeknot eiwit', '→ mRNA is degraded: little or no truncated protein'], d: { nl: 'Het ribosoom stopt te vroeg terwijl er nog merktekens achter liggen. Een alarm-eiwit (UPF1) laat het mRNA dan in stukjes knippen.', en: 'The ribosome stops too early while markers still lie behind it. An alarm protein (UPF1) then has the mRNA cut into pieces.' },
      p: { nl: 'Kernfactor van nonsense-gemedieerd verval (NMD); bij een PTC vóór een EJC wordt het mRNA afgebroken en ontstaat weinig afgeknot eiwit.', en: 'Core factor of nonsense-mediated decay (NMD); with a PTC upstream of an EJC the mRNA is degraded and little truncated protein is made.' } },
    { c: C.rna, t: 'AAAA…', d: { nl: 'De staart van A’s aan het einde van het mRNA.', en: 'The tail of A’s at the end of the mRNA.' },
      p: { nl: 'Poly(A)-staart aan het 3′-uiteinde.', en: 'Poly(A) tail at the 3′ end.' } },
    { c: '#ffffff', t: { nl: '+ G (insertie)', en: '+ G (insertion)' }, m: ['nieuw leeskader → andere aminozuren', 'new reading frame → different amino acids', 'ongewijzigd', 'unchanged', 'vroeg stopcodon', 'premature stop'], d: { nl: 'Eén extra letter G verschuift de groepjes van drie. Vóór de G blijft alles gelijk; erna veranderen alle aminozuren, tot er een stopteken komt.', en: 'One extra letter G shifts the groups of three. Before the G everything stays the same; after it all amino acids change, until a stop signal appears.' },
      p: { nl: 'Leeskaderverschuiving door insertie tussen codon 8 en 9 (c.27_28insG, p.Ser10Valfs*14), een oorzaak van β⁰-thalassemie.', en: 'Frameshift by insertion between codons 8 and 9 (c.27_28insG, p.Ser10Valfs*14), a cause of β⁰ thalassaemia.' } },
    { c: C.prot, t: { nl: 'replicatiefouten', en: 'replication errors' }, m: ['ontsnapt aan proeflezen + MMR', 'escaped proofreading + MMR'], d: { nl: 'Fouten bij het kopiëren van DNA die niet verbeterd werden.', en: 'Errors in copying DNA that were not corrected.' },
      p: { nl: 'Inbouwfouten die ontsnappen aan proeflezen door de polymerase en aan mismatch-herstel.', en: 'Misincorporations that escape polymerase proofreading and mismatch repair.' } },
    { c: '#ffc247', t: { nl: 'spontane schade', en: 'spontaneous damage' }, m: ['5-methyl-C → T (CpG)'], d: { nl: 'DNA verandert soms vanzelf; zo kan een C met een merkteken in een T veranderen.', en: 'DNA sometimes changes by itself; for example, a C carrying a mark can turn into a T.' },
      p: { nl: 'Spontane deaminatie van 5-methylcytosine tot thymine op CpG-plaatsen.', en: 'Spontaneous deamination of 5-methylcytosine to thymine at CpG sites.' } },
    { c: C.danger, t: { nl: 'mutagenen', en: 'mutagens' }, m: ['UV, straling, chemicaliën', 'UV, radiation, chemicals', 'kiemcel → erfelijk · lichaamscel → o.a. kanker', 'germ cell → inherited · somatic cell → e.g. cancer'], d: { nl: 'UV-licht, straling en sommige stoffen beschadigen DNA. Een mutatie in een ei- of zaadcel wordt doorgegeven; in een lichaamscel kan ze o.a. kanker geven.', en: 'UV light, radiation and some substances damage DNA. A mutation in an egg or sperm cell is passed on; in a body cell it can cause cancer, among other things.' },
      p: { nl: 'Exogene mutagenen; kiembaanmutaties zijn erfelijk, somatische mutaties dragen bij aan o.a. kanker.', en: 'Exogenous mutagens; germline mutations are heritable, somatic mutations contribute to cancer among other conditions.' } },
  ],
  steps: [
    S(8000, cam(520, 400, 1150), 'Van gen naar eiwit', 'From gene to protein',
      'Dit is het begin van een gen voor hemoglobine. Elke drie basen (een codon) bepalen één aminozuur.',
      'This is the start of a gene for haemoglobin. Every three bases (a codon) specify one amino acid.'),
    S(8000, cam(620, 560, 1300), 'Eén base wordt vervangen', 'One base is swapped',
      'Bij een puntmutatie verandert één base. Soms in een base van hetzelfde type, soms in een ander type.',
      'In a point mutation one base changes. Sometimes into a base of the same type, sometimes into another type.'),
    S(8000, cam(330, 430, 900), 'Een stille mutatie', 'A silent mutation',
      'CAT wordt CAC, maar beide codons geven histidine. Het eiwit verandert dus niet.',
      'CAT becomes CAC, but both codons give histidine. So the protein does not change.'),
    S(9000, cam(560, 470, 1050), 'Eén ander aminozuur: sikkelcel', 'One different amino acid: sickle cell',
      'GAG wordt GTG: glutamaat wordt valine. Bij weinig zuurstof klitten de hemoglobines dan aaneen tot vezels.',
      'GAG becomes GTG: glutamate becomes valine. At low oxygen the haemoglobins then clump into fibres.'),
    S(8000, cam(1180, 470, 1150), 'Een te vroeg stopteken', 'A stop signal too early',
      'AAG wordt TAG: het codon voor lysine wordt een stopcodon. Het eiwit zou veel te kort worden.',
      'AAG becomes TAG: the codon for lysine becomes a stop codon. The protein would be far too short.'),
    S(9000, cam(1164, 700, 1164), 'De cel ruimt het foute mRNA op', 'The cell destroys the faulty mRNA',
      'Ligt het stopcodon ruim vóór de laatste naad tussen twee exons, dan breekt de cel het mRNA meestal af.',
      'If the stop codon lies well before the last junction between two exons, the cell usually breaks the mRNA down.'),
    S(10000, cam(1132, 430, 1250), 'Eén base erbij: alles verschuift', 'One extra base: everything shifts',
      'Eén extra G verschuift de indeling in groepjes van drie. Alle codons erna veranderen, tot er een stopcodon komt.',
      'One extra G shifts the grouping into threes. All codons after it change, until a stop codon appears.'),
    S(8000, cam(800, 650, 1500), 'Waar komen mutaties vandaan?', 'Where do mutations come from?',
      'Uit kopieerfouten die niet verbeterd worden, en uit DNA-schade die niet goed hersteld wordt.',
      'From copying errors that are not corrected, and from DNA damage that is not repaired properly.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="mu-rows"></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${T2('Genetische code', 'Genetic code')}"><rect x="${X0}" y="${YM - 6}" width="${NC * CW}" height="${BH + 12}" fill="transparent"/><circle id="mu-coa" data-anchor="codon" data-pos="below" cx="${cx(1)}" cy="${YM + BH + 6}" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="${C.prot}" data-label="${T2('Aminozuren', 'Amino acids')}"><rect x="${X0}" y="${YA - 30}" width="${NC * CW}" height="60" fill="transparent"/><circle id="mu-aaa" data-anchor="aminozuren" cx="${cx(6)}" cy="${YA - 30}" r="1" fill="none"/></g>
    <g id="mu-extra"></g>
    <g data-node="quaternair" data-color="${C.prot}" data-label="${T2('Hemoglobine (quaternaire structuur)', 'Haemoglobin (quaternary structure)')}"><g id="mu-hb"></g><circle id="mu-hba" data-anchor="quaternair" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="nmd" data-color="${C.rna}" data-label="${T2('NMD in detail', 'NMD in detail')}"><g id="mu-nmd"></g><circle id="mu-nmda" data-anchor="nmd" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="ribosoom" data-nolabel data-color="${C.rrna}"><g id="mu-rib"></g></g>
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
      s += txt(X0 - 14, YD + 18, "5′", C.dna, 16, 'end', 700, 'JetBrains Mono') + txt(X0 - 14, YM + 18, "5′", C.rna, 16, 'end', 700, 'JetBrains Mono');
      s += txt(X0 - 14, YA + 6, 'N', C.prot, 16, 'end', 700, 'JetBrains Mono');
      return s;
    }
    const rowLabels = op => `<g opacity="${f1(op)}">` + txt(X0, YD - 50, T2('DNA (coderende streng)', 'DNA (coding strand)'), C.dna, 17, 'start', 700) +
      txt(X0, YM + BH + 26, 'mRNA', C.rna, 17, 'start', 700) + txt(X0, YA + 52, T2('eiwit (β-globine)', 'protein (β-globin)'), C.prot, 17, 'start', 700) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        let r = '', ex = '', hb = '', nm = '', her = '', rep = '', rib = '';
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
            ex += tag(780, 770, T2('vaak bij ziekten: C→T bij CpG,', 'common in disease: C→T at CpG,'), C.muted, 16, 'start', sub(p, .75, .9)) + tag(780, 796, T2('na deaminatie van gemethyleerd C', 'after deamination of methylated C'), C.muted, 16, 'start', sub(p, .75, .9));
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
            ex += tag(cx(NC - 1) + CW / 2 - 6, YA + 110, T2('rest van de keten (tot codon 146) wordt niet gemaakt', 'rest of the chain (up to codon 146) is not made'), C.muted, 16, 'end', sub(p, .7, .85));   // rechts uitgelijnd: binnen beeld
          }
        } else if (step === 5) {
          r = rows(withSub(REF, MUT.nonsense), { mark: new Set([17]), dim: () => .3 });
          // NMD-cartoon: mRNA met 3 exonen (HBB) en EJC's
          const Y = 700, x0 = 640, e1 = 900, e2 = 1330, x1 = 1680;
          const k = ease(sub(p, .0, .15)), kR = sub(p, .2, .5), kU = ease(sub(p, .5, .65)), kD = ease(sub(p, .72, .95));
          nm += `<g opacity="${f1(k)}">`;
          nm += `<g opacity="${f1(1 - kD * .85)}">`;
          if (kD < .01) nm += seg(x0, Y, e1, Y, C.rna, 12) + seg(e1, Y, e2, Y, '#ffb27a', 12) + seg(e2, Y, x1, Y, C.rna, 12);
          nm += `<circle cx="${x0 - 22}" cy="${Y}" r="21" fill="${C.cap}"/>` + txt(x0 - 22, Y + 5, 'm⁷G', '#3a1a05', 14, 'middle', 700);
          nm += txt(x1 + 10, Y + 5, 'AAAA…', C.rna, 15, 'start', 700, 'JetBrains Mono');
          nm += txt(e1 - 38, Y + 48, 'exon 1', C.muted, 17) + txt((e1 + e2) / 2, Y + 48, 'exon 2', C.muted, 17) + txt((e2 + x1) / 2, Y + 48, 'exon 3', C.muted, 17);
          // EJC's (~20–24 nt stroomopwaarts van elke junctie)
          for (const j of [e1, e2]) nm += eiwit(j - 28, Y - 30, 30, 18, '#e0708f', { seed: j % 7 + 2, label: 'EJC', fs: 15 });
          // stopcodon (PTC) in exon 1
          const ptc = x0 + 150;
          nm += `<g transform="translate(${ptc} ${Y})"><path d="M-10,-24 L10,-24 L24,-10 L24,10 L10,24 L-10,24 L-24,10 L-24,-10Z" fill="${C.danger}"/>${txt(0, 5, 'UAG', '#fff', 13, 'middle', 700)}</g>`;
          // ribosoom
          const rx = lerp(x0 + 60, ptc, clamp(kR * 1.4));
          { const rb = ribosoom80S(rx, Y - 140 * .42, { s: .42, mrna: false, tRNAs: 1, grootBoven: true });   // zoals in translatie en nmd: 60S boven, 40S onder het mRNA
            rib = `<g opacity="${f1(k * (1 - kD * .85) * (1 - kD))}">${rb.svg}</g>`; }
          nm += eiwit(ptc, Y - 97, 44, 20, C.prot2, { seed: 11, label: 'UPF1', fs: 17, op: kU * (1 - kD) });
          nm += `<g opacity="${f1(kU * (1 - kD))}">${seg(ptc + 34, Y - 94, e2 - 60, Y - 50, C.prot2, 3, 1, 'stroke-dasharray="6 5"')}</g>`;
          nm += '</g>';
          // afbraak: het mRNA valt zichtbaar in stukjes uiteen (blijft goed te zien)
          if (kD >= .01) {
            const n = 10, L0 = (x1 - x0) / n;
            for (let q = 0; q < n; q++) {
              const a0 = x0 + q * L0, mid = a0 + L0 / 2, half = L0 / 2 * (1 - .55 * kD), dy = ((q * 37) % 5 - 2) * 9 * kD, col = mid > e1 && mid < e2 ? '#ffb27a' : C.rna;
              nm += seg(mid - half, Y + dy, mid + half, Y + dy, col, 12, 1 - .35 * kD);
            }
            nm += `<g opacity="${f1(sub(p, .72, .8))}">` + txt(1160, Y - 60, T2('✂ in stukjes geknipt', '✂ cut into pieces'), C.danger, 24, 'middle', 800) + '</g>';
          }
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
          ex += tag(cx(7), YA + 96, T2('ongewijzigd', 'unchanged'), C.ok, 18, 'middle', sub(p, .35, .5));
        } else if (step === 7) {
          r = `<g opacity="${f1(lerp(1, .12, ease(sub(p, 0, .06))))}">${rows(FS, { hl: new Set([27]), ins: 27 })}</g>`;   // = eindbeeld stap 6, vervaagt
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
        place('mu-coa', cx(step === 4 || step === 6 ? 12 : 2), YM + BH + 6);   // niet op het label 'mRNA' links   // onder de mRNA-rij (pos below), niet tussen DNA en mRNA
        $('mu-rows').innerHTML = r; $('mu-extra').innerHTML = ex; $('mu-hb').innerHTML = hb; $('mu-nmd').innerHTML = nm; $('mu-her').innerHTML = her; $('mu-rep').innerHTML = rep; $('mu-rib').innerHTML = rib;
      },
    };
  },
};
