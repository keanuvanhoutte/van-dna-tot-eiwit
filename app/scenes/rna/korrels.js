import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';
import { ribo, arrow } from './_rna.js';

/*
 * Stressgranules en P-bodies (zijpad "Het leven van een RNA", 05-11-2026). Bij stress (hitte, oxidatie …) valt de start van
 * de translatie stil; vrijgekomen mRNA's met RNA-bindende eiwitten (G3BP1, TIA-1 …) vormen druppels zonder membraan, die na
 * de stress weer oplossen (Protter & Parker 2016). P-bodies: ook zonder stress, met afbraakeiwitten; gezuiverde P-bodies
 * bevatten vooral onderdrukte maar niet afgebroken mRNA's (Hubstenberger et al. 2017; Courel et al. 2019). Fasescheiding =
 * huidig model. ALS: TDP-43 en FUS in korrels en in klonters in motorneuronen; oorzakelijk verband onzeker (Li et al. 2013).
 * Nagekeken in docs/verificatie-ronde-11-rna-lot.md.
 */
const L3 = (nl, en) => ({ nl, en });
const SG = '#5fd3e6', PB = '#e0679a', STICK = '#b48cff', HEAT = '#ff6b6b';

/* 12 mRNA's: thuisplek (raster met vaste jitter), doel in een van de twee druppels */
const R = rng(7), D = [[620, 420], [1060, 500]];
const M = Array.from({ length: 12 }, (_, i) => {
  const c = i % 4, r = (i / 4) | 0, d = D[(c + r) % 2], a = i * 2.4, rr = 22 + (i * 17) % 58;
  return { hx: 250 + c * 330 + (R() - .5) * 60, hy: 230 + r * 215 + (R() - .5) * 50, tx: d[0] + rr * Math.cos(a), ty: d[1] + rr * Math.sin(a), rot: (R() - .5) * 40 };
});
const PBS = [[440, 335], [1090, 570]];
const vis = (set, step, p) => {
  const k = ease(sub(p, 0, .25));
  return set.includes(step) ? (set.includes(step - 1) || step === 0 ? 1 : k) : set.includes(step - 1) ? 1 - k : 0;
};
const squig = (x, y, s, rot, op = 1, w = 7) => op <= .01 ? '' : `<path transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})" d="M-60,0 q10,-16 20,0 t20,0 t20,0 t20,0 t20,0 t20,0" stroke="${C.rna}" stroke-width="${f1(w / s)}" fill="none" stroke-linecap="round" opacity="${f1(op)}"/>`;
const pac = (x, y, r = 14, op = 1) => op <= .01 ? '' : `<path d="M${f1(x)},${f1(y)} L${f1(x + r * .87)},${f1(y - r * .5)} A${r},${r} 0 1 0 ${f1(x + r * .87)},${f1(y + r * .5)} Z" fill="${C.danger}" opacity="${f1(op)}"/>`;

