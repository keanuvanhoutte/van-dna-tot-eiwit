/*
 * Genetische code — codonwiel (standaardcode, berekend uit kit.translate), 5'→3' aflezen, start/stop,
 * degeneratie, wobble, leesramen en frameshift, en uitzonderingen (mitochondriën, Sec, Pyl).
 */
import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, f1, translate, THREE, AACLASS, CLASSCOL, aa } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';

const B = ['U', 'C', 'A', 'G'];
const CX = 470, CY = 445, R = [0, 72, 150, 214, 330];
const CODONS = []; for (const a of B) for (const b of B) for (const c of B) CODONS.push(a + b + c);
const idxOf = cod => CODONS.indexOf(cod);
const ang = k => -Math.PI / 2 + k * Math.PI * 2 / 64;           // hoek (rad) van de linkerrand van codon k
const pt = (r, a) => [CX + r * Math.cos(a), CY + r * Math.sin(a)];
function sector(r0, r1, a0, a1) {
  const [x0, y0] = pt(r1, a0), [x1, y1] = pt(r1, a1), [x2, y2] = pt(r0, a1), [x3, y3] = pt(r0, a0), big = a1 - a0 > Math.PI ? 1 : 0;
  return r0 === 0 ? `M${f1(CX)},${f1(CY)} L${f1(x0)},${f1(y0)} A${r1},${r1} 0 ${big} 1 ${f1(x1)},${f1(y1)} Z`
    : `M${f1(x0)},${f1(y0)} A${r1},${r1} 0 ${big} 1 ${f1(x1)},${f1(y1)} L${f1(x2)},${f1(y2)} A${r0},${r0} 0 ${big} 0 ${f1(x3)},${f1(y3)} Z`;
}
const aaCol = a => a === '*' ? C.danger : (CLASSCOL[AACLASS[a]] ?? '#aaa');
const radialText = (r, a, s, col, size, weight = 700) => {
  const [x, y] = pt(r, a); let deg = a * 180 / Math.PI; if (deg > 90 && deg < 270) deg -= 180; if (deg < -90) deg += 180;
  return `<text x="${f1(x)}" y="${f1(y)}" transform="rotate(${f1(deg)} ${f1(x)} ${f1(y)})" font-size="${size}" text-anchor="middle" dominant-baseline="central" fill="${col}" font-family="Inter" font-weight="${weight}">${s}</text>`;
};

