import { C, L, T2, svgOpen, txt, mono, pill, cam, FULL, sub, ease, lerp, clamp, f1, rng } from '../../kit.js';
import { ST, panel, smooth } from './_a_kit.js';

/* K(): tekst die ook in het overzichtsbeeld (laatste stap) zichtbaar blijft */
const K = h => h.replace('<text', '<text class="keep"');

/*
 * Nucleolus: FC/DFC/GC, rDNA-herhalingen op de 5 acrocentrische chromosomen, Pol I-"kerstbomen",
 * 47S pre-rRNA → 18S + 5.8S + 28S (+ 5S van Pol III), snoRNP-modificaties, assemblage en export van pre-40S/pre-60S.
 */
const NC = [400, 450], NRX = 280, NRY = 250;
const FCS = [[330, 370], [480, 400], [350, 540], [505, 545]];   // fibrillaire centra
const TREE = { x0: 790, x1: 1170, y: 300 };                     // één getranscribeerde eenheid in het Miller-paneel
const PRE = { x0: 780, y: 610 };                                 // 47S-schema
const SEG = [['5\'ETS', 60, '#6b7a99'], ['18S', 170, C.rrna], ['ITS1', 60, '#6b7a99'], ['5.8S', 40, '#7fe0c8'], ['ITS2', 55, '#6b7a99'], ['28S', 290, '#1fa38a'], ['3\'ETS', 35, '#6b7a99']];

