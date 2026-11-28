import { C, BASE, RNA_PAIR, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { prot, note, arrow, ntBox, hb, npairs, snip, hot, setHot } from './_rna.js';
import { eiwitPad } from '../../bio.js';

/*
 * RNA-structuur: enkelstrengig maar vouwt. Elke stap heeft een eigen gebied op een groot canvas:
 *   R0 haarspeld (800,450) · R1 HIV-1 TAR-bulge (2000,450) · R2 lussen & juncties (3200,450)
 *   R3 pseudoknoop (800,1350) · R4 A-vorm vs B-vorm (2000,1350) · R5 tRNA (3200,1350) · R6 ribozymen (2000,2250)
 */
// haarspeld met cUUCGg-tetralus en één G·U-wobble: G1–C16, G2–C15, A3–U14, U4–A13, G5·U12, C6–G11, lus U7 U8 C9 G10
const HP = 'GGAUGCUUCGGUAUCC';
const HPAIR = [[0, 15], [1, 14], [2, 13], [3, 12], [4, 11], [5, 10]];
// HIV-1 TAR (nt 17–45)
const TAR = 'GGCAGAUCUGAGCCUGGGAGCUCUCUGCC';
const TPAIR = [[17, 45], [18, 44], [19, 43], [20, 42], [21, 41], [22, 40], [26, 39], [27, 38], [28, 37], [29, 36]];
const tarB = n => TAR[n - 17];

const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

/* ladder (helix) van punt a in richting ang (graden), n baseparen, breedte w */
function ladder(x, y, ang, n, col = C.rna, w = 34, sp = 22, op = 1) {
  const r = ang * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r), nx = -dy, ny = dx, len = (n - .5) * sp;
  const a1 = [x + nx * w / 2, y + ny * w / 2], a2 = [x - nx * w / 2, y - ny * w / 2];
  let s = `<g opacity="${f1(op)}"><line x1="${f1(a1[0])}" y1="${f1(a1[1])}" x2="${f1(a1[0] + dx * len)}" y2="${f1(a1[1] + dy * len)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>` +
    `<line x1="${f1(a2[0])}" y1="${f1(a2[1])}" x2="${f1(a2[0] + dx * len)}" y2="${f1(a2[1] + dy * len)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`;
  for (let k = 0; k < n; k++) { const cx = x + dx * (k * sp + sp / 4), cy = y + dy * (k * sp + sp / 4); s += `<line x1="${f1(cx + nx * (w / 2 - 4))}" y1="${f1(cy + ny * (w / 2 - 4))}" x2="${f1(cx - nx * (w / 2 - 4))}" y2="${f1(cy - ny * (w / 2 - 4))}" stroke="#fff" stroke-width="2.5" opacity=".6"/>`; }
  return s + '</g>';
}
const tip = (x, y, ang, n, sp = 22) => { const r = ang * Math.PI / 180; return [x + Math.cos(r) * (n - .5) * sp, y + Math.sin(r) * (n - .5) * sp]; };
const loopC = (x, y, r, col = C.rna, dots = 5, op = 1) => {
  let s = `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="none" stroke="${col}" stroke-width="6"/>`;
  return s + '</g>';
};

