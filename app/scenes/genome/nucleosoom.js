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
/* overzicht met namen (niets gedimd): wat is het DNA, wat zijn de histonen */
const OVER = (dnaLab, dnaSel = { chain: 'I', resi: 0 }) => [
  { sel: H3, style: cart(HC.H3) }, { sel: H4, style: cart(HC.H4) }, { sel: H2A, style: cart(HC.H2A) }, { sel: H2B, style: cart(HC.H2B) },
  { sel: DNA, style: dnaStyle, label: dnaLab, labelSel: dnaSel, labelColor: C.dna },
  { sel: H4, style: cart(HC.H4), label: { nl: 'kern: 8 histon-eiwitten', en: 'core: 8 histone proteins' }, labelSel: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] }, labelColor: HC.H3 }];

export default structure3d({
  id: 'nucleosoom',
  pdb: '1KX5',
  title: { nl: 'Nucleosoom', en: 'Nucleosome' },
  scale: '≈ 11 nm',
  time: { nl: 'DNA-uiteinden "ademen": ~0,25 s gewikkeld, ~10–50 ms los', en: 'DNA ends "breathe": ~0.25 s wrapped, ~10–50 ms unwrapped' },
  org: { nl: 'Xenopus-histonen + humaan DNA', en: 'Xenopus histones + human DNA' },
  legend: [[C.dna, { nl: 'DNA (147 bp)', en: 'DNA (147 bp)' }], [HC.H3, 'H3'], [HC.H4, 'H4'], [HC.H2A, 'H2A'], [HC.H2B, 'H2B'], ['#ff6b6b', { nl: 'lysines in de staarten', en: 'lysines in the tails' }], ['#ffc247', { nl: 'arginines in de kleine groef', en: 'arginines in the minor groove' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte atoomcoördinaten uit de Protein Data Bank (röntgenkristallografie). Draai zelf met de muis; scroll om te zoomen. Het DNA van dit deeltje vind je ook in de <a href="../atlas/index.html?id=nucleosome&lang=nl">3D-bibliotheek</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real atomic coordinates from the Protein Data Bank (X-ray crystallography). Rotate with the mouse; scroll to zoom. The DNA of this particle is also in the <a href="../atlas/index.html?id=nucleosome&lang=en">3D library</a>.</p>' },
  simplified: {
    nl: 'Dit is het kerndeeltje zonder linker-DNA en zonder histon H1 (die zitten niet in deze kristalstructuur). De histonen komen van de klauwkikker (Xenopus laevis); ze verschillen maar op enkele posities van de menselijke. Staarten zijn in werkelijkheid grotendeels flexibel; in het kristal liggen ze in één vaste stand. Posttranslationele modificaties zijn niet aanwezig.',
    en: 'This is the core particle without linker DNA and without histone H1 (they are not in this crystal structure). The histones come from the clawed frog (Xenopus laevis); they differ from human histones at only a few positions. In reality the tails are largely flexible; in the crystal they are frozen in one position. Post-translational modifications are absent.' },
  base: [
    { sel: DNA, style: dnaStyle },
    { sel: H3, style: cart(HC.H3) }, { sel: H4, style: cart(HC.H4) },
    { sel: H2A, style: cart(HC.H2A) }, { sel: H2B, style: cart(HC.H2B) },
  ],
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: 'DNA', m: ['DNA, 1,7 keer rondgewikkeld', 'DNA, wrapped 1.7 times', '147 bp DNA', 'hier loopt het DNA verder naar het volgende nucleosoom', 'here the DNA runs on to the next nucleosome'], d: { nl: 'Het blauwe lint: een stuk DNA van 147 basenparen dat bijna twee keer rond de eiwitkern draait. Het blijft een gewone dubbelhelix, maar sterk gebogen.', en: 'The blue ribbon: a piece of DNA of 147 base pairs that goes almost twice around the protein core. It stays an ordinary double helix, just strongly bent.' },
      p: { nl: '147 bp DNA in ~1,7 linkshandige superhelixwindingen rond het histonoctameer (PDB 1KX5, humaan α-satelliet-DNA).', en: '147 bp DNA in ~1.7 left-handed superhelical turns around the histone octamer (PDB 1KX5, human α-satellite DNA).' } },
    { c: HC.H3, t: { nl: 'histonkern', en: 'histone core' }, m: ['kern: 8 histon-eiwitten', 'core: 8 histone proteins'], d: { nl: 'De kern van acht eiwitten (histonen): van vier soorten telkens twee.', en: 'The core of eight proteins (histones): two each of four kinds.' },
      p: { nl: 'Histonoctameer: (H3–H4)₂-tetrameer geflankeerd door twee H2A–H2B-dimeren (Xenopus-histonen in deze structuur).', en: 'Histone octamer: an (H3–H4)₂ tetramer flanked by two H2A–H2B dimers (Xenopus histones in this structure).' } },
    { c: HC.H3, t: 'H3 (×2)', d: { nl: 'Het histon H3 (paars), twee keer aanwezig, in het midden van de kern.', en: 'The histone H3 (purple), present twice, at the centre of the core.' },
      p: { nl: 'Twee H3-kopieën; via hun H3–H3-contact vormen ze het (H3–H4)₂-tetrameer dat het centrale DNA bindt.', en: 'Two H3 copies; through their H3–H3 contact they form the (H3–H4)₂ tetramer that binds the central DNA.' } },
    { c: HC.H4, t: 'H4 (×2)', d: { nl: 'Het histon H4 (groen), twee keer aanwezig, samen met H3 in het midden.', en: 'The histone H4 (green), present twice, together with H3 at the centre.' },
      p: { nl: 'Twee H4-kopieën, elk gepaard met een H3.', en: 'Two H4 copies, each paired with an H3.' } },
    { c: HC.H2A, t: 'H2A (×2)', d: { nl: 'Het histon H2A (geel), twee keer aanwezig, aan de zijkanten van de kern.', en: 'The histone H2A (yellow), present twice, on the sides of the core.' },
      p: { nl: 'Twee H2A-kopieën, elk in een H2A–H2B-dimeer aan weerszijden van het tetrameer.', en: 'Two H2A copies, each in an H2A–H2B dimer on either side of the tetramer.' } },
    { c: HC.H2B, t: 'H2B (×2)', d: { nl: 'Het histon H2B (roze), twee keer aanwezig, telkens naast een H2A.', en: 'The histone H2B (pink), present twice, each next to an H2A.' },
      p: { nl: 'Twee H2B-kopieën, partner van H2A in de dimeren.', en: 'Two H2B copies, partner of H2A in the dimers.' } },
    { c: HC.H3, t: { nl: 'histonplooi', en: 'histone fold' }, m: ['H3: histonplooi', 'H3: histone fold', 'H4: histonplooi', 'H4: histone fold'], d: { nl: 'Het kerndeel van een histon. Twee histonen grijpen ermee in elkaar zoals twee handen bij een handdruk.', en: 'The core part of a histone. Two histones interlock with it like two hands in a handshake.' },
      p: { nl: 'Histonplooi (drie α-helices), dimeriserend volgens het ‘handshake’-motief.', en: 'Histone fold (three α-helices), dimerising in the ‘handshake’ motif.' } },
    { c: HC.H3, t: { nl: 'H3-staart', en: 'H3 tail' }, m: ['H4-staart', 'H4 tail'], d: { nl: 'Soepele staarten die uit de kern steken. Op hun lysines (rode bolletjes) kunnen merktekens komen.', en: 'Flexible tails sticking out of the core. Marks can be placed on their lysines (red spheres).' },
      p: { nl: 'N-terminale staarten van H3 en H4 met lysines; substraat voor posttranslationele modificaties. In het kristal in één ligging bevroren.', en: 'N-terminal tails of H3 and H4 with lysines; substrate for post-translational modifications. Frozen in one position in the crystal.' } },
    { c: '#ffc247', t: 'arginines ↔ DNA', d: { nl: 'De gele staafjes: bouwstenen (arginines) die de buitenkant van het DNA vastpakken, niet de letters. Daarom past bijna elk stuk DNA eromheen.', en: 'The yellow sticks: building blocks (arginines) that grip the outside of the DNA, not the letters. That is why almost any piece of DNA fits around it.' },
      p: { nl: 'Arginines die in de kleine groef en op de fosfaatruggengraat contact maken; vooral sequentie-onafhankelijke binding.', en: 'Arginines contacting the minor groove and the phosphate backbone; largely sequence-independent binding.' } },
  ],
  steps: [
    { dur: 7500, spin: .02, focus: OVER({ nl: 'DNA, 1,7 keer rondgewikkeld', en: 'DNA, wrapped 1.7 times' }), zoom: {},
      title: { nl: 'Het nucleosoom', en: 'The nucleosome' },
      text: { nl: 'Dit is de echte structuur: DNA gewikkeld rond acht eiwitten. Samen vormen ze een schijfje van ~11 nm.', en: 'This is the real structure: DNA wrapped around eight proteins. Together they form a disc of ~11 nm.' } },
    { dur: 8500, spin: .015, focus: { sel: DNA, style: dnaStyle, label: { nl: '147 bp DNA', en: '147 bp DNA' } },
      title: { nl: 'Het DNA wikkelt zich rond', en: 'The DNA wraps around' },
      text: { nl: 'Het DNA draait bijna twee keer rond de eiwitkern. Het blijft een gewone dubbelhelix, maar sterk gebogen.', en: 'The DNA goes almost twice around the protein core. It stays an ordinary double helix, just strongly bent.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H3, style: cart(HC.H3), label: { nl: 'H3 (×2)', en: 'H3 (×2)' }, labelColor: HC.H3, labelOff: [-80, -18] }, { sel: H4, style: cart(HC.H4), label: { nl: 'H4 (×2)', en: 'H4 (×2)' }, labelColor: HC.H4, labelOff: [80, 18] }], zoom: {},
      title: { nl: 'Het hart van het klosje', en: 'The heart of the spool' },
      text: { nl: 'In het midden zitten twee paren van de eiwitten H3 en H4 (histonen). Dit deel houdt het middelste stuk DNA vast.', en: 'At the centre sit two pairs of the proteins H3 and H4 (histones). This part holds the middle stretch of DNA.' } },
    { dur: 8000, spin: .015, focus: [{ sel: H2A, style: cart(HC.H2A), label: { nl: 'H2A (×2)', en: 'H2A (×2)' }, labelColor: HC.H2A, labelOff: [-80, -18] }, { sel: H2B, style: cart(HC.H2B), label: { nl: 'H2B (×2)', en: 'H2B (×2)' }, labelColor: HC.H2B, labelOff: [80, 18] }], zoom: {},
      title: { nl: 'Twee paren komen erbij', en: 'Two more pairs join' },
      text: { nl: 'Aan elke kant komt een paar H2A–H2B bij. Zo zijn er acht histonen: van elk soort twee.', en: 'An H2A–H2B pair joins on each side. That makes eight histones: two of each kind.' } },
    { dur: 8500, spin: .01, focus: [{ sel: { chain: 'A', resi: '63-131' }, style: cart(HC.H3), label: { nl: 'H3: histonplooi', en: 'H3: histone fold' }, labelColor: HC.H3, labelOff: [-80, -18] }, { sel: { chain: 'B', resi: '30-93' }, style: cart(HC.H4), label: { nl: 'H4: histonplooi', en: 'H4: histone fold' }, labelColor: HC.H4, labelOff: [80, 18] }],
      zoom: { chain: ['A', 'B'], resi: '28-131' },
      title: { nl: 'Eiwitten in een handdruk', en: 'Proteins in a handshake' },
      text: { nl: 'Twee histonen grijpen in elkaar zoals twee handen bij een handdruk, hier H3 en H4.', en: 'Two histones interlock like two hands in a handshake, here H3 and H4.' } },
    { dur: 9000, spin: .012,
      focus: [{ sel: { chain: ['A', 'E'], resi: '1-37' }, style: { cartoon: { color: HC.H3 }, stick: { radius: .25, color: HC.H3 } }, label: { nl: 'H3-staart', en: 'H3 tail' }, labelColor: HC.H3, labelOff: [-150, 60], node: 'histonmod', labelSel: { chain: 'A', resi: 9, atom: 'CA' } },   // anker op K9 van één staart (het midden van beide kopieën viel in lege ruimte)
        { sel: { chain: ['B', 'F'], resi: '1-24' }, style: { cartoon: { color: HC.H4 }, stick: { radius: .25, color: HC.H4 } }, label: { nl: 'H4-staart', en: 'H4 tail' }, labelColor: HC.H4, labelOff: [150, -60], node: 'histonmod', labelSel: { chain: 'B', resi: 16, atom: 'CA' } },   // anker op K16 van één staart
        { sel: { chain: ['A', 'E', 'B', 'F'], resn: 'LYS', resi: '1-37' }, style: { sphere: { radius: 1.8, color: '#ff6b6b' } } }],
      zoom: {}, pad: .9,
      title: { nl: 'Staarten steken naar buiten', en: 'Tails stick out' },
      text: { nl: 'De histonen hebben uitstekende staarten. Op hun lysines (rood, een aminozuur) kunnen merktekens komen.', en: 'The histones have tails that stick out. Their lysines (red, an amino acid) can receive marks.' } },
    { dur: 8500, spin: .01,
      focus: [{ sel: DNA, style: { cartoon: { color: C.dna, opacity: .8 } } },
        { sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], resn: 'ARG', byres: true, within: { distance: 3.5, sel: { chain: ['I', 'J'] } } }, style: { stick: { radius: .45, color: '#ffc247' } }, label: { nl: 'arginines ↔ DNA', en: 'arginines ↔ DNA' } }],
      zoom: {},
      title: { nl: 'Hoe het DNA vastzit', en: 'How the DNA is held' },
      text: { nl: 'Histonen pakken de buitenkant van het DNA vast, niet de letters. Daarom past bijna elk stuk DNA eromheen.', en: 'Histones grip the outside of the DNA, not the letters. That is why almost any piece of DNA can wrap around them.' } },
    { dur: 7500, spin: .02, focus: OVER({ nl: 'hier loopt het DNA verder naar het volgende nucleosoom', en: 'here the DNA runs on to the next nucleosome' }, { chain: 'I', resi: 73 }), zoom: {},
      title: { nl: 'Verder inzoomen op het DNA', en: 'Zooming further into the DNA' },
      text: { nl: 'Dit is één nucleosoom; in de cel loopt het DNA verder naar het volgende. Hierna: de DNA-dubbelhelix zelf.', en: 'This is one nucleosome; in the cell the DNA runs on to the next one. Next: the DNA double helix itself.' } },
  ],
  hotspots: [
    { node: 'dnahelix', label: { nl: 'DNA-dubbelhelix →', en: 'DNA double helix →' }, color: C.dna },
    { node: 'histonmod', label: { nl: 'Histonmodificaties', en: 'Histone modifications' }, color: '#ff6b6b' },
    { node: 'chromatine', label: { nl: '← Chromatine', en: '← Chromatin' }, color: C.histone },
    { node: 'dnamethyl', label: { nl: 'DNA-methylatie', en: 'DNA methylation' }, color: C.methyl },
  ],
});
