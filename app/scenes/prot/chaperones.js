import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, rng } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, spark, lerpPts, ATPC } from './_b_kit.js';

/* Paneel A (x 0–1600): Hsp70-cyclus · Paneel B (x 1700–3300): chaperonine (GroEL–GroES) · Paneel C (x 3400–5000): netwerk */
const HYD = '#ff9f43';                                   // hydrofoob segment
const HINGE = [1010, 404], LID_L = 160;
const CH_FREE = [[300, 250], [380, 330], [520, 300], [640, 360], [760, 320], [880, 330], [990, 320], [1080, 360], [1150, 330]];
const CH_BOUND = [[300, 250], [380, 330], [520, 300], [640, 350], [760, 390], [880, 398], [990, 398], [1080, 420], [1150, 395]];
const CX = 2500, EQ = 470;                               // chaperonine: middenas en evenaar

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'chaperones',
  title: { nl: 'Chaperones', en: 'Molecular chaperones' },
  scale: { nl: '≈ 10–15 nm', en: '≈ 10–15 nm' },
  time: { nl: 'Hsp70: seconden · GroEL-cyclus ≈ 10 s', en: 'Hsp70: seconds · GroEL cycle ≈ 10 s' },
  org: { nl: 'mens (Hsp70, Hsp90, TRiC); GroEL–GroES als bacterieel model', en: 'human (Hsp70, Hsp90, TRiC); GroEL–GroES as bacterial model' },
  legend: [[C.chain, { nl: 'nieuwe polypeptideketen', en: 'new polypeptide chain' }], [HYD, { nl: 'hydrofoob segment', en: 'hydrophobic segment' }], [C.prot, 'Hsp70 · GroEL'], [C.prot2, { nl: 'co-chaperones (Hsp40, NEF) · GroES', en: 'co-chaperones (Hsp40, NEF) · GroES' }], [ATPC, 'ATP / ADP'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: GroEL–GroES–(ADP)7, PDB <a href="https://www.rcsb.org/structure/1AON" target="_blank" rel="noopener">1AON</a> (E. coli).</p><p style="font-size:13px;color:#93a0bb">Netwerk: Hsp70 + Hsp40 helpen veel nieuwe ketens; chaperoninen (mens: TRiC/CCT) een deel; Hsp90 rijpt o.a. kinasen en steroïdreceptoren. Wat blijvend misvouwt, wordt via een E3 (bv. CHIP) gemerkt voor afbraak; faalt alles, dan aggregeert het.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: GroEL–GroES–(ADP)7, PDB <a href="https://www.rcsb.org/structure/1AON" target="_blank" rel="noopener">1AON</a> (E. coli).</p><p style="font-size:13px;color:#93a0bb">Network: Hsp70 + Hsp40 help many new chains; chaperonins (human: TRiC/CCT) a subset; Hsp90 matures e.g. kinases and steroid receptors. What stays misfolded is tagged for degradation via an E3 (e.g. CHIP); if everything fails, it aggregates.</p>' },
  simplified: {
    nl: 'Hsp70 is getekend als nucleotide-bindend domein (NBD) plus substraatbindend domein met een helixdeksel; de echte vorm is complexer. Het chaperonine is in doorsnede getekend met 2 van de 7 subeenheden per ring. In menselijke cellen vervult TRiC/CCT (8 verschillende subeenheden per ring, ingebouwd deksel) die rol in het cytosol; GroEL–GroES (E. coli) is het best bestudeerde model en wordt hier getoond. Hsp90 wordt enkel in het netwerk vermeld.',
    en: 'Hsp70 is drawn as a nucleotide-binding domain (NBD) plus a substrate-binding domain with a helical lid; the real shape is more complex. The chaperonin is drawn in cross-section showing 2 of the 7 subunits per ring. In human cells TRiC/CCT (8 different subunits per ring, built-in lid) plays this role in the cytosol; GroEL–GroES (E. coli) is the best-studied model and is shown here. Hsp90 is only mentioned in the network.' },
  steps: [
    ST(8000, cam(760, 420, 1600), 'Het gevaar: klonteren', 'The danger: clumping',
      'Een nieuwe keten toont hydrofobe stukken die later in de kern horen. In het drukke cytosol kunnen die met andere ketens aggregeren.',
      'A new chain exposes hydrophobic stretches that later belong in the core. In the crowded cytosol they can aggregate with other chains.'),
    ST(8000, cam(850, 440, 1050), 'Hsp70·ATP en Hsp40', 'Hsp70·ATP and Hsp40',
      'Met ATP staat het deksel van Hsp70 open (lage affiniteit). De co-chaperone Hsp40 (J-eiwit) brengt het hydrofobe segment aan.',
      'With ATP bound, the lid of Hsp70 is open (low affinity). The co-chaperone Hsp40 (J protein) delivers the hydrophobic segment.'),
    ST(8000, cam(870, 440, 950), 'ATP → ADP: deksel dicht', 'ATP → ADP: lid closes',
      'Hsp40 stimuleert de ATP-hydrolyse. In de ADP-toestand klemt het deksel het segment vast (hoge affiniteit): aggregatie wordt voorkomen.',
      'Hsp40 stimulates ATP hydrolysis. In the ADP state the lid clamps the segment (high affinity): aggregation is prevented.'),
    ST(8000, cam(880, 420, 1050), 'NEF: ADP eruit, ATP erin', 'NEF: ADP out, ATP in',
      'Een nucleotide-uitwisselingsfactor (NEF) wisselt ADP voor ATP. Het deksel gaat open, de keten komt vrij en kan vouwen of opnieuw binden.',
      'A nucleotide exchange factor (NEF) swaps ADP for ATP. The lid opens, the chain is released and can fold or bind again.'),
    ST(7500, cam(2500, 450, 1350), 'Chaperonine: een vouwkooi', 'Chaperonin: a folding cage',
      'Sommige eiwitten hebben een afgesloten kamer nodig: twee ringen rug aan rug. Mens: TRiC/CCT; best bestudeerd: GroEL–GroES van E. coli.',
      'Some proteins need an enclosed chamber: two rings back to back. Human: TRiC/CCT; best studied: GroEL–GroES of E. coli.'),
    ST(7500, cam(2500, 420, 1250), 'Binding aan de hydrofobe rand', 'Binding to the hydrophobic rim',
      'De apicale domeinen van een open GroEL-ring (7 subeenheden) vangen de ongevouwen keten via hydrofobe plaatsen.',
      'The apical domains of an open GroEL ring (7 subunits) capture the unfolded chain via hydrophobic sites.'),
    ST(9000, cam(2500, 420, 1250), '7 ATP + GroES: de Anfinsen-kooi', '7 ATP + GroES: the Anfinsen cage',
      'ATP en het GroES-deksel binden: de wand draait, wordt hydrofiel en de kamer vergroot. De keten (tot ~60 kDa) vouwt ongestoord, alleen.',
      'ATP and the GroES lid bind: the wall rotates, turns hydrophilic and the chamber enlarges. The chain (up to ~60 kDa) folds undisturbed, alone.'),
    ST(8500, cam(2500, 420, 1250), 'Na ~10 s: kooi gaat open', 'After ~10 s: the cage opens',
      'De 7 ATP worden gehydrolyseerd (~10 s). ATP-binding aan de andere ring stoot GroES en het eiwit uit. Nog niet gevouwen? Dan opnieuw.',
      'The 7 ATP are hydrolysed (~10 s). ATP binding to the opposite ring ejects GroES and the protein. Not folded yet? Then again.'),
    ST(8500, cam(4200, 460, 1650), 'Een netwerk van chaperones', 'A network of chaperones',
      'Hsp70 helpt veel ketens, chaperoninen een kleiner deel; Hsp90 rijpt o.a. kinasen en steroïdreceptoren. Wie faalt, wordt afgebroken.',
      'Hsp70 helps many chains, chaperonins a smaller subset; Hsp90 matures e.g. kinases and steroid receptors. Whatever fails is degraded.'),
  ],
  svg() {
    const r = rng(7);
    let crowd = '';
    for (let i = 0; i < 46; i++) { const x = r() * 1600, y = 120 + r() * 700, rr = 14 + r() * 34; if (Math.hypot(x - 850, y - 470) < 280 || (x < 420 && y < 380)) continue; crowd += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr)}" fill="#8a93a8" opacity=".09"/>`; }
    // netwerk (paneel C)
    const box = (x, y, w, lab, col, node, sub2) => {
      const b = panel(x - w / 2, y - 48, w, 96, { col }) + T(x, sub2 ? y - 6 : y + 10, lab, { size: 28, col, w: 700 }) + (sub2 ? T(x, y + 30, sub2, { size: 23, col: '#c9d2e4', w: 500 }) : '');
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${L({ nl: '→ ' + { vouwing: 'Eiwitvouwing', ubiquitine: 'Ubiquitine–proteasoom', misvouwing: 'Misvouwing & aggregatie', translatie: 'Translatie' }[node], en: '→ ' + { vouwing: 'Protein folding', ubiquitine: 'Ubiquitin–proteasome', misvouwing: 'Misfolding & aggregation', translatie: 'Translation' }[node] })}">${b}<circle data-anchor="${node}" cx="${x}" cy="${y - 50}" r="1" fill="none"/></g>` : b;
    };
    let net = box(3560, 460, 250, T2('ribosoom', 'ribosome'), C.rrna, 'translatie');
    net += box(3940, 300, 270, 'Hsp70 + Hsp40', C.prot, null);
    net += box(3940, 620, 270, T2('chaperonine', 'chaperonin'), C.prot, null, 'TRiC/CCT');
    net += box(4360, 300, 250, 'Hsp90', C.prot2, null);
    net += box(4760, 460, 250, T2('natief eiwit', 'native protein'), C.ok, 'vouwing');
    net += box(4360, 780, 280, T2('afbraak', 'degradation'), '#ffd166', 'ubiquitine');
    net += box(4760, 780, 250, T2('aggregatie', 'aggregation'), C.danger, 'misvouwing');
    const A = (x0, y0, x1, y1, c = C.muted, b = 0) => arr(x0, y0, x1, y1, c, 'ch-m', { w: 4, bend: b });
    net += A(3690, 430, 3800, 320) + A(3690, 490, 3800, 600) + A(4080, 300, 4230, 300) + A(4485, 300, 4640, 430) + A(4080, 330, 4640, 450, C.muted, .08) + A(4080, 620, 4640, 480) +
      A(3940, 675, 4230, 760, C.muted) + A(4360, 350, 4360, 725, C.muted) + A(4640, 520, 4700, 725, C.danger);
    net += T(4200, 160, T2('Proteostase: vouwen, bewaken of afbreken', 'Proteostasis: fold, guard or degrade'), { size: 31, w: 700 });
    return svgOpen(arrowDefs('ch', { m: C.muted, w: '#fff' })) + `
    ${crowd}
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T2('Ribosoom (translatie)', 'Ribosome (translation)')}">
      <ellipse cx="200" cy="200" rx="150" ry="95" fill="rgba(44,198,168,.18)" stroke="${C.rrna}" stroke-width="3"/>
      <ellipse cx="170" cy="300" rx="120" ry="50" fill="rgba(44,198,168,.25)" stroke="${C.rrna}" stroke-width="3"/>
      ${T(185, 205, T2('ribosoom', 'ribosome'), { size: 22, col: C.rrna })}
    </g>
    <g id="ch-agg"></g>
    <g id="ch-hsp"></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Nieuwe keten → vouwing', 'New chain → folding')}"><g id="ch-chain"></g><circle id="ch-chainA" data-anchor="vouwing" r="1" fill="none"/></g>
    <g id="ch-lid"></g>
    <g id="ch-co"></g>
    <g id="ch-lbl"></g>
    <!-- paneel B -->
    <g id="ch-groel"></g>
    <!-- paneel C -->
    ${net}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    /* ---- chaperonine: één wand (linkerhelft, bovenring); k = 0 open/trans, 1 = GroES-gebonden (cis) ---- */
    function wall(k, hyd) {
      const out = 38 * k, ang = -38 * k;
      let s = `<rect x="${f1(2250 - out)}" y="${EQ - 70}" width="95" height="66" rx="16" fill="${C.prot}" fill-opacity=".35" stroke="${C.prot}" stroke-width="3"/>`;   // equatoriaal
      s += `<rect x="${f1(2262 - out)}" y="${EQ - 134}" width="80" height="60" rx="16" fill="${C.prot}" fill-opacity=".25" stroke="${C.prot}" stroke-width="3"/>`;  // intermediair
      s += `<g transform="rotate(${f1(ang)} ${f1(2290 - out)} ${EQ - 134})"><rect x="${f1(2262 - out)}" y="${EQ - 214}" width="140" height="76" rx="22" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3"/>` +
        `<rect x="${f1(2390 - out)}" y="${EQ - 204}" width="12" height="56" rx="5" fill="${hyd ? HYD : '#5fd3e6'}"/></g>`;           // apicaal met binnenzijde
      return s;
    }
    const ring = (k, hyd, bottom) => {
      const w = wall(k, hyd);
      const pair = w + `<g transform="translate(${2 * CX} 0) scale(-1 1)">${w}</g>`;
      return bottom ? `<g transform="translate(0 ${2 * EQ}) scale(1 -1)">${pair}</g>` : pair;
    };
    const unf = (cx, cy, s, a = 1) => chain([[cx - 70 * s, cy + 10], [cx - 40 * s, cy - 30], [cx - 10 * s, cy + 20], [cx + 20 * s, cy - 25], [cx + 50 * s, cy + 15], [cx + 75 * s, cy - 15]], { w: 7, op: a });
    const folded = (cx, cy, a = 1) => `<g opacity="${f1(a)}"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="52" ry="42" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="4"/>` + chain([[cx - 30, cy], [cx - 10, cy - 22], [cx + 12, cy - 4], [cx + 28, cy - 22], [cx + 30, cy + 14], [cx - 10, cy + 20]], { w: 5, op: .7 }) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A: Hsp70 ---------- */
        let bind = 0, lid = 0, nuc = 'ATP', h40 = 0, nef = 0, rel = 0;       // lid: 0 open, 1 dicht
        if (step === 1) { bind = ease(sub(p, .2, .75)); h40 = ease(sub(p, 0, .35)); }
        if (step === 2) { bind = 1; h40 = 1 - ease(sub(p, .6, .9)); lid = ease(sub(p, .3, .7)); nuc = p > .3 ? 'ADP' : 'ATP'; }
        if (step === 3) { nef = ease(sub(p, 0, .3)) * (1 - ease(sub(p, .8, 1))); nuc = p < .35 ? 'ADP' : p < .5 ? '' : 'ATP'; lid = 1 - ease(sub(p, .5, .75)); bind = 1 - ease(sub(p, .65, 1)); rel = sub(p, .65, 1); }
        if (step >= 4) { bind = 0; }
        const pts = lerpPts(CH_FREE, CH_BOUND, bind);
        let cs = chain(pts, { w: 8 });
        // hydrofoob segment: tussen punten 5 en 7
        cs += `<path d="${smooth(pts.slice(5, 8))}" stroke="${HYD}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/>`;
        $('ch-chain').innerHTML = cs;
        $('ch-chainA').setAttribute('cx', 520); $('ch-chainA').setAttribute('cy', step <= 3 ? 330 : -9999);
        // Hsp70
        let hs = enz(760, 560, 130, 95, 'NBD', { fs: 24, dy: 20 }) + enz(930, 470, 78, 55, 'SBDβ', { fs: 21, dy: 30 });
        hs += tag(760, 530, nuc || '·', ATPC, { fs: 20, op: nuc ? 1 : 0 });
        if (step === 2) hs += spark(760, 530, sub(p, .25, .5));
        if (step === 3 && p > .3 && p < .55) hs += tag(lerp(760, 600, sub(p, .3, .5)), lerp(530, 700, sub(p, .3, .5)), 'ADP', ATPC, { fs: 18, op: 1 - sub(p, .45, .55) });
        if (step === 3 && p > .4 && p < .6) hs += tag(lerp(560, 760, sub(p, .4, .5)), lerp(720, 530, sub(p, .4, .5)), 'ATP', ATPC, { fs: 18 });
        hs += T(615, 480, 'Hsp70', { size: 30, col: C.prot, w: 800, anchor: 'end' });
        $('ch-hsp').innerHTML = step <= 3 ? hs : hs.replace('<g ', '<g ');
        // deksel (helixdomein), scharnier HINGE
        const th = lerp(-70, -172, lid) * Math.PI / 180;
        const lx = HINGE[0] + Math.cos(th) * LID_L, ly = HINGE[1] + Math.sin(th) * LID_L;
        $('ch-lid').innerHTML = `<path d="M${HINGE[0]},${HINGE[1]} L${f1(lx)},${f1(ly)}" stroke="${C.prot}" stroke-width="34" stroke-linecap="round" opacity=".55"/>` +
          `<path d="M${HINGE[0]},${HINGE[1]} L${f1(lx)},${f1(ly)}" stroke="${C.prot}" stroke-width="3" fill="none"/>` + T((HINGE[0] + lx) / 2 + (lid > .5 ? 0 : 44), (HINGE[1] + ly) / 2 - (lid > .5 ? 26 : 0), T2('deksel', 'lid'), { size: 21, col: '#c9b8ff', op: step === 0 ? 0 : step === 1 ? sub(p, 0, .2) : 1 });
        // co-chaperones
        let co = '';
        if (h40 > .01) co += enz(lerp(700, 850, h40), lerp(300, 380, h40), 70, 36, 'Hsp40', { col: C.prot2, fs: 20, op: h40, fillOp: .5 });
        if (nef > .01) co += enz(lerp(420, 610, nef), lerp(660, 600, nef), 70, 36, 'NEF', { col: C.prot2, fs: 20, op: nef, fillOp: .5 });
        $('ch-co').innerHTML = co;
        // labels
        let lb = '';
        if (step === 0) {
          lb += T(820, 250, T2('hydrofoob segment blootgesteld', 'hydrophobic segment exposed'), { size: 22, col: HYD });
        }
        if (step === 1) lb += tag(1180, 560, T2('lage affiniteit', 'low affinity'), '#8a93a8', { fs: 20, op: sub(p, .5, .7) });
        if (step === 2) lb += tag(1180, 560, T2('hoge affiniteit', 'high affinity'), C.ok, { fs: 20, op: sub(p, .6, .8) });
        if (step === 3) lb += T(1100, 250, T2('vrij → vouwen of opnieuw binden', 'free → fold or bind again'), { size: 22, col: C.chain, op: rel });
        $('ch-lbl').innerHTML = lb;
        // aggregaat (stap 0)
        let ag = '';
        if (step === 0) {
          const k = sub(p, .3, .7);
          ag += chain([[1250, 640], [1300, 600], [1280, 560], [1340, 540], [1330, 600], [1390, 620]], { col: '#8fbf86', w: 7, op: .8 }) + chain([[1270, 540], [1320, 580], [1370, 560], [1360, 500], [1410, 520]], { col: '#6f9a68', w: 7, op: .8 }) +
            chain([[1230, 590], [1290, 620], [1350, 640], [1400, 580]], { col: '#a3c79b', w: 7, op: .8 });
          ag += T(1320, 700, T2('aggregaat', 'aggregate'), { size: 22, col: C.danger, op: k });
          ag += T(760, 800, T2('cytosol: ~300–400 g/L macromoleculen', 'cytosol: ~300–400 g/L macromolecules'), { size: 24, col: C.muted, op: k });
        }
        $('ch-agg').innerHTML = ag;

        /* ---------- paneel B: GroEL–GroES ---------- */
        let g = '';
        const cisK = step === 6 ? ease(sub(p, .1, .45)) : step === 7 ? 1 - ease(sub(p, .45, .75)) : 0;   // bovenring
        const transK = step === 7 ? ease(sub(p, .45, .75)) * 0 : 0;
        g += ring(cisK, cisK < .5, false) + ring(transK, true, true);
        g += `<line x1="2180" y1="${EQ}" x2="2820" y2="${EQ}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 6"/>`;
        // GroES-deksel
        let esY = step === 6 ? lerp(120, EQ - 262, ease(sub(p, .1, .45))) : step === 7 ? lerp(EQ - 262, 60, ease(sub(p, .5, .8))) : 120;
        const esOp = step === 6 ? sub(p, 0, .1) : step === 7 ? 1 - sub(p, .75, .9) : step >= 4 && step < 6 ? 0 : 0;
        if (esOp > .01) g += `<g opacity="${f1(esOp)}"><path d="M${CX - 170},${f1(esY + 50)} C${CX - 150},${f1(esY - 10)} ${CX + 150},${f1(esY - 10)} ${CX + 170},${f1(esY + 50)} Z" fill="${C.prot2}" fill-opacity=".5" stroke="${C.prot2}" stroke-width="3"/>` + T(CX, esY + 34, 'GroES', { size: 22 }) + '</g>';
        // ATP
        const atpOn = step === 6 ? sub(p, .05, .2) : step === 7 ? 1 : 0;
        const adp = step === 7 && p > .3;
        for (const sx of [-1, 1]) g += tag(CX + sx * 205 - (sx * 38 * cisK), EQ - 38, adp ? 'ADP' : 'ATP', ATPC, { fs: 15, op: atpOn });
        if (atpOn > .5) g += T(CX, EQ - 20, adp ? T2('7 ADP', '7 ADP') : T2('7 ATP', '7 ATP'), { size: 20, col: ATPC, w: 800 });
        if (step === 7) { g += tag(CX + 205, EQ + 38, 'ATP', ATPC, { fs: 15, op: sub(p, .35, .45) }) + tag(CX - 205, EQ + 38, 'ATP', ATPC, { fs: 15, op: sub(p, .35, .45) }); g += spark(CX + 205, EQ - 38, sub(p, .1, .35)); }
        // substraat
        if (step === 4) g += unf(CX, 150, 1.2);
        if (step === 5) { const k = ease(sub(p, .1, .6)); g += unf(CX, lerp(150, EQ - 225, k), lerp(1.2, 1.45, k)); }
        if (step === 6) {
          const k = ease(sub(p, .3, .55)), f = ease(sub(p, .55, .95));
          const y = lerp(EQ - 225, EQ - 110, k);
          g += unf(CX, y, lerp(1.45, .6, f), 1 - f) + folded(CX, y, f);
          g += T(CX, EQ - 330 - 30, T2('~10 s alleen in de kooi', '~10 s alone in the cage'), { size: 20, col: C.chain, op: sub(p, .6, .8) });
        }
        if (step === 7) { const y = lerp(EQ - 110, 110, ease(sub(p, .55, .9))); g += folded(CX, y, 1); g += T(CX + 250, 130, T2('natief eiwit vrij', 'native protein released'), { size: 20, col: C.chain, op: sub(p, .8, .95), anchor: 'start' }); }
        // labels paneel B
        g += T(CX, 760, T2('GroEL: 2 ringen × 7 subeenheden (doorsnede)', 'GroEL: 2 rings × 7 subunits (cross-section)'), { size: 22, col: C.prot });
        if (step === 4) g += TL(CX, 830, [T2('mens: TRiC/CCT (2 × 8 verschillende subeenheden, ingebouwd deksel)', 'human: TRiC/CCT (2 × 8 different subunits, built-in lid)')], { size: 20, col: '#c9d2e4', w: 500 });
        if (step === 5) g += T(CX + 290, EQ - 190, T2('hydrofobe plaatsen', 'hydrophobic sites'), { size: 20, col: HYD, anchor: 'start' });
        if (step === 6) g += T(CX + 330, EQ - 150, T2('hydrofiele wand', 'hydrophilic wall'), { size: 20, col: '#5fd3e6', anchor: 'start', op: sub(p, .35, .5) });
        g += T(2160, EQ - 150, 'cis', { size: 20, col: C.muted, anchor: 'end', op: step >= 6 ? 1 : 0 }) + T(2160, EQ + 160, 'trans', { size: 20, col: C.muted, anchor: 'end', op: step >= 6 ? 1 : 0 });
        $('ch-groel').innerHTML = g;
      },
    };
  },
};