export default {
  id: 'rnastructuur',
  title: { nl: 'RNA-structuur', en: 'RNA structure' },
  scale: '≈ 2–10 nm',
  time: { nl: 'vouwing: µs – s', en: 'folding: µs – s' },
  org: { nl: 'algemeen (voorbeelden: mens, HIV-1, gist-tRNA)', en: 'general (examples: human, HIV-1, yeast tRNA)' },
  legend: [[BASE.A, 'A'], [BASE.U, 'U'], [BASE.G, 'G'], [BASE.C, 'C'], [C.rna, { nl: 'RNA-ruggengraat', en: 'RNA backbone' }], [C.dna, 'DNA'], ['#ffd36b', { nl: 'G·U-wobble / nadruk', en: 'G·U wobble / highlight' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Belangrijk verschil met DNA: dsRNA is vrijwel altijd <b>A-vorm</b> (≈ 11 bp/winding, C3′-endo; de 2′-OH maakt C2′-endo en dus B-vorm ongunstig). Vergelijk met B-DNA (≈ 10–10,5 bp, C2′-endo) en Z-DNA (linkshandig). Echte structuren: tRNA<sup>Phe</sup> van gist <b>1EHZ</b>, HIV-1 TAR <b>1ANR</b>, pseudoknoop (MMTV) <b>1RNK</b>, hammerhead-ribozym <b>2OEU</b>, humaan 80S-ribosoom <b>4UG0</b>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Key difference from DNA: dsRNA is almost always <b>A-form</b> (≈ 11 bp/turn, C3′-endo; the 2′-OH disfavours C2′-endo and hence B-form). Compare B-DNA (≈ 10–10.5 bp, C2′-endo) and Z-DNA (left-handed). Real structures: yeast tRNA<sup>Phe</sup> <b>1EHZ</b>, HIV-1 TAR <b>1ANR</b>, pseudoknot (MMTV) <b>1RNK</b>, hammerhead ribozyme <b>2OEU</b>, human 80S ribosome <b>4UG0</b>.</p>' },
  simplified: {
    nl: 'Alle structuren zijn 2D-schema\'s: helices als ladders, lussen als cirkels. De haarspeld is een voorbeeldsequentie (met de bekende, zeer stabiele cUUCGg-tetralus). TAR is de echte HIV-1-sequentie (nt 17–45), maar Tat en cycline T1 zijn als blob getekend. De A/B-helices zijn zijaanzichten van een ideaal model, niet op exacte schaal. De tRNA-L-vorm is een projectie van de 3D-structuur (1EHZ). Het hammerhead-ribozym is als klassieke Y-vorm getekend zonder de tertiaire lus-lusinteractie van de volledige structuur.',
    en: 'All structures are 2D schemes: helices as ladders, loops as circles. The hairpin is an example sequence (with the well-known, very stable cUUCGg tetraloop). TAR is the real HIV-1 sequence (nt 17–45), but Tat and cyclin T1 are drawn as blobs. The A/B helices are side views of an ideal model, not exactly to scale. The tRNA L shape is a projection of the 3D structure (1EHZ). The hammerhead ribozyme is drawn as the classic Y shape without the tertiary loop–loop interaction of the full-length structure.' },
  parts: [
    { c: '#ffd36b', t: '2′-OH', m: ['ribose (2′-OH) · uracil i.p.v. thymine', 'ribose (2′-OH) · uracil instead of thymine'], d: { nl: 'Een extra OH-groepje op de suiker van RNA (ribose). DNA mist dat. RNA gebruikt ook U in plaats van T.', en: 'An extra OH group on the sugar of RNA (ribose). DNA lacks it. RNA also uses U instead of T.' },
      p: { nl: '2′-hydroxylgroep van de ribose; bepaalt de C3′-endo-suikerpucker en maakt RNA chemisch minder stabiel dan DNA.', en: '2′ hydroxyl group of ribose; dictates the C3′-endo sugar pucker and makes RNA chemically less stable than DNA.' } },
    { c: C.text, t: '5′', m: ['3′', '5′ → 3′'], d: { nl: 'De twee uiteinden van de RNA-streng. De streng heeft een richting, zoals een zin die je van links naar rechts leest.', en: 'The two ends of the RNA strand. The strand has a direction, like a sentence you read from left to right.' },
      p: { nl: '5′- en 3′-uiteinde; RNA wordt 5′→3′ gesynthetiseerd en gepaarde segmenten lopen antiparallel.', en: '5′ and 3′ ends; RNA is synthesised 5′→3′ and paired segments run antiparallel.' } },
    { c: C.rna, t: { nl: 'stam (antiparallel)', en: 'stem (antiparallel)' }, m: ['stam (helix)', 'stem (helix)'], d: { nl: 'Twee stukken van dezelfde streng die op elkaar passen en paren, in tegengestelde richting. Ze vormen een dubbel stuk.', en: 'Two stretches of the same strand that match and pair, in opposite directions. They form a double piece.' },
      p: { nl: 'Intramoleculaire dubbelhelix (A-vorm) uit antiparallelle, complementaire segmenten.', en: 'Intramolecular double helix (A-form) of antiparallel, complementary segments.' } },
    { c: C.rna, t: { nl: 'lus', en: 'loop' }, m: ['haarspeldlus', 'hairpin loop', 'UUCG'], d: { nl: 'De ongepaarde letters aan het eind van een stam: de bocht van de haarspeld. UUCG is een heel stevige lus van vier letters.', en: 'The unpaired letters at the end of a stem: the bend of the hairpin. UUCG is a very stable loop of four letters.' },
      p: { nl: 'Haarspeldlus; cUUCGg is een uitzonderlijk stabiele tetralus.', en: 'Hairpin loop; cUUCGg is an exceptionally stable tetraloop.' } },
    { c: '#ffd36b', t: { nl: 'G·U: 2 H-bruggen', en: 'G·U: 2 H-bonds' }, d: { nl: 'Een G die met een U paart. Het paar staat iets scheef (‘wobble’) en houdt elkaar met twee waterstofbruggen vast.', en: 'A G pairing with a U. The pair sits slightly shifted (‘wobble’) and is held by two hydrogen bonds.' },
      p: { nl: 'G·U-wobblepaar, het meest voorkomende niet-Watson–Crick-paar in RNA; verschoven geometrie met twee H-bruggen.', en: 'G·U wobble pair, the most common non-Watson–Crick pair in RNA; shifted geometry with two hydrogen bonds.' } },
    { c: C.text, t: { nl: 'G–C: 3', en: 'G–C: 3' }, m: ['A–U: 2'], d: { nl: 'De gewone paren: G met C (drie waterstofbruggen, steviger) en A met U (twee).', en: 'The normal pairs: G with C (three hydrogen bonds, stronger) and A with U (two).' },
      p: { nl: 'Watson–Crick-paren: G–C met drie, A–U met twee waterstofbruggen.', en: 'Watson–Crick pairs: G–C with three, A–U with two hydrogen bonds.' } },
    { c: '#ffd36b', t: 'bulge', m: ['bulge (U23 C24 U25)'], d: { nl: 'Letters aan één kant van een stam die geen partner hebben en uitpuilen.', en: 'Letters on one side of a stem that have no partner and bulge out.' },
      p: { nl: 'Bulge: ongepaarde nucleotiden in één streng van een helix; in HIV-1 TAR de trinucleotidebulge U23–C24–U25.', en: 'Bulge: unpaired nucleotides in one strand of a helix; in HIV-1 TAR the trinucleotide bulge U23–C24–U25.' } },
    { c: C.tdna, t: 'Tat', d: { nl: 'Een eiwit van het hiv-virus dat op de uitstulping gaat zitten en zo het aflezen van het virus-DNA aanzwengelt.', en: 'A protein of the HIV virus that sits on the bulge and so boosts the reading of the viral DNA.' },
      p: { nl: 'HIV-1-transactivator Tat; bindt de TAR-bulge samen met cycline T1 (P-TEFb) en bevordert transcriptie-elongatie.', en: 'HIV-1 transactivator Tat; binds the TAR bulge together with cyclin T1 (P-TEFb) and promotes transcription elongation.' } },
    { c: C.muted, t: { nl: 'HIV-1 TAR (nt 17–45) · echte structuur: PDB 1ANR', en: 'HIV-1 TAR (nt 17–45) · real structure: PDB 1ANR' }, d: { nl: 'Dit voorbeeld is een echt stukje RNA van het hiv-virus. De letters en nummers kloppen met de gemeten structuur.', en: 'This example is a real piece of RNA from the HIV virus. The letters and numbers match the measured structure.' },
      p: { nl: 'Trans-activation response element (nt 17–45) aan het 5′-uiteinde van alle HIV-1-transcripten; NMR-structuur 1ANR.', en: 'Trans-activation response element (nt 17–45) at the 5′ end of all HIV-1 transcripts; NMR structure 1ANR.' } },
    { c: '#ffd36b', t: { nl: 'interne lus', en: 'internal loop' }, d: { nl: 'Een opening midden in een stam, met ongepaarde letters aan beide kanten.', en: 'An opening in the middle of a stem, with unpaired letters on both sides.' },
      p: { nl: 'Interne lus: ongepaarde nucleotiden in beide strengen tussen twee helices.', en: 'Internal loop: unpaired nucleotides in both strands between two helices.' } },
    { c: '#ffd36b', t: { nl: 'junctie (multilus)', en: 'junction (multiloop)' }, d: { nl: 'Een kruispunt waar drie of meer stammen samenkomen.', en: 'A crossroads where three or more stems meet.' },
      p: { nl: 'Multibranch-lus (junctie) waar ≥ 3 helices samenkomen; organiseert de tertiaire structuur.', en: 'Multibranch loop (junction) where ≥ 3 helices meet; organises the tertiary structure.' } },
    { c: C.dna2, t: { nl: 'stam 1 (genest)', en: 'stem 1 (nested)' }, d: { nl: 'De blauwe bogen: letters die paren tot een gewone stam. Elke boog verbindt twee letters die paren.', en: 'The blue arcs: letters that pair into a normal stem. Each arc connects two letters that pair.' },
      p: { nl: 'Boogdiagram van een geneste helix: de paringen kruisen elkaar niet.', en: 'Arc diagram of a nested helix: the pairings do not cross.' } },
    { c: '#ffd36b', t: { nl: 'stam 2 kruist stam 1', en: 'stem 2 crosses stem 1' }, m: ['Kruisende bogen = pseudoknoop: niet te voorspellen met klassieke (geneste) algoritmen', 'Crossing arcs = pseudoknot: not predictable with classic (nested) algorithms', 'voorbeeld: frameshift-pseudoknoop van MMTV (PDB 1RNK)', 'example: MMTV frameshift pseudoknot (PDB 1RNK)'], d: { nl: 'De gele bogen: letters uit de lus paren met een stuk buiten de stam. De bogen kruisen: dat is een pseudoknoop.', en: 'The yellow arcs: letters from the loop pair with a stretch outside the stem. The arcs cross: that is a pseudoknot.' },
      p: { nl: 'Pseudoknoop: lusnucleotiden paren met een segment buiten de stam; niet-geneste topologie, bv. de frameshift-pseudoknoop van MMTV (1RNK).', en: 'Pseudoknot: loop nucleotides pair with a segment outside the stem; non-nested topology, e.g. the MMTV frameshift pseudoknot (1RNK).' } },
    { c: C.dna, t: 'B-DNA', m: ['≈ 10,5 bp/winding · C2′-endo', '≈ 10.5 bp/turn · C2′-endo'], d: { nl: 'Links: dubbel DNA, ter vergelijking. Het draait rond met ongeveer 10,5 paren per slag.', en: 'Left: double DNA, for comparison. It twists with about 10.5 pairs per turn.' },
      p: { nl: 'B-vorm-DNA: rechtshandig, ≈ 10,5 bp per winding, C2′-endo-suikerpucker, basenparen loodrecht op de as.', en: 'B-form DNA: right-handed, ≈ 10.5 bp per turn, C2′-endo sugar pucker, base pairs perpendicular to the axis.' } },
    { c: C.rna, t: { nl: 'A-RNA (dsRNA)', en: 'A-RNA (dsRNA)' }, m: ['≈ 11 bp/winding · C3′-endo', '≈ 11 bp/turn · C3′-endo'], d: { nl: 'Rechts: dubbel RNA. Door het extra OH-groepje draait het breder en compacter, met ongeveer 11 paren per slag.', en: 'Right: double RNA. Because of the extra OH group it twists wider and more compactly, with about 11 pairs per turn.' },
      p: { nl: 'A-vorm-helix: ≈ 11 bp per winding, C3′-endo, gekantelde basenparen, diepe smalle grote groeve.', en: 'A-form helix: ≈ 11 bp per turn, C3′-endo, inclined base pairs, deep and narrow major groove.' } },
    { c: C.trna, t: { nl: 'acceptorstam', en: 'acceptor stem' }, m: ['CCA-3′'], d: { nl: 'De arm waar het aminozuur aan vastgemaakt wordt, op het uiteinde met de letters CCA.', en: 'The arm to which the amino acid is attached, at the end with the letters CCA.' },
      p: { nl: 'Acceptorstam met het 3′-CCA-uiteinde; het aminozuur wordt aan de terminale A veresterd.', en: 'Acceptor stem with the 3′ CCA end; the amino acid is esterified to the terminal A.' } },
    { c: '#e8a93a', t: { nl: 'anticodonarm', en: 'anticodon arm' }, m: ['anticodon'], d: { nl: 'De arm met het leesstukje (anticodon): drie letters die op een codewoord van het mRNA passen.', en: 'The arm with the reading piece (anticodon): three letters that match a code word on the mRNA.' },
      p: { nl: 'Anticodonstam-lus; het anticodon (posities 34–36) paart met het codon.', en: 'Anticodon stem-loop; the anticodon (positions 34–36) pairs with the codon.' } },
    { c: '#e8a93a', t: { nl: 'D-arm', en: 'D arm' }, m: ['TΨC-arm', 'TΨC arm', 'elleboog: D- en T-lus raken elkaar', 'elbow: D and T loops meet'], d: { nl: 'Twee zijarmen van het tRNA. In de L-vorm raken hun lussen elkaar in de ‘elleboog’, wat de vorm stevig maakt.', en: 'Two side arms of the tRNA. In the L shape their loops touch at the ‘elbow’, which makes the shape firm.' },
      p: { nl: 'D-arm (met dihydrouridine) en TΨC-arm (met pseudouridine); tertiaire D-lus–T-lusinteracties vormen de elleboog van de L.', en: 'D arm (with dihydrouridine) and TΨC arm (with pseudouridine); tertiary D-loop–T-loop interactions form the elbow of the L.' } },
    { c: C.muted, t: { nl: '3D: L-vorm (PDB 1EHZ)', en: '3D: L shape (PDB 1EHZ)' }, m: ['2D: klaverblad', '2D: cloverleaf', '≈ 75 Å'], d: { nl: 'Plat getekend lijkt een tRNA op een klaverblad; in het echt vouwt het tot een L van zo’n 7,5 nanometer lang.', en: 'Drawn flat, a tRNA looks like a cloverleaf; in reality it folds into an L about 7.5 nanometres long.' },
      p: { nl: 'Secundaire klaverbladstructuur versus tertiaire L-vorm (gist-tRNA^Phe, 1EHZ); ≈ 75 Å tussen CCA-uiteinde en anticodon.', en: 'Cloverleaf secondary structure versus tertiary L shape (yeast tRNA^Phe, 1EHZ); ≈ 75 Å between the CCA end and the anticodon.' } },
    { c: C.text, t: { nl: 'hammerhead-ribozym (PDB 2OEU)', en: 'hammerhead ribozyme (PDB 2OEU)' }, m: ['kern', 'core', 'I', 'II', 'III'], d: { nl: 'Een RNA dat werkt als enzym: drie stammen (I, II, III) rond een kern die het RNA zelf doorknipt.', en: 'An RNA that works as an enzyme: three stems (I, II, III) around a core that cuts the RNA itself.' },
      p: { nl: 'Hammerhead-ribozym: drie helices rond een geconserveerde katalytische kern; zelfsplitsend (2OEU).', en: 'Hammerhead ribozyme: three helices around a conserved catalytic core; self-cleaving (2OEU).' } },
    { c: '#ffd36b', t: { nl: '2′-OH → 2′,3′-cyclisch fosfaat + 5′-OH', en: '2′-OH → 2′,3′-cyclic phosphate + 5′-OH' }, d: { nl: 'Zo knipt het: het OH-groepje van de suiker valt de buurbinding aan, waardoor de streng in twee breekt.', en: 'This is how it cuts: the sugar’s OH group attacks the neighbouring bond, so the strand breaks in two.' },
      p: { nl: 'Interne transesterificatie: de 2′-OH valt het naburige fosfaat aan, met een 2′,3′-cyclisch fosfaat en een 5′-OH als producten.', en: 'Internal transesterification: the 2′-OH attacks the adjacent phosphate, yielding a 2′,3′-cyclic phosphate and a 5′-OH.' } },
    { c: '#ffd36b', t: { nl: 'groep I/II-intronen: zelfsplicing', en: 'group I/II introns: self-splicing' }, m: ['RNase P: knipt 5′-leader van pre-tRNA', 'RNase P: cuts 5′ leader off pre-tRNA', 'ribosoom: rRNA vormt peptidebinding', 'ribosome: rRNA forms peptide bond', 'spliceosoom: U2/U6-snRNA katalyseert', 'spliceosome: U2/U6 snRNA catalyses'], d: { nl: 'Andere RNA-enzymen in de cel. Ook in het ribosoom maakt RNA (niet eiwit) de binding tussen aminozuren.', en: 'Other RNA enzymes in the cell. In the ribosome too, RNA (not protein) makes the bond between amino acids.' },
      p: { nl: 'Natuurlijke ribozymen: zelfsplitsende groep I/II-intronen, RNase P, het peptidyltransferasecentrum van het rRNA en de U2/U6-kern van het spliceosoom.', en: 'Natural ribozymes: self-splicing group I/II introns, RNase P, the peptidyl transferase centre of rRNA and the U2/U6 core of the spliceosome.' } },
  ],
  steps: [
    ST(7000, cam(800, 440, 1250), "RNA is één streng", "RNA is one strand",
      "RNA is meestal één streng, met U in plaats van T. Die streng kan op zichzelf terugvouwen.",
      "RNA is usually a single strand, with U instead of T. That strand can fold back on itself."),
    ST(8000, cam(760, 450, 950), "Een haarspeld", "A hairpin",
      "Stukken die bij elkaar passen, paren tot een stam; de basen ertussen vormen een lus. Samen: een haarspeld.",
      "Matching stretches pair into a stem; the bases in between form a loop. Together: a hairpin."),
    ST(7000, cam(700, 450, 760), "Een scheef paar: G met U", "A shifted pair: G with U",
      "Naast A–U en G–C komt in RNA vaak een G·U-paar voor. Dat staat iets scheef: het ‘wobble’-paar.",
      "Besides A–U and G–C, RNA often has a G·U pair. It sits slightly shifted: the ‘wobble’ pair."),
    ST(8500, cam(2000, 440, 1100), "Een uitstulping", "A bulge",
      "Ongepaarde basen aan één kant van een stam puilen uit (een bulge). Bij hiv bindt een viruseiwit daarop.",
      "Unpaired bases on one side of a stem bulge out (a bulge). In HIV a viral protein binds there."),
    ST(7500, cam(3180, 470, 1150), "Lussen en kruispunten", "Loops and junctions",
      "Een gevouwen RNA bestaat uit stammen en lussen. Soms komen drie of meer stammen samen in een kruispunt.",
      "A folded RNA is made of stems and loops. Sometimes three or more stems meet at a junction."),
    ST(8500, cam(800, 1330, 1150), "Een pseudoknoop", "A pseudoknot",
      "Basen in een lus paren met een stuk buiten de stam, zodat de paringen kruisen: een pseudoknoop.",
      "Bases in a loop pair with a stretch outside the stem, so the pairings cross: a pseudoknot."),
    ST(8500, cam(2000, 1340, 1150), "Dubbel RNA draait anders", "Double RNA twists differently",
      "Door een extra OH-groep op de suiker draait dubbel RNA anders dan DNA: de A-vorm, ~11 basenparen per winding.",
      "Because of an extra OH group on the sugar, double RNA twists differently from DNA: the A-form, ~11 base pairs per turn."),
    ST(9000, cam(3140, 1310, 1000), "Het tRNA: van klaverblad naar L", "tRNA: from cloverleaf to L",
      "Een tRNA, dat aminozuren aanbrengt, lijkt plat getekend op een klaverblad. In 3D vouwt het tot een L.",
      "A tRNA, which brings amino acids, looks like a cloverleaf when drawn flat. In 3D it folds into an L."),
    ST(9000, cam(2000, 2230, 1250), "RNA als enzym", "RNA as an enzyme",
      "Dit RNA knipt zichzelf door: het werkt als een enzym, een ribozym. Ook het ribosoom is een ribozym.",
      "This RNA cuts itself: it works like an enzyme, a ribozyme. The ribosome is a ribozyme too."),
  ],
  svg() {
    // ---- R2: lussen & juncties (statisch) ----
    let r2 = '';
    r2 += ladder(2700, 560, 0, 7);                                  // stam A
    r2 += `<path d="M${2700 + 6.5 * 22},${543} C${2880},${480} ${2930},${480} ${2960},${543} M${2700 + 6.5 * 22},${577} C${2880},${640} ${2930},${640} ${2960},${577}" stroke="${C.rna}" stroke-width="6" fill="none"/>`; // interne lus
    r2 += ladder(2962, 560, 0, 4) + `<path d="M${2962 + 3.5 * 22},${543} C${3065},${495} ${3090},${495} ${3100},${543}" stroke="${C.rna}" stroke-width="6" fill="none"/>` + ladder(3100, 560, 0, 4);   // bulge bovenaan
    const J = [3260, 560];
    r2 += `<circle cx="${J[0]}" cy="${J[1]}" r="62" fill="none" stroke="${C.rna}" stroke-width="6"/>`;
    r2 += ladder(J[0] + 30, J[1] - 55, -70, 7); const t1 = tip(J[0] + 30, J[1] - 55, -70, 7); r2 += loopC(t1[0] + 14, t1[1] - 34, 36);
    r2 += ladder(J[0] + 60, J[1] + 22, 20, 7); const t2 = tip(J[0] + 60, J[1] + 22, 20, 7); r2 += loopC(t2[0] + 34, t2[1] + 12, 36);
    r2 += note(2780, 520, T2('stam (helix)', 'stem (helix)'), C.text, 18) + note(2920, 680, T2('interne lus', 'internal loop'), '#ffd36b', 18) +
      note(3040, 470, 'bulge', '#ffd36b', 18) + note(3240, 670, T2('junctie (multilus)', 'junction (multiloop)'), '#ffd36b', 18) +
      note(t1[0] + 14, t1[1] - 84, T2('haarspeldlus', 'hairpin loop'), '#ffd36b', 18) + note(t2[0] + 34, t2[1] + 80, T2('haarspeldlus', 'hairpin loop'), '#ffd36b', 18);
    r2 += note(2640, 566, "5′", C.text, 18, 'end') + note(2640, 600, "3′", C.text, 18, 'end');

    // ---- R4: A-vorm vs B-vorm (zijaanzicht) ----
    const helix = (cx, y0, R, bpt, rise, n, tilt, minor, col, lab, sub1) => {
      let s = '', s1 = [], s2 = [];
      const steps = n * 6;
      for (let k = 0; k <= steps; k++) { const b = k / 6, th = 2 * Math.PI * b / bpt; s1.push([cx + R * Math.sin(th), y0 + b * rise - tilt]); s2.push([cx + R * Math.sin(th + minor), y0 + b * rise + tilt]); }
      for (let b = 0; b < n; b++) {
        const th = 2 * Math.PI * b / bpt, x1 = cx + R * Math.sin(th), x2 = cx + R * Math.sin(th + minor), y = y0 + b * rise;
        const depth = (Math.cos(th) + Math.cos(th + minor)) / 2;
        s += `<line x1="${f1(x1)}" y1="${f1(y - tilt)}" x2="${f1(x2)}" y2="${f1(y + tilt)}" stroke="#fff" stroke-width="3" opacity="${f1(.35 + .3 * (depth + 1) / 2)}"/>`;
      }
      const d = pts => pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('');
      s = `<path d="${d(s2)}" stroke="${col}" stroke-width="7" fill="none" opacity=".75"/>` + s + `<path d="${d(s1)}" stroke="${col}" stroke-width="7" fill="none"/>`;
      return s + note(cx, y0 - 40, lab, col, 22) + note(cx, y0 + n * rise + 44, sub1, C.muted, 17);
    };
    // schaal ≈ 7 px/Å: B: diameter 20 Å, stijging 3,4 Å; A: diameter ≈ 23 Å, stijging ≈ 2,6 Å, gekantelde basenparen
    const r4b = helix(1760, 1150, 70, 10.5, 24, 16, 0, 2.4, C.dna, 'B-DNA', T2('≈ 10,5 bp/winding · C2′-endo', '≈ 10.5 bp/turn · C2′-endo')),
      r4a = helix(2240, 1150, 82, 11, 18.2, 21, 12, 2.0, C.rna, T2('A-RNA (dsRNA)', 'A-RNA (dsRNA)'), T2('≈ 11 bp/winding · C3′-endo', '≈ 11 bp/turn · C3′-endo'));

    return svgOpen() + `
    <g id="rs-hp"></g><g id="rs-tar"></g><g id="rs-r2">${r2}</g><g id="rs-pk"></g><g><g data-node="dnavormen" data-color="${C.dna}" data-nolabel>${r4b}</g><g data-node="dnavormen" data-color="${C.rna}" data-nolabel>${r4a}</g></g><g data-node="trna" data-color="${C.trna}" data-nolabel><g id="rs-trna"></g></g><g id="rs-hh"></g><g id="rs-oth"></g><g data-node="ribosoom" data-color="${C.rrna}" data-nolabel><g id="rs-ribo"></g></g><g data-node="splicing" data-color="${C.prot}" data-nolabel><g id="rs-spl"></g></g>
    ${hot('nucleotide', T2('Nucleotide: ribose met 2′-OH', 'Nucleotide: ribose with 2′-OH'), C.rna, 'rs-nA')}
    ${hot('rt', T2('Pseudoknoop in 3D', 'Pseudoknot in 3D'), '#ffd36b', 'rs-pA', '../atlas/index.html?id=pseudoknot')}
    ${hot('dnavormen', T2('DNA-vormen A, B, Z', 'A-, B-, Z-DNA'), C.dna, 'rs-bA')}
    ${hot('baltimore', T2('dsRNA in 3D', 'dsRNA in 3D'), C.rna, 'rs-dA', '../atlas/index.html?id=dsrna')}
    ${hot('trna', 'tRNA', C.trna, 'rs-tA')}
    ${hot('codon', T2('tRNA in 3D (1EHZ)', 'tRNA in 3D (1EHZ)'), C.trna, 'rs-t2', '../atlas/index.html?id=trna')}
    ${hot('rnastructuur', T2('Hammerhead-ribozym in 3D', 'Hammerhead ribozyme in 3D'), '#ffd36b', 'rs-hA', '../atlas/index.html?id=hammerhead')}
    ${hot('ribosoom', T2('Ribosoom = ribozym', 'Ribosome = ribozyme'), C.rrna, 'rs-rA', '', true)}
    ${hot('splicing', T2('Spliceosoom (U2/U6)', 'Spliceosome (U2/U6)'), C.prot, 'rs-sA', '', true)}
    ${hot('riboswitch', T2('Kruispunt als schakelaar (3D)', 'Junction as a switch (3D)'), '#ffd36b', 'rs-wA')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);

    /* ---------- R0: haarspeld ---------- */
    const SZ = 44, SP = 62;
    const unf = i => [800 + (i - 7.5) * SP, 450];
    const fol = i => {
      if (i <= 5) return [490 + i * SP, 395];
      if (i >= 10) return [490 + (15 - i) * SP, 505];
      const a = [-66, -22, 22, 66][i - 6] * Math.PI / 180;
      return [490 + 5 * SP + 58 + 62 * Math.cos(a), 450 + 62 * Math.sin(a)];
    };
    function drawHP(step, p, t) {
      const f = step === 0 ? 0 : step === 1 ? ease(sub(p, .1, .7)) : 1;
      const P = HP.split('').map((b, i) => { const u = unf(i), v = fol(i); return [lerp(u[0], v[0], f), lerp(u[1], v[1], f)]; });
      let s = `<path d="${P.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linejoin="round"/>`;
      if (f > .9) for (const [a, b] of HPAIR) {
        const wob = HP[a] === 'G' && HP[b] === 'U' || HP[a] === 'U' && HP[b] === 'G';
        const hl = step === 2 && wob;
        s += hb(P[a][0] + (wob ? 8 : 0), P[a][1] + SZ / 2, P[b][0] - (wob ? 8 : 0), P[b][1] - SZ / 2, npairs(HP[a], HP[b]), (f - .9) * 10 * (step === 2 && !wob ? .45 : 1), hl ? '#ffd36b' : '#fff');
      }
      HP.split('').forEach((b, i) => { s += ntBox(P[i][0], P[i][1], b, SZ); });
      s += note(P[0][0] - 36, P[0][1] + 8, "5′", C.text, 20, 'end') + (f < .5 ? note(P[15][0] + 36, P[15][1] + 8, "3′", C.text, 20, 'start') : note(P[15][0] - 36, P[15][1] + 8, "3′", C.text, 20, 'end'));
      if (step === 0) {
        const k = sub(p, .2, .45);
        [2, 7, 12].forEach(i => { s += `<line x1="${P[i][0]}" y1="${P[i][1] + 24}" x2="${P[i][0]}" y2="${P[i][1] + 52}" stroke="#ffd36b" stroke-width="2.5" opacity="${f1(k)}"/>` + note(P[i][0], P[i][1] + 74, "2′-OH", '#ffd36b', 17, 'middle', k); });
        s += note(800, 600, T2('ribose (2′-OH) · uracil i.p.v. thymine', 'ribose (2′-OH) · uracil instead of thymine'), C.muted, 20, 'middle', sub(p, .45, .65));
        s += `<g opacity="${f1(sub(p, .6, .8))}">` + arrow(340, 330, 1260, 330, C.muted, 3) + `</g>` + note(800, 318, "5′ → 3′", C.muted, 18, 'middle', sub(p, .6, .8));
      }
      if (step >= 1 && f > .95) {
        s += note(490 + 2.5 * SP, 360, T2('stam (antiparallel)', 'stem (antiparallel)'), C.text, 18, 'middle', step === 1 ? sub(p, .7, .85) : 1);
        s += note(490 + 5 * SP + 58 + 120, 452, T2('lus', 'loop'), C.text, 18, 'start', step === 1 ? sub(p, .7, .85) : 1);
        s += note(490 + 5 * SP + 58 + 120, 480, 'UUCG', '#ffd36b', 16, 'start', step === 1 ? sub(p, .75, .9) : 1);
      }
      if (step === 2) {
        const k = sub(p, .1, .3), x = 490 + 4 * SP;
        s += `<rect x="${x - 34}" y="${365}" width="68" height="170" rx="12" fill="none" stroke="#ffd36b" stroke-width="3" opacity="${f1(k)}"/>`;
        s += note(x, 578, T2('G·U: 2 H-bruggen', 'G·U: 2 H-bonds'), '#ffd36b', 19, 'middle', k);
        s += note(490 + 1 * SP, 578, T2('G–C: 3', 'G–C: 3'), C.text, 17, 'middle', sub(p, .35, .5)) + note(490 + 2.5 * SP, 612, T2('A–U: 2', 'A–U: 2'), C.text, 17, 'middle', sub(p, .45, .6));
      }
      return s;
    }

    /* ---------- R1: TAR ---------- */
    const TS = 54, TX0 = 1560, TY1 = 400, TY2 = 500;
    const topX = n => n <= 22 ? TX0 + (n - 17) * TS : TX0 + (n - 20) * TS + 70;
    function tarPos() {
      const pos = {};
      for (let n = 17; n <= 22; n++) pos[n] = [topX(n), TY1];
      for (let n = 26; n <= 29; n++) pos[n] = [topX(n), TY1];
      pos[23] = [topX(22) + 26, TY1 - 70]; pos[24] = [topX(22) + 66, TY1 - 100]; pos[25] = [topX(26) - 26, TY1 - 70];
      const lc = [topX(29) + 60, (TY1 + TY2) / 2];
      [-78, -46, -15, 15, 46, 78].forEach((a, j) => { const r = a * Math.PI / 180; pos[30 + j] = [lc[0] + 66 * Math.cos(r), lc[1] + 66 * Math.sin(r)]; });
      for (const [a, b] of TPAIR) pos[b] = [pos[a][0], TY2];
      return pos;
    }
    const TP = tarPos();
    function drawTAR(step, p) {
      const k = step === 3 ? 1 : 0;
      if (!k) return '';
      let s = '';
      const seq = []; for (let n = 17; n <= 45; n++) seq.push(TP[n]);
      s += `<path d="${seq.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linejoin="round"/>`;
      for (const [a, b] of TPAIR) s += hb(TP[a][0], TY1 + 20, TP[b][0], TY2 - 20, npairs(tarB(a), tarB(b)), .85);
      for (let n = 17; n <= 45; n++) {
        const bulge = n >= 23 && n <= 25;
        s += ntBox(TP[n][0], TP[n][1], tarB(n), 38);
        if (bulge) s += `<circle cx="${TP[n][0]}" cy="${TP[n][1]}" r="25" fill="none" stroke="#ffd36b" stroke-width="3" opacity="${f1(sub(p, .25, .4))}"/>`;
      }
      s += note(TX0 - 34, TY1 + 8, "5′", C.text, 20, 'end') + note(TX0 - 34, TY2 + 8, "3′", C.text, 20, 'end');
      [17, 22, 26, 29].forEach(n => { s += note(TP[n][0], TY1 - 30, n, C.muted, 13); });
      s += note(TP[23][0] - 40, TP[23][1] - 30, T2('bulge (U23 C24 U25)', 'bulge (U23 C24 U25)'), '#ffd36b', 19, 'end', sub(p, .25, .4));
      s += note(TP[32][0] + 50, TP[32][1] + 8, T2('lus', 'loop'), C.muted, 17, 'start');
      const tk = ease(sub(p, .5, .75));
      s += `<g opacity="${f1(tk)}"><path d="${eiwitPad(TP[24][0] + 60, TY1 - 200, 80, 40, 24, .08)}" fill="rgba(240,107,192,.25)" stroke="${C.tdna}" stroke-width="3"/>` +
        `<text x="${TP[24][0] + 60}" y="${TY1 - 194}" font-size="20" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="800">Tat</text>` +
        `<line x1="${TP[24][0] + 40}" y1="${TY1 - 162}" x2="${TP[24][0] + 10}" y2="${TY1 - 124}" stroke="${C.tdna}" stroke-width="3"/></g>`;
      s += note(2000, 640, T2('HIV-1 TAR (nt 17–45) · echte structuur: PDB 1ANR', 'HIV-1 TAR (nt 17–45) · real structure: PDB 1ANR'), C.muted, 18, 'middle', sub(p, .1, .25));
      return s;
    }

    /* ---------- R3: pseudoknoop als boogdiagram ---------- */
    function drawPK(step, p) {
      if (step !== 5) return '';
      const y = 1450, x0 = 330, n = 30, sp = 31;
      const X = i => x0 + i * sp;
      // stam 1: 1–5 met 12–16 ; stam 2 (pseudoknoop): 8–10 met 20–22
      const S1 = [[1, 16], [2, 15], [3, 14], [4, 13], [5, 12]], S2 = [[8, 22], [9, 21], [10, 20]];
      let s = `<line x1="${X(0) - 20}" y1="${y}" x2="${X(n - 1) + 20}" y2="${y}" stroke="${C.rna}" stroke-width="6"/>`;
      for (let i = 0; i < n; i++) s += `<circle cx="${X(i)}" cy="${y}" r="7" fill="${C.rna}"/>`;
      const arc = (a, b, col, op) => { const r = (X(b) - X(a)) / 2; return `<path d="M${X(a)},${y - 8} A${f1(r)},${f1(r * .85)} 0 0 1 ${X(b)},${y - 8}" stroke="${col}" stroke-width="3.5" fill="none" opacity="${f1(op)}"/>`; };
      const k1 = ease(sub(p, .05, .3)), k2 = ease(sub(p, .4, .65));
      S1.forEach(([a, b]) => s += arc(a, b, C.dna2, k1));
      S2.forEach(([a, b]) => s += arc(a, b, '#ffd36b', k2));
      s += note(X(8.5), y + 44, T2('stam 1 (genest)', 'stem 1 (nested)'), C.dna2, 18, 'middle', k1);
      s += note(X(21), y + 44, T2('stam 2 kruist stam 1', 'stem 2 crosses stem 1'), '#ffd36b', 18, 'middle', k2);
      s += note(X(0) - 30, y + 6, "5′", C.text, 20, 'end') + note(X(n - 1) + 30, y + 6, "3′", C.text, 20, 'start');
      s += note(800, 1560, T2('Kruisende bogen = pseudoknoop: niet te voorspellen met klassieke (geneste) algoritmen', 'Crossing arcs = pseudoknot: not predictable with classic (nested) algorithms'), C.muted, 17, 'middle', sub(p, .7, .85));
      s += note(800, 1600, T2('voorbeeld: frameshift-pseudoknoop van MMTV (PDB 1RNK)', 'example: MMTV frameshift pseudoknot (PDB 1RNK)'), C.muted, 16, 'middle', sub(p, .75, .9));
      return s;
    }

    /* ---------- R5: tRNA klaverblad → L ---------- */
    // armen: [basis x, y, hoek, n bp] in klaverblad (K) en L-vorm (Lv)
    const CX = 3180, CY = 1310;
    const ARMS = {
      acc: { K: [CX, CY - 34, -90, 7], Lv: [CX - 30, CY - 170, 0, 7], col: C.trna, nl: 'acceptorstam', en: 'acceptor stem' },
      D:   { K: [CX - 40, CY, 180, 4], Lv: [CX - 210, CY - 30, 270, 4], col: '#e8a93a', nl: 'D-arm', en: 'D arm' },
      ac:  { K: [CX, CY + 34, 90, 5], Lv: [CX - 210, CY + 4, 90, 5], col: '#e8a93a', nl: 'anticodonarm', en: 'anticodon arm' },
      T:   { K: [CX + 40, CY, 0, 5], Lv: [CX - 40, CY - 170, -180, 5], col: C.trna, nl: 'TΨC-arm', en: 'TΨC arm' },
    };
    function drawTRNA(step, p) {
      if (step !== 7) return '';
      const m = ease(sub(p, .4, .8));
      let s = '';
      const pts = {};
      for (const [key, A] of Object.entries(ARMS)) {
        const x = lerp(A.K[0], A.Lv[0], m), y = lerp(A.K[1], A.Lv[1], m);
        const ang = lerp(A.K[2], A.Lv[2], m);
        s += ladder(x, y, ang, A.K[3], A.col, 34, 22);
        const tp = tip(x, y, ang, A.K[3]);
        const r = ang * Math.PI / 180;
        pts[key] = { base: [x, y], tip: tp, ang: r };
        if (key !== 'acc') s += loopC(tp[0] + Math.cos(r) * 30, tp[1] + Math.sin(r) * 30, 30, A.col);
      }
      // L-vorm: de D-arm en de anticodonarm liggen in één doorlopende staaf; de twee strengen lopen ononderbroken door
      if (m > .01) { const bx = CX - 210, y0 = CY - 30, y1 = CY + 4;
        s += `<g opacity="${f1(m)}">` + [-17, 17].map(dx => `<line x1="${bx + dx}" y1="${y0}" x2="${bx + dx}" y2="${y1}" stroke="#e8a93a" stroke-width="6" stroke-linecap="round"/>`).join('') + '</g>'; }
      // junctie (backbone-verbinding)
      s += `<circle cx="${CX}" cy="${CY}" r="40" fill="none" stroke="${C.trna}" stroke-width="4" stroke-dasharray="6 6" opacity="${f1(.6 * (1 - m))}"/>`;
      // CCA-uiteinde en anticodon
      const at = pts.acc.tip, ar = pts.acc.ang;
      s += `<line x1="${f1(at[0])}" y1="${f1(at[1])}" x2="${f1(at[0] + Math.cos(ar) * 50)}" y2="${f1(at[1] + Math.sin(ar) * 50)}" stroke="${C.trna}" stroke-width="5"/>`;
      s += note(at[0] + Math.cos(ar) * 70 + (m > .5 ? 20 : 0), at[1] + Math.sin(ar) * 70 + 6, "CCA-3′", '#ffd36b', 18, m > .5 ? 'start' : 'middle');
      const ac = pts.ac.tip, acr = pts.ac.ang, lc = [ac[0] + Math.cos(acr) * 30, ac[1] + Math.sin(acr) * 30];
      s += note(lc[0], lc[1] + 60, T2('anticodon', 'anticodon'), '#ffd36b', 18);
      // labels
      const lab = (key, dx, dy, anchor = 'middle') => { const b = pts[key].base, tp = pts[key].tip; return note((b[0] + tp[0]) / 2 + dx, (b[1] + tp[1]) / 2 + dy, T2(ARMS[key].nl, ARMS[key].en), C.text, 16, anchor); };
      if (m < .05) s += lab('acc', 34, 0, 'start') + lab('D', 0, -32) + lab('ac', 34, 0, 'start') + lab('T', 0, -32);
      if (m > .95) {
        s += lab('acc', 0, -32) + lab('T', 10, -32) + lab('D', -34, 6, 'end') + lab('ac', -34, 6, 'end');
        const A = [at[0] + 50, at[1]], B = [lc[0], lc[1] + 30];
        s += `<line x1="${f1(A[0])}" y1="${f1(A[1] + 20)}" x2="${f1(B[0] + 30)}" y2="${f1(B[1])}" stroke="#ffd36b" stroke-width="2.5" stroke-dasharray="6 5"/>` + note((A[0] + B[0]) / 2 + 60, (A[1] + B[1]) / 2 + 20, '≈ 75 Å', '#ffd36b', 22, 'start');
        s += note(CX - 250, CY - 230, T2('elleboog: D- en T-lus raken elkaar', 'elbow: D and T loops meet'), C.muted, 16, 'end', sub(p, .85, .95));
      }
      s += note(CX, CY + 300, m < .5 ? T2('2D: klaverblad', '2D: cloverleaf') : T2('3D: L-vorm (PDB 1EHZ)', '3D: L shape (PDB 1EHZ)'), C.muted, 20);
      return s;
    }

    /* ---------- R6: hammerhead + andere ribozymen ---------- */
    function drawHH(step, p) {
      if (step !== 8) return '';
      const c = [1660, 2230];
      let s = '';
      s += `<circle cx="${c[0]}" cy="${c[1]}" r="46" fill="rgba(255,211,107,.12)" stroke="#ffd36b" stroke-width="3" stroke-dasharray="5 4"/>`;
      s += note(c[0], c[1] + 7, T2('kern', 'core'), '#ffd36b', 19);
      s += ladder(c[0] - 40, c[1] + 26, 150, 6); const tI = tip(c[0] - 40, c[1] + 26, 150, 6);
      s += ladder(c[0], c[1] - 46, -90, 5); const tII = tip(c[0], c[1] - 46, -90, 5); s += loopC(tII[0], tII[1] - 30, 30);
      s += ladder(c[0] + 40, c[1] + 26, 30, 6); const tIII = tip(c[0] + 40, c[1] + 26, 30, 6); s += loopC(tIII[0] + 26, tIII[1] + 15, 30);
      s += note(tI[0] - 30, tI[1] + 10, 'I', C.text, 22, 'end') + note(tII[0] + 44, tII[1] - 20, 'II', C.text, 22, 'start') + note(tIII[0] + 70, tIII[1] + 20, 'III', C.text, 22, 'start');
      const cs = [c[0] + 52, c[1] + 48];
      s += snip(cs[0], cs[1], sub(p, .2, .3) * (1 - sub(p, .45, .55)));
      s += `<circle cx="${cs[0]}" cy="${cs[1]}" r="16" fill="none" stroke="${C.danger}" stroke-width="3" opacity="${f1(sub(p, .1, .2))}"/>`;
      s += note(c[0], c[1] + 170, T2("2′-OH → 2′,3′-cyclisch fosfaat + 5′-OH", "2′-OH → 2′,3′-cyclic phosphate + 5′-OH"), '#ffd36b', 20, 'middle', sub(p, .3, .45));
      s += note(c[0], c[1] - 250, T2('hammerhead-ribozym (PDB 2OEU)', 'hammerhead ribozyme (PDB 2OEU)'), C.text, 21);
      return s;
    }
    function drawOthers(step, p) {
      if (step !== 8) return ['', '', ''];
      const k = sub(p, .5, .7);
      const box = (y, t1, col, op) => `<g opacity="${f1(op)}"><rect x="2060" y="${y - 28}" width="540" height="56" rx="14" fill="rgba(13,20,38,.9)" stroke="${col}" stroke-width="2.5"/>` +
        note(2080, y + 7, t1, col, 20, 'start') + '</g>';
      const a = box(2000, T2('groep I/II-intronen: zelfsplicing', 'group I/II introns: self-splicing'), '#ffd36b', k) +
        box(2080, T2("RNase P: knipt 5′-leader van pre-tRNA", "RNase P: cuts 5′ leader off pre-tRNA"), '#ffd36b', sub(p, .58, .75));
      const b = box(2160, T2('ribosoom: rRNA vormt peptidebinding', 'ribosome: rRNA forms peptide bond'), C.rrna, sub(p, .66, .82));
      const c = box(2320, T2('spliceosoom: U2/U6-snRNA katalyseert', 'spliceosome: U2/U6 snRNA catalyses'), C.prot, sub(p, .74, .9));
      return [a, b, c];
    }

    return {
      update(t, s) {
        const { step, p } = s;
        $('rs-hp').innerHTML = step <= 2 ? drawHP(step, p, t) : '';
        setHot(svg, 'rs-nA', step === 0 && p > .3 ? [unf(7)[0], 450, 44, 44] : null);
        $('rs-tar').innerHTML = drawTAR(step, p);
        $('rs-r2').setAttribute('opacity', step === 4 ? f1(.55 + .45 * ease(sub(p, 0, .1))) : '0');   // meteen zichtbaar (geen zwart beeld)
        setHot(svg, 'rs-wA', step === 4 && p > .4 ? [3260, 560, 40, 40] : null);   // zijpad RNA-lot: kruispunt → riboswitch
        $('rs-pk').innerHTML = drawPK(step, p);
        setHot(svg, 'rs-pA', step === 5 && p > .5 ? [1090, 1400, 40, 20] : null);
        setHot(svg, 'rs-bA', step === 6 ? [1760, 1075, 60, 10] : null); setHot(svg, 'rs-dA', step === 6 ? [2240, 1075, 60, 10] : null);
        $('rs-trna').innerHTML = drawTRNA(step, p);
        setHot(svg, 'rs-tA', step === 7 && p > .85 ? [CX + 190, CY - 200, 40, 20] : null);
        setHot(svg, 'rs-t2', step === 7 && p > .85 ? [CX + 120, CY + 150, 20, 20] : null);
        $('rs-hh').innerHTML = drawHH(step, p);
        setHot(svg, 'rs-hA', step === 8 ? [1500, 2120, 30, 30] : null);
        const [oth, ot, sp] = drawOthers(step, p);
        $('rs-oth').innerHTML = oth; $('rs-ribo').innerHTML = ot; $('rs-spl').innerHTML = sp;
        setHot(svg, 'rs-rA', step === 8 && p > .72 ? [2470, 2160, 200, 60] : null); setHot(svg, 'rs-sA', step === 8 && p > .85 ? [2470, 2320, 200, 60] : null);
      },
    };
  },
};
