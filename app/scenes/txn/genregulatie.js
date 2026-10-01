import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { helixAlong, prot, nucleosome, panel, arrow } from './_txn.js';

/* Geometrie: DNA als rechte lijn (y = Y0) die bij k = 1 een lus vormt zodat de enhancer (XE) naast de promoter komt. */
const Y0 = 560, XE = 380, XP = 960, D = 420, TATA = 985, TSS = 1012, GEND = 1420;
const LC = [880, 640], LR = Math.hypot(80, 80), A0 = Math.atan2(-80, -80), SPAN = 2 * Math.PI - (Math.atan2(-80, 80) - A0);
function loopPt(X) {
  if (X <= XE) return [X + D, Y0];
  if (X >= XP) return [X, Y0];
  const a = A0 - SPAN * (X - XE) / (XP - XE);
  return [LC[0] + LR * Math.cos(a), LC[1] + LR * Math.sin(a)];
}
const centerK = k => X => { const l = loopPt(X); return [lerp(X, l[0], k), lerp(Y0, l[1], k)]; };
const NUC = [-330, -150, 205, 545, 700, TATA, 1160, 1320, 1690, 1880];
const CTCF1 = 90, CTCF2 = 1500;

const M = { act: C.prot, med: '#6f5bd6', hat: '#d98cf0', rem: '#8f7bd0', ctcf: '#e8a23a', rep: C.danger, pol: '#8e6cf0' };

