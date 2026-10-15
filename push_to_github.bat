@echo off
title Push HIMS to GitHub
cd /d "%~dp0"
echo ========================================================
echo PUSHING INDUS HEALTH CITY (HIMS) TO GITHUB
echo Target: https://github.com/DattiManikanta/hims
echo ========================================================
echo.
echo If a browser window opens, please sign in as DattiManikanta and click Authorize.
echo.
git push origin main
echo.
echo ========================================================
echo Done! If you see 'main -> main', the upload succeeded.
echo ========================================================
pause
