import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { capsid, viralGenome, bilayer, car, integrin, triskelion, microtubule, motor, npc, PINK, FIBRE } from './_bits.js';

/* Hoofdstuk 2 van het verhaal: het adenovirus (HAdV-C5) hecht aan een epitheelcel en wordt opgenomen.
 * Coördinaten: membraan horizontaal op y = MEM, extracellulair erboven, cytosol eronder. */
const MEM = 300, PX = 1080;           // y van het plasmamembraan, x van de opnameplaats
const AX = 390, AY = 430, AR = 150;  // anatomie-inzet links (buiten de cel)
const VR = 48;                       // straal van het capside op de route
const NUC = [1250, 1250, 520];       // kern (cx, cy, r) — bovenrand op y ≈ 730
const PORE = [1120, 758];

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'adeno',
  title: { nl: 'Adenovirus: binnenkomst', en: 'Adenovirus: cell entry' },
  scale: '≈ 90 nm', time: { nl: 'de eerste ~30 minuten van de infectie', en: 'the first ~30 minutes of infection' },
  org: { nl: 'humaan adenovirus C5 in een epitheelcel', en: 'human adenovirus C5 in an epithelial cell' },
  legend: [[PINK, { nl: 'capside / viraal dsDNA', en: 'capsid / viral dsDNA' }], [FIBRE, { nl: 'vezel + knop (fiber knob)', en: 'fibre + knob' }],
    ['#7fc9b6', 'CAR'], ['#c9a574', { nl: 'αv-integrine, membraan', en: 'αv integrin, membrane' }], ['#8fa8ff', { nl: 'klathrine', en: 'clathrin' }],
    [C.prot, { nl: 'motoreiwitten, nucleoporinen', en: 'motor proteins, nucleoporins' }], ['#c98fe0', { nl: 'proteïne VII', en: 'protein VII' }]],
  simplified: {
    nl: 'Het capside is een icosaëder met 240 hexonen en 12 pentonen; hier tekenen we het silhouet (zeshoek) met één vezel per zichtbare hoek in plaats van alle twaalf. Van de tientallen betrokken gastheereiwitten tonen we alleen CAR, αv-integrine, klathrine, dynamine en de motoren. Afmetingen zijn niet op schaal ten opzichte van de cel, en de tijdschaal is sterk vertraagd.',
    en: 'The capsid is an icosahedron with 240 hexons and 12 pentons; here we draw the silhouette (a hexagon) with one fibre per visible vertex instead of all twelve. Of the dozens of host proteins involved we show only CAR, αv integrin, clathrin, dynamin and the motors. Sizes are not to scale relative to the cell and the time scale is strongly slowed down.' },
  steps: [
    ST(7000, cam(AX, AY, 1000), 'Het adenovirus van dichtbij', 'A close look at adenovirus',
      'Een eiwitjas (capside) van zo’n 90 nm, met 20 vlakken. Op de 12 hoeken steekt een vezel met een knop uit.',
      'A protein coat (capsid) of about 90 nm, with 20 faces. A fibre with a knob sticks out from each of the 12 corners.'),
    ST(7000, cam(AX - 50, AY, 900), 'Binnenin zit DNA', 'Inside is DNA',
      'Binnenin zit één DNA-dubbelstreng van ≈ 36 000 basenparen, ingepakt met een viraal eiwit.',
      'Inside is a single DNA double strand of ≈ 36,000 base pairs, packed together with a viral protein.'),
    ST(7000, cam(800, 300, 1400), 'De knop haakt aan de cel', 'The knob hooks onto the cell',
      'De knop bindt een eiwit op de cel (CAR). Dat houdt het virus vast, maar trekt het nog niet naar binnen.',
      'The knob binds a protein on the cell (CAR). That holds the virus, but does not yet pull it inside.'),
    ST(7000, cam(PX, 235, 680), 'Een tweede receptor geeft het startsein', 'A second receptor gives the go-ahead',
      'Een lusje aan de voet van de vezel bindt een tweede receptor. Dat is het sein om het virus op te nemen.',
      'A small loop at the base of the fibre binds a second receptor. That is the signal to take the virus in.'),
    ST(7000, cam(PX, 300, 820), 'Het membraan buigt naar binnen', 'The membrane curves inward',
      'Het eiwit klathrine vormt een mandje onder het membraan. Zo buigt het membraan rond het virus naar binnen.',
      'The protein clathrin forms a cage under the membrane. This makes the membrane curve inward around the virus.'),
    ST(6000, cam(PX, 400, 820), 'Het blaasje wordt afgesnoerd', 'The vesicle is pinched off',
      'Een ander eiwit knijpt de hals dicht. Het virus zit nu in een blaasje binnen in de cel.',
      'Another protein squeezes the neck shut. The virus now sits in a vesicle inside the cell.'),
    ST(8000, cam(1010, 530, 1400), 'Uit het blaasje, naar de kern', 'Out of the vesicle, to the nucleus',
      'Een viraal eiwit breekt het blaasje open. Een motoreiwit sleept het virus dan langs ‘sporen’ naar de kern.',
      'A viral protein breaks the vesicle open. A motor protein then drags the virus along ‘tracks’ to the nucleus.'),
    ST(7000, cam(1130, 720, 980), 'Het DNA gaat de kern in', 'The DNA enters the nucleus',
      'De jas breekt open aan een poort in de kern (kernporie). Het DNA gaat naar binnen en wordt daar afgelezen.',
      'The coat breaks open at a gate in the nucleus (nuclear pore). The DNA goes in and is read there.'),
  ],

  svg() {
    return svgOpen() + `
    <path id="ad-cyto" fill="url(#gCyto)"/>
    <text id="ad-reg1" x="1300" y="200" font-size="22" fill="${C.muted}" font-family="Inter" opacity="0">${T2('extracellulair', 'extracellular')}</text>
    <text id="ad-reg2" x="1400" y="${MEM + 70}" font-size="22" fill="${C.muted}" font-family="Inter" opacity="0">cytosol</text>

    <g id="ad-nuc" data-node="kern" data-color="${C.dna}" data-nolabel opacity="0">
      <circle cx="${NUC[0]}" cy="${NUC[1]}" r="${NUC[2] + 14}" fill="none" stroke="#7aa0d8" stroke-width="6" opacity=".7"/>
      <circle cx="${NUC[0]}" cy="${NUC[1]}" r="${NUC[2]}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>
    </g>
    <g id="ad-mt" opacity="0"></g>
    <g id="ad-membrane"></g>
    <g data-node="endocytose" data-color="#8fa8ff" data-nolabel><g id="ad-clath"></g></g>
    <g id="ad-recept"></g>

    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose → endosoom', 'Endocytosis → endosome')}">
      <g id="ad-ves"></g><circle id="ad-ves-a" data-anchor="endocytose" cx="${PX}" cy="420" r="1" fill="none"/>
    </g>

    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Kernporie (Nup214)', 'Nuclear pore (Nup214)')}">
      <g id="ad-pore" opacity="0">${npc(PORE[0], PORE[1], .9)}</g>
      <circle data-anchor="kernimport" data-pos="below" cx="${PORE[0] - 165}" cy="${PORE[1] + 20}" r="1" fill="none"/>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Pol II leest de virale genen', 'Pol II reads the viral genes')}" id="ad-txn" opacity="0">
      <circle data-anchor="transcriptie" cx="1110" cy="826" r="1" fill="none"/>
      <g id="ad-episome"></g>
    </g>

    <!-- routevirus -->
    <g id="ad-virus"></g>
    <g id="ad-notes"></g>

    <!-- anatomie-inzet -->
    <g id="ad-anat">
      <g data-node="baltimore" data-nolabel data-color="${PINK}" data-label="${T2('Baltimore-klasse I (dsDNA)', 'Baltimore class I (dsDNA)')}">
        <circle data-anchor="baltimore" data-pos="below" cx="60" cy="672" r="1" fill="none"/>
        <rect x="-75" y="620" width="270" height="50" rx="14" fill="rgba(240,107,192,.10)" stroke="${PINK}" stroke-dasharray="6 5"/>
        ${txt(60, 652, T2('dsDNA-virus · klasse I', 'dsDNA virus · class I'), PINK, 21)}
      </g>
      <g id="ad-anat-body"></g>
      <g data-node="dnahelix" data-href="../atlas/index.html?id=bdna" data-color="${PINK}" data-label="${T2('dsDNA ≈ 36 kb — atlas', 'dsDNA ≈ 36 kb — atlas')}" id="ad-anat-dna" opacity="0">
        <circle data-anchor="dnahelix" cx="${AX}" cy="${AY - 40}" r="1" fill="none"/>
        <g id="ad-anat-dna-body"></g>
      </g>
      <g id="ad-anat-lab"></g>
    </g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* membraan met een kuil op x = PX */
    const memPath = (dip, wd = 190) => {
      let d = 'M520,1000 C600,700 640,' + MEM + ' 880,' + MEM;
      for (let x = 880; x <= 2000; x += 8) d += `L${f1(x)},${f1(MEM + dip * Math.exp(-Math.pow((x - PX) / wd, 2)))}`;
      return d;
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;

        /* ── anatomie-inzet ───────────────────────────────── */
        // stap 2: de labels van de inzet vervagen snel; het capside zelf vliegt (krimpend) naar de cel (zie 'routevirus')
        const anatOp = step <= 1 ? 1 : step === 2 ? 1 - ease(clamp(p / .05)) : 0;
        $('ad-anat').setAttribute('opacity', f1(anatOp));
        if (anatOp > .01) {
          const wob = Math.sin(tt * .7) * 2;
          $('ad-anat-body').innerHTML = step >= 2 ? '' : `<g transform="translate(${AX} ${f1(AY + wob)})">${capsid(AR, { fibre: AR * .82 })}</g>`;
          const dnaOp = step === 1 ? ease(sub(p, 0, .3)) : step > 1 ? 1 : 0;
          $('ad-anat-dna').setAttribute('opacity', f1(dnaOp));
          $('ad-anat-dna-body').innerHTML = dnaOp > .01 && step < 2
            ? `<g transform="translate(${AX} ${f1(AY + wob)})">${viralGenome(AR * .8, 1)}</g>` : '';
          let lab = '';
          if (step === 0) {
            const k = ease(sub(p, .15, .55));
            lab += `<g opacity="${f1(k)}">
              ${txt(AX + AR + 80, AY - AR - 12, T2('vezel + knop', 'fibre + knob'), FIBRE, 21)}
              ${txt(AX - AR - 105, AY - 96, T2('pentonbasis', 'penton base'), PINK, 21)}
              <line x1="${AX - AR - 60}" y1="${AY - 88}" x2="${AX - AR * .84}" y2="${AY - AR * .46}" stroke="${PINK}" stroke-width="2"/>
              ${txt(AX - AR - 50, AY + 8, T2('hexon (vlak)', 'hexon (face)'), '#e7a9d6', 21, 'end')}
              <line x1="${AX - AR - 42}" y1="${AY + 1}" x2="${AX - AR * .5}" y2="${AY + 2}" stroke="#e7a9d6" stroke-width="2"/>
              ${txt(AX - 90, AY - AR - 84, '≈ 90 nm', C.text, 24)}
              <line x1="${AX - AR}" y1="${AY - AR - 72}" x2="${AX + AR}" y2="${AY - AR - 72}" stroke="${C.text}" stroke-width="2" marker-start="url(#arrow)" marker-end="url(#arrow)" opacity=".8"/></g>`;
          } else if (step >= 1) {
            const k = ease(sub(p, .25, .6));
            lab += `<g opacity="${f1(k)}">
              ${txt(AX - AR - 18, AY + 8, T2('lineair dsDNA ≈ 36 kb', 'linear dsDNA ≈ 36 kb'), PINK, 23, 'end')}
              ${txt(AX + 110, AY + AR + 62, T2('proteïne VII', 'protein VII'), '#c98fe0', 22)}
              <line x1="${AX + 95}" y1="${AY + AR + 40}" x2="${AX + 42}" y2="${AY + 74}" stroke="#c98fe0" stroke-width="2"/></g>`;
          }
          $('ad-anat-lab').innerHTML = lab;
        } else $('ad-anat-lab').innerHTML = '';

        /* ── membraan / put ───────────────────────────────── */
        let dip = 0, neck = 190;
        if (step === 4) { dip = 110 * ease(sub(p, .15, .95)); neck = lerp(230, 150, ease(p)); }
        else if (step === 5) { dip = 110 * (1 - ease(sub(p, .25, .65))); neck = lerp(150, 90, ease(clamp(p / .5))); }
        else if (step > 5) dip = 0;
        const mp = memPath(dip, neck);
        $('ad-cyto').setAttribute('d', mp + ' L2000,1500 L520,1500 Z');
        $('ad-membrane').innerHTML = bilayer(mp);

        /* ── receptoren ───────────────────────────────────── */
        let rec = '';
        const carOn = step >= 2 ? (step === 2 ? ease(sub(p, .25, .5)) : 1) : 0;
        const intOn = step >= 3 ? (step === 3 ? ease(sub(p, .1, .45)) : 1) : 0;
        if (step >= 2 && step <= 5) {
          const drop = x => dip * Math.exp(-Math.pow((x - PX) / neck, 2));
          for (const dx of [-30, 30]) rec += `<g opacity="${f1(carOn)}">${car(PX + dx, MEM + drop(PX + dx) - 8, -1, 1.5)}</g>`;
          for (const dx of [-68, 68]) rec += `<g opacity="${f1(intOn)}">${integrin(PX + dx, MEM + drop(PX + dx) - 10, 1.5)}</g>`;
          if (step === 2) rec += `<g opacity="${f1(ease(sub(p, .55, .8)))}">${txt(PX + 250, MEM - 60, 'CAR', '#9fe3d0', 26)}
            <line x1="${PX + 200}" y1="${MEM - 56}" x2="${PX + 48}" y2="${MEM - 46}" stroke="#9fe3d0" stroke-width="2"/>
            ${txt(PX + 270, MEM - 28, T2('(aanhechting)', '(attachment)'), C.muted, 20)}</g>`;
          if (step === 3) rec += `<g opacity="${f1(ease(sub(p, .45, .8)))}">${txt(PX + 180, MEM - 160, T2('αvβ3 / αvβ5-integrine', 'αvβ3 / αvβ5 integrin'), '#ffd166', 21)}
            <line x1="${PX + 180}" y1="${MEM - 150}" x2="${PX + 78}" y2="${MEM - 56}" stroke="#ffd166" stroke-width="2"/>
            ${txt(PX - 175, MEM - 160, T2('RGD-lus (pentonbasis)', 'RGD loop (penton base)'), PINK, 21)}
            <line x1="${PX - 175}" y1="${MEM - 150}" x2="${PX - 60}" y2="${MEM - 80}" stroke="${PINK}" stroke-width="2"/></g>`;
        }
        $('ad-recept').innerHTML = rec;

        /* ── klathrine ────────────────────────────────────── */
        let cl = '';
        const clOn = step === 4 ? ease(sub(p, .25, .9)) : step === 5 ? 1 - ease(sub(p, .55, 1)) : 0;
        if (clOn > .01) {
          const drop = x => dip * Math.exp(-Math.pow((x - PX) / neck, 2));
          for (let i = -4; i <= 4; i++) {
            const x = PX + i * 44, y = MEM + drop(x) + 30;
            cl += triskelion(x, y, i * 24, 1.15, '#8fa8ff', clOn * clamp(1 - Math.abs(i) / 6.5));
          }
          if (step === 4) cl += `<g opacity="${f1(ease(sub(p, .55, .9)))}">${txt(PX - 250, MEM + 190, T2('klathrine-mandje', 'clathrin cage'), '#8fa8ff', 21)}
            <line x1="${PX - 170}" y1="${MEM + 182}" x2="${PX - 110}" y2="${MEM + 140}" stroke="#8fa8ff" stroke-width="2"/></g>`;
        }
        if (step === 5) {
          const k = ease(sub(p, 0, .45));
          const yN = MEM + dip * .55;
          cl += `<g opacity="${f1(1 - ease(sub(p, .55, .95)))}">
            ${[0, 1, 2].map(i => `<ellipse cx="${PX}" cy="${f1(yN + 4 + i * 16)}" rx="${f1(lerp(64, 24, k))}" ry="9" fill="none" stroke="${C.prot}" stroke-width="6"/>`).join('')}
            ${txt(PX + 215, MEM + 44, T2('dynamine (GTP)', 'dynamin (GTP)'), C.prot, 21)}
            <line x1="${PX + 150}" y1="${MEM + 36}" x2="${PX + 76}" y2="${f1(yN + 18)}" stroke="${C.prot}" stroke-width="2"/></g>`;
        }
        $('ad-clath').innerHTML = cl;

        /* ── het virus op de route ────────────────────────── */
        let vx = PX, vy = 140, bend = 0, missing = [], fib = 44;
        let vR = VR, gOp = 0;
        if (step === 2) {
          // het grote capside uit de inzet (stap 0–1) krimpt en vliegt in een boog naar de opnameplaats: nooit een leeg beeld
          const u = ease(sub(p, 0, .5));
          vx = lerp(AX, PX, u); vy = lerp(AY, 140, u) - Math.sin(Math.PI * u) * 120;
          vR = lerp(AR, VR, u); fib = lerp(AR * .82, 44, u); gOp = 1 - ease(sub(p, .1, .45));
        }
        else if (step === 3) { vy = lerp(140, 196, ease(sub(p, .2, .8))); bend = 5 * ease(sub(p, .3, .9)); }
        else if (step === 4) { vy = lerp(196, MEM + 110 - 58, ease(sub(p, .2, .95))); bend = 8; fib = lerp(44, 30, ease(p)); missing = p > .5 ? [1, 4] : []; }
        else if (step === 5) { vy = lerp(MEM + 110 - 58, 420, ease(sub(p, .2, .8))); bend = 8; fib = 26; missing = [1, 4]; }
        else if (step >= 6) { fib = 20; missing = [0, 1, 3, 4]; }
        if (step === 6) {
          const k = ease(clamp(p / .95));
          // endosoom (950,420) → ontsnapping (960,540) → over de microtubule naar de porie
          if (k < .3) { const u = k / .3; vx = lerp(PX, 1000, u); vy = lerp(420, 464, u); }
          else { const u = (k - .3) / .7; vx = lerp(1000, PORE[0] - 10, ease(u)); vy = lerp(464, PORE[1] - 108, ease(u)); }
        } else if (step === 7) {
          vx = PORE[0] - 10; vy = lerp(PORE[1] - 108, PORE[1] - 92, ease(clamp(p / .4)));
          if (p > .45) missing = [0, 1, 2, 3, 4, 5];
        }
        const vOp = step < 2 ? 0 : step === 7 && p > .75 ? 1 - ease(sub(p, .75, 1)) * .55 : 1;
        $('ad-virus').innerHTML = vOp <= .01 ? '' :
          `<g transform="translate(${f1(vx)} ${f1(vy)}) rotate(${f1(step >= 6 ? 14 : 0)})">${capsid(vR, { fibre: fib, bend, missing, op: vOp })}${step >= 6 ? viralGenome(VR * .8, .9) : gOp > .01 ? viralGenome(vR * .8, gOp) : ''}</g>`;

        /* ── blaasje / endosoom ───────────────────────────── */
        let ves = '';
        if (step === 5) {
          const k = ease(sub(p, .35, .8));
          ves = `<circle cx="${PX}" cy="${f1(lerp(360, 420, k))}" r="${f1(lerp(70, 92, k))}" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7" opacity="${f1(k)}"/>`;
        } else if (step === 6) {
          const k = 1 - ease(clamp(p / .28));
          const broken = p > .14;
          ves = broken
            ? `<g opacity="${f1(Math.max(0, k + .25))}"><path d="M${PX - 92},420 a92,92 0 1,1 60,78" fill="none" stroke="${C.mem}" stroke-width="7" stroke-dasharray="26 18"/></g>`
            : `<circle cx="${PX}" cy="420" r="92" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7"/>`;
        }
        $('ad-ves').innerHTML = ves;
        $('ad-ves-a').setAttribute('cy', step >= 5 ? '330' : '500');

        /* ── kern, microtubule, porie ─────────────────────── */
        const nucOp = step >= 6 ? (step === 6 ? ease(clamp(p / .3)) : 1) : 0;
        $('ad-nuc').setAttribute('opacity', f1(nucOp));
        $('ad-pore').setAttribute('opacity', f1(nucOp));
        $('ad-mt').setAttribute('opacity', f1(step === 6 ? ease(clamp(p / .25)) : step === 7 ? 1 : 0));
        if (nucOp > .01) $('ad-mt').innerHTML = microtubule(960, 400, PORE[0] + 20, PORE[1] - 70, 16);

        /* ── notities per stap ────────────────────────────── */
        let no = '';
        if (step === 6) {
          no += `<g opacity="${f1(ease(sub(p, .06, .3)))}">${txt(PX + 100, 446, T2('proteïne VI breekt het endosoom open', 'protein VI ruptures the endosome'), '#ff9d5c', 22, 'start')}
            <line x1="${PX + 94}" y1="440" x2="${PX + 78}" y2="436" stroke="#ff9d5c" stroke-width="2"/></g>`;
          const dk = ease(sub(p, .3, .95));
          if (dk > .02) {
            const u = ease(clamp((p - .3) / .7));
            const mx = lerp(1030, PORE[0] + 22, u), my = lerp(480, PORE[1] - 90, u);
            const ang = Math.atan2(PORE[1] - 70 - 400, PORE[0] + 20 - 960) * 180 / Math.PI;
            no += `<g opacity="${f1(dk)}">${motor(mx, my, ang, 1.5, C.prot, tt * 6)}
              ${txt(860, 700, T2('dyneïne over microtubuli', 'dynein along microtubules'), C.prot, 23)}</g>`;
          }
        }
        if (step === 7) {
          const k1 = ease(sub(p, .1, .4)), k2 = ease(sub(p, .45, .8));
          no += `<g opacity="${f1(k1)}">${txt(890, PORE[1] - 155, 'hexon ↔ Nup214', C.prot, 22)}
            <line x1="${890}" y1="${PORE[1] - 146}" x2="${PORE[0] - 46}" y2="${PORE[1] - 86}" stroke="${C.prot}" stroke-width="2"/>
            ${txt(1350, PORE[1] - 250, T2('kinesine-1 + histon H1', 'kinesin-1 + histone H1'), C.prot, 22)}
            ${motor(PORE[0] + 120, PORE[1] - 120, 180, 1.4, '#b9a6ff', tt * 6, -1)}</g>`;
          no += `<g opacity="${f1(k2)}">${txt(1400, PORE[1] + 130, T2('DNA + proteïne VII → kern', 'DNA + protein VII → nucleus'), PINK, 22)}</g>`;
        }
        $('ad-notes').innerHTML = no;
        /* 'extracellulair'/'cytosol' alleen in het overzicht (stap 6); ingezoomd staan ze in de weg */
        const regOp = step === 6 ? ease(clamp(p / .3)) * .7 : 0;
        $('ad-reg1').setAttribute('opacity', f1(regOp)); $('ad-reg2').setAttribute('opacity', f1(regOp));

        const txnOp = step === 7 ? ease(sub(p, .5, .9)) : 0;
        $('ad-txn').setAttribute('opacity', f1(txnOp));
        $('ad-episome').innerHTML = txnOp > .01
          ? `<g transform="translate(1110 862)"><ellipse rx="80" ry="32" fill="none" stroke="${PINK}" stroke-width="5"/>
             ${txt(0, 6, T2('episoom', 'episome'), PINK, 21)}</g>` : '';
      },
    };
  },
};
