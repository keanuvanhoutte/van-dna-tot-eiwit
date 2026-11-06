import { C, L, T2, svgOpen, txt, clamp, lerp } from '../../kit.js';

/* Mens ⇄ bacterie: "van gen tot eiwit" naast elkaar (fase 4, uit poc/03-diepte/tab-c.js).
 * Het beeld is een pure functie draw(hp, bp, s): hp/bp = voortgang bij mens/bacterie (0..1), s = wissel (0 = mens, 1 = bacterie).
 * Wissel zonder "half-om-half"-beeld: eerst vervaagt wat alleen de mens heeft (kern, RNA, ribosomen), dan vervormen de
 * gedeelde onderdelen (celrand rond → staafje, DNA langer), pas dan verschijnt wat alleen de bacterie heeft.
 * Bronnen: zie shared/details/bact2.js (vergelijk). */
const K = { pol: '#9b7bff', rib: '#2cc6a8', rib2: '#7fe0cc', cap: '#f06bc0', intron: '#8a93a8', env: '#8a93a8', bact: C.bact };
const PROT = ['#7fdc6a', '#9b7bff', '#ffc247'];
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const win = (a, b, c, d, x) => ss(a, b, x) * (1 - ss(c, d, x));        // zichtbaar tussen b en c, zachte randen
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mixC = (a, b, x) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], x))).join(',')})`; };
const n1 = x => (+x).toFixed(1);

const TX = {
  nucleus: { nl: 'celkern', en: 'nucleus' }, pore: { nl: 'kernporie', en: 'nuclear pore' }, pre: { nl: 'pre-mRNA', en: 'pre-mRNA' },
  intron: { nl: 'introns eruit', en: 'introns out' }, cap: { nl: '5′-kap', en: '5′ cap' }, tail: { nl: 'poly(A)-staart', en: 'poly(A) tail' },
  rib: { nl: 'ribosoom', en: 'ribosome' }, prot: { nl: 'eiwit', en: 'protein' }, cyto: { nl: 'cytoplasma', en: 'cytoplasm' },
  nucleoid: { nl: 'nucleoïd: DNA los in het cytoplasma', en: 'nucleoid: DNA free in the cytoplasm' },
  gene: { nl: 'gen', en: 'gene' }, exon: { nl: 'exon', en: 'exon' },
  coupled: { nl: 'ribosomen op een mRNA dat nog gemaakt wordt', en: 'ribosomes on an mRNA still being made' },
  none: { nl: 'geen kern · geen splicing · geen kap', en: 'no nucleus · no splicing · no cap' },
  human: { nl: 'MENS · menselijke cel', en: 'HUMAN · human cell' }, bact: { nl: 'BACTERIE · E. coli', en: 'BACTERIUM · E. coli' },
};
const lbl = (x, y, s, a, o = {}) => a < .01 ? '' : `<text x="${n1(x)}" y="${n1(y)}" font-size="${o.size ?? 28}" font-weight="${o.w ?? 600}" fill="${o.fill ?? C.text}" text-anchor="${o.anchor ?? 'middle'}" opacity="${a.toFixed(3)}" font-family="Inter" paint-order="stroke" stroke="#0d1426" stroke-width="6">${s}</text>`;

/* ---------- vormpjes ---------- */
const strands = (x0, x1, y) => `<line x1="${n1(x0)}" y1="${n1(y - 6)}" x2="${n1(x1)}" y2="${n1(y - 6)}" stroke="${C.dna}" stroke-width="7" stroke-linecap="round"/><line x1="${n1(x0)}" y1="${n1(y + 6)}" x2="${n1(x1)}" y2="${n1(y + 6)}" stroke="${C.dna2}" stroke-width="7" stroke-linecap="round"/>`;
const pol = (x, y, a) => a < .01 ? '' : `<ellipse cx="${n1(x)}" cy="${y}" rx="36" ry="27" fill="${K.pol}" opacity="${(.92 * a).toFixed(3)}"/>`;
function ribosome(x, y, a, up) {      /* up: grote eenheid boven het mRNA (mens) of eronder (bacterie) */
  if (a < .01) return '';
  const big = up ? y - 20 : y + 22, small = up ? y + 13 : y - 12;
  return `<g opacity="${a.toFixed(3)}"><ellipse cx="${n1(x)}" cy="${big}" rx="32" ry="21" fill="${K.rib}"/><ellipse cx="${n1(x)}" cy="${small}" rx="25" ry="12" fill="${K.rib2}"/></g>`;
}
function chain(x, y, n, dir, col) {   /* groeiende eiwitketen: kraaltjes die van het ribosoom weg kronkelen */
  if (n < 1) return '';
  let s = '';
  for (let m = 0; m < n; m++) s += `<circle cx="${n1(x + 11 * Math.sin(m * .9) + m * 2.5)}" cy="${n1(y + dir * m * 12)}" r="6.5" fill="${col}"/>`;
  return s;
}
function zigzag(x, y, len) { if (len < 2) return ''; let d = `M${n1(x)},${y}`; for (let i = 1; i <= Math.ceil(len / 8); i++) d += ` L${n1(x - Math.min(len, i * 8))},${y + (i % 2 ? -6 : 6)}`; return `<path d="${d}" fill="none" stroke="${K.cap}" stroke-width="5" stroke-linejoin="round"/>`; }

/* ---------- mens (coördinaten bij s = 0); stapgrenzen hp = 0 · .25 · .41 · .62 · 1 ---------- */
const HD = { x0: 200, x1: 740, y: 420 };
const H_SEG = [['e', 0, 100], ['i', 100, 190], ['e', 190, 290], ['i', 290, 360], ['e', 360, 440]];   /* u = afstand vanaf 5′ (x = 700 − u) */
function human(p) {
  let s = '';
  const labels = [], fl = ss(0, .03, p);
  const cx = 470, cy = 490, gap = 4.2 * Math.PI / 180;
  const arc = r => `M${n1(cx + r * Math.cos(gap))},${n1(cy - r * Math.sin(gap))} A${r},${r} 0 1 0 ${n1(cx + r * Math.cos(gap))},${n1(cy + r * Math.sin(gap))}`;
  s += `<circle cx="${cx}" cy="${cy}" r="300" fill="rgba(138,147,168,.09)"/><path d="${arc(300)}" fill="none" stroke="${K.env}" stroke-width="5"/><path d="${arc(286)}" fill="none" stroke="${K.env}" stroke-width="4"/>`;
  s += `<rect x="780" y="458" width="18" height="12" rx="4" fill="${K.env}"/><rect x="780" y="510" width="18" height="12" rx="4" fill="${K.env}"/>`;
  labels.push([470, 248, L(TX.nucleus), 1, { w: 700 }]);
  labels.push([805, 598, L(TX.pore), win(.41, .43, .62, .65, p), { anchor: 'start' }]);
  /* gen: exons (oranje) en introns (grijs) op het DNA (de strengen zelf zijn gedeeld, zie draw) */
  for (const [k, a, b] of H_SEG) s += `<rect x="${700 - b}" y="404" width="${b - a}" height="32" rx="5" fill="${k === 'e' ? C.rna : K.intron}" opacity=".45"/>`;
  labels.push([650, 386, L(TX.exon), 1 - ss(.25, .27, p), { size: 24, fill: C.rna }]);
  labels.push([555, 386, 'intron', 1 - ss(.25, .27, p), { size: 24, fill: C.muted }]);
  /* transcriptie */
  const polX = lerp(705, 255, clamp((p - .03) / .19)), uT = clamp(700 - polX, 0, 440);
  s += pol(polX, HD.y, win(.01, .03, .22, .25, p));
  /* splicing: exons schuiven aan, introns worden lussen en verdwijnen */
  const q = ss(.25, .41, p), sh = [0, 0, 90 * q, 90 * q, 160 * q];
  const qe1 = ss(.41, .47, p), qe2 = ss(.47, .60, p);
  const hx = lerp(lerp(700, 740, qe1), 1380, qe2), hy = lerp(478, 490, qe1);
  const L5 = 440 - 160 * q;
  let rna = '';
  if (p < .25) {   /* groeiend pre-mRNA, aan de polymerase vast */
    rna += `<line x1="${n1(polX)}" y1="446" x2="${n1(polX)}" y2="${hy}" stroke="${C.rna}" stroke-width="6"/>`;
    for (const [k, a, b] of H_SEG) if (uT > a) rna += `<line x1="${n1(hx - a)}" y1="${hy}" x2="${n1(hx - Math.min(b, uT))}" y2="${hy}" stroke="${k === 'e' ? C.rna : K.intron}" stroke-width="7" stroke-linecap="round"/>`;
  } else {
    H_SEG.forEach(([k, a, b], i) => {
      if (k === 'e') rna += `<line x1="${n1(hx - a + sh[i])}" y1="${n1(hy)}" x2="${n1(hx - b + sh[i])}" y2="${n1(hy)}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>`;
      else if (q < 1) {
        const xa = hx - a + sh[i - 1], xb = hx - b + sh[i + 1], Hh = 40 + 90 * q;
        rna += `<path d="M${n1(xa)},${hy} C${n1(xa)},${n1(hy + Hh)} ${n1(xb)},${n1(hy + Hh)} ${n1(xb)},${hy}" fill="none" stroke="${K.intron}" stroke-width="6" opacity="${(1 - ss(.65, 1, q)).toFixed(3)}"/>`;
      }
    });
  }
  labels.push([480, 540, L(TX.pre), win(.08, .11, .25, .27, p), { fill: C.rna }]);
  labels.push([480, 650, L(TX.intron), win(.25, .28, .41, .44, p), { fill: C.muted }]);
  /* kap en staart */
  const capA = clamp(uT / 20);
  rna += capA > 0 ? `<circle cx="${n1(hx + 8)}" cy="${n1(hy)}" r="10" fill="${K.cap}" opacity="${capA}"/>` : '';
  rna += zigzag(hx - L5, hy, 56 * ss(.30, .40, p));
  labels.push([hx + 8, hy - 26, L(TX.cap), win(.26, .29, .5, .54, p), { fill: K.cap, size: 26 }]);
  labels.push([hx - L5 - 30, hy + 44, L(TX.tail), win(.32, .35, .5, .54, p), { fill: K.cap, size: 26 }]);
  s += `<g opacity="${fl.toFixed(3)}">${rna}</g>`;
  /* translatie in het cytoplasma */
  for (let k = 0; k < 3; k++) {
    const p0 = .63 + .08 * k, pr = clamp((p - p0) / .18), u = lerp(15, 265, pr);
    const el = Math.max(0, p - p0 - .18);                      // klaar: het eiwit komt los en drijft weg (anders liggen ze op elkaar)
    if (p > p0) s += chain(hx - u - 900 * el, hy - 44 - 300 * el, Math.floor(pr * 13), -1, PROT[0]);
    s += ribosome(hx - u, hy, win(p0 - .01, p0 + .01, p0 + .18, p0 + .21, p), true);
  }
  labels.push([1365, 560, L(TX.rib), win(.63, .66, .9, .93, p), { fill: K.rib }]);
  labels.push([1200, 230, L(TX.prot), ss(.74, .77, p), { fill: PROT[0] }]);
  return { s, labels };
}

