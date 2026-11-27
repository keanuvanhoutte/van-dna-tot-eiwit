import { structure3d, RIBO3D, blob, ghost } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 5AFI: E. coli 70S-ribosoom met EF-Tu, aminoacyl-tRNA en het antibioticum kirromycine, cryo-EM 2,9 Å (Fischer et al., Nature 2015).
 * Lokale kopie data/pdb/5AFI.cif: ribosoom (rRNA + r-eiwitten) ingekort tot CA/P-atomen (bolletjesmodel); tRNA's, mRNA, EF-Tu en de
 * liganden kirromycine (KIR), GDP en fMet (FME) volledig. Ketens (auth, nagekeken via de RCSB-API 14-11-2026):
 *   a 16S-rRNA · b–u eiwitten S2–S21 · A 23S-rRNA · B 5S-rRNA · C–Z en 0–6 eiwitten van de 50S
 *   v fMet-tRNA-fMet in de P-plaats (FME aan A77) · w tweede kopie tRNA-fMet (verder van de A-plaats: v–y 52 Å, w–y 90 Å)
 *   EF-Tu = UniProt P0CE48 (tufB, 394 aa, ≈ 43 kDa; RCSB entiteit 25).
 *   x mRNA (A12–G22; AUG = 16–18, UUC = 19–21) · y Phe-tRNA-Phe in de A/T-stand · z EF-Tu (1–393) met GDP en kirromycine.
 * Codon–anticodon gemeten in het bestand: y G34·C21, A35·U20, A36·U19 (2,6–2,8 Å) → anticodon GAA leest codon UUC (Phe). */
const L3 = (nl, en) => ({ nl, en });
const S30P = 'bcdefghijklmnopqrstu'.split('');
const S50P = 'CDEFGHIJKLMNOPQRSTUVWXYZ0123456'.split('');
const R = RIBO3D;
const COL = { r16: R.r30, p30: R.p30, r23: R.r50, p50: R.p50, mrna: R.mrna, tP: R.tP, tW: R.tE, tA: R.tA, eftu: '#9b7bff', gdp: '#5fd3e6', kir: '#ff6b6b' };
/* ribosoom in de gedeelde handboekstijl (grote bollen op CA/P), tRNA's/mRNA/EF-Tu in het overzicht ook als bollen (alleen P/CA) */
const RNA = c => blob(c, 9), PROT = c => blob(c, 8), TR = c => blob(c, 5.5);
/* gedimd ribosoom: één rustige, doorschijnende vorm */
const RIBO = [{ sel: { chain: ['a', ...S30P] }, style: ghost(7, .16, undefined, 8) }, { sel: { chain: ['A', 'B', ...S50P] }, style: ghost(7, .1, undefined, 8) },   // close-ups: maar 1 op 8 bollen (anders te veel grafisch werk vlak voor de camera)
  // de rest (tRNA's, mRNA, EF-Tu) eerst als vage lint; de stap zelf licht daarna haar onderdelen uit
  { sel: { chain: ['v', 'w', 'x', 'y'] }, style: { cartoon: { color: R.ghost, opacity: .22 } } }, { sel: { chain: 'z', hetflag: false }, style: { cartoon: { color: R.ghost, opacity: .22 } } }];
const TRNA = (ch, col, label) => ({ sel: { chain: ch }, style: { cartoon: { color: col, thickness: .6 }, stick: { color: col, radius: .16 } }, label });
const EFTU = (label) => ({ sel: { chain: 'z', hetflag: false }, style: { cartoon: { color: COL.eftu } }, label });
const TOTAL = [{ sel: { chain: 'z', atom: 'CA' }, style: blob(COL.eftu, 5), label: L3('EF-Tu + tRNA', 'EF-Tu + tRNA'), labelColor: COL.eftu, labelOff: [0, 80] }];
// de andere tRNA's op de achtergrond houden in de stappen over EF-Tu zelf
const OTHER_T = { sel: { chain: ['v', 'w'] }, style: { cartoon: { color: '#4d4633', thickness: .4 } } };
const LIG = (resn, col, label) => ({ sel: { resn }, style: { stick: { color: col, radius: .3 }, sphere: { color: col, radius: .55 } }, label });
const base = [
  { sel: { chain: 'a' }, style: RNA(COL.r16) }, { sel: { chain: S30P }, style: PROT(COL.p30) },
  { sel: { chain: ['A', 'B'] }, style: RNA(COL.r23) }, { sel: { chain: S50P }, style: PROT(COL.p50) },
  { sel: { chain: 'x', atom: 'P' }, style: blob(COL.mrna, 3.6) },
  { sel: { chain: 'v', atom: 'P' }, style: TR(COL.tP) }, { sel: { chain: 'w', atom: 'P' }, style: TR(COL.tW) },
  { sel: { chain: 'y', atom: 'P' }, style: TR(COL.tA) },
  { sel: { chain: 'z', atom: 'CA' }, style: blob(COL.eftu, 4.5) },
  // GDP en kirromycine (KIR) pas tonen in de stappen die erover gaan
];

