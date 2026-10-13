"""
INDUS HEALTH CITY - Hospital Management System & HIMS Backend API
Supports MySQL (via JDBC Connection URL) & PostgreSQL with Automatic Local Fallback Cache.
"""

import os
import sys
import json
import re
import logging
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv, dotenv_values

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] [%(levelname)s] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('HospitalBackend')

# Ensure UTF-8 console output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# Load environment variables from .env
load_dotenv()
env_dict = dotenv_values(".env")

app = Flask(__name__)
CORS(app)

# ------------------------------------------------------------------------------
# DATABASE CONNECTION & JDBC URL CONFIGURATION
# ------------------------------------------------------------------------------
# User's JDBC properties from HIMS:
# app.jdbc.url=jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true
# app.jdbc.username = himsd
# app.jdbc.password = himsd
JDBC_URL = env_dict.get('app.jdbc.url') or os.getenv('JDBC_URL') or "jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true"
JDBC_USER = env_dict.get('app.jdbc.username') or os.getenv('DB_USER') or "himsd"
JDBC_PASS = env_dict.get('app.jdbc.password') or os.getenv('DB_PASSWORD') or "himsd"

# Determine DB Engine (default: mysql if jdbc:mysql in url)
DB_TYPE = os.getenv('DB_TYPE', 'mysql' if 'mysql' in JDBC_URL.lower() else 'postgres').lower()

# Parse JDBC URL if MySQL
if 'mysql' in JDBC_URL.lower():
    m = re.match(r'jdbc:mysql://([^:/]+)(?::(\d+))?/([^?]+)', JDBC_URL)
    if m:
        DB_HOST = m.group(1)
        DB_PORT = int(m.group(2) or 3306)
        DB_DATABASE = m.group(3)
    else:
        DB_HOST = os.getenv('DB_HOST', '192.168.1.103')
        DB_PORT = int(os.getenv('DB_PORT', 3306))
        DB_DATABASE = os.getenv('DB_DATABASE', 'at_hospital')
    DB_USER = JDBC_USER
    DB_PASSWORD = JDBC_PASS
else:
    DB_HOST = os.getenv('PGHOST', 'localhost')
    DB_PORT = int(os.getenv('PGPORT', 5432))
    DB_DATABASE = os.getenv('PGDATABASE', 'indus_health_city')
    DB_USER = os.getenv('PGUSER', 'postgres')
    DB_PASSWORD = os.getenv('PGPASSWORD', 'postgres')

BACKEND_PORT = int(os.getenv('BACKEND_PORT', 5000))
FALLBACK_FILE = os.path.join(os.path.dirname(__file__), 'storage_fallback.json')

db_connected = False
last_db_error = None