/* ---------- bacterie (coördinaten bij s = 1); stapgrenzen bp = 0 · .42 · 1 ---------- */
const BD = { x0: 260, x1: 1360, y: 380 };
const GENES = [[1300, 1030], [1000, 730], [700, 430]];
function bacterium(p) {
  let s = '';
  const labels = [];
  s += `<ellipse cx="810" cy="380" rx="610" ry="95" fill="rgba(79,143,247,.08)" stroke="rgba(124,196,255,.35)" stroke-width="3" stroke-dasharray="10 9"/>`;
  labels.push([810, 268, L(TX.nucleoid), 1, { w: 700 }]);
  GENES.forEach(([a, b], g) => { s += `<rect x="${b}" y="364" width="${a - b}" height="32" rx="5" fill="${PROT[g]}" opacity=".45"/>`; labels.push([(a + b) / 2, 350, `${L(TX.gene)} ${g + 1}`, 1, { size: 24, fill: PROT[g] }]); });
  const polX = lerp(1305, 425, clamp((p - .03) / .60)), uT = clamp(1300 - polX, 0, 875);
  s += pol(polX, BD.y, win(.01, .03, .63, .66, p));
  if (uT > 0) s += `<line x1="${n1(polX)}" y1="406" x2="${n1(polX)}" y2="440" stroke="${C.rna}" stroke-width="6" opacity="${(1 - ss(.63, .66, p)).toFixed(3)}"/><line x1="1300" y1="440" x2="${n1(1300 - uT)}" y2="440" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>`;
  /* per gen twee ribosomen, die starten zodra de polymerase voorbij de start is: gekoppelde transcriptie-translatie */
  const vPol = 875 / .60, vRib = vPol * .7;
  GENES.forEach((_, g) => {
    for (let j = 0; j < 2; j++) {
      const u0 = 300 * g + 10, pS = .03 + (u0 + 30 + 120 * j) / vPol;
      if (p < pS) continue;
      const u = Math.min(u0 + 250, u0 + vRib * (p - pS)), pr = clamp((u - u0) / 250), pE = pS + 250 / vRib;
      s += chain(1300 - u, 486, Math.floor(pr * 12), 1, PROT[g]);
      s += ribosome(1300 - u, 440, 1 - ss(pE, pE + .03, p), false);
    }
  });
  labels.push([810, 710, L(TX.coupled), win(.16, .2, .64, .68, p), { fill: K.rib }]);
  labels.push([810, 710, L(TX.none), ss(.68, .72, p), { fill: C.muted }]);
  return { s, labels };
}

