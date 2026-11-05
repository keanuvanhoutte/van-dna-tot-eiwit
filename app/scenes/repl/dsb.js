import { C, BASE, COMP, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, seg, pth, endl, prot, tag } from './_draw.js';
import { with3d } from './_mix3d.js';

/*
 * Dubbelstrengbreuk: twee routes naast elkaar op één doek (1600 × 900).
 *   boven (y ≈ 110–420): NHEJ — snel lijmen, met letters zodat het verlies zichtbaar is
 *   onder (y ≈ 470–860): HR (SDSA) — herstel met de zusterchromatide als voorbeeld
 *   rechts (stap 8): vergelijkingstabel
 * In beide panelen loopt de bovenste streng 5'→3' van links naar rechts. Fasen lopen 0 → 1 binnen hun stap en blijven daarna 1.
 */
const SEQ = 'GATCCGTACGGATCCTA', N = SEQ.length, BP = 52, X0 = 100, Y1 = 270, GAP = 84, B = 9;   // breuk tussen 8 en 9
const xi = i => X0 + BP / 2 + i * BP;
const XA = 100, XB = 984, BX = 542, Y2 = 640, Y3 = 790, G = 44, RES = 150;                        // HR-paneel
const KU = '#e0708f', LIG = '#3fb58f', RAD = '#3fd0c9', POL = C.prot2;
const camN = cam(550, 262, 1120), camH = cam(550, 650, 1120);

