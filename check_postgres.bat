@echo off
TITLE INDUS HEALTH CITY - PostgreSQL Connection Tester
cd /d "%~dp0"
echo ================================================================
echo Running PostgreSQL Connection Test for INDUS HEALTH CITY...
echo Directory: %~dp0
echo ================================================================
echo.

py test_postgres.py

echo.
echo ================================================================
pause