/* ---------- samenstellen: pure functie ---------- */
function draw(hp, bp, sw) {
  const aH = 1 - ss(0, .3, sw), m = ss(.3, .7, sw), aB = ss(.7, 1, sw);
  /* gedeeld: cel (rond → staafje) en het DNA */
  const R = { x: lerp(40, 90, m), y: lerp(110, 190, m), w: lerp(1520, 1420, m), h: lerp(760, 560, m), rx: lerp(200, 280, m) };
  const memC = mixC(C.mem, K.bact, m);
  let out = `<rect x="${n1(R.x)}" y="${n1(R.y)}" width="${n1(R.w)}" height="${n1(R.h)}" rx="${n1(R.rx)}" fill="rgba(201,165,116,.05)" stroke="${memC}" stroke-width="6"/>`;
  out += `<rect x="${n1(R.x + 14)}" y="${n1(R.y + 14)}" width="${n1(R.w - 28)}" height="${n1(R.h - 28)}" rx="${n1(R.rx - 14)}" fill="none" stroke="${memC}" stroke-width="3" opacity="${aB.toFixed(3)}"/>`;
  const X0 = lerp(HD.x0, BD.x0, m), X1 = lerp(HD.x1, BD.x1, m), Y = lerp(HD.y, BD.y, m);
  const map = D => { const sx = (X1 - X0) / (D.x1 - D.x0); return { sx, tx: X0 - D.x0 * sx, ty: Y - D.y, f: (x, y) => [X0 + (x - D.x0) * sx, y + Y - D.y] }; };
  const layers = [[aH > .005 ? human(hp) : null, map(HD), aH], [aB > .005 ? bacterium(bp) : null, map(BD), aB]];
  let labels = '';
  for (const [L0, M, a] of layers) {
    if (!L0) continue;
    out += `<g opacity="${a.toFixed(3)}" transform="translate(${n1(M.tx)},${n1(M.ty)}) scale(${M.sx.toFixed(4)},1)">${L0.s}</g>`;
    for (const [x, y, tx, la, o] of L0.labels) { const [X, Yy] = M.f(x, y); labels += lbl(X, Yy, tx, la * a, o); }
  }
  out += strands(X0, X1, Y) + labels;
  out += lbl(1430, 820, L(TX.cyto), aH, { size: 24, fill: C.muted, anchor: 'end' });   // bij de bacterie zegt het nucleoïd-label het al
  /* badge linksboven: wisselt pas op het moment dat alleen de gedeelde onderdelen in beeld zijn */
  out += lbl(60, 70, L(TX.human), 1 - ss(.4, .5, sw), { size: 30, w: 800, anchor: 'start', fill: C.mem });
  out += lbl(60, 70, L(TX.bact), ss(.5, .6, sw), { size: 30, w: 800, anchor: 'start', fill: K.bact });
  return out;
}