const scene = {
  id: 'dsb',
  title: { nl: 'Een breuk door beide strengen: snel lijmen of nauwkeurig kopiëren', en: 'A break through both strands: glue fast or copy accurately' },
  scale: '≈ 10–50 nm',
  time: { nl: 'lijmen ≈ 30 min · kopiëren ≥ 7 uur', en: 'gluing ≈ 30 min · copying ≥ 7 hours' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'DNA-streng', en: 'DNA strand' }], [C.dna2, { nl: 'complementaire streng', en: 'complementary strand' }], [NEW, { nl: 'nieuw DNA', en: 'new DNA' }], [C.danger, { nl: 'breuk / verloren letters', en: 'break / lost letters' }],
    [KU, { nl: 'ring (Ku70–Ku80)', en: 'ring (Ku70–Ku80)' }], [LIG, { nl: 'lijm (XRCC4–ligase IV)', en: 'glue (XRCC4–ligase IV)' }], [RAD, { nl: 'eiwitdraad (RAD51, geladen door BRCA2)', en: 'protein filament (RAD51, loaded by BRCA2)' }], [POL, 'polymerase']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Boven: niet-homologe eindverbinding (NHEJ). Onder: homologe recombinatie (HR), hier als SDSA. De ring Ku70–Ku80 op een DNA-uiteinde (PDB 1JEY) en de RAD51-draad op een losse streng (PDB 8BQ2) zijn als echte structuur te zien in de 3D-stappen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Top: non-homologous end joining (NHEJ). Bottom: homologous recombination (HR), shown here as SDSA. The Ku70–Ku80 ring on a DNA end (PDB 1JEY) and the RAD51 filament on a single strand (PDB 8BQ2) can be seen as real structures in the 3D steps.</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal: DNA als ladder zonder draaiing, eiwitten als ovalen en ringen. Bij NHEJ ontbreken DNA-PKcs, Artemis en XLF als aparte figuren; hoeveel letters verloren gaan, verschilt per breuk (hier 2). HR is getoond als SDSA (synthese-afhankelijke strenghybridisatie); andere HR-varianten vormen Holliday-juncties. Het teruggeknipte stuk (resectie) is in werkelijkheid veel langer, en RPA bedekt de staarten eerst; RAD51 verdringt RPA daarna. De 3D-stappen tonen PDB 1JEY (Ku70–Ku80 op een DNA-uiteinde, röntgen; Walker et al., Nature 2001) en PDB 8BQ2 (een stuk RAD51-draad op enkelstrengig DNA, cryo-EM; Appleby et al., iScience 2023, één bolletje per bouwsteen); de draad is in de cel veel langer.',
    en: 'Schematic and not to scale: DNA as a ladder without twist, proteins as ovals and rings. In NHEJ, DNA-PKcs, Artemis and XLF are not drawn separately; how many letters are lost differs per break (here 2). HR is shown as SDSA (synthesis-dependent strand annealing); other HR variants form Holliday junctions. The resected stretch is really much longer, and RPA coats the tails first; RAD51 then displaces RPA. The 3D steps show PDB 1JEY (Ku70–Ku80 on a DNA end, X-ray; Walker et al., Nature 2001) and PDB 8BQ2 (a piece of RAD51 filament on single-stranded DNA, cryo-EM; Appleby et al., iScience 2023, one bead per building block); in the cell the filament is much longer.' },
  steps: [
    { dur: 7000, cam: FULL, title: { nl: 'Een breuk door beide strengen', en: 'A break through both strands' },
      text: { nl: 'Straling of een vastgelopen kopie kan beide strengen breken. Het DNA ligt dan in twee stukken.', en: 'Radiation or a stalled copy can break both strands. The DNA then lies in two pieces.' } },
    { dur: 7000, cam: camN, title: { nl: 'Snel lijmen: ringen op de uiteinden', en: 'Glue fast: rings on the ends' },
      text: { nl: 'Een ringvormig eiwit schuift op elk uiteinde en houdt het vast. Dit kan in elke fase van de celcyclus.', en: 'A ring-shaped protein slides onto each end and holds it. This works in every phase of the cell cycle.' } },
    { dur: 7000, cam: camN, title: { nl: 'De uiteinden worden passend gemaakt', en: 'The ends are trimmed to fit' },
      text: { nl: 'Rafelige uiteinden worden bijgeknipt tot ze passen. Daarbij kunnen letters verloren gaan.', en: 'Ragged ends are trimmed until they fit. Letters can be lost in the process.' } },
    { dur: 8000, cam: camN, title: { nl: 'Weer één stuk, maar niet altijd foutloos', en: 'One piece again, but not always error-free' },
      text: { nl: 'Een lijm-eiwit zet de uiteinden weer aan elkaar, vaak binnen een halfuur. Soms ontbreken er nu letters.', en: 'A glue protein joins the ends again, often within half an hour. Sometimes letters are now missing.' } },
    { dur: 7000, cam: FULL, title: { nl: 'Na het kopiëren is er een reservekopie', en: 'After copying there is a spare copy' },
      text: { nl: 'Na het kopiëren ligt naast het gebroken DNA een identieke kopie: de zusterchromatide.', en: 'After copying, an identical copy lies next to the broken DNA: the sister chromatid.' } },
    { dur: 9000, cam: camH, title: { nl: 'Een losse staart zoekt de kopie', en: 'A loose tail searches the copy' },
      text: { nl: 'Bij elk uiteinde wordt één streng ingekort. Een eiwitdraad rond de vrije staart zoekt de passende plek op de kopie.', en: 'At each end one strand is trimmed back. A protein filament around the free tail finds the matching spot on the copy.' } },
    { dur: 8000, cam: camH, title: { nl: 'De kopie dient als voorbeeld', en: 'The copy serves as a template' },
      text: { nl: 'Een polymerase kopieert de ontbrekende letters van de zusterchromatide.', en: 'A polymerase copies the missing letters from the sister chromatid.' } },
    { dur: 9000, cam: camH, title: { nl: 'Terug op zijn plaats, nauwkeurig hersteld', en: 'Back in place, accurately repaired' },
      text: { nl: 'De verlengde streng keert terug en de laatste gaten worden gevuld. Trager, maar nauwkeurig.', en: 'The extended strand returns and the last gaps are filled. Slower, but accurate.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Twee routes vergeleken', en: 'The two routes compared' },
      text: { nl: 'Lijmen kan altijd en gaat snel. Kopiëren kan alleen na het kopiëren van het DNA, maar is veel nauwkeuriger.', en: 'Gluing is always possible and fast. Copying only works after the DNA has been copied, but is far more accurate.' } },
  ],
  svg() {
    const btn = (id, node, x, y, w, label, col, href = '') => `<g data-node="${node}" data-nolabel data-color="${col}" id="${id}"${href ? ` data-href="${href}"` : ''}><rect x="${x}" y="${y}" width="${w}" height="50" rx="25" fill="rgba(13,20,38,.8)" stroke="${col}" stroke-width="2"/>${txt(x + w / 2, y + 33, label, C.text, 21)}</g>`;
    return svgOpen() + `
    <g id="ds-nhej"><g id="ds-nt"></g><g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="ds-nd"></g></g><g id="ds-nfx"></g></g>
    <g id="ds-hr"><g id="ds-ht"></g><g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="ds-hd"></g></g><g data-node="ssdna" data-nolabel data-color="${RAD}"><g id="ds-hs"></g></g><g id="ds-hfx"></g></g>
    <g id="ds-tab"></g>
    ${btn('ds-up', 'herstel', 40, 14, 250, T2('↑ overzicht herstel', '↑ repair overview'), C.ok)}
    ${btn('ds-ner', 'ner', 304, 14, 250, T2('← grote UV-schade', '← bulky UV damage'), '#ffc247')}
    ${btn('ds-p53', 'p53', 568, 14, 250, T2('wie beslist? p53 →', 'who decides? p53 →'), C.prot)}
    ${btn('ds-ku', 'dsb', 832, 14, 230, T2('3D-ring (atlas) ↗', '3D ring (atlas) ↗'), KU, '../atlas/index.html?pdb=1JEY')}
    <g data-node="telomeren" data-color="${C.dna2}" data-label="${T2('Chromosoomuiteinden: geen breuk', 'Chromosome ends: not a break')}"><circle id="ds-tea" data-anchor="telomeren" cx="-99" cy="-99" r="1" fill="none"/><rect id="ds-ter" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        // het andere paneel dimt (NHEJ-stappen) of verdwijnt (HR-stappen: valt anders half buiten beeld); overgang in de eerste 25 % van de stap
        const k = ease(sub(p, 0, .2));
        const vN = i => i === 4 ? .3 : i >= 5 && i <= 7 ? 0 : 1, vH = i => i >= 1 && i <= 3 ? .3 : 1;   // stap 4 in volledig beeld: NHEJ gedimd, daarna weg
        const mix = f => step === 0 ? f(0) : lerp(f(step - 1), f(step), k);
        $('ds-nhej').setAttribute('opacity', f1(mix(vN)));
        $('ds-hr').setAttribute('opacity', f1(mix(vH)));

        /* ================= NHEJ ================= */
        {
          const kBreak = ph(0, .15, .5), kKu = ph(1, .1, .55), kTrim = ph(2, .15, .6), kJoin = ph(3, .1, .55), kLig = ph(3, .35, .55), kMark = ph(3, .6, .8);
          const gone = i => (i === B - 1 || i === B) && kTrim > .5;
          const gap = 90 * kBreak * (1 - kJoin);
          // na het bijknippen schuift het rechterdeel 2 posities op (2 basenparen kwijt)
          const shiftR = -2 * BP * kJoin;
          const off = i => i < B ? -gap / 2 : gap / 2 + (kTrim > .5 ? shiftR : 0);
          let d = '', fx = '';
          const piece = (a, b) => {
            const idx = []; for (let i = a; i < b; i++) if (!gone(i)) idx.push(i);
            if (!idx.length) return '';
            const xa = xi(idx[0]) + off(idx[0]) - BP / 2, xb = xi(idx[idx.length - 1]) + off(idx[idx.length - 1]) + BP / 2;
            let s = seg(xa, Y1 - GAP / 2, xb, Y1 - GAP / 2, C.dna, 8) + seg(xa, Y1 + GAP / 2, xb, Y1 + GAP / 2, C.dna2, 8);
            for (const i of idx) {
              const x = xi(i) + off(i), b = SEQ[i], m = COMP[b];
              s += seg(x, Y1 - GAP / 2, x, Y1 - 2, BASE[b], 7) + seg(x, Y1 + 2, x, Y1 + GAP / 2, BASE[m], 7);
              s += txt(x, Y1 - GAP / 2 - 16, b, BASE[b], 26, 'middle', 700, 'JetBrains Mono') + txt(x, Y1 + GAP / 2 + 38, m, BASE[m], 26, 'middle', 700, 'JetBrains Mono');
            }
            return s;
          };
          d += piece(0, B) + piece(B, N);
          // rode flits op de letters die weggeknipt worden
          if (step === 2 && kTrim < .5) for (const i of [B - 1, B]) fx += `<rect x="${f1(xi(i) + off(i) - BP / 2 + 3)}" y="${Y1 - GAP / 2 - 44}" width="${BP - 6}" height="${GAP + 92}" rx="10" fill="${C.danger}" fill-opacity="${f1(.25 * sub(p, .05, .2))}" stroke="${C.danger}" stroke-width="3" opacity="${f1(sub(p, .05, .2))}"/>`;
          // ringen
          const kuOp = kKu * (1 - ph(3, .55, .8));
          if (kuOp > .01) {
            const lEnd = xi(B - 1 - (kTrim > .5 ? 1 : 0)) + off(0) + BP / 2, rEnd = xi(B + (kTrim > .5 ? 1 : 0)) + off(B) - BP / 2;
            const lx = lEnd - 34 - 160 * (1 - kKu), rx = rEnd + 34 + 160 * (1 - kKu);
            fx += `<g opacity="${f1(kuOp)}"><ellipse cx="${f1(lx)}" cy="${Y1}" rx="20" ry="54" fill="none" stroke="${KU}" stroke-width="9"/><ellipse cx="${f1(rx)}" cy="${Y1}" rx="20" ry="54" fill="none" stroke="${KU}" stroke-width="9"/>` +
              txt(lx, Y1 + 116, T2('ring', 'ring'), KU, 24, 'middle', 700) + txt(rx, Y1 + 116, T2('ring', 'ring'), KU, 24, 'middle', 700) + `</g>`;
          }
          const xj = xi(B - 1) - gap / 2 + BP / 2 - (kTrim > .5 ? BP : 0);
          fx += prot(xj, Y1 - GAP / 2 - 72, 90, 34, LIG, T2('lijm', 'glue'), 24, kLig);
          if (kMark > .01) fx += `<g opacity="${f1(kMark)}"><line x1="${f1(xj)}" y1="${Y1 - GAP / 2 - 36}" x2="${f1(xj)}" y2="${Y1 + GAP / 2 + 46}" stroke="${C.danger}" stroke-width="4" stroke-dasharray="8 7"/>${txt(xj + 110, Y1 + GAP / 2 + 96, T2('2 letterparen kwijt', '2 letter pairs lost'), C.danger, 26, 'middle', 700)}</g>`;
          if (kBreak > .01 && kJoin < .5) fx += `<g opacity="${f1(kBreak * (1 - 2 * kJoin))}">${txt(xi(B) - BP / 2, Y1 + GAP / 2 + 124, T2('breuk', 'break'), C.danger, 26, 'middle', 700)}</g>`;
          const L5 = X0 - 26 - gap / 2, R3 = X0 + N * BP + 26 + gap / 2 + (kTrim > .5 ? shiftR : 0);
          d += endl(L5, Y1 - GAP / 2 + 8, "5'", C.dna, 22) + endl(R3, Y1 - GAP / 2 + 8, "3'", C.dna, 22) + endl(L5, Y1 + GAP / 2 + 8, "3'", C.dna2, 22) + endl(R3, Y1 + GAP / 2 + 8, "5'", C.dna2, 22);
          $('ds-nt').innerHTML = txt(X0, 112, T2('1 · Snel lijmen (NHEJ)', '1 · Glue fast (NHEJ)'), '#ff8a3d', 30, 'start', 800);
          $('ds-nd').innerHTML = d; $('ds-nfx').innerHTML = fx;
          // link naar telomeren in de lijmstap
          const te = $('ds-tea'), tr = $('ds-ter');
          if (step === 3) { te.setAttribute('cx', 830); te.setAttribute('cy', 420); tr.setAttribute('x', 740); tr.setAttribute('y', 400); tr.setAttribute('width', 180); tr.setAttribute('height', 40); }
          else { te.setAttribute('cx', -99); te.setAttribute('cy', -99); tr.setAttribute('x', -99); tr.setAttribute('y', -99); tr.setAttribute('width', 1); tr.setAttribute('height', 1); }
        }

        /* ================= HR (SDSA) ================= */
        {
          const kBreak = ph(0, .15, .5), kSis = ph(4, 0, .25), kRes = ph(5, .05, .35), kFil = ph(5, .3, .5), kInv = ph(5, .55, .92),
            kSyn = ph(6, .1, .8), kBack = ph(7, .05, .4), kFill = ph(7, .45, .85), kOk = ph(7, .85, .97);
          const gp = 30 * kBreak * (1 - kBack), res = RES * kRes;
          const yT = Y2 - G / 2, yB = Y2 + G / 2, sT = Y3 - G / 2, sB = Y3 + G / 2;
          const yInv = lerp(yT, sT + 14, kInv * (1 - kBack));
          const syn = (RES + 20) * kSyn;
          let d = '', fx = '', fil = '';
          // zusterchromatide (onder)
          if (kSis > .01) {
            const loop = 30 * kInv * (1 - kBack), l0 = BX - RES + 10, l1 = BX + RES + 40;
            let z = pth([[XA, sT], [l0 - 30, sT], [l0, sT - loop], [l1, sT - loop], [l1 + 30, sT], [XB, sT]], C.dna, 7) + seg(XA, sB, XB, sB, C.dna2, 7);
            for (let x = XA + 14; x < XB; x += 24) if (!(loop > 2 && x > l0 - 20 && x < l1 + 20)) z += seg(x, sT, x, sB, '#3b4c70', 3);
            z += txt(XA, sB + 46, T2('zusterchromatide (identieke kopie)', 'sister chromatid (identical copy)'), C.muted, 24, 'start', 600);
            d += `<g opacity="${f1(kSis)}" transform="translate(0 ${f1(40 * (1 - kSis))})">${z}</g>`;
          }
          // gebroken chromatide
          const lEnd = BX - gp / 2, rEnd = BX + gp / 2;
          // linkerstuk: bovenstreng (3'-staart bij de breuk) blijft, onderstreng (5') wordt teruggeknipt
          const tail0 = lEnd - RES * kRes;
          if (kBack < 1) {
            d += pth([[XA, yT], [tail0, yT]], C.dna, 7);
            d += pth([[tail0, yT], [tail0 + 40 * kInv * (1 - kBack), lerp(yT, yInv, .7)], [tail0 + 60 * kInv * (1 - kBack), yInv], [lEnd, yInv]], C.dna, 7);
          } else d += seg(XA, yT, BX, yT, C.dna, 7);
          if (syn > 1) d += seg(lEnd, yInv, lEnd + syn, yInv, NEW, 7);
          // onderstreng links: tot (breuk − res), daarna opgevuld (nieuw)
          d += seg(XA, yB, lEnd - res, yB, C.dna2, 7);
          if (kFill > 0) d += seg(lEnd - res, yB, lEnd - res + res * kFill, yB, NEW, 7);
          // rechterstuk: bovenstreng (5') teruggeknipt, onderstreng (3'-staart) blijft
          d += seg(Math.max(rEnd + res, kBack > 0 ? lEnd + syn - 4 : 0), yT, XB, yT, C.dna, 7);
          d += seg(rEnd, yB, XB, yB, C.dna2, 7);
          // sporten waar beide strengen er zijn
          for (let x = XA + 14; x < XB; x += 24) {
            const leftDuplex = x < lEnd - res || (kFill > 0 && x < lEnd - res + res * kFill && x < lEnd);
            const rightDuplex = x > rEnd + res || (kBack > .99 && x > rEnd && x < lEnd + syn);
            if ((x < lEnd && leftDuplex && (x < tail0 || kBack > .99)) || (x > rEnd && rightDuplex)) d += seg(x, yT, x, yB, '#3b4c70', 3);
          }
          d += endl(XA - 30, yT + 8, "5'", C.dna, 22) + endl(XB + 30, yT + 8, "3'", C.dna, 22) + endl(XA - 30, yB + 8, "3'", C.dna2, 22) + endl(XB + 30, yB + 8, "5'", C.dna2, 22);
          if (kRes > .3 && kBack < .9) fx += `<g opacity="${f1(sub(kRes, .3, .8) * (1 - kBack))}">${txt(tail0 + 70 * kInv, lerp(yT, yInv, 1) - 22, "3'", C.dna, 22, 'middle', 700, 'JetBrains Mono')}</g>`;
          // eiwitdraad op de 3'-staarten
          const filOp = kFil * (1 - ph(6, 0, .25));
          if (filOp > .01) {
            for (let x = tail0 + 70 * kInv + 10; x < lEnd - 6; x += 20) fil += `<rect x="${f1(x - 8)}" y="${f1(yInv - 26)}" width="16" height="22" rx="5" fill="${RAD}"/>`;
            for (let x = rEnd + 10; x < rEnd + RES * kRes - 6; x += 20) fil += `<rect x="${f1(x - 8)}" y="${f1(yB + 4)}" width="16" height="22" rx="5" fill="${RAD}"/>`;
            fil = `<g opacity="${f1(filOp)}">${fil}</g>` + tag(BX - 70, Y2 - 70, T2('eiwitdraad', 'protein filament'), RAD, 24, 'middle', filOp * (1 - kInv));
          }
          { const po = ph(6, 0, .1) * (1 - ph(7, 0, .2)), px = lEnd + syn;   // polymerase op het groeiende 3'-uiteinde; het woord eronder (niet over de strengen)
            fx += prot(px, yInv, 44, 30, POL, '', 16, po) + tag(Math.max(px, 700), sB + 46, 'polymerase', POL, 24, 'middle', po); }
          fx += tag(BX, Y2 + 68, T2('breuk', 'break'), C.danger, 26, 'middle', kBreak * (1 - kRes));
          if (kOk > .01) fx += `<g opacity="${f1(kOk)}"><rect x="${BX - RES - 14}" y="${yT - 26}" width="${2 * RES + 28}" height="${G + 52}" rx="14" fill="none" stroke="${C.ok}" stroke-width="4"/>${txt(BX, yT - 40, T2('✓ nauwkeurig hersteld', '✓ accurately repaired'), C.ok, 26, 'middle', 700)}</g>`;
          $('ds-ht').innerHTML = txt(X0, 506, T2('2 · Herstel met de kopie (HR)', '2 · Repair from the copy (HR)'), '#9b7bff', 30, 'start', 800);
          $('ds-hd').innerHTML = d; $('ds-hs').innerHTML = fil; $('ds-hfx').innerHTML = fx;
        }

        /* ================= vergelijking ================= */
        {
          const k = ph(8, .1, .5);
          let g = '';
          if (k > .01) {
            const x0 = 1030, w = 545, rows = [
              [T2('wanneer?', 'when?'), T2('altijd', 'always'), T2('na het kopiëren', 'after copying')],
              [T2('snelheid', 'speed'), T2('± 30 min', '± 30 min'), T2('uren', 'hours')],
              [T2('letters', 'letters'), T2('soms kwijt', 'sometimes lost'), T2('nauwkeurig', 'accurate')],
              [T2('voorbeeld', 'template'), T2('geen', 'none'), T2('zusterkopie', 'sister copy')],
            ];
            g += `<rect x="${x0}" y="170" width="${w}" height="${100 + rows.length * 88}" rx="20" fill="rgba(13,20,38,.92)" stroke="#2a3756" stroke-width="2"/>`;
            g += txt(x0 + 285, 226, T2('lijmen', 'glue'), '#ff8a3d', 26, 'middle', 800) + txt(x0 + 450, 226, T2('kopiëren', 'copy'), '#9b7bff', 26, 'middle', 800);
            rows.forEach(([a, b, c], i) => {
              const y = 300 + i * 88;
              g += `<line x1="${x0 + 20}" y1="${y - 46}" x2="${x0 + w - 20}" y2="${y - 46}" stroke="#2a3756" stroke-width="2"/>`;
              g += txt(x0 + 24, y, a, C.muted, 23, 'start', 600) + txt(x0 + 285, y, b, C.text, 23, 'middle', 700) + txt(x0 + 450, y, c, C.text, 23, 'middle', 700);
            });
            g = `<g opacity="${f1(k)}">${g}</g>`;
          }
          $('ds-tab').innerHTML = g;
        }
      },
    };
  },
};

/* 3D-stappen
 *  na stap 1: PDB 1JEY, menselijk Ku70–Ku80 op DNA (röntgen 2,5 Å; Walker et al., Nature 2001). A = Ku70 · B = Ku80 · C, D = DNA.
 *  na stap 5: PDB 8BQ2, menselijke RAD51-draad (presynaptisch, ATP + Ca²⁺) op 30 nt enkelstrengig DNA (cryo-EM 3,8 Å; Appleby et al., iScience 2023).
 *    Lokale kopie data/pdb/8BQ2.cif ingekort tot CA- en P-atomen (22 331 → 2 820 atomen). A–I = 9 × RAD51 (zwaartepunten schuiven langs z:
 *    A z ≈ 202 → I z ≈ 69 Å, dus de draadas ≈ z), W = DNA (1–30); elk RAD51 raakt telkens 3 nt (nagekeken in het mmCIF 05-11-2026). */
const KU2 = '#f2a7bf', RAD2 = '#9be8e4';
const sp = (sel, color, radius = 2.2) => ({ sel, style: { sphere: { color, radius } } });
const R9 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

export default with3d(scene, {
  models: {
    ku: { pdb: '1JEY', format: 'pdb' },
    rad: { pdb: '8BQ2', rotate: [['x', 90]] },
  },
  after: {
    1: [
      { dur: 9000, model: 'ku', spin: .01, zoom: {},
        title: { nl: 'Echt beeld: de ring om een DNA-uiteinde', en: 'Real image: the ring around a DNA end' },
        text: { nl: 'Zo ziet de ring er echt uit: het DNA-uiteinde steekt erdoor, als een draad door een kraal.', en: 'This is what the ring really looks like: the DNA end pokes through it, like a thread through a bead.' },
        show: [{ sel: { chain: 'A' }, style: { cartoon: { color: KU } } }, { sel: { chain: 'B' }, style: { cartoon: { color: KU2 } } },
          { sel: { chain: 'C' }, style: { cartoon: { color: C.dna2 }, stick: { color: C.dna2, radius: .2 } } },
          { sel: { chain: 'D' }, style: { cartoon: { color: C.dna }, stick: { color: C.dna, radius: .2 } }, label: 'DNA' },
          { sel: { chain: 'B', resi: 300 }, style: { cartoon: { color: KU2 } }, label: { nl: 'ring', en: 'ring' } }] },
    ],
    5: [
      { dur: 9000, model: 'rad', spin: .01, zoom: {},
        title: { nl: 'Echt beeld: een eiwitdraad rond de losse staart', en: 'Real image: a protein filament around the loose tail' },
        text: { nl: 'Veel dezelfde eiwitten vormen samen een spiraal, met de losse DNA-streng in het midden.', en: 'Many copies of the same protein form a spiral, with the single DNA strand in the middle.' },
        show: [...R9.map((ch, i) => sp({ chain: ch }, i % 2 ? RAD2 : RAD, 1.5)), sp({ chain: 'W' }, C.dna, 3.6),
          { ...sp({ chain: 'H' }, RAD2, 1.5), label: { nl: 'één eiwit', en: 'one protein' } },
          { ...sp({ chain: 'W', resi: 15 }, C.dna, 3.6), label: { nl: 'DNA-staart', en: 'DNA tail' } }] },
    ],
  },
});
