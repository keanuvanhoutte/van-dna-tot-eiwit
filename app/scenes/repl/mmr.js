import { structure3d } from '../../kit3d.js';
import { C, BASE } from '../../kit.js';
import { NEW } from './_draw.js';

/* PDB 2O8B: menselijk MutSα (MSH2–MSH6) met ADP op DNA met een G·T-mispaar (röntgen 2,75 Å; Warren et al., Mol Cell 2007).
 * Ketens (nagekeken in het PDB-bestand 05-11-2026): A = MSH2 (1–855) · B = MSH6 (362–1335) · E en F = DNA (15 nt elk).
 *  - E 5'-GAACCGCGCGCTAGG-3' en F 5'-CCTAGCGTGCGGTTC-3' paren antiparallel; het enige mispaar is G E8 · T F23.
 *  - Phe432 van MSH6 (keten B) ligt binnen 4 Å van E7, E8, F23 en F24: het "Phe-X-Glu"-motief (met Glu434) tegen het mispaar.
 *  - Voor het verhaal noemen we streng F (met de T) de nieuwe streng; in het kristal is er geen oude of nieuwe streng. */
const L3 = (nl, en) => ({ nl, en });
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)
const COL = { msh2: '#9b7bff', msh6: '#5fd3e6' };
const base = [
  { sel: { chain: 'A' }, style: { cartoon: { color: COL.msh2, opacity: .9 } } },
  { sel: { chain: 'B' }, style: { cartoon: { color: COL.msh6, opacity: .9 } } },
  { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .15 } } },
  { sel: { chain: 'F' }, style: { cartoon: { color: NEW }, stick: { color: NEW, radius: .15 } } },
];
const DNA = [{ sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .22 } } }, { sel: { chain: 'F' }, style: { cartoon: { color: NEW }, stick: { color: NEW, radius: .22 } } }];
const G = { sel: { chain: 'E', resi: 8 }, style: { stick: { color: BASE.G, radius: .4 } }, label: 'G' };
const Tm = { sel: { chain: 'F', resi: 23 }, style: { stick: { color: BASE.T, radius: .4 } }, label: 'T' };
const PHE = { sel: { chain: 'B', resi: 432 }, style: { stick: { color: '#ffffff', radius: .45 } }, label: L3('vinger', 'finger') };
const CUT = { chain: 'F', resi: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25] };   // stuk van de nieuwe streng dat in het verhaal weggehaald en opnieuw gemaakt wordt
const MIS = { chain: ['E', 'F'], resi: [4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27] };   // ruim rond het mispaar (E8 · F23)

