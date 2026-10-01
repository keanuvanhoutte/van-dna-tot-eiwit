import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, phos, ub } from './_b_kit.js';

/* Panelen naast elkaar: A (0–1600) kwaliteitscontrole & aggregatie · B (1700–3300) kinetiek · C (3400–5000) cross-β
 * D (5100–6700) ziekten · E (6800–8400) prionen · F (8500–10100) UPR */
const HYD = '#ff9f43', BAD = '#ff6b6b', SC = '#e07b5a';
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const native = (x, y, s = 1, op = 1) => `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(62 * s)}" ry="${f1(50 * s)}" fill="rgba(127,220,106,.2)" stroke="${C.chain}" stroke-width="4"/>` +
  chain([[x - 38 * s, y + 5 * s], [x - 16 * s, y - 28 * s], [x + 4 * s, y + 10 * s], [x + 24 * s, y - 24 * s], [x + 40 * s, y + 12 * s], [x, y + 32 * s]], { w: 5, op: .7 }) + '</g>';
const misf = (x, y, s = 1, op = 1, rot = 0) => `<g opacity="${f1(op)}" transform="rotate(${f1(rot)} ${f1(x)} ${f1(y)})">` + chain([[x - 60 * s, y + 20 * s], [x - 30 * s, y - 20 * s], [x, y + 18 * s], [x + 30 * s, y - 24 * s], [x + 62 * s, y + 10 * s]], { w: 7 }) +
  `<path d="${smooth([[x - 30 * s, y - 20 * s], [x, y + 18 * s], [x + 30 * s, y - 24 * s]])}" stroke="${HYD}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/></g>`;

