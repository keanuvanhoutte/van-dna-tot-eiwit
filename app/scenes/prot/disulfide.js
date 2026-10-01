import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, lerpPts } from './_b_kit.js';

/* Paneel A (x 0–1600): ketens + PDI + Ero1 in het ER-lumen · Paneel B (x 1700–3300): ER vs cytosol · Paneel C (x 3400–5000): insuline */
const SS = '#ffc247';
const EXT = Array.from({ length: 11 }, (_, i) => [150 + i * 130, 520 + 34 * Math.sin(i * 1.3)]);
const FOLD = [[520, 340], [600, 410], [720, 470], [640, 560], [700, 665], [800, 610], [900, 665], [960, 560], [880, 470], [980, 400], [1060, 340]];
const IA = 2, IC = 5, IB = 8;               // Cys A (12), Cys C (30), Cys B (58)
const PDI0 = [900, 225];
const PDI5 = [1200, 420];                   // PDI tijdens isomerisatie                    // PDI-positie (omgekeerde U); actieve plaats van domein a onderaan links

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'disulfide',
  title: { nl: 'Disulfidebruggen', en: 'Disulfide bonds' },
  scale: { nl: 'S–S-binding ≈ 2,05 Å · PDI ≈ 10 nm', en: 'S–S bond ≈ 2.05 Å · PDI ≈ 10 nm' },
  time: { nl: 'seconden tot minuten (tijdens en na de translatie)', en: 'seconds to minutes (during and after translation)' },
  org: { nl: 'mens (ER-lumen)', en: 'human (ER lumen)' },
  legend: [[C.chain, { nl: 'polypeptideketen', en: 'polypeptide chain' }], [SS, { nl: 'Cys / disulfidebrug', en: 'Cys / disulfide bond' }], [C.prot, 'PDI (a–b–b′–a′)'], [C.prot2, 'Ero1 (FAD)'], ['#5fd3e6', { nl: 'elektronen (e⁻)', en: 'electrons (e⁻)' }]],
  simplified: {
    nl: 'De keten is een schets en het residu-nummer (Cys 12, 30, 58) is fictief. PDI is getekend als vier bolletjes (domeinen a, b, b′, a′), de echte structuur is een U-vorm van vier thioredoxinedomeinen. Elektronen zijn als deeltjes getekend; in werkelijkheid gebeurt de overdracht via thiol-disulfide-uitwisseling (thiolaat-aanval). Naast Ero1 kunnen ook andere routes PDI heroxideren (bv. peroxiredoxine 4).',
    en: 'The chain is a sketch and the residue numbers (Cys 12, 30, 58) are fictitious. PDI is drawn as four balls (domains a, b, b′, a′); the real structure is a U shape of four thioredoxin domains. Electrons are drawn as particles; in reality transfer happens by thiol–disulfide exchange (thiolate attack). Besides Ero1, other routes can reoxidise PDI (e.g. peroxiredoxin 4).' },
  steps: [
    ST(7000, cam(800, 480, 1600), 'Twee cysteïnes, ver uit elkaar', 'Two cysteines, far apart',
      'In de aminozuurvolgorde liggen Cys 12 en Cys 58 ver uit elkaar. Elk heeft een thiolgroep (–SH).',
      'In the amino acid order, Cys 12 and Cys 58 lie far apart. Each has a thiol group (–SH).'),
    ST(7000, cam(800, 500, 1100), 'De vouwing brengt ze samen', 'Folding brings them together',
      'Door de vouwing komen de twee Cys in de ruimte naast elkaar te liggen: nu kan een brug ontstaan.',
      'Folding places the two Cys next to each other in space: now a bridge can form.'),
    ST(8000, cam(960, 470, 1300), 'Oxidatie: 2 –SH → –S–S–', 'Oxidation: 2 –SH → –S–S–',
      'Een disulfidebrug is een sterke (covalente) binding. Om ze te vormen moeten 2 elektronen weg: dat heet een oxidatie.',
      'A disulfide bond is a strong (covalent) bond. Forming it requires removing 2 electrons: that is called an oxidation.'),
    ST(8500, cam(850, 420, 1050), 'PDI geeft de brug door', 'PDI hands over the bond',
      'Het enzym PDI heeft zelf een S–S-brug in zijn actieve plaats en geeft die door aan het eiwit dat vouwt.',
      'The enzyme PDI carries an S–S bridge in its own active site and passes it on to the folding protein.'),
    ST(8500, cam(1080, 330, 1150), 'Ero1 laadt PDI weer op', 'Ero1 recharges PDI',
      'PDI is nu \'leeg\' (2 –SH). Het enzym Ero1 neemt de elektronen over en geeft ze aan zuurstof (O₂): er ontstaat H₂O₂.',
      'PDI is now \'empty\' (2 –SH). The enzyme Ero1 takes over the electrons and passes them to oxygen (O₂), producing H₂O₂.'),
    ST(9000, cam(960, 500, 1150), 'Foute brug? PDI schuift', 'Wrong bond? PDI shuffles',
      'Soms worden de verkeerde Cys verbonden (12–30). PDI breekt die foute brug en helpt de juiste (12–58) vormen.',
      'Sometimes the wrong Cys are joined (12–30). PDI breaks that wrong bond and helps the correct one (12–58) form.'),
    ST(8500, cam(2500, 470, 1510), 'Waarom in het ER en niet in het cytosol?', 'Why in the ER and not in the cytosol?',
      'Het ER is oxiderend: daar kunnen bruggen ontstaan. Het cytosol is sterk reducerend, dus daar blijven Cys meestal –SH.',
      'The ER is oxidising: bridges can form there. The cytosol is strongly reducing, so there Cys mostly stay –SH.'),
    ST(8500, cam(4150, 470, 1800), 'Voorbeeld: insuline', 'Example: insulin',
      'Insuline heeft 3 disulfidebruggen: 2 tussen zijn A- en B-keten en 1 binnen de A-keten. Vooral eiwitten die de cel verlaten, worden zo verstevigd.',
      'Insulin has 3 disulfide bonds: 2 between its A and B chains and 1 within the A chain. Especially proteins that leave the cell are reinforced this way.'),
  ],
  svg() {
    // insuline (paneel C): A-keten 21 aa, B-keten 30 aa
    const ax = i => 3560 + i * 44, bx = i => 3470 + i * 44, AY = 400, BY = 600;
    let ins = '';
    ins += `<path d="M${ax(1)},${AY} H${ax(21)}" stroke="${C.chain}" stroke-width="6"/><path d="M${bx(1)},${BY} H${bx(30)}" stroke="#4fae3f" stroke-width="6"/>`;
    const cysA = [6, 7, 11, 20], cysB = [7, 19];
    for (let i = 1; i <= 21; i++) ins += `<circle cx="${ax(i)}" cy="${AY}" r="${cysA.includes(i) ? 17 : 12}" fill="${cysA.includes(i) ? SS : C.chain}" stroke="#0a1224" stroke-width="2"/>`;
    for (let i = 1; i <= 30; i++) ins += `<circle cx="${bx(i)}" cy="${BY}" r="${cysB.includes(i) ? 17 : 12}" fill="${cysB.includes(i) ? SS : '#4fae3f'}" stroke="#0a1224" stroke-width="2"/>`;
    // bruggen: A6–A11 (intra), A7–B7, A20–B19 (inter)
    ins += `<path d="M${ax(6)},${AY - 17} C${ax(6)},${AY - 90} ${ax(11)},${AY - 90} ${ax(11)},${AY - 17}" stroke="${SS}" stroke-width="6" fill="none"/>`;
    ins += `<line x1="${ax(7)}" y1="${AY + 17}" x2="${bx(7)}" y2="${BY - 17}" stroke="${SS}" stroke-width="6"/><line x1="${ax(20)}" y1="${AY + 17}" x2="${bx(19)}" y2="${BY - 17}" stroke="${SS}" stroke-width="6"/>`;
    ins += T((ax(6) + ax(11)) / 2, AY - 100, 'A6–A11', { size: 26, col: SS, w: 700 }) + T((ax(7) + bx(7)) / 2 - 76, 512, 'A7–B7', { size: 26, col: SS, w: 700 }) + T((ax(20) + bx(19)) / 2 + 90, 512, 'A20–B19', { size: 26, col: SS, w: 700 });
    ins += T(ax(1) - 30, AY + 9, T2('A-keten (21 aa)', 'A chain (21 aa)'), { size: 26, col: C.chain, anchor: 'end' }) + T(bx(1) - 30, BY + 9, T2('B-keten (30 aa)', 'B chain (30 aa)'), { size: 26, col: '#4fae3f', anchor: 'end' });
    ins += T(4200, 250, T2('Insuline (mens)', 'Insulin (human)'), { size: 36, w: 800 });
    ins += T(4200, 730, T2('uit één proinsulineketen; C-peptide later weggeknipt', 'from one proinsulin chain; C-peptide cut out later'), { size: 27, col: '#c9d2e4', w: 500 });

    // paneel B: twee compartimenten
    let cmp = panel(1760, 170, 700, 580, { col: C.mem, fill: 'rgba(201,165,116,.08)' }) + panel(2540, 170, 700, 580, { col: '#5fd3e6', fill: 'rgba(95,211,230,.06)' });
    cmp += T(2110, 225, T2('ER-lumen: oxiderend', 'ER lumen: oxidising'), { size: 28, col: C.mem, w: 800 }) + T(2890, 225, T2('cytosol: reducerend', 'cytosol: reducing'), { size: 28, col: '#5fd3e6', w: 800 });
    cmp += T(2110, 275, 'GSH : GSSG ≈ 1:1 – 3:1', { size: 24, font: 'JetBrains Mono', w: 700 }) + T(2890, 275, T2('GSH : GSSG ≈ 30:1 – 100:1 (cel)', 'GSH : GSSG ≈ 30:1 – 100:1 (cell)'), { size: 22, font: 'JetBrains Mono', w: 700 });
    cmp += TL(2110, 640, [T2('PDI + Ero1 aanwezig', 'PDI + Ero1 present'), T2('→ disulfidebruggen vormen', '→ disulfide bonds form')], { size: 22, col: C.text });
    cmp += TL(2890, 640, [T2('glutathion en thioredoxine', 'glutathione and thioredoxin'), T2('houden Cys als –SH', 'keep Cys as –SH')], { size: 22, col: C.text });
    return svgOpen(arrowDefs('ds', { m: C.muted, e: '#5fd3e6' })) + `
    <rect x="0" y="80" width="1600" height="760" rx="30" fill="rgba(201,165,116,.05)"/>
    ${T(40, 130, T2('ER-lumen (oxiderend)', 'ER lumen (oxidising)'), { size: 22, col: C.mem, anchor: 'start' })}
    <g data-node="tertiair" data-color="${C.chain}" data-label="${T2('Tertiaire structuur', 'Tertiary structure')}"><g id="ds-chain"></g><circle id="ds-chainA" data-anchor="tertiair" r="1" fill="none"/></g>
    <g id="ds-bond"></g>
    <g id="ds-pdi"></g>
    <g id="ds-ero"></g>
    <g id="ds-e"></g>
    <g id="ds-lbl"></g>
    <g id="ds-cmp">${cmp}</g>
    <g id="ds-cmpdyn"></g>
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('→ Golgi & secretie', '→ Golgi & secretion')}">${ins}<circle data-anchor="golgi" cx="4200" cy="215" r="1" fill="none"/></g>
    <g data-node="glyco" data-color="#00A651" data-label="${T2('Ook in het ER: N-glycosylatie', 'Also in the ER: N-glycosylation')}"><rect x="1760" y="170" width="700" height="580" fill="transparent"/><circle data-anchor="glyco" cx="2110" cy="165" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const cys = (x, y, lab, sh, op = 1) => `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="24" fill="${SS}" stroke="#0a1224" stroke-width="2"/>` + T(x, y + 6, 'Cys', { size: 17, col: '#0a1224', halo: false, w: 800 }) +
      (lab ? T(x, y - 36, lab, { size: 23, col: SS }) : '') + (sh ? T(x + (sh === 'L' ? -48 : 48), y + 34, '–SH', { size: 20, col: '#fff', w: 700 }) : '') + '</g>';
    const pdiAt = (x, y, ox, op = 1, lab = true) => {
      // omgekeerde U: a linksonder, b linksboven, b′ rechtsboven, a′ rechtsonder; actieve plaatsen onderaan a en a′
      let s = `<g opacity="${f1(op)}">`;
      [[-100, 40, 'a'], [-60, -50, 'b'], [60, -50, 'b′'], [100, 40, 'a′']].forEach(([dx, dy, l]) => s += `<ellipse cx="${x + dx}" cy="${y + dy}" rx="56" ry="46" fill="${C.prot}" fill-opacity=".32" stroke="${C.prot}" stroke-width="3"/>` + T(x + dx, y + dy + 7, l, { size: 20, col: '#fff' }));
      for (const dx of [-100, 100]) {
        const ay = y + 92;
        if (ox) s += `<circle cx="${x + dx - 12}" cy="${ay}" r="8" fill="${SS}"/><circle cx="${x + dx + 12}" cy="${ay}" r="8" fill="${SS}"/><line x1="${x + dx - 4}" y1="${ay}" x2="${x + dx + 4}" y2="${ay}" stroke="${SS}" stroke-width="4"/>`;
        else s += `<circle cx="${x + dx - 14}" cy="${ay}" r="8" fill="${SS}"/><circle cx="${x + dx + 14}" cy="${ay}" r="8" fill="${SS}"/>` + T(x + dx, ay + 30, 'SH SH', { size: 14, col: '#fff' });
      }
      if (lab) s += T(x, y - 110, 'PDI', { size: 26, col: '#c9b8ff', w: 800 }) + T(x - 170, y + 98, 'CGHC', { size: 16, col: '#c9b8ff', font: 'JetBrains Mono', w: 700, anchor: 'end' });
      return s + '</g>';
    };
    const eDot = (x, y, op = 1) => op > .01 ? `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="15" fill="#5fd3e6"/>` + T(x, y + 6, 'e⁻', { size: 15, col: '#071022', halo: false, w: 800 }) + '</g>' : '';

    return {
      update(t, s) {
        const { step, p } = s;
        /* keten */
        const fk = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .8)) : 1;
        const pts = lerpPts(EXT, FOLD, fk);
        let cs = chain(pts, { w: 9 });
        const A = pts[IA], B = pts[IB], Cc = pts[IC];
        // brug-toestand
        let bondAB = 0, bondAC = 0, showC = step >= 5 ? 1 : 0;
        if (step === 2) bondAB = 0;
        if (step === 3) bondAB = ease(sub(p, .45, .7));
        if (step === 4) bondAB = 1;
        if (step === 5) { bondAC = 1 - ease(sub(p, .25, .45)); bondAB = ease(sub(p, .6, .8)); }
        cs += cys(A[0], A[1], step <= 1 || step === 5 ? 'Cys 12' : '', bondAB < .5 && bondAC < .5 ? 'L' : '');
        cs += cys(B[0], B[1], step <= 1 || step === 5 ? 'Cys 58' : '', bondAB < .5 ? 'R' : '');
        if (showC) cs += cys(Cc[0], Cc[1], 'Cys 30', bondAC < .5 ? 'R' : '', 1);
        $('ds-chain').innerHTML = cs;
        $('ds-chainA').setAttribute('cx', f1(pts[10][0] + 40)); $('ds-chainA').setAttribute('cy', f1(pts[10][1] - 20));
        let bd = '';
        if (bondAB > .01) bd += `<line x1="${f1(A[0] + 24)}" y1="${f1(A[1])}" x2="${f1(B[0] - 24)}" y2="${f1(B[1])}" stroke="${SS}" stroke-width="10" opacity="${f1(bondAB)}"/>` + T((A[0] + B[0]) / 2, A[1] - 16, 'S–S', { size: 22, col: SS, w: 800, op: bondAB });
        if (bondAC > .01) bd += `<line x1="${f1(A[0] + 10)}" y1="${f1(A[1] + 22)}" x2="${f1(Cc[0] - 10)}" y2="${f1(Cc[1] - 22)}" stroke="${C.danger}" stroke-width="10" opacity="${f1(bondAC)}"/>` + T((A[0] + Cc[0]) / 2 - 50, (A[1] + Cc[1]) / 2, T2('fout', 'wrong'), { size: 20, col: C.danger, w: 800, op: bondAC });
        $('ds-bond').innerHTML = bd;

        /* PDI */
        let pd = '';
        if (step === 3) { const k = ease(sub(p, 0, .35)); pd += pdiAt(lerp(1300, PDI0[0], k), lerp(120, PDI0[1], k), p < .55, 1); }
        if (step === 4) pd += pdiAt(PDI0[0], PDI0[1], p > .6, 1);
        if (step === 5) { const k = ease(sub(p, 0, .25)), out = ease(sub(p, .85, 1)); pd += pdiAt(lerp(1500, PDI5[0], k) + 300 * out, lerp(200, PDI5[1], k), false, 1 - out); }
        $('ds-pdi').innerHTML = pd;
        if (step === 5) {
          const mix = sub(p, .3, .45) * (1 - sub(p, .7, .8));
          $('ds-pdi').innerHTML += mix > .01 ? `<line x1="${f1(Cc[0] + 24)}" y1="${f1(Cc[1])}" x2="${PDI5[0] - 114}" y2="${PDI5[1] + 92}" stroke="${SS}" stroke-width="6" stroke-dasharray="8 5" opacity="${f1(mix)}"/>` + T(PDI5[0] - 40, PDI5[1] + 190, T2('gemengde disulfide (PDI–substraat)', 'mixed disulfide (PDI–substrate)'), { size: 18, col: SS, op: mix, anchor: 'start' }) : '';
        }
        /* Ero1 */
        let er = '';
        if (step === 4) {
          const k = ease(sub(p, 0, .3));
          er += enz(lerp(1500, 1200, k), 230, 110, 60, 'Ero1', { col: C.prot2, fs: 26, fillOp: .45, op: k, dy: -8 }) + tag(lerp(1500, 1200, k), 268, 'FAD', '#ffe08a', { fs: 15, op: k });
          er += T(1420, 130, 'O₂ → H₂O₂', { size: 24, font: 'JetBrains Mono', w: 700, col: '#9cc0ff', op: sub(p, .8, .95) });
        }
        $('ds-ero').innerHTML = er;
        /* elektronen */
        let e = '';
        if (step === 2) {
          const k = ease(sub(p, .3, .8));
          const mx = (A[0] + B[0]) / 2;
          e += eDot(mx - 30, A[1] + 30 + 160 * k, sub(p, .25, .35)) + eDot(mx + 30, A[1] + 30 + 160 * k, sub(p, .25, .35));
        }
        if (step === 3) { const k = ease(sub(p, .45, .7)); const tx = PDI0[0] - 100, ty = PDI0[1] + 92; e += eDot(lerp((A[0] + B[0]) / 2 - 20, tx - 14, k), lerp(A[1], ty, k), sub(p, .4, .45) * (1 - sub(p, .75, .8))) + eDot(lerp((A[0] + B[0]) / 2 + 20, tx + 14, k), lerp(A[1], ty, k), sub(p, .4, .45) * (1 - sub(p, .75, .8))); }
        if (step === 4) {
          const k1 = ease(sub(p, .3, .6)), k2 = ease(sub(p, .6, .85));
          const x = k2 > 0 ? lerp(1200, 1400, k2) : lerp(PDI0[0] - 100, 1200, k1), y = k2 > 0 ? lerp(230, 140, k2) : lerp(PDI0[1] + 92, 230, k1);
          const op = sub(p, .28, .32) * (1 - sub(p, .85, .9));
          e += eDot(x - 16, y, op) + eDot(x + 16, y, op);
        }
        $('ds-e').innerHTML = e;
        /* labels */
        let lb = '';
        if (step === 0) lb += T(800, 700, T2('ver uit elkaar in de sequentie (46 residuen)', 'far apart in the sequence (46 residues)'), { size: 22, col: C.muted, op: sub(p, .3, .5) });
        if (step === 2) {
          const k = sub(p, 0, .2);
          lb += panel(1080, 240, 480, 330, { op: k, col: SS });
          lb += T(1320, 300, 'Cys–SH + HS–Cys', { size: 24, font: 'JetBrains Mono', w: 700, op: k });
          lb += T(1320, 350, '↓  ' + T2('oxidatie', 'oxidation'), { size: 22, col: SS, op: k });
          lb += T(1320, 400, 'Cys–S–S–Cys', { size: 26, font: 'JetBrains Mono', w: 800, col: SS, op: k });
          lb += T(1320, 445, '+ 2 H⁺ + 2 e⁻', { size: 24, font: 'JetBrains Mono', w: 700, col: '#5fd3e6', op: k });
          lb += T(1320, 510, T2('de elektronen moeten ergens heen', 'the electrons have to go somewhere'), { size: 19, col: '#c9d2e4', w: 500, op: k });
          lb += T((A[0] + B[0]) / 2, A[1] + 240, T2('→ naar een acceptor', '→ to an acceptor'), { size: 20, col: '#5fd3e6', op: sub(p, .6, .8) });
        }
        if (step === 3) lb += T(PDI0[0] + 170, PDI0[1] + 150, p < .55 ? T2('PDI geoxideerd (S–S)', 'PDI oxidised (S–S)') : T2('PDI gereduceerd (2 –SH)', 'PDI reduced (2 –SH)'), { size: 20, col: '#c9b8ff', anchor: 'start', op: sub(p, .3, .45) });
        if (step === 4) lb += T(PDI0[0] + 170, PDI0[1] + 150, p > .6 ? T2('PDI weer geoxideerd → klaar voor de volgende', 'PDI oxidised again → ready for the next') : '', { size: 20, col: '#c9b8ff', anchor: 'start' });
        $('ds-lbl').innerHTML = lb;
        /* paneel B: dynamisch (ketens met/zonder brug) */
        let cd = '';
        const kb = step === 6 ? ease(sub(p, .2, .6)) : step > 6 ? 1 : 0;
        const mini = (x, y, bonded) => chain([[x - 150, y + 20], [x - 80, y - 40], [x, y + 30], [x + 80, y - 40], [x + 150, y + 20]], { w: 7 }) +
          `<circle cx="${x - 80}" cy="${y - 40}" r="16" fill="${SS}"/><circle cx="${x + 80}" cy="${y - 40}" r="16" fill="${SS}"/>` +
          (bonded ? `<line x1="${x - 64}" y1="${y - 40}" x2="${x + 64}" y2="${y - 40}" stroke="${SS}" stroke-width="8" opacity="${f1(kb)}"/>` + T(x, y - 56, 'S–S', { size: 22, col: SS, w: 800, op: kb })
            : T(x - 80, y - 66, 'SH', { size: 18, col: '#fff' }) + T(x + 80, y - 66, 'SH', { size: 18, col: '#fff' }));
        cd += mini(2110, 460, true) + mini(2890, 460, false);
        $('ds-cmpdyn').innerHTML = cd;
      },
    };
  },
};
