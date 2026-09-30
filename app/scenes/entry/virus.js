import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { capsid, bilayer, car, PINK, FIBRE, LIP } from './_bits.js';

/* Zijpad: wat doet een virus eigenlijk bij een cel? Twee binnenkomstroutes, dan het genoomtype. */
const MEM = 330, LX = 430, RX = 1160;
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* omhuld virusdeeltje: membraan met spikes en een kern erin */
const enveloped = (R, op = 1, spikes = 12) => {
  let s = `<g opacity="${f1(op)}">`;
  for (let i = 0; i < spikes; i++) {
    const a = i * 360 / spikes, x = Math.cos(a * Math.PI / 180), y = Math.sin(a * Math.PI / 180);
    s += `<line x1="${f1(x * R)}" y1="${f1(y * R)}" x2="${f1(x * R * 1.32)}" y2="${f1(y * R * 1.32)}" stroke="#ff9d5c" stroke-width="${f1(R * .09)}"/>`;
    s += `<circle cx="${f1(x * R * 1.4)}" cy="${f1(y * R * 1.4)}" r="${f1(R * .12)}" fill="#ff9d5c"/>`;
  }
  s += `<circle r="${f1(R)}" fill="rgba(201,165,116,.12)" stroke="${C.mem}" stroke-width="${f1(R * .16)}"/>`;
  s += `<circle r="${f1(R * .58)}" fill="#3a1a33" stroke="${PINK}" stroke-width="${f1(R * .08)}"/>`;
  s += `<path d="M${f1(-R * .3)},0 q${f1(R * .15)},${f1(-R * .22)} ${f1(R * .3)},0 t${f1(R * .3)},0" stroke="${C.rna}" stroke-width="${f1(R * .07)}" fill="none"/>`;
  return s + '</g>';
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
  steps: [
    ST(7000, cam(790, 330, 1350), 'Een virus kan zich niet zelf vermenigvuldigen', 'A virus cannot replicate on its own',
      'Een virusdeeltje is een genoom in een eiwitjas, soms met een membraanenvelop. Het heeft de ribosomen en enzymen van een cel nodig.',
      'A virion is a genome in a protein coat, sometimes with a membrane envelope. It needs the ribosomes and enzymes of a cell.'),
    ST(7000, cam(790, 250, 1150), 'Hechting bepaalt het tropisme', 'Attachment determines the tropism',
      'Een virus bindt een specifiek eiwit of suiker op het celoppervlak. Welke cellen die receptor dragen, bepaalt welke weefsels besmet kunnen worden.',
      'A virus binds a specific protein or sugar on the cell surface. Which cells carry that receptor determines which tissues can be infected.'),
    ST(7000, cam(LX, 450, 880), 'Route A: endocytose', 'Route A: endocytosis',
      'De cel neemt het deeltje op in een blaasje. Uit het verzurende endosoom moet het virus dan nog ontsnappen — zoals het adenovirus met proteïne VI.',
      'The cell takes the particle up in a vesicle. The virus must then escape the acidifying endosome — as adenovirus does with protein VI.'),
    ST(7000, cam(RX, 420, 880), 'Route B: membraanfusie', 'Route B: membrane fusion',
      'Alleen omhulde virussen kunnen hun envelop met het celmembraan laten samensmelten; de inhoud staat dan meteen in het cytosol. Zo werkt HIV-1.',
      'Only enveloped viruses can fuse their envelope with the cell membrane; the contents are then delivered straight into the cytosol. This is how HIV-1 works.'),
    ST(7000, cam(790, 560, 1000), 'Uncoating: het genoom komt vrij', 'Uncoating: the genome is released',
      'Het capside valt (deels) uiteen. Pas nu is het genoom bereikbaar voor de machinerie van de cel — en voor haar sensoren.',
      'The capsid (partly) falls apart. Only now is the genome accessible to the cell’s machinery — and to its sensors.'),
    ST(8000, cam(800, 700, 1250), 'En dan? Dat hangt af van het genoomtype', 'And then? That depends on the genome type',
      'DNA-virussen moeten meestal naar de kern; RNA-virussen blijven vaak in het cytosol; retrovirussen maken eerst DNA. Dat is precies de Baltimore-indeling.',
      'DNA viruses usually have to reach the nucleus; RNA viruses often stay in the cytosol; retroviruses first make DNA. That is exactly the Baltimore classification.'),
    ST(7000, cam(800, 480, 1550), 'Nieuwe deeltjes', 'New particles',
      'De cel maakt virale eiwitten en kopieën van het genoom; nieuwe deeltjes komen vrij door lysis of door knopvorming aan het membraan.',
      'The cell makes viral proteins and copies of the genome; new particles are released by lysis or by budding at the membrane.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="${MEM}" width="2400" height="1400" fill="url(#gCyto)"/>
    <text x="195" y="${MEM - 44}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('extracellulair', 'extracellular')}</text>
    <text x="195" y="${MEM + 60}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">cytosol</text>
    <g id="vi-mem">${bilayer(`M-400,${MEM} L2000,${MEM}`)}</g>
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
    <g id="vi-fusion"></g>
    <g data-node="baltimore" data-color="${C.trna}" data-label="${T2('Baltimore-klassen', 'Baltimore classes')}" id="vi-balt" opacity="0">
      <circle data-anchor="baltimore" data-pos="below" cx="800" cy="884" r="1" fill="none"/>
      <rect x="560" y="820" width="480" height="60" rx="16" fill="rgba(255,194,71,.10)" stroke="${C.trna}" stroke-dasharray="7 6"/>
      ${txt(800, 858, T2('genoomtype → hoe maak je mRNA?', 'genome type → how do you make mRNA?'), C.trna, 23)}
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Naar de kern', 'To the nucleus')}" id="vi-nuc" opacity="0">
      <circle data-anchor="kernimport" cx="${LX}" cy="742" r="1" fill="none"/>
      <g id="vi-nuc-body"></g>
    </g>
    <g id="vi-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;

        /* receptoren */
        let rec = '';
        const rOn = step >= 1 ? 1 : ease(sub(p, .5, .9));
        for (const x of [LX - 40, LX + 40, RX - 46, RX + 46]) rec += `<g opacity="${f1(rOn)}">${car(x, MEM - 6, -1, 1.6, step === 1 ? 1 : 0)}</g>`;
        $('vi-rec').innerHTML = rec;

        /* links: niet-omhuld virus via endocytose */
        let ly = 150, lOp = 1, lmiss = [];
        if (step === 0) ly = 150;
        else if (step === 1) ly = lerp(150, MEM - 108, ease(sub(p, .2, .9)));
        else if (step === 2) ly = lerp(MEM - 108, 520, ease(sub(p, .1, .8)));
        else if (step >= 3) { ly = 520; lmiss = step >= 4 ? [0, 2, 4] : []; }
        if (step >= 4) lOp = step === 4 ? 1 - ease(sub(p, .45, .9)) * .6 : .4;
        $('vi-left').innerHTML = `<g transform="translate(${LX} ${f1(ly)})">${capsid(66, { fibre: 58, op: lOp, missing: lmiss })}</g>`;
        $('vi-left-a').setAttribute('cy', f1(ly - 128));

        /* endosoom links */
        let endo = '';
        if (step === 2) {
          const k = ease(sub(p, .3, .8));
          endo = `<circle cx="${LX}" cy="${f1(ly)}" r="${f1(lerp(90, 118, k))}" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7" opacity="${f1(k)}"/>`;
        } else if (step === 3) endo = `<circle cx="${LX}" cy="520" r="118" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7" opacity=".5"/>`;
        else if (step === 4) endo = `<path d="M${LX - 118},520 a118,118 0 1,1 76,100" fill="none" stroke="${C.mem}" stroke-width="7" stroke-dasharray="26 18" opacity="${f1(1 - ease(sub(p, .4, .9)) * .6)}"/>`;
        $('vi-endo').innerHTML = endo;
        /* label onder het endosoom; na het uncoaten (stap 4+) is er geen endosoom meer */
        $('vi-endo-a').setAttribute('cx', f1(step >= 2 ? LX + 225 : LX));
        $('vi-endo-a').setAttribute('cy', f1(step >= 2 ? ly - 40 : MEM + 100));
        $('vi-endo-a').setAttribute('opacity', step >= 4 ? '0' : '1');

        /* rechts: omhuld virus dat fuseert */
        let ry = 150, rOpv = 1, rR = 72;
        if (step <= 1) ry = step === 1 ? lerp(150, MEM - 110, ease(sub(p, .2, .9))) : 150;
        else if (step === 2) ry = MEM - 110;
        else if (step === 3) { const u = ease(sub(p, .15, .7)); ry = lerp(MEM - 110, MEM - 80, u); rOpv = 1 - u; }
        else rOpv = 0;
        $('vi-right').innerHTML = rOpv > .01 ? `<g transform="translate(${RX} ${f1(ry)})">${enveloped(rR, rOpv)}</g>` : '';
        $('vi-right-a').setAttribute('cy', f1(ry - 110)); $('vi-right-a').setAttribute('opacity', rOpv > .1 ? '1' : '0');

        /* inhoud die vrijkomt na fusie */
        let fus = '';
        if (step >= 3) {
          const k = step === 3 ? ease(sub(p, .45, .95)) : 1;
          const cy2 = step === 3 ? lerp(MEM + 20, 470, ease(sub(p, .5, 1))) : step === 4 ? lerp(470, 540, ease(sub(p, .1, .8))) : 540;
          fus += `<g opacity="${f1(k)}"><circle cx="${RX}" cy="${f1(cy2)}" r="${f1(step >= 4 ? 30 : 42)}" fill="#3a1a33" stroke="${PINK}" stroke-width="5"/>
            <path d="M${RX - 26},${f1(cy2)} q13,-18 26,0 t26,0" stroke="${C.rna}" stroke-width="5" fill="none"/></g>`;
          if (step === 3) {
            const u = ease(sub(p, .15, .7));
            if (u < .98) fus += `<path d="M${RX - 95},${MEM} A95,${f1(95 * (1 - u) + 1)} 0 0 1 ${RX + 95},${MEM}" fill="rgba(201,165,116,.12)" stroke="${C.mem}" stroke-width="12" opacity="${f1(Math.min(1, u * 4))}"/>`;
            fus += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(RX, MEM + 230, T2('de envelop versmelt met het celmembraan', 'the envelope fuses with the cell membrane'), C.mem, 20)}</g>`;
          }
        }
        $('vi-fusion').innerHTML = fus;

        /* genoom vrij + fork */
        let no = '';
        if (step >= 4) {
          const k = step === 4 ? ease(sub(p, .4, .85)) : 1;
          no += `<g opacity="${f1(k)}"><path d="M${LX - 70},640 q30,-26 66,0 t66,0" stroke="${C.dna}" stroke-width="6" fill="none"/>
            ${txt(LX, 690, T2('viraal DNA', 'viral DNA'), C.dna, 22)}
            <path d="M${RX - 70},640 q30,-26 66,0 t66,0" stroke="${C.rna}" stroke-width="6" fill="none"/>
            ${txt(RX, 690, T2('viraal RNA', 'viral RNA'), C.rna, 22)}</g>`;
        }
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .1, .5)))}">${txt(800, 420, T2('uncoating', 'uncoating'), C.text, 24)}</g>`;
        if (step === 5) {
          const k = ease(sub(p, .15, .6));
          no += `<g opacity="${f1(k)}">${txt(RX, 778, T2('vaak cytosol · retrovirus: eerst DNA', 'often cytosol · retrovirus: DNA first'), C.rna, 22)}</g>`;
        }
        if (step === 6) {
          const k = ease(sub(p, .15, .6));
          no += `<g opacity="${f1(k)}">${txt(800, 250, T2('nieuwe deeltjes: lysis of knopvorming', 'new particles: lysis or budding'), C.text, 24)}
            ${[0, 1, 2].map(i => `<g transform="translate(${f1(300 + i * 120)} ${f1(150 - Math.sin(tt + i) * 10)})">${enveloped(34)}</g>`).join('')}
            ${[0, 1, 2].map(i => `<g transform="translate(${f1(1180 + i * 120)} ${f1(160 + Math.sin(tt + i) * 10)})">${capsid(30, { fibre: 22, hexons: false })}</g>`).join('')}</g>`;
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
