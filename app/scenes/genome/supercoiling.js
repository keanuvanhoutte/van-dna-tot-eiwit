import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { eiwitPad, polII } from '../../bio.js';

/*
 * Een DNA-domein tussen twee vaste punten (uiteinden kunnen niet vrij draaien) als tweestrengig lint.
 * Toestand: tw = aantal getekende windingen (Twist), w = plectoneemvorm (0 = recht, 1 = 2 kruisingen, Wr ≈ −2).
 * 1 getekende winding = 1 echte winding (10,5 bp) → het domein is 126 bp (Lk0 = 12).
 */
const X0 = 200, X1 = 1400, Y0 = 500, XM = 800, R = 20, LK0 = 12;
const PA = 46, PH = 300;          // plectoneem: halve afstand tussen de armen, hoogte

function centre(s, w) {
  const straight = [X0 + (X1 - X0) * s, Y0, 0];
  if (w <= 0) return straight;
  const a = PA * w + 1e-3, H = PH * w, sA = .3, sB = .7;
  let q;
  if (s < sA) q = [X0 + (XM - a - X0) * (s / sA), Y0, 0];
  else if (s > sB) q = [XM + a + (X1 - XM - a) * ((s - sB) / (1 - sB)), Y0, 0];
  else {
    const u = (s - sA) / (sB - sA);
    if (u < .45) { const v = u / .45; q = [XM - a * Math.cos(2 * Math.PI * v), Y0 - H * v, -a * Math.sin(2 * Math.PI * v)]; }
    else if (u > .55) { const v = (1 - u) / .45; q = [XM + a * Math.cos(2 * Math.PI * v), Y0 - H * v, a * Math.sin(2 * Math.PI * v)]; }
    else { const tt = (u - .45) / .1; q = [XM - a * Math.cos(Math.PI * tt), Y0 - H - a * 1.1 * Math.sin(Math.PI * tt), 0]; }
  }
  return [lerp(straight[0], q[0], ease(Math.min(1, w))), lerp(straight[1], q[1], ease(Math.min(1, w))), q[2] * Math.min(1, w)];
}

/* twist-fase in windingen; twin = verschuiving (windingen) voor/achter een polymerase op positie sp */
function phase(s, tw, twin = 0, sp = .5) {
  let g = 0;
  if (twin) g = s < sp ? -twin * s / sp : -twin + twin * (s - sp) / (1 - sp);
  return tw * s + g;
}

