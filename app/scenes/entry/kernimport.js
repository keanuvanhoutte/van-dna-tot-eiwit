import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { capsid, viralGenome, microtubule, motor, npc, PINK, FIBRE } from './_bits.js';

/* Hoofdstuk 4: door de kernporie. Cytoplasma boven, kern onder; één groot NPC in doorsnede. */
const OUT = 470, IN = 530, PX = 800, PY = 500, S = 1.6;
const HALF = 105 * S / 1.6;            // halve breedte van de porieopening in het membraan
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const r = rng(23);
let CHROM = '';
for (let i = 0; i < 26; i++) CHROM += `<path d="${squiggle(r, 120 + r() * 1360, 620 + r() * 250, 8, 12, 12)}" stroke="${C.dna}" stroke-width="${f1(1.6 + r() * 1.6)}" fill="none" opacity="${f1(.22 + r() * .35)}"/>`;

export default {
  id: 'kernimport',
  title: { nl: 'Kernporie & kernimport', en: 'Nuclear pore complex & import' },
  scale: { nl: '≈ 120 nm (kernporiecomplex)', en: '≈ 120 nm (nuclear pore complex)' },
  time: { nl: 'één translocatie in enkele ms', en: 'one translocation in a few ms' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [[C.prot, { nl: 'nucleoporinen (Nup)', en: 'nucleoporins (Nup)' }], ['#b9a6ff', { nl: 'FG-herhalingen', en: 'FG repeats' }],
    ['#7fdc6a', 'NLS'], [C.prot2, { nl: 'importine α/β', en: 'importin α/β' }], ['#5fd3e6', 'Ran·GTP'],
    [PINK, { nl: 'adenovirus / viraal DNA', en: 'adenovirus / viral DNA' }], [C.dna, { nl: 'chromatine', en: 'chromatin' }]],
  simplified: {
    nl: 'Het porie-complex is achtvoudig symmetrisch; we tekenen één doorsnede, dus slechts twee van de acht "spaken". De FG-herhalingen zijn als losse slierten getekend — hun echte, snel bewegende netwerk is niet met één beeld te vangen. Van de ~30 nucleoporinen noemen we er drie (Nup214, Nup358, Nup88). Ran, RCC1 en RanGAP staan symbolisch; het capside van het adenovirus is sterk vergroot.',
    en: 'The pore complex is eightfold symmetric; we draw a single cross-section, so only two of the eight "spokes". The FG repeats are drawn as loose strands — their real, fast-moving meshwork cannot be captured in one frame. Of the ~30 nucleoporins we name three (Nup214, Nup358, Nup88). Ran, RCC1 and RanGAP are symbolic, and the adenovirus capsid is greatly enlarged.' },
  steps: [
    ST(7000, cam(820, 330, 1450), 'Het capside komt aan bij de kern', 'The capsid arrives at the nucleus',
      'Dyneïne heeft het capside over microtubuli naar de kern gesleept. De kernenvelop is een dubbel membraan vol poriën; het buitenste loopt door in het ER.',
      'Dynein has dragged the capsid along microtubules to the nucleus. The nuclear envelope is a double membrane full of pores; the outer one is continuous with the ER.'),
    ST(8000, cam(PX, 500, 900), 'Het kernporiecomplex', 'The nuclear pore complex',
      'Ongeveer 30 verschillende nucleoporinen, in veelvouden van acht: cytoplasmatische filamenten, een ring in het membraan en een kernmandje. Een menselijke kern heeft er duizenden (HeLa ~3 000).',
      'About 30 different nucleoporins, in multiples of eight: cytoplasmic filaments, a ring in the membrane and a nuclear basket. A human nucleus has thousands (HeLa ~3,000).'),
    ST(7000, cam(PX, 495, 700), 'De FG-zeef', 'The FG sieve',
      'Het kanaal is gevuld met ongeordende FG-herhalingen. Kleine moleculen (< ~40 kDa, ~5 nm) glippen er passief door; grotere alleen met een transportfactor.',
      'The channel is filled with disordered FG repeats. Small molecules (< ~40 kDa, ~5 nm) slip through passively; larger ones only with a transport factor.'),
    ST(7000, cam(580, 380, 900), 'Importine α/β leest de NLS', 'Importin α/β reads the NLS',
      'Een kernsignaal (NLS) in de vracht wordt door importine α herkend; importine β koppelt eraan en kan wél door de FG-zeef.',
      'A nuclear localisation signal (NLS) in the cargo is recognised by importin α; importin β attaches and can pass through the FG sieve.'),
    ST(6000, cam(PX, 520, 860), 'Door het kanaal', 'Through the channel',
      'Het complex glijdt van FG-herhaling naar FG-herhaling door het kanaal — het is geen pomp maar een selectieve zeef.',
      'The complex hops from FG repeat to FG repeat through the channel — it is not a pump but a selective sieve.'),
    ST(8000, cam(830, 600, 1050), 'De Ran-gradiënt bepaalt de richting', 'The Ran gradient sets the direction',
      'In de kern maakt RCC1 op het chromatine Ran·GTP; dat bindt importine β en laat de vracht los. In het cytoplasma breekt RanGAP het GTP weer af.',
      'In the nucleus RCC1 on chromatin makes Ran·GTP; it binds importin β and releases the cargo. In the cytoplasm RanGAP hydrolyses the GTP again.'),
    ST(7000, cam(880, 380, 1100), 'Het virus dokt aan Nup214', 'The virus docks onto Nup214',
      'Het deels ontmantelde adenoviruscapside is veel te groot om door de porie te gaan. Het dokt met een hexon aan de nucleoporine Nup214.',
      'The partly disassembled adenovirus capsid is far too large to pass through the pore. It docks with a hexon onto the nucleoporin Nup214.'),
    ST(7000, cam(900, 420, 950), 'Kinesine-1 trekt het capside kapot', 'Kinesin-1 tears the capsid apart',
      'Kinesine-1 bindt via Nup358 aan de porie en met zijn lichte keten aan het capside; het trekt de resten uit elkaar. Histon H1 helpt bij de ontmanteling.',
      'Kinesin-1 binds the pore via Nup358 and the capsid with its light chain; it pulls the remains apart. Histone H1 assists the disassembly.'),
    ST(8000, cam(840, 600, 1080), 'Het genoom is binnen', 'The genome is inside',
      'Het virale DNA gaat met proteïne VII de kern in en blijft daar episomaal. RNA-polymerase II van de cel leest nu de virale genen — net als de eigen genen.',
      'The viral DNA enters the nucleus with protein VII and stays episomal. The cell’s own RNA polymerase II now reads the viral genes — just like its own genes.'),
  ],

  svg() {
    const memSide = (x0, x1) => `<path d="M${x0},${OUT} L${x1},${OUT}" stroke="#7aa0d8" stroke-width="9"/><path d="M${x0},${IN} L${x1},${IN}" stroke="#9cc0ff" stroke-width="9"/>`;
    const lip = x => `<path d="M${x},${OUT} q${x < PX ? 26 : -26},0 ${x < PX ? 26 : -26},30 q0,30 ${x < PX ? -26 : 26},30" stroke="#8ab0e4" stroke-width="9" fill="none"/>`;
    return svgOpen() + `
    <rect x="-400" y="${IN}" width="2400" height="1400" fill="url(#gNuc)"/>
    <g data-node="chromatine" data-color="${C.dna}" data-nolabel>${CHROM}</g>
    <text x="140" y="${OUT - 70}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('cytoplasma', 'cytoplasm')}</text>
    <text x="140" y="${IN + 90}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('nucleoplasma', 'nucleoplasm')}</text>
    <g data-node="kern" data-color="#9cc0ff" data-nolabel>${memSide(-400, PX - 126)}${memSide(PX + 126, 2000)}${lip(PX - 126)}${lip(PX + 126)}</g>
    <g id="ki-memlab">${txt(PX + 140, OUT - 16, T2('buitenste kernmembraan', 'outer nuclear membrane'), '#7aa0d8', 21, 'start', 500)}
    ${txt(PX + 140, IN + 36, T2('binnenste kernmembraan', 'inner nuclear membrane'), '#9cc0ff', 21, 'start', 500)}</g>
    <g id="ki-mt" opacity="0"></g>
    <g id="ki-otherpores" opacity=".55"></g>

    <g data-node="kern" data-color="${C.dna}" data-label="${T2('Celkern', 'Nucleus')}">
      <circle data-anchor="kern" data-pos="below" cx="380" cy="760" r="1" fill="none"/>
      <rect x="120" y="600" width="520" height="280" fill="transparent"/>
    </g>
    <g id="ki-npc">${npc(PX, PY, S)}</g>
    <g id="ki-ran"></g>
    <g id="ki-cargo"></g>
    <g id="ki-thread"></g>
    <g data-node="adeno" data-color="${PINK}" data-label="${T2('Adenoviruscapside', 'Adenovirus capsid')}">
      <g id="ki-virus" opacity="0"></g><circle id="ki-virus-a" data-anchor="adeno" cx="${PX}" cy="200" r="1" fill="none"/>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Pol II leest de genen', 'Pol II reads the genes')}" id="ki-txn" opacity="0">
      <circle data-anchor="transcriptie" data-pos="below" cx="1120" cy="800" r="1" fill="none"/>
      <g data-node="rnapol" data-color="${C.prot}" data-nolabel><g id="ki-pol"></g></g>
      <g id="ki-txn-body"></g>
    </g>
    <g data-node="dnahelix" data-href="../atlas/index.html?id=bdna" data-color="${PINK}" data-label="${T2('Viraal dsDNA — atlas', 'Viral dsDNA — atlas')}" id="ki-epi" opacity="0">
      <circle data-anchor="dnahelix" cx="760" cy="640" r="1" fill="none"/>
      <g id="ki-epi-body"></g>
    </g>
    <g id="ki-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    const impGlyph = (x, y, sc, op = 1) => op <= .01 ? '' : `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}">
      <path d="M-74,-30 a56,56 0 1,0 0,60 a40,40 0 1,1 0,-60" fill="${C.prot2}"/>${txt(-96, 6, 'β', '#fff', 26)}
      <rect x="-44" y="-26" width="42" height="52" rx="14" fill="${C.prot3}"/>${txt(-23, 8, 'α', '#fff', 22)}</g>`;
    const cargoOnly = (x, y, sc, op = 1) => op <= .01 ? '' : `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}">
      <rect x="4" y="-34" width="86" height="68" rx="18" fill="${C.prot}" stroke="#2a1f4a" stroke-width="2"/>
      ${txt(56, 6, T2('vracht', 'cargo'), '#fff', 17)}
      <rect x="-8" y="-12" width="30" height="24" rx="7" fill="#7fdc6a"/>${txt(7, 6, 'NLS', '#0a1224', 13)}</g>`;
    const cargoGlyph = (x, y, sc, imp) => impGlyph(x, y, sc, imp) + cargoOnly(x, y, sc, 1);

    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;

        $('ki-memlab').setAttribute('opacity', step === 0 ? '1' : '0');
        /* andere poriën in beeld */
        $('ki-otherpores').innerHTML = [-520, 520, 1050].map(dx => npc(PX + dx, PY, S * .55)).join('');

        /* microtubule + capside */
        const mtOn = step === 0 ? 1 : step < 6 ? .25 : 1;
        $('ki-mt').setAttribute('opacity', f1(mtOn));
        $('ki-mt').innerHTML = microtubule(120, 150, PX + 30, 300, 16);

        let vOp = 0, vx = PX + 30, vy = 300, vmiss = [1, 4], vfib = 18;
        if (step === 0) { const u = ease(sub(p, .1, .85)); vOp = 1; vx = lerp(200, PX + 20, u); vy = lerp(180, 285, u); }
        else if (step < 6) { vOp = 0; vx = PX + 20; vy = 285; }
        else if (step === 6) { vOp = 1; const u = ease(sub(p, .2, .8)); vx = PX + 20; vy = lerp(285, 318, u); }
        else if (step === 7) { vOp = 1; vx = PX + 20 + Math.sin(tt * 7) * 5 * ease(sub(p, .3, .8)); vy = 318; vmiss = p > .5 ? [0, 1, 3, 4] : [1, 4]; }
        else { vOp = 1 - ease(sub(p, .1, .5)); vx = PX + 20; vy = 318; vmiss = [0, 1, 2, 3, 4, 5]; vfib = 10; }
        $('ki-virus').setAttribute('opacity', f1(vOp));
        $('ki-virus').innerHTML = vOp > .02
          ? `<g transform="translate(${f1(vx)} ${f1(vy)})">${capsid(78, { fibre: vfib, missing: vmiss })}${step >= 6 ? viralGenome(62, .95) : ''}</g>` : '';
        $('ki-virus-a').setAttribute('opacity', vOp > .1 ? '1' : '0'); $('ki-virus-a').setAttribute('cx', f1(vx)); $('ki-virus-a').setAttribute('cy', f1(vy - 92));

        /* NPC met FG-slierten (dichtheid onveranderd, accent in stap 2) */
        $('ki-npc').innerHTML = npc(PX, PY, S, { fg: 1 });

        /* NLS-vracht door de porie */
        let cg = '';
        if (step >= 3 && step <= 5) {
          let x = 470, y = 330, imp = 0, nls = 1;
          if (step === 3) { imp = ease(sub(p, .35, .75)); x = lerp(440, 520, ease(p)); y = lerp(320, 345, ease(p)); }
          else if (step === 4) { const u = ease(sub(p, .1, .9)); imp = 1; x = lerp(520, PX, u); y = lerp(345, PY, u); }
          else { const u = ease(sub(p, .1, .6)); imp = 1; x = PX; y = lerp(PY, 660, u); }
          const sc = .95;
          if (step === 5 && p > .55) {
            const k = ease(sub(p, .55, .95));
            cg += cargoOnly(x + 90 * k, y + 46 * k, sc, 1);
            cg += impGlyph(x - 120 * k, y - 34 * k, sc, 1);
            cg += `<circle cx="${f1(x - 120 * k - 66 * sc)}" cy="${f1(y - 34 * k)}" r="14" fill="#5fd3e6" opacity="${f1(k)}"/>${txt(x - 120 * k - 66 * sc, y - 34 * k + 5, 'Ran', '#062', 12)}`;
          } else cg += cargoGlyph(x, y, sc, imp);
        }
        $('ki-cargo').innerHTML = cg;

        /* Ran-gradiënt */
        let ran = '';
        if (step === 5 || step === 6) {
          const k = step === 5 ? ease(sub(p, .1, .5)) : 1 - ease(clamp(p / .25));
          ran += `<g opacity="${f1(k)}">`;
          for (let i = 0; i < 14; i++) {
            const x = 180 + ((i * 137) % 1280), y = 620 + ((i * 83) % 230);
            if (Math.abs(x - 1000) < 210 && Math.abs(y - 792) < 34) continue;   // vrije plek voor het label
            ran += `<circle cx="${x}" cy="${y}" r="13" fill="#5fd3e6" opacity=".85"/>${txt(x, y + 5, 'Ran', '#062', 11)}`;
          }
          ran += `${txt(1000, 798, T2('RCC1 op chromatine → Ran·GTP (hoog)', 'RCC1 on chromatin → Ran·GTP (high)'), '#5fd3e6', 20)}`;
          for (let i = 0; i < 4; i++) {
            const x = 380 + i * 300, y = 420;
            ran += `<circle cx="${x}" cy="${y}" r="11" fill="#5fd3e6" opacity=".3"/>`;
          }
          ran += `${txt(520, 385, T2('RanGAP → Ran·GDP (laag)', 'RanGAP → Ran·GDP (low)'), '#5fd3e6', 20, 'middle', 600)}</g>`;
        }
        $('ki-ran').innerHTML = ran;

        /* episoom + transcriptie */
        const thr = step === 8 ? ease(sub(p, 0, .45)) : 0;
        const dnaPath = `M${PX + 20},318 C${PX + 10},420 ${PX - 10},560 ${PX - 20},640 S740,650 700,700`;
        $('ki-thread').innerHTML = thr > .01 && step === 8
          ? `<path d="${dnaPath}" stroke="${PINK}" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="520" stroke-dashoffset="${f1(520 * (1 - thr))}" opacity="${f1(1 - ease(sub(p, .6, .9)) * .6)}"/>
             ${[0, 1, 2, 3].map(i => { const u = clamp(thr - i * .12); return u > .02 ? `<circle cx="${f1(PX + 18 - u * 28)}" cy="${f1(318 + u * 330)}" r="8" fill="#c98fe0"/>` : ''; }).join('')}` : '';
        const epiOn = step === 8 ? ease(sub(p, .4, .7)) : 0;
        $('ki-epi').setAttribute('opacity', f1(epiOn));
        $('ki-epi-body').innerHTML = epiOn > .01
          ? `<g transform="translate(760 720)"><ellipse rx="130" ry="72" fill="none" stroke="${PINK}" stroke-width="6"/>
             ${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${f1(Math.cos(a * Math.PI / 180) * 130)}" cy="${f1(Math.sin(a * Math.PI / 180) * 72)}" r="9" fill="#c98fe0"/>`).join('')}
             ${txt(0, 6, T2('episomaal viraal DNA', 'episomal viral DNA'), PINK, 21)}</g>` : '';
        const txnOn = step === 8 ? ease(sub(p, .55, .9)) : 0;
        $('ki-txn').setAttribute('opacity', f1(txnOn));
        $('ki-pol').innerHTML = txnOn > .01
          ? `<g transform="translate(1120 720)"><ellipse rx="52" ry="42" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/>
             ${txt(0, 6, 'Pol II', '#e8edf7', 20)}</g>` : '';
        $('ki-txn-body').innerHTML = txnOn > .01
          ? `<g transform="translate(1120 720)"><path d="M40,-30 q40,-30 90,-18" stroke="${C.rna}" stroke-width="5" fill="none"/>
             ${txt(150, -60, T2('viraal mRNA', 'viral mRNA'), C.rna, 20)}</g>` : '';

        /* notities */
        let no = '';
        if (step === 1) {
          const k = ease(sub(p, .2, .6));
          no += `<g opacity="${f1(k)}">
            ${txt(PX - 235, PY - 170, T2('cytoplasmatische filamenten', 'cytoplasmic filaments'), C.prot, 20)}
            <line x1="${PX - 190}" y1="${PY - 160}" x2="${PX - 116}" y2="${PY - 116}" stroke="${C.prot}" stroke-width="2"/>
            ${txt(PX + 270, PY - 70, T2('ring in het membraan', 'ring in the membrane'), C.prot, 20)}
            <line x1="${PX + 230}" y1="${PY - 62}" x2="${PX + 130}" y2="${PY - 20}" stroke="${C.prot}" stroke-width="2"/>
            ${txt(PX - 260, PY + 135, T2('kernmandje', 'nuclear basket'), C.prot, 20)}
            <line x1="${PX - 200}" y1="${PY + 128}" x2="${PX - 110}" y2="${PY + 110}" stroke="${C.prot}" stroke-width="2"/>
            ${txt(PX + 250, PY - 200, T2('≈ 110–120 MDa · ~3 000 poriën per kern', '≈ 110–120 MDa · ~3,000 pores per nucleus'), C.muted, 19)}</g>`;
        }
        if (step === 2) {
          const k = ease(sub(p, .15, .5));
          no += `<g opacity="${f1(k)}">${txt(PX - 220, PY - 130, T2('FG-herhalingen', 'FG repeats'), '#b9a6ff', 20)}
            ${txt(PX + 230, PY + 80, T2('passief: < ~40 kDa', 'passive: < ~40 kDa'), '#7fdc6a', 18)}
            ${txt(PX + 230, PY + 104, '(~5 nm)', '#7fdc6a', 16)}
            ${txt(PX + 230, PY + 140, T2('groter: carrier nodig', 'larger: needs a carrier'), '#ff9d5c', 18)}
            <circle cx="${f1(PX + Math.sin(tt * 2) * 34)}" cy="${f1(PY - 40 + ((tt * 90) % 160))}" r="9" fill="#7fdc6a"/></g>`;
        }
        if (step === 3) no += `<g opacity="${f1(ease(sub(p, .4, .8)))}">${txt(640, 240, T2('NLS = basische aminozuren (bv. PKKKRKV)', 'NLS = basic amino acids (e.g. PKKKRKV)'), '#7fdc6a', 19)}</g>`;
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(PX + 340, 300, 'Nup214', C.prot, 24)}
          <line x1="${PX + 270}" y1="306" x2="${PX + 130}" y2="365" stroke="${C.prot}" stroke-width="2"/>
          ${txt(PX - 150, 190, T2('capside ≈ 90 nm · kanaal ~40 nm', 'capsid ≈ 90 nm · channel ~40 nm'), C.muted, 20)}</g>`;
        if (step === 7) {
          const k = ease(sub(p, .2, .6));
          no += `<g opacity="${f1(k)}">${motor(PX + 190, 372, 200, 1.5, '#b9a6ff', tt * 7, -1)}
            ${txt(PX + 330, 300, T2('kinesine-1 (Kif5C via Nup358)', 'kinesin-1 (Kif5C via Nup358)'), '#b9a6ff', 20)}
            ${txt(PX - 250, 430, T2('+ histon H1', '+ histone H1'), '#b9a6ff', 20)}</g>`;
        }
        $('ki-notes').innerHTML = no;
      },
    };
  },
};
