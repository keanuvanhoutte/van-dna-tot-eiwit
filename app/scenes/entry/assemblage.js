import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { knopPts, ptsPad, glad } from './_bits.js';
import { blaasje, cisterne, membraanPts, ptsLijn, ribosoomOpER } from '../../bio.js';
import { T, btn, ribo, corona, rnaWave, SPIKE, NPROT } from './_corona.js';

/*
 * Nieuwe virussen in elkaar zetten (zijpad virussen, 05-11-2026). De eiwitten van de virushuid (S, E, M) worden in het ER-membraan
 * gemaakt en reizen naar het ER–Golgi-tussencompartiment (ERGIC); het N-eiwit pakt het nieuwe genoom in (vRNP's); daar knopt het
 * virus af naar het lumen; blaasjes brengen het naar de celrand (exocytose). Bij β-coronavirussen (o.a. SARS-CoV-2) gaat dat via
 * lysosomen, die daarbij minder zuur worden (Ghosh et al. 2020). Bronnen: V'kovski et al. 2021, Klein et al. 2020, Ghosh et al. 2020.
 */
const L3 = (nl, en) => ({ nl, en });
const PM = 1400;                                   // plasmamembraan (verticaal)
const EG = [760, 600, 190, 105];                   // tussencompartiment (ERGIC): cx, cy, rx, ry
const LYSO = '#ff6b6b';
const spikeP = (x, y, ang = 0, op = 1, s = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)}) scale(${f1(s)})"><line x1="0" y1="0" x2="0" y2="-26" stroke="${SPIKE}" stroke-width="6"/><circle cx="0" cy="-30" r="8" fill="${SPIKE}"/></g>`;
const kluwen = (x, y, op = 1, s = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M-30,4 q10,-26 22,-4 t22,2 t18,-6" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  [[-26, 2], [-10, -10], [6, 4], [22, -6], [34, 4]].map(([u, v]) => `<circle cx="${u}" cy="${v}" r="8" fill="${NPROT}" stroke="#0a1224" stroke-width="1.5"/>`).join('') + '</g>';
/* blaasje = lipidedubbellaag rond een lumen; het lysosoom krijgt een rode rand */
const vesicle = (x, y, r, col, op = 1) => col === LYSO ? blaasje(x, y, r, { w: 18, op, lumen: 'rgba(255,107,107,.10)', rand: LYSO }) : blaasje(x, y, r, { w: 18, op, lumen: 'rgba(201,165,116,.08)' });
/* omtrek van twee versmeltende blaasjes (groot c1/R1, klein c2/r): per straal vanuit c1 de verste rand van beide cirkels,
 * daarna gladgemaakt; zo ontstaat bij een kleine overlap een korte hals in plaats van twee kruisende randen */
function versmelt(c1, R1, c2, r, N = 120) {
  const Dx = c2[0] - c1[0], Dy = c2[1] - c1[1], D2 = Dx * Dx + Dy * Dy, P = [];
  for (let i = 0; i < N; i++) {
    const a = i / N * 2 * Math.PI, ux = Math.cos(a), uy = Math.sin(a), b = ux * Dx + uy * Dy, disc = b * b - D2 + r * r;
    const t = disc >= 0 ? Math.max(R1, b + Math.sqrt(disc)) : R1;
    P.push([c1[0] + ux * t, c1[1] + uy * t]);
  }
  return glad(P, 6, true);
}
const KB = 40, KW = 60;                            // afknoppen in het ERGIC: straal van de knop, halve breedte van de basis
const VB = 62, VW = 70;                            // transportblaasje dat rechts uit het ERGIC knopt (stap 3): straal, halve basis

export default {
  id: 'assemblage',
  title: L3('Nieuwe virussen worden binnen in de cel gebouwd', 'New viruses are built inside the cell'),
  scale: L3('virus ≈ 0,1 µm · schematisch', 'virus ≈ 0.1 µm · schematic'),
  time: L3('vanaf enkele uren na de besmetting', 'from a few hours after infection'),
  org: L3('SARS-CoV-2 in een menselijke cel', 'SARS-CoV-2 in a human cell'),
  legend: [[SPIKE, L3('uitsteeksel (sleutel)', 'spike (key)')], [C.rna, L3('RNA van het virus', 'RNA of the virus')], [NPROT, L3('inpakeiwit (N)', 'packing protein (N)')],
    [C.mem, L3('membranen van de cel', 'membranes of the cell')], [LYSO, L3('lysosoom', 'lysosome')]],
  simplified: {
    nl: 'Schematisch: de virushuid bevat naast het uitsteeksel (S) nog twee membraaneiwitten (M en E), die het afknoppen sturen. Het tussencompartiment ligt tussen het ER en het Golgi (ERGIC). Of coronavirussen de cel vooral via lysosomen verlaten, is aangetoond in gekweekte cellen (Ghosh et al. 2020) en nog niet in alle details bevestigd. Een cel maakt veel meer virussen dan getekend.',
    en: 'Schematic: besides the spike (S), the virus coat contains two more membrane proteins (M and E), which steer the budding. The intermediate compartment lies between the ER and the Golgi (ERGIC). That coronaviruses leave the cell mainly via lysosomes has been shown in cultured cells (Ghosh et al. 2020) and is not yet confirmed in every detail. A cell makes many more viruses than drawn.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Het ER maakt de virushuid', 'The ER makes the virus coat'),
      text: L3('Ribosomen op het ER maken de eiwitten voor de virushuid, zoals het uitsteeksel. Ze blijven in het membraan steken.', 'Ribosomes on the ER make the proteins for the virus coat, such as the spike. They stay stuck in the membrane.') },
    { dur: 8000, cam: FULL, title: L3('Een eiwit pakt het RNA in', 'A protein packs the RNA'),
      text: L3('Een ander viruseiwit pakt elke nieuwe RNA-kopie in tot een kluwen.', 'Another virus protein packs each new RNA copy into a bundle.') },
    { dur: 9000, cam: FULL, title: L3('Het virus knopt af naar binnen', 'The virus buds inwards'),
      text: L3('Op een membraan tussen het ER en het Golgi komen huid en kluwen samen. Het virus knopt af naar de binnenkant.', 'On a membrane between the ER and the Golgi, coat and bundle come together. The virus buds off to the inside.') },
    { dur: 9000, cam: FULL, title: L3('Een blaasje brengt het virus naar buiten', 'A vesicle carries the virus out'),
      text: L3('Een blaasje met virussen reist naar de rand van de cel. Het versmelt met het celmembraan en de virussen komen vrij.', 'A vesicle with viruses travels to the edge of the cell. It fuses with the cell membrane and the viruses are released.') },
    { dur: 9000, cam: FULL, title: L3('Een omweg via het lysosoom', 'A detour through the lysosome'),
      text: L3('Coronavirussen gebruiken daarvoor wellicht het afvalblaasje van de cel (lysosoom). Ze maken het minder zuur.', 'Coronaviruses probably use the cell’s waste vesicle (lysosome) for this. They make it less acidic.') },
    { dur: 8500, cam: FULL, title: L3('Elk nieuw virus kan een volgende cel besmetten', 'Each new virus can infect another cell'),
      text: L3('De nieuwe virussen hebben dezelfde sleutel. Ze kunnen meteen een volgende cel besmetten.', 'The new viruses have the same key. They can infect another cell straight away.') },
  ],
  svg() {
    return svgOpen() + `
    <path id="as-cyto" fill="url(#gCyto)" d="M-400,-400 L${PM},-400 L${PM},1300 L-400,1300Z"/>
    ${T(40, 880, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
    ${T(PM + 30, 880, T2('buiten', 'outside'), { size: 24, col: C.muted, anchor: 'start', w: 500 })}
    <g data-node="cel" data-nolabel data-color="${C.mem}"><g id="as-pm">${membraanPts(ptsLijn(PM, -400, PM, 1300), { w: 22 })}</g></g>
    <g data-node="er" data-nolabel data-color="${C.mem}"><g id="as-er"></g></g>
    <g data-node="golgi" data-nolabel data-color="${C.mem}"><g id="as-gol"></g></g>
    <g id="as-eg"></g>
    <g data-node="lysosoom" data-nolabel data-color="${LYSO}"><g id="as-lys"></g></g>
    <g id="as-fx"></g>
    ${btn('schaar', 40, 300, T2('↑ de virusschaar', '↑ the virus scissors'), '#e070ff')}
    ${btn('sleutel', 360, 330, T2('de sleutel opnieuw', 'the key again'), SPIKE)}
    ${btn('faag', 1030, 340, T2('virussen van bacteriën →', 'viruses of bacteria →'), '#c7d2e8')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const ER = [[90, 300, 470], [90, 430, 470], [90, 560, 430]];   // ER-banden: x0, y, x1
    const [ex, ey, erx, ery] = EG;
    /* ERGIC-membraan (ellips); k > 0: bovenaan stulpt een knop naar het lumen (het virus knopt af) */
    const ybK = ey - ery * Math.sqrt(1 - (KW / erx) ** 2);
    const xbV = ex + erx * Math.sqrt(1 - (VW / ery) ** 2);   // basis van het transportblaasje aan de rechterkant
    const ergicPts = (k, kV = 0) => {
      const N = 96, P = [];
      let rechts = false;
      for (let i = 0; i < N; i++) {
        const a = -Math.PI / 2 + 2 * Math.PI * i / N, x = ex + erx * Math.cos(a), y = ey + ery * Math.sin(a);
        if (kV > .005 && x > ex && Math.abs(y - ey) < VW) { if (!rechts) { P.push(...knopPts(xbV, ey - VW, xbV, ey + VW, VW, VB, kV, { step: 5, side: -1 })); rechts = true; } continue; }
        P.push([x, y]);
      }
      if (k <= .005) return P;
      return P.filter(([x, y]) => !(Math.abs(x - ex) < KW && y < ey)).concat(knopPts(ex - KW, ybK, ex + KW, ybK, KW, KB, k, { step: 5 }));
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));

        /* ER met ribosomen en uitsteeksels in het membraan */
        let er = '';
        ER.forEach(([x0, y, x1], i) => {
          // ER-zak: dubbellaag rond een lumen; ribosomen op de buitenkant, het uitsteeksel steekt in het lumen
          er += cisterne((x0 + x1) / 2, y, { len: x1 - x0 + 30, dik: 58, buig: 0, vert: false, w: 10, lumen: 'rgba(143,179,232,.14)' });
          for (let k = 0; k < 3; k++) er += ribosoomOpER(x0 + 70 + k * 140, y - 29, { s: .21, mw: 10 }).svg;   // 60S op het Sec61-kanaal, zoals in er en glyco
          const kS = step === 0 ? ease(sub(p, .25 + i * .1, .6 + i * .1)) : 1;
          for (let k = 0; k < 3; k++) er += spikeP(x0 + 120 + k * (x1 - x0 - 190) / 2, y + 24, 0, kS, .78);   // binnen de zak
        });
        er += T(280, 660, T2('ER', 'ER'), { size: 30, col: C.mem, w: 700 });
        if (step === 0) er += T(280, 186, T2('uitsteeksels in het membraan', 'spikes in the membrane'), { size: 26, col: SPIKE, w: 700, op: ease(sub(p, .55, .75)) });
        $('as-er').innerHTML = er;

        /* Golgi (klein, rechts van het tussencompartiment) */
        let gol = '';
        for (let k = 0; k < 4; k++) gol += cisterne(1160 + k * 6, 240 + k * 34, { len: 180, dik: 14, buig: 15, vert: false, w: 6, lumen: 'rgba(201,165,116,.18)' });
        gol += T(1160, 210, 'Golgi', { size: 28, col: C.mem, w: 700 });
        $('as-gol').innerHTML = gol;

        /* tussencompartiment + kluwens + afknoppen */
        // afknoppen (stap 2): de kluwen zakt op het membraan (p 0–.3), het membraan stulpt rond de kluwen het lumen in (k → .97)
        // en snoert af (p = .75): het nieuwe virus heeft dat stukje membraan als envelop
        const kn = step === 2 && p < .75 ? .97 * ease(sub(p, .25, .72)) : 0;
        /* stap 3: een transportblaasje knopt rechts uit het ERGIC, met het nieuwe virus erin (p .05–.35), en reist naar de celrand */
        const kV = step === 3 && p < .35 ? .97 * ease(sub(p, .05, .33)) : step === 4 && p < .25 ? .97 * ease(sub(p, .03, .24)) : 0;
        const mE = ergicPts(kn, kV);
        let eg = '';
        eg += `<path d="${ptsPad(mE, true)}" fill="rgba(201,165,116,.08)"/>` + membraanPts(mE, { w: 16, closed: true });
        eg += T(ex, ey + ery + 46, T2('tussen ER en Golgi', 'between ER and Golgi'), { size: 26, col: C.mem, w: 700 });
        // uitsteeksels die al in dit membraan zitten
        for (const a of [-60, -30, 30, 60]) eg += spikeP(ex + erx * Math.sin(a * Math.PI / 180) * 1.0, ey - ery * Math.cos(a * Math.PI / 180), a + 180, ph(0, .5, .9), .8);
        // kluwens: RNA + inpakeiwit (stap 1)
        const kK = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .6)) : 1;
        const KL = [[600, 340], [760, 290], [920, 350]];
        KL.forEach(([x, y], i) => {
          if (i === 1 && step >= 2) return;              // deze knopt af
          eg += step === 1 ? rnaWave(x - 34, x + 34, y, 1 - kK, 6) : '';
          eg += kluwen(x, y, kK, 1.5);
        });
        if (step === 1) eg += T(760, 200, T2('RNA + inpakeiwit = kluwen', 'RNA + packing protein = bundle'), { size: 26, col: NPROT, w: 700, op: ease(sub(p, .45, .65)) });
        // afknoppen (stap 2): de kluwen zakt door het membraan en wordt een virus
        if (step >= 2) {
          const y = step > 2 ? ey - 5 : p < .75 ? Math.max(lerp(270, ybK - 26, ease(sub(p, 0, .3))), ybK + KB * (2 * kn - 1))
            : lerp(ybK + KB * .94, ey - 5, ease(sub(p, .75, .95)));
          const toV = step === 2 ? ease(sub(p, .72, .85)) : 1;
          if (step === 2) {
            eg += kluwen(ex, y, 1 - toV, lerp(1.5, .72, ease(sub(p, 0, .3))));
            eg += corona(ex, y, 34, toV);
            if (step === 2) eg += T(ex, ey + 4 + 60, T2('nieuw virus', 'new virus'), { size: 26, col: C.text, w: 700, op: ease(sub(p, .8, .95)) });
          }
        }
        $('as-eg').innerHTML = eg;

        /* blaasje naar de celrand (stap 3) en lysosoom (stap 4) */
        let ly = '', fx = '';
        if (step >= 3) {
          /* één virus (er is er één gemaakt): eerst in de knop van het ERGIC, dan in het losse blaasje, dan naar buiten */
          const go = ph(3, .38, .6), fuse = ph(3, .6, .85), out = ph(3, .75, 1);
          const knopX = Math.max(lerp(ex, xbV - 20, ease(sub(step === 3 ? p : 1, 0, .12))), xbV + VB * (2 * kV - 1));
          const los = step > 3 || p >= .35, x0 = xbV + VB * .94;
          const vx = !los ? knopX : lerp(x0, PM - VB * .94, go), vy = !los ? ey - 5 : lerp(ey - 5, 560, go);
          // versmelten: het blaasje wordt een knop van het celmembraan die openklapt naar buiten en vlak wordt
          if (step === 3 && los && fuse < .02) ly += vesicle(vx, vy, VB, C.mem, 1);
          ly += corona(lerp(vx, PM + 110, out), lerp(vy, 500, out), step === 3 ? lerp(34, 30, ease(sub(p, .3, .5))) : 30, 1);
          if (step === 3) fx += T(1150, 720, T2('blaasje versmelt met het celmembraan', 'vesicle fuses with the cell membrane'), { size: 24, col: C.mem, w: 700, op: ease(sub(p, .55, .75)) });
        }
        if (step === 4 || step === 5) {
          /* een tweede nieuw virus gaat in een blaasje van het ERGIC naar een lysosoom (stippellijn = de weg); het lysosoom
             wordt minder zuur en schuift daarna naar de celrand */
          const k = step === 4 ? ease(sub(p, .0, .25)) : 1;
          const go = step === 4 ? ease(sub(p, .56, 1)) : 1;
          let fuse = false, fuseC = [0, 0, 0], vir = '';
          const lx = lerp(1190, 1250, go), lyy = lerp(620, 500, go);
          if (step === 4 && p < .56) {
            /* het tweede virus knopt in een blaasje rechts uit het ERGIC (p 0–.25), reist naar het lysosoom (.25–.45) en het
               blaasje versmelt ermee: zijn membraan gaat op in dat van het lysosoom (straal → 0) en het virus komt erin (.45–.55) */
            const inKnop = p < .25, x0 = xbV + VB * .94, dT = 92 + VB - 6, tx = lx - dT * .94, ty = lyy - dT * .34;
            const mv = ease(sub(p, .25, .42)), fu = ease(sub(p, .42, .55));
            fuse = !inKnop && mv >= 1;
            const bx = inKnop ? Math.max(lerp(ex + 60, xbV - 20, ease(sub(p, 0, .06))), xbV + VB * (2 * kV - 1)) : lerp(x0, lx + (tx - lx) * (1 - fu), mv);
            const by = inKnop ? ey - 5 : lerp(ey - 5, lyy + (ty - lyy) * (1 - fu), mv);
            fuseC = [bx, by, VB * (1 - fu)];
            if (!inKnop && !fuse) ly += vesicle(bx, by, VB, C.mem, 1);
            vir = corona(lerp(bx, lx - 30, fu), lerp(by, lyy - 20, fu), 26, ease(sub(p, 0, .06)));
          }
          /* lysosoom; tijdens de versmelting één doorlopend membraan met een hals naar het blaasje */
          let lys = vesicle(lx, lyy, 92, LYSO, 1);
          if (fuse && fuseC[2] > 2) {
            const P = versmelt([lx, lyy], 92, [fuseC[0], fuseC[1]], fuseC[2]);
            lys = `<path d="${ptsPad(P, true)}" fill="rgba(255,107,107,.10)"/><path d="${ptsPad(P, true)}" fill="none" stroke="${LYSO}" stroke-width="2.4" opacity=".9" transform="translate(0 0)"/>` + membraanPts(P, { w: 18, closed: true });
          }
          ly += `<g opacity="${f1(k)}">` + lys + corona(lx + 30, lyy + 24, 24) + (step === 5 || p >= .56 ? corona(lx - 30, lyy - 20, 26) : vir) + '</g>';   // het aangevoerde virus zit nu ook in het lysosoom
          ly += T(lx - 70, lyy + 140, T2('lysosoom: minder zuur', 'lysosome: less acidic'), { size: 26, col: LYSO, w: 700, op: k });
        }
        if (step === 5) {
          /* geen extra virus buiten zonder exocytose: het label wijst naar het virus dat in stap 4 naar buiten kwam */
          const k = ease(sub(p, .1, .5));
          fx += T(1590, 400, T2('→ volgende cel', '→ next cell'), { size: 21, col: SPIKE, w: 700, anchor: 'end', op: k });
        }
        $('as-lys').innerHTML = ly;
        const kF = step === 3 ? .97 * (1 - ease(sub(p, .6, .85))) : 0, fz = step === 3 && ph(3, .6, .85) >= .02 && kF > .005;
        const mPM = fz ? knopPts(PM, -400, PM, 1300, 560 + 400, VB, kF) : ptsLijn(PM, -400, PM, 1300);
        $('as-pm').innerHTML = membraanPts(mPM, { w: 22 });
        $('as-cyto').setAttribute('d', 'M-400,-400 L' + ptsPad(mPM).slice(1) + ' L-400,1300Z');
        $('as-fx').innerHTML = fx;
      },
    };
  },
};
