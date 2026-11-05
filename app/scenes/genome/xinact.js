import { C, T2, svgOpen, FULL, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';

/*
 * X-inactivatie (zijpad epigenetica, 05-11-2026): in vrouwelijke zoogdiercellen wordt vroeg in het embryo per cel
 * willekeurig één X stilgezet (Lyon 1961); het XIST-RNA bedekt dat X (Brown et al. 1991; Clemson et al. 1996), dat
 * compact wordt (Barr-lichaampje). De keuze wordt doorgegeven aan alle dochtercellen → mozaïek (lapjeskat: Kaelin et al.
 * 2025). ≈ 15 % van de X-genen ontsnapt, nog ≈ 10 % wisselend (Carrel & Willard 2005).
 */
const L3 = (nl, en) => ({ nl, en });
const MOM = '#ff9ec7', DAD = '#6fd3ff', OFF = '#4a5470', XIST = C.rna, ORANGE = '#ff9a3c', BLACK = '#1d1d24';

/* X-chromosoom (twee chromatiden, kruisvorm) */
function xc(x, y, s, col, op = 1) {
  if (op <= .01) return '';
  const w = 16 * s, h = 70 * s;
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)})"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w / 2)}" fill="${col}" transform="rotate(18)"/>` +
    `<rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w / 2)}" fill="${col}" transform="rotate(-18)"/></g>`;
}
const yc = (x, y, s, col) => `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="${f1(-8 * s)}" y="${f1(-22 * s)}" width="${f1(16 * s)}" height="${f1(44 * s)}" rx="${f1(8 * s)}" fill="${col}" transform="rotate(14)"/><rect x="${f1(-8 * s)}" y="${f1(-22 * s)}" width="${f1(16 * s)}" height="${f1(44 * s)}" rx="${f1(8 * s)}" fill="${col}" transform="rotate(-14)"/></g>`;
const nucleus = (x, y, r, op = 1) => op <= .01 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4" opacity="${f1(op)}"/>`;

/* vroeg embryo: 8 cellen; per cel bij toeval welk X stil wordt (vast patroon) */
const R0 = rng(11), EMB = [[800, 450], ...Array.from({ length: 7 }, (_, i) => [800 + 190 * Math.cos(i * 2 * Math.PI / 7 - 1.4), 450 + 190 * Math.sin(i * 2 * Math.PI / 7 - 1.4)])].map(q => [...q, R0() < .5]);
/* weefsel: vlekken (klonen) rond 11 kiemcellen */
const R1 = rng(4), SEEDS = Array.from({ length: 11 }, () => [180 + R1() * 1240, 190 + R1() * 480, R1() < .5]);
/* lapjeskat: vlekken */
const PATCH = [[690, 430, 90, ORANGE], [860, 380, 70, BLACK], [960, 470, 80, ORANGE], [560, 470, 60, BLACK], [1080, 330, 46, ORANGE], [1000, 280, 38, BLACK], [770, 540, 50, BLACK], [1190, 560, 40, ORANGE]];
const ESC = [2, 8, 15];                                  // 3 van 20 genen ≈ 15 % ontsnapt

