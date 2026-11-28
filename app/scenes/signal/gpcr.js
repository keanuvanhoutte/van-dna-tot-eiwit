import { C, T2, svgOpen, cam, FULL, f1, lerp, clamp } from '../../kit.js';
import { T, K, track, hot, tag, phos, bilayer, nucEnv, dna, mrna, adr, gpcr7, gAlpha, gBG, cAMP, anchor, ADRC, GTPC, GAC, GBC } from './_sig1.js';
import { eiwit, tmHelix, polII } from '../../bio.js';

/* Zijpad: adrenaline → β2-adrenerge receptor → Gs → adenylylcyclase → cAMP → PKA → CREB (CRE).
 * Membraan y 260–324, cytosol tot 646, kernenvelop y 660, DNA y 800. Alles volgt g = stap + p. */
const MY = 260, MH = 64, NY = 680, DY = 860;
const RX = 380, ACX = 800, PKX = 1180, PKY = 520, PORE = 1060, CRX = 1200;
const RC = '#8a93a8', CREBC = '#4fc3a1', CBPC = '#d98cf0', ACC = '#b58cff', AMPC = '#8a93a8';
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* cAMP-wolk: vaste plekjes (deterministisch) */
const CLOUD = Array.from({ length: 18 }, (_, i) => { const a = i * 2.39996, r = 30 + (i % 6) * 17; return [960 + Math.cos(a) * r * 1.5, 500 + Math.sin(a) * r * .75]; });
const RSITE = [[PKX - 15, PKY - 22], [PKX - 15, PKY + 22], [PKX + 15, PKY - 22], [PKX + 15, PKY + 22]];

