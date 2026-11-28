import { C, L, T2, svgOpen, pill, txt, mono, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { helixAlong, prot, panel, arrow } from './_txn.js';
import { ePill } from '../repl/_draw.js';
import { polII, polCTD } from '../../bio.js';
const CTDO = { ctd: 145, ctdStap: 29, ctdHoek: 100 };   // CTD-staart van Pol II: onderaan achteraan, schuin omlaag tot onder de liniaal

/* Kernpromoter −44 … +44 (er bestaat geen positie 0). 1 bp = 16 px. */
const BP = 16, Y0 = 540;
const bx = b => 104 + (b < 0 ? b + 44 : b + 43) * BP;          // x-positie van basenpaar b
/* illustratieve sequentie (coderende streng 5'→3') die aan de consensusmotieven voldoet */
const SEQ = 'GCAGGA' + 'GGGCGCC' + 'TATAAAAG' + 'GTTGTTG' + 'CGCCTCGAGCGC' + 'TC' + 'AGTCC' + 'GCTCGAGCTCGA' + 'CGAACGGAAC' + 'AGACG' + 'TCCGAGCTGACC';
const ELEM = [
  { id: 'BREu', a: -38, b: -32, seq: 'SSRCGCC', col: '#ffb27a' },
  { id: 'TATA', a: -31, b: -24, seq: 'TATAWAWR', col: '#ffc247' },
  { id: 'BREd', a: -23, b: -17, seq: 'RTDKKKK', col: '#ffb27a' },
  { id: 'Inr', a: -2, b: 5, seq: 'YYANWYY', col: '#7fdc6a' },
  { id: 'MTE', a: 18, b: 27, seq: '', col: '#5fd3e6' },
  { id: 'DPE', a: 28, b: 32, seq: 'RGWYV', col: '#5fd3e6' },
];
const XL = bx(-31) - 8, XR = bx(-24) + 8, LS = XR - XL;
function bentCenter(theta) {
  const R = theta > 1e-3 ? LS / theta : 0;
  return u => {
    if (u >= XR || theta < 1e-3) return [u, Y0];
    const s = XR - u;
    if (s <= LS) { const a = theta * s / LS; return [XR - R * Math.sin(a), Y0 + R * (1 - Math.cos(a))]; }
    const e = [XR - R * Math.sin(theta), Y0 + R * (1 - Math.cos(theta))], d = s - LS;
    return [e[0] - d * Math.cos(theta), e[1] + d * Math.sin(theta)];
  };
}
const GRIJS = '#8a94ab';   // 'andere herkenningsstukjes': grijs, zodat TATA-box en startpunt (Inr, +1) eruit springen
const MAIN = id => id === 'TATA' || id === 'Inr';
/* eiwit met een rolnaam in gewone taal; de afkorting klein eronder */
const rp = (x, y, w, role, abbr, col, op, fs = 17) => op <= .01 ? '' : ePill(x, y, w, 34, role, col, op, fs) + `<g opacity="${f1(op)}">${txt(x, y + 36, abbr, '#c9b8ff', 15, 'middle', 700)}</g>`;
const G = { d: '#8e6cf0', a: '#6f5bd6', b: '#6f5bd6', f: '#5a4bb8', e: '#5a4bb8', h: '#8e6cf0', pol: '#9b7bff', med: '#6f5bd6', nelf: '#d65a8a', dsif: '#5fa8d6', ptefb: '#7fdc6a' };

export default {
  id: 'promoter',
  title: { nl: 'Promoter & preinitiatiecomplex', en: 'Core promoter & pre-initiation complex' },
  scale: '≈ 90 bp · ≈ 30 nm', time: { nl: 'seconden tot minuten (vertraagd)', en: 'seconds to minutes (slowed down)' },
  org: { nl: 'mens (RNA-polymerase II)', en: 'human (RNA polymerase II)' },
  legend: [[C.dna, { nl: 'coderende streng', en: 'coding strand' }], [C.dna2, { nl: 'matrijsstreng', en: 'template strand' }], ['#ffc247', 'TATA'], ['#ffb27a', 'BRE'], ['#7fdc6a', 'Inr'], ['#5fd3e6', 'MTE / DPE'],
    [G.d, 'TFIID (TBP + TAFs)'], [G.pol, 'RNA-polymerase II'], [C.rna, 'RNA'], [G.nelf, 'NELF'], [G.dsif, 'DSIF'], [G.ptefb, 'P-TEFb (CDK9)']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Consensuscodes: S = G/C, R = A/G, Y = C/T, W = A/T, K = G/T, D = A/G/T, V = A/C/G, N = elke base. De DPE-code is die van de fruitvlieg; voor de mens is er nog geen vaste code. De getoonde sequentie is illustratief: hij voldoet aan alle motieven, wat in echte promoters zelden het geval is.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Consensus codes: S = G/C, R = A/G, Y = C/T, W = A/T, K = G/T, D = A/G/T, V = A/C/G, N = any base. The DPE code is the fruit-fly one; no fixed code has been established for humans. The sequence shown is illustrative: it matches every motif, which real promoters rarely do.</p>' },
  simplified: {
    nl: 'Geen enkel kernpromoterelement is universeel; de meeste menselijke promoters liggen in CpG-eilanden zonder TATA-box en starten verspreid over meerdere posities. De buiging (~80°) is als één knik getekend; TFIID, Pol II en de factoren zijn schematische vormen (echte structuren: cryo-EM van het humane PIC). Mediator is enkel aangeduid; +1-nucleosoom en capping zijn weggelaten.',
    en: 'No core promoter element is universal; most human promoters lie in CpG islands without a TATA box and start at several dispersed positions. The bend (~80°) is drawn as one kink; TFIID, Pol II and the factors are schematic shapes (real structures: cryo-EM of the human PIC). Mediator is only indicated; the +1 nucleosome and capping are omitted.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: { nl: 'coderende streng', en: 'coding strand' }, d: { nl: 'De bovenste DNA-streng (blauw). Ze heeft dezelfde volgorde als het RNA dat gemaakt wordt.', en: 'The upper DNA strand (blue). It has the same sequence as the RNA that is made.' },
      p: { nl: 'Coderende (niet-matrijs)streng, 5′→3′ van links naar rechts; promotermotieven worden op deze streng genoteerd.', en: 'Coding (non-template) strand, 5′→3′ from left to right; promoter motifs are written on this strand.' } },
    { c: C.dna2, t: { nl: 'matrijsstreng', en: 'template strand' }, d: { nl: 'De onderste DNA-streng (lichtblauw): deze wordt gelezen om het RNA te maken.', en: 'The lower DNA strand (light blue): this one is read to make the RNA.' },
      p: { nl: 'Matrijsstreng, 3′→5′ afgelezen door Pol II.', en: 'Template strand, read 3′→5′ by Pol II.' } },
    { c: C.text, t: '+1', m: ['startpunt +1', 'start site +1', '-40', '-30', '-20', '-10'], d: { nl: 'De liniaal telt DNA-letters vanaf het startpunt (+1), waar het RNA begint. Letters ervoor krijgen een minteken.', en: 'The ruler counts DNA letters from the start site (+1), where the RNA begins. Letters before it get a minus sign.' },
      p: { nl: 'Posities in bp t.o.v. de transcriptiestartplaats (TSS = +1); er bestaat geen positie 0.', en: 'Positions in bp relative to the transcription start site (TSS = +1); there is no position 0.' } },
    { c: '#ffc247', t: { nl: 'TATA-box', en: 'TATA box' }, m: ['TATA', 'Bij de meeste menselijke genen ontbreekt de TATA-box', 'Most human genes lack a TATA box'], d: { nl: 'Een herkenningsstukje rijk aan T en A, ongeveer 30 letters vóór het startpunt. De meeste menselijke genen hebben het niet.', en: 'A recognition stretch rich in T and A, about 30 letters before the start site. Most human genes do not have one.' },
      p: { nl: 'TATA-box (consensus TATAWAWR, ≈ −31 tot −24), bindingsplaats van TBP; ontbreekt in de meeste humane promoters (CpG-eilanden).', en: 'TATA box (consensus TATAWAWR, ≈ −31 to −24), binding site of TBP; absent from most human promoters (CpG islands).' } },
    { c: '#7fdc6a', t: 'Inr', d: { nl: 'Het herkenningsstukje precies rond het startpunt.', en: 'The recognition stretch right around the start site.' },
      p: { nl: 'Initiator (YYANWYY), overlapt met de TSS; herkend door TAF’s van TFIID.', en: 'Initiator (YYANWYY), overlapping the TSS; recognised by TAFs of TFIID.' } },
    { c: GRIJS, t: 'BREu', m: ['BREd', 'grijs: andere herkenningsstukjes (niet bij elk gen)', 'grey: other recognition stretches (not in every gene)'], d: { nl: 'Grijs: andere herkenningsstukjes vlak voor en na de TATA-box. Niet elk gen heeft ze.', en: 'Grey: other recognition stretches just before and after the TATA box. Not every gene has them.' },
      p: { nl: 'TFIIB-herkenningselementen stroomop- (BREu) en stroomafwaarts (BREd) van de TATA-box.', en: 'TFIIB recognition elements upstream (BREu) and downstream (BREd) of the TATA box.' } },
    { c: GRIJS, t: 'MTE', m: ['DPE'], d: { nl: 'Nog twee herkenningsstukjes, een eind ná het startpunt. Ook die heeft niet elk gen.', en: 'Two more recognition stretches, some way after the start site. Not every gene has these either.' },
      p: { nl: 'Motif ten element en downstream promoter element (≈ +18 tot +32), contactplaatsen voor TFIID.', en: 'Motif ten element and downstream promoter element (≈ +18 to +32), contact sites for TFIID.' } },
    { c: G.d, t: 'TBP', m: ['herkent de promoter', 'recognises the promoter'], d: { nl: 'Het eiwit dat de TATA-box herkent en het DNA daar sterk buigt.', en: 'The protein that recognises the TATA box and bends the DNA strongly there.' },
      p: { nl: 'TATA-bindend eiwit, deel van TFIID; bindt in de kleine groef en buigt het DNA ≈ 80°.', en: 'TATA-binding protein, part of TFIID; binds in the minor groove and bends the DNA ≈ 80°.' } },
    { c: G.d, t: 'TFIID', m: ['grijpt ook het startpunt vast', 'also grips the start site', '(TAF\'s)', '(TAFs)'], d: { nl: 'Een groot complex rond het herkenningseiwit. Andere delen ervan grijpen ook het startpunt vast.', en: 'A large complex around the recognition protein. Other parts of it also grip the start site.' },
      p: { nl: 'TFIID = TBP + TBP-geassocieerde factoren (TAF’s); de TAF’s contacteren Inr, MTE en DPE.', en: 'TFIID = TBP + TBP-associated factors (TAFs); the TAFs contact Inr, MTE and DPE.' } },
    { c: G.a, t: 'TFIIA', m: ['houdt TBP vast', 'holds TBP'], d: { nl: 'Een helper die het herkenningseiwit steviger op het DNA houdt.', en: 'A helper that holds the recognition protein more firmly on the DNA.' },
      p: { nl: 'Stabiliseert het TBP–DNA-complex.', en: 'Stabilises the TBP–DNA complex.' } },
    { c: G.b, t: 'TFIIB', m: ['brug naar het enzym', 'bridge to the enzyme'], d: { nl: 'Een helper die als brug het RNA-enzym naar de juiste plek brengt.', en: 'A helper that acts as a bridge, bringing the RNA enzyme to the right spot.' },
      p: { nl: 'Bindt TBP en de BRE’s en rekruteert Pol II–TFIIF; helpt de startplaats te kiezen.', en: 'Binds TBP and the BREs and recruits Pol II–TFIIF; helps select the start site.' } },
    { c: G.pol, t: { nl: 'RNA-enzym (Pol II)', en: 'RNA enzyme (Pol II)' }, d: { nl: 'Het enzym dat het RNA maakt. Het DNA loopt door zijn geul.', en: 'The enzyme that makes the RNA. The DNA runs through its cleft.' },
      p: { nl: 'RNA-polymerase II, geplaatst over de TSS in het preinitiatiecomplex (PIC).', en: 'RNA polymerase II, positioned over the TSS in the pre-initiation complex (PIC).' } },
    { c: G.f, t: 'TFIIF', m: ['begeleider', 'escort'], d: { nl: 'Een begeleider die samen met het RNA-enzym aankomt.', en: 'An escort that arrives together with the RNA enzyme.' },
      p: { nl: 'Bindt Pol II en begeleidt het naar de promoter; stabiliseert het PIC.', en: 'Binds Pol II and escorts it to the promoter; stabilises the PIC.' } },
    { c: G.med, t: 'Mediator', m: ['activatoren', 'activators'], d: { nl: 'Een groot eiwitcomplex dat signalen van schakelaar-eiwitten verderop doorgeeft aan het RNA-enzym.', en: 'A large protein complex that passes on signals from switch proteins further away to the RNA enzyme.' },
      p: { nl: 'Co-activatorcomplex tussen activatoren en het PIC; stimuleert o.a. de CTD-fosforylering door TFIIH.', en: 'Co-activator complex between activators and the PIC; stimulates, among other things, CTD phosphorylation by TFIIH.' } },
    { c: G.e, t: 'TFIIE', m: ['haalt TFIIH', 'brings TFIIH'], d: { nl: 'Een helper die de laatste helper (de opener) oproept.', en: 'A helper that calls in the last helper (the opener).' },
      p: { nl: 'Rekruteert en stimuleert TFIIH.', en: 'Recruits and stimulates TFIIH.' } },
    { c: G.h, t: 'TFIIH', m: ['opener', 'opent het DNA (ATP)', 'opens the DNA (ATP)', 'zet P op de staart', 'puts P on the tail'], d: { nl: 'De opener: draait met energie (ATP) het DNA open en zet daarna fosfaatgroepjes (P) op de staart van het RNA-enzym.', en: 'The opener: uses energy (ATP) to unwind the DNA and then puts phosphate groups (P) on the RNA enzyme’s tail.' },
      p: { nl: 'TFIIH: de translocase XPB opent het promoter-DNA; CDK7 fosforyleert Ser5 van de CTD.', en: 'TFIIH: the translocase XPB opens the promoter DNA; CDK7 phosphorylates Ser5 of the CTD.' } },
    { c: C.text, t: { nl: 'het DNA is open: de transcriptiebel', en: 'the DNA is open: the transcription bubble' }, d: { nl: 'Rond het startpunt liggen de twee DNA-strengen nu los, zodat de onderste gelezen kan worden.', en: 'Around the start site the two DNA strands now lie apart, so the lower one can be read.' },
      p: { nl: 'Open promotercomplex: ≈ 11–15 bp gesmolten DNA rond de TSS.', en: 'Open promoter complex: ≈ 11–15 bp of melted DNA around the TSS.' } },
    { c: C.rna, t: { nl: 'eerste RNA', en: 'first RNA' }, m: ['verder RNA maken', 'keep making RNA'], d: { nl: 'Het RNA (oranje) groeit letter per letter uit het RNA-enzym. De teller toont hoeveel bouwstenen het al heeft.', en: 'The RNA (orange) grows letter by letter out of the RNA enzyme. The counter shows how many building blocks it already has.' },
      p: { nl: 'Ontluikend transcript; na ≈ 20–60 nt pauzeert Pol II promoter-proximaal.', en: 'Nascent transcript; after ≈ 20–60 nt Pol II pauses promoter-proximally.' } },
    { c: C.muted, t: { nl: 'staart (CTD)', en: 'tail (CTD)' }, m: ['P'], d: { nl: 'De lange staart van het RNA-enzym. De merkjes P (fosfaatgroepjes) erop geven aan in welke fase het enzym zit.', en: 'The long tail of the RNA enzyme. The P marks (phosphate groups) on it show which phase the enzyme is in.' },
      p: { nl: 'C-terminaal domein van Rpb1 (heptadherhalingen YSPTSPS); Ser5-P bij initiatie, Ser2-P bij elongatie.', en: 'C-terminal domain of Rpb1 (YSPTSPS heptad repeats); Ser5-P at initiation, Ser2-P during elongation.' } },
    { c: G.nelf, t: 'NELF', m: ['pauze-eiwit', 'pause protein'], d: { nl: 'Pauze-eiwit: houdt het RNA-enzym even vast vlak na het startpunt.', en: 'Pause protein: holds the RNA enzyme back for a while just after the start site.' },
      p: { nl: 'Negative elongation factor; stabiliseert met DSIF de promoter-proximale pauze.', en: 'Negative elongation factor; together with DSIF it stabilises the promoter-proximal pause.' } },
    { c: G.dsif, t: 'DSIF', d: { nl: 'Een tweede pauze-eiwit. Na het startsein blijft het mee met het enzym.', en: 'A second pause protein. After the go signal it stays with the enzyme.' },
      p: { nl: 'DSIF (SPT4–SPT5); na fosforylering door P-TEFb wordt het een positieve elongatiefactor.', en: 'DSIF (SPT4–SPT5); after phosphorylation by P-TEFb it becomes a positive elongation factor.' } },
    { c: G.ptefb, t: 'P-TEFb (CDK9)', m: ['geeft het startsein', 'gives the go signal'], d: { nl: 'Geeft het startsein: zet merkjes op de pauze-eiwitten en de staart, zodat het enzym verder kan.', en: 'Gives the go signal: puts marks on the pause proteins and the tail, so the enzyme can carry on.' },
      p: { nl: 'Kinase CDK9–cycline T; fosforyleert NELF, DSIF en Ser2 van de CTD, waarna NELF loslaat (pauzevrijgave).', en: 'Kinase CDK9–cyclin T; phosphorylates NELF, DSIF and CTD Ser2, after which NELF dissociates (pause release).' } },
  ],
  steps: [
    { dur: 9000, cam: cam(800, 430, 1400), title: { nl: 'De promoter: het startgebied', en: 'The promoter: the start region' },
      text: { nl: 'Rond het startpunt (+1) liggen korte herkenningsstukjes, zoals de TATA-box. De meeste menselijke genen missen die.', en: 'Short recognition stretches, such as the TATA box, lie around the start point (+1). Most human genes lack it.' } },
    { dur: 9000, cam: cam(720, 430, 1350), title: { nl: 'Een eiwit knikt het DNA', en: 'A protein bends the DNA' },
      text: { nl: 'Het TATA-bindend eiwit (TBP) zit als een zadel op het DNA en knikt het ~80°.', en: 'The TATA-binding protein (TBP) sits on the DNA like a saddle and bends it ~80°.' } },
    { dur: 7000, cam: cam(725, 470, 1220), title: { nl: 'Meer hulpeiwitten binden', en: 'More helper proteins bind' },
      text: { nl: 'Twee hulpeiwitten komen erbij: het ene houdt TBP stevig vast, het andere vormt een brug naar het RNA-enzym.', en: 'Two helper proteins join: one holds TBP firmly in place, the other forms a bridge to the RNA enzyme.' } },
    { dur: 8000, cam: cam(720, 430, 1300), title: { nl: 'Het RNA-enzym komt aan', en: 'The RNA enzyme arrives' },
      text: { nl: 'Het enzym dat RNA maakt (RNA-polymerase II) komt aan en wordt precies boven het startpunt gezet.', en: 'The enzyme that makes RNA (RNA polymerase II) arrives and is placed right above the start point.' } },
    { dur: 7000, cam: cam(720, 430, 1300), title: { nl: 'De startmachine is compleet', en: 'The start machine is complete' },
      text: { nl: 'Nog twee hulpeiwitten komen erbij. De startmachine is nu klaar, maar het DNA is nog dicht.', en: 'Two more helper proteins join. The start machine is now ready, but the DNA is still closed.' } },
    { dur: 8000, cam: cam(730, 460, 1240), title: { nl: 'Het DNA gaat open', en: 'The DNA opens' },
      text: { nl: 'Een hulpeiwit opent met energie (ATP) het DNA bij het startpunt. Het enzym koppelt de eerste RNA-bouwstenen.', en: 'A helper protein uses energy (ATP) to open the DNA at the start point. The enzyme joins the first RNA building blocks.' } },
    { dur: 8000, cam: cam(900, 450, 1200), title: { nl: 'Een fosfaat op de staart', en: 'A phosphate on the tail' },
      text: { nl: 'Het enzym krijgt fosfaatgroepjes op zijn lange staart. Daarna laat het de meeste hulpeiwitten los en vertrekt.', en: 'The enzyme gets phosphate groups on its long tail. It then lets go of most helper proteins and sets off.' } },
    { dur: 8000, cam: cam(790, 450, 1420), title: { nl: 'Een korte pauze', en: 'A short pause' },
      text: { nl: 'Na ~25–50 bouwstenen houden twee eiwitten het enzym even vast. Bij veel menselijke genen is dit een controlepunt.', en: 'After ~25–50 building blocks, two proteins hold the enzyme in place. For many human genes this is a checkpoint.' } },
    { dur: 9000, cam: cam(1200, 450, 1300), title: { nl: 'Het enzym mag verder', en: 'The enzyme may move on' },
      text: { nl: 'Een enzym zet fosfaten op de staart en de pauze-eiwitten. Eén vertrekt, het andere rijdt mee → volgend hoofdstuk.', en: 'An enzyme adds phosphates to the tail and the pause proteins. One leaves, the other rides along → next chapter.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="pr-ruler"></g>
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}" data-label="${T2('DNA-dubbelhelix', 'DNA double helix')}">
      <g id="pr-rungs"></g>
      <path id="pr-s1" stroke="${C.dna}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path id="pr-s2" stroke="${C.dna2}" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
    <g id="pr-elem"></g>
    <g data-node="rnaprocessing" data-nolabel data-color="${C.rna}"><g id="pr-rna"></g></g>
    <g id="pr-gtf"></g>
    <g data-node="rnapol" data-color="${G.pol}" data-label="${T2('RNA-polymerase II (3D)', 'RNA polymerase II (3D)')}"><g id="pr-pol"></g><circle id="pr-polA" data-anchor="rnapol" r="1" fill="none"/></g>
    <g id="pr-elemlab"></g>
    <g data-node="genregulatie" data-color="${G.med}" data-label="${T2('Mediator ← activatoren', 'Mediator ← activators')}"><g id="pr-med"></g><circle id="pr-medA" data-anchor="genregulatie" r="1" fill="none"/></g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Elongatie → transcriptie', 'Elongation → transcription')}"><g id="pr-go"></g><circle id="pr-goA" data-anchor="transcriptie" r="1" fill="none"/></g>
    <g data-node="capping" data-nolabel data-color="${C.rna}"><g id="pr-cap"></g></g>
    <g id="pr-note"></g>
    <g data-node="polymerasen" data-nolabel data-color="${C.prot}"><g id="pr-polbtn"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const setA = (id, x, y, on = 1) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); e.setAttribute('opacity', on ? 1 : 0); };
    let lastKey = '';
    return {
      update(t, s) {
        const { step, p } = s;
        const theta = (step === 0 ? 0 : step === 1 ? ease(sub(p, .25, .7)) : 1) * 80 * Math.PI / 180;
        // positie van het actieve centrum (bp) en opening van de bel
        const polBp = step < 6 ? 1 : step === 6 ? lerp(1, 14, ease(sub(p, .3, 1))) : step === 7 ? lerp(14, 34, ease(sub(p, 0, .5))) : lerp(34, 54, ease(sub(p, .55, 1)));
        const openK = step < 5 ? 0 : step === 5 ? ease(sub(p, .1, .5)) : 1;
        const aX = bx(Math.round(polBp)) + (polBp - Math.round(polBp)) * BP;
        const bubL = step <= 5 ? bx(-9) : aX - 13 * BP * .75, bubR = step <= 5 ? bx(3) : aX + 2 * BP;
        const open = u => { if (openK <= 0) return 0; const d = u < bubL ? bubL - u : u > bubR ? u - bubR : 0; return openK * clamp(1 - d / 30); };
        const ctr = bentCenter(theta);
        const key = theta.toFixed(4) + '|' + openK.toFixed(3) + '|' + aX.toFixed(1);
        if (key !== lastKey) {
          lastKey = key;
          const h = helixAlong(ctr, 96, 1900, { amp: 15, period: 10.5 * BP, step: 4, rungEvery: BP, seq: SEQ, open });
          $('pr-s1').setAttribute('d', h.s1); $('pr-s2').setAttribute('d', h.s2); $('pr-rungs').innerHTML = h.rungs;
        }
        // liniaal
        let r = '';
        for (const b of [-40, -30, -20, -10, 1, 10, 20, 30, 40]) {
          const q = ctr(bx(b));
          if (theta > .05 && b < -24) continue;
          r += `<line x1="${f1(q[0])}" y1="${Y0 + 96}" x2="${f1(q[0])}" y2="${Y0 + 104}" stroke="${C.muted}" stroke-width="2"/>` + txt(q[0], Y0 + 128, b > 0 ? '+' + b : '' + b, b === 1 ? C.text : C.muted, b === 1 ? 22 : 19, 'middle', 700, 'JetBrains Mono');
        }
        r += `<line x1="${theta > .05 ? bx(-24) : bx(-44)}" y1="${Y0 + 100}" x2="${bx(44)}" y2="${Y0 + 100}" stroke="${C.muted}" stroke-width="1.5" opacity=".6"/>`;
        r += `<path d="M${bx(1) - 8},${Y0 - 36} v-34 h30" stroke="${C.text}" stroke-width="3" fill="none" marker-end="url(#arrow)" opacity="${step >= 3 ? .0 : 1}"/>`;
        $('pr-ruler').innerHTML = r;

        // elementen
        let el = '', elLab = '';   // namen van de elementen in een aparte laag boven Pol II (anders verdwijnen Inr/MTE/DPE onder de Pol II-vorm)
        ELEM.forEach((e, i) => {
          const appear = step === 0 ? ease(sub(p, .08 + i * .1, .2 + i * .1)) : 1;
          if (appear <= .01) return;
          const c0 = ctr(bx(e.a) - 8), c1 = ctr(bx(e.b) + 8), cm = ctr((bx(e.a) + bx(e.b)) / 2);
          const rot = Math.atan2(c1[1] - c0[1], c1[0] - c0[0]) * 180 / Math.PI;
          const w = Math.hypot(c1[0] - c0[0], c1[1] - c0[1]);
          const main = MAIN(e.id), ec = main ? e.col : GRIJS;
          el += `<g opacity="${f1(appear)}"><rect x="${f1(cm[0] - w / 2)}" y="${f1(cm[1] - 30)}" width="${f1(w)}" height="60" rx="8" fill="${ec}" fill-opacity="${main ? .16 : .07}" stroke="${ec}" stroke-width="${main ? 3 : 1.5}" stroke-opacity="${main ? 1 : .6}" transform="rotate(${f1(rot)} ${f1(cm[0])} ${f1(cm[1])})"/>`;
          const bent = theta > .05 && e.b < -24;
          const isT = theta > .05 && e.id === 'TATA';
          const lx = isT ? cm[0] - 85 : bent ? cm[0] - 70 : cm[0], ly = isT ? cm[1] + 66 : bent ? cm[1] + 10 : Y0 + 52;   // geknikte TATA-box: label links onder, naast het afbuigende DNA (niet erdoor)
          const nm = e.id === 'TATA' ? T2('TATA-box', 'TATA box') : e.id;
          elLab += `<g opacity="${f1(appear)}">` + txt(lx, ly + 4, nm, ec, main ? 24 : 17, isT ? 'end' : 'middle', main ? 800 : 600);
          elLab += '</g>';
          el += '</g>';
        });
        if (step === 0) el += txt(bx(1) + 30, Y0 - 62, T2('startpunt +1', 'start site +1'), C.text, 24, 'start', 800) +
          `<g opacity="${f1(sub(p, .6, .75))}">${txt(bx(8), Y0 + 176, T2('grijs: andere herkenningsstukjes (niet bij elk gen)', 'grey: other recognition stretches (not in every gene)'), GRIJS, 19, 'middle', 600)}</g>`;
        $('pr-elem').innerHTML = el; $('pr-elemlab').innerHTML = elLab + (step === 5 ? txt(aX - 10, Y0 - 56, T2('eerste RNA', 'first RNA'), C.rna, 19, 'middle') : '');

        // noot over CpG-eilanden (stap 0) + zijpad-knop Pol I/III
        const nOp = step === 0 ? sub(p, .7, .85) : 0;
        $('pr-note').innerHTML = nOp > .01 ? `<g opacity="${f1(nOp)}">` + txt(bx(-40), Y0 - 84, T2('Bij de meeste menselijke genen ontbreekt de TATA-box', 'Most human genes lack a TATA box'), C.trna, 21, 'start', 700) + '</g>' : '';
        $('pr-polbtn').innerHTML = step === 0 ? `<rect x="1060" y="222" width="400" height="48" rx="24" fill="rgba(155,123,255,.12)" stroke="${C.prot}" stroke-width="2"/>` + txt(1260, 254, T2('Pol I- en Pol III-promoters ↗', 'Pol I and Pol III promoters ↗'), '#c9b8ff', 20) : '';

        // algemene transcriptiefactoren
        const T = ctr((bx(-31) + bx(-24)) / 2);
        const fin = (st, a, b) => step < st ? 0 : step === st ? ease(sub(p, a, b)) : 1;
        const leave = step === 6 ? ease(sub(p, .4, .9)) : step > 6 ? 1 : 0;
        let g = '';
        const dOp = fin(1, 0, .25);
        if (dOp > .01) {
          const dy = -160 * (1 - dOp);
          g += `<g opacity="${f1(dOp)}"><path d="M${f1(T[0] - 90)},${f1(T[1] - 20 + dy)} C${f1(T[0] - 110)},${f1(T[1] - 190 + dy)} ${f1(bx(34))},${f1(Y0 - 250 + dy)} ${f1(bx(33))},${f1(Y0 - 40 + dy)}" stroke="${G.d}" stroke-width="34" stroke-opacity=".22" fill="none" stroke-linecap="round"/>` +
            `<path d="M${f1(T[0] - 58)},${f1(T[1] - 18 + dy)} Q${f1(T[0])},${f1(T[1] - 70 + dy)} ${f1(T[0] + 58)},${f1(T[1] - 18 + dy)}" stroke="${G.d}" stroke-width="20" fill="none" stroke-linecap="round"/>` +
            txt(T[0] + 4, T[1] - 60 + dy, 'TBP', '#fff', 20) + (step < 5 ? txt(bx(24), Y0 - 236 + dy, T2('herkent de promoter', 'recognises the promoter'), '#c9b8ff', 21, 'middle', 700) + txt(bx(24), Y0 - 214 + dy, 'TFIID', '#c9b8ff', 15, 'middle', 700) : '');
          if (step >= 1 && step <= 2) g += `<line x1="${bx(2)}" y1="${Y0 - 150}" x2="${bx(2)}" y2="${Y0 - 32}" stroke="${G.d}" stroke-width="2" stroke-dasharray="4 4"/><line x1="${bx(30)}" y1="${Y0 - 150}" x2="${bx(30)}" y2="${Y0 - 32}" stroke="${G.d}" stroke-width="2" stroke-dasharray="4 4"/>` +
            txt(bx(16), Y0 - 124, T2('grijpt ook het startpunt vast', 'also grips the start site'), '#c9b8ff', 19, 'middle', 700) + txt(bx(16), Y0 - 102, T2('(TAF\'s)', '(TAFs)'), '#c9b8ff', 15, 'middle', 600);
          g += '</g>';
        }
        if (step >= 1 && step <= 2 && theta > .1) g += txt(T[0] + 110, Y0 + 190, `≈ ${Math.round(theta * 180 / Math.PI)}°`, C.trna, 22);
        g += rp(T[0] - 150, T[1] - 56, 140, T2('houdt TBP vast', 'holds TBP'), 'TFIIA', G.a, fin(2, .05, .35));
        const B = ctr(bx(-20));
        const tb = fin(3, .05, .45);   // zodra Pol II komt, schuift het TFIIB-label iets opzij, zodat het niet op de Pol II-rand valt
        g += rp(bx(-14) - 60 * tb, Y0 - 70 + 4 * tb, 170, T2('brug naar het enzym', 'bridge to the enzyme'), 'TFIIB', G.b, fin(2, .35, .7) * (1 - leave), 16);
        const polOp = fin(3, .05, .45);
        const px = aX - 30, py = Y0 - 88;
        g += rp(px + 138, py - 108, 120, T2('begeleider', 'escort'), 'TFIIF', G.f,   // TFIIF, TFIIE en TFIIH raken Pol II; TFIIH ligt op het DNA stroomafwaarts (He et al. 2016)
           fin(3, .2, .5) * (1 - leave));
        g += rp(px + 196, py - 46, 120, T2('haalt TFIIH', 'brings TFIIH'), 'TFIIE', G.e, fin(4, .05, .35) * (1 - leave), 16);
        const hOp = fin(4, .35, .7);
        const hx = px + 204, hy = py + 46;
        g += `<g opacity="${f1(hOp * (1 - leave))}">` + prot(hx, hy, 66, 36, G.h, 1, 71) + txt(hx, hy + 2, T2('opener', 'opener'), '#fff', 19, 'middle', 700) + txt(hx, hy + 22, 'TFIIH', '#c9b8ff', 14, 'middle', 700) +
          (step >= 5 && step <= 6 ? txt(hx + 76, hy + 6, step === 5 ? T2('opent het DNA (ATP)', 'opens the DNA (ATP)') : T2('zet P op de staart', 'puts P on the tail'), '#c9b8ff', 19, 'start', 700) : '') + '</g>';
        if (step === 5) g += txt(960, Y0 + 180, T2('het DNA is open: de transcriptiebel', 'the DNA is open: the transcription bubble'), C.text, 21);
        // NELF / DSIF / P-TEFb
        const nelfOp = step === 7 ? sub(p, .45, .7) : step === 8 ? 1 - ease(sub(p, .45, .75)) : 0;
        const dsifOp = step === 7 ? sub(p, .35, .6) : step === 8 ? 1 : 0;
        const pausePx = step === 8 ? aX - 30 : px;
        g += rp(pausePx + 90, py - 150 - (step === 8 ? 120 * ease(sub(p, .45, .75)) : 0), 130, T2('pauze-eiwit', 'pause protein'), 'NELF', G.nelf, nelfOp, 16);
        g += rp(pausePx - 80, py - 150, 130, T2('pauze-eiwit', 'pause protein'), 'DSIF', G.dsif, dsifOp, 16);   // DSIF (op de klem) en NELF tegen de Pol II-omtrek: beide binden Pol II rechtstreeks; vrij van RNA en CTD
        if (step === 8) {
          const pt = ease(sub(p, 0, .3));
          g += rp(pausePx + 5, py - 226, 200, T2('geeft het startsein', 'gives the go signal'), 'P-TEFb (CDK9)', '#4a9a3a', pt, 16);
          if (pt > .3) g += pill(pausePx + 150, py - 166 - 120 * ease(sub(p, .45, .75)), 26, 21, 'P', C.ok, pt * nelfOp, 15) + pill(pausePx - 140, py - 166, 26, 21, 'P', C.ok, pt, 15);   // fosfaat als bolletje op de rand van elk pauze-eiwit (zoals op de staart)
        }
        $('pr-gtf').innerHTML = g;

        // Mediator
        const mOp = fin(3, .5, .8) * (1 - (step === 6 ? ease(sub(p, .4, .9)) : step > 6 ? 1 : 0));
        $('pr-med').innerHTML = prot(bx(-6), 285, 130, 54, G.med, mOp, 81, 'Mediator', 20) +   // ligt tegen Pol II (bovenkant ≈ y 331)
          (mOp > .05 ? `<g opacity="${f1(mOp)}"><line x1="${bx(-6) - 128}" y1="275" x2="${bx(-6) - 196}" y2="249" stroke="${G.med}" stroke-width="3" stroke-dasharray="5 5" marker-end="url(#arrow)"/>` +
            txt(bx(-6) - 206, 247, T2('activatoren', 'activators'), '#c9b8ff', 18, 'end') + '</g>' : '');   // kort naar de (niet getekende) activatoren verderop
        setA('pr-medA', bx(-6), 228, mOp > .5);

        // Pol II + CTD
        let pol = '';
        if (polOp > .01) {
          const dy = -200 * (1 - polOp);
          pol += `<g opacity="${f1(polOp)}" transform="translate(${f1(px)} ${f1(py + dy)})">` +
            polII(0, 88, 160, 92, { col: G.pol, gul: 46, hoog: 2.27, vul: .2, seed: 77, label: T2('RNA-enzym (Pol II)', 'RNA enzyme (Pol II)'), fs: 22, labelY: -150, ...CTDO }) +   // app-vorm (bio.js): het DNA (y = Y0) loopt door de geul
            `<circle cx="30" cy="88" r="7" fill="#fff" opacity=".9" filter="url(#glow)"/>` +
            '';
          const s5 = step < 6 ? 0 : step === 6 ? sub(p, .05, .35) : 1, s2 = step < 8 ? 0 : sub(p, .2, .5);
          // CTD onderaan achteraan via de ctd-optie van bio.polymerase (zelfde plaats als in transcriptie en genregulatie)
          const bd = polCTD(0, 88, 160, 92, CTDO.ctd, CTDO), bead = i => bd[2 + (i >> 1)];   // merktekens pas onder de liniaal: per kraaltje S5P rechts, S2P links
          pol += [0, 2, 4].map(i => pill(bead(i)[0] + 24, bead(i)[1], 26, 21, 'P', '#ffc247', s5, 15)).join('') + [1, 3, 5].map(i => pill(bead(i)[0] - 24, bead(i)[1], 26, 21, 'P', '#5ad17a', s2, 15)).join('');
          if (step >= 6) pol += txt(bead(0)[0] - 56, bead(0)[1] + 6, T2('staart (CTD)', 'tail (CTD)'), C.muted, 19, 'end');
          pol += '</g>';
        }
        $('pr-pol').innerHTML = pol;
        setA('pr-polA', step >= 7 ? px + 80 : px - 40, step >= 7 ? py + 30 : py + 8, polOp > .5);   // in Pol II, vrij van de Mediator erboven   // stap 8–9: knop in Pol II, vrij van DSIF/NELF/P-TEFb

        // RNA
        let rna = '';
        const nt = step < 5 ? 0 : step === 5 ? Math.floor(4 * sub(p, .5, 1)) : Math.max(4, Math.round(polBp + 1));
        if (nt > 0) {
          const pts = [];
          for (let i = 0; i < nt; i++) {
            let x, y;
            if (i < 8) { x = aX - i * BP; y = Y0 - 18; } else { const u = i - 8; x = aX - 8 * BP - u * 9; y = Y0 - 18 - Math.min(u * 9, 110) + Math.max(0, u - 12) * 1.5; }
            pts.push([x, y]);
          }
          rna = `<path d="${pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
          if (step >= 7) rna += txt(pts[pts.length - 1][0] - 14, pts[pts.length - 1][1] - 8, T2(`RNA: ${nt} bouwstenen`, `RNA: ${nt} building blocks`), C.rna, 20, 'end');
          // 'eerste nt' staat in de bovenste labellaag (pr-elemlab)
        }
        $('pr-rna').innerHTML = rna;
        $('pr-cap').innerHTML = '';

        // vervolg
        const goOp = step === 8 ? sub(p, .6, .8) : 0;
        $('pr-go').innerHTML = goOp > .01 ? `<g opacity="${f1(goOp)}">` + arrow(1250, 170, 1480, 170, C.rna, 4) + txt(1365, 148, T2('verder RNA maken', 'keep making RNA'), C.rna, 21) + '</g>' : '';
        setA('pr-goA', 1365, 118, goOp > .5);
      },
    };
  },
};