export default {
  id: 'xinact',
  title: L3('Eén X-chromosoom gaat op slot', 'One X chromosome is locked away'),
  scale: L3('kern ≈ 10 µm · kat ≈ 50 cm (schematisch)', 'nucleus ≈ 10 µm · cat ≈ 50 cm (schematic)'),
  time: L3('vroeg in het embryo, daarna een leven lang', 'early in the embryo, then for a lifetime'),
  org: L3('mens (en kat als voorbeeld)', 'human (and cat as an example)'),
  legend: [[MOM, L3('X van de moeder', 'X from the mother')], [DAD, L3('X van de vader', 'X from the father')], [OFF, L3('stilgezet X', 'silenced X')], [XIST, L3('RNA dat het stille X bedekt', 'RNA that coats the silent X')], [C.ok, L3('gen dat aan blijft', 'gene that stays on')]],
  simplified: {
    nl: 'Schematisch: chromosomen zijn als kruisjes getekend, hoewel ze tussen celdelingen als losse kluwens in de kern liggen. Het embryo telt hier 8 cellen; bij de mens gebeurt de keuze rond de innesteling, als het embryo al meer cellen heeft. De vlekken van een lapjeskat ontstaan in de pigmentcellen van de huid; wit komt door een ander gen.',
    en: 'Schematic: chromosomes are drawn as little crosses, although between cell divisions they lie in the nucleus as loose tangles. The embryo has 8 cells here; in humans the choice happens around implantation, when the embryo already has more cells. The patches of a calico cat arise in the pigment cells of the skin; white is caused by another gene.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Twee X-chromosomen, maar één werkt', 'Two X chromosomes, but only one works'),
      text: L3('Een vrouw heeft twee X-chromosomen, een man één. Toch werkt bij allebei maar één X volop.', 'A woman has two X chromosomes, a man one. Yet in both only one X is fully active.') },
    { dur: 8000, cam: FULL, title: L3('Elke cel kiest bij toeval één X', 'Each cell picks one X at random'),
      text: L3('Vroeg in het embryo zet elke cel één X stil. Welke van de twee, is toeval.', 'Early in the embryo every cell silences one X. Which of the two is chance.') },
    { dur: 8500, cam: FULL, title: L3('Een RNA bedekt het gekozen X', 'An RNA coats the chosen X'),
      text: L3('Het gekozen X maakt een lang RNA dat zich over het hele chromosoom legt.', 'The chosen X makes a long RNA that spreads over the whole chromosome.') },
    { dur: 8500, cam: FULL, title: L3('Het stille X wordt een compact bolletje', 'The silent X becomes a compact blob'),
      text: L3('Het X wordt compact en stil. Onder de microscoop is het een donker bolletje: het Barr-lichaampje.', 'The X becomes compact and silent. Under the microscope it is a dark blob: the Barr body.') },
    { dur: 8500, cam: FULL, title: L3('Dochtercellen houden dezelfde keuze', 'Daughter cells keep the same choice'),
      text: L3('Elke dochtercel houdt hetzelfde X stil. Zo bestaat een vrouw uit een mozaïek van vlekjes.', 'Every daughter cell keeps the same X silent. So a woman is a mosaic of patches.') },
    { dur: 9000, cam: FULL, title: L3('Een lapjeskat toont het mozaïek', 'A calico cat shows the mosaic'),
      text: L3('Bij katten ligt een gen voor oranje vacht op het X. Waar het ene X werkt is de vacht oranje, waar het andere werkt zwart.', 'In cats a gene for orange fur lies on the X. Where one X works the fur is orange, where the other works it is black.') },
    { dur: 8000, cam: FULL, title: L3('Sommige genen ontsnappen', 'Some genes escape'),
      text: L3('Toch blijft ongeveer 15 % van de genen op het stille X gewoon aan.', 'Still, about 15 % of the genes on the silent X simply stay on.') },
  ],
  svg() {
    return svgOpen() + `<defs><clipPath id="xi-cat"><ellipse cx="830" cy="470" rx="330" ry="150"/><circle cx="1130" cy="330" r="110"/><path d="M1050,250 L1060,150 L1120,225Z M1150,225 L1210,150 L1220,250Z"/><path d="M500,470 C380,440 350,330 420,270 L450,290 C400,340 420,420 520,440Z"/><rect x="590" y="560" width="60" height="150" rx="28"/><rect x="980" y="560" width="60" height="150" rx="28"/></clipPath></defs>
    <g id="xi-v"></g>
    ${btn('dnamethyl', 40, 340, T2('↑ DNA-methylatie', '↑ DNA methylation'), C.danger)}
    ${btn('imprinting', 1100, 460, T2('volgende: van moeder of van vader? →', 'next: from mother or from father? →'), '#ffc247')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const fin = ease(sub(p, 0, .25)), fout = 1 - fin;
        const vis = (a, b) => (step >= a && step <= b) ? (step === a && a > 0 ? fin : 1) : step === b + 1 ? fout : 0;
        let o = '';
        // A: man en vrouw
        const vA = vis(0, 0);
        if (vA > .01) {
          o += `<g opacity="${f1(vA)}">` + nucleus(480, 470, 230) + nucleus(1120, 470, 230) +
            xc(430, 470, 1.6, MOM) + yc(540, 480, 1.4, '#8a93a8') + xc(1060, 470, 1.6, MOM) + xc(1190, 470, 1.6, DAD, 1) + '</g>' +
            T(480, 780, T2('man: X + Y', 'man: X + Y'), { size: 30, w: 700, op: vA }) + T(1120, 780, T2('vrouw: X + X', 'woman: X + X'), { size: 30, w: 700, op: vA });
        }
        // B: embryo, elke cel kiest
        const vB = vis(1, 1);
        if (vB > .01) {
          const kc = step === 1 ? ease(sub(p, .3, .8)) : 1;
          o += `<g opacity="${f1(vB)}">`;
          EMB.forEach(([x, y, momOff]) => {
            o += `<circle cx="${f1(x)}" cy="${f1(y)}" r="88" fill="rgba(156,192,255,.10)" stroke="#9cc0ff" stroke-width="3"/>`;
            o += xc(x - 28, y, .8, momOff ? lerp3(MOM, kc) : MOM) + xc(x + 28, y, .8, momOff ? DAD : lerp3(DAD, kc));
          });
          o += '</g>' + T(800, 130, T2('vroeg embryo', 'early embryo'), { size: 30, w: 700, op: vB }) + T(800, 800, T2('grijs = stilgezet X', 'grey = silenced X'), { size: 26, col: C.muted, op: vB * (step === 1 ? ease(sub(p, .6, .9)) : 1) });
        }
        // C: één kern, RNA bedekt het X, daarna compact (Barr-lichaampje)
        const vC = vis(2, 3);
        if (vC > .01) {
          const kx = step === 2 ? ease(sub(p, .15, .9)) : step > 2 ? 1 : 0, kb = step === 3 ? ease(sub(p, .1, .7)) : step > 3 ? 1 : 0;
          o += `<g opacity="${f1(vC)}">` + `<circle cx="800" cy="470" r="330" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="5"/>`;
          o += xc(640, 470, 3, MOM);
          const bx = lerp(960, 1010, kb), by = lerp(470, 260, kb), sc = lerp(3, 1.5, kb);
          o += xc(bx, by, sc, lerp3(DAD, kb));
          const n = Math.round(16 * kx);
          for (let i = 0; i < n; i++) {
            // langs de twee armen van het X verdeeld (u = -1 … 1 van boven naar onder)
            const arm = i % 2 ? 1 : -1, u = ((i >> 1) / 7) * 2 - 1, hy = u * 30 * sc, hx = arm * hy * Math.tan(18 * Math.PI / 180), q = 7 * sc / 3;
            o += `<path d="M${f1(bx + hx - 2 * q)},${f1(by + hy)} q${f1(q)},${f1(-1.4 * q)} ${f1(2 * q)},0 t${f1(2 * q)},0" stroke="${XIST}" stroke-width="${f1(2.2 * sc / 3 + 2)}" fill="none" stroke-linecap="round"/>`;
          }
          o += '</g>' + T(640, 640, T2('actief X', 'active X'), { size: 28, col: MOM, w: 700, op: vC });
          o += T(960, 640, T2('RNA bedekt dit X', 'RNA coats this X'), { size: 28, col: XIST, w: 700, op: vC * (step === 2 ? ease(sub(p, .5, .8)) : 1 - kb) });
          o += T(1010, 360, T2('Barr-lichaampje', 'Barr body'), { size: 28, col: C.text, w: 700, op: vC * kb });
        }
        // D: weefsel als mozaïek
        const vD = vis(4, 4);
        if (vD > .01) {
          o += `<g opacity="${f1(vD)}">`;
          for (let gy = 0; gy < 7; gy++) for (let gx = 0; gx < 15; gx++) {
            const x = 190 + gx * 87 + (gy % 2) * 40, y = 200 + gy * 78;
            let best = 0, bd = 1e9;
            SEEDS.forEach(([sx, sy], k) => { const dd = (sx - x) ** 2 + (sy - y) ** 2; if (dd < bd) { bd = dd; best = k; } });
            o += `<rect x="${x - 38}" y="${y - 34}" width="76" height="68" rx="16" fill="${SEEDS[best][2] ? MOM : DAD}" fill-opacity=".55" stroke="#0a1224" stroke-width="3"/>`;
          }
          o += '</g>' + T(800, 150, T2('roze = X van moeder werkt · blauw = X van vader werkt', 'pink = mother’s X works · blue = father’s X works'), { size: 26, op: vD });
        }
        // E: lapjeskat
        const vE = vis(5, 5);
        if (vE > .01) {
          o += `<g opacity="${f1(vE)}"><g clip-path="url(#xi-cat)"><rect x="300" y="100" width="1000" height="650" fill="#f2efe8"/>` +
            PATCH.map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('') + '</g>' +
            `<circle cx="1095" cy="320" r="10" fill="#2f8f4f"/><circle cx="1165" cy="320" r="10" fill="#2f8f4f"/></g>` +
            T(820, 800, T2('oranje en zwart: twee X-chromosomen aan het werk', 'orange and black: two X chromosomes at work'), { size: 28, w: 700, op: vE });
        }
        // F: genen op het stille X, enkele blijven aan
        const vF = vis(6, 6);
        if (vF > .01) {
          const k = step === 6 ? ease(sub(p, .25, .6)) : 1;
          o += `<g opacity="${f1(vF)}"><rect x="260" y="410" width="1080" height="80" rx="40" fill="${OFF}"/>`;
          for (let i = 0; i < 20; i++) {
            const on = ESC.includes(i);
            o += `<rect x="${290 + i * 52}" y="425" width="40" height="50" rx="8" fill="${on ? lerp3g(k) : '#2c3448'}" stroke="#0a1224" stroke-width="2"/>`;
          }
          o += '</g>' + T(800, 370, T2('genen op het stille X', 'genes on the silent X'), { size: 28, w: 700, op: vF }) +
            T(800, 560, T2('≈ 15 % blijft aan', '≈ 15 % stays on'), { size: 30, col: C.ok, w: 700, op: vF * k });
        }
        $('xi-v').innerHTML = o;
      },
    };
  },
};

/* kleur van een X die stilgezet wordt: van zijn eigen kleur naar grijs */
function lerp3(col, k) { return mix(col, OFF, k); }
function lerp3g(k) { return mix('#2c3448', C.ok, k); }
function mix(a, b, k) {
  const h = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('');
}
