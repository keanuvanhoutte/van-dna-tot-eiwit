import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, FULL } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, sugar } from './_b_kit.js';
import { knop } from './_fate.js';
import { membraanPts, blaasje, cisterne, ribosoomKlein, kernEnvelop, ptsCirkel, ptsBoog, eiwitPad } from '../../bio.js';

/* detailronde 15-11-2026: membranen als lipidedubbellaag (bio.js). bandPts = gesloten omtrek van een buis/zak rond een
 * middenlijn P (halve dikte h, afgeronde uiteinden) → één membraan rond een lumen (ER-blad, TGN-buisje). */
function bandPts(P, h) {
  const nrm = i => { const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const n = Math.hypot(dx, dy) || 1; return [-dy / n, dx / n]; };
  const top = P.map((q, i) => { const n = nrm(i); return [q[0] + n[0] * h, q[1] + n[1] * h]; }), bot = P.map((q, i) => { const n = nrm(i); return [q[0] - n[0] * h, q[1] - n[1] * h]; });
  const cap = (i, s) => { const n = nrm(i), t = [n[1] * s, -n[0] * s]; return Array.from({ length: 7 }, (_, k) => { const a = Math.PI * (k + 1) / 8; return [P[i][0] + n[0] * h * Math.cos(a) * s + t[0] * h * Math.sin(a), P[i][1] + n[1] * h * Math.cos(a) * s + t[1] * h * Math.sin(a)]; }); };
  return [...top, ...cap(P.length - 1, 1), ...bot.reverse(), ...cap(0, -1)];
}
const ptsD = P => 'M' + P.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L') + 'Z';
const zak = (P, h, lumen, w = 8) => { const B = bandPts(P, h); return `<path d="${ptsD(B)}" fill="${lumen}"/>` + membraanPts(B, { w, closed: true }); };

