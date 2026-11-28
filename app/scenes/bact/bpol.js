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
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)
const DNA = [{ sel: { chain: 'P' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } } }, { sel: { chain: 'Q' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }];
const M35 = [{ sel: { chain: 'P', resi: range(26, 31) }, style: { stick: { color: '#ffc247', radius: .35 } }, label: L3('−35 (TTGACA)', '−35 (TTGACA)'), labelColor: '#ffc247', labelOff: [150, -60] }, { sel: { chain: 'Q', resi: range(65, 70) }, style: { stick: { color: '#ffc247', radius: .35 } } }];
const M10 = { sel: { chain: 'P', resi: range(49, 54) }, style: { stick: { color: '#ff8a3d', radius: .35 } }, label: L3('−10', '−10'), labelColor: '#ff8a3d', labelOff: [-150, -60] };

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
  parts: [
    { c: COL.J, t: { nl: 'RNA-polymerase', en: 'RNA polymerase' }, d: { nl: 'Het RNA-enzym van de bacterie: het leest het DNA en maakt er RNA van. Het is opgebouwd uit vijf eiwitten.', en: 'The bacterium’s RNA enzyme: it reads the DNA and makes RNA from it. It is built from five proteins.' },
      p: { nl: 'Core-RNA-polymerase α₂ββ′ω (≈ 400 kDa), de enige DNA-afhankelijke RNA-polymerase van E. coli.', en: 'Core RNA polymerase α₂ββ′ω (≈ 400 kDa), the only DNA-dependent RNA polymerase of E. coli.' } },
    { c: COL.J, t: { nl: 'β′ (groot)', en: 'β′ (large)' }, m: ['β′ ≈ Rpb1'], d: { nl: 'Het grootste eiwit van het enzym. Samen met β vormt het de klem rond het DNA. Bij ons lijkt Rpb1 erop.', en: 'The largest protein of the enzyme. Together with β it forms the clamp around the DNA. In us, Rpb1 resembles it.' },
      p: { nl: 'β′-subeenheid (rpoC): vormt de klem en bevat het katalytische Mg²⁺-centrum; homoloog aan Rpb1 van Pol II.', en: 'β′ subunit (rpoC): forms the clamp and holds the catalytic Mg²⁺ centre; homologous to Rpb1 of Pol II.' } },
    { c: COL.I, t: { nl: 'β (groot)', en: 'β (large)' }, m: ['β ≈ Rpb2'], d: { nl: 'Het tweede grote eiwit; het vormt de andere kaak van de klem. Bij ons lijkt Rpb2 erop.', en: 'The second large protein; it forms the other jaw of the clamp. In us, Rpb2 resembles it.' },
      p: { nl: 'β-subeenheid (rpoB): tweede helft van het actieve centrum en bindingsplaats van rifampicine; homoloog aan Rpb2.', en: 'β subunit (rpoB): second half of the active centre and binding site of rifampicin; homologous to Rpb2.' } },
    { c: COL.G, t: 'α (2×)', d: { nl: 'Twee gelijke kleinere eiwitten die het enzym helpen opbouwen. Hun staartjes kunnen aanzet-eiwitten vastpakken.', en: 'Two identical smaller proteins that help build the enzyme. Their tails can grab activator proteins.' },
      p: { nl: 'α-dimeer (rpoA): de N-terminale domeinen zijn de assemblagebasis, de C-terminale domeinen (αCTD) binden UP-elementen en activatoren.', en: 'α dimer (rpoA): the N-terminal domains are the assembly platform, the C-terminal domains (αCTD) bind UP elements and activators.' } },
    { c: COL.K, t: 'ω', d: { nl: 'Het kleinste eiwitje van het enzym; het helpt β′ op zijn plaats te houden.', en: 'The smallest protein of the enzyme; it helps keep β′ in place.' },
      p: { nl: 'ω-subeenheid (rpoZ), chaperonneert de vouwing en assemblage van β′.', en: 'ω subunit (rpoZ), chaperones the folding and assembly of β′.' } },
    { c: COL.L, t: 'σ70', m: ['σ: de gids', 'σ: the guide'], d: { nl: 'Het gids-eiwit (sigmafactor): het herkent de startplek op het DNA en brengt het RNA-enzym erheen.', en: 'The guide protein (sigma factor): it recognises the start site on the DNA and brings the RNA enzyme there.' },
      p: { nl: 'Huishoud-sigmafactor RpoD; vormt met de core het holo-enzym en herkent −35 en −10.', en: 'Housekeeping sigma factor RpoD; forms the holoenzyme with the core and recognises −35 and −10.' } },
    { c: COL.L, t: { nl: 'σ-domein 4', en: 'σ domain 4' }, d: { nl: 'Het deel van het gids-eiwit dat het eerste herkenningsstukje (−35) leest.', en: 'The part of the guide protein that reads the first recognition stretch (−35).' },
      p: { nl: 'σ4 (regio 4.2) bindt de grote groef van de −35-box met een helix-turn-helixmotief.', en: 'σ4 (region 4.2) binds the major groove of the −35 box with a helix-turn-helix motif.' } },
    { c: COL.L, t: { nl: 'σ-domein 2', en: 'σ domain 2' }, d: { nl: 'Het deel van het gids-eiwit dat het tweede herkenningsstukje (−10) vastgrijpt en het DNA helpt openen.', en: 'The part of the guide protein that grips the second recognition stretch (−10) and helps open the DNA.' },
      p: { nl: 'σ2 (regio 2.3–2.4) herkent de −10-box en vangt geflipte basen van de niet-matrijsstreng; W433/W434 helpen bij het smelten.', en: 'σ2 (regions 2.3–2.4) recognises the −10 box and captures flipped-out bases of the non-template strand; W433/W434 aid melting.' } },
    { c: '#ffc247', t: '−35 (TTGACA)', d: { nl: 'Eerste herkenningsstukje van de startplek, ongeveer 35 letters vóór het beginpunt. Hier is het de ideale volgorde TTGACA.', en: 'First recognition stretch of the start site, about 35 letters before the starting point. Here it is the ideal sequence TTGACA.' },
      p: { nl: '−35-element met perfecte consensus TTGACA, op 17 bp van het −10-element.', en: '−35 element with perfect consensus TTGACA, 17 bp from the −10 element.' } },
    { c: '#ff8a3d', t: '−10', m: ['-10'], d: { nl: 'Tweede herkenningsstukje, ongeveer 10 letters vóór het beginpunt. Hier gaat het DNA open.', en: 'Second recognition stretch, about 10 letters before the starting point. Here the DNA opens.' },
      p: { nl: '−10-element (Pribnow-box); startpunt van het smelten tot de transcriptiebubbel.', en: '−10 element (Pribnow box); nucleation site of melting into the transcription bubble.' } },
    { c: '#ffe066', t: { nl: 'open bubbel: strengen uit elkaar', en: 'open bubble: strands apart' }, m: ['andere streng', 'other strand'], d: { nl: 'Hier zijn de twee DNA-strengen uit elkaar gegaan, zodat het enzym de letters kan lezen.', en: 'Here the two DNA strands have come apart, so the enzyme can read the letters.' },
      p: { nl: 'Transcriptiebubbel van het open promotercomplex (RPo), ≈ 13 bp gesmolten DNA van −11 tot +2.', en: 'Transcription bubble of the open promoter complex (RPo), ≈ 13 bp of melted DNA from −11 to +2.' } },
    { c: C.dna, t: 'DNA', d: { nl: 'De DNA-draad met de startplek van een gen. Lichtblauw is de ene streng, donkerder de andere.', en: 'The DNA strand with the start site of a gene. Light blue is one strand, darker the other.' },
      p: { nl: 'Promoter-DNA (rpsT P2); de niet-matrijsstreng heeft dezelfde volgorde als het RNA.', en: 'Promoter DNA (rpsT P2); the non-template strand has the same sequence as the RNA.' } },
    { c: C.dna2, t: { nl: 'matrijsstreng', en: 'template strand' }, d: { nl: 'De DNA-streng die echt gelezen wordt: het RNA wordt er letter voor letter op gebouwd.', en: 'The DNA strand that is actually read: the RNA is built on it letter by letter.' },
      p: { nl: 'Matrijsstreng, 3′→5′ gelezen in het actieve centrum; het RNA is er complementair aan.', en: 'Template strand, read 3′→5′ in the active centre; the RNA is complementary to it.' } },
  ],
  steps: [
    { dur: 8000, title: L3('Eén enzym maakt alle RNA', 'One enzyme makes all RNA'), focus: null, zoom: {}, tags: [TAG({ chain: ['G', 'H', 'I', 'J', 'K'] }, 'RNA-polymerase', 'RNA polymerase', COL.J, [-160, 80]), TAG({ chain: 'L' }, 'σ: de gids', 'σ: the guide', COL.L, [160, 80]), TAG({ chain: 'P' }, 'DNA', 'DNA', C.dna, [150, -80])], spin: .012,
      text: L3('Bacteriën hebben maar één soort RNA-polymerase. Hier zit het op een promoter, met het DNA al open.', 'Bacteria have only one kind of RNA polymerase. Here it sits on a promoter, with the DNA already open.') },
    { dur: 8000, title: L3('De kern: vijf eiwitten', 'The core: five proteins'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'J' }, style: { cartoon: { color: COL.J } }, label: L3('β′ (groot)', 'β′ (large)'), labelColor: COL.J, labelOff: [-150, 70] }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I } }, label: L3('β (groot)', 'β (large)'), labelColor: COL.I, labelOff: [150, 70] },
        { sel: { chain: ['G', 'H'] }, style: { cartoon: { color: COL.G } }, label: L3('α (2×)', 'α (2×)'), labelColor: COL.G, labelOff: [-150, -70] }, { sel: { chain: 'H' }, style: { cartoon: { color: COL.H } } }, { sel: { chain: 'K' }, style: { cartoon: { color: COL.K } }, label: 'ω', labelColor: COL.K, labelOff: [150, -70] }],
      text: L3('Twee α’s, β, β′ en ω vormen de kern. β en β′ zijn de grootste en vormen kaken rond het DNA.', 'Two α subunits, β, β′ and ω form the core. β and β′ are the largest and form jaws around the DNA.') },
    { dur: 8000, title: L3('De σ-factor is de gids', 'The σ factor is the guide'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'L' }, style: { cartoon: { color: COL.L } }, label: 'σ70' }, ...DNA],
      text: L3('σ70 ligt over de buitenkant. Zonder σ vindt de kern de promoter niet.', 'σ70 lies across the outside. Without σ the core cannot find the promoter.') },
    { dur: 9000, title: L3('σ leest de −35', 'σ reads the −35'), zoom: { chain: 'P', resi: range(22, 35) }, spin: .006,
      focus: [{ sel: { chain: 'L', resi: range(540, 613) }, style: { cartoon: { color: COL.L } }, label: L3('σ-domein 4', 'σ domain 4'), labelColor: COL.L, labelOff: [-150, 60] }, ...DNA, ...M35],
      text: L3('Het uiteinde van σ70 (domein 4) past in de groef van het DNA en leest de −35.', 'The end of σ70 (domain 4) fits into the groove of the DNA and reads the −35.') },
    { dur: 9000, title: L3('σ grijpt de −10 en opent het DNA', 'σ grips the −10 and opens the DNA'), zoom: { chain: 'P', resi: range(46, 57) }, spin: .006,
      // de open bubbel: niet-matrijsstreng P 50–57 (los, fel) en de matrijsstreng ertegenover (Q 31–36 en 47–50; Q 37–46 niet gemodelleerd)
      focus: [{ sel: { chain: 'L', resi: range(375, 449) }, style: { cartoon: { color: COL.L, opacity: .7 } }, label: L3('σ-domein 2', 'σ domain 2'), labelColor: COL.L, labelOff: [-160, 70] }, ...DNA, M10,
        { sel: { chain: 'P', resi: range(55, 57) }, style: { stick: { color: '#ffe066', radius: .45 }, sphere: { color: '#ffe066', radius: .8 } } },
        { sel: { chain: 'P', resi: range(50, 54) }, style: { stick: { color: '#ff8a3d', radius: .45 }, sphere: { color: '#ff8a3d', radius: .8 } } },
        { sel: { chain: 'Q', resi: [...range(31, 36), ...range(47, 50)] }, style: { stick: { color: '#5fd3e6', radius: .45 }, sphere: { color: '#5fd3e6', radius: .8 } }, label: L3('andere streng', 'other strand'), labelColor: '#5fd3e6', labelOff: [160, -60] }],
      tags: [TAG({ chain: 'P', resi: range(53, 57) }, 'open bubbel: strengen uit elkaar', 'open bubble: strands apart', '#ffe066', [0, 120])],
      text: L3('Domein 2 bindt de −10. Daar gaan de twee strengen uit elkaar: een open bubbel.', 'Domain 2 binds the −10. There the two strands come apart: an open bubble.') },
    { dur: 8000, title: L3('Klaar om RNA te maken', 'Ready to make RNA'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'Q' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .25 } }, label: L3('matrijsstreng', 'template strand'), labelColor: C.dna2, labelOff: [-150, 70] }, { sel: { chain: 'P' }, style: { cartoon: { color: C.dna } } },
        { sel: { chain: 'J' }, style: { cartoon: { color: COL.J, opacity: .55 } } }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I, opacity: .55 } } }],
      text: L3('De matrijsstreng ligt nu in de kloof. Zodra het enzym de promoter verlaat, laat σ meestal los.', 'The template strand now lies in the cleft. Once the enzyme leaves the promoter, σ usually lets go.') },
    { dur: 8000, title: L3('Vergelijk: ons RNA-polymerase II', 'Compare: our RNA polymerase II'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'J' }, style: { cartoon: { color: COL.J } }, label: L3('β′ ≈ Rpb1', 'β′ ≈ Rpb1'), labelColor: COL.J, labelOff: [-150, 60], node: 'rnapol' }, { sel: { chain: 'I' }, style: { cartoon: { color: COL.I } }, label: L3('β ≈ Rpb2', 'β ≈ Rpb2'), labelColor: COL.I, labelOff: [150, -60], node: 'rnapol' }],
      text: L3('Ons Pol II telt 12 eiwitten, maar de kern lijkt sterk: β′ en β zijn familie van Rpb1 en Rpb2.', 'Our Pol II has 12 proteins, but the core is very similar: β′ and β are relatives of Rpb1 and Rpb2.') },
  ],
  hotspots: [
    { node: 'bgen', label: L3('← Onderdelen van een gen', '← Parts of a gene'), color: '#e8a23a' },
    { node: 'operon', label: L3('lac-operon →', 'lac operon →'), color: '#ff6b6b' },
    { node: 'rnapol', label: L3('Vergelijk: menselijk Pol II', 'Compare: human Pol II'), color: C.prot },
  ],
});