const SEQ = 'AUGGCUUUCAAGGAUUGG';                        // = begin van het mRNA uit de translatiescène
const MUT = 'AUGGCUUUCAAGUGAUUGG';                      // + één U na nt 12 → UGA
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'codon',
  title: { nl: 'De genetische code', en: 'The genetic code' },
  scale: { nl: '1 codon = 3 nt ≈ 1 nm', en: '1 codon = 3 nt ≈ 1 nm' }, time: { nl: 'informatie (geen tijdschaal)', en: 'information (no time scale)' },
  org: { nl: 'standaardcode (kern-genen van de mens)', en: 'standard code (human nuclear genes)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [CLASSCOL.s, 'Gly / Pro'], [C.danger, 'stop']],
  simplified: {
    nl: 'Het wiel toont de standaardcode; varianten (mitochondriën, sommige micro-organismen) staan alleen in de laatste stap. Wobble-regels zijn de klassieke regels van Crick; gemodificeerde basen op positie 34 kunnen die uitbreiden of beperken.',
    en: 'The wheel shows the standard code; variants (mitochondria, some microorganisms) appear only in the last step. Wobble rules are Crick\'s classic rules; modified bases at position 34 can extend or restrict them.' },
  steps: [
    ST(8000, cam(790, 445, 1320), 'Drie letters per codon', 'Three letters per codon', 'Een codon is drie basen. Vier basen geven 4 × 4 × 4 = 64 codons. Lees het wiel van binnen naar buiten.', 'A codon is three bases. Four bases give 4 × 4 × 4 = 64 codons. Read the wheel from the inside out.'),
    ST(9500, cam(800, 445, 1440), 'Het ribosoom leest per drie', 'The ribosome reads in threes', 'Het ribosoom leest het mRNA per drie letters, zonder overlap of gaten. Het wiel toont het bijhorende aminozuur.', 'The ribosome reads the mRNA three letters at a time, with no overlap or gaps. The wheel shows the matching amino acid.'),
    ST(8000, cam(640, 445, 1300), 'Start en stop', 'Start and stop', 'AUG (methionine) is het startsein. UAA, UAG en UGA betekenen stop: daarvoor bestaat geen tRNA.', 'AUG (methionine) is the start signal. UAA, UAG and UGA mean stop: there is no tRNA for them.'),
    ST(9000, cam(640, 445, 1300), 'Meerdere codons per aminozuur', 'Several codons per amino acid', '61 codons voor 20 aminozuren, dus de meeste hebben er meerdere. Ze verschillen vooral in de 3e letter.', '61 codons for 20 amino acids, so most have several. They differ mainly in the 3rd letter.'),
    ST(9500, cam(1105, 450, 900), 'De derde letter past losser', 'The third letter fits more loosely', 'De derde letter past losser (‘wobble’). Eén tRNA met de speciale letter inosine leest zo GCU, GCC én GCA: alanine.', 'The third letter fits more loosely (‘wobble’). One tRNA with the special letter inosine thus reads GCU, GCC and GCA: alanine.'),
    ST(9000, cam(1290, 460, 900), 'Drie manieren om te lezen', 'Three ways to read', 'Dezelfde reeks kan op drie manieren in groepjes van drie verdeeld worden. Het startcodon bepaalt de juiste.', 'The same sequence can be split into groups of three in three ways. The start codon sets the right one.'),
    ST(9000, cam(1290, 460, 900), 'Eén letter erbij: alles verschuift', 'One extra letter: everything shifts', 'Eén letter erbij of eraf verschuift de indeling: alle volgende codons veranderen. Hier volgt meteen een stop.', 'One letter added or lost shifts the grouping: all following codons change. Here a stop follows right away.'),
    ST(9000, cam(790, 445, 1320), 'Bijna overal dezelfde code', 'Almost everywhere the same code', 'Bijna alle levende wezens gebruiken dezelfde code. Onze mitochondriën lezen een paar codons wel anders.', 'Almost all living things use the same code. Our mitochondria do read a few codons differently.'),
  ],
  svg() {
    let w1 = '', w2 = '', w3 = '', w4 = '';
    B.forEach((b, i) => { const a0 = ang(i * 16), a1 = ang(i * 16 + 16); w1 += `<path d="${sector(0, R[1], a0, a1)}" fill="${BASE[b]}" stroke="#0a1224" stroke-width="3"/>` + radialText(R[1] * .55, (a0 + a1) / 2, b, '#0a1224', 34, 800); });
    for (let j = 0; j < 16; j++) { const b = B[j % 4], a0 = ang(j * 4), a1 = ang(j * 4 + 4); w2 += `<path d="${sector(R[1], R[2], a0, a1)}" fill="${BASE[b]}" fill-opacity=".85" stroke="#0a1224" stroke-width="2.5"/>` + radialText((R[1] + R[2]) / 2, (a0 + a1) / 2, b, '#0a1224', 24, 800); }
    for (let k = 0; k < 64; k++) { const b = B[k % 4], a0 = ang(k), a1 = ang(k + 1); w3 += `<path d="${sector(R[2], R[3], a0, a1)}" fill="${BASE[b]}" fill-opacity=".7" stroke="#0a1224" stroke-width="1.5"/>` + radialText((R[2] + R[3]) / 2, (a0 + a1) / 2, b, '#0a1224', 15, 800); }
    // aminozuurring: aaneengesloten groepen
    let k = 0;
    while (k < 64) {
      const a = translate(CODONS[k]); let e = k; while (e + 1 < 64 && translate(CODONS[e + 1]) === a && Math.floor((e + 1) / 4) === Math.floor(k / 4)) e++;
      const a0 = ang(k), a1 = ang(e + 1);
      w4 += `<path d="${sector(R[3] + 4, R[4], a0, a1)}" fill="${aaCol(a)}" fill-opacity=".28" stroke="${aaCol(a)}" stroke-width="2"/>` + radialText((R[3] + R[4]) / 2 + 4, (a0 + a1) / 2, a === '*' ? 'Stop' : THREE[a], a === '*' ? C.danger : C.text, e > k ? 22 : a === '*' ? 19 : 17);
      k = e + 1;
    }
    return svgOpen() + `
    <g data-node="codon" data-nolabel id="cd-wheel">
      <g id="cd-r4">${w4}</g><g id="cd-r3">${w3}</g><g id="cd-r2">${w2}</g><g id="cd-r1">${w1}</g>
    </g>
    <g id="cd-hl"></g>
    <g data-node="trna" data-color="${C.trna}" data-label="${T2('tRNA · anticodon', 'tRNA · anticodon')}"><g id="cd-trna"></g><circle id="cd-tA" data-anchor="trna" r="1" fill="none"/></g>
    <g data-node="mutaties" data-color="${C.danger}" data-label="${T2('Mutaties', 'Mutations')}"><g id="cd-mut"></g><circle id="cd-mA" data-anchor="mutaties" r="1" fill="none"/></g>
    <g data-node="seleno" data-color="${C.danger}" data-label="${T2('Selenocysteïne & pyrrolysine', 'Selenocysteine & pyrrolysine')}"><g id="cd-sec"></g><circle id="cd-sA" data-anchor="seleno" r="1" fill="none"/></g>
    <g data-node="translatie" data-color="${C.rna}" data-nolabel><g id="cd-mr"></g></g>
    <g id="cd-ov"></g>
    <g data-node="primair" data-color="${C.chain}" data-nolabel><g id="cd-pep"></g></g>
    ${hud('cd-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'trna', label: { nl: 'tRNA-structuur', en: 'tRNA structure' }, color: C.trna },
      { node: 'seleno', label: { nl: 'Sec & Pyl (21e/22e aa)', en: 'Sec & Pyl (21st/22nd aa)' }, color: C.danger },
      { node: 'rnastructuur', label: { nl: 'mRNA in de atlas', en: 'mRNA in the atlas' }, color: C.rna, href: '../atlas/index.html?id=mrna' },
    ], { row: true })}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const hlCodon = (cod, col, w = 4, op = 1) => {
      const k = idxOf(cod), i1 = k >> 4, i2 = k >> 2;
      return `<g opacity="${f1(op)}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round">` +
        `<path d="${sector(0, R[1], ang(i1 * 16), ang(i1 * 16 + 16))}" stroke-opacity=".7"/><path d="${sector(R[1], R[2], ang(i2 * 4), ang(i2 * 4 + 4))}" stroke-opacity=".85"/>` +
        `<path d="${sector(R[2], R[4], ang(k), ang(k + 1))}"/></g>`;
    };
    const ntBox = (x, y, b, w = 30, op = 1, extra = '') => `<g opacity="${f1(op)}"><rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${w + 4}" rx="5" fill="${BASE[b] ?? '#888'}" ${extra}/><text x="${f1(x)}" y="${f1(y + w * .78)}" font-size="${f1(w * .68)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text></g>`;
    const strip = (x0, y, seq, dx, opts = {}) => { let s = ''; for (let j = 0; j < seq.length; j++) s += ntBox(x0 + j * dx, y, seq[j], dx - 4, 1, opts.mark === j ? 'stroke="#fff" stroke-width="3"' : ''); return s; };

    return {
      update(t, s) {
        placeHud(svg, 'cd-hud', .015, .946, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        // wiel opbouwen / dimmen
        const rings = ['cd-r1', 'cd-r2', 'cd-r3', 'cd-r4'];
        rings.forEach((id, j) => $(id).setAttribute('opacity', f1(i === 0 ? Math.max(.18, sub(p, .05 + j * .15, .2 + j * .15)) : 1)));   // vaag zichtbaar vanaf het begin
        $('cd-wheel').setAttribute('opacity', i >= 4 && i <= 6 ? '.38' : '1');
        let hl = '', ov = '', tr = '', mut = '', sec = '', mr = '', pep = '';
        if (i === 0) {
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + txt(CX, CY - R[1] - 6, T2('1e', '1st'), '#fff', 16) + txt(CX, CY - (R[1] + R[2]) / 2 - 22, T2('2e', '2nd'), '#fff', 16) + txt(CX, CY - (R[2] + R[3]) / 2 - 22, T2('3e', '3rd'), '#fff', 16) + '</g>';
          ov += `<g opacity="${f1(sub(p, .7, .9))}">` + txt(1130, 400, '4 × 4 × 4 = 64', C.text, 44, 'middle', 800) + txt(1130, 460, T2('61 voor aminozuren + 3 stop', '61 for amino acids + 3 stop'), C.muted, 26) + '</g>';
        }
        if (i === 1) {
          const nC = SEQ.length / 3, k = Math.min(nC - 1, Math.floor(sub(p, .05, .95) * nC)), cod = SEQ.slice(k * 3, k * 3 + 3);
          const x0 = 960, dx = 32, y = 250;
          ov += txt(x0 - 30, y + 26, "5'", C.text, 22, 'end', 700) + txt(x0 + SEQ.length * dx - 6, y + 26, "3'", C.text, 22, 'start', 700); mr += strip(x0, y, SEQ, dx);
          const wx = x0 + k * 3 * dx - dx / 2 - 2;
          ov += `<rect x="${f1(wx)}" y="${y - 8}" width="${3 * dx}" height="${dx + 16}" rx="8" fill="none" stroke="#fff" stroke-width="3.5"/>`;
          for (let j = 0; j <= k; j++) { const a = translate(SEQ.slice(j * 3, j * 3 + 3)); pep += aa(x0 + j * 3 * dx + dx - 2, y + 110, a, 30); if (j) pep += `<line x1="${x0 + (j - 1) * 3 * dx + dx + 28}" y1="${y + 110}" x2="${x0 + j * 3 * dx + dx - 32}" y2="${y + 110}" stroke="${C.chain}" stroke-width="5"/>`; }
          ov += txt(x0 + k * 3 * dx + dx - 2, y + 175, cod, '#fff', 22, 'middle', 800);
          hl += hlCodon(cod, '#fff', 5);
        }
        if (i === 2) {
          const k1 = sub(p, .05, .3), k2 = sub(p, .4, .65);
          hl += hlCodon('AUG', C.ok, 6, k1);
          for (const c of ['UAA', 'UAG', 'UGA']) hl += hlCodon(c, '#fff', 6, k2);
          const [ax, ay] = pt(R[4] + 30, ang(idxOf('AUG') + .5));
          ov += `<g opacity="${f1(k1)}">${txt(ax - 30, ay - 36, 'START', C.ok, 28, 'end', 800)}</g>`;
          const [sx, sy] = pt(R[4] + 30, ang(idxOf('UAG') + .5));
          ov += `<g opacity="${f1(k2)}">${txt(sx + 10, sy - 10, 'STOP ×3', C.danger, 28, 'start', 800)}</g>`;
        }
        if (i === 3) {
          const groups = [['L', .05, .35], ['S', .35, .55], ['R', .55, .75], ['M', .75, .9], ['W', .75, .9]];
          for (const [a, t0, t1] of groups) {
            const op = sub(p, t0, t0 + .05) * (a === 'L' || a === 'M' || a === 'W' ? 1 : 1 - sub(p, t1, t1 + .05));
            for (const c of CODONS) if (translate(c) === a) hl += hlCodon(c, aaCol(a) === CLASSCOL.h ? '#fff' : '#fff', 4, op);
          }
          ov += textBox(880, 170, 330, ['6: Leu, Ser, Arg', '4: Ala, Gly, Pro, Thr, Val', T2('3: Ile · 2: 9 andere', '3: Ile · 2: 9 others'), '1: Met, Trp'], { title: T2('codons per aa', 'codons per aa'), col: C.chain, fs: 21, op: sub(p, .1, .25) });
        }
        if (i === 4) {
          // wobble-diagram: anticodon 3'-CGI-5' boven codon 5'-GC?-3'
          const x0 = 900, y = 430, dx = 64;
          const third = p < .36 ? 'U' : p < .68 ? 'C' : 'A', k = 1;   // diagram meteen in beeld; de 3e base wisselt U → C → A
          tr += `<g opacity="${f1(k)}"><path d="M${x0 - 40},${y - 70} h${3 * dx + 20} v-110 h-40 v70 h-${3 * dx - 20} z" fill="rgba(255,194,71,.2)" stroke="${C.trna}" stroke-width="3"/>` +
            ntBox(x0, y - 60, 'C', 50) + ntBox(x0 + dx, y - 60, 'G', 50) + `<g><rect x="${x0 + 2 * dx - 25}" y="${y - 60}" width="50" height="54" rx="6" fill="#d9c7ff"/><text x="${x0 + 2 * dx}" y="${y - 21}" font-size="34" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">I</text></g>` +
            txt(x0 - 50, y - 26, "3'", '#fff', 22, 'end', 700) + txt(x0 + 2 * dx + 50, y - 26, "5'", '#fff', 22, 'start', 700) +
            txt(x0 + 2 * dx, y - 88, '34', C.muted, 18) + txt(x0 + dx, y - 88, '35', C.muted, 18) + txt(x0, y - 88, '36', C.muted, 18) +
            txt(x0 + 3 * dx + 20, y - 150, T2('tRNA-Ala (anticodon IGC)', 'tRNA-Ala (anticodon IGC)'), C.trna, 22, 'start', 700) + '</g>';
          tr += `<g opacity="${f1(k)}">` + ntBox(x0, y + 20, 'G', 50) + ntBox(x0 + dx, y + 20, 'C', 50) + ntBox(x0 + 2 * dx, y + 20, third, 50, 1, 'stroke="#fff" stroke-width="3"') +
            txt(x0 - 50, y + 54, "5'", C.rna, 22, 'end', 700) + txt(x0 + 2 * dx + 50, y + 54, "3'", C.rna, 22, 'start', 700) +
            txt(x0 + dx, y + 110, `mRNA: GC${third} → Ala`, C.rna, 24, 'middle', 800) + '</g>';
          for (let j = 0; j < 3; j++) tr += `<line x1="${x0 + j * dx}" y1="${y - 4}" x2="${x0 + j * dx}" y2="${y + 18}" stroke="#fff" stroke-width="3" ${j === 2 ? 'stroke-dasharray="4 4"' : ''} opacity="${f1(k)}"/>`;
          tr += txt(x0 + 2 * dx + 42, y + 12, 'wobble', '#fff', 20, 'start', 800).replace('<text', `<text opacity="${f1(k)}"`);
          $('cd-tA').setAttribute('cx', f1(x0 + dx)); $('cd-tA').setAttribute('cy', f1(y - 190));
          ov += textBox(1170, 425, 400, [T2('G → C of U', 'G → C or U'), T2('U → A of G', 'U → A or G'), T2('I (inosine) → U, C of A', 'I (inosine) → U, C or A'), T2('C → alleen G', 'C → G only'), T2('A → alleen U (zeldzaam)', 'A → U only (rare)')], { title: T2('Base 34 (anticodon) paart met:', 'Base 34 (anticodon) pairs with:'), col: C.trna, fs: 20, op: 1 });
        } else $('cd-tA').setAttribute('cx', '-9999');
        if (i === 5) {
          const x0 = 1050, dx = 34, y = 330, frames = [0, 1, 2];
          ov += txt(x0 - 26, y + 26, "5'", C.text, 22, 'end', 700) + txt(x0 + SEQ.length * dx - 8, y + 26, "3'", C.text, 22, 'start', 700); mr += strip(x0, y, SEQ, dx);
          frames.forEach((f, r) => {
            const op = sub(p, .1 + r * .25, .25 + r * .25), yy = y + 100 + r * 90;
            let row = txt(x0 - 30, yy + 8, T2(`raam ${f + 1}`, `frame ${f + 1}`), f === 0 ? C.ok : C.muted, 20, 'end', 700), beads = '';
            for (let j = f; j + 3 <= SEQ.length; j += 3) { const a = translate(SEQ.slice(j, j + 3)); row += `<rect x="${x0 + j * dx - dx / 2 + 1}" y="${yy - 36}" width="${3 * dx - 4}" height="8" rx="3" fill="${f === 0 ? C.ok : C.muted}"/>`; beads += aa(x0 + j * dx + dx - 2, yy + 6, a, 24); }
            ov += `<g opacity="${f1(op)}">${row}</g>`; pep += `<g opacity="${f1(op)}">${beads}</g>`;
          });
          ov += `<g opacity="${f1(sub(p, .85, 1))}">${txt(x0 + 290, y - 50, T2('AUG → raam 1 is het juiste', 'AUG → frame 1 is the correct one'), C.ok, 24, 'middle', 800)}</g>`;
        }
        if (i === 6) {
          const x0 = 1050, dx = 34, y1 = 300, y2 = 500, k = sub(p, .3, .5);
          const head = (seq, y, ins) => txt(x0 - 26, y + 26, "5'", C.text, 22, 'end', 700) + strip(x0, y, seq, dx, { mark: ins });
          const row = (seq, y, ins, aaOnly = false) => {
            let s = aaOnly ? '' : head(seq, y, ins);
            for (let j = 0; j + 3 <= seq.length; j += 3) { const a = translate(seq.slice(j, j + 3)); s += a === '*' ? `<rect x="${x0 + j * dx - dx / 2 + 2}" y="${y + 60}" width="${3 * dx - 6}" height="40" rx="10" fill="${C.danger}"/>` + txt(x0 + j * dx + dx - 2, y + 88, 'STOP', '#fff', 20, 'middle', 800) : aa(x0 + j * dx + dx - 2, y + 80, a, 22); if (a === '*') break; }
            return s;
          };
          ov += txt(x0 + 300, y1 - 26, T2('normaal', 'normal'), C.ok, 24, 'middle', 800) + txt(x0 - 26, y1 + 26, "5'", C.text, 22, 'end', 700); mr += strip(x0, y1, SEQ, dx); pep += row(SEQ, y1, undefined, true);
          mut += `<g opacity="${f1(k)}">` + txt(x0 + 200, y2 - 26, T2('insertie van 1 U', 'insertion of 1 U'), C.danger, 24, 'end', 800) + row(MUT, y2, 12) +
            `<path d="M${x0 + 12 * dx},${y2 - 16} v-18" stroke="#fff" stroke-width="3" marker-end="url(#arrow)"/></g>`;
          $('cd-mA').setAttribute('cx', f1(x0 + 12 * dx)); $('cd-mA').setAttribute('cy', f1(y2 - 60));
          ov += `<g opacity="${f1(sub(p, .7, .85))}">${txt(x0 + 300, y2 + 150, T2('3n inserties/deleties behouden het leesraam', '3n insertions/deletions keep the reading frame'), C.muted, 21, 'middle', 600)}</g>`;
        } else $('cd-mA').setAttribute('cx', '-9999');
        if (i === 7) {
          const k = sub(p, .05, .25);
          hl += hlCodon('UGA', '#fff', 6, k) + hlCodon('UAG', '#ffb3b3', 5, sub(p, .3, .45)) + hlCodon('AUA', '#fff', 5, sub(p, .5, .6)) + hlCodon('AGA', '#fff', 4, sub(p, .5, .6)) + hlCodon('AGG', '#fff', 4, sub(p, .5, .6));
          sec += textBox(880, 190, 440, [T2('UGA → Sec (met SECIS)', 'UGA → Sec (with SECIS)'), T2('UAG → Pyl (archaea, bact.)', 'UAG → Pyl (archaea, bact.)')], { title: T2('Hercodering', 'Recoding'), col: C.danger, fs: 24, op: k });
          ov += textBox(880, 440, 440, ['UGA → Trp', 'AUA → Met', T2('AGA, AGG → geen Arg', 'AGA, AGG → not Arg')], { title: T2('Mitochondriën (mens)', 'Mitochondria (human)'), col: C.muted, fs: 24, op: sub(p, .5, .65) });
          $('cd-sA').setAttribute('cx', '1100'); $('cd-sA').setAttribute('cy', '180');
        } else $('cd-sA').setAttribute('cx', '-9999');
        $('cd-hl').innerHTML = hl; $('cd-mr').innerHTML = mr; $('cd-pep').innerHTML = pep; $('cd-ov').innerHTML = ov; $('cd-trna').innerHTML = tr; $('cd-mut').innerHTML = mut; $('cd-sec').innerHTML = sec;
      },
    };
  },
};
