import { C, T2, svgOpen, FULL, cam, sub, ease, f1, rng } from '../../kit.js';
import { T, TL, panel } from '../prot/_b_kit.js';
import { LIPID, eiwit, tmHelix } from '../../bio.js';

/*
 * Celmembraan: de lipidedubbellaag (detailronde 15-11-2026). Stap 1 toont eerst een stukje gebogen celrand met een inzoomkader.
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
const PC = LIPID.head, PS = '#ff8f8f', SM = '#9cc0ff', PE = '#f4a261', CHOL = '#c5d06b', SUGAR = '#00A651', TAILC = '#c9a574';
const PROT = C.prot, OUT = 'rgba(79,143,247,.06)', IN = 'rgba(201,165,116,.05)';
const R = rng(11);
/* lipiden: posities langs x voor beide lagen; sommige plaatsen = eiwit of cholesterol */
const XS = [];
for (let x = 20; x <= 1580; x += PITCH) XS.push(x);
const PROT1 = [760, 940], PROT2 = [1230, 1320];                 // receptor (bundel helices) en een eiwit met één helix
const HW = 36;                                                   // helixbreedte ≈ 1 nm bij ≈ 37 px/nm
const inProt = x => (x > PROT1[0] - 11 && x < PROT1[1] + 11) || (x > PROT2[0] - 8 && x < PROT2[1] + 8);
const CHOLX = [212, 394, 680, 1066, 1430, 1508];                   // cholesterolposities: even index = buitenlaag, oneven = binnenlaag
const cholSide = i => i % 2 ? 1 : -1;
/* glycosfingolipiden: enkel sfingolipiden in de buitenlaag dragen hier suikers (nooit PC of cholesterol; Casares 2019) */
const GSL = [150, 332, 592, 1008, 1372];
const LIPIDS = [];
XS.forEach(x => {
  for (const side of [-1, 1]) {                                    // -1 = buitenlaag (boven), +1 = binnenlaag (onder)
    if (inProt(x + (side > 0 ? PITCH / 2 : 0))) continue;            // geen kop over een helix
    if (CHOLX.some((c, i) => cholSide(i) === side && Math.abs(c - x) < PITCH * .6)) continue;   // gat enkel in de laag van de cholesterol
    const gsl = side < 0 && GSL.includes(x);
    const kink = R() < .45, kind = gsl ? 'sm' : side < 0 ? (R() < .3 ? 'sm' : 'pc') : (R() < .3 ? 'ps' : 'pe');
    LIPIDS.push({ x: x + (side > 0 ? PITCH / 2 : 0), side, kink, kind, gsl });
  }
});
/* zijwaartse beweging in stap 8: een golf (fase volgt x), zodat buren nooit over elkaar schuiven */
const wob = (t, x, side = -1) => Math.sin(t / 900 + x * .03 + (side > 0 ? 1.3 : 0)) * 5;
/* één fosfolipide: kop (cirkel) aan de waterkant, twee staarten naar het midden; kink = cis-dubbele binding: de staart loopt daarna schuin verder */
function lipid(x, side, { kink = false, col = PC, s = 1, dx = 0 } = {}) {
  const hy = side < 0 ? TOP + HR : BOT - HR, dir = -side;              // staarten wijzen naar het midden
  const tl = (H / 2 - HR * 2 - 3) * s, y0 = hy + dir * HR * .9;
  const t1 = `M${f1(x - 4 + dx)},${f1(y0)} v${f1(dir * tl)}`;
  const t2 = kink ? `M${f1(x + 4 + dx)},${f1(y0)} v${f1(dir * tl * .45)} l${f1(tl * .55 * .5)},${f1(dir * tl * .55 * .866)}` : `M${f1(x + 4 + dx)},${f1(y0)} v${f1(dir * tl)}`;
  return `<path d="${t1} ${t2}" stroke="${TAILC}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(x + dx)}" cy="${f1(hy)}" r="${HR}" fill="${col}"/>`;
}
/* cholesterol: steroïdskelet van drie zesringen (A–C) en één vijfring (D) tussen de staarten;
 * OH-groep aan de A-ring ter hoogte van de koppen, korte koolwaterstofstaart aan de D-ring (Casares 2019) */
