/* Vaktaal-laag, niveau hoger onderwijs — labels die een scène tijdens het afspelen opbouwt met een getal erin
 * (teller, lengte, nummer). Die vallen buiten de vaste labelvervanging (sleutel = exacte tekst), dus hier per animatie een
 * patroon: [animatie-id, reguliere expressie op de volledige labeltekst, vervanging met $1 … voor de getallen].
 * Labels die al vaktaal zijn (waterstofbruggen, residuen, zoutbruggen, φ/ψ, Å) staan hier niet. */
const N = '([0-9]+)';
const rx = s => new RegExp('^' + s + '$');
export const patterns = {
  nl: [
    ['promoter', rx(`RNA: ${N} bouwstenen`), 'transcript: $1 nt'],
    ['mrnaafbraak', rx(`staart: ${N} A’s`), 'poly(A)-staart: $1 nt'],
    ['supercoiling', rx(`de strengen gaan ${N} keer rond elkaar`), 'linkinggetal Lk = $1'],
    ['codon', rx(`raam ${N}`), 'leesraam +$1'],
    ['telomeren', rx(`deling ${N}`), 'replicatieronde $1'],
    ['dnamethyl', rx(`${N} CpG-plaatsen in dit stukje`), '$1 CpG-dinucleotiden in dit fragment'],
  ],
  en: [
    ['promoter', rx(`RNA: ${N} building blocks`), 'transcript: $1 nt'],
    ['mrnaafbraak', rx(`tail: ${N} A’s`), 'poly(A) tail: $1 nt'],
    ['supercoiling', rx(`the strands wind ${N} times round each other`), 'linking number Lk = $1'],
    ['codon', rx(`frame ${N}`), 'reading frame +$1'],
    ['telomeren', rx(`division ${N}`), 'replication round $1'],
    ['dnamethyl', rx(`${N} CpG sites in this stretch`), '$1 CpG dinucleotides in this fragment'],
  ],
};
export default {
  labels: {
    nl: { 'ribosoom|≈ 80 eiwitten': '≈ 80 ribosomale eiwitten', 'codon|AUG → raam 1 is het juiste': 'AUG → leesraam +1 is het juiste' },
    en: { 'ribosoom|≈ 80 proteins': '≈ 80 ribosomal proteins', 'codon|AUG → frame 1 is the correct one': 'AUG → reading frame +1 is the correct one' },
  },
};
