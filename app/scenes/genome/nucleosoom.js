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
      title: { nl: 'Het nucleosoom', en: 'The nucleosome' },
      text: { nl: 'Dit is de echte structuur: DNA gewikkeld rond acht eiwitten. Samen vormen ze een schijfje van ~11 nm.', en: 'This is the real structure: DNA wrapped around eight proteins. Together they form a disc of ~11 nm.' } },
    { dur: 8500, spin: .015, focus: { sel: DNA, style: dnaStyle, label: { nl: '147 bp DNA', en: '147 bp DNA' } },
      title: { nl: 'Het DNA wikkelt zich rond', en: 'The DNA wraps around' },
      text: { nl: 'Het DNA draait bijna twee keer rond de eiwitkern. Het blijft een gewone dubbelhelix, maar sterk gebogen.', en: 'The DNA goes almost twice around the protein core. It stays an ordinary double helix, just strongly bent.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H3, style: cart(HC.H3), label: { nl: 'H3 (×2)', en: 'H3 (×2)' } }, { sel: H4, style: cart(HC.H4), label: { nl: 'H4 (×2)', en: 'H4 (×2)' } }], zoom: {},
      title: { nl: 'Het hart van het klosje', en: 'The heart of the spool' },
      text: { nl: 'In het midden zitten twee paren van de eiwitten H3 en H4 (histonen). Dit deel pakt het DNA als eerste vast.', en: 'At the centre sit two pairs of the proteins H3 and H4 (histones). This part is the first to grab the DNA.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H2A, style: cart(HC.H2A), label: { nl: 'H2A (×2)', en: 'H2A (×2)' } }, { sel: H2B, style: cart(HC.H2B), label: { nl: 'H2B (×2)', en: 'H2B (×2)' } }], zoom: {},
      title: { nl: 'Twee paren komen erbij', en: 'Two more pairs join' },
      text: { nl: 'Aan elke kant komt een paar H2A–H2B bij. Zo zijn er acht histonen: van elk soort twee.', en: 'An H2A–H2B pair joins on each side. That makes eight histones: two of each kind.' } },
    { dur: 8500, spin: .01, focus: [{ sel: { chain: 'A', resi: '63-131' }, style: cart(HC.H3), label: { nl: 'H3: histonplooi', en: 'H3: histone fold' } }, { sel: { chain: 'B', resi: '30-93' }, style: cart(HC.H4), label: { nl: 'H4: histonplooi', en: 'H4: histone fold' } }],
      zoom: { chain: ['A', 'B'], resi: '28-131' },
      title: { nl: 'Eiwitten in een handdruk', en: 'Proteins in a handshake' },
      text: { nl: 'Twee histonen grijpen in elkaar zoals twee handen bij een handdruk, hier H3 en H4.', en: 'Two histones interlock like two hands in a handshake, here H3 and H4.' } },
    { dur: 9000, spin: .012,
      focus: [{ sel: { chain: ['A', 'E'], resi: '1-37' }, style: { cartoon: { color: HC.H3 }, stick: { radius: .25, color: HC.H3 } }, label: { nl: 'H3-staart', en: 'H3 tail' } },
        { sel: { chain: ['B', 'F'], resi: '1-24' }, style: { cartoon: { color: HC.H4 }, stick: { radius: .25, color: HC.H4 } }, label: { nl: 'H4-staart', en: 'H4 tail' } },
        { sel: { chain: ['A', 'E', 'B', 'F'], resn: 'LYS', resi: '1-37' }, style: { stick: { radius: .35, color: '#ff6b6b' } } }],
      zoom: {},
      title: { nl: 'Staarten steken naar buiten', en: 'Tails stick out' },
      text: { nl: 'De histonen hebben uitstekende staarten. Op hun lysines (rood, een aminozuur) kunnen merktekens komen.', en: 'The histones have tails that stick out. Their lysines (red, an amino acid) can receive marks.' } },
    { dur: 8500, spin: .01,
      focus: [{ sel: DNA, style: { cartoon: { color: C.dna, opacity: .8 } } },
        { sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], resn: 'ARG', byres: true, within: { distance: 3.5, sel: { chain: ['I', 'J'] } } }, style: { stick: { radius: .45, color: '#ffc247' } }, label: { nl: 'arginines ↔ DNA', en: 'arginines ↔ DNA' } }],
      zoom: {},
      title: { nl: 'Hoe het DNA vastzit', en: 'How the DNA is held' },
      text: { nl: 'Histonen pakken de buitenkant van het DNA vast, niet de letters. Daarom past bijna elk stuk DNA eromheen.', en: 'Histones grip the outside of the DNA, not the letters. That is why almost any piece of DNA can wrap around them.' } },
    { dur: 7500, spin: .02, focus: null, zoom: {},
      title: { nl: 'Verder inzoomen op het DNA', en: 'Zooming further into the DNA' },
      text: { nl: 'Tussen twee nucleosomen ligt telkens een stukje vrij DNA. Hierna: de DNA-dubbelhelix zelf.', en: 'Between two nucleosomes there is always a short piece of free DNA. Next: the DNA double helix itself.' } },
  ],
  hotspots: [
    { node: 'dnahelix', label: { nl: 'DNA-dubbelhelix →', en: 'DNA double helix →' }, color: C.dna },
    { node: 'histonmod', label: { nl: 'Histonmodificaties', en: 'Histone modifications' }, color: '#ff6b6b' },
    { node: 'chromatine', label: { nl: '← Chromatine', en: '← Chromatin' }, color: C.histone },
    { node: 'dnamethyl', label: { nl: 'DNA-methylatie', en: 'DNA methylation' }, color: C.danger },
  ],
});
