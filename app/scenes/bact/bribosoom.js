import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 6ZTJ: E. coli 70S-ribosoom gekoppeld aan RNA-polymerase via NusG ("expressoom"), cryo-EM 3,4 Å (Webster et al., Science 2020).
 * Lokale kopie data/pdb/6ZTJ.cif is ingekort tot de ruggengraat (CA- en P-atomen: 176 970 → 14 200 atomen), daarom een bolletjesmodel.
 * Ketens (auth, nagekeken via de RCSB-API 04-11-2026):
 *   30S: AA 16S-rRNA · AB–AU en AY eiwitten S2–S21 en S1 (AJ = S10, de plek waar NusG bindt)
 *   AV mRNA · AW tRNA-fMet (P-plaats, zonder aminozuur in deze structuur) · AX Phe-tRNA (A-plaats)
 *   50S: BA 23S-rRNA · BB 5S-rRNA · BC–BZ en B1–B7 eiwitten
 *   RNA-polymerase: CA, CB α · CC β · CD β′ · CE ω · CF NusG · CN/CT DNA-strengen */
const L3 = (nl, en) => ({ nl, en });
const A = 'ABCDEFGHIJKLMNOPQRSTU'.slice(1).split('').map(c => 'A' + c).concat(['AY']);          // AB..AU + AY
const B50 = 'CDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(c => 'B' + c).concat(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
const POL = ['CA', 'CB', 'CC', 'CD', 'CE'];
const COL = { r16: '#2cc6a8', p30: '#7fb8ab', r23: '#1f8f7a', p50: '#6a9a90', mrna: C.rna, tP: '#ffc247', tA: '#ffe08a', pol: '#9b7bff', nusg: '#7fdc6a', dna: C.dna };
/* bolletjesmodel: één bol per CA/P-atoom (de lokale kopie bevat alleen die atomen) */
const T = (color, w = .6) => ({ sphere: { color, radius: 1.6 + w * .9 } });
/* in stappen die iets binnenin tonen: de rest als kleine, doorschijnende bolletjes */
const FADE = (chains) => ({ sel: { chain: chains }, style: { sphere: { color: '#33415c', radius: .5 } } });
const S30 = ['AA', ...A], S50 = ['BA', 'BB', ...B50], OTHER = ['AV', 'AW', 'AX', 'CF', 'CN', 'CT'];
const RIBO_FADE = [FADE(S30), FADE(S50)];
const base = [
  { sel: { chain: 'AA' }, style: T(COL.r16) }, { sel: { chain: A }, style: T(COL.p30) },
  { sel: { chain: ['BA', 'BB'] }, style: T(COL.r23) }, { sel: { chain: B50 }, style: T(COL.p50) },
  { sel: { chain: 'AV' }, style: T(COL.mrna, 1.2) }, { sel: { chain: 'AW' }, style: T(COL.tP, 1.2) }, { sel: { chain: 'AX' }, style: T(COL.tA, 1.2) },
  { sel: { chain: POL }, style: T(COL.pol) }, { sel: { chain: 'CF' }, style: T(COL.nusg, 1.2) }, { sel: { chain: ['CN', 'CT'] }, style: T(COL.dna, 1) },
];

