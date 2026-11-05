import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T, smooth } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';
import { ribo, arrow } from './_rna.js';

/*
 * Lange niet-coderende RNA's (zijpad "Het leven van een RNA", 05-11-2026). Werkingen als steiger, gids en lokaas
 * (Wang & Chang 2011); XIST als voorbeeld (Mattick et al. 2023); NORAD vangt PUMILIO-eiwitten weg (lokaas, in Mattick 2023).
 * Aantal: GENCODE release 50 (mens): 35 885 lncRNA-genen tegenover 19 442 eiwitcoderende genen. Van slechts een minderheid
 * is de functie betrouwbaar bekend (Mattick et al. 2023). Nagekeken in docs/verificatie-ronde-11-rna-lot.md.
 */
const L3 = (nl, en) => ({ nl, en });
const LNC = C.rna, PA = '#9b7bff', PB = '#5fd3e6', PC = '#ff8fc7', BAIT = '#ffc247', MOM = '#ff9ec7', DAD = '#6fd3ff', OFF = '#4a5470';
const vis = (set, step, p) => {
  const k = ease(sub(p, 0, .25));
  return set.includes(step) ? (set.includes(step - 1) || step === 0 ? 1 : k) : set.includes(step - 1) ? 1 - k : 0;
};
/* lang RNA: golvende lijn met een paar haarspeldjes */
function lnc(x0, x1, y, op = 1, w = 12) {
  if (op <= .01) return '';
  const pts = [];
  for (let x = x0; x <= x1; x += 20) pts.push([x, y + 14 * Math.sin((x - x0) / 45)]);
  let s = `<path d="${smooth(pts)}" stroke="${LNC}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  for (let x = x0 + 120; x < x1 - 60; x += 240) s += `<path d="M${x - 12},${y} L${x - 12},${y - 46} A12,12 0 0 1 ${x + 12},${y - 46} L${x + 12},${y}" stroke="${LNC}" stroke-width="${f1(w * .8)}" fill="none" stroke-linecap="round"/>`;
  return `<g opacity="${f1(op)}">${s}</g>`;
}
const blob = (x, y, rx, ry, col, lab = '', op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".9" stroke="#0a1224" stroke-width="2"/>` +
  (lab ? T(x, y + 8, lab, { size: 22, col: '#0a1224', halo: false, w: 800 }) : '') + '</g>';
const gene = (x, y, w, col = C.dna, op = 1) => `<rect x="${x}" y="${y - 16}" width="${w}" height="32" rx="8" fill="${col}" opacity="${f1(op)}"/>`;
const dna = (x0, x1, y) => `<line x1="${x0}" y1="${y - 9}" x2="${x1}" y2="${y - 9}" stroke="${C.dna}" stroke-width="7"/><line x1="${x0}" y1="${y + 9}" x2="${x1}" y2="${y + 9}" stroke="${C.dna2}" stroke-width="7"/>`;
function xc(x, y, s, col) {
  const w = 16 * s, h = 70 * s;
  return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w / 2)}" fill="${col}" transform="rotate(18)"/><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w / 2)}" fill="${col}" transform="rotate(-18)"/></g>`;
}
const LIT = [3, 17, 26, 41, 52];                       // schematisch: enkele goed onderzochte

export default {
  id: 'lncrna',
  title: L3('Lange RNA’s die geen eiwit maken', 'Long RNAs that make no protein'),
  scale: L3('RNA: vanaf 200 tot tienduizenden letters', 'RNA: from 200 to tens of thousands of letters'),
  time: L3('niet van toepassing', 'not applicable'),
  org: L3('mens', 'human'),
  legend: [[C.dna, L3('gen (DNA)', 'gene (DNA)')], [LNC, L3('lang RNA zonder eiwit', 'long RNA without protein')], [PA, L3('eiwitten', 'proteins')], [BAIT, L3('weggevangen eiwit', 'captured protein')], [C.rrna, L3('ribosoom', 'ribosome')]],
  simplified: {
    nl: 'Steiger, gids en lokaas zijn drie eenvoudige rollen; veel lange RNA’s combineren ze of werken op nog andere manieren, bijvoorbeeld doordat het afschrijven zelf iets doet. De vormen en eiwitten zijn verzonnen. Het aantal genen hangt af van de telling (hier GENCODE, versie 50); het verschuift bij elke nieuwe versie. Het rooster in de laatste stap is schematisch, geen echte verhouding.',
    en: 'Scaffold, guide and decoy are three simple roles; many long RNAs combine them or work in still other ways, for instance because the act of copying itself does something. The shapes and proteins are made up. The number of genes depends on the count (here GENCODE, release 50); it shifts with every new release. The grid in the last step is schematic, not a real ratio.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Niet elk RNA wordt een eiwit', 'Not every RNA becomes a protein'),
      text: L3('Sommige genen maken een lang RNA dat nooit vertaald wordt. Het RNA zelf doet dan het werk.', 'Some genes make a long RNA that is never translated. The RNA itself then does the work.') },
    { dur: 8000, cam: FULL, title: L3('Er zijn meer van zulke genen dan eiwitgenen', 'There are more such genes than protein genes'),
      text: L3('Ons DNA telt ongeveer 36 000 genen voor lange RNA’s, tegenover net geen 20 000 eiwitgenen.', 'Our DNA counts about 36,000 genes for long RNAs, against just under 20,000 protein genes.') },
    { dur: 8000, cam: FULL, title: L3('Werk 1: een steiger', 'Job 1: a scaffold'),
      text: L3('Een lang RNA kan als steiger werken. Het houdt verschillende eiwitten bij elkaar.', 'A long RNA can act as a scaffold. It holds different proteins together.') },
    { dur: 8500, cam: FULL, title: L3('Werk 2: een gids', 'Job 2: a guide'),
      text: L3('Een lang RNA kan ook een gids zijn. Het brengt eiwitten naar een bepaalde plek op het DNA.', 'A long RNA can also be a guide. It brings proteins to a particular spot on the DNA.') },
    { dur: 8500, cam: FULL, title: L3('Werk 3: een lokaas', 'Job 3: a decoy'),
      text: L3('Of het werkt als lokaas: het vangt eiwitten weg, zodat ze elders niet aan het werk kunnen.', 'Or it acts as a decoy: it catches proteins away, so they cannot get to work elsewhere.') },
    { dur: 8500, cam: FULL, title: L3('Een bekend voorbeeld: XIST', 'A well-known example: XIST'),
      text: L3('XIST is zo’n lang RNA. Het bedekt één X-chromosoom bij vrouwen en legt het stil.', 'XIST is such a long RNA. It coats one X chromosome in women and silences it.') },
    { dur: 9000, cam: FULL, title: L3('Van de meeste weten we het nog niet', 'For most of them we do not know yet'),
      text: L3('Slechts van een klein deel is de werking goed onderzocht. Ze zijn niet allemaal rommel, maar ook niet allemaal belangrijk.', 'Only for a small share has the function been well studied. They are not all junk, but not all important either.') },
  ],
  svg() {
    return svgOpen() + `<g id="ln-v"></g>
    ${btn('rnai', 40, 330, T2('↑ kleine RNA’s die remmen', '↑ small RNAs that repress'), '#e0679a')}
    ${btn('xinact', 600, 360, T2('XIST: één X op slot', 'XIST: one X locked away'), MOM)}
    ${btn('rnastructuur', 1150, 410, T2('volgende: hoe RNA zich vouwt →', 'next: how RNA folds →'), C.rna)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const k = (a, b) => ease(sub(p, a, b));
        let o = '';
        /* 0: twee soorten genen */
        const v0 = vis([0], step, p);
        if (v0 > .01) {
          const k1 = step === 0 ? k(.05, .4) : 1, k2 = step === 0 ? k(.4, .75) : 1;
          o += `<g opacity="${f1(v0)}">` + gene(180, 300, 220) + T(290, 260, T2('gen voor een eiwit', 'gene for a protein'), { size: 24, col: C.dna2 }) +
            arrow(420, 300, 500, 300, C.muted, 4, k1) + `<line x1="530" y1="300" x2="830" y2="300" stroke="${LNC}" stroke-width="10" stroke-linecap="round" opacity="${f1(k1)}"/>` +
            ribo(700, 300, .7, k1, '') + arrow(860, 300, 960, 300, C.muted, 4, k1);
          for (let i = 0; i < 7; i++) o += `<circle cx="${1000 + i * 34}" cy="300" r="14" fill="${C.chain}" stroke="#0a1224" stroke-width="2" opacity="${f1(k1)}"/>`;
          o += T(1100, 360, T2('eiwit', 'protein'), { size: 26, col: C.chain, op: k1 });
          o += gene(180, 580, 220) + T(290, 540, T2('gen voor een lang RNA', 'gene for a long RNA'), { size: 24, col: C.dna2 }) +
            arrow(420, 580, 500, 580, C.muted, 4, k2) + lnc(530, 1000, 590, k2) +
            `<g opacity="${f1(k2)}"><path d="M1080,520 l60,60 M1140,520 l-60,60" stroke="${C.danger}" stroke-width="9" stroke-linecap="round"/></g>` +
            T(1110, 640, T2('geen eiwit', 'no protein'), { size: 26, col: C.danger, op: k2 }) + T(760, 680, T2('het RNA zelf doet het werk', 'the RNA itself does the work'), { size: 26, col: LNC, w: 700, op: k2 }) + '</g>';
        }
        /* 1: aantallen (GENCODE 50) */
        const v1 = vis([1], step, p);
        if (v1 > .01) {
          const kb = step === 1 ? k(.1, .6) : 1, sc = 1000 / 36000;
          o += `<g opacity="${f1(v1)}"><rect x="300" y="330" width="${f1(Math.max(0, 19442 * sc * kb))}" height="80" rx="12" fill="${PA}"/>` +
            `<rect x="300" y="500" width="${f1(Math.max(0, 35885 * sc * kb))}" height="80" rx="12" fill="${LNC}"/>` +
            T(300, 310, T2('genen voor een eiwit', 'genes for a protein'), { size: 26, anchor: 'start' }) + T(300, 480, T2('genen voor een lang RNA', 'genes for a long RNA'), { size: 26, anchor: 'start' }) +
            T(320 + 19442 * sc * kb, 382, T2('≈ 19 400', '≈ 19,400'), { size: 30, anchor: 'start', w: 800, op: sub(p, .5, .7) + (step > 1 ? 1 : 0) }) +
            T(320 + 35885 * sc * kb, 552, T2('≈ 35 900', '≈ 35,900'), { size: 30, anchor: 'start', w: 800, op: sub(p, .5, .7) + (step > 1 ? 1 : 0) }) +
            T(300, 660, T2('mens · telling GENCODE, versie 50', 'human · GENCODE count, release 50'), { size: 22, anchor: 'start', col: C.muted }) + '</g>';
        }
        /* 2: steiger */
        const v2 = vis([2], step, p);
        if (v2 > .01) {
          const kp = i => step === 2 ? k(.15 + i * .15, .45 + i * .15) : 1;
          o += `<g opacity="${f1(v2)}">` + lnc(380, 1220, 520) +
            blob(lerp(470, 560, kp(0)), lerp(220, 445, kp(0)), 80, 46, PA, T2('eiwit 1', 'protein 1')) +
            blob(800, lerp(760, 600, kp(1)), 80, 46, PB, T2('eiwit 2', 'protein 2')) +
            blob(lerp(1150, 1040, kp(2)), lerp(220, 445, kp(2)), 80, 46, PC, T2('eiwit 3', 'protein 3')) +
            T(800, 300, T2('steiger: houdt eiwitten samen', 'scaffold: holds proteins together'), { size: 28, col: LNC, w: 700, op: step === 2 ? sub(p, .7, .85) : 1 }) + '</g>';
        }
        /* 3: gids */
        const v3 = vis([3], step, p);
        if (v3 > .01) {
          const km = step === 3 ? k(.15, .75) : 1, x = lerp(420, 1000, km), y = lerp(300, 520, km);
          o += `<g opacity="${f1(v3)}">` + dna(150, 1450, 650) + `<rect x="880" y="625" width="250" height="50" rx="10" fill="none" stroke="${BAIT}" stroke-width="4" stroke-dasharray="10 6"/>` +
            T(1005, 720, T2('juiste plek op het DNA', 'right spot on the DNA'), { size: 24, col: BAIT }) +
            lnc(x - 200, x + 120, y + 40) + blob(x + 10, y - 30, 90, 46, PA, T2('eiwitten', 'proteins')) +
            T(x - 230, y - 10, T2('gids', 'guide'), { size: 28, col: LNC, w: 700, anchor: 'end' }) + '</g>';
        }
        /* 4: lokaas */
        const v4 = vis([4], step, p);
        if (v4 > .01) {
          o += `<g opacity="${f1(v4)}">` + dna(150, 1450, 680) + gene(1050, 680, 280, '#2a5bb0') + T(1190, 740, T2('doelwit', 'target'), { size: 24, col: C.dna2 }) +
            lnc(260, 820, 470) + T(540, 580, T2('lokaas', 'decoy'), { size: 28, col: LNC, w: 700 });
          [0, 1, 2].forEach(i => {
            const kk = step === 4 ? k(.1 + i * .15, .5 + i * .15) : 1;
            const x = lerp(900 + i * 140, [380, 620, 770][i], kk), y = lerp(230, i < 2 ? 410 : 440, kk);
            o += blob(x, y, 40, 28, BAIT);
          });
          const kx = step === 4 ? k(.75, .9) : 1;
          o += arrow(1000, 300, 1150, 620, C.muted, 3, .6 * kx) + `<g opacity="${f1(kx)}"><path d="M1060,430 l40,40 M1100,430 l-40,40" stroke="${C.danger}" stroke-width="8" stroke-linecap="round"/></g>` +
            T(1240, 460, T2('komen hier niet aan', 'don’t get here'), { size: 24, col: C.danger, op: kx }) + '</g>';
        }
        /* 5: XIST */
        const v5 = vis([5], step, p);
        if (v5 > .01) {
          const kc = step === 5 ? k(.15, .8) : 1, n = Math.round(14 * kc);
          o += `<g opacity="${f1(v5)}"><circle cx="800" cy="450" r="300" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="5"/>` + xc(650, 450, 2.8, MOM) + xc(960, 450, 2.8, n > 10 ? OFF : DAD);
          for (let i = 0; i < n; i++) {
            const arm = i % 2 ? 1 : -1, u = ((i >> 1) / 6) * 2 - 1, hy = u * 30 * 2.8, hx = arm * hy * Math.tan(18 * Math.PI / 180);
            o += `<path d="M${f1(960 + hx - 13)},${f1(450 + hy)} q6.5,-9 13,0 t13,0" stroke="${LNC}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
          }
          o += '</g>' + T(650, 610, T2('actief X', 'active X'), { size: 26, col: MOM, op: v5 }) + T(960, 610, T2('XIST bedekt dit X', 'XIST coats this X'), { size: 26, col: LNC, w: 700, op: v5 * kc });
        }
        /* 6: van de meeste weten we het niet */
        const v6 = vis([6], step, p);
        if (v6 > .01) {
          const kl = step === 6 ? k(.2, .5) : 1;
          o += `<g opacity="${f1(v6)}">`;
          for (let i = 0; i < 60; i++) {
            const x = 380 + (i % 12) * 76, y = 250 + ((i / 12) | 0) * 76, lit = LIT.includes(i);
            o += `<circle cx="${x}" cy="${y}" r="26" fill="${lit ? LNC : '#2c3448'}" fill-opacity="${f1(lit ? .3 + .7 * kl : 1)}" stroke="#0a1224" stroke-width="2"/>`;
            if (!lit) o += T(x, y + 9, '?', { size: 24, col: '#6b7690', halo: false });
          }
          o += '</g>' + T(800, 680, T2('oranje: werking goed onderzocht (schematisch)', 'orange: function well studied (schematic)'), { size: 26, col: LNC, op: v6 * kl }) +
            T(800, 720, T2('grijs: nog onbekend', 'grey: still unknown'), { size: 24, col: C.muted, op: v6 * kl });
        }
        $('ln-v').innerHTML = o;
      },
    };
  },
};
