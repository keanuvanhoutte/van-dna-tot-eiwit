import { C } from '../../kit.js';
import { structure3d } from '../../kit3d.js';

/*
 * Enkelstrengig DNA gebonden door RPA: PDB 1JMC (Bochkarev et al. 1997, Nature 385:176).
 * Humaan RPA70, residuen 181–422 (de twee ssDNA-bindende OB-folds DBD-A en DBD-B) + dC8 (keten B).
 * Grenzen van de domeinen (≈): DBD-A 181–290, DBD-B 300–422 (keten A bevat 183–420).
 * Aromatische residuen die op de basen stapelen: Phe238, Phe269 (DBD-A), Trp361, Phe386 (DBD-B).
 */
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const A = { chain: 'A', resi: range(181, 292) }, B = { chain: 'A', resi: range(298, 422) };
const DNA = { chain: 'B' };
const AROM = { chain: 'A', resi: [238, 269, 361, 386] };
const COL_A = '#9b7bff', COL_B = '#5fd3e6';

export default structure3d({
  id: 'ssdna', pdb: '1JMC', format: 'pdb',
  title: { nl: 'Enkelstrengig DNA & RPA', en: 'Single-stranded DNA & RPA' },
  scale: '≈ 5 nm',
  time: { nl: 'RPA bindt in milliseconden en schuift dynamisch', en: 'RPA binds within milliseconds and moves dynamically' },
  org: { nl: 'mens (RPA70, kristalstructuur 2,4 Å)', en: 'human (RPA70, crystal structure 2.4 Å)' },
  legend: [[COL_A, 'DBD-A (OB-fold)'], [COL_B, 'DBD-B (OB-fold)'], [C.dna, { nl: 'ssDNA (8 × C)', en: 'ssDNA (8 × C)' }], ['#ffc247', { nl: 'aromatische residuen', en: 'aromatic residues' }]],
  simplified: {
    nl: 'Getoond is enkel het DNA-bindende middenstuk van RPA70 met een kort oligo (dC8). Het volledige RPA is een heterotrimeer (RPA70, RPA32, RPA14) met meer DNA-bindende domeinen (o.a. DBD-C) en bedekt ongeveer 30 nt; het bindt dynamisch en kan langs het DNA verschuiven. In de cel is het ssDNA willekeurig van sequentie.',
    en: 'Only the DNA-binding core of RPA70 with a short oligo (dC8) is shown. Full RPA is a heterotrimer (RPA70, RPA32, RPA14) with more DNA-binding domains (e.g. DBD-C) and covers about 30 nt; it binds dynamically and can slide along the DNA. In the cell the ssDNA has any sequence.' },
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Bron van de structuur: Bochkarev et al. (1997) Nature 385:176–181, PDB 1JMC. Draai zelf met de muis.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Structure source: Bochkarev et al. (1997) Nature 385:176–181, PDB 1JMC. Rotate it yourself with the mouse.</p>' },
  base: [
    { sel: { chain: 'A' }, style: { cartoon: { color: '#8a93a8' } } },
    { sel: A, style: { cartoon: { color: COL_A } } },
    { sel: B, style: { cartoon: { color: COL_B } } },
    { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } },
  ],
  steps: [
    { dur: 8000, spin: .012, focus: null,
      title: { nl: 'RPA grijpt enkelstrengig DNA', en: 'RPA grips single-stranded DNA' },
      text: { nl: 'Echte structuur van humaan RPA70 met een stukje ssDNA. Twee domeinen vormen samen een goot waarin de streng ligt.', en: 'Real structure of human RPA70 with a piece of ssDNA. Two domains together form a channel in which the strand lies.' } },
    { dur: 9000, spin: .01, focus: { sel: DNA, style: { stick: { color: C.dna, radius: .35 } }, label: { nl: 'ssDNA: basen liggen bloot', en: 'ssDNA: bases exposed' } }, zoom: DNA,
      title: { nl: 'Waarom ssDNA kwetsbaar is', en: 'Why ssDNA is vulnerable' },
      text: { nl: 'Zonder partnerstreng liggen de basen bloot: cytosine deamineert ~140× sneller dan in dsDNA, nucleasen knippen en de streng kan haarspelden vormen.', en: 'Without a partner strand the bases are exposed: cytosine deaminates ~140× faster than in dsDNA, nucleases cut and the strand can fold into hairpins.' } },
    { dur: 8000, spin: .01, focus: [{ sel: A, style: { cartoon: { color: COL_A } }, label: { nl: 'DBD-A (OB-fold)', en: 'DBD-A (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: A,
      title: { nl: 'DBD-A: een OB-fold', en: 'DBD-A: an OB fold' },
      text: { nl: 'Elk DNA-bindend domein is een OB-fold: een β-vat van vijf strengen waarvan de lussen het DNA omklemmen.', en: 'Each DNA-binding domain is an OB fold: a five-stranded β-barrel whose loops clamp the DNA.' } },
    { dur: 8000, spin: .01, focus: [{ sel: B, style: { cartoon: { color: COL_B } }, label: { nl: 'DBD-B (OB-fold)', en: 'DBD-B (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: B,
      title: { nl: 'DBD-B: tweede OB-fold', en: 'DBD-B: second OB fold' },
      text: { nl: 'DBD-B ligt ernaast; samen binden A en B ongeveer 8 nucleotiden met hoge affiniteit. De streng ligt uitgestrekt, de basen wijzen naar het eiwit.', en: 'DBD-B lies next to it; together A and B bind about 8 nucleotides with high affinity. The strand is extended, with the bases pointing towards the protein.' } },
    { dur: 9000, spin: .008, focus: [{ sel: AROM, style: { stick: { color: '#ffc247', radius: .35 } }, label: { nl: 'Phe238 · Phe269 · Trp361 · Phe386', en: 'Phe238 · Phe269 · Trp361 · Phe386' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: { chain: 'B' },
      title: { nl: 'Aromatische ringen stapelen op de basen', en: 'Aromatic rings stack on the bases' },
      text: { nl: 'Fenylalanine- en tryptofaanringen stapelen op de basen; daarnaast maken polaire zijketens H-bruggen. Dit werkt ongeacht de sequentie.', en: 'Phenylalanine and tryptophan rings stack on the bases; in addition, polar side chains form H-bonds. This works regardless of sequence.' } },
    { dur: 9000, spin: .015, focus: null, zoom: {},
      title: { nl: 'RPA als signaal en overdrachtsplatform', en: 'RPA as a signal and hand-over platform' },
      text: { nl: 'Het RPA-heterotrimeer bedekt ~30 nt. RPA-ssDNA rekruteert ATR (checkpoint) en geeft het DNA door aan Pol α-primase, NER-factoren of RAD51.', en: 'The RPA heterotrimer covers ~30 nt. RPA–ssDNA recruits ATR (checkpoint) and hands the DNA over to Pol α-primase, NER factors or RAD51.' } },
  ],
  hotspots: [
    { node: 'replisoom', label: { nl: '↑ Replisoom (vork)', en: '↑ Replisome (fork)' }, color: C.prot },
    { node: 'herstel', label: { nl: 'DNA-herstel (NER, HR)', en: 'DNA repair (NER, HR)' }, color: C.ok },
    { node: 'telomeren', label: { nl: 'Telomeer-overhang (POT1)', en: 'Telomere overhang (POT1)' }, color: C.dna2 },
    { node: 'replicatie', label: { nl: '↑ Replicatie', en: '↑ Replication' }, color: C.dna },
  ],
});
