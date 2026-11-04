import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 6WRF: E. coli ClpX–ClpP met een GFP-ssrA-substraat in de porie ("recognition complex"), cryo-EM 3,1 Å (Fei et al., eLife 2020, e61496; PMID 33089779).
 * Lokale kopie data/pdb/6WRF.cif ingekort tot de ruggengraat (N, CA, C, O). Ketens: A–F ClpX (zesring) · H–N ClpP (één zevenring)
 * · S substraat (alleen GFP-ssrA-residuen 268–274 zichtbaar: het ssrA-staartje in de ClpX-porie). */
const L3 = (nl, en) => ({ nl, en });
const X = ['A', 'B', 'C', 'D', 'E', 'F'], P = ['H', 'I', 'J', 'K', 'L', 'M', 'N'];
const XC = ['#9b7bff', '#b49bff', '#8466f0', '#c4b0ff', '#9b7bff', '#b49bff'], PC = '#5fd3e6', SC = '#7fdc6a';
const base = [
  ...X.map((c, i) => ({ sel: { chain: c }, style: { cartoon: { color: XC[i], opacity: .92 } } })),
  { sel: { chain: P }, style: { cartoon: { color: PC, opacity: .9 } } },
  { sel: { chain: 'S' }, style: { cartoon: { color: SC }, stick: { color: SC, radius: .35 } } },
];

export default structure3d({
  id: 'bafbraak', pdb: '6WRF',
  title: L3('Afbreken zonder ubiquitine', 'Breaking down without ubiquitin'),
  scale: { nl: '≈ 15 nm · ClpX₆ + ClpP₇', en: '≈ 15 nm · ClpX₆ + ClpP₇' }, time: L3('één eiwit: seconden tot minuten', 'one protein: seconds to minutes'),
  org: L3('bacterie (Escherichia coli) · PDB 6WRF', 'bacterium (Escherichia coli) · PDB 6WRF'),
  legend: [[XC[0], L3('ClpX (motor, 6×)', 'ClpX (motor, 6×)')], [PC, L3('ClpP (knipkamer)', 'ClpP (cutting chamber)')], [SC, L3('afbraaklabel (ssrA)', 'degradation tag (ssrA)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur (Fei et al., <i>eLife</i> 2020) van de afbraakmachine ClpXP van E. coli, met het staartje van een af te breken eiwit in de porie. Om snel te laden toont de figuur alleen de ruggengraat.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure (Fei et al., <i>eLife</i> 2020) of the E. coli degradation machine ClpXP, with the tail of a protein to be degraded in its pore. To load quickly, the figure only shows the backbone.</p>' },
  simplified: {
    nl: 'ClpP bestaat uit twee ringen van zeven; in deze structuur is één ring gemodelleerd. Van het substraat (GFP met ssrA-label) is alleen het staartje in de porie zichtbaar; de rest is flexibel of nog gevouwen buiten de machine. Andere proteasen (Lon, ClpAP, FtsH, HslUV) werken op een gelijkaardige manier maar zijn niet getoond. Sommige bacteriën (zoals de tuberculosebacterie) hebben wel een proteasoom, met een eigen label (Pup); HslV van E. coli is familie van het proteasoom.',
    en: 'ClpP consists of two rings of seven; one ring is modelled in this structure. Of the substrate (GFP with an ssrA tag) only the tail in the pore is visible; the rest is flexible or still folded outside the machine. Other proteases (Lon, ClpAP, FtsH, HslUV) work in a similar way but are not shown. Some bacteria (such as the tuberculosis bacterium) do have a proteasome, with their own tag (Pup); E. coli HslV is related to the proteasome.' },
  base,
  steps: [
    { dur: 8000, title: L3('Ook eiwitten moeten weg', 'Proteins have to go too'), focus: null, zoom: {}, spin: .012,
      text: L3('E. coli heeft geen ubiquitine en geen proteasoom. Ze gebruikt eigen afbraakmachines, zoals ClpXP.', 'E. coli has no ubiquitin and no proteasome. It uses its own degradation machines, such as ClpXP.') },
    { dur: 8000, title: L3('ClpX: een motor van zes', 'ClpX: a motor of six'), zoom: {}, spin: .012,
      focus: X.map((c, i) => ({ sel: { chain: c }, style: { cartoon: { color: XC[i] } }, ...(i ? {} : { label: L3('ClpX-ring', 'ClpX ring') }) })),
      text: L3('ClpX is een ring van zes eiwitten die ATP verbruiken. Ze trekken een eiwit open.', 'ClpX is a ring of six proteins that use ATP. They pull a protein open.') },
    { dur: 9000, title: L3('Een staartje als afbraaklabel', 'A tail as a degradation tag'), zoom: { chain: 'S' }, spin: .008,
      focus: [{ sel: { chain: 'S' }, style: { stick: { color: SC, radius: .45 } }, label: L3('ssrA-label', 'ssrA tag') }, ...X.map((c, i) => ({ sel: { chain: c }, style: { cartoon: { color: XC[i], opacity: .55 } } }))],
      text: L3('Veel af te breken eiwitten dragen een kort label, zoals ssrA. ClpX grijpt dat staartje in zijn porie.', 'Many proteins to be broken down carry a short tag, such as ssrA. ClpX grips that tail in its pore.') },
    { dur: 9000, title: L3('ClpP: de knipkamer', 'ClpP: the cutting chamber'), zoom: {}, spin: .012,
      focus: { sel: { chain: P }, style: { cartoon: { color: PC } }, label: L3('ClpP (ring van 7)', 'ClpP (ring of 7)') },
      text: L3('ClpX duwt de ontvouwen keten in ClpP. Binnenin knippen enzymen haar in kleine stukjes.', 'ClpX pushes the unfolded chain into ClpP. Inside, enzymes cut it into small pieces.') },
    { dur: 8000, title: L3('Vergelijk: het proteasoom', 'Compare: the proteasome'), focus: null, zoom: {}, spin: .012,
      text: L3('Bij de mens markeert ubiquitine eiwitten voor het proteasoom. Het principe is hetzelfde: ontvouwen en in een kamer knippen.', 'In humans ubiquitin marks proteins for the proteasome. The principle is the same: unfold and cut in a chamber.') },
  ],
  hotspots: [
    { node: 'chaperones', label: L3('← Chaperonnes (GroEL)', '← Chaperones (GroEL)'), color: C.chain },
    { node: 'ubiquitine', label: L3('Vergelijk: proteasoom (mens)', 'Compare: proteasome (human)'), color: C.prot },
    { node: 'misvouwing', label: L3('Misvouwing', 'Misfolding'), color: C.danger },
  ],
});
