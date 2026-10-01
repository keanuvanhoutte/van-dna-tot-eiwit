import { C, T2, svgOpen, cam, FULL, f1 } from '../../kit.js';
import { T, K, track, hot, bilayer, nucEnv, dna, mrna, cort, gr, grBound as grB, hsp90, anchor, CORTC, HSPC, NLSC } from './_sig1.js';
const grBound = (x, side, op) => grB(x, side, DY, op);

/* Zijpad: cortisol → glucocorticoïdreceptor (GR, NR3C1) → kern → GRE.
 * Membraan y 200–264, cytosol tot 584, kernenvelop y 600 (porie x 900), DNA y 810. Alles volgt g = stap + p. */
const MY = 200, MH = 64, NY = 560, PORE = 780, DY = 810;
const GX = 700, GY = 430, SC = 1.5;             // GR in rust (oorsprong van gr(); LBD op GX + 45)
const H1 = 925, H2 = 1075;                      // halve plaatsen van het GRE
const P23C = '#f2d16d', FKBPC = '#f29e6d', COAC = '#d98cf0';
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

function importin(x, y, op = 1, rot = 0) {
  if (op <= .01) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" opacity="${f1(op)}"><path d="M-56,-26 a48,48 0 1,0 0,52 a34,34 0 1,1 0,-52" fill="${C.prot2}" opacity=".9"/>` +
    `<rect x="-30" y="-20" width="34" height="40" rx="11" fill="${C.prot3}" stroke="#b9a6ff" stroke-width="1.5"/>` +
    `<text x="-13" y="7" font-size="18" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">α</text>` +
    `<text x="-76" y="7" font-size="20" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">β</text></g>`;
}

