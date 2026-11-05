import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T, btn, ribo, rnaWave, scissors, dmv, CUT, COPY } from './_corona.js';

/*
 * Het virus laat zich kopiëren (zijpad virussen, 05-11-2026). Het (+)RNA-genoom van SARS-CoV-2 (29 903 nt) wordt meteen door
 * ribosomen van de cel vertaald tot de polyproteïnen pp1a en pp1ab (−1-ribosomale frameshift, alleen in de uitleg); de virale
 * proteasen (PLpro in nsp3, Mpro = nsp5) knippen die in 15–16 niet-structurele eiwitten (nsp1–16). Die vormen het replicatie-
 * en transcriptiecomplex met het RNA-afhankelijke RNA-polymerase (nsp12) in blaasjes met een dubbel membraan, afgeleid van het ER;
 * een moleculaire porie (nsp3) laat RNA naar het cytosol. Bronnen: V'kovski et al. 2021, Snijder et al. 2020, Wolff et al. 2020.
 */
const L3 = (nl, en) => ({ nl, en });
const RY = 250, X0 = 150, X1 = 1110, CY = 380;            // RNA-hoogte, begin/einde van het genoom, hoogte van de keten
const N = 16, SEG = (X1 - X0) / N;                          // 16 stukken (nsp1–16)
const MACH = [3, 6, 7, 9, 10, 11, 12, 13];                  // stukken die (o.a.) de kopieermachine vormen (nsp3–4–6 membraan, nsp7–8–12 polymerase, 9, 10, 13)
const SEGCOL = i => MACH.includes(i) ? (i === 11 ? COPY : C.prot) : ['#7fdc6a', '#5fb85a', '#a6e38f'][i % 3];
const DV = [[1270, 650, 120], [1060, 720, 78], [1480, 720, 80]];   // blaasjes met dubbel membraan
const MX = 1270, MY = 650;                                  // plaats van de kopieermachine

