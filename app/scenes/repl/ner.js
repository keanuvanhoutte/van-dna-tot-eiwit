import { C, BASE, COMP, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, RPA, seg, pth, endl, prot, tag, rpaRow } from './_draw.js';

/*
 * NER (nucleotide-excisieherstel) van een UV-thyminedimeer, op één groot doek (1600 × 900).
 * Bovenste streng 5'→3' van links naar rechts; het dimeer zit op posities D, D+1 van de bovenste streng.
 * Elke fase loopt van 0 → 1 binnen haar eigen stap en blijft daarna 1, zodat het eindbeeld van stap i = beginbeeld van stap i+1.
 */
const SEQ = 'GACTCGATCCGTTACGGATCCTAG';           // posities 11 en 12 = TT
const N = SEQ.length, BP = 54, X0 = (1600 - N * BP) / 2, Y = 470, GAP = 100, D = 11;
const E0 = D - 6, E1 = D + 7;                       // uitgeknipt stuk (ingekort getekend: 14 i.p.v. 24–32 nt)
const xi = i => X0 + BP / 2 + i * BP;
const bell = (i, c, w) => clamp(1 - Math.abs(i - c) / w) ** .7;
const SPOT = '#5fd3e6', OPEN = C.prot, CUT = '#e0708f', POL = C.prot2, LIG = '#3fb58f';

