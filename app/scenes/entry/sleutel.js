import { structure3d, ghost } from '../../kit3d.js';

/* PDB 6M0J: receptorbindend domein (RBD) van het SARS-CoV-2-uitsteeksel (spike) op menselijk ACE2 (röntgen 2,45 Å; Lan et al., Nature 2020).
 * Entiteiten (RCSB-API, nagekeken 05-11-2026): 1 = ACE2, keten A (Homo sapiens, res. 19–615) · 2 = spike S1-RBD, keten E (SARS-CoV-2, res. 333–526).
 * Lokale kopie data/pdb/6M0J.cif: ingekort tot CA-atomen (6 406 → 791) en star gedraaid (ACE2 onder, RBD boven = +y).
 * Raakvlak (≤ 4 Å tussen zware atomen, berekend in het volledige RCSB-bestand): 17 RBD-residuen en 20 ACE2-residuen, zoals Lan et al. melden. */
const L3 = (nl, en) => ({ nl, en });
const ACE = '#7fc9b6', RBD = '#ff9d5c', HOT = '#ffd166';
const S = (color, r = 2.6) => ({ sphere: { color, radius: r } });
const IA = [24, 27, 28, 30, 31, 34, 35, 37, 38, 41, 42, 79, 82, 83, 330, 353, 354, 355, 357, 393];
const IE = [417, 446, 449, 453, 455, 456, 475, 486, 487, 489, 493, 496, 498, 500, 501, 502, 505];
/* overzicht zonder dimmen: beide delen gelabeld (wat is sleutel, wat is slot, waar zit virus en cel) */
const OVER = (k = L3('sleutel: top van het virus', 'key: tip of the virus'), l = L3('slot: eiwit op onze cel', 'lock: protein on our cell')) => [
  { sel: { chain: 'A' }, style: S(ACE) }, { sel: { chain: 'E' }, style: S(RBD) },
  { sel: { chain: 'E', resi: 360 }, style: S(RBD), label: k },
  { sel: { chain: 'A', resi: 600 }, style: S(ACE), label: l }];
const base = [{ sel: { chain: 'A' }, style: S(ACE) }, { sel: { chain: 'E' }, style: S(RBD) }];

