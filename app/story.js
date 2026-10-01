/*
 * De rode draad: hoofdstukken van de verhaallijnen (menselijke cel). Verhaal 1: route via een adenovirus; verhaal 2: een signaalmolecule.
 * Elk hoofdstuk = een scène (knoop-id). `bridge` = één zin die de overgang naar het VOLGENDE hoofdstuk uitlegt.
 * Zijtakken (replicatie, herstel, RNA-soorten, …) hangen aan deze lijn via de knoppen in de scènes en het zijpaneel.
 */
const VIRUS = [
  { id: 'cel', bridge: { nl: 'Een adenovirus hecht zich aan de cel en brengt zijn DNA binnen.', en: 'An adenovirus attaches to the cell and brings its DNA inside.' } },
  { id: 'adeno', bridge: { nl: 'Eerst moet het virus door het plasmamembraan: via endocytose.', en: 'First the virus has to cross the plasma membrane: by endocytosis.' } },
  { id: 'endocytose', bridge: { nl: 'Eenmaal in het cytosol reist het capside naar een kernporie.', en: 'Once in the cytosol the capsid travels to a nuclear pore.' } },
  { id: 'kernimport', bridge: { nl: 'Het virale DNA is in de kern, waar ook het eigen genoom van de cel ligt.', en: 'The viral DNA is now in the nucleus, home of the cell’s own genome.' } },
  { id: 'kern', bridge: { nl: 'Zoom in op het DNA: het zit verpakt in chromatine.', en: 'Zoom in on the DNA: it is packed into chromatin.' } },
  { id: 'chromatine', bridge: { nl: 'De basiseenheid van chromatine is het nucleosoom.', en: 'The basic unit of chromatin is the nucleosome.' } },
  { id: 'nucleosoom', bridge: { nl: 'Rond elk nucleosoom zit de dubbelhelix zelf.', en: 'Wrapped around each nucleosome is the double helix itself.' } },
  { id: 'dnahelix', bridge: { nl: 'Om een gen af te lezen moet het eerst aangezet worden.', en: 'To read a gene, it first has to be switched on.' } },
  { id: 'genregulatie', bridge: { nl: 'Aan de promoter wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the promoter.' } },
  { id: 'promoter', bridge: { nl: 'RNA-polymerase II vertrekt en schrijft het gen af naar RNA.', en: 'RNA polymerase II takes off and copies the gene into RNA.' } },
  { id: 'transcriptie', bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', bridge: { nl: 'Het rijpe mRNA verlaat de kern.', en: 'The mature mRNA leaves the nucleus.' } },
  { id: 'export', bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', bridge: { nl: 'Het ribosoom leest nu codon na codon.', en: 'The ribosome now reads codon after codon.' } },
  { id: 'translatie', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', bridge: { nl: 'Eerst vormen zich lokale structuren: helices en β-bladen.', en: 'Local structures form first: helices and β-sheets.' } },
  { id: 'secundair', bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', bridge: { nl: 'Veel eiwitten werken pas als complex van meerdere ketens.', en: 'Many proteins only work as a complex of several chains.' } },
  { id: 'quaternair', bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden.', en: 'After folding, the protein can still be modified.' } },
  { id: 'ptm', bridge: { nl: 'Elk eiwit wordt uiteindelijk ook weer afgebroken.', en: 'Every protein is eventually broken down again.' } },
  { id: 'ubiquitine', bridge: { nl: 'Einde van het hoofdverhaal. Verken nu de zijtakken via de kaart.', en: 'End of the main story. Explore the side paths via the map.' } },
];

/* Verhaallijn 2: een signaalmolecule (EGF) zet een gen aan (FOS) → het eiwit c-Fos wordt gemaakt, gevouwen en afgebroken.
 * Vanaf 'promoter' volgt ze dezelfde scènes als verhaal 1; de overgangszinnen zijn aangepast aan dit verhaal. */
const SIGNAAL = [
  { id: 'cel', bridge: { nl: 'Een groeifactor komt aan bij de cel: een signaal van buitenaf.', en: 'A growth factor arrives at the cell: a signal from outside.' } },
  { id: 'signaal', bridge: { nl: 'We volgen de groeifactor EGF: die bindt een receptortyrosinekinase.', en: 'We follow the growth factor EGF: it binds a receptor tyrosine kinase.' } },
  { id: 'rtk', bridge: { nl: 'De geactiveerde receptor zet een kinasecascade in gang.', en: 'The activated receptor sets off a kinase cascade.' } },
  { id: 'mapk', bridge: { nl: 'Actief ERK is in de kern en zet een gen aan.', en: 'Active ERK is in the nucleus and switches on a gene.' } },
  { id: 'srf', bridge: { nl: 'Aan de promoter van FOS wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the FOS promoter.' } },
  { id: 'promoter', bridge: { nl: 'RNA-polymerase II vertrekt en schrijft FOS af naar RNA.', en: 'RNA polymerase II takes off and copies FOS into RNA.' } },
  { id: 'transcriptie', bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', bridge: { nl: 'Het rijpe FOS-mRNA verlaat de kern.', en: 'The mature FOS mRNA leaves the nucleus.' } },
  { id: 'export', bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', bridge: { nl: 'Het ribosoom leest nu codon na codon: c-Fos wordt gemaakt.', en: 'The ribosome now reads codon after codon: c-Fos is being made.' } },
  { id: 'translatie', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', bridge: { nl: 'Eerst vormen zich lokale structuren: helices en β-bladen.', en: 'Local structures form first: helices and β-sheets.' } },
  { id: 'secundair', bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', bridge: { nl: 'c-Fos werkt pas samen met een partner (c-Jun): een complex van twee ketens.', en: 'c-Fos only works together with a partner (c-Jun): a complex of two chains.' } },
  { id: 'quaternair', bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden, o.a. door ERK zelf.', en: 'After folding the protein can still be modified, among others by ERK itself.' } },
  { id: 'ptm', bridge: { nl: 'Een signaal mag niet blijven duren: ook c-Fos wordt weer afgebroken.', en: 'A signal must not last forever: c-Fos is broken down again too.' } },
  { id: 'ubiquitine', bridge: { nl: 'Einde van verhaal 2. Verken nu de zijtakken of verhaal 1 via de kaart.', en: 'End of story 2. Now explore the side paths or story 1 via the map.' } },
];

/* Alle verhaallijnen. De engine kiest er één (?story=… of de laatst gekozen) en kan wisselen. */
export const LINES = {
  virus: { chapters: VIRUS, title: { nl: 'Verhaal 1 · Een virus brengt DNA binnen', en: 'Story 1 · A virus brings in DNA' }, short: { nl: 'Verhaal 1', en: 'Story 1' } },
  signaal: { chapters: SIGNAAL, title: { nl: 'Verhaal 2 · Een signaal zet een gen aan', en: 'Story 2 · A signal switches on a gene' }, short: { nl: 'Verhaal 2', en: 'Story 2' } },
};
export const LINE_KEYS = Object.keys(LINES);
/* standaardlijn (voor oudere code en tools) */
export const STORY = VIRUS;
export const STORY_IDS = STORY.map(c => c.id);