function chol(x, side, op = 1) {
  const y0 = side < 0 ? TOP + HR * 1.2 : BOT - HR * 1.2, dir = -side;
  let g = `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y0)}" r="5" fill="#ff6b6b"/>`;            // OH
  for (let k = 0; k < 3; k++) g += `<path d="M${f1(x)},${f1(y0 + dir * (10 + k * 12))} l7,${f1(dir * 5)} l0,${f1(dir * 8)} l-7,${f1(dir * 5)} l-7,${f1(-dir * 5)} l0,${f1(-dir * 8)}z" fill="${CHOL}" fill-opacity=".85" stroke="#0b1224" stroke-opacity=".5" stroke-width="1.2"/>`;
  const yd = y0 + dir * 47;                                                                                 // D-ring (vijfring) aan de onderrand van de C-ring
  g = g.replace('>', `><path d="M${f1(x - 7)},${f1(yd)} L${f1(x + 7)},${f1(yd)} L${f1(x + 9)},${f1(yd + dir * 9)} L${f1(x)},${f1(yd + dir * 15)} L${f1(x - 9)},${f1(yd + dir * 9)}z" fill="${CHOL}" fill-opacity=".85" stroke="#0b1224" stroke-opacity=".5" stroke-width="1.2"/>`);
  return g + `<path d="M${f1(x)},${f1(yd + dir * 15)} l3,${f1(dir * 5)} l-3,${f1(dir * 4)}" stroke="${CHOL}" stroke-width="3" fill="none"/></g>`;
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
    [CHOL, L3('cholesterol', 'cholesterol')], [PROT, L3('membraaneiwit', 'membrane protein')], [SUGAR, L3('suiker (glycocalyx)', 'sugar (glycocalyx)')],
    [SM, L3('sfingolipide (buitenlaag)', 'sphingolipid (outer layer)')], [PE, L3('fosfatidylethanolamine (binnenlaag)', 'phosphatidylethanolamine (inner layer)')], [PS, L3('fosfatidylserine (binnenlaag)', 'phosphatidylserine (inner layer)')]],
  simplified: {
    nl: 'Schematisch: echte membranen bevatten honderden soorten lipiden en veel meer eiwit, en alles beweegt voortdurend. Kleuren en vormen zijn vereenvoudigd; de verhouding tussen dikte en eiwitgrootte klopt ongeveer (een helix is ongeveer 1 nm breed). De suikerlaag (glycocalyx) is in werkelijkheid veel dichter en meestal tientallen tot honderden nanometer dik.',
    en: 'Schematic: real membranes contain hundreds of kinds of lipids and much more protein, and everything moves all the time. Colours and shapes are simplified; the ratio of thickness to protein size is roughly right (a helix is about 1 nm wide). The sugar layer (glycocalyx) is in reality much denser and usually tens to hundreds of nanometres thick.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('De rand van elke cel', 'The edge of every cell'),
      text: L3('Rond elke cel zit een dun vlies: het celmembraan. We zoomen in op een klein stukje van die rand.', 'Every cell is wrapped in a thin skin: the cell membrane. We zoom in on a tiny piece of that edge.') },
    { dur: 8500, cam: cam(330, 470, 760), title: L3('Twee lagen vetmoleculen', 'Two layers of fat molecules'),
      text: L3('Het membraan bestaat uit twee lagen fosfolipiden. De koppen zoeken het water op, de staarten verstoppen zich in het midden.', 'The membrane is made of two layers of phospholipids. The heads face the water, the tails hide in the middle.') },
    { dur: 9000, cam: FULL, title: L3('Eén fosfolipide van dichtbij', 'One phospholipid up close'),
      text: L3('Een kop met een fosfaatgroep, vast aan glycerol, met twee vetzuurstaarten.', 'A head with a phosphate group, attached to glycerol, with two fatty acid tails.') },
    { dur: 8500, cam: cam(330, 470, 760), title: L3('Een knik houdt het soepel', 'A kink keeps it flexible'),
      text: L3('Sommige staarten hebben een knik door een cis-dubbele binding. Daardoor liggen ze losser en blijft het membraan vloeibaar.', 'Some tails have a kink from a cis double bond. They pack more loosely, so the membrane stays fluid.') },
    { dur: 8500, cam: cam(400, 470, 820), title: L3('Cholesterol zit ertussen', 'Cholesterol sits in between'),
      text: L3('Tussen de lipiden zit cholesterol: vier aaneengesloten ringen met een OH-groepje aan de waterkant.', 'Cholesterol sits between the lipids: four fused rings with a small OH group at the water side.') },
    { dur: 9000, cam: FULL, title: L3('Eiwitten steken erdoor', 'Proteins stick through it'),
      text: L3('Eiwitten zitten in het membraan. Hun vettige deel zit in het midden, hun waterminnende delen steken uit.', 'Proteins sit in the membrane. Their greasy part sits in the middle, their water-loving parts stick out.') },
    { dur: 9000, cam: FULL, title: L3('Buiten en binnen zijn anders', 'Outside and inside differ'),
      text: L3('Aan de buitenkant hangen suikers, op eiwitten en sfingolipiden. Binnen zitten andere lipiden, zoals fosfatidylserine; pompen houden dat verschil in stand.', 'Sugars hang on the outside, on proteins and sphingolipids. Other lipids, such as phosphatidylserine, sit on the inside; pumps keep that difference in place.') },
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
        const kAsym = step === 6 ? ease(sub(p, .1, .5)) : step > 6 ? 1 : 0;           // kleuren van de lipidesoorten blijven in stap 8
        const kAsymL = step === 6 ? kAsym : step === 7 ? 1 - ease(sub(p, 0, .2)) : 0;  // hun labels enkel in stap 7
        const kMove = step === 7 ? 1 : 0;
        const mv = (x, side = -1) => kMove ? wob(t, x, side) : 0;
        const fade0 = step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .04)) : 0;      // beeld van stap 1 verdwijnt snel bij het inzoomen (camera snijdt het anders af)
        // ---- lipiden ----
        let g = '';
        for (const l of LIPIDS) {
          let col = PC;
          if (l.gsl) col = SM;                                                       // glycosfingolipide: altijd als sfingolipide gekleurd
          else if (kAsym > 0) col = l.side < 0 ? (l.kind === 'sm' ? SM : PC) : (l.kind === 'ps' ? PS : PE);
          g += lipid(l.x, l.side, { kink: l.kink, col, dx: mv(l.x, l.side) });
        }
        CHOLX.forEach((x, i) => { const cx = x + (i % 2 ? PITCH / 2 : 0); g += chol(cx + mv(cx, cholSide(i)), cholSide(i)); });
        $('db-lip').innerHTML = g;
        // ---- eiwitten en suikers ----
        let pr = '';
        // receptor: bundel helices door het membraan, waterminnende lussen boven en onder
        const c1b = (PROT1[0] + PROT1[1]) / 2, c1 = c1b + mv(c1b), x2b = (PROT2[0] + PROT2[1]) / 2, x2 = x2b + mv(x2b);
        let ch = '';
        for (let k = 0; k < 5; k++) ch += tmHelix(c1 - 2 * HW + k * HW, TOP - 6, BOT + 6, PROT, 1, HW);
        ch += eiwit(c1, TOP - 34, 98, 30, PROT, { seed: 21 }) + eiwit(c1, BOT + 30, 88, 26, PROT, { seed: 22 });
        pr += `<g data-node="signaal" data-color="${PROT}" data-label="${T2('Receptoren vangen signalen', 'Receptors catch signals')}">${ch}<circle data-anchor="signaal" cx="${f1(c1 - 30)}" cy="${TOP - 150}" r="1" fill="none"/></g>`;
        // eiwit met één helix en een grote kop buiten
        const p2 = tmHelix(x2, TOP - 4, BOT + 4, PROT, 1, HW) + eiwit(x2, TOP - 60, 70, 46, PROT, { seed: 23 }) + eiwit(x2 + 6, BOT + 22, 30, 18, PROT, { seed: 24 });
        pr += `<g data-node="membraan" data-color="${PROT}" data-label="${T2('Hoe komt een eiwit in het membraan?', 'How does a protein get into the membrane?')}">${p2}<circle data-anchor="membraan" cx="${f1(x2)}" cy="${BOT + 70}" r="1" data-pos="below" fill="none"/></g>`;
        const o5 = only(5);
        if (o5 > .01) {                                                              // enkel het deel tussen de koppen is waterafstotend
          const bx = PROT1[0] - 8, bw = PROT1[1] - PROT1[0] + 16, lx = PROT1[0] - 24;
          pr += `<g opacity="${f1(o5)}"><rect x="${bx}" y="${TOP}" width="${bw}" height="${H}" fill="#ffd166" fill-opacity=".14" stroke="#ffd166" stroke-width="3" stroke-dasharray="8 6"/>` +
            `<rect x="${lx - 242}" y="${Y - 21}" width="252" height="38" rx="10" fill="#0b1224" opacity=".85"/></g>`;
          pr += T(lx, Y + 7, T2('waterafstotend deel', 'water-repelling part'), { size: 22, col: '#ffd166', anchor: 'end', op: o5 });
          pr += T(lx, TOP - 28, T2('waterminnende lus', 'water-loving loop'), { size: 22, col: C.dna2, anchor: 'end', op: o5 });
          pr += T(lx, BOT + 40, T2('waterminnende lus', 'water-loving loop'), { size: 22, col: C.dna2, anchor: 'end', op: o5 });
        }
        const kSug = Math.max(at(6), fade0, step === 7 ? 1 : 0);
        if (kSug > .01) {
          let sg = glycan(x2 - 20, TOP - 104, 5, kSug, 3) + glycan(x2 + 22, TOP - 100, 4, kSug, 4) + glycan(c1 + 50, TOP - 62, 4, kSug, 5);
          for (const l of LIPIDS) if (l.gsl) sg += glycan(l.x + mv(l.x), TOP, 3, kSug * .9, l.x);      // suikers op glycosfingolipiden
          pr += `<g data-node="glyco" data-color="${SUGAR}" data-label="${T2('Suikers erop zetten', 'Adding the sugars')}">${sg}<circle data-anchor="glyco" cx="${f1(1470 + mv(1470))}" cy="${TOP - 60}" r="1" fill="none"/></g>`;
        }
        $('db-prot').innerHTML = pr;
        // ---- labels per stap ----
        let fx = '';
        if (fade0 > .01) {                                                           // stap 1: gebogen stukje celrand met inzoomkader
          const px = 300, py = 150, pw = 340, ph = 180, ccx = 470, ccy = 470, cr = 260;
          fx += `<defs><clipPath id="db-celclip"><rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="18"/></clipPath></defs><g opacity="${f1(fade0)}">` + panel(px, py, pw, ph, { fill: '#0d1426' }) +
            `<g clip-path="url(#db-celclip)"><circle cx="${ccx}" cy="${ccy}" r="${cr}" fill="rgba(201,165,116,.14)" stroke="${PC}" stroke-width="6"/></g>` +
            T(ccx, 290, T2('cel', 'cell'), { size: 22, col: C.mem }) +
            `<rect x="${ccx - 14}" y="${ccy - cr - 14}" width="28" height="28" fill="none" stroke="#ffd166" stroke-width="3"/>` +
            `<path d="M${ccx - 14},${ccy - cr + 14} L${px + 10},${TOP - 8} M${ccx + 14},${ccy - cr + 14} L${px + pw - 10},${TOP - 8}" stroke="#ffd166" stroke-width="2" stroke-dasharray="6 5" opacity=".75"/>` +
            T(ccx + 24, ccy - cr - 18, T2('ingezoomd', 'zoomed in'), { size: 22, col: '#ffd166', anchor: 'start' }) + '</g>';
        }
        const o1 = only(1);
        if (o1 > .01) {
          fx += T(80, TOP - 30, T2('waterminnende koppen', 'water-loving heads'), { size: 20, col: PC, anchor: 'start', op: o1 }) + T(80, BOT + 46, T2('waterminnende koppen', 'water-loving heads'), { size: 20, col: PC, anchor: 'start', op: o1 });
          fx += `<rect x="200" y="${Y - 20}" width="280" height="38" rx="10" fill="#0b1224" opacity="${f1(.85 * o1)}"/>` + T(470, Y + 7, T2('waterafstotende staarten', 'water-repelling tails'), { size: 20, col: TAILC, anchor: 'end', op: o1 });
          fx += `<g opacity="${f1(o1)}"><path d="M500,${TOP} v${H}" stroke="#fff" stroke-width="2"/><path d="M492,${TOP} h16 M492,${BOT} h16" stroke="#fff" stroke-width="2"/></g>` + `<rect x="508" y="${Y - 20}" width="92" height="38" rx="10" fill="#0b1224" opacity="${f1(.85 * o1)}"/>` + T(516, Y + 7, '≈ 4 nm', { size: 20, col: '#fff', anchor: 'start', op: o1 });
        }
        const o3 = only(3);
        if (o3 > .01) {
          const kk = LIPIDS.find(l => l.kink && l.side < 0 && l.x > 240 && l.x < 430);
          if (kk) fx += `<circle cx="${kk.x + 10}" cy="${TOP + HR * 2 + 28}" r="16" fill="none" stroke="#ffd166" stroke-width="3" opacity="${f1(o3)}"/>` + T(kk.x + 30, TOP - 26, T2('knik', 'kink'), { size: 22, col: '#ffd166', anchor: 'start', op: o3 });
          fx += T(330, BOT + 50, T2('losser gepakt → vloeibaarder', 'looser packing → more fluid'), { size: 20, col: '#ffd166', op: o3 });
        }
        const o4 = only(4);
        if (o4 > .01) fx += T(212, TOP - 26, 'cholesterol', { size: 22, col: CHOL, op: o4 }) + T(330, BOT + 56, T2('OH aan de waterkant, ringen tussen de staarten', 'OH at the water side, rings between the tails'), { size: 19, col: CHOL, op: o4 });

        if (kAsymL > .01) {
          fx += T(40, TOP - 150, T2('buitenlaag: o.a. PC en sfingolipiden', 'outer layer: e.g. PC and sphingolipids'), { size: 24, col: SM, anchor: 'start', op: kAsymL });
          fx += T(1580, BOT + 200, T2('binnenlaag: o.a. PE, PS (negatief) en PI', 'inner layer: e.g. PE, PS (negative) and PI'), { size: 24, col: PS, anchor: 'end', op: kAsymL });
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
          z += `<circle cx="${cx}" cy="${Y0 + 70}" r="26" fill="#f2d49b"/>` + T(cx, Y0 + 77, '+', { size: 26, col: '#0a1224', w: 800 });
          z += `<line x1="${cx}" y1="${Y0 + 96}" x2="${cx}" y2="${Y0 + 116}" stroke="#c9d2e4" stroke-width="4"/><circle cx="${cx}" cy="${Y0 + 140}" r="26" fill="${PC}"/>` + T(cx, Y0 + 147, '−', { size: 26, col: '#0a1224', w: 800 });
          z += `<rect x="${cx - 40}" y="${Y0 + 178}" width="80" height="34" rx="8" fill="#c9d2e4" fill-opacity=".85"/>`;
          z += `<path d="M${cx - 20},${Y0 + 212} v270" stroke="${TAILC}" stroke-width="10" stroke-linecap="round"/>`;
          z += `<path d="M${cx + 20},${Y0 + 212} v120 l60,140" stroke="${TAILC}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
          z += TL(cx + 46, Y0 + 62, [T2('kop', 'head'), T2('(bv. choline)', '(e.g. choline)')], { size: 24, col: '#f2d49b', anchor: 'start' });
          z += T(cx + 46, Y0 + 147, T2('fosfaatgroep', 'phosphate group'), { size: 24, col: PC, anchor: 'start' });
          z += T(cx + 52, Y0 + 202, 'glycerol', { size: 24, col: '#c9d2e4', anchor: 'start' });
          z += TL(cx + 64, Y0 + 300, [T2('twee', 'two'), T2('vetzuurstaarten', 'fatty acid'), T2('', 'tails')], { size: 24, col: TAILC, anchor: 'start' });
          z += TL(cx + 96, Y0 + 400, [T2('knik = dubbele', 'kink = cis double'), T2('binding (cis)', 'bond')], { size: 24, col: '#ffd166', anchor: 'start' });
          z += `<path d="M${cx - 70},${Y0 + 40} v170" stroke="${C.dna2}" stroke-width="3"/>` + T(cx - 80, Y0 + 130, T2('waterminnend', 'water-loving'), { size: 24, col: C.dna2, anchor: 'end' });
          z += `<path d="M${cx - 70},${Y0 + 222} v260" stroke="${TAILC}" stroke-width="3"/>` + T(cx - 80, Y0 + 360, T2('waterafstotend', 'water-repelling'), { size: 24, col: TAILC, anchor: 'end' });
          z += '</g>';
        }
        $('db-zoom').innerHTML = z;
      },
    };
  },
};
