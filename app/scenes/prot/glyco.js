import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL, AACLASS, THREE } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, sugar, panel, SNFG } from './_b_kit.js';

/* ER-membraan horizontaal (cytosol boven, lumen onder); rechts (x 1700–2600) het Golgi */
const MEM = 380, MEMH = 44;
const SEQ = ['S', 'A', 'V', 'L', 'N', 'L', 'T', 'E', 'K', 'G'];   // N-L-T = sequon (N op index 4)
const ASN = 4, BX0 = 380, BDX = 52, BY = 510;
const DOL = [1000, MEM + MEMH / 2 + 12];
const FOLD = [1010, 640], FASN = [1098, 610];                      // gevouwen glycoproteïne rechts in het lumen
const CNX = [1380, 600];
const D = 26;                                                      // afstand tussen suikers

/* suikerboom Glc3Man9GlcNAc2 (groeit langs +y vanaf (0,0)); st = { glc, man8, complex } */
const NODES = {
  g1: ['GlcNAc', 0, 1, null], g2: ['GlcNAc', 0, 2, 'g1'], m3: ['Man', 0, 3, 'g2'],
  a1: ['Man', -1.1, 4, 'm3'], a2: ['Man', -1.1, 5, 'a1'], a3: ['Man', -1.1, 6, 'a2'], c1: ['Glc', -1.1, 7, 'a3'], c2: ['Glc', -1.1, 8, 'c1'], c3: ['Glc', -1.1, 9, 'c2'],
  r1: ['Man', 1.1, 4, 'm3'], b1: ['Man', .55, 5, 'r1'], b2: ['Man', .55, 6, 'b1'], d1: ['Man', 1.65, 5, 'r1'], d2: ['Man', 1.65, 6, 'd1'],
};
const CPLX = {
  g1: ['GlcNAc', 0, 1, null], f: ['Fuc', .9, 1, 'g1'], g2: ['GlcNAc', 0, 2, 'g1'], m3: ['Man', 0, 3, 'g2'],
  a1: ['Man', -1, 4, 'm3'], an: ['GlcNAc', -1, 5, 'a1'], ag: ['Gal', -1, 6, 'an'], as: ['Sia', -1, 7, 'ag'],
  r1: ['Man', 1, 4, 'm3'], rn: ['GlcNAc', 1, 5, 'r1'], rg: ['Gal', 1, 6, 'rn'], rs: ['Sia', 1, 7, 'rg'],
};
function glycan(x, y, rot, st, op = 1) {
  if (op <= .01) return '';
  const set = st.complex ? CPLX : NODES;
  const keep = id => {
    if (st.complex) return true;
    if (id === 'c3') return st.glc >= 3; if (id === 'c2') return st.glc >= 2; if (id === 'c1') return st.glc >= 1;
    if (id === 'b2') return !st.man8;
    return true;
  };
  let e = '', n = '';
  for (const [id, [ty, gx, gy, par]] of Object.entries(set)) {
    const k = keep(id); const a = typeof k === 'number' ? k : k ? 1 : 0;
    const px = gx * D, py = gy * D;
    const pp = par ? [set[par][1] * D, set[par][2] * D] : [0, 0];
    if (a > 0) { e += `<line x1="${f1(pp[0])}" y1="${f1(pp[1])}" x2="${f1(px)}" y2="${f1(py)}" stroke="#cfd6e6" stroke-width="2.5" opacity="${f1(a)}"/>`; n += sugar(ty, px, py, 11, a); }
  }
  // gedeeltelijke suiker (voor afknippen/terugzetten): st.fade = [id, a]
  if (st.fade) { const [id, a] = st.fade; const [ty, gx, gy, par] = set[id]; const pp = [set[par][1] * D, set[par][2] * D]; e += `<line x1="${f1(pp[0])}" y1="${f1(pp[1])}" x2="${f1(gx * D)}" y2="${f1(gy * D)}" stroke="#cfd6e6" stroke-width="2.5" opacity="${f1(a)}"/>`; n += sugar(ty, gx * D + st.fadeDx * (1 - a), gy * D + st.fadeDy * (1 - a), 11, a); }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" opacity="${f1(op)}">${e}${n}</g>`;
}
/* punt in de boom → scènecoördinaten */
function tipAt(x, y, rot, gx, gy) { const a = rot * Math.PI / 180, px = gx * D, py = gy * D; return [x + px * Math.cos(a) - py * Math.sin(a), y + px * Math.sin(a) + py * Math.cos(a)]; }

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'glyco',
  title: { nl: 'N-glycosylatie', en: 'N-linked glycosylation' },
  scale: '≈ 5–20 nm',
  time: { nl: 'overdracht tijdens de translatie; kwaliteitscontrole minuten', en: 'transfer during translation; quality control minutes' },
  org: { nl: 'mens (ER-lumen en Golgi)', en: 'human (ER lumen and Golgi)' },
  legend: [[SNFG.GlcNAc, 'GlcNAc ■'], [SNFG.Man, 'Man ●'], [SNFG.Glc, 'Glc ●'], [SNFG.Gal, 'Gal ●'], [SNFG.Sia, 'Sia (Neu5Ac) ◆'], [SNFG.Fuc, 'Fuc ▲'], [C.chain, { nl: 'nieuwe keten', en: 'new chain' }], [C.prot, { nl: 'enzymen en lectinen', en: 'enzymes and lectins' }], [C.mem, { nl: 'ER-membraan', en: 'ER membrane' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Suikers in de internationale SNFG-symbolen (Symbol Nomenclature for Glycans): blauw vierkant GlcNAc, groene cirkel mannose, blauwe cirkel glucose, gele cirkel galactose, paarse ruit siaalzuur, rode driehoek fucose.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Sugars in the international SNFG symbols (Symbol Nomenclature for Glycans): blue square GlcNAc, green circle mannose, blue circle glucose, yellow circle galactose, purple diamond sialic acid, red triangle fucose.</p>' },
  simplified: {
    nl: 'Bindingstypes (α1-2, α1-3, …) zijn niet getekend; de boom toont wel de juiste samenstelling Glc3Man9GlcNAc2 en vertakking. OST, Sec61 en calnexine zijn schematisch (OST-A/STT3A werkt co-translationeel naast het translocon, OST-B/STT3B ook later). Calreticuline (oplosbaar) en ERp57 werken zoals calnexine en zijn weggelaten of enkel vermeld. In het Golgi ontstaan veel verschillende complexe glycanen; één biantennaire vorm is als voorbeeld getekend.',
    en: 'Linkage types (α1-2, α1-3, …) are not drawn; the tree does show the correct composition Glc3Man9GlcNAc2 and branching. OST, Sec61 and calnexin are schematic (OST-A/STT3A acts co-translationally next to the translocon, OST-B/STT3B also later). Calreticulin (soluble) and ERp57 work like calnexin and are omitted or only mentioned. Many different complex glycans form in the Golgi; one biantennary form is drawn as an example.' },
  steps: [
    ST(7500, cam(640, 430, 1350), 'Een keten komt het ER binnen', 'A chain enters the ER',
      'Het ribosoom zit via SRP op het ruw ER; de keten schuift door het Sec61-translocon het lumen in.',
      'The ribosome is docked on the rough ER via SRP; the chain threads through the Sec61 translocon into the lumen.'),
    ST(7500, cam(610, 520, 820), 'Het sequon: N – X – S/T', 'The sequon: N – X – S/T',
      'Suikers komen enkel op een Asn gevolgd door een willekeurig residu (behalve Pro) en dan Ser of Thr.',
      'Sugars are attached only to an Asn followed by any residue (except Pro) and then Ser or Thr.'),
    ST(8000, cam(1056, 540, 1000), 'De voorgebouwde suikerboom', 'The pre-assembled sugar tree',
      'Aan dolichol-pyrofosfaat in het membraan ligt klaar: Glc3Man9GlcNAc2, 14 suikers.',
      'Ready on dolichol pyrophosphate in the membrane: Glc3Man9GlcNAc2, 14 sugars.'),
    ST(8000, cam(780, 540, 1000), 'OST: in één blok op Asn', 'OST: en bloc onto Asn',
      'Oligosaccharyltransferase (OST) zet de hele boom in één keer op de amide-N van Asn, terwijl de keten nog groeit.',
      'Oligosaccharyltransferase (OST) transfers the whole tree at once onto the amide N of Asn, while the chain is still growing.'),
    ST(8500, cam(1250, 580, 1000), 'Glucose knippen → calnexine', 'Trimming glucose → calnexin',
      'Glucosidase I en II verwijderen 2 glucoses. Het lectine calnexine (of calreticuline) bindt de ene overgebleven glucose en houdt het eiwit vast.',
      'Glucosidases I and II remove 2 glucoses. The lectin calnexin (or calreticulin) binds the one remaining glucose and holds the protein.'),
    ST(9000, cam(1250, 580, 1000), 'De calnexinecyclus', 'The calnexin cycle',
      'Glucosidase II knipt de laatste glucose: het eiwit komt vrij. Nog niet goed gevouwen? Dan zet UGGT er weer één glucose op en begint het opnieuw.',
      'Glucosidase II removes the last glucose: the protein is released. Not folded correctly yet? UGGT puts one glucose back and the cycle restarts.'),
    ST(8500, cam(1250, 560, 1100), 'Doorlaten of afbreken', 'Pass or degrade',
      'Goed gevouwen: ER-mannosidase I knipt een mannose en het eiwit reist naar het Golgi. Blijvend misgevouwen: ERAD → ubiquitine → proteasoom.',
      'Correctly folded: ER mannosidase I trims a mannose and the protein travels to the Golgi. Permanently misfolded: ERAD → ubiquitin → proteasome.'),
    ST(9000, cam(2160, 480, 1150), 'Golgi: complexe glycanen', 'Golgi: complex glycans',
      'In het Golgi worden mannoses verwijderd en GlcNAc, Gal, siaalzuur en fucose toegevoegd. O-glycanen (GalNAc op Ser/Thr) ontstaan pas hier.',
      'In the Golgi mannoses are removed and GlcNAc, Gal, sialic acid and fucose are added. O-glycans (GalNAc on Ser/Thr) are only made here.'),
  ],
  svg() {
    // membraan (twee lagen) over de hele breedte van het ER-deel
    const mem = `<rect x="-200" y="${MEM}" width="1880" height="${MEMH}" fill="${C.mem}" opacity=".22"/><line x1="-200" y1="${MEM}" x2="1680" y2="${MEM}" stroke="${C.mem}" stroke-width="3"/><line x1="-200" y1="${MEM + MEMH}" x2="1680" y2="${MEM + MEMH}" stroke="${C.mem}" stroke-width="3"/>`;
    // Golgi-cisternen rechts
    let golgi = '';
    [0, 1, 2, 3].forEach(i => golgi += `<path d="M${1800 + i * 12},${190 + i * 42} Q1970,${160 + i * 42} ${2140 - i * 12},${190 + i * 42}" stroke="${C.mem}" stroke-width="22" fill="none" opacity="${.3 + i * .12}" stroke-linecap="round"/>`);
    golgi += T(2180, 200, 'cis', { size: 18, col: C.muted, anchor: 'start' }) + T(2160, 330, 'trans', { size: 18, col: C.muted, anchor: 'start' });
    return svgOpen(arrowDefs('gl', { m: C.muted, g: C.ok, r: C.danger })) + `
    <rect x="-200" y="${MEM + MEMH}" width="1880" height="700" fill="rgba(201,165,116,.05)"/>
    ${mem}
    ${T(-150, MEM - 30, 'cytosol', { size: 22, col: C.muted, anchor: 'start' })}${T(-150, MEM + MEMH + 44, T2('ER-lumen', 'ER lumen'), { size: 22, col: C.mem, anchor: 'start' })}
    <g data-node="er" data-color="${C.rrna}" data-label="${T2('Ribosoom op het ER (SRP-route)', 'Ribosome on the ER (SRP route)')}">
      <ellipse cx="330" cy="250" rx="160" ry="85" fill="rgba(44,198,168,.18)" stroke="${C.rrna}" stroke-width="3"/>
      <ellipse cx="330" cy="345" rx="120" ry="34" fill="rgba(44,198,168,.28)" stroke="${C.rrna}" stroke-width="3"/>
      ${T(330, 250, T2('ribosoom', 'ribosome'), { size: 22, col: C.rrna })}
      <circle data-anchor="er" cx="330" cy="160" r="1" fill="none"/>
    </g>
    <rect x="302" y="${MEM - 4}" width="56" height="${MEMH + 8}" rx="10" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="3"/>
    ${T(250, MEM + MEMH + 44, 'Sec61', { size: 18, col: C.prot, anchor: 'end' })}
    <g id="gl-ost"></g>
    <g id="gl-dol"></g>
    <g id="gl-chain"></g>
    <g id="gl-prot"></g>
    <g id="gl-cnx"></g>
    <g id="gl-enz"></g>
    <g id="gl-tree"></g>
    <g id="gl-lbl"></g>
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi & secretie', 'Golgi & secretion')}">${golgi}<circle data-anchor="golgi" cx="1970" cy="165" r="1" fill="none"/></g>
    <g id="gl-golgi"></g>
    <g data-node="ubiquitine" data-color="#ffd166" data-label="${T2('ERAD → proteasoom', 'ERAD → proteasome')}"><g id="gl-erad"></g><circle id="gl-eradA" data-anchor="ubiquitine" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const bead = (x, y, a, hl = 0, r = 19) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]]}" stroke="${hl ? '#fff' : '#0a1224'}" stroke-width="${hl ? 3 : 2}"/>` + T(x, y + 5, THREE[a], { size: 15, col: '#0a1224', halo: false, w: 800 });
    const foldedProt = (x, y, dashed, op = 1) => `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="95" ry="75" fill="rgba(127,220,106,.16)" stroke="${C.chain}" stroke-width="4" ${dashed ? 'stroke-dasharray="14 8"' : ''}/>` +
      chain([[x - 60, y + 10], [x - 30, y - 40], [x, y + 10], [x + 30, y - 35], [x + 60, y + 15], [x + 10, y + 45], [x - 40, y + 40]], { w: 5, op: .6 }) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- keten in het lumen (stap 0–3) ---------- */
        let cs = '';
        if (step <= 3) {
          const slide = step === 0 ? (1 - ease(sub(p, .1, .9))) * -5 * BDX : 0;
          const pts = [[330, 300], [330, MEM + MEMH + 20], [345, BY - 20], [BX0 - 10 + slide, BY]];
          cs += chain(pts, { w: 7 });
          let line = [];
          for (let i = SEQ.length - 1; i >= 0; i--) { const x = BX0 + (SEQ.length - 1 - i) * 0 + i * BDX + slide; if (x >= BX0 - 5) line.push([x, BY]); }
          cs += `<line x1="${BX0}" y1="${BY}" x2="${f1(BX0 + (SEQ.length - 1) * BDX + slide)}" y2="${BY}" stroke="${C.chain}" stroke-width="7"/>`;
          SEQ.forEach((a, i) => { const x = BX0 + i * BDX + slide; if (x >= BX0 - 5) cs += bead(x, BY, a, step >= 1 && i >= ASN && i <= ASN + 2); });
          if (step >= 1 && step <= 2) {
            const k = step === 1 ? sub(p, .1, .3) : 1;
            const x0 = BX0 + ASN * BDX, x2 = x0 + 2 * BDX;
            cs += `<path d="M${x0 - 22},${BY + 34} v12 H${x2 + 22} v-12" stroke="#fff" stroke-width="3" fill="none" opacity="${f1(k)}"/>`;
            cs += T(x0 + BDX, BY + 80, step === 1 ? 'N – X – S/T' : 'sequon', { size: step === 1 ? 26 : 20, font: 'JetBrains Mono', w: 800, op: k });
            if (step === 1) {
              cs += T(x0 + BDX, BY + 112, T2('(X ≠ Pro)', '(X ≠ Pro)'), { size: 20, col: '#ffc247', op: sub(p, .3, .45) });
              const k2 = sub(p, .5, .7), y2 = BY + 180, xs = x0 - 20;
              ['N', 'P', 'T'].forEach((a, j) => cs += `<g opacity="${f1(k2)}">${bead(xs + j * BDX, y2, a)}</g>`);
              cs += T(xs + 3 * BDX + 10, y2 + 8, T2('✗ geen suiker: Pro past niet', '✗ no sugar: Pro does not fit'), { size: 20, col: C.danger, anchor: 'start', op: k2 });
            }
          }
          cs += T(BX0 + (SEQ.length - 1) * BDX + 60, BY + 8, step === 0 ? "→ N-term" : '', { size: 18, col: C.muted, anchor: 'start' });
        }
        $('gl-chain').innerHTML = cs;

        /* ---------- OST en dolichol ---------- */
        const ostOn = step <= 3 ? 1 : 0;
        $('gl-ost').innerHTML = ostOn ? `<path d="M520,${MEM - 20} h140 v${MEMH + 40} q0,30 -30,34 h-80 q-30,-4 -30,-34 Z" fill="rgba(155,123,255,.3)" stroke="${C.prot}" stroke-width="3"/>` +
          T(590, MEM - 34, 'OST', { size: 24, col: C.prot, w: 800 }) + (step === 3 ? `<circle cx="590" cy="${MEM + MEMH + 44}" r="8" fill="#ffc247"/>` : '') : '';
        let dol = '';
        const transfer = step === 3 ? ease(sub(p, .2, .7)) : step > 3 ? 1 : 0;
        if (step <= 3) {
          let z = `M${DOL[0]},${MEM + 26}`; for (let i = 1; i <= 16; i++) z += ` L${DOL[0] + i * 16},${MEM + (i % 2 ? 14 : 26)}`;
          dol += `<path d="${z}" stroke="#ffb27a" stroke-width="4" fill="none"/>` + `<circle cx="${DOL[0]}" cy="${DOL[1] - 4}" r="7" fill="${C.danger}"/><circle cx="${DOL[0] + 14}" cy="${DOL[1] - 10}" r="7" fill="${C.danger}"/>`;
          if (step >= 2) dol += T(DOL[0] + 150, MEM - 14, T2('dolichol-PP', 'dolichol-PP'), { size: 20, col: '#ffb27a', op: step === 2 ? sub(p, 0, .2) : 1 });
        }
        $('gl-dol').innerHTML = dol;

        /* ---------- suikerboom ---------- */
        let tree = '', st = { glc: 3, man8: false, complex: false };
        let tx = DOL[0], ty = DOL[1], rot = 0, top = step >= 2 ? 1 : .35;
        const asnX = BX0 + ASN * BDX;
        if (step === 3) { tx = lerp(DOL[0], asnX, transfer); ty = lerp(DOL[1], BY + 20, transfer); }
        let move = 0;
        if (step >= 4) {
          move = step === 4 ? ease(sub(p, 0, .3)) : 1;
          tx = lerp(asnX, FASN[0], move); ty = lerp(BY + 20, FASN[1], move); rot = lerp(0, -90, move);
        }
        // glucose-knippen en calnexinecyclus
        let fade = null, cnxK = 0;
        if (step === 4) {
          const g1 = sub(p, .3, .45), g2 = sub(p, .5, .65);
          st.glc = g1 < 1 ? 2 : g2 < 1 ? 1 : 1; if (g1 < 1) fade = ['c3', 1 - g1]; else if (g2 < 1) { st.glc = 1; fade = ['c2', 1 - g2]; }
          cnxK = ease(sub(p, .7, .9));
        }
        if (step === 5) {
          const cut = sub(p, .08, .25), add = sub(p, .55, .72);
          st.glc = 0; if (cut < 1) fade = ['c1', 1 - cut]; else if (add > 0) fade = ['c1', add];
          if (add >= 1) { st.glc = 1; fade = null; }
          cnxK = 1 - ease(sub(p, .22, .4)) + ease(sub(p, .78, .95));
        }
        if (step === 6) { st.glc = 0; const m = sub(p, .15, .35); if (m < 1) fade = ['b2', 1 - m]; else st.man8 = true; }
        if (fade) { const tip = fade[0] === 'b2' ? [0, 60] : [0, 60]; st.fade = fade; st.fadeDx = tip[0]; st.fadeDy = tip[1]; st.glc = Math.min(st.glc, { c3: 2, c2: 1, c1: 0 }[fade[0]] ?? st.glc); }
        if (step <= 1) top = 0;
        if (step <= 6) tree += glycan(tx, ty, rot, st, step >= 2 ? 1 : 0);
        $('gl-tree').innerHTML = tree;

        /* ---------- gevouwen glycoproteïne ---------- */
        let pr = '';
        if (step >= 4 && step <= 6) {
          const x = lerp(asnX - 90, FOLD[0], move), y = lerp(BY + 90, FOLD[1], move);
          const done = step === 6 || (step === 5 && p > .95);
          pr += foldedProt(x, y, !done, move);
          pr += chain([[x + 70, y - 25], [tx - 8, ty]], { w: 6, op: move });
        }
        $('gl-prot').innerHTML = pr;

        /* ---------- calnexine ---------- */
        let cn = '';
        if (step >= 4 && step <= 5) {
          const tip = tipAt(tx, ty, rot, -1.1, 7);
          const lx = lerp(CNX[0] + 120, tip[0] + 44, clamp(cnxK)), ly = lerp(CNX[1], tip[1], clamp(cnxK));
          cn += `<path d="M${CNX[0] + 60},${MEM + MEMH} C${CNX[0] + 70},${MEM + 120} ${f1(lx + 60)},${f1(ly - 110)} ${f1(lx + 30)},${f1(ly - 40)}" stroke="${C.prot}" stroke-width="16" fill="none" stroke-linecap="round" opacity=".6"/>`;
          cn += `<rect x="${CNX[0] + 40}" y="${MEM - 6}" width="40" height="${MEMH + 12}" rx="8" fill="rgba(155,123,255,.4)" stroke="${C.prot}" stroke-width="3"/>`;
          cn += enz(lx + 40, ly, 58, 48, '', { col: C.prot, fillOp: .4 });
          cn += T(lx + 40, ly + 82, T2('calnexine', 'calnexin'), { size: 22, col: '#c9b8ff' });
          cn += T(lx + 40, ly + 110, T2('(lectine, bindt Glc₁)', '(lectin, binds Glc₁)'), { size: 18, col: C.muted });
        }
        $('gl-cnx').innerHTML = cn;

        /* ---------- enzymen en labels ---------- */
        let en = '', lb = '';
        const tipC = n => tipAt(tx, ty, rot, -1.1, n);
        if (step === 4) {
          const a = tipC(9.3), b = tipC(8.3);
          en += enz(a[0] + 10, a[1] - 70, 90, 30, T2('glucosidase I', 'glucosidase I'), { col: C.prot2, fs: 16, op: sub(p, .2, .3) * (1 - sub(p, .45, .5)), fillOp: .5 });
          en += enz(b[0] + 10, b[1] - 70, 94, 30, T2('glucosidase II', 'glucosidase II'), { col: C.prot2, fs: 16, op: sub(p, .45, .5) * (1 - sub(p, .66, .72)), fillOp: .5 });
          lb += T(1250, 460, 'Glc₁Man₉GlcNAc₂', { size: 22, font: 'JetBrains Mono', w: 700, op: sub(p, .7, .85) });
        }
        if (step === 5) {
          const c = tipC(7.3);
          en += enz(c[0] + 10, c[1] - 70, 94, 30, T2('glucosidase II', 'glucosidase II'), { col: C.prot2, fs: 16, op: sub(p, 0, .08) * (1 - sub(p, .25, .3)), fillOp: .5 });
          en += enz(c[0] + 10, c[1] - 76, 70, 34, 'UGGT', { col: C.prot3, fs: 18, op: sub(p, .45, .52) * (1 - sub(p, .74, .8)), fillOp: .6 });
          lb += T(1250, 460, p < .45 ? T2('vrij: gevouwen?', 'released: folded?') : T2('UGGT: "nog niet goed" → Glc terug', 'UGGT: "not yet right" → Glc back'), { size: 22, col: p < .45 ? C.text : '#c9b8ff', op: sub(p, .25, .35) });
          lb += T(1010, 770, T2('cyclus herhaalt tot het eiwit gevouwen is', 'the cycle repeats until the protein is folded'), { size: 20, col: C.muted, op: sub(p, .8, .95) });
        }
        if (step === 6) {
          const c = tipAt(tx, ty, rot, .55, 6.3);
          en += enz(c[0] + 90, c[1] + 10, 110, 30, T2('ER-mannosidase I', 'ER mannosidase I'), { col: C.prot2, fs: 16, op: sub(p, .05, .12) * (1 - sub(p, .35, .42)), fillOp: .5 });
          lb += arr(1120, 540, 1420, 470, C.ok, 'gl-g', { w: 5, op: sub(p, .4, .55) }) + T(1440, 462, T2('gevouwen → Golgi (COPII)', 'folded → Golgi (COPII)'), { size: 22, col: C.ok, anchor: 'start', op: sub(p, .45, .6) });
        }
        $('gl-enz').innerHTML = en;
        // ERAD
        let er = '';
        if (step === 6) {
          er += arr(1010, 725, 1010, 800, C.danger, 'gl-r', { w: 5, op: sub(p, .55, .7) }) + T(1030, 790, T2('blijvend misgevouwen → ERAD → proteasoom', 'permanently misfolded → ERAD → proteasome'), { size: 21, col: C.danger, anchor: 'start', op: sub(p, .6, .75) });
          er += `<rect x="1000" y="755" width="560" height="50" fill="transparent"/>`;
        }
        $('gl-erad').innerHTML = er;
        $('gl-eradA').setAttribute('cx', 1250); $('gl-eradA').setAttribute('cy', step === 6 && p > .6 ? 760 : -9999);
        // labels per stap
        if (step === 0) lb += T(640, 720, T2('keten groeit het lumen in', 'chain grows into the lumen'), { size: 22, col: C.chain, op: sub(p, .3, .5) });
        if (step === 2) {
          const k = sub(p, .15, .35);
          lb += panel(1110, 440, 400, 330, { op: k });
          const rows = [['GlcNAc', '2 × GlcNAc'], ['Man', '9 × ' + T2('mannose', 'mannose')], ['Glc', '3 × glucose']];
          rows.forEach(([ty, s2], i) => lb += `<g opacity="${f1(k)}">${sugar(ty, 1155, 560 + i * 56, 14)}</g>` + T(1185, 567 + i * 56, s2, { size: 22, anchor: 'start', op: k }));
          lb += T(1310, 745, '= 14 ' + T2('suikers', 'sugars'), { size: 22, col: '#ffc247', op: k, w: 700 });
          lb += T(1310, 495, 'Glc₃Man₉GlcNAc₂', { size: 24, font: 'JetBrains Mono', w: 700, op: k });
        }
        if (step === 3) lb += T(asnX + 90, BY + 90, T2('N-glycosidische binding op Asn', 'N-glycosidic bond on Asn'), { size: 20, col: '#ffc247', op: sub(p, .7, .85), anchor: 'start' });
        $('gl-lbl').innerHTML = lb;

        /* ---------- Golgi ---------- */
        let gg = '';
        if (step === 7) {
          const k = ease(sub(p, .1, .5));
          gg += panel(1740, 370, 840, 400, { col: C.mem }) + T(1770, 410, T2('in het Golgi-lumen', 'in the Golgi lumen'), { size: 20, col: C.mem, anchor: 'start' });
          gg += foldedProt(1960, 540, false) + chain([[2030, 510], [2080, 500]], { w: 6 });
          // N-glycaan: Man8 → complex
          gg += glycan(2090, 500, -90, { glc: 0, man8: true }, 1 - k) + glycan(2090, 500, -90, { complex: true }, k);
          // O-glycaan op Ser/Thr
          const ko = sub(p, .55, .75);
          gg += chain([[2010, 600], [2050, 650]], { w: 6, op: ko }) + `<g opacity="${f1(ko)}">${sugar('GalNAc', 2058, 664, 12)}${sugar('Gal', 2086, 686, 11)}${sugar('Sia', 2116, 708, 11)}</g>`;
          gg += T(2140, 700, T2('O-glycaan: GalNAc op Ser/Thr', 'O-glycan: GalNAc on Ser/Thr'), { size: 20, col: SNFG.Gal, anchor: 'start', op: ko });
          gg += T(2330, 470, T2('complex N-glycaan', 'complex N-glycan'), { size: 22, col: C.text, anchor: 'start', op: k });
          gg += T(2330, 500, T2('(GlcNAc, Gal, Sia, Fuc)', '(GlcNAc, Gal, Sia, Fuc)'), { size: 18, col: C.muted, anchor: 'start', op: k });
          gg += T(2240, 270, T2('Golgi-stapel', 'Golgi stack'), { size: 26, col: C.mem, w: 700, anchor: 'start' });
        }
        $('gl-golgi').innerHTML = gg;
      },
    };
  },
};
