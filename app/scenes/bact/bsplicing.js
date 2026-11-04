import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 1U6B: zelfsplicend groep I-intron uit een tRNA-Ile-gen van de bacterie Azoarcus, met beide exonen; röntgen 3,1 Å
 * (Adams et al., Nature 2004). Ketens: B intron-RNA (197 nt) · C exon-RNA (22 nt, "GROUP I EXON") · D kort exon-stukje (3 nt)
 * · A U1A-eiwit (kristallisatiehulp: bindt een ingebouwde lus, geen natuurlijk onderdeel). */
const L3 = (nl, en) => ({ nl, en });
const COL = { B: '#c9a574', C: C.rna, D: '#ffd27a', A: '#8a93a8' };
const base = [
  { sel: { chain: 'B' }, style: { cartoon: { color: COL.B, opacity: .95 } } },
  { sel: { chain: 'C' }, style: { cartoon: { color: COL.C }, stick: { color: COL.C, radius: .2 } } },
  { sel: { chain: 'D' }, style: { cartoon: { color: COL.D }, stick: { color: COL.D, radius: .3 } } },
  { sel: { chain: 'A' }, style: { cartoon: { color: COL.A, opacity: .7 } } },
];
const EX = [{ sel: { chain: 'C' }, style: { cartoon: { color: COL.C }, stick: { color: COL.C, radius: .25 } }, label: L3('exon', 'exon') }, { sel: { chain: 'D' }, style: { cartoon: { color: COL.D }, stick: { color: COL.D, radius: .35 } }, label: L3('exon', 'exon') }];

export default structure3d({
  id: 'bsplicing', pdb: '1U6B',
  title: L3('Een RNA dat zichzelf uitknipt', 'An RNA that cuts itself out'),
  scale: { nl: '≈ 200 nt RNA · ≈ 10 nm', en: '≈ 200 nt RNA · ≈ 10 nm' }, time: L3('seconden tot minuten', 'seconds to minutes'),
  org: L3('bacterie (Azoarcus sp.) · PDB 1U6B', 'bacterium (Azoarcus sp.) · PDB 1U6B'),
  legend: [[COL.B, L3('intron (ribozym)', 'intron (ribozyme)')], [COL.C, 'exon'], [COL.D, 'exon'], [COL.A, L3('U1A-eiwit (hulp voor het kristal)', 'U1A protein (crystallisation aid)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte röntgenstructuur (Adams et al., <i>Nature</i> 2004) van een groep I-intron uit een tRNA-gen van de bacterie <i>Azoarcus</i>. Het RNA zelf is het enzym. Sleep om te draaien.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real X-ray structure (Adams et al., <i>Nature</i> 2004) of a group I intron from a tRNA gene of the bacterium <i>Azoarcus</i>. The RNA itself is the enzyme. Drag to rotate.</p>' },
  simplified: {
    nl: 'Het RNA is licht aangepast om het te kunnen kristalliseren: een lus bindt het U1A-eiwit, en de exonen zijn korte synthetische stukjes. De structuur toont één moment, net vóór de tweede stap van het splicen. Groep II-introns en inteïnes staan niet in deze structuur; ze worden alleen in de tekst besproken.',
    en: 'The RNA is slightly modified so it can be crystallised: a loop binds the U1A protein, and the exons are short synthetic pieces. The structure shows one moment, just before the second step of splicing. Group II introns and inteins are not in this structure; they are only discussed in the text.' },
  base,
  steps: [
    { dur: 8000, title: L3('Splicen zonder spliceosoom', 'Splicing without a spliceosome'), focus: null, zoom: {}, spin: .012,
      text: L3('Bacteriën hebben geen spliceosoom. Toch knippen enkele zeldzame introns zichzelf uit hun RNA.', 'Bacteria have no spliceosome. Yet a few rare introns cut themselves out of their RNA.') },
    { dur: 8000, title: L3('Het intron is zelf het enzym', 'The intron itself is the enzyme'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'B' }, style: { cartoon: { color: COL.B } }, label: L3('groep I-intron', 'group I intron') },
      text: L3('Dit intron vouwt zich tot een vaste 3D-vorm: een RNA-enzym (ribozym). Het heeft geen eiwit nodig.', 'This intron folds into a fixed 3D shape: an RNA enzyme (ribozyme). It needs no protein.') },
    { dur: 9000, title: L3('Twee stappen knippen en plakken', 'Two steps of cutting and joining'), zoom: { chain: ['C', 'D'] }, spin: .008,
      focus: [...EX, { sel: { chain: 'B' }, style: { cartoon: { color: COL.B, opacity: .6 } } }],
      text: L3('Eerst knipt het intron los van het eerste exon. Dan plakt het de twee exonen aan elkaar.', 'First the intron cuts itself free from the first exon. Then it joins the two exons together.') },
    { dur: 8000, title: L3('Een hulpje voor de foto', 'A helper for the picture'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A' }, style: { cartoon: { color: '#c9d2e4' } }, label: L3('U1A (alleen voor het kristal)', 'U1A (only for the crystal)') },
      text: L3('Het eiwit U1A is toegevoegd om het RNA te kunnen kristalliseren. Het hoort er in de cel niet bij.', 'The protein U1A was added so the RNA could be crystallised. It is not part of it in the cell.') },
    { dur: 9000, title: L3('Nog twee uitzonderingen', 'Two more exceptions'), focus: null, zoom: {}, spin: .012,
      text: L3('Groep II-introns knippen zich op een andere manier uit. Inteïnes zijn stukken eiwit die zichzelf uit een eiwit knippen.', 'Group II introns cut themselves out in a different way. Inteins are pieces of protein that cut themselves out of a protein.') },
    { dur: 8000, title: L3('Vergelijk: splicing bij de mens', 'Compare: splicing in humans'), focus: null, zoom: {}, spin: .012,
      text: L3('Bijna al onze genen hebben introns. Een grote machine, het spliceosoom, knipt ze eruit.', 'Almost all our genes have introns. A large machine, the spliceosome, cuts them out.') },
  ],
  hotspots: [
    { node: 'bgen', label: L3('← Onderdelen van een gen', '← Parts of a gene'), color: '#b98cff' },
    { node: 'splicing', label: L3('Vergelijk: spliceosoom (mens)', 'Compare: spliceosome (human)'), color: C.rna },
    { node: 'rnastructuur', label: L3('RNA-structuur', 'RNA structure'), color: C.rrna },
  ],
});
