import { C, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, capG, ribo, note, arrow, snip, ntRow, hot, setHot } from './_rna.js';

/*
 * Nonsense-mediated decay (NMD), voorbeeld: β-globine (HBB), nonsensemutatie codon 39 CAG → UAG (β⁰-thalassemie).
 * mRNA horizontaal (5' links). Exon 1 | exon 2 | exon 3 (laatste exon); EJC ≈ 20–24 nt vóór elke junctie.
 */
const Y = 470;
const X = { cap: 250, e1: [270, 480], e2: [480, 910], e3: [910, 1210], pa: [1210, 1350], ptc: 580, stop: 1090 };
const EJC = [X.e1[1] - 44, X.e2[1] - 44];               // stroomopwaarts van de junctie
const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'nmd',
  title: { nl: 'Nonsense-mediated decay', en: 'Nonsense-mediated decay' },
  scale: '≈ 50 nm',
  time: { nl: 'minuten na export (hier vertraagd)', en: 'minutes after export (slowed down here)' },
  org: { nl: 'mens (voorbeeld β-globine, HBB)', en: 'human (example β-globin, HBB)' },
  legend: [[C.rna, 'mRNA'], ['#7a62e0', 'EJC'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], ['#e0679a', { nl: 'NMD-factoren (UPF, SMG)', en: 'NMD factors (UPF, SMG)' }], [C.danger, { nl: 'vroegtijdig stopcodon (PTC)', en: 'premature stop codon (PTC)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Vuistregel: een stopcodon dat meer dan 50–55 nt vóór de laatste exon-exonjunctie ligt, laat een EJC achter het ribosoom → NMD. Stopcodons in het laatste exon ontsnappen aan NMD (daar volgt geen EJC); het afgeknotte eiwit kan dan dominant werken.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Rule of thumb: a stop codon more than 50–55 nt upstream of the last exon–exon junction leaves an EJC behind the ribosome → NMD. Stop codons in the last exon escape NMD (no EJC follows); the truncated protein can then act dominantly.</p>' },
  simplified: {
    nl: 'Afstanden niet op schaal. Het echte β-globine-mRNA heeft 3 exonen zoals hier, maar de codons zijn niet op ware positie getekend. Het SURF-complex (SMG1–UPF1–eRF1–eRF3), SMG8/SMG9, de talrijke fosforylatieplaatsen van UPF1 en de EJC-onafhankelijke NMD (lange 3\'-UTR) zijn vereenvoudigd of weggelaten. NMD werd klassiek gekoppeld aan de pioniersronde op CBC-gebonden mRNA, maar kan ook later, op eIF4E-gebonden mRNA, gebeuren.',
    en: 'Distances not to scale. The real β-globin mRNA has 3 exons as shown, but codons are not drawn at their true positions. The SURF complex (SMG1–UPF1–eRF1–eRF3), SMG8/SMG9, the many phosphorylation sites of UPF1 and EJC-independent NMD (long 3\' UTR) are simplified or omitted. NMD was classically linked to the pioneer round on CBC-bound mRNA, but can also occur later, on eIF4E-bound mRNA.' },
  steps: [
    ST(7000, cam(800, 470, 1250), "Merktekens op het mRNA", "Markers on the mRNA",
      "Bij elke naad tussen exonen blijft een eiwit als merkteken. Het stopsein (stopcodon) zit in het laatste exon.",
      "A protein stays at each seam between exons as a marker. The stop signal (stop codon) is in the last exon."),
    ST(8500, cam(800, 450, 1250), "Normaal: alles wordt opgeruimd", "Normally: everything is cleared",
      "Het eerste ribosoom duwt alle merktekens weg en stopt in het laatste exon. Het mRNA mag blijven.",
      "The first ribosome pushes all markers away and stops in the last exon. The mRNA can stay."),
    ST(7500, cam(670, 440, 945), "Een mutatie: te vroeg stoppen", "A mutation: stopping too early",
      "Eén veranderde base maakt van CAG het stopcodon UAG. Zo staat er al een stopsein in exon 2.",
      "One changed base turns CAG into the stop codon UAG. So there is already a stop signal in exon 2."),
    ST(8000, cam(780, 450, 1100), "Het ribosoom stopt te vroeg", "The ribosome stops too early",
      "Het ribosoom stopt al bij dit vroege stopsein. Het merkteken verderop blijft daardoor liggen.",
      "The ribosome already stops at this early stop signal. So the marker further along stays in place."),
    ST(8000, cam(805, 420, 1060), "De fout wordt opgemerkt", "The error is noticed",
      "Een controle-eiwit bij het ribosoom raakt het achtergebleven merkteken. Zo wordt de fout ‘gezien’.",
      "A checking protein at the ribosome touches the marker left behind. This is how the error is ‘seen’."),
    ST(7000, cam(740, 400, 860), "Het alarm gaat af", "The alarm goes off",
      "Een enzym zet een fosfaatgroep op het controle-eiwit. Dat is het signaal ‘dit mRNA is fout’.",
      "An enzyme adds a phosphate group to the checking protein. That is the signal ‘this mRNA is faulty’."),
    ST(9000, cam(800, 450, 1250), "Het foute mRNA wordt afgebroken", "The faulty mRNA is broken down",
      "Het mRNA wordt vlak bij het foute stopsein doorgeknipt. Daarna breken enzymen de stukken af.",
      "The mRNA is cut near the faulty stop signal. Enzymes then break down the pieces."),
    ST(8000, cam(800, 470, 1250), "Geen half eiwit", "No half protein",
      "Er ontstaat zo bijna geen afgeknot eiwit. Deze controle beschermt de cel tegen schadelijke eiwitstukken.",
      "So hardly any shortened protein is made. This check protects the cell from harmful protein pieces."),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="rnaprocessing" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-nolabel><g id="nm-mrna"></g></g><g data-node="capping" data-color="${C.cap}" data-nolabel><g id="nm-cap"></g></g><g data-node="splicing" data-color="#7a62e0" data-nolabel><g id="nm-ejc"></g></g><g id="nm-ejcn"></g><g data-node="mutaties" data-color="${C.danger}" data-nolabel><g id="nm-mut"></g></g><g data-node="ribosoom" data-color="${C.rrna}" data-nolabel><g id="nm-ribo"></g></g><g data-node="terminatie" data-color="#6f5bd6" data-nolabel><g id="nm-erf"></g></g><g id="nm-fac"></g><g id="nm-smg"></g><g data-node="mrnaafbraak" data-color="#8a5a3a" data-nolabel><g id="nm-deg"></g></g><g id="nm-dec"></g>
    ${hot('splicing', T2('EJC (uit splicing)', 'EJC (from splicing)'), '#7a62e0', 'nm-hS')}
    ${hot('mutaties', T2('Mutatie → PTC', 'Mutation → PTC'), C.danger, 'nm-hM', '', true)}
    ${hot('terminatie', T2('Ribosoom · terminatie', 'Ribosome · termination'), C.rrna, 'nm-hT')}
    ${hot('mrnaafbraak', T2('mRNA-afbraak', 'mRNA decay'), '#e0679a', 'nm-hD')}
    ${hot('rnaprocessing', T2('mRNA (atlas)', 'mRNA (atlas)'), C.rna, 'nm-hR', '../atlas/index.html?id=mrna', true)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const seg = (x0, x1, col, w = 12) => x1 - x0 < 1 ? '' : `<line x1="${f1(x0)}" y1="${Y}" x2="${f1(x1)}" y2="${Y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    return {
      update(t, s) {
        const { step, p } = s;
        const mut = step >= 2;                                  // tweede mRNA (met PTC) vanaf stap 2
        // afbraak (stap 6): knip bij PTC, 5'-stuk van rechts naar links door exosoom, 3'-stuk door XRN1
        const cut = step === 6 ? sub(p, .15, .25) > 0 : step > 6;
        const chew = step === 6 ? ease(sub(p, .3, 1)) : step > 6 ? 1 : 0;
        const gone = step === 7 ? sub(p, 0, .14) : 0;          // resten van stap 6 kruisen vloeiend over in het overzicht
        let m = '';
        const segs = [[X.e1[0], X.e1[1], C.rna], [X.e2[0], X.e2[1], '#ff9d5c'], [X.e3[0], X.e3[1], C.rna]];
        const lo = cut ? X.ptc + 20 : 0;
        const leftEnd = cut ? lerp(X.ptc - 8, X.e1[0], chew) : 99999;     // exosoom 3'→5' op het 5'-fragment
        const rightStart = cut ? lerp(X.ptc + 18, X.pa[1], chew) : -1;      // XRN1 5'→3' op het 3'-fragment
        const vis = (a, b) => { const r = []; if (!cut) return [[a, b]]; if (a < leftEnd) r.push([a, Math.min(b, leftEnd)]); if (b > rightStart) r.push([Math.max(a, rightStart), b]); return r; };
        m += `<g opacity="${f1(1 - gone)}">`;
        for (const [a, b, col] of segs) for (const [u, v] of vis(a, b)) m += seg(u, v, col);
        for (const [u, v] of vis(X.pa[0], X.pa[1])) m += `<line x1="${f1(u)}" y1="${Y}" x2="${f1(v)}" y2="${Y}" stroke="${C.cap}" stroke-width="7" stroke-dasharray="3 3"/>`;
        // junctiestreepjes + exonlabels
        for (const xj of [X.e1[1], X.e2[1]]) if (!cut || xj < leftEnd || xj > rightStart) m += `<line x1="${xj}" y1="${Y - 14}" x2="${xj}" y2="${Y + 14}" stroke="#fff" stroke-width="2.5"/>`;
        const labOp = cut ? 1 - .5 * sub(chew, .8, 1) : 1;        // labels dimmen als het mRNA weg is
        m += `<g opacity="${f1(labOp)}">` + note((X.e1[0] + X.e1[1]) / 2, Y + 44, 'exon 1', C.rna, 18) + note((X.e2[0] + X.e2[1]) / 2, Y + 44, 'exon 2', C.rna, 18) + note((X.e3[0] + X.e3[1]) / 2, Y + 44, T2('exon 3 (laatste)', 'exon 3 (last)'), C.rna, 18) + note((X.pa[0] + X.pa[1]) / 2, Y + 44, 'poly(A)', C.cap, 17);
        // normaal stopcodon
        m += note(X.stop, Y + 76, T2('normaal stop', 'normal stop'), C.text, 17) + '</g>';
        if (!cut || rightStart < X.stop - 20) m += `<rect x="${X.stop - 20}" y="${Y - 11}" width="40" height="22" rx="4" fill="#fff" opacity=".9"/>`;
        // cap (+ CBC) verdwijnt bij decapping
        const capOp = cut ? 1 - sub(chew, .8, 1) : 1;
        m += note(X.pa[1] + 14, Y + 6, "3'", C.text, 18, 'start', cut ? 1 - sub(chew, .85, .95) : 1);
        m += '</g>';
        $('nm-cap').innerHTML = `<g opacity="${f1(1 - gone)}">` + capG(X.cap, Y, 20, capOp) + prot(X.cap, Y - 40, 66, 32, 'CBC', '#7a62e0', capOp, 17) + note(X.cap - 30, Y - 12, "5'", C.text, 18, 'end', capOp) + '</g>';
        if (step === 0 || step === 1) m += note(800, Y - 150, T2('normaal β-globine-mRNA', 'normal β-globin mRNA'), C.ok, 22);
        if (step >= 2 && step <= 3) m += note(800, Y - 190, T2('mutant mRNA (codon 39: UAG)', 'mutant mRNA (codon 39: UAG)'), C.danger, 22);
        $('nm-mrna').innerHTML = m;

        // PTC + codonzoom
        let mu = '';
        if (mut && !(cut && chew > .05)) {
          mu += `<rect x="${X.ptc - 20}" y="${Y - 11}" width="40" height="22" rx="4" fill="${C.danger}"/>` + note(X.ptc, Y + 76, 'PTC', C.danger, 18);
        }
        if (step === 2) {
          const k = ease(sub(p, .15, .45)), z = ease(sub(p, .45, .75));
          const bx = X.ptc - 45, by = Y - 130;
          mu += `<g opacity="${f1(k)}"><path d="M${X.ptc - 20},${Y - 12} L${bx - 10},${by + 40} M${X.ptc + 20},${Y - 12} L${bx + 100},${by + 40}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="4 4"/>` +
            ntRow(bx, by, z < .5 ? 'CAG' : 'UAG', 45, 40) + '</g>';
          mu += note(X.ptc, by - 20, z < .5 ? T2('codon 39 = CAG (Gln)', 'codon 39 = CAG (Gln)') : T2('codon 39 = UAG (stop!)', 'codon 39 = UAG (stop!)'), z < .5 ? C.text : C.danger, 20, 'middle', k);
          mu += note(X.ptc + 170, by + 30, T2('DNA: C → T', 'DNA: C → T'), C.muted, 17, 'start', sub(p, .45, .6));
        }
        $('nm-mut').innerHTML = mu;
        setHot(svg, 'nm-hM', mut && step <= 5 && !(step === 2 && p < .45) ? [X.ptc, Y + 70, 60, 34] : null);
        setHot(svg, 'nm-hR', step <= 1 ? [(X.e2[0] + X.e2[1]) / 2, Y + 44, 120, 30] : null);

        // ribosoom
        let rx = -999, rop = 0;
        if (step === 1) { rx = lerp(X.cap + 60, X.stop, ease(sub(p, .05, .8))); rop = sub(p, 0, .1) * (1 - sub(p, .88, 1)); }
        if (step === 3) { rx = lerp(X.cap + 60, X.ptc, ease(sub(p, .05, .6))); rop = sub(p, 0, .1); }
        if (step === 4 || step === 5) { rx = X.ptc; rop = 1; }
        if (step === 6) { rx = X.ptc; rop = 1 - sub(p, 0, .15); }
        $('nm-ribo').innerHTML = ribo(rx, Y + 2, 1, rop);
        setHot(svg, 'nm-hT', rop > .5 && step === 3 && p > .6 ? [rx, Y - 30, 120, 150] : null);

        // EJC's: in stap 1 weggeduwd door het ribosoom; in het mutante mRNA blijft EJC 2 zitten
        let ej = '', ejn = '';
        EJC.forEach((x, i) => {
          let off = 0, op = 1;
          if (step === 1) { const k = clamp((rx - x + 60) / 70); off = k * 110; op = 1 - k; }
          if (step >= 3 && i === 0) { const k = step === 3 ? clamp((rx - x + 60) / 70) : 1; off = k * 110; op = 1 - k; }
          if (step >= 6) op *= 1 - sub(chew, .4, .8);
          if (step === 7) op = 0;
          ej += prot(x, Y - 36 - off, 60, 32, 'EJC', '#7a62e0', op, 17);
        });
        // 50–55 nt-afstand
        if (step === 3 || step === 4) {
          const k = step === 3 ? sub(p, .6, .8) : 1;
          ejn += `<g opacity="${f1(k)}"><path d="M${X.ptc + 40},${Y + 124} v12 H${X.e2[1]} v-12" stroke="#ffd36b" stroke-width="3" fill="none"/></g>` +
            note((X.ptc + 40 + X.e2[1]) / 2, Y + 166, T2('> 50–55 nt tot de laatste junctie', '> 50–55 nt to the last junction'), '#ffd36b', 19, 'middle', k);
        }
        if (step === 1) ejn += note(1150, Y + 110, T2('✓ geen EJC na het stopcodon → stabiel', '✓ no EJC after the stop codon → stable'), C.ok, 20, 'middle', sub(p, .8, .9));
        $('nm-ejc').innerHTML = ej; $('nm-ejcn').innerHTML = ejn;
        setHot(svg, 'nm-hS', step === 0 ? [EJC[1], Y - 36, 56, 30] : null);

        // NMD-factoren
        let fa = '', erf = '';
        const ejx = EJC[1];
        if (step === 3) erf += prot(X.ptc + 78, Y - 98, 109, 34, 'eRF1·eRF3', '#6f5bd6', sub(p, .6, .75), 17);
        if (step >= 4 && step <= 6) {
          const k = step === 4 ? ease(sub(p, 0, .35)) : step === 6 ? 1 - sub(p, 0, .25) : 1;
          erf += prot(X.ptc + 78, Y - 98, 109, 34, 'eRF1·eRF3', '#6f5bd6', step === 4 ? 1 - sub(p, .7, 1) : 0, 17);
          const ux = X.ptc + 110, uy = Y - 140;
          fa += prot(ux, uy, 76, 34, 'UPF1', '#e0679a', k, 17);
          fa += prot(ux - 80, uy - 30, 79, 32, 'SMG1', '#b44f7c', k, 17);
          const k2 = step === 4 ? ease(sub(p, .35, .6)) : k;
          fa += prot(ejx, Y - 84, 79, 34, 'UPF3B', '#c9577f', k2, 17) + prot(ejx - 20, Y - 124, 75, 34, 'UPF2', '#c9577f', k2, 17);
          const k3 = step === 4 ? sub(p, .6, .8) : k;
          fa += `<path d="M${ux + 38},${uy} C${ux + 160},${uy - 30} ${ejx - 180},${Y - 150} ${ejx - 54},${Y - 128}" stroke="#ffb3cf" stroke-width="3.5" fill="none" stroke-dasharray="8 6" opacity="${f1(k3)}"/>`;
          if (step >= 5) {
            const kp = step === 5 ? ease(sub(p, .2, .5)) : k;
            [[-16, -22], [10, -26], [36, -22]].forEach(([dx, dy], i) => {
              const o = step === 5 ? sub(p, .2 + i * .1, .35 + i * .1) : k;
              fa += `<g opacity="${f1(o)}"><circle cx="${ux + dx}" cy="${uy + dy - 8}" r="11" fill="#ffd36b" stroke="#0a1224" stroke-width="1.5"/><text x="${ux + dx}" y="${uy + dy - 3}" font-size="13" text-anchor="middle" font-family="Inter" font-weight="800" fill="#0a1224">P</text></g>`;
            });
            if (step === 5) fa += note(ux - 150, uy - 80, 'SMG1: ATP → ADP', '#ffd36b', 17, 'middle', kp);
          }
        }
        $('nm-erf').innerHTML = erf; $('nm-fac').innerHTML = fa;

        // afbraak
        let de = '', dg = '', sm = '';
        // resten na de afbraak: losse nucleotiden tussen de twee exonucleasen (eindbeeld stap 6 = beginbeeld stap 7)
        const remains = (lE, rS, ch, op) => {
          if (op <= .01) return '';
          let r = `<g opacity="${f1(op)}">`;
          for (let k = 0; k < 40; k++) { const x = 300 + k * 26.5, y = Y - 26 + (k * 29) % 50; if (x > lE + 70 && x < rS - 60) r += `<circle cx="${f1(x)}" cy="${y}" r="5.5" fill="${k % 3 === 1 ? '#ff9d5c' : C.rna}" opacity=".85"/>`; }
          r += prot(lE + 20, Y + 2, 102, 39, T2('exosoom', 'exosome'), '#8a5a3a', 1, 17) + prot(rS - 10, Y + 2, 79, 39, 'XRN1', '#8a5a3a', 1, 17);
          r += note(lE + 20, Y + 66, "3'→5'", '#e0b089', 17) + note(rS - 10, Y + 66, "5'→3'", '#e0b089', 17);
          r += note(800, Y - 90, T2('mRNA afgebroken tot losse nucleotiden', 'mRNA degraded to free nucleotides'), C.text, 22, 'middle', sub(ch, .85, 1));
          return r + '</g>';
        };
        if (step === 6) {
          const k = sub(p, 0, .15);
          sm += prot(X.ptc + 20, Y - 70, 79, 34, 'SMG6', '#e0679a', k * (1 - sub(p, .5, .7)), 17) + snip(X.ptc + 6, Y, sub(p, .12, .2) * (1 - sub(p, .3, .4)));
          sm += prot(X.ptc + 200, Y - 120, 125, 34, 'SMG5·SMG7', '#b44f7c', k * (1 - sub(p, .7, .9)), 17);
          sm += note(X.ptc + 200, Y - 158, T2('→ CCR4–NOT, decapping', '→ CCR4–NOT, decapping'), '#ffb3cf', 17, 'middle', k * (1 - sub(p, .7, .9)));
          if (cut) dg += remains(leftEnd, rightStart, chew, 1);
        }
        if (step === 7) {
          dg += remains(leftEnd, rightStart, 1, 1 - gone);
          // overzicht: drie mini-mRNA's met hun uitkomst
          const mini = (y, ptc, ejc, dim) => {
            let r = `<g opacity="${dim ? .45 : 1}"><circle cx="300" cy="${y}" r="13" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/>` +
              `<line x1="320" y1="${y}" x2="420" y2="${y}" stroke="${C.rna}" stroke-width="12" stroke-linecap="round"/><line x1="420" y1="${y}" x2="600" y2="${y}" stroke="#ff9d5c" stroke-width="12"/>` +
              `<line x1="600" y1="${y}" x2="720" y2="${y}" stroke="${C.rna}" stroke-width="12" stroke-linecap="round"/><line x1="722" y1="${y}" x2="780" y2="${y}" stroke="${C.cap}" stroke-width="7" stroke-dasharray="3 3"/>` +
              `<line x1="420" y1="${y - 13}" x2="420" y2="${y + 13}" stroke="#fff" stroke-width="2.5"/><line x1="600" y1="${y - 13}" x2="600" y2="${y + 13}" stroke="#fff" stroke-width="2.5"/>` +
              `<rect x="${ptc ? ptc - 11 : 679}" y="${y - 10}" width="22" height="20" rx="4" fill="${ptc ? C.danger : '#fff'}"/>`;
            if (ejc) r += `<circle cx="584" cy="${y - 20}" r="10" fill="#7a62e0" stroke="#0a1224" stroke-width="1.5"/>`;
            return r + '</g>' + arrow(810, y, 900, y, C.muted, 3);
          };
          const R1 = 280, R2 = 460, R3 = 640;
          const a = ease(sub(p, 0, .1)), b = ease(sub(p, .14, .3)), c = ease(sub(p, .5, .65));
          de += `<g opacity="${f1(a)}">` + note(290, R1 - 50, T2('normaal allel', 'normal allele'), C.ok, 20, 'start') + mini(R1, 0, 0, 0) +
            prot(1060, R1, 250, 42, T2('β-globine (volledig)', 'β-globin (full length)'), C.prot, 1, 19) +
            note(800, R1 + 58, T2('stop in het laatste exon → geen EJC erachter → stabiel', 'stop in the last exon → no EJC behind it → stable'), C.ok, 19) + '</g>';
          de += `<g opacity="${f1(b)}">` + note(290, R2 - 50, T2('mutant: PTC in exon 2 (codon 39), EJC erachter', 'mutant: PTC in exon 2 (codon 39), EJC behind it'), C.danger, 20, 'start') + mini(R2, 470, 1, 1) +
            `<rect x="935" y="${R2 - 21}" width="250" height="42" rx="16" fill="none" stroke="${C.muted}" stroke-width="2.5" stroke-dasharray="7 6"/>` + note(1060, R2 + 7, T2('geen eiwit', 'no protein'), C.muted, 19) + '</g>';
          de += note(800, R2 + 58, T2('mutant mRNA afgebroken → geen afgeknot β-globine', 'mutant mRNA degraded → no truncated β-globin'), C.text, 20, 'middle', b);
          de += note(1060, R2 - 40, T2('β⁰-thalassemie (recessief)', 'β⁰-thalassaemia (recessive)'), C.muted, 19, 'middle', sub(p, .32, .45));
          de += `<g opacity="${f1(c)}">` + note(290, R3 - 50, T2('ter vergelijking: PTC in het laatste exon', 'for comparison: PTC in the last exon'), '#ffd36b', 20, 'start') + mini(R3, 640, 0, 0) +
            prot(1010, R3, 150, 42, T2('afgeknot', 'truncated'), '#a8842a', 1, 19) +
            note(800, R3 + 58, T2('PTC in laatste exon → geen NMD → afgeknot eiwit', 'PTC in last exon → no NMD → truncated protein'), '#ffd36b', 20) + '</g>';
        }
        $('nm-smg').innerHTML = sm; $('nm-deg').innerHTML = dg; $('nm-dec').innerHTML = de;
        setHot(svg, 'nm-hD', step === 6 && p > .2 && p < .7 ? [X.ptc + 200, Y - 120, 110, 30] : step === 7 && p > .3 ? [1300, 470, 12, 12] : null);
      },
    };
  },
};
