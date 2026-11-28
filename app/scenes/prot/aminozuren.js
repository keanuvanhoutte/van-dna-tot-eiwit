import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, clamp, lerp, f1, CLASSCOL, THREE } from '../../kit.js';
import { at, bd, wedge, ACOL } from './_a_chem.js';

/* De 20 standaard-aminozuren, gegroepeerd naar de eigenschap van de zijketen (cursusindeling; handboeken verschillen in de details — zie simplified). */
const NAME = {
  G: ['Glycine', 'Glycine'], A: ['Alanine', 'Alanine'], V: ['Valine', 'Valine'], L: ['Leucine', 'Leucine'], I: ['Isoleucine', 'Isoleucine'],
  M: ['Methionine', 'Methionine'], F: ['Fenylalanine', 'Phenylalanine'], W: ['Tryptofaan', 'Tryptophan'], P: ['Proline', 'Proline'],
  S: ['Serine', 'Serine'], T: ['Threonine', 'Threonine'], C: ['Cysteïne', 'Cysteine'], N: ['Asparagine', 'Asparagine'], Q: ['Glutamine', 'Glutamine'], Y: ['Tyrosine', 'Tyrosine'],
  K: ['Lysine', 'Lysine'], R: ['Arginine', 'Arginine'], H: ['Histidine', 'Histidine'], D: ['Aspartaat (asparaginezuur)', 'Aspartate'], E: ['Glutamaat (glutaminezuur)', 'Glutamate'],
};
const GROUPS = [
  { key: 'h', list: 'GAVLIMFWP', col: CLASSCOL.h, nl: 'Hydrofoob (apolair)', en: 'Hydrophobic (non-polar)' },
  { key: 'p', list: 'STCNQY', col: CLASSCOL.p, nl: 'Polair (hydrofiel)', en: 'Polar (hydrophilic)' },
  { key: 'c', list: 'KRHDE', col: CLASSCOL['+'], nl: 'Geladen (pH 7): positief (basisch)  ·  negatief (zuur)', en: 'Charged (pH 7): positive (basic)  ·  negative (acidic)' },
];
const CW = 160, CH = 122, GAP = 8, ROWY = [175, 365, 555];
const CARDS = [];
GROUPS.forEach((g, r) => {
  const n = g.list.length, extra = r === 2 ? 60 : 0;
  const x0 = r === 2 ? 48 : (1600 - (n * CW + (n - 1) * GAP)) / 2;
  [...g.list].forEach((a, i) => CARDS.push({ a, row: r, x: x0 + i * (CW + GAP) + (r === 2 && i >= 3 ? extra : 0), y: ROWY[r], col: r === 2 ? (i < 3 ? CLASSCOL['+'] : CLASSCOL['-']) : (a === 'G' || a === 'P') ? CLASSCOL.s : g.col }));
});
const EXTRA = [{ a: 'U', three: 'Sec', nl: 'Selenocysteïne', en: 'Selenocysteine', x: 1110 }, { a: 'O', three: 'Pyl', nl: 'Pyrrolysine', en: 'Pyrrolysine', x: 1300 }];

