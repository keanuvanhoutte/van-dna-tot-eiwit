/*
 * Ribosoom — het humane 80S-ribosoom in pseudo-3D uit echte coördinaten (PDB 6Y0G, grofkorrelig: zie _ribo80s.js).
 * Elke positie = één nucleotide (P-atoom) of aminozuur (Cα) (steekproef), getekend als dikke bol → samen één gesloten vorm per helft.
 * Draaien en uit elkaar schuiven gebeurt in update(t, s).
 * Tekenen: in de app een <canvas> onder de SVG (bollen als voorgetekende, belichte sprites, van achter naar voor: vlot, ook bij
 * 60 beelden/s); in de testhulpmiddelen (init zonder api.node) dezelfde bollen als SVG-paden, zodat die de figuur blijven zien.
 */
import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, f1, TRNA_SITE } from '../../kit.js';
import { RIBO, LM } from './_ribo80s.js';
import { hud, placeHud, stepVal, hex2rgb, rgb, mix, textBox } from './_tlkit.js';

const CATS = ['r18', 'p40', 'r28', 'r58', 'r5', 'p60'];
const SUB40 = new Set(['r18', 'p40']);
const BG = hex2rgb('#0b1224');
const PAL = {
  sub: { r18: '#8df0dc', p40: '#8df0dc', r28: '#23a88f', r58: '#23a88f', r5: '#23a88f', p60: '#23a88f' },
  rp: { r18: C.rrna, r28: C.rrna, r58: C.rrna, r5: C.rrna, p40: C.prot, p60: C.prot },
  s40: { r18: C.rrna, p40: C.prot, r28: '#1d3a44', r58: '#1d3a44', r5: '#1d3a44', p60: '#262a4a' },
  s60: { r18: '#1d3a44', p40: '#262a4a', r28: C.rrna, r58: '#7cc4ff', r5: '#c3f06b', p60: C.prot },
  ptc: { r18: '#1d3a44', p40: '#262a4a', r28: C.rrna, r58: C.rrna, r5: C.rrna, p60: '#3a3170' },
};
const NB = 6;                       // diepte-lagen
const TR_R = 4.6;                   // balstraal tRNA (Å): kleiner dan het ribosoom, zodat de L-vorm leesbaar blijft
const S0 = 2.2;                     // px per Å
// per stap: hoek (rad), kanteling, afstand tussen subeenheden (Å), palet, dekking ribosoom, tRNA-dekking, [cx, cy, schaal]
const K = {
  ang: [-.5, -.5, .35, .2, .2, .25, .3, .86, -.5],
  tilt: [.18, .18, .18, .2, .2, .12, .12, .15, .18],
  sep: [0, 50, 0, 55, 55, 0, 0, 0, 0],
  pal: ['sub', 'sub', 'rp', 's40', 's60', 'sub', 'ptc', 'sub', 'sub'],
  op: [1, 1, 1, 1, 1, .2, .45, .3, 1],
  trna: [0, 0, 0, 0, 0, 1, 1, .8, 0],
  mrna: [0, 0, 0, 1, 0, 1, 1, .8, 0],  // stap 4 (de kleine helft houdt het mRNA vast): mRNA zichtbaar, nog zonder tRNA's
  pop: [1, 1, 1, .5, .5, 1, .6, 1, 1],
  pos: [[620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [340, 470, .72]],
};
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/*
 * Lichaam van het ribosoom: ≈ 4750 bollen.
 * Live: WebGL2-canvas onder de SVG; elke bol is één punt (gl.POINTS) dat de fragment-shader als belichte bol tekent, met echte
 * diepte (gl_FragDepth), en een donkere rand die alleen bij dieptesprongen zichtbaar is (handboekstijl). Eén tekenopdracht
 * per pas: vlot, ook bij 60 beelden/s.
 * Zonder api.node (testhulpmiddelen) of zonder WebGL2: dezelfde bollen als dikke ronde SVG-paden (trager, maar overal zichtbaar).
 */
function bodyRenderer(svg, live) {
  const $ = id => svg.getElementById(id);
  const hit = $('rb-hit');
  const hitBox = (x0, y0, x1, y1, R) => {
    hit.setAttribute('x', f1(x0 - R)); hit.setAttribute('y', f1(y0 - R));
    hit.setAttribute('width', f1(x1 - x0 + 2 * R)); hit.setAttribute('height', f1(y1 - y0 + 2 * R));
  };
  if (live) { const g = glRenderer(svg, hitBox); if (g) return g; }
  const paths = {}; for (const c of CATS) for (let b = 0; b < NB; b++) paths[c + b] = $(`rb-${c}-${b}`);
  return {
    draw(P, proj, sep, col, alpha, R, op) {
      const d = {}, ol = { 40: '', 60: '' }; for (const c of CATS) for (let b = 0; b < NB; b++) d[c + b] = '';
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const c of CATS) {
        const dy = SUB40.has(c) ? -sep : sep, ok = SUB40.has(c) ? 40 : 60;
        for (const p of P[c]) {
          const [X, Y, Z] = proj(p, dy);
          const b = Math.max(0, Math.min(NB - 1, Math.floor((Z + 150) / 300 * NB)));
          const m = `M${X.toFixed(0)},${Y.toFixed(0)}h0`;
          if (alpha[c] > .02) ol[ok] += m;
          d[c + b] += m;
          x0 = Math.min(x0, X); x1 = Math.max(x1, X); y0 = Math.min(y0, Y); y1 = Math.max(y1, Y);
        }
      }
      for (const k of [40, 60]) { const el = $('rb-o' + k); el.setAttribute('d', ol[k]); el.setAttribute('stroke', '#04070f'); el.setAttribute('stroke-width', f1(2 * R + 7)); }
      for (const c of CATS) for (let b = 0; b < NB; b++) {
        const el = paths[c + b], shade = .32 - .32 * b / (NB - 1);
        el.setAttribute('d', alpha[c] > .02 ? d[c + b] : '');
        el.setAttribute('stroke', rgb(mix(col[c], BG, shade)));
        el.setAttribute('stroke-width', f1(2 * R * (c[0] === 'p' ? .92 : 1)));
        el.setAttribute('stroke-opacity', f1(alpha[c]));
      }
      hitBox(x0, y0, x1, y1, R);
      $('rb-body').setAttribute('opacity', f1(op));
    },
    destroy() {},
  };
}