export default structure3d({
  id: 'beftu', pdb: '5AFI',
  title: L3('EF-Tu brengt het volgende tRNA', 'EF-Tu delivers the next tRNA'),
  scale: { nl: '70S ≈ 20 nm · EF-Tu ≈ 43 kDa', en: '70S ≈ 20 nm · EF-Tu ≈ 43 kDa' }, time: L3('≈ 10–20 aminozuren/s', '≈ 10–20 amino acids/s'),
  org: L3('bacterie (Escherichia coli) · PDB 5AFI', 'bacterium (Escherichia coli) · PDB 5AFI'),
  legend: [[COL.r16, '16S-rRNA (30S)'], [COL.r23, '23S/5S-rRNA (50S)'], [COL.mrna, 'mRNA'], [COL.tP, L3('start-tRNA (P-plaats)', 'start tRNA (P site)')], [COL.tA, L3('nieuw tRNA (Phe)', 'new tRNA (Phe)')],
    [COL.tW, L3('tweede start-tRNA (E-plaats)', 'second start tRNA (E site)')], [COL.eftu, 'EF-Tu'], [COL.gdp, 'GDP'], [COL.kir, L3('kirromycine (antibioticum)', 'kirromycin (antibiotic)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur van het E. coli-ribosoom met EF-Tu en een tRNA, vastgezet met het antibioticum kirromycine (Fischer et al., <i>Nature</i> 2015). Het ribosoom: één grote bol per bouwsteen (samen de buitenvorm); tRNA’s, mRNA en EF-Tu volledig in de detailstappen. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure of the E. coli ribosome with EF-Tu and a tRNA, locked in place with the antibiotic kirromycin (Fischer et al., <i>Nature</i> 2015). The ribosome: one large ball per building block (together the outer shape); tRNAs, mRNA and EF-Tu in full in the close-up steps. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Dit is één momentopname: EF-Tu heeft zijn GTP al tot GDP omgezet, maar kirromycine houdt het nog op het ribosoom vast. Zonder antibioticum zou EF-Tu op dat moment loslaten. In het bestand zit nog een tweede kopie van het start-tRNA (keten w); die ligt op de E-plaats, tegen het mRNA vóór het startcodon, en is okerbruin getekend. Het ribosoom is als grote bollen getekend (één per aminozuur of nucleotide) om snel te laden en vlot te draaien.',
    en: 'This is one snapshot: EF-Tu has already turned its GTP into GDP, but kirromycin still holds it on the ribosome. Without the antibiotic EF-Tu would let go at that moment. The file also contains a second copy of the start tRNA (chain w); it lies in the E site, against the mRNA before the start codon, and is drawn ochre brown. The ribosome is drawn as large balls (one per amino acid or nucleotide) so it loads quickly and turns smoothly.' },
  base,
  dimOpacity: false,
  outline: { width: .3 },
  zoomPad: .85,
  rotate: [['y', 225]],                 // beginstand: EF-Tu aan de voorkant; daarna wiegen (rock) i.p.v. rond draaien
  steps: [
    { dur: 8000, title: L3('Een nieuw tRNA komt aan', 'A new tRNA arrives'), focus: TOTAL, zoom: {}, tags: [{ sel: { chain: ['a', ...S30P, 'A', 'B', ...S50P] }, label: { nl: 'ribosoom', en: 'ribosome' }, labelOff: [0, 120] }], pad: .75, rock: 35,
      text: L3('Het eiwit EF-Tu brengt een tRNA met een aminozuur naar het ribosoom.', 'The protein EF-Tu brings a tRNA carrying an amino acid to the ribosome.') },
    { dur: 8500, title: L3('EF-Tu en zijn tRNA', 'EF-Tu and its tRNA'), zoom: { chain: ['z', 'y'] }, rock: 35, pad: .7,
      focus: [...RIBO, { ...EFTU('EF-Tu'), labelColor: COL.eftu, labelOff: [140, -50] }, { ...TRNA('y', COL.tA, L3('tRNA met Phe', 'tRNA with Phe')), labelColor: COL.tA, labelOff: [-150, 70], node: 'trna' }, TRNA('v', COL.tP), { sel: { chain: 'x' }, style: { cartoon: { color: COL.mrna } } }],
      text: L3('EF-Tu houdt het tRNA vast aan de kant van het aminozuur. Het andere uiteinde reikt al tot bij het mRNA.', 'EF-Tu holds the tRNA at the amino acid end. The other end already reaches the mRNA.') },
    { dur: 9000, title: L3('Past het codon?', 'Does the codon fit?'), zoom: { or: [{ chain: 'x', resi: [19, 20, 21] }, { chain: 'y', resi: [34, 35, 36] }] }, rock: 35, pad: .7,
      focus: [...RIBO, { sel: { chain: 'x' }, style: { stick: { color: COL.mrna, radius: .3 } } }, { sel: { chain: 'x', resi: [19, 20, 21] }, style: { stick: { color: COL.mrna, radius: .5 }, sphere: { color: COL.mrna, radius: .7 } }, label: L3('codon UUC', 'codon UUC'), labelColor: COL.mrna, labelOff: [70, 90], node: 'codon' },
        { sel: { chain: 'y' }, style: { cartoon: { color: COL.tA, opacity: .45 } } }, { sel: { chain: 'y', resi: [34, 35, 36] }, style: { stick: { color: COL.tA, radius: .5 }, sphere: { color: COL.tA, radius: .7 } }, label: L3('anticodon GAA', 'anticodon GAA'), labelColor: COL.tA, labelOff: [-70, -90], node: 'trna' },
        { sel: { chain: 'v' }, style: { cartoon: { color: COL.tP, opacity: .25 } } }],
      text: L3('Het ribosoom controleert of de drie letters van het tRNA passen op het codon. Hier: GAA op UUC.', 'The ribosome checks whether the three letters of the tRNA fit the codon. Here: GAA on UUC.') },
    { dur: 9000, title: L3('Het past: GTP wordt GDP', 'It fits: GTP becomes GDP'), zoom: { chain: ['z', 'y'] }, rock: 35, pad: .7,
      focus: [...RIBO, EFTU(), LIG('GDP', COL.gdp, 'GDP'), { sel: { resn: 'KIR' }, style: {} }, { sel: { chain: 'y' }, style: { cartoon: { color: COL.tA, thickness: .6 } } }, OTHER_T],
      text: L3('Past het codon, dan zet EF-Tu zijn GTP om in GDP. Normaal laat het daarna het tRNA los.', 'If the codon fits, EF-Tu turns its GTP into GDP. Normally it then lets go of the tRNA.') },
    { dur: 9000, title: L3('Een antibioticum zet EF-Tu vast', 'An antibiotic locks EF-Tu'), zoom: { chain: 'z' }, rock: 35,
      focus: [...RIBO, EFTU(), LIG('GDP', COL.gdp), { ...LIG('KIR', COL.kir, L3('kirromycine', 'kirromycin')), labelColor: COL.kir, node: 'antibiotica' }, TRNA('y', COL.tA), OTHER_T],
      text: L3('Kirromycine laat EF-Tu na die stap niet meer los. Zo konden onderzoekers dit moment vastleggen.', 'Kirromycin keeps EF-Tu from letting go after that step. That is how researchers could capture this moment.') },
    { dur: 8500, title: L3('Drie tRNA’s op het ribosoom', 'Three tRNAs on the ribosome'), zoom: { chain: ['v', 'w', 'y'] }, rock: 35,
      focus: [...RIBO, { ...TRNA('v', COL.tP, L3('start-tRNA (P)', 'start tRNA (P)')), labelColor: COL.tP, labelOff: [0, 110], node: 'trna' }, { ...TRNA('y', COL.tA, L3('nieuw tRNA', 'new tRNA')), labelColor: COL.tA, labelOff: [170, 20], node: 'trna' }, { ...TRNA('w', COL.tW, L3('tweede start-tRNA (E)', 'second start tRNA (E)')), labelColor: COL.tW, labelOff: [-170, -20], node: 'trna' }, { sel: { chain: 'x' }, style: { cartoon: { color: COL.mrna } } }],
      text: L3('Het start-tRNA draagt het eerste aminozuur. Laat EF-Tu los, dan schuift het nieuwe tRNA helemaal in de A-plaats en volgt de koppeling.', 'The start tRNA carries the first amino acid. Once EF-Tu lets go, the new tRNA moves fully into the A site and joining follows.') },
    { dur: 8000, title: L3('Vergelijk: bij ons doet eEF1A dit', 'Compare: in humans eEF1A does this'), focus: TOTAL, zoom: {}, tags: [{ sel: { chain: ['a', ...S30P, 'A', 'B', ...S50P] }, label: { nl: 'ribosoom', en: 'ribosome' }, labelOff: [0, 120] }], pad: .75, rock: 35,
      text: L3('In onze cellen brengt eEF1A de tRNA’s. Het werkt op dezelfde manier als EF-Tu.', 'In our cells eEF1A delivers the tRNAs. It works the same way as EF-Tu.') },
  ],
  hotspots: [
    { node: 'bribosoom', label: L3('← Ribosoom & RNA-polymerase', '← Ribosome & RNA polymerase'), color: C.rrna },
    { node: 'codon', label: L3('Codons lezen →', 'Reading codons →'), color: C.trna },
    { node: 'ribosoomremmers', label: L3('Antibiotica op het ribosoom', 'Antibiotics on the ribosome'), color: '#ff6b6b' },
    { node: 'elongatie', label: L3('Vergelijk: verlenging bij de mens', 'Compare: elongation in humans'), color: C.rrna },
  ],
});