# Initial Baseline OP Patients (Seed Data)
INITIAL_PATIENTS = {
    "CAR-104": {
        "token": "CAR-104",
        "opId": "OP-2026-8812",
        "patientName": "Rajesh Kumar",
        "age": 52,
        "gender": "Male",
        "phone": "+91 98451 22910",
        "bloodGroup": "B+",
        "department": "Cardiology & Heart Care",
        "departmentCode": "CAR",
        "doctor": "Dr. Ananya Iyer",
        "room": "Cabin 101 (1st Floor)",
        "priority": "Regular",
        "visitDate": "05-Sep-2026",
        "visitType": "Follow-up Consultation",
        "vitals": {
            "bp": "138/88 mmHg",
            "pulse": "76 bpm",
            "spo2": "98%",
            "temp": "98.4 °F",
            "weight": "74 kg",
            "bmi": "25.2 (Normal)",
            "bloodSugar": "110 mg/dL"
        },
        "symptoms": "Mild chest tightness upon climbing stairs for 3 days; history of mild hypertension.",
        "diagnosis": "Hypertensive Heart Disease (Mild, Stage 1) - Under Evaluation",
        "prescription": [
            {"medicine": "Telmisartan 40mg", "timing": "1 - 0 - 0", "instruction": "Once daily, morning after food", "duration": "30 Days"},
            {"medicine": "Atorvastatin 10mg", "timing": "0 - 0 - 1", "instruction": "Night after dinner", "duration": "30 Days"},
            {"medicine": "Ecosprin 75mg", "timing": "0 - 1 - 0", "instruction": "After lunch", "duration": "30 Days"}
        ],
        "recommendedTests": [
            {"testName": "12-Lead ECG", "status": "Completed Today (Normal sinus rhythm)"},
            {"testName": "2D Echocardiography", "status": "Scheduled 11:30 AM"},
            {"testName": "Lipid Profile & Serum Creatinine", "status": "Fasting sample tomorrow"}
        ],
        "doctorNotes": "Low salt diet recommended (< 4g/day). 30 minutes brisk walking daily. Review in OPD after 3 weeks with 2D Echo report.",
        "payment": {
            "consultationFee": 700,
            "regFee": 100,
            "totalAmount": 800,
            "paymentMethod": "UPI",
            "paymentStatus": "Paid",
            "transactionId": "TXN-881201"
        }
    },
    "GEN-211": {
        "token": "GEN-211",
        "opId": "OP-2026-8845",
        "patientName": "Gopal Krishna",
        "age": 46,
        "gender": "Male",
        "phone": "+91 98765 43210",
        "bloodGroup": "O+",
        "department": "General Medicine & Health",
        "departmentCode": "GEN",
        "doctor": "Dr. Sandeep K. Banerjee",
        "room": "Cabin 103 (Ground Floor)",
        "priority": "Regular",
        "visitDate": "05-Sep-2026",
        "visitType": "Routine OP Visit",
        "vitals": {
            "bp": "124/80 mmHg",
            "pulse": "72 bpm",
            "spo2": "99%",
            "temp": "99.1 °F",
            "weight": "68 kg",
            "bmi": "23.5 (Normal)",
            "bloodSugar": "115 mg/dL"
        },
        "symptoms": "Fatigue, low grade evening fever for past 2 days, mild dry cough.",
        "diagnosis": "Viral Upper Respiratory Tract Infection",
        "prescription": [
            {"medicine": "Paracetamol 650mg", "timing": "1 - 1 - 1", "instruction": "As needed for body aches/fever (SOS)", "duration": "3 Days"},
            {"medicine": "Levocetirizine 5mg", "timing": "0 - 0 - 1", "instruction": "At bedtime", "duration": "5 Days"},
            {"medicine": "Vitamin C + Zinc Chewable", "timing": "1 - 0 - 0", "instruction": "After breakfast", "duration": "10 Days"}
        ],
        "recommendedTests": [
            {"testName": "Complete Blood Picture (CBP)", "status": "Sample collected at central lab"},
            {"testName": "Rapid Viral Antigen Swab", "status": "Negative (Non-COVID)"}
        ],
        "doctorNotes": "Warm saline gargling thrice daily. High protein and warm fluid diet. Rest for 48 hours.",
        "payment": {
            "consultationFee": 600,
            "regFee": 100,
            "totalAmount": 700,
            "paymentMethod": "Cash",
            "paymentStatus": "Paid",
            "transactionId": "TXN-884502"
        }
    },
    "ORT-082": {
        "token": "ORT-082",
        "opId": "OP-2026-8790",
        "patientName": "Sunita Devi",
        "age": 58,
        "gender": "Female",
        "phone": "+91 94401 88231",
        "bloodGroup": "A+",
        "department": "Orthopedics & Joint Care",
        "departmentCode": "ORT",
        "doctor": "Dr. Vikramaditya Rathore",
        "room": "Cabin 102 (1st Floor)",
        "priority": "Senior Citizen",
        "visitDate": "05-Sep-2026",
        "visitType": "Chronic Joint Pain Follow-up",
        "vitals": {
            "bp": "130/84 mmHg",
            "pulse": "78 bpm",
            "spo2": "98%",
            "temp": "98.6 °F",
            "weight": "71 kg",
            "bmi": "28.4 (Overweight)",
            "bloodSugar": "128 mg/dL"
        },
        "symptoms": "Bilateral knee stiffness, pain aggravated by climbing stairs; worse in left knee for 6 months.",
        "diagnosis": "Primary Osteoarthritis Knees (Bilateral, Grade 2)",
        "prescription": [
            {"medicine": "Diacerein + Glucosamine 500mg", "timing": "1 - 0 - 1", "instruction": "Twice daily after meals", "duration": "60 Days"},
            {"medicine": "Calcium Citrate Malate + Vit D3", "timing": "0 - 1 - 0", "instruction": "After lunch", "duration": "30 Days"},
            {"medicine": "Aceclofenac Gel 1.5%", "timing": "Topical", "instruction": "Gentle local application on knee joints twice daily", "duration": "30 Days"}
        ],
        "recommendedTests": [
            {"testName": "X-Ray Both Knees (Standing AP & Lateral)", "status": "Completed Today (Joint space reduction seen)"},
            {"testName": "Serum Uric Acid & ESR", "status": "Pending lab report"}
        ],
        "doctorNotes": "Physiotherapy referral: Quadriceps strengthening exercises. Avoid squatting and sitting on the floor.",
        "payment": {
            "consultationFee": 750,
            "regFee": 100,
            "totalAmount": 850,
            "paymentMethod": "Card",
            "paymentStatus": "Paid",
            "transactionId": "TXN-879003"
        }
    }
}

INITIAL_DEPARTMENTS = [
    {
        "id": "cardiology",
        "name": "Cardiology & Heart Care",
        "code": "CAR",
        "currentToken": "CAR-104",
        "nextToken": "CAR-105",
        "status": "Active",
        "queue": [
            {"token": "CAR-104", "patient": "Rajesh Kumar", "priority": "Regular", "status": "In Consultation", "room": "Cabin 101"},
            {"token": "CAR-105", "patient": "Meenakshi Sundaram", "priority": "Regular", "status": "Waiting (Next)", "room": "Cabin 101"},
            {"token": "CAR-106", "patient": "Kavita Sharma", "priority": "Regular", "status": "In Waiting Area", "room": "Cabin 101"}
        ]
    },
    {
        "id": "orthopedics",
        "name": "Orthopedics & Joint Care",
        "code": "ORT",
        "currentToken": "ORT-082",
        "nextToken": "ORT-083",
        "status": "Active",
        "queue": [
            {"token": "ORT-082", "patient": "Sunita Devi", "priority": "Senior Citizen", "status": "In Consultation", "room": "Cabin 102"},
            {"token": "ORT-083", "patient": "Mohit Bansal", "priority": "Regular", "status": "Waiting (Next)", "room": "Cabin 102"}
        ]
    },
    {
        "id": "general",
        "name": "General Medicine & Health",
        "code": "GEN",
        "currentToken": "GEN-211",
        "nextToken": "GEN-212",
        "status": "Active",
        "queue": [
            {"token": "GEN-211", "patient": "Gopal Krishna", "priority": "Regular", "status": "In Consultation", "room": "Cabin 103"},
            {"token": "GEN-212", "patient": "Deepak Verma", "priority": "Regular", "status": "Waiting (Next)", "room": "Cabin 103"}
        ]
    }
]


