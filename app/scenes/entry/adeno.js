import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { blaasje, membraanPts, kernEnvelop, ptsCirkel, eiwit, polII } from '../../bio.js';
import { capsid, viralGenome, padPts, knopPts, ptsPad, blaasjeOpen, car, integrin, triskelion, microtubule, motor, kinesineGreep, linDNA, capsidBreuk, npc, PINK, FIBRE } from './_bits.js';

/* Hoofdstuk 2 van het verhaal: het adenovirus (HAdV-C5) hecht aan een epitheelcel en wordt opgenomen.
 * Coördinaten: membraan horizontaal op y = MEM, extracellulair erboven, cytosol eronder.
 * Fix-ronde 15-11-2026: kernenvelop als twee dubbellagen die aan de porie in elkaar overgaan (kernEnvelop, bio.js);
 * kinesine-1 bindt Nup358 (zware keten Kif5c) en het capside (lichte keten Klc1/2) en trekt het capside op de porie
 * uiteen (Strunze et al., Cell Host Microbe 2011, 10:210–223); het genoom is één lineair dsDNA met het terminaal
 * eiwit (TP) aan beide 5′-uiteinden en wordt in de kern niet circulair (ICTV-rapport Adenoviridae). */
const MEM = 300, PX = 1080;           // y van het plasmamembraan, x van de opnameplaats
const AX = 390, AY = 430, AR = 150;  // anatomie-inzet links (buiten de cel)
const VR = 48;                       // straal van het capside op de route
const KR = 90;                       // straal van de klathrinekuil / het blaasje (virus + vezels passen erin)
const NUC = [1250, 1250, 509];       // kern (cx, cy, r = middenlijn van de kernenvelop) — de porie ligt op die cirkel
const PORE = [1120, 758];
const MT0 = [985, 505];               // begin van de microtubule: onder het opengebroken endosoom (niet erdoor)
/* kernenvelop: twee lipidedubbellagen die bij de porie in elkaar overgaan (bio.js, Alberts/MBoC hfst. 12). De porie ligt op
 * hoek PA van de cirkel; het NPC wordt mee gedraaid zodat zijn kernkant naar het middelpunt wijst. */
