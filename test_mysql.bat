@echo off
TITLE INDUS HEALTH CITY - MySQL / JDBC Database Connection Tester
cd /d "%~dp0"
echo ================================================================
echo Testing MySQL Connection for INDUS HEALTH CITY (at_health_city)
echo Database Host: atri.cluster-ro-cdk4i6gkepve.ap-south-1.rds.amazonaws.com:3306
echo Database Name: at_health_city
echo ================================================================
echo.

py test_mysql.py

echo.
echo ================================================================
pause