function card(c, { op = 1, nameOp = 0, full = false, hideName = false, glow = false } = {}) {
  const { x, y, a, col } = c;
  const name = hideName ? `<text x="${x + CW / 2 + 4}" y="${y + 100}" font-size="26" text-anchor="middle" fill="${C.muted}" font-family="Inter" font-weight="700">?</text>`
    : nameOp > .01 ? `<g opacity="${f1(nameOp)}">${nameText(x, y, L({ nl: NAME[a][0], en: NAME[a][1] }), full)}</g>` : '';
  return `<g opacity="${f1(op)}">
    <rect x="${x}" y="${y}" width="${CW}" height="${CH}" rx="14" fill="#0f1830" stroke="${glow ? '#fff' : col}" stroke-width="${glow ? 4 : 2.5}"/>
    <rect x="${x}" y="${y}" width="10" height="${CH}" rx="5" fill="${col}"/>
    <text x="${x + 24}" y="${y + 56}" font-size="48" fill="${col}" font-family="JetBrains Mono" font-weight="700">${a}</text>
    <text x="${x + CW - 14}" y="${y + 46}" font-size="26" text-anchor="end" fill="${C.text}" font-family="JetBrains Mono" font-weight="700">${THREE[a]}</text>
    ${name}
  </g>`;
}
/* naam onderaan de kaart; lange namen worden passend gemaakt; "X (Y)" → enkel X, of twee regels als full */
function nameText(x, y, s, full) {
  const m = s.match(/^(.*) \((.*)\)$/);
  const fit = (yy, str, size, col) => `<text x="${x + CW / 2 + 5}" y="${y + yy}" font-size="${size}" text-anchor="middle" fill="${col}" font-family="Inter" font-weight="600"${str.length * size * .56 > CW - 22 ? ` textLength="${CW - 22}" lengthAdjust="spacingAndGlyphs"` : ''}>${str}</text>`;
  if (m && full) return fit(88, m[1], 20, C.text) + fit(111, `(${m[2]})`, 17, C.muted);
  return fit(100, m ? m[1] : s, 21, C.text);
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'aminozuren',
  title: { nl: 'De 20 aminozuren', en: 'The 20 amino acids' },
  scale: { nl: '≈ 0,5–1 nm', en: '≈ 0.5–1 nm' }, time: { nl: 'geen tijdsas', en: 'no time axis' },
  org: { nl: 'alle organismen (standaardset)', en: 'all organisms (standard set)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.s, { nl: 'hydrofoob, speciaal (Gly, Pro)', en: 'hydrophobic, special (Gly, Pro)' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief geladen', en: 'positively charged' }], [CLASSCOL['-'], { nl: 'negatief geladen', en: 'negatively charged' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb"><b>Handig om te kennen:</b> van elk aminozuur de volledige naam, de drielettercode, de éénlettercode en de eigenschap van de zijketen (hydrofoob, polair, geladen). Dezelfde kleuren worden in de hele app gebruikt (translatie, hemoglobine, Ramachandran).</p>',
    en: '<p style="font-size:13px;color:#93a0bb"><b>Useful to know:</b> for each amino acid the full name, the three-letter code, the one-letter code and the property of the side chain (hydrophobic, polar, charged). The same colours are used throughout the app (translation, haemoglobin, Ramachandran).</p>' },
  simplified: {
    nl: 'De indeling in groepen is een keuze; handboeken verschillen in de details (bv. Gly, Cys, Tyr, Trp en His worden soms anders ingedeeld). Ladingen gelden rond pH 7; His (pK van de zijketen in eiwitten gemiddeld ≈ 6,6) is dan maar gedeeltelijk geladen. De structuurformules zijn 2D-schetsen.',
    en: 'The grouping is a choice; textbooks differ in the details (e.g. Gly, Cys, Tyr, Trp and His are sometimes grouped differently). Charges apply around pH 7; His (side-chain pK in proteins on average ≈ 6.6) is then only partly charged. The structural formulas are 2D sketches.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: ACOL.N, t: { nl: 'aminogroep', en: 'amino group' }, m: ['H₃N⁺', 'H₂N⁺'], d: { nl: 'De blauwe groep links met stikstof (N). Elk aminozuur heeft er één; ze koppelt later aan het volgende aminozuur.', en: 'The blue group on the left with nitrogen (N). Every amino acid has one; it later links to the next amino acid.' },
      p: { nl: 'α-aminogroep, bij pH 7 geprotoneerd (–NH₃⁺); vormt met de carboxylgroep van een ander aminozuur de peptidebinding.', en: 'α-Amino group, protonated at pH 7 (–NH₃⁺); forms the peptide bond with the carboxyl group of another amino acid.' } },
    { c: '#fff', t: 'Cα', m: ['α-koolstof', 'α-carbon'], d: { nl: 'Het centrale koolstofatoom. Alle andere groepen hangen eraan vast.', en: 'The central carbon atom. All the other groups are attached to it.' },
      p: { nl: 'α-koolstofatoom; draagt de amino-, carboxyl- en zijketen plus een H en is (behalve bij Gly) een chiraal centrum.', en: 'α-Carbon atom; carries the amino group, carboxyl group, side chain and an H, and is (except in Gly) a chiral centre.' } },
    { c: ACOL.O, t: { nl: 'carboxylgroep', en: 'carboxyl group' }, m: ['COO⁻', 'O⁻'], d: { nl: 'De rode groep rechts met twee zuurstofatomen (O). Ook die heeft elk aminozuur.', en: 'The red group on the right with two oxygen atoms (O). Every amino acid has this one too.' },
      p: { nl: 'α-Carboxylgroep, bij pH 7 gedeprotoneerd (–COO⁻).', en: 'α-Carboxyl group, deprotonated at pH 7 (–COO⁻).' } },
    { c: CLASSCOL.h, t: { nl: 'zijketen (R)', en: 'side chain (R)' }, m: ['zijketen (R-groep): bepaalt de eigenschappen', 'side chain (R group): determines the properties'], d: { nl: 'Het enige deel dat per aminozuur verschilt (het bolletje R). Het bepaalt of het aminozuur water mijdt, water opzoekt of geladen is.', en: 'The only part that differs between amino acids (the R ball). It decides whether the amino acid avoids water, seeks water or is charged.' },
      p: { nl: 'Restgroep aan Cα; grootte, polariteit en lading van R bepalen de chemische eigenschappen en de plaats in het gevouwen eiwit.', en: 'Residue group on Cα; the size, polarity and charge of R determine the chemical properties and the position in the folded protein.' } },
    { c: C.muted, t: 'zwitterion', m: ['bij pH 7 als zwitterion: NH₃⁺ en COO⁻', 'at pH 7 as a zwitterion: NH₃⁺ and COO⁻'], d: { nl: 'In de cel draagt het aminozuur tegelijk een plus- en een minlading: plus aan de stikstofkant, min aan de zuurstofkant.', en: 'In the cell the amino acid carries a plus and a minus charge at the same time: plus on the nitrogen side, minus on the oxygen side.' },
      p: { nl: 'Bij fysiologische pH is de aminogroep geprotoneerd en de carboxylgroep gedeprotoneerd: netto neutraal dipolair ion.', en: 'At physiological pH the amino group is protonated and the carboxyl group deprotonated: a net-neutral dipolar ion.' } },
    { c: CLASSCOL.h, t: { nl: 'Hydrofoob (apolair)', en: 'Hydrophobic (non-polar)' }, m: ['A', 'Ala', 'Alanine', 'V', 'Val', 'Valine', 'L', 'Leu', 'Leucine', 'I', 'Ile', 'Isoleucine', 'M', 'Met', 'Methionine', 'F', 'Phe', 'Fenylalanine', 'Phenylalanine', 'W', 'Trp', 'Tryptofaan', 'Tryptophan'],
      d: { nl: 'Aminozuren die water mijden. Ze zitten meestal binnenin het opgevouwen eiwit. Op elke kaart: grote letter = éénlettercode, rechtsboven de drielettercode.', en: 'Amino acids that avoid water. They usually sit inside the folded protein. On each card: big letter = one-letter code, top right the three-letter code.' },
      p: { nl: 'Apolaire (alifatische en aromatische) zijketens; begraven in de hydrofobe kern en drijvende kracht achter de vouwing (hydrofoob effect).', en: 'Non-polar (aliphatic and aromatic) side chains; buried in the hydrophobic core and a driving force of folding (hydrophobic effect).' } },
    { c: CLASSCOL.s, t: { nl: 'glycine en proline', en: 'glycine and proline' }, m: ['G', 'Gly', 'Glycine', 'P', 'Pro', 'Proline', 'Glycine (Gly, G)', 'Proline (Pro, P)', 'R = H → achiraal, flexibel', 'R = H → achiral, flexible', 'ring op eigen N → star', 'ring on its own N → rigid'],
      d: { nl: 'Twee aparte gevallen (geel). Glycine heeft als zijketen maar één waterstofatoom: klein en soepel. Bij proline is de zijketen een ring die terug aan de stikstof vastzit: stijf.', en: 'Two special cases (yellow). Glycine has only one hydrogen atom as its side chain: small and flexible. In proline the side chain is a ring joined back to the nitrogen: rigid.' },
      p: { nl: 'Gly (R = H) is achiraal en conformationeel zeer flexibel; Pro is een cyclisch iminozuur dat φ vastlegt en geen amide-H heeft, en zo helices onderbreekt.', en: 'Gly (R = H) is achiral and conformationally very flexible; Pro is a cyclic imino acid that fixes φ and lacks an amide H, so it breaks helices.' } },
    { c: CLASSCOL.p, t: { nl: 'Polair (hydrofiel)', en: 'Polar (hydrophilic)' }, m: ['Ser', 'Serine', 'T', 'Thr', 'Threonine', 'Cys', 'Cysteïne', 'Cysteine', 'N', 'Asn', 'Asparagine', 'Q', 'Gln', 'Glutamine', 'Y', 'Tyr', 'Tyrosine'],
      d: { nl: 'Aminozuren die water opzoeken, maar geen lading hebben. Ze zitten meestal aan de buitenkant van het eiwit.', en: 'Amino acids that seek water but carry no charge. They usually sit on the outside of the protein.' },
      p: { nl: 'Ongeladen polaire zijketens (hydroxyl, thiol, amide, fenol) die waterstofbruggen vormen met water of andere groepen.', en: 'Uncharged polar side chains (hydroxyl, thiol, amide, phenol) that form hydrogen bonds with water or other groups.' } },
    { c: CLASSCOL['+'], t: { nl: 'Positief geladen (basisch)', en: 'Positively charged (basic)' }, m: ['K', 'Lys', 'Lysine', 'Arg', 'Arginine', 'His', 'Histidine', 'His: + in zuur milieu', 'His: + in acidic conditions'],
      d: { nl: 'Aminozuren met een pluslading. Histidine wordt pas echt positief in een zure omgeving.', en: 'Amino acids with a plus charge. Histidine only becomes truly positive in an acidic environment.' },
      p: { nl: 'Basische zijketens (amine, guanidinium, imidazool); bij pH 7 zijn Lys en Arg volledig, His maar gedeeltelijk geprotoneerd (pK ≈ 6,6 in eiwitten).', en: 'Basic side chains (amine, guanidinium, imidazole); at pH 7 Lys and Arg are fully, His only partly protonated (pK ≈ 6.6 in proteins).' } },
    { c: CLASSCOL['-'], t: { nl: 'Negatief geladen (zuur)', en: 'Negatively charged (acidic)' }, m: ['D', 'Asp', 'Aspartaat', '(asparaginezuur)', 'Aspartate', 'E', 'Glu', 'Glutamaat', '(glutaminezuur)', 'Glutamate'],
      d: { nl: 'Aminozuren met een minlading. Ze trekken plusladingen aan, ook binnen het eiwit.', en: 'Amino acids with a minus charge. They attract plus charges, also within the protein.' },
      p: { nl: 'Zure zijketens met een carboxylaatgroep, bij pH 7 gedeprotoneerd; kunnen zoutbruggen vormen met basische residuen.', en: 'Acidic side chains with a carboxylate group, deprotonated at pH 7; can form salt bridges with basic residues.' } },
    { c: '#ffd84a', t: { nl: 'disulfidebrug', en: 'disulfide bond' }, m: ['Cys–SH + HS–Cys → Cys–S–S–Cys (+ 2 H⁺ + 2 e⁻)', 'SH', 'HS', 'oxidatie', 'oxidation'], d: { nl: 'Twee cysteïnes kunnen met hun zwavelatomen een stevige brug vormen. Daarbij geven ze elektronen af.', en: 'Two cysteines can form a strong bridge with their sulfur atoms. In doing so they give off electrons.' },
      p: { nl: 'Covalente S–S-binding door oxidatie van twee thiolgroepen; stabiliseert vooral secretorische en extracellulaire eiwitten.', en: 'Covalent S–S bond formed by oxidation of two thiol groups; stabilises mainly secretory and extracellular proteins.' } },
    { c: CLASSCOL.h, t: { nl: 'L- en D-vorm', en: 'L and D forms' }, m: ['L-alanine', 'D-alanine', 'spiegelvlak', 'mirror plane', 'in eiwitten', 'in proteins', 'zeldzaam, niet via ribosomen', 'rare, not via ribosomes', 'CH₃'],
      d: { nl: 'Twee spiegelbeelden van hetzelfde aminozuur, zoals je linker- en rechterhand. Eiwitten bevatten enkel de L-vorm.', en: 'Two mirror images of the same amino acid, like your left and right hand. Proteins contain only the L form.' },
      p: { nl: 'Enantiomeren rond het chirale Cα (Fischer-projectie); ribosomen bouwen uitsluitend L-aminozuren in.', en: 'Enantiomers around the chiral Cα (Fischer projection); ribosomes incorporate only L-amino acids.' } },
    { c: '#ffa94a', t: { nl: 'Selenocysteïne en pyrrolysine', en: 'Selenocysteine and pyrrolysine' }, m: ['U', 'Sec', 'Selenocysteïne', 'Selenocysteine', 'UGA → Sec', 'Pyl', 'Pyrrolysine', 'UAG → Pyl'],
      d: { nl: 'Aminozuur 21 en 22. Ze worden ingebouwd op een plek die normaal ‘stop’ betekent. Pyrrolysine komt enkel bij sommige microben voor.', en: 'Amino acids 21 and 22. They are built in at a spot that normally means ‘stop’. Pyrrolysine occurs only in some microbes.' },
      p: { nl: 'Sec wordt cotranslationeel ingebouwd op UGA (hercodering via een SECIS-element); Pyl op UAG in sommige archaea en bacteriën.', en: 'Sec is incorporated co-translationally at UGA (recoding via a SECIS element); Pyl at UAG in some archaea and bacteria.' } },
  ],
  steps: [
    ST(8000, cam(800, 450, 1250), 'Bouwsteen: het aminozuur', 'Building block: the amino acid', 'Rond een centraal koolstofatoom zitten steeds dezelfde groepen plus één zijketen (R). Alleen R verschilt.', 'Around a central carbon atom sit always the same groups plus one side chain (R). Only R differs.'),
    ST(8000, FULL, 'De 20 standaard-aminozuren', 'The 20 standard amino acids', 'Alle levende wezens gebruiken dezelfde 20. Elk heeft een naam, twee korte codes en een eigen eigenschap.', 'All living things use the same 20. Each has a name, two short codes and its own property.'),
    ST(7500, FULL, 'Waterschuw (hydrofoob)', 'Water-avoiding (hydrophobic)', 'Deze zijketens mijden water (hydrofoob) en zitten meestal binnenin het eiwit. Gly en Pro (geel) zijn apart.', 'These side chains avoid water (hydrophobic) and usually sit inside the protein. Gly and Pro (yellow) are special.'),
    ST(7500, FULL, 'Waterminnend (polair)', 'Water-loving (polar)', 'Deze zijketens binden graag aan water. Daarom zitten ze meestal aan de buitenkant van het eiwit.', 'These side chains like to bind water. That is why they usually sit on the outside of the protein.'),
    ST(8000, cam(468, 545, 1000), 'Geladen: + en −', 'Charged: + and −', 'Lys en Arg zijn positief, Asp en Glu negatief. His wordt positief in een zure omgeving.', 'Lys and Arg are positive, Asp and Glu negative. His becomes positive in an acidic environment.'),
    ST(8500, FULL, 'Speciaal: glycine en proline', 'Special: glycine and proline', 'Glycine heeft als zijketen enkel een H: klein en soepel. Bij proline vormt de zijketen een ring: stijf.', 'Glycine has just an H as side chain: small and flexible. In proline the side chain forms a ring: rigid.'),
    ST(8000, FULL, 'Cysteïne maakt bruggen', 'Cysteine forms disulfide bonds', 'Twee cysteïnes kunnen een sterke zwavelbrug vormen. Die verstevigt vooral eiwitten die de cel verlaten.', 'Two cysteines can form a strong disulfide bond. It mainly reinforces proteins that leave the cell.'),
    ST(8500, FULL, 'Spiegelbeelden: L en D', 'Mirror images: L and D', 'De meeste aminozuren bestaan in twee spiegelbeeldvormen, zoals je handen. Eiwitten gebruiken de L-vorm.', 'Most amino acids come in two mirror-image forms, like your hands. Proteins use the L form.'),
    ST(8000, FULL, 'Nummer 21 en 22', 'Numbers 21 and 22', 'Selenocysteïne wordt soms ingebouwd op een stopcodon. Pyrrolysine komt enkel bij sommige microben voor.', 'Selenocysteine is sometimes built in at a stop codon. Pyrrolysine occurs only in some microbes.'),
    ST(9000, FULL, 'Test jezelf', 'Test yourself', 'Welk aminozuur hoort bij elke letter? De namen verschijnen één voor één.', 'Which amino acid belongs to each letter? The names appear one by one.'),
  ],
  svg() {
    /* algemene structuur (zwitterion, pH 7) */
    const X = 800, Y = 440;
    const gen = `
      ${bd(X - 170, Y, X, Y, { sh: 50, sh2: 24 })}${bd(X, Y, X + 170, Y, { sh: 24, sh2: 18 })}
      ${bd(X, Y, X, Y - 120, { sh: 24, sh2: 20 })}${bd(X, Y, X, Y + 120, { sh: 24, sh2: 26 })}
      ${bd(X + 170, Y, X + 250, Y - 70, { dbl: true, sh: 18, sh2: 18 })}${bd(X + 170, Y, X + 250, Y + 70, { sh: 18, sh2: 20 })}
      ${at(X - 205, Y, 'H₃N⁺', ACOL.N, 34)}${at(X, Y, 'Cα', '#fff', 36)}${at(X + 170, Y, 'C', ACOL.C, 34)}
      ${at(X + 262, Y - 80, 'O', ACOL.O, 34)}${at(X + 268, Y + 82, 'O⁻', ACOL.O, 34)}${at(X, Y - 136, 'H', ACOL.H, 34)}
      <circle cx="${X}" cy="${Y + 150}" r="34" fill="${CLASSCOL.h}" opacity=".9"/>${txt(X, Y + 163, 'R', '#0a1224', 36, 'middle', 800)}
      ${txt(X - 205, Y + 70, T2('aminogroep', 'amino group'), ACOL.N, 22)}${txt(X + 250, Y + 150, T2('carboxylgroep', 'carboxyl group'), ACOL.O, 22)}
      ${txt(X + 60, Y + 205, T2('zijketen (R-groep): bepaalt de eigenschappen', 'side chain (R group): determines the properties'), CLASSCOL.h, 22, 'start')}
      ${txt(X + 34, Y - 30, T2('α-koolstof', 'α-carbon'), '#fff', 20, 'start')}
      ${txt(X, Y - 215, T2('bij pH 7 als zwitterion: NH₃⁺ en COO⁻', 'at pH 7 as a zwitterion: NH₃⁺ and COO⁻'), C.muted, 20)}`;
    return svgOpen() + `
    <g id="az-gen">${gen}</g>
    <g id="az-heads"></g>
    <g id="az-cards"></g>
    <g id="az-extra" data-node="seleno" data-color="#ffa94a" data-label="${T2('Sec en Pyl: hercodering van stopcodons', 'Sec and Pyl: stop-codon recoding')}">
      ${EXTRA.map(e => `<rect x="${e.x}" y="${ROWY[2]}" width="${CW}" height="${CH}" rx="14" fill="#1a1426" stroke="#ffa94a" stroke-width="2.5" stroke-dasharray="7 5"/>
        <text x="${e.x + 22}" y="${ROWY[2] + 56}" font-size="48" fill="#ffa94a" font-family="JetBrains Mono" font-weight="700">${e.a}</text>
        <text x="${e.x + CW - 14}" y="${ROWY[2] + 46}" font-size="26" text-anchor="end" fill="${C.text}" font-family="JetBrains Mono" font-weight="700">${e.three}</text>
        <text x="${e.x + CW / 2 + 4}" y="${ROWY[2] + 100}" font-size="21" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="600" textLength="${CW - 22}" lengthAdjust="spacingAndGlyphs">${L(e)}</text>
        ${txt(e.x + CW / 2, ROWY[2] + CH + 40, e.a === 'U' ? 'UGA → Sec' : 'UAG → Pyl', '#ffa94a', 25)}`).join('')}
      <circle data-anchor="seleno" cx="1285" cy="${ROWY[2] - 8}" r="1" fill="none"/>
    </g>
    <g id="az-codon" data-node="codon" data-color="${C.rna}" data-label="${T2('Elk aminozuur ← codon(s): genetische code', 'Each amino acid ← codon(s): genetic code')}">
      <rect x="1150" y="84" width="400" height="54" rx="27" fill="rgba(255,138,61,.12)" stroke="${C.rna}"/>
      ${txt(1350, 120, T2('mRNA-codon → aminozuur', 'mRNA codon → amino acid'), C.rna, 24)}
      <circle data-anchor="codon" cx="1350" cy="84" r="1" fill="none"/>
    </g>
    <g id="az-pep" data-node="peptide" data-color="${C.chain}" data-label="${T2('Volgende: de peptidebinding', 'Next: the peptide bond')}">
      <rect x="1010" y="740" width="500" height="56" rx="28" fill="rgba(127,220,106,.12)" stroke="${C.chain}"/>
      ${txt(1260, 777, T2('aminozuren koppelen → peptidebinding', 'linking amino acids → peptide bond'), C.chain, 24)}
      <circle data-anchor="peptide" cx="1260" cy="740" r="1" fill="none"/>
    </g>
    <g id="az-ov"></g>
    <g data-node="disulfide" data-color="#ffd84a" data-nolabel><g id="az-ov6"></g></g>
    <g id="az-ss" data-node="disulfide" data-color="#ffd84a" data-label="${T2('Disulfidebruggen', 'Disulfide bonds')}">
      <rect x="540" y="560" width="520" height="56" rx="28" fill="rgba(255,216,74,.12)" stroke="#ffd84a"/>
      ${txt(800, 597, T2('meer over disulfidebruggen', 'more about disulfide bonds'), '#ffd84a', 24)}
      <circle data-anchor="disulfide" cx="800" cy="560" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const heads = GROUPS.map((g, r) => {
      if (r < 2) return txt(CARDS.find(c => c.row === r).x, ROWY[r] - 16, L({ nl: g.nl, en: g.en }), g.col, 25, 'start');
      return txt(48, ROWY[r] - 16, T2('Positief geladen (basisch)', 'Positively charged (basic)'), CLASSCOL['+'], 25, 'start') +
        txt(48 + 3 * (CW + GAP) + 60, ROWY[r] - 16, T2('Negatief geladen (zuur)', 'Negatively charged (acidic)'), CLASSCOL['-'], 25, 'start');
    });
    const hisNote = txt(48 + 2 * (CW + GAP) + CW / 2 + 5, ROWY[2] + CH + 30, T2('His: + in zuur milieu', 'His: + in acidic conditions'), C.muted, 20);

    /* overlay-panelen voor de speciale stappen */
    const panel = inner => `<rect x="170" y="150" width="1260" height="560" rx="22" fill="#0b1224" fill-opacity=".96" stroke="#2a3550" stroke-width="2"/>${inner}`;
    const gly = (x, y) => bd(x - 110, y, x, y, { sh: 40, sh2: 22 }) + bd(x, y, x + 110, y, { sh: 22, sh2: 40 }) + bd(x, y, x, y - 80) + bd(x, y, x, y + 80) +
      at(x - 140, y, 'H₃N⁺', ACOL.N, 28) + at(x, y, 'Cα', '#fff', 30) + at(x + 145, y, 'COO⁻', ACOL.O, 28) + at(x, y - 94, 'H', ACOL.H, 30) + at(x, y + 94, 'H', CLASSCOL.s, 32);
    const pro = (x, y) => {
      const N = [x - 80, y], CA = [x, y], CB = [x + 22, y + 78], CG = [x - 38, y + 126], CD = [x - 100, y + 80];
      let r = bd(N[0], N[1], CA[0], CA[1], { sh: 44, sh2: 24 });
      r += bd(CA[0], CA[1], CB[0], CB[1], { sh: 22, sh2: 0, col: CLASSCOL.s, w: 4 }) + bd(CB[0], CB[1], CG[0], CG[1], { sh: 0, sh2: 0, col: CLASSCOL.s, w: 4 }) +
        bd(CG[0], CG[1], CD[0], CD[1], { sh: 0, sh2: 0, col: CLASSCOL.s, w: 4 }) + bd(CD[0], CD[1], N[0], N[1], { sh: 0, sh2: 22, col: CLASSCOL.s, w: 4 });
      r += bd(x, y, x + 110, y, { sh: 22, sh2: 40 }) + bd(x, y, x, y - 75);
      r += at(N[0] - 14, N[1], 'H₂N⁺', ACOL.N, 28) + at(x, y, 'Cα', '#fff', 30) + at(x + 145, y, 'COO⁻', ACOL.O, 28) + at(x, y - 90, 'H', ACOL.H, 28);
            return r;
    };
    const cys = (x, y, flip) => {
      const d = flip ? -1 : 1;
      return bd(x, y, x, y - 70) + bd(x, y, x, y + 70) + bd(x, y, x + d * 90, y, { sh: 22 }) + at(x, y, 'Cα', '#fff', 26) + at(x, y - 84, '···', C.muted, 26) + at(x, y + 84, '···', C.muted, 26) + at(x + d * 100, y, 'CH₂', ACOL.C, 24);
    };
    const fischer = (x, y, left) => `<line x1="${x}" y1="${y - 90}" x2="${x}" y2="${y + 90}" stroke="#c9d2e4" stroke-width="3.5"/><line x1="${x - 90}" y1="${y}" x2="${x + 90}" y2="${y}" stroke="#c9d2e4" stroke-width="3.5"/>` +
      at(x, y - 112, 'COO⁻', ACOL.O, 26) + at(x, y + 114, 'CH₃', CLASSCOL.h, 26) + at(x + (left ? -128 : 128), y, 'H₃N⁺', ACOL.N, 26) + at(x + (left ? 112 : -112), y, 'H', ACOL.H, 26) +
      `<circle cx="${x}" cy="${y}" r="7" fill="#fff"/>`;
    const OV = {
      5: panel(txt(470, 225, 'Glycine (Gly, G)', CLASSCOL.s, 32) + gly(470, 390) + txt(470, 580, T2('R = H → achiraal, flexibel', 'R = H → achiral, flexible'), C.text, 25) +
        `<line x1="800" y1="200" x2="800" y2="660" stroke="#2a3550" stroke-width="2"/>` +
        txt(1120, 225, 'Proline (Pro, P)', CLASSCOL.s, 32) + pro(1140, 350) + txt(1120, 580, T2('ring op eigen N → star', 'ring on its own N → rigid'), C.text, 25)),
      6: panel(txt(800, 225, 'Cys–SH + HS–Cys  →  Cys–S–S–Cys (+ 2 H⁺ + 2 e⁻)', '#ffd84a', 28) +
        cys(330, 400, false) + bd(430, 400, 520, 400, { sh: 24, sh2: 22 }) + at(535, 400, 'SH', ACOL.S, 28) + at(700, 400, 'HS', ACOL.S, 28) + bd(715, 400, 800, 400, { sh: 22, sh2: 24 }) + cys(890, 400, true).replace(/x/g, 'x') +
        `<path d="M940,400 h110" stroke="#ffd84a" stroke-width="4" marker-end="url(#arrow)"/>` + txt(995, 380, T2('oxidatie', 'oxidation'), '#ffd84a', 24) +
        at(1130, 400, 'S', ACOL.S, 32) + bd(1130, 400, 1230, 400, { sh: 20, sh2: 20, col: '#ffd84a', w: 6 }) + at(1230, 400, 'S', ACOL.S, 32) + bd(1130, 400, 1100, 330, { sh: 20, sh2: 10 }) + bd(1230, 400, 1260, 470, { sh: 20, sh2: 10 }) +
        txt(1180, 500, T2('disulfidebrug', 'disulfide bond'), '#ffd84a', 25)),
      7: panel(txt(480, 225, 'L-alanine', CLASSCOL.h, 32) + fischer(480, 400, true) + txt(1120, 225, 'D-alanine', '#93a0bb', 32) + fischer(1120, 400, false) +
        `<line x1="800" y1="190" x2="800" y2="610" stroke="#fff" stroke-width="2.5" stroke-dasharray="10 8"/>` + txt(800, 645, T2('spiegelvlak', 'mirror plane'), C.text, 24) +
        txt(480, 590, T2('in eiwitten', 'in proteins'), C.text, 25) + txt(1120, 590, T2('zeldzaam, niet via ribosomen', 'rare, not via ribosomes'), C.muted, 24)),
    };
    let lastKey = '';
    return {
      update(t, s) {
        const { step, p } = s;
        $('az-gen').setAttribute('opacity', f1(step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .25)) : 0));
        const cardsOp = step === 0 ? 0 : step === 1 ? ease(sub(p, .15, .45)) : 1;
        // quiz: de namen verschijnen één voor één; er staan er nooit meer dan QWIN tegelijk (oudere vervagen weer tot hun 3-lettercode)
        const QWIN = 11, qz = step === 9 ? clamp(p / .9) * (CARDS.length + 1) : 99, quiz = Math.floor(qz);
        const key = `${step}|${f1(cardsOp)}|${step === 9 ? qz.toFixed(2) : ''}|${f1(ease(sub(p, 0, .3)))}`;
        $('az-ov').innerHTML = step === 6 ? '' : OV[step] ?? '';
        $('az-ov6').innerHTML = step === 6 ? OV[6] : '';
        $('az-ov').setAttribute('opacity', f1(step === 5 ? ease(sub(p, 0, .25)) : 1));
        $('az-ss').setAttribute('opacity', step === 6 ? 1 : 0);
        $('az-extra').setAttribute('opacity', step === 8 ? 1 : 0);
        $('az-codon').setAttribute('opacity', step >= 1 && step <= 4 ? 1 : 0);
        $('az-pep').setAttribute('opacity', step === 9 ? 1 : 0);
        if (key === lastKey) return; lastKey = key;
        /* per stap: welke rij is actief (rest gedimd) en van welke rij staan de namen er */
        const ACT = { 2: 0, 3: 1, 4: 2 };
        const rowOp = (row, k) => (k >= 5 && k <= 8) ? .2 : (ACT[k] !== undefined && ACT[k] !== row) ? .2 : 1;
        const nameOp = (row, k) => k === 9 ? 1 : ACT[k] === row ? 1 : 0;
        const e = step >= 2 ? ease(sub(p, 0, .3)) : 1;
        let h = '';
        CARDS.forEach((c, i) => {
          const op = step >= 2 ? lerp(rowOp(c.row, step - 1), rowOp(c.row, step), e) : 1;
          const nop = step === 9 ? Math.min(clamp((qz - i) * 2), 1 - clamp(qz - i - QWIN)) : step >= 2 ? lerp(nameOp(c.row, step - 1), nameOp(c.row, step), e) : 0;
          h += card(c, { op, nameOp: nop, full: step === 4, glow: step === 4 && c.a === 'H', hideName: step === 9 && i >= quiz });
        });
        $('az-cards').innerHTML = `<g opacity="${f1(cardsOp)}">${h}</g>`;
        const headOp = r => step === 9 ? 0 : step >= 2 ? lerp(rowOp(r, step - 1), rowOp(r, step), e) : 1;
        $('az-heads').innerHTML = heads.map((hh, r) => `<g opacity="${f1(cardsOp * headOp(r))}">${hh}</g>`).join('') +
          `<g opacity="${f1(step === 4 ? e : step === 5 ? 1 - e : 0)}">${hisNote}</g>`;
      },
    };
  },
};
