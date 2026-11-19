import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 5UAC: E. coli RNA-polymerase-σ70-holo-enzym met rifampicine (RFP), röntgen 3,8 Å (Molodtsov et al., Mol Microbiol 2017).
 * Lokale kopie data/pdb/5UAC.cif: alleen het eerste van de twee holo-enzymen in het kristal (ketens A–F), rifampicine en het
 * Mg-ion van keten D; water en zink weggelaten (55 049 → 27 640 atomen). Ketens (auth, nagekeken via de RCSB-API 14-11-2026):
 *   A, B α · C β (RpoB, P0A8V2; RFP zit op C) · D β′ · E ω · F σ70.
 * Gemeten in het bestand: binnen 4 Å van RFP liggen β 509, 510, 512, 513, 514, 516, 526, 529, 531, 533, 540, 564, 572, 687
 * (o.a. D516, H526, S531: de drie posities uit Molodtsov 2017). Het Mg-ion zit tussen β′ D460, D462 en D464 (de actieve plek)
 * (NADFDGD-motief dat het Mg²⁺ van de actieve plek vasthoudt: Zaychikov et al., Science 1996) en ligt 14,4 Å van rifampicine (Campbell 2001: "meer dan 12 Å van de actieve plek"). Grootste afstand tussen twee atomen van RFP: 14,1 Å. */
const L3 = (nl, en) => ({ nl, en });
const COL = { a: '#8190b0', a2: '#94a3bf', b: '#d98cf0', b2: '#9b7bff', w: '#c9a574', s: '#e8a23a', rif: '#ff6b6b', mg: '#7fdc6a', mut: '#ffc247' };
const POCKET = [509, 510, 512, 513, 514, 516, 526, 529, 531, 533, 540, 564, 572, 687];
const MUT = [516, 526, 531];
const base = [
  { sel: { chain: 'A', hetflag: false }, style: { cartoon: { color: COL.a, opacity: .9 } } }, { sel: { chain: 'B', hetflag: false }, style: { cartoon: { color: COL.a2, opacity: .9 } } },
  { sel: { chain: 'C', hetflag: false }, style: { cartoon: { color: COL.b, opacity: .9 } } }, { sel: { chain: 'D', hetflag: false }, style: { cartoon: { color: COL.b2, opacity: .9 } } },
  { sel: { chain: 'E', hetflag: false }, style: { cartoon: { color: COL.w, opacity: .9 } } }, { sel: { chain: 'F', hetflag: false }, style: { cartoon: { color: COL.s, opacity: .9 } } },
  { sel: { resn: 'RFP' }, style: { stick: { color: COL.rif, radius: .35 }, sphere: { color: COL.rif, radius: .7 } } },
];
const RIF = (label) => ({ sel: { resn: 'RFP' }, style: { stick: { color: COL.rif, radius: .4 }, sphere: { color: COL.rif, radius: .9 } }, label });
const MG = (label) => ({ sel: { resn: 'MG' }, style: { sphere: { color: COL.mg, radius: 1.6 } }, label });

