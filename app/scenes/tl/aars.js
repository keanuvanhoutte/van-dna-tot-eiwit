/*
 * Aminoacyl-tRNA-synthetasen — IleRS als voorbeeld: activering (aa + ATP → aa-AMP + PPi), overdracht op A76,
 * klasse I vs II, en proeflezen volgens de "dubbele zeef" (Val wordt in de editeerplaats gehydrolyseerd).
 */
import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';
import { eiwit, trna2d, helixLint, strengPijl } from '../../bio.js';

/* editeerplaats: ongeveer even ver van het anticodon als de synthese-plaats en ~3 nm ernaast (in IleRS verschuift enkel het
   CCA-uiteinde van de ene holte naar de andere; het anticodon blijft vast) */
const SYN = [812, 432], EDIT = [930, 520], ACD = [612, 770];      // synthese-plaats, editeerplaats (CP1), anticodonbindend domein
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const E2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

export default {
  id: 'aars',
  title: { nl: 'Aminoacyl-tRNA-synthetase', en: 'Aminoacyl-tRNA synthetase' },
  scale: '≈ 10 nm', time: { nl: 'snel (hier sterk vertraagd)', en: 'fast (strongly slowed down here)' },
  org: { nl: 'alle levensvormen (hier IleRS)', en: 'all domains of life (here IleRS)' },
  legend: [[C.prot, { nl: 'synthetase (IleRS)', en: 'synthetase (IleRS)' }], [C.trna, 'tRNA-Ile'], ['#5fd3e6', 'ATP / AMP / PPi'], ['#7fdc6a', { nl: 'hydrofoob aminozuur', en: 'hydrophobic amino acid' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Proef (Chapeville e.a., 1962): Cys-tRNA-Cys werd chemisch omgezet in Ala-tRNA-Cys; daarna verscheen Ala op Cys-codons. Het ribosoom controleert dus het anticodon, niet het aminozuur.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Experiment (Chapeville et al., 1962): Cys-tRNA-Cys was chemically converted into Ala-tRNA-Cys; Ala then appeared at Cys codons. So the ribosome checks the anticodon, not the amino acid.</p>' },
  simplified: {
    nl: 'Het enzym is schematisch getekend als enkele domeinen (katalytisch domein, editeerdomein CP1, anticodonbindend domein; echte IleRS: ≈ 900–1300 aminozuren; PDB 1FFY = IleRS van S. aureus, 917 aminozuren). Het tRNA is getekend als vereenvoudigd klaverblad; in 3D is het L-vormig. Proeflezen gebeurt zowel vóór (aa-AMP) als na de overdracht (aa-tRNA); hier tonen we de post-transfer-route. Klasse-I-enzymen laden meestal de 2′-OH, klasse II de 3′-OH (uitzondering: PheRS, klasse II, 2′-OH).',
    en: 'The enzyme is drawn schematically as a few domains (catalytic domain, CP1 editing domain, anticodon-binding domain; real IleRS: ≈ 900–1300 amino acids; PDB 1FFY = S. aureus IleRS, 917 amino acids). The tRNA is drawn as a simplified cloverleaf; in 3D it is L-shaped. Editing happens both before (aa-AMP) and after transfer (aa-tRNA); here we show the post-transfer route. Class I enzymes usually charge the 2′-OH, class II the 3′-OH (exception: PheRS, class II, 2′-OH).' },
  parts: [
    { c: C.prot, t: 'IleRS', d: { nl: 'Het enzym dat het aminozuur isoleucine aan zijn eigen tRNA hangt. Elk aminozuur heeft zo’n eigen enzym.', en: 'The enzyme that attaches the amino acid isoleucine to its own tRNA. Each amino acid has such an enzyme of its own.' },
      p: { nl: 'Isoleucyl-tRNA-synthetase, een klasse I-aminoacyl-tRNA-synthetase met katalytisch Rossmann-domein, editeerdomein CP1 en anticodonbindend domein.', en: 'Isoleucyl-tRNA synthetase, a class I aminoacyl-tRNA synthetase with a catalytic Rossmann domain, CP1 editing domain and anticodon-binding domain.' } },
    { c: '#7fdc6a', t: { nl: 'aminozuren', en: 'amino acids' }, m: ['Ala', 'Arg', 'Asn', 'Asp', 'Cys', 'Gln', 'Glu', 'Gly', 'His', 'Lys', 'Met', 'Pro', 'Ser', 'Thr', 'Trp', 'Tyr', '20 aminozuren → ≈ 20 synthetasen', '20 amino acids → ≈ 20 synthetases'], d: { nl: 'De 20 bouwstenen van eiwitten. Voor bijna elk is er één eigen laad-enzym.', en: 'The 20 building blocks of proteins. For almost each one there is its own loading enzyme.' },
      p: { nl: 'De 20 proteïnogene aminozuren; meestal één aaRS per aminozuur (uitzonderingen o.a. LysRS van klasse I en II, indirecte routes voor Gln/Asn bij sommige organismen).', en: 'The 20 proteinogenic amino acids; usually one aaRS per amino acid (exceptions include class I and class II LysRS and indirect routes for Gln/Asn in some organisms).' } },
    { c: '#7fdc6a', t: 'Ile', m: ['isoleucine → past', 'isoleucine → fits', 'isoleucine is te groot → blijft', 'isoleucine is too big → stays'], d: { nl: 'Isoleucine: het juiste aminozuur voor dit enzym. Het past in de laadplaats, maar is te groot voor de naleesplaats en blijft dus zitten.', en: 'Isoleucine: the right amino acid for this enzyme. It fits the loading site, but is too big for the checking site, so it stays on.' },
      p: { nl: 'L-isoleucine, het cognate substraat van IleRS.', en: 'L-isoleucine, the cognate substrate of IleRS.' } },
    { c: '#7fdc6a', t: 'Val', m: ['valine op dit tRNA: fout!', 'valine on this tRNA: wrong!', 'valine (iets kleiner) → past ook!', 'valine (a bit smaller) → fits too!', 'bijna-goed (valine) past hier', 'almost-right (valine) fits here', '→ wordt eraf geknipt', '→ is cut off'], d: { nl: 'Valine lijkt op isoleucine, maar mist één klein groepje. Het past per ongeluk in de laadplaats, en wordt daarna in de naleesplaats weer verwijderd.', en: 'Valine resembles isoleucine but lacks one small group. It fits the loading site by mistake and is then removed again in the checking site.' },
      p: { nl: 'L-valine, één methyleengroep kleiner dan Ile; wordt als Val-tRNA^Ile in het CP1-domein gehydrolyseerd (post-transfer-editing).', en: 'L-valine, one methylene group smaller than Ile; hydrolysed as Val-tRNA^Ile in the CP1 domain (post-transfer editing).' } },
    { c: '#7fdc6a', t: 'Phe', m: ['Leu', 'past niet', 'does not fit', 'te groot → past niet', 'too big → does not fit'], d: { nl: 'Aminozuren die net te groot of anders van vorm zijn. Ze botsen af op de laadplaats.', en: 'Amino acids that are just too big or shaped differently. They bounce off the loading site.' },
      p: { nl: 'Sterische uitsluiting van grotere of anders vertakte aminozuren door de synthesepocket (eerste zeef).', en: 'Steric exclusion of larger or differently branched amino acids by the synthetic pocket (first sieve).' } },
    { c: C.prot, t: { nl: 'laadplaats', en: 'loading site' }, m: ['1e zeef: de laadplaats', '1st sieve: the loading site'], d: { nl: 'De holte bovenaan het enzym waar het aminozuur klaargemaakt en op het tRNA gezet wordt. Ze laat geen te grote aminozuren toe.', en: 'The pocket at the top of the enzyme where the amino acid is prepared and placed on the tRNA. It lets in no amino acids that are too big.' },
      p: { nl: 'Synthese- (actieve) plaats in het Rossmann-domein (klasse I-motieven HIGH en KMSKS); eerste, grove zeef.', en: 'Synthetic (active) site in the Rossmann domain (class I motifs HIGH and KMSKS); the first, coarse sieve.' } },
    { c: '#5fd3e6', t: 'ATP', m: ['ATP geeft energie aan het aminozuur', 'ATP gives energy to the amino acid'], d: { nl: 'Energiemolecule. Het geeft het aminozuur energie zodat het daarna op het tRNA kan springen.', en: 'Energy molecule. It gives the amino acid energy so it can then jump onto the tRNA.' },
      p: { nl: 'ATP; aminozuuractivering: aa + ATP → aa-AMP + PPi.', en: 'ATP; amino acid activation: aa + ATP → aa-AMP + PPi.' } },
    { c: '#5fd3e6', t: 'AMP', d: { nl: 'Het restje van de energiemolecule. Het zit eerst aan het aminozuur vast en komt los als het aminozuur naar het tRNA gaat.', en: 'The leftover of the energy molecule. It is first attached to the amino acid and comes off when the amino acid moves to the tRNA.' },
      p: { nl: 'AMP, vrijgezet bij de overdracht van het aminoacyl op het tRNA.', en: 'AMP, released during transfer of the aminoacyl group to the tRNA.' } },
    { c: '#fff', t: { nl: 'aminozuur klaar', en: 'amino acid ready' }, m: ['(Ile-AMP)'], d: { nl: 'Het aminozuur met het energie-restje eraan: nu is het ‘opgeladen’ om op het tRNA te springen.', en: 'The amino acid with the energy leftover attached: now it is ‘charged up’ to jump onto the tRNA.' },
      p: { nl: 'Isoleucyl-adenylaat (Ile-AMP), het geactiveerde tussenproduct, gebonden in de actieve plaats.', en: 'Isoleucyl adenylate (Ile-AMP), the activated intermediate, bound in the active site.' } },
    { c: '#b35a22', t: 'PPi', d: { nl: 'Twee fosfaatgroepjes die van de energiemolecule afbreken en wegdrijven.', en: 'Two phosphate groups that break off the energy molecule and drift away.' },
      p: { nl: 'Anorganisch pyrofosfaat; de hydrolyse ervan door pyrofosfatase trekt de reactie voorwaarts.', en: 'Inorganic pyrophosphate; its hydrolysis by pyrophosphatase drives the reaction forward.' } },
    { c: C.trna, t: { nl: 'tRNA', en: 'tRNA' }, m: ['ook de stam wordt herkend', 'the stem is recognised too'], d: { nl: 'Het L-vormige helper-RNA (geel) dat het aminozuur naar het ribosoom brengt. Het enzym herkent het ook aan zijn stam.', en: 'The L-shaped helper RNA (yellow) that brings the amino acid to the ribosome. The enzyme also recognises it by its stem.' },
      p: { nl: 'tRNA^Ile; identiteitselementen liggen vooral in het anticodon en de acceptorstam.', en: 'tRNA^Ile; identity elements lie mainly in the anticodon and the acceptor stem.' } },
    { c: '#fff', t: 'anticodon', m: ['= herkenningsteken', '= recognition mark'], d: { nl: 'De drie letters onderaan het tRNA. Het enzym leest ze om te weten of het het juiste tRNA is.', en: 'The three letters at the bottom of the tRNA. The enzyme reads them to know whether it is the right tRNA.' },
      p: { nl: 'Anticodon GAU (5′→3′; hier 3′→5′ getekend), belangrijkste identiteitselement voor IleRS.', en: 'Anticodon GAU (5′→3′; drawn here 3′→5′), the main identity element for IleRS.' } },
    { c: C.prot2, t: { nl: 'anticodonbindend domein', en: 'anticodon-binding domain' }, d: { nl: 'Het onderste deel van het enzym, dat het leesstukje van het tRNA vastgrijpt.', en: 'The lower part of the enzyme, which grips the reading piece of the tRNA.' },
      p: { nl: 'C-terminaal anticodonbindend domein van IleRS dat het anticodon specifiek herkent.', en: 'C-terminal anticodon-binding domain of IleRS that specifically recognises the anticodon.' } },
    { c: C.chain, t: { nl: 'vast aan de laatste A', en: 'attached to the last A' }, m: ['het aminozuur springt op het tRNA', 'the amino acid jumps onto the tRNA'], d: { nl: 'Het aminozuur hangt nu aan de groene A, de allerlaatste letter van het tRNA. Het tRNA is geladen.', en: 'The amino acid now hangs on the green A, the very last letter of the tRNA. The tRNA is loaded.' },
      p: { nl: 'Esterbinding met de ribose van A76 (CCA-uiteinde); klasse I-enzymen laden meestal de 2′-OH.', en: 'Ester bond to the ribose of A76 (CCA end); class I enzymes usually charge the 2′-OH.' } },
    { c: '#fff', t: '3′', m: ['5′'], d: { nl: 'De twee uiteinden van het tRNA. Het aminozuur komt aan het 3′-uiteinde.', en: 'The two ends of the tRNA. The amino acid goes on the 3′ end.' },
      p: { nl: '3′-CCA-uiteinde en 5′-uiteinde van de acceptorstam.', en: '3′ CCA end and 5′ end of the acceptor stem.' } },
    { c: '#9b7bff', t: { nl: 'Familie 1 (klasse I)', en: 'Family 1 (class I)' }, m: ['grijpt het tRNA langs één kant', 'grips the tRNA from one side', 'bv. dit enzym (voor Ile)', 'e.g. this enzyme (for Ile)'], d: { nl: 'Eén van de twee groepen laad-enzymen. Ze hebben dezelfde bouw en grijpen het tRNA langs dezelfde kant.', en: 'One of the two groups of loading enzymes. They share the same build and grip the tRNA from the same side.' },
      p: { nl: 'Klasse I-aaRS: Rossmann-vouw met HIGH/KMSKS, benadert de acceptorstam via de kleine groeve.', en: 'Class I aaRS: Rossmann fold with HIGH/KMSKS, approaches the acceptor stem from the minor groove.' } },
    { c: '#5fd3e6', t: { nl: 'Familie 2 (klasse II)', en: 'Family 2 (class II)' }, m: ['andere bouw', 'a different build', 'grijpt langs de andere kant', 'grips from the other side', 'bv. voor Ser, Ala, Thr', 'e.g. for Ser, Ala, Thr'], d: { nl: 'De andere groep laad-enzymen, met een andere bouw. Ze grijpen het tRNA langs de andere kant.', en: 'The other group of loading enzymes, with a different build. They grip the tRNA from the other side.' },
      p: { nl: 'Klasse II-aaRS: antiparallel β-blad met motieven 1–3, benadert de acceptorstam via de grote groeve.', en: 'Class II aaRS: antiparallel β-sheet with motifs 1–3, approaches the acceptor stem from the major groove.' } },
    { c: '#ff6b6b', t: { nl: 'naleesplaats', en: 'checking site' }, m: ['(editeerplaats, CP1)', '(editing site, CP1)', '2e zeef: nalezen', '2nd sieve: checking', 'twee zeven → bijna geen fouten', 'two sieves → hardly any mistakes'], d: { nl: 'Een tweede, kleinere holte. Het juiste aminozuur is daar te groot voor, een bijna-goed (kleiner) aminozuur past en wordt eraf geknipt.', en: 'A second, smaller pocket. The right amino acid is too big for it; an almost-right (smaller) one fits and is cut off.' },
      p: { nl: 'Editeerplaats in het CP1-domein (dubbelezeefmodel, Fersht): hydrolyseert verkeerd geladen Val-tRNA^Ile.', en: 'Editing site in the CP1 domain (double-sieve model, Fersht): hydrolyses misacylated Val-tRNA^Ile.' } },
    { c: '#4fb0ff', t: 'H₂O', d: { nl: 'Water: daarmee knipt het enzym het foute aminozuur van het tRNA.', en: 'Water: with it the enzyme cuts the wrong amino acid off the tRNA.' },
      p: { nl: 'Hydrolyse van de esterbinding van het misgeladen aa-tRNA.', en: 'Hydrolysis of the ester bond of the mischarged aa-tRNA.' } },
    { c: C.prot2, t: 'eEF1A·GTP', m: ['naar de A-plaats', 'to the A site'], d: { nl: 'Een hulpeiwit dat het geladen tRNA meeneemt naar het ribosoom.', en: 'A helper protein that takes the loaded tRNA to the ribosome.' },
      p: { nl: 'Elongatiefactor eEF1A in GTP-vorm; levert aa-tRNA af in de A-plaats van het ribosoom.', en: 'Elongation factor eEF1A in its GTP form; delivers aa-tRNA to the ribosomal A site.' } },
  ],
  steps: [
    ST(8000, cam(820, 470, 1500), 'Een eigen enzym per aminozuur', 'Its own enzyme for each amino acid', 'Elk aminozuur heeft een eigen enzym dat het aan de juiste tRNA’s hangt. Hier wordt de code echt vertaald.', 'Each amino acid has its own enzyme that attaches it to the right tRNAs. This is where the code is really translated.'),
    ST(9000, cam(900, 460, 1000), 'Stap 1: het aminozuur klaarmaken', 'Step 1: getting the amino acid ready', 'Het enzym activeert het aminozuur (isoleucine) met energie uit ATP.', 'The enzyme activates the amino acid (isoleucine) with energy from ATP.'),
    ST(9000, cam(800, 560, 1250), 'Het enzym herkent zijn tRNA', 'The enzyme recognises its tRNA', 'Het enzym herkent ‘zijn’ tRNA aan vaste kenmerken, vooral het anticodon en de stam waar het aminozuur komt.', 'The enzyme recognises ‘its’ tRNA by fixed features, mainly the anticodon and the stem where the amino acid goes.'),
    ST(8500, cam(840, 430, 900), 'Stap 2: het tRNA wordt geladen', 'Step 2: the tRNA is loaded', 'Het aminozuur gaat naar de laatste A van het CCA-uiteinde. Het tRNA is nu geladen.', 'The amino acid moves to the last A of the CCA end. The tRNA is now loaded.'),
    ST(9000, FULL, 'Twee families van enzymen', 'Two families of enzymes', 'Er zijn twee groepen van zo’n 10 enzymen, elk met een eigen bouw. Ze grijpen het tRNA elk langs een andere kant.', 'There are two groups of about 10 enzymes, each with its own build. Each grips the tRNA from a different side.'),
    ST(9000, cam(950, 462, 1300), 'Probleem: valine lijkt op isoleucine', 'Problem: valine looks like isoleucine', 'Fenylalanine is te groot en past niet. Maar valine is net iets kleiner dan isoleucine en past wel: een fout.', 'Phenylalanine is too big and does not fit. But valine is just slightly smaller than isoleucine and does fit: a mistake.'),
    ST(9500, cam(950, 462, 1300), 'Nalezen: een tweede zeef', 'Checking: a second sieve', 'Een tweede, kleinere holte controleert. Valine past daar wel en wordt eraf geknipt; isoleucine niet.', 'A second, smaller pocket checks. Valine fits there and is cut off again; isoleucine does not.'),
    ST(8500, cam(820, 470, 1500), 'Naar het ribosoom', 'Off to the ribosome', 'Een hulpeiwit brengt het geladen tRNA naar het ribosoom. Dat controleert alleen het codon, niet het aminozuur.', 'A helper protein brings the loaded tRNA to the ribosome. It checks only the codon, not the amino acid.'),
  ],
  svg() {
    /* katalytisch domein (klasse I) = Rossmann-vouw: parallel β-blad (alle strengen dezelfde richting) met helices aan weerszijden, boven de laadplaats */
    const ROSSMANN = `<g opacity=".9"><path d="M712,300 Q730,272 760,378 M864,300 Q895,275 915,300" stroke="#d6ccff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>` +
      [760, 786, 812, 838, 864].map(x => strengPijl(x, 378, x, 300, { h: 9 })).join('') +
      [773, 799, 825, 851].map(x => [318, 338, 358].map(y => `<line x1="${x - 6}" y1="${y}" x2="${x + 6}" y2="${y}" stroke="#e8edf6" stroke-width="1.5" stroke-dasharray="2.5 2.5"/>`).join('')).join('') +
      helixLint(712, 392, 712, 300, { turns: 2.6, amp: 10, w: 10, col: '#c9b8ff' }) + helixLint(915, 300, 918, 392, { turns: 2.6, amp: 10, w: 10, col: '#c9b8ff' }) + '</g>';
    return svgOpen() + `
    <g data-node="aars" data-nolabel id="rs-enz">
      ${eiwit(960, 640, 190, 150, '#7d66e0', { seed: 12, bumps: .07 })}
      ${eiwit(ACD[0] + 10, ACD[1] - 4, 135, 74, C.prot2, { seed: 14, bumps: .08 })}
      ${eiwit(SYN[0] + 30, SYN[1] - 10, 215, 175, C.prot, { seed: 11, bumps: .06 })}
      ${ROSSMANN}
      ${eiwit(EDIT[0] + 10, EDIT[1] - 6, 118, 92, '#b49bff', { seed: 13, bumps: .08 })}
      <ellipse cx="${SYN[0] + 14}" cy="${SYN[1] + 16}" rx="70" ry="54" fill="rgba(7,11,22,.75)" stroke="${C.prot}" stroke-dasharray="7 6" stroke-width="2.5"/>
      <ellipse cx="${EDIT[0]}" cy="${EDIT[1]}" rx="52" ry="40" fill="rgba(7,11,22,.75)" stroke="#ff6b6b" stroke-dasharray="7 6" stroke-width="2.5"/>
      <ellipse cx="${ACD[0]}" cy="${ACD[1]}" rx="92" ry="44" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="2"/>
      <g id="rs-lab"></g>
    </g>
    <g data-node="trna" data-color="${C.trna}" data-label="tRNA-Ile"><g id="rs-trna"></g><circle id="rs-tA" data-anchor="trna" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="#7fdc6a" data-nolabel><g id="rs-aa"></g></g>
    <g id="rs-mol"></g>
    <g data-node="elongatie" data-color="${C.prot}" data-label="${T2('eEF1A → ribosoom (elongatie)', 'eEF1A → ribosome (elongation)')}"><g id="rs-eef"></g><circle id="rs-eA" data-anchor="elongatie" r="1" fill="none"/></g>
    <g id="rs-ov"></g>
    ${hud('rs-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'trna', label: { nl: 'tRNA-structuur', en: 'tRNA structure' }, color: C.trna },
      { node: 'codon', label: { nl: 'Genetische code', en: 'Genetic code' }, color: C.rna },
      { node: 'rnastructuur', label: { nl: 'tRNA in 3D', en: 'tRNA in 3D' }, color: C.trna, href: '../atlas/index.html?id=trna' },
    ])}
    </svg>`;
  },
  init(svg, api) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    /* tRNA-Ile = het gedeelde symbool (bio.js trna2d), schuin in het enzym: anticodon in het anticodonbindende domein,
       acceptorstam naar de synthese-plaats; het enkelstrengige CCA-uiteinde buigt naar tip (= A76).
       Anticodon 5′-GAU-3′ (leest AUC/AUU), getekend zoals overal van links naar rechts 3′→5′: U A G. */
    /* L-vorm met echte verhoudingen: het hele tRNA (vaste grootte) wordt zo gedraaid dat de acceptorarm naar het doel wijst;
       enkel het korte CCA-uiteinde mag nog wat buigen (bv. van de synthese-plaats naar de editeerplaats: in werkelijkheid
       verschuift ook enkel dat uiteinde). Grootte: anticodonbindend domein → synthese-plaats, zoals in het enzym. */
    const CCA = [-15, -204], LL = Math.hypot(...CCA);
    const TS = Math.hypot(812 + 6 - 580, 432 + 30 - 760) / LL;
    const placeRot = (x, y, tip) => (Math.atan2(tip[1] - y, tip[0] - x) - Math.atan2(CCA[1], CCA[0])) * 180 / Math.PI;
    let showEnds = true;   // 3′/5′ bij de acceptorstam (waar het aminozuur hangt), niet bij het anticodon
    function trna(ox, oy, tip, charge, op = 1, hiId = 0, bodyTip = tip) {
      if (op <= .01) return '';
      const x = 580 + ox, y = 760 + oy;
      const rot = placeRot(x, y, bodyTip), d = Math.hypot(tip[0] - x, tip[1] - y) - TS * LL;
      const far = Math.hypot(tip[0] - bodyTip[0], tip[1] - bodyTip[1]) > 8 || Math.abs(d) > 8;
      let s = `<g opacity="${f1(op)}">` + trna2d(x, y, { s: TS, rot, anticodon: 'UAG', nt: 34 / TS, tile: [.88, .88], tip: far ? tip : null, acHi: hiId });
      s += `<circle cx="${f1(tip[0])}" cy="${f1(tip[1])}" r="9" fill="${BASE.A}" stroke="#0a1224" stroke-width="2"/>`;
      if (showEnds) {
        /* 5′ en 3′ liggen allebei aan de acceptorstam: 3′ = het CCA-uiteinde waar het aminozuur hangt, 5′ = nt 1 ernaast
           (nt 1 in de lokale tekening van trna2d: (28.2, −183.9), gespiegeld zoals CCA) */
        const r = rot * Math.PI / 180, lx = 28.2 * TS, ly = -183.9 * TS;
        const p5 = [x + lx * Math.cos(r) - ly * Math.sin(r), y + lx * Math.sin(r) + ly * Math.cos(r)];
        const ex = [Math.cos(r), Math.sin(r)];   // lokale x-as: van het CCA-uiteinde naar de 5′-kant
        const end = (px, py, l) => `<text x="${f1(px)}" y="${f1(py + 9)}" font-size="26" text-anchor="middle" fill="#fff" stroke="#0b1224" stroke-width="5" paint-order="stroke" font-family="Inter" font-weight="800">${l}</text>`;
        s += end(tip[0] - 32 * ex[0], tip[1] - 32 * ex[1], '3′') + end(p5[0] + 30 * ex[0], p5[1] + 30 * ex[1], '5′');
      }
      if (charge) s += aa(tip[0] + charge.dx, tip[1] + charge.dy, charge.a, 24);
      $('rs-tA').setAttribute('cx', f1(x - 60)); $('rs-tA').setAttribute('cy', f1(y - 120));
      return s + '</g>';
    }
    const atp = (x, y, n = 3, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${pill(x, y, 62, 30, n === 3 ? 'ATP' : 'AMP', '#5fd3e6', 1, 16)}</g>`;
    const ppi = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${pill(x, y, 58, 28, 'PPi', '#b35a22', 1, 15)}</g>`;

    return {
      update(t, s) {
        placeHud(svg, 'rs-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        showEnds = i !== 1;
        let tr = '', mol = '', amino = '', ov = '', eef = '';
        const dockOff = i < 2 ? [-620, 0] : i === 2 ? E2([-620, 0], [0, 0], ease(sub(p, .05, .5))) : [0, 0];
        const tipSyn = [SYN[0] + 6, SYN[1] + 30], tipOut = [520 + dockOff[0] + 250, 330 + dockOff[1] + 60];
        // enzymlabels alleen in de stap waar ze ertoe doen (vloeiend in/uit aan het begin van de stap)
        const VIS = { syn: [0, 1, 1, 1, 0, 1, 0, 0], edit: [0, 0, 0, 0, 0, 0, 1, 0], acd: [0, 0, 1, 0, 0, 0, 0, 0], name: [1, 1, 1, 1, 1, 1, 1, 0] };   // bij het vertrek schuift het tRNA over het enzymlabel
        const lv = k => { const a = VIS[k], c = a[i] ?? 0, pr = i > 0 ? a[i - 1] : c; return lerp(pr, c, sub(p, 0, .2)); };
        const gl = (k, sv) => lv(k) > .01 ? `<g opacity="${f1(lv(k))}">${sv}</g>` : '';
        $('rs-enz').setAttribute('opacity', i === 4 ? '1' : i === 7 ? f1(1 - .5 * sub(p, .2, .6)) : '1');
        $('rs-lab').innerHTML = gl('syn', txt(SYN[0] - 66, SYN[1] + 24, T2('laadplaats', 'loading site'), '#d6ccff', 24, 'end', 700)) +
          gl('edit', `<path d="M${EDIT[0] + 40},${EDIT[1] - 200} L${EDIT[0] + 14},${EDIT[1] - 42}" stroke="#ff9a9a" stroke-width="2.5"/>` + txt(EDIT[0] + 60, EDIT[1] - 236, T2('naleesplaats', 'checking site'), '#ff9a9a', 26, 'middle', 800) + txt(EDIT[0] + 60, EDIT[1] - 212, T2('(editeerplaats, CP1)', '(editing site, CP1)'), '#c9d2e6', 16, 'middle', 600)) +
          gl('acd', txt(ACD[0] + 110, ACD[1] + 70, T2('anticodonbindend domein', 'anticodon-binding domain'), '#d6ccff', 22, 'start', 700)) +
          gl('name', txt(1060, 640, 'IleRS', C.prot, 34, 'middle', 800));
        
        if (i === 0) {
          tr = trna(-400, 0, [520 - 400 + 250, 390], { a: 'I', dx: 28, dy: -24 }, sub(p, .05, .3));
          $('rs-tA').setAttribute('cx', '180'); $('rs-tA').setAttribute('cy', '520');   // label rechts van de stam, niet tegen de linkerrand
          const list = 'A R N D C Q E G H I L K M F P S T W Y V'.split(' ');
          list.forEach((a, j) => { const x = 1270 + (j % 4) * 62, y = 250 + Math.floor(j / 4) * 62; amino += `<g opacity="${f1(sub(p, .25 + j * .02, .35 + j * .02))}">${aa(x, y, a, 25)}</g>`; });
          ov += txt(1363, 205, T2('20 aminozuren → ≈ 20 synthetasen', '20 amino acids → ≈ 20 synthetases'), C.text, 21, 'middle', 700);
        }
        if (i === 1) {
          const k1 = ease(sub(p, .05, .4)), k2 = ease(sub(p, .15, .5)), react = sub(p, .55, .7), leave = ease(sub(p, .7, 1));
          const ile = E2([1350, 330], [SYN[0] - 14, SYN[1] + 10], k1), a = E2([1350, 640], [SYN[0] + 48, SYN[1] + 20], k2);
          amino += aa(ile[0], ile[1], 'I', 26);
          mol += atp(a[0] + 10 * react, a[1], react > .5 ? 1 : 3);
          if (react > 0) mol += `<circle cx="${SYN[0] + 20}" cy="${SYN[1] + 14}" r="${f1(30 + 40 * react)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - react)}"/>`;
          mol += ppi(lerp(SYN[0] + 90, 1290, leave), lerp(SYN[1] + 40, 340, leave), sub(p, .6, .7));
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + txt(900, 225, T2('ATP geeft energie aan het aminozuur', 'ATP gives energy to the amino acid'), '#fff', 30, 'middle', 800) + '</g>';
          if (react > .5) ov += txt(SYN[0] + 14, SYN[1] - 70, T2('aminozuur klaar', 'amino acid ready'), '#fff', 24, 'middle', 800) + txt(SYN[0] + 14, SYN[1] - 48, '(Ile-AMP)', '#c9d2e6', 16, 'middle', 600);
          tr = '';
        }
        if (i >= 2 && i <= 3) {
          // Ile-AMP in het actieve centrum
          const hi = i === 2 ? sub(p, .5, .65) * (1 - sub(p, .9, 1)) : 0;
          const tr3 = i === 3 ? ease(sub(p, .15, .6)) : 0;
          const tip = i === 2 ? E2(tipOut, tipSyn, ease(sub(p, .3, .6))) : tipSyn;
          const charge = i === 3 && tr3 > .98 ? { a: 'I', dx: 30, dy: -26 } : null;
          tr = trna(dockOff[0], dockOff[1], tip, charge, 1, hi);
          if (!charge) { const ile = E2([SYN[0] - 14, SYN[1] + 10], [tip[0] + 30, tip[1] - 26], tr3); amino += aa(ile[0], ile[1], 'I', 26); }
          const ampL = i === 3 ? ease(sub(p, .6, 1)) : 0;
          mol += atp(lerp(SYN[0] + 58, 1380, ampL), lerp(SYN[1] + 20, 640, ampL), 1);
          if (i === 2) {
            ov += `<g opacity="${f1(sub(p, .5, .65))}">` + txt(ACD[0] - 140, ACD[1] - 80, T2('anticodon', 'anticodon'), '#fff', 26, 'end', 800) +
              txt(ACD[0] - 140, ACD[1] - 50, T2('= herkenningsteken', '= recognition mark'), C.muted, 20, 'end') + '</g>' +
              `<g opacity="${f1(sub(p, .65, .8))}">` + txt(tipSyn[0] - 110, tipSyn[1] - 150, T2('ook de stam wordt herkend', 'the stem is recognised too'), '#fff', 20, 'middle', 700) + '</g>';
          } else {
            ov += `<g opacity="${f1(sub(p, .05, .2))}">` + txt(860, 215, T2('het aminozuur springt op het tRNA', 'the amino acid jumps onto the tRNA'), '#fff', 28, 'middle', 800) + '</g>' +
              `<g opacity="${f1(sub(p, .65, .8))}">` + `<path d="M1000,306 Q905,520 ${tipSyn[0] + 11},${tipSyn[1] + 3}" stroke="${C.chain}" stroke-width="2.5" fill="none"/>` + txt(1030, 296, T2('vast aan de laatste A', 'attached to the last A'), C.chain, 24, 'middle', 800) + '</g>';
          }
        }
        if (i === 4) {
          tr = trna(0, 0, tipSyn, { a: 'I', dx: 30, dy: -26 }, 1);     // IleRS + Ile-tRNA blijven in beeld als voorbeeld van klasse I
          const f = 1;
          ov += `<g opacity="${f1(f)}">` + textBox(1185, 120, 395, [T2('grijpt het tRNA langs één kant', 'grips the tRNA from one side'), T2('bv. dit enzym (voor Ile)', 'e.g. this enzyme (for Ile)')], { title: T2('Familie 1 (klasse I)', 'Family 1 (class I)'), col: '#9b7bff', fs: 22 }) + '</g>';
          ov += `<g opacity="${f1(sub(p, .15, .3))}">` + textBox(1185, 330, 395, [T2('andere bouw', 'a different build'), T2('grijpt langs de andere kant', 'grips from the other side'), T2('bv. voor Ser, Ala, Thr', 'e.g. for Ser, Ala, Thr')], { title: T2('Familie 2 (klasse II)', 'Family 2 (class II)'), col: '#5fd3e6', fs: 22 }) + '</g>';
        }
        if (i === 5) {
          // Leu en Phe botsen af; Val past
          const bounce = (a, x0, y0, t0) => { const k = sub(p, t0, t0 + .3), d = Math.sin(Math.PI * k); return aa(lerp(x0, SYN[0] + 60, d), lerp(y0, SYN[1] - 10, d), a, 30); };
          amino += bounce('L', 1400, 250, .02) + bounce('F', 1400, 420, .18);
          if (sub(p, .02, .5) > 0 && sub(p, .02, .5) < 1) {
            const k = sub(p, .02, .5), bx = lerp(1400, SYN[0] + 60, Math.sin(Math.PI * k)), by = lerp(250, SYN[1] - 10, Math.sin(Math.PI * k));
            if (Math.sin(Math.PI * k) > .8) ov += txt(bx + 50, by - 40, T2('past niet', 'does not fit'), C.danger, 22, 'start', 800);
          }
          const kv = ease(sub(p, .45, .75));
          const val = E2([1400, 620], [tipSyn[0] + 30, tipSyn[1] - 26], kv);
          tr = trna(0, 0, tipSyn, kv > .98 ? { a: 'V', dx: 30, dy: -26 } : null, 1);
          if (kv <= .98) amino += aa(val[0], val[1], 'V', 24);
          ov += `<g opacity="${f1(sub(p, .75, .9))}">` + txt(1180, 520, T2('valine op dit tRNA: fout!', 'valine on this tRNA: wrong!'), C.danger, 26, 'start', 800) + '</g>';
          ov += `<g opacity="${f1(sub(p, .05, .2))}">` + textBox(1180, 545, 380, [T2('te groot → past niet', 'too big → does not fit'), T2('isoleucine → past', 'isoleucine → fits'), T2('valine (iets kleiner) → past ook!', 'valine (a bit smaller) → fits too!')], { title: T2('1e zeef: de laadplaats', '1st sieve: the loading site'), col: C.prot, fs: 20 }) + '</g>';
        }
        if (i === 6) {
          const sw = ease(sub(p, .08, .4)), hyd = sub(p, .45, .6), out = ease(sub(p, .6, .95));
          const tip = E2(tipSyn, [EDIT[0] - 10, EDIT[1] + 16], sw);
          // het acceptoruiteinde zwaait naar de editeerplaats (anticodon blijft vast)
          tr = trna(0, 0, tip, hyd < .5 ? { a: 'V', dx: 30 * (1 - sw) + 16 * sw, dy: -26 * (1 - sw) - 10 * sw } : null, 1, 0, tipSyn);   // lichaam blijft staan zoals in de synthese-plaats; enkel het CCA-uiteinde buigt
          if (hyd >= .5) amino += aa(lerp(EDIT[0] + 10, 1400, out), lerp(EDIT[1] - 20, 180, out), 'V', 24);
          if (hyd > 0 && hyd < 1) mol += `<circle cx="${EDIT[0]}" cy="${EDIT[1]}" r="${f1(30 + 40 * hyd)}" fill="none" stroke="#ff6b6b" stroke-width="3" opacity="${f1(1 - hyd)}"/>`;
          mol += `<g opacity="${f1(sub(p, .4, .5) * (1 - sub(p, .6, .7)))}">${pill(EDIT[0] + 92, EDIT[1] - 6, 60, 28, 'H₂O', '#4fb0ff', 1, 15)}</g>`;
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + textBox(1180, 360, 400, [T2('bijna-goed (valine) past hier', 'almost-right (valine) fits here'), T2('→ wordt eraf geknipt', '→ is cut off'), T2('isoleucine is te groot → blijft', 'isoleucine is too big → stays')], { title: T2('2e zeef: nalezen', '2nd sieve: checking'), col: '#ff6b6b', fs: 20 }) + '</g>';
          ov += `<g opacity="${f1(sub(p, .7, .85))}">` + (s => s.length > 26 && s.includes(' → ') ? txt(1380, 284, s.slice(0, s.indexOf(' → ')), '#fff', 24, 'middle', 800) + txt(1380, 314, s.slice(s.indexOf(' → ') + 1), '#fff', 24, 'middle', 800) : txt(1380, 300, s, '#fff', 24, 'middle', 800))((api?.easy ?? (x => x))(T2('twee zeven → bijna geen fouten', 'two sieves → hardly any mistakes'))) + '</g>';   // vaktaal is langer: over twee regels (anders rechts afgesneden)
        }
        if (i === 7) {
          const go = ease(sub(p, .15, .8));
          tr = trna(lerp(0, 380, go), lerp(0, -60, go), [lerp(tipSyn[0], tipSyn[0] + 380, go), lerp(tipSyn[1], tipSyn[1] - 60, go)], { a: 'I', dx: 30, dy: -26 }, 1);
          // eEF1A pakt het geladen uiteinde vast (tegen het aminozuur aan) en neemt het tRNA mee
          const ex = tipSyn[0] + 380 + 150, ey = tipSyn[1] - 60 - 30;
          eef = `<g opacity="${f1(sub(p, .55, .75))}">${eiwit(ex, ey, 98, 30, C.prot2, { seed: 15, label: 'eEF1A·GTP', fs: 21 })}</g>` +
            `<g opacity="${f1(sub(p, .75, .9))}"><path d="M${ex - 20},${ey - 42} h110" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>${txt(ex + 20, ey + 62, T2('naar de A-plaats', 'to the A site'), C.rrna, 22, 'middle', 700)}</g>`;
          $('rs-eA').setAttribute('cx', f1(ex)); $('rs-eA').setAttribute('cy', f1(ey - 58));
        } else { $('rs-eA').setAttribute('cx', '-9999'); }
        $('rs-trna').innerHTML = tr; $('rs-aa').innerHTML = amino; $('rs-mol').innerHTML = mol; $('rs-ov').innerHTML = ov; $('rs-eef').innerHTML = eef;
      },
    };
  },
};
