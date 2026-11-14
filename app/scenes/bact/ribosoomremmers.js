import { C, T2, svgOpen, txt, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { K, prot, panel } from './_bkit.js';

/* Antibiotica op het bacteriële ribosoom: tetracycline (A-plaats, 30S), aminoglycosiden (leesplek, 16S-rRNA), macroliden
 * (uitgangstunnel, 50S), kirromycine (op EF-Tu) en waarom ons ribosoom gespaard blijft.
 * Bronnen: Lin et al. 2018 (Annu Rev Biochem, PMC9176271), Kohanski et al. 2010 (PMC2896384), Parmeggiani & Nissen 2006 (kirromycine). */
const S50 = [560, 320, 320, 185], S30 = [560, 600, 280, 115];   // cx, cy, rx, ry
const MY = 505;                                                // hoogte van het mRNA
const SITE = { E: 425, P: 560, A: 695 };
const DRUG = '#ff6b6b', TR = '#ffc247', TRA = '#ffe08a', CH = C.chain;

/* vereenvoudigd tRNA: staaf met anticodon onderaan en aminozuur bovenaan */
function trna(x, y0, col, op = 1, aaCol = null) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}"><rect x="${f1(x - 18)}" y="${f1(y0)}" width="36" height="${f1(MY - y0 - 6)}" rx="10" fill="${col}" fill-opacity=".85"/>` +
    (aaCol ? `<circle cx="${f1(x)}" cy="${f1(y0 - 14)}" r="14" fill="${aaCol}" stroke="#0a1224" stroke-width="2"/>` : '') + '</g>';
}
const pill = (x, y, op = 1, r = 13) => op <= .01 ? '' : `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${DRUG}" stroke="#fff" stroke-width="2.5"/></g>`;

