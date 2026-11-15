import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T, TL } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, btn } from './_fate.js';
import { blaasje, cisterne, membraanPts, ptsBoog, hydrolase, m6pReceptor, vATPase, eiwit, bioDefs } from '../../bio.js';

/*
 * Lysosoom: in het (cis-)Golgi krijgen zure knipenzymen een suikerlabel (mannose-6-fosfaat); een ontvanger (M6P-receptor)
 * in het membraan van het trans-Golgi grijpt het label en snoert met het enzym af in een klein blaasje naar het endosoom.
 * Daar (zuurder, V-ATPase) laat hij los en keert terug; een blaasje brengt het enzym naar het zure lysosoom (pH 4,5–5),
 * waar het fosfaat er meteen af gaat (ACP2/ACP5, Hirn 2025). Een lumenaal enzym zit altijd in een membraan: het komt nooit
 * los in het cytosol. Ziekte: zonder label (mucolipidose II, I-celziekte) gaan de enzymen in secretieblaasjes naar het
 * celmembraan en worden ze uitgescheiden (exocytose); bij Pompe ontbreekt één enzym.
 */
const L3 = (nl, en) => ({ nl, en });
const ENZ = C.prot, SUG = '#00A651', PH = DEST.lyso, REC = '#ffc247', ENDO = '#ff8a3d', PUMP = '#5fd3e6';
const LY = [1180, 400], LR = 190, EN = [800, 580], ER0 = 105, PMX = 1520;
const DEBRIS = '#8a93a8', GLYC = '#9cc0ff';
const ES = .5;                                  // grootte van het enzym (zodat het met label in het Golgi-lumen past)
/* Golgi: 4 cisternen, cis links, trans rechts (x = midden van de uiteinden) */
const GX = i => 250 + i * 92, GLEN = i => 330 - Math.abs(i - 1.5) * 30;
const CISP = [217, 400];                        // enzym in het lumen van de cis-cisterne
const RC = [516, 244];                          // ontvanger in de bovenste kap van de trans-cisterne (kop naar het lumen)
const RE = [-10, 75];                           // enzym t.o.v. de ontvanger: het label zit net onder de groeve van de kop
const VR = 48, V0 = [RC[0] - 8, RC[1] + VR], V1 = [600, 215];          // receptorblaasje: in de kap → afgesnoerd
const ERC = [EN[0], EN[1] - ER0], VE = [ERC[0] - 8, ERC[1] - VR + 12]; // ontvanger bovenaan het endosoom; blaasje dat versmelt
const EREL = [830, 590];                        // losgelaten enzym in het endosoom
const SR = 30, SV0 = [ERC[0] - 8, ERC[1] - 30], SV1 = [RC[0] - 8, RC[1] - 19];   // terugkeerblaasje van de ontvanger
const CR = 36, C0 = [EREL[0], EREL[1] - 14], C1 = [950, 600], C2 = [1054, 573];   // tussen twee protonpompen door  // blaasje endosoom → lysosoom
const ARR = [1240, 480];                        // het afgeleverde enzym in het lysosoom
const SEC = [[492, 386], [610, 330], [640, 132], [PMX - 23, 132]];     // I-cel: secretieblaasje Golgi → celmembraan (boven het lysosoom)

