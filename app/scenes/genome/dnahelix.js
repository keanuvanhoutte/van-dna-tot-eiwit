import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1, SPIN } from '../../kit.js';
import { buildHelix, drawHelix, grooveFront, projector } from './_b_helix.js';
import { loadPDB, drawPDB } from './_b_pdb.js';

/* 24 bp; begint met de Dickerson-sequentie CGCGAATTCGCG (PDB 1BNA) */
const SEQ = 'CGCGAATTCGCGATGCCTAGGATC';
const H = buildHelix('B', SEQ);
const CX = 800, CY = 430, S = 15;
const HLNT = 5;          // opgelichte nucleotide (streng I)
const HLBP = 16;         // opgelicht basenpaar

const ST = (dur, camv, nl, en, tnl, ten, spin) => ({ dur, cam: camv, spin, title: { nl, en }, text: { nl: tnl, en: ten } });
const STEPS = [
  ST(7500, FULL, 'De dubbelhelix', 'The double helix', 'DNA bestaat uit twee strengen die om elkaar heen draaien, als een wenteltrap. In de cel draait die naar rechts.', 'DNA consists of two strands winding around each other, like a spiral staircase. In the cell it turns to the right.', .012),
  ST(8000, cam(800, 430, 1500), 'Twee strengen in tegenrichting', 'Two strands, opposite directions', "Elke streng heeft een richting, van 5′ naar 3′. De twee strengen lopen in tegengestelde richting.", "Each strand has a direction, from 5′ to 3′. The two strands run in opposite directions.", .01),
  ST(8500, cam(560, 430, 900), 'De ruggengraat zit buiten', 'The backbone is outside', 'Buiten wisselen suiker en fosfaat elkaar af: de ruggengraat. Elk fosfaat is negatief geladen.', 'On the outside, sugar and phosphate alternate: the backbone. Every phosphate is negatively charged.', .006),
  ST(8500, cam(1030, 430, 900), 'De letters zitten binnen', 'The letters are inside', 'De platte basen zitten binnenin, in paren: A met T, G met C. Ze liggen op elkaar gestapeld als munten.', 'The flat bases sit inside, in pairs: A with T, G with C. They are stacked like coins.', .005),
  ST(8500, cam(800, 430, 1360), 'Een brede en een smalle groef', 'A wide and a narrow groove', 'Tussen de strengen ontstaan een brede en een smalle groef. Eiwitten lezen de basen vooral via de brede groef.', 'A wide and a narrow groove form between the strands. Proteins read the bases mainly through the wide groove.', .004),
  ST(8500, cam(800, 420, 1500), 'Hoe groot is DNA?', 'How big is DNA?', 'De helix is ongeveer 2 nm breed. Na zo’n 10,5 basenparen is hij één keer rond, over ongeveer 3,5 nm.', 'The helix is about 2 nm wide. After about 10.5 base pairs it has gone round once, over about 3.5 nm.', 0),
  ST(8500, cam(800, 430, 900), 'Van bovenaf bekeken', 'Seen from above', 'Elk basenpaar staat ongeveer 34° gedraaid ten opzichte van het vorige. Na 10,5 paren is het rondje vol.', 'Each base pair is turned about 34° from the one before. After 10.5 pairs it has come full circle.', 0),
  ST(9000, cam(800, 430, 1250), 'Het echte molecuul', 'The real molecule', 'Een echt stukje DNA van 12 basenparen, gemeten in een kristal. Elk bolletje is een atoom.', 'A real piece of DNA of 12 base pairs, measured in a crystal. Each sphere is an atom.', .012),
  ST(9000, FULL, 'Verder inzoomen of doorgaan', 'Zoom in further or continue', 'Klik op een onderdeel om in te zoomen. Daarna: hoe een gen in dit DNA wordt aangezet.', 'Click a part to zoom in. After that: how a gene in this DNA is switched on.', .01),
];
const STARTS = []; { let a = 0; for (const s of STEPS) { STARTS.push(a); a += s.dur; } }
/* draaihoek = integraal van de draaisnelheid per stap (continu, deterministisch) */
function spinAt(step, p) { let a = 25; for (let i = 0; i < step; i++) a += STEPS[i].dur * STEPS[i].spin * SPIN; return a + p * STEPS[step].dur * STEPS[step].spin * SPIN; }

