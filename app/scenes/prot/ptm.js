import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, ub, phos, sugar, panel, spark, lerpPts, ATPC, PHOS } from './_b_kit.js';
import { membraanLijn, eiwitPad, vouwing, helixLint, strengPijl } from '../../bio.js';

/* Paneel A (x 0–1600): doeleiwit met activatielus (aan/uit-schakelaar)
 * Paneel B (x 1700–3300): MAP-kinasecascade  ·  Paneel C (x 3380–5000): overzicht PTM's  ·  Paneel D (x 5100–6700): collageen */
const BODY = [[600, 400], [520, 405], [455, 450], [425, 530], [440, 615], [500, 680], [600, 712], [720, 706], [820, 660], [880, 575], [880, 490], [835, 425], [760, 400], [705, 404], [672, 432], [650, 442], [628, 432]];
const LID_OFF = [[760, 400], [735, 350], [662, 326], [598, 345], [580, 392]];
const LID_ON = [[760, 400], [790, 350], [845, 345], [905, 372], [935, 425]];   // lus weggeklapt: fosfo-Ser ligt bij de twee Arg
const ARGS = [[812, 424], [852, 449]];
const SER = 2;                       // index van Ser in de lus
const KIN = [540, 180];              // kinase-positie in gebonden toestand
const LYS = [585, 708];

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* collageen: drie strengen */
const strand = (ph, x0 = 5230, x1 = 6570, y = 560, a = 38, per = 240) => { const p = []; for (let x = x0; x <= x1; x += 20) p.push([x, y + a * Math.sin((x - x0) / per * 2 * Math.PI + ph)]); return p; };

function coil(x0, y0, x1, y1, turns, amp) {
  const pts = [], n = turns * 8, dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len;
  for (let i = 0; i <= n; i++) { const u = i / n, s = Math.sin(u * turns * 2 * Math.PI) * amp; pts.push([x0 + dx * u + nx * s, y0 + dy * u + ny * s]); }
  return pts;
}

