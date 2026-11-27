import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 1U6B: zelfsplicend groep I-intron uit een tRNA-Ile-gen van de bacterie Azoarcus, met beide exonen; röntgen 3,1 Å
 * (Adams et al., Nature 2004). Ketens: B intron-RNA (197 nt) · C exon-RNA (22 nt, "GROUP I EXON") · D kort exon-stukje (3 nt)
 * · A U1A-eiwit (kristallisatiehulp: bindt een ingebouwde lus, geen natuurlijk onderdeel).
 * Nagekeken in het bestand (27-11-2026): keten C = einde van het intron (192–206, met de laatste G = ωG206) + 3′-exon (1–6);
 * keten D = 5′-CA(5MU)-3′, het einde van het 5′-exon (5MU = de laatste U, vóór de 3′-splicingsplaats). De structuur toont het
 * moment vlak vóór stap 2: het 5′-exon is al los, het 3′-exon hangt nog aan het intron (fosfaat G206–A1). */
const INTRON_END = { chain: 'C', resi: [192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206] }, EXON2 = { chain: 'C', resi: [1, 2, 3, 4, 5, 6] };
const L3 = (nl, en) => ({ nl, en });
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)
const COL = { B: '#c9a574', C: C.rna, D: '#ffd27a', A: '#8a93a8' };
const base = [
  { sel: { chain: 'B' }, style: { cartoon: { color: COL.B, opacity: .95 } } },
  { sel: { chain: 'C' }, style: { cartoon: { color: COL.C }, stick: { color: COL.C, radius: .2 } } },
  { sel: INTRON_END, style: { cartoon: { color: COL.B, opacity: .95 } } },
  { sel: { chain: 'D' }, style: { cartoon: { color: COL.D }, stick: { color: COL.D, radius: .3 } } },
  { sel: { chain: 'A' }, style: { cartoon: { color: COL.A, opacity: .7 } } },
];
const EX = [{ sel: INTRON_END, style: { cartoon: { color: COL.B, opacity: .6 } } },
  { sel: EXON2, style: { cartoon: { color: COL.C }, stick: { color: COL.C, radius: .5 }, sphere: { color: COL.C, radius: .55 } }, label: L3('exon 2', 'exon 2'), labelColor: COL.C, labelOff: [150, -50] },
  { sel: { chain: 'D' }, style: { stick: { color: COL.D, radius: .5 }, sphere: { color: COL.D, radius: .55 } }, label: L3('exon 1 (al losgeknipt)', 'exon 1 (already cut free)'), labelColor: COL.D, labelOff: [-160, 50] },
  { sel: { chain: 'C', resi: 1, atom: 'P' }, style: { sphere: { color: '#ff6b6b', radius: 2.8 } }, label: L3('plakplaats', 'joining site'), labelColor: '#ff6b6b', labelOff: [60, 110] }];

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
    { dur: 8000, title: L3('Splicen zonder spliceosoom', 'Splicing without a spliceosome'), focus: null, zoom: {}, tags: [TAG({ chain: 'B' }, 'intron: het RNA is zelf het enzym', 'intron: the RNA itself is the enzyme'), TAG({ chain: 'C', resi: [1, 2, 3, 4, 5, 6] }, 'exon', 'exon'), TAG({ chain: 'A' }, 'hulpje (U1A)', 'helper (U1A)')], spin: .012,
      text: L3('Bacteriën hebben geen spliceosoom. Toch knippen enkele zeldzame introns zichzelf uit hun RNA.', 'Bacteria have no spliceosome. Yet a few rare introns cut themselves out of their RNA.') },
    { dur: 8000, title: L3('Het intron is zelf het enzym', 'The intron itself is the enzyme'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'B' }, style: { cartoon: { color: COL.B } }, label: L3('groep I-intron', 'group I intron') },
      text: L3('Dit intron vouwt zich tot een vaste 3D-vorm: een RNA-enzym (ribozym). Het heeft geen eiwit nodig.', 'This intron folds into a fixed 3D shape: an RNA enzyme (ribozyme). It needs no protein.') },
    { dur: 9000, title: L3('Twee stappen knippen en plakken', 'Two steps of cutting and joining'), zoom: { or: [EXON2, { chain: 'D' }, { chain: 'C', resi: [204, 205, 206] }] }, rock: 30, pad: .75,
      focus: [...EX, { sel: { chain: 'B' }, style: { cartoon: { color: COL.B, opacity: .6 } } }],
      text: L3('Eerst knipt het intron los van het eerste exon. Dan plakt het de twee exonen aan elkaar.', 'First the intron cuts itself free from the first exon. Then it joins the two exons together.') },
    { dur: 8000, title: L3('Een hulpje voor de foto', 'A helper for the picture'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A' }, style: { cartoon: { color: '#c9d2e4' } }, label: L3('U1A (alleen voor het kristal)', 'U1A (only for the crystal)') },
      text: L3('Het eiwit U1A is toegevoegd om het RNA te kunnen kristalliseren. Het hoort er in de cel niet bij.', 'The protein U1A was added so the RNA could be crystallised. It is not part of it in the cell.') },
    { dur: 9000, title: L3('Nog twee uitzonderingen', 'Two more exceptions'), focus: null, zoom: {}, spin: .012,
      tags: [TAG({ chain: 'B' }, 'groep I-intron (groep II-introns en inteïnes zitten niet in deze structuur)', 'group I intron (group II introns and inteins are not in this structure)', COL.B, [0, 130])],
      text: L3('Groep II-introns knippen zich op een andere manier uit. Inteïnes zijn stukken eiwit die zichzelf uit een eiwit knippen.', 'Group II introns cut themselves out in a different way. Inteins are pieces of protein that cut themselves out of a protein.') },
    { dur: 8000, title: L3('Vergelijk: splicing bij de mens', 'Compare: splicing in humans'), focus: null, zoom: {}, tags: [TAG({ chain: 'B' }, 'bacterieel intron: knipt zichzelf', 'bacterial intron: cuts itself out')], spin: .012,
      text: L3('Bijna al onze genen hebben introns. Een grote machine, het spliceosoom, knipt ze eruit.', 'Almost all our genes have introns. A large machine, the spliceosome, cuts them out.') },
  ],
  hotspots: [
    { node: 'bgen', label: L3('← Onderdelen van een gen', '← Parts of a gene'), color: '#b98cff' },
    { node: 'splicing', label: L3('Vergelijk: spliceosoom (mens)', 'Compare: spliceosome (human)'), color: C.rna },
    { node: 'rnastructuur', label: L3('RNA-structuur', 'RNA structure'), color: C.rrna },
  ],
});
