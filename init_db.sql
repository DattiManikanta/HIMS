-- ==============================================================================
-- INDUS HEALTH CITY MANAGEMENT SYSTEM - POSTGRESQL SCHEMA INITIALIZATION
-- ==============================================================================

-- Create Tables
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

-- Indexes for Fast Querying
CREATE INDEX IF NOT EXISTS idx_patients_token ON patients(token);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);
CREATE INDEX IF NOT EXISTS idx_patient_vitals_token ON patient_vitals(token);
CREATE INDEX IF NOT EXISTS idx_pharmacy_invoices_token ON pharmacy_invoices(token);
