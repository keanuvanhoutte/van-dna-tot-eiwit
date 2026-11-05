import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 7W1Y: menselijke MCM2-7-dubbelhexameer op DNA (cryo-EM 2,59 Å; Li et al., Cell 2023).
 * Lokale kopie data/pdb/7W1Y.cif is ingekort tot CA- en P-atomen (68 655 → 8 232 atomen, alternatieve conformatie A), daarom een bolletjesmodel.
 * Ketens (auth, nagekeken in het mmCIF 05-11-2026; entiteit = subeenheid):
 *   ring 1: 2 = MCM2 · 3 = MCM3 · 4 = MCM4 · 5 = MCM5 · 6 = MCM6 · 7 = MCM7   (zwaartepunten z ≈ 166–177 Å)
 *   ring 2: A = MCM2 · B = MCM3 · C = MCM4 · D = MCM5 · E = MCM6 · F = MCM7   (z ≈ 267–278 Å)
 *   DNA: O en S (49 nt elk, polyAT/polyTA), loopt door beide ringen. */
const L3 = (nl, en) => ({ nl, en });
const R1 = ['2', '3', '4', '5', '6', '7'], R2 = ['A', 'B', 'C', 'D', 'E', 'F'], DNA = ['O', 'S'];
const SUB = ['#9b7bff', '#5fd3e6', '#7fdc6a', '#ffc247', '#ff8a3d', '#e0708f'];      // MCM2 … MCM7
const RING1 = '#8f86ff', RING2 = '#4fc3d9';
const T = (color, r = 2.2) => ({ sphere: { color, radius: r } });
const FADE = chains => ({ sel: { chain: chains }, style: { sphere: { color: '#33415c', radius: .9 } } });
const bySub = (ring, r = 2.2) => ring.map((ch, i) => ({ sel: { chain: ch }, style: T(SUB[i], r) }));
const dnaS = (r = 2.6) => [{ sel: { chain: 'O' }, style: T(C.dna, r) }, { sel: { chain: 'S' }, style: T(C.dna2, r) }];
const base = [...bySub(R1), ...bySub(R2), ...dnaS()];