/* ---------- vergelijkingstabel (laatste stap); elke cel is klikbaar ---------- */
const ROWS = [
  [{ nl: 'Kern', en: 'Nucleus' }, { nl: 'ja', en: 'yes' }, 'kern', { nl: 'nee: nucleoïd', en: 'no: nucleoid' }, 'bnucleoid'],
  [{ nl: 'Introns eruit knippen', en: 'Cutting out introns' }, { nl: 'ja, spliceosoom', en: 'yes, spliceosome' }, 'splicing', { nl: 'geen spliceosoom', en: 'no spliceosome' }, 'bsplicing'],
  [{ nl: '5′-kap en staart', en: '5′ cap and tail' }, { nl: 'ja, allebei', en: 'yes, both' }, 'capping', { nl: 'geen kap zoals bij de mens', en: 'no cap as in humans' }, 'bmrna'],
  [{ nl: 'Genen per mRNA', en: 'Genes per mRNA' }, { nl: 'meestal één', en: 'usually one' }, 'gen', { nl: 'vaak meerdere (operon)', en: 'often several (operon)' }, 'operon'],
  [{ nl: 'Wanneer vertalen?', en: 'When translated?' }, { nl: 'na de export', en: 'after export' }, 'translatie', { nl: 'al tijdens het maken', en: 'while being made' }, 'bribosoom'],
];
const COLX = [190, 600, 1010], ROW0 = 300, ROWH = 98;
function lines(x, y, s, col, size = 24, w = 500) {
  const ls = L(s).split('|');
  return ls.map((l, i) => txt(x, y + i * (size + 6) - (ls.length - 1) * (size + 6) / 2, l, col, size, 'start', w)).join('');
}
function cell(node, x, y, w, s, col) {
  return `<g data-node="${node}" data-nolabel data-color="${col}"><rect x="${x - 14}" y="${y - ROWH / 2 + 6}" width="${w}" height="${ROWH - 12}" rx="10" fill="rgba(124,196,255,.04)" stroke="rgba(124,196,255,.18)"/>${lines(x, y + 8, s, C.text, 24, 500)}</g>`;
}
function table() {
  let s = `<rect x="150" y="150" width="1300" height="660" rx="22" fill="#0d1426" fill-opacity=".94" stroke="rgba(160,180,220,.35)" stroke-width="2"/>`;
  s += `<g data-node="cel" data-nolabel data-color="${C.mem}">${txt(COLX[1], 222, T2('Mens', 'Human'), C.mem, 30, 'start', 800)}</g>`;
  s += `<g data-node="bcel" data-nolabel data-color="${K.bact}">${txt(COLX[2], 222, T2('Bacterie (E. coli)', 'Bacterium (E. coli)'), K.bact, 30, 'start', 800)}</g>`;
  s += `<line x1="180" y1="246" x2="1420" y2="246" stroke="rgba(160,180,220,.3)" stroke-width="2"/>`;
  ROWS.forEach(([k, h, hn, b, bn], i) => {
    const y = ROW0 + i * ROWH;
    s += lines(COLX[0], y + 8, k, C.muted, 24, 700);
    s += cell(hn, COLX[1], y, 390, h, C.mem) + cell(bn, COLX[2], y, 430, b, K.bact);
  });
  return s;
}