export default structure3d({
  id: 'sleutel', pdb: '6M0J',
  title: L3('De sleutel past op het slot van onze cel', 'The key fits the lock on our cell'),
  scale: L3('≈ 10 nm (RBD + ACE2)', '≈ 10 nm (RBD + ACE2)'), time: L3('vertraagd getoond (schematisch)', 'shown slowed down (schematic)'),
  org: L3('SARS-CoV-2 op een menselijk eiwit · PDB 6M0J', 'SARS-CoV-2 on a human protein · PDB 6M0J'),
  legend: [[ACE, L3('slot: eiwit op onze cel (ACE2)', 'lock: protein on our cell (ACE2)')], [RBD, L3('sleutel: top van het virusuitsteeksel (RBD)', 'key: tip of the virus spike (RBD)')],
    [HOT, L3('bouwstenen die elkaar raken', 'building blocks that touch')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte röntgenstructuur van de sleuteltop van SARS-CoV-2 op het menselijke eiwit ACE2 (Lan et al., <i>Nature</i> 2020). Elk bolletje is één aminozuur. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real X-ray structure of the SARS-CoV-2 key tip on the human protein ACE2 (Lan et al., <i>Nature</i> 2020). Each bead is one amino acid. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Alleen het bindende topje van één uitsteeksel en het buitenste deel van ACE2 zijn getekend (één bolletje per aminozuur). Een volledig uitsteeksel bestaat uit drie gelijke ketens (een trimeer) en steekt met een stengel uit het virusmembraan; ACE2 zit zelf met een anker in ons celmembraan. Om te binden moet het topje eerst “omhoog” klappen. Na het binden moet een eiwit van de cel het uitsteeksel nog knippen (aan het celoppervlak door TMPRSS2 of in een endosoom door cathepsine L) voordat de membranen versmelten.',
    en: 'Only the binding tip of one spike and the outer part of ACE2 are drawn (one bead per amino acid). A complete spike consists of three identical chains (a trimer) and sticks out of the virus membrane on a stalk; ACE2 itself is anchored in our cell membrane. To bind, the tip must first flip “up”. After binding, a protein of the cell still has to cut the spike (at the cell surface by TMPRSS2 or in an endosome by cathepsin L) before the membranes fuse.' },
  base,
  dimOpacity: false,
  parts: [
    { c: RBD, t: L3('sleutel: top van het virus', 'key: tip of the virus'), m: ['sleutel (top van het uitsteeksel)', 'key (tip of the spike)', '1 van de 3 sleutels (de andere 2 zijn hier niet getekend)', '1 of the 3 keys (the other 2 are not drawn here)', '↑ naar het virus', '↑ towards the virus'], d: L3('Het oranje deel: het topje van een uitsteeksel van het coronavirus. Het past als een sleutel op het slot van onze cel.', 'The orange part: the tip of a spike of the coronavirus. It fits like a key into the lock on our cell.'),
      p: L3('Receptorbindend domein (RBD, res. 333–526) van het S1-deel van het spike-eiwit; een spike is een trimeer met drie RBD’s.', 'Receptor-binding domain (RBD, res. 333–526) of the S1 subunit of the spike protein; a spike is a trimer with three RBDs.') },
    { c: ACE, t: L3('slot: eiwit op onze cel', 'lock: protein on our cell'), m: ['slot (eiwit van de cel)', 'lock (protein of the cell)', '↓ naar onze cel (hier versmelten straks de membranen)', '↓ towards our cell (where the membranes will fuse)'], d: L3('Het groene deel: een eiwit op onze cellen, onder meer in neus, longen en darm. Voor het virus is het het slot.', 'The green part: a protein on our cells, for example in the nose, lungs and gut. For the virus it is the lock.'),
      p: L3('Extracellulair peptidasedomein van humaan ACE2 (res. 19–615), de receptor van SARS-CoV-2.', 'Extracellular peptidase domain of human ACE2 (res. 19–615), the receptor of SARS-CoV-2.') },
    { c: HOT, t: L3('raakvlak', 'contact surface'), d: L3('De gele bolletjes: de bouwstenen waar sleutel en slot elkaar raken, 17 van de sleutel en 20 van het slot.', 'The yellow beads: the building blocks where key and lock touch, 17 on the key and 20 on the lock.'),
      p: L3('Bindingsinterface: 17 RBD- en 20 ACE2-residuen binnen 4 Å (Lan et al. 2020).', 'Binding interface: 17 RBD and 20 ACE2 residues within 4 Å (Lan et al. 2020).') },
  ],
  steps: [
    { dur: 8000, title: L3('De sleutel past op het slot van onze cel', 'The key fits the lock on our cell'), focus: OVER(), zoom: {}, spin: .012, pad: .7,
      text: L3('Dit is een echt stukje coronavirus (oranje) vast op een eiwit van onze cel (groen).', 'This is a real piece of coronavirus (orange) stuck to a protein of our cell (green).') },
    { dur: 8500, title: L3('Het slot zit op onze cel', 'The lock sits on our cell'), zoom: { chain: 'A' }, spin: .01,
      focus: [{ sel: { chain: 'E' }, style: ghost(4, .12) }, { sel: { chain: 'A' }, style: S(ACE, 2.8) }, { sel: { chain: 'A', resi: 600 }, style: S(ACE, 2.8), label: L3('slot (eiwit van de cel)', 'lock (protein of the cell)') }],
      text: L3('Dit eiwit zit op cellen in onder meer de neus, de longen en de darm. Voor het virus is het een slot.', 'This protein sits on cells in the nose, the lungs and the gut, among other places. For the virus it is a lock.') },
    { dur: 8500, title: L3('De sleutel zit op het virus', 'The key sits on the virus'), zoom: { chain: 'E' }, spin: .01, pad: .7,
      focus: [{ sel: { chain: 'A' }, style: ghost(4, .12) }, { sel: { chain: 'E' }, style: S(RBD, 3) }, { sel: { chain: 'E', resi: 360 }, style: S(RBD, 3), label: L3('sleutel (top van het uitsteeksel)', 'key (tip of the spike)') }],
      text: L3('Het virus is bedekt met uitsteeksels. Alleen het topje ervan past op het slot.', 'The virus is covered in spikes. Only their tip fits the lock.') },
    { dur: 9000, title: L3('Sleutel en slot passen precies', 'Key and lock fit exactly'), zoom: { chain: 'A', resi: IA }, spin: .006, pad: .75,
      focus: [{ sel: { chain: 'A' }, style: S(ACE, 2) }, { sel: { chain: 'E' }, style: S(RBD, 2) },
        { sel: { chain: 'E', resi: IE }, style: S(HOT, 3.4) }, { sel: { chain: 'A', resi: IA }, style: S(HOT, 3.4) }, { sel: { chain: 'E', resi: 493 }, style: S(HOT, 3.4), label: L3('raakvlak', 'contact surface') }],
      text: L3('Op het raakvlak passen 17 bouwstenen van de sleutel op 20 bouwstenen van het slot.', 'At the contact surface, 17 building blocks of the key fit onto 20 building blocks of the lock.') },
    { dur: 8500, title: L3('Een uitsteeksel heeft drie sleutels', 'A spike has three keys'), zoom: {}, spin: .012, pad: .9,
      focus: [{ sel: { chain: 'A' }, style: ghost(4, .12) }, { sel: { chain: 'E' }, style: S(RBD, 3) },
        { sel: { chain: 'E', resi: 360 }, style: S(RBD, 3), label: L3('1 van de 3 sleutels (de andere 2 zijn hier niet getekend)', '1 of the 3 keys (the other 2 are not drawn here)') }],
      text: L3('Een heel uitsteeksel bestaat uit drie gelijke delen, elk met zo’n sleuteltop. Hier zie je er één.', 'A whole spike consists of three identical parts, each with such a key tip. Here you see one of them.') },
    { dur: 9000, title: L3('Daarna versmelt het virus met de cel', 'Then the virus fuses with the cell'), zoom: {}, spin: .01, pad: .9,
      focus: OVER(L3('↑ naar het virus', '↑ towards the virus'), L3('↓ naar onze cel (hier versmelten straks de membranen)', '↓ towards our cell (where the membranes will fuse)')),
      text: L3('Een eiwit van de cel knipt het uitsteeksel, aan de buitenkant of in een blaasje. Dan versmelt het virusmembraan met de cel.', 'A protein of the cell cuts the spike, on the outside or in a vesicle. Then the virus membrane fuses with the cell.') },
  ],
  hotspots: [
    { node: 'virus', label: L3('↑ Hoe virussen binnenkomen', '↑ How viruses get in'), color: '#ff9d5c' },
    { node: 'endocytose', label: L3('De weg via een blaasje →', 'The way through a vesicle →'), color: '#c9a574' },
    { node: 'viruskopie', label: L3('Binnen: het RNA aan het werk →', 'Inside: the RNA at work →'), color: '#ff8a3d' },
    { node: 'lnp', label: L3('Het mRNA-vaccin', 'The mRNA vaccine'), color: '#e8c27a' },
  ],
});
