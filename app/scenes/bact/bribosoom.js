import { structure3d, RIBO3D, blob, ghost } from '../../kit3d.js';
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
const R = RIBO3D;
const COL = { r16: R.r30, p30: R.p30, r23: R.r50, p50: R.p50, mrna: R.mrna, tP: R.tP, tA: R.tA, pol: '#9b7bff', nusg: '#7fdc6a', dna: C.dna, us10: '#ff8f8f' };
/* gesloten vorm uit grote bollen op de CA/P-atomen (de lokale kopie bevat alleen die atomen); tRNA's en DNA kleiner, zodat hun vorm leesbaar blijft */
const RNA = c => blob(c, 9), PROT = c => blob(c, 8), THIN = c => blob(c, 3.2), TR = c => blob(c, 5.5);
const S30 = ['AA', ...A], S50 = ['BA', 'BB', ...B50], OTHER = ['AV', 'AW', 'AX', 'CF', 'CN', 'CT'];
/* gedimd: één rustige, doorschijnende vorm */
const GH = (chains, op = .18) => ({ sel: { chain: chains }, style: ghost(4.2, op) });
const base = [
  { sel: { chain: 'AA' }, style: RNA(COL.r16) }, { sel: { chain: A }, style: PROT(COL.p30) },
  { sel: { chain: ['BA', 'BB'] }, style: RNA(COL.r23) }, { sel: { chain: B50 }, style: PROT(COL.p50) },
  { sel: { chain: 'AV' }, style: THIN(COL.mrna) }, { sel: { chain: 'AW' }, style: TR(COL.tP) }, { sel: { chain: 'AX' }, style: TR(COL.tA) },
  { sel: { chain: POL }, style: PROT(COL.pol) }, { sel: { chain: 'CF' }, style: PROT(COL.nusg) }, { sel: { chain: ['CN', 'CT'] }, style: TR(COL.dna) },
];