const VS = `#version 300 es
in vec4 aP;                        // x, y (SVG-eenheden), z (Å, groter = dichterbij), soort
uniform vec4 uMap;                 // gx, gy, f (SVG → apparaatpixels), 0
uniform vec2 uRes;
uniform float uRad[6];             // straal per soort (apparaatpixels)
uniform float uPad;                // extra straal (rand)
uniform float uPush;               // diepte naar achteren (rand)
out float vZ; flat out int vK; out float vR;
void main() {
  vec2 px = uMap.xy + aP.xy * uMap.z;
  int k = int(aP.w + .5);
  float r = uRad[k] + uPad;
  gl_Position = vec4(px.x / uRes.x * 2. - 1., 1. - px.y / uRes.y * 2., clamp((-aP.z + uPush) / 400., -1., 1.), 1.);
  gl_PointSize = 2. * r;
  vZ = aP.z; vK = k; vR = r;
}`;
const FS = `#version 300 es
precision highp float;
in float vZ; flat in int vK; in float vR;
uniform vec3 uCol[6]; uniform float uAlpha[6]; uniform vec3 uBg; uniform int uMode;   // 0 = bol, 1 = rand
uniform float uRadA;               // balstraal in Å (voor de diepte van het boloppervlak)
out vec4 o;
void main() {
  vec2 d = gl_PointCoord * 2. - 1.;
  float r2 = dot(d, d);
  if (r2 > 1.) discard;
  float a = uAlpha[vK];
  if (uMode == 1) { o = vec4(vec3(.016, .027, .059) * a, a); gl_FragDepth = gl_FragCoord.z; return; }
  float h = sqrt(1. - r2);
  vec3 n = vec3(d.x, -d.y, h);
  float lit = .42 + .58 * max(dot(n, normalize(vec3(-.45, .55, .7))), 0.);
  float spec = pow(max(dot(n, normalize(vec3(-.2, .3, 1.))), 0.), 24.) * .18;
  float shade = .34 - .34 * clamp((vZ + 150.) / 300., 0., 1.);       // verder weg → naar de achtergrond toe
  vec3 c = mix(uCol[vK] * lit + spec, uBg, shade);
  o = vec4(c * a, a);
  gl_FragDepth = gl_FragCoord.z - h * uRadA / 800.;
}`;
/* cats = soorten in deze laag (elk een lijst bollen in RIBO); radA = balstraal in Å (diepte van het boloppervlak).
 * Elke laag is een eigen canvas onder de SVG; een latere laag ligt boven een eerdere (tRNA's boven het ribosoom). */
