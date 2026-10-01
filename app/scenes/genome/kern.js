import { C, cam, FULL } from '../../kit.js';
import { sceneKern } from './_kernsvg.js';

export default {
  id: 'kern',
  title: { nl: 'Celkern', en: 'Nucleus' },
  scale: '≈ 8 µm', time: { nl: 'seconden – minuten', en: 'seconds – minutes' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [[C.dna, { nl: 'chromatine', en: 'chromatin' }], ['#27457e', { nl: 'heterochromatine', en: 'heterochromatin' }], [C.rrna, { nl: 'nucleolus / ribosomen', en: 'nucleolus / ribosomes' }], [C.prot, { nl: 'kernporiën & Pol II', en: 'nuclear pores & Pol II' }], [C.rna, 'mRNA'], [C.tdna, { nl: 'adenovirus-DNA', en: 'adenovirus DNA' }]],
  simplified: {
    nl: 'Het aantal kernporiën is veel groter dan getekend (enkele duizenden per menselijke kern, afhankelijk van het celtype). De "kerstboom" bij de transcriptieplaats is gebaseerd op elektronenmicroscopie (Miller-preparaten): RNA\'s worden langer richting het einde van het gen. Het adenovirus-DNA gaat in werkelijkheid als lineair genoom met eiwitten door de porie nadat het capside aan de porie uiteenvalt; de plek in de kern is willekeurig gekozen.',
    en: 'There are far more nuclear pores than drawn (several thousand per human nucleus, depending on the cell type). The "Christmas tree" at the transcription site is based on electron microscopy (Miller spreads): RNAs get longer towards the end of the gene. In reality the adenovirus DNA passes through the pore as a linear, protein-bound genome after the capsid disassembles at the pore; its position in the nucleus is arbitrary.' },
  /* overzicht: geen verhaal met inzoomen, enkel het hele beeld met een korte uitleg (stap 0) */
  overview: { step: 0, dur: 10000, title: { nl: 'De celkern', en: 'The nucleus' },
    text: { nl: 'Hier ligt het DNA, verpakt als chromatine. Genen worden afgeschreven naar RNA, en in de nucleolus worden ribosomen gebouwd. Klik op een onderdeel om in te zoomen.',
            en: 'This is where the DNA lies, packed as chromatin. Genes are copied into RNA, and ribosomes are built in the nucleolus. Click any part to zoom in.' } },
  steps: [
    { dur: 6500, cam: FULL, title: { nl: 'De celkern', en: 'The nucleus' },
      text: { nl: 'Een kern van ~8 µm met het volledige genoom: 46 chromosomen, samen ~2 meter DNA.', en: 'A nucleus of ~8 µm holding the entire genome: 46 chromosomes, ~2 metres of DNA in total.' } },
    { dur: 7000, cam: cam(420, 430, 700), title: { nl: 'Kernenvelop en kernporiën', en: 'Nuclear envelope and pores' },
      text: { nl: 'Twee membranen met duizenden kernporiecomplexen: de enige doorgang tussen kern en cytosol.', en: 'Two membranes with thousands of nuclear pore complexes: the only passage between nucleus and cytosol.' } },
    { dur: 7000, cam: cam(620, 560, 820), title: { nl: 'Chromatine', en: 'Chromatin' },
      text: { nl: 'Open euchromatine (actief) en compact heterochromatine, vooral aan de rand van de kern.', en: 'Open euchromatin (active) and compact heterochromatin, mostly at the nuclear periphery.' } },
    { dur: 6500, cam: cam(715, 440, 560), title: { nl: 'Nucleolus', en: 'Nucleolus' },
      text: { nl: 'Hier maakt RNA-polymerase I het rRNA en worden ribosoomsubeenheden gebouwd.', en: 'Here RNA polymerase I makes rRNA and ribosomal subunits are assembled.' } },
    { dur: 7500, cam: cam(955, 320, 560), title: { nl: 'Een actief gen', en: 'An active gene' },
      text: { nl: 'Veel Pol II-moleculen schrijven hetzelfde gen tegelijk af; de RNA\'s worden langer naar het einde van het gen toe.', en: 'Many Pol II molecules transcribe the same gene at once; the RNAs get longer towards the end of the gene.' } },
    { dur: 7000, cam: cam(1180, 300, 820), title: { nl: 'mRNA naar buiten', en: 'mRNA leaves' },
      text: { nl: 'Rijp mRNA gaat door een kernporie naar de ribosomen in het cytosol.', en: 'Mature mRNA passes through a nuclear pore to the ribosomes in the cytosol.' } },
    { dur: 7000, cam: cam(470, 490, 720), title: { nl: 'Viraal DNA in de kern', en: 'Viral DNA in the nucleus' },
      text: { nl: 'Het adenovirus-DNA blijft los (episomaal) en wordt door RNA-polymerase II van de cel afgelezen.', en: 'The adenovirus DNA stays separate (episomal) and is read by the cell’s own RNA polymerase II.' } },
  ],
  svg: sceneKern,
};
