@echo off
title Push HIMS to GitHub
cd /d "%~dp0"
echo ========================================================
echo PUSHING INDUS HEALTH CITY (HIMS) TO GITHUB
echo Target: https://github.com/DattiManikanta/hims
echo ========================================================
echo.
set "GIT_CMD=git"
if exist "%~dp0tools\git\cmd\git.exe" set "GIT_CMD=%~dp0tools\git\cmd\git.exe"

echo [1/3] Staging all changes...
"%GIT_CMD%" add -A

echo [2/3] Committing changes...
"%GIT_CMD%" commit -m "sync: updates from work session (%DATE% %TIME%)" >nul 2>&1

echo [3/3] Uploading to GitHub...
"%GIT_CMD%" push origin main
echo.
echo ========================================================
echo Done! If you see 'main -> main', the upload succeeded.
echo ========================================================
pause