export default {
  id: 'misvouwing',
  title: { nl: 'Misvouwing & aggregatie', en: 'Misfolding & aggregation' },
  scale: { nl: 'monomeer ≈ 3 nm · fibril ≈ 10 nm breed, µm lang', en: 'monomer ≈ 3 nm · fibril ≈ 10 nm wide, µm long' },
  time: { nl: 'uren tot jaren (in weefsels)', en: 'hours to years (in tissues)' },
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
      'Een misgevouwen eiwit toont hydrofobe stukken aan de buitenkant. Chaperones proberen het opnieuw te vouwen; lukt dat niet, dan volgt afbraak.',
      'A misfolded protein exposes hydrophobic stretches on the outside. Chaperones try to refold it; if that fails, it is degraded.'),
    ST(8000, cam(915, 470, 1340), 'Klonteren: aggregatie', 'Clumping: aggregation',
      'Is de kwaliteitscontrole overbelast (stress, ouderdom, mutaties)? Dan plakken ketens aan elkaar: amorfe klonten of geordende oligomeren en fibrillen.',
      'Is quality control overloaded (stress, ageing, mutations)? Then chains stick together: amorphous clumps or ordered oligomers and fibrils.'),
    ST(9000, cam(2500, 470, 1500), 'Nucleatie-afhankelijke groei', 'Nucleation-dependent growth',
      'Een kern vormen is traag (lag-fase); daarna groeien fibrillen snel door monomeren aan de uiteinden. Een toegevoegde "zaadkern" slaat de lag-fase over.',
      'Forming a nucleus is slow (lag phase); then fibrils grow fast by adding monomers at their ends. An added "seed" skips the lag phase.'),
    ST(9000, cam(4200, 470, 1500), 'De cross-β-structuur', 'The cross-β structure',
      'In amyloïd staan β-strengen loodrecht op de fibrilas, ~4,7 Å uit elkaar, verbonden door H-bruggen langs de as. Twee bladen (~10 Å uit elkaar) grijpen in elkaar.',
      'In amyloid, β-strands run perpendicular to the fibril axis, ~4.7 Å apart, linked by H-bonds along the axis. Two sheets (~10 Å apart) interlock.'),
    ST(8500, cam(5925, 470, 1650), 'Ziekten door amyloïd', 'Diseases caused by amyloid',
      'Aβ en tau bij Alzheimer, α-synucleïne bij Parkinson, IAPP bij type 2-diabetes, het prioneiwit bij Creutzfeldt-Jakob. Vooral kleine oligomeren lijken toxisch.',
      'Aβ and tau in Alzheimer\'s, α-synuclein in Parkinson\'s, IAPP in type 2 diabetes, the prion protein in Creutzfeldt–Jakob disease. Small oligomers in particular appear toxic.'),
    ST(8500, cam(7600, 470, 1450), 'Prionen: vouwing als besmetting', 'Prions: folding as infection',
      'Het β-rijke PrPSc dient als mal: het zet normaal, α-helixrijk PrPC om in PrPSc. Zo vermenigvuldigt een vouwing zich zonder DNA of RNA.',
      'β-rich PrPSc acts as a template: it converts normal, α-helix-rich PrPC into PrPSc. A fold thus multiplies without DNA or RNA.'),
    ST(9500, cam(9300, 450, 1650), 'Alarm in het ER: de UPR', 'Alarm in the ER: the UPR',
      'Hopen ongevouwen eiwitten zich op in het ER, dan laat BiP de sensoren IRE1, PERK en ATF6 los. Die remmen de translatie en maken meer chaperones; blijft de stress, dan volgt apoptose.',
      'When unfolded proteins pile up in the ER, BiP releases the sensors IRE1, PERK and ATF6. These slow translation and make more chaperones; if stress persists, apoptosis follows.'),
  ],
  svg() {
    /* paneel D: ziektekaarten */
    const cards = [
      ['Aβ', T2('Alzheimer', 'Alzheimer\'s'), T2('plaques buiten neuronen', 'plaques outside neurons'), 'idp'],
      ['tau', T2('Alzheimer', 'Alzheimer\'s'), T2('kluwens in neuronen', 'tangles inside neurons'), null],
      ['α-synucleïne', T2('Parkinson', 'Parkinson\'s'), T2('Lewy-lichaampjes', 'Lewy bodies'), null],
      ['IAPP (amyline)', T2('type 2-diabetes', 'type 2 diabetes'), T2('in de eilandjes van Langerhans', 'in the islets of Langerhans'), null],
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
    const erm = `<rect x="8540" y="400" width="1520" height="44" fill="${C.mem}" opacity=".22"/><line x1="8540" y1="400" x2="10060" y2="400" stroke="${C.mem}" stroke-width="3"/><line x1="8540" y1="444" x2="10060" y2="444" stroke="${C.mem}" stroke-width="3"/>` +
      T(8560, 382, 'cytosol', { size: 25, col: C.muted, anchor: 'start' }) + T(8560, 482, T2('ER-lumen', 'ER lumen'), { size: 25, col: C.mem, anchor: 'start' });
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
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const sig = (u, m = .5, k = 13) => 1 / (1 + Math.exp(-(u - m) * k));
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A ---------- */
        let a = '', ch = '', dg = '', nt = '';
        const misX = 820, misY = 460;
        if (step <= 1) {
          nt += native(420, 460, 1.4) + T(420, 585, T2('natief: hydrofoob binnenin', 'native: hydrophobic inside'), { size: 23, col: C.chain });
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
            xb += `<path d="M${x0 + 5 * dx},${yT - 20} v-14 H${x0 + 6 * dx} v14" stroke="#fff" stroke-width="3" fill="none" opacity="${f1(k)}"/>` + T(x0 + 5.5 * dx, yT - 46, '4,7 Å', { size: 24, w: 800, op: k });
            xb += T(3990, 640, T2('H-bruggen evenwijdig aan de as', 'H-bonds parallel to the axis'), { size: 20, col: '#fff', op: k });
            // eind-aanzicht inzet
            const k2 = sub(p, .7, .9);
            xb += panel(4540, 250, 400, 360, { op: k2 }) + T(4740, 290, T2('dwarsdoorsnede', 'cross-section'), { size: 20, col: C.muted, op: k2 });
            for (let i = 0; i < 5; i++) xb += `<g opacity="${f1(k2)}"><rect x="${4600 + i * 60}" y="370" width="44" height="20" rx="5" fill="${BAD}"/><rect x="${4630 + i * 60 - 30}" y="480" width="44" height="20" rx="5" fill="#b35a5a"/>` +
              `<line x1="${4622 + i * 60}" y1="390" x2="${4622 + i * 60}" y2="420" stroke="${SC}" stroke-width="6"/><line x1="${4622 + i * 60}" y1="480" x2="${4622 + i * 60}" y2="450" stroke="${SC}" stroke-width="6"/></g>`;
            xb += `<path d="M4930,380 v110" stroke="#fff" stroke-width="3" opacity="${f1(k2)}"/>` + T(4905, 445, '≈ 10 Å', { size: 20, w: 800, op: k2, anchor: 'end' }) + T(4740, 556, T2('zijketens in elkaar', 'side chains interlock'), { size: 23, col: SC, op: k2 }) + T(4740, 590, '"steric zipper"', { size: 23, col: SC, op: k2 });
          }
          xb += T(3990, 180, T2('amyloïdfibril (zijaanzicht)', 'amyloid fibril (side view)'), { size: 26, w: 700 });
        }
        $('mf-xb').innerHTML = xb;

        /* ---------- paneel E: prionen ---------- */
        let pr = '';
        if (step >= 4 && step <= 6) {
          const helixProt = (x, y, op = 1) => `<g opacity="${f1(op)}"><ellipse cx="${x}" cy="${y}" rx="95" ry="75" fill="rgba(127,220,106,.16)" stroke="${C.chain}" stroke-width="4"/>` +
            [[-45, -20], [10, 25], [45, -25]].map(([dx, dy]) => { let d = ''; for (let k = 0; k <= 24; k++) d += `${k ? 'L' : 'M'}${f1(x + dx - 30 + k * 2.5)},${f1(y + dy + 10 * Math.sin(k * .8))}`; return `<path d="${d}" stroke="${C.chain}" stroke-width="5" fill="none"/>`; }).join('') + '</g>';
          const betaProt = (x, y, op = 1) => `<g opacity="${f1(op)}"><ellipse cx="${x}" cy="${y}" rx="95" ry="75" fill="rgba(255,107,107,.16)" stroke="${BAD}" stroke-width="4"/>` +
            [-40, -13, 14, 41].map(dx => `<path d="M${x + dx},${y + 40} v-62" stroke="${BAD}" stroke-width="12"/><path d="M${x + dx - 11},${y - 20} L${x + dx},${y - 40} L${x + dx + 11},${y - 20}Z" fill="${BAD}"/>`).join('') + '</g>';
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
        let up = '';
        if (step >= 5) {
          const q = step === 6 ? p : 0;
          const unf = sub(q, .05, .3), rel = ease(sub(q, .25, .45)), act = [sub(q, .4, .55), sub(q, .55, .7), sub(q, .7, .85)], fin = sub(q, .85, .97);
          // ongevouwen eiwitten in het lumen
          for (let i = 0; i < 9; i++) { const x = 8700 + i * 150 + (i % 2) * 40, y = 640 + (i % 3) * 50; up += `<g opacity="${f1(clamp(unf * 9 - i))}">` + chain([[x - 40, y], [x - 15, y - 25], [x + 10, y + 10], [x + 40, y - 18]], { w: 6, dash: '10 5' }) + '</g>'; }
          up += T(9300, 820, T2('ongevouwen eiwitten hopen zich op', 'unfolded proteins pile up'), { size: 25, col: HYD, op: unf });
          const SENS = [[8800, 'IRE1'], [9300, 'PERK'], [9800, 'ATF6']];
          SENS.forEach(([x, lab], i) => {
            const a2 = act[i];
            const move = i === 2 ? ease(sub(q, .7, .85)) : 0;
            const sx = x + 170 * move, sy = -110 * move;
            up += `<g transform="translate(0 ${f1(sy)})" opacity="${f1(1 - move * .85)}"><rect x="${sx - 14}" y="392" width="28" height="60" rx="8" fill="rgba(155,123,255,.45)" stroke="${C.prot}" stroke-width="3"/>` +
              enz(sx, 500, 46, 34, '', { col: C.prot }) + enz(sx, 330, 60, 44, '', { col: C.prot, fillOp: a2 > .5 ? .55 : .25 }) + (i < 2 ? enz(sx + 70 * a2, 330, 60, 44, '', { col: C.prot, op: a2, fillOp: .55 }) + enz(sx + 70 * a2, 500, 46, 34, '', { col: C.prot, op: a2 }) : '') +
              T(sx, 262, lab, { size: 27, col: '#c9b8ff', w: 800 }) + '</g>';
            // BiP gebonden → los
            up += enz(sx - 50 + (-80 * rel), 540 + 60 * rel, 40, 26, 'BiP', { col: C.prot2, fs: 19, fillOp: .6 });
            if (i < 2) up += phos(sx + 35, 300, 16, a2);
          });
          // uitkomsten
          up += T(8800, 212, T2('XBP1-mRNA splicen', 'splice XBP1 mRNA'), { size: 23, col: C.text, op: act[0] });
          up += T(9300, 212, T2('eIF2α-P → translatie ↓', 'eIF2α-P → translation ↓'), { size: 23, col: C.text, op: act[1] });
          up += T(9800, 212, T2('naar Golgi → ATF6(N)', 'to Golgi → ATF6(N)'), { size: 23, col: C.text, op: act[2] });
          up += panel(8700, 100, 1200, 66, { op: fin, col: C.ok }) + T(9300, 142, T2('meer chaperones + ERAD · <tspan fill="#ff6b6b">te lang → apoptose</tspan>', 'more chaperones + ERAD · <tspan fill="#ff6b6b">too long → apoptosis</tspan>'), { size: 25, col: C.ok, op: fin });
        }
        $('mf-upr').innerHTML = up;
      },
    };
  },
};
