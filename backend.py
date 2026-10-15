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

            cur.execute("""
            CREATE TABLE IF NOT EXISTS at_pr_patient (
                patient_id INT AUTO_INCREMENT PRIMARY KEY,
                umr_num VARCHAR(50) UNIQUE,
                patient_name VARCHAR(150),
                last_name VARCHAR(150),
                title VARCHAR(20),
                gender VARCHAR(20),
                dob VARCHAR(30),
                age VARCHAR(20),
                age_m VARCHAR(20),
                age_d VARCHAR(20),
                mob_num VARCHAR(30),
                land_phn VARCHAR(30),
                addr VARCHAR(255),
                village VARCHAR(100),
                city VARCHAR(100),
                state VARCHAR(100),
                country VARCHAR(100),
                pin VARCHAR(20),
                marital_status VARCHAR(30),
                blood_grp VARCHAR(20),
                nationality VARCHAR(50),
                religion VARCHAR(50),
                parent_name VARCHAR(150),
                care_by VARCHAR(50),
                care_by_name VARCHAR(150),
                id_proof_type VARCHAR(50),
                id_proof_num VARCHAR(100),
                patient_category VARCHAR(50),
                patient_category_name VARCHAR(100),
                credit_org_id VARCHAR(50),
                org_id VARCHAR(50),
                ref_type VARCHAR(50),
                ref_id VARCHAR(50),
                ref_name VARCHAR(150),
                other_staff_id VARCHAR(50),
                other_staff_name VARCHAR(150),
                other_hosp_id VARCHAR(50),
                other_hosp_name VARCHAR(150),
                occupation VARCHAR(100),
                sms_status VARCHAR(10),
                sms_alert VARCHAR(10),
                status_id INT DEFAULT 34,
                doc_status VARCHAR(10) DEFAULT 'y',
                emp_id INT,
                reg_dt DATETIME DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                added_on DATETIME DEFAULT CURRENT_TIMESTAMP,
                modified_by VARCHAR(100),
                modified_ip VARCHAR(100),
                modified_on DATETIME
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS at_pr_appt (
                patient_appt_id INT AUTO_INCREMENT PRIMARY KEY,
                patient_id INT,
                umr_num VARCHAR(50),
                op_num VARCHAR(50),
                token_num VARCHAR(50),
                priority_no INT DEFAULT 1,
                emp_id INT,
                doc_name VARCHAR(150),
                dept_id INT,
                dept_name VARCHAR(100),
                loc_id INT DEFAULT 1,
                loc_name VARCHAR(100) DEFAULT 'Main Hospital',
                visit_type VARCHAR(50) DEFAULT '174',
                appt_status_id VARCHAR(50) DEFAULT '159',
                bill_status VARCHAR(50) DEFAULT '17',
                diseases_desc TEXT,
                schedule_dt VARCHAR(50),
                start_time VARCHAR(20),
                reg_fee DECIMAL(10,2) DEFAULT 0,
                cons_fee DECIMAL(10,2) DEFAULT 0,
                tot_amt DECIMAL(10,2) DEFAULT 0,
                amt_recd DECIMAL(10,2) DEFAULT 0,
                reg_cash DECIMAL(10,2) DEFAULT 0,
                reg_card DECIMAL(10,2) DEFAULT 0,
                reg_upi DECIMAL(10,2) DEFAULT 0,
                con_cash DECIMAL(10,2) DEFAULT 0,
                con_card DECIMAL(10,2) DEFAULT 0,
                con_upi DECIMAL(10,2) DEFAULT 0,
                ref_type VARCHAR(50),
                ref_id VARCHAR(50),
                other_staff_id VARCHAR(50),
                other_hosp_id VARCHAR(50),
                status_id INT DEFAULT 34,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                added_on DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            """)

            cur.execute("""
            CREATE TABLE IF NOT EXISTS at_bills (
                bill_id INT AUTO_INCREMENT PRIMARY KEY,
                patient_id INT,
                appt_id INT,
                umr_num VARCHAR(50),
                bill_no VARCHAR(50),
                bill_amt DECIMAL(10,2) DEFAULT 0,
                amt_received DECIMAL(10,2) DEFAULT 0,
                payment_type VARCHAR(50),
                bill_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                modified_by VARCHAR(100),
                modified_ip VARCHAR(100),
                modified_on DATETIME
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

            CREATE TABLE IF NOT EXISTS at_pr_patient (
                patient_id SERIAL PRIMARY KEY,
                umr_num VARCHAR(50) UNIQUE,
                patient_name VARCHAR(150),
                last_name VARCHAR(150),
                title VARCHAR(20),
                gender VARCHAR(20),
                dob VARCHAR(30),
                age VARCHAR(20),
                age_m VARCHAR(20),
                age_d VARCHAR(20),
                mob_num VARCHAR(30),
                land_phn VARCHAR(30),
                addr VARCHAR(255),
                village VARCHAR(100),
                city VARCHAR(100),
                state VARCHAR(100),
                country VARCHAR(100),
                pin VARCHAR(20),
                marital_status VARCHAR(30),
                blood_grp VARCHAR(20),
                nationality VARCHAR(50),
                religion VARCHAR(50),
                parent_name VARCHAR(150),
                care_by VARCHAR(50),
                care_by_name VARCHAR(150),
                id_proof_type VARCHAR(50),
                id_proof_num VARCHAR(100),
                patient_category VARCHAR(50),
                patient_category_name VARCHAR(100),
                credit_org_id VARCHAR(50),
                org_id VARCHAR(50),
                ref_type VARCHAR(50),
                ref_id VARCHAR(50),
                ref_name VARCHAR(150),
                other_staff_id VARCHAR(50),
                other_staff_name VARCHAR(150),
                other_hosp_id VARCHAR(50),
                other_hosp_name VARCHAR(150),
                occupation VARCHAR(100),
                sms_status VARCHAR(10),
                sms_alert VARCHAR(10),
                status_id INT DEFAULT 34,
                doc_status VARCHAR(10) DEFAULT 'y',
                emp_id INT,
                reg_dt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                modified_by VARCHAR(100),
                modified_ip VARCHAR(100),
                modified_on TIMESTAMP WITH TIME ZONE
            );

            CREATE TABLE IF NOT EXISTS at_pr_appt (
                patient_appt_id SERIAL PRIMARY KEY,
                patient_id INT,
                umr_num VARCHAR(50),
                op_num VARCHAR(50),
                token_num VARCHAR(50),
                priority_no INT DEFAULT 1,
                emp_id INT,
                doc_name VARCHAR(150),
                dept_id INT,
                dept_name VARCHAR(100),
                loc_id INT DEFAULT 1,
                loc_name VARCHAR(100) DEFAULT 'Main Hospital',
                visit_type VARCHAR(50) DEFAULT '174',
                appt_status_id VARCHAR(50) DEFAULT '159',
                bill_status VARCHAR(50) DEFAULT '17',
                diseases_desc TEXT,
                schedule_dt VARCHAR(50),
                start_time VARCHAR(20),
                reg_fee NUMERIC(10,2) DEFAULT 0,
                cons_fee NUMERIC(10,2) DEFAULT 0,
                tot_amt NUMERIC(10,2) DEFAULT 0,
                amt_recd NUMERIC(10,2) DEFAULT 0,
                reg_cash NUMERIC(10,2) DEFAULT 0,
                reg_card NUMERIC(10,2) DEFAULT 0,
                reg_upi NUMERIC(10,2) DEFAULT 0,
                con_cash NUMERIC(10,2) DEFAULT 0,
                con_card NUMERIC(10,2) DEFAULT 0,
                con_upi NUMERIC(10,2) DEFAULT 0,
                ref_type VARCHAR(50),
                ref_id VARCHAR(50),
                other_staff_id VARCHAR(50),
                other_hosp_id VARCHAR(50),
                status_id INT DEFAULT 34,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                added_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS at_bills (
                bill_id SERIAL PRIMARY KEY,
                patient_id INT,
                appt_id INT,
                umr_num VARCHAR(50),
                bill_no VARCHAR(50),
                bill_amt NUMERIC(10,2) DEFAULT 0,
                amt_received NUMERIC(10,2) DEFAULT 0,
                payment_type VARCHAR(50),
                bill_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                added_by VARCHAR(100),
                added_ip VARCHAR(100),
                modified_by VARCHAR(100),
                modified_ip VARCHAR(100),
                modified_on TIMESTAMP WITH TIME ZONE
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
@app.route('/api/patient/register', methods=['POST'])
@app.route('/patient/registerPatient', methods=['POST', 'GET'])
def register_patient():
    """Register a new patient and persist to MySQL/PostgreSQL (at_pr_patient, at_pr_appt, at_bills, patients)."""
    global db_connected, last_db_error
    data = request.json or request.form.to_dict() or {}
    
    umr_no = data.get('umrNo') or data.get('patientCode') or data.get('opId')
    fallback = load_fallback_data()
    q_len = len(fallback.get('patientQueue', []))
    if not umr_no:
        umr_no = f"UMR{334253 + q_len + 1}"
    
    token = data.get('token') or data.get('tokenNum') or f"OPD-{120 + q_len + 1}"
    op_id = data.get('opId') or umr_no
    
    ptitle = data.get('title') or data.get('ptitle', 'Mr')
    pname = data.get('patientName') or data.get('pname', 'Unknown')
    last_name = data.get('lastName') or data.get('lName', '')
    patient_name = f"{ptitle} {pname} {last_name}".strip() if (last_name or ptitle) else pname
    
    age = int(data.get('age') or data.get('years', 0))
    gender = data.get('gender', 'Other')
    phone = data.get('phone') or data.get('mobile') or data.get('mobNum', '')
    blood_group = data.get('bloodGroup') or data.get('bloodGrp', 'B+')
    department = data.get('department') or data.get('departmentName', 'General Medicine')
    department_code = data.get('departmentCode', 'GEN')
    doctor = data.get('doctor') or data.get('consultant') or data.get('docName', 'Consultant Doctor')
    room = data.get('room', 'OP Cabin')
    priority = data.get('priority', 'Regular')
    visit_date = data.get('visitDate') or data.get('appointmentDate', datetime.now().strftime('%d-%b-%Y'))
    visit_type = data.get('visitType', 'OPD Consultation' if priority != 'Emergency' else 'Emergency Outpatient')
    category = data.get('category') or data.get('pntCat', 'GENERAL')
    address = data.get('address') or data.get('addr', '')
    village = data.get('village', '')
    city = data.get('city', 'Visakhapatnam')
    state = data.get('state', 'Andhra Pradesh')
    country = data.get('country', 'India')
    parent_name = data.get('parentName') or data.get('parentOrHusband', '')
    id_proof_type = data.get('idProofType') or data.get('idType', 'Aadhaar Card')
    id_proof_num = data.get('idProofNum') or data.get('idNumber', '')
    marital_status = data.get('maritalStatus', 'Single')
    occupation = data.get('occupation', '')

    # Fee Breakdown
    reg_fee = float(data.get('regFee') or data.get('regAmount', 50.0))
    cons_fee = float(data.get('consFee') or data.get('consAmount', 850.0))
    tot_amt = float(data.get('totAmt') or data.get('totalAmount', reg_fee + cons_fee))
    amt_recd = float(data.get('amtRecd') or data.get('amountReceived', tot_amt))

    reg_cash = float(data.get('regCash') or data.get('regAmoCash', 0.0))
    reg_card = float(data.get('regCard') or data.get('regAmoCard', 0.0))
    reg_upi = float(data.get('regUpi') or data.get('regAmoUpi', 0.0))
    con_cash = float(data.get('conCash') or data.get('conAmoCash', 0.0))
    con_card = float(data.get('conCard') or data.get('conAmoCard', 0.0))
    con_upi = float(data.get('conUpi') or data.get('conAmoUpi', 0.0))

    payment_mode = data.get('paymentMode', 'Cash')
    if reg_cash == 0 and reg_card == 0 and reg_upi == 0 and con_cash == 0 and con_card == 0 and con_upi == 0:
        if payment_mode == 'UPI':
            reg_upi, con_upi = reg_fee, cons_fee
        elif payment_mode in ('Credit', 'Card'):
            reg_card, con_card = reg_fee, cons_fee
        else:
            reg_cash, con_cash = reg_fee, cons_fee

    symptoms = data.get('symptoms') or data.get('healthIssue', 'General Outpatient checkup and clinical evaluation.')
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
    payment = data.get('payment', {
        "regFee": reg_fee,
        "consultationFee": cons_fee,
        "totalAmount": tot_amt,
        "paymentMethod": payment_mode,
        "paymentStatus": "Paid"
    })

    new_record = {
        "token": token,
        "opId": op_id,
        "umrNo": umr_no,
        "patientCode": umr_no,
        "patientName": patient_name,
        "pname": pname,
        "lastName": last_name,
        "title": ptitle,
        "age": age,
        "gender": gender,
        "genderAge": f"{gender.upper()}/{age}yrs",
        "phone": phone,
        "mobNum": phone,
        "bloodGroup": blood_group,
        "department": department,
        "departmentCode": department_code,
        "doctor": doctor,
        "consultant": doctor,
        "docName": doctor,
        "room": room,
        "priority": priority,
        "visitDate": visit_date,
        "appointmentDate": visit_date,
        "apptDt": visit_date,
        "visitType": visit_type,
        "category": category,
        "patientCategory": category,
        "billStatus": "Paid",
        "statusInfo": "Waiting",
        "symptoms": symptoms,
        "diagnosis": diagnosis,
        "vitals": vitals,
        "prescription": prescription,
        "recommendedTests": recommended_tests,
        "doctorNotes": doctor_notes,
        "payment": payment,
        "regFee": reg_fee,
        "consFee": cons_fee,
        "totAmt": tot_amt,
        "amtRecd": amt_recd,
        "regCash": reg_cash,
        "regCard": reg_card,
        "regUpi": reg_upi,
        "conCash": con_cash,
        "conCard": con_card,
        "conUpi": con_upi,
        "address": address,
        "village": village,
        "city": city,
        "idProofType": id_proof_type,
        "idProofNum": id_proof_num,
        "parentName": parent_name
    }

    if not db_connected:
        init_database()

    saved_to_db = False
    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            # 1. Insert into at_pr_patient
            cur.execute("""
            INSERT INTO at_pr_patient (
                umr_num, patient_name, last_name, title, gender, age, mob_num, addr,
                village, city, state, country, blood_grp, marital_status, parent_name,
                id_proof_type, id_proof_num, occupation, patient_category, patient_category_name,
                status_id, added_by, added_ip
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 0, %s, 34, %s, %s)
            """, (
                umr_no, pname, last_name, ptitle, gender, str(age), phone, address,
                village, city, state, country, blood_group, marital_status, parent_name,
                id_proof_type, id_proof_num, occupation, category,
                'RECEPTIONIST', request.remote_addr or '127.0.0.1'
            ))

            patient_id = cur.lastrowid if hasattr(cur, 'lastrowid') else None

            # 2. Insert into at_pr_appt
            try:
                cur.execute("""
                INSERT INTO at_pr_appt (
                    patient_id, umr_num, op_num, token_num, visit_type,
                    appt_status_id, bill_status, schedule_dt, reg_fee, cons_fee, tot_amt,
                    reg_cash, reg_card, reg_upi, con_cash, con_card, con_upi, added_by, added_ip
                ) VALUES (%s, %s, %s, %s, '174', '159', '17', %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """, (
                    patient_id, umr_no, op_id, token, visit_date,
                    reg_fee, cons_fee, tot_amt, reg_cash, reg_card, reg_upi,
                    con_cash, con_card, con_upi, 'RECEPTIONIST', request.remote_addr or '127.0.0.1'
                ))
            except Exception as e_appt:
                print(f"[Warning] at_pr_appt insert: {e_appt}")

            conn.commit()
            cur.close()
            conn.close()
            saved_to_db = True
            logger.info("✓ Patient %s (%s, %s) saved to %s database.", patient_name, umr_no, token, DB_TYPE.upper())
        except Exception as e:
            logger.error("Error inserting patient to database: %s", e)
            db_connected = False
            last_db_error = str(e)

    # Update Fallback Cache
    fallback = load_fallback_data()
    fallback.setdefault("patients", {})[token] = new_record
    queue = fallback.setdefault("patientQueue", [])
    queue.insert(0, new_record)
    save_fallback_data(fallback)

    return jsonify({
        "success": True,
        "savedToDatabase": saved_to_db,
        "patientCode": umr_no,
        "umrNo": umr_no,
        "token": token,
        "tokenNum": token,
        "opId": op_id,
        "patientName": patient_name,
        "record": new_record
    }), 201


@app.route('/api/update', methods=['POST'])
@app.route('/api/patient/update', methods=['POST'])
@app.route('/patient/updatePatientRecord', methods=['POST'])
def update_patient_record():
    """Update an existing patient record in at_pr_patient, at_pr_appt, and patients table."""
    global db_connected, last_db_error
    data = request.json or request.form.to_dict() or {}

    umr_no = data.get('umrNo') or data.get('patientCode') or data.get('opId') or ''
    patient_id = data.get('patientId')
    pname = data.get('patientName') or data.get('pname', '')
    last_name = data.get('lastName') or data.get('lName', '')
    title = data.get('title') or data.get('ptitle', '')
    full_name = f"{title} {pname} {last_name}".strip() if (last_name or title) else pname

    gender = data.get('gender')
    age = data.get('age') or data.get('years')
    phone = data.get('phone') or data.get('mobile') or data.get('mobNum')
    blood_group = data.get('bloodGroup') or data.get('bloodGrp')
    category = data.get('category') or data.get('pntCat')
    address = data.get('address') or data.get('addr')
    village = data.get('village')
    city = data.get('city')
    consultant = data.get('consultant') or data.get('doctor') or data.get('docName')

    updated_in_db = False
    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            cur.execute("""
            UPDATE at_pr_patient SET
                patient_name = COALESCE(NULLIF(%s, ''), patient_name),
                last_name = COALESCE(NULLIF(%s, ''), last_name),
                gender = COALESCE(NULLIF(%s, ''), gender),
                age = COALESCE(NULLIF(%s, ''), age),
                mob_num = COALESCE(NULLIF(%s, ''), mob_num),
                addr = COALESCE(NULLIF(%s, ''), addr),
                village = COALESCE(NULLIF(%s, ''), village),
                city = COALESCE(NULLIF(%s, ''), city),
                blood_grp = COALESCE(NULLIF(%s, ''), blood_grp),
                patient_category = COALESCE(NULLIF(%s, ''), patient_category),
                modified_by = 'RECEPTIONIST',
                modified_on = NOW()
            WHERE umr_num = %s OR patient_id = %s
            """, (
                pname, last_name, gender, str(age) if age else '', phone, address,
                village, city, blood_group, category, umr_no, patient_id
            ))

            if consultant:
                cur.execute("""
                UPDATE at_pr_appt SET doc_name = %s WHERE umr_num = %s OR patient_id = %s
                """, (consultant, umr_no, patient_id))

            conn.commit()
            cur.close()
            conn.close()
            updated_in_db = True
            logger.info("✓ Patient %s (%s) updated in database.", full_name, umr_no)
        except Exception as e:
            logger.error("Error updating patient in database: %s", e)

    # Update Fallback Cache
    fallback = load_fallback_data()
    queue = fallback.get('patientQueue', [])
    for item in queue:
        if (umr_no and item.get('umrNo', '').lower() == umr_no.lower()) or \
           (patient_id and str(item.get('patientId')) == str(patient_id)):
            if pname: item['pname'] = pname
            if last_name: item['lastName'] = last_name
            if title: item['title'] = title
            item['patientName'] = full_name or item.get('patientName')
            if gender:
                item['gender'] = gender
                item['genderAge'] = f"{gender.upper()}/{age or item.get('age', 30)}yrs"
            if age: item['age'] = int(age)
            if phone:
                item['phone'] = phone
                item['mobNum'] = phone
            if blood_group: item['bloodGroup'] = blood_group
            if category:
                item['category'] = category
                item['patientCategory'] = category
            if address: item['address'] = address
            if village: item['village'] = village
            if city: item['city'] = city
            if consultant:
                item['consultant'] = consultant
                item['docName'] = consultant
            break
    save_fallback_data(fallback)

    return jsonify({
        "success": True,
        "updatedInDatabase": updated_in_db,
        "patientCode": umr_no,
        "umrNo": umr_no,
        "patientName": full_name,
        "message": f"Patient {full_name} details updated successfully.",
        "legacyResult": "1^<div class='col-md-12 alert alert-success alert-dismissable'><h5 style='color:white;' class='fa fa-check'></h5>Patient Details Updated.</div>^1"
    }), 200


@app.route('/api/queue', methods=['GET'])
@app.route('/api/patient/queue', methods=['GET'])
@app.route('/patient/patientQueue', methods=['GET'])
def get_patient_queue():
    """Return live appointment queue strictly queried from at_pr_patient, at_pr_appt, and at_bills."""
    global db_connected
    if not db_connected:
        init_database()

    if db_connected:
        try:
            conn = get_db_connection()
            cur = conn.cursor(dictionary=True) if DB_TYPE == 'mysql' else conn.cursor()

            # Exact query from PatientMapper.xml (getPatientQueue lines 446-760)
            sql = """
            SELECT 
                p.patient_id AS patientId,
                a.patient_appt_id AS apptId,
                p.last_name AS lName,
                p.patient_name AS pname,
                a.vital_status AS vitalStatus,
                a.file_status AS fileStatus,
                a.loc_id AS locId,
                'INDUS HEALTH CITY' AS locName,
                'INDUS HEALTH CITY' AS location,
                bill.bill_status AS status,
                CASE 
                    WHEN a.bill_status = '17' OR bill.bill_status = '17' THEN 'Paid'
                    WHEN a.bill_status = '18' OR bill.bill_status = '18' THEN 'Pending'
                    ELSE 'Paid'
                END AS billStatus,
                p.umr_num AS patientCode,
                p.umr_num AS umrNo,
                COALESCE(a.priority_no, 0) AS priorityNo,
                TRIM(CONCAT(COALESCE(p.title, ''), ' ', COALESCE(p.patient_name, ''), ' ', COALESCE(p.last_name, ''))) AS patientName,
                p.gender AS gender,
                p.blood_grp AS bloodGrp,
                p.blood_grp AS bloodGroup,
                p.mob_num AS mobNum,
                p.mob_num AS phone,
                p.age AS age,
                CONCAT(UPPER(COALESCE(p.gender, 'MALE')), '/', COALESCE(p.age, '0'), 'yrs') AS genderAge,
                p.title AS ptitle,
                p.title AS title,
                p.age_d AS ageDays,
                p.age_m AS ageMonths,
                p.location_id AS locationId,
                p.parent_name AS parentName,
                p.care_by AS careBy,
                p.care_by_name AS careByName,
                p.patient_category_name AS pntCat,
                p.patient_category AS patientCategory,
                p.patient_category AS category,
                CASE 
                    WHEN a.appt_status_id = '159' THEN 'Waiting'
                    WHEN a.appt_status_id = '42' THEN 'Visited'
                    WHEN a.appt_status_id = '41' THEN 'Cancelled'
                    ELSE 'Waiting'
                END AS statusInfo,
                a.op_num AS opCode,
                a.op_num AS opId,
                a.start_time AS startTime,
                p.state AS state,
                p.city AS city,
                p.village AS village,
                p.addr AS addr,
                p.addr AS address,
                p.marital_status AS maritalStatus,
                p.religion AS religion,
                p.id_proof_type AS idProofType,
                p.id_proof_num AS idProofNum,
                p.occupation AS occupation,
                a.ref_type AS refType,
                p.org_id AS orgId,
                p.sms_status AS smsStatus,
                p.sms_alert AS smsAlert,
                p.dob AS dob,
                p.ref_id AS refId,
                p.patient_category AS patientCategoryId,
                CASE 
                    WHEN a.visit_type = '174' THEN 'NEWVISIT'
                    WHEN a.visit_type = '175' THEN 'REVISIT'
                    ELSE 'NEWVISIT'
                END AS visitType,
                a.doc_name AS docName,
                a.doc_name AS consultant,
                a.dept_name AS department,
                COALESCE(bill.amt_received, a.amt_recd, 0.0) AS paidAmount,
                p.nationality AS nationality,
                a.diseases_desc AS problem,
                a.token_num AS tokenNum,
                a.token_num AS token,
                DATE_FORMAT(a.schedule_dt, '%d-%b-%Y') AS apptDt,
                DATE_FORMAT(a.schedule_dt, '%d-%b-%Y') AS appointmentDate,
                COALESCE(a.reg_fee, 50.0) AS regFee,
                COALESCE(a.cons_fee, 1000.0) AS consFee,
                COALESCE(a.tot_amt, 1050.0) AS totAmt,
                COALESCE(a.amt_recd, 1050.0) AS amtRecd,
                COALESCE(a.reg_cash, 0.0) AS regAmoCash,
                COALESCE(a.reg_cash, 0.0) AS regCash,
                COALESCE(a.reg_card, 0.0) AS regAmoCard,
                COALESCE(a.reg_card, 0.0) AS regCredit,
                COALESCE(a.reg_upi, 0.0) AS regAmoUpi,
                COALESCE(a.reg_upi, 0.0) AS regUpi,
                COALESCE(a.con_cash, 0.0) AS conAmoCash,
                COALESCE(a.con_cash, 0.0) AS conCash,
                COALESCE(a.con_card, 0.0) AS conAmoCard,
                COALESCE(a.con_card, 0.0) AS conCredit,
                COALESCE(a.con_upi, 0.0) AS conAmoUpi,
                COALESCE(a.con_upi, 0.0) AS conUpi,
                bill.bill_id AS billId
            FROM at_pr_patient p
            LEFT JOIN at_pr_appt a ON p.patient_id = a.patient_id
            LEFT JOIN at_bills bill ON bill.patient_id = p.patient_id
            LEFT JOIN at_location l ON l.loc_id = a.loc_id
            WHERE p.status_id = 34
            ORDER BY a.priority_no DESC, a.patient_appt_id DESC, p.patient_id DESC
            """
            cur.execute(sql)
            if DB_TYPE == 'mysql':
                rows = cur.fetchall() or []
            else:
                desc = [col[0] for col in cur.description]
                rows = [dict(zip(desc, r)) for r in cur.fetchall()]
            cur.close()
            conn.close()

            if rows:
                return jsonify(rows)
        except Exception as e:
            logger.warning("Database queue lookup failed: %s", e)

    # Fallback to local storage (strictly real registered records, NO fake dummy seed)
    fallback = load_fallback_data()
    queue = fallback.get('patientQueue', [])
    return jsonify(queue)


@app.route('/api/patient/search', methods=['GET', 'POST'])
@app.route('/patient/searchPatients', methods=['GET', 'POST'])
def search_patients():
    """Search patients by term, UMR number, mobile number, or name."""
    term = request.args.get('term') or request.args.get('umrNo') or request.args.get('mobNum') or request.args.get('pname') or ''
    term = term.lower().strip()
    fallback = load_fallback_data()
    queue = fallback.get('patientQueue', [])
    matches = [
        item for item in queue
        if not term or term in item.get('umrNo', '').lower() or \
           term in item.get('patientName', '').lower() or \
           term in item.get('phone', '').lower()
    ]
    return jsonify(matches)


@app.route('/api/patient/details', methods=['GET'])
@app.route('/patient/getPatientDetails', methods=['GET'])
def get_patient_details():
    """Fetch complete patient record by patientId or umrNo."""
    umr_no = request.args.get('umrNo') or request.args.get('patientCode')
    patient_id = request.args.get('patientId')
    fallback = load_fallback_data()
    queue = fallback.get('patientQueue', [])
    for item in queue:
        if (umr_no and item.get('umrNo', '').lower() == umr_no.lower()) or \
           (patient_id and str(item.get('patientId')) == str(patient_id)):
            return jsonify(item)
    return jsonify({"error": "Patient not found"}), 404


@app.route('/api/patient/delete', methods=['POST'])
@app.route('/patient/deletePatientRecord', methods=['POST'])
def delete_patient_record():
    """Inactivate or remove patient from queue."""
    umr_no = request.args.get('umrNo') or request.form.get('umrNo')
    patient_id = request.args.get('patientId') or request.form.get('patientId')
    fallback = load_fallback_data()
    queue = fallback.get('patientQueue', [])
    fallback['patientQueue'] = [
        item for item in queue
        if not ((umr_no and item.get('umrNo', '').lower() == umr_no.lower()) or
                (patient_id and str(item.get('patientId')) == str(patient_id)))
    ]
    save_fallback_data(fallback)
    return jsonify({"success": True, "message": "Patient record deleted / inactivated."})


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

