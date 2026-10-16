@echo off
TITLE INDUS HEALTH CITY - Hospital Management & OPD Portal
echo ================================================================
echo           INDUS HEALTH CITY - HOSPITAL MANAGEMENT SYSTEM
echo ================================================================
echo.
cd /d "%~dp0"

set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

echo [1/3] Syncing latest code from GitHub...
set "GIT_CMD=git"
if exist "%~dp0tools\git\cmd\git.exe" set "GIT_CMD=%~dp0tools\git\cmd\git.exe"
"%GIT_CMD%" pull origin main >nul 2>&1

echo [2/3] Checking Node.js runtime...
"%NODE_CMD%" -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js was not found at %NODE_CMD%
    pause
    exit /b 1
)

echo.
echo ================================================================
echo 💻 THIS COMPUTER:           http://localhost:3000
echo 📱 PHONES & OTHER LAPTOPS:  http://10.150.250.111:3000
echo 📷 SCAN PHONE QR CODE:      http://localhost:3000/qr
echo 🌐 ACCESS FROM ANYWHERE:    Run start_mobile_access.bat
echo ================================================================
echo.

start http://localhost:3000

"%NODE_CMD%" server.cjs
pause