export default {
  id: 'ptm',
  title: { nl: 'Post-translationele modificaties', en: 'Post-translational modifications' },
  scale: { nl: '≈ 5–10 nm (eiwit) · 300 nm (collageen)', en: '≈ 5–10 nm (protein) · 300 nm (collagen)' },
  time: { nl: 'minuten: na de groeifactor EGF piekt actief ERK na ~5 min (gekweekte cellen)', en: 'minutes: after the growth factor EGF, active ERK peaks at ~5 min (cultured cells)' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.chain, { nl: 'doeleiwit (keten)', en: 'target protein (chain)' }], [C.prot, { nl: 'kinasen', en: 'kinases' }], [C.prot3, { nl: 'fosfatase', en: 'phosphatase' }], [PHOS, { nl: 'fosfaatgroep (2−)', en: 'phosphate group (2−)' }], [ATPC, 'ATP / ADP'], [CLASSCOL['+'], { nl: 'positief geladen residu (Arg/Lys)', en: 'positively charged residue (Arg/Lys)' }], ['#ffd166', { nl: 'ubiquitine', en: 'ubiquitin' }]],
  extra: {
    nl: '<table style="font-size:13px;color:#c9d2e4;border-collapse:collapse;line-height:1.35"><tr><td><b>Fosforylatie</b></td><td>kinase ⇄ fosfatase; + 2 negatieve ladingen</td></tr><tr><td><b>Acetylatie</b></td><td>Lys: lading +1 → 0; histonen: open chromatine</td></tr><tr><td><b>Methylatie</b></td><td>me1/me2/me3 op Lys (ook Arg: me1/me2); lading blijft; donor SAM</td></tr><tr><td><b>Ubiquitinering</b></td><td>ubiquitine = 76 aa; K48-keten → afbraak</td></tr><tr><td><b>Glycosylatie</b></td><td>in ER en Golgi; vouwing, herkenning</td></tr><tr><td><b>Lipidering</b></td><td>myristoyl, palmitoyl, prenyl: anker aan een membraan</td></tr><tr><td><b>Disulfidebrug</b></td><td>gevormd in het ER (PDI); stabiliseert de vouwing</td></tr><tr><td><b>Hydroxylering</b></td><td>collageen; Pro + O₂ + 2-oxoglutaraat → 4-Hyp + succinaat + CO₂; cofactoren Fe²⁺ en vitamine C (houdt het ijzer gereduceerd)</td></tr></table>',
    en: '<table style="font-size:13px;color:#c9d2e4;border-collapse:collapse;line-height:1.35"><tr><td><b>Phosphorylation</b></td><td>kinase ⇄ phosphatase; + 2 negative charges</td></tr><tr><td><b>Acetylation</b></td><td>Lys: charge +1 → 0; histones: open chromatin</td></tr><tr><td><b>Methylation</b></td><td>me1/me2/me3 on Lys (also Arg: me1/me2); charge kept; donor SAM</td></tr><tr><td><b>Ubiquitination</b></td><td>ubiquitin = 76 aa; K48 chain → degradation</td></tr><tr><td><b>Glycosylation</b></td><td>in ER and Golgi; folding, recognition</td></tr><tr><td><b>Lipidation</b></td><td>myristoyl, palmitoyl, prenyl: anchor to a membrane</td></tr><tr><td><b>Disulfide bond</b></td><td>formed in the ER (PDI); stabilises the fold</td></tr><tr><td><b>Hydroxylation</b></td><td>collagen; Pro + O₂ + 2-oxoglutarate → 4-Hyp + succinate + CO₂; cofactors Fe²⁺ and vitamin C (keeps the iron reduced)</td></tr></table>' },
  simplified: {
    nl: 'Het doeleiwit is een schets: een "lus die de actieve plaats afdekt" is één van de manieren waarop fosforylatie een eiwit aan- of uitzet (bv. de activatielus van veel kinasen); bij andere eiwitten zet fosforylatie juist uit of creëert ze een bindingsplaats. De versterkingsfactoren in de cascade (1 → 3 → 6) zijn illustratief. Echte kinasen zijn veel groter dan hier getekend; de collageen-triple helix is ~300 nm lang en hier sterk ingekort.',
    en: 'The target protein is a sketch: a "loop covering the active site" is one of the ways phosphorylation switches a protein on or off (e.g. the activation loop of many kinases); in other proteins phosphorylation switches off or creates a binding site. The amplification factors in the cascade (1 → 3 → 6) are illustrative. Real kinases are much larger than drawn; the collagen triple helix is ~300 nm long and strongly shortened here.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.chain, t: { nl: 'doeleiwit', en: 'target protein' }, d: { nl: 'Het groene, opgevouwen eiwit dat een extraatje krijgt.', en: 'The green, folded protein that gets an extra.' },
      p: { nl: 'Gevouwen substraateiwit (schets) dat post-translationeel gemodificeerd wordt.', en: 'Folded substrate protein (sketch) that is modified post-translationally.' } },
    { c: CLASSCOL.p, t: 'Ser', m: ['Ser in een lus die de actieve plaats afdekt', 'Ser in a loop covering the active site'], d: { nl: 'Een serine (bouwsteen met een OH-groep) in een lusje dat de werkplek van het eiwit afdekt.', en: 'A serine (building block with an OH group) in a small loop that covers the working spot of the protein.' },
      p: { nl: 'Fosfoacceptor-Ser in een regulatorische lus die de actieve plaats afschermt (zoals een activatielus).', en: 'Phospho-acceptor Ser in a regulatory loop shielding the active site (like an activation loop).' } },
    { c: CLASSCOL['+'], t: 'Arg', m: ['P (2−) ↔ Arg (+)'], d: { nl: 'Twee bouwstenen met een pluslading. Ze trekken het negatieve fosfaat aan, waardoor de lus wegklapt.', en: 'Two building blocks with a plus charge. They attract the negative phosphate, so the loop flips away.' },
      p: { nl: 'Basische Arg-residuen die het dianionische fosfaat elektrostatisch binden en zo de conformatieverandering stabiliseren.', en: 'Basic Arg residues that bind the dianionic phosphate electrostatically, stabilising the conformational change.' } },
    { c: CLASSCOL['+'], t: 'Lys', m: ['Lys (aan het oppervlak)'], d: { nl: 'Een lysine aan de buitenkant van het eiwit. Daar kan het afbraaklabel aan vastgemaakt worden.', en: 'A lysine on the outside of the protein. The breakdown tag can be attached to it.' },
      p: { nl: 'Oppervlakte-Lys; de ε-aminogroep is de acceptor voor ubiquitine (isopeptidebinding).', en: 'Surface Lys; its ε-amino group is the acceptor for ubiquitin (isopeptide bond).' } },
    { c: C.prot, t: { nl: 'eiwitkinase', en: 'protein kinase' }, m: ['mens: ~500 eiwitkinasen', 'human: ~500 protein kinases'], d: { nl: 'Een enzym dat een fosfaatgroep op een eiwit zet. De mens heeft er ongeveer 500 soorten van.', en: 'An enzyme that puts a phosphate group onto a protein. Humans have about 500 kinds of them.' },
      p: { nl: 'Eiwitkinase: draagt het γ-fosfaat van ATP over op Ser, Thr of Tyr; het menselijke kinoom telt ~500 kinasen.', en: 'Protein kinase: transfers the γ-phosphate of ATP to Ser, Thr or Tyr; the human kinome has ~500 kinases.' } },
    { c: ATPC, t: 'ATP', m: ['ADP'], d: { nl: 'De brandstof die het fosfaat levert. Na het afgeven blijft ADP over.', en: 'The fuel that supplies the phosphate. After giving it up, ADP remains.' },
      p: { nl: 'ATP als fosfaatdonor; ADP is het nevenproduct.', en: 'ATP as phosphate donor; ADP is the by-product.' } },
    { c: PHOS, t: 'P', m: ['De reactie', 'The reaction', 'Ser–CH₂–OH', '+ ATP', '↓ kinase', 'Ser–CH₂–O–PO₃²⁻', '+ ADP', 'ook op Thr (OH) en Tyr (fenol-OH)', 'also on Thr (OH) and Tyr (phenol OH)'], d: { nl: 'De oranje fosfaatgroep. Ze komt op de OH-groep van de serine en maakt die plek negatief geladen.', en: 'The orange phosphate group. It goes onto the OH group of the serine and makes that spot negatively charged.' },
      p: { nl: 'Fosfoesterbinding op de hydroxylgroep (Ser, Thr, Tyr); voegt twee negatieve ladingen toe.', en: 'Phosphoester bond on the hydroxyl group (Ser, Thr, Tyr); adds two negative charges.' } },
    { c: C.ok, t: 'AAN', m: ['ON', 'UIT', 'OFF', 'actieve plaats vrij', 'active site exposed'], d: { nl: 'De schakelaar: met fosfaat klapt de lus weg en staat het eiwit aan; zonder fosfaat sluit de lus en staat het uit.', en: 'The switch: with phosphate the loop flips away and the protein is on; without phosphate the loop closes and it is off.' },
      p: { nl: 'Fosforylatie als reversibele conformationele schakelaar die de actieve plaats vrijmaakt of afsluit.', en: 'Phosphorylation as a reversible conformational switch that exposes or occludes the active site.' } },
    { c: C.prot3, t: { nl: 'eiwitfosfatase', en: 'protein phosphatase' }, m: ['H₂O', 'Pᵢ'], d: { nl: 'Een enzym dat het fosfaat er met water weer afknipt. Het fosfaat komt los vrij.', en: 'An enzyme that cuts the phosphate off again using water. The phosphate is released loose.' },
      p: { nl: 'Eiwitfosfatase: hydrolyseert de fosfoesterbinding en geeft anorganisch fosfaat (Pᵢ) vrij.', en: 'Protein phosphatase: hydrolyses the phosphoester bond and releases inorganic phosphate (Pᵢ).' } },
    { c: C.prot, t: 'MAPKKK', m: ['Raf', 'MAPKK', 'MEK', 'MAPK', 'ERK', 'doelen', 'targets', 'groeifactorsignaal (via Ras)', 'growth-factor signal (via Ras)', 'MEK fosforyleert ERK op Thr én Tyr: 1 Raf → vele ERK → nog meer doelen', 'MEK phosphorylates ERK on Thr and Tyr: 1 Raf → many ERK → even more targets'],
      d: { nl: 'Een rij kinasen die elkaar aanzetten (Raf → MEK → ERK). Elk actief enzym zet er vele aan, zo wordt het signaal sterker.', en: 'A row of kinases that switch each other on (Raf → MEK → ERK). Each active enzyme switches on many, so the signal grows stronger.' },
      p: { nl: 'MAP-kinasecascade: Raf (MAPKKK) fosforyleert MEK (MAPKK), dat ERK (MAPK) dubbel fosforyleert op Thr en Tyr; elke trap versterkt het signaal.', en: 'MAP kinase cascade: Raf (MAPKKK) phosphorylates MEK (MAPKK), which dually phosphorylates ERK (MAPK) on Thr and Tyr; each tier amplifies the signal.' } },
    { c: C.prot, t: { nl: 'Fosforylatie', en: 'Phosphorylation' }, m: ['Ser · Thr · Tyr'], d: { nl: 'Een fosfaatgroep op serine, threonine of tyrosine: de meest gebruikte aan/uit-schakelaar.', en: 'A phosphate group on serine, threonine or tyrosine: the most widely used on/off switch.' },
      p: { nl: 'Reversibele fosforylering door kinasen en fosfatasen; voegt 2 negatieve ladingen toe.', en: 'Reversible phosphorylation by kinases and phosphatases; adds 2 negative charges.' } },
    { c: C.acetyl, t: { nl: 'Acetylatie', en: 'Acetylation' }, m: ['Lys (–NH₃⁺)', 'Ac'], d: { nl: 'Een acetylgroepje (Ac) op lysine. Daardoor verdwijnt de pluslading; bij histonen gaat het DNA wat meer open.', en: 'An acetyl group (Ac) on lysine. This removes the plus charge; in histones the DNA opens up a bit more.' },
      p: { nl: 'Nε-acetylering van Lys neutraliseert de positieve lading; op histonen geassocieerd met open chromatine.', en: 'Nε-acetylation of Lys neutralises the positive charge; on histones associated with open chromatin.' } },
    { c: C.methyl, t: { nl: 'Methylatie', en: 'Methylation' }, m: ['Lys · Arg', 'CH₃'], d: { nl: 'Eén tot drie methylgroepjes (CH₃) op lysine of arginine. De lading blijft.', en: 'One to three methyl groups (CH₃) on lysine or arginine. The charge stays.' },
      p: { nl: 'Mono-, di- of trimethylering van Lys (Arg: mono/di) met SAM als donor; behoudt de lading.', en: 'Mono-, di- or trimethylation of Lys (Arg: mono/di) with SAM as donor; keeps the charge.' } },
    { c: '#ffd166', t: { nl: 'Ubiquitinering', en: 'Ubiquitination' }, m: ['Ub', 'E3-ligase', 'E3 ligase', 'K48-polyubiquitine', 'K48 polyubiquitin', '= “breek mij af”', '= “degrade me”'], d: { nl: 'Een ketting van kleine eiwitjes (ubiquitine) op een lysine. Een bepaald soort ketting betekent: breek mij af.', en: 'A chain of small proteins (ubiquitin) on a lysine. A certain kind of chain means: break me down.' },
      p: { nl: 'Een E3-ligase koppelt ubiquitine (76 aa) aan Lys; een K48-gekoppelde polyubiquitineketen richt het eiwit naar het proteasoom.', en: 'An E3 ligase attaches ubiquitin (76 aa) to Lys; a K48-linked polyubiquitin chain targets the protein to the proteasome.' } },
    { c: '#00A651', t: { nl: 'Glycosylatie', en: 'Glycosylation' }, m: ['Asn (N-) · Ser/Thr (O-)', 'Asn'], d: { nl: 'Suikerketens op asparagine of op serine/threonine, aangebracht in het ER en het Golgi.', en: 'Sugar chains on asparagine or on serine/threonine, added in the ER and the Golgi.' },
      p: { nl: 'N-glycosylering op Asn en O-glycosylering op Ser/Thr in ER en Golgi; belangrijk voor vouwing en herkenning.', en: 'N-glycosylation on Asn and O-glycosylation on Ser/Thr in the ER and Golgi; important for folding and recognition.' } },
    { c: C.mem, t: { nl: 'Lipidering', en: 'Lipidation' }, m: ['Gly (N-term) · Cys'], d: { nl: 'Een vetstaartje op het eiwit, dat het als een anker aan een membraan vastzet.', en: 'A fatty tail on the protein that fixes it to a membrane like an anchor.' },
      p: { nl: 'Myristoylering (N-terminale Gly), palmitoylering en prenylering (Cys) verankeren eiwitten aan membranen.', en: 'Myristoylation (N-terminal Gly), palmitoylation and prenylation (Cys) anchor proteins to membranes.' } },
    { c: '#ffc247', t: { nl: 'Disulfidebrug', en: 'Disulfide bond' }, m: ['Cys', 'S–S'], d: { nl: 'Een zwavelbrug tussen twee cysteïnes. Ze verstevigt het gevouwen eiwit.', en: 'A sulfur bridge between two cysteines. It strengthens the folded protein.' },
      p: { nl: 'Covalente Cys–Cys-binding, gevormd in het ER (PDI); stabiliseert de tertiaire structuur.', en: 'Covalent Cys–Cys bond, formed in the ER (PDI); stabilises the tertiary structure.' } },
    { c: '#b7f0a8', t: { nl: 'Hydroxylering', en: 'Hydroxylation' }, m: ['Pro → Hyp · Lys → Hyl', 'Pro', 'Hyp', 'OH'], d: { nl: 'Een OH-groepje op proline (wordt Hyp) of lysine. Dat gebeurt vooral in collageen.', en: 'An OH group on proline (becomes Hyp) or lysine. This happens mainly in collagen.' },
      p: { nl: 'Hydroxylering van Pro tot 4-hydroxyproline en van Lys tot hydroxylysine, vooral in collageen.', en: 'Hydroxylation of Pro to 4-hydroxyproline and of Lys to hydroxylysine, mainly in collagen.' } },
    { c: '#b7f0a8', t: 'P4H', m: ['Prolyl-4-hydroxylase (ER-lumen)', 'Prolyl 4-hydroxylase (ER lumen)', 'cofactoren: Fe²⁺ en vitamine C', 'cofactors: Fe²⁺ and vitamin C', 'tekort aan vitamine C → scheurbuik', 'vitamin C deficiency → scurvy'], d: { nl: 'Het enzym dat proline in collageen aanpast. Het heeft ijzer en vitamine C nodig; zonder vitamine C krijg je scheurbuik.', en: 'The enzyme that modifies proline in collagen. It needs iron and vitamin C; without vitamin C you get scurvy.' },
      p: { nl: 'Prolyl-4-hydroxylase in het ER-lumen; Fe²⁺-afhankelijke dioxygenase, ascorbaat houdt het ijzer gereduceerd. Tekort geeft instabiel collageen (scorbuut).', en: 'Prolyl 4-hydroxylase in the ER lumen; Fe²⁺-dependent dioxygenase, ascorbate keeps the iron reduced. Deficiency gives unstable collagen (scurvy).' } },
    { c: C.chain, t: { nl: 'collageen-triple helix', en: 'collagen triple helix' }, m: ['3 ketens: collageen-triple helix', '3 chains: collagen triple helix', 'Gly', 'Gly – X – Y', 'elke 3e positie Gly: past als enige in het midden', 'every 3rd position Gly: the only one that fits in the centre', 'N', 'C'],
      d: { nl: 'Drie ketens die om elkaar heen gedraaid zijn. Elke derde bouwsteen is glycine, de enige die klein genoeg is voor het midden.', en: 'Three chains twisted around each other. Every third building block is glycine, the only one small enough for the centre.' },
      p: { nl: 'Collageen: drie linksdraaiende polyproline II-achtige ketens in een rechtsdraaiende superhelix met herhaling Gly-X-Y (X, Y vaak Pro/Hyp).', en: 'Collagen: three left-handed polyproline II-like chains in a right-handed superhelix with the repeat Gly-X-Y (X, Y often Pro/Hyp).' } },
  ],
  steps: [
    ST(7000, cam(680, 470, 1250), 'Na de vouwing: extra’s', 'After folding: extras',
      'Enzymen hangen nog chemische groepjes aan het eiwit of knippen de keten. Zo krijgt het nieuwe eigenschappen.',
      'Enzymes attach small chemical groups to the protein or cut the chain. This gives it new properties.'),
    ST(6500, cam(700, 410, 1150), 'Een kinase komt binden', 'A kinase binds',
      'Een kinase is een enzym dat fosfaat aanhangt. Het herkent een serine en heeft ATP bij zich.',
      'A kinase is an enzyme that attaches phosphate. It recognises a serine and brings ATP along.'),
    ST(8000, cam(930, 390, 1400), 'Fosfaat op serine', 'Phosphate onto serine',
      'Het kinase zet een fosfaatgroep van ATP op de serine; ATP wordt ADP. Die plek is nu negatief geladen.',
      'The kinase moves a phosphate group from ATP onto the serine; ATP becomes ADP. That spot is now negatively charged.'),
    ST(7500, cam(720, 440, 1150), 'Schakelaar AAN', 'Switch ON',
      'Positieve zijketens trekken het negatieve fosfaat aan. Een lus klapt weg en het eiwit staat aan.',
      'Positive side chains pull on the negative phosphate. A loop flips away and the protein is switched on.'),
    ST(7500, cam(800, 420, 1250), 'Schakelaar UIT', 'Switch OFF',
      'Een ander enzym (fosfatase) knipt het fosfaat er weer af. De lus sluit: de schakelaar kan terug.',
      'Another enzyme (a phosphatase) cuts the phosphate off again. The loop closes: the switch can flip back.'),
    ST(9000, cam(2470, 470, 1500), 'Een kettingreactie', 'A chain reaction',
      'Kinasen zetten andere kinasen aan, in een rij. Elk actief enzym zet er vele aan: zo wordt het signaal sterker.',
      'Kinases switch on other kinases, one after another. Each active enzyme switches on many: the signal grows stronger.'),
    ST(9000, cam(4190, 490, 1650), 'Veel soorten aanpassingen', 'Many kinds of changes',
      'Elke aanpassing heeft eigen enzymen en plekken. Klik op een kaart om verder te gaan.',
      'Each change has its own enzymes and sites. Click a card to explore further.'),
    ST(8500, cam(5900, 480, 1500), 'Vitamine C en collageen', 'Vitamin C and collagen',
      'Een enzym past proline aan in collageen en heeft daarvoor vitamine C nodig. Zo blijft collageen stevig.',
      'An enzyme modifies proline in collagen and needs vitamin C to do so. This keeps collagen strong.'),
    ST(8000, cam(690, 560, 1300), 'Het laatste label: ubiquitine', 'The last label: ubiquitin',
      'Ook het kleine eiwit ubiquitine kan aan een eiwit hangen. Een bepaald soort ketting ervan betekent: afbreken.',
      'The small protein ubiquitin can also be attached. A certain kind of chain of them means: break it down.'),
  ],
  svg() {
    const cards = [
      ['ph', 'ptm', C.prot, T2('Fosforylatie', 'Phosphorylation'), 'Ser · Thr · Tyr'],
      ['ac', 'histonmod', C.acetyl, T2('Acetylatie', 'Acetylation'), 'Lys (–NH₃⁺)'],
      ['me', 'histonmod', C.methyl, T2('Methylatie', 'Methylation'), 'Lys · Arg'],
      ['ub', 'ubiquitine', '#ffd166', T2('Ubiquitinering', 'Ubiquitination'), ''],
      ['gl', 'glyco', '#00A651', T2('Glycosylatie', 'Glycosylation'), 'Asn (N-) · Ser/Thr (O-)'],
      ['li', null, C.mem, T2('Lipidering', 'Lipidation'), T2('Gly (N-term) · Cys', 'Gly (N-term) · Cys')],
      ['ss', 'disulfide', '#ffc247', T2('Disulfidebrug', 'Disulfide bond'), ''],
      ['hy', null, '#b7f0a8', T2('Hydroxylering', 'Hydroxylation'), 'Pro → Hyp · Lys → Hyl'],
    ];
    const cardSVG = cards.map(([k, node, col, title, res], i) => {
      const x0 = 3400 + (i % 4) * 400, y0 = 170 + Math.floor(i / 4) * 350, cx = x0 + 185;
      let ill = '';
      const iy = y0 + 215;
      if (k === 'ph') ill = `<circle cx="${cx - 30}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 30, iy + 7, 'Ser', { size: 17, col: '#0a1224', halo: false }) + `<line x1="${cx - 6}" y1="${iy}" x2="${cx + 22}" y2="${iy}" stroke="#fff" stroke-width="3"/>` + phos(cx + 44, iy, 22);
      if (k === 'ac') ill = `<circle cx="${cx - 30}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 30, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + tag(cx + 48, iy, 'Ac', C.acetyl, { fs: 20 });
      if (k === 'me') ill = `<circle cx="${cx - 58}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 58, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + [0, 1, 2].map(j => tag(cx + 14 + j * 56, iy, 'CH₃', C.methyl, { fs: 18, w: 54 })).join('');
      if (k === 'ub') ill = `<circle cx="${cx - 60}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 60, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + [0, 1, 2, 3].map(j => ub(cx - 12 + j * 40, iy - j * 6, 19)).join('');
      if (k === 'gl') ill = `<circle cx="${cx - 70}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 70, iy + 7, 'Asn', { size: 17, col: '#0a1224', halo: false }) +
        `<path d="M${cx - 46},${iy} H${cx + 50} M${cx + 12},${iy} L${cx + 50},${iy - 30} M${cx + 12},${iy} L${cx + 50},${iy + 30}" stroke="#ccd" stroke-width="2"/>` + sugar('GlcNAc', cx - 26, iy, 11) + sugar('GlcNAc', cx - 2, iy, 11) + sugar('Man', cx + 22, iy, 11) + sugar('Man', cx + 50, iy - 30, 11) + sugar('Man', cx + 50, iy + 30, 11);
      if (k === 'li') ill = membraanLijn(cx - 150, cx + 150, iy + 6, { w: 44 }) + `<path d="M${cx - 10},${iy - 30} q7,5 0,10 q-7,5 0,10 q7,5 0,10" stroke="#ffe08a" stroke-width="4" fill="none"/>` + `<path d="${eiwitPad(cx - 10, iy - 50, 24, 19, 31, .1)}" fill="${C.chain}" stroke="#0a1224" stroke-width="2"/>`;   // vetanker in de buitenste laag van de dubbellaag
      if (k === 'ss') ill = `<circle cx="${cx - 60}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 60, iy + 7, 'Cys', { size: 17, col: '#0a1224', halo: false }) + `<circle cx="${cx + 60}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx + 60, iy + 7, 'Cys', { size: 17, col: '#0a1224', halo: false }) + `<line x1="${cx - 34}" y1="${iy}" x2="${cx + 34}" y2="${iy}" stroke="#ffc247" stroke-width="6"/>` + T(cx, iy - 12, 'S–S', { size: 18, col: '#ffc247' });
      if (k === 'hy') ill = `<circle cx="${cx - 40}" cy="${iy}" r="24" fill="${CLASSCOL.s}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 40, iy + 7, 'Pro', { size: 17, col: '#0a1224', halo: false }) + T(cx + 4, iy + 8, '→', { size: 26 }) + `<circle cx="${cx + 50}" cy="${iy}" r="24" fill="${CLASSCOL.s}" stroke="#0a1224" stroke-width="2"/>` + T(cx + 50, iy + 7, 'Hyp', { size: 17, col: '#0a1224', halo: false }) + tag(cx + 84, iy - 30, 'OH', '#ff8a3d', { fs: 17, w: 44 });
      const body = panel(x0, y0, 370, 320, { col }) + T(cx, y0 + 60, title, { size: 30, col, w: 700 }) + (res ? T(cx, y0 + 112, res, { size: 23, font: 'JetBrains Mono', w: 700 }) : '') + ill;
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${node === 'ptm' ? T2('(dit hoofdstuk)', '(this chapter)') : L({ nl: '→ ' + { histonmod: 'Histonmodificaties', ubiquitine: 'Ubiquitine–proteasoom', glyco: 'N-glycosylatie', disulfide: 'Disulfidebruggen' }[node], en: '→ ' + { histonmod: 'Histone modifications', ubiquitine: 'Ubiquitin–proteasome', glyco: 'N-glycosylation', disulfide: 'Disulfide bonds' }[node] })}"${node === 'ptm' || (k === 'me') ? ' data-nolabel' : ''}>${body}<circle data-anchor="${node}" cx="${cx}" cy="${y0 + 306}" r="1" fill="none"/></g>` : body;
    }).join('');

    const helices = vouwing(655, 565, 228, 150, { col: C.chain, op: .85 });   // gevouwen binnenkant: helices, β-blad, lussen, kern (bio.js)
    return svgOpen(arrowDefs('pt', { m: C.muted, g: C.chain, p: C.prot, w: '#fff' })) + `
    <!-- paneel A -->
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('gevouwen doeleiwit', 'folded target protein')}">
      <path d="${smooth([...BODY, BODY[0], BODY[1]])}" fill="rgba(127,220,106,.14)" stroke="${C.chain}" stroke-width="4"/>
      ${helices}
      <circle data-anchor="vouwing" cx="420" cy="700" r="1" fill="none" data-pos="below"/>
    </g>
    <g id="pt-glow"></g>
    ${ARGS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(x, y + 6, 'Arg', { size: 16, col: '#0a1224', halo: false, w: 700 })).join('')}
    <g id="pt-argl"></g>
    <circle cx="${LYS[0]}" cy="${LYS[1]}" r="19" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>${T(LYS[0], LYS[1] + 6, 'Lys', { size: 14, col: '#0a1224', halo: false, w: 700 })}
    <g id="pt-lid"></g>
    <g id="pt-kin"></g>
    <g id="pt-pp"></g>
    <g id="pt-chem"></g>
    <g data-node="ubiquitine" data-color="#ffd166" data-label="${T2('Ubiquitine → afbraak', 'Ubiquitin → degradation')}"><g id="pt-ub"></g><circle id="pt-ubA" data-anchor="ubiquitine" cx="0" cy="0" r="1" fill="none"/></g>
    <g id="pt-a-lbl"></g>
    <!-- paneel B: cascade -->
    <g data-node="mapk" data-color="${C.prot}" data-nolabel><g id="pt-casc"></g></g>
    ${T(1790, 208, 'MAPKKK', { size: 20, col: C.muted, anchor: 'start', font: 'JetBrains Mono' })}${T(1790, 388, 'MAPKK', { size: 20, col: C.muted, anchor: 'start', font: 'JetBrains Mono' })}${T(1790, 568, 'MAPK', { size: 20, col: C.muted, anchor: 'start', font: 'JetBrains Mono' })}
    ${T(1790, 728, T2('doelen', 'targets'), { size: 20, col: C.muted, anchor: 'start' })}
    <!-- paneel C: overzicht -->
    ${cardSVG}
    <!-- paneel D: collageen -->
    <g id="pt-coll"></g>
    ${panel(5340, 170, 1120, 150, { col: '#b7f0a8' })}
    ${T(5900, 232, T2('Prolyl-4-hydroxylase (ER-lumen)', 'Prolyl 4-hydroxylase (ER lumen)'), { size: 30, col: C.prot, w: 700 })}
    ${T(5900, 288, T2('cofactoren: Fe²⁺ en vitamine C', 'cofactors: Fe²⁺ and vitamin C'), { size: 26, col: '#ffc247' })}
    ${T(5900, 690, T2('elke 3e positie Gly: past als enige in het midden', 'every 3rd position Gly: the only one that fits in the centre'), { size: 25, col: '#c9d2e4', w: 500 })}
    ${T(5900, 734, T2('tekort aan vitamine C → scheurbuik', 'vitamin C deficiency → scurvy'), { size: 25, col: C.danger, w: 600 })}
    </svg>`;
  },
  init(svg, api) {
    const hob = api?.level === 'hobby';   // hobbyist: de reactie in woorden, zonder formules (kort kader)
    const $ = id => svg.getElementById(id);
    const kinPos = k => [lerp(KIN[0] - 380, KIN[0], k), lerp(KIN[1] - 180, KIN[1], k)];
    const atpAt = ([x, y]) => [x + 150, y + 62];
    /* eiwitkinase als twee lobben (detailronde 28-11-2026): N-lob met een β-blad en de αC-helix, C-lob vooral helices;
       ATP bindt in de kloof ertussen, die naar het substraat open ligt (Taylor & Kornev 2011) */
    const kinase = (x, y, op) => op <= .01 ? '' : `<g opacity="${f1(op)}">` +
      `<path d="${eiwitPad(x - 15, y - 34, 132, 52, 41, .07)}" fill="#0b1224"/><path d="${eiwitPad(x - 15, y - 34, 132, 52, 41, .07)}" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3"/>` +
      `<path d="${eiwitPad(x + 5, y + 46, 150, 54, 42, .07)}" fill="#0b1224"/><path d="${eiwitPad(x + 5, y + 46, 150, 54, 42, .07)}" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3"/>` +
      `<path d="M${x - 125},${y + 6} Q${x + 60},${y + 4} ${x + 150},${y + 60}" stroke="#0b1224" stroke-width="9" fill="none" stroke-linecap="round" opacity=".8"/>` +
      strengPijl(x - 20, y - 62, x - 115, y - 62, { h: 9 }) + strengPijl(x - 115, y - 40, x - 20, y - 40, { h: 9 }) + strengPijl(x - 20, y - 18, x - 115, y - 18, { h: 9 }) +
      helixLint(x + 10, y - 50, x + 95, y - 26, { turns: 2.5, amp: 11, w: 10, col: '#ff9ec3' }) + T(x + 112, y - 18, 'αC', { size: 18, col: '#ff9ec3', w: 800, anchor: 'start' }) +
      helixLint(x - 125, y + 40, x - 35, y + 34, { turns: 2.5, amp: 11, w: 10 }) + helixLint(x - 15, y + 52, x + 95, y + 58, { turns: 3, amp: 11, w: 10 }) + helixLint(x - 100, y + 74, x - 20, y + 82, { turns: 2.2, amp: 10, w: 9 }) +
      T(x - 15, y - 100, T2('eiwitkinase', 'protein kinase'), { size: 24, w: 700, col: '#d6ccff' }) + '</g>';

    /* collageen (statisch deel eenmaal tekenen) */
    const sc = [C.chain, '#b7f0a8', '#4fae3f'];
    let coll = [0, 2.1, 4.2].map((ph, i) => chain(strand(ph), { col: sc[i], w: 12 })).join('');
    coll += T(5230, 480, 'N', { size: 22, col: C.muted }) + T(6570, 480, 'C', { size: 22, col: C.muted });
    $('pt-coll').innerHTML = coll + '<g id="pt-trip"></g>';

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A ---------- */
        let lidK = 0, pOn = 0, pPos = null, kinK = 0, atpLbl = 'ATP', ppK = 0, piK = 0, chemK = 0, glow = 0;
        if (step === 1) kinK = ease(sub(p, 0, .6));
        if (step === 2) { kinK = 1; const m = ease(sub(p, .15, .55)); const a = atpAt(kinPos(1)); const sr = LID_OFF[SER]; pPos = [lerp(a[0] + 30, sr[0], m), lerp(a[1], sr[1] - 34, m)]; if (p > .55) atpLbl = 'ADP'; chemK = sub(p, .05, .3); }
        if (step === 3) { kinK = 1 - ease(sub(p, 0, .35)); atpLbl = 'ADP'; lidK = ease(sub(p, .25, .7)); glow = sub(p, .6, .85); chemK = 1 - sub(p, 0, .06); }
        if (step === 4) { ppK = ease(sub(p, 0, .3)) * (1 - ease(sub(p, .85, 1))); piK = sub(p, .35, .65); lidK = 1 - ease(sub(p, .55, .9)); glow = 1 - sub(p, .5, .7); }
        const lid = lerpPts(LID_OFF, LID_ON, lidK);
        const ser = lid[SER];
        // het fosfaat wijst eerst omhoog; als de lus wegklapt, draait het naar de twee positieve Arg (zoutbrug)
        if (step === 3 || (step === 4 && piK === 0)) pPos = [ser[0] + 10 * lidK, ser[1] + lerp(-34, 44, lidK)];
        let lidS = chain(lid, { w: 11 }) + `<circle cx="${f1(ser[0])}" cy="${f1(ser[1])}" r="20" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(ser[0], ser[1] + 6, 'Ser', { size: 16, col: '#0a1224', halo: false, w: 700 });
        if (step === 4 && piK > 0) { const k = ease(piK); const px = ser[0] + lerp(10, 280, k), py = ser[1] + lerp(44, -180, k); lidS += phos(px, py, 18, 1 - sub(p, .8, 1)) + T(px, py - 30, 'Pᵢ', { size: 22, op: 1 - sub(p, .8, 1) }); }
        if (pPos) {
          const dx = pPos[0] - ser[0], dy = pPos[1] - ser[1], d = Math.hypot(dx, dy) || 1;
          if (lidK > .5) lidS += ARGS.map(([x, y]) => `<line x1="${f1(pPos[0])}" y1="${f1(pPos[1])}" x2="${x}" y2="${y}" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 5" opacity="${f1((lidK - .5) * 2)}"/>`).join('');
          lidS += `<line x1="${f1(ser[0] + dx / d * 18)}" y1="${f1(ser[1] + dy / d * 18)}" x2="${f1(pPos[0] - dx / d * 14)}" y2="${f1(pPos[1] - dy / d * 14)}" stroke="#fff" stroke-width="3" opacity="${step === 2 ? f1(sub(p, .5, .55)) : 1}"/>` + phos(pPos[0], pPos[1], 18) +
            T(pPos[0] + 36, pPos[1] - 10, '2−', { size: 20, col: PHOS, w: 800, op: step >= 3 || p > .55 ? 1 : 0 });
        }
        $('pt-lid').innerHTML = lidS;
        $('pt-glow').innerHTML = glow > .01 ? `<circle cx="650" cy="408" r="30" fill="rgba(255,194,71,.12)" stroke="#ffd36b" stroke-width="4" stroke-dasharray="8 5" opacity="${f1(glow)}"/>` + T(560, 330, T2('actieve plaats vrij', 'active site exposed'), { size: 22, col: '#ffd36b', w: 800, op: Math.min(1, glow * 1.6) }) : '';
        // uitleg-labels bij paneel A
        let al = '';
        if (step === 0) al += T(650, 280, T2('Ser in een lus die de actieve plaats afdekt', 'Ser in a loop covering the active site'), { size: 22, col: CLASSCOL.p }) + T(LYS[0] - 40, LYS[1] + 56, T2('Lys (aan het oppervlak)', 'Lys (on the surface)'), { size: 20, col: CLASSCOL['+'] });
        if (step === 3) al += T(1010, 520, T2('P (2−) ↔ Arg (+)', 'P (2−) ↔ Arg (+)'), { size: 22, col: '#fff', op: sub(p, .5, .75) }) + tag(1010, 580, T2('AAN', 'ON'), C.ok, { fs: 22, op: sub(p, .65, .8) });
        if (step === 4) al += tag(1030, 580, T2('UIT', 'OFF'), C.muted, { fs: 22, op: sub(p, .8, .95) });
        if (step === 0 || step === 1) al += tag(1000, 580, T2('UIT', 'OFF'), C.muted, { fs: 22, op: step === 0 ? sub(p, .4, .6) : 1 - sub(p, 0, .2) });
        $('pt-a-lbl').innerHTML = al;
        // kinase
        let ks = '';
        if (kinK > .01) {
          const kp = step === 3 ? [lerp(KIN[0], KIN[0] - 380, 1 - kinK), lerp(KIN[1], KIN[1] - 160, 1 - kinK)] : kinPos(kinK);
          const op = step === 3 ? kinK : 1;
          ks += kinase(kp[0], kp[1], op);
          const a = atpAt(kp);
          ks += tag(a[0], a[1] - 14, atpLbl, ATPC, { fs: 20, op });
          if (step === 2) ks += spark(a[0], a[1], sub(p, .15, .5));
        }
        $('pt-kin').innerHTML = ks;
        $('pt-pp').innerHTML = ppK > .01 ? (enz(lerp(1300, 1030, ppK), lerp(120, 240, ppK), 160, 72, '', { col: C.prot3, op: ppK, fillOp: .4 }) + vouwing(lerp(1300, 1030, ppK), lerp(120, 240, ppK), 150, 66, { col: '#c9b8ff', op: ppK, kern: false }) +
          T(lerp(1300, 1030, ppK) - 172, lerp(120, 240, ppK) + 8, T2('eiwitfosfatase', 'protein phosphatase'), { size: 24, w: 700, col: '#d6ccff', op: ppK, anchor: 'end' })) +
          (step === 4 ? tag(lerp(1300, 1030, ppK), lerp(120, 240, ppK) + 90, 'H₂O', '#9cc0ff', { fs: 18, op: ppK * (1 - sub(p, .4, .6)) }) : '') : '';
        // chemie-paneel
        let ch = '';
        if (chemK > .01) {
          const x = 1300;
          if (hob) {
            ch += panel(1060, 150, 480, 270, { op: chemK, col: C.prot });
            ch += T(x, 200, T2('Wat er gebeurt', 'What happens'), { size: 24, col: C.prot, w: 700, op: chemK });
            ch += T(x, 256, T2('bouwsteen + energie', 'building block + energy'), { size: 24, w: 700, col: CLASSCOL.p, op: chemK });
            ch += T(x, 306, '↓  ' + T2('een helper-eiwit', 'a helper protein'), { size: 22, col: C.prot, op: chemK });
            ch += T(x, 360, T2('bouwsteen met een labeltje', 'building block with a tag'), { size: 24, w: 700, col: PHOS, op: chemK });
          } else {
          ch += panel(1060, 150, 480, 470, { op: chemK, col: C.prot });
          ch += T(x, 200, T2('De reactie', 'The reaction'), { size: 24, col: C.prot, w: 700, op: chemK });
          ch += T(x, 256, 'Ser–CH₂–OH', { size: 26, font: 'JetBrains Mono', w: 700, col: CLASSCOL.p, op: chemK }) + T(x, 296, '+ ATP', { size: 24, font: 'JetBrains Mono', col: ATPC, op: chemK });
          ch += T(x, 350, '↓  ' + T2('kinase', 'kinase'), { size: 24, col: C.prot, op: chemK });
          ch += T(x, 406, 'Ser–CH₂–O–PO₃²⁻', { size: 26, font: 'JetBrains Mono', w: 700, col: PHOS, op: chemK }) + T(x, 446, '+ ADP', { size: 24, font: 'JetBrains Mono', col: ATPC, op: chemK });
          ch += TL(x, 510, [T2('ook op Thr (OH) en Tyr (fenol-OH)', 'also on Thr (OH) and Tyr (phenol OH)'), T2('mens: ~500 eiwitkinasen', 'human: ~500 protein kinases')], { size: 19, col: '#c9d2e4', w: 500, op: chemK });
          }
        }
        $('pt-chem').innerHTML = ch;
        // ubiquitine (stap 8)
        let us = '';
        const UBP = [[LYS[0] - 40, LYS[1] + 58], [LYS[0] - 98, LYS[1] + 84], [LYS[0] - 156, LYS[1] + 104], [LYS[0] - 214, LYS[1] + 118]];
        let ubL = '', ubB = '', nUb = 0;
        if (step === 8) {
          // E3-ligase met een voorraad ubiquitine staat er van bij het begin; de ubiquitines schuiven één voor één naar de keten
          us += enz(LYS[0] + 150, LYS[1] + 16, 120, 54, T2('E3-ligase', 'E3 ligase'), { fs: 24 });   // E3 bindt het doeleiwit naast de lysine (zoals in ubiquitine)
          for (let i = 0; i < 4; i++) {
            const k = ease(sub(p, .05 + i * .17, .25 + i * .17)), [x1, y1] = UBP[i];
            const x = lerp(130 + i * 58, x1, k), y = lerp(820, y1, k);
            let [px, py] = i ? UBP[i - 1] : LYS;
            if (!i) { const d = Math.hypot(x1 - px, y1 - py); px += (x1 - px) / d * 19; py += (y1 - py) / d * 19; }
            if (k > .85) ubL += `<line x1="${f1(px)}" y1="${f1(py)}" x2="${x1}" y2="${y1}" stroke="#fff" stroke-width="3" opacity="${f1(sub(k, .85, 1))}"/>`;
            ubB += ub(x, y, 24);
            if (k >= 1) nUb++;
          }
        }
        us += ubL + ubB;
        if (step === 8) us += T(LYS[0] + 170, LYS[1] + 90, T2('K48-polyubiquitine', 'K48 polyubiquitin'), { size: 22, col: '#ffd166', op: sub(p, .7, .85), anchor: 'start' }) + T(LYS[0] + 170, LYS[1] + 122, T2('= “breek mij af”', '= “degrade me”'), { size: 22, op: sub(p, .75, .9), anchor: 'start' });
        $('pt-ub').innerHTML = us;
        $('pt-ubA').setAttribute('cx', LYS[0] - 175);   /* links van het Lys-bolletje, niet erover */ $('pt-ubA').setAttribute('cy', nUb ? LYS[1] + 30 : -9999);

        /* ---------- paneel B: cascade ---------- */
        const cp = step === 5 ? p : step > 5 ? 1 : 0;
        const RAF = [[2500, 200]], MEK = [[2180, 380], [2500, 380], [2820, 380]], ERK = [1950, 2170, 2390, 2610, 2830, 3050].map(x => [x, 560]), TG = [1950, 2170, 2390, 2610, 2830, 3050].map(x => [x, 720]);
        const aR = sub(cp, .05, .15), aM = sub(cp, .25, .4), aE = sub(cp, .5, .65), aT = sub(cp, .75, .9);
        let cs = arr(2500, 80, 2500, 140, '#fff', 'pt-w', { op: sub(cp, 0, .08) }) + T(2560, 102, T2('groeifactorsignaal (via Ras)', 'growth-factor signal (via Ras)'), { size: 20, anchor: 'start', op: sub(cp, 0, .08) });
        const KC = { Raf: '#ff9a4d', MEK: '#ff7eb6', ERK: '#5fd3e6' };   // zelfde vaste kleuren als in rtk, mapk en srf (signal/rtk.js K)
        const kin = (x, y, lab, a, np, rx = 100) => enz(x, y, rx, 44, lab, { col: KC[lab], fillOp: a > .5 ? .35 : .12, fs: 22 }) + Array.from({ length: np }, (_, j) => phos(x + rx - 6 + j * 34, y - 34, 15, a)).join('');
        RAF.forEach(([x, y]) => cs += kin(x, y, 'Raf', aR, 1));
        MEK.forEach(([x, y]) => { cs += arr(2500, 244, x, y - 50, C.prot, 'pt-p', { op: sub(cp, .15, .25), bend: 0 }); cs += kin(x, y, 'MEK', aM, 2); });
        ERK.forEach(([x, y], i) => { const m = MEK[Math.floor(i / 2)]; cs += arr(m[0], m[1] + 46, x, y - 50, C.prot, 'pt-p', { op: sub(cp, .4, .5) }); cs += kin(x, y, 'ERK', aE, 2, 80); });
        TG.forEach(([x, y], i) => { cs += arr(ERK[i][0], ERK[i][1] + 46, x, y - 36, C.prot, 'pt-p', { op: sub(cp, .65, .75) }); cs += enz(x, y, 70, 32, '', { col: C.chain, fillOp: aT > .5 ? .4 : .12 }) + phos(x + 62, y - 26, 16, aT); });
        cs += T(2500, 820, T2('MEK fosforyleert ERK op Thr én Tyr: 1 Raf → vele ERK → nog meer doelen', 'MEK phosphorylates ERK on Thr and Tyr: 1 Raf → many ERK → even more targets'), { size: 22, op: sub(cp, .55, .7) });
        $('pt-casc').innerHTML = cs;

        /* ---------- paneel D: Pro → Hyp ---------- */
        let tr = '';
        const hk = step === 7 ? sub(p, .15, .7) : step > 7 ? 1 : 0;
        const tri = ['Gly', 'Pro', 'Pro', 'Gly', 'Pro', 'Pro', 'Gly', 'Pro', 'Pro'];
        for (let i = 0; i < tri.length; i++) {
          const x = 5470 + i * 108, y = 440 + (i % 3 === 0 ? 0 : 0);
          const isY = i % 3 === 2, done = isY && hk > (i + 1) / 10;
          const lab = done ? 'Hyp' : tri[i];
          tr += `<circle cx="${x}" cy="${y}" r="30" fill="${tri[i] === 'Gly' ? '#ffe08a' : CLASSCOL.s}" stroke="#0a1224" stroke-width="2"/>` + T(x, y + 7, lab, { size: 19, col: '#0a1224', halo: false, w: 700 });
          if (done) tr += tag(x + 26, y - 38, 'OH', '#ff8a3d', { fs: 18, w: 46 });
          if (i < tri.length - 1) tr += `<line x1="${x + 30}" y1="${y}" x2="${x + 78}" y2="${y}" stroke="${C.chain}" stroke-width="5"/>`;
          if (i === 0) tr += T(x + 108, y - 74, 'Gly – X – Y', { size: 22, col: C.muted, font: 'JetBrains Mono' });
        }
        if (step === 7) { const ex = lerp(5500, 6400, hk); tr += enz(ex, 380, 90, 34, 'P4H', { op: sub(p, .05, .15) * (1 - sub(p, .75, .85)), fs: 20 }); }
        tr += T(5900, 790, T2('3 ketens: collageen-triple helix', '3 chains: collagen triple helix'), { size: 25, col: C.chain });
        $('pt-trip').innerHTML = tr;
      },
    };
  },
};
