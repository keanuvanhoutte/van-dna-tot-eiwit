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
      text: { nl: 'Dit is de echte structuur van menselijk RPA70 met een stukje enkelstrengig DNA. Twee domeinen vormen samen een goot waarin de streng ligt.', en: 'This is the real structure of human RPA70 with a piece of single-stranded DNA. Two domains together form a channel in which the strand lies.' } },
    { dur: 9000, spin: .01, focus: { sel: DNA, style: { stick: { color: C.dna, radius: .35 } }, label: { nl: 'ssDNA: basen liggen bloot', en: 'ssDNA: bases exposed' } }, zoom: DNA,
      title: { nl: 'Waarom enkelstrengig DNA kwetsbaar is', en: 'Why single-stranded DNA is vulnerable' },
      text: { nl: 'Zonder partnerstreng liggen de basen bloot: cytosine verandert ~140× sneller in uracil dan in dubbelstrengig DNA, enzymen knippen de streng makkelijker en ze kan haarspelden vormen.', en: 'Without a partner strand the bases are exposed: cytosine turns into uracil ~140× faster than in double-stranded DNA, enzymes cut the strand more easily and it can form hairpins.' } },
    { dur: 8000, spin: .01, focus: [{ sel: A, style: { cartoon: { color: COL_A } }, label: { nl: 'DBD-A (OB-fold)', en: 'DBD-A (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: A,
      title: { nl: 'Bindingsdomein A: een OB-fold', en: 'Binding domain A: an OB fold' },
      text: { nl: 'Elk DNA-bindend domein heeft dezelfde vouw, een OB-fold: een vat van vijf β-strengen. De lussen van dat vat klemmen het DNA vast.', en: 'Each DNA-binding domain has the same fold, an OB fold: a barrel of five β-strands. The loops of that barrel clamp the DNA.' } },
    { dur: 8000, spin: .01, focus: [{ sel: B, style: { cartoon: { color: COL_B } }, label: { nl: 'DBD-B (OB-fold)', en: 'DBD-B (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: B,
      title: { nl: 'Bindingsdomein B: tweede OB-fold', en: 'Binding domain B: second OB fold' },
      text: { nl: 'Domein B ligt ernaast. Samen houden A en B ongeveer 8 nucleotiden stevig vast; de streng ligt gestrekt, met de basen naar het eiwit.', en: 'Domain B lies next to it. Together A and B hold about 8 nucleotides tightly; the strand lies extended, with its bases facing the protein.' } },
    { dur: 9000, spin: .008, focus: [{ sel: AROM, style: { stick: { color: '#ffc247', radius: .35 } }, label: { nl: 'Phe238 · Phe269 · Trp361 · Phe386', en: 'Phe238 · Phe269 · Trp361 · Phe386' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: { chain: 'B' },
      title: { nl: 'Aromatische ringen stapelen op de basen', en: 'Aromatic rings stack on the bases' },
      text: { nl: 'Platte ringen van fenylalanine en tryptofaan stapelen op de basen; andere zijketens vormen waterstofbruggen. Zo bindt RPA elke sequentie.', en: 'Flat rings of phenylalanine and tryptophan stack on the bases; other side chains form hydrogen bonds. This way RPA binds any sequence.' } },
    { dur: 9000, spin: .015, focus: null, zoom: {},
      title: { nl: 'RPA als signaal en overdrachtsplatform', en: 'RPA as a signal and hand-over platform' },
      text: { nl: 'Het volledige RPA (drie subeenheden) bedekt ~30 nucleotiden. Het roept de alarmkinase ATR op en geeft het DNA door aan enzymen voor replicatie of herstel.', en: 'Complete RPA (three subunits) covers ~30 nucleotides. It recruits the alarm kinase ATR and hands the DNA over to enzymes for replication or repair.' } },
  ],
  hotspots: [
    { node: 'replisoom', label: { nl: '↑ Replisoom (vork)', en: '↑ Replisome (fork)' }, color: C.prot },
    { node: 'herstel', label: { nl: 'DNA-herstel (NER, HR)', en: 'DNA repair (NER, HR)' }, color: C.ok },
    { node: 'telomeren', label: { nl: 'Telomeer-overhang (POT1)', en: 'Telomere overhang (POT1)' }, color: C.dna2 },
    { node: 'replicatie', label: { nl: '↑ Replicatie', en: '↑ Replication' }, color: C.dna },
  ],
});
