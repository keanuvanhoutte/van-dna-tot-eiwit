import { C, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, capG, ribo, note, arrow, ntRow, hot, setHot, exosoom } from './_rna.js';
import { eiwitPad } from '../../bio.js';

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
  legend: [[C.rna, 'mRNA'], [C.cap, { nl: 'm⁷G-cap / poly(A)', en: 'm⁷G cap / poly(A)' }], ['#6f5bd6', { nl: 'translatiefactoren, PABPC1', en: 'translation factors, PABPC1' }], ['#8a5a3a', { nl: 'nucleasen & afbraakfactoren', en: 'nucleases & decay factors' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Naast transcriptie bepaalt ook afbraak hoeveel er van een mRNA is (halfwaardetijd van minuten tot vele uren): kortlevende mRNA\'s (met AU-rijke elementen, bv. voor cytokines) laten de cel snel reageren. Gespecialiseerde routes: <b>NMD</b> (vroegtijdig stopcodon) en <b>miRNA\'s</b> (via CCR4–NOT).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Besides transcription, decay also sets how much of an mRNA there is (half-life from minutes to many hours): short-lived mRNAs (with AU-rich elements, e.g. for cytokines) let the cell respond quickly. Specialised routes: <b>NMD</b> (premature stop codon) and <b>miRNAs</b> (via CCR4–NOT).</p>' },
  simplified: {
    nl: 'Niet op schaal; de poly(A)-staart (≈ 250 nt bij de start) en het aantal PABPC1-kopieën zijn ingekort. Deadenylatie gebeurt in twee fasen (eerst PAN2–PAN3, dan CCR4–NOT) maar is hier één vloeiende inkorting. De decapping-activatoren (DCP1, EDC3/4, DDX6 …) zijn samengevat. Endonucleolytische routes (bv. via SMG6) zijn weggelaten.',
    en: 'Not to scale; the poly(A) tail (≈ 250 nt at the start) and the number of PABPC1 copies are shortened. Deadenylation occurs in two phases (first PAN2–PAN3, then CCR4–NOT) but is shown here as one smooth shortening. The decapping activators (DCP1, EDC3/4, DDX6 …) are summarised. Endonucleolytic routes (e.g. via SMG6) are omitted.' },
  steps: [
    ST(7500, cam(800, 440, 1450), "Een mRNA in gebruik", "An mRNA in use",
      "Een mRNA in gebruik vormt een lus: eiwitten verbinden kapje en staart. Zo zijn beide uiteinden beschermd.",
      "An mRNA in use forms a loop: proteins link the cap and the tail. This protects both ends."),
    ST(7500, cam(1060, 460, 760), "Een signaal voor een kort leven", "A signal for a short life",
      "Een stukje vol A’s en U’s achteraan het mRNA trekt afbraakeiwitten aan. Zo leven sommige mRNA’s maar kort.",
      "A stretch full of A’s and U’s near the end of the mRNA attracts breakdown proteins. So some mRNAs live only briefly."),
    ST(8500, cam(1020, 450, 1070), "De staart wordt korter", "The tail gets shorter",
      "Enzymen knabbelen de staart van A’s af en de lus valt open. Meestal bepaalt dit hoe snel het mRNA verdwijnt.",
      "Enzymes nibble away the tail of A’s and the loop opens. This usually sets how fast the mRNA disappears."),
    ST(8000, cam(720, 450, 1350), "Het kapje gaat eraf", "The cap comes off",
      "Is de staart kort, dan knipt een enzym het kapje eraf. Het begin van het mRNA ligt nu onbeschermd.",
      "Once the tail is short, an enzyme clips off the cap. The start of the mRNA is now unprotected."),
    ST(8000, cam(760, 450, 1350), "Afbraak vanaf het begin", "Breakdown from the start",
      "Een enzym breekt het mRNA af vanaf dat onbeschermde begin, bouwsteen per bouwsteen. Dit is de hoofdroute.",
      "An enzyme breaks down the mRNA from that unprotected start, one building block at a time. This is the main route."),
    ST(8500, cam(760, 450, 1350), "Of: afbraak vanaf het einde", "Or: breakdown from the end",
      "Of een afbraakcomplex (het exosoom) breekt het mRNA af vanaf het andere uiteinde.",
      "Or a breakdown complex (the exosome) breaks down the mRNA from the other end."),
    ST(8000, cam(800, 460, 1000), "Druppels met afbraakeiwitten", "Droplets with breakdown proteins",
      "Ongebruikte mRNA’s klonteren met afbraakeiwitten samen in P-bodies. Daar worden ze vooral bewaard, niet meteen afgebroken.",
      "Unused mRNAs cluster with breakdown proteins in P-bodies. There they are mainly stored, not broken down right away."),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="mrnaafbraak" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-nolabel><g id="md-mrna"></g></g><g data-node="initiatie" data-color="#6f5bd6" data-nolabel><g id="md-tli"></g></g><g data-node="ribosoom" data-color="${C.rrna}" data-nolabel><g id="md-rib"></g></g><g id="md-fac"></g><g data-node="rnai" data-color="#e0679a" data-nolabel><g id="md-mi"></g></g><g data-node="nmd" data-color="#e0679a" data-nolabel><g id="md-nmd"></g></g>
    ${hot('mrnaafbraak', T2('mRNA in 3D', 'mRNA in 3D'), C.rna, 'md-mA', '../atlas/index.html?id=mrna', true)}
    ${hot('rnai', T2('miRNA → CCR4–NOT', 'miRNA → CCR4–NOT'), '#e0679a', 'md-iA')}
    ${hot('nmd', T2('NMD: snelle route', 'NMD: fast route'), '#e0679a', 'md-nA')}
    ${hot('korrels', T2('Druppels bij stress →', 'Droplets under stress →'), '#5fd3e6', 'md-kA')}
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
      if (tb > ta) {
        m += `<line x1="${f1(ta)}" y1="${Y}" x2="${f1(tb)}" y2="${Y}" stroke="${C.cap}" stroke-width="16" stroke-linecap="round" opacity=".35"/>`;
        for (let xa = X.pa[0] + 9; xa < tb - 4; xa += 17) if (xa > ta) m += `<text x="${f1(xa)}" y="${Y + 5}" font-size="13" text-anchor="middle" fill="${C.cap}" font-family="JetBrains Mono" font-weight="700">A</text>`;
      }
      if (X.are > from && X.are < to) m += `<rect x="${X.are - 34}" y="${Y - 10}" width="68" height="20" rx="4" fill="#ffd36b" opacity=".85"/>`;
      if (labels) {
        if (b2 - a2 > 200) m += note(Math.min((a2 + b2) / 2 + 80, b2 - 120), Y + 76, T2('coderend deel (ORF)', 'coding region (ORF)'), C.rna, 19);
        if (b3 - a3 > 150) m += note(X.u3[0] + 60, Y + 46, "3′-UTR", '#d9854a', 19);
        if (tb - ta > 60) m += note((ta + tb) / 2, Y + 46, 'poly(A)', C.cap, 19);
      }
      for (let i = 0; i < pab; i++) if (PAB[i] < Math.min(tail, to) && PAB[i] > from) m += `<path d="${eiwitPad(PAB[i], Y - 22, 15, 13, 50 + i, .1)}" fill="#6f5bd6" stroke="#0a1224" stroke-width="1.5"/>`;
      if (capOn > .01 && from <= X.u5[0] + 1) m += capG(X.cap, Y, 22, capOn);
      if (from <= X.u5[0] + 1) m += note(X.cap - 32, Y - 14, "5′", C.text, 19, 'end');
      if (to > tail - 2 || to > X.pa[0]) m += note(Math.min(tail, to) + 14, Y + 6, "3′", C.text, 19, 'start');
      return m + '</g>';
    }

    /* losse nucleotiden (NMP's) die achter een exonuclease achterblijven, tussen a en b */
    const debris = (a, b) => { let r = ''; for (let k = 0; k < 36; k++) { const x = 215 + k * 33, y = Y - 22 + (k * 29) % 46; if (x > a && x < b) r += `<circle cx="${f1(x)}" cy="${y}" r="5" fill="${k % 3 === 1 ? '#d9854a' : C.rna}" opacity=".8"/>`; } return r; };

    return {
      update(t, s) {
        const { step, p } = s;
        let m = '', fa = '', tli = '', rib = '';
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
            m += note(X.cap - 60, Y - 160, T2('kapje', 'cap'), C.cap, 20, 'middle', sub(p, .7, .85) * (1 - sub(p, .88, .95)));
            m += note(X.cap + 20, Y - 30, T2('onbeschermd begin', 'unprotected start'), '#ffd36b', 20, 'start', sub(p, .7, .85));
          }
        } else if (step === 4) {
          const x = lerp(X.u5[0], X.pa[0] + 26, ease(sub(p, .1, .95)));
          m += mrna({ capOn: 0, tail, pab: 0, from: x, labels: p < .5 });
          fa += debris(X.u5[0], x - 80) + prot(x - 30, Y, 78, 45, 'XRN1', '#8a5a3a', 1, 19);
          fa += note(x - 30, Y - 44, T2('afbraakenzym', 'breakdown enzyme'), '#e0b089', 21, 'middle', sub(p, 0, .1));
          fa += `<g opacity="${f1(1 - sub(p, .9, 1))}">` + arrow(x + 30, Y - 90, x + 130, Y - 90, '#e0b089', 3) + `</g>` + note(x + 80, Y - 102, T2('eet van 5′ naar 3′', 'eats from 5′ to 3′'), '#e0b089', 19, 'middle', 1 - sub(p, .9, 1));
          fa += note(Math.min(x - 90, 800), Y + 110, T2('losse bouwstenen (nucleotiden)', 'loose building blocks (nucleotides)'), C.muted, 19, 'middle', sub(p, .2, .35));
        } else if (step === 5) {
          const x = lerp(X.pa[0] + 26, X.u5[0] + 8, ease(sub(p, .15, .85)));
          m += mrna({ capOn: 1, tail: X.pa[0] + 26, pab: 0, to: x, labels: p < .5 });          // hetzelfde gedeadenyleerde mRNA, nu vanaf het 3'-uiteinde
          const eo = sub(p, 0, .06);
          fa += debris(x + 160, X.pa[0] + 40) + note(Math.max(x + 300, 800), Y + 146, T2('losse bouwstenen (nucleotiden)', 'loose building blocks (nucleotides)'), C.muted, 19, 'middle', sub(p, .3, .45));
          fa += exosoom(x + 76, Y, 72, 40, eo, '');   // ringvormig exosoom; het 3'-uiteinde loopt door het kanaal
          fa += note(x + 76, Y + 98, T2('afbraakring (exosoom)', 'breakdown ring (exosome)'), '#e0b089', 21, 'middle', eo);
          fa += prot(x + 64, Y - 70, 139, 36, T2('SKI-complex', 'SKI complex'), '#6b4a33', eo * (1 - sub(p, .76, .84)), 19);
          fa += note(x + 64, Y + 70, "3′ → 5′", '#e0b089', 19, 'middle', sub(p, .04, .12) * (1 - sub(p, .8, .87)));
          if (p > .8) {
            fa += prot(X.cap + 30, Y - 64, 81, 36, 'DcpS', '#8a5a3a', sub(p, .8, .88), 19);
            fa += note(X.cap + 30, Y - 104, T2('ruimt het kapje op', 'clears the cap'), C.cap, 19, 'middle', sub(p, .85, .95));
          }
        } else {
          // P-bodies: een paar niet-vertaalde mRNA's in een druppel
          fa += `<g><ellipse cx="800" cy="450" rx="${f1(250 + 8 * Math.sin(t / 900))}" ry="170" fill="rgba(224,103,154,.12)" stroke="#e0679a" stroke-width="3" stroke-dasharray="10 7"/>`;
          const cur = (cx, cy, r0) => `<path d="M${cx - 110},${cy} C${cx - 60},${cy - 40 * r0} ${cx},${cy + 40 * r0} ${cx + 100},${cy - 10}" stroke="${C.rna}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
          fa += cur(760, 390, 1) + cur(830, 480, -1) + cur(740, 540, .6);
          const pk = i => ease(sub(p, .04 + i * .07, .14 + i * .07));          // factoren komen er één voor één bij
          fa += prot(900, 370, 95, 34, 'DCP2', '#8a5a3a', pk(0), 19) + prot(640, 460, 87, 34, 'XRN1', '#8a5a3a', pk(1), 19) + prot(940, 540, 103, 34, 'LSm1–7', '#6b4a33', pk(2), 19) + prot(700, 330, 95, 34, 'DDX6', '#6b4a33', pk(3), 19) + prot(905, 445, 81, 34, 'AGO2', '#b44f7c', pk(4), 19);
          fa += note(800, 250, 'P-body', '#ff9ec3', 24) + '</g>';
        }

        // translatiemachine: eIF4E/4G, ribosomen, gesloten lus
        if (step <= 3) {
          tli += prot(X.cap + 4, Y - 44, 84, 34, 'eIF4E', '#6f5bd6', step < 3 ? 1 : 0, 19);
          tli += prot(X.cap + 90, Y - 84, 89, 34, 'eIF4G', '#6f5bd6', loopOp, 19);
          tli += `<path d="M${X.cap + 125},${Y - 84} C${X.cap + 400},${Y - 300} ${PAB[2]},${Y - 280} ${PAB[2]},${Y - 40}" stroke="#b9a6ff" stroke-width="3" fill="none" stroke-dasharray="7 6" opacity="${f1(loopOp)}"/>`;
          tli += note(800, Y - 250, T2('gesloten lus (eIF4G–PABPC1)', 'closed loop (eIF4G–PABPC1)'), '#b9a6ff', 19, 'middle', step === 0 ? 1 : loopOp * (step === 1 ? 0 : 1));
          tli += note(PAB[2] + 20, Y - 58, 'PABPC1', '#b9a6ff', 19, 'start', step === 0 ? sub(p, .2, .4) : 0);
          for (const rx of [400, 580, 760]) rib += ribo(rx, Y, .85, riboOp, '', { keten: (rx - 300) * .25 });   // polysoom: verder op het mRNA = langere keten
        }
        if (step === 1) {
          const k = ease(sub(p, .1, .4));
          fa += `<g opacity="${f1(k)}">` + ntRow(X.are - 60, Y - 150, 'AUUUA', 30, 32) + `<path d="M${X.are - 75},${Y - 112} L${X.are - 34},${Y - 12} M${X.are + 75},${Y - 112} L${X.are + 34},${Y - 12}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="4 4"/></g>`;
          fa += note(X.are, Y - 170, T2('AU-rijk element (ARE)', 'AU-rich element (ARE)'), '#ffd36b', 19, 'middle', k);
          fa += prot(X.are, Y + 22, 76, 36, 'TTP', '#8a5a3a', sub(p, .45, .6), 19);   // TTP zit op het ARE en trekt CCR4–NOT aan
          fa += prot(X.are + 84, Y + 56, 139, 36, 'CCR4–NOT', '#8a5a3a', sub(p, .65, .8), 19);
        }
        if (step === 2) {
          const ph = p < .45;
          fa += prot(tail + 34, Y - 44, 110, 30, ph ? 'PAN2–PAN3' : 'CCR4–NOT', '#8a5a3a', sub(p, 0, .1), 17);
          const nA = Math.round(lerp(250, 15, dead));   // ≈ 250 A's bij de start, ingekort tot een korte rest (zie 'simplified')
          fa += note(tail + 30, Y - 120, T2(`staart: ${nA} A’s`, `tail: ${nA} A’s`), C.cap, 22, 'middle', sub(p, 0, .1));
          fa += note(tail + 34, Y - 82, T2('knabbelt de staart af', 'nibbles the tail away'), '#e0b089', 19, 'middle', sub(p, .05, .15));
          for (let i = 0; i < 6; i++) { const drop = clamp((PAB[i] - tail) / 50); if (drop > 0 && drop < 1) fa += `<path d="${eiwitPad(PAB[i] + 20 * drop, Y - 22 - 120 * drop, 15, 13, 50 + i, .1)}" fill="#6f5bd6" opacity="${f1((1 - drop) * (1 - sub(p, .85, .95)))}"/>`; }   // losgelaten PABPC1 drijft weg en blijft niet zweven
          fa += note(900, Y - 160, T2('translatie stopt', 'translation stops'), '#ffd36b', 19, 'middle', sub(p, .5, .7));
        }
        if (step === 3) {
          const k = ease(sub(p, 0, .3));
          fa += prot(X.pa[0] + 20, Y + 44, 149, 36, 'LSm1–7·PAT1', '#6b4a33', k, 15);
          fa += `<path d="M${X.pa[0] - 40},${Y + 44} C${X.pa[0] - 400},${Y + 180} ${X.cap + 200},${Y + 160} ${X.cap + 60},${Y + 60}" stroke="#e0b089" stroke-width="3" fill="none" stroke-dasharray="7 6" opacity="${f1(sub(p, .2, .35))}"/>`;
          fa += prot(X.cap + 70, Y + 48, 81, 36, 'DCP2', '#8a5a3a', sub(p, .3, .45), 19);
          fa += note(X.cap - 50, Y + 104, T2('kapje-knipper', 'cap cutter'), '#e0b089', 21, 'middle', sub(p, .3, .45));
        }
        $('md-mrna').innerHTML = m;
        $('md-tli').innerHTML = tli; $('md-rib').innerHTML = rib; $('md-fac').innerHTML = fa;
        setHot(svg, 'md-mA', step === 0 ? [575, Y + 70, 200, 26] : null);
        // hotspots naar miRNA en NMD
        $('md-mi').innerHTML = step === 2 ? prot(1260, Y + 110, 160, 36, 'miRNA·AGO2', '#9b7bff', sub(p, .5, .7), 19) : '';
        setHot(svg, 'md-iA', step === 2 && p > .6 ? [1260, Y + 110, 118, 30] : step === 6 && p > .3 ? [905, 445, 60, 28] : null);
        $('md-nmd').innerHTML = '';   // geen losse NMD-pil in de figuur; de link naar NMD blijft als klikbaar label
        setHot(svg, 'md-nA', step === 4 && p > .4 ? [1250, 250, 150, 30] : null);
        setHot(svg, 'md-kA', step === 6 && p > .5 ? [800, 242, 110, 30] : null);   // zijpad RNA-lot: P-body → druppels bij stress
      },
    };
  },
};
