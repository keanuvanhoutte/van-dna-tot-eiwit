import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { capsid, car, knopPts, blaasjeOpen, PINK, FIBRE, LIP } from './_bits.js';
import { membraanPts, ptsCirkel, ptsLijn, eiwit, eiwitPad, blaasje } from '../../bio.js';
import { btn } from '../prot/_fate.js';

/* Zijpad: wat doet een virus eigenlijk bij een cel? Twee binnenkomstroutes, dan het genoomtype. */
const MEM = 330, LX = 430, RX = 1160, BX = 1400;   // BX: plaats van de knopvorming (stap 6)
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* kegelvormig capside van HIV-1 met twee RNA-kopieën (het genoom is diploïd) */
const hivCapsid = (R, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}" transform="rotate(-24)">
  <path d="M${f1(-R * .62)},${f1(-R * .2)} L${f1(R * .5)},${f1(-R * .42)} A${f1(R * .42)},${f1(R * .42)} 0 0 1 ${f1(R * .5)},${f1(R * .42)} L${f1(-R * .62)},${f1(R * .2)} A${f1(R * .2)},${f1(R * .2)} 0 0 1 ${f1(-R * .62)},${f1(-R * .2)}Z" fill="#3a1a33" stroke="${PINK}" stroke-width="${f1(Math.max(2, R * .07))}" stroke-linejoin="round"/>
  <path d="M${f1(-R * .45)},${f1(-R * .06)} q${f1(R * .2)},${f1(-R * .18)} ${f1(R * .4)},0 t${f1(R * .4)},0 M${f1(-R * .4)},${f1(R * .12)} q${f1(R * .2)},${f1(-R * .18)} ${f1(R * .4)},0 t${f1(R * .4)},0" stroke="${C.rna}" stroke-width="${f1(Math.max(2, R * .06))}" fill="none" stroke-linecap="round"/></g>`;
/* omhuld virusdeeltje (HIV-1): envelop = lipidedubbellaag (meegenomen van de vorige cel) met Env-uitsteeksels (steel door het
 * membraan, kop buiten), binnenin het kegelvormige capside. spikes = 0 → enkel membraan + capside. */
const enveloped = (R, op = 1, spikes = 10) => {
  if (op <= .01) return '';
  const w = Math.max(6, R * .22);
  let s = `<g opacity="${f1(op)}">`;
  for (let i = 0; i < spikes; i++) {
    const a = i * 360 / spikes + 9;
    s += `<g transform="rotate(${f1(a)})"><line x1="${f1(R - w / 2)}" y1="0" x2="${f1(R * 1.25)}" y2="0" stroke="#ff9d5c" stroke-width="${f1(Math.max(2, R * .06))}"/>` +
      `<path d="${eiwitPad(R * 1.36, 0, R * .14, R * .16, 3 + i % 4, .12)}" fill="#ff9d5c" stroke="#7a3d17" stroke-width="1.2"/></g>`;
  }
  s += `<circle r="${f1(R - w / 2)}" fill="rgba(201,165,116,.12)"/>` + membraanPts(ptsCirkel(0, 0, R, Math.max(28, Math.round(R * .8))), { w, closed: true });
  return s + hivCapsid(R * .9) + '</g>';
};

export default {
  id: 'virus',
  title: { nl: 'Virale infectie: binnenkomst', en: 'Viral entry' },
  scale: { nl: '≈ 20–300 nm (virusdeeltje)', en: '≈ 20–300 nm (virion)' },
  time: { nl: 'minuten tot uren', en: 'minutes to hours' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [[PINK, { nl: 'capside / viraal genoom', en: 'capsid / viral genome' }], [C.mem, { nl: 'virale envelop & membraan', en: 'viral envelope & membrane' }],
    ['#ff9d5c', { nl: 'virale glycoproteïnen', en: 'viral glycoproteins' }], ['#7fc9b6', { nl: 'receptor', en: 'receptor' }], [C.rna, 'RNA'], [C.dna, 'DNA']],
  simplified: {
    nl: 'Dit is een schema van twee veelgebruikte routes, niet van één bepaald virus. Er bestaan nog andere routes (macropinocytose, caveoline-routes, fusie na endocytose). Aanhechtingsfactoren, restrictiefactoren en de immuunreactie van de cel zijn weggelaten.',
    en: 'This is a scheme of two common routes, not of one particular virus. Other routes exist (macropinocytosis, caveolin-dependent uptake, fusion after endocytosis). Attachment factors, restriction factors and the cell’s immune response are omitted.' },
  parts: [
    { c: C.muted, t: { nl: 'extracellulair', en: 'extracellular' }, m: ['cytosol'], d: { nl: 'Boven de celrand is het buiten de cel; eronder ligt het celvocht (cytosol).', en: 'Above the cell edge is outside the cell; below it lies the cell fluid (cytosol).' },
      p: { nl: 'Extracellulaire ruimte boven, cytosol onder het plasmamembraan.', en: 'Extracellular space above, cytosol below the plasma membrane.' } },
    { c: C.mem, t: { nl: 'celmembraan', en: 'cell membrane' }, d: { nl: 'De rand van de cel: twee lagen vet. Het virus moet hierdoor om binnen te raken.', en: 'The edge of the cell: two layers of fat. The virus has to get through it to enter.' },
      p: { nl: 'Plasmamembraan (lipidendubbellaag).', en: 'Plasma membrane (lipid bilayer).' } },
    { c: '#7fc9b6', t: { nl: 'receptor', en: 'receptor' }, d: { nl: 'Een eiwit op de cel waar het virus aan hecht. Welke cellen deze ontvanger hebben, bepaalt welke cellen besmet raken.', en: 'A protein on the cell that the virus attaches to. Which cells have this receptor decides which cells get infected.' },
      p: { nl: 'Celoppervlaktereceptor; bepaalt mee het tropisme van het virus.', en: 'Cell-surface receptor; co-determines viral tropism.' } },
    { c: PINK, t: { nl: 'virus zonder vlies (eiwitjas)', en: 'virus without envelope (protein coat)' }, m: ['lysis: de cel barst open', 'lysis: the cell bursts'], d: { nl: 'Links: een virus met alleen een eiwitjas (zoals het adenovirus). De cel slokt het op; nieuwe deeltjes komen vrij als de cel openbarst.', en: 'Left: a virus with only a protein coat (like adenovirus). The cell swallows it; new particles are released when the cell bursts.' },
      p: { nl: 'Niet-omhuld virion: opname via endocytose; vrijzetting vaak door lysis.', en: 'Non-enveloped virion: uptake by endocytosis; release often by lysis.' } },
    { c: C.mem, t: { nl: 'blaasje (endosoom)', en: 'vesicle (endosome)' }, d: { nl: 'Het blaasje waarin de cel het virus opslokt. Het virus moet er daarna uit ontsnappen.', en: 'The vesicle in which the cell swallows the virus. The virus must then escape from it.' },
      p: { nl: 'Endosoom gevormd door endocytose; het virus ontsnapt door membraanlysis.', en: 'Endosome formed by endocytosis; the virus escapes by membrane lysis.' } },
    { c: '#ff9d5c', t: { nl: 'virus met vlies (envelop)', en: 'virus with envelope' }, m: ['knopvorming', 'budding'], d: { nl: 'Rechts: een virus met een eigen vetvlies en oranje uitsteeksels (zoals hiv). Nieuwe deeltjes knoppen af uit de celrand.', en: 'Right: a virus with its own fat membrane and orange spikes (like HIV). New particles bud off from the cell edge.' },
      p: { nl: 'Omhuld virion met envelop-glycoproteïnen (Env); vrijzetting door knopvorming.', en: 'Enveloped virion with envelope glycoproteins (Env); release by budding.' } },
    { c: C.mem, t: { nl: 'de envelop versmelt met het celmembraan', en: 'the envelope fuses with the cell membrane' }, d: { nl: 'Het vlies van het virus smelt samen met de celrand. De binnenkant van het virus komt zo meteen in het celvocht.', en: 'The virus membrane merges with the cell edge. The inside of the virus thus ends up straight in the cell fluid.' },
      p: { nl: 'Membraanfusie aan het plasmamembraan, gemedieerd door de virale fusie-eiwitten.', en: 'Membrane fusion at the plasma membrane, mediated by the viral fusion proteins.' } },
    { c: PINK, t: { nl: 'kegelvormige eiwitjas', en: 'cone-shaped protein coat' }, d: { nl: 'De eiwitjas van hiv (kegelvorm) met twee kopieën van zijn RNA erin. Ze komt na de versmelting vrij in de cel.', en: 'The protein coat of HIV (cone-shaped) with two copies of its RNA inside. It is released into the cell after fusion.' },
      p: { nl: 'Conisch capside van HIV-1 met een diploïd RNA-genoom.', en: 'Conical capsid of HIV-1 containing a diploid RNA genome.' } },
    { c: C.text, t: { nl: 'uitpakken (uncoating)', en: 'uncoating' }, d: { nl: 'De eiwitjas valt (deels) uit elkaar, zodat het erfelijk materiaal van het virus vrijkomt.', en: 'The protein coat (partly) falls apart, so the genetic material of the virus is released.' },
      p: { nl: 'Uncoating: (gedeeltelijke) ontmanteling van het capside en vrijgave van het genoom.', en: 'Uncoating: (partial) disassembly of the capsid and release of the genome.' } },
    { c: PINK, t: { nl: 'viraal DNA', en: 'viral DNA' }, d: { nl: 'Het erfelijk materiaal van een DNA-virus. Het gaat meestal naar de kern.', en: 'The genetic material of a DNA virus. It usually goes to the nucleus.' },
      p: { nl: 'DNA-genoom, doorgaans in de kern getranscribeerd.', en: 'DNA genome, usually transcribed in the nucleus.' } },
    { c: C.rna, t: { nl: 'viraal RNA', en: 'viral RNA' }, m: ['vaak cytosol · retrovirus: eerst DNA', 'often cytosol · retrovirus: DNA first'], d: { nl: 'Het erfelijk materiaal van een RNA-virus. Het blijft vaak in het celvocht; een retrovirus maakt er eerst DNA van.', en: 'The genetic material of an RNA virus. It often stays in the cell fluid; a retrovirus first makes DNA from it.' },
      p: { nl: 'RNA-genoom; meestal cytoplasmatische replicatie, bij retrovirussen eerst reverse transcriptie.', en: 'RNA genome; mostly cytoplasmic replication, with reverse transcription first in retroviruses.' } },
    { c: C.text, t: { nl: 'nieuwe deeltjes: lysis of knopvorming', en: 'new particles: lysis or budding' }, d: { nl: 'Nieuwe virussen verlaten de cel op twee manieren: de cel barst open, of ze knoppen af met een stukje celrand.', en: 'New viruses leave the cell in two ways: the cell bursts open, or they bud off with a piece of cell edge.' },
      p: { nl: 'Vrijzetting door cellysis of door knopvorming, waarbij omhulde virussen hun envelop van de gastheer meenemen.', en: 'Release by cell lysis or by budding, in which enveloped viruses acquire their envelope from the host.' } },
  ],
  steps: [
    ST(7000, cam(790, 330, 1350), 'Een virus heeft een cel nodig', 'A virus needs a cell',
      'Een virus is erfelijk materiaal in een eiwitjas. Het heeft een cel nodig om zich te vermenigvuldigen.',
      'A virus is genetic material in a protein coat. It needs a cell to multiply.'),
    ST(7000, cam(770, 250, 1200), 'Het virus hecht aan de cel', 'The virus attaches to the cell',
      'Het virus hecht aan een bepaald eiwit of suiker op de cel: de receptor. Die bepaalt welke cellen besmet raken.',
      'The virus attaches to a specific protein or sugar on the cell: the receptor. It decides which cells get infected.'),
    ST(7000, cam(LX, 450, 880), 'Route A: de cel slokt het virus op', 'Route A: the cell swallows the virus',
      'De cel slokt het virus op in een blaasje. Daarna moet het virus nog uit dat blaasje ontsnappen.',
      'The cell swallows the virus in a small bubble (vesicle). The virus must then still escape from it.'),
    ST(7000, cam(RX, 420, 880), 'Route B: het virus versmelt met de cel', 'Route B: the virus fuses with the cell',
      'Een virus met een eigen membraan (envelop) kan dat laten versmelten met het celmembraan. Zo kan HIV-1 binnenkomen.',
      'A virus with its own membrane (envelope) can fuse it with the cell membrane. This is one way HIV-1 can get in.'),
    ST(7000, cam(770, 578, 1060), 'Het virus pakt zich uit', 'The virus unpacks',
      'De eiwitjas valt (deels) uit elkaar. Het virale DNA of RNA komt vrij, en de cel kan het nu ook opmerken.',
      'The protein coat (partly) falls apart. The viral DNA or RNA is released, and the cell can now notice it too.'),
    ST(8000, cam(800, 700, 1250), 'De route hangt af van het genoom', 'The route depends on the genome',
      'DNA-virussen gaan meestal naar de kern, RNA-virussen vaak niet. Sommige maken eerst DNA van hun RNA.',
      'DNA viruses usually go to the nucleus, RNA viruses often do not. Some first make DNA from their RNA.'),
    ST(7000, cam(800, 480, 1550), 'Nieuwe virussen komen vrij', 'New viruses are released',
      'De cel bouwt nieuwe virussen. Die komen vrij als de cel openbarst, of ze knoppen af uit het membraan.',
      'The cell builds new viruses. They are released when the cell bursts, or they bud off from the membrane.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="${MEM}" width="2400" height="1400" fill="url(#gCyto)"/>
    <text id="vi-ext" x="520" y="${MEM - 22}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('extracellulair', 'extracellular')}</text>
    <text id="vi-cyt" x="195" y="${MEM + 60}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">cytosol</text>
    <g id="vi-mem"></g>
    <g id="vi-rec"></g>
    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose & ontsnapping', 'Endocytosis & escape')}">
      <circle id="vi-endo-a" data-anchor="endocytose" data-pos="below" cx="${LX}" cy="${MEM + 100}" r="1" fill="none"/>
      <g id="vi-endo"></g>
    </g>
    <g data-node="adeno" data-color="${PINK}" data-label="${T2('Adenovirus (niet omhuld, dsDNA)', 'Adenovirus (non-enveloped, dsDNA)')}">
      <g id="vi-left"></g><circle id="vi-left-a" data-anchor="adeno" cx="${LX}" cy="120" r="1" fill="none"/>
    </g>
    <g data-node="rt" data-color="${C.rna}" data-label="${T2('HIV-1 (omhuld, ssRNA-RT)', 'HIV-1 (enveloped, ssRNA-RT)')}">
      <g id="vi-right"></g><circle id="vi-right-a" data-anchor="rt" cx="${RX}" cy="120" r="1" fill="none"/>
    </g>
    <g data-node="rt" data-color="${C.rna}" data-nolabel><g id="vi-fusion"></g></g>
    <g data-node="baltimore" data-color="${C.trna}" data-label="${T2('Baltimore-klassen', 'Baltimore classes')}" id="vi-balt" opacity="0">
      <circle data-anchor="baltimore" data-pos="below" cx="800" cy="884" r="1" fill="none"/>
      <rect x="560" y="820" width="480" height="60" rx="16" fill="rgba(255,194,71,.10)" stroke="${C.trna}" stroke-dasharray="7 6"/>
      ${txt(800, 858, T2('genoomtype → hoe maak je mRNA?', 'genome type → how do you make mRNA?'), C.trna, 23)}
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Naar de kern', 'To the nucleus')}" id="vi-nuc" opacity="0">
      <circle data-anchor="kernimport" data-pos="below" cx="${LX}" cy="802" r="1" fill="none"/>   <!-- onder het kernporiekader, niet tegen "viraal DNA" -->
      <g id="vi-nuc-body"></g>
    </g>
    <g id="vi-notes"></g>
    ${btn('sleutel', 610, 380, T2('sleutel en slot in 3D →', 'key and lock in 3D →'), '#ff9d5c', 100)}
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;
        // stap 5 (uitpakken): de zone-labels zouden half links buiten beeld vallen
        for (const id of ['vi-ext', 'vi-cyt']) $(id).setAttribute('opacity', f1(.7 * (step === 4 ? 1 - sub(p, 0, .15) : step === 5 ? sub(p, 0, .15) : 1)));

        /* membraan: knop links (stap 2: de cel slokt het virus op) of uitstulping rechts (stap 3: de envelop versmelt) */
        const BR = 104, lk = step === 2 ? ease(sub(p, .05, .5)) : 0;
        const fuseK = step === 3 && p >= .3 ? .97 * (1 - ease(sub(p, .3, .85))) : 0;
        /* stap 6: links barst de cel open (gat in het membraan, lysis), rechts knopt een omhuld virus af */
        const budK = step === 6 ? .85 * ease(sub(p, .1, .6)) : 0, lysK = step === 6 ? ease(sub(p, .1, .45)) : 0;
        const memP = step === 2 && p < .5 ? knopPts(-400, MEM, 2000, MEM, LX + 400, BR, lk * .97)
          : fuseK > .005 ? knopPts(-400, MEM, 2000, MEM, RX + 400, 72, fuseK, { side: -1 })
          : budK > .005 ? knopPts(LX + 10 + 60 * lysK, MEM, 2000, MEM, BX - LX - 10 - 60 * lysK, 44, budK, { side: -1 }) : ptsLijn(-400, MEM, 2000, MEM);
        $('vi-mem').innerHTML = membraanPts(memP, { w: 22 }) + (budK > .005 ? membraanPts(ptsLijn(-400, MEM, LX - 10 - 60 * lysK, MEM), { w: 22 }) : '');

        /* opKnop voor een uitstulping naar boven (fusie): plaats op booglengte sK vanaf de top van de knop; geeft [x, y, richting naar buiten in graden] */
        const opUit = (sK, k, R, X) => {
          const kk = Math.min(.985, Math.max(0, k)), c = R * (2 * kk - 1), th0 = Math.acos(Math.max(-1, Math.min(1, -c / R))), th = sK / R;
          if (Math.abs(th) <= th0) return [X + R * Math.sin(th), MEM - c - R * Math.cos(th), Math.atan2(-Math.cos(th), Math.sin(th)) * 180 / Math.PI];
          return [X + Math.sign(sK) * (R * Math.sin(th0) + Math.abs(sK) - R * th0), MEM, -90];
        };
        /* Env-uitsteeksel (zelfde vorm als in enveloped(72)): steel door het membraan, kop buiten; deg = richting naar buiten */
        const env = (x, y, deg, R = 72) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(deg)})"><line x1="-8" y1="0" x2="${f1(R * .25 + 8)}" y2="0" stroke="#ff9d5c" stroke-width="${f1(R * .06)}"/>` +
          `<path d="${eiwitPad(R * .36 + 8, 0, R * .14, R * .16, 5, .12)}" fill="#ff9d5c" stroke="#7a3d17" stroke-width="1.2"/></g>`;
        /* na de fusie zitten de Env-eiwitten en de receptoren in het celmembraan (de envelop is er een deel van geworden) */
        const fused = step > 3 || (step === 3 && p >= .3), kF = step === 3 ? fuseK : 0;
        const ENV_TH = Array.from({ length: 10 }, (_, i) => { const a = (i * 36 + 9) * Math.PI / 180; return Math.atan2(Math.cos(a), -Math.sin(a)); });

        /* receptoren (type I-membraaneiwitten); links gaan ze mee naar binnen, rechts verdwijnen ze tijdens de fusie uit beeld */
        let rec = '';
        const rOn = step >= 1 ? 1 : ease(sub(p, .5, .9));
        const lOn = step === 2 ? 1 - ease(sub(p, .1, .4)) : step >= 3 ? 0 : rOn;
        for (const x of [LX - 40, LX + 40]) rec += `<g opacity="${f1(lOn)}">${car(x, MEM - 6, -1, 1.6, step === 1 ? 1 : 0)}</g>`;
        for (const k of [-1, 1]) {
          // rechts: receptoren blijven in het membraan, net naast de hals van de versmeltende envelop
          const th0 = fused ? Math.acos(Math.max(-1, Math.min(1, -72 * (2 * Math.min(.985, kF) - 1) / 72))) : 0;
          const x = fused ? opUit(k * (72 * th0 + 26), kF, 72, RX)[0] : RX + k * 46;
          rec += `<g opacity="${f1(rOn)}">${car(x, MEM - 6, -1, 1.6, step === 1 ? 1 : 0)}</g>`;
        }
        if (fused) for (const th of ENV_TH) { const [x, y, d] = opUit(72 * th, kF, 72, RX); rec += env(x, y, d); }
        $('vi-rec').innerHTML = rec;

        /* links: niet-omhuld virus (eiwitjas, geen membraan) via endocytose */
        let ly = 150, lOp = 1, lmiss = [], lfib = 58, vesR = 0;
        if (step === 0) ly = 150;
        else if (step === 1) ly = lerp(150, MEM - 108, ease(sub(p, .2, .9)));
        else if (step === 2) {
          lfib = lerp(58, 30, ease(sub(p, 0, .3)));
          if (p < .5) ly = MEM + BR * (2 * lk * .97 - 1);
          else { const u = ease(sub(p, .5, .95)); ly = lerp(MEM + BR * .94, 520, u); vesR = lerp(BR, 118, u); }
        }
        else if (step >= 3) { ly = 520; lfib = 30; vesR = 118; lmiss = step >= 4 ? [0, 2, 4] : []; }
        if (step >= 4) lOp = step === 4 ? 1 - ease(sub(p, .45, .9)) * .6 : .4;
        $('vi-left').innerHTML = `<g transform="translate(${LX} ${f1(ly)})">${capsid(66, { fibre: lfib, op: lOp, missing: lmiss })}</g>`;
        $('vi-left-a').setAttribute('cy', f1(ly - 128));
        $('vi-left-a').setAttribute('opacity', step === 6 ? '0' : '1');   // stap 7: geen label over het gat en de uittredende capsiden

        /* endosoom links: afgesnoerd blaasje met één dubbellaag; in stap 4 breekt het open */
        let endo = '';
        if ((step === 2 && p >= .5) || step === 3) endo = blaasje(LX, ly, vesR, { w: 18 });
        else if (step === 4) {
          const k = ease(sub(p, .1, .6));
          endo = blaasjeOpen(LX, 520, 118, [[200, 200 + 70 * k], [330, 330 + 45 * k], [70, 70 + 55 * k]], { w: 18, op: 1 - ease(sub(p, .4, .9)) * .6 });
        }
        $('vi-endo').innerHTML = endo;
        /* label onder het endosoom; na het uncoaten (stap 4+) is er geen endosoom meer */
        $('vi-endo-a').setAttribute('cx', f1(step >= 2 ? LX + 225 : LX));
        $('vi-endo-a').setAttribute('cy', f1(step >= 2 ? ly - 40 : MEM + 100));
        $('vi-endo-a').setAttribute('opacity', step >= 4 ? '0' : '1');

        /* rechts: omhuld virus; zijn envelop versmelt met het celmembraan (stap 3) */
        let ry = 150, rOpv = 1, rR = 72;
        if (step <= 1) ry = step === 1 ? lerp(150, MEM - 110, ease(sub(p, .2, .9))) : 150;
        else if (step === 2) ry = MEM - 110;
        else if (step === 3) { ry = lerp(MEM - 110, MEM - 70, ease(sub(p, .05, .3))); rOpv = p < .3 ? 1 : 0; }
        else rOpv = 0;
        $('vi-right').innerHTML = rOpv > .01 ? `<g transform="translate(${RX} ${f1(ry)})">${enveloped(rR, rOpv)}</g>` : '';
        $('vi-right-a').setAttribute('cy', f1(ry - 110)); $('vi-right-a').setAttribute('opacity', rOpv > .1 ? '1' : '0');

        /* het capside komt na de fusie vrij in het cytosol (de envelop is nu deel van het celmembraan) */
        let fus = '';
        if (step >= 3 && !(step === 3 && p < .3)) {
          const cy2 = step === 3 ? lerp(MEM - 70, 470, ease(sub(p, .35, 1))) : step === 4 ? lerp(470, 540, ease(sub(p, .1, .8))) : 540;
          const cR = step === 3 ? 65 : step === 4 ? lerp(65, 50, ease(sub(p, .1, .8))) : 50;
          const cOp = step === 4 ? 1 - ease(sub(p, .45, .9)) * .5 : step > 4 ? .5 : 1;
          fus += `<g transform="translate(${RX} ${f1(cy2)})">${hivCapsid(cR, cOp)}</g>`;
        }
        if (step === 3) fus += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(RX, MEM + 230, T2('de envelop versmelt met het celmembraan', 'the envelope fuses with the cell membrane'), C.mem, 20)}</g>`;
        $('vi-fusion').innerHTML = fus;

        /* genoom vrij + fork */
        let no = '';
        if (step >= 4) {
          const k = step === 4 ? ease(sub(p, .4, .85)) : 1;
          no += `<g opacity="${f1(k)}"><path d="M${LX - 70},640 q30,-26 66,0 t66,0" stroke="${PINK}" stroke-width="6" fill="none"/>
            ${txt(LX, 690, T2('viraal DNA', 'viral DNA'), PINK, 22)}
            <path d="M${RX - 70},640 q30,-26 66,0 t66,0" stroke="${C.rna}" stroke-width="6" fill="none"/>
            ${txt(RX, 690, T2('viraal RNA', 'viral RNA'), C.rna, 22)}</g>`;
        }
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .1, .5)))}">${txt(800, 420, T2('uitpakken (uncoating)', 'uncoating'), C.text, 24)}</g>`;
        if (step === 5) {
          const k = ease(sub(p, .15, .6));
          no += `<g opacity="${f1(k)}">${txt(RX, 778, T2('vaak cytosol · retrovirus: eerst DNA', 'often cytosol · retrovirus: DNA first'), C.rna, 22)}</g>`;
        }
        if (step === 6) {
          const k = ease(sub(p, .45, .8));
          no += `<g opacity="${f1(k)}">${txt(800, 250, T2('nieuwe deeltjes: lysis of knopvorming', 'new particles: lysis or budding'), C.text, 24)}
            ${[0, 1, 2].map(i => `<g transform="translate(${f1(260 + i * 120)} ${f1(160 + Math.sin(tt + i) * 10)})">${capsid(30, { fibre: 22, hexons: false })}</g>`).join('')}
            ${[0, 1, 2].map(i => `<g transform="translate(${f1(1060 + i * 110)} ${f1(140 - Math.sin(tt + i) * 10)})">${enveloped(34)}</g>`).join('')}
            ${txt(LX + 110, MEM + 70, T2('lysis: de cel barst open', 'lysis: the cell bursts'), PINK, 21, 'start')}
            ${txt(BX, MEM + 80, T2('knopvorming', 'budding'), '#ff9d5c', 21)}</g>`;
          /* lysis: capsiden komen door het gat naar buiten; knopvorming: een capside in een uitstulping met Env */
          no += [[-30, -40], [35, -10], [-5, 25]].map(([dx, dy], i) => `<g transform="translate(${f1(LX + dx * (.4 + lysK))} ${f1(MEM + dy - 60 * lysK * (i === 0 ? 1 : .3))})" opacity="${f1(lysK)}">${capsid(24, { fibre: 16, hexons: false })}</g>`).join('');
          if (budK > .01) {
            const c = 44 * (2 * budK - 1);
            no += `<g transform="translate(${BX} ${f1(MEM - c)})">${hivCapsid(44 * .9)}</g>`;
            for (let i = 0; i < 7; i++) { const [x, y, d] = opUit((i - 3) * 30, budK, 44, BX); no += env(x, y, d, 44); }
          }
        }
        $('vi-notes').innerHTML = no;

        $('vi-balt').setAttribute('opacity', f1(step === 5 ? ease(sub(p, .4, .8)) : step === 6 ? 1 : 0));
        const nOn = step >= 5 ? 1 : 0;
        $('vi-nuc').setAttribute('opacity', f1(nOn));
        $('vi-nuc-body').innerHTML = nOn ? `<rect x="${LX - 150}" y="742" width="300" height="56" rx="16" fill="rgba(155,123,255,.10)" stroke="${C.prot}" stroke-dasharray="7 6"/>
          ${txt(LX, 778, T2('kernporie →', 'nuclear pore →'), C.prot, 22)}` : '';
      },
    };
  },
};