const enzyme = (x, y, { tag = 1, s = ES, op = 1, sugar = true, seed = 5 } = {}) => hydrolase(x, y, { tag, s, op, glycaan: sugar, seed });
const rec = (x, y, op = 1) => m6pReceptor(x, y, { dir: 1, mw: 9, s: .5, op });
const ves = (c, r, op) => blaasje(c[0], c[1], r, { op, w: 10, lumen: 'rgba(201,165,116,.10)' });
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
    [REC, L3('ontvanger (M6P-receptor)', 'receiver (M6P receptor)')], [PUMP, L3('protonpomp (V-ATPase)', 'proton pump (V-ATPase)')], [C.mem, 'Golgi'], [ENDO, L3('endosoom', 'endosome')], [DEST.lyso, L3('lysosoom', 'lysosome')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het label wordt in twee stappen gemaakt (eerst een fosfaat met een afdekgroep, die daarna verwijderd wordt); hier is dat één stap. Het enzym springt hier van de cis- naar de trans-cisterne; in werkelijkheid schuift het door de stapel. Het endosoom rijpt in werkelijkheid geleidelijk tot lysosoom; hier brengt één blaasje het enzym over. Niet elk lysosomaal eiwit gebruikt dit label: er bestaan ook andere ontvangers.',
    en: 'Schematic and not to scale. The tag is made in two steps (first a phosphate with a capping group, which is then removed); here that is one step. Here the enzyme jumps from the cis to the trans cisterna; in reality it moves through the stack. In reality the endosome gradually matures into a lysosome; here a single vesicle carries the enzyme across. Not every lysosomal protein uses this tag: other receivers also exist.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Het lysosoom breekt grote moleculen af', 'The lysosome breaks down large molecules'),
      text: L3('Een lysosoom is een blaasje vol knipenzymen. Binnen is het zuur: pH ongeveer 4,5 tot 5.', 'A lysosome is a vesicle full of cutting enzymes. Inside it is acidic: pH about 4.5 to 5.') },
    { dur: 8000, cam: cam(500, 370, 840), title: L3('Het enzym krijgt een label in het Golgi', 'The enzyme gets a tag in the Golgi'),
      text: L3('Aan de cis-kant van het Golgi komt een fosfaatgroepje op een suiker van het enzym. Dat suikerlabel is het adres van het lysosoom.', 'On the cis side of the Golgi a small phosphate group is put on one of the enzyme’s sugars. That sugar tag is the lysosome’s address.') },
    { dur: 8000, cam: cam(500, 370, 840), title: L3('Een ontvanger grijpt het label', 'A receiver grabs the tag'),
      text: L3('Een ontvanger in het membraan van het trans-Golgi grijpt het label. Samen snoeren ze af in een klein blaasje.', 'A receiver in the membrane of the trans-Golgi grabs the tag. Together they pinch off in a small vesicle.') },
    { dur: 9000, cam: cam(730, 440, 1060), title: L3('Afgeleverd, en de ontvanger keert terug', 'Delivered, and the receiver returns'),
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
    for (let i = 0; i < 4; i++) golgi += cisterne(GX(i), 400, { len: GLEN(i), dik: 56, buig: 34, w: 9 });
    return svgOpen(bioDefs) + `
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi', 'Golgi')}">${golgi}<circle data-anchor="golgi" cx="380" cy="200" r="1" fill="none"/></g>
    ${T(GX(0), 600, 'cis', { size: 22, col: C.muted })}${T(GX(3), 600, 'trans', { size: 22, col: C.muted })}${arrow(GX(0) + 26, 593, GX(3) - 34, 593, C.muted, 2)}
    ${T(394, 655, 'Golgi', { size: 28, col: C.mem })}
    <g data-node="endocytose" data-color="${ENDO}" data-nolabel>${blaasje(EN[0], EN[1], ER0, { lumen: 'rgba(255,138,61,.13)', rand: ENDO, w: 12 })}</g>
    ${T(EN[0], EN[1] + ER0 + 29, T2('endosoom', 'endosome'), { size: 24, col: ENDO })}
    <g id="ly-epump"></g>
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
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('golgi', 400, 300, T2('← het Golgi', '← the Golgi'), C.mem)}
    ${btn('kernimport', 1150, 410, T2('volgende: naar de kern →', 'next: into the nucleus →'), C.dna)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
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
        let g = '', fx = '';
        // enzymen in het lysosoom (verdwijnen bij I-cel; bij Pompe blijven ze, op één na)
        LENZ.forEach(([x, y], i) => {
          const op = (1 - icell * .85) * (i === 2 ? 1 - kPompe : 1);
          g += enzyme(x, y, { sugar: false, op, seed: 10 + i });
        });
        if (step >= 5) g += enzyme(ARR[0], ARR[1], { tag: 0, op: 1 - icell * .85 });   // het in stap 5 afgeleverde enzym
        // brokken: in stap 5 in stukjes geknipt; bij I-cel en Pompe hopen ze (of glycogeen) zich op
        CHUNK.forEach(([x, y, r], i) => {
          const cut = kWork, full = 1 - cut;
          if (full > .01) g += eiwit(x, y, r * 1.15, r, DEBRIS, { seed: CHUNK[i][3], op: .9 * full, bumps: .2 });
          if (cut > .01 && icell < .99) for (let k = 0; k < 4; k++) g += `<circle cx="${f1(x + Math.cos(k * 1.57 + i) * r * cut)}" cy="${f1(y + Math.sin(k * 1.57 + i) * r * cut)}" r="5" fill="${C.chain}" opacity="${f1(cut * (1 - icell))}"/>`;
          if (icell > .01) g += eiwit(x, y, r * 1.15 * (1 + .5 * icell), r * (1 + .5 * icell), DEBRIS, { seed: CHUNK[i][3], op: .9 * icell, bumps: .2 });
        });
        if (kPompe > .01) for (let i = 0; i < 14; i++) {
          const a = i * 2.4, rr = 30 + (i % 5) * 26, x = LY[0] + Math.cos(a) * rr, y = LY[1] + 20 + Math.sin(a) * rr * .8;
          g += `<g opacity="${f1(kPompe)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="13" fill="${GLYC}" opacity=".85"/><circle cx="${f1(x + 9)}" cy="${f1(y - 7)}" r="8" fill="${GLYC}" opacity=".85"/></g>`;
        }
        const yLab = LY[1] + LR - 60;
        if (step === 4) fx += T(LY[0], yLab, T2('bouwstenen', 'building blocks'), { size: 24, col: C.chain, op: ease(sub(p, .78, .9)) });
        if (kPompe > .3) fx += T(LY[0], yLab, T2('glycogeen hoopt op', 'glycogen piles up'), { size: 24, col: GLYC, op: kPompe });

        // ---- de reis van één enzym (stappen 2–5), altijd binnen een membraan ----
        if (step === 1) {
          g += enzyme(CISP[0], CISP[1], { tag: kTag });
          const k = ease(sub(p, .45, .75));
          fx += `<line x1="${CISP[0] + 10}" y1="232" x2="${CISP[0] + 10}" y2="352" stroke="${PH}" stroke-width="2" stroke-dasharray="5 5" opacity="${f1(k)}"/>` +
            T(CISP[0], 222, T2('label erop', 'tag added'), { size: 26, col: PH, op: k });
        }
        if (step === 2) {
          const kX = ease(sub(p, 0, .3)), kRec = ease(sub(p, .2, .45)), kGrab = ease(sub(p, .35, .5)), kBud = ease(sub(p, .55, .95));
          if (kX < .99) g += enzyme(CISP[0], CISP[1], { op: 1 - kX });
          const vc = mix(V0, V1, kBud);
          g += ves(vc, VR, kBud);
          g += rec(...add(vc, [8, -VR]), kRec);
          g += enzyme(...add(add(vc, [8, -VR]), [RE[0], RE[1] + 12 * (1 - kGrab)]), { op: kX });
        }
        if (step === 3) {
          const kGo = ease(sub(p, 0, .3)), kFuse = ease(sub(p, .3, .42)), kAcid = ease(sub(p, .38, .5)), kRel = ease(sub(p, .45, .6));
          const kOut = ease(sub(p, .55, .65)), kBack = ease(sub(p, .62, .85)), kIn = ease(sub(p, .85, .95));
          const vc = bow(V1, VE, kGo, 40);
          g += ves(vc, VR, 1 - kFuse);
          // ontvanger: in het blaasjesmembraan → in het endosoommembraan → in een eigen blaasje terug → weer in het trans-Golgi
          const sv = bow(SV0, SV1, kBack, 80);
          let r = mix(add(vc, [8, -VR]), ERC, kFuse);
          if (kOut > 0) r = mix(ERC, add(sv, [8, -SR]), kOut);
          if (kIn > 0) r = mix(add(SV1, [8, -SR]), RC, kIn);
          g += ves(sv, SR, kOut * (1 - kIn)) + rec(r[0], r[1]);
          const bound = add(mix(add(vc, [8, -VR]), ERC, kFuse), RE);
          g += enzyme(...mix(bound, EREL, kRel));
          fx += T(EN[0] + ER0 + 10, 615, T2('zuurder', 'more acidic'), { size: 24, col: PUMP, op: kAcid, anchor: 'start' });
          fx += T(640, 420, T2('ontvanger keert terug', 'receiver returns'), { size: 24, col: REC, op: ease(sub(p, .6, .7)) * (1 - ease(sub(p, .85, .93))) });
        }
        if (step >= 4) g += rec(RC[0], RC[1]);                          // de ontvanger is terug in het trans-Golgi
        if (step === 4) {
          const kB = ease(sub(p, .05, .3)), kG = ease(sub(p, .3, .45)), kF = ease(sub(p, .45, .55)), kIn = ease(sub(p, .45, .6)), kDeP = ease(sub(p, .5, .62));
          const c = p < .3 ? mix(C0, C1, kB) : mix(C1, C2, kG);
          g += ves(c, CR, kB * (1 - kF));
          g += enzyme(...mix(add(c, [0, 14]), ARR, kIn), { tag: 1 - kDeP });
          fx += T(EN[0] + ER0 + 10, 615, T2('zuurder', 'more acidic'), { size: 24, col: PUMP, op: 1 - ease(sub(p, 0, .15)), anchor: 'start' });
          fx += T(ARR[0], ARR[1] + 48, T2('fosfaat eraf', 'phosphate removed'), { size: 22, col: PH, op: ease(sub(p, .5, .6)) * (1 - ease(sub(p, .7, .78))) });
        }
        // I-cel: enzymen zonder label gaan in secretieblaasjes naar het celmembraan en worden uitgescheiden (exocytose)
        if (sec > .01) {
          for (let i = 0; i < 3; i++) {
            const u = step === 5 ? ease(sub(p, .05 + i * .12, .7 + i * .12)) : 1;
            const c = pl(SEC, Math.min(1, u / .8));
            g += ves(c, CR, Math.min(1, u / .08) * (1 - sub(u, .8, .88)) * sec);
            const out = mix(mix(add(c, [0, 14]), [1566, SEC[3][1] + 14], sub(u, .8, .9)), [1566, 250 + i * 115], sub(u, .88, 1));
            g += enzyme(...out, { tag: 0, op: sec });
          }
          fx += T(900, 198, T2('geen label → naar buiten de cel', 'no tag → out of the cell'), { size: 24, col: PH, op: sec });
          fx += T(LY[0], yLab, T2('afval hoopt op', 'waste piles up'), { size: 24, col: DEBRIS, op: icell });
        }
        $('ly-in').innerHTML = g; $('ly-fx').innerHTML = fx;
      },
    };
  },
};
