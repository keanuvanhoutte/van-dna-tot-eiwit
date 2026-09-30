import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { BASEDEF, place, drawBase, ELCOL } from './_b_chem.js';

/* ---- 2'-deoxyribose als vlakke vijfring (Haworth-achtig: ringzuurstof achteraan, C2'–C3' vooraan) ---- */
const RING = { "O4'": [0, 1.28], "C1'": [1.217, .396], "C2'": [.752, -1.036], "C3'": [-.752, -1.036], "C4'": [-1.217, .396] };
const pol = (r, a, o) => [o[0] + r * Math.cos(a * Math.PI / 180), o[1] + r * Math.sin(a * Math.PI / 180)];
const C5 = pol(1.52, 115, RING["C4'"]), O5 = pol(1.43, 170, C5), P1 = pol(1.6, 180, O5);
const O3 = pol(1.43, -100, RING["C3'"]), X2 = pol(1.25, -78, RING["C2'"]);
const N9DIR = 72;

/* plaats een base op C1' (β: boven het ringvlak, naar C5' toe); anti = zesring weg van de suiker */
function basePlace(kind, o, fAnti = 1) {
  const def = BASEDEF[kind];
  const c1 = [o[0] + RING["C1'"][0], o[1] + RING["C1'"][1]];
  const make = f => {
    const loc = def.A["C1'"], att = def.A[def.att];
    const aLoc = Math.atan2(loc[1] - att[1], loc[0] - att[0]) * 180 / Math.PI;
    // bij spiegeling (f = −1) verandert de lokale hoek niet: de as blijft liggen
    const rot = (N9DIR + 180) - aLoc;
    const pl0 = place(def, { rot, f });
    return place(def, { rot, f, tx: c1[0] - pl0.A["C1'"][0], ty: c1[1] - pl0.A["C1'"][1] });
  };
  // kies de oriëntatie waarin de zesring het verst van de suiker ligt → anti
  const a = make(1), b = make(-1), ring6x = pl => pl.A.C4[0] + pl.A.C5[0] + pl.A.C6[0];
  const antiF = ring6x(a) > ring6x(b) ? 1 : -1;
  return f => make(antiF * f);
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const STEPS = [
  ST(7500, cam(900, 420, 1000), 'Drie bouwstenen', 'Three building blocks', 'Een nucleotide bestaat uit een stikstofbase, een suiker met vijf koolstofatomen (pentose) en een fosfaatgroep.', 'A nucleotide consists of a nitrogenous base, a five-carbon sugar (pentose) and a phosphate group.'),
  ST(8500, cam(900, 420, 900), "De suiker: C1′ tot C5′", "The sugar: C1′ to C5′", "De koolstofatomen van de suiker krijgen een accent (1′–5′) om ze te onderscheiden van de atomen van de base. DNA: 2′-deoxyribose (H op C2′); RNA: ribose (OH op C2′).", "The sugar carbons get a prime (1′–5′) to distinguish them from the base atoms. DNA: 2′-deoxyribose (H on C2′); RNA: ribose (OH on C2′)."),
  ST(8000, cam(900, 420, 900), 'N-glycosidische binding (β)', 'N-glycosidic bond (β)', 'De base hangt aan C1′: via N9 bij purines, via N1 bij pyrimidines. In natuurlijke nucleotiden staat de base aan dezelfde kant van de ring als C5′ (β).', 'The base is attached to C1′: through N9 in purines, through N1 in pyrimidines. In natural nucleotides the base is on the same side of the ring as C5′ (β).'),
  ST(8500, cam(700, 420, 1250), 'Nucleoside → nucleotide', 'Nucleoside → nucleotide', 'Base + suiker = nucleoside (deoxyadenosine). Met fosfaat op C5′ wordt het een nucleotide: dAMP, dADP, dATP. dNTP\'s zijn de bouwstenen voor DNA-polymerase.', 'Base + sugar = nucleoside (deoxyadenosine). With phosphate on C5′ it becomes a nucleotide: dAMP, dADP, dATP. dNTPs are the building blocks for DNA polymerase.'),
  ST(8500, FULL, 'Purines en pyrimidines', 'Purines and pyrimidines', 'Purines (A, G) hebben een zes- en een vijfring; pyrimidines (C, T, U) één zesring. T = U met een methylgroep op C5 (5-methyluracil); RNA gebruikt U in plaats van T.', 'Purines (A, G) have a six- and a five-membered ring; pyrimidines (C, T, U) a single six-membered ring. T = U with a methyl group on C5 (5-methyluracil); RNA uses U instead of T.'),
  ST(8000, FULL, 'Namen: base, nucleoside, nucleotide', 'Names: base, nucleoside, nucleotide', 'Nucleoside = base + suiker; nucleotide = nucleoside + fosfaat. Adenine → (deoxy)adenosine → dAMP (dADP, dATP). Bij RNA vervalt "deoxy": adenosine, AMP, ATP.', 'Nucleoside = base + sugar; nucleotide = nucleoside + phosphate. Adenine → (deoxy)adenosine → dAMP (dADP, dATP). For RNA, "deoxy" is dropped: adenosine, AMP, ATP.'),
  ST(9000, cam(820, 450, 1150), "Fosfodiësterbinding 3′→5′", "Phosphodiester bond 3′→5′", "Het fosfaat verbindt C3′ van de ene suiker met C5′ van de volgende. Zo krijgt de streng een richting: een 5′-uiteinde (fosfaat) en een 3′-uiteinde (OH).", "The phosphate links C3′ of one sugar to C5′ of the next. This gives the strand a direction: a 5′ end (phosphate) and a 3′ end (OH)."),
  ST(9000, FULL, "Suikerpuckering: C2′-endo en C3′-endo", "Sugar pucker: C2′-endo and C3′-endo", "De vijfring is niet vlak. In B-DNA steekt C2′ uit (C2′-endo), in A-DNA en RNA C3′ (C3′-endo). Dat verandert de afstand tussen de fosfaten (≈ 7,0 vs 5,9 Å).", "The five-membered ring is not flat. In B-DNA C2′ sticks out (C2′-endo), in A-DNA and RNA C3′ does (C3′-endo). This changes the distance between phosphates (≈ 7.0 vs 5.9 Å)."),
  ST(8500, cam(900, 400, 1000), 'Glycosidische torsie χ: anti en syn', 'Glycosidic torsion χ: anti and syn', 'De base kan rond de glycosidische binding draaien. Anti (standaard in A- en B-DNA): de base wijst weg van de suiker. Syn: de base ligt boven de suiker (G in Z-DNA, Hoogsteen-paren).', 'The base can rotate around the glycosidic bond. Anti (standard in A- and B-DNA): the base points away from the sugar. Syn: the base lies over the sugar (G in Z-DNA, Hoogsteen pairs).'),
  ST(7000, FULL, 'Verder', 'Continue', 'Nucleotiden paren via hun basen en vormen samen de dubbelhelix. Klik om verder te gaan.', 'Nucleotides pair through their bases and together form the double helix. Click to continue.'),
];

export default {
  id: 'nucleotide',
  title: { nl: 'Nucleotide', en: 'Nucleotide' },
  scale: { nl: '≈ 1 nm', en: '≈ 1 nm' },
  time: { nl: 'chemische structuur', en: 'chemical structure' },
  org: { nl: 'alle organismen', en: 'all organisms' },
  legend: [['#c9a574', { nl: 'suiker (2′-deoxyribose)', en: 'sugar (2′-deoxyribose)' }], ['#ff9f43', { nl: 'fosfaat', en: 'phosphate' }], [BASE.A, 'adenine'], [BASE.G, 'guanine'], [BASE.C, 'cytosine'], [BASE.T, 'thymine / uracil'], [ELCOL.N, 'N'], [ELCOL.O, 'O']],
  simplified: {
    nl: 'De suikerring is als vlakke vijfhoek getekend (behalve in de puckering-stap); bindingshoeken zijn schematisch en H-atomen op koolstof zijn weggelaten. Fosfaatladingen gelden bij pH ≈ 7. De P–P-afstanden (≈ 7,0 Å voor C2′-endo, ≈ 5,9 Å voor C3′-endo) zijn typische waarden tussen opeenvolgende fosfaten in dezelfde streng (Saenger 1984).',
    en: 'The sugar ring is drawn as a flat pentagon (except in the pucker step); bond angles are schematic and hydrogens on carbon are omitted. Phosphate charges apply at pH ≈ 7. The P–P distances (≈ 7.0 Å for C2′-endo, ≈ 5.9 Å for C3′-endo) are typical values between successive phosphates in the same strand (Saenger 1984).' },
  steps: STEPS,
  svg() {
    const menu = (x, y, node, nl, en, col) => `<g data-node="${node}" data-nolabel><rect x="${x - 170}" y="${y - 28}" width="340" height="56" rx="28" fill="#0d1426" stroke="${col}" stroke-width="3"/><circle cx="${x - 142}" cy="${y}" r="8" fill="${col}"/><text x="${x + 10}" y="${y + 8}" font-size="22" text-anchor="middle" fill="#e8edf7" font-family="Inter" font-weight="600">${T2(nl, en)}</text></g>`;
    return svgOpen() + `<g id="nt-main"></g><g id="nt-ann"></g>
      <g id="nt-hs-bp" data-node="basenparing" data-color="${BASE.G}" data-label="${T2('Basenparing', 'Base pairing')}"><circle id="nt-a-bp" data-anchor="basenparing" cx="200" cy="790" r="30" fill="transparent"/></g>
      <g id="nt-hs-forms" data-node="dnavormen" data-color="${C.dna2}" data-label="${T2('Puckering → A-, B- en Z-DNA', 'Pucker → A-, B- and Z-DNA')}"><circle id="nt-a-forms" data-anchor="dnavormen" cx="800" cy="360" r="30" fill="transparent"/></g>
      <g id="nt-menu">
        ${menu(430, 700, 'basenparing', 'Basenparing', 'Base pairing', BASE.G)}
        ${menu(800, 700, 'dnahelix', '↑ De dubbelhelix', '↑ The double helix', C.dna)}
        ${menu(1170, 700, 'rnastructuur', 'RNA-structuur', 'RNA structure', C.rna)}
      </g></svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const dec = s => s.replace(/(\d),(\d)/g, L({ nl: '$1,$2', en: '$1.$2' }));

    /* ---- tekenhulpjes (Å → px) ---- */
    const at = (v, p) => [v.ox + p[0] * v.S, v.oy - p[1] * v.S];
    const bond = (v, a, b, w = 4, col = '#d7def0', sa = 0, sb = 0) => {
      const A = at(v, a), B = at(v, b), dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1;
      return `<line x1="${f1(A[0] + dx / l * sa)}" y1="${f1(A[1] + dy / l * sa)}" x2="${f1(B[0] - dx / l * sb)}" y2="${f1(B[1] - dy / l * sb)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    };
    const atom = (v, p, s, col, fs) => { const q = at(v, p); return `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(fs * .72)}" fill="#0b1224"/>` + txt(q[0], q[1] + fs * .36, s, col, fs, 'middle', 700); };
    const add = (a, o) => [a[0] + o[0], a[1] + o[1]];

    /* één nucleotide; o = { base, f (1 anti, −1 syn), rna, nP (0–3), op, num (C-nummers), baseOp, sugarHl, glyHl, o3 ('OH'|'bond'|none), p5 (true/false) } */
    function nucleotide(v, org, o = {}) {
      const fs = o.fs ?? v.S * .42, S = v.S, rng = {}; for (const k in RING) rng[k] = add(RING[k], org);
      let s = `<g opacity="${f1(o.op ?? 1)}">`;
      // suikerring (vulling + bindingen; voorste binding dikker)
      const poly = ["O4'", "C1'", "C2'", "C3'", "C4'"].map(k => at(v, rng[k]).map(f1).join(',')).join(' ');
      s += `<polygon points="${poly}" fill="#c9a574" fill-opacity="${f1(o.sugarHl ? .45 : .22)}" stroke="none"/>`;
      const ringB = [["O4'", "C1'"], ["C1'", "C2'"], ["C2'", "C3'"], ["C3'", "C4'"], ["C4'", "O4'"]];
      for (const [a, b] of ringB) s += bond(v, rng[a], rng[b], a === "C2'" && b === "C3'" ? S * .2 : S * .09, '#e2c9a0', a[0] === 'O' ? fs * .7 : 0, b[0] === 'O' ? fs * .7 : 0);
      s += atom(v, rng["O4'"], 'O', ELCOL.O, fs);
      const c5 = add(C5, org), o5 = add(O5, org), o3 = add(O3, org), x2 = add(X2, org);
      s += bond(v, rng["C4'"], c5, S * .09, '#e2c9a0');
      // 2'-substituent
      const rnaK = o.rna ?? 0;
      s += bond(v, rng["C2'"], x2, S * .07, '#d7def0', 0, fs * .6);
      s += `<g opacity="${f1(1 - rnaK)}">${atom(v, x2, 'H', ELCOL.H, fs * .9)}</g><g opacity="${f1(rnaK)}">${atom(v, x2, 'OH', ELCOL.O, fs * .9)}</g>`;
      // 3'
      if (o.o3 !== 'none') { s += bond(v, rng["C3'"], o3, S * .09, '#d7def0', 0, fs * .7); s += atom(v, o3, o.o3 === 'bond' ? 'O' : 'OH', ELCOL.O, fs * .95); }
      // 5'-fosfaten
      const nP = o.nP ?? 0;
      if (o.o5 !== false) { s += bond(v, c5, o5, S * .09, '#d7def0', 0, fs * .7); s += atom(v, o5, nP > 0 || o.p5 ? 'O' : 'OH', ELCOL.O, fs * .95); }
      const pOp = o.pOp ?? [1, 1, 1];
      for (let k = 0; k < nP; k++) {
        const P = add([P1[0] - k * 3.2, P1[1]], org), Ob = add([P1[0] - k * 3.2 - 1.6, P1[1]], org);
        const last = k === nP - 1;
        s += `<g opacity="${f1(pOp[k] ?? 1)}">` + bond(v, add([P1[0] - k * 3.2 + 1.6, P1[1]], org), P, S * .09, '#d7def0', fs * .7, fs * .7);
        s += bond(v, P, add(P, [0, 1.5]), S * .09, '#d7def0', fs * .7, fs * .7) + bond(v, add(P, [.12, 0]), add(P, [.12, 1.5]), S * .06, '#d7def0', fs * .7, fs * .7);
        s += bond(v, P, add(P, [0, -1.5]), S * .09, '#d7def0', fs * .7, fs * .7);
        s += bond(v, P, Ob, S * .09, '#d7def0', fs * .7, fs * .7);
        s += `<circle cx="${f1(at(v, P)[0])}" cy="${f1(at(v, P)[1])}" r="${f1(fs * 1.05)}" fill="#ff9f43" fill-opacity=".25" stroke="#ff9f43" stroke-width="2"/>` + atom(v, P, 'P', '#ffb46b', fs);
        s += atom(v, add(P, [0, 1.5]), 'O', ELCOL.O, fs * .95) + atom(v, add(P, [0, -1.5]), 'O⁻', ELCOL.O, fs * .95);
        s += atom(v, Ob, last ? (o.pEnd ?? 'O⁻') : 'O', ELCOL.O, fs * .95);
        s += '</g>';
      }
      // koolstofnummers
      if (o.num) {
        const lab = [["C1'", [.55, -.1]], ["C2'", [.45, -.35]], ["C3'", [-.62, -.3]], ["C4'", [-.55, -.2]]];
        for (const [k, d] of lab) { const q = at(v, add(rng[k], d)); s += txt(q[0], q[1] + 7, k.slice(1).replace("'", '′'), '#ffd98a', fs * .9 * o.num + .01, 'middle', 800); }
        const q = at(v, add(c5, [.5, .15])); s += txt(q[0], q[1] + 7, '5′', '#ffd98a', fs * .9 * o.num + .01, 'middle', 800);
      }
      s += '</g>';
      // base
      if (o.base) {
        const pb = basePlace(o.base, org)(o.f ?? 1);
        s += `<g opacity="${f1(o.baseOp ?? 1)}">` + drawBase(pb, v, { col: BASE[o.base], names: o.names ?? new Set(), sugar: false, fs }) + '</g>';
        const c1 = at(v, rng["C1'"]), n = at(v, pb.A[BASEDEF[o.base].att]);
        s += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(n[0])}" y2="${f1(n[1])}" stroke="${o.glyHl ? '#fff' : '#d7def0'}" stroke-width="${f1(o.glyHl ? S * .16 : S * .09)}" stroke-linecap="round" opacity="${f1(o.baseOp ?? 1)}"/>`;
        if (o.glyHl) s += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(n[0])}" y2="${f1(n[1])}" stroke="#ffc247" stroke-width="${f1(S * .45)}" stroke-opacity="${f1(.35 * o.glyHl)}" stroke-linecap="round"/>`;
        return { svg: s, pb, rng, o3, o5, c5 };
      }
      return { svg: s, rng, o3, o5, c5 };
    }

    return {
      update(t, s) {
        const { step, p } = s;
        let m = '', ann = '';
        const V0 = { S: 46, ox: 880, oy: 500 };
        if (step === 0) {
          // drie losse blokken die samenkomen
          const k = ease(sub(p, .45, .85));
          const vb = { ...V0 };
          const sep = 1 - k;
          const nt = nucleotide(vb, [0, 0], { base: null, nP: 0, o5: true, p5: true });
          // suiker
          m += nt.svg;
          // base los, schuift naar C1'
          const pb = basePlace('A', [0, 0])(1);
          const off = [3.2 * sep, 2.4 * sep];
          const shifted = { def: pb.def, A: Object.fromEntries(Object.entries(pb.A).map(([kk, q]) => [kk, [q[0] + off[0], q[1] + off[1]]])), H: pb.H.map(([kk, q]) => [kk, [q[0] + off[0], q[1] + off[1]]]) };
          m += drawBase(shifted, vb, { col: BASE.A, sugar: false });
          const c1 = at(vb, RING["C1'"]), n9 = at(vb, shifted.A.N9);
          m += `<line x1="${f1(c1[0])}" y1="${f1(c1[1])}" x2="${f1(n9[0])}" y2="${f1(n9[1])}" stroke="#d7def0" stroke-width="4" opacity="${f1(k)}"/>`;
          // fosfaat los, schuift naar O5'
          const P = at({ ...vb, ox: vb.ox - 150 * sep, oy: vb.oy - 60 * sep }, P1);
          m += phosphate(P, vb.S, k);
          ann += `<g opacity="${f1(ease(sub(p, .05, .25)))}">` + txt(1250, 250, T2('base (adenine)', 'base (adenine)'), BASE.A, 30) + txt(760, 640, T2("suiker (2′-deoxyribose)", "sugar (2′-deoxyribose)"), '#e2c9a0', 30, 'end') + txt(560, 330, T2('fosfaat', 'phosphate'), '#ff9f43', 30) + '</g>';
          ann += `<g opacity="${f1(ease(sub(p, .8, .95)))}">${txt(900, 168, T2('= deoxyadenosinemonofosfaat (dAMP)', '= deoxyadenosine monophosphate (dAMP)'), '#fff', 26)}</g>`;
        } else if (step === 1) {
          const rk = ease(sub(p, .55, .65)) * (1 - ease(sub(p, .88, .97)));
          const nt = nucleotide(V0, [0, 0], { base: 'A', nP: 1, num: ease(sub(p, .05, .3)), rna: rk, baseOp: .35, sugarHl: 1 });
          m += nt.svg;
          const x2 = at(V0, X2);
          ann += `<g opacity="${f1(ease(sub(p, .35, .5)))}"><rect x="460" y="200" width="330" height="92" rx="12" fill="#0d1426" stroke="${rk > .5 ? C.rna : C.dna}" stroke-width="2"/>
            ${txt(625, 232, rk > .5 ? T2('RNA: ribose (2′-OH)', 'RNA: ribose (2′-OH)') : T2('DNA: 2′-deoxyribose (2′-H)', 'DNA: 2′-deoxyribose (2′-H)'), rk > .5 ? C.rna : C.dna, 22)}
            ${txt(625, 268, rk > .5 ? T2('2′-OH maakt RNA reactiever', '2′-OH makes RNA more reactive') : T2('"deoxy" = zonder zuurstof op C2′', '"deoxy" = without oxygen on C2′'), C.muted, 18)}</g>`;
        } else if (step === 2) {
          const nt = nucleotide(V0, [0, 0], { base: 'A', nP: 1, num: 1, glyHl: ease(sub(p, .1, .3)), names: new Set(['N9']), baseOp: 1 });
          m += nt.svg;
          const c1 = at(V0, RING["C1'"]);
          ann += `<g opacity="${f1(ease(sub(p, .15, .35)))}"><rect x="990" y="548" width="355" height="96" rx="12" fill="#0d1426" opacity=".9"/>${txt(1005, 580, T2('C1′–N9: N-glycosidische binding', 'C1′–N9: N-glycosidic bond'), '#ffc247', 20, 'start')}</g>`;
          // β: vlak van de ring + pijl omhoog aan de kant van C5'
          const k2 = ease(sub(p, .45, .7));
          const y = at(V0, [0, .1])[1];
          ann += `<g opacity="${f1(k2)}"><path d="M${f1(at(V0, [-2.6, 0])[0])},${f1(y)} H${f1(at(V0, [2.8, 0])[0])}" stroke="#fff" stroke-width="2" stroke-dasharray="8 6"/>
            ${txt(at(V0, [2.9, 0])[0], y + 6, T2('vlak van de ring', 'plane of the ring'), C.muted, 18, 'start')}
            ${txt(1005, 620, T2('β: base aan de kant van C5′', 'β: base on the side of C5′'), '#fff', 20, 'start')}</g>`;
        } else if (step === 3) {
          const k1 = ease(sub(p, .2, .35)), k2 = ease(sub(p, .45, .6)), k3 = ease(sub(p, .65, .8));
          const nP = k3 > 0 ? 3 : k2 > 0 ? 2 : k1 > 0 ? 1 : 0;
          const v = { S: 40, ox: 1000, oy: 460 };
          const nt = nucleotide(v, [0, 0], { base: 'A', nP, pOp: [k1, k2, k3], o5: true });
          m += nt.svg;
          const names = [T2('deoxyadenosine (nucleoside)', 'deoxyadenosine (nucleoside)'), 'dAMP', 'dADP', 'dATP'];
          ann += txt(1000, 640, names[nP], '#fff', 34) + (nP === 0 ? txt(1000, 680, T2('base + suiker, geen fosfaat', 'base + sugar, no phosphate'), C.muted, 24) : txt(1000, 680, T2(['', 'monofosfaat', 'difosfaat', 'trifosfaat'][nP], ['', 'monophosphate', 'diphosphate', 'triphosphate'][nP]), C.muted, 24));
          ['α', 'β', 'γ'].forEach((g, k) => { if (k < nP) { const q = at(v, [P1[0] - k * 3.2, P1[1] + 2.4]); ann += txt(q[0], q[1], g, '#ffb46b', 28, 'middle', 800); } });
        } else if (step === 4) {
          const list = [['A', 'adenine', 1], ['G', 'guanine', 1], ['C', 'cytosine', 0], ['T', 'thymine', 0], ['U', 'uracil', 0]];
          list.forEach(([b, nm, pur], i) => {
            const k = Math.max(.25, ease(sub(p, .05 + i * .08, .25 + i * .08)));   // vaag zichtbaar vanaf het begin
            const x = 200 + i * 300, v = { S: 40, ox: x - (pur ? -.8 : 0) * 40, oy: 430 };
            const pl = place(BASEDEF[b], { rot: pur ? 0 : 0 });
            m += `<g opacity="${f1(k)}">${drawBase(pl, v, { col: BASE[b], sugar: false, fs: 21 })}</g>`;
            m += `<g opacity="${f1(k)}">${txt(x, 610, nm, BASE[b], 30)}${txt(x, 652, b === 'U' ? T2('(RNA)', '(RNA)') : b === 'T' ? T2('(DNA)', '(DNA)') : T2('(DNA, RNA)', '(DNA, RNA)'), C.muted, 24)}</g>`;
          });
          const k2 = ease(sub(p, .5, .7));
          ann += `<g opacity="${f1(k2)}"><path d="M70,230 H640" stroke="${BASE.G}" stroke-width="3"/>${txt(355, 215, T2('purines: zes- + vijfring', 'purines: six- + five-membered ring'), BASE.G, 26)}
            <path d="M720,230 H1540" stroke="${BASE.C}" stroke-width="3"/>${txt(1130, 215, T2('pyrimidines: één zesring', 'pyrimidines: one six-membered ring'), BASE.C, 26)}</g>`;
        } else if (step === 5) {
          const rows = [
            ['adenine', 'A', T2('(deoxy)adenosine', '(deoxy)adenosine'), 'dAMP', 'AMP'],
            ['guanine', 'G', T2('(deoxy)guanosine', '(deoxy)guanosine'), 'dGMP', 'GMP'],
            ['cytosine', 'C', T2('(deoxy)cytidine', '(deoxy)cytidine'), 'dCMP', 'CMP'],
            ['thymine', 'T', T2('(deoxy)thymidine', '(deoxy)thymidine'), 'dTMP', '—'],
            ['uracil', 'U', 'uridine', '—', 'UMP'],
          ];
          const xs = [200, 560, 1000, 1260];
          ann += `<g font-family="Inter">${txt(xs[0], 200, 'base', C.muted, 28, 'start')}${txt(xs[1], 200, 'nucleoside', C.muted, 28, 'start')}${txt(xs[2], 200, 'DNA', C.dna, 28, 'start', 700)}${txt(xs[3], 200, 'RNA', C.rna, 28, 'start', 700)}</g>
            <path d="M180,225 H1440" stroke="${C.muted}" stroke-width="2"/>`;
          rows.forEach((r, i) => {
            const k = Math.max(.25, ease(sub(p, .05 + i * .1, .25 + i * .1))), y = 290 + i * 84;
            ann += `<g opacity="${f1(k)}">${txt(xs[0], y, r[0], BASE[r[1]], 32, 'start', 700)}${txt(xs[1], y, r[2], '#fff', 30, 'start', 600)}${txt(xs[2], y, r[3], C.dna2, 30, 'start', 700, 'JetBrains Mono')}${txt(xs[3], y, r[4], '#ffc89e', 30, 'start', 700, 'JetBrains Mono')}</g>`;
          });
        } else if (step === 6) {
          const v = { S: 34, ox: 700, oy: 360 }, org2 = [3.87, -6.1];
          const k = ease(sub(p, .15, .45));
          const n1 = nucleotide(v, [0, 0], { base: 'C', nP: 1, o3: 'bond', pEnd: 'O⁻', fs: 16 });
          const n2 = nucleotide(v, org2, { base: 'G', nP: 0, p5: true, o3: 'OH', fs: 16, o5: false });
          m += n1.svg + `<g opacity="${f1(k)}">${n2.svg}</g>`;
          // fosfaatbrug: O3'(1) – P – O5'(2)
          const Pb = [O3[0], O3[1] - 1.62], o5b = add(O5, org2), c5b = add(C5, org2);
          m += `<g opacity="${f1(k)}">${bond(v, O3, Pb, 4, '#d7def0', 10, 12)}${bond(v, Pb, o5b, 4, '#d7def0', 12, 10)}${bond(v, c5b, o5b, 4, '#d7def0', 0, 10)}
            ${bond(v, Pb, add(Pb, [-1.5, 0]), 4, '#d7def0', 12, 10)}${bond(v, Pb, add(Pb, [-1.5, .12]), 3, '#d7def0', 12, 10)}${bond(v, Pb, add(Pb, [-.2, -1.5]), 4, '#d7def0', 12, 10)}
            <circle cx="${f1(at(v, Pb)[0])}" cy="${f1(at(v, Pb)[1])}" r="18" fill="#ff9f43" fill-opacity=".3" stroke="#ff9f43" stroke-width="3"/>
            ${atom(v, Pb, 'P', '#ffb46b', 16)}${atom(v, add(Pb, [-1.5, 0]), 'O', ELCOL.O, 15)}${atom(v, add(Pb, [-.2, -1.5]), 'O⁻', ELCOL.O, 15)}${atom(v, o5b, 'O', ELCOL.O, 15)}</g>`;
          const kh = ease(sub(p, .45, .65));
          ann += `<g opacity="${f1(kh)}"><rect x="${f1(at(v, Pb)[0] - 380)}" y="${f1(at(v, Pb)[1] - 36)}" width="340" height="70" rx="12" fill="#0d1426" stroke="#ff9f43"/>${txt(at(v, Pb)[0] - 210, at(v, Pb)[1] - 6, T2('fosfodiësterbinding', 'phosphodiester bond'), '#ff9f43', 24)}${txt(at(v, Pb)[0] - 210, at(v, Pb)[1] + 24, "C3′–O–P–O–C5′", C.text, 20, 'middle', 700, 'JetBrains Mono')}</g>`;
          const k3 = ease(sub(p, .65, .85));
          const top = at(v, add(P1, [0, 0])), bot = at(v, add(O3, org2));
          ann += `<g opacity="${f1(k3)}">${txt(top[0], top[1] - 80, T2("5′-uiteinde (fosfaat)", "5′ end (phosphate)"), C.dna, 26)}${txt(bot[0] + 100, bot[1] + 8, T2("3′-uiteinde (OH)", "3′ end (OH)"), C.dna, 26, 'start')}
            <path d="M1170,220 V640" stroke="${C.dna}" stroke-width="5" marker-end="url(#arrow)"/>${txt(1190, 420, "5′ → 3′", C.dna, 30, 'start', 800, 'JetBrains Mono')}
            ${txt(1190, 460, T2('schrijfwijze', 'notation'), C.muted, 20, 'start')}${txt(1190, 490, 'pCpG-OH', C.text, 22, 'start', 700, 'JetBrains Mono')}</g>`;
        } else if (step === 7) {
          m += pucker(420, 420, 'C2', ease(sub(p, .05, .3))) + pucker(1180, 420, 'C3', ease(sub(p, .25, .5)));
          ann += txt(420, 215, "C2′-endo (South)", '#fff', 32) + txt(420, 252, T2('B-DNA', 'B-DNA'), C.dna, 26);
          ann += txt(1180, 215, "C3′-endo (North)", '#fff', 32) + txt(1180, 252, T2('A-DNA, RNA', 'A-DNA, RNA'), C.rna, 26);
          const k = ease(sub(p, .55, .75));
          ann += `<g opacity="${f1(k)}">${ppbar(420, 650, 7.0)}${ppbar(1180, 650, 5.9)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .1, .3)))}">${txt(800, 145, T2('endo = aan de kant van C5′', 'endo = on the side of C5′'), C.muted, 26)}</g>`;
        } else if (step === 8) {
          // anti ↔ syn
          const ph = p < .45 ? 0 : p < .7 ? ease(sub(p, .45, .7)) : 1;
          const f = Math.cos(Math.PI * ph);
          const nt = nucleotide({ S: 40, ox: 700, oy: 520 }, [0, 0], { base: 'G', f, nP: 0, names: new Set(['N9']) });
          m += nt.svg;
          const anti = ph < .5;
          ann += txt(1030, 300, anti ? 'anti' : 'syn', anti ? '#7fdc6a' : BASE.T, 48, 'start', 800);
          ann += txt(1030, 345, anti ? T2('zesring weg van de suiker', 'six-membered ring away from the sugar') : T2('zesring boven de suiker', 'six-membered ring over the sugar'), '#fff', 22, 'start');
          ann += txt(1030, 377, anti ? T2('standaard in A- en B-DNA', 'standard in A- and B-DNA') : T2('G in Z-DNA, Hoogsteen-paren', 'G in Z-DNA, Hoogsteen pairs'), C.muted, 20, 'start');
          ann += `<g opacity="${f1(ease(sub(p, .15, .35)))}">${txt(1030, 470, T2("χ = torsie O4′–C1′–N9–C4 (purine)", "χ = torsion O4′–C1′–N9–C4 (purine)"), '#fff', 20, 'start')}${txt(1030, 500, T2("of O4′–C1′–N1–C2 (pyrimidine)", "or O4′–C1′–N1–C2 (pyrimidine)"), C.muted, 19, 'start')}</g>`;
        } else if (step === 9) {
          const nt = nucleotide({ S: 50, ox: 830, oy: 430 }, [0, 0], { base: 'A', nP: 1, num: 1 });
          m += nt.svg;
        }
        $('nt-main').innerHTML = m; $('nt-ann').innerHTML = ann;
        vis('nt-hs-bp', step === 4 ? sub(p, .8, .9) : 0);
        vis('nt-hs-forms', step === 7 ? sub(p, .8, .9) : 0);
        vis('nt-menu', step === 9 ? ease(sub(p, .15, .35)) : 0);

        function phosphate(P, S, k) {
          const fs = S * .42, o = (dx, dy) => [P[0] + dx * S, P[1] - dy * S];
          const l = (a, b) => `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#d7def0" stroke-width="4"/>`;
          const A = (q, s2, col) => `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(fs * .72)}" fill="#0b1224"/>` + txt(q[0], q[1] + fs * .36, s2, col, fs, 'middle', 700);
          return l(P, o(0, 1.5)) + l(P, o(0, -1.5)) + l(P, o(-1.6, 0)) + l(P, o(1.6 * k, 0)) +
            `<circle cx="${f1(P[0])}" cy="${f1(P[1])}" r="${f1(fs * 1.05)}" fill="#ff9f43" fill-opacity=".25" stroke="#ff9f43" stroke-width="2"/>` + A(P, 'P', '#ffb46b') + A(o(0, 1.5), 'O', ELCOL.O) + A(o(0, -1.5), 'O⁻', ELCOL.O) + A(o(-1.6, 0), 'O⁻', ELCOL.O);
        }
        function pucker(cx, cy, which, k) {
          // zijaanzicht: C4'–O4'–C1' (+ één van C2'/C3') in het vlak; het andere atoom steekt uit naar de kant van C5' (boven)
          const S2 = 100, y = cy + 60;
          const P = { "C4'": [-1.9, 0], "O4'": [-.7, .35], "C1'": [1.2, .1], "C3'": [-1.0, -.7], "C2'": [.6, -.75] };
          const up = which === 'C2' ? "C2'" : "C3'";
          const Q = { ...P }; Q[up] = [P[up][0], P[up][1] + 1.35 * k];
          const pt = a => [cx + Q[a][0] * S2, y - Q[a][1] * S2];
          const l = (a, b, w = 5) => `<line x1="${f1(pt(a)[0])}" y1="${f1(pt(a)[1])}" x2="${f1(pt(b)[0])}" y2="${f1(pt(b)[1])}" stroke="#e2c9a0" stroke-width="${w}" stroke-linecap="round"/>`;
          let s2 = `<polygon points="${["C4'", "O4'", "C1'", "C2'", "C3'"].map(a => pt(a).map(f1).join(',')).join(' ')}" fill="#c9a574" fill-opacity=".2"/>`;
          s2 += l("C4'", "O4'") + l("O4'", "C1'") + l("C1'", "C2'", 7) + l("C2'", "C3'", 9) + l("C3'", "C4'", 7);
          // C5' en base omhoog
          const c5 = [pt("C4'")[0] - 25, pt("C4'")[1] - 120], bs = [pt("C1'")[0] + 25, pt("C1'")[1] - 120];
          s2 += `<line x1="${f1(pt("C4'")[0])}" y1="${f1(pt("C4'")[1])}" x2="${f1(c5[0])}" y2="${f1(c5[1])}" stroke="#d7def0" stroke-width="4"/>` + txt(c5[0] - 8, c5[1] - 10, 'C5′', '#ffd98a', 22);
          s2 += `<line x1="${f1(pt("C1'")[0])}" y1="${f1(pt("C1'")[1])}" x2="${f1(bs[0])}" y2="${f1(bs[1])}" stroke="#d7def0" stroke-width="4"/>` + `<rect x="${f1(bs[0] - 44)}" y="${f1(bs[1] - 42)}" width="88" height="38" rx="8" fill="${BASE.A}" opacity=".85"/>` + txt(bs[0], bs[1] - 15, 'base', '#0a1224', 22);
          // vlak
          s2 += `<path d="M${cx - 260},${f1(y - .1 * S2)} H${cx + 230}" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 6" opacity=".5"/>`;
          for (const a of Object.keys(Q)) { const q = pt(a); const isUp = a === up; s2 += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${isUp ? 24 : 19}" fill="${a[0] === 'O' ? '#3a1d24' : '#2a2416'}" stroke="${isUp ? '#fff' : a[0] === 'O' ? ELCOL.O : '#e2c9a0'}" stroke-width="${isUp ? 3 : 2}"/>` + txt(q[0], q[1] + 6, a.replace("'", '′'), a[0] === 'O' ? ELCOL.O : '#ffd98a', isUp ? 18 : 16, 'middle', 800); }
          return s2;
        }
        function ppbar(cx, y, d) {
          const w = d * 38;
          return `<circle cx="${f1(cx - w / 2)}" cy="${y}" r="18" fill="#ff9f43"/><circle cx="${f1(cx + w / 2)}" cy="${y}" r="18" fill="#ff9f43"/>` + txt(cx - w / 2, y + 6, 'P', '#0b1224', 17) + txt(cx + w / 2, y + 6, 'P', '#0b1224', 17) +
            `<path d="M${f1(cx - w / 2 + 22)},${y} H${f1(cx + w / 2 - 22)}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>` + txt(cx, y + 50, dec(`P–P ≈ ${String(d).replace('.', ',')} Å`), '#fff', 26);
        }
      },
    };
  },
};
