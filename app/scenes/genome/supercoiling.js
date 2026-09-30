import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';

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
  ST(8000, cam(800, 420, 1400), 'Een gesloten DNA-domein', 'A closed DNA domain', 'In de kern is DNA vastgemaakt in lussen (of circulair, zoals mitochondriaal DNA): de uiteinden kunnen niet vrij draaien. Ontspannen B-DNA: 1 winding per 10,5 bp.', 'In the nucleus DNA is anchored in loops (or circular, like mitochondrial DNA): the ends cannot rotate freely. Relaxed B-DNA: 1 turn per 10.5 bp.'),
  ST(8500, cam(800, 420, 1400), 'Linking number: Lk = Tw + Wr', 'Linking number: Lk = Tw + Wr', 'Lk = hoe vaak de ene streng rond de andere gaat. Het is een geheel getal dat enkel verandert als een streng breekt. Tw = draaiing rond de as, Wr = kronkeling van de as zelf.', 'Lk = how often one strand winds around the other. It is an integer that only changes if a strand is broken. Tw = twisting around the axis, Wr = coiling of the axis itself.'),
  ST(9000, cam(800, 420, 1400), 'Onderwinden: ΔLk = −2', 'Underwinding: ΔLk = −2', 'Draai je het domein twee windingen terug (met een knip), dan is Lk = 10. Eerst neemt de twist af: het DNA is onderwonden en de strengen gaan makkelijker open.', 'If the domain is unwound by two turns (with a cut), Lk = 10. At first the twist decreases: the DNA is underwound and the strands open more easily.'),
  ST(9500, cam(800, 420, 1400), 'Twist ↔ writhe: supercoil', 'Twist ↔ writhe: supercoil', 'DNA wil ≈ 10,5 bp per winding houden. Een deel van de spanning gaat over in writhe: de as kronkelt tot een plectoneem. Lk blijft 10 = Tw 12 + Wr (−2).', 'DNA prefers ≈ 10.5 bp per turn. Part of the strain converts into writhe: the axis coils into a plectoneme. Lk stays 10 = Tw 12 + Wr (−2).'),
  ST(8500, cam(800, 420, 1400), 'In de cel: negatief gesupercoild', 'In the cell: negatively supercoiled', 'Cellulair DNA is licht onderwonden (σ = ΔLk/Lk₀ ≈ −0,06). Bij de mens zit die spanning grotendeels vast in nucleosomen. Negatieve supercoiling bevordert strengopening, Z-DNA en kruisvormen.', 'Cellular DNA is slightly underwound (σ = ΔLk/Lk₀ ≈ −0.06). In humans this strain is largely held in nucleosomes. Negative supercoiling favours strand opening, Z-DNA and cruciforms.'),
  ST(9500, cam(800, 420, 1400), 'Twin-domain: transcriptie', 'Twin domain: transcription', 'RNA-polymerase kan niet rond het DNA draaien. Vóór het enzym wordt het DNA overwonden (+ supercoils), erachter onderwonden (− supercoils).', 'RNA polymerase cannot rotate around the DNA. Ahead of the enzyme the DNA becomes overwound (+ supercoils), behind it underwound (− supercoils).'),
  ST(9500, cam(800, 420, 1400), 'Topo-isomerase I: één streng knippen', 'Topoisomerase I: cutting one strand', 'TOP1 knipt één streng en blijft er via een tyrosine covalent aan vast. De vrije streng draait rond de intacte streng, daarna wordt de knip gesloten. Zonder ATP; Lk verandert per winding met 1.', 'TOP1 cuts one strand and stays covalently attached via a tyrosine. The free strand rotates around the intact strand, then the nick is sealed. No ATP; Lk changes by 1 per turn.'),
  ST(10000, cam(800, 420, 1400), 'Topo-isomerase II: beide strengen', 'Topoisomerase II: both strands', 'TOP2 knipt een dubbelstreng (G-segment), haalt er een andere dubbelstreng (T-segment) doorheen en sluit de breuk. Dit kost ATP en verandert Lk met 2; zo worden ook dochterchromosomen ontward.', 'TOP2 cuts a double strand (G segment), passes another duplex (T segment) through it and reseals the break. This uses ATP and changes Lk by 2; it also untangles daughter chromosomes.'),
  ST(7500, FULL, 'Samenvatting', 'Summary', 'Topologie van DNA: Lk = Tw + Wr. Topo-isomerasen houden de spanning in balans tijdens transcriptie en replicatie; ze zijn doelwit van kankergeneesmiddelen.', 'DNA topology: Lk = Tw + Wr. Topoisomerases keep strain in balance during transcription and replication; they are targets of anticancer drugs.'),
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
    const k = ease(sub(p, .5, .9));
    st.w = 1 - k; st.tw = 12; st.lk = p < .5 ? 10 : 12;
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
  time: { nl: 'topo-isomerasecyclus: ms – s', en: 'topoisomerase cycle: ms – s' },
  org: { nl: 'mens (TOP1, TOP2A/B)', en: 'human (TOP1, TOP2A/B)' },
  legend: [[C.dna, { nl: 'streng 1', en: 'strand 1' }], [C.dna2, { nl: 'streng 2', en: 'strand 2' }], [C.prot, { nl: 'enzymen', en: 'enzymes' }], [C.histone, { nl: 'vast punt / histonen', en: 'anchor / histones' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Het lint is berekend: het aantal getekende windingen is exact Tw, en de plectoneem heeft twee kruisingen (Wr ≈ −2, rechtshandig gewonden zoals bij negatieve supercoiling). Lk = Tw + Wr blijft kloppen zolang geen streng geknipt wordt.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The ribbon is computed: the number of drawn turns is exactly Tw, and the plectoneme has two crossings (Wr ≈ −2, right-handed interwound as in negative supercoiling). Lk = Tw + Wr holds as long as no strand is cut.</p>' },
  simplified: {
    nl: 'Een domein van 126 bp is te kort voor een echte plectoneem (in werkelijkheid duizenden bp); de verhoudingen zijn didactisch. Wr = −2 geldt benaderend voor een strak gewonden plectoneem met twee kruisingen. Menselijk TOP1 (type IB) laat de streng gecontroleerd draaien en kan per knip één of meer windingen verwijderen; "ΔLk = 1 per doorgang" geldt strikt voor type IA. Enzymvormen zijn schematisch (echte structuren: TOP1–DNA PDB 1A36; TOP2A-ATPase-domein PDB 1ZXM, TOP2B–DNA–etoposide PDB 3QX3).',
    en: 'A 126-bp domain is too short for a real plectoneme (in reality thousands of bp); proportions are didactic. Wr = −2 holds approximately for a tightly wound plectoneme with two crossings. Human TOP1 (type IB) lets the strand rotate in a controlled way and can remove one or more turns per cut; "ΔLk = 1 per passage" strictly applies to type IA. Enzyme shapes are schematic (real structures: TOP1–DNA PDB 1A36; TOP2A ATPase domain PDB 1ZXM, TOP2B–DNA–etoposide PDB 3QX3).' },
  steps: STEPS,
  svg() {
    const menu = (x, y, node, nl, en, col) => `<g data-node="${node}" data-nolabel><rect x="${x - 170}" y="${y - 28}" width="340" height="56" rx="28" fill="#0d1426" stroke="${col}" stroke-width="3"/><circle cx="${x - 142}" cy="${y}" r="8" fill="${col}"/><text x="${x + 10}" y="${y + 8}" font-size="22" text-anchor="middle" fill="#e8edf7" font-family="Inter" font-weight="600">${T2(nl, en)}</text></g>`;
    return svgOpen() + `
      <g id="sc-clamps">
        <rect x="${X0 - 46}" y="${Y0 - 50}" width="46" height="100" rx="10" fill="${C.histone}" opacity=".85"/>
        <rect x="${X1}" y="${Y0 - 50}" width="46" height="100" rx="10" fill="${C.histone}" opacity=".85"/>
        <g id="sc-clamplbl">${txt(X0 - 23, Y0 + 88, T2('vast', 'fixed'), C.muted, 24)}${txt(X1 + 23, Y0 + 88, T2('vast', 'fixed'), C.muted, 24)}</g>
      </g>
      <g id="sc-rib"></g><g id="sc-enz"></g><g id="sc-ann"></g>
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
        let ann = '', enz = '', cnt = '';
        // tellers
        const showCnt = step >= 1 && step <= 7;
        if (showCnt) {
          const hl = step === 1 ? 1 : 0;
          cnt += box(1090, 130, 330, 170) + txt(1115, 180, `Lk = ${num(st.lk)}`, '#fff', 34, 'start', 800, 'JetBrains Mono') +
            txt(1115, 225, `Tw = ${num(st.tw)}`, C.dna, 30, 'start', 700, 'JetBrains Mono') + txt(1115, 268, `Wr = ${num(st.wr)}`, '#ffc247', 30, 'start', 700, 'JetBrains Mono');
        }
        if (step === 0) {
          const k = ease(sub(p, .3, .6));
          ann += `<g opacity="${f1(k)}"><path d="M${X0},${Y0 - 90} H${X0 + 100}" stroke="#fff" stroke-width="2.5" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt(X0 + 50, Y0 - 104, '10,5 bp'.replace(',', L({ nl: ',', en: '.' })), '#fff', 22)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .55, .8)))}">${txt(800, 260, T2('126 bp ÷ 10,5 = 12 windingen → Lk₀ = 12', '126 bp ÷ 10.5 = 12 turns → Lk₀ = 12'), '#fff', 30)}</g>`;
        }
        if (step === 1) {
          const k = ease(sub(p, .1, .35));
          ann += `<g opacity="${f1(k)}">${box(170, 130, 820, 200)}${txt(580, 205, 'Lk = Tw + Wr', '#fff', 52, 'middle', 800, 'JetBrains Mono')}
            ${txt(580, 255, T2('Lk: geheel getal, topologisch (verandert enkel na knippen)', 'Lk: integer, topological (changes only after cutting)'), C.text, 22)}
            ${txt(580, 292, T2('Tw: windingen rond de as · Wr: kronkeling van de as', 'Tw: turns around the axis · Wr: coiling of the axis'), C.muted, 20)}</g>`;
        }
        if (step === 2) {
          const k = ease(sub(p, .15, .6));
          ann += `<g opacity="${f1(sub(p, .05, .2) * (1 - sub(p, .85, 1) * 0))}"><ellipse cx="${X1 + 23}" cy="${Y0}" rx="42" ry="72" fill="none" stroke="#ffc247" stroke-width="4" stroke-dasharray="10 8" transform="rotate(${f1(-k * 720)} ${X1 + 23} ${Y0})"/>${txt(X1 - 60, Y0 - 100, T2('2 windingen terugdraaien', 'unwind 2 turns'), '#ffc247', 22, 'end')}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .65, .85)))}">${txt(700, 300, T2('onderwonden: ≈ 12,6 bp per winding i.p.v. 10,5', 'underwound: ≈ 12.6 bp per turn instead of 10.5'), '#fff', 26)}</g>`;
        }
        if (step === 3) {
          ann += `<g opacity="${f1(ease(sub(p, .7, .85)))}">${txt(430, 250, T2('plectoneem', 'plectoneme'), '#ffc247', 30)}${txt(430, 284, T2('2 kruisingen → Wr ≈ −2', '2 crossings → Wr ≈ −2'), C.muted, 22)}${txt(430, 314, T2('(rechtshandig gewonden)', '(right-handed interwound)'), C.muted, 20)}</g>`;
        }
        if (step === 4) {
          ann += `<g opacity="${f1(ease(sub(p, .05, .25)))}">${box(130, 580, 560, 130)}${txt(410, 628, 'σ = ΔLk / Lk₀', '#fff', 32, 'middle', 800, 'JetBrains Mono')}${txt(410, 675, T2('hier −2/12 ≈ −0,17 · cel ≈ −0,06', 'here −2/12 ≈ −0.17 · cell ≈ −0.06'), C.muted, 24)}</g>`;
          // nucleosoom als toroïdale (linkshandige) supercoil
          const k = ease(sub(p, .35, .6));
          ann += `<g opacity="${f1(k)}">${box(960, 580, 480, 130)}<ellipse cx="1060" cy="645" rx="55" ry="45" fill="${C.histone}" opacity=".6"/>
            <path d="M985,630 C1000,580 1120,580 1125,630 C1130,680 1000,695 995,655 C990,615 1100,600 1135,615" stroke="${C.dna}" stroke-width="7" fill="none"/>
            ${txt(1150, 632, T2('nucleosoom', 'nucleosome'), '#fff', 26, 'start', 700)}${txt(1150, 672, T2('linkshandig · ΔLk ≈ −1', 'left-handed · ΔLk ≈ −1'), C.muted, 24, 'start')}</g>`;
        }
        if (step === 5) {
          const xs = X0 + (X1 - X0) * st.sp;
          enz += `<g><ellipse cx="${f1(xs)}" cy="${Y0}" rx="70" ry="58" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="3"/>${txt(xs, Y0 + 7, 'Pol II', '#fff', 22)}
            <path d="M${f1(xs + 30)},${Y0 - 70} h70" stroke="${C.prot}" stroke-width="4" marker-end="url(#arrow)"/>
            <path d="M${f1(xs - 20)},${Y0 - 55} C${f1(xs - 60)},${Y0 - 140} ${f1(xs - 140)},${Y0 - 150} ${f1(xs - 200)},${Y0 - 200}" stroke="${C.rna}" stroke-width="6" fill="none"/>${txt(xs - 210, Y0 - 212, 'RNA', C.rna, 20)}</g>`;
          const k = ease(sub(p, .3, .5));
          ann += `<g opacity="${f1(k)}"><circle cx="${f1((xs + X1) / 2)}" cy="${Y0 + 110}" r="26" fill="none" stroke="#fff" stroke-width="3"/>${txt((xs + X1) / 2, Y0 + 120, '+', '#fff', 34, 'middle', 800)}${txt((xs + X1) / 2, Y0 + 170, T2('overwonden', 'overwound'), '#fff', 22)}
            <circle cx="${f1((xs + X0) / 2)}" cy="${Y0 + 110}" r="26" fill="none" stroke="#fff" stroke-width="3"/>${txt((xs + X0) / 2, Y0 + 121, '−', '#fff', 36, 'middle', 800)}${txt((xs + X0) / 2, Y0 + 170, T2('onderwonden', 'underwound'), '#fff', 22)}</g>`;
          $('sc-a-tx').setAttribute('cx', f1(xs)); $('sc-a-tx').setAttribute('cy', f1(Y0 - 60));
          ann += `<g opacity="${f1(ease(sub(p, .6, .8)))}">${txt(560, 250, T2('Liu & Wang (1987): het twin-supercoiled-domain-model', 'Liu & Wang (1987): the twin-supercoiled-domain model'), C.muted, 22)}</g>`;
        }
        if (step === 6) {
          const xs = X0 + (X1 - X0) * .3425;
          const on = ease(sub(p, .08, .2)) * (1 - ease(sub(p, .9, 1)));
          enz += `<g opacity="${f1(on)}"><path d="M${f1(xs - 80)},${Y0 - 20} C${f1(xs - 90)},${Y0 - 110} ${f1(xs + 90)},${Y0 - 110} ${f1(xs + 80)},${Y0 - 20} L${f1(xs + 70)},${Y0 + 60} C${f1(xs + 40)},${Y0 + 100} ${f1(xs - 40)},${Y0 + 100} ${f1(xs - 70)},${Y0 + 60} Z" fill="rgba(155,123,255,.28)" stroke="${C.prot}" stroke-width="3"/>${txt(xs, Y0 - 70, 'TOP1', '#fff', 22)}</g>`;
          if (p > .2 && p < .88) ann += `<g>${txt(xs, Y0 + 140, T2('knip in één streng · Tyr–DNA (covalent)', 'nick in one strand · Tyr–DNA (covalent)'), '#ffc247', 22)}</g>`;
          const rot = (p > .3 && p < .5) || (p > .6 && p < .8);
          if (rot) ann += `<ellipse cx="${f1(xs + 150)}" cy="${Y0}" rx="26" ry="60" fill="none" stroke="#ffc247" stroke-width="4" stroke-dasharray="9 7" transform="rotate(${f1(p * 2000)} ${f1(xs + 150)} ${Y0})"/>`;
          ann += `<g opacity="${f1(ease(sub(p, .3, .45)))}">${box(200, 150, 640, 150)}${txt(520, 195, T2('rotatie van de geknipte streng → Lk + 1', 'rotation of the nicked strand → Lk + 1'), '#fff', 24)}${txt(520, 235, T2('geen ATP nodig · relaxeert + én − supercoils', 'no ATP needed · relaxes both + and − supercoils'), C.muted, 21)}${txt(520, 272, T2('geremd door camptothecine (irinotecan, topotecan)', 'inhibited by camptothecin (irinotecan, topotecan)'), C.muted, 20)}</g>`;
        }
        if (step === 7) {
          // enzym op de onderste kruising van de plectoneem
          const cy = Y0 - PH * .25, on = ease(sub(p, .05, .2)) * (1 - ease(sub(p, .9, 1)));
          enz += `<g opacity="${f1(on)}"><ellipse cx="${XM - 60}" cy="${f1(cy)}" rx="60" ry="80" fill="rgba(111,91,214,.3)" stroke="${C.prot2}" stroke-width="3"/><ellipse cx="${XM + 60}" cy="${f1(cy)}" rx="60" ry="80" fill="rgba(111,91,214,.3)" stroke="${C.prot2}" stroke-width="3"/>
            ${txt(XM, f1(cy + 115), T2('TOP2 (dimeer)', 'TOP2 (dimer)'), '#fff', 22)}${pill(XM - 110, cy - 95, 60, 26, 'ATP', '#c9a027', sub(p, .15, .25) * (1 - sub(p, .55, .65)), 14)}${pill(XM + 110, cy - 95, 60, 26, 'ATP', '#c9a027', sub(p, .15, .25) * (1 - sub(p, .55, .65)), 14)}</g>`;
          const k1 = ease(sub(p, .2, .35)), k2 = ease(sub(p, .35, .5));
          if (p > .2 && p < .5) ann += `<g opacity="${f1(k1)}"><path d="M${XM - 30},${f1(cy - 20)} L${XM + 30},${f1(cy + 20)}" stroke="#ff6b6b" stroke-width="5"/><path d="M${XM - 30},${f1(cy + 20)} L${XM + 30},${f1(cy - 20)}" stroke="#ff6b6b" stroke-width="5"/>${txt(XM + 150, f1(cy - 130), T2('dubbelstrengbreuk (G-segment)', 'double-strand break (G segment)'), '#ff6b6b', 22, 'start')}
            <path d="M${XM},${f1(cy - 60)} V${f1(cy + 60 * k2)}" stroke="#ffc247" stroke-width="4" marker-end="url(#arrow)" opacity="${f1(k2)}"/>${txt(XM + 150, f1(cy - 100), T2('T-segment gaat erdoor', 'T segment passes through'), '#ffc247', 22, 'start')}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .5, .65)))}">${box(170, 150, 600, 150)}${txt(470, 195, T2('ΔLk = +2 per doorgang', 'ΔLk = +2 per passage'), '#fff', 26)}${txt(470, 235, T2('ATP-afhankelijk · ontwart ook gekoppelde chromatiden', 'ATP-dependent · also untangles linked chromatids'), C.muted, 20)}${txt(470, 272, T2('geremd door etoposide, doxorubicine', 'inhibited by etoposide, doxorubicin'), C.muted, 20)}</g>`;
        }
        if (step === 8) {
          ann += `${box(230, 170, 520, 215, C.prot)}${txt(490, 215, T2('Topo-isomerase I (TOP1)', 'Topoisomerase I (TOP1)'), C.prot, 26, 'middle', 800)}
            ${[T2('knipt één streng', 'cuts one strand'), T2('geen ATP', 'no ATP'), T2('Lk verandert per winding met 1', 'Lk changes by 1 per turn')].map((l, i) => txt(270, 262 + i * 44, '• ' + l, '#e8edf7', 26, 'start', 500)).join('')}
            ${box(850, 170, 520, 215, C.prot2)}${txt(1110, 215, T2('Topo-isomerase II (TOP2A/B)', 'Topoisomerase II (TOP2A/B)'), '#b3a4ff', 26, 'middle', 800)}
            ${[T2('knipt beide strengen', 'cuts both strands'), T2('ATP-afhankelijk', 'ATP-dependent'), T2('Lk verandert met 2', 'Lk changes by 2')].map((l, i) => txt(890, 262 + i * 44, '• ' + l, '#e8edf7', 26, 'start', 500)).join('')}`;
        }
        $('sc-ann').innerHTML = ann; $('sc-enz').innerHTML = enz; $('sc-cnt').innerHTML = cnt;
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
