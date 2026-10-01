import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, panel } from './_txn.js';

const COLX = [290, 800, 1310];
const PC = ['#7f9cf5', '#9b7bff', '#d98cf0'];
/* α-amanitine: 50 % remming (µg/ml) in humane KB-cellen (Weinmann, Raskas & Roeder, PNAS 1974) */
const AMA = [{ n: 'Pol II', c: .02, col: PC[1] }, { n: 'Pol III', c: 20, col: PC[2] }, { n: 'Pol I', c: 200, col: PC[0], res: true }];
const ax = c => 470 + (Math.log10(c) + 2) * 180;

export default {
  id: 'polymerasen',
  title: { nl: 'RNA-polymerase I, II en III', en: 'RNA polymerases I, II and III' },
  scale: { nl: '≈ 15 nm (per enzym)', en: '≈ 15 nm (per enzyme)' }, time: { nl: 'overzicht (geen echte tijd)', en: 'overview (no real time)' },
  org: { nl: 'mens (eukaryoot)', en: 'human (eukaryote)' },
  legend: [[PC[0], 'Pol I (13)'], [PC[1], 'Pol II (12)'], [PC[2], 'Pol III (17)'], [C.histone, { nl: 'gedeelde subeenheden', en: 'shared subunits' }], [C.rna, 'RNA'], [C.dna, 'DNA'], ['#ffc247', { nl: 'promoterelement', en: 'promoter element' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Mitochondriën hebben nog een vierde, totaal ander RNA-polymerase (POLRMT, één subeenheid, verwant aan dat van bacteriofaag T7). Planten hebben daarnaast Pol IV en Pol V.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Mitochondria have yet a fourth, completely different RNA polymerase (POLRMT, a single subunit related to that of bacteriophage T7). Plants additionally have Pol IV and Pol V.</p>' },
  simplified: {
    nl: 'De enzymen zijn symbolen, niet op schaal. De productlijsten zijn niet volledig (Pol III maakt o.a. ook RNase P-RNA, Y-RNA\'s en vault-RNA\'s). Promoterposities zijn schematisch; de α-amanitinewaarden gelden voor gezuiverde enzymen uit humane KB-cellen en verschillen tussen organismen.',
    en: 'The enzymes are symbols, not to scale. The product lists are incomplete (Pol III also makes e.g. RNase P RNA, Y RNAs and vault RNAs). Promoter positions are schematic; the α-amanitin values apply to purified enzymes from human KB cells and differ between organisms.' },
  steps: [
    { dur: 8000, cam: cam(800, 390, 1400), title: { nl: 'Drie nucleaire RNA-polymerasen', en: 'Three nuclear RNA polymerases' },
      text: { nl: 'Eukaryote cellen hebben drie verwante RNA-polymerasen in de kern, elk met een eigen taak. Bij de mens bestaan ze uit 12 tot 17 subeenheden, met een gedeelde kern.', en: 'Eukaryotic cells have three related RNA polymerases in the nucleus, each with its own task. In humans they consist of 12 to 17 subunits, with a shared core.' } },
    { dur: 8000, cam: cam(290, 410, 1060), title: { nl: 'Pol I: ribosomaal RNA in de nucleolus', en: 'Pol I: ribosomal RNA in the nucleolus' },
      text: { nl: 'Pol I schrijft de genen voor ribosomaal RNA af tot één lange voorloper. Die wordt geknipt tot drie rRNA\'s: 18S, 5,8S en 28S.', en: 'Pol I transcribes the ribosomal RNA genes into one long precursor. It is cut into three rRNAs: 18S, 5.8S and 28S.' } },
    { dur: 7000, cam: cam(800, 410, 1060), title: { nl: 'Pol II: mRNA en meer', en: 'Pol II: mRNA and more' },
      text: { nl: 'Pol II maakt alle mRNA\'s (dus van alle eiwitgenen) en ook veel RNA\'s die niet voor een eiwit coderen. Alleen Pol II heeft een CTD-staart.', en: 'Pol II makes all mRNAs (so for all protein genes) and also many RNAs that do not code for a protein. Only Pol II has a CTD tail.' } },
    { dur: 8000, cam: cam(1310, 410, 1060), title: { nl: 'Pol III: korte, stabiele RNA\'s', en: 'Pol III: short, stable RNAs' },
      text: { nl: 'Pol III maakt korte, stabiele RNA\'s zoals tRNA\'s en 5S rRNA. Ook de VA-RNA\'s van het adenovirus uit ons verhaal komen van Pol III.', en: 'Pol III makes short, stable RNAs such as tRNAs and 5S rRNA. The VA RNAs of the adenovirus from our story also come from Pol III.' } },
    { dur: 10000, cam: cam(800, 610, 1500), title: { nl: 'Pol III-promoters: drie types', en: 'Pol III promoters: three types' },
      text: { nl: 'Pol III-promoters liggen vaak binnen het gen zelf (bij tRNA en 5S rRNA), soms ervóór (U6). Een reeks T\'s in het DNA beëindigt de transcriptie.', en: 'Pol III promoters often lie inside the gene itself (tRNA and 5S rRNA), sometimes upstream (U6). A run of Ts in the DNA ends transcription.' } },
    { dur: 9000, cam: cam(800, 580, 1400), title: { nl: 'α-Amanitine onderscheidt de drie', en: 'α-Amanitin tells them apart' },
      text: { nl: 'α-Amanitine, het gif van de groene knolamaniet, remt Pol II al bij zeer lage dosis, Pol III pas bij ~1000× meer en Pol I niet. Zo kun je ze onderscheiden.', en: 'α-Amanitin, the death-cap toxin, inhibits Pol II at a very low dose, Pol III only at ~1000× more, and Pol I not at all. This tells them apart.' } },
  ],
  svg() {
    const names = [T2('RNA-polymerase I', 'RNA polymerase I'), T2('RNA-polymerase II', 'RNA polymerase II'), T2('RNA-polymerase III', 'RNA polymerase III')];
    const nsub = [13, 12, 17];
    const loc = [T2('nucleolus', 'nucleolus'), T2('nucleoplasma', 'nucleoplasm'), T2('nucleoplasma', 'nucleoplasm')];
    const nodes = ['ribogenese', 'rnapol', 'trna'];
    const labels = [T2('Ribosoombiogenese', 'Ribosome biogenesis'), T2('Pol II in 3D', 'Pol II in 3D'), 'tRNA'];
    let s = '';
    COLX.forEach((x, i) => {
      s += `<g id="pc-col${i}">` + txt(x, 150, names[i], PC[i], 26, 'middle', 800);
      s += `<g data-node="${nodes[i]}" data-color="${PC[i]}" data-label="${labels[i]}">` + prot(x, 280, 120, 78, PC[i], 1, 100 + i * 7, '', 15) +
        txt(x, 270, `Pol ${['I', 'II', 'III'][i]}`, '#fff', 26, 'middle', 800) + txt(x, 304, `${nsub[i]} ${L({ nl: 'subeenheden', en: 'subunits' })}`, '#fff', 19) +
        `<circle id="pc-a${i}" data-anchor="${nodes[i]}" cx="${x}" cy="206" r="1" fill="none"/></g>`;
      for (let k = 0; k < 5; k++) s += `<circle cx="${x - 48 + k * 24}" cy="330" r="8" fill="${C.histone}" stroke="#0a1224" stroke-width="1.5"/>`;
      if (i === 1) s += `<path d="M${x + 60},${340} q20,30 0,55 q-20,25 5,50" stroke="${PC[1]}" stroke-width="3" fill="none"/>` + txt(x + 95, 420, 'CTD', PC[1], 20, 'start');
      s += `<g data-node="${i === 0 ? 'nucleolus' : 'kern'}" data-nolabel data-color="${C.muted}">` + pill(x, 397, 196, 32, loc[i], i === 0 ? '#58677f' : '#44516a', 1, 19) + '</g>';
      s += '</g>';
    });
    s += `<g id="pc-shared">` + txt(800, 385, '', C.muted, 14) + '</g>';
    return svgOpen() + s + `<g data-node="ribogenese" data-nolabel data-color="${C.rna}"><g id="pc-prod0"></g></g><g id="pc-prod"></g><g id="pc-p3"></g><g id="pc-ama"></g><g id="pc-shr"></g>
      <g data-node="adeno" data-color="${C.tdna}" data-label="${T2('Adenovirus: VA-RNA\'s', 'Adenovirus: VA RNAs')}"><g id="pc-va"></g><circle id="pc-vaA" data-anchor="adeno" r="1" fill="none"/></g>
      <g data-node="promoter" data-color="${C.prot}" data-label="${T2('Pol II-promoter', 'Pol II promoter')}"><g id="pc-p2"></g><circle id="pc-p2A" data-anchor="promoter" r="1" fill="none"/></g>
      </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const setA = (id, x, y, on = 1) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); e.setAttribute('opacity', on ? 1 : 0); };
    const item = (x, y, text, col = C.rna) => `<rect x="${x - 150}" y="${y - 7}" width="26" height="8" rx="4" fill="${col}"/>` + txt(x - 112, y + 2, text, C.text, 17, 'start');
    const PROD = [
      [],
      [T2('mRNA (alle eiwitgenen)', 'mRNA (all protein genes)'), T2('snRNA\'s U1, U2, U4, U5', 'snRNAs U1, U2, U4, U5'), T2('pri-miRNA\'s', 'pri-miRNAs'), T2('lncRNA\'s', 'lncRNAs')],
      [T2('tRNA\'s', 'tRNAs'), '5S rRNA', 'U6 snRNA', T2('7SL-RNA (SRP)', '7SL RNA (SRP)'), T2('7SK-RNA', '7SK RNA')],
    ];
    return {
      update(t, s) {
        const { step, p } = s;
        // kolommen dimmen als een andere in focus is
        COLX.forEach((x, i) => {
          const focus = step >= 1 && step <= 3 ? (step - 1 === i ? 1 : .2) : step >= 4 ? .2 : 1;
          $('pc-col' + i).setAttribute('opacity', f1(focus)); $('pc-a' + i).setAttribute('opacity', step === 0 || step - 1 === i ? 1 : 0);
        });
        // gedeelde subeenheden (stap 0)
        $('pc-shr').innerHTML = step === 0 ? `<g opacity="${f1(sub(p, .45, .65))}">` + panel(430, 480, 740, 70) +
          txt(800, 523, T2('grijs = 5 gedeelde subeenheden (Rpb5, 6, 8, 10, 12)', 'grey = 5 shared subunits (Rpb5, 6, 8, 10, 12)'), C.text, 21) + '</g>' : '';

        // producten
        let pr = '', pr0 = '';
        const showProd = step >= 1 && step <= 3 ? step - 1 : -1;
        if (showProd === 0) {
          const x = COLX[0], y = 470;
          const cut = ease(sub(p, .35, .75));
          pr0 += txt(x, y - 16, T2('47S-voorloper (pre-rRNA)', '47S precursor (pre-rRNA)'), C.rna, 17);
          // segmenten: 5'ETS · 18S · ITS1 · 5.8S · ITS2 · 28S · 3'ETS (schematisch)
          const seg = [[60, 0, ''], [50, 1, '18S'], [22, 0, ''], [12, 1, '5,8S'], [24, 0, ''], [120, 1, '28S'], [12, 0, '']];
          let cx = x - 150;
          seg.forEach(([w, keep, lab], k) => {
            const gap = cut * 14 * k;
            const yy = y + (keep ? cut * 50 : cut * 20);
            pr0 += `<rect x="${f1(cx + gap)}" y="${f1(yy)}" width="${w}" height="12" rx="5" fill="${C.rna}" opacity="${f1(keep ? 1 : 1 - cut * .8)}"/>`;
            if (keep && cut > .5) pr0 += txt(cx + gap + w / 2, yy + 38, L({ nl: lab, en: lab.replace(',', '.') }), C.rna, 16);
            cx += w;
          });
          pr0 += txt(x, y + 118, T2('rDNA: honderden kopieën in tandem', 'rDNA: hundreds of tandem copies'), C.muted, 16) + txt(x, y + 142, T2('(5S rRNA komt van Pol III)', '(5S rRNA comes from Pol III)'), C.muted, 15);
        }
        if (showProd >= 1) {
          PROD[showProd].forEach((it, k) => { pr += `<g opacity="${f1(sub(p, .1 + k * .1, .25 + k * .1))}">` + item(COLX[showProd], 468 + k * 30, it) + '</g>'; });
        }
        $('pc-prod').innerHTML = pr; $('pc-prod0').innerHTML = pr0;
        // VA-RNA (stap 3) en Pol II-promoterknop (stap 2)
        const va = step === 3 ? sub(p, .6, .75) : 0;
        $('pc-va').innerHTML = va > .01 ? `<g opacity="${f1(va)}">` + item(COLX[2], 468 + 5 * 30, T2('adenovirus-VA-RNA\'s', 'adenovirus VA RNAs'), C.tdna) + '</g>' : '';
        setA('pc-vaA', COLX[2] + 150, 468 + 5 * 30 - 14, va > .5);
        const p2 = step === 2 ? sub(p, .6, .75) : 0;
        $('pc-p2').innerHTML = p2 > .01 ? `<g opacity="${f1(p2)}">` + txt(COLX[1], 610, T2('kernpromoter: TATA, Inr, DPE… + TFIID', 'core promoter: TATA, Inr, DPE… + TFIID'), C.muted, 16) + '</g>' : '';
        setA('pc-p2A', COLX[1], 634, p2 > .5);

        // Pol III-promoters (stap 4)
        let p3 = '';
        if (step === 4) {
          p3 += `<g>` + panel(40, 400, 1520, 430);
          const rows = [
            { y: 520, lab: T2('type 1 · 5S rRNA', 'type 1 · 5S rRNA'), el: [['A', 760, 800], ['IE', 830, 856], ['C', 890, 930]], f: [['TFIIIA', 868, 0], ['TFIIIC', 868, 1], ['TFIIIB', 606, 2]] },
            { y: 640, lab: T2('type 2 · tRNA', 'type 2 · tRNA'), el: [['A', 760, 800], ['B', 1000, 1040]], f: [['TFIIIC', 900, 0], ['TFIIIB', 606, 1]] },
            { y: 760, lab: T2('type 3 · U6 snRNA', 'type 3 · U6 snRNA'), el: [['DSE', 330, 400], ['PSE', 470, 530], ['TATA', 590, 640]], f: [['Oct-1', 365, 0], ['SNAPc', 490, 0], ['TFIIIB', 618, 1]], up: true },
          ];
          rows.forEach((r, ri) => {
            const y = r.y;
            p3 += txt(64, y + 8, r.lab, C.text, 22, 'start', 700);
            p3 += `<line x1="300" y1="${y}" x2="1500" y2="${y}" stroke="${C.dna}" stroke-width="7"/>`;
            p3 += `<rect x="700" y="${y - 12}" width="${r.up ? 300 : 460}" height="24" rx="6" fill="${C.rna}" fill-opacity=".18" stroke="${C.rna}" stroke-width="1.5"/>` +
              `<path d="M700,${y - 14} v-18 h20" stroke="${C.text}" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`;
            const te = (r.up ? 1000 : 1160);
            p3 += `<rect x="${te - 4}" y="${y - 12}" width="36" height="24" rx="4" fill="${C.danger}" fill-opacity=".55" stroke="${C.danger}"/>`;
            r.el.forEach(([n, a, b]) => { p3 += `<rect x="${a}" y="${y - 12}" width="${b - a}" height="24" rx="4" fill="#ffc247" fill-opacity=".35" stroke="#ffc247"/>` + txt((a + b) / 2, y + 42, n, '#ffc247', n.length > 3 ? 20 : 18, 'middle', 700); });
            // factoren verschijnen na elkaar, dan Pol III
            const t0 = .15 + ri * .22;
            r.f.forEach(([n, x, k]) => { p3 += pill(x, y - 36 - (n === 'TFIIIC' && ri === 0 ? 36 : 0), n.length * 13 + 26, 32, n, n === 'TFIIIB' ? '#b066c8' : '#6f5bd6', sub(p, t0 + k * .05, t0 + k * .05 + .05), 20); });
            p3 += `<g opacity="${f1(sub(p, t0 + .15, t0 + .2))}">` + prot(740, y - 44, 50, 28, PC[2], 1, 120 + ri, ri === 0 ? 'Pol III' : '', 20) + '</g>';
          });
          p3 += txt(1250, 446, T2('type 1–2: promoter in het gen', 'types 1–2: promoter inside the gene'), C.muted, 20) + txt(1250, 806, T2('rood = TTTT-terminator', 'red = TTTT terminator'), C.danger, 20);
          p3 += '</g>';
        }
        $('pc-p3').innerHTML = p3;

        // α-amanitine (stap 5)
        let am = '';
        if (step === 5) {
          am += `<g>` + panel(140, 400, 1320, 390);                  // grafiekkader meteen zichtbaar; de balken groeien
          am += txt(800, 444, T2('α-amanitine: 50 % remming (µg/ml, log-schaal)', 'α-amanitin: 50 % inhibition (µg/ml, log scale)'), C.text, 22);
          for (const c of [.01, .1, 1, 10, 100, 1000]) am += `<line x1="${f1(ax(c))}" y1="470" x2="${f1(ax(c))}" y2="690" stroke="#2a3a5f" stroke-width="1.5"/>` + txt(ax(c), 715, c >= 1 ? String(c) : String(c).replace('.', L({ nl: ',', en: '.' })), C.muted, 19, 'middle', 600, 'JetBrains Mono');
          AMA.forEach((a, i) => {
            const y = 505 + i * 62, g = ease(sub(p, .15 + i * .2, .35 + i * .2));
            const xe = lerp(ax(.01), a.res ? ax(1000) : ax(a.c), g);
            am += txt(ax(.01) - 20, y + 8, a.n, a.col, 22, 'end', 800);
            am += `<rect x="${f1(ax(.01))}" y="${y - 14}" width="${f1(ax(1000) - ax(.01))}" height="28" rx="6" fill="${a.col}" fill-opacity=".06" stroke="${a.col}" stroke-opacity=".75" stroke-width="2"/>`;
            am += `<rect x="${f1(ax(.01))}" y="${y - 14}" width="${f1(Math.max(0, xe - ax(.01)))}" height="28" rx="6" fill="${a.col}" fill-opacity="${a.res ? .25 : .7}" ${a.res ? `stroke="${a.col}" stroke-dasharray="5 4"` : ''}/>`;
            if (g > .9) am += a.res ? txt(ax(1000) - 10, y + 6, T2('niet geremd bij ≤ 200 → resistent', 'not inhibited at ≤ 200 → resistant'), '#fff', 20, 'end')
              : txt(xe + 12, y + 6, `${String(a.c).replace('.', L({ nl: ',', en: '.' }))} µg/ml`, '#fff', 20, 'start', 700);
          });
          am += txt(800, 772, T2('humane KB-cellen · Weinmann et al., PNAS 1974', 'human KB cells · Weinmann et al., PNAS 1974'), C.muted, 19) + '</g>';
        }
        $('pc-ama').innerHTML = am;
      },
    };
  },
};
