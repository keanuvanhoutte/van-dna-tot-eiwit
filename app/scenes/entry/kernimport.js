import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { capsid, capsidBreuk, viralGenome, microtubule, motor, kinesineGreep, linDNA, npc, PINK, FIBRE } from './_bits.js';
import { kernEnvelopLijn, polII } from '../../bio.js';

/* Hoofdstuk 4: door de kernporie. Cytoplasma boven, kern onder; één groot NPC in doorsnede.
 * Kernenvelop (detailronde): twee lipidedubbellagen die aan elke porie in elkaar overgaan (kernEnvelopLijn uit bio.js;
 * Alberts/MBoC hfst. 12). De membraanring van het NPC valt in die overgang (± 92·S van het midden).
 * Schaal: het NPC (≈ 120 nm) is ≈ 300 px breed → ≈ 2,5 px/nm; het capside (≈ 90 nm) krijgt dus straal ≈ 110 px.
 * Ontmanteling: het capside dokt aan Nup214; kinesine-1 bindt met de lichte keten (Klc1/2) het capside en via Nup358 de
 * zware keten (Kif5c); de motor op een microtubule trekt het capside uiteen en verstoort de porie
 * (Strunze et al., Cell Host Microbe 2011, 10:210–223). Het adenovirusgenoom blijft lineair in de kern, met het terminaal
 * eiwit (TP) aan beide 5′-uiteinden (ICTV-rapport Adenoviridae). */
