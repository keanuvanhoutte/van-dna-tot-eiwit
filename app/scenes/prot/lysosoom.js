import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T, TL } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, btn } from './_fate.js';
import { blaasje, cisterne, membraanPts, ptsBoog, hydrolase, tmHelix, vATPase, eiwit, bioDefs } from '../../bio.js';

/*
 * Lysosoom: in het (cis-)Golgi krijgen zure knipenzymen een suikerlabel (mannose-6-fosfaat); een ontvanger (M6P-receptor)
 * in het membraan van het trans-Golgi grijpt het label en snoert met het enzym af in een klein blaasje naar het endosoom.
 * Daar (zuurder, V-ATPase) laat hij los en keert terug; een blaasje brengt het enzym naar het zure lysosoom (pH 4,5–5),
 * waar het fosfaat er meteen af gaat (ACP2/ACP5, Hirn 2025). Een lumenaal enzym zit altijd in een membraan: het komt nooit
 * los in het cytosol. Ziekte: zonder label (mucolipidose II, I-celziekte) gaan de enzymen in secretieblaasjes naar het
 * celmembraan en worden ze uitgescheiden (exocytose); bij Pompe ontbreekt één enzym.
 */
const L3 = (nl, en) => ({ nl, en });
const ENZ = C.prot, SUG = '#00A651', PH = '#ff9f43', REC = '#ffc247', ENDO = C.mem, PUMP = '#5fd3e6';
const LY = [1180, 400], LR = 190, EN = [800, 580], ER0 = 105, PMX = 1520;
const DEBRIS = '#8a93a8', GLYC = '#9cc0ff', BB = '#e6ebf5';   // BB = afbraakproducten (bouwstenen)
const ES = .5;                                  // grootte van het enzym (zodat het met label in het Golgi-lumen past)
/* Golgi: 4 cisternen, cis links, trans rechts (x = midden van de uiteinden) */
const GX = i => 250 + i * 92, GLEN = i => 330 - Math.abs(i - 1.5) * 30;
const CISP = [217, 400];                        // enzym in het lumen van de cis-cisterne
const UP = [0, -1];
const RC = [516, 244];                          // ontvanger in de bovenste kap van de trans-cisterne (kop naar het lumen)
const RE = [-10, 75];                           // enzym t.o.v. de ontvanger: het label zit net onder de groeve van de kop
const BW = 10, GAP = BW / 2 + 6;                // membraandikte van een blaasje; afstand knop → afgesnoerd blaasje
const VR = 48, V1 = [RC[0], RC[1] - VR - GAP];  // receptorblaasje, net afgesnoerd van de trans-kap
const ERC = [EN[0], EN[1] - ER0], VE = [ERC[0], ERC[1] - VR - GAP];   // plek bovenaan het endosoom waar het blaasje versmelt
const EREL = [830, 590];                        // losgelaten enzym in het endosoom
const SR = 30, SV0 = [ERC[0], ERC[1] - SR - GAP], SV1 = [RC[0], RC[1] - SR - GAP];   // terugkeerblaasje van de ontvanger
const CR = 36;
const onC = (c, R, a) => [[c[0] + Math.cos(a) * R, c[1] + Math.sin(a) * R], [Math.cos(a), Math.sin(a)]];
const [ME, NE] = onC(EN, ER0, .15), [ML, NL] = onC(LY, LR, 2.2);    // knop op het endosoom; versmelting met het lysosoom (tussen twee pompen)
const C1 = [ME[0] + NE[0] * (CR + GAP), ME[1] + NE[1] * (CR + GAP)], C2 = [ML[0] + NL[0] * (CR + GAP), ML[1] + NL[1] * (CR + GAP)];
const ARR = [1240, 480];                        // het afgeleverde enzym in het lysosoom
/* I-cel: secretieblaasjes knoppen af van de rechterwand van de trans-cisterne en versmelten boven het lysosoom met het celmembraan */
const MS = [520, 400], NS = [1, 0], WAIT = [[492, 414], [501, 474], [496, 354]];
const MP = [1523, 132], NP = [-.997, .078];
const SEC = [[MS[0] + CR + GAP, 400], [610, 330], [640, 132], [MP[0] + NP[0] * (CR + GAP), MP[1] + NP[1] * (CR + GAP)]];
const CISW = [[217, 400], [308, 400], [400, 400], [RC[0] + RE[0], RC[1] + RE[1] + 12]];   // het enzym schuift door de stapel
/* "gat" in het moedermembraan bij een knop: de kleur van het lumen erachter (lumenkleur over de achtergrond) */
const HOLE = { golgi: '#272834', endo: '#2c232c', lyso: '#271e30', out: '#0a101f' };

