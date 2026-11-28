import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { lnpParticle, knopPts, ptsPad, padPts, blaasjeOpen, PINK, LIP, PEG, CHOL } from './_bits.js';
import { blaasje, membraanPts, ptsLijn, ribosoomKlein, eiwit, kernEnvelop, ptsCirkel, cisterne, sec61, tmHelix } from '../../bio.js';

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
    nl: 'Een LNP is geen nette bol met een holte: het is een dicht pakket lipiden met mRNA in waterige binnenruimtes. We tekenen één deeltje, één endosoom en één mRNA; in werkelijkheid gaat het om miljarden deeltjes en ontsnapt slechts een kleine fractie. De opnameroute (o.a. via ApoE en de LDL-receptor) is vereenvoudigd tot "endocytose". Het eiwit van het vaccin (het spike-eiwit) is een membraaneiwit: het wordt op het ruwe ER gemaakt en via het Golgi naar het celoppervlak gebracht; dat transport tonen we niet. De kern is in werkelijkheid zo’n 100 keer groter dan het nanodeeltje.',
    en: 'An LNP is not a neat sphere with a cavity: it is a dense package of lipids with mRNA in aqueous compartments. We draw one particle, one endosome and one mRNA; in reality there are billions of particles and only a small fraction escapes. The uptake route (involving ApoE and the LDL receptor) is simplified to "endocytosis". The vaccine protein (the spike protein) is a membrane protein: it is made on the rough ER and carried via the Golgi to the cell surface; we do not show that transport. In reality the nucleus is about 100 times larger than the nanoparticle.' },
  parts: [
    { c: LIP, t: { nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }, m: ['≈ 80–100 nm'], d: { nl: 'Het vaccin: een bolletje van vier soorten vetachtige stoffen, zo’n 80 tot 100 nanometer groot, met mRNA erin.', en: 'The vaccine: a tiny ball of four kinds of fatty substances, about 80 to 100 nanometres across, with mRNA inside.' },
      p: { nl: 'Lipidenanodeeltje (LNP, ≈ 80–100 nm): dicht lipidepakket met mRNA in waterige compartimenten.', en: 'Lipid nanoparticle (LNP, ≈ 80–100 nm): dense lipid package with mRNA in aqueous compartments.' } },
    { c: PEG, t: { nl: 'PEG-lipide (buitenlaag)', en: 'PEG-lipid (outer layer)' }, d: { nl: 'Een beschermend vet aan de buitenkant dat het bolletje stabiel houdt en het samenklonteren tegengaat.', en: 'A protective fat on the outside that keeps the ball stable and stops it from clumping.' },
      p: { nl: 'PEG-gekoppeld lipide aan het oppervlak; stuurt de deeltjesgrootte en voorkomt aggregatie.', en: 'PEGylated lipid at the surface; controls particle size and prevents aggregation.' } },
    { c: CHOL, t: 'cholesterol', d: { nl: 'Een stijf vetmolecuul dat het bolletje stevig maakt.', en: 'A stiff fat molecule that makes the ball sturdy.' },
      p: { nl: 'Cholesterol stabiliseert de lipidematrix van het deeltje.', en: 'Cholesterol stabilises the lipid matrix of the particle.' } },
    { c: LIP, t: { nl: 'ioniseerbaar lipide', en: 'ionizable lipid' }, m: ['+ lading bindt het', '+ charge binds the', 'negatieve membraan', 'negative membrane'], d: { nl: 'Het vet dat het mRNA vasthoudt. In een zuur blaasje krijgt het een positieve lading en kleeft het aan de wand, die daardoor zwak wordt.', en: 'The fat that holds the mRNA. In an acidic vesicle it gets a positive charge and sticks to the wall, which then weakens.' },
      p: { nl: 'Ioniseerbaar kationisch lipide: neutraal bij fysiologische pH, geprotoneerd in het endosoom, waar het met anionische lipiden het membraan destabiliseert.', en: 'Ionisable cationic lipid: neutral at physiological pH, protonated in the endosome, where it destabilises the membrane together with anionic lipids.' } },
    { c: '#c9a574', t: { nl: 'helperfosfolipide', en: 'helper phospholipid' }, d: { nl: 'Een gewoon membraanvet dat helpt het bolletje zijn vorm te geven.', en: 'An ordinary membrane fat that helps give the ball its shape.' },
      p: { nl: 'Helperfosfolipide (bv. DSPC) dat de structuur van het deeltje ondersteunt.', en: 'Helper phospholipid (e.g. DSPC) supporting the particle structure.' } },
    { c: C.cap, t: 'm⁷G', d: { nl: 'Het kapje aan het begin van het mRNA. Ribosomen herkennen er de startkant aan.', en: 'The cap at the start of the mRNA. Ribosomes recognise the starting end by it.' },
      p: { nl: '5′-cap (7-methylguanosine), nodig voor translatie-initiatie en stabiliteit.', en: '5′ cap (7-methylguanosine), required for translation initiation and stability.' } },
    { c: C.cap, t: { nl: '5′-UTR', en: '5′ UTR' }, m: ['3′-UTR', '3′ UTR'], d: { nl: 'Stukjes vóór en na het bouwplan die niet in eiwit vertaald worden. Ze helpen het mRNA goed gelezen te worden.', en: 'Pieces before and after the building plan that are not translated into protein. They help the mRNA to be read well.' },
      p: { nl: 'Niet-vertaalde regio’s die translatie-efficiëntie en mRNA-stabiliteit bepalen.', en: 'Untranslated regions that determine translation efficiency and mRNA stability.' } },
    { c: C.prot2, t: { nl: 'coderend (antigeen)', en: 'coding (antigen)' }, d: { nl: 'Het bouwplan van het vaccin-eiwit: het eiwit dat het afweersysteem moet leren herkennen.', en: 'The building plan of the vaccine protein: the protein the immune system has to learn to recognise.' },
      p: { nl: 'Open leesraam dat het antigeen codeert (bv. het spike-eiwit).', en: 'Open reading frame encoding the antigen (e.g. the spike protein).' } },
    { c: C.rna, t: 'poly(A)', d: { nl: 'Een lange staart van A-letters aan het einde. Die beschermt het mRNA tegen snelle afbraak.', en: 'A long tail of A letters at the end. It protects the mRNA from rapid breakdown.' },
      p: { nl: 'Poly(A)-staart, bevordert stabiliteit en translatie.', en: 'Poly(A) tail, promotes stability and translation.' } },
    { c: '#ff9d5c', t: { nl: 'alle U → m1Ψ (N1-methylpseudouridine)', en: 'every U → m1Ψ (N1-methylpseudouridine)' }, m: ['minder alarm bij de cel, stabieler mRNA', 'less innate alarm, more stable mRNA'], d: { nl: 'Elke U-letter is vervangen door een aangepaste U. Zo slaat de cel minder alarm en blijft het mRNA langer heel.', en: 'Every U letter is replaced by a modified U. That makes the cell raise less alarm and keeps the mRNA intact for longer.' },
      p: { nl: 'Volledige substitutie van uridine door N1-methylpseudouridine vermindert de herkenning door aangeboren immuunsensoren.', en: 'Full substitution of uridine by N1-methylpseudouridine reduces recognition by innate immune sensors.' } },
    { c: C.muted, t: { nl: 'extracellulair', en: 'extracellular' }, d: { nl: 'Boven de celrand is het buiten de cel.', en: 'Above the cell edge is outside the cell.' },
      p: { nl: 'Extracellulaire ruimte boven het plasmamembraan.', en: 'Extracellular space above the plasma membrane.' } },
    { c: C.mem, t: { nl: 'blaasje (endosoom)', en: 'vesicle (endosome)' }, d: { nl: 'De cel slokt het bolletje op in een blaasje. Het mRNA zit dus nog niet vrij in het celvocht.', en: 'The cell swallows the ball in a vesicle. So the mRNA is not yet free in the cell fluid.' },
      p: { nl: 'Endosoom gevormd door endocytose (o.a. ApoE/LDL-receptor-gemedieerd).', en: 'Endosome formed by endocytosis (partly ApoE/LDL receptor-mediated).' } },
    { c: '#ff9d5c', t: 'pH 5,5', m: ['pH 5.5'], d: { nl: 'Hoe zuur het blaasje binnenin is. De cel pompt er zuur in.', en: 'How acidic the inside of the vesicle is. The cell pumps acid into it.' },
      p: { nl: 'Luminale pH van het late endosoom, waarbij het ioniseerbare lipide geprotoneerd wordt.', en: 'Luminal pH of the late endosome, at which the ionisable lipid becomes protonated.' } },
    { c: C.muted, t: { nl: 'orde van grootte: enkele % ontsnapt', en: 'typically only a few % escape' }, d: { nl: 'Maar een klein deel van het mRNA raakt uit het blaasje; de rest wordt afgebroken.', en: 'Only a small part of the mRNA gets out of the vesicle; the rest is broken down.' },
      p: { nl: 'Endosomale ontsnapping is inefficiënt (orde enkele procenten).', en: 'Endosomal escape is inefficient (on the order of a few per cent).' } },
    { c: C.muted, t: { nl: 'ruw ER', en: 'rough ER' }, d: { nl: 'Een zak met een vlies waarop eiwitfabriekjes zitten. Hier wordt het vaccin-eiwit gemaakt.', en: 'A sac with a membrane on which protein factories sit. The vaccine protein is made here.' },
      p: { nl: 'Ruw ER; het antigeen wordt cotranslationeel via Sec61 in het membraan gebracht.', en: 'Rough ER; the antigen is inserted cotranslationally into the membrane via Sec61.' } },
    { c: C.rrna, t: { nl: 'ribosomen', en: 'ribosomes' }, d: { nl: 'Eiwitfabriekjes op het ER die het vrijgekomen mRNA lezen en het eiwit bouwen (groene keten).', en: 'Protein factories on the ER that read the released mRNA and build the protein (green chain).' },
      p: { nl: 'ER-gebonden ribosomen op het Sec61-translocon; de groeiende keten gaat het ER-lumen in.', en: 'ER-bound ribosomes on the Sec61 translocon; the nascent chain enters the ER lumen.' } },
    { c: C.prot, t: { nl: 'antigeen-eiwit in het ER-membraan', en: 'antigen protein in the ER membrane' }, m: ['→ via het Golgi naar het celoppervlak', '→ via the Golgi to the cell surface'], d: { nl: 'Het vaccin-eiwit zit met een anker in het vlies. Het reist later naar de buitenkant van de cel, waar het afweersysteem het ziet.', en: 'The vaccine protein sits in the membrane with an anchor. It later travels to the outside of the cell, where the immune system sees it.' },
      p: { nl: 'Membraangebonden antigeen (transmembraananker), via de secretieroute naar het plasmamembraan.', en: 'Membrane-anchored antigen (transmembrane anchor), routed via the secretory pathway to the plasma membrane.' } },
    { c: '#9cc0ff', t: { nl: 'celkern', en: 'nucleus' }, m: ['(niet op schaal)', '(not to scale)'], d: { nl: 'De kern met het DNA van de cel. Het mRNA van het vaccin komt hier niet (rood kruis).', en: 'The nucleus with the cell’s DNA. The vaccine mRNA does not get here (red cross).' },
      p: { nl: 'Kern; cytosolisch mRNA wordt niet actief de kern in getransporteerd (mRNA-transport door de kernporie verloopt van kern naar cytoplasma).', en: 'Nucleus; cytosolic mRNA is not actively transported into the nucleus (mRNA transport through the nuclear pore runs from nucleus to cytoplasm).' } },
    { c: C.danger, t: { nl: 'geen reverse transcriptase · geen integratie', en: 'no reverse transcriptase · no integration' }, d: { nl: 'Het vaccin heeft geen enzym om van RNA DNA te maken, dus het kan niet in het DNA van de cel terechtkomen.', en: 'The vaccine has no enzyme to make DNA from RNA, so it cannot end up in the cell’s DNA.' },
      p: { nl: 'Het vaccin codeert geen reverse transcriptase of integrase; omzetting naar DNA en integratie maken geen deel uit van het werkingsmechanisme.', en: 'The vaccine encodes no reverse transcriptase or integrase; conversion to DNA and integration are not part of its mechanism of action.' } },
  ],
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
      'Ribosomen op het ruwe ER lezen het mRNA en maken het eiwit van het vaccin. Dat gaat naar het celoppervlak, waar het afweersysteem het leert herkennen.',
      'Ribosomes on the rough ER read the mRNA and make the vaccine protein. It goes to the cell surface, where the immune system learns to recognise it.'),
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
      <circle data-anchor="initiatie" cx="990" cy="660" r="1" fill="none"/>
      <g id="ln-ribo-body"></g>
    </g>
    <g data-node="kernimport" data-color="#9db4d8" data-label="${T2('Kernporie (hier niet gebruikt)', 'Nuclear pore (not used here)')}" id="ln-nuc" opacity="0">
      <circle data-anchor="kernimport" cx="1500" cy="290" r="1" fill="none"/>
      <g id="ln-nuc-body"></g>
    </g>
    <g id="ln-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* mRNA-schema: cap – 5'UTR – ORF – 3'UTR – poly(A) */
    const mrnaGlyph = (x, y, w, lab = 1) => {
      const seg = [[.00, .10, C.cap, T2('5′-UTR', '5′ UTR')], [.10, .78, C.prot2, T2('coderend (antigeen)', 'coding (antigen)')], [.78, .90, C.cap, T2('3′-UTR', '3′ UTR')]];
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
        // stap 2: het deeltje landt op het membraan, dat er een kuil rond vormt (k → .97, knop met hals); bij p = .6 snoert het blaasje af
        // en ligt het meteen helemaal onder het plasmamembraan (geen twee dubbellagen door elkaar), zoals in endocytose.js
        const kn = step === 2 && p < .6 ? .97 * ease(sub(p, .15, .5)) : 0, los = step === 2 && p >= .6;   // vanaf p = .5 hangt de knop aan een smalle hals (zoals in endocytose)
        if (step === 2) py = los ? lerp(MEM + KR + 23, 300, ease(sub(p, .6, .9))) : Math.max(lerp(60, MEM - 62, ease(sub(p, 0, .15))), MEM + KR * (2 * kn - 1));
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
        // stap 4: onder het blaasje (boven staat het pH-kader); vanaf stap 5 links ernaast (onder staat de notitie over de ontsnapping)
        $('ln-endo-a').setAttribute('cx', f1(step >= 4 ? px - 230 : px)); $('ln-endo-a').setAttribute('cy', f1(step === 3 ? py + 116 : step >= 4 ? py + 10 : py - 110)); $('ln-endo-a').dataset.pos = step === 3 ? 'below' : '';

        /* ontsnapt mRNA + ribosomen */
        const rOn = step === 4 ? ease(sub(p, .6, 1)) : step >= 5 ? 1 : 0;
        $('ln-ribo').setAttribute('opacity', f1(rOn));
        /* het vaccin-eiwit (spike) is een membraaneiwit: de ribosomen binden aan het ruwe ER (Sec61), de keten gaat het ER in
           en het eiwit blijft met zijn anker in het membraan; via het Golgi gaat het naar het celoppervlak (Pardi et al. 2018) */
        const ERY = 800, ERT = ERY - 35;                      // midden en bovenmembraan van het ER-stuk
        $('ln-ribo-body').innerHTML = rOn > .01
          ? `<path d="M${px - 60},${f1(py + 90)} Q980,720 934,722" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="10 8" opacity=".5"/>
             ${cisterne(1075, ERY, { len: 380, dik: 70, buig: 0, vert: false, w: 10, lumen: 'rgba(143,179,232,.16)' })}
             ${txt(1290, ERY + 7, T2('ruw ER', 'rough ER'), C.muted, 20, 'start')}
             <path d="M874,722 q26,-16 52,0 t52,0 t52,0 t52,0" stroke="${C.rna}" stroke-width="6" fill="none"/>
             ${[0, 1, 2, 3].map(i => { const x = 900 + i * 52, y = ERT - 32;   // ER-gebonden ribosoom: kleine eenheid boven het mRNA, grote eenheid op het Sec61-kanaal
               const kc = step >= 5 ? (step === 5 ? ease(sub(p, .1, .7)) : 1) : .25, L = (6 + i * 5) * kc;   // keten groeit uit de grote eenheid het ER in
               return sec61(x, ERT, { mw: 10, s: .3 }) + ribosoomKlein(x, y, { s: 1.9 }) + `<path d="M${x},${ERT - 4} v8 q${f1(-L * .4)},${f1(L * .5)} ${f1(L * .1)},${f1(L)}" stroke="${C.chain}" stroke-width="4" fill="none" stroke-linecap="round"/>`; }).join('')}
             ${step >= 5 ? `<g opacity="${f1(step === 5 ? ease(sub(p, .45, .85)) : 1)}"><!-- membraananker (TM-helix) door de ER-dubbellaag, het grote deel in het lumen (later buiten de cel) -->
               ${tmHelix(1150, ERT - 11, ERT + 12, C.prot, 1, 10)}${eiwit(1150, ERT + 23, 24, 15, C.prot, { seed: 33, bumps: .14 })}
               ${tmHelix(1215, ERT - 11, ERT + 12, C.prot, 1, 10)}${eiwit(1215, ERT + 23, 24, 15, C.prot, { seed: 34, bumps: .14 })}
               <g opacity="${f1(step === 5 ? 1 : 0)}">${txt(1075, ERY + 76, T2('antigeen-eiwit in het ER-membraan', 'antigen protein in the ER membrane'), C.prot, 20)}
               ${txt(1075, ERY + 104, T2('→ via het Golgi naar het celoppervlak', '→ via the Golgi to the cell surface'), C.muted, 19)}</g></g>` : ''}` : '';

        /* kern-uitsluiting */
        const nOn = step === 6 ? ease(sub(p, .15, .5)) : 0;
        $('ln-nuc').setAttribute('opacity', f1(nOn));
        $('ln-nuc-body').innerHTML = nOn > .01
          ? `<circle cx="1880" cy="470" r="428" fill="url(#gNuc)"/>${kernEnvelop(ptsCirkel(1880, 470, 440, 260), { poriën: [.44, .47, .5, .53, .56], w: 7, gap: 7, poreW: 16, s: .45 })}
             ${txt(1572, 470, T2('celkern', 'nucleus'), '#9cc0ff', 24)}
             ${txt(1572, 500, T2('(niet op schaal)', '(not to scale)'), C.muted, 17)}
             <path d="M1040,735 Q1330,790 1440,610" stroke="${C.danger}" stroke-width="5" fill="none" stroke-dasharray="12 9" marker-end="url(#arrow)" opacity=".9"/>
             <g transform="translate(1290 742)"><circle r="26" fill="#0b1224" stroke="${C.danger}" stroke-width="5"/><line x1="-18" y1="18" x2="18" y2="-18" stroke="${C.danger}" stroke-width="5"/></g>` : '';

        /* notities */
        let no = lab;
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .25, .6)))}">${txt(RX + 132, 540, T2('+ lading bindt het', '+ charge binds the'), LIP, 22, 'start')}
          ${txt(RX + 132, 570, T2('negatieve membraan', 'negative membrane'), LIP, 22, 'start')}
          ${txt(RX + 150, 700, T2('orde van grootte: enkele % ontsnapt', 'typically only a few % escape'), C.muted, 20)}</g>`;
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(1140, 300, T2('geen reverse transcriptase · geen integratie', 'no reverse transcriptase · no integration'), C.danger, 21)}
</g>`;
        $('ln-notes').innerHTML = no;
      },
    };
  },
};