# ------------------------------------------------------------------------------
# LOCAL FALLBACK STORAGE
# ------------------------------------------------------------------------------

def load_fallback_data():
    """Load cached fallback data from local storage."""
    if os.path.exists(FALLBACK_FILE):
        try:
            with open(FALLBACK_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception as e:
            logger.warning("Could not read fallback storage: %s", e)
    
    initial = {
        "patients": INITIAL_PATIENTS,
        "departments": INITIAL_DEPARTMENTS,
        "pharmacy_invoices": {}
    }
    save_fallback_data(initial)
    return initial


def save_fallback_data(data):
    """Save data to local fallback JSON file."""
    try:
        with open(FALLBACK_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, default=str)
    except Exception as e:
        logger.error("Error saving fallback file: %s", e)


# ------------------------------------------------------------------------------
# DATABASE CONNECTION FACTORY
# ------------------------------------------------------------------------------

def get_active_db_config():
    """Dynamically read the latest JDBC properties from .env."""
    from dotenv import dotenv_values
    env = dotenv_values(os.path.join(os.path.dirname(__file__), '.env'))
    jdbc = env.get('app.jdbc.url') or JDBC_URL
    user = env.get('app.jdbc.username') or env.get('DB_USER') or JDBC_USER
    password = env.get('app.jdbc.password') or env.get('DB_PASSWORD') or JDBC_PASS
    m = re.match(r'jdbc:mysql://([^:/]+)(?::(\d+))?/([^?]+)', jdbc)
    if m:
        host = m.group(1)
        port = int(m.group(2) or 3306)
        database = m.group(3)
    else:
        host = env.get('DB_HOST') or DB_HOST
        port = int(env.get('DB_PORT') or 3306)
        database = env.get('DB_DATABASE') or DB_DATABASE
    return host, port, user, password, database


def get_db_connection(dbname=None):
    """Create connection to active database (MySQL or PostgreSQL)."""
    host, port, user, password, database = get_active_db_config()
    target_db = dbname or database
    if DB_TYPE == 'mysql':
        import pymysql
        return pymysql.connect(
            host=host,
            port=port,
            user=user,
            password=password,
            database=target_db,
            charset='utf8mb4',
            connect_timeout=5,
            cursorclass=pymysql.cursors.Cursor
        )
    else:
        import psycopg2
        database_url = os.getenv('DATABASE_URL')
        if database_url and not dbname:
            return psycopg2.connect(database_url)
        return psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=target_db,
            user=DB_USER,
            password=DB_PASSWORD,
            connect_timeout=3
        )


last_db_attempt_time = 0

