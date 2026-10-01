import { C, T2, svgOpen, cam, FULL, f1 } from '../../kit.js';
import { T, K, track, hot, tag, phos, bilayer, nucEnv, dna, mrna, adr, gpcr7, cAMP, anchor, ADRC, GTPC, GAC, GBC } from './_sig1.js';

/* Zijpad: adrenaline → β2-adrenerge receptor → Gs → adenylylcyclase → cAMP → PKA → CREB (CRE).
 * Membraan y 260–324, cytosol tot 646, kernenvelop y 660, DNA y 800. Alles volgt g = stap + p. */
const MY = 260, MH = 64, NY = 680, DY = 860;
const RX = 380, ACX = 800, PKX = 1180, PKY = 520, PORE = 1060, CRX = 1200;
const RC = '#8a93a8', CREBC = '#4fc3a1', CBPC = '#d98cf0', ACC = '#b58cff', AMPC = '#8a93a8';
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* cAMP-wolk: vaste plekjes (deterministisch) */
const CLOUD = Array.from({ length: 18 }, (_, i) => { const a = i * 2.39996, r = 30 + (i % 6) * 17; return [960 + Math.cos(a) * r * 1.5, 500 + Math.sin(a) * r * .75]; });
const RSITE = [[PKX - 15, PKY - 22], [PKX - 15, PKY + 22], [PKX + 15, PKY - 22], [PKX + 15, PKY + 22]];

