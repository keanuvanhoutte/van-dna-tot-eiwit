import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { PINK } from './_bits.js';

/* Zijpad: de zeven Baltimore-klassen. Eén rij per klasse; elke stap licht er één uit.
 * Klasse VII (hepatitis B): het cccDNA in de kern wordt door het RNA-polymerase II van de cel afgeschreven tot de mRNA's
 * en het pregenomisch RNA (pgRNA); reverse transcriptase (P-eiwit) zet het pgRNA pas bij de replicatie, in het capside,
 * om naar nieuw DNA (Beck & Nassal, World J Gastroenterol 2007, 13:48–64; Baltimore, Bacteriol Rev 1971).
 * Expliciet in Beck & Nassal 2007 (PMC4065876, volledige tekst gelezen): "from the cccDNA, several genomic and subgenomic
 * RNAs are transcribed by cellular RNA polymerase II".
 * Ook bij klasse I, II en VI maakt het RNA-polymerase II van de cel het mRNA (van het virale dsDNA, het aangevulde DNA of het
 * provirus); daarom staat daar een klein "Pol II" boven de laatste pijl (uitzondering: pokkenvirussen, zie 'simplified'). */
const POL2 = C.prot, VENZ = '#d98cf0';   // Pol II van de cel = eiwitpaars zoals overal; virale enzymen (RdRp, RT) = eigen tint (geel blijft voor tRNA)
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
  { n: 'III', g: 'dsRNA', gl: { nl: 'dubbelstrengig RNA', en: 'double-stranded RNA' }, ex: { nl: 'rotavirus, reovirus', en: 'rotavirus, reovirus' }, mid: [{ t: 'RdRp', c: VENZ, lab: { nl: 'viraal enzym', en: 'viral enzyme' } }] },
  { n: 'IV', g: '(+)ssRNA', gl: { nl: 'genoom ís al mRNA', en: 'genome already is mRNA' }, ex: { nl: 'poliovirus, SARS-CoV-2', en: 'poliovirus, SARS-CoV-2' }, mid: [] },
  { n: 'V', g: '(−)ssRNA', gl: { nl: 'complement van mRNA', en: 'complement of mRNA' }, ex: { nl: 'influenza, mazelen, ebola', en: 'influenza, measles, Ebola' }, mid: [{ t: 'RdRp', c: VENZ, lab: { nl: 'viraal enzym', en: 'viral enzyme' } }] },
  { n: 'VI', g: 'ssRNA-RT', gl: { nl: 'RNA → DNA → genoom', en: 'RNA → DNA → genome' }, ex: { nl: 'HIV-1', en: 'HIV-1' }, mid: [{ t: 'RT', c: VENZ, lab: { nl: 'reverse transcriptase', en: 'reverse transcriptase' } }, { t: 'dsDNA', c: C.dna }] },
  { n: 'VII', g: 'dsDNA-RT', gl: { nl: 'DNA met RNA-tussenstap', en: 'DNA with RNA intermediate' }, ex: { nl: 'hepatitis B-virus', en: 'hepatitis B virus' }, mid: [{ t: 'Pol II', c: POL2, lab: { nl: 'van de cel', en: 'from the host cell' } }],
    side: { nl: 'kopiëren: RNA → RT → DNA', en: 'copying: RNA → RT → DNA' } },
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
/* klikbaar zonder label (hotspot naar een knoop); node leeg = niet klikbaar */
const hot = (node, col, s) => node ? `<g data-node="${node}" data-color="${col}" data-nolabel>${s}</g>` : s;
/* knoop per genoomtype en per tussenstap */
const GENOME_NODE = { dsDNA: 'dnahelix', ssDNA: 'ssdna', '(+)ssRNA': 'translatie', 'ssRNA-RT': 'rt' };
const MID_NODE = { dsDNA: 'dnahelix', RT: 'rt', 'Pol II': 'rnapol' };
const arrow = (x0, x1, y) =>
  `<line x1="${f1(x0)}" y1="${f1(y)}" x2="${f1(x1)}" y2="${f1(y)}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)" opacity=".8"/>`;

