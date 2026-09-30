import { C } from '../../kit.js';
import { structure3d } from '../../kit3d.js';
import { HC } from './_a_kit.js';

/*
 * Nucleosoomkerndeeltje in 3D: PDB 1KX5 (Davey et al. 2002, 1,9 Å; 147 bp humaan α-satelliet-DNA + Xenopus-histonen).
 * Ketens (auth): A/E = H3, B/F = H4, C/G = H2A, D/H = H2B, I/J = DNA-strengen.
 */
const DNA = { chain: ['I', 'J'] };
const H3 = { chain: ['A', 'E'] }, H4 = { chain: ['B', 'F'] }, H2A = { chain: ['C', 'G'] }, H2B = { chain: ['D', 'H'] };
const cart = color => ({ cartoon: { color } });
const dnaStyle = { cartoon: { color: C.dna } };

export default structure3d({
  id: 'nucleosoom',
  pdb: '1KX5',
  title: { nl: 'Nucleosoom', en: 'Nucleosome' },
  scale: '≈ 11 nm',
  time: { nl: 'DNA-uiteinden "ademen": ms – s', en: 'DNA ends "breathe": ms – s' },
  org: { nl: 'Xenopus-histonen + humaan DNA', en: 'Xenopus histones + human DNA' },
  legend: [[C.dna, { nl: 'DNA (147 bp)', en: 'DNA (147 bp)' }], [HC.H3, 'H3'], [HC.H4, 'H4'], [HC.H2A, 'H2A'], [HC.H2B, 'H2B'], ['#ff6b6b', { nl: 'lysines in de staarten', en: 'lysines in the tails' }], ['#ffc247', { nl: 'arginines in de kleine groef', en: 'arginines in the minor groove' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte atoomcoördinaten uit de Protein Data Bank (röntgenkristallografie). Draai zelf met de muis; scroll om te zoomen. Het DNA van dit deeltje vind je ook in de <a href="../atlas/index.html?id=nucleosome&lang=nl">DNA/RNA-atlas</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real atomic coordinates from the Protein Data Bank (X-ray crystallography). Rotate with the mouse; scroll to zoom. The DNA of this particle is also in the <a href="../atlas/index.html?id=nucleosome&lang=en">DNA/RNA atlas</a>.</p>' },
  simplified: {
    nl: 'Dit is het kerndeeltje zonder linker-DNA en zonder histon H1 (die zitten niet in deze kristalstructuur). De histonen komen van de klauwkikker (Xenopus laevis); ze verschillen maar op enkele posities van de menselijke. Staarten zijn in werkelijkheid grotendeels flexibel; in het kristal liggen ze in één vaste stand. Posttranslationele modificaties zijn niet aanwezig.',
    en: 'This is the core particle without linker DNA and without histone H1 (they are not in this crystal structure). The histones come from the clawed frog (Xenopus laevis); they differ from human histones at only a few positions. In reality the tails are largely flexible; in the crystal they are frozen in one position. Post-translational modifications are absent.' },
  base: [
    { sel: DNA, style: dnaStyle },
    { sel: H3, style: cart(HC.H3) }, { sel: H4, style: cart(HC.H4) },
    { sel: H2A, style: cart(HC.H2A) }, { sel: H2B, style: cart(HC.H2B) },
  ],
  steps: [
    { dur: 7500, spin: .02, focus: null, zoom: {},
      title: { nl: 'Het nucleosoomkerndeeltje', en: 'The nucleosome core particle' },
      text: { nl: 'Echte structuur (PDB 1KX5, 1,9 Å): DNA gewikkeld rond acht histonen. Een schijf van ~11 nm breed en ~5,5 nm hoog.', en: 'Real structure (PDB 1KX5, 1.9 Å): DNA wrapped around eight histones. A disc ~11 nm wide and ~5.5 nm high.' } },
    { dur: 8500, spin: .015, focus: { sel: DNA, style: dnaStyle, label: { nl: '147 bp DNA', en: '147 bp DNA' } },
      title: { nl: '147 bp DNA in ~1,7 linkshandige windingen', en: '147 bp of DNA in ~1.7 left-handed turns' },
      text: { nl: 'Het DNA vormt een linkshandige superhelix rond de eiwitkern. Het blijft zelf een rechtshandige B-helix, maar sterk gebogen.', en: 'The DNA forms a left-handed superhelix around the protein core. It remains a right-handed B helix itself, but strongly bent.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H3, style: cart(HC.H3), label: { nl: 'H3 (×2)', en: 'H3 (×2)' } }, { sel: H4, style: cart(HC.H4), label: { nl: 'H4 (×2)', en: 'H4 (×2)' } }], zoom: {},
      title: { nl: 'Het (H3–H4)₂-tetrameer', en: 'The (H3–H4)₂ tetramer' },
      text: { nl: 'Twee H3–H4-paren vormen samen de kern van het octameer, midden rond de dyade-as. Dit tetrameer bindt als eerste aan het DNA.', en: 'Two H3–H4 pairs form the centre of the octamer, around the dyad axis. This tetramer is the first to bind the DNA.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H2A, style: cart(HC.H2A), label: { nl: 'H2A (×2)', en: 'H2A (×2)' } }, { sel: H2B, style: cart(HC.H2B), label: { nl: 'H2B (×2)', en: 'H2B (×2)' } }], zoom: {},
      title: { nl: 'Twee H2A–H2B-dimeren', en: 'Two H2A–H2B dimers' },
      text: { nl: 'Aan weerszijden van het tetrameer binden twee H2A–H2B-dimeren. Samen: het histonoctameer (2 × H2A, H2B, H3, H4).', en: 'Two H2A–H2B dimers bind on either side of the tetramer. Together: the histone octamer (2 × H2A, H2B, H3, H4).' } },
    { dur: 8500, spin: .01, focus: [{ sel: { chain: 'A', resi: '63-131' }, style: cart(HC.H3), label: { nl: 'H3: histonplooi', en: 'H3: histone fold' } }, { sel: { chain: 'B', resi: '30-93' }, style: cart(HC.H4), label: { nl: 'H4: histonplooi', en: 'H4: histone fold' } }],
      zoom: { chain: ['A', 'B'], resi: '28-131' },
      title: { nl: 'De histonplooi: een "handdruk"', en: 'The histone fold: a "handshake"' },
      text: { nl: 'Elk kernhiston heeft drie α-helices (α1–lus–α2–lus–α3). Twee histonen grijpen kop-aan-staart in elkaar, zoals H3 en H4 hier.', en: 'Each core histone has three α-helices (α1–loop–α2–loop–α3). Two histones interlock head-to-tail, like H3 and H4 here.' } },
    { dur: 9000, spin: .012,
      focus: [{ sel: { chain: ['A', 'E'], resi: '1-37' }, style: { cartoon: { color: HC.H3 }, stick: { radius: .25, color: HC.H3 } }, label: { nl: 'H3-staart', en: 'H3 tail' } },
        { sel: { chain: ['B', 'F'], resi: '1-24' }, style: { cartoon: { color: HC.H4 }, stick: { radius: .25, color: HC.H4 } }, label: { nl: 'H4-staart', en: 'H4 tail' } },
        { sel: { chain: ['A', 'E', 'B', 'F'], resn: 'LYS', resi: '1-37' }, style: { stick: { radius: .35, color: '#ff6b6b' } } }],
      zoom: {},
      title: { nl: 'Histonstaarten vol lysines', en: 'Histone tails full of lysines' },
      text: { nl: 'De N-terminale staarten steken buiten het deeltje. Hun lysines (rood) zijn positief geladen en worden gemodificeerd: acetylatie, methylatie…', en: 'The N-terminal tails stick out of the particle. Their lysines (red) are positively charged and get modified: acetylation, methylation…' } },
    { dur: 8500, spin: .01,
      focus: [{ sel: DNA, style: { cartoon: { color: C.dna, opacity: .8 } } },
        { sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], resn: 'ARG', byres: true, within: { distance: 3.5, sel: { chain: ['I', 'J'] } } }, style: { stick: { radius: .45, color: '#ffc247' } }, label: { nl: 'arginines ↔ DNA', en: 'arginines ↔ DNA' } }],
      zoom: {},
      title: { nl: 'Hoe histonen DNA vasthouden', en: 'How histones hold on to DNA' },
      text: { nl: 'Vooral via de fosfaatruggengraat (en ~14 contactplaatsen), niet via de basen: daarom bindt het octameer bijna elke sequentie. Arginines steken in de kleine groef.', en: 'Mainly via the phosphate backbone (at ~14 contact sites), not via the bases: that is why the octamer binds almost any sequence. Arginines insert into the minor groove.' } },
    { dur: 7500, spin: .02, focus: null, zoom: {},
      title: { nl: 'Verder in: de dubbelhelix zelf', en: 'Further in: the double helix itself' },
      text: { nl: 'In de cel volgt telkens ~20–80 bp linker-DNA (met H1) naar het volgende nucleosoom. Volgende hoofdstuk: de DNA-dubbelhelix.', en: 'In the cell, ~20–80 bp of linker DNA (with H1) leads to the next nucleosome. Next chapter: the DNA double helix.' } },
  ],
  hotspots: [
    { node: 'dnahelix', label: { nl: 'DNA-dubbelhelix →', en: 'DNA double helix →' }, color: C.dna },
    { node: 'histonmod', label: { nl: 'Histonmodificaties', en: 'Histone modifications' }, color: '#ff6b6b' },
    { node: 'chromatine', label: { nl: '← Chromatine', en: '← Chromatin' }, color: C.histone },
    { node: 'dnamethyl', label: { nl: 'DNA-methylatie', en: 'DNA methylation' }, color: C.danger },
  ],
});
