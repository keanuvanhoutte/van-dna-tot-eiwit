import { C, L, T2, svgOpen, txt, pill, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, PRIMER, seg, pth, endl, prot, tag, arrow } from './_draw.js';

/*
 * Overzicht van DNA-replicatie in een stuk van een menselijk chromosoom.
 * Bovenste ouderstreng 5'→3' (links→rechts), onderste 3'→5'.
 * Per replicatiebel: bovenaan links van de origin continu (leidend voor de linkervork), rechts fragmenten;
 * onderaan rechts continu (leidend voor de rechtervork), links fragmenten. CMG zit op de leidende-streng-matrijs.
 */
const CY = 470, G = 16, H = 48, X0 = 60, X1 = 1540, RAMP = 34, LAGGAP = 46, PER = 72;
const O = [330, 800, 1270];
const FIRE = [3.0, 0.6, 3.8];          // vuurtijdstip per origin (in "τ"), O2 vuurt eerst
const R = 80;                          // vorksnelheid in px per τ
const TAU = [[0, 0], [0, 0], [0, 1.3], [1.3, 3], [3, 5], [5, 8], [8, 8]];   // τ-bereik per stap

function forks(tau) {
  // halve breedte per origin, begrensd door de buren (vorken die elkaar ontmoeten stoppen daar)
  const w = O.map((o, i) => Math.max(0, R * (tau - FIRE[i])));
  const b = O.map((o, i) => ({ o, on: tau > FIRE[i], xl: o - w[i], xr: o + w[i], ml: false, mr: false }));
  for (let i = 0; i < 2; i++) {
    const a = b[i], c = b[i + 1];
    if (a.on && c.on && a.xr >= c.xl) {
      const m = a.o + (() => { // ontmoetingspunt: gelijke snelheid, verschillend starttijdstip
        const tm = (c.o - a.o + R * FIRE[i] + R * FIRE[i + 1]) / (2 * R);
        return R * (tm - FIRE[i]);
      })();
      a.xr = m; c.xl = m; a.mr = true; c.ml = true;
    }
  }
  for (const x of b) { if (x.xl <= X0) { x.xl = X0 - 40; x.ml = true; } if (x.xr >= X1) { x.xr = X1 + 40; x.mr = true; } }
  return b;
}
function sepAt(x, b) {
  let s = 0;
  for (const q of b) {
    if (!q.on || x < q.xl || x > q.xr) continue;
    const l = q.ml ? 1 : clamp((x - q.xl) / RAMP), r = q.mr ? 1 : clamp((q.xr - x) / RAMP);
    s = Math.max(s, Math.min(l, r));
  }
  return s;
}
const ys = s => { const e = s * s * (3 - 2 * s); return [CY - G / 2 - H * e, CY + G / 2 + H * e]; };

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'replicatie',
  title: { nl: 'DNA-replicatie', en: 'DNA replication' },
  scale: { nl: '≈ 100 kb van een chromosoom', en: '≈ 100 kb of a chromosome' },
  time: { nl: 'S-fase ≈ enkele uren; vork ≈ 1–3 kb/min', en: 'S phase ≈ several hours; fork ≈ 1–3 kb/min' },
  org: { nl: 'mens (Meselson–Stahl: E. coli)', en: 'human (Meselson–Stahl: E. coli)' },
  legend: [[C.dna, { nl: 'ouderstreng', en: 'parental strand' }], [C.dna2, { nl: 'ouderstreng (complementair)', en: 'parental strand (complementary)' }],
    [NEW, { nl: 'nieuw DNA', en: 'new DNA' }], [PRIMER, { nl: 'RNA-primer', en: 'RNA primer' }], [C.prot, { nl: 'eiwitten (ORC, MCM, CMG…)', en: 'proteins (ORC, MCM, CMG…)' }], [C.histone, { nl: 'nucleosomen', en: 'nucleosomes' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Klik op een replicatievork om in te zoomen op het replisoom.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Click a replication fork to zoom in on the replisome.</p>' },
  simplified: {
    nl: 'Niet op schaal: origins liggen in menselijke cellen ruwweg 30–300 kb uit elkaar en een Okazaki-fragment is ~200 nt, veel kleiner dan hier getekend. Het DNA is als ladder getekend, zonder helix, chromatine en supercoiling. De proef van Meselson & Stahl (1958) gebeurde met E. coli; het semi-conservatieve principe geldt voor alle cellen. Van het vuren van origins toont de animatie enkel DDK/CDK, Cdc45 en GINS (o.a. TopBP1, Treslin–MTBP, RecQL4, Mcm10 en Pol ε weggelaten).',
    en: 'Not to scale: in human cells origins are roughly 30–300 kb apart and an Okazaki fragment is ~200 nt, much smaller than drawn. The DNA is drawn as a ladder, without helix, chromatin or supercoiling. The Meselson & Stahl experiment (1958) was done with E. coli; the semi-conservative principle applies to all cells. For origin firing only DDK/CDK, Cdc45 and GINS are shown (e.g. TopBP1, Treslin–MTBP, RecQL4, Mcm10 and Pol ε are omitted).' },
  steps: [
    S(9000, cam(800, 440, 1500), 'Semi-conservatief', 'Semi-conservative',
      'Elke dochter-DNA-molecule bevat één oude en één nieuwe streng. Meselson en Stahl toonden dat in 1958 met zware (¹⁵N) en lichte (¹⁴N) stikstof.',
      'Each daughter DNA molecule contains one old and one new strand. Meselson and Stahl showed this in 1958 using heavy (¹⁵N) and light (¹⁴N) nitrogen.'),
    S(8000, cam(800, 440, 620), 'G1: origins krijgen een licentie', 'G1: origins are licensed',
      'ORC bindt de origin; met Cdc6 en Cdt1 worden twee MCM2-7-ringen als inactieve dubbelhexameer rond het dubbelstrengig DNA gelegd.',
      'ORC binds the origin; with Cdc6 and Cdt1, two MCM2-7 rings are loaded around the double-stranded DNA as an inactive double hexamer.'),
    S(9000, cam(800, 458, 640), 'S-fase: de origin vuurt', 'S phase: the origin fires',
      'De kinasen DDK en CDK laten Cdc45 en GINS binden: twee CMG-helicasen. Elk omsluit één streng; ze schuiven langs elkaar en lopen uit elkaar.',
      'The kinases DDK and CDK let Cdc45 and GINS bind: two CMG helicases. Each encircles one strand; they pass each other and move apart.'),
    S(9000, cam(800, 450, 820), 'Een replicatiebel met twee vorken', 'A replication bubble with two forks',
      'Replicatie is bidirectioneel. Aan elke vork wordt één streng continu (leidend) en de andere in Okazaki-fragmenten (volgend) gemaakt.',
      'Replication is bidirectional. At each fork one strand is made continuously (leading) and the other in Okazaki fragments (lagging).'),
    S(8000, FULL, 'Vele origins, vroeg en laat', 'Many origins, early and late',
      'Een menselijk chromosoom heeft vele origins (replicons) die op verschillende momenten van de S-fase vuren. Niet elke origin met licentie wordt gebruikt.',
      'A human chromosome has many origins (replicons) that fire at different times during S phase. Not every licensed origin is used.'),
    S(8000, FULL, 'Vorken ontmoeten elkaar', 'Forks converge',
      'Waar twee vorken samenkomen, stopt de replicatie (terminatie) en wordt CMG verwijderd. De laatste fragmenten worden aan elkaar geligeerd.',
      'Where two forks meet, replication stops (termination) and CMG is removed. The last fragments are ligated together.'),
    S(8000, cam(800, 480, 1560), 'Twee identieke zusterchromatiden', 'Two identical sister chromatids',
      'Resultaat: twee DNA-moleculen, elk half oud en half nieuw, samengehouden door cohesine. Oude en nieuwe histonen vormen meteen weer nucleosomen.',
      'Result: two DNA molecules, each half old and half new, held together by cohesin. Old and new histones immediately form nucleosomes again.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="rp-ms"></g>
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="rp-dna"></g></g>
    <g data-node="replisoom" data-color="${C.prot}" data-label="${T2('Replicatievork → replisoom', 'Replication fork → replisome')}">
      <g id="rp-forks"></g><circle id="rp-fanchor" data-anchor="replisoom" cx="-99" cy="-99" r="1" fill="none"/>
    </g>
    <g id="rp-prot"></g>
    <g data-node="nucleosoom" data-color="${C.histone}" data-label="${T2('Nucleosomen', 'Nucleosomes')}"><g id="rp-nuc"></g><circle id="rp-nanchor" data-anchor="nucleosoom" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="chromosoom" data-nolabel data-color="#ffc247"><g id="rp-coh"></g></g>
    <g id="rp-lbl"></g>
    <g data-node="chromosoom" data-nolabel data-color="${C.dna}" data-label="${T2('↑ Chromosoom', '↑ Chromosome')}">
      <rect x="60" y="786" width="340" height="52" rx="26" fill="rgba(79,143,247,.15)" stroke="${C.dna}" stroke-width="2"/>
      ${txt(230, 819, T2("↑ terug naar het chromosoom", "↑ back to the chromosome"), C.text, 21)}
    </g>
    <g data-node="telomeren" data-nolabel data-color="${C.dna2}" data-label="${T2('Chromosoomuiteinden: telomeren', 'Chromosome ends: telomeres')}">
      <rect x="1200" y="786" width="340" height="52" rx="26" fill="rgba(156,192,255,.12)" stroke="${C.dna2}" stroke-width="2"/>
      ${txt(1370, 819, T2("uiteinden → telomeren", "ends → telomeres"), C.text, 21)}
    </g>
    <g data-node="herstel" data-nolabel data-color="${C.ok}" data-label="${T2('Fouten & schade → herstel', 'Errors & damage → repair')}">
      <rect x="630" y="786" width="340" height="52" rx="26" fill="rgba(127,220,106,.12)" stroke="${C.ok}" stroke-width="2"/>
      ${txt(800, 819, T2("fouten → DNA-herstel", "errors → DNA repair"), C.text, 21)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- stap 0: Meselson–Stahl ---------- */
        const ms = step === 0 ? 1 : 0;
        let m = '';
        if (ms) {
          const k1 = ease(sub(p, .1, .45)), k2 = ease(sub(p, .45, .8));
          // oudermolecule
          m += tag(330, 150, T2('ouder', 'parent'), C.muted, 22);
          m += seg(130, 190, 530, 190, C.dna, 9) + seg(130, 218, 530, 218, C.dna2, 9);
          // strengen gaan uit elkaar en krijgen elk een nieuwe partner
          const yA = lerp(190, 330, k1), yB = lerp(218, 470, k1);
          m += `<g opacity="${f1(k1)}">` + seg(130, yA, 530, yA, C.dna, 9) + seg(130, yA + 28, 530, yA + 28, NEW, 9, k2) +
               seg(130, yB, 530, yB, NEW, 9, k2) + seg(130, yB + 28, 530, yB + 28, C.dna2, 9) + '</g>';
          m += arrow(330, 240, 330, 300, C.muted, 3, k1);
          m += tag(330, 565, T2('elke dochter: 1 oude + 1 nieuwe streng', 'each daughter: 1 old + 1 new strand'), C.text, 22, 'middle', k2);
          // dichtheidsgradiënt (CsCl)
          const tubes = [[820, T2('generatie 0', 'generation 0'), [['H', 1]]], [1000, T2('generatie 1', 'generation 1'), [['M', 1]]], [1180, T2('generatie 2', 'generation 2'), [['M', 1], ['L', 1]]]];
          const by = { H: 430, M: 360, L: 290 };
          m += tag(1000, 150, T2('CsCl-dichtheidsgradiënt', 'CsCl density gradient'), C.muted, 22);
          tubes.forEach(([x, lb, bands], i) => {
            const op = i === 0 ? 1 : i === 1 ? ease(sub(p, .3, .5)) : ease(sub(p, .6, .8));
            m += `<g opacity="${f1(op)}"><rect x="${x - 40}" y="190" width="80" height="300" rx="36" fill="rgba(147,160,187,.08)" stroke="${C.muted}" stroke-width="2"/>`;
            for (const [b] of bands) m += `<rect x="${x - 32}" y="${by[b] - 7}" width="64" height="14" rx="7" fill="${b === 'H' ? C.dna : b === 'M' ? '#8fb0e8' : NEW}"/>`;
            m += txt(x, 528, lb, C.text, 20) + '</g>';
          });
          m += txt(1240, 297, T2('licht ¹⁴N/¹⁴N', 'light ¹⁴N/¹⁴N'), NEW, 20, 'start') + txt(1240, 367, T2('hybride ¹⁵N/¹⁴N', 'hybrid ¹⁵N/¹⁴N'), '#8fb0e8', 20, 'start') + txt(1240, 437, T2('zwaar ¹⁵N/¹⁵N', 'heavy ¹⁵N/¹⁵N'), C.dna, 20, 'start');
          m += tag(1030, 610, T2('na 1 deling: alleen hybride DNA', 'after 1 division: only hybrid DNA'), C.text, 22, 'middle', ease(sub(p, .4, .6)));
        }
        $('rp-ms').innerHTML = m;

        /* ---------- stappen 1–6: stuk chromosoom ---------- */
        const on = step >= 1;
        const [ta, tb] = TAU[step];
        const tau = lerp(ta, tb, step === 2 ? sub(p, .4, 1) : step === 5 ? sub(p, 0, .8) : p);
        const b = forks(tau);
        let dna = '', fk = '';
        if (on) {
          // ouderstrengen
          const top = [], bot = [];
          for (let x = X0; x <= X1; x += 4) { const [a, c] = ys(sepAt(x, b)); top.push([x, a]); bot.push([x, c]); }
          // sporten in niet-gerepliceerd DNA
          for (let x = X0 + 6; x < X1; x += 14) {
            const sp = sepAt(x, b);
            if (sp < .02) dna += seg(x, CY - G / 2, x, CY + G / 2, '#3b4c70', 3);
          }
          dna += pth(top, C.dna, 6) + pth(bot, C.dna2, 6);
          const [yl0, yl1] = ys(sepAt(X0, b)), [yr0, yr1] = ys(sepAt(X1, b));
          dna += endl(X0 - 26, yl0 + 4, "5'", C.dna, 16) + endl(X1 + 26, yr0 + 4, "3'", C.dna, 16) +
                 endl(X0 - 26, yl1 + 8, "3'", C.dna2, 16) + endl(X1 + 26, yr1 + 8, "5'", C.dna2, 16);
          // nieuwe strengen per bel
          const ligAll = step >= 6 || (step === 5 && p > .8);
          const yTopNew = x => ys(sepAt(x, b))[0] + 14, yBotNew = x => ys(sepAt(x, b))[1] - 14;
          const line = (xa, xb, yf, col) => { const pts = []; for (let x = xa; x <= xb; x += 4) pts.push([x, yf(x)]); pts.push([xb, yf(xb)]); return pth(pts, col, 5); };
          for (const q of b) {
            if (!q.on) continue;
            const L0 = q.xl + (q.ml ? 0 : RAMP), R0 = q.xr - (q.mr ? 0 : RAMP);
            if (R0 - L0 < 4) continue;
            // boven: links van de origin continu (leidend), rechts fragmenten (5' rechts)
            const lx0 = Math.max(X0, L0), rx1 = Math.min(X1, R0);
            if (q.o > lx0) dna += line(lx0, Math.min(q.o, rx1), yTopNew, NEW);
            const topLagEnd = Math.min(X1, q.xr - (q.mr ? 0 : LAGGAP));
            for (let k = 0; ; k++) {
              const a = q.o + k * PER, e = a + PER - (ligAll ? 0 : 8);
              if (a >= topLagEnd) break;
              const ee = Math.min(e, topLagEnd);
              if (ee - a < 10) continue;
              const full = e <= topLagEnd || q.mr;
              dna += line(a, full ? ee : ee, yTopNew, NEW);
              if (!ligAll && full) dna += line(Math.max(a, ee - 10), ee, yTopNew, PRIMER);
            }
            // onder: rechts van de origin continu (leidend), links fragmenten (5' links)
            if (rx1 > q.o) dna += line(Math.max(q.o, lx0), rx1, yBotNew, NEW);
            const botLagEnd = Math.max(X0, q.xl + (q.ml ? 0 : LAGGAP));
            for (let k = 0; ; k++) {
              const e = q.o - k * PER, a = e - PER + (ligAll ? 0 : 8);
              if (e <= botLagEnd) break;
              const aa = Math.max(a, botLagEnd);
              if (e - aa < 10) continue;
              const full = a >= botLagEnd || q.ml;
              dna += line(aa, e, yBotNew, NEW);
              if (!ligAll && full) dna += line(aa, Math.min(e, aa + 10), yBotNew, PRIMER);
            }
          }
          // vorken: CMG op de leidende-streng-matrijs
          let first = null;
          b.forEach((q, i) => {
            if (!q.on || tau - FIRE[i] < .4) return;
            if (!q.mr && q.xr < X1) { const y = ys(sepAt(q.xr - 12, b))[1]; fk += `<ellipse cx="${f1(q.xr - 10)}" cy="${f1(y)}" rx="13" ry="21" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3" transform="rotate(-30 ${f1(q.xr - 10)} ${f1(y)})"/>`; first ??= [q.xr - 10, y - 60]; }
            if (!q.ml && q.xl > X0) { const y = ys(sepAt(q.xl + 12, b))[0]; fk += `<ellipse cx="${f1(q.xl + 10)}" cy="${f1(y)}" rx="13" ry="21" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3" transform="rotate(-30 ${f1(q.xl + 10)} ${f1(y)})"/>`; }
          });
          const an = $('rp-fanchor');
          if (first && step >= 3 && step <= 4) { an.setAttribute('cx', f1(first[0] + 90)); an.setAttribute('cy', f1(CY - 22)); } else { an.setAttribute('cx', -99); an.setAttribute('cy', -99); }
          if (step === 3) {
            const q = b[1];
            fk += tag(q.o, CY - 118, T2('origin', 'origin'), C.muted, 17) + seg(q.o, CY - 108, q.o, CY - 70, C.muted, 2);
            fk += arrow(q.o + 150, CY - 150, q.o + 280, CY - 150, C.text, 3.5, sub(p, .2, .4)) + arrow(q.o - 150, CY - 150, q.o - 280, CY - 150, C.text, 3.5, sub(p, .2, .4));
            fk += tag(q.o, CY - 155, T2('twee vorken', 'two forks'), C.text, 18, 'middle', sub(p, .2, .4));
            fk += tag(q.o - 150, CY + 110, T2('leidend ↓ · volgend ↑', 'leading ↓ · lagging ↑'), C.muted, 16, 'middle', 0);
            fk += tag(q.o + 150, CY - 92, T2('Okazaki-fragmenten', 'Okazaki fragments'), NEW, 16, 'middle', sub(p, .5, .7));
            fk += tag(q.o - 150, CY - 92, T2('leidende streng', 'leading strand'), NEW, 16, 'middle', sub(p, .5, .7));
            fk += tag(q.o + 170, CY + 92, T2('leidende streng', 'leading strand'), NEW, 16, 'middle', sub(p, .5, .7));
            fk += tag(q.o - 170, CY + 92, T2('Okazaki-fragmenten', 'Okazaki fragments'), NEW, 16, 'middle', sub(p, .5, .7));
          }
        }
        $('rp-dna').innerHTML = dna;
        $('rp-forks').innerHTML = fk;

        /* ---------- eiwitten van licentie en vuren ---------- */
        let pr = '';
        if (step >= 1 && step <= 4) {
          O.forEach((o, i) => {
            const main = i === 1;
            const lic = step === 1 ? (main ? 1 : 1) : 1;
            const kO = step === 1 && main ? ease(sub(p, .05, .22)) : 1;
            const kC6 = step === 1 && main ? ease(sub(p, .2, .38)) : 1;
            const kM1 = step === 1 && main ? ease(sub(p, .38, .62)) : 1;
            const kM2 = step === 1 && main ? ease(sub(p, .6, .85)) : 1;
            const fired = tau > FIRE[i];
            const k = fired ? clamp((tau - FIRE[i]) / .4) : 0;           // 0→1: dubbelhexameer → twee CMG's aan de vorken
            const q = b[i];
            // ORC/Cdc6/Cdt1 verdwijnen na licentie
            const preOp = step === 1 ? 1 - (main ? sub(p, .86, 1) * .75 : .75) : fired ? 0 : !main && step === 3 ? .25 * (1 - sub(p, 0, .2)) : !main && step === 4 ? .25 * sub(p, 0, .2) : .25;   // in de ingezoomde bel (stap 3) geen half afgesneden labels van de buren
            pr += pill(o - 70, CY - 44, 62, 28, 'ORC', C.prot3, kO * preOp * lic, 15);
            pr += pill(o - 70, CY - 78, 66, 26, 'Cdc6', C.prot2, kC6 * preOp, 14);
            pr += pill(o + 78, CY - 60, 66, 26, 'Cdt1', C.prot2, (step === 1 && main ? sub(p, .35, .45) * (1 - sub(p, .8, .95)) : 0), 14);
            // MCM-hexameren
            const hex = (x, y, col, op, lbl) => op <= .01 ? '' : `<g opacity="${f1(op)}"><rect x="${f1(x - 19)}" y="${f1(y - 32)}" width="38" height="64" rx="12" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="3"/>${lbl ? txt(x, y + 5, lbl, '#fff', 12) : ''}</g>`;
            if (!fired || k < 1) {
              const xa = lerp(o - 20, q.xr - 10, k), ya = lerp(CY, ys(sepAt(q.xr - 12, b))[1], k);
              const xb = lerp(o + 20, q.xl + 10, k), yb = lerp(CY, ys(sepAt(q.xl + 12, b))[0], k);
              pr += hex(xa, ya, C.prot, kM1, 'MCM') + hex(xb, yb, C.prot, kM2, 'MCM');
              // Cdc45 + GINS
              const kg = step === 2 && main ? ease(sub(p, .2, .42)) : fired ? 1 : 0;
              if (kg > .01) {
                pr += pill(xa, ya + 46, 58, 22, 'Cdc45', '#b07cf0', kg, 12) + pill(xa, ya + 70, 52, 22, 'GINS', '#8a6cf0', kg, 12);
                pr += pill(xb, yb - 46, 58, 22, 'Cdc45', '#b07cf0', kg, 12) + pill(xb, yb - 70, 52, 22, 'GINS', '#8a6cf0', kg, 12);
              }
            }
            if (main && step === 1) pr += tag(o, CY + 78, T2('MCM2-7-dubbelhexameer (inactief) rond dsDNA', 'MCM2-7 double hexamer (inactive) around dsDNA'), C.text, 16, 'middle', kM2);
            if (main && step === 2) {
              const kk = ease(sub(p, 0, .15)) * (1 - sub(p, .42, .55));
              pr += pill(o - 150, CY - 120, 64, 28, 'DDK', '#e0708f', kk, 15) + pill(o + 150, CY - 120, 64, 28, 'CDK', '#e0708f', kk, 15);
              pr += arrow(o - 118, CY - 110, o - 40, CY - 50, '#e0708f', 3, kk) + arrow(o + 118, CY - 110, o + 40, CY - 50, '#e0708f', 3, kk);
              pr += tag(o, CY + 130, T2('CMG = Cdc45 + MCM2-7 + GINS', 'CMG = Cdc45 + MCM2-7 + GINS'), C.text, 17, 'middle', sub(p, .3, .45));
              pr += tag(o, CY + 156, T2("elke CMG loopt 3'→5' over zijn streng", "each CMG moves 3'→5' along its strand"), C.muted, 15, 'middle', sub(p, .65, .8));
            }
          });
        }
        if (step === 4) pr += tag(800, 330, T2('vroege origin: grote bel · latere: kleine bellen', 'early origin: large bubble · later: small bubbles'), C.text, 23, 'middle', sub(p, .1, .3));
        if (step === 5) pr += tag(800, 330, T2('vorken komen samen → terminatie', 'forks meet → termination'), C.text, 24, 'middle', sub(p, .05, .2));
        $('rp-prot').innerHTML = pr;

        /* ---------- stap 6: nucleosomen en cohesine ---------- */
        let nu = '', coh = '';
        const an2 = $('rp-nanchor');
        if (step === 6) {
          const kn = ease(sub(p, .15, .6));
          for (let x = 120, i = 0; x < 1500; x += 95, i++) {
            const y1 = CY - G / 2 - H + 7, y2 = CY + G / 2 + H - 7;
            const op = kn * clamp((kn * 16 - i * .9));
            nu += `<g opacity="${f1(clamp(op))}"><ellipse cx="${x}" cy="${f1(y1 - 20)}" rx="22" ry="15" fill="${C.histone}" fill-opacity=".55" stroke="${C.histone}" stroke-width="2"/><ellipse cx="${x + 47}" cy="${f1(y2 + 20)}" rx="22" ry="15" fill="${C.histone}" fill-opacity=".55" stroke="${C.histone}" stroke-width="2"/></g>`;
          }
          an2.setAttribute('cx', 690); an2.setAttribute('cy', CY - G / 2 - H - 40);
          const kc = ease(sub(p, .55, .8));
          for (const x of [450, 1110]) coh += `<g opacity="${f1(kc)}"><ellipse cx="${x}" cy="${CY}" rx="26" ry="${G / 2 + H + 30}" fill="none" stroke="#ffc247" stroke-width="5"/></g>`;
          coh += tag(1110, CY + G / 2 + H + 66, T2('cohesine', 'cohesin'), '#ffc247', 22, 'middle', kc);
          nu += tag(800, CY - 150, T2('zusterchromatide 1: oud + nieuw', 'sister chromatid 1: old + new'), C.text, 23, 'middle', ease(sub(p, 0, .15)));
          nu += tag(800, CY + 178, T2('zusterchromatide 2: nieuw + oud', 'sister chromatid 2: new + old'), C.text, 23, 'middle', ease(sub(p, 0, .15)));
        } else { an2.setAttribute('cx', -99); an2.setAttribute('cy', -99); }
        $('rp-nuc').innerHTML = nu; $('rp-coh').innerHTML = coh;
      },
    };
  },
};
