import { C, T2, svgOpen, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { T, TL, smooth, tag, arrowDefs, arr, phos, panel, spark, PHOS } from '../prot/_b_kit.js';
import { K, kinase, chip, pdot } from './rtk.js';

/*
 * Verhaallijn 2, hoofdstuk "srf": het serum-responselement (SRE) van het FOS-gen in de kern.
 * DNA horizontaal (y 560); links het SRE (Ets-plek + CArG-box), een breuk (≈ 300 bp), dan TATA, startplaats en het FOS-gen.
 */
const DY = 560;
const ETS = [322, 388], CARG = [400, 540], TATA = [805, 860], TSS = 900, BRK = 660;
const SRF = '#8fe06f', ELK = '#f5d547', MED = '#6f5bd6', POL = '#9b7bff', FOS = '#ff7eb6', JUN = '#4fd1c5';
const ETSC = [355, 522], SRF1 = [438, 518], SRF2 = [503, 518];
const TAD = [[352, 486], [330, 446], [300, 416], [266, 398], [236, 372], [214, 340]];
const SER = [3, 4];                                  // indexen in TAD met Ser383 en Ser389
const ERK_IN = [470, 40], ERK_D = [150, 262];
const POL0 = 1012, POL1 = 1340;
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* DNA als twee golvende strengen met sporten */
function dna(x0, x1, y, amp = 11, per = 68) {
  const s1 = [], s2 = [];
  for (let x = x0; x <= x1; x += 8) { const a = Math.sin((x / per) * 2 * Math.PI) * amp; s1.push(`${x},${f1(y + a)}`); s2.push(`${x},${f1(y - a)}`); }
  let rungs = '';
  for (let x = x0 + 6; x <= x1; x += 14) { const a = Math.sin((x / per) * 2 * Math.PI) * amp; rungs += `M${x},${f1(y + a)}L${x},${f1(y - a)}`; }
  return `<path d="${rungs}" stroke="#6f86b8" stroke-width="3" opacity=".6"/><path d="M${s2.join('L')}" stroke="${C.dna2}" stroke-width="6" fill="none"/><path d="M${s1.join('L')}" stroke="${C.dna}" stroke-width="6" fill="none"/>`;
}
const box = (a, b, col, op = .28) => `<rect x="${a}" y="${DY - 26}" width="${b - a}" height="52" rx="8" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-width="2"/>`;
const blobP = (cx, cy, rx, ry, col, fo = .28) => `<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity="${fo}" stroke="${col}" stroke-width="3"/>`;

const SCENE = {
  id: 'srf',
  title: { nl: 'Onmiddellijk-vroege genen (SRE)', en: 'Immediate early genes (SRE)' },
  scale: { nl: 'niet op schaal (SRE ≈ 300 bp vóór de startplaats van FOS)', en: 'not to scale (SRE ≈ 300 bp upstream of the FOS start site)' },
  time: { nl: 'FOS-transcriptie start binnen minuten na het signaal', en: 'FOS transcription starts within minutes of the signal' },
  org: { nl: 'mens (FOS-gen, chromosoom 14)', en: 'human (FOS gene, chromosome 14)' },
  legend: [[C.dna, 'DNA'], [SRF, { nl: 'SRF (dimeer)', en: 'SRF (dimer)' }], [ELK, { nl: 'Elk-1 (TCF)', en: 'Elk-1 (TCF)' }], [K.erk, 'ERK'], [PHOS, { nl: 'fosfaat', en: 'phosphate' }],
    [MED, 'Mediator'], [POL, { nl: 'RNA-polymerase II', en: 'RNA polymerase II' }], [C.rna, 'FOS-(pre-)mRNA'], [FOS, 'c-Fos'], [JUN, 'c-Jun']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">CArG-box: CC(A/T)₆GG. Ets-kernsequentie: GGA(A/T). AP-1-plaats (TRE): TGA(C/G)TCA. 3D: ternair complex SAP-1/SRF/c-fos-SRE PDB <a href="https://www.rcsb.org/structure/1K6O" target="_blank" rel="noopener">1K6O</a> (SAP-1 is een TCF zoals Elk-1); c-Fos–c-Jun op DNA PDB <a href="https://www.rcsb.org/structure/1FOS" target="_blank" rel="noopener">1FOS</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">CArG box: CC(A/T)₆GG. Ets core sequence: GGA(A/T). AP-1 site (TRE): TGA(C/G)TCA. 3D: ternary complex SAP-1/SRF/c-fos SRE PDB <a href="https://www.rcsb.org/structure/1K6O" target="_blank" rel="noopener">1K6O</a> (SAP-1 is a TCF like Elk-1); c-Fos–c-Jun on DNA PDB <a href="https://www.rcsb.org/structure/1FOS" target="_blank" rel="noopener">1FOS</a>.</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal. Het SRE ligt ~300 bp vóór de startplaats; de breuk in het DNA staat voor dat stuk. Nucleosomen, andere promoterelementen van FOS (bv. het CRE, waarop CREB bindt) en CBP/p300 zijn weggelaten. Aan FOS kan Pol II al vóór het signaal klaarstaan; dat tonen we niet apart. Elk-1 heeft meerdere fosforyleringsplaatsen; we tonen er twee (Ser383, Ser389). Het c-Fos-eiwit wordt pas gemaakt na processing, export en translatie van het mRNA (volgende hoofdstukken).',
    en: 'Schematic and not to scale. The SRE lies ~300 bp upstream of the start site; the break in the DNA stands for that stretch. Nucleosomes, other FOS promoter elements (e.g. the CRE, bound by CREB) and CBP/p300 are omitted. At FOS, Pol II can already be waiting before the signal arrives; we do not show this separately. Elk-1 has several phosphorylation sites; we show two (Ser383, Ser389). The c-Fos protein is only made after processing, export and translation of the mRNA (next chapters).' },
  steps: [
    ST(7000, cam(800, 450, 1600), 'In de kern: het FOS-gen', 'In the nucleus: the FOS gene',
      'Actief ERK komt de kern binnen. Vóór het FOS-gen ligt het serum-responselement (SRE), waarop al transcriptiefactoren zitten te wachten.',
      'Active ERK enters the nucleus. Upstream of the FOS gene lies the serum response element (SRE), where transcription factors are already waiting.'),
    ST(8000, cam(440, 500, 900), 'SRF-dimeer op de CArG-box', 'SRF dimer on the CArG box',
      'Het hart van het SRE is de CArG-box, CC(A/T)₆GG. Daarop zit een dimeer van SRF (serum-responsfactor).',
      'The core of the SRE is the CArG box, CC(A/T)₆GG. A dimer of SRF (serum response factor) sits on it.'),
    ST(8000, cam(400, 470, 900), 'Elk-1 op de Ets-plek ernaast', 'Elk-1 on the neighbouring Ets site',
      'Vlak naast de CArG-box ligt een Ets-plek (kern GGA). Elk-1, een TCF, bindt daar alleen samen met SRF: SRF–Elk-1–DNA is het ternaire complex.',
      'Right next to the CArG box lies an Ets site (core GGA). Elk-1, a TCF, binds there only together with SRF: SRF–Elk-1–DNA is the ternary complex.'),
    ST(8500, cam(330, 400, 900), 'ERK fosforyleert Elk-1', 'ERK phosphorylates Elk-1',
      'ERK koppelt aan Elk-1 en zet fosfaten op meerdere plaatsen in het C-terminale activatiedomein, o.a. Ser383 en Ser389.',
      'ERK docks onto Elk-1 and adds phosphates at several sites in the C-terminal activation domain, including Ser383 and Ser389.'),
    ST(8500, cam(640, 420, 1200), 'Mediator slaat de brug', 'Mediator bridges the gap',
      'Het gefosforyleerde activatiedomein bindt co-activatoren, o.a. het Mediator-complex (via MED23). Mediator verbindt het SRE met RNA-polymerase II aan de kernpromoter.',
      'The phosphorylated activation domain binds co-activators, including the Mediator complex (via MED23). Mediator connects the SRE to RNA polymerase II at the core promoter.'),
    ST(9000, cam(1000, 460, 1300), 'FOS wordt afgeschreven', 'FOS is transcribed',
      'RNA-polymerase II vertrekt en schrijft FOS af: binnen enkele minuten na het signaal ontstaat FOS-pre-mRNA.',
      'RNA polymerase II sets off and transcribes FOS: within minutes of the signal FOS pre-mRNA appears.'),
    ST(8500, cam(800, 450, 1600), 'Een onmiddellijk-vroeg gen', 'An immediate early gene',
      'Alle eiwitten voor deze schakelaar waren al aanwezig; alleen fosforylering was nodig. Daarom gaat FOS zelfs aan als de eiwitsynthese geblokkeerd is.',
      'All proteins for this switch were already present; only phosphorylation was needed. That is why FOS switches on even when protein synthesis is blocked.'),
    ST(9000, cam(1150, 600, 1100), 'Straks: c-Fos + c-Jun = AP-1', 'Later: c-Fos + c-Jun = AP-1',
      'Na processing, export en translatie vormt het c-Fos-eiwit met c-Jun de transcriptiefactor AP-1. AP-1 bindt TRE-plaatsen en zet zo latere genen aan.',
      'After processing, export and translation, the c-Fos protein forms the transcription factor AP-1 with c-Jun. AP-1 binds TRE sites and so switches on later genes.'),
    ST(8500, cam(800, 450, 1600), 'Een kort signaal – verder met FOS', 'A brief signal – on with FOS',
      'Fosfatasen zetten ERK en Elk-1 weer uit, en FOS-mRNA en c-Fos zijn kortlevend: de puls is tijdelijk. Volg nu het FOS-gen via de promoter en de transcriptie.',
      'Phosphatases switch ERK and Elk-1 off again, and FOS mRNA and c-Fos are short-lived: the pulse is transient. Now follow the FOS gene via the promoter and transcription.'),
  ],
  loop: false,
  svg() {
    return svgOpen(arrowDefs('sf', { m: C.muted, w: '#fff', r: C.rna })) + `
    <rect x="-600" y="-600" width="2800" height="2100" fill="url(#gNuc)"/>
    <g id="sf-sites">${box(ETS[0], ETS[1], ELK)}${box(CARG[0], CARG[1], SRF)}${box(TATA[0], TATA[1], '#ffc247')}
      <rect x="${TSS}" y="${DY - 26}" width="900" height="52" rx="8" fill="${C.dna}" fill-opacity=".14" stroke="${C.dna}" stroke-width="2" stroke-dasharray="8 6"/></g>
    ${dna(-300, 1900, DY)}
    <g><rect x="${BRK - 16}" y="${DY - 40}" width="32" height="80" fill="#12203f"/><path d="M${BRK - 22},${DY + 34} L${BRK - 4},${DY - 34} M${BRK + 4},${DY + 34} L${BRK + 22},${DY - 34}" stroke="#dfe6f5" stroke-width="4"/></g>
    <path d="M${TSS},${DY - 30} L${TSS},${DY - 64} L${TSS + 26},${DY - 64}" stroke="#fff" stroke-width="5" fill="none" marker-end="url(#sf-w)"/>
    <g data-node="promoter" data-color="#ffc247" data-label="${T2('Promoter & PIC →', 'Promoter & PIC →')}"><rect x="${TATA[0] - 10}" y="${DY - 30}" width="${TATA[1] - TATA[0] + 20}" height="60" fill="transparent"/><g id="sf-prA"><circle data-anchor="promoter" data-pos="below" cx="${(TATA[0] + TATA[1]) / 2}" cy="${DY + 40}" r="1" fill="none"/></g></g>
    <g data-node="genregulatie" data-color="${MED}" data-label="${T2('Genregulatie', 'Gene regulation')}"><g id="sf-med"></g><g id="sf-grA"><circle data-anchor="genregulatie" cx="600" cy="245" r="1" fill="none"/></g></g>
    <g id="sf-tf"></g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Transcriptie →', 'Transcription →')}"><g id="sf-pol"></g><g id="sf-txA"><circle id="sf-txC" data-anchor="transcriptie" cx="${POL0}" cy="${DY - 80}" r="1" fill="none"/></g></g>
    <g data-node="mapk" data-color="${K.erk}" data-label="${T2('← Ras–MAPK-cascade', '← Ras–MAPK cascade')}"><g id="sf-erk"></g><g id="sf-mkA"><circle id="sf-mkC" data-anchor="mapk" cx="0" cy="0" r="1" fill="none"/></g></g>
    <g id="sf-panel"></g>
    <g id="sf-lbl"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const cw = SCENE.steps[step]?.cam?.[2] ?? 1600;
        /* ---- toestand ---- */
        const erkK = step === 0 ? ease(sub(p, .1, .9)) : 1;                          // ERK komt binnen
        const dockK = step < 3 ? 0 : step === 3 ? ease(sub(p, 0, .3)) : 1;            // ERK koppelt aan Elk-1
        const erkLeave = step < 8 ? 0 : ease(sub(p, .05, .5));
        const phK = step < 3 ? 0 : step === 3 ? sub(p, .35, .75) * 2 : step === 8 ? 2 - 2 * sub(p, .2, .6) : 2;
        const medK = step < 4 ? 0 : step === 4 ? ease(sub(p, .05, .5)) : 1;
        const polX = step < 5 ? POL0 : step === 5 ? lerp(POL0, POL1, ease(sub(p, .1, 1))) : POL1;
        const rnaLen = step < 5 ? 0 : step === 5 ? ease(sub(p, .15, 1)) : 1;
        const rnaFade = step === 8 ? 1 - .75 * sub(p, .2, .7) : 1;

        /* ---- transcriptiefactoren op het SRE ---- */
        let tf = '';
        tf += `<path d="${smooth([[ETSC[0] + 18, ETSC[1] - 30], [400, 474], [SRF1[0] - 6, SRF1[1] - 40]])}" stroke="${ELK}" stroke-width="6" fill="none"/>`;     // B-box-contact
        tf += `<path d="${smooth(TAD)}" stroke="${ELK}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
        tf += blobP(SRF1[0], SRF1[1], 34, 44, SRF, .35) + blobP(SRF2[0], SRF2[1], 34, 44, SRF, .35);
        tf += blobP(ETSC[0], ETSC[1], 32, 40, ELK, .35);
        SER.forEach((i, j) => {
          const [x, y] = TAD[i], k = clamp(phK - j);
          tf += k >= .5 ? pdot(x, y, 15, cw) : chip(x, y, 13, 'S', K.tyr, cw);
          if (step === 3 && k > 0 && k < 1) tf += spark(x, y, k, PHOS);
        });
        if (step === 3 || step === 4) tf += `<circle cx="${TAD[5][0]}" cy="${TAD[5][1]}" r="${f1(12 + 6 * medK)}" fill="${ELK}" opacity=".0"/>`;
        $('sf-tf').innerHTML = tf;

        /* ---- ERK ---- */
        let er = '';
        const ein = [lerp(ERK_IN[0], 300, erkK), lerp(ERK_IN[1], 140, erkK)];
        let ep = [lerp(ein[0], ERK_D[0], dockK), lerp(ein[1], ERK_D[1], dockK)];
        if (erkLeave > 0) ep = [lerp(ERK_D[0], 60, erkLeave), lerp(ERK_D[1], 120, erkLeave)];
        const erkP = 1 - (step === 8 ? sub(p, .3, .7) : 0);
        er += kinase(ep[0], ep[1], K.erk, { sc: .75, on: erkP });
        er += T(ep[0], ep[1] + 54, 'ERK', { size: 20, col: '#fff', w: 800 });
        er += pdot(ep[0] + 52, ep[1] + 20, 12, cw, erkP) + pdot(ep[0] + 54, ep[1] + 68, 12, cw, erkP);
        $('sf-erk').innerHTML = er;
        $('sf-mkC').setAttribute('cx', f1(ep[0])); $('sf-mkC').setAttribute('cy', f1(ep[1] - 30));
        $('sf-mkA').setAttribute('opacity', step === 0 ? sub(p, .8, .9) : 0);

        /* ---- Mediator ---- */
        let md = '';
        if (medK > .01) {
          const my = lerp(120, 0, medK);
          const pts = [[284, 392], [340, 300], [520, 262], [720, 268], [880, 322], [1012, 458], [960, 468], [800, 420], [640, 392], [470, 402], [350, 428]];
          md += `<path d="${smooth([...pts, pts[0]].map(([x, y]) => [x, y - my]))}Z" fill="${MED}" fill-opacity=".3" stroke="${MED}" stroke-width="3" opacity="${f1(medK)}"/>`;
          md += T(620, 340 - my, 'Mediator', { size: 28, col: '#fff', w: 800, op: medK });
          md += T(372, 372 - my, 'MED23', { size: 22, col: '#d6ccff', w: 700, op: sub(medK, .6, 1) });
        }
        $('sf-med').innerHTML = md;
        $('sf-grA').setAttribute('opacity', (step === 4 && p > .6) || step === 8 ? 1 : 0);

        /* ---- Pol II + TFIID + RNA ---- */
        let pl = '';
        pl += blobP((TATA[0] + TATA[1]) / 2, DY - 44, 34, 22, '#c9b8ff', .3);                        // TFIID (TBP) op TATA
        pl += `<ellipse cx="${f1(polX)}" cy="${DY - 18}" rx="78" ry="58" fill="${POL}" fill-opacity=".32" stroke="${POL}" stroke-width="3"/>`;
        pl += T(polX, DY - 22, 'Pol II', { size: 22, col: '#fff', w: 800 });
        if (rnaLen > 0) {
          const n = 14, pts = [];
          for (let i = 0; i <= n; i++) { const u = i / n * rnaLen; pts.push([polX - 30 - u * 330, DY - 80 - u * 190 + Math.sin(u * 14) * 16]); }
          pl += `<path d="${smooth(pts)}" stroke="${C.rna}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${f1(rnaFade)}"/>`;
          const e = pts[pts.length - 1];
          if (rnaLen > .3) pl += T(e[0] + 8, e[1] - 24, "5'", { size: 20, col: C.rna, w: 800, op: rnaFade });
        }
        pl += `<rect x="${f1(polX - 80)}" y="${DY - 80}" width="160" height="120" fill="transparent"/>`;
        $('sf-pol').innerHTML = pl;
        $('sf-txC').setAttribute('cx', f1(polX)); $('sf-txC').setAttribute('cy', DY - 84);
        $('sf-txA').setAttribute('opacity', step === 5 || step === 8 ? 1 : 0);
        $('sf-prA').setAttribute('opacity', step === 4 || step === 8 ? 1 : 0);

        /* ---- panelen ---- */
        let pn = '';
        const pan6 = (p, fade = 1) => {
          const k = sub(p, .1, .35);
          let o = panel(660, 612, 600, 180, { col: C.ok, op: k });
          o += T(960, 652, T2('onmiddellijk-vroeg gen', 'immediate early gene'), { size: 30, col: C.ok, w: 800, op: k });
          const lines = [T2('✓ alle eiwitten al aanwezig', '✓ all proteins already present'), T2('✓ enkel fosforylering nodig', '✓ only phosphorylation needed'), T2('✓ ook zonder eiwitsynthese', '✓ even without protein synthesis')];
          lines.forEach((l, i) => { o += T(690, 694 + i * 36, l, { size: 25, anchor: 'start', w: 600, op: sub(p, .25 + i * .15, .4 + i * .15) }); });
          return fade > .01 ? `<g opacity="${f1(fade)}">${o}</g>` : '';
        };
        const pan7 = (p, fade = 1) => {
          const k = sub(p, 0, .25), y = 762;
          let o = panel(900, 622, 660, 205, { col: FOS, op: 1 });
          o += `<path d="M930,${y} L1530,${y}" stroke="${C.dna}" stroke-width="7"/><path d="M930,${y + 12} L1530,${y + 12}" stroke="${C.dna2}" stroke-width="7"/>` +
            `<rect x="1140" y="${y - 10}" width="170" height="32" rx="6" fill="#ffc247" fill-opacity=".25" stroke="#ffc247" stroke-width="2"/>`;
          const d = ease(sub(p, .2, .6));
          const fx = lerp(1030, 1170, d), jx = lerp(1430, 1282, d), by = lerp(690, 718, d);
          o += blobP(fx, by, 56, 32, FOS, .4) + blobP(jx, by, 56, 32, JUN, .4);
          o += T(fx, by + 8, 'c-Fos', { size: 20, col: '#fff', w: 800 }) + T(jx, by + 8, 'c-Jun', { size: 20, col: '#fff', w: 800 });
          if (d > .9) o += `<path d="M1212,690 Q1226,672 1240,690" stroke="#fff" stroke-width="3" fill="none"/>`;
          o += T(1226, 662, 'AP-1', { size: 28, col: '#fff', w: 800, op: sub(p, .55, .7) });
          o += T(1225, y + 48, 'TGA(C/G)TCA', { size: 20, col: '#ffc247', w: 700, font: 'JetBrains Mono', op: sub(p, .6, .75) });
          o += T(1360, 662, T2('→ latere genen', '→ later genes'), { size: 22, col: C.ok, anchor: 'start', op: sub(p, .7, .85) });
          const op = k * fade;
          return op > .01 ? `<g opacity="${f1(op)}">${o}</g>` : '';
        };
        if (step === 6) pn += pan6(p);
        if (step === 7) pn += pan6(1, 1 - sub(p, 0, .2)) + pan7(p);
        if (step === 8) pn += pan7(1, 1 - sub(p, 0, .25));
        $('sf-panel').innerHTML = pn;

        /* ---- labels ---- */
        let lb = '';
        const L = (x, y, s, o = {}) => { lb += T(x, y, s, { size: 24, ...o }); };
        if (step === 0 || step === 8) {
          L(1300, DY + 70, T2('FOS-gen', 'FOS gene'), { col: C.dna2, size: 28, w: 800 });
          L(430, DY + 80, 'SRE', { col: '#fff', size: 28, w: 800 });
          L(BRK, DY + 80, '≈ 300 bp', { col: C.muted, size: 22 });
          L(TATA[0] + 20, DY + 80, 'TATA', { col: '#ffc247', size: 22 });
        }
        if (step === 0) {
          L(ep[0] + 80, ep[1] + 40, 'ERK-P-P', { anchor: 'start', col: K.erk, w: 800, op: sub(p, .6, .8) });
          L(470, 420, 'SRF + Elk-1', { col: '#fff' });
        }
        if (step === 1) {
          L(470, 438, T2('SRF-dimeer', 'SRF dimer'), { col: SRF, w: 800, op: sub(p, .1, .3) });
          L(470, DY + 60, 'CArG', { col: SRF, w: 800, size: 24 });
          L(470, DY + 92, 'CC(A/T)₆GG', { col: '#dfe6f5', size: 22, font: 'JetBrains Mono', w: 700, op: sub(p, .3, .5) });
        }
        if (step === 2) {
          L(355, DY + 60, 'Ets', { col: ELK, w: 800 });
          L(355, DY + 92, 'GGA', { col: '#dfe6f5', size: 22, font: 'JetBrains Mono', w: 700 });
          L(470, DY + 60, 'CArG', { col: SRF, w: 800 });
          L(312, 520, 'Elk-1', { col: ELK, w: 800, anchor: 'end', op: sub(p, .1, .3) });
          L(560, 440, T2('ternair complex', 'ternary complex'), { col: '#fff', anchor: 'start', op: sub(p, .5, .7) });
        }
        if (step === 3) {
          L(290, 478, T2('activatiedomein', 'activation domain'), { col: ELK, anchor: 'end', size: 22, op: sub(p, .05, .2) });
          L(290, 330, 'Ser383 · Ser389', { col: PHOS, anchor: 'start', size: 22, op: sub(p, .7, .85) });
        }
        if (step === 4) {
          L(430, DY + 70, 'SRE', { col: '#fff', size: 24, w: 800 });
          L(BRK, DY + 70, '≈ 300 bp', { col: C.muted, size: 22 });
        }
        if (step === 5) {
          L(polX - 380, 250, T2('FOS-pre-mRNA', 'FOS pre-mRNA'), { col: C.rna, w: 800, op: sub(p, .5, .7) });
          L(1480, DY + 70, T2('FOS-gen', 'FOS gene'), { col: C.dna2, w: 800 });
        }
        if (step === 6) {
          L(430, DY + 80, 'SRE', { col: '#fff', size: 28, w: 800 });
        }
        if (step === 8) {
          L(205, 335, T2('P eraf (fosfatase)', 'P removed (phosphatase)'), { col: '#ffb3c7', size: 22, anchor: 'end', op: sub(p, .5, .7) });
          L(1190, 360, T2('kortlevend', 'short-lived'), { col: C.rna, size: 22, anchor: 'start', op: sub(p, .5, .7) });
        }
        $('sf-lbl').innerHTML = lb;
      },
    };
  },
};
export default SCENE;
