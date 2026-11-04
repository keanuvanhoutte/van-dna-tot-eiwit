import { C, L, T2, svgOpen, txt, mono, nt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { K, ribo, prot, panel } from './_bkit.js';

/* Bacterieel mRNA: gekoppelde transcriptie–translatie, Shine-Dalgarno ↔ 16S-rRNA, fMet-tRNA, 30S + 50S = 70S,
 * polycistronisch mRNA, en een vergelijkingstabel mens ↔ bacterie.
 * Bronnen: Miller et al. 1970 (gekoppeld, EM), Webster et al. 2020 (expressoom), Shine & Dalgarno 1974 (16S 3′-uiteinde ...CCUCCUUA-3′),
 * Alberts MBoC 4e "From RNA to Protein", PDB 4YBB (70S), 6ZTJ (RNAP–70S). */
const Y = 700;                                   // DNA-hoogte in het overzicht
const SEQ = 'CCAGGAGGCAAAUCAUGGCUAAA';            // SD = 2–7, AUG = 14–16
const R16 = 'AUUCCUCCAC';                        // 3′-uiteinde 16S-rRNA, gelezen 3′→5′ (paart met SD op 2–7)
const NX = 206, NW = 54, NY = 420;               // close-up: x van base 0, afstand, hoogte mRNA
const bx = i => NX + i * NW;

const ROWS = [
  [{ nl: 'DNA ligt in', en: 'DNA lies in' }, { nl: 'de kern', en: 'the nucleus' }, { nl: 'de nucleoïd (geen kern)', en: 'the nucleoid (no nucleus)' }],
  [{ nl: 'Chromosomen', en: 'Chromosomes' }, { nl: '46 lineaire', en: '46 linear' }, { nl: '1 ring (+ plasmiden)', en: '1 ring (+ plasmids)' }],
  [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: '3 soorten (I, II, III)', en: '3 kinds (I, II, III)' }, { nl: '1 soort + σ-factor', en: '1 kind + σ factor' }],
  [{ nl: 'Genen per mRNA', en: 'Genes per mRNA' }, { nl: 'meestal 1', en: 'usually 1' }, { nl: 'vaak meerdere (operon)', en: 'often several (operon)' }],
  [{ nl: "5′-cap, splicing, poly(A)", en: "5′ cap, splicing, poly(A)" }, { nl: 'ja', en: 'yes' }, { nl: 'nee', en: 'no' }],
  [{ nl: 'Kopiëren en vertalen', en: 'Copying and translating' }, { nl: 'gescheiden (kern / cytosol)', en: 'separate (nucleus / cytosol)' }, { nl: 'tegelijk (gekoppeld)', en: 'at once (coupled)' }],
  [{ nl: 'Start van translatie', en: 'Start of translation' }, { nl: 'ribosoom scant vanaf de cap', en: 'ribosome scans from the cap' }, { nl: 'Shine-Dalgarno', en: 'Shine-Dalgarno' }],
  [{ nl: 'Ribosoom', en: 'Ribosome' }, { nl: '80S (40S + 60S)', en: '80S (40S + 60S)' }, { nl: '70S (30S + 50S)', en: '70S (30S + 50S)' }],
];

