@echo off
TITLE INDUS HEALTH CITY - Keep-Alive URL Pinger (Never Sleeps)
cd /d "%~dp0"
cls
echo ================================================================
echo      INDUS HEALTH CITY - CLOUD KEEP-ALIVE URL PINGER
echo ================================================================
echo.

set "TARGET_URL=%~1"
if "%TARGET_URL%"=="" (
    set /p "TARGET_URL=Enter your Cloud URL (e.g. https://indus-health-city.onrender.com): "
)

if "%TARGET_URL%"=="" (
    echo [Error] No URL provided.
    pause
    exit /b 1
)

:: Ensure URL has /ping
echo %TARGET_URL% | findstr /i "/ping" >nul
if %ERRORLEVEL% NEQ 0 (
    set "PING_URL=%TARGET_URL%/ping"
) else (
    set "PING_URL=%TARGET_URL%"
)

echo.
echo ================================================================
echo Pinging Target: %PING_URL%
echo Interval:       Every 5 minutes (300 seconds)
echo Status:         Active (Keeps Render / Free Tier awake 24/7)
echo ================================================================
echo Press Ctrl+C at any time to stop.
echo.

:loop
echo [%date% %time%] Sending keep-alive ping to %PING_URL%...
powershell -Command "try { $res = Invoke-RestMethod -Uri '%PING_URL%' -TimeoutSec 15; Write-Host ' [SUCCESS] Server is AWAKE!' -ForegroundColor Green; Write-Host (' Details: ' + ($res | ConvertTo-Json -Compress)) -ForegroundColor Cyan; } catch { Write-Host (' [PING RESULT] ' + $_.Exception.Message) -ForegroundColor Yellow; }"
echo Waiting 5 minutes for next ping...
powershell -Command "Start-Sleep -Seconds 300"
goto loop
