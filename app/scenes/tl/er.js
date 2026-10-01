/*
 * Ruw ER & SRP-route — co-translationele targeting van prepro-albumine (mens):
 * signaalpeptide → SRP (pauze) → SRP-receptor → Sec61 → translocatie → signaalpeptidase → OST (teaser) → membraaneiwitten.
 */
import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa, AACLASS, CLASSCOL } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';

/* humaan serumalbumine (UniProt P02768): signaal 1–18 · propeptide 19–24 · begin rijp eiwit */
const SEQ = 'MKWVTFISLLFLFSSAYS' + 'RGVFRR' + 'DAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQ';
const NSIG = 18;
const MT = 600, MB = 650;                                 // membraan boven/onder
const PORE = 800, GATE = 852;                             // Sec61-porie en laterale poort
const FREE = [600, 400], DOCK = [PORE, 586];              // uitgang van de tunnel: vrij / gedokt
const SRA = [985, 572];                                   // SRP-receptor (SRα boven SRβ)
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const E2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
/* drieletterige namen op de aminozuren alleen in stappen waar ze leesbaar zijn (ver uitgezoomd: gekleurde bolletjes) */
const LET = [0, 1, 1, 0, 0, 0, 1, 0, 0];
const bead = (x, y, a, r, lo) => lo >= .99 ? aa(x, y, a, r) : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]] ?? '#aaa'}" stroke="#0a1224" stroke-width="2"/>` +
  (lo > .01 ? `<g opacity="${f1(lo)}">${aa(x, y, a, r)}</g>` : '');

/* punten op gelijke afstand langs een polylijn */
function along(pts, n, d) {
  const out = []; let seg = 0, acc = 0, pos = 0;
  const segLen = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  for (let k = 0; k < n; k++) {
    const target = k * d;
    while (seg < segLen.length - 1 && acc + segLen[seg] < target) { acc += segLen[seg]; seg++; }
    const u = segLen[seg] ? Math.min(1.5, (target - acc) / segLen[seg]) : 0;
    out.push([lerp(pts[seg][0], pts[seg + 1][0], u), lerp(pts[seg][1], pts[seg + 1][1], u)]);
    pos = target;
  }
  return out;
}

