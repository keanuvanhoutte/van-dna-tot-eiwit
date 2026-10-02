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
      title: { nl: 'RPA houdt een losse DNA-streng vast', en: 'RPA holds a single DNA strand' },
      text: { nl: 'Een deel van het echte menselijke eiwit RPA, met een losse DNA-streng. De streng ligt in een goot van het eiwit.', en: 'Part of the real human protein RPA, with a single DNA strand. The strand lies in a groove of the protein.' } },
    { dur: 9000, spin: .01, focus: { sel: DNA, style: { stick: { color: C.dna, radius: .35 } }, label: { nl: 'ssDNA: basen liggen bloot', en: 'ssDNA: bases exposed' } }, zoom: DNA,
      title: { nl: 'Een losse streng is kwetsbaar', en: 'A single strand is vulnerable' },
      text: { nl: 'Zonder partner liggen de basen bloot. Ze raken sneller beschadigd en enzymen knippen de streng makkelijker.', en: 'Without a partner the bases are exposed. They get damaged faster and enzymes cut the strand more easily.' } },
    { dur: 8000, spin: .01, focus: [{ sel: A, style: { cartoon: { color: COL_A } }, label: { nl: 'DBD-A (OB-fold)', en: 'DBD-A (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: A,
      title: { nl: 'Het eerste grijpdeel', en: 'The first gripping part' },
      text: { nl: 'Dit deel van RPA is gevouwen als een klein vat. De lussen van dat vat klemmen het DNA vast.', en: 'This part of RPA is folded like a small barrel. The loops of that barrel clamp the DNA.' } },
    { dur: 8000, spin: .01, focus: [{ sel: B, style: { cartoon: { color: COL_B } }, label: { nl: 'DBD-B (OB-fold)', en: 'DBD-B (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: B,
      title: { nl: 'Het tweede grijpdeel', en: 'The second gripping part' },
      text: { nl: 'Een tweede deel met dezelfde vouw ligt ernaast. Samen houden ze een stukje van ongeveer 8 basen stevig vast.', en: 'A second part with the same fold lies next to it. Together they hold a stretch of about 8 bases tightly.' } },
    { dur: 9000, spin: .008, focus: [{ sel: AROM, style: { stick: { color: '#ffc247', radius: .35 } }, label: { nl: 'Phe238 · Phe269 · Trp361 · Phe386', en: 'Phe238 · Phe269 · Trp361 · Phe386' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: { chain: 'B' },
      title: { nl: 'Platte ringen grijpen de basen', en: 'Flat rings grip the bases' },
      text: { nl: 'Platte ringen van enkele aminozuren stapelen op de basen. Zo kan RPA elke DNA-volgorde vasthouden.', en: 'Flat rings of a few amino acids stack on the bases. This lets RPA hold any DNA sequence.' } },
    { dur: 9000, spin: .015, focus: null, zoom: {},
      title: { nl: 'RPA slaat alarm en geeft door', en: 'RPA raises the alarm and hands over' },
      text: { nl: 'Het volledige RPA bedekt zo’n 30 basen. Het roept een alarmeiwit op en geeft het DNA door aan andere enzymen.', en: 'Complete RPA covers about 30 bases. It calls in an alarm protein and hands the DNA on to other enzymes.' } },
  ],
  hotspots: [
    { node: 'replisoom', label: { nl: '↑ Replisoom (vork)', en: '↑ Replisome (fork)' }, color: C.prot },
    { node: 'herstel', label: { nl: 'DNA-herstel (NER, HR)', en: 'DNA repair (NER, HR)' }, color: C.ok },
    { node: 'telomeren', label: { nl: 'Telomeer-overhang (POT1)', en: 'Telomere overhang (POT1)' }, color: C.dna2 },
    { node: 'replicatie', label: { nl: '↑ Replicatie', en: '↑ Replication' }, color: C.dna },
  ],
});
