import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, phos, ub, blob } from './_b_kit.js';
import { bilayer, knop } from './_fate.js';
import { helixLint, strengPijl, vouwing } from '../../bio.js';

/* Panelen naast elkaar: A (0–1600) kwaliteitscontrole & aggregatie · B (1700–3300) kinetiek · C (3400–5000) cross-β
 * D (5100–6700) ziekten · E (6800–8400) prionen · F (8500–10100) UPR */
const HYD = '#ff9f43', BAD = '#ff6b6b', SC = '#e07b5a';
const ERY = 422, ERW = 44, AX = 9800, AVR = 74;      // ER-membraan (paneel F) en het COPII-blaasje van ATF6
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const native = (x, y, s = 1, op = 1) => `<g opacity="${f1(op)}">${blob(f1(x), f1(y), f1(62 * s), f1(50 * s), { fill: 'rgba(127,220,106,.2)', stroke: C.chain, sw: 4, seed: 105 })}` +
  vouwing(x, y, 62 * s, 50 * s, { col: C.chain }) + '</g>';   // gevouwen: helices, β-blad, hydrofobe kern binnenin
const misf = (x, y, s = 1, op = 1, rot = 0) => `<g opacity="${f1(op)}" transform="rotate(${f1(rot)} ${f1(x)} ${f1(y)})">` + chain([[x - 60 * s, y + 20 * s], [x - 30 * s, y - 20 * s], [x, y + 18 * s], [x + 30 * s, y - 24 * s], [x + 62 * s, y + 10 * s]], { w: 7 }) +
  `<path d="${smooth([[x - 30 * s, y - 20 * s], [x, y + 18 * s], [x + 30 * s, y - 24 * s]])}" stroke="${HYD}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/></g>`;

