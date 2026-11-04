import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 6OUL: E. coli RNA-polymerase-σ70-holo-enzym op de rpsT P2-promoter (cryo-EM 3,4 Å; Chen et al., eLife 2019).
 * Ketens (auth): G, H α (N-terminaal) · R α-CTD · I β · J β′ · K ω · L σ70 (RpoD, P00579) · P niet-matrijsstreng · Q matrijsstreng.
 * Nagekeken in het mmCIF-bestand (04-11-2026):
 *  - niet-matrijsstreng P: TTGACA = P 26–31 (−35-element, perfecte consensus); met 17 bp tussenruimte ligt het −10-element op P 49–54.
 *    P 58–62 is niet gemodelleerd (open bubbel). Matrijsstreng Q paart antiparallel: Q(i) ↔ P(96 − i), dus −35 = Q 65–70.
 *  - σ70-nummering volgt UniProt P00579: motief TYATWWIRQ = L 429–437 (W433/W434 aan de −10), RERIRQIE = L 584–591 (domein 4.2, −35).
 *    Domeinen (benaderend): σ2 ≈ 375–449, σ4 ≈ 540–613. */
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const COL = { G: '#8190b0', H: '#94a3bf', R: '#a3b0c8', I: '#d98cf0', J: '#9b7bff', K: '#c9a574', L: '#e8a23a' };
const base = [
  ...Object.entries(COL).map(([ch, c]) => ({ sel: { chain: ch }, style: { cartoon: { color: c, opacity: .9 } } })),
  { sel: { chain: 'P' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .15 } } },
  { sel: { chain: 'Q' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .15 } } },
];
const L3 = (nl, en) => ({ nl, en });
const DNA = [{ sel: { chain: 'P' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } } }, { sel: { chain: 'Q' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }];
const M35 = [{ sel: { chain: 'P', resi: range(26, 31) }, style: { stick: { color: '#ffc247', radius: .35 } }, label: L3('−35 (TTGACA)', '−35 (TTGACA)') }, { sel: { chain: 'Q', resi: range(65, 70) }, style: { stick: { color: '#ffc247', radius: .35 } } }];
const M10 = { sel: { chain: 'P', resi: range(49, 54) }, style: { stick: { color: '#ff8a3d', radius: .35 } }, label: L3('−10', '−10') };

