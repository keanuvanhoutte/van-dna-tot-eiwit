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
  parts: [
    { c: C.muted, t: { nl: 'cytoplasma', en: 'cytoplasm' }, m: ['nucleoplasma', 'nucleoplasm'], d: { nl: 'Boven de kernrand ligt het celvocht buiten de kern (cytoplasma); eronder de binnenkant van de kern.', en: 'Above the nuclear edge lies the cell fluid outside the nucleus (cytoplasm); below it the inside of the nucleus.' },
      p: { nl: 'Cytoplasma boven en nucleoplasma onder de kernenvelop.', en: 'Cytoplasm above and nucleoplasm below the nuclear envelope.' } },
    { c: '#9cc0ff', t: { nl: 'buitenste kernmembraan', en: 'outer nuclear membrane' }, m: ['binnenste kernmembraan', 'inner nuclear membrane'], d: { nl: 'De kern heeft een dubbel vlies: twee vetlagen die bij elke porie in elkaar overgaan.', en: 'The nucleus has a double membrane: two fat layers that join each other at every pore.' },
      p: { nl: 'Kernenvelop: buitenste en binnenste kernmembraan, continu aan de poriemembraan.', en: 'Nuclear envelope: outer and inner nuclear membranes, continuous at the pore membrane.' } },
    { c: '#9db4d8', t: { nl: 'kernporie', en: 'nuclear pore' }, m: ['≈ 110–120 MDa · ~3 000 poriën per kern', '≈ 110–120 MDa · ~3,000 pores per nucleus', 'ring in het membraan', 'ring in the membrane'], d: { nl: 'Een grote poort in het vlies van de kern, gebouwd uit zo’n 30 soorten eiwitten. Een kern heeft er duizenden.', en: 'A large gate in the membrane of the nucleus, built from about 30 kinds of proteins. A nucleus has thousands.' },
      p: { nl: 'Kernporiecomplex (≈ 110–120 MDa, achtvoudig symmetrisch) uit ≈ 30 soorten nucleoporinen, verankerd in een membraanring.', en: 'Nuclear pore complex (≈ 110–120 MDa, eightfold symmetric) of ≈ 30 kinds of nucleoporins, anchored in a membrane ring.' } },
    { c: C.prot, t: { nl: 'cytoplasmatische filamenten', en: 'cytoplasmic filaments' }, m: ['Nup214', 'vast aan Nup358', 'bound to Nup358'], d: { nl: 'Draadjes aan de buitenkant van de poort. Het virus hecht zich eraan vast (aan het poorteiwit Nup214).', en: 'Threads on the outside of the gate. The virus attaches to them (to the gate protein Nup214).' },
      p: { nl: 'Cytoplasmatische filamenten met o.a. Nup214 (dockingplaats van hexon) en Nup358 (bindt kinesine-1).', en: 'Cytoplasmic filaments containing Nup214 (hexon docking site) and Nup358 (binds kinesin-1).' } },
    { c: C.prot, t: { nl: 'kernmandje', en: 'nuclear basket' }, d: { nl: 'Een mandje van draadjes aan de binnenkant van de poort, in de kern.', en: 'A basket of threads on the inside of the gate, in the nucleus.' },
      p: { nl: 'Nucleair mandje aan de nucleoplasmatische zijde van het NPC.', en: 'Nuclear basket on the nucleoplasmic face of the NPC.' } },
    { c: '#b9a6ff', t: { nl: 'eiwitslierten = zeef', en: 'protein strands = sieve' }, m: ['(FG-herhalingen)', '(FG repeats)', 'groot:', 'large:', 'heeft hulp nodig', 'needs help', 'klein:', 'small:', 'glipt erdoor', 'slips through', 'kanaal ~40 nm', 'channel ~40 nm'], d: { nl: 'Slierten eiwit in het kanaal werken als een zeef: kleine stoffen glippen erdoor, grote hebben hulp nodig.', en: 'Strands of protein in the channel act as a sieve: small substances slip through, large ones need help.' },
      p: { nl: 'Ongeordende FG-herhalingen vormen de permeabiliteitsbarrière; passieve diffusie tot ≈ 40 kDa.', en: 'Disordered FG repeats form the permeability barrier; passive diffusion up to ≈ 40 kDa.' } },
    { c: C.prot, t: { nl: 'vracht', en: 'cargo' }, m: ['vracht los', 'cargo released'], d: { nl: 'Een groot eiwit dat de kern in moet. Het past niet zomaar door de zeef.', en: 'A large protein that has to get into the nucleus. It does not simply fit through the sieve.' },
      p: { nl: 'Karyofiel eiwit met een NLS, te groot voor passieve diffusie.', en: 'Karyophilic protein with an NLS, too large for passive diffusion.' } },
    { c: '#7fdc6a', t: 'NLS', m: ['adreslabel', 'address label', '(NLS)'], d: { nl: 'Het groene ‘adreslabel’ op de vracht: een kort stukje eiwit dat zegt “naar de kern”.', en: 'The green ‘address label’ on the cargo: a short piece of protein that says “to the nucleus”.' },
      p: { nl: 'Kernlokalisatiesignaal: korte reeks basische aminozuren (bv. PKKKRKV), herkend door importine α.', en: 'Nuclear localisation signal: short stretch of basic amino acids (e.g. PKKKRKV), recognised by importin α.' } },
    { c: C.prot2, t: { nl: 'transporteiwit', en: 'transport protein' }, m: ['(importine α/β)', '(importin α/β)', 'α', 'β'], d: { nl: 'Een transporteiwit (importine, delen α en β) herkent het adreslabel en glijdt met de vracht door de zeef.', en: 'A transport protein (importin, parts α and β) recognises the address label and slides through the sieve with the cargo.' },
      p: { nl: 'Importine α bindt de NLS, importine β bindt importine α en de FG-herhalingen.', en: 'Importin α binds the NLS, importin β binds importin α and the FG repeats.' } },
    { c: '#5fd3e6', t: 'Ran', m: ['Ran aan (in de kern)', 'Ran on (in the nucleus)', 'Ran·GTP', 'Ran uit (buiten de kern)', 'Ran off (outside the nucleus)', 'Ran·GDP'], d: { nl: 'Een schakeleiwit. In de kern staat het ‘aan’ en maakt het de vracht los; buiten de kern staat het ‘uit’. Zo gaat transport één richting uit.', en: 'A switch protein. In the nucleus it is ‘on’ and releases the cargo; outside the nucleus it is ‘off’. This makes transport go one way.' },
      p: { nl: 'Ran-GTPase-gradiënt: Ran·GTP hoog in de kern (RCC1), Ran·GDP in het cytoplasma (RanGAP); Ran·GTP dissocieert het importinecomplex.', en: 'Ran GTPase gradient: Ran·GTP high in the nucleus (RCC1), Ran·GDP in the cytoplasm (RanGAP); Ran·GTP dissociates the importin complex.' } },
    { c: PINK, t: { nl: 'capside ≈ 90 nm', en: 'capsid ≈ 90 nm' }, m: ['de jas breekt open', 'the coat breaks open', 'én aan het capside', 'and to the capsid'], d: { nl: 'De eiwitjas van het adenovirus. Hij is te groot voor de poort en breekt aan de buitenkant open.', en: 'The protein coat of the adenovirus. It is too big for the gate and breaks open on the outside.' },
      p: { nl: 'Adenoviruscapside (≈ 90 nm), groter dan het centrale kanaal; dokt via hexon aan Nup214 en wordt daar ontmanteld.', en: 'Adenovirus capsid (≈ 90 nm), larger than the central channel; docks via hexon to Nup214 and is disassembled there.' } },
    { c: C.prot, t: { nl: 'microtubule', en: 'microtubule' }, d: { nl: 'Een spoor in de cel waarover motoreiwitten vracht vervoeren.', en: 'A track in the cell along which motor proteins carry cargo.' },
      p: { nl: 'Microtubule, rail voor dyneïne- en kinesinetransport.', en: 'Microtubule, track for dynein and kinesin transport.' } },
    { c: '#b9a6ff', t: { nl: 'kinesine-1', en: 'kinesin-1' }, d: { nl: 'Een motoreiwit op een spoor. Het grijpt tegelijk de poort en de virusjas vast en trekt zo de jas uit elkaar.', en: 'A motor protein on a track. It grabs the gate and the virus coat at the same time and so pulls the coat apart.' },
      p: { nl: 'Kinesine-1: zware keten (Kif5C) via Nup358, lichte keten (Klc1/2) op het capside; ontmantelt het capside (Strunze et al. 2011).', en: 'Kinesin-1: heavy chain (Kif5C) via Nup358, light chain (Klc1/2) on the capsid; disassembles the capsid (Strunze et al. 2011).' } },
    { c: PINK, t: { nl: 'lineair viraal DNA (los van de chromosomen)', en: 'linear viral DNA (separate from the chromosomes)' }, d: { nl: 'Het DNA van het virus, nu in de kern. Het blijft een losse draad naast het DNA van de cel.', en: 'The virus DNA, now in the nucleus. It stays a separate thread next to the cell’s DNA.' },
      p: { nl: 'Lineair episomaal genoom met terminaal eiwit aan beide 5′-uiteinden, geïmporteerd met proteïne VII.', en: 'Linear episomal genome with terminal protein at both 5′ ends, imported together with protein VII.' } },
    { c: C.prot, t: 'Pol II', d: { nl: 'Het kopieerenzym van de cel, dat de genen van het virus afleest.', en: 'The cell’s copying enzyme, which reads the virus genes.' },
      p: { nl: 'RNA-polymerase II van de gastheer transcribeert het virale genoom.', en: 'Host RNA polymerase II transcribes the viral genome.' } },
    { c: C.rna, t: { nl: 'viraal mRNA', en: 'viral mRNA' }, d: { nl: 'De oranje draad: de boodschap met de bouwplannen voor viruseiwitten.', en: 'The orange thread: the message with the building plans for virus proteins.' },
      p: { nl: 'Viraal transcript, na export vertaald door gastheerribosomen.', en: 'Viral transcript, translated by host ribosomes after export.' } },
  ],
  steps: [
    ST(7000, cam(820, 330, 1450), 'Het virus komt aan bij de kern', 'The virus reaches the nucleus',
      'Een motoreiwit heeft het virus naar de kern gesleept. Die is omgeven door een dubbel membraan vol poriën.',
      'A motor protein has dragged the virus to the nucleus. It is surrounded by a double membrane full of pores.'),
    ST(8000, cam(PX, 500, 900), 'De kernporie: een grote poort', 'The nuclear pore: a large gate',
      'Elke porie is een grote poort uit zo’n 30 soorten eiwitten. Een menselijke kern heeft er duizenden.',
      'Each pore is a large gate made of about 30 kinds of proteins. A human nucleus has thousands of them.'),
    ST(7000, cam(PX, 495, 820), 'De porie werkt als een zeef', 'The pore works like a sieve',
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
    <g id="ki-memlab">${txt(PX + 230, OUT - 16, T2('buitenste kernmembraan', 'outer nuclear membrane'), '#7aa0d8', 21, 'start', 500)}
    ${txt(PX + 230, IN + 36, T2('binnenste kernmembraan', 'inner nuclear membrane'), '#9cc0ff', 21, 'start', 500)}</g>
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

  init(svg, api) {
    const $ = id => svg.getElementById(id);
    const subRan = (main, s, x, y) => (api?.easy?.(main) ?? main).includes(s) ? '' : txt(x, y, s, C.muted, 17);   // subregel weg als het (vaktaal)label ze al bevat
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
          else if (step === 4) { imp = 1; x = lerp(520, PX, ease(sub(p, .1, .45))); y = lerp(lerp(345, 390, ease(sub(p, .1, .45))), PY, ease(sub(p, .45, .9))); rot = 90 * ease(sub(p, .1, .45)); }   // eerst recht boven het kanaal, dan pas omlaag door het midden (niet door de cytoplasmatische ring)
          else { const u = ease(sub(p, .1, .6)); imp = 1; x = PX; y = lerp(PY, 690, u); rot = 90; }
          const sc = .8, R = (g, xx, yy) => `<g transform="rotate(${f1(rot)} ${f1(xx)} ${f1(yy)})">${g}</g>`;
          if (step === 5 && p > .55) {
            const k = ease(sub(p, .55, .95));
            cg += R(cargoOnly(x - 110 * k, y + 40 * k, sc, 1), x - 110 * k, y + 40 * k);
            cg += R(impGlyph(x + 100 * k, y - 30 * k, sc, 1), x + 100 * k, y - 30 * k);
            cg += `<circle cx="${f1(x + 100 * k + 40)}" cy="${f1(y - 30 * k - 70 * sc)}" r="15" fill="#5fd3e6" opacity="${f1(k)}"/>${txt(x + 100 * k + 40, y - 30 * k - 70 * sc + 5, 'Ran', '#062', 14)}`;
          } else cg += R(cargoGlyph(x, y, sc, imp), x, y);
          if (step === 3) {
            /* in gewone taal benoemen wat elk stuk is; afkorting klein eronder */
            const kn = ease(sub(p, .05, .25)), ki = imp;
            cg += `<g opacity="${f1(kn)}">${txt(x + 10, y + 82, T2('adreslabel', 'address label'), '#7fdc6a', 22)}${txt(x + 10, y + 102, '(NLS)', C.muted, 16)}
              <line x1="${f1(x + 10)}" y1="${f1(y + 62)}" x2="${f1(x + 10)}" y2="${f1(y + 15)}" stroke="#7fdc6a" stroke-width="2"/></g>`;
            cg += `<g opacity="${f1(ki)}">${txt(x - 60, y - 96, T2('transporteiwit', 'transport protein'), C.prot2, 22)}${txt(x - 60, y - 76, T2('(importine α/β)', '(importin α/β)'), C.muted, 16)}
              <line x1="${f1(x - 60)}" y1="${f1(y - 70)}" x2="${f1(x - 60)}" y2="${f1(y - 44)}" stroke="${C.prot2}" stroke-width="2"/></g>`;
          }
          if (step === 5 && p > .55) {
            const k = ease(sub(p, .6, .9));
            cg += `<g opacity="${f1(k)}">${txt(x - 160, y + 85, T2('vracht los', 'cargo released'), C.text, 22, 'end')}</g>`;
          }
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
            if (Math.abs(x - 690) < 60 && Math.abs(y - 760) < 70) continue;     // niet over de vrijgekomen vracht
            ran += `<circle cx="${x}" cy="${y}" r="13" fill="#5fd3e6" opacity=".9"/>${txt(x, y + 5, 'Ran', '#062', 11)}`;
          }
          /* in de kern: Ran 'aan' (helder cyaan, Ran·GTP); buiten: Ran 'uit' (dof grijs, Ran·GDP) */
          ran += `${txt(1000, 798, T2('Ran aan (in de kern)', 'Ran on (in the nucleus)'), '#5fd3e6', 24)}${subRan(T2('Ran aan (in de kern)', 'Ran on (in the nucleus)'), 'Ran·GTP', 1000, 822)}`;
          for (let i = 0; i < 4; i++) {
            const x = 380 + i * 300, y = 430;
            ran += `<circle cx="${x}" cy="${y}" r="13" fill="#4a5470" stroke="#8a93aa" stroke-width="2"/>${txt(x, y + 5, 'Ran', '#c3cad8', 11)}`;
          }
          ran += `${txt(1130, 372, T2('Ran uit (buiten de kern)', 'Ran off (outside the nucleus)'), '#a7b0c4', 24)}${subRan(T2('Ran uit (buiten de kern)', 'Ran off (outside the nucleus)'), 'Ran·GDP', 1130, 396)}</g>`;
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
          const bob = Math.sin(tt * 3) * 6;   // groot molecuul botst boven op de zeef en raakt er niet door
          no += `<g opacity="${f1(k)}">${txt(PX - 205, PY - 150, T2('eiwitslierten = zeef', 'protein strands = sieve'), '#b9a6ff', 22)}
            ${txt(PX - 205, PY - 128, T2('(FG-herhalingen)', '(FG repeats)'), C.muted, 16)}
            <circle cx="${PX + 230}" cy="${f1(PY - 140 + bob)}" r="30" fill="#ff9d5c" fill-opacity=".85" stroke="#ff9d5c" stroke-width="2"/>
            ${txt(PX + 252, PY - 82, T2('groot:', 'large:'), '#ff9d5c', 21)}${txt(PX + 252, PY - 58, T2('heeft hulp nodig', 'needs help'), '#ff9d5c', 21)}
            ${txt(PX + 245, PY + 90, T2('klein:', 'small:'), '#7fdc6a', 21)}${txt(PX + 245, PY + 114, T2('glipt erdoor', 'slips through'), '#7fdc6a', 21)}
            <circle cx="${f1(PX + Math.sin(tt * 2) * 34)}" cy="${f1(PY - 40 + ((tt * 90) % 160))}" r="9" fill="#7fdc6a"/></g>`;
        }
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
