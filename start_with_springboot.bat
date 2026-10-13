@echo off
TITLE INDUS HEALTH CITY - Full-Stack Spring Boot + React Launcher
echo ================================================================
echo    INDUS HEALTH CITY - Full-Stack Spring Boot + React Launcher
echo ================================================================
echo.
cd /d "%~dp0"

echo [1/2] Starting Spring Boot REST Backend on port 5000...
start "Spring Boot MySQL Backend" cmd /k "cd /d %~dp0backend-spring && mvnw.cmd spring-boot:run"

echo [2/2] Starting React Web Server on port 3000...
set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

echo Waiting for services to initialize...
timeout /t 4 >nul
start http://localhost:3000

"%NODE_CMD%" server.cjs