export default {
  id: 'misvouwing',
  title: { nl: 'Misvouwing & aggregatie', en: 'Misfolding & aggregation' },
  scale: { nl: 'fibril ≈ 7,5–10 nm breed, lang en onvertakt · strengen 4,7 Å uit elkaar', en: 'fibril ≈ 7.5–10 nm wide, long and unbranched · strands 4.7 Å apart' },
  time: { nl: 'jaren: bij erfelijke Alzheimer is amyloïd ~15 jaar vóór de klachten meetbaar', en: 'years: in inherited Alzheimer’s, amyloid is detectable ~15 years before symptoms' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.chain, { nl: 'eiwit (natief)', en: 'protein (native)' }], [HYD, { nl: 'blootgesteld hydrofoob stuk', en: 'exposed hydrophobic stretch' }], [BAD, { nl: 'amyloïd / β-rijk', en: 'amyloid / β-rich' }], [C.prot, { nl: 'chaperones, sensoren', en: 'chaperones, sensors' }], ['#ffd166', 'ubiquitine'], [C.mem, { nl: 'ER-membraan', en: 'ER membrane' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: Aβ(1–42)-fibril, PDB <a href="https://www.rcsb.org/structure/2BEG" target="_blank" rel="noopener">2BEG</a>.</p><p style="font-size:13px;color:#93a0bb">Waar het amyloïd zit: Aβ in plaques buiten neuronen, tau in kluwens (tangles) in neuronen, α-synucleïne in Lewy-lichaampjes, IAPP in de eilandjes van Langerhans; PrP-prionziekten zijn overdraagbaar. Er bestaat ook functioneel amyloïd (bv. opslag van peptidehormonen). UPR: IRE1 splicet XBP1-mRNA tot XBP1s; PERK fosforyleert eIF2α (translatie ↓); ATF6 gaat naar het Golgi en wordt geknipt tot ATF6(N). Samen: meer chaperones en ERAD, minder eiwitlast.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: Aβ(1–42) fibril, PDB <a href="https://www.rcsb.org/structure/2BEG" target="_blank" rel="noopener">2BEG</a>.</p><p style="font-size:13px;color:#93a0bb">Where the amyloid sits: Aβ in plaques outside neurons, tau in tangles inside neurons, α-synuclein in Lewy bodies, IAPP in the islets of Langerhans; PrP prion diseases are transmissible. Functional amyloid also exists (e.g. storage of peptide hormones). UPR: IRE1 splices XBP1 mRNA into XBP1s; PERK phosphorylates eIF2α (translation ↓); ATF6 moves to the Golgi and is cleaved into ATF6(N). Together: more chaperones and ERAD, less protein load.</p>' },
  simplified: {
    nl: 'De kinetiekcurve is schematisch (geen echte meetdata); naast primaire nucleatie en verlenging spelen ook fragmentatie en secundaire nucleatie een rol. De fibril is als één paar β-bladen getekend; echte amyloïdfibrillen bestaan vaak uit meerdere protofilamenten en hun precieze vorm verschilt per eiwit (polymorfisme). De UPR is sterk vereenvoudigd tot één uitkomst per sensor.',
    en: 'The kinetic curve is schematic (not real data); besides primary nucleation and elongation, fragmentation and secondary nucleation also play a role. The fibril is drawn as one pair of β-sheets; real amyloid fibrils often consist of several protofilaments and their exact shape differs per protein (polymorphism). The UPR is strongly simplified to one outcome per sensor.' },
  steps: [
    ST(8000, cam(800, 460, 1500), 'Als vouwen misloopt', 'When folding goes wrong',
      'Fout gevouwen eiwitten tonen waterschuwe stukken. Helpers proberen ze te herstellen; lukt dat niet: afbraak.',
      'Misfolded proteins expose water-avoiding stretches. Helpers try to repair them; if that fails: breakdown.'),
    ST(8000, cam(915, 470, 1340), 'Klonteren', 'Clumping',
      'Is de controle overbelast, bv. door stress of ouderdom? Dan plakken ketens samen tot klonten of vezels.',
      'Is quality control overloaded, e.g. by stress or ageing? Then chains stick together into clumps or fibres.'),
    ST(9000, cam(2500, 470, 1500), 'Eerst een kiem, dan snelle groei', 'First a seed, then fast growth',
      'Een eerste kiem vormen gaat traag. Daarna groeien vezels snel. Een toegevoegde kiem slaat het wachten over.',
      'Forming a first seed is slow. Then fibres grow fast. An added seed skips the waiting.'),
    ST(9000, cam(4235, 470, 1620), 'Hoe een vezel is opgebouwd', 'How a fibre is built',
      'In zo’n vezel (amyloïd) liggen gestrekte stukken keten dwars op de vezel, netjes gestapeld.',
      'In such a fibre (amyloid), stretched-out pieces of chain lie across the fibre, neatly stacked.'),
    ST(8500, cam(5910, 470, 1780), 'Ziekten door klonten', 'Diseases caused by clumps',
      'Zulke klonten spelen mee bij Alzheimer, Parkinson en type 2-diabetes. Vooral kleine klontjes lijken giftig.',
      'Such clumps play a role in Alzheimer’s, Parkinson’s and type 2 diabetes. Small clumps in particular seem toxic.'),
    ST(8500, cam(7600, 470, 1450), 'Prionen: besmettelijk vouwen', 'Prions: infectious folding',
      'De foute vorm van het prioneiwit zet de normale vorm om. Zo verspreidt een vouwfout zich, zonder DNA of RNA.',
      'The wrong form of the prion protein converts the normal form. A folding error thus spreads, without DNA or RNA.'),
    ST(9500, cam(9300, 450, 1650), 'Alarm in het ER', 'Alarm in the ER',
      'Te veel ongevouwen eiwit in het ER? Dan maakt de cel minder eiwit en meer helpers. Blijft het, dan sterft ze.',
      'Too much unfolded protein in the ER? Then the cell makes less protein and more helpers. If it lasts, the cell dies.'),
  ],
  svg() {
    /* paneel D: ziektekaarten */
    const cards = [
      ['Aβ', T2('Alzheimer', 'Alzheimer\'s'), T2('plaques buiten neuronen', 'plaques outside neurons'), 'idp'],
      ['tau', T2('Alzheimer', 'Alzheimer\'s'), T2('kluwens in neuronen', 'tangles inside neurons'), null],
      [T2('α-synucleïne', 'α-synuclein'), T2('Parkinson', 'Parkinson\'s'), T2('Lewy-lichaampjes', 'Lewy bodies'), 'idp'],
      [T2('IAPP (amyline)', 'IAPP (amylin)'), T2('type 2-diabetes', 'type 2 diabetes'), T2('in de eilandjes van Langerhans', 'in the islets of Langerhans'), null],
      ['PrP', T2('Creutzfeldt-Jakob', 'Creutzfeldt–Jakob'), T2('prionziekte, overdraagbaar', 'prion disease, transmissible'), null],
    ];
    let cd = '';
    cards.forEach(([prot, dis, , node], i) => {
      const x0 = 5160 + (i % 3) * 510, y0 = 170 + Math.floor(i / 3) * 300, cx = x0 + 240;
      const b = panel(x0, y0, 480, 260, { col: BAD, fill: 'rgba(255,107,107,.14)' }) + T(cx, y0 + 60, prot, { size: 32, col: BAD, w: 800 }) + T(cx, y0 + 132, dis, { size: 30, w: 700 }) +
        chain([[cx - 90, y0 + 200], [cx - 45, y0 + 190], [cx, y0 + 210], [cx + 45, y0 + 190], [cx + 90, y0 + 200]], { col: BAD, w: 6, op: .6 });
      cd += node ? `<g data-node="${node}" data-color="${C.chain}" data-label="${T2('Aβ en α-synucleïne zijn IDP\'s', 'Aβ and α-synuclein are IDPs')}">${b}<circle data-anchor="${node}" cx="${cx}" cy="${y0 + 4}" r="1" fill="none"/></g>` : b;
    });
    /* paneel F: ER-membraan */
    const erm = `<rect x="8540" y="444" width="1520" height="420" fill="rgba(143,179,232,.09)"/><g id="mf-erm">${bilayer(8540, 10060, ERY, { h: ERW })}</g>` +
      T(8560, 382, 'cytosol', { size: 25, col: C.muted, anchor: 'start' }) + T(8560, 482, T2('ER-lumen', 'ER lumen'), { size: 25, col: '#8fb3e8', anchor: 'start' });
    return svgOpen(arrowDefs('mf', { m: C.muted, g: C.ok, r: BAD, w: '#fff' })) + `
    <g id="mf-a"></g>
    <g data-node="chaperones" data-color="${C.prot}" data-label="${T2('Chaperones', 'Chaperones')}"><g id="mf-chap"></g><circle id="mf-chapA" data-anchor="chaperones" r="1" fill="none"/></g>
    <g data-node="ubiquitine" data-color="#ffd166" data-label="${T2('Afbraak (proteasoom)', 'Degradation (proteasome)')}"><g id="mf-deg"></g><circle id="mf-degA" data-anchor="ubiquitine" r="1" fill="none"/></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Eiwitvouwing', 'Protein folding')}"><g id="mf-nat"></g><circle id="mf-natA" data-anchor="vouwing" r="1" fill="none"/></g>
    <g id="mf-kin"></g>
    <g id="mf-xb"></g>
    ${cd}
    <g id="mf-prion"></g>
    <g data-node="er" data-color="${C.mem}" data-label="${T2('Ruw ER', 'Rough ER')}">${erm}<circle data-anchor="er" cx="9050" cy="395" r="1" fill="none"/></g>
    <g id="mf-upr"></g>
    <g data-node="chaperones" data-color="${C.prot2}" data-nolabel><g id="mf-bip"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const sig = (u, m = .5, k = 13) => 1 / (1 + Math.exp(-(u - m) * k));
    let ermKey = '';
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A ---------- */
        let a = '', ch = '', dg = '', nt = '';
        const misX = 820, misY = 460;
        if (step <= 1) {
          nt += native(420, 450, 1.8) + T(420, 585, T2('natief: hydrofoob binnenin', 'native: hydrophobic inside'), { size: 23, col: C.chain });
          if (step === 0) {
            a += misf(misX, misY, 1.3) + T(misX, 565, T2('misgevouwen: hydrofoob buiten', 'misfolded: hydrophobic outside'), { size: 23, col: HYD });
            a += arr(620, 460, 720, 460, C.muted, 'mf-m', { w: 4 });
            const k = sub(p, .3, .5), k2 = sub(p, .55, .75);
            ch += arr(misX, 390, misX, 270, C.ok, 'mf-g', { w: 5, op: k }) + enz(misX, 220, 110, 44, 'Hsp70 / TRiC', { fs: 20, op: k }) + T(misX + 24, 336, T2('opnieuw vouwen', 'refold'), { size: 23, col: C.ok, anchor: 'start', op: k });
            dg += arr(misX + 90, 470, 1120, 470, '#ffd166', 'mf-m', { w: 5, op: k2 }) + [0, 1, 2, 3].map(i => ub(1170 + i * 38, 440 - i * 10, 19, k2)).join('') + T(1230, 525, T2('ubiquitine → proteasoom', 'ubiquitin → proteasome'), { size: 23, col: '#ffd166', op: k2 });
          }
        }
        if (step === 1) {
          const k = ease(sub(p, .1, .7));
          const P0 = [[700, 300], [880, 620], [1000, 250], [1180, 640], [1300, 300], [760, 640], [1420, 520]];
          const P1 = [[1020, 430], [1060, 480], [1000, 480], [1080, 430], [1040, 400], [1030, 520], [1090, 510]];
          P0.forEach((q, i) => a += misf(lerp(q[0], P1[i][0], k), lerp(q[1], P1[i][1], k), .8, 1, i * 40 * k));
          a += T(1050, 625, T2('aggregaat', 'aggregate'), { size: 24, col: BAD, op: sub(p, .6, .8) });
          a += arr(1170, 460, 1320, 400, C.muted, 'mf-m', { w: 4, op: sub(p, .7, .85) }) + T(1400, 360, T2('→ oligomeren → fibrillen', '→ oligomers → fibrils'), { size: 23, col: BAD, op: sub(p, .75, .9) });
        }
        $('mf-a').innerHTML = a; $('mf-chap').innerHTML = ch; $('mf-deg').innerHTML = dg; $('mf-nat').innerHTML = nt;
        $('mf-chapA').setAttribute('cx', misX); $('mf-chapA').setAttribute('cy', step === 0 && p > .5 ? 170 : -9999);
        $('mf-degA').setAttribute('cx', 1220); $('mf-degA').setAttribute('cy', step === 0 && p > .75 ? 400 : -9999);
        $('mf-natA').setAttribute('cx', 420); $('mf-natA').setAttribute('cy', step <= 1 ? 380 : -9999);

        /* ---------- paneel B: kinetiek ---------- */
        let kn = '';
        if (step >= 1 && step <= 3) {
          const OX = 1820, OY = 720, W = 1000, H = 440;
          const prog = step === 2 ? sub(p, .05, .7) : step > 2 ? 1 : 0;
          kn += `<line x1="${OX}" y1="${OY}" x2="${OX + W + 20}" y2="${OY}" stroke="${C.muted}" stroke-width="3" marker-end="url(#mf-m)"/><line x1="${OX}" y1="${OY}" x2="${OX}" y2="${OY - H - 30}" stroke="${C.muted}" stroke-width="3" marker-end="url(#mf-m)"/>`;
          kn += T(OX + W / 2, OY + 50, T2('tijd', 'time'), { size: 22, col: C.muted }) + `<text x="${OX - 30}" y="${OY - H / 2}" transform="rotate(-90 ${OX - 30} ${OY - H / 2})" font-size="22" fill="${C.muted}" text-anchor="middle" font-family="Inter" font-weight="600">${T2('massa in fibrillen', 'mass in fibrils')}</text>`;
          let d = ''; for (let u = 0; u <= prog + 1e-6; u += .01) d += `${u ? 'L' : 'M'}${f1(OX + u * W)},${f1(OY - sig(u) * H * .95)}`;
          // de volledige curve staat er al flauw (het beeld is nooit leeg); de felle lijn tekent eroverheen
          let dg0 = ''; for (let u = 0; u <= 1 + 1e-6; u += .01) dg0 += `${u ? 'L' : 'M'}${f1(OX + u * W)},${f1(OY - sig(u) * H * .95)}`;
          kn += `<path d="${dg0}" stroke="${BAD}" stroke-width="6" fill="none" opacity=".3"/>`;
          kn += `<path d="${d}" stroke="${BAD}" stroke-width="6" fill="none"/>`;
          const sk = step === 2 ? sub(p, .72, .95) : step > 2 ? 1 : 0;
          if (sk > 0) { let d2 = ''; for (let u = 0; u <= sk + 1e-6; u += .01) d2 += `${u ? 'L' : 'M'}${f1(OX + u * W)},${f1(OY - sig(u, .2, 13) * H * .95)}`; kn += `<path d="${d2}" stroke="#ffc247" stroke-width="5" fill="none" stroke-dasharray="12 8"/>` + T(OX + .3 * W, OY - H * .85, T2('met zaadkern (seed)', 'with seed'), { size: 20, col: '#ffc247', anchor: 'start', op: sk }); }
          // fasen
          const ph = [[.2, T2('lag-fase', 'lag phase'), .1], [.5, T2('groei', 'growth'), .35], [.85, T2('plateau', 'plateau'), .6]];
          // fasen en pictogrammen: van bij het begin flauw aanwezig, ze lichten op wanneer de curve hen bereikt
          const lit = th => .32 + .68 * sub(prog, th, th + .1);
          ph.forEach(([u, lab, th]) => kn += T(OX + u * W, OY - H - 10, lab, { size: 22, col: C.text, op: lit(th), w: 700 }));
          const mono = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="${C.chain}"/>`;
          kn += [0, 1, 2, 3, 4].map(i => mono(OX + 200 + (i % 3) * 36, OY - 70 + Math.floor(i / 3) * 30 + (i % 2) * 10)).join('');   // op t = 0 is alles monomeer
          kn += `<g opacity="${f1(lit(.35))}">` + [0, 1, 2, 3].map(i => `<rect x="${OX + 450 + i * 20}" y="${OY - 330}" width="14" height="44" rx="4" fill="${BAD}"/>`).join('') + T(OX + 485, OY - 350, T2('kern', 'nucleus'), { size: 23, col: BAD }) + mono(OX + 560, OY - 308) + arr(OX + 600, OY - 308, OX + 548, OY - 308, C.muted, 'mf-m', { w: 3 }) + '</g>';
          kn += `<g opacity="${f1(lit(.6))}">` + [0, 1, 2].map(r => Array.from({ length: 9 }, (_, i) => `<rect x="${OX + 760 + i * 16}" y="${OY - 330 + r * 60}" width="11" height="40" rx="3" fill="${BAD}"/>`).join('')).join('') + '</g>';
        }
        $('mf-kin').innerHTML = kn;

        /* ---------- paneel C: cross-β ---------- */
        let xb = '';
        if (step >= 2 && step <= 4) {
          const n = step === 3 ? Math.floor(4 + sub(p, 0, .6) * 10.99) : 14;
          const x0 = 3560, dx = 62, yT = 290, yB = 560;
          xb += arr(3500, 700, 4480, 700, C.muted, 'mf-m', { w: 4 }) + T(3990, 745, T2('fibrilas', 'fibril axis'), { size: 22, col: C.muted });
          for (let i = 0; i < n; i++) {
            const x = x0 + i * dx;
            xb += `<path d="M${x + 16},${yB - 14} L${x + 16},${yT + 30}" stroke="#b35a5a" stroke-width="16" opacity=".55"/>`;                       // achterste blad
            xb += `<path d="M${x},${yB} L${x},${yT + 26}" stroke="${BAD}" stroke-width="20"/><path d="M${x - 20},${yT + 30} L${x},${yT} L${x + 20},${yT + 30}Z" fill="${BAD}"/>`;   // voorste streng (pijl)
            if (i) for (let k = 0; k < 4; k++) xb += `<line x1="${x - dx + 12}" y1="${yT + 60 + k * 60}" x2="${x - 12}" y2="${yT + 60 + k * 60}" stroke="#fff" stroke-width="2.5" stroke-dasharray="5 4" opacity=".8"/>`;
          }
          if (step === 3) {
            const k = sub(p, .55, .75);
            xb += `<path d="M${x0 + 5 * dx},${yT - 20} v-14 H${x0 + 6 * dx} v14" stroke="#fff" stroke-width="3" fill="none" opacity="${f1(k)}"/>` + T(x0 + 5.5 * dx, yT - 46, T2('4,7 Å', '4.7 Å'), { size: 24, w: 800, op: k });
            xb += T(3990, 640, T2('H-bruggen evenwijdig aan de as', 'H-bonds parallel to the axis'), { size: 20, col: '#fff', op: k });
            // eind-aanzicht inzet
            const k2 = sub(p, .7, .9);
            xb += panel(4540, 250, 400, 360, { op: k2 }) + T(4740, 290, T2('dwarsdoorsnede', 'cross-section'), { size: 20, col: C.muted, op: k2 });
            for (let i = 0; i < 5; i++) xb += `<g opacity="${f1(k2)}"><rect x="${4600 + i * 60}" y="370" width="44" height="20" rx="5" fill="${BAD}"/><rect x="${4630 + i * 60 - 30}" y="480" width="44" height="20" rx="5" fill="#b35a5a"/>` +
              `<line x1="${4622 + i * 60}" y1="390" x2="${4622 + i * 60}" y2="420" stroke="${SC}" stroke-width="6"/><line x1="${4622 + i * 60}" y1="480" x2="${4622 + i * 60}" y2="450" stroke="${SC}" stroke-width="6"/></g>`;
            xb += `<path d="M4930,380 v110" stroke="#fff" stroke-width="3" opacity="${f1(k2)}"/>` + T(4905, 445, '≈ 10 Å', { size: 20, w: 800, op: k2, anchor: 'end' }) + T(4740, 556, T2('zijketens in elkaar', 'side chains interlock'), { size: 23, col: SC, op: k2 }) + T(4740, 590, '“steric zipper”', { size: 23, col: SC, op: k2 });
          }
          xb += T(3990, 180, T2('amyloïdfibril (zijaanzicht)', 'amyloid fibril (side view)'), { size: 26, w: 700 });
        }
        $('mf-xb').innerHTML = xb;

        /* ---------- paneel E: prionen ---------- */
        let pr = '';
        if (step >= 4 && step <= 6) {
          const helixProt = (x, y, op = 1) => `<g opacity="${f1(op)}">${blob(x, y, 95, 75, { fill: 'rgba(127,220,106,.16)', stroke: C.chain, sw: 4, seed: 106 })}` +
            // PrPC (NMR-structuur): volgorde β1 – H1 – β2 – H2 – H3; kort β-blad links, H2 en H3 als lange helices naast elkaar
            `<path d="M${x - 78},${y + 40} Q${x - 75},${y + 10} ${x - 64},${y + 6} M${x - 34},${y + 6} Q${x - 30},${y - 20} ${x - 54},${y - 34} M${x - 8},${y - 34} Q${x - 10},${y + 5} ${x - 32},${y + 24} M${x - 64},${y + 24} Q${x - 10},${y + 72} ${x + 48},${y + 42} M${x + 48},${y - 42} Q${x + 32},${y - 62} ${x + 14},${y - 42}" stroke="#b5ee9f" stroke-width="3" fill="none" stroke-linecap="round"/>` +
            strengPijl(x - 64, y + 6, x - 34, y + 6, { h: 8 }) + strengPijl(x - 32, y + 24, x - 64, y + 24, { h: 8 }) +
            helixLint(x - 54, y - 34, x - 8, y - 34, { turns: 2, amp: 9, w: 8, col: C.chain }) +
            helixLint(x + 48, y + 42, x + 48, y - 42, { turns: 3.2, amp: 9, w: 8, col: C.chain }) + helixLint(x + 14, y - 42, x + 14, y + 38, { turns: 3, amp: 9, w: 8, col: C.chain }) + '</g>';
          const betaProt = (x, y, op = 1) => `<g opacity="${f1(op)}">${blob(x, y, 95, 75, { fill: 'rgba(255,107,107,.16)', stroke: BAD, sw: 4, seed: 107 })}` +
            // PrPSc: vooral β-strengen, gestapeld met H-bruggen ertussen
            [-27, 0, 27].map(dx => [-36, -20, -4, 12, 28].map(dy => `<line x1="${x + dx - 9}" y1="${y + dy}" x2="${x + dx + 9}" y2="${y + dy}" stroke="#ffd0d0" stroke-width="1.6" stroke-dasharray="2.5 2.5"/>`).join('')).join('') +
            [-40, -13, 14, 41].map(dx => strengPijl(x + dx, y + 42, x + dx, y - 44, { h: 11, col: BAD })).join('') + '</g>';
          const k = step === 5 ? ease(sub(p, .1, .4)) : 0, conv = step === 5 ? ease(sub(p, .4, .7)) : 0, rep2 = step === 5 ? sub(p, .75, .95) : 0;
          const cx = 7600;
          pr += betaProt(cx - 260 + 60 * k, 430);
          pr += helixProt(cx + 200 - 120 * k, 430, 1 - conv) + betaProt(cx + 200 - 120 * k, 430, conv);
          pr += T(cx - 260, 560, 'PrPSc', { size: 26, col: BAD, w: 800 }) + T(cx + 200 - 120 * k, 560, conv > .5 ? 'PrPSc' : 'PrPC', { size: 26, col: conv > .5 ? BAD : C.chain, w: 800 });
          pr += T(cx + 200, 300, T2('normaal: veel α-helix', 'normal: mostly α-helix'), { size: 20, col: C.chain, op: 1 - k });
          pr += T(cx - 260, 300, T2('β-rijk, stabiel, aggregeert', 'β-rich, stable, aggregates'), { size: 20, col: BAD });
          pr += `<g opacity="${f1(rep2)}">` + arr(cx - 40, 650, cx + 280, 650, BAD, 'mf-r', { w: 5 }) + T(cx + 120, 700, T2('2 → 4 → 8 … (kettingreactie)', '2 → 4 → 8 … (chain reaction)'), { size: 22, col: BAD }) + '</g>';
          pr += T(cx, 200, T2('dezelfde sequentie, een andere vouwing', 'the same sequence, a different fold'), { size: 26, w: 700 });
        }
        $('mf-prion').innerHTML = pr;

        /* ---------- paneel F: UPR ---------- */
        let up = '', bip = '';
        if (step >= 5) {
          const q = step === 6 ? p : 0;
          const unf = sub(q, .05, .3), rel = ease(sub(q, .25, .45)), act = [sub(q, .4, .55), sub(q, .55, .7), sub(q, .7, .85)], fin = sub(q, .85, .97);
          // ongevouwen eiwitten in het lumen
          for (let i = 0; i < 9; i++) { const x = 8700 + i * 150 + (i % 2) * 40, y = 640 + (i % 3) * 50; up += `<g opacity="${f1(clamp(unf * 9 - i))}">` + chain([[x - 40, y], [x - 15, y - 25], [x + 10, y + 10], [x + 40, y - 18]], { w: 6, dash: '10 5' }) + '</g>'; }
          up += T(9300, 820, T2('ongevouwen eiwitten hopen zich op', 'unfolded proteins pile up'), { size: 25, col: HYD, op: unf });
          const SENS = [[8800, 'IRE1', T2('alarm 1', 'alarm 1')], [9300, 'PERK', T2('alarm 2', 'alarm 2')], [9800, 'ATF6', T2('alarm 3', 'alarm 3')]];
          const name = (x, lab, al, op = 1) => T(x, 244, al, { size: 28, col: '#c9b8ff', w: 800, op }) + T(x, 272, `(${lab})`, { size: 20, col: C.muted, op });
          // ATF6 reist in een COPII-blaasje naar het Golgi (daar knippen S1P/S2P): het blaasje knopt af uit het ER-membraan
          const kBud = ease(sub(q, .66, .84)), kGo = ease(sub(q, .84, .97));
          const bud = kBud > 0 ? knop([AX, ERY], [0, -1], AVR, kBud, { hole: 'none', w: ERW, gap: 30, lumen: 'rgba(143,179,232,.12)' }) : null;
          let gap = null;
          if (bud) { const rho = bud.c[1] - bud.top[1], d = ERY - bud.c[1]; if (d < rho) { const h = Math.sqrt(rho * rho - d * d); gap = [AX - h, AX + h]; } }
          const key = gap ? `${f1(gap[0])}` : '';
          if (key !== ermKey) { ermKey = key; $('mf-erm').innerHTML = gap ? bilayer(8540, gap[0], ERY, { h: ERW }) + bilayer(gap[1], 10060, ERY, { h: ERW }) : bilayer(8540, 10060, ERY, { h: ERW }); }
          const V = [60 * kGo, -10 * kGo];
          if (bud) up += `<g transform="translate(${f1(V[0])} ${f1(V[1])})">${bud.svg}</g>`;
          SENS.forEach(([x, lab, al], i) => {
            const a2 = act[i];
            const tm = (xx, o = 1) => `<rect x="${f1(xx - 14)}" y="${ERY - 30}" width="28" height="60" rx="8" fill="rgba(155,123,255,.45)" stroke="${C.prot}" stroke-width="3" opacity="${f1(o)}"/>`;
            if (i < 2) {
              // dimeer: elk monomeer heeft een luminaal deel, één transmembraanhelix en een cytosolisch deel
              up += tm(x) + enz(x, 500, 46, 34, '', { col: C.prot }) + enz(x, 330, 60, 44, '', { col: C.prot, fillOp: a2 > .5 ? .55 : .25 }) +
                (a2 > .01 ? tm(x + 70 * a2, a2) + enz(x + 70 * a2, 330, 60, 44, '', { col: C.prot, op: a2, fillOp: .55 }) + enz(x + 70 * a2, 500, 46, 34, '', { col: C.prot, op: a2 }) : '') +
                name(x, lab, al);
            } else {
              // ATF6 zit in de wand van de knop: luminaal deel in het blaasje, cytosolisch deel erbuiten
              // plek op de knop: draait tijdens het afknoppen naar rechtsboven, zodat het cytosolische deel naast het blaasje uitsteekt
              let P = [x, ERY], ang = 0;
              if (bud) {
                const rho = bud.c[1] - bud.top[1], a = (-90 + 65 * kBud) * Math.PI / 180, Q = [bud.c[0] + rho * Math.cos(a), bud.c[1] + rho * Math.sin(a)], w = Math.min(1, kBud / .1);
                P = [lerp(x, Q[0], w) + V[0], lerp(ERY, Q[1], w) + V[1]]; ang = 65 * kBud;
              }
              up += `<g transform="translate(${f1(P[0])} ${f1(P[1])}) rotate(${f1(ang)}) translate(${-x} ${-ERY})">` + tm(x) + enz(x, 500, 46, 34, '', { col: C.prot }) + enz(x, 330, 60, 44, '', { col: C.prot, fillOp: a2 > .5 ? .55 : .25 }) + '</g>' +
                name(x, lab, al, 1 - ease(sub(q, .6, .67)));   // weg vóór de knop het domein optilt
              if (bud) up += T(bud.c[0] + V[0] - AVR - 40, bud.c[1] + V[1] - 30, T2('alarm 3 in een blaasje', 'alarm 3 in a vesicle'), { size: 23, col: C.mem, anchor: 'end', op: kGo });
            }
            // BiP gebonden → los
            bip += enz(x - 50 + (-80 * rel), 540 + 60 * rel, 40, 26, 'BiP', { col: C.prot2, fs: 19, fillOp: .6 });
            if (i < 2) up += phos(x + 35, 300, 16, a2);
          });
          // uitkomsten
          /* gevolg van elk alarm in gewone taal (mechanisme: zie 'Meer' van de scène) */
          up += T(8800, 204, T2('meer helpers maken', 'make more helpers'), { size: 25, col: C.text, op: act[0] });
          up += T(9300, 204, T2('minder nieuw eiwit', 'less new protein'), { size: 25, col: C.text, op: act[1] });
          up += T(9790, 204, T2('reist weg → meer helpers', 'travels off → more helpers'), { size: 25, col: C.text, anchor: 'end', op: act[2] });
          up += panel(8700, 96, 1200, 66, { op: fin, col: C.ok }) + T(9300, 138, T2('minder last, meer helpers · <tspan fill="#ff6b6b">duurt het te lang → de cel sterft</tspan>', 'less load, more helpers · <tspan fill="#ff6b6b">lasts too long → the cell dies</tspan>'), { size: 26, col: C.ok, op: fin });
        }
        $('mf-upr').innerHTML = up; $('mf-bip').innerHTML = bip;
      },
    };
  },
};