def init_database(force=False):
    """Initialize database tables and seed baseline records."""
    global db_connected, last_db_error, last_db_attempt_time
    import time
    now = time.time()
    if not force and not db_connected and (now - last_db_attempt_time < 20):
        return False
    last_db_attempt_time = now

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        if DB_TYPE == 'mysql':
            # MySQL Schema for at_hospital
            cur.execute("""
            CREATE TABLE IF NOT EXISTS patients (
                op_id VARCHAR(50) PRIMARY KEY,
                token VARCHAR(50) UNIQUE NOT NULL,
                patient_name VARCHAR(255) NOT NULL,
                age INT,
                gender VARCHAR(20),
                phone VARCHAR(50),
                blood_group VARCHAR(10),
                department VARCHAR(100),
                department_code VARCHAR(20),
                doctor VARCHAR(100),
                room VARCHAR(50),
                priority VARCHAR(50) DEFAULT 'Regular',
                visit_date VARCHAR(50),
                visit_type VARCHAR(100),
                symptoms TEXT,
                diagnosis TEXT,
                doctor_notes TEXT,
                payment_json TEXT,
                vitals_json TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS patient_vitals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                token VARCHAR(50) NOT NULL,
                bp VARCHAR(50),
                pulse VARCHAR(50),
                spo2 VARCHAR(50),
                temp VARCHAR(50),
                weight VARCHAR(50),
                bmi VARCHAR(50),
                blood_sugar VARCHAR(50),
                triage_notes TEXT,
                recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS patient_prescriptions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                token VARCHAR(50) NOT NULL,
                prescription_items TEXT,
                recommended_tests TEXT,
                doctor_notes TEXT,
                prescribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS pharmacy_invoices (
                invoice_no VARCHAR(50) PRIMARY KEY,
                token VARCHAR(50),
                op_id VARCHAR(50),
                patient_name VARCHAR(255),
                doctor VARCHAR(100),
                department VARCHAR(100),
                pharmacist_name VARCHAR(150),
                items TEXT,
                subtotal DECIMAL(10, 2),
                tax DECIMAL(10, 2),
                grand_total DECIMAL(10, 2),
                dispense_date VARCHAR(50),
                dispense_time VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS department_queues (
                department_id VARCHAR(50) PRIMARY KEY,
                department_name VARCHAR(100),
                code VARCHAR(20),
                current_token VARCHAR(50),
                next_token VARCHAR(50),
                status VARCHAR(50),
                queue_items TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
            """)
        else:
            # PostgreSQL Schema
            cur.execute("""
            CREATE TABLE IF NOT EXISTS patients (
                op_id VARCHAR(50) PRIMARY KEY,
                token VARCHAR(50) UNIQUE NOT NULL,
                patient_name VARCHAR(255) NOT NULL,
                age INT,
                gender VARCHAR(20),
                phone VARCHAR(50),
                blood_group VARCHAR(10),
                department VARCHAR(100),
                department_code VARCHAR(20),
                doctor VARCHAR(100),
                room VARCHAR(50),
                priority VARCHAR(50) DEFAULT 'Regular',
                visit_date VARCHAR(50),
                visit_type VARCHAR(100),
                symptoms TEXT,
                diagnosis TEXT,
                doctor_notes TEXT,
                payment_json JSONB,
                vitals_json JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS patient_vitals (
                id SERIAL PRIMARY KEY,
                token VARCHAR(50) REFERENCES patients(token) ON DELETE CASCADE,
                bp VARCHAR(50),
                pulse VARCHAR(50),
                spo2 VARCHAR(50),
                temp VARCHAR(50),
                weight VARCHAR(50),
                bmi VARCHAR(50),
                blood_sugar VARCHAR(50),
                triage_notes TEXT,
                recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS patient_prescriptions (
                id SERIAL PRIMARY KEY,
                token VARCHAR(50) REFERENCES patients(token) ON DELETE CASCADE,
                prescription_items JSONB,
                recommended_tests JSONB,
                doctor_notes TEXT,
                prescribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS pharmacy_invoices (
                invoice_no VARCHAR(50) PRIMARY KEY,
                token VARCHAR(50),
                op_id VARCHAR(50),
                patient_name VARCHAR(255),
                doctor VARCHAR(100),
                department VARCHAR(100),
                pharmacist_name VARCHAR(150),
                items JSONB,
                subtotal NUMERIC(10, 2),
                tax NUMERIC(10, 2),
                grand_total NUMERIC(10, 2),
                dispense_date VARCHAR(50),
                dispense_time VARCHAR(50),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS department_queues (
                department_id VARCHAR(50) PRIMARY KEY,
                department_name VARCHAR(100),
                code VARCHAR(20),
                current_token VARCHAR(50),
                next_token VARCHAR(50),
                status VARCHAR(50),
                queue_items JSONB,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            """)

        # Check if patients table is empty, seed baseline records if so
        cur.execute("SELECT COUNT(*) FROM patients")
        count = cur.fetchone()[0]
        if count == 0:
            logger.info("Database patients table is empty. Seeding baseline records...")
            fallback = load_fallback_data()
            for token, p in fallback.get("patients", {}).items():
                if DB_TYPE == 'mysql':
                    cur.execute("""
                    INSERT INTO patients (
                        op_id, token, patient_name, age, gender, phone, blood_group,
                        department, department_code, doctor, room, priority, visit_date,
                        visit_type, symptoms, diagnosis, doctor_notes, payment_json, vitals_json
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON DUPLICATE KEY UPDATE patient_name=VALUES(patient_name)
                    """, (
                        p.get('opId'), token, p.get('patientName'), p.get('age'), p.get('gender'),
                        p.get('phone'), p.get('bloodGroup'), p.get('department'), p.get('departmentCode', 'CAR'),
                        p.get('doctor'), p.get('room'), p.get('priority', 'Regular'), p.get('visitDate', '05-Sep-2026'),
                        p.get('visitType', 'OP Consultation'), p.get('symptoms'), p.get('diagnosis'), p.get('doctorNotes'),
                        json.dumps(p.get('payment', {})), json.dumps(p.get('vitals', {}))
                    ))
                else:
                    cur.execute("""
                    INSERT INTO patients (
                        op_id, token, patient_name, age, gender, phone, blood_group,
                        department, department_code, doctor, room, priority, visit_date,
                        visit_type, symptoms, diagnosis, doctor_notes, payment_json, vitals_json
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (op_id) DO NOTHING
                    """, (
                        p.get('opId'), token, p.get('patientName'), p.get('age'), p.get('gender'),
                        p.get('phone'), p.get('bloodGroup'), p.get('department'), p.get('departmentCode', 'CAR'),
                        p.get('doctor'), p.get('room'), p.get('priority', 'Regular'), p.get('visitDate', '05-Sep-2026'),
                        p.get('visitType', 'OP Consultation'), p.get('symptoms'), p.get('diagnosis'), p.get('doctorNotes'),
                        json.dumps(p.get('payment', {})), json.dumps(p.get('vitals', {}))
                    ))

        conn.commit()
        cur.close()
        conn.close()
        db_connected = True
        last_db_error = None
        logger.info("✓ Connected to %s (%s:%s/%s) and initialized schema.", DB_TYPE.upper(), DB_HOST, DB_PORT, DB_DATABASE)
        return True
    except Exception as e:
        db_connected = False
        last_db_error = str(e)
        logger.warning("! %s connection unavailable (%s:%s/%s): %s", DB_TYPE.upper(), DB_HOST, DB_PORT, DB_DATABASE, e)
        return False


# Attempt initial database connection on start
init_database()


