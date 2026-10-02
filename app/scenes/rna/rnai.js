import { C, BASE, RNA_PAIR, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, capG, ribo, note, arrow, snip, hb, npairs, hot, setHot } from './_rna.js';

/*
 * miRNA-route en RNA-interferentie (mens). Voorbeeld-miRNA: let-7a-5p (22 nt).
 * Kern links (x < 640), cytoplasma rechts. Haarspeld in lokale coördinaten: basis (knipplaats Drosha) = (0,0), stam omhoog.
 */
const GUIDE = 'UGAGGUAGUAGGUUGUAUAGUU';            // let-7a-5p, 5'→3'
const NB = GUIDE.length;                            // 22
const BP = 8;                                      // px per basenpaar in de haarspeld
const MEM = 500;                                    // x van de kernenvelop
const PORE_Y = 450;
const XR = 1520, W = 30, YG = 610, YT = 684;        // AGO2-detail: gids-nt i op x = XR − (i−1)·W (5' rechts)
const gx = i => XR - (i - 1) * W;
const NOPAIR = { U: 'C', G: 'A', A: 'C', C: 'A' };
// doelwit bij miRNA: seed 2–8 + aanvullend 13–16; bij siRNA: alles complementair
const tgtMi = i => (i >= 2 && i <= 8) || (i >= 13 && i <= 16) ? RNA_PAIR[GUIDE[i - 1]] : i === 1 ? 'A' : NOPAIR[GUIDE[i - 1]];
const tgtSi = i => RNA_PAIR[GUIDE[i - 1]];