export default {
  id: 'gpcr',
  title: { nl: 'G-eiwitgekoppelde receptor (cAMP)', en: 'G protein-coupled receptor (cAMP)' },
  scale: { nl: 'receptor ≈ 5 nm; beeld ≈ 100 nm (niet op schaal)', en: 'receptor ≈ 5 nm; view ≈ 100 nm (not to scale)' },
  time: { nl: 'cAMP stijgt binnen seconden; CREB-genen na minuten', en: 'cAMP rises within seconds; CREB genes after minutes' },
  org: { nl: 'mens (bv. luchtweg-epitheel, gladde spiercel)', en: 'human (e.g. airway epithelium, smooth muscle cell)' },
  legend: [[ADRC, 'adrenaline'], [C.prot, { nl: 'β2-adrenerge receptor · PKA-C', en: 'β2-adrenergic receptor · PKA-C' }], [GAC, 'Gαs'], [GBC, 'Gβγ'], [GTPC, 'GTP · GDP · ATP · cAMP'],
    [ACC, { nl: 'adenylylcyclase', en: 'adenylyl cyclase' }], [RC, { nl: 'PKA-R (regulatorisch)', en: 'PKA-R (regulatory)' }], [CREBC, 'CREB'], [CBPC, 'CBP/p300'], ['#ff6b6b', { nl: 'fosfaat (P)', en: 'phosphate (P)' }], [C.dna, 'DNA'], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: β2-adrenerge receptor met Gs, PDB <a href="https://www.rcsb.org/structure/3SN6" target="_blank" rel="noopener">3SN6</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: β2-adrenergic receptor with Gs, PDB <a href="https://www.rcsb.org/structure/3SN6" target="_blank" rel="noopener">3SN6</a>.</p>' },
  simplified: {
    nl: 'De receptor is getekend als 7 staafjes; adenylylcyclase (12 TM-helices, twee katalytische domeinen) staat symbolisch met enkele helices. Gβγ geeft zelf ook signalen door (niet getoond). Dat Gαs volledig loskomt van Gβγ is het klassieke model; recenter werk toont dat ze soms eerder herschikken dan echt scheiden. PKA zit in cellen vaak via AKAP-eiwitten op een vaste plek en de C-subeenheden laten in werkelijkheid niet altijd volledig los. We tonen één C-subeenheid die de kern in gaat en één CREB-dimeer; CREB wordt ook door andere kinasen gefosforyleerd. Desensitisatie van de receptor (GRK, β-arrestine) is weggelaten. Moleculen zijn niet op schaal.',
    en: 'The receptor is drawn as 7 rods; adenylyl cyclase (12 TM helices, two catalytic domains) is shown symbolically with a few helices. Gβγ also relays signals itself (not shown). Gαs fully separating from Gβγ is the classic model; more recent work shows they sometimes rearrange rather than truly separate. In cells PKA is often anchored at fixed sites by AKAP proteins, and the C subunits do not always fully dissociate. We show one C subunit entering the nucleus and one CREB dimer; CREB is also phosphorylated by other kinases. Receptor desensitisation (GRK, β-arrestin) is left out. Molecules are not to scale.' },
  steps: [
    ST(7000, cam(520, 330, 1000), 'Adrenaline komt aan', 'Adrenaline arrives',
      'Adrenaline, een hormoon uit de bijnieren, nadert zijn receptor. Onder het membraan wacht een schakelaareiwit, het G-eiwit Gs, nog in de uit-stand (met GDP).',
      'Adrenaline, a hormone from the adrenal glands, approaches its receptor. Below the membrane a switch protein waits, the G protein Gs, still in the off state (with GDP).'),
    ST(7500, cam(420, 300, 900), 'Zeven transmembraanhelices', 'Seven transmembrane helices',
      'De receptor gaat 7 keer door het membraan. Adrenaline bindt ertussen en de receptor verandert van vorm: aan de binnenkant zwaait één helix (helix 6) naar buiten.',
      'The receptor crosses the membrane 7 times. Adrenaline binds in between and the receptor changes shape: on the inside one helix (helix 6) swings outward.'),
    ST(8000, cam(470, 400, 900), 'De receptor zet het G-eiwit aan', 'The receptor switches on the G protein',
      'De actieve receptor laat Gαs zijn GDP lossen. GTP, waarvan de cel veel meer heeft, neemt de plaats in: met GTP staat Gαs ‘aan’.',
      'The active receptor makes Gαs let go of its GDP. GTP, which the cell has far more of, takes its place: with GTP, Gαs is ‘on’.'),
    ST(7500, cam(612, 400, 1000), 'Gαs laat Gβγ los', 'Gαs lets go of Gβγ',
      'Gαs laat met zijn GTP de rest van het G-eiwit (Gβγ) los en schuift langs het membraan naar het enzym adenylylcyclase. Eén receptor kan na elkaar meerdere G-eiwitten aanzetten.',
      'Gαs, with its GTP, leaves the rest of the G protein (Gβγ) and moves along the membrane to the enzyme adenylyl cyclase. One receptor can switch on several G proteins in turn.'),
    ST(8000, cam(860, 430, 1000), 'Adenylylcyclase maakt cAMP', 'Adenylyl cyclase makes cAMP',
      'Gαs zet adenylylcyclase aan, dat ATP omzet in cyclisch AMP (cAMP). Deze kleine ‘tweede boodschapper’ verspreidt het signaal snel door de cel.',
      'Gαs switches on adenylyl cyclase, which converts ATP into cyclic AMP (cAMP). This small ‘second messenger’ quickly spreads the signal through the cell.'),
    ST(8000, cam(1060, 500, 1000), 'cAMP maakt PKA vrij', 'cAMP releases PKA',
      'Het enzym proteïnekinase A (PKA) zit in rust vast aan remmende delen. cAMP bindt die remmende delen, zodat de actieve delen van PKA loskomen.',
      'In its resting state the enzyme protein kinase A (PKA) is held by inhibitory parts. cAMP binds these inhibitory parts, so the active parts of PKA come free.'),
    ST(8500, cam(1150, 720, 1000), 'PKA fosforyleert CREB in de kern', 'PKA phosphorylates CREB in the nucleus',
      'Een actief PKA-deel gaat de kern in en zet een fosfaat op de transcriptiefactor CREB. CREB zit op een vast DNA-stukje bij het gen: het CRE.',
      'An active PKA part enters the nucleus and puts a phosphate on the transcription factor CREB. CREB sits on a specific DNA stretch near the gene: the CRE.'),
    ST(8500, cam(1270, 740, 950), 'CBP/p300 zet het gen aan', 'CBP/p300 switches the gene on',
      'Met dat fosfaat haalt CREB de helper CBP/p300 erbij. Die maakt het DNA beter toegankelijk en helpt RNA-polymerase II: genen met een CRE worden afgeschreven.',
      'With that phosphate, CREB recruits the helper CBP/p300. It makes the DNA more accessible and helps RNA polymerase II: genes with a CRE are transcribed.'),
    ST(9000, cam(800, 475, 1600), 'Uitschakelen', 'Switching off',
      'Gαs breekt zijn GTP zelf af en gaat weer ‘uit’. Andere enzymen breken cAMP af en halen het fosfaat van CREB: het signaal dooft uit.',
      'Gαs breaks down its own GTP and switches back ‘off’. Other enzymes break down cAMP and remove the phosphate from CREB: the signal fades.'),
  ],

  svg() {
    const ac = `${[756, 770, 784, 818, 832, 846].map(x => `<rect x="${x - 5}" y="${MY - 12}" width="10" height="${MH + 24}" rx="5" fill="${ACC}" fill-opacity=".5" stroke="${ACC}" stroke-width="2"/>`).join('')}
      <ellipse cx="775" cy="${MY + MH + 44}" rx="32" ry="26" fill="${ACC}" fill-opacity=".3" stroke="${ACC}" stroke-width="3"/>
      <ellipse cx="830" cy="${MY + MH + 48}" rx="30" ry="26" fill="${ACC}" fill-opacity=".3" stroke="${ACC}" stroke-width="3"/>`;
    return svgOpen() + `
      <rect x="-600" y="-600" width="2800" height="${MY + 610}" fill="#0b1226"/>
      <rect x="-600" y="${MY + MH - 4}" width="2800" height="${NY - MY - MH + 8}" fill="url(#gCyto)"/>
      <rect x="-600" y="${NY + 14}" width="2800" height="900" fill="url(#gNuc)"/>
      ${bilayer(-600, 2200, MY, { h: MH, skip: [[RX - 75, RX + 75], [745, 857]] })}
      ${nucEnv(-600, 2200, NY, [640, PORE, 1500])}
      <g id="gp-gene"></g>
      ${hot('dnahelix', C.dna, dna(-600, 2200, DY))}
      ${T(40, 72, T2('buiten de cel', 'outside the cell'), { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(40, 420, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(700, 752, T2('celkern', 'nucleus'), { size: 24, col: '#9cc0ff', anchor: 'start', w: 500 })}
      <g id="gp-ac">${ac}</g>
      <g id="gp-rec"></g>
      <g id="gp-g"></g>
      <g id="gp-camp"></g>
      <g id="gp-pka"></g>
      <g id="gp-nuc"></g>
      <g id="gp-lab"></g>
      <g id="gp-hot" opacity="0">
        <g data-node="srf" data-color="${C.dna}" data-label="${T2('Vergelijk: EGF-route (SRE)', 'Compare: EGF route (SRE)')}">
          <rect x="700" y="${DY - 30}" width="330" height="70" fill="transparent"/>${anchor('srf', 990, DY - 40)}</g>
        <g data-node="genregulatie" data-color="${CBPC}" data-label="${T2('Genregulatie', 'Gene regulation')}">
          <rect x="1120" y="${NY + 20}" width="260" height="${DY - NY}" fill="transparent"/>${anchor('genregulatie', CRX + 8, NY + 34)}</g>
      </g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const g = s.step + s.p, tt = t / 1000;
        const wob = (k, a = 4) => Math.sin(tt * .9 + k) * a;

        /* ---------- receptor + adrenaline ---------- */
        const act = K(g, 1.5, 1.9) * (1 - K(g, 8.45, 8.8));
        const ad = track(g, [[0, 250, 70, 1.3], [.85, 350, 175, 1.3], [1.1, 350, 175, 1.3], [1.5, RX, 280, 1.05], [8.3, RX, 280, 1.05], [8.75, 260, 120, 1.3]]);
        $('gp-rec').innerHTML = gpcr7(RX, MY, MH, 8 * act) + adr(ad[0], ad[1] + (g < 1.1 || g > 8.7 ? wob(1) : 0), ad[2]);

        /* ---------- G-eiwit ---------- */
        const dock = K(g, 2.05, 2.4);
        const dx = -130 * dock;
        const bx = 635 + dx, by = 395;                                      // Gβ
        const ga = track(g, [[2.05, 560, 385], [2.4, 430, 390], [3.1, 430, 390], [3.35, 560, 480], [3.6, 724, 404], [8.35, 724, 404], [8.6, 600, 490], [8.85, 430, 390]]);
        // nucleotide in Gα: GDP → GTP → (8.1) GDP
        const hyd = K(g, 8.1, 8.3);
        let G = '';
        G += `<path d="M${f1(bx + 20)},${by - 42} q6,-12 0,-24" stroke="${GBC}" stroke-width="3" fill="none"/>`;
        G += `<ellipse cx="${f1(bx)}" cy="${by}" rx="32" ry="32" fill="${GBC}" fill-opacity=".3" stroke="${GBC}" stroke-width="3"/>`;
        G += `<ellipse cx="${f1(bx + 22)}" cy="${by - 40}" rx="28" ry="12" fill="${GBC}" fill-opacity=".45" stroke="${GBC}" stroke-width="2.5"/>`;
        G += `<text x="${f1(bx)}" y="${by + 7}" font-size="18" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">βγ</text>`;
        const onMem = ga[1] < 420;
        G += `<path d="M${f1(ga[0] - 20)},${f1(ga[1] - 34)} L${f1(ga[0] - 20)},${MY + MH - 4}" stroke="${GAC}" stroke-width="3" opacity="${onMem ? .8 : 0}"/>`;
        G += `<ellipse cx="${f1(ga[0])}" cy="${f1(ga[1])}" rx="46" ry="36" fill="${GAC}" fill-opacity=".3" stroke="${GAC}" stroke-width="3"/>`;
        G += `<text x="${f1(ga[0] - 2)}" y="${f1(ga[1] - 8)}" font-size="18" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Gαs</text>`;
        const isGTP = g >= 2.6 && g < 8.2;
        if (!isGTP || g < 2.6) {
          // GDP (begin) of GDP die vertrekt
          const q = track(g, [[2.45, ga[0], ga[1] + 16], [2.75, 300, 540]]);
          if (g < 2.75) G += tag(g < 2.45 ? ga[0] : q[0], g < 2.45 ? ga[1] + 16 : q[1], 'GDP', GTPC, { fs: 17, op: 1 - K(g, 2.6, 2.75) });
        }
        if (g >= 2.6 && g < 8.2) {
          const q = track(g, [[2.6, 250, 590], [2.95, ga[0], ga[1] + 16]]);
          G += tag(g < 2.95 ? q[0] : ga[0], g < 2.95 ? q[1] : ga[1] + 16, 'GTP', GTPC, { fs: 17, op: K(g, 2.6, 2.7) });
        }
        if (g >= 8.2) G += tag(ga[0], ga[1] + 16, 'GDP', GTPC, { fs: 17 }) + (hyd < 1 ? `<circle cx="${f1(ga[0])}" cy="${f1(ga[1] + 16)}" r="${f1(20 + 40 * hyd)}" fill="none" stroke="${GTPC}" stroke-width="3" opacity="${f1(1 - hyd)}"/>` : '');
        $('gp-g').innerHTML = G;

        /* ---------- cAMP ---------- */
        let A = '';
        const nMade = Math.floor(18 * K(g, 4.1, 4.9) + .001);
        const pde = K(g, 8.1, 8.3), deg = K(g, 8.3, 8.85);
        // ATP-pilletjes die binnenkomen (stap 4)
        if (g > 4.05 && g < 4.95) {
          for (let i = 0; i < 4; i++) {
            const g0 = 4.08 + i * .2, k = K(g, g0, g0 + .16);
            if (g >= g0 && g < g0 + .16) A += tag(930 - 125 * k, 590 - 175 * k, 'ATP', GTPC, { fs: 14, op: 1 - K(g, g0 + .12, g0 + .16) });
          }
        }
        CLOUD.forEach(([x, y], i) => {
          if (i >= nMade && g < 4.9) return;
          const born = 4.1 + (i / 18) * .8, kb = K(g, born, born + .1);
          let px = 805 + (x - 805) * kb, py = 420 + (y - 420) * kb;
          px += Math.sin(tt * 1.1 + i) * 3; py += Math.cos(tt * .9 + i * 1.7) * 3;
          if (i < 4) {                                     // deze vier binden aan R
            const kr = K(g, 5.05 + i * .06, 5.3 + i * .06);
            px = px + (RSITE[i][0] - px) * kr; py = py + (RSITE[i][1] - py) * kr;
            A += cAMP(px, py, 1 - K(g, 8.5, 8.85), 10);
            return;
          }
          const col = deg > .5 ? AMPC : GTPC;
          A += cAMP(px, py, 1 - K(g, 8.4 + (i % 5) * .08, 8.6 + (i % 5) * .08), 10, col);
        });
        if (pde > .01) A += `<g opacity="${f1(pde)}"><ellipse cx="940" cy="585" rx="40" ry="28" fill="#ff9d5c" fill-opacity=".3" stroke="#ff9d5c" stroke-width="3"/>` +
          `<text x="940" y="592" font-size="18" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">PDE</text></g>`;
        $('gp-camp').innerHTML = A;

        /* ---------- PKA ---------- */
        let P = '';
        const rel = K(g, 5.4, 5.85);
        P += `<ellipse cx="${PKX - 15}" cy="${PKY}" rx="16" ry="44" fill="${RC}" fill-opacity=".35" stroke="${RC}" stroke-width="3"/><ellipse cx="${PKX + 15}" cy="${PKY}" rx="16" ry="44" fill="${RC}" fill-opacity=".35" stroke="${RC}" stroke-width="3"/>`;
        P += `<text x="${PKX}" y="${PKY + 66}" font-size="18" text-anchor="middle" fill="${RC}" font-family="Inter" font-weight="700">R R</text>`;
        const c1 = track(g, [[5.4, PKX - 58, PKY], [5.85, PORE + 10, 600], [6.05, PORE + 10, 600], [6.25, PORE, NY], [6.5, CRX - 45, DY - 82]]);
        const c2 = track(g, [[5.4, PKX + 58, PKY], [5.85, PKX + 130, 590]]);
        for (const [x, y] of [c1, c2]) P += `<circle cx="${f1(x)}" cy="${f1(y)}" r="27" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/><text x="${f1(x)}" y="${f1(y + 7)}" font-size="19" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">C</text>`;
        if (rel > .02 && rel < .98) P += `<circle cx="${PKX}" cy="${PKY}" r="${f1(40 + 50 * rel)}" fill="none" stroke="${GTPC}" stroke-width="3" opacity="${f1(1 - rel)}"/>`;
        $('gp-pka').innerHTML = P;

        /* ---------- kern: CREB, CBP, Pol II ---------- */
        let N = '';
        const pS = K(g, 6.55, 6.72) * (1 - K(g, 8.5, 8.8));
        N += `<g><ellipse cx="${CRX - 22}" cy="${DY - 38}" rx="24" ry="22" fill="${CREBC}" fill-opacity=".35" stroke="${CREBC}" stroke-width="3"/><ellipse cx="${CRX + 22}" cy="${DY - 38}" rx="24" ry="22" fill="${CREBC}" fill-opacity=".35" stroke="${CREBC}" stroke-width="3"/>` +
          `<path d="M${CRX - 14},${DY - 18} l-6,26 M${CRX + 14},${DY - 18} l6,26" stroke="${CREBC}" stroke-width="6" stroke-linecap="round"/></g>`;
        N += phos(CRX - 40, DY - 58, 15, pS);
        const cbp = track(g, [[7.05, 1360, 620, 0], [7.4, CRX + 8, DY - 112, 1], [8.55, CRX + 8, DY - 112, 1], [8.9, 1360, 620, 0]]);
        if (cbp[2] > .01) N += `<g opacity="${f1(cbp[2])}"><ellipse cx="${f1(cbp[0])}" cy="${f1(cbp[1])}" rx="62" ry="34" fill="${CBPC}" fill-opacity=".3" stroke="${CBPC}" stroke-width="3"/></g>`;
        const pol = K(g, 7.3, 7.5) * (1 - K(g, 8.55, 8.9));
        if (pol > .01) N += `<g opacity="${f1(pol)}"><ellipse cx="1335" cy="${DY - 22}" rx="50" ry="34" fill="${C.prot3}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>` +
          `<text x="1335" y="${DY - 14}" font-size="21" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Pol II</text></g>`;
        N += mrna(1372, DY - 40, K(g, 7.5, 7.95), 170);
        // CRE-sequentie
        N += `<text x="${CRX}" y="${DY + 48}" font-size="24" text-anchor="middle" fill="#cfe0ff" font-family="JetBrains Mono" font-weight="700" letter-spacing="2">TGACGTCA</text>`;
        $('gp-nuc').innerHTML = N;
        const gk = K(g, 7.4, 7.7);
        $('gp-gene').innerHTML = gk > .01 ? `<rect x="1300" y="${DY - 26}" width="300" height="52" rx="12" fill="#fff" opacity="${f1(.1 * gk)}"/>` : '';

        /* ---------- labels ---------- */
        let L = '';
        const on = (a, b, c, d) => K(g, a, b) * (1 - K(g, c, d));
        let k = on(.2, .6, 1.05, 1.25);
        if (k > .01) L += T(420, 160, 'adrenaline', { size: 24, col: ADRC, op: k, anchor: 'start' }) +
          T(RX - 90, 214, T2('β2-adrenerge receptor', 'β2-adrenergic receptor'), { size: 24, col: C.prot, op: k, anchor: 'end' }) +
          T(600, 470, 'Gs (αβγ)', { size: 24, col: GAC, op: k });
        k = on(1.25, 1.55, 2.02, 2.2);
        if (k > .01) L += T(RX - 95, 250, T2('7 TM-helices', '7 TM helices'), { size: 22, col: C.prot, op: k, anchor: 'end' }) +
          T(RX + 150, 470, T2('helix 6 zwaait uit', 'helix 6 swings out'), { size: 22, col: C.text, op: k * K(g, 1.7, 1.9), anchor: 'start' });
        k = on(2.2, 2.5, 3.02, 3.2);
        if (k > .01) L += T(210, 470, T2('receptor = GEF', 'receptor = GEF'), { size: 22, col: C.prot, op: k }) +
          T(300, 570, T2('GDP eruit, GTP erin', 'GDP out, GTP in'), { size: 22, col: GTPC, op: k * K(g, 2.6, 2.9) });
        k = on(3.2, 3.55, 4.02, 4.2);
        if (k > .01) L += T(705, 478, 'Gαs·GTP', { size: 22, col: GAC, op: k * K(g, 3.5, 3.65) }) + T(505, 470, 'Gβγ', { size: 22, col: GBC, op: k }) +
          T(ACX, 196, T2('adenylylcyclase', 'adenylyl cyclase'), { size: 22, col: ACC, op: k });
        k = on(4.2, 4.5, 5.02, 5.2);
        if (k > .01) L += T(700, 560, 'ATP → cAMP', { size: 22, col: GTPC, op: k }) +
          T(990, 598, T2('cAMP: tweede boodschapper', 'cAMP: second messenger'), { size: 22, col: C.text, op: k * K(g, 4.6, 4.9) });
        k = on(5.1, 5.4, 6.0, 6.04);
        if (k > .01) L += T(PKX, 440, T2('PKA: 2 R + 2 C', 'PKA: 2 R + 2 C'), { size: 22, col: C.text, op: k }) +
          T(PKX + 130, 640, T2('actieve C', 'active C'), { size: 22, col: C.prot, op: k * K(g, 5.7, 5.85) }) +
          T(PKX - 110, 380, T2('4 cAMP op R', '4 cAMP on R'), { size: 22, col: GTPC, op: k * K(g, 5.2, 5.35) });
        k = on(6.2, 6.5, 7.02, 7.2);
        if (k > .01) L += T(PORE - 70, NY - 22, T2('kernporie', 'nuclear pore'), { size: 22, col: C.prot, op: k, anchor: 'end' }) +
          T(CRX + 60, DY - 70, 'CREB', { size: 22, col: CREBC, op: k, anchor: 'start' }) +
          T(CRX - 95, DY - 52, 'Ser133', { size: 22, col: '#ff8f8f', op: k * K(g, 6.6, 6.75), anchor: 'end' }) +
          T(CRX, DY + 80, 'CRE', { size: 22, col: '#cfe0ff', op: k });
        k = on(7.2, 7.5, 8.02, 8.2);
        if (k > .01) L += T(CRX + 80, DY - 128, 'CBP/p300', { size: 22, col: CBPC, op: k, anchor: 'start' }) +
          T(1480, DY + 58, T2('doelgen', 'target gene'), { size: 22, col: C.text, op: k * K(g, 7.4, 7.6) }) +
          T(1522, DY - 62, 'mRNA', { size: 22, col: C.rna, op: k * K(g, 7.7, 7.95) });
        k = on(8.1, 8.35, 9.5, 9.6);
        if (k > .01) L += T(600, 560, T2('GTPase: GTP → GDP', 'GTPase: GTP → GDP'), { size: 25, col: GAC, op: k }) +
          T(940, 452, T2('fosfodiësterase: cAMP → AMP', 'phosphodiesterase: cAMP → AMP'), { size: 25, col: '#ff9d5c', op: k * K(g, 8.2, 8.45) });
        $('gp-lab').innerHTML = L;
        $('gp-hot').setAttribute('opacity', f1(K(g, 6.0, 6.3)));
      },
    };
  },
};
