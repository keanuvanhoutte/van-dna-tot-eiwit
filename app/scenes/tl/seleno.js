/*
 * Selenocysteïne (21e) en pyrrolysine (22e aminozuur): hercodering van UGA (SECIS + SBP2 + eEFSec, Sec gemaakt op tRNA-Sec)
 * en van UAG (PylRS laadt tRNA-Pyl rechtstreeks) — mens vs. methanogene archaea.
 */
import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';

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
  legend: [[C.rna, 'mRNA'], [C.trna, 'tRNA'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'factoren (SBP2, eEFSec, enzymen)', en: 'factors (SBP2, eEFSec, enzymes)' }], [SEC_COL, { nl: 'selenocysteïne (Sec, U)', en: 'selenocysteine (Sec, U)' }], [PYL_COL, { nl: 'pyrrolysine (Pyl, O)', en: 'pyrrolysine (Pyl, O)' }]],
  simplified: {
    nl: 'De codons rond UGA zijn illustratief (geen echt gen). In werkelijkheid ligt het SECIS-element honderden tot duizenden nucleotiden verder in de 3\'-UTR en brengt een lus van het mRNA het terug bij het ribosoom; hier is dat een gestippelde lijn. Andere factoren (o.a. ribosomaal eiwit eL30, nucleoline) zijn weggelaten. De inbouw is inefficiënt: vaak wint terminatie door eRF1.',
    en: 'The codons around UGA are illustrative (not a real gene). In reality the SECIS element lies hundreds to thousands of nucleotides downstream in the 3\' UTR and a loop of the mRNA brings it back to the ribosome; here that is a dotted line. Other factors (e.g. ribosomal protein eL30, nucleolin) are omitted. Incorporation is inefficient: termination by eRF1 often wins.' },
  steps: [
    ST(8500, cam(800, 520, 1500), 'UGA: stop… of selenocysteïne', 'UGA: stop… or selenocysteine', 'In 25 menselijke genen betekent een UGA midden in het leesraam selenocysteïne (Sec): een cysteïne met selenium in plaats van zwavel (bv. glutathionperoxidasen, deiodinasen).', 'In 25 human genes a UGA inside the reading frame means selenocysteine (Sec): a cysteine with selenium instead of sulfur (e.g. glutathione peroxidases, deiodinases).'),
    ST(9500, cam(800, 330, 1350), 'Sec wordt op zijn tRNA gemaakt', 'Sec is made on its tRNA', 'Er is geen vrij Sec: seryl-tRNA-synthetase laadt tRNA-Sec (anticodon UCA) met serine; PSTK fosforyleert, SepSecS vervangt de fosfaatgroep door selenium.', 'There is no free Sec: seryl-tRNA synthetase charges tRNA-Sec (anticodon UCA) with serine; PSTK phosphorylates it, SepSecS replaces the phosphate with selenium.'),
    ST(9000, cam(1040, 520, 1050), "SECIS-element in de 3'-UTR", "SECIS element in the 3' UTR", "Een stam-lus in de 3'-UTR (SECIS) bindt het eiwit SBP2. SBP2 rekruteert de speciale elongatiefactor eEFSec met Sec-tRNA-Sec.", "A stem-loop in the 3' UTR (SECIS) binds the protein SBP2. SBP2 recruits the special elongation factor eEFSec carrying Sec-tRNA-Sec."),
    ST(9000, cam(700, 480, 1050), 'Het ribosoom bereikt UGA', 'The ribosome reaches UGA', 'Staat UGA in de A-plaats, dan levert eEFSec·GTP het Sec-tRNA (in plaats van eEF1A). Het anticodon UCA paart met UGA.', 'With UGA in the A site, eEFSec·GTP delivers Sec-tRNA (instead of eEF1A). The anticodon UCA pairs with UGA.'),
    ST(8500, cam(700, 460, 1050), 'Sec ingebouwd, translatie gaat door', 'Sec incorporated, translation continues', 'Sec wordt via een gewone peptidebinding ingebouwd; het ribosoom leest verder tot het echte stopcodon. Zonder selenium of SECIS stopt het ribosoom bij UGA.', 'Sec is added by a normal peptide bond; the ribosome reads on to the real stop codon. Without selenium or SECIS the ribosome stops at UGA.'),
    ST(9500, cam(800, 470, 1400), 'Pyrrolysine: UAG in methanogenen', 'Pyrrolysine: UAG in methanogens', 'Sommige archaea (bv. Methanosarcina) en enkele bacteriën lezen UAG als pyrrolysine (Pyl). Pyl wordt uit 2 lysines gemaakt en door PylRS rechtstreeks op tRNA-Pyl (anticodon CUA) gezet.', 'Some archaea (e.g. Methanosarcina) and a few bacteria read UAG as pyrrolysine (Pyl). Pyl is made from 2 lysines and loaded directly onto tRNA-Pyl (anticodon CUA) by PylRS.'),
    ST(9000, FULL, 'Het 21e en 22e aminozuur', 'The 21st and 22nd amino acids', 'Beide zijn genetisch gecodeerd via een stopcodon. Sec komt in alle drie domeinen van het leven voor (niet in alle soorten), Pyl alleen in enkele micro-organismen.', 'Both are genetically encoded via a stop codon. Sec occurs in all three domains of life (not in every species), Pyl only in a few microorganisms.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="se-main">
      <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}"><g id="se-ribo"></g><circle id="se-rA" data-anchor="ribosoom" r="1" fill="none"/></g>
      <g data-node="codon" data-color="${C.rna}" data-label="${T2('Genetische code: UGA', 'Genetic code: UGA')}"><g id="se-mrna"></g><circle id="se-cA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
      <g data-node="trna" data-color="${C.trna}" data-label="tRNA-Sec"><g id="se-trna"></g><circle id="se-tA" data-anchor="trna" r="1" fill="none"/></g>
      <g id="se-fac"></g>
    </g>
    <g data-node="aars" data-color="${C.prot}" data-label="${T2('Aminoacyl-tRNA-synthetasen', 'Aminoacyl-tRNA synthetases')}"><g id="se-bio"></g><circle id="se-bA" data-anchor="aars" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="${SEC_COL}" data-label="${T2('Aminozuren (21 + 1)', 'Amino acids (21 + 1)')}"><g id="se-aa"></g><circle id="se-aA" data-anchor="aminozuren" r="1" fill="none"/></g>
    <g id="se-pyl"></g>
    <g id="se-ov"></g>
    ${hud('se-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'codon', label: { nl: 'Genetische code', en: 'Genetic code' }, color: C.rna },
      { node: 'aminozuren', label: { nl: 'Aminozuren', en: 'Amino acids' }, color: SEC_COL },
    ])}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const hide = id => $(id).setAttribute('cx', '-9999');
    const bead = (x, y, lab, col, r = 22) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}" stroke="#0a1224" stroke-width="2"/><text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .68)}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">${lab}</text>`;
    const ntb = (x, y, b, w = 30, extra = '') => `<rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${w}" rx="5" fill="${BASE[b]}" ${extra}/><text x="${f1(x)}" y="${f1(y + w * .72)}" font-size="${f1(w * .62)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`;
    /* tRNA: onderkant (anticodon) op (x, y); anticodon = 3 basen van links naar rechts (3'→5') */
    function trna(x, y, ac, charge, op = 1, big = false) {
      if (op <= .01) return '';
      let s = `<g opacity="${f1(op)}"><path d="M${x - 34},${y} L${x - 34},${y - 110} Q${x - 34},${y - 132} ${x - 12},${y - 138} L${x + 34},${y - 150} L${x + 34},${y - 226} L${x + 12},${y - 226} L${x + 12},${y - 166} L${x - 10},${y - 160} L${x - 10},${y} Z" fill="rgba(255,194,71,.2)" stroke="${C.trna}" stroke-width="3" stroke-linejoin="round"/>`;
      ac.split('').forEach((b, j) => { s += ntb(x - 32 + j * 32, y - 2, b, 28); });
      if (big) s += txt(x - 64, y + 20, "3'", '#fff', 18, 'end') + txt(x + 64, y + 20, "5'", '#fff', 18, 'start');
      if (charge) s += bead(x + 26, y - 248, charge[0], charge[1], 24);
      return s + '</g>';
    }
    function ribo(x, op = 1) {
      if (op <= .01) return '';
      return `<g opacity="${f1(op)}"><path d="M${x - 250},${YM - 12} C${x - 290},${YM - 170} ${x - 170},${YM - 330} ${x},${YM - 336} C${x + 170},${YM - 330} ${x + 290},${YM - 170} ${x + 250},${YM - 12} Z" fill="rgba(44,198,168,.13)" stroke="${C.rrna}" stroke-width="3"/>` +
        `<path d="M${x - 230},${YM + 44} C${x - 230},${YM + 120} ${x + 230},${YM + 120} ${x + 230},${YM + 44} Z" fill="rgba(44,198,168,.2)" stroke="${C.rrna}" stroke-width="3"/>` +
        `<g font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.text}" text-anchor="middle" opacity=".8"><text x="${x - CW}" y="${YM - 290}">E</text><text x="${x}" y="${YM - 290}">P</text><text x="${x + CW}" y="${YM - 290}">A</text></g></g>`;
    }
    function mrna(shift = 0, uga = 'UGA', hiUGA = 0, op = 1) {
      let s = `<g opacity="${f1(op)}"><line x1="${90 - shift}" y1="${YM + 18}" x2="1520" y2="${YM + 18}" stroke="${C.rna}" stroke-width="6"/>`;
      s += `<circle cx="${80 - shift}" cy="${YM + 18}" r="17" fill="${C.cap}"/>` + txt(80 - shift, YM - 12, "5'", C.text, 20);
      COD.forEach((c, k) => {
        const cc = k === 3 ? uga : c, x = cx(k) - shift;
        cc.split('').forEach((b, j) => { s += ntb(x - 32 + j * 32, YM + 4, b, 30, k === 3 && hiUGA ? `stroke="#fff" stroke-width="${f1(1 + 3 * hiUGA)}"` : ''); });
        s += `<line x1="${f1(x - CW / 2)}" y1="${YM + 40}" x2="${f1(x - CW / 2)}" y2="${YM + 56}" stroke="${C.muted}" stroke-width="2"/>`;
      });
      // 3'-UTR met SECIS en poly(A)
      const sx = 1210;
      s += `<path d="M${sx - 22},${YM + 4} V${YM - 150} a22,22 0 0 1 44,0 V${YM + 4}" stroke="${C.rna}" stroke-width="7" fill="none"/>` +
        [0, 1, 2, 3, 4].map(k => `<line x1="${sx - 18}" y1="${YM - 20 - k * 26}" x2="${sx + 18}" y2="${YM - 20 - k * 26}" stroke="#fff" stroke-width="2" opacity=".7"/>`).join('') +
        txt(sx + 40, YM - 150, 'SECIS', C.rna, 22, 'start', 800) + txt(990 - shift, YM + 90, "3'-UTR", C.muted, 22, 'start') +
        txt(1390, YM + 8, 'AAAA…', C.rna, 22, 'start', 700) + txt(1530, YM + 8, "3'", C.text, 22, 'start');
      return s + '</g>';
    }

    return {
      update(t, s) {
        placeHud(svg, 'se-hud');
        const { step: i, p } = s;
        let rb = '', mr = '', tr = '', fac = '', bio = '', aaS = '', pyl = '', ov = '';
        const P = cx(2), A = cx(3);                       // P-plaats boven codon 2 (UGU), A-plaats boven UGA
        const mainOp = i === 5 ? 1 - sub(p, 0, .2) : i === 6 ? 0 : 1;
        $('se-main').setAttribute('opacity', f1(i === 1 ? 0 : mainOp));
        if (i <= 4 && i !== 1) {
          const shift = i === 4 ? CW * ease(sub(p, .45, .75)) : 0;
          mr = mrna(shift, 'UGA', i === 0 ? sub(p, .2, .4) : i === 3 ? 1 : 0);
          rb = ribo(P, i === 0 ? sub(p, 0, .2) : 1);
          $('se-rA').setAttribute('cx', f1(P)); $('se-rA').setAttribute('cy', f1(YM - 340));
          $('se-cA').setAttribute('cx', f1(A - shift)); $('se-cA').setAttribute('cy', f1(YM + (i === 0 ? 122 : 70)));
          // P-plaats-tRNA met keten (Met-Ala-Cys)
          const chainAt = (x, y, extra) => { const beads = [['Cys', '#5fd3e6'], ['Ala', '#7fdc6a'], ['Met', '#7fdc6a']]; if (extra) beads.unshift(extra); let c = ''; beads.forEach((b, j) => { const bx = x - 10 - j * 52, by = y - 30 - j * 26; if (j) c += `<line x1="${f1(bx + 52)}" y1="${f1(by + 26)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="${C.chain}" stroke-width="5"/>`; c += bead(bx, by, b[0], b[1], 22); }); return c; };
          const yDock = YM - 32;
          if (i < 4) {
            tr += trna(P, yDock, 'ACA', null);
            ov += chainAt(P + 26, yDock - 222);
          }
          if (i === 3 || i === 4) {
            const k = i === 3 ? ease(sub(p, .15, .55)) : 1;
            const [x, y] = E2([A + 420, yDock - 380], [A, yDock], k);
            const bond = i === 4 ? sub(p, .1, .4) : 0, leave = i === 4 ? sub(p, .45, 1) : 0;
            if (i === 4) {
              // na peptidebinding: keten op Sec-tRNA, oude tRNA → E en weg
              tr += trna(P - shift - 160 * sub(p, .75, 1), yDock - 200 * sub(p, .75, 1), 'ACA', null, 1 - sub(p, .75, 1));
              const secBead = ['Sec', SEC_COL];
              if (bond < 1) { tr += trna(A - shift, yDock, 'ACU', secBead, 1); ov += chainAt(P + 26 + (A - P) * bond * .5, yDock - 222 - 0 * bond); }
              else { tr += trna(A - shift, yDock, 'ACU', null, 1); ov += chainAt(A - shift + 26 + 52, yDock - 222 + 26, secBead); }
              ov += `<g opacity="${f1(sub(p, .15, .35) * (1 - sub(p, .7, .8)))}">${txt(A + 140, yDock - 320, T2('peptidebinding', 'peptide bond'), '#fff', 22, 'start', 700)}</g>`;
              ov += `<g opacity="${f1(sub(p, .8, .95))}">` + textBox(930, 180, 460, [T2('Zonder Se of SECIS: eRF1 wint', 'Without Se or SECIS: eRF1 wins'), T2('→ afgebroken eiwit', '→ truncated protein')], { col: C.danger, fs: 21 }) + '</g>';
            } else {
              tr += trna(x, y, 'ACU', ['Sec', SEC_COL], 1, k > .95);
              fac += `<g opacity="${f1(1 - sub(p, .7, .9))}">${pill(x + 110, y - 150, 150, 34, 'eEFSec·GTP', C.prot2, 1, 17)}</g>`;
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
            fac += `<g opacity="${f1(k)}"><ellipse cx="1210" cy="${YM - 205}" rx="64" ry="30" fill="${C.prot}"/>${txt(1210, YM - 198, 'SBP2', '#fff', 20, 'middle', 800)}</g>`;
            if (i === 2) {
              const k2 = ease(sub(p, .4, .75));
              const [x, y] = E2([1450, 200], [1140, YM - 120], k2);
              fac += trna(x - 40, y, 'ACU', ['Sec', SEC_COL], sub(p, .35, .45)) + `<g opacity="${f1(sub(p, .35, .45))}">${pill(x + 90, y - 150, 150, 34, 'eEFSec·GTP', C.prot2, 1, 17)}</g>`;
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
            bio += `<g opacity="${f1(k)}">` + trna(x, 440, 'ACU', ch, 1) + (j ? `<path d="M${x - 240},300 h130" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + en.split('|').map((ln, q) => txt(x - 172, 250 + q * 22, ln, C.prot, 18, 'middle', 700)).join('') : '') + '</g>';
          });
          bio += txt(300, 500, 'tRNA-Sec', C.trna, 22, 'middle', 800) + txt(300, 526, T2('anticodon UCA', 'anticodon UCA'), C.muted, 18);
          bio += `<g opacity="${f1(sub(p, .85, 1))}">${txt(770, 580, T2('selenofosfaat komt van SPS2 (uit selenide + ATP)', 'selenophosphate comes from SPS2 (from selenide + ATP)'), C.muted, 20, 'middle', 600)}</g>`;
          $('se-bA').setAttribute('cx', '610'); $('se-bA').setAttribute('cy', '110');
        } else hide('se-bA');
        // pyrrolysine
        if (i === 5) {
          const k = 1, y0 = 640;                                        // mRNA en uitlegkader meteen in beeld
          let s0 = `<g opacity="${f1(k)}"><line x1="200" y1="${y0 + 16}" x2="1400" y2="${y0 + 16}" stroke="${C.rna}" stroke-width="6"/>`;
          ['AUG', 'AAA', 'UAG', 'GCA', 'UUC', 'GGA'].forEach((c, q) => { const x = 420 + q * 110; c.split('').forEach((b, j) => { s0 += ntb(x - 32 + j * 32, y0, b, 30, q === 2 ? 'stroke="#fff" stroke-width="3"' : ''); }); });
          s0 += txt(190, y0 + 24, "5'", C.text, 20, 'end') + txt(1410, y0 + 24, "3'", C.text, 20, 'start') + txt(640, y0 + 80, T2('UAG = Pyl', 'UAG = Pyl'), PYL_COL, 24, 'middle', 800) + '</g>';
          const k2 = ease(sub(p, .35, .7));
          const [x, y] = E2([1150, 330], [640, y0 - 30], k2);
          s0 += trna(x, y, 'AUC', ['Pyl', PYL_COL], 1);
          s0 += `<g>` + textBox(150, 330, 430, [T2('2 × Lys → Pyl (PylB, C, D)', '2 × Lys → Pyl (PylB, C, D)'), T2('PylRS laadt tRNA-Pyl direct', 'PylRS charges tRNA-Pyl directly'), T2('bv. methylamine-methyltransferasen', 'e.g. methylamine methyltransferases')], { title: T2('Pyrrolysine (Pyl, O)', 'Pyrrolysine (Pyl, O)'), col: PYL_COL, fs: 19 }) + '</g>';
          s0 += `<g opacity="${f1(sub(p, .75, .9))}">${txt(x + 60, y - 110, T2('CUA · UAG', 'CUA · UAG'), '#fff', 22, 'start', 700)}</g>`;
          pyl = s0;
        }
        if (i === 6) {
          const X = 300, Y = 230;
          const lit = r => .5 + .5 * sub(p, .04 + r * .1, .12 + r * .1);   // tabel staat er meteen; rijen lichten één voor één op
          const row = (y, a, b, c, bold, r = 0) => `<g opacity="${f1(bold ? 1 : lit(r))}">` + txt(X, y, a, C.muted, 26, 'start', 600) + txt(X + 330, y, b, bold ? SEC_COL : C.text, 26, 'start', bold ? 800 : 500) + txt(X + 700, y, c, bold ? PYL_COL : C.text, 26, 'start', bold ? 800 : 500) + '</g>';
          ov += `<g><rect x="${X - 40}" y="${Y - 70}" width="1080" height="500" rx="16" fill="rgba(9,14,28,.86)" stroke="${SEC_COL}" stroke-opacity=".5" stroke-width="2"/>` +
            bead(X + 288, Y - 9, 'Sec', SEC_COL, 34) + bead(X + 658, Y - 9, 'Pyl', PYL_COL, 34) +
            row(Y, '', T2('selenocysteïne', 'selenocysteine'), T2('pyrrolysine', 'pyrrolysine'), true) +
            row(Y + 80, T2('codon', 'codon'), 'UGA', 'UAG', 0, 0) +
            row(Y + 150, T2('signaal', 'signal'), T2("SECIS (euk.: 3'-UTR)", "SECIS (euk.: 3' UTR)"), T2('geen vereist', 'none required'), 0, 1) +
            row(Y + 220, T2('gemaakt', 'made'), T2('op het tRNA (uit Ser)', 'on the tRNA (from Ser)'), T2('als vrij aminozuur', 'as a free amino acid'), 0, 2) +
            row(Y + 290, T2('aflevering', 'delivery'), T2('eEFSec (bact.: SelB)', 'eEFSec (bact.: SelB)'), 'EF-Tu', 0, 3) +
            row(Y + 360, T2('mens', 'human'), T2('25 selenoproteïnen', '25 selenoproteins'), T2('nee', 'no'), 0, 4) + '</g>';
        }
        $('se-ribo').innerHTML = rb; $('se-mrna').innerHTML = mr; $('se-trna').innerHTML = tr; $('se-fac').innerHTML = fac;
        $('se-bio').innerHTML = bio; $('se-aa').innerHTML = aaS; $('se-pyl').innerHTML = pyl; $('se-ov').innerHTML = ov;
      },
    };
  },
};
