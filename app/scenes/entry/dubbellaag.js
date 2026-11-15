import { C, T2, svgOpen, FULL, cam, sub, ease, f1, rng } from '../../kit.js';
import { T, TL, panel } from '../prot/_b_kit.js';
import { LIPID, eiwit, tmHelix, membraanLijn } from '../../bio.js';

/*
 * Celmembraan: de lipidedubbellaag (detailronde 15-11-2026). Inzoomen vanaf de rand van de cel.
 * Bronnen (gelezen): Casares et al. 2019 (bouw van fosfolipiden, cis-knik → vloeibaarder, cholesterol met 4 ringen + OH,
 * asymmetrie buiten PC/sfingolipiden – binnen PE/PS/PI, flippasen/floppasen, 80 % van de cholesterol in het plasmamembraan);
 * Mitra et al. 2004 (dikte plasmamembraan 35,6–42,5 Å, fosfaat tot fosfaat); Möckl 2020 (glycocalyx op elke cel);
 * Singer & Nicolson 1972 (vloeibaar mozaïek: eiwitten deels ingebed, polaire delen steken uit, apolaire delen begraven).
 *
 * Tekening: één grote dubbellaag over de hele breedte (buiten = boven, cytosol = onder), getekend met losse fosfolipiden.
 * Dikte in beeld 150 px ≈ 4 nm (schaal ≈ 37 px/nm).
 */
const L3 = (nl, en) => ({ nl, en });
const Y = 470, H = 150, TOP = Y - H / 2, BOT = Y + H / 2, PITCH = 26, HR = 10;
const PC = LIPID.head, PS = '#ff8f8f', SM = '#9cc0ff', CHOL = '#c5d06b', SUGAR = '#00A651', TAILC = '#c9a574';
const PROT = C.prot, OUT = 'rgba(79,143,247,.06)', IN = 'rgba(201,165,116,.05)';
const R = rng(11);
/* lipiden: posities langs x voor beide lagen; sommige plaatsen = eiwit of cholesterol */
const XS = [];
for (let x = 20; x <= 1580; x += PITCH) XS.push(x);
const PROT1 = [780, 920], PROT2 = [1230, 1320];                 // twee eiwitten door het membraan
const inProt = x => (x > PROT1[0] - 8 && x < PROT1[1] + 8) || (x > PROT2[0] - 8 && x < PROT2[1] + 8);
const CHOLX = [212, 394, 680, 1066, 1430, 1508];                   // cholesterolposities (in beide lagen verspreid)
const LIPIDS = [];
XS.forEach((x, i) => {
  if (inProt(x) || CHOLX.some(c => Math.abs(c - x) < PITCH * .6)) return;
  for (const side of [-1, 1]) {                                    // -1 = buitenlaag (boven), +1 = binnenlaag (onder)
    const kink = R() < .45, kind = side < 0 ? (R() < .3 ? 'sm' : 'pc') : (R() < .3 ? 'ps' : 'pe');
    LIPIDS.push({ x: x + (side > 0 ? PITCH / 2 : 0), side, kink, kind, ph: R() * 6.28 });
  }
});
/* één fosfolipide: kop (cirkel) aan de waterkant, twee staarten naar het midden; kink = cis-dubbele binding in één staart */
function lipid(x, side, { kink = false, col = PC, s = 1, dx = 0 } = {}) {
  const hy = side < 0 ? TOP + HR : BOT - HR, dir = -side;              // staarten wijzen naar het midden
  const tl = (H / 2 - HR * 2 - 3) * s, y0 = hy + dir * HR * .9;
  const t1 = `M${f1(x - 4 + dx)},${f1(y0)} v${f1(dir * tl)}`;
  const t2 = kink ? `M${f1(x + 4 + dx)},${f1(y0)} v${f1(dir * tl * .45)} l${f1(7)},${f1(dir * tl * .2)} l0,${f1(dir * tl * .33)}` : `M${f1(x + 4 + dx)},${f1(y0)} v${f1(dir * tl)}`;
  return `<path d="${t1} ${t2}" stroke="${TAILC}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(x + dx)}" cy="${f1(hy)}" r="${HR}" fill="${col}"/>`;
}
/* cholesterol: platte ringstructuur tussen de staarten, OH-groep ter hoogte van de koppen */
function chol(x, side, op = 1) {
  const y0 = side < 0 ? TOP + HR * 1.2 : BOT - HR * 1.2, dir = -side;
  let g = `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y0)}" r="5" fill="#ff6b6b"/>`;            // OH
  for (let k = 0; k < 4; k++) g += `<path d="M${f1(x)},${f1(y0 + dir * (10 + k * 11))} l7,${f1(dir * 5)} l0,${f1(dir * 8)} l-7,${f1(dir * 5)} l-7,${f1(-dir * 5)} l0,${f1(-dir * 8)}z" fill="${CHOL}" fill-opacity=".85" stroke="${CHOL}" stroke-width="1.5"/>`;
  return g + `<path d="M${f1(x)},${f1(y0 + dir * 56)} l3,${f1(dir * 8)} l-3,${f1(dir * 6)}" stroke="${CHOL}" stroke-width="3" fill="none"/></g>`;
}
/* suikerketen (glycaan) aan de buitenkant op een eiwit of lipide */
function glycan(x, y, n = 4, op = 1, seed = 1) {
  const r = rng(seed); let g = `<g opacity="${f1(op)}">`, px = x, py = y;
  for (let k = 0; k < n; k++) { const nx = px + (r() - .5) * 18, ny = py - 15; g += `<line x1="${f1(px)}" y1="${f1(py)}" x2="${f1(nx)}" y2="${f1(ny)}" stroke="#c9d2e4" stroke-width="2"/><circle cx="${f1(nx)}" cy="${f1(ny)}" r="6" fill="${SUGAR}"/>`; px = nx; py = ny;
    if (k === 1 && n > 3) { const bx = nx + 14, by = ny - 8; g += `<line x1="${f1(nx)}" y1="${f1(ny)}" x2="${f1(bx)}" y2="${f1(by)}" stroke="#c9d2e4" stroke-width="2"/><circle cx="${f1(bx)}" cy="${f1(by)}" r="6" fill="#FFD400"/>`; } }
  return g + '</g>';
}

