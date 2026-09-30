import { C, L, svgOpen, cam, FULL } from '../../kit.js';

/* RNA-processing: cap → splicing (2 transesterificaties) → knippen + poly(A) → export. Getekend op ~3 px per nucleotide. */
function sceneProcessing() {
  const T = (nl, en) => L({ nl, en });
  return svgOpen() + `
    <!-- kernenvelop met porie bovenaan -->
    <path d="M-50,95 Q800,40 1650,95" stroke="#7aa0d8" stroke-width="5" fill="none" opacity=".7"/>
    <path d="M-50,112 Q800,57 1650,112" stroke="#9cc0ff" stroke-width="3" fill="none" opacity=".8"/>
    <g data-node="export" data-color="${C.prot}" data-label="${T('Kernporie · export', 'Nuclear pore · export')}">
      <g transform="translate(900 74)"><rect x="-26" y="-22" width="52" height="44" rx="10" fill="#0b1427" stroke="${C.prot}" stroke-width="3"/><rect x="-14" y="-6" width="28" height="12" rx="4" fill="${C.prot}" opacity=".5"/></g>
    </g>
    <text x="1440" y="40" fill="${C.muted}" font-size="20" font-family="Inter" opacity=".7">${T('cytoplasma', 'cytoplasm')}</text>
    <text x="1440" y="150" fill="${C.muted}" font-size="20" font-family="Inter" opacity=".7">${T('nucleoplasma', 'nucleoplasm')}</text>

    <g data-node="rnapol" data-color="${C.prot}" data-label="${T('RNA-polymerase II', 'RNA polymerase II')}"><g id="pr-pol"></g></g>
    <g id="pr-down"></g>
    <g data-node="splicing" data-color="${C.prot}" data-label="${T('Spliceosoom', 'Spliceosome')}"><g id="pr-intron"></g><g id="pr-snrnp"></g></g>
    <g data-node="rnaprocessing" data-nolabel><g id="pr-mrna"></g></g>
    <g data-node="capping" data-color="${C.rna}" data-label="${T("5'-cap", "5' cap")}"><g id="pr-cap"></g></g>
    <g data-node="nmd" data-color="${C.prot}" data-label="${T('EJC → NMD-controle', 'EJC → NMD check')}"><g id="pr-ejc"></g></g>
    <g data-node="polya" data-color="${C.rna}" data-label="${T('Knippen & poly(A)', 'Cleavage & poly(A)')}"><g id="pr-pa"></g></g>

    <g id="pr-legend" font-family="Inter" font-size="12" fill="${C.muted}">
      <rect x="60" y="850" width="26" height="8" rx="4" fill="${C.rna}"/><text x="94" y="858">${T('exon', 'exon')}</text>
      <rect x="160" y="852" width="26" height="4" rx="2" fill="#a9876f"/><text x="194" y="858">${T('intron', 'intron')}</text>
    </g>
  </svg>`;
}