export default structure3d({
  id: 'bpol', pdb: '6OUL',
  title: L3('Eén RNA-polymerase, met een σ-factor als gids', 'One RNA polymerase, with a σ factor as guide'),
  scale: { nl: '≈ 15 nm · ≈ 0,45 MDa', en: '≈ 15 nm · ≈ 0.45 MDa' }, time: L3('opening van de promoter: seconden', 'promoter opening: seconds'),
  org: L3('bacterie (Escherichia coli) · PDB 6OUL', 'bacterium (Escherichia coli) · PDB 6OUL'),
  legend: [[COL.J, 'β′'], [COL.I, 'β'], [COL.G, 'α (2×)'], [COL.K, 'ω'], [COL.L, 'σ70'], [C.dna, L3('niet-matrijsstreng', 'non-template strand')], [C.dna2, L3('matrijsstreng', 'template strand')], ['#ffc247', '−35'], ['#ff8a3d', '−10']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur (Chen et al., <i>eLife</i> 2019): het RNA-polymerase van E. coli met σ70 op een promoter waarvan het DNA al open is. Sleep om te draaien, scroll om te zoomen. Vergelijk met de menselijke RNA-polymerase II.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure (Chen et al., <i>eLife</i> 2019): E. coli RNA polymerase with σ70 on a promoter whose DNA is already open. Drag to rotate, scroll to zoom. Compare with human RNA polymerase II.</p>' },
  simplified: {
    nl: 'Een deel van het DNA in de open bubbel is niet zichtbaar in de dichtheid, net als enkele flexibele lussen van σ70 en de verbinding naar de α-staarten. De domeingrenzen van σ70 zijn bij benadering. Na de start laat σ meestal los, maar niet altijd meteen; dat is hier niet getoond.',
    en: 'Part of the DNA in the open bubble is not visible in the density, nor are some flexible loops of σ70 and the linker to the α tails. The domain boundaries of σ70 are approximate. After initiation σ usually lets go, but not always right away; this is not shown.' },
  base,
  hide: { resn: ['HOH', 'WAT', '1N7'] },
  steps: [
    { dur: 8000, title: L3('Eén enzym maakt alle RNA', 'One enzyme makes all RNA'), focus: null, zoom: {}, spin: .012,
      text: L3('Bacteriën hebben maar één soort RNA-polymerase. Hier zit het op een promoter, met het DNA al open.', 'Bacteria have only one kind of RNA polymerase. Here it sits on a promoter, with the DNA already open.') },
    { dur: 8000, title: L3('De kern: vijf eiwitten', 'The core: five proteins'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'J' }, style: { cartoon: { color: COL.J } }, label: 'β′' }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I } }, label: 'β' },
        { sel: { chain: 'G' }, style: { cartoon: { color: COL.G } }, label: 'α' }, { sel: { chain: 'H' }, style: { cartoon: { color: COL.H } } }, { sel: { chain: 'K' }, style: { cartoon: { color: COL.K } }, label: 'ω' }],
      text: L3('Twee α’s, β, β′ en ω vormen de kern. β en β′ zijn de grootste en vormen kaken rond het DNA.', 'Two α’s, β, β′ and ω form the core. β and β′ are the largest and form jaws around the DNA.') },
    { dur: 8000, title: L3('De σ-factor is de gids', 'The σ factor is the guide'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'L' }, style: { cartoon: { color: COL.L } }, label: 'σ70' }, ...DNA],
      text: L3('σ70 ligt over de buitenkant. Zonder σ vindt de kern de promoter niet.', 'σ70 lies across the outside. Without σ the core cannot find the promoter.') },
    { dur: 9000, title: L3('σ leest de −35', 'σ reads the −35'), zoom: { chain: 'P', resi: range(22, 35) }, spin: .006,
      focus: [{ sel: { chain: 'L', resi: range(540, 613) }, style: { cartoon: { color: COL.L } }, label: L3('σ-domein 4', 'σ domain 4') }, ...DNA, ...M35],
      text: L3('Het uiteinde van σ70 (domein 4) past in de groef van het DNA en leest de −35.', 'The end of σ70 (domain 4) fits into the groove of the DNA and reads the −35.') },
    { dur: 9000, title: L3('σ grijpt de −10 en opent het DNA', 'σ grips the −10 and opens the DNA'), zoom: { chain: 'P', resi: range(46, 57) }, spin: .006,
      focus: [{ sel: { chain: 'L', resi: range(375, 449) }, style: { cartoon: { color: COL.L } }, label: L3('σ-domein 2', 'σ domain 2') }, ...DNA, M10],
      text: L3('Domein 2 bindt de −10. Daar gaan de twee strengen uit elkaar: een open bubbel.', 'Domain 2 binds the −10. There the two strands come apart: an open bubble.') },
    { dur: 8000, title: L3('Klaar om RNA te maken', 'Ready to make RNA'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'Q' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .25 } }, label: L3('matrijsstreng', 'template strand') }, { sel: { chain: 'P' }, style: { cartoon: { color: C.dna } } },
        { sel: { chain: 'J' }, style: { cartoon: { color: COL.J, opacity: .55 } } }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I, opacity: .55 } } }],
      text: L3('De matrijsstreng ligt nu in de kloof. Zodra het enzym de promoter verlaat, laat σ meestal los.', 'The template strand now lies in the cleft. Once the enzyme leaves the promoter, σ usually lets go.') },
    { dur: 8000, title: L3('Vergelijk: ons RNA-polymerase II', 'Compare: our RNA polymerase II'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'J' }, style: { cartoon: { color: COL.J } }, label: L3('β′ ≈ Rpb1', 'β′ ≈ Rpb1') }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I } }, label: L3('β ≈ Rpb2', 'β ≈ Rpb2') }],
      text: L3('Ons Pol II telt 12 eiwitten, maar de kern lijkt sterk: β′ en β zijn familie van Rpb1 en Rpb2.', 'Our Pol II has 12 proteins, but the core is very similar: β′ and β are relatives of Rpb1 and Rpb2.') },
  ],
  hotspots: [
    { node: 'bgen', label: L3('← Onderdelen van een gen', '← Parts of a gene'), color: '#e8a23a' },
    { node: 'operon', label: L3('lac-operon →', 'lac operon →'), color: '#ff6b6b' },
    { node: 'rnapol', label: L3('Vergelijk: menselijk Pol II', 'Compare: human Pol II'), color: C.prot },
  ],
});
