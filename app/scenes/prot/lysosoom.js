import { C, T2, svgOpen, FULL, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, btn } from './_fate.js';

/*
 * Lysosoom: in het Golgi krijgen zure knipenzymen een suikerlabel (mannose-6-fosfaat); een ontvanger (M6P-receptor)
 * brengt ze in een blaasje naar het endosoom en keert terug; in het zure lysosoom (pH 4,5–5) werken ze.
 * Ziekte: zonder label (mucolipidose II, I-celziekte) worden de enzymen uitgescheiden; bij Pompe ontbreekt één enzym.
 */
const L3 = (nl, en) => ({ nl, en });
const ENZ = C.prot, SUG = '#00A651', PH = DEST.lyso, REC = '#ffc247', ENDO = '#ff8a3d';
const LY = [1180, 400], LR = 190, EN = [850, 650], GOL = [400, 400], TRANS = [590, 420], PMX = 1520;
const DEBRIS = '#8a93a8', GLYC = '#9cc0ff';

/* enzym met suikerboom; tag = fosfaat op de suiker; op = zichtbaarheid */
function enzyme(x, y, { tag = 1, s = 1, op = 1, sugar = true } = {}) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><ellipse rx="30" ry="22" fill="${ENZ}" fill-opacity=".5" stroke="${ENZ}" stroke-width="3"/>` +
    (sugar ? `<line x1="0" y1="-22" x2="0" y2="-40" stroke="#c9d2e4" stroke-width="3"/><rect x="-8" y="-55" width="16" height="16" rx="3" fill="${SUG}"/>` +
      (tag > .01 ? `<g opacity="${f1(tag)}"><circle cx="18" cy="-62" r="15" fill="${PH}"/><text x="18" y="-54.5" font-size="22" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">P</text></g>` : '') : '') + '</g>';
}
/* ontvanger in een membraan: Y-vorm met staart naar beneden */
const receptor = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}"><path d="M${f1(x)},${f1(y + 40)} L${f1(x)},${f1(y)} M${f1(x)},${f1(y)} L${f1(x - 14)},${f1(y - 22)} M${f1(x)},${f1(y)} L${f1(x + 14)},${f1(y - 22)}" stroke="${REC}" stroke-width="7" stroke-linecap="round" fill="none"/></g>`;
const R0 = rng(7), CHUNK = Array.from({ length: 7 }, () => [LY[0] + (R0() - .5) * 220, LY[1] + (R0() - .5) * 200, 16 + R0() * 12]);
const LENZ = [[-90, -70], [70, -90], [110, 30], [-40, 90], [-120, 40]].map(([dx, dy]) => [LY[0] + dx, LY[1] + dy]);