export default structure3d({
  id: 'rifampicine', pdb: '5UAC',
  title: L3('Rifampicine stopt het RNA-polymerase', 'Rifampicin stops RNA polymerase'),
  scale: { nl: '≈ 15 nm · rifampicine ≈ 1,4 nm', en: '≈ 15 nm · rifampicin ≈ 1.4 nm' }, time: L3('werkt bij de start van elk nieuw RNA', 'acts at the start of every new RNA'),
  org: L3('bacterie (Escherichia coli) · PDB 5UAC', 'bacterium (Escherichia coli) · PDB 5UAC'),
  legend: [[COL.b, 'β'], [COL.b2, 'β′'], [COL.a, 'α (2×)'], [COL.w, 'ω'], [COL.s, 'σ70'], [COL.rif, L3('rifampicine', 'rifampicin')], [COL.mg, L3('actieve plek (Mg²⁺)', 'active site (Mg²⁺)')],
    [COL.mut, L3('plekken van resistentie', 'resistance positions')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte röntgenstructuur van het RNA-polymerase van E. coli met rifampicine (Molodtsov et al., <i>Mol Microbiol</i> 2017). Het werkingsmechanisme komt uit Campbell et al. (<i>Cell</i> 2001). Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real X-ray structure of E. coli RNA polymerase with rifampicin (Molodtsov et al., <i>Mol Microbiol</i> 2017). The mechanism comes from Campbell et al. (<i>Cell</i> 2001). Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'In deze structuur zit geen DNA en geen RNA: hoe het korte RNA tegen rifampicine botst, is alleen verteld. Het kristal bevat twee kopieën van het enzym; hier staat er één. De drie gele posities zijn de plaatsen die in de studie bij resistente tuberkelbacteriën het vaakst veranderd waren, in de nummering van E. coli. Bij ons RNA-polymerase is dit stuk van het enzym niet bewaard; daarom staat er geen menselijk enzym naast.',
    en: 'This structure contains no DNA and no RNA: how the short RNA bumps into rifampicin is only told. The crystal holds two copies of the enzyme; one is shown here. The three yellow positions are the places most often changed in resistant tuberculosis bacteria in the study, in E. coli numbering. In our RNA polymerase this part of the enzyme is not conserved; that is why no human enzyme is shown alongside.' },
  base,
  hide: { resn: ['HOH', 'WAT', 'ZN'] },
  steps: [
    { dur: 8000, title: L3('Een antibioticum in het RNA-polymerase', 'An antibiotic inside RNA polymerase'), focus: null, zoom: {}, spin: .012,
      text: L3('Dit is het RNA-polymerase van E. coli, met het antibioticum rifampicine erin (rood).', 'This is the RNA polymerase of E. coli, with the antibiotic rifampicin inside (red).') },
    { dur: 8500, title: L3('Het zit in de β-eenheid', 'It sits in the β subunit'), zoom: { chain: 'C' }, spin: .01,
      focus: [{ sel: { chain: 'C', hetflag: false }, style: { cartoon: { color: COL.b } }, label: 'β' }, RIF(L3('rifampicine', 'rifampicin'))],
      text: L3('Rifampicine zit in een holte van β, diep in het kanaal waar het DNA en het nieuwe RNA lopen.', 'Rifampicin sits in a pocket of β, deep in the channel where the DNA and the new RNA run.') },
    { dur: 9000, title: L3('Niet op de plek waar RNA gemaakt wordt', 'Not where RNA is made'), zoom: { resn: ['RFP', 'MG'] }, spin: .006,
      focus: [{ sel: { chain: ['C', 'D'], hetflag: false }, style: { cartoon: { color: '#5d6a88', opacity: .55 } } }, RIF(L3('rifampicine', 'rifampicin')), MG(L3('actieve plek', 'active site'))],
      text: L3('De actieve plek, waar letters aan het RNA worden gekoppeld, ligt ruim 1 nanometer verder.', 'The active site, where letters are added to the RNA, lies more than 1 nanometre away.') },
    { dur: 9000, title: L3('Het nieuwe RNA botst ertegen', 'The new RNA bumps into it'), zoom: { resn: ['RFP', 'MG'] }, spin: .006,
      focus: [{ sel: { chain: ['C', 'D'], hetflag: false }, style: { cartoon: { color: '#5d6a88', opacity: .55 } } }, RIF(), MG()],
      text: L3('Is het nieuwe RNA 2 à 3 letters lang, dan stoot het op rifampicine. Verder groeien lukt niet.', 'Once the new RNA is 2 to 3 letters long, it runs into rifampicin. It cannot grow any further.') },
    { dur: 9000, title: L3('Eén bouwsteen anders: resistent', 'One building block changed: resistant'), zoom: { chain: 'C', resi: POCKET }, spin: .006,
      focus: [{ sel: { chain: 'C', hetflag: false }, style: { cartoon: { color: COL.b, opacity: .6 } } }, RIF(),
        { sel: { chain: 'C', resi: MUT }, style: { stick: { color: COL.mut, radius: .35 } } },
        { sel: { chain: 'C', resi: 531, atom: 'CA' }, style: { stick: { color: COL.mut, radius: .35 } }, label: 'S531', node: 'resistentie' }, { sel: { chain: 'C', resi: 526, atom: 'CA' }, style: { stick: { color: COL.mut, radius: .35 } }, label: 'H526', node: 'resistentie' },
        { sel: { chain: 'C', resi: 516, atom: 'CA' }, style: { stick: { color: COL.mut, radius: .35 } }, label: 'D516', node: 'resistentie' }],
      text: L3('Bij resistente bacteriën is vaak één van deze drie bouwstenen veranderd. Dan past rifampicine slecht of niet.', 'In resistant bacteria one of these three building blocks has often changed. Then rifampicin fits poorly or not at all.') },
    { dur: 8500, title: L3('Waarom ons enzym niet geraakt wordt', 'Why our enzyme is not hit'), focus: null, zoom: {}, spin: .012,
      text: L3('Deze holte is bij bacteriën sterk bewaard, maar bij ons RNA-polymerase is ze anders gebouwd.', 'This pocket is well conserved in bacteria, but in our RNA polymerase it is built differently.') },
  ],
  hotspots: [
    { node: 'antibiotica', label: L3('← Waar antibiotica aangrijpen', '← Where antibiotics strike'), color: '#ff6b6b' },
    { node: 'bpol', label: L3('Het RNA-polymerase aan het werk', 'RNA polymerase at work'), color: '#9b7bff' },
    { node: 'ribosoomremmers', label: L3('Antibiotica op het ribosoom →', 'Antibiotics on the ribosome →'), color: C.rrna },
  ],
});
