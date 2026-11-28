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
  time: { nl: 'RPA bindt sterk, maar wordt snel uitgewisseld en kan verschuiven', en: 'RPA binds tightly, but is rapidly exchanged and can slide' },
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
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: '#8a93a8', t: 'RPA', m: ['RPA: twee grijpdelen', 'RPA: two gripping parts'], d: { nl: 'Een eiwit dat losse DNA-strengen bedekt en beschermt. Hier zie je het middenstuk met twee grijpdelen.', en: 'A protein that covers and protects single DNA strands. Here you see its middle part with two gripping parts.' },
      p: { nl: 'Replicatieproteïne A, een heterotrimeer (RPA70, RPA32, RPA14); getoond is het ssDNA-bindende middenstuk van RPA70 (res. 181–422).', en: 'Replication protein A, a heterotrimer (RPA70, RPA32, RPA14); shown is the ssDNA-binding core of RPA70 (res. 181–422).' } },
    { c: COL_A, t: { nl: 'DBD-A (OB-fold)', en: 'DBD-A (OB fold)' }, m: ['DBD-A (OB-fold)'], d: { nl: 'Het eerste grijpdeel (paars), gevouwen als een klein vat. Zijn lussen klemmen het DNA vast.', en: 'The first gripping part (purple), folded like a small barrel. Its loops clamp the DNA.' },
      p: { nl: 'DNA-bindend domein A, een OB-fold (β-barrel); lussen van de barrel omsluiten het ssDNA.', en: 'DNA-binding domain A, an OB fold (β-barrel); loops of the barrel wrap around the ssDNA.' } },
    { c: COL_B, t: { nl: 'DBD-B (OB-fold)', en: 'DBD-B (OB fold)' }, m: ['DBD-B (OB-fold)'], d: { nl: 'Het tweede grijpdeel (turquoise), met dezelfde vatvorm. Samen houden de twee delen zo’n 8 basen vast.', en: 'The second gripping part (turquoise), with the same barrel shape. Together the two parts hold about 8 bases.' },
      p: { nl: 'DNA-bindend domein B, een tweede OB-fold; DBD-A en DBD-B binden samen ≈ 8 nt.', en: 'DNA-binding domain B, a second OB fold; DBD-A and DBD-B together bind ≈ 8 nt.' } },
    { c: C.dna, t: { nl: 'losse DNA-streng', en: 'single DNA strand' }, m: ['ssDNA: basen liggen bloot', 'ssDNA: bases exposed'], d: { nl: 'Eén DNA-streng zonder partner (8 letters C). De basen liggen bloot en raken zo sneller beschadigd.', en: 'One DNA strand without a partner (8 letters C). The bases are exposed and so get damaged more easily.' },
      p: { nl: 'Enkelstrengig oligo dC8 in de bindingsgoot; blootgestelde basen zijn gevoelig voor schade en nucleasen.', en: 'Single-stranded oligo dC8 in the binding groove; exposed bases are vulnerable to damage and nucleases.' } },
    { c: '#ffc247', t: 'Phe238 · Phe269 · Trp361 · Phe386', d: { nl: 'Vier bouwstenen van RPA met een platte ring (geel). Ze stapelen op de basen, zodat RPA elke DNA-volgorde kan vasthouden.', en: 'Four building blocks of RPA with a flat ring (yellow). They stack on the bases, so RPA can hold any DNA sequence.' },
      p: { nl: 'Aromatische residuen die stapelinteracties met de basen aangaan; de binding is daardoor sequentie-onafhankelijk.', en: 'Aromatic residues making stacking interactions with the bases; binding is therefore sequence-independent.' } },
  ],
  steps: [
    { dur: 8000, spin: .012, focus: null, tags: [{ sel: { chain: 'A' }, label: { nl: 'RPA: twee grijpdelen', en: 'RPA: two gripping parts' } }, { sel: { chain: 'B' }, label: { nl: 'losse DNA-streng', en: 'single DNA strand' }, labelColor: C.dna }],
      title: { nl: 'RPA houdt een losse DNA-streng vast', en: 'RPA holds a single DNA strand' },
      text: { nl: 'Een deel van het echte menselijke eiwit RPA, met een losse DNA-streng. De streng ligt in een goot van het eiwit.', en: 'Part of the real human protein RPA, with a single DNA strand. The strand lies in a groove of the protein.' } },
    { dur: 9000, spin: .01, focus: { sel: DNA, style: { stick: { color: C.dna, radius: .35 } }, label: { nl: 'ssDNA: basen liggen bloot', en: 'ssDNA: bases exposed' }, labelColor: C.dna, labelOff: [170, 90] }, zoom: DNA, pad: 1,
      title: { nl: 'Een losse streng is kwetsbaar', en: 'A single strand is vulnerable' },
      text: { nl: 'Zonder partner liggen de basen bloot. Ze raken sneller beschadigd en enzymen knippen de streng makkelijker.', en: 'Without a partner the bases are exposed. They get damaged faster and enzymes cut the strand more easily.' } },
    { dur: 8000, spin: .01, focus: [{ sel: A, style: { cartoon: { color: COL_A } }, label: { nl: 'DBD-A (OB-fold)', en: 'DBD-A (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: A,
      title: { nl: 'Het eerste grijpdeel', en: 'The first gripping part' },
      text: { nl: 'Dit deel van RPA is gevouwen als een klein vat. De lussen van dat vat klemmen het DNA vast.', en: 'This part of RPA is folded like a small barrel. The loops of that barrel clamp the DNA.' } },
    { dur: 8000, spin: .01, focus: [{ sel: B, style: { cartoon: { color: COL_B } }, label: { nl: 'DBD-B (OB-fold)', en: 'DBD-B (OB fold)' } }, { sel: DNA, style: { stick: { color: C.dna, radius: .3 } } }], zoom: B,
      title: { nl: 'Het tweede grijpdeel', en: 'The second gripping part' },
      text: { nl: 'Een tweede deel met dezelfde vouw ligt ernaast. Samen houden ze een stukje van ongeveer 8 basen stevig vast.', en: 'A second part with the same fold lies next to it. Together they hold a stretch of about 8 bases tightly.' } },
    { dur: 9000, spin: .008, focus: [{ sel: { ...AROM, atom: ['CA', 'CB', 'CG', 'CD1', 'CD2', 'CE1', 'CE2', 'CE3', 'CZ', 'CZ2', 'CZ3', 'CH2', 'NE1'] }, style: { stick: { color: '#ffc247', radius: .5 } }, labelSel: AROM, label: { nl: 'Phe238 · Phe269 · Trp361 · Phe386', en: 'Phe238 · Phe269 · Trp361 · Phe386' }, labelColor: '#ffc247', labelOff: [0, 130] }, { sel: DNA, style: { stick: { color: C.dna, radius: .45 } } }], zoom: { or: [{ chain: 'B' }, AROM] }, pad: .85,
      title: { nl: 'Platte ringen grijpen de basen', en: 'Flat rings grip the bases' },
      text: { nl: 'Platte ringen van enkele aminozuren stapelen op de basen. Zo kan RPA elke DNA-volgorde vasthouden.', en: 'Flat rings of a few amino acids stack on the bases. This lets RPA hold any DNA sequence.' } },
    { dur: 9000, spin: .015, focus: null, tags: [{ sel: { chain: 'A' }, label: { nl: 'RPA: twee grijpdelen', en: 'RPA: two gripping parts' } }, { sel: { chain: 'B' }, label: { nl: 'losse DNA-streng', en: 'single DNA strand' }, labelColor: C.dna }], zoom: {},
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
