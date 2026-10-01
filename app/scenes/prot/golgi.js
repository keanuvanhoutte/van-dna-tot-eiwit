import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, FULL } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, sugar } from './_b_kit.js';

/* Eén doorsnede van een secretoire cel: ER (links) → ERGIC → Golgi (cis → trans) → TGN → plasmamembraan (rechts), endosoom/lysosoom onderaan */
const X0 = 690, SPC = 88, GY = 440, GH = 180;       // Golgi: x van de cis-cisterne, afstand, middelpunt, halve hoogte
const EXIT = [380, 450], ERGIC = [535, 450], TGN = [X0 + 4 * SPC + 10, 440];
const PMX = 1470;
const ENDO = [1160, 700], LYSO = [1360, 700];
const COPII = '#ffb27a', COPI = '#5fd3e6', CLATH = '#e8edf7', CARGO = C.chain, GRAN = '#f06bc0';

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* deterministische vesikelbeweging langs een pad (kwadratische Bézier) */
const qb = (a, c, b, u) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];

export default {
  id: 'golgi',
  title: { nl: 'Golgi & secretie', en: 'Golgi & secretory pathway' },
  scale: { nl: '≈ 1–5 µm (Golgi-stapel ≈ 1 µm)', en: '≈ 1–5 µm (Golgi stack ≈ 1 µm)' },
  time: { nl: 'ER → plasmamembraan: typisch tientallen minuten', en: 'ER → plasma membrane: typically tens of minutes' },
  org: { nl: 'mens (secretoire cel)', en: 'human (secretory cell)' },
  legend: [[C.mem, { nl: 'ER, Golgi-cisternen, membranen', en: 'ER, Golgi cisternae, membranes' }], [COPII, { nl: 'COPII-vesikel (ER → Golgi)', en: 'COPII vesicle (ER → Golgi)' }], [COPI, { nl: 'COPI-vesikel (terug)', en: 'COPI vesicle (back)' }], [CLATH, { nl: 'clathrinevesikel', en: 'clathrin vesicle' }], [CARGO, { nl: 'vrachteiwit (cargo)', en: 'cargo protein' }], [C.prot, { nl: 'ER-/Golgi-residente eiwitten', en: 'ER/Golgi resident proteins' }], [GRAN, { nl: 'secretiegranule', en: 'secretory granule' }]],
  simplified: {
    nl: 'Sterk geschematiseerd: een echte Golgi-stapel telt vaak 4–8 cisternen en de ER–Golgi-afstand is niet op schaal. Het cisternale-rijpingsmodel wordt getoond (de huidige consensus voor veel cargo), maar ook transport via vesikels tussen cisternen komt voor. Coatonderdelen (Sar1, Sec23/24, Sec13/31, ARF1, coatomeer, adaptines) zijn niet afzonderlijk getekend. De vrachttijd ER → membraan varieert sterk per eiwit.',
    en: 'Strongly schematic: a real Golgi stack often has 4–8 cisternae and the ER–Golgi distance is not to scale. The cisternal maturation model is shown (the current consensus for much cargo), but vesicle transport between cisternae also occurs. Coat components (Sar1, Sec23/24, Sec13/31, ARF1, coatomer, adaptins) are not drawn separately. The transit time ER → membrane varies strongly per protein.' },
  steps: [
    ST(7500, FULL, 'De secretieroute', 'The secretory pathway',
      'Eiwitten uit het ruw ER reizen via het Golgi-apparaat naar het celmembraan, naar buiten de cel of naar het lysosoom.',
      'Proteins from the rough ER travel via the Golgi apparatus to the cell membrane, out of the cell or to the lysosome.'),
    ST(8000, cam(470, 432, 820), 'COPII: van het ER naar het Golgi', 'COPII: from the ER to the Golgi',
      'Goed gevouwen eiwitten verlaten het ER in blaasjes met een COPII-mantel. Via een tussenstation (ERGIC) bereiken ze de ingangskant (cis) van het Golgi.',
      'Correctly folded proteins leave the ER in vesicles with a COPII coat. Via a way station (ERGIC) they reach the entry side (cis) of the Golgi.'),
    ST(8000, cam(560, 400, 860), 'COPI en de KDEL-receptor: terug!', 'COPI and the KDEL receptor: back!',
      'ER-eiwitten met een KDEL-label die per ongeluk meegingen, worden in het Golgi herkend door de KDEL-receptor en in COPI-blaasjes teruggestuurd.',
      'ER proteins with a KDEL tag that slipped along by mistake are recognised in the Golgi by the KDEL receptor and sent back in COPI vesicles.'),
    ST(9000, cam(880, 420, 1200), 'Het Golgi rijpt: cis → trans', 'The Golgi matures: cis → trans',
      'Elke Golgi-schijf (cisterne) ontstaat aan de cis-kant en rijpt tot trans. De Golgi-enzymen keren telkens met COPI-blaasjes één schijf terug.',
      'Each Golgi disc (cisterna) forms on the cis side and matures into trans. The Golgi enzymes keep moving one disc back in COPI vesicles.'),
    ST(8500, cam(880, 430, 1100), 'Bewerken onderweg', 'Processing along the way',
      'Elke schijf heeft andere enzymen: ze knippen mannoses weg en zetten nieuwe suikers op. Enzymen voor het lysosoom krijgen een M6P-label.',
      'Each disc has different enzymes: they trim mannoses and add new sugars. Enzymes for the lysosome get an M6P tag.'),
    ST(8000, cam(1180, 470, 1100), 'Trans-Golginetwerk: sorteren', 'Trans-Golgi network: sorting',
      'In het trans-Golginetwerk (TGN), het sorteerstation, gaat elk eiwit in het juiste blaasje: naar het membraan, een opslagkorrel of het endosoom.',
      'In the trans-Golgi network (TGN), the sorting station, each protein goes into the right vesicle: to the membrane, a storage granule or the endosome.'),
    ST(9000, cam(1315, 400, 900), 'Constitutieve en gereguleerde secretie', 'Constitutive and regulated secretion',
      'Gewone blaasjes versmelten voortdurend met het membraan. Opslagkorrels (bv. met insuline) wachten op een signaal (Ca²⁺) en versmelten dan pas.',
      'Ordinary vesicles fuse with the membrane all the time. Storage granules (e.g. with insulin) wait for a signal (Ca²⁺) and only then fuse.'),
    ST(9000, cam(1200, 620, 950), 'Naar het lysosoom via mannose-6-fosfaat', 'To the lysosome via mannose 6-phosphate',
      'Receptoren in het TGN binden enzymen met een M6P-label. Blaasjes brengen ze naar het zure endosoom, waar ze loslaten; de receptor keert terug.',
      'Receptors in the TGN bind enzymes with an M6P tag. Vesicles carry them to the acidic endosome, where they are released; the receptor returns.'),
  ],
  svg() {
    // kern + ER
    const nuc = `<circle cx="-60" cy="450" r="230" fill="url(#gNuc)" stroke="${C.dna}" stroke-width="3" opacity=".9"/>` + T(-40, 460, T2('kern', 'nucleus'), { size: 24, col: C.dna2 });
    let er = '';
    [0, 1, 2].forEach(i => { const r = 265 + i * 42; er += `<path d="M${f1(-60 + r * Math.cos(-1.1))},${f1(450 + r * Math.sin(-1.1))} A${r},${r} 0 0 1 ${f1(-60 + r * Math.cos(1.1))},${f1(450 + r * Math.sin(1.1))}" stroke="${C.mem}" stroke-width="20" fill="none" opacity=".45" stroke-linecap="round"/>`;
      for (let a = -1; a <= 1; a += .16) er += `<circle cx="${f1(-60 + (r + 14) * Math.cos(a))}" cy="${f1(450 + (r + 14) * Math.sin(a))}" r="5" fill="${C.rrna}"/>`; });
    // plasmamembraan
    const pm = `<path d="M${PMX},60 Q${PMX + 40},450 ${PMX},840" stroke="${C.mem}" stroke-width="16" fill="none" opacity=".6"/>` + TL(PMX + 70, 250, [T2('buiten', 'outside'), T2('de cel', 'the cell')], { size: 22, col: C.muted });
    // endosoom en lysosoom
    const el = `<circle cx="${ENDO[0]}" cy="${ENDO[1]}" r="46" fill="rgba(255,138,61,.12)" stroke="#ff8a3d" stroke-width="3"/>` + `<g id="go-ell1">` + TL(ENDO[0], ENDO[1] + 78, [T2('endosoom', 'endosome'), 'pH ≈ 6'], { size: 22, col: '#ff8a3d' }) + '</g>' +
      `<circle cx="${LYSO[0]}" cy="${LYSO[1]}" r="56" fill="rgba(214,90,90,.15)" stroke="${C.bact}" stroke-width="3"/>` + `<g id="go-ell2">` + TL(LYSO[0], LYSO[1] + 88, [T2('lysosoom', 'lysosome'), T2('pH ≈ 4,5–5', 'pH ≈ 4.5–5')], { size: 22, col: C.danger }) + '</g>';
    return svgOpen(arrowDefs('go', { m: C.muted, o: COPII, b: COPI, g: C.ok })) + `
    <g data-node="kern" data-color="${C.dna}" data-nolabel>${nuc}</g>
    <g data-node="er" data-color="${C.mem}" data-label="${T2('Ruw ER', 'Rough ER')}">${er}<circle data-anchor="er" cx="240" cy="200" r="1" fill="none"/></g>
    ${pm}
    <g data-node="endocytose" data-color="#ff8a3d" data-label="${T2('Endocytose (endosoom)', 'Endocytosis (endosome)')}">${el}<circle data-anchor="endocytose" cx="${ENDO[0] + 100}" cy="${ENDO[1] - 70}" r="1" fill="none"/></g>
    <g data-node="glyco" data-color="#00A651" data-label="${T2('Glycanen bewerken', 'Processing glycans')}"><g id="go-cis"></g><circle data-anchor="glyco" cx="${X0 + 1.5 * SPC}" cy="${GY + GH + 20}" r="1" fill="none"/></g>
    <g id="go-ergic"></g>
    <g id="go-ves"></g>
    <g id="go-lbl"></g>
    <g data-node="disulfide" data-color="${GRAN}" data-label="${T2('Insuline (3 S–S-bruggen)', 'Insulin (3 S–S bonds)')}" data-nolabel><g id="go-gran"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const ves = (x, y, coat, cargo, r = 15, op = 1) => op > .01 ? `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="rgba(201,165,116,.18)" stroke="${coat}" stroke-width="4" ${coat === CLATH ? 'stroke-dasharray="4 3"' : ''}/>` + (cargo ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r * .42}" fill="${cargo}"/>` : '') + '</g>' : '';
    const cisColor = x => { const k = clamp((x - X0) / (3 * SPC)); return `rgb(${Math.round(lerp(214, 176, k))},${Math.round(lerp(186, 132, k))},${Math.round(lerp(140, 96, k))})`; };
    const cisterna = (x, op) => op > .01 ? `<path d="M${f1(x + 14)},${GY - GH} Q${f1(x - 46)},${GY} ${f1(x + 14)},${GY + GH}" stroke="${cisColor(x)}" stroke-width="36" fill="none" stroke-linecap="round" opacity="${f1(.55 * op)}"/>` : '';

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- Golgi-stapel met cisternale rijping ---------- */
        const shift = step === 3 ? ease(sub(p, .15, .85)) : 0;
        let g = '';
        for (let i = -1; i <= 3; i++) {
          const x = X0 + (i + shift) * SPC;
          const op = i === -1 ? shift : i === 3 ? 1 - shift * .9 : 1;
          g += cisterna(x, op);
          // cargo in de cisterne
          if (op > .2) for (let j = 0; j < 3; j++) g += `<circle cx="${f1(x - 14)}" cy="${GY - 90 + j * 90}" r="8" fill="${CARGO}" opacity="${f1(op)}"/>`;
        }
        // TGN: buisjesnetwerk
        g += `<path d="M${TGN[0]},${GY - 150} q30,40 0,80 q-30,40 0,80 q30,40 0,80 q-30,40 0,80" stroke="${C.mem}" stroke-width="18" fill="none" opacity=".55" stroke-linecap="round"/>`;
        g += `<circle cx="${TGN[0] + 30}" cy="${GY - 110}" r="14" fill="rgba(201,165,116,.4)"/><circle cx="${TGN[0] + 34}" cy="${GY + 40}" r="14" fill="rgba(201,165,116,.4)"/><circle cx="${TGN[0] + 26}" cy="${GY + 140}" r="14" fill="rgba(201,165,116,.4)"/>`;
        $('go-cis').innerHTML = g;
        // ERGIC
        $('go-ergic').innerHTML = `<g opacity=".8">${[[0, -40], [18, 0], [-10, 36], [22, 50]].map(([dx, dy]) => `<circle cx="${ERGIC[0] + dx}" cy="${ERGIC[1] + dy}" r="20" fill="rgba(201,165,116,.22)" stroke="${C.mem}" stroke-width="3"/>`).join('')}</g>`;

        /* ---------- vesikels ---------- */
        let v = '';
        // COPII (stap 0–2): continu ER → ERGIC → cis
        if (step <= 3) {
          for (let k = 0; k < 4; k++) {
            const u = ((p * (step === 1 ? 2 : 1)) + k / 4) % 1;
            const pos = u < .5 ? qb(EXIT, [460, 420 + k * 12], ERGIC, u * 2) : qb(ERGIC, [610, 470 - k * 10], [X0 - 20, GY - 60 + k * 40], (u - .5) * 2);
            v += ves(pos[0], pos[1], u < .5 ? COPII : C.mem, CARGO, 15, step === 3 ? .5 : 1);
          }
        }
        // COPI terug naar ER met KDEL-eiwit (stap 2) / Golgi-enzymen terug (stap 3)
        if (step === 2) {
          for (let k = 0; k < 3; k++) {
            const u = (p * 1.5 + k / 3) % 1;
            const pos = qb([X0 - 10, GY - 140], [520, 230], [EXIT[0] + 10, EXIT[1] - 110], u);
            v += ves(pos[0], pos[1], COPI, C.prot, 15);
          }
          v += `<g><rect x="${X0 - 45}" y="${GY - 180}" width="16" height="30" rx="5" fill="${COPI}"/></g>`;
        }
        if (step === 3) {
          for (let i = 0; i < 3; i++) {
            const u = sub(p, .2 + i * .15, .55 + i * .15);
            if (u > 0 && u < 1) { const x0 = X0 + (i + 1 + shift) * SPC, x1 = X0 + (i + shift) * SPC; v += ves(lerp(x0, x1 + 10, u), GY - 170 - 30 * Math.sin(u * Math.PI), COPI, C.prot, 13); }
          }
        }
        // TGN-sortering en secretie (stap 5–7)
        if (step >= 5) {
          const q = step === 5 ? p : 1;
          // constitutief: TGN → PM
          for (let k = 0; k < 3; k++) {
            const u = step === 5 ? clamp(q * 1.6 - k * .25) : ((step === 6 ? p * 1.3 : p) + k / 3) % 1;
            const a = [TGN[0] + 40, GY - 10 + k * 10], b = [PMX - 20, 440 + k * 40];
            if (u > 0) {
              if (u < .85) { const pos = qb(a, [1250, 420 + k * 20], b, u / .85); v += ves(pos[0], pos[1], C.mem, CARGO, 16); }
              else { const f = (u - .85) / .15; v += `<path d="M${PMX - 20},${b[1] - 20 + 10 * f} q${f1(-20 * (1 - f))},20 0,40" stroke="${C.mem}" stroke-width="4" fill="none" opacity="${f1(1 - f)}"/>` + `<circle cx="${f1(PMX + 20 + 40 * f)}" cy="${b[1]}" r="7" fill="${CARGO}" opacity="${f1(1 - f * .5)}"/>`; }
            }
          }
          // gereguleerd: granules sparen zich op en versmelten na Ca²⁺
          const fuse = step === 6 ? ease(sub(p, .6, .9)) : step === 7 ? 1 : 0;
          const gr = [[1320, 230], [1370, 280], [1290, 300], [1400, 200]];
          gr.forEach(([x, y], k) => {
            const arrive = step === 5 ? ease(sub(p, .3 + k * .1, .6 + k * .1)) : 1;
            const gx = lerp(TGN[0] + 30, x, arrive), gy = lerp(GY - 110, y, arrive);
            if (fuse < 1) v += `<g opacity="${f1((1 - fuse) * (arrive > 0 ? 1 : 0))}"><circle cx="${f1(lerp(gx, PMX - 26, fuse))}" cy="${f1(gy)}" r="22" fill="rgba(240,107,192,.35)" stroke="${GRAN}" stroke-width="3"/><circle cx="${f1(lerp(gx, PMX - 26, fuse))}" cy="${f1(gy)}" r="11" fill="${GRAN}"/></g>`;
            if (fuse > 0) v += `<circle cx="${f1(PMX + 30 + 60 * fuse + k * 12)}" cy="${f1(y + (k - 1.5) * 20 * fuse)}" r="8" fill="${GRAN}" opacity="${f1(fuse)}"/>`;
          });
          if (step === 6) v += T(1540, 330, 'Ca²⁺', { size: 26, col: '#ffe08a', w: 800, op: sub(p, .5, .6) * (1 - sub(p, .9, 1)) }) + (p > .5 && p < .9 ? `<circle cx="1540" cy="322" r="${f1(20 + 40 * ((p - .5) / .4))}" fill="none" stroke="#ffe08a" stroke-width="3" opacity="${f1(1 - (p - .5) / .4)}"/>` : '');
          // lysosomaal: TGN → endosoom (clathrine) → lysosoom; receptor terug
          const lp = step === 7 ? p : step === 5 ? p * .5 : 0;
          for (let k = 0; k < 2; k++) {
            const u = clamp(lp * 1.6 - k * .3);
            if (u > 0 && u < 1) { const pos = qb([TGN[0] + 20, GY + 150], [1060, 640], [ENDO[0] - 30, ENDO[1] - 20], u); v += ves(pos[0], pos[1], CLATH, '#ff8a3d', 16); }
          }
          if (step === 7) {
            const rel = sub(p, .55, .75), toL = ease(sub(p, .7, 1)), back = ease(sub(p, .6, .95));
            v += `<circle cx="${f1(lerp(ENDO[0], LYSO[0] - 20, toL))}" cy="${ENDO[1]}" r="9" fill="#ff8a3d" opacity="${f1(rel)}"/><circle cx="${f1(lerp(ENDO[0] + 10, LYSO[0] + 10, toL))}" cy="${ENDO[1] + 18}" r="9" fill="#ff8a3d" opacity="${f1(rel)}"/>`;
            if (back > 0 && back < 1) { const pos = qb([ENDO[0] - 20, ENDO[1] - 46], [1080, 560], [TGN[0] + 30, GY + 120], back); v += ves(pos[0], pos[1], C.mem, C.prot, 13); }
          }
        }
        $('go-ves').innerHTML = v;

        /* ---------- labels ---------- */
        let lb = '';
        const names = [['cis', 0], ['medial', 1.5], ['trans', 3], ['TGN', 4.1]];
        if (step !== 1) names.forEach(([n, i]) => lb += T(X0 + i * SPC, GY - GH - 34, n, { size: 23, col: C.mem, w: 700 }));
        if (step === 0) {
          lb += T(ERGIC[0], ERGIC[1] + 110, 'ERGIC', { size: 23, col: C.mem });
          lb += T(X0 + 1.5 * SPC, GY + GH + 70, T2('Golgi-apparaat', 'Golgi apparatus'), { size: 24, col: C.mem, w: 700 });
          lb += T(1330, 330, T2('granules', 'granules'), { size: 22, col: GRAN });
        }
        if (step === 1) {
          lb += T(EXIT[0] + 10, EXIT[1] + 80, T2('ER-uitgang', 'ER exit site'), { size: 20, col: COPII });
          lb += T(460, 360, 'COPII', { size: 24, col: COPII, w: 800 });
          lb += T(ERGIC[0] + 10, ERGIC[1] + 110, 'ERGIC', { size: 22, col: C.mem, w: 700 });
          lb += T(X0, GY - GH - 34, 'cis-Golgi', { size: 22, col: C.mem, w: 700 });
          lb += T(470, 250, T2('alleen goed gevouwen eiwitten mogen mee', 'only correctly folded proteins may leave'), { size: 20, col: C.chain });
        }
        if (step === 2) {
          lb += T(530, 205, T2('COPI (retrograad)', 'COPI (retrograde)'), { size: 24, col: COPI, w: 800 });
          lb += T(X0 - 40, GY - 205, T2('KDEL-receptor', 'KDEL receptor'), { size: 18, col: COPI, anchor: 'end' });
          lb += T(420, 640, T2('bv. BiP en PDI dragen de staart …KDEL', 'e.g. BiP and PDI carry the tail …KDEL'), { size: 20, col: '#c9b8ff' });
        }
        if (step === 3) lb += arr(X0 - 20, 180, X0 + 3 * SPC + 20, 180, C.mem, 'go-m', { w: 5 }) + T(X0 + 3 * SPC + 50, 188, T2('de cisterne zelf rijpt', 'the cisterna itself matures'), { size: 20, col: C.mem, anchor: 'start' }) +
          T(X0 - 60, GY - GH + 30, T2('COPI: enzymen', 'COPI: enzymes'), { size: 20, col: COPI, op: sub(p, .2, .3), anchor: 'end' }) + T(X0 - 60, GY - GH + 56, T2('één cisterne terug', 'one cisterna back'), { size: 20, col: COPI, op: sub(p, .2, .3), anchor: 'end' });
        if (step === 4) {
          const k = sub(p, .05, .25);
          const rows = [[0, T2('cis: M6P op', 'cis: M6P on'), T2('lysosomale enzymen', 'lysosomal enzymes')], [1.5, T2('medial: Man eraf,', 'medial: Man off,'), T2('GlcNAc erbij', 'GlcNAc on')], [3, T2('trans: Gal, Sia', 'trans: Gal, Sia'), T2('(ook op O-glycanen)', '(also on O-glycans)')]];
          rows.forEach(([i, a, b], j) => { const kk = sub(p, .05 + j * .2, .25 + j * .2), y0 = GY - 150 + j * 110; lb += panel(X0 + i * SPC - 100, y0, 200, 76, { op: kk, fill: 'rgba(13,20,38,.9)' }) + T(X0 + i * SPC, y0 + 32, a, { size: 18, op: kk }) + T(X0 + i * SPC, y0 + 58, b, { size: 18, op: kk }); });
          lb += `<g opacity="${f1(sub(p, .6, .8))}">${sugar('GlcNAc', X0 + 3 * SPC + 130, GY + 70, 12)}${sugar('Gal', X0 + 3 * SPC + 158, GY + 70, 12)}${sugar('Sia', X0 + 3 * SPC + 186, GY + 70, 12)}</g>`;
        }
        if (step === 5) {
          lb += T(1320, 540, T2('constitutief', 'constitutive'), { size: 20, col: C.mem, op: sub(p, .1, .3) });
          lb += T(1345, 358, T2('gereguleerd (granules)', 'regulated (granules)'), { size: 20, col: GRAN, op: sub(p, .3, .5) });
          lb += T(1040, 600, T2('lysosomaal (M6P)', 'lysosomal (M6P)'), { size: 20, col: '#ff8a3d', op: sub(p, .5, .7), anchor: 'start' });
        }
        if (step === 6) lb += T(1440, 580, T2('continu', 'continuously'), { size: 20, col: C.mem, anchor: 'end' }) + T(1470, 360, T2('op signaal', 'on signal'), { size: 20, col: GRAN, op: sub(p, .55, .7), anchor: 'end' });
        if (step === 7) {
          lb += T(1040, 700, T2('M6P-receptor + enzym', 'M6P receptor + enzyme'), { size: 19, col: '#ff8a3d', anchor: 'end', op: sub(p, 0, .15) });
          lb += T(ENDO[0] + 60, ENDO[1] + 146, T2('zuur → enzym laat los', 'acidic → enzyme released'), { size: 20, col: '#ff8a3d', op: sub(p, .5, .6), anchor: 'end' });
          lb += T(1080, 520, T2('receptor terug', 'receptor returns'), { size: 18, col: C.mem, op: sub(p, .6, .7), anchor: 'start' });
        }
        $('go-lbl').innerHTML = lb;
        const ellOp = f1(step === 0 ? 1 : step === 7 ? sub(p, 0, .15) : 0);   // namen endosoom/lysosoom alleen waar ze volledig in beeld zijn
        $('go-ell1').setAttribute('opacity', ellOp); $('go-ell2').setAttribute('opacity', ellOp);
        // hotspot-overlay op de granules
        $('go-gran').innerHTML = step >= 5 ? `<rect x="1260" y="180" width="170" height="150" fill="transparent"/>` : '';
      },
    };
  },
};