export default {
  id: 'steroid',
  title: { nl: 'Kernreceptor (cortisol)', en: 'Nuclear receptor (cortisol)' },
  scale: { nl: 'GR ≈ 86 kDa (777 aa); beeld ≈ 100 nm (niet op schaal)', en: 'GR ≈ 86 kDa (777 aa); view ≈ 100 nm (not to scale)' },
  time: { nl: 'kernimport binnen minuten; doelgenen na minuten tot uren', en: 'nuclear import within minutes; target genes after minutes to hours' },
  org: { nl: 'mens (GR komt in bijna alle celtypes voor)', en: 'human (GR is present in almost all cell types)' },
  legend: [[CORTC, 'cortisol'], [C.prot, { nl: 'glucocorticoïdreceptor (GR)', en: 'glucocorticoid receptor (GR)' }], [HSPC, 'Hsp90'], [P23C, 'p23'], [FKBPC, 'FKBP51'],
    [NLSC, { nl: 'kernlokalisatiesignaal (NLS)', en: 'nuclear localisation signal (NLS)' }], [C.prot2, { nl: 'importine α/β', en: 'importin α/β' }], [COAC, { nl: 'co-activatoren', en: 'co-activators' }],
    [C.mem, { nl: 'lipidendubbellaag', en: 'lipid bilayer' }], [C.dna, 'DNA'], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: DNA-bindend domein van GR op een GRE, PDB <a href="https://www.rcsb.org/structure/1R4R" target="_blank" rel="noopener">1R4R</a> (rat-GR, dat in dit domein nagenoeg gelijk is aan het menselijke).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: GR DNA-binding domain on a GRE, PDB <a href="https://www.rcsb.org/structure/1R4R" target="_blank" rel="noopener">1R4R</a> (rat GR, nearly identical to human in this domain).</p>' },
  simplified: {
    nl: 'GR is getekend als drie blokjes: een ongeordend N-terminaal domein, het DNA-bindend domein (twee zinkvingers) en het ligandbindend domein. Het chaperonecomplex telt in werkelijkheid meer onderdelen (o.a. Hsp70 tijdens het opbouwen); volgens nieuwere gegevens blijft Hsp90 soms nog gebonden tijdens het transport naar de kern (FKBP51 wordt dan vervangen door FKBP52). De tweede GR van het dimeer komt uit een ander complex. GR kan genen ook remmen (bv. door NF-κB en AP-1 te binden); dat is weggelaten. Niet op schaal.',
    en: 'GR is drawn as three blocks: a disordered N-terminal domain, the DNA-binding domain (two zinc fingers) and the ligand-binding domain. The real chaperone complex has more parts (e.g. Hsp70 during assembly); newer data suggest that Hsp90 sometimes stays bound during transport to the nucleus (FKBP51 is then replaced by FKBP52). The second GR of the dimer comes from another complex. GR can also repress genes (e.g. by binding NF-κB and AP-1); this is left out. Not to scale.' },
  steps: [
    ST(7000, cam(560, 280, 1000), 'Cortisol: een vetoplosbaar hormoon', 'Cortisol: a fat-soluble hormone',
      'Cortisol is een hormoon uit de bijnierschors, gemaakt uit cholesterol. Het lost op in vet en past dus in het vettige binnenste van het membraan.',
      'Cortisol is a hormone from the adrenal cortex, made from cholesterol. It dissolves in fat, so it fits into the oily interior of the membrane.'),
    ST(7000, cam(560, 290, 900), 'Dwars door het membraan', 'Straight through the membrane',
      'Cortisol is klein en vetoplosbaar en glipt zo door het membraan, zonder transporteiwit of receptor aan het celoppervlak.',
      'Cortisol is small and fat-soluble, so it slips through the membrane without a transporter or a receptor on the cell surface.'),
    ST(8000, cam(720, 400, 950), 'GR wacht in het cytosol', 'GR waits in the cytosol',
      'Zonder hormoon zit de cortisolreceptor (glucocorticoïdreceptor, GR) in het cytosol, vastgehouden door helper-eiwitten (chaperones, zoals Hsp90).',
      'Without hormone, the cortisol receptor (glucocorticoid receptor, GR) sits in the cytosol, held by helper proteins (chaperones, such as Hsp90).'),
    ST(8000, cam(760, 410, 950), 'Cortisol bindt: GR verandert van vorm', 'Cortisol binds: GR changes shape',
      'Cortisol bindt in de receptor. GR verandert van vorm, laat de helpers los en toont nu zijn ‘adreslabel’ voor de kern (NLS).',
      'Cortisol binds inside the receptor. GR changes shape, lets go of the helpers and now shows its ‘address label’ for the nucleus (NLS).'),
    ST(8000, cam(820, 500, 950), 'Naar de kern', 'Into the nucleus',
      'Transporteiwitten (importines) herkennen dat label en brengen GR door een kernporie de kern in.',
      'Transport proteins (importins) recognise that label and carry GR through a nuclear pore into the nucleus.'),
    ST(8500, cam(1000, 720, 950), 'Twee GR\'s op het DNA', 'Two GRs on the DNA',
      'In de kern binden twee GR\'s samen op een vast DNA-stukje: het glucocorticoïd-responselement (GRE). Elk leest één helft met zijn zinkvingers.',
      'In the nucleus two GRs bind together on a specific DNA stretch: the glucocorticoid response element (GRE). Each reads one half with its zinc fingers.'),
    ST(8500, cam(1100, 700, 1000), 'Co-activatoren zetten het gen aan', 'Co-activators switch the gene on',
      'GR haalt helper-eiwitten (co-activatoren) erbij. RNA-polymerase II schrijft dan het doelgen af, bv. PEPCK, dat in de lever helpt glucose te maken.',
      'GR recruits helper proteins (co-activators). RNA polymerase II then transcribes the target gene, e.g. PEPCK, which helps make glucose in the liver.'),
    ST(8000, FULL, 'Samengevat', 'In summary',
      'Hier is de receptor zelf de transcriptiefactor: er is geen tussenstap met een tweede boodschapper of kinasen nodig. Andere steroïdreceptoren werken gelijkaardig.',
      'Here the receptor itself is the transcription factor: no intermediate step with a second messenger or kinases is needed. Other steroid receptors work in a similar way.'),
  ],

  svg() {
    return svgOpen() + `
      <rect x="-600" y="-600" width="2800" height="${MY + 610}" fill="#0b1226"/>
      <rect x="-600" y="${MY + MH - 4}" width="2800" height="${NY - MY - MH + 8}" fill="url(#gCyto)"/>
      <rect x="-600" y="${NY + 14}" width="2800" height="900" fill="url(#gNuc)"/>
      ${bilayer(-600, 2200, MY, { h: MH })}
      ${nucEnv(-600, 2200, NY, [300, PORE, 1420])}
      <g id="st-gene"></g>
      ${hot('dnahelix', C.dna, dna(-600, 2200, DY))}
      ${T(122, 60, T2('buiten de cel', 'outside the cell'), { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(122, 340, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
      ${T(40, 690, T2('celkern', 'nucleus'), { size: 24, col: '#9cc0ff', anchor: 'start', w: 500 })}
      <g id="st-trail"></g>
      <g data-node="chaperones" data-color="${HSPC}" data-label="${T2('Hsp90 · chaperones', 'Hsp90 · chaperones')}" id="st-chapG">
        <g id="st-chap"></g><circle id="st-chapA" data-anchor="chaperones" data-pos="below" r="1.5" fill="none"/></g>
      <g id="st-gr"></g>
      ${hot('kernimport', C.prot, '<g id="st-imp"></g>')}
      <g id="st-cort"></g>
      <g id="st-nuc"></g>${hot('rnapol', C.prot, '<g id="st-pol"></g>')}<g id="st-nuc2"></g>
      <g id="st-lab"></g>
      <g id="st-hotK" opacity="0" data-node="kernimport" data-color="${C.prot}" data-label="${T2('Kernporie & import', 'Nuclear pore & import')}">
        <rect x="${PORE - 70}" y="${NY - 50}" width="140" height="100" fill="transparent"/>${anchor('kernimport', PORE + 140, NY - 40)}</g>
      <g id="st-hotG" opacity="0" data-node="genregulatie" data-color="${COAC}" data-label="${T2('Genregulatie', 'Gene regulation')}">
        <rect x="900" y="620" width="220" height="100" fill="transparent"/>${anchor('genregulatie', 1250, 905, true)}</g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const g = s.step + s.p, tt = t / 1000;
        const wob = (k, a = 4) => Math.sin(tt * .9 + k) * a;

        /* ---------- cortisol ---------- */
        const c = track(g, [[0, 330, 70, 1.3], [.85, 440, 120, 1.3], [1.1, 440, 120, 1.3], [1.45, 450, 232, 1.3], [1.9, 480, 340, 1.3], [2.1, 480, 340, 1.3], [2.9, 560, 390, 1.2], [3.05, 560, 390, 1.2], [3.35, GX + 45, GY + 3, .9]]);
        const free = 1 - K(g, 3.33, 3.36);
        $('st-cort').innerHTML = cort(c[0], c[1] + (g < 1.1 || (g > 1.9 && g < 3.05) ? wob(1) : 0), c[2], free, 0);

        /* ---------- chaperones ---------- */
        const rel = K(g, 3.55, 3.95), gone = 1 - K(g, 4.0, 4.3);
        const hs = track(g, [[3.55, GX + 45, GY - 2, 1], [3.95, 900, 340, .45]]);
        const p23 = track(g, [[3.55, GX + 45, GY - 102], [3.95, 860, 300]]);
        const fk = track(g, [[3.55, GX + 120, GY - 58], [3.95, 1010, 420]]);
        const cop = (1 - .55 * rel) * gone;
        let H = hsp90(hs[0], hs[1], cop, .15 * rel, 1.25);
        H += cop > .01 ? `<g opacity="${f1(cop)}"><circle cx="${f1(p23[0])}" cy="${f1(p23[1])}" r="15" fill="${P23C}" fill-opacity=".45" stroke="${P23C}" stroke-width="3"/>` +
          `<ellipse cx="${f1(fk[0])}" cy="${f1(fk[1])}" rx="26" ry="22" fill="${FKBPC}" fill-opacity=".35" stroke="${FKBPC}" stroke-width="3"/></g>` : '';
        $('st-chap').innerHTML = H;
        $('st-chapG').setAttribute('opacity', g < 4.2 ? '1' : '0');
        $('st-chapA').setAttribute('cx', f1(hs[0])); $('st-chapA').setAttribute('cy', f1(hs[1] + 120));
        $('st-chapA').setAttribute('opacity', g > 1.9 && g < 3.6 ? '1' : '0');

        /* ---------- GR ---------- */
        const lig = K(g, 3.35, 3.6), nls = K(g, 3.6, 3.9);
        const pos = track(g, [[4.3, GX, GY], [4.55, PORE, 470], [4.85, PORE, 680], [5.05, PORE, 680], [5.35, H1 - 30, 700]]);
        const rot = track(g, [[4.3, 0], [4.5, -90], [4.9, -90], [5.25, 0]])[0], th = rot * Math.PI / 180;
        const bind = K(g, 5.3, 5.5);
        let R = gr(pos[0], pos[1], { lig, nls: nls * (1 - bind), sc: SC, op: 1 - bind, rot });
        const p2 = track(g, [[4.7, 1240, 690], [5.05, 1240, 690], [5.4, H2 + 40, 700]]);
        const in2 = K(g, 4.7, 4.95);
        R += gr(p2[0], p2[1], { lig: 1, sc: SC, op: in2 * (1 - K(g, 5.35, 5.55)), flip: -1 });
        R += grBound(H1, -1, bind) + grBound(H2, 1, K(g, 5.4, 5.6));
        $('st-gr').innerHTML = R;

        /* ---------- importine ---------- */
        const imp = K(g, 4.05, 4.3) * (1 - K(g, 4.85, 5.0));
        const io = track(g, [[4.85, 0, 0], [5.0, 60, -40]]);
        const ox = -4.5, oy = -58;
        $('st-imp').innerHTML = importin(pos[0] + ox * Math.cos(th) - oy * Math.sin(th) + io[0], pos[1] + ox * Math.sin(th) + oy * Math.cos(th) + io[1], imp, rot);

        /* ---------- kern: GRE, co-activatoren, Pol II ---------- */
        let N = '';
        const gk = K(g, 5.05, 5.4);
        N += `<g opacity="${f1(.35 + .65 * gk)}"><text x="${H1}" y="${DY + 50}" font-size="23" text-anchor="middle" fill="#cfe0ff" font-family="JetBrains Mono" font-weight="700">GGAACA</text>` +
          `<text x="1000" y="${DY + 50}" font-size="22" text-anchor="middle" fill="${C.muted}" font-family="JetBrains Mono" font-weight="700">nnn</text>` +
          `<text x="${H2}" y="${DY + 50}" font-size="23" text-anchor="middle" fill="#cfe0ff" font-family="JetBrains Mono" font-weight="700">TGTTCT</text></g>`;
        const co = track(g, [[6.05, 1200, 540, 0], [6.4, 1000, 612, 1]]);
        if (co[2] > .01) N += `<g opacity="${f1(co[2])}"><ellipse cx="${f1(co[0])}" cy="${f1(co[1])}" rx="108" ry="32" fill="${COAC}" fill-opacity=".3" stroke="${COAC}" stroke-width="3"/>` +
          `<text x="${f1(co[0])}" y="${f1(co[1] + 8)}" font-size="22" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">CBP/p300 · SRC</text></g>`;
        const pol = K(g, 6.3, 6.5);
        $('st-nuc').innerHTML = N;
        N = '';                                                 // Pol II apart (klikbaar naar RNA-polymerase II), mRNA erna
        $('st-pol').innerHTML = pol <= .01 ? '' : `<g opacity="${f1(pol)}"><ellipse cx="1200" cy="${DY - 24}" rx="52" ry="36" fill="${C.prot3}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>` +
          `<text x="1200" y="${DY - 16}" font-size="21" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Pol II</text></g>`;
        N += mrna(1240, DY - 46, K(g, 6.5, 6.95), 190);
        $('st-nuc2').innerHTML = N;
        const hl = K(g, 6.4, 6.7);
        $('st-gene').innerHTML = hl > .01 ? `<rect x="1150" y="${DY - 26}" width="330" height="52" rx="12" fill="#fff" opacity="${f1(.1 * hl)}"/>` : '';

        /* ---------- samenvatting: spoor ---------- */
        const tr = K(g, 7.05, 7.7);
        $('st-trail').innerHTML = tr > .01 ? `<path d="M330,70 C440,110 450,200 460,260 S560,390 ${GX + 45},${GY} S${PORE},470 ${PORE},${NY} S${H1},${DY - 150} 1000,${DY - 60}" stroke="${CORTC}" stroke-width="4" fill="none" stroke-dasharray="10 9" pathLength="1000" stroke-dashoffset="0" opacity=".85" style="clip-path:inset(0 ${f1(100 - tr * 100)}% 0 0)"/>` : '';

        /* ---------- labels ---------- */
        const on = (a, b, c2, d) => K(g, a, b) * (1 - K(g, c2, d));
        let L = '';
        let k = on(.2, .6, 1.05, 1.25);
        if (k > .01) L += T(510, 105, 'cortisol', { size: 26, col: CORTC, op: k, anchor: 'start' }) +
          T(510, 138, T2('lipofiel (vetoplosbaar)', 'lipophilic (fat-soluble)'), { size: 22, col: C.muted, op: k, anchor: 'start', w: 500 }) +
          T(820, MY - 16, T2('plasmamembraan', 'plasma membrane'), { size: 24, col: C.mem, op: k });
        k = on(1.2, 1.5, 2.02, 2.2);
        if (k > .01) L += T(620, 150, T2('passieve diffusie', 'passive diffusion'), { size: 22, col: C.text, op: k }) +
          T(700, MY + MH / 2 + 8, T2('hydrofobe kern', 'hydrophobic core'), { size: 20, col: '#f1d7a8', op: k, anchor: 'start' });
        k = on(2.2, 2.5, 3.02, 3.2);
        if (k > .01) L += T(GX - 60, GY + 70, 'GR', { size: 24, col: C.prot, op: k }) +
          T(GX + 45, GY + 100, 'Hsp90', { size: 22, col: HSPC, op: k }) +
          T(GX + 80, GY - 110, 'p23', { size: 22, col: P23C, op: k, anchor: 'start' }) +
          T(GX + 155, GY - 50, 'FKBP51', { size: 22, col: FKBPC, op: k, anchor: 'start' }) +
          T(GX - 110, GY + 35, 'NTD', { size: 18, col: C.muted, op: k }) + T(GX - 40, GY + 35, 'DBD', { size: 18, col: C.muted, op: k }) + T(GX + 45, GY + 62, 'LBD', { size: 18, col: C.muted, op: k });
        k = on(3.4, 3.7, 4.02, 4.2);
        if (k > .01) L += T(GX + 45, GY + 70, T2('ligandbindend domein', 'ligand-binding domain'), { size: 22, col: C.prot, op: k }) +
          T(GX - 20, GY - 60, 'NLS', { size: 22, col: NLSC, op: k * nls }) +
          T(930, 280, T2('chaperones laten los', 'chaperones let go'), { size: 22, col: HSPC, op: k * rel, anchor: 'start' });
        k = on(4.2, 4.45, 4.85, 5.0);
        if (k > .01) L += T(PORE + 110, 470, T2('importine α/β', 'importin α/β'), { size: 22, col: '#b9a6ff', op: k, anchor: 'start' }) +
          T(PORE + 90, NY + 55, T2('kernporie', 'nuclear pore'), { size: 22, col: C.prot, op: k, anchor: 'start' });
        k = on(5.3, 5.6, 6.02, 6.2);
        if (k > .01) L += T(1165, 690, T2('GR-homodimeer', 'GR homodimer'), { size: 24, col: C.prot, op: k, anchor: 'start' }) +
          T(1000, DY + 88, 'GRE', { size: 24, col: '#cfe0ff', op: k }) +
          T(H2 + 70, DY + 50, T2('← zinkvingers', '← zinc fingers'), { size: 20, col: '#cfd6e6', op: k, anchor: 'start' });
        k = on(6.2, 6.5, 7.02, 7.2);
        if (k > .01) L += T(1122, 618, T2('co-activatoren', 'co-activators'), { size: 22, col: COAC, op: k, anchor: 'start' }) +
          T(1330, DY + 58, T2('doelgen', 'target gene'), { size: 22, col: C.text, op: k * K(g, 6.4, 6.6) }) +
          T(1420, 690, 'mRNA', { size: 22, col: C.rna, op: k * K(g, 6.7, 6.95) });
        k = K(g, 7.1, 7.4);
        if (k > .01) {
          const pts = [[7.1, 560, 290, T2('1 door het membraan', '1 through the membrane')], [7.25, 700, 470, T2('2 bindt GR, chaperones los', '2 binds GR, chaperones off'), 'end'],
            [7.4, PORE - 70, NY + 62, T2('3 kernimport', '3 nuclear import'), 'end'], [7.55, 1250, 872, T2('4 GRE → mRNA', '4 GRE → mRNA')]];
          for (const [g0, x, y, s0, an] of pts) L += T(x, y, s0, { size: 26, col: '#ffd98a', op: K(g, g0, g0 + .2), anchor: an ?? 'start' });
        }
        $('st-lab').innerHTML = L;
        $('st-hotK').setAttribute('opacity', f1(K(g, 4.05, 4.3)));
        $('st-hotG').setAttribute('opacity', f1(K(g, 6.05, 6.3)));
      },
    };
  },
};
