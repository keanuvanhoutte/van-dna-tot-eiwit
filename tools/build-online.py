"""Bouwt dist/ voor online publicatie: de verhaal-app als hoofdpagina (index.html, zonder eigen <html>/<head>-skelet),
plus app/, shared/, atlas/ en data/ als bijbestanden. Gebruik: python tools/build-online.py"""
import os, re, shutil
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = os.path.join(ROOT, 'dist')
SKIP = re.compile(r'(\.md$|\.orig\.js$|\.bak$|/bak/|/orig)')
# niet de hele map wissen (OneDrive kan mappen vasthouden): verouderde bestanden apart verwijderen, de rest overschrijven
def _clean():
    for base, _, fs in os.walk(DIST):
        for f in fs:
            try: os.remove(os.path.join(base, f))
            except OSError: pass
if os.path.exists(DIST): _clean()
files = []
for d in ['app', 'shared', 'atlas', 'data']:
    for base, _, fs in os.walk(os.path.join(ROOT, d)):
        for f in fs:
            src = os.path.join(base, f); rel = os.path.relpath(src, ROOT).replace(os.sep, '/')
            if SKIP.search('/' + rel): continue
            dst = os.path.join(DIST, rel); os.makedirs(os.path.dirname(dst), exist_ok=True); shutil.copy2(src, dst); files.append(rel)
# hoofdpagina = de app, met paden vanaf de wortel en zonder skelet-tags
s = open(os.path.join(ROOT, 'app', 'index.html'), encoding='utf-8').read()
s = re.sub(r'<!doctype html>\s*|</?html[^>]*>\s*|</?head>\s*|</?body>\s*|<meta charset[^>]*>\s*|<meta name="viewport"[^>]*>\s*', '', s, flags=re.I)
s = s.replace('href="../shared/', 'href="shared/').replace('href="app.css"', 'href="app/app.css"')
s = s.replace('href="../atlas/index.html"', 'href="atlas/index.html"').replace('src="engine.js"', 'src="app/engine.js"')
open(os.path.join(DIST, 'index.html'), 'w', encoding='utf-8').write(s)
print(len(files), 'bijbestanden;', round(sum(os.path.getsize(os.path.join(DIST, f)) for f in files) / 1e6, 1), 'MB')