# ------------------------------------------------------------------------------
# REST API ROUTES
# ------------------------------------------------------------------------------

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint reporting live database connection status."""
    global db_connected, last_db_error
    
    # Retry connection if currently disconnected
    if not db_connected:
        init_database()
    
    total_patients = 0
    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("SELECT COUNT(*) FROM patients")
            total_patients = cur.fetchone()[0]
            cur.close()
            conn.close()
        except Exception as e:
            db_connected = False
            last_db_error = str(e)
    else:
        fallback = load_fallback_data()
        total_patients = len(fallback.get("patients", {}))

    return jsonify({
        "status": "healthy",
        "service": "INDUS HEALTH CITY HIMS Backend",
        "database_connected": db_connected,
        "database_type": f"MySQL ({DB_DATABASE})" if (db_connected and DB_TYPE == 'mysql') else (
            "PostgreSQL" if (db_connected and DB_TYPE == 'postgres') else f"Local Cache (Target: MySQL at {DB_HOST}:{DB_PORT}/{DB_DATABASE})"
        ),
        "db_engine": DB_TYPE,
        "db_host": DB_HOST,
        "db_port": DB_PORT,
        "db_name": DB_DATABASE,
        "db_user": DB_USER,
        "jdbc_url": JDBC_URL,
        "postgres_connected": db_connected,
        "postgres_host": DB_HOST,
        "postgres_port": DB_PORT,
        "postgres_database": DB_DATABASE,
        "postgres_user": DB_USER,
        "total_patients": total_patients,
        "last_error": last_db_error
    })


@app.route('/api/db/retry', methods=['POST', 'GET'])
def retry_database_connection():
    """Force an immediate connection attempt to the MySQL hospital database."""
    connected = init_database(force=True)
    return jsonify({
        "success": connected,
        "database_connected": connected,
        "db_engine": DB_TYPE,
        "db_host": DB_HOST,
        "db_port": DB_PORT,
        "db_name": DB_DATABASE,
        "last_error": last_db_error
    })


# ------------------------------------------------------------------------------
# AT_DUMMY_TABLE TEST ENDPOINTS (Testing MySQL Database Connection)
# Table: at_dummy_table | Column: name
# ------------------------------------------------------------------------------

@app.route('/api/dummy-test', methods=['POST', 'OPTIONS'])
def save_dummy_client():
    """Insert a client name into at_dummy_table (column: name). Throws error if save fails."""
    if request.method == 'OPTIONS':
        return jsonify({"ok": True}), 200

    global db_connected, last_db_error
    data = request.get_json(silent=True) or {}
    client_name = data.get('name', '').strip()
    
    if not client_name:
        return jsonify({"success": False, "error": "Client Name is required"}), 400

    host, port, user, password, database = get_active_db_config()

    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Ensure at_dummy_table exists in MySQL
        cur.execute("""
        CREATE TABLE IF NOT EXISTS at_dummy_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        # Insert into at_dummy_table (name)
        cur.execute("INSERT INTO at_dummy_table (name) VALUES (%s)", (client_name,))
        new_id = cur.lastrowid
        conn.commit()
        cur.close()
        conn.close()
        db_connected = True
        last_db_error = None
        logger.info("✓ Inserted into MySQL at_dummy_table: id=%s, name='%s'", new_id, client_name)

        return jsonify({
            "success": True,
            "id": new_id,
            "name": client_name,
            "table": "at_dummy_table",
            "column": "name",
            "database": database,
            "host": f"{host}:{port}",
            "message": f"Successfully inserted '{client_name}' into MySQL table 'at_dummy_table'!"
        }), 200

    except Exception as e:
        error_msg = str(e)
        logger.error("Error inserting into at_dummy_table in MySQL (%s:%s/%s): %s", host, port, database, error_msg)
        db_connected = False
        last_db_error = error_msg

        # THROW ERROR DIRECTLY - DO NOT MASK OR FALL BACK TO LOCAL CACHE
        return jsonify({
            "success": False,
            "error": f"MySQL Database Error: Could not save to table 'at_dummy_table' ({host}:{port}/{database}): {error_msg}",
            "host": f"{host}:{port}",
            "database": database,
            "table": "at_dummy_table",
            "column": "name"
        }), 500


