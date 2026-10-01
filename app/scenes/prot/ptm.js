import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, ub, phos, sugar, panel, spark, lerpPts, ATPC, PHOS } from './_b_kit.js';

/* Paneel A (x 0–1600): doeleiwit met activatielus (aan/uit-schakelaar)
 * Paneel B (x 1700–3300): MAP-kinasecascade  ·  Paneel C (x 3380–5000): overzicht PTM's  ·  Paneel D (x 5100–6700): collageen */
const BODY = [[600, 400], [520, 405], [455, 450], [425, 530], [440, 615], [500, 680], [600, 712], [720, 706], [820, 660], [880, 575], [880, 490], [835, 425], [760, 400], [705, 404], [672, 432], [650, 442], [628, 432]];
const LID_OFF = [[760, 400], [735, 350], [662, 326], [598, 345], [580, 392]];
const LID_ON = [[760, 400], [792, 344], [862, 318], [930, 334], [955, 378]];
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
  time: { nl: 'ms (fosforylatie) tot min (cascade)', en: 'ms (phosphorylation) to min (cascade)' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.chain, { nl: 'doeleiwit (keten)', en: 'target protein (chain)' }], [C.prot, { nl: 'kinasen', en: 'kinases' }], [C.prot3, { nl: 'fosfatase', en: 'phosphatase' }], [PHOS, { nl: 'fosfaatgroep (2−)', en: 'phosphate group (2−)' }], [ATPC, 'ATP / ADP'], [CLASSCOL['+'], { nl: 'positief geladen residu (Arg/Lys)', en: 'positively charged residue (Arg/Lys)' }], ['#ffd166', { nl: 'ubiquitine', en: 'ubiquitin' }]],
  extra: {
    nl: '<table style="font-size:13px;color:#c9d2e4;border-collapse:collapse;line-height:1.35"><tr><td><b>Fosforylatie</b></td><td>kinase ⇄ fosfatase; + 2 negatieve ladingen</td></tr><tr><td><b>Acetylatie</b></td><td>Lys: lading +1 → 0; histonen: open chromatine</td></tr><tr><td><b>Methylatie</b></td><td>me1/me2/me3 op Lys (ook Arg: me1/me2); lading blijft; donor SAM</td></tr><tr><td><b>Ubiquitinering</b></td><td>ubiquitine = 76 aa; K48-keten → afbraak</td></tr><tr><td><b>Glycosylatie</b></td><td>in ER en Golgi; vouwing, herkenning</td></tr><tr><td><b>Lipidering</b></td><td>myristoyl, palmitoyl, prenyl: anker aan een membraan</td></tr><tr><td><b>Disulfidebrug</b></td><td>gevormd in het ER (PDI); stabiliseert de vouwing</td></tr><tr><td><b>Hydroxylering</b></td><td>collageen; Pro + O₂ + 2-oxoglutaraat → 4-Hyp + succinaat + CO₂; cofactoren Fe²⁺ en vitamine C (houdt het ijzer gereduceerd)</td></tr></table>',
    en: '<table style="font-size:13px;color:#c9d2e4;border-collapse:collapse;line-height:1.35"><tr><td><b>Phosphorylation</b></td><td>kinase ⇄ phosphatase; + 2 negative charges</td></tr><tr><td><b>Acetylation</b></td><td>Lys: charge +1 → 0; histones: open chromatin</td></tr><tr><td><b>Methylation</b></td><td>me1/me2/me3 on Lys (also Arg: me1/me2); charge kept; donor SAM</td></tr><tr><td><b>Ubiquitination</b></td><td>ubiquitin = 76 aa; K48 chain → degradation</td></tr><tr><td><b>Glycosylation</b></td><td>in ER and Golgi; folding, recognition</td></tr><tr><td><b>Lipidation</b></td><td>myristoyl, palmitoyl, prenyl: anchor to a membrane</td></tr><tr><td><b>Disulfide bond</b></td><td>formed in the ER (PDI); stabilises the fold</td></tr><tr><td><b>Hydroxylation</b></td><td>collagen; Pro + O₂ + 2-oxoglutarate → 4-Hyp + succinate + CO₂; cofactors Fe²⁺ and vitamin C (keeps the iron reduced)</td></tr></table>' },
  simplified: {
    nl: 'Het doeleiwit is een schets: een "lus die de actieve plaats afdekt" is één van de manieren waarop fosforylatie een eiwit aan- of uitzet (bv. de activatielus van veel kinasen); bij andere eiwitten zet fosforylatie juist uit of creëert ze een bindingsplaats. De versterkingsfactoren in de cascade (1 → 3 → 6) zijn illustratief. Echte kinasen zijn veel groter dan hier getekend; de collageen-triple helix is ~300 nm lang en hier sterk ingekort.',
    en: 'The target protein is a sketch: a "loop covering the active site" is one of the ways phosphorylation switches a protein on or off (e.g. the activation loop of many kinases); in other proteins phosphorylation switches off or creates a binding site. The amplification factors in the cascade (1 → 3 → 6) are illustrative. Real kinases are much larger than drawn; the collagen triple helix is ~300 nm long and strongly shortened here.' },
  steps: [
    ST(7000, cam(680, 470, 1250), 'Na de vouwing: chemische extra\'s', 'After folding: chemical extras',
      'Enzymen hangen groepen aan zijketens of knippen de keten. Zo krijgt een eiwit eigenschappen die de 20 aminozuren alleen niet hebben.',
      'Enzymes attach groups to side chains or cut the chain. This gives a protein properties the 20 amino acids alone do not have.'),
    ST(6500, cam(700, 410, 1150), 'Een kinase met ATP bindt', 'A kinase with ATP binds',
      'Een eiwitkinase herkent een Ser (of Thr, Tyr) in de juiste sequentiecontext. In zijn actieve plaats ligt ATP.',
      'A protein kinase recognises a Ser (or Thr, Tyr) in the right sequence context. ATP sits in its active site.'),
    ST(8000, cam(930, 390, 1400), 'Fosforylatie: γ-fosfaat → Ser-OH', 'Phosphorylation: γ-phosphate → Ser-OH',
      'Het kinase zet de γ-fosfaatgroep van ATP op de OH-groep van serine; ATP wordt ADP. Het residu krijgt 2 negatieve ladingen.',
      'The kinase transfers the γ-phosphate of ATP onto the OH group of serine; ATP becomes ADP. The residue gains 2 negative charges.'),
    ST(7500, cam(720, 440, 1150), 'Schakelaar AAN', 'Switch ON',
      'De negatieve fosfaatgroep trekt naar positieve Arg-zijketens: de lus klapt weg en de actieve plaats komt vrij. Het eiwit is nu actief.',
      'The negative phosphate is drawn to positive Arg side chains: the loop flips away and the active site is exposed. The protein is now active.'),
    ST(7500, cam(800, 420, 1250), 'Fosfatase: schakelaar UIT', 'Phosphatase: switch OFF',
      'Een eiwitfosfatase hydrolyseert de fosfaatgroep weg (Pᵢ komt vrij). De lus sluit weer: fosforylatie is omkeerbaar.',
      'A protein phosphatase hydrolyses the phosphate off (Pᵢ is released). The loop closes again: phosphorylation is reversible.'),
    ST(9000, cam(2470, 470, 1500), 'Kinasecascade: signaal versterken', 'Kinase cascade: amplifying a signal',
      'Kinasen fosforyleren kinasen: Raf → MEK → ERK (MAP-kinaseroute). Elk actief enzym activeert er vele, dus het signaal wordt versterkt.',
      'Kinases phosphorylate kinases: Raf → MEK → ERK (MAP kinase pathway). Each active enzyme activates many, so the signal is amplified.'),
    ST(9000, cam(4190, 490, 1650), 'Veel soorten modificaties', 'Many kinds of modifications',
      'Elke modificatie gebruikt specifieke residuen en eigen enzymen. Klik op een kaart om verder te gaan.',
      'Each modification uses specific residues and its own enzymes. Click a card to explore further.'),
    ST(8500, cam(5900, 480, 1500), 'Hydroxyproline in collageen', 'Hydroxyproline in collagen',
      'Prolyl-4-hydroxylase zet in het ER Pro om in hydroxyproline (Hyp); het enzym heeft vitamine C nodig. Hyp stabiliseert de triple helix (Gly–X–Y).',
      'In the ER, prolyl 4-hydroxylase converts Pro into hydroxyproline (Hyp); the enzyme needs vitamin C. Hyp stabilises the triple helix (Gly–X–Y).'),
    ST(8000, cam(690, 560, 1300), 'Het laatste etiket: ubiquitine', 'The last label: ubiquitin',
      'Ook ubiquitine is een PTM, op een Lys. Een keten van ≥ 4 ubiquitines (via K48) betekent: afbreken → volgend hoofdstuk.',
      'Ubiquitin is a PTM too, on a Lys. A chain of ≥ 4 ubiquitins (via K48) means: degrade → next chapter.'),
  ],
  svg() {
    const cards = [
      ['ph', 'ptm', C.prot, T2('Fosforylatie', 'Phosphorylation'), 'Ser · Thr · Tyr'],
      ['ac', 'histonmod', CLASSCOL['+'], T2('Acetylatie', 'Acetylation'), 'Lys (–NH₃⁺)'],
      ['me', 'histonmod', '#5fd3e6', T2('Methylatie', 'Methylation'), 'Lys · Arg'],
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
      if (k === 'ac') ill = `<circle cx="${cx - 30}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 30, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + tag(cx + 48, iy, 'Ac', '#9cc0ff', { fs: 20 });
      if (k === 'me') ill = `<circle cx="${cx - 58}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 58, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + [0, 1, 2].map(j => tag(cx + 14 + j * 56, iy, 'CH₃', '#5fd3e6', { fs: 18, w: 54 })).join('');
      if (k === 'ub') ill = `<circle cx="${cx - 60}" cy="${iy}" r="24" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 60, iy + 7, 'Lys', { size: 17, col: '#0a1224', halo: false }) + [0, 1, 2, 3].map(j => ub(cx - 12 + j * 40, iy - j * 6, 19)).join('');
      if (k === 'gl') ill = `<circle cx="${cx - 70}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 70, iy + 7, 'Asn', { size: 17, col: '#0a1224', halo: false }) +
        `<path d="M${cx - 46},${iy} H${cx + 50} M${cx + 12},${iy} L${cx + 50},${iy - 30} M${cx + 12},${iy} L${cx + 50},${iy + 30}" stroke="#ccd" stroke-width="2"/>` + sugar('GlcNAc', cx - 26, iy, 11) + sugar('GlcNAc', cx - 2, iy, 11) + sugar('Man', cx + 22, iy, 11) + sugar('Man', cx + 50, iy - 30, 11) + sugar('Man', cx + 50, iy + 30, 11);
      if (k === 'li') ill = `<rect x="${cx - 150}" y="${iy - 34}" width="300" height="22" fill="${C.mem}" opacity=".35"/><rect x="${cx - 150}" y="${iy + 12}" width="300" height="22" fill="${C.mem}" opacity=".35"/>` + `<path d="M${cx - 10},${iy - 30} q8,10 0,20 q-8,10 0,20 q8,10 0,20" stroke="#ffe08a" stroke-width="4" fill="none"/>` + `<circle cx="${cx - 10}" cy="${iy - 48}" r="20" fill="${C.chain}" stroke="#0a1224" stroke-width="2"/>`;
      if (k === 'ss') ill = `<circle cx="${cx - 60}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 60, iy + 7, 'Cys', { size: 17, col: '#0a1224', halo: false }) + `<circle cx="${cx + 60}" cy="${iy}" r="24" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(cx + 60, iy + 7, 'Cys', { size: 17, col: '#0a1224', halo: false }) + `<line x1="${cx - 34}" y1="${iy}" x2="${cx + 34}" y2="${iy}" stroke="#ffc247" stroke-width="6"/>` + T(cx, iy - 12, 'S–S', { size: 18, col: '#ffc247' });
      if (k === 'hy') ill = `<circle cx="${cx - 40}" cy="${iy}" r="24" fill="${CLASSCOL.s}" stroke="#0a1224" stroke-width="2"/>` + T(cx - 40, iy + 7, 'Pro', { size: 17, col: '#0a1224', halo: false }) + T(cx + 4, iy + 8, '→', { size: 26 }) + `<circle cx="${cx + 50}" cy="${iy}" r="24" fill="${CLASSCOL.s}" stroke="#0a1224" stroke-width="2"/>` + T(cx + 50, iy + 7, 'Hyp', { size: 17, col: '#0a1224', halo: false }) + tag(cx + 84, iy - 30, 'OH', '#ff8a3d', { fs: 17, w: 44 });
      const body = panel(x0, y0, 370, 320, { col }) + T(cx, y0 + 60, title, { size: 30, col, w: 700 }) + (res ? T(cx, y0 + 112, res, { size: 23, font: 'JetBrains Mono', w: 700 }) : '') + ill;
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${node === 'ptm' ? T2('(dit hoofdstuk)', '(this chapter)') : L({ nl: '→ ' + { histonmod: 'Histonmodificaties', ubiquitine: 'Ubiquitine–proteasoom', glyco: 'N-glycosylatie', disulfide: 'Disulfidebruggen' }[node], en: '→ ' + { histonmod: 'Histone modifications', ubiquitine: 'Ubiquitin–proteasome', glyco: 'N-glycosylation', disulfide: 'Disulfide bonds' }[node] })}"${node === 'ptm' || (k === 'me') ? ' data-nolabel' : ''}>${body}<circle data-anchor="${node}" cx="${cx}" cy="${y0 + 8}" r="1" fill="none"/></g>` : body;
    }).join('');

    const helices = [coil(470, 520, 600, 470, 4, 16), coil(520, 640, 700, 660, 5, 16), coil(700, 520, 840, 600, 4, 16)].map(p => chain(p, { w: 6, op: .55 })).join('');
    return svgOpen(arrowDefs('pt', { m: C.muted, g: C.chain, p: C.prot, w: '#fff' })) + `
    <!-- paneel A -->
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('gevouwen doeleiwit', 'folded target protein')}">
      <path d="${smooth([...BODY, BODY[0], BODY[1]])}" fill="rgba(127,220,106,.14)" stroke="${C.chain}" stroke-width="4"/>
      ${helices}
      <circle data-anchor="vouwing" cx="440" cy="640" r="1" fill="none" data-pos="below"/>
    </g>
    <g id="pt-glow"></g>
    ${[[812, 424], [872, 470]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(x, y + 6, 'Arg', { size: 16, col: '#0a1224', halo: false, w: 700 })).join('')}
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
  init(svg) {
    const $ = id => svg.getElementById(id);
    const kinPos = k => [lerp(KIN[0] - 380, KIN[0], k), lerp(KIN[1] - 180, KIN[1], k)];
    const atpAt = ([x, y]) => [x + 150, y + 62];

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
        if (step === 3 || (step === 4 && piK === 0)) pPos = [ser[0], ser[1] - 34];
        let lidS = chain(lid, { w: 11 }) + `<circle cx="${f1(ser[0])}" cy="${f1(ser[1])}" r="20" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(ser[0], ser[1] + 6, 'Ser', { size: 16, col: '#0a1224', halo: false, w: 700 });
        if (step === 4 && piK > 0) { const k = ease(piK); lidS += phos(ser[0] + 60 + 220 * k, ser[1] - 60 - 120 * k, 18, 1 - sub(p, .8, 1)) + T(ser[0] + 60 + 220 * k, ser[1] - 90 - 120 * k, 'Pᵢ', { size: 22, op: 1 - sub(p, .8, 1) }); }
        if (pPos) lidS += `<line x1="${f1(ser[0])}" y1="${f1(ser[1] - 18)}" x2="${f1(pPos[0])}" y2="${f1(pPos[1] + 14)}" stroke="#fff" stroke-width="3" opacity="${step === 2 ? f1(sub(p, .5, .55)) : 1}"/>` + phos(pPos[0], pPos[1], 18) +
          T(pPos[0] + 36, pPos[1] - 10, '2−', { size: 20, col: PHOS, w: 800, op: step >= 3 || p > .55 ? 1 : 0 });
        $('pt-lid').innerHTML = lidS;
        $('pt-glow').innerHTML = glow > .01 ? `<circle cx="650" cy="408" r="30" fill="rgba(255,194,71,.3)" stroke="#ffc247" stroke-width="4" opacity="${f1(glow)}"/>` + T(560, 330, T2('actieve plaats vrij', 'active site exposed'), { size: 20, col: '#ffc247', op: glow }) : '';
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
          ks += enz(kp[0], kp[1], 170, 78, T2('eiwitkinase', 'protein kinase'), { op, fs: 24, dy: -14 });
          const a = atpAt(kp);
          ks += tag(a[0], a[1] - 14, atpLbl, ATPC, { fs: 20, op });
          if (step === 2) ks += spark(a[0], a[1], sub(p, .15, .5));
        }
        $('pt-kin').innerHTML = ks;
        $('pt-pp').innerHTML = ppK > .01 ? enz(lerp(1300, 1030, ppK), lerp(120, 240, ppK), 160, 72, T2('eiwitfosfatase', 'protein phosphatase'), { col: C.prot3, op: ppK, fs: 24, fillOp: .4 }) +
          (step === 4 ? tag(lerp(1300, 1030, ppK), lerp(120, 240, ppK) + 90, 'H₂O', '#9cc0ff', { fs: 18, op: ppK * (1 - sub(p, .4, .6)) }) : '') : '';
        // chemie-paneel
        let ch = '';
        if (chemK > .01) {
          const x = 1300;
          ch += panel(1060, 150, 480, 470, { op: chemK, col: C.prot });
          ch += T(x, 200, T2('De reactie', 'The reaction'), { size: 24, col: C.prot, w: 700, op: chemK });
          ch += T(x, 256, 'Ser–CH₂–OH', { size: 26, font: 'JetBrains Mono', w: 700, col: CLASSCOL.p, op: chemK }) + T(x, 296, '+ ATP', { size: 24, font: 'JetBrains Mono', col: ATPC, op: chemK });
          ch += T(x, 350, '↓  ' + T2('kinase', 'kinase'), { size: 24, col: C.prot, op: chemK });
          ch += T(x, 406, 'Ser–CH₂–O–PO₃²⁻', { size: 26, font: 'JetBrains Mono', w: 700, col: PHOS, op: chemK }) + T(x, 446, '+ ADP', { size: 24, font: 'JetBrains Mono', col: ATPC, op: chemK });
          ch += TL(x, 510, [T2('ook op Thr (OH) en Tyr (fenol-OH)', 'also on Thr (OH) and Tyr (phenol OH)'), T2('mens: ~500 eiwitkinasen', 'human: ~500 protein kinases')], { size: 19, col: '#c9d2e4', w: 500, op: chemK });
        }
        $('pt-chem').innerHTML = ch;
        // ubiquitine (stap 8)
        let us = '';
        const UBP = [[LYS[0] - 40, LYS[1] + 58], [LYS[0] - 98, LYS[1] + 84], [LYS[0] - 156, LYS[1] + 104], [LYS[0] - 214, LYS[1] + 118]];
        let ubL = '', ubB = '', nUb = 0;
        if (step === 8) {
          // E3-ligase met een voorraad ubiquitine staat er van bij het begin; de ubiquitines schuiven één voor één naar de keten
          us += enz(235, 700, 120, 54, T2('E3-ligase', 'E3 ligase'), { fs: 24 });
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
        if (step === 8) us += T(LYS[0] + 170, LYS[1] + 90, T2('K48-polyubiquitine', 'K48 polyubiquitin'), { size: 22, col: '#ffd166', op: sub(p, .7, .85), anchor: 'start' }) + T(LYS[0] + 170, LYS[1] + 122, T2('= "breek mij af"', '= "degrade me"'), { size: 22, op: sub(p, .75, .9), anchor: 'start' });
        $('pt-ub').innerHTML = us;
        $('pt-ubA').setAttribute('cx', LYS[0] - 110); $('pt-ubA').setAttribute('cy', nUb ? LYS[1] + 30 : -9999);

        /* ---------- paneel B: cascade ---------- */
        const cp = step === 5 ? p : step > 5 ? 1 : 0;
        const RAF = [[2500, 200]], MEK = [[2180, 380], [2500, 380], [2820, 380]], ERK = [1950, 2170, 2390, 2610, 2830, 3050].map(x => [x, 560]), TG = [1950, 2170, 2390, 2610, 2830, 3050].map(x => [x, 720]);
        const aR = sub(cp, .05, .15), aM = sub(cp, .25, .4), aE = sub(cp, .5, .65), aT = sub(cp, .75, .9);
        let cs = arr(2500, 80, 2500, 140, '#fff', 'pt-w', { op: sub(cp, 0, .08) }) + T(2560, 102, T2('groeifactorsignaal (via Ras)', 'growth-factor signal (via Ras)'), { size: 20, anchor: 'start', op: sub(cp, 0, .08) });
        const kin = (x, y, lab, a, np, rx = 100) => enz(x, y, rx, 44, lab, { col: a > .5 ? C.prot : C.prot3, fillOp: a > .5 ? .35 : .15, fs: 22 }) + Array.from({ length: np }, (_, j) => phos(x + rx - 6 + j * 34, y - 34, 15, a)).join('');
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