/* hotspots met label (alleen zichtbaar in de stap waar ze iets betekenen); onzichtbare klikvlakken + ankerpunt */
const HOT = [
  ['kern', [200, 230, 220, 120], [300, 300], { nl: 'Meer over de celkern', en: 'More about the nucleus' }, C.mem],
  ['transcriptie', [200, 392, 560, 60], [620, 345], null, K.pol],
  ['rnaprocessing', [200, 470, 560, 200], [250, 590], null, C.rna],
  ['export', [760, 440, 60, 100], [790, 440], null, K.env],
  ['translatie', [1000, 250, 450, 300], [1250, 640], null, K.rib],
  ['bnucleoid', [200, 285, 230, 80], [380, 262], null, C.dna],
  ['operon', [1030, 364, 270, 32], [1240, 262], null, PROT[0]],
  ['bmrna', [400, 420, 950, 240], [330, 600], null, K.rib],
];
const SHOW = [['kern', 'transcriptie'], ['kern', 'rnaprocessing'], ['export'], ['translatie'], [], ['bnucleoid', 'operon', 'bmrna'], ['operon', 'bmrna'], []];

/* stap → (hp, bp, s, tabel) */
const lin = (a, b, p) => a + (b - a) * p;
function stateOf(step, p) {
  switch (step) {
    case 0: return [lin(0, .25, p), 0, 0, 0];
    case 1: return [lin(.25, .41, p), 0, 0, 0];
    case 2: return [lin(.41, .62, p), 0, 0, 0];
    case 3: return [lin(.62, 1, p), 0, 0, 0];
    case 4: return [1, 0, p, 0];
    case 5: return [1, lin(0, .42, p), 1, 0];
    case 6: return [1, lin(.42, 1, p), 1, 0];
    default: return [1, 1, 1, ss(0, .3, p)];
  }
}

