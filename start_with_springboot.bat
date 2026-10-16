@echo off
TITLE INDUS HEALTH CITY - Full-Stack Spring Boot + React Launcher
echo ================================================================
echo    INDUS HEALTH CITY - Full-Stack Spring Boot + React Launcher
echo ================================================================
echo.
cd /d "%~dp0"

echo [1/3] Syncing latest code from GitHub...
set "GIT_CMD=git"
if exist "%~dp0tools\git\cmd\git.exe" set "GIT_CMD=%~dp0tools\git\cmd\git.exe"
"%GIT_CMD%" pull origin main >nul 2>&1

if "%JAVA_HOME%"=="" if exist "C:\Program Files\Java\jdk-25" set "JAVA_HOME=C:\Program Files\Java\jdk-25"
echo [2/3] Starting Spring Boot MySQL Backend on port 5000...
start "Spring Boot MySQL Backend" cmd /k "cd /d %~dp0backend-spring && mvnw.cmd spring-boot:run"

echo [2/2] Starting React Web Server on port 3000...
set "NODE_CMD=%~dp0tools\node.exe"
if not exist "%NODE_CMD%" set "NODE_CMD=node"

echo.
echo ================================================================
echo 💻 THIS LAPTOP / PC:        http://localhost:3000
echo 📱 PHONES & OTHER LAPTOPS:  http://10.150.250.111:3000
echo 📷 SCAN PHONE QR CODE:      http://localhost:3000/qr
echo ================================================================
echo.

timeout /t 4 >nul
start http://localhost:3000

"%NODE_CMD%" server.cjs
