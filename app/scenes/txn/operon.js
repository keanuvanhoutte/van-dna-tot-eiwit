import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { helixAlong, prot, panel, arrow } from './_txn.js';
import { bacterieWand, ptsStaaf, ribosoomKlein } from '../../bio.js';

/* E. coli lac-operon. Posities in scènecoördinaten (niet op schaal in bp).
 * lac-promoter: −35 TTTACA, −10 TATGTT (lacUV5: −10 TATAAT) — Heider, Pyka & Barnekow, BMC Res Notes 2009;2:125 (PMID 19583865) en
 * Joo et al., Microbiol Spectr 2023 (PMID 36786576), beide gelezen; oorspronkelijke bepaling: Dickson et al., Science 1975 (PMID 1088926).
 * Tussenruimte −35/−10: lac 18 bp (Mandecki & Reznikoff, Nucleic Acids Res 1982, PMID 6278440, abstract gelezen), consensus 17 bp.
 * σ70-consensus TTGACA / TATAAT. */
const Y0 = 470, TSS = 520;
const EL = {
  lacI: [120, 262], cap: [292, 346], m35: [364, 408], m10: [452, 496], op: [506, 570],
  lacZ: [584, 990], lacY: [1000, 1262], lacA: [1272, 1480],
};
const K = { rnap: '#9b7bff', sig: '#e8a23a', laci: '#ff6b6b', cap: '#5fd3e6', camp: '#ffc247', allo: '#7fdc6a', glc: '#c9d2e4', ribo: C.rrna };
/* toestand per rij van de logicatabel: [glucose, lactose] → LacI gebonden?, CAP gebonden?, niveau */
const ROWS = [
  { glc: 1, lac: 0, laci: 1, cap: 0, lvl: 0 },
  { glc: 1, lac: 1, laci: 0, cap: 0, lvl: 1 },
  { glc: 0, lac: 0, laci: 1, cap: 1, lvl: 0 },
  { glc: 0, lac: 1, laci: 0, cap: 1, lvl: 2 },
];
const hex = (x, y, r, col, op = 1) => op <= .01 ? '' : `<path d="${[0, 1, 2, 3, 4, 5].map(i => `${i ? 'L' : 'M'}${f1(x + r * Math.cos(i * Math.PI / 3 + Math.PI / 6))},${f1(y + r * Math.sin(i * Math.PI / 3 + Math.PI / 6))}`).join('')}Z" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="2" opacity="${f1(op)}"/>`;

