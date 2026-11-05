import { structure3d } from '../../kit3d.js';
import { C, BASE } from '../../kit.js';

/* PDB 2O8B: menselijk MutSα (MSH2–MSH6) met ADP op DNA met een G·T-mispaar (röntgen 2,75 Å; Warren et al., Mol Cell 2007).
 * Ketens (nagekeken in het PDB-bestand 05-11-2026): A = MSH2 (1–855) · B = MSH6 (362–1335) · E en F = DNA (15 nt elk).
 *  - E 5'-GAACCGCGCGCTAGG-3' en F 5'-CCTAGCGTGCGGTTC-3' paren antiparallel; het enige mispaar is G E8 · T F23.
 *  - Phe432 van MSH6 (keten B) ligt binnen 4 Å van E7, E8, F23 en F24: het "Phe-X-Glu"-motief (met Glu434) tegen het mispaar.
 *  - Voor het verhaal noemen we streng F (met de T) de nieuwe streng; in het kristal is er geen oude of nieuwe streng. */
const L3 = (nl, en) => ({ nl, en });
const COL = { msh2: '#9b7bff', msh6: '#5fd3e6' };
const base = [
  { sel: { chain: 'A' }, style: { cartoon: { color: COL.msh2, opacity: .9 } } },
  { sel: { chain: 'B' }, style: { cartoon: { color: COL.msh6, opacity: .9 } } },
  { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .15 } } },
  { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .15 } } },
];
const DNA = [{ sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .22 } } }, { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .22 } } }];
const G = { sel: { chain: 'E', resi: 8 }, style: { stick: { color: BASE.G, radius: .4 } }, label: 'G' };
const Tm = { sel: { chain: 'F', resi: 23 }, style: { stick: { color: BASE.T, radius: .4 } }, label: 'T' };
const PHE = { sel: { chain: 'B', resi: 432 }, style: { stick: { color: '#ffffff', radius: .45 } }, label: L3('vinger', 'finger') };
const MIS = { chain: ['E', 'F'], resi: [4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27] };   // ruim rond het mispaar (E8 · F23)

