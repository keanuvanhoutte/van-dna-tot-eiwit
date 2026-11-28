import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { helixAlong, prot, nucleosome, panel, arrow } from './_txn.js';
import { ePill } from '../repl/_draw.js';
import { polII } from '../../bio.js';

/* Geometrie: DNA als rechte lijn (y = Y0) die bij k = 1 een lus vormt zodat de enhancer (XE) naast de promoter komt. */
const Y0 = 560, XE = 380, XP = 960, D = 420, TATA = 985, TSS = 1012, GEND = 1420;
const LC = [880, 640], LR = Math.hypot(80, 80), A0 = Math.atan2(-80, -80), SPAN = 2 * Math.PI - (Math.atan2(-80, 80) - A0);
function loopPt(X) {
  if (X <= XE) return [X + D, Y0];
  if (X >= XP) return [X, Y0];
  const a = A0 - SPAN * (X - XE) / (XP - XE);
  return [LC[0] + LR * Math.cos(a), LC[1] + LR * Math.sin(a)];
}
const centerK = k => X => { const l = loopPt(X); return [lerp(X, l[0], k), lerp(Y0, l[1], k)]; };
const NUC = [-330, -150, 205, 545, 700, TATA, 1215, 1320, 1690, 1880];   // +1-nucleosoom iets verder: plaats voor TFIIH vóór Pol II
const CTCF1 = 90, CTCF2 = 1500;

const M = { act: C.prot, med: '#6f5bd6', hat: '#d98cf0', rem: '#8f7bd0', ctcf: '#e8a23a', rep: C.danger, pol: C.prot };   // Pol II: overal #9b7bff (C.prot)

