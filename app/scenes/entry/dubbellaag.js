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
const PROT1 = [734, 986], PROT2 = [1230, 1320];                 // receptor (bundel helices) en een eiwit met één helix
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
/* cholesterol: steroïdskelet van drie zesringen (A–C, hoekig versmolten zoals fenantreen) en één vijfring (D),
 * ringen met gedeelde zijden; OH-groep aan de A-ring ter hoogte van de koppen, korte koolwaterstofstaart aan de D-ring (Casares 2019) */
function chol(x, side, op = 1) {
  const y0 = side < 0 ? TOP + HR * 1.2 : BOT - HR * 1.2, dir = -side, s = 8, d = Math.sqrt(3) * s;
  const P = (cx, cy, r, a) => `${f1(cx + r * Math.cos(a * Math.PI / 180))},${f1(cy + dir * r * Math.sin(a * Math.PI / 180))}`;
  const ring = (cx, cy, n, r, a0) => `<path d="M${Array.from({ length: n }, (_, k) => P(cx, cy, r, a0 + k * 360 / n)).join(' L')}z" fill="${CHOL}" fill-opacity=".85" stroke="#0b1224" stroke-opacity=".55" stroke-width="1.2"/>`;
  const ax = x - 3, ay = y0 + dir * 14;                                     // A-ring; B rechtsonder, C linksonder van B (hoekig), D rechtsonder van C
  const bx = ax + d * .5, by = ay + dir * d * .866, cx = bx - d * .5, cy = by + dir * d * .866;
  const r5 = s / (2 * Math.sin(Math.PI / 5)), a5 = s / (2 * Math.tan(Math.PI / 5));
  const dx = cx + (d / 2 + a5) * .5, dy = cy + dir * (d / 2 + a5) * .866;     // vijfring deelt de rechtsonderzijde van C
  const tail = P(dx, dy, r5, 60);
  return `<g opacity="${f1(op)}"><circle cx="${f1(ax)}" cy="${f1(y0)}" r="5" fill="#ff6b6b"/>` +       // OH
    ring(ax, ay, 6, s, 30) + ring(bx, by, 6, s, 30) + ring(cx, cy, 6, s, 30) + ring(dx, dy, 5, r5, 204) +
    `<path d="M${tail} l4,${f1(dir * 6)} l-2,${f1(dir * 5)}" stroke="${CHOL}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
}
/* suikers in SNFG-symbolen (zoals in de rest van de app): blauw ■ GlcNAc, groen ● mannose, blauw ● glucose, geel ● galactose */
const SNFG = { GlcNAc: '#0072BC', Glc: '#0072BC', Man: '#00A651', Gal: '#FFD400' };
const sym = (x, y, t) => t === 'GlcNAc' ? `<rect x="${f1(x - 6)}" y="${f1(y - 6)}" width="12" height="12" rx="1.5" fill="${SNFG[t]}" stroke="#0a1224" stroke-width="1.4"/>` : `<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" fill="${SNFG[t]}" stroke="#0a1224" stroke-width="1.4"/>`;
const bond = (x1, y1, x2, y2) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="#c9d2e4" stroke-width="2"/>`;
/* N-glycaan op een eiwit: de kern die elk N-glycaan heeft (2 GlcNAc, 1 mannose met 2 mannose-takken) */
function nGlycan(x, y, op = 1) {
  const p = [[x, y - 14], [x, y - 30], [x, y - 46]], l = [x - 12, y - 60], r = [x + 12, y - 60];
  return `<g opacity="${f1(op)}">` + bond(x, y, ...p[0]) + bond(...p[0], ...p[1]) + bond(...p[1], ...p[2]) + bond(...p[2], ...l) + bond(...p[2], ...r) +
    sym(...p[0], 'GlcNAc') + sym(...p[1], 'GlcNAc') + sym(...p[2], 'Man') + sym(...l, 'Man') + sym(...r, 'Man') + '</g>';
}
/* glycosfingolipide: glucose op het ceramide (glucosylceramide) met een galactose erop; Casares 2019: GSL's zijn gebaseerd op GlcCer of GalCer met mono-, di- of oligosachariden */
function gslGlycan(x, y, op = 1) {
  return `<g opacity="${f1(op)}">` + bond(x, y, x, y - 14) + bond(x, y - 14, x + 4, y - 29) + sym(x, y - 14, 'Glc') + sym(x + 4, y - 29, 'Gal') + '</g>';
}

export default {
  id: 'dubbellaag',
  title: { nl: 'Celmembraan: een dubbele laag vetten', en: 'Cell membrane: a double layer of fats' },
  scale: { nl: 'membraan ≈ 4 nm dik', en: 'membrane ≈ 4 nm thick' },
  time: { nl: 'lipiden schuiven voortdurend opzij (schematisch)', en: 'lipids keep sliding sideways (schematic)' },
  org: { nl: 'mens (plasmamembraan)', en: 'human (plasma membrane)' },
  legend: [[PC, L3('kop van een fosfolipide (waterminnend)', 'phospholipid head (water-loving)')], [TAILC, L3('vetzuurstaart (waterafstotend)', 'fatty acid tail (water-repelling)')],
    [CHOL, L3('cholesterol', 'cholesterol')], [PROT, L3('membraaneiwit', 'membrane protein')], [SNFG.Glc, L3('suiker: glucose ● of GlcNAc ■', 'sugar: glucose ● or GlcNAc ■')], [SNFG.Gal, L3('suiker: galactose ●', 'sugar: galactose ●')], [SNFG.Man, L3('suiker: mannose ●', 'sugar: mannose ●')],
    [SM, L3('sfingolipide (buitenlaag)', 'sphingolipid (outer layer)')], [PE, L3('fosfatidylethanolamine (binnenlaag)', 'phosphatidylethanolamine (inner layer)')], [PS, L3('fosfatidylserine (binnenlaag)', 'phosphatidylserine (inner layer)')]],
  simplified: {
    nl: 'Schematisch: echte membranen bevatten honderden soorten lipiden en veel meer eiwit, en alles beweegt voortdurend. Kleuren en vormen zijn vereenvoudigd; de verhouding tussen dikte en eiwitgrootte klopt ongeveer (een helix is ongeveer 1 nm breed). De suikerlaag (glycocalyx) is in werkelijkheid veel dichter en meestal tientallen tot honderden nanometer dik.',
    en: 'Schematic: real membranes contain hundreds of kinds of lipids and much more protein, and everything moves all the time. Colours and shapes are simplified; the ratio of thickness to protein size is roughly right (a helix is about 1 nm wide). The sugar layer (glycocalyx) is in reality much denser and usually tens to hundreds of nanometres thick.' },
  parts: [
    { c: C.dna2, t: L3('buiten de cel', 'outside the cell'), m: ['binnen: cytosol', 'inside: cytosol'], d: L3('Boven het vlies is het buiten de cel, onder het vlies zit het celvocht (cytosol).', 'Above the membrane is outside the cell, below it is the cell fluid (cytosol).'),
      p: L3('Extracellulaire zijde (boven) en cytoplasmatische zijde (onder) van het plasmamembraan.', 'Extracellular face (top) and cytoplasmic face (bottom) of the plasma membrane.') },
    { c: C.mem, t: L3('cel', 'cell'), m: ['ingezoomd', 'zoomed in'], d: L3('Het kadertje toont een klein stukje van de rand van een cel; de grote tekening is dat stukje sterk vergroot.', 'The small box shows a tiny piece of the edge of a cell; the large drawing is that piece greatly enlarged.'),
      p: L3('Uitvergroot detail van het plasmamembraan; de maatlijn geeft de dikte van ≈ 4 nm aan.', 'Magnified detail of the plasma membrane; the scale bar marks its thickness of ≈ 4 nm.') },
    { c: PC, t: L3('waterminnende koppen', 'water-loving heads'), m: ['waterminnend', 'water-loving'], d: L3('De bolletjes boven en onder: de koppen van de vetmoleculen. Ze houden van water en keren zich naar buiten en binnen.', 'The balls at top and bottom: the heads of the fat molecules. They like water and face outwards and inwards.'),
      p: L3('Polaire kopgroepen (fosfaat + alcohol) die de waterfase aan beide zijden raken.', 'Polar head groups (phosphate + alcohol) contacting the aqueous phase on both sides.') },
    { c: TAILC, t: L3('waterafstotende staarten', 'water-repelling tails'), m: ['waterafstotend', 'water-repelling', 'vetzuurstaarten', 'fatty acid', 'tails', 'twee', 'two'], d: L3('De streepjes in het midden: twee vetstaarten per molecuul. Ze mijden water en zitten daarom samen in het midden.', 'The lines in the middle: two fatty tails per molecule. They avoid water and so sit together in the middle.'),
      p: L3('Acylketens van de fosfolipiden; ze vormen de hydrofobe kern van de dubbellaag.', 'Acyl chains of the phospholipids; they form the hydrophobic core of the bilayer.') },
    { c: '#fff', t: '≈ 4 nm', d: L3('Het hele vlies is maar ongeveer 4 miljoenste millimeter dik.', 'The whole membrane is only about 4 millionths of a millimetre thick.'),
      p: L3('Dikte van het plasmamembraan, fosfaat tot fosfaat ≈ 3,6–4,3 nm (Mitra et al. 2004).', 'Plasma membrane thickness, phosphate to phosphate ≈ 3.6–4.3 nm (Mitra et al. 2004).') },
    { c: '#f2d49b', t: L3('kop', 'head'), m: ['(bv. choline)', '(e.g. choline)'], d: L3('Het bovenste deel van één vetmolecuul: een klein groepje dat goed in water oplost, bijvoorbeeld choline.', 'The top part of one fat molecule: a small group that dissolves well in water, for example choline.'),
      p: L3('Alcoholgroep van de kop, bv. choline (positief geladen) in fosfatidylcholine.', 'Alcohol moiety of the head group, e.g. choline (positively charged) in phosphatidylcholine.') },
    { c: PC, t: L3('fosfaatgroep', 'phosphate group'), d: L3('Het geladen stukje (−) dat de kop aan de rest van het molecuul vastmaakt.', 'The charged piece (−) that links the head to the rest of the molecule.'),
      p: L3('Negatief geladen fosfodiëstergroep tussen de alcohol en glycerol.', 'Negatively charged phosphodiester group between the alcohol and glycerol.') },
    { c: '#c9d2e4', t: 'glycerol', d: L3('Het koppelstuk waaraan de kop en de twee staarten vastzitten.', 'The connector to which the head and the two tails are attached.'),
      p: L3('Glycerol-3-fosfaatruggengraat; de vetzuren zijn veresterd op C1 en C2.', 'Glycerol-3-phosphate backbone; the fatty acids are esterified at C1 and C2.') },
    { c: '#ffd166', t: L3('knik', 'kink'), m: ['knik = dubbele', 'kink = cis double', 'binding (cis)', 'bond', 'losser gepakt → vloeibaarder', 'looser packing → more fluid'], d: L3('Een staart met een knik past minder dicht tegen zijn buren. Zo blijft het vlies soepel en vloeibaar.', 'A tail with a kink packs less tightly against its neighbours. That keeps the membrane supple and fluid.'),
      p: L3('Een cis-dubbele binding in een onverzadigd vetzuur geeft een knik die de pakking verstoort en de vloeibaarheid verhoogt.', 'A cis double bond in an unsaturated fatty acid introduces a kink that disrupts packing and increases fluidity.') },
    { c: CHOL, t: 'cholesterol', m: ['OH aan de waterkant, ringen tussen de staarten', 'OH at the water side, rings between the tails'], d: L3('Een stijf molecuul van vier ringen tussen de vetten (geelgroen), met een rood OH-groepje aan de waterkant.', 'A stiff molecule of four rings between the fats (yellow-green), with a red OH group at the water side.'),
      p: L3('Sterol met vier versmolten ringen; de 3β-OH ligt bij de kopgroepen. Het moduleert vloeibaarheid en pakking.', 'Sterol with four fused rings; the 3β-OH lies at the head groups. It modulates fluidity and packing.') },
    { c: PROT, t: L3('membraaneiwit', 'membrane protein'), d: L3('De paarse eiwitten die door het vlies steken: een ontvanger met zeven staafjes en een eiwit met één staafje.', 'The purple proteins sticking through the membrane: a receptor with seven rods and a protein with one rod.'),
      p: L3('Integrale membraaneiwitten: een receptor met zeven transmembraanhelices en een eiwit met één transmembraanhelix (≈ 1 nm breed).', 'Integral membrane proteins: a receptor with seven transmembrane helices and a single-pass protein (helix ≈ 1 nm wide).') },
    { c: '#ffd166', t: L3('waterafstotend deel', 'water-repelling part'), m: ['waterminnende lus', 'water-loving loop'], d: L3('Het stuk eiwit tussen de koppen is vettig, net als de staarten. De lussen erboven en eronder houden van water.', 'The part of the protein between the heads is greasy, like the tails. The loops above and below like water.'),
      p: L3('Hydrofobe transmembraansegmenten in de apolaire kern; polaire lussen steken uit in de waterfase (Singer & Nicolson 1972).', 'Hydrophobic transmembrane segments in the apolar core; polar loops protrude into the aqueous phase (Singer & Nicolson 1972).') },
    { c: SUGAR, t: L3('suikers', 'sugars'), d: L3('Kettinkjes van suikers (gekleurde bolletjes en blokjes) die enkel aan de buitenkant hangen, op eiwitten en sommige vetten.', 'Chains of sugars (coloured balls and squares) that hang only on the outside, on proteins and some fats.'),
      p: L3('Glycocalyx: N-glycanen op eiwitten en glycosfingolipiden, getekend met SNFG-symbolen.', 'Glycocalyx: N-glycans on proteins and glycosphingolipids, drawn with SNFG symbols.') },
    { c: SM, t: L3('buitenlaag: o.a. PC en sfingolipiden', 'outer layer: e.g. PC and sphingolipids'), d: L3('De bovenste laag bevat vooral andere soorten vetten dan de onderste (lichtblauwe koppen).', 'The top layer contains mostly different kinds of fats than the bottom one (light-blue heads).'),
      p: L3('Het buitenblad is verrijkt in fosfatidylcholine en sfingolipiden.', 'The outer leaflet is enriched in phosphatidylcholine and sphingolipids.') },
    { c: PS, t: L3('binnenlaag: o.a. PE, PS (negatief) en PI', 'inner layer: e.g. PE, PS (negative) and PI'), d: L3('De onderste laag heeft eigen vetten, waarvan sommige negatief geladen zijn. Pompen houden dat verschil in stand.', 'The bottom layer has its own fats, some of them negatively charged. Pumps keep that difference in place.'),
      p: L3('Het binnenblad bevat PE, PS en PI; flippasen en floppasen handhaven de asymmetrie.', 'The inner leaflet contains PE, PS and PI; flippases and floppases maintain the asymmetry.') },
    { c: C.muted, t: L3('model: Singer & Nicolson, 1972', 'model: Singer & Nicolson, 1972'), d: L3('Het idee dat vetten en eiwitten in het vlies vrij opzij schuiven, als een vloeibaar mozaïek.', 'The idea that fats and proteins slide freely sideways in the membrane, like a fluid mosaic.'),
      p: L3('Vloeibaar-mozaïekmodel: laterale diffusie van lipiden en eiwitten in een tweedimensionale vloeistof.', 'Fluid mosaic model: lateral diffusion of lipids and proteins in a two-dimensional fluid.') },
  ],
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
        // receptor met zeven helices door het membraan (zoals een GPCR; hier naast elkaar uitgevouwen), waterminnende lussen boven en onder
        const c1b = (PROT1[0] + PROT1[1]) / 2, c1 = c1b + mv(c1b), x2b = (PROT2[0] + PROT2[1]) / 2, x2 = x2b + mv(x2b);
        let ch = '';
        for (let k = 0; k < 7; k++) ch += tmHelix(c1 - 3 * HW + k * HW, TOP - 6, BOT + 6, PROT, 1, HW);
        /* lussen tussen opeenvolgende helices: N-uiteinde buiten, dan beurtelings een lus binnen (ICL) en buiten (ECL),
           C-uiteinde binnen (bouw van een receptor met zeven helices; Alberts/MBoC hfst. 15) */
        const hx = k => c1 - 3 * HW + k * HW, lus = (k, boven) => { const xa = hx(k), xb = hx(k + 1), y = boven ? TOP - 6 : BOT + 6, d = boven ? -1 : 1, h = boven && k === 3 ? 46 : 26;
          return `<path d="M${f1(xa)},${f1(y)} C${f1(xa - 4)},${f1(y + d * h)} ${f1(xb + 4)},${f1(y + d * h)} ${f1(xb)},${f1(y)}" stroke="${PROT}" stroke-width="${f1(HW * .55)}" fill="none" stroke-linecap="round" opacity=".85"/>`; };
        for (let k = 0; k < 6; k++) ch += lus(k, k % 2 === 1);
        ch += `<path d="M${f1(hx(0))},${f1(TOP - 6)} q-6,-30 -34,-40 t-30,-14" stroke="${PROT}" stroke-width="${f1(HW * .55)}" fill="none" stroke-linecap="round" opacity=".85"/>`;   // N-uiteinde (buiten)
        ch += `<path d="M${f1(hx(6))},${f1(BOT + 6)} q4,20 30,22 l40,0 q20,2 26,24" stroke="${PROT}" stroke-width="${f1(HW * .55)}" fill="none" stroke-linecap="round" opacity=".85"/>`;     // C-uiteinde (cytosol)
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
          pr += T(lx - 70, TOP - 40, T2('waterminnende lus', 'water-loving loop'), { size: 22, col: C.dna2, anchor: 'end', op: o5 });
          pr += T(lx - 70, BOT + 40, T2('waterminnende lus', 'water-loving loop'), { size: 22, col: C.dna2, anchor: 'end', op: o5 });
        }
        const kSug = Math.max(at(6), fade0, step === 7 ? 1 : 0);
        if (kSug > .01) {
          let sg = nGlycan(x2 - 20, TOP - 104, kSug) + nGlycan(x2 + 24, TOP - 100, kSug) + nGlycan(c1 - 3 * HW - 34, TOP - 46, kSug);   // op het N-uiteinde van de receptor
          for (const l of LIPIDS) if (l.gsl) sg += gslGlycan(l.x + mv(l.x), TOP, kSug);      // suikers op glycosfingolipiden
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
            `<path d="M${ccx - 14},${ccy - cr + 14} L${px + 30},${TOP - 50} M${ccx + 14},${ccy - cr + 14} L${px + pw - 30},${TOP - 50}" stroke="#ffd166" stroke-width="2" stroke-dasharray="6 5" opacity=".75"/>` +
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
