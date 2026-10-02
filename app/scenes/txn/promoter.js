import { C, L, T2, svgOpen, pill, txt, mono, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { helixAlong, prot, panel, arrow } from './_txn.js';

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
const G = { d: '#8e6cf0', a: '#6f5bd6', b: '#6f5bd6', f: '#5a4bb8', e: '#5a4bb8', h: '#8e6cf0', pol: '#9b7bff', med: '#6f5bd6', nelf: '#d65a8a', dsif: '#5fa8d6', ptefb: '#7fdc6a' };

export default {
  id: 'promoter',
  title: { nl: 'Promoter & preinitiatiecomplex', en: 'Core promoter & pre-initiation complex' },
  scale: '≈ 90 bp · ≈ 30 nm', time: { nl: 'seconden tot minuten (vertraagd)', en: 'seconds to minutes (slowed down)' },
  org: { nl: 'mens (RNA-polymerase II)', en: 'human (RNA polymerase II)' },
  legend: [[C.dna, { nl: 'coderende streng', en: 'coding strand' }], [C.dna2, { nl: 'matrijsstreng', en: 'template strand' }], ['#ffc247', 'TATA'], ['#ffb27a', 'BRE'], ['#7fdc6a', 'Inr'], ['#5fd3e6', 'MTE / DPE'],
    [G.d, 'TFIID (TBP + TAFs)'], [G.pol, 'RNA-polymerase II'], [C.rna, 'RNA'], [G.nelf, 'NELF'], [G.dsif, 'DSIF'], [G.ptefb, 'P-TEFb (CDK9)']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Consensuscodes: S = G/C, R = A/G, Y = C/T, W = A/T, K = G/T, D = A/G/T, V = A/C/G, N = elke base. De getoonde sequentie is illustratief: hij voldoet aan alle motieven, wat in echte promoters zelden het geval is.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Consensus codes: S = G/C, R = A/G, Y = C/T, W = A/T, K = G/T, D = A/G/T, V = A/C/G, N = any base. The sequence shown is illustrative: it matches every motif, which real promoters rarely do.</p>' },
  simplified: {
    nl: 'Geen enkel kernpromoterelement is universeel; de meeste menselijke promoters liggen in CpG-eilanden zonder TATA-box en starten verspreid over meerdere posities. De buiging (~80°) is als één knik getekend; TFIID, Pol II en de factoren zijn schematische vormen (echte structuren: cryo-EM van het humane PIC). Mediator is enkel aangeduid; +1-nucleosoom en capping zijn weggelaten.',
    en: 'No core promoter element is universal; most human promoters lie in CpG islands without a TATA box and start at several dispersed positions. The bend (~80°) is drawn as one kink; TFIID, Pol II and the factors are schematic shapes (real structures: cryo-EM of the human PIC). Mediator is only indicated; the +1 nucleosome and capping are omitted.' },
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
    { dur: 8000, cam: cam(815, 470, 1030), title: { nl: 'Het DNA gaat open', en: 'The DNA opens' },
      text: { nl: 'Een hulpeiwit opent met energie (ATP) het DNA bij het startpunt. Het enzym koppelt de eerste RNA-bouwstenen.', en: 'A helper protein uses energy (ATP) to open the DNA at the start point. The enzyme joins the first RNA building blocks.' } },
    { dur: 8000, cam: cam(900, 450, 1200), title: { nl: 'Een fosfaat op de staart', en: 'A phosphate on the tail' },
      text: { nl: 'Het enzym krijgt fosfaatgroepjes op zijn lange staart. Daarna laat het de meeste hulpeiwitten los en vertrekt.', en: 'The enzyme gets phosphate groups on its long tail. It then lets go of most helper proteins and sets off.' } },
    { dur: 8000, cam: cam(878, 450, 1150), title: { nl: 'Een korte pauze', en: 'A short pause' },
      text: { nl: 'Na ~20–60 bouwstenen houden twee eiwitten het enzym even vast. Bij veel menselijke genen is dit een controlepunt.', en: 'After ~20–60 building blocks, two proteins hold the enzyme in place. For many human genes this is a checkpoint.' } },
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
        let el = '';
        ELEM.forEach((e, i) => {
          const appear = step === 0 ? ease(sub(p, .08 + i * .1, .2 + i * .1)) : 1;
          if (appear <= .01) return;
          const c0 = ctr(bx(e.a) - 8), c1 = ctr(bx(e.b) + 8), cm = ctr((bx(e.a) + bx(e.b)) / 2);
          const rot = Math.atan2(c1[1] - c0[1], c1[0] - c0[0]) * 180 / Math.PI;
          const w = Math.hypot(c1[0] - c0[0], c1[1] - c0[1]);
          el += `<g opacity="${f1(appear)}"><rect x="${f1(cm[0] - w / 2)}" y="${f1(cm[1] - 30)}" width="${f1(w)}" height="60" rx="8" fill="${e.col}" fill-opacity=".13" stroke="${e.col}" stroke-width="2" transform="rotate(${f1(rot)} ${f1(cm[0])} ${f1(cm[1])})"/>`;
          const bent = theta > .05 && e.b < -24;
          const isT = theta > .05 && e.id === 'TATA';
          const lx = isT ? cm[0] - 105 : bent ? cm[0] - 70 : cm[0], ly = isT ? cm[1] + 36 : bent ? cm[1] + 10 : Y0 + 52;
          el += txt(lx, ly + 4, e.id, e.col, 22, 'middle', 800);
          if (e.seq && step === 0) el += txt(lx, ly + 28, e.seq, C.muted, 19, 'middle', 600, 'JetBrains Mono');
          el += '</g>';
        });
        if (step === 0) el += txt(bx(1) + 30, Y0 - 62, T2('startplaats +1', 'start site +1'), C.text, 20, 'start');
        $('pr-elem').innerHTML = el;

        // noot over CpG-eilanden (stap 0) + zijpad-knop Pol I/III
        const nOp = step === 0 ? sub(p, .7, .85) : 0;
        $('pr-note').innerHTML = nOp > .01 ? `<g opacity="${f1(nOp)}">` + txt(560, 250, T2('Meestal géén TATA-box!', 'Usually no TATA box!'), C.trna, 26) + '</g>' : '';
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
            txt(T[0] + 4, T[1] - 60 + dy, 'TBP', '#fff', 20) + (step < 5 ? txt(bx(30), Y0 - 226 + dy, 'TFIID', '#c9b8ff', 22) : '');
          if (step >= 1 && step <= 2) g += `<line x1="${bx(2)}" y1="${Y0 - 150}" x2="${bx(2)}" y2="${Y0 - 32}" stroke="${G.d}" stroke-width="2" stroke-dasharray="4 4"/><line x1="${bx(30)}" y1="${Y0 - 150}" x2="${bx(30)}" y2="${Y0 - 32}" stroke="${G.d}" stroke-width="2" stroke-dasharray="4 4"/>` +
            txt(bx(16), Y0 - 120, T2('TAF\'s ↔ Inr, DPE', 'TAFs ↔ Inr, DPE'), '#c9b8ff', 20);
          g += '</g>';
        }
        if (step >= 1 && step <= 2 && theta > .1) g += txt(T[0] + 110, Y0 + 190, `≈ ${Math.round(theta * 180 / Math.PI)}°`, C.trna, 22);
        g += pill(T[0] - 128, T[1] - 14, 88, 32, 'TFIIA', G.a, fin(2, .05, .35), 18);
        const B = ctr(bx(-20));
        g += pill(bx(-17), Y0 - 54, 88, 32, 'TFIIB', G.b, fin(2, .35, .7) * (1 - leave), 18);
        const polOp = fin(3, .05, .45);
        const px = aX - 30, py = Y0 - 88;
        g += pill(px + 156, py + 122, 88, 32, 'TFIIF', G.f, fin(3, .2, .5) * (1 - leave), 18);
        g += pill(px + 222, py + 20, 88, 32, 'TFIIE', G.e, fin(4, .05, .35) * (1 - leave), 18);
        const hOp = fin(4, .35, .7);
        const hx = px + 225, hy = py - 66;
        g += `<g opacity="${f1(hOp * (1 - leave))}">` + prot(hx, hy, 76, 40, G.h, 1, 71, 'TFIIH', 18) +
          (step >= 5 && step <= 6 ? txt(hx, hy - 52, step === 5 ? 'XPB · ATP' : 'CDK7 → Ser5', '#c9b8ff', 18) : '') + '</g>';
        if (step === 5) g += txt(800, Y0 + 180, T2('open complex: transcriptiebel', 'open complex: transcription bubble'), C.text, 20);
        // NELF / DSIF / P-TEFb
        const nelfOp = step === 7 ? sub(p, .45, .7) : step === 8 ? 1 - ease(sub(p, .45, .75)) : 0;
        const dsifOp = step === 7 ? sub(p, .35, .6) : step === 8 ? 1 : 0;
        const pausePx = step === 8 ? aX - 30 : px;
        g += pill(pausePx + 120, py - 128 - (step === 8 ? 120 * ease(sub(p, .45, .75)) : 0), 86, 32, 'NELF', G.nelf, nelfOp, 18);
        g += pill(pausePx - 214, py + 30, 86, 32, 'DSIF', G.dsif, dsifOp, 18);   // links van de RNA-uitgang, vrij van de RNA-lijn
        if (step === 8) {
          const pt = ease(sub(p, 0, .3));
          g += pill(pausePx - 20, py - 178, 190, 34, 'P-TEFb (CDK9)', '#4a9a3a', pt, 18);
          if (pt > .3) g += `<g opacity="${f1(pt * nelfOp)}">${txt(pausePx + 176, py - 138 - 120 * ease(sub(p, .45, .75)), 'P', C.ok, 20)}</g><g opacity="${f1(pt)}">${txt(pausePx - 272, py + 22, 'P', C.ok, 20)}</g>`;
        }
        $('pr-gtf').innerHTML = g;

        // Mediator
        const mOp = fin(3, .5, .8) * (1 - (step === 6 ? ease(sub(p, .4, .9)) : step > 6 ? 1 : 0));
        $('pr-med').innerHTML = prot(bx(-6), 240, 130, 54, G.med, mOp, 81, 'Mediator', 20) +
          (mOp > .05 ? `<g opacity="${f1(mOp)}"><line x1="${bx(-6) - 90}" y1="220" x2="${bx(-30)}" y2="170" stroke="${G.med}" stroke-width="3" stroke-dasharray="5 5"/></g>` : '');
        setA('pr-medA', bx(-6), 190, mOp > .5);

        // Pol II + CTD
        let pol = '';
        if (polOp > .01) {
          const dy = -200 * (1 - polOp);
          pol += `<g opacity="${f1(polOp)}" transform="translate(${f1(px)} ${f1(py + dy)})">` +
            `<path d="M-150,-10 C-150,-100 -60,-128 20,-120 C110,-112 160,-70 150,0 C145,70 110,118 20,122 C-70,126 -150,90 -150,-10Z" fill="rgba(155,123,255,.20)" stroke="${G.pol}" stroke-width="3"/>` +
            txt(0, -70, 'Pol II', '#fff', 24) +
            `<circle cx="30" cy="88" r="7" fill="#fff" opacity=".9" filter="url(#glow)"/>` +
            '';
          const s5 = step < 6 ? 0 : step === 6 ? sub(p, .05, .35) : 1, s2 = step < 8 ? 0 : sub(p, .2, .5);
          const bead = i => [-150 - i * 27, -40 - i * 20 + (i % 2 ? 5 : -5)];
          pol += `<path d="M-140,-30 ${[0, 1, 2, 3, 4, 5].map(i => 'L' + bead(i).join(',')).join(' ')}" stroke="${G.pol}" stroke-width="3" fill="none" opacity=".8"/>`;
          [0, 1, 2, 3, 4, 5].forEach(i => { const b = bead(i); pol += `<circle cx="${b[0]}" cy="${b[1]}" r="5" fill="${G.pol}"/>`; });
          pol += [0, 2, 4].map(i => pill(bead(i)[0] + 8, bead(i)[1] - 20, 46, 21, 'S5P', '#ffc247', s5, 14)).join('') + [1, 3, 5].map(i => pill(bead(i)[0] - 8, bead(i)[1] + 20, 46, 21, 'S2P', '#5ad17a', s2, 14)).join('');
          if (step >= 6) pol += txt(-300, -168, 'CTD (YSPTSPS)×52', C.muted, 18, 'end');
          pol += '</g>';
        }
        $('pr-pol').innerHTML = pol;
        setA('pr-polA', step === 7 ? px + 120 : px + 20, step === 7 ? py - 60 : py - 128, polOp > .5);

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
          if (step >= 7) rna += txt(pts[pts.length - 1][0] - 14, pts[pts.length - 1][1] - 8, `${nt} nt`, C.rna, 20, 'end');
          if (step === 5) rna += txt(aX + 10, Y0 - 44, T2('eerste nt', 'first nt'), C.rna, 18, 'start');
        }
        $('pr-rna').innerHTML = rna;
        $('pr-cap').innerHTML = '';

        // vervolg
        const goOp = step === 8 ? sub(p, .6, .8) : 0;
        $('pr-go').innerHTML = goOp > .01 ? `<g opacity="${f1(goOp)}">` + arrow(1250, 170, 1480, 170, C.rna, 4) + txt(1365, 148, T2('productieve elongatie', 'productive elongation'), C.rna, 20) + '</g>' : '';
        setA('pr-goA', 1365, 118, goOp > .5);
      },
    };
  },
};
