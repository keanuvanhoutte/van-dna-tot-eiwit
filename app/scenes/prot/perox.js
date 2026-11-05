import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { T } from './_b_kit.js';
import { DEST, icon, beads, btn } from './_fate.js';

/*
 * Import in het peroxisoom: het label PTS1 (Ser-Lys-Leu, helemaal aan het C-uiteinde) wordt in het cytosol herkend door
 * de receptor PEX5, die het eiwit gevouwen (zelfs als complex) door de membraan brengt en daarna terugkeert.
 * Ziekte: fouten in PEX-genen → Zellweger-spectrum (peroxisomen werken niet; zeer lange vetzuren stapelen op).
 */
const L3 = (nl, en) => ({ nl, en });
const PX = DEST.perox, RECV = '#ffc247', DOCK = C.prot, FA = '#e8c37a';
const PC = [1150, 470], PR = 210, GATE = [PC[0] - PR, PC[1]];
const START = [420, 470], INSIDE = [1130, 530];

/* gevouwen eiwit: twee delen (een complex van twee) met aan één deel de staart S-K-L */
function cargo(x, y, { op = 1, letters = 0, two = true } = {}) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">`;
  if (two) s += `<circle cx="${f1(x - 44)}" cy="${f1(y + 6)}" r="38" fill="rgba(127,220,106,.22)" stroke="${C.chain}" stroke-width="3"/><path d="M${f1(x - 66)},${f1(y + 6)} q12,-18 24,0 t24,0" stroke="${C.chain}" stroke-width="4" fill="none"/>`;
  s += `<circle cx="${f1(x + 22)}" cy="${f1(y)}" r="40" fill="rgba(127,220,106,.28)" stroke="${C.chain}" stroke-width="3"/><path d="M${f1(x)},${f1(y)} q12,-18 24,0 t24,0" stroke="${C.chain}" stroke-width="4" fill="none"/>`;
  s += beads(x + 66, y - 4, 4, { sp: 20, r: 8, lab: [{ from: 1, to: 3, col: PX }] });
  if (letters > .01) ['S', 'K', 'L'].forEach((c, i) => { s += T(x + 86 + i * 20, y - 24, c, { size: 22, col: PX, w: 800, op: letters, font: 'JetBrains Mono' }); });
  return s + '</g>';
}
/* drager (receptor): hoefijzervorm die de staart omklemt */
const receptor = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><path d="M${f1(x + 30)},${f1(y - 34)} A40,40 0 1 0 ${f1(x + 30)},${f1(y + 34)}" stroke="${RECV}" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
const zig = (x, y, n, op = 1, col = FA) => op <= .01 ? '' : `<path d="M${f1(x)},${f1(y)}${Array.from({ length: n }, (_, i) => ` l14,${i % 2 ? -10 : 10}`).join('')}" stroke="${col}" stroke-width="4" fill="none" stroke-linejoin="round" opacity="${f1(op)}"/>`;

