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
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)

export default structure3d({
  id: 'rnapol', pdb: '5FLM',
  title: L3('RNA-polymerase II', 'RNA polymerase II'),
  scale: { nl: '≈ 15 nm · ≈ 0,5 MDa', en: '≈ 15 nm · ≈ 0.5 MDa' }, time: L3('gemiddeld ≈ 30–40 nt/s tijdens elongatie', 'on average ≈ 30–40 nt/s during elongation'),
  org: L3('zoogdier (rund; ≈ identiek aan mens) · PDB 5FLM', 'mammal (bovine; ≈ identical to human) · PDB 5FLM'),
  legend: [[COL.A, 'Rpb1'], [COL.B, 'Rpb2'], [COL.D, 'Rpb4/Rpb7'], [DIM, L3('overige subeenheden', 'other subunits')], [C.dna2, L3('matrijsstreng', 'template strand')], [C.dna, L3('niet-matrijsstreng', 'non-template strand')], [C.rna, 'RNA'], ['#7fdc6a', 'Mg²⁺']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte cryo-EM-structuur (Bernecky et al., <i>Nature</i> 2016) van Pol II van het rund dat op een DNA-RNA-steiger transcribeert. Sleep om te draaien, scroll om te zoomen. Residunummers volgen het PDB-bestand. Vergelijk met PDB 1I6H (gist-Pol II, 10 subeenheden, zonder Rpb4/7).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real cryo-EM structure (Bernecky et al., <i>Nature</i> 2016) of bovine Pol II transcribing on a DNA–RNA scaffold. Drag to rotate, scroll to zoom. Residue numbers follow the PDB file. Compare with PDB 1I6H (yeast Pol II, 10 subunits, without Rpb4/7).</p>' },
  simplified: {
    nl: 'Structuur van het rund (Bos taurus) in plaats van de mens: Rpb1 is nagenoeg identiek. De DNA- en RNA-strengen zijn korte synthetische stukken (39 nt DNA, 20 nt RNA) en een deel van het DNA vóór en achter het enzym ontbreekt. De CTD en enkele flexibele lussen (o.a. de top van de triggerlus) zijn niet zichtbaar in de dichtheid.',
    en: 'Bovine (Bos taurus) instead of human structure: Rpb1 is nearly identical. The DNA and RNA strands are short synthetic pieces (39 nt DNA, 20 nt RNA) and part of the DNA upstream and downstream of the enzyme is missing. The CTD and some flexible loops (e.g. the tip of the trigger loop) are not visible in the density.' },
  base,
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: COL.A, t: { nl: 'RNA-polymerase (12 eiwitten)', en: 'RNA polymerase (12 proteins)' }, d: { nl: 'Het enzym dat een RNA-kopie van een gen maakt. Het bestaat uit 12 eiwitten; DNA en RNA zitten in de kloof in het midden.', en: 'The enzyme that makes an RNA copy of a gene. It consists of 12 proteins; DNA and RNA sit in the cleft in the middle.' },
      p: { nl: 'RNA-polymerase II (Rpb1–Rpb12, ≈ 0,5 MDa) in elongatietoestand; transcribeert de eiwitcoderende genen.', en: 'RNA polymerase II (Rpb1–Rpb12, ≈ 0.5 MDa) in the elongation state; transcribes the protein-coding genes.' } },
    { c: COL.A, t: 'Rpb1', d: { nl: 'Het grootste eiwit (paars). Het bevat de plek waar het RNA gebouwd wordt.', en: 'The largest protein (purple). It holds the spot where the RNA is built.' },
      p: { nl: 'Grootste subeenheid; draagt het actieve centrum (NADFDGD-motief), de brughelix, de triggerlus en de CTD.', en: 'Largest subunit; carries the active site (NADFDGD motif), the bridge helix, the trigger loop and the CTD.' } },
    { c: COL.B, t: 'Rpb2', d: { nl: 'Het tweede grote eiwit (roze). Samen met Rpb1 vormt het de diepe kloof.', en: 'The second large protein (pink). Together with Rpb1 it forms the deep cleft.' },
      p: { nl: 'Op één na grootste subeenheid; vormt met Rpb1 de centrale kloof en het actieve centrum.', en: 'Second-largest subunit; forms the central cleft and active site together with Rpb1.' } },
    { c: '#ffc247', t: { nl: 'kaken (Rpb1, Rpb5, Rpb9)', en: 'jaws (Rpb1, Rpb5, Rpb9)' }, d: { nl: 'De kaken (geel) grijpen het DNA dat nog gelezen moet worden.', en: 'The jaws (yellow) grip the DNA that still has to be read.' },
      p: { nl: 'Kaakdomeinen van Rpb1, Rpb5 en Rpb9; contacteren het stroomafwaartse DNA-duplex.', en: 'Jaw domains of Rpb1, Rpb5 and Rpb9; contact the downstream DNA duplex.' } },
    { c: '#5fd3e6', t: { nl: 'klem (Rpb1, Rpb2, Rpb6)', en: 'clamp (Rpb1, Rpb2, Rpb6)' }, d: { nl: 'Een beweeglijk deel (turquoise) dat zich over het DNA sluit, zodat het enzym niet loslaat.', en: 'A movable part (turquoise) that closes over the DNA, so the enzyme does not let go.' },
      p: { nl: 'Mobiele klem (Rpb1, Rpb2, Rpb6); sluit de kloof tijdens elongatie en draagt bij aan de processiviteit.', en: 'Mobile clamp (Rpb1, Rpb2, Rpb6); closes the cleft during elongation and contributes to processivity.' } },
    { c: C.dna, t: 'DNA', d: { nl: 'Het DNA komt dubbel binnen in de kloof en gaat daar open.', en: 'The DNA enters the cleft double and opens up there.' },
      p: { nl: 'Korte synthetische DNA-steiger; de transcriptiebel ontstaat in de kloof.', en: 'Short synthetic DNA scaffold; the transcription bubble forms in the cleft.' } },
    { c: C.dna2, t: { nl: 'matrijsstreng', en: 'template strand' }, d: { nl: 'De DNA-streng die gelezen wordt (lichtblauw). Alleen deze streng loopt door naar binnen.', en: 'The DNA strand being read (light blue). Only this strand runs on inside.' },
      p: { nl: 'Matrijsstreng, 3′→5′ afgelezen; vormt in het actieve centrum een DNA-RNA-hybride van ≈ 8 bp.', en: 'Template strand, read 3′→5′; forms a DNA–RNA hybrid of ≈ 8 bp in the active site.' } },
    { c: C.dna, t: { nl: 'niet-matrijsstreng', en: 'non-template strand' }, d: { nl: 'De andere DNA-streng (blauw). Ze wordt niet gelezen en heeft dezelfde volgorde als het RNA (met T in plaats van U).', en: 'The other DNA strand (blue). It is not read and has the same sequence as the RNA (with T instead of U).' },
      p: { nl: 'Niet-matrijs- of coderende streng, verplaatst uit de bel; sequentie gelijk aan het transcript (T i.p.v. U).', en: 'Non-template or coding strand, displaced from the bubble; sequence identical to the transcript (T instead of U).' } },
    { c: C.rna, t: 'RNA', m: ['nieuw RNA', 'new RNA'], d: { nl: 'Het nieuwe RNA (oranje). Het blijft even aan het DNA vast en verlaat het enzym dan via een eigen uitgang.', en: 'The new RNA (orange). It stays attached to the DNA for a while and then leaves the enzyme through its own exit.' },
      p: { nl: 'Ontluikend transcript (20 nt in de steiger), 5′→3′ verlengd; verlaat de polymerase via het RNA-uitgangskanaal.', en: 'Nascent transcript (20 nt in the scaffold), extended 5′→3′; leaves the polymerase through the RNA exit channel.' } },
    { c: '#7fdc6a', t: 'Mg²⁺', d: { nl: 'Een magnesiumion (groen bolletje) in het hart van het enzym. Het helpt elke nieuwe bouwsteen aan het RNA te koppelen.', en: 'A magnesium ion (green ball) at the heart of the enzyme. It helps join each new building block to the RNA.' },
      p: { nl: 'Katalytisch Mg²⁺, gebonden door Asp495, Asp497 en Asp499 van het NADFDGD-motief; katalyseert de fosfodiestervorming.', en: 'Catalytic Mg²⁺, bound by Asp495, Asp497 and Asp499 of the NADFDGD motif; catalyses phosphodiester bond formation.' } },
    { c: '#7fdc6a', t: { nl: 'brughelix', en: 'bridge helix' }, d: { nl: 'Een lange staaf (groen) dwars door de kloof, vlak naast het actieve centrum.', en: 'A long rod (green) across the cleft, right next to the active site.' },
      p: { nl: 'Brughelix (Rpb1 832–869); overspant de kloof en werkt met de triggerlus samen bij nucleotide-inbouw en translocatie.', en: 'Bridge helix (Rpb1 832–869); spans the cleft and works with the trigger loop in nucleotide addition and translocation.' } },
    { c: '#ffc247', t: { nl: 'triggerlus', en: 'trigger loop' }, d: { nl: 'Een lusje (geel) dat dichtklapt over een passende bouwsteen. Zo stuurt het mee het koppelen.', en: 'A small loop (yellow) that folds over a matching building block. That way it helps drive the joining.' },
      p: { nl: 'Triggerlus (Rpb1 1099–1129); sluit over het juiste NTP en bevordert katalyse en nauwkeurigheid.', en: 'Trigger loop (Rpb1 1099–1129); closes over the correct NTP and promotes catalysis and fidelity.' } },
    { c: COL.D, t: 'Rpb4', m: ['Rpb7'], d: { nl: 'Twee eiwitten die als een stengel uitsteken naast de RNA-uitgang. Ze pakken mogelijk het RNA vast.', en: 'Two proteins that stick out as a stalk next to the RNA exit. They may grab the RNA.' },
      p: { nl: 'Rpb4/Rpb7-subcomplex (de stengel); kan het uitgaande RNA binden.', en: 'Rpb4/Rpb7 subcomplex (the stalk); can bind the exiting RNA.' } },
    { c: '#ffc247', t: 'CTD', m: ['→ linker + CTD (niet zichtbaar)', '→ linker + CTD (not visible)'], d: { nl: 'Een slappe staart van Rpb1 die niet zichtbaar is in de structuur. Merktekens (fosfaten) erop roepen RNA-bewerkers op.', en: 'A floppy tail of Rpb1 that is not visible in the structure. Marks (phosphates) on it call in RNA-processing enzymes.' },
      p: { nl: 'C-terminaal domein van Rpb1 (heptadherhalingen YSPTSPS), flexibel; het fosforyleringspatroon rekruteert o.a. capping- en splicingfactoren.', en: 'C-terminal domain of Rpb1 (YSPTSPS heptad repeats), flexible; its phosphorylation pattern recruits capping and splicing factors, among others.' } },
  ],
  steps: [
    { dur: 8000, title: L3('Een machine van 12 eiwitten', 'A machine of 12 proteins'), focus: null, zoom: {}, tags: [TAG({ chain: ['A', 'B'] }, 'RNA-polymerase (12 eiwitten)', 'RNA polymerase (12 proteins)'), TAG({ chain: 'N' }, 'DNA', 'DNA'), TAG({ chain: 'P' }, 'nieuw RNA', 'new RNA')], spin: .012,
      text: L3('Het enzym dat RNA maakt (RNA-polymerase II) bestaat uit 12 eiwitten. In de middelste kloof zitten DNA en RNA.', 'The enzyme that makes RNA (RNA polymerase II) consists of 12 proteins. DNA and RNA sit in the central cleft.') },
    { dur: 8000, title: L3('Het grootste onderdeel: Rpb1', 'The largest part: Rpb1'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A' }, style: { cartoon: { color: COL.A } }, label: L3('Rpb1', 'Rpb1') },
      text: L3('Rpb1 is het grootste onderdeel. Het bevat de plek waar het RNA gebouwd wordt (het actieve centrum).', 'Rpb1 is the largest part. It holds the spot where the RNA is built (the active site).') },
    { dur: 8000, title: L3('Twee kaken rond het DNA', 'Two jaws around the DNA'), zoom: {}, spin: .012,
      focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: COL.A } }, label: L3('Rpb1', 'Rpb1'), labelOff: [-150, 60] }, { sel: { chain: 'B' }, style: { cartoon: { color: COL.B } }, label: L3('Rpb2', 'Rpb2'), labelOff: [-150, -60] },
        { sel: { chain: ['E', 'I'] }, style: { cartoon: { color: '#ffc247' } }, labelSel: { chain: 'E' }, label: L3('kaken (Rpb1, Rpb5, Rpb9)', 'jaws (Rpb1, Rpb5, Rpb9)'), labelColor: '#ffc247', labelOff: [150, 60] },
        { sel: { chain: 'F' }, style: { cartoon: { color: '#5fd3e6' } }, labelSel: { chain: 'A', resi: range(1, 340) }, label: L3('klem (Rpb1, Rpb2, Rpb6)', 'clamp (Rpb1, Rpb2, Rpb6)'), labelColor: '#5fd3e6', labelOff: [150, -60] }],
      text: L3('Rpb1 en Rpb2 vormen samen een diepe kloof. Kaken van Rpb1, Rpb5 en Rpb9 grijpen het DNA verderop, en een beweeglijke klem sluit zich erover.', 'Rpb1 and Rpb2 together form a deep cleft. Jaws of Rpb1, Rpb5 and Rpb9 grip the DNA further downstream, and a movable clamp closes over it.') },
    { dur: 8000, title: L3('Het DNA in de kloof', 'The DNA in the cleft'), zoom: { chain: ['T', 'N', 'P'] }, spin: .01,
      focus: [{ sel: { chain: 'T' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } }, label: L3('matrijsstreng', 'template strand'), labelColor: C.dna2, labelOff: [-90, 22] },
        { sel: { chain: 'N' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } }, label: L3('niet-matrijsstreng', 'non-template strand'), labelColor: C.dna, labelOff: [90, -22] }],
      text: L3('Het DNA komt dubbel binnen en gaat open. Alleen de afgelezen streng (de matrijs) loopt door naar binnen.', 'The DNA enters double and opens up. Only the strand being read (the template) runs on inside.') },
    { dur: 8000, title: L3('Het RNA gaat naar buiten', 'The RNA heads out'), zoom: { chain: ['T', 'P'] }, spin: .01,
      focus: [{ sel: { chain: 'P' }, style: { cartoon: { color: C.rna }, stick: { color: C.rna, radius: .25 } }, label: 'RNA' }, { sel: { chain: 'T' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } }],
      text: L3('Het nieuwe RNA blijft ~8 basen lang aan het DNA vast. Dan verlaat het het enzym via een eigen uitgang.', 'The new RNA stays attached to the DNA for ~8 bases. Then it leaves the enzyme through its own exit.') },
    { dur: 9000, title: L3('Het hart: een magnesiumion', 'The heart: a magnesium ion'), zoom: { chain: 'A', resi: range(493, 499) }, spin: .006, pad: .6,
      focus: [{ sel: { chain: 'A', resi: range(484, 506) }, style: { cartoon: { color: COL.A } } }, { sel: { chain: 'A', resi: [495, 497, 499] }, style: { stick: { color: '#e7dcff', radius: .45 } } },
        { sel: MG, style: { sphere: { color: '#7fdc6a', radius: 2.4 } }, label: L3('Mg²⁺', 'Mg²⁺'), labelColor: '#7fdc6a', labelOff: [110, 70] },
        { sel: { chain: 'P' }, style: { cartoon: { color: C.rna }, stick: { color: C.rna, radius: .3 } }, label: L3('RNA', 'RNA'), labelColor: C.rna, labelOff: [-130, 30], labelSel: { chain: 'P', resi: [18, 19, 20] } }],   // anker op het 3′-uiteinde bij Mg²⁺ (in beeld), niet het midden van de hele keten
      text: L3('Rpb1 houdt een magnesiumion (Mg²⁺) vast. Dat ion helpt elke nieuwe bouwsteen aan het RNA te koppelen.', 'Rpb1 holds a magnesium ion (Mg²⁺). This ion helps join each new building block to the RNA.') },
    { dur: 9000, title: L3('Een lusje dat dichtklapt', 'A loop that snaps shut'), zoom: { chain: 'A', resi: range(832, 869).concat(range(1099, 1129), [495]) }, pad: 1, spin: .008,
      focus: [{ sel: { chain: 'A', resi: range(832, 869), atom: 'CA' }, style: { sphere: { color: '#7fdc6a', radius: 2.2 } }, label: L3('brughelix', 'bridge helix'), labelColor: '#7fdc6a' },
        { sel: { chain: 'A', resi: range(1099, 1129), atom: 'CA' }, style: { sphere: { color: '#ffc247', radius: 2.2 } }, label: L3('triggerlus', 'trigger loop'), labelColor: '#ffc247' }, { sel: MG, style: { sphere: { color: '#ffffff', radius: 2 } } }],
      text: L3('De triggerlus (geel) klapt dicht over een passende bouwsteen. Met de groene staaf ernaast stuurt hij het koppelen.', 'The trigger loop (yellow) folds over a matching building block. With the green rod beside it, it drives the joining.') },
    { dur: 8000, title: L3('Een stengel aan de zijkant', 'A stalk on the side'), zoom: { chain: ['D', 'G'] }, pad: .75, spin: .012,
      focus: [{ sel: { chain: 'D' }, style: { cartoon: { color: COL.D } }, label: 'Rpb4', labelColor: COL.D }, { sel: { chain: 'G' }, style: { cartoon: { color: COL.G } }, label: 'Rpb7', labelColor: COL.G }],
      text: L3('Rpb4 en Rpb7 steken uit als een stengel naast de RNA-uitgang. Ze pakken mogelijk het RNA vast.', 'Rpb4 and Rpb7 stick out as a stalk next to the RNA exit. They may grab the RNA.') },
    { dur: 9000, title: L3('Een onzichtbare staart', 'An invisible tail'), zoom: {}, spin: .012,
      focus: { sel: { chain: 'A', resi: range(1455, 1487) }, style: { cartoon: { color: '#ffc247' }, stick: { color: '#ffc247', radius: .25 } }, label: L3('→ linker + CTD (niet zichtbaar)', '→ linker + CTD (not visible)'), node: 'capping' },
      text: L3('Hier stopt het zichtbare deel; dan volgt een slappe staart (CTD). Fosfaten daarop roepen RNA-bewerkers op.', 'The visible part stops here; a floppy tail (CTD) follows. Phosphates on it call in RNA-processing enzymes.') },
  ],
  hotspots: [
    { node: 'promoter', label: L3('← Promoter & PIC', '← Promoter & PIC'), color: C.prot },
    { node: 'transcriptie', label: L3('Transcriptie →', 'Transcription →'), color: C.rna },
    { node: 'capping', label: L3('CTD → 5′-capping', 'CTD → 5′ capping'), color: C.rna },
    { node: 'polymerasen', label: L3('Pol I en Pol III', 'Pol I and Pol III'), color: C.prot },
  ],
});