export default structure3d({
  id: 'mmr', pdb: '2O8B', format: 'pdb',
  title: L3('Kopieerfouten worden nagelezen en verbeterd', 'Copying errors are proofread and corrected'),
  scale: { nl: '≈ 14 nm · MSH2 + MSH6', en: '≈ 14 nm · MSH2 + MSH6' }, time: L3('vlak achter de kopieervork', 'right behind the replication fork'),
  org: L3('mens · PDB 2O8B', 'human · PDB 2O8B'),
  legend: [[COL.msh2, 'MSH2'], [COL.msh6, 'MSH6'], [C.dna, L3('oude streng', 'old strand')], [C.dna2, L3('nieuwe streng', 'new strand')], [BASE.G, 'G'], [BASE.T, L3('T (fout)', 'T (error)')], ['#ffffff', 'Phe432 (MSH6)']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte kristalstructuur (Warren et al., <i>Mol Cell</i> 2007): de herkenningsklem MutSα (MSH2 + MSH6) op een stuk DNA met een G·T-mispaar. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real crystal structure (Warren et al., <i>Mol Cell</i> 2007): the recognition clamp MutSα (MSH2 + MSH6) on a piece of DNA with a G·T mispair. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'De structuur toont alleen de herkenning. Het proeflezen door de polymerase en de latere stappen (knippen door MutLα, wegnemen door EXO1, opnieuw maken door Pol δ en ligase) zijn niet in deze structuur te zien en worden alleen verteld. In het kristal is geen streng "nieuw"; wij noemen de streng met de T de nieuwe. Een deel van MSH6 (de N-terminale staart) ontbreekt in het kristal.',
    en: 'The structure shows recognition only. Proofreading by the polymerase and the later steps (nicking by MutLα, removal by EXO1, resynthesis by Pol δ and ligase) are not visible in this structure and are only told. In the crystal no strand is "new"; we call the strand with the T the new one. Part of MSH6 (the N-terminal tail) is missing in the crystal.' },
  base,
  steps: [
    { dur: 8000, title: L3('Eerst leest de polymerase zelf na', 'First the polymerase proofreads itself'), focus: null, zoom: {}, spin: .012,
      text: L3('Zet de polymerase een foute letter, dan haalt ze die meestal meteen weg. Hier zie je de hulp voor de zeldzame fout die toch ontsnapt.', 'If the polymerase puts in a wrong letter, it usually removes it at once. Here you see the help for the rare error that still escapes.') },
    { dur: 8000, title: L3('Een klem uit twee delen', 'A clamp made of two parts'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: COL.msh2 } }, label: L3('deel 1', 'part 1') }, { sel: { chain: 'B' }, style: { cartoon: { color: COL.msh6 } }, label: L3('deel 2', 'part 2') }, ...DNA],
      text: L3('Twee eiwitten vormen samen een klem. Die glijdt over het DNA en zoekt foute paren.', 'Two proteins together form a clamp. It slides along the DNA, looking for wrong pairs.') },
    { dur: 8000, title: L3('De klem omsluit het DNA en knikt het', 'The clamp grips the DNA and kinks it'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .45 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .25 } }, label: 'DNA' }, { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .25 } } }],
      text: L3('Het DNA loopt dwars door de klem. Op de plek van de fout wordt het geknikt.', 'The DNA runs right through the clamp. At the site of the error it is kinked.') },
    { dur: 9000, title: L3('G tegenover T: dat past niet', 'G opposite T: that does not fit'), zoom: MIS, spin: .005,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .35 } } }, ...DNA, G, Tm],
      text: L3('Na het kopiëren staat hier een G tegenover een T. Een juist paar is G met C, of A met T.', 'After copying, a G sits opposite a T here. A correct pair is G with C, or A with T.') },
    { dur: 9000, title: L3('Een vinger duwt tegen de fout', 'A finger pushes against the error'), zoom: MIS, spin: .005,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .35 } } }, ...DNA, { ...G, label: undefined }, { ...Tm, label: undefined }, PHE],
      text: L3('Eén bouwsteen van de klem steekt in het DNA, precies tegen de foute T. Zo weet de klem waar de fout zit.', 'One building block of the clamp pokes into the DNA, right against the wrong T. That is how the clamp knows where the error is.') },
    { dur: 9000, title: L3('Het foute stuk van de nieuwe streng gaat eruit', 'The faulty stretch of the new strand is removed'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .3 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } }, label: L3('oude streng', 'old strand') },
        { sel: { chain: 'F' }, style: { stick: { color: C.danger, radius: .35 } }, label: L3('nieuwe streng', 'new strand') }],
      text: L3('Partnereiwitten knippen de nieuwe streng in en halen een stuk met de fout weg. De oude streng blijft heel.', 'Partner proteins nick the new strand and remove a stretch containing the error. The old strand stays intact.') },
    { dur: 9000, title: L3('Opnieuw gemaakt, nu juist', 'Made again, now correct'), zoom: { chain: ['E', 'F'] }, spin: .008,
      focus: [{ sel: { chain: ['A', 'B'] }, style: { cartoon: { color: '#56607a', opacity: .3 } } }, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } } },
        { sel: { chain: 'F' }, style: { stick: { color: C.ok, radius: .35 } }, label: L3('opnieuw gemaakt', 'made again') }],
      text: L3('De polymerase maakt het stuk opnieuw, met de oude streng als voorbeeld. Zo gebeuren er ongeveer honderd keer minder fouten.', 'The polymerase makes the stretch again, using the old strand as a guide. This gives about a hundred times fewer errors.') },
  ],
  hotspots: [
    { node: 'herstel', label: L3('↑ Overzicht herstel', '↑ Repair overview'), color: C.ok },
    { node: 'replisoom', label: L3('Kopieermachine (nalezen)', 'Copying machine (proofreading)'), color: C.prot },
    { node: 'ber', label: L3('Eén beschadigde letter →', 'One damaged letter →'), color: '#7fdc6a' },
    { node: 'mutaties', label: L3('Mutaties', 'Mutations'), color: C.danger },
  ],
});