const OUT = 470, IN = 530, PX = 800, PY = 500, S = 1.6;
const PORIEN = [PX - 760, PX, PX + 720];
const ENV = kernEnvelopLijn(-400, 2000, PY, { poriën: PORIEN, w: 18, gap: 42, poreW: 2 * 92 * S, npc: false });
const CR = 110;                        // straal capside (op schaal tegenover het NPC)
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
  legend: [['#9db4d8', { nl: 'nucleoporinen (Nup)', en: 'nucleoporins (Nup)' }], ['#b9a6ff', { nl: 'FG-herhalingen', en: 'FG repeats' }],
    ['#7fdc6a', 'NLS'], [C.prot2, { nl: 'importine α/β', en: 'importin α/β' }], ['#5fd3e6', 'Ran·GTP'],
    [PINK, { nl: 'adenovirus / viraal DNA', en: 'adenovirus / viral DNA' }], ['#ffd166', { nl: 'terminaal eiwit (TP)', en: 'terminal protein (TP)' }], [C.dna, { nl: 'chromatine', en: 'chromatin' }]],
  simplified: {
    nl: 'Het porie-complex is achtvoudig symmetrisch; we tekenen één doorsnede, dus slechts twee van de acht "spaken". De FG-herhalingen zijn als losse slierten getekend — hun echte, snel bewegende netwerk is niet met één beeld te vangen. Van de ~30 nucleoporinen noemen we er twee (Nup214 en Nup358). Ran, RCC1 en RanGAP staan symbolisch. Porie en capside staan ongeveer op dezelfde schaal (porie ≈ 120 nm, capside ≈ 90 nm). Echt komt het DNA mee met eiwitten (proteïne VII) en mogelijk door een beschadigde porie.',
    en: 'The pore complex is eightfold symmetric; we draw a single cross-section, so only two of the eight "spokes". The FG repeats are drawn as loose strands — their real, fast-moving meshwork cannot be captured in one frame. Of the ~30 nucleoporins we name two (Nup214 and Nup358). Ran, RCC1 and RanGAP are symbolic. Pore and capsid are roughly to the same scale (pore ≈ 120 nm, capsid ≈ 90 nm). In reality the DNA enters together with proteins (protein VII), possibly through a damaged pore.' },
  steps: [
    ST(7000, cam(820, 330, 1450), 'Het virus komt aan bij de kern', 'The virus reaches the nucleus',
      'Een motoreiwit heeft het virus naar de kern gesleept. Die is omgeven door een dubbel membraan vol poriën.',
      'A motor protein has dragged the virus to the nucleus. It is surrounded by a double membrane full of pores.'),
    ST(8000, cam(PX, 500, 900), 'De kernporie: een grote poort', 'The nuclear pore: a large gate',
      'Elke porie is een grote poort uit zo’n 30 soorten eiwitten. Een menselijke kern heeft er duizenden.',
      'Each pore is a large gate made of about 30 kinds of proteins. A human nucleus has thousands of them.'),
    ST(7000, cam(PX, 495, 700), 'De porie werkt als een zeef', 'The pore works like a sieve',
      'Eiwitslierten in het kanaal werken als een zeef. Kleine moleculen glippen erdoor, grote hebben hulp nodig.',
      'Protein strands in the channel act as a sieve. Small molecules slip through; large ones need help.'),
    ST(7000, cam(580, 380, 900), 'Een adreslabel voor de kern', 'An address label for the nucleus',
      'Grote vracht draagt een ‘adreslabel’. Een transporteiwit (importine) herkent dat label en neemt de vracht mee.',
      'Large cargo carries an ‘address label’. A transport protein (importin) recognises it and takes the cargo along.'),
    ST(6000, cam(PX, 520, 860), 'Door het kanaal', 'Through the channel',
      'Het transporteiwit glijdt met de vracht door de zeef. De porie pompt niet; ze laat alleen selectief door.',
      'The transport protein slides through the sieve with its cargo. The pore does not pump; it only lets things through selectively.'),
    ST(8000, cam(830, 600, 1050), 'Wat bepaalt de richting?', 'What sets the direction?',
      'In de kern staat het schakeleiwit Ran ‘aan’ en maakt het de vracht los; erbuiten staat Ran ‘uit’.',
      'In the nucleus the switch protein Ran is ‘on’ and releases the cargo; outside it, Ran is ‘off’.'),
    ST(7000, cam(880, 380, 1100), 'Het virus is te groot', 'The virus is too big',
      'De virusjas past niet door de porie. Hij hecht zich vast aan een eiwit aan de buitenkant van de porie.',
      'The viral coat does not fit through the pore. It attaches to a protein on the outside of the pore.'),
    ST(7000, cam(865, 360, 1130), 'De virusjas wordt kapotgetrokken', 'The viral coat is torn apart',
      'Een motoreiwit grijpt tegelijk de porie en de virusjas vast en trekt de jas uit elkaar.',
      'A motor protein grabs the pore and the viral coat at the same time and pulls the coat apart.'),
    ST(8000, cam(840, 600, 1080), 'Het virus-DNA is binnen', 'The viral DNA is inside',
      'Het virus-DNA gaat de kern in en blijft los van de chromosomen. De cel leest het af als haar eigen genen.',
      'The viral DNA enters the nucleus and stays separate from the chromosomes. The cell reads it like its own genes.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="${IN}" width="2400" height="1400" fill="url(#gNuc)"/>
    <g data-node="chromatine" data-color="${C.dna}" data-nolabel>${CHROM}</g>
    <text id="ki-reg1" x="162" y="${OUT - 70}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('cytoplasma', 'cytoplasm')}</text>
    <text id="ki-reg2" x="162" y="${IN + 90}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('nucleoplasma', 'nucleoplasm')}</text>
    <g data-node="kern" data-color="#9cc0ff" data-nolabel>${ENV}</g>
    <g id="ki-memlab">${txt(PX + 140, OUT - 16, T2('buitenste kernmembraan', 'outer nuclear membrane'), '#7aa0d8', 21, 'start', 500)}
    ${txt(PX + 140, IN + 36, T2('binnenste kernmembraan', 'inner nuclear membrane'), '#9cc0ff', 21, 'start', 500)}</g>
    <g id="ki-mt" opacity="0"></g>
    <g id="ki-otherpores" opacity=".8"></g>

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
    <g data-node="dnahelix" data-href="../atlas/index.html?id=bdna" data-color="${PINK}" data-label="${T2('Viraal dsDNA — in 3D', 'Viral dsDNA — in 3D')}" id="ki-epi" opacity="0">
      <circle data-anchor="dnahelix" cx="760" cy="640" r="1" fill="none"/>
      <g id="ki-epi-body"></g>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Pol II leest de genen', 'Pol II reads the genes')}" id="ki-txn" opacity="0">
      <circle data-anchor="transcriptie" data-pos="below" cx="1120" cy="800" r="1" fill="none"/>
      <g data-node="rnapol" data-color="${C.prot}" data-nolabel><g id="ki-pol"></g></g>
      <g id="ki-txn-body"></g>
    </g>
    <g id="ki-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    const impGlyph = (x, y, sc, op = 1) => op <= .01 ? '' : `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}">
      <path d="M-40,-30 a56,56 0 1,0 0,60 a40,40 0 1,1 0,-60" fill="${C.prot2}"/>${txt(-70, 6, 'β', '#fff', 26)}
      <rect x="-44" y="-26" width="42" height="52" rx="14" fill="${C.prot3}"/>${txt(-23, 8, 'α', '#fff', 22)}</g>`;
    const cargoOnly = (x, y, sc, op = 1) => op <= .01 ? '' : `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(op)}">
      <rect x="4" y="-34" width="96" height="68" rx="18" fill="${C.prot}" stroke="#2a1f4a" stroke-width="2"/>
      ${txt(66, 7, T2('vracht', 'cargo'), '#fff', 19)}
      <rect x="-6" y="-14" width="40" height="28" rx="8" fill="#7fdc6a"/>${txt(14, 6, 'NLS', '#0a1224', 17)}</g>`;
    const cargoGlyph = (x, y, sc, imp) => impGlyph(x, y, sc, imp) + cargoOnly(x, y, sc, 1);

    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;

        $('ki-memlab').setAttribute('opacity', step === 0 ? '1' : '0');
        /* 'cytoplasma'/'nucleoplasma' alleen in de brede beelden (anders half aan de rand) */
        for (const id of ['ki-reg1', 'ki-reg2']) $(id).setAttribute('opacity', step === 0 || step === 3 ? '.7' : '0');
        /* andere poriën in beeld */
        $('ki-otherpores').innerHTML = PORIEN.filter(x => x !== PX).map(x => npc(x, PY, S)).join('');

        /* microtubule + capside */
        const mtOn = step === 0 ? 1 : step < 6 ? .25 : 1;
        $('ki-mt').setAttribute('opacity', f1(mtOn));
        $('ki-mt').innerHTML = microtubule(120, 120, PX - 60, 230, 16);

        /* capside: dokt op de filamenten (Nup214), breekt in stap 7 open en de brokstukken vervagen in stap 8 */
        let vOp = 0, vx = PX + 10, vy = 250, vmiss = [1, 4], vfib = 22, brk = 0;
        if (step === 0) { const u = ease(sub(p, .1, .85)); vOp = 1; vx = lerp(200, PX + 10, u); vy = lerp(150, 250, u); }
        else if (step < 6) { vOp = 0; }
        else if (step === 6) { vOp = 1; const u = ease(sub(p, .2, .8)); vy = lerp(250, 316, u); }
        else if (step === 7) { vOp = 1; vy = 316; vmiss = p > .3 ? [0, 1, 3, 4] : [1, 4]; brk = ease(sub(p, .35, .85)); }
        else { vOp = 1 - ease(sub(p, .3, .7)); vy = 316; vmiss = [0, 1, 2, 3, 4, 5]; vfib = 10; brk = 1; }
        $('ki-virus').setAttribute('opacity', f1(vOp));
        const gOp = step === 8 ? 1 - ease(sub(p, 0, .3)) : .95;   // het DNA verlaat het capside in stap 8
        $('ki-virus').innerHTML = vOp > .02
          ? `<g transform="translate(${f1(vx)} ${f1(vy)})">${capsidBreuk(CR, brk, 'ki-brk', { fibre: vfib, missing: vmiss })}${step >= 6 && gOp > .02 ? viralGenome(CR * .8, gOp) : ''}</g>` : '';
        $('ki-virus-a').setAttribute('opacity', vOp > .1 ? '1' : '0'); $('ki-virus-a').setAttribute('cx', f1(vx)); $('ki-virus-a').setAttribute('cy', f1(vy - CR - 14));

        /* NPC met FG-slierten (dichtheid onveranderd, accent in stap 2) */
        $('ki-npc').innerHTML = npc(PX, PY, S, { fg: 1 });

        /* NLS-vracht door de porie */
        let cg = '';
        if (step >= 3 && step <= 5) {
          /* in het kanaal staat het complex rechtop (vracht vooraan), zodat het tussen de ringen in het FG-kanaal past */
          let x = 470, y = 330, imp = 0, rot = 0;
          if (step === 3) { imp = ease(sub(p, .35, .75)); x = lerp(440, 520, ease(p)); y = lerp(320, 345, ease(p)); }
          else if (step === 4) { const u = ease(sub(p, .1, .9)); imp = 1; x = lerp(520, PX, u); y = lerp(345, PY, u); rot = 90 * ease(sub(p, .1, .55)); }
          else { const u = ease(sub(p, .1, .6)); imp = 1; x = PX; y = lerp(PY, 690, u); rot = 90; }
          const sc = .8, R = (g, xx, yy) => `<g transform="rotate(${f1(rot)} ${f1(xx)} ${f1(yy)})">${g}</g>`;
          if (step === 5 && p > .55) {
            const k = ease(sub(p, .55, .95));
            cg += R(cargoOnly(x - 110 * k, y + 40 * k, sc, 1), x - 110 * k, y + 40 * k);
            cg += R(impGlyph(x + 100 * k, y - 30 * k, sc, 1), x + 100 * k, y - 30 * k);
            cg += `<circle cx="${f1(x + 100 * k + 40)}" cy="${f1(y - 30 * k - 70 * sc)}" r="15" fill="#5fd3e6" opacity="${f1(k)}"/>${txt(x + 100 * k + 40, y - 30 * k - 70 * sc + 5, 'Ran', '#062', 14)}`;
          } else cg += R(cargoGlyph(x, y, sc, imp), x, y);
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
        const dnaPath = `M${PX + 10},316 C${PX + 10},420 ${PX},560 ${PX - 10},640 S740,700 640,720`;
        $('ki-thread').innerHTML = thr > .01 && step === 8
          ? `<path d="${dnaPath}" stroke="${PINK}" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="560" stroke-dashoffset="${f1(560 * (1 - thr))}" opacity="${f1(1 - ease(sub(p, .4, .6)))}"/>
             ${[0, 1, 2, 3].map(i => { const u = clamp(thr - i * .12); return u > .02 ? `<circle cx="${f1(PX + 8 - u * 18)}" cy="${f1(316 + u * 330)}" r="8" fill="#c98fe0" opacity="${f1(1 - ease(sub(p, .4, .6)))}"/>` : ''; }).join('')}` : '';
        /* in de kern: een lineair DNA (terminaal eiwit aan beide uiteinden), geen ring; Pol II zit op het DNA en maakt mRNA */
        const epiOn = step === 8 ? ease(sub(p, .4, .7)) : 0;
        $('ki-epi').setAttribute('opacity', f1(epiOn));
        $('ki-epi-body').innerHTML = epiOn > .01
          ? `${linDNA(560, 1060, 740, { amp: 12, vii: 5 })}${txt(700, 800, T2('lineair viraal DNA (los van de chromosomen)', 'linear viral DNA (separate from the chromosomes)'), PINK, 21)}` : '';
        const txnOn = step === 8 ? ease(sub(p, .55, .9)) : 0;
        $('ki-txn').setAttribute('opacity', f1(txnOn));
        $('ki-pol').innerHTML = txnOn > .01
          ? polII(960, 740, 52, 22, { dir: -1, gul: 15, hoog: 2, vul: .45, achter: 1, uit: 1, seed: 12 }) + txt(948, 723, 'Pol II', '#e8edf7', 20) : '';   // app-vorm (bio.js): viraal DNA door de geul, RNA rechtsboven (achterkant) eruit
        $('ki-txn-body').innerHTML = txnOn > .01
          ? `<path d="M982,710 q30,-54 93,-60 t70,-20" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round"/>
             ${txt(1160, 640, T2('viraal mRNA', 'viral mRNA'), C.rna, 21, 'start')}` : '';

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
          <line x1="${PX + 290}" y1="306" x2="${PX + 120}" y2="372" stroke="${C.prot}" stroke-width="2"/>
          ${txt(PX - 330, 250, T2('capside ≈ 90 nm', 'capsid ≈ 90 nm'), C.muted, 21)}${txt(PX - 330, 280, T2('kanaal ~40 nm', 'channel ~40 nm'), C.muted, 21)}</g>`;
        if (step === 6 || step === 7 || step === 8) {
          /* kinesine-1: koppen op een microtubule, armen naar Nup358 (filament van de porie) en naar het capside */
          const k = step === 6 ? 0 : step === 7 ? ease(sub(p, .05, .35)) : 1 - ease(sub(p, .05, .3));   // verdwijnt vóór het capside
          if (k > .01) {
            const bx = brk * CR * .5;
            no += `<g opacity="${f1(k)}">${microtubule(PX + 150, 150, PX + 560, 270, 16)}
              ${kinesineGreep(PX + 300, 230, 196, 1.5, '#b9a6ff', tt * 7, [[PX + 10 + CR * .75 + bx, 316 - CR * .35 - bx * .6], [PX + 128, 370]])}
              ${txt(PX + 330, 120, T2('kinesine-1', 'kinesin-1'), '#b9a6ff', 22, 'start')}
              ${txt(PX + 300, 330, T2('vast aan Nup358', 'bound to Nup358'), '#b9a6ff', 20, 'start')}
              ${txt(PX + 300, 356, T2('én aan het capside', 'and to the capsid'), '#b9a6ff', 20, 'start')}</g>`;
          }
          if (step === 7) no += `<g opacity="${f1(ease(sub(p, .55, .85)))}">${txt(PX - 300, 250, T2('de jas breekt open', 'the coat breaks open'), PINK, 22)}</g>`;
        }
        $('ki-notes').innerHTML = no;
      },
    };
  },
};