const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'rnai',
  title: { nl: 'miRNA & RNA-interferentie', en: 'miRNA & RNA interference' },
  scale: '≈ 30 nm',
  time: { nl: 'minuten – uren (hier vertraagd)', en: 'minutes – hours (slowed down here)' },
  org: { nl: 'mens (voorbeeld let-7a)', en: 'human (example let-7a)' },
  legend: [[C.rna, { nl: 'RNA (pri-/pre-miRNA, doel-mRNA)', en: 'RNA (pri-/pre-miRNA, target mRNA)' }], ['#e0679a', { nl: 'gidsstreng (miRNA)', en: 'guide strand (miRNA)' }], ['#9a8fb0', { nl: 'passagiersstreng', en: 'passenger strand' }], [C.prot, { nl: 'Drosha, Dicer, AGO2 …', en: 'Drosha, Dicer, AGO2 …' }], [C.dna, 'DNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Het RNA-duplex is <b>A-vorm</b> (zie RNA-structuur). De <b>seed</b> (nt 2–8 van de gids) bepaalt grotendeels welke mRNA\'s worden herkend; daardoor kan één miRNA honderden mRNA\'s remmen. Let op: in tegenstelling tot mRNA gebruikt pre-miRNA-export wél RanGTP (Exportine-5).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The RNA duplex is <b>A-form</b> (see RNA structure). The <b>seed</b> (nt 2–8 of the guide) largely determines which mRNAs are recognised, so one miRNA can repress hundreds of mRNAs. Note: unlike mRNA, pre-miRNA export does use RanGTP (Exportin-5).</p>' },
  simplified: {
    nl: 'De haarspeld is ingekort en recht getekend (echte pri-miRNA-stammen ≈ 35 bp met mismatches en bulges). Microprocessor = 1 Drosha + 2 DGCR8. Het laden in AGO2 vraagt chaperones (HSC70/HSP90) die niet getekend zijn. Mensen hebben 4 AGO-eiwitten; vrijwel alleen AGO2 knipt (AGO3 slechts beperkt). Het siRNA wordt hier met dezelfde gidsvolgorde getoond om het verschil in paring te laten zien.',
    en: 'The hairpin is shortened and drawn straight (real pri-miRNA stems ≈ 35 bp with mismatches and bulges). Microprocessor = 1 Drosha + 2 DGCR8. Loading into AGO2 needs chaperones (HSC70/HSP90) that are not drawn. Humans have 4 AGO proteins; essentially only AGO2 slices (AGO3 only weakly). The siRNA is shown with the same guide sequence to highlight the difference in pairing.' },
  steps: [
    ST(7500, cam(300, 420, 820), "Een gen voor een mini-RNA", "A gene for a mini RNA",
      "Een gen voor een microRNA (een heel kort regel-RNA) wordt afgelezen. Dat RNA is nog lang en vouwt tot een haarspeld.",
      "A gene for a microRNA (a very short control RNA) is read. That RNA is still long and folds into a hairpin."),
    ST(7500, cam(300, 412, 760), "Een eerste knip in de kern", "A first cut in the nucleus",
      "In de kern knipt een enzym de haarspeld los aan de voet. Er blijft een korte haarspeld over.",
      "In the nucleus an enzyme cuts the hairpin free at its base. A short hairpin remains."),
    ST(8500, cam(620, 450, 1000), "Door de kernporie naar buiten", "Out through the nuclear pore",
      "Een transporteiwit brengt de korte haarspeld door de kernporie naar het cytoplasma.",
      "A transport protein carries the short hairpin through the nuclear pore to the cytoplasm."),
    ST(7500, cam(930, 450, 720), "De lus gaat eraf", "The loop comes off",
      "Een tweede enzym knipt de lus eraf. Er blijft een kort dubbel RNA-stukje over van zo’n 22 bouwstenen.",
      "A second enzyme cuts off the loop. What remains is a short double piece of RNA of about 22 building blocks."),
    ST(8000, cam(1180, 560, 1000), "In het zoekeiwit", "Into the search protein",
      "Het stukje gaat in een zoekeiwit (Argonaute). Eén streng blijft als gids, de andere wordt verwijderd.",
      "The piece goes into a search protein (Argonaute). One strand stays as the guide, the other is removed."),
    ST(8500, cam(1210, 640, 820), "De gids zoekt een mRNA", "The guide finds an mRNA",
      "Een klein stukje van de gids past op het eindstuk van een mRNA, achter het stopsein. De rest past meestal maar deels.",
      "A small part of the guide matches the end piece of an mRNA, after the stop signal. The rest usually matches only partly."),
    ST(9000, cam(1130, 600, 1300), "Minder eiwit, dan afbraak", "Less protein, then breakdown",
      "Het zoekeiwit laat de staart van het mRNA inkorten. Het mRNA wordt minder gelezen en daarna afgebroken.",
      "The search protein has the tail of the mRNA shortened. The mRNA is read less and then broken down."),
    ST(8500, cam(1210, 640, 820), "Past de gids perfect? Dan knippen", "A perfect match? Then cut",
      "Past de gids perfect, zoals bij een siRNA (een verwant klein RNA), dan knipt het zoekeiwit het mRNA door.",
      "If the guide matches perfectly, as with an siRNA (a related small RNA), the search protein cuts the mRNA."),
  ],
  svg() {
    return svgOpen() + `
    <rect x="-800" y="-600" width="${MEM + 800}" height="2200" fill="url(#gNuc)" opacity=".55"/>
    <g data-node="export" data-color="#8a9bc4" data-label="${T2('Kernporie (vgl. mRNA-export)', 'Nuclear pore (cf. mRNA export)')}">
      <path d="M${MEM - 20},-600 V${PORE_Y - 60} Q${MEM - 20},${PORE_Y - 40} ${MEM},${PORE_Y - 40} Q${MEM + 20},${PORE_Y - 40} ${MEM + 20},${PORE_Y - 60} V-600" stroke="#c9a574" stroke-width="7" fill="none" opacity=".75"/>
      <path d="M${MEM - 20},1500 V${PORE_Y + 60} Q${MEM - 20},${PORE_Y + 40} ${MEM},${PORE_Y + 40} Q${MEM + 20},${PORE_Y + 40} ${MEM + 20},${PORE_Y + 60} V1500" stroke="#c9a574" stroke-width="7" fill="none" opacity=".75"/>
      <rect x="${MEM - 34}" y="${PORE_Y - 88}" width="68" height="34" rx="12" fill="#3b4a72" stroke="#8a9bc4" stroke-width="3"/>
      <rect x="${MEM - 34}" y="${PORE_Y + 54}" width="68" height="34" rx="12" fill="#3b4a72" stroke="#8a9bc4" stroke-width="3"/>
    </g>
    ${note(MEM - 40, 220, T2('kern', 'nucleus'), C.muted, 20, 'end')}${note(MEM + 40, 220, T2('cytoplasma', 'cytoplasm'), C.muted, 20, 'start')}
    <g data-node="dnahelix" data-color="${C.dna}" data-nolabel><g id="ri-dna"></g></g><g data-node="gen" data-color="${C.dna}" data-nolabel><g id="ri-gen"></g></g><g data-node="rnapol" data-color="${C.prot}" data-nolabel><g id="ri-pol"></g></g><g data-node="rnastructuur" data-color="${C.rna}" data-nolabel><g id="ri-hp"></g></g><g id="ri-enz"></g><g id="ri-ago"></g><g data-node="translatie" data-color="${C.rna}" data-nolabel><g id="ri-tgt"></g></g><g data-node="ribosoom" data-color="${C.rrna}" data-nolabel><g id="ri-rib"></g></g><g data-node="mrnaafbraak" data-color="#8a5a3a" data-nolabel><g id="ri-dec"></g></g>
    ${hot('rnapol', T2('RNA-polymerase II', 'RNA polymerase II'), C.prot, 'ri-hP')}
    ${hot('rnastructuur', T2('dsRNA-stam (atlas)', 'dsRNA stem (atlas)'), C.rna, 'ri-hA', '../atlas/index.html?id=dsrna')}
    ${hot('mrnaafbraak', T2('→ mRNA-afbraak', '→ mRNA decay'), '#8a5a3a', 'ri-tA')}
    ${hot('rnai', T2('miRNA in AGO2 (atlas)', 'miRNA in AGO2 (atlas)'), '#e0679a', 'ri-gA', '../atlas/index.html?id=mirna')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);

    /* haarspeld in lokale coördinaten (stam langs −y). basal = aantal bp onder de knipplaats; loopCut = lus nog aanwezig */
    function hairpin({ basal = 0, flank = 0, loop = 1, duplexOnly = 0, passOp = 1, guideOp = 1 }) {
      const top = -NB * BP, xL = -12, xR = 12;
      let s = '';
      const pass = '#9a8fb0', gcol = '#e0679a', sc = C.rna;
      // basale stam + flanken (pri-miRNA)
      if (basal > 0) {
        s += `<path d="M${xL - 180 * flank},${basal * BP + 6} ${flank ? `Q${xL - 40},${basal * BP + 8} ${xL},${basal * BP}` : ''} L${xL},0" stroke="${sc}" stroke-width="7" fill="none"/>`;
        s += `<path d="M${xR},2 L${xR},${basal * BP} ${flank ? `Q${xR + 40},${basal * BP + 8} ${xR + 200 * flank},${basal * BP + 6}` : ''}" stroke="${sc}" stroke-width="7" fill="none"/>`;
        for (let k = 1; k < basal; k++) s += `<line x1="${xL + 4}" y1="${k * BP}" x2="${xR - 4}" y2="${k * BP}" stroke="#fff" stroke-width="2" opacity=".5"/>`;
      }
      // 5p-arm (links, wordt de gids) en 3p-arm (rechts, passagier) — de 3p-arm steekt 2 nt uit aan de basis
      const c5 = duplexOnly ? gcol : sc, c3 = duplexOnly ? pass : sc;
      s += `<g opacity="${f1(guideOp)}"><line x1="${xL}" y1="0" x2="${xL}" y2="${top + (duplexOnly ? 0 : 0)}" stroke="${c5}" stroke-width="7" stroke-linecap="round"/></g>`;
      s += `<g opacity="${f1(passOp)}"><line x1="${xR}" y1="${2 * BP}" x2="${xR}" y2="${top - (duplexOnly ? 2 * BP : 0)}" stroke="${c3}" stroke-width="7" stroke-linecap="round"/></g>`;
      for (let k = 0; k < NB - (duplexOnly ? 0 : 0); k++) s += `<line x1="${xL + 4}" y1="${-k * BP - 5}" x2="${xR - 4}" y2="${-k * BP - 5}" stroke="#fff" stroke-width="2" opacity="${f1(.55 * Math.min(passOp, guideOp))}"/>`;
      // lus
      if (loop > .01) s += `<g opacity="${f1(loop)}"><path d="M${xL},${top} L${xL},${top - 34} C${xL},${top - 80} ${xR},${top - 80} ${xR},${top - 34} L${xR},${top}" stroke="${sc}" stroke-width="7" fill="none"/></g>`;
      return s;
    }

    return {
      update(t, s) {
        const { step, p } = s;
        // ---------- stap 0–1: transcriptie + Microprocessor ----------
        let pol = '', dna = '', gen = '';
        if (step === 0) {
          const k = ease(sub(p, 0, .5));
          dna += `<line x1="-200" y1="560" x2="${MEM - 30}" y2="560" stroke="${C.dna}" stroke-width="7"/><line x1="-200" y1="576" x2="${MEM - 30}" y2="576" stroke="${C.dna2}" stroke-width="5"/>`;
          gen += `<rect x="130" y="542" width="240" height="52" fill="none" stroke="${C.dna}" stroke-width="2" stroke-dasharray="5 4" opacity=".7"/>` + note(250, 614, T2('MIR-gen', 'MIR gene'), C.dna, 18);
          pol += `<g transform="translate(${f1(lerp(140, 420, k))} 546)"><ellipse cx="0" cy="0" rx="46" ry="38" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/><text x="0" y="6" font-size="16" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">Pol II</text></g>`;
        }
        $('ri-dna').innerHTML = dna; $('ri-gen').innerHTML = gen; $('ri-pol').innerHTML = pol;

        let hp = '', enz = '';
        const base0 = [250, 410];
        if (step <= 1) {
          const grow = step === 0 ? ease(sub(p, .15, .7)) : 1;
          const cut = step === 1 && p > .55;
          const fl = cut ? 1 - sub(p, .55, .9) : 1;
          hp += `<g transform="translate(${base0[0]} ${base0[1]}) scale(${f1(.3 + .7 * grow)})" opacity="${f1(grow)}">` + hairpin({ basal: 11, flank: 1, loop: 1 }) + `</g>`;
          if (cut) hp = `<g transform="translate(${base0[0]} ${base0[1]})">` + hairpin({ basal: 0, loop: 1 }) +
            `<g opacity="${f1(fl)}" transform="translate(0 ${f1(40 * (1 - fl))})"><path d="M-12,4 V${11 * BP} Q-52,${11 * BP + 8} -180,${11 * BP + 6}" stroke="${C.rna}" stroke-width="7" fill="none"/><path d="M12,${2 * BP + 4} V${11 * BP} Q52,${11 * BP + 8} 212,${11 * BP + 6}" stroke="${C.rna}" stroke-width="7" fill="none"/></g></g>`;
          if (step === 0) hp += `<g opacity="${f1(sub(p, .6, .8))}">${capG(base0[0] - 196, base0[1] + 94, 15)}${note(base0[0] - 110, base0[1] + 80, 'pri-miRNA', C.rna, 20)}${note(base0[0] + 40, base0[1] - 110, T2('stam (dsRNA)', 'stem (dsRNA)'), C.muted, 16, 'start')}${note(base0[0], base0[1] - 256, T2('lus', 'loop'), C.muted, 16)}</g>`;
          if (step === 1) {
            const k = ease(sub(p, 0, .3));
            enz += prot(base0[0] - 90, base0[1] + 10, 94, 34, 'Drosha', '#6f5bd6', k * (1 - sub(p, .8, 1)), 17);
            enz += prot(base0[0] + 110, base0[1] + 60, 82, 30, 'DGCR8', '#5a4bb8', k * (1 - sub(p, .8, 1)), 15) + prot(base0[0] + 110, base0[1] + 98, 82, 30, 'DGCR8', '#5a4bb8', k * (1 - sub(p, .8, 1)), 15);
            enz += snip(base0[0], base0[1] + 2, sub(p, .4, .5) * (1 - sub(p, .6, .7)));
            enz += note(base0[0] + 30, base0[1] + 36, T2("2-nt 3'-overhang", "2-nt 3' overhang"), '#ffd36b', 15, 'start', sub(p, .65, .8));
            enz += note(base0[0] - 50, base0[1] - 150, 'pre-miRNA', C.rna, 20, 'end', sub(p, .65, .8));
          }
        }

        // ---------- stap 2–3: export en Dicer ----------
        let org = null, rot = 0;
        if (step === 2) {
          const r = ease(sub(p, 0, .25)), m = ease(sub(p, .25, .85));
          rot = 90 * r;
          const a = [base0[0], base0[1]], b = [MEM - 330, PORE_Y], c = [800, PORE_Y];
          org = r < 1 ? [lerp(a[0], b[0], r), lerp(a[1], b[1], r)] : [lerp(b[0], c[0], m), PORE_Y];
          hp += `<g transform="translate(${f1(org[0])} ${f1(org[1])}) rotate(${f1(rot)})">` + hairpin({ loop: 1 }) + `</g>`;
          const eo = 1 - sub(p, .85, 1);
          const ex = org[0] + 120, ey = org[1] - 2 - 60 * sub(p, .85, 1);
          enz += `<g opacity="${f1(eo)}"><ellipse cx="${f1(ex)}" cy="${f1(ey)}" rx="150" ry="40" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="3"/></g>`;
          enz += note(ex, ey - 50, T2('Exportine-5', 'Exportin-5'), '#c9b8ff', 18, 'middle', eo);
          const gtp = p < .82;
          enz += prot(ex - 150, ey + 42, 98, 30, gtp ? 'Ran·GTP' : 'Ran·GDP', gtp ? '#3fb6c9' : '#5a7a88', eo, 15);
          if (!gtp) enz += note(ex - 150, ey + 86, 'GTP → GDP + Pᵢ', '#7fe0ef', 15, 'middle', eo);
        }
        const DB = [800, PORE_Y];
        if (step === 3) {
          const cut = p > .55, lo = cut ? 1 - sub(p, .55, .85) : 1;
          hp += `<g transform="translate(${DB[0]} ${DB[1]}) rotate(90)">` + hairpin({ loop: 0 }) +
            `<g opacity="${f1(lo)}" transform="translate(${f1(30 * (1 - lo))} ${f1(-60 * (1 - lo))})">` + `<path d="M-12,${-NB * BP} L-12,${-NB * BP - 34} C-12,${-NB * BP - 80} 12,${-NB * BP - 80} 12,${-NB * BP - 34} L12,${-NB * BP}" stroke="${C.rna}" stroke-width="7" fill="none"/></g></g>`;
          const k = ease(sub(p, 0, .3)), ko = k * (1 - sub(p, .85, 1));
          enz += `<g opacity="${f1(ko)}"><path d="M${DB[0] + 60},${DB[1] - 70} h170 q50,0 50,50 v80 q0,40 -40,40 h-180 z" fill="rgba(155,123,255,.2)" stroke="${C.prot}" stroke-width="3"/></g>`;
          enz += note(DB[0] + 150, DB[1] - 84, 'Dicer', '#c9b8ff', 20, 'middle', ko) + prot(DB[0] + 150, DB[1] + 110, 70, 30, 'TRBP', '#5a4bb8', ko, 15);
          enz += snip(DB[0] + NB * BP + 2, DB[1], sub(p, .4, .5) * (1 - sub(p, .6, .7)));
          enz += `<g opacity="${f1(sub(p, .6, .8))}"><path d="M${DB[0] - 12},${DB[1] + 44} v10 H${DB[0] + NB * BP} v-10" stroke="#ffd36b" stroke-width="2.5" fill="none"/></g>` + note(DB[0] + NB * BP / 2, DB[1] + 80, T2('≈ 22 nt', '≈ 22 nt'), '#ffd36b', 18, 'middle', sub(p, .6, .8));
        }
        // ---------- stap 4: laden in AGO2 ----------
        let ago = '';
        const agoOp = step < 4 ? 0 : step === 4 ? ease(sub(p, .25, .55)) : 1;
        if (step === 4) {
          const mv = ease(sub(p, 0, .35));
          const o = [lerp(DB[0], 1100, mv), lerp(DB[1], 500, mv)];
          const pOp = 1 - sub(p, .55, .8), pUp = 90 * sub(p, .5, .8);
          const gOp = 1 - sub(p, .6, .8);
          hp += `<g transform="translate(${f1(o[0])} ${f1(o[1])}) rotate(90)">` + hairpin({ loop: 0, duplexOnly: 1, passOp: 0, guideOp: gOp }) + `</g>`;
          hp += `<g transform="translate(${f1(o[0])} ${f1(o[1] - pUp)}) rotate(90)">` + hairpin({ loop: 0, duplexOnly: 1, passOp: pOp, guideOp: 0 }) + `</g>`;
          hp += note(o[0] + 110, o[1] - 40 - pUp, T2('passagiersstreng', 'passenger strand'), '#bdb3d0', 16, 'middle', sub(p, .45, .55) * pOp);
          hp += note(o[0] - 30, o[1] - 20, "5'", '#ff9ec3', 16, 'middle', gOp * sub(p, .3, .45)) + note(o[0] - 26, o[1] + 34, T2('gids', 'guide'), '#ff9ec3', 16, 'end', gOp * sub(p, .3, .45));
        }
        // AGO2 met gids (5' rechts in MID, 3' links in PAZ)
        if (step >= 4) {                                  // lege AGO2 staat al klaar vanaf het begin van stap 4; de gids komt erin
          const x0 = gx(NB) - 50, x1 = gx(1) + 60;
          ago += `<g><rect x="${x0}" y="${YG - 56}" width="${x1 - x0}" height="120" rx="46" fill="rgba(155,123,255,.18)" stroke="${C.prot}" stroke-width="3"/>`;
          ago += note((x0 + x1) / 2, YG - 68, 'AGO2 (RISC)', '#c9b8ff', 20);
          ago += note(x0 + 30, YG - 28, 'PAZ', '#c9b8ff', 14, 'start') + note(x1 - 30, YG - 28, 'MID', '#c9b8ff', 14, 'end') + `</g><g opacity="${f1(agoOp)}">`;
          for (let i = 1; i <= NB; i++) {
            const seed = i >= 2 && i <= 8, x = gx(i);
            ago += `<rect x="${x - 13}" y="${YG}" width="26" height="30" rx="5" fill="${BASE[GUIDE[i - 1]]}" ${seed && step >= 5 ? 'stroke="#fff" stroke-width="2.5"' : ''}/>` +
              `<text x="${x}" y="${YG + 21}" font-size="17" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${GUIDE[i - 1]}</text>`;
            if (step >= 5 && (i === 1 || i === 2 || i === 8 || i === 10 || i === 11 || i === 22) && !(step === 6 && p > .2)) ago += `<text opacity="${step === 6 ? f1(1 - sub(p, 0, .2)) : 1}" x="${x}" y="${YG - 6}" font-size="14" text-anchor="middle" fill="${C.muted}" font-family="JetBrains Mono">${i}</text>`;
          }
          ago += note(gx(1) + 30, YG + 22, "5'", '#ff9ec3', 17, 'start') + note(gx(NB) - 26, YG + 22, "3'", '#ff9ec3', 17, 'end');
          if (step === 5 || step === 6) { const so = step === 5 ? 1 : 1 - sub(p, 0, .2); ago += `<path d="M${gx(8) - 15},${YG - 22} h${7 * W} " stroke="#fff" stroke-width="3" opacity="${f1(so)}"/>` + note((gx(8) + gx(2)) / 2, YG - 30, T2('seed (nt 2–8)', 'seed (nt 2–8)'), '#fff', 16, 'middle', so); }
          ago += '</g>';
        }
        $('ri-ago').innerHTML = ago;
        setHot(svg, 'ri-gA', agoOp > .5 && step !== 6 ? [gx(18), YG - 44, 120, 16] : null);

        // ---------- stap 5–7: doel-mRNA ----------
        let tg = '', rib = '', dec = '';
        if (step >= 5) {
          const si = step === 7;
          const k = step === 5 ? ease(sub(p, 0, .4)) : step === 7 ? ease(sub(p, 0, .3)) : 1;
          const dy = 70 * (1 - k);
          const tb = i => si ? tgtSi(i) : tgtMi(i);
          const cutK = si ? sub(p, .55, .65) : 0, sep = si ? 60 * ease(sub(p, .65, 1)) : 0;
          const cx = (gx(10) + gx(11)) / 2;
          // lijn van het mRNA: 5' (cap, ORF) links … 3'-UTR met site … poly(A) rechts
          const tail = step === 6 ? 120 * (1 - ease(sub(p, .35, .8))) : 120;
          const Lx = 600, Rx = gx(1) + 80;
          const xs = x => x < cx ? x - sep : x + sep;
          tg += `<g transform="translate(0 ${f1(dy)})" opacity="${f1(step === 7 ? k : 1)}">`;
          tg += `<line x1="${Lx - sep}" y1="${YT + 15}" x2="${f1(cx - 4 - sep)}" y2="${YT + 15}" stroke="${C.rna}" stroke-width="8"/><line x1="${f1(cx + 4 + sep)}" y1="${YT + 15}" x2="${Rx + sep}" y2="${YT + 15}" stroke="${C.rna}" stroke-width="8"/>`;
          tg += `<line x1="${Rx + sep}" y1="${YT + 15}" x2="${f1(Rx + sep + tail)}" y2="${YT + 15}" stroke="${C.cap}" stroke-width="6" stroke-dasharray="3 3"/>`;
          if (tail > 20) tg += note(Rx + sep + tail / 2 + 10, YT + 56, 'poly(A)', C.cap, 16);
          tg += note(Rx + sep + tail + 16, YT + 22, "3'", C.text, 18, 'start') + capG(Lx - 24 - sep, YT + 15, 20) + note(Lx - 50 - sep, YT + 22, "5'", C.text, 18, 'end');
          tg += note((gx(NB) + gx(1)) / 2, YT + 70, T2("doel-mRNA (3'-UTR)", "target mRNA (3' UTR)"), C.rna, 17);
          for (let i = 1; i <= NB; i++) {
            const b = tb(i), x = xs(gx(i)), pr = i > 1 && RNA_PAIR[GUIDE[i - 1]] === b;   // nt 1 zit vast in het MID-domein en paart niet
            tg += `<rect x="${f1(x - 13)}" y="${YT}" width="26" height="30" rx="5" fill="${BASE[b]}"/><text x="${f1(x)}" y="${YT + 21}" font-size="17" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`;
            if (pr && cutK < 1) tg += hb(x, YG + 32, x, YT - 2, npairs(GUIDE[i - 1], b), (step === 5 ? sub(p, .35, .55) : 1) * (1 - sep / 60));
          }
          tg += '</g>';
          // ribosomen op het ORF (links) — remming bij miRNA
          const rOp = step === 6 ? 1 - ease(sub(p, .45, .9)) : 1;
          if (step === 6) {
            for (const rx of [680, 820]) rib += ribo(rx, YT + 17, .8, rOp);
            tg += note(750, YT - 90, T2('translatie geremd', 'translation repressed'), '#ffd36b', 20, 'middle', sub(p, .5, .7));
            const g = ease(sub(p, 0, .3));
            dec += prot(gx(NB) + 60, YG - 96, 116, 36, 'GW182', '#b44f7c', g, 20);
            dec += prot(gx(NB) + 60, YG - 150, 146, 36, 'CCR4–NOT', '#8a5a3a', ease(sub(p, .2, .4)), 20);
            dec += `<path d="M${gx(NB) + 120},${YG - 146} C${gx(3)},${YG - 230} ${Rx + 60},${YG - 140} ${Rx + 60},${YT - 10}" stroke="#e0b089" stroke-width="3" fill="none" stroke-dasharray="8 6" opacity="${f1(sub(p, .25, .4))}"/>`;
            dec += note(Rx + 70, YT - 70, T2('deadenylatie', 'deadenylation'), '#e0b089', 17, 'start', sub(p, .3, .45));
          }
          if (si) {
            tg += snip(cx, YT + 15, sub(p, .45, .55) * (1 - sub(p, .65, .75)));
            tg += note(cx, YT + 110, T2('AGO2 knipt (tegenover nt 10–11)', 'AGO2 slices (opposite nt 10–11)'), '#ffd36b', 18, 'middle', sub(p, .5, .65));
          }
        }
        $('ri-tgt').innerHTML = tg; $('ri-rib').innerHTML = rib; $('ri-dec').innerHTML = dec;
        setHot(svg, 'ri-tA', step === 6 && p > .3 ? [gx(NB) + 60, YG - 150, 146, 36] : null);

        $('ri-hp').innerHTML = hp;
        $('ri-enz').innerHTML = enz;
        setHot(svg, 'ri-hA', step === 0 && p > .6 || step === 1 && p < .5 ? [base0[0], base0[1] - 90, 40, 150] : null);
        setHot(svg, 'ri-hP', step === 0 ? [lerp(140, 420, ease(sub(p, 0, .5))), 546, 92, 76] : null);
      },
    };
  },
};
