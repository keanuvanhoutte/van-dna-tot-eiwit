/*
 * Ruw ER & SRP-route — co-translationele targeting van prepro-albumine (mens):
 * signaalpeptide → SRP (pauze) → SRP-receptor → Sec61 → translocatie → signaalpeptidase → OST (teaser) → membraaneiwitten.
 */
import { C, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa, AACLASS, CLASSCOL } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';
import { membraanLijn, ribosoom80S, eiwit, eiwitPad, tmHelix } from '../../bio.js';
import { sugar } from '../prot/_b_kit.js';

/* humaan serumalbumine (UniProt P02768): signaal 1–18 · propeptide 19–24 · begin rijp eiwit */
const SEQ = 'MKWVTFISLLFLFSSAYS' + 'RGVFRR' + 'DAHKSEVAHRFKDLGEENFKALVLIAFAQYLQQ';
const NSIG = 18;
const MT = 600, MB = 650;                                 // membraan boven/onder
const PORE = 800, GATE = 828;                             // Sec61-porie en laterale poort (signaalhelix)
const MY = (MT + MB) / 2, MW = MB - MT;                   // midden en dikte van de ER-membraan (lipidedubbellaag)
/* 80S-ribosoom (bio.js): 40S boven met het mRNA, tRNA's tot het PTC, tunnel door de 60S; uitgang op (0,0) → verschoven naar de tunneluitgang */
const RS = 1.1, R80 = ribosoom80S(0, 0, { s: RS });
const FREE = [600, 400], DOCK = [PORE, 586];              // uitgang van de tunnel: vrij / gedokt
const SRA = [1080, 572];                                  // SRP-receptor (SRα boven SRβ)
/* SRP54 zit aan de tunneluitgang (tegen uL23/uL29) en houdt het signaal als helix in zijn groef (Halic et al. 2004; Janda et al. 2010) */
const S54 = [140, 36];                                    // SRP54 t.o.v. de tunneluitgang
const RECEP = [SRA[0] - 75 - S54[0], SRA[1] - 67 - S54[1]];   // uitgang wanneer SRP54 op SRα zit: ribosoom bij het membraan, nog níet op Sec61
const SL7 = '#ff9ecf';                                    // 7SL-RNA (eigen kleur, niet die van het mRNA)
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
  legend: [[C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.rna, 'mRNA'], [SL7, { nl: '7SL-RNA (in SRP)', en: '7SL RNA (in SRP)' }], [C.prot, { nl: 'SRP54, SRP-receptor, Sec61, enzymen', en: 'SRP54, SRP receptor, Sec61, enzymes' }], [C.mem, { nl: 'ER-membraan', en: 'ER membrane' }], ['#7fdc6a', { nl: 'hydrofoob', en: 'hydrophobic' }], ['#4f8ff7', { nl: 'positief', en: 'positive' }], ['#5fd3e6', { nl: 'polair', en: 'polar' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Voorbeeld: humaan serumalbumine (UniProt P02768). Signaalpeptide MKWVTFISLLFLFSSAYS (1–18) wordt in het ER geknipt; het propeptide RGVFRR wordt later, na het ER, verwijderd (waarschijnlijk door furine).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Example: human serum albumin (UniProt P02768). The signal peptide MKWVTFISLLFLFSSAYS (1–18) is cleaved in the ER; the propeptide RGVFRR is removed later, after the ER (probably by furin).</p>' },
  simplified: {
    nl: 'Schematisch: het ribosoom is een 2D-schets (40S boven met het mRNA, 60S onder; de keten loopt als lijn door de tunnel van de 60S) en aminozuren zijn bolletjes (geen helix-geometrie). SRP bestaat uit 7SL-RNA + 6 eiwitten; hier alleen de RNA-staaf, SRP54 en het Alu-domein. GTP-hydrolyse, TRAP/TRAM, BiP en de exacte topologie in de laterale poort zijn vereenvoudigd.',
    en: 'Schematic: the ribosome is a 2D sketch (40S on top with the mRNA, 60S below; the chain runs as a line through the 60S tunnel) and amino acids are beads (no helix geometry). SRP consists of 7SL RNA + 6 proteins; only the RNA rod, SRP54 and the Alu domain are shown. GTP hydrolysis, TRAP/TRAM, BiP and the exact topology in the lateral gate are simplified.' },
  steps: [
    ST(8500, FULL, 'Waar moet dit eiwit naartoe?', 'Where does this protein go?', 'Een ribosoom maakt albumine, dat de cel uit moet. Eerst moet het in het ER, een netwerk van membranen.', 'A ribosome makes albumin, which must leave the cell. So it first has to enter the ER: a network of membranes.'),
    ST(9000, cam(640, 340, 1100), 'Het adreslabel', 'The address label', 'De eerste ≈ 18 aminozuren vormen een adreslabel (signaalpeptide), met in het midden een waterafstotend stuk.', 'The first ≈ 18 amino acids form an address label (signal peptide), with a water-repelling stretch in the middle.'),
    ST(8500, cam(700, 360, 1100), 'Het label wordt herkend', 'The label is recognised', 'Een herkenningsdeeltje (SRP) grijpt het label vast en remt de aanmaak af, zodat er tijd is om het ER te bereiken.', 'A recognition particle (SRP) grabs the label and slows production, giving time to reach the ER.'),
    ST(8500, cam(760, 470, 1250), 'Op weg naar het ER', 'On the way to the ER', 'Ribosoom en herkenningsdeeltje hechten aan een ontvanger (receptor) in het ER-membraan.', 'Ribosome and recognition particle dock onto a receiver (receptor) in the ER membrane.'),
    ST(9000, cam(820, 560, 950), 'Over naar het kanaal', 'Handed over to the channel', 'Het deeltje laat los. Het ribosoom gaat op een kanaal in het ER-membraan zitten; het label opent dat kanaal.', 'The particle lets go. The ribosome sits down on a channel in the ER membrane; the label opens that channel.'),
    ST(9000, cam(840, 622, 1040), 'De keten schuift het ER in', 'The chain threads into the ER', 'De aanmaak gaat verder: de groeiende keten schuift meteen door het kanaal naar de binnenkant van het ER.', 'Production resumes: the growing chain threads straight through the channel into the inside of the ER.'),
    ST(8500, cam(810, 630, 1070), 'Het label wordt afgeknipt', 'The label is cut off', 'Een knipenzym binnen in het ER knipt het adreslabel af. Dat blijft in het membraan en wordt afgebroken.', 'A cutting enzyme inside the ER cuts off the address label. It stays in the membrane and is broken down.'),
    ST(8500, cam(860, 640, 1100), 'Vooruitblik: suikers erop', 'Preview: adding sugars', 'Een enzym kan een kant-en-klare suikerboom op bepaalde plekken zetten. Albumine heeft zo’n plek niet.', 'An enzyme can put a ready-made sugar tree on certain spots. Albumin has no such spot.'),
    ST(9500, cam(1060, 560, 1150), 'Eiwitten die in het membraan blijven', 'Proteins that stay in the membrane', 'Een waterafstotend stuk dat niet geknipt wordt, glipt zijdelings uit het kanaal en blijft in het membraan.', 'A water-repelling stretch that is not cut off slips sideways out of the channel and stays stuck in the membrane.'),
  ],
  svg() {
    return svgOpen() + `
    <rect x="-300" y="${MB}" width="2200" height="700" fill="rgba(143,179,232,.10)"/>
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Verder naar het Golgi', 'On to the Golgi')}">
      <rect x="-300" y="${MT}" width="2200" height="${MW}" fill="rgba(0,0,0,0)"/><g id="er-mem"></g>
      <circle id="er-golgiA" data-anchor="golgi" cx="330" cy="${MB + 130}" r="1" fill="none"/>
    </g>
    <g id="er-lab"></g>
    <g id="er-sec61"></g>
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}"><g id="er-ribo"></g><circle id="er-rA" data-anchor="ribosoom" r="1" fill="none"/></g>
    <g data-node="vouwing" data-color="${C.chain}" data-nolabel><g id="er-chain"></g></g>
    <g data-node="rnastructuur" data-color="${SL7}" data-label="${T2('SRP (7SL-RNA + eiwitten)', 'SRP (7SL RNA + proteins)')}"><g id="er-srp"></g><circle id="er-sA" data-anchor="rnastructuur" r="1" fill="none"/></g>
    <g data-node="ptm" data-color="${C.prot3}" data-nolabel><g id="er-spc"></g></g>
    <g data-node="glyco" data-color="#4f8ff7" data-label="${T2('Glycosylering', 'Glycosylation')}"><g id="er-ost"></g><circle id="er-gA" data-anchor="glyco" data-pos="below" r="1" fill="none"/></g>
    <g id="er-ov"></g>
    ${hud('er-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'golgi', label: { nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, color: C.mem },
      { node: 'glyco', label: { nl: 'Glycosylering', en: 'Glycosylation' }, color: '#4f8ff7' },
      { node: 'disulfide', label: { nl: 'Disulfidebruggen', en: 'Disulfide bonds' }, color: C.prot },
      { node: 'membraan', label: { nl: 'Membraaneiwitten', en: 'Membrane proteins' }, color: '#ffc247' },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const hide = id => $(id).setAttribute('cx', '-9999');
    /* 80S-ribosoom met de tunneluitgang op (ex, ey): 40S boven (leest het mRNA), 60S onder; de keten loopt van het PTC door de tunnel */
    const ribo = (ex, ey, pause = 0, keten = true) => `<g transform="translate(${f1(ex)} ${f1(ey)})">${R80.svg}` +
      (keten ? `<path d="${R80.tunnelD}" stroke="${C.chain}" stroke-width="4" fill="none"/>` : '') +
      txt(-226 * RS, R80.mrnaY + 8, "5′", C.rna, 22, 'end', 700) + txt(226 * RS, R80.mrnaY + 8, "3′", C.rna, 22, 'start', 700) +
      (pause > .01 ? `<g opacity="${f1(pause)}">${txt(150, -250, T2('⏸ elongatie geremd', '⏸ elongation arrested'), '#fff', 26, 'start', 700)}</g>` : '') + '</g>';
    /* Sec61: twee helften in de membraan met de porie ertussen; gate opent de laterale poort (rechterhelft schuift opzij) */
    const SW = 24, secX = gate => [PORE - 30, PORE + 30 + gate * 44];
    const half = (cx, seed) => { const d = eiwitPad(cx, MY, SW, MW / 2 + 12, seed, .06); return `<path d="${d}" fill="#0b1224"/><path d="${d}" fill="${C.prot}" fill-opacity=".62" stroke="${C.prot}" stroke-width="2.2"/>`; };
    const sec61 = (gate = 0) => { const [xl, xr] = secX(gate); return half(xl, 61) + half(xr, 62); };
    /* membraan als lipidedubbellaag, met openingen waar eiwitten erdoor steken (statisch per toestand, dus gebufferd) */
    const memCache = {};
    const membraan = (gaten) => { const k = gaten.map(g => g.map(Math.round).join(',')).join(';'); return memCache[k] ??= membraanLijn(-300, 1900, MY, { w: MW, gaten }); };

    function chainPos(state, m, t0, clv) {
      // posities voor residuen 1..m; state: 'free' (t.o.v. uitgang), 'dock' (lus in lumen), 'cut' (rijpe keten hangt)
      if (state.k === 'free') {
        const [ex, ey] = state.exit;
        const path = [[ex, ey], [ex + 12, ey + 16], [ex + 60, ey + 14], [ex + 130, ey - 4], [ex + 190, ey - 30], [ex + 240, ey - 60], [ex + 300, ey - 76], [ex + 360, ey - 70], [ex + 420, ey - 44], [ex + 470, ey - 100], [ex + 500, ey - 150], [ex + 520, ey - 200]];
        const pts = along(path, m, 30);                   // pts[0] = residu m (bij de uitgang)
        return pts.reverse();
      }
      if (state.k === 'srp') {                          // signaal als helix in de groef van SRP54, vlak bij de tunneluitgang
        const [ex, ey] = state.exit, out = [], A = [ex + 198, ey - 36], B = [ex + 92, ey + 2];
        for (let j = 0; j < Math.min(m, NSIG); j++) { const u = j / (NSIG - 1), w = (j % 2 ? 4 : -4); out.push([lerp(A[0], B[0], u) + .34 * w, lerp(A[1], B[1], u) + .94 * w]); }
        for (let j = NSIG; j < m; j++) { const u = (j - NSIG + 1) / (m - NSIG + 1); out.push([lerp(B[0], ex + 10, u), lerp(B[1], ey + 8, u)]); }
        return out;
      }
      // gedokt: signaal als helix in de laterale poort, rest als lus in het lumen
      const out = [];
      for (let i = 1; i <= Math.min(m, NSIG); i++) out.push([GATE + (i % 2) * 8 - 4, MT - 22 + (i - 1) * 6.6]);
      if (m <= NSIG) return out;
      const n = m - NSIG, need = (n - 1) * 26;
      if (state.k === 'dock') {
        const path = [[GATE, MT - 22 + 17 * 6.6], [950, 790], [1010, 830], [990, 875], [900, 885], [820, 855], [780, 800], [PORE, 740], [PORE, 690], [PORE, 660], [PORE, 630], [PORE, 600]];
        const Ltot = path.slice(1).reduce((a, q, j) => a + Math.hypot(q[0] - path[j][0], q[1] - path[j][1]), 0);
        const pts = along(path.slice().reverse(), n, Math.min(26, Ltot / Math.max(1, n - 1)));
        pts.reverse(); for (const q of pts) out.push(q);
        return out;
      }
      const path = [[PORE, 600], [PORE, 690], [792, 775], [762, 848], [690, 892], [610, 900], [540, 888], [480, 868], [420, 878], [390, 870]];   // onder de suikerboom van stap 7 door
      const pts = along(path, n, 26).reverse();
      for (const q of pts) out.push(q);
      return out;
    }

    return {
      update(t, s) {
        placeHud(svg, 'er-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        const gA = i === 7 ? [420, 850] : i === 8 ? [700, 800] : i === 5 ? [520, 770] : [330, MB + 130];
        $('er-golgiA').setAttribute('cx', gA[0]); $('er-golgiA').setAttribute('cy', gA[1]);
        let rb = '', ch = '', srp = '', ost = '', spc = '', ov = '', lab = '';
        // positie van het ribosoom
        let exit = FREE;                                  // stap 4: eerst naar de SRP-receptor; stap 5: pas dan op Sec61
        if (i === 3) exit = E2(FREE, RECEP, ease(sub(p, .1, .75)));
        if (i === 4) exit = E2(RECEP, DOCK, ease(sub(p, .1, .5)));
        if (i >= 5) exit = DOCK;
        const showRibo = i <= 7 ? 1 : 1 - sub(p, 0, .2);
        // aantal residuen buiten de tunnel
        const m = i === 0 ? Math.round(lerp(0, 8, sub(p, .3, 1))) : i === 1 ? Math.round(lerp(8, 20, sub(p, 0, .7))) : i <= 3 ? 20 + (i === 3 ? 1 : 0) :
          i === 4 ? 21 + Math.round(4 * sub(p, .5, 1)) : i === 5 ? Math.round(lerp(25, 44, sub(p, .1, .95))) : 44;
        const pause = i === 2 ? sub(p, .5, .7) : i === 3 ? 1 : i === 4 ? 1 - sub(p, .3, .5) : 0;
        if (showRibo > .01) rb = `<g opacity="${f1(showRibo)}">${ribo(exit[0], exit[1], pause, m > 0)}</g>`;
        $('er-rA').setAttribute('cx', showRibo > .5 ? f1(exit[0] - 100) : '-9999'); $('er-rA').setAttribute('cy', f1(exit[1] - 260));
        const gate = i === 4 ? sub(p, .3, .55) : i >= 5 ? 1 : 0, [xl, xr] = secX(gate);
        const gaten = [[xl - SW - 1, xr + SW + 1]]; if (i < 8 || p < .1) gaten.push([SRA[0] - 9, SRA[0] + 9]);
        if (i === 6) gaten.push([GATE + 62, GATE + 78]);
        if (i === 7) gaten.push([643, 687]);
        if (i === 8) gaten.push([1105, 1135], [1385, 1415]);
        $('er-mem').innerHTML = membraan(gaten);
        $('er-sec61').innerHTML = sec61(gate);
        // keten
        let pos;
        const kS = i === 2 ? ease(sub(p, .35, .7)) : i === 3 || (i === 4 && p < .5) ? 1 : 0;   // keten zit in SRP54
        if (i <= 1) pos = chainPos({ k: 'free', exit }, m);
        else if (i === 2) { const f = chainPos({ k: 'free', exit }, m), r = chainPos({ k: 'srp', exit }, m); pos = f.map((q, j) => E2(q, r[j], kS)); }
        else if (i === 3) pos = chainPos({ k: 'srp', exit }, m);
        else if (i === 4) { const d = chainPos({ k: 'dock' }, m), r = chainPos({ k: 'srp', exit: RECEP }, m), k = ease(sub(p, .1, .5)); pos = r.map((q, j) => E2(q ?? d[j], d[j] ?? q, k)); }
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
          if (i >= 4 && i <= 6) ch += `<rect x="${GATE - 19}" y="${MT - 34}" width="38" height="${17 * 6.6 + 24}" rx="17" fill="rgba(127,220,106,.18)" stroke="${C.chain}" stroke-width="2" opacity="${f1(sigOp * (i === 4 ? sub(p, .6, .8) : 1))}"/>`;
          const lo = i > 0 && LET[i] !== LET[i - 1] ? lerp(LET[i - 1], LET[i], sub(p, 0, .2)) : LET[i];
          const kB = i === 4 ? 1 - sub(p, .5, .9) : kS;                  // compacte bolletjes zonder letters zodra het signaal een helix is
          pos.forEach((q, j) => { const o = j < NSIG ? sigOp : 1, inGate = i >= 4 && j < NSIG, r0 = i === 1 || i === 2 || i === 6 ? 15 : 14; if (o > .01) ch += `<g opacity="${f1(o)}">${bead(q[0], q[1], SEQ[j], inGate ? 11 : lerp(r0, 11, kB), inGate ? 0 : lo * (1 - kB))}</g>`; });
          if (i <= 3 && pos.length) ch += txt(pos[0][0] + (kS > .5 ? -26 : 8), pos[0][1] - (kS > .5 ? 12 : 20), 'N', '#fff', 20, 'middle', 800);
          ch += '</g>';
        }
        $('er-chain').innerHTML = ch;
        // labels in het overzicht
        if (i === 0) lab += `<g opacity="${f1(sub(p, .1, .3))}">${txt(1300, 250, 'cytosol', C.muted, 28, 'middle', 700)}${txt(1300, 780, T2('ER-lumen', 'ER lumen'), '#8fb3e8', 28, 'middle', 700)}${txt(1300, MT - 16, T2('ER-membraan (ruw ER)', 'ER membrane (rough ER)'), C.mem, 22, 'middle', 700)}${txt(PORE, MB + 50, 'Sec61', C.prot, 22, 'middle', 700)}${txt(SRA[0] + 20, MB + 50, T2('SRP-receptor', 'SRP receptor'), C.prot, 22, 'start', 700)}</g>`;
        if (i === 1 && m >= 18) {
          const k = sub(p, .7, .85), a = pos[0], b = pos[2], c = pos[12], d = pos[17];
          lab += `<g opacity="${f1(k)}">${txt(a[0] + 26, a[1] + 6, T2('n (+)', 'n (+)'), '#4f8ff7', 20, 'start', 800)}${txt((b[0] + c[0]) / 2, Math.max(b[1], c[1]) + 70, T2('hydrofobe kern (h)', 'hydrophobic core (h)'), C.chain, 22, 'middle', 800)}${txt(d[0] + 10, d[1] + 44, T2('c: A-Y-S ↓', 'c: A-Y-S ↓'), '#5fd3e6', 20, 'start', 800)}</g>`;
        }
        $('er-lab').innerHTML = lab;
        // SRP
        if (i >= 2 && i <= 4) {
          // SRP als één geheel: SRP54 aan de tunneluitgang, de 7SL-RNA-staaf langs de 60S, het Alu-domein in de spleet tussen de eenheden
          const k = i === 2 ? ease(sub(p, .05, .45)) : 1, rel = i === 4 ? ease(sub(p, .45, .85)) : 0;
          const base = i === 4 ? RECEP : exit;              // in stap 5 blijft SRP bij de receptor; het ribosoom schuift naar Sec61
          const off = [(1 - k) * 300 + rel * 140, -(1 - k) * 220 - rel * 160];
          const b54 = [base[0] + S54[0] + off[0], base[1] + S54[1] + off[1]], alu = [base[0] + 118 + off[0], base[1] - 124 + off[1]];   // Alu in de spleet tussen 40S en 60S, bij de bindingsplaats van de elongatiefactoren (onder het mRNA)
          const srpOp = i === 2 ? sub(p, 0, .15) : i === 3 ? 1 : 1 - sub(p, .45, .8);
          srp += `<g opacity="${f1(srpOp)}">` +
            `<path d="M${f1(b54[0])},${f1(b54[1])} C${f1(b54[0] + 120)},${f1(b54[1] - 40)} ${f1(alu[0] + 90)},${f1(alu[1] + 30)} ${f1(alu[0])},${f1(alu[1])}" stroke="${SL7}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
            eiwit(b54[0], b54[1], 62, 28, C.prot, { seed: 54, label: 'SRP54', fs: 18 }) +
            eiwit(alu[0], alu[1], 30, 19, C.prot3, { seed: 14, label: 'Alu', fs: 15 }) +
            (i === 3 || (i === 4 && p < .45) ? txt(b54[0] - 20, b54[1] + 48, 'GTP', '#5fd3e6', 16, 'middle', 700) : '') + '</g>';
          $('er-sA').setAttribute('cx', f1(alu[0] + 150)); $('er-sA').setAttribute('cy', f1(alu[1] - 30));
        } else hide('er-sA');
        // SRP-receptor
        srp += `<g opacity="${f1(i === 0 ? sub(p, .1, .3) : i === 8 ? 1 - sub(p, 0, .2) : 1)}">${tmHelix(SRA[0], MT - 6, MB + 6, C.prot2, 1, 15)}${eiwit(SRA[0] + 4, MT - 14, 20, 12, C.prot2, { seed: 33 })}${eiwit(SRA[0], SRA[1] - 34, 44, 26, C.prot2, { seed: 32, label: 'SRα', fs: 17 })}${i >= 3 && i <= 4 ? txt(SRA[0] + 60, SRA[1] - 28, i === 4 && p > .45 ? 'GDP' : 'GTP', '#5fd3e6', 16, 'start', 700) : ''}${i >= 3 ? txt(SRA[0] + 22, MB + 22, 'SRβ', C.muted, 15, 'start', 700) : ''}</g>`;
        $('er-srp').innerHTML = srp;
        // signaalpeptidase, OST
        if (i === 6) {
          const k = sub(p, .05, .25), flash = sub(p, .35, .5);
          spc += `<g opacity="${f1(k)}">${tmHelix(GATE + 70, MT - 4, MB + 4, C.prot3, 1, 14)}${eiwit(GATE + 66, MB + 38, 48, 26, C.prot3, { seed: 21, label: 'SPC', fs: 18 })}${txt(GATE + 122, MB + 44, T2('signaalpeptidase', 'signal peptidase'), C.prot, 18, 'start', 700)}</g>`;
          // knipplaats Ser18 | Arg19: de schaar blijft bij Arg19, het nieuwe N-uiteinde, ook als de keten verschuift
          const kp = pos[NSIG] ?? [GATE, MT + 98], kq = pos[NSIG - 1] ?? kp, kc = sub(p, .45, .9) > 0 ? kp : [(kp[0] + kq[0]) / 2, (kp[1] + kq[1]) / 2];
          if (flash > 0 && flash < 1) spc += `<circle cx="${f1(kc[0])}" cy="${f1(kc[1])}" r="${f1(16 + 30 * flash)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - flash)}"/>`;
          ov += `<g opacity="${f1(sub(p, .45, .6))}">${txt(kc[0] - 34, kc[1] + 10, '✂', '#fff', 30, 'middle', 800)}</g>`;
          ov += `<g opacity="${f1(sub(p, .75, .9))}">${txt(870, 745, T2('N-terminus van pro-albumine:', 'N terminus of pro-albumin:'), '#fff', 20, 'start', 700) + txt(870, 773, 'RGVFRR-DAHK…', '#fff', 20, 'start', 700)}</g>`;
        }
        if (i === 7) {
          const k = sub(p, .05, .25);
          ost += `<g opacity="${f1(k)}">${tmHelix(653, MT - 6, MB + 6, C.prot2, 1, 14)}${tmHelix(677, MT - 6, MB + 6, C.prot2, 1, 14)}${eiwit(665, MB + 36, 60, 28, C.prot2, { seed: 48, label: 'OST', fs: 18 })}</g>`;
          // lipide-gekoppelde suikerboom Glc₃Man₉GlcNAc₂ (SNFG-vormen en -kleuren, dezelfde boom als in glyco): de drie Glc zitten op de
          // ONvertakte α1-3-arm (Man–Man–Man–Glc–Glc–Glc); de α1-6-arm vertakt in twee takken van twee Man (Aebi 2013; Kornfeld & Kornfeld 1985)
          const gx = 560, gy = MB + 18, g = sub(p, .2, .4), DD = 21;
          const NOD = { g1: ['GlcNAc', 0, 0, null], g2: ['GlcNAc', 0, 1, 'g1'], m3: ['Man', 0, 2, 'g2'],
            a1: ['Man', -1.1, 3, 'm3'], a2: ['Man', -1.1, 4, 'a1'], a3: ['Man', -1.1, 5, 'a2'], c1: ['Glc', -1.1, 6, 'a3'], c2: ['Glc', -1.1, 7, 'c1'], c3: ['Glc', -1.1, 8, 'c2'],
            r1: ['Man', 1.1, 3, 'm3'], b1: ['Man', .55, 4, 'r1'], b2: ['Man', .55, 5, 'b1'], d1: ['Man', 1.65, 4, 'r1'], d2: ['Man', 1.65, 5, 'd1'] };
          const at = k => [gx + NOD[k][1] * DD, gy + NOD[k][2] * DD];
          let tree = `<line x1="${gx}" y1="${MT + 10}" x2="${gx}" y2="${gy}" stroke="${C.mem}" stroke-width="4"/>`;   // dolichol-PP in het membraan
          for (const k in NOD) if (NOD[k][3]) { const [x1, y1] = at(k), [x0, y0] = at(NOD[k][3]); tree += `<line x1="${f1(x0)}" y1="${f1(y0)}" x2="${f1(x1)}" y2="${f1(y1)}" stroke="#c9d2e4" stroke-width="2"/>`; }
          for (const k in NOD) { const [x, y] = at(k); tree += sugar(NOD[k][0], x, y, 8); }
          ost += `<g opacity="${f1(g)}">${tree}${txt(gx - 46, gy + 60, 'Glc₃Man₉GlcNAc₂', '#fff', 17, 'end', 700)}${txt(gx - 46, gy + 84, T2('op dolichol-PP', 'on dolichol-PP'), C.muted, 16, 'end', 600)}</g>`;
          $('er-gA').setAttribute('cx', '665'); $('er-gA').setAttribute('cy', f1(MB + 60));
          ov += `<g opacity="${f1(sub(p, .5, .65))}">` + textBox(940, 700, 430, [T2('sequon N-X-S/T (X ≠ Pro)', 'sequon N-X-S/T (X ≠ Pro)'), T2('albumine: geen sequon', 'albumin: no sequon')], { col: '#4f8ff7', fs: 21 }) + '</g>';
        } else hide('er-gA');
        if (i === 8) {
          const k = sub(p, .15, .35), k2 = sub(p, .5, .7);
          const tm = (x, nUp, lab, op) => `<g opacity="${f1(op)}">${tmHelix(x, MT - 16, MB + 16, C.chain, .95, 26)}` +
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