export default {
  id: 'baltimore',
  title: { nl: 'Baltimore-klassen', en: 'Baltimore classification' },
  scale: { nl: 'genoomniveau', en: 'genome level' }, time: { nl: 'n.v.t. (indeling)', en: 'n/a (classification)' },
  org: { nl: 'virussen van dieren, planten en bacteriën', en: 'viruses of animals, plants and bacteria' },
  legend: [[C.dna, 'DNA'], [C.rna, 'RNA / mRNA'], [VENZ, { nl: 'virale enzymen: RNA-polymerase (RdRp), reverse transcriptase (RT)', en: 'viral enzymes: RNA polymerase (RdRp), reverse transcriptase (RT)' }], [POL2, { nl: 'RNA-polymerase II van de cel', en: 'host RNA polymerase II' }]],
  simplified: {
    nl: 'Dit is een indeling naar "hoe komt dit genoom aan mRNA?", niet naar verwantschap. Per klasse tonen we één schematische route; details (segmenten, subgenomische RNA\'s, capping door virale enzymen, waar in de cel het gebeurt) zijn weggelaten. Het pokkenvirus is klasse I maar repliceert in het cytoplasma, met zijn eigen RNA-polymerase — de uitzondering die de regel bevestigt.',
    en: 'This is a classification by "how does this genome get to mRNA?", not by relatedness. Per class we show one schematic route; details (segments, subgenomic RNAs, capping by viral enzymes, where in the cell it happens) are omitted. Poxvirus is class I but replicates in the cytoplasm, using its own RNA polymerase — the exception that proves the rule.' },
  parts: [
    { c: C.text, t: { nl: 'klassenummer', en: 'class number' }, m: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], d: { nl: 'De Romeinse cijfers in de cirkels: de zeven groepen virussen, ingedeeld naar de weg van hun erfelijk materiaal naar mRNA.', en: 'The Roman numerals in the circles: the seven groups of viruses, sorted by the route from their genetic material to mRNA.' },
      p: { nl: 'Baltimore-klassen I–VII (Baltimore 1971), ingedeeld naar genoomtype en de route naar mRNA, niet naar verwantschap.', en: 'Baltimore classes I–VII (Baltimore 1971), grouped by genome type and route to mRNA, not by relatedness.' } },
    { c: C.muted, t: { nl: 'genoom', en: 'genome' }, d: { nl: 'De linkerkolom: het erfelijk materiaal dat het virus meebrengt in de cel.', en: 'The left column: the genetic material the virus brings into the cell.' },
      p: { nl: 'Het genoomtype van het virion zoals het de cel binnenkomt.', en: 'The genome type of the virion as it enters the cell.' } },
    { c: C.dna, t: 'dsDNA', m: ['dubbelstrengig DNA', 'double-stranded DNA'], d: { nl: 'DNA met twee strengen, net als het DNA van de cel zelf (twee blauwe lijnen).', en: 'DNA with two strands, just like the cell’s own DNA (two blue lines).' },
      p: { nl: 'Dubbelstrengig DNA; in klasse I het genoom, in klasse II en VI een tussenvorm die door Pol II wordt afgeschreven.', en: 'Double-stranded DNA; the genome in class I, an intermediate transcribed by Pol II in classes II and VI.' } },
    { c: C.dna, t: 'ssDNA', m: ['enkelstrengig DNA', 'single-stranded DNA', 'eerst aanvullen', 'fill in first'], d: { nl: 'DNA met maar één streng (golvende lijn). De cel vult die eerst aan tot twee strengen.', en: 'DNA with only one strand (wavy line). The cell first fills it in to two strands.' },
      p: { nl: 'Enkelstrengig DNA; de complementaire streng wordt door de DNA-polymerase van de gastheer gesynthetiseerd.', en: 'Single-stranded DNA; the complementary strand is synthesised by host DNA polymerase.' } },
    { c: C.rna, t: 'dsRNA', m: ['dubbelstrengig RNA', 'double-stranded RNA'], d: { nl: 'RNA met twee strengen (twee oranje lijnen). Dat kan de cel zelf niet aflezen.', en: 'RNA with two strands (two orange lines). The cell cannot read this by itself.' },
      p: { nl: 'Dubbelstrengig RNA; het virion bevat een eigen RdRp die het mRNA transcribeert.', en: 'Double-stranded RNA; the virion carries its own RdRp that transcribes the mRNA.' } },
    { c: C.rna, t: '(+)ssRNA', m: ['genoom ís al mRNA', 'genome already is mRNA'], d: { nl: 'RNA met één streng die zelf al als mRNA werkt: ribosomen lezen het meteen.', en: 'RNA with one strand that itself works as mRNA: ribosomes read it straight away.' },
      p: { nl: 'Enkelstrengig RNA met positieve polariteit; wordt direct vertaald, het genoom is infectieus.', en: 'Positive-sense single-stranded RNA; translated directly, the genome is infectious.' } },
    { c: C.rna, t: '(−)ssRNA', m: ['(-)ssRNA', 'complement van mRNA', 'complement of mRNA'], d: { nl: 'RNA met één streng die het spiegelbeeld is van mRNA. Het moet eerst omgeschreven worden.', en: 'RNA with one strand that is the mirror image of mRNA. It must be copied first.' },
      p: { nl: 'Enkelstrengig RNA met negatieve polariteit; complementair aan het mRNA, getranscribeerd door een virion-RdRp.', en: 'Negative-sense single-stranded RNA; complementary to the mRNA, transcribed by a virion RdRp.' } },
    { c: C.rna, t: 'ssRNA-RT', m: ['RNA → DNA → genoom', 'RNA → DNA → genome'], d: { nl: 'RNA met één streng waarvan het virus eerst DNA maakt. Dat DNA bouwt het in het DNA van de cel in.', en: 'RNA with one strand from which the virus first makes DNA. It builds that DNA into the cell’s DNA.' },
      p: { nl: 'Retrovirussen: (+)ssRNA dat via reverse transcriptie dsDNA wordt en als provirus integreert.', en: 'Retroviruses: (+)ssRNA converted to dsDNA by reverse transcription and integrated as a provirus.' } },
    { c: C.dna, t: 'dsDNA-RT', m: ['DNA met RNA-tussenstap', 'DNA with RNA intermediate', '↺ kopiëren: RNA → RT → DNA', '↺ copying: RNA → RT → DNA'], d: { nl: 'DNA met twee strengen dat zich kopieert via een RNA-tussenstap: van die RNA-kopie maakt het virus weer DNA.', en: 'DNA with two strands that copies itself via an RNA step: from that RNA copy the virus makes DNA again.' },
      p: { nl: 'Pararetrovirussen (hepatitis B): het cccDNA wordt door Pol II afgeschreven; het pgRNA wordt in het capside revers getranscribeerd.', en: 'Pararetroviruses (hepatitis B): the cccDNA is transcribed by Pol II; the pgRNA is reverse-transcribed inside the capsid.' } },
    { c: VENZ, t: 'RdRp', m: ['viraal enzym', 'viral enzyme'], d: { nl: 'Een kopieerenzym dat het virus zelf meebrengt: het maakt RNA van RNA, wat de cel normaal niet doet.', en: 'A copying enzyme the virus brings itself: it makes RNA from RNA, which the cell normally does not do.' },
      p: { nl: 'RNA-afhankelijke RNA-polymerase, viraal gecodeerd; ontbreekt in de gastheercel.', en: 'RNA-dependent RNA polymerase, virally encoded; absent from the host cell.' } },
    { c: VENZ, t: 'RT', m: ['reverse transcriptase'], d: { nl: 'Een virusenzym dat van RNA weer DNA maakt, de omgekeerde richting van de gewone weg (reverse transcriptase).', en: 'A virus enzyme that makes DNA from RNA, the reverse of the usual direction (reverse transcriptase).' },
      p: { nl: 'Reverse transcriptase: RNA-afhankelijke DNA-polymerase met RNase H-activiteit.', en: 'Reverse transcriptase: RNA-dependent DNA polymerase with RNase H activity.' } },
    { c: POL2, t: 'Pol II', m: ['van de cel', 'from the host cell'], d: { nl: 'Het kopieerenzym van de cel zelf. Het maakt mRNA van DNA, ook van het DNA van een virus.', en: 'The cell’s own copying enzyme. It makes mRNA from DNA, also from the DNA of a virus.' },
      p: { nl: 'RNA-polymerase II van de gastheer; transcribeert de virale DNA-matrijzen in de kern (uitzondering: pokkenvirussen).', en: 'Host RNA polymerase II; transcribes viral DNA templates in the nucleus (exception: poxviruses).' } },
    { c: C.rna, t: 'mRNA', d: { nl: 'De rechterkolom: de boodschap die ribosomen lezen om eiwitten te maken. Elke klasse komt hier uit.', en: 'The right column: the message that ribosomes read to make proteins. Every class ends up here.' },
      p: { nl: 'Translatiecompetent (+)-strengs mRNA, het gemeenschappelijke eindpunt van alle klassen.', en: 'Translation-competent plus-strand mRNA, the common end point of all classes.' } },
    { c: C.text, t: { nl: 'voorbeelden', en: 'examples' }, m: ['adenovirus, herpesvirussen', 'adenovirus, herpesviruses', 'parvovirus B19', 'rotavirus, reovirus', 'poliovirus, SARS-CoV-2', 'influenza, mazelen, ebola', 'influenza, measles, Ebola', 'HIV-1', 'hepatitis B-virus', 'hepatitis B virus'], d: { nl: 'Bekende virussen uit elke klasse, rechts in de rij.', en: 'Well-known viruses from each class, on the right of the row.' },
      p: { nl: 'Representatieve vertegenwoordigers per Baltimore-klasse.', en: 'Representative members of each Baltimore class.' } },
  ],
  steps: [
    ST(8000, cam(640, 470, 1440), 'Alle wegen leiden naar mRNA', 'All roads lead to mRNA',
      'Ribosomen lezen alleen mRNA. Daarom delen we virussen in volgens de weg die hun genoom naar mRNA aflegt.',
      'Ribosomes only read mRNA. So we group viruses by the route their genome takes to become mRNA.'),
    ST(6000, rowCam(0), 'Klasse I: dubbelstrengig DNA', 'Class I: double-stranded DNA',
      'DNA met twee strengen, net als het onze: de cel maakt er meestal in de kern mRNA van. Voorbeeld: het adenovirus.',
      'DNA with two strands, just like ours: the cell turns it into mRNA, usually in the nucleus. Example: adenovirus.'),
    ST(6000, rowCam(1), 'Klasse II: enkelstrengig DNA', 'Class II: single-stranded DNA',
      'Het DNA heeft maar één streng. Die wordt eerst aangevuld tot twee strengen; pas dan maakt de cel er mRNA van.',
      'The DNA has only one strand. It is first completed to two strands; only then does the cell make mRNA from it.'),
    ST(6000, rowCam(2), 'Klasse III: dubbelstrengig RNA', 'Class III: double-stranded RNA',
      'Een cel kopieert normaal geen RNA naar RNA. Daarom brengen deze virussen hun eigen kopieerenzym mee.',
      'A cell normally does not copy RNA into RNA. So these viruses bring their own copying enzyme along.'),
    ST(6000, rowCam(3), 'Klasse IV: (+)RNA, meteen leesbaar', 'Class IV: (+)RNA, readable at once',
      'Het RNA-genoom werkt zelf al als mRNA: ribosomen lezen het meteen. Daarom is het kale RNA vaak al besmettelijk.',
      'The RNA genome itself works as mRNA: ribosomes read it straight away. That is why the bare RNA is often infectious on its own.'),
    ST(6000, rowCam(4), 'Klasse V: (−)RNA, eerst omschrijven', 'Class V: (−)RNA, copy first',
      'Het RNA is de tegenstreng van mRNA. Het virus brengt een eigen enzym mee om er mRNA van te maken.',
      'The RNA is the opposite strand of mRNA. The virus brings its own enzyme to make mRNA from it.'),
    ST(7000, rowCam(5), 'Klasse VI: van RNA naar DNA', 'Class VI: from RNA to DNA',
      'Retrovirussen zoals HIV-1 maken van hun RNA eerst DNA en bouwen dat in het DNA van de cel in.',
      'Retroviruses such as HIV-1 first make DNA from their RNA and insert it into the cell’s DNA.'),
    ST(7000, rowCam(6), 'Klasse VII: DNA via een RNA-tussenstap', 'Class VII: DNA via an RNA step',
      'Hepatitis B heeft DNA: de cel maakt er gewoon mRNA van. Om zich te kopiëren zet het virus een RNA-kopie weer om naar DNA.',
      'Hepatitis B has DNA: the cell simply makes mRNA from it. To copy itself, the virus turns an RNA copy back into DNA.'),
  ],

  svg() {
    let rows = '';
    CLASSES.forEach((c, i) => {
      const y = rowY(i);
      let mid = arrow(XG + WG + 15, c.mid.length ? XM - 10 : XR - 15, y), det = '', x = XM;
      c.mid.forEach((m, k) => {
        mid += hot(MID_NODE[m.t], m.c, `<rect x="${f1(x)}" y="${f1(y - 22)}" width="120" height="44" rx="12" fill="rgba(255,255,255,.05)" stroke="${m.c}" stroke-width="2.5"/>` +
          txt(x + 60, y + 8, m.t, m.c, 22));
        if (m.lab) det += txt(x + 60, y + 46, L(m.lab), C.muted, 19);
        x += 120;
        mid += arrow(x + 5, k < c.mid.length - 1 ? x + 50 : XR - 15, y);
        x += 60;
      });
      if (['I', 'II', 'VI'].includes(c.n)) det += txt(XR - 34, y - 14, 'Pol II', POL2, 18);   // het enzym van de cel dat het mRNA maakt
      rows += `<g id="bal-row-${i}">
        <circle cx="${XN}" cy="${f1(y)}" r="28" fill="rgba(255,255,255,.06)" stroke="${C.text}" stroke-width="2"/>${txt(XN, y + 9, c.n, C.text, 25)}
        ${hot(GENOME_NODE[c.g], c.g.includes('RNA') ? C.rna : C.dna, nuc(XG, y, WG, c.g))}
        ${txt(XG + WG / 2, y - 24, c.g, c.g.includes('RNA') ? C.rna : C.dna, 24)}
        ${mid}
        ${hot('translatie', C.rna, nuc(XR, y, WR, '(+)ssRNA'))}
        <g id="bal-det-${i}" opacity="0">
          ${txt(XG + WG / 2, y + 44, L(c.gl), C.muted, 20)}
          ${det}
          ${txt(XR + WR / 2, y - 24, 'mRNA', C.rna, 22)}
          ${txt(XE, c.side ? y - 4 : y + 8, L(c.ex), C.text, 21, 'start', 500)}
          ${c.side ? txt(XE, y + 28, '↺ ' + L(c.side), VENZ, 19, 'start', 600) : ''}
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
    <g data-node="rt" data-color="${VENZ}" data-label="${T2('HIV-1: reverse transcriptie', 'HIV-1: reverse transcription')}">
      <circle id="bal-a5" data-anchor="rt" cx="${XM + 60}" cy="${rowY(5) - 28}" r="1" fill="none"/>
      <rect x="${XM}" y="${rowY(5) - 24}" width="120" height="48" fill="transparent"/>
    </g>
    <g data-node="integratie" data-color="${C.dna}" data-label="${T2('Integratie van het provirus', 'Integration of the provirus')}">
      <circle id="bal-a5b" data-anchor="integratie" data-pos="below" cx="${XM + 275}" cy="${rowY(5) + 26}" r="1" fill="none"/>
      <rect x="${XM + 180}" y="${rowY(5) - 24}" width="120" height="48" fill="transparent"/>
    </g>
    <g data-node="rnastructuur" data-href="../atlas/index.html?id=dsrna" data-color="${C.rna}" data-label="${T2('dsRNA — in 3D', 'dsRNA — in 3D')}">
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
        // klasse VI in beeld (kader rond de rij): kaartjes buiten het kader, boven en onder; in het overzicht vlak bij de rij
        $('bal-a5').setAttribute('cy', rowY(5) + (step === 6 ? -62 : -28)); $('bal-a5b').setAttribute('cy', rowY(5) + (step === 6 ? 62 : 26));
        const cur = step - 1;
        if (cur < 0) { $('bal-hl').innerHTML = ''; return; }
        const y = cur === 0 ? rowY(0) : lerp(rowY(cur - 1), rowY(cur), e);
        $('bal-hl').innerHTML = `<rect x="165" y="${f1(y - 56)}" width="1240" height="112" rx="18" fill="rgba(124,196,255,.07)" stroke="#7cc4ff" stroke-width="2.5" opacity="${f1(cur === 0 ? e : 1)}"/>`;
      },
    };
  },
};
