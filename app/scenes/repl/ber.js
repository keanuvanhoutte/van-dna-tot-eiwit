import { structure3d } from '../../kit3d.js';
import { C, BASE } from '../../kit.js';

/* PDB 1EMH: menselijk uracil-DNA-glycosylase (UDG, katalytisch domein 82–304) op DNA met een niet-knipbaar substraat (röntgen 1,8 Å; Parikh et al., PNAS 2000).
 * Ketens (nagekeken in het PDB-bestand 05-11-2026): A = UDG · B = 5'-TGT(P2U)ATCTT-3' · C = 5'-AAAGATAACA-3'.
 *  - P2U = 2'-deoxypseudo-uridine (lijkt op dU maar de suikerbinding kan niet geknipt worden), op B5, volledig uit de helix geklapt.
 *  - Binnen 4 Å van P2U: Gln144, Asp145, Pro146, Tyr147, Cys157, Phe158, Pro167–Ser169, Asn204, His268 (de uracilholte). Partner van B5 is A C27. */
const L3 = (nl, en) => ({ nl, en });
const ENZ = '#9b7bff';
const base = [
  { sel: { chain: 'A' }, style: { cartoon: { color: ENZ, opacity: .9 } } },
  { sel: { chain: 'B' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .18 } } },
  { sel: { chain: 'C' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .18 } } },
];
const DNA = [{ sel: { chain: 'B' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .22 } } }, { sel: { chain: 'C' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .22 } } }];
const U = { sel: { chain: 'B', resi: 5 }, style: { stick: { color: BASE.U, radius: .5 }, sphere: { color: BASE.U, radius: .8 } } };
const POCKET = { chain: 'A', resi: [144, 145, 146, 147, 157, 158, 167, 168, 169, 204, 268] };
const GREY = { sel: { chain: 'A' }, style: { cartoon: { color: '#56607a', opacity: .4 } } };

export default structure3d({
  id: 'ber', pdb: '1EMH', format: 'pdb',
  title: L3('Eén beschadigde letter wordt vervangen', 'One damaged letter is replaced'),
  scale: { nl: '≈ 6 nm · één enzym op 10 bp DNA', en: '≈ 6 nm · one enzyme on 10 bp of DNA' }, time: L3('één letter per keer', 'one letter at a time'),
  org: L3('mens · PDB 1EMH', 'human · PDB 1EMH'),
  legend: [[ENZ, L3('uracil-DNA-glycosylase (UDG)', 'uracil-DNA glycosylase (UDG)')], [C.dna, L3('streng met de U', 'strand with the U')], [C.dna2, L3('andere streng', 'other strand')], [BASE.U, L3('uitgeklapte U (pseudo-U)', 'flipped-out U (pseudo-U)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte kristalstructuur (Parikh et al., <i>PNAS</i> 2000): het menselijke enzym dat uracil uit DNA haalt, met de base volledig uit de helix geklapt. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real crystal structure (Parikh et al., <i>PNAS</i> 2000): the human enzyme that removes uracil from DNA, with the base flipped completely out of the helix. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Om het enzym te kunnen "vangen" vóór het knippen gebruikten de onderzoekers een namaak-U (pseudo-uridine) die niet geknipt kan worden. In het kristal staat de U tegenover een A (zoals na het inbouwen van dUTP); na deaminatie van C staat ze tegenover een G. De volgende stappen (APE1, Pol β, ligase) zijn niet in deze structuur te zien en worden alleen verteld. Getoond is het katalytische deel van UNG; de kern- en de mitochondriale vorm verschillen alleen in het begin van de keten.',
    en: 'To "catch" the enzyme before cutting, the researchers used a fake U (pseudouridine) that cannot be cut. In the crystal the U sits opposite an A (as after dUTP incorporation); after deamination of C it sits opposite a G. The next steps (APE1, Pol β, ligase) are not visible in this structure and are only told. Shown is the catalytic part of UNG; the nuclear and mitochondrial forms differ only at the start of the chain.' },
  base,
  steps: [
    { dur: 8000, title: L3('Eén letter is vanzelf veranderd', 'One letter has changed by itself'), focus: null, zoom: {}, spin: .012,
      text: L3('Een C kan vanzelf in een U veranderen. U hoort niet in DNA en geeft bij de volgende kopie een fout.', 'A C can turn into a U by itself. U does not belong in DNA and causes an error at the next copy.') },
    { dur: 8000, title: L3('Een enzym tast het DNA af', 'An enzyme scans the DNA'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: ENZ } }, label: L3('herstelenzym', 'repair enzyme') }, ...DNA],
      text: L3('Dit herstelenzym glijdt over het DNA, op zoek naar een U.', 'This repair enzyme slides along the DNA, looking for a U.') },
    { dur: 9000, title: L3('De foute letter wordt uit het DNA geklapt', 'The wrong letter is flipped out of the DNA'), zoom: { chain: ['B', 'C'] }, spin: .006,
      focus: [GREY, ...DNA, { ...U, label: L3('U, uitgeklapt', 'U, flipped out') }],
      text: L3('Het enzym klapt de U helemaal uit de dubbele helix. De andere letters blijven op hun plaats.', 'The enzyme flips the U right out of the double helix. The other letters stay in place.') },
    { dur: 9000, title: L3('Een holte waar alleen U in past', 'A pocket that only fits U'), zoom: { chain: 'A', resi: [140, 141, 142, 143, 144, 145, 146, 147, 148, 155, 156, 157, 158, 159, 160, 165, 166, 167, 168, 169, 170, 200, 202, 204, 206, 266, 268, 270] }, spin: .005,
      focus: [GREY, { sel: { chain: ['B', 'C'] }, style: { cartoon: { color: '#3c5a99', opacity: .55 } } }, { sel: POCKET, style: { stick: { color: '#c9b8ff', radius: .25 } }, label: L3('holte', 'pocket') }, U],
      text: L3('De U komt in een holte die precies bij U past, niet bij T of C. Daar knipt het enzym de U los.', 'The U lands in a pocket that fits U exactly, not T or C. There the enzyme cuts the U loose.') },
    { dur: 9000, title: L3('Drie helpers maken het af', 'Three helpers finish the job'), zoom: { chain: ['B', 'C'] }, spin: .006,
      focus: [GREY, { sel: { chain: 'B' }, style: { cartoon: { color: C.ok }, stick: { color: C.ok, radius: .25 } }, label: L3('hersteld', 'repaired') }, { sel: { chain: 'C' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }],
      text: L3('Een tweede enzym knipt de streng open, een polymerase zet de juiste letter terug en een ligase plakt dicht.', 'A second enzyme cuts the strand open, a polymerase puts back the right letter and a ligase seals it.') },
    { dur: 8000, title: L3('Kleine schade, snel hersteld', 'Small damage, quickly repaired'), focus: null, zoom: {}, spin: .012,
      text: L3('Zo wordt telkens één beschadigde letter vervangen. Grotere schade vraagt een andere aanpak.', 'This replaces one damaged letter at a time. Bigger damage needs a different approach.') },
  ],
  hotspots: [
    { node: 'herstel', label: L3('↑ Overzicht herstel', '↑ Repair overview'), color: C.ok },
    { node: 'mmr', label: L3('← Kopieerfouten', '← Copying errors'), color: '#5fd3e6' },
    { node: 'ner', label: L3('Grote UV-schade →', 'Bulky UV damage →'), color: '#ffc247' },
    { node: 'basenparing', label: L3('Basenparing', 'Base pairing'), color: C.dna },
  ],
});