export default structure3d({
  id: 'bribosoom', pdb: '6ZTJ',
  title: L3('Het ribosoom rijdt vlak achter het RNA-polymerase', 'The ribosome rides right behind RNA polymerase'),
  scale: { nl: '70S ≈ 20 nm · ≈ 2,5 MDa', en: '70S ≈ 20 nm · ≈ 2.5 MDa' }, time: L3('≈ 10–20 aminozuren/s', '≈ 10–20 amino acids/s'),
  org: L3('bacterie (Escherichia coli) · PDB 6ZTJ', 'bacterium (Escherichia coli) · PDB 6ZTJ'),
  legend: [[COL.r16, '16S-rRNA (30S)'], [COL.r23, '23S/5S-rRNA (50S)'], [COL.p30, L3('ribosoomeiwitten', 'ribosomal proteins')], [COL.mrna, 'mRNA'], [COL.tP, L3('tRNA (P-plaats)', 'tRNA (P site)')], [COL.tA, L3('tRNA (A-plaats)', 'tRNA (A site)')],
    [COL.pol, L3('RNA-polymerase', 'RNA polymerase')], [COL.nusg, 'NusG'], [COL.dna, 'DNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur van het "expressoom" (Webster et al., <i>Science</i> 2020): het E. coli-ribosoom en het RNA-polymerase op hetzelfde mRNA, verbonden door NusG. Om snel te laden en vlot te draaien staat er één grote bol per bouwsteen; samen geven ze de buitenvorm.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure of the "expressome" (Webster et al., <i>Science</i> 2020): the E. coli ribosome and RNA polymerase on the same mRNA, linked by NusG. To load quickly and turn smoothly, there is one large ball per building block; together they give the outer shape.</p>' },
  simplified: {
    nl: 'Alleen de ruggengraat (één bol per aminozuur of nucleotide) is getekend; de bollen samen benaderen de buitenvorm. Het stuk mRNA tussen polymerase en ribosoom is hier 38 nt; in de cel varieert die afstand, en niet elk ribosoom is via NusG aan het polymerase gekoppeld. Het A-plaats-tRNA draagt in deze structuur een niet-reactief analoog in plaats van een gewoon aminozuur. Enkele flexibele eiwitten (zoals L7/L12) ontbreken.',
    en: 'Only the backbone (one ball per amino acid or nucleotide) is drawn; together the balls approximate the outer shape. The stretch of mRNA between polymerase and ribosome is 38 nt here; in the cell this distance varies, and not every ribosome is coupled to the polymerase via NusG. The A-site tRNA carries a non-reactive analogue instead of a normal amino acid in this structure. Some flexible proteins (such as L7/L12) are missing.' },
  base,
  dimOpacity: false,
  outline: { width: .3 },
  zoomPad: .85,
  steps: [
    { dur: 8000, title: L3('Ribosoom en RNA-polymerase samen', 'Ribosome and RNA polymerase together'), focus: null, zoom: {}, spin: .01,
      text: L3('Hier zie je een bacterieel ribosoom dat vlak achter het RNA-polymerase hetzelfde mRNA leest.', 'Here a bacterial ribosome reads the same mRNA right behind RNA polymerase.') },
    { dur: 8000, title: L3('De kleine eenheid: 30S', 'The small subunit: 30S'), zoom: {}, spin: .01,
      focus: [GH([...S50, ...POL, ...OTHER]), { sel: { chain: 'AA' }, style: RNA(COL.r16), label: '16S-rRNA', labelColor: COL.r16 }, { sel: { chain: A }, style: PROT(COL.p30) }],
      text: L3('De 30S-eenheid bestaat uit één lang RNA (16S) en 21 eiwitten. Ze leest het mRNA.', 'The 30S subunit is made of one long RNA (16S) and 21 proteins. It reads the mRNA.') },
    { dur: 8000, title: L3('De grote eenheid: 50S', 'The large subunit: 50S'), zoom: {}, spin: .01,
      focus: [GH([...S30, ...POL, ...OTHER]), { sel: { chain: 'BA' }, style: RNA(COL.r23), label: '23S-rRNA', labelColor: COL.r23 }, { sel: { chain: 'BB' }, style: RNA(COL.r23) }, { sel: { chain: B50 }, style: PROT(COL.p50) }],
      text: L3('De 50S-eenheid heeft twee RNA’s (23S en 5S) en ruim 30 eiwitten. Hier worden aminozuren gekoppeld.', 'The 50S subunit has two RNAs (23S and 5S) and over 30 proteins. Here amino acids are joined.') },
    { dur: 8000, title: L3('Een machine vooral uit RNA', 'A machine made mostly of RNA'), zoom: {}, spin: .01,
      focus: [GH([...A, ...B50, ...POL, ...OTHER], .14), { sel: { chain: 'AA' }, style: RNA(COL.r16), label: '16S', labelColor: COL.r16, labelOff: [-110, 30] }, { sel: { chain: 'BA' }, style: RNA(COL.r23), label: '23S', labelColor: COL.r23, labelOff: [110, -30] }, { sel: { chain: 'BB' }, style: RNA(COL.r23) }],
      text: L3('Ongeveer twee derde van het ribosoom is RNA. Het RNA doet ook het koppelen zelf.', 'About two thirds of the ribosome is RNA. The RNA also does the joining itself.') },
    { dur: 9000, title: L3('Twee tRNA’s op het mRNA', 'Two tRNAs on the mRNA'), zoom: { chain: ['AW', 'AX', 'AV'] }, rock: 40,
      focus: [GH(S30, .22), GH(S50, .14), GH([...POL, 'CF', 'CN', 'CT'], .1),
        { sel: { chain: 'AW' }, style: TR(COL.tP), label: L3('start-tRNA (P)', 'start tRNA (P)'), labelColor: COL.tP, labelOff: [-90, -18], node: 'trna' },
        { sel: { chain: 'AX' }, style: TR(COL.tA), label: L3('tRNA (A)', 'tRNA (A)'), labelColor: COL.tA, labelOff: [90, 18], node: 'trna' },
        { sel: { chain: 'AV' }, style: THIN(COL.mrna), label: 'mRNA', labelColor: COL.mrna, labelOff: [0, -70], node: 'bmrna' }],
      text: L3('In de P-plaats zit het start-tRNA (tRNA-fMet), in de A-plaats het volgende tRNA.', 'The P site holds the start tRNA (tRNA-fMet), the A site holds the next tRNA.') },
    { dur: 9000, title: L3('Het mRNA komt recht uit het polymerase', 'The mRNA comes straight out of the polymerase'), zoom: { chain: [...POL, 'AV'] }, rock: 45,
      // polymerase en 30S doorschijnend in hun eigen kleur, zodat mRNA en DNA erdoorheen te zien zijn
      focus: [GH(S50, .1), GH(['AW', 'AX', 'CF'], .1), { sel: { chain: S30 }, style: ghost(6, .22, COL.r16), label: L3('ribosoom (30S)', 'ribosome (30S)'), labelColor: COL.r16, labelOff: [0, -60] },
        { sel: { chain: POL }, style: ghost(6, .25, COL.pol), label: L3('RNA-polymerase', 'RNA polymerase'), labelColor: COL.pol, labelOff: [-90, -40], node: 'bpol' },
        { sel: { chain: 'AV' }, style: blob(COL.mrna, 3.6), label: 'mRNA', labelColor: COL.mrna, labelOff: [70, 40], node: 'bmrna' },
        { sel: { chain: ['CN', 'CT'] }, style: blob(COL.dna, 4.5), label: 'DNA', labelColor: COL.dna, labelOff: [-40, 50] }],
      text: L3('Het RNA-polymerase zit vlak voor het ribosoom. Het verse mRNA gaat er meteen in.', 'RNA polymerase sits right in front of the ribosome. The fresh mRNA goes straight in.') },
    { dur: 9000, title: L3('NusG slaat een brug', 'NusG forms a bridge'), zoom: { chain: ['CF', 'AJ'] }, rock: 45, pad: .6,
      focus: [GH(S30, .14), GH(S50, .1), GH(['AV', 'AW', 'AX', 'CN', 'CT'], .1),
        { sel: { chain: POL }, style: ghost(6, .3, COL.pol), label: L3('RNA-polymerase', 'RNA polymerase'), labelColor: COL.pol, labelOff: [20, 90], node: 'bpol' },
        { sel: { chain: 'CF' }, style: blob(COL.nusg, 4.5), label: 'NusG', labelColor: COL.nusg, labelOff: [-30, 50] },
        { sel: { chain: 'AJ' }, style: blob(COL.us10, 4.5), label: L3('ribosoomeiwit uS10', 'ribosomal protein uS10'), labelColor: COL.us10, labelOff: [100, -30] }],
      text: L3('Het eiwit NusG houdt met één kant het polymerase vast en met de andere kant het ribosoom.', 'The protein NusG holds the polymerase with one end and the ribosome with the other.') },
    { dur: 8000, title: L3('Vergelijk: ons 80S-ribosoom', 'Compare: our 80S ribosome'), focus: null, zoom: {}, spin: .01,
      text: L3('Ons ribosoom is groter (80S) en leest het mRNA pas buiten de kern. Het principe is hetzelfde.', 'Our ribosome is larger (80S) and only reads the mRNA outside the nucleus. The principle is the same.') },
  ],
  hotspots: [
    { node: 'bmrna', label: L3('← mRNA & 70S-start', '← mRNA & 70S start'), color: C.rna },
    { node: 'beftu', label: L3('EF-Tu brengt een tRNA →', 'EF-Tu brings a tRNA →'), color: C.trna },
    { node: 'ribosoom', label: L3('Vergelijk: 80S (mens)', 'Compare: 80S (human)'), color: C.rrna },
  ],
});