export default {
  id: 'operon',
  title: { nl: 'Bacteriële transcriptie: het lac-operon', en: 'Bacterial transcription: the lac operon' },
  scale: '≈ 5 kb DNA · 10–20 nm', time: { nl: 'minuten (inductie), hier sterk versneld', en: 'minutes (induction), strongly accelerated here' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.dna, 'DNA'], [K.rnap, { nl: 'RNA-polymerase (core)', en: 'RNA polymerase (core)' }], [K.sig, 'σ70'], [K.laci, { nl: 'LacI-repressor', en: 'LacI repressor' }], [K.cap, 'CAP (CRP)'], [K.camp, 'cAMP'],
    [K.allo, { nl: 'allolactose', en: 'allolactose' }], [K.glc, 'glucose'], [C.rna, 'mRNA'], [K.ribo, { nl: 'ribosoom (70S)', en: 'ribosome (70S)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Zijpad van het menselijke verhaal: bacteriën hebben geen kern, geen nucleosomen en maar één RNA-polymerase. Eén promoter stuurt hier drie genen tegelijk aan (polycistronisch mRNA).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Side path from the human story: bacteria have no nucleus, no nucleosomes and only one RNA polymerase. Here one promoter drives three genes at once (polycistronic mRNA).</p>' },
  simplified: {
    nl: 'Afstanden zijn niet op schaal (lacZ ≈ 3 kb, lacY ≈ 1,3 kb, lacA ≈ 0,6 kb). LacI is een tetrameer die ook de hulpoperatoren O2 en O3 bindt en het DNA tot een lus vouwt; hier is enkel O1 getekend. CAP buigt het DNA (~90°), wat niet getekend is. De figuur toont het klassieke cAMP–CAP-model; later onderzoek toont dat glucose vooral werkt via inducer-uitsluiting (glucose remt de opname van lactose). De "uit"-toestanden zijn nooit helemaal nul (basale transcriptie).',
    en: 'Distances are not to scale (lacZ ≈ 3 kb, lacY ≈ 1.3 kb, lacA ≈ 0.6 kb). LacI is a tetramer that also binds the auxiliary operators O2 and O3 and folds the DNA into a loop; only O1 is drawn. CAP bends the DNA (~90°), which is not drawn. The figure shows the classic cAMP–CAP model; later work shows that glucose acts mainly through inducer exclusion (glucose inhibits lactose uptake). The "off" states are never quite zero (basal transcription).' },
  steps: [
    { dur: 8000, cam: cam(790, 440, 1420), title: { nl: 'Het lac-operon: drie genen samen', en: 'The lac operon: three genes together' },
      text: { nl: 'In E. coli delen drie genen één startplek en één aan/uit-schakelaar. Ze worden samen in één mRNA gekopieerd.', en: 'In E. coli, three genes share one start site and one on/off switch. They are copied together into one mRNA.' } },
    { dur: 9000, cam: cam(440, 455, 780), title: { nl: 'Het RNA-enzym zoekt de startplek', en: 'The RNA enzyme finds the start site' },
      text: { nl: 'Een hulpeiwit (σ-factor) brengt het enzym dat RNA maakt naar de startplek. Die past hier slecht: de start is zwak.', en: 'A helper protein (σ factor) brings the enzyme that makes RNA to the start site. Here the site is a poor match, so starting is weak.' } },
    { dur: 8000, cam: cam(790, 440, 1420), title: { nl: 'Geen lactose: de genen staan uit', en: 'No lactose: the genes are off' },
      text: { nl: 'Een rem-eiwit (repressor) zit op de schakelaar en houdt het RNA-enzym tegen. De genen staan uit.', en: 'A brake protein (repressor) sits on the switch and blocks the RNA enzyme. The genes are off.' } },
    { dur: 9000, cam: cam(790, 440, 1420), title: { nl: 'Lactose haalt de rem weg', en: 'Lactose removes the brake' },
      text: { nl: 'Een beetje lactose wordt omgezet in een verwante suiker. Die bindt de rem, en de rem laat het DNA los.', en: 'A little lactose is turned into a related sugar. It binds the brake, and the brake lets go of the DNA.' } },
    { dur: 8000, cam: cam(790, 440, 1420), title: { nl: 'Maar er is nog glucose', en: 'But there is still glucose' },
      text: { nl: 'Zolang er glucose is, start het RNA-enzym maar zelden. In het klassieke model krijgt het helper-eiwit CAP dan geen signaal.', en: 'As long as there is glucose, the RNA enzyme starts only rarely. In the classic model the helper protein CAP then gets no signal.' } },
    { dur: 10000, cam: cam(790, 440, 1420), title: { nl: 'Glucose op: volle kracht', en: 'Glucose gone: full power' },
      text: { nl: 'Zonder glucose stijgt een signaalstof (cAMP). CAP bindt dan bij de startplek en trekt het RNA-enzym aan.', en: 'Without glucose a signal molecule (cAMP) rises. CAP then binds near the start site and attracts the RNA enzyme.' } },
    { dur: 13000, cam: cam(960, 390, 1180), title: { nl: 'Kopiëren en vertalen tegelijk', en: 'Copying and translating at once' },
      text: { nl: 'Bacteriën hebben geen kern: ribosomen lezen het mRNA al terwijl het nog groeit. Eén mRNA levert drie eiwitten.', en: 'Bacteria have no nucleus: ribosomes read the mRNA while it is still growing. One mRNA yields three proteins.' } },
    { dur: 12000, cam: cam(790, 440, 1420), title: { nl: 'Twee signalen, één uitkomst', en: 'Two signals, one outcome' },
      text: { nl: 'De genen staan pas volop aan als er lactose is (rem weg) én geen glucose (CAP gebonden).', en: 'The genes are only fully on when there is lactose (brake gone) and no glucose (CAP bound).' } },
  ],
  svg() {
    return svgOpen() + `
    <path d="M${ptsStaaf(800, 450, 1760, 310).map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L')}Z" fill="${C.bact}" fill-opacity=".05"/>
    ${bacterieWand(ptsStaaf(800, 450, 1760, 310), { type: 'neg', w: 12, op: .8 })}
    <text id="op-cell" x="250" y="712" font-family="Inter" font-size="22" fill="${C.bact}" opacity=".8">${T2('bacteriecel (geen kern)', 'bacterial cell (no nucleus)')}</text>
    <g id="op-elems"></g>
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="op-rungs"></g><path id="op-s1" stroke="${C.dna}" stroke-width="5" fill="none"/><path id="op-s2" stroke="${C.dna2}" stroke-width="5" fill="none"/></g>
    <g id="op-seq"></g>
    <g data-node="translatie" data-color="${K.ribo}" data-label="${T2('Gekoppelde translatie', 'Coupled translation')}"><g id="op-mrna"></g><circle id="op-trA" data-anchor="translatie" r="1" fill="none"/></g>
    <g id="op-prot"></g>
    <g data-node="promoter" data-color="${C.prot}" data-label="${T2('Vergelijk: menselijke promoter', 'Compare: human promoter')}"><g id="op-cmp"></g><circle id="op-cmpA" data-anchor="promoter" r="1" fill="none"/></g>
    <g id="op-ind"></g>
    <g id="op-table"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const setA = (id, x, y, on = 1) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); e.setAttribute('opacity', on ? 1 : 0); };
    const h = helixAlong(u => [u, Y0], 96, 1504, { amp: 12, period: 64, step: 5, rungEvery: 8, seed: 5 });
    $('op-s1').setAttribute('d', h.s1); $('op-s2').setAttribute('d', h.s2); $('op-rungs').innerHTML = h.rungs;

    // vaste elementen
    const box = (a, b, col, lab, sz = 16, dy = 50, id = '') => `<rect x="${a}" y="${Y0 - 22}" width="${b - a}" height="44" rx="6" fill="${col}" fill-opacity=".12" stroke="${col}" stroke-width="2"/>` + (id ? `<g id="${id}">` : '') + txt((a + b) / 2, Y0 + dy, lab, col, sz, 'middle', 700) + (id ? '</g>' : '');
    let el = '';
    el += box(...EL.lacI, '#ff9d9d', '<tspan font-style="italic">lacI</tspan>', 24, 56);
    el += `<path d="M${EL.lacI[0]},${Y0 - 26} v-26 h24" stroke="${C.text}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>`;
    el += box(...EL.cap, K.cap, T2('CAP-plaats', 'CAP site'), 20, 92, 'op-lcap');
    el += box(...EL.m35, K.sig, '−35', 20, 54);
    el += box(...EL.m10, K.sig, '−10', 20, 54);
    el += box(...EL.op, K.laci, T2('operator', 'operator'), 20, 126, 'op-lop');
    el += `<path d="M${TSS},${Y0 - 26} v-30 h24" stroke="${C.text}" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>` + txt(TSS + 4, Y0 - 64, '+1', C.text, 20, 'start');
    for (const [g, c] of [['lacZ', '#ffb27a'], ['lacY', '#ffc247'], ['lacA', '#d9e37a']]) {
      const [a, b] = EL[g];
      el += `<rect x="${a}" y="${Y0 + 30}" width="${b - a}" height="16" rx="8" fill="${c}" fill-opacity=".3" stroke="${c}"/>` + txt((a + b) / 2, Y0 + 76, `<tspan font-style="italic">${g}</tspan>`, c, 24);
    }
    el += `<g id="op-promlab">` + txt(430, Y0 + 92, 'promoter', K.sig, 20) + '</g>';
    $('op-elems').innerHTML = el;

    // groeiende eiwitketen: elk gen (lacZ, lacY, lacA) heeft een eigen start- en stopcodon; hoe verder het ribosoom in zijn gen (d), hoe langer de keten
    const GENES = ['lacZ', 'lacY', 'lacA'].map(g => [EL[g][0] - TSS - 20, EL[g][1] - TSS - 20]);   // genposities in mRNA-px vanaf het 5'-uiteinde
    const chainAt = (x, y, d) => {
      const n = Math.max(1, Math.min(7, Math.round(d / 40), Math.floor((y - 240) / 11)));   // begrensd: de keten blijft in het cytoplasma, onder de celwand
      let dd = `M${f1(x)},${f1(y)}`;
      for (let k = 0; k < n; k++) dd += ` q${k % 2 ? -8 : 8},-6 0,-11`;
      return `<path d="${dd}" stroke="${C.chain}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    };
    let placed = [];                                       // ribosomen die in dit beeld al getekend zijn
    function mrnaAt(x0, len, withRibo, t) {
      // mRNA hangt boven het DNA, 5'-uiteinde het verst van de polymerase
      if (len <= 4) return '';
      const pts = [];
      for (let s = 0; s <= len; s += 8) pts.push([x0 - s * .42, Y0 - 66 - Math.min(s, 300) * .55 - 8 * Math.sin(s / 30)]);
      let g = `<path d="${pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      if (withRibo) {
        // per gen: ribosomen starten aan het begin van dat gen (eigen startcodon), om de ~120 nt-px
        for (const [g0, g1] of GENES) for (let d = g0 + 30; d < Math.min(g1 - 10, len - 40); d += 120) {
          const i = Math.min(pts.length - 1, Math.floor((len - d) / 8)), q = pts[i] ?? pts[pts.length - 1];
          // het ribosoom volgt de stand van het (schuine) mRNA: raaklijn richting 3′ (naar de polymerase)
          const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], ang = Math.atan2(a[1] - b[1], a[0] - b[0]);
          const nx = Math.sin(ang), ny = -Math.cos(ang);                 // normaal naar de kant van de grote eenheid
          if (placed.some(([x, y]) => Math.hypot(x - q[0], y - q[1]) < 46)) continue;   // geen ribosomen over elkaar (ook niet van een ander mRNA)
          placed.push(q);
          // 70S: grote eenheid (50S) aan de bovenkant, kleine (30S) eronder, mRNA ertussen; de keten komt uit de grote eenheid
          g += ribosoomKlein(q[0] - nx * 2, q[1] - ny * 2, { s: 1.5, rot: 180 + ang * 180 / Math.PI, col: K.ribo }) +
            chainAt(q[0] + nx * 17, q[1] + ny * 17, d - g0);
        }
      }
      return g;
    }
    const rnap = (x, op, sigma = 1, blocked = 0) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + prot(x - 20, Y0 - 60, 70, 48, K.rnap, 1, 91, 'RNAP', 19) +
      (sigma > .01 ? `<g opacity="${f1(sigma)}">${prot(x - 74, Y0 - 30, 38, 24, K.sig, 1, 92, 'σ70', 16)}</g>` : '') +
      (blocked > .01 ? `<g opacity="${f1(blocked)}" stroke="${C.danger}" stroke-width="5"><line x1="${x + 84}" y1="${Y0 - 100}" x2="${x + 112}" y2="${Y0 - 72}"/><line x1="${x + 112}" y1="${Y0 - 100}" x2="${x + 84}" y2="${Y0 - 72}"/></g>` : '') + '</g>';
    const laci = (x, y, op, allo = 0) => op <= .01 ? '' : `<g opacity="${f1(op)}">` +
      [[-22, -16], [22, -16], [-22, 16], [22, 16]].map(([dx, dy], i) => prot(x + dx, y + dy, 22, 16, K.laci, 1, 60 + i)).join('') + txt(x, y + 7, 'LacI', '#fff', 19) +
      (allo > .01 ? [[-46, -32], [46, -32], [-46, 32], [46, 32]].map(([dx, dy]) => hex(x + dx, y + dy, 12, K.allo, allo)).join('') : '') + '</g>';
    const capP = (op, camp = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + prot(305, Y0 - 44, 24, 20, K.cap, 1, 70) + prot(335, Y0 - 44, 24, 20, K.cap, 1, 71) + txt(320, Y0 - 78, 'CAP', K.cap, 19) +
      hex(305, Y0 - 44, 7, K.camp, camp) + hex(335, Y0 - 44, 7, K.camp, camp) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        // toestand bepalen
        let st;
        if (step <= 1) st = { glc: 1, lac: 0, laci: step === 1 ? 0 : 0, cap: 0, lvl: 0, rn: step === 1 ? ease(sub(p, .2, .5)) : 0 };
        else if (step === 2) st = { glc: 1, lac: 0, laci: ease(sub(p, .1, .4)), cap: 0, lvl: 0, rn: 1 };
        else if (step === 3) st = { glc: 1, lac: 1, laci: 1 - ease(sub(p, .45, .8)), allo: sub(p, .36, .4), cap: 0, lvl: 0, rn: 1 };
        else if (step === 4) st = { glc: 1, lac: 1, laci: 0, cap: 0, lvl: 1, rn: 1 };
        else if (step === 5) st = { glc: 1 - sub(p, 0, .2), lac: 1, laci: 0, cap: ease(sub(p, .2, .45)), lvl: sub(p, .35, .5) > 0 ? 2 : 1, rn: 1 };
        else if (step === 6) st = { glc: 0, lac: 1, laci: 0, cap: 1, lvl: 2, rn: 1 };
        else { const r = ROWS[Math.min(3, Math.floor(p * 4))]; st = { ...r, rn: 1 }; }

        // sequenties (stap 1)
        const sq = step === 1 ? sub(p, .35, .55) : 0;
        $('op-promlab').setAttribute('opacity', step === 0 ? 1 : 0);
        $('op-lcap').setAttribute('opacity', step === 1 || step === 6 ? 0 : 1);
        $('op-lop').setAttribute('opacity', step === 1 || step === 6 ? 0 : 1);
        $('op-cell').setAttribute('opacity', step === 0 ? .8 : 0);
        // echte lac-promoter (bovenste rij) met de afwijkingen van de σ70-consensus (onderste rij) in rood
        const mm = (seq, cons) => [...seq].map((c, i) => c === cons[i] ? c : `<tspan fill="${C.danger}">${c}</tspan>`).join('');
        $('op-seq').innerHTML = sq > .01 ? `<g opacity="${f1(sq)}">` + `<rect x="236" y="${Y0 + 68}" width="290" height="126" rx="10" fill="#0b1224" opacity=".95"/>` +
          txt(350, Y0 + 96, 'lac', C.text, 16, 'end', 700) + txt(386, Y0 + 96, mm('TTTACA', 'TTGACA'), K.sig, 17, 'middle', 700, 'JetBrains Mono') + txt(474, Y0 + 96, mm('TATGTT', 'TATAAT'), K.sig, 17, 'middle', 700, 'JetBrains Mono') +
          txt(350, Y0 + 120, T2('consensus', 'consensus'), C.muted, 14, 'end') + txt(386, Y0 + 120, 'TTGACA', C.muted, 15, 'middle', 600, 'JetBrains Mono') + txt(474, Y0 + 120, 'TATAAT', C.muted, 15, 'middle', 600, 'JetBrains Mono') +
          `<path d="M410,${Y0 + 130} v8 H450 v-8" stroke="${C.muted}" fill="none" stroke-width="1.5"/>` + txt(430, Y0 + 154, T2('lac: 18 bp', 'lac: 18 bp'), C.text, 15) + txt(430, Y0 + 174, T2('consensus: 17 bp', 'consensus: 17 bp'), C.muted, 14) + '</g>' : '';

        // eiwitten
        let pr = '';
        pr += capP(st.cap, 1);
        if (st.cap > .5 && step >= 5) pr += `<line x1="330" y1="${Y0 - 60}" x2="380" y2="${Y0 - 70}" stroke="${K.cap}" stroke-width="2.5" stroke-dasharray="4 3"/>` + (step === 5 ? txt(372, Y0 - 108, 'αCTD', K.cap, 19) : '');
        pr += laci(541, Y0 + 44, st.laci, st.allo ?? (st.lac ? 1 : 0) * (1 - st.laci));
        if (step === 3 && st.laci < .99) pr += laci(541 + 150 * Math.sqrt(1 - st.laci), Y0 + 44 + 106 * (1 - st.laci), 1 - st.laci, 1);   // losgelaten LacI drijft weg naar rechtsonder, niet over het operatorlabel
        if (step === 3) {
          // de suiker (allolactose) zweeft aan en klikt op de rem; daarna laat de rem het DNA los
          const k = ease(sub(p, .08, .38)), fromXY = [[760, Y0 + 230], [860, Y0 + 180], [800, Y0 + 290], [930, Y0 + 250]], to = [[-46, -32], [46, -32], [-46, 32], [46, 32]];
          if (p < .4) to.forEach(([dx, dy], i) => { pr += hex(lerp(fromXY[i][0], 541 + dx, k), lerp(fromXY[i][1], Y0 + 44 + dy, k), 12, K.allo, sub(p, .02, .1)); });
          pr += `<g opacity="${f1(sub(p, .05, .15) * (1 - sub(p, .4, .5)))}">` + txt(860, Y0 + 140, T2('suiker uit lactose', 'sugar from lactose'), K.allo, 26, 'middle', 800) + txt(860, Y0 + 166, '(allolactose)', C.muted, 18, 'middle', 600) + '</g>';
          pr += `<g opacity="${f1(sub(p, .42, .55))}">` + txt(800, Y0 + 132, T2('suiker op de rem', 'sugar on the brake'), K.allo, 26, 'start', 800) + txt(800, Y0 + 160, T2('→ rem laat het DNA los', '→ brake lets go of the DNA'), C.text, 22, 'start', 700) + '</g>';
        }
        // RNAP aan de promoter (wacht), plus bewegende polymerasen bij expressie
        const blocked = st.laci > .5 ? 1 : 0;
        pr += rnap(470, st.rn, 1, blocked);
        if (step === 1) pr += txt(450, Y0 - 128, T2('holo-enzym = core (α₂ββ′ω) + σ70', 'holoenzyme = core (α₂ββ′ω) + σ70'), C.text, 17);
        let mr = '';
        placed = [];
        const T = t / 1000;
        const n = st.lvl === 2 ? 4 : st.lvl === 1 ? 1 : 0;
        const period = st.lvl === 2 ? 1 : 1.6;           // lage expressie: zelden een polymerase onderweg
        for (let j = 0; j < n; j++) {
          const u = ((T / 15 + j / n) % period);        // rustig tempo: één polymerase doet ~15 s over het operon
          if (u > 1) continue;
          const x = lerp(TSS + 40, 1510, u), len = x - TSS - 20;
          mr += mrnaAt(x, len, step >= 5, t);
          pr += `<g opacity="${f1(clamp((1 - u) * 12))}">` + prot(x, Y0 - 40, 34, 26, K.rnap, 1, 93) + '</g>';
        }
        $('op-mrna').innerHTML = mr;
        setA('op-trA', 1390, 330, (step === 5 || step === 6) && n > 0);   // niet aan de rechterrand (anders afgesneden)

        // eiwitproducten (stap 6)
        if (step === 6) {
          const o = sub(p, .3, .6);
          pr += `<g opacity="${f1(o)}">` + txt((EL.lacZ[0] + EL.lacZ[1]) / 2, Y0 + 116, T2('→ β-galactosidase', '→ β-galactosidase'), '#ffb27a', 19) +
            txt((EL.lacY[0] + EL.lacY[1]) / 2, Y0 + 116, T2('→ lactosepermease', '→ lactose permease'), '#ffc247', 19) + txt((EL.lacA[0] + EL.lacA[1]) / 2, Y0 + 116, T2('→ transacetylase', '→ transacetylase'), '#d9e37a', 19) + '</g>';
        }
        $('op-prot').innerHTML = pr;

        // vergelijkingsknop naar menselijke promoter (stap 1)
        $('op-cmp').innerHTML = step === 1 ? '' : '';
        setA('op-cmpA', 440, Y0 - 175, step === 1 && p > .6);

        // indicatoren
        const indOp = step >= 2 && step <= 5 ? 1 : 0;
        const indLvl = step === 3 && st.laci < .5 ? 1 : st.lvl;   // repressor weg, glucose nog aanwezig: laag (zoals in de tabel)
        const lvlTxt = [T2('uit', 'off'), T2('laag', 'low'), T2('hoog', 'high')][indLvl];
        const lvlCol = [C.muted, C.trna, C.ok][indLvl];
        const dot = (x, y, on, col) => `<circle cx="${x}" cy="${y}" r="9" fill="${on > .5 ? col : 'none'}" stroke="${col}" stroke-width="2"/>`;
        $('op-ind').innerHTML = indOp ? panel(1100, 580, 400, 170) +
          dot(1132, 616, st.glc, K.glc) + txt(1152, 623, 'glucose', C.text, 20, 'start') +
          dot(1322, 616, st.lac, K.allo) + txt(1342, 623, 'lactose', C.text, 20, 'start') +
          txt(1124, 668, `cAMP: ${st.glc > .5 ? T2('laag', 'low') : T2('hoog', 'high')}`, K.camp, 20, 'start') +
          txt(1124, 722, `${T2('expressie', 'expression')}: `, C.text, 20, 'start') + txt(1300, 722, lvlTxt, lvlCol, 24, 'start', 800) : '';

        // logicatabel (stap 7)
        let tb = '';
        if (step === 7) {
          const x0 = 560, y0 = 150, cw = [170, 170, 200];
          const cur = Math.min(3, Math.floor(p * 4));
          tb += panel(x0 - 20, y0 - 24, 580, 256);
          const head = ['glucose', 'lactose', T2('expressie', 'expression')];
          let cx = x0;
          head.forEach((hd, i) => { tb += txt(cx + cw[i] / 2, y0 + 14, hd, C.muted, 20); cx += cw[i]; });
          ROWS.forEach((r, i) => {
            const y = y0 + 58 + i * 44;
            if (i === cur) tb += `<rect x="${x0 - 8}" y="${y - 26}" width="556" height="40" rx="10" fill="${C.trna}" fill-opacity=".14" stroke="${C.trna}" stroke-width="1.5"/>`;
            const cells = [r.glc ? '+' : '−', r.lac ? '+' : '−', [T2('uit', 'off'), T2('laag', 'low'), T2('HOOG', 'HIGH')][r.lvl]];
            let x = x0;
            cells.forEach((c, k) => { tb += txt(x + cw[k] / 2, y + 2, c, k === 2 ? [C.muted, C.trna, C.ok][r.lvl] : C.text, k < 2 ? 26 : 22, 'middle', k === 2 ? 800 : 600); x += cw[k]; });
          });
        }
        $('op-table').innerHTML = tb ? `<g transform="translate(-295 45.5) scale(.75)">${tb}</g>` : '';   // tabel links boven de promoter, niet over de mRNA's
      },
    };
  },
};
