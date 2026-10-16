@echo off
title Pull HIMS from GitHub (Sync Latest Code)
cd /d "%~dp0"
cls
echo ========================================================
echo    INDUS HEALTH CITY - SYNC CODE FROM GITHUB
echo    Target: https://github.com/DattiManikanta/hims
echo ========================================================
echo.
echo Pulling latest code pushed from your other computer...
echo.

set "GIT_CMD=git"
if exist "%~dp0tools\git\cmd\git.exe" set "GIT_CMD=%~dp0tools\git\cmd\git.exe"

"%GIT_CMD%" pull origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [Warning] Could not pull from GitHub. Check your internet connection.
    pause
    exit /b 1
)

echo.
echo Verifying frontend bundle...
set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"
"%NODE_CMD%" tools\build.cjs

echo.
echo ========================================================
echo SUCCESS! Your code is now 100%% up to date with your other computer!
echo ========================================================
echo.
pause
