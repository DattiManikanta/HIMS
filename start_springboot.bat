@echo off
TITLE INDUS HEALTH CITY - Spring Boot Backend Launcher (Port 5000)
echo ================================================================
echo      INDUS HEALTH CITY - Spring Boot MySQL REST Backend
echo ================================================================
echo.
cd /d "%~dp0backend-spring"

if "%JAVA_HOME%"=="" if exist "C:\Program Files\Java\jdk-25" set "JAVA_HOME=C:\Program Files\Java\jdk-25"
echo Starting Spring Boot on http://localhost:5000 ...
call mvnw.cmd spring-boot:run
pause