export default {
  id: 'bmrna',
  title: { nl: 'Bacterieel mRNA is meteen klaar', en: 'Bacterial mRNA is ready at once' },
  scale: { nl: '70S-ribosoom ≈ 20 nm', en: '70S ribosome ≈ 20 nm' }, time: { nl: 'translatie ≈ 10–20 aminozuren/s', en: 'translation ≈ 10–20 amino acids/s' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.dna, 'DNA'], [K.rnap, { nl: 'RNA-polymerase', en: 'RNA polymerase' }], [C.rna, 'mRNA'], [K.ribo, { nl: 'ribosoom (30S, 50S)', en: 'ribosome (30S, 50S)' }], [K.sd, 'Shine-Dalgarno'], [C.trna, 'fMet-tRNA'], [C.chain, { nl: 'nieuwe eiwitketen', en: 'new protein chain' }]],
  simplified: {
    nl: 'Niet op schaal. De start (initiatie) heeft ook drie hulpeiwitten nodig (IF1, IF2, IF3) en GTP; die zijn weggelaten. De afstand tussen Shine-Dalgarno en startcodon is hier 6 nt; in echte genen varieert die, en sommige mRNA’s hebben geen Shine-Dalgarno. Het eerste RNA-polymerase en het eerste ribosoom kunnen elkaar fysiek raken (het "expressoom"); de getekende afstand is willekeurig. Het formyl-groepje (en vaak de methionine) wordt later van het eiwit geknipt. "70S" is geen optelsom: S (Svedberg) meet hoe snel een deeltje zakt in een centrifuge.',
    en: 'Not to scale. Initiation also needs three helper proteins (IF1, IF2, IF3) and GTP; these are left out. The distance between Shine-Dalgarno and start codon is 6 nt here; in real genes it varies, and some mRNAs have no Shine-Dalgarno. The leading RNA polymerase and the first ribosome can physically touch (the "expressome"); the drawn distance is arbitrary. The formyl group (and often the methionine) is later cut off the protein. "70S" is not a sum: S (Svedberg) measures how fast a particle sinks in a centrifuge.' },
  steps: [
    { dur: 9000, cam: cam(800, 470, 1600), title: { nl: 'Kopiëren en vertalen tegelijk', en: 'Copying and translating at once' },
      text: { nl: 'Terwijl het RNA-polymerase mRNA maakt, springen ribosomen er al op. Er is geen kern die ze scheidt.', en: 'While RNA polymerase makes mRNA, ribosomes already hop on. There is no nucleus to keep them apart.' } },
    { dur: 9000, cam: cam(700, 430, 1300), title: { nl: 'Het ribosoom zoekt de landingsplaats', en: 'The ribosome finds the landing site' },
      text: { nl: 'De kleine eenheid (30S) paart met de Shine-Dalgarno-volgorde. Zo ligt het startcodon op de juiste plek.', en: 'The small subunit (30S) pairs with the Shine-Dalgarno sequence. That puts the start codon in the right spot.' } },
    { dur: 8000, cam: cam(800, 400, 1300), title: { nl: 'Start met formylmethionine', en: 'Starting with formylmethionine' },
      text: { nl: 'Het eerste tRNA brengt fMet naar AUG. Bacteriën starten elk eiwit met deze aangepaste methionine.', en: 'The first tRNA brings fMet to AUG. Bacteria start every protein with this modified methionine.' } },
    { dur: 8000, cam: cam(800, 400, 1300), title: { nl: 'Twee delen worden één: 70S', en: 'Two parts become one: 70S' },
      text: { nl: 'De grote eenheid (50S) sluit aan bij de kleine (30S). Samen vormen ze het 70S-ribosoom.', en: 'The large subunit (50S) joins the small one (30S). Together they form the 70S ribosome.' } },
    { dur: 9000, cam: cam(800, 450, 1600), title: { nl: 'Eén mRNA, meerdere eiwitten', en: 'One mRNA, several proteins' },
      text: { nl: 'In een operon-mRNA heeft elk gen een eigen Shine-Dalgarno. Zo vertalen ribosomen elk gen apart.', en: 'In an operon mRNA, each gene has its own Shine-Dalgarno. So ribosomes translate each gene separately.' } },
    { dur: 12000, cam: cam(800, 450, 1600), title: { nl: 'Mens en bacterie naast elkaar', en: 'Human and bacterium side by side' },
      text: { nl: 'Geen cap, geen staart, geen splicing: bacterieel mRNA is meteen klaar. Bij de mens wordt het eerst bewerkt.', en: 'No cap, no tail, no splicing: bacterial mRNA is ready at once. In humans it is processed first.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="bm-over"></g>
    <g id="bm-close"></g>
    <g id="bm-poly"></g>
    <g id="bm-table"></g>
    <g data-node="initiatie" data-color="${C.rrna}" data-label="${T2('Vergelijk: start bij de mens', 'Compare: start in humans')}" data-pos="below"><circle data-anchor="initiatie" cx="260" cy="860" r="1" fill="none"/><rect x="259" y="859" width="2" height="2" fill="none"/></g>
    <g data-node="rnaprocessing" data-color="${C.rna}" data-label="${T2('Bij de mens: cap, splicing, staart', 'In humans: cap, splicing, tail')}" data-pos="below"><circle data-anchor="rnaprocessing" cx="640" cy="860" r="1" fill="none"/><rect x="639" y="859" width="2" height="2" fill="none"/></g>
    <g data-node="codon" data-color="${C.trna}" data-label="${T2('Codons lezen →', 'Reading codons →')}" data-pos="below"><circle data-anchor="codon" cx="1000" cy="860" r="1" fill="none"/><rect x="999" y="859" width="2" height="2" fill="none"/></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Het eiwit vouwt →', 'The protein folds →')}" data-pos="below"><circle data-anchor="vouwing" cx="1340" cy="860" r="1" fill="none"/><rect x="1339" y="859" width="2" height="2" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    // overzicht: DNA + rijdend RNA-polymerase + groeiend mRNA met ribosomen
    function overview(u, op) {
      if (op <= .01) return '';
      const x = lerp(260, 1380, u), len = x - 230;
      let g = `<g opacity="${f1(op)}"><line x1="60" y1="${Y - 8}" x2="1540" y2="${Y - 8}" stroke="${C.dna}" stroke-width="5"/><line x1="60" y1="${Y + 8}" x2="1540" y2="${Y + 8}" stroke="${C.dna2}" stroke-width="5"/>`;
      const pts = [];
      for (let s = 0; s <= len; s += 6) pts.push([x - 30 - s * .5, Y - 50 - Math.min(s, 520) * .62 - 10 * Math.sin(s / 40)]);
      if (pts.length > 1) g += `<path d="${pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
      // ribosomen: het eerste stapt op zodra er genoeg mRNA is; elk volgend ~170 px later
      for (let k = 0; k < 6; k++) {
        const d = len - 120 - k * 170;           // afgelegde weg van ribosoom k vanaf het 5′-uiteinde
        if (d < 0) break;
        const q = pts[Math.min(pts.length - 1, Math.floor((len - d) / 6))];
        const ch = Math.min(70, d * .25);
        g += `<path d="M${f1(q[0])},${f1(q[1] - 28)} q${f1(ch * .3)},${f1(-ch * .5)} 0,${f1(-ch)}" stroke="${C.chain}" stroke-width="4" fill="none"/>` + ribo(q[0], q[1] - 6, 2, 1);
      }
      g += prot(x, Y - 30, 60, 40, K.rnap, 1, 31, 'RNAP', 20) + '</g>';
      return g;
    }
    return {
      update(t, s) {
        const { step, p } = s;
        // stap 0: overzicht; daarna blijft het vaag op de achtergrond
        const ou = step === 0 ? ease(sub(p, 0, .9)) : 1;
        const oo = step === 0 ? 1 : step === 1 ? lerp(1, .12, ease(sub(p, 0, .3))) : step <= 3 ? .12 : 0;
        let ov = overview(ou, oo);
        if (step === 0) ov += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(420, 520, T2('mRNA + ribosomen', 'mRNA + ribosomes'), C.text, 28, 'middle', 700) + txt(420, 560, T2('terwijl het mRNA nog groeit', 'while the mRNA is still growing'), C.muted, 22) + '</g>';
        $('bm-over').innerHTML = ov;

        // close-up (stap 1–3)
        let cl = '';
        if (step >= 1 && step <= 3) {
          const a = step === 1 ? ease(sub(p, .15, .4)) : 1;
          cl += `<g opacity="${f1(a)}">`;
          // 30S
          cl += `<ellipse cx="${bx(11)}" cy="${NY + 90}" rx="560" ry="105" fill="${K.ribo}" fill-opacity=".14" stroke="${K.ribo}" stroke-width="3"/>` + txt(bx(19) + 40, NY + 160, '30S', K.ribo, 30, 'middle', 800);
          // 50S (stap 3)
          if (step === 3) {
            const d = ease(sub(p, .1, .55));
            cl += `<g transform="translate(0 ${f1(lerp(-260, 0, d))})" opacity="${f1(sub(p, .05, .2))}"><ellipse cx="${bx(11)}" cy="${NY - 150}" rx="580" ry="150" fill="${K.ribo}" fill-opacity=".2" stroke="${K.ribo}" stroke-width="3"/>` + txt(bx(1), NY - 230, '50S', K.ribo, 30, 'middle', 800) + '</g>';
            const e = sub(p, .6, .8);
            cl += `<g opacity="${f1(e)}">` + txt(bx(11), NY - 330, T2('70S-ribosoom', '70S ribosome'), K.ribo, 34, 'middle', 800) +
              [['E', 12], ['P', 15], ['A', 18]].map(([l, i]) => `<rect x="${bx(i - 1) - 24}" y="${NY - 140}" width="${3 * NW - 4}" height="34" rx="8" fill="#0b1224" stroke="${C.muted}"/>` + txt(bx(i), NY - 116, l, C.text, 22, 'middle', 800)).join('') + '</g>';
          }
          // mRNA
          cl += txt(bx(0) - 50, NY + 30, "5′", C.rna, 24, 'middle', 700) + txt(bx(SEQ.length - 1) + 50, NY + 30, "3′", C.rna, 24, 'middle', 700);
          cl += [...SEQ].map((c, i) => nt(bx(i), NY, c, 46, 42)).join('');
          cl += `<path d="M${bx(2) - 26},${NY - 10} v-12 H${bx(7) + 26} v12" stroke="${K.sd}" fill="none" stroke-width="3"/>` + txt(bx(4.5), NY - 32, 'Shine-Dalgarno', K.sd, 24, 'middle', 800);
          cl += `<path d="M${bx(14) - 26},${NY - 10} v-12 H${bx(16) + 26} v12" stroke="#7fdc6a" fill="none" stroke-width="3"/>` + (step === 1 ? txt(bx(15), NY - 32, 'AUG', '#7fdc6a', 24, 'middle', 800) : '');
          // 16S-rRNA paart met SD
          const pr = step === 1 ? ease(sub(p, .4, .7)) : 1;
          cl += `<g opacity="${f1(pr)}">` + txt(bx(0) - 50, NY + 130, "3′", K.ribo, 24, 'middle', 700) + [...R16].map((c, i) => nt(bx(i), NY + 104, c, 46, 42)).join('') + txt(bx(R16.length) + 10, NY + 132, T2('… 16S-rRNA', '… 16S rRNA'), K.ribo, 22, 'start', 700) +
            [2, 3, 4, 5, 6, 7].map(i => `<line x1="${bx(i)}" y1="${NY + 48}" x2="${bx(i)}" y2="${NY + 98}" stroke="${C.text}" stroke-width="3" stroke-dasharray="4 4"/>`).join('') + '</g>';
          // fMet-tRNA op AUG (stap 2–3)
          if (step >= 2) {
            const f = step === 2 ? ease(sub(p, .1, .5)) : 1, dy = lerp(-200, 0, f);
            const x = bx(15);
            cl += `<g transform="translate(0 ${f1(dy)})" opacity="${f1(step === 2 ? sub(p, .05, .2) : 1)}"><path d="M${x - 60},${NY - 54} V${NY - 190} H${x + 60} V${NY - 54}" fill="${C.trna}" fill-opacity=".25" stroke="${C.trna}" stroke-width="3"/>` +
              [...'UAC'].map((c, i) => nt(bx(14 + i), NY - 50, c, 46, 40)).join('') +
              `<circle cx="${x}" cy="${NY - 222}" r="30" fill="${C.chain}" fill-opacity=".85"/>` + txt(x, NY - 214, 'fMet', '#0a1224', 20, 'middle', 800) + '</g>';
            if (step === 2) cl += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(bx(20) + 30, NY - 200, T2('formyl-methionine', 'formyl-methionine'), C.chain, 24, 'start', 700) + txt(bx(20) + 30, NY - 166, T2('mens: gewone Met', 'human: plain Met'), C.muted, 22, 'start') + '</g>';
          }
          cl += '</g>';
        }
        $('bm-close').innerHTML = cl;

        // polycistronisch mRNA (stap 4)
        let po = '';
        if (step === 4) {
          const a = sub(p, 0, .2), u = ease(sub(p, .2, .95));
          const G = [[230, 600], [720, 1030], [1150, 1460]], cols = ['#ffb27a', '#ffc247', '#d9e37a'];
          po += `<g opacity="${f1(a)}"><line x1="100" y1="470" x2="1520" y2="470" stroke="${C.rna}" stroke-width="6" stroke-linecap="round"/>` + txt(80, 478, "5′", C.rna, 22, 'end') + txt(1540, 478, "3′", C.rna, 22, 'start');
          G.forEach(([g0, g1], i) => {
            po += `<rect x="${g0 - 70}" y="456" width="44" height="28" rx="6" fill="${K.sd}" fill-opacity=".8"/>` + txt(g0 - 48, 530, 'SD', K.sd, 20, 'middle', 800) +
              `<rect x="${g0}" y="460" width="${g1 - g0}" height="20" rx="10" fill="${cols[i]}" fill-opacity=".35" stroke="${cols[i]}"/>` + txt((g0 + g1) / 2, 540, `${T2('gen', 'gene')} ${i + 1}`, cols[i], 24, 'middle', 700);
            for (let k = 0; k < 2; k++) {
              const v = clamp(u * 1.4 - k * .4);
              if (v <= 0) continue;
              const x = lerp(g0 + 20, g1 - 20, v);
              po += `<path d="M${f1(x)},420 q${f1(14)},${f1(-30 * v)} 0,${f1(-80 * v)}" stroke="${cols[i]}" stroke-width="5" fill="none"/>` + ribo(x, 446, 2.6, 1);
            }
          });
          po += `<g opacity="${f1(sub(p, .7, .9))}">` + txt(800, 680, T2('drie eiwitten uit één mRNA', 'three proteins from one mRNA'), C.text, 28, 'middle', 700) + '</g></g>';
        }
        $('bm-poly').innerHTML = po;

        // vergelijkingstabel (stap 5)
        let tb = '';
        if (step === 5) {
          const a = sub(p, 0, .12);
          const X = [200, 640, 1060], y0 = 175;
          tb += `<g opacity="${f1(a)}">` + panel(150, 110, 1300, 700) + txt(X[1] + 170, y0, T2('Mens', 'Human'), C.text, 28, 'middle', 800) + txt(X[2] + 170, y0, T2('Bacterie (E. coli)', 'Bacterium (E. coli)'), C.bact, 28, 'middle', 800);
          ROWS.forEach((r, i) => {
            const y = y0 + 70 + i * 72, on = sub(p, .08 + i * .08, .14 + i * .08);
            tb += `<g opacity="${f1(.2 + .8 * on)}"><line x1="180" y1="${y - 40}" x2="1420" y2="${y - 40}" stroke="#2a3a5f"/>` + txt(X[0], y, L(r[0]), C.muted, 23, 'start', 700) + txt(X[1] + 170, y, L(r[1]), C.text, 24) + txt(X[2] + 170, y, L(r[2]), '#ffb0b0', 24, 'middle', 700) + '</g>';
          });
          tb += '</g>';
        }
        $('bm-table').innerHTML = tb;
      },
    };
  },
};
