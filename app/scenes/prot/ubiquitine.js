import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, ub, panel, spark, ATPC, UB } from './_b_kit.js';

/* posities (scène 1600×900; paneel K48/K63 op x 1700–2700) */
const E1 = [190, 215], E2DOCK = [415, 585], E3 = [640, 575], S0 = [610, 405], SP = [770, 420];
const LYS_OFF = [-92, 52];
const UBOFF = [[-52, -26], [-100, -58], [-146, -92], [-190, -128]];
const REC = [[808, 318], [848, 282], [896, 262], [946, 258]];    // ubiquitinereceptoren op het 19S-deeltje
const CH_Y = 420, IN_X = 960, OUT_X = 1432;                        // kanaal door ATPase-ring en 20S
const BETA = [[1180, 402, 'β1'], [1275, 440, 'β2'], [1180, 440, 'β5']];
const PEP = [[5, 1750, 360], [8, 1775, 440], [3, 1760, 510], [6, 1790, 300], [4, 1800, 560], [7, 1785, 385]];

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'ubiquitine',
  title: { nl: 'Ubiquitine–proteasoom', en: 'Ubiquitin–proteasome system' },
  scale: { nl: '26S ≈ 45 nm lang, ≈ 2,5 MDa (met twee 19S-kappen)', en: '26S ≈ 45 nm long, ≈ 2.5 MDa (with two 19S caps)' },
  time: { nl: 'seconden tot minuten per eiwit', en: 'seconds to minutes per protein' },
  org: { nl: 'mens (cytosol en kern)', en: 'human (cytosol and nucleus)' },
  legend: [[UB, { nl: 'ubiquitine (76 aa)', en: 'ubiquitin (76 aa)' }], [C.chain, { nl: 'substraateiwit', en: 'substrate protein' }], [C.prot, 'E1 · E2'], [C.prot3, { nl: 'E3-ligase', en: 'E3 ligase' }], ['#2cc6a8', { nl: '19S regulatorisch deeltje', en: '19S regulatory particle' }], ['#8a93a8', { nl: '20S kerndeeltje', en: '20S core particle' }], [ATPC, 'ATP / AMP'], [C.danger, { nl: 'actieve plaatsen (β1, β2, β5)', en: 'active sites (β1, β2, β5)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: ubiquitine PDB <a href="https://www.rcsb.org/structure/1UBQ" target="_blank" rel="noopener">1UBQ</a>; humaan 26S-proteasoom PDB <a href="https://www.rcsb.org/structure/5GJR" target="_blank" rel="noopener">5GJR</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: ubiquitin PDB <a href="https://www.rcsb.org/structure/1UBQ" target="_blank" rel="noopener">1UBQ</a>; human 26S proteasome PDB <a href="https://www.rcsb.org/structure/5GJR" target="_blank" rel="noopener">5GJR</a>.</p>' },
  simplified: {
    nl: 'Het proteasoom is liggend en in doorsnede getekend met twee 19S-kappen (26S-proteasomen komen voor met één of twee kappen). Waar de peptiden het proteasoom precies verlaten is nog niet volledig opgehelderd; we tekenen ze aan de overkant. Ubiquitine is als bolletje getekend (echt: ~8,5 kDa, compacte β-grasp-vouwing). E1, E2 en E3 zijn niet op schaal. We tonen een RING-E3 (directe overdracht vanaf E2); bij HECT-E3\'s gaat ubiquitine eerst naar een Cys van de E3. Deubiquitinering, ontvouwing en translocatie gebeuren in werkelijkheid deels tegelijk.',
    en: 'The proteasome is drawn lying down and in cross-section with two 19S caps (26S proteasomes occur with one or two caps). Exactly where the peptides leave the proteasome is not fully resolved; we draw them leaving at the far end. Ubiquitin is drawn as a ball (really ~8.5 kDa, a compact β-grasp fold). E1, E2 and E3 are not to scale. We show a RING E3 (direct transfer from E2); with HECT E3s ubiquitin first goes to a Cys of the E3. Deubiquitination, unfolding and translocation partly overlap in reality.' },
  steps: [
    ST(7500, cam(880, 440, 1760), 'Elk eiwit wordt ooit afgebroken', 'Every protein is eventually degraded',
      'Beschadigde, misgevouwen of niet meer nodige eiwitten worden gemerkt met ubiquitine en in het proteasoom tot peptiden geknipt.',
      'Damaged, misfolded or no longer needed proteins are tagged with ubiquitin and cut into peptides by the proteasome.'),
    ST(8000, cam(270, 280, 820), 'E1 activeert ubiquitine (ATP)', 'E1 activates ubiquitin (ATP)',
      'E1 koppelt het C-uiteinde (Gly76) van ubiquitine aan AMP (ATP → AMP + PPᵢ) en bindt het daarna via een thio-esterbinding aan zijn Cys.',
      'E1 links the C-terminus (Gly76) of ubiquitin to AMP (ATP → AMP + PPᵢ) and then binds it via a thioester bond to its Cys.'),
    ST(7500, cam(330, 432, 900), 'Overdracht naar E2', 'Transfer to E2',
      'Het geactiveerde ubiquitine springt over op de Cys van een E2 (ubiquitine-conjugerend enzym): E2~Ub.',
      'The activated ubiquitin is passed on to the Cys of an E2 (ubiquitin-conjugating enzyme): E2~Ub.'),
    ST(8000, cam(540, 480, 900), 'E3 kiest het substraat', 'E3 picks the substrate',
      'De E3-ligase herkent een afbraaksignaal (degron) en brengt E2~Ub ernaast. Ubiquitine wordt gekoppeld aan een Lys: een isopeptidebinding.',
      'The E3 ligase recognises a degradation signal (degron) and brings E2~Ub next to it. Ubiquitin is joined to a Lys: an isopeptide bond.'),
    ST(8500, cam(500, 420, 950), 'Een K48-keten groeit', 'A K48 chain grows',
      'Elke volgende ubiquitine wordt aan Lys48 van de vorige gekoppeld. Vanaf ~4 ubiquitines herkent het proteasoom de keten efficiënt.',
      'Each next ubiquitin is joined to Lys48 of the previous one. From ~4 ubiquitins on, the proteasome recognises the chain efficiently.'),
    ST(8500, cam(2420, 430, 1350), 'De ubiquitinecode: K48 ≠ K63', 'The ubiquitin code: K48 ≠ K63',
      'Het type keten telt: K48-ketens betekenen afbraak; K63-ketens of één ubiquitine sturen o.a. signalering, DNA-herstel en endocytose.',
      'The chain type matters: K48 chains mean degradation; K63 chains or a single ubiquitin direct e.g. signalling, DNA repair and endocytosis.'),
    ST(8000, cam(880, 420, 1150), 'Het 26S-proteasoom herkent de keten', 'The 26S proteasome recognises the chain',
      'Ubiquitinereceptoren (Rpn1, Rpn10, Rpn13) van het 19S-deeltje binden de keten. Een ongevouwen stukje van het substraat dient als startpunt.',
      'Ubiquitin receptors (Rpn1, Rpn10, Rpn13) of the 19S particle bind the chain. An unstructured stretch of the substrate serves as the starting point.'),
    ST(9000, cam(900, 400, 1150), 'Ubiquitine eraf, eiwit ontvouwd', 'Ubiquitin off, protein unfolded',
      'Rpn11 knipt de ubiquitineketen er in één stuk af (hergebruik). De ATPase-ring (Rpt1–6) ontvouwt de keten met ATP en duwt ze de 20S-kern in.',
      'Rpn11 cuts off the ubiquitin chain in one piece (recycling). The ATPase ring (Rpt1–6) unfolds the chain using ATP and threads it into the 20S core.'),
    ST(9000, cam(1310, 430, 1150), 'Knippen in de 20S-kern', 'Cutting in the 20S core',
      'Binnenin de cilinder (α7β7β7α7) knippen β1 (na zure), β2 (na basische) en β5 (na hydrofobe residuen). Er komen peptiden van ~3–22 aa vrij.',
      'Inside the cylinder (α7β7β7α7) β1 (after acidic), β2 (after basic) and β5 (after hydrophobic residues) cut. Peptides of ~3–22 aa are released.'),
    ST(9500, cam(940, 450, 1880), 'Einde van het hoofdverhaal', 'End of the main story',
      'Peptidasen maken er aminozuren van: bouwstenen voor nieuwe eiwitten. Verken nu de zijpaden via "Waar ben ik?" rechtsboven.',
      'Peptidases turn them into amino acids: building blocks for new proteins. Now explore the side paths via "Where am I?" at the top right.'),
  ],
  loop: false,
  svg() {
    /* 20S (4 ringen) en 19S (basis + deksel), liggend */
    const ring = (x, lab, col) => `<rect x="${x}" y="300" width="92" height="240" rx="26" fill="${col}" fill-opacity=".30" stroke="${col}" stroke-width="3"/>` + T(x + 46, 290, lab, { size: 22, col, w: 700 });
    const core = ring(1040, 'α', '#8a93a8') + ring(1136, 'β', '#b3bccf') + ring(1232, 'β', '#b3bccf') + ring(1328, 'α', '#8a93a8');
    const cap = `<path d="M1036,332 L962,344 L962,496 L1036,508 Z" fill="rgba(44,198,168,.3)" stroke="#2cc6a8" stroke-width="3"/>` +
      `<path d="M962,300 C900,260 820,250 790,300 C760,350 780,430 800,470 C820,520 860,560 900,572 C930,580 950,560 962,540 Z" fill="rgba(44,198,168,.16)" stroke="#2cc6a8" stroke-width="3"/>` +
      /* tweede 19S-kap: spiegelbeeld rond het midden van de 20S (x = 1230) */
      `<path d="M1424,332 L1498,344 L1498,496 L1424,508 Z" fill="rgba(44,198,168,.3)" stroke="#2cc6a8" stroke-width="3"/>` +
      `<path d="M1498,300 C1560,260 1640,250 1670,300 C1700,350 1680,430 1660,470 C1640,520 1600,560 1560,572 C1530,580 1510,560 1498,540 Z" fill="rgba(44,198,168,.16)" stroke="#2cc6a8" stroke-width="3"/>`;
    return svgOpen(arrowDefs('ub', { m: C.muted, w: '#fff', y: UB, g: C.chain })) + `
    <g id="ub-prot">
      ${core}${cap}
      <rect x="962" y="${CH_Y - 16}" width="${1668 - 962}" height="32" fill="#070b16" opacity=".75"/>
      <g id="ub-beta"></g>
      ${T(1236, 594, T2('20S-kerndeeltje', '20S core particle'), { size: 27, col: '#b3bccf' })}
      ${T(870, 618, T2('19S-deeltje', '19S particle'), { size: 26, col: '#2cc6a8' })}
      ${T(1590, 618, T2('19S-deeltje', '19S particle'), { size: 26, col: '#2cc6a8' })}
      ${T(1240, 250, T2('26S-proteasoom', '26S proteasome'), { size: 30, col: C.text, w: 700 })}
      <circle data-anchor="none" cx="0" cy="0" r="0"/>
    </g>
    <g id="ub-e1"></g><g id="ub-e3"></g>
    <g data-node="ptm" data-color="${C.chain}" data-label="${T2('← PTM\'s (vorig hoofdstuk)', '← PTMs (previous chapter)')}"><g id="ub-sub"></g><circle id="ub-subA" data-anchor="ptm" r="1" fill="none"/></g>
    <g id="ub-e2"></g>
    <g id="ub-chain"></g>
    <g id="ub-pep"></g>
    <g id="ub-lbl"></g>
    <g transform="translate(220 0)"><!-- K48/K63-paneel -->
    ${panel(1680, 170, 470, 560, { col: UB })}${panel(2250, 170, 470, 560, { col: '#5fd3e6' })}
    ${T(1915, 222, T2('K48-keten', 'K48 chain'), { size: 30, col: UB, w: 800 })}${T(2485, 222, T2('K63-keten', 'K63 chain'), { size: 30, col: '#5fd3e6', w: 800 })}
    <g id="ub-code"></g>
    ${TL(1915, 610, [T2('→ 26S-proteasoom', '→ 26S proteasome'), T2('afbraak', 'degradation')], { size: 24, col: C.text })}
    ${TL(2485, 610, [T2('→ signalering (NF-κB),', '→ signalling (NF-κB),'), T2('DNA-herstel, endocytose', 'DNA repair, endocytosis')], { size: 22, col: C.text })}
    ${T(2200, 145, T2('mens: 2 E1\'s · ~40 E2\'s · > 600 E3\'s → specificiteit zit vooral in de E3', 'human: 2 E1s · ~40 E2s · > 600 E3s → specificity lies mainly in the E3'), { size: 22, col: '#c9d2e4', w: 500 })}</g>
    <g data-node="misvouwing" data-color="${C.danger}" data-label="${T2('Misgevouwen eiwitten', 'Misfolded proteins')}"><g id="ub-mis"></g><circle id="ub-misA" data-anchor="misvouwing" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="${C.chain}" data-label="${T2('Aminozuren → nieuwe eiwitten', 'Amino acids → new proteins')}"><g id="ub-aa"></g><circle id="ub-aaA" data-anchor="aminozuren" r="1" fill="none"/></g>
    <g id="ub-end"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const glob = (x, y, r, op = 1) => r < 2 ? '' : `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 1.25)}" ry="${f1(r)}" fill="rgba(127,220,106,.2)" stroke="${C.chain}" stroke-width="4"/>` +
      `<path d="${smooth([[x - r * .8, y - r * .1], [x - r * .4, y - r * .6], [x, y - r * .1], [x + r * .3, y - r * .6], [x + r * .8, y], [x + r * .2, y + r * .5], [x - r * .5, y + r * .45]])}" stroke="${C.chain}" stroke-width="5" fill="none" opacity=".6"/></g>`;

    /* K48/K63-paneel (statisch) */
    let code = '';
    const k48 = [[1915, 520], [1880, 455], [1935, 395], [1885, 330]];
    code += `<rect x="1860" y="535" width="110" height="40" rx="12" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="3"/>` + T(1915, 563, T2('substraat', 'substrate'), { size: 19 });
    k48.forEach(([x, y], i) => { if (i) code += `<line x1="${k48[i - 1][0]}" y1="${k48[i - 1][1]}" x2="${x}" y2="${y}" stroke="#fff" stroke-width="3"/>` + T((x + k48[i - 1][0]) / 2 + 46, (y + k48[i - 1][1]) / 2 + 6, 'K48', { size: 16, col: UB }); });
    k48.forEach(([x, y]) => code += ub(x, y, 26));
    const k63 = [[2485, 520], [2420, 470], [2360, 420], [2300, 370]];
    code += `<rect x="2430" y="535" width="110" height="40" rx="12" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="3"/>` + T(2485, 563, T2('substraat', 'substrate'), { size: 19 });
    k63.forEach(([x, y], i) => { if (i) code += `<line x1="${k63[i - 1][0]}" y1="${k63[i - 1][1]}" x2="${x}" y2="${y}" stroke="#fff" stroke-width="3"/>` + T((x + k63[i - 1][0]) / 2 + 30, (y + k63[i - 1][1]) / 2 + 20, 'K63', { size: 16, col: '#5fd3e6' }); });
    k63.forEach(([x, y]) => code += ub(x, y, 26));
    code += T(1915, 290, T2('compact', 'compact'), { size: 18, col: C.muted }) + T(2560, 330, T2('open, uitgestrekt', 'open, extended'), { size: 18, col: C.muted });
    $('ub-code').innerHTML = code;

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- toestand substraat en keten ---------- */
        let nUb = step < 3 ? 0 : step === 3 ? (p > .55 ? 1 : 0) : step === 4 ? 1 + Math.min(3, Math.floor(sub(p, .1, .85) * 3.999)) : 4;
        let flyK = -1, flyU = 0;                     // welk ubiquitine vliegt er nu (stap 3/4)
        if (step === 3 && p > .2 && p <= .55) { flyK = 0; flyU = sub(p, .2, .55); }
        if (step === 4) { const q = sub(p, .1, .85) * 3; const k = Math.min(3, Math.floor(q)); nUb = 1 + k; if (k < 3) { flyK = k + 1; flyU = q - k; } }
        let S = S0.slice();
        if (step === 6) { const k = ease(sub(p, 0, .5)); S = [lerp(S0[0], SP[0], k), lerp(S0[1], SP[1], k)]; }
        if (step >= 7) S = SP.slice();
        const unf = step === 7 ? ease(sub(p, .3, 1)) : step >= 8 ? 1 : 0;       // ontvouwing
        const thr = step === 8 ? ease(sub(p, 0, .5)) : step > 8 ? 1 : 0;        // volledig in de kern
        const lys = [S[0] + LYS_OFF[0], S[1] + LYS_OFF[1]];
        // ubiquitinekett en: posities
        const chainOn = step >= 3 && !(step >= 7 && p > .0 && step > 7) ;
        let ubPos = UBOFF.map(o => [lys[0] + o[0], lys[1] + o[1]]);
        const recK = step === 6 ? ease(sub(p, .35, .8)) : step >= 7 ? 1 : 0;
        ubPos = ubPos.map((q, i) => [lerp(q[0], REC[i][0], recK), lerp(q[1], REC[i][1], recK)]);
        let detach = step === 7 ? ease(sub(p, .05, .35)) : step > 7 ? 1 : 0;
        if (detach > 0) ubPos = ubPos.map(([x, y], i) => [lerp(x, 520 + i * 55, detach), lerp(y, 230 - (i % 2) * 20, detach)]);
        let cs = '';
        if (step >= 3 && step < 9 && step !== 5) {
          const start = detach > 0 ? null : (recK > 0 ? [lys[0], lys[1]] : lys);
          for (let i = 0; i < nUb; i++) {
            const prev = i ? ubPos[i - 1] : start;
            if (prev) cs += `<line x1="${f1(prev[0])}" y1="${f1(prev[1])}" x2="${f1(ubPos[i][0])}" y2="${f1(ubPos[i][1])}" stroke="#fff" stroke-width="3"/>`;
            if (i && step === 4 && recK === 0) cs += T((prev[0] + ubPos[i][0]) / 2 + 26, (prev[1] + ubPos[i][1]) / 2 + 18, 'K48', { size: 15, col: UB });
          }
          for (let i = 0; i < nUb; i++) cs += ub(ubPos[i][0], ubPos[i][1], 24, step >= 8 ? 1 - sub(p, .6, 1) * (step === 8 ? 0 : 1) : 1);
          if (step === 4) cs += T(lys[0] - 250, lys[1] - 205, `n = ${nUb}`, { size: 26, col: UB, w: 800 }) + T(lys[0] - 250, lys[1] - 172, nUb >= 4 ? T2('→ afbraaksignaal', '→ degradation signal') : '', { size: 20, col: UB });
          if (step === 7 && detach > .5) cs += T(600, 160, T2('ubiquitine vrij → hergebruik', 'ubiquitin freed → reused'), { size: 20, col: UB, op: sub(p, .2, .35) });
        }
        // vliegend ubiquitine (E2 → Lys)
        const e2At = step === 2 ? null : E2DOCK;
        if (flyK >= 0) {
          const from = [E2DOCK[0] + 30, E2DOCK[1] - 62], to = ubPos[flyK];
          cs += ub(lerp(from[0], to[0], ease(flyU)), lerp(from[1], to[1], ease(flyU)), 24);
        }
        $('ub-chain').innerHTML = cs;

        /* substraat: gevouwen → ontvouwd in het kanaal */
        let ss = '';
        const r = 80 * (1 - unf);
        const gx = lerp(S[0], IN_X - 40, unf * .6);
        if (step < 9) {
          if (r > 2) ss += glob(gx, S[1], r);
          if (step !== 5 && r > 30) ss += `<circle cx="${f1(lys[0])}" cy="${f1(lys[1])}" r="17" fill="${CLASSCOL['+']}" stroke="#0a1224" stroke-width="2"/>` + T(lys[0], lys[1] + 6, 'K', { size: 18, col: '#0a1224', halo: false, w: 800 });
          if (unf > 0) {
            // uitgestrekte keten in het kanaal
            const len = (IN_X - gx) + (OUT_X - 20 - IN_X) * (step >= 8 ? thr : unf * .45);
            const endX = Math.min(OUT_X - 20, gx + len);
            const cut = step === 8 ? sub(p, .45, .75) : step > 8 ? 1 : 0;
            if (cut < 1) ss += `<path d="M${f1(gx + r)},${CH_Y} L${f1(endX)},${CH_Y}" stroke="${C.chain}" stroke-width="8" stroke-linecap="round" ${cut > 0 ? `stroke-dasharray="${f1(40 - 26 * cut)} ${f1(8 + 20 * cut)}"` : ''} opacity="${f1(1 - cut)}"/>`;
          }
          if (step === 7) ss += spark(1000, 330, (p * 3) % 1) + tag(1000, 290, 'ATP', ATPC, { fs: 17, op: sub(p, .3, .4) }) + T(1000, 250, T2('ontvouwen', 'unfolding'), { size: 20, col: '#2cc6a8', op: sub(p, .35, .5) });
        }
        $('ub-sub').innerHTML = ss;
        $('ub-subA').setAttribute('cx', f1(S[0] + 150)); $('ub-subA').setAttribute('cy', f1(S[1] - (step < 6 ? 10 : 9999)));

        /* E1 */
        let e1 = enz(E1[0], E1[1], 120, 66, 'E1', { fs: 30, dy: -18 });
        e1 += `<circle cx="${E1[0] + 70}" cy="${E1[1] + 40}" r="8" fill="#ffc247"/>` + T(E1[0] + 70, E1[1] + 74, 'Cys', { size: 18, col: '#ffc247' });
        if (step === 1) {
          const a = ease(sub(p, 0, .25)), ad = sub(p, .3, .5), th = ease(sub(p, .55, .85));
          const ux = lerp(40, E1[0] - 50, a), uy = lerp(80, E1[1] + 2, a);
          const fx = lerp(ux, E1[0] + 70, th), fy = lerp(uy, E1[1] + 40 - 30, th);
          e1 += ub(fx, fy, 26);
          e1 += tag(E1[0] - 50, E1[1] + 32, ad < 1 ? 'ATP' : 'AMP', ATPC, { fs: 17, op: 1 - sub(p, .7, .9) });
          if (ad > .5) e1 += T(E1[0] - 110, E1[1] - 90, 'PPᵢ', { size: 20, col: ATPC, op: 1 - sub(p, .6, .8) });
          e1 += spark(E1[0] - 50, E1[1] + 32, ad);
          e1 += T(E1[0] + 20, E1[1] + 140, th < .5 ? (ad > .5 ? 'Ub–AMP' : '') : T2('E1~Ub (thio-ester)', 'E1~Ub (thioester)'), { size: 22, col: UB });
        }
        if (step === 2 && p < .35) e1 += ub(E1[0] + 70, E1[1] + 10, 26);
        $('ub-e1').innerHTML = step <= 2 ? e1 : '';

        /* E2 */
        let e2 = '', e2x = E2DOCK[0], e2y = E2DOCK[1], e2ub = false;
        if (step === 2) {
          const a = ease(sub(p, 0, .3)), m = ease(sub(p, .6, 1));
          const near = [E1[0] + 90, E1[1] + 150];
          e2x = m > 0 ? lerp(near[0], E2DOCK[0], m) : lerp(120, near[0], a); e2y = m > 0 ? lerp(near[1], E2DOCK[1], m) : lerp(520, near[1], a);
          e2ub = p > .35;
          if (p > .3 && p < .45) e2 += ub(lerp(E1[0] + 70, e2x + 30, sub(p, .3, .45)), lerp(E1[1] + 10, e2y - 62, sub(p, .3, .45)), 26);
          e2 += T(e2x, e2y + 88, p > .45 ? 'E2~Ub' : '', { size: 22, col: UB });
        } else if (step >= 3 && step <= 4) e2ub = step === 3 ? p < .2 : (flyK < 0 ? false : flyU < .02);
        if (step === 0) e2ub = false;
        e2 += enz(e2x, e2y, 82, 48, 'E2', { fs: 26, dy: 8, op: step >= 5 ? .6 : 1 });
        e2 += `<circle cx="${f1(e2x + 30)}" cy="${f1(e2y - 34)}" r="7" fill="#ffc247"/>`;
        if (e2ub) e2 += ub(e2x + 30, e2y - 62, 24);
        if (step === 4) e2 += T(e2x - 10, e2y + 90, T2('nieuwe E2~Ub per ronde', 'new E2~Ub each round'), { size: 18, col: C.muted });
        $('ub-e2').innerHTML = step === 1 || step >= 6 ? '' : e2;

        /* E3 */
        let e3 = '';
        if (step < 6) {
          e3 += enz(E3[0], E3[1], 135, 58, T2('E3 (RING)', 'E3 (RING)'), { col: C.prot3, fillOp: .42, fs: 24, dy: 18 });
          e3 += `<rect x="${S0[0] - 20}" y="${S0[1] + 70}" width="40" height="18" rx="6" fill="${C.danger}"/>` + (step === 3 ? T(S0[0] + 120, S0[1] + 90, 'degron', { size: 20, col: C.danger, anchor: 'start' }) : '');
          if (step === 3) e3 += T(610, 250, T2('isopeptidebinding: Gly76 (Ub) – Lys (substraat)', 'isopeptide bond: Gly76 (Ub) – Lys (substrate)'), { size: 19, col: '#c9d2e4', op: sub(p, .55, .7) });
        }
        $('ub-e3').innerHTML = e3;

        /* actieve plaatsen in de β-ringen */
        const actOn = step === 8 ? 1 : step === 0 ? 1 : 0;
        $('ub-beta').innerHTML = BETA.map(([x, y, l]) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.danger}" opacity="${actOn ? 1 : .55}"/>`).join('') +
          (step === 8 ? T(1180, 375, 'β1 · β5', { size: 18, col: C.danger, w: 700 }) + T(1275, 480, 'β2', { size: 18, col: C.danger, w: 700 }) + T(1236, 650, T2('actieve plaats: Thr aan het N-uiteinde van β1, β2, β5', 'active site: N-terminal Thr of β1, β2, β5'), { size: 19, col: '#c9d2e4' }) : '');

        /* peptiden en aminozuren */
        let pp = '', aa = '';
        const out = step === 8 ? sub(p, .6, 1) : step > 8 ? 1 : 0;
        if (out > 0) PEP.forEach(([n, x, y], i) => {
          const k = clamp(out * 1.4 - i * .07); if (k <= 0) return;
          const kk = ease(k), h = kk < .5 ? kk * 2 : 1, v = kk < .5 ? 0 : (kk - .5) * 2;   // eerst door het kanaal, dan uitwaaieren
          const px = lerp(lerp(OUT_X, 1700, h), x, v), py = lerp(CH_Y, y, v);
          const brk = step === 9 ? ease(sub(p, .1 + i * .05, .5 + i * .05)) : 0;
          for (let j = 0; j < n; j++) {
            const bx = px + (j - n / 2) * 13 + brk * (j - n / 2) * 14, by = py + brk * ((j * 37 + i * 11) % 60 - 30) + brk * 150;
            if (brk < 1 && j) pp += `<line x1="${f1(bx - 13 - brk * 14)}" y1="${f1(by)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${C.chain}" stroke-width="4" opacity="${f1(1 - brk)}"/>`;
            pp += `<circle cx="${f1(bx)}" cy="${f1(by)}" r="7" fill="${C.chain}"/>`;
          }
        });
        if (step === 8) pp += T(1760, 230, T2('peptiden (~3–22 aa)', 'peptides (~3–22 aa)'), { size: 20, col: C.chain, op: sub(p, .7, .85) });
        $('ub-pep').innerHTML = pp;
        if (step === 9) aa += T(1760, 780, T2('aminozuren', 'amino acids'), { size: 27, col: C.chain, op: sub(p, .4, .6) });
        $('ub-aa').innerHTML = aa + (step === 9 ? `<rect x="1640" y="560" width="220" height="200" fill="transparent"/>` : '');
        $('ub-aaA').setAttribute('cx', 1660); $('ub-aaA').setAttribute('cy', step === 9 && p > .45 ? 720 : -9999);

        /* misgevouwen eiwit (overzicht) */
        let mis = '';
        if (step === 0) {
          mis += `<path d="${smooth([[180, 560], [230, 520], [210, 600], [270, 580], [250, 650], [320, 630], [300, 700]])}" stroke="${C.chain}" stroke-width="7" fill="none" stroke-dasharray="14 6"/>`;
          mis += T(250, 745, T2('misgevouwen eiwit', 'misfolded protein'), { size: 25, col: C.danger });
        }
        $('ub-mis').innerHTML = mis;
        $('ub-misA').setAttribute('cx', 250); $('ub-misA').setAttribute('cy', step === 0 ? 520 : -9999);

        /* labels per stap */
        let lb = '';
        if (step === 0) lb += T(610, 290, T2('substraat met degron', 'substrate with degron'), { size: 25, col: C.chain }) + T(230, 110, T2('activerend enzym', 'activating enzyme'), { size: 24, col: C.prot }) + T(640, 672, T2('ubiquitine-ligase', 'ubiquitin ligase'), { size: 24, col: '#b6a6ff' });
        if (step === 6) lb += T(880, 200, T2('receptoren Rpn1 · Rpn10 · Rpn13', 'receptors Rpn1 · Rpn10 · Rpn13'), { size: 20, col: '#2cc6a8', op: sub(p, .5, .7) });
        if (step === 7) lb += T(840, 235, 'Rpn11', { size: 20, col: UB, op: sub(p, 0, .1) * (1 - sub(p, .9, 1)) }) + T(999, 580, 'Rpt1–6', { size: 20, col: '#2cc6a8', w: 700, op: sub(p, .3, .45) });
        $('ub-lbl').innerHTML = lb;

        /* eindkaart */
        let end = '';
        if (step === 9) {
          const k = sub(p, .35, .6);
          end += panel(40, 110, 740, 200, { op: k, col: C.ok });
          end += T(410, 172, T2('Einde van het hoofdverhaal', 'End of the main story'), { size: 38, col: C.ok, w: 800, op: k });
          end += TL(410, 228, [T2('Van gen tot eiwit tot afbraak.', 'From gene to protein to degradation.'),
            T2('Zijpaden: open <tspan fill="#ffc247" font-weight="800">"Waar ben ik?"</tspan>', 'Side paths: open <tspan fill="#ffc247" font-weight="800">"Where am I?"</tspan>')], { size: 29, op: k, w: 500 });
          end += arr(700, 118, 1300, -55, '#ffc247', 'ub-y', { w: 6, op: sub(p, .5, .7), dash: '14 10', bend: -.1 });
        }
        $('ub-end').innerHTML = end;
      },
    };
  },
};
