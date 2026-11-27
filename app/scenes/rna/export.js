import { C, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { polyPath, bez, dpath, prot, capG, ribo, note, arrow } from './_rna.js';
import { kernEnvelopLijn, eiwitPad, trna2dSpan } from '../../bio.js';

/*
 * mRNA-export door de kernporie (hoofdstuk 13).
 * Het mRNP is een "slang" langs één vast pad: kern (onder) → kernkorf → centraal kanaal → cytoplasma (boven).
 * Het 5'-uiteinde (cap) gaat voorop; alle eiwitten hangen op een vaste afstand d (px) vanaf de cap.
 */
const PX = 1000;                                  // x van het centrale kanaal
const Y_OUT = 420, Y_IN = 500;                    // buiten- en binnenmembraan
const PATH = [
  ...[[40, 740], [840, 740]],
  ...bez([840, 740], [960, 740], [PX, 700], [PX, 620]).slice(1),
  [PX, 340],
  ...bez([PX, 340], [PX, 262], [960, 230], [880, 230]).slice(1),
  [-600, 230],
];
const LEN = 760;                                  // lengte van het mRNP (px, niet op schaal)
const D = { ejc: [200, 390], nxf: [90, 300, 480], stop: 520, pa0: 600, pab: [625, 665, 705, 742] };

const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'export',
  title: { nl: 'mRNA-export', en: 'mRNA export' },
  scale: '≈ 120 nm',
  time: { nl: 'doortocht ≈ 0,2 s (hier vertraagd)', en: 'passage ≈ 0.2 s (slowed down here)' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.rna, 'mRNA'], [C.cap, { nl: "m⁷G-cap / poly(A)", en: "m⁷G cap / poly(A)" }], ['#7a62e0', { nl: 'EJC & kapbindende eiwitten', en: 'EJC & cap-binding proteins' }],
    ['#d06bd8', { nl: 'transporteiwit (NXF1–NXT1)', en: 'transport protein (NXF1–NXT1)' }], ['#5a8fd6', { nl: 'exportlabel (TREX)', en: 'export tag (TREX)' }], ['#9db4d8', { nl: 'kernporie (nucleoporinen)', en: 'nuclear pore (nucleoporins)' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Richting komt niet van RanGTP maar van de ATPase DDX19 aan de cytoplasmatische kant: die haalt NXF1 van het mRNA, zodat het niet meer terug kan glijden. Vergelijk met <b>Exportine-5</b> (pre-miRNA) en CRM1, die wél RanGTP gebruiken.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Directionality does not come from RanGTP but from the ATPase DDX19 on the cytoplasmic side: it strips NXF1 off the mRNA so it cannot slide back. Compare <b>Exportin-5</b> (pre-miRNA) and CRM1, which do use RanGTP.</p>' },
  simplified: {
    nl: 'Niet op schaal: de kernporie is ≈ 120 nm breed (≈ 110 MDa, ≈ 30 soorten nucleoporinen in 8-voudige symmetrie), een mRNP is veel langer en dichter bepakt dan getekend. Slechts enkele eiwitten zijn getoond; SR-eiwitten, THOC5, CHTOP en andere adaptoren zijn weggelaten. De richting waarin het mRNA door de porie gaat (hier kapje voorop) is een voorbeeld. De EJC\'s worden pas door het eerste ribosoom verwijderd; de volgorde van de CBC→eIF4E-wissel ten opzichte van die eerste ronde is vereenvoudigd.',
    en: 'Not to scale: the nuclear pore is ≈ 120 nm wide (≈ 110 MDa, ≈ 30 kinds of nucleoporins in 8-fold symmetry), and an mRNP is much longer and more densely packed than drawn. Only a few proteins are shown; SR proteins, THOC5, CHTOP and other adaptors are omitted. The direction in which the mRNA passes the pore (here cap first) is an example. EJCs are only removed by the first ribosome; the timing of the CBC→eIF4E exchange relative to that first round is simplified.' },
  steps: [
    ST(7000, cam(520, 690, 1050), "Het rijpe mRNA in de kern", "The mature mRNA in the nucleus",
      "Het rijpe mRNA is ingepakt met eiwitten: op het kapje, bij elke naad tussen exonen en op de staart.",
      "The mature mRNA is packed with proteins: on the cap, at each seam between exons and on the tail."),
    ST(7000, cam(665, 690, 820), "Het mRNA krijgt een exportlabel", "The mRNA gets an export tag",
      "Een groep eiwitten hecht zich aan het mRNA. Alleen goed afgewerkt mRNA krijgt zo een ‘exportlabel’.",
      "A group of proteins attaches to the mRNA. Only properly finished mRNA gets this ‘export tag’."),
    ST(7500, cam(545, 690, 1000), "Een gids voor de poort", "A guide for the gate",
      "Het mRNA wordt doorgegeven aan een transporteiwit (exportreceptor) dat het door de kernporie loodst.",
      "The mRNA is handed to a transport protein (export receptor) that guides it through the nuclear pore."),
    ST(7500, cam(888, 520, 1150), "Aanmeren bij de poort", "Docking at the gate",
      "Het mRNA meert aan bij een kernporie: een reusachtig kanaal in de kernwand, vol losse eiwitdraden.",
      "The mRNA docks at a nuclear pore: a huge channel in the nuclear envelope, full of loose protein strands."),
    ST(8500, cam(960, 505, 1000), "Door de poort", "Through the gate",
      "Het transporteiwit grijpt telkens even die draden vast. Zo glipt het mRNA erdoor.",
      "The transport protein keeps briefly grabbing those strands. So the mRNA slips through."),
    ST(8500, cam(960, 330, 900), "Geen weg terug", "No way back",
      "Buiten de kern trekt een enzym, met energie uit ATP, het transporteiwit los. Het mRNA kan niet meer terug.",
      "Outside the nucleus an enzyme, using energy from ATP, pulls the transport protein off. The mRNA cannot go back."),
    ST(7500, cam(760, 400, 1450), "Het transporteiwit keert terug", "The transport protein goes back",
      "Het hele mRNA is nu buiten de kern. Het transporteiwit gaat terug de kern in voor een volgende ronde.",
      "The whole mRNA is now outside the nucleus. The transport protein goes back in for another round."),
    ST(8500, cam(520, 243, 1050), "Het eerste ribosoom ruimt op", "The first ribosome clears the way",
      "Het eerste ribosoom duwt de merktekens eraf. Blijft er één na het stopsein liggen, dan volgt afbraak.",
      "The first ribosome pushes the markers off. If one stays beyond the stop signal, breakdown follows."),
    ST(9000, cam(560, 250, 1350), "Klaar om eiwit te maken", "Ready to make protein",
      "Nieuwe eiwitten nemen kapje en staart over; een ander eiwit verbindt ze tot een lus.",
      "New proteins take over the cap and the tail; another protein links them into a loop."),
  ],
  loop: true,
  svg() {
    // kernenvelop: buiten- en binnenmembraan (dubbellagen) met de perinucleaire ruimte ertussen; aan de porie lopen ze in elkaar over
    const env = kernEnvelopLijn(-600, 2200, (Y_OUT + Y_IN) / 2, { poriën: [PX], poreW: 216, w: 24, gap: Y_IN - Y_OUT - 24, npc: false });
    // kernporiecomplex: per kant drie eiwitringen (cytoplasmatische ring, binnenring, kernring) in de poriewand
    const npcWand = [-1, 1].map(k => [[Y_OUT - 4, 26, 20, 1], [(Y_OUT + Y_IN) / 2, 22, 24, 2], [Y_IN + 4, 26, 20, 3]].map(([y, rx, ry, sd]) => {
      const d = eiwitPad(PX + k * 105, y, rx, ry, 80 + sd + (k > 0 ? 5 : 0), .07);
      return `<path d="${d}" fill="#0b1224"/><path d="${d}" fill="#3b4a72" stroke="#9db4d8" stroke-width="3"/>`;
    }).join('')).join('');
    let fil = '';
    for (const [x0, sgn] of [[PX - 92, -1], [PX - 60, -1], [PX + 60, 1], [PX + 92, 1]])
      fil += `<path d="M${x0},${Y_OUT - 16} C${x0 + sgn * 10},${Y_OUT - 50} ${x0 - sgn * 14},${Y_OUT - 80} ${x0 + sgn * 18},${Y_OUT - 110}" stroke="#9db4d8" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const bask = [PX - 100, PX - 55, PX + 55, PX + 100].map(x0 => `<path d="M${x0},${Y_IN + 20} Q${lerp(x0, PX, .3)},${Y_IN + 90} ${lerp(x0, PX, .55)},${Y_IN + 140}" stroke="#9db4d8" stroke-width="5" fill="none"/>`).join('');
    return svgOpen() + `
    <rect x="-600" y="${Y_IN}" width="2800" height="1400" fill="url(#gNuc)" opacity=".55"/>
    ${note(60, 110, T2('cytoplasma', 'cytoplasm'), C.muted, 20, 'start')}
    ${note(60, 560, T2('kern (nucleoplasma)', 'nucleus (nucleoplasm)'), C.muted, 20, 'start')}
    <g data-node="kernimport" data-color="#9db4d8" data-label="${T2('Kernporie (NPC)', 'Nuclear pore complex')}">
      ${env}${npcWand}
      ${fil}${bask}
      <ellipse cx="${PX}" cy="${Y_IN + 142}" rx="58" ry="11" fill="none" stroke="#9db4d8" stroke-width="5"/>
      <circle data-anchor="kernimport" cx="${PX + 170}" cy="${Y_IN + 150}" r="1" fill="none" data-pos="below"/>
      <g id="ex-fg"></g>
    </g>
    <g id="ex-nplab"></g>
    <g id="ex-static"></g>
    <g data-node="rnaprocessing" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-label="${T2('mRNA in 3D', 'mRNA in 3D')}"><g id="ex-mrna"></g><circle id="ex-mA" data-anchor="rnaprocessing" r="1" fill="none"/></g>
    <g data-node="capping" data-color="${C.cap}" data-nolabel><g id="ex-cap"></g></g>
    <g id="ex-prot"></g>
    <g id="ex-ejc"></g>
    <g data-node="nmd" data-color="#7a62e0" data-label="${T2('EJC → NMD-controle', 'EJC → NMD check')}"><circle id="ex-eA" data-anchor="nmd" r="16" fill="transparent"/></g>
    <g data-node="polya" data-color="${C.cap}" data-nolabel><g id="ex-pa"></g></g>
    <g data-node="mrnaafbraak" data-color="${C.cap}" data-label="${T2('poly(A) → later afbraak', 'poly(A) → later decay')}"><circle id="ex-pA" data-anchor="mrnaafbraak" r="14" fill="transparent"/></g>
    <g data-node="lokalisatie" data-color="#ffd166" data-label="${T2('Adreslabel → naar een vaste plek', 'Address label → to a fixed place')}"><circle id="ex-lA" data-anchor="lokalisatie" r="14" fill="transparent"/></g>
    <g data-node="initiatie" data-color="${C.rrna}" data-label="${T2('→ Translatie-initiatie', '→ Translation initiation')}"><g id="ex-ribo"></g><circle id="ex-rA" data-anchor="initiatie" r="1" fill="none"/></g>
    <g data-node="rnai" data-color="#9b7bff" data-label="${T2('miRNA’s remmen mRNA’s', 'miRNAs repress mRNAs')}"><g id="ex-risc"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const P = polyPath(PATH);
    // sleutelposities langs het pad
    const sAtY = (y, from) => { let s = from; while (P.at(s)[1] > y && s < P.total) s += 1; return s; };
    const sCurve = 800;                                     // einde van het rechte stuk in de kern
    const sBasket = sAtY(Y_IN + 150, sCurve);
    const sTop = sAtY(342, sBasket);
    const sRel = sAtY(372, sBasket);                        // hoogte van DDX19
    let sH0 = sTop; while (P.at(sH0)[0] > 880.5 && sH0 < P.total) sH0 += 1;
    const S0 = 800, sDock = sBasket - 12, sOut = sTop + 70, sPass = sH0 + 160, sFin = sH0 + (880 - 150);
    const H = [S0, S0, S0, S0, sDock, sOut, sPass, sFin, sFin, sFin];
    const tang = s => { const a = P.at(s - 2), b = P.at(s + 2), l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
    const side = (s, off) => { const p = P.at(s), t = tang(s); return [p[0] + t[1] * off, p[1] - t[0] * off]; };   // off>0: "links" van de rijrichting

    return {
      update(t, st) {
        const { step, p } = st;
        const e = ease(p);
        const head = lerp(H[step], H[step + 1], step >= 3 && step <= 6 ? e : 0);
        const sOf = d => head - d;

        // FG-herhalingen (deterministisch golvend)
        let fg = '';
        for (let k = 0; k < 7; k++) {
          const y = Y_OUT - 6 + k * 16, w = Math.sin(t / 380 + k * 1.3) * 10;
          fg += `<path d="M${PX - 82},${y} q30,${f1(w)} 58,${f1(-w * .6 + 6)}" stroke="#c7a6ff" stroke-width="2.5" fill="none" opacity=".75"/>` +
            `<path d="M${PX + 82},${y + 8} q-30,${f1(-w)} -58,${f1(w * .6 - 6)}" stroke="#c7a6ff" stroke-width="2.5" fill="none" opacity=".75"/>`;
        }
        $('ex-fg').innerHTML = fg;
        const npOp = step >= 3 && step <= 5 ? 1 : 0;
        $('ex-nplab').innerHTML = note(PX - 140, Y_IN + 110, T2('kernkorf', 'nuclear basket'), '#aab8dc', 18, 'end', npOp) +
          note(PX - 160, Y_OUT + 50, T2('eiwitdraden', 'protein strands'), '#e0cbff', 19, 'end', step >= 3 && step <= 4 ? 1 : 0) +
          note(PX + 120, Y_OUT - 90, T2('cytoplasmatische filamenten', 'cytoplasmic filaments'), '#aab8dc', 18, 'start', step === 5 ? 1 : 0);

        // mRNA-streng (+ poly(A) apart)
        const pts = [], ptsA = [];
        for (let d = 0; d <= LEN; d += 6) (d <= D.pa0 ? pts : ptsA).push(P.at(sOf(d)));
        ptsA.unshift(P.at(sOf(D.pa0)));
        let m = `<path d="${dpath(pts)}" stroke="${C.rna}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
        // stopcodon-merkje
        const so = P.at(sOf(D.stop));
        m += `<circle cx="${f1(so[0])}" cy="${f1(so[1])}" r="7" fill="${C.danger}" stroke="#fff" stroke-width="1.5"/>`;
        if (step >= 7) { const q = side(sOf(D.stop), 34); m += note(q[0], q[1] + 6, T2('stopcodon', 'stop codon'), C.danger, 18); }
        const hp = P.at(head), c5 = side(head + 22, 0);
        const tail = P.at(sOf(LEN));
        m += note(c5[0] + (step >= 6 ? -26 : 34), c5[1] + (step >= 6 ? -18 : 42), "5′", C.text, 20) + note(tail[0] + (step >= 6 ? 10 : -22), tail[1] + (step >= 6 ? 36 : -18), "3′", C.text, 20);
        $('ex-mrna').innerHTML = m;
        // stap 8: label voorbij het stopcodon, niet over het ribosoom
        const mid = step <= 3 ? side(sOf(520), 30) : step === 7 ? side(sOf(700), 64) : step >= 6 ? side(sOf(300), -40) : [-9999, -9999]; $('ex-mA').setAttribute('cx', f1(mid[0])); $('ex-mA').setAttribute('cy', f1(mid[1]));

        // poly(A) + PABPN1 → PABPC1
        const exch = step === 8 ? ease(sub(p, .1, .5)) : 0;
        let pa = `<path d="${dpath(ptsA)}" stroke="${C.cap}" stroke-width="7" fill="none" stroke-dasharray="3 3" stroke-linecap="round"/>`;
        D.pab.forEach((d, i) => {
          const q = side(sOf(d), -22);
          pa += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="13" fill="${exch > .5 ? '#6f5bd6' : '#7a62e0'}" stroke="#0a1224" stroke-width="1.5"/>`;
        });
        const pl = side(sOf(684), -56);
        pa += note(pl[0], pl[1] + 6, exch > .5 ? 'PABPC1' : 'PABPN1', '#9a8fc4', 15, 'middle', step >= 6 ? 1 : (step <= 2 ? 1 : 0));
        const pt = side(sOf(680), 26); pa += step <= 1 ? note(pt[0], pt[1], 'poly(A)', C.cap, 18) : '';   // boven de staart zelf
        $('ex-pa').innerHTML = pa;
        // stap 9: label naast de staart, niet op de lus-lijn
        const pA = step === 8 ? (q => [q[0] + 120, q[1] + 10])(P.at(sOf(LEN))) : side(sOf(684), step >= 6 ? -90 : -80); $('ex-pA').setAttribute('cx', f1(pA[0])); $('ex-pA').setAttribute('cy', f1(pA[1]));
        const lA = step === 8 && p > .5 ? side(sOf(430), 120) : [-9999, -9999]; $('ex-lA').setAttribute('cx', f1(lA[0])); $('ex-lA').setAttribute('cy', f1(lA[1]));   // zijpad RNA-lot
        svg.querySelector('[data-node="mrnaafbraak"]').setAttribute('opacity', step === 8 ? f1(sub(p, .5, .7)) : '0');

        // cap + CBC / eIF4E
        let pr = '';
        const capP = side(head + 16, 0);
        pr += capG(capP[0], capP[1], 22);
        const cbcP = side(head + 14, 36), cbc0 = side(head + 58, 44);   // CBC iets verder langs het mRNA: de cap blijft zichtbaar; schuift bij de wissel naar de plek van eIF4E
        pr += prot(lerp(cbc0[0], cbcP[0], exch), lerp(cbc0[1], cbcP[1], exch), 60, 30, 'CBC', '#6a5bb0', 1 - exch, 15);
        pr += prot(cbcP[0], cbcP[1], 70, 30, 'eIF4E', '#6a5bb0', exch, 15);
        $('ex-cap').innerHTML = pr; pr = '';
        // TREX: stap 1 bindt, stap 2 wordt NXF1 geladen, UAP56/THO gaan weg, ALYREF blijft tot aan de porie
        const trexIn = step === 1 ? ease(sub(p, 0, .45)) : step === 2 ? 1 - ease(sub(p, .55, 1)) : 0;
        const alyOp = step === 1 ? ease(sub(p, 0, .45)) : step === 2 ? 1 : step === 3 ? 1 - ease(sub(p, .3, .8)) : 0;
        const tA = side(sOf(84), 34), tB = side(sOf(70), 72), tC = side(sOf(165), 72);
        pr += prot(tA[0], tA[1], 84, 30, 'ALYREF', '#4f73a8', alyOp, 14);
        pr += prot(tB[0], tB[1], 64, 30, 'THO', '#46658f', trexIn, 14);
        pr += prot(tC[0], tC[1], 78, 30, 'UAP56', '#46658f', trexIn, 14);
        if (step === 1 || step === 2) pr += note((tB[0] + tC[0]) / 2, tB[1] - 46, T2('exportlabel', 'export tag'), '#9cc0ff', 24, 'middle', trexIn) +
          note((tB[0] + tC[0]) / 2, tB[1] - 24, '(TREX)', '#9cc0ff', 15, 'middle', trexIn);
        if (step === 2) pr += note(tC[0] - 90, tC[1] + 6, 'ATP → ADP', '#5fd3e6', 18, 'middle', sub(p, .1, .3) * (1 - sub(p, .6, .9)));
        // NXF1–NXT1
        const nxfIn = step < 2 ? 0 : step === 2 ? ease(sub(p, .2, .6)) : 1;
        D.nxf.forEach((d, i) => {
          const s0 = sOf(d);
          const k = clamp((s0 - sRel) / 110);
          let q = side(s0, -36);
          if (k > 0) q = [q[0] + k * 170, q[1] - k * 30];
          const op = nxfIn * (1 - k);
          /* één transporteiwit met naam (het voorste); de andere kopieën dezelfde kleur, zonder tekst, zodat ze de EJC's niet overlappen */
          pr += i === 0 ? prot(q[0], q[1], 138, 34, T2('transporteiwit', 'transport protein'), '#d06bd8', op, 16) : prot(q[0], q[1], 64, 30, '', '#d06bd8', op, 14);
          if (i === 0 && step >= 2 && step <= 4) pr += note(q[0], q[1] + 38, 'NXF1·NXT1', '#e7a6ee', 14, 'middle', op);
        });
        // NXF1–NXT1 keert terug door het centrale kanaal van de porie (niet door de envelop)
        if (step === 6) pr += `<path d="M${PX + 180},330 C${PX + 50},336 ${PX + 22},366 ${PX + 22},420 L${PX + 22},600" stroke="#d06bd8" stroke-width="3" fill="none" marker-end="url(#arrow)" opacity="${f1(sub(p, .2, .5))}"/>` +
          note(PX + 130, 610, T2('transporteiwit → terug de kern in', 'transport protein → back into the nucleus'), '#e7a6ee', 20, 'start', sub(p, .2, .5));
        // DDX19 + Gle1 aan de filamenten
        const ddxOp = step >= 3 ? 1 : 0;
        const pulse = step === 5 ? .5 + .5 * Math.sin(t / 160) : 0;
        pr += `<g opacity="${ddxOp}"><circle cx="${PX - 150}" cy="${Y_OUT - 86}" r="${f1(34 + 6 * pulse)}" fill="none" stroke="#ffd36b" stroke-width="2" opacity="${f1(pulse * .8)}"/></g>`;
        pr += prot(PX - 150, Y_OUT - 86, 108, 36, T2('losmaker', 'releaser'), '#b8862a', ddxOp, 18);
        pr += note(PX - 150, Y_OUT - 118, 'DDX19', '#e7c98a', 14, 'middle', ddxOp);
        pr += prot(PX - 170, Y_OUT - 42, 60, 28, 'Gle1', '#6e5a36', ddxOp, 14);
        if (step === 5) pr += note(PX - 220, Y_OUT - 86, T2('ATP', 'ATP'), '#5fd3e6', 20, 'end', sub(p, .15, .35));
        $('ex-prot').innerHTML = pr;

        // EJC's: vallen af als het pioniersribosoom passeert
        const rd = step === 7 ? lerp(-30, D.stop, ease(sub(p, .05, .85))) : step === 8 ? D.stop : -999;
        let ej = '';
        D.ejc.forEach(d => {
          const k = step >= 7 ? clamp((rd - d + 40) / 60) : 0;
          const q = side(sOf(d), -30);
          ej += prot(q[0], q[1] - k * 90, 52, 30, 'EJC', '#6a5bb0', 1 - k, 15);
        });
        $('ex-ejc').innerHTML = ej;
        const eq = side(sOf(D.ejc[0]), -52); $('ex-eA').dataset.pos = 'below'; $('ex-eA').setAttribute('cx', f1(eq[0])); $('ex-eA').setAttribute('cy', f1(eq[1]));
        svg.querySelector('[data-node="nmd"]').setAttribute('opacity', step <= 2 || (step === 7 && rd < D.ejc[0] - 20) ? '1' : '0');

        // ribosomen
        let rb = '';
        if (step === 7) { const q = P.at(sOf(Math.max(0, rd))); rb += ribo(q[0], q[1], .95, sub(p, 0, .12) * (1 - sub(p, .9, 1)), '80S', { keten: lerp(0, 50, ease(sub(p, .05, .85))) }); }
        if (step === 8) {
          const a = ease(sub(p, .45, .85));
          const q = P.at(sOf(10));
          rb += prot(capP[0] + 82, capP[1] - 64, 104, 34, T2('verbinder', 'linker'), '#6f5bd6', exch, 16) + note(capP[0] + 82, capP[1] - 36, 'eIF4G', '#b9a6ff', 14, 'middle', exch) + prot(capP[0] + 40, capP[1] - 100, 56, 28, 'eIF4A', '#4f4690', exch, 13);
          // gesloten lus: eIF4G ↔ PABPC1
          const pq = side(sOf(684), -22);
          rb += `<path d="M${f1(capP[0] + 112)},${f1(capP[1] - 64)} C${f1(capP[0] + 300)},${f1(capP[1] - 190)} ${f1(pq[0])},${f1(pq[1] - 200)} ${f1(pq[0])},${f1(pq[1] - 16)}" stroke="#b9a6ff" stroke-width="3" fill="none" stroke-dasharray="7 6" opacity="${f1(sub(p, .3, .5))}"/>`;
          rb += note((capP[0] + pq[0]) / 2 + 60, capP[1] - 176, T2('kapje en staart vormen een lus', 'cap and tail form a loop'), '#b9a6ff', 20, 'middle', sub(p, .3, .5));
          // 43S = kleine eenheid (40S) met initiatiefactoren en het start-tRNA, nog zonder grote eenheid
          const d43 = eiwitPad(0, 22, 56, 25, 40, .07);
          rb += `<g opacity="${f1(a)}" transform="translate(${f1(q[0] + 70)} ${f1(q[1] + 8)})"><path d="${d43}" fill="#0b1224"/><path d="${d43}" fill="#8df0dc" fill-opacity=".36" stroke="#8df0dc" stroke-width="3"/>` +
            trna2dSpan([-8, 1], [-4, -26], { col: C.trna, mini: true, aaCol: '#7fdc6a' }) +   // start-tRNA (Met) op de kleine eenheid: gedeeld tRNA-symbool
            `<text x="0" y="30" font-size="17" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">43S</text></g>`;
        }
        $('ex-ribo').innerHTML = rb;
        const rA = step === 8 ? P.at(sOf(10)) : step === 7 ? P.at(sOf(Math.max(0, rd))) : [-9999, -9999];
        $('ex-rA').setAttribute('cx', f1(rA[0] + (step === 8 ? 0 : 0))); $('ex-rA').setAttribute('cy', f1(rA[1] + (step === 8 ? 118 : -100)));
        $('ex-rA').dataset.pos = step === 8 ? 'below' : '';
        svg.querySelector('[data-node="initiatie"]').setAttribute('opacity', step >= 7 ? '1' : '0');

        // miRNA-hint (RISC) in de laatste stap
        const rq = step === 8 ? sub(p, .6, .8) : 0;
        $('ex-risc').innerHTML = prot(1060, 110, 168, 41, 'miRNA·AGO2', '#9b7bff', rq, 18);
      },
    };
  },
};
