@echo off
rem Start "Van DNA tot eiwit": lokale server (poort 5173) + browser. Sluit het servervenster om te stoppen.
cd /d "%~dp0"
where python >nul 2>nul || (echo Python is niet gevonden. Installeer Python 3 via https://www.python.org & pause & exit /b 1)
start "Van DNA tot eiwit - server (sluit dit venster om te stoppen)" /min python tools\serve.py 5173
timeout /t 2 /nobreak >nul
start "" http://localhost:5173/index.html