export default {
  id: 'vergelijk',
  title: { nl: 'Mens en bacterie vergeleken', en: 'Human and bacterium compared' },
  scale: { nl: 'niet op schaal (mens ≈ 20 µm, E. coli ≈ 2 µm)', en: 'not to scale (human ≈ 20 µm, E. coli ≈ 2 µm)' },
  time: { nl: 'minuten; hier sterk versneld', en: 'minutes; strongly accelerated here' },
  org: { nl: 'mens en bacterie (Escherichia coli)', en: 'human and bacterium (Escherichia coli)' },
  legend: [[C.dna, 'DNA'], [C.rna, { nl: 'mRNA (exons)', en: 'mRNA (exons)' }], [K.intron, 'intron'], [K.pol, { nl: 'RNA-polymerase', en: 'RNA polymerase' }],
    [K.cap, { nl: '5′-kap en poly(A)-staart', en: '5′ cap and poly(A) tail' }], [K.rib, { nl: 'ribosoom', en: 'ribosome' }], [PROT[0], { nl: 'eiwitketen', en: 'protein chain' }]],
  simplified: {
    nl: 'Niet op schaal: een menselijke cel is ongeveer tien keer zo groot als E. coli, en de genen zijn hier heel kort. Echte genen van de mens hebben vaak veel meer en langere introns. Bij de mens gebeuren kap, splicing en staart al tijdens de transcriptie; hier staan ze na elkaar om ze apart te tonen. Op één mRNA zitten in beide cellen vaak veel meer ribosomen tegelijk dan getekend.',
    en: 'Not to scale: a human cell is about ten times the size of E. coli, and the genes here are very short. Real human genes often have many more and longer introns. In humans, cap, splicing and tail already happen during transcription; here they are shown one after the other to show them separately. In both cells, one mRNA often carries many more ribosomes at once than drawn.' },
  steps: [
    { dur: 8000, title: { nl: 'Mens: het gen wordt in de kern gekopieerd', en: 'Human: the gene is copied inside the nucleus' },
      text: { nl: 'RNA-polymerase leest het gen en maakt een pre-mRNA. Dat gebeurt binnen de celkern.', en: 'RNA polymerase reads the gene and makes a pre-mRNA. This happens inside the nucleus.' } },
    { dur: 8000, title: { nl: 'Mens: het RNA wordt eerst bijgewerkt', en: 'Human: the RNA is edited first' },
      text: { nl: 'De introns gaan eruit (splicing). Het RNA krijgt een 5′-kap en een poly(A)-staart.', en: 'The introns are cut out (splicing). The RNA gets a 5′ cap and a poly(A) tail.' } },
    { dur: 7000, title: { nl: 'Mens: het mRNA verlaat de kern', en: 'Human: the mRNA leaves the nucleus' },
      text: { nl: 'Het rijpe mRNA gaat door een kernporie naar het cytoplasma.', en: 'The mature mRNA passes through a nuclear pore into the cytoplasm.' } },
    { dur: 8000, title: { nl: 'Mens: ribosomen maken het eiwit', en: 'Human: ribosomes make the protein' },
      text: { nl: 'Pas in het cytoplasma lezen ribosomen het mRNA. Een menselijk mRNA draagt meestal één gen.', en: 'Only in the cytoplasm do ribosomes read the mRNA. A human mRNA usually carries one gene.' } },
    { dur: 7000, title: { nl: 'Nu de bacterie: er is geen kern', en: 'Now the bacterium: there is no nucleus' },
      text: { nl: 'Het DNA blijft, maar de kern verdwijnt. Een bacterie is één ruimte zonder kern.', en: 'The DNA stays, but the nucleus disappears. A bacterium is one space without a nucleus.' } },
    { dur: 8000, title: { nl: 'Bacterie: de ribosomen beginnen meteen', en: 'Bacterium: the ribosomes start right away' },
      text: { nl: 'RNA-polymerase kopieert de genen. Ribosomen beginnen al op het mRNA terwijl het nog groeit.', en: 'RNA polymerase copies the genes. Ribosomes already start on the mRNA while it is still growing.' } },
    { dur: 8000, title: { nl: 'Bacterie: één mRNA, drie eiwitten', en: 'Bacterium: one mRNA, three proteins' },
      text: { nl: 'Hier draagt één mRNA drie genen, zoals bij het lac-operon. Elk gen geeft een eigen eiwit.', en: 'Here one mRNA carries three genes, as in the lac operon. Each gene gives its own protein.' } },
    { dur: 9000, title: { nl: 'Zelfde recept, andere werkplaats', en: 'Same recipe, different workshop' },
      text: { nl: 'De vijf grootste verschillen op een rij. Klik op een vak om verder te kijken.', en: 'The five biggest differences side by side. Click a box to look further.' } },
  ],
  svg() {
    return svgOpen() + `<g id="vg-art"></g>` +
      HOT.map(([n, [x, y, w, h], [ax, ay], lb, col]) => `<g data-node="${n}" class="vg-hot" data-color="${col}"${lb ? ` data-label="${L(lb)}"` : ''} opacity="0"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent"/><circle data-anchor="${n}" cx="${ax}" cy="${ay}" r="1" fill="none"/></g>`).join('') +
      `<g id="vg-table" opacity="0">${table()}</g></svg>`;
  },
  init(svg) {
    const art = svg.getElementById('vg-art'), tab = svg.getElementById('vg-table');
    const hot = [...svg.querySelectorAll('.vg-hot')];
    return {
      update(t, s) {
        const [hp, bp, sw, tb] = stateOf(s.step, s.p);
        art.innerHTML = draw(hp, bp, sw);
        art.setAttribute('opacity', (1 - .82 * tb).toFixed(3));
        tab.setAttribute('opacity', tb.toFixed(3));
        const on = SHOW[s.step] ?? [];
        for (const g of hot) {
          const n = g.dataset.node;
          const vis = on.includes(n) && (s.step !== 4 || sw > .9);
          g.setAttribute('opacity', vis ? '1' : '0');
        }
      },
    };
  },
};