function glRenderer(svg, hitBox, cats = CATS, { radA = 9 } = {}) {
  const CATS = cats;
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  const gl = cv.getContext('webgl2', { premultipliedAlpha: true, antialias: true, alpha: true });
  if (!gl) return null;
  const sh = (type, src) => { const x = gl.createShader(type); gl.shaderSource(x, src); gl.compileShader(x); if (!gl.getShaderParameter(x, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(x)); return x; };
  let prog;
  try {
    prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { console.warn('[ribosoom] WebGL:', e.message); return null; }
  svg.parentNode.insertBefore(cv, svg);
  /* De engine zet de camera (viewBox) ná update(); staat het beeld stil terwijl de camera nog beweegt, dan wordt update() niet
     opnieuw opgeroepen. Daarom tekent deze laag zichzelf opnieuw met de laatste gegevens zodra de viewBox verandert. */
  let last = null;
  const mo = new MutationObserver(() => { if (last) api.draw(...last); });
  mo.observe(svg, { attributes: true, attributeFilter: ['viewBox'] });
  const U = n => gl.getUniformLocation(prog, n);
  const u = { map: U('uMap'), res: U('uRes'), rad: U('uRad'), pad: U('uPad'), push: U('uPush'), col: U('uCol'), alpha: U('uAlpha'), bg: U('uBg'), mode: U('uMode'), radA: U('uRadA') };
  let N = 0; for (const c of CATS) N += RIBO[c].length / 3;
  const data = new Float32Array(N * 4), buf = gl.createBuffer();
  const ord = new Uint16Array(N), Zs = new Float32Array(N);
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  const loc = gl.getAttribLocation(prog, 'aP');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 16, 0);
  gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const api = {
    draw(P, proj, sep, col, alpha, R, op) {
      last = [P, proj, sep, col, alpha, R, op];
      const W = cv.clientWidth, H = cv.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      if (!W || !H) return;
      if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
      // SVG-gebruikerscoördinaten → apparaatpixels (viewBox met 'xMidYMid meet', zoals de SVG zelf)
      const vb = svg.viewBox.baseVal, sw = svg.clientWidth || W, sh = svg.clientHeight || H;
      const k = Math.min(sw / vb.width, sh / vb.height), ox = (sw - vb.width * k) / 2 - vb.x * k, oy = (sh - vb.height * k) / 2 - vb.y * k;
      const f = k * dpr;
      // punten: ondoorschijnende soorten eerst, daarna de doorschijnende (van achter naar voor)
      let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      const solid = [], see = [];
      CATS.forEach((c, ci) => { if (alpha[c] >= .99) solid.push(ci); else if (alpha[c] > .02) see.push(ci); });
      const put = (ci, list) => {
        const c = CATS[ci], dy = SUB40.has(c) ? -sep : sep;
        for (const p of P[c]) {
          const q = proj(p, dy);
          list.push(n); Zs[n] = q[2];
          data[4 * n] = q[0]; data[4 * n + 1] = q[1]; data[4 * n + 2] = q[2]; data[4 * n + 3] = ci; n++;
          if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; if (q[1] < y0) y0 = q[1]; if (q[1] > y1) y1 = q[1];
        }
      };
      const iS = [], iT = [];
      for (const ci of solid) put(ci, iS);
      for (const ci of see) put(ci, iT);
      iT.sort((a, b) => Zs[a] - Zs[b]);
      const out = new Float32Array(n * 4); let m = 0;
      for (const j of iS.concat(iT)) { out.set(data.subarray(4 * j, 4 * j + 4), 4 * m); m++; }
      gl.viewport(0, 0, cv.width, cv.height);
      gl.clearColor(0, 0, 0, 0); gl.clearDepth(1); gl.depthMask(true);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bufferData(gl.ARRAY_BUFFER, out, gl.STREAM_DRAW);
      gl.uniform4f(u.map, ox * dpr, oy * dpr, f, 0);
      gl.uniform2f(u.res, cv.width, cv.height);
      const rpx = R * f;
      gl.uniform1fv(u.rad, CATS.map(c => rpx * (c[0] === 'p' ? .92 : 1)));
      gl.uniform3fv(u.col, CATS.flatMap(c => col[c].map(v => v / 255)));
      gl.uniform1fv(u.alpha, CATS.map(c => alpha[c]));
      gl.uniform3fv(u.bg, BG.map(v => v / 255));
      gl.uniform1f(u.radA, radA);
      const nS = iS.length, nT = iT.length;
      // 1) ondoorschijnende bollen, 2) hun rand (iets naar achteren: alleen zichtbaar waar de diepte verspringt)
      gl.uniform1i(u.mode, 0); gl.uniform1f(u.pad, 0); gl.uniform1f(u.push, 0);
      if (nS) gl.drawArrays(gl.POINTS, 0, nS);
      gl.uniform1i(u.mode, 1); gl.uniform1f(u.pad, 3.5 * f); gl.uniform1f(u.push, 9);
      if (nS) gl.drawArrays(gl.POINTS, 0, nS);
      // 3) vervagende soorten (eiwitten): doorschijnend, zonder in de diepte te schrijven
      if (nT) {
        gl.depthMask(false);
        gl.uniform1i(u.mode, 1); gl.uniform1f(u.pad, 3.5 * f); gl.uniform1f(u.push, 9);
        gl.drawArrays(gl.POINTS, nS, nT);
        gl.uniform1i(u.mode, 0); gl.uniform1f(u.pad, 0); gl.uniform1f(u.push, 0);
        gl.drawArrays(gl.POINTS, nS, nT);
        gl.depthMask(true);
      }
      cv.style.opacity = f1(op);
      hitBox(x0, y0, x1, y1, R);
    },
    destroy() { mo.disconnect(); try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch {} cv.remove(); },
  };
  return api;
}

export default {
  id: 'ribosoom',
  title: { nl: 'Ribosoom (80S)', en: 'Ribosome (80S)' },
  scale: { nl: '≈ 25–30 nm', en: '≈ 25–30 nm' },
  time: { nl: 'structuur (stilstaand beeld, langzaam gedraaid)', en: 'structure (static, slowly rotated)' },
  org: { nl: 'mens (vergelijking met bacterie)', en: 'human (compared with bacteria)' },
  legend: [[C.rrna, 'rRNA'], [C.prot, { nl: 'ribosomale eiwitten', en: 'ribosomal proteins' }], ['#8df0dc', '40S'], ['#23a88f', '60S'], [TRNA_SITE.P, { nl: 'tRNA (P-plaats)', en: 'tRNA (P site)' }], [TRNA_SITE.A, { nl: 'tRNA (A-plaats)', en: 'tRNA (A site)' }], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De vorm is getekend uit echte atoomposities in PDB 6Y0G (humaan 80S-ribosoom met tRNA in A- en P-plaats, cryo-EM 3,2 Å): één P-atoom per 2–3 nucleotiden en één Cα per 4 aminozuren, elk als dikke bol, zodat ze samen de buitenvorm van elke helft geven. Flexibele rRNA-uitsteeksels die niet gemodelleerd zijn, ontbreken.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The shape is drawn from real atom positions in PDB 6Y0G (human 80S ribosome with tRNA in the A and P sites, cryo-EM 3.2 Å): one P atom per 2–3 nucleotides and one Cα per 4 amino acids, each drawn as a thick ball so that together they give the outer shape of each half. Flexible rRNA expansion segments that were not modelled are missing.</p>' },
  simplified: {
    nl: 'Grofkorrelig model (steekproef van de atomen, als gesloten vorm getekend; geen echt berekend oppervlak). De E-plaats is in deze structuur leeg en wordt aangeduid met een label. De afstand tot de tunneluitgang is gemeten in dit model (≈ 90 Å; literatuur: ≈ 80–100 Å). Massa\'s en S-waarden zijn afgerond.',
    en: 'Coarse-grained model (a sample of the atoms, drawn as a closed shape; not a true computed surface). The E site is empty in this structure and is marked with a label. The distance to the tunnel exit was measured in this model (≈ 90 Å; literature: ≈ 80–100 Å). Masses and S values are rounded.' },
  parts: [
    { c: C.rrna, t: { nl: 'Humaan 80S', en: 'Human 80S' }, m: ["4 rRNA's + ≈ 80 eiwitten", '4 rRNAs + ≈ 80 proteins', 'vorm uit PDB 6Y0G', 'shape from PDB 6Y0G', 'ribosoom', 'ribosome'], d: { nl: 'Het ribosoom van de mens: de eiwitfabriek van de cel, uit vier RNA’s en zo’n 80 eiwitten. De vorm komt uit een echte, gemeten 3D-structuur.', en: 'The human ribosome: the cell’s protein factory, made of four RNAs and about 80 proteins. The shape comes from a real, measured 3D structure.' },
      p: { nl: 'Humaan cytoplasmatisch 80S-ribosoom (≈ 4,3 MDa); grofkorrelig model uit cryo-EM-structuur 6Y0G.', en: 'Human cytoplasmic 80S ribosome (≈ 4.3 MDa); coarse-grained model from cryo-EM structure 6Y0G.' } },
    { c: '#23a88f', t: '60S', m: ['grote subeenheid', 'large subunit'], d: { nl: 'De grote helft van het ribosoom. Ze koppelt de aminozuren aan elkaar.', en: 'The large half of the ribosome. It links the amino acids together.' },
      p: { nl: 'Grote subeenheid (60S) met het peptidyltransferasecentrum en de exittunnel.', en: 'Large subunit (60S) with the peptidyl transferase centre and the exit tunnel.' } },
    { c: '#8df0dc', t: '40S', m: ['kleine subeenheid', 'small subunit', '40S + 60S → 80S (S-waarden tellen niet op)', '40S + 60S → 80S (S values are not additive)'], d: { nl: 'De kleine helft van het ribosoom. Ze houdt het mRNA vast. Het S-getal zegt hoe snel een deeltje zakt, daarom is 40 + 60 geen 100.', en: 'The small half of the ribosome. It holds the mRNA. The S number says how fast a particle sinks, which is why 40 + 60 is not 100.' },
      p: { nl: 'Kleine subeenheid (40S); Svedberg-waarden (sedimentatiecoëfficiënten) hangen af van massa én vorm en zijn niet additief.', en: 'Small subunit (40S); Svedberg values (sedimentation coefficients) depend on both mass and shape and are not additive.' } },
    { c: C.rrna, t: { nl: 'alleen het rRNA:', en: 'only the rRNA:' }, m: ['de vorm blijft bijna dezelfde', 'the shape stays almost the same'], d: { nl: 'Het ribosoom-RNA (groen). Zonder de eiwitten heeft het al bijna de hele vorm, en het doet ook het eigenlijke werk.', en: 'The ribosome RNA (green). Without the proteins it already has almost the whole shape, and it also does the actual work.' },
      p: { nl: 'Ribosomaal RNA vormt de kern en de functionele centra; de r-eiwitten liggen vooral aan het oppervlak.', en: 'Ribosomal RNA forms the core and the functional centres; the r-proteins lie mainly at the surface.' } },
    { c: C.prot, t: { nl: 'eiwitten', en: 'proteins' }, m: ['rRNA + ≈ 80 eiwitten', 'rRNA + ≈ 80 proteins', '33 eiwitten', '33 proteins', '■ 47 eiwitten', '■ 47 proteins'], d: { nl: 'De paarse bollen: de ribosoom-eiwitten. Ze zitten vooral aan de buitenkant en houden het RNA in vorm.', en: 'The purple balls: the ribosome proteins. They sit mostly on the outside and keep the RNA in shape.' },
      p: { nl: 'Ribosomale eiwitten: 33 in de 40S, 47 in de 60S (≈ 80 in totaal).', en: 'Ribosomal proteins: 33 in the 40S, 47 in the 60S (≈ 80 in total).' } },
    { c: C.rrna, t: '18S rRNA ≈ 1870 nt', d: { nl: 'Het RNA van de kleine helft, zo’n 1870 letters lang.', en: 'The RNA of the small half, about 1870 letters long.' },
      p: { nl: '18S rRNA van de 40S-subeenheid; vormt het decodeercentrum.', en: '18S rRNA of the 40S subunit; forms the decoding centre.' } },
    { c: '#fff', t: { nl: 'decodeercentrum', en: 'decoding centre' }, d: { nl: 'De plek in de kleine helft waar gecontroleerd wordt of het tRNA goed op het codewoord van het mRNA past.', en: 'The spot in the small half where it is checked whether the tRNA fits the code word of the mRNA properly.' },
      p: { nl: 'Decodeercentrum in de A-plaats van de 40S (helix 44 van het 18S rRNA) dat de codon–anticodonparing controleert.', en: 'Decoding centre in the A site of the 40S (helix 44 of 18S rRNA) that monitors codon–anticodon pairing.' } },
    { c: C.rrna, t: '■ 28S rRNA ≈ 5070 nt', d: { nl: 'Het grootste RNA van de grote helft, zo’n 5070 letters lang.', en: 'The largest RNA of the large half, about 5070 letters long.' },
      p: { nl: '28S rRNA, bevat het peptidyltransferasecentrum.', en: '28S rRNA, which contains the peptidyl transferase centre.' } },
    { c: '#7cc4ff', t: '■ 5,8S rRNA ≈ 157 nt', m: ['■ 5.8S rRNA ≈ 157 nt'], d: { nl: 'Een klein RNA in de grote helft (blauw), vast gepaard aan het grote RNA.', en: 'A small RNA in the large half (blue), paired firmly to the large RNA.' },
      p: { nl: '5,8S rRNA, basegepaard met het 28S rRNA; homoloog aan het 5′-uiteinde van het bacteriële 23S.', en: '5.8S rRNA, base-paired with 28S rRNA; homologous to the 5′ end of bacterial 23S.' } },
    { c: '#c3f06b', t: '■ 5S rRNA ≈ 121 nt', d: { nl: 'Het kleinste RNA van de grote helft (lichtgroen), apart gemaakt in de kern.', en: 'The smallest RNA of the large half (light green), made separately in the nucleus.' },
      p: { nl: '5S rRNA, getranscribeerd door Pol III; deel van de centrale protuberans.', en: '5S rRNA, transcribed by Pol III; part of the central protuberance.' } },
    { c: TRNA_SITE.P, t: { nl: 'tRNA (A- en P-plaats)', en: 'tRNA (A and P sites)' }, d: { nl: 'De gele L-vormen: helper-RNA’s die aminozuren aanbrengen. Hier zitten er twee in het ribosoom.', en: 'The yellow L shapes: helper RNAs that bring amino acids. Here two of them sit in the ribosome.' },
      p: { nl: 'A-plaats- en P-plaats-tRNA zoals gemodelleerd in 6Y0G.', en: 'A-site and P-site tRNAs as modelled in 6Y0G.' } },
    { c: '#fff', t: 'A', m: ['P', 'E', 'E: leeg', 'E: empty'], d: { nl: 'De drie plaatsen voor tRNA’s: A waar een nieuw aminozuur aankomt, P die de keten vasthoudt, E de uitgang (hier leeg).', en: 'The three places for tRNAs: A where a new amino acid arrives, P which holds the chain, E the exit (empty here).' },
      p: { nl: 'Aminoacyl- (A), peptidyl- (P) en exitplaats (E); in 6Y0G is de E-plaats onbezet.', en: 'Aminoacyl (A), peptidyl (P) and exit (E) sites; in 6Y0G the E site is unoccupied.' } },
    { c: C.rna, t: 'mRNA 5′→3′', d: { nl: 'Het boodschapper-RNA met het bouwplan. Het ribosoom leest het van 5′ naar 3′.', en: 'The messenger RNA carrying the blueprint. The ribosome reads it from 5′ to 3′.' },
      p: { nl: 'mRNA in het mRNA-kanaal van de 40S, gedecodeerd 5′→3′.', en: 'mRNA in the mRNA channel of the 40S, decoded 5′→3′.' } },
    { c: '#fff', t: { nl: 'koppelplaats (PTC)', en: 'linking site (PTC)' }, m: ['gemaakt van RNA, geen eiwit', 'made of RNA, not protein', 'nieuwe binding: keten 1 langer', 'new bond: chain 1 longer'], d: { nl: 'De plek in de grote helft waar het volgende aminozuur aan de keten wordt gekoppeld. Dat doet RNA, geen eiwit: een RNA-enzym.', en: 'The spot in the large half where the next amino acid is linked to the chain. RNA does this, not protein: an RNA enzyme.' },
      p: { nl: 'Peptidyltransferasecentrum in het 28S rRNA (domein V); het ribosoom is een ribozym.', en: 'Peptidyl transferase centre in 28S rRNA (domain V); the ribosome is a ribozyme.' } },
    { c: C.chain, t: { nl: 'keten (P)', en: 'chain (P)' }, m: ['nieuw aminozuur (A)', 'new amino acid (A)', 'de keten komt eruit', 'the chain comes out'], d: { nl: 'De groene kralen: de groeiende eiwitketen. Ze hangt aan het tRNA in P en wordt doorgegeven aan het nieuwe aminozuur in A.', en: 'The green beads: the growing protein chain. It hangs on the tRNA in P and is passed to the new amino acid in A.' },
      p: { nl: 'Nascent peptide op het peptidyl-tRNA; na peptidevorming gaat het over op het aminoacyl-tRNA in de A-plaats.', en: 'Nascent peptide on the peptidyl-tRNA; after peptide bond formation it transfers to the aminoacyl-tRNA in the A site.' } },
    { c: '#d8fff4', t: { nl: 'tunnel door de grote helft', en: 'tunnel through the large half' }, m: ['≈ 9 nm lang', '≈ 9 nm long'], d: { nl: 'Een smalle tunnel waardoor de groeiende keten het ribosoom verlaat.', en: 'A narrow tunnel through which the growing chain leaves the ribosome.' },
      p: { nl: 'Peptide-exittunnel van de 60S (≈ 80–100 Å; hier ≈ 90 Å gemeten in het model).', en: 'Peptide exit tunnel of the 60S (≈ 80–100 Å; ≈ 90 Å measured in this model).' } },
    { c: C.bact, t: { nl: 'bacterie', en: 'bacteria' }, m: ['70S', '30S · 16S', '50S · 23S + 5S', 'bacterie: 30S = 16S + 21 eiwitten', 'bacteria: 30S = 16S + 21 proteins'], d: { nl: 'Het ribosoom van bacteriën is kleiner, met andere RNA’s en minder eiwitten. Daarom kunnen sommige antibiotica alleen dat ribosoom remmen.', en: 'The bacterial ribosome is smaller, with different RNAs and fewer proteins. That is why some antibiotics can block only that ribosome.' },
      p: { nl: 'Bacterieel 70S-ribosoom: 30S (16S rRNA, 21 eiwitten) en 50S (23S + 5S rRNA, ≈ 33 eiwitten).', en: 'Bacterial 70S ribosome: 30S (16S rRNA, 21 proteins) and 50S (23S + 5S rRNA, ≈ 33 proteins).' } },
    { c: C.rrna, t: { nl: 'mens', en: 'human' }, m: ['80S', '40S · 18S', '60S · 28S + 5,8S + 5S', '60S · 28S + 5.8S + 5S'], d: { nl: 'Het ribosoom van de mens: groter, met vier RNA’s en meer eiwitten.', en: 'The human ribosome: larger, with four RNAs and more proteins.' },
      p: { nl: 'Eukaryoot 80S-ribosoom: 40S (18S, 33 eiwitten) en 60S (28S + 5,8S + 5S, 47 eiwitten).', en: 'Eukaryotic 80S ribosome: 40S (18S, 33 proteins) and 60S (28S + 5.8S + 5S, 47 proteins).' } },
  ],
  steps: [
    ST(8000, cam(800, 470, 1500), 'Het ribosoom van de mens', 'The human ribosome', 'De eiwitfabriek van de cel, uit RNA en ≈ 80 eiwitten. De vorm komt uit een echte 3D-structuur.', 'The cell’s protein factory, made of RNA and ≈ 80 proteins. The shape comes from a real 3D structure.'),
    ST(8000, cam(800, 470, 1500), 'Twee helften: klein en groot', 'Two halves: small and large', 'Een kleine (40S) en een grote helft (60S) vormen samen het 80S-ribosoom. S-getallen tellen niet zomaar op.', 'A small (40S) and a large half (60S) together form the 80S ribosome. S numbers do not simply add up.'),
    ST(9000, cam(800, 470, 1500), 'Vooral RNA', 'Mostly RNA', 'Kijk: de eiwitten (paars) verdwijnen even. Het rRNA blijft over en heeft al bijna de hele vorm. Het RNA doet ook het werk; de eiwitten zitten vooral aan de buitenkant.', 'Watch: the proteins (purple) fade away for a moment. The rRNA stays and already has almost the whole shape. The RNA also does the work; the proteins sit mostly on the outside.'),
    ST(8500, cam(800, 560, 1400), 'De kleine helft houdt het mRNA vast', 'The small half holds the mRNA', 'De kleine helft (40S) houdt het mRNA vast en controleert of het tRNA goed past op het codon.', 'The small half (40S) holds the mRNA and checks whether the tRNA fits the codon properly.'),
    ST(8500, cam(800, 400, 1400), 'De grote helft koppelt', 'The large half does the linking', 'De grote helft (60S) bevat drie RNA’s en koppelt de aminozuren aan elkaar.', 'The large half (60S) contains three RNAs and links the amino acids together.'),
    ST(9000, cam(640, 520, 950), 'Drie plaatsen voor tRNA’s', 'Three places for tRNAs', 'A: nieuw aminozuur komt aan. P: houdt de keten vast. E: uitgang. Hier zitten tRNA’s in A en P.', 'A: a new amino acid arrives. P: holds the chain. E: exit. Here tRNAs sit in A and P.'),
    ST(9000, cam(720, 440, 1040), 'Het RNA maakt de koppeling', 'The RNA makes the link', 'Hier komen de aminozuren op de tRNA’s samen. RNA, geen eiwit, koppelt ze: een RNA-enzym (ribozym).', 'Here the amino acids on the tRNAs meet. RNA, not protein, links them: an RNA enzyme (ribozyme).'),
    ST(9000, cam(560, 400, 1000), 'De uitgangstunnel', 'The exit tunnel', 'De groeiende keten verlaat het ribosoom via een smalle tunnel (≈ 8–10 nm lang) door de grote helft.', 'The growing chain leaves the ribosome through a narrow tunnel (≈ 8–10 nm long) in the large half.'),
    ST(9500, FULL, 'Mens tegenover bacterie', 'Human versus bacterium', 'Bacteriën hebben een ander, kleiner ribosoom (70S). Sommige antibiotica remmen alleen dat ribosoom.', 'Bacteria have a different, smaller ribosome (70S). Some antibiotics block only that ribosome.'),
  ],
  svg() {
    const bins = [];
    for (let b = 0; b < NB; b++) bins.push(CATS.map(c => `<path id="rb-${c}-${b}" fill="none" stroke-linecap="round"/>`).join(''));
    return svgOpen() + `
    <g data-node="ribogenese" data-color="${C.rrna}" data-label="${T2('Hoe wordt een ribosoom gebouwd?', 'How is a ribosome built?')}"><g id="rb-body"><rect id="rb-hit" fill="transparent" rx="60"/><path id="rb-o40" fill="none" stroke-linecap="round"/><path id="rb-o60" fill="none" stroke-linecap="round"/>${bins.join('')}</g>
      <circle id="rb-bgA" data-anchor="ribogenese" r="1" fill="none"/></g>
    <g id="rb-tg" data-node="trna" data-color="${C.trna}" data-label="tRNA"><path id="rb-tPL" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tP" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tAL" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tA" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle id="rb-tAnc" data-anchor="trna" r="1" fill="none"/></g>
    <g id="rb-mg" data-node="codon" data-color="${C.rna}" data-label="${T2('mRNA · codons', 'mRNA · codons')}"><path id="rb-mrna" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle id="rb-mA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
    <g id="rb-ov"></g>
    <g data-node="codon" data-color="${C.rna}" data-nolabel><g id="rb-dc"></g></g>
    <g data-node="peptide" data-color="${C.chain}" data-nolabel><g id="rb-ptc"></g></g>
    <g data-node="vouwing" data-color="${C.chain}" data-nolabel><g id="rb-tun"></g></g>
    ${hud('rb-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'ribogenese', label: { nl: 'Ribosoombiogenese', en: 'Ribosome biogenesis' }, color: C.rrna },
      { node: 'rnastructuur', label: { nl: 'rRNA in 3D', en: 'rRNA in 3D' }, color: C.rrna, href: '../atlas/index.html?id=ribosome' },
    ])}
    </svg>`;
  },
  init(svg, api) {
    const STEPS = this?.steps ?? [];
    const body = bodyRenderer(svg, !!api?.node);
    const trGL = api?.node ? glRenderer(svg, () => {}, ['tA', 'tP'], { radA: TR_R }) : null;   // tRNA-laag boven het ribosoom
    const TCOL = { tA: hex2rgb(TRNA_SITE.A), tP: hex2rgb(TRNA_SITE.P) };
    const $ = id => svg.getElementById(id);
    /* Bovenlaag: de WebGL-lagen liggen (absoluut gepositioneerd) boven de SVG. Wat bovenop het ribosoom en de tRNA's moet
       liggen (aminozuren in de koppelplaats, de tunnel met de keten), komt in een eigen doorzichtige SVG boven die lagen,
       met dezelfde camera. De gewone groepen blijven (onzichtbaar) als klikzone. */
    let top = null, topMo = null;
    if (api?.node && svg.parentNode) {
      top = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      top.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
      const sync = () => { const vb = svg.getAttribute('viewBox'); if (vb) top.setAttribute('viewBox', vb); };
      sync(); svg.parentNode.insertBefore(top, svg.nextSibling);
      topMo = new MutationObserver(sync); topMo.observe(svg, { attributes: true, attributeFilter: ['viewBox'] });
    }
    const P = {}; for (const k in RIBO) { const a = RIBO[k], out = []; for (let i = 0; i < a.length; i += 3) out.push([a[i], a[i + 1], a[i + 2]]); P[k] = out; }
    const cols = s => { const cur = PAL[K.pal[s.step]], prev = PAL[K.pal[Math.max(0, s.step - 1)]], k = ease(sub(s.p, 0, .3)); const o = {}; for (const c of CATS) o[c] = mix(hex2rgb(prev[c]), hex2rgb(cur[c]), k); return o; };

    return {
      update(t, s) {
        placeHud(svg, 'rb-hud', stepVal([.015, .015, .015, .63, .015, .015, .015, .015], s), .105, STEPS[s.step]?.cam);   // stap 3: de 60S ligt linksboven, dus de knoppen rechtsboven
        const rock = .22 * Math.sin(Math.PI * sub(s.p, .3, 1));
        const th = stepVal(K.ang, s) + (s.step === 5 || s.step === 6 ? rock * .3 : rock), ph = stepVal(K.tilt, s);
        const pop = stepVal(K.pop, s), sep = stepVal(K.sep, s), op = stepVal(K.op, s), trOp = stepVal(K.trna, s), [cx, cy, sc] = stepVal(K.pos, s);
        const S = S0 * sc, ct = Math.cos(th), st = Math.sin(th), cp = Math.cos(ph), sp = Math.sin(ph);
        const proj = (p, dy = 0) => {
          const x = p[0] * ct + p[2] * st, z = -p[0] * st + p[2] * ct, y = p[1] + dy;
          return [cx + S * x, cy - S * (y * cp - z * sp), y * sp + z * cp];
        };
        const col = cols(s);
        // eiwitten: in stap 3 ("Vooral RNA") op dezelfde plaats laten vervagen en weer terugkomen
        const fadeP = s.step === 2 ? Math.max(0, 1 - ease(sub(s.p, .3, .48)) + ease(sub(s.p, .84, .97))) : 1;
        const alpha = {}; for (const c of CATS) alpha[c] = c[0] === 'p' ? (.35 + .65 * pop) * fadeP : 1;
        body.draw(P, proj, sep, col, alpha, S * 9, op);
        // tRNA's en mRNA (bovenop)
        const line = pts => pts.map((p, i) => { const [X, Y] = proj(p); return `${i ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`; }).join('');
        const avg = (arr, ix) => ix.reduce((a, j) => a.map((v, q) => v + arr[j][q] / ix.length), [0, 0, 0]);
        /* tRNA's: belichte bollen (één per nucleotide uit 6Y0G) in dezelfde stijl als het ribosoom, geel per plaats (TRNA_SITE:
           P geel, A lichtgeel; zoals in de 3D-scènes van de bacterie). Live in een eigen WebGL-laag boven het ribosoom; zonder
           WebGL (testhulpmiddelen) dezelfde bollen als SVG-paden. De onzichtbare lijn langs de L-vorm is de klikzone. */
        const TR = S * TR_R;
        if (trGL) trGL.draw(P, proj, 0, TCOL, { tA: 1, tP: 1 }, TR, trOp);
        for (const [id, key] of [['rb-tA', 'tA'], ['rb-tP', 'tP']]) {
          const T = P[key], el = $(id + 'L'), e2 = $(id);
          if (trGL) {
            const Lp = [avg(T, [33, 34, 35]), avg(T, [17, 18, 54, 55]), T[75]].map(q => proj(q));
            el.setAttribute('d', Lp.map((q, j) => `${j ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join(''));
            el.setAttribute('stroke', 'transparent'); el.setAttribute('stroke-width', f1(S * 20)); e2.setAttribute('d', '');
          } else {
            const dots = T.map(q => proj(q)).sort((a, b) => a[2] - b[2]).map(([X, Y]) => `M${X.toFixed(1)},${Y.toFixed(1)}h0`).join('');
            el.setAttribute('d', dots); el.setAttribute('stroke', '#04070f'); el.setAttribute('stroke-width', f1(2 * TR + 5));
            e2.setAttribute('d', dots); e2.setAttribute('stroke', TRNA_SITE[key[1]]); e2.setAttribute('stroke-width', f1(2 * TR));
          }
        }
        $('rb-tg').setAttribute('opacity', f1(trOp));
        const m = $('rb-mrna'); m.setAttribute('d', line(P.mrna)); m.setAttribute('stroke', C.rna); m.setAttribute('stroke-width', f1(S * 4.5)); $('rb-mg').setAttribute('opacity', f1(stepVal(K.mrna, s)));
        const L2 = k => proj(LM[k]);
        const [tx, ty] = L2('elA'); $('rb-tAnc').setAttribute('cx', f1(tx + 110)); $('rb-tAnc').setAttribute('cy', f1(ty + 40));   // rechts naast het tRNA, niet onder de PTC-tekst
        const mEnd = proj(P.mrna[P.mrna.length - 1]); $('rb-mA').setAttribute('cx', f1(mEnd[0] + 30)); $('rb-mA').setAttribute('cy', f1(mEnd[1] + 16));
        $('rb-bgA').setAttribute('cx', f1(cx + 60)); $('rb-bgA').setAttribute('cy', f1(cy + 360 * sc));

        // overlays per stap
        let o = '', dcS = '', ptcS = '', tunS = '';
        const fade = sub(s.p, .15, .35);
        const i = s.step;
        if (i === 0) {
          o += textBox(1010, 250, 520, [T2('4 rRNA\'s + ≈ 80 eiwitten', '4 rRNAs + ≈ 80 proteins'), T2('vorm uit PDB 6Y0G', 'shape from PDB 6Y0G')], { title: T2('Humaan 80S', 'Human 80S'), op: fade, fs: 24 });
        }
        if (i === 1) {
          const a = proj(LM.c60, sep), b = proj(LM.c40, -sep), k = i === 1 ? fade : 1;
          o += txt(a[0] + 330, a[1] - 40, T2('60S', '60S'), '#23a88f', 44, 'start', 800) + txt(a[0] + 330, a[1] - 5, T2('grote subeenheid', 'large subunit'), C.text, 21, 'start').replace('<text', `<text opacity="${f1(k)}"`);
          o += txt(b[0] + 330, b[1] + 30, T2('40S', '40S'), '#8df0dc', 44, 'start', 800) + txt(b[0] + 330, b[1] + 65, T2('kleine subeenheid', 'small subunit'), C.text, 21, 'start').replace('<text', `<text opacity="${f1(k)}"`);
          if (i === 1) o += txt(1010, 880, T2('40S + 60S → 80S   (S-waarden tellen niet op)', '40S + 60S → 80S   (S values are not additive)'), C.muted, 22, 'start', 600).replace('<text', `<text opacity="${f1(fade)}"`);
        }
        if (i === 2) {
          const k1 = sub(s.p, .08, .2) * (1 - sub(s.p, .3, .38)), k2 = sub(s.p, .42, .52) * (1 - sub(s.p, .84, .92));
          // rechts naast het ribosoom (onderaan botst de tekst met de kleine helft tijdens de overgang)
          o += `<g opacity="${f1(k1)}">` + txt(1000, 430, T2(`<tspan fill="${C.rrna}">rRNA</tspan> + <tspan fill="${C.prot}">≈ 80 eiwitten</tspan>`, `<tspan fill="${C.rrna}">rRNA</tspan> + <tspan fill="${C.prot}">≈ 80 proteins</tspan>`), C.text, 30, 'start', 700) + '</g>';
          o += `<g opacity="${f1(k2)}">` + txt(1000, 415, T2('alleen het rRNA:', 'only the rRNA:'), C.rrna, 30, 'start', 700) + txt(1000, 455, T2('de vorm blijft bijna dezelfde', 'the shape stays almost the same'), C.text, 26, 'start', 600) + '</g>';
        }
        if (i === 3) {
          const dc = proj(LM.dc, -sep);
          dcS += `<circle cx="${f1(dc[0])}" cy="${f1(dc[1])}" r="${f1(26 + 6 * Math.sin(t / 300))}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(fade)}"/>` +
            `<path d="M${f1(dc[0] - 26)},${f1(dc[1] - 20)} L${f1(dc[0] - 170)},${f1(dc[1] - 130)}" stroke="#fff" stroke-width="2" opacity="${f1(fade)}"/>` +
            txt(dc[0] - 175, dc[1] - 140, T2('decodeercentrum', 'decoding centre'), '#fff', 24, 'end').replace('<text', `<text opacity="${f1(fade)}"`);
          o += textBox(1000, 600, 480, [T2('18S rRNA ≈ 1870 nt', '18S rRNA ≈ 1870 nt'), T2('33 eiwitten', '33 proteins'), T2('bacterie: 30S = 16S + 21 eiwitten', 'bacteria: 30S = 16S + 21 proteins')], { title: '40S', col: '#8df0dc', op: fade, fs: 22 });
        }
        if (i === 4) {
          o += textBox(1000, 160, 480, [T2('<tspan fill="#2cc6a8">■</tspan> 28S rRNA ≈ 5070 nt', '<tspan fill="#2cc6a8">■</tspan> 28S rRNA ≈ 5070 nt'), T2('<tspan fill="#7cc4ff">■</tspan> 5,8S rRNA ≈ 157 nt', '<tspan fill="#7cc4ff">■</tspan> 5.8S rRNA ≈ 157 nt'), T2('<tspan fill="#c3f06b">■</tspan> 5S rRNA ≈ 121 nt', '<tspan fill="#c3f06b">■</tspan> 5S rRNA ≈ 121 nt'), T2('<tspan fill="#9b7bff">■</tspan> 47 eiwitten', '<tspan fill="#9b7bff">■</tspan> 47 proteins')], { title: '60S', col: C.rrna, op: fade, fs: 22 });
        }
        if (i === 5 || i === 6) {
          const k = i === 5 ? fade : 1;
          for (const [lab, key, el] of [['E', 'acE', 'elE'], ['P', 'acP', 'elP'], ['A', 'acA', 'elA']]) {
            const a = proj(LM[key]), e = proj(LM[el]);
            o += `<g opacity="${f1(k * (i === 6 ? .5 : 1))}">` + txt(a[0], a[1] + 62, lab, '#fff', 34, 'middle', 800) + '</g>';
            if (lab === 'E') o += `<g opacity="${f1(k * (i === 6 ? .4 : .9))}"><path d="M${f1(a[0])},${f1(a[1] - 12)} L${f1(e[0])},${f1(e[1])}" stroke="${TRNA_SITE.E}" stroke-width="3" stroke-dasharray="7 7" fill="none"/>` + txt(e[0] - 20, e[1] - 20, T2('E: leeg', 'E: empty'), C.muted, 20, 'end') + '</g>';
          }
          if (i === 5) o += txt(proj(LM.acA)[0] + 150, proj(LM.acA)[1] + 120, "mRNA 5′→3′", C.rna, 22, 'start').replace('<text', `<text opacity="${f1(fade)}"`);
        }
        // groeiende keten = rij groene bolletjes (aminozuren)
        const bead = (x, y, r = 9, extra = '') => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${C.chain}" stroke="#0a1224" stroke-width="2" ${extra}/>`;
        const lab = (x, y, t1, col, fs, an = 'start', w = 800) => txt(x, y, t1, col, fs, an, w).replace('<text', '<text stroke="#0b1224" stroke-width="6" paint-order="stroke"');
        if (i === 6) {
          // twee aminozuren aan de uiteinden van de tRNA's komen samen in de koppelplaats; het rRNA maakt de binding
          const pc = proj(LM.ptc), ex = proj(LM.exit), eA = proj(P.tA[75]), eP = proj(P.tP[75]);
          const dl = Math.hypot(ex[0] - pc[0], ex[1] - pc[1]), ux = (ex[0] - pc[0]) / dl, uy = (ex[1] - pc[1]) / dl;
          const bond = sub(s.p, .4, .6), move = ease(sub(s.p, .6, .85));
          const aaA = [eA[0] + 10, eA[1] - 16];                      // nieuw aminozuur op het tRNA in de A-plaats
          const base = [lerp(eP[0] - 8, aaA[0] + ux * 24, move), lerp(eP[1] - 16, aaA[1] + uy * 24, move)];   // keten: eerst aan P, daarna aan A
          ptcS += `<circle cx="${f1(pc[0])}" cy="${f1(pc[1])}" r="${f1(46 + 6 * Math.sin(t / 260))}" fill="rgba(35,168,143,.16)" stroke="${C.rrna}" stroke-width="3" stroke-dasharray="8 6" opacity="${f1(fade)}"/>`;
          let ch = '';
          for (let j = 3; j >= 0; j--) ch += bead(base[0] + ux * 23 * j, base[1] + uy * 23 * j, 11);
          if (bond > 0) ch += `<line x1="${f1(base[0])}" y1="${f1(base[1])}" x2="${f1(aaA[0])}" y2="${f1(aaA[1])}" stroke="#fff" stroke-width="${f1(3 + 3 * (1 - bond))}" opacity="${f1(Math.min(1, bond * 2))}"/>` +
            (bond < 1 ? `<circle cx="${f1((base[0] + aaA[0]) / 2)}" cy="${f1((base[1] + aaA[1]) / 2)}" r="${f1(8 + 26 * bond)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - bond)}"/>` : '');
          ch += bead(aaA[0], aaA[1], 13);
          ptcS += `<g opacity="${f1(sub(s.p, .1, .3))}">${ch}</g>`;
          ptcS += `<g opacity="${f1(fade)}">` + lab(pc[0] + 70, pc[1] - 78, T2('koppelplaats (PTC)', 'linking site (PTC)'), '#fff', 26) + lab(pc[0] + 70, pc[1] - 50, T2('gemaakt van RNA, geen eiwit', 'made of RNA, not protein'), C.rrna, 21, 'start', 700) + '</g>' +
            `<g opacity="${f1(sub(s.p, .2, .35) * (1 - sub(s.p, .45, .55)))}">` + lab(aaA[0] + 30, aaA[1] + 34, T2('nieuw aminozuur (A)', 'new amino acid (A)'), C.chain, 22, 'start', 700) + lab(eP[0] - 60, eP[1] - 44, T2('keten (P)', 'chain (P)'), C.chain, 22, 'end', 700) + '</g>' +
            `<g opacity="${f1(sub(s.p, .5, .62))}">` + lab(aaA[0] + 30, aaA[1] + 34, T2('nieuwe binding: keten 1 langer', 'new bond: chain 1 longer'), '#fff', 24) + '</g>';
        }
        if (i === 7) {
          // de tunnel als doorschijnende buis dwars door de grote helft; de keten schuift erdoor naar buiten
          const pc = proj(LM.ptc), ex = proj(LM.exit);
          const dx = ex[0] - pc[0], dy = ex[1] - pc[1], dl = Math.hypot(dx, dy), ux = dx / dl, uy = dy / dl;
          const tube = `M${f1(pc[0])},${f1(pc[1])} L${f1(ex[0])},${f1(ex[1])}`;
          tunS += `<g opacity="${f1(sub(s.p, .05, .25))}"><path d="${tube}" stroke="#d8fff4" stroke-width="46" stroke-linecap="round" opacity=".28"/>` +
            `<path d="${tube}" stroke="#0b1224" stroke-width="36" stroke-linecap="round" opacity=".6"/></g>`;
          const head = 1.45 * ease(sub(s.p, .2, .85)), n = Math.floor(head * dl / 19);
          for (let j = 0; j <= n; j++) {
            const d = j * 19, out = Math.max(0, d - dl);
            const x = pc[0] + ux * Math.min(d, dl) + ux * out - uy * 14 * Math.sin(out / 22), y = pc[1] + uy * Math.min(d, dl) + uy * out + ux * 14 * Math.sin(out / 22);
            tunS += bead(x, y, 9);
          }
          tunS += `<circle cx="${f1(pc[0])}" cy="${f1(pc[1])}" r="12" fill="#fff"/>`;
          tunS += `<g opacity="${f1(sub(s.p, .1, .3))}">` + lab(pc[0] + 26, pc[1] + 42, T2('koppelplaats (PTC)', 'linking site (PTC)'), '#fff', 22, 'start', 700) +
            lab((pc[0] + ex[0]) / 2 + 40, (pc[1] + ex[1]) / 2 - 44, T2('tunnel door de grote helft', 'tunnel through the large half'), '#d8fff4', 26) +
            lab((pc[0] + ex[0]) / 2 + 40, (pc[1] + ex[1]) / 2 - 18, T2('≈ 9 nm lang', '≈ 9 nm long'), C.muted, 20, 'start', 600) + '</g>';
          const tip = [ex[0] + ux * dl * .45, ex[1] + uy * dl * .45];
          tunS += `<g opacity="${f1(sub(s.p, .7, .85))}">` + lab(tip[0] - 10, tip[1] - 34, T2('de keten komt eruit', 'the chain comes out'), C.chain, 24, 'middle') + '</g>';
        }
        if (i === 8) {
          const f = fade, X = 680, Y = 190;
          const row = (y, a, b, c, bold) => txt(X, y, a, C.muted, 24, 'start', 600) + txt(X + 300, y, b, bold ? C.bact : C.text, 24, 'start', bold ? 800 : 500) + txt(X + 560, y, c, bold ? C.rrna : C.text, 24, 'start', bold ? 800 : 500);
          o += `<g opacity="${f1(f)}"><rect x="${X - 30}" y="${Y - 60}" width="920" height="400" rx="16" fill="rgba(9,14,28,.86)" stroke="${C.rrna}" stroke-opacity=".5" stroke-width="2"/>` +
            row(Y, '', T2('bacterie', 'bacteria'), T2('mens', 'human'), true) +
            row(Y + 70, T2('ribosoom', 'ribosome'), '70S', '80S') +
            row(Y + 140, T2('kleine subeenheid', 'small subunit'), '30S · 16S', '40S · 18S') +
            row(Y + 185, T2('   eiwitten', '   proteins'), '21', '33') +
            row(Y + 255, T2('grote subeenheid', 'large subunit'), '50S · 23S + 5S', T2('60S · 28S + 5,8S + 5S', '60S · 28S + 5.8S + 5S')) +
            row(Y + 300, T2('   eiwitten', '   proteins'), '≈ 33', '47') + '</g>';
        }
        $('rb-ov').innerHTML = o; $('rb-dc').innerHTML = dcS; $('rb-ptc').innerHTML = ptcS; $('rb-tun').innerHTML = tunS;
        if (top) { top.innerHTML = ptcS + tunS; $('rb-ptc').setAttribute('opacity', '0'); $('rb-tun').setAttribute('opacity', '0'); }
      },
      destroy() { body.destroy(); trGL?.destroy(); topMo?.disconnect(); top?.remove(); },
    };
  },
};
