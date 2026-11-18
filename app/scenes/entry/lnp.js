import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { lnpParticle, knopPts, ptsPad, padPts, blaasjeOpen, PINK, LIP, PEG, CHOL } from './_bits.js';
import { blaasje, membraanPts, ptsLijn, ribosoomKlein, eiwit, kernEnvelop, ptsCirkel } from '../../bio.js';

/* Zijpad: hoe een mRNA-vaccin zijn boodschap in het cytosol krijgt. */
const AX = 420, AY = 330, AR = 130;      // anatomie links
const MEM = 150, RX = 1130;              // celmembraan en route rechts
const KR = 96;                           // straal van de kuil / het nieuwe blaasje
const RAND = padPts('M760,1000 C820,700 860,' + MEM + ' 1000,' + MEM, 12).slice(0, -1);
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
    ST(8000, cam(AX, AY + 20, 1060), 'Een bolletje van vetachtige stoffen', 'A tiny ball of fatty molecules',
      'Het vaccin is een bolletje van vier soorten vetachtige moleculen (lipiden). Eén ervan houdt het mRNA vast.',
      'The vaccine is a tiny ball of four kinds of fatty molecules (lipids). One of them holds on to the mRNA.'),
    ST(8000, cam(AX, AY + 110, 1000), 'Binnenin: aangepast mRNA', 'Inside: modified mRNA',
      'Het lijkt op gewoon mRNA, maar elke U is vervangen door een variant die het afweersysteem minder alarmeert.',
      'It looks like ordinary mRNA, but every U is replaced by a variant that alarms the immune system less.'),
    ST(7000, cam(RX, 250, 880), 'De cel slokt het bolletje op', 'The cell swallows the ball',
      'Het bolletje komt in een blaasje in de cel terecht, niet meteen in de celvloeistof.',
      'The ball ends up in a vesicle inside the cell, not straight in the cell fluid.'),
    ST(7000, cam(RX, 430, 860), 'Het blaasje wordt zuur', 'The vesicle turns acidic',
      'De cel pompt zuur in het blaasje. Daardoor worden de lipiden die het mRNA vasthouden positief geladen.',
      'The cell pumps acid into the vesicle. This makes the lipids that hold the mRNA positively charged.'),
    ST(7000, cam(RX, 560, 900), 'Maar weinig mRNA ontsnapt', 'Only a little mRNA escapes',
      'De positieve lipiden maken de wand van het blaasje zwak. Maar slechts een klein deel van het mRNA raakt eruit.',
      'The positive lipids weaken the wall of the vesicle. But only a small part of the mRNA gets out.'),
    ST(7000, cam(1080, 720, 1000), 'Ribosomen maken het vaccin-eiwit', 'Ribosomes make the vaccine protein',
      'Ribosomen lezen het mRNA meteen en maken het eiwit van het vaccin. Het afweersysteem leert dat eiwit herkennen.',
      'Ribosomes read the mRNA straight away and make the vaccine protein. The immune system learns to recognise it.'),
    ST(7000, cam(1130, 520, 1080), 'Het mRNA gaat niet naar de kern', 'The mRNA does not enter the nucleus',
      'Niets brengt het mRNA naar de kern, en het vaccin kan er geen DNA van maken. Na enkele dagen is het afgebroken.',
      'Nothing carries the mRNA into the nucleus, and the vaccine cannot turn it into DNA. Within days it is broken down.'),
  ],

  svg() {
    return svgOpen() + `
    <path id="ln-cyto" fill="url(#gCyto)"/>
    <g id="ln-mem"></g>
    <text x="1380" y="${MEM - 30}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('extracellulair', 'extracellular')}</text>
    <g id="ln-anat"></g>
    <g data-node="mrnaafbraak" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-label="${T2('mRNA — in 3D', 'mRNA — in 3D')}" id="ln-mrna" opacity="0">
      <circle data-anchor="mrnaafbraak" cx="${AX + 260}" cy="${AY + 180}" r="1" fill="none"/>
      <g id="ln-mrna-body"></g>
    </g>
    <g data-node="endocytose" data-color="${C.mem}" data-label="${T2('Endocytose & endosoom', 'Endocytosis & endosome')}">
      <circle id="ln-endo-a" data-anchor="endocytose" cx="${RX}" cy="300" r="1" fill="none"/>
      <g id="ln-endo"></g>
    </g>
    <g id="ln-part"></g>
    <g data-node="initiatie" data-color="${C.rrna}" data-label="${T2('Ribosomen · translatie', 'Ribosomes · translation')}" id="ln-ribo" opacity="0">
      <circle data-anchor="initiatie" data-pos="below" cx="930" cy="790" r="1" fill="none"/>
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
             ${txt(AX + 20, AY + 315, T2('minder alarm bij de cel, stabieler mRNA', 'less innate alarm, more stable mRNA'), C.muted, 20)}</g>` : '';
        if (step === 1) lab += `<g opacity="${f1(ease(sub(p, .05, .3)))}"><line x1="${AX}" y1="${AY + AR + 10}" x2="${AX}" y2="${AY + 180}" stroke="${C.rna}" stroke-width="2" stroke-dasharray="6 5"/></g>`;

        /* route rechts */
        let px = RX, py = 60, pr = 58, endo = '', escape = 0;
        // stap 2: het deeltje landt op het membraan, dat er een kuil rond vormt (k → .97); bij p = .6 snoert het blaasje af
        const kn = step === 2 && p < .6 ? .97 * ease(sub(p, .15, .58)) : 0, los = step === 2 && p >= .6;
        if (step === 2) py = los ? lerp(MEM + KR * .94, 300, ease(sub(p, .6, .9))) : Math.max(lerp(60, MEM - 62, ease(sub(p, 0, .15))), MEM + KR * (2 * kn - 1));
        else if (step === 3) { const u = ease(sub(p, .1, .8)); py = lerp(300, 460, u); }
        else if (step === 4) { const u = ease(sub(p, .1, .7)); py = lerp(460, 560, u); escape = ease(sub(p, .45, .95)); }
        else if (step >= 5) { py = 560; escape = 1; }
        const partOp = step <= 1 ? 0 : step === 6 ? .55 : 1;     // stap 2 begint meteen met het deeltje boven de cel (geen donker beginbeeld)
        $('ln-part').innerHTML = partOp > .01
          ? `<g transform="translate(${px} ${f1(py)})">${lnpParticle(pr, partOp, { protonated: step >= 3 ? (step === 3 ? ease(sub(p, .3, .8)) : 1) : 0 })}</g>` : '';

        /* celrand: links buigt het membraan naar beneden (hoek van de cel), zodat het niet recht afgekapt eindigt */
        const mP = RAND.concat(knopPts(1000, MEM, 2000, MEM, RX - 1000, KR, kn));
        $('ln-cyto').setAttribute('d', ptsPad(mP) + ' L2000,1600 L760,1600Z');
        $('ln-mem').innerHTML = membraanPts(mP, { w: 22 });
        if (step === 2) {
          endo = los ? blaasje(px, py, lerp(KR, 104, ease(sub(p, .6, .9))), { w: 20 }) : '';
        } else if (step === 3) {
          endo = `${blaasje(px, py, 104, { w: 20 })}
            <rect x="${px - 62}" y="${f1(py - 160)}" width="124" height="38" rx="12" fill="#0b1224" stroke="#ff9d5c" stroke-width="2.5"/>
            ${txt(px, f1(py - 133), L({ nl: 'pH 5,5', en: 'pH 5.5' }), '#ff9d5c', 24)}`;
        } else if (step >= 4) {
          // het verzwakte membraan scheurt linksonder open, waar het mRNA naar buiten glipt
          const k = step === 4 ? ease(sub(escape, 0, .4)) : 1;
          endo = blaasjeOpen(px, py, 104, k > .02 ? [[124 - 22 * k, 124 + 22 * k], [40, 40 + 14 * k]] : [], { w: 20 });
        }
        $('ln-endo').innerHTML = step >= 2 ? endo : '';
        $('ln-endo-a').setAttribute('cy', f1(py - 110));

        /* ontsnapt mRNA + ribosomen */
        const rOn = step === 4 ? ease(sub(p, .6, 1)) : step >= 5 ? 1 : 0;
        $('ln-ribo').setAttribute('opacity', f1(rOn));
        $('ln-ribo-body').innerHTML = rOn > .01
          ? `<path d="M${px - 60},${f1(py + 90)} Q960,720 880,730" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="10 8" opacity=".5"/>
             <path d="M820,730 q26,-20 52,0 t52,0 t52,0 t52,0" stroke="${C.rna}" stroke-width="6" fill="none"/>
             ${[0, 1, 2, 3].map(i => { const x = 846 + i * 52,   /* volledig rechts van de celrand: translatie in het cytosol */ y = 730 + (i % 2 ? 17 : -3);   // ribosoom (twee eenheden), mRNA tussen beide
               const kc = step >= 5 ? (step === 5 ? ease(sub(p, .1, .7)) : 1) : .25, L = (8 + i * 6) * kc;   // kort genoeg om in beeld te blijven   // keten groeit uit de grote eenheid
               return ribosoomKlein(x, y, { s: 1.9 }) + `<path d="M${x},${y + 24} q${f1(-L * .4)},${f1(L * .5)} ${f1(L * .1)},${f1(L)}" stroke="${C.chain}" stroke-width="4" fill="none" stroke-linecap="round"/>`; }).join('')}
             ${step >= 5 ? `<g opacity="${f1(step === 5 ? ease(sub(p, .45, .85)) : 1)}">
               <path d="M${f1(1002)},${f1(754)} q14,-30 34,-52" stroke="${C.chain}" stroke-width="3" fill="none" stroke-dasharray="5 6" opacity=".7"/>
               ${eiwit(1066, 680, 32, 23, C.prot, { seed: 33, bumps: .14 })}${eiwit(1132, 700, 26, 20, C.prot, { seed: 34, bumps: .14 })}
               ${txt(1166, 690, T2('antigeen-eiwit', 'antigen protein'), C.prot, 21, 'start')}</g>` : ''}` : '';

        /* kern-uitsluiting */
        const nOn = step === 6 ? ease(sub(p, .15, .5)) : 0;
        $('ln-nuc').setAttribute('opacity', f1(nOn));
        $('ln-nuc-body').innerHTML = nOn > .01
          ? `<circle cx="1480" cy="420" r="128" fill="url(#gNuc)"/>${kernEnvelop(ptsCirkel(1480, 420, 140, 90), { poriën: [.05, .2, .35, .5, .65, .8, .95], w: 7, gap: 7, poreW: 16, s: .45 })}
             ${txt(1480, 430, T2('celkern', 'nucleus'), '#9cc0ff', 24)}
             <path d="M1040,735 Q1330,790 1420,580" stroke="${C.danger}" stroke-width="5" fill="none" stroke-dasharray="12 9" marker-end="url(#arrow)" opacity=".9"/>
             <g transform="translate(1290 742)"><circle r="26" fill="#0b1224" stroke="${C.danger}" stroke-width="5"/><line x1="-18" y1="18" x2="18" y2="-18" stroke="${C.danger}" stroke-width="5"/></g>` : '';

        /* notities */
        let no = lab;
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .25, .6)))}">${txt(RX - 330, 600, T2('+ lading bindt het', '+ charge binds the'), LIP, 22)}
          ${txt(RX - 330, 630, T2('negatieve membraan', 'negative membrane'), LIP, 22)}
          ${txt(RX + 150, 700, T2('orde van grootte: enkele % ontsnapt', 'order of magnitude: a few % escapes'), C.muted, 20)}</g>`;
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(1140, 300, T2('geen reverse transcriptase · geen integratie', 'no reverse transcriptase · no integration'), C.danger, 21)}
</g>`;
        $('ln-notes').innerHTML = no;
      },
    };
  },
};
