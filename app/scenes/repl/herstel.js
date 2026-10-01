import { C, BASE, COMP, L, T2, svgOpen, txt, pill, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, RPA, PCNA, seg, pth, endl, prot, clamp3, tag, arrow, rpaRow } from './_draw.js';

/*
 * DNA-herstel: zes panelen (800 × 450) op een doek van 2400 × 900.
 *   boven: BER · NER · MMR      onder: NHEJ · HR · ziekten
 * In elk paneel loopt de bovenste streng 5'→3' van links naar rechts.
 */
const PW = 800, PH = 450;
const PANEL = { ber: [0, 0], ner: [800, 0], mmr: [1600, 0], nhej: [0, 450], hr: [800, 450], dis: [1600, 450] };
const pc = (k, w = 820, dy = 0) => cam(PANEL[k][0] + PW / 2, PANEL[k][1] + PH / 2 + dy, w);
const SEQ = 'GACTCGATCCGTACGGATCCTAGC';
const BP = 30, X0 = 70, N = 22;                                       // 22 bp × 30 px
const xi = i => X0 + BP / 2 + i * BP;

/* dubbelstreng met letters; opts.skipTop/skipBot: set van posities zonder base; over: {i: {top, bot, col}} */
let OVERVIEW = false, LETOP = 1;                                       // stap 0: overzicht zonder letters (te klein); LETOP = opaciteit van de letters (vloeiende overgang 0 → 1)
function ladder(y, gap, { top = SEQ, from = 0, to = N, skipTop = new Set(), skipBot = new Set(), over = {}, c1 = C.dna, c2 = C.dna2, letters = true, fs = 15, bend = () => 0, open = () => 0, cTop = () => c1, cBot = () => c2 } = {}) {
  let s = '', ls = '';
  for (let i = from; i < to; i++) {
    const x = xi(i), b = over[i]?.top ?? top[i % top.length], m = over[i]?.bot ?? COMP[top[i % top.length]];
    const o = open(i), yb = bend(i);
    const yt = y - gap / 2 + yb - o, ybt = y + gap / 2 + yb + o;
    if (!skipTop.has(i)) s += seg(x, yt, x, o > 4 ? yt + 16 : (yt + ybt) / 2, BASE[b], 5);
    if (!skipBot.has(i)) s += seg(x, o > 4 ? ybt - 16 : (yt + ybt) / 2, x, ybt, BASE[m], 5);
    if (letters && LETOP > .01) {
      if (!skipTop.has(i)) ls += txt(x, yt - 10, b, BASE[b], fs, 'middle', 700, 'JetBrains Mono');
      if (!skipBot.has(i)) ls += txt(x, ybt + fs + 6, m, BASE[m], fs, 'middle', 700, 'JetBrains Mono');
    }
  }
  if (ls) s += LETOP > .99 ? ls : `<g opacity="${f1(LETOP)}">${ls}</g>`;
  // ruggengraten per streng, als polylijn (volgt bend/open)
  const bb = (sign, f, cf, skip) => {
    let out = '', pts = [], col = null;
    const flush = () => { if (pts.length > 1) out += pth(pts, col, 7); pts = []; };
    for (let i = from; i < to; i++) {
      const x = xi(i), o = open(i), yb = bend(i);
      const yy = sign < 0 ? y - gap / 2 + yb - o : y + gap / 2 + yb + o;
      const cc = cf(i);
      if (cc === null) { flush(); col = null; continue; }
      if (col !== cc) { if (pts.length) { pts.push([x - BP / 2, yy]); flush(); } col = cc; pts.push([x - BP / 2, yy]); }
      pts.push([x, yy]);
      if (i === to - 1) pts.push([x + BP / 2, yy]);
    }
    flush();
    return out;
  };
  return bb(-1, 0, cTop) + bb(1, 0, cBot) + s;
}

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'herstel',
  title: { nl: 'DNA-herstel', en: 'DNA repair' },
  scale: '≈ 5–20 nm',
  time: { nl: 'seconden tot uren per letsel', en: 'seconds to hours per lesion' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'DNA-streng', en: 'DNA strand' }], [C.dna2, { nl: 'complementaire streng', en: 'complementary strand' }], [NEW, { nl: 'nieuw DNA', en: 'new DNA' }],
    [C.danger, { nl: 'schade / fout', en: 'damage / error' }], [C.prot, { nl: 'herstelenzymen', en: 'repair enzymes' }], [RPA, 'RPA'], ['#3fd0c9', 'RAD51']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Vier strategieën: één base vervangen (BER), een stuk streng met een groot letsel uitknippen (NER), een replicatiefout in de nieuwe streng verbeteren (MMR) en een dubbelstrengbreuk lijmen (NHEJ) of herstellen met de zusterchromatide als voorbeeld (HR).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Four strategies: replace one base (BER), cut out a piece of strand carrying a bulky lesion (NER), correct a replication error in the new strand (MMR), and glue a double-strand break (NHEJ) or repair it using the sister chromatid as a template (HR).</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal: DNA als ladder zonder helix en chromatine; enzymen als ovalen. BER toont de korte-patchroute; NER de globale route (bij TC-NER herkent een vastgelopen RNA-polymerase II met CSB het letsel); het uitgeknipte NER-fragment (24–32 nt) is ingekort getekend. Bij MMR herkent MutLα de nieuwe streng via onderbrekingen en de oriëntatie van PCNA. HR is getoond als SDSA (synthese-afhankelijke strenghybridisatie); andere HR-varianten vormen Holliday-juncties. Echte structuren o.a.: PDB 1JEY (Ku70/80 op DNA).',
    en: 'Schematic and not to scale: DNA as a ladder without helix or chromatin; enzymes as ovals. BER shows the short-patch route; NER the global route (in TC-NER a stalled RNA polymerase II with CSB detects the lesion); the excised NER fragment (24–32 nt) is drawn shortened. In MMR, MutLα recognises the new strand via strand discontinuities and the orientation of PCNA. HR is shown as SDSA (synthesis-dependent strand annealing); other HR variants form Holliday junctions. Real structures include PDB 1JEY (Ku70/80 on DNA).' },
  steps: [
    S(8000, cam(1200, 450, 2400), 'DNA raakt voortdurend beschadigd', 'DNA is damaged all the time',
      'Hydrolyse, oxidatie, UV en straling beschadigen DNA; per menselijke cel ontstaan er alleen al ~10 000 abasische plaatsen per dag. Elk soort letsel heeft zijn eigen herstelroute.',
      'Hydrolysis, oxidation, UV and radiation damage DNA; a human cell forms ~10,000 abasic sites per day from that alone. Each kind of lesion has its own repair pathway.'),
    S(8000, pc('ber'), 'BER 1: glycosylase knipt de foute base weg', 'BER 1: a glycosylase removes the wrong base',
      'Door deaminatie werd een C een U (tegenover G). Uracil-DNA-glycosylase klapt de U uit de helix en knipt de base van de suiker: een AP-plaats.',
      'Deamination turned a C into a U (opposite G). Uracil-DNA glycosylase flips the U out of the helix and cuts the base off the sugar: an AP site.'),
    S(8000, pc('ber'), 'BER 2: APE1, Pol β, ligase', 'BER 2: APE1, Pol β, ligase',
      "APE1 knipt de ruggengraat 5' van de AP-plaats; Pol β zet de juiste C terug en verwijdert de suikerrest; DNA-ligase III–XRCC1 sluit de nick.",
      "APE1 cuts the backbone 5' of the AP site; Pol β inserts the correct C and removes the sugar remnant; DNA ligase III–XRCC1 seals the nick."),
    S(8000, pc('ner'), 'NER 1: een omvangrijk letsel wordt herkend', 'NER 1: a bulky lesion is recognised',
      'UV koppelt twee naburige T\'s tot een dimeer dat de helix vervormt. XPC–RAD23B herkent de vervorming; TFIIH opent het DNA, XPA en RPA binden.',
      'UV links two neighbouring Ts into a dimer that distorts the helix. XPC–RAD23B detects the distortion; TFIIH opens the DNA, XPA and RPA bind.'),
    S(8000, pc('ner'), 'NER 2: dubbele insnede en opvullen', 'NER 2: dual incision and fill-in',
      "XPF–ERCC1 knipt 5', XPG 3' van het letsel: een stuk van 24–32 nt komt vrij. Pol δ/ε met PCNA vult het gat, ligase sluit.",
      "XPF–ERCC1 cuts 5' and XPG 3' of the lesion: a 24–32 nt piece is released. Pol δ/ε with PCNA fills the gap, ligase seals it."),
    S(9000, pc('mmr'), 'Mismatch-herstel (MMR)', 'Mismatch repair (MMR)',
      'MutSα (MSH2–MSH6) herkent een G·T-fout die de replicatie miste. MutLα (MLH1–PMS2) knipt de nieuwe streng; EXO1 verwijdert het stuk, Pol δ en ligase I maken het opnieuw.',
      'MutSα (MSH2–MSH6) recognises a G·T error missed during replication. MutLα (MLH1–PMS2) nicks the new strand; EXO1 removes the stretch, Pol δ and ligase I remake it.'),
    S(9000, pc('nhej'), 'Dubbelstrengbreuk: NHEJ', 'Double-strand break: NHEJ',
      'Ku70/80 schuift over beide uiteinden, DNA-PKcs bindt, de uiteinden worden bijgewerkt en XRCC4–ligase IV lijmt ze. Snel, in elke fase, maar er kunnen basen verloren gaan.',
      'Ku70/80 slides onto both ends, DNA-PKcs binds, the ends are trimmed and XRCC4–ligase IV joins them. Fast, in any phase, but bases can be lost.'),
    S(9000, pc('hr', 820, 10), 'Dubbelstrengbreuk: homologe recombinatie', 'Double-strand break: homologous recombination',
      "De 5'-uiteinden worden weggeknipt; RAD51 bedekt de 3'-staart, zoekt de zusterchromatide op en gebruikt die als matrijs. Vrijwel foutloos, maar alleen in S/G2.",
      "The 5' ends are resected; RAD51 coats the 3' tail, finds the sister chromatid and uses it as a template. Essentially error-free, but only in S/G2."),
    S(8000, pc('dis', 840), 'Als herstel faalt', 'When repair fails',
      'Defecten in herstelgenen geven mutaties en kanker: xeroderma pigmentosum (NER), het Lynch-syndroom (MMR), BRCA1/2 (HR).',
      'Defects in repair genes lead to mutations and cancer: xeroderma pigmentosum (NER), Lynch syndrome (MMR), BRCA1/2 (HR).'),
  ],
  svg() {
    // volledige titel (ingezoomd) + korte, grote titel voor het overzicht (stap 0)
    const frame = (k, nl, en, col, short) => {
      const [x, y] = PANEL[k];
      return `<g id="hf-${k}" transform="translate(${x} ${y})"><rect x="14" y="14" width="${PW - 28}" height="${PH - 28}" rx="22" fill="rgba(13,20,38,.55)" stroke="${col}" stroke-opacity=".35" stroke-width="2"/>` +
        `<g id="hft-${k}">${txt(40, 58, T2(nl, en), col, 26, 'start', 700)}</g><g id="hfs-${k}">${txt(44, 84, short, col, 48, 'start', 800)}</g></g>`;
    };
    return svgOpen() +
      frame('ber', 'BER · base-excisieherstel', 'BER · base excision repair', '#7fdc6a', 'BER') +
      frame('ner', 'NER · nucleotide-excisieherstel', 'NER · nucleotide excision repair', '#ffc247', 'NER') +
      frame('mmr', 'MMR · mismatch-herstel', 'MMR · mismatch repair', '#5fd3e6', 'MMR') +
      frame('nhej', 'NHEJ · niet-homologe eindverbinding', 'NHEJ · non-homologous end joining', '#ff8a3d', 'NHEJ') +
      frame('hr', 'HR · homologe recombinatie', 'HR · homologous recombination', '#9b7bff', 'HR') +
      frame('dis', 'Als herstel faalt', 'When repair fails', '#ff6b6b', T2('Als herstel faalt', 'When repair fails')) + `
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="hd-ber" transform="translate(0 0)"></g><g id="hd-ner" transform="translate(800 0)"></g><g id="hd-mmr" transform="translate(1600 0)"></g><g id="hd-nhej" transform="translate(0 450)"></g><g id="hd-hr" transform="translate(800 450)"></g></g>
    <g id="h-ber" transform="translate(0 0)"></g>
    <g id="h-ner" transform="translate(800 0)"></g>
    <g id="h-mmr" transform="translate(1600 0)"></g>
    <g id="h-nhej" transform="translate(0 450)"></g>
    <g id="h-hr" transform="translate(800 450)"></g>
    <g data-node="ssdna" data-nolabel data-color="${RPA}"><g id="hs-ner" transform="translate(800 0)"></g><g id="hs-hr" transform="translate(800 450)"></g></g>
    <g data-node="mutaties" data-nolabel data-color="${C.danger}" data-label="${T2('Mutaties', 'Mutations')}"><g id="h-dis" transform="translate(1600 450)"></g><circle id="h-mua" data-anchor="mutaties" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="replisoom" data-color="${C.prot}" data-label="${T2('Replisoom (proeflezen)', 'Replisome (proofreading)')}"><circle id="h-rpa" data-anchor="replisoom" cx="-99" cy="-99" r="1" fill="none"/><rect id="h-rpr" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    <g data-node="integratie" data-color="${C.tdna}" data-label="${T2('Virale integratie gebruikt herstel', 'Viral integration uses repair')}"><circle id="h-ina" data-anchor="integratie" cx="-99" cy="-99" r="1" fill="none"/><rect id="h-inr" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    <g data-node="telomeren" data-color="${C.dna2}" data-label="${T2('Telomeren: geen breuk!', 'Telomeres: not a break!')}"><circle id="h-tea" data-anchor="telomeren" cx="-99" cy="-99" r="1" fill="none"/><rect id="h-ter" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const place = (id, x, y) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); };
    const box = (id, x, y, w, h) => { const e = $(id); e.setAttribute('x', f1(x)); e.setAttribute('y', f1(y)); e.setAttribute('width', w); e.setAttribute('height', h); };
    return {
      update(t, s) {
        const { step, p } = s;
        const all = step === 0;
        // kIn: 0 = overzicht (stap 0), 1 = detail; aan het begin van stap 1 vloeit het overzicht over in het detailbeeld
        const kIn = all ? 0 : step === 1 ? ease(sub(p, 0, .2)) : 1, ovOp = 1 - kIn;
        // titels en grote overzichtslabels wisselen na elkaar (eerst uit, dan in) i.p.v. over elkaar heen
        const ovT = clamp(1 - 2 * kIn), inT = clamp(2 * kIn - 1);
        OVERVIEW = kIn < .5; LETOP = kIn;
        const E = (...a) => kIn < .01 ? '' : kIn > .99 ? endl(...a) : `<g opacity="${f1(kIn)}">${endl(...a)}</g>`;   // 5'/3'-labels niet in het overzicht
        const act = ['', 'ber', 'ber', 'ner', 'ner', 'mmr', 'nhej', 'hr', 'dis'][step];
        for (const k of Object.keys(PANEL)) {
          const o = all || k === act ? 1 : lerp(1, .18, kIn);
          $('hf-' + k).setAttribute('opacity', f1(o));
          $('hft-' + k).setAttribute('opacity', f1(inT));
          $('hfs-' + k).setAttribute('opacity', f1(ovT));
          const cg = $('h-' + k); if (cg) cg.setAttribute('opacity', f1(o));
          for (const pre of ['hd-', 'hs-']) { const e = $(pre + k); if (e) e.setAttribute('opacity', f1(o)); }
        }

        /* ================= BER ================= */
        {
          let g = '';
          const Y = 280, GAP = 70, U = 11;
          const kFlip = step === 1 ? ease(sub(p, .15, .45)) : 0;
          const kCut = step === 1 ? ease(sub(p, .5, .75)) : step > 1 ? 1 : 0;
          const kApe = step === 2 ? ease(sub(p, .05, .25)) : step > 2 ? 1 : 0;
          const kPol = step === 2 ? ease(sub(p, .3, .6)) : step > 2 ? 1 : 0;
          const kLig = step === 2 ? ease(sub(p, .65, .9)) : step > 2 ? 1 : 0;
          const fixed = kPol > .5;
          const over = { [U]: { top: fixed ? 'C' : 'U' } };
          const skipTop = new Set(kCut > .5 && !fixed ? [U] : []);
          const dna = ladder(Y, GAP, { over, skipTop, cTop: i => (i === U && kApe > .5 && kLig < .5) ? null : C.dna });
          // uitgeklapte U
          if (step <= 1) {
            const ux = xi(U), uy = Y - GAP / 2 - kFlip * 50;
            if (kCut < 1) g += `<g opacity="${f1(1 - kCut)}" transform="translate(0 ${f1(-kCut * 40)})">${seg(ux, uy, ux, uy + 30, BASE.U, 6)}${kIn < .01 ? '' : `<g opacity="${f1(kIn)}">${txt(ux, uy - 10, 'U', BASE.U, 20, 'middle', 700, 'JetBrains Mono')}</g>`}</g>`;
            if (ovOp > .01) g += `<circle cx="${ux}" cy="${Y - GAP / 2 - 18}" r="26" fill="none" stroke="${C.danger}" stroke-width="3" opacity="${f1(ovOp)}"/>`;
          }
          if (kCut > .5 && !fixed) g += `<g opacity="${f1(clamp(kCut * 2 - 1) * (1 - kPol))}">${txt(xi(U), Y - GAP / 2 - 18, 'AP', C.danger, 16, 'middle', 700)}<circle cx="${xi(U)}" cy="${Y - GAP / 2}" r="7" fill="none" stroke="${C.danger}" stroke-width="2.5"/></g>`;
          if (fixed) g += `<circle cx="${xi(U)}" cy="${Y - GAP / 2 - 16}" r="22" fill="${C.ok}" opacity="${f1(.35 * kLig * (1 - (step > 2 ? 1 : 0)))}"/>`;
          g += prot(xi(U) + 10, Y - 165, 120, 34, C.prot, T2('glycosylase (UNG)', 'glycosylase (UNG)'), 16, step === 1 ? ease(sub(p, .05, .2)) * (1 - sub(p, .85, 1)) : 0);
          g += prot(xi(U) - 60, Y - 150, 60, 30, C.prot3, 'APE1', 16, step === 2 ? kApe * (1 - sub(p, .28, .38)) : 0);
          g += prot(xi(U) + 10, Y - 150, 64, 30, C.prot2, 'Pol β', 17, step === 2 ? kPol * (1 - sub(p, .62, .72)) : 0);
          g += prot(xi(U) + 10, Y - 150, 118, 30, '#3fb58f', T2('ligase III–XRCC1', 'ligase III–XRCC1'), 15, step === 2 ? kLig * (1 - sub(p, .95, 1)) : 0);
          g += E(46, Y - GAP / 2 + 6, "5'", C.dna) + E(754, Y - GAP / 2 + 6, "3'", C.dna) + E(46, Y + GAP / 2 + 6, "3'", C.dna2) + E(754, Y + GAP / 2 + 6, "5'", C.dna2);
          g += tag(400, 405, T2('één beschadigde base', 'one damaged base'), C.text, 36, 'middle', ovT);
          if (step === 1) g += tag(400, 405, T2('C → U door deaminatie (U paart met A → mutatie!)', 'C → U by deamination (U pairs with A → mutation!)'), C.muted, 18, 'middle', sub(p, .12, .25));
          if (step === 2) g += tag(400, 405, T2('juiste C terug tegenover G', 'correct C back opposite G'), C.ok, 19, 'middle', sub(p, .6, .75));
          $('h-ber').innerHTML = g; $('hd-ber').innerHTML = dna;
        }

        /* ================= NER ================= */
        {
          let g = '';
          const Y = 270, GAP = 70, D = 11;                        // T-dimeer op posities 11-12 van de bovenste streng
          const top = SEQ.slice(0, D) + 'TT' + SEQ.slice(D + 2);
          const kRec = step === 3 ? ease(sub(p, .05, .3)) : 0;
          const kOpen = step === 3 ? ease(sub(p, .35, .65)) : step === 4 ? 1 - ease(sub(p, .4, .55)) : 0;
          const kCut = step === 4 ? ease(sub(p, .08, .22)) : 0;
          const kOut = step === 4 ? ease(sub(p, .3, .45)) : 0;
          const kFill = step === 4 ? ease(sub(p, .55, .85)) : 0;
          const e0 = D - 5, e1 = D + 6;                           // uitgeknipt stuk (ingekort getekend)
          const open = i => kOpen * 20 * clamp(1 - Math.abs(i - (D + .5)) / 7.5) ** .6;
          const removed = i => i >= e0 && i <= e1 && kOut > .5 && kFill < (i - e0 + 1) / (e1 - e0 + 2);
          const skipTop = new Set(); for (let i = e0; i <= e1; i++) if (removed(i)) skipTop.add(i);
          const bend = i => (step === 3 && kOpen < .1) || all || step < 3 ? 0 : 0;
          const dna = ladder(Y, GAP, { top, skipTop, open, bend, cTop: i => removed(i) ? null : (i >= e0 && i <= e1 && step === 4 && kFill > 0 ? NEW : C.dna) });
          // dimeer-markering (op de oorspronkelijke streng, of op het uitgeknipte stuk)
          const dimer = (x, y, op) => `<g opacity="${f1(op)}"><rect x="${x - 26}" y="${y - 30}" width="${BP + 52}" height="44" rx="10" fill="none" stroke="${C.danger}" stroke-width="3"/>${OVERVIEW ? '' : txt(x + BP / 2, y - 36, 'T^T', C.danger, 16, 'middle', 700, 'JetBrains Mono')}</g>`;
          if (kOut < .01) g += dimer(xi(D), Y - GAP / 2 - open(D) - 6, step >= 3 || all ? 1 : 1);
          else {
            const dy = -kOut * 60;
            let frag = seg(xi(e0) - 12, Y - GAP / 2 - 30 + dy, xi(e1) + 12, Y - GAP / 2 - 30 + dy, C.dna, 7);
            for (let i = e0; i <= e1; i++) frag += seg(xi(i), Y - GAP / 2 - 30 + dy, xi(i), Y - GAP / 2 - 14 + dy, BASE[top[i]], 5);
            g += `<g opacity="${f1(1 - sub(p, .5, .62))}">${frag}${dimer(xi(D), Y - GAP / 2 - 30 + dy + 8, 1)}${txt(xi(e1) + 60, Y - GAP / 2 - 26 + dy, T2('24–32 nt', '24–32 nt'), C.text, 16, 'start')}</g>`;
          }
          // incisies
          if (step === 4 && kCut > .2 && kOut < .5) g += `<g opacity="${f1(kCut)}">${txt(xi(e0) - 15, Y - GAP / 2 - 44, '✂', '#fff', 22)}${txt(xi(e1) + 15, Y - GAP / 2 - 44, '✂', '#fff', 22)}</g>`;
          g += prot(xi(D) + 15, Y + 125, 110, 30, C.prot3, 'XPC–RAD23B', 15, step === 3 ? kRec * (1 - sub(p, .6, .72)) : 0);
          g += prot(xi(D) + 190, Y - 110, 90, 30, C.prot, 'TFIIH', 17, step === 3 ? ease(sub(p, .3, .45)) : step === 4 ? 1 - sub(p, .1, .22) : 0);
          g += prot(xi(D) - 150, Y - 120, 56, 26, C.prot2, 'XPA', 15, step === 3 ? ease(sub(p, .5, .65)) : step === 4 ? 1 - sub(p, .1, .22) : 0);
          const rpa = rpaRow(xi(D) - 90, xi(D) + 120, Y + GAP / 2 + 60, step === 3 ? ease(sub(p, .72, .85)) : step === 4 ? 1 - sub(p, .4, .55) : 0, 40, 13);
          g += tag(xi(D) + 150, Y + GAP / 2 + 66, 'RPA', RPA, 16, 'start', step === 3 ? ease(sub(p, .72, .85)) : 0);
          g += prot(xi(e0) - 50, Y - 120, 92, 28, '#e0708f', 'XPF–ERCC1', 14, step === 4 ? ease(sub(p, 0, .1)) * (1 - sub(p, .25, .32)) : 0);
          g += prot(xi(e1) + 60, Y - 120, 56, 28, '#e0708f', 'XPG', 15, step === 4 ? ease(sub(p, 0, .1)) * (1 - sub(p, .25, .32)) : 0);
          g += prot(xi(e0 + kFill * (e1 - e0)), Y - 110, 76, 28, C.prot2, 'Pol δ/ε', 15, step === 4 ? ease(sub(p, .55, .6)) * (1 - sub(p, .88, .95)) : 0);
          g += clamp3(xi(e0 + kFill * (e1 - e0)) - 30, Y, 11, 50, PCNA, step === 4 ? ease(sub(p, .55, .6)) * (1 - sub(p, .88, .95)) : 0);
          g += E(46, Y - GAP / 2 + 6, "5'", C.dna) + E(754, Y - GAP / 2 + 6, "3'", C.dna) + E(46, Y + GAP / 2 + 6, "3'", C.dna2) + E(754, Y + GAP / 2 + 6, "5'", C.dna2);
          g += tag(400, 405, T2('UV-dimeer (groot letsel)', 'UV dimer (bulky lesion)'), C.text, 36, 'middle', ovT);
          $('h-ner').innerHTML = g; $('hd-ner').innerHTML = dna; $('hs-ner').innerHTML = rpa;
        }

        /* ================= MMR ================= */
        {
          let g = '';
          // nieuwe (onderste) streng loopt 3' (links) → 5' (rechts); bestaande onderbreking (NICK) ligt 3' van de fout,
          // MutLα knipt 5' van de fout (INC); EXO1 breekt 5'→3' af (naar links) tot voorbij de fout; Pol δ vult vanaf het 3'-OH rechts.
          const Y = 235, GAP = 70, M = 12, NICK = 4, INC = 17, LO = M - 2;
          const k1 = step === 5 ? ease(sub(p, .03, .18)) : 0;       // MutSα
          const k2 = step === 5 ? ease(sub(p, .18, .32)) : 0;       // MutLα + PCNA
          const kN = step === 5 ? ease(sub(p, .32, .42)) : 0;       // incisie door MutLα
          const kE = step === 5 ? sub(p, .42, .62) : 0;             // EXO1
          const kS = step === 5 ? sub(p, .64, .86) : 0;             // Pol δ
          const kL = step === 5 ? ease(sub(p, .88, .96)) : 0;       // ligase I
          const exEnd = Math.ceil(lerp(INC + 1, LO, kE));           // posities >= exEnd (en <= INC) zijn weg
          const fillEnd = Math.ceil(lerp(INC + 1, LO, kS));         // posities >= fillEnd zijn opnieuw gemaakt
          const gone = i => i >= LO && i <= INC && i >= exEnd && i < fillEnd;
          const refilled = i => i >= LO && i <= INC && i >= fillEnd;
          const over = {}; over[M] = { top: 'T', bot: refilled(M) ? 'A' : 'G' };
          const skipBot = new Set(); for (let i = LO; i <= INC; i++) if (gone(i)) skipBot.add(i);
          const dna = ladder(Y, GAP, { top: SEQ, over, skipBot, cBot: i => gone(i) || (i === INC + 1 && kN > .5 && kL < .5 && step === 5 && false) ? null : (refilled(i) ? '#8ef0ff' : NEW) });
          if (kL < .5) g += `<circle cx="${xi(NICK) + BP / 2}" cy="${Y + GAP / 2}" r="8" fill="none" stroke="#fff" stroke-width="2.5"/>`;
          if (kN > .1 && kE < .05) g += `<g opacity="${f1(kN)}">${txt(xi(INC) + BP / 2, Y + GAP / 2 + 46, '✂', '#fff', 22)}</g>`;
          if (!refilled(M)) g += `<rect x="${xi(M) - 18}" y="${Y - GAP / 2 - 34}" width="36" height="${GAP + 68}" rx="10" fill="none" stroke="${C.danger}" stroke-width="3"/>`;
          else g += `<rect x="${xi(M) - 18}" y="${Y - GAP / 2 - 34}" width="36" height="${GAP + 68}" rx="10" fill="none" stroke="${C.ok}" stroke-width="3" opacity="${f1(sub(p, .8, .9))}"/>`;
          g += prot(xi(M) + 70, Y - 125, 112, 32, C.prot, 'MutSα', 17, k1 * (1 - sub(p, .6, .7)), 'MSH2–MSH6');
          g += prot(xi(M) - 170, Y - 125, 112, 32, C.prot2, 'MutLα', 17, k2 * (1 - sub(p, .6, .7)), 'MLH1–PMS2');
          g += clamp3(xi(NICK) - 20, Y, 11, 50, PCNA, k2 * (1 - sub(p, .9, 1)));
          g += prot(xi(Math.max(exEnd, LO)), Y + 130, 60, 28, '#e0708f', 'EXO1', 15, step === 5 ? ease(sub(p, .42, .46)) * (1 - sub(p, .6, .64)) : 0);
          g += prot(xi(Math.max(fillEnd, LO)), Y + 130, 64, 28, C.prot2, 'Pol δ', 16, step === 5 ? ease(sub(p, .64, .68)) * (1 - sub(p, .86, .9)) : 0);
          g += prot(xi(LO), Y + 130, 76, 28, '#3fb58f', T2('ligase I', 'ligase I'), 15, kL * (1 - sub(p, .97, 1)));
          g += E(46, Y - GAP / 2 + 6, "5'", C.dna) + E(754, Y - GAP / 2 + 6, "3'", C.dna) + E(46, Y + GAP / 2 + 6, "3'", NEW) + E(754, Y + GAP / 2 + 6, "5'", NEW);
          g += tag(60, Y - GAP / 2 - 44, T2('oude streng (matrijs)', 'old strand (template)'), C.dna, 15, 'start', step === 5 ? 1 : 0);
          g += tag(60, Y + GAP / 2 + 60, T2('nieuwe streng (met onderbreking)', 'new strand (with a nick)'), NEW, 15, 'start', step === 5 ? 1 : 0);
          g += tag(400, 405, T2('replicatiefout (G·T)', 'replication error (G·T)'), C.text, 36, 'middle', ovT);
          if (step === 5) g += tag(400, 410, T2('MMR maakt replicatie nog >100× nauwkeuriger', 'MMR makes replication >100× more accurate'), C.muted, 17, 'middle', sub(p, .88, .96));
          $('h-mmr').innerHTML = g; $('hd-mmr').innerHTML = dna;
        }

        /* ================= NHEJ ================= */
        {
          let g = '';
          const Y = 230, GAP = 70, B = 11;                          // breuk tussen 10 en 11
          const kBreak = step === 6 ? 1 : ovOp;
          const kKu = step === 6 ? ease(sub(p, .05, .25)) : 0;
          const kPK = step === 6 ? ease(sub(p, .22, .38)) : 0;
          const kTrim = step === 6 ? ease(sub(p, .4, .55)) : 0;
          const kJoin = step === 6 ? ease(sub(p, .58, .8)) : 0;
          const lost = 2;                                            // basenparen die verloren gaan
          const gapPx = 70 * kBreak * (1 - kJoin);
          const trimL = kTrim > .5 ? 1 : 0, trimR = kTrim > .5 ? 1 : 0;
          const left = ladder(Y, GAP, { from: 1, to: B - trimL });
          const right = ladder(Y, GAP, { from: B + trimR, to: N - 1 });
          const shiftR = -((trimL + trimR) * BP) * kJoin;
          const dna = `<g transform="translate(${f1(-gapPx / 2)} 0)">${left}</g><g transform="translate(${f1(gapPx / 2 + shiftR)} 0)">${right}</g>`;
          if (kTrim > .2 && kTrim < .9) g += `<g opacity="${f1(1 - kTrim)}">${seg(xi(B - 1) - 35, Y - 50, xi(B - 1) - 35, Y + 50, C.danger, 3)}</g>`;
          const xl = xi(B - 1 - trimL) - gapPx / 2 + BP / 2, xr = xi(B + trimR) + gapPx / 2 + shiftR - BP / 2;
          g += `<g opacity="${f1(kKu * (1 - sub(p, .8, .9)))}"><ellipse cx="${f1(xl - 20)}" cy="${Y}" rx="18" ry="56" fill="none" stroke="#e0708f" stroke-width="7"/><ellipse cx="${f1(xr + 20)}" cy="${Y}" rx="18" ry="56" fill="none" stroke="#e0708f" stroke-width="7"/>${txt(xl - 20, Y + 84, 'Ku70/80', '#e0708f', 15)}${txt(xr + 20, Y + 84, 'Ku70/80', '#e0708f', 15)}</g>`;
          g += prot(xl - 110, Y - 110, 84, 28, C.prot, 'DNA-PKcs', 14, kPK * (1 - sub(p, .8, .9))) + prot(xr + 110, Y - 110, 84, 28, C.prot, 'DNA-PKcs', 14, kPK * (1 - sub(p, .8, .9)));
          g += prot((xl + xr) / 2, Y + 140, 96, 28, C.prot3, 'Artemis', 15, step === 6 ? ease(sub(p, .38, .44)) * (1 - sub(p, .55, .6)) : 0);
          g += prot((xl + xr) / 2, Y + 120, 140, 30, '#3fb58f', 'XRCC4–ligase IV', 15, step === 6 ? ease(sub(p, .58, .66)) * (1 - sub(p, .92, 1)) : 0);
          if (step === 6 && kJoin > .95) g += `<rect x="${f1(xi(B - 1) - 20)}" y="${Y - GAP / 2 - 36}" width="40" height="${GAP + 72}" rx="10" fill="none" stroke="${C.danger}" stroke-width="3"/>` + tag(xi(B - 1), Y - GAP / 2 - 48, T2(`−${lost} bp`, `−${lost} bp`), C.danger, 18);
          g += tag(400, 405, T2('dubbelstrengbreuk', 'double-strand break'), C.text, 36, 'middle', ovT);
          const lx = xi(1) - BP / 2 - gapPx / 2 - 24, rx = xi(N - 2) + BP / 2 + gapPx / 2 + shiftR + 24;
          g += E(lx, Y - GAP / 2 + 6, "5'", C.dna) + E(rx, Y - GAP / 2 + 6, "3'", C.dna) + E(lx, Y + GAP / 2 + 6, "3'", C.dna2) + E(rx, Y + GAP / 2 + 6, "5'", C.dna2);
          if (step === 6) g += tag(400, 418, T2('fout-gevoelig · in elke fase van de celcyclus', 'error-prone · in every phase of the cell cycle'), C.muted, 17, 'middle', sub(p, .82, .92));
          $('h-nhej').innerHTML = g; $('hd-nhej').innerHTML = dna;
          if (step === 6) { place('h-ina', 640, 450 + 40); box('h-inr', 560, 450 + 20, 160, 40); } else { place('h-ina', -99, -99); box('h-inr', -99, -99, 1, 1); }
          if (step === 6) { place('h-tea', 170, 450 + 40); box('h-ter', 90, 450 + 20, 160, 40); } else { place('h-tea', -99, -99); box('h-ter', -99, -99, 1, 1); }
        }

        /* ================= HR (SDSA) ================= */
        {
          let g = '', dna = '', rpa = '';
          const Y1 = 150, Y2 = 330, G = 40, x0 = 70, x1 = 730, bx = 400;
          const k = step === 7 ? p : all ? 0 : 0;
          const kRes = ease(sub(k, .05, .22)), kCoat = ease(sub(k, .22, .38)), kInv = ease(sub(k, .4, .58)), kSyn = sub(k, .58, .76), kBack = ease(sub(k, .78, .88)), kFill = ease(sub(k, .88, .97));
          const res = 110 * kRes;                                    // lengte van de weggeknipte 5'-uiteinden
          // zusterchromatide (intact, onder)
          const loopUp = 30 * kInv * (1 - kBack);
          const sisTop = [[x0, Y2 - G / 2], [bx - 90, Y2 - G / 2], [bx - 40, Y2 - G / 2 - loopUp], [bx + 150, Y2 - G / 2 - loopUp], [bx + 200, Y2 - G / 2], [x1, Y2 - G / 2]];
          dna += pth(sisTop, C.dna, 6) + seg(x0, Y2 + G / 2, x1, Y2 + G / 2, C.dna2, 6);
          for (let x = x0 + 12; x < x1; x += 22) dna += seg(x, Y2 - G / 2 + (x > bx - 60 && x < bx + 180 ? 12 * kInv * (1 - kBack) : 0), x, Y2 + G / 2, '#3b4c70', 3);
          g += tag(x1 - 10, Y2 + G / 2 + 32, T2('zusterchromatide (intact)', 'sister chromatid (intact)'), C.muted, 15, 'end', kIn);
          // gebroken chromatide (boven): links + rechts
          const gp = kBack > .5 ? 0 : 30;
          if (kBack <= .5) {
            // linkerdeel: boven (3'-uiteinde bij de breuk) blijft, onder (5') wordt ingekort
            const tail = [[x0, Y1 - G / 2], [bx - gp / 2 - res, Y1 - G / 2]];
            // 3'-staart: van bx-res tot bx; tijdens invasie naar beneden in de zuster
            const invY = lerp(Y1 - G / 2, Y2 - G / 2 + 10, kInv * (1 - kBack));
            const synLen = 150 * kSyn;
            const tx0 = bx - gp / 2 - res;
            dna += pth(tail, C.dna, 6);
            const tailPts = [[tx0, Y1 - G / 2], [tx0 + 30, lerp(Y1 - G / 2, invY, .6)], [tx0 + 60, invY], [bx - gp / 2, invY]];
            dna += pth(tailPts, C.dna, 6);
            if (synLen > 1) dna += seg(bx - gp / 2, invY, bx - gp / 2 + synLen, invY, NEW, 6);
            g += E(bx - gp / 2 + synLen + 18, invY + 6, "3'", synLen > 1 ? NEW : C.dna, 15, kRes);
            // RPA → RAD51 op de 3'-staart
            if (kRes > .5 && kBack < .5) {
              const rOp = kCoat < .5 ? 1 : 0, dOp = kCoat >= .5 ? 1 : 0;
              if (kInv < .05) {
                rpa += rpaRow(tx0, bx - gp / 2, Y1 - G / 2 - 14, rOp * sub(k, .15, .22), 36, 11);
                for (let x = tx0 + 8; x < bx - gp / 2 - 6; x += 18) g += `<rect x="${f1(x - 7)}" y="${Y1 - G / 2 - 24}" width="14" height="20" rx="4" fill="#3fd0c9" opacity="${f1(dOp)}"/>`;
              rpa += rpaRow(bx + gp / 2, bx + gp / 2 + res, Y1 + G / 2 + 14, rOp * sub(k, .15, .22), 36, 11);
              for (let x = bx + gp / 2 + 8; x < bx + gp / 2 + res - 6; x += 18) g += `<rect x="${f1(x - 7)}" y="${Y1 + G / 2 + 4}" width="14" height="20" rx="4" fill="#3fd0c9" opacity="${f1(dOp)}"/>`;
              }
            }
            dna += seg(x0, Y1 + G / 2, bx - gp / 2 - (res > 0 ? res : 0) * (1 - kFill), Y1 + G / 2, C.dna2, 6);
            if (kFill > 0) dna += seg(bx - gp / 2 - res, Y1 + G / 2, bx - gp / 2 - res + res * kFill, Y1 + G / 2, NEW, 6);
            // rechterdeel: onder (3') blijft als staart, boven (5') ingekort
            dna += seg(bx + gp / 2 + res * (1 - kFill), Y1 - G / 2, x1, Y1 - G / 2, C.dna, 6);
            dna += seg(bx + gp / 2, Y1 + G / 2, x1, Y1 + G / 2, C.dna2, 6);
            // sporten in de dubbelstrengige delen
            for (let x = x0 + 12; x < x1; x += 22) {
              const inL = x < bx - gp / 2 - res, inR = x > bx + gp / 2 + res;
              if (inL || inR) dna += seg(x, Y1 - G / 2, x, Y1 + G / 2, '#3b4c70', 3);
            }
            // teruggekeerde, verlengde staart paart met de rechter 3'-staart
          } else {
            // hersteld: synthese (boven, bx→bx+res) en opvulling (onder, bx−res→bx) zijn nieuw
            dna += seg(x0, Y1 - G / 2, bx, Y1 - G / 2, C.dna, 6) + seg(bx, Y1 - G / 2, bx + res, Y1 - G / 2, NEW, 6) + seg(bx + res, Y1 - G / 2, x1, Y1 - G / 2, C.dna, 6, kFill > .95 ? 1 : 1);
            dna += seg(x0, Y1 + G / 2, bx - res, Y1 + G / 2, C.dna2, 6) + seg(bx - res, Y1 + G / 2, bx - res + res * kFill, Y1 + G / 2, NEW, 6) + seg(bx, Y1 + G / 2, x1, Y1 + G / 2, C.dna2, 6);
            for (let x = x0 + 12; x < x1; x += 22) if (!(x > bx - res + res * kFill && x < bx)) dna += seg(x, Y1 - G / 2, x, Y1 + G / 2, '#3b4c70', 3);
            if (kFill > .95) g += tag(bx, Y1 - G / 2 - 18, T2('foutloos hersteld', 'repaired without errors'), C.ok, 17);
          }
          g += E(x0 - 26, Y1 - G / 2 + 6, "5'", C.dna, 15) + E(x1 + 26, Y1 - G / 2 + 6, "3'", C.dna, 15) + E(x0 - 26, Y1 + G / 2 + 6, "3'", C.dna2, 15) + E(x1 + 26, Y1 + G / 2 + 6, "5'", C.dna2, 15);
          // eiwitten
          g += prot(bx, Y1 + 100, 120, 28, C.prot3, 'MRN–CtIP, EXO1', 14, step === 7 ? ease(sub(k, .02, .07)) * (1 - sub(k, .2, .25)) : 0);
          g += prot(bx, Y1 + 100, 116, 28, C.prot2, T2('BRCA2 → RAD51', 'BRCA2 → RAD51'), 14, step === 7 ? ease(sub(k, .22, .28)) * (1 - sub(k, .4, .45)) : 0);
          g += prot(bx + 230, Y2 - 75, 64, 26, C.prot2, 'Pol δ', 15, step === 7 ? ease(sub(k, .58, .62)) * (1 - sub(k, .76, .8)) : 0);
          const cap = step !== 7 ? '' : k < .22 ? T2("1 · 5'-uiteinden wegknippen (resectie)", "1 · resect the 5' ends") : k < .4 ? T2("2 · RPA, dan RAD51-filament op de 3'-staart", "2 · RPA, then a RAD51 filament on the 3' tail") : k < .58 ? T2('3 · strenginvasie in de zuster (D-lus)', '3 · strand invasion into the sister (D-loop)') : k < .78 ? T2('4 · DNA-synthese met de zuster als matrijs', '4 · DNA synthesis using the sister as template') : T2('5 · terugkeren, paren, opvullen, ligeren', '5 · return, anneal, fill in, ligate');
          g += tag(400, 425, cap, C.text, 18);
          g += tag(400, 250, T2('breuk + zuster als matrijs', 'break + sister as template'), C.text, 36, 'middle', ovT);
          $('h-hr').innerHTML = g; $('hd-hr').innerHTML = dna; $('hs-hr').innerHTML = rpa;
        }

        /* ================= ziekten ================= */
        {
          let g = '';
          const rows = [['NER', T2('xeroderma pigmentosum → huidkanker', 'xeroderma pigmentosum → skin cancer'), '#ffc247'],
            ['MMR', T2('Lynch-syndroom → darmkanker', 'Lynch syndrome → colorectal cancer'), '#5fd3e6'],
            ['HR', T2('BRCA1/2 → borst- en eierstokkanker', 'BRCA1/2 → breast and ovarian cancer'), '#9b7bff'],
            ['', T2('niet hersteld → mutatie', 'not repaired → mutation'), C.danger]];
          rows.forEach(([a, b, col], i) => {
            const op = step === 8 ? lerp(.4, 1, ease(sub(p, .05 + i * .15, .2 + i * .15))) : 0;   // rijen al (vaag) zichtbaar vanaf p = 0, lichten om de beurt op
            const y = 108 + i * 58;
            g += `<g opacity="${f1(op)}">${a ? pill(96, y - 7, 96, 40, a, col, 1, 20) : txt(96, y + 2, '→', col, 30)}${txt(166, y, b, C.text, 21, 'start', 600)}</g>`;
          });
          g += tag(400, 250, T2('→ mutaties en kanker', '→ mutations and cancer'), C.text, 36, 'middle', ovT);
          $('h-dis').innerHTML = g;
          if (step === 8) place('h-mua', 1600 + 400, 450 + 330); else place('h-mua', -99, -99);
          if (step === 8) $('h-dis').insertAdjacentHTML('beforeend', `<g opacity="${f1(lerp(.4, 1, sub(p, .7, .85)))}"><rect x="250" y="330" width="300" height="46" rx="23" fill="rgba(255,107,107,.12)" stroke="${C.danger}" stroke-width="2"/>${txt(400, 360, T2("→ soorten mutaties", "→ kinds of mutations"), C.text, 20)}</g>`);
        }
        /* link naar het replisoom (proeflezen) bij MMR */
        if (step === 5) { place('h-rpa', 1600 + 640, 60); box('h-rpr', 1600 + 560, 40, 160, 40); } else { place('h-rpa', -99, -99); box('h-rpr', -99, -99, 1, 1); }
      },
    };
  },
};
