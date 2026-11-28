import { C, T2, svgOpen, txt, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { K, prot, panel, arcPath, onCircle, rodCell } from './_bkit.js';

/* Bacteriële replicatie: één oorsprong (oriC, DnaA), twee vorken in tegengestelde richting, ≈ 1 000 nt/s per vork (DNA-polymerase III),
 * ontmoeting in de ter-zone (Tus–ter), twee dochterchromosomen. Bronnen: Katayama et al. 2010, Alberts MBoC 4e (DNA Replication Mechanisms),
 * Neylon et al. 2005 (Tus–Ter). */
const CX = 520, CY = 470, R = 222;   // ring binnen het binnenmembraan (gramnegatieve envelop van rodCell)
const NEW = '#ffc247';

export default {
  id: 'breplicatie',
  title: { nl: 'Het chromosoom kopiëren: van één start rond de ring', en: 'Copying the chromosome: from one start around the ring' },
  scale: { nl: '4,6 miljoen bp', en: '4.6 million bp' }, time: { nl: '≈ 40 min voor het hele chromosoom', en: '≈ 40 min for the whole chromosome' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.dna, { nl: 'oud DNA', en: 'old DNA' }], [NEW, { nl: 'nieuw gekopieerd DNA', en: 'newly copied DNA' }], [K.ori, 'oriC'], [K.rnap, 'DnaA'], [C.danger, { nl: 'Tus op ter', en: 'Tus on ter' }]],
  simplified: {
    nl: 'Niet op schaal. Bij snelle groei start een nieuwe ronde al voordat de vorige klaar is, zodat een cel soms meerdere vorken tegelijk heeft; dat is weggelaten. De replisoom-eiwitten (DnaB-helicase, primase, twee of drie Pol III-kernen) zijn als één vorkje getekend. Het uit elkaar halen van de twee ringen gebeurt met topo-isomerase IV en de verdeling met nog andere eiwitten; hier is het één beweging.',
    en: 'Not to scale. In fast growth a new round starts before the previous one has finished, so a cell can have several forks at once; this is left out. The replisome proteins (DnaB helicase, primase, two or three Pol III cores) are drawn as one small fork. Separating the two rings involves topoisomerase IV and the partitioning involves other proteins; here it is one movement.' },
  parts: [
    { c: K.cell, t: { nl: 'bacterie', en: 'bacterium' }, d: { nl: 'De rand van de bacterie E. coli; het DNA ligt erin zonder kern.', en: 'The edge of the bacterium E. coli; the DNA lies inside without a nucleus.' },
      p: { nl: 'Gramnegatieve celenvelop van E. coli rond het nucleoïd.', en: 'Gram-negative cell envelope of E. coli around the nucleoid.' } },
    { c: C.dna, t: { nl: 'oud DNA', en: 'old DNA' }, d: { nl: 'De blauwe ring: het chromosoom, één gesloten DNA-ring van 4,6 miljoen letterparen.', en: 'The blue ring: the chromosome, one closed DNA ring of 4.6 million letter pairs.' },
      p: { nl: 'Circulair ouderchromosoom (≈ 4,6 Mbp) dat semiconservatief gerepliceerd wordt.', en: 'Circular parental chromosome (≈ 4.6 Mbp) that is replicated semiconservatively.' } },
    { c: NEW, t: { nl: 'nieuw gekopieerd DNA', en: 'newly copied DNA' }, d: { nl: 'De gele streng: het stuk dat al gekopieerd is. Elke nieuwe ring bestaat uit één oude en één nieuwe streng.', en: 'The yellow strand: the part already copied. Each new ring consists of one old and one new strand.' },
      p: { nl: 'Nieuw gesynthetiseerde dochterstrengen; elk dochterchromosoom behoudt één ouderstreng.', en: 'Newly synthesised daughter strands; each daughter chromosome retains one parental strand.' } },
    { c: K.ori, t: 'oriC', d: { nl: 'Het ene startpunt van het kopiëren op de hele ring.', en: 'The single starting point of copying on the whole ring.' },
      p: { nl: 'Unieke replicatieoorsprong (≈ 250 bp) met DnaA-boxen en een AT-rijk ontwindingselement.', en: 'Unique origin of replication (≈ 250 bp) with DnaA boxes and an AT-rich unwinding element.' } },
    { c: K.rnap, t: 'DnaA', d: { nl: 'Start-eiwit: een groepje ervan gaat op het startpunt zitten en duwt de twee DNA-strengen uit elkaar.', en: 'Starter protein: a group of them sits on the starting point and pushes the two DNA strands apart.' },
      p: { nl: 'AAA+-initiator; DnaA-ATP oligomeriseert op oriC, smelt het DUE en laadt (met DnaC) de DnaB-helicase.', en: 'AAA+ initiator; DnaA-ATP oligomerises on oriC, melts the DUE and loads (with DnaC) the DnaB helicase.' } },
    { c: K.rnap, t: { nl: '2 vorken', en: '2 forks' }, d: { nl: 'De paarse bolletjes: twee kopieerploegen die vanaf het startpunt elk een kant op gaan rond de ring.', en: 'The purple dots: two copying teams that each go one way round the ring from the starting point.' },
      p: { nl: 'Twee replisomen die bidirectioneel van oriC naar ter lopen.', en: 'Two replisomes moving bidirectionally from oriC to ter.' } },
    { c: K.rnap, t: 'helicase', d: { nl: 'Het enzym aan de spits van de vork dat de twee DNA-strengen uit elkaar haalt.', en: 'The enzyme at the tip of the fork that pulls the two DNA strands apart.' },
      p: { nl: 'DnaB, een hexamere 5′→3′-helicase op de achterblijvende matrijsstreng.', en: 'DnaB, a hexameric 5′→3′ helicase on the lagging-strand template.' } },
    { c: NEW, t: { nl: 'in één stuk', en: 'in one piece' }, d: { nl: 'Op de ene streng kan het nieuwe DNA in één doorlopend stuk mee groeien met de vork.', en: 'On one strand the new DNA can grow in one continuous piece along with the fork.' },
      p: { nl: 'Leidende streng, continu gesynthetiseerd door DNA-polymerase III in 5′→3′-richting.', en: 'Leading strand, synthesised continuously by DNA polymerase III in the 5′→3′ direction.' } },
    { c: NEW, t: { nl: 'in brokjes', en: 'in chunks' }, d: { nl: 'Op de andere streng gaat het in de andere richting, dus in korte brokjes die later aan elkaar worden geplakt.', en: 'On the other strand it runs the other way, so in short chunks that are later joined together.' },
      p: { nl: 'Achterblijvende streng, discontinu als Okazaki-fragmenten (≈ 1–2 kb), later verbonden door DNA-ligase.', en: 'Lagging strand, discontinuous as Okazaki fragments (≈ 1–2 kb), later joined by DNA ligase.' } },
    { c: C.text, t: { nl: '≈ 1 000 nt/s per vork → ≈ 40 min', en: '≈ 1,000 nt/s per fork → ≈ 40 min' }, d: { nl: 'Elke vork kopieert ongeveer 1 000 letters per seconde, zodat de hele ring in ongeveer 40 minuten klaar is.', en: 'Each fork copies about 1,000 letters per second, so the whole ring is done in about 40 minutes.' },
      p: { nl: 'Elongatiesnelheid van Pol III ≈ 1 000 nt/s; 2 × 2,3 Mbp geeft een C-periode van ≈ 40 min.', en: 'Pol III elongation rate ≈ 1,000 nt/s; 2 × 2.3 Mbp gives a C period of ≈ 40 min.' } },
    { c: C.muted, t: 'ter', d: { nl: 'De plek tegenover het startpunt waar de twee vorken elkaar ontmoeten.', en: 'The spot opposite the starting point where the two forks meet.' },
      p: { nl: 'Terminatiegebied met polaire Ter-plaatsen.', en: 'Termination region with polar Ter sites.' } },
    { c: C.danger, t: 'Tus', d: { nl: 'Rode blokjes: een stop-eiwit op het eindgebied. Een vork kan er maar langs één kant voorbij.', en: 'Red blocks: a stop protein on the end region. A fork can pass it from one side only.' },
      p: { nl: 'Tus bindt Ter en blokkeert de replisoom polair (één richting), zodat de vorken in de ter-zone gevangen worden.', en: 'Tus binds Ter and blocks the replisome in a polar way (one direction), trapping the forks in the ter zone.' } },
    { c: C.text, t: { nl: 'dochterchromosoom', en: 'daughter chromosome' }, m: ['dochter-', 'daughter', 'chromosoom 1', 'chromosome 1', 'chromosoom 2', 'chromosome 2'], d: { nl: 'De twee nieuwe ringen, elk met één oude en één nieuwe streng. Elke dochtercel krijgt er één.', en: 'The two new rings, each with one old and one new strand. Each daughter cell gets one.' },
      p: { nl: 'Twee dochterchromosomen, na decatenatie door topo-isomerase IV over de dochtercellen verdeeld.', en: 'Two daughter chromosomes, distributed to the daughter cells after decatenation by topoisomerase IV.' } },
  ],
  steps: [
    { dur: 8000, cam: cam(800, 470, 1600), title: { nl: 'Eén startplaats: oriC', en: 'One starting point: oriC' },
      text: { nl: 'Het kopiëren begint altijd op dezelfde plek: oriC. Het eiwit DnaA bindt daar en opent het DNA.', en: 'Copying always starts at the same spot: oriC. The protein DnaA binds there and opens the DNA.' } },
    { dur: 9000, cam: cam(800, 470, 1600), title: { nl: 'Twee vorken, twee richtingen', en: 'Two forks, two directions' },
      text: { nl: 'Twee kopieervorken vertrekken, elk een andere kant op rond de ring.', en: 'Two copying forks set off, each in a different direction around the ring.' } },
    { dur: 10000, cam: cam(800, 470, 1600), title: { nl: 'Snel: ≈ 1 000 basen per seconde', en: 'Fast: ≈ 1,000 bases per second' },
      text: { nl: 'In elke vork maakt DNA-polymerase III twee nieuwe strengen: één in een stuk, één in brokjes.', en: 'At each fork DNA polymerase III makes two new strands: one in one piece, one in small chunks.' } },
    { dur: 8000, cam: cam(800, 470, 1600), title: { nl: 'De vorken ontmoeten elkaar bij ter', en: 'The forks meet at ter' },
      text: { nl: 'Aan de overkant stoppen de vorken in de ter-zone. Daar werken Tus-eiwitten als eenrichtingspoortjes.', en: 'On the opposite side the forks stop in the ter region. There Tus proteins act as one-way gates.' } },
    { dur: 8000, cam: cam(800, 470, 1600), title: { nl: 'Twee ringen, twee dochtercellen', en: 'Two rings, two daughter cells' },
      text: { nl: 'Nu zijn er twee chromosomen, elk met één oude en één nieuwe streng. Elke dochtercel krijgt er één.', en: 'Now there are two chromosomes, each with one old and one new strand. Each daughter cell gets one.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="br-ring"></g>
    <g id="br-side"></g>
    <g data-node="replicatie" data-color="${C.dna}" data-label="${T2('Vergelijk: replicatie bij de mens', 'Compare: replication in humans')}"><circle data-anchor="replicatie" cx="1250" cy="700" data-pos="below" r="1" fill="none"/><rect x="1249" y="734" width="2" height="2" fill="none"/></g>
    <g data-node="bplasmide" data-color="${K.plas}" data-label="${T2('Plasmiden kopiëren zich ook', 'Plasmids copy themselves too')}"><circle data-anchor="bplasmide" cx="820" cy="700" data-pos="below" r="1" fill="none"/><rect x="249" y="734" width="2" height="2" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const ring = (cx, cy, r, w = 8, col = C.dna) => `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${col}" stroke-width="${w}"/>`;
    return {
      update(t, s) {
        const { step, p } = s;
        const u = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .9)) * .45 : step === 2 ? .45 + .15 * sub(p, 0, 1) : step === 3 ? lerp(.6, 1, ease(sub(p, 0, .6))) : 1;
        const sep = step === 4 ? ease(sub(p, .1, .7)) : 0;
        let g = rodCell(140, 130, 760, 680);
        if (sep < .01) {
          g += ring(CX, CY, R);
          const a = u * 180;
          if (a > .5) {
            g += `<path d="${arcPath(CX, CY, R - 16, 0, a)}" stroke="${NEW}" stroke-width="6" fill="none"/>` + `<path d="${arcPath(CX, CY, R - 16, 360 - a, 360)}" stroke="${NEW}" stroke-width="6" fill="none"/>`;
            if (u < .999) for (const ang of [Math.min(a, 162), 360 - Math.min(a, 162)]) { const [x, y] = onCircle(CX, CY, R - 8, ang); g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="${K.rnap}" fill-opacity="${f1(.5 * (1 - sub(u, .9, .999)))}" stroke="${K.rnap}" stroke-width="2.5" opacity="${f1(1 - sub(u, .9, .999))}"/>`; }   // vorken stoppen bij Tus
          }
          // oriC + DnaA (stap 0) + bubbel
          const [ox, oy] = onCircle(CX, CY, R, 0);
          g += `<circle cx="${ox}" cy="${oy}" r="12" fill="${K.ori}"/>` + txt(ox, oy - 30, 'oriC', K.ori, 30, 'middle', 800);
          if (step === 0) {
            const d = ease(sub(p, .2, .55)), b = ease(sub(p, .6, .9));
            g += `<g opacity="${f1(d)}">` + [-36, -12, 12, 36].map(dx => prot(ox + dx, oy + 34, 13, 11, K.rnap, 1, 40 + dx, '')).join('') + txt(ox, oy + 78, 'DnaA', K.rnap, 22, 'middle', 700) + '</g>';
            if (b > .01) g += `<ellipse cx="${ox}" cy="${oy}" rx="${f1(10 + 26 * b)}" ry="${f1(4 + 9 * b)}" fill="#0b1224" stroke="${C.dna2}" stroke-width="3"/>`;
          }
          const [tx, ty] = onCircle(CX, CY, R, 180);
          g += `<circle cx="${tx}" cy="${ty}" r="9" fill="${C.muted}"/>` + txt(tx, ty + 40, 'ter', C.muted, 26, 'middle', 700);
          if (step >= 3) g += `<g opacity="${f1(step === 3 ? sub(p, .1, .3) : 1)}">` + [-1, 1].map(sd => { const [x, y] = onCircle(CX, CY, R, 180 + sd * 14); return `<rect x="${f1(x - 9)}" y="${f1(y - 18)}" width="18" height="36" rx="4" fill="${C.danger}" fill-opacity=".8"/>`; }).join('') + txt(tx, ty - 48, 'Tus', C.danger, 24, 'middle', 800) + '</g>';
          if (step === 1) g += `<g opacity="${f1(sub(p, .4, .6))}">` + txt(CX, CY + 10, T2('2 vorken', '2 forks'), K.rnap, 30, 'middle', 800) + '</g>';
        } else {
          // twee ringen schuiven uit elkaar
          const r = lerp(R, 140, sep);
          for (const sd of [-1, 1]) {
            const cx = CX + sd * lerp(0, 160, sep), cy = CY;
            g += ring(cx, cy, r) + `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r - 14)}" fill="none" stroke="${NEW}" stroke-width="6"/>`;
          }
          g += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(CX - 160, CY - 6, T2('dochter-', 'daughter'), C.text, 23, 'middle', 700) + txt(CX - 160, CY + 22, T2('chromosoom 1', 'chromosome 1'), C.text, 23, 'middle', 700) + txt(CX + 160, CY - 6, T2('dochter-', 'daughter'), C.text, 23, 'middle', 700) + txt(CX + 160, CY + 22, T2('chromosoom 2', 'chromosome 2'), C.text, 23, 'middle', 700) + '</g>';
        }
        $('br-ring').innerHTML = g;

        // zijpaneel: één vork van dichtbij (stap 2) en tijdsberekening
        let sd = '';
        if (step === 2) {
          const o = sub(p, .05, .2), k = sub(p, .2, .95);
          const X0 = 930, Yf = 470;
          sd += `<g opacity="${f1(o)}">` + panel(920, 170, 660, 560) + txt(1250, 220, T2('Eén vork van dichtbij', 'One fork up close'), C.text, 26, 'middle', 700);
          // ouderstrengen komen van rechts, gaan open bij de helicase
          const hx = 1300;
          sd += `<line x1="${hx}" y1="${Yf - 8}" x2="1560" y2="${Yf - 8}" stroke="${C.dna}" stroke-width="5"/><line x1="${hx}" y1="${Yf + 8}" x2="1560" y2="${Yf + 8}" stroke="${C.dna2}" stroke-width="5"/>`;
          sd += `<line x1="${hx}" y1="${Yf - 8}" x2="${X0 + 20}" y2="${Yf - 120}" stroke="${C.dna}" stroke-width="5"/><line x1="${hx}" y1="${Yf + 8}" x2="${X0 + 20}" y2="${Yf + 120}" stroke="${C.dna2}" stroke-width="5"/>`;
          // leidende streng (één stuk) en achterblijvende streng (brokjes)
          { const g0 = .25 + .75 * k; sd += `<line x1="${X0 + 40}" y1="${Yf - 112}" x2="${f1(lerp(X0 + 40, hx - 30, g0))}" y2="${f1(lerp(Yf - 112, Yf - 26, g0))}" stroke="${NEW}" stroke-width="5" marker-end="url(#arrow)"/>`; }   // leidende streng groeit mee naar de vork (helicase)
          for (let i = 0; i < 3; i++) { const x1 = hx - 60 - i * 105, x0 = x1 - 75; /* drie brokjes, binnen hun matrijs en het paneel */ const y1 = Yf + 26 + (hx - x1) * .28, y0 = Yf + 26 + (hx - x0) * .28; sd += `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x0)}" y2="${f1(y0)}" stroke="${NEW}" stroke-width="5" opacity="${f1(sub(k, i * .25, i * .25 + .2))}" marker-end="url(#arrow)"/>`; }
          sd += `<circle cx="${hx}" cy="${Yf}" r="26" fill="${K.rnap}" fill-opacity=".45" stroke="${K.rnap}" stroke-width="2.5"/>` + txt(hx + 4, Yf - 42, T2('helicase', 'helicase'), K.rnap, 22, 'middle', 700);
          sd += txt(1080, Yf - 150, T2('in één stuk', 'in one piece'), NEW, 22, 'middle', 700) + txt(1040, Yf + 160, T2('in brokjes', 'in chunks'), NEW, 22, 'middle', 700);
          sd += txt(1250, 690, T2('≈ 1 000 nt/s per vork → ≈ 40 min', '≈ 1,000 nt/s per fork → ≈ 40 min'), C.text, 22, 'middle', 700) + '</g>';
        }
        $('br-side').innerHTML = sd;
      },
    };
  },
};