export default {
  id: 'nucleolus',
  title: { nl: 'Nucleolus', en: 'Nucleolus' },
  scale: { nl: '≈ 1–5 µm', en: '≈ 1–5 µm' },
  time: { nl: 'van rDNA tot subeenheid in het cytoplasma: ~30–60 min', en: 'from rDNA to subunit in the cytoplasm: ~30–60 min' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.rrna, 'rRNA / rDNA'], ['#9fb3d9', { nl: 'fibrillair centrum (FC)', en: 'fibrillar centre (FC)' }], ['#5a6f9e', { nl: 'dicht fibrillair component (DFC)', en: 'dense fibrillar component (DFC)' }], ['#2a3d63', { nl: 'granulair component (GC)', en: 'granular component (GC)' }], [C.prot, { nl: 'RNA-polymerase I', en: 'RNA polymerase I' }], [C.trna, 'snoRNP'], [C.dna, { nl: 'acrocentrisch chromosoom', en: 'acrocentric chromosome' }]],
  simplified: {
    nl: 'Een menselijke kern heeft meestal 1–3 nucleoli; elke nucleolus bevat veel meer FC/DFC-eenheden dan getekend. De Miller-"kerstboom" toont één actieve rDNA-eenheid met slechts enkele tientallen polymerasen. Het 47S-schema is niet op schaal en de knipvolgorde is vereenvoudigd (er zijn meerdere alternatieve routes). De tijd is een orde van grootte.',
    en: 'A human nucleus usually has 1–3 nucleoli; each nucleolus contains far more FC/DFC units than drawn. The Miller "Christmas tree" shows one active rDNA unit with only a few dozen polymerases. The 47S scheme is not to scale and the cleavage order is simplified (there are several alternative pathways). The time is an order of magnitude.' },
  steps: [
    ST(7500, cam(420, 425, 1040), 'De nucleolus', 'The nucleolus',
      'Het grootste lichaampje in de kern, zonder membraan. Hij vormt zich rond de rDNA-genen op de korte armen van de chromosomen 13, 14, 15, 21 en 22.',
      'The largest body in the nucleus, without a membrane. It forms around the rDNA genes on the short arms of chromosomes 13, 14, 15, 21 and 22.'),
    ST(8000, cam(420, 460, 700), 'Drie compartimenten', 'Three compartments',
      'Fibrillaire centra (FC) met rDNA, omringd door een dicht fibrillair component (DFC), in een granulair component (GC). Het rRNA beweegt van binnen naar buiten.',
      'Fibrillar centres (FC) holding rDNA, surrounded by a dense fibrillar component (DFC), embedded in a granular component (GC). The rRNA moves from inside to outside.'),
    ST(8000, cam(1170, 240, 860), 'rDNA: honderden kopieën', 'rDNA: hundreds of copies',
      'De rRNA-genen liggen kop-aan-staart in herhalingen van ~43 kb: ~13 kb wordt afgeschreven, de rest is intergene spacer. Samen honderden kopieën per cel (sterk variabel, vaak ~400).',
      'The rRNA genes lie head-to-tail in repeats of ~43 kb: ~13 kb is transcribed, the rest is intergenic spacer. Together hundreds of copies per cell (highly variable, often ~400).'),
    ST(9000, cam(1030, 290, 760), 'RNA-polymerase I: "kerstbomen"', 'RNA polymerase I: "Christmas trees"',
      'Aan de grens FC/DFC schrijven tientallen Pol I-moleculen tegelijk één rDNA-eenheid af. De transcripten worden langer naar het einde toe; de knopjes zijn vroege processomen.',
      'At the FC/DFC border dozens of Pol I molecules transcribe one rDNA unit at the same time. The transcripts get longer towards the end; the knobs are early processomes.'),
    ST(8500, cam(1130, 610, 860), '47S pre-rRNA en snoRNA\'s', '47S pre-rRNA and snoRNAs',
      'Het 47S-voorloper-RNA bevat 18S, 5.8S en 28S met spacers ertussen. In de DFC plaatsen snoRNP\'s ~200 modificaties: 2\'-O-methyl (fibrillarine) en pseudouridine (dyskerine).',
      'The 47S precursor RNA contains 18S, 5.8S and 28S with spacers in between. In the DFC snoRNPs place ~200 modifications: 2\'-O-methyl (fibrillarin) and pseudouridine (dyskerin).'),
    ST(9000, cam(1130, 660, 860), 'Knippen en bouwen', 'Cutting and assembling',
      'De spacers worden weggeknipt. 18S gaat naar de kleine subeenheid; 5.8S, 28S en het 5S-rRNA (Pol III) naar de grote. ~80 ribosomale eiwitten komen uit het cytoplasma.',
      'The spacers are cut out. 18S goes into the small subunit; 5.8S, 28S and the 5S rRNA (Pol III) into the large one. ~80 ribosomal proteins come in from the cytoplasm.'),
    ST(8500, cam(420, 740, 700), 'Export door de kernporie', 'Export through the nuclear pore',
      'Pre-40S en pre-60S verlaten de kern apart (o.a. via exportine CRM1). Pas in het cytoplasma rijpen ze af en komen ze samen op een mRNA.',
      'Pre-40S and pre-60S leave the nucleus separately (via exportin CRM1, among others). Only in the cytoplasm do they mature and meet on an mRNA.'),
    ST(7000, FULL, 'Een ribosomenfabriek', 'A ribosome factory',
      'Een groeiende cel maakt duizenden ribosomen per minuut; het rRNA is ~80 % van al het RNA in de cel.',
      'A growing cell makes thousands of ribosomes per minute; rRNA is ~80% of all RNA in the cell.'),
  ],
  svg() {
    const r = rng(5);
    // --- nucleolus ---
    let nuc = '';
    const outline = [];
    for (let a = 0; a < 360; a += 20) { const k = 1 + (r() - .5) * .12; outline.push([NC[0] + NRX * k * Math.cos(a * Math.PI / 180), NC[1] + NRY * k * Math.sin(a * Math.PI / 180)]); }
    outline.push(outline[0], outline[1]);
    nuc += `<path d="${smooth(outline)}Z" fill="#2a3d63" stroke="#4d6aa0" stroke-width="3"/>`;
    let gc = '';
    for (let i = 0; i < 170; i++) {
      const a = r() * 6.283, d = Math.sqrt(r()) * .92;
      const x = NC[0] + NRX * d * Math.cos(a), y = NC[1] + NRY * d * Math.sin(a);
      if (FCS.some(([fx, fy]) => Math.hypot(x - fx, y - fy) < 62)) continue;
      gc += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4 + r() * 3)}" fill="${C.rrna}" opacity="${f1(.35 + r() * .35)}"/>`;
    }
    let fc = '';
    FCS.forEach(([x, y]) => {
      fc += `<circle cx="${x}" cy="${y}" r="56" fill="#5a6f9e"/>`;
      for (let i = 0; i < 26; i++) { const a = r() * 6.283, d = 44 + r() * 10; fc += `<circle cx="${f1(x + d * Math.cos(a))}" cy="${f1(y + d * Math.sin(a))}" r="2.2" fill="#c9d6f3" opacity=".7"/>`; }
      fc += `<circle cx="${x}" cy="${y}" r="38" fill="#9fb3d9"/>`;
      fc += `<path d="M${x - 30},${y + 8} C${x - 10},${y - 22} ${x + 10},${y + 24} ${x + 30},${y - 6}" stroke="${C.rrna}" stroke-width="4" fill="none"/>`;
    });
    // acrocentrische chromosomen die met hun korte arm (NOR) in de nucleolus steken
    const acro = [[['13'], 60, 250, 20], [['14'], 170, 150, 60], [['15'], 760, 330, 160], [['21'], 700, 700, 215], [['22'], 90, 650, -25]];
    let chr = '';
    acro.forEach(([[n], x, y, rot]) => {
      chr += `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-13" y="-11" width="120" height="22" rx="11" fill="${C.dna}"/><rect x="-13" y="-9" width="18" height="18" rx="9" fill="#27457e"/>` +
        `<line x1="-14" y1="0" x2="-70" y2="0" stroke="${C.rrna}" stroke-width="4" stroke-dasharray="7 4"/>` + `</g>` + K(txt(x + Math.cos(rot * Math.PI / 180) * 70, y + Math.sin(rot * Math.PI / 180) * 70 + 34, n, C.dna2, 18, 'middle', 700));
    });

    // --- Miller-paneel ---
    let mil = panel(720, 90, 870, 330, T2('rDNA en Pol I', 'rDNA and Pol I'), '#2a3a60', 22);
    mil += `<line x1="740" y1="${TREE.y}" x2="1570" y2="${TREE.y}" stroke="${C.dna}" stroke-width="5"/>`;
    // tweede (en derde, gedeeltelijk) eenheid
    [[TREE.x0, TREE.x1], [1300, 1570]].forEach(([a, b], k) => {
      mil += `<rect x="${a}" y="${TREE.y - 7}" width="${b - a}" height="14" rx="5" fill="${C.rrna}" opacity=".85"/>`;
    });
    mil += `<path d="M${TREE.x0},${TREE.y + 30} v10 H${TREE.x1} v-10" stroke="${C.rrna}" stroke-width="2" fill="none"/>` + txt((TREE.x0 + TREE.x1) / 2, TREE.y + 62, T2('getranscribeerde eenheid ~13 kb', 'transcribed unit ~13 kb'), C.rrna, 16);
    mil += `<path d="M${TREE.x1 + 4},${TREE.y + 30} v10 H1296 v-10" stroke="${C.muted}" stroke-width="2" fill="none"/>` + txt((TREE.x1 + 1296) / 2, TREE.y + 62, T2('spacer (IGS) ~30 kb', 'spacer (IGS) ~30 kb'), C.muted, 16);
    mil += `<path d="M${TREE.x0},${TREE.y + 86} v10 H1296 v-10" stroke="#fff" stroke-width="2" fill="none"/>` + txt((TREE.x0 + 1296) / 2, TREE.y + 118, T2('één herhaling ≈ 43 kb · honderden kopieën', 'one repeat ≈ 43 kb · hundreds of copies'), '#fff', 16);
    mil += `<path d="M${TREE.x0 - 4},${TREE.y - 20} v-24 h40" stroke="#fff" stroke-width="3" fill="none" marker-end="url(#arrow)"/>` + txt(TREE.x0 - 8, TREE.y - 62, T2('promoter', 'promoter'), '#fff', 15, 'start');

    // --- 47S-paneel ---
    let pre = panel(720, 450, 870, 420, T2('47S pre-rRNA → subeenheden', '47S pre-rRNA → subunits'), '#2a3a60', 22);
    let x = PRE.x0;
    const segs = [];
    SEG.forEach(([n, w, c]) => { segs.push([x, x + w, n, c]); x += w; });
    pre += `<g id="nl-47s">`;
    segs.forEach(([a, b, n, c]) => { pre += `<rect x="${a}" y="${PRE.y - 18}" width="${b - a}" height="36" fill="${c}" stroke="#0a1224" stroke-width="2"/>` + (n === '18S' || n === '28S' ? K : h => h)(txt((a + b) / 2, PRE.y + (n.length > 4 || b - a < 50 ? 46 : 6), n, n.includes('S') && !n.includes('ETS') && !n.includes('ITS') && b - a >= 50 ? '#0a1224' : '#fff', n.length > 4 || b - a < 50 ? 14 : 17, 'middle', 700)); });
    pre += txt(PRE.x0 - 14, PRE.y + 6, "5'", C.text, 16, 'end') + txt(x + 14, PRE.y + 6, "3'", C.text, 16, 'start') + txt(PRE.x0, PRE.y - 56, '47S pre-rRNA (~13 kb)', C.rrna, 17, 'start', 700);
    pre += `</g><g id="nl-mods"></g>`;
    pre += `<g id="nl-prod"></g>`;
    return svgOpen() + `
    <g id="nl-left">
      <g id="nl-chr" data-node="chromosoom" data-color="${C.dna}" data-label="${T2('Acrocentrische chromosomen (NOR)', 'Acrocentric chromosomes (NOR)')}">${chr}<circle data-anchor="chromosoom" cx="320" cy="262" r="1" fill="none"/></g>
      ${nuc}${gc}${fc}
      <g id="nl-lab"></g>
      <rect x="${FCS[1][0] - 60}" y="${FCS[1][1] - 60}" width="120" height="120" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/>
      <path d="M${FCS[1][0] + 60},${FCS[1][1] - 60} L720,90 M${FCS[1][0] + 60},${FCS[1][1] + 60} L720,420" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5" opacity=".4"/>
    </g>
    <g id="nl-envelope">
      <g data-node="kernimport" data-color="${C.prot}" data-nolabel><path d="M40,830 Q420,760 820,830" stroke="#7aa0d8" stroke-width="5" fill="none"/><path d="M40,846 Q420,776 820,846" stroke="#7aa0d8" stroke-width="5" fill="none"/>
      <rect x="395" y="770" width="46" height="70" rx="12" fill="#0b1427" stroke="${C.prot}" stroke-width="3"/></g>
      ${txt(560, 770, T2('kernenvelop · kernporie', 'nuclear envelope · pore'), C.muted, 15, 'start')}
      ${txt(140, 862, T2('cytoplasma ↓', 'cytoplasm ↓'), C.muted, 15)}
    </g>
    <g data-node="ribogenese" data-color="${C.rrna}" data-label="${T2('Ribosoombiogenese', 'Ribosome biogenesis')}"><g id="nl-exp"></g><circle data-anchor="ribogenese" cx="560" cy="640" r="1" fill="none"/></g>
    <g data-node="polymerasen" data-color="${C.prot}" data-label="${T2('RNA-polymerase I', 'RNA polymerase I')}" data-nolabel id="nl-mil">${mil}<g id="nl-tree"></g></g>
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}" id="nl-pre">${pre}<circle data-anchor="ribosoom" cx="1250" cy="790" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    let lx = 0;
    return {
      update(t, s) {
        const { step, p } = s;
        // labels van de compartimenten
        const lop = step === 1 ? ease(sub(p, .1, .4)) : step === 0 ? 0 : step === 7 ? 1 : .0;
        const [fx, fy] = FCS[0], [gx, gy] = FCS[2];
        $('nl-lab').innerHTML = lop > .01 ? `<g opacity="${f1(lop)}">` +
          `<line x1="${fx - 20}" y1="${fy}" x2="190" y2="410" stroke="#fff" stroke-width="2"/>` + K(pill(150, 410, 80, 30, 'FC', '#6f82ad', 1, 16)) +
          `<line x1="${gx - 48}" y1="${gy - 8}" x2="190" y2="500" stroke="#fff" stroke-width="2"/>` + K(pill(150, 500, 80, 30, 'DFC', '#4a5d8a', 1, 16)) +
          `<line x1="600" y1="330" x2="660" y2="300" stroke="#fff" stroke-width="2"/>` + K(pill(700, 300, 80, 30, 'GC', '#2f4677', 1, 16)) + '</g>' : '';
        // niet-centrale delen ver genoeg dimmen (< 0,3) zodat wat half buiten de camera valt niet als afgesneden figuur oogt
        $('nl-left').setAttribute('opacity', step >= 2 && step <= 5 ? .2 : 1);
        $('nl-chr').setAttribute('opacity', step === 1 ? .2 : 1);
        $('nl-envelope').setAttribute('opacity', step >= 2 && step <= 5 ? .2 : 1);
        $('nl-mil').setAttribute('opacity', step === 2 || step === 3 ? 1 : step === 7 ? 1 : .2);
        $('nl-pre').setAttribute('opacity', step === 4 || step === 5 ? 1 : step === 7 ? 1 : .2);

        // kerstboom: Pol I met groeiende transcripten (lengte ∝ afstand tot de promoter)
        let tr = '';
        const nPol = 22, grow = step === 3 ? ease(sub(p, 0, .6)) : step > 3 ? 1 : step === 2 ? 0 : 1;
        for (let i = 0; i < nPol; i++) {
          const u = (i + .5) / nPol, x = lerp(TREE.x0 + 8, TREE.x1 - 8, u * grow);
          if (u > grow + .001) continue;
          const len = 10 + 120 * u * grow;
          tr += `<path d="M${f1(x)},${TREE.y - 6} q${f1(-len * .12)},${f1(-len * .5)} 0,${f1(-len)}" stroke="${C.rrna}" stroke-width="2.4" fill="none"/>` +
            `<circle cx="${f1(x)}" cy="${f1(TREE.y - len)}" r="${f1(2 + 3 * u)}" fill="${C.rrna}"/>` +
            `<circle cx="${f1(x)}" cy="${TREE.y}" r="5.5" fill="${C.prot}" stroke="#0a1224" stroke-width="1.5"/>`;
        }
        if (step === 3) tr += `<g opacity="${f1(sub(p, .5, .8))}">${txt(TREE.x1 + 14, TREE.y - 16, '← Pol I', C.prot, 20, 'start', 700)}</g>`;
        $('nl-tree').innerHTML = tr;

        // snoRNP-modificaties op het 47S
        let mods = '';
        const mk = step === 4 ? ease(sub(p, .3, .8)) : step > 4 && step < 7 ? 1 : step === 7 ? 1 : 0;
        if (mk > .01) {
          const rr = rng(12);
          for (let i = 0; i < 26; i++) {
            const seg = rr() < .4 ? SEG[1] : rr() < .5 ? SEG[5] : SEG[3];
            let x0 = PRE.x0; for (const sg of SEG) { if (sg === seg) break; x0 += sg[1]; }
            const x = x0 + 6 + rr() * (seg[1] - 12), me = rr() < .55;
            mods += `<g opacity="${f1(mk * (i / 26 < mk ? 1 : 0))}"><line x1="${f1(x)}" y1="${PRE.y - 18}" x2="${f1(x)}" y2="${PRE.y - 30}" stroke="${me ? C.trna : '#ff8a8a'}" stroke-width="2"/><circle cx="${f1(x)}" cy="${PRE.y - 33}" r="3.5" fill="${me ? C.trna : '#ff8a8a'}"/></g>`;
          }
          mods += `<g opacity="${f1(step === 4 ? mk : step === 5 ? 1 - ease(sub(p, 0, .3)) : 0)}">${pill(900, 500, 250, 30, T2('box C/D-snoRNP → 2\'-O-Me', 'box C/D snoRNP → 2\'-O-Me'), '#8a6d1c', 1, 14)}${pill(1190, 500, 230, 30, T2('box H/ACA-snoRNP → Ψ', 'box H/ACA snoRNP → Ψ'), '#8a3d3d', 1, 14)}</g>`;
        }
        $('nl-mods').innerHTML = mods;

        // producten
        let pr = '';
        const cut = step === 5 ? ease(sub(p, .05, .45)) : step > 5 ? 1 : 0;
        if (cut > .01) {
          const y = 740;
          pr += `<g opacity="${f1(cut)}">` +
            `<rect x="800" y="${y - 16}" width="170" height="32" fill="${C.rrna}"/>` + K(txt(885, y + 6, '18S', '#0a1224', 17, 'middle', 700)) +
            `<rect x="1060" y="${y - 16}" width="40" height="32" fill="#7fe0c8"/>` + txt(1080, y + 6, '5.8S', '#0a1224', 12, 'middle', 700) +
            `<rect x="1110" y="${y - 16}" width="290" height="32" fill="#1fa38a"/>` + K(txt(1255, y + 6, '28S', '#0a1224', 17, 'middle', 700)) +
            `<rect x="1410" y="${y - 16}" width="36" height="32" fill="#bfeee2"/>` + txt(1428, y + 6, '5S', '#0a1224', 13, 'middle', 700) +
            txt(1428, y + 40, T2('(Pol III, chr 1)', '(Pol III, chr 1)'), C.muted, 13) + '</g>';
          const as = step === 5 ? ease(sub(p, .5, .9)) : 1;
          pr += `<g opacity="${f1(as)}">` +
            `<ellipse cx="885" cy="820" rx="80" ry="30" fill="rgba(44,198,168,.3)" stroke="${C.rrna}" stroke-width="3"/>` + K(txt(885, 827, 'pre-40S', '#fff', 21, 'middle', 700)) +
            `<ellipse cx="1250" cy="820" rx="120" ry="34" fill="rgba(31,163,138,.3)" stroke="#1fa38a" stroke-width="3"/>` + K(txt(1250, 827, 'pre-60S', '#fff', 21, 'middle', 700)) +
            txt(1480, 812, T2('+ ~80 ribosomale', '+ ~80 ribosomal'), C.muted, 15) + txt(1480, 832, T2('eiwitten (import)', 'proteins (imported)'), C.muted, 15) + '</g>';
        }
        $('nl-prod').innerHTML = pr;

        // export: subeenheden uit het GC door de porie
        let ex = '';
        const ek = step === 6 ? sub(p, .05, .95) : step === 7 ? 1 : 0;
        if (step >= 6) {
          [[0, 'pre-40S', 22, C.rrna, 365], [.35, 'pre-60S', 30, '#1fa38a', 475]].forEach(([d, n, rr0, c, xe]) => {
            const k = clamp((ek - d) / .6);
            const pts = [[470, 640], [430, 730], [418, 805], [xe, 872]];   // na de porie uit elkaar
            const seg = Math.min(2.999, k * 3), i = Math.floor(seg), f = seg - i;
            const x = lerp(pts[i][0], pts[i + 1][0], f), y = lerp(pts[i][1], pts[i + 1][1], f);
            ex += `<g opacity="${f1(k > 0 && k < 1 ? 1 : step === 7 ? 1 : k >= 1 ? .8 : 0)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${rr0}" fill="${c}" stroke="#0a1224" stroke-width="2"/>${n === 'pre-40S' ? txt(x - rr0 - 8, y + 5, n, '#fff', 15, 'end', 700) : txt(x + rr0 + 8, y + 5, n, '#fff', 15, 'start', 700)}</g>`;
          });
          ex += `<g opacity="${f1(step === 6 ? sub(p, .1, .3) : 1 - ease(sub(p, 0, .3)))}">${pill(300, 760, 130, 30, 'CRM1 (XPO1)', C.prot2, 1, 14)}</g>`;
        }
        $('nl-exp').innerHTML = ex;
        // overzicht (laatste stap): alleen de hoofdlabels blijven staan
        const fo = step === 7 ? f1(1 - ease(sub(p, 0, .3))) : '1';
        svg.querySelectorAll('text:not(.keep):not(.ptitle)').forEach(el => el.setAttribute('opacity', fo));
      },
    };
  },
};