export default {
  id: 'lysosoom',
  title: { nl: 'Een suikerlabel stuurt enzymen naar het lysosoom', en: 'A sugar tag sends enzymes to the lysosome' },
  scale: { nl: '≈ 2 µm (lysosoom ≈ 0,5 µm, schematisch)', en: '≈ 2 µm (lysosome ≈ 0.5 µm, schematic)' },
  time: { nl: 'schematisch', en: 'schematic' },
  org: { nl: 'mens', en: 'human' },
  legend: [[ENZ, L3('knipenzym (zure hydrolase)', 'cutting enzyme (acid hydrolase)')], [SUG, L3('suiker (mannose)', 'sugar (mannose)')], [PH, L3('fosfaat: het label (mannose-6-fosfaat)', 'phosphate: the tag (mannose 6-phosphate)')],
    [REC, L3('ontvanger (M6P-receptor)', 'receiver (M6P receptor)')], [C.mem, 'Golgi'], [ENDO, L3('endosoom', 'endosome')], [DEST.lyso, L3('lysosoom', 'lysosome')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het label wordt in twee stappen gemaakt (eerst een fosfaat met een afdekgroep, die daarna verwijderd wordt); hier is dat één stap. Het endosoom rijpt in werkelijkheid geleidelijk tot lysosoom. Niet elk lysosomaal eiwit gebruikt dit label: er bestaan ook andere ontvangers.',
    en: 'Schematic and not to scale. The tag is made in two steps (first a phosphate with a capping group, which is then removed); here that is one step. In reality the endosome gradually matures into a lysosome. Not every lysosomal protein uses this tag: other receivers also exist.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Het lysosoom breekt grote moleculen af', 'The lysosome breaks down large molecules'),
      text: L3('Een lysosoom is een blaasje vol knipenzymen. Binnen is het zuur: pH ongeveer 4,5 tot 5.', 'A lysosome is a vesicle full of cutting enzymes. Inside it is acidic: pH about 4.5 to 5.') },
    { dur: 8000, cam: FULL, title: L3('Het enzym krijgt een label in het Golgi', 'The enzyme gets a tag in the Golgi'),
      text: L3('Op een suiker van het enzym komt een fosfaatgroepje. Dat suikerlabel is het adres van het lysosoom.', 'A small phosphate group is put on one of the enzyme’s sugars. That sugar tag is the lysosome’s address.') },
    { dur: 8000, cam: FULL, title: L3('Een ontvanger grijpt het label', 'A receiver grabs the tag'),
      text: L3('Een ontvanger in het Golgi-membraan herkent het label. Samen gaan ze in een blaasje.', 'A receiver in the Golgi membrane recognises the tag. Together they go into a vesicle.') },
    { dur: 9000, cam: FULL, title: L3('Afgeleverd, en de ontvanger keert terug', 'Delivered, and the receiver returns'),
      text: L3('Het blaasje versmelt met een endosoom. Daar laat de ontvanger los en keert terug naar het Golgi.', 'The vesicle fuses with an endosome. There the receiver lets go and returns to the Golgi.') },
    { dur: 8000, cam: FULL, title: L3('In het zuur gaan de enzymen aan het werk', 'In the acid the enzymes get to work'),
      text: L3('Het zuur zet de enzymen aan. Ze knippen grote moleculen in bouwstenen die de cel opnieuw gebruikt.', 'The acid switches the enzymes on. They cut large molecules into building blocks the cell reuses.') },
    { dur: 9000, cam: FULL, title: L3('Zonder label raken de enzymen kwijt', 'Without the tag the enzymes get lost'),
      text: L3('Bij I-celziekte ontbreekt het label. De enzymen belanden buiten de cel en het lysosoom raakt vol afval.', 'In I-cell disease the tag is missing. The enzymes end up outside the cell and the lysosome fills with waste.') },
    { dur: 9000, cam: FULL, title: L3('Eén enzym kwijt: de ziekte van Pompe', 'One enzyme missing: Pompe disease'),
      text: L3('Soms ontbreekt maar één enzym. Bij de ziekte van Pompe blijft een opslagsuiker (glycogeen) in het lysosoom liggen.', 'Sometimes only one enzyme is missing. In Pompe disease a storage sugar (glycogen) stays behind in the lysosome.') },
  ],
  svg() {
    let golgi = '';
    for (let i = 0; i < 4; i++) { const x = 300 + i * 62; golgi += `<path d="M${x + 20},230 Q${x - 40},400 ${x + 20},570" stroke="${C.mem}" stroke-width="30" fill="none" stroke-linecap="round" opacity=".5"/>`; }
    return svgOpen() + `
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi', 'Golgi')}">${golgi}<circle data-anchor="golgi" cx="380" cy="200" r="1" fill="none"/></g>
    ${T(380, 640, 'Golgi', { size: 28, col: C.mem })}
    <g data-node="endocytose" data-color="${ENDO}" data-nolabel><circle cx="${EN[0]}" cy="${EN[1]}" r="70" fill="rgba(255,138,61,.12)" stroke="${ENDO}" stroke-width="3"/></g>
    ${T(EN[0], EN[1] + 110, T2('endosoom', 'endosome'), { size: 26, col: ENDO })}
    <g data-node="autofagie" data-color="${DEST.lyso}" data-label="${T2('Ook grote stukken: autofagie', 'Large pieces too: autophagy')}">
      <circle id="ly-body" cx="${LY[0]}" cy="${LY[1]}" r="${LR}" fill="rgba(255,107,107,.12)" stroke="${DEST.lyso}" stroke-width="4"/>
      <circle data-anchor="autofagie" data-pos="below" cx="${LY[0]}" cy="${LY[1] + LR + 70}" r="1" fill="none"/></g>
    ${T(LY[0], LY[1] + LR + 44, T2('lysosoom', 'lysosome'), { size: 30, col: DEST.lyso, w: 700 })}
    <g id="ly-ph"></g>
    <path d="M${PMX},120 Q${PMX + 30},450 ${PMX},780" stroke="${C.mem}" stroke-width="14" fill="none" opacity=".55"/>
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
        const kTag = ph(1, .2, .6), kRec = ph(2, .05, .35), kBud = ph(2, .4, .9), kGo = ph(3, .0, .45), kFuse = ph(3, .45, .6), kBack = ph(3, .55, 1), kWork = ph(4, .1, .9);
        const kIcell = step === 5 ? ease(sub(p, .05, .9)) : 0, kPompe = step === 6 ? ease(sub(p, .1, .9)) : 0, kX6 = step === 6 ? 1 - ease(sub(p, 0, .3)) : 0;
        const icell = Math.max(kIcell, kX6);       // stap 6 begint waar stap 5 eindigde en vloeit dan terug naar gewoon
        // pH-label
        $('ly-ph').innerHTML = T(LY[0], LY[1] - LR - 30, T2('pH ≈ 4,5–5 (zuur)', 'pH ≈ 4.5–5 (acidic)'), { size: 28, col: C.text, op: kIntro });
        let g = '', fx = '';
        // enzymen in het lysosoom (verdwijnen bij I-cel; bij Pompe blijven ze, op één na)
        LENZ.forEach(([x, y], i) => {
          const op = (1 - icell * .85) * (i === 2 ? 1 - kPompe : 1);
          g += enzyme(x, y, { s: .9, sugar: false, op });
        });
        // brokken: in stap 4 in stukjes geknipt; bij I-cel en Pompe hopen ze (of glycogeen) zich op
        CHUNK.forEach(([x, y, r], i) => {
          const cut = kWork, full = 1 - cut;
          if (full > .01) g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${DEBRIS}" opacity="${f1(.8 * full)}"/>`;
          if (cut > .01 && icell < .99) for (let k = 0; k < 4; k++) g += `<circle cx="${f1(x + Math.cos(k * 1.57 + i) * r * cut)}" cy="${f1(y + Math.sin(k * 1.57 + i) * r * cut)}" r="5" fill="${C.chain}" opacity="${f1(cut * (1 - icell))}"/>`;
          if (icell > .01) g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * (1 + .5 * icell))}" fill="${DEBRIS}" opacity="${f1(.85 * icell)}"/>`;
        });
        if (kPompe > .01) for (let i = 0; i < 14; i++) {
          const a = i * 2.4, rr = 30 + (i % 5) * 26, x = LY[0] + Math.cos(a) * rr, y = LY[1] + 20 + Math.sin(a) * rr * .8;
          g += `<g opacity="${f1(kPompe)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="13" fill="${GLYC}" opacity=".85"/><circle cx="${f1(x + 9)}" cy="${f1(y - 7)}" r="8" fill="${GLYC}" opacity=".85"/></g>`;
        }
        if (step === 4) fx += T(LY[0], LY[1] + LR - 30, T2('bouwstenen', 'building blocks'), { size: 24, col: C.chain, op: ease(sub(p, .6, .85)) });
        if (kPompe > .3) fx += T(LY[0], LY[1] + LR - 30, T2('glycogeen hoopt op', 'glycogen piles up'), { size: 24, col: GLYC, op: kPompe });
        // het reizende enzym (stappen 1–4)
        if (step >= 1 && step <= 4 && kIcell === 0) {
          let ex = GOL[0], ey = GOL[1];
          if (step >= 2) { ex = lerp(GOL[0], TRANS[0] + 20, kRec); ey = lerp(GOL[1], TRANS[1], kRec); }
          const vx0 = TRANS[0] + 20, vy0 = TRANS[1];
          if (step >= 3) {
            const u = kGo; ex = lerp(vx0, EN[0], u); ey = lerp(vy0, EN[1] - 10, u) - Math.sin(u * Math.PI) * 120;
            if (kFuse > 0) { const w = ease(sub(p, .6, .95)); ex = lerp(EN[0], LENZ[2][0] - 40, step > 3 ? 1 : w); ey = lerp(EN[1] - 10, LENZ[2][1] + 60, step > 3 ? 1 : w); }
          }
          const vis = step === 4 ? 1 - ease(sub(p, 0, .3)) : 1;
          g += enzyme(ex, ey, { tag: kTag, op: vis });
          if (step === 1) fx += T(GOL[0] + 120, GOL[1] - 90, T2('label erop', 'tag added'), { size: 26, col: PH, op: ease(sub(p, .45, .75)), anchor: 'start' });
          // ontvanger + blaasje
          if (step >= 2) {
            const rOp = step === 2 ? kRec : 1;
            let rx = ex + 16, ry = ey - 112;
            if (step >= 3 && kBack > 0) { rx = lerp(EN[0], TRANS[0] + 36, kBack); ry = lerp(EN[1] - 120, TRANS[1] - 112, kBack) - Math.sin(kBack * Math.PI) * 100; }
            g += `<g transform="rotate(180 ${f1(rx)} ${f1(ry + 40)})">${receptor(rx, ry + 40, rOp * (step === 4 ? 1 - ease(sub(p, 0, .3)) : 1))}</g>`;
            const vr = 70, vOp = (step === 2 ? kBud : 1) * (1 - kFuse);
            if (vOp > .01) g += `<circle cx="${f1(ex + 8)}" cy="${f1(ey - 36)}" r="${vr}" fill="none" stroke="${C.mem}" stroke-width="6" opacity="${f1(vOp * .8)}"/>`;
            if (step === 3) fx += T(lerp(EN[0], TRANS[0], .5), EN[1] - 210, T2('ontvanger keert terug', 'receiver returns'), { size: 24, col: REC, op: ease(sub(p, .6, .8)) * (1 - ease(sub(p, .92, 1))) });
          }
        }
        // I-cel: enzymen zonder label lopen het Golgi uit naar buiten de cel
        if (icell > .01) {
          for (let i = 0; i < 4; i++) {
            const u = step === 5 ? ease(sub(p, .1 + i * .12, .55 + i * .12)) : 1;
            g += enzyme(lerp(TRANS[0], PMX + 50, u), 200 + i * 130 + Math.sin(u * 3 + i) * 20, { tag: 0, s: .8, op: icell });
          }
          fx += arrow(TRANS[0] + 60, 150, PMX + 40, 150, PH, 4, icell) + T((TRANS[0] + PMX) / 2, 136, T2('geen label → naar buiten de cel', 'no tag → out of the cell'), { size: 26, col: PH, op: icell });
          fx += T(LY[0], LY[1] + LR - 30, T2('afval hoopt op', 'waste piles up'), { size: 24, col: DEBRIS, op: icell });
        }
        $('ly-in').innerHTML = g; $('ly-fx').innerHTML = fx;
      },
    };
  },
};
