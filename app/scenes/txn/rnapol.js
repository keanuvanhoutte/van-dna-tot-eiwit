import { structure3d } from '../../kit3d.js';
import { C } from '../../kit.js';

/* PDB 5FLM: transcriberend RNA-polymerase II van een zoogdier (Bos taurus, cryo-EM 3,4 Å; Bernecky et al., Nature 2016).
 * Ketens (auth): A Rpb1 · B Rpb2 · C Rpb3 · D Rpb4 · E Rpb5 · F Rpb6 · G Rpb7 · H Rpb8 · I Rpb9 · J Rpb10 · K Rpb11 · L Rpb12
 *                T matrijs-DNA · N niet-matrijs-DNA · P RNA.  Mg²⁺ = HETATM MG (keten A).
 * Nummering in 5FLM (nagekeken in het mmCIF-bestand): actief-centrummotief NADFDGD = Rpb1 493–499 (Asp 495/497/499),
 * brughelix = Rpb1 832–869 (TPTEFFFHAMGG…), triggerlus = Rpb1 1099–1129 (1109–1114 niet gemodelleerd).
 * Controle 29-09-2026: 5FLM-nummering = humaan POLR2A (P24928, 0 verschillen); gist-BH 810–845 en gist-TL 1076–1106 (P04050)
 * vallen na alignering op 833–868 en 1099–1129; gist-His1085/Leu1081 ↔ His1108/Leu1104,
 * laatste gemodelleerde Rpb1-residu = 1487 (de CTD zelf is flexibel en niet zichtbaar). */
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const COL = { A: '#9b7bff', B: '#d98cf0', C: '#8190b0', D: '#c9a574', E: '#7486a3', F: '#94a3bf', G: '#dcb483', H: '#6b7d99', I: '#a3b0c8', J: '#7a8aa6', K: '#8b98b3', L: '#b0bbd0' };
const DIM = '#5b6784';
const base = [
  ...Object.entries(COL).map(([ch, c]) => ({ sel: { chain: ch }, style: { cartoon: { color: c, opacity: .9 } } })),
  { sel: { chain: 'T' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .15 } } },
  { sel: { chain: 'N' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .15 } } },
  { sel: { chain: 'P' }, style: { cartoon: { color: C.rna }, stick: { color: C.rna, radius: .2 } } },
  { sel: { resn: 'MG' }, style: { sphere: { color: '#7fdc6a', radius: 1.6 } } },
];
const MG = { resn: 'MG' };
const L3 = (nl, en) => ({ nl, en });

