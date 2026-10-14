@echo off
TITLE INDUS HEALTH CITY - Mobile Phone & Laptop Multi-Device Access
cd /d "%~dp0"
cls
echo ================================================================
echo      INDUS HEALTH CITY - ACCESS FROM PHONES & OTHER LAPTOPS
echo ================================================================
echo.
echo [OPTION 1] LOCAL WI-FI / LAN ACCESS (Fastest):
echo ----------------------------------------------------------------
echo Open your phone or laptop browser and go to:
echo.
echo       http://10.150.250.111:3000
echo.
echo Or view the Scannable Phone QR Code:
echo       http://localhost:3000/qr
echo.
echo (Make sure Windows Firewall allows Port 3000. Run allow_firewall.bat once!)
echo.
echo ================================================================
echo [OPTION 2] SECURE INTERNET TUNNEL (Access from ANYWHERE on 4G/5G):
echo ----------------------------------------------------------------
echo Starting secure Cloudflare tunnel...
echo Look for the 'https://*.trycloudflare.com' link below:
echo.

start http://localhost:3000/qr

set "CF_EXE=%~dp0tools\cloudflared.exe"
if not exist "%CF_EXE%" (
    echo [Notice] tools\cloudflared.exe not found. Option 1 (Wi-Fi) is ready above.
    pause
    exit /b 0
)

"%CF_EXE%" tunnel --protocol http2 --url http://127.0.0.1:3000
pause