export default structure3d({
  id: 'origins', pdb: '7W1Y',
  title: L3('Elke startplaats vertrekt maar één keer', 'Each starting point fires only once'),
  scale: { nl: '≈ 24 nm lang (met DNA) · 12 eiwitketens', en: '≈ 24 nm long (with DNA) · 12 protein chains' }, time: L3('klaarleggen in G1, vertrekken in de S-fase', 'loaded in G1, fired in S phase'),
  org: L3('mens · PDB 7W1Y', 'human · PDB 7W1Y'),
  legend: [[SUB[0], 'MCM2'], [SUB[1], 'MCM3'], [SUB[2], 'MCM4'], [SUB[3], 'MCM5'], [SUB[4], 'MCM6'], [SUB[5], 'MCM7'], [C.dna, L3('DNA-streng 1', 'DNA strand 1')], [C.dna2, L3('DNA-streng 2', 'DNA strand 2')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur (Li et al., <i>Cell</i> 2023): twee MCM2-7-ringen kop aan kop rond een stuk menselijk DNA, het "pre-replicatiecomplex". Om snel te laden toont de figuur één bolletje per bouwsteen. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure (Li et al., <i>Cell</i> 2023): two MCM2-7 rings head to head around a piece of human DNA, the "pre-replication complex". To load quickly, the figure shows one bead per building block. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Alleen de ruggengraat is getekend (één bolletje per aminozuur of nucleotide). De structuur toont de geladen, nog inactieve dubbelhexameer; het activeren tot twee CMG-helicasen (met Cdc45 en GINS) en het uit elkaar lopen zijn niet in deze structuur te zien en worden alleen verteld. Het DNA is een kort proefstuk (49 bp); in de cel ligt de ring op chromatine.',
    en: 'Only the backbone is drawn (one bead per amino acid or nucleotide). The structure shows the loaded, still inactive double hexamer; activation into two CMG helicases (with Cdc45 and GINS) and their moving apart are not visible in this structure and are only told. The DNA is a short test piece (49 bp); in the cell the ring sits on chromatin.' },
  base,
  dimOpacity: false,
  rotate: [['x', 90]],                       // de lange as van de dubbelhexameer (z) verticaal: ringen boven elkaar, DNA verticaal
  steps: [
    { dur: 8000, title: L3('Kopiëren begint op vaste startplaatsen', 'Copying begins at fixed starting points'), focus: null, zoom: {}, spin: .01,
      text: L3('Op duizenden plaatsen in ons DNA ligt zo’n machine klaar. Hier zie je er één, rond een echt stuk DNA.', 'At thousands of places in our DNA such a machine lies ready. Here you see one, around a real piece of DNA.') },
    { dur: 8000, title: L3('Zes verschillende eiwitten vormen één ring', 'Six different proteins form one ring'), zoom: { chain: R1 }, spin: .01,
      focus: [FADE([...R2]), ...dnaS(1.6), ...bySub(R1, 2.6), { sel: { chain: '4' }, style: T(SUB[2], 2.6), label: L3('ring van 6', 'ring of 6') }],
      text: L3('Elke kleur is een ander eiwit. Samen vormen ze een ring rond het DNA.', 'Each colour is a different protein. Together they form a ring around the DNA.') },
    { dur: 8000, title: L3('Twee ringen, kop aan kop', 'Two rings, head to head'), zoom: {}, spin: .01,
      focus: [...dnaS(1.6), { sel: { chain: R1 }, style: T(RING1, 2.4) }, { sel: { chain: '5' }, style: T(RING1, 2.4), label: L3('ring 1', 'ring 1') },
        { sel: { chain: R2 }, style: T(RING2, 2.4) }, { sel: { chain: 'D' }, style: T(RING2, 2.4), label: L3('ring 2', 'ring 2') }],
      text: L3('In de eerste fase van de celcyclus (G1) worden twee ringen rond het DNA gelegd. Ze raken elkaar in het midden.', 'In the first phase of the cell cycle (G1) two rings are placed around the DNA. They touch in the middle.') },
    { dur: 9000, title: L3('Het DNA loopt door beide ringen', 'The DNA runs through both rings'), zoom: { chain: DNA }, spin: .008,
      focus: [FADE([...R1, ...R2]), { sel: { chain: 'O' }, style: T(C.dna, 3), label: 'DNA' }, { sel: { chain: 'S' }, style: T(C.dna2, 3) }],
      text: L3('Het dubbele DNA zit in het gat van beide ringen. Waar de ringen elkaar raken, is het al een beetje opengeduwd.', 'The double-stranded DNA sits in the hole of both rings. Where the rings meet, it is already pushed open a little.') },
    { dur: 8000, title: L3('Klaar, maar nog uit', 'Ready, but still switched off'), zoom: {}, spin: .01,
      focus: [...bySub(R1, 1.9), ...bySub(R2, 1.9), ...dnaS(2.8), { sel: { chain: 'O', resi: 25 }, style: T(C.dna, 2.8), label: L3('klaargelegd', 'loaded') }],
      text: L3('Zo ligt de machine klaar, maar ze doet nog niets. Dit klaarleggen heet licentie.', 'This is how the machine lies ready, but it does nothing yet. This loading is called licensing.') },
    { dur: 9000, title: L3('Startsein: elke ring wordt een rits', 'Go signal: each ring becomes a zipper'), zoom: {}, spin: .01,
      focus: [...dnaS(1.8), { sel: { chain: R1 }, style: T(RING1, 2.4) }, { sel: { chain: '5' }, style: T(RING1, 2.4), label: L3('rits 1', 'zipper 1') },
        { sel: { chain: R2 }, style: T(RING2, 2.4) }, { sel: { chain: 'D' }, style: T(RING2, 2.4), label: L3('rits 2', 'zipper 2') }],
      text: L3('Pas in de kopieerfase zetten enzymen de ringen aan. Elke ring wordt dan een rits die het DNA openritst.', 'Only in the copying phase do enzymes switch the rings on. Each ring then becomes a zipper that unzips the DNA.') },
    { dur: 9000, title: L3('De twee ritsen lopen uit elkaar', 'The two zippers move apart'), zoom: {}, spin: .01,
      focus: [...dnaS(1.8), { sel: { chain: R1 }, style: T(RING1, 2.4) }, { sel: { chain: '5' }, style: T(RING1, 2.4), label: L3('vork 1', 'fork 1') },
        { sel: { chain: R2 }, style: T(RING2, 2.4) }, { sel: { chain: 'D' }, style: T(RING2, 2.4), label: L3('vork 2', 'fork 2') }],
      text: L3('Elke rits omsluit dan één streng en ze vertrekken in tegengestelde richting. Zo krijgt elke startplaats twee kopieervorken.', 'Each zipper then encircles one strand and they set off in opposite directions. This way each starting point gets two copying forks.') },
    { dur: 9000, title: L3('Maar één keer per celcyclus', 'Only once per cell cycle'), focus: null, zoom: {}, spin: .012,
      text: L3('Na het vertrek kunnen er tot na de celdeling geen nieuwe ringen geladen worden. Zo wordt elk stuk DNA maar één keer gekopieerd.', 'After they leave, no new rings can be loaded until after cell division. So each piece of DNA is copied only once.') },
  ],
  hotspots: [
    { node: 'replicatie', label: L3('↑ Replicatie (overzicht)', '↑ Replication (overview)'), color: C.dna },
    { node: 'replisoom', label: L3('De kopieermachine →', 'The copying machine →'), color: C.prot },
    { node: 'breplicatie', label: L3('Vergelijk: bacterie (1 startplaats)', 'Compare: bacterium (1 starting point)'), color: '#d65a5a' },
  ],
});
