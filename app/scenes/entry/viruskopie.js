import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { T, btn, ribo, rnaWave, scissors, dmv, CUT, COPY } from './_corona.js';
import { cisterne, membraanPts, ptsLijn } from '../../bio.js';

/*
 * Het virus laat zich kopiëren (zijpad virussen, 05-11-2026). Het (+)RNA-genoom van SARS-CoV-2 (29 903 nt) wordt meteen door
 * ribosomen van de cel vertaald tot de polyproteïnen pp1a en pp1ab (−1-ribosomale frameshift, alleen in de uitleg); de virale
 * proteasen (PLpro in nsp3, Mpro = nsp5) knippen die in 15–16 niet-structurele eiwitten (nsp1–16). Die vormen het replicatie-
 * en transcriptiecomplex met het RNA-afhankelijke RNA-polymerase (nsp12) in blaasjes met een dubbel membraan, afgeleid van het ER;
 * een moleculaire porie (nsp3) laat RNA naar het cytosol. Bronnen: V'kovski et al. 2021, Snijder et al. 2020, Wolff et al. 2020.
 * Fix-ronde 15-11-2026 (V'kovski et al., Nat Rev Microbiol 2021, 19:155-170): ORF1a en ORF1b beslaan twee derde van het
 * genoom; de ribosomen vertalen dus alleen dat deel tot pp1a/pp1ab (de keten groeit uit de tunnel van de grote eenheid).
 * Het laatste derde (S, E, M, N ...) wordt van subgenomische mRNA's vertaald. Twee cysteineproteasen in de keten zelf knippen:
 * PLpro in nsp3 en Mpro (3CLpro) = nsp5. Het replicatiecomplex is verankerd aan het membraan van de blaasjes (DMV's);
 * een porie (nsp3) verbindt het binnenste van het blaasje (dsRNA) met het cytosol.
 */
