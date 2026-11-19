import { structure3d, ghost } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 6MSB: menselijk 26S-proteasoom met één 19S-kap (cryo-EM 3,0 Å; Dong et al., Nature 2019), alle 33 entiteiten Homo sapiens.
 * Lokale kopie data/pdb/6MSB.cif: ingekort tot CA-atomen (104 938 → 13 501 atomen) en star gedraaid (lengteas = +y, kap boven).
 * Ketens (auth, nagekeken in het mmCIF en via de RCSB-API 05-11-2026):
 *   20S: α-ring bij de kap G–M (PSMA1–7) · β-ring N–T · β-ring n–t · α-ring g–m   → 4 ringen van 7
 *        actieve plaatsen: Thr1 van β1 = PSMB6 (N, n), β2 = PSMB7 (O, o), β5 = PSMB5 (R, r)  (UniProt P28072, Q99436, P28074)
 *   19S-basis: ATPasen A–F (PSMC1–6) + U (PSMD1), f (PSMD2), b (PSMD4)
 *   19S-deksel: V W X Y Z a c d e (PSMD3, 12, 11, 6, 7, 13, 14, 8, SEM1); c = PSMD14 (Rpn11, haalt ubiquitine eraf)
 *   ubiquitine: u en w */
const L3 = (nl, en) => ({ nl, en });
const A1 = ['G', 'H', 'I', 'J', 'K', 'L', 'M'], B1 = ['N', 'O', 'P', 'Q', 'R', 'S', 'T'], B2 = ['n', 'o', 'p', 'q', 'r', 's', 't'], A2 = ['g', 'h', 'i', 'j', 'k', 'l', 'm'];
const CORE = [...A1, ...B1, ...B2, ...A2];
const ATP = ['A', 'B', 'C', 'D', 'E', 'F'], BASEX = ['U', 'f', 'b'], LID = ['V', 'W', 'X', 'Y', 'Z', 'a', 'c', 'd', 'e'], UBQ = ['u', 'w'];
const CAP = [...ATP, ...BASEX, ...LID, ...UBQ];
const COL = { a: '#8fa3c8', b: '#d6dcea', atp: '#2cc6a8', basex: '#5fa89a', lid: '#9b7bff', ub: '#ffd166', site: '#ff6b6b', rpn11: '#f06bc0' };
const SIX = ['#2cc6a8', '#5fd3e6', '#7fdc6a', '#ffc247', '#ff8a3d', '#e0708f'];
/* één bol per CA, groot genoeg om samen een gesloten vorm te geven (zelfde handboekstijl als de ribosomen) */
const S = (color, r = 2.4) => ({ sphere: { color, radius: r * 1.5 } });
/* gedimd: één rustige, doorschijnende vorm i.p.v. een wolk grijze stipjes */
const DIM = (chains) => ({ sel: { chain: chains }, style: ghost(4, .1) });
const base = [
  { sel: { chain: [...A1, ...A2] }, style: S(COL.a) }, { sel: { chain: [...B1, ...B2] }, style: S(COL.b) },
  { sel: { chain: ATP }, style: S(COL.atp) }, { sel: { chain: BASEX }, style: S(COL.basex) }, { sel: { chain: LID }, style: S(COL.lid) }, { sel: { chain: UBQ }, style: S(COL.ub) },
];
const SITES = [['N', 1], ['O', 1], ['R', 1], ['n', 1], ['o', 1], ['r', 1]];