export default structure3d({
  id: 'mmr', pdb: '2O8B', format: 'pdb',
  title: L3('Kopieerfouten worden nagelezen en verbeterd', 'Copying errors are proofread and corrected'),
  scale: { nl: '≈ 14 nm · MSH2 + MSH6', en: '≈ 14 nm · MSH2 + MSH6' }, time: L3('vlak achter de kopieervork', 'right behind the replication fork'),
  org: L3('mens · PDB 2O8B', 'human · PDB 2O8B'),
  legend: [[COL.msh2, 'MSH2'], [COL.msh6, 'MSH6'], [C.dna, L3('oude streng', 'old strand')], [NEW, L3('nieuwe streng', 'new strand')], [BASE.G, 'G'], [BASE.T, L3('T (fout)', 'T (error)')], ['#ffffff', 'Phe432 (MSH6)']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte kristalstructuur (Warren et al., <i>Mol Cell</i> 2007): de herkenningsklem MutSα (MSH2 + MSH6) op een stuk DNA met een G·T-mispaar. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real crystal structure (Warren et al., <i>Mol Cell</i> 2007): the recognition clamp MutSα (MSH2 + MSH6) on a piece of DNA with a G·T mispair. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'De structuur toont alleen de herkenning. Het proeflezen door de polymerase en de latere stappen (knippen door MutLα, wegnemen door EXO1, opnieuw maken door Pol δ en ligase) zijn niet in deze structuur te zien en worden alleen verteld. In het kristal is geen streng "nieuw"; wij noemen de streng met de T de nieuwe. Een deel van MSH6 (de N-terminale staart) ontbreekt in het kristal.',
    en: 'The structure shows recognition only. Proofreading by the polymerase and the later steps (nicking by MutLα, removal by EXO1, resynthesis by Pol δ and ligase) are not visible in this structure and are only told. In the crystal no strand is "new"; we call the strand with the T the new one. Part of MSH6 (the N-terminal tail) is missing in the crystal.' },
  base,
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: COL.msh2, t: { nl: 'herstelklem', en: 'repair clamp' }, m: ['herstelklem: vangt de fouten die de polymerase miste', 'repair clamp: catches the errors the polymerase missed'], d: { nl: 'Een klem van twee eiwitten die over het DNA glijdt en foute letterparen zoekt die de polymerase over het hoofd zag.', en: 'A clamp of two proteins that slides along the DNA, looking for wrong letter pairs the polymerase missed.' },
      p: { nl: 'MutSα, het heterodimeer MSH2–MSH6 (hier met ADP); herkent basemispairs en kleine insertie-/deletielussen.', en: 'MutSα, the MSH2–MSH6 heterodimer (here with ADP); recognises base mispairs and small insertion/deletion loops.' } },
    { c: COL.msh2, t: { nl: 'deel 1', en: 'part 1' }, d: { nl: 'Het paarse deel van de klem (MSH2).', en: 'The purple part of the clamp (MSH2).' },
      p: { nl: 'MSH2, de subeenheid die ook deel is van MutSβ (MSH2–MSH3).', en: 'MSH2, the subunit that is also part of MutSβ (MSH2–MSH3).' } },
    { c: COL.msh6, t: { nl: 'deel 2', en: 'part 2' }, d: { nl: 'Het lichtblauwe deel van de klem (MSH6). Dit deel voelt de fout.', en: 'The light-blue part of the clamp (MSH6). This part senses the error.' },
      p: { nl: 'MSH6, de subeenheid die het mispaar specifiek contacteert (Phe-X-Glu-motief).', en: 'MSH6, the subunit that specifically contacts the mispair (Phe-X-Glu motif).' } },
    { c: C.dna, t: 'DNA', d: { nl: 'Een kort stuk dubbel DNA (15 letterparen) dat dwars door de klem loopt. Op de plek van de fout is het geknikt.', en: 'A short piece of double DNA (15 letter pairs) running right through the clamp. At the error it is kinked.' },
      p: { nl: '15-bp-duplex met één G·T-mispaar; MutSα knikt het DNA ter hoogte van het mispaar.', en: '15 bp duplex with a single G·T mispair; MutSα kinks the DNA at the mispair.' } },
    { c: C.dna, t: { nl: 'oude streng', en: 'old strand' }, d: { nl: 'De blauwe streng: het origineel. Die blijft heel en dient als voorbeeld om het foute stuk opnieuw te maken.', en: 'The blue strand: the original. It stays intact and serves as the guide for remaking the faulty stretch.' },
      p: { nl: 'Ouderstreng (matrijs); in het kristal is geen streng oud of nieuw, dat is een keuze voor het verhaal.', en: 'Parental (template) strand; in the crystal no strand is old or new, that is a choice for the story.' } },
    { c: NEW, t: { nl: 'nieuwe streng', en: 'new strand' }, d: { nl: 'De turquoise streng: net gekopieerd, en daarin zit de fout. Alleen hier wordt verbeterd.', en: 'The turquoise strand: just copied, and it holds the error. Only this strand is corrected.' },
      p: { nl: 'Dochterstreng; herkend aan onderbrekingen (o.a. uiteinden van Okazaki-fragmenten) en de oriëntatie van PCNA.', en: 'Daughter strand; recognised by discontinuities (e.g. ends of Okazaki fragments) and the orientation of PCNA.' } },
    { c: BASE.G, t: 'G', d: { nl: 'De letter G op de oude streng. Ze hoort tegenover een C te staan.', en: 'The letter G on the old strand. It should sit opposite a C.' },
      p: { nl: 'Guanine van het G·T-mispaar (wobble-paring).', en: 'Guanine of the G·T mispair (wobble pairing).' } },
    { c: BASE.T, t: { nl: 'T (fout)', en: 'T (error)' }, m: ['T'], d: { nl: 'De foute letter T op de nieuwe streng: T past bij A, niet bij G.', en: 'The wrong letter T on the new strand: T fits with A, not with G.' },
      p: { nl: 'Thymine tegenover G: het mispaar dat MutSα herkent.', en: 'Thymine opposite G: the mispair recognised by MutSα.' } },
    { c: '#ffffff', t: { nl: 'vinger', en: 'finger' }, d: { nl: 'Eén bouwsteen van de klem (wit) die in het DNA steekt, precies tegen de foute T. Zo weet de klem waar de fout zit.', en: 'One building block of the clamp (white) that pokes into the DNA, right against the wrong T. That is how the clamp knows where the error is.' },
      p: { nl: 'Phe432 van MSH6 (Phe-X-Glu-motief met Glu434), intercaleert bij het mispaar.', en: 'Phe432 of MSH6 (Phe-X-Glu motif with Glu434), intercalates at the mispair.' } },
    { c: '#ff6b6b', t: { nl: 'weggehaald stuk', en: 'removed stretch' }, m: ['dit stuk (met de fout) gaat eruit', 'this stretch (with the error) is removed', 'opnieuw gemaakt', 'resynthesised stretch'], d: { nl: 'Het stuk van de nieuwe streng met de fout (rood) wordt weggehaald en daarna opnieuw gemaakt (groen), nu juist.', en: 'The stretch of the new strand with the error (red) is removed and then made again (green), now correct.' },
      p: { nl: 'MutLα knipt de nieuwe streng (geactiveerd door PCNA), EXO1 breekt af voorbij het mispaar, Pol δ resynthetiseert en een ligase sluit; niet in deze structuur.', en: 'MutLα nicks the new strand (activated by PCNA), EXO1 degrades past the mispair, Pol δ resynthesises and a ligase seals; not in this structure.' } },
  ],
  steps: [
    { dur: 8000, title: L3('Eerst leest de polymerase zelf na', 'First the polymerase proofreads itself'), focus: null, zoom: {}, tags: [TAG({ chain: ['A', 'B'] }, 'herstelklem: vangt de fouten die de polymerase miste', 'repair clamp: catches the errors the polymerase missed'), TAG({ chain: 'E' }, 'DNA', 'DNA')], spin: .012,
      text: L3('Zet de polymerase een foute letter, dan haalt ze die meestal meteen weg. Hier zie je de hulp voor de zeldzame fout die toch ontsnapt.', 'If the polymerase puts in a wrong letter, it usually removes it at once. Here you see the help for the rare error that still escapes.') },
    { dur: 8000, title: L3('Een klem uit twee delen', 'A clamp made of two parts'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: COL.msh2 } }, label: L3('deel 1', 'part 1') }, { sel: { chain: 'B' }, style: { cartoon: { color: COL.msh6 } }, label: L3('deel 2', 'part 2') }, ...DNA],
      text: L3('Twee eiwitten vormen samen een klem. Die glijdt over het DNA en zoekt foute paren.', 'Two proteins together form a clamp. It slides along the DNA, looking for wrong pairs.') },
    { dur: 8000, title: L3('De klem omsluit het DNA en knikt het', 'The clamp grips the DNA and kinks it'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .45 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .25 } }, label: 'DNA' }, { sel: { chain: 'F' }, style: { cartoon: { color: NEW }, stick: { color: NEW, radius: .25 } } }],
      text: L3('Het DNA loopt dwars door de klem. Op de plek van de fout wordt het geknikt.', 'The DNA runs right through the clamp. At the site of the error it is kinked.') },
    { dur: 9000, title: L3('G tegenover T: dat past niet', 'G opposite T: that does not fit'), zoom: MIS, spin: .005,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .35 } } }, ...DNA, G, Tm],
      text: L3('Na het kopiëren staat hier een G tegenover een T. Een juist paar is G met C, of A met T.', 'After copying, a G sits opposite a T here. A correct pair is G with C, or A with T.') },
    { dur: 9000, title: L3('Een vinger duwt tegen de fout', 'A finger pushes against the error'), zoom: MIS, spin: .005,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .35 } } }, ...DNA, { ...G, label: undefined }, { ...Tm, label: undefined }, PHE],
      text: L3('Eén bouwsteen van de klem steekt in het DNA, precies tegen de foute T. Zo weet de klem waar de fout zit.', 'One building block of the clamp pokes into the DNA, right against the wrong T. That is how the clamp knows where the error is.') },
    { dur: 9000, title: L3('Het foute stuk van de nieuwe streng gaat eruit', 'The faulty stretch of the new strand is removed'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .3 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } }, label: L3('oude streng', 'old strand'), labelSel: { chain: 'E', resi: 1 }, labelColor: C.dna, labelOff: [150, -30] },
        { sel: { chain: 'F' }, style: { cartoon: { color: NEW }, stick: { color: NEW, radius: .2 } } },
        // het weg te halen stuk: van het 5′-uiteinde van F (16) tot voorbij de foute T (F23); EXO1 breekt af vanaf een knip 5′ van de fout
        { sel: CUT, style: { stick: { color: '#ff6b6b', radius: .45 }, sphere: { color: '#ff6b6b', radius: .7 } }, label: L3('dit stuk (met de fout) gaat eruit', 'this stretch (with the error) is removed'), labelColor: '#ff6b6b', labelOff: [-150, -80] }],
      text: L3('Partnereiwitten knippen de nieuwe streng in en halen een stuk met de fout weg. De oude streng blijft heel.', 'Partner proteins nick the new strand and remove a stretch containing the error. The old strand stays intact.') },
    { dur: 9000, title: L3('Opnieuw gemaakt, nu juist', 'Made again, now correct'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .3 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } } },
        { sel: { chain: 'F' }, style: { cartoon: { color: NEW }, stick: { color: NEW, radius: .2 } } },
        { sel: CUT, style: { stick: { color: C.ok, radius: .45 }, sphere: { color: C.ok, radius: .7 } }, label: L3('opnieuw gemaakt', 'resynthesised stretch'), labelColor: C.ok, labelOff: [-150, -80] }],
      text: L3('De polymerase maakt het stuk opnieuw, met de oude streng als voorbeeld. Zo gebeuren er ongeveer honderd keer minder fouten.', 'The polymerase makes the stretch again, using the old strand as a guide. This gives about a hundred times fewer errors.') },
  ],
  hotspots: [
    { node: 'herstel', label: L3('↑ Overzicht herstel', '↑ Repair overview'), color: C.ok },
    { node: 'replisoom', label: L3('Kopieermachine (nalezen)', 'Copying machine (proofreading)'), color: C.prot },
    { node: 'ber', label: L3('Eén beschadigde letter →', 'One damaged letter →'), color: '#7fdc6a' },
    { node: 'mutaties', label: L3('Mutaties', 'Mutations'), color: C.danger },
  ],
});