export default {
  id: 'perox',
  title: { nl: 'Het peroxisoom neemt eiwitten gevouwen op', en: 'The peroxisome takes up proteins already folded' },
  scale: { nl: 'schematisch', en: 'schematic' },
  time: { nl: 'schematisch', en: 'schematic' },
  org: { nl: 'mens', en: 'human' },
  legend: [[PX, L3('peroxisoom en het label S-K-L', 'peroxisome and the S-K-L label')], [C.chain, L3('gevouwen eiwit (hier een paar van twee)', 'folded protein (here a pair of two)')], [RECV, L3('drager (receptor PEX5)', 'carrier (receptor PEX5)')], [DOCK, L3('aanmeerplaats in het membraan', 'docking site in the membrane')], [FA, L3('zeer lange vetzuren', 'very long fatty acids')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Hoe de drager precies door het membraan gaat, is nog niet helemaal bekend; hier schuift hij gewoon door een aanmeerplaats. Er bestaat ook een tweede, zeldzamer label (vooraan in het eiwit) met een eigen hulpdrager. De drager wordt voor de terugweg met een klein label (ubiquitine) gemerkt; dat is niet getekend.',
    en: 'Schematic and not to scale. Exactly how the carrier crosses the membrane is not yet fully known; here it simply slides through a docking site. There is also a second, rarer label (at the start of the protein) with its own helper carrier. For the way back the carrier is marked with a small tag (ubiquitin); that is not drawn.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Het peroxisoom breekt lange vetzuren af', 'The peroxisome breaks down long fatty acids'),
      text: L3('Een peroxisoom is een klein blaasje met één membraan. Het breekt onder meer zeer lange vetzuren af.', 'A peroxisome is a small vesicle with one membrane. Among other things it breaks down very long fatty acids.') },
    { dur: 7500, cam: cam(520, 470, 900), title: L3('Drie letters op het einde zijn het adres', 'Three letters at the end are the address'),
      text: L3('Helemaal aan het einde van het eiwit staan drie bouwstenen: S, K en L. Dat is het adres.', 'At the very end of the protein are three building blocks: S, K and L. That is the address.') },
    { dur: 8000, cam: cam(520, 440, 1000), title: L3('Een drager grijpt het label', 'A carrier grabs the label'),
      text: L3('In het cytosol grijpt een drager het label vast. Het eiwit is dan al helemaal opgevouwen.', 'In the cytosol a carrier grabs the label. By then the protein is already fully folded.') },
    { dur: 9000, cam: FULL, title: L3('Gevouwen mee naar binnen', 'Taken inside still folded'),
      text: L3('De drager brengt het eiwit door het membraan zonder het uit te rollen. Zelfs een groepje eiwitten samen kan erin.', 'The carrier brings the protein through the membrane without unrolling it. Even a group of proteins together can get in.') },
    { dur: 8000, cam: FULL, title: L3('De drager gaat terug', 'The carrier goes back'),
      text: L3('Binnen laat de drager los. Hij keert terug naar het cytosol voor het volgende eiwit.', 'Inside, the carrier lets go. It returns to the cytosol for the next protein.') },
    { dur: 8500, cam: FULL, title: L3('Anders dan het ER en het mitochondrion', 'Unlike the ER and the mitochondrion'),
      text: L3('Het ER en het mitochondrion laten alleen uitgerolde ketens door. Het peroxisoom neemt ook gevouwen eiwitten op.', 'The ER and the mitochondrion only let unrolled chains through. The peroxisome also takes up folded proteins.') },
    { dur: 9500, cam: FULL, title: L3('Zonder werkende peroxisomen: het Zellweger-spectrum', 'Without working peroxisomes: the Zellweger spectrum'),
      text: L3('Werkt een bouwgen van het peroxisoom niet, dan stapelen zeer lange vetzuren op. Dat is vaak al bij baby’s ernstig.', 'If a building gene of the peroxisome fails, very long fatty acids pile up. This is often already severe in babies.') },
  ],
  svg() {
    let mem = `<circle cx="${PC[0]}" cy="${PC[1]}" r="${PR}" fill="rgba(95,211,230,.07)" stroke="${PX}" stroke-width="16" stroke-opacity=".35"/>` +
      `<circle cx="${PC[0]}" cy="${PC[1]}" r="${PR + 8}" fill="none" stroke="${PX}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>` +
      `<circle cx="${PC[0]}" cy="${PC[1]}" r="${PR - 8}" fill="none" stroke="${PX}" stroke-width="5" stroke-dasharray="2 10" stroke-linecap="round"/>`;
    return svgOpen() + `
    <g id="px-org">${mem}
      <rect x="${GATE[0] - 22}" y="${GATE[1] - 60}" width="44" height="120" rx="18" fill="${DOCK}" fill-opacity=".35" stroke="${DOCK}" stroke-width="3"/></g>
    ${T(PC[0], PC[1] + PR + 50, T2('peroxisoom', 'peroxisome'), { size: 30, col: PX, w: 700 })}
    ${T(80, 820, T2('cytosol', 'cytosol'), { size: 28, anchor: 'start', col: C.muted })}
    <g id="px-in"></g><g id="px-mv"></g><g id="px-fx"></g>
    <g id="px-cmp" opacity="0">
      <rect x="60" y="120" width="660" height="250" rx="20" fill="rgba(13,20,38,.92)" stroke="#2a3550" stroke-width="2"/>
      <g data-node="er" data-nolabel data-color="${DEST.er}">${icon('er', 120, 190, 30)}</g><g data-node="mito" data-nolabel data-color="${DEST.mito}">${icon('mito', 205, 190, 26)}</g>
      ${beads(270, 190, 9, { sp: 22, r: 8 })}${T(500, 199, T2('alleen uitgerold', 'only unrolled'), { size: 26, anchor: 'start' })}
      ${icon('perox', 140, 300, 34)}
      <circle cx="300" cy="300" r="34" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="3"/><circle cx="360" cy="300" r="30" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="3"/>
      ${T(500, 309, T2('ook gevouwen ✓', 'folded too ✓'), { size: 26, anchor: 'start', col: C.ok })}
    </g>
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('ubiquitine', 1160, 400, T2('volgende: eiwitten afbreken →', 'next: breaking proteins down →'), '#ffd166')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kLet = ph(1, .2, .5), kRec = ph(2, .1, .7), kMove = ph(3, .05, .85), kBack = ph(4, .1, .9), kCmp = step === 5 ? ease(sub(p, .05, .3)) : step === 6 ? 1 - ease(sub(p, 0, .2)) : 0;
        const kZw = ph(6, .15, .85);
        // binnenin: enzymen + vetzuren die korter worden (normaal), of opstapelen (Zellweger)
        let inn = '';
        for (let i = 0; i < 3; i++) inn += zig(PC[0] - 70 + (i % 2) * 30, PC[1] - 150 + i * 42, step === 0 ? Math.round(lerp(12, 5, ease(sub(p, .3, .9)))) : 5, 1 - kZw);
        if (step === 0) inn += T(PC[0], PC[1] - PR - 40, T2('zeer lange vetzuren → korter', 'very long fatty acids → shorter'), { size: 26, col: FA, op: ease(sub(p, .2, .45)) });
        if (kZw > .01) {
          for (let i = 0; i < 8; i++) inn += zig(260 + (i % 2) * 230, 500 + Math.floor(i / 2) * 44, 13, kZw);
          inn += T(480, 720, T2('zeer lange vetzuren stapelen op', 'very long fatty acids pile up'), { size: 26, col: FA, op: kZw });
        }
        $('px-in').innerHTML = inn;
        $('px-org').setAttribute('opacity', f1(1 - .65 * kZw));
        // het eiwit en de drager
        let mv = '';
        const cx = lerp(START[0], INSIDE[0], kMove), cy = lerp(START[1], INSIDE[1], kMove) - 30 * Math.sin(Math.PI * kMove);
        const cOp = 1 - kZw;
        mv += cargo(cx, cy, { op: cOp, letters: kLet * (1 - kRec) });
        // drager: komt van boven, klemt de staart, gaat mee naar binnen en daarna terug
        const tail = [cx + 126, cy - 4];
        let rx = lerp(START[0] + 140, tail[0], kRec), ry = lerp(200, tail[1], kRec);
        if (kBack > 0) { rx = lerp(tail[0], 760, kBack); ry = lerp(tail[1], 250, kBack) - 60 * Math.sin(Math.PI * kBack); }
        mv += receptor(rx, ry, ph(2, 0, .1) * (1 - kZw) * (1 - ph(5, 0, .3)));
        if (step === 2) mv += T(rx + 10, ry - 60, T2('drager', 'carrier'), { size: 26, col: RECV, op: ease(sub(p, .3, .6)) });
        if (step === 4) mv += T(rx, ry - 60, T2('terug', 'back'), { size: 26, col: RECV, op: ease(sub(p, .4, .7)) });
        $('px-mv').innerHTML = mv;
        let fx = '';
        if (step === 3) fx += T(GATE[0], GATE[1] - 90, T2('gevouwen erdoor', 'through, folded'), { size: 26, col: C.text, op: ease(sub(p, .3, .6)) * (1 - ease(sub(p, .85, 1))) });
        $('px-fx').innerHTML = fx;
        $('px-cmp').setAttribute('opacity', f1(kCmp));
      },
    };
  },
};
