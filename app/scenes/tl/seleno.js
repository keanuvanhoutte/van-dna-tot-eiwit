/*
 * Selenocysteïne (21e) en pyrrolysine (22e aminozuur): hercodering van UGA (SECIS + SBP2 + eEFSec, Sec gemaakt op tRNA-Sec)
 * en van UAG (PylRS laadt tRNA-Pyl rechtstreeks) — mens vs. methanogene archaea.
 */
import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa } from '../../kit.js';
import { hud, placeHud, textBox, koepelPad, subeenheid, tunnel, factor } from './_tlkit.js';
import { eiwit, trna2d, trnaPunt, hexMix, TRNA_SITE } from '../../bio.js';

const YM = 620, CW = 96;                                   // hoogte mRNA, breedte van één codon
const COD = ['AUG', 'GCU', 'UGU', 'UGA', 'GGU', 'AAC', 'UAA'];   // illustratief leesraam met UGA in het midden
const CX0 = 356;                                           // x-midden van het eerste codon
const cx = k => CX0 + k * CW;
const SEC_COL = '#f5a3ff', PYL_COL = '#ffb36b';
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const E2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

export default {
  id: 'seleno',
  title: { nl: 'Selenocysteïne en pyrrolysine', en: 'Selenocysteine and pyrrolysine' },
  scale: '≈ 25 nm', time: { nl: 'seconden (vertraagd)', en: 'seconds (slowed down)' },
  org: { nl: 'mens (Sec) · methanogene archaea (Pyl)', en: 'human (Sec) · methanogenic archaea (Pyl)' },
  legend: [[C.rna, 'mRNA'], [TRNA_SITE.E, { nl: 'tRNA in E', en: 'tRNA in E' }], [TRNA_SITE.P, { nl: 'tRNA in P', en: 'tRNA in P' }], [TRNA_SITE.A, { nl: 'tRNA in A', en: 'tRNA in A' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'factoren (SBP2, eEFSec, enzymen)', en: 'factors (SBP2, eEFSec, enzymes)' }], [SEC_COL, { nl: 'selenocysteïne (Sec, U)', en: 'selenocysteine (Sec, U)' }], [PYL_COL, { nl: 'pyrrolysine (Pyl, O)', en: 'pyrrolysine (Pyl, O)' }]],
  simplified: {
    nl: 'De codons rond UGA zijn illustratief (geen echt gen); het ribosoom is een 2D-schets (40S met het mRNA onder, 60S met de uitgangstunnel boven). In werkelijkheid ligt het SECIS-element veel verder, in de 3′-UTR; hier is de verbinding met het ribosoom een gestippelde lijn. Andere factoren (o.a. ribosomaal eiwit eL30, nucleoline) zijn weggelaten. Hoe vaak Sec wordt ingebouwd in plaats van te stoppen, hangt o.a. af van het SECIS-element.',
    en: 'The codons around UGA are illustrative (not a real gene); the ribosome is a 2D sketch (40S with the mRNA below, 60S with the exit tunnel above). In reality the SECIS element lies much further downstream, in the 3′ UTR; here its link to the ribosome is a dotted line. Other factors (e.g. ribosomal protein eL30, nucleolin) are omitted. How often Sec is inserted instead of stopping depends, among other things, on the SECIS element.' },
  steps: [
    ST(8500, cam(800, 520, 1500), 'UGA: stop… of een extra aminozuur', 'UGA: stop… or an extra amino acid', 'In 25 van onze genen betekent UGA niet ‘stop’ maar selenocysteïne: cysteïne met selenium in plaats van zwavel.', 'In 25 human genes UGA does not mean ‘stop’ but selenocysteine: cysteine with selenium instead of sulfur.'),
    ST(9500, cam(800, 330, 1350), 'Gemaakt op zijn eigen tRNA', 'Made on its own tRNA', 'Het tRNA krijgt eerst serine. Twee enzymen maken daar selenocysteïne van: zuurstof wordt selenium.', 'The tRNA is first loaded with serine. Two enzymes turn it into selenocysteine: oxygen becomes selenium.'),
    ST(9000, cam(920, 460, 1350), 'Een lus in het mRNA geeft het sein', 'A loop in the mRNA gives the signal', 'Een haarspeldlus achteraan in het mRNA (SECIS) roept via een eiwit een speciale helper met het tRNA erbij.', 'A hairpin loop near the end of the mRNA (SECIS) calls in, via a protein, a special helper carrying the tRNA.'),
    ST(9000, cam(770, 470, 1150), 'Het ribosoom komt bij UGA', 'The ribosome reaches UGA', 'Die speciale helper levert het tRNA af in plaats van de gewone. Het anticodon past op UGA.', 'That special helper delivers the tRNA instead of the usual one. The anticodon fits UGA.'),
    ST(8500, cam(830, 440, 1340), 'Ingebouwd, en verder lezen', 'Built in, and reading on', 'Selenocysteïne wordt gewoon vastgekoppeld en het ribosoom leest door. Zonder selenium of lus stopt het hier meestal.', 'Selenocysteine is linked on as usual and the ribosome reads on. Without selenium or the loop it usually stops here.'),
    ST(9500, cam(800, 470, 1400), 'UAG in sommige microben', 'UAG in some microbes', 'Sommige archaea en enkele bacteriën lezen UAG als pyrrolysine, een aminozuur gemaakt uit twee lysines.', 'Some archaea and a few bacteria read UAG as pyrrolysine, an amino acid made from two lysines.'),
    ST(9000, FULL, 'Aminozuur 21 en 22', 'Amino acids 21 and 22', 'Beide via een stopcodon. Selenocysteïne: in soorten uit alle drie de takken van het leven. Pyrrolysine: enkele microben.', 'Both via a stop codon. Selenocysteine: in species from all three branches of life. Pyrrolysine: a few microbes.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="se-main">
      <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}"><g id="se-ribo"></g><circle id="se-rA" data-anchor="ribosoom" r="1" fill="none"/></g>
      <g data-node="codon" data-color="${C.rna}" data-label="${T2('Genetische code: UGA', 'Genetic code: UGA')}"><g id="se-mrna"></g><circle id="se-cA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
      <g data-node="trna" data-color="${C.trna}" data-label="tRNA-Sec"><g id="se-trna"></g><circle id="se-tA" data-anchor="trna" r="1" fill="none"/></g>
      <g id="se-fac"></g>
      <g data-node="trna" data-color="${C.trna}" data-nolabel><g id="se-ftr"></g></g>
    </g>
    <g data-node="aars" data-color="${C.prot}" data-label="${T2('Aminoacyl-tRNA-synthetasen', 'Aminoacyl-tRNA synthetases')}"><g id="se-bio"></g><circle id="se-bA" data-anchor="aars" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="${SEC_COL}" data-label="${T2('Aminozuren (21 + 1)', 'Amino acids (21 + 1)')}"><g id="se-aa"></g><circle id="se-aA" data-anchor="aminozuren" r="1" fill="none"/></g>
    <g data-node="codon" data-color="${C.rna}" data-nolabel><g id="se-pylm"></g></g>
    <g data-node="trna" data-color="${C.trna}" data-nolabel><g id="se-pylt"></g></g>
    <g id="se-pyl"></g>
    <g data-node="vouwing" data-color="${C.chain}" data-nolabel><g id="se-chain"></g></g>
    <g id="se-ov"></g>
    <g data-node="aminozuren" data-color="${SEC_COL}" data-nolabel><g id="se-tab"></g></g>
    ${hud('se-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'codon', label: { nl: 'Genetische code', en: 'Genetic code' }, color: C.rna },
      { node: 'aminozuren', label: { nl: 'Aminozuren', en: 'Amino acids' }, color: SEC_COL },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const hide = id => $(id).setAttribute('cx', '-9999');
    const bead = (x, y, lab, col, r = 22) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}" stroke="#0a1224" stroke-width="2"/><text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .68)}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">${lab}</text>`;
    const ntb = (x, y, b, w = 30, extra = '') => `<rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${w}" rx="5" fill="${BASE[b]}" ${extra}/><text x="${f1(x)}" y="${f1(y + w * .72)}" font-size="${f1(w * .62)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`;
    /* tRNA = het gedeelde symbool (bio.js trna2d): anticodon (links→rechts 3′→5′) op (x, y), aminozuur op het CCA-uiteinde */
    const TS = 1, top = (x, y) => trnaPunt(x, y, { s: TS });
    function trna(x, y, ac, charge, op = 1, big = false, col = TRNA_SITE.P) {
      return trna2d(x, y, { anticodon: ac, nt: 32 / TS, tile: [.875, .875], aa: charge?.[0] ?? null, aaCol: charge?.[1] ?? null, op, col, ends: big, s: TS });
    }
    /* 80S in leesweergave: 60S boven (met de tunnel van het PTC naar buiten), 40S onder met het mRNA; statisch per x */
    const riboCache = {};
    function ribo(x, op = 1) {
      if (op <= .01) return '';
      riboCache[x] ??= subeenheid(koepelPad(x, YM - 12, 250, 324, { seed: 61 }), { fill: .1 }) + tunnel([x + 22, YM - 288], [x + 26, YM - 338], { w: 40 }) +
        subeenheid(koepelPad(x, YM + 44, 230, 76, { seed: 41, dir: 1 }), { fill: .16, col: '#8df0dc' }) +
        `<g font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.text}" text-anchor="middle" opacity=".8"><text x="${x - CW}" y="${YM + 100}">E</text><text x="${x}" y="${YM + 100}">P</text><text x="${x + CW}" y="${YM + 100}">A</text></g>`;
      return `<g opacity="${f1(op)}">${riboCache[x]}</g>`;
    }
    function mrna(shift = 0, uga = 'UGA', hiUGA = 0, op = 1) {
      let s = `<g opacity="${f1(op)}"><line x1="${90 - shift}" y1="${YM + 18}" x2="1520" y2="${YM + 18}" stroke="${C.rna}" stroke-width="6"/>`;
      s += `<circle cx="${80 - shift}" cy="${YM + 18}" r="17" fill="${C.cap}"/>` + txt(80 - shift, YM - 12, "5′", C.text, 20);
      COD.forEach((c, k) => {
        const cc = k === 3 ? uga : c, x = cx(k) - shift;
        cc.split('').forEach((b, j) => { s += ntb(x - 32 + j * 32, YM + 4, b, 30, k === 3 && hiUGA ? `stroke="#fff" stroke-width="${f1(1 + 3 * hiUGA)}"` : ''); });
        s += `<line x1="${f1(x - CW / 2)}" y1="${YM + 40}" x2="${f1(x - CW / 2)}" y2="${YM + 56}" stroke="${C.muted}" stroke-width="2"/>`;
      });
      // 3'-UTR met SECIS en poly(A)
      const sx = 1210;
      s += `<path d="M${sx - 22},${YM + 4} V${YM - 150} a22,22 0 0 1 44,0 V${YM + 4}" stroke="${C.rna}" stroke-width="7" fill="none"/>` +
        [0, 1, 2, 3, 4].map(k => `<line x1="${sx - 18}" y1="${YM - 20 - k * 26}" x2="${sx + 18}" y2="${YM - 20 - k * 26}" stroke="#fff" stroke-width="2" opacity=".7"/>`).join('') +
        txt(sx + 40, YM - 150, 'SECIS', C.rna, 22, 'start', 800) + txt(1040 - shift, YM + 90, "3′-UTR", C.muted, 22, 'start') +
        txt(1390, YM + 8, 'AAAA…', C.rna, 22, 'start', 700) + txt(1530, YM + 8, "3′", C.text, 22, 'start');
      return s + '</g>';
    }

    return {
      update(t, s) {
        placeHud(svg, 'se-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        let rb = '', mr = '', tr = '', fac = '', ftr = '', bio = '', aaS = '', pyl = '', pylm = '', pylt = '', chn = '', tab = '', ov = '';
        const P = cx(2), A = cx(3);                       // P-plaats boven codon 2 (UGU), A-plaats boven UGA
        const mainOp = i === 5 ? 1 - sub(p, 0, .2) : i === 6 ? 0 : 1;
        $('se-main').setAttribute('opacity', f1(i === 1 ? 0 : mainOp));
        if (i <= 4 && i !== 1) {
          const shift = i === 4 ? CW * ease(sub(p, .45, .75)) : 0;
          mr = mrna(shift, 'UGA', i === 0 ? sub(p, .2, .4) : i === 3 ? 1 : 0);
          rb = ribo(P, i === 0 ? sub(p, 0, .2) : 1);
          $('se-rA').setAttribute('cx', f1(P - 170)); $('se-rA').setAttribute('cy', f1(YM - 285));   // links van de keten, zodat 'Met' vrij blijft
          $('se-cA').setAttribute('cx', f1(A - shift)); $('se-cA').setAttribute('cy', f1(YM + (i === 0 ? 122 : 142)));
          // P-plaats-tRNA met keten (Met-Ala-Cys)
          /* keten: nieuwste aminozuur aan de punt van zijn tRNA (bij het PTC), de oudere door de tunnel van de 60S naar buiten (N-uiteinde voorop) */
          const SLOT = [[P + 26, YM - 334], [P + 36, YM - 382], [P + 52, YM - 428]];
          const chainAt = (x, y, extra) => { const beads = [['Cys', '#5fd3e6'], ['Ala', '#7fdc6a'], ['Met', '#7fdc6a']]; if (extra) beads.unshift(extra); const pos = beads.map((b, j) => j ? SLOT[j - 1] : [x - 10, y - 30]); let c = ''; beads.forEach((b, j) => { const [bx, by] = pos[j]; if (j) c += `<line x1="${f1(pos[j - 1][0])}" y1="${f1(pos[j - 1][1])}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${C.chain}" stroke-width="5"/>`; }); beads.forEach((b, j) => { c += bead(pos[j][0], pos[j][1], b[0], b[1], 22); }); return c; };
          const yDock = YM - 32, cA = x => { const q = top(x, yDock); return [q[0] + 10, q[1] + 30]; };   // chainAt tekent het nieuwste bolletje op (x − 10, y − 30) = het aminozuur van het tRNA
          if (i < 4) {
            tr += trna(P, yDock, 'ACA', null);
            chn += chainAt(...cA(P));
          }
          if (i === 3 || i === 4) {
            const k = i === 3 ? ease(sub(p, .15, .55)) : 1;
            const [x, y] = E2([A + 420, yDock - 380], [A, yDock], k);
            const bond = i === 4 ? sub(p, .1, .4) : 0, leave = i === 4 ? sub(p, .45, 1) : 0;
            if (i === 4) {
              // na peptidebinding: keten op Sec-tRNA, oude tRNA → E en weg
              tr += trna(P - shift - 160 * sub(p, .75, 1), yDock - 200 * sub(p, .75, 1), 'ACA', null, 1 - sub(p, .75, .9), false, hexMix(TRNA_SITE.P, TRNA_SITE.E, shift / CW));   // weg vóór het eindbeeld
              const secBead = ['Sec', SEC_COL];
              const colA = hexMix(TRNA_SITE.A, TRNA_SITE.P, shift / CW);
              if (bond < 1) { tr += trna(A - shift, yDock, 'ACU', secBead, 1, false, colA); chn += chainAt(cA(P)[0] + (A - P) * bond * .5, cA(P)[1]); }
              else { tr += trna(A - shift, yDock, 'ACU', null, 1, false, colA); chn += chainAt(...cA(A - shift), secBead); }
              ov += `<g opacity="${f1(sub(p, .15, .35) * (1 - sub(p, .7, .8)))}">${txt(A + 140, yDock - 320, T2('peptidebinding', 'peptide bond'), '#fff', 22, 'start', 700)}</g>`;
              ov += `<g opacity="${f1(sub(p, .8, .95))}">` + textBox(755, 180, 460, [T2('Zonder Se of SECIS: meestal stop', 'Without Se or SECIS: usually stop'), T2('→ afgeknot eiwit', '→ truncated protein')], { col: C.danger, fs: 21 }) + '</g>';
            } else {
              tr += trna(x, y, 'ACU', ['Sec', SEC_COL], 1, k > .95, TRNA_SITE.A);
              fac += `<g opacity="${f1(1 - sub(p, .7, .9))}">${factor(x + 100, y - 190, 150, 34, 'eEFSec·GTP', C.prot2, 1, 17)}</g>`;
              // paring UCA–UGA
              const pr = sub(p, .55, .7);
              if (pr > 0) for (let j = 0; j < 3; j++) { const n = 'UGA'[j] === 'G' ? 3 : 2; for (let q = 0; q < n; q++) fac += `<line x1="${f1(A - 32 + j * 32 + (q - (n - 1) / 2) * 7)}" y1="${YM - 4}" x2="${f1(A - 32 + j * 32 + (q - (n - 1) / 2) * 7)}" y2="${YM + 4}" stroke="#fff" stroke-width="2.5" opacity="${f1(pr)}"/>`; }
              fac += `<g opacity="${f1(sub(p, .6, .75))}">${txt(A + 70, yDock - 40, T2('UCA · UGA', 'UCA · UGA'), '#fff', 22, 'start', 700)}</g>`;
              // SECIS-SBP2-verbinding
              fac += `<path d="M1210,${YM - 190} C1150,${YM - 420} ${A + 200},${YM - 420} ${A + 90},${YM - 300}" stroke="${C.prot}" stroke-width="3" stroke-dasharray="6 7" fill="none" opacity=".8"/>`;
            }
            $('se-tA').setAttribute('cx', f1(A - shift + 80)); $('se-tA').setAttribute('cy', f1(yDock - 120));
          } else hide('se-tA');
          if (i >= 2 && i <= 3) {
            const k = i === 2 ? ease(sub(p, .1, .35)) : 1;
            fac += `<g opacity="${f1(k)}">${eiwit(1210, YM - 205, 64, 30, C.prot, { seed: 22, label: 'SBP2', fs: 20 })}</g>`;
            if (i === 2) {
              const k2 = ease(sub(p, .4, .75));
              const [x, y] = E2([1450, 200], [1140, YM - 120], k2);
              ftr += trna(x - 40, y, 'ACU', ['Sec', SEC_COL], sub(p, .35, .45)); fac += `<g opacity="${f1(sub(p, .35, .45))}">${factor(x + 64, y - 190, 164, 36, 'eEFSec·GTP', C.prot2, 1, 19)}</g>`;
              ov += `<g opacity="${f1(sub(p, .8, .95))}">${textBox(745, 250, 310, [T2('eEFSec vervangt eEF1A', 'eEFSec replaces eEF1A'), T2('alleen voor Sec-tRNA-Sec', 'only for Sec-tRNA-Sec')], { col: C.prot, fs: 19 })}</g>`;
            }
          }
          if (i === 0) {
            ov += `<g opacity="${f1(sub(p, .3, .5))}">${txt(A, YM + 96, T2('UGA in het leesraam', 'UGA in the reading frame'), '#fff', 22, 'middle', 800)}${txt(cx(6), YM + 96, T2('echte stop', 'real stop'), C.danger, 22, 'middle', 700)}</g>`;
            aaS += `<g opacity="${f1(sub(p, .55, .75))}">` + textBox(960, 140, 440, [T2('Cys: –CH₂–SH', 'Cys: –CH₂–SH'), T2('Sec: –CH₂–SeH', 'Sec: –CH₂–SeH')], { title: T2('Selenocysteïne (Sec, U)', 'Selenocysteine (Sec, U)'), col: SEC_COL, fs: 24 }) + '</g>';
            $('se-aA').setAttribute('cx', '400'); $('se-aA').setAttribute('cy', '140');
          } else hide('se-aA');
        } else hide('se-aA');
        // biosynthese op het tRNA (stap 1)
        if (i === 1) {
          const st = [[300, null, ''], [610, ['Ser', '#5fd3e6'], 'SerRS + ATP'], [920, ['Sep', '#ff9a6b'], 'PSTK + ATP'], [1230, ['Sec', SEC_COL], 'SepSecS|' + T2('+ selenofosfaat', '+ selenophosphate')]];
          st.forEach(([x, ch, en], j) => {
            const k = j ? sub(p, .05 + j * .2, .2 + j * .2) : 1;           // eerste tRNA meteen; de volgende staan al vaag klaar
            if (j && k < 1) bio += trna(x, 440, 'ACU', null, .5 * (1 - k));
            bio += `<g opacity="${f1(k)}">` + trna(x, 440, 'ACU', ch, 1, j === 0) + (j ? `<path d="M${x - 240},300 h130" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + en.split('|').map((ln, q) => txt(x - 172, 250 + q * 22, ln, C.prot, 18, 'middle', 700)).join('') : '') + '</g>';
          });
          bio += txt(300, 500, 'tRNA-Sec', C.trna, 22, 'middle', 800) + txt(300, 526, T2('anticodon 5′-UCA-3′', 'anticodon 5′-UCA-3′'), C.muted, 18);
          bio += `<g opacity="${f1(sub(p, .85, 1))}">${txt(770, 580, T2('selenofosfaat komt van SPS2 (uit selenide + ATP)', 'selenophosphate comes from SPS2 (from selenide + ATP)'), C.muted, 20, 'middle', 600)}</g>`;
          $('se-bA').setAttribute('cx', '610'); $('se-bA').setAttribute('cy', '110');
        } else hide('se-bA');
        // pyrrolysine
        if (i === 5) {
          const k = 1, y0 = 640;                                        // mRNA en uitlegkader meteen in beeld
          let m0 = `<g opacity="${f1(k)}"><line x1="200" y1="${y0 + 16}" x2="1400" y2="${y0 + 16}" stroke="${C.rna}" stroke-width="6"/>`;
          ['AUG', 'AAA', 'UAG', 'GCA', 'UUC', 'GGA'].forEach((c, q) => { const x = 420 + q * 110; c.split('').forEach((b, j) => { m0 += ntb(x - 32 + j * 32, y0, b, 30, q === 2 ? 'stroke="#fff" stroke-width="3"' : ''); }); });
          m0 += txt(190, y0 + 24, "5′", C.text, 20, 'end') + txt(1410, y0 + 24, "3′", C.text, 20, 'start') + txt(640, y0 + 80, T2('UAG = Pyl', 'UAG = Pyl'), PYL_COL, 24, 'middle', 800) + '</g>';
          const k2 = ease(sub(p, .35, .7));
          const [x, y] = E2([1150, 330], [640, y0 - 30], k2);
          pylm = m0; pylt = trna(x, y, 'AUC', ['Pyl', PYL_COL], 1, k2 > .95);
          let s0 = `<g>` + textBox(150, 330, 430, [T2('2 × Lys → Pyl (PylB, C, D)', '2 × Lys → Pyl (PylB, C, D)'), T2('PylRS laadt tRNA-Pyl direct', 'PylRS charges tRNA-Pyl directly'), T2('bv. methylamine-methyltransferasen', 'e.g. methylamine methyltransferases')], { title: T2('Pyrrolysine (Pyl, O)', 'Pyrrolysine (Pyl, O)'), col: PYL_COL, fs: 19 }) + '</g>';
          s0 += `<g opacity="${f1(sub(p, .75, .9))}">${txt(x + 60, y - 110, T2('CUA · UAG', 'CUA · UAG'), '#fff', 22, 'start', 700)}</g>`;
          pyl = s0;
        }
        if (i === 6) {
          const X = 300, Y = 230;
          const lit = r => .5 + .5 * sub(p, .04 + r * .1, .12 + r * .1);   // tabel staat er meteen; rijen lichten één voor één op
          const row = (y, a, b, c, bold, r = 0) => `<g opacity="${f1(bold ? 1 : lit(r))}">` + txt(X, y, a, C.muted, 26, 'start', 600) + txt(X + 330, y, b, bold ? SEC_COL : C.text, 26, 'start', bold ? 800 : 500) + txt(X + 700, y, c, bold ? PYL_COL : C.text, 26, 'start', bold ? 800 : 500) + '</g>';
          ov += `<g><rect x="${X - 40}" y="${Y - 70}" width="1080" height="500" rx="16" fill="rgba(9,14,28,.86)" stroke="${SEC_COL}" stroke-opacity=".5" stroke-width="2"/>` +
            row(Y, '', T2('selenocysteïne', 'selenocysteine'), T2('pyrrolysine', 'pyrrolysine'), true) +
            row(Y + 80, T2('codon', 'codon'), 'UGA', 'UAG', 0, 0) +
            row(Y + 150, T2('signaal', 'signal'), T2("SECIS (euk.: 3′-UTR)", "SECIS (euk.: 3′ UTR)"), T2('geen vereist', 'none required'), 0, 1) +
            row(Y + 220, T2('gemaakt', 'made'), T2('op het tRNA (uit Ser)', 'on the tRNA (from Ser)'), T2('als vrij aminozuur', 'as a free amino acid'), 0, 2) +
            row(Y + 290, T2('aflevering', 'delivery'), T2('eEFSec (bact.: SelB)', 'eEFSec (bact.: SelB)'), 'EF-Tu', 0, 3) +
            row(Y + 360, T2('mens', 'human'), T2('25 selenoproteïnen', '25 selenoproteins'), T2('nee', 'no'), 0, 4) + '</g>';
          tab = bead(X + 288, Y - 9, 'Sec', SEC_COL, 34) + bead(X + 658, Y - 9, 'Pyl', PYL_COL, 34);
        }
        $('se-ribo').innerHTML = rb; $('se-mrna').innerHTML = mr; $('se-trna').innerHTML = tr; $('se-fac').innerHTML = fac;
        $('se-bio').innerHTML = bio; $('se-aa').innerHTML = aaS; $('se-pyl').innerHTML = pyl; $('se-ov').innerHTML = ov; $('se-ftr').innerHTML = ftr; $('se-pylm').innerHTML = pylm; $('se-pylt').innerHTML = pylt; $('se-chain').innerHTML = chn; $('se-tab').innerHTML = tab;
      },
    };
  },
};
