import { C, BASE, COMP, L, T2, svgOpen, txt, pill, nt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, PRIMER, seg, pth, endl, prot, tag, arrow } from './_draw.js';

/*
 * Telomeer van een menselijk chromosoom (uiteinde rechts).
 * G-rijke streng (boven) loopt 5'→3' naar het uiteinde en steekt uit als 3'-overhang.
 * Telomerase-RNA (hTR) matrijs: 3'-CAAUCCCAAUC-5' (11 nt); de 5 nt aan het 3'-uiteinde paren met ...GTTAG-3'.
 */
const NT = 26, X0 = 100, YT = 380, YB = 424, BH = 24;       // x van nt 0, y van de blokjes boven/onder
const TOP = 'TTAGGG'.repeat(6) + 'TTAG';                      // 40 nt; laatste 5 = GTTAG
const ND = 24;                                                // aantal nt dat dubbelstrengig is (4 herhalingen)
const ADD = 'GGTTAG';
const TEMPL = 'CAAUCCCAAUC';                                  // van 3' naar 5' (links → rechts)
const xOf = i => X0 + i * NT;

/* nt-blokje waarvan de letter kan uitfaden (lo = opaciteit van de letter) */
const ntL = (x, y, b, w, h, lo) => lo >= .99 ? nt(x, y, b, w, h) :
  `<rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${h}" rx="4" fill="${BASE[b]}"/>` + (lo > .01 ? `<g opacity="${f1(lo)}">${txt(x, y + h * .7, b, '#0a1224', Math.round(h * .6), 'middle', 700, 'JetBrains Mono')}</g>` : '');
const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });
const DNAC = { A: 'T', T: 'A', G: 'C', C: 'G' }, RNAC = { A: 'U', T: 'A', G: 'C', C: 'G' };

