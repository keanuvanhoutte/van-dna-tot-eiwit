import { C, T2, svgOpen, txt, mono, cam, sub, ease, lerp, f1, nt } from '../../kit.js';
import { polymerase } from '../../bio.js';
import { K, prot, panel, ribo } from './_bkit.js';

/* trp-operon van E. coli: Trp-repressor (met tryptofaan als corepressor) en attenuatie via het leiderpeptide (twee Trp-codons).
 * Regio's 1–4 van het leider-RNA: 1:2 = pauzehaarspeld, 3:4 = terminator, 2:3 = antiterminator. Bronnen: Yanofsky 2000 (J Bacteriol, PMC94232); getallen: Yanofsky et al. 1984 (PMC215544). */
const YG = 240, YL = 600;
const GENES = [['trpE', 520, 720], ['trpD', 730, 900], ['trpC', 910, 1060], ['trpB', 1070, 1220], ['trpA', 1230, 1360]];
const REG = [[260, 400], [470, 610], [680, 820], [890, 1030]];   // regio 1..4 op het leider-RNA (close-up)
const RC = ['#ffc247', '#5fd3e6', '#ff8a3d', '#7fdc6a'];
const TRP = '#d98cf0';
const trpMol = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><path d="M${x - 9},${y - 7} l9,-6 l9,6 v10 l-9,6 l-9,-6z" fill="${TRP}" fill-opacity=".6" stroke="${TRP}" stroke-width="2"/></g>`;
/* plaats van nucleotide-positie s (x langs het rechte leider-RNA) als regio i en j een haarspeld vormen (f = 0 recht … 1 gevouwen).
 * De stam staat recht omhoog op het begin van regio i; regio j komt er naast terug omlaag; de rest van het RNA rekt mee tot het 3′-uiteinde. */
const END = 1130, STEM = 1, GAP = 46;
function fold(sx, i, j, f) {
  if (f <= .001 || i < 0) return [sx, YL];
  const [a, b] = REG[i], [c, d] = REG[j], H = (b - a) * STEM, r = GAP / 2;
  let q;
  if (sx <= a) q = [sx, YL];
  else if (sx <= b) q = [a, YL - (sx - a) * STEM];
  else if (sx < c) { const th = Math.PI * (sx - b) / (c - b); q = [a + r - r * Math.cos(th), YL - H - r * Math.sin(th)]; }
  else if (sx <= d) q = [a + GAP, YL - H + (sx - c) * STEM];
  else q = [a + GAP + (sx - d) * (END - a - GAP) / (END - d), YL];
  return [lerp(sx, q[0], f), lerp(YL, q[1], f)];
}
const foldPath = (s0, s1, i, j, f) => { let d = ''; for (let s = s0; s <= s1 + .01; s += 5) { const [x, y] = fold(Math.min(s, s1), i, j, f); d += `${d ? 'L' : 'M'}${f1(x)},${f1(y)}`; } return d; };
/* haarspeld-sporten tussen de twee strengen */
const rungs = (i, j, f, col) => { if (f < .75) return ''; const [a, b] = REG[i], H = (b - a) * STEM; let r = '';
  for (let k = 1; k < 7; k++) { const y = YL - H * k / 7; r += `<line x1="${a + 8}" y1="${f1(y)}" x2="${a + GAP - 8}" y2="${f1(y)}" stroke="${col}" stroke-width="3" opacity="${f1((f - .75) * 4)}"/>`; } return r; };

export default {
  id: 'btrp',
  title: { nl: 'Een tweede schakelaar: het trp-operon', en: 'A second switch: the trp operon' },
  scale: { nl: '≈ 7 kb operon · leider 162 nt', en: '≈ 7 kb operon · leader 162 nt' }, time: { nl: 'beslissing in seconden', en: 'decision within seconds' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[TRP, { nl: 'tryptofaan (Trp)', en: 'tryptophan (Trp)' }], ['#ff6b6b', { nl: 'Trp-repressor', en: 'Trp repressor' }], [RC[0], { nl: 'regio 1 (Trp-codons)', en: 'region 1 (Trp codons)' }], [RC[1], { nl: 'regio 2', en: 'region 2' }], [RC[2], { nl: 'regio 3', en: 'region 3' }], [RC[3], { nl: 'regio 4', en: 'region 4' }], [K.ribo, { nl: 'ribosoom', en: 'ribosome' }]],
  simplified: {
    nl: 'Afstanden niet op schaal. De repressor en de attenuatie werken samen; samen kunnen ze de expressie ongeveer 600 keer veranderen (repressie ≈ 70×, attenuatie tot ≈ 10×). Ook zonder ribosoom op het leider-RNA vormen 1:2 en 3:4, en stopt het kopiëren. Bij Bacillus subtilis regelt een RNA-bindend eiwit (TRAP) de attenuatie in plaats van het ribosoom.',
    en: 'Distances not to scale. Repression and attenuation work together; combined they can change expression about 600-fold (repression ≈ 70×, attenuation up to ≈ 10×). Without a ribosome on the leader RNA, 1:2 and 3:4 also form and copying stops. In Bacillus subtilis an RNA-binding protein (TRAP) controls attenuation instead of the ribosome.' },
  steps: [
    { dur: 8000, cam: cam(800, 420, 1600), title: { nl: 'Vijf genen voor één bouwsteen', en: 'Five genes for one building block' },
      text: { nl: 'Deze vijf genen maken samen het aminozuur tryptofaan (Trp). Is er genoeg Trp, dan moeten ze uit.', en: 'These five genes together make the amino acid tryptophan (Trp). If there is enough Trp, they should be off.' } },
    { dur: 8000, cam: cam(560, 300, 1000), title: { nl: 'Knop 1: de repressor', en: 'Switch 1: the repressor' },
      text: { nl: 'Met Trp erop bindt de Trp-repressor de operator. Dan wordt het operon nog maar weinig gekopieerd.', en: 'With Trp bound, the Trp repressor binds the operator. Then the operon is copied only rarely.' } },
    { dur: 9000, cam: cam(780, 540, 1500), title: { nl: 'Knop 2: een kort leiderstuk', en: 'Switch 2: a short leader' },
      text: { nl: 'Vóór de genen ligt een leiderstuk met twee Trp-codons. Een ribosoom vertaalt het meteen, nog tijdens het kopiëren.', en: 'Before the genes lies a leader with two Trp codons. A ribosome translates it straight away, while copying goes on.' } },
    { dur: 9000, cam: cam(790, 560, 1400), title: { nl: 'Veel Trp: het ribosoom rijdt door', en: 'Plenty of Trp: the ribosome rides on' },
      text: { nl: 'Het ribosoom bedekt regio 2. Regio 3 en 4 vormen een stop-haarspeld: het kopiëren stopt.', en: 'The ribosome covers region 2. Regions 3 and 4 form a stop hairpin: copying stops.' } },
    { dur: 9000, cam: cam(790, 560, 1400), title: { nl: 'Weinig Trp: het ribosoom wacht', en: 'Little Trp: the ribosome waits' },
      text: { nl: 'Bij weinig Trp blijft het ribosoom op de Trp-codons staan. Regio 2 paart met 3: geen stop, de genen worden gekopieerd.', en: 'With little Trp the ribosome stalls on the Trp codons. Region 2 pairs with 3: no stop, the genes are copied.' } },
    { dur: 8000, cam: cam(800, 420, 1600), title: { nl: 'Kan alleen zonder kern', en: 'Only possible without a nucleus' },
      text: { nl: 'Dit trucje werkt omdat kopiëren en vertalen in bacteriën tegelijk gebeuren.', en: 'This trick works because copying and translating happen at the same time in bacteria.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="bw-map"></g>
    <g id="bw-lead"></g>
    <g id="bw-lab"></g>
    <g data-node="operon" data-color="#ff6b6b" data-label="${T2('Vergelijk: lac-operon', 'Compare: lac operon')}"><circle data-anchor="operon" cx="1450" cy="120" r="1" fill="none"/><rect x="1449" y="119" width="2" height="2" fill="none"/></g>
    <g data-node="bterm" data-color="${K.term}" data-label="${T2('Hoe een terminator werkt', 'How a terminator works')}"><circle data-anchor="bterm" cx="1300" cy="735" data-pos="below" r="1" fill="none"/><rect x="1299" y="734" width="2" height="2" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        // operonkaart bovenaan
        const mapOp = step === 2 ? lerp(1, .35, ease(sub(p, .15, .45))) : step === 3 || step === 4 ? .12 : step === 5 ? lerp(.35, 1, ease(sub(p, 0, .3))) : 1;
        let m = `<g opacity="${f1(mapOp)}"><line x1="120" y1="${YG - 8}" x2="1420" y2="${YG - 8}" stroke="${C.dna}" stroke-width="5"/><line x1="120" y1="${YG + 8}" x2="1420" y2="${YG + 8}" stroke="${C.dna2}" stroke-width="5"/>`;
        m += `<rect x="180" y="${YG - 20}" width="120" height="40" rx="6" fill="${K.sig}" fill-opacity=".18" stroke="${K.sig}" stroke-width="2.5"/>` + txt(240, YG + 60, T2('promoter + operator', 'promoter + operator'), K.sig, 22, 'middle', 700);
        m += `<rect x="320" y="${YG - 20}" width="180" height="40" rx="6" fill="#c9d2e4" fill-opacity=".12" stroke="#c9d2e4" stroke-width="2"/>` + txt(410, YG + 60, T2('leider', 'leader'), '#c9d2e4', 22, 'middle', 700);
        GENES.forEach(([g, a, b], i) => { m += `<rect x="${a}" y="${YG - 20}" width="${b - a}" height="40" rx="6" fill="#b98cff" fill-opacity="${step === 0 ? f1(.15 + .25 * sub(p, .2 + i * .1, .3 + i * .1)) : '.15'}" stroke="#b98cff" stroke-width="2"/>` + txt((a + b) / 2, YG + 8, `<tspan font-style="italic">${g}</tspan>`, C.text, 22, 'middle', 700); });
        if (step === 0) m += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(940, YG - 50, T2('→ enzymen die Trp maken', '→ enzymes that make Trp'), '#b98cff', 22, 'middle', 700) + [0, 1, 2, 3].map(i => trpMol(1180 + i * 34, YG - 80)).join('') + '</g>';
        // repressor (stap 1, en zwak zichtbaar in stap 5)
        if (step === 1) {
          const b = ease(sub(p, .2, .6));
          m += `<g transform="translate(0 ${f1((1 - b) * -120)})">` + prot(240, YG - 46, 50, 30, '#ff6b6b', 1, 5, T2('repressor', 'repressor'), 17) + trpMol(206, YG - 84) + trpMol(274, YG - 84) + '</g>';
          m += `<g opacity="${f1(sub(p, .65, .85))}"><path d="M330,${YG - 110} l28,28 m0,-28 l-28,28" stroke="${C.danger}" stroke-width="5"/>` + txt(470, YG - 96, T2('weinig kopieën', 'few copies'), C.danger, 22, 'start', 700) + '</g>';
        }
        m += '</g>';
        $('bw-map').innerHTML = m;

        // close-up van het leider-RNA (stap 2–4)
        let l = '';
        const P0 = p, step0 = step;
        const leadA = step >= 2 && step <= 4 ? 1 : step === 5 ? 1 - sub(p, 0, .3) : 0;
        if (leadA > .01) {
          const step = step0 === 5 ? 4 : step0, p = step0 === 5 ? 1 : P0;
          const a = (step === 2 ? sub(p, .05, .25) : 1) * leadA;
          l += `<g opacity="${f1(a)}">` + `<path d="M410,${YG + 30} L160,${YL - 40} M500,${YG + 30} L1120,${YL - 40}" stroke="#2a3a5f" stroke-width="2" stroke-dasharray="6 6"/>`;
          // welke haarspeld vormt er? stap 3: 3:4 (stopteken); stap 4: eerst 3:4 terug open, dan 2:3
          const back = step === 4 ? 1 - ease(sub(p, 0, .15)) : 0;
          const f34 = step === 3 ? ease(sub(p, .4, .62)) : back, f23 = step === 4 ? ease(sub(p, .3, .52)) : 0;
          const [pi, pj, pf] = f23 > 0 ? [1, 2, f23] : f34 > 0 ? [2, 3, f34] : [-1, -1, 0];
          l += `<path d="${foldPath(150, END, pi, pj, pf)}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` + txt(130, YL + 8, "5′", C.rna, 26, 'end');
          REG.forEach(([x0, x1], i) => {
            l += `<path d="${foldPath(x0, x1, pi, pj, pf)}" stroke="${RC[i]}" stroke-width="20" stroke-linecap="round" fill="none" opacity=".85"/>`;
            const [mx, my] = fold((x0 + x1) / 2, pi, pj, pf), side = pf > .5 && i === pi ? -1 : pf > .5 && i === pj ? 1 : 0;
            l += side ? txt(mx + side * 36, my + 12, `${i + 1}`, RC[i], 36, 'middle', 800) : txt(mx, YL + 76, `${i + 1}`, RC[i], 36, 'middle', 800);
          });
          l += rungs(pi, pj, pf, pi === 2 ? RC[3] : RC[1]);
          // Trp-codons in regio 1
          l += mono(330, YL + 122, 'UGG UGG', RC[0], 28) + txt(330, YL + 160, T2('2 Trp-codons', '2 Trp codons'), RC[0], 24, 'middle', 700);
          // polymerase aan het 3′-uiteinde
          const goOn = step === 4 ? ease(sub(p, .55, .95)) : 0, stop = step === 3 ? ease(sub(p, .6, .9)) : back;
          const px = lerp(1150, 1400, goOn);
          l += `<g transform="translate(${f1(stop * 40)} ${f1(stop * -110)})" opacity="${f1(1 - .8 * stop)}">` + polymerase(px, YL, 58, 32, { col: K.rnap, dir: 1, gul: 9, hoog: 1.35, vul: .45, seed: 31, label: 'RNAP', fs: 21 })   /* bacteriële RNAP (bio.js) */ + '</g>';
          if (goOn > .01) l += `<line x1="1130" y1="${YL}" x2="${f1(px - 50)}" y2="${YL}" stroke="${C.rna}" stroke-width="7"/>` + `<g opacity="${f1(sub(p, .75, .95))}">` + txt(1380, YL + 70, T2('→ trpE … trpA', '→ trpE … trpA'), '#b98cff', 24, 'middle', 700) + '</g>';
          // ribosoom (in stap 4 vervaagt het ribosoom van stap 3 en begint een nieuw situatie)
          let rx = 200;
          if (step === 3) rx = lerp(200, (REG[1][0] + REG[1][1]) / 2, ease(sub(p, .05, .4)));
          if (step === 4) rx = lerp(200, 320, ease(sub(p, .15, .3)));
          if (step === 4 && p < .15) l += ribo((REG[1][0] + REG[1][1]) / 2, YL - 10, 4, 1 - p / .15);
          l += ribo(rx, YL - 10, 4, step === 4 ? sub(p, 0, .15) : 1);
          if (step === 3) l += `<g opacity="${f1(sub(p, .3, .42))}">` + txt(rx, YL - 96, T2('bedekt regio 2', 'covers region 2'), C.trna, 22, 'middle', 700) + '</g>';
          if (step === 4) l += `<g opacity="${f1(sub(p, .3, .45))}">` + txt(rx, YL - 96, T2('wacht op Trp-tRNA', 'waiting for Trp-tRNA'), C.trna, 22, 'middle', 700) + '</g>';
          // labels bij de haarspelden
          const topY = YL - (REG[0][1] - REG[0][0]) * STEM - GAP;
          if (step === 3) l += `<g opacity="${f1(sub(p, .6, .75))}">` + txt(REG[2][0] + GAP / 2, topY - 26, T2('stopteken (3:4)', 'stop signal (3:4)'), C.danger, 28, 'middle', 800) + '</g>';
          if (step === 4) {
            l += `<g opacity="${f1(sub(p, .5, .62))}">` + txt(REG[1][0] + GAP / 2, topY - 26, T2('geen stopteken (2:3)', 'no stop signal (2:3)'), RC[1], 26, 'middle', 800) + '</g>';
            l += `<g opacity="${f1(sub(p, .55, .7))}"><path d="M880,${YL - 70} H1110" stroke="${C.ok}" stroke-width="7" stroke-linecap="round"/><path d="M1104,${YL - 86} l22,16 l-22,16" fill="none" stroke="${C.ok}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>` + txt(995, YL - 90, T2('doorgaan', 'continue'), C.ok, 28, 'middle', 800) + '</g>';
          }
          if (step === 3) l += `<g opacity="${f1(sub(p, .7, .9))}">` + txt(1260, YL - 150, T2('kopiëren stopt', 'copying stops'), C.danger, 26, 'middle', 800) + '</g>';
          l += '</g>';
        }
        $('bw-lead').innerHTML = l;

        let lb = '';
        if (step === 5) {
          const a = sub(p, .1, .3);
          lb += `<g opacity="${f1(a)}">` + panel(300, 420, 1000, 300) + txt(800, 480, T2('Het ribosoom “meet” hoeveel Trp er is', 'The ribosome “measures” how much Trp there is'), C.text, 26, 'middle', 700) +
            txt(800, 550, T2('veel Trp → ribosoom rijdt door → STOP (3:4)', 'plenty of Trp → ribosome rides on → STOP (3:4)'), C.danger, 24, 'middle', 700) +
            txt(800, 600, T2('weinig Trp → ribosoom wacht → doorgaan (2:3)', 'little Trp → ribosome waits → continue (2:3)'), C.ok, 24, 'middle', 700) +
            txt(800, 670, T2('Bij de mens gaat dit niet: daar zit de kern tussen kopiëren en vertalen.', 'This is impossible in humans: the nucleus separates copying and translating.'), C.muted, 21) + '</g>';
        }
        $('bw-lab').innerHTML = lb;
      },
    };
  },
};