export default {
  id: 'er',
  title: { nl: 'Ruw ER & SRP-route', en: 'Rough ER & SRP pathway' },
  scale: '≈ 30 nm', time: { nl: 'seconden tot minuten (vertraagd)', en: 'seconds to minutes (slowed down)' },
  org: { nl: 'mens (prepro-albumine, levercel)', en: 'human (prepro-albumin, liver cell)' },
  legend: [[C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.rna, 'mRNA / 7SL-RNA'], [C.prot, { nl: 'SRP54, SRP-receptor, Sec61, enzymen', en: 'SRP54, SRP receptor, Sec61, enzymes' }], [C.mem, { nl: 'ER-membraan', en: 'ER membrane' }], ['#7fdc6a', { nl: 'hydrofoob', en: 'hydrophobic' }], ['#4f8ff7', { nl: 'positief', en: 'positive' }], ['#5fd3e6', { nl: 'polair', en: 'polar' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Voorbeeld: humaan serumalbumine (UniProt P02768). Signaalpeptide MKWVTFISLLFLFSSAYS (1–18) wordt in het ER geknipt; het propeptide RGVFRR wordt later in het Golgi (furine) verwijderd.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Example: human serum albumin (UniProt P02768). The signal peptide MKWVTFISLLFLFSSAYS (1–18) is cleaved in the ER; the propeptide RGVFRR is removed later in the Golgi (furin).</p>' },
  simplified: {
    nl: 'Schematisch: het ribosoom is gekanteld getekend, de keten in de tunnel is weggelaten en aminozuren zijn bolletjes (geen helix-geometrie). SRP bestaat uit 7SL-RNA + 6 eiwitten; hier alleen de RNA-staaf, SRP54 en het Alu-domein. GTP-hydrolyse, TRAP/TRAM, BiP en de exacte topologie in de laterale poort zijn vereenvoudigd.',
    en: 'Schematic: the ribosome is drawn tilted, the chain inside the tunnel is omitted and amino acids are beads (no helix geometry). SRP consists of 7SL RNA + 6 proteins; only the RNA rod, SRP54 and the Alu domain are shown. GTP hydrolysis, TRAP/TRAM, BiP and the exact topology in the lateral gate are simplified.' },
  steps: [
    ST(8500, FULL, 'Waar moet dit eiwit naartoe?', 'Where does this protein go?', 'Een vrij ribosoom in het cytosol begint prepro-albumine te maken. Het eiwit moet uiteindelijk de cel uit, dus eerst het ER in.', 'A free ribosome in the cytosol starts making prepro-albumin. The protein must eventually leave the cell, so it first has to enter the ER.'),
    ST(9000, cam(700, 340, 1100), 'Het signaalpeptide', 'The signal peptide', 'De eerste ≈ 18 aminozuren vormen een signaalpeptide: een positief N-uiteinde, een hydrofobe kern en een kleine polaire knipplaats (A-Y-S↓).', 'The first ≈ 18 amino acids form a signal peptide: a positive N terminus, a hydrophobic core and a small polar cleavage site (A-Y-S↓).'),
    ST(8500, cam(700, 360, 1100), 'SRP bindt: translatie pauzeert', 'SRP binds: translation pauses', 'Het signal recognition particle (SRP) grijpt de hydrofobe kern met SRP54. Het Alu-domein remt de elongatie, zodat het eiwit niet in het cytosol vouwt.', 'The signal recognition particle (SRP) grips the hydrophobic core with SRP54. Its Alu domain slows elongation so the protein does not fold in the cytosol.'),
    ST(8500, cam(760, 470, 1250), 'Naar de SRP-receptor op het ER', 'To the SRP receptor on the ER', 'Het complex ribosoom–SRP dokt aan de SRP-receptor (SRα + SRβ) in het ER-membraan. SRP54 en SRα binden beide GTP.', 'The ribosome–SRP complex docks on the SRP receptor (SRα + SRβ) in the ER membrane. SRP54 and SRα both bind GTP.'),
    ST(9000, cam(820, 560, 950), 'Overdracht naar het Sec61-translocon', 'Handover to the Sec61 translocon', 'GTP-hydrolyse laat SRP los. Het ribosoom zet zijn tunnel op het Sec61-kanaal; het signaalpeptide opent de laterale poort als een lus.', 'GTP hydrolysis releases SRP. The ribosome places its tunnel on the Sec61 channel; the signal peptide opens the lateral gate as a loop.'),
    ST(9000, cam(820, 640, 950), 'Translocatie tijdens de translatie', 'Translocation during translation', 'De translatie gaat verder: de groeiende keten schuift rechtstreeks door Sec61 het ER-lumen in (co-translationeel).', 'Translation resumes: the growing chain threads straight through Sec61 into the ER lumen (co-translationally).'),
    ST(8500, cam(820, 660, 950), 'Signaalpeptidase knipt', 'Signal peptidase cleaves', 'Het signaalpeptidase-complex (actief centrum in het lumen) knipt na A-Y-S. Het signaalpeptide blijft achter in het membraan en wordt afgebroken.', 'The signal peptidase complex (active site in the lumen) cleaves after A-Y-S. The signal peptide stays behind in the membrane and is degraded.'),
    ST(8500, cam(860, 640, 1100), 'Teaser: N-glycosylering door OST', 'Teaser: N-glycosylation by OST', 'Oligosaccharyltransferase (OST) zet een voorgevormde suikerboom (Glc₃Man₉GlcNAc₂) op Asn in N-X-S/T. Albumine heeft zo\'n sequon niet en blijft onbeladen.', 'Oligosaccharyltransferase (OST) transfers a preformed sugar tree (Glc₃Man₉GlcNAc₂) onto Asn in N-X-S/T. Albumin lacks such a sequon and stays unglycosylated.'),
    ST(9500, cam(1060, 560, 1150), 'Membraaneiwitten: stop-transfer en signaalanker', 'Membrane proteins: stop-transfer and signal anchor', 'Een tweede hydrofoob segment (stop-transfer) verlaat Sec61 zijdelings en blijft als transmembraanhelix in het membraan. Een niet-geknipt signaalanker doet hetzelfde.', 'A second hydrophobic segment (stop-transfer) leaves Sec61 sideways and stays in the membrane as a transmembrane helix. An uncleaved signal anchor does the same.'),
  ],
  svg() {
    let heads = '';
    for (let x = -300; x < 1900; x += 16) heads += `<circle cx="${x}" cy="${MT + 5}" r="6"/><circle cx="${x}" cy="${MB - 5}" r="6"/>`;
    return svgOpen() + `
    <rect x="-300" y="${MB}" width="2200" height="700" fill="rgba(201,165,116,.07)"/>
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Verder naar het Golgi', 'On to the Golgi')}">
      <rect x="-300" y="${MT}" width="2200" height="${MB - MT}" fill="rgba(201,165,116,.18)"/>
      <g fill="${C.mem}" opacity=".85">${heads}</g>
      <circle id="er-golgiA" data-anchor="golgi" cx="330" cy="${MB + 130}" r="1" fill="none"/>
    </g>
    <g id="er-lab"></g>
    <g id="er-sec61"></g>
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}"><g id="er-ribo"></g><circle id="er-rA" data-anchor="ribosoom" r="1" fill="none"/></g>
    <g data-node="vouwing" data-color="${C.chain}" data-nolabel><g id="er-chain"></g></g>
    <g data-node="rnastructuur" data-color="${C.rna}" data-label="${T2('SRP (7SL-RNA + eiwitten)', 'SRP (7SL RNA + proteins)')}"><g id="er-srp"></g><circle id="er-sA" data-anchor="rnastructuur" r="1" fill="none"/></g>
    <g data-node="ptm" data-color="${C.prot3}" data-nolabel><g id="er-spc"></g></g>
    <g data-node="glyco" data-color="#4f8ff7" data-label="${T2('Glycosylering', 'Glycosylation')}"><g id="er-ost"></g><circle id="er-gA" data-anchor="glyco" data-pos="below" r="1" fill="none"/></g>
    <g id="er-ov"></g>
    ${hud('er-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'golgi', label: { nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, color: C.mem },
      { node: 'glyco', label: { nl: 'Glycosylering', en: 'Glycosylation' }, color: '#4f8ff7' },
      { node: 'disulfide', label: { nl: 'Disulfidebruggen', en: 'Disulfide bonds' }, color: C.prot },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const hide = id => $(id).setAttribute('cx', '-9999');
    /* ribosoom gekanteld: grote subeenheid onder (tunneluitgang op (ex, ey)), kleine erboven, mRNA ertussen */
    const ribo = (ex, ey, pause = 0) => `<g transform="translate(${f1(ex)} ${f1(ey)}) scale(.78) translate(${f1(-ex)} ${f1(-ey)})"><path d="M${ex - 170},${ey - 6} C${ex - 210},${ey - 120} ${ex - 130},${ey - 215} ${ex},${ey - 220} C${ex + 130},${ey - 215} ${ex + 210},${ey - 120} ${ex + 170},${ey - 6} Z" fill="rgba(44,198,168,.15)" stroke="${C.rrna}" stroke-width="3"/>` +
      `<path d="M${ex - 150},${ey - 240} C${ex - 150},${ey - 320} ${ex + 150},${ey - 320} ${ex + 150},${ey - 240} Z" fill="rgba(44,198,168,.22)" stroke="${C.rrna}" stroke-width="3"/>` +
      `<line x1="${ex - 280}" y1="${ey - 232}" x2="${ex + 280}" y2="${ey - 232}" stroke="${C.rna}" stroke-width="6"/>` + txt(ex - 290, ey - 224, "5'", C.rna, 24, 'end') + txt(ex + 290, ey - 224, "3'", C.rna, 24, 'start') +
      `<path d="M${ex},${ey - 150} L${ex},${ey - 6}" stroke="rgba(44,198,168,.5)" stroke-width="20" stroke-linecap="round"/>` +
      (pause > .01 ? `<g opacity="${f1(pause)}">${txt(ex + 200, ey - 300, T2('⏸ elongatie geremd', '⏸ elongation arrested'), '#fff', 26, 'start', 700)}</g>` : '') + '</g>';
    const sec61 = (gate = 0) => `<rect x="${PORE - 58}" y="${MT - 12}" width="40" height="${MB - MT + 24}" rx="10" fill="${C.prot}" opacity=".85"/>` +
      `<rect x="${PORE + 18 + gate * 26}" y="${MT - 12}" width="40" height="${MB - MT + 24}" rx="10" fill="${C.prot}" opacity=".85"/>`;

    function chainPos(state, m, t0, clv) {
      // posities voor residuen 1..m; state: 'free' (t.o.v. uitgang), 'dock' (lus in lumen), 'cut' (rijpe keten hangt)
      if (state.k === 'free') {
        const [ex, ey] = state.exit;
        const path = [[ex, ey], [ex + 12, ey + 16], [ex + 60, ey + 14], [ex + 130, ey - 4], [ex + 190, ey - 30], [ex + 240, ey - 60], [ex + 300, ey - 76], [ex + 360, ey - 70], [ex + 420, ey - 44], [ex + 470, ey - 100], [ex + 500, ey - 150], [ex + 520, ey - 200]];
        const pts = along(path, m, 30);                   // pts[0] = residu m (bij de uitgang)
        return pts.reverse();
      }
      // gedokt: signaal als helix in de laterale poort, rest als lus in het lumen
      const out = [];
      for (let i = 1; i <= Math.min(m, NSIG); i++) out.push([GATE + 20 + (i % 2) * 10 - 5, MT - 60 + (i - 1) * 9]);
      if (m <= NSIG) return out;
      const n = m - NSIG, need = (n - 1) * 26;
      if (state.k === 'dock') {
        const path = [[GATE + 20, MT - 60 + 17 * 9], [940, 770], [1000, 810], [990, 860], [900, 872], [820, 850], [780, 800], [PORE, 740], [PORE, 690], [PORE, 660], [PORE, 630], [PORE, 600]];
        const Ltot = path.slice(1).reduce((a, q, j) => a + Math.hypot(q[0] - path[j][0], q[1] - path[j][1]), 0);
        const pts = along(path.slice().reverse(), n, Math.min(26, Ltot / Math.max(1, n - 1)));
        pts.reverse(); for (const q of pts) out.push(q);
        return out;
      }
      const path = [[PORE, 600], [PORE, 690], [770, 760], [700, 800], [630, 790], [580, 740], [560, 680], [540, 740], [490, 800], [420, 790]];
      const pts = along(path, n, 26).reverse();
      for (const q of pts) out.push(q);
      return out;
    }

    return {
      update(t, s) {
        placeHud(svg, 'er-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        const gA = i === 7 ? [420, 850] : i === 8 ? [700, 800] : [330, MB + 130];
        $('er-golgiA').setAttribute('cx', gA[0]); $('er-golgiA').setAttribute('cy', gA[1]);
        let rb = '', ch = '', srp = '', ost = '', spc = '', ov = '', lab = '';
        // positie van het ribosoom
        let exit = FREE;
        if (i === 3) exit = E2(FREE, DOCK, ease(sub(p, .1, .75)));
        if (i >= 4) exit = DOCK;
        const showRibo = i <= 7 ? 1 : 1 - sub(p, 0, .2);
        // aantal residuen buiten de tunnel
        const m = i === 0 ? Math.round(lerp(0, 8, sub(p, .3, 1))) : i === 1 ? Math.round(lerp(8, 20, sub(p, 0, .7))) : i <= 3 ? 20 + (i === 3 ? 1 : 0) :
          i === 4 ? 21 + Math.round(4 * sub(p, .5, 1)) : i === 5 ? Math.round(lerp(25, 44, sub(p, .1, .95))) : 44;
        const pause = i === 2 ? sub(p, .5, .7) : i === 3 ? 1 : i === 4 ? 1 - sub(p, .3, .5) : 0;
        if (showRibo > .01) rb = `<g opacity="${f1(showRibo)}">${ribo(exit[0], exit[1], pause)}</g>`;
        $('er-rA').setAttribute('cx', showRibo > .5 ? f1(exit[0] - 100) : '-9999'); $('er-rA').setAttribute('cy', f1(exit[1] - 260));
        $('er-sec61').innerHTML = sec61(i === 4 ? sub(p, .45, .75) : i >= 5 && i <= 7 ? 1 : i === 8 ? 1 : 0);
        // keten
        let pos;
        const free = chainPos({ k: 'free', exit }, m);
        if (i <= 3) pos = free;
        else if (i === 4) { const d = chainPos({ k: 'dock' }, m), f = chainPos({ k: 'free', exit }, m), k = ease(sub(p, .35, .8)); pos = f.map((q, j) => E2(q, d[j] ?? q, k)); }
        else if (i === 5) pos = chainPos({ k: 'dock' }, m);
        else if (i === 6) { const d = chainPos({ k: 'dock' }, m), c = chainPos({ k: 'cut' }, m), k = ease(sub(p, .45, .9)); pos = d.map((q, j) => j < NSIG ? q : E2(q, c[j], k)); }
        else pos = chainPos({ k: 'cut' }, m);
        if (showRibo > .01 && m > 0) {
          const cutDone = i >= 7 || (i === 6 && p > .4);
          const sigOp = i === 6 ? 1 - sub(p, .6, 1) : i >= 7 ? 0 : 1;
          let line = '';
          for (let j = 0; j < pos.length - 1; j++) { if (cutDone && j === NSIG - 1) continue; const o = j < NSIG ? sigOp : 1; line += `<line x1="${f1(pos[j][0])}" y1="${f1(pos[j][1])}" x2="${f1(pos[j + 1][0])}" y2="${f1(pos[j + 1][1])}" stroke="${C.chain}" stroke-width="4" opacity="${f1(o)}"/>`; }
          // laatste residu naar de tunnel
          const last = pos[pos.length - 1]; line += `<line x1="${f1(last[0])}" y1="${f1(last[1])}" x2="${f1(exit[0])}" y2="${f1(exit[1] - 4)}" stroke="${C.chain}" stroke-width="4"/>`;
          ch += `<g opacity="${f1(showRibo)}">${line}`;
          if (i >= 4 && i <= 6) ch += `<rect x="${GATE + 4}" y="${MT - 70}" width="42" height="${17 * 9 + 22}" rx="18" fill="rgba(127,220,106,.18)" stroke="${C.chain}" stroke-width="2" opacity="${f1(sigOp * (i === 4 ? sub(p, .6, .8) : 1))}"/>`;
          const lo = i > 0 && LET[i] !== LET[i - 1] ? lerp(LET[i - 1], LET[i], sub(p, 0, .2)) : LET[i];
          pos.forEach((q, j) => { const o = j < NSIG ? sigOp : 1, inGate = i >= 4 && j < NSIG; if (o > .01) ch += `<g opacity="${f1(o)}">${bead(q[0], q[1], SEQ[j], inGate ? 11 : i === 1 || i === 2 ? 15 : 14, inGate ? 0 : lo)}</g>`; });
          if (i <= 3 && pos.length) ch += txt(pos[0][0] + 8, pos[0][1] - 20, 'N', '#fff', 20, 'middle', 800);
          ch += '</g>';
        }
        $('er-chain').innerHTML = ch;
        // labels in het overzicht
        if (i === 0) lab += `<g opacity="${f1(sub(p, .1, .3))}">${txt(1300, 250, 'cytosol', C.muted, 28, 'middle', 700)}${txt(1300, 780, T2('ER-lumen', 'ER lumen'), C.mem, 28, 'middle', 700)}${txt(1300, MT - 16, T2('ER-membraan (ruw ER)', 'ER membrane (rough ER)'), C.mem, 22, 'middle', 700)}${txt(PORE, MB + 50, 'Sec61', C.prot, 22, 'middle', 700)}${txt(SRA[0] + 20, MB + 50, T2('SRP-receptor', 'SRP receptor'), C.prot, 22, 'start', 700)}</g>`;
        if (i === 1 && m >= 18) {
          const k = sub(p, .7, .85), a = pos[0], b = pos[2], c = pos[12], d = pos[17];
          lab += `<g opacity="${f1(k)}">${txt(a[0] + 26, a[1] + 6, T2('n (+)', 'n (+)'), '#4f8ff7', 20, 'start', 800)}${txt((b[0] + c[0]) / 2, Math.max(b[1], c[1]) + 70, T2('hydrofobe kern (h)', 'hydrophobic core (h)'), C.chain, 22, 'middle', 800)}${txt(d[0] + 10, d[1] + 44, T2('c: A-Y-S ↓', 'c: A-Y-S ↓'), '#5fd3e6', 20, 'start', 800)}</g>`;
        }
        $('er-lab').innerHTML = lab;
        // SRP
        if (i >= 2 && i <= 4) {
          const k = i === 2 ? ease(sub(p, .05, .5)) : 1, rel = i === 4 ? ease(sub(p, .3, .7)) : 0;
          const core = pos.slice(3, 13), cxh = core.reduce((a, q) => a + q[0], 0) / core.length, cyh = core.reduce((a, q) => a + q[1], 0) / core.length;
          const bind = E2([cxh + 260, cyh - 220], [cxh + 30, cyh + 10], k);
          const off = [rel * 160, -rel * 120];
          const b54 = [bind[0] + off[0], bind[1] + off[1]], alu = [exit[0] + 24 + off[0], exit[1] - 181 + off[1]];
          const srpOp = i === 2 ? sub(p, 0, .15) : i === 3 ? 1 : 1 - sub(p, .6, .9);
          srp += `<g opacity="${f1(srpOp)}">` +
            `<path d="M${f1(b54[0])},${f1(b54[1])} C${f1(b54[0] + 170)},${f1(b54[1] - 60)} ${f1(alu[0] + 200)},${f1(alu[1] + 60)} ${f1(alu[0])},${f1(alu[1])}" stroke="${C.rna}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
            `<ellipse cx="${f1(b54[0])}" cy="${f1(b54[1])}" rx="50" ry="30" fill="${C.prot}" opacity=".9"/>${txt(b54[0], b54[1] + 7, 'SRP54', '#fff', 18, 'middle', 800)}` +
            `<ellipse cx="${f1(alu[0])}" cy="${f1(alu[1])}" rx="30" ry="18" fill="${C.prot3}"/>${txt(alu[0], alu[1] + 6, 'Alu', '#fff', 15, 'middle', 700)}` +
            (i === 3 || (i === 4 && p < .4) ? txt(b54[0], b54[1] - 42, 'GTP', '#ffe08a', 16, 'middle', 700) : '') + '</g>';
          $('er-sA').setAttribute('cx', f1(b54[0] + 150)); $('er-sA').setAttribute('cy', f1(b54[1] - 90));
        } else hide('er-sA');
        // SRP-receptor
        srp += `<g opacity="${f1(i === 0 ? sub(p, .1, .3) : i === 8 ? 1 - sub(p, 0, .2) : 1)}"><rect x="${SRA[0] - 14}" y="${MT - 6}" width="28" height="${MB - MT + 12}" rx="8" fill="${C.prot2}"/><ellipse cx="${SRA[0]}" cy="${SRA[1] - 24}" rx="44" ry="26" fill="${C.prot2}"/>${txt(SRA[0], SRA[1] - 18, 'SRα', '#fff', 17, 'middle', 800)}${i >= 3 && i <= 4 ? txt(SRA[0] + 60, SRA[1] - 18, i === 4 && p > .4 ? 'GDP' : 'GTP', '#ffe08a', 16, 'start', 700) : ''}${i >= 3 ? txt(SRA[0] + 22, MB + 22, 'SRβ', C.muted, 15, 'start', 700) : ''}</g>`;
        $('er-srp').innerHTML = srp;
        // signaalpeptidase, OST
        if (i === 6) {
          const k = sub(p, .05, .25), flash = sub(p, .35, .5);
          spc += `<g opacity="${f1(k)}"><ellipse cx="${GATE + 110}" cy="${MB + 60}" rx="62" ry="28" fill="${C.prot3}"/>${txt(GATE + 110, MB + 66, 'SPC', '#fff', 18, 'middle', 800)}${txt(GATE + 185, MB + 66, T2('signaalpeptidase', 'signal peptidase'), C.prot, 18, 'start', 700)}</g>`;
          if (flash > 0 && flash < 1) spc += `<circle cx="${GATE + 28}" cy="${MT + 100}" r="${f1(16 + 30 * flash)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - flash)}"/>`;
          ov += `<g opacity="${f1(sub(p, .45, .6))}">${txt(GATE + 60, MT + 104, '✂', '#fff', 30, 'middle', 800)}</g>`;
          ov += `<g opacity="${f1(sub(p, .75, .9))}">${txt(420, 860, T2('N-terminus van pro-albumine: RGVFRR-DAHK…', 'N terminus of pro-albumin: RGVFRR-DAHK…'), '#fff', 20, 'start', 700)}</g>`;
        }
        if (i === 7) {
          const k = sub(p, .05, .25);
          ost += `<g opacity="${f1(k)}"><rect x="630" y="${MT - 10}" width="70" height="${MB - MT + 20}" rx="12" fill="${C.prot2}"/><ellipse cx="665" cy="${MB + 30}" rx="60" ry="26" fill="${C.prot2}"/>${txt(665, MB + 37, 'OST', '#fff', 18, 'middle', 800)}</g>`;
          // lipide-gekoppelde suikerboom (SNFG: GlcNAc blauw vierkant, Man groen rond, Glc blauw rond)
          const gx = 560, gy = MB + 10, g = sub(p, .2, .4);
          let tree = `<line x1="${gx}" y1="${MT + 10}" x2="${gx}" y2="${gy}" stroke="${C.mem}" stroke-width="4"/>`;
          tree += `<rect x="${gx - 8}" y="${gy}" width="16" height="16" fill="#4f8ff7"/><rect x="${gx - 8}" y="${gy + 20}" width="16" height="16" fill="#4f8ff7"/>`;
          const man = [[0, 48], [-22, 70], [22, 70], [-36, 94], [-10, 94], [22, 94], [-36, 118], [-10, 118], [22, 118]];
          man.forEach(([dx, dy]) => { tree += `<circle cx="${gx + dx}" cy="${gy + dy}" r="8" fill="#5ad17a"/>`; });
          [[-36, 142], [-36, 164], [-36, 186]].forEach(([dx, dy]) => { tree += `<circle cx="${gx + dx}" cy="${gy + dy}" r="8" fill="#4f8ff7"/>`; });
          ost += `<g opacity="${f1(g)}">${tree}${txt(gx - 60, gy + 60, 'Glc₃Man₉GlcNAc₂', '#fff', 17, 'end', 700)}${txt(gx - 60, gy + 84, T2('op dolichol-PP', 'on dolichol-PP'), C.muted, 16, 'end', 600)}</g>`;
          $('er-gA').setAttribute('cx', '665'); $('er-gA').setAttribute('cy', f1(MB + 60));
          ov += `<g opacity="${f1(sub(p, .5, .65))}">` + textBox(940, 700, 430, [T2('sequon N-X-S/T (X ≠ Pro)', 'sequon N-X-S/T (X ≠ Pro)'), T2('albumine: geen sequon', 'albumin: no sequon')], { col: '#4f8ff7', fs: 21 }) + '</g>';
        } else hide('er-gA');
        if (i === 8) {
          const k = sub(p, .15, .35), k2 = sub(p, .5, .7);
          const tm = (x, nUp, lab, op) => `<g opacity="${f1(op)}"><rect x="${x - 16}" y="${MT - 16}" width="32" height="${MB - MT + 32}" rx="14" fill="${C.chain}" opacity=".9"/>` +
            `<path d="M${x},${MT - 16} C${x},${MT - 80} ${x + 50},${MT - 80} ${x + 60},${MT - 120}" stroke="${C.chain}" stroke-width="5" fill="none"/>` +
            `<path d="M${x},${MB + 16} C${x},${MB + 80} ${x - 50},${MB + 80} ${x - 60},${MB + 120}" stroke="${C.chain}" stroke-width="5" fill="none"/>` +
            txt(x + 72, MT - 126, nUp ? 'N' : 'C', '#fff', 22, 'start', 800) + txt(x - 72, MB + 140, nUp ? 'C' : 'N', '#fff', 22, 'end', 800) +
            txt(x + 40, MB + 175, lab, C.text, 19, 'middle', 700) + '</g>';
          ov += tm(1120, false, T2('type I: stop-transfer', 'type I: stop-transfer'), k) + tm(1400, true, T2('type II: signaalanker', 'type II: signal anchor'), k2);
          ov += `<g opacity="${f1(k)}"><path d="M${PORE + 70},${MT + 25} h180" stroke="#fff" stroke-width="3" marker-end="url(#arrow)"/>${txt(PORE + 160, MT - 20, T2('laterale poort', 'lateral gate'), '#fff', 18, 'middle', 700)}</g>`;
          ov += `<g opacity="${f1(sub(p, .75, .9))}">${txt(1260, 320, T2('meerdere TM-segmenten → multi-pass eiwit', 'several TM segments → multi-pass protein'), C.muted, 21, 'middle', 700)}</g>`;
        }
        $('er-ribo').innerHTML = rb; $('er-spc').innerHTML = spc; $('er-ost').innerHTML = ost; $('er-ov').innerHTML = ov;
      },
    };
  },
};
