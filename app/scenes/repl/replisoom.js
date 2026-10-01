import { C, BASE, COMP, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, PRIMER, ADNA, PCNA, RPA, seg, pth, endl, prot, clamp3, duplex, tag, arrow, rpaRow } from './_draw.js';

/*
 * Replicatievork (mens). De vork beweegt naar rechts.
 *  - volgende-streng-matrijs (boven): 5' links … 3' rechts in de ouderduplex
 *  - leidende-streng-matrijs (onder): 3' links … 5' rechts → CMG loopt er 3'→5' over (naar rechts)
 *  - nieuwe leidende streng (onder, y=672): 5' links → 3' bij Pol ε (groeit naar de vork)
 *  - Okazaki-fragmenten (boven, y=228): 5'-uiteinde (primer) rechts, groeien 5'→3' naar links (van de vork weg)
 */
const SEQ = 'ATGCGTACCTAGGCATTCGATCGGATACGTTAGCCATGCAATCGGTACGATCCAGT';
const FX = 1010, CY = 450, GAP = 36, TOPY = 262, BOTY = 638, NTOP = 228, NBOT = 672, BP = 18;
const topArm = [[FX, CY - GAP / 2], [988, 382], [958, 318], [918, 280], [872, TOPY], [90, TOPY]];
const botArm = [[FX, CY + GAP / 2], [988, 518], [958, 582], [918, 620], [872, BOTY], [90, BOTY]];
const PRI5 = 880, PRI_R = 842, PRI_A = 804;          // primer van het nieuwe fragment: RNA 842–880, αDNA 804–842
const PREV5 = 640, PREV_R = 604, PREV_A = 570;        // vorig fragment: 5'-uiteinde bij 640 (RNA 604–640, αDNA 570–604)
const LEAD3 = 850;                                    // 3'-uiteinde van de leidende streng (bij Pol ε, vlak achter CMG)
const bAt = x => SEQ[Math.floor(x / BP) % SEQ.length];

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'replisoom',
  title: { nl: 'Het replisoom', en: 'The replisome' },
  scale: '≈ 20–50 nm',
  time: { nl: 'vork ≈ 1–3 kb/min in menselijke cellen (hier sterk vertraagd)', en: 'fork ≈ 1–3 kb/min in human cells (strongly slowed down here)' },
  org: { nl: 'mens (eukaryoot replisoom)', en: 'human (eukaryotic replisome)' },
  legend: [[C.dna, { nl: 'ouderstreng (matrijs volgende streng)', en: 'parental strand (lagging template)' }], [C.dna2, { nl: 'ouderstreng (matrijs leidende streng)', en: 'parental strand (leading template)' }],
    [NEW, { nl: 'nieuw DNA', en: 'new DNA' }], [PRIMER, { nl: 'RNA-primer', en: 'RNA primer' }], [ADNA, { nl: 'DNA van Pol α', en: 'DNA made by Pol α' }],
    [C.prot, { nl: 'enzymen', en: 'enzymes' }], [PCNA, 'PCNA'], [RPA, 'RPA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Let op de richtingen: beide nieuwe strengen groeien 5\'→3\'. De leidende streng groeit mee met de vork; op de volgende streng wijst de groeirichting van de vork weg, daarom wordt die in stukken (Okazaki-fragmenten) gemaakt.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Watch the directions: both new strands grow 5\'→3\'. The leading strand grows along with the fork; on the lagging strand the direction of growth points away from the fork, which is why it is made in pieces (Okazaki fragments).</p>' },
  simplified: {
    nl: '2D-schema, niet op schaal. Een Okazaki-fragment is ~200 nt, de RNA-primer ~10 nt en Pol α voegt ~20 nt DNA toe; primer en flap zijn hier groter getekend. In werkelijkheid verdringt Pol δ telkens slechts enkele nucleotiden en knipt FEN1 herhaaldelijk kleine flaps (nick-translatie). De volgende-streng-matrijs vormt in de cel waarschijnlijk een lus zodat alles bij elkaar blijft; Ctf4/AND-1, Mcm10, Tipin–Timeless en de histonchaperonnes zijn weggelaten. Echte structuren: PDB 6XTX (humaan CMG), 1AXC (humaan PCNA).',
    en: '2D scheme, not to scale. An Okazaki fragment is ~200 nt, the RNA primer ~10 nt and Pol α adds ~20 nt of DNA; primer and flap are drawn larger here. In reality Pol δ displaces only a few nucleotides at a time and FEN1 repeatedly cuts short flaps (nick translation). In the cell the lagging-strand template probably loops so that everything stays together; Ctf4/AND-1, Mcm10, Tipin–Timeless and the histone chaperones are omitted. Real structures: PDB 6XTX (human CMG), 1AXC (human PCNA).' },
  steps: [
    S(8000, cam(800, 450, 1560), 'De replicatievork', 'The replication fork',
      'De CMG-helicase ritst de dubbele helix open en de vork schuift naar rechts. De twee ouderstrengen lopen in tegengestelde richting (antiparallel).',
      'The CMG helicase unzips the double helix and the fork moves to the right. The two parental strands run in opposite directions (antiparallel).'),
    S(7000, cam(1250, 450, 760), 'Topo-isomerase vóór de vork', 'Topoisomerase ahead of the fork',
      'Openritsen draait het DNA vóór de vork steeds strakker op. Topo-isomerasen knippen tijdelijk één of beide strengen, laten de spanning weg en sluiten ze weer.',
      'Unzipping winds the DNA ahead of the fork ever tighter. Topoisomerases briefly cut one or both strands, release the tension and reseal them.'),
    S(7000, cam(760, 300, 760), 'RPA beschermt enkelstrengig DNA', 'RPA protects single-stranded DNA',
      'Losse enkelstrengen zijn kwetsbaar. Het eiwit RPA bedekt ze, zodat ze niet terugvouwen tot haarspelden en niet afgebroken worden.',
      'Loose single strands are vulnerable. The protein RPA coats them, so they do not fold back into hairpins and are not degraded.'),
    S(8000, cam(840, 245, 640), 'Pol α-primase legt een primer', 'Pol α-primase lays down a primer',
      'DNA-polymerasen kunnen niet zelf beginnen; ze hebben een startstukje (primer) nodig. Pol α-primase maakt dat: eerst ~10 nt RNA, dan ~20 nt DNA.',
      'DNA polymerases cannot start on their own; they need a starter piece (primer). Pol α-primase makes it: first ~10 nt of RNA, then ~20 nt of DNA.'),
    S(7000, cam(800, 245, 640), 'RFC laadt de PCNA-klem', 'RFC loads the PCNA clamp',
      'Het eiwit RFC legt de ringvormige klem PCNA rond het 3\'-uiteinde van de primer. Die klem houdt de polymerase op het DNA; Pol δ neemt het over van Pol α.',
      'The protein RFC places the ring-shaped PCNA clamp around the primer\'s 3\' end. The clamp keeps the polymerase on the DNA; Pol δ takes over from Pol α.'),
    S(8000, cam(720, 600, 1000), 'Leidende streng: continu', 'Leading strand: continuous',
      'Pol ε verlengt de leidende streng in één stuk (5\'→3\'), in dezelfde richting als de vork. Hij zit vast aan de helicase en aan de PCNA-klem.',
      'Pol ε extends the leading strand in one piece (5\'→3\'), in the same direction as the fork. It is attached to the helicase and to the PCNA clamp.'),
    S(9000, cam(700, 250, 820), 'Volgende streng: Okazaki-fragment', 'Lagging strand: Okazaki fragment',
      'Op de volgende streng werkt Pol δ weg van de vork, in korte stukjes (Okazaki-fragmenten). Bij het vorige stukje aangekomen, tilt hij het begin ervan op als een flapje.',
      'On the lagging strand Pol δ works away from the fork, in short pieces (Okazaki fragments). On reaching the previous piece, it lifts that piece\'s start into a flap.'),
    S(8000, cam(590, 235, 560), 'FEN1 knipt, ligase I sluit', 'FEN1 cuts, ligase I seals',
      'FEN1 knipt het flapje met de RNA-primer weg. DNA-ligase I sluit de laatste onderbreking: de stukjes worden één doorlopende streng.',
      'FEN1 cuts off the flap containing the RNA primer. DNA ligase I seals the last break: the pieces become one continuous strand.'),
    S(9000, cam(790, 660, 470), 'Proeflezen (3\'→5\'-exonuclease)', 'Proofreading (3\'→5\' exonuclease)',
      'Een verkeerd ingebouwde base past slecht. Pol ε schuift het nieuwe uiteinde naar een tweede, knippende plaats (exonuclease), haalt de fout weg en bouwt opnieuw in.',
      'A wrongly inserted base fits poorly. Pol ε moves the new end to a second, cutting site (exonuclease), removes the error and inserts again.'),
    S(7000, cam(800, 450, 1560), 'Samen: het replisoom', 'Together: the replisome',
      'Helicase, polymerasen, klem en RPA werken samen als één machine: het replisoom. Fouten die toch ontsnappen, worden later verbeterd (mismatch-herstel).',
      'Helicase, polymerases, clamp and RPA work together as one machine: the replisome. Errors that still escape are corrected later (mismatch repair).'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="supercoiling" data-color="${C.dna2}" data-label="${T2('Supercoiling & topo-isomerasen', 'Supercoiling & topoisomerases')}">
      <rect x="1180" y="380" width="400" height="140" fill="transparent"/><circle data-anchor="supercoiling" cx="1430" cy="370" r="1" fill="none"/>
      <g id="rs-dup"></g><g id="rs-topo"></g>
    </g>
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="rs-arms"></g></g>
    <g data-node="ssdna" data-color="${RPA}" data-label="${T2('Enkelstrengig DNA + RPA', 'Single-stranded DNA + RPA')}">
      <circle id="rs-ssa" data-anchor="ssdna" cx="720" cy="300" r="1" fill="none" data-pos="below"/>
      <g id="rs-rpa"></g>
    </g>
    <g id="rs-lag"></g><g id="rs-lead"></g><g id="rs-prot"></g><g id="rs-lbl"></g>
    <g data-node="herstel" data-nolabel data-color="${C.ok}" data-label="${T2('Foutenherstel', 'Error repair')}"><g id="rs-herstel"></g></g>
    <g data-node="replicatie" data-nolabel data-color="${C.dna}" data-label="${T2('↑ Replicatie (overzicht)', '↑ Replication (overview)')}" id="rs-rep">
      <rect x="40" y="792" width="400" height="54" rx="27" fill="rgba(79,143,247,.15)" stroke="${C.dna}" stroke-width="2"/>
      ${txt(240, 827, T2('↑ replicatiebel & origins', '↑ replication bubble & origins'), C.text, 22)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    // ouderduplex vóór de vork (vast)
    return {
      update(t, s) {
        const { step, p } = s;
        const big = step === 0 || step === 9;                 // overzichtsbeelden: grotere, minder labels
        const at = (k, a = 0, b = 1) => step > k ? 1 : step < k ? 0 : ease(sub(p, a, b));

        /* ---- ouderduplex + topo-isomerase ---- */
        let dup = duplex(FX, 1530, CY, SEQ.slice(3), { gap: GAP, bp: BP });
        // positieve supercoils: symbolen die in stap 1 één voor één verdwijnen
        const relax = step === 1 ? sub(p, .35, .95) : step > 1 ? .67 : 0;
        const plus = [1340, 1410, 1480].map((x, i) => {
          const gone = relax * 3 > i + .5 ? 1 : 0;
          const op = 1 - gone;
          return op > .01 ? `<g opacity="${f1(op)}" transform="translate(${x} 540)"><circle r="19" fill="none" stroke="${C.dna2}" stroke-width="2.5"/>${txt(0, 7, '+', C.dna2, 22)}</g>` : '';
        }).join('');
        dup += plus + tag(1410, 600, T2('positieve supercoils', 'positive supercoils'), C.muted, big ? 22 : 16, 'middle', step >= 1 ? 1 : .6);
        $('rs-dup').innerHTML = dup;
        const topoOp = step === 0 ? .0 : step === 1 ? ease(sub(p, 0, .2)) : 1;
        const nick = step === 1 && p > .3 && p < .8;
        $('rs-topo').innerHTML = prot(1300, 392, big ? 100 : 78, big ? 40 : 34, C.prot2, 'Topo I / II', big ? 22 : 16, topoOp) +
          (nick ? `<rect x="1294" y="${CY - GAP / 2 - 6}" width="12" height="12" fill="${C.bg}"/>` : '') +
          (step === 1 ? tag(1300, 340, T2('knip → draai → plak', 'cut → rotate → rejoin'), C.text, 16, 'middle', sub(p, .25, .4)) : '');

        /* ---- matrijsarmen ---- */
        // welke stukken van de nieuwe volgende streng bestaan er?
        const priR = step < 3 ? PRI5 : step === 3 ? lerp(PRI5, PRI_R, ease(sub(p, .2, .55))) : PRI_R;       // RNA-deel
        const priA = step < 3 ? PRI5 : step === 3 ? (p < .55 ? priR : lerp(PRI_R, PRI_A, ease(sub(p, .6, .9)))) : PRI_A;
        let del3 = PRI_A;                                   // 3'-uiteinde van het nieuwe fragment (Pol δ)
        if (step === 6) del3 = lerp(PRI_A, PREV5, ease(sub(p, 0, .55)));
        if (step === 6 && p > .55) del3 = lerp(PREV5, PREV_A, ease(sub(p, .6, .95)));
        if (step >= 7) del3 = PREV_A;
        const flapBase = Math.min(PREV5, del3);             // tot waar het vorige fragment nog gepaard is
        const flapCut = step > 7 || (step === 7 && p > .35);
        const sealed = step > 7 || (step === 7 && p > .8);
        const newLagFrom = step >= 3 ? del3 : 9999;         // nieuw fragment loopt van del3 tot PRI5

        let arms = pth(topArm, C.dna, 7) + pth(botArm, C.dna2, 7);
        // sporten / stompjes op de armen
        for (let x = 99; x < 870; x += BP) {
          const b = bAt(x), m = COMP[b];
          const fragL = step === 3 ? priA : step >= 6 ? del3 : PRI_A;
          const inNewFrag = step >= 3 && x >= fragL && x <= PRI5;
          const topPaired = x < flapBase || inNewFrag;
          if (topPaired) arms += seg(x, TOPY, x, (TOPY + NTOP) / 2, BASE[b], 4.5) + seg(x, (TOPY + NTOP) / 2, x, NTOP, BASE[m], 4.5);
          else arms += seg(x, TOPY, x, TOPY - 13, BASE[b], 4.5);
          const b2 = bAt(x + 7), m2 = COMP[b2];
          if (x < LEAD3 && step === 8 && x === 837) arms += '';
          else if (x < LEAD3) arms += seg(x, BOTY, x, (BOTY + NBOT) / 2, BASE[b2], 4.5) + seg(x, (BOTY + NBOT) / 2, x, NBOT, BASE[m2], 4.5);
          else arms += seg(x, BOTY, x, BOTY + 13, BASE[b2], 4.5);
        }
        arms += endl(66, TOPY + 6, "5'", C.dna) + endl(1554, CY - GAP / 2 + 6, "3'", C.dna) +
                endl(66, BOTY + 6, "3'", C.dna2) + endl(1554, CY + GAP / 2 + 6, "5'", C.dna2);
        $('rs-arms').innerHTML = arms;

        /* ---- volgende streng: oude fragmenten, nieuw fragment, flap ---- */
        let lag = '';
        // oud fragment (al geligeerd) + vorig fragment, tot flapBase
        lag += seg(96, NTOP, flapBase, NTOP, NEW, 7);
        lag += endl(66, NTOP + 6, "3'", NEW);
        // 5'-deel van het vorige fragment: gepaard (step<6) of opgetild als flap
        if (!flapCut) {
          const L0 = PREV5 - flapBase;                         // opgetilde lengte
          const ang = -1.05;
          const fl = (x0, x1, col) => {                       // stuk [x0,x1] van het vorige fragment
            const pts = [];
            for (const x of [x0, x1]) {
              if (x <= flapBase) pts.push([x, NTOP]);
              else { const u = x - flapBase; pts.push([flapBase + u * Math.cos(ang), NTOP + u * Math.sin(ang) * 1.0]); }
            }
            if (x0 < flapBase && x1 > flapBase) pts.splice(1, 0, [flapBase, NTOP]);
            return pth(pts, col, 7);
          };
          lag += fl(flapBase, PREV_A, NEW) + fl(Math.max(flapBase, PREV_A), PREV_R, ADNA) + fl(Math.max(flapBase, PREV_R), PREV5, PRIMER);
          const tip = PREV5 - flapBase > 1 ? [flapBase + (PREV5 - flapBase) * Math.cos(ang), NTOP + (PREV5 - flapBase) * Math.sin(ang)] : [PREV5, NTOP];
          lag += endl(tip[0] + 16, tip[1] - 14, "5'", PRIMER, 16);
        } else if (step === 7) {
          // weggeknipte flap drijft weg
          const k = sub(p, .35, .8);
          const x0 = PREV_A + k * 40, y0 = NTOP - 20 - k * 70;
          const ux = Math.cos(-1.05), uy = Math.sin(-1.05);
          lag += `<g opacity="${f1(1 - k)}">` + pth([[x0, y0], [x0 + 34 * ux, y0 + 34 * uy]], ADNA, 7) + pth([[x0 + 34 * ux, y0 + 34 * uy], [x0 + 70 * ux, y0 + 70 * uy]], PRIMER, 7) + '</g>';
        }
        // nieuw fragment
        if (step >= 3) {
          lag += seg(priR, NTOP, PRI5, NTOP, PRIMER, 7);
          if (priA < priR) lag += seg(priA, NTOP, priR, NTOP, ADNA, 7);
          if (step >= 6 && del3 < PRI_A) lag += seg(del3, NTOP, PRI_A, NTOP, NEW, 7);
          lag += endl(PRI5 + 16, NTOP - 10, "5'", PRIMER, 16);
          const e3 = step >= 6 ? del3 : priA;
          if (!(step === 7 && sealed) && step < 8) lag += endl(e3 - 22, NTOP - 16, "3'", NEW, 16);
        }
        // nick vóór ligatie
        if (step === 7 && flapCut && !sealed) lag += `<circle cx="${PREV_A}" cy="${NTOP}" r="9" fill="none" stroke="#fff" stroke-width="2.5" opacity="${f1(.5 + .5 * Math.sin(t / 120))}"/>`;
        if (step === 7 && sealed) lag += `<circle cx="${PREV_A}" cy="${NTOP}" r="14" fill="${C.ok}" opacity="${f1(.5 * (1 - sub(p, .8, 1)))}" filter="url(#glow)"/>`;
        $('rs-lag').innerHTML = lag;

        /* ---- RPA op enkelstrengig matrijs-DNA ---- */
        const rpaL = PREV5 + 4;
        const rpaR = step < 3 ? 880 : step === 3 ? Math.min(lerp(880, 842, sub(p, .1, .3)), priA) : step < 6 ? priA : step === 6 ? del3 - 6 : 0;
        let rpa = rpaRow(rpaL, rpaR, TOPY - 6, 1, 44, 15);
        if (step === 2) rpa += `<rect x="${PREV5}" y="${TOPY - 30}" width="${880 - PREV5}" height="46" rx="20" fill="none" stroke="${RPA}" stroke-width="3" stroke-dasharray="7 6" opacity="${f1(.5 + .5 * Math.sin(t / 200))}"/>` +
          tag(760, 372, T2('RPA-heterotrimeer (RPA70/32/14)', 'RPA heterotrimer (RPA70/32/14)'), RPA, 17);
        $('rs-rpa').innerHTML = rpa;
        const ssa = $('rs-ssa'); if (rpaR - rpaL > 40) { ssa.setAttribute('cx', f1((rpaL + rpaR) / 2)); ssa.setAttribute('cy', 300); } else { ssa.setAttribute('cx', -99); ssa.setAttribute('cy', -99); }

        /* ---- leidende streng ---- */
        let lead = seg(96, NBOT, LEAD3, NBOT, NEW, 7) + endl(66, NBOT + 6, "5'", NEW);
        if (step === 5) {
          // stroom van nucleotiden naar het 3'-uiteinde
          for (let k = 0; k < 6; k++) {
            const u = ((t / 1400 + k / 6) % 1);
            lead += `<circle cx="${f1(lerp(120, LEAD3 - 10, u))}" cy="${NBOT}" r="4.5" fill="#fff" opacity="${f1(.8 * Math.sin(Math.PI * u))}"/>`;
          }
          lead += arrow(300, 745, 700, 745, NEW, 4, sub(p, .1, .3)) + tag(500, 776, T2("synthese 5'→3', met de vork mee", "synthesis 5'→3', along with the fork"), NEW, 18, 'middle', sub(p, .1, .3));
        }
        // close-up proeflezen: basen met letters
        if (step === 8) {
          const X = [693, 711, 729, 747, 765, 783, 801, 819, 837];
          let cl = '';
          const k1 = sub(p, .25, .5), gone = sub(p, .5, .6), put = sub(p, .6, .8);
          X.forEach((x, i) => {
            const b = bAt(x + 7);                        // matrijs (onder de nieuwe streng? nee: boven, y=BOTY)
            cl += txt(x, BOTY - 10, b, BASE[b], 15, 'middle', 700, 'JetBrains Mono');
            let nb = COMP[b], y = NBOT + 24, op = 1;
            if (i === X.length - 1) {
              if (p < .6) { op = 0; }
              else { op = put; }
            }
            cl += `<g opacity="${f1(op)}">${txt(x, y, nb, BASE[nb], 15, 'middle', 700, 'JetBrains Mono')}</g>`;
          });
          const last = X[X.length - 1];
          const bT = bAt(last + 7);
          cl += seg(last, BOTY, last, (BOTY + NBOT) / 2, BASE[bT], 4.5);
          if (p < .6) {
            const wrong = bT === 'A' ? 'C' : bT === 'T' ? 'G' : bT === 'G' ? 'T' : 'A';
            const wx = lerp(last, last - 30, k1), wy = lerp(NBOT - 16, NBOT + 62, k1);
            cl += `<circle cx="${last - 30}" cy="${NBOT + 74}" r="20" fill="#0a1224" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 3" opacity="${f1(sub(p, .15, .3))}"/>`;
            cl += `<g opacity="${f1(1 - gone)}">${seg(wx, wy, wx, wy + 22, BASE[wrong], 5)}${txt(wx + 14, wy + 30, wrong, BASE[wrong], 15, 'middle', 700, 'JetBrains Mono')}</g>`;
            cl += tag(last + 36, BOTY + 20, '✗', C.danger, 26, 'middle', 1 - sub(p, .2, .3));
            cl += tag(last - 62, NBOT + 80, T2("exo-plaats (3'→5')", "exo site (3'→5')"), '#fff', 13, 'end', sub(p, .15, .3) * (1 - gone));
          } else {
            cl += `<g opacity="${f1(put)}">${seg(last, (BOTY + NBOT) / 2, last, NBOT, BASE[COMP[bT]], 4.5)}${seg(last - 9, NBOT, last + 9, NBOT, NEW, 7)}</g>`;
            cl += tag(last + 34, BOTY + 20, '✓', C.ok, 26, 'middle', sub(p, .8, .9));
          }
          lead += cl;
        } else lead += endl(LEAD3 + 24, NBOT + 8, "3'", NEW, 16);
        $('rs-lead').innerHTML = lead;

        /* ---- eiwitten ---- */
        let pr = '';
        // CMG rond de leidende-streng-matrijs
        pr += `<g transform="translate(972 550) rotate(26)"><ellipse rx="44" ry="74" fill="${C.prot}" fill-opacity=".22" stroke="${C.prot}" stroke-width="4"/><ellipse rx="16" ry="56" fill="none" stroke="${C.prot}" stroke-width="2" opacity=".6"/></g>`;
        pr += tag(1068, 626, 'CMG', '#fff', 26, 'start');                     // componenten + richting: in de ondertitel van stap 0
        pr += arrow(1060, 660, 1150, 660, C.prot, 3.5, 1);
        // Pol ε + PCNA op de leidende streng
        const polEy = step === 8 ? 740 : 718;
        pr += step === 8 ? prot(LEAD3 + 22, 752, 92, 40, C.prot2, 'Pol ε', 18) : prot(LEAD3 - 48, polEy + 6, 80, 38, C.prot2, 'Pol ε', 24);
        pr += clamp3(step === 8 ? 640 : LEAD3 - 120, (BOTY + NBOT) / 2, 13, 44, PCNA, 1);
        // Pol α-primase
        const aOp = step < 3 ? (step === 0 ? .0 : 0) : step === 3 ? ease(sub(p, 0, .15)) : step === 4 ? 1 - sub(p, .45, .75) : 0;
        pr += prot(lerp(PRI5 - 10, priA + 10, step === 3 ? sub(p, .2, .9) : 1), 148, 86, 36, C.prot3, 'Pol α-primase', 16, aOp);
        if (step === 3) pr += tag(860, 96, p < .58 ? T2('primase: RNA (~10 nt)', 'primase: RNA (~10 nt)') : T2('Pol α: + ~20 nt DNA', 'Pol α: + ~20 nt DNA'), p < .58 ? PRIMER : ADNA, 18);
        // RFC + PCNA + Pol δ op de volgende streng
        const rfcOp = step === 4 ? ease(sub(p, .1, .3)) * (1 - sub(p, .75, .95)) : 0;
        pr += prot(PRI_A - 150, 176, 50, 28, C.prot3, 'RFC', 16, rfcOp) + arrow(PRI_A - 110, 196, PRI_A - 14, 222, C.prot3, 3, rfcOp);
        const pcnaOp = step < 4 ? 0 : step === 4 ? ease(sub(p, .3, .6)) : step === 7 ? 1 - sub(p, .6, .9) : step > 7 && step < 9 ? 0 : 1;
        const pcnaX = step >= 6 ? del3 + 22 : PRI_A + 6;
        pr += clamp3(pcnaX, (TOPY + NTOP) / 2, 13, 44, PCNA, pcnaOp) + (step === 4 ? tag(pcnaX + 8, TOPY + 52, T2('PCNA-klem', 'PCNA clamp'), PCNA, 17, 'middle', pcnaOp) : '');
        const dOp = step < 4 ? 0 : step === 4 ? ease(sub(p, .7, .95)) : step === 7 ? 1 - sub(p, .1, .35) : step === 8 ? 0 : 1;
        pr += prot(step >= 6 ? del3 - 52 : pcnaX + 50, step >= 6 ? (big ? 182 : 160) : 170, big ? 70 : 56, big ? 36 : 30, C.prot2, 'Pol δ', big ? 24 : 18, dOp);
        if (step === 6) pr += arrow(del3 - 20, 120, del3 - 120, 120, NEW, 4, sub(p, .05, .2)) + tag(del3 - 70, 102, "5'→3'", NEW, 17, 'middle', sub(p, .05, .2));
        if (step === 6 && p > .6) pr += tag(700, 106, T2('strengverdringing → flap', 'strand displacement → flap'), C.text, 17, 'middle', sub(p, .6, .7));
        // FEN1 en ligase I
        pr += prot(PREV_A + 12, 150, 44, 26, '#e0708f', 'FEN1', 16, step === 7 ? ease(sub(p, .05, .2)) * (1 - sub(p, .45, .6)) : 0);
        pr += prot(PREV_A - 6, 170, 62, 28, '#3fb58f', T2('Ligase I', 'Ligase I'), 16, step === 7 ? ease(sub(p, .5, .62)) * (1 - sub(p, .92, 1)) : 0);
        $('rs-prot').innerHTML = pr;

        /* ---- labels ---- */
        let lb = '';
        lb += tag(200, 134, T2('volgende streng (lagging)', 'lagging strand'), NEW, 25, 'start', big ? 1 : 0);
        lb += tag(200, 744, T2('leidende streng (leading)', 'leading strand'), NEW, 25, 'start', big ? 1 : 0);
        lb += tag(200, 98, T2('Okazaki-fragmenten, ~200 nt', 'Okazaki fragments, ~200 nt'), C.muted, 22, 'start', big ? 1 : 0);
        lb += arrow(1180, 300, 1330, 300, C.text, 4, big ? 1 : 0) + tag(1255, 280, T2('vork beweegt', 'fork moves'), C.text, 23, 'middle', big ? 1 : 0);
        $('rs-lbl').innerHTML = lb;
        $('rs-rep').setAttribute('opacity', big ? 1 : 0);
        $('rs-rep').style.pointerEvents = big ? '' : 'none';
        $('rs-herstel').innerHTML = step === 9 || step === 8 ? (step === 8 ? `<g transform="translate(650 568)"><rect x="-72" y="-15" width="144" height="30" rx="15" fill="rgba(127,220,106,.14)" stroke="${C.ok}" stroke-width="1.5"/>${txt(0, 5, T2('→ DNA-herstel', '→ DNA repair'), C.text, 13)}</g>` : `<g transform="translate(1300 819)"><rect x="-140" y="-27" width="280" height="54" rx="27" fill="rgba(127,220,106,.14)" stroke="${C.ok}" stroke-width="2"/>${txt(0, 8, T2('→ DNA-herstel', '→ DNA repair'), C.text, 22)}</g>`) : '';
      },
    };
  },
};