function initProcessing(svg) {
  const $ = id => svg.getElementById(id);
  const T = (nl, en) => L({ nl, en });
  const Y = 520;
  // oorspronkelijke posities (px) langs het pre-mRNA; ~3 px per nucleotide
  const X = { cap: 146, e1: [160, 360], i1: [360, 680], br1: 640, e2: [680, 850], i2: [850, 1010], e3: [1010, 1200], utr: [1200, 1330], pas: [1250, 1292], cut: 1330, dse: [1362, 1404], down: [1330, 1500], pol: 1535 };
  const L1 = X.i1[1] - X.i1[0], L2 = X.i2[1] - X.i2[0];
  let ph = 0, P = 0;
  const prog = i => (i < ph ? 1 : i === ph ? P : 0);   // 0..1 binnen stap i
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const pill = (x, y, w, h, txt, col = C.prot, op = 1) => op <= 0 ? '' : `<g opacity="${op.toFixed(2)}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${col}" opacity=".85"/><text x="${x}" y="${y + 4}" font-size="12" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="600">${txt}</text></g>`;
  const seg = (x0, x1, y, col, w) => `<line x1="${x0.toFixed(1)}" y1="${y}" x2="${x1.toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const txt = (x, y, s, col = C.text, size = 12) => `<text x="${x.toFixed(1)}" y="${y}" font-size="${size}" text-anchor="middle" fill="${col}" font-family="JetBrains Mono" font-weight="600">${s}</text>`;

  function draw() {

    const lig1 = ease(prog(5)), lig2 = ease(prog(6));        // exon 1 schuift naar exon 2; daarna exon 1+2 naar exon 3
    const off = x => x + (x <= X.e1[1] + .1 ? lig1 * L1 : 0) + (x <= X.e2[1] + .1 ? lig2 * L2 : 0);
    const cut = prog(8) > .35, gone = ease(prog(10));
    const moveY = -330 * gone, fade = 1 - Math.max(0, (gone - .6) / .4);
    const up = `transform="translate(0 ${moveY.toFixed(1)})" opacity="${fade.toFixed(2)}"`;

    // mRNA-exonen (+ 3'-UTR)
    let m = `<g ${up}>`;
    m += seg(off(X.e1[0]), off(X.e1[1]), Y, C.rna, 9) + seg(off(X.e2[0]), off(X.e2[1]), Y, C.rna, 9) + seg(X.e3[0], X.e3[1], Y, C.rna, 9);
    m += seg(X.utr[0], X.utr[1], Y, '#d9854a', 6);
    m += txt(off((X.e1[0] + X.e1[1]) / 2), Y + 34, 'exon 1', C.rna) + txt(off((X.e2[0] + X.e2[1]) / 2), Y + 34, 'exon 2', C.rna) + txt((X.e3[0] + X.e3[1]) / 2, Y + 34, 'exon 3', C.rna);
    m += txt((X.pas[0] + X.pas[1]) / 2, Y - 16, 'AAUAAA', '#ffb27a', 13) + txt(X.utr[0] + 30, Y + 34, "3'-UTR", '#d9854a', 13);
    // poly(A)-staart
    const pa = ease(prog(9));
    if (ph >= 9) {
      const len = 150 * Math.min(1, pa + (ph > 9 ? 1 : 0));
      m += `<path d="M${X.cut},${Y} q${len * .4},${len * .05} ${len * .7},${len * .25} t${len * .3},${len * .15}" stroke="#ffb27a" stroke-width="5" fill="none" stroke-dasharray="2 3"/>`;
      for (let k = 12; k < len; k += 26) m += `<circle cx="${(X.cut + k * .95).toFixed(1)}" cy="${(Y + k * .22 + 6).toFixed(1)}" r="6" fill="${C.prot}" opacity=".7"/>`;
      if (len > 60) m += txt(X.cut + 90, Y + 72, 'poly(A)', '#ffb27a', 12);
    }
    m += `</g>`;
    $('pr-mrna').innerHTML = m;

    // 5'-cap (+ CBC)
    const capOp = Math.min(1, prog(0) * 1.6), capX = off(X.cap);
    $('pr-cap').innerHTML = `<g ${up}>` + (capOp > 0 ? `<g opacity="${capOp}"><circle cx="${capX}" cy="${Y}" r="13" fill="#ffb27a" stroke="${C.rna}" stroke-width="2"/><text x="${capX}" y="${Y + 4}" font-size="9" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text></g>` : '')
      + pill(capX + 6, Y - 52, 110, 24, 'RNGTT · RNMT', C.prot, ph === 0 ? 1 - Math.max(0, (prog(0) - .75) / .25) : 0)
      + pill(capX - 4, Y - 30, 46, 20, 'CBC', '#6f5bd6', ph >= 1 ? 1 : 0)
      + txt(capX - 10, Y - 60, "5'", C.text, 13) + `</g>`;

    // introns: intron 1 vormt de lariat, intron 2 wordt korter en verdwijnt
    const lar = ease(prog(4));                                // 0 = recht, 1 = lariat
    const rel = ease(prog(5));                                // lariat komt vrij
    let intr = '';
    if (ph <= 5) {
      const a0 = X.i1[0], bx = X.br1, a1 = X.i1[1], r = (bx - a0) / (2 * Math.PI);
      const cx = bx, cy = Y - 18 - r;
      let d = '';
      for (let k = 0; k <= 40; k++) {
        const f = k / 40, sx = a0 + f * (bx - a0), sy = Y;
        const ang = Math.PI / 2 + f * 2 * Math.PI;             // cirkel die sluit aan het vertakkingspunt
        const lx = cx + r * Math.cos(ang) * -1, ly = cy + r * Math.sin(ang);
        const px = sx + (lx - sx) * lar, py = sy + (ly - sy) * lar;
        d += `${k ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`;
      }
      d += `L${bx},${Y - 18 * lar} L${a1},${Y}`;
      intr += `<g transform="translate(0 ${(-170 * rel).toFixed(1)})" opacity="${(1 - rel * .9).toFixed(2)}">
        <path d="${d}" stroke="#a9876f" stroke-width="4" fill="none" stroke-linejoin="round"/>
        ${txt(a0 + 14, Y - 14, lar < .3 ? 'GU' : '', '#ffc247', 11)}
        ${txt(bx, Y - 30 * lar - 10, 'A', '#5ad17a', 13)}
        ${txt(a1 - 18, Y - 14, 'AG', '#ffc247', 11)}
        ${lar < .1 ? txt(a1 - 58, Y + 22, '(Py)n', '#a9876f', 11) : ''}
      </g>`;
    }
    if (ph <= 6) {
      const s2 = off(X.i2[0]), e2 = X.i2[1];
      if (e2 - s2 > 2) intr += `<g opacity="${(1 - lig2).toFixed(2)}">${seg(s2, e2, Y, '#a9876f', 4)}${lig2 < .2 ? txt(s2 + 14, Y - 14, 'GU', '#ffc247', 11) + txt(e2 - 16, Y - 14, 'AG', '#ffc247', 11) : ''}</g>`;
      if (ph === 6) intr += `<circle cx="${(e2 - 30).toFixed(1)}" cy="${(Y - 40 - 90 * lig2).toFixed(1)}" r="${(14 * (1 - lig2 * .3)).toFixed(1)}" fill="none" stroke="#a9876f" stroke-width="3" opacity="${(lig2 * (1 - lig2) * 4).toFixed(2)}"/>`;
    }
    $('pr-intron').innerHTML = intr;

    // snRNP's rond intron 1
    const fadeIn = (i, t0 = 0) => Math.min(1, Math.max(0, (prog(i) - t0) * 3));
    const u1 = ph < 1 ? 0 : ph <= 2 ? fadeIn(1) : ph === 3 ? 1 - prog(3) * 1.5 : 0;
    const u2af = ph < 1 ? 0 : ph <= 3 ? fadeIn(1) : ph === 4 ? 1 - prog(4) * 2 : 0;
    const u2 = ph < 1 ? 0 : ph === 1 ? fadeIn(1, .4) : ph <= 5 ? 1 - (ph === 5 ? prog(5) : 0) : 0;
    const tri = ph < 2 ? 0 : ph === 2 ? fadeIn(2) : ph <= 5 ? 1 - (ph === 5 ? prog(5) : 0) : 0;
    const u4 = ph < 2 ? 0 : ph === 2 ? fadeIn(2) : ph === 3 ? 1 - prog(3) * 1.5 : 0;
    const lyUp = -170 * rel;
    let sn = '';
    if (tri > 0) sn += `<g opacity="${tri.toFixed(2)}" transform="translate(0 ${lyUp.toFixed(1)})"><ellipse cx="${(X.i1[0] + X.br1) / 2 + 20}" cy="${Y - 110}" rx="170" ry="62" fill="rgba(155,123,255,.16)" stroke="${C.prot}" stroke-width="2" stroke-dasharray="6 4"/></g>`;
    sn += `<g transform="translate(0 ${lyUp.toFixed(1)})">`;
    sn += pill(X.i1[0] + 6, Y - 34, 44, 24, 'U1', '#8e6cf0', Math.max(0, u1));
    sn += pill(X.br1, Y + 34, 44, 24, 'U2', '#6f5bd6', Math.max(0, u2));
    sn += pill(X.i1[1] - 28, Y + 60, 64, 22, 'U2AF', '#5a4bb8', Math.max(0, u2af));
    sn += pill(X.i1[0] + 110, Y - 132, 86, 24, 'U6·U5', '#8e6cf0', tri);
    sn += pill(X.i1[0] + 220, Y - 132, 50, 24, 'U4', '#5a4bb8', Math.max(0, u4));
    sn += `</g>`;
    $('pr-snrnp').innerHTML = sn;

    // EJC ~20–24 nt stroomopwaarts van elke exon-exonjunctie
    const ejc = [];
    if (ph >= 5 && lig1 > .95) ejc.push(off(X.e1[1]) - 66);
    if (ph >= 6 && lig2 > .95) ejc.push(off(X.e2[1]) - 66);
    $('pr-ejc').innerHTML = `<g ${up}>` + ejc.map(x => pill(x, Y - 26, 44, 20, 'EJC', '#7a62e0')).join('') + `</g>`;

    // 3'-uiteinde: CPSF/CstF, knippen, PAP, Xrn2-torpedo op het stroomafwaartse RNA, Pol II
    const f3 = ph < 7 ? 0 : ph === 7 ? fadeIn(7) : ph <= 9 ? 1 : 0;
    const cstf = ph < 7 ? 0 : ph === 7 ? fadeIn(7) : ph === 8 ? 1 - prog(8) : 0;
    let p3 = `<g ${up}>`;
    p3 += pill((X.pas[0] + X.pas[1]) / 2, Y - 46, 64, 24, 'CPSF', '#8e6cf0', f3);
    p3 += `</g>`;
    p3 += pill((X.dse[0] + X.dse[1]) / 2, Y + 40, 60, 22, 'CstF', '#5a4bb8', cstf);
    if (ph === 8 && prog(8) > .3 && prog(8) < .6) p3 += `<path d="M${X.cut - 10},${Y - 22} l20,44 M${X.cut + 10},${Y - 22} l-20,44" stroke="#fff" stroke-width="3" opacity=".9"/>`;
    if (ph === 9) p3 += pill(X.cut + 40 + 120 * ease(prog(9)), Y + 18 + 30 * ease(prog(9)), 50, 22, 'PAP', '#6f5bd6');
    $('pr-pa').innerHTML = p3;

    // stroomafwaarts RNA naar Pol II + Xrn2
    const chew = ph < 8 ? 0 : ph === 8 ? Math.max(0, (prog(8) - .45) / .55) * .5 : ph === 9 ? .5 + .5 * prog(9) : 1;
    const polOp = ph < 9 ? 1 : ph === 9 ? 1 - Math.max(0, (prog(9) - .6) / .4) : 0;
    let dn = '';
    const ds = cut ? X.cut + 6 + chew * (X.down[1] - X.cut) : X.cut;
    if (!cut) dn += seg(X.cut, X.down[1], Y, '#c07a4a', 5);
    else if (ds < X.down[1] - 2) dn += seg(ds, X.down[1], Y, '#c07a4a', 5) + `<g opacity="${polOp.toFixed(2)}">${pill(ds - 4, Y - 26, 52, 22, 'Xrn2', '#5a4bb8')}</g>`;
    dn += txt((X.dse[0] + X.dse[1]) / 2, Y + 20, ph < 9 ? L({ nl: 'GU-rijk', en: 'GU-rich' }) : '', '#c07a4a', 10);
    $('pr-down').innerHTML = dn;
    $('pr-pol').innerHTML = polOp > 0 ? `<g opacity="${polOp.toFixed(2)}" transform="translate(${X.pol} ${Y})"><path d="M-40,-10 C-40,-60 10,-70 40,-50 C70,-30 70,30 40,50 C10,70 -40,60 -40,-10Z" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="3"/><text x="0" y="5" font-size="12" text-anchor="middle" fill="${C.text}" font-family="Inter">Pol II</text></g>
      <line x1="${X.pol + 10}" y1="${Y + 58}" x2="1650" y2="${Y + 58}" stroke="${C.dna}" stroke-width="5" opacity="${polOp.toFixed(2)}"/>` : '';
  }
  return { update(t, s) { ph = s.step; P = s.p; draw(); } };
}


export default {
  id: 'rnaprocessing',
  title: { nl: 'RNA-processing', en: 'RNA processing' }, scale: '≈ 50 nm',
  time: { nl: 'seconden – minuten (hier vertraagd)', en: 'seconds – minutes (slowed down here)' },
  org: { nl: 'mens (Pol II-transcripten)', en: 'human (Pol II transcripts)' },
  legend: [[C.rna, 'exon'], ['#a9876f', 'intron'], ['#ffb27a', { nl: 'm⁷G-cap / poly(A)', en: 'm⁷G cap / poly(A)' }], [C.prot, { nl: "snRNP's & processingfactoren", en: 'snRNPs & processing factors' }], [C.dna, 'DNA']],
  extra: {
    nl: `<p style="font-size:13px;color:#93a0bb">Examenrelevant: splicing = <b>twee transesterificaties</b>. Eerst valt de 2'-OH van het vertakkingspunt-A de 5'-splicesite aan (lariat), daarna de vrije 3'-OH van exon 1 de 3'-splicesite. De katalyse gebeurt door RNA (U2/U6): het spliceosoom is een ribozym.</p>`,
    en: `<p style="font-size:13px;color:#93a0bb">Exam-relevant: splicing = <b>two transesterifications</b>. First the 2'-OH of the branch-point A attacks the 5' splice site (lariat), then the free 3'-OH of exon 1 attacks the 3' splice site. Catalysis is carried out by RNA (U2/U6): the spliceosome is a ribozyme.</p>` },
  simplified: {
    nl: "De stappen staan na elkaar, maar in de cel overlappen ze en gebeuren ze grotendeels terwijl Pol II nog transcribeert. Het spliceosoom bevat ook ~100–150 eiwitten (o.a. Prp8, helicasen) die niet getekend zijn; de U-snRNP's zijn bolletjes. De poly(A)-staart en afstanden zijn niet op schaal (~3 px per nt). Echte structuren: PDB 5YZG (humaan C-complex na stap 1), 5XJC (C*-complex vlak voor de exonligatie).",
    en: 'The steps are shown one after another, but in the cell they overlap and happen largely while Pol II is still transcribing. The spliceosome also contains ~100–150 proteins (e.g. Prp8, helicases) that are not drawn; the U snRNPs are shown as blobs. The poly(A) tail and distances are not to scale (~3 px per nt). Real structures: PDB 5YZG (human C complex after step 1), 5XJC (C* complex just before exon ligation).' },
  steps: [
    { dur: 6600, cam: cam(210, 500, 520), title: { nl: 'Capping', en: 'Capping' },
      text: { nl: "RNGTT verwijdert een fosfaat en koppelt GMP 5'–5'; RNMT methyleert → m⁷G-cap, daarna gebonden door CBC", en: "RNGTT removes a phosphate and adds GMP 5'–5'; RNMT methylates → m⁷G cap, then bound by CBC" } },
    { dur: 7200, cam: cam(520, 500, 820), title: { nl: 'Spliceosoom: herkenning (E/A-complex)', en: 'Spliceosome: recognition (E/A complex)' },
      text: { nl: "U1 paart met de 5'-splicesite (GU), U2AF bindt het polypyrimidinestuk en AG, U2 paart rond het vertakkingspunt-A (de A puilt uit)", en: "U1 pairs with the 5' splice site (GU), U2AF binds the polypyrimidine tract and AG, U2 pairs around the branch-point A (the A bulges out)" } },
    { dur: 5400, cam: cam(520, 470, 820), title: { nl: 'Tri-snRNP bindt (B-complex)', en: 'Tri-snRNP joins (B complex)' },
      text: { nl: 'Het U4/U6·U5-tri-snRNP voegt zich bij het complex', en: 'The U4/U6·U5 tri-snRNP joins the complex' } },
    { dur: 4800, cam: cam(540, 470, 820), title: { nl: 'Activatie', en: 'Activation' },
      text: { nl: 'U1 en U4 verlaten het complex; U6 paart met de 5\'-splicesite en met U2 → katalytisch actief spliceosoom (RNA-katalyse)', en: "U1 and U4 leave; U6 pairs with the 5' splice site and with U2 → catalytically active spliceosome (RNA catalysis)" } },
    { dur: 7200, cam: cam(560, 470, 700), title: { nl: 'Eerste transesterificatie', en: 'First transesterification' },
      text: { nl: "De 2'-OH van het vertakkingspunt-A valt de 5'-splicesite aan → vrij exon 1 + lariat-intermediair (2'–5'-binding)", en: "The 2'-OH of the branch-point A attacks the 5' splice site → free exon 1 + lariat intermediate (2'–5' bond)" } },
    { dur: 7800, cam: cam(560, 460, 820), title: { nl: 'Tweede transesterificatie', en: 'Second transesterification' },
      text: { nl: "De 3'-OH van exon 1 valt de 3'-splicesite aan → exonen gekoppeld, lariat vrij (DBR1 ontvertakt, daarna afbraak); EJC blijft ~20–24 nt stroomopwaarts van de junctie", en: "The 3'-OH of exon 1 attacks the 3' splice site → exons joined, lariat released (debranched by DBR1, then degraded); an EJC stays ~20–24 nt upstream of the junction" } },
    { dur: 5400, cam: cam(860, 480, 900), title: { nl: 'Tweede intron', en: 'Second intron' },
      text: { nl: 'Zelfde mechanisme; splicing verloopt grotendeels co-transcriptioneel', en: 'Same mechanism; splicing is largely co-transcriptional' } },
    { dur: 6000, cam: cam(1300, 500, 700), title: { nl: "3'-herkenning", en: "3' end recognition" },
      text: { nl: 'CPSF bindt het AAUAAA-signaal, CstF het GU-rijke element stroomafwaarts', en: 'CPSF binds the AAUAAA signal, CstF the GU-rich element downstream' } },
    { dur: 6400, cam: cam(1380, 500, 700), title: { nl: 'Knippen', en: 'Cleavage' },
      text: { nl: "CPSF73 knipt ~10–30 nt na AAUAAA. Xrn2 breekt het stroomafwaartse RNA af en helpt Pol II loskomen (torpedomodel)", en: "CPSF73 cleaves ~10–30 nt after AAUAAA. Xrn2 degrades the downstream RNA and helps release Pol II (torpedo model)" } },
    { dur: 7800, cam: cam(1300, 520, 720), title: { nl: 'Polyadenylatie', en: 'Polyadenylation' },
      text: { nl: 'Poly(A)-polymerase voegt ~200–250 A toe; PABPN1 bedekt de staart en regelt de lengte', en: 'Poly(A) polymerase adds ~200–250 A; PABPN1 coats the tail and controls its length' } },
    { dur: 9000, cam: cam(900, 330, 1250), title: { nl: 'Rijp mRNP → export', en: 'Mature mRNP → export' },
      text: { nl: 'TREX en de exportreceptor NXF1–NXT1 brengen het mRNP naar de kernporie', en: 'TREX and the export receptor NXF1–NXT1 take the mRNP to the nuclear pore' } },
  ],
  svg: sceneProcessing,
  init: initProcessing,
};