export default structure3d({
  id: 'bribosoom', pdb: '6ZTJ',
  title: L3('Het ribosoom rijdt vlak achter het RNA-polymerase', 'The ribosome rides right behind RNA polymerase'),
  scale: { nl: '70S ≈ 20 nm · ≈ 2,5 MDa', en: '70S ≈ 20 nm · ≈ 2.5 MDa' }, time: L3('≈ 10–20 aminozuren/s', '≈ 10–20 amino acids/s'),
  org: L3('bacterie (Escherichia coli) · PDB 6ZTJ', 'bacterium (Escherichia coli) · PDB 6ZTJ'),
  legend: [[COL.r16, '16S-rRNA (30S)'], [COL.r23, '23S/5S-rRNA (50S)'], [COL.p30, L3('ribosoomeiwitten', 'ribosomal proteins')], [COL.mrna, 'mRNA'], [COL.tP, L3('tRNA (P-plaats)', 'tRNA (P site)')], [COL.tA, L3('tRNA (A-plaats)', 'tRNA (A site)')],
    [COL.pol, L3('RNA-polymerase', 'RNA polymerase')], [COL.nusg, 'NusG'], [COL.dna, 'DNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur van het "expressoom" (Webster et al., <i>Science</i> 2020): het E. coli-ribosoom en het RNA-polymerase op hetzelfde mRNA, verbonden door NusG. Om snel te laden toont de figuur één bolletje per bouwsteen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure of the "expressome" (Webster et al., <i>Science</i> 2020): the E. coli ribosome and RNA polymerase on the same mRNA, linked by NusG. To load quickly, the figure shows one bead per building block.</p>' },
  simplified: {
    nl: 'Alleen de ruggengraat (één bolletje per aminozuur of nucleotide) is getekend. Het stuk mRNA tussen polymerase en ribosoom is hier 38 nt; in de cel varieert die afstand, en niet elk ribosoom is via NusG aan het polymerase gekoppeld. Het A-plaats-tRNA draagt in deze structuur een niet-reactief analoog in plaats van een gewoon aminozuur. Enkele flexibele eiwitten (zoals L7/L12) ontbreken.',
    en: 'Only the backbone (one bead per amino acid or nucleotide) is drawn. The stretch of mRNA between polymerase and ribosome is 38 nt here; in the cell this distance varies, and not every ribosome is coupled to the polymerase via NusG. The A-site tRNA carries a non-reactive analogue instead of a normal amino acid in this structure. Some flexible proteins (such as L7/L12) are missing.' },
  base,
  dimOpacity: false,
  steps: [
    { dur: 8000, title: L3('Ribosoom en RNA-polymerase samen', 'Ribosome and RNA polymerase together'), focus: null, zoom: {}, spin: .01,
      text: L3('Hier zie je een bacterieel ribosoom dat vlak achter het RNA-polymerase hetzelfde mRNA leest.', 'Here a bacterial ribosome reads the same mRNA right behind RNA polymerase.') },
    { dur: 8000, title: L3('De kleine eenheid: 30S', 'The small subunit: 30S'), zoom: {}, spin: .01,
      focus: [FADE([...S50, ...POL, ...OTHER]), { sel: { chain: 'AA' }, style: T(COL.r16, .8), label: '16S-rRNA' }, { sel: { chain: A }, style: T(COL.p30, .8) }],
      text: L3('De 30S-eenheid bestaat uit één lang RNA (16S) en 21 eiwitten. Ze leest het mRNA.', 'The 30S subunit is made of one long RNA (16S) and 21 proteins. It reads the mRNA.') },
    { dur: 8000, title: L3('De grote eenheid: 50S', 'The large subunit: 50S'), zoom: {}, spin: .01,
      focus: [FADE([...S30, ...POL, ...OTHER]), { sel: { chain: 'BA' }, style: T(COL.r23, .8), label: '23S-rRNA' }, { sel: { chain: 'BB' }, style: T(COL.r23, .8) }, { sel: { chain: B50 }, style: T(COL.p50, .8) }],
      text: L3('De 50S-eenheid heeft twee RNA’s (23S en 5S) en ruim 30 eiwitten. Hier worden aminozuren gekoppeld.', 'The 50S subunit has two RNAs (23S and 5S) and over 30 proteins. Here amino acids are joined.') },
    { dur: 8000, title: L3('Een machine vooral uit RNA', 'A machine made mostly of RNA'), zoom: {}, spin: .01,
      focus: [FADE([...A, ...B50, ...POL, ...OTHER]), { sel: { chain: 'AA' }, style: T(COL.r16, .8), label: '16S' }, { sel: { chain: 'BA' }, style: T(COL.r23, .8), label: '23S' }, { sel: { chain: 'BB' }, style: T(COL.r23, .8) }],
      text: L3('Ongeveer twee derde van het ribosoom is RNA. Het RNA doet ook het koppelen zelf.', 'About two thirds of the ribosome is RNA. The RNA also does the joining itself.') },
    { dur: 9000, title: L3('Twee tRNA’s op het mRNA', 'Two tRNAs on the mRNA'), zoom: { chain: ['AW', 'AX', 'AV'] }, spin: .006,
      focus: [...RIBO_FADE, FADE([...POL, 'CF', 'CN', 'CT']), { sel: { chain: 'AW' }, style: T(COL.tP, 1.6), label: L3('start-tRNA (P)', 'start tRNA (P)') }, { sel: { chain: 'AX' }, style: T(COL.tA, 1.6), label: L3('tRNA (A)', 'tRNA (A)') }, { sel: { chain: 'AV' }, style: T(COL.mrna, 1.6), label: 'mRNA' }],
      text: L3('In de P-plaats zit het start-tRNA (tRNA-fMet), in de A-plaats het volgende tRNA.', 'The P site holds the start tRNA (tRNA-fMet), the A site holds the next tRNA.') },
    { dur: 9000, title: L3('Het mRNA komt recht uit het polymerase', 'The mRNA comes straight out of the polymerase'), zoom: { chain: [...POL, 'AV'] }, spin: .008,
      focus: [...RIBO_FADE, { sel: { chain: POL }, style: T(COL.pol, .9), label: L3('RNA-polymerase', 'RNA polymerase') }, { sel: { chain: 'AV' }, style: T(COL.mrna, 1.6), label: 'mRNA' }, { sel: { chain: ['CN', 'CT'] }, style: T(COL.dna, 1.4), label: 'DNA' }],
      text: L3('Het RNA-polymerase zit vlak voor het ribosoom. Het verse mRNA gaat er meteen in.', 'RNA polymerase sits right in front of the ribosome. The fresh mRNA goes straight in.') },
    { dur: 9000, title: L3('NusG slaat een brug', 'NusG forms a bridge'), zoom: { chain: ['CF', 'AJ'] }, spin: .006,
      focus: [...RIBO_FADE, FADE(POL), { sel: { chain: 'CF' }, style: T(COL.nusg, 1.2), label: 'NusG' }, { sel: { chain: 'AJ' }, style: T('#ff8f8f', 1), label: L3('ribosoomeiwit uS10', 'ribosomal protein uS10') }],
      text: L3('Het eiwit NusG houdt met één kant het polymerase vast en met de andere kant het ribosoom.', 'The protein NusG holds the polymerase with one end and the ribosome with the other.') },
    { dur: 8000, title: L3('Vergelijk: ons 80S-ribosoom', 'Compare: our 80S ribosome'), focus: null, zoom: {}, spin: .01,
      text: L3('Ons ribosoom is groter (80S) en leest het mRNA pas buiten de kern. Het principe is hetzelfde.', 'Our ribosome is larger (80S) and only reads the mRNA outside the nucleus. The principle is the same.') },
  ],
  hotspots: [
    { node: 'bmrna', label: L3('← mRNA & 70S-start', '← mRNA & 70S start'), color: C.rna },
    { node: 'codon', label: L3('Codons lezen →', 'Reading codons →'), color: C.trna },
    { node: 'ribosoom', label: L3('Vergelijk: 80S (mens)', 'Compare: 80S (human)'), color: C.rrna },
  ],
});
