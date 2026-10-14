@echo off
TITLE INDUS HEALTH CITY - Windows Firewall Rule Configurator
echo ================================================================
echo    INDUS HEALTH CITY - ALLOW NETWORK ACCESS (PHONES & LAPTOPS)
echo ================================================================
echo.
echo Requesting Administrator privileges to open Port 3000 and 5000...
echo.

:: Check for administrative rights
net session >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    goto :add_rules
) else (
    echo Elevating privileges via UAC prompt...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
    exit /b
)

:add_rules
echo Adding Windows Firewall rules...
netsh advfirewall firewall delete rule name="INDUS HEALTH CITY Web (Port 3000)" >nul 2>&1
netsh advfirewall firewall add rule name="INDUS HEALTH CITY Web (Port 3000)" dir=in action=allow protocol=TCP localport=3000 profile=any >nul

netsh advfirewall firewall delete rule name="INDUS HEALTH CITY API (Port 5000)" >nul 2>&1
netsh advfirewall firewall add rule name="INDUS HEALTH CITY API (Port 5000)" dir=in action=allow protocol=TCP localport=5000 profile=any >nul

echo.
echo ================================================================
echo [SUCCESS] Windows Firewall has been configured!
echo Port 3000 (Web Frontend) and Port 5000 (API) are now accessible
echo from any phone, laptop, or tablet on your network.
echo ================================================================
echo.
pause
