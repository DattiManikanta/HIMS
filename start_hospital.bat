@echo off
TITLE INDUS HEALTH CITY - Hospital Management & OPD Portal
echo ================================================================
echo           INDUS HEALTH CITY - HOSPITAL MANAGEMENT SYSTEM
echo ================================================================
echo.
cd /d "%~dp0"

set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

echo Checking Node.js runtime...
"%NODE_CMD%" -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js was not found at %NODE_CMD%
    pause
    exit /b 1
)

echo.
echo Starting INDUS HEALTH CITY Server...
echo Hospital Web Portal: http://localhost:3000
echo Backend API Proxy:   http://localhost:3000/api
echo.
echo Opening browser at http://localhost:3000 ...
start http://localhost:3000

echo.
echo ================================================================
echo Keep this window OPEN while using INDUS HEALTH CITY!
echo To stop the server, press Ctrl+C or close this window.
echo ================================================================
echo.

"%NODE_CMD%" server.cjs
pause
