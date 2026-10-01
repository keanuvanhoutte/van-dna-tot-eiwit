import { C, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, capG, ribo, note, arrow, ntRow, hot, setHot } from './_rna.js';

/* mRNA-afbraak in het cytoplasma: deadenylatie → decapping → XRN1 (5'→3') of exosoom (3'→5'). 5' links. */
const Y = 470;
const X = { cap: 190, u5: [205, 290], orf: [290, 860], u3: [860, 1150], are: 1010, pa: [1150, 1400] };
const PAB = [1175, 1215, 1255, 1295, 1335, 1375];
const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'mrnaafbraak',
  title: { nl: 'mRNA-afbraak', en: 'mRNA decay' },
  scale: '≈ 50 nm',
  time: { nl: 'halfwaardetijd: minuten tot vele uren', en: 'half-life: minutes to many hours' },
  org: { nl: 'mens (cytoplasma)', en: 'human (cytoplasm)' },
  legend: [[C.rna, 'mRNA'], [C.cap, { nl: 'm⁷G-cap / poly(A)', en: 'm⁷G cap / poly(A)' }], ['#3fb6c9', { nl: 'translatiefactoren, PABPC1', en: 'translation factors, PABPC1' }], ['#8a5a3a', { nl: 'nucleasen & afbraakfactoren', en: 'nucleases & decay factors' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Afbraak is net zo belangrijk als transcriptie voor de hoeveelheid van een mRNA: kortlevende mRNA\'s (met AU-rijke elementen, bv. voor cytokines) laten de cel snel reageren. Gespecialiseerde routes: <b>NMD</b> (vroegtijdig stopcodon) en <b>miRNA\'s</b> (via CCR4–NOT).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Decay matters as much as transcription for how much of an mRNA there is: short-lived mRNAs (with AU-rich elements, e.g. for cytokines) let the cell respond quickly. Specialised routes: <b>NMD</b> (premature stop codon) and <b>miRNAs</b> (via CCR4–NOT).</p>' },
  simplified: {
    nl: 'Niet op schaal; de poly(A)-staart (≈ 200–250 nt bij de start) en het aantal PABPC1-kopieën zijn ingekort. Deadenylatie gebeurt in twee fasen (eerst PAN2–PAN3, dan CCR4–NOT) maar is hier één vloeiende inkorting. De decapping-activatoren (DCP1, EDC3/4, DDX6 …) zijn samengevat. Endonucleolytische routes (bv. via SMG6 of IRE1) zijn weggelaten.',
    en: 'Not to scale; the poly(A) tail (≈ 200–250 nt at the start) and the number of PABPC1 copies are shortened. Deadenylation occurs in two phases (first PAN2–PAN3, then CCR4–NOT) but is shown here as one smooth shortening. The decapping activators (DCP1, EDC3/4, DDX6 …) are summarised. Endonucleolytic routes (e.g. via SMG6 or IRE1) are omitted.' },
  steps: [
    ST(7500, cam(800, 440, 1450), 'Een mRNA in gebruik', 'An mRNA in use',
      'eIF4E op de cap en PABPC1 op de poly(A)-staart worden via eIF4G verbonden: de gesloten lus beschermt beide uiteinden terwijl ribosomen vertalen.',
      'eIF4E on the cap and PABPC1 on the poly(A) tail are linked via eIF4G: the closed loop protects both ends while ribosomes translate.'),
    ST(7500, cam(1060, 460, 760), 'AU-rijk element in de 3\'-UTR', 'AU-rich element in the 3\' UTR',
      'Sequenties als AUUUA in de 3\'-UTR binden eiwitten zoals TTP, die de afbraakmachine aantrekken. Zo leven mRNA\'s voor bv. TNF-α maar kort.',
      'Sequences such as AUUUA in the 3\' UTR bind proteins such as TTP, which recruit the decay machinery. This keeps mRNAs for e.g. TNF-α short-lived.'),
    ST(8500, cam(1020, 450, 1070), 'Deadenylatie', 'Deadenylation',
      'PAN2–PAN3 en daarna CCR4–NOT knabbelen de poly(A)-staart af; PABPC1 valt eraf en de lus gaat open. Meestal is dit de snelheidsbepalende stap.',
      'PAN2–PAN3 and then CCR4–NOT nibble away the poly(A) tail; PABPC1 falls off and the loop opens. This is usually the rate-limiting step.'),
    ST(8000, cam(720, 450, 1350), 'Decapping', 'Decapping',
      'LSm1–7–PAT1 bindt het korte oligo(A)-uiteinde en roept DCP1–DCP2 op. DCP2 knipt de cap eraf (m⁷GDP komt vrij); het 5\'-uiteinde heeft nu één fosfaat.',
      'LSm1–7–PAT1 binds the short oligo(A) end and recruits DCP1–DCP2. DCP2 clips off the cap (m⁷GDP is released); the 5\' end now has a single phosphate.'),
    ST(8000, cam(760, 450, 1350), 'XRN1: 5\' → 3\'', 'XRN1: 5\' → 3\'',
      'De exonuclease XRN1 grijpt het vrije 5\'-monofosfaat en breekt het mRNA nucleotide per nucleotide af, 5\'→3\'. Dit is de hoofdroute.',
      'The exonuclease XRN1 grabs the free 5\' monophosphate and degrades the mRNA nucleotide by nucleotide, 5\'→3\'. This is the main route.'),
    ST(8500, cam(760, 450, 1350), 'Of: het exosoom, 3\' → 5\'', 'Or: the exosome, 3\' → 5\'',
      'Na deadenylatie kan het SKI-complex (SKI2–SKI3–SKI8) het 3\'-uiteinde in het exosoom leiden, dat 3\'→5\' afbreekt. DcpS ruimt het overgebleven capstukje op.',
      'After deadenylation the SKI complex (SKI2–SKI3–SKI8) can feed the 3\' end into the exosome, which degrades 3\'→5\'. DcpS clears the leftover cap fragment.'),
    ST(8000, cam(800, 460, 1000), 'P-bodies', 'P-bodies',
      'Niet-vertaalde mRNA\'s met decapping-factoren, XRN1 en miRNA-complexen klonteren samen in P-bodies (zonder membraan). Ze zijn niet strikt nodig voor afbraak.',
      'Untranslated mRNAs with decapping factors, XRN1 and miRNA complexes cluster in P-bodies (membraneless). They are not strictly required for decay.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="md-mrna"></g><g id="md-fac"></g><g id="md-mi"></g><g id="md-nmd"></g>
    ${hot('mrnaafbraak', T2('mRNA (atlas)', 'mRNA (atlas)'), C.rna, 'md-mA', '../atlas/index.html?id=mrna', true)}
    ${hot('rnai', T2('miRNA → CCR4–NOT', 'miRNA → CCR4–NOT'), '#e0679a', 'md-iA')}
    ${hot('nmd', T2('NMD: snelle route', 'NMD: fast route'), '#e0679a', 'md-nA')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const seg = (x0, x1, col, w = 12) => x1 - x0 < 1 ? '' : `<line x1="${f1(x0)}" y1="${Y}" x2="${f1(x1)}" y2="${Y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;

    function mrna({ capOn = 1, tail = X.pa[1], from = X.u5[0], to = 99999, op = 1, pab = 6, labels = 1 }) {
      let m = `<g opacity="${f1(op)}">`;
      const clip = (a, b) => [Math.max(a, from), Math.min(b, to)];
      const [a1, b1] = clip(X.u5[0], X.u5[1]), [a2, b2] = clip(X.orf[0], X.orf[1]), [a3, b3] = clip(X.u3[0], X.u3[1]);
      if (b1 > a1) m += seg(a1, b1, '#d9854a', 8);
      if (b2 > a2) m += seg(a2, b2, C.rna, 12);
      if (b3 > a3) m += seg(a3, b3, '#d9854a', 8);
      const ta = Math.max(X.pa[0], from), tb = Math.min(tail, to);
      if (tb > ta) m += `<line x1="${f1(ta)}" y1="${Y}" x2="${f1(tb)}" y2="${Y}" stroke="${C.cap}" stroke-width="7" stroke-dasharray="3 3"/>`;
      if (X.are > from && X.are < to) m += `<rect x="${X.are - 34}" y="${Y - 10}" width="68" height="20" rx="4" fill="#ffd36b" opacity=".85"/>`;
      if (labels) {
        if (b2 - a2 > 200) m += note((a2 + b2) / 2, Y + 76, T2('coderend deel (ORF)', 'coding region (ORF)'), C.rna, 19);
        if (b3 - a3 > 150) m += note(X.u3[0] + 60, Y + 46, "3'-UTR", '#d9854a', 19);
        if (tb - ta > 60) m += note((ta + tb) / 2, Y + 46, 'poly(A)', C.cap, 19);
      }
      for (let i = 0; i < pab; i++) if (PAB[i] < Math.min(tail, to) && PAB[i] > from) m += `<circle cx="${PAB[i]}" cy="${Y - 22}" r="14" fill="#3fb6c9" stroke="#0a1224" stroke-width="1.5"/>`;
      if (capOn > .01 && from <= X.u5[0] + 1) m += capG(X.cap, Y, 22, capOn);
      if (from <= X.u5[0] + 1) m += note(X.cap - 32, Y - 14, "5'", C.text, 19, 'end');
      if (to > tail - 2 || to > X.pa[0]) m += note(Math.min(tail, to) + 14, Y + 6, "3'", C.text, 19, 'start');
      return m + '</g>';
    }

    /* losse nucleotiden (NMP's) die achter een exonuclease achterblijven, tussen a en b */
    const debris = (a, b) => { let r = ''; for (let k = 0; k < 36; k++) { const x = 215 + k * 33, y = Y - 22 + (k * 29) % 46; if (x > a && x < b) r += `<circle cx="${f1(x)}" cy="${y}" r="5" fill="${k % 3 === 1 ? '#d9854a' : C.rna}" opacity=".8"/>`; } return r; };

    return {
      update(t, s) {
        const { step, p } = s;
        let m = '', fa = '';
        // staartlengte en PABPC1-aantal
        const dead = step < 2 ? 0 : step === 2 ? ease(sub(p, .15, .9)) : 1;
        const tail = lerp(X.pa[1], X.pa[0] + 26, dead);
        const npab = Math.round(6 * (1 - dead));
        const loopOp = step <= 1 ? 1 : step === 2 ? 1 - sub(p, .3, .6) : 0;
        const riboOp = step <= 1 ? 1 : step === 2 ? 1 - sub(p, .3, .7) : 0;

        if (step <= 3) {
          const capOn = step < 3 ? 1 : 1 - sub(p, .55, .65);
          m += mrna({ capOn, tail, pab: npab });
          if (step === 3) {
            const fly = sub(p, .6, 1);
            m += `<g opacity="${f1(1 - sub(p, .85, 1))}" transform="translate(${f1(-60 * fly)} ${f1(-120 * fly)})">${capG(X.cap, Y, 22, sub(p, .55, .6))}</g>`;
            m += note(X.cap - 60, Y - 160, 'm⁷GDP', C.cap, 19, 'middle', sub(p, .7, .85) * (1 - sub(p, .88, .95)));
            m += note(X.cap + 16, Y - 26, "5'-p", '#ffd36b', 19, 'middle', sub(p, .7, .85));
          }
        } else if (step === 4) {
          const x = lerp(X.u5[0], X.pa[0] + 26, ease(sub(p, .1, .95)));
          m += mrna({ capOn: 0, tail, pab: 0, from: x, labels: p < .5 });
          fa += debris(X.u5[0], x - 80) + prot(x - 30, Y, 78, 45, 'XRN1', '#8a5a3a', 1, 19);
          fa += `<g opacity="${f1(1 - sub(p, .9, 1))}">` + arrow(x + 10, Y - 60, x + 110, Y - 60, '#e0b089', 3) + `</g>` + note(x + 60, Y - 72, "5' → 3'", '#e0b089', 19, 'middle', 1 - sub(p, .9, 1));
          fa += note(Math.min(x - 90, 800), Y + 110, T2('losse nucleotiden (NMP)', 'free nucleotides (NMPs)'), C.muted, 19, 'middle', sub(p, .2, .35));
        } else if (step === 5) {
          const x = lerp(X.pa[0] + 26, X.u5[0] + 8, ease(sub(p, .15, .85)));
          m += mrna({ capOn: 1, tail: X.pa[0] + 26, pab: 0, to: x, labels: p < .5 });          // hetzelfde gedeadenyleerde mRNA, nu vanaf het 3'-uiteinde
          const eo = sub(p, 0, .06);
          fa += debris(x + 160, X.pa[0] + 40) + note(Math.max(x + 250, 800), Y + 110, T2('losse nucleotiden (NMP)', 'free nucleotides (NMPs)'), C.muted, 19, 'middle', sub(p, .3, .45));
          fa += `<g opacity="${f1(eo)}"><path d="M${f1(x + 10)},${Y - 42} h116 a18,18 0 0 1 18,18 v48 a18,18 0 0 1 -18,18 h-116 z" fill="#8a5a3a" fill-opacity=".85" stroke="#0a1224" stroke-width="1.5"/>` +
            `<text x="${f1(x + 76)}" y="${Y + 7}" font-size="20" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">${T2('exosoom', 'exosome')}</text></g>`;
          fa += prot(x + 64, Y - 70, 139, 36, 'SKI2·3·8', '#6b4a33', eo * (1 - sub(p, .76, .84)), 19);
          fa += note(x + 64, Y + 70, "3' → 5'", '#e0b089', 19, 'middle', sub(p, .04, .12) * (1 - sub(p, .8, .87)));
          if (p > .8) {
            fa += prot(X.cap + 30, Y - 64, 81, 36, 'DcpS', '#8a5a3a', sub(p, .8, .88), 19);
            fa += note(X.cap + 30, Y + 60, 'm⁷GpppN → m⁷GMP', C.cap, 19, 'middle', sub(p, .85, .95));
          }
        } else {
          // P-bodies: een paar niet-vertaalde mRNA's in een druppel
          fa += `<g><ellipse cx="800" cy="450" rx="${f1(250 + 8 * Math.sin(t / 900))}" ry="170" fill="rgba(224,103,154,.12)" stroke="#e0679a" stroke-width="3" stroke-dasharray="10 7"/>`;
          const cur = (cx, cy, r0) => `<path d="M${cx - 110},${cy} C${cx - 60},${cy - 40 * r0} ${cx},${cy + 40 * r0} ${cx + 100},${cy - 10}" stroke="${C.rna}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
          fa += cur(760, 390, 1) + cur(830, 480, -1) + cur(740, 540, .6);
          const pk = i => ease(sub(p, .04 + i * .07, .14 + i * .07));          // factoren komen er één voor één bij
          fa += prot(900, 370, 95, 34, 'DCP2', '#8a5a3a', pk(0), 19) + prot(640, 460, 87, 34, 'XRN1', '#8a5a3a', pk(1), 19) + prot(940, 540, 103, 34, 'LSm1–7', '#6b4a33', pk(2), 19) + prot(700, 330, 95, 34, 'DDX6', '#6b4a33', pk(3), 19) + prot(860, 600, 81, 34, 'AGO2', '#b44f7c', pk(4), 19);
          fa += note(800, 250, 'P-body', '#ff9ec3', 24) + '</g>';
        }

        // translatiemachine: eIF4E/4G, ribosomen, gesloten lus
        if (step <= 3) {
          fa += prot(X.cap + 4, Y - 44, 84, 34, 'eIF4E', '#3fb6c9', step < 3 ? 1 : 0, 19);
          fa += prot(X.cap + 90, Y - 84, 89, 34, 'eIF4G', '#3fb6c9', loopOp, 19);
          fa += `<path d="M${X.cap + 125},${Y - 84} C${X.cap + 400},${Y - 300} ${PAB[2]},${Y - 280} ${PAB[2]},${Y - 40}" stroke="#7fe0ef" stroke-width="3" fill="none" stroke-dasharray="7 6" opacity="${f1(loopOp)}"/>`;
          fa += note(800, Y - 250, T2('gesloten lus (eIF4G–PABPC1)', 'closed loop (eIF4G–PABPC1)'), '#7fe0ef', 19, 'middle', step === 0 ? 1 : loopOp * (step === 1 ? 0 : 1));
          fa += note(PAB[2] + 20, Y - 58, 'PABPC1', '#7fe0ef', 19, 'start', step === 0 ? sub(p, .2, .4) : 0);
          for (const rx of [400, 580, 760]) fa += ribo(rx, Y + 2, .85, riboOp);
        }
        if (step === 1) {
          const k = ease(sub(p, .1, .4));
          fa += `<g opacity="${f1(k)}">` + ntRow(X.are - 60, Y - 150, 'AUUUA', 30, 32) + `<path d="M${X.are - 75},${Y - 112} L${X.are - 34},${Y - 12} M${X.are + 75},${Y - 112} L${X.are + 34},${Y - 12}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="4 4"/></g>`;
          fa += note(X.are, Y - 170, T2('AU-rijk element (ARE)', 'AU-rich element (ARE)'), '#ffd36b', 19, 'middle', k);
          fa += prot(X.are, Y + 48, 76, 36, 'TTP', '#8a5a3a', sub(p, .45, .6), 19);
          fa += prot(X.are + 110, Y + 90, 139, 36, 'CCR4–NOT', '#8a5a3a', sub(p, .65, .8), 19);
        }
        if (step === 2) {
          const ph = p < .45;
          fa += prot(tail + 34, Y - 40, ph ? 110 : 110, 30, ph ? 'PAN2–PAN3' : 'CCR4–NOT', '#8a5a3a', sub(p, 0, .1), 19);
          fa += note(tail + 34, Y + 44, 'A A A …', C.cap, 19, 'middle', 1 - sub(p, .8, .9));
          for (let i = 0; i < 6; i++) { const drop = clamp((PAB[i] - tail) / 50); if (drop > 0 && drop < 1) fa += `<circle cx="${PAB[i] + 20 * drop}" cy="${f1(Y - 22 - 120 * drop)}" r="14" fill="#3fb6c9" opacity="${f1(1 - drop)}"/>`; }
          fa += note(900, Y - 160, T2('translatie stopt', 'translation stops'), '#ffd36b', 19, 'middle', sub(p, .5, .7));
        }
        if (step === 3) {
          const k = ease(sub(p, 0, .3));
          fa += prot(X.pa[0] + 20, Y + 44, 149, 36, 'LSm1–7·PAT1', '#6b4a33', k, 19);
          fa += `<path d="M${X.pa[0] - 40},${Y + 44} C${X.pa[0] - 400},${Y + 180} ${X.cap + 200},${Y + 160} ${X.cap + 60},${Y + 60}" stroke="#e0b089" stroke-width="3" fill="none" stroke-dasharray="7 6" opacity="${f1(sub(p, .2, .35))}"/>`;
          fa += prot(X.cap + 70, Y + 48, 81, 36, 'DCP2', '#8a5a3a', sub(p, .3, .45), 19) + prot(X.cap + 150, Y + 80, 87, 34, 'DCP1', '#6b4a33', sub(p, .3, .45), 19);
        }
        $('md-mrna').innerHTML = m;
        $('md-fac').innerHTML = fa;
        setHot(svg, 'md-mA', step === 0 ? [575, Y + 70, 200, 26] : null);
        // hotspots naar miRNA en NMD
        $('md-mi').innerHTML = step === 2 ? prot(1260, Y + 110, 160, 36, 'miRNA·AGO2', '#e0679a', sub(p, .5, .7), 19) : '';
        setHot(svg, 'md-iA', step === 2 && p > .6 ? [1260, Y + 110, 118, 30] : step === 6 && p > .3 ? [860, 600, 60, 28] : null);
        $('md-nmd').innerHTML = step === 4 ? prot(1250, 250, 204, 36, T2('NMD (SMG6-knip)', 'NMD (SMG6 cut)'), '#e0679a', sub(p, .3, .5), 19) : '';
        setHot(svg, 'md-nA', step === 4 && p > .4 ? [1250, 250, 150, 30] : null);
      },
    };
  },
};
