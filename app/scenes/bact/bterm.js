import { C, T2, svgOpen, txt, mono, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { K, prot, ribo } from './_bkit.js';
import { polymerase } from '../../bio.js';

/* Einde van de transcriptie bij bacteriën: intrinsieke terminator (GC-haarspeld + U-reeks) en Rho-afhankelijke terminatie;
 * ribosomen schermen het mRNA af tegen Rho (polariteit). Bron: Ray-Soni, Bellecourt & Landick 2016 (Annu Rev Biochem). */
const Y = 640, TERM = [930, 1090];
const RHO = '#ff8a3d';

/* RNA vanaf de uitgang van het polymerase (x) naar linksboven; s = afstand vanaf de polymerase */
const rnaPt = (x, s) => [x - 30 - s * .55, Y - 52 - Math.min(s, 420) * .5 - 9 * Math.sin(s / 38)];
const HP_W = 26, HP_H = 96;                       // haarspeld: breedte en hoogte van de stam
/* Het vrije RNA: begint aan de uitgang (rnaPt(x,0)). Met hp > 0 vouwt het eerste stuk RNA een haarspeld die recht omhoog
 * staat; de rest van het RNA vertrekt dan aan de linkervoet van de stam. Eén doorlopende lijn: de haarspeld ís het RNA. */
function rnaPath(x, len, hp = 0) {
  const [ex, ey] = rnaPt(x, 0), w = HP_W * Math.min(1, hp * 3), h = HP_H * hp;
  let d = `M${f1(ex)},${f1(ey)}`;
  if (hp > .01) d += ` V${f1(ey - h + w / 2)} a${f1(w / 2)},${f1(w / 2)} 0 0 0 ${f1(-w)},0 V${f1(ey)}`;
  for (let s = 6; s <= len; s += 6) { const [qx, qy] = rnaPt(x, s); d += ` L${f1(qx - w)},${f1(qy)}`; }
  return `<path d="${d}" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}
/* sporten van de haarspeld: stevige G–C-paren (dik, groen) */
function hpRungs(x, hp) {
  if (hp <= .01) return '';
  const [ex, ey] = rnaPt(x, 0), w = HP_W * Math.min(1, hp * 3), h = HP_H * hp, n = 6;
  let s = '';
  for (let i = 0; i < n; i++) { const y = ey - 10 - i * (h - 30) / (n - 1); if (y < ey - h + w / 2 + 4) break; s += `<line x1="${f1(ex - w + 3)}" y1="${f1(y)}" x2="${f1(ex - 3)}" y2="${f1(y)}" stroke="${K.term}" stroke-width="4" stroke-linecap="round"/>`; }
  return s;
}
/* RNA–DNA-hybride in het enzym: van de actieve plaats (rechts) naar achter, dan omhoog naar de uitgang */
const hybPath = x => { const [ex, ey] = rnaPt(x, 0); return `M${f1(x + 20)},${f1(Y + 3)} L${f1(x - 22)},${f1(Y + 3)} Q${f1(x - 44)},${f1(Y + 3)} ${f1(x - 38)},${f1(Y - 24)} L${f1(ex)},${f1(ey)}`; };
const rhoRing = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${f1(x + 24 * Math.cos(i * Math.PI / 3))}" cy="${f1(y + 24 * Math.sin(i * Math.PI / 3))}" r="13" fill="${RHO}" fill-opacity=".55" stroke="${RHO}" stroke-width="2"/>`).join('') + txt(x, y + 6, 'Rho', '#fff', 17, 'middle', 800) + '</g>';

export default {
  id: 'bterm',
  title: { nl: 'Stoppen met kopiëren: de terminator', en: 'Stopping copying: the terminator' },
  scale: { nl: '≈ 40 bp terminator · 10–20 nm', en: '≈ 40 bp terminator · 10–20 nm' }, time: { nl: 'loslaten: < 1 s', en: 'release: < 1 s' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.dna, 'DNA'], [K.rnap, { nl: 'RNA-polymerase', en: 'RNA polymerase' }], [C.rna, 'RNA'], [K.term, { nl: 'terminator', en: 'terminator' }], [RHO, 'Rho'], [K.ribo, { nl: 'ribosoom', en: 'ribosome' }]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Hoe de haarspeld het enzym precies doet loslaten, wordt nog onderzocht; hier is het één vloeiende beweging. Rho is een ring van zes eiwitten die op een C-rijk, onbedekt stuk RNA (rut) bindt; dat stuk is hier niet apart getoond. Ook andere eiwitten (zoals NusA en NusG) beïnvloeden terminatie. Hoe Rho het enzym precies stopt, wordt nog onderzocht: Rho kan ook al vroeg aan het polymerase binden en het dan uitschakelen.',
    en: 'Schematic and not to scale. Exactly how the hairpin makes the enzyme let go is still being studied; here it is one smooth movement. Rho is a ring of six proteins that binds a C-rich, uncovered stretch of RNA (rut); that stretch is not shown separately. Other proteins (such as NusA and NusG) also affect termination. Exactly how Rho stops the enzyme is still being studied: Rho can also bind the polymerase early and then switch it off.' },
  parts: [
    { c: C.dna, t: 'DNA', d: { nl: 'De twee blauwe lijnen: de dubbele DNA-draad. Rond het RNA-enzym wijken ze even uit elkaar.', en: 'The two blue lines: the double DNA strand. Around the RNA enzyme they briefly move apart.' },
      p: { nl: 'Dubbelstrengs DNA met de transcriptiebubbel in het polymerase.', en: 'Double-stranded DNA with the transcription bubble inside the polymerase.' } },
    { c: '#b98cff', t: { nl: 'gen', en: 'gene' }, d: { nl: 'Het stuk DNA dat gekopieerd wordt (paarse balk).', en: 'The stretch of DNA being copied (purple bar).' },
      p: { nl: 'Getranscribeerd gebied stroomopwaarts van de terminator.', en: 'Transcribed region upstream of the terminator.' } },
    { c: K.term, t: 'terminator', d: { nl: 'Het stopsignaal aan het einde van het gen (groen kader). Het RNA-enzym kopieert het mee in het RNA.', en: 'The stop signal at the end of the gene (green box). The RNA enzyme copies it into the RNA.' },
      p: { nl: 'Intrinsieke terminator: een GC-rijke inverted repeat gevolgd door een A-reeks op de matrijs (U-reeks in het RNA).', en: 'Intrinsic terminator: a GC-rich inverted repeat followed by an A-tract on the template (U-tract in the RNA).' } },
    { c: K.rnap, t: 'RNAP', d: { nl: 'Het RNA-enzym (RNA-polymerase): het schuift over het DNA en maakt de RNA-kopie, die er achteraan uitkomt.', en: 'The RNA enzyme (RNA polymerase): it slides along the DNA and makes the RNA copy, which comes out at the back.' },
      p: { nl: 'Elongerend RNA-polymerase met een RNA–DNA-hybride van ≈ 8–9 bp in het actieve centrum.', en: 'Elongating RNA polymerase with an ≈ 8–9 bp RNA–DNA hybrid in the active centre.' } },
    { c: C.rna, t: 'RNA', m: ['RNA en enzym los', 'RNA and enzyme released'], d: { nl: 'De oranje draad: de RNA-kopie. Binnen in het enzym zit ze nog even vast aan het DNA.', en: 'The orange strand: the RNA copy. Inside the enzyme it is still briefly attached to the DNA.' },
      p: { nl: 'Naissant transcript; bij terminatie komen RNA en polymerase vrij van het DNA.', en: 'Nascent transcript; at termination RNA and polymerase are released from the DNA.' } },
    { c: K.term, t: { nl: 'haarspeld', en: 'hairpin' }, m: ['G–C: sterk', 'G–C: strong'], d: { nl: 'Het RNA vouwt dubbel tot een haarspeld met sterke G-C-paren (groene sporten). Die duwt tegen het enzym.', en: 'The RNA folds back into a hairpin with strong G-C pairs (green rungs). It pushes against the enzyme.' },
      p: { nl: 'GC-rijke stam-lus die in het RNA-uitgangskanaal vormt en de hybride destabiliseert.', en: 'GC-rich stem-loop that forms in the RNA exit channel and destabilises the hybrid.' } },
    { c: C.rna, t: 'U', m: ['U–A: zwak vast', 'U–A: weakly held'], d: { nl: 'Een rij U’s in het RNA, gepaard met A’s van het DNA. Die paren houden zwak vast, dus het RNA laat makkelijk los.', en: 'A row of U’s in the RNA, paired with A’s of the DNA. These pairs hold weakly, so the RNA lets go easily.' },
      p: { nl: 'U-reeks: de rU·dA-hybride is de zwakste basepaarcombinatie en bevordert dissociatie na het pauzeren.', en: 'U-tract: the rU·dA hybrid is the weakest base-pair combination and promotes dissociation after pausing.' } },
    { c: RHO, t: 'Rho', m: ['Rho: trekt het RNA los', 'Rho: pulls the RNA free', 'kopiëren gestopt', 'copying stopped'], d: { nl: 'Een ring van zes eiwitten die op het RNA klimt, het RNA-enzym inhaalt en het RNA lostrekt.', en: 'A ring of six proteins that climbs onto the RNA, catches up with the RNA enzyme and pulls the RNA free.' },
      p: { nl: 'Hexamere RNA-translocase/helicase (ATP-afhankelijk) die op rut-plaatsen bindt en 5′→3′ naar RNAP toe beweegt.', en: 'Hexameric ATP-dependent RNA translocase/helicase that binds rut sites and moves 5′→3′ towards RNAP.' } },
    { c: K.ribo, t: { nl: 'ribosoom', en: 'ribosome' }, m: ['ribosomen bedekken het mRNA', 'ribosomes cover the mRNA', 'geen ribosomen op dit RNA', 'no ribosomes on this RNA'], d: { nl: 'De groene bolletjes: ribosomen die het RNA al lezen. Ze bedekken het, zodat Rho er niet op kan.', en: 'The green blobs: ribosomes already reading the RNA. They cover it, so Rho cannot get on.' },
      p: { nl: 'Translaterende ribosomen schermen rut-plaatsen af; zonder translatie volgt Rho-afhankelijke terminatie (polariteit).', en: 'Translating ribosomes shield rut sites; without translation Rho-dependent termination follows (polarity).' } },
  ],
  steps: [
    { dur: 12000, cam: cam(800, 460, 1600), title: { nl: 'Elk transcript eindigt met een stopsignaal', en: 'Every transcript ends with a stop signal' },
      text: { nl: 'Achter een gen of operon ligt een terminator. Daar laat het RNA-polymerase het DNA en het RNA los.', en: 'After a gene or operon lies a terminator. There RNA polymerase lets go of the DNA and the RNA.' } },
    { dur: 8000, cam: cam(900, 470, 1000), title: { nl: 'Stop 1: een haarspeld in het RNA', en: 'Stop 1: a hairpin in the RNA' },
      text: { nl: 'Het nieuwe RNA vouwt een stevige haarspeld met veel G–C-paren. Die trekt aan het enzym.', en: 'The new RNA folds a firm hairpin with many G–C pairs. It pulls on the enzyme.' } },
    { dur: 8000, cam: cam(900, 470, 1000), title: { nl: 'Een rij U’s: zwak vast, dus los', en: 'A row of U’s: weakly held, so it lets go' },
      text: { nl: 'Achter de haarspeld volgen U’s. Die houden het DNA maar zwak vast: het RNA en het enzym komen los.', en: 'After the hairpin come U’s. They hold the DNA only weakly: the RNA and the enzyme come free.' } },
    { dur: 13000, cam: cam(780, 450, 1300), title: { nl: 'Stop 2: het eiwit Rho', en: 'Stop 2: the protein Rho' },
      text: { nl: 'Bij andere genen bindt een ring van eiwitten (Rho) op vrij RNA. Rho kruipt naar het enzym toe.', en: 'At other genes a ring of proteins (Rho) binds free RNA. Rho crawls towards the enzyme.' } },
    { dur: 8000, cam: cam(780, 450, 1300), title: { nl: 'Rho haalt in en stopt het kopiëren', en: 'Rho catches up and stops copying' },
      text: { nl: 'Rho haalt het RNA-polymerase in en duwt het van het DNA. Het RNA komt vrij.', en: 'Rho catches up with RNA polymerase and pushes it off the DNA. The RNA is released.' } },
    { dur: 16000, cam: cam(800, 460, 1600), title: { nl: 'Ribosomen houden Rho tegen', en: 'Ribosomes keep Rho away' },
      text: { nl: 'Zolang ribosomen het mRNA lezen, kan Rho er niet op. Zo stopt Rho vooral RNA dat niet vertaald wordt.', en: 'As long as ribosomes read the mRNA, Rho cannot get on. So Rho mainly stops RNA that is not being translated.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="bt-dna"></g>
    <g id="bt-rna"></g>
    <g id="bt-obj"></g>
    <g id="bt-lab"></g>
    <g data-node="operon" data-color="#ff6b6b" data-label="${T2('← lac-operon', '← lac operon')}"><circle data-anchor="operon" cx="200" cy="735" data-pos="below" r="1" fill="none"/><rect x="199" y="734" width="2" height="2" fill="none"/></g>
    <g data-node="btrp" data-color="${K.term}" data-label="${T2('Stoppen als regelknop: trp-operon', 'Stopping as a control: trp operon')}"><circle data-anchor="btrp" cx="760" cy="735" data-pos="below" r="1" fill="none"/><rect x="759" y="734" width="2" height="2" fill="none"/></g>
    <g data-node="bmrna" data-color="${C.rna}" data-label="${T2('mRNA & 70S →', 'mRNA & 70S →')}"><circle data-anchor="bmrna" cx="1320" cy="735" data-pos="below" r="1" fill="none"/><rect x="1319" y="734" width="2" height="2" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    /* DNA met transcriptiebel op bx (bo = hoe open: 0 = dicht): de codestreng wijkt naar boven, de matrijsstreng naar onder */
    const dna = (termOp, bx, bo) => `<path d="M60,${Y - 8} L${f1(bx - 52)},${Y - 8} C${f1(bx - 40)},${f1(Y - 8 - 18 * bo)} ${f1(bx + 22)},${f1(Y - 8 - 18 * bo)} ${f1(bx + 34)},${Y - 8} L1540,${Y - 8}" stroke="${C.dna}" stroke-width="5" fill="none"/>` +
      `<path d="M60,${Y + 8} L${f1(bx - 52)},${Y + 8} C${f1(bx - 40)},${f1(Y + 8 + 14 * bo)} ${f1(bx + 22)},${f1(Y + 8 + 14 * bo)} ${f1(bx + 34)},${Y + 8} L1540,${Y + 8}" stroke="${C.dna2}" stroke-width="5" fill="none"/>` +
      `<g opacity="${f1(termOp)}"><rect x="${TERM[0]}" y="${Y - 22}" width="${TERM[1] - TERM[0]}" height="44" rx="6" fill="${K.term}" fill-opacity=".16" stroke="${K.term}" stroke-width="2.5"/>` + txt((TERM[0] + TERM[1]) / 2, Y + 64, 'terminator', K.term, 24, 'middle', 700) + '</g>' +
      `<rect x="160" y="${Y + 26}" width="740" height="14" rx="7" fill="#b98cff" fill-opacity=".3" stroke="#b98cff"/>` + txt(530, Y + 70, T2('gen', 'gene'), '#b98cff', 22, 'middle', 700);
    return {
      update(t, s) {
        const { step, p } = s;
        let x, len, rnapOp = 1, hp = 0, uu = 0, rel = 0, rhoD = -1, rhoOp = 0, ribos = 0, termOp = 1;
        if (step === 0) { x = lerp(240, 900, ease(sub(p, .05, .9))); len = x - 200; }
        else if (step === 1) { x = lerp(900, 1000, ease(sub(p, 0, .4))); len = x - 200; hp = ease(sub(p, .3, .75)); }
        else if (step === 2) { x = lerp(1000, 1075, ease(sub(p, 0, .3))); len = x - 200; hp = 1; uu = sub(p, .1, .35); rel = ease(sub(p, .45, .9)); }
        else {
          // Rho-scenario op een gen zonder intrinsieke terminator
          termOp = step === 3 ? 1 - sub(p, 0, .3) : 0;
          if (step === 3) { x = lerp(300, 1100, ease(sub(p, 0, 1))); len = x - 200; rhoOp = sub(p, .25, .4); rhoD = lerp(len * .9, len * .45, ease(sub(p, .35, 1))); }
          else if (step === 4) { x = 1100; len = 900; rhoOp = 1; rhoD = lerp(len * .45, 40, ease(sub(p, 0, .45))); rel = ease(sub(p, .5, .95)); }
          else { x = lerp(300, 1300, ease(sub(p, .05, .95))); len = x - 200; ribos = 1; rhoOp = sub(p, .2, .35); rhoD = len * .92; }
        }
        $('bt-dna').innerHTML = dna(termOp, x, 1 - rel);
        // RNA (+ loslaten: RNA en polymerase schuiven omhoog weg)
        const dy = -140 * rel, op = 1 - .2 * rel;   // wat loskomt blijft goed zichtbaar
        const mv = `transform="translate(${f1(60 * rel)} ${f1(dy)})"`;
        let r = `<g ${mv} opacity="${f1(op)}">` + rnaPath(x, len, hp) + hpRungs(x, hp);
        if (hp > .3) { const [ex, ey] = rnaPt(x, 0); r += `<g opacity="${f1(sub(hp, .5, 1))}">` + txt(ex + 14, ey - HP_H * .55, T2('haarspeld', 'hairpin'), K.term, 22, 'start', 800) + txt(ex + 14, ey - HP_H * .55 + 24, T2('G–C: sterk', 'G–C: strong'), K.term, 18, 'start', 700) + '</g>'; }
        if (ribos) for (let d = 120; d < len - 60; d += 150) { const [qx, qy] = rnaPt(x, len - d); r += ribo(qx, qy - 6, 2.2, 1); }
        r += '</g>';
        $('bt-rna').innerHTML = r;
        // polymerase (doorschijnend) met daarin de RNA–DNA-hybride: het jongste RNA zit gepaard aan de matrijsstreng
        const pairs = Array.from({ length: 6 }, (_, i) => x + 14 - i * 8);
        let o = `<g ${mv} opacity="${f1(op * rnapOp)}">` + polymerase(x, Y, 70, 38, { col: K.rnap, dir: 1, gul: 18, hoog: 1.3, vul: .3, op: 1, seed: 31 }) + txt(x + 20, Y - 28, 'RNAP', '#fff', 21, 'middle', 700)   /* label rechts van het midden: links loopt het RNA naar de uitgang */   /* bacteriële RNAP (bio.js): DNA door de geul, RNA achter-boven eruit */
          + `<g opacity="${f1(1 - rel)}">` + pairs.map(px => `<line x1="${f1(px)}" y1="${Y + 6}" x2="${f1(px)}" y2="${Y + 15}" stroke="${C.rna}" stroke-width="2" stroke-dasharray="2 2" opacity=".8"/>`).join('') + '</g>'
          + `<path d="${hybPath(x)}" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
        if (rhoOp > .01 && rhoD >= 0) {
          const [qx, qy] = rnaPt(x, rhoD);
          o += `<g transform="translate(${f1(60 * rel)} ${f1(dy)})">` + rhoRing(qx, qy, rhoOp * (step === 4 ? 1 - .2 * rel : 1))
            + (step === 3 || step === 4 ? `<g opacity="${f1(rhoOp * (step === 4 ? 1 - sub(p, .45, .6) : 1))}">` + txt(qx - 10, qy - 48, T2('Rho: trekt het RNA los', 'Rho: pulls the RNA free'), RHO, 24, 'middle', 800) + '</g>' : '') + '</g>';
          if (step === 5) o += `<g opacity="${f1(rhoOp)}"><path d="M${f1(qx - 18)},${f1(qy - 52)} l36,36 m0,-36 l-36,36" stroke="${C.danger}" stroke-width="6"/></g>`;
        }
        // de rij U's zit in het enzym, gepaard met de A's van het DNA: bovenop het enzym getekend zodat ze zichtbaar zijn
        // (geen kader meer: de U's staan als letters op het RNA zelf, met losse stippellijntjes naar de A's van de matrijs)
        if (uu > .01) o += `<g ${mv} opacity="${f1(uu * op)}">` + pairs.map(px => `<text x="${f1(px)}" y="${Y - 2}" font-size="13" text-anchor="middle" fill="#ffd2b0" font-family="JetBrains Mono" font-weight="800" stroke="#0b1224" stroke-width="3" paint-order="stroke">U</text>`).join('')
          + `<g opacity="${f1(step === 2 ? sub(p, .2, .35) : 0)}">` + `<path d="M${f1(x + 62)},${Y + 30} Q${f1(x + 40)},${Y + 30} ${f1(x + 22)},${Y + 14}" stroke="${C.rna}" stroke-width="2.5" fill="none"/>` + txt(x + 68, Y + 37, T2('U–A: zwak vast', 'U–A: weakly held'), C.rna, 22, 'start', 800) + '</g></g>';
        $('bt-obj').innerHTML = o;
        // labels
        let l = '';
        if (step === 2) l += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(1230, 330, T2('RNA en enzym los', 'RNA and enzyme released'), C.text, 26, 'middle', 700) + '</g>';
        if (step === 3) l += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(330, 230, T2('geen ribosomen op dit RNA', 'no ribosomes on this RNA'), C.muted, 24, 'middle', 700) + '</g>';
        if (step === 4) l += `<g opacity="${f1(sub(p, .55, .8))}">` + txt(1250, 330, T2('kopiëren gestopt', 'copying stopped'), C.text, 26, 'middle', 700) + '</g>';
        if (step === 5) l += `<g opacity="${f1(sub(p, .35, .55))}">` + txt(330, 230, T2('ribosomen bedekken het mRNA', 'ribosomes cover the mRNA'), K.ribo, 24, 'middle', 700) + '</g>';
        $('bt-lab').innerHTML = l;
      },
    };
  },
};