export default structure3d({
  id: 'rnapol', pdb: '5FLM',
  title: L3('RNA-polymerase II', 'RNA polymerase II'),
  scale: { nl: '≈ 15 nm · ≈ 0,5 MDa', en: '≈ 15 nm · ≈ 0.5 MDa' }, time: L3('≈ 20–50 nt/s tijdens elongatie', '≈ 20–50 nt/s during elongation'),
  org: L3('zoogdier (rund; ≈ identiek aan mens) · PDB 5FLM', 'mammal (bovine; ≈ identical to human) · PDB 5FLM'),
  legend: [[COL.A, 'Rpb1'], [COL.B, 'Rpb2'], [COL.D, 'Rpb4/Rpb7'], [DIM, L3('overige subeenheden', 'other subunits')], [C.dna2, L3('matrijsstreng', 'template strand')], [C.dna, L3('niet-matrijsstreng', 'non-template strand')], [C.rna, 'RNA'], ['#7fdc6a', 'Mg²⁺']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur (Bernecky et al., <i>Nature</i> 2016) van Pol II van het rund dat op een DNA-RNA-steiger transcribeert. Sleep om te draaien, scroll om te zoomen. Residunummers volgen het PDB-bestand. Vergelijk met PDB 1I6H (gist-Pol II, 10 subeenheden, zonder Rpb4/7).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure (Bernecky et al., <i>Nature</i> 2016) of bovine Pol II transcribing on a DNA–RNA scaffold. Drag to rotate, scroll to zoom. Residue numbers follow the PDB file. Compare with PDB 1I6H (yeast Pol II, 10 subunits, without Rpb4/7).</p>' },
  simplified: {
    nl: 'Structuur van het rund (Bos taurus) in plaats van de mens: Rpb1 is nagenoeg identiek. De DNA- en RNA-strengen zijn korte synthetische stukken (39 nt DNA, 20 nt RNA) en een deel van het DNA vóór en achter het enzym ontbreekt. De CTD en enkele flexibele lussen (o.a. de top van de triggerlus) zijn niet zichtbaar in de dichtheid.',
    en: 'Bovine (Bos taurus) instead of human structure: Rpb1 is nearly identical. The DNA and RNA strands are short synthetic pieces (39 nt DNA, 20 nt RNA) and part of the DNA upstream and downstream of the enzyme is missing. The CTD and some flexible loops (e.g. the tip of the trigger loop) are not visible in the density.' },
  base,
  steps: [
    { dur: 8000, title: L3('Pol II: 12 subeenheden', 'Pol II: 12 subunits'), focus: null, zoom: {}, spin: .012,
      text: L3('RNA-polymerase II is een machine van 12 eiwitten (subeenheden). Hier is hij aan het werk: het DNA en het nieuwe RNA zitten in de centrale kloof.', 'RNA polymerase II is a machine of 12 proteins (subunits). Here it is at work: the DNA and the new RNA sit in the central cleft.') },
    { dur: 8000, title: L3('Rpb1: de grootste subeenheid', 'Rpb1: the largest subunit'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A' }, style: { cartoon: { color: COL.A } }, label: L3('Rpb1', 'Rpb1') },
      text: L3('Rpb1, de grootste subeenheid, draagt het actieve centrum (waar RNA gebouwd wordt), de klem en aan het uiteinde de CTD-staart.', 'Rpb1, the largest subunit, carries the active site (where RNA is built), the clamp and, at its end, the CTD tail.') },
    { dur: 8000, title: L3('Rpb2 en de centrale kloof', 'Rpb2 and the central cleft'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: COL.A } }, label: L3('Rpb1', 'Rpb1') }, { sel: { chain: 'B' }, style: { cartoon: { color: COL.B } }, label: L3('Rpb2', 'Rpb2') }],
      text: L3('Rpb1 en Rpb2 vormen samen de twee kaken van een diepe kloof. Een beweeglijke klem sluit zich over het DNA.', 'Rpb1 and Rpb2 together form the two jaws of a deep cleft. A mobile clamp closes over the DNA.') },
    { dur: 8000, title: L3('Het DNA in de kloof', 'The DNA in the cleft'), zoom: { chain: ['T', 'N', 'P'] }, spin: .01,
      focus: [{ sel: { chain: 'T' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } }, label: L3('matrijsstreng', 'template strand') },
        { sel: { chain: 'N' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } }, label: L3('niet-matrijsstreng', 'non-template strand') }],
      text: L3('Het DNA komt binnen als dubbele helix en wordt geopend. Alleen de matrijsstreng loopt door naar het actieve centrum.', 'The DNA enters as a double helix and is opened. Only the template strand continues to the active site.') },
    { dur: 8000, title: L3('RNA–DNA-hybride en RNA-uitgang', 'RNA–DNA hybrid and RNA exit'), zoom: { chain: ['T', 'P'] }, spin: .01,
      focus: [{ sel: { chain: 'P' }, style: { cartoon: { color: C.rna }, stick: { color: C.rna, radius: .25 } }, label: 'RNA' }, { sel: { chain: 'T' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }],
      text: L3('Het nieuwe RNA blijft ~8 basen lang aan de matrijs gepaard. Daarna verlaat het het enzym via een eigen uitgangskanaal.', 'The new RNA stays paired with the template for ~8 bases. It then leaves the enzyme through its own exit channel.') },
    { dur: 9000, title: L3('Het actieve centrum: Mg²⁺', 'The active site: Mg²⁺'), zoom: { chain: 'A', resi: range(484, 506) }, spin: .006,
      focus: [{ sel: { chain: 'A', resi: [495, 497, 499] }, style: { stick: { color: COL.A, radius: .3 } } },
        { sel: MG, style: { sphere: { color: '#7fdc6a', radius: 1.8 } }, label: L3('Mg²⁺ op de Asp-lus (NADFDGD)', 'Mg²⁺ on the Asp loop (NADFDGD)') }, { sel: { chain: 'P' }, style: { stick: { color: C.rna, radius: .25 } } }],
      text: L3('Drie aspartaten van Rpb1 houden een magnesiumion (Mg²⁺) vast. Dat ion helpt het 3\'-uiteinde van het RNA aan de volgende nucleotide te koppelen.', 'Three aspartates of Rpb1 hold a magnesium ion (Mg²⁺). This ion helps join the 3\' end of the RNA to the next nucleotide.') },
    { dur: 9000, title: L3('Brughelix en triggerlus', 'Bridge helix and trigger loop'), zoom: { chain: 'A', resi: range(832, 869).concat(range(1099, 1129), [495]) }, spin: .008,
      focus: [{ sel: { chain: 'A', resi: range(832, 869) }, style: { cartoon: { color: '#7fdc6a' } }, label: L3('brughelix', 'bridge helix') },
        { sel: { chain: 'A', resi: range(1099, 1129) }, style: { cartoon: { color: '#ffc247' } }, label: L3('triggerlus', 'trigger loop') }, { sel: MG, style: { sphere: { color: '#7fdc6a', radius: 1.6 } } }],
      text: L3('De triggerlus klapt dicht over een passende nucleotide; samen met de brughelix stuurt hij het koppelen en het opschuiven. Nucleotiden komen binnen via een trechter.', 'The trigger loop folds over a matching nucleotide; together with the bridge helix it drives joining and moving on. Nucleotides enter through a funnel.') },
    { dur: 8000, title: L3('De stengel: Rpb4/Rpb7', 'The stalk: Rpb4/Rpb7'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'D' }, style: { cartoon: { color: COL.D } }, label: 'Rpb4' }, { sel: { chain: 'G' }, style: { cartoon: { color: COL.G } }, label: 'Rpb7' }],
      text: L3('Rpb4 en Rpb7 steken uit als een stengel naast de RNA-uitgang en kunnen het RNA binden. In de giststructuur 1I6H ontbreekt die stengel.', 'Rpb4 and Rpb7 protrude as a stalk next to the RNA exit and can bind the RNA. This stalk is missing from the yeast structure 1I6H.') },
    { dur: 9000, title: L3('De CTD: een onzichtbare staart', 'The CTD: an invisible tail'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A', resi: range(1455, 1487) }, style: { cartoon: { color: '#ffc247' }, stick: { color: '#ffc247', radius: .25 } }, label: L3('→ linker + CTD (niet zichtbaar)', '→ linker + CTD (not visible)') },
      text: L3('Hier eindigt het zichtbare Rpb1. Daarna volgt een flexibele staart (CTD): 52 herhalingen van YSPTSPS. Fosfaten op die staart roepen de RNA-bewerkingsenzymen op.', 'Here the visible Rpb1 ends. Then follows a flexible tail (CTD): 52 repeats of YSPTSPS. Phosphates on this tail recruit the RNA-processing enzymes.') },
  ],
  hotspots: [
    { node: 'promoter', label: L3('← Promoter & PIC', '← Promoter & PIC'), color: C.prot },
    { node: 'transcriptie', label: L3('Transcriptie →', 'Transcription →'), color: C.rna },
    { node: 'capping', label: L3('CTD → 5\'-capping', 'CTD → 5\' capping'), color: C.rna },
    { node: 'polymerasen', label: L3('Pol I en Pol III', 'Pol I and Pol III'), color: C.prot },
  ],
});