export default {
  id: 'viruskopie',
  title: L3('Het virus laat onze cel zijn RNA kopiëren', 'The virus makes our cell copy its RNA'),
  scale: L3('genoom ≈ 30 000 letters · blaasjes ≈ 0,3 µm', 'genome ≈ 30,000 letters · vesicles ≈ 0.3 µm'),
  time: L3('eerste uren na de besmetting', 'first hours after infection'),
  org: L3('SARS-CoV-2 in een menselijke cel', 'SARS-CoV-2 in a human cell'),
  legend: [[C.rna, L3('RNA van het virus', 'RNA of the virus')], [C.rrna, L3('ribosoom van de cel', 'ribosome of the cell')], [C.chain, L3('lange eiwitketen en zijn stukken', 'long protein chain and its pieces')],
    [CUT, L3('schaar van het virus', 'scissors of the virus')], [C.prot, L3('stukken van de kopieermachine', 'pieces of the copying machine')], [C.mem, L3('blaasje met dubbel membraan', 'vesicle with a double membrane')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het genoom codeert eigenlijk twee lange ketens: een kortere en (door een “verspringing” van het ribosoom, een −1-frameshift) een langere; samen leveren ze 16 stukken (nsp1–16). De stukken bovenaan bevatten twee virusscharen (PLpro en Mpro), die zichzelf en de rest losknippen. Het kopiëren gebeurt via een tussenkopie met de omgekeerde letters (een −RNA); de eiwitten voor de virushuid worden van kortere boodschappers gemaakt. Het poortje in de wand van het blaasje is met een elektronenmicroscoop in beeld gebracht; dat het RNA daar naar buiten gaat, is het voorstel van de onderzoekers. Er zijn veel meer blaasjes dan getekend.',
    en: 'Schematic and not to scale. The genome actually codes for two long chains: a shorter one and (through a “slip” of the ribosome, a −1 frameshift) a longer one; together they yield 16 pieces (nsp1–16). The pieces at the top include two virus scissors (PLpro and Mpro), which cut themselves and the rest loose. Copying goes through an intermediate copy with the opposite letters (a −RNA); the proteins for the virus coat are made from shorter messengers. The gate in the vesicle wall has been imaged with an electron microscope; that the RNA leaves through it is the researchers’ proposal. There are many more vesicles than drawn.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Het virus-RNA werkt meteen als boodschap', 'The virus RNA works as a message straight away'),
      text: L3('Het RNA van dit virus lijkt op ons eigen mRNA. Onze ribosomen lezen het meteen af.', 'The RNA of this virus looks like our own mRNA. Our ribosomes read it straight away.') },
    { dur: 8500, cam: FULL, title: L3('Eerst ontstaat één lange keten', 'First one long chain is made'),
      text: L3('De ribosomen maken één heel lange eiwitketen. Zo werkt die nog niet.', 'The ribosomes make one very long protein chain. Like this it does not work yet.') },
    { dur: 9000, cam: FULL, title: L3('De keten wordt in stukken geknipt', 'The chain is cut into pieces'),
      text: L3('Schaartjes in de keten knippen zichzelf en de rest los. Zo ontstaan zestien losse eiwitten.', 'Scissors inside the chain cut themselves and the rest loose. This gives sixteen separate proteins.') },
    { dur: 8500, cam: FULL, title: L3('De stukken bouwen een kopieermachine', 'The pieces build a copying machine'),
      text: L3('Een deel van de stukken vormt samen een kopieermachine voor RNA.', 'Some of the pieces together form a copying machine for RNA.') },
    { dur: 9000, cam: FULL, title: L3('Kopiëren in een beschermd blaasje', 'Copying inside a protected vesicle'),
      text: L3('Het virus vervormt het ER tot blaasjes met een dubbel membraan. Daarin maakt de machine kopieën van het RNA.', 'The virus reshapes the ER into vesicles with a double membrane. Inside, the machine makes copies of the RNA.') },
    { dur: 9000, cam: FULL, title: L3('Nieuwe kopieën gaan door een poortje naar buiten', 'New copies leave through a small gate'),
      text: L3('De kopieën verlaten het blaasje door een poortje. Ze worden opnieuw afgelezen of ingepakt in nieuwe virussen.', 'The copies leave the vesicle through a small gate. They are read again or packed into new viruses.') },
  ],
  svg() {
    return svgOpen() + `
    <rect x="-400" y="-400" width="2400" height="1700" fill="url(#gCyto)"/>
    ${T(40, 880, 'cytosol', { size: 24, col: C.muted, anchor: 'start', w: 500 })}
    <g data-node="er" data-nolabel data-color="${C.mem}"><g id="vk-er"></g></g>
    <g data-node="baltimore" data-nolabel data-color="${C.rna}"><g id="vk-rna"></g></g>
    <g data-node="translatie" data-nolabel data-color="${C.rrna}"><g id="vk-ribo"></g></g>
    <g data-node="schaar" data-nolabel data-color="${CUT}"><g id="vk-chain"></g></g>
    <g id="vk-fx"></g>
    ${btn('baltimore', 40, 330, T2('↑ soorten virussen', '↑ kinds of viruses'), C.trna)}
    ${btn('translatie', 390, 340, T2('hoe een ribosoom leest', 'how a ribosome reads'), C.rrna)}
    ${btn('schaar', 1190, 370, T2('de schaar in 3D →', 'the scissors in 3D →'), CUT)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));

        /* ER en blaasjes (vanaf stap 4) */
        const kEr = ph(4, 0, .35);
        let er = '';
        if (kEr > .01) {
          er += `<path d="M900,860 C1000,800 1120,830 1180,790 M1360,790 C1420,830 1520,800 1640,850" stroke="${C.mem}" stroke-width="12" fill="none" opacity="${f1(kEr * .8)}" stroke-linecap="round"/>`;
          DV.forEach(([x, y, r], i) => { er += dmv(x, y, r * (i ? ph(4, .2, .55) : ph(4, .05, .4)), kEr); });
          er += T(1270, 830, T2('ER → blaasjes met dubbel membraan', 'ER → vesicles with a double membrane'), { size: 24, col: C.mem, op: ph(4, .4, .6) });
          // poortje bovenaan het grote blaasje (stap 5)
          const kP = ph(5, 0, .25);
          if (kP > .01) er += `<g opacity="${f1(kP)}"><rect x="1250" y="512" width="40" height="34" rx="6" fill="${C.prot2}" stroke="#0a1224" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="${1248 + i * 12}" y="500" width="8" height="14" rx="3" fill="${C.prot2}"/>`).join('')}</g>` +
            T(1360, 500, T2('poortje', 'gate'), { size: 24, col: C.text, anchor: 'start', op: kP });
        }
        $('vk-er').innerHTML = er;

        /* het genoom (+RNA) met 5'-kap */
        const kRna = step === 0 ? ease(sub(p, 0, .2)) : 1;
        $('vk-rna').innerHTML = `<g opacity="${f1(.35 + .65 * kRna)}">${rnaWave(X0, X1, RY, 1, 8)}<circle cx="${X0 - 12}" cy="${RY}" r="12" fill="${C.cap}"/></g>` +
          T(X0 - 10, RY - 50, T2('RNA van het virus', 'RNA of the virus'), { size: 26, col: C.rna, anchor: 'start', w: 700, op: step <= 1 ? 1 : .6 });

        /* ribosomen: lopen over het RNA (stap 0–1), daarna verder in rust */
        const run = step === 0 ? .35 * ease(sub(p, .25, 1)) : step === 1 ? .35 + .65 * ease(sub(p, 0, .9)) : 1;
        let rb = '';
        const rOp = step <= 2 ? 1 : step === 3 ? 1 - .6 * ease(sub(p, 0, .4)) : .4;
        for (let k = 0; k < 3; k++) {
          const u = Math.max(0, run - k * .22);
          if (step === 0 && k > 0 && u <= 0) continue;
          rb += ribo(lerp(X0 + 40, X1 - 30, Math.min(1, u)), RY + 4, .55, rOp);
        }
        if (step === 0) rb += T(560, RY + 95, T2('ribosomen van de cel', 'ribosomes of the cell'), { size: 26, col: C.rrna, w: 700, op: ease(sub(p, .4, .6)) });
        $('vk-ribo').innerHTML = rb;

        /* de lange keten (stap 1) → stukken (stap 2) → kopieermachine (stap 3–5) */
        let ch = '', fx = '';
        const grow = step < 1 ? 0 : step === 1 ? ease(sub(p, .05, .9)) : 1;
        const cut = ph(2, .35, .8), gather = ph(3, .1, .75), sink = ph(4, .1, .7);
        if (grow > 0) {
          const xEnd = lerp(X0, X1, grow);
          for (let i = 0; i < N; i++) {
            const a = X0 + i * SEG, b = Math.min(X0 + (i + 1) * SEG, xEnd);
            if (b <= a) break;
            const dy = cut * (i % 2 ? 46 : 14), gap = cut * 6;
            let x0 = a + gap, x1 = b - gap, y = CY + dy;
            let op = 1;
            if (MACH.includes(i) && gather > 0) {           // naar de machine
              const mi = MACH.indexOf(i), ang = mi / MACH.length * 2 * Math.PI;
              const tx = lerp(1270, MX, sink) + Math.cos(ang) * 34, ty = lerp(420, MY, sink) + Math.sin(ang) * 26;
              const cx = lerp((x0 + x1) / 2, tx, gather), cy2 = lerp(y, ty, gather), hw = lerp((x1 - x0) / 2, 16, gather);
              x0 = cx - hw; x1 = cx + hw; y = cy2;
            } else if (gather > 0) op = 1 - .45 * gather - .35 * sink;
            ch += `<path d="M${f1(x0)},${f1(y)} L${f1(x1)},${f1(y)}" stroke="${cut > .02 ? SEGCOL(i) : C.chain}" stroke-width="16" stroke-linecap="round" opacity="${f1(op)}"/>`;
          }
          if (step === 1) ch += T(lerp(X0, X1, grow) / 2 + X0 / 2, CY + 60, T2('één lange eiwitketen', 'one long protein chain'), { size: 26, col: C.chain, w: 700, op: ease(sub(p, .3, .5)) });
        }
        // scharen op de knipplekken (stap 2)
        if (step === 2) {
          const kS = ease(sub(p, .05, .3)) * (1 - ease(sub(p, .85, 1)) * .6);
          for (let i = 1; i < N; i++) ch += scissors(X0 + i * SEG, CY - 34, .7, kS, Math.abs(Math.sin(p * 9 + i)) * .8);
          fx += T(630, CY + 140, T2('16 losse eiwitten', '16 separate proteins'), { size: 28, col: C.text, w: 700, op: ease(sub(p, .65, .85)) });
        }
        // de machine (stap 3+)
        if (gather > .6) {
          const mx = lerp(1270, MX, sink), my = lerp(420, MY, sink), o = ease(sub(gather, .6, 1));
          ch = `<ellipse cx="${f1(mx)}" cy="${f1(my)}" rx="62" ry="50" fill="rgba(155,123,255,.18)" stroke="${C.prot}" stroke-width="3" opacity="${f1(o)}"/>` + ch;
          fx += T(mx, my - (step >= 4 ? 70 : 78), T2('kopieermachine', 'copying machine'), { size: 26, col: C.prot, w: 700, op: o });
        }
        // kopiëren in het blaasje (stap 4) en kopieën naar buiten (stap 5)
        if (step >= 4) {
          const kC = step === 4 ? ease(sub(p, .55, .95)) : 1;
          fx += rnaWave(MX - 50, MX - 50 + 100 * kC, MY + 70, 1, 6);
        }
        if (step === 5) {
          for (let k = 0; k < 4; k++) {
            const u = ease(sub(p, .15 + k * .12, .55 + k * .12));
            if (u <= 0) continue;
            const x = lerp(1270, 1460 - k * 170, u), y = lerp(520, 400 + (k % 2) * 60, u);
            fx += rnaWave(x - 45, x + 45, y, 1, 6);
          }
          fx += T(1280, 352, T2('nieuwe RNA-kopieën', 'new RNA copies'), { size: 26, col: C.rna, w: 700, op: ease(sub(p, .5, .7)) });
        }
        $('vk-chain').innerHTML = ch;
        $('vk-fx').innerHTML = fx;
      },
    };
  },
};
