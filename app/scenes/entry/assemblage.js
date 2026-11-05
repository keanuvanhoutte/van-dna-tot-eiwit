import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { bilayer } from './_bits.js';
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
const vesicle = (x, y, r, col, op = 1) => op <= .01 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col === LYSO ? 'rgba(255,107,107,.10)' : 'rgba(201,165,116,.08)'}" stroke="${col}" stroke-width="8" opacity="${f1(op)}"/>`;

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
    <rect x="-400" y="-400" width="${PM + 400}" height="1700" fill="url(#gCyto)"/>
    ${T(40, 880, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
    ${T(PM + 30, 880, T2('buiten', 'outside'), { size: 24, col: C.muted, anchor: 'start', w: 500 })}
    <g data-node="cel" data-nolabel data-color="${C.mem}">${bilayer(`M${PM},-200 L${PM},1200`)}</g>
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
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));

        /* ER met ribosomen en uitsteeksels in het membraan */
        let er = '';
        ER.forEach(([x0, y, x1], i) => {
          er += `<path d="M${x0},${y} L${x1},${y}" stroke="${C.mem}" stroke-width="34" stroke-linecap="round" opacity=".9"/><path d="M${x0},${y} L${x1},${y}" stroke="#2a2240" stroke-width="18" stroke-linecap="round"/>`;
          for (let k = 0; k < 3; k++) er += ribo(x0 + 70 + k * 140, y - 40, .32, 1);
          const kS = step === 0 ? ease(sub(p, .25 + i * .1, .6 + i * .1)) : 1;
          for (let k = 0; k < 3; k++) er += spikeP(x0 + 140 + k * 140, y + 17, 180, kS, .9);
        });
        er += T(280, 660, T2('ER', 'ER'), { size: 30, col: C.mem, w: 700 });
        if (step === 0) er += T(280, 230, T2('uitsteeksels in het membraan', 'spikes in the membrane'), { size: 26, col: SPIKE, w: 700, op: ease(sub(p, .55, .75)) });
        $('as-er').innerHTML = er;

        /* Golgi (klein, rechts van het tussencompartiment) */
        let gol = '';
        for (let k = 0; k < 4; k++) gol += `<path d="M${1070 + k * 6},${240 + k * 34} q90,-30 180,0" stroke="${C.mem}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".8"/>`;
        gol += T(1160, 210, 'Golgi', { size: 28, col: C.mem, w: 700 });
        $('as-gol').innerHTML = gol;

        /* tussencompartiment + kluwens + afknoppen */
        const [ex, ey, erx, ery] = EG;
        const kB = ph(2, .15, .75);                       // afknoppen
        let eg = '';
        eg += `<ellipse cx="${ex}" cy="${ey}" rx="${erx}" ry="${ery}" fill="rgba(201,165,116,.08)" stroke="${C.mem}" stroke-width="10"/>`;
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
          const y = lerp(270, ey - 5, step === 2 ? kB : 1);
          const toV = step === 2 ? ease(sub(p, .6, .9)) : 1;
          const leave = ph(3, .05, .3);
          if (leave < 1) {
            eg += kluwen(ex, y, 1 - toV, 1.5);
            eg += corona(lerp(ex, ex + 120, leave), y, 34, toV * (1 - leave));
            if (step === 2) eg += T(ex, ey + 4 + 60, T2('nieuw virus', 'new virus'), { size: 26, col: C.text, w: 700, op: ease(sub(p, .8, .95)) });
          }
        }
        $('as-eg').innerHTML = eg;

        /* blaasje naar de celrand (stap 3) en lysosoom (stap 4) */
        let ly = '', fx = '';
        if (step >= 3) {
          const go = ph(3, .1, .6), fuse = ph(3, .6, .85), out = ph(3, .75, 1);
          const vx = lerp(ex + 150, PM - 95, go), vy = lerp(ey, 560, go);
          if (fuse < 1 && step === 3) ly += vesicle(vx, vy, 90, C.mem, 1 - fuse);
          const VIR = [[-30, -20], [30, 25]];
          VIR.forEach(([dx, dy], i) => {
            const x = lerp(vx + dx, PM + 80 + i * 60, out), y = lerp(vy + dy, 480 + i * 140, out);
            ly += corona(x, y, 26, 1);
          });
          if (step === 3) fx += T(1150, 720, T2('blaasje versmelt met het celmembraan', 'vesicle fuses with the cell membrane'), { size: 24, col: C.mem, w: 700, op: ease(sub(p, .55, .75)) });
        }
        if (step === 4 || step === 5) {
          const k = step === 4 ? ease(sub(p, .05, .4)) : 1;
          const go = step === 4 ? ease(sub(p, .4, 1)) : 1;
          const lx = lerp(1050, 1260, go), lyy = lerp(560, 470, go);
          ly += `<g opacity="${f1(k)}">` + vesicle(lx, lyy, 92, LYSO, 1) + corona(lx - 30, lyy - 18, 24) + corona(lx + 32, lyy + 26, 24) + '</g>';
          ly += T(lx, lyy + 130, T2('lysosoom: minder zuur', 'lysosome: less acidic'), { size: 26, col: LYSO, w: 700, op: k });
        }
        if (step === 5) {
          const k = ease(sub(p, .1, .5));
          ly += corona(1500, 300, 26, k);
          fx += T(1590, 190, T2('→ volgende cel', '→ next cell'), { size: 28, col: SPIKE, w: 700, anchor: 'end', op: k });
        }
        $('as-lys').innerHTML = ly;
        $('as-fx').innerHTML = fx;
      },
    };
  },
};