export default {
  id: 'genregulatie',
  title: { nl: 'Genregulatie', en: 'Gene regulation' },
  scale: { nl: 'DNA-afstanden ingekort · eiwitten ≈ 10–30 nm', en: 'DNA distances shortened · proteins ≈ 10–30 nm' }, time: { nl: 'seconden tot uren (hier samengevat)', en: 'seconds to hours (condensed here)' },
  org: { nl: 'mens (RNA-polymerase II-gen)', en: 'human (RNA polymerase II gene)' },
  legend: [[C.dna, 'DNA'], [C.histone, { nl: 'nucleosoom', en: 'nucleosome' }], [C.acetyl, { nl: 'acetylgroep (Ac)', en: 'acetyl group (Ac)' }], [M.act, { nl: 'activator', en: 'activator' }],
    [M.med, 'Mediator'], [M.hat, 'HAT (p300/CBP)'], [M.rem, { nl: 'remodeler (SWI/SNF)', en: 'remodeller (SWI/SNF)' }], [M.ctcf, { nl: 'CTCF (isolator)', en: 'CTCF (insulator)' }], [M.rep, { nl: 'repressor', en: 'repressor' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Rode draad: een gen wordt niet "aangezet" door één schakelaar, maar door een reeks stappen: toegankelijk chromatine, gebonden activatoren, co-activatoren en ten slotte een volledig preinitiatiecomplex op de promoter.</p><p style="font-size:13px;color:#93a0bb">Geelgroene bolletjes op de histonstaarten = acetylgroepen (Ac). Silencers werken niet alleen via deacetylering (HDAC), maar ook via H3K9/H3K27-methylatie en DNA-methylatie.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Common thread: a gene is not switched on by a single switch but by a series of steps: accessible chromatin, bound activators, co-activators and finally a complete pre-initiation complex on the promoter.</p><p style="font-size:13px;color:#93a0bb">Yellow-green dots on the histone tails = acetyl groups (Ac). Silencers act not only via deacetylation (HDAC) but also via H3K9/H3K27 methylation and DNA methylation.</p>' },
  simplified: {
    nl: 'De afstand enhancer–promoter is sterk ingekort (in werkelijkheid kan die groot zijn, bv. ≈ 1 Mb bij de enhancer van het gen SHH). Nucleosomen zijn schijfjes met één DNA-winding (echt ~147 bp in ~1,7 windingen); het DNA is een platte golf. Eén activator staat model voor vele (enhancers binden meestal meerdere factoren samen). Mediator, HAT\'s en remodelers zijn schematische vormen; de volgorde waarin co-activatoren aankomen verschilt per gen. Cohesine (lusvorming) is enkel vermeld.',
    en: 'The enhancer–promoter distance is strongly shortened (in reality it can be large, e.g. ≈ 1 Mb for the enhancer of the SHH gene). Nucleosomes are discs with one DNA turn (really ~147 bp in ~1.7 turns); the DNA is a flat wave. One activator stands for many (enhancers usually bind several factors together). Mediator, HATs and remodellers are schematic shapes; the order in which co-activators arrive differs between genes. Cohesin (loop formation) is only mentioned.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: 'DNA', d: { nl: 'De lange draad (twee blauwe strengen) met de genetische informatie. Hier ligt een gen met ver ervandaan een versterker.', en: 'The long thread (two blue strands) carrying the genetic information. Here lies a gene with a booster far away from it.' },
      p: { nl: 'Chromosomaal DNA rond een RNA-polymerase II-gen; afstanden sterk ingekort.', en: 'Chromosomal DNA around an RNA polymerase II gene; distances strongly shortened.' } },
    { c: C.histone, t: { nl: 'nucleosoom', en: 'nucleosome' }, d: { nl: 'De grijze schijfjes: eiwitklosjes waar het DNA omheen gewonden is. Zolang een klosje op de startplek ligt, blijft het gen uit.', en: 'The grey discs: protein spools that the DNA is wound around. As long as a spool sits on the start site, the gene stays off.' },
      p: { nl: 'Histonoctameer met ≈ 147 bp DNA; een nucleosoom op de promoter belemmert de binding van de algemene transcriptiefactoren.', en: 'Histone octamer with ≈ 147 bp of DNA; a nucleosome on the promoter hinders binding of the general transcription factors.' } },
    { c: C.trna, t: 'enhancer', m: ['… afstand sterk ingekort …', '… distance strongly shortened …'], d: { nl: 'Een versterker: een stukje DNA, soms heel ver van het gen, waar schakelaar-eiwitten binden om het gen aan te zetten.', en: 'A booster: a stretch of DNA, sometimes very far from the gene, where switch proteins bind to switch the gene on.' },
      p: { nl: 'Cis-regulerend element met bindingsplaatsen voor transcriptiefactoren; werkt op afstand en oriëntatie-onafhankelijk (tot ≈ 1 Mb, bv. bij SHH).', en: 'Cis-regulatory element with transcription factor binding sites; acts at a distance and independently of orientation (up to ≈ 1 Mb, e.g. for SHH).' } },
    { c: '#c9b8ff', t: 'TATA', d: { nl: 'Een kort stukje DNA vlak vóór het gen: hier wordt de startmachine opgebouwd.', en: 'A short stretch of DNA just before the gene: this is where the start machine is built.' },
      p: { nl: 'TATA-box van de kernpromoter (≈ −30), herkend door TBP in TFIID.', en: 'TATA box of the core promoter (≈ −30), recognised by TBP in TFIID.' } },
    { c: C.text, t: '+1', d: { nl: 'De plek waar het kopiëren naar RNA begint; het pijltje wijst de leesrichting aan.', en: 'The spot where copying into RNA begins; the arrow shows the reading direction.' },
      p: { nl: 'Transcriptiestartplaats (TSS).', en: 'Transcription start site (TSS).' } },
    { c: C.rna, t: { nl: 'gen ↗', en: 'gene ↗' }, d: { nl: 'Het gen zelf (oranje balk): het stuk DNA dat in RNA wordt gekopieerd.', en: 'The gene itself (orange bar): the stretch of DNA that is copied into RNA.' },
      p: { nl: 'Getranscribeerd gebied, stroomafwaarts van de TSS.', en: 'Transcribed region, downstream of the TSS.' } },
    { c: M.act, t: { nl: 'activator', en: 'activator' }, m: ['DNA-bindend domein', 'DNA-binding domain', 'activatiedomein', 'activation domain'], d: { nl: 'Het schakelaar-eiwit. Eén deel grijpt zijn eigen stukje DNA in de versterker, een ander deel roept helpers op.', en: 'The switch protein. One part grips its own stretch of DNA in the booster, another part calls in helpers.' },
      p: { nl: 'Sequentiespecifieke transcriptiefactor (vaak dimeer): DNA-bindend domein plus activatiedomein dat co-activatoren rekruteert.', en: 'Sequence-specific transcription factor (often a dimer): DNA-binding domain plus activation domain that recruits co-activators.' } },
    { c: C.danger, t: { nl: 'herkenningshelix in de grote groef', en: 'recognition helix in the major groove' }, m: ['H-bruggen met randen van basenparen', 'H-bonds to base-pair edges'], d: { nl: 'Een spiraalvormig stukje eiwit (rood) past in de brede groef van het DNA en ‘leest’ daar de letters.', en: 'A spiral-shaped piece of protein (red) fits into the wide groove of the DNA and ‘reads’ the letters there.' },
      p: { nl: 'α-helix in de grote groef; specificiteit via waterstofbruggen met de randen van de basenparen.', en: 'α-helix in the major groove; specificity via hydrogen bonds to the edges of the base pairs.' } },
    { c: '#ff9d6b', t: 'helix-turn-helix', d: { nl: 'Twee spiraaltjes met een knik ertussen; het tweede ligt in de groef.', en: 'Two little spirals with a bend between them; the second lies in the groove.' },
      p: { nl: 'Helix-turn-helixmotief (o.a. homeodomein): de tweede helix is de herkenningshelix.', en: 'Helix-turn-helix motif (e.g. homeodomain): the second helix is the recognition helix.' } },
    { c: '#ffc247', t: { nl: 'zinkvinger (Cys₂His₂)', en: 'zinc finger (Cys₂His₂)' }, m: ['Zn'], d: { nl: 'Een vingertje dat in vorm gehouden wordt door een zinkatoom (Zn).', en: 'A little finger held in shape by a zinc ion (Zn).' },
      p: { nl: 'C₂H₂-zinkvinger: ββα-vouw gestabiliseerd door Zn²⁺; meerdere vingers lezen telkens ≈ 3 bp.', en: 'C₂H₂ zinc finger: ββα fold stabilised by Zn²⁺; several fingers each read ≈ 3 bp.' } },
    { c: C.danger, t: { nl: 'leucinerits (bZIP)', en: 'leucine zipper (bZIP)' }, d: { nl: 'Twee lange spiralen die bovenaan als een rits aan elkaar vastzitten en onderaan het DNA grijpen.', en: 'Two long spirals zipped together at the top that grip the DNA at the bottom.' },
      p: { nl: 'Basisch leucineritsmotief: dimerisatie via een coiled coil, basische helices binden de grote groef.', en: 'Basic leucine zipper motif: dimerisation via a coiled coil, basic helices bind the major groove.' } },
    { c: '#ff9d6b', t: { nl: 'helix-loop-helix (bHLH)', en: 'helix-loop-helix (bHLH)' }, d: { nl: 'Twee spiralen met een lusje ertussen; twee zulke eiwitten werken als paar.', en: 'Two spirals with a little loop between them; two such proteins work as a pair.' },
      p: { nl: 'Basisch helix-loop-helixmotief; dimeer, basische regio bindt de E-box.', en: 'Basic helix-loop-helix motif; dimer, basic region binds the E-box.' } },
    { c: C.acetyl, t: { nl: 'acetylgroep (Ac)', en: 'acetyl group (Ac)' }, d: { nl: 'Geelgroene merkjes op de eiwitklosjes. Ze maken het DNA losser, zodat het gen bereikbaar wordt.', en: 'Yellow-green tags on the protein spools. They loosen the DNA, so the gene becomes reachable.' },
      p: { nl: 'Lysine-acetylering van histonstaarten (o.a. H3K27ac); neutraliseert de lading en rekruteert bromodomeineiwitten.', en: 'Lysine acetylation of histone tails (e.g. H3K27ac); neutralises charge and recruits bromodomain proteins.' } },
    { c: M.hat, t: 'p300/CBP', m: ['HAT: acetyleert H3K27', 'HAT: acetylates H3K27'], d: { nl: 'Een helper die de geelgroene merkjes op de eiwitklosjes hangt.', en: 'A helper that attaches the yellow-green tags to the protein spools.' },
      p: { nl: 'Histonacetyltransferase en co-activator; zet H3K27ac op actieve enhancers.', en: 'Histone acetyltransferase and co-activator; deposits H3K27ac at active enhancers.' } },
    { c: M.rem, t: 'SWI/SNF', m: ['remodeler (ATP)', 'remodeller (ATP)'], d: { nl: 'Een helper die met energie (ATP) het eiwitklosje van de startplek wegduwt.', en: 'A helper that uses energy (ATP) to push the protein spool off the start site.' },
      p: { nl: 'ATP-afhankelijke chromatineremodeler; verschuift of verwijdert het promoternucleosoom.', en: 'ATP-dependent chromatin remodeller; slides or evicts the promoter nucleosome.' } },
    { c: M.med, t: 'Mediator', d: { nl: 'Een groot eiwitcomplex dat als brug het signaal van het schakelaar-eiwit doorgeeft aan het RNA-enzym.', en: 'A large protein complex that acts as a bridge, passing the signal from the switch protein to the RNA enzyme.' },
      p: { nl: 'Mediatorcomplex, verbindt activatiedomeinen met Pol II en het preinitiatiecomplex.', en: 'Mediator complex, connects activation domains with Pol II and the pre-initiation complex.' } },
    { c: M.ctcf, t: 'CTCF', m: ['lusdomein (TAD)', 'loop domain (TAD)'], d: { nl: 'Grenseiwitten (oranje) die het DNA in lussen verdelen, zodat een versterker alleen genen in zijn eigen lus aanzet.', en: 'Border proteins (orange) that divide the DNA into loops, so a booster only switches on genes in its own loop.' },
      p: { nl: 'Isolatoreiwit; begrenst met cohesine topologisch geassocieerde domeinen (TAD’s).', en: 'Insulator protein; together with cohesin it delimits topologically associating domains (TADs).' } },
    { c: M.rep, t: 'repressor', m: ['elders: een silencer', 'elsewhere: a silencer'], d: { nl: 'Een rem-eiwit dat op een remmend stukje DNA (silencer) bindt en helpers oproept die het gen afsluiten.', en: 'A brake protein that binds a repressing stretch of DNA (silencer) and calls in helpers that shut the gene off.' },
      p: { nl: 'Transcriptionele repressor op een silencer; rekruteert co-repressoren zoals HDAC’s.', en: 'Transcriptional repressor at a silencer; recruits co-repressors such as HDACs.' } },
    { c: '#b35a7a', t: 'HDAC', m: ['Ac weg → compact', 'Ac removed → compact'], d: { nl: 'Een helper die de merkjes weer weghaalt. Het DNA wordt dan compacter en het gen gaat uit.', en: 'A helper that removes the tags again. The DNA then becomes more compact and the gene switches off.' },
      p: { nl: 'Histondeacetylase; deacetylering verdicht het chromatine (naast o.a. H3K9/H3K27-methylatie).', en: 'Histone deacetylase; deacetylation compacts chromatin (alongside e.g. H3K9/H3K27 methylation).' } },
    { c: '#8e6cf0', t: 'TFIID', d: { nl: 'De eerste helper van de startmachine: hij herkent het TATA-stukje.', en: 'The first helper of the start machine: it recognises the TATA stretch.' },
      p: { nl: 'TFIID (TBP + TAF’s) bindt de TATA-box en initieert de assemblage van het PIC.', en: 'TFIID (TBP + TAFs) binds the TATA box and initiates PIC assembly.' } },
    { c: '#6f5bd6', t: 'TFIIA', m: ['TFIIB'], d: { nl: 'Twee helpers die de eerste helper steviger op het DNA houden en het RNA-enzym de juiste plek wijzen.', en: 'Two helpers that hold the first helper more firmly on the DNA and show the RNA enzyme the right spot.' },
      p: { nl: 'TFIIA stabiliseert TBP–DNA; TFIIB bindt BRE en rekruteert Pol II–TFIIF.', en: 'TFIIA stabilises TBP–DNA; TFIIB binds the BRE and recruits Pol II–TFIIF.' } },
    { c: C.prot, t: 'Pol II', d: { nl: 'Het RNA-enzym (RNA-polymerase II) dat het gen gaat kopiëren; het DNA loopt door zijn geul.', en: 'The RNA enzyme (RNA polymerase II) that will copy the gene; the DNA runs through its cleft.' },
      p: { nl: 'RNA-polymerase II, met de CTD die later wordt gefosforyleerd.', en: 'RNA polymerase II, with the CTD that is phosphorylated later.' } },
    { c: '#5a4bb8', t: 'TFIIF', m: ['TFIIE'], d: { nl: 'Helpers die met het RNA-enzym meekomen en de laatste helper oproepen.', en: 'Helpers that arrive with the RNA enzyme and call in the last helper.' },
      p: { nl: 'TFIIF begeleidt Pol II; TFIIE rekruteert TFIIH.', en: 'TFIIF accompanies Pol II; TFIIE recruits TFIIH.' } },
    { c: '#8e6cf0', t: 'TFIIH', d: { nl: 'De laatste helper: hij draait het DNA open en geeft het startsein.', en: 'The last helper: it unwinds the DNA and gives the go signal.' },
      p: { nl: 'TFIIH: XPB opent het promoter-DNA, CDK7 fosforyleert Ser5 van de CTD.', en: 'TFIIH: XPB opens the promoter DNA, CDK7 phosphorylates Ser5 of the CTD.' } },
  ],
  steps: [
    { dur: 8000, cam: cam(760, 500, 1400), title: { nl: 'Een gen dat uit staat', en: 'A gene that is switched off' },
      text: { nl: 'Het DNA is rond eiwitklosjes (nucleosomen) gewonden. De startplek is bedekt, dus het gen blijft uit.', en: 'The DNA is wound around protein spools (nucleosomes). The start site is covered, so the gene stays off.' } },
    { dur: 7000, cam: cam(400, 470, 760), title: { nl: 'Een schakelaar-eiwit bindt het DNA', en: 'A switch protein binds the DNA' },
      text: { nl: 'Een schakelaar-eiwit bindt zijn stukje DNA in een verre versterker (enhancer). Een ander deel roept helpers op.', en: 'A switch protein binds its own DNA stretch in a distant booster (enhancer). Another part calls in helpers.' } },
    { dur: 9000, cam: cam(380, 405, 880), title: { nl: 'Zo leest een eiwit het DNA', en: 'How a protein reads the DNA' },
      text: { nl: 'Meestal past een spiraalvormig stukje van het eiwit (helix) in een groef van het DNA. Zo ‘leest’ het de basen.', en: 'Usually a spiral-shaped part of the protein (helix) fits into a groove of the DNA. That is how it ‘reads’ the bases.' } },
    { dur: 9000, cam: cam(700, 470, 1250), title: { nl: 'Het DNA wordt losser gemaakt', en: 'The DNA is loosened' },
      text: { nl: 'Helpers hangen geelgroene merkjes (acetylgroepen) aan de eiwitklosjes en schuiven het klosje van de startplek weg.', en: 'Helpers attach yellow-green tags (acetyl groups) to the protein spools and push the spool off the start site.' } },
    { dur: 7000, cam: cam(575, 460, 1030), title: { nl: 'Mediator: de brug', en: 'Mediator: the bridge' },
      text: { nl: 'Het schakelaar-eiwit roept Mediator op, een groot eiwitcomplex. Dat seint door naar het enzym dat RNA maakt.', en: 'The switch protein calls in Mediator, a large protein complex. It relays the signal to the enzyme that makes RNA.' } },
    { dur: 9000, cam: cam(880, 540, 1100), title: { nl: 'Het DNA maakt een lus', en: 'The DNA forms a loop' },
      text: { nl: 'Het DNA ertussen vormt een lus. Zo komt de verre versterker toch vlak bij de startplek.', en: 'The DNA in between forms a loop. This brings the distant booster right next to the start site.' } },
    { dur: 9000, cam: cam(965, 425, 1360), title: { nl: 'Grenzen en remmen', en: 'Borders and brakes' },
      text: { nl: 'Grenseiwitten verdelen het DNA in lussen, zodat een versterker het juiste gen aanzet. Rem-eiwitten sluiten het af.', en: 'Border proteins divide the DNA into loops, so a booster switches on the right gene. Brake proteins close it off.' } },
    { dur: 9000, cam: cam(950, 500, 900), title: { nl: 'De startmachine wordt opgebouwd', en: 'The start machine is built' },
      text: { nl: 'Op de vrije startplek zetten hulpeiwitten het enzym dat RNA maakt klaar → volgend hoofdstuk.', en: 'On the freed start site, helper proteins set up the enzyme that makes RNA → next chapter.' } },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="dnahelix" data-color="${C.dna}" data-label="${T2('DNA-dubbelhelix', 'DNA double helix')}" data-nolabel>
      <g id="gr-rungs"></g>
      <path id="gr-s1" stroke="${C.dna}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path id="gr-s2" stroke="${C.dna2}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <g id="gr-marks"></g>
    <g data-node="promoter" data-color="${C.prot}" data-label="${T2('Kernpromoter (TATA) → volgend hoofdstuk', 'Core promoter (TATA) → next chapter')}">
      <g id="gr-prom"></g><circle id="gr-promA" data-anchor="promoter" data-pos="below" r="1" fill="none"/>
    </g>
    <g data-node="transcriptie" data-nolabel data-color="${C.rna}" data-label="${T2('Gen → transcriptie', 'Gene → transcription')}">
      <g id="gr-gene"></g><circle id="gr-geneA" data-anchor="transcriptie" r="1" fill="none"/>
    </g>
    <g data-node="chromatine" data-color="${C.histone}" data-label="${T2('Chromatine (nucleosomen)', 'Chromatin (nucleosomes)')}">
      <g id="gr-nuc"></g><circle id="gr-nucA" data-anchor="chromatine" r="1" fill="none"/>
    </g>
    <g data-node="histonmod" data-color="${C.acetyl}" data-label="${T2('Histonacetylatie', 'Histone acetylation')}">
      <g id="gr-hat"></g><circle id="gr-hatA" data-anchor="histonmod" r="1" fill="none"/>
    </g>
    <g id="gr-prot"></g>
    <g data-node="rnapol" data-color="${M.pol}" data-label="${T2('RNA-polymerase II', 'RNA polymerase II')}"><g id="gr-pic"></g><circle id="gr-polA" data-anchor="rnapol" r="1" fill="none"/></g>   <!-- Pol II onder de algemene factoren: TFIIB/F/E/H liggen er zichtbaar tegen -->
    <g data-node="promoter" data-nolabel data-color="${C.prot}"><g id="gr-gtf"></g></g>
    <g id="gr-ins"></g>
    <g data-node="tertiair" data-nolabel data-color="${C.danger}"><g id="gr-dbd"></g></g>
    <g data-node="histonmod" data-nolabel data-color="${C.ok}"><g id="gr-sil"></g></g>
    <g data-node="operon" data-nolabel data-color="${C.bact}" data-label="${T2('Zijpad: bacteriën (lac-operon)', 'Side path: bacteria (lac operon)')}">
      <g id="gr-opbtn"></g><circle id="gr-opA" data-anchor="operon" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const setA = (id, x, y, on = 1) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); e.setAttribute('opacity', on ? 1 : 0); };
    let lastK = -1;

    /* inzet: DNA-bindende motieven (statisch, verschijnt in stap 2) */
    function dbdInset(op) {
      if (op <= .01) return '';
      const x0 = -20, y0 = 170, W = 800, H = 272;
      let s = `<g opacity="${f1(op)}">` + panel(x0, y0, W, H);
      // close-up: grote groef met herkenningshelix
      const cx = 180, cy = 320;
      let b1 = '', b2 = '', rg = '';
      for (let x = -150; x <= 150; x += 4) {
        const y1 = cy + 42 * Math.sin((x + 20) / 48), y2 = cy + 42 * Math.sin((x + 20) / 48 + 2.2);
        b1 += `${x === -150 ? 'M' : 'L'}${f1(cx + x)},${f1(y1)}`; b2 += `${x === -150 ? 'M' : 'L'}${f1(cx + x)},${f1(y2)}`;
        if ((x + 150) % 16 === 0) rg += `<line x1="${f1(cx + x)}" y1="${f1(y1)}" x2="${f1(cx + x)}" y2="${f1(y2)}" stroke="${['#5ad17a', '#ffc247', '#4fb0ff', '#ff6b6b'][((x + 150) / 16) % 4]}" stroke-width="4" opacity=".75"/>`;
      }
      s += rg + `<path d="${b1}" stroke="${C.dna}" stroke-width="6" fill="none"/><path d="${b2}" stroke="${C.dna2}" stroke-width="6" fill="none"/>`;
      s += `<rect x="${cx - 58}" y="${cy - 14}" width="116" height="28" rx="14" fill="${C.danger}" fill-opacity=".85" stroke="#fff" stroke-width="1.5" transform="rotate(-18 ${cx} ${cy})"/>`;
      for (let i = -2; i <= 2; i++) s += `<line x1="${cx + i * 20}" y1="${cy + 12 - i * 6}" x2="${cx + i * 20}" y2="${cy + 34 - i * 6}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`;
      s += txt(cx, y0 + 30, T2('herkenningshelix in de grote groef', 'recognition helix in the major groove'), C.text, 16);
      s += txt(cx, y0 + H - 18, T2('H-bruggen met randen van basenparen', 'H-bonds to base-pair edges'), C.muted, 14);
      // vier motieven
      const mx = [480, 660], my = [255, 377];
      const helix = (x, y, w, rot, col = C.danger) => `<rect x="${f1(x - w / 2)}" y="${f1(y - 8)}" width="${w}" height="16" rx="8" fill="${col}" fill-opacity=".85" transform="rotate(${rot} ${f1(x)} ${f1(y)})"/>`;
      const dna = (x, y) => `<line x1="${x - 70}" y1="${y}" x2="${x + 70}" y2="${y}" stroke="${C.dna}" stroke-width="7" opacity=".7"/><line x1="${x - 70}" y1="${y + 10}" x2="${x + 70}" y2="${y + 10}" stroke="${C.dna2}" stroke-width="5" opacity=".6"/>`;
      // HTH
      s += dna(mx[0], my[0] + 16) + helix(mx[0] - 24, my[0] - 26, 50, -35, '#ff9d6b') + `<path d="M${mx[0] - 4},${my[0] - 40} q12,-6 14,12" stroke="#fff" stroke-width="2" fill="none"/>` + helix(mx[0] + 12, my[0] + 4, 60, 0);
      s += txt(mx[0], my[0] + 46, 'helix-turn-helix', C.text, 14);
      // zinkvinger
      s += dna(mx[1], my[0] + 16) + `<path d="M${mx[1] - 40},${my[0] - 30} l18,24 l18,-24" stroke="#ffc247" stroke-width="7" fill="none" stroke-linejoin="round"/>` + helix(mx[1] + 26, my[0] + 0, 56, -10) +
        `<circle cx="${mx[1] - 2}" cy="${my[0] - 26}" r="9" fill="#9fb3c8" stroke="#fff"/><text x="${mx[1] - 2}" y="${my[0] - 22.5}" font-size="9" text-anchor="middle" font-family="Inter" font-weight="800" fill="#0a1224">Zn</text>`;
      s += txt(mx[1], my[0] + 46, T2('zinkvinger (Cys₂His₂)', 'zinc finger (Cys₂His₂)'), C.text, 14);
      // leucinerits
      s += dna(mx[0], my[1] + 16) + helix(mx[0] - 22, my[1] - 6, 64, 60) + helix(mx[0] + 22, my[1] - 6, 64, -60) + `<rect x="${mx[0] - 8}" y="${my[1] - 62}" width="16" height="36" rx="8" fill="#ff9d6b"/>`;
      s += txt(mx[0], my[1] + 46, T2('leucinerits (bZIP)', 'leucine zipper (bZIP)'), C.text, 14);
      // bHLH
      s += dna(mx[1], my[1] + 16) + helix(mx[1] - 24, my[1] - 2, 50, 70) + helix(mx[1] + 24, my[1] - 2, 50, -70) + helix(mx[1] - 24, my[1] - 44, 40, -20, '#ff9d6b') + helix(mx[1] + 24, my[1] - 44, 40, 20, '#ff9d6b');
      s += txt(mx[1], my[1] + 46, T2('helix-loop-helix (bHLH)', 'helix-loop-helix (bHLH)'), C.text, 14);
      return s + '</g>';
    }
    /* inzet: silencer + repressor */
    function silInset(op) {
      if (op <= .01) return '';
      const x0 = 1030, y0 = 76, W = 540, H = 250;
      let s = `<g opacity="${f1(op)}">` + panel(x0, y0, W, H, 1, '#5a2a3a');
      s += txt(x0 + W / 2, y0 + 38, T2('elders: een silencer', 'elsewhere: a silencer'), C.danger, 22);
      s += `<line x1="${x0 + 30}" y1="${y0 + 190}" x2="${x0 + W - 30}" y2="${y0 + 190}" stroke="${C.dna}" stroke-width="8"/>`;
      s += `<rect x="${x0 + 70}" y="${y0 + 180}" width="70" height="20" fill="none" stroke="${C.danger}" stroke-dasharray="4 3" stroke-width="2"/>`;
      s += prot(x0 + 108, y0 + 146, 62, 24, M.rep, 1, 11, T2('repressor', 'repressor'), 18);
      s += prot(x0 + 236, y0 + 100, 46, 22, '#b35a7a', 1, 12, 'HDAC', 18);
      s += arrow(x0 + 284, y0 + 112, x0 + 338, y0 + 145, C.muted, 3);
      s += nucleosome(x0 + 370, y0 + 170, 1, 0) + nucleosome(x0 + 440, y0 + 170, 1, 0);
      s += txt(x0 + 405, y0 + 232, T2('Ac weg → compact', 'Ac removed → compact'), C.muted, 18);
      return s + '</g>';
    }

    return {
      update(t, s) {
        const { step, p } = s;
        const k = step < 5 ? 0 : step === 5 ? ease(sub(p, .1, .8)) : 1;
        const pt = centerK(k);
        if (Math.abs(k - lastK) > 1e-4) {
          lastK = k;
          const h = helixAlong(pt, -520, 2120, { amp: 13, period: 64, step: 5, rungEvery: 8, seed: 11 });
          $('gr-s1').setAttribute('d', h.s1); $('gr-s2').setAttribute('d', h.s2); $('gr-rungs').innerHTML = h.rungs;
        }
        const act = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .6)) : 1;
        const ac = step < 3 ? 0 : step === 3 ? sub(p, .1, .45) : step === 6 ? 1 - .5 * sub(p, 0, .3) : 1;
        const evict = step < 3 ? 0 : step === 3 ? ease(sub(p, .45, .9)) : 1;
        const med = step < 4 ? 0 : step === 4 ? ease(sub(p, .15, .6)) : 1;

        // elementen op het DNA
        const e = pt(XE), pr = pt(TATA), tss = pt(TSS);
        let marks = `<g opacity="${f1(1 - .6 * k)}">` +
          `<rect x="${f1(e[0] - 34)}" y="${f1(e[1] - 22)}" width="68" height="44" rx="8" fill="rgba(255,194,71,.10)" stroke="${C.trna}" stroke-dasharray="5 4" stroke-width="2"/></g>` +
          (k > .5 ? txt(e[0] - 36, e[1] - 96, 'enhancer', C.trna, 21, 'end') : txt(e[0], e[1] + 62, 'enhancer', C.trna, 21));
        if (step === 0) marks += txt((e[0] + pr[0]) / 2, Y0 + 64, T2('… afstand sterk ingekort …', '… distance strongly shortened …'), C.muted, 21);
        $('gr-marks').innerHTML = marks;
        $('gr-prom').innerHTML = `<rect x="${f1(pr[0] - 40)}" y="${f1(pr[1] - 22)}" width="72" height="44" rx="8" fill="rgba(155,123,255,.12)" stroke="${C.prot}" stroke-dasharray="5 4" stroke-width="2"/>` +
          (step === 7 && p > .12 ? '' : k > .5 ? txt(pr[0] - 66, pr[1] + 46, 'TATA', '#c9b8ff', 21, 'middle', 700, 'JetBrains Mono') : txt(pr[0] - 4, pr[1] + 64, 'TATA', '#c9b8ff', 21, 'middle', 700, 'JetBrains Mono'));
        setA('gr-promA', pr[0] - 4 + 60 * k, pr[1] + 68);
        const gy = Y0 + 38;
        $('gr-gene').innerHTML = (step === 7 && p > .35 ? '' : `<path d="M${TSS},${Y0 - 20} v-40 h26" stroke="${C.text}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`) +
          `<rect x="${TSS + 6}" y="${gy}" width="${GEND - TSS - 6}" height="16" rx="8" fill="${C.rna}" fill-opacity=".25" stroke="${C.rna}" stroke-width="1.5"/>` +
          txt((TSS + GEND) / 2 + 20, gy + 44, T2('gen ↗', 'gene ↗'), C.rna, 21) + (step === 7 && p > .35 ? '' : txt(TSS + 6, Y0 - 70, '+1', C.text, 18, 'start'));
        setA('gr-geneA', (TSS + GEND) / 2 + 60, gy);

        // nucleosomen
        let nu = '';
        for (const X of NUC) {
          const q = pt(X);
          const isProm = X === TATA;
          const acHere = [205, 545, 700, 1215].includes(X) ? ac : 0;
          if (isProm) nu += nucleosome(q[0] + 60 * evict, q[1] - 170 * evict, 1 - evict, 0);
          else nu += nucleosome(q[0], q[1], 1, acHere);
        }
        $('gr-nuc').innerHTML = nu;
        const na = pt(step === 3 ? 1215 : 1320); setA('gr-nucA', na[0], na[1] - 34);   // stap 4: knop binnen beeld

        // eiwitten
        let pr2 = '';
        const ay = lerp(e[1] - 240, e[1] - 30, act);
        if (act > .01) {
          pr2 += `<g opacity="${f1(clamp(act * 2))}">` +
            `<path d="M${f1(e[0] - 26)},${f1(ay)} q-6,-34 14,-44 M${f1(e[0] + 26)},${f1(ay)} q6,-34 -14,-44" stroke="${M.act}" stroke-width="4" fill="none"/>` +
            prot(e[0] - 18, ay, 24, 18, M.act, 1, 4) + prot(e[0] + 18, ay, 24, 18, M.act, 1, 5) +
            `<circle cx="${f1(e[0])}" cy="${f1(ay - 50)}" r="12" fill="${M.act}" fill-opacity=".6" stroke="${M.act}" stroke-width="2"/>` + '</g>';
          if (step === 1) {
            pr2 += `<line x1="${f1(e[0] - 58)}" y1="${f1(ay - 62)}" x2="${f1(e[0] - 26)}" y2="${f1(ay - 12)}" stroke="${C.muted}" stroke-width="2"/>` + txt(e[0] - 60, ay - 70, T2('DNA-bindend domein', 'DNA-binding domain'), C.text, 16, 'end');
            pr2 += txt(e[0] + 22, ay - 56, T2('activatiedomein', 'activation domain'), C.text, 16, 'start');
          }
        }
        // HAT en remodeler (stap 3–4)
        const hatOp = step === 3 ? sub(p, 0, .15) : step === 4 ? 1 - sub(p, .5, 1) : 0;
        const remOp = step === 3 ? sub(p, .3, .45) * (1 - sub(p, .9, 1) * .0) : step === 4 ? 1 - sub(p, 0, .4) : 0;
        let hat = prot(e[0] - 130, e[1] - 110, 56, 26, M.hat, hatOp, 21, 'p300/CBP', 18);
        if (hatOp > .01 && step === 3) hat += txt(e[0] - 130, e[1] - 162, T2('HAT: acetyleert H3K27', 'HAT: acetylates H3K27'), C.text, 18);
        $('gr-hat').innerHTML = hat;
        { const qa = pt(545); setA('gr-hatA', qa[0] + 4, qa[1] - 58, step >= 3 && step <= 5 && !(step === 3 && p < .3)); }
        const rq = pt(TATA);
        // SWI/SNF zit op het promoternucleosoom en duwt het weg; daarna blijft het op het vrijgekomen DNA (contact, niet zwevend)
        const remY = rq[1] - 50 + 16 * evict;   // eerst bovenop het nucleosoom, daarna op het vrijgekomen DNA
        pr2 += prot(rq[0] - 40, remY, 54, 26, M.rem, remOp, 22, 'SWI/SNF', 18);   // links van de +1-pijl
        if (step === 3 && remOp > .01) pr2 += txt(rq[0] - 60, remY - 46, T2('remodeler (ATP)', 'remodeller (ATP)'), C.text, 18);
        // Mediator
        // Mediator ligt tegen het activatiedomein (bol bovenaan de activator); na de lus raakt hij ook Pol II: de brug (Soutourina 2018)
        const PP = pt(TATA), polL = [PP[0] + 78 - 60, PP[1] - 60];
        const mA = [e[0] + 20, ay - 104], mB = [(e[0] + polL[0]) / 2, ((ay - 50) + polL[1]) / 2 - 6];
        const mp = [lerp(mA[0], mB[0], k), lerp(mA[1], mB[1], k)], mrx = lerp(82, Math.max(82, (polL[0] - e[0]) / 2 + 14), k);
        pr2 += prot(mp[0], mp[1] - 60 * (1 - med), mrx, 44, M.med, med, 31, 'Mediator', 20);
        // CTCF
        const c1 = pt(CTCF1), c2 = pt(CTCF2);
        const ctcf = (q) => `<rect x="${f1(q[0] - 12)}" y="${f1(q[1] - 20)}" width="24" height="40" rx="5" fill="${M.ctcf}" fill-opacity=".25" stroke="${M.ctcf}" stroke-width="2"/>` + prot(q[0], q[1] - 34, 26, 16, M.ctcf, 1, 41);
        pr2 += ctcf(c1) + ctcf(c2);
        $('gr-prot').innerHTML = pr2;

        // insulators & cohesine (stap 6)
        const insOp = step === 6 ? sub(p, 0, .2) : 0;
        let ins = '';
        if (insOp > .01) {
          ins += `<g opacity="${f1(insOp)}"><rect x="${f1(c1[0])}" y="${Y0 - 70}" width="${f1(c2[0] - c1[0])}" height="120" rx="14" fill="${M.ctcf}" fill-opacity=".07" stroke="${M.ctcf}" stroke-dasharray="6 5" stroke-width="1.5"/>` +
            txt(c1[0], c1[1] - 66 - 16, 'CTCF', M.ctcf, 20) + txt(c2[0], c2[1] - 66 - 16, 'CTCF', M.ctcf, 20) +
            txt(c2[0] - 40, Y0 - 112, T2('lusdomein (TAD)', 'loop domain (TAD)'), M.ctcf, 20, 'end') + '</g>';
        }
        $('gr-ins').innerHTML = ins;
        $('gr-sil').innerHTML = silInset(step === 6 ? sub(p, .35, .55) : 0);
        $('gr-dbd').innerHTML = dbdInset(step === 2 ? sub(p, .05, .2) : 0);

        // PIC (stap 7)
        let pic = '', gtf = '';
        const P = pt(TATA);
        const f = (a, b) => step === 7 ? ease(sub(p, a, b)) : 0;
        gtf += prot(P[0], P[1] - 34, 34, 20, '#8e6cf0', f(.05, .2), 51, 'TFIID', 15);
        gtf += ePill(P[0] - 62, P[1] + 32, 70, 26, 'TFIIA', '#6f5bd6', f(.18, .3), 15);
        gtf += ePill(P[0] + 56, P[1] + 32, 70, 26, 'TFIIB', '#6f5bd6', f(.25, .38), 15);
        const pOp = f(.4, .58);
        pic += polII(P[0] + 78, P[1], 64, 36, { col: M.pol, op: pOp, gul: 22, hoog: 3.1, seed: 52, label: 'Pol II', fs: 17, labelY: -54, ctd: 44 });   // app-vorm (bio.js): DNA door de geul, CTD onderaan achter (zoals in transcriptie en promoter; daar met label)
        // rechterkolom boven het +1-nucleosoom (niet erover): TFIIF, TFIIE, TFIIH (TFIIE haalt TFIIH binnen)
        // TFIIF en TFIIE tegen Pol II; TFIIH op het DNA vóór Pol II (XPB draait daar het DNA open; He et al. 2016)
        gtf += ePill(P[0] + 146, P[1] - 64, 70, 26, 'TFIIF', '#5a4bb8', f(.45, .6), 15);
        gtf += ePill(P[0] + 110, P[1] - 116, 70, 26, 'TFIIE', '#5a4bb8', f(.6, .72), 15);
        gtf += ePill(P[0] + 172, P[1], 62, 26, 'TFIIH', '#8e6cf0', f(.7, .85), 15);   // vóór de bek op het stroomafwaartse DNA, vóór het +1-nucleosoom
        $('gr-pic').innerHTML = pic; $('gr-gtf').innerHTML = gtf;
        setA('gr-polA', P[0] + 300, P[1] - 110, step === 7 && p > .5);

        // zijpad-knop
        const bx0 = step === 6 ? 380 : 110, by0 = step === 6 ? 120 : 200;
        $('gr-opbtn').innerHTML = `<g opacity="${step === 0 || step === 6 ? 1 : 0}"><rect x="${bx0}" y="${by0}" width="330" height="48" rx="24" fill="rgba(214,90,90,.15)" stroke="${C.bact}" stroke-width="2"/>` +
          txt(bx0 + 165, by0 + 32, T2('bacteriën: lac-operon ↗', 'bacteria: lac operon ↗'), '#f0a0a0', 21) + '</g>';
        setA('gr-opA', bx0 + 165, by0);
      },
    };
  },
};
