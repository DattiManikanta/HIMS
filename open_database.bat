@echo off
TITLE INDUS HEALTH CITY - Open Database Explorer
cd /d "%~dp0"
echo ================================================================
echo           OPENING INDUS HEALTH CITY DATABASE EXPLORER
echo ================================================================
echo.

echo Opening Database in your Web Browser...
start http://localhost:3000
timeout /t 1 >nul
start http://localhost:3000/api/records

echo.
echo Displaying Database Records in Console:
py view_database.py

echo.
echo ================================================================
echo Tip: Click "Database Explorer" tab in the web portal to view,
echo filter, search, and export database tables to CSV!
echo ================================================================
pause
