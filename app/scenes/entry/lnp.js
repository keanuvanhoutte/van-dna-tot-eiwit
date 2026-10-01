import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { lnpParticle, bilayer, PINK, LIP, PEG, CHOL } from './_bits.js';

/* Zijpad: hoe een mRNA-vaccin zijn boodschap in het cytosol krijgt. */
const AX = 420, AY = 330, AR = 130;      // anatomie links
const MEM = 150, RX = 1130;              // celmembraan en route rechts
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'lnp',
  title: { nl: 'mRNA-vaccin (lipidenanodeeltje)', en: 'mRNA vaccine (lipid nanoparticle)' },
  scale: { nl: '≈ 80–100 nm (nanodeeltje)', en: '≈ 80–100 nm (nanoparticle)' },
  time: { nl: 'opname in minuten, eiwit binnen uren', en: 'uptake in minutes, protein within hours' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [[LIP, { nl: 'ioniseerbaar lipide', en: 'ionizable lipid' }], [PEG, 'PEG-lipide'], [CHOL, { nl: 'cholesterol', en: 'cholesterol' }],
    ['#c9a574', { nl: 'helperfosfolipide / membraan', en: 'helper phospholipid / membrane' }], [C.rna, 'mRNA'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'eiwit (antigeen)', en: 'protein (antigen)' }]],
  simplified: {
    nl: 'Een LNP is geen nette bol met een holte: het is een dicht pakket lipiden met mRNA in waterige binnenruimtes. We tekenen één deeltje, één endosoom en één mRNA; in werkelijkheid gaat het om miljarden deeltjes en ontsnapt slechts een kleine fractie. De opnameroute (o.a. via ApoE en de LDL-receptor) is vereenvoudigd tot "endocytose".',
    en: 'An LNP is not a neat sphere with a cavity: it is a dense package of lipids with mRNA in aqueous compartments. We draw one particle, one endosome and one mRNA; in reality there are billions of particles and only a small fraction escapes. The uptake route (involving ApoE and the LDL receptor) is simplified to "endocytosis".' },
  steps: [
    ST(8000, cam(AX, AY + 20, 1060), 'Vier soorten lipiden', 'Four kinds of lipid',
      'Een bolletje uit vier soorten lipiden (vetachtige moleculen). Het ioniseerbare lipide houdt het mRNA vast; cholesterol geeft stevigheid en het PEG-lipide houdt deeltjes uit elkaar.',
      'A tiny ball of four kinds of lipids (fatty molecules). The ionizable lipid holds the mRNA; cholesterol adds rigidity and the PEG-lipid keeps particles apart.'),
    ST(8000, cam(AX, AY + 110, 1000), 'De boodschap: aangepast mRNA', 'The message: modified mRNA',
      'Het mRNA heeft, net als eigen mRNA, een kap, een coderend deel en een poly(A)-staart. Alle U\'s zijn vervangen door een variant (m1Ψ) die het afweersysteem minder alarmeert.',
      'Like the cell’s own mRNA, it has a cap, a coding part and a poly(A) tail. Every U is replaced by a variant (m1Ψ) that alarms the immune system less.'),
    ST(7000, cam(RX, 250, 880), 'Opname via endocytose', 'Uptake by endocytosis',
      'De cel slokt het deeltje op in een blaasje (endocytose). Het komt dus niet rechtstreeks in het cytosol terecht.',
      'The cell swallows the particle in a vesicle (endocytosis). So it does not arrive directly in the cytosol.'),
    ST(7000, cam(RX, 430, 860), 'Het endosoom verzuurt', 'The endosome acidifies',
      'De cel pompt zuur in het blaasje. Het ioniseerbare lipide is neutraal in het bloed (pH 7,4), maar wordt in die zure omgeving positief geladen.',
      'The cell pumps acid into the vesicle. The ionizable lipid is neutral in the blood (pH 7.4), but becomes positively charged in this acidic environment.'),
    ST(7000, cam(RX, 560, 900), 'Ontsnapping — het knelpunt', 'Escape — the bottleneck',
      'De positieve lipiden trekken aan het negatief geladen membraan van het blaasje, dat daardoor instabiel wordt. Maar slechts een klein deel van het mRNA ontsnapt zo naar het cytosol.',
      'The positive lipids pull on the negatively charged membrane of the vesicle, which becomes unstable. But only a small part of the mRNA escapes into the cytosol this way.'),
    ST(7000, cam(1080, 720, 1000), 'Translatie in het cytosol', 'Translation in the cytosol',
      'Ribosomen lezen het mRNA meteen en maken het eiwit van het vaccin (het antigeen). Het afweersysteem leert dat eiwit herkennen.',
      'Ribosomes read the mRNA straight away and make the vaccine protein (the antigen). The immune system learns to recognise that protein.'),
    ST(7000, cam(1130, 520, 1080), 'Niet naar de kern', 'Never into the nucleus',
      'Niets brengt dit mRNA naar de kern, en het vaccin bevat geen enzym om er DNA van te maken. Het belandt dus niet in het genoom en is na enkele dagen afgebroken.',
      'Nothing carries this mRNA into the nucleus, and the vaccine contains no enzyme to turn it into DNA. So it does not end up in the genome, and it is broken down within days.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="620" y="${MEM}" width="1400" height="1400" fill="url(#gCyto)"/>
    <g id="ln-mem">${bilayer(`M620,${MEM} L2000,${MEM}`)}</g>
    <text x="1400" y="${MEM - 30}" font-size="17" fill="${C.muted}" font-family="Inter" opacity=".6">${T2('extracellulair', 'extracellular')}</text>
    <g id="ln-anat"></g>
    <g data-node="mrnaafbraak" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-label="${T2('mRNA — atlas', 'mRNA — atlas')}" id="ln-mrna" opacity="0">
      <circle data-anchor="mrnaafbraak" cx="${AX + 260}" cy="${AY + 180}" r="1" fill="none"/>
      <g id="ln-mrna-body"></g>
    </g>
    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose & endosoom', 'Endocytosis & endosome')}">
      <circle id="ln-endo-a" data-anchor="endocytose" cx="${RX}" cy="300" r="1" fill="none"/>
      <g id="ln-endo"></g>
    </g>
    <g id="ln-part"></g>
    <g data-node="initiatie" data-color="${C.rrna}" data-label="${T2('Ribosomen · translatie', 'Ribosomes · translation')}" id="ln-ribo" opacity="0">
      <circle data-anchor="initiatie" data-pos="below" cx="1080" cy="830" r="1" fill="none"/>
      <g id="ln-ribo-body"></g>
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Kernporie (hier niet gebruikt)', 'Nuclear pore (not used here)')}" id="ln-nuc" opacity="0">
      <circle data-anchor="kernimport" cx="1480" cy="275" r="1" fill="none"/>
      <g id="ln-nuc-body"></g>
    </g>
    <g id="ln-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* mRNA-schema: cap – 5'UTR – ORF – 3'UTR – poly(A) */
    const mrnaGlyph = (x, y, w, lab = 1) => {
      const seg = [[.00, .10, C.cap, "5'UTR"], [.10, .78, C.prot2, T2('coderend (antigeen)', 'coding (antigen)')], [.78, .90, C.cap, "3'UTR"]];
      let s = `<g><circle cx="${f1(x - 18)}" cy="${f1(y + 13)}" r="17" fill="${C.cap}" stroke="${C.rna}" stroke-width="2.5"/>${txt(x - 18, y + 18, 'm⁷G', '#3a1a05', 12)}`;
      for (const [a, b, col, name] of seg) {
        s += `<rect x="${f1(x + a * w)}" y="${f1(y)}" width="${f1((b - a) * w)}" height="26" rx="8" fill="${col}" opacity=".85"/>`;
        if (lab) s += txt(x + (a + b) / 2 * w, y + 48, name, col, 17);
      }
      s += `<path d="M${f1(x + .9 * w)},${f1(y + 13)} q10,-12 20,0 t20,0 t20,0 t20,0" stroke="${C.rna}" stroke-width="5" fill="none"/>`;
      if (lab) s += txt(x + w + 40, y + 48, 'poly(A)', C.rna, 17);
      return s + '</g>';
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;

        /* anatomie links */
        const anatOp = step <= 1 ? 1 : step === 2 ? 1 - ease(clamp(p / .35)) : 0;
        $('ln-anat').innerHTML = anatOp > .01
          ? `<g transform="translate(${AX} ${f1(AY + Math.sin(tt * .6) * 3)})" opacity="${f1(anatOp)}">${lnpParticle(AR, 1, {})}</g>` : '';
        let lab = '';
        if (step === 0 && anatOp > .01) {
          const k = ease(sub(p, .15, .55));
          lab += `<g opacity="${f1(k)}">
            ${txt(AX + AR + 150, AY - AR - 10, T2('PEG-lipide (buitenlaag)', 'PEG-lipid (outer layer)'), PEG, 21)}
            <line x1="${AX + AR + 60}" y1="${AY - AR}" x2="${AX + AR * .74}" y2="${AY - AR * .68}" stroke="${PEG}" stroke-width="2"/>
            ${txt(AX + AR + 78, AY + 41, T2('cholesterol', 'cholesterol'), CHOL, 21, 'start')}
            <line x1="${AX + AR + 70}" y1="${AY + 34}" x2="${AX + AR * .88}" y2="${AY + 10}" stroke="${CHOL}" stroke-width="2"/>
            ${txt(AX - AR - 58, AY - 36, T2('ioniseerbaar lipide', 'ionizable lipid'), LIP, 21, 'end')}
            <line x1="${AX - AR - 50}" y1="${AY - 43}" x2="${AX - AR * .95}" y2="${AY - 14}" stroke="${LIP}" stroke-width="2"/>
            ${txt(AX - AR - 58, AY + 119, T2('helperfosfolipide', 'helper phospholipid'), '#c9a574', 21, 'end')}
            <line x1="${AX - AR - 50}" y1="${AY + 112}" x2="${AX - AR * .6}" y2="${AY + AR * .62}" stroke="#c9a574" stroke-width="2"/>
            ${txt(AX, AY - AR - 62, T2('≈ 80–100 nm', '≈ 80–100 nm'), C.text, 23)}</g>`;
        }
        const mOn = step === 1 ? ease(sub(p, .1, .4)) : 0;
        $('ln-mrna').setAttribute('opacity', f1(mOn));
        $('ln-mrna-body').innerHTML = mOn > .01
          ? `<g>${mrnaGlyph(AX - 280, AY + 190, 520)}
             ${txt(AX + 20, AY + 285, T2('alle U → m1Ψ (N1-methylpseudouridine)', 'every U → m1Ψ (N1-methylpseudouridine)'), '#ff9d5c', 22)}
             ${txt(AX + 20, AY + 315, T2('minder alarm bij de cel, meer eiwit', 'less innate alarm, more protein'), C.muted, 20)}</g>` : '';
        if (step === 1) lab += `<g opacity="${f1(ease(sub(p, .05, .3)))}"><line x1="${AX}" y1="${AY + AR + 10}" x2="${AX}" y2="${AY + 180}" stroke="${C.rna}" stroke-width="2" stroke-dasharray="6 5"/></g>`;

        /* route rechts */
        let px = RX, py = 60, pr = 58, endo = '', escape = 0;
        if (step === 2) { const u = ease(sub(p, .1, .8)); py = lerp(60, 300, u); }
        else if (step === 3) { const u = ease(sub(p, .1, .8)); py = lerp(300, 460, u); }
        else if (step === 4) { const u = ease(sub(p, .1, .7)); py = lerp(460, 560, u); escape = ease(sub(p, .45, .95)); }
        else if (step >= 5) { py = 560; escape = 1; }
        const partOp = step <= 1 ? 0 : step === 2 ? ease(clamp(p / .3)) : step === 6 ? .55 : 1;
        $('ln-part').innerHTML = partOp > .01
          ? `<g transform="translate(${px} ${f1(py)})">${lnpParticle(pr, partOp, { protonated: step >= 3 ? (step === 3 ? ease(sub(p, .3, .8)) : 1) : 0 })}</g>` : '';

        if (step === 2) {
          const k = ease(sub(p, .35, .9));
          endo = `<circle cx="${px}" cy="${f1(py)}" r="${f1(lerp(78, 100, k))}" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7" opacity="${f1(k)}"/>`;
        } else if (step === 3) {
          endo = `<circle cx="${px}" cy="${f1(py)}" r="104" fill="rgba(201,165,116,.10)" stroke="${C.mem}" stroke-width="7"/>
            <rect x="${px - 62}" y="${f1(py - 160)}" width="124" height="38" rx="12" fill="#0b1224" stroke="#ff9d5c" stroke-width="2.5"/>
            ${txt(px, f1(py - 133), L({ nl: 'pH 5,5', en: 'pH 5.5' }), '#ff9d5c', 24)}`;
        } else if (step >= 4) {
          const k = step === 4 ? escape : 1;
          endo = `<path d="M${px - 104},${f1(py)} a104,104 0 1,1 68,88" fill="none" stroke="${C.mem}" stroke-width="7" stroke-dasharray="${k > .2 ? '26 18' : '1 0'}"/>`;
        }
        $('ln-endo').innerHTML = step >= 2 ? endo : '';
        $('ln-endo-a').setAttribute('cy', f1(py - 110));

        /* ontsnapt mRNA + ribosomen */
        const rOn = step === 4 ? ease(sub(p, .6, 1)) : step >= 5 ? 1 : 0;
        $('ln-ribo').setAttribute('opacity', f1(rOn));
        $('ln-ribo-body').innerHTML = rOn > .01
          ? `<path d="M${px - 60},${f1(py + 90)} Q900,740 820,760" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="10 8" opacity=".5"/>
             <path d="M760,760 q26,-20 52,0 t52,0 t52,0 t52,0" stroke="${C.rna}" stroke-width="6" fill="none"/>
             ${[0, 1, 2, 3].map(i => `<g transform="translate(${f1(786 + i * 52)} ${f1(752 + (i % 2) * 6)})"><circle r="21" fill="${C.rrna}"/><circle cy="16" r="14" fill="#1f9d86"/></g>`).join('')}
             ${step >= 5 ? `<g opacity="${f1(step === 5 ? ease(sub(p, .35, .8)) : 1)}">${[0, 1, 2, 3, 4].map(i => `<circle cx="${f1(1010 + i * 26)}" cy="${f1(700 - i * 10)}" r="13" fill="${C.prot}" stroke="#2a1f4a" stroke-width="1.5"/>`).join('')}
               ${txt(1235, 705, T2('antigeen-eiwit', 'antigen protein'), C.prot, 21)}</g>` : ''}` : '';

        /* kern-uitsluiting */
        const nOn = step === 6 ? ease(sub(p, .15, .5)) : 0;
        $('ln-nuc').setAttribute('opacity', f1(nOn));
        $('ln-nuc-body').innerHTML = nOn > .01
          ? `<circle cx="1480" cy="420" r="140" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>
             ${txt(1480, 430, T2('celkern', 'nucleus'), '#9cc0ff', 24)}
             <path d="M960,790 Q1330,790 1420,580" stroke="${C.danger}" stroke-width="5" fill="none" stroke-dasharray="12 9" marker-end="url(#arrow)" opacity=".9"/>
             <g transform="translate(1290 750)"><circle r="26" fill="#0b1224" stroke="${C.danger}" stroke-width="5"/><line x1="-18" y1="18" x2="18" y2="-18" stroke="${C.danger}" stroke-width="5"/></g>` : '';

        /* notities */
        let no = lab;
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .25, .6)))}">${txt(RX - 330, 600, T2('+ lading bindt het', '+ charge binds the'), LIP, 22)}
          ${txt(RX - 330, 630, T2('negatieve membraan', 'negative membrane'), LIP, 22)}
          ${txt(RX + 150, 700, T2('orde van grootte: enkele % ontsnapt', 'order of magnitude: a few % escapes'), C.muted, 20)}</g>`;
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(1000, 250, T2('geen reverse transcriptase · geen integratie', 'no reverse transcriptase · no integration'), C.danger, 23)}
</g>`;
        $('ln-notes').innerHTML = no;
      },
    };
  },
};