export default {
  id: 'ribosoomremmers',
  title: { nl: 'Antibiotica op het ribosoom', en: 'Antibiotics on the ribosome' },
  scale: { nl: '70S ≈ 20 nm', en: '70S ≈ 20 nm' }, time: { nl: '≈ 10–20 aminozuren/s (zonder antibioticum)', en: '≈ 10–20 amino acids/s (without antibiotic)' },
  org: { nl: 'bacterie (Escherichia coli) en mens', en: 'bacterium (Escherichia coli) and human' },
  legend: [[K.ribo, { nl: '70S-ribosoom (50S boven, 30S onder)', en: '70S ribosome (50S top, 30S bottom)' }], [C.rna, 'mRNA'], [TR, 'tRNA'], [CH, { nl: 'nieuwe eiwitketen', en: 'new protein chain' }],
    [K.rnap, 'EF-Tu'], [DRUG, { nl: 'antibioticum', en: 'antibiotic' }]],
  simplified: {
    nl: 'Schema, niet op schaal. Echte tRNA’s zijn L-vormig en het ribosoom heeft geen gladde vorm. Elk antibioticum heeft zijn eigen precieze bindingsplek; hier staat de zone waar het zit. Macroliden houden niet elk eiwit tegen: ze remmen vooral bij bepaalde aminozuurvolgordes. Onderzoekers gebruiken kirromycine om EF-Tu op het ribosoom vast te zetten, zoals in de 3D-structuur 5AFI.',
    en: 'Schematic, not to scale. Real tRNAs are L-shaped and the ribosome has no smooth shape. Each antibiotic has its own precise binding spot; shown is the zone where it sits. Macrolides do not stop every protein: they mainly block at certain amino acid sequences. Researchers use kirromycin to lock EF-Tu on the ribosome, as in the 3D structure 5AFI.' },
  steps: [
    { dur: 8500, cam: FULL, title: { nl: 'Het ribosoom: een topdoelwit', en: 'The ribosome: a top target' },
      text: { nl: 'Meer dan de helft van de geneesmiddelen tegen infecties remt het ribosoom van de bacterie.', en: 'More than half of the medicines against infections inhibit the bacterial ribosome.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Tetracycline houdt de A-plaats bezet', en: 'Tetracycline blocks the A site' },
      text: { nl: 'Tetracycline zit op de kleine eenheid, waar het nieuwe tRNA moet landen. Dat tRNA kan er niet meer in.', en: 'Tetracycline sits on the small subunit, where the new tRNA should land. That tRNA can no longer get in.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Aminoglycosiden laten het ribosoom fouten maken', en: 'Aminoglycosides make the ribosome err' },
      text: { nl: 'Gentamicine bindt het RNA van de leesplek. Het ribosoom laat dan ook verkeerde tRNA’s toe.', en: 'Gentamicin binds the RNA of the reading site. The ribosome then also lets in wrong tRNAs.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Macroliden vernauwen de uitgangstunnel', en: 'Macrolides narrow the exit tunnel' },
      text: { nl: 'Erytromycine zit in de tunnel waardoor de nieuwe keten naar buiten gaat. Bij veel eiwitten stokt de aanmaak.', en: 'Erythromycin sits in the tunnel the new chain leaves through. For many proteins, production stalls.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Kirromycine zet de helper EF-Tu vast', en: 'Kirromycin locks the helper EF-Tu' },
      text: { nl: 'Kirromycine raakt niet het ribosoom, maar EF-Tu, dat tRNA’s aanbrengt. EF-Tu blijft dan op het ribosoom vastzitten.', en: 'Kirromycin does not hit the ribosome but EF-Tu, which brings in tRNAs. EF-Tu then stays stuck on the ribosome.' } },
    { dur: 10000, cam: FULL, title: { nl: 'Waarom ons ribosoom gespaard blijft', en: 'Why our ribosome is spared' },
      text: { nl: 'Op de plek waar gentamicine en erytromycine binden, heeft ons ribosoom een G in plaats van een A. Mede daardoor werken ze bij ons niet.', en: 'Where gentamicin and erythromycin bind, our ribosome has a G instead of an A. That is a key reason they do not work in us.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="rr-main"></g>
    <g id="rr-h1" data-node="beftu" data-color="${K.rnap}" data-label="${T2('EF-Tu in 3D', 'EF-Tu in 3D')}"><circle cx="830" cy="250" r="60" fill="transparent"/><circle data-anchor="beftu" cx="830" cy="150" r="1" fill="none"/></g>
    <g data-node="bribosoom" data-color="${K.ribo}" data-label="${T2('Het 70S-ribosoom in 3D', 'The 70S ribosome in 3D')}" data-pos="below"><ellipse cx="${S30[0]}" cy="${S30[1]}" rx="${S30[2] - 40}" ry="${S30[3] - 30}" fill="transparent"/><circle data-anchor="bribosoom" cx="${S30[0]}" cy="${S30[1] + 105}" r="1" fill="none"/></g>
    <g id="rr-side"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const fade = sub(p, .12, .35);
        let g = '';
        // ribosoom
        g += `<ellipse cx="${S50[0]}" cy="${S50[1]}" rx="${S50[2]}" ry="${S50[3]}" fill="${K.ribo}" fill-opacity=".22" stroke="${K.ribo}" stroke-width="3"/>`;
        g += `<ellipse cx="${S30[0]}" cy="${S30[1]}" rx="${S30[2]}" ry="${S30[3]}" fill="${K.ribo}" fill-opacity=".38" stroke="${K.ribo}" stroke-width="3"/>`;
        g += txt(S50[0] - 230, S50[1] - 95, '50S', K.ribo, 30, 'middle', 800) + txt(S30[0] - 210, S30[1] + 50, '30S', K.ribo, 30, 'middle', 800);
        // uitgangstunnel
        const tun = step === 3 ? 1 : .55;
        g += `<path d="M${SITE.P + 20},${MY - 230} C${SITE.P + 40},250 ${SITE.P + 70},190 ${SITE.P + 90},${S50[1] - S50[3] + 2}" fill="none" stroke="#0b1224" stroke-width="34" stroke-linecap="round" opacity="${f1(tun)}"/>`;
        // mRNA
        g += `<line x1="170" y1="${MY}" x2="950" y2="${MY}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>` + txt(170, MY + 40, "5′", C.rna, 22, 'middle', 700) + txt(950, MY + 40, "3′", C.rna, 22, 'middle', 700);
        // plaatsen
        for (const [k, x] of Object.entries(SITE)) g += txt(x, MY + 46, k, C.muted, 24, 'middle', 800);
        // P-tRNA met keten door de tunnel
        g += trna(SITE.P, 300, TR, 1);
        const stall = step === 3 ? ease(sub(p, .4, .7)) : 0;
        const chainLen = step === 3 ? lerp(4, 3, stall) : 6;
        let cx = SITE.P, cy = 286;
        for (let i = 0; i < chainLen; i++) {
          const nx = SITE.P + 20 + i * 14, ny = 280 - i * 26;
          g += `<circle cx="${f1(nx)}" cy="${f1(ny)}" r="12" fill="${step === 2 && i === 0 && p > .6 ? DRUG : CH}" stroke="#0a1224" stroke-width="2"/>`;
          cx = nx; cy = ny;
        }
        // A-plaats: inkomend tRNA (stap 0, 2) of geblokkeerd (stap 1) of met EF-Tu (stap 4)
        if (step === 0) g += trna(SITE.A, lerp(150, 300, ease(sub(p, .2, .7))), TRA, 1, CH);
        if (step === 1) {
          const u = ease(sub(p, .35, .6)), back = ease(sub(p, .6, .9));
          g += trna(SITE.A + 150 * back, lerp(170, 250, u) - 80 * back, TRA, 1 - .5 * back, CH);
          g += pill(SITE.A, MY + 22, fade);
          if (back > .2) g += `<g opacity="${f1(back)}">` + txt(SITE.A + 190, 150, '✕', DRUG, 40, 'middle', 800) + '</g>';
        }
        if (step === 2) {
          g += pill(SITE.A - 30, MY + 42, fade);
          g += trna(SITE.A, lerp(150, 300, ease(sub(p, .3, .6))), '#ff9d9d', 1, DRUG);
          if (p > .6) g += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(SITE.A + 110, 260, T2('verkeerd', 'wrong'), DRUG, 24, 'start', 800) + '</g>';
        }
        if (step === 3) g += pill(SITE.P + 48, 232, fade, 15) + `<g opacity="${f1(stall)}">` + txt(SITE.P + 120, 165, T2('vast', 'stuck'), DRUG, 26, 'start', 800) + '</g>';
        if (step === 4) {
          g += trna(SITE.A, 300, TRA, 1, CH);
          g += prot(SITE.A + 120, 255, 70, 50, K.rnap, 1, 9, 'EF-Tu', 22) + pill(SITE.A + 150, 228, fade);
          g += `<g opacity="${f1(sub(p, .5, .75))}">` + txt(SITE.A + 120, 340, T2('kan niet weg', 'cannot leave'), DRUG, 23, 'middle', 800) + '</g>';
        }
        if (step === 5) {
          g += `<g opacity="${f1(fade)}"><circle cx="${SITE.A - 30}" cy="${MY + 42}" r="16" fill="none" stroke="${C.ok}" stroke-width="4"/><circle cx="${SITE.P + 48}" cy="232" r="18" fill="none" stroke="${C.ok}" stroke-width="4"/></g>`;
          g += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(SITE.A + 40, MY + 90, T2('A1408 → bij ons G', 'A1408 → G in us'), C.ok, 22, 'start', 700) + txt(SITE.P + 95, 236, T2('A2058 → bij ons G', 'A2058 → G in us'), C.ok, 22, 'start', 700) + '</g>';
        }
        $('rr-main').innerHTML = g;
        $('rr-h1').setAttribute('opacity', step === 4 ? 1 : 0);

        // rechterpaneel
        const X = 1060, W = 500, MX = X + W / 2;
        let sd = panel(X, 170, W, 480);
        const line2 = (y, a, b, col = C.text) => txt(MX, y, a, col, 24, 'middle', 700) + (b ? txt(MX, y + 34, b, C.muted, 21, 'middle', 500) : '');
        if (step === 0) {
          sd += line2(230, T2('Drie plekken op het ribosoom', 'Three spots on the ribosome'));
          sd += line2(320, T2('A-plaats (30S)', 'A site (30S)'), T2('waar het nieuwe tRNA landt', 'where the new tRNA lands'));
          sd += line2(420, T2('leesplek (30S)', 'reading site (30S)'), T2('controleert codon en anticodon', 'checks codon and anticodon'));
          sd += line2(520, T2('uitgangstunnel (50S)', 'exit tunnel (50S)'), T2('waar de nieuwe keten naar buiten gaat', 'where the new chain leaves'));
        }
        if (step === 1) sd += line2(260, T2('Tetracycline', 'Tetracycline'), T2('o.a. doxycycline', 'e.g. doxycycline')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('geen nieuw tRNA', 'no new tRNA'), T2('→ de keten groeit niet verder', '→ the chain stops growing'), DRUG) + '</g>';
        if (step === 2) sd += line2(260, T2('Aminoglycosiden', 'Aminoglycosides'), T2('gentamicine, streptomycine', 'gentamicin, streptomycin')) + `<g opacity="${f1(sub(p, .55, .8))}">` + line2(400, T2('verkeerde aminozuren', 'wrong amino acids'), T2('→ foute, slecht gevouwen eiwitten', '→ faulty, misfolded proteins'), DRUG) + '</g>';
        if (step === 3) sd += line2(260, T2('Macroliden', 'Macrolides'), T2('erytromycine, azitromycine', 'erythromycin, azithromycin')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('de keten raakt vast', 'the chain gets stuck'), T2('→ vooral bij bepaalde volgordes', '→ mainly at certain sequences'), DRUG) + '</g>';
        if (step === 4) sd += line2(260, T2('Kirromycine', 'Kirromycin'), T2('raakt EF-Tu, niet het ribosoom', 'hits EF-Tu, not the ribosome')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('EF-Tu blijft hangen', 'EF-Tu stays stuck'), T2('→ het ribosoom zit vast', '→ the ribosome is jammed'), DRUG) + '</g>';
        if (step === 5) {
          sd += line2(240, T2('Eén letter verschil', 'One letter different'));
          sd += `<g opacity="${f1(sub(p, .2, .4))}">` + line2(320, T2('bacterie: A', 'bacterium: A'), T2('antibioticum past', 'antibiotic fits'), DRUG) + '</g>';
          sd += `<g opacity="${f1(sub(p, .4, .6))}">` + line2(430, T2('mens (80S): G', 'human (80S): G'), T2('antibioticum past slecht', 'antibiotic fits poorly'), C.ok) + '</g>';
          sd += `<g opacity="${f1(sub(p, .65, .85))}">` + txt(MX, 545, T2('Let op: de ribosomen in onze', 'Note: the ribosomes in our'), C.muted, 22, 'middle', 500) + txt(MX, 577, T2('mitochondriën kunnen wél', 'mitochondria can be'), C.muted, 22, 'middle', 500) + txt(MX, 609, T2('geraakt worden', 'hit after all'), C.muted, 22, 'middle', 500) + '</g>';
        }
        $('rr-side').innerHTML = sd;
      },
    };
  },
};
