import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { inset3d, withInset, warm3d } from '../../kit3d.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { HYD, LUMEN, bilayer, at, beadsAt, btn, knop } from './_fate.js';
import { ribosoom80S, eiwitPad, tmHelix } from '../../bio.js';

/*
 * Membraaneiwitten: een waterafstotend stuk stopt de doorgang door het kanaal (Sec61) en glipt via de zijdeur
 * (laterale poort) het membraan in. Stap 0–1: echte menselijke Sec61-structuur (PDB 8DNV) in 3D, daarna 2D.
 * 8DNV (Itskanov et al., Nat Chem Biol 2023; cryo-EM 3,03 Å): A = Sec61α (9–468), B = Sec61γ, C = Sec61β.
 * Lokale kopie star gedraaid: membraannormaal = +y (cytosol boven), laterale poort naar de kijker (+z).
 * Laterale poort = vooral helix 2 en helix 7 van Sec61α (UniProt P61619: TM2 77–96, TM7 289–309; Shao & Hegde 2011).
 */
const L3 = (nl, en) => ({ nl, en });
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const SECA = '#9b7bff', SECB = '#5fd3e6', SECG = '#7fdc6a', GATE = '#ffc247';
const TM2 = range(77, 96), TM7 = range(289, 309);
const CART = col => ({ cartoon: { color: col } });
const BASE3 = [{ sel: { chain: 'A' }, style: CART(SECA) }, { sel: { chain: 'B' }, style: CART(SECG) }, { sel: { chain: 'C' }, style: CART(SECB) }];
const S3 = {
  0: { spin: .012, focus: [{ sel: { chain: 'A' }, style: CART(SECA), label: L3('grote deel', 'main part') }, { sel: { chain: 'B' }, style: CART(SECG) }, { sel: { chain: 'C' }, style: CART(SECB) }] },
  1: { spin: .006, focus: [{ sel: { chain: 'A' }, style: { cartoon: { color: '#56607a' } } }, { sel: { chain: ['B', 'C'] }, style: { cartoon: { color: '#3a4560' } } },
    { sel: { chain: 'A', resi: TM2 }, style: CART(GATE) }, { sel: { chain: 'A', resi: TM7 }, style: CART(GATE), label: L3('zijdeur', 'side gate') }] },
};

const CX = 760, MY = 500, MH = 90, MT = MY - MH / 2, MB = MY + MH / 2;
const HX = CX + 250;                                    // waar het vettige stuk in het membraan blijft
const SP = 30, R = 12;
const NL = 12, NH = 6, NC = 7;                          // bolletjes: binnen (begin), vettig stuk, cytosol (einde)
/* pad van de keten: uit het ribosoom (CX, 400) door het kanaal naar beneden en dan door het lumen naar links */
const PATH = [[CX, 400], [CX, 600], [CX - 60, 660], [CX - 180, 690], [CX - 320, 670], [CX - 460, 700], [CX - 600, 680]];
/* na het zijwaarts glippen hangt het binnenste deel aan de onderkant van de helix (geen rechte sprong naar het kanaal) */
const PATH2 = [[HX - 12, MB + 22], [HX - 90, MB + 80], [CX + 20, 680], [CX - 120, 700], [CX - 260, 680], [CX - 400, 705], [CX - 540, 685]];
const STOP = (MY - 400) + (NL + (NH - 1) / 2) * SP;   // bij STOP staat het midden van het vettige stuk in het midden van het membraan
const helixPos = j => [HX + (j % 2 ? 9 : -9), MT + 8 + j * (MH - 16) / (NH - 1)];   // j = 0 bovenaan (cytosol) … NH-1 onderaan
/* het cytosolische deel komt uit de spleet tussen ribosoom en kanaal (het ribosoom blijft zitten tot de keten af is) */
const EXIT = [CX + 72, MT - 16], TAILA = [HX, MT - 16];
/* blaasje dat uit het ER-membraan knopt: straal en wanddikte (zelfde dikte als het ER-membraan; niet op schaal) */
const VR = 130, VW = MH;
/* gevouwen binnenste deel in het blaasje (t.o.v. het middelpunt; bolletje 0 = naast de helix) */
const INNER = [[6, -74], [-22, -64], [-50, -50], [-60, -22], [-34, -14], [-6, -20], [22, -26], [50, -30], [62, -2], [40, 18], [12, 26], [-16, 36]];
const plen = Q => Q.reduce((a, q, i) => i ? a + Math.hypot(q[0] - Q[i - 1][0], q[1] - Q[i - 1][1]) : 0, 0);
/* boog van A naar B met booglengte ≈ L (bult naar boven) */
function bump(A, B, L) {
  const P = b => Array.from({ length: 41 }, (_, i) => { const u = i / 40; return [lerp(A[0], B[0], u), lerp(A[1], B[1], u) - b * Math.sin(Math.PI * u)]; });
  if (plen(P(0)) >= L) return P(0);
  let lo = 0, hi = 400;
  for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (plen(P(mid)) < L) lo = mid; else hi = mid; }
  return P(lo);
}

