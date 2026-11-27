/*
 * Aminoacyl-tRNA-synthetasen — IleRS als voorbeeld: activering (aa + ATP → aa-AMP + PPi), overdracht op A76,
 * klasse I vs II, en proeflezen volgens de "dubbele zeef" (Val wordt in de editeerplaats gehydrolyseerd).
 */
import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1, aa } from '../../kit.js';
import { hud, placeHud, textBox } from './_tlkit.js';
import { eiwit, trna2d } from '../../bio.js';

/* editeerplaats: ongeveer even ver van het anticodon als de synthese-plaats en ~3 nm ernaast (in IleRS verschuift enkel het
   CCA-uiteinde van de ene holte naar de andere; het anticodon blijft vast) */
const SYN = [812, 432], EDIT = [930, 520], ACD = [612, 770];      // synthese-plaats, editeerplaats (CP1), anticodonbindend domein
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const E2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];

export default {
  id: 'aars',
  title: { nl: 'Aminoacyl-tRNA-synthetase', en: 'Aminoacyl-tRNA synthetase' },
  scale: '≈ 10 nm', time: { nl: 'snel (hier sterk vertraagd)', en: 'fast (strongly slowed down here)' },
  org: { nl: 'alle levensvormen (hier IleRS)', en: 'all domains of life (here IleRS)' },
  legend: [[C.prot, { nl: 'synthetase (IleRS)', en: 'synthetase (IleRS)' }], [C.trna, 'tRNA-Ile'], ['#5fd3e6', 'ATP / AMP / PPi'], ['#7fdc6a', { nl: 'hydrofoob aminozuur', en: 'hydrophobic amino acid' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Proef (Chapeville e.a., 1962): Cys-tRNA-Cys werd chemisch omgezet in Ala-tRNA-Cys; daarna verscheen Ala op Cys-codons. Het ribosoom controleert dus het anticodon, niet het aminozuur.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Experiment (Chapeville et al., 1962): Cys-tRNA-Cys was chemically converted into Ala-tRNA-Cys; Ala then appeared at Cys codons. So the ribosome checks the anticodon, not the amino acid.</p>' },
  simplified: {
    nl: 'Het enzym is schematisch getekend als enkele domeinen (katalytisch domein, editeerdomein CP1, anticodonbindend domein; echte IleRS: ≈ 900–1300 aminozuren; PDB 1FFY = IleRS van S. aureus, 917 aminozuren). Het tRNA is getekend als vereenvoudigd klaverblad; in 3D is het L-vormig. Proeflezen gebeurt zowel vóór (aa-AMP) als na de overdracht (aa-tRNA); hier tonen we de post-transfer-route. Klasse-I-enzymen laden meestal de 2′-OH, klasse II de 3′-OH (uitzondering: PheRS, klasse II, 2′-OH).',
    en: 'The enzyme is drawn schematically as a few domains (catalytic domain, CP1 editing domain, anticodon-binding domain; real IleRS: ≈ 900–1300 amino acids; PDB 1FFY = S. aureus IleRS, 917 amino acids). The tRNA is drawn as a simplified cloverleaf; in 3D it is L-shaped. Editing happens both before (aa-AMP) and after transfer (aa-tRNA); here we show the post-transfer route. Class I enzymes usually charge the 2′-OH, class II the 3′-OH (exception: PheRS, class II, 2′-OH).' },
  steps: [
    ST(8000, cam(820, 470, 1500), 'Een eigen enzym per aminozuur', 'Its own enzyme for each amino acid', 'Elk aminozuur heeft een eigen enzym dat het aan de juiste tRNA’s hangt. Hier wordt de code echt vertaald.', 'Each amino acid has its own enzyme that attaches it to the right tRNAs. This is where the code is really translated.'),
    ST(9000, cam(900, 460, 1000), 'Stap 1: het aminozuur klaarmaken', 'Step 1: getting the amino acid ready', 'Het enzym activeert het aminozuur (isoleucine) met energie uit ATP.', 'The enzyme activates the amino acid (isoleucine) with energy from ATP.'),
    ST(9000, cam(800, 560, 1250), 'Het enzym herkent zijn tRNA', 'The enzyme recognises its tRNA', 'Het enzym herkent ‘zijn’ tRNA aan vaste kenmerken, vooral het anticodon en de stam waar het aminozuur komt.', 'The enzyme recognises ‘its’ tRNA by fixed features, mainly the anticodon and the stem where the amino acid goes.'),
    ST(8500, cam(840, 430, 900), 'Stap 2: het tRNA wordt geladen', 'Step 2: the tRNA is loaded', 'Het aminozuur gaat naar de laatste A van het CCA-uiteinde. Het tRNA is nu geladen.', 'The amino acid moves to the last A of the CCA end. The tRNA is now loaded.'),
    ST(9000, FULL, 'Twee families van enzymen', 'Two families of enzymes', 'Er zijn twee groepen van zo’n 10 enzymen, elk met een eigen bouw. Ze grijpen het tRNA elk langs een andere kant.', 'There are two groups of about 10 enzymes, each with its own build. Each grips the tRNA from a different side.'),
    ST(9000, cam(950, 462, 1300), 'Probleem: valine lijkt op isoleucine', 'Problem: valine looks like isoleucine', 'Fenylalanine is te groot en past niet. Maar valine is net iets kleiner dan isoleucine en past wel: een fout.', 'Phenylalanine is too big and does not fit. But valine is just slightly smaller than isoleucine and does fit: a mistake.'),
    ST(9500, cam(950, 462, 1300), 'Nalezen: een tweede zeef', 'Checking: a second sieve', 'Een tweede, kleinere holte controleert. Valine past daar wel en wordt eraf geknipt; isoleucine niet.', 'A second, smaller pocket checks. Valine fits there and is cut off again; isoleucine does not.'),
    ST(8500, cam(820, 470, 1500), 'Naar het ribosoom', 'Off to the ribosome', 'Een hulpeiwit brengt het geladen tRNA naar het ribosoom. Dat controleert alleen het codon, niet het aminozuur.', 'A helper protein brings the loaded tRNA to the ribosome. It checks only the codon, not the amino acid.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="aars" data-nolabel id="rs-enz">
      ${eiwit(960, 640, 190, 150, '#7d66e0', { seed: 12, bumps: .07 })}
      ${eiwit(ACD[0] + 10, ACD[1] - 4, 135, 74, C.prot2, { seed: 14, bumps: .08 })}
      ${eiwit(SYN[0] + 30, SYN[1] - 10, 215, 175, C.prot, { seed: 11, bumps: .06 })}
      ${eiwit(EDIT[0] + 10, EDIT[1] - 6, 118, 92, '#b49bff', { seed: 13, bumps: .08 })}
      <ellipse cx="${SYN[0] + 14}" cy="${SYN[1] + 16}" rx="70" ry="54" fill="rgba(7,11,22,.75)" stroke="${C.prot}" stroke-dasharray="7 6" stroke-width="2.5"/>
      <ellipse cx="${EDIT[0]}" cy="${EDIT[1]}" rx="52" ry="40" fill="rgba(7,11,22,.75)" stroke="#ff6b6b" stroke-dasharray="7 6" stroke-width="2.5"/>
      <ellipse cx="${ACD[0]}" cy="${ACD[1]}" rx="92" ry="44" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="2"/>
      <g id="rs-lab"></g>
    </g>
    <g data-node="trna" data-color="${C.trna}" data-label="tRNA-Ile"><g id="rs-trna"></g><circle id="rs-tA" data-anchor="trna" r="1" fill="none"/></g>
    <g data-node="aminozuren" data-color="#7fdc6a" data-nolabel><g id="rs-aa"></g></g>
    <g id="rs-mol"></g>
    <g data-node="elongatie" data-color="${C.prot}" data-label="${T2('eEF1A → ribosoom (elongatie)', 'eEF1A → ribosome (elongation)')}"><g id="rs-eef"></g><circle id="rs-eA" data-anchor="elongatie" r="1" fill="none"/></g>
    <g id="rs-ov"></g>
    ${hud('rs-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'trna', label: { nl: 'tRNA-structuur', en: 'tRNA structure' }, color: C.trna },
      { node: 'codon', label: { nl: 'Genetische code', en: 'Genetic code' }, color: C.rna },
      { node: 'rnastructuur', label: { nl: 'tRNA in 3D', en: 'tRNA in 3D' }, color: C.trna, href: '../atlas/index.html?id=trna' },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    /* tRNA-Ile = het gedeelde symbool (bio.js trna2d), schuin in het enzym: anticodon in het anticodonbindende domein,
       acceptorstam naar de synthese-plaats; het enkelstrengige CCA-uiteinde buigt naar tip (= A76).
       Anticodon 5′-GAU-3′ (leest AUC/AUU), getekend zoals overal van links naar rechts 3′→5′: U A G. */
    /* L-vorm met echte verhoudingen: het hele tRNA (vaste grootte) wordt zo gedraaid dat de acceptorarm naar het doel wijst;
       enkel het korte CCA-uiteinde mag nog wat buigen (bv. van de synthese-plaats naar de editeerplaats: in werkelijkheid
       verschuift ook enkel dat uiteinde). Grootte: anticodonbindend domein → synthese-plaats, zoals in het enzym. */
    const CCA = [-15, -204], LL = Math.hypot(...CCA);
    const TS = Math.hypot(812 + 6 - 580, 432 + 30 - 760) / LL;
    const placeRot = (x, y, tip) => (Math.atan2(tip[1] - y, tip[0] - x) - Math.atan2(CCA[1], CCA[0])) * 180 / Math.PI;
    let showEnds = true;   // 3′/5′ naast het anticodon alleen waar het anticodon goed in beeld is
    function trna(ox, oy, tip, charge, op = 1, hiId = 0, bodyTip = tip) {
      if (op <= .01) return '';
      const x = 580 + ox, y = 760 + oy;
      const rot = placeRot(x, y, bodyTip), d = Math.hypot(tip[0] - x - (bodyTip[0] - tip[0]) * 0, tip[1] - y) - TS * LL;
      const far = Math.hypot(tip[0] - bodyTip[0], tip[1] - bodyTip[1]) > 8 || Math.abs(d) > 8;
      let s = `<g opacity="${f1(op)}">` + trna2d(x, y, { s: TS, rot, anticodon: 'UAG', nt: 34 / TS, tile: [.88, .88], tip: far ? tip : null, acHi: hiId, ends: showEnds });
      s += `<circle cx="${f1(tip[0])}" cy="${f1(tip[1])}" r="9" fill="${BASE.A}" stroke="#0a1224" stroke-width="2"/>`;
      if (charge) s += aa(tip[0] + charge.dx, tip[1] + charge.dy, charge.a, 24);
      $('rs-tA').setAttribute('cx', f1(x - 60)); $('rs-tA').setAttribute('cy', f1(y - 120));
      return s + '</g>';
    }
    const atp = (x, y, n = 3, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${pill(x, y, 62, 30, n === 3 ? 'ATP' : 'AMP', '#5fd3e6', 1, 16)}</g>`;
    const ppi = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${pill(x, y, 58, 28, 'PPi', '#b35a22', 1, 15)}</g>`;

    return {
      update(t, s) {
        placeHud(svg, 'rs-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        showEnds = [0, 2, 4, 7].includes(i);
        let tr = '', mol = '', amino = '', ov = '', eef = '';
        const dockOff = i < 2 ? [-620, 0] : i === 2 ? E2([-620, 0], [0, 0], ease(sub(p, .05, .5))) : [0, 0];
        const tipSyn = [SYN[0] + 6, SYN[1] + 30], tipOut = [520 + dockOff[0] + 250, 330 + dockOff[1] + 60];
        // enzymlabels alleen in de stap waar ze ertoe doen (vloeiend in/uit aan het begin van de stap)
        const VIS = { syn: [0, 1, 1, 1, 0, 1, 0, 0], edit: [0, 0, 0, 0, 0, 0, 1, 0], acd: [0, 0, 1, 0, 0, 0, 0, 0], name: [1, 1, 1, 1, 1, 1, 1, 0] };   // bij het vertrek schuift het tRNA over het enzymlabel
        const lv = k => { const a = VIS[k], c = a[i] ?? 0, pr = i > 0 ? a[i - 1] : c; return lerp(pr, c, sub(p, 0, .2)); };
        const gl = (k, sv) => lv(k) > .01 ? `<g opacity="${f1(lv(k))}">${sv}</g>` : '';
        $('rs-enz').setAttribute('opacity', i === 4 ? '1' : i === 7 ? f1(1 - .5 * sub(p, .2, .6)) : '1');
        $('rs-lab').innerHTML = gl('syn', txt(SYN[0] - 66, SYN[1] + 24, T2('synthese-plaats', 'synthetic site'), '#d6ccff', 22, 'end', 700)) +
          gl('edit', txt(EDIT[0] + 78, EDIT[1] + 50, T2('editeerplaats (CP1)', 'editing site (CP1)'), '#ff9a9a', 22, 'start', 700)) +
          gl('acd', txt(ACD[0] + 110, ACD[1] + 70, T2('anticodonbindend domein', 'anticodon-binding domain'), '#d6ccff', 22, 'start', 700)) +
          gl('name', txt(1060, 640, 'IleRS', C.prot, 34, 'middle', 800));
        
        if (i === 0) {
          tr = trna(-400, 0, [520 - 400 + 250, 390], { a: 'I', dx: 28, dy: -24 }, sub(p, .05, .3));
          $('rs-tA').setAttribute('cx', '180'); $('rs-tA').setAttribute('cy', '520');   // label rechts van de stam, niet tegen de linkerrand
          const list = 'A R N D C Q E G H I L K M F P S T W Y V'.split(' ');
          list.forEach((a, j) => { const x = 1270 + (j % 4) * 62, y = 250 + Math.floor(j / 4) * 62; amino += `<g opacity="${f1(sub(p, .25 + j * .02, .35 + j * .02))}">${aa(x, y, a, 25)}</g>`; });
          ov += txt(1363, 205, T2('20 aminozuren → ≈ 20 synthetasen', '20 amino acids → ≈ 20 synthetases'), C.text, 21, 'middle', 700);
        }
        if (i === 1) {
          const k1 = ease(sub(p, .05, .4)), k2 = ease(sub(p, .15, .5)), react = sub(p, .55, .7), leave = ease(sub(p, .7, 1));
          const ile = E2([1350, 330], [SYN[0] - 14, SYN[1] + 10], k1), a = E2([1350, 640], [SYN[0] + 48, SYN[1] + 20], k2);
          amino += aa(ile[0], ile[1], 'I', 26);
          mol += atp(a[0] + 10 * react, a[1], react > .5 ? 1 : 3);
          if (react > 0) mol += `<circle cx="${SYN[0] + 20}" cy="${SYN[1] + 14}" r="${f1(30 + 40 * react)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - react)}"/>`;
          mol += ppi(lerp(SYN[0] + 90, 1380, leave), lerp(SYN[1] + 40, 700, leave), sub(p, .6, .7));
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + txt(900, 225, T2('Ile + ATP  →  Ile-AMP + PPi', 'Ile + ATP  →  Ile-AMP + PPi'), '#fff', 30, 'middle', 800) + '</g>';
          if (react > .5) ov += txt(SYN[0] + 14, SYN[1] + 88, 'Ile-AMP', '#fff', 22, 'middle', 700);
          tr = '';
        }
        if (i >= 2 && i <= 3) {
          // Ile-AMP in het actieve centrum
          const hi = i === 2 ? sub(p, .5, .65) * (1 - sub(p, .9, 1)) : 0;
          const tr3 = i === 3 ? ease(sub(p, .15, .6)) : 0;
          const tip = i === 2 ? E2(tipOut, tipSyn, ease(sub(p, .3, .6))) : tipSyn;
          const charge = i === 3 && tr3 > .98 ? { a: 'I', dx: 30, dy: -26 } : null;
          tr = trna(dockOff[0], dockOff[1], tip, charge, 1, hi);
          if (!charge) { const ile = E2([SYN[0] - 14, SYN[1] + 10], [tip[0] + 30, tip[1] - 26], tr3); amino += aa(ile[0], ile[1], 'I', 26); }
          const ampL = i === 3 ? ease(sub(p, .6, 1)) : 0;
          mol += atp(lerp(SYN[0] + 58, 1380, ampL), lerp(SYN[1] + 20, 640, ampL), 1);
          if (i === 2) {
            ov += `<g opacity="${f1(sub(p, .5, .65))}">` + txt(ACD[0] - 140, ACD[1] - 80, T2('anticodon 5′-GAU-3′', 'anticodon 5′-GAU-3′'), '#fff', 24, 'end', 800) +
              txt(ACD[0] - 140, ACD[1] - 50, T2('= identiteitselement', '= identity element'), C.muted, 20, 'end') + '</g>' +
              `<g opacity="${f1(sub(p, .65, .8))}">` + txt(tipSyn[0] - 110, tipSyn[1] - 150, T2('acceptorstam + base 73', 'acceptor stem + base 73'), '#fff', 20, 'middle', 700) + '</g>';
          } else {
            ov += `<g opacity="${f1(sub(p, .05, .2))}">` + txt(860, 215, T2('Ile-AMP + tRNA  →  Ile-tRNA + AMP', 'Ile-AMP + tRNA  →  Ile-tRNA + AMP'), '#fff', 28, 'middle', 800) + '</g>' +
              `<g opacity="${f1(sub(p, .65, .8))}">` + txt(tipSyn[0] + 40, tipSyn[1] + 90, T2("ester op 2′-OH van A76", "ester on 2′-OH of A76"), C.chain, 20, 'start', 700) + '</g>';
          }
        }
        if (i === 4) {
          tr = trna(0, 0, tipSyn, { a: 'I', dx: 30, dy: -26 }, 1);     // IleRS + Ile-tRNA blijven in beeld als voorbeeld van klasse I
          const f = 1;
          ov += `<g opacity="${f1(f)}">` + textBox(1185, 90, 395, [T2('Rossmann-vouwing', 'Rossmann fold'), T2('motieven HIGH, KMSKS', 'motifs HIGH, KMSKS'), T2("meestal 2′-OH van A76", "usually 2′-OH of A76"), T2('bv. IleRS, MetRS, ValRS', 'e.g. IleRS, MetRS, ValRS')], { title: T2('Klasse I', 'Class I'), col: '#9b7bff', fs: 26 }) + '</g>';
          ov += `<g opacity="${f1(sub(p, .15, .3))}">` + textBox(1185, 355, 395, [T2('antiparallel β-blad', 'antiparallel β-sheet'), T2('motieven 1, 2, 3', 'motifs 1, 2, 3'), T2("meestal 3′-OH van A76", "usually 3′-OH of A76"), T2('bv. SerRS, AlaRS, ThrRS', 'e.g. SerRS, AlaRS, ThrRS')], { title: T2('Klasse II', 'Class II'), col: '#5fd3e6', fs: 26 }) + '</g>';
        }
        if (i === 5) {
          // Leu en Phe botsen af; Val past
          const bounce = (a, x0, y0, t0) => { const k = sub(p, t0, t0 + .3), d = Math.sin(Math.PI * k); return aa(lerp(x0, SYN[0] + 60, d), lerp(y0, SYN[1] - 10, d), a, 30); };
          amino += bounce('L', 1400, 250, .02) + bounce('F', 1400, 420, .18);
          if (sub(p, .02, .5) > 0 && sub(p, .02, .5) < 1) {
            const k = sub(p, .02, .5), bx = lerp(1400, SYN[0] + 60, Math.sin(Math.PI * k)), by = lerp(250, SYN[1] - 10, Math.sin(Math.PI * k));
            if (Math.sin(Math.PI * k) > .8) ov += txt(bx + 50, by - 40, T2('past niet', 'does not fit'), C.danger, 22, 'start', 800);
          }
          const kv = ease(sub(p, .45, .75));
          const val = E2([1400, 620], [tipSyn[0] + 30, tipSyn[1] - 26], kv);
          tr = trna(0, 0, tipSyn, kv > .98 ? { a: 'V', dx: 30, dy: -26 } : null, 1);
          if (kv <= .98) amino += aa(val[0], val[1], 'V', 24);
          ov += `<g opacity="${f1(sub(p, .75, .9))}">` + txt(tipSyn[0] + 40, tipSyn[1] + 100, T2('Val-tRNA-Ile: fout!', 'Val-tRNA-Ile: wrong!'), C.danger, 24, 'start', 800) + '</g>';
          ov += `<g opacity="${f1(sub(p, .05, .2))}">` + textBox(1180, 540, 360, [T2('Ile  C₆: past', 'Ile  C₆: fits'), T2('Val  C₅: past ook', 'Val  C₅: also fits'), T2('Met, Phe: passen niet', 'Met, Phe: do not fit')], { title: T2('1e zeef: synthese-plaats', '1st sieve: synthetic site'), col: C.prot, fs: 20 }) + '</g>';
        }
        if (i === 6) {
          const sw = ease(sub(p, .08, .4)), hyd = sub(p, .45, .6), out = ease(sub(p, .6, .95));
          const tip = E2(tipSyn, [EDIT[0] - 10, EDIT[1] + 16], sw);
          // het acceptoruiteinde zwaait naar de editeerplaats (anticodon blijft vast)
          tr = trna(0, 0, tip, hyd < .5 ? { a: 'V', dx: 30 * (1 - sw) + 16 * sw, dy: -26 * (1 - sw) - 10 * sw } : null, 1);
          if (hyd >= .5) amino += aa(lerp(EDIT[0] + 10, 1400, out), lerp(EDIT[1] - 20, 180, out), 'V', 24);
          if (hyd > 0 && hyd < 1) mol += `<circle cx="${EDIT[0]}" cy="${EDIT[1]}" r="${f1(30 + 40 * hyd)}" fill="none" stroke="#ff6b6b" stroke-width="3" opacity="${f1(1 - hyd)}"/>`;
          mol += `<g opacity="${f1(sub(p, .4, .5) * (1 - sub(p, .6, .7)))}">${pill(EDIT[0] + 92, EDIT[1] - 6, 60, 28, 'H₂O', '#4fb0ff', 1, 15)}</g>`;
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + textBox(1225, 380, 340, [T2('Val: past → gehydrolyseerd', 'Val: fits → hydrolysed'), T2('Ile: te groot → blijft', 'Ile: too big → stays')], { title: T2('2e zeef: editeerplaats', '2nd sieve: editing site'), col: '#ff6b6b', fs: 20 }) + '</g>';
          ov += `<g opacity="${f1(sub(p, .7, .85))}">` + txt(900, 860, T2('Resultaat: foutkans veel lager dan één zeef alleen toelaat', 'Result: error rate far lower than one sieve alone allows'), '#fff', 24, 'middle', 700) + '</g>';
        }
        if (i === 7) {
          const go = ease(sub(p, .15, .8));
          tr = trna(lerp(0, 380, go), lerp(0, -60, go), [lerp(tipSyn[0], tipSyn[0] + 380, go), lerp(tipSyn[1], tipSyn[1] - 60, go)], { a: 'I', dx: 30, dy: -26 }, 1);
          const ex = tipSyn[0] + 330, ey = tipSyn[1] - 245;
          eef = `<g opacity="${f1(sub(p, .55, .75))}">${eiwit(ex, ey, 98, 30, C.prot2, { seed: 15, label: 'eEF1A·GTP', fs: 21 })}</g>` +
            `<g opacity="${f1(sub(p, .75, .9))}"><path d="M${ex + 90},${ey} h160" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>${txt(ex + 170, ey + 40, T2('naar de A-plaats', 'to the A site'), C.rrna, 22, 'middle', 700)}</g>`;
          $('rs-eA').setAttribute('cx', f1(ex)); $('rs-eA').setAttribute('cy', f1(ey - 24));
        } else { $('rs-eA').setAttribute('cx', '-9999'); }
        $('rs-trna').innerHTML = tr; $('rs-aa').innerHTML = amino; $('rs-mol').innerHTML = mol; $('rs-ov').innerHTML = ov; $('rs-eef').innerHTML = eef;
      },
    };
  },
};