export default {
  id: 'telomeren',
  title: { nl: 'Telomeren & telomerase', en: 'Telomeres & telomerase' },
  scale: '≈ 10–30 nm',
  time: { nl: 'verkorting per celdeling; telomerase: seconden–minuten', en: 'shortening per cell division; telomerase: seconds–minutes' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'G-rijke streng (TTAGGG)', en: 'G-rich strand (TTAGGG)' }], [C.dna2, { nl: 'C-rijke streng', en: 'C-rich strand' }], [NEW, { nl: 'nieuw DNA', en: 'new DNA' }],
    [PRIMER, { nl: 'RNA (primer / telomerase-RNA)', en: 'RNA (primer / telomerase RNA)' }], [C.prot, { nl: 'TERT & shelterin', en: 'TERT & shelterin' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De matrijs in het telomerase-RNA is 11 nt lang: 5 nt om het DNA-uiteinde vast te houden en 6 nt die als GGTTAG worden overgeschreven. Zo ontstaat telkens een nieuwe TTAGGG-herhaling.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The template in telomerase RNA is 11 nt long: 5 nt to hold the DNA end and 6 nt that are copied as GGTTAG. Each round therefore adds a new TTAGGG repeat.</p>' },
  simplified: {
    nl: 'Menselijke telomeren zijn duizenden basenparen lang en de 3\'-overhang telt tientallen tot honderden nucleotiden; hier zijn maar enkele herhalingen getekend. Het eindreplicatieprobleem is vereenvoudigd tot het wegvallen van de laatste primer; ook nucleasen die het uiteinde bijwerken dragen bij. Telomerase (echte structuur: PDB 7BG9) en shelterin zijn schematisch; hTR (451 nt) heeft nog vele andere domeinen en er horen o.a. dyskerine en TCAB1 bij. Of G-quadruplexen (gestapelde G-kwartetten, gestabiliseerd door K⁺) in cellen aan telomeren een rol spelen, wordt nog onderzocht. De T-lus is ingekort getekend (echt: kilobasen).',
    en: 'Human telomeres are thousands of base pairs long and the 3\' overhang has tens to hundreds of nucleotides; only a few repeats are drawn here. The end-replication problem is simplified to the loss of the last primer; nucleases processing the end also contribute. Telomerase (real structure: PDB 7BG9) and shelterin are schematic; hTR (451 nt) has many other domains and dyskerin and TCAB1, among others, belong to the holoenzyme. Whether G-quadruplexes (stacked G-quartets stabilised by K⁺) play a role at telomeres in cells is still being investigated. The t-loop is drawn shortened (really: kilobases).' },
  steps: [
    S(8000, cam(620, 400, 1250), 'Het uiteinde van een chromosoom', 'The end of a chromosome',
      'Chromosomen eindigen in telomeren: vele herhalingen van TTAGGG. Eén streng steekt aan het eind een stukje uit.',
      'Chromosomes end in telomeres: many repeats of TTAGGG. One strand sticks out a little at the very end.'),
    S(9000, cam(720, 660, 1200), 'Het laatste stukje lukt niet', 'The very last bit fails',
      'Het laatste startstukje van RNA valt weg. Dat gat kan niet opgevuld worden: er is geen startpunt meer.',
      'The last RNA starter piece is removed. That gap cannot be filled: there is no starting point left.'),
    S(8000, cam(720, 700, 1200), 'Elke deling een beetje korter', 'A little shorter every division',
      'In de meeste cellen worden telomeren zo bij elke deling korter. Zijn ze te kort, dan stopt de cel met delen.',
      'In most cells telomeres thus get shorter with every division. When they are too short, the cell stops dividing.'),
    S(8000, cam(1125, 440, 830), 'Telomerase grijpt het uiteinde', 'Telomerase grabs the end',
      'Het enzym telomerase draagt een eigen stukje RNA mee. Een deel van dat RNA past op het uitstekende DNA-uiteinde.',
      'The enzyme telomerase carries its own piece of RNA. Part of that RNA pairs with the protruding DNA end.'),
    S(9000, cam(1170, 440, 820), 'Telomerase verlengt het DNA', 'Telomerase lengthens the DNA',
      'Telomerase gebruikt zijn RNA als mal en hangt er één voor één G, G, T, T, A, G aan het DNA.',
      'Telomerase uses its RNA as a template and adds G, G, T, T, A, G to the DNA one by one.'),
    S(8000, cam(1260, 440, 820), 'Opschuiven en opnieuw', 'Shift and repeat',
      'Daarna schuift telomerase op naar het nieuwe uiteinde. Zo kan het vele herhalingen na elkaar toevoegen.',
      'Then telomerase shifts along to the new end. This way it can add many repeats in a row.'),
    S(8000, cam(1030, 440, 1060), 'De andere streng wordt aangevuld', 'The other strand is filled in',
      'Andere eiwitten vullen de tweede streng aan, met een nieuw startstukje. Het uiteinde blijft iets uitsteken.',
      'Other proteins fill in the second strand, using a new starter piece. The end still sticks out a little.'),
    S(8000, cam(810, 420, 1440), 'Een eiwitkap beschermt het uiteinde', 'A protein cap protects the end',
      'Een groep van zes eiwitten (shelterin) bedekt het telomeer. Zo ziet de cel het uiteinde niet als een DNA-breuk.',
      'A group of six proteins (shelterin) covers the telomere. So the cell does not mistake the end for a DNA break.'),
    S(8000, cam(760, 440, 1300), 'Het uiteinde verstopt zich', 'The end hides away',
      'Het uitstekende staartje kan terugvouwen in het telomeer-DNA. In die lus (T-lus) zit het einde verstopt.',
      'The protruding tail can fold back into the telomere DNA. In this loop (t-loop) the end is hidden.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="rt" data-nolabel data-color="${C.prot}"><g id="tl-tert"></g></g>
    <g id="tl-main"></g>
    <g id="tl-er"></g>
    <g id="tl-tlp"></g>
    <g data-node="rt" data-color="${PRIMER}" data-label="${T2('Reverse transcriptase (vgl. HIV)', 'Reverse transcriptase (cf. HIV)')}"><g id="tl-rt"></g><circle id="tl-rta" data-anchor="rt" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="noncanon" data-color="${C.dna}" data-label="${T2('G-quadruplex', 'G-quadruplex')}"><g id="tl-g4"></g><circle id="tl-g4a" data-anchor="noncanon" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="herstel" data-color="${C.ok}" data-label="${T2('DNA-breuken → herstel (NHEJ)', 'DNA breaks → repair (NHEJ)')}"><g id="tl-hr"></g><circle id="tl-hra" data-anchor="herstel" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="chromosoom" data-color="${C.dna}" data-label="${T2('↑ Chromosoom', '↑ Chromosome')}">
      <g id="tl-chr"></g>
    </g>
    <g data-node="replicatie" data-color="${C.dna}" data-label="${T2('↑ Replicatie', '↑ Replication')}"><g id="tl-rep"></g><circle id="tl-repa" data-anchor="replicatie" cx="-99" cy="-99" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const place = (id, x, y) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); };
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- hoofdtekening: lettermodel van het uiteinde (stappen 0, 3–7) ---------- */
        const showMain = step === 0 || (step >= 3 && step <= 7) || (step === 8 && p < .25);
        const mainOp = step === 8 ? 1 - sub(p, 0, .25) : step === 0 ? 1 : 1;
        let m = '', tertS = '';
        const lo = step === 7 ? 1 - sub(p, 0, .2) : step === 8 ? 0 : 1;   // letters weg in het brede shelterinbeeld
        if (showMain) {
          // hoeveel nt zijn er toegevoegd?
          const add1 = step < 4 ? 0 : step === 4 ? Math.floor(sub(p, .1, .85) * 6.999) : 6;
          const add2 = step < 5 ? 0 : step === 5 ? Math.floor(sub(p, .55, .95) * 6.999) : 6;
          const top = TOP + ADD.slice(0, add1) + (add1 === 6 ? ADD.slice(0, add2) : '');
          const nT = top.length;
          // C-streng: vast tot ND; in stap 6 aangevuld (primer + DNA) tot ND+16
          const fill = step < 6 ? 0 : step === 6 ? sub(p, .15, .8) : 1;
          const bEnd = ND + Math.round(16 * fill);
          const primOn = step >= 6;
          // ruggengraten
          m += seg(X0 - 20, YT - 8, xOf(nT - 1) + 12, YT - 8, C.dna, 6) + seg(X0 - 20, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, C.dna2, 6);
          if (bEnd > ND) m += seg(xOf(ND) - 12, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, NEW, 6) + seg(xOf(Math.max(ND, bEnd - 4)) - 12, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, PRIMER, 6, primOn ? 1 : 0);
          for (let i = 0; i < nT; i++) {
            const x = xOf(i), b = top[i];
            const isNew = i >= TOP.length;
            m += ntL(x, YT, b, 22, BH, lo);
            if (isNew) m += `<rect x="${x - 12}" y="${YT - 2}" width="24" height="${BH + 4}" rx="5" fill="none" stroke="${NEW}" stroke-width="2.5"/>`;
            if (i < bEnd) {
              const c = i >= bEnd - 4 && i >= ND ? RNAC[b] : DNAC[b];
              m += seg(x, YT + BH + 1, x, YB - 1, '#5b6a8c', 2) + ntL(x, YB, c, 22, BH, lo);
            }
          }
          m += endl(X0 - 44, YT + 17, "5'", C.dna) + endl(xOf(nT - 1) + 32, YT + 17, "3'", C.dna);
          m += endl(X0 - 44, YB + 17, "3'", C.dna2) + endl(xOf(bEnd - 1) + 32, YB + 17, "5'", bEnd > ND ? PRIMER : C.dna2, 17);
          // herhalingen onderstrepen in stap 0
          if (step === 0) {
            for (let r = 0; r < 6; r++) m += `<g opacity="${f1(ease(sub(p, .1 + r * .06, .2 + r * .06)))}">` + seg(xOf(r * 6) - 11, YT - 22, xOf(r * 6 + 5) + 11, YT - 22, '#ffc247', 3) + txt((xOf(r * 6) + xOf(r * 6 + 5)) / 2, YT - 30, 'TTAGGG', '#ffc247', 18, 'middle', 700, 'JetBrains Mono') + '</g>';
            m += tag(xOf(ND) + 180, YB + 90, T2("3'-overhang (enkelstrengig)", "3' overhang (single-stranded)"), C.dna, 18, 'middle', sub(p, .5, .7));
            m += tag(xOf(10), YB + 90, T2('dubbelstrengig telomeer-DNA', 'double-stranded telomeric DNA'), C.text, 18, 'middle', sub(p, .4, .6));
            m += arrow(1330, YT + 12, 1440, YT + 12, C.muted, 3, sub(p, .6, .8)) + tag(1385, YT - 8, T2('uiteinde', 'end'), C.muted, 19, 'middle', sub(p, .6, .8));
          }
          // telomerase (stappen 3–5)
          // in stap 6 laat telomerase zichtbaar los (vervaagt en zakt weg) i.p.v. in één keer te verdwijnen
          if ((step >= 3 && step <= 5) || (step === 6 && p < .22)) {
            const kIn = step === 3 ? ease(sub(p, .05, .4)) : step === 6 ? 1 - ease(sub(p, .04, .22)) : 1;
            const shift = step === 5 ? ease(sub(p, .1, .45)) * 6 : step === 6 ? 6 : 0;
            const jStart = TOP.length - 5 + shift;                    // DNA-index onder matrijspositie 0 (3'-uiteinde)
            const yR = YB + (1 - kIn) * 90;
            // TERT-lichaam (achter de letters: wordt vooraan in m gezet)
            const cx = xOf(jStart + 5), cy = (YT + YB + BH) / 2 + 40 + (1 - kIn) * 90;
            const tert = `<g opacity="${f1(kIn)}"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="250" ry="140" fill="${C.prot}" fill-opacity=".14" stroke="${C.prot}" stroke-width="3"/>` +
              txt(cx + 200, cy + 60, 'TERT', '#fff', 22, 'middle', 700) + '</g>';
            tertS = tert;
            // hTR: matrijs + (gestippeld) de rest van het 451-nt RNA
            let r = '';
            for (let j = 0; j < 11; j++) r += nt(xOf(jStart + j), yR, TEMPL[j], 22, BH);
            r += seg(xOf(jStart) - 12, yR + BH + 8, xOf(jStart + 10) + 12, yR + BH + 8, PRIMER, 6);
            const xl = xOf(jStart) - 12, xr = xOf(jStart + 10) + 12, yb = yR + BH + 8;
            r += `<path d="M${f1(xl)},${f1(yb)} C${f1(xl - 90)},${f1(yb + 20)} ${f1(xl - 70)},${f1(yb + 110)} ${f1(xl + 60)},${f1(yb + 105)} S${f1(xr + 60)},${f1(yb + 120)} ${f1(xr)},${f1(yb)}" stroke="${PRIMER}" stroke-width="5" fill="none" stroke-dasharray="4 7"/>`;
            r += endl(xOf(jStart) - 32, yR + 17, "3'", PRIMER, 16) + endl(xOf(jStart + 10) + 32, yR + 17, "5'", PRIMER, 16);
            r += txt(xl + 70, yb + 80, T2('hTR (451 nt)', 'hTR (451 nt)'), PRIMER, 18, 'middle', 700);
            m += `<g opacity="${f1(kIn)}">${r}</g>`;
            // paringsstreepjes
            const nTop = top.length;
            for (let j = 0; j < 11; j++) { const i = Math.round(jStart) + j; if (i < nTop && kIn > .95 && Math.abs(shift - Math.round(shift)) < .01) m += seg(xOf(i), YT + BH + 1, xOf(i), YB - 1, '#c9b8ff', 2); }
            if (step === 3) m += tag(xOf(TOP.length - 3), YT - 90, T2('5 nt paren: …GTTAG-3\'', '5 nt pair: …GTTAG-3\''), C.text, 17, 'middle', sub(p, .45, .65));
            if (step === 4) m += tag(xOf(TOP.length + 3), YT - 90, T2('+ GGTTAG (DNA van een RNA-matrijs)', '+ GGTTAG (DNA from an RNA template)'), NEW, 17, 'middle', sub(p, .1, .25));
            if (step === 5) m += arrow(xOf(TOP.length) - 40, YT - 90, xOf(TOP.length) + 120, YT - 90, C.text, 4, sub(p, .05, .2)) + tag(xOf(TOP.length) + 40, YT - 76 - 30, T2('translocatie: 6 nt', 'translocation: 6 nt'), C.text, 17, 'middle', sub(p, .05, .2));
            if (step <= 5) place('tl-rta', cx + 200, cy + 72); else place('tl-rta', -99, -99);
          } else place('tl-rta', -99, -99);
          // CST / Pol α-primase (stap 6)
          if (step === 6) {
            const k = ease(sub(p, 0, .2)) * (1 - sub(p, .85, 1));
            const x = xOf(bEnd - 1) + 40;
            m += prot(x + 40, YB + 100, 110, 38, C.prot3, 'CST · Pol α-primase', 16, k);
            m += tag(xOf(ND + 8), YT - 40, T2("3'-overhang blijft over", "3' overhang remains"), C.dna, 17, 'middle', sub(p, .8, .95));
          }
          // shelterin (stap 7)
          if (step === 7) {
            const k = i => ease(sub(p, .05 + i * .1, .2 + i * .1));
            m += prot(xOf(4), YT - 62, 84, 32, C.prot, 'TRF1', 21, k(0)) + prot(xOf(4), YB + BH + 62, 84, 32, C.prot, 'TRF1', 21, k(0));
            m += prot(xOf(15), YT - 62, 84, 32, C.prot2, 'TRF2', 21, k(1)) + prot(xOf(15), YB + BH + 62, 84, 32, C.prot2, 'TRF2', 21, k(1));
            m += prot(xOf(15) + 150, YB + BH + 122, 74, 30, C.prot3, 'RAP1', 20, k(2));
            m += prot(xOf(9) + 10, YT - 136, 74, 30, C.prot3, 'TIN2', 20, k(3));
            m += prot(xOf(ND + 20), YB + 12, 76, 30, '#b07cf0', 'POT1', 21, k(4)) + prot(xOf(ND + 20), YB + 80, 74, 30, C.prot3, 'TPP1', 20, k(4));
            m += tag(760, 190, T2('shelterin (6 eiwitten)', 'shelterin (6 proteins)'), C.text, 28, 'middle', sub(p, .55, .7));
          }
        } else place('tl-rta', -99, -99);
        $('tl-tert').innerHTML = tertS ? `<g opacity="${f1(mainOp)}">${tertS}</g>` : '';
        $('tl-main').innerHTML = `<g opacity="${f1(mainOp)}">${m}</g>`;
        $('tl-rt').innerHTML = step >= 3 && step <= 5 ? `<rect x="${f1(+$('tl-rta').getAttribute('cx') - 60)}" y="${f1(+$('tl-rta').getAttribute('cy') - 20)}" width="120" height="40" fill="transparent"/>` : '';

        /* ---------- stap 1–2: eindreplicatieprobleem en verkorting ---------- */
        let e = '';
        if (step === 1) {
          const Y = 610, xa = 180, xe = 1250;
          e += seg(xa, Y, xe, Y, C.dna, 7) + endl(xa - 30, Y + 6, "5'", C.dna) + endl(xe + 30, Y + 6, "3'", C.dna);
          e += tag(xe, Y - 30, T2('uiteinde chromosoom →', 'chromosome end →'), C.muted, 17, 'end');
          e += tag(xa + 10, Y - 30, T2('matrijs: G-rijke streng', 'template: G-rich strand'), C.dna, 17, 'start');
          const Yn = Y + 34;
          const frags = [[xa, 540], [540, 900], [900, xe]];         // elk fragment: 3' links, 5' (primer) rechts
          const kRem = step === 1 ? ease(sub(p, .3, .6)) : 1;
          frags.forEach(([a, b], i) => {
            const last = i === frags.length - 1;
            const prim = 50;
            // DNA-deel
            e += seg(a + 4, Yn, b - prim, Yn, NEW, 7);
            // primer: intern vervangen door DNA (van het fragment rechts ervan... nee: verlenging van het fragment links)
            if (!last) {
              e += seg(b - prim, Yn, b - 4, Yn, PRIMER, 7, 1 - kRem) + seg(b - prim, Yn, b + 4, Yn, NEW, 7, kRem);
            } else {
              e += seg(b - prim, Yn, b - 4, Yn, PRIMER, 7, 1 - kRem);
              if (kRem > .5) e += `<rect x="${b - prim}" y="${Yn - 12}" width="${prim + 4}" height="24" rx="6" fill="none" stroke="${C.danger}" stroke-width="3" stroke-dasharray="6 4"/>`;
            }
          });
          e += endl(xa - 30, Yn + 6, "3'", NEW) + endl(xe - 70, Yn + 40, "5'", NEW, 16, kRem);
          e += tag(xe, Yn + 70, T2('gat: niet op te vullen', 'gap: cannot be filled'), C.danger, 18, 'end', step === 1 ? sub(p, .55, .7) : 1);
          e += tag(640, Yn + 70, T2("interne gaten: opgevuld vanaf een 3'-OH", "internal gaps: filled from a 3'-OH"), C.muted, 17, 'middle', step === 1 ? sub(p, .35, .5) : 0);
        }
        if (step === 2 || (step === 3 && p < .06)) {   // in stap 3 vervaagt de grafiek i.p.v. meteen te verdwijnen
          const pp = step === 2 ? p : 1, fade = step === 3 ? 1 - sub(p, 0, .06) : 1;
          let e2 = '';
          {
            const lens = [820, 740, 660, 580, 440];
            lens.forEach((w, i) => {
              const k = i === 0 ? 1 : lerp(.3, 1, ease(sub(pp, .05 + i * .12, .2 + i * .12)));   // alle balken staan er (vaag) vanaf p = 0
              const y = 600 + i * 50;
              e2 += `<g opacity="${f1(k)}">` + txt(250, y + 7, T2(`deling ${i + 1}`, `division ${i + 1}`), C.muted, 18, 'end') + `<rect x="270" y="${y - 10}" width="${w}" height="20" rx="4" fill="${C.dna}" fill-opacity=".6"/>` +
                `<rect x="${270 + w - 120}" y="${y - 10}" width="120" height="20" rx="4" fill="#ffc247" fill-opacity=".8"/>` + '</g>';
            });
            e2 += `<line x1="${270 + 500}" y1="570" x2="${270 + 500}" y2="${600 + 4 * 50 + 22}" stroke="${C.danger}" stroke-width="3" stroke-dasharray="7 5" opacity="${f1(lerp(.35, 1, sub(pp, .6, .7)))}"/>`;
            e2 += tag(270 + 500, 556, T2('kritisch kort → senescentie', 'critically short → senescence'), C.danger, 18, 'middle', lerp(.35, 1, sub(pp, .62, .75)));
            e2 += tag(1200, 660, T2('telomerase actief in:', 'telomerase active in:'), C.text, 19, 'middle', sub(pp, .75, .88));
            e2 += tag(1200, 690, T2('kiemcellen, stamcellen,', 'germ cells, stem cells,'), C.muted, 18, 'middle', sub(pp, .75, .88));
            e2 += tag(1200, 716, T2('de meeste kankercellen', 'most cancer cells'), C.muted, 18, 'middle', sub(pp, .75, .88));
            e2 += tag(270, 556, T2('geel = telomeer', 'yellow = telomere'), '#ffc247', 18, 'start', 1);
          }
          e += `<g opacity="${f1(fade)}">${e2}</g>`;
        }
        $('tl-er').innerHTML = e;

        /* ---------- stap 8: T-lus en G-quadruplex ---------- */
        let tlp = '', g4 = '', hr = '';
        if (step === 8) {
          const k = ease(sub(p, .15, .5));
          const Y = 470, g = 22, R = 150, CX = 760, CYc = Y - R;
          const TH1 = 145 * Math.PI / 180;                       // einde van de lus (links-onder op de cirkel)
          // G-streng (boven, binnenste straal) met D-lus-bult tussen x=420 en 560
          const gpts = [];
          for (let x = 120; x <= CX; x += 5) { const bump = x > 420 && x < 560 ? 34 * Math.sin(Math.PI * (x - 420) / 140) : 0; gpts.push([x, Y - g / 2 - bump]); }
          for (let a = 90; a >= -215; a -= 4) { const t = a * Math.PI / 180; gpts.push([CX + (R - g / 2) * Math.cos(t), CYc + (R - g / 2) * Math.sin(t)]); }
          const cpts = [];
          for (let x = 120; x <= CX; x += 5) cpts.push([x, Y + g / 2]);
          for (let a = 90; a >= -215; a -= 4) { const t = a * Math.PI / 180; cpts.push([CX + (R + g / 2) * Math.cos(t), CYc + (R + g / 2) * Math.sin(t)]); }
          const e = gpts[gpts.length - 1];
          tlp += `<g opacity="${f1(k)}">`;
          for (let x = 130; x < CX; x += 16) if (!(x > 410 && x < 570)) tlp += seg(x, Y - g / 2, x, Y + g / 2, '#3b4c70', 3);
          tlp += pth(cpts, C.dna2, 7) + pth(gpts, C.dna, 7);
          // 3'-overhang: van het lusuiteinde omlaag tussen de strengen, gepaard met de C-streng
          tlp += `<path d="M${f1(e[0])},${f1(e[1])} C${f1(e[0] - 30)},${f1(e[1] + 40)} ${f1(580)},${f1(Y)} ${f1(545)},${f1(Y)} L430,${Y}" stroke="${C.dna}" stroke-width="7" fill="none"/>`;
          for (let x = 436; x < 545; x += 16) tlp += seg(x, Y, x, Y + g / 2, '#8fb0e8', 3);
          tlp += endl(410, Y + 6, "3'", C.dna, 16);
          tlp += txt(490, Y - 56, T2('D-lus', 'D-loop'), C.text, 20);
          tlp += txt(CX, CYc + 10, T2('T-lus', 't-loop'), C.text, 28, 'middle', 700);
          tlp += prot(640, Y + 66, 70, 30, C.prot2, 'TRF2', 20);
          tlp += '</g>';
          tlp += tag(250, Y - 40, T2('dubbelstrengig telomeer', 'double-stranded telomere'), C.muted, 19, 'middle', k);
          // G-quadruplex-icoon
          const kg = ease(sub(p, .55, .75));
          const gx = 1190, gy = 330;
          for (let lvl = 0; lvl < 3; lvl++) g4 += `<rect x="${gx - 40 + lvl * 8}" y="${gy - 20 + lvl * 18}" width="64" height="30" rx="4" fill="${BASE.G}" fill-opacity=".25" stroke="${BASE.G}" stroke-width="2.5" transform="skewX(-20)"/>`;
          g4 = `<g opacity="${f1(kg)}">${g4}${txt(gx - 10, gy + 92, T2('G-quadruplex (mogelijk)', 'G-quadruplex (possible)'), C.text, 20)}</g>`;
          place('tl-g4a', gx, gy - 30);
          hr = `<g opacity="${f1(sub(p, .7, .85))}"><rect x="1015" y="616" width="350" height="52" rx="26" fill="rgba(127,220,106,.12)" stroke="${C.ok}" stroke-width="2"/>${txt(1190, 649, T2('zonder bescherming: breuk?', 'without protection: a break?'), C.text, 20)}</g>`;
          place('tl-hra', 1190, 616);
        } else { place('tl-g4a', -99, -99); place('tl-hra', -99, -99); }
        $('tl-tlp').innerHTML = tlp; $('tl-g4').innerHTML = g4; $('tl-hr').innerHTML = hr;

        /* ---------- chromosoom-icoontje en link naar replicatie ---------- */
        const chrOp = step === 0 || step === 8 ? 1 : 0;
        $('tl-chr').innerHTML = chrOp ? `<g transform="translate(${step === 0 ? 190 : 290} ${step === 0 ? 170 : 180})">
          <rect x="-60" y="-18" width="140" height="36" rx="18" fill="${C.dna}" fill-opacity=".45" stroke="${C.dna}" stroke-width="2"/>
          <rect x="-8" y="-18" width="14" height="36" fill="${C.bg}" opacity=".6"/>
          <circle cx="76" cy="0" r="10" fill="#ffc247"/><circle cx="-56" cy="0" r="10" fill="#ffc247"/>
          ${txt(10, 50, T2('telomeren aan beide uiteinden', 'telomeres at both ends'), C.muted, 18)}</g>` : '';
        $('tl-rep').innerHTML = step === 1 ? `<g transform="translate(300 800)"><rect x="-110" y="-22" width="220" height="44" rx="22" fill="rgba(79,143,247,.15)" stroke="${C.dna}" stroke-width="2"/>${txt(0, 7, T2('↑ replicatievork', '↑ replication fork'), C.text, 18)}</g>` : '';
        if (step === 1) place('tl-repa', 300, 778); else place('tl-repa', -99, -99);
      },
    };
  },
};
