/* Eenvoudige laag voor de atlas (deel 4): afwijkende paren en bouwstenen van gevouwen RNA. */
export const SIMPLE = {
  mismatch: {
    title: { nl: 'Mismatch in RNA', en: 'Mismatch in RNA' },
    sub: { nl: 'voorbeeld: een stukje SRP-RNA', en: 'example: a piece of SRP RNA' },
    kort: {
      nl: 'Normaal past A bij U en G bij C. Een [[mismatch|mismatch]] is een paar dat niet past, zoals A tegenover C. In RNA is dat geen fout: de helix blijft gewoon staan en krijgt zo een plekje met een eigen vorm.',
      en: 'Normally A fits with U and G with C. A [[mismatch|mismatch]] is a pair that does not fit, such as A opposite C. In RNA this is not an error: the helix stays intact and gets a spot with a shape of its own.' },
    look: {
      nl: 'De meeste paren zijn gewone paren. Zoek de mismatches (A·C en G·A), het G–U-paar en drie basen zonder partner. De bolletjes zijn metaalionen.',
      en: 'Most pairs are ordinary pairs. Look for the mismatches (A·C and G·A), the G–U pair and three bases without a partner. The small balls are metal ions.' },
    why: {
      nl: 'Zulke afwijkende plekjes zijn herkenningspunten. Op dit stukje bindt het eiwit dat het SRP helpt om een ribosoom naar het ER te brengen.',
      en: 'Such unusual spots are recognition points. The protein that helps SRP bring a ribosome to the ER binds to exactly this piece.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'twee basen tegenover elkaar die niet passen', en: 'two facing bases that do not fit' }],
      [{ nl: 'Gewone paren', en: 'Ordinary pairs' }, { nl: 'A–U en G–C', en: 'A–U and G–C' }],
      [{ nl: 'Hier te zien', en: 'Seen here' }, { nl: 'A·C en G·A (roze), G–U (geel)', en: 'A·C and G·A (pink), G–U (yellow)' }],
      [{ nl: 'Komt voor in', en: 'Found in' }, { nl: 'tRNA, mRNA, rRNA en SRP-RNA', en: 'tRNA, mRNA, rRNA and SRP RNA' }],
      [{ nl: 'Verschil met DNA', en: 'Difference with DNA' }, { nl: 'in DNA is een mismatch een fout die hersteld wordt', en: 'in DNA a mismatch is an error that gets repaired' }],
    ],
  },
  wobble: {
    title: { nl: 'G–U-paar (wobble)', en: 'G–U pair (wobble)' },
    sub: { nl: 'voorbeeld: een helix uit menselijk SRP-RNA', en: 'example: a helix from human SRP RNA' },
    kort: {
      nl: 'In RNA kan een G ook met een U paren. Dat paar staat een beetje scheef, alsof het wiebelt: daarom heet het een [[wobble|wobble]]-paar. Het is het meest voorkomende afwijkende paar in RNA.',
      en: 'In RNA a G can also pair with a U. That pair sits a little crooked, as if it wobbles: that is why it is called a [[wobble|wobble]] pair. It is the most common unusual pair in RNA.' },
    look: {
      nl: 'Zoek de twee G–U-paren in de helix, en de G’s die met een andere G paren. De rest zijn gewone G–C- en A–U-paren.',
      en: 'Look for the two G–U pairs in the helix, and the Gs that pair with another G. The rest are ordinary G–C and A–U pairs.' },
    why: {
      nl: 'Door wobble kan één tRNA meerdere codons lezen. Zo heeft de cel minder verschillende tRNA’s nodig.',
      en: 'Thanks to wobble, one tRNA can read several codons. So the cell needs fewer different tRNAs.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'een G die met een U paart', en: 'a G pairing with a U' }],
      [{ nl: 'Waterstofbruggen', en: 'Hydrogen bonds' }, { nl: '2, net als A–U (G–C heeft er 3)', en: '2, like A–U (G–C has 3)' }],
      [{ nl: 'Vorm', en: 'Shape' }, { nl: 'iets verschoven t.o.v. een gewoon paar', en: 'slightly shifted compared with a normal pair' }],
      [{ nl: 'Belangrijk bij', en: 'Important for' }, { nl: 'tRNA dat meerdere codons leest', en: 'tRNA reading several codons' }],
      [{ nl: 'Hier te zien', en: 'Seen here' }, { nl: 'helix 6 van SRP-RNA, waar SRP19 bindt', en: 'helix 6 of SRP RNA, where SRP19 binds' }],
    ],
  },
  stemloop: {
    title: { nl: 'Stam en lus in RNA', en: 'Stem and loop in RNA' },
    sub: { nl: 'voorbeeld: de anticodonarm van tRNA', en: 'example: the anticodon arm of tRNA' },
    kort: {
      nl: 'Een RNA-streng kan terugvouwen en met zichzelf paren, zoals een haarspeld. Het gepaarde stuk heet de [[stam|stam]], het open stukje aan het einde de [[lus|lus]].',
      en: 'An RNA strand can fold back and pair with itself, like a hairpin. The paired part is called the [[stem|stam]], the open bit at the end the [[loop|lus]].' },
    look: {
      nl: 'Het stuk dat telt, is een stam van 5 paren met daarop een lus; in die lus zit het anticodon. De rest van het tRNA ligt eromheen.',
      en: 'The piece that matters is a stem of 5 pairs with a loop on top; the anticodon sits in that loop. The rest of the tRNA lies around it.' },
    why: {
      nl: 'Stam en lus zijn de bouwstenen van elk gevouwen RNA. In de lus van tRNA zitten de drie letters die het codon op het mRNA lezen.',
      en: 'Stem and loop are the building blocks of every folded RNA. The tRNA loop holds the three letters that read the codon on the mRNA.' },
    facts: [
      [{ nl: 'Stam', en: 'Stem' }, { nl: 'stuk waar de streng met zichzelf paart', en: 'part where the strand pairs with itself' }],
      [{ nl: 'Lus', en: 'Loop' }, { nl: 'ongepaard stukje aan het einde van de stam', en: 'unpaired bit at the end of the stem' }],
      [{ nl: 'Hier', en: 'Here' }, { nl: 'stam van 5 paren, lus van 7 letters', en: 'stem of 5 pairs, loop of 7 letters' }],
      [{ nl: 'Anticodon', en: 'Anticodon' }, { nl: 'GAA: leest het codon UUC (fenylalanine)', en: 'GAA: reads the codon UUC (phenylalanine)' }],
      [{ nl: 'Komt voor in', en: 'Found in' }, { nl: 'tRNA, rRNA, mRNA en virussen', en: 'tRNA, rRNA, mRNA and viruses' }],
    ],
  },
};
export const EXTRA_GLOSS = {
  mismatch: { nl: ['mismatch', 'Twee basen tegenover elkaar die niet bij elkaar passen, bv. A tegenover C.'], en: ['mismatch', 'Two facing bases that do not fit together, e.g. A opposite C.'] },
  wobble: { nl: ['wobble', 'Een paar dat iets scheef staat, zoals G met U; het laat één tRNA meerdere codons lezen.'], en: ['wobble', 'A pair that sits slightly crooked, like G with U; it lets one tRNA read several codons.'] },
  stam: { nl: ['stam', 'Het dubbelstrengige stuk waar een RNA-streng met zichzelf paart.'], en: ['stem', 'The double-stranded part where an RNA strand pairs with itself.'] },
  lus: { nl: ['lus', 'Het ongepaarde stukje aan het einde van een stam.'], en: ['loop', 'The unpaired bit at the end of a stem.'] },
};
