import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { inset3d, withInset } from '../../kit3d.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { HYD, LUMEN, ribo, bilayer, at, beadsAt, btn } from './_fate.js';

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
const HX = CX + 190;                                    // waar het vettige stuk in het membraan blijft
const SP = 30, R = 12;
const NL = 12, NH = 6, NC = 9;                          // bolletjes: binnen (begin), vettig stuk, cytosol (einde)
/* pad van de keten: uit het ribosoom (CX, 400) door het kanaal naar beneden en dan door het lumen naar links */
const PATH = [[CX, 400], [CX, 600], [CX - 60, 660], [CX - 180, 690], [CX - 320, 670], [CX - 460, 700], [CX - 600, 680]];
const STOP = (MY - 400) + (NL + (NH - 1) / 2) * SP;   // bij STOP staat het midden van het vettige stuk in het midden van het membraan
const helixPos = j => [HX + (j % 2 ? 9 : -9), MT + 8 + j * (MH - 16) / (NH - 1)];   // j = 0 bovenaan (cytosol) … NH-1 onderaan
/* het einde in het cytosol: van de bovenkant van de helix omhoog en naar rechts */
const CPATH = [[HX, MT - 4], [HX + 40, MT - 70], [HX + 140, MT - 110], [HX + 260, MT - 90], [HX + 360, MT - 150]];