export default {
  id: 'korrels',
  title: L3('Bij stress gaan mRNA’s even in druppels', 'Under stress, mRNAs gather in droplets'),
  scale: L3('kleinste druppels ≈ 0,2 µm (schematisch)', 'smallest droplets ≈ 0.2 µm (schematic)'),
  time: L3('zolang de stress duurt', 'as long as the stress lasts'),
  org: L3('mens (ook gist en andere eukaryoten)', 'human (also yeast and other eukaryotes)'),
  legend: [[C.rna, 'mRNA'], [C.rrna, L3('ribosoom', 'ribosome')], [STICK, L3('kleverig eiwit', 'sticky protein')], [SG, L3('druppel bij stress', 'droplet under stress')],
    [PB, L3('druppel met afbraakeiwitten', 'droplet with breakdown proteins')], [C.danger, L3('afbraakeiwit', 'breakdown protein')]],
  simplified: {
    nl: 'Schematisch en niet op schaal: een echte druppel bevat honderden soorten eiwitten en duizenden mRNA’s, en een cel kan tientallen druppels hebben. Dat ze ontstaan zoals olie in water (fasescheiding) is het huidige model; de details worden nog onderzocht. Ribosomen laten niet allemaal tegelijk los, en een deel van de mRNA’s blijft buiten de druppels. Of P-bodies mRNA’s vooral bewaren of afbreken, is niet beslist. De klonters bij ALS zijn vereenvoudigd tot één vorm.',
    en: 'Schematic and not to scale: a real droplet contains hundreds of kinds of proteins and thousands of mRNAs, and a cell can have dozens of droplets. That they form like oil in water (phase separation) is the current model; the details are still being studied. Ribosomes do not all let go at once, and some of the mRNAs stay outside the droplets. Whether P-bodies mainly store or break down mRNAs has not been settled. The clumps in ALS are simplified to one shape.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('In een gezonde cel lezen ribosomen mRNA’s af', 'In a healthy cell ribosomes read mRNAs'),
      text: L3('Op elk mRNA lezen meerdere ribosomen tegelijk. Zo maakt de cel voortdurend eiwitten.', 'Several ribosomes read each mRNA at once. That is how the cell keeps making proteins.') },
    { dur: 8500, cam: FULL, title: L3('Bij hitte stopt de cel met vertalen', 'In heat the cell stops translating'),
      text: L3('Bij stress, zoals hitte, start de cel geen nieuwe eiwitten meer. De ribosomen lopen van de mRNA’s af.', 'Under stress, such as heat, the cell stops starting new proteins. The ribosomes run off the mRNAs.') },
    { dur: 9000, cam: FULL, title: L3('Vrije mRNA’s klonteren samen in druppels', 'Free mRNAs clump together in droplets'),
      text: L3('Kleverige eiwitten binden de vrije mRNA’s. Samen vormen ze druppels zonder membraan, zoals olie in water.', 'Sticky proteins bind the free mRNAs. Together they form droplets without a membrane, like oil in water.') },
    { dur: 8500, cam: cam(620, 430, 900), title: L3('Een druppel heeft geen wand', 'A droplet has no wall'),
      text: L3('Moleculen schuiven voortdurend in en uit. Hoe zulke druppels precies ontstaan, wordt nog onderzocht.', 'Molecules keep sliding in and out. Exactly how such droplets form is still being studied.') },
    { dur: 8500, cam: FULL, title: L3('Na de stress lossen de druppels op', 'After the stress the droplets dissolve'),
      text: L3('Is de hitte voorbij, dan vallen de druppels uiteen. De ribosomen lezen de mRNA’s weer af.', 'Once the heat is over, the droplets fall apart. The ribosomes read the mRNAs again.') },
    { dur: 8000, cam: FULL, title: L3('Andere druppels zijn er altijd', 'Other droplets are always there'),
      text: L3('Ook zonder stress heeft de cel kleine druppels. Daarin liggen mRNA’s samen met afbraakeiwitten.', 'Even without stress the cell has small droplets. In them, mRNAs lie together with breakdown proteins.') },
    { dur: 9000, cam: cam(450, 360, 900), title: L3('Afbreken of bewaren?', 'Break down or store?'),
      text: L3('Lang dacht men dat mRNA’s hier afgebroken worden. Recent onderzoek wijst eerder op bewaren.', 'For a long time people thought mRNAs were broken down here. Recent research points more to storage.') },
    { dur: 9500, cam: FULL, title: L3('Een mogelijk verband met ziekte', 'A possible link with disease'),
      text: L3('Bij de ziekte ALS zitten in zenuwcellen klonters van eiwitten die ook in deze druppels voorkomen. Of de druppels die klonters veroorzaken, wordt nog onderzocht.', 'In the disease ALS, nerve cells contain clumps of proteins that also occur in these droplets. Whether the droplets cause those clumps is still being studied.') },
  ],
  svg() {
    return svgOpen() + `<g id="ko-v"></g>
    ${btn('idp', 40, 400, T2('↑ eiwitten zonder vaste vorm', '↑ proteins without a fixed shape'), STICK)}
    ${btn('mrnaafbraak', 1150, 410, T2('volgende: afbraak van mRNA →', 'next: breakdown of mRNA →'), PB)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        // toestand van de cel
        const heat = step < 1 ? 0 : step === 1 ? ease(sub(p, 0, .35)) : step < 4 ? 1 : step === 4 ? 1 - ease(sub(p, 0, .35)) : 0;
        const runoff = step === 1 ? ease(sub(p, .3, .9)) : step >= 2 && step <= 3 ? 1 : step === 4 ? 1 - ease(sub(p, .6, .95)) : 0;
        const stick = step === 2 ? ease(sub(p, 0, .3)) : step === 3 ? 1 : step === 4 ? 1 - ease(sub(p, .25, .7)) : 0;
        const gather = step === 2 ? ease(sub(p, .2, .85)) : step === 3 ? 1 : step === 4 ? 1 - ease(sub(p, .2, .7)) : 0;
        const drop = step === 2 ? ease(sub(p, .5, .9)) : step === 3 ? 1 : step === 4 ? 1 - ease(sub(p, .15, .55)) : 0;
        let o = '';
        const vA = vis([0, 1, 2, 3, 4, 5, 6], step, p);
        if (vA > .01) {
          o += `<g opacity="${f1(vA)}"><rect x="120" y="125" width="1360" height="640" rx="60" fill="rgba(19,33,67,.55)" stroke="#2a3a63" stroke-width="3"/>`;
          o += T(170, 730, 'cytosol', { size: 24, anchor: 'start', col: C.muted });
          // druppels bij stress
          D.forEach(([x, y], i) => {
            if (drop > .01) o += `<circle cx="${x}" cy="${y}" r="${f1(Math.max(0, 70 + 55 * drop))}" fill="rgba(95,211,230,.14)" stroke="${SG}" stroke-width="3" opacity="${f1(drop)}"/>`;
            if (i === 0) o += T(x, y - 145, T2('druppel zonder membraan', 'droplet without a membrane'), { size: 24, col: SG, op: drop * (step === 2 ? sub(p, .8, .95) : step === 3 ? 0 : 1) });
          });
          // P-bodies (stap 5 en 6)
          const pb = ph(5, .15, .6), dim = step === 6 ? 1 - .7 * ease(sub(p, 0, .3)) : 1;
          // mRNA's met ribosomen
          M.forEach((m, i) => {
            const x = lerp(m.hx, m.tx, gather), y = lerp(m.hy, m.ty, gather), sc = lerp(1, .5, gather), rot = lerp(m.rot, i * 30, gather);
            o += `<g opacity="${f1(dim)}">` + squig(x, y, sc, rot);
            const rad = rot * Math.PI / 180, ca = Math.cos(rad), sa = Math.sin(rad);
            [-40, 0, 40].forEach((d, j) => {
              const dd = d + 70 * runoff, op = 1 - sub(runoff, .3 + j * .15, .7 + j * .1);
              if (op > .01) o += ribo(x + dd * ca * sc, y + dd * sa * sc - 4, .3, op, '');
            });
            if (stick > .01) [-30, 20].forEach(d => { o += `<circle cx="${f1(x + d * ca * sc)}" cy="${f1(y + d * sa * sc - 10)}" r="9" fill="${STICK}" opacity="${f1(stick)}"/>`; });
            o += '</g>';
          });
          // stap 3: moleculen schuiven in en uit
          if (step === 3) {
            const [x, y] = D[0];
            for (let i = 0; i < 6; i++) {
              const a = i * 1.05 + .3, rr = 125 + 70 * Math.sin(2 * Math.PI * (p * 1.2 + i / 6));
              o += `<circle cx="${f1(x + rr * Math.cos(a))}" cy="${f1(y + rr * Math.sin(a))}" r="10" fill="${i % 2 ? STICK : C.rna}"/>`;
            }
            o += arrow(x + 200, y - 110, x + 135, y - 70, C.muted, 3, sub(p, .1, .3)) + arrow(x - 135, y + 70, x - 200, y + 110, C.muted, 3, sub(p, .1, .3)) +
              T(x + 210, y - 125, T2('in', 'in'), { size: 26, col: C.text, anchor: 'start', op: sub(p, .1, .3) }) + T(x - 210, y + 140, T2('uit', 'out'), { size: 26, col: C.text, anchor: 'end', op: sub(p, .1, .3) }) +
              T(x, y + 170, T2('geen wand', 'no wall'), { size: 28, col: SG, w: 700, op: sub(p, .3, .5) });
          }
          if (pb > .01) {
            PBS.forEach(([x, y], i) => {
              o += `<g opacity="${f1(pb)}"><circle cx="${x}" cy="${y}" r="62" fill="rgba(224,103,154,.16)" stroke="${PB}" stroke-width="3" stroke-dasharray="9 6"/>` +
                squig(x - 8, y - 18, .45, 15) + squig(x + 6, y + 18, .45, -20) + pac(x + 30, y - 30, 13) + pac(x - 34, y + 26, 13) + '</g>';
              if (i === 0) o += T(x + 76, y + 8, T2('kleine druppel, ook zonder stress', 'small droplet, even without stress'), { size: 24, col: PB, anchor: 'start', op: pb * (step === 6 ? 1 - sub(p, 0, .2) : 1) });
            });
          }
          if (step === 6) {
            const [x, y] = PBS[0], kL = ease(sub(p, .15, .45)), kR = ease(sub(p, .45, .8));
            o += arrow(x - 70, y - 20, x - 190, y - 90, PB, 4, kL) + arrow(x + 70, y - 20, x + 190, y - 90, C.rrna, 4, kR);
            if (kL > .01) for (let j = 0; j < 4; j++) o += `<line x1="${f1(x - 270 + j * 26)}" y1="${f1(y - 120 + (j % 2) * 12)}" x2="${f1(x - 254 + j * 26)}" y2="${f1(y - 120 + (j % 2) * 12)}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round" opacity="${f1(kL)}"/>`;
            o += T(x - 230, y - 160, T2('afbreken?', 'break down?'), { size: 26, col: PB, w: 700, op: kL }) +
              squig(x + 245, y - 118, .6, 0, kR) + ribo(x + 245, y - 122, .3, kR, '') + T(x + 245, y - 160, T2('bewaren?', 'store?'), { size: 26, col: C.rrna, w: 700, op: kR });
          }
          // thermometer
          const vT = heat > .01 || (step >= 1 && step <= 4) ? 1 : 0;
          if (vT) {
            const lv = .15 + .85 * heat;
            o += `<rect x="1430" y="160" width="34" height="200" rx="17" fill="#0b1224" stroke="${C.muted}" stroke-width="3"/>` +
              `<rect x="1440" y="${f1(350 - 180 * lv)}" width="14" height="${f1(Math.max(0, 180 * lv))}" rx="7" fill="${HEAT}"/><circle cx="1447" cy="375" r="26" fill="${HEAT}" stroke="${C.muted}" stroke-width="3"/>` +
              T(1447, 440, T2('hitte', 'heat'), { size: 26, col: HEAT, w: 700, op: .3 + .7 * heat });
          }
          o += '</g>';
        }
        /* ── ALS: klonter in een zenuwcel ── */
        const vC = vis([7], step, p);
        if (vC > .01) {
          const k = ease(sub(p, .2, .7));
          o += `<g opacity="${f1(vC)}"><path d="M420,460 C420,330 520,270 620,290 C700,305 760,380 1500,430 L1500,500 C760,540 700,620 620,630 C520,645 420,590 420,460Z" fill="#2a2350" stroke="#b9a6ff" stroke-width="4"/>` +
            `<circle cx="540" cy="460" r="62" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="3"/>`;
          // druppel → klonter
          const cx = 760, cy = 460, n = 14;
          let d = '';
          for (let i = 0; i < n; i++) {
            const a = i / n * 2 * Math.PI, rr = 70 * (1 + k * (i % 2 ? -.25 : .18));
            d += `${i ? 'L' : 'M'}${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a))}`;
          }
          o += `<path d="${d}Z" fill="${k > .5 ? 'rgba(255,107,107,.35)' : 'rgba(95,211,230,.18)'}" stroke="${k > .5 ? C.danger : SG}" stroke-width="4" stroke-linejoin="round"/>`;
          for (let i = 0; i < 6; i++) o += `<circle cx="${f1(cx - 30 + (i % 3) * 30)}" cy="${f1(cy - 15 + ((i / 3) | 0) * 30)}" r="9" fill="${STICK}"/>`;
          o += '</g>' + T(540, 700, T2('zenuwcel', 'nerve cell'), { size: 28, w: 700, op: vC }) +
            T(cx, 360, T2('druppel', 'droplet'), { size: 26, col: SG, op: vC * (1 - k) }) + T(cx, 360, T2('klonter', 'clump'), { size: 26, col: C.danger, w: 700, op: vC * k }) +
            T(1150, 640, T2('verband nog onzeker', 'link still uncertain'), { size: 26, col: C.muted, op: vC * sub(p, .6, .85) });
        }
        $('ko-v').innerHTML = o;
      },
    };
  },
};
