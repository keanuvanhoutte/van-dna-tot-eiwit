import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 1TUP: drie kerndomeinen van menselijk p53 (A 94–289, B 96–289, C 95–289) op DNA (E, F; 21 bp), röntgen 2,2 Å (Cho et al., Science 1994).
 * Nagekeken in het PDB-bestand (05-11-2026): keten B maakt de meeste DNA-contacten (binnen 3,6 Å: K120, S241, R248, R273, A276, C277, R280);
 * A en C raken het DNA maar op enkele plaatsen. Zink: A951, B952, C953 (één per kerndomein).
 * Hotspots volgens Olivier et al. 2010: contactmutanten R248, R273; structurele mutanten R175, G245, R249, R282. */
const L3 = (nl, en) => ({ nl, en });
const P = '#9b7bff', P2 = '#6f6aa8';
const base = [
  { sel: { chain: 'B' }, style: { cartoon: { color: P, opacity: .95 } } },
  { sel: { chain: ['A', 'C'] }, style: { cartoon: { color: P2, opacity: .85 } } },
  { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .15 } } },
  { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .15 } } },
  { sel: { resn: 'ZN' }, style: { sphere: { color: '#b0b8c8', radius: 1.2 } } },
];
const DNA = [{ sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .22 } } }, { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .22 } } }];
const B = { sel: { chain: 'B' }, style: { cartoon: { color: P } } };
const OTHER = { sel: { chain: ['A', 'C'] }, style: { cartoon: { color: '#56607a', opacity: .35 } } };