export default {
  id: 'membraan',
  title: { nl: 'Een vettig stuk blijft in het membraan steken', en: 'A greasy stretch gets stuck in the membrane' },
  scale: { nl: 'membraan ≈ 3 nm dik · kanaal ≈ 8 nm', en: 'membrane ≈ 3 nm thick · channel ≈ 8 nm' },
  time: { nl: 'tijdens de aanmaak (vertraagd)', en: 'during synthesis (slowed down)' },
  org: { nl: 'mens · PDB 8DNV', en: 'human · PDB 8DNV' },
  legend: [[SECA, 'Sec61α'], [SECG, 'Sec61γ'], [SECB, 'Sec61β'], [GATE, L3('zijdeur (helix 2 en 7)', 'side gate (helix 2 and 7)')], [C.chain, L3('eiwitketen', 'protein chain')], [HYD, L3('vettig (waterafstotend) stuk', 'greasy (water-repelling) stretch')], [C.mem, L3('ER-membraan', 'ER membrane')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De eerste twee stappen tonen de echte cryo-EM-structuur van het menselijke Sec61-kanaal (Itskanov et al., <i>Nat Chem Biol</i> 2023). Daarna volgt een schema van één membraaneiwit dat wordt ingebouwd.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The first two steps show the real cryo-EM structure of the human Sec61 channel (Itskanov et al., <i>Nat Chem Biol</i> 2023). Then a diagram follows of one membrane protein being built in.</p>' },
  simplified: {
    nl: 'De 3D-structuur is het kanaal zonder ribosoom en zonder keten; de zijdeur staat er gedeeltelijk open. In het schema is de keten als bolletjes getekend: het vettige stuk telt 6 bolletjes in plaats van ongeveer 20 aminozuren, en het geknipte adreslabel (signaalpeptide) van het begin is weggelaten. Getoond is één eenvoudig geval (begin binnen, einde buiten); andere membraaneiwitten liggen andersom of steken meerdere keren door het membraan. Hulpeiwitten naast het kanaal zijn niet getekend.',
    en: 'The 3D structure is the channel without ribosome and without chain; its side gate is partly open. In the diagram the chain is drawn as beads: the greasy stretch has 6 beads instead of about 20 amino acids, and the cleaved address label (signal peptide) at the start is left out. One simple case is shown (start inside, end outside); other membrane proteins sit the other way round or cross the membrane several times. Helper proteins next to the channel are not drawn.' },
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
      text: L3('De rest van de keten blijft in het cytosol. Zo zit het begin van het eiwit in het ER en het einde erbuiten.', 'The rest of the chain stays in the cytosol. So the start of the protein is in the ER and the end is outside it.') },
    { dur: 8500, cam: cam(HX + 60, MY, 900), title: L3('Een spiraal van ongeveer 20 bouwstenen past precies', 'A spiral of about 20 building blocks fits exactly'),
      text: L3('Het vettige stuk rolt op tot een spiraal (helix). Zo’n 20 bouwstenen zijn net zo lang als het membraan dik is.', 'The greasy stretch coils into a spiral (helix). About 20 building blocks are just as long as the membrane is thick.') },
    { dur: 9000, cam: FULL, title: L3('Het eiwit reist mee in het membraan', 'The protein travels along in the membrane'),
      text: L3('Een blaasje knijpt af en neemt het eiwit mee naar het Golgi. Hoe het in het membraan staat, werd al in het ER beslist.', 'A vesicle pinches off and carries the protein to the Golgi. How it sits in the membrane was already decided in the ER.') },
  ],
  svg() {
    return svgOpen() + `
    <g id="mb-2d">
      <rect x="-300" y="${MB}" width="2200" height="700" fill="${LUMEN}"/>
      <g data-node="er" data-color="${C.mem}" data-label="${T2('Hoe kwam het eiwit hier? (ER)', 'How did the protein get here? (ER)')}">${bilayer(-300, 1900, MY, { h: MH, gap: [CX - 74, CX + 74] })}<circle data-anchor="er" cx="${CX - 330}" cy="${MT - 20}" r="1" fill="none"/></g>
      ${T(90, 200, T2('cytosol', 'cytosol'), { size: 28, anchor: 'start', col: C.muted })}
      ${T(90, 790, T2('binnenkant van het ER', 'inside of the ER'), { size: 28, anchor: 'start', col: '#e0b25c' })}
      <g id="mb-chan"></g><g id="mb-ribo"></g><g id="mb-chain"></g><g id="mb-fx"></g>
      <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Verder naar het Golgi', 'On to the Golgi')}"><g id="mb-ves"></g><circle id="mb-vesA" data-anchor="golgi" cx="-99" cy="-99" r="1" fill="none"/></g>
    </g>
    <g id="mb-3d">
      <rect x="134" y="124" width="1072" height="622" rx="22" fill="#0b1224" stroke="#2a3550" stroke-width="3"/>
      <rect id="mb-box" x="140" y="130" width="1060" height="610" rx="16" fill="#0b1224"/>
      <g opacity=".5">${bilayer(160, 1180, 440, { h: 120 })}<rect x="${670 - 120}" y="350" width="80" height="180" rx="20" fill="${SECA}" opacity=".5"/><rect x="${670 + 40}" y="350" width="80" height="180" rx="20" fill="${SECA}" opacity=".5"/></g>
      ${T(670, 660, T2('3D-structuur laden…', 'loading 3D structure…'), { size: 24, col: C.muted, w: 500 })}
      ${T(1230, 360, T2('Het echte kanaal', 'The real channel'), { size: 28, anchor: 'start', w: 700 })}
      ${T(1230, 398, T2('mens · PDB 8DNV', 'human · PDB 8DNV'), { size: 24, anchor: 'start', col: C.muted, w: 500 })}
      ${T(1230, 190, T2('↑ cytosol', '↑ cytosol'), { size: 26, anchor: 'start', col: C.muted })}
      ${T(1230, 710, T2('↓ binnenkant ER', '↓ inside the ER'), { size: 26, anchor: 'start', col: '#e0b25c' })}
    </g>
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('golgi', 1230, 330, T2('verder: Golgi →', 'next: Golgi →'), C.mem)}
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    const v3 = inset3d(svg, { pdb: '8DNV', format: 'pdb', box: 'mb-box', base: BASE3, steps: S3, off: !api?.node });
    return withInset({
      update(t, s) {
        const { step, p } = s;
        const op3 = v3.update(s);
        $('mb-3d').setAttribute('opacity', f1(op3));
        $('mb-2d').setAttribute('opacity', f1(1 - op3));
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kIn = ph(2, .05, .85), kStop = ph(3, .05, .4), kSide = ph(3, .45, .9), kTail = ph(4, .05, .7), kOff = ph(4, .7, .95), kZoom = ph(5, .1, .4), kVes = ph(6, .1, .75);
        // kanaal: rechterhelft schuift open tijdens het zijwaarts glippen
        const open = 26 * Math.sin(Math.PI * Math.min(1, kSide * 1.2)) * (kSide < 1 ? 1 : 0);
        $('mb-chan').innerHTML = `<rect x="${CX - 74}" y="${MT - 10}" width="44" height="${MH + 20}" rx="14" fill="${SECA}" fill-opacity=".35" stroke="${SECA}" stroke-width="3"/>` +
          `<rect x="${f1(CX + 30 + open)}" y="${MT - 10}" width="44" height="${MH + 20}" rx="14" fill="${SECA}" fill-opacity=".35" stroke="${SECA}" stroke-width="3"/>` +
          T(CX - 120, MB + 50, T2('kanaal', 'channel'), { size: 24, col: SECA, anchor: 'end' });
        // ribosoom: zit op het kanaal, laat los aan het einde van stap 4
        $('mb-ribo').innerHTML = ribo(CX + lerp(0, -260, kOff), 330 - lerp(0, 120, kOff), 1.1, 1 - kOff * .85) + T(CX - 150, 300, T2('ribosoom', 'ribosome'), { size: 24, col: C.rrna, anchor: 'end', op: 1 - kOff });
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
            P = [lerp(P[0], helixPos(j)[0], kSide), lerp(P[1], helixPos(j)[1], kSide)];
          }
          pts.push(P); cols.push(k >= NL ? HYD : C.chain);
        }
        // einde in het cytosol (na het vettige stuk)
        const nTail = Math.round(NC * kTail);
        for (let k = 0; k < nTail; k++) { pts.push(at(CPATH, 22 + k * SP)); cols.push(C.chain); }
        const showChain = step >= 2 ? 1 : 0;
        let ch = beadsAt(pts, i => cols[i], R, showChain * (1 - kVes));
        // helix-band rond het vettige stuk en de schaal (stap 5)
        let fx = '';
        if (kSide > .5) fx += `<rect x="${HX - 26}" y="${MT + 2}" width="52" height="${MH - 4}" rx="20" fill="none" stroke="${HYD}" stroke-width="4" opacity="${f1((kSide - .5) * 2 * (1 - kVes))}"/>`;
        if (pts.length && step >= 2) fx += T(pts[0][0], pts[0][1] + 48, T2('begin', 'start'), { size: 24, col: C.text, op: ease(sub(kTail, .7, 1)) * (1 - kVes) });
        if (nTail > 1) fx += T(pts[pts.length - 1][0] + 20, pts[pts.length - 1][1] - 26, T2('einde', 'end'), { size: 24, col: C.text, op: ease(sub(kTail, .7, 1)) * (1 - kVes) });
        if (step === 3) fx += T(HX + 80, MT - 40, T2('vettig stuk', 'greasy stretch'), { size: 26, col: HYD, anchor: 'start', op: ease(sub(p, .55, .8)) });
        if (kZoom > .01) {
          const o = kZoom * (1 - kVes), rx = HX + 70;
          fx += `<g opacity="${f1(o)}"><line x1="${rx}" y1="${MT}" x2="${rx}" y2="${MB}" stroke="${C.text}" stroke-width="3"/><line x1="${rx - 10}" y1="${MT}" x2="${rx + 10}" y2="${MT}" stroke="${C.text}" stroke-width="3"/><line x1="${rx - 10}" y1="${MB}" x2="${rx + 10}" y2="${MB}" stroke="${C.text}" stroke-width="3"/></g>` +
            T(rx + 22, MY - 4, T2('≈ 3 nm', '≈ 3 nm'), { size: 26, anchor: 'start', op: o }) + T(rx + 22, MY + 28, T2('≈ 20 bouwstenen', '≈ 20 building blocks'), { size: 22, anchor: 'start', col: HYD, op: o });
        }
        // blaasje met het eiwit in de wand (stap 6)
        let ves = '';
        const va = $('mb-vesA');
        if (kVes > .01) {
          const vx = lerp(HX, HX + 300, kVes), vy = lerp(MT - 40, 250, kVes), r = lerp(40, 110, kVes);
          ves += `<g opacity="${f1(kVes)}"><circle cx="${f1(vx)}" cy="${f1(vy)}" r="${f1(r)}" fill="${LUMEN}" stroke="${C.mem}" stroke-width="${f1(r * .26)}" stroke-opacity=".55"/>` +
            `<circle cx="${f1(vx)}" cy="${f1(vy)}" r="${f1(r)}" fill="none" stroke="${C.mem}" stroke-width="3" stroke-dasharray="2 9"/>`;
          // helix in de wand (onderaan), begin naar binnen, einde naar buiten
          const hy = vy + r, inner = [[vx - 30, hy - 40], [vx - 50, vy + 10], [vx - 20, vy - 30], [vx + 20, vy - 10]].map(q => [lerp(vx, q[0], r / 110), lerp(vy, q[1], r / 110)]);
          ves += beadsAt(inner, () => C.chain, 10) + `<rect x="${f1(vx - 12)}" y="${f1(hy - 22)}" width="24" height="44" rx="10" fill="${HYD}"/>` +
            beadsAt([[vx + 10, hy + 30], [vx + 50, hy + 60], [vx + 90, hy + 50], [vx + 130, hy + 80]], () => C.chain, 10) + '</g>';
          ves += arrow(vx + r + 30, vy, vx + r + 150, vy, C.mem, 5, ease(sub(kVes, .7, 1))) + T(vx + r + 90, vy - 30, 'Golgi', { size: 28, col: C.mem, op: ease(sub(kVes, .7, 1)) });
          va.setAttribute('cx', f1(vx + r + 100)); va.setAttribute('cy', f1(vy + 60));
          // het membraan zelf blijft; de helix op de oude plek verdwijnt
        } else { va.setAttribute('cx', -99); va.setAttribute('cy', -99); }
        $('mb-chain').innerHTML = ch; $('mb-fx').innerHTML = fx; $('mb-ves').innerHTML = ves;
      },
      destroy() { v3.destroy(); },
    }, v3);
  },
};
