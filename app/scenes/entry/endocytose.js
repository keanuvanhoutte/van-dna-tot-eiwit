import { C, L, T2, svgOpen, pill, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { capsid, viralGenome, bilayer, triskelion, lnpParticle, PINK, FIBRE, LIP } from './_bits.js';

/* Hoofdstuk 3: van klathrine-put tot endosomale ontsnapping (of afbraak in het lysosoom). */
const MEM = 170, PX = 520;
const EE = [650, 440, 108];    // vroeg endosoom
const LE = [900, 605, 126];    // laat endosoom
const LY = [1270, 745, 132];   // lysosoom
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const pHcol = v => v > 6.2 ? '#7fdc6a' : v > 5.8 ? '#ffc247' : v > 5 ? '#ff9d5c' : '#ff6b6b';

export default {
  id: 'endocytose',
  title: { nl: 'Endocytose & endosomale ontsnapping', en: 'Endocytosis & endosomal escape' },
  scale: { nl: '≈ 100 nm (blaasje) – 1 µm (endosoom)', en: '≈ 100 nm (vesicle) – 1 µm (endosome)' },
  time: { nl: 'blaasje in ~1 min, rijping in ~10–30 min', en: 'vesicle in ~1 min, maturation in ~10–30 min' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [['#8fa8ff', { nl: 'klathrine', en: 'clathrin' }], [C.prot, { nl: 'dynamine, v-ATPase', en: 'dynamin, v-ATPase' }],
    [C.mem, { nl: 'membraan / endosoom', en: 'membrane / endosome' }], [PINK, { nl: 'adenovirus', en: 'adenovirus' }],
    [LIP, { nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }], ['#8d6cc4', { nl: 'lysosoom', en: 'lysosome' }], [C.rna, 'mRNA']],
  simplified: {
    nl: 'Eén endosoom draagt hier zowel een virus als een lipidenanodeeltje; in werkelijkheid zitten die in aparte blaasjes. De pH-waarden zijn typische waarden (vroeg ≈ 6,5, laat ≈ 5,5, lysosoom ≈ 4,5) en variëren per celtype. Van de klathrine-mand tekenen we enkele triskelia, niet het hele veelvlak; adaptoren (AP-2), Rab-eiwitten en ESCRT zijn weggelaten. Het adenovirus ontsnapt in werkelijkheid al uit het vroege endosoom (proteïne VI werkt los van de pH); hier tonen we beide ontsnappingen na elkaar om het overzichtelijk te houden.',
    en: 'A single endosome here carries both a virus and a lipid nanoparticle; in reality these travel in separate vesicles. The pH values are typical (early ≈ 6.5, late ≈ 5.5, lysosome ≈ 4.5) and vary between cell types. Of the clathrin cage we draw a few triskelia, not the whole polyhedron; adaptors (AP-2), Rab proteins and ESCRT are omitted. In reality adenovirus already escapes from the early endosome (protein VI acts independently of pH); here both escapes are shown one after the other to keep it clear.' },
  steps: [
    ST(6000, cam(PX, 200, 860), 'Vracht wordt verzameld', 'Cargo is collected',
      'Receptoren met hun vracht worden door adaptoreiwitten in een klein stukje membraan bijeengebracht.',
      'Receptors with their cargo are gathered into a small patch of membrane by adaptor proteins.'),
    ST(6000, cam(PX, 250, 820), 'De klathrine-put', 'The clathrin-coated pit',
      'Klathrine-triskelia koppelen aan elkaar tot een gebogen mandje; het membraan stulpt naar binnen.',
      'Clathrin triskelia link into a curved cage; the membrane buds inward.'),
    ST(6000, cam(PX, 300, 720), 'Dynamine knipt de hals door', 'Dynamin cuts the neck',
      'Dynamine wikkelt zich als een spiraal om de hals en knijpt die met GTP-hydrolyse dicht: het blaasje komt los.',
      'Dynamin wraps around the neck as a spiral and severs it using GTP hydrolysis: the vesicle is released.'),
    ST(7000, cam(600, 400, 900), 'Vroeg endosoom · pH ≈ 6,5', 'Early endosome · pH ≈ 6.5',
      'De klathrine-jas valt eraf en het blaasje fuseert met een vroeg endosoom. De v-ATPase pompt H⁺ naar binnen: de pH zakt.',
      'The clathrin coat falls off and the vesicle fuses with an early endosome. The v-ATPase pumps H⁺ inward: the pH drops.'),
    ST(7000, cam(870, 560, 1100), 'Rijping · pH ≈ 5,5', 'Maturation · pH ≈ 5.5',
      'Het endosoom rijpt naar een laat endosoom en wordt zuurder. Die verzuring is het signaal waar veel virussen en nanodeeltjes op wachten.',
      'The endosome matures into a late endosome and becomes more acidic. That acidification is the cue many viruses and nanoparticles wait for.'),
    ST(7000, cam(830, 590, 820), 'Ontsnapping 1: proteïne VI', 'Escape 1: protein VI',
      'Het adenovirus wacht niet op verzuring: al vroeg komt het membraanlytische proteïne VI vrij uit het capside en breekt het endosoommembraan open, los van de pH.',
      'Adenovirus does not wait for acidification: early on, the membrane-lytic protein VI is released from the capsid and ruptures the endosomal membrane, independently of pH.'),
    ST(7000, cam(1010, 570, 900), 'Ontsnapping 2: ioniseerbaar lipide', 'Escape 2: ionizable lipid',
      'De ioniseerbare lipiden van een LNP zijn neutraal bij pH 7,4 maar worden hier positief; het membraan destabiliseert en wat mRNA komt vrij.',
      'The ionizable lipids of an LNP are neutral at pH 7.4 but become positive here; the membrane destabilises and some mRNA is released.'),
    ST(6000, cam(1200, 700, 860), 'Wie niet ontsnapt: het lysosoom', 'No escape: the lysosome',
      'Het grootste deel van de vracht ontsnapt niet en komt in het lysosoom (pH ≈ 4,5) terecht, waar hydrolasen alles afbreken.',
      'Most of the cargo does not escape and ends up in the lysosome (pH ≈ 4.5), where hydrolases break everything down.'),
    ST(7000, cam(820, 500, 1450), 'Twee uitkomsten', 'Two outcomes',
      'Het virale capside gaat nu over microtubuli naar een kernporie; het vrijgekomen mRNA wordt meteen door ribosomen gelezen.',
      'The viral capsid now travels along microtubules to a nuclear pore; the released mRNA is read by ribosomes straight away.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="${MEM}" width="2400" height="1400" fill="url(#gCyto)"/>
    <text x="210" y="${MEM - 36}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">${T2('extracellulair', 'extracellular')}</text>
    <text x="210" y="${MEM + 60}" font-size="22" fill="${C.muted}" font-family="Inter" opacity=".7">cytosol</text>
    <g id="en-mem">${bilayer(`M-400,${MEM} L2000,${MEM}`)}</g>
    <g id="en-clath"></g>
    <g id="en-vatp"></g>

    <g data-node="adeno" data-color="${PINK}" data-label="${T2('Adenovirus-capside', 'Adenovirus capsid')}">
      <g id="en-virus"></g><circle id="en-virus-a" data-anchor="adeno" cx="${PX}" cy="250" r="1" fill="none"/>
    </g>
    <g data-node="lnp" data-color="${LIP}" data-label="${T2('mRNA-lipidenanodeeltje', 'mRNA lipid nanoparticle')}">
      <g id="en-lnp"></g><circle id="en-lnp-a" data-anchor="lnp" data-pos="below" cx="${PX + 70}" cy="330" r="1" fill="none"/>
    </g>
    <g id="en-ves" pointer-events="none"></g>
    <g data-node="cel" data-color="#8d6cc4" data-label="${T2('Lysosoom · afbraak', 'Lysosome · degradation')}" id="en-lyso" opacity="0">
      <circle data-anchor="cel" data-pos="below" cx="${LY[0]}" cy="${LY[1] + LY[2] + 10}" r="1" fill="none"/>
      <g id="en-lyso-body"></g>
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${T2('Naar de kernporie', 'On to the nuclear pore')}" id="en-tonuc" opacity="0">
      <circle data-anchor="kernimport" cx="320" cy="690" r="1" fill="none"/>
      <rect x="170" y="700" width="300" height="52" rx="14" fill="rgba(155,123,255,.10)" stroke="${C.prot}" stroke-dasharray="6 5"/>
      ${txt(320, 733, T2('kernporie →', 'nuclear pore →'), C.prot, 21)}
    </g>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T2('Ribosomen lezen het mRNA', 'Ribosomes read the mRNA')}" id="en-ribo" opacity="0">
      <circle data-anchor="translatie" cx="1210" cy="360" r="1" fill="none"/>
      <g id="en-ribo-body"></g>
    </g>
    <g id="en-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    const memPath = (dip, wd) => {
      let d = '';
      for (let x = -400; x <= 2000; x += 8) d += `${x === -400 ? 'M' : 'L'}${f1(x)},${f1(MEM + dip * Math.exp(-Math.pow((x - PX) / wd, 2)))}`;
      return d;
    };
    /* positie + straal van het blaasje per stap */
    const cargo = (step, p) => {
      if (step <= 1) return [PX, 250, 0, 7.4];
      if (step === 2) return [PX, lerp(250, 320, ease(sub(p, .3, .9))), lerp(0, 86, ease(sub(p, .35, .9))), 7.0];
      if (step === 3) { const u = ease(sub(p, .1, .8)); return [lerp(PX, EE[0], u), lerp(320, EE[1], u), lerp(86, EE[2], u), lerp(6.9, 6.5, u)]; }
      if (step === 4) { const u = ease(sub(p, .1, .85)); return [lerp(EE[0], LE[0], u), lerp(EE[1], LE[1], u), lerp(EE[2], LE[2], u), lerp(6.5, 5.5, u)]; }
      if (step <= 6) return [LE[0], LE[1], LE[2], 5.5];
      if (step === 7) { const u = ease(sub(p, .1, .7)); return [lerp(LE[0], LY[0], u), lerp(LE[1], LY[1], u), lerp(LE[2], LY[2], u), lerp(5.5, 4.5, u)]; }
      return [LY[0], LY[1], LY[2], 4.5];
    };
    return {
      update(t, s) {
        const { step, p } = s;
        const tt = t / 1000;
        const [cx, cy, cr, pH] = cargo(step, p);

        /* membraan */
        let dip = 0, wd = 200;
        if (step === 1) { dip = 110 * ease(sub(p, .15, .9)); wd = lerp(240, 150, ease(p)); }
        else if (step === 2) { dip = 110 * (1 - ease(sub(p, .3, .7))); wd = lerp(150, 80, ease(clamp(p / .6))); }
        $('en-mem').innerHTML = bilayer(memPath(dip, wd));

        /* klathrine */
        let cl = '';
        const clOn = step === 0 ? ease(sub(p, .55, .95)) * .5 : step === 1 ? ease(sub(p, .2, .8))
          : step === 2 ? 1 : step === 3 ? 1 - ease(sub(p, 0, .35)) : 0;
        if (clOn > .01) {
          if (step <= 1 || (step === 2 && p < .5)) {
            for (let i = -4; i <= 4; i++) {
              const x = PX + i * 42, y = MEM + dip * Math.exp(-Math.pow((x - PX) / wd, 2)) + 30;
              cl += triskelion(x, y, i * 27, 1.1, '#8fa8ff', clOn * clamp(1.15 - Math.abs(i) / 5.5));
            }
          } else {
            for (let i = 0; i < 7; i++) {
              const a = i * 51 + 20;
              cl += triskelion(cx + Math.cos(a * Math.PI / 180) * (cr + 22), cy + Math.sin(a * Math.PI / 180) * (cr + 22), a, 1.05, '#8fa8ff', clOn);
            }
          }
        }
        if (step === 2) {
          const k = ease(sub(p, 0, .5));
          cl += `<g opacity="${f1(1 - ease(sub(p, .55, .95)))}">
            ${[0, 1, 2].map(i => `<ellipse cx="${PX}" cy="${f1(MEM + dip * .5 + i * 15)}" rx="${f1(lerp(58, 20, k))}" ry="8" fill="none" stroke="${C.prot}" stroke-width="6"/>`).join('')}</g>`;
        }
        $('en-clath').innerHTML = cl;

        /* endosoom / lysosoom */
        let ves = '';
        if (step >= 2 && step < 8 && cr > 4) {
          const hole = (step === 5 && p > .45) || (step === 6 && p > .5);
          const col = step >= 7 ? '#8d6cc4' : C.mem;
          ves = hole
            ? `<path d="M${f1(cx - cr)},${f1(cy)} a${f1(cr)},${f1(cr)} 0 1,1 ${f1(cr * 1.3)},${f1(cr * .75)}" fill="none" stroke="${col}" stroke-width="7" stroke-dasharray="24 16"/>
               <path d="M${f1(cx + cr * .3)},${f1(cy + cr * .75)} a${f1(cr)},${f1(cr)} 0 0,1 ${f1(-cr * 1.3)},${f1(-cr * .75)}" fill="none" stroke="${col}" stroke-width="7" opacity=".35"/>`
            : `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(cr)}" fill="rgba(201,165,116,.10)" stroke="${col}" stroke-width="7"/>`;
          if (step >= 3) ves += `<g><rect x="${f1(cx - 62)}" y="${f1(cy - cr - 54)}" width="124" height="38" rx="12" fill="#0b1224" stroke="${pHcol(pH)}" stroke-width="2.5"/>
            ${txt(cx, cy - cr - 27, `pH ${L({ nl: pH.toFixed(1).replace('.', ','), en: pH.toFixed(1) })}`, pHcol(pH), 24)}</g>`;
        }
        $('en-ves').innerHTML = ves;

        /* v-ATPase-pompen op het endosoom */
        let vat = '';
        if (step >= 3 && step <= 4 && cr > 40) {
          for (const a of [-150, -35, 85]) {
            const x = cx + Math.cos(a * Math.PI / 180) * cr, y = cy + Math.sin(a * Math.PI / 180) * cr;
            vat += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})"><rect x="-13" y="-15" width="26" height="30" rx="8" fill="${C.prot}"/>
              <circle cx="-22" cy="0" r="6" fill="#b9a6ff"/></g>`;
            const ph = (tt * 60 + a) % 60 / 60;
            vat += `${txt(x - Math.cos(a * Math.PI / 180) * (34 - ph * 30), y - Math.sin(a * Math.PI / 180) * (34 - ph * 30), 'H⁺', '#ff9d5c', 20)}`;
          }
          if (step === 3) vat += `<g opacity="${f1(ease(sub(p, .5, .85)))}">${txt(EE[0], EE[1] + 178, T2('v-ATPase pompt H⁺ naar binnen', 'v-ATPase pumps H⁺ inward'), C.prot, 22)}</g>`;
        }
        $('en-vatp').innerHTML = vat;

        /* vracht: virus + LNP */
        let vx = cx - (cr > 40 ? cr * .5 : 62), vy = cy, esc = 0;
        if (step === 5 && p > .5) { esc = ease(sub(p, .5, 1)); vx = lerp(cx - cr * .5, cx - cr - 95, esc); vy = lerp(cy, cy - 30, esc); }
        if (step >= 6) { vx = LE[0] - LE[2] - 95; vy = LE[1] - 30; }
        if (step === 8) { const u = ease(sub(p, .15, .85)); vx = lerp(LE[0] - LE[2] - 95, 440, u); vy = lerp(LE[1] - 30, 640, u); }
        const vOp = step >= 7 && step < 8 ? .0 : 1;
        $('en-virus').innerHTML = `<g transform="translate(${f1(vx)} ${f1(vy)})" opacity="${f1(vOp)}">${capsid(36, { fibre: 18, missing: [1, 4], op: 1 })}</g>`;
        $('en-virus-a').setAttribute('cx', f1(vx)); $('en-virus-a').setAttribute('cy', f1(vy - 60));

        let lx = cx + (cr > 40 ? cr * .5 : 62), ly = cy;
        if (step >= 7) { lx = cx + cr * .3; ly = cy; }
        const lOp = step === 7 && p > .75 ? 1 - ease(sub(p, .75, 1)) * .7 : 1;
        $('en-lnp').innerHTML = `<g transform="translate(${f1(lx)} ${f1(ly)})" opacity="${f1(lOp)}">${lnpParticle(36, 1, { protonated: step >= 6 ? (step === 6 ? ease(sub(p, .1, .5)) : 1) : 0 })}</g>`;
        $('en-lnp-a').setAttribute('cx', f1(lx)); $('en-lnp-a').setAttribute('cy', f1(ly + 56));

        /* lysosoom */
        const lyOn = step >= 7 ? (step === 7 ? ease(sub(p, .55, .95)) : 1) : 0;
        $('en-lyso').setAttribute('opacity', f1(lyOn));
        $('en-lyso-body').innerHTML = lyOn > .01
          ? `<circle cx="${LY[0]}" cy="${LY[1]}" r="${LY[2]}" fill="rgba(141,108,196,.12)" stroke="#8d6cc4" stroke-width="7"/>
             ${[[-60, -40], [40, -70], [70, 30], [-30, 60], [0, -10]].map(([a, b], i) => `<path d="M${LY[0] + a},${LY[1] + b} q10,-12 20,0 t18,4" stroke="#b79ae0" stroke-width="4" fill="none" opacity=".8"/>`).join('')}
             ${txt(LY[0], LY[1] - LY[2] - 22, T2('hydrolasen breken alles af', 'hydrolases degrade everything'), '#b79ae0', 21)}` : '';

        /* vrijgekomen mRNA + ribosomen */
        const rOn = step === 6 ? ease(sub(p, .55, .95)) : step >= 7 ? 1 : 0;
        $('en-ribo').setAttribute('opacity', f1(rOn));
        if (rOn > .01) {
          const x0 = LE[0] + LE[2] + 40, y0 = LE[1] - 60;
          const u = step === 6 ? ease(sub(p, .6, 1)) : 1;
          const x1 = lerp(x0, 1160, u), y1 = lerp(y0, 400, u);
          $('en-ribo-body').innerHTML = (step === 6 ? `<path d="M${f1(x0)},${f1(y0)} Q${f1((x0 + x1) / 2 + 60)},${f1((y0 + y1) / 2 - 80)} ${f1(x1)},${f1(y1)}" stroke="${C.rna}" stroke-width="4" fill="none" stroke-dasharray="10 8" opacity=".6"/>` : '') + `
            <path d="M${f1(x1 - 60)},${f1(y1)} q16,-14 32,0 t32,0 t32,0" stroke="${C.rna}" stroke-width="5" fill="none"/>
            ${[0, 1, 2].map(i => `<g transform="translate(${f1(x1 - 44 + i * 34)} ${f1(y1 - 6)})"><circle r="15" fill="${C.rrna}"/><circle cy="12" r="10" fill="#1f9d86"/></g>`).join('')}
            ${txt(x1 + 76, y1 + 8, 'mRNA', C.rna, 22, 'start')}`;
        } else $('en-ribo-body').innerHTML = '';

        $('en-tonuc').setAttribute('opacity', f1(step === 8 ? ease(sub(p, .3, .7)) : 0));

        /* notities */
        let no = '';
        if (step === 0) no += `<g opacity="${f1(ease(sub(p, .25, .6)))}">${txt(PX + 250, MEM - 70, T2('vracht + receptoren', 'cargo + receptors'), C.muted, 22)}
          ${txt(PX - 250, MEM + 100, T2('adaptoren kiezen de vracht', 'adaptors select the cargo'), '#8fa8ff', 21)}</g>`;
        if (step === 5) {
          no += `<g opacity="${f1(ease(sub(p, .15, .5)))}">${txt(LE[0] - 240, LE[1] + 190, T2('proteïne VI steekt in het membraan', 'protein VI inserts into the membrane'), '#ff9d5c', 22)}
            ${[0, 1, 2, 3].map(i => `<path d="M${LE[0] - LE[2] - 4 + i * 6},${LE[1] - 70 + i * 26} q14,-8 26,2" stroke="#ff9d5c" stroke-width="5" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
        }
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .2, .55)))}">${txt(LE[0] + 110, LE[1] + 175, T2('slechts enkele procenten van het mRNA ontsnapt', 'only a few per cent of the mRNA escapes'), LIP, 21)}</g>`;
        if (step === 8) {
          /* de twee uitkomsten staan in de vakjes 'kernporie →' en bij de ribosomen; geen extra tekst */
        }
        $('en-notes').innerHTML = no;
      },
    };
  },
};