export default {
  id: 'gpcr',
  title: { nl: 'G-eiwitgekoppelde receptor (cAMP)', en: 'G protein-coupled receptor (cAMP)' },
  scale: { nl: 'membraan ≈ 4 nm dik; niet op schaal', en: 'membrane ≈ 4 nm thick; not to scale' },
  time: { nl: 'cAMP stijgt binnen seconden; CREB-genen na minuten', en: 'cAMP rises within seconds; CREB genes after minutes' },
  org: { nl: 'mens (bv. luchtweg-epitheel, gladde spiercel)', en: 'human (e.g. airway epithelium, smooth muscle cell)' },
  legend: [[ADRC, 'adrenaline'], [C.prot, { nl: 'β2-adrenerge receptor · PKA: actief deel (C)', en: 'β2-adrenergic receptor · PKA: active part (C)' }], [GAC, 'Gαs'], [GBC, 'Gβγ'], [GTPC, 'GTP · GDP · ATP · cAMP'],
    [ACC, { nl: 'adenylylcyclase', en: 'adenylyl cyclase' }], [RC, { nl: 'PKA: rem (R)', en: 'PKA: brake (R)' }], [CREBC, 'CREB'], [CBPC, 'CBP/p300'], ['#ff6b6b', { nl: 'fosfaat (P)', en: 'phosphate (P)' }], [C.dna, 'DNA'], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: β2-adrenerge receptor met Gs, PDB <a href="https://www.rcsb.org/structure/3SN6" target="_blank" rel="noopener">3SN6</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: β2-adrenergic receptor with Gs, PDB <a href="https://www.rcsb.org/structure/3SN6" target="_blank" rel="noopener">3SN6</a>.</p>' },
  simplified: {
    nl: 'De receptor is getekend als 7 staafjes; adenylylcyclase is getekend met 12 staafjes (TM-helices) en twee katalytische domeinen. Gβγ geeft zelf ook signalen door (niet getoond). Dat Gαs volledig loskomt van Gβγ is het klassieke model; recenter werk toont dat ze soms eerder herschikken dan echt scheiden. PKA zit in cellen vaak via AKAP-eiwitten op een vaste plek en de C-subeenheden laten in werkelijkheid niet altijd volledig los. We tonen één C-subeenheid die de kern in gaat en één CREB-dimeer; CREB wordt ook door andere kinasen gefosforyleerd. Desensitisatie van de receptor (GRK, β-arrestine) is weggelaten. Moleculen zijn niet op schaal. Het plasmamembraan staat dikker getekend dan de twee kernmembranen, zodat de receptoren erin passen; in werkelijkheid zijn alle drie even dik (≈ 4–5 nm).',
    en: 'The receptor is drawn as 7 rods; adenylyl cyclase is drawn with 12 rods (TM helices) and two catalytic domains. Gβγ also relays signals itself (not shown). Gαs fully separating from Gβγ is the classic model; more recent work shows they sometimes rearrange rather than truly separate. In cells PKA is often anchored at fixed sites by AKAP proteins, and the C subunits do not always fully dissociate. We show one C subunit entering the nucleus and one CREB dimer; CREB is also phosphorylated by other kinases. Receptor desensitisation (GRK, β-arrestin) is left out. Molecules are not to scale. The plasma membrane is drawn thicker than the two nuclear membranes so that the receptors fit; in reality all three are equally thick (≈ 4–5 nm).' },
  parts: [
    { c: C.muted, t: { nl: 'buiten de cel', en: 'outside the cell' }, m: ['cytosol'], d: { nl: 'Boven het celmembraan is het buiten de cel; tussen celmembraan en kern ligt het celvocht (cytosol).', en: 'Above the cell membrane is outside the cell; between the cell membrane and the nucleus lies the cell fluid (cytosol).' },
      p: { nl: 'Extracellulaire ruimte, cytosol en (onderaan) nucleoplasma.', en: 'Extracellular space, cytosol and (bottom) nucleoplasm.' } },
    { c: C.mem, t: { nl: 'celmembraan', en: 'cell membrane' }, d: { nl: 'De rand van de cel: twee lagen vet. De ontvanger en het enzym zitten erin vast.', en: 'The edge of the cell: two layers of fat. The receptor and the enzyme are embedded in it.' },
      p: { nl: 'Plasmamembraan (lipidendubbellaag) met integrale en lipide-verankerde signaaleiwitten.', en: 'Plasma membrane (lipid bilayer) with integral and lipid-anchored signalling proteins.' } },
    { c: ADRC, t: 'adrenaline', d: { nl: 'Een hormoon (geel) dat buiten de cel aankomt en het signaal brengt.', en: 'A hormone (yellow) that arrives outside the cell and brings the signal.' },
      p: { nl: 'Catecholamine-agonist van de β2-adrenerge receptor.', en: 'Catecholamine agonist of the β2-adrenergic receptor.' } },
    { c: C.prot, t: { nl: 'β2-adrenerge receptor', en: 'β2-adrenergic receptor' }, m: ['7 TM-helices', '7 TM helices', 'helix 6 zwaait uit', 'helix 6 swings out'], d: { nl: 'De ontvanger van adrenaline. Hij steekt 7 keer door het vlies; als adrenaline bindt, verandert zijn binnenkant van vorm.', en: 'The receptor for adrenaline. It crosses the membrane 7 times; when adrenaline binds, its inner side changes shape.' },
      p: { nl: 'Klasse A-GPCR met zeven transmembraanhelices; agonistbinding laat TM6 naar buiten zwaaien en opent de bindingsplaats voor Gs.', en: 'Class A GPCR with seven transmembrane helices; agonist binding swings TM6 outward and opens the binding site for Gs.' } },
    { c: GAC, t: 'Gs (αβγ)', m: ['G-eiwit zet zichzelf uit (GTP → GDP)', 'G protein switches itself off (GTP → GDP)'], d: { nl: 'Het schakelaar-eiwit (G-eiwit) onder de ontvanger, uit drie delen. Na het signaal zet het zichzelf weer uit.', en: 'The switch protein (G protein) under the receptor, made of three parts. After the signal it switches itself off again.' },
      p: { nl: 'Heterotrimeer stimulerend G-eiwit; de intrinsieke GTPase-activiteit van Gα beëindigt het signaal.', en: 'Heterotrimeric stimulatory G protein; the intrinsic GTPase activity of Gα terminates the signal.' } },
    { c: GAC, t: 'Gαs', m: ['Gαs·GTP'], d: { nl: 'Het actieve deel van het G-eiwit. Met GTP erop schuift het langs het vlies naar het enzym en zet het aan.', en: 'The active part of the G protein. With GTP on board it slides along the membrane to the enzyme and switches it on.' },
      p: { nl: 'Gαs·GTP dissocieert van Gβγ en activeert adenylylcyclase; het blijft via een vetzuuranker aan het membraan.', en: 'Gαs·GTP dissociates from Gβγ and activates adenylyl cyclase; it stays membrane-bound via a fatty-acid anchor.' } },
    { c: GBC, t: 'Gβγ', m: ['βγ'], d: { nl: 'De andere twee delen van het G-eiwit. Ze blijven aan het vlies hangen als het actieve deel vertrekt.', en: 'The other two parts of the G protein. They stay attached to the membrane when the active part leaves.' },
      p: { nl: 'Gβγ-dimeer, prenylverankerd; kan zelf ook effectoren reguleren (niet getoond).', en: 'Gβγ dimer, prenyl-anchored; can itself also regulate effectors (not shown).' } },
    { c: GTPC, t: 'GTP', m: ['GDP', 'GDP eruit, GTP erin', 'GDP out, GTP in'], d: { nl: 'Kleine moleculen die de schakelaar bedienen: met GDP staat het G-eiwit uit, met GTP staat het aan.', en: 'Small molecules that operate the switch: with GDP the G protein is off, with GTP it is on.' },
      p: { nl: 'De receptor werkt als GEF: hij katalyseert de uitwisseling van GDP voor GTP op Gα.', en: 'The receptor acts as a GEF: it catalyses the exchange of GDP for GTP on Gα.' } },
    { c: ACC, t: { nl: 'adenylylcyclase', en: 'adenylyl cyclase' }, d: { nl: 'Een enzym in het vlies (lichtpaars, 12 staafjes). Aangezet maakt het veel kleine boodschappers (cAMP).', en: 'An enzyme in the membrane (light purple, 12 rods). Once switched on it makes many small messengers (cAMP).' },
      p: { nl: 'Transmembraan-adenylylcyclase (2 × 6 TM-helices); de cytosolische domeinen C1 en C2 vormen samen het katalytische centrum.', en: 'Transmembrane adenylyl cyclase (2 × 6 TM helices); the cytosolic domains C1 and C2 together form the catalytic centre.' } },
    { c: GTPC, t: 'ATP', m: ['ATP → cAMP'], d: { nl: 'De grondstof: het enzym zet ATP om in cAMP.', en: 'The raw material: the enzyme converts ATP into cAMP.' },
      p: { nl: 'Substraat van adenylylcyclase; cyclisering geeft cAMP + pyrofosfaat.', en: 'Substrate of adenylyl cyclase; cyclisation yields cAMP + pyrophosphate.' } },
    { c: GTPC, t: 'cAMP', m: ['cAMP: tweede boodschapper', 'cAMP: second messenger', 'cAMP bindt op de rem', 'cAMP binds the brake'], d: { nl: 'Kleine boodschapper (blauwgroene bolletjes) die het signaal snel door de cel verspreidt en de rem van een enzym losmaakt.', en: 'Small messenger (blue-green dots) that quickly spreads the signal through the cell and releases the brake of an enzyme.' },
      p: { nl: 'Cyclisch AMP, tweede boodschapper; bindt (2 per R-subeenheid) de regulatorische subeenheden van PKA.', en: 'Cyclic AMP, second messenger; binds (2 per R subunit) the regulatory subunits of PKA.' } },
    { c: C.text, t: { nl: 'kinase (PKA)', en: 'kinase (PKA)' }, d: { nl: 'Een enzym dat fosfaatgroepjes op andere eiwitten zet. Het bestaat uit twee remdelen en twee actieve delen.', en: 'An enzyme that puts phosphate groups on other proteins. It consists of two brake parts and two active parts.' },
      p: { nl: 'Proteïnekinase A, inactief tetrameer R₂C₂.', en: 'Protein kinase A, inactive R₂C₂ tetramer.' } },
    { c: RC, t: { nl: 'rem', en: 'brake' }, d: { nl: 'De grijze remdelen van het kinase. Zolang er geen cAMP op zit, houden ze de actieve delen vast.', en: 'The grey brake parts of the kinase. As long as no cAMP is bound, they hold on to the active parts.' },
      p: { nl: 'Regulatorische (R-)subeenheden; cAMP-binding vermindert hun affiniteit voor C.', en: 'Regulatory (R) subunits; cAMP binding lowers their affinity for C.' } },
    { c: C.prot, t: { nl: 'actief', en: 'active' }, m: ['actief deel komt los', 'active part comes free'], d: { nl: 'De actieve delen van het kinase. Los van de rem kunnen ze fosfaat op eiwitten zetten; één gaat de kern in.', en: 'The active parts of the kinase. Free from the brake they can put phosphate on proteins; one enters the nucleus.' },
      p: { nl: 'Katalytische (C-)subeenheden; vrijgekomen C kan de kern binnendiffunderen.', en: 'Catalytic (C) subunits; released C can diffuse into the nucleus.' } },
    { c: '#9cc0ff', t: { nl: 'celkern', en: 'nucleus' }, m: ['kernporie', 'nuclear pore'], d: { nl: 'De kern met het DNA, omgeven door een dubbel vlies met poortjes (kernporiën).', en: 'The nucleus with the DNA, surrounded by a double membrane with gates (nuclear pores).' },
      p: { nl: 'Kernenvelop met kernporiecomplexen.', en: 'Nuclear envelope with nuclear pore complexes.' } },
    { c: CREBC, t: { nl: 'gen-schakelaar (CREB)', en: 'gene switch (CREB)' }, d: { nl: 'Een eiwit dat al op het DNA zit en een gen kan aanzetten, maar pas als er een fosfaatgroepje op staat.', en: 'A protein that already sits on the DNA and can switch a gene on, but only once a phosphate group is attached.' },
      p: { nl: 'CREB, een bZIP-transcriptiefactor die als dimeer het CRE bindt; activatie door fosforylering van Ser133.', en: 'CREB, a bZIP transcription factor that binds the CRE as a dimer; activated by phosphorylation of Ser133.' } },
    { c: '#ff9f43', t: { nl: 'fosfaat', en: 'phosphate' }, m: ['P'], d: { nl: 'Het oranje groepje P dat het kinase op de gen-schakelaar zet. Daarmee gaat de schakelaar aan.', en: 'The orange P group that the kinase puts on the gene switch. This turns the switch on.' },
      p: { nl: 'Fosfoserine 133 op CREB, gezet door PKA; nodig voor binding van CBP/p300.', en: 'Phosphoserine 133 on CREB, added by PKA; required for CBP/p300 binding.' } },
    { c: '#cfe0ff', t: { nl: 'bindplaats (CRE)', en: 'binding site (CRE)' }, m: ['TGACGTCA'], d: { nl: 'Het korte stukje DNA (letters TGACGTCA) waar de gen-schakelaar op zit.', en: 'The short piece of DNA (letters TGACGTCA) where the gene switch sits.' },
      p: { nl: 'cAMP-responselement, palindroom consensus TGACGTCA.', en: 'cAMP response element, palindromic consensus TGACGTCA.' } },
    { c: CBPC, t: { nl: 'helper (CBP)', en: 'helper (CBP)' }, d: { nl: 'Een helper die door de aangezette schakelaar wordt aangetrokken en het DNA bereikbaarder maakt.', en: 'A helper attracted by the switched-on gene switch that makes the DNA easier to reach.' },
      p: { nl: 'Co-activator CBP/p300 met histonacetyltransferase-activiteit; bindt fosfo-CREB via het KIX-domein.', en: 'Co-activator CBP/p300 with histone acetyltransferase activity; binds phospho-CREB via its KIX domain.' } },
    { c: C.dna, t: { nl: 'doelgen', en: 'target gene' }, d: { nl: 'De blauwe dubbele draad is het DNA; het oplichtende stuk is het gen dat nu aangaat.', en: 'The blue double thread is the DNA; the lit-up piece is the gene that now switches on.' },
      p: { nl: 'CRE-gestuurd doelgen dat na CREB-activatie getranscribeerd wordt.', en: 'CRE-driven target gene transcribed after CREB activation.' } },
    { c: C.prot, t: 'Pol II', d: { nl: 'Het kopieerenzym dat het gen afleest en er een RNA-kopie van maakt.', en: 'The copying enzyme that reads the gene and makes an RNA copy of it.' },
      p: { nl: 'RNA-polymerase II, transcribeert het doelgen.', en: 'RNA polymerase II, transcribing the target gene.' } },
    { c: C.rna, t: 'mRNA', d: { nl: 'De oranje draad: de kopie van het gen, met het bouwplan voor een eiwit.', en: 'The orange thread: the copy of the gene, with the building plan for a protein.' },
      p: { nl: 'Transcript van het doelgen.', en: 'Transcript of the target gene.' } },
    { c: '#ff9d5c', t: 'PDE', m: ['afbraakenzym breekt cAMP af', 'breakdown enzyme destroys cAMP'], d: { nl: 'Een opruim-enzym dat cAMP afbreekt. Zo dooft het signaal weer uit.', en: 'A clean-up enzyme that breaks down cAMP. This makes the signal fade again.' },
      p: { nl: 'Fosfodiësterase: hydrolyseert cAMP tot 5′-AMP.', en: 'Phosphodiesterase: hydrolyses cAMP to 5′-AMP.' } },
  ],
  steps: [
    ST(7000, cam(520, 330, 1000), 'Adrenaline komt aan', 'Adrenaline arrives',
      'Het hormoon adrenaline nadert zijn receptor. Eronder wacht een schakelaar-eiwit (G-eiwit), nog uit.',
      'The hormone adrenaline approaches its receptor. Below it waits a switch protein (G protein), still off.'),
    ST(7500, cam(420, 300, 900), 'De receptor verandert van vorm', 'The receptor changes shape',
      'De receptor kronkelt 7 keer door het membraan. Als adrenaline bindt, verandert de binnenkant van vorm.',
      'The receptor winds through the membrane 7 times. When adrenaline binds, its inner side changes shape.'),
    ST(8000, cam(470, 350, 900), 'Het G-eiwit gaat aan', 'The G protein switches on',
      'De receptor laat het G-eiwit GDP lossen en GTP binden. Met GTP erop staat de schakelaar aan.',
      'The receptor makes the G protein release GDP and bind GTP. With GTP on board, the switch is on.'),
    ST(7500, cam(612, 400, 1000), 'Een deel schuift naar een enzym', 'One part moves to an enzyme',
      'Het actieve deel van het G-eiwit laat de rest los en schuift langs het membraan naar een enzym.',
      'The active part of the G protein leaves the rest and slides along the membrane to an enzyme.'),
    ST(8000, cam(860, 430, 1000), 'Het enzym maakt cAMP', 'The enzyme makes cAMP',
      'Dat enzym maakt van ATP het kleine molecuul cAMP. Dat verspreidt het signaal snel door de cel.',
      'That enzyme turns ATP into the small molecule cAMP, which quickly spreads the signal through the cell.'),
    ST(8000, cam(1060, 500, 1000), 'cAMP maakt een enzym vrij', 'cAMP frees an enzyme',
      'cAMP bindt de remmende delen van een kinase (een enzym dat fosfaat op eiwitten zet). De actieve delen komen los.',
      'cAMP binds the inhibitory parts of a kinase (an enzyme that puts phosphate on proteins). The active parts come free.'),
    ST(8500, cam(1150, 720, 1000), 'Het kinase gaat de kern in', 'The kinase enters the nucleus',
      'Een actief deel gaat de kern in en zet een fosfaat op een gen-schakelaar die op het DNA zit.',
      'An active part enters the nucleus and puts a phosphate on a gene switch that sits on the DNA.'),
    ST(8500, cam(1270, 740, 950), 'Het gen gaat aan', 'The gene switches on',
      'Met dat fosfaat haalt de schakelaar een helper erbij, die het DNA bereikbaarder maakt. Zo wordt het gen afgelezen.',
      'With that phosphate, the switch recruits a helper that makes the DNA easier to reach. So the gene is read.'),
    ST(9000, cam(800, 475, 1600), 'Het signaal dooft uit', 'The signal fades',
      'Het G-eiwit zet zichzelf weer uit en andere enzymen breken cAMP af. Zo dooft het signaal uit.',
      'The G protein switches itself off and other enzymes break down cAMP. So the signal fades.'),
  ],

  svg() {
    /* adenylylcyclase: 2 × 6 TM-helices, elk gevolgd door een cytosolisch domein (C1, C2) (topologie: Krupinski et al., Science 1989;244:1558);
     * C1 en C2 vormen samen het katalytische centrum (Tesmer et al., Science 1997) */
    const ac = [741, 750.5, 760, 769.5, 779, 788.5, 811.5, 821, 830.5, 840, 849.5, 859].map(x => tmHelix(x, MY - 12, MY + MH + 12, ACC, .85, 8)).join('') +
      `<path d="M770,${MY + MH + 10} L775,${MY + MH + 22} M832,${MY + MH + 10} L830,${MY + MH + 24}" stroke="${ACC}" stroke-width="5"/>` +
      eiwit(775, MY + MH + 44, 32, 26, ACC, { seed: 41 }) + eiwit(830, MY + MH + 48, 30, 26, ACC, { seed: 42 });
    return svgOpen() + `
      <rect x="-600" y="-600" width="2800" height="${MY + 610}" fill="#0b1226"/>
      <rect x="-600" y="${MY + MH - 4}" width="2800" height="${NY - MY - MH + 8}" fill="url(#gCyto)"/>
      <rect x="-600" y="${NY + 14}" width="2800" height="900" fill="url(#gNuc)"/>
      ${bilayer(-600, 2200, MY, { h: MH, skip: [[RX - 75, RX + 75], [733, 867]] })}
      ${nucEnv(-600, 2200, NY, [640, PORE, 1500])}
      <g id="gp-gene"></g>
      ${hot('dnahelix', C.dna, dna(-600, 2200, DY))}
      ${T(40, 72, T2('buiten de cel', 'outside the cell'), { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(125, 420, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(700, 752, T2('celkern', 'nucleus'), { size: 24, col: '#9cc0ff', anchor: 'start', w: 500 })}
      <g id="gp-ac">${ac}</g>
      <g id="gp-rec"></g>
      <g id="gp-g"></g>
      <g id="gp-camp"></g>
      <g id="gp-pka"></g>
      <g id="gp-campR"></g>
      <g id="gp-nuc"></g>
      <g id="gp-lab"></g>
      <g id="gp-hot" opacity="0">
        <g data-node="srf" data-color="${C.dna}" data-label="${T2('Vergelijk: EGF-route (SRE)', 'Compare: EGF route (SRE)')}">
          <rect x="700" y="${DY - 30}" width="330" height="70" fill="transparent"/>${anchor('srf', 960, DY - 82)}</g>
        <g data-node="genregulatie" data-color="${CBPC}" data-label="${T2('Genregulatie', 'Gene regulation')}">
          <rect x="1120" y="${NY + 20}" width="260" height="${DY - NY}" fill="transparent"/>${anchor('genregulatie', CRX + 8, DY + 76, 'below')}</g>
      </g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const g = s.step + s.p, tt = t / 1000;
        const wob = (k, a = 4) => Math.sin(tt * .9 + k) * a;

        /* ---------- receptor + adrenaline ---------- */
        const act = K(g, 1.5, 1.9) * (1 - K(g, 8.45, 8.8));
        const ad = track(g, [[0, 250, 70, 1.3], [.85, 350, 175, 1.3], [1.1, 350, 175, 1.3], [1.5, RX, 280, 1.05], [8.3, RX, 280, 1.05], [8.75, 260, 120, 1.3]]);
        $('gp-rec').innerHTML = gpcr7(RX, MY, MH, 8 * act) + adr(ad[0], ad[1] + (g < 1.1 || g > 8.7 ? wob(1) : 0), ad[2]);

        /* ---------- G-eiwit ---------- */
        const dock = K(g, 2.05, 2.4);
        const dx = -130 * dock;
        const bx = 635 + dx, by = 395;                                      // Gβ
        const ga = track(g, [[2.05, 560, 385], [2.4, 430, 390], [3.1, 430, 390], [3.6, 724, 400], [8.35, 724, 400], [8.85, 430, 390]]);
        // nucleotide in Gα: GDP → GTP → (8.1) GDP
        const hyd = K(g, 8.1, 8.3);
        /* Gα (vetzuuranker) en Gβγ (prenylanker) blijven allebei aan het binnenblad van het membraan; Gα schuift achter Gβγ langs */
        // vetzuuranker van Gα in het binnenblad náást de helixbundel van de receptor (en links van het adenylylcyclase)
        let G = gAlpha(ga[0], ga[1], MY + MH, { lab: 'Gαs', ax: lerp(28, -22, clamp((ga[0] - 430) / 294)) }) + gBG(bx, by, MY + MH);
        const isGTP = g >= 2.6 && g < 8.2;
        if (!isGTP || g < 2.6) {
          // GDP (begin) of GDP die vertrekt
          const q = track(g, [[2.45, ga[0], ga[1] + 16], [2.75, 300, 540]]);
          if (g < 2.75) G += tag(g < 2.45 ? ga[0] : q[0], g < 2.45 ? ga[1] + 16 : q[1], 'GDP', GTPC, { fs: 17, op: 1 - K(g, 2.6, 2.75) });
        }
        if (g >= 2.6 && g < 8.2) {
          const q = track(g, [[2.6, 250, 590], [2.95, ga[0], ga[1] + 16]]);
          G += tag(g < 2.95 ? q[0] : ga[0], g < 2.95 ? q[1] : ga[1] + 16, 'GTP', GTPC, { fs: 17, op: K(g, 2.6, 2.7) });
        }
        if (g >= 8.2) G += tag(ga[0], ga[1] + 16, 'GDP', GTPC, { fs: 17 }) + (hyd < 1 ? `<circle cx="${f1(ga[0])}" cy="${f1(ga[1] + 16)}" r="${f1(20 + 40 * hyd)}" fill="none" stroke="${GTPC}" stroke-width="3" opacity="${f1(1 - hyd)}"/>` : '');
        $('gp-g').innerHTML = G;

        /* ---------- cAMP ---------- */
        let A = '', AR = '';
        const nMade = Math.floor(18 * K(g, 4.1, 4.9) + .001);
        const pde = K(g, 8.1, 8.3), deg = K(g, 8.3, 8.85);
        // ATP-pilletjes die binnenkomen (stap 4)
        if (g > 4.05 && g < 4.95) {
          for (let i = 0; i < 4; i++) {
            const g0 = 4.08 + i * .2, k = K(g, g0, g0 + .16);
            if (g >= g0 && g < g0 + .16) A += tag(930 - 125 * k, 590 - 175 * k, 'ATP', GTPC, { fs: 14, op: 1 - K(g, g0 + .12, g0 + .16) });
          }
        }
        CLOUD.forEach(([x, y], i) => {
          if (i >= nMade && g < 4.9) return;
          const born = 4.1 + (i / 18) * .8, kb = K(g, born, born + .1);
          let px = 805 + (x - 805) * kb, py = 420 + (y - 420) * kb;
          px += Math.sin(tt * 1.1 + i) * 3; py += Math.cos(tt * .9 + i * 1.7) * 3;
          if (i < 4) {                                     // deze vier binden aan R (2 per R); boven PKA getekend
            const kr = K(g, 5.05 + i * .06, 5.3 + i * .06);
            px = px + (RSITE[i][0] - px) * kr; py = py + (RSITE[i][1] - py) * kr;
            AR += cAMP(px, py, 1 - K(g, 8.5, 8.85), 10);
            return;
          }
          const col = deg > .5 ? AMPC : GTPC;
          A += cAMP(px, py, 1 - K(g, 8.4 + (i % 5) * .08, 8.6 + (i % 5) * .08), 10, col);
        });
        if (pde > .01) A += `<g opacity="${f1(pde)}">${eiwit(940, 585, 40, 28, '#ff9d5c', { seed: 43 })}` +
          `<text x="940" y="592" font-size="18" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">PDE</text></g>`;
        $('gp-camp').innerHTML = A;
        $('gp-campR').innerHTML = AR;

        /* ---------- PKA ---------- */
        let P = '';
        const rel = K(g, 5.4, 5.85);
        P += eiwit(PKX - 15, PKY, 17, 44, RC, { seed: 44, bumps: .16 }) + eiwit(PKX + 15, PKY, 17, 44, RC, { seed: 47, bumps: .16 });
        P += `<text x="${PKX}" y="${PKY + 70}" font-size="20" text-anchor="middle" fill="${RC}" font-family="Inter" font-weight="700">${T2('rem', 'brake')}</text>`;
        const c1 = track(g, [[5.4, PKX - 58, PKY], [5.85, PORE + 10, 600], [6.05, PORE + 10, 600], [6.25, PORE, NY], [6.5, CRX - 82, DY - 72]]);   // links naast CREB: niet onder de helper (CBP)
        const c2 = track(g, [[5.4, PKX + 58, PKY], [5.85, PKX + 130, 590]]);
        for (const [x, y] of [c1, c2]) P += eiwit(x, y, 31, 26, C.prot, { seed: 46 }) + `<text x="${f1(x)}" y="${f1(y + 6)}" font-size="16" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">${T2('actief', 'active')}</text>`;
        if (rel > .02 && rel < .98) P += `<circle cx="${PKX}" cy="${PKY}" r="${f1(40 + 50 * rel)}" fill="none" stroke="${GTPC}" stroke-width="3" opacity="${f1(1 - rel)}"/>`;
        $('gp-pka').innerHTML = P;

        /* ---------- kern: CREB, CBP, Pol II ---------- */
        let N = '';
        const pS = K(g, 6.55, 6.72) * (1 - K(g, 8.5, 8.8));
        N += `<g>${eiwit(CRX - 22, DY - 38, 24, 22, CREBC, { seed: 47 })}${eiwit(CRX + 22, DY - 38, 24, 22, CREBC, { seed: 48 })}` +
          `<path d="M${CRX - 14},${DY - 18} l-6,26 M${CRX + 14},${DY - 18} l6,26" stroke="${CREBC}" stroke-width="6" stroke-linecap="round"/></g>`;
        N += phos(CRX - 40, DY - 58, 15, pS);
        /* CBP/p300 is een kerneiwit: verschijnt in het nucleoplasma en gaat daar ook weer weg */
        const cbp = track(g, [[7.05, 1400, 750, 0], [7.4, CRX + 8, DY - 112, 1], [8.55, CRX + 8, DY - 112, 1], [8.9, 1400, 750, 0]]);
        if (cbp[2] > .01) N += eiwit(cbp[0], cbp[1], 62, 34, CBPC, { seed: 49, op: cbp[2] });
        const pol = K(g, 7.3, 7.5) * (1 - K(g, 8.55, 8.9));
        if (pol > .01) N += polII(1335, DY, 56, 24, { op: pol, gul: 12, hoog: 2.4, vul: .4, achter: .5, uit: 1.2, seed: 50, label: 'Pol II', fs: 21, labelY: -26 });   // app-vorm (bio.js): DNA door de geul
        N += mrna(1318, DY - 54, K(g, 7.5, 7.95), 170);   // RNA verlaat Pol II bovenaan aan de achterkant (stroomopwaarts)
        // CRE-sequentie
        N += `<text x="${CRX}" y="${DY + 48}" font-size="24" text-anchor="middle" fill="#cfe0ff" font-family="JetBrains Mono" font-weight="700" letter-spacing="2">TGACGTCA</text>`;
        $('gp-nuc').innerHTML = N;
        const gk = K(g, 7.4, 7.7);
        $('gp-gene').innerHTML = gk > .01 ? `<rect x="1300" y="${DY - 26}" width="300" height="52" rx="12" fill="#fff" opacity="${f1(.1 * gk)}"/>` : '';

        /* ---------- labels ---------- */
        let L = '';
        const on = (a, b, c, d) => K(g, a, b) * (1 - K(g, c, d));
        let k = on(.2, .6, 1.05, 1.25);
        if (k > .01) L += T(420, 160, 'adrenaline', { size: 24, col: ADRC, op: k, anchor: 'start' }) +
          T(RX - 86, 214, T2('β2-adrenerge receptor', 'β2-adrenergic receptor'), { size: 22, col: C.prot, op: k, anchor: 'end' }) +
          T(600, 470, 'Gs (αβγ)', { size: 24, col: GAC, op: k });
        k = on(1.25, 1.55, 2.02, 2.2);
        if (k > .01) L += T(RX - 95, 250, T2('7 TM-helices', '7 TM helices'), { size: 22, col: C.prot, op: k, anchor: 'end' }) +
          T(RX + 150, 470, T2('helix 6 zwaait uit', 'helix 6 swings out'), { size: 22, col: C.text, op: k * K(g, 1.7, 1.9), anchor: 'start' });
        k = on(2.2, 2.5, 3.02, 3.2);
        if (k > .01) L += T(300, 570, T2('GDP eruit, GTP erin', 'GDP out, GTP in'), { size: 22, col: GTPC, op: k * K(g, 2.6, 2.9) });
        k = on(3.2, 3.55, 4.02, 4.2);
        if (k > .01) L += T(705, 478, 'Gαs·GTP', { size: 22, col: GAC, op: k * K(g, 3.5, 3.65) }) + T(505, 470, 'Gβγ', { size: 22, col: GBC, op: k }) +
          T(ACX, 196, T2('adenylylcyclase', 'adenylyl cyclase'), { size: 22, col: ACC, op: k });
        k = on(4.2, 4.5, 5.02, 5.2);
        if (k > .01) L += T(700, 560, 'ATP → cAMP', { size: 22, col: GTPC, op: k }) +
          T(990, 620, T2('cAMP: tweede boodschapper', 'cAMP: second messenger'), { size: 22, col: C.text, op: k * K(g, 4.6, 4.9) });
        k = on(5.1, 5.4, 6.0, 6.04);
        if (k > .01) L += T(PKX, 440, T2('kinase (PKA)', 'kinase (PKA)'), { size: 22, col: C.text, op: k }) +
          T(PKX + 130, 640, T2('actief deel komt los', 'active part comes free'), { size: 22, col: C.prot, op: k * K(g, 5.7, 5.85) }) +
          T(PKX - 110, 380, T2('cAMP bindt op de rem', 'cAMP binds the brake'), { size: 22, col: GTPC, op: k * K(g, 5.2, 5.35) });
        k = on(6.2, 6.5, 7.02, 7.2);
        if (k > .01) L += T(PORE - 70, NY - 22, T2('kernporie', 'nuclear pore'), { size: 22, col: C.prot, op: k, anchor: 'end' }) +
          T(CRX + 60, DY - 70, T2('gen-schakelaar (CREB)', 'gene switch (CREB)'), { size: 22, col: CREBC, op: k, anchor: 'start' }) +
          T(CRX - 95, DY - 52, T2('fosfaat', 'phosphate'), { size: 22, col: '#ff8f8f', op: k * K(g, 6.6, 6.75), anchor: 'end' }) +
          T(CRX, DY + 80, T2('bindplaats (CRE)', 'binding site (CRE)'), { size: 22, col: '#cfe0ff', op: k });
        k = on(7.2, 7.5, 8.02, 8.2);
        if (k > .01) L += T(CRX + 80, DY - 128, T2('helper (CBP)', 'helper (CBP)'), { size: 22, col: CBPC, op: k, anchor: 'start' }) +
          T(1480, DY + 58, T2('doelgen', 'target gene'), { size: 22, col: C.text, op: k * K(g, 7.4, 7.6) }) +
          T(1522, DY - 62, 'mRNA', { size: 22, col: C.rna, op: k * K(g, 7.7, 7.95) });
        k = on(8.1, 8.35, 9.5, 9.6);
        if (k > .01) L += T(560, 560, T2('G-eiwit zet zichzelf uit (GTP → GDP)', 'G protein switches itself off (GTP → GDP)'), { size: 25, col: GAC, op: k }) +
          T(940, 452, T2('afbraakenzym breekt cAMP af', 'breakdown enzyme destroys cAMP'), { size: 25, col: '#ff9d5c', op: k * K(g, 8.2, 8.45) });
        $('gp-lab').innerHTML = L;
        $('gp-hot').setAttribute('opacity', f1(K(g, 6.0, 6.3)));
      },
    };
  },
};
