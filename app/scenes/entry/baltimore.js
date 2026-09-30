import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { PINK } from './_bits.js';

/* Zijpad: de zeven Baltimore-klassen. Eén rij per klasse; elke stap licht er één uit. */
const Y0 = 170, DY = 108;
const rowY = i => Y0 + i * DY;
/* camera per klasse: zoom op de rij, maar blijf binnen de figuur (geen lege helft boven/onder) */
const rowCam = i => cam(780, clamp(rowY(i), 400, 540), 1300);
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* x-indeling van een rij */
const XN = 210, XG = 260, WG = 200, XM = 545, XR = 920, WR = 160, XE = 1115;

const CLASSES = [
  { n: 'I', g: 'dsDNA', gl: { nl: 'dubbelstrengig DNA', en: 'double-stranded DNA' }, ex: { nl: 'adenovirus, herpesvirussen', en: 'adenovirus, herpesviruses' }, mid: [] },
  { n: 'II', g: 'ssDNA', gl: { nl: 'enkelstrengig DNA', en: 'single-stranded DNA' }, ex: { nl: 'parvovirus B19', en: 'parvovirus B19' }, mid: [{ t: 'dsDNA', c: C.dna, lab: { nl: 'eerst aanvullen', en: 'fill in first' } }] },
  { n: 'III', g: 'dsRNA', gl: { nl: 'dubbelstrengig RNA', en: 'double-stranded RNA' }, ex: { nl: 'rotavirus, reovirus', en: 'rotavirus, reovirus' }, mid: [{ t: 'RdRp', c: C.prot, lab: { nl: 'viraal enzym', en: 'viral enzyme' } }] },
  { n: 'IV', g: '(+)ssRNA', gl: { nl: 'genoom ís al mRNA', en: 'genome already is mRNA' }, ex: { nl: 'poliovirus, SARS-CoV-2', en: 'poliovirus, SARS-CoV-2' }, mid: [] },
  { n: 'V', g: '(−)ssRNA', gl: { nl: 'complement van mRNA', en: 'complement of mRNA' }, ex: { nl: 'influenza, mazelen, ebola', en: 'influenza, measles, Ebola' }, mid: [{ t: 'RdRp', c: C.prot, lab: { nl: 'viraal enzym', en: 'viral enzyme' } }] },
  { n: 'VI', g: 'ssRNA-RT', gl: { nl: 'RNA → DNA → genoom', en: 'RNA → DNA → genome' }, ex: { nl: 'HIV-1', en: 'HIV-1' }, mid: [{ t: 'RT', c: C.trna, lab: { nl: 'reverse transcriptase', en: 'reverse transcriptase' } }, { t: 'dsDNA', c: C.dna }] },
  { n: 'VII', g: 'dsDNA-RT', gl: { nl: 'DNA met RNA-tussenstap', en: 'DNA with RNA intermediate' }, ex: { nl: 'hepatitis B-virus', en: 'hepatitis B virus' }, mid: [{ t: 'RT', c: C.trna, lab: { nl: 'bij de replicatie', en: 'during replication' } }] },
];
/* toestand per stap: rij-opaciteit en detail-opaciteit (stap 0 = overzicht, stap k = klasse k-1) */
const rowOp = (step, i) => (step === 0 || i === step - 1 ? 1 : .14);
const detOp = (step, i) => (step > 0 && i === step - 1 ? 1 : 0);

