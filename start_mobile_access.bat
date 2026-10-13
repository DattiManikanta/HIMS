@echo off
TITLE ATRI HIMS - Mobile Phone Access Launcher
cd /d "%~dp0"
cls
echo ================================================================
echo           ATRI HIMS HOSPITAL - MOBILE ACCESS LAUNCHER
echo ================================================================
echo.
echo OPTION 1 (FASTEST - Same Wi-Fi Network):
echo Open your phone's browser and type:
echo.
echo       http://10.150.250.111:3000
echo.
echo ================================================================
echo OPTION 2 (ANYWHERE - Cloudflare Internet Tunnel):
echo Connecting to secure Cloudflare Tunnel...
echo.

set "CF_EXE=%~dp0tools\cloudflared.exe"
if not exist "%CF_EXE%" (
    echo Error: tools\cloudflared.exe not found.
    pause
    exit /b 1
)

echo Starting tunnel (Look for the https://*.trycloudflare.com link below):
echo.
"%CF_EXE%" tunnel --protocol http2 --url http://127.0.0.1:3000

pause