/* Eén doorsnede van een secretoire cel: ER (links) → ERGIC → Golgi (cis → trans) → TGN → plasmamembraan (rechts), endosoom/lysosoom onderaan */
const X0 = 690, SPC = 88, GY = 440, GH = 180;       // Golgi: x van de cis-cisterne, afstand, middelpunt, halve hoogte
const EXIT = [380, 450], ERGIC = [535, 450], TGN = [X0 + 4 * SPC + 10, 440];
const PMX = 1470;
const ENDO = [1160, 700], LYSO = [1360, 700];
const COPII = '#ffb27a', COPI = '#5fd3e6', CLATH = '#e8edf7', CARGO = C.chain, GRAN = '#f06bc0';

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* deterministische vesikelbeweging langs een pad (kwadratische Bézier) */
/* x van het plasmamembraan (kwadratische boog van (PMX, 40) via (PMX + 40, 450) naar (PMX, 860)) op hoogte y */
const pmX = y => { const t = clamp((y - 40) / 820); return PMX + 80 * t * (1 - t); };
const OUT = '#0a101f';                                 // kleur van de ruimte buiten de cel (achter de fusieporie)
const qb = (a, c, b, u) => [(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];

export default {
  id: 'golgi',
  title: { nl: 'Golgi & secretie', en: 'Golgi & secretory pathway' },
  scale: { nl: '≈ 1–5 µm (Golgi-stapel ≈ 1 µm)', en: '≈ 1–5 µm (Golgi stack ≈ 1 µm)' },
  time: { nl: 'door de Golgi-stapel: ~2 tot ~15 min, afhankelijk van het eiwit', en: 'through the Golgi stack: ~2 to ~15 min, depending on the protein' },
  org: { nl: 'mens (secretoire cel)', en: 'human (secretory cell)' },
  legend: [[C.mem, { nl: 'ER, Golgi-cisternen, membranen', en: 'ER, Golgi cisternae, membranes' }], [COPII, { nl: 'COPII-vesikel (ER → Golgi)', en: 'COPII vesicle (ER → Golgi)' }], [COPI, { nl: 'COPI-vesikel (terug)', en: 'COPI vesicle (back)' }], [CLATH, { nl: 'clathrinevesikel', en: 'clathrin vesicle' }], [CARGO, { nl: 'vrachteiwit (cargo)', en: 'cargo protein' }], [C.prot, { nl: 'ER-/Golgi-residente eiwitten', en: 'ER/Golgi resident proteins' }], [GRAN, { nl: 'secretiegranule', en: 'secretory granule' }], ['#ff6b6b', { nl: 'lysosoom en lysosomale enzymen (M6P)', en: 'lysosome and lysosomal enzymes (M6P)' }]],
  simplified: {
    nl: 'Sterk geschematiseerd: een echte Golgi-stapel in zoogdiercellen telt 4 tot 11 cisternen en de ER–Golgi-afstand is niet op schaal. Het cisternale-rijpingsmodel wordt getoond: volgens Glick & Luini (2011) de beste kandidaat voor het kernmechanisme, maar er is nog geen volledige consensus en ook transport via buisjes of blaasjes tussen cisternen wordt voorgesteld. Coatonderdelen (Sar1, Sec23/24, Sec13/31, ARF1, coatomeer, adaptines) zijn niet afzonderlijk getekend. De doorlooptijd varieert sterk per eiwit (bv. albumine < 2 min, VSV-G ~15 min door de stapel).',
    en: 'Strongly schematic: a real Golgi stack in mammalian cells has 4 to 11 cisternae and the ER–Golgi distance is not to scale. The cisternal maturation model is shown: according to Glick & Luini (2011) the best candidate for the core mechanism, but there is no full consensus yet and transport via tubules or vesicles between cisternae is also proposed. Coat components (Sar1, Sec23/24, Sec13/31, ARF1, coatomer, adaptins) are not drawn separately. Transit time varies strongly per protein (e.g. albumin < 2 min, VSV-G ~15 min through the stack).' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna2, t: { nl: 'kern', en: 'nucleus' }, d: { nl: 'De kern met het DNA, links. Het ER sluit erop aan.', en: 'The nucleus with the DNA, on the left. The ER connects to it.' },
      p: { nl: 'Celkern; de kernenvelop loopt door in het ER-membraan.', en: 'Cell nucleus; the nuclear envelope is continuous with the ER membrane.' } },
    { c: C.mem, t: { nl: 'ruw ER', en: 'rough ER' }, d: { nl: 'De gebogen platte zakken rond de kern, bezet met ribosomen (bolletjes). Hier worden eiwitten gemaakt die de cel verlaten.', en: 'The curved flat sacs around the nucleus, studded with ribosomes (dots). Proteins that leave the cell are made here.' },
      p: { nl: 'Ruw endoplasmatisch reticulum met membraangebonden ribosomen; startpunt van de secretieroute.', en: 'Rough endoplasmic reticulum with membrane-bound ribosomes; starting point of the secretory pathway.' } },
    { c: CARGO, t: { nl: 'vrachteiwit', en: 'cargo protein' }, m: ['alleen goed gevouwen', 'only correctly folded', 'eiwitten mogen mee', 'proteins may leave'], d: { nl: 'De groene bolletjes: eiwitten die naar buiten moeten. Alleen goed gevouwen eiwitten mogen uit het ER.', en: 'The green dots: proteins that have to go out. Only correctly folded proteins may leave the ER.' },
      p: { nl: 'Secretorisch cargo; ER-kwaliteitscontrole houdt niet-natieve eiwitten tegen.', en: 'Secretory cargo; ER quality control retains non-native proteins.' } },
    { c: COPII, t: 'COPII', m: ['ER-uitgang', 'ER exit site'], d: { nl: 'Oranje blaasjes die vracht van het ER naar het Golgi brengen. Ze ontstaan op vaste uitgangsplekken van het ER.', en: 'Orange vesicles that carry cargo from the ER to the Golgi. They form at fixed exit sites of the ER.' },
      p: { nl: 'COPII-gecoate vesikels, gevormd op ER-uitgangsplaatsen (ERES); anterograad transport ER → Golgi.', en: 'COPII-coated vesicles formed at ER exit sites (ERES); anterograde transport ER → Golgi.' } },
    { c: C.mem, t: 'ERGIC', d: { nl: 'Een tussenstation tussen het ER en het Golgi waar de blaasjes samenkomen.', en: 'An intermediate station between the ER and the Golgi where the vesicles meet.' },
      p: { nl: 'ER–Golgi-intermediair compartiment; vesiculotubulaire clusters waar COPII-vesikels fuseren en sortering begint.', en: 'ER–Golgi intermediate compartment; vesiculotubular clusters where COPII vesicles fuse and sorting begins.' } },
    { c: COPI, t: { nl: 'COPI (retrograad)', en: 'COPI (retrograde)' }, m: ['COPI: enzymen', 'COPI: enzymes', 'één cisterne terug', 'one cisterna back'], d: { nl: 'Blauwe blaasjes die de andere kant op gaan: ze brengen ER-eiwitten en Golgi-enzymen terug.', en: 'Blue vesicles going the other way: they bring ER proteins and Golgi enzymes back.' },
      p: { nl: 'COPI-gecoate vesikels voor retrograad transport (Golgi → ER en tussen cisternen); bij cisternale rijping recycleren ze residente enzymen.', en: 'COPI-coated vesicles for retrograde transport (Golgi → ER and between cisternae); in cisternal maturation they recycle resident enzymes.' } },
    { c: COPI, t: { nl: 'KDEL-receptor', en: 'KDEL receptor' }, m: ['bv. BiP en PDI dragen', 'e.g. BiP and PDI carry', 'de staart …KDEL', 'the tail …KDEL'], d: { nl: 'Een ontvanger die ER-eiwitten met het ‘terug naar het ER’-label (KDEL) herkent en ze terugstuurt.', en: 'A receiver that recognises ER proteins with the ‘back to the ER’ tag (KDEL) and sends them back.' },
      p: { nl: 'Receptor in het cis-Golgi die het C-terminale KDEL-retentiesignaal van ER-residente eiwitten (bv. BiP, PDI) bindt en ze via COPI terugbrengt.', en: 'Receptor in the cis-Golgi that binds the C-terminal KDEL retrieval signal of ER-resident proteins (e.g. BiP, PDI) and returns them via COPI.' } },
    { c: C.mem, t: { nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, m: ['cis-Golgi', 'cis', 'medial', 'trans', 'de cisterne zelf rijpt', 'the cisterna itself matures'], d: { nl: 'Een stapel platte zakjes (cis → medial → trans). De vracht reist mee terwijl elk zakje zelf langzaam verandert en opschuift.', en: 'A stack of flat sacs (cis → medial → trans). The cargo travels along while each sac itself slowly changes and moves on.' },
      p: { nl: 'Gepolariseerde stapel cisternen; getoond volgens het cisternale-rijpingsmodel, waarin cisternen van cis naar trans rijpen.', en: 'Polarised stack of cisternae; shown according to the cisternal maturation model, in which cisternae mature from cis to trans.' } },
    { c: '#00A651', t: { nl: 'bewerken onderweg', en: 'processing along the way' }, m: ['cis: M6P op', 'cis: M6P on', 'lysosomale enzymen', 'lysosomal enzymes', 'medial: Man eraf,', 'medial: Man off,', 'GlcNAc erbij', 'GlcNAc on', 'trans: Gal, Sia', '(ook op O-glycanen)', '(also on O-glycans)'], d: { nl: 'In elk zakje werken andere enzymen. Ze knippen suikers af en zetten er nieuwe op, stap voor stap.', en: 'Different enzymes work in each sac. They trim sugars off and add new ones, step by step.' },
      p: { nl: 'Compartimentgebonden glycosylering: M6P-merking in het cis-Golgi, mannosetrimming en GlcNAc-toevoeging in het mediale, galactose en siaalzuur in het trans-Golgi.', en: 'Compartment-specific glycosylation: M6P tagging in the cis-Golgi, mannose trimming and GlcNAc addition in the medial, galactose and sialic acid in the trans-Golgi.' } },
    { c: C.mem, t: 'TGN', d: { nl: 'De uitgang van het Golgi: een netwerk van buisjes waar de vracht per bestemming wordt gesorteerd.', en: 'The exit of the Golgi: a network of tubules where cargo is sorted by destination.' },
      p: { nl: 'Trans-Golginetwerk: belangrijkste sorteerstation naar plasmamembraan, secretiegranules en endosomen/lysosomen.', en: 'Trans-Golgi network: main sorting station towards the plasma membrane, secretory granules and endosomes/lysosomes.' } },
    { c: C.mem, t: { nl: 'constitutief', en: 'constitutive' }, m: ['continu', 'continuously'], d: { nl: 'Blaasjes die zonder signaal, de hele tijd, naar het celmembraan gaan en hun inhoud naar buiten brengen.', en: 'Vesicles that go to the cell membrane all the time, without a signal, and release their contents outside.' },
      p: { nl: 'Constitutieve secretie: continue fusie van transportvesikels met het plasmamembraan.', en: 'Constitutive secretion: continuous fusion of transport vesicles with the plasma membrane.' } },
    { c: GRAN, t: { nl: 'gereguleerd (granules)', en: 'regulated (granules)' }, m: ['op signaal', 'on signal'], d: { nl: 'Roze voorraadblaasjes (bv. met insuline). Ze wachten en geven hun inhoud pas af op een signaal.', en: 'Pink storage vesicles (e.g. with insulin). They wait and release their contents only on a signal.' },
      p: { nl: 'Gereguleerde secretie: secretiegranules fuseren pas na een stimulus, meestal een stijging van cytosolisch Ca²⁺.', en: 'Regulated secretion: secretory granules fuse only after a stimulus, usually a rise in cytosolic Ca²⁺.' } },
    { c: '#ffe08a', t: 'Ca²⁺', d: { nl: 'Calcium: het signaal dat de voorraadblaasjes laat leeglopen.', en: 'Calcium: the signal that makes the storage vesicles empty out.' },
      p: { nl: 'Ca²⁺-instroom triggert de exocytose van secretiegranules.', en: 'Ca²⁺ influx triggers exocytosis of secretory granules.' } },
    { c: C.muted, t: { nl: 'celmembraan', en: 'cell membrane' }, m: ['buiten', 'outside', 'de cel', 'the cell'], d: { nl: 'De rand van de cel, rechts. Blaasjes versmelten ermee en brengen hun inhoud naar buiten.', en: 'The edge of the cell, on the right. Vesicles fuse with it and release their contents outside.' },
      p: { nl: 'Plasmamembraan; plaats van exocytose.', en: 'Plasma membrane; site of exocytosis.' } },
    { c: '#ff6b6b', t: { nl: 'lysosomaal (M6P)', en: 'lysosomal (M6P)' }, m: ['M6P-receptor + enzym', 'M6P receptor + enzyme', 'receptor terug', 'receptor returns'], d: { nl: 'Knipenzymen voor het lysosoom krijgen een suikerlabel (M6P). Een ontvanger pakt ze in een blaasje en brengt ze weg; daarna keert hij terug.', en: 'Cutting enzymes for the lysosome get a sugar tag (M6P). A receiver packs them into a vesicle and takes them away; then it returns.' },
      p: { nl: 'Lysosomale hydrolasen dragen mannose-6-fosfaat en worden in het TGN door M6P-receptoren in clathrinevesikels verpakt; de receptor recycleert.', en: 'Lysosomal hydrolases carry mannose 6-phosphate and are packaged in the TGN by M6P receptors into clathrin vesicles; the receptor recycles.' } },
    { c: CLATH, t: { nl: 'clathrinevesikel', en: 'clathrin vesicle' }, d: { nl: 'Witte, omhulde blaasjes die de lysosoom-enzymen van het Golgi naar het endosoom brengen.', en: 'White coated vesicles that carry the lysosome enzymes from the Golgi to the endosome.' },
      p: { nl: 'Clathrine-gecoate vesikels (met adaptinen) voor transport van TGN naar endosomen.', en: 'Clathrin-coated vesicles (with adaptins) for transport from the TGN to endosomes.' } },
    { c: '#ff6b6b', t: { nl: 'endosoom', en: 'endosome' }, m: ['pH ≈ 5,5–6,5', 'pH ≈ 5.5–6.5', 'zuur → enzym laat los', 'acidic → enzyme released'], d: { nl: 'Een sorteerblaasje dat wat zuur is. Door het zuur laat de ontvanger het enzym los.', en: 'A sorting vesicle that is slightly acidic. The acid makes the receiver let go of the enzyme.' },
      p: { nl: 'Licht zuur endosoom; de lage pH doet het enzym van de M6P-receptor dissociëren.', en: 'Mildly acidic endosome; the low pH makes the enzyme dissociate from the M6P receptor.' } },
    { c: C.danger, t: { nl: 'lysosoom', en: 'lysosome' }, m: ['pH ≈ 4,5–5', 'pH ≈ 4.5–5'], d: { nl: 'Het verteerblaasje van de cel. Het is nog zuurder; daar werken de knipenzymen.', en: 'The cell’s digestion vesicle. It is even more acidic; that is where the cutting enzymes work.' },
      p: { nl: 'Zuur degradatief organel (pH ≈ 4,5–5) met lysosomale hydrolasen.', en: 'Acidic degradative organelle (pH ≈ 4.5–5) containing lysosomal hydrolases.' } },
  ],
  steps: [
    ST(7500, FULL, 'De weg naar buiten', 'The way out',
      'Eiwitten uit het ER reizen via het Golgi naar het celmembraan, naar buiten of naar het lysosoom.',
      'Proteins from the ER travel via the Golgi to the cell membrane, out of the cell or to the lysosome.'),
    ST(8000, cam(470, 432, 820), 'Van het ER naar het Golgi', 'From the ER to the Golgi',
      'Goed gevouwen eiwitten verlaten het ER in kleine blaasjes. Die brengen ze naar de ingang van het Golgi.',
      'Correctly folded proteins leave the ER in small vesicles. These carry them to the entrance of the Golgi.'),
    ST(8000, cam(560, 400, 860), 'Terug naar het ER', 'Back to the ER',
      'ER-eiwitten die per ongeluk meegingen, hebben een label (KDEL). Een ontvanger herkent dat en stuurt ze terug.',
      'ER proteins that slipped along by mistake carry a tag (KDEL). A receptor spots it and sends them back.'),
    ST(9000, cam(880, 420, 1200), 'Het Golgi schuift op', 'The Golgi moves along',
      'Elke schijf ontstaat aan de ingang (cis) en rijpt tot uitgang (trans). Haar enzymen keren in blaasjes terug.',
      'Each disc forms at the entrance (cis) and matures into the exit (trans). Its enzymes return in vesicles.'),
    ST(8500, cam(880, 430, 1100), 'Bewerken onderweg', 'Processing along the way',
      'Elke schijf heeft eigen enzymen die suikers weghalen en toevoegen. Lysosoomenzymen krijgen een label.',
      'Each disc has its own enzymes that trim and add sugars. Enzymes for the lysosome get a tag.'),
    ST(8000, cam(1180, 470, 1100), 'Sorteren aan de uitgang', 'Sorting at the exit',
      'Aan de uitgang gaat elk eiwit in het juiste blaasje: naar het membraan, een opslagkorrel of het endosoom.',
      'At the exit, each protein goes into the right vesicle: to the membrane, a storage granule or the endosome.'),
    ST(9000, cam(1315, 400, 900), 'Meteen of op signaal', 'Right away or on a signal',
      'Gewone blaasjes versmelten meteen met het membraan. Opslagkorrels (bv. met insuline) wachten op een signaal.',
      'Ordinary vesicles fuse with the membrane right away. Storage granules (e.g. with insulin) wait for a signal.'),
    ST(9000, cam(1200, 620, 950), 'Naar het lysosoom', 'To the lysosome',
      'Ontvangers brengen enzymen met het lysosoomlabel naar het endosoom en keren dan terug.',
      'Receptors carry enzymes with the lysosome tag to the endosome, then return.'),
  ],
  svg() {
    // kern + ER
    const nuc = `<circle cx="-60" cy="450" r="222" fill="url(#gNuc)" opacity=".9"/>` + kernEnvelop(ptsCirkel(-60, 450, 226, 120), { poriën: [.9, .96, .03, .1], w: 9, gap: 9, poreW: 18 }) + `<g id="go-nuclab">${T(42, 460, T2('kern', 'nucleus'), { size: 20, col: C.dna2 })}</g>`;
    let er = '';
    [0, 1, 2].forEach(i => {                       // ruw ER: platte zakken (één membraan rond het lumen) met ribosomen aan de cytosolkant
      const r = 265 + i * 42, P = Array.from({ length: 41 }, (_, k) => { const a = -1.1 + 2.2 * k / 40; return [-60 + r * Math.cos(a), 450 + r * Math.sin(a)]; });
      er += zak(P, 11, 'rgba(201,165,116,.22)', 8);
      for (let a = -1; a <= 1; a += .16) er += ribosoomKlein(-60 + (r + 21) * Math.cos(a), 450 + (r + 21) * Math.sin(a), { s: .55, rot: a * 180 / Math.PI + 90 });
    });
    // plasmamembraan
    const pm = membraanPts(ptsBoog(PMX, 40, PMX + 40, 450, PMX, 860, 50), { w: 20 }) + TL(PMX + 96, 590, [T2('buiten', 'outside'), T2('de cel', 'the cell')], { size: 20, col: C.muted });
    // endosoom en lysosoom
    const el = blaasje(ENDO[0], ENDO[1], 44, { w: 9, lumen: 'rgba(201,165,116,.14)', rand: C.mem }) + `<g id="go-ell1">` + TL(ENDO[0], ENDO[1] + 78, [T2('endosoom', 'endosome'), T2('pH ≈ 5,5–6,5', 'pH ≈ 5.5–6.5')], { size: 22, col: '#ff6b6b' }) + '</g>' +
      blaasje(LYSO[0], LYSO[1], 54, { w: 9, lumen: 'rgba(255,107,107,.11)', rand: '#ff6b6b' }) + `<g id="go-ell2">` + TL(LYSO[0], LYSO[1] + 88, [T2('lysosoom', 'lysosome'), T2('pH ≈ 4,5–5', 'pH ≈ 4.5–5')], { size: 22, col: C.danger }) + '</g>';
    return svgOpen(arrowDefs('go', { m: C.muted, o: COPII, b: COPI, g: C.ok })) + `
    <g data-node="kern" data-color="${C.dna}" data-nolabel>${nuc}</g>
    <g data-node="er" data-color="${C.mem}" data-label="${T2('Ruw ER', 'Rough ER')}">${er}<circle data-anchor="er" cx="240" cy="200" r="1" fill="none"/></g>
    ${pm}
    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose (endosoom)', 'Endocytosis (endosome)')}">${el}<circle id="go-endoA" data-anchor="endocytose" cx="${ENDO[0] - 50}" cy="${ENDO[1] - 70}" r="1" fill="none"/></g>
    <g data-node="lysosoom" data-color="${C.danger}" data-label="${T2('Lysosoom: het suikerlabel', 'Lysosome: the sugar tag')}"><circle cx="${LYSO[0]}" cy="${LYSO[1]}" r="56" fill="transparent"/><circle id="go-lysoA" data-anchor="lysosoom" cx="${LYSO[0] - 30}" cy="${LYSO[1] - 70}" r="1" fill="none"/></g>
    <g data-node="glyco" data-color="#00A651" data-label="${T2('Glycanen bewerken', 'Processing glycans')}"><g id="go-cis"></g><circle data-anchor="glyco" cx="${X0 + 1.5 * SPC}" cy="${GY + GH + 50}" r="1" fill="none"/></g>
    <g id="go-ergic"></g>
    <g id="go-ves"></g>
    <g id="go-lbl"></g>
    <g data-node="disulfide" data-color="${GRAN}" data-label="${T2('Insuline (3 S–S-bruggen)', 'Insulin (3 S–S bonds)')}" data-nolabel><g id="go-gran"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    // blaasje: dubbellaag rond een lumen, met de mantel (COPII / COPI / clathrine) als gekleurde rand, vracht binnenin
    const ves = (x, y, coat, cargo, r = 15, op = 1) => op > .01 ? `<g opacity="${f1(op)}">${blaasje(x, y, r, { w: 7, lumen: 'rgba(201,165,116,.18)' })}<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + 6)}" fill="none" stroke="${coat}" stroke-width="3" ${coat === CLATH ? 'stroke-dasharray="4 3"' : ''}/>` +
      (cargo ? `<path d="${eiwitPad(x, y, r * .42, r * .38, 7, .1)}" fill="${cargo}"/>` : '') + '</g>' : '';
    const cisColor = (x, a) => { const k = clamp((x - X0) / (3 * SPC)); return `rgba(${Math.round(lerp(214, 176, k))},${Math.round(lerp(186, 132, k))},${Math.round(lerp(140, 96, k))},${a})`; };
    // Golgi-cisterne: platte zak met één membraan (bio.js cisterne), gebogen zoals vroeger (uiteinden x + 14, midden x − 16)
    const cisterna = (x, op) => op > .01 ? cisterne(x + 14, GY, { len: 2 * GH, dik: 30, buig: 30, vert: true, w: 9, lumen: cisColor(x, .32), op }) : '';

    return {
      update(t, s) {
        const { step, p } = s;
        $('go-nuclab').style.visibility = step === 1 ? 'hidden' : '';   // stap 2 (ingezoomd): enkel een fragment aan de linkerrand
        /* ---------- Golgi-stapel met cisternale rijping ---------- */
        const shift = step === 3 ? ease(sub(p, .15, .85)) : 0;
        let g = '';
        for (let i = -1; i <= 3; i++) {
          const x = X0 + (i + shift) * SPC;
          const op = i === -1 ? shift : i === 3 ? 1 - shift * .9 : 1;
          g += cisterna(x, op);
          // cargo in de cisterne
          if (op > .2) for (let j = 0; j < 3; j++) g += `<circle cx="${f1(x - 14)}" cy="${GY - 90 + j * 90}" r="8" fill="${CARGO}" opacity="${f1(op)}"/>`;
        }
        // TGN: buisjesnetwerk
        g += zak(Array.from({ length: 33 }, (_, k) => [TGN[0] + 15 * Math.sin(k / 32 * 4 * Math.PI), GY - 150 + 320 * k / 32]), 11, 'rgba(201,165,116,.25)', 8);
        for (const [dx, dy] of [[34, -110], [38, 40], [30, 140]]) g += blaasje(TGN[0] + dx, GY + dy, 13, { w: 7, lumen: 'rgba(201,165,116,.3)' });
        $('go-cis').innerHTML = g;
        // ERGIC
        $('go-ergic').innerHTML = `<g opacity=".9">${[[0, -40], [22, 2], [-12, 40], [26, 62]].map(([dx, dy]) => blaasje(ERGIC[0] + dx, ERGIC[1] + dy, 19, { w: 8, lumen: 'rgba(201,165,116,.22)' })).join('')}</g>`;

        /* ---------- vesikels ---------- */
        let v = '';
        // COPII (stap 0–2): continu ER → ERGIC → cis
        if (step <= 3) {
          for (let k = 0; k < 4; k++) {
            const u = ((p * (step === 1 ? 2 : 1)) + k / 4) % 1;
            // aankomst: het blaasje versmelt met de cis-cisterne (knop die openvloeit), niet erbovenop
            const yy = GY - 60 + k * 40, q2 = (yy - GY) / GH, m = [X0 - 33 + 30 * q2 * q2, yy], end = [m[0] - 24.5, yy];
            if (step <= 2 && u > .9) { const kb = knop(m, [-1, 0], 15, 1 - (u - .9) / .1, { hole: '#49433c', w: 7, lumen: 'rgba(201,165,116,.18)' }); v += kb.svg; continue; }
            const pos = u < .5 ? qb(EXIT, [460, 420 + k * 12], ERGIC, u * 2) : qb(ERGIC, [610, 470 - k * 10], end, Math.min(1, (u - .5) * 2 / .8));
            v += ves(pos[0], pos[1], u < .5 ? COPII : C.mem, CARGO, 15, step === 3 ? .5 : 1);
          }
        }
        // COPI terug naar ER met KDEL-eiwit (stap 2) / Golgi-enzymen terug (stap 3)
        if (step === 2) {
          for (let k = 0; k < 3; k++) {
            const u = (p * 1.5 + k / 3) % 1;
            const pos = qb([X0 - 10, GY - 140], [520, 230], [EXIT[0] + 10, EXIT[1] - 110], u);
            v += ves(pos[0], pos[1], COPI, C.prot, 15);
          }
          v += `<path d="${eiwitPad(X0 - 37, GY - 165, 9, 16, 9, .08)}" fill="${COPI}"/>`;
        }
        if (step === 3) {
          for (let i = 0; i < 3; i++) {
            const u = sub(p, .2 + i * .15, .55 + i * .15);
            if (u > 0 && u < 1) { const x0 = X0 + (i + 1 + shift) * SPC, x1 = X0 + (i + shift) * SPC; v += ves(lerp(x0, x1 + 10, u), GY - 170 - 30 * Math.sin(u * Math.PI), COPI, C.prot, 13); }
          }
        }
        // TGN-sortering en secretie (stap 5–7)
        if (step >= 5) {
          const q = step === 5 ? p : 1;
          // constitutief: TGN → PM
          for (let k = 0; k < 3; k++) {
            const u = step === 5 ? clamp(q * 1.6 - k * .25) : ((step === 6 ? p * 1.3 : p) + k / 3) % 1;
            const a = [TGN[0] + 40, GY - 10 + k * 10], b = [PMX - 20, 440 + k * 40];
            if (u > 0) {
              if (u < .85) { const pos = qb(a, [1250, 420 + k * 20], b, u / .85); v += ves(pos[0], pos[1], C.mem, CARGO, 16); }
              else {   // versmelten: het blaasje wordt een knop van het plasmamembraan die openvloeit (k 1 → 0); de vracht komt buiten
                const f = (u - .85) / .15, m = [pmX(b[1]), b[1]], kb = knop(m, [-1, 0], 16, 1 - f, { hole: OUT, w: 7, lumen: 'rgba(201,165,116,.18)' });
                v += kb.svg + `<circle cx="${f1(lerp(kb.c[0], m[0] + 34, ease(sub(f, .4, 1))))}" cy="${b[1]}" r="7" fill="${CARGO}"/>`;
              }
            }
          }
          // gereguleerd: granules sparen zich op en versmelten na Ca²⁺
          const fuse = step === 6 ? ease(sub(p, .6, .9)) : step === 7 ? 1 : 0;
          const gr = [[1320, 230], [1370, 280], [1290, 300], [1400, 200]], DOCKY = [240, 300, 360, 180];   // elk een eigen plek aan het membraan
          gr.forEach(([x, y], k) => {
            const arrive = step === 5 ? ease(sub(p, .3 + k * .1, .6 + k * .1)) : 1;
            const gx = lerp(TGN[0] + 30, x, arrive), gy = lerp(GY - 110, y, arrive);
            // na het Ca²⁺-signaal: naar het membraan, dan versmelten (knop die openvloeit) en de inhoud komt buiten de cel
            const go = step === 6 ? ease(sub(p, .6, .72)) : step === 7 ? 1 : 0, kf = step === 6 ? ease(sub(p, .72, .9)) : step === 7 ? 1 : 0;
            const dy = lerp(gy, DOCKY[k], go), m = [pmX(DOCKY[k]), DOCKY[k]], dock = [m[0] - 22 - 14, DOCKY[k]];
            if (arrive > 0) {
              if (kf <= 0) v += blaasje(lerp(gx, dock[0], go), dy, 22, { w: 8, lumen: 'rgba(240,107,192,.3)', rand: GRAN }) + `<circle cx="${f1(lerp(gx, dock[0], go))}" cy="${f1(dy)}" r="11" fill="${GRAN}"/>`;
              else {
                const kb = knop(m, [-1, 0], 22, 1 - kf, { hole: OUT, w: 8, lumen: 'rgba(240,107,192,.3)' });
                const c = [lerp(kb.c[0], m[0] + 40 + k * 14, ease(sub(kf, .45, 1))), m[1]];
                v += kb.svg + `<circle cx="${f1(c[0])}" cy="${f1(c[1])}" r="9" fill="${GRAN}"/>`;
              }
            }
          });
          if (step === 6) v += T(1540, 400, 'Ca²⁺', { size: 26, col: '#ffe08a', w: 800, op: sub(p, .5, .6) * (1 - sub(p, .9, 1)) }) + (p > .5 && p < .9 ? `<circle cx="1540" cy="392" r="${f1(20 + 40 * ((p - .5) / .4))}" fill="none" stroke="#ffe08a" stroke-width="3" opacity="${f1(1 - (p - .5) / .4)}"/>` : '');
          // lysosomaal: TGN → endosoom (clathrine) → lysosoom; receptor terug
          const lp = step === 7 ? p : step === 5 ? p * .5 : 0;
          for (let k = 0; k < 2; k++) {
            const u = clamp(lp * 1.6 - k * .3);
            if (u > 0 && u < 1) { const pos = qb([TGN[0] + 20, GY + 150], [1060, 640], [ENDO[0] - 30, ENDO[1] - 20], u); v += ves(pos[0], pos[1], CLATH, '#ff6b6b', 16); }
          }
          if (step === 7) {
            const rel = sub(p, .55, .75), toL = ease(sub(p, .7, .92)), back = ease(sub(p, .6, .95));
            // het losgelaten enzym gaat in een blaasje van het endosoom naar het lysosoom (nooit los door een membraan)
            if (toL > 0 && toL < 1) v += ves(lerp(ENDO[0] + 50, LYSO[0] - 60, toL), ENDO[1] - 40 * Math.sin(Math.PI * toL), C.mem, '#ff6b6b', 16, rel);
            else { const xs = toL >= 1 ? [LYSO[0] - 20, LYSO[0] + 10] : [ENDO[0], ENDO[0] + 10]; v += `<circle cx="${xs[0]}" cy="${ENDO[1]}" r="9" fill="#ff8a3d" opacity="${f1(rel)}"/><circle cx="${xs[1]}" cy="${ENDO[1] + 18}" r="9" fill="#ff8a3d" opacity="${f1(rel)}"/>`; }
            if (back > 0 && back < 1) { const pos = qb([ENDO[0] - 20, ENDO[1] - 46], [1080, 560], [TGN[0] + 30, GY + 120], back); v += ves(pos[0], pos[1], C.mem, C.prot, 13); }
          }
        }
        $('go-ves').innerHTML = v;

        /* ---------- labels ---------- */
        let lb = '';
        const names = [['cis', 0], ['medial', 1.5], ['trans', 3], ['TGN', 4.1]];
        if (step !== 1) names.forEach(([n, i]) => lb += T(X0 + i * SPC, GY - GH - 34, n, { size: 23, col: C.mem, w: 700 }));
        if (step === 0) {
          lb += T(ERGIC[0], ERGIC[1] + 110, 'ERGIC', { size: 23, col: C.mem });
          lb += T(X0 + 1.5 * SPC, GY + GH + 84, T2('Golgi-apparaat', 'Golgi apparatus'), { size: 24, col: C.mem, w: 700 });
        }
        if (step === 1) {
          lb += T(EXIT[0] + 10, EXIT[1] + 80, T2('ER-uitgang', 'ER exit site'), { size: 20, col: COPII });
          lb += T(460, 360, 'COPII', { size: 24, col: COPII, w: 800 });
          lb += T(ERGIC[0] + 10, ERGIC[1] + 110, 'ERGIC', { size: 22, col: C.mem, w: 700 });
          lb += T(X0, GY - GH - 34, 'cis-Golgi', { size: 22, col: C.mem, w: 700 });
          lb += TL(495, 618, [T2('alleen goed gevouwen', 'only correctly folded'), T2('eiwitten mogen mee', 'proteins may leave')], { size: 20, col: C.chain });   // twee regels: vrij van de cis-cisterne
        }
        if (step === 2) {
          lb += T(530, 205, T2('COPI (retrograad)', 'COPI (retrograde)'), { size: 24, col: COPI, w: 800 });
          lb += T(X0 - 40, GY - 205, T2('KDEL-receptor', 'KDEL receptor'), { size: 18, col: COPI, anchor: 'end' });
          lb += TL(470, 600, [T2('bv. BiP en PDI dragen', 'e.g. BiP and PDI carry'), T2('de staart …KDEL', 'the tail …KDEL')], { size: 20, col: '#c9b8ff' });
        }
        if (step === 3) lb += arr(X0 - 20, 180, X0 + 3 * SPC + 20, 180, C.mem, 'go-m', { w: 5 }) + T(X0 + 3 * SPC + 50, 188, T2('de cisterne zelf rijpt', 'the cisterna itself matures'), { size: 20, col: C.mem, anchor: 'start' }) +
          T(X0 - 60, GY - GH + 30, T2('COPI: enzymen', 'COPI: enzymes'), { size: 20, col: COPI, op: sub(p, .2, .3), anchor: 'end' }) + T(X0 - 60, GY - GH + 56, T2('één cisterne terug', 'one cisterna back'), { size: 20, col: COPI, op: sub(p, .2, .3), anchor: 'end' });
        if (step === 4) {
          const k = sub(p, .05, .25);
          const rows = [[0, T2('cis: M6P op', 'cis: M6P on'), T2('lysosomale enzymen', 'lysosomal enzymes')], [1.5, T2('medial: Man eraf,', 'medial: Man off,'), T2('GlcNAc erbij', 'GlcNAc on')], [3, T2('trans: Gal, Sia', 'trans: Gal, Sia'), T2('(ook op O-glycanen)', '(also on O-glycans)')]];
          rows.forEach(([i, a, b], j) => { const kk = sub(p, .05 + j * .2, .25 + j * .2), y0 = GY - 150 + j * 110; lb += panel(X0 + i * SPC - 100, y0, 200, 76, { op: kk, fill: 'rgba(13,20,38,.9)' }) + T(X0 + i * SPC, y0 + 32, a, { size: 18, op: kk }) + T(X0 + i * SPC, y0 + 58, b, { size: 18, op: kk }); });
          lb += `<g opacity="${f1(sub(p, .6, .8))}">${sugar('GlcNAc', X0 + 3 * SPC + 130, GY + 70, 12)}${sugar('Gal', X0 + 3 * SPC + 158, GY + 70, 12)}${sugar('Sia', X0 + 3 * SPC + 186, GY + 70, 12)}</g>`;
        }
        if (step === 5) {
          lb += T(1320, 540, T2('constitutief', 'constitutive'), { size: 20, col: C.mem, op: sub(p, .1, .3) });
          lb += T(1345, 358, T2('gereguleerd (granules)', 'regulated (granules)'), { size: 20, col: GRAN, op: sub(p, .3, .5) });
          lb += T(1030, 690, T2('lysosomaal (M6P)', 'lysosomal (M6P)'), { size: 20, col: '#ff6b6b', op: sub(p, .5, .7), anchor: 'end' });
        }
        if (step === 6) lb += T(1440, 580, T2('continu', 'continuously'), { size: 20, col: C.mem, anchor: 'end' }) + T(1380, 178, T2('op signaal', 'on signal'), { size: 20, col: GRAN, op: sub(p, .55, .7), anchor: 'end' });
        if (step === 7) {
          lb += T(1040, 700, T2('M6P-receptor + enzym', 'M6P receptor + enzyme'), { size: 19, col: '#ff6b6b', anchor: 'end', op: sub(p, 0, .15) });
          lb += T(ENDO[0] + 60, ENDO[1] + 146, T2('zuur → enzym laat los', 'acidic → enzyme released'), { size: 20, col: '#ff6b6b', op: sub(p, .5, .6), anchor: 'end' });
          lb += T(1110, 578, T2('receptor terug', 'receptor returns'), { size: 18, col: C.mem, op: sub(p, .6, .7), anchor: 'start' });
        }
        $('go-lbl').innerHTML = lb;
        // namen endosoom/lysosoom (klikbaar): in stap 8 weg van de pijl "receptor terug"
        $('go-endoA').setAttribute('cx', step === 7 ? ENDO[0] - 130 : step === 4 ? ENDO[0] - 70 : step === 5 ? ENDO[0] + 62 : ENDO[0] - 40); $('go-endoA').setAttribute('cy', step === 7 ? ENDO[1] + 80 : step === 5 ? ENDO[1] - 64 : ENDO[1] - 70);   // stap 6: boven het endosoom, vrij van de lysosomale blaasjes
        $('go-lysoA').setAttribute('cx', step === 7 ? LYSO[0] : step === 4 ? LYSO[0] - 40 : step === 5 ? LYSO[0] + 40 : step === 0 ? LYSO[0] - 20 : LYSO[0] + 30); $('go-lysoA').setAttribute('cy', step === 7 ? LYSO[1] - 80 : step === 5 ? LYSO[1] - 100 : step === 0 ? LYSO[1] - 135 : LYSO[1] - 70);   // overzicht: lysosoomknop hoger dan de endosoomknop (niet ertegenaan)
        const ellOp = f1(step === 0 ? 1 : step === 7 ? sub(p, 0, .15) : 0);   // namen endosoom/lysosoom alleen waar ze volledig in beeld zijn
        $('go-ell1').setAttribute('opacity', ellOp); $('go-ell2').setAttribute('opacity', ellOp);
        // hotspot-overlay op de granules
        $('go-gran').innerHTML = step >= 5 ? `<rect x="1260" y="180" width="170" height="150" fill="transparent"/>` : '';
      },
    };
  },
};
