import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 1IHF: Integration Host Factor (E. coli) op 35 bp DNA, röntgen 2,5 Å (Rice et al., Cell 1996).
 * Ketens: A IHFα (99 aa) · B IHFβ (94 aa) · C één DNA-streng (35 nt) · D + E de andere streng (15 + 20 nt, met een breuk).
 * Nagekeken in het mmCIF-bestand (04-11-2026): de prolines die tussen de basen schuiven, liggen in de β-armen,
 * motief R-N-P-x-T-G: IHFα Pro65 (A 63–67 RNPKT) en IHFβ Pro64 (B 62–66 RNPKT). */
const L3 = (nl, en) => ({ nl, en });
const COL = { A: '#ffb27a', B: '#5fd3e6' };
const base = [
  { sel: { chain: 'A' }, style: { cartoon: { color: COL.A, opacity: .95 } } },
  { sel: { chain: 'B' }, style: { cartoon: { color: COL.B, opacity: .95 } } },
  { sel: { chain: 'C' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .16 } } },
  { sel: { chain: ['D', 'E'] }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .16 } } },
];
const DNA = [{ sel: { chain: 'C' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } } }, { sel: { chain: ['D', 'E'] }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }];

export default structure3d({
  id: 'bnucleoid', pdb: '1IHF',
  title: L3('DNA opvouwen zonder histonen', 'Folding DNA without histones'),
  scale: { nl: '35 bp DNA · ≈ 5 nm', en: '35 bp DNA · ≈ 5 nm' }, time: L3('binden en loslaten: seconden tot minuten', 'binding and release: seconds to minutes'),
  org: L3('bacterie (Escherichia coli) · PDB 1IHF', 'bacterium (Escherichia coli) · PDB 1IHF'),
  legend: [[COL.A, 'IHFα'], [COL.B, 'IHFβ'], [C.dna, L3('DNA-streng 1', 'DNA strand 1')], [C.dna2, L3('DNA-streng 2', 'DNA strand 2')], ['#ffc247', L3('proline in het DNA', 'proline in the DNA')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte röntgenstructuur (Rice et al., <i>Cell</i> 1996): het eiwit IHF van E. coli plooit DNA bijna dubbel. Sleep om te draaien, scroll om te zoomen. Vergelijk met het nucleosoom bij de mens.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real X-ray structure (Rice et al., <i>Cell</i> 1996): the E. coli protein IHF folds DNA almost in half. Drag to rotate, scroll to zoom. Compare with the human nucleosome.</p>' },
  simplified: {
    nl: 'Eén IHF op een kort stuk DNA van 35 bp. In de cel zitten tienduizenden kopieën van verschillende nucleoïd-eiwitten (HU, IHF, H-NS, Fis, …) op een DNA van 4,6 miljoen bp; hun aantal wisselt met de groeifase. H-NS, Fis, HU en gyrase staan niet in deze structuur: ze worden alleen in de tekst genoemd.',
    en: 'One IHF on a short 35 bp piece of DNA. In the cell, tens of thousands of copies of different nucleoid proteins (HU, IHF, H-NS, Fis, …) sit on a 4.6 million bp DNA; their numbers change with growth phase. H-NS, Fis, HU and gyrase are not in this structure: they are only mentioned in the text.' },
  base,
  steps: [
    { dur: 8000, title: L3('DNA opvouwen zonder histonen', 'Folding DNA without histones'), focus: null, zoom: {}, spin: .012,
      text: L3('E. coli en de meeste bacteriën hebben geen histonen. Kleine eiwitten buigen en bundelen hun DNA.', 'E. coli and most bacteria have no histones. Small proteins bend and bundle their DNA.') },
    { dur: 8000, title: L3('IHF: twee kleine eiwitten samen', 'IHF: two small proteins together'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: COL.A } }, label: 'IHFα' }, { sel: { chain: 'B' }, style: { cartoon: { color: COL.B } }, label: 'IHFβ' }],
      text: L3('IHF bestaat uit twee verwante eiwitten, α en β. Samen grijpen ze het DNA.', 'IHF consists of two related proteins, α and β. Together they grip the DNA.') },
    { dur: 9000, title: L3('Het DNA maakt een U-bocht', 'The DNA makes a U-turn'), zoom: {}, spin: .01,
      focus: DNA.map((d, i) => i ? d : { ...d, label: L3('DNA, meer dan 160° geplooid', 'DNA, bent more than 160°') }),
      text: L3('IHF buigt het DNA met meer dan 160°. De helix keert bijna helemaal om.', 'IHF bends the DNA by more than 160°. The helix almost turns right back.') },
    { dur: 9000, title: L3('Twee prolines als wiggen', 'Two prolines as wedges'), zoom: { chain: ['A', 'B'], resi: [65, 64] }, spin: .006,
      focus: [...DNA, { sel: { chain: 'A', resi: [65] }, style: { stick: { color: '#ffc247', radius: .4 } }, label: 'Pro65 (α)' }, { sel: { chain: 'B', resi: [64] }, style: { stick: { color: '#ffc247', radius: .4 } }, label: 'Pro64 (β)' },
        { sel: { chain: 'A', resi: [60, 61, 62, 63, 64, 66, 67, 68, 69, 70] }, style: { cartoon: { color: COL.A } } }, { sel: { chain: 'B', resi: [59, 60, 61, 62, 63, 65, 66, 67, 68, 69] }, style: { cartoon: { color: COL.B } } }],
      text: L3('Twee armen schuiven een proline tussen de basen. Daar knikt het DNA scherp.', 'Two arms push a proline in between the bases. There the DNA kinks sharply.') },
    { dur: 8000, title: L3('Meer helpers bundelen het DNA', 'More helpers bundle the DNA'), focus: null, zoom: {}, spin: .012,
      text: L3('HU buigt overal, H-NS overbrugt twee stukken DNA en Fis helpt bij snelle groei. Samen vormen ze de nucleoïd.', 'HU bends everywhere, H-NS bridges two pieces of DNA and Fis helps during fast growth. Together they form the nucleoid.') },
    { dur: 8000, title: L3('Extra draaiing: supercoiling', 'Extra twist: supercoiling'), focus: null, zoom: {}, spin: .012,
      text: L3('Het enzym gyrase draait het DNA losser op (negatieve supercoiling). Zo blijft het compact en gaat het makkelijker open.', 'The enzyme gyrase underwinds the DNA (negative supercoiling). This keeps it compact and easier to open.') },
  ],
  hotspots: [
    { node: 'bcel', label: L3('← Bacteriecel', '← Bacterial cell'), color: C.bact },
    { node: 'supercoiling', label: L3('Supercoiling & topo-isomerasen', 'Supercoiling & topoisomerases'), color: C.dna },
    { node: 'nucleosoom', label: L3('Vergelijk: nucleosoom (mens)', 'Compare: nucleosome (human)'), color: C.histone },
  ],
});
