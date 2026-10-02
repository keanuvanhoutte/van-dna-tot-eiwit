/*
 * tRNA — gist-tRNA-Phe (PDB 1EHZ): klaverblad (2D) → L-vorm (echte 3D-coördinaten, C4'-atomen) en terug.
 * Elke nucleotide heeft een vaste plek in het klaverblad én in 3D; de morf interpoleert per nucleotide.
 */
import { C, BASE, L, T2, svgOpen, txt, cam, sub, ease, lerp, f1, aa } from '../../kit.js';
import { hud, placeHud, stepVal, textBox } from './_tlkit.js';

/* sequentie 1EHZ (gewone letters) + modificaties */
const SEQ = 'GCGGAUUUAGCUCAGUUGGGAGAGCGCCAGACUGAAGAUCUGGAGGUCCUGUGUUCGAUCCACAGAAUUCGCACCA';
const MOD = { 10: 'm²G', 16: 'D', 17: 'D', 26: 'm²₂G', 32: 'Cm', 34: 'Gm', 37: 'yW', 39: 'Ψ', 40: 'm⁵C', 46: 'm⁷G', 49: 'm⁵C', 54: 'T', 55: 'Ψ', 58: 'm¹A' };
const GLYPH = { 16: 'D', 17: 'D', 39: 'Ψ', 55: 'Ψ', 54: 'T', 37: 'yW' };
/* C4'-coördinaten (Å) uit 1EHZ; x = richting elleboog→A76, y = richting elleboog→anticodon, z = diepte */
const XYZ = [22.8,-19.7,-1.9,19.7,-21.3,3.2,15.3,-19.8,7.6,11.5,-15.7,10.0,9.1,-9.9,10.2,7.1,-5.7,6.4,5.4,-3.3,1.0,-0.2,-1.9,-2.2,-1.7,4.1,-5.4,3.6,8.5,-6.9,6.7,9.1,-1.4,6.6,7.3,4.4,3.1,3.0,7.2,-1.9,0.5,9.4,-6.5,-3.3,9.1,-9.7,-6.9,8.0,-13.1,-11.5,8.9,-11.9,-12.5,3.7,-15.7,-9.4,-0.2,-17.9,-3.0,-0.9,-12.8,-0.7,-2.1,-11.0,4.0,1.9,-8.8,8.0,5.9,-4.9,12.3,7.7,-0.7,16.0,5.3,1.3,17.6,-0.2,-0.5,19.1,-5.8,-5.5,21.5,-9.1,-11.0,24.1,-8.3,-15.7,25.9,-4.7,-17.3,28.3,0.7,-15.1,32.3,4.5,-11.1,37.1,5.2,-10.2,42.1,0.7,-5.8,38.7,-1.5,-3.1,34.2,0.6,-1.0,29.9,4.2,-2.6,26.6,9.1,-7.5,24.0,11.0,-13.0,21.6,9.3,-16.6,19.4,4.7,-17.1,16.7,-0.6,-15.1,14.6,-6.0,-11.3,12.3,-9.9,-6.1,9.2,-10.0,-3.5,3.2,-8.6,-2.7,-2.8,-11.1,-2.0,-4.5,-5.0,3.0,-5.5,-5.9,2.8,-9.2,-10.9,1.2,-14.4,-13.5,-1.4,-19.7,-13.3,-4.6,-23.5,-9.9,-8.4,-25.0,-5.1,-13.6,-22.9,-2.9,-18.9,-20.6,-6.7,-15.8,-15.3,-6.6,-10.8,-12.0,-4.0,-5.4,-8.5,-2.6,-4.2,-12.3,2.2,-4.8,-18.3,4.2,-1.3,-22.8,1.5,3.2,-24.3,-2.2,7.5,-22.7,-6.2,10.6,-18.2,-8.3,12.3,-12.3,-8.8,13.9,-7.0,-6.5,14.8,-3.3,-1.8,16.6,-3.1,4.1,19.0,-5.1,9.4,21.9,-9.4,12.5,25.0,-14.8,12.1,28.1,-18.7,8.5,31.8,-19.0,3.4,35.8,-15.1,1.1,40.2,-16.3,-1.5];
/* Watson–Crick(-achtige) paren in de stammen; tertiaire paren in de elleboog */
const PAIRS = [[1, 72], [2, 71], [3, 70], [4, 69], [5, 68], [6, 67], [7, 66], [10, 25], [11, 24], [12, 23], [13, 22], [27, 43], [28, 42], [29, 41], [30, 40], [31, 39], [49, 65], [50, 64], [51, 63], [52, 62], [53, 61]];
const TERT = [[18, 55], [19, 56]];
const DOM = [
  { k: 'acc', r: [[1, 7], [66, 76]], col: '#ffc247', nl: 'acceptorstam', en: 'acceptor stem' },
  { k: 'd', r: [[10, 25]], col: '#4fb0ff', nl: 'D-arm', en: 'D arm' },
  { k: 'ac', r: [[27, 43]], col: '#f06bc0', nl: 'anticodonarm', en: 'anticodon arm' },
  { k: 'v', r: [[44, 48]], col: '#c9a574', nl: 'variabele lus', en: 'variable loop' },
  { k: 't', r: [[49, 65]], col: '#7fdc6a', nl: 'TΨC-arm', en: 'TΨC arm' },
];
const domOf = i => DOM.find(d => d.r.some(([a, b]) => i >= a && i <= b)) ?? { k: 'x', col: '#93a0bb' };

