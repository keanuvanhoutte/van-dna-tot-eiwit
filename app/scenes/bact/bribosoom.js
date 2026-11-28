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
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)
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
  parts: [
    { c: COL.r23, t: { nl: 'ribosoom', en: 'ribosome' }, m: ['bacterieel ribosoom (70S)', 'bacterial ribosome (70S)'], d: { nl: 'De eiwitfabriek van de bacterie (70S), uit een kleine en een grote helft. Ze is kleiner dan ons ribosoom (80S).', en: 'The bacterium’s protein factory (70S), made of a small and a large half. It is smaller than our ribosome (80S).' },
      p: { nl: '70S-ribosoom (≈ 2,5 MDa), opgebouwd uit 30S en 50S; ongeveer twee derde van de massa is rRNA.', en: '70S ribosome (≈ 2.5 MDa), built from 30S and 50S; about two thirds of its mass is rRNA.' } },
    { c: COL.r16, t: { nl: 'ribosoom (30S)', en: 'ribosome (30S)' }, d: { nl: 'De kleine helft van het ribosoom: ze leest de RNA-boodschap (mRNA).', en: 'The small half of the ribosome: it reads the RNA message (mRNA).' },
      p: { nl: 'Kleine subeenheid (16S-rRNA + ≈ 21 eiwitten) met het decoderingscentrum.', en: 'Small subunit (16S rRNA + ≈ 21 proteins) with the decoding centre.' } },
    { c: COL.r16, t: '16S-rRNA', m: ['16S'], d: { nl: 'Het grote RNA dat het geraamte van de kleine helft vormt.', en: 'The large RNA that forms the framework of the small half.' },
      p: { nl: '16S-rRNA (≈ 1 540 nt); bevat het anti-Shine-Dalgarno en het decoderingscentrum.', en: '16S rRNA (≈ 1,540 nt); contains the anti-Shine–Dalgarno and the decoding centre.' } },
    { c: COL.r23, t: '23S-rRNA', m: ['23S'], d: { nl: 'Het grote RNA van de grote helft. Samen met een klein RNA (5S) vormt het het grootste deel ervan.', en: 'The large RNA of the large half. Together with a small RNA (5S) it makes up most of it.' },
      p: { nl: '23S-rRNA (≈ 2 900 nt) met 5S-rRNA; vormt de kern van de 50S-subeenheid.', en: '23S rRNA (≈ 2,900 nt) with 5S rRNA; forms the core of the 50S subunit.' } },
    { c: '#ffc247', t: { nl: 'koppelplaats: binnenin, van RNA', en: 'joining site: inside, made of RNA' }, d: { nl: 'De plek diep binnenin waar de bouwstenen aan elkaar worden gezet. Ze bestaat uit RNA, niet uit eiwit.', en: 'The spot deep inside where the building blocks are joined together. It is made of RNA, not protein.' },
      p: { nl: 'Peptidyltransferasecentrum in domein V van het 23S-rRNA; het ribosoom is een ribozym.', en: 'Peptidyl transferase centre in domain V of the 23S rRNA; the ribosome is a ribozyme.' } },
    { c: COL.tP, t: { nl: 'start-tRNA (P)', en: 'start tRNA (P)' }, d: { nl: 'Het start-tRNA op de middelste plek (P) van het ribosoom.', en: 'The start tRNA in the middle spot (P) of the ribosome.' },
      p: { nl: 'tRNA^fMet in de P-plaats (hier zonder aminozuur).', en: 'tRNA^fMet in the P site (here without amino acid).' } },
    { c: COL.tA, t: 'tRNA (A)', d: { nl: 'Het volgende tRNA, op de aankomstplek (A), met de volgende bouwsteen.', en: 'The next tRNA, in the arrival spot (A), with the next building block.' },
      p: { nl: 'Phe-tRNA^Phe in de A-plaats, met een niet-reactief analoog.', en: 'Phe-tRNA^Phe in the A site, carrying a non-reactive analogue.' } },
    { c: COL.mrna, t: 'mRNA', d: { nl: 'De RNA-boodschap: ze komt recht uit het RNA-enzym en loopt meteen door het ribosoom.', en: 'The RNA message: it comes straight out of the RNA enzyme and runs right through the ribosome.' },
      p: { nl: 'mRNA dat het RNAP verlaat en het 30S-mRNA-kanaal binnengaat (hier 38 nt ertussen).', en: 'mRNA leaving RNAP and entering the 30S mRNA channel (38 nt in between here).' } },
    { c: COL.pol, t: { nl: 'RNA-polymerase', en: 'RNA polymerase' }, d: { nl: 'Het paarse RNA-enzym dat het DNA leest en de RNA-boodschap maakt, vlak voor het ribosoom.', en: 'The purple RNA enzyme that reads the DNA and makes the RNA message, right in front of the ribosome.' },
      p: { nl: 'RNA-polymerase-core (α₂ββ′ω) in een transcriptie-elongatiecomplex, gekoppeld aan het ribosoom.', en: 'RNA polymerase core (α₂ββ′ω) in a transcription elongation complex, coupled to the ribosome.' } },
    { c: COL.dna, t: 'DNA', d: { nl: 'De DNA-draad die door het RNA-enzym loopt.', en: 'The DNA strand running through the RNA enzyme.' },
      p: { nl: 'Matrijs- en niet-matrijsstreng in het elongatiecomplex.', en: 'Template and non-template strands in the elongation complex.' } },
    { c: COL.nusg, t: 'NusG', d: { nl: 'Een klein groen eiwit dat een brug slaat: met het ene uiteinde op het RNA-enzym, met het andere op het ribosoom.', en: 'A small green protein that forms a bridge: one end on the RNA enzyme, the other on the ribosome.' },
      p: { nl: 'Transcriptiefactor; het NGN-domein bindt RNAP, het KOW-domein bindt uS10 van de 30S.', en: 'Transcription factor; its NGN domain binds RNAP, its KOW domain binds uS10 of the 30S.' } },
    { c: COL.us10, t: { nl: 'ribosoomeiwit uS10', en: 'ribosomal protein uS10' }, d: { nl: 'Het eiwit van het ribosoom waar de brug (NusG) aan vastzit.', en: 'The ribosome protein that the bridge (NusG) holds on to.' },
      p: { nl: 'uS10 (S10, ook NusE) van de 30S-subeenheid; contactpunt voor het KOW-domein van NusG.', en: 'uS10 (S10, also NusE) of the 30S subunit; contact point for the NusG KOW domain.' } },
  ],
  steps: [
    { dur: 8000, title: L3('Ribosoom en RNA-polymerase samen', 'Ribosome and RNA polymerase together'), focus: null, zoom: {}, tags: [TAG({ chain: [...S30, ...S50] }, 'ribosoom', 'ribosome'), TAG({ chain: POL }, 'RNA-polymerase', 'RNA polymerase')], spin: .01,
      text: L3('Hier zie je een bacterieel ribosoom dat vlak achter het RNA-polymerase hetzelfde mRNA leest.', 'Here a bacterial ribosome reads the same mRNA right behind RNA polymerase.') },
    { dur: 8000, title: L3('De kleine eenheid: 30S', 'The small subunit: 30S'), zoom: {}, spin: .01,
      focus: [GH([...S50, ...POL, ...OTHER]), { sel: { chain: 'AA' }, style: RNA(COL.r16), label: '16S-rRNA', labelColor: COL.r16 }, { sel: { chain: A }, style: PROT(COL.p30) }],
      text: L3('De 30S-eenheid bestaat uit één lang RNA (16S) en 21 eiwitten. Ze leest het mRNA.', 'The 30S subunit is made of one long RNA (16S) and 21 proteins. It reads the mRNA.') },
    { dur: 8000, title: L3('De grote eenheid: 50S', 'The large subunit: 50S'), zoom: {}, spin: .01,
      focus: [GH([...S30, ...POL, ...OTHER]), { sel: { chain: 'BA' }, style: RNA(COL.r23), label: '23S-rRNA', labelColor: COL.r23 }, { sel: { chain: 'BB' }, style: RNA(COL.r23) }, { sel: { chain: B50 }, style: PROT(COL.p50) }],
      text: L3('De 50S-eenheid heeft twee RNA’s (23S en 5S) en ruim 30 eiwitten. Hier worden aminozuren gekoppeld.', 'The 50S subunit has two RNAs (23S and 5S) and over 30 proteins. Here amino acids are joined.') },
    { dur: 8000, title: L3('Een machine vooral uit RNA', 'A machine made mostly of RNA'), zoom: {}, spin: .01,
      focus: [GH([...A, ...B50, ...POL, ...OTHER], .14),
        { sel: { chain: 'AA' }, style: RNA(COL.r16), label: '16S', labelColor: COL.r16, labelOff: [-60, -40] }, { sel: { chain: 'BA' }, style: RNA(COL.r23), label: '23S', labelColor: COL.r23, labelOff: [60, -40] }, { sel: { chain: 'BB' }, style: RNA(COL.r23) },
        // peptidyltransferasecentrum: 23S-domein V (E. coli A2451, U2585, A2602 e.o.) — puur RNA; het ligt diep binnenin (kaartje met lijntje)
        { sel: { chain: 'BA', resi: [...range(2447, 2455), ...range(2500, 2506), ...range(2583, 2587), ...range(2600, 2605)] }, style: blob('#ffc247', 11), label: L3('koppelplaats: binnenin, van RNA', 'joining site: inside, made of RNA'), labelColor: '#ffc247', labelOff: [0, 110] }],
      text: L3('Ongeveer twee derde van het ribosoom is RNA. Het RNA doet ook het koppelen zelf.', 'About two thirds of the ribosome is RNA. The RNA also does the joining itself.') },
    { dur: 9000, title: L3('Twee tRNA’s op het mRNA', 'Two tRNAs on the mRNA'), zoom: { chain: ['AW', 'AX'] }, pad: .62, rock: 40,
      focus: [GH(S30, .3), GH(S50, .2), GH([...POL, 'CF', 'CN', 'CT'], .1),
        { sel: { chain: 'AW' }, style: TR(COL.tP), label: L3('start-tRNA (P)', 'start tRNA (P)'), labelColor: COL.tP, labelOff: [-130, 30], node: 'trna' },
        { sel: { chain: 'AX' }, style: TR(COL.tA), label: L3('tRNA (A)', 'tRNA (A)'), labelColor: COL.tA, labelOff: [130, 30], node: 'trna' },
        { sel: { chain: 'AV' }, style: THIN(COL.mrna), labelSel: { chain: 'AV', resi: range(14, 22) }, label: 'mRNA', labelColor: COL.mrna, labelOff: [0, -80], node: 'bmrna' }],
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
    { dur: 8000, title: L3('Vergelijk: ons 80S-ribosoom', 'Compare: our 80S ribosome'), focus: null, zoom: {}, tags: [TAG({ chain: [...S30, ...S50] }, 'bacterieel ribosoom (70S)', 'bacterial ribosome (70S)'), TAG({ chain: POL }, 'RNA-polymerase', 'RNA polymerase')], spin: .01,
      text: L3('Ons ribosoom is groter (80S) en leest het mRNA pas buiten de kern. Het principe is hetzelfde.', 'Our ribosome is larger (80S) and only reads the mRNA outside the nucleus. The principle is the same.') },
  ],
  hotspots: [
    { node: 'bmrna', label: L3('← mRNA & 70S-start', '← mRNA & 70S start'), color: C.rna },
    { node: 'beftu', label: L3('EF-Tu brengt een tRNA →', 'EF-Tu brings a tRNA →'), color: C.trna },
    { node: 'ribosoom', label: L3('Vergelijk: 80S (mens)', 'Compare: 80S (human)'), color: C.rrna },
  ],
});