export default {
  id: 'genregulatie',
  title: { nl: 'Genregulatie', en: 'Gene regulation' },
  scale: '≈ 1–100 kb DNA · 10–30 nm', time: { nl: 'seconden tot uren (hier samengevat)', en: 'seconds to hours (condensed here)' },
  org: { nl: 'mens (RNA-polymerase II-gen)', en: 'human (RNA polymerase II gene)' },
  legend: [[C.dna, 'DNA'], [C.histone, { nl: 'nucleosoom', en: 'nucleosome' }], [C.ok, { nl: 'acetylgroep (Ac)', en: 'acetyl mark (Ac)' }], [M.act, { nl: 'activator', en: 'activator' }],
    [M.med, 'Mediator'], [M.hat, 'HAT (p300/CBP)'], [M.rem, { nl: 'remodeler (SWI/SNF)', en: 'remodeller (SWI/SNF)' }], [M.ctcf, { nl: 'CTCF (isolator)', en: 'CTCF (insulator)' }], [M.rep, { nl: 'repressor', en: 'repressor' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Rode draad: een gen wordt niet "aangezet" door één schakelaar, maar door een reeks stappen: toegankelijk chromatine, gebonden activatoren, co-activatoren en ten slotte een volledig preinitiatiecomplex op de promoter.</p><p style="font-size:13px;color:#93a0bb">Groene bolletjes op de histonstaarten = acetylgroepen (Ac). Silencers werken niet alleen via deacetylering (HDAC), maar ook via H3K9/H3K27-methylatie en DNA-methylatie.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Common thread: a gene is not switched on by a single switch but by a series of steps: accessible chromatin, bound activators, co-activators and finally a complete pre-initiation complex on the promoter.</p><p style="font-size:13px;color:#93a0bb">Green dots on the histone tails = acetyl groups (Ac). Silencers act not only via deacetylation (HDAC) but also via H3K9/H3K27 methylation and DNA methylation.</p>' },
  simplified: {
    nl: 'De afstand enhancer–promoter is sterk ingekort (in werkelijkheid vaak tientallen kb, soms tot ~1 Mb). Nucleosomen zijn schijfjes met één DNA-winding (echt ~147 bp in ~1,7 windingen); het DNA is een platte golf. Eén activator staat model voor vele (enhancers binden meestal meerdere factoren samen). Mediator, HAT\'s en remodelers zijn schematische vormen; de volgorde waarin co-activatoren aankomen verschilt per gen. Cohesine (lusvorming) is enkel vermeld.',
    en: 'The enhancer–promoter distance is strongly shortened (in reality often tens of kb, sometimes up to ~1 Mb). Nucleosomes are discs with one DNA turn (really ~147 bp in ~1.7 turns); the DNA is a flat wave. One activator stands for many (enhancers usually bind several factors together). Mediator, HATs and remodellers are schematic shapes; the order in which co-activators arrive differs between genes. Cohesin (loop formation) is only mentioned.' },
  steps: [
    { dur: 8000, cam: cam(760, 500, 1400), title: { nl: 'Een stil gen in chromatine', en: 'A silent gene in chromatin' },
      text: { nl: 'Het gen, zijn promoter (startplaats) en een verre enhancer (versterker) zijn rond nucleosomen gewonden. Zolang de promoter bedekt is, kan RNA-polymerase II niet starten.', en: 'The gene, its promoter (start site) and a distant enhancer are wrapped around nucleosomes. As long as the promoter is covered, RNA polymerase II cannot start.' } },
    { dur: 7000, cam: cam(400, 470, 760), title: { nl: 'Een activator bindt de enhancer', en: 'An activator binds the enhancer' },
      text: { nl: 'Een transcriptiefactor herkent een specifieke DNA-sequentie in de enhancer. Eén deel van het eiwit bindt het DNA, een ander deel (activatiedomein) roept helpers op.', en: 'A transcription factor recognises a specific DNA sequence in the enhancer. One part of the protein binds the DNA, another part (activation domain) recruits helpers.' } },
    { dur: 9000, cam: cam(380, 405, 880), title: { nl: 'Zo leest een eiwit de DNA-sequentie', en: 'How a protein reads the DNA sequence' },
      text: { nl: 'Meestal steekt een α-helix in de grote groef van het DNA. Ze vormt waterstofbruggen met de randen van de basenparen en \'leest\' zo de sequentie.', en: 'Usually an α-helix sits in the major groove of the DNA. It forms hydrogen bonds with the edges of the base pairs and so \'reads\' the sequence.' } },
    { dur: 9000, cam: cam(700, 470, 1250), title: { nl: 'Co-activatoren openen het chromatine', en: 'Co-activators open the chromatin' },
      text: { nl: 'Co-activatoren maken het chromatine los: enzymen hangen acetylgroepen aan histonstaarten (groen) en remodelers schuiven het nucleosoom op de promoter weg.', en: 'Co-activators loosen the chromatin: enzymes attach acetyl groups to histone tails (green) and remodellers push the nucleosome on the promoter away.' } },
    { dur: 7000, cam: cam(575, 460, 1030), title: { nl: 'Mediator: de brug', en: 'Mediator: the bridge' },
      text: { nl: 'Het activatiedomein roept Mediator op, een groot eiwitcomplex. Mediator geeft het signaal van de activator door aan RNA-polymerase II.', en: 'The activation domain recruits Mediator, a large protein complex. Mediator passes the signal from the activator on to RNA polymerase II.' } },
    { dur: 9000, cam: cam(880, 540, 1100), title: { nl: 'Een DNA-lus brengt enhancer en promoter samen', en: 'A DNA loop brings enhancer and promoter together' },
      text: { nl: 'Het DNA ertussen vormt een lus. Zo komt de enhancer vlak bij de promoter, ook al ligt hij ver weg in de sequentie.', en: 'The DNA in between forms a loop. This brings the enhancer close to the promoter, even though it lies far away in the sequence.' } },
    { dur: 9000, cam: cam(965, 425, 1360), title: { nl: 'Grenzen en remmen: isolatoren en silencers', en: 'Borders and brakes: insulators and silencers' },
      text: { nl: 'Grenseiwitten (CTCF met cohesine) verdelen het DNA in lusdomeinen, zodat een enhancer het juiste gen aanzet. Repressoren op silencers sluiten het chromatine juist.', en: 'Border proteins (CTCF with cohesin) divide the DNA into loop domains, so an enhancer switches on the right gene. Repressors on silencers close the chromatin instead.' } },
    { dur: 9000, cam: cam(950, 500, 900), title: { nl: 'Het preinitiatiecomplex bouwt zich op', en: 'The pre-initiation complex assembles' },
      text: { nl: 'Op de vrijgemaakte promoter bouwen algemene transcriptiefactoren en Pol II het startcomplex op. Pol II staat klaar → volgend hoofdstuk: de promoter.', en: 'On the freed promoter, general transcription factors and Pol II assemble the start complex. Pol II is ready → next chapter: the promoter.' } },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="dnahelix" data-color="${C.dna}" data-label="${T2('DNA-dubbelhelix', 'DNA double helix')}" data-nolabel>
      <g id="gr-rungs"></g>
      <path id="gr-s1" stroke="${C.dna}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path id="gr-s2" stroke="${C.dna2}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <g id="gr-marks"></g>
    <g data-node="promoter" data-color="${C.prot}" data-label="${T2('Kernpromoter (TATA) → volgend hoofdstuk', 'Core promoter (TATA) → next chapter')}">
      <g id="gr-prom"></g><circle id="gr-promA" data-anchor="promoter" data-pos="below" r="1" fill="none"/>
    </g>
    <g data-node="transcriptie" data-nolabel data-color="${C.rna}" data-label="${T2('Gen → transcriptie', 'Gene → transcription')}">
      <g id="gr-gene"></g><circle id="gr-geneA" data-anchor="transcriptie" r="1" fill="none"/>
    </g>
    <g data-node="chromatine" data-color="${C.histone}" data-label="${T2('Chromatine (nucleosomen)', 'Chromatin (nucleosomes)')}">
      <g id="gr-nuc"></g><circle id="gr-nucA" data-anchor="chromatine" r="1" fill="none"/>
    </g>
    <g data-node="histonmod" data-color="${C.ok}" data-label="${T2('Histonacetylatie', 'Histone acetylation')}">
      <g id="gr-hat"></g><circle id="gr-hatA" data-anchor="histonmod" r="1" fill="none"/>
    </g>
    <g id="gr-prot"></g>
    <g data-node="promoter" data-nolabel data-color="${C.prot}"><g id="gr-gtf"></g></g>
    <g data-node="rnapol" data-color="${M.pol}" data-label="${T2('RNA-polymerase II', 'RNA polymerase II')}"><g id="gr-pic"></g><circle id="gr-polA" data-anchor="rnapol" r="1" fill="none"/></g>
    <g id="gr-ins"></g>
    <g data-node="tertiair" data-nolabel data-color="${C.danger}"><g id="gr-dbd"></g></g>
    <g data-node="histonmod" data-nolabel data-color="${C.ok}"><g id="gr-sil"></g></g>
    <g data-node="operon" data-nolabel data-color="${C.bact}" data-label="${T2('Zijpad: bacteriën (lac-operon)', 'Side path: bacteria (lac operon)')}">
      <g id="gr-opbtn"></g><circle id="gr-opA" data-anchor="operon" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const setA = (id, x, y, on = 1) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); e.setAttribute('opacity', on ? 1 : 0); };
    let lastK = -1;

    /* inzet: DNA-bindende motieven (statisch, verschijnt in stap 2) */
    function dbdInset(op) {
      if (op <= .01) return '';
      const x0 = -20, y0 = 170, W = 800, H = 272;
      let s = `<g opacity="${f1(op)}">` + panel(x0, y0, W, H);
      // close-up: grote groef met herkenningshelix
      const cx = 180, cy = 320;
      let b1 = '', b2 = '', rg = '';
      for (let x = -150; x <= 150; x += 4) {
        const y1 = cy + 42 * Math.sin((x + 20) / 48), y2 = cy + 42 * Math.sin((x + 20) / 48 + 2.2);
        b1 += `${x === -150 ? 'M' : 'L'}${f1(cx + x)},${f1(y1)}`; b2 += `${x === -150 ? 'M' : 'L'}${f1(cx + x)},${f1(y2)}`;
        if ((x + 150) % 16 === 0) rg += `<line x1="${f1(cx + x)}" y1="${f1(y1)}" x2="${f1(cx + x)}" y2="${f1(y2)}" stroke="${['#5ad17a', '#ffc247', '#4fb0ff', '#ff6b6b'][((x + 150) / 16) % 4]}" stroke-width="4" opacity=".75"/>`;
      }
      s += rg + `<path d="${b1}" stroke="${C.dna}" stroke-width="6" fill="none"/><path d="${b2}" stroke="${C.dna2}" stroke-width="6" fill="none"/>`;
      s += `<rect x="${cx - 58}" y="${cy - 14}" width="116" height="28" rx="14" fill="${C.danger}" fill-opacity=".85" stroke="#fff" stroke-width="1.5" transform="rotate(-18 ${cx} ${cy})"/>`;
      for (let i = -2; i <= 2; i++) s += `<line x1="${cx + i * 20}" y1="${cy + 12 - i * 6}" x2="${cx + i * 20}" y2="${cy + 34 - i * 6}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`;
      s += txt(cx, y0 + 30, T2('herkenningshelix in de grote groef', 'recognition helix in the major groove'), C.text, 16);
      s += txt(cx, y0 + H - 18, T2('H-bruggen met randen van basenparen', 'H-bonds to base-pair edges'), C.muted, 14);
      // vier motieven
      const mx = [480, 660], my = [255, 377];
      const helix = (x, y, w, rot, col = C.danger) => `<rect x="${f1(x - w / 2)}" y="${f1(y - 8)}" width="${w}" height="16" rx="8" fill="${col}" fill-opacity=".85" transform="rotate(${rot} ${f1(x)} ${f1(y)})"/>`;
      const dna = (x, y) => `<line x1="${x - 70}" y1="${y}" x2="${x + 70}" y2="${y}" stroke="${C.dna}" stroke-width="7" opacity=".7"/><line x1="${x - 70}" y1="${y + 10}" x2="${x + 70}" y2="${y + 10}" stroke="${C.dna2}" stroke-width="5" opacity=".6"/>`;
      // HTH
      s += dna(mx[0], my[0] + 16) + helix(mx[0] - 24, my[0] - 26, 50, -35, '#ff9d6b') + `<path d="M${mx[0] - 4},${my[0] - 40} q12,-6 14,12" stroke="#fff" stroke-width="2" fill="none"/>` + helix(mx[0] + 12, my[0] + 4, 60, 0);
      s += txt(mx[0], my[0] + 46, 'helix-turn-helix', C.text, 14);
      // zinkvinger
      s += dna(mx[1], my[0] + 16) + `<path d="M${mx[1] - 40},${my[0] - 30} l18,24 l18,-24" stroke="#ffc247" stroke-width="7" fill="none" stroke-linejoin="round"/>` + helix(mx[1] + 26, my[0] + 0, 56, -10) +
        `<circle cx="${mx[1] - 2}" cy="${my[0] - 26}" r="9" fill="#9fb3c8" stroke="#fff"/><text x="${mx[1] - 2}" y="${my[0] - 22.5}" font-size="9" text-anchor="middle" font-family="Inter" font-weight="800" fill="#0a1224">Zn</text>`;
      s += txt(mx[1], my[0] + 46, T2('zinkvinger (Cys₂His₂)', 'zinc finger (Cys₂His₂)'), C.text, 14);
      // leucinerits
      s += dna(mx[0], my[1] + 16) + helix(mx[0] - 22, my[1] - 6, 64, 60) + helix(mx[0] + 22, my[1] - 6, 64, -60) + `<rect x="${mx[0] - 8}" y="${my[1] - 62}" width="16" height="36" rx="8" fill="#ff9d6b"/>`;
      s += txt(mx[0], my[1] + 46, T2('leucinerits (bZIP)', 'leucine zipper (bZIP)'), C.text, 14);
      // bHLH
      s += dna(mx[1], my[1] + 16) + helix(mx[1] - 24, my[1] - 2, 50, 70) + helix(mx[1] + 24, my[1] - 2, 50, -70) + helix(mx[1] - 24, my[1] - 44, 40, -20, '#ff9d6b') + helix(mx[1] + 24, my[1] - 44, 40, 20, '#ff9d6b');
      s += txt(mx[1], my[1] + 46, T2('helix-loop-helix (bHLH)', 'helix-loop-helix (bHLH)'), C.text, 14);
      return s + '</g>';
    }
    /* inzet: silencer + repressor */
    function silInset(op) {
      if (op <= .01) return '';
      const x0 = 1030, y0 = 76, W = 540, H = 250;
      let s = `<g opacity="${f1(op)}">` + panel(x0, y0, W, H, 1, '#5a2a3a');
      s += txt(x0 + W / 2, y0 + 38, T2('elders: een silencer', 'elsewhere: a silencer'), C.danger, 22);
      s += `<line x1="${x0 + 30}" y1="${y0 + 190}" x2="${x0 + W - 30}" y2="${y0 + 190}" stroke="${C.dna}" stroke-width="8"/>`;
      s += `<rect x="${x0 + 70}" y="${y0 + 180}" width="70" height="20" fill="none" stroke="${C.danger}" stroke-dasharray="4 3" stroke-width="2"/>`;
      s += prot(x0 + 108, y0 + 146, 62, 24, M.rep, 1, 11, T2('repressor', 'repressor'), 18);
      s += prot(x0 + 236, y0 + 100, 46, 22, '#b35a7a', 1, 12, 'HDAC', 18);
      s += arrow(x0 + 284, y0 + 112, x0 + 338, y0 + 145, C.muted, 3);
      s += nucleosome(x0 + 370, y0 + 170, 1, 0) + nucleosome(x0 + 440, y0 + 170, 1, 0);
      s += txt(x0 + 405, y0 + 232, T2('Ac weg → compact', 'Ac removed → compact'), C.muted, 18);
      return s + '</g>';
    }

    return {
      update(t, s) {
        const { step, p } = s;
        const k = step < 5 ? 0 : step === 5 ? ease(sub(p, .1, .8)) : 1;
        const pt = centerK(k);
        if (Math.abs(k - lastK) > 1e-4) {
          lastK = k;
          const h = helixAlong(pt, -520, 2120, { amp: 13, period: 64, step: 5, rungEvery: 8, seed: 11 });
          $('gr-s1').setAttribute('d', h.s1); $('gr-s2').setAttribute('d', h.s2); $('gr-rungs').innerHTML = h.rungs;
        }
        const act = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .6)) : 1;
        const ac = step < 3 ? 0 : step === 3 ? sub(p, .1, .45) : step === 6 ? 1 - .5 * sub(p, 0, .3) : 1;
        const evict = step < 3 ? 0 : step === 3 ? ease(sub(p, .45, .9)) : 1;
        const med = step < 4 ? 0 : step === 4 ? ease(sub(p, .15, .6)) : 1;

        // elementen op het DNA
        const e = pt(XE), pr = pt(TATA), tss = pt(TSS);
        let marks = `<g opacity="${f1(1 - .6 * k)}">` +
          `<rect x="${f1(e[0] - 34)}" y="${f1(e[1] - 22)}" width="68" height="44" rx="8" fill="rgba(255,194,71,.10)" stroke="${C.trna}" stroke-dasharray="5 4" stroke-width="2"/></g>` +
          (k > .5 ? txt(e[0] - 44, e[1] + 88, 'enhancer', C.trna, 21, 'end') : txt(e[0], e[1] + 62, 'enhancer', C.trna, 21));
        if (step === 0) marks += txt((e[0] + pr[0]) / 2, Y0 + 64, T2('… tientallen kb (ingekort) …', '… tens of kb (shortened) …'), C.muted, 21);
        $('gr-marks').innerHTML = marks;
        $('gr-prom').innerHTML = `<rect x="${f1(pr[0] - 40)}" y="${f1(pr[1] - 22)}" width="72" height="44" rx="8" fill="rgba(155,123,255,.12)" stroke="${C.prot}" stroke-dasharray="5 4" stroke-width="2"/>` +
          (step === 7 && p > .12 ? '' : k > .5 ? txt(pr[0] - 40, pr[1] - 40, 'TATA', '#c9b8ff', 21, 'middle', 700, 'JetBrains Mono') : txt(pr[0] - 4, pr[1] + 64, 'TATA', '#c9b8ff', 21, 'middle', 700, 'JetBrains Mono'));
        setA('gr-promA', pr[0] - 4 + 60 * k, pr[1] + 68);
        const gy = Y0 + 38;
        $('gr-gene').innerHTML = (step === 7 && p > .35 ? '' : `<path d="M${TSS},${Y0 - 20} v-40 h26" stroke="${C.text}" stroke-width="3" fill="none" marker-end="url(#arrow)"/>`) +
          `<rect x="${TSS + 6}" y="${gy}" width="${GEND - TSS - 6}" height="16" rx="8" fill="${C.rna}" fill-opacity=".25" stroke="${C.rna}" stroke-width="1.5"/>` +
          txt((TSS + GEND) / 2 + 20, gy + 44, T2('gen ↗', 'gene ↗'), C.rna, 21) + (step === 7 && p > .35 ? '' : txt(TSS + 6, Y0 - 70, '+1', C.text, 18, 'start'));
        setA('gr-geneA', (TSS + GEND) / 2 + 60, gy);

        // nucleosomen
        let nu = '';
        for (const X of NUC) {
          const q = pt(X);
          const isProm = X === TATA;
          const acHere = [205, 545, 700, 1160].includes(X) ? ac : 0;
          if (isProm) nu += nucleosome(q[0] + 60 * evict, q[1] - 170 * evict, 1 - evict, 0);
          else nu += nucleosome(q[0], q[1], 1, acHere);
        }
        $('gr-nuc').innerHTML = nu;
        const na = pt(1320); setA('gr-nucA', na[0], na[1] - 34);

        // eiwitten
        let pr2 = '';
        const ay = lerp(e[1] - 240, e[1] - 30, act);
        if (act > .01) {
          pr2 += `<g opacity="${f1(clamp(act * 2))}">` +
            `<path d="M${f1(e[0] - 26)},${f1(ay)} q-6,-34 14,-44 M${f1(e[0] + 26)},${f1(ay)} q6,-34 -14,-44" stroke="${M.act}" stroke-width="4" fill="none"/>` +
            prot(e[0] - 18, ay, 24, 18, M.act, 1, 4) + prot(e[0] + 18, ay, 24, 18, M.act, 1, 5) +
            `<circle cx="${f1(e[0])}" cy="${f1(ay - 50)}" r="12" fill="${M.act}" fill-opacity=".6" stroke="${M.act}" stroke-width="2"/>` + '</g>';
          if (step === 1) {
            pr2 += `<line x1="${f1(e[0] - 58)}" y1="${f1(ay - 62)}" x2="${f1(e[0] - 26)}" y2="${f1(ay - 12)}" stroke="${C.muted}" stroke-width="2"/>` + txt(e[0] - 60, ay - 70, T2('DNA-bindend domein', 'DNA-binding domain'), C.text, 16, 'end');
            pr2 += txt(e[0] + 22, ay - 56, T2('activatiedomein', 'activation domain'), C.text, 16, 'start');
          }
        }
        // HAT en remodeler (stap 3–4)
        const hatOp = step === 3 ? sub(p, 0, .15) : step === 4 ? 1 - sub(p, .5, 1) : 0;
        const remOp = step === 3 ? sub(p, .3, .45) * (1 - sub(p, .9, 1) * .0) : step === 4 ? 1 - sub(p, 0, .4) : 0;
        let hat = prot(e[0] - 130, e[1] - 110, 56, 26, M.hat, hatOp, 21, 'p300/CBP', 18);
        if (hatOp > .01 && step === 3) hat += txt(e[0] - 130, e[1] - 162, T2('HAT: acetyleert H3K27', 'HAT: acetylates H3K27'), C.text, 18);
        $('gr-hat').innerHTML = hat;
        { const qa = pt(545); setA('gr-hatA', qa[0] + 4, qa[1] - 58, step >= 3 && step <= 5 && !(step === 3 && p < .3)); }
        const rq = pt(TATA);
        pr2 += prot(rq[0] + 60 * evict, rq[1] - 80 - 170 * evict, 54, 26, M.rem, remOp, 22, 'SWI/SNF', 18);
        if (step === 3 && remOp > .01) pr2 += txt(rq[0] + 60 * evict, rq[1] - 128 - 170 * evict, T2('remodeler (ATP)', 'remodeller (ATP)'), C.text, 18);
        // Mediator
        const mA = [e[0] + 70, e[1] - 150], mB = [915, 425];
        const mp = [lerp(mA[0], mB[0], k), lerp(mA[1], mB[1], k)];
        pr2 += `<g opacity="${f1(med)}"><path d="M${f1(e[0])},${f1(ay - 58)} L${f1(mp[0] - 40)},${f1(mp[1] + 20)}" stroke="${M.med}" stroke-width="3" stroke-dasharray="4 4"/></g>`;
        pr2 += prot(mp[0], mp[1] - 60 * (1 - med), 82, 44, M.med, med, 31, 'Mediator', 20);
        // CTCF
        const c1 = pt(CTCF1), c2 = pt(CTCF2);
        const ctcf = (q) => `<rect x="${f1(q[0] - 12)}" y="${f1(q[1] - 20)}" width="24" height="40" rx="5" fill="${M.ctcf}" fill-opacity=".25" stroke="${M.ctcf}" stroke-width="2"/>` + prot(q[0], q[1] - 34, 26, 16, M.ctcf, 1, 41);
        pr2 += ctcf(c1) + ctcf(c2);
        $('gr-prot').innerHTML = pr2;

        // insulators & cohesine (stap 6)
        const insOp = step === 6 ? sub(p, 0, .2) : 0;
        let ins = '';
        if (insOp > .01) {
          ins += `<g opacity="${f1(insOp)}"><rect x="${f1(c1[0])}" y="${Y0 - 70}" width="${f1(c2[0] - c1[0])}" height="120" rx="14" fill="${M.ctcf}" fill-opacity=".07" stroke="${M.ctcf}" stroke-dasharray="6 5" stroke-width="1.5"/>` +
            txt(c1[0], c1[1] - 66 - 16, 'CTCF', M.ctcf, 20) + txt(c2[0], c2[1] - 66 - 16, 'CTCF', M.ctcf, 20) +
            txt(c2[0] - 40, Y0 - 112, T2('lusdomein (TAD)', 'loop domain (TAD)'), M.ctcf, 20, 'end') + '</g>';
        }
        $('gr-ins').innerHTML = ins;
        $('gr-sil').innerHTML = silInset(step === 6 ? sub(p, .35, .55) : 0);
        $('gr-dbd').innerHTML = dbdInset(step === 2 ? sub(p, .05, .2) : 0);

        // PIC (stap 7)
        let pic = '', gtf = '';
        const P = pt(TATA);
        const f = (a, b) => step === 7 ? ease(sub(p, a, b)) : 0;
        gtf += prot(P[0], P[1] - 34, 34, 20, '#8e6cf0', f(.05, .2), 51, 'TFIID', 15);
        gtf += pill(P[0] - 62, P[1] + 32, 70, 26, 'TFIIA', '#6f5bd6', f(.18, .3), 15);
        gtf += pill(P[0] + 56, P[1] + 32, 70, 26, 'TFIIB', '#6f5bd6', f(.25, .38), 15);
        pic += prot(P[0] + 95, P[1] - 80, 70, 52, M.pol, f(.4, .58), 52, 'Pol II', 17);
        gtf += pill(P[0] + 214, P[1] - 92, 70, 26, 'TFIIF', '#5a4bb8', f(.45, .6), 15);
        gtf += pill(P[0] + 204, P[1] - 36, 70, 26, 'TFIIE', '#5a4bb8', f(.6, .72), 15);
        gtf += pill(P[0] + 222, P[1] - 150, 74, 28, 'TFIIH', '#8e6cf0', f(.7, .85), 15);
        $('gr-pic').innerHTML = pic; $('gr-gtf').innerHTML = gtf;
        setA('gr-polA', P[0] + 80, P[1] - 134, step === 7 && p > .5);

        // zijpad-knop
        const bx0 = step === 6 ? 380 : 110, by0 = step === 6 ? 120 : 200;
        $('gr-opbtn').innerHTML = `<g opacity="${step === 0 || step === 6 ? 1 : 0}"><rect x="${bx0}" y="${by0}" width="330" height="48" rx="24" fill="rgba(214,90,90,.15)" stroke="${C.bact}" stroke-width="2"/>` +
          txt(bx0 + 165, by0 + 32, T2('bacteriën: lac-operon ↗', 'bacteria: lac operon ↗'), '#f0a0a0', 21) + '</g>';
        setA('gr-opA', bx0 + 165, by0);
      },
    };
  },
};
