import { structure3d } from '../../kit3d.js';

/* PDB 6M0J: receptorbindend domein (RBD) van het SARS-CoV-2-uitsteeksel (spike) op menselijk ACE2 (röntgen 2,45 Å; Lan et al., Nature 2020).
 * Entiteiten (RCSB-API, nagekeken 05-11-2026): 1 = ACE2, keten A (Homo sapiens, res. 19–615) · 2 = spike S1-RBD, keten E (SARS-CoV-2, res. 333–526).
 * Lokale kopie data/pdb/6M0J.cif: ingekort tot CA-atomen (6 406 → 791) en star gedraaid (ACE2 onder, RBD boven = +y).
 * Raakvlak (≤ 4 Å tussen zware atomen, berekend in het volledige RCSB-bestand): 17 RBD-residuen en 20 ACE2-residuen, zoals Lan et al. melden. */
const L3 = (nl, en) => ({ nl, en });
const ACE = '#7fc9b6', RBD = '#ff9d5c', HOT = '#ffd166', GREY = '#33415c';
const S = (color, r = 2.6) => ({ sphere: { color, radius: r } });
const IA = [24, 27, 28, 30, 31, 34, 35, 37, 38, 41, 42, 79, 82, 83, 330, 353, 354, 355, 357, 393];
const IE = [417, 446, 449, 453, 455, 456, 475, 486, 487, 489, 493, 496, 498, 500, 501, 502, 505];
const base = [{ sel: { chain: 'A' }, style: S(ACE) }, { sel: { chain: 'E' }, style: S(RBD) }];

export default structure3d({
  id: 'sleutel', pdb: '6M0J',
  title: L3('De sleutel past op het slot van onze cel', 'The key fits the lock on our cell'),
  scale: L3('≈ 10 nm (RBD + ACE2)', '≈ 10 nm (RBD + ACE2)'), time: L3('binden: een fractie van een seconde', 'binding: a fraction of a second'),
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
  steps: [
    { dur: 8000, title: L3('De sleutel past op het slot van onze cel', 'The key fits the lock on our cell'), focus: null, zoom: {}, spin: .012,
      text: L3('Dit is een echt stukje coronavirus (oranje) vast op een eiwit van onze cel (groen).', 'This is a real piece of coronavirus (orange) stuck to a protein of our cell (green).') },
    { dur: 8500, title: L3('Het slot zit op onze cel', 'The lock sits on our cell'), zoom: { chain: 'A' }, spin: .01,
      focus: [{ sel: { chain: 'E' }, style: S(GREY, 1.6) }, { sel: { chain: 'A' }, style: S(ACE, 2.8) }, { sel: { chain: 'A', resi: 600 }, style: S(ACE, 2.8), label: L3('slot (eiwit van de cel)', 'lock (protein of the cell)') }],
      text: L3('Dit eiwit zit op cellen in onder meer de neus, de longen en de darm. Voor het virus is het een slot.', 'This protein sits on cells in the nose, the lungs and the gut, among other places. For the virus it is a lock.') },
    { dur: 8500, title: L3('De sleutel zit op het virus', 'The key sits on the virus'), zoom: { chain: 'E' }, spin: .01,
      focus: [{ sel: { chain: 'A' }, style: S(GREY, 1.6) }, { sel: { chain: 'E' }, style: S(RBD, 3) }, { sel: { chain: 'E', resi: 360 }, style: S(RBD, 3), label: L3('sleutel (top van het uitsteeksel)', 'key (tip of the spike)') }],
      text: L3('Het virus is bedekt met uitsteeksels. Alleen het topje ervan past op het slot.', 'The virus is covered in spikes. Only their tip fits the lock.') },
    { dur: 9000, title: L3('Sleutel en slot passen precies', 'Key and lock fit exactly'), zoom: { chain: 'A', resi: IA }, spin: .006,
      focus: [{ sel: { chain: 'A' }, style: S(ACE, 2) }, { sel: { chain: 'E' }, style: S(RBD, 2) },
        { sel: { chain: 'E', resi: IE }, style: S(HOT, 3.4) }, { sel: { chain: 'A', resi: IA }, style: S(HOT, 3.4) }, { sel: { chain: 'E', resi: 493 }, style: S(HOT, 3.4), label: L3('raakvlak', 'contact surface') }],
      text: L3('Op het raakvlak passen 17 bouwstenen van de sleutel op 20 bouwstenen van het slot.', 'At the contact surface, 17 building blocks of the key fit onto 20 building blocks of the lock.') },
    { dur: 8500, title: L3('Een uitsteeksel heeft drie sleutels', 'A spike has three keys'), focus: null, zoom: {}, spin: .012,
      text: L3('Een heel uitsteeksel bestaat uit drie gelijke delen, elk met zo’n sleuteltop. Hier zie je er één.', 'A whole spike consists of three identical parts, each with such a key tip. Here you see one of them.') },
    { dur: 9000, title: L3('Daarna versmelt het virus met de cel', 'Then the virus fuses with the cell'), focus: null, zoom: {}, spin: .01,
      text: L3('Een eiwit van de cel knipt het uitsteeksel, aan de buitenkant of in een blaasje. Dan versmelt het virusmembraan met de cel.', 'A protein of the cell cuts the spike, on the outside or in a vesicle. Then the virus membrane fuses with the cell.') },
  ],
  hotspots: [
    { node: 'virus', label: L3('↑ Hoe virussen binnenkomen', '↑ How viruses get in'), color: '#ff9d5c' },
    { node: 'endocytose', label: L3('De weg via een blaasje →', 'The way through a vesicle →'), color: '#c9a574' },
    { node: 'viruskopie', label: L3('Binnen: het RNA aan het werk →', 'Inside: the RNA at work →'), color: '#ff8a3d' },
    { node: 'lnp', label: L3('Het mRNA-vaccin', 'The mRNA vaccine'), color: '#e8c27a' },
  ],
});