const L3 = (nl, en) => ({ nl, en });
const RY = 380, X0 = 150, X1 = 1110, CY = 250;            // RNA-hoogte, begin/einde van het genoom, hoogte van de keten (boven: de keten komt uit de grote eenheid bovenaan)
const XO = X0 + (X1 - X0) * 2 / 3;                          // einde van ORF1a/1ab (≈ 2/3 van het genoom)
const N = 16, SEG = (XO - X0) / N;                          // 16 stukken (nsp1–16)
const SCH = [2, 4];                                          // nsp3 (PLpro) en nsp5 (Mpro): de scharen in de keten
const MACH = [3, 6, 7, 9, 10, 11, 12, 13];                  // stukken die (o.a.) de kopieermachine vormen (nsp3–4–6 membraan, nsp7–8–12 polymerase, 9, 10, 13)
const SEGCOL = i => SCH.includes(i) ? CUT : MACH.includes(i) ? (i === 11 ? COPY : C.prot) : ['#7fdc6a', '#5fb85a', '#a6e38f'][i % 3];
const DV = [[1270, 650, 120], [1060, 700, 78], [1480, 700, 80]];   // blaasjes met dubbel membraan
const MX = 1270, MY = 480;                                  // plaats van de kopieermachine: aan de cytosolkant van de porie bovenop het grote blaasje

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
  parts: [
    { c: C.muted, t: 'cytosol', d: L3('Alles gebeurt in het celvocht (cytosol), buiten de kern.', 'Everything happens in the cell fluid (cytosol), outside the nucleus.'),
      p: L3('Cytoplasmatische replicatie van een (+)RNA-virus.', 'Cytoplasmic replication of a (+)RNA virus.') },
    { c: C.rna, t: L3('RNA van het virus', 'RNA of the virus'), d: L3('De oranje draad: het erfelijk materiaal van het coronavirus, zo’n 30 000 letters lang. Het werkt meteen als boodschap (mRNA), met een kapje vooraan.', 'The orange thread: the genetic material of the coronavirus, about 30,000 letters long. It works straight away as a message (mRNA), with a cap at the front.'),
      p: L3('(+)ssRNA-genoom van SARS-CoV-2 (29 903 nt) met 5′-cap, direct translatiecompetent.', '(+)ssRNA genome of SARS-CoV-2 (29,903 nt) with a 5′ cap, directly translatable.') },
    { c: C.rrna, t: L3('ribosomen van de cel', 'ribosomes of the cell'), d: L3('Eiwitfabriekjes van onze eigen cel die het virus-RNA aflezen alsof het een gewone boodschap is.', 'Protein factories of our own cell that read the virus RNA as if it were an ordinary message.'),
      p: L3('Cytosolische 80S-ribosomen van de gastheer vertalen ORF1a en ORF1ab.', 'Host cytosolic 80S ribosomes translate ORF1a and ORF1ab.') },
    { c: C.muted, t: L3('S · E · M · N: later, via kortere kopieën', 'S · E · M · N: later, via shorter copies'), d: L3('Het laatste derde van het RNA bevat de bouwplannen voor de virushuid. Die worden pas later gelezen, van kortere kopieën.', 'The last third of the RNA holds the building plans for the virus coat. These are read only later, from shorter copies.'),
      p: L3('Structurele genen (S, E, M, N) in het 3′-derde, vertaald van subgenomische mRNA’s.', 'Structural genes (S, E, M, N) in the 3′ third, translated from subgenomic mRNAs.') },
    { c: C.chain, t: L3('één lange eiwitketen', 'one long protein chain'), d: L3('Groene keten: de ribosomen maken eerst één heel lange eiwitketen, die zo nog niet werkt.', 'Green chain: the ribosomes first make one very long protein chain, which does not work like this yet.'),
      p: L3('Polyproteïnen pp1a en pp1ab (via −1-ribosomale frameshift).', 'Polyproteins pp1a and pp1ab (via −1 ribosomal frameshift).') },
    { c: CUT, t: 'Mpro', m: ['PLpro'], d: L3('Twee virusscharen die in de keten zelf zitten (felpaars). Ze knippen zichzelf en de rest los.', 'Two virus scissors that sit in the chain itself (bright violet). They cut themselves and the rest loose.'),
      p: L3('Cysteïneproteasen PLpro (in nsp3) en Mpro/3CLpro (nsp5) die de polyproteïnen klieven.', 'Cysteine proteases PLpro (in nsp3) and Mpro/3CLpro (nsp5) that cleave the polyproteins.') },
    { c: C.text, t: L3('16 losse eiwitten', '16 separate proteins'), d: L3('Na het knippen zijn er zestien losse stukken, elk met een eigen taak.', 'After cutting there are sixteen separate pieces, each with its own job.'),
      p: L3('Niet-structurele eiwitten nsp1–16.', 'Non-structural proteins nsp1–16.') },
    { c: C.prot, t: L3('kopieermachine', 'copying machine'), d: L3('Een deel van de stukken vormt samen een machine die RNA kopieert. Het kopieerenzym zelf is donkerpaars.', 'Some of the pieces together form a machine that copies RNA. The copying enzyme itself is dark purple.'),
      p: L3('Replicatie-transcriptiecomplex rond de RNA-afhankelijke RNA-polymerase nsp12 met nsp7/nsp8.', 'Replication–transcription complex around the RNA-dependent RNA polymerase nsp12 with nsp7/nsp8.') },
    { c: C.mem, t: L3('ER → blaasjes met dubbel membraan', 'ER → vesicles with a double membrane'), d: L3('Het virus vervormt het ER tot blaasjes met een dubbel vlies. Binnenin wordt het RNA beschermd gekopieerd.', 'The virus reshapes the ER into vesicles with a double membrane. Inside, the RNA is copied in a protected place.'),
      p: L3('Dubbelmembraanblaasjes (DMV’s), afgeleid van het ER; binnenin dsRNA-replicatie-intermediairen.', 'Double-membrane vesicles (DMVs), derived from the ER; containing dsRNA replication intermediates.') },
    { c: C.prot2, t: L3('poortje', 'gate'), d: L3('Een poortje in de wand van het blaasje. Volgens de onderzoekers gaan de nieuwe kopieën hierlangs naar buiten.', 'A small gate in the wall of the vesicle. According to the researchers, the new copies leave through here.'),
      p: L3('Moleculaire porie (nsp3), met cryo-ET in beeld gebracht (Wolff et al. 2020); voorgestelde exportroute voor RNA.', 'Molecular pore (nsp3), imaged by cryo-ET (Wolff et al. 2020); proposed export route for RNA.') },
    { c: C.rna, t: L3('nieuwe RNA-kopieën', 'new RNA copies'), d: L3('De nieuwe kopieën van het virus-RNA. Ze worden opnieuw gelezen of ingepakt in nieuwe virussen.', 'The new copies of the virus RNA. They are read again or packed into new viruses.'),
      p: L3('Nieuw gesynthetiseerde (+)RNA-genomen en subgenomische mRNA’s.', 'Newly synthesised (+)RNA genomes and subgenomic mRNAs.') },
  ],
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
      text: L3('Het virus vervormt het ER tot blaasjes met een dubbel membraan. De machine zit aan zo’n blaasje vast en kopieert het RNA naar binnen.', 'The virus reshapes the ER into vesicles with a double membrane. The machine sits on such a vesicle and copies the RNA inside it.') },
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
          // twee ER-zakken (dubbellaag rond een lumen), waaruit de blaasjes ontstaan
          er += `<g transform="rotate(-14 1040 825)">${cisterne(1040, 825, { len: 290, dik: 24, buig: 6, vert: false, w: 8, op: kEr, lumen: 'rgba(143,179,232,.14)' })}</g>` +
            `<g transform="rotate(12 1500 820)">${cisterne(1500, 820, { len: 290, dik: 24, buig: 6, vert: false, w: 8, op: kEr, lumen: 'rgba(143,179,232,.14)' })}</g>`;
          DV.forEach(([x, y, r], i) => { er += dmv(x, y, r * (i ? ph(4, .2, .55) : ph(4, .05, .4)), kEr); });
          // de kleine blaasjes blijven via een smalle hals met het ER verbonden (Wolff et al. 2020)
          for (const [x, y, r, yER] of [[1060, 700, 78, 806], [1480, 700, 80, 802]]) { const kH = kEr * ph(4, .45, .6), y0 = y + r - 3;
            if (kH > .01) er += `<g opacity="${f1(kH)}"><rect x="${x - 7}" y="${y0}" width="14" height="${yER - y0}" fill="rgba(143,179,232,.14)"/>${membraanPts(ptsLijn(x - 8, y0, x - 8, yER), { w: 6 })}${membraanPts(ptsLijn(x + 8, y0, x + 8, yER), { w: 6 })}</g>`; }
          er += T(1270, 878, T2('ER → blaasjes met dubbel membraan', 'ER → vesicles with a double membrane'), { size: 24, col: C.mem, op: ph(4, .4, .6) });
          // poortje (nsp3) bovenaan het grote blaasje: al in stap 4 zichtbaar, vóór er RNA door het membraan gaat (Wolff et al. 2020)
          const kP = ph(4, .2, .35);
          if (kP > .01) er += `<g opacity="${f1(kP)}"><rect x="1250" y="512" width="40" height="34" rx="6" fill="${C.prot2}" stroke="#0a1224" stroke-width="2"/>${[0, 1, 2, 3].map(i => `<rect x="${1248 + i * 12}" y="500" width="8" height="14" rx="3" fill="${C.prot2}"/>`).join('')}</g>` +
            T(1360, 500, T2('poortje', 'gate'), { size: 24, col: C.text, anchor: 'start', op: kP });
        }
        $('vk-er').innerHTML = er;

        /* het genoom (+RNA) met 5′-cap */
        const kRna = step === 0 ? ease(sub(p, 0, .2)) : 1;
        $('vk-rna').innerHTML = `<g opacity="${f1(.35 + .65 * kRna)}">${rnaWave(X0, X1, RY, 1, 8)}<circle cx="${X0 - 12}" cy="${RY}" r="12" fill="${C.cap}"/></g>` +
          T(X0 - 10, RY + 62, T2('RNA van het virus', 'RNA of the virus'), { size: 26, col: C.rna, anchor: 'start', w: 700, op: step <= 1 ? 1 : .6 });

        /* ribosomen: lopen over het RNA (stap 0–1), daarna verder in rust */
        const run = step === 0 ? .35 * ease(sub(p, .25, 1)) : step === 1 ? .35 + .65 * ease(sub(p, 0, .9)) : 1;
        let rb = '';
        const rOp = step <= 2 ? 1 : step === 3 ? 1 - .6 * ease(sub(p, 0, .4)) : .4;
        for (let k = 0; k < 3; k++) {
          const u = Math.max(0, run - k * .22);
          if (step === 0 && k > 0 && u <= 0) continue;
          rb += ribo(lerp(X0 + 40, XO, Math.min(1, u)), RY + 4, .55, rOp, { grootBoven: true });   // vrij ribosoom: grote eenheid boven het mRNA
        }
        if (step === 0) rb += T(640, RY + 100, T2('ribosomen van de cel', 'ribosomes of the cell'), { size: 26, col: C.rrna, w: 700, op: ease(sub(p, .4, .6)) });
        // het laatste derde van het genoom (S, E, M, N ...) wordt niet door deze ribosomen gelezen
        rb += `<path d="M${f1(XO + 6)},${RY - 30} V${RY + 30}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="5 5"/>` +
          T(XO + 18, RY + 52, T2('S · E · M · N: later, via kortere kopieën', 'S · E · M · N: later, via shorter copies'), { size: 21, col: C.muted, w: 600, anchor: 'start', op: step <= 2 ? 1 : .6 });
        $('vk-ribo').innerHTML = rb;

        /* de lange keten (stap 1) → stukken (stap 2) → kopieermachine (stap 3–5) */
        let ch = '', fx = '';
        const grow = step < 1 ? 0 : step === 1 ? ease(sub(p, .05, .9)) : 1;
        /* de keten komt uit de tunnel van de grote eenheid van het voorste ribosoom (tot het einde van ORF1ab), daarna los */
        const runNow = step === 0 ? .35 * ease(sub(p, .25, 1)) : step === 1 ? .35 + .65 * ease(sub(p, 0, .9)) : 1;
        const lead = lerp(X0 + 40, XO, Math.min(1, runNow)), tunOp = step === 1 ? 1 : step === 2 ? 1 - ease(sub(p, 0, .2)) : 0;
        const cut = ph(2, .35, .8), gather = ph(3, .1, .75), sink = ph(4, .1, .7);
        if (grow > 0) {
          const xEnd = Math.min(lead, lerp(X0, XO, grow));
          // de ribosomen erachter maken elk ook een (kortere) keten: polysoom
          if (tunOp > .01) for (let k = 1; k < 3; k++) {
            const uk = Math.max(0, runNow - k * .22); if (uk <= .02) continue;
            const xk = lerp(X0 + 40, XO, Math.min(1, uk)), Lk = 22 + 34 * Math.min(1, uk);   // korter dan de afstand tot de lange keten erboven
            ch += `<path d="M${f1(xk)},${RY - 44} q${f1(-Lk * .25)},${f1(-Lk * .55)} ${f1(-Lk * .7)},${f1(-Lk)}" stroke="${C.chain}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${f1(tunOp)}"/>`;
          }
          if (tunOp > .01) ch += `<path d="M${f1(lead)},${RY - 48} C${f1(lead)},${CY + 10} ${f1(xEnd + 10)},${CY + 20} ${f1(xEnd)},${CY}" stroke="${C.chain}" stroke-width="10" fill="none" stroke-linecap="round" opacity="${f1(tunOp)}"/>`;
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
            const kS = step >= 2 && SCH.includes(i) ? ph(2, 0, .2) : 0;     // de twee scharen kleuren eerst op, dan knippen ze
            ch += `<path d="M${f1(x0)},${f1(y)} L${f1(x1)},${f1(y)}" stroke="${kS > .5 || cut > .02 ? SEGCOL(i) : C.chain}" stroke-width="16" stroke-linecap="round" opacity="${f1(op)}"/>`;
          }
          if (step === 1) ch += T(lerp(X0, XO, grow) / 2 + X0 / 2, CY - 42, T2('één lange eiwitketen', 'one long protein chain'), { size: 26, col: C.chain, w: 700, op: ease(sub(p, .3, .5)) });
        }
        // scharen op de knipplekken (stap 2)
        if (step === 2) {
          // geen losse scharen: de twee knipstukken zitten in de keten (nsp3 = PLpro, nsp5 = Mpro); de knipplekken lichten op
          const kL = ease(sub(p, .1, .3)), kC = ease(sub(p, .3, .6)) * (1 - ease(sub(p, .85, 1)));
          fx += T(X0 + 2.5 * SEG, CY - 40, 'PLpro', { size: 21, col: CUT, w: 700, op: kL }) + T(X0 + 4.5 * SEG, CY - 70, 'Mpro', { size: 21, col: CUT, w: 700, op: kL });
          fx += `<path d="M${f1(X0 + 2.5 * SEG)},${CY - 34} V${CY - 12} M${f1(X0 + 4.5 * SEG)},${CY - 64} V${CY - 12}" stroke="${CUT}" stroke-width="2" opacity="${f1(kL)}"/>`;
          for (let i = 1; i < N; i++) fx += `<path d="M${f1(X0 + i * SEG)},${CY - 16} l-5,-9 h10z M${f1(X0 + i * SEG)},${CY + 16} l-5,9 h10z" fill="${CUT}" opacity="${f1(kC)}"/>`;
          fx += T(450, CY - 104, T2('16 losse eiwitten', '16 separate proteins'), { size: 28, col: C.text, w: 700, op: ease(sub(p, .65, .85)) });
        }
        // de machine (stap 3+)
        if (gather > .6) {
          const mx = lerp(1270, MX, sink), my = lerp(420, MY, sink), o = ease(sub(gather, .6, 1));
          ch = `<ellipse cx="${f1(mx)}" cy="${f1(my)}" rx="62" ry="50" fill="rgba(155,123,255,.18)" stroke="${C.prot}" stroke-width="3" opacity="${f1(o)}"/>` + ch;
          fx += T(mx - (step >= 4 ? 160 : 0), my + (step >= 4 ? 34 : -78), T2('kopieermachine', 'copying machine'), { size: 26, col: C.prot, w: 700, op: o });
        }
        /* stap 4: het blaasje ontstaat onder de machine, die aan het membraan blijft (cytosolkant). Het (+)RNA dient als matrijs;
           binnenin groeit de kopie ertegenaan (dubbelstrengig RNA). Stap 5: kopieën gaan door het poortje naar het cytosol. */
        if (step >= 4) {
          const kT = ph(4, .35, .55), kC = step === 4 ? ease(sub(p, .55, .95)) : 1, cy0 = DV[0][1];
          fx += `<path d="M${X1},${RY} C1190,262 1236,330 ${MX - 22},${MY - 46}" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="7 6" opacity="${f1(kT * .8)}"/>`;   // het genoom is de matrijs
          fx += `<path d="M${MX - 10},${MY + 40} C${MX - 10},${cy0 - 60} ${MX - 60},${cy0 - 40} ${MX - 70},${cy0}" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${f1(kT)}"/>`;
          fx += rnaWave(MX - 70, MX + 60, cy0, kT, 6);
          fx += rnaWave(MX - 70, MX - 70 + 130 * kC, cy0 + 16, kC > .02 ? 1 : 0, 6, '#ffc9a3');
        }
        if (step === 5) {
          for (let k = 0; k < 4; k++) {
            const u = ease(sub(p, .15 + k * .12, .55 + k * .12));
            if (u <= 0) continue;
            const x = lerp(1300, 1500 - k * 105, u), y = lerp(530, 236 + (k % 2) * 50, u);   // boven, los van het virus-RNA
            fx += rnaWave(x - 45, x + 45, y, 1, 6);
          }
          fx += T(1350, 196, T2('nieuwe RNA-kopieën', 'new RNA copies'), { size: 26, col: C.rna, w: 700, op: ease(sub(p, .5, .7)) });
        }
        $('vk-chain').innerHTML = ch;
        $('vk-fx').innerHTML = fx;
      },
    };
  },
};
