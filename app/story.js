/*
 * De rode draad: hoofdstukken van het hoofdverhaal (menselijke cel, route via een adenovirus).
 * Elk hoofdstuk = een scène (knoop-id). `bridge` = één zin die de overgang naar het VOLGENDE hoofdstuk uitlegt.
 * Zijtakken (replicatie, herstel, RNA-soorten, …) hangen aan deze lijn via de knoppen in de scènes en het zijpaneel.
 */
export const STORY = [
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
export const STORY_IDS = STORY.map(c => c.id);