export default structure3d({
  id: 'p53', pdb: '1TUP', format: 'pdb',
  title: L3('p53 beslist: eerst herstellen, of stoppen', 'p53 decides: repair first, or stop'),
  scale: { nl: '≈ 10 nm · drie p53-kerndomeinen op 21 bp DNA', en: '≈ 10 nm · three p53 core domains on 21 bp of DNA' }, time: L3('na DNA-schade', 'after DNA damage'),
  org: L3('mens · PDB 1TUP', 'human · PDB 1TUP'),
  legend: [[P, L3('p53-kerndomein (bindt de herkenningsplaats)', 'p53 core domain (binds the recognition site)')], [P2, L3('andere p53-kerndomeinen', 'other p53 core domains')], [C.dna, 'DNA'], ['#b0b8c8', L3('zink', 'zinc')], [C.danger, L3('vaak gemuteerd in kanker', 'often mutated in cancer')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte kristalstructuur (Cho et al., <i>Science</i> 1994): het DNA-bindende kerndomein van p53 op een p53-herkenningsplaats. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real crystal structure (Cho et al., <i>Science</i> 1994): the DNA-binding core domain of p53 on a p53 recognition site. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Alleen het kerndomein van p53 is te zien (ongeveer residu 94–289); de rest van het eiwit (activatiedeel, tetramerisatiedomein, staart) ontbreekt. In de cel bindt p53 als tetrameer (vier ketens); in dit kristal zitten drie kerndomeinen, waarvan één de herkenningsplaats echt vastgrijpt. De signaalketen (ATM/ATR, MDM2, p21, apoptose) is niet in de structuur te zien en wordt alleen verteld.',
    en: 'Only the core domain of p53 is shown (about residues 94–289); the rest of the protein (activation part, tetramerisation domain, tail) is missing. In the cell p53 binds as a tetramer (four chains); this crystal holds three core domains, one of which really grips the recognition site. The signalling chain (ATM/ATR, MDM2, p21, apoptosis) is not visible in the structure and is only told.' },
  base,
  steps: [
    { dur: 8000, title: L3('De bewaker van het genoom', 'The guardian of the genome'), focus: null, zoom: {}, spin: .012,
      text: L3('p53 is een eiwit dat alarm slaat bij DNA-schade. Hier zit het vast op een stuk DNA.', 'p53 is a protein that raises the alarm when DNA is damaged. Here it is bound to a piece of DNA.') },
    { dur: 9000, title: L3('Schade zet het alarm aan', 'Damage switches on the alarm'), zoom: {}, spin: .012,
      focus: [OTHER, ...DNA, { ...B, label: 'p53' }],
      text: L3('Bij een breuk zetten alarm-enzymen een merkteken op p53. Daardoor wordt p53 niet meer afgebroken en stapelt het zich op.', 'At a break, alarm enzymes put a mark on p53. Then p53 is no longer broken down and builds up.') },
    { dur: 9000, title: L3('p53 grijpt een vaste plek op het DNA', 'p53 grips a fixed spot on the DNA'), zoom: { chain: ['B', 'E', 'F'] }, spin: .008,
      focus: [OTHER, { sel: { chain: 'E' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .25 } }, label: L3('herkenningsplaats', 'recognition site') }, { sel: { chain: 'F' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .25 } } }, B],
      text: L3('p53 bindt een vaste volgorde vlak bij bepaalde genen. Zo zet het die genen aan.', 'p53 binds a fixed sequence close to certain genes. That is how it switches those genes on.') },
    { dur: 9000, title: L3('Eerst pauzeren en herstellen', 'First pause and repair'), zoom: {}, spin: .01,
      focus: [OTHER, ...DNA, { ...B, label: L3('zet de rem aan', 'applies the brake') }],
      text: L3('Een van die genen maakt een rem op de celdeling. Zo krijgt de cel tijd om het DNA te herstellen.', 'One of those genes makes a brake on cell division. This gives the cell time to repair the DNA.') },
    { dur: 9000, title: L3('Te veel schade: de cel ruimt zichzelf op', 'Too much damage: the cell clears itself away'), focus: null, zoom: {}, spin: .012,
      text: L3('Is de schade te groot, dan zet p53 genen aan waardoor de cel sterft. Zo geeft ze de schade niet door.', 'If the damage is too great, p53 switches on genes that make the cell die. That way it does not pass on the damage.') },
    { dur: 8000, title: L3('Een zinkatoom houdt de grijper in vorm', 'A zinc atom keeps the gripper in shape'), zoom: { chain: 'B', resi: [176, 179, 238, 242] }, spin: .006,
      focus: [OTHER, ...DNA, B, { sel: { chain: 'B', resn: 'ZN' }, style: { sphere: { color: '#d9e0ee', radius: 1.6 } }, label: L3('zink', 'zinc') }],
      text: L3('Twee lussen die het DNA raken, worden bij elkaar gehouden door één zinkatoom.', 'Two loops that touch the DNA are held together by a single zinc atom.') },
    { dur: 9000, title: L3('Kankermutaties raken de grijper', 'Cancer mutations hit the gripper'), zoom: { chain: ['B', 'E', 'F'] }, spin: .006,
      focus: [OTHER, ...DNA, { sel: { chain: 'B' }, style: { cartoon: { color: P, opacity: .6 } } },
        { sel: { chain: 'B', resi: 248 }, style: { stick: { color: C.danger, radius: .45 } }, label: 'R248' }, { sel: { chain: 'B', resi: 273 }, style: { stick: { color: C.danger, radius: .45 } }, label: 'R273' },
        { sel: { chain: 'B', resi: 175 }, style: { stick: { color: '#ff9e9e', radius: .4 } }, label: 'R175' }],
      text: L3('Het gen voor p53 is het vaakst veranderde gen bij kanker. Veel fouten raken juist de plekken die het DNA vastpakken.', 'The gene for p53 is the most often changed gene in cancer. Many errors hit exactly the spots that hold the DNA.') },
  ],
  hotspots: [
    { node: 'herstel', label: L3('↑ Overzicht herstel', '↑ Repair overview'), color: C.ok },
    { node: 'dsb', label: L3('← Breuk in het DNA', '← Break in the DNA'), color: '#ff8a3d' },
    { node: 'mutaties', label: L3('Mutaties →', 'Mutations →'), color: C.danger },
    { node: 'p53', href: '../atlas/index.html?pdb=1TUP', label: L3('Bekijk p53 in 3D ↗', 'View p53 in 3D ↗'), color: '#7cc4ff' },
  ],
});
