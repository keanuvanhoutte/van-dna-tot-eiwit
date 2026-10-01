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
    text: { nl: 'Hier ligt het DNA, met eiwitten verpakt tot chromatine. Genen worden overgeschreven naar RNA, en in de nucleolus worden ribosomen gebouwd. Klik op een onderdeel om in te zoomen.',
            en: 'This is where the DNA lies, packed with proteins into chromatin. Genes are copied into RNA, and ribosomes are built in the nucleolus. Click any part to zoom in.' } },
  steps: [
    { dur: 6500, cam: FULL, title: { nl: 'De celkern', en: 'The nucleus' },
      text: { nl: 'De kern bewaart het volledige genoom: 46 chromosomen, samen ongeveer 2 meter DNA, in een bolletje van ~8 µm.', en: 'The nucleus stores the entire genome: 46 chromosomes, about 2 metres of DNA in total, in a ball of ~8 µm.' } },
    { dur: 7000, cam: cam(420, 430, 700), title: { nl: 'Kernenvelop en kernporiën', en: 'Nuclear envelope and pores' },
      text: { nl: 'Twee membranen omhullen de kern. Duizenden kernporiën, kleine poorten, zijn de enige doorgang naar het cytosol.', en: 'Two membranes surround the nucleus. Thousands of nuclear pores, small gates, are the only way through to the cytosol.' } },
    { dur: 7000, cam: cam(620, 560, 820), title: { nl: 'Chromatine', en: 'Chromatin' },
      text: { nl: 'Chromatine is DNA met eiwitten. Waar het open ligt (euchromatine) worden genen afgelezen; compact heterochromatine ligt vooral aan de kernrand.', en: 'Chromatin is DNA plus proteins. Where it is open (euchromatin) genes are read; compact heterochromatin lies mostly at the edge of the nucleus.' } },
    { dur: 6500, cam: cam(715, 440, 560), title: { nl: 'Nucleolus', en: 'Nucleolus' },
      text: { nl: 'In de nucleolus maakt RNA-polymerase I het ribosomaal RNA (rRNA). Hier worden ook de twee delen van het ribosoom opgebouwd.', en: 'In the nucleolus RNA polymerase I makes ribosomal RNA (rRNA). The two parts of the ribosome are also assembled here.' } },
    { dur: 7500, cam: cam(955, 320, 560), title: { nl: 'Een actief gen', en: 'An active gene' },
      text: { nl: 'Veel RNA-polymerase II-enzymen schrijven hetzelfde gen tegelijk af naar RNA. Hoe verder op het gen, hoe langer hun RNA al is.', en: 'Many RNA polymerase II enzymes copy the same gene into RNA at once. The further along the gene, the longer their RNA already is.' } },
    { dur: 7000, cam: cam(1180, 300, 820), title: { nl: 'mRNA naar buiten', en: 'mRNA leaves' },
      text: { nl: 'Het afgewerkte mRNA verlaat de kern via een kernporie, op weg naar de ribosomen in het cytosol.', en: 'The finished mRNA leaves the nucleus through a nuclear pore, on its way to the ribosomes in the cytosol.' } },
    { dur: 7000, cam: cam(470, 490, 720), title: { nl: 'Viraal DNA in de kern', en: 'Viral DNA in the nucleus' },
      text: { nl: 'Het DNA van het adenovirus blijft los van de chromosomen (episomaal). Toch leest het RNA-polymerase II van de cel het af.', en: 'The adenovirus DNA stays separate from the chromosomes (episomal). Even so, the cell’s own RNA polymerase II reads it.' } },
  ],
  svg: sceneKern,
};