/* nucleïnezuur-symbool */
function nuc(x, y, w, kind) {
  const rna = kind.includes('RNA'), ds = kind.startsWith('ds');
  const col = rna ? C.rna : C.dna;
  let s = '';
  if (ds) {
    s += `<line x1="${f1(x)}" y1="${f1(y - 7)}" x2="${f1(x + w)}" y2="${f1(y - 7)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`;
    s += `<line x1="${f1(x)}" y1="${f1(y + 7)}" x2="${f1(x + w)}" y2="${f1(y + 7)}" stroke="${rna ? '#ffb27a' : C.dna2}" stroke-width="6" stroke-linecap="round"/>`;
    for (let i = 10; i < w - 6; i += 16) s += `<line x1="${f1(x + i)}" y1="${f1(y - 7)}" x2="${f1(x + i)}" y2="${f1(y + 7)}" stroke="${col}" stroke-width="2.5" opacity=".6"/>`;
  } else {
    let d = `M${f1(x)},${f1(y)}`;
    for (let i = 0; i <= w; i += 8) d += `L${f1(x + i)},${f1(y + Math.sin(i / 13) * 6)}`;
    s += `<path d="${d}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }
  return s;
}
const arrow = (x0, x1, y) =>
  `<line x1="${f1(x0)}" y1="${f1(y)}" x2="${f1(x1)}" y2="${f1(y)}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)" opacity=".8"/>`;

export default {
  id: 'baltimore',
  title: { nl: 'Baltimore-klassen', en: 'Baltimore classification' },
  scale: { nl: 'genoomniveau', en: 'genome level' }, time: { nl: 'n.v.t. (indeling)', en: 'n/a (classification)' },
  org: { nl: 'virussen van dieren, planten en bacteriën', en: 'viruses of animals, plants and bacteria' },
  legend: [[C.dna, 'DNA'], [C.rna, 'RNA / mRNA'], [C.prot, { nl: 'viraal RNA-polymerase (RdRp)', en: 'viral RNA polymerase (RdRp)' }], [C.trna, { nl: 'reverse transcriptase', en: 'reverse transcriptase' }]],
  simplified: {
    nl: 'Dit is een indeling naar "hoe komt dit genoom aan mRNA?", niet naar verwantschap. Per klasse tonen we één schematische route; details (segmenten, subgenomische RNA\'s, capping door virale enzymen, waar in de cel het gebeurt) zijn weggelaten. Het pokkenvirus is klasse I maar repliceert in het cytoplasma, met zijn eigen RNA-polymerase — de uitzondering die de regel bevestigt.',
    en: 'This is a classification by "how does this genome get to mRNA?", not by relatedness. Per class we show one schematic route; details (segments, subgenomic RNAs, capping by viral enzymes, where in the cell it happens) are omitted. Poxvirus is class I but replicates in the cytoplasm, using its own RNA polymerase — the exception that proves the rule.' },
  steps: [
    ST(8000, cam(640, 470, 1440), 'Alle wegen leiden naar mRNA', 'All roads lead to mRNA',
      'David Baltimore ordende virussen naar hun genoomtype en de weg die dat genoom moet afleggen om (+)mRNA te worden — want ribosomen lezen alleen mRNA.',
      'David Baltimore ordered viruses by their genome type and the route that genome must take to become (+)mRNA — because ribosomes only read mRNA.'),
    ST(6000, rowCam(0), 'Klasse I · dsDNA', 'Class I · dsDNA',
      'Dubbelstrengig DNA wordt (meestal in de kern) door RNA-polymerase II van de gastheer afgeschreven. Voorbeeld: het adenovirus uit dit verhaal.',
      'Double-stranded DNA is transcribed (usually in the nucleus) by the host RNA polymerase II. Example: the adenovirus of this story.'),
    ST(6000, rowCam(1), 'Klasse II · ssDNA', 'Class II · ssDNA',
      'Enkelstrengig DNA wordt eerst tot dubbelstrengig aangevuld; pas dan kan het worden afgeschreven.',
      'Single-stranded DNA is first completed into double-stranded DNA; only then can it be transcribed.'),
    ST(6000, rowCam(2), 'Klasse III · dsRNA', 'Class III · dsRNA',
      'Een cel heeft geen enzym dat RNA naar RNA kopieert. Het virus brengt zelf een RNA-afhankelijk RNA-polymerase (RdRp) mee.',
      'A cell has no enzyme that copies RNA into RNA. The virus brings its own RNA-dependent RNA polymerase (RdRp).'),
    ST(6000, rowCam(3), 'Klasse IV · (+)ssRNA', 'Class IV · (+)ssRNA',
      'Het genoom heeft dezelfde polariteit als mRNA: ribosomen kunnen het meteen lezen. Naakt RNA van deze virussen is al besmettelijk.',
      'The genome has the same polarity as mRNA: ribosomes can read it immediately. Naked RNA of these viruses is already infectious.'),
    ST(6000, rowCam(4), 'Klasse V · (−)ssRNA', 'Class V · (−)ssRNA',
      'Het genoom is complementair aan mRNA. De RdRp moet dus mee in het virusdeeltje, anders gebeurt er niets.',
      'The genome is complementary to mRNA. The RdRp therefore has to travel inside the virion, otherwise nothing happens.'),
    ST(7000, rowCam(5), 'Klasse VI · ssRNA-RT', 'Class VI · ssRNA-RT',
      'Retrovirussen kopiëren hun RNA met reverse transcriptase naar dsDNA en bouwen dat in het gastheergenoom in — het provirus.',
      'Retroviruses copy their RNA into dsDNA with reverse transcriptase and insert it into the host genome — the provirus.'),
    ST(7000, rowCam(6), 'Klasse VII · dsDNA-RT', 'Class VII · dsDNA-RT',
      'Hepatitis B heeft een DNA-genoom, maar repliceert via een RNA-tussenstap die opnieuw naar DNA wordt geschreven.',
      'Hepatitis B has a DNA genome, but replicates through an RNA intermediate that is written back into DNA.'),
  ],

  svg() {
    let rows = '';
    CLASSES.forEach((c, i) => {
      const y = rowY(i);
      let mid = arrow(XG + WG + 15, c.mid.length ? XM - 10 : XR - 15, y), det = '', x = XM;
      c.mid.forEach((m, k) => {
        mid += `<rect x="${f1(x)}" y="${f1(y - 22)}" width="120" height="44" rx="12" fill="rgba(255,255,255,.05)" stroke="${m.c}" stroke-width="2.5"/>` +
          txt(x + 60, y + 8, m.t, m.c, 22);
        if (m.lab) det += txt(x + 60, y + 46, L(m.lab), C.muted, 19);
        x += 120;
        mid += arrow(x + 5, k < c.mid.length - 1 ? x + 50 : XR - 15, y);
        x += 60;
      });
      rows += `<g id="bal-row-${i}">
        <circle cx="${XN}" cy="${f1(y)}" r="28" fill="rgba(255,255,255,.06)" stroke="${C.text}" stroke-width="2"/>${txt(XN, y + 9, c.n, C.text, 25)}
        ${nuc(XG, y, WG, c.g)}
        ${txt(XG + WG / 2, y - 24, c.g, c.g.includes('RNA') ? C.rna : C.dna, 24)}
        ${mid}
        ${nuc(XR, y, WR, '(+)ssRNA')}
        <g id="bal-det-${i}" opacity="0">
          ${txt(XG + WG / 2, y + 44, L(c.gl), C.muted, 20)}
          ${det}
          ${txt(XR + WR / 2, y - 24, 'mRNA', C.rna, 22)}
          ${txt(XE, y + 8, L(c.ex), C.text, 21, 'start', 500)}
        </g>
      </g>`;
    });
    return svgOpen() + `
    <g id="bal-head">
      ${txt(XG + WG / 2, 110, T2('genoom', 'genome'), C.muted, 22)}
      ${txt(XR + WR / 2, 110, 'mRNA', C.rna, 22)}
    </g>
    <g id="bal-hl"></g>
    <g id="bal-rows">${rows}</g>
    <g data-node="adeno" data-color="${PINK}" data-label="${T2('Adenovirus (klasse I)', 'Adenovirus (class I)')}">
      <circle id="bal-a0" data-anchor="adeno" cx="${XE + 110}" cy="${rowY(0) - 22}" r="1" fill="none"/>
      <rect x="${XE}" y="${rowY(0) - 18}" width="300" height="36" fill="transparent"/>
    </g>
    <g data-node="rt" data-color="${C.trna}" data-label="${T2('HIV-1: reverse transcriptie', 'HIV-1: reverse transcription')}">
      <circle id="bal-a5" data-anchor="rt" cx="${XM + 60}" cy="${rowY(5) - 28}" r="1" fill="none"/>
      <rect x="${XM}" y="${rowY(5) - 24}" width="120" height="48" fill="transparent"/>
    </g>
    <g data-node="integratie" data-color="${C.dna}" data-label="${T2('Integratie van het provirus', 'Integration of the provirus')}">
      <circle id="bal-a5b" data-anchor="integratie" data-pos="below" cx="${XM + 275}" cy="${rowY(5) + 26}" r="1" fill="none"/>
      <rect x="${XM + 180}" y="${rowY(5) - 24}" width="120" height="48" fill="transparent"/>
    </g>
    <g data-node="rnastructuur" data-href="../atlas/index.html?id=dsrna" data-color="${C.rna}" data-label="${T2('dsRNA — atlas', 'dsRNA — atlas')}">
      <circle id="bal-a2" data-anchor="rnastructuur" cx="${XG + WG / 2}" cy="${rowY(2) - 50}" r="1" fill="none"/>
      <rect x="${XG}" y="${rowY(2) - 20}" width="${WG}" height="40" fill="transparent"/>
    </g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const prev = Math.max(0, step - 1);
        const e = ease(sub(p, 0, .3));
        for (let i = 0; i < CLASSES.length; i++) {
          $('bal-row-' + i)?.setAttribute('opacity', f1(lerp(rowOp(prev, i), rowOp(step, i), e)));
          $('bal-det-' + i)?.setAttribute('opacity', f1(lerp(detOp(prev, i), detOp(step, i), e)));
        }
        $('bal-head').setAttribute('opacity', f1(step === 0 ? 1 : step === 1 ? 1 - e : 0));
        /* hotspot-labels alleen in het overzicht en bij de eigen klasse (anders overlappen ze de details van een buurrij) */
        for (const [id, row, ov] of [['bal-a0', 0, 1], ['bal-a2', 2, 0], ['bal-a5', 5, 1], ['bal-a5b', 5, 1]]) $(id)?.setAttribute('opacity', (step === 0 && ov) || step - 1 === row ? 1 : 0);
        const cur = step - 1;
        if (cur < 0) { $('bal-hl').innerHTML = ''; return; }
        const y = cur === 0 ? rowY(0) : lerp(rowY(cur - 1), rowY(cur), e);
        $('bal-hl').innerHTML = `<rect x="165" y="${f1(y - 56)}" width="1240" height="112" rx="18" fill="rgba(124,196,255,.07)" stroke="#7cc4ff" stroke-width="2.5" opacity="${f1(cur === 0 ? e : 1)}"/>`;
      },
    };
  },
};