const enzyme = (x, y, { tag = 1, s = ES, op = 1, sugar = true, seed = 5 } = {}) => hydrolase(x, y, { tag, s, op, glycaan: sugar, seed });
/* M6P-receptor (kationafhankelijk, een dimeer): twee transmembraanhelices, elk met een korte staart in het cytosol en een
 * kopdomein in het lumen; de groeve onderaan de kop houdt het label vast. (x, y) = punt op het membraan, kop naar beneden. */
function rec(x, y, op = 1) {
  if (op <= .01) return '';
  const half = 8.5, kopY = y + half + 17;
  let g = `<g opacity="${f1(op)}">`;
  for (const dx of [-7, 7]) {
    g += tmHelix(x + dx, y - half, y + half, REC, 1, 6);
    g += `<path d="M${f1(x + dx)},${f1(y - half)} q${f1(dx * .5)},-5 ${f1(dx * .2)},-10" stroke="${REC}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
    g += `<line x1="${f1(x + dx)}" y1="${f1(y + half)}" x2="${f1(x + dx)}" y2="${f1(kopY - 6)}" stroke="${REC}" stroke-width="2.5"/>`;
  }
  g += eiwit(x - 7, kopY, 10, 8.5, REC, { seed: 71 }) + eiwit(x + 7.5, kopY + 2, 9.5, 8, REC, { seed: 72 });
  g += `<path d="M${f1(x - 5)},${f1(kopY + 7.5)} q5,-4.5 10,0" stroke="#0b1224" stroke-opacity=".6" stroke-width="2" fill="none"/>`;
  return g + '</g>';
}
const ves = (c, r, op = 1) => blaasje(c[0], c[1], r, { op, w: BW, lumen: 'rgba(201,165,116,.10)' });
/* Knop: een blaasje ontstaat uit het membraan zelf. m = punt op het moedermembraan, n = richting naar het cytosol, r = straal.
 * k = 0: vlak membraan; k ↑: het membraan stulpt uit naar het cytosol (de hals blijft open naar het lumen); k = 1: afgesnoerd.
 * Versmelten = dezelfde knop met k van 1 naar 0. Geeft { svg, c, top } terug; top = het punt van de knop het verst van de hals. */
function knop(m, n, r, k, hole, op = 1) {
  const rho = r * (.1 + .9 * Math.min(1, k / .6));
  const d = k < .75 ? rho * .8 * k / .75 : lerp(.8 * r, r + GAP, (k - .75) / .25);
  const c = [m[0] + n[0] * d, m[1] + n[1] * d], top = [c[0] + n[0] * rho, c[1] + n[1] * rho];
  const o = op * Math.min(1, k / .08);
  let svg = '';
  if (o > .01) {
    if (d < rho) {
      const a = Math.acos(d / rho), phi = Math.atan2(-n[1], -n[0]), P = [];
      for (let i = 0; i <= 40; i++) { const t = phi + a + (2 * Math.PI - 2 * a) * i / 40; P.push([c[0] + rho * Math.cos(t), c[1] + rho * Math.sin(t)]); }
      svg = `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="${f1(Math.max(0, rho - BW / 2 + 1))}" fill="${hole}" opacity="${f1(o)}"/>` + membraanPts(P, { w: BW, op: o });
    } else svg = ves(c, rho, o);
  }
  return { svg, c, top: k < .1 ? mix(m, top, k / .1) : top };
}
const mix = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const add = (a, d) => [a[0] + d[0], a[1] + d[1]];
const bow = (a, b, k, h) => { const q = mix(a, b, k); return [q[0], q[1] - Math.sin(k * Math.PI) * h]; };
function pl(P, u) {                              // punt op een gebroken lijn, u = 0..1 over de lengte
  const seg = P.slice(1).map((q, i) => Math.hypot(q[0] - P[i][0], q[1] - P[i][1]));
  let t = u * seg.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seg.length; i++) { if (t <= seg[i] || i === seg.length - 1) return mix(P[i], P[i + 1], Math.min(1, t / (seg[i] || 1))); t -= seg[i]; }
  return P[P.length - 1];
}
const R0 = rng(7), CHUNK = Array.from({ length: 7 }, (_, i) => [LY[0] + (R0() - .5) * 220, LY[1] + (R0() - .5) * 200, 16 + R0() * 12, 200 + i]);
const LENZ = [[-90, -80], [60, -100], [110, 10], [-10, 40], [-130, 30]].map(([dx, dy]) => [LY[0] + dx, LY[1] + dy]);

export default {
  id: 'lysosoom',
  title: { nl: 'Een suikerlabel stuurt enzymen naar het lysosoom', en: 'A sugar tag sends enzymes to the lysosome' },
  scale: { nl: '≈ 2 µm (lysosoom ≈ 0,5 µm, schematisch)', en: '≈ 2 µm (lysosome ≈ 0.5 µm, schematic)' },
  time: { nl: 'schematisch', en: 'schematic' },
  org: { nl: 'mens', en: 'human' },
  legend: [[ENZ, L3('knipenzym (zure hydrolase)', 'cutting enzyme (acid hydrolase)')], [SUG, L3('suiker (mannose)', 'sugar (mannose)')], [PH, L3('fosfaat: het label (mannose-6-fosfaat)', 'phosphate: the tag (mannose 6-phosphate)')],
    [REC, L3('ontvanger (M6P-receptor)', 'receiver (M6P receptor)')], [PUMP, L3('protonpomp (V-ATPase)', 'proton pump (V-ATPase)')], [C.mem, L3('Golgi, endosoom', 'Golgi, endosome')], [DEST.lyso, L3('lysosoom', 'lysosome')], [BB, L3('bouwstenen (afbraakproducten)', 'building blocks (breakdown products)')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het label wordt in twee stappen gemaakt (eerst een fosfaat met een afdekgroep, die daarna verwijderd wordt); hier is dat één stap. Het enzym verschijnt hier na elkaar in elke cisterne; in werkelijkheid schuift het geleidelijk door de stapel. Het endosoom rijpt in werkelijkheid geleidelijk tot lysosoom; hier brengt één blaasje het enzym over. Niet elk lysosomaal eiwit gebruikt dit label: er bestaan ook andere ontvangers.',
    en: 'Schematic and not to scale. The tag is made in two steps (first a phosphate with a capping group, which is then removed); here that is one step. Here the enzyme appears in each cisterna in turn; in reality it moves gradually through the stack. In reality the endosome gradually matures into a lysosome; here a single vesicle carries the enzyme across. Not every lysosomal protein uses this tag: other receivers also exist.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.mem, t: 'Golgi', m: ['cis', 'trans'], d: { nl: 'Een stapel platte zakjes waar eiwitten na het ER doorheen schuiven, van de cis-kant naar de trans-kant.', en: 'A stack of flat sacs that proteins move through after the ER, from the cis side to the trans side.' },
      p: { nl: 'Golgi-apparaat; in het cis-Golgi wordt het M6P-label gemaakt, in het trans-Golgi(netwerk) wordt gesorteerd.', en: 'Golgi apparatus; the M6P tag is made in the cis-Golgi and sorting happens in the trans-Golgi (network).' } },
    { c: ENZ, t: { nl: 'knipenzym', en: 'cutting enzyme' }, d: { nl: 'Het paarse eiwit: een enzym dat in het lysosoom grote moleculen in stukjes knipt. Het werkt pas goed in zuur.', en: 'The purple protein: an enzyme that cuts large molecules into pieces in the lysosome. It only works well in acid.' },
      p: { nl: 'Lysosomale (zure) hydrolase, een glycoproteïne met een optimum bij lage pH.', en: 'Lysosomal (acid) hydrolase, a glycoprotein with an optimum at low pH.' } },
    { c: SUG, t: { nl: 'suiker (mannose)', en: 'sugar (mannose)' }, d: { nl: 'De groene suikertjes op het enzym. Op één ervan komt het label.', en: 'The green sugars on the enzyme. The tag goes onto one of them.' },
      p: { nl: 'Mannoserijk N-glycaan van de hydrolase; het substraat voor de M6P-merking.', en: 'High-mannose N-glycan of the hydrolase; the substrate for M6P tagging.' } },
    { c: PH, t: 'P', m: ['label erop', 'tag added'], d: { nl: 'Het oranje fosfaatgroepje: het adreslabel ‘naar het lysosoom’. Het komt op een suiker van het enzym.', en: 'The orange phosphate group: the address tag ‘to the lysosome’. It goes onto a sugar of the enzyme.' },
      p: { nl: 'Mannose-6-fosfaat, in het cis-Golgi aangebracht door GlcNAc-1-fosfotransferase (in twee stappen; hier als één getekend).', en: 'Mannose 6-phosphate, added in the cis-Golgi by GlcNAc-1-phosphotransferase (in two steps; drawn here as one).' } },
    { c: REC, t: { nl: 'ontvanger', en: 'receiver' }, m: ['ontvanger keert terug', 'receiver returns'], d: { nl: 'Een gele ontvanger in het membraan die het label grijpt en het enzym in een blaasje meeneemt. Daarna keert hij terug.', en: 'A yellow receiver in the membrane that grabs the tag and takes the enzyme along in a vesicle. Then it returns.' },
      p: { nl: 'M6P-receptor (hier de kationafhankelijke, een dimeer); bindt M6P in het trans-Golgi en recycleert na dissociatie in het endosoom.', en: 'M6P receptor (here the cation-dependent one, a dimer); binds M6P in the trans-Golgi and recycles after dissociation in the endosome.' } },
    { c: C.mem, t: { nl: 'blaasje', en: 'vesicle' }, d: { nl: 'Een klein bolletje membraan dat afsnoert en de vracht naar een ander zakje brengt.', en: 'A small ball of membrane that pinches off and carries the cargo to another compartment.' },
      p: { nl: 'Transportvesikel (TGN → endosoom met clathrine; endosoom → lysosoom); versmelt met het doelmembraan.', en: 'Transport vesicle (TGN → endosome with clathrin; endosome → lysosome); fuses with the target membrane.' } },
    { c: ENDO, t: { nl: 'endosoom', en: 'endosome' }, m: ['zuurder', 'more acidic'], d: { nl: 'Een tussenstation dat zuurder is dan het Golgi. Door het zuur laat de ontvanger het enzym los.', en: 'An intermediate station that is more acidic than the Golgi. The acid makes the receiver let go of the enzyme.' },
      p: { nl: 'Endosoom; de lage pH doet de hydrolase van de M6P-receptor dissociëren.', en: 'Endosome; the low pH makes the hydrolase dissociate from the M6P receptor.' } },
    { c: DEST.lyso, t: { nl: 'lysosoom', en: 'lysosome' }, m: ['pH ≈ 4,5–5 (zuur)', 'pH ≈ 4.5–5 (acidic)'], d: { nl: 'Het verteerblaasje van de cel: binnen is het zuur, en de knipenzymen breken er grote moleculen af.', en: 'The cell’s digestion vesicle: inside it is acidic, and the cutting enzymes break down large molecules there.' },
      p: { nl: 'Zuur degradatief organel (pH ≈ 4,5–5) met tientallen hydrolasen.', en: 'Acidic degradative organelle (pH ≈ 4.5–5) with dozens of hydrolases.' } },
    { c: PUMP, t: { nl: 'protonpomp', en: 'proton pump' }, m: ['H⁺ naar binnen', 'H⁺ inward'], d: { nl: 'Een pomp in het membraan die zuur (H⁺) naar binnen pompt. Zo blijft het lysosoom zuur.', en: 'A pump in the membrane that pumps acid (H⁺) inside. This keeps the lysosome acidic.' },
      p: { nl: 'V-ATPase: ATP-gedreven H⁺-pomp die het lumen van endosomen en lysosomen verzuurt.', en: 'V-ATPase: ATP-driven H⁺ pump that acidifies the lumen of endosomes and lysosomes.' } },
    { c: PH, t: { nl: 'fosfaat eraf', en: 'phosphate removed' }, d: { nl: 'In het lysosoom gaat het label er meteen af; het is niet meer nodig.', en: 'In the lysosome the tag comes off right away; it is no longer needed.' },
      p: { nl: 'Lysosomale zure fosfatasen (ACP2/ACP5) verwijderen het fosfaat van M6P.', en: 'Lysosomal acid phosphatases (ACP2/ACP5) remove the phosphate from M6P.' } },
    { c: BB, t: { nl: 'bouwstenen', en: 'building blocks' }, d: { nl: 'De kleine stukjes die overblijven na het knippen. De cel gebruikt ze opnieuw.', en: 'The small pieces left after cutting. The cell reuses them.' },
      p: { nl: 'Afbraakproducten (aminozuren, suikers, nucleotiden, lipiden) die naar het cytosol worden geëxporteerd.', en: 'Breakdown products (amino acids, sugars, nucleotides, lipids) that are exported to the cytosol.' } },
    { c: C.muted, t: 'cytosol', m: ['celmembraan', 'cell membrane', 'buiten de cel', 'outside the cell'], d: { nl: 'Het celvocht rond de zakjes. Rechts ligt het celmembraan, daarachter de buitenkant van de cel.', en: 'The cell fluid around the sacs. On the right is the cell membrane, beyond it the outside of the cell.' },
      p: { nl: 'Cytosol; lumenale enzymen blijven steeds door een membraan ervan gescheiden. Rechts het plasmamembraan en de extracellulaire ruimte.', en: 'Cytosol; luminal enzymes always remain separated from it by a membrane. On the right the plasma membrane and the extracellular space.' } },
    { c: C.danger, t: { nl: 'geen label → naar buiten de cel', en: 'no tag → out of the cell' }, m: ['afval hoopt op', 'waste piles up'], d: { nl: 'Bij I-celziekte ontbreekt het label. De enzymen gaan dan naar buiten de cel, en in het lysosoom hoopt afval op.', en: 'In I-cell disease the tag is missing. The enzymes then go out of the cell, and waste piles up in the lysosome.' },
      p: { nl: 'Mucolipidose II (I-celziekte): defecte fosfotransferase, geen M6P; hydrolasen worden via de standaardroute uitgescheiden en substraten stapelen op.', en: 'Mucolipidosis II (I-cell disease): defective phosphotransferase, no M6P; hydrolases are secreted via the default route and substrates accumulate.' } },
    { c: GLYC, t: { nl: 'glycogeen hoopt op', en: 'glycogen piles up' }, d: { nl: 'Bij de ziekte van Pompe werkt één knipenzym te weinig. Een opslagsuiker (glycogeen) blijft dan in het lysosoom liggen.', en: 'In Pompe disease one cutting enzyme works too little. A storage sugar (glycogen) then stays behind in the lysosome.' },
      p: { nl: 'Ziekte van Pompe (glycogeenstapelingsziekte type II): tekort aan zure α-glucosidase, lysosomale glycogeenstapeling.', en: 'Pompe disease (glycogen storage disease type II): deficiency of acid α-glucosidase, lysosomal glycogen accumulation.' } },
  ],
  steps: [
    { dur: 7500, cam: FULL, title: L3('Het lysosoom breekt grote moleculen af', 'The lysosome breaks down large molecules'),
      text: L3('Een lysosoom is een blaasje vol knipenzymen. Binnen is het zuur: pH ongeveer 4,5 tot 5.', 'A lysosome is a vesicle full of cutting enzymes. Inside it is acidic: pH about 4.5 to 5.') },
    { dur: 8000, cam: cam(500, 355, 860), title: L3('Het enzym krijgt een label in het Golgi', 'The enzyme gets a tag in the Golgi'),
      text: L3('Aan de cis-kant van het Golgi komt een fosfaatgroepje op een suiker van het enzym. Dat suikerlabel is het adres van het lysosoom.', 'On the cis side of the Golgi a small phosphate group is put on one of the enzyme’s sugars. That sugar tag is the lysosome’s address.') },
    { dur: 8000, cam: cam(500, 355, 860), title: L3('Een ontvanger grijpt het label', 'A receiver grabs the tag'),
      text: L3('Het enzym schuift door naar de trans-kant. Daar grijpt een ontvanger in het membraan het label, en samen snoeren ze af in een blaasje.', 'The enzyme moves on to the trans side. There a receiver in the membrane grabs the tag, and together they pinch off in a vesicle.') },
    { dur: 9000, cam: cam(955, 420, 1040), title: L3('Afgeleverd, en de ontvanger keert terug', 'Delivered, and the receiver returns'),
      text: L3('Het blaasje versmelt met een endosoom. Daar is het zuurder: de ontvanger laat los en keert terug naar het Golgi.', 'The vesicle fuses with an endosome. It is more acidic there: the receiver lets go and returns to the Golgi.') },
    { dur: 9000, cam: cam(1000, 425, 1040), title: L3('In het zuur gaan de enzymen aan het werk', 'In the acid the enzymes get to work'),
      text: L3('Een blaasje brengt het enzym naar het lysosoom. Het zuur zet de enzymen aan: ze knippen grote moleculen in bouwstenen.', 'A vesicle carries the enzyme to the lysosome. The acid switches the enzymes on: they cut large molecules into building blocks.') },
    { dur: 9000, cam: FULL, title: L3('Zonder label raken de enzymen kwijt', 'Without the tag the enzymes get lost'),
      text: L3('Bij I-celziekte ontbreekt het label. De enzymen belanden buiten de cel en het lysosoom raakt vol afval.', 'In I-cell disease the tag is missing. The enzymes end up outside the cell and the lysosome fills with waste.') },
    { dur: 9000, cam: FULL, title: L3('Eén enzym te weinig: de ziekte van Pompe', 'Too little of one enzyme: Pompe disease'),
      text: L3('Soms werkt maar één enzym te weinig. Bij de ziekte van Pompe blijft een opslagsuiker (glycogeen) in het lysosoom liggen.', 'Sometimes just one enzyme works too little. In Pompe disease a storage sugar (glycogen) stays behind in the lysosome.') },
  ],
  svg() {
    let golgi = '';
    for (let i = 0; i < 4; i++) golgi += cisterne(GX(i), 400, { len: GLEN(i), dik: 46, buig: 34, w: 9 });   // dun genoeg dat er cytosol tussen naburige zakken blijft (zoals golgi.js)
    return svgOpen(bioDefs) + `
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi', 'Golgi')}">${golgi}<circle data-anchor="golgi" cx="380" cy="200" r="1" fill="none"/></g>
    ${T(GX(0), 584, 'cis', { size: 22, col: C.muted })}${T(GX(3), 584, 'trans', { size: 22, col: C.muted })}${arrow(GX(0) + 26, 577, GX(3) - 34, 577, C.muted, 2)}
    <g id="ly-golab">${T(394, 655, 'Golgi', { size: 28, col: C.mem })}</g>
    <g id="ly-endo"><g data-node="endocytose" data-color="${ENDO}" data-nolabel>${blaasje(EN[0], EN[1], ER0, { lumen: 'rgba(201,165,116,.13)', rand: ENDO, w: 12 })}</g>
    ${T(EN[0], EN[1] + ER0 + 25, T2('endosoom', 'endosome'), { size: 24, col: ENDO })}
    <g id="ly-epump"></g></g>
    <g data-node="autofagie" data-color="${DEST.lyso}" data-label="${T2('Ook grote stukken: autofagie', 'Large pieces too: autophagy')}">
      <g id="ly-body">${blaasje(LY[0], LY[1], LR, { lumen: 'rgba(255,107,107,.11)', rand: DEST.lyso, w: 16 })}</g>
      <g id="ly-pump"></g>
      <circle data-anchor="autofagie" data-pos="below" cx="${LY[0]}" cy="${LY[1] + LR + 70}" r="1" fill="none"/></g>
    ${T(LY[0], LY[1] + LR + 44, T2('lysosoom', 'lysosome'), { size: 30, col: DEST.lyso, w: 700 })}
    <g id="ly-ph"></g>
    ${membraanPts(ptsBoog(PMX, 100, PMX + 30, 450, PMX, 800), { w: 20 })}
    ${T(PMX + 2, 845, T2('celmembraan', 'cell membrane'), { size: 22, col: C.muted })}
    <g transform="rotate(-90 1582 650)">${T(1582, 650, T2('buiten de cel', 'outside the cell'), { size: 22, col: C.muted })}</g>
    ${T(1020, 790, 'cytosol', { size: 24, col: C.muted, italic: true })}
    <g id="ly-in"></g><g id="ly-fx"></g>
    <g id="ly-nav">
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('golgi', 400, 300, T2('← het Golgi', '← the Golgi'), C.mem)}
    ${btn('kernimport', 1150, 410, T2('volgende: naar de kern →', 'next: into the nucleus →'), C.dna)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        // navigatieknoppen staan bovenaan de volledige figuur: tijdens ingezoomde stappen verbergen (vielen half buiten de bovenrand)
        { const Z = [1, 2, 3, 4], nz = i => Z.includes(i) ? 0 : 1, navOp = lerp(step > 0 ? nz(step - 1) : nz(step), nz(step), ease(sub(p, 0, .25)));
          svg.getElementById('ly-nav').setAttribute('opacity', f1(navOp)); }
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kIntro = step === 0 ? ease(sub(p, .3, .6)) : 1;
        const kTag = ph(1, .2, .6), kWork = ph(4, .55, .95);
        const kIcell = step === 5 ? ease(sub(p, .05, .95)) : 0, kPompe = step === 6 ? ease(sub(p, .1, .9)) : 0, kX6 = step === 6 ? 1 - ease(sub(p, 0, .3)) : 0;
        const icell = Math.max(kIcell, kX6), sec = step === 5 ? ease(sub(p, 0, .15)) : kX6;   // stap 6 begint waar stap 5 eindigde en vloeit dan terug naar gewoon
        const zoom = step === 1 ? ease(sub(p, 0, .04)) : step === 2 || step === 3 ? 1 : step === 4 ? 1 - ease(sub(p, 0, .2)) : 0;
        const calm = kIntro * (1 - sec) * (1 - zoom);
        // pH-label (verborgen bij I-cel: daar lopen de secretieblaasjes boven het lysosoom)
        $('ly-ph').innerHTML = T(LY[0], LY[1] - LR - 38, T2('pH ≈ 4,5–5 (zuur)', 'pH ≈ 4.5–5 (acidic)'), { size: 28, col: C.text, op: calm });
        // protonpompen (V-ATPase): kop in het cytosol, pompen H⁺ naar binnen → het lumen wordt zuur
        $('ly-pump').innerHTML = [-2.35, -.85, .45, 2.65].map(a => vATPase(LY[0] + Math.cos(a) * LR, LY[1] + Math.sin(a) * LR, a, { s: .9, k: kIntro })).join('') +
          (calm > .01 ? `<line x1="982" y1="197" x2="1001" y2="215" stroke="${PUMP}" stroke-width="2" opacity="${f1(calm)}"/>` : '') +
          TL(985, 158, [T2('protonpomp', 'proton pump'), T2('H⁺ naar binnen', 'H⁺ inward')], { size: 24, col: PUMP, op: calm, anchor: 'end' });
        // ook het endosoom heeft protonpompen (iets minder zuur dan het lysosoom)
        $('ly-epump').innerHTML = [2.3, 2.85].map(a => vATPase(EN[0] + Math.cos(a) * ER0, EN[1] + Math.sin(a) * ER0, a, { s: .8, k: kIntro })).join('');
        // het endosoom valt weg in de ingezoomde Golgi-stappen (half in beeld, onder de ondertitel)
        $('ly-endo').setAttribute('opacity', f1(step === 1 ? 1 - ease(sub(p, 0, .15)) : step === 2 ? 0 : step === 3 ? ease(sub(p, 0, .12)) : 1));
        $('ly-golab').setAttribute('opacity', $('ly-endo').getAttribute('opacity'));   // ook het onderschrift 'Golgi' viel daar achter de ondertitel (het Golgi-label bovenaan blijft)
        let g = '', kn = '', fx = '';
        // enzymen in het lysosoom (verdwijnen bij I-cel; bij Pompe blijven ze, op één na)
        LENZ.forEach(([x, y], i) => {
          const op = (1 - icell * .85) * (i === 2 ? 1 - kPompe : 1);
          g += enzyme(x, y, { tag: 0, op, seed: 10 + i });     // lysosomale enzymen houden hun suikers; enkel het fosfaat is eraf
        });
        if (step >= 5) g += enzyme(ARR[0], ARR[1], { tag: 0, op: 1 - icell * .85 });   // het in stap 5 afgeleverde enzym
        // brokken: in stap 5 in stukjes geknipt; bij I-cel en Pompe hopen ze (of glycogeen) zich op
        CHUNK.forEach(([x, y, r], i) => {
          const cut = kWork, full = 1 - cut;
          if (full > .01) g += eiwit(x, y, r * 1.15, r, DEBRIS, { seed: CHUNK[i][3], op: .9 * full, bumps: .2 });
          if (cut > .01 && icell < .99) for (let k = 0; k < 4; k++) g += `<circle cx="${f1(x + Math.cos(k * 1.57 + i) * r * cut)}" cy="${f1(y + Math.sin(k * 1.57 + i) * r * cut)}" r="5" fill="${BB}" opacity="${f1(cut * (1 - icell))}"/>`;
          if (icell > .01) g += eiwit(x, y, r * 1.15 * (1 + .5 * icell), r * (1 + .5 * icell), DEBRIS, { seed: CHUNK[i][3], op: .9 * icell, bumps: .2 });
        });
        if (kPompe > .01) for (let i = 0; i < 14; i++) {
          const a = i * 2.4, rr = 30 + (i % 5) * 26, x = LY[0] + Math.cos(a) * rr, y = LY[1] + 20 + Math.sin(a) * rr * .8;
          g += `<g opacity="${f1(kPompe)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="13" fill="${GLYC}" opacity=".85"/><circle cx="${f1(x + 9)}" cy="${f1(y - 7)}" r="8" fill="${GLYC}" opacity=".85"/></g>`;
        }
        const yLab = LY[1] + LR - 60;
        if (step === 4) fx += T(LY[0], yLab, T2('bouwstenen', 'building blocks'), { size: 24, col: BB, op: ease(sub(p, .78, .9)) });
        if (kPompe > .3) fx += T(LY[0], yLab, T2('glycogeen hoopt op', 'glycogen piles up'), { size: 24, col: GLYC, op: kPompe });

        // ---- de reis van één enzym (stappen 2–5), altijd binnen een membraan ----
        if (step === 1) {
          g += enzyme(CISP[0], CISP[1], { tag: kTag });
          const k = ease(sub(p, .45, .75));
          fx += `<line x1="${CISP[0] + 10}" y1="232" x2="${CISP[0] + 10}" y2="352" stroke="${PH}" stroke-width="2" stroke-dasharray="5 5" opacity="${f1(k)}"/>` +
            T(CISP[0], 222, T2('label erop', 'tag added'), { size: 26, col: PH, op: k });
        }
        if (step === 2) {
          // het enzym schuift door de stapel (cis → trans), de ontvanger zit in de trans-kap; dan knopt het blaasje af
          const u = sub(p, 0, .3) * 3, kRec = ease(sub(p, .2, .45)), kGrab = ease(sub(p, .35, .5)), kBud = ease(sub(p, .5, .95));
          CISW.slice(0, 3).forEach((q, j) => { const o = Math.max(0, 1 - Math.abs(u - j)); if (o > .01) g += enzyme(q[0], q[1], { op: o }); });
          const b = knop(RC, UP, VR, kBud, HOLE.golgi);
          kn += b.svg;
          const rp = kBud > 0 ? b.top : RC;
          g += rec(rp[0], rp[1], kRec);
          g += enzyme(...add(rp, [RE[0], RE[1] + 12 * (1 - kGrab)]), { op: Math.max(0, Math.min(1, u - 2)) });
        }
        if (step === 3) {
          const kGo = ease(sub(p, 0, .28)), kFuse = ease(sub(p, .28, .45)), kAcid = ease(sub(p, .38, .5)), kRel = ease(sub(p, .45, .58));
          const kOut = ease(sub(p, .55, .7)), kBack = ease(sub(p, .7, .84)), kIn = ease(sub(p, .84, .95));
          let rp;
          // heen: het blaasje reist naar het endosoom en versmelt (knop in omgekeerde richting); de ontvanger blijft in het membraan
          if (kFuse <= 0) { const c = bow(V1, VE, kGo, 40); kn += ves(c, VR); rp = add(c, [0, -VR]); }
          else { const b = knop(ERC, UP, VR, 1 - kFuse, HOLE.endo); kn += b.svg; rp = b.top; }
          const bound = add(rp, RE);
          // terug: een nieuw blaasje knopt af van het endosoom, reist terug en versmelt met de trans-kap
          if (kOut > 0 && kBack <= 0) { const b = knop(ERC, UP, SR, kOut, HOLE.endo); kn += b.svg; rp = b.top; }
          else if (kBack > 0 && kIn <= 0) { const c = bow(SV0, SV1, kBack, 80); kn += ves(c, SR); rp = add(c, [0, -SR]); }
          else if (kIn > 0) { const b = knop(RC, UP, SR, 1 - kIn, HOLE.golgi); kn += b.svg; rp = b.top; }
          g += rec(rp[0], rp[1]);
          g += enzyme(...mix(kRel > 0 ? add(ERC, RE) : bound, EREL, kRel));
          fx += T(EN[0] + ER0 + 10, 615, T2('zuurder', 'more acidic'), { size: 24, col: PUMP, op: kAcid, anchor: 'start' });
          fx += T(560, 462, T2('ontvanger keert terug', 'receiver returns'), { size: 24, col: REC, anchor: 'start', op: ease(sub(p, .65, .72)) * (1 - ease(sub(p, .86, .93))) });
        }
        if (step >= 4) g += rec(RC[0], RC[1]);                          // de ontvanger is terug in het trans-Golgi
        if (step === 4) {
          const kB = ease(sub(p, .05, .3)), kG = ease(sub(p, .3, .45)), kF = ease(sub(p, .45, .6)), kIn = ease(sub(p, .53, .68)), kDeP = ease(sub(p, .58, .68));
          let c;
          if (p < .3) { const b = knop(ME, NE, CR, kB, HOLE.endo); kn += b.svg; c = b.c; }
          else if (kF <= 0) { c = mix(C1, C2, kG); kn += ves(c, CR); }
          else { const b = knop(ML, NL, CR, 1 - kF, HOLE.lyso); kn += b.svg; c = b.c; }
          const inV = add(c, [0, 14]);
          const ep = p < .3 ? mix(EREL, inV, Math.min(1, kB / .7)) : mix(inV, ARR, kIn);
          g += enzyme(...ep, { tag: 1 - kDeP });
          fx += T(EN[0] + ER0 + 10, 615, T2('zuurder', 'more acidic'), { size: 24, col: PUMP, op: 1 - ease(sub(p, 0, .15)), anchor: 'start' });
          fx += T(ARR[0], ARR[1] + 48, T2('fosfaat eraf', 'phosphate removed'), { size: 22, col: PH, op: ease(sub(p, .58, .66)) * (1 - ease(sub(p, .74, .8))) });
        }
        // I-cel: enzymen zonder label knoppen af in secretieblaasjes, die met het celmembraan versmelten (exocytose)
        if (sec > .01) {
          for (let i = 0; i < 3; i++) {
            const u = step === 5 ? ease(sub(p, .05 + i * .12, .7 + i * .12)) : 1;
            let c, ep;
            if (u < .15) { const b = knop(MS, NS, CR, u / .15, HOLE.golgi, sec); kn += b.svg; c = b.c; ep = mix(WAIT[i], add(c, [0, 14]), Math.min(1, u / .15 / .7)); }
            else if (u < .8) { c = pl(SEC, (u - .15) / .65); kn += ves(c, CR, sec); ep = add(c, [0, 14]); }
            else {
              const b = knop(MP, NP, CR, 1 - sub(u, .8, .9), HOLE.out, sec); kn += b.svg; c = b.c;
              ep = mix(mix(add(c, [0, 14]), [1566, MP[1] + 14], sub(u, .84, .94)), [1583 - 6 * (i % 2), 250 + i * 115], sub(u, .93, 1));   // los in de ruimte buiten de cel, niet tegen het membraan
            }
            g += enzyme(...ep, { tag: 0, op: sec });
          }
          fx += T(900, 198, T2('geen label → naar buiten de cel', 'no tag → out of the cell'), { size: 24, col: PH, op: sec });
          fx += T(LY[0], yLab, T2('afval hoopt op', 'waste piles up'), { size: 24, col: DEBRIS, op: icell });
        }
        $('ly-in').innerHTML = kn + g; $('ly-fx').innerHTML = fx;
      },
    };
  },
};
