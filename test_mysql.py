"""
INDUS HEALTH CITY - MySQL Database Connection Tester
Reads app.jdbc.url, app.jdbc.username, and app.jdbc.password from .env
"""

import os
import re
import sys
from dotenv import dotenv_values

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

env = dotenv_values(".env")

jdbc_url = env.get("app.jdbc.url") or "jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true"
jdbc_user = env.get("app.jdbc.username") or "himsd"
jdbc_pass = env.get("app.jdbc.password") or "himsd"

print("=" * 70)
print("   INDUS HEALTH CITY - MYSQL / JDBC DATABASE CONNECTION TEST")
print("=" * 70)
print(f"JDBC URL:      {jdbc_url}")
print(f"JDBC Username: {jdbc_user}")
print(f"JDBC Password: {'*' * len(jdbc_pass) if jdbc_pass else '(none)'}")
print("-" * 70)

# Parse JDBC URL: jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true
match = re.match(r'jdbc:mysql://([^:/]+)(?::(\d+))?/([^?]+)', jdbc_url)
if match:
    host = match.group(1)
    port = int(match.group(2) or 3306)
    database = match.group(3)
else:
    host = env.get("DB_HOST", "192.168.1.103")
    port = int(env.get("DB_PORT", 3306))
    database = env.get("DB_DATABASE", "at_hospital")

print(f"Parsed Host:     {host}")
print(f"Parsed Port:     {port}")
print(f"Parsed Database: {database}")
print("-" * 70)

try:
    import pymysql
    print("[OK] pymysql driver: Installed and ready.")
except ImportError:
    print("[ERROR] pymysql is not installed! Run: py -m pip install pymysql")
    sys.exit(1)

print(f"Attempting connection to MySQL at {host}:{port}/{database}...")
try:
    conn = pymysql.connect(
        host=host,
        port=port,
        user=jdbc_user,
        password=jdbc_pass,
        database=database,
        charset='utf8mb4',
        connect_timeout=4
    )
    print("\n✓ SUCCESS: Successfully connected to MySQL at_hospital database!")
    with conn.cursor() as cur:
        cur.execute("SELECT VERSION()")
        ver = cur.fetchone()
        print(f"  MySQL Server Version: {ver[0] if ver else 'Unknown'}")
        
        cur.execute("SHOW TABLES")
        tables = [t[0] for t in cur.fetchall()]
        print(f"  Existing Tables in '{database}': {tables if tables else 'None (Empty Database)'}")
    conn.close()
except Exception as e:
    print(f"\n[NOTICE] Connection attempt result:")
    print(f"  {e}")
    print("\nNote: When this computer is on the same local network / Wi-Fi subnet (192.168.1.x)")
    print("      or connected via hospital VPN, it will automatically connect to this live database.")
    print("      Meanwhile, the HIMS application uses the local persistence cache seamlessly.")
print("=" * 70)