@app.route('/api/dummy-test', methods=['GET'])
def get_dummy_records():
    """Fetch all records from at_dummy_table."""
    global db_connected, last_db_error
    if not db_connected:
        init_database(force=False)

    if db_connected and DB_TYPE == 'mysql':
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
            CREATE TABLE IF NOT EXISTS at_dummy_table (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """)
            cur.execute("SELECT id, name, created_at FROM at_dummy_table ORDER BY id DESC")
            rows = cur.fetchall()
            cur.close()
            conn.close()
            
            result = []
            for r in rows:
                result.append({
                    "id": r[0],
                    "name": r[1],
                    "created_at": str(r[2]) if r[2] else "",
                    "source": "Live MySQL (at_hospital.at_dummy_table)",
                    "savedToMySQL": True
                })
            return jsonify({
                "source": "Live MySQL (at_hospital.at_dummy_table)",
                "connected": True,
                "count": len(result),
                "records": result
            })
        except Exception as e:
            logger.error("Error reading at_dummy_table: %s", e)
            db_connected = False
            last_db_error = str(e)

    fallback = load_fallback_data()
    cached = fallback.get("dummy_records", [])
    return jsonify({
        "source": "Local Fallback Cache (MySQL currently offline)",
        "connected": False,
        "count": len(cached),
        "records": cached
    })


@app.route('/api/dummy-test/<int:record_id>', methods=['DELETE'])
def delete_dummy_record(record_id):
    """Delete a record from at_dummy_table."""
    global db_connected, last_db_error
    deleted_from_mysql = False
    
    if db_connected and DB_TYPE == 'mysql':
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("DELETE FROM at_dummy_table WHERE id = %s", (record_id,))
            conn.commit()
            cur.close()
            conn.close()
            deleted_from_mysql = True
        except Exception as e:
            logger.error("Error deleting from at_dummy_table: %s", e)

    fallback = load_fallback_data()
    if "dummy_records" in fallback:
        fallback["dummy_records"] = [r for r in fallback["dummy_records"] if r.get("id") != record_id]
        save_fallback_data(fallback)

    return jsonify({"success": True, "deletedFromMySQL": deleted_from_mysql, "id": record_id})


@app.route('/api/db/retry', methods=['POST', 'OPTIONS'])
def retry_db_connection():
    """Force an immediate attempt to connect to MySQL / PostgreSQL."""
    if request.method == 'OPTIONS':
        return jsonify({"ok": True}), 200

    success = init_database(force=True)
    return jsonify({
        "success": success,
        "database_connected": db_connected,
        "db_type": DB_TYPE,
        "db_host": DB_HOST,
        "db_port": DB_PORT,
        "db_database": DB_DATABASE,
        "last_error": last_db_error
    })


@app.route('/api/records', methods=['GET'])
def get_records():
    """Fetch all patient consultation records from database or fallback cache."""
    global db_connected, last_db_error
    if not db_connected:
        init_database()

    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
            SELECT p.token, p.op_id, p.patient_name, p.age, p.gender, p.phone, p.blood_group,
                   p.department, p.department_code, p.doctor, p.room, p.priority, p.visit_date,
                   p.visit_type, p.symptoms, p.diagnosis, p.doctor_notes, p.payment_json, p.vitals_json,
                   COALESCE(pr.prescription_items, '[]'), COALESCE(pr.recommended_tests, '[]')
            FROM patients p
            LEFT JOIN (
                SELECT token, prescription_items, recommended_tests,
                       ROW_NUMBER() OVER(PARTITION BY token ORDER BY id DESC) as rn
                FROM patient_prescriptions
            ) pr ON p.token = pr.token AND pr.rn = 1
            ORDER BY p.created_at DESC
            """)
            rows = cur.fetchall()
            cur.close()
            conn.close()

            result = {}
            for row in rows:
                token = row[0]
                result[token] = {
                    "token": token,
                    "opId": row[1],
                    "patientName": row[2],
                    "age": row[3],
                    "gender": row[4],
                    "phone": row[5],
                    "bloodGroup": row[6],
                    "department": row[7],
                    "departmentCode": row[8],
                    "doctor": row[9],
                    "room": row[10],
                    "priority": row[11],
                    "visitDate": row[12],
                    "visitType": row[13],
                    "symptoms": row[14],
                    "diagnosis": row[15],
                    "doctorNotes": row[16],
                    "payment": row[17] if isinstance(row[17], dict) else json.loads(row[17] or '{}'),
                    "vitals": row[18] if isinstance(row[18], dict) else json.loads(row[18] or '{}'),
                    "prescription": row[19] if isinstance(row[19], list) else json.loads(row[19] or '[]'),
                    "recommendedTests": row[20] if isinstance(row[20], list) else json.loads(row[20] or '[]')
                }
            return jsonify(result)
        except Exception as e:
            logger.error("Error fetching records from database: %s", e)
            db_connected = False
            last_db_error = str(e)

    fallback = load_fallback_data()
    return jsonify(fallback.get("patients", {}))


@app.route('/api/records/<token>', methods=['GET'])
def get_record_by_token(token):
    """Fetch single patient record by token."""
    records = get_records().get_json()
    if token in records:
        return jsonify(records[token])
    return jsonify({"error": f"Record with token {token} not found"}), 404