function ribbon(st) {
  const N = 700, items = [];
  const P = [];
  for (let i = 0; i <= N; i++) { const s = i / N; P.push(centre(s, st.w)); }
  const s1 = [], s2 = [], rungs = [];
  for (let i = 0; i <= N; i++) {
    const s = i / N, a = P[Math.max(0, i - 1)], b = P[Math.min(N, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const nx = -ty, ny = tx, ph = 2 * Math.PI * phase(s, st.tw, st.twin, st.sp);
    const c = P[i];
    s1.push([c[0] + nx * R * Math.cos(ph), c[1] + ny * R * Math.cos(ph), c[2] + R * Math.sin(ph), s]);
    s2.push([c[0] - nx * R * Math.cos(ph), c[1] - ny * R * Math.cos(ph), c[2] - R * Math.sin(ph), s]);
  }
  const gap = (s, g) => g && s > g[0] && s < g[1];
  for (let i = 1; i <= N; i++) {
    for (const [S, col, g] of [[s1, C.dna, st.cut1], [s2, C.dna2, st.cut2]]) {
      const a = S[i - 1], b = S[i];
      if (gap(b[3], g)) continue;
      const d = (a[2] + b[2]) / 2, sh = Math.max(0, Math.min(1, (d + 60) / 120));
      items.push([d, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${col}" stroke-width="7" stroke-linecap="round" opacity="${f1(1 - sh * .45)}"/>`]);
    }
  }
  // basenparen (elke 1/10,5 winding)
  const nb = Math.round(LK0 * 10.5);
  for (let k = 0; k < nb; k++) {
    const s = (k + .5) / nb, i = Math.round(s * N), a = s1[i], b = s2[i];
    if (gap(s, st.cut1) && gap(s, st.cut2)) continue;
    items.push([(a[2] + b[2]) / 2 + .1, `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#93a0bb" stroke-width="2.5" opacity=".45"/>`]);
  }
  items.sort((x, y) => y[0] - x[0]);
  return { svg: items.map(x => x[1]).join(''), P };
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const STEPS = [
  ST(8000, cam(800, 420, 1400), 'De uiteinden zitten vast', 'The ends are held in place', 'DNA zit vast in lussen, dus de uiteinden kunnen niet draaien. Ontspannen maakt het één slag per 10,5 basenparen.', 'DNA is held in loops, so its ends cannot rotate. Relaxed, it makes one turn every 10.5 base pairs.'),
  ST(8500, cam(800, 420, 1400), 'Hoe vaak gaan de strengen rond?', 'How often do the strands wind round?', 'Het getal Lk telt hoe vaak de ene streng rond de andere gaat. Dat verandert alleen als een streng breekt.', 'The number Lk counts how often one strand winds around the other. It only changes if a strand breaks.'),
  ST(9000, cam(800, 420, 1400), 'Het DNA losser draaien', 'Winding the DNA looser', 'Draai je het DNA (na een knip) twee slagen terug, dan is het te los: de strengen gaan makkelijker open.', 'If you turn the DNA (after a cut) back by two turns, it is too loose: the strands open more easily.'),
  ST(9500, cam(800, 420, 1400), 'Het DNA gaat kronkelen', 'The DNA starts to coil', 'DNA wil zijn gewone draaiing houden. Daarom gaat het als geheel kronkelen, zoals een telefoonsnoer.', 'DNA wants to keep its usual twist. So it coils up as a whole, like a telephone cord.'),
  ST(8500, cam(800, 420, 1400), 'In de cel: iets te los', 'In the cell: slightly loose', 'DNA in de cel is iets te los gewonden, vooral rond de nucleosomen. Zo gaan de strengen makkelijker open.', 'DNA in the cell is wound slightly too loosely, mainly around the nucleosomes. This helps the strands open.'),
  ST(9500, cam(800, 420, 1400), 'Strak ervoor, los erachter', 'Tight ahead, loose behind', 'Het enzym dat RNA maakt kan niet rond het DNA draaien. Ervoor raakt het DNA te strak gedraaid, erachter te los.', 'The enzyme that makes RNA cannot turn around the DNA. Ahead of it the DNA gets too tight, behind it too loose.'),
  ST(9500, cam(800, 420, 1400), 'Eén streng knippen', 'Cutting one strand', 'Een enzym (topo-isomerase I) knipt één streng, laat die draaien en plakt hem weer dicht. Zonder ATP.', 'An enzyme (topoisomerase I) cuts one strand, lets it turn and seals it again, without ATP.'),
  ST(10000, cam(800, 420, 1400), 'Beide strengen knippen', 'Cutting both strands', 'Topo-isomerase II knipt beide strengen, haalt er ander DNA door en plakt alles weer dicht. Dit kost ATP.', 'Topoisomerase II cuts both strands, passes other DNA through and seals everything again. This uses ATP.'),
  ST(7500, FULL, 'Kort samengevat', 'In short', 'Deze enzymen houden de spanning in het DNA in balans. Sommige kankermedicijnen remmen ze.', 'These enzymes keep the strain in DNA in balance. Some cancer drugs block them.'),
];

/* toestand per stap */
function state(step, p) {
  const st = { tw: 12, w: 0, lk: 12, twin: 0, sp: .5, cut1: null, cut2: null, fade: 1 };
  if (step === 2) { const k = ease(sub(p, .15, .6)); st.tw = 12 - 2 * k; st.lk = 12 - 2 * k; }
  if (step === 3) { const k = ease(sub(p, .1, .75)); st.tw = 10 + 2 * k; st.w = k; st.lk = 10; }
  if (step === 4) { st.tw = 12; st.w = 1; st.lk = 10; }
  if (step === 5) { st.fade = sub(p, 0, .12); st.sp = lerp(.4, .6, p); st.twin = 2.2 * ease(sub(p, .05, .5)); }
  if (step === 6) {
    st.fade = sub(p, 0, .1);
    const r1 = ease(sub(p, .3, .5)), r2 = ease(sub(p, .6, .8));
    st.tw = 10 + r1 + r2; st.lk = st.tw;
    if (p > .2 && p < .88) st.cut1 = [.335, .35];
  }
  if (step === 7) {
    st.fade = sub(p, 0, .1);
    // na de doorgang (p ≈ .5) springt Lk met 2; de kronkel ontspant meteen mee, zodat teller en vorm overeenkomen
    const k = ease(sub(p, .5, .62));
    st.w = 1 - k; st.tw = 12; st.lk = k < .5 ? 10 : 12;
  }
  if (step === 8) { st.tw = 12; st.w = 0; }
  if (step >= 5 && step !== 7) { if (step !== 6) st.lk = 12; }
  st.wr = st.lk - st.tw;
  return st;
}

export default {
  id: 'supercoiling',
  title: { nl: 'Supercoiling & topo-isomerasen', en: 'Supercoiling & topoisomerases' },
  scale: { nl: '≈ 40 nm (126 bp)', en: '≈ 40 nm (126 bp)' },
  time: { nl: 'spanning ontstaat bij transcriptie en replicatie', en: 'strain arises during transcription and replication' },
  org: { nl: 'mens (TOP1, TOP2A/B)', en: 'human (TOP1, TOP2A/B)' },
  legend: [[C.dna, { nl: 'streng 1', en: 'strand 1' }], [C.dna2, { nl: 'streng 2', en: 'strand 2' }], [C.prot, { nl: 'enzymen', en: 'enzymes' }], [C.histone, { nl: 'vast punt / histonen', en: 'anchor / histones' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Het lint is berekend: het aantal getekende windingen is exact Tw, en de plectoneem heeft twee kruisingen (Wr ≈ −2, rechtshandig gewonden zoals bij negatieve supercoiling). Lk = Tw + Wr blijft kloppen zolang geen streng geknipt wordt.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The ribbon is computed: the number of drawn turns is exactly Tw, and the plectoneme has two crossings (Wr ≈ −2, right-handed interwound as in negative supercoiling). Lk = Tw + Wr holds as long as no strand is cut.</p>' },
  simplified: {
    nl: 'Een domein van 126 bp is te kort voor een echte plectoneem (in werkelijkheid duizenden bp); de verhoudingen zijn didactisch. Wr = −2 geldt benaderend voor een strak gewonden plectoneem met twee kruisingen. Menselijk TOP1 (type IB) laat de streng gecontroleerd draaien en kan per knip één of meer windingen verwijderen; "ΔLk = 1 per doorgang" geldt strikt voor type IA. Enzymvormen zijn schematisch (echte structuren: TOP1–DNA PDB 1A36; TOP2A-ATPase-domein PDB 1ZXM, TOP2B–DNA–etoposide PDB 3QX3).',
    en: 'A 126-bp domain is too short for a real plectoneme (in reality thousands of bp); proportions are didactic. Wr = −2 holds approximately for a tightly wound plectoneme with two crossings. Human TOP1 (type IB) lets the strand rotate in a controlled way and can remove one or more turns per cut; "ΔLk = 1 per passage" strictly applies to type IA. Enzyme shapes are schematic (real structures: TOP1–DNA PDB 1A36; TOP2A ATPase domain PDB 1ZXM, TOP2B–DNA–etoposide PDB 3QX3).' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: { nl: 'streng 1', en: 'strand 1' }, d: { nl: 'De donkerblauwe draad: één streng van het DNA. De grijze streepjes ertussen zijn de basenparen.', en: 'The dark blue thread: one strand of the DNA. The grey dashes between the strands are the base pairs.' },
      p: { nl: 'Eén streng van een DNA-domein van 126 bp, als lint getekend.', en: 'One strand of a 126 bp DNA domain, drawn as a ribbon.' } },
    { c: C.dna2, t: { nl: 'streng 2', en: 'strand 2' }, d: { nl: 'De lichtblauwe draad: de tweede streng, die rond de eerste draait.', en: 'The light blue thread: the second strand, winding around the first.' },
      p: { nl: 'Complementaire streng; de twee strengen vormen samen de duplex.', en: 'Complementary strand; together the two strands form the duplex.' } },
    { c: C.histone, t: { nl: 'vast', en: 'fixed' }, d: { nl: 'De grijze klemmen aan de uiteinden: het DNA zit daar vast en kan niet vrij ronddraaien.', en: 'The grey clamps at the ends: the DNA is held there and cannot turn freely.' },
      p: { nl: 'Topologisch gesloten domein: de uiteinden zijn verankerd (zoals in chromatinelussen), dus Lk is behouden zolang geen streng breekt.', en: 'Topologically closed domain: the ends are anchored (as in chromatin loops), so Lk is conserved as long as no strand breaks.' } },
    { c: '#fff', t: { nl: 'slagen', en: 'turns' }, m: ['1 slag = 10,5 basenparen', '1 turn = 10.5 base pairs', 'ontspannen: 12 slagen', 'relaxed: 12 turns', '(dit getal heet Lk; het verandert alleen als een streng breekt)', '(this number is called Lk; it only changes if a strand breaks)', 'de strengen gaan 2 keer rond elkaar', 'the strands wind 2 times round each other', 'de strengen gaan 5 keer rond elkaar', 'the strands wind 5 times round each other', 'de strengen gaan 8 keer rond elkaar', 'the strands wind 8 times round each other', 'de strengen gaan 12 keer rond elkaar', 'the strands wind 12 times round each other', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], d: { nl: 'De nummers tellen hoe vaak de twee strengen rond elkaar gaan. Ontspannen DNA maakt één slag per 10,5 basenparen; hier zijn dat er 12.', en: 'The numbers count how often the two strands wind round each other. Relaxed DNA makes one turn per 10.5 base pairs; here that is 12.' },
      p: { nl: 'Linking number Lk = Tw + Wr; voor ontspannen B-DNA is Lk₀ = N/10,5 (hier 126/10,5 = 12).', en: 'Linking number Lk = Tw + Wr; for relaxed B-DNA Lk₀ = N/10.5 (here 126/10.5 = 12).' } },
    { c: '#7cb4ff', t: { nl: 'te los gewonden', en: 'wound too loosely' }, m: ['2 slagen terugdraaien', 'turn back 2 turns', '2 slagen minder: nu 10 i.p.v. 12', '2 turns fewer: now 10 instead of 12', '→ te los: de strengen gaan makkelijker open', '→ too loose: the strands open more easily'], d: { nl: 'Draai je het DNA twee slagen terug, dan is het te los gewonden. De strengen gaan dan makkelijker uit elkaar.', en: 'If you turn the DNA back two turns, it is wound too loosely. The strands then come apart more easily.' },
      p: { nl: 'Negatieve supercoiling (ΔLk = −2, σ ≈ −0,17 hier); bevordert het smelten van de duplex.', en: 'Negative supercoiling (ΔLk = −2, σ ≈ −0.17 here); favours duplex melting.' } },
    { c: C.ok, t: { nl: 'spanningsmeter', en: 'strain meter' }, m: ['hoe strak gedraaid?', 'how tightly wound?', 'te los', 'too loose', 'normaal', 'normal', 'te strak', 'too tight'], d: { nl: 'De meter toont hoe strak het DNA gedraaid is: te los, normaal of te strak.', en: 'The meter shows how tightly the DNA is wound: too loose, normal or too tight.' },
      p: { nl: 'Superhelixdichtheid σ = ΔLk/Lk₀: negatief, nul of positief.', en: 'Superhelical density σ = ΔLk/Lk₀: negative, zero or positive.' } },
    { c: C.dna, t: { nl: 'kronkel', en: 'coil' }, m: ['kronkel (2 kruisingen)', 'coil (2 crossings)', 'vangt de 2 ontbrekende', 'takes up the 2 missing', 'slagen op', 'turns'], d: { nl: 'DNA wil zijn gewone draaiing houden. Daarom gaat het als geheel kronkelen, zoals een telefoonsnoer; die kronkel vangt de ontbrekende slagen op.', en: 'DNA wants to keep its usual twist. So it coils as a whole, like a phone cord; that coil takes up the missing turns.' },
      p: { nl: 'Plectoneem met twee kruisingen (Wr ≈ −2): de twist herstelt zich tot Tw ≈ 12 bij gelijkblijvende Lk = 10.', en: 'Plectoneme with two crossings (Wr ≈ −2): twist recovers to Tw ≈ 12 at unchanged Lk = 10.' } },
    { c: C.histone, t: { nl: 'nucleosoom', en: 'nucleosome' }, m: ['linkshandig gewonden', 'left-handed wrap'], d: { nl: 'In de cel wikkelt het DNA zich linksom rond nucleosomen. Daardoor is DNA in de cel iets te los gewonden.', en: 'In the cell the DNA wraps left-handed around nucleosomes. This leaves DNA in the cell slightly underwound.' },
      p: { nl: 'Linkshandige toroïdale wikkeling rond het histonoctameer absorbeert negatieve supercoiling (ongeveer −1 per nucleosoom).', en: 'Left-handed toroidal wrapping around the histone octamer absorbs negative supercoiling (about −1 per nucleosome).' } },
    { c: C.prot, t: 'Pol II', m: ['RNA'], d: { nl: 'Het enzym dat RNA maakt kan niet rond het DNA draaien. Daardoor raakt het DNA ervoor te strak en erachter te los.', en: 'The enzyme that makes RNA cannot turn around the DNA. So the DNA ahead of it gets too tight and behind it too loose.' },
      p: { nl: 'Twin-domainmodel (Liu & Wang): positieve supercoils vóór en negatieve achter de transcriberende polymerase.', en: 'Twin-domain model (Liu & Wang): positive supercoils ahead of and negative supercoils behind the transcribing polymerase.' } },
    { c: C.prot, t: 'TOP1', m: ['geknipte streng draait: 1 slag erbij', 'cut strand turns: 1 turn added', 'geen ATP nodig', 'no ATP needed', 'knip in één streng', 'cut in one strand', 'Topo-isomerase I (TOP1)', 'Topoisomerase I (TOP1)', '• knipt één streng', '• cuts one strand', '• geen ATP', '• no ATP', '• telkens 1 slag erbij of eraf', '• 1 turn added or removed'], d: { nl: 'Een enzym dat één streng knipt, die laat ronddraaien en weer dichtplakt. Het heeft daar geen ATP voor nodig.', en: 'An enzyme that cuts one strand, lets it turn and seals it again. It needs no ATP for this.' },
      p: { nl: 'Type IB-topo-isomerase: enkelstrengsbreuk via een tyrosyl-3′-fosfodiësterbinding, gecontroleerde rotatie; ATP-onafhankelijk. Doelwit van camptothecine.', en: 'Type IB topoisomerase: single-strand break via a tyrosyl-3′-phosphodiester bond, controlled rotation; ATP-independent. Target of camptothecin.' } },
    { c: C.prot, t: 'TOP2', m: ['2 slagen erbij per doorgang', '2 turns added per passage', 'kost ATP', 'uses ATP', 'knip in beide strengen', 'cut in both strands', 'ander stuk DNA gaat erdoor', 'another piece of DNA passes through', 'Topo-isomerase II (TOP2A/B)', 'Topoisomerase II (TOP2A/B)', '• knipt beide strengen', '• cuts both strands', '• ATP-afhankelijk', '• ATP-dependent', '• telkens 2 slagen erbij of eraf', '• 2 turns added or removed'], d: { nl: 'Een enzym dat beide strengen knipt, er een ander stuk DNA doorheen haalt en alles weer dichtplakt. Dat kost ATP.', en: 'An enzyme that cuts both strands, passes another piece of DNA through and seals everything again. This uses ATP.' },
      p: { nl: 'Type IIA-topo-isomerase (TOP2A/B): dubbelstrengsbreuk, passage van een tweede duplex, ΔLk = ±2 per cyclus; ATP-afhankelijk. Doelwit van etoposide en doxorubicine.', en: 'Type IIA topoisomerase (TOP2A/B): double-strand break, passage of a second duplex, ΔLk = ±2 per cycle; ATP-dependent. Target of etoposide and doxorubicin.' } },
    { c: '#5fd3e6', t: 'ATP', d: { nl: 'Het energiemolecuul van de cel. Topo-isomerase II verbruikt het bij elke doorgang.', en: 'The cell’s energy molecule. Topoisomerase II uses it at each passage.' },
      p: { nl: 'ATP-binding en -hydrolyse sturen de N-gate van TOP2.', en: 'ATP binding and hydrolysis drive the N-gate of TOP2.' } },
  ],
  steps: STEPS,
  svg() {
    const menu = (x, y, node, nl, en, col) => `<g data-node="${node}" data-nolabel><rect x="${x - 170}" y="${y - 28}" width="340" height="56" rx="28" fill="#0d1426" stroke="${col}" stroke-width="3"/><circle cx="${x - 142}" cy="${y}" r="8" fill="${col}"/><text x="${x + 10}" y="${y + 8}" font-size="22" text-anchor="middle" fill="#e8edf7" font-family="Inter" font-weight="600">${T2(nl, en)}</text></g>`;
    return svgOpen() + `
      <g id="sc-clamps">
        <path d="${eiwitPad(X0 - 23, Y0, 25, 52, 121, .07)}" fill="${C.histone}" opacity=".85"/>
        <path d="${eiwitPad(X1 + 23, Y0, 25, 52, 122, .07)}" fill="${C.histone}" opacity=".85"/>
        <g id="sc-clamplbl">${txt(X0 - 23, Y0 + 88, T2('vast', 'fixed'), C.muted, 24)}${txt(X1 + 23, Y0 + 88, T2('vast', 'fixed'), C.muted, 24)}</g>
      </g>
      <g id="sc-rib"></g><g id="sc-enz"></g><g id="sc-pol" data-node="transcriptie" data-color="${C.prot}" data-nolabel></g><g id="sc-ann"></g><g id="sc-nucpic" data-node="nucleosoom" data-color="${C.histone}" data-nolabel></g>
      <g id="sc-cnt"></g>
      <g id="sc-hs-tx" data-node="transcriptie" data-color="${C.prot}" data-label="${T2('Transcriptie (Pol II)', 'Transcription (Pol II)')}"><circle id="sc-a-tx" data-anchor="transcriptie" cx="800" cy="400" r="30" fill="transparent"/></g>
      <g id="sc-hs-rep" data-node="replicatie" data-color="${C.dna2}" data-label="${T2('Replicatie: ontwarren', 'Replication: untangling')}"><circle data-anchor="replicatie" cx="560" cy="640" r="20" fill="transparent"/></g>
      <g id="sc-hs-nuc" data-node="nucleosoom" data-color="${C.histone}" data-label="${T2('Nucleosomen houden negatieve supercoils vast', 'Nucleosomes hold negative supercoils')}"><circle data-anchor="nucleosoom" data-pos="below" cx="1200" cy="720" r="20" fill="transparent"/></g>
      <g id="sc-hs-z" data-node="dnavormen" data-color="#f06bc0" data-label="${T2('→ Z-DNA', '→ Z-DNA')}"><circle data-anchor="dnavormen" data-pos="below" cx="290" cy="720" r="20" fill="transparent"/></g>
      <g id="sc-hs-nc" data-node="noncanon" data-color="#ff6b6b" data-label="${T2('→ kruisvorm, H-DNA', '→ cruciform, H-DNA')}"><circle data-anchor="noncanon" data-pos="below" cx="560" cy="720" r="20" fill="transparent"/></g>
      <g id="sc-menu">
        ${menu(430, 760, 'transcriptie', 'Transcriptie', 'Transcription', C.prot)}
        ${menu(800, 760, 'replicatie', 'DNA-replicatie', 'DNA replication', C.dna2)}
        ${menu(1170, 760, 'dnahelix', '↑ De dubbelhelix', '↑ The double helix', C.dna)}
      </g>
      </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const num = x => (Math.abs(x - Math.round(x)) < .05 ? String(Math.round(x)) : x.toFixed(1).replace('.', L({ nl: ',', en: '.' }))).replace('-', '−');
    const box = (x, y, w, h, col = 'rgba(124,196,255,.35)') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#0d1426" stroke="${col}" stroke-width="2" opacity=".95"/>`;
    return {
      update(t, s) {
        const { step, p } = s;
        const st = state(step, p);
        const rb = ribbon(st);
        $('sc-rib').innerHTML = `<g opacity="${f1(st.fade)}">${rb.svg}</g>`;
        let ann = '', enz = '', cnt = '', pol = '', nucpic = '', nucOp = 0;
        // eenvoudige meter: hoe strak is het DNA gedraaid? (te los ↔ normaal ↔ te strak; volgt het aantal slagen Lk)
        const showCnt = step >= 2 && step <= 7 && step !== 5;
        if (showCnt) {
          const mx = 1255 + clamp((st.lk - LK0) * 46.5, -130, 130);
          cnt += box(1090, 130, 330, 160) + txt(1255, 172, T2('hoe strak gedraaid?', 'how tightly wound?'), '#fff', 24) +
            `<rect x="1115" y="200" width="93" height="22" rx="6" fill="#4f8ff7" opacity=".55"/><rect x="1208" y="200" width="94" height="22" fill="${C.ok}" opacity=".55"/><rect x="1302" y="200" width="93" height="22" rx="6" fill="#ff6b6b" opacity=".55"/>` +
            `<path d="M${f1(mx)},226 l-11,-0 l11,-18 l11,18 z" transform="rotate(180 ${f1(mx)} 217)" fill="#fff"/><rect x="${f1(mx - 3)}" y="196" width="6" height="30" rx="2" fill="#fff"/>` +
            txt(1102, 254, T2('te los', 'too loose'), '#7cb4ff', 18, 'start') + txt(1255, 280, T2('normaal', 'normal'), C.ok, 18) + txt(1408, 254, T2('te strak', 'too tight'), '#ff8a8a', 18, 'end');
        }
        // genummerde slagen boven de helix: zo zie je hoeveel keer de strengen rond elkaar gaan
        const turnNums = op => {
          if (op <= 0 || st.w > 0) return '';
          let o = '';
          const n = Math.floor(st.tw + .5);
          for (let k = 1; k <= n; k++) {
            const sk = (k - .5) / st.tw; if (sk > 1) break;
            const x = X0 + (X1 - X0) * sk;
            o += `<circle cx="${f1(x)}" cy="${Y0 - 58}" r="15" fill="#0d1426" stroke="#ffc247" stroke-width="2"/>` + txt(x, Y0 - 51, String(k), '#ffc247', 19, 'middle', 700);
          }
          return `<g opacity="${f1(op)}">${o}</g>`;
        };
        if (step === 0) {
          const k = ease(sub(p, .3, .6));
          ann += `<g opacity="${f1(k)}"><path d="M${X0},${Y0 - 100} H${X0 + 100}" stroke="#fff" stroke-width="2.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt(X0 + 50, Y0 - 114, T2('1 slag = 10,5 basenparen', '1 turn = 10.5 base pairs'), '#fff', 22, 'start')}</g>`;
          ann += turnNums(ease(sub(p, .55, .8)));
          ann += `<g opacity="${f1(ease(sub(p, .6, .85)))}">${txt(800, 280, T2('ontspannen: 12 slagen', 'relaxed: 12 turns'), '#fff', 30)}</g>`;
        }
        if (step === 1) {
          // de slagen één voor één tellen
          const n = Math.min(12, Math.floor(clamp(sub(p, .05, .75)) * 12.999));
          let o = '';
          for (let k = 1; k <= 12; k++) {
            const x = X0 + (X1 - X0) * (k - .5) / 12;
            o += `<g opacity="${k <= n ? 1 : .3}"><circle cx="${f1(x)}" cy="${Y0 - 58}" r="15" fill="#0d1426" stroke="#ffc247" stroke-width="2"/>` + txt(x, Y0 - 51, String(k), '#ffc247', 19, 'middle', 700) + '</g>';
          }
          ann += o + (n < 1 ? "" : txt(800, 300, T2(`de strengen gaan ${n} keer rond elkaar`, `the strands wind ${n} times round each other`), '#fff', 30)) +
            `<g opacity="${f1(ease(sub(p, .78, .92)))}">${txt(800, 340, T2('(dit getal heet Lk; het verandert alleen als een streng breekt)', '(this number is called Lk; it only changes if a strand breaks)'), C.muted, 22)}</g>`;
        }
        if (step === 2) {
          const k = ease(sub(p, .15, .6));
          ann += `<g opacity="${f1(sub(p, .05, .2))}"><ellipse cx="${X1 + 23}" cy="${Y0}" rx="42" ry="72" fill="none" stroke="#ffc247" stroke-width="4" stroke-dasharray="10 8" transform="rotate(${f1(-k * 720)} ${X1 + 23} ${Y0})"/>${txt(X1 + 23, Y0 - 140, T2('2 slagen terugdraaien', 'turn back 2 turns'), '#ffc247', 22, 'end')}</g>`;
          ann += turnNums(1);
          ann += `<g opacity="${f1(ease(sub(p, .65, .85)))}">${txt(640, 300, T2('2 slagen minder: nu 10 i.p.v. 12', '2 turns fewer: now 10 instead of 12'), '#fff', 30)}${txt(640, 342, T2('→ te los: de strengen gaan makkelijker open', '→ too loose: the strands open more easily'), '#7cb4ff', 24)}</g>`;
        }
        if (step === 3) {
          ann += `<g opacity="${f1(ease(sub(p, .7, .85)))}">${txt(430, 250, T2('kronkel (2 kruisingen)', 'coil (2 crossings)'), '#ffc247', 30)}${txt(430, 286, T2('vangt de 2 ontbrekende', 'takes up the 2 missing'), C.muted, 22)}${txt(430, 314, T2('slagen op', 'turns'), C.muted, 22)}</g>`;
        }
        if (step === 4) {
          // nucleosoom als toroïdale (linkshandige) supercoil
          const k = ease(sub(p, .35, .6));
          nucOp = k;   // opacity op de hotspotgroep zelf, zodat de engine hem pas klikbaar maakt als hij zichtbaar is
          nucpic += `<g>${box(960, 580, 480, 130)}<path d="${eiwitPad(1060, 645, 55, 45, 1282, .07)}" fill="${C.histone}" opacity=".6"/>
            <path d="M985,630 C1000,580 1120,580 1125,630 C1130,680 1000,695 995,655 C990,615 1100,600 1135,615" stroke="${C.dna}" stroke-width="7" fill="none"/>
            ${txt(1150, 632, T2('nucleosoom', 'nucleosome'), '#fff', 26, 'start', 700)}${txt(1150, 672, T2('linkshandig gewonden', 'left-handed wrap'), C.muted, 24, 'start')}</g>`;
        }
        if (step === 5) {
          const xs = X0 + (X1 - X0) * st.sp;
          // Pol II (app-vorm, bio.js): klem boven, kaak onder, het DNA loopt door de geul ertussen; RNA bovenaan achteraan eruit
          pol += `<g>${polII(xs, Y0, 76, 50, { gul: 20, hoog: 1.4, vul: .4, uit: 1.05, seed: 1325, label: 'Pol II', fs: 22, labelY: -34 })}
            <path d="M${f1(xs + 30)},${Y0 - 70} h70" stroke="${C.prot}" stroke-width="4" marker-end="url(#arrow)"/>
            <path d="M${f1(xs - 20)},${Y0 - 55} C${f1(xs - 60)},${Y0 - 140} ${f1(xs - 140)},${Y0 - 150} ${f1(xs - 200)},${Y0 - 200}" stroke="${C.rna}" stroke-width="6" fill="none"/>${txt(xs - 210, Y0 - 212, 'RNA', C.rna, 20)}</g>`;
          const k = ease(sub(p, .3, .5));
          ann += `<g opacity="${f1(k)}"><circle cx="${f1((xs + X1) / 2)}" cy="${Y0 + 110}" r="26" fill="none" stroke="#fff" stroke-width="3"/>${txt((xs + X1) / 2, Y0 + 120, '+', '#fff', 34, 'middle', 800)}${txt((xs + X1) / 2, Y0 + 170, T2('te strak', 'too tight'), '#ff8a8a', 24)}
            <circle cx="${f1((xs + X0) / 2)}" cy="${Y0 + 110}" r="26" fill="none" stroke="#fff" stroke-width="3"/>${txt((xs + X0) / 2, Y0 + 121, '−', '#fff', 36, 'middle', 800)}${txt((xs + X0) / 2, Y0 + 170, T2('te los', 'too loose'), '#7cb4ff', 24)}</g>`;
          $('sc-a-tx').setAttribute('cx', f1(xs)); $('sc-a-tx').setAttribute('cy', f1(Y0 - 60));
        }
        if (step === 6) {
          const xs = X0 + (X1 - X0) * .3425;
          const on = ease(sub(p, .08, .2)) * (1 - ease(sub(p, .9, 1)));
          enz += `<g opacity="${f1(on)}"><path d="M${f1(xs - 80)},${Y0 - 20} C${f1(xs - 90)},${Y0 - 110} ${f1(xs + 90)},${Y0 - 110} ${f1(xs + 80)},${Y0 - 20} L${f1(xs + 70)},${Y0 + 60} C${f1(xs + 40)},${Y0 + 100} ${f1(xs - 40)},${Y0 + 100} ${f1(xs - 70)},${Y0 + 60} Z" fill="rgba(155,123,255,.28)" stroke="${C.prot}" stroke-width="3"/>${txt(xs, Y0 - 70, 'TOP1', '#fff', 22)}</g>`;
          if (p > .2 && p < .88) ann += `<g>${txt(xs, Y0 + 140, T2('knip in één streng', 'cut in one strand'), '#ffc247', 24)}</g>`;
          const rot = (p > .3 && p < .5) || (p > .6 && p < .8);
          if (rot) ann += `<ellipse cx="${f1(xs + 150)}" cy="${Y0}" rx="26" ry="60" fill="none" stroke="#ffc247" stroke-width="4" stroke-dasharray="9 7" transform="rotate(${f1(p * 2000)} ${f1(xs + 150)} ${Y0})"/>`;
          ann += `<g opacity="${f1(ease(sub(p, .3, .45)))}">${box(200, 150, 640, 120)}${txt(520, 198, T2('geknipte streng draait: 1 slag erbij', 'cut strand turns: 1 turn added'), '#fff', 26)}${txt(520, 242, T2('geen ATP nodig', 'no ATP needed'), C.muted, 22)}</g>`;
        }
        if (step === 7) {
          // enzym op de onderste kruising van de plectoneem
          const cy = Y0 - PH * .25, on = ease(sub(p, .05, .2)) * (1 - ease(sub(p, .9, 1)));
          enz += `<g opacity="${f1(on)}"><path d="${eiwitPad(XM - 60, cy, 60, 80, 1473, .07)}" fill="rgba(111,91,214,.3)" stroke="${C.prot2}" stroke-width="3"/><path d="${eiwitPad(XM + 60, cy, 60, 80, 1474, .07)}" fill="rgba(111,91,214,.3)" stroke="${C.prot2}" stroke-width="3"/>
            ${txt(XM, f1(cy + 115), T2('TOP2', 'TOP2'), '#fff', 22)}${pill(XM - 110, cy - 95, 60, 26, 'ATP', '#5fd3e6', sub(p, .15, .25) * (1 - sub(p, .55, .65)), 14)}${pill(XM + 110, cy - 95, 60, 26, 'ATP', '#5fd3e6', sub(p, .15, .25) * (1 - sub(p, .55, .65)), 14)}</g>`;
          const k1 = ease(sub(p, .2, .35)), k2 = ease(sub(p, .35, .5));
          if (p > .2 && p < .5) ann += `<g opacity="${f1(k1)}"><path d="M${XM - 30},${f1(cy - 20)} L${XM + 30},${f1(cy + 20)}" stroke="#ff6b6b" stroke-width="5"/><path d="M${XM - 30},${f1(cy + 20)} L${XM + 30},${f1(cy - 20)}" stroke="#ff6b6b" stroke-width="5"/>${txt(XM + 150, f1(cy - 130), T2('knip in beide strengen', 'cut in both strands'), '#ff6b6b', 22, 'start')}
            <path d="M${XM},${f1(cy - 60)} V${f1(cy + 60 * k2)}" stroke="#ffc247" stroke-width="4" marker-end="url(#arrow)" opacity="${f1(k2)}"/>${txt(XM + 150, f1(cy - 100), T2('ander stuk DNA gaat erdoor', 'another piece of DNA passes through'), '#ffc247', 22, 'start')}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .5, .65)))}">${box(170, 150, 600, 120)}${txt(470, 198, T2('2 slagen erbij per doorgang', '2 turns added per passage'), '#fff', 26)}${txt(470, 242, T2('kost ATP', 'uses ATP'), C.muted, 22)}</g>`;
        }
        if (step === 8) {
          ann += `${box(230, 170, 520, 215, C.prot)}${txt(490, 215, T2('Topo-isomerase I (TOP1)', 'Topoisomerase I (TOP1)'), C.prot, 26, 'middle', 800)}
            ${[T2('knipt één streng', 'cuts one strand'), T2('geen ATP', 'no ATP'), T2('telkens 1 slag erbij of eraf', '1 turn added or removed')].map((l, i) => txt(270, 262 + i * 44, '• ' + l, '#e8edf7', 26, 'start', 500)).join('')}
            ${box(850, 170, 520, 215, C.prot2)}${txt(1110, 215, T2('Topo-isomerase II (TOP2A/B)', 'Topoisomerase II (TOP2A/B)'), '#b3a4ff', 26, 'middle', 800)}
            ${[T2('knipt beide strengen', 'cuts both strands'), T2('ATP-afhankelijk', 'ATP-dependent'), T2('telkens 2 slagen erbij of eraf', '2 turns added or removed')].map((l, i) => txt(890, 262 + i * 44, '• ' + l, '#e8edf7', 26, 'start', 500)).join('')}`;
        }
        $('sc-ann').innerHTML = ann; $('sc-enz').innerHTML = enz; $('sc-cnt').innerHTML = cnt; $('sc-pol').innerHTML = pol; $('sc-nucpic').innerHTML = nucpic; $('sc-nucpic').setAttribute('opacity', f1(nucOp));
        vis('sc-clamps', step === 8 ? .3 : 1);
        $('sc-clamplbl').setAttribute('opacity', f1(step === 4 ? 1 - sub(p, .05, .25) : step === 5 ? sub(p, 0, .2) : 1));   // 'vast' wijkt voor de kaders in stap 4
        $('sc-rib').setAttribute('opacity', step === 8 ? '.3' : '1');
        vis('sc-hs-tx', step === 5 ? sub(p, .5, .6) : 0);
        vis('sc-hs-rep', step === 7 ? sub(p, .7, .8) : 0);
        vis('sc-hs-nuc', step === 4 ? sub(p, .6, .7) : 0);
        vis('sc-hs-z', step === 4 ? sub(p, .85, .95) : 0);
        vis('sc-hs-nc', step === 4 ? sub(p, .85, .95) : 0);
        vis('sc-menu', step === 8 ? ease(sub(p, .15, .35)) : 0);
      },
    };
  },
};