export default {
  id: 'membraan',
  warm() { warm3d('8DNV', 'pdb'); },   // 3D-venster: bestand al ophalen en parsen
  title: { nl: 'Een vettig stuk blijft in het membraan steken', en: 'A greasy stretch gets stuck in the membrane' },
  scale: { nl: 'membraan ≈ 3 nm dik · kanaal ≈ 7 nm breed', en: 'membrane ≈ 3 nm thick · channel ≈ 7 nm wide' },
  time: { nl: 'tijdens de aanmaak (vertraagd)', en: 'during synthesis (slowed down)' },
  org: { nl: 'mens · PDB 8DNV', en: 'human · PDB 8DNV' },
  legend: [[SECA, 'Sec61α'], [SECG, 'Sec61γ'], [SECB, 'Sec61β'], [GATE, L3('zijdeur (helix 2 en 7)', 'side gate (helix 2 and 7)')], [C.chain, L3('eiwitketen', 'protein chain')], [HYD, L3('vettig (waterafstotend) stuk', 'greasy (water-repelling) stretch')], [C.mem, L3('ER-membraan', 'ER membrane')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De eerste twee stappen tonen de echte cryo-EM-structuur van het menselijke Sec61-kanaal (Itskanov et al., <i>Nat Chem Biol</i> 2023). Daarna volgt een schema van één membraaneiwit dat wordt ingebouwd.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The first two steps show the real cryo-EM structure of the human Sec61 channel (Itskanov et al., <i>Nat Chem Biol</i> 2023). Then a diagram follows of one membrane protein being built in.</p>' },
  simplified: {
    nl: 'De 3D-structuur is het kanaal zonder ribosoom en zonder keten; de zijdeur staat er gedeeltelijk open. Twee korte lussen aan de cytosolkant van Sec61α komen in deze structuur van gist, de rest is menselijk. Het blaasje is niet op schaal getekend. In het schema is de keten als bolletjes getekend: het vettige stuk telt 6 bolletjes in plaats van ongeveer 20 aminozuren, en het geknipte adreslabel (signaalpeptide) van het begin is weggelaten. Getoond is één eenvoudig geval (begin binnen, einde buiten); andere membraaneiwitten liggen andersom of steken meerdere keren door het membraan. Hulpeiwitten naast het kanaal zijn niet getekend.',
    en: 'The 3D structure is the channel without ribosome and without chain; its side gate is partly open. In this structure two short loops on the cytosolic side of Sec61α come from yeast; the rest is human. The vesicle is not drawn to scale. In the diagram the chain is drawn as beads: the greasy stretch has 6 beads instead of about 20 amino acids, and the cleaved address label (signal peptide) at the start is left out. One simple case is shown (start inside, end outside); other membrane proteins sit the other way round or cross the membrane several times. Helper proteins next to the channel are not drawn.' },
  steps: [
    { dur: 8500, cam: FULL, title: L3('Een kanaal in het ER-membraan', 'A channel in the ER membrane'),
      text: L3('Dit is het echte kanaal van de mens waardoor nieuwe eiwitten het ER in gaan. Het bestaat uit drie eiwitten.', 'This is the real human channel through which new proteins enter the ER. It is made of three proteins.') },
    { dur: 8500, cam: FULL, title: L3('Het kanaal heeft een zijdeur', 'The channel has a side gate'),
      text: L3('Twee spiralen aan de zijkant kunnen uit elkaar wijken. Zo gaat het kanaal opzij open, naar het vet van het membraan.', 'Two spirals at the side can move apart. That opens the channel sideways, into the fat of the membrane.') },
    { dur: 8000, cam: FULL, title: L3('De keten schuift door het kanaal', 'The chain slides through the channel'),
      text: L3('Het ribosoom zit op het kanaal. De groeiende keten glijdt erdoor naar de binnenkant van het ER.', 'The ribosome sits on the channel. The growing chain slides through it into the inside of the ER.') },
    { dur: 9000, cam: FULL, title: L3('Een vettig stuk blijft in het membraan steken', 'A greasy stretch gets stuck in the membrane'),
      text: L3('Dan komt er een waterafstotend stuk. Dat stopt in het kanaal en glipt via de zijdeur het membraan in.', 'Then a water-repelling stretch arrives. It stops in the channel and slips through the side gate into the membrane.') },
    { dur: 8500, cam: FULL, title: L3('Het begin zit binnen, het einde buiten', 'The start is inside, the end outside'),
      text: L3('De rest van de keten komt uit het ribosoom in het cytosol. Pas als de keten af is, laat het ribosoom los.', 'The rest of the chain comes out of the ribosome into the cytosol. Only when the chain is finished does the ribosome let go.') },
    { dur: 8500, cam: cam(HX + 60, MY, 900), title: L3('Een spiraal van ongeveer 20 bouwstenen past precies', 'A spiral of about 20 building blocks fits exactly'),
      text: L3('Het vettige stuk rolt op tot een spiraal (helix). Zo’n 20 bouwstenen zijn net zo lang als het membraan dik is.', 'The greasy stretch coils into a spiral (helix). About 20 building blocks are just as long as the membrane is thick.') },
    { dur: 9000, cam: FULL, title: L3('Het eiwit reist mee in het membraan', 'The protein travels along in the membrane'),
      text: L3('Een blaasje knijpt af en neemt het eiwit mee naar het Golgi. Hoe het in het membraan staat, werd al in het ER beslist.', 'A vesicle pinches off and carries the protein to the Golgi. How it sits in the membrane was already decided in the ER.') },
  ],
  svg() {
    return svgOpen() + `
    <g id="mb-2d">
      <rect x="-300" y="${MB}" width="2200" height="700" fill="${LUMEN}"/>
      <g data-node="er" data-color="${C.mem}" data-label="${T2('Hoe kwam het eiwit hier? (ER)', 'How did the protein get here? (ER)')}"><g id="mb-bil">${bilayer(-300, 1900, MY, { h: MH, gap: [CX - 74, CX + 74] })}</g><circle data-anchor="er" cx="${CX - 330}" cy="${MT - 20}" r="1" fill="none"/></g>
      ${T(90, 200, T2('cytosol', 'cytosol'), { size: 28, anchor: 'start', col: C.muted })}
      ${T(90, 790, T2('binnenkant van het ER', 'inside of the ER'), { size: 28, anchor: 'start', col: '#8fb3e8' })}
      <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Verder naar het Golgi', 'On to the Golgi')}"><g id="mb-ves"></g><circle id="mb-vesA" data-anchor="golgi" cx="-99" cy="-99" r="1" fill="none"/></g>
      <g id="mb-chan"></g><g id="mb-chain"></g><g id="mb-ribo"></g><g id="mb-fx"></g>
    </g>
    <g id="mb-3d">
      <rect x="134" y="124" width="1072" height="622" rx="22" fill="#0b1224" stroke="#2a3550" stroke-width="3"/>
      <rect id="mb-box" x="140" y="130" width="1060" height="610" rx="16" fill="#0b1224"/>
      <g opacity=".5">${bilayer(160, 1180, 440, { h: 120 })}<rect x="${670 - 120}" y="350" width="80" height="180" rx="20" fill="${SECA}" opacity=".5"/><rect x="${670 + 40}" y="350" width="80" height="180" rx="20" fill="${SECA}" opacity=".5"/></g>
      ${T(670, 660, T2('3D-structuur laden…', 'loading 3D structure…'), { size: 24, col: C.muted, w: 500 })}
      ${T(1230, 360, T2('Het echte kanaal', 'The real channel'), { size: 28, anchor: 'start', w: 700 })}
      ${T(1230, 398, T2('mens · PDB 8DNV', 'human · PDB 8DNV'), { size: 24, anchor: 'start', col: C.muted, w: 500 })}
      ${T(1230, 190, T2('↑ cytosol', '↑ cytosol'), { size: 26, anchor: 'start', col: C.muted })}
      ${T(1230, 710, T2('↓ binnenkant ER', '↓ inside the ER'), { size: 26, anchor: 'start', col: '#8fb3e8' })}
    </g>
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('golgi', 1230, 330, T2('verder: Golgi →', 'next: Golgi →'), C.mem)}
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    let gkPrev = null;
    const v3 = inset3d(svg, { pdb: '8DNV', format: 'pdb', box: 'mb-box', base: BASE3, steps: S3, off: !api?.node });
    return withInset({
      update(t, s) {
        const { step, p } = s;
        const op3 = v3.update(s);
        $('mb-3d').setAttribute('opacity', f1(op3));
        $('mb-2d').setAttribute('opacity', f1(1 - op3));
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kIn = ph(2, .05, .85), kStop = ph(3, .05, .4), kSide = ph(3, .45, .9), kTail = ph(4, .05, .6), kOff = ph(4, .7, .95), kZoom = ph(5, .1, .4);
        const kBud = ph(6, .05, .65), kMove = ph(6, .7, .95);
        // kanaal: rechterhelft schuift open tijdens het zijwaarts glippen; na het loslaten van het ribosoom sluit de prop het kanaal
        const open = 26 * Math.sin(Math.PI * Math.min(1, kSide * 1.2)) * (kSide < 1 ? 1 : 0), cl = 5 * kOff;
        // Sec61-kanaal: twee helften (bobbelige eiwitvorm) door de dubbellaag; de rechterhelft wijkt opzij (zijdeur)
        const half = (x, sd) => { const d = eiwitPad(x, MY, 26, MH / 2 + 12, sd, .05); return `<path d="${d}" fill="#0b1224"/><path d="${d}" fill="${SECA}" fill-opacity=".5" stroke="${SECA}" stroke-width="3"/>`; };
        const pd = eiwitPad(CX, MY + 14, 19, 17, 63, .06);
        const plug = kOff > .01 ? `<g opacity="${f1(kOff)}"><path d="${pd}" fill="#0b1224"/><path d="${pd}" fill="${SECA}" fill-opacity=".7" stroke="${SECA}" stroke-width="3"/></g>` : '';
        $('mb-chan').innerHTML = half(CX - 48 + cl, 61) + half(CX + 48 + open - cl, 62) + plug + T(CX - 120, MB + 50, T2('kanaal', 'channel'), { size: 24, col: SECA, anchor: 'end', op: step === 5 ? 0 : 1 });
        // ribosoom: de tunneluitgang van de grote eenheid zit op het kanaal; laat pas los als de keten af is (einde van stap 4)
        const rb = ribosoom80S(CX, MT - 14, { s: .9 });
        $('mb-ribo').innerHTML = `<g opacity="${f1(1 - kOff)}" transform="translate(${f1(lerp(0, -260, kOff))} ${f1(-lerp(0, 120, kOff))})">${rb.svg}</g>` + T(CX - 150 - 260 * kOff, 255 - 120 * kOff, T2('ribosoom', 'ribosome'), { size: 24, col: C.rrna, anchor: 'end', op: 1 - kOff });
        // blaasje (stap 6): knopt uit het ER-membraan zelf (knop uit _fate.js), met de helix in het stuk membraan dat afsnoert
        const bud = kBud > 0 ? knop([HX, MY], [0, -1], VR, kBud, { hole: 'none', w: VW, gap: 70, lumen: 'rgba(143,179,232,.10)' }) : null;
        let gap2 = null;
        if (bud) { const rho = bud.c[1] - bud.top[1], d = MY - bud.c[1]; if (d < rho) { const h = Math.sqrt(rho * rho - d * d); gap2 = [HX - h - VW * .55, HX + h + VW * .55]; } }   // het vlakke membraan stopt waar de knopwand begint (geen dubbele kopjes)
        const V = [lerp(0, 130, kMove), lerp(0, -25, kMove)];
        const S = bud ? [bud.top[0] - HX + V[0], bud.top[1] - MY + V[1]] : [0, 0];        // verschuiving van de helix (en het deel in het cytosol)
        const mv = q => [q[0] + S[0], q[1] + S[1]];
        // ER-membraan met het kanaal en, tijdens het afknoppen, de hals van de knop als opening; daarna is het membraan weer dicht
        const gk = gap2 ? `${f1(gap2[0])},${f1(gap2[1])}` : '';
        if (gk !== gkPrev) {
          gkPrev = gk;
          $('mb-bil').innerHTML = gap2 ? bilayer(-300, gap2[0], MY, { h: MH, gap: [CX - 74, CX + 74] }) + bilayer(gap2[1], 1900, MY, { h: MH })
            : bilayer(-300, 1900, MY, { h: MH, gap: [CX - 74, CX + 74] });
        }
        // keten: lengte die al door het kanaal is (booglengte vanaf het ribosoom)
        const Lpush = step < 2 ? 0 : lerp(130, STOP - NH * SP, kIn) + (NH * SP) * kStop;
        const pts = [], cols = [];
        const nOut = Math.floor(Lpush / SP) + 1;
        for (let k = 0; k < Math.min(NL + NH, nOut); k++) {
          const d = Lpush - k * SP;                   // k = 0 is het begin (N-uiteinde), het verst op het pad
          if (d < 0) break;
          let P = at(PATH, d);
          if (k >= NL) {                              // het vettige stuk: van het kanaal opzij naar het membraan
            const j = (NL + NH - 1) - k;               // j = 0 bovenaan
            P = mv([lerp(P[0], helixPos(j)[0], kSide), lerp(P[1], helixPos(j)[1], kSide)]);
          } else if (kSide > 0) {                     // het binnenste deel gaat mee en hangt aan de onderkant van de helix
            const m = NL - k, Q = at(PATH2, (m - 1) * SP);
            P = [lerp(P[0], Q[0], kSide), lerp(P[1], Q[1], kSide)];
            if (bud) {                                // via de hals van de knop (lumen loopt door) naar binnen in het blaasje
              const u = ease(Math.max(0, Math.min(1, (kBud - .1 - .04 * (m - 1)) / .28)));
              const sc = (bud.c[1] - bud.top[1]) / 150, tg = [bud.c[0] + V[0] + INNER[m - 1][0] * sc, bud.c[1] + V[1] + INNER[m - 1][1] * sc], nk = [HX, MY + 10];
              P = u < .5 ? [lerp(P[0], nk[0], u * 2), lerp(P[1], nk[1], u * 2)] : [lerp(nk[0], tg[0], u * 2 - 1), lerp(nk[1], tg[1], u * 2 - 1)];
            }
          }
          pts.push(P); cols.push(k >= NL ? HYD : C.chain);
        }
        // einde in het cytosol: van de bovenkant van de helix naar de spleet tussen ribosoom en kanaal (de nieuwste bouwsteen zit in het ribosoom)
        const nTail = Math.round(NC * kTail);
        let link = '';
        if (step >= 3 && kSide > .02) {
          // tijdens het afknoppen schuift het vrije einde mee naast het blaasje (het ribosoom is dan al weg)
          const kb = ease(sub(kBud, 0, .5)), B = [lerp(EXIT[0], TAILA[0] - 190, kb), lerp(EXIT[1], TAILA[1] + 30, kb)];
          const Q = bump(TAILA, B, Math.max(1, nTail) * SP + 10).map(mv), Lq = plen(Q);
          for (let k = 1; k <= nTail; k++) { pts.push(at(Q, Lq * k / nTail)); cols.push(C.chain); }
          const top = pts[NL + NH - 1] ?? Q[0];
          link = `<path d="M${f1(top[0])},${f1(top[1])} L${Q.map(q => `${f1(q[0])},${f1(q[1])}`).join(' L')}" stroke="${C.chain}" stroke-width="${f1(R * .5)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(kSide)}"/>`;
        }
        const showChain = step >= 2 ? 1 : 0;
        const ch = showChain ? link + beadsAt(pts, i => cols[i], R, 1) : '';
        // helix-band rond het vettige stuk en de schaal (stap 5)
        let fx = '';
        const hc = mv([HX, MY]);
        if (kSide > .5) fx = tmHelix(hc[0], hc[1] - MH / 2 + 2, hc[1] + MH / 2 - 2, HYD, (kSide - .5) * 2 * .45, 50) + fx;
        const kLab = 1 - ease(sub(kBud, 0, .3));
        if (pts.length && step >= 2) fx += T(pts[0][0], pts[0][1] + 48, T2('begin', 'start'), { size: 24, col: C.text, op: ease(sub(kTail, .7, 1)) * kLab });
        if (nTail > 1) fx += T(pts[pts.length - 1][0] - 22, pts[pts.length - 1][1] - 6, T2('einde', 'end'), { size: 24, col: C.text, anchor: 'end', op: ease(sub(kOff, .6, 1)) * kLab });
        if (step === 3) fx += T(HX + 80, MT - 40, T2('vettig stuk', 'greasy stretch'), { size: 26, col: HYD, anchor: 'start', op: ease(sub(p, .55, .8)) });
        if (kZoom > .01) {
          const o = kZoom * kLab, rx = HX + 70;
          fx += `<g opacity="${f1(o)}"><line x1="${rx}" y1="${MT}" x2="${rx}" y2="${MB}" stroke="${C.text}" stroke-width="3"/><line x1="${rx - 10}" y1="${MT}" x2="${rx + 10}" y2="${MT}" stroke="${C.text}" stroke-width="3"/><line x1="${rx - 10}" y1="${MB}" x2="${rx + 10}" y2="${MB}" stroke="${C.text}" stroke-width="3"/></g>` +
            T(rx + 22, MY + 9, T2('≈ 3 nm', '≈ 3 nm'), { size: 26, anchor: 'start', op: o }) + T(rx - 20, MB + 44, T2('≈ 20 bouwstenen', '≈ 20 building blocks'), { size: 22, anchor: 'start', col: HYD, op: o });
        }
        // blaasje met het eiwit in de wand (stap 6)
        let ves = '';
        const va = $('mb-vesA');
        if (bud) {
          ves += `<g transform="translate(${f1(V[0])} ${f1(V[1])})">${bud.svg}</g>`;
          const c = [bud.c[0] + V[0], bud.c[1] + V[1]], oA = ease(sub(kMove, .4, 1)), xr = c[0] + VR + VW / 2;
          ves += arrow(xr + 20, c[1], xr + 130, c[1], C.mem, 5, oA) + T(xr + 75, c[1] - 30, 'Golgi', { size: 28, col: C.mem, op: oA });
          const vis = kBud > .95;
          va.setAttribute('cx', vis ? f1(c[0] + VR + 160) : -99); va.setAttribute('cy', vis ? f1(c[1] + 140) : -99);
        } else { va.setAttribute('cx', -99); va.setAttribute('cy', -99); }
        $('mb-chain').innerHTML = ch; $('mb-fx').innerHTML = fx; $('mb-ves').innerHTML = ves;
      },
      destroy() { v3.destroy(); },
    }, v3);
  },
};
