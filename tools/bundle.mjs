/* Bundelt de verhaal-app en de DNA-bib elk tot één bestand, voor de online versie (Firebase).
 * Waarom: de verhaal-app bestaat uit ~200 losse modules. Bij sommige browsers/netwerken blijven er bij het starten
 * af en toe een paar verzoeken eeuwig "pending" hangen, en dan blijft het laadscherm staan (13-11-2026).
 * Eén bestand = één verzoek: dat probleem verdwijnt en laden gaat sneller.
 *
 * Gebruik:  node tools/bundle.mjs          → maakt app/engine.bundle.js en atlas/atlas.bundle.js
 *           node tools/bundle.mjs --clean  → verwijdert ze weer (na de deploy; ze horen niet in git of OneDrive)
 * Firebase roept dit vanzelf aan (firebase.json: predeploy / postdeploy). Lokaal en op GitHub Pages laden de pagina's
 * gewoon de losse bestanden (zie het laadscript in app/index.html en atlas/index.html). */
import { execSync } from 'node:child_process';
import { rmSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JOBS = [['app/engine.js', 'app/engine.bundle.js'], ['atlas/atlas.js', 'atlas/atlas.bundle.js']];

if (process.argv.includes('--clean')) {
  for (const [, out] of JOBS) rmSync(join(ROOT, out), { force: true });
  console.log('bundels verwijderd');
} else {
  for (const [src, out] of JOBS) {
    // es2022: de scène-index gebruikt top-level await; dynamische imports (scènes, 3D-paneel) komen mee in de bundel
    execSync(`npx --yes esbuild@0.24.0 ${src} --bundle --format=esm --minify --target=es2022 --log-level=warning --outfile=${out}`, { cwd: ROOT, stdio: 'inherit' });
    if (!existsSync(join(ROOT, out))) throw new Error(`bundel ontbreekt: ${out}`);
    console.log(`${out}: ${(statSync(join(ROOT, out)).size / 1e6).toFixed(1)} MB`);
  }
}
