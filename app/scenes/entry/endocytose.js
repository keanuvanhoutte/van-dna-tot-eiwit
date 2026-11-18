import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { blaasje, membraanPts, ptsLijn, ribosoomKlein, eiwit, vATPase, bioDefs } from '../../bio.js';
import { capsid, viralGenome, knopPts, ptsPad, blaasjeOpen, triskelion, lnpParticle, car, PINK, FIBRE, LIP } from './_bits.js';
import { btn } from '../prot/_fate.js';

/* Hoofdstuk 3: van klathrine-put tot endosomale ontsnapping (of afbraak in het lysosoom). */
const MEM = 170, PX = 520;
const KR = 120;                // straal van de klathrinekuil / het nieuwe blaasje (virus + LNP passen erin)
const EE = [650, 440, 108];    // vroeg endosoom
const LE = [900, 605, 126];    // laat endosoom
const LY = [1270, 745, 132];   // lysosoom
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const pHcol = v => v > 6.2 ? '#7fdc6a' : v > 5.8 ? '#ffc247' : v > 5 ? '#ff9d5c' : '#ff6b6b';

export default {
  id: 'endocytose',
  title: { nl: 'Endocytose & endosomale ontsnapping', en: 'Endocytosis & endosomal escape' },
  scale: { nl: '≈ 100 nm (blaasje) – 1 µm (endosoom)', en: '≈ 100 nm (vesicle) – 1 µm (endosome)' },
  time: { nl: 'blaasje in ~1 min, rijping in ~10–30 min', en: 'vesicle in ~1 min, maturation in ~10–30 min' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [['#8fa8ff', { nl: 'klathrine', en: 'clathrin' }], [C.prot, { nl: 'dynamine', en: 'dynamin' }], ['#5fd3e6', { nl: 'v-ATPase (protonpomp)', en: 'v-ATPase (proton pump)' }],
    [C.mem, { nl: 'membraan / endosoom', en: 'membrane / endosome' }], [PINK, { nl: 'adenovirus', en: 'adenovirus' }],
    [LIP, { nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }], ['#ff6b6b', { nl: 'lysosoom', en: 'lysosome' }], [C.rna, 'mRNA']],
  simplified: {
    nl: 'Eén endosoom draagt hier zowel een virus als een lipidenanodeeltje; in werkelijkheid zitten die in aparte blaasjes. De pH-waarden zijn typische waarden (vroeg ≈ 6,5, laat ≈ 5,5, lysosoom ≈ 4,5) en variëren per celtype. Van de klathrine-mand tekenen we enkele triskelia, niet het hele veelvlak; receptoren en adaptoren (AP-2) staan er schematisch, Rab-eiwitten en ESCRT zijn weggelaten. Het adenovirus ontsnapt in werkelijkheid al vroeg, want proteïne VI breekt membranen ook zonder zuur open; hier tonen we beide ontsnappingen na elkaar om het overzichtelijk te houden.',
    en: 'A single endosome here carries both a virus and a lipid nanoparticle; in reality these travel in separate vesicles. The pH values are typical (early ≈ 6.5, late ≈ 5.5, lysosome ≈ 4.5) and vary between cell types. Of the clathrin cage we draw a few triskelia, not the whole polyhedron; receptors and adaptors (AP-2) are schematic, Rab proteins and ESCRT are omitted. In reality adenovirus escapes early, since protein VI ruptures membranes without acid as well; here both escapes are shown one after the other to keep it clear.' },
  steps: [
    ST(6000, cam(PX, 200, 860), 'De cel verzamelt vracht', 'The cell gathers cargo',
      'Helper-eiwitten brengen receptoren met hun vracht samen op één klein stukje membraan.',
      'Helper proteins bring receptors with their cargo together on one small patch of membrane.'),
    ST(6000, cam(PX, 250, 820), 'Het membraan stulpt in', 'The membrane folds inward',
      'Het eiwit klathrine vormt een gebogen mandje. Daardoor stulpt het membraan naar binnen.',
      'The protein clathrin forms a curved cage. This makes the membrane fold inward.'),
    ST(6000, cam(PX, 300, 720), 'Het blaasje komt los', 'The vesicle comes free',
      'Het eiwit dynamine draait als een spiraal om de hals en knijpt die dicht. Het blaasje komt los.',
      'The protein dynamin winds around the neck like a spiral and squeezes it shut. The vesicle comes free.'),
    ST(7000, cam(600, 400, 900), 'Het blaasje wordt zuur', 'The vesicle turns acidic',
      'Het mandje valt eraf en het blaasje gaat op in een sorteerstation (endosoom). Een pomp maakt het binnenin zuur.',
      'The cage falls off and the vesicle merges with a sorting station (endosome). A pump makes the inside acidic.'),
    ST(7000, cam(870, 560, 1100), 'Steeds zuurder', 'More and more acidic',
      'Het endosoom wordt nog zuurder. Veel virussen en vaccinbolletjes gebruiken dat als seintje om te ontsnappen.',
      'The endosome becomes even more acidic. Many viruses and vaccine particles use this as their cue to escape.'),
    ST(7000, cam(830, 590, 820), 'Het adenovirus breekt uit', 'Adenovirus breaks out',
      'Het adenovirus heeft het zuur niet nodig: een eigen eiwit kan de wand van het blaasje ook zo openbreken.',
      'Adenovirus does not need the acid: one of its own proteins can break the vesicle wall open anyway.'),
    ST(7000, cam(1010, 570, 900), 'Het vaccin-mRNA ontsnapt', 'The vaccine mRNA escapes',
      'In het zure blaasje worden de vetten die het mRNA vasthouden positief. De wand wordt zwak en wat mRNA komt vrij.',
      'In the acidic vesicle, the fats that hold the mRNA become positive. The wall weakens and some mRNA gets out.'),
    ST(6000, cam(1200, 700, 860), 'De rest wordt afgebroken', 'The rest is broken down',
      'De meeste vracht ontsnapt niet. Ze belandt in de afvalverwerking van de cel (lysosoom) en wordt afgebroken.',
      'Most of the cargo does not escape. It ends up in the cell’s waste processor (lysosome) and is broken down.'),
    ST(7000, cam(820, 500, 1450), 'Twee wegen na de ontsnapping', 'Two paths after the escape',
      'Het virus reist verder naar de kern. Het vrije mRNA wordt meteen door ribosomen gelezen.',
      'The virus travels on to the nucleus. The released mRNA is read by ribosomes straight away.'),
  ],

  svg() {
    return svgOpen(bioDefs) + `
    <path id="en-cyto" fill="url(#gCyto)" d="M-400,${MEM} L2000,${MEM} L2000,1600 L-400,1600Z"/>
    <text x="210" y="${MEM - 36}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('extracellulair', 'extracellular')}</text>
    <text x="210" y="${MEM + 60}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">cytosol</text>
    <g id="en-mem">${membraanPts(ptsLijn(-400, MEM, 2000, MEM), { w: 22 })}</g>
    <g id="en-clath"></g>
    <g id="en-rec"></g>
    <g id="en-vatp"></g>

    <g data-node="adeno" data-color="${PINK}" data-label="${T2('Adenovirus-capside', 'Adenovirus capsid')}">
      <g id="en-virus"></g><circle id="en-virus-a" data-anchor="adeno" cx="${PX}" cy="250" r="1" fill="none"/>
    </g>
    <g data-node="lnp" data-color="${LIP}" data-label="${T2('mRNA-lipidenanodeeltje', 'mRNA lipid nanoparticle')}">
      <g id="en-lnp"></g><circle id="en-lnp-a" data-anchor="lnp" data-pos="below" cx="${PX + 70}" cy="330" r="1" fill="none"/>
    </g>
    <g id="en-ves" pointer-events="none"></g>
    <g data-node="cel" data-color="#ff6b6b" data-label="${T2('Lysosoom · afbraak', 'Lysosome · degradation')}" id="en-lyso" opacity="0">
      <circle data-anchor="cel" data-pos="below" cx="${LY[0]}" cy="${LY[1] + LY[2] + 10}" r="1" fill="none"/>
      <g id="en-lyso-body"></g>
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Naar de kernporie', 'On to the nuclear pore')}" id="en-tonuc" opacity="0">
      <circle data-anchor="kernimport" cx="320" cy="690" r="1" fill="none"/>
      <rect x="170" y="700" width="300" height="52" rx="14" fill="rgba(155,123,255,.10)" stroke="${C.prot}" stroke-dasharray="6 5"/>
      ${txt(320, 733, T2('kernporie →', 'nuclear pore →'), C.prot, 21)}
    </g>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T2('Ribosomen lezen het mRNA', 'Ribosomes read the mRNA')}" id="en-ribo" opacity="0">
      <circle data-anchor="translatie" cx="1210" cy="360" r="1" fill="none"/>
      <g id="en-ribo-body"></g>
    </g>
    <g id="en-notes"></g>
    ${btn('viruskopie', 1140, 400, T2('een RNA-virus aan het werk →', 'an RNA virus at work →'), C.rna, 188)}
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* kuil: k = 0 vlak … .97 bijna afgesnoerd (knop naar het cytosol) */
    const kuil = (step, p) => step === 1 ? .75 * ease(sub(p, .15, .9)) : step === 2 && p < .5 ? lerp(.75, .97, ease(sub(p, 0, .45))) : 0;
    /* plaats op het membraan van de kuil op booglengte sK vanaf het midden; off > 0 = naar het cytosol. Geeft [x, y, draaihoek]. */
    const opKnop = (sK, off, k) => {
      const kk = Math.min(.985, Math.max(0, k)), c = KR * (2 * kk - 1), th0 = Math.acos(Math.max(-1, Math.min(1, -c / KR))), th = sK / KR;
      if (Math.abs(th) <= th0) return [PX + (KR + off) * Math.sin(th), MEM + c + (KR + off) * Math.cos(th), -th * 180 / Math.PI];
      return [PX + Math.sign(sK) * (KR * Math.sin(th0) + Math.abs(sK) - KR * th0), MEM + off, 0];
    };
    /* positie + straal van het blaasje per stap */
    const cargo = (step, p) => {
      // stap 0–1: de vracht ligt buiten op het membraan en zakt mee in de kuil; stap 2 (p ≥ .5): los blaasje
      if (step <= 1 || (step === 2 && p < .5)) return [PX, Math.max(MEM - 52, MEM + KR * (2 * kuil(step, p) - 1)), 0, 7.4];
      // los blaasje: meteen helemaal onder het plasmamembraan (geen overlap van beide dubbellagen), dan iets verder het cytosol in
      if (step === 2) return [PX, lerp(MEM + KR + 23, 320, ease(sub(p, .5, .9))), KR, 7.0];
      if (step === 3) { const u = ease(sub(p, .1, .8)); return [lerp(PX, EE[0], u), lerp(320, EE[1], u), lerp(KR, EE[2], u), lerp(6.9, 6.5, u)]; }
      if (step === 4) { const u = ease(sub(p, .1, .85)); return [lerp(EE[0], LE[0], u), lerp(EE[1], LE[1], u), lerp(EE[2], LE[2], u), lerp(6.5, 5.5, u)]; }
      if (step <= 6) return [LE[0], LE[1], LE[2], 5.5];
      if (step === 7) { const u = ease(sub(p, .1, .7)); return [lerp(LE[0], LY[0], u), lerp(LE[1], LY[1], u), lerp(LE[2], LY[2], u), lerp(5.5, 4.5, u)]; }
      return [LY[0], LY[1], LY[2], 4.5];
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;
        const [cx, cy, cr, pH] = cargo(step, p);

        /* membraan */
        const kn = kuil(step, p);
        const mP = knopPts(-400, MEM, 2000, MEM, PX + 400, KR, kn);
        $('en-cyto').setAttribute('d', ptsPad(mP) + ' L2000,1600 L-400,1600Z');   // binnenin de kuil is het nog 'buiten'
        $('en-mem').innerHTML = membraanPts(mP, { w: 22 });

        /* klathrine */
        let cl = '';
        const clOn = step === 0 ? ease(sub(p, .55, .95)) * .5 : step === 1 ? ease(sub(p, .2, .8))
          : step === 2 ? 1 : step === 3 ? 1 - ease(sub(p, 0, .35)) : 0;
        if (clOn > .01) {
          if (step <= 1 || (step === 2 && p < .5)) {
            for (let i = -4; i <= 4; i++) {
              // ver genoeg van het membraan dat de poten (≈ 26 px) nooit tot aan de buitenkant reiken: klathrine zit enkel aan de cytosolkant
              const [x, y, a] = opKnop(i * 48, 42, kn);
              cl += triskelion(x, y, i * 27 + a, .86, '#8fa8ff', clOn * clamp(1.15 - Math.abs(i) / 5.5) * clamp((y - MEM - 30) / 15));
            }
          } else {
            for (let i = 0; i < 7; i++) {
              const a = i * 51 + 20;
              const tx = cx + Math.cos(a * Math.PI / 180) * (cr + 42), ty = cy + Math.sin(a * Math.PI / 180) * (cr + 42);
              cl += triskelion(tx, ty, a, .9, '#8fa8ff', clOn * clamp((ty - MEM - 45) / 20));   // nooit boven het plasmamembraan (buiten de cel)
            }
          }
        }
        if (step === 2) {
          // dynamine: ringen rond de hals van de kuil; weg zodra het blaasje los is
          const c = KR * (2 * Math.min(.985, kn || .97) - 1), hc = KR * Math.sin(Math.acos(Math.max(-1, Math.min(1, -c / KR))));
          cl += `<g opacity="${f1(1 - ease(sub(p, .5, .7)))}">
            ${[0, 1].map(i => `<ellipse cx="${PX}" cy="${f1(MEM - 4 + i * 13)}" rx="${f1(hc + 14)}" ry="8" fill="none" stroke="${C.prot}" stroke-width="6"/>`).join('')}</g>`;
        }
        $('en-clath').innerHTML = cl;

        /* receptoren (in het membraan, binden de vracht) en adaptoren (AP-2, aan de cytosolkant, binden receptor én klathrine) */
        let rc = '';
        const recOn = step === 0 ? ease(sub(p, .05, .4)) : step === 1 ? 1 : step === 2 ? 1 - ease(sub(p, .7, .95)) : 0;
        const apOn = step === 0 ? ease(sub(p, .3, .6)) : step === 1 ? 1 : step === 2 ? 1 - ease(sub(p, .45, .6)) : 0;
        if (recOn > .01) for (const k of [-1, 1]) {
          const losNu = step === 2 && p >= .5;
          const [x, y, a] = losNu ? [cx + k * Math.sin(24 * Math.PI / 180) * cr, cy + Math.cos(24 * Math.PI / 180) * cr, -k * 24] : opKnop(k * 50, -5, kn);
          rc += `<g opacity="${f1(recOn)}" transform="rotate(${f1(a)} ${f1(x)} ${f1(y)})">${car(x, y, -1, 1.2)}</g>`;
          if (apOn > .01 && !losNu) { const [ax, ay] = opKnop(k * 50, 34, kn); rc += eiwit(ax, ay, 15, 10, '#8fa8ff', { seed: 40 + k, op: apOn, bumps: .1 }); }
        }
        $('en-rec').innerHTML = rc;

        /* endosoom / lysosoom */
        let ves = '';
        if (step >= 2 && step < 8 && cr > 4) {
          // gaten: links waar het virus uitbreekt (stap 5), rechtsboven waar het mRNA ontsnapt (stap 6)
          const gaten = [];
          if (step === 5 && p > .4) { const k = ease(sub(p, .4, .55)); gaten.push([185 - 34 * k, 185 + 34 * k]); }
          if (step === 6) { gaten.push([166, 204]); if (p > .5) { const k = ease(sub(p, .5, .62)); gaten.push([330 - 16 * k, 330 + 16 * k]); } }
          ves = gaten.length ? blaasjeOpen(cx, cy, cr, gaten, { w: 20 })
            : step >= 7 ? blaasje(cx, cy, cr, { w: 20, lumen: 'rgba(255,107,107,.10)', rand: '#ff6b6b' })
            : blaasje(cx, cy, cr, { w: 20 });
          if (step >= 3) ves += `<g><rect x="${f1(cx - 62)}" y="${f1(cy - cr - 54)}" width="124" height="38" rx="12" fill="#0b1224" stroke="${pHcol(pH)}" stroke-width="2.5"/>
            ${txt(cx, cy - cr - 27, `pH ${L({ nl: pH.toFixed(1).replace('.', ','), en: pH.toFixed(1) })}`, pHcol(pH), 24)}</g>`;
        }
        $('en-ves').innerHTML = ves;

        /* v-ATPase-pompen op het endosoom */
        let vat = '';
        if (step >= 3 && step <= 4 && cr > 40) {
          for (const a of [-150, -35, 85]) {
            const x = cx + Math.cos(a * Math.PI / 180) * cr, y = cy + Math.sin(a * Math.PI / 180) * cr;
            vat += vATPase(x, y, a * Math.PI / 180, { s: .6, k: 1 });     // V0 in het membraan, V1-kop naar buiten (cytosol); H⁺ naar het lumen
            const ph = (tt * 60 + a) % 60 / 60;
            vat += `${txt(x - Math.cos(a * Math.PI / 180) * (26 + ph * 30), y - Math.sin(a * Math.PI / 180) * (26 + ph * 30), 'H⁺', '#ff9d5c', 20)}`;
          }
          if (step === 3) vat += `<g opacity="${f1(ease(sub(p, .5, .85)))}">${txt(EE[0], EE[1] + 178, T2('v-ATPase pompt H⁺ naar binnen', 'v-ATPase pumps H⁺ inward'), '#5fd3e6', 22)}</g>`;
        }
        $('en-vatp').innerHTML = vat;

        /* vracht: virus + LNP. Tot het blaasje los is, zitten ze vast aan receptoren in het membraan van de kuil (opKnop);
           daarna schuiven ze naar het midden van het blaasje (zelfde plaats bij de overgang: geen sprong). */
        const los = step > 2 || (step === 2 && p >= .5);
        const off = cr > 40 ? cr * .42 : 50, R0 = KR - 70, jx = R0 * Math.sin(50 / KR), jy = R0 * Math.cos(50 / KR);
        const uL = step === 2 ? ease(sub(p, .55, .95)) : 1;
        const vrachtXY = k => !los ? opKnop(k * 50, -70, kn) : step === 2 ? [cx + k * lerp(jx, off, uL), cy + lerp(jy, 0, uL)] : [cx + k * off, cy];
        let [vx, vy] = vrachtXY(-1), esc = 0;
        if (step === 5 && p > .5) { esc = ease(sub(p, .5, 1)); vx = lerp(cx - off, cx - cr - 95, esc); vy = lerp(cy, cy - 30, esc); }
        if (step >= 6) { vx = LE[0] - LE[2] - 95; vy = LE[1] - 30; }
        if (step === 8) { const u = ease(sub(p, .15, .85)); vx = lerp(LE[0] - LE[2] - 95, 560, u); vy = lerp(LE[1] - 30, 630, u); }
        const vOp = 1;                       // het ontsnapte virus blijft in beeld (het wordt niet afgebroken)
        $('en-virus').innerHTML = `<g transform="translate(${f1(vx)} ${f1(vy)})" opacity="${f1(vOp)}">${capsid(36, { fibre: 18, missing: [1, 4], op: 1 })}</g>`;
        $('en-virus-a').setAttribute('cx', f1(vx)); $('en-virus-a').setAttribute('cy', f1(vy - 60));

        let [lx, ly] = vrachtXY(1);
        if (step >= 7) { lx = cx + cr * .3; ly = cy; }
        const lOp = step === 7 && p > .75 ? 1 - ease(sub(p, .75, 1)) * .7 : 1;
        $('en-lnp').innerHTML = `<g transform="translate(${f1(lx)} ${f1(ly)})" opacity="${f1(lOp)}">${lnpParticle(36, 1, { protonated: step >= 6 ? (step === 6 ? ease(sub(p, .1, .5)) : 1) : 0 })}</g>`;
        $('en-lnp-a').setAttribute('cx', f1(lx)); $('en-lnp-a').setAttribute('cy', f1(ly + 56));
        $('en-lnp-a').setAttribute('data-pos', step === 0 ? 'above' : 'below');   // stap 1: label boven het deeltje (niet op het membraan)
        if (step === 0) { $('en-lnp-a').setAttribute('cx', f1(lx + 40)); $('en-lnp-a').setAttribute('cy', f1(ly - 95)); }   // hoger dan het adenoviruslabel: geen overlap

        /* lysosoom */
        const lyOn = step >= 7 ? (step === 7 ? ease(sub(p, .55, .95)) : 1) : 0;
        $('en-lyso').setAttribute('opacity', f1(lyOn));
        $('en-lyso-body').innerHTML = lyOn > .01
          ? `${blaasje(LY[0], LY[1], LY[2], { w: 20, lumen: 'rgba(255,107,107,.11)', rand: '#ff6b6b' })}
             ${[[-60, -40], [40, -70], [70, 30], [-30, 60], [0, -10]].map(([a, b], i) => `<path d="M${LY[0] + a},${LY[1] + b} q10,-12 20,0 t18,4" stroke="#ff9f9f" stroke-width="4" fill="none" opacity=".8"/>`).join('')}
             ${txt(LY[0], LY[1] - LY[2] - 76, T2('hydrolasen breken alles af', 'hydrolases degrade everything'), '#ff9f9f', 21)}` : '';

        /* vrijgekomen mRNA + ribosomen */
        const rOn = step === 6 ? ease(sub(p, .55, .95)) : step >= 7 ? 1 : 0;
        $('en-ribo').setAttribute('opacity', f1(rOn));
        if (rOn > .01) {
          const x0 = LE[0] + LE[2] + 40, y0 = LE[1] - 60;
          const u = step === 6 ? ease(sub(p, .6, 1)) : 1;
          const x1 = lerp(x0, 1160, u), y1 = lerp(y0, 400, u);
          $('en-ribo-body').innerHTML = (step === 6 ? `<path d="M${f1(x0)},${f1(y0)} Q${f1((x0 + x1) / 2 + 60)},${f1((y0 + y1) / 2 - 80)} ${f1(x1)},${f1(y1)}" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="10 8" opacity=".6"/>` : '') + `
            <path d="M${f1(x1 - 60)},${f1(y1)} q16,-14 32,0 t32,0 t32,0" stroke="${C.rna}" stroke-width="5" fill="none"/>
            ${[0, 1, 2].map(i => { const rx = x1 - 44 + i * 34, ry = y1 + (i % 2 ? 7 : -7) - 5; /* mRNA tussen de twee eenheden; vrij ribosoom: grote eenheid boven, keten naar boven */ return ribosoomKlein(rx, ry, { s: 1.15, rot: 180 }) +
              `<path d="M${f1(rx)},${f1(ry - 14)} q${f1(-6 - i * 3)},${f1(-8 - i * 4)} ${f1(2 + i * 2)},${f1(-14 - i * 7)}" stroke="${C.chain}" stroke-width="3" fill="none" stroke-linecap="round"/>`; }).join('')}
            ${txt(x1 + 76, y1 + 8, 'mRNA', C.rna, 22, 'start')}`;
        } else $('en-ribo-body').innerHTML = '';

        $('en-tonuc').setAttribute('opacity', f1(step === 8 ? ease(sub(p, .3, .7)) : 0));

        /* notities */
        let no = '';
        if (step === 0) no += `<g opacity="${f1(ease(sub(p, .25, .6)))}">${txt(PX + 250, MEM - 70, T2('vracht + receptoren', 'cargo + receptors'), C.muted, 22)}
          <line x1="${PX + 180}" y1="${MEM - 62}" x2="${PX + 62}" y2="${MEM - 22}" stroke="${C.muted}" stroke-width="2"/>
          ${txt(PX - 250, MEM + 100, T2('adaptoren kiezen de vracht', 'adaptors select the cargo'), '#8fa8ff', 21)}
          <line x1="${PX - 170}" y1="${MEM + 86}" x2="${PX - 66}" y2="${MEM + 38}" stroke="#8fa8ff" stroke-width="2"/></g>`;
        if (step === 5) {
          no += `<g opacity="${f1(ease(sub(p, .15, .5)))}">${txt(LE[0] - 240, LE[1] + 190, T2('proteïne VI steekt in het membraan', 'protein VI inserts into the membrane'), '#ff9d5c', 22)}
            ${[0, 1, 2, 3].map(i => `<path d="M${LE[0] - LE[2] - 4 + i * 6},${LE[1] - 70 + i * 26} q14,-8 26,2" stroke="#ff9d5c" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
        }
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .2, .55)))}">${txt(LE[0] + 110, LE[1] + 175, T2('slechts enkele procenten van het mRNA ontsnapt', 'only a few per cent of the mRNA escapes'), LIP, 21)}</g>`;
        if (step === 8) {
          /* de twee uitkomsten staan in de vakjes 'kernporie →' en bij de ribosomen; geen extra tekst */
        }
        $('en-notes').innerHTML = no;
      },
    };
  },
};