const PA = Math.atan2(PORE[1] - NUC[1], PORE[0] - NUC[0]), PROT = PA * 180 / Math.PI + 90;
const PF = [((PA / (2 * Math.PI)) + 1) % 1, .9];          // poriën als fractie van de omtrek: de grote (virus) en één verderop
const ENV = kernEnvelop(ptsCirkel(NUC[0], NUC[1], NUC[2], 220), { poriën: PF, w: 12, gap: 20, poreW: 2 * 92 * .9, npc: false });
const ANDERE = PF.slice(1).map(f => { const a = f * 2 * Math.PI, x = NUC[0] + NUC[2] * Math.cos(a), y = NUC[1] + NUC[2] * Math.sin(a);
  return `<g transform="rotate(${f1(a * 180 / Math.PI + 90)} ${f1(x)} ${f1(y)})">${npc(x, y, .9)}</g>`; }).join('');

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'adeno',
  title: { nl: 'Adenovirus: binnenkomst', en: 'Adenovirus: cell entry' },
  scale: '≈ 90 nm', time: { nl: 'de eerste ~30 minuten van de infectie', en: 'the first ~30 minutes of infection' },
  org: { nl: 'humaan adenovirus C5 in een epitheelcel', en: 'human adenovirus C5 in an epithelial cell' },
  legend: [[PINK, { nl: 'capside / viraal dsDNA', en: 'capsid / viral dsDNA' }], [FIBRE, { nl: 'vezel + knop (fiber knob)', en: 'fibre + knob' }],
    ['#7fc9b6', 'CAR'], ['#c9a574', { nl: 'αv-integrine, membraan', en: 'αv integrin, membrane' }], ['#8fa8ff', { nl: 'klathrine', en: 'clathrin' }],
    [C.prot, { nl: 'motoreiwitten', en: 'motor proteins' }], ['#9db4d8', { nl: 'nucleoporinen (kernporie)', en: 'nucleoporins (nuclear pore)' }], ['#c98fe0', { nl: 'proteïne VII', en: 'protein VII' }], ['#ffd166', { nl: 'terminaal eiwit (TP)', en: 'terminal protein (TP)' }]],
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
      <circle cx="${NUC[0]}" cy="${NUC[1]}" r="${NUC[2] - 20}" fill="url(#gNuc)"/>
      ${ENV}${ANDERE}
    </g>
    <g id="ad-mt" opacity="0"></g>
    <g id="ad-membrane"></g>
    <g data-node="endocytose" data-color="#8fa8ff" data-nolabel><g id="ad-clath"></g></g>
    <g id="ad-recept"></g>

    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose → endosoom', 'Endocytosis → endosome')}">
      <g id="ad-ves"></g><circle id="ad-ves-a" data-anchor="endocytose" cx="${PX}" cy="420" r="1" fill="none"/>
    </g>

    <g data-node="kernimport" data-color="#9db4d8" data-label="${T2('Kernporie (Nup214)', 'Nuclear pore (Nup214)')}">
      <g id="ad-pore" opacity="0"><g transform="rotate(${f1(PROT)} ${PORE[0]} ${PORE[1]})">${npc(PORE[0], PORE[1], .9)}</g></g>
      <circle data-anchor="kernimport" data-pos="below" cx="${PORE[0] - 165}" cy="${PORE[1] + 20}" r="1" fill="none"/>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Pol II leest de virale genen', 'Pol II reads the viral genes')}" id="ad-txn" opacity="0">
      <circle data-anchor="transcriptie" cx="1360" cy="830" r="1" fill="none"/>
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
      <g data-node="dnahelix" data-href="../atlas/index.html?id=bdna" data-color="${PINK}" data-label="${T2('dsDNA ≈ 36 kb — in 3D', 'dsDNA ≈ 36 kb — in 3D')}" id="ad-anat-dna" opacity="0">
        <circle data-anchor="dnahelix" cx="${AX}" cy="${AY - 40}" r="1" fill="none"/>
        <g id="ad-anat-dna-body"></g>
      </g>
      <g id="ad-anat-lab"></g>
    </g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* membraan: gebogen rand links, dan horizontaal met een knop (klathrinekuil) op x = PX; k = 0 vlak … .97 bijna afgesnoerd */
    const rand = padPts('M520,1000 C600,700 640,' + MEM + ' 880,' + MEM, 12).slice(0, -1);
    const memPts = k => rand.concat(knopPts(880, MEM, 2000, MEM, PX - 880, KR, k));
    /* plaats op het membraan op booglengte sK van het midden van de kuil; off > 0 = naar het cytosol, < 0 = naar buiten.
     * los = het afgesnoerde blaasje [cx, cy]: dan ligt alles op de cirkel. Geeft [x, y, draaihoek] (0 = buitenkant boven). */
    const opKnop = (sK, off, k, los = null) => {
      const kk = Math.min(.985, Math.max(0, k)), c = KR * (2 * kk - 1), th0 = los ? Math.PI : Math.acos(Math.max(-1, Math.min(1, -c / KR)));
      const cx = los ? los[0] : PX, cy = los ? los[1] : MEM + c, th = sK / KR;
      if (Math.abs(th) <= th0) return [cx + (KR + off) * Math.sin(th), cy + (KR + off) * Math.cos(th), -th * 180 / Math.PI];
      const sg = Math.sign(sK);
      return [PX + sg * (KR * Math.sin(th0) + Math.abs(sK) - KR * th0), MEM + off, 0];
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
              ${txt(AX - AR - 105, AY - 40, T2('pentonbasis', 'penton base'), PINK, 21)}
              <line x1="${AX - AR - 32}" y1="${AY - 48}" x2="${AX - AR * .84}" y2="${AY - AR * .46}" stroke="${PINK}" stroke-width="2"/>
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

        /* ── membraan / kuil ─────────────────────────────── */
        // stap 4: de kuil zakt in (k 0 → .75); stap 5: de hals knijpt dicht (k → .97) en bij p = .5 snoert het blaasje af
        let kn = 0, los = null;
        if (step === 4) kn = .75 * ease(sub(p, .15, .95));
        else if (step === 5) {
          if (p < .5) kn = lerp(.75, .97, ease(sub(p, 0, .45)));
          else { const u = ease(sub(p, .5, .9)); los = [PX, lerp(MEM + KR * .94, 420, u), lerp(KR, 92, u)]; }
        }
        const mP = memPts(los ? 0 : kn);
        $('ad-cyto').setAttribute('d', ptsPad(mP) + ' L2000,1500 L520,1500 Z');
        $('ad-membrane').innerHTML = membraanPts(mP, { w: 22 });

        /* ── receptoren (bewegen mee met het membraan van de kuil) ── */
        let rec = '';
        const carOn = step >= 2 ? (step === 2 ? ease(sub(p, .25, .5)) : 1) : 0;
        const intOn = step >= 3 ? (step === 3 ? ease(sub(p, .1, .45)) : 1) : 0;
        if (step >= 2 && step <= 5) {
          const at = (sK, fn, on) => { const [x, y, a] = opKnop(sK, -8, kn, los); return `<g opacity="${f1(on)}" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})">${fn(x, y)}</g>`; };
          for (const dx of [-30, 30]) rec += at(dx, (x, y) => car(x, y, -1, 1.5), carOn);
          for (const dx of [-68, 68]) rec += at(dx, (x, y) => integrin(x, y - 2, 1.5), intOn);
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
          for (let i = -4; i <= 4; i++) {
            const [x, y, a] = opKnop(i * 44, 42, kn, los);        // ver genoeg van het membraan: poten (≈ 26 px) blijven aan de cytosolkant
            cl += triskelion(x, y, i * 24 + a, .86, '#8fa8ff', clOn * clamp(1 - Math.abs(i) / 6.5) * clamp((y - MEM - 30) / 15));   // nooit boven/buiten het plasmamembraan
          }
          if (step === 4) cl += `<g opacity="${f1(ease(sub(p, .55, .9)))}">${txt(PX - 250, MEM + 190, T2('klathrine-mandje', 'clathrin cage'), '#8fa8ff', 21)}
            <line x1="${PX - 170}" y1="${MEM + 182}" x2="${PX - 110}" y2="${MEM + 140}" stroke="#8fa8ff" stroke-width="2"/></g>`;
        }
        if (step === 5) {
          // dynamine: ringen rond de hals, net onder het membraan; ze verdwijnen zodra het blaasje los is
          const c = KR * (2 * Math.min(.985, kn || .97) - 1), hc = KR * Math.sin(Math.acos(Math.max(-1, Math.min(1, -c / KR))));
          cl += `<g opacity="${f1(1 - ease(sub(p, .5, .7)))}">
            ${[0, 1].map(i => `<ellipse cx="${PX}" cy="${f1(MEM - 4 + i * 13)}" rx="${f1(hc + 14)}" ry="8" fill="none" stroke="${C.prot}" stroke-width="6"/>`).join('')}
            ${txt(PX + 215, MEM + 44, T2('dynamine (GTP)', 'dynamin (GTP)'), C.prot, 21)}
            <line x1="${PX + 150}" y1="${MEM + 36}" x2="${f1(PX + hc + 18)}" y2="${MEM + 8}" stroke="${C.prot}" stroke-width="2"/></g>`;
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
        else if (step === 4) { vy = Math.max(lerp(196, MEM - KR + 40, ease(sub(p, 0, .2))), MEM + KR * (2 * kn - 1)); bend = 8; fib = lerp(44, 30, ease(p)); missing = p > .5 ? [1, 4] : []; }
        else if (step === 5) { vy = los ? los[1] : MEM + KR * (2 * kn - 1); bend = 8; fib = 26; missing = [1, 4]; }
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
          `<g transform="translate(${f1(vx)} ${f1(vy)}) rotate(${f1(step >= 6 ? 14 : 0)})">${step === 7 ? `<g opacity="${f1(vOp)}">${capsidBreuk(vR, ease(sub(p, .45, .8)), 'ad-brk', { fibre: fib, missing })}</g>` : capsid(vR, { fibre: fib, bend, missing, op: vOp })}${step === 6 ? viralGenome(VR * .8, .9) : step === 7 ? viralGenome(VR * .8, .9 * (1 - ease(sub(p, .5, .65)))) : gOp > .01 ? viralGenome(vR * .8, gOp) : ''}</g>`;

        /* ── blaasje / endosoom ───────────────────────────── */
        let ves = '';
        if (los) ves = blaasje(los[0], los[1], los[2], { w: 22 });
        else if (step === 6) {
          // proteïne VI maakt een gat aan de kant waar het virus naar buiten gaat (linksonder)
          const k = ease(sub(p, .02, .2));
          ves = blaasjeOpen(PX, 420, 92, [[150 - 38 * k, 150 + 38 * k], [300, 300 + 30 * k], [40, 40 + 22 * k]], { w: 22, op: 1 - .65 * ease(sub(p, .2, .45)) });
        }
        $('ad-ves').innerHTML = ves;
        $('ad-ves-a').setAttribute('cy', step >= 5 ? '540' : '500');
        $('ad-ves-a').setAttribute('opacity', step === 7 ? '0' : '1');   // in stap 8 is er geen endosoom meer: geen label

        /* ── kern, microtubule, porie ─────────────────────── */
        const nucOp = step >= 6 ? (step === 6 ? ease(clamp(p / .3)) : 1) : 0;
        $('ad-nuc').setAttribute('opacity', f1(nucOp));
        $('ad-pore').setAttribute('opacity', f1(nucOp));
        $('ad-mt').setAttribute('opacity', f1(step === 6 ? ease(clamp(p / .25)) : step === 7 ? 1 - ease(sub(p, .2, .5)) : 0));
        if (nucOp > .01) $('ad-mt').innerHTML = microtubule(MT0[0], MT0[1], PORE[0] + 20, PORE[1] - 70, 16);

        /* ── notities per stap ────────────────────────────── */
        let no = '';
        if (step === 6) {
          no += `<g opacity="${f1(ease(sub(p, .06, .3)))}">${txt(PX + 100, 446, T2('proteïne VI breekt het endosoom open', 'protein VI ruptures the endosome'), '#ff9d5c', 22, 'start')}
            <line x1="${PX + 94}" y1="440" x2="${PX + 78}" y2="436" stroke="#ff9d5c" stroke-width="2"/></g>`;
          const dk = ease(sub(p, .3, .95));
          if (dk > .02) {
            const u = ease(clamp((p - .3) / .7));
            const mx = lerp(1012, PORE[0] + 22, u), my = lerp(528, PORE[1] - 90, u);
            const ang = Math.atan2(PORE[1] - 70 - MT0[1], PORE[0] + 20 - MT0[0]) * 180 / Math.PI;
            no += `<g opacity="${f1(dk)}">${motor(mx, my, ang, 1.5, C.prot, tt * 6)}
              ${txt(860, 700, T2('dyneïne over microtubuli', 'dynein along microtubules'), C.prot, 23)}</g>`;
          }
        }
        if (step === 7) {
          const k1 = ease(sub(p, .1, .4)), k2 = ease(sub(p, .45, .8));
          no += `<g opacity="${f1(k1 * (1 - ease(sub(p, .45, .6))))}">${txt(890, PORE[1] - 155, 'hexon ↔ Nup214', C.prot, 22)}
            <line x1="${890}" y1="${PORE[1] - 146}" x2="${PORE[0] - 46}" y2="${PORE[1] - 86}" stroke="${C.prot}" stroke-width="2"/></g>
            <g opacity="${f1(k1)}">
            ${txt(1330, PORE[1] - 250, T2('kinesine-1 trekt de jas open', 'kinesin-1 pulls the coat apart'), '#b9a6ff', 22)}
            <line x1="1300" y1="${PORE[1] - 240}" x2="${PORE[0] + 150}" y2="${PORE[1] - 190}" stroke="#b9a6ff" stroke-width="2"/>
            ${microtubule(PORE[0] + 60, PORE[1] - 250, PORE[0] + 330, PORE[1] - 150, 14)}
            ${kinesineGreep(PORE[0] + 150, PORE[1] - 186, 200, 1.3, '#b9a6ff', tt * 6, [[PORE[0] + 30, PORE[1] - 118], [PORE[0] + 52, PORE[1] - 76]])}</g>`;
          no += `<g opacity="${f1(k2 * (1 - ease(sub(p, .65, .8))))}">${txt(1400, PORE[1] + 130, T2('DNA + proteïne VII → kern', 'DNA + protein VII → nucleus'), PINK, 22)}</g>`;
          /* het DNA verlaat de opengebroken jas als één draad door de porie de kern in (zelfde verhaal als in kernimport) */
          const th = ease(sub(p, .45, .7)), thOp = 1 - ease(sub(p, .78, .92));
          if (th > .01 && thOp > .01) no += `<path d="M${PORE[0] - 10},${PORE[1] - 92} C${PORE[0] - 2},${PORE[1] - 40} ${PORE[0] + 6},${PORE[1] + 10} ${PORE[0] + 4},${PORE[1] + 40} S1040,840 1000,846" pathLength="1000" stroke="${PINK}" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="1000" stroke-dashoffset="${f1(1000 * (1 - th))}" opacity="${f1(thOp)}"/>`;
        }
        $('ad-notes').innerHTML = no;
        /* 'extracellulair'/'cytosol' alleen in het overzicht (stap 6); ingezoomd staan ze in de weg */
        const regOp = step === 6 ? ease(clamp(p / .3)) * .7 : 0;
        $('ad-reg1').setAttribute('opacity', f1(regOp)); $('ad-reg2').setAttribute('opacity', f1(regOp));

        const txnOp = step === 7 ? ease(sub(p, .65, .9)) : 0;
        $('ad-txn').setAttribute('opacity', f1(txnOp));
        /* in de kern: lineair DNA; Pol II zit erop en maakt viraal mRNA (het label belooft dat). Pol II in de app-vorm (bio.js), klem boven,
           leest naar links: het mRNA vertrekt bovenaan aan de achterkant (rechts) en loopt achter het enzym naar beneden */
        $('ad-episome').innerHTML = txnOp > .01
          ? `${linDNA(1000, 1230, 846, { vii: 4 })}${polII(1150, 846, 40, 18, { dir: -1, gul: 11, hoog: 1.9, vul: .4, achter: .5, uit: 1, seed: 12 })}${txt(1146, 832, 'Pol II', '#e8edf7', 17)}
             <path d="M1168,822 C1196,808 1206,842 1214,866 q14,22 44,24 t46,16" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round"/>${txt(1316, 916, T2('viraal mRNA', 'viral mRNA'), C.rna, 20, 'start')}
             ${txt(1080, 900, T2('lineair viraal DNA', 'linear viral DNA'), PINK, 21)}` : '';
      },
    };
  },
};