@app.route('/api/register', methods=['POST'])
def register_patient():
    """Register a new patient and persist to MySQL/PostgreSQL."""
    global db_connected, last_db_error
    data = request.json or {}
    
    token = data.get('token')
    op_id = data.get('opId') or f"OP-2026-{int(datetime.now().timestamp()) % 10000}"
    patient_name = data.get('patientName', 'Unknown')
    age = int(data.get('age', 0))
    gender = data.get('gender', 'Other')
    phone = data.get('phone', '')
    blood_group = data.get('bloodGroup', 'B+')
    department = data.get('department', data.get('departmentName', 'General Medicine'))
    department_code = data.get('departmentCode', 'GEN')
    doctor = data.get('doctor', 'Consultant Doctor')
    room = data.get('room', 'OP Cabin')
    priority = data.get('priority', 'Regular')
    visit_date = data.get('visitDate', datetime.now().strftime('%d-%b-%Y'))
    visit_type = data.get('visitType', 'OPD Consultation' if priority != 'Emergency' else 'Emergency Outpatient')
    symptoms = data.get('symptoms', 'General Outpatient checkup and clinical evaluation.')
    diagnosis = data.get('diagnosis', 'Clinical Consultation in Progress (Initial OP Intake)')
    vitals = data.get('vitals', {
        "bp": "120/80 mmHg",
        "pulse": "74 bpm",
        "spo2": "99%",
        "temp": "98.6 °F",
        "weight": "65 kg",
        "bmi": "22.8 (Normal)",
        "bloodSugar": "110 mg/dL"
    })
    prescription = data.get('prescription', [
        {"medicine": "Multivitamin & Zinc Tab", "timing": "1 - 0 - 0", "instruction": "Once daily after breakfast", "duration": "15 Days"},
        {"medicine": "Hydration Oral Salts (ORS)", "timing": "As Needed", "instruction": "Dissolve in 1L fresh drinking water", "duration": "3 Days"}
    ])
    recommended_tests = data.get('recommendedTests', [
        {"testName": "Standard Vitals & Screening", "status": "Completed at Triage Desk"},
        {"testName": "Consultant Clinical Examination", "status": "In Waiting Queue"}
    ])
    doctor_notes = data.get('doctorNotes', f"Patient {patient_name} registered at OPD Desk. Priority: {priority}.")
    payment = data.get('payment', {})

    new_record = {
        "token": token,
        "opId": op_id,
        "patientName": patient_name,
        "age": age,
        "gender": gender,
        "phone": phone,
        "bloodGroup": blood_group,
        "department": department,
        "departmentCode": department_code,
        "doctor": doctor,
        "room": room,
        "priority": priority,
        "visitDate": visit_date,
        "visitType": visit_type,
        "symptoms": symptoms,
        "diagnosis": diagnosis,
        "vitals": vitals,
        "prescription": prescription,
        "recommendedTests": recommended_tests,
        "doctorNotes": doctor_notes,
        "payment": payment
    }

    if not db_connected:
        init_database()

    saved_to_db = False
    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            if DB_TYPE == 'mysql':
                cur.execute("""
                INSERT INTO patients (
                    op_id, token, patient_name, age, gender, phone, blood_group,
                    department, department_code, doctor, room, priority, visit_date,
                    visit_type, symptoms, diagnosis, doctor_notes, payment_json, vitals_json
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    patient_name = VALUES(patient_name),
                    symptoms = VALUES(symptoms),
                    payment_json = VALUES(payment_json)
                """, (
                    op_id, token, patient_name, age, gender, phone, blood_group,
                    department, department_code, doctor, room, priority, visit_date,
                    visit_type, symptoms, diagnosis, doctor_notes,
                    json.dumps(payment), json.dumps(vitals)
                ))
            else:
                cur.execute("""
                INSERT INTO patients (
                    op_id, token, patient_name, age, gender, phone, blood_group,
                    department, department_code, doctor, room, priority, visit_date,
                    visit_type, symptoms, diagnosis, doctor_notes, payment_json, vitals_json
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (token) DO UPDATE SET
                    patient_name = EXCLUDED.patient_name,
                    symptoms = EXCLUDED.symptoms,
                    payment_json = EXCLUDED.payment_json,
                    updated_at = CURRENT_TIMESTAMP
                """, (
                    op_id, token, patient_name, age, gender, phone, blood_group,
                    department, department_code, doctor, room, priority, visit_date,
                    visit_type, symptoms, diagnosis, doctor_notes,
                    json.dumps(payment), json.dumps(vitals)
                ))

            # Insert Vitals
            cur.execute("""
            INSERT INTO patient_vitals (token, bp, pulse, spo2, temp, weight, bmi, blood_sugar, triage_notes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                token, vitals.get('bp'), vitals.get('pulse'), vitals.get('spo2'),
                vitals.get('temp'), vitals.get('weight'), vitals.get('bmi'), vitals.get('bloodSugar'),
                'Registration desk triage'
            ))

            # Insert Prescription
            cur.execute("""
            INSERT INTO patient_prescriptions (token, prescription_items, recommended_tests, doctor_notes)
            VALUES (%s, %s, %s, %s)
            """, (
                token, json.dumps(prescription), json.dumps(recommended_tests), doctor_notes
            ))

            conn.commit()
            cur.close()
            conn.close()
            saved_to_db = True
            logger.info("✓ Patient %s (%s) saved to %s database.", patient_name, token, DB_TYPE.upper())
        except Exception as e:
            logger.error("Error inserting patient to database: %s", e)
            db_connected = False
            last_db_error = str(e)

    # Always update fallback cache for offline resiliency
    fallback = load_fallback_data()
    fallback["patients"][token] = new_record
    save_fallback_data(fallback)

    return jsonify({
        "success": True,
        "savedToDatabase": saved_to_db,
        "token": token,
        "opId": op_id,
        "record": new_record
    }), 201


@app.route('/api/vitals', methods=['POST'])
def save_vitals():
    """Save/update clinical vitals for a patient."""
    global db_connected, last_db_error
    data = request.json or {}
    token = data.get('token')
    vitals = data.get('vitalsData', {})
    triage_notes = data.get('triageNotes', 'Recorded at Nursing Vitals Station')

    if not token:
        return jsonify({"error": "Token is required"}), 400

    saved_to_db = False
    if not db_connected:
        init_database()

    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
            UPDATE patients 
            SET vitals_json = %s, updated_at = CURRENT_TIMESTAMP
            WHERE token = %s
            """, (json.dumps(vitals), token))

            cur.execute("""
            INSERT INTO patient_vitals (token, bp, pulse, spo2, temp, weight, bmi, blood_sugar, triage_notes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                token, vitals.get('bp'), vitals.get('pulse'), vitals.get('spo2'),
                vitals.get('temp'), vitals.get('weight'), vitals.get('bmi'), vitals.get('bloodSugar'),
                triage_notes
            ))
            conn.commit()
            cur.close()
            conn.close()
            saved_to_db = True
            logger.info("✓ Vitals for %s saved to database.", token)
        except Exception as e:
            logger.error("Error saving vitals: %s", e)
            db_connected = False
            last_db_error = str(e)

    fallback = load_fallback_data()
    if token in fallback.get("patients", {}):
        fallback["patients"][token]["vitals"] = vitals
        save_fallback_data(fallback)

    return jsonify({
        "success": True,
        "savedToDatabase": saved_to_db,
        "token": token,
        "vitals": vitals
    })


@app.route('/api/pharmacy/dispense', methods=['POST'])
def save_pharmacy_invoice():
    """Save dispensed pharmacy invoice in database."""
    global db_connected, last_db_error
    invoice = request.json or {}
    inv_no = invoice.get('invoiceNo') or f"PHARM-INV-{int(datetime.now().timestamp()) % 100000}"

    saved_to_db = False
    if not db_connected:
        init_database()

    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            if DB_TYPE == 'mysql':
                cur.execute("""
                INSERT INTO pharmacy_invoices (
                    invoice_no, token, op_id, patient_name, doctor, department,
                    pharmacist_name, items, subtotal, tax, grand_total, dispense_date, dispense_time
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE grand_total = VALUES(grand_total)
                """, (
                    inv_no, invoice.get('token'), invoice.get('opId'), invoice.get('patientName'),
                    invoice.get('doctor'), invoice.get('department'), invoice.get('pharmacistName'),
                    json.dumps(invoice.get('items', [])), float(invoice.get('subtotal', 0)),
                    float(invoice.get('tax', 0)), float(invoice.get('grandTotal', 0)),
                    invoice.get('dispenseDate'), invoice.get('dispenseTime')
                ))
            else:
                cur.execute("""
                INSERT INTO pharmacy_invoices (
                    invoice_no, token, op_id, patient_name, doctor, department,
                    pharmacist_name, items, subtotal, tax, grand_total, dispense_date, dispense_time
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (invoice_no) DO UPDATE SET grand_total = EXCLUDED.grand_total
                """, (
                    inv_no, invoice.get('token'), invoice.get('opId'), invoice.get('patientName'),
                    invoice.get('doctor'), invoice.get('department'), invoice.get('pharmacistName'),
                    json.dumps(invoice.get('items', [])), float(invoice.get('subtotal', 0)),
                    float(invoice.get('tax', 0)), float(invoice.get('grandTotal', 0)),
                    invoice.get('dispenseDate'), invoice.get('dispenseTime')
                ))
            conn.commit()
            cur.close()
            conn.close()
            saved_to_db = True
            logger.info("✓ Pharmacy invoice %s saved to database.", inv_no)
        except Exception as e:
            logger.error("Error saving pharmacy invoice: %s", e)
            db_connected = False
            last_db_error = str(e)

    fallback = load_fallback_data()
    fallback["pharmacy_invoices"][inv_no] = invoice
    save_fallback_data(fallback)

    return jsonify({
        "success": True,
        "savedToDatabase": saved_to_db,
        "invoiceNo": inv_no
    }), 201


@app.route('/api/departments', methods=['GET', 'POST'])
def handle_departments():
    """Get or update department live queue state in database."""
    global db_connected, last_db_error
    if request.method == 'POST':
        departments = request.json or []
        saved_to_db = False
        if not db_connected:
            init_database()

        if db_connected:
            try:
                conn = get_db_connection()
                cur = conn.cursor()
                for dep in departments:
                    if DB_TYPE == 'mysql':
                        cur.execute("""
                        INSERT INTO department_queues (department_id, department_name, code, current_token, next_token, status, queue_items)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE
                            current_token = VALUES(current_token),
                            next_token = VALUES(next_token),
                            status = VALUES(status),
                            queue_items = VALUES(queue_items)
                        """, (
                            dep.get('id'), dep.get('name'), dep.get('code'),
                            dep.get('currentToken'), dep.get('nextToken'), dep.get('status'),
                            json.dumps(dep.get('queue', []))
                        ))
                    else:
                        cur.execute("""
                        INSERT INTO department_queues (department_id, department_name, code, current_token, next_token, status, queue_items)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ON CONFLICT (department_id) DO UPDATE SET
                            current_token = EXCLUDED.current_token,
                            next_token = EXCLUDED.next_token,
                            status = EXCLUDED.status,
                            queue_items = EXCLUDED.queue_items,
                            updated_at = CURRENT_TIMESTAMP
                        """, (
                            dep.get('id'), dep.get('name'), dep.get('code'),
                            dep.get('currentToken'), dep.get('nextToken'), dep.get('status'),
                            json.dumps(dep.get('queue', []))
                        ))
                conn.commit()
                cur.close()
                conn.close()
                saved_to_db = True
            except Exception as e:
                logger.error("Error updating department queues: %s", e)
                db_connected = False
                last_db_error = str(e)

        fallback = load_fallback_data()
        fallback["departments"] = departments
        save_fallback_data(fallback)
        return jsonify({"success": True, "savedToDatabase": saved_to_db})

    # GET method
    if not db_connected:
        init_database()

    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("SELECT department_id, department_name, code, current_token, next_token, status, queue_items FROM department_queues")
            rows = cur.fetchall()
            cur.close()
            conn.close()
            if rows:
                result = []
                for row in rows:
                    result.append({
                        "id": row[0],
                        "name": row[1],
                        "code": row[2],
                        "currentToken": row[3],
                        "nextToken": row[4],
                        "status": row[5],
                        "queue": row[6] if isinstance(row[6], list) else json.loads(row[6] or '[]')
                    })
                return jsonify(result)
        except Exception as e:
            logger.error("Error fetching departments: %s", e)
            db_connected = False
            last_db_error = str(e)

    fallback = load_fallback_data()
    return jsonify(fallback.get("departments", []))


if __name__ == '__main__':
    logger.info("Starting INDUS HEALTH CITY (%s %s:%d/%s) API backend on port %d...", 
                DB_TYPE.upper(), DB_HOST, DB_PORT, DB_DATABASE, BACKEND_PORT)
    try:
        app.run(host='0.0.0.0', port=BACKEND_PORT, debug=False)
    except OSError as e:
        logger.warning("Port %d is already occupied (e.g. by Spring Boot backend). The API service is already active on port %d!", BACKEND_PORT, BACKEND_PORT)