/* 2D-klaverblad (scènecoördinaten) */
function cloverleaf() {
  const p = {}, arc = (cx, cy, r, a0, a1, ids) => ids.forEach((id, k) => { const a = (a0 + (a1 - a0) * (k + 1) / (ids.length + 1)) * Math.PI / 180; p[id] = [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const rng = (a, b) => { const o = []; for (let i = a; a <= b ? i <= b : i >= b; i += a <= b ? 1 : -1) o.push(i); return o; };
  rng(1, 7).forEach((i, k) => { p[i] = [778, 196 + k * 30]; p[73 - i] = [822, 196 + k * 30]; });
  [73, 74, 75, 76].forEach((i, k) => { p[i] = [846 + k * 27, 176 - k * 20]; });
  p[8] = [748, 392]; p[9] = [716, 400];
  rng(10, 13).forEach((i, k) => { p[i] = [676 - k * 34, 400]; p[35 - i] = [676 - k * 34, 444]; });
  arc(522, 422, 66, -35, -325, rng(14, 21));
  p[26] = [724, 470];
  rng(27, 31).forEach((i, k) => { p[i] = [778, 494 + k * 30]; p[70 - i] = [822, 494 + k * 30]; });
  arc(800, 666, 56, 235, -55, rng(32, 38));
  [[850, 520], [880, 532], [908, 522], [922, 498], [914, 472]].forEach((q, k) => { p[44 + k] = q; });
  rng(49, 53).forEach((i, k) => { p[i] = [900 + k * 34, 444]; p[114 - i] = [900 + k * 34, 400]; });
  arc(1102, 422, 64, 145, -145, rng(54, 60));
  return p;
}
const P2 = cloverleaf();
const S3 = 8.4, C3 = [800 - 10.5 * 8.4, 430 - 8.5 * 8.4];   // schaal (px/Å) en middelpunt van de 3D-weergave

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const K = {
  morph: [0, 0, 0, 0, 0, 1, 1, 1],
  rot: [0, 0, 0, 0, 0, 0, .35, 0],
  halo: [0, 1, .5, .5, .25, .6, 1, .6],
};

export default {
  id: 'trna',
  title: { nl: 'tRNA: klaverblad en L-vorm', en: 'tRNA: cloverleaf and L shape' },
  scale: '≈ 7 nm', time: { nl: 'structuur', en: 'structure' },
  org: { nl: 'gist-tRNA-Phe (PDB 1EHZ); humane tRNA\'s zijn gelijkaardig', en: 'yeast tRNA-Phe (PDB 1EHZ); human tRNAs are similar' },
  legend: [['#ffc247', { nl: 'acceptorstam + CCA', en: 'acceptor stem + CCA' }], ['#4fb0ff', 'D-arm'], ['#f06bc0', { nl: 'anticodonarm', en: 'anticodon arm' }], ['#c9a574', { nl: 'variabele lus', en: 'variable loop' }], ['#7fdc6a', { nl: 'TΨC-arm', en: 'TΨC arm' }], [BASE.A, 'A'], [BASE.U, 'U'], [BASE.G, 'G'], [BASE.C, 'C']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De 3D-posities zijn de C4\'-atomen uit de kristalstructuur van gist-tRNA<sup>Phe</sup> (PDB 1EHZ, 1,93 Å; Shi & Moore 2000). tRNA<sup>Phe</sup> was in 1974 de eerste RNA-structuur die ooit werd opgelost; 1EHZ is de latere, nauwkeurigere bepaling. De afstand anticodon (35) → A76 is in deze structuur ≈ 72 Å (C4\'–C4\').</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The 3D positions are the C4\' atoms from the crystal structure of yeast tRNA<sup>Phe</sup> (PDB 1EHZ, 1.93 Å; Shi & Moore 2000). tRNA<sup>Phe</sup> was the first RNA structure ever solved, in 1974; 1EHZ is the later, more accurate determination. The anticodon (35) → A76 distance in this structure is ≈ 72 Å (C4\'–C4\').</p>' },
  simplified: {
    nl: 'Nucleotiden zijn bolletjes op de C4\'-positie; basen, suikers en fosfaten zijn niet apart getekend. Alleen de stampparen en twee elleboog-interacties worden getoond (er zijn meer tertiaire contacten). De morf is een lineaire interpolatie, geen echt vouwpad. Het aminozuur hangt bij tRNA-Phe aan de 2\'-OH en verschuift snel naar de 3\'-OH.',
    en: 'Nucleotides are beads at the C4\' position; bases, sugars and phosphates are not drawn separately. Only stem pairs and two elbow interactions are shown (there are more tertiary contacts). The morph is a linear interpolation, not a real folding path. In tRNA-Phe the amino acid is attached to the 2\'-OH and quickly migrates to the 3\'-OH.' },
  steps: [
    ST(8000, cam(800, 430, 1400), 'Het tRNA: de vertaler', 'The tRNA: the translator', 'Een kort RNA dat een codon koppelt aan het juiste aminozuur. Hier: het tRNA voor fenylalanine (gist).', 'A short RNA that links a codon to the right amino acid. Here: the tRNA for phenylalanine (yeast).'),
    ST(8500, cam(800, 430, 1400), 'Een klaverblad met vier armen', 'A cloverleaf with four arms', 'Het tRNA plakt deels aan zichzelf vast. Plat getekend lijkt het op een klaverblad met vier armen.', 'The tRNA partly sticks to itself. Drawn flat, it looks like a cloverleaf with four arms.'),
    ST(8500, cam(850, 232, 760), 'Hier hangt het aminozuur', 'This is where the amino acid hangs', 'Elk tRNA eindigt op de letters CCA. Aan de laatste A wordt het aminozuur vastgemaakt, hier fenylalanine.', 'Every tRNA ends in the letters CCA. The amino acid, here phenylalanine, is attached to the last A.'),
    ST(9000, cam(880, 688, 900), 'Het anticodon leest het codon', 'The anticodon reads the codon', 'Drie basen onderaan (het anticodon) passen op het codon. De eerste past losser: zo leest dit tRNA UUC én UUU.', 'Three bases at the bottom (the anticodon) fit the codon. The first fits more loosely: so this tRNA reads UUC and UUU.'),
    ST(9000, cam(800, 420, 1350), 'Aangepaste letters', 'Modified letters', '14 basen zijn chemisch aangepast (wit omrand). Ze helpen het tRNA vouwen en codons juist lezen.', '14 bases are chemically modified (white rim). They help the tRNA fold and read codons correctly.'),
    ST(9000, cam(800, 440, 1250), 'Van klaverblad naar L-vorm', 'From cloverleaf to L shape', 'In 3D vouwt het klaverblad tot een L. Elke letter schuift naar zijn echte plaats in de gemeten structuur.', 'In 3D the cloverleaf folds into an L. Each letter moves to its real place in the measured structure.'),
    ST(9000, cam(800, 440, 1200), 'Twee spiralen maken een L', 'Two spirals make an L', 'Telkens twee armen vormen samen één spiraal (helix). In de knik van de L houden twee lussen elkaar vast.', 'Each pair of arms forms one spiral (helix). In the bend of the L, two loops hold on to each other.'),
    ST(9000, cam(800, 440, 1200), 'Precies lang genoeg', 'Exactly long enough', 'Anticodon en CCA-uiteinde liggen ≈ 7,5 nm (75 Å) uit elkaar: net zo ver als lees- en koppelplek in het ribosoom.', 'Anticodon and CCA end are ≈ 7.5 nm (75 Å) apart: just as far as the reading and linking spots in the ribosome.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="rnastructuur" data-color="${C.trna}" data-nolabel><g id="tr-halo"></g></g><g data-node="basenparing" data-color="${C.trna}" data-nolabel><g id="tr-pairs"></g></g>
    <g data-node="rnastructuur" data-color="${C.trna}" data-label="${T2('RNA-vouwing', 'RNA folding')}" data-nolabel><g id="tr-nts"></g></g>
    <g data-node="aars" data-color="${C.trna}" data-label="${T2('Wie laadt het tRNA? → aaRS', 'Who charges the tRNA? → aaRS')}"><g id="tr-aa"></g><circle id="tr-aaA" data-anchor="aars" r="1" fill="none"/></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${T2('Codon · genetische code', 'Codon · genetic code')}"><g id="tr-codon"></g><circle id="tr-cA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
    <g id="tr-ov"></g>
    ${hud('tr-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'aars', label: { nl: 'tRNA laden (aaRS)', en: 'Charging tRNA (aaRS)' }, color: C.trna },
      { node: 'rnastructuur', label: { nl: 'tRNA in de atlas', en: 'tRNA in the atlas' }, color: C.trna, href: '../atlas/index.html?id=trna' },
    ], { row: true })}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const P3 = i => [XYZ[(i - 1) * 3], XYZ[(i - 1) * 3 + 1], XYZ[(i - 1) * 3 + 2]];
    return {
      update(t, s) {
        placeHud(svg, 'tr-hud', .015, stepVal([.946, .946, .03, .946, .946, .946, .946, .946], s), STEPS[s.step]?.cam);
        const i0 = s.step, p = s.p;
        let m = stepVal(K.morph, s), rot = stepVal(K.rot, s), halo = stepVal(K.halo, s);
        if (i0 === 5) m = ease(sub(p, .12, .85));
        if (i0 === 6) rot = .55 * Math.sin(Math.PI * 2 * sub(p, .2, 1));
        if (i0 === 7) rot = -.45 * Math.sin(Math.PI * sub(p, .1, 1));
        const cr = Math.cos(rot), sr = Math.sin(rot);
        const pos = {}, dep = {};
        for (let i = 1; i <= 76; i++) {
          const [x, y, z] = P3(i), X3 = C3[0] + S3 * (x * cr + z * sr), Y3 = C3[1] + S3 * y, Z = -x * sr + z * cr;
          pos[i] = [lerp(P2[i][0], X3, m), lerp(P2[i][1], Y3, m)]; dep[i] = Z * m;
        }
        const built = i0 === 0 ? Math.floor(sub(p, .05, .8) * 76 + .001) : 76;
        const vis = i => i <= built;
        // domein-halo's (lint langs de keten)
        let h = '';
        if (halo > .02) for (const d of DOM) for (const [a, b] of d.r) {
          const pts = []; for (let i = a; i <= b; i++) if (vis(i)) pts.push(pos[i]);
          if (pts.length > 1) h += `<path d="${pts.map((q, k) => `${k ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${d.col}" stroke-width="${f1(30 + 16 * m)}" stroke-opacity="${f1((.33 + .15 * m) * halo)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
        }
        // tijdens het opbouwen: de volledige keten als vage schaduw (het beeld is nooit leeg)
        if (built < 76) { const gh = []; for (let i = 1; i <= 76; i++) gh.push(pos[i]); h += `<path d="${gh.map((q, k) => `${k ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="#cfd8ea" stroke-width="10" stroke-opacity=".12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`; }
        const bb = []; for (let i = 1; i <= built; i++) bb.push(pos[i]);
        h += bb.length > 1 ? `<path d="${bb.map((q, k) => `${k ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="#cfd8ea" stroke-width="3.5" stroke-opacity=".7" fill="none" stroke-linejoin="round"/>` : '';
        $('tr-halo').innerHTML = h;
        // paren
        let pr = '';
        for (const [a, b] of PAIRS) if (vis(a) && vis(b)) pr += `<line x1="${f1(pos[a][0])}" y1="${f1(pos[a][1])}" x2="${f1(pos[b][0])}" y2="${f1(pos[b][1])}" stroke="#fff" stroke-width="3" stroke-opacity="${f1(.75 - .6 * m)}"/>`;
        const tOp = i0 === 6 ? sub(p, .15, .35) : 0;
        if (tOp > 0) for (const [a, b] of TERT) pr += `<line x1="${f1(pos[a][0])}" y1="${f1(pos[a][1])}" x2="${f1(pos[b][0])}" y2="${f1(pos[b][1])}" stroke="#fff" stroke-width="4" stroke-dasharray="6 5" opacity="${f1(tOp)}"/>`;
        $('tr-pairs').innerHTML = pr;
        // nucleotiden (achter → voor)
        const order = []; for (let i = 1; i <= built; i++) order.push(i);
        order.sort((a, b) => dep[a] - dep[b]);
        const hiMod = i0 === 4 ? sub(p, .1, .3) : 0;
        let n = '';
        for (const i of order) {
          const [x, y] = pos[i], b = SEQ[i - 1], r = 15 - 1.5 * m + dep[i] * .1, isMod = MOD[i] !== undefined;
          const dim = hiMod > 0 && !isMod ? 1 - .6 * hiMod : 1;
          const g = GLYPH[i] ?? b, ring = isMod ? `stroke="#fff" stroke-width="${f1(2 + 2 * hiMod)}"` : 'stroke="#0a1224" stroke-width="1.5"';
          n += `<g opacity="${f1(dim * (i0 === 0 && i === built ? sub(p * 76 - (i - 1), 0, .5) + .3 : 1))}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${BASE[b]}" ${ring}/>` +
            `<text x="${f1(x)}" y="${f1(y + r * .36)}" font-size="${f1(g.length > 1 ? r * .95 : r * 1.12)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${g}</text></g>`;
        }
        $('tr-nts').innerHTML = n;

        // overlays
        let o = '';
        const fade = sub(p, .12, .3), pc = pos[1], p76 = pos[76];
        if (built >= 1) o += txt(pc[0] - 24 + 10 * m, pc[1] + 6 + 26 * m, "5'", '#fff', 24, 'end', 700);
        if (built >= 76) o += txt(p76[0] + 22, p76[1] - 8, "3'", '#fff', 24, 'start', 700);
        if (i0 === 0) o += txt(800, 820, `${built} / 76 nt`, C.muted, 26, 'middle', 700);
        if (i0 === 1) {
          const lab = [['acc', [750, 250], 'end'], ['d', [470, 330], 'middle'], ['t', [1130, 330], 'middle'], ['ac', [930, 700], 'start'], ['v', [960, 560], 'start']];
          lab.forEach(([k, [x, y], an], j) => { const d = DOM.find(q => q.k === k); o += `<g opacity="${f1(sub(p, .1 + j * .1, .25 + j * .1))}">${txt(x, y, L(d), d.col, 28, an, 800)}</g>`; });
          o += `<g opacity="${f1(sub(p, .7, .85))}">${txt(410, 520, T2('D-lus: dihydro-U', 'D loop: dihydro-U'), '#4fb0ff', 20, 'middle')}${txt(1190, 520, T2('T-lus: T-Ψ-C', 'T loop: T-Ψ-C'), '#7fdc6a', 20, 'middle')}</g>`;
        }
        // aminozuur aan A76
        let aaS = '';
        const aaOn = i0 === 2 ? ease(sub(p, .35, .65)) : (i0 >= 5 ? 1 : 0);
        if (aaOn > 0) {
          const ax = p76[0] + 30 * aaOn + 22, ay = p76[1] - 40 * aaOn - 10;
          aaS = `<g opacity="${f1(aaOn)}"><line x1="${f1(p76[0])}" y1="${f1(p76[1])}" x2="${f1(ax)}" y2="${f1(ay)}" stroke="${C.chain}" stroke-width="4"/>${aa(ax, ay, 'F', 24)}</g>`;
          $('tr-aaA').setAttribute('cx', f1(ax + 110)); $('tr-aaA').setAttribute('cy', f1(ay + 6));
        } else { $('tr-aaA').setAttribute('cx', f1(p76[0])); $('tr-aaA').setAttribute('cy', f1(p76[1] - 60)); }
        $('tr-aa').innerHTML = aaS;
        if (i0 === 2) {
          o += `<g opacity="${f1(fade)}">` +
            `<path d="M${f1(pos[74][0] - 20)},${f1(pos[76][1] - 18)} q-14,0 -14,14 v${f1(pos[74][1] - pos[76][1] + 8)} q0,14 14,14" stroke="#fff" stroke-width="2.5" fill="none"/>` +
            txt(pos[74][0] - 44, (pos[74][1] + pos[76][1]) / 2 + 8, 'CCA', '#fff', 24, 'end', 800) +
            txt(pos[73][0] + 28, pos[73][1] + 8, T2('A73 = discriminatorbase', 'A73 = discriminator base'), C.muted, 18, 'start') +
            txt(705, 290, T2('7 bp', '7 bp'), '#ffc247', 22, 'end', 700) + '</g>' +
            `<g opacity="${f1(sub(p, .6, .8))}">` + txt(p76[0] + 40, p76[1] + 14, T2('esterbinding aan', 'ester bond to'), C.chain, 18, 'start', 600) + txt(p76[0] + 40, p76[1] + 36, T2("2'/3'-OH van A76", "2'/3'-OH of A76"), C.chain, 18, 'start', 600) + '</g>';
        }
        // codon onder het anticodon
        let cd = '';
        if (i0 === 3) {
          const k = ease(sub(p, .1, .45)), yb = pos[35][1] + 76 - 40 * (1 - k);
          const codon = ['C', 'U', 'U'];   // onder 34, 35, 36 (antiparallel)
          [34, 35, 36].forEach((j, q) => {
            const x = pos[j][0];
            cd += `<g opacity="${f1(k)}"><rect x="${f1(x - 17)}" y="${f1(yb - 4)}" width="34" height="34" rx="6" fill="${BASE[codon[q]]}"/><text x="${f1(x)}" y="${f1(yb + 21)}" font-size="22" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${codon[q]}</text></g>`;
            const pl = sub(p, .45, .6);
            const nb = codon[q] === 'U' ? 2 : 3;
            for (let z = 0; z < nb; z++) cd += `<line x1="${f1(x + (z - (nb - 1) / 2) * 7)}" y1="${f1(pos[j][1] + 17)}" x2="${f1(x + (z - (nb - 1) / 2) * 7)}" y2="${f1(yb - 5)}" stroke="#fff" stroke-width="2" stroke-dasharray="4 3" opacity="${f1(pl)}"/>`;
          });
          const x0 = pos[34][0] - 80, x1 = pos[36][0] + 80;
          cd += `<line x1="${f1(x0)}" y1="${f1(yb + 14)}" x2="${f1(x1)}" y2="${f1(yb + 14)}" stroke="${C.rna}" stroke-width="5" opacity="${f1(k * .8)}"/>`;
          cd = `<line x1="${f1(x0)}" y1="${f1(yb + 14)}" x2="${f1(x1)}" y2="${f1(yb + 14)}" stroke="${C.rna}" stroke-width="5" opacity="${f1(k * .8)}"/>` + cd;
          cd += `<g opacity="${f1(k)}">${txt(x0 - 12, yb + 22, "3'", C.rna, 22, 'end', 700)}${txt(x1 + 12, yb + 22, "5'", C.rna, 22, 'start', 700)}${txt((x0 + x1) / 2, yb + 70, T2("codon 5'-UUC-3' (lees ←)", "codon 5'-UUC-3' (read ←)"), C.rna, 22, 'middle', 700)}</g>`;
          $('tr-cA').setAttribute('cx', f1(x1 + 60)); $('tr-cA').setAttribute('cy', f1(yb + 30));
          o += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(pos[34][0] - 30, pos[34][1] + 8, T2('Gm34 = wobble', 'Gm34 = wobble'), '#fff', 20, 'end', 700) +
            txt(pos[36][0] + 150, pos[35][1] - 120, T2('anticodon', 'anticodon'), '#f06bc0', 24, 'start', 800) +
            txt(pos[36][0] + 150, pos[35][1] - 92, "5'-GmAA-3'", '#fff', 22, 'start', 700) +
            '</g>';
        } else { $('tr-cA').setAttribute('cx', '-9999'); }
        $('tr-codon').innerHTML = cd;
        if (i0 === 4) {
          const names = { 10: 'm²G', 16: 'D', 26: 'm²₂G', 32: 'Cm', 34: 'Gm', 37: 'yW', 39: 'Ψ', 40: 'm⁵C', 46: 'm⁷G', 49: 'm⁵C', 54: 'T', 55: 'Ψ', 58: 'm¹A' };
          const off = { 10: [-10, 44, 'middle'], 16: [-26, -24, 'end'], 26: [-26, 30, 'end'], 32: [-26, 0, 'end'], 34: [-24, 26, 'end'], 37: [24, 30, 'start'], 39: [-10, 44, 'start'], 40: [30, 22, 'start'], 46: [34, 12, 'start'], 49: [-34, 42, 'end'], 54: [8, 44, 'start'], 55: [26, 18, 'start'], 58: [8, -26, 'middle'] };
          for (const k in names) { const [dx, dy, an] = off[k]; o += `<g opacity="${f1(sub(p, .15, .35))}">${txt(pos[k][0] + dx, pos[k][1] + dy, names[k], '#fff', 19, an, 700)}</g>`; }
        }
        if (i0 >= 5) {
          const k = i0 === 5 ? sub(p, .8, 1) : 1;
          if (i0 === 6) {
            const e = [(pos[18][0] + pos[55][0]) / 2, (pos[18][1] + pos[55][1]) / 2];
            o += `<g opacity="${f1(sub(p, .15, .35))}"><circle cx="${f1(e[0])}" cy="${f1(e[1])}" r="62" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="8 6"/>${txt(e[0] - 70, e[1] - 70, T2('elleboog', 'elbow'), '#fff', 24, 'end', 800)}</g>`;
            o += `<g opacity="${f1(sub(p, .35, .55))}">${txt(930, 130, T2('acceptor + TΨC', 'acceptor + TΨC'), '#ffc247', 24, 'middle', 800)}${txt(930, 158, T2('= één helix', '= one helix'), C.text, 20, 'middle')}</g>`;
            o += `<g opacity="${f1(sub(p, .55, .75))}">${txt(530, 600, T2('D-arm + anticodon', 'D arm + anticodon'), '#f06bc0', 24, 'end', 800)}${txt(530, 628, T2('= tweede helix', '= second helix'), C.text, 20, 'end')}</g>`;
          }
          if (i0 === 7) {
            const a = pos[35], b = pos[76], kk = ease(sub(p, .1, .5));
            const bx = lerp(a[0], b[0], kk), by = lerp(a[1], b[1], kk);
            o += `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(bx)}" y2="${f1(by)}" stroke="#fff" stroke-width="3" stroke-dasharray="10 7"/>` +
              `<g opacity="${f1(sub(p, .45, .6))}">${txt((a[0] + b[0]) / 2 + 40, (a[1] + b[1]) / 2 + 40, '≈ 75 Å', '#fff', 34, 'start', 800)}</g>` +
              `<g opacity="${f1(sub(p, .55, .75))}">${txt(a[0] - 40, a[1] + 8, T2('decodeercentrum (40S) ←', 'decoding centre (40S) ←'), '#f06bc0', 22, 'end', 700)}${txt(b[0] - 20, b[1] - 82, T2('→ PTC (60S)', '→ PTC (60S)'), '#ffc247', 22, 'middle', 700)}</g>`;
          }
          o = `<g opacity="${f1(k)}">${o}</g>`;
        }
        $('tr-ov').innerHTML = o;
      },
    };
  },
};