export default {
  id: 'dubbellaag',
  title: { nl: 'Celmembraan: een dubbele laag vetten', en: 'Cell membrane: a double layer of fats' },
  scale: { nl: 'membraan ≈ 4 nm dik', en: 'membrane ≈ 4 nm thick' },
  time: { nl: 'lipiden schuiven voortdurend opzij (schematisch)', en: 'lipids keep sliding sideways (schematic)' },
  org: { nl: 'mens (plasmamembraan)', en: 'human (plasma membrane)' },
  legend: [[PC, L3('kop van een fosfolipide (waterminnend)', 'phospholipid head (water-loving)')], [TAILC, L3('vetzuurstaart (waterafstotend)', 'fatty acid tail (water-repelling)')],
    [CHOL, L3('cholesterol', 'cholesterol')], [PROT, L3('membraaneiwit', 'membrane protein')], [SUGAR, L3('suiker (glycocalyx)', 'sugar (glycocalyx)')], [PS, L3('fosfatidylserine (binnenlaag)', 'phosphatidylserine (inner layer)')]],
  simplified: {
    nl: 'Schematisch: echte membranen bevatten honderden soorten lipiden en veel meer eiwit, en alles beweegt voortdurend. Kleuren en vormen zijn vereenvoudigd; de verhouding tussen dikte en eiwitgrootte klopt ongeveer. De suikerlaag (glycocalyx) is in werkelijkheid veel dichter en kan tientallen nanometer dik zijn.',
    en: 'Schematic: real membranes contain hundreds of kinds of lipids and much more protein, and everything moves all the time. Colours and shapes are simplified; the ratio of thickness to protein size is roughly right. The sugar layer (glycocalyx) is in reality much denser and can be tens of nanometres thick.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('De rand van elke cel', 'The edge of every cell'),
      text: L3('Rond elke cel zit een dun vlies: het celmembraan. Het scheidt binnen van buiten.', 'Every cell is wrapped in a thin skin: the cell membrane. It separates inside from outside.') },
    { dur: 8500, cam: cam(330, 470, 760), title: L3('Twee lagen vetmoleculen', 'Two layers of fat molecules'),
      text: L3('Het membraan bestaat uit twee lagen fosfolipiden. De koppen zoeken het water op, de staarten verstoppen zich in het midden.', 'The membrane is made of two layers of phospholipids. The heads face the water, the tails hide in the middle.') },
    { dur: 9000, cam: FULL, title: L3('Eén fosfolipide van dichtbij', 'One phospholipid up close'),
      text: L3('Een kop met een fosfaatgroep, vast aan glycerol, met twee vetzuurstaarten.', 'A head with a phosphate group, attached to glycerol, with two fatty acid tails.') },
    { dur: 8500, cam: cam(330, 470, 760), title: L3('Een knik houdt het soepel', 'A kink keeps it flexible'),
      text: L3('Sommige staarten hebben een knik door een dubbele binding. Daardoor liggen ze losser en blijft het membraan vloeibaar.', 'Some tails have a kink from a double bond. They pack more loosely, so the membrane stays fluid.') },
    { dur: 8500, cam: cam(400, 470, 820), title: L3('Cholesterol zit ertussen', 'Cholesterol sits in between'),
      text: L3('Tussen de lipiden zit cholesterol: vier ringen met een OH-groepje aan de waterkant.', 'Cholesterol sits between the lipids: four rings with a small OH group at the water side.') },
    { dur: 9000, cam: FULL, title: L3('Eiwitten steken erdoor', 'Proteins stick through it'),
      text: L3('Eiwitten zitten in het membraan. Hun vettige deel zit in het midden, hun waterminnende delen steken uit.', 'Proteins sit in the membrane. Their greasy part sits in the middle, their water-loving parts stick out.') },
    { dur: 9000, cam: FULL, title: L3('Buiten en binnen zijn anders', 'Outside and inside differ'),
      text: L3('Aan de buitenkant hangen suikers. Binnen zitten andere lipiden, zoals fosfatidylserine; pompen houden dat verschil in stand.', 'Sugars hang on the outside. Other lipids, such as phosphatidylserine, sit on the inside; pumps keep that difference in place.') },
    { dur: 8500, cam: FULL, title: L3('Een vloeibaar mozaïek', 'A fluid mosaic'),
      text: L3('Lipiden en eiwitten schuiven voortdurend opzij. Daarom heet dit model het vloeibaar mozaïek.', 'Lipids and proteins keep sliding sideways. That is why this model is called the fluid mosaic.') },
  ],
  svg() {
    return svgOpen() + `
    <rect x="-400" y="-400" width="2400" height="${TOP + 400}" fill="${OUT}"/><rect x="-400" y="${BOT}" width="2400" height="900" fill="${IN}"/>
    ${T(40, 120, T2('buiten de cel', 'outside the cell'), { size: 26, col: C.dna2, anchor: 'start' })}
    ${T(40, 800, T2('binnen: cytosol', 'inside: cytosol'), { size: 26, col: C.mem, anchor: 'start' })}
    <g id="db-lip"></g>
    <g id="db-prot"></g>
    <g id="db-fx"></g>
    <g id="db-zoom"></g>
    <g data-node="cel" data-color="${C.dna}" data-label="${T2('↑ Terug naar de hele cel', '↑ Back to the whole cell')}"><rect x="1250" y="60" width="300" height="60" rx="14" fill="transparent"/><circle data-anchor="cel" cx="1400" cy="90" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const at = i => step === i ? ease(sub(p, .05, .4)) : step > i ? 1 : 0;      // vanaf stap i zichtbaar
        const only = i => step === i ? ease(sub(p, .05, .3)) : 0;
        const kAsym = step === 6 ? ease(sub(p, .1, .5)) : 0, kMove = step === 7 ? 1 : 0;
        // ---- lipiden ----
        let g = '';
        for (const l of LIPIDS) {
          let col = PC;
          if (kAsym > 0) col = l.side < 0 ? (l.kind === 'sm' ? SM : PC) : (l.kind === 'ps' ? PS : '#d9b27c');
          const dx = kMove ? Math.sin(t / 900 + l.ph) * 6 : 0;
          const kinkOn = step >= 3 ? l.kink : l.kink;
          g += `<g opacity="${l.kind === 'ps' && kAsym > 0 ? 1 : .95}">${lipid(l.x, l.side, { kink: kinkOn, col, dx })}</g>`;
        }
        const kChol = 1;                                   // cholesterol en eiwitten zitten er altijd; hun eigen stap licht ze uit
        CHOLX.forEach((x, i) => { if (kChol > .01) g += chol(x + (i % 2 ? PITCH / 2 : 0), i % 2 ? 1 : -1, kChol); });
        $('db-lip').innerHTML = g;
        // ---- eiwitten en suikers ----
        let pr = '';
        const kProt = 1;
        if (kProt > .01) {
          // kanaaleiwit: bundel helices door het membraan, waterminnende lussen boven en onder
          let ch = '';
          for (let k = 0; k < 5; k++) ch += tmHelix(PROT1[0] + 14 + k * 28, TOP - 6, BOT + 6, PROT, 1, 20);
          ch += eiwit((PROT1[0] + PROT1[1]) / 2, TOP - 34, 78, 30, PROT, { seed: 21 }) + eiwit((PROT1[0] + PROT1[1]) / 2, BOT + 30, 70, 26, PROT, { seed: 22 });
          pr += `<g data-node="signaal" data-color="${PROT}" data-label="${T2('Receptoren vangen signalen', 'Receptors catch signals')}" opacity="${f1(kProt)}">${ch}<circle data-anchor="signaal" cx="${(PROT1[0] + PROT1[1]) / 2}" cy="${TOP - 90}" r="1" fill="none"/></g>`;
          // eiwit met één helix en een grote kop buiten
          const x2 = (PROT2[0] + PROT2[1]) / 2;
          const p2 = tmHelix(x2, TOP - 4, BOT + 4, '#9cc0ff', 1, 20) + eiwit(x2, TOP - 60, 70, 46, '#9cc0ff', { seed: 23 }) + eiwit(x2 + 6, BOT + 22, 30, 18, '#9cc0ff', { seed: 24 });
          pr += `<g data-node="membraan" data-color="#9cc0ff" data-label="${T2('Hoe komt een eiwit in het membraan?', 'How does a protein get into the membrane?')}" opacity="${f1(kProt)}">${p2}<circle data-anchor="membraan" cx="${x2}" cy="${BOT + 70}" r="1" data-pos="below" fill="none"/></g>`;
          pr += T((PROT1[0] + PROT1[1]) / 2, BOT + 96, T2('vettig deel in het midden', 'greasy part in the middle'), { size: 22, col: PROT, op: only(5) });
          if (only(5) > .01) pr += `<g opacity="${f1(only(5))}"><rect x="${PROT1[0] - 14}" y="${TOP - 74}" width="${PROT1[1] - PROT1[0] + 28}" height="${H + 140}" rx="20" fill="none" stroke="#ffd166" stroke-width="3" stroke-dasharray="8 6"/></g>`;
        }
        const kSug = Math.max(at(6), step === 0 ? 1 : 0, step === 7 ? 1 : 0);
        if (kSug > .01) {
          let sg = '';
          if (kProt > .01) sg += glycan((PROT2[0] + PROT2[1]) / 2 - 20, TOP - 104, 5, kSug, 3) + glycan((PROT2[0] + PROT2[1]) / 2 + 22, TOP - 100, 4, kSug, 4) + glycan(PROT1[0] + 40, TOP - 62, 4, kSug, 5);
          for (const x of [150, 330, 820, 1010, 1430]) sg += glycan(x, TOP, 3, kSug * .9, x);
          pr += `<g data-node="glyco" data-color="${SUGAR}" data-label="${T2('Suikers erop zetten', 'Adding the sugars')}">${sg}<circle data-anchor="glyco" cx="1430" cy="${TOP - 70}" r="1" fill="none"/></g>`;
        }
        $('db-prot').innerHTML = pr;
        // ---- labels per stap ----
        let fx = '';
        const o1 = only(1);
        if (o1 > .01) {
          fx += T(80, TOP - 30, T2('waterminnende koppen', 'water-loving heads'), { size: 20, col: PC, anchor: 'start', op: o1 }) + T(80, BOT + 46, T2('waterminnende koppen', 'water-loving heads'), { size: 20, col: PC, anchor: 'start', op: o1 });
          fx += `<rect x="200" y="${Y - 20}" width="280" height="38" rx="10" fill="#0b1224" opacity="${f1(.85 * o1)}"/>` + T(470, Y + 7, T2('waterafstotende staarten', 'water-repelling tails'), { size: 20, col: TAILC, anchor: 'end', op: o1 });
          fx += `<g opacity="${f1(o1)}"><path d="M500,${TOP} v${H}" stroke="#fff" stroke-width="2"/><path d="M492,${TOP} h16 M492,${BOT} h16" stroke="#fff" stroke-width="2"/></g>` + `<rect x="508" y="${Y - 20}" width="92" height="38" rx="10" fill="#0b1224" opacity="${f1(.85 * o1)}"/>` + T(516, Y + 7, '≈ 4 nm', { size: 20, col: '#fff', anchor: 'start', op: o1 });
        }
        const o3 = only(3);
        if (o3 > .01) {
          const kk = LIPIDS.find(l => l.kink && l.side < 0 && l.x > 240 && l.x < 430);
          if (kk) fx += `<circle cx="${kk.x + 8}" cy="${TOP + HR * 2 + 26}" r="16" fill="none" stroke="#ffd166" stroke-width="3" opacity="${f1(o3)}"/>` + T(kk.x + 30, TOP - 26, T2('knik', 'kink'), { size: 22, col: '#ffd166', anchor: 'start', op: o3 });
          fx += T(330, BOT + 50, T2('losser gepakt → vloeibaarder', 'looser packing → more fluid'), { size: 20, col: '#ffd166', op: o3 });
        }
        const o4 = only(4);
        if (o4 > .01) fx += T(212, TOP - 26, 'cholesterol', { size: 22, col: CHOL, op: o4 }) + T(330, BOT + 56, T2('OH aan de waterkant, ringen tussen de staarten', 'OH at the water side, rings between the tails'), { size: 19, col: CHOL, op: o4 });
        if (kAsym > .01) {
          fx += T(1580, TOP - 140, T2('buitenlaag: o.a. PC en sfingolipiden', 'outer layer: e.g. PC and sphingolipids'), { size: 24, col: SM, anchor: 'end', op: kAsym });
          fx += T(1580, BOT + 200, T2('binnenlaag: o.a. PE, PS (negatief) en PI', 'inner layer: e.g. PE, PS (negative) and PI'), { size: 24, col: PS, anchor: 'end', op: kAsym });
        }
        if (step === 7) fx += T(800, BOT + 150, T2('model: Singer & Nicolson, 1972', 'model: Singer & Nicolson, 1972'), { size: 24, col: C.muted, op: ease(sub(p, .3, .6)) });
        $('db-fx').innerHTML = fx;
        // ---- stap 2: één fosfolipide uitvergroot (paneel) ----
        let z = '';
        const o2 = step === 2 ? ease(sub(p, .05, .3)) : 0;
        if (o2 > .01) {
          const X = 40, Y0 = 170, W = 620, HH = 580;
          z += panel(X, Y0, W, HH, { op: o2, fill: '#0d1426' }) + `<g opacity="${f1(o2)}">`;
          const cx = X + 270;
          // kop: choline (+) en fosfaat (−), dan glycerol, dan twee staarten (één met knik)
          z += `<circle cx="${cx}" cy="${Y0 + 70}" r="26" fill="#9cc0ff"/>` + T(cx, Y0 + 77, '+', { size: 26, col: '#0a1224', w: 800 });
          z += `<line x1="${cx}" y1="${Y0 + 96}" x2="${cx}" y2="${Y0 + 116}" stroke="#c9d2e4" stroke-width="4"/><circle cx="${cx}" cy="${Y0 + 140}" r="26" fill="${PC}"/>` + T(cx, Y0 + 147, '−', { size: 26, col: '#0a1224', w: 800 });
          z += `<rect x="${cx - 40}" y="${Y0 + 178}" width="80" height="34" rx="8" fill="#c9d2e4" fill-opacity=".85"/>`;
          z += `<path d="M${cx - 20},${Y0 + 212} v270" stroke="${TAILC}" stroke-width="10" stroke-linecap="round"/>`;
          z += `<path d="M${cx + 20},${Y0 + 212} v120 l30,40 v110" stroke="${TAILC}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
          z += TL(cx + 46, Y0 + 62, [T2('kop', 'head'), T2('(bv. choline)', '(e.g. choline)')], { size: 24, col: '#9cc0ff', anchor: 'start' });
          z += T(cx + 46, Y0 + 147, T2('fosfaatgroep', 'phosphate group'), { size: 24, col: PC, anchor: 'start' });
          z += T(cx + 52, Y0 + 202, 'glycerol', { size: 24, col: '#c9d2e4', anchor: 'start' });
          z += TL(cx + 64, Y0 + 300, [T2('twee', 'two'), T2('vetzuurstaarten', 'fatty acid'), T2('', 'tails')], { size: 24, col: TAILC, anchor: 'start' });
          z += TL(cx + 64, Y0 + 400, [T2('knik = dubbele', 'kink = cis double'), T2('binding (cis)', 'bond')], { size: 24, col: '#ffd166', anchor: 'start' });
          z += `<path d="M${cx - 70},${Y0 + 40} v170" stroke="${C.dna2}" stroke-width="3"/>` + T(cx - 80, Y0 + 130, T2('waterminnend', 'water-loving'), { size: 24, col: C.dna2, anchor: 'end' });
          z += `<path d="M${cx - 70},${Y0 + 222} v260" stroke="${TAILC}" stroke-width="3"/>` + T(cx - 80, Y0 + 360, T2('waterafstotend', 'water-repelling'), { size: 24, col: TAILC, anchor: 'end' });
          z += '</g>';
        }
        $('db-zoom').innerHTML = z;
      },
    };
  },
};