export default structure3d({
  id: 'proteasoom', pdb: '6MSB',
  title: L3('Een afgesloten buis knipt eiwitten in stukjes', 'A closed tube cuts proteins into pieces'),
  scale: { nl: '≈ 30 nm lang · ≈ 2,5 MDa', en: '≈ 30 nm long · ≈ 2.5 MDa' }, time: L3('doorlopend, in onze cellen', 'continuously, in our cells'),
  org: L3('mens · PDB 6MSB', 'human · PDB 6MSB'),
  legend: [[COL.a, L3('buitenringen (α)', 'outer rings (α)')], [COL.b, L3('binnenringen (β)', 'inner rings (β)')], [COL.site, L3('knipplekken (Thr1)', 'cutting sites (Thr1)')], [COL.atp, L3('motorring (6 ATPasen)', 'motor ring (6 ATPases)')],
    [COL.basex, L3('basis: o.a. ontvangers', 'base: incl. receivers')], [COL.lid, L3('deksel', 'lid')], [COL.rpn11, L3('label-knipper (Rpn11)', 'tag cutter (Rpn11)')], [COL.ub, L3('ubiquitine (label)', 'ubiquitin (tag)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur van het menselijke 26S-proteasoom (Dong et al., <i>Nature</i> 2019). Om snel te laden staat er één bol per aminozuur; samen geven ze de buitenvorm. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure of the human 26S proteasome (Dong et al., <i>Nature</i> 2019). To load quickly, there is one ball per amino acid; together they give the outer shape. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Alleen de ruggengraat is getekend (één bol per aminozuur). Deze structuur heeft één kap; in de cel kan een kap aan één of aan beide uiteinden zitten. Het uitrollen en knippen van een eiwit gebeurt niet in deze momentopname en wordt alleen verteld. In deze structuur zitten 32 verschillende proteasoomeiwitten; sommige losser gebonden onderdelen ontbreken.',
    en: 'Only the backbone is drawn (one ball per amino acid). This structure has one cap; in the cell a cap can sit at one or at both ends. Unrolling and cutting a protein does not happen in this snapshot and is only told. This structure contains 32 different proteasome proteins; some more loosely bound parts are missing.' },
  base,
  dimOpacity: false,
  outline: { width: .3 },
  steps: [
    { dur: 8000, title: L3('Een machine die eiwitten afbreekt', 'A machine that breaks proteins down'), focus: null, zoom: {}, spin: .012,
      text: L3('Dit is het echte afbraakapparaat van de mens, het proteasoom. Het bestaat uit ruim 30 verschillende eiwitten.', 'This is the real human breakdown machine, the proteasome. It is built from more than 30 different proteins.') },
    { dur: 8500, title: L3('Een buis van vier ringen van zeven', 'A tube of four rings of seven'), zoom: { chain: CORE }, spin: .01,
      focus: [DIM(CAP), { sel: { chain: [...A1, ...A2] }, style: S(COL.a, 2.6) }, { sel: { chain: [...B1, ...B2] }, style: S(COL.b, 2.6) },
        { sel: { chain: 'J' }, style: S(COL.a, 2.6), label: L3('buitenring', 'outer ring') }, { sel: { chain: 'Q' }, style: S(COL.b, 2.6), label: L3('binnenring', 'inner ring') }],
      text: L3('De kern is een buis van vier ringen. Elke ring bestaat uit zeven eiwitten.', 'The core is a tube of four rings. Each ring is made of seven proteins.') },
    { dur: 9000, title: L3('De knipplekken zitten binnenin', 'The cutting sites sit inside'), zoom: { chain: CORE }, spin: .008,
      focus: [DIM(CAP, .5), DIM(CORE, .7), ...SITES.map(([ch, r], i) => ({ sel: { chain: ch, resi: r }, style: S(COL.site, 7), label: i === 0 ? L3('knipplek', 'cutting site') : undefined }))],
      text: L3('Zes knipplekken liggen verborgen in de holte van de buis. Zo kunnen ze gewone eiwitten in de cel niet raken.', 'Six cutting sites are hidden in the hollow of the tube. That way they cannot touch ordinary proteins in the cell.') },
    { dur: 8500, title: L3('Een smalle deur aan het uiteinde', 'A narrow gate at the end'), zoom: { chain: [...A1, ...ATP] }, spin: .008,
      focus: [DIM([...B1, ...B2, ...A2, ...LID, ...BASEX, ...UBQ], 1.4), { sel: { chain: ATP }, style: S('#3d6f6a', 1.8) }, { sel: { chain: A1 }, style: S(COL.a, 2.8), label: L3('deur', 'gate') }],
      text: L3('De buitenste ring is een deur die alleen een uitgerolde keten doorlaat. De kap bovenop opent die deur.', 'The outer ring is a door that only lets an unrolled chain through. The cap on top opens that door.') },
    { dur: 9000, title: L3('Zes motoren rollen het eiwit uit', 'Six motors unroll the protein'), zoom: { chain: ATP }, spin: .01,
      focus: [DIM([...CORE, ...LID, ...BASEX, ...UBQ], 1.3), ...ATP.map((ch, i) => ({ sel: { chain: ch }, style: S(SIX[i], 2.8), label: i === 0 ? L3('ring van 6 motoren', 'ring of 6 motors') : undefined }))],
      text: L3('Zes motoreiwitten vormen een ring (hier van opzij gezien) die ATP verbruikt. Ze trekken het eiwit uit elkaar en duwen het de buis in.', 'Six motor proteins form a ring (seen from the side here) that uses ATP. They pull the protein apart and push it into the tube.') },
    { dur: 9000, title: L3('Het deksel knipt het label los', 'The lid cuts the tag loose'), zoom: { chain: [...LID, ...UBQ] }, spin: .01,
      focus: [DIM([...CORE, ...ATP, ...BASEX], 1.3), { sel: { chain: LID.filter(c => c !== 'c') }, style: S(COL.lid, 1.1) }, { sel: { chain: 'c' }, style: S(COL.rpn11, 3.4), label: L3('label-knipper', 'tag cutter'), labelColor: COL.rpn11 },
        { sel: { chain: UBQ }, style: S(COL.ub, 3.2) }, { sel: { chain: 'u' }, style: S(COL.ub, 3.2), label: L3('label', 'tag') }],
      text: L3('Het deksel houdt de motor op zijn plek. Eén deel knipt het afbraaklabel los voordat het eiwit naar binnen gaat.', 'The lid holds the motor in place. One part cuts the breakdown tag loose before the protein goes in.') },
    { dur: 9000, title: L3('Er komen korte stukjes uit', 'Short pieces come out'), focus: null, zoom: {}, spin: .012,
      text: L3('Uit de buis komen stukjes van 3 tot ongeveer 20 bouwstenen. Die worden verder afgebroken en hergebruikt.', 'Pieces of 3 to about 20 building blocks come out of the tube. They are broken down further and reused.') },
  ],
  hotspots: [
    { node: 'ubiquitine', label: L3('↑ Het afbraaklabel (ubiquitine)', '↑ The breakdown tag (ubiquitin)'), color: '#ffd166' },
    { node: 'autofagie', label: L3('Te groot? Autofagie →', 'Too big? Autophagy →'), color: '#ff6b6b' },
    { node: 'misvouwing', label: L3('Misgevouwen eiwitten', 'Misfolded proteins'), color: C.danger },
    { node: 'bafbraak', label: L3('Vergelijk: bacterie', 'Compare: bacterium'), color: '#d65a5a' },
  ],
});
