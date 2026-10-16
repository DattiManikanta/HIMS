@echo off
title HIMS Automatic GitHub Code Watcher
cd /d "%~dp0"
cls
echo ========================================================
echo   INDUS HEALTH CITY - AUTOMATIC GITHUB CODE WATCHER
echo   Target: https://github.com/DattiManikanta/hims
echo ========================================================
echo.
echo Watching for new commits pushed from your other computer...
echo Automatically pulls new code every 60 seconds.
echo (Keep this window open or minimized in the background)
echo.

set "GIT_CMD=git"
if exist "%~dp0tools\git\cmd\git.exe" set "GIT_CMD=%~dp0tools\git\cmd\git.exe"
set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

:loop
"%GIT_CMD%" fetch origin main >nul 2>&1
for /f %%i in ('"%GIT_CMD%" rev-list HEAD..origin/main --count 2^>nul') do set BEHIND=%%i

if defined BEHIND (
    if not "%BEHIND%"=="0" (
        echo.
        echo ========================================================
        echo [%DATE% %TIME%] New code detected from other computer (%BEHIND% commits)!
        echo Automatically pulling updates now...
        "%GIT_CMD%" pull origin main
        "%NODE_CMD%" tools\build.cjs
        echo [%DATE% %TIME%] Code is now 100%% up to date!
        echo ========================================================
        echo.
    )
)

timeout /t 60 /nobreak >nul
goto loop