export default {
  id: 'dnahelix',
  title: { nl: 'DNA-dubbelhelix', en: 'DNA double helix' },
  scale: { nl: '≈ 2 nm breed', en: '≈ 2 nm wide' },
  time: { nl: 'structuur (draait enkel om te bekijken)', en: 'structure (rotates only for viewing)' },
  org: { nl: 'mens (B-DNA)', en: 'human (B-DNA)' },
  legend: [[C.dna, { nl: "streng I (5'→3' naar rechts)", en: "strand I (5'→3' to the right)" }], [C.dna2, { nl: 'streng II (antiparallel)', en: 'strand II (antiparallel)' }], ['#ff9f43', { nl: 'fosfaat', en: 'phosphate' }], ['#c9a574', 'deoxyribose'], [BASE.A, 'A'], [BASE.T, 'T'], [BASE.G, 'G'], [BASE.C, 'C']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Het model is geen tekening maar een berekende helix: posities van fosfaat, suiker en basen volgen uit de B-DNA-parameters (10,5 bp/winding, 3,38 Å/bp), met de hoeken afgeleid uit PDB 1BNA. Stap 8 toont de echte atomen van 1BNA.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The model is not a drawing but a computed helix: positions of phosphate, sugar and bases follow from the B-DNA parameters (10.5 bp/turn, 3.38 Å/bp), with angles derived from PDB 1BNA. Step 8 shows the real atoms of 1BNA.</p>' },
  simplified: {
    nl: 'Geïdealiseerde, rechte B-helix: echte DNA-sequenties buigen en variëren lokaal in twist (±5–10°) en groefbreedte. Basen zijn als staafjes getekend, suiker en fosfaat als bolletjes; waterstofbruggen als streepjes (2 of 3). Watermoleculen, ionen (Mg²⁺, Na⁺) en de histonen van het nucleosoom zijn weggelaten. In 1BNA is de as uit de traagheidsas geschat; het molecuul is licht gebogen, dus gemeten waarden wijken iets af.',
    en: 'Idealised, straight B helix: real DNA sequences bend and vary locally in twist (±5–10°) and groove width. Bases are drawn as bars, sugar and phosphate as spheres; hydrogen bonds as ticks (2 or 3). Water, ions (Mg²⁺, Na⁺) and the nucleosome histones are omitted. For 1BNA the axis is estimated from the principal axis of inertia; the molecule is slightly bent, so measured values deviate a little.' },
  steps: STEPS.map(({ spin, ...s }) => s),
  svg() {
    const menu = (x, y, node, nl, en, col, extra = '') => `<g data-node="${node}" data-nolabel ${extra} class="bmenu"><rect x="${x - 150}" y="${y - 27}" width="300" height="54" rx="27" fill="#0d1426" stroke="${col}" stroke-width="3"/><circle cx="${x - 124}" cy="${y}" r="8" fill="${col}"/><text x="${x + 8}" y="${y + 8}" font-size="21" text-anchor="middle" fill="#e8edf7" font-family="Inter" font-weight="600">${T2(nl, en)}</text></g>`;
    return svgOpen() + `
    <g id="dh-nuc" data-node="nucleosoom" data-color="${C.histone}" data-label="${T2('← terug: nucleosoom', '← back: nucleosome')}">
      <circle cx="150" cy="170" r="62" fill="rgba(138,147,168,.35)" stroke="${C.histone}" stroke-width="3"/>
      <path d="M70,150 C90,95 210,95 222,160 C232,225 110,240 82,195 C62,160 120,118 175,130" stroke="${C.dna}" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M175,130 C215,140 250,200 330,260" stroke="${C.dna}" stroke-width="9" fill="none" stroke-dasharray="3 12" stroke-linecap="round"/>
      ${txt(150, 272, T2('nucleosoom', 'nucleosome'), C.muted, 24)}
      <circle data-anchor="nucleosoom" cx="150" cy="100" r="1" fill="none"/>
    </g>
    <g id="dh-grooves-lbl"></g>
    <g id="dh-helix"></g>
    <g id="dh-pdb"></g>
    <g id="dh-ann"></g>
    <g id="dh-hs-nt" data-node="nucleotide" data-color="#c9a574" data-label="${T2('Nucleotide: suiker + fosfaat + base', 'Nucleotide: sugar + phosphate + base')}"><circle id="dh-a-nt" data-anchor="nucleotide" r="26" fill="transparent"/></g>
    <g id="dh-hs-bp" data-node="basenparing" data-color="${BASE.G}" data-label="${T2('Basenparing (A–T, G–C)', 'Base pairing (A–T, G–C)')}"><circle id="dh-a-bp" data-anchor="basenparing" r="30" fill="transparent"/></g>
    <g id="dh-hs-gr" data-node="genregulatie" data-color="${C.prot}" data-label="${T2('Grote groef: hier lezen transcriptiefactoren → genregulatie', 'Major groove: read by transcription factors → gene regulation')}"><circle id="dh-a-gr" data-anchor="genregulatie" r="30" fill="transparent"/></g>
    <g id="dh-hs-forms" data-node="dnavormen" data-color="${C.dna2}" data-label="${T2('B-vorm · ook A- en Z-DNA', 'B form · also A- and Z-DNA')}"><circle id="dh-a-forms" data-anchor="dnavormen" r="30" fill="transparent"/></g>
    <g id="dh-hs-atlas" data-node="dnavormen" data-href="../atlas/index.html?id=bdna" data-nolabel>
      <rect x="1080" y="150" width="330" height="50" rx="25" fill="#0d1426" stroke="#7cc4ff" stroke-width="2.5"/>
      ${txt(1245, 183, T2('B-DNA in 3D (atlas) ↗', 'B-DNA in 3D (atlas) ↗'), '#7cc4ff', 23)}
    </g>
    <g id="dh-menu">
      ${menu(420, 150, 'nucleotide', 'Nucleotide', 'Nucleotide', '#c9a574')}
      ${menu(800, 150, 'basenparing', 'Basenparing', 'Base pairing', BASE.G)}
      ${menu(1180, 150, 'dnavormen', 'A-, B- en Z-DNA', 'A-, B- and Z-DNA', C.dna2)}
      ${menu(420, 715, 'supercoiling', 'Supercoiling', 'Supercoiling', C.dna)}
      ${menu(800, 715, 'noncanon', 'G-quadruplex, triplex…', 'G-quadruplex, triplex…', BASE.T)}
      <g data-node="genregulatie" data-nolabel><rect x="1030" y="688" width="300" height="54" rx="27" fill="${C.prot}" stroke="${C.prot}" stroke-width="3"/>
        <text x="1180" y="723" font-size="21" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">${T2('Verder: genregulatie →', 'Next: gene regulation →')}</text></g>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    let mol = null, err = null;
    loadPDB('1BNA').then(m => { mol = m; }).catch(e => { err = e.message; });
    const setA = (id, q) => { const e = $(id); if (e && q) { e.setAttribute('cx', f1(q[0])); e.setAttribute('cy', f1(q[1])); } };
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const callout = (q, tx, ty, text, col = '#e8edf7', fs = 18, anchor = 'middle') =>
      `<line x1="${f1(q[0])}" y1="${f1(q[1])}" x2="${f1(tx)}" y2="${f1(ty + (ty < q[1] ? 8 : -24))}" stroke="${col}" stroke-width="2" opacity=".8"/><circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="5" fill="${col}"/>` +
      txt(tx, ty, text, col, fs, anchor, 700);
    return {
      update(t, s) {
        const { step, p } = s;
        const spin = spinAt(step, p);
        // kantelen naar bovenaanzicht in stap 6, terug in stap 8
        const tilt = step === 6 ? 90 * ease(sub(p, .05, .4)) : step === 7 ? 90 : step === 8 ? 90 * (1 - ease(sub(p, 0, .3))) : 0;
        const helixOp = step === 7 ? 1 - sub(p, 0, .2) : step === 8 ? ease(sub(p, .04, .22)) : 1;
        const v = { cx: CX, cy: CY, S, spin, tilt, rot: 90 };
        const o = {
          bb: 1, base: step === 2 ? .25 : 1, P: 1, sugar: 1,
          letters: step === 3 || step === 4 ? 1 : 0, hb: step === 3 ? 1 : 0,
          grooves: step === 4 ? { minor: ease(sub(p, .05, .2)) * (1 - ease(sub(p, .45, .55))), major: ease(sub(p, .5, .65)) } : null,
          grooveW: { minor: 6, major: 11 },
          hl: step === 2 ? { strand: 1, i: HLNT } : null, hlDim: 1, hlPair: step === 3 ? HLBP : null,
          zMax: step === 6 || (step === 7) ? H.pairs[10].z : step === 8 && p < .3 ? H.pairs[10].z : null,
        };
        const hx = drawHelix(H, v, o);
        $('dh-helix').innerHTML = `<g opacity="${f1(helixOp)}">${hx.svg}</g>`;
        const pr = hx.pr, E = hx.ends;
        let ann = '';
        // 5'/3'-uiteinden en richting
        const endsOp = step <= 1 ? 1 : step === 8 ? sub(p, .3, .5) : step === 5 ? 0 : step >= 6 ? 0 : .8;
        if (endsOp > .01) {
          const fs = step === 1 ? 30 : 26;
          ann += `<g opacity="${f1(endsOp)}" font-family="JetBrains Mono" font-weight="700" font-size="${fs}">
            <text x="${f1(E.s1_5[0] - 50)}" y="${f1(CY - 105)}" fill="${C.dna}" text-anchor="middle">5'</text><text x="${f1(E.s1_3[0] + 50)}" y="${f1(CY - 105)}" fill="${C.dna}" text-anchor="middle">3'</text>
            <text x="${f1(E.s2_3[0] - 50)}" y="${f1(CY + 125)}" fill="${C.dna2}" text-anchor="middle">3'</text><text x="${f1(E.s2_5[0] + 50)}" y="${f1(CY + 125)}" fill="${C.dna2}" text-anchor="middle">5'</text></g>`;
        }
        if (step === 1) {
          const k = ease(sub(p, .1, .5)), k2 = ease(sub(p, .45, .85));
          ann += `<g opacity="${f1(k)}"><path d="M300,${CY - 200} H${f1(300 + 1000 * k)}" stroke="${C.dna}" stroke-width="6" marker-end="url(#arrow)"/>${txt(800, CY - 220, T2("streng I: 5' → 3'", "strand I: 5' → 3'"), C.dna, 28)}</g>`;
          ann += `<g opacity="${f1(k2)}"><path d="M1300,${CY + 210} H${f1(1300 - 1000 * k2)}" stroke="${C.dna2}" stroke-width="6" marker-end="url(#arrow)"/>${txt(800, CY + 255, T2("streng II: 5' → 3' (tegengesteld)", "strand II: 5' → 3' (opposite)"), C.dna2, 28)}</g>`;
        }
        // stap 2: ruggengraat
        if (step === 2) {
          const k = ease(sub(p, .1, .35)), k2 = ease(sub(p, .35, .6));
          // fosfaat en suiker vooraan in het linkerdeel
          let bestP = null, bestS = null;
          for (const q of H.pairs.slice(1, 12)) for (const [P, Sg] of [[q.pa, q.sa], [q.pb, q.sb]]) {
            const a = pr(P), b = pr(Sg);
            if (a[0] > 250 && a[0] < 820 && (!bestP || a[2] < bestP[2])) bestP = a;
            if (b[0] > 250 && b[0] < 820 && (!bestS || b[2] < bestS[2]) && b[1] > CY) bestS = b;
          }
          if (bestP) ann += `<g opacity="${f1(k)}">${callout(bestP, 470, CY - 185, T2('fosfaat (PO₄⁻, negatief)', 'phosphate (PO₄⁻, negative)'), '#ff9f43', 22)}</g>`;
          if (bestS) ann += `<g opacity="${f1(k2)}">${callout(bestS, 470, CY + 215, T2("deoxyribose (suiker)", "deoxyribose (sugar)"), '#c9a574', 22)}</g>`;
        }
        if (step === 3) {
          const q = H.pairs[HLBP], a = pr(q.c1a), b = pr(q.c1b);
          const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          ann += `<g opacity="${f1(ease(sub(p, .1, .35)))}">${callout([m[0], Math.min(a[1], b[1]) - 10], 900, CY - 190, T2(`${q.b1}–${q.b2}: ${q.b1 === 'G' || q.b1 === 'C' ? 3 : 2} waterstofbruggen`, `${q.b1}–${q.b2}: ${q.b1 === 'G' || q.b1 === 'C' ? 3 : 2} hydrogen bonds`), '#fff', 22)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .45, .7)))}">${txt(1300, CY - 190, T2('gestapeld: 3,4 Å', 'stacked: 3.4 Å'), C.muted, 22)}</g>`;
        }
        // groeven
        if (step === 4) {
          const gm = grooveFront(H, v, 'minor', 20, 60), gM = grooveFront(H, v, 'major', 20, 60);
          ann += `<g opacity="${f1(ease(sub(p, .1, .25)) * (1 - ease(sub(p, .45, .55))) * .8 + ease(sub(p, .1, .25)) * .2)}">${callout(gm, gm[0] < 800 ? 560 : 1040, CY - 205, T2('kleine groef: smal (≈ 6 Å)', 'minor groove: narrow (≈ 6 Å)'), '#ffc247', 24)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .5, .65)))}">${callout(gM, gM[0] < 800 ? 560 : 1040, CY + 220, T2('grote groef: breed (≈ 12 Å)', 'major groove: wide (≈ 12 Å)'), '#7fdc6a', 24)}</g>`;
          setA('dh-a-gr', [gM[0], gM[1] - 30]);
        }
        // afmetingen
        if (step === 5) {
          const k1 = ease(sub(p, .05, .3)), k2 = ease(sub(p, .3, .55)), k3 = ease(sub(p, .55, .8));
          const x0 = CX + (H.pairs[20].z - H.L / 2) * S + 8, top = CY - 10 * S, bot = CY + 10 * S;
          ann += `<g opacity="${f1(k1)}"><path d="M${f1(x0)},${f1(top)} V${f1(bot)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/><rect x="${f1(x0 + 14)}" y="${f1(top - 58)}" width="150" height="50" rx="10" fill="#0d1426" opacity=".85"/>${txt(x0 + 20, top - 24, T2('20 Å = 2 nm', '20 Å = 2 nm'), '#fff', 24, 'start', 700)}</g>`;
          const za = H.pairs[3].z, zb = za + 10.5 * 3.38;
          const xa = CX + (za - H.L / 2) * S, xb = CX + (zb - H.L / 2) * S, yb = CY - 190;
          ann += `<g opacity="${f1(k2)}"><path d="M${f1(xa)},${f1(yb)} H${f1(xb)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>
            <path d="M${f1(xa)},${f1(yb - 14)} v${f1(28)} M${f1(xb)},${f1(yb - 14)} v28" stroke="#fff" stroke-width="2"/>
            ${txt((xa + xb) / 2, yb - 20, T2('1 winding ≈ 10,5 bp ≈ 35,7 Å (≈ 3,5 nm)', '1 turn ≈ 10.5 bp ≈ 35.7 Å (≈ 3.5 nm)'), '#fff', 24)}</g>`;
          const i0 = 16, xc = CX + (H.pairs[i0].z - H.L / 2) * S, xd = CX + (H.pairs[i0 + 1].z - H.L / 2) * S, yc = CY + 205;
          ann += `<g opacity="${f1(k3)}"><path d="M${f1(xc)},${f1(CY + 160)} V${f1(yc)} M${f1(xd)},${f1(CY + 160)} V${f1(yc)}" stroke="#fff" stroke-width="2" stroke-dasharray="5 4"/>
            ${txt((xc + xd) / 2, yc + 34, T2('3,4 Å per basenpaar', '3.4 Å per base pair'), '#fff', 24)}</g>`;
        }
        // bovenaanzicht: nummers en hoek
        if (step === 6) {
          const k = ease(sub(p, .4, .6));
          if (k > .01) {
            let nums = '';
            for (let i = 0; i <= 10; i++) {
              const q = H.pairs[i], a = pr(q.c1a), c = [CX, CY];
              const d = Math.hypot(a[0] - c[0], a[1] - c[1]) || 1;
              const x = c[0] + (a[0] - c[0]) / d * (d + 34), y = c[1] + (a[1] - c[1]) / d * (d + 34);
              nums += txt(x, y + 7, String(i + 1), i === 0 || i === 10 ? '#fff' : C.muted, i === 0 || i === 10 ? 22 : 18, 'middle', 700);
            }
            ann += `<g opacity="${f1(k)}">${nums}</g>`;
            const a0 = pr(H.pairs[0].c1a), a1 = pr(H.pairs[1].c1a);
            const g0 = Math.atan2(a0[1] - CY, a0[0] - CX), g1 = Math.atan2(a1[1] - CY, a1[0] - CX), R = 60;
            const k2 = ease(sub(p, .6, .8));
            ann += `<g opacity="${f1(k2)}"><path d="M${f1(CX + R * Math.cos(g0))},${f1(CY + R * Math.sin(g0))} A${R},${R} 0 0 ${g1 > g0 ? 1 : 0} ${f1(CX + R * Math.cos(g1))},${f1(CY + R * Math.sin(g1))}" stroke="#fff" stroke-width="3" fill="none"/>
              <rect x="${CX - 440}" y="${CY - 240}" width="310" height="100" rx="12" fill="#0d1426" opacity=".9"/>
              ${txt(CX - 285, CY - 203, T2('≈ 34,3° per basenpaar', '≈ 34.3° per base pair'), '#fff', 24)}${txt(CX - 285, CY - 167, L({ nl: '360° / 34,3° ≈ 10,5 bp', en: '360° / 34.3° ≈ 10.5 bp' }), C.muted, 20)}</g>`;
          }
        }
        // echte structuur
        let pdb = '';
        if (step === 7 || (step === 8 && p < .25)) {
          // stap 8 begint met het echte model van stap 7 en laat het pas vervagen terwijl de helix terugkomt (geen leeg beeld)
          const k = step === 7 ? ease(sub(p, .1, .3)) : 1 - ease(sub(p, 0, .22));
          if (mol) {
            const vv = { cx: CX, cy: CY - 20, S: 17, spin: (step === 7 ? spinAt(step, p) : spinAt(7, 1)) * 1.5, tilt: 0, rot: 90 };
            const m = mol.meas, dec = x => x.toFixed(1).replace('.', L({ nl: ',', en: '.' }));
            pdb = `<g opacity="${f1(k)}">${drawPDB(mol, vv)}
              <rect x="${CX - 390}" y="${CY + 175}" width="780" height="92" rx="14" fill="#0d1426" stroke="rgba(124,196,255,.4)"/>
              ${txt(CX, CY + 208, T2(`Gemeten in 1BNA (${m.nbp} bp): stijging ${dec(m.rise)} Å/bp · twist ${dec(m.twist)}°/bp`, `Measured in 1BNA (${m.nbp} bp): rise ${dec(m.rise)} Å/bp · twist ${dec(m.twist)}°/bp`), '#fff', 20)}
              ${txt(CX, CY + 242, T2(`→ ${dec(360 / m.twist)} bp/winding · C1′–C1′ ${dec(m.c1c1)} Å · P–P-diameter ${dec(m.pp)} Å`, `→ ${dec(360 / m.twist)} bp/turn · C1′–C1′ ${dec(m.c1c1)} Å · P–P diameter ${dec(m.pp)} Å`), C.muted, 19)}</g>`;
          } else pdb = txt(CX, CY, err ? `PDB 1BNA: ${err}` : T2('Structuur 1BNA laden uit de Protein Data Bank…', 'Loading structure 1BNA from the Protein Data Bank…'), C.muted, 22);
        }
        $('dh-pdb').innerHTML = pdb;
        $('dh-ann').innerHTML = ann;
        // hotspots
        const nt = H.pairs[HLNT], bp = H.pairs[HLBP];
        setA('dh-a-nt', pr(nt.sa));
        setA('dh-a-bp', (() => { const a = pr(bp.c1a), b = pr(bp.c1b); return [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 8]; })());
        if (step !== 4) setA('dh-a-gr', [CX + 300, CY - 150]);
        setA('dh-a-forms', [step === 5 ? CX - 250 : E.s1_3[0] + 20, step === 5 ? CY + 175 : CY - 150]);
        vis('dh-hs-nt', step === 2 ? 1 : 0);
        vis('dh-hs-bp', step === 3 ? 1 : 0);
        vis('dh-hs-gr', step === 4 ? sub(p, .6, .7) : 0);
        vis('dh-hs-forms', step === 0 || step === 5 ? 1 : 0);
        vis('dh-hs-atlas', step === 7 ? ease(sub(p, .3, .5)) : 0);
        vis('dh-menu', step === 8 ? ease(sub(p, .25, .5)) : 0);
        vis('dh-nuc', step === 0 ? 1 : 0);
      },
    };
  },
};