export default {
  id: 'ner',
  title: { nl: 'Grote UV-schade: een stuk streng wordt vervangen', en: 'Bulky UV damage: a piece of strand is replaced' },
  scale: '≈ 10 nm',
  time: { nl: 'één letsel, stap voor stap (vertraagd)', en: 'one lesion, step by step (slowed down)' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'streng met de schade', en: 'strand with the damage' }], [C.dna2, { nl: 'andere streng (voorbeeld)', en: 'other strand (template)' }], [NEW, { nl: 'nieuw DNA', en: 'new DNA' }],
    [C.danger, { nl: 'UV-schade (TT-dimeer)', en: 'UV damage (TT dimer)' }], [SPOT, { nl: 'herkenner (XPC–RAD23B)', en: 'spotter (XPC–RAD23B)' }], [OPEN, { nl: 'opener (TFIIH)', en: 'opener (TFIIH)' }],
    [RPA, { nl: 'beschermers (RPA)', en: 'protectors (RPA)' }], [CUT, { nl: 'scharen (ERCC1–XPF, XPG)', en: 'scissors (ERCC1–XPF, XPG)' }], [POL, { nl: 'polymerase (Pol δ/ε/κ)', en: 'polymerase (Pol δ/ε/κ)' }], [LIG, 'ligase']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Nucleotide-excisieherstel (NER) knipt een stuk enkelstrengig DNA met een groot letsel weg en maakt het opnieuw. In genen die net afgeschreven worden, merkt het RNA-polymerase de schade op (TC-NER); elders doet een herkenningseiwit dat (GG-NER, hier getoond).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Nucleotide excision repair (NER) cuts out a piece of single-stranded DNA carrying a bulky lesion and makes it again. In genes being transcribed, RNA polymerase notices the damage (TC-NER); elsewhere a recognition protein does so (GG-NER, shown here).</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal: DNA als ladder zonder draaiing, eiwitten als ovalen. Het uitgeknipte stuk is in werkelijkheid 24–32 nucleotiden en is hier ingekort tot 14 getekend. Getoond is de globale route (GG-NER); bij TC-NER herkent een vastgelopen RNA-polymerase II het letsel. Echte NER-complexen bestaan uit meer eiwitten (o.a. XPA, dat hier niet apart getekend is).',
    en: 'Schematic and not to scale: DNA as a ladder without twist, proteins as ovals. The excised piece is really 24–32 nucleotides and is drawn shortened to 14 here. Shown is the global route (GG-NER); in TC-NER a stalled RNA polymerase II detects the lesion. Real NER complexes contain more proteins (e.g. XPA, not drawn separately here).' },
  steps: [
    { dur: 7000, cam: FULL, title: { nl: 'UV-licht koppelt twee letters aan elkaar', en: 'UV light links two letters together' },
      text: { nl: 'UV-licht kan twee T’s naast elkaar aan elkaar vastmaken. Daardoor krijgt het DNA een bult.', en: 'UV light can fasten two neighbouring Ts to each other. This gives the DNA a bump.' } },
    { dur: 7000, cam: FULL, title: { nl: 'Een herkenner voelt de bult', en: 'A spotter feels the bump' },
      text: { nl: 'Een herkenningseiwit merkt dat het DNA vervormd is. Het roept een ploeg helpers op.', en: 'A recognition protein notices that the DNA is bent out of shape. It calls in a team of helpers.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Het DNA gaat open rond de schade', en: 'The DNA opens around the damage' },
      text: { nl: 'Een opener duwt de twee strengen uit elkaar. Beschermers bedekken de gave streng.', en: 'An opener pushes the two strands apart. Protectors cover the intact strand.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Knippen aan beide kanten', en: 'Cutting on both sides' },
      text: { nl: 'Twee scharen knippen links en rechts van de schade in dezelfde streng.', en: 'Two pairs of scissors cut the same strand to the left and right of the damage.' } },
    { dur: 7000, cam: FULL, title: { nl: 'Het stuk met de schade gaat eruit', en: 'The piece with the damage comes out' },
      text: { nl: 'Een stukje van ongeveer 30 letters komt vrij, met de gekoppelde T’s erin. Er blijft een gat in één streng.', en: 'A piece of about 30 letters is released, with the linked Ts in it. A gap is left in one strand.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Het gat wordt opnieuw gevuld', en: 'The gap is filled in again' },
      text: { nl: 'Een polymerase vult het gat, met de andere streng als voorbeeld. Een ligase plakt het laatste stukje vast.', en: 'A polymerase fills the gap, using the other strand as a guide. A ligase seals the last bit.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Hersteld: dezelfde letters, zonder bult', en: 'Repaired: the same letters, no bump' },
      text: { nl: 'Het DNA is weer recht en heeft dezelfde letters. Werkt dit herstel niet, dan geeft zonlicht veel vaker huidkanker.', en: 'The DNA is straight again and has the same letters. If this repair fails, sunlight causes skin cancer far more often.' } },
  ],
  svg() {
    const btn = (id, node, x, w, label, col) => `<g data-node="${node}" data-nolabel data-color="${col}" id="${id}"><rect x="${x}" y="40" width="${w}" height="54" rx="27" fill="rgba(13,20,38,.75)" stroke="${col}" stroke-width="2"/>${txt(x + w / 2, 75, label, C.text, 22)}</g>`;
    return svgOpen() + `
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="nr-dna"></g></g>
    <g data-node="ssdna" data-color="${RPA}" data-label="${T2('Losse streng, beschermd', 'Single strand, protected')}"><g id="nr-rpa"></g><circle id="nr-rpaa" data-anchor="ssdna" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g id="nr-fx"></g>
    ${btn('nr-up', 'herstel', 40, 330, T2('↑ overzicht herstel', '↑ repair overview'), C.ok)}
    ${btn('nr-ber', 'ber', 400, 330, T2('← één letter (BER)', '← one letter (BER)'), '#7fdc6a')}
    ${btn('nr-dsb', 'dsb', 1180, 380, T2('breuk in het DNA →', 'break in the DNA →'), '#ff8a3d')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kUV = ph(0, .15, .55), kSpot = ph(1, .1, .45), kOpen = ph(2, .1, .5), kRpa = ph(2, .5, .8), kCut = ph(3, .15, .55),
          kOut = ph(4, .1, .6), kFill = ph(5, .12, .75), kLig = ph(5, .78, .92), kDone = ph(6, .15, .5);
        const bump = 26 * kUV * (1 - kOut);
        const opn = 30 * kOpen * (1 - ph(5, .7, .95));
        const removed = i => i >= E0 && i <= E1 && kOut > .02 && (i - E0 + .5) / (E1 - E0 + 1) >= kFill;
        const refilled = i => i >= E0 && i <= E1 && kFill > 0 && !removed(i);
        const upTop = i => bump * bell(i, D + .5, 4) + opn * bell(i, D + .5, 8.5);
        const downBot = i => -bump * bell(i, D + .5, 4) * .6 + opn * bell(i, D + .5, 8.5);
        let dna = '', fx = '', rp = '';
        // ruggengraten + basen
        const top = [], bot = [];
        let seg0 = [];
        const flush = (arr, col) => { if (arr.length > 1) top.push(pth(arr, col, 8)); };
        let curCol = null;
        for (let i = 0; i < N; i++) {
          const x = xi(i), yt = Y - GAP / 2 - upTop(i), yb = Y + GAP / 2 + downBot(i);
          const col = removed(i) ? null : refilled(i) ? NEW : C.dna;
          if (col !== curCol) { if (seg0.length) { if (col) seg0.push([x - BP / 2, yt]); flush(seg0, curCol); } seg0 = col ? [[x - BP / 2, yt]] : []; curCol = col; }
          if (col) seg0.push([x, yt]);
          if (i === N - 1 && col) seg0.push([x + BP / 2, yt]);
          bot.push([x, yb]); if (i === 0) bot.unshift([x - BP / 2, yb]); if (i === N - 1) bot.push([x + BP / 2, yb]);
          const b = SEQ[i], m = COMP[b], sep = opn * bell(i, D + .5, 8.5) > 8;
          if (!removed(i)) {
            dna += seg(x, yt, x, sep ? yt + 22 : (yt + yb) / 2 - 2, BASE[b], 7);
            dna += txt(x, yt - 16, b, BASE[b], 26, 'middle', 700, 'JetBrains Mono');
          }
          dna += seg(x, sep ? yb - 22 : (yt + yb) / 2 + 2, x, yb, BASE[m], 7);
          dna += txt(x, yb + 38, m, BASE[m], 26, 'middle', 700, 'JetBrains Mono');
        }
        flush(seg0, curCol);
        dna = pth(bot, C.dna2, 8) + top.join('') + dna;
        dna += endl(X0 - 28, Y - GAP / 2 + 7, "5'", C.dna, 24) + endl(X0 + N * BP + 28, Y - GAP / 2 + 7, "3'", C.dna, 24) + endl(X0 - 28, Y + GAP / 2 + 7, "3'", C.dna2, 24) + endl(X0 + N * BP + 28, Y + GAP / 2 + 7, "5'", C.dna2, 24);
        // het dimeer: rode kader + koppelstreep (op de streng, of mee met het uitgeknipte stuk)
        const xd = (xi(D) + xi(D + 1)) / 2, yd = Y - GAP / 2 - upTop(D);
        if (kOut < .02) {
          fx += `<g opacity="${f1(.25 + .75 * kUV)}"><rect x="${f1(xi(D) - 24)}" y="${f1(yd - 46)}" width="${BP + 48}" height="${70}" rx="14" fill="none" stroke="${C.danger}" stroke-width="4"/>` +
            seg(xi(D) + 6, yd + 14, xi(D + 1) - 6, yd + 14, C.danger, 6, kUV) + `</g>`;
          fx += tag(xd, yd - 62, T2('UV-schade', 'UV damage'), C.danger, 24, 'middle', kUV * (1 - kOpen));
        }
        // uitgeknipt stuk dat wegzweeft
        if (kOut > .02) {
          const dy = -lerp(0, 190, kOut), op = 1 - ph(5, 0, .3);
          if (op > .01) {
            let fr = pth([[xi(E0) - BP / 2, Y - GAP / 2 - 36 + dy], [xi(E1) + BP / 2, Y - GAP / 2 - 36 + dy]], C.dna, 8);
            for (let i = E0; i <= E1; i++) fr += seg(xi(i), Y - GAP / 2 - 36 + dy, xi(i), Y - GAP / 2 - 8 + dy, BASE[SEQ[i]], 7) + txt(xi(i), Y - GAP / 2 - 52 + dy, SEQ[i], BASE[SEQ[i]], 24, 'middle', 700, 'JetBrains Mono');
            fr += `<rect x="${f1(xi(D) - 22)}" y="${f1(Y - GAP / 2 - 80 + dy)}" width="${BP + 44}" height="80" rx="14" fill="none" stroke="${C.danger}" stroke-width="4"/>`;
            fx += `<g opacity="${f1(op)}">${fr}${txt(xi(E1) + 60, Y - GAP / 2 - 28 + dy, T2('± 30 letters', '± 30 letters'), C.text, 24, 'start', 700)}${txt(xi(E1) + 60, Y - GAP / 2 + 2 + dy, T2('(hier ingekort)', '(drawn shorter)'), C.muted, 22, 'start', 500)}</g>`;
          }
        }
        // eiwitten (enkel het label in de figuur; namen staan in de legende / uitleg)
        const spotOp = kSpot * (1 - ph(2, .5, .8));
        fx += prot(xd, Y + GAP / 2 + 120 + 60 * (1 - kSpot), 120, 40, SPOT, T2('herkenner', 'spotter'), 24, spotOp);
        fx += prot(xd, Y - GAP / 2 - 150, 120, 40, OPEN, T2('opener', 'opener'), 24, kOpen * (1 - ph(3, .55, .85)));
        const cutOp = kCut * (1 - ph(4, 0, .35));
        fx += prot(xi(E0) - 6, Y - GAP / 2 - 140, 100, 38, CUT, T2('schaar', 'scissors'), 22, cutOp) + prot(xi(E1) + 6, Y - GAP / 2 - 140, 100, 38, CUT, T2('schaar', 'scissors'), 22, cutOp);
        if (cutOp > .01) fx += `<g opacity="${f1(cutOp)}">${txt(xi(E0) - BP / 2, Y - GAP / 2 - 70, '✂', '#fff', 34)}${txt(xi(E1) + BP / 2, Y - GAP / 2 - 70, '✂', '#fff', 34)}</g>`;
        const px = lerp(xi(E0), xi(E1), kFill);
        fx += prot(px, Y - GAP / 2 - 120, 120, 38, POL, 'polymerase', 22, ph(5, 0, .12) * (1 - ph(5, .75, .85)));
        fx += prot(xi(E1) + BP / 2, Y - GAP / 2 - 120, 90, 36, LIG, 'ligase', 22, kLig * (1 - ph(6, 0, .3)));
        // beschermers op de onderste streng
        const rpaOp = kRpa * (1 - ph(5, .7, .95));
        rp = rpaRow(xi(E0) - BP / 2, xi(E1) + BP / 2, Y + GAP / 2 + downBot(D) + 70, rpaOp, 76, 20);
        fx += tag(xi(E1) + BP / 2 + 30, Y + GAP / 2 + 78, T2('beschermers', 'protectors'), RPA, 22, 'start', rpaOp);
        // eindbeeld: hersteld
        if (kDone > .01) fx += `<g opacity="${f1(kDone)}"><rect x="${f1(xi(E0) - BP / 2 - 8)}" y="${Y - GAP / 2 - 52}" width="${f1((E1 - E0 + 1) * BP + 16)}" height="${GAP + 112}" rx="18" fill="none" stroke="${C.ok}" stroke-width="4"/>${txt(800, Y + GAP / 2 + 120, T2('✓ hersteld: zelfde letters, geen bult', '✓ repaired: same letters, no bump'), C.ok, 30, 'middle', 700)}</g>`;
        $('nr-dna').innerHTML = dna; $('nr-fx').innerHTML = fx; $('nr-rpa').innerHTML = rp;
        const a = $('nr-rpaa');
        if (rpaOp > .5) { a.setAttribute('cx', f1(xi(D))); a.setAttribute('cy', f1(Y + GAP / 2 + downBot(D) + 96)); } else { a.setAttribute('cx', -99); a.setAttribute('cy', -99); }
      },
    };
  },
};
