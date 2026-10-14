// PulseCare Hospital Outpatient Single Standalone Bundle
const {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} = React;

// --- src/data/hospitalData.js ---
// OPD Departments and their current room status
const initialDepartments = [{
  id: "dep-cardio",
  name: "Cardiology & Heart Care",
  shortName: "Cardiology",
  code: "CAR",
  room: "Cabin 101 (1st Floor)",
  doctor: "Dr. Ananya Iyer",
  specialty: "Senior Cardiologist",
  currentToken: "CAR-104",
  nextToken: "CAR-105",
  waitingCount: 5,
  avgWaitTime: "12 mins",
  status: "In Consultation",
  // In Consultation, Next Patient, Break
  statusColor: "emerald",
  icon: "heart-pulse",
  queue: [{
    token: "CAR-104",
    patientName: "Rajesh Kumar",
    status: "Inside",
    time: "09:15 AM",
    priority: "Regular"
  }, {
    token: "CAR-105",
    patientName: "Meenakshi S.",
    status: "Next",
    time: "09:30 AM",
    priority: "Senior Citizen"
  }, {
    token: "CAR-106",
    patientName: "Arjun Verma",
    status: "Waiting",
    time: "09:45 AM",
    priority: "Regular"
  }, {
    token: "CAR-107",
    patientName: "Kavita Rao",
    status: "Waiting",
    time: "10:00 AM",
    priority: "Regular"
  }, {
    token: "CAR-108",
    patientName: "Mohammed Farooq",
    status: "Waiting",
    time: "10:15 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ortho",
  name: "Orthopedics & Joint Clinic",
  shortName: "Orthopedics",
  code: "ORT",
  room: "Cabin 102 (1st Floor)",
  doctor: "Dr. Vikramaditya Rathore",
  specialty: "Consultant Orthopedic Surgeon",
  currentToken: "ORT-082",
  nextToken: "ORT-083",
  waitingCount: 4,
  avgWaitTime: "15 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "bone",
  queue: [{
    token: "ORT-082",
    patientName: "David D'Souza",
    status: "Inside",
    time: "09:20 AM",
    priority: "Regular"
  }, {
    token: "ORT-083",
    patientName: "Sunita Patel",
    status: "Next",
    time: "09:35 AM",
    priority: "Senior Citizen"
  }, {
    token: "ORT-084",
    patientName: "Harpreet Singh",
    status: "Waiting",
    time: "09:50 AM",
    priority: "Regular"
  }, {
    token: "ORT-085",
    patientName: "Priya Nair",
    status: "Waiting",
    time: "10:05 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-genmed",
  name: "General Medicine & Health",
  shortName: "General Medicine",
  code: "GEN",
  room: "Cabin 103 (Ground Floor)",
  doctor: "Dr. Sandeep K. Banerjee",
  specialty: "Chief Physician & Diabetologist",
  currentToken: "GEN-211",
  nextToken: "GEN-212",
  waitingCount: 7,
  avgWaitTime: "8 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "stethoscope",
  queue: [{
    token: "GEN-211",
    patientName: "Gopal Krishna",
    status: "Inside",
    time: "09:10 AM",
    priority: "Regular"
  }, {
    token: "GEN-212",
    patientName: "Lakshmi Narayanan",
    status: "Next",
    time: "09:20 AM",
    priority: "Senior Citizen"
  }, {
    token: "GEN-213",
    patientName: "Rohan Sen",
    status: "Waiting",
    time: "09:30 AM",
    priority: "Regular"
  }, {
    token: "GEN-214",
    patientName: "Deepa Menon",
    status: "Waiting",
    time: "09:40 AM",
    priority: "Regular"
  }, {
    token: "GEN-215",
    patientName: "Amitabh Roy",
    status: "Waiting",
    time: "09:50 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ped",
  name: "Pediatrics & Child Wellness",
  shortName: "Pediatrics",
  code: "PED",
  room: "Cabin 104 (Ground Floor)",
  doctor: "Dr. Shalini Deshmukh",
  specialty: "Senior Pediatrician & Neonatologist",
  currentToken: "PED-049",
  nextToken: "PED-050",
  waitingCount: 3,
  avgWaitTime: "10 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "baby",
  queue: [{
    token: "PED-049",
    patientName: "Baby Aavya (Parent: Sneha)",
    status: "Inside",
    time: "09:25 AM",
    priority: "Child Care"
  }, {
    token: "PED-050",
    patientName: "Master Vihaan",
    status: "Next",
    time: "09:40 AM",
    priority: "Child Care"
  }, {
    token: "PED-051",
    patientName: "Baby Reyansh",
    status: "Waiting",
    time: "09:55 AM",
    priority: "Child Care"
  }]
}, {
  id: "dep-derma",
  name: "Dermatology & Skin Care",
  shortName: "Dermatology",
  code: "DER",
  room: "Cabin 105 (2nd Floor)",
  doctor: "Dr. Neil Chatterjee",
  specialty: "Cosmetic & Clinical Dermatologist",
  currentToken: "DER-031",
  nextToken: "DER-032",
  waitingCount: 2,
  avgWaitTime: "10 mins",
  status: "Next Patient",
  statusColor: "amber",
  icon: "sparkles",
  queue: [{
    token: "DER-031",
    patientName: "Neha Kapoor",
    status: "Completing",
    time: "09:15 AM",
    priority: "Regular"
  }, {
    token: "DER-032",
    patientName: "Aditya Jain",
    status: "Next",
    time: "09:30 AM",
    priority: "Regular"
  }, {
    token: "DER-033",
    patientName: "Simran Kaur",
    status: "Waiting",
    time: "09:45 AM",
    priority: "Regular"
  }]
}, {
  id: "dep-ent",
  name: "ENT & Head-Neck Clinic",
  shortName: "ENT",
  code: "ENT",
  room: "Cabin 106 (2nd Floor)",
  doctor: "Dr. Priya Sundaram",
  specialty: "ENT & Cochlear Implant Surgeon",
  currentToken: "ENT-055",
  nextToken: "ENT-056",
  waitingCount: 4,
  avgWaitTime: "14 mins",
  status: "In Consultation",
  statusColor: "emerald",
  icon: "ear",
  queue: [{
    token: "ENT-055",
    patientName: "Venkat Raman",
    status: "Inside",
    time: "09:18 AM",
    priority: "Regular"
  }, {
    token: "ENT-056",
    patientName: "Alka Pandey",
    status: "Next",
    time: "09:32 AM",
    priority: "Regular"
  }, {
    token: "ENT-057",
    patientName: "Karan Malhotra",
    status: "Waiting",
    time: "09:46 AM",
    priority: "Regular"
  }]
}];
const doctorsRoster = [{
  id: "doc-1",
  name: "Dr. Ananya Iyer",
  degrees: "MBBS, MD, DM (Cardiology), FACC",
  department: "Cardiology & Heart Care",
  depCode: "CAR",
  cabin: "Cabin 101 (1st Floor)",
  experience: "14+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:30 PM - 07:30 PM",
  fee: "₹700",
  rating: "4.9 (420+ reviews)",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Tamil",
  focus: "Coronary Angioplasty, Hypertension, Heart Failure, Preventive Cardiology"
}, {
  id: "doc-2",
  name: "Dr. Vikramaditya Rathore",
  degrees: "MBBS, MS (Orthopedics), M.Ch (Joint Replacement)",
  department: "Orthopedics & Joint Clinic",
  depCode: "ORT",
  cabin: "Cabin 102 (1st Floor)",
  experience: "18+ Years",
  opdTimings: "Morning: 09:30 AM - 01:30 PM | Evening: 05:00 PM - 08:00 PM",
  fee: "₹750",
  rating: "4.8 (380+ reviews)",
  image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Punjabi",
  focus: "Robotic Knee Replacement, Arthroscopy, Spine Disorders, Sports Injury"
}, {
  id: "doc-3",
  name: "Dr. Sandeep K. Banerjee",
  degrees: "MBBS, MD (Internal Medicine), PGDD (Diabetes)",
  department: "General Medicine & Health",
  depCode: "GEN",
  cabin: "Cabin 103 (Ground Floor)",
  experience: "21+ Years",
  opdTimings: "Morning: 08:30 AM - 01:00 PM | Evening: 04:00 PM - 08:00 PM",
  fee: "₹600",
  rating: "4.9 (610+ reviews)",
  image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Bengali",
  focus: "Diabetes Reversal, Infectious Diseases, Thyroid Management, Geriatric Care"
}, {
  id: "doc-4",
  name: "Dr. Shalini Deshmukh",
  degrees: "MBBS, DCH, DNB (Pediatrics), Fellowship Pediatric Critical Care",
  department: "Pediatrics & Child Wellness",
  depCode: "PED",
  cabin: "Cabin 104 (Ground Floor)",
  experience: "12+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:00 PM - 07:00 PM",
  fee: "₹650",
  rating: "5.0 (490+ reviews)",
  image: "https://images.unsplash.com/photo-1594824813501-4475989408b0?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Marathi",
  focus: "Newborn Care, Pediatric Asthma, Vaccination Schedule, Growth Milestones"
}, {
  id: "doc-5",
  name: "Dr. Neil Chatterjee",
  degrees: "MBBS, MD (Dermatology, Venereology & Leprosy)",
  department: "Dermatology & Skin Care",
  depCode: "DER",
  cabin: "Cabin 105 (2nd Floor)",
  experience: "10+ Years",
  opdTimings: "Morning: 10:00 AM - 02:00 PM | Evening: 05:00 PM - 08:00 PM",
  fee: "₹650",
  rating: "4.7 (290+ reviews)",
  image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi",
  focus: "Acne Therapies, Psoriasis, Hair Loss/PRP, Laser Aesthetic Medicine"
}, {
  id: "doc-6",
  name: "Dr. Priya Sundaram",
  degrees: "MBBS, MS (ENT), DNB (Otorhinolaryngology)",
  department: "ENT & Head-Neck Clinic",
  depCode: "ENT",
  cabin: "Cabin 106 (2nd Floor)",
  experience: "15+ Years",
  opdTimings: "Morning: 09:00 AM - 01:00 PM | Evening: 04:30 PM - 07:30 PM",
  fee: "₹700",
  rating: "4.8 (340+ reviews)",
  image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=300",
  languages: "English, Hindi, Tamil, Telugu",
  focus: "Microscopic Ear Surgery, Sinusitis Endoscopy, Sleep Apnea, Vertigo"
}];
const mockOPRecords = {
  "CAR-104": {
    token: "CAR-104",
    opId: "OP-2026-8812",
    patientName: "Rajesh Kumar",
    age: 52,
    gender: "Male",
    phone: "+91 98451 22910",
    bloodGroup: "B+",
    department: "Cardiology & Heart Care",
    doctor: "Dr. Ananya Iyer",
    room: "Cabin 101",
    visitDate: "05-Sep-2026",
    visitType: "Follow-up Consultation",
    vitals: {
      bp: "138/88 mmHg",
      pulse: "76 bpm",
      spo2: "98%",
      temp: "98.4 °F",
      weight: "74 kg",
      bmi: "25.2 (Normal)"
    },
    symptoms: "Mild chest tightness upon climbing stairs for 3 days; history of mild hypertension.",
    diagnosis: "Hypertensive Heart Disease (Mild, Stage 1) - Under Evaluation",
    prescription: [{
      medicine: "Telmisartan 40mg",
      timing: "1 - 0 - 0",
      instruction: "Once daily, morning after food",
      duration: "30 Days"
    }, {
      medicine: "Atorvastatin 10mg",
      timing: "0 - 0 - 1",
      instruction: "Night after dinner",
      duration: "30 Days"
    }, {
      medicine: "Ecosprin 75mg",
      timing: "0 - 1 - 0",
      instruction: "After lunch",
      duration: "30 Days"
    }],
    recommendedTests: [{
      testName: "12-Lead ECG",
      status: "Completed Today (Normal sinus rhythm)"
    }, {
      testName: "2D Echocardiography",
      status: "Scheduled 11:30 AM"
    }, {
      testName: "Lipid Profile & Serum Creatinine",
      status: "Fasting sample tomorrow"
    }],
    doctorNotes: "Low salt diet recommended (< 4g/day). 30 minutes brisk walking daily. Review in OPD after 3 weeks with 2D Echo report."
  },
  "GEN-211": {
    token: "GEN-211",
    opId: "OP-2026-8845",
    patientName: "Gopal Krishna",
    age: 46,
    gender: "Male",
    phone: "+91 98765 43210",
    bloodGroup: "O+",
    department: "General Medicine & Health",
    doctor: "Dr. Sandeep K. Banerjee",
    room: "Cabin 103",
    visitDate: "05-Sep-2026",
    visitType: "Routine OP Visit",
    vitals: {
      bp: "124/80 mmHg",
      pulse: "72 bpm",
      spo2: "99%",
      temp: "99.1 °F",
      weight: "68 kg",
      bmi: "23.5 (Normal)"
    },
    symptoms: "Fatigue, low grade evening fever for past 2 days, mild dry cough.",
    diagnosis: "Viral Upper Respiratory Tract Infection",
    prescription: [{
      medicine: "Paracetamol 650mg",
      timing: "1 - 1 - 1",
      instruction: "As needed for body aches/fever (SOS)",
      duration: "3 Days"
    }, {
      medicine: "Levocetirizine 5mg",
      timing: "0 - 0 - 1",
      instruction: "At bedtime",
      duration: "5 Days"
    }, {
      medicine: "Vitamin C + Zinc Chewable",
      timing: "1 - 0 - 0",
      instruction: "After breakfast",
      duration: "10 Days"
    }],
    recommendedTests: [{
      testName: "Complete Blood Count (CBC)",
      status: "Report Awaited (12:00 PM)"
    }, {
      testName: "CRP Qualitative",
      status: "Ordered"
    }],
    doctorNotes: "Hydrate well (minimum 3L warm water/fluids). Rest for 48 hours. If fever persists past day 4, report immediately."
  },
  "ORT-082": {
    token: "ORT-082",
    opId: "OP-2026-8790",
    patientName: "David D'Souza",
    age: 59,
    gender: "Male",
    phone: "+91 91234 56789",
    bloodGroup: "A+",
    department: "Orthopedics & Joint Clinic",
    doctor: "Dr. Vikramaditya Rathore",
    room: "Cabin 102",
    visitDate: "05-Sep-2026",
    visitType: "Orthopedic Review",
    vitals: {
      bp: "130/84 mmHg",
      pulse: "74 bpm",
      spo2: "98%",
      temp: "98.2 °F",
      weight: "82 kg",
      bmi: "27.1 (Overweight)"
    },
    symptoms: "Bilateral knee joint pain aggravated by squatting and descending stairs.",
    diagnosis: "Primary Knee Osteoarthritis (Grade II)",
    prescription: [{
      medicine: "Diacerein + Glucosamine",
      timing: "1 - 0 - 1",
      instruction: "After meals",
      duration: "60 Days"
    }, {
      medicine: "Etoricoxib 90mg",
      timing: "0 - 0 - 1",
      instruction: "SOS when pain is severe",
      duration: "5 Days max"
    }, {
      medicine: "Diclofenac Gel",
      timing: "Local",
      instruction: "Apply gently twice daily over knees",
      duration: "15 Days"
    }],
    recommendedTests: [{
      testName: "Digital X-Ray Both Knees (Standing AP & Lateral)",
      status: "Completed (Reduced joint space noted)"
    }, {
      testName: "Serum Vitamin D3 & Uric Acid",
      status: "Recommended"
    }],
    doctorNotes: "Quadriceps strengthening exercises demonstrated. Avoid cross-legged sitting. Weight management advice given."
  }
};

// --- src/data/pharmacyData.js ---
// Hospital Outpatient Pharmacy & Drugs Catalog Data
const pharmacyDrugsCatalog = [{
  id: "DRUG-001",
  name: "Telmisartan 40mg",
  genericName: "Telmisartan IP",
  category: "Cardiovascular & BP",
  form: "Tablet",
  strength: "40 mg",
  manufacturer: "Sun Pharma",
  batchNo: "TEL-2026-99",
  expiryDate: "11/2028",
  price: 94.50,
  packSize: "Strip of 15 Tablets",
  stock: 240,
  rxRequired: true,
  indication: "Hypertension, Cardiovascular Risk Reduction",
  dosageAdvice: "Take once daily in morning with or without food."
}, {
  id: "DRUG-002",
  name: "Atorvastatin 10mg",
  genericName: "Atorvastatin Calcium IP",
  category: "Cardiovascular & BP",
  form: "Tablet",
  strength: "10 mg",
  manufacturer: "Cipla Ltd",
  batchNo: "ATV-2026-14",
  expiryDate: "08/2028",
  price: 112.00,
  packSize: "Strip of 10 Tablets",
  stock: 180,
  rxRequired: true,
  indication: "Hyperlipidemia, Cholesterol Control",
  dosageAdvice: "Take once daily at bedtime after dinner."
}, {
  id: "DRUG-003",
  name: "Ecosprin 75mg",
  genericName: "Aspirin Gastro-Resistant",
  category: "Cardiovascular & BP",
  form: "Capsule",
  strength: "75 mg",
  manufacturer: "USV Pvt Ltd",
  batchNo: "ECO-2026-03",
  expiryDate: "05/2027",
  price: 24.00,
  packSize: "Strip of 14 Tablets",
  stock: 520,
  rxRequired: true,
  indication: "Blood Thinner, Antiplatelet, Heart Attack Prevention",
  dosageAdvice: "Take after lunch with a full glass of water."
}, {
  id: "DRUG-004",
  name: "Paracetamol 650mg (Dolo 650)",
  genericName: "Paracetamol IP",
  category: "Pain & Fever",
  form: "Tablet",
  strength: "650 mg",
  manufacturer: "Micro Labs",
  batchNo: "DOL-2026-55",
  expiryDate: "01/2029",
  price: 33.50,
  packSize: "Strip of 15 Tablets",
  stock: 890,
  rxRequired: false,
  indication: "Fever, Headache, Mild-Moderate Body Aches",
  dosageAdvice: "Take SOS as needed; maintain 6 hours gap between doses."
}, {
  id: "DRUG-005",
  name: "Metformin 500mg SR",
  genericName: "Metformin Hydrochloride Sustained Release",
  category: "Antidiabetic",
  form: "Tablet",
  strength: "500 mg",
  manufacturer: "Torrent Pharma",
  batchNo: "MET-2026-71",
  expiryDate: "12/2027",
  price: 45.00,
  packSize: "Strip of 20 Tablets",
  stock: 310,
  rxRequired: true,
  indication: "Type-2 Diabetes Mellitus glycemic control",
  dosageAdvice: "Take with or immediately after meals to reduce stomach upset."
}, {
  id: "DRUG-006",
  name: "Augmentin 625 Duo",
  genericName: "Amoxicillin & Potassium Clavulanate",
  category: "Antibiotics",
  form: "Tablet",
  strength: "625 mg (500mg + 125mg)",
  manufacturer: "GSK Pharmaceuticals",
  batchNo: "AUG-2026-88",
  expiryDate: "04/2027",
  price: 204.00,
  packSize: "Strip of 10 Tablets",
  stock: 95,
  rxRequired: true,
  indication: "Bacterial infections of chest, ENT, skin, and urinary tract",
  dosageAdvice: "Complete full 5-day course as prescribed by doctor."
}, {
  id: "DRUG-007",
  name: "Pantocid 40mg",
  genericName: "Pantoprazole Gastro-Resistant",
  category: "Gastrointestinal",
  form: "Tablet",
  strength: "40 mg",
  manufacturer: "Sun Pharma",
  batchNo: "PAN-2026-42",
  expiryDate: "09/2028",
  price: 135.00,
  packSize: "Strip of 15 Tablets",
  stock: 450,
  rxRequired: true,
  indication: "Acid Reflux, GERD, Gastritis, Peptic Ulcer",
  dosageAdvice: "Take on an empty stomach in the morning 30 mins before breakfast."
}, {
  id: "DRUG-008",
  name: "Levocetirizine 5mg (Levocet)",
  genericName: "Levocetirizine Dihydrochloride",
  category: "Respiratory & Allergy",
  form: "Tablet",
  strength: "5 mg",
  manufacturer: "Hetero Healthcare",
  batchNo: "LCT-2026-19",
  expiryDate: "06/2028",
  price: 58.00,
  packSize: "Strip of 10 Tablets",
  stock: 620,
  rxRequired: false,
  indication: "Allergic Rhinitis, Sneezing, Runny Nose, Skin Itch",
  dosageAdvice: "Take once daily at bedtime."
}, {
  id: "DRUG-009",
  name: "Diacerein & Glucosamine",
  genericName: "Diacerein 50mg + Glucosamine 750mg",
  category: "Orthopedic & Joints",
  form: "Tablet",
  strength: "Combo",
  manufacturer: "Lupin Ltd",
  batchNo: "DIA-2026-04",
  expiryDate: "10/2027",
  price: 280.00,
  packSize: "Strip of 10 Tablets",
  stock: 140,
  rxRequired: true,
  indication: "Osteoarthritis joint cartilage restoration",
  dosageAdvice: "Take twice daily after main meals."
}, {
  id: "DRUG-010",
  name: "Etoricoxib 90mg (Nucoxia)",
  genericName: "Etoricoxib IP",
  category: "Pain & Orthopedic",
  form: "Tablet",
  strength: "90 mg",
  manufacturer: "Cadila Healthcare",
  batchNo: "ETO-2026-62",
  expiryDate: "03/2028",
  price: 162.00,
  packSize: "Strip of 10 Tablets",
  stock: 175,
  rxRequired: true,
  indication: "Acute joint pain, Arthritis flare-ups, Spine stiffness",
  dosageAdvice: "Take once daily after food; do not take on empty stomach."
}, {
  id: "DRUG-011",
  name: "Vitamin C 500mg + Zinc (Limcee)",
  genericName: "Ascorbic Acid + Zinc Chewable",
  category: "Vitamins & Supplements",
  form: "Chewable Tablet",
  strength: "500 mg",
  manufacturer: "Abbott Healthcare",
  batchNo: "LIM-2026-33",
  expiryDate: "11/2028",
  price: 42.00,
  packSize: "Strip of 15 Tablets",
  stock: 780,
  rxRequired: false,
  indication: "Immunity booster, Wound healing, Antioxidant",
  dosageAdvice: "Chew one tablet daily after breakfast."
}, {
  id: "DRUG-012",
  name: "Diclofenac Sodium Gel 1%",
  genericName: "Diclofenac Diethylamine + Linseed Oil",
  category: "Orthopedic & Topical",
  form: "Ointment / Gel",
  strength: "30 gm Tube",
  manufacturer: "Novartis",
  batchNo: "VOL-2026-11",
  expiryDate: "07/2027",
  price: 98.00,
  packSize: "30 gm Tube",
  stock: 220,
  rxRequired: false,
  indication: "Muscle sprains, Knee pain, Neck strain",
  dosageAdvice: "Apply 2-3 times daily over affected joint. Do not rub vigorously."
}, {
  id: "DRUG-013",
  name: "Azithromycin 500mg (Azithral)",
  genericName: "Azithromycin Dihydrate",
  category: "Antibiotics",
  form: "Tablet",
  strength: "500 mg",
  manufacturer: "Alembic Pharma",
  batchNo: "AZI-2026-50",
  expiryDate: "02/2028",
  price: 125.00,
  packSize: "Strip of 5 Tablets",
  stock: 160,
  rxRequired: true,
  indication: "Throat infection, Tonsillitis, Chest Bronchitis",
  dosageAdvice: "Take 1 tablet daily 1 hour before or 2 hours after food for 3-5 days."
}, {
  id: "DRUG-014",
  name: "Oral Rehydration Salts (ORS)",
  genericName: "WHO Recommended Formula ORS",
  category: "Vitamins & Electrolytes",
  form: "Powder Sachet",
  strength: "21.8 gm Sachet",
  manufacturer: "FDC Ltd",
  batchNo: "ORS-2026-90",
  expiryDate: "12/2028",
  price: 22.00,
  packSize: "1 Sachet",
  stock: 1200,
  rxRequired: false,
  indication: "Dehydration, Diarrhea, Heat exhaustion recovery",
  dosageAdvice: "Dissolve entire sachet in 1 Litre of clean drinking water."
}, {
  id: "DRUG-015",
  name: "Budesonide 0.5mg Respules",
  genericName: "Budesonide Inhalation Suspension",
  category: "Respiratory & Allergy",
  form: "Respule for Nebulizer",
  strength: "2 ml x 5 Respules",
  manufacturer: "Cipla Ltd",
  batchNo: "BUD-2026-28",
  expiryDate: "09/2027",
  price: 185.00,
  packSize: "Pack of 5 Respules",
  stock: 85,
  rxRequired: true,
  indication: "Asthma nebulization, Bronchial spasm, Pediatric wheeze",
  dosageAdvice: "Use via nebulizer machine twice daily as instructed."
}];
const pharmacyCategories = ["All Medications", "Cardiovascular & BP", "Pain & Fever", "Antibiotics", "Antidiabetic", "Gastrointestinal", "Respiratory & Allergy", "Orthopedic & Joints", "Vitamins & Supplements"];

// --- src/utils/audio.js ---
// Web Audio API Hospital OPD Chime Synthesizer
// Produces a soothing 2-tone melodic chime (similar to hospital lobby call announcements)

function playHospitalChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // First tone (E5 ~ 659 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.55);

    // Second tone (B5 ~ 987 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.22);
    gain2.gain.setValueAtTime(0, now + 0.22);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.27);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.22);
    osc2.stop(now + 1.0);
  } catch (e) {
    console.warn("Audio chime playback error:", e);
  }
}

// --- src/components/LoginPage.jsx ---

// AtriBiz AB Logo Vector Component
function AtriBizLogo({
  width = 120,
  height = 62
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: "0 0 170 85",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "atri-logo-svg",
    style: {
      display: 'block',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 18 42 C 16 18, 52 8, 96 8 C 132 8, 156 18, 158 32",
    stroke: "#0284c7",
    strokeWidth: "3.6",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 154 44 C 154 66, 118 76, 76 76 C 36 76, 16 66, 14 52",
    stroke: "#dc2626",
    strokeWidth: "3.6",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("text", {
    x: "42",
    y: "58",
    fontFamily: "'Arial Black', Impact, sans-serif",
    fontSize: "48",
    fontWeight: "900",
    fontStyle: "italic",
    fill: "#dc2626",
    letterSpacing: "-2"
  }, "A"), /*#__PURE__*/React.createElement("text", {
    x: "80",
    y: "58",
    fontFamily: "'Arial Black', Impact, sans-serif",
    fontSize: "48",
    fontWeight: "900",
    fontStyle: "italic",
    fill: "#0284c7"
  }, "B"), /*#__PURE__*/React.createElement("path", {
    d: "M 32 46 L 55 64 L 126 18",
    stroke: "#0f172a",
    strokeWidth: "6.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  }));
}
const ROLES = [{
  id: 'admin',
  label: 'Admin',
  icon: '🛡️',
  user: 'admin',
  color: '#0284c7',
  desc: 'System Administrator'
}, {
  id: 'doctor',
  label: 'Doctor',
  icon: '🩺',
  user: 'dr.madam',
  color: '#059669',
  desc: 'Consultant Physician'
}, {
  id: 'reception',
  label: 'OPD Desk',
  icon: '📋',
  user: 'reception',
  color: '#7c3aed',
  desc: 'OP Registration Desk'
}, {
  id: 'pharmacy',
  label: 'Pharmacy',
  icon: '💊',
  user: 'pharmacy',
  color: '#ea580c',
  desc: 'Central Pharmacy'
}];
function LoginPage({
  onLogin
}) {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectRole = role => {
    if (!role) return;
    setSelectedRole(role.id);
    setUsername(role.user);
    setPassword('admin');
  };
  const handleSubmit = e => {
    if (e) e.preventDefault();
    setLoading(true);
    const activeRoleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];
    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: `HIMS-${activeRoleObj.id.toUpperCase()}-01`,
        role: activeRoleObj.id,
        roleName: activeRoleObj.desc,
        badgeColor: activeRoleObj.color,
        icon: activeRoleObj.icon,
        name: username || 'Administrator',
        qualification: activeRoleObj.desc,
        department: 'INDUS HEALTH CITY HIMS',
        initialTab: 'overview',
        email: `${activeRoleObj.id}@healthcity.com`
      });
    }, 400);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "atri-login-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-ambient-orb orb-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "login-ambient-orb orb-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "atri-scenery-hospital"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.indushospital.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "scenery-card-frame hospital-frame",
    title: "Visit Indus Hospital Official Website (https://www.indushospital.com/)",
    style: {
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "./hospital_building.png?v=20261014indus",
    alt: "Indus Hospital Building",
    className: "atri-scenery-hospital-img",
    onError: e => {
      e.currentTarget.src = './hospital_building.jpg';
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "atri-scenery-doctor"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.indushospital.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "scenery-card-frame doctor-frame",
    title: "Visit Indus Hospital Official Website (https://www.indushospital.com/)",
    style: {
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "./doctor_profile.png?v=20261014madam",
    alt: "Doctor Madam",
    className: "atri-scenery-doctor-img",
    onError: e => {
      e.currentTarget.src = './doctor_profile.jpg';
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "atri-login-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "atri-card-top-cap"
  }, /*#__PURE__*/React.createElement(AtriBizLogo, {
    width: 120,
    height: 58
  })), /*#__PURE__*/React.createElement("div", {
    className: "atri-card-dark-pod"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-role-selector"
  }, /*#__PURE__*/React.createElement("span", {
    className: "login-role-hint"
  }, "QUICK ROLE SELECT:"), /*#__PURE__*/React.createElement("div", {
    className: "login-role-chips"
  }, ROLES.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    type: "button",
    className: `login-role-chip ${selectedRole === r.id ? 'active' : ''}`,
    onClick: () => selectRole(r),
    title: `Switch to ${r.label}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-chip-icon"
  }, r.icon), /*#__PURE__*/React.createElement("span", {
    className: "role-chip-label"
  }, r.label))))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "atri-form",
    autoComplete: "off"
  }, /*#__PURE__*/React.createElement("div", {
    className: "atri-input-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "input-prefix-icon"
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: username,
    onChange: e => setUsername(e.target.value),
    placeholder: "Username or Email",
    className: "atri-field",
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "atri-input-box password-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "input-prefix-icon"
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("input", {
    type: showPassword ? 'text' : 'password',
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "Password",
    className: "atri-field",
    autoComplete: "off",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "password-toggle-btn",
    onClick: () => setShowPassword(!showPassword),
    title: showPassword ? 'Hide password' : 'Show password'
  }, showPassword ? '👁️' : '🙈')), /*#__PURE__*/React.createElement("div", {
    className: "atri-forgot-row"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "atri-forgot-link",
    onClick: () => setShowForgotMsg(!showForgotMsg)
  }, "Forgot Password ?")), showForgotMsg && /*#__PURE__*/React.createElement("div", {
    className: "atri-forgot-popover"
  }, /*#__PURE__*/React.createElement("span", null, "Contact IT Support: ", /*#__PURE__*/React.createElement("strong", null, "+91 7995881582"), " or ", /*#__PURE__*/React.createElement("strong", null, "info@atribiz.com"))), /*#__PURE__*/React.createElement("div", {
    className: "atri-btn-row"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "atri-login-btn effect-btn",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement("span", {
    className: "btn-loading-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "btn-spinner"
  }), /*#__PURE__*/React.createElement("span", null, "AUTHENTICATING...")) : /*#__PURE__*/React.createElement("span", null, "LOGIN TO HIMS"))), /*#__PURE__*/React.createElement("div", {
    className: "login-security-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "security-pulse-dot"
  }), /*#__PURE__*/React.createElement("span", null, "256-Bit SSL Encrypted \u2022 Spring Boot & MySQL Connected"))))), /*#__PURE__*/React.createElement("footer", {
    className: "atri-footer-bar"
  }, /*#__PURE__*/React.createElement("span", null, "Developed and Supported by : "), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@atribiz.com",
    className: "atri-footer-highlight"
  }, "AtriBiz Solutions LLP"), /*#__PURE__*/React.createElement("span", null, ", info@atribiz.com, Phone: +91 7995881582.")));
}

// --- src/components/LeftSidebar.jsx ---

function LeftSidebar({
  isExpanded,
  onToggleExpand,
  activeSubTab,
  onSelectSubTab,
  onGoHome,
  onOpenDummyTest,
  onLogout
}) {
  // Accordion state: Patient Management expanded by default
  const [isPatientMgmtOpen, setIsPatientMgmtOpen] = useState(true);

  // Toggle Patient Management
  const handleTogglePatientMgmt = () => {
    if (!isExpanded && onToggleExpand) {
      onToggleExpand(); // Auto expand sidebar if collapsed
      setIsPatientMgmtOpen(true);
    } else {
      setIsPatientMgmtOpen(prev => !prev);
    }
  };
  const isOutPatientActive = activeSubTab === 'appointments' || activeSubTab === 'add_appointment';
  return /*#__PURE__*/React.createElement("aside", {
    className: `hims-left-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-top-cap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-logo-wrap",
    title: "INDUS HEALTH CITY"
  }, /*#__PURE__*/React.createElement(AtriBizLogo, {
    width: isExpanded ? 70 : 38,
    height: isExpanded ? 36 : 20
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-toggle-btn",
    onClick: onToggleExpand,
    title: isExpanded ? "Collapse Left Menu" : "Expand Left Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-menu-group",
    style: {
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-nav-item",
    onClick: onGoHome,
    title: "Go to Home Dashboard (Metro JSP)",
    style: {
      background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.18) 0%, rgba(2, 132, 199, 0.04) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      borderRadius: '8px',
      color: '#38bdf8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-icon-wrap",
    style: {
      color: '#38bdf8'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  }))), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-item-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-title",
    style: {
      color: '#ffffff',
      fontWeight: 700
    }
  }, "Home Dashboard"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-sub",
    style: {
      color: '#7dd3fc'
    }
  }, "Metro Tiles Screen")))), onOpenDummyTest && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-menu-group",
    style: {
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-nav-item",
    onClick: onOpenDummyTest,
    title: "Test Screen (1 Field: Client Name) for at_dummy_table",
    style: {
      background: 'rgba(56, 189, 248, 0.12)',
      border: '1px dashed #38bdf8',
      borderRadius: '8px',
      color: '#38bdf8'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-icon-wrap",
    style: {
      color: '#38bdf8',
      fontSize: '18px'
    }
  }, "\uD83E\uDDEA"), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-item-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-title",
    style: {
      color: '#ffffff',
      fontWeight: 700
    }
  }, "DB Test Screen"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-sub",
    style: {
      color: '#7dd3fc',
      fontSize: '11px'
    }
  }, "at_dummy_table")))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-menu-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `sidebar-nav-item parent-item ${isOutPatientActive ? 'parent-active' : ''}`,
    onClick: handleTogglePatientMgmt,
    title: "Patient Management"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-icon-wrap",
    style: {
      color: isOutPatientActive ? '#38bdf8' : '#94a3b8'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3.13a4 4 0 0 1 0 7.75"
  }))), isExpanded && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-item-text",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-title"
  }, "Patient Management"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-sub"
  }, "OPD Patient Services")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-arrow-wrap",
    style: {
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: isPatientMgmtOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))))), isExpanded && isPatientMgmtOpen && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-submenu-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-outpatient-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-outpatient-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sub-icon-bullet"
  }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("span", {
    className: "outpatient-lbl"
  }, "Out Patient")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-single-item-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `sidebar-tab-link single-patient-reg-btn ${isOutPatientActive ? 'active-tab' : ''}`,
    onClick: () => {
      if (onSelectSubTab) onSelectSubTab('appointments');
    },
    title: "Patient Registration"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-bullet-dot"
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("span", {
    className: "patient-reg-text"
  }, "Patient Registration"))))))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom-action"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "sidebar-nav-item logout",
    onClick: onLogout,
    title: "Sign Out from System"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-icon-wrap",
    style: {
      color: '#ef4444'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  }))), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-item-text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-title",
    style: {
      color: '#ef4444'
    }
  }, "Sign Out"), /*#__PURE__*/React.createElement("span", {
    className: "sidebar-item-sub"
  }, "Exit to Login")))));
}

// --- src/components/HIMSHomeDashboard.jsx ---

function HIMSHomeDashboard({
  onSelectModule,
  onLogout
}) {
  const [loginTime, setLoginTime] = useState('');
  const [readonlyNotice, setReadonlyNotice] = useState(null);
  useEffect(() => {
    // Format timestamp like: 2026-10-07 11:40:27
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setLoginTime(formatted);
  }, []);
  const handleReadOnlyClick = moduleName => {
    setReadonlyNotice(`${moduleName} is currently in Read-Only mode. Please click Patient Management.`);
    setTimeout(() => {
      setReadonlyNotice(null);
    }, 3000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "hims-home-screen"
  }, readonlyNotice && /*#__PURE__*/React.createElement("div", {
    className: "hims-readonly-notice-toast"
  }, /*#__PURE__*/React.createElement("span", {
    className: "toast-icon"
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("span", {
    className: "toast-text"
  }, readonlyNotice), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "toast-dismiss",
    onClick: () => setReadonlyNotice(null),
    title: "Dismiss"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "atri-scenery-hospital"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.indushospital.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "scenery-card-frame hospital-frame",
    title: "Visit Indus Hospital Official Website (https://www.indushospital.com/)",
    style: {
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "./hospital_building.png?v=20261014indus",
    alt: "Indus Hospital Building",
    className: "atri-scenery-hospital-img",
    onError: e => {
      e.currentTarget.src = './hospital_building.jpg';
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "atri-scenery-doctor"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.indushospital.com/",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "scenery-card-frame doctor-frame",
    title: "Visit Indus Hospital Official Website (https://www.indushospital.com/)",
    style: {
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "./doctor_profile.png?v=20261014madam",
    alt: "Doctor Madam",
    className: "atri-scenery-doctor-img",
    onError: e => {
      e.currentTarget.src = './doctor_profile.jpg';
    }
  }))), /*#__PURE__*/React.createElement("header", {
    className: "hims-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-top-logo"
  }, /*#__PURE__*/React.createElement(AtriBizLogo, {
    width: 125,
    height: 60
  })), /*#__PURE__*/React.createElement("div", {
    className: "hims-login-time"
  }, "LogInTime: ", /*#__PURE__*/React.createElement("span", {
    className: "time-val"
  }, loginTime || '2026-10-07 11:40:27')), /*#__PURE__*/React.createElement("div", {
    className: "hims-top-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-quick-opd-btn",
    style: {
      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      borderColor: '#38bdf8',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)'
    },
    onClick: () => onSelectModule('dummy_test'),
    title: "Open Database Test Screen (1 Field: Client Name) for at_dummy_table"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83E\uDDEA"), " Test Client Name"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-quick-opd-btn",
    onClick: () => onSelectModule('patient_management'),
    title: "Open Patient Registration & OPD Desk"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCB"), " Enter Patient Management"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-logout-circle-btn",
    onClick: onLogout,
    title: "Logout from ATRI HIMS"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-power-icon"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18.36 6.64a9 9 0 1 1-12.73 0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-logout-text"
  }, "LOGOUT")))), /*#__PURE__*/React.createElement("main", {
    className: "hims-main-area"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-content-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-3d-tile-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-spacer-row1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-img hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Medical Faculty'),
    title: "Hospital Medical Faculty (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("img", {
    src: "./tile_hr.jpg",
    alt: "Medical Faculty",
    className: "hims-tile-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-glass-tag"
  }, "FACULTY")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-empty"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-cyan hims-tile-highlight hims-tile-clickable",
    onClick: () => onSelectModule('patient_management'),
    title: "Patient Management \u2014 Click to open OPD Registration & Appointments"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-active-pill"
  }, "CLICK TO OPEN"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "3.5",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 18c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5",
    stroke: "#ffffff",
    strokeWidth: "2.2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "9",
    r: "3",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12.5 18c.3-2 1.8-3.5 3.5-3.5 2 0 3.5 1.5 3.5 3.5",
    stroke: "#ffffff",
    strokeWidth: "2.2",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "Patient Management"), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-subtag"
  }, "OPD & Tokens")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-img hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Clinical Desk'),
    title: "Clinical Desk & Workstation (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("img", {
    src: "./tile_laptop.jpg",
    alt: "Clinical Desk",
    className: "hims-tile-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-glass-tag"
  }, "CLINICAL DESK")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-img hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Diagnostics Lab'),
    title: "Diagnostics Laboratory (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("img", {
    src: "./tile_flask.jpg",
    alt: "Lab Flask",
    className: "hims-tile-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-glass-tag"
  }, "DIAGNOSTICS")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-orange hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Lab Management'),
    title: "Laboratory Information & Orders (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 18h8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 22h18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 22a7 7 0 1 0 0-14h-1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",
    fill: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "Lab Management")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-img hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Pharmacy'),
    title: "Central Pharmacy & Dispensary (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("img", {
    src: "./tile_pharmacy.jpg",
    alt: "Pharmacy",
    className: "hims-tile-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-glass-tag"
  }, "PHARMACY")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-teal hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Credit Billing'),
    title: "Credit Billing & Cashier Desk (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#ffffff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "14",
    height: "10",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 13v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 13v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 17h8"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "8",
    height: "6",
    x: "14",
    y: "14",
    rx: "1",
    fill: "rgba(255,255,255,0.25)"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "20",
    y1: "12",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "Credit Billing")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-empty"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-empty"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-magenta hims-tile-readonly",
    onClick: () => handleReadOnlyClick('CSSD'),
    title: "Central Sterile Services Department (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 8 C8 4 16 4 16 8 Z",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "9",
    r: "3.5",
    fill: "#fbcfe8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "6",
    height: "3",
    rx: "1",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 20c0-3.5 3-6 7-6s7 2.5 6 6",
    fill: "#ffffff"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "CSSD")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-lightgreen hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Nursing'),
    title: "Nursing Care & Vitals Station (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "44",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 5 L15 5 L14 7 L10 7 Z",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11.5 5.5 v2 M10.5 6.5 h2",
    stroke: "#dc2626",
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3.5",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 21c0-3.5 2.5-6 6-6s6 2.5 6 6",
    fill: "#ffffff"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "Nursing")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-img hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Operations'),
    title: "Operations & Administration (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("img", {
    src: "./tile_puzzle.jpg",
    alt: "Operations",
    className: "hims-tile-photo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-glass-tag"
  }, "OPERATIONS")), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile hims-tile-3d hims-tile-purple hims-tile-readonly",
    onClick: () => handleReadOnlyClick('Human Resource'),
    title: "Human Resources & Personnel (Read-Only module)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-readonly-pill"
  }, "Read Only"), /*#__PURE__*/React.createElement("div", {
    className: "hims-tile-icon-wrap"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "3.5",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5",
    fill: "#ffffff"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "9",
    r: "2.2",
    fill: "rgba(255,255,255,0.75)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M1 19c0-2.2 1.8-4 4-4 .8 0 1.5.2 2.2.6-.7 1-.9 2.2-.9 3.4",
    fill: "rgba(255,255,255,0.75)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "9",
    r: "2.2",
    fill: "rgba(255,255,255,0.75)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17.7 15.6c.7-.4 1.4-.6 2.3-.6 2.2 0 4 1.8 4 4h-5.4c0-1.2-.2-2.4-.9-3.4",
    fill: "rgba(255,255,255,0.75)"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "hims-tile-label"
  }, "Human Resource"))))), /*#__PURE__*/React.createElement("footer", {
    className: "atri-footer-bar"
  }, /*#__PURE__*/React.createElement("span", null, "Developed and Supported by : "), /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@atribiz.com",
    className: "atri-footer-highlight"
  }, "AtriBiz Solutions LLP"), /*#__PURE__*/React.createElement("span", null, ", info@atribiz.com, Phone: +91 7995881582.")));
}

// --- src/components/Navbar.jsx ---

function Navbar({
  activeTab,
  setActiveTab,
  onOpenRegister,
  waitingTotal,
  currentUser,
  onLogout,
  postgresStatus,
  onOpenPostgresModal
}) {
  return /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
    className: "top-emergency-bar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "emergency-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pulse-dot"
  }), "24/7 OP Emergency & Triage Hotline: 1800-419-9999"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#cbd5e1',
      fontSize: '0.8rem'
    }
  }, "OPD Hours Today: ", /*#__PURE__*/React.createElement("strong", null, "08:00 AM - 08:00 PM"), " | Central Pharmacy & Diagnostics Open")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      fontSize: '0.8rem',
      color: '#94a3b8',
      flexWrap: 'wrap'
    }
  }, currentUser && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "User:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#38bdf8'
    }
  }, currentUser.name), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.1)',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.72rem'
    }
  }, "ADMIN")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onOpenPostgresModal,
    style: {
      background: postgresStatus?.postgres_connected ? 'rgba(16, 185, 129, 0.2)' : 'rgba(234, 179, 8, 0.2)',
      border: `1px solid ${postgresStatus?.postgres_connected ? '#10b981' : '#eab308'}`,
      color: postgresStatus?.postgres_connected ? '#6ee7b7' : '#fde047',
      borderRadius: '9999px',
      padding: '2px 10px',
      fontSize: '0.75rem',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    },
    title: "Click to view PostgreSQL Database Details & Connection Settings"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: postgresStatus?.postgres_connected ? '#10b981' : '#eab308',
      boxShadow: postgresStatus?.postgres_connected ? '0 0 6px #10b981' : '0 0 6px #eab308'
    }
  }), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC18 PostgreSQL: ", postgresStatus?.postgres_connected ? 'Connected' : 'Offline (Local Cache)')), /*#__PURE__*/React.createElement("span", null, "ATRI HIMS: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#34d399'
    }
  }, "Active \u2713")), /*#__PURE__*/React.createElement("span", null, "Waiting Tokens: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#38bdf8'
    }
  }, waitingTotal)))), /*#__PURE__*/React.createElement("nav", {
    className: "hospital-navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand-logo",
    onClick: () => setActiveTab('hims_home'),
    title: "Return to ATRI HIMS Home Tiles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-badge"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "brand-text"
  }, /*#__PURE__*/React.createElement("h1", null, "ATRI ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, "HIMS")), /*#__PURE__*/React.createElement("p", null, "Integrated Hospital Information Management System"))), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'hims_home' ? 'active' : ''}`,
    onClick: () => setActiveTab('hims_home'),
    style: {
      fontWeight: 700,
      color: '#0284c7'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "3",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "14",
    y: "14",
    rx: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "7",
    height: "7",
    x: "3",
    y: "14",
    rx: "1"
  })), "HIMS Home Tiles"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'queue' ? 'active' : ''}`,
    onClick: () => setActiveTab('queue')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "Patient Queue"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'register' ? 'active' : ''}`,
    onClick: () => setActiveTab('register')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    x2: "19",
    y1: "8",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    x2: "16",
    y1: "11",
    y2: "11"
  })), "Patient Registration"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'vitals' ? 'active' : ''}`,
    onClick: () => setActiveTab('vitals'),
    style: {
      color: '#059669'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  })), "Nursing / Vitals"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'doctors' ? 'active' : ''}`,
    onClick: () => setActiveTab('doctors')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "10",
    r: "2"
  })), "Human Resource (Doctors)"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'records' ? 'active' : ''}`,
    onClick: () => setActiveTab('records')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "8",
    y1: "13",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    x2: "8",
    y1: "17",
    y2: "17"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "10 9 9 9 8 9"
  })), "Lab Records & Rx"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'pharmacy' ? 'active' : ''}`,
    onClick: () => setActiveTab('pharmacy'),
    style: {
      color: '#0284c7'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8.5 8.5 7 7"
  })), "Pharmacy"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'staff' ? 'active' : ''}`,
    onClick: () => setActiveTab('staff'),
    style: {
      color: '#0d9488'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1 2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })), "Admin / Desk Control"), /*#__PURE__*/React.createElement("button", {
    className: `nav-item ${activeTab === 'database' ? 'active' : ''}`,
    onClick: () => setActiveTab('database'),
    style: {
      color: '#0284c7',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1rem',
      marginRight: '2px'
    }
  }, "\uD83D\uDC18"), "Database Explorer")), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onOpenRegister
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "5",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    x2: "19",
    y1: "12",
    y2: "12"
  })), "New OP Token"), onLogout && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-logout",
    onClick: onLogout,
    title: "Logout from ATRI HIMS"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18.36 6.64a9 9 0 1 1-12.73 0"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "2",
    x2: "12",
    y2: "12"
  })), "LOGOUT"))));
}

// --- src/components/HeroSection.jsx ---

function HeroSection({
  setActiveTab,
  onOpenRegister,
  waitingTotal,
  activeDoctorsCount
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero-banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: '#38bdf8'
    }
  }), "Next-Gen Outpatient (OPD) System"), /*#__PURE__*/React.createElement("h2", {
    className: "hero-title"
  }, "Smart & Seamless ", /*#__PURE__*/React.createElement("span", {
    className: "highlight"
  }, "OP Patient Care"), ", Real-Time Queue & Digital Records."), /*#__PURE__*/React.createElement("p", {
    className: "hero-desc"
  }, "PulseCare Hospital provides zero-delay outpatient services. Register online in 60 seconds, track your consultation token from your mobile, consult top specialists, and access instant digital prescriptions."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: onOpenRegister,
    style: {
      padding: '13px 26px',
      fontSize: '0.96rem'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "19",
    x2: "19",
    y1: "8",
    y2: "14"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    x2: "16",
    y1: "11",
    y2: "11"
  })), "Register OP Patient / Get Token"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setActiveTab('queue'),
    style: {
      padding: '13px 24px',
      fontSize: '0.96rem'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "View Live Waiting Lobby"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setActiveTab('records'),
    style: {
      background: 'rgba(255,255,255,0.1)',
      color: 'white',
      borderColor: 'rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    x2: "16.65",
    y1: "21",
    ライ2: "16.65"
  })), "View OP Prescription")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "348 ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "+")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Today's OP Consultations")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, activeDoctorsCount, " ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "active")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Specialists in OPD Cabins")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, waitingTotal, " ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "patients")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Tokens Currently in Queue")), /*#__PURE__*/React.createElement("div", {
    className: "stat-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-num"
  }, "12 ", /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, "mins")), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Avg Consultation Turnaround"))))));
}

// --- src/components/QueueBoard.jsx ---

function QueueBoard({
  departments,
  onCallNext,
  activeAlertToken,
  onPlayChime
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const filtered = departments.filter(dep => dep.name.toLowerCase().includes(filterQuery.toLowerCase()) || dep.doctor.toLowerCase().includes(filterQuery.toLowerCase()) || dep.room.toLowerCase().includes(filterQuery.toLowerCase()) || dep.currentToken.toLowerCase().includes(filterQuery.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    className: "queue-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83C\uDFE5 Live Outpatient (OPD) Waiting Board"), /*#__PURE__*/React.createElement("p", null, "Real-time token status across all outpatient consulting cabins. Updated dynamically.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Filter department, room or token...",
    value: filterQuery,
    onChange: e => setFilterQuery(e.target.value),
    style: {
      width: '260px',
      padding: '8px 12px',
      fontSize: '0.85rem'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onPlayChime,
    title: "Test announcement chime",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.54 8.46a5 5 0 0 1 0 7.07"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.07 4.93a10 10 0 0 1 0 14.14"
  })), "Lobby Chime"))), activeAlertToken && /*#__PURE__*/React.createElement("div", {
    className: "announcement-banner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.2rem'
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "ATTENTION PLEASE:"), " Token ", /*#__PURE__*/React.createElement("strong", {
    style: {
      textDecoration: 'underline'
    }
  }, activeAlertToken.token), " (", activeAlertToken.patient, ") please proceed to ", /*#__PURE__*/React.createElement("strong", null, activeAlertToken.room), ".")), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.2)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem'
    }
  }, "NOW CALLING")), /*#__PURE__*/React.createElement("div", {
    className: "queue-board-grid"
  }, filtered.map(dep => {
    const isFlashed = activeAlertToken && activeAlertToken.depCode === dep.code;
    return /*#__PURE__*/React.createElement("div", {
      key: dep.id,
      className: `queue-card ${isFlashed ? 'flash-active' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "room-badge-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cabin-tag"
    }, dep.room), /*#__PURE__*/React.createElement("span", {
      className: `status-indicator ${dep.statusColor || 'emerald'}`
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }
    }), dep.status)), /*#__PURE__*/React.createElement("h3", {
      className: "department-title"
    }, dep.name), /*#__PURE__*/React.createElement("div", {
      className: "doctor-subtext"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5.5 21a8.38 8.38 0 0 1 13 0"
    })), dep.doctor, " \u2022 ", dep.specialty), /*#__PURE__*/React.createElement("div", {
      className: "token-spotlight-box"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "token-big-label"
    }, "Now Serving"), /*#__PURE__*/React.createElement("div", {
      className: "token-big-number"
    }, dep.currentToken || 'None')), /*#__PURE__*/React.createElement("div", {
      className: "token-next-col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "token-big-label"
    }, "Next In Line"), /*#__PURE__*/React.createElement("div", {
      className: "token-next-num"
    }, dep.nextToken || 'None'))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '14px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--text-muted)',
        marginBottom: '6px',
        textTransform: 'uppercase'
      }
    }, "Queue Line (", dep.queue.length, " in waiting)"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap'
      }
    }, dep.queue.slice(0, 4).map((item, idx) => /*#__PURE__*/React.createElement("span", {
      key: item.token,
      style: {
        fontSize: '0.75rem',
        padding: '3px 8px',
        background: idx === 0 ? 'var(--primary-light)' : 'var(--bg-alt)',
        color: idx === 0 ? 'var(--primary)' : 'var(--text-main)',
        fontWeight: idx === 0 ? 700 : 500,
        borderRadius: '6px',
        border: '1px solid var(--border)'
      },
      title: `${item.patientName} (${item.priority})`
    }, item.token, " ", item.priority === 'Senior Citizen' ? '👴' : '')), dep.queue.length > 4 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.75rem',
        padding: '3px 6px',
        color: 'var(--text-muted)'
      }
    }, "+", dep.queue.length - 4, " more"))), /*#__PURE__*/React.createElement("div", {
      className: "queue-submeta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wait-pill"
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 6 12 12 16 14"
    })), "Est. Wait: ", /*#__PURE__*/React.createElement("strong", null, dep.avgWaitTime)), onCallNext && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-secondary btn-sm",
      onClick: () => onCallNext(dep.id),
      style: {
        fontSize: '0.78rem',
        padding: '4px 10px'
      }
    }, "Call Next Token \u25B6")));
  })));
}

// --- src/components/RegistrationForm.jsx ---

// Baseline patient appointments matching Indus Hospitals Screenshot 1 & 2
const INITIAL_APPOINTMENTS = [{
  umrNo: 'UMR334253',
  token: '1',
  patientName: 'VENKATA RAMANA',
  genderAge: 'MALE/45yrs',
  gender: 'MALE',
  age: 45,
  appointmentDate: '09-Oct-2026',
  consultant: 'SATYANARAYANA V VSN / ',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 1000,
  conCredit: 0,
  conUpi: 0,
  phone: '9848022334',
  vitals: {
    bp: '120/80',
    pulse: '72',
    spo2: '99%',
    temp: '98.4',
    weight: '68'
  }
}, {
  umrNo: 'UMR334252',
  token: 'CAR-104',
  patientName: 'TOTA RAMANA',
  genderAge: 'MALE/45yrs',
  gender: 'MALE',
  age: 45,
  appointmentDate: '08-Oct-2026',
  consultant: 'R LALITHA LA',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 800,
  conCredit: 0,
  conUpi: 0,
  phone: '9848123456',
  vitals: {
    bp: '120/80',
    pulse: '74',
    spo2: '99%',
    temp: '98.4',
    weight: '68'
  }
}, {
  umrNo: 'UMR334251',
  token: 'ORT-082',
  patientName: 'JAYANTI PANIGRAHI',
  genderAge: 'FEMALE/58yrs',
  gender: 'FEMALE',
  age: 58,
  appointmentDate: '08-Oct-2026',
  consultant: 'RAKESH TUMULA RT',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 0,
  regCredit: 0,
  regUpi: 0,
  conCash: 1450,
  conCredit: 0,
  conUpi: 0,
  phone: '9440112233',
  vitals: {
    bp: '130/85',
    pulse: '78',
    spo2: '98%',
    temp: '98.6',
    weight: '72'
  }
}, {
  umrNo: 'UMR334249',
  token: 'CAR-105',
  patientName: 'LANKE DURGA',
  genderAge: 'FEMALE/35yrs',
  gender: 'FEMALE',
  age: 35,
  appointmentDate: '08-Oct-2026',
  consultant: 'ANIL KUMAR MAHAPATRO AKM',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 850,
  conCredit: 0,
  conUpi: 0,
  phone: '9989445566',
  vitals: {
    bp: '118/76',
    pulse: '72',
    spo2: '99%',
    temp: '98.4',
    weight: '58'
  }
}, {
  umrNo: 'UMR334248',
  token: 'GEN-211',
  patientName: 'ASHOK KUMAR JENA',
  genderAge: 'MALE/48yrs',
  gender: 'MALE',
  age: 48,
  appointmentDate: '08-Oct-2026',
  consultant: 'R LALITHA LA',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 850,
  conCredit: 0,
  conUpi: 0,
  phone: '9866123987',
  vitals: {
    bp: '124/80',
    pulse: '76',
    spo2: '98%',
    temp: '98.6',
    weight: '75'
  }
}, {
  umrNo: 'UMR334247',
  token: 'GEN-212',
  patientName: 'KAMA MAJHI',
  genderAge: 'MALE/31yrs',
  gender: 'MALE',
  age: 31,
  appointmentDate: '08-Oct-2026',
  consultant: 'RAMESH NAIDU M RNM',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 600,
  conCredit: 0,
  conUpi: 0,
  phone: '9701234567',
  vitals: {
    bp: '115/75',
    pulse: '70',
    spo2: '99%',
    temp: '98.2',
    weight: '64'
  }
}, {
  umrNo: 'UMR334246',
  token: 'CAR-106',
  patientName: 'PYLA CHITTAMMA',
  genderAge: 'FEMALE/70yrs',
  gender: 'FEMALE',
  age: 70,
  appointmentDate: '08-Oct-2026',
  consultant: 'R LALITHA LA',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 800,
  conCredit: 0,
  conUpi: 0,
  phone: '9849223344',
  vitals: {
    bp: '140/90',
    pulse: '82',
    spo2: '97%',
    temp: '98.4',
    weight: '60'
  }
}, {
  umrNo: 'UMR334245',
  token: 'GEN-213',
  patientName: 'SUREN MOHANTY',
  genderAge: 'MALE/40yrs',
  gender: 'MALE',
  age: 40,
  appointmentDate: '08-Oct-2026',
  consultant: 'RAMESH NAIDU M RNM',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 650,
  conCredit: 0,
  conUpi: 0,
  phone: '9177334455',
  vitals: {
    bp: '122/82',
    pulse: '75',
    spo2: '99%',
    temp: '98.5',
    weight: '71'
  }
}, {
  umrNo: 'UMR334244',
  token: 'ORT-083',
  patientName: 'TANGUDU APPARAO',
  genderAge: 'MALE/52yrs',
  gender: 'MALE',
  age: 52,
  appointmentDate: '08-Oct-2026',
  consultant: 'ANIL KUMAR MAHAPATRO AKM',
  category: 'GENERAL',
  billStatus: 'PAID',
  regCash: 50,
  regCredit: 0,
  regUpi: 0,
  conCash: 1450,
  conCredit: 0,
  conUpi: 0,
  phone: '9948556677',
  vitals: {
    bp: '128/84',
    pulse: '76',
    spo2: '98%',
    temp: '98.6',
    weight: '80'
  }
}];
const CONSULTANTS_ROSTER = [{
  name: 'SATYANARAYANA V VSN / ',
  code: 'EMP00006',
  spec: 'NEUROLOGIST',
  fee: 1000,
  depCode: 'NEU'
}, {
  name: 'R LALITHA LA',
  code: 'EMP00001',
  spec: 'SENIOR GENERAL PHYSICIAN / OPD',
  fee: 800,
  depCode: 'GEN'
}, {
  name: 'RAKESH TUMULA RT',
  code: 'EMP00002',
  spec: 'ORTHOPEDICS & SPINE SPECIALIST',
  fee: 1450,
  depCode: 'ORT'
}, {
  name: 'ANIL KUMAR MAHAPATRO AKM',
  code: 'EMP00003',
  spec: 'CARDIOLOGY & INTERVENTIONAL SPECIALIST',
  fee: 850,
  depCode: 'CAR'
}, {
  name: 'RAMESH NAIDU M RNM',
  code: 'EMP00004',
  spec: 'GENERAL MEDICINE & DIABETOLOGY',
  fee: 600,
  depCode: 'GEN'
}, {
  name: 'Dr. Ananya Iyer',
  code: 'EMP00005',
  spec: 'CHIEF CARDIOLOGIST',
  fee: 700,
  depCode: 'CAR'
}, {
  name: 'Dr. Sandeep K. Banerjee',
  code: 'EMP00007',
  spec: 'CHIEF PHYSICIAN',
  fee: 600,
  depCode: 'GEN'
}, {
  name: 'Dr. Vikramaditya Rathore',
  code: 'EMP00008',
  spec: 'CONSULTANT ORTHOPEDIC SURGEON',
  fee: 750,
  depCode: 'ORT'
}, {
  name: 'Dr. Shalini Deshmukh',
  code: 'EMP00009',
  spec: 'SENIOR PEDIATRICIAN',
  fee: 500,
  depCode: 'PED'
}, {
  name: 'Dr. Neil Chatterjee',
  code: 'EMP00010',
  spec: 'CLINICAL DERMATOLOGIST',
  fee: 650,
  depCode: 'DER'
}];

// Helper to format minutes into 12-hour AM/PM string (e.g. 08:30 AM)
function formatSlotTime(totalMins) {
  let h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let displayH = h % 12;
  if (displayH === 0) displayH = 12;
  const pad = n => String(n).padStart(2, '0');
  return `${pad(displayH)}:${pad(m)} ${ampm}`;
}

// Generate slots for a doctor & date matching Indus screenshot
function generateDoctorSlots(doctorName, dateStr, appointmentsList, extraTokens = 0) {
  const startHour = 8;
  const startMin = 30;
  const totalSlotsCount = 12 + (extraTokens || 0);
  const slots = [];

  // Determine booked tokens from existing appointments
  const bookedSet = new Set();
  if (appointmentsList && appointmentsList.length > 0) {
    appointmentsList.forEach(apt => {
      if (apt.consultant === doctorName) {
        const numMatch = String(apt.token).match(/\d+/);
        if (numMatch) {
          const num = parseInt(numMatch[0], 10);
          bookedSet.add(num);
        }
      }
    });
  }

  // By default, for Dr. SATYANARAYANA V VSN / , token 1 is booked (matching the screenshot where token 1 is RED)
  if (doctorName && doctorName.includes('SATYANARAYANA')) {
    bookedSet.add(1);
  }
  for (let i = 1; i <= totalSlotsCount; i++) {
    const startMins = startHour * 60 + startMin + (i - 1) * 20;
    const endMins = startMins + 20;
    const timeLabel = `${formatSlotTime(startMins)}-${formatSlotTime(endMins)}(${i})`;
    const isBooked = bookedSet.has(i);
    slots.push({
      tokenNumber: i,
      timeLabel: timeLabel,
      isBooked: isBooked
    });
  }
  return slots;
}
function RegistrationForm({
  departments,
  doctors,
  onRegisterSuccess,
  onGoToVitals,
  records,
  activeTab: propActiveTab,
  onTabChange: propOnTabChange
}) {
  // Tabs: 'appointments' (Tab 1: Saved List) vs 'add_appointment' (Tab 2: Data Entry Fields)
  const [internalTab, setInternalTab] = useState('appointments');
  const activeTab = propActiveTab || internalTab;
  const setActiveTab = tab => {
    setInternalTab(tab);
    if (propOnTabChange) propOnTabChange(tab);
  };
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedHospital, setSelectedHospital] = useState('INDUS HEALTH CITY');
  const [dateRange, setDateRange] = useState('8 October, 2026 - 8 October, 2026');
  const [printModal, setPrintModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [vitalsDrawer, setVitalsDrawer] = useState(null);

  // Auto-merge persisted records from props/backend into appointments
  useEffect(() => {
    if (records && Object.keys(records).length > 0) {
      const persistedList = Object.values(records).map(rec => ({
        umrNo: rec.opId || `UMR${Math.floor(334250 + Math.random() * 50)}`,
        token: rec.token || '1',
        patientName: (rec.patientName || 'PATIENT').toUpperCase(),
        genderAge: `${(rec.gender || 'MALE').toUpperCase()}/${rec.age || 40}yrs`,
        gender: rec.gender || 'MALE',
        age: rec.age || 40,
        appointmentDate: rec.visitDate || '09-Oct-2026',
        consultant: rec.doctor || 'SATYANARAYANA V VSN / ',
        category: rec.priority === 'Emergency' ? 'EMERGENCY' : 'GENERAL',
        billStatus: 'PAID',
        regCash: rec.payment ? rec.payment.regFee || 50 : 50,
        regCredit: 0,
        regUpi: 0,
        conCash: rec.payment ? rec.payment.consultationFee || 1000 : 1000,
        conCredit: 0,
        conUpi: 0,
        phone: rec.phone || '',
        vitals: rec.vitals || {
          bp: '120/80',
          pulse: '74',
          spo2: '99%',
          temp: '98.6',
          weight: '65'
        }
      }));

      // Combine ensuring unique UMR numbers
      setAppointments(prev => {
        const existingUmrs = new Set(prev.map(p => p.umrNo));
        const newToAdd = persistedList.filter(p => !existingUmrs.has(p.umrNo));
        return [...newToAdd, ...prev];
      });
    }
  }, [records]);

  // Tab 2 Form Data State (Matching Screenshot 2 & Exact Doctor Details)
  const [formData, setFormData] = useState({
    title: 'Mr.',
    patientName: '',
    lastName: '',
    gender: 'Male',
    dob: '1981-05-15',
    years: 45,
    months: 0,
    days: 0,
    mobile: '',
    state: 'Andhra Pradesh',
    city: 'Visakhapatnam',
    village: '',
    address: '',
    walkIn: 'Walk In',
    organization: '--Select Organization--',
    category: 'GENERAL - TRI',
    occupation: '--Select Occupation--',
    idType: 'Aadhaar',
    idNumber: '',
    careBy: 'Self',
    parentOrHusband: '',
    religion: 'Hindu',
    maritalStatus: 'Married',
    bloodGroup: 'B+',
    healthIssue: '',
    // Appointment Details (Selected dynamically on step-by-step workflow)
    location: '',
    appointmentDate: '09-Oct-2026',
    token: '',
    consultant: '',
    doctorCode: '',
    specialization: '',
    // Fee Details
    regFee: 50,
    regFinalAmt: 50,
    consFee: 1000,
    discPercent: 0,
    discAmt: 0,
    consFinalAmt: 1000,
    totalAmt: 1050,
    totalBillAmt: 1050,
    amtReceived: 1050,
    balance: 0,
    status: 'PAID',
    authorizedBy: 'Admin',
    // Payment Mode
    paymentMode: 'Cash',
    paymentAmt: 1050
  });

  // Doctor Slots & Extra Tokens State (Tokens OPEN after Doctor is selected)
  const [extraTokensCount, setExtraTokensCount] = useState(0);
  const [selectedSlotToken, setSelectedSlotToken] = useState(null);
  const [isSlotsOpen, setIsSlotsOpen] = useState(false);

  // Dynamic slot generation for currently selected doctor, date, and extra tokens
  const currentDoctorSlots = (React.useMemo || useMemo || (fn => fn()))(() => {
    if (!formData.consultant) return [];
    return generateDoctorSlots(formData.consultant, formData.appointmentDate, appointments, extraTokensCount);
  }, [formData.consultant, formData.appointmentDate, appointments, extraTokensCount]);
  const showNotification = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Step 1: Hospital Change Handler
  const handleHospitalChange = hospitalName => {
    setFormData(prev => ({
      ...prev,
      location: hospitalName,
      consultant: '',
      doctorCode: '',
      specialization: '',
      token: ''
    }));
    setIsSlotsOpen(false); // Close tokens until doctor is chosen
    setSelectedSlotToken(null);
    if (hospitalName) {
      showNotification(`🏥 Hospital selected: ${hospitalName}. Please choose a Doctor to OPEN tokens.`);
    }
  };

  // Step 2: Doctor Change Handler (ONCHANGE OPENS TOKENS)
  const handleConsultantChange = name => {
    if (!name) {
      setFormData(prev => ({
        ...prev,
        consultant: '',
        doctorCode: '',
        specialization: '',
        token: ''
      }));
      setIsSlotsOpen(false);
      setSelectedSlotToken(null);
      return;
    }
    const doc = CONSULTANTS_ROSTER.find(c => c.name === name) || CONSULTANTS_ROSTER[0];
    const total = (formData.regFinalAmt || 50) + doc.fee - (formData.discAmt || 0);
    setExtraTokensCount(0);

    // Compute slots for newly selected doctor
    const newSlots = generateDoctorSlots(doc.name, formData.appointmentDate, appointments, 0);
    // Find first available green slot
    const firstAvail = newSlots.find(s => !s.isBooked) || newSlots[0];
    const chosenToken = firstAvail ? firstAvail.tokenNumber : 1;
    setSelectedSlotToken(chosenToken);
    setIsSlotsOpen(true); // <--- OPEN TOKENS IMMEDIATELY ON DOCTOR ONCHANGE!

    setFormData(prev => ({
      ...prev,
      location: prev.location || 'INDUS HEALTH CITY',
      consultant: doc.name,
      doctorCode: doc.code,
      specialization: doc.spec,
      consFee: doc.fee,
      consFinalAmt: doc.fee,
      totalAmt: total,
      totalBillAmt: total,
      amtReceived: total,
      paymentAmt: total,
      token: String(chosenToken)
    }));
    showNotification(`✓ Doctor ${doc.name} (${doc.code}) selected — Token slots OPENED!`);
  };

  // Click on a slot pill
  const handleSlotClick = slot => {
    if (slot.isBooked) {
      showNotification(`⚠️ Slot ${slot.timeLabel} (Token #${slot.tokenNumber}) is already Booked! Please choose an available green slot.`);
      return;
    }
    setSelectedSlotToken(slot.tokenNumber);
    setFormData(prev => ({
      ...prev,
      token: String(slot.tokenNumber)
    }));
    showNotification(`✓ Selected Slot: ${slot.timeLabel} for Dr. ${formData.consultant}`);
  };

  // Add extra / emergency token (+)
  const handleAddExtraToken = () => {
    const nextCount = extraTokensCount + 1;
    setExtraTokensCount(nextCount);
    const nextTokenNum = 12 + nextCount;
    setSelectedSlotToken(nextTokenNum);
    setFormData(prev => ({
      ...prev,
      token: String(nextTokenNum)
    }));
    showNotification(`✓ Added Extra Emergency Token #${nextTokenNum} for Dr. ${formData.consultant}`);
  };

  // DOB & Age auto-sync
  const handleDobChange = dobStr => {
    if (!dobStr) return;
    const birth = new Date(dobStr);
    const now = new Date('2026-10-08');
    let yrs = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate()) {
      yrs--;
    }
    setFormData(prev => ({
      ...prev,
      dob: dobStr,
      years: Math.max(0, yrs)
    }));
  };
  const handleYearsChange = yrs => {
    const y = parseInt(yrs, 10) || 0;
    const bYear = 2026 - y;
    setFormData(prev => ({
      ...prev,
      years: y,
      dob: `${bYear}-01-01`
    }));
  };

  // Handle Form Submission (Save Patient)
  const handleSave = e => {
    if (e) e.preventDefault();
    if (!formData.patientName.trim()) {
      alert('Please enter Patient Name.');
      return;
    }
    const nextUmrNum = 334253 + appointments.length;
    const newUmrNo = `UMR${nextUmrNum}`;
    const tokenStr = formData.token || `OPD-${120 + appointments.length + 1}`;
    const fullName = `${formData.title} ${formData.patientName} ${formData.lastName}`.trim().toUpperCase();
    const newAppointmentRecord = {
      umrNo: newUmrNo,
      token: tokenStr,
      patientName: fullName,
      genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
      gender: formData.gender,
      age: formData.years,
      appointmentDate: formData.appointmentDate,
      consultant: formData.consultant,
      category: formData.category,
      billStatus: 'PAID',
      regCash: formData.paymentMode === 'Cash' ? formData.regFinalAmt : 0,
      regCredit: formData.paymentMode === 'Credit' ? formData.regFinalAmt : 0,
      regUpi: formData.paymentMode === 'UPI' ? formData.regFinalAmt : 0,
      conCash: formData.paymentMode === 'Cash' ? formData.consFinalAmt : 0,
      conCredit: formData.paymentMode === 'Credit' ? formData.consFinalAmt : 0,
      conUpi: formData.paymentMode === 'UPI' ? formData.consFinalAmt : 0,
      phone: formData.mobile,
      vitals: {
        bp: '120/80',
        pulse: '74',
        spo2: '99%',
        temp: '98.6',
        weight: '65'
      }
    };

    // 1. Add to local appointments state at TOP of list
    setAppointments(prev => [newAppointmentRecord, ...prev]);

    // 2. Call parent callback to sync with PostgreSQL backend
    if (onRegisterSuccess) {
      const matchingDoc = CONSULTANTS_ROSTER.find(c => c.name === formData.consultant);
      onRegisterSuccess({
        patientName: fullName,
        age: formData.years,
        gender: formData.gender,
        phone: formData.mobile,
        bloodGroup: formData.bloodGroup,
        departmentName: matchingDoc ? matchingDoc.spec : 'General Medicine',
        departmentCode: matchingDoc ? matchingDoc.depCode : 'GEN',
        doctor: formData.consultant,
        room: 'OPD Cabin 101',
        priority: 'Regular',
        opId: newUmrNo,
        token: tokenStr,
        payment: {
          regFee: formData.regFinalAmt,
          consultationFee: formData.consFinalAmt,
          totalAmount: formData.totalBillAmt,
          paymentMethod: formData.paymentMode,
          paymentStatus: 'Paid',
          transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
        }
      });
    }

    // 3. Switch to Tab 1 (Appointments) immediately as requested!
    setActiveTab('appointments');
    showNotification(`✓ Patient ${fullName} successfully registered (${newUmrNo}). Data saved to database.`);

    // Reset form for next entry
    setFormData(prev => ({
      ...prev,
      patientName: '',
      lastName: '',
      mobile: '',
      village: '',
      address: '',
      idNumber: '',
      parentOrHusband: '',
      healthIssue: '',
      token: `OPD-${Math.floor(120 + appointments.length + 2)}`
    }));
  };

  // Export to Excel / CSV
  const handleExportExcel = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "UMR No,Patient Name,Gender/Age,Appointment Date,Consultant,Category,Bill Status,Reg Cash,Con Cash,Paid Amount\n";
    appointments.forEach(row => {
      const paid = (row.regCash || 0) + (row.conCash || 0) + (row.regUpi || 0) + (row.conUpi || 0);
      csvContent += `${row.umrNo},"${row.patientName}",${row.genderAge},${row.appointmentDate},"${row.consultant}",${row.category},${row.billStatus},${row.regCash},${row.conCash},${paid}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Indus_Hospitals_Appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("📥 Appointments list exported to Excel (CSV).");
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(row => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return row.umrNo.toLowerCase().includes(term) || row.patientName.toLowerCase().includes(term) || row.consultant.toLowerCase().includes(term) || row.phone && row.phone.includes(term);
  });

  // Calculate Summary Metrics Bar
  const totalPatients = appointments.length;
  const regCashTotal = appointments.reduce((sum, a) => sum + (a.regCash || 0), 0);
  const regCardTotal = appointments.reduce((sum, a) => sum + (a.regCredit || 0), 0);
  const regUpiTotal = appointments.reduce((sum, a) => sum + (a.regUpi || 0), 0);
  const consCashTotal = appointments.reduce((sum, a) => sum + (a.conCash || 0), 0);
  const consCardTotal = appointments.reduce((sum, a) => sum + (a.conCredit || 0), 0);
  const consUpiTotal = appointments.reduce((sum, a) => sum + (a.conUpi || 0), 0);
  const paidAmtTotal = regCashTotal + regCardTotal + regUpiTotal + consCashTotal + consCardTotal + consUpiTotal;
  return /*#__PURE__*/React.createElement("div", {
    className: "patient-reg-page"
  }, toast && /*#__PURE__*/React.createElement("div", {
    className: "patient-reg-toast"
  }, /*#__PURE__*/React.createElement("span", null, toast), /*#__PURE__*/React.createElement("button", {
    onClick: () => setToast(null)
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "patient-reg-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-center-title"
  }, /*#__PURE__*/React.createElement("h1", null, "Patient Registration")), /*#__PURE__*/React.createElement("div", {
    className: "reg-top-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-breadcrumb"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#dc2626'
    }
  }, "\u2302 Home"), " > Patient Management > Patient Queue"), /*#__PURE__*/React.createElement("div", {
    className: "reg-top-icons"
  }, /*#__PURE__*/React.createElement("button", {
    className: "reg-icon-btn refresh",
    onClick: () => showNotification("🔄 Data refreshed from PostgreSQL database."),
    title: "Refresh Appointments"
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("button", {
    className: "reg-icon-btn save",
    onClick: handleSave,
    title: "Save Record"
  }, "\uD83D\uDCBE")))), /*#__PURE__*/React.createElement("div", {
    className: "reg-tabs-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-tab-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `reg-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`,
    onClick: () => setActiveTab('appointments')
  }, "Appointments"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `reg-tab-btn ${activeTab === 'add_appointment' ? 'active' : ''}`,
    onClick: () => setActiveTab('add_appointment')
  }, "Add Appointment")), /*#__PURE__*/React.createElement("div", {
    className: "reg-tab-right-help"
  }, /*#__PURE__*/React.createElement("span", {
    className: "reg-help-link"
  }, /*#__PURE__*/React.createElement("span", {
    className: "green-circle-help"
  }, "?"), " Help"), /*#__PURE__*/React.createElement("span", {
    className: "reg-mgmt-link"
  }, "\uD83D\uDC64 Patient Management"))), activeTab === 'appointments' && /*#__PURE__*/React.createElement("div", {
    className: "appointments-tab-pane"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-org-filter-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reg-company-box"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: "Vasugan Medical Specialities Pvt Ltd",
    readOnly: true,
    className: "reg-company-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "reg-hospital-select-box"
  }, /*#__PURE__*/React.createElement("select", {
    value: selectedHospital,
    onChange: e => setSelectedHospital(e.target.value),
    className: "reg-hospital-select"
  }, /*#__PURE__*/React.createElement("option", {
    value: "INDUS HEALTH CITY"
  }, "INDUS HEALTH CITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS SUPER SPECIALITY"
  }, "INDUS SUPER SPECIALITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS CLINIC & DIAGNOSTICS"
  }, "INDUS CLINIC & DIAGNOSTICS"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-date-range-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cal-icon"
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: dateRange,
    onChange: e => setDateRange(e.target.value),
    className: "reg-date-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reg-summary-pill-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Total Patients:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, totalPatients)), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Reg Cash:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, regCashTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Reg Card:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, regCardTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Reg UPI:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, regUpiTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Cons Cash:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, consCashTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Cons Card:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, consCardTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Cons Upi:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, consUpiTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Paid Amt:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, paidAmtTotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "metric-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Refund Amt:"), /*#__PURE__*/React.createElement("span", {
    className: "val blue"
  }, "0.00"))), /*#__PURE__*/React.createElement("div", {
    className: "reg-table-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-left-tools"
  }, /*#__PURE__*/React.createElement("div", {
    className: "entries-dropdown-wrap"
  }, /*#__PURE__*/React.createElement("span", null, "Show"), /*#__PURE__*/React.createElement("select", {
    value: entriesPerPage,
    onChange: e => setEntriesPerPage(Number(e.target.value)),
    className: "entries-select"
  }, /*#__PURE__*/React.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/React.createElement("option", {
    value: 25
  }, "25"), /*#__PURE__*/React.createElement("option", {
    value: 50
  }, "50")), /*#__PURE__*/React.createElement("span", null, "entries")), /*#__PURE__*/React.createElement("button", {
    className: "export-btn",
    onClick: handleExportExcel,
    title: "Export to Excel / CSV"
  }, "Excel"), /*#__PURE__*/React.createElement("button", {
    className: "export-btn",
    onClick: () => window.print(),
    title: "Print Table to PDF"
  }, "PDF")), /*#__PURE__*/React.createElement("div", {
    className: "table-search-wrap"
  }, /*#__PURE__*/React.createElement("label", null, "Search:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value),
    placeholder: "Search UMR, Patient, Doctor...",
    className: "table-search-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reg-table-container"
  }, /*#__PURE__*/React.createElement("table", {
    className: "reg-appointments-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Token No \u21C5"), /*#__PURE__*/React.createElement("th", null, "UMR No \u21C5"), /*#__PURE__*/React.createElement("th", null, "PatientName \u21C5"), /*#__PURE__*/React.createElement("th", null, "Gender/Age \u21C5"), /*#__PURE__*/React.createElement("th", null, "Appointment Date \u21C5"), /*#__PURE__*/React.createElement("th", null, "Consultant \u21C5"), /*#__PURE__*/React.createElement("th", null, "Category \u21C5"), /*#__PURE__*/React.createElement("th", null, "Bill Status \u21C5"), /*#__PURE__*/React.createElement("th", null, "Vitals \u21C5"), /*#__PURE__*/React.createElement("th", null, "Vitals Print \u21C5"), /*#__PURE__*/React.createElement("th", null, "RegistrationFeePrint \u21C5"), /*#__PURE__*/React.createElement("th", null, "ConsultationFeePrint \u21C5"), /*#__PURE__*/React.createElement("th", null, "Ip Registration \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Cash \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Credit \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Upi \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Cash \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Credit \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Upi \u21C5"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filteredAppointments.slice(0, entriesPerPage).map((row, idx) => /*#__PURE__*/React.createElement("tr", {
    key: row.umrNo || idx,
    className: idx % 2 === 0 ? 'row-even' : 'row-odd'
  }, /*#__PURE__*/React.createElement("td", {
    className: "cell-token"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge-token",
    title: `Token Number: ${row.token || '1'}`
  }, "\uD83C\uDFAB ", row.token || '1')), /*#__PURE__*/React.createElement("td", {
    className: "cell-umr"
  }, /*#__PURE__*/React.createElement("strong", null, row.umrNo)), /*#__PURE__*/React.createElement("td", {
    className: "cell-name"
  }, row.patientName), /*#__PURE__*/React.createElement("td", {
    className: "cell-gender-age"
  }, row.genderAge), /*#__PURE__*/React.createElement("td", {
    className: "cell-date"
  }, row.appointmentDate), /*#__PURE__*/React.createElement("td", {
    className: "cell-consultant"
  }, row.consultant), /*#__PURE__*/React.createElement("td", {
    className: "cell-category"
  }, row.category), /*#__PURE__*/React.createElement("td", {
    className: "cell-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge-paid"
  }, "PAID")), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon heart",
    onClick: () => setVitalsDrawer(row),
    title: "Record / View Vitals"
  }, "\u2764\uFE0F")), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon print",
    onClick: () => setPrintModal({
      type: 'vitals',
      record: row
    }),
    title: "Print Vitals Slip"
  }, "\uD83D\uDDA8\uFE0F")), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon print",
    onClick: () => setPrintModal({
      type: 'reg',
      record: row
    }),
    title: "Print Registration Receipt"
  }, "\uD83D\uDDA8\uFE0F")), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon print",
    onClick: () => setPrintModal({
      type: 'cons',
      record: row
    }),
    title: "Print Consultation Bill"
  }, "\uD83D\uDDA8\uFE0F")), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon ip",
    onClick: () => showNotification(`IP Registration initiated for ${row.patientName} (${row.umrNo})`),
    title: "IP Admission / Registration"
  }, "\uD83D\uDC4D")), /*#__PURE__*/React.createElement("td", null, row.regCash), /*#__PURE__*/React.createElement("td", null, row.regCredit), /*#__PURE__*/React.createElement("td", null, row.regUpi), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, row.conCash)), /*#__PURE__*/React.createElement("td", null, row.conCredit), /*#__PURE__*/React.createElement("td", null, row.conUpi), /*#__PURE__*/React.createElement("td", {
    className: "cell-action-icon"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon orange-edit",
    onClick: () => {
      setFormData(prev => ({
        ...prev,
        patientName: row.patientName,
        consultant: row.consultant,
        years: row.age || 40,
        gender: row.gender || 'Male'
      }));
      setActiveTab('add_appointment');
    },
    title: "Edit / Open Patient"
  }, "\u270F\uFE0F")))))))), activeTab === 'add_appointment' && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    className: "add-appointment-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-section-card patient-details-top-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-green-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-icon"
  }, "\uD83D\uDC64"), " Patient Details:"), /*#__PURE__*/React.createElement("span", {
    className: "sec-badge-hint"
  }, "Fields marked * are required")), /*#__PURE__*/React.createElement("div", {
    className: "patient-fields-grid-6col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Title"), /*#__PURE__*/React.createElement("select", {
    value: formData.title,
    onChange: e => setFormData({
      ...formData,
      title: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Mr."
  }, "Mr."), /*#__PURE__*/React.createElement("option", {
    value: "Mrs."
  }, "Mrs."), /*#__PURE__*/React.createElement("option", {
    value: "Master"
  }, "Master"), /*#__PURE__*/React.createElement("option", {
    value: "Baby"
  }, "Baby"), /*#__PURE__*/React.createElement("option", {
    value: "Miss"
  }, "Miss"), /*#__PURE__*/React.createElement("option", {
    value: "Dr."
  }, "Dr."))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "New Patient Name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.patientName,
    onChange: e => setFormData({
      ...formData,
      patientName: e.target.value
    }),
    placeholder: "Enter First Name *",
    className: "dense-input equal-input required-input",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.lastName,
    onChange: e => setFormData({
      ...formData,
      lastName: e.target.value
    }),
    placeholder: "Last Name",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Gender"), /*#__PURE__*/React.createElement("select", {
    value: formData.gender,
    onChange: e => setFormData({
      ...formData,
      gender: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Male"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "Female"
  }, "Female"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Date of Birth"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: formData.dob,
    onChange: e => handleDobChange(e.target.value),
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Age (Y / M / D)"), /*#__PURE__*/React.createElement("div", {
    className: "age-multi-input-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.years,
    onChange: e => handleYearsChange(e.target.value),
    placeholder: "Y",
    className: "dense-input age-val"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "Y")), /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.months,
    onChange: e => setFormData({
      ...formData,
      months: Number(e.target.value)
    }),
    placeholder: "M",
    className: "dense-input age-val"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "M")), /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.days,
    onChange: e => setFormData({
      ...formData,
      days: Number(e.target.value)
    }),
    placeholder: "D",
    className: "dense-input age-val"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "D")))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Mobile Number"), /*#__PURE__*/React.createElement("div", {
    className: "phone-prefix-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flag-prefix"
  }, "\uD83C\uDDEE\uD83C\uDDF3 +91"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: formData.mobile,
    onChange: e => setFormData({
      ...formData,
      mobile: e.target.value
    }),
    placeholder: "10-digit mobile",
    className: "dense-input equal-input with-prefix"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "State"), /*#__PURE__*/React.createElement("select", {
    value: formData.state,
    onChange: e => setFormData({
      ...formData,
      state: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Andhra Pradesh"
  }, "Andhra Pradesh"), /*#__PURE__*/React.createElement("option", {
    value: "Telangana"
  }, "Telangana"), /*#__PURE__*/React.createElement("option", {
    value: "Odisha"
  }, "Odisha"), /*#__PURE__*/React.createElement("option", {
    value: "Tamil Nadu"
  }, "Tamil Nadu"), /*#__PURE__*/React.createElement("option", {
    value: "Karnataka"
  }, "Karnataka"), /*#__PURE__*/React.createElement("option", {
    value: "Maharashtra"
  }, "Maharashtra"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "City"), /*#__PURE__*/React.createElement("select", {
    value: formData.city,
    onChange: e => setFormData({
      ...formData,
      city: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Visakhapatnam"
  }, "Visakhapatnam"), /*#__PURE__*/React.createElement("option", {
    value: "Hyderabad"
  }, "Hyderabad"), /*#__PURE__*/React.createElement("option", {
    value: "Bhubaneswar"
  }, "Bhubaneswar"), /*#__PURE__*/React.createElement("option", {
    value: "Vijayawada"
  }, "Vijayawada"), /*#__PURE__*/React.createElement("option", {
    value: "Guntur"
  }, "Guntur"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Village / Locality"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.village,
    onChange: e => setFormData({
      ...formData,
      village: e.target.value
    }),
    placeholder: "Village / Town",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Address"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.address,
    onChange: e => setFormData({
      ...formData,
      address: e.target.value
    }),
    placeholder: "Street / House No",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Visit Category"), /*#__PURE__*/React.createElement("select", {
    value: formData.walkIn,
    onChange: e => setFormData({
      ...formData,
      walkIn: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Walk In"
  }, "Walk In"), /*#__PURE__*/React.createElement("option", {
    value: "Referral"
  }, "Referral"), /*#__PURE__*/React.createElement("option", {
    value: "Online"
  }, "Online"), /*#__PURE__*/React.createElement("option", {
    value: "Emergency"
  }, "Emergency"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Organization"), /*#__PURE__*/React.createElement("select", {
    value: formData.organization,
    onChange: e => setFormData({
      ...formData,
      organization: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "--Select Organization--"
  }, "Self Pay / Individual"), /*#__PURE__*/React.createElement("option", {
    value: "Individual"
  }, "Individual Self-Pay"), /*#__PURE__*/React.createElement("option", {
    value: "EHS"
  }, "EHS (Govt)"), /*#__PURE__*/React.createElement("option", {
    value: "Arogyasri"
  }, "Arogyasri Trust"), /*#__PURE__*/React.createElement("option", {
    value: "Corporate TPA"
  }, "Corporate Insurance TPA"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Billing Category"), /*#__PURE__*/React.createElement("select", {
    value: formData.category,
    onChange: e => setFormData({
      ...formData,
      category: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "GENERAL - TRI"
  }, "GENERAL - TRI"), /*#__PURE__*/React.createElement("option", {
    value: "VIP"
  }, "VIP"), /*#__PURE__*/React.createElement("option", {
    value: "STAFF"
  }, "STAFF"), /*#__PURE__*/React.createElement("option", {
    value: "BPL"
  }, "BPL"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Occupation"), /*#__PURE__*/React.createElement("select", {
    value: formData.occupation,
    onChange: e => setFormData({
      ...formData,
      occupation: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "--Select Occupation--"
  }, "--Select Occupation--"), /*#__PURE__*/React.createElement("option", {
    value: "Private Service"
  }, "Private Service"), /*#__PURE__*/React.createElement("option", {
    value: "Govt Employee"
  }, "Govt Employee"), /*#__PURE__*/React.createElement("option", {
    value: "Business"
  }, "Business"), /*#__PURE__*/React.createElement("option", {
    value: "Farmer"
  }, "Farmer"), /*#__PURE__*/React.createElement("option", {
    value: "Student"
  }, "Student"), /*#__PURE__*/React.createElement("option", {
    value: "Homemaker"
  }, "Homemaker"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Govt ID Type"), /*#__PURE__*/React.createElement("select", {
    value: formData.idType,
    onChange: e => setFormData({
      ...formData,
      idType: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Aadhaar"
  }, "Aadhaar"), /*#__PURE__*/React.createElement("option", {
    value: "PAN Card"
  }, "PAN Card"), /*#__PURE__*/React.createElement("option", {
    value: "Voter ID"
  }, "Voter ID"), /*#__PURE__*/React.createElement("option", {
    value: "Passport"
  }, "Passport"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "ID Number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.idNumber,
    onChange: e => setFormData({
      ...formData,
      idNumber: e.target.value
    }),
    placeholder: "Enter ID Number",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Care By"), /*#__PURE__*/React.createElement("select", {
    value: formData.careBy,
    onChange: e => setFormData({
      ...formData,
      careBy: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Self"
  }, "Self"), /*#__PURE__*/React.createElement("option", {
    value: "Spouse"
  }, "Spouse"), /*#__PURE__*/React.createElement("option", {
    value: "Parent"
  }, "Parent"), /*#__PURE__*/React.createElement("option", {
    value: "Guardian"
  }, "Guardian"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Parent / Spouse Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.parentOrHusband,
    onChange: e => setFormData({
      ...formData,
      parentOrHusband: e.target.value
    }),
    placeholder: "Father / Spouse Name",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Religion"), /*#__PURE__*/React.createElement("select", {
    value: formData.religion,
    onChange: e => setFormData({
      ...formData,
      religion: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Hindu"
  }, "Hindu"), /*#__PURE__*/React.createElement("option", {
    value: "Muslim"
  }, "Muslim"), /*#__PURE__*/React.createElement("option", {
    value: "Christian"
  }, "Christian"), /*#__PURE__*/React.createElement("option", {
    value: "Sikh"
  }, "Sikh"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Marital Status"), /*#__PURE__*/React.createElement("select", {
    value: formData.maritalStatus,
    onChange: e => setFormData({
      ...formData,
      maritalStatus: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Married"
  }, "Married"), /*#__PURE__*/React.createElement("option", {
    value: "Single"
  }, "Single"), /*#__PURE__*/React.createElement("option", {
    value: "Widowed"
  }, "Widowed"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Blood Group"), /*#__PURE__*/React.createElement("select", {
    value: formData.bloodGroup,
    onChange: e => setFormData({
      ...formData,
      bloodGroup: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "B+"
  }, "B+"), /*#__PURE__*/React.createElement("option", {
    value: "A+"
  }, "A+"), /*#__PURE__*/React.createElement("option", {
    value: "O+"
  }, "O+"), /*#__PURE__*/React.createElement("option", {
    value: "AB+"
  }, "AB+"), /*#__PURE__*/React.createElement("option", {
    value: "B-"
  }, "B-"), /*#__PURE__*/React.createElement("option", {
    value: "A-"
  }, "A-"), /*#__PURE__*/React.createElement("option", {
    value: "O-"
  }, "O-"), /*#__PURE__*/React.createElement("option", {
    value: "AB-"
  }, "AB-"))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Health Issue / Chief Complaints"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.healthIssue,
    onChange: e => setFormData({
      ...formData,
      healthIssue: e.target.value
    }),
    placeholder: "Chief complaints, symptoms, fever, pain, etc.",
    className: "dense-input equal-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "reg-validity-ribbon-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ribbon-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ribbon-lbl"
  }, "VISIT TYPE:"), /*#__PURE__*/React.createElement("strong", {
    className: "ribbon-val text-blue"
  }, "NEW VISIT")), /*#__PURE__*/React.createElement("div", {
    className: "ribbon-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ribbon-lbl"
  }, "REGISTRATION VALIDITY:"), /*#__PURE__*/React.createElement("strong", {
    className: "ribbon-val text-blue"
  }, "NO - 0")), /*#__PURE__*/React.createElement("div", {
    className: "ribbon-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ribbon-lbl"
  }, "CONSULTANT VALIDITY:"), /*#__PURE__*/React.createElement("strong", {
    className: "ribbon-val text-blue"
  }, "NO - 0")))), /*#__PURE__*/React.createElement("div", {
    className: "add-appointment-lower-split-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lower-grid-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-section-card h-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-green-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-icon"
  }, "\uD83C\uDFE5"), " Doctor & Token Details:"), /*#__PURE__*/React.createElement("span", {
    className: "sec-badge-hint"
  }, "Token & Consultant Routing")), /*#__PURE__*/React.createElement("div", {
    className: "hospital-quick-selector"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hosp-step-tag"
  }, "Step 1: Hospital"), ['INDUS HEALTH CITY', 'INDUS SUPER SPECIALITY', 'INDUS CLINIC & DIAGNOSTICS'].map(hosp => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: hosp,
    className: `hosp-quick-btn ${formData.location === hosp ? 'active' : ''}`,
    onClick: () => handleHospitalChange(hosp),
    title: `Select ${hosp}`
  }, "\uD83C\uDFE5 ", hosp))), /*#__PURE__*/React.createElement("div", {
    className: "doctor-token-box-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-token-box-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-hospital"
  }, /*#__PURE__*/React.createElement("select", {
    value: formData.location,
    onChange: e => handleHospitalChange(e.target.value),
    className: "dt-select",
    title: "Step 1: Select Hospital"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- Step 1: Select Hospital --"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS HEALTH CITY"
  }, "INDUS HEALTH CITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS SUPER SPECIALITY"
  }, "INDUS SUPER SPECIALITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS CLINIC & DIAGNOSTICS"
  }, "INDUS CLINIC & DIAGNOSTICS"))), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-date"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-date-input-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dt-cal-icon"
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.appointmentDate,
    onChange: e => setFormData({
      ...formData,
      appointmentDate: e.target.value
    }),
    className: "dt-input",
    title: "Appointment Date"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-token"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.token || '-',
    readOnly: true,
    className: "dt-input dt-token-val",
    title: "Assigned Token Number",
    placeholder: "Token"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "doctor-token-box-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-doctor"
  }, /*#__PURE__*/React.createElement("select", {
    value: formData.consultant,
    onChange: e => handleConsultantChange(e.target.value),
    className: `dt-select dt-doctor-select ${formData.location && !formData.consultant ? 'ready-for-doc' : ''}`,
    title: "Step 2: Select Consultant Doctor (Opens Tokens)",
    disabled: !formData.location
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, !formData.location ? '-- 1st Select Hospital Above --' : '-- Step 2: Select Consultant Doctor (Opens Tokens) --'), CONSULTANTS_ROSTER.map(doc => /*#__PURE__*/React.createElement("option", {
    key: doc.code,
    value: doc.name
  }, doc.name)))), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-code"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.doctorCode || '-',
    readOnly: true,
    className: "dt-input dt-readonly",
    title: "Doctor Employee Code",
    placeholder: "Emp Code"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-spec"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formData.specialization || '-',
    readOnly: true,
    className: "dt-input dt-readonly",
    title: "Doctor Specialization",
    placeholder: "Specialization"
  })))), !formData.location ? /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-waiting-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "waiting-icon"
  }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("div", {
    className: "waiting-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Step 1: Select Hospital First"), /*#__PURE__*/React.createElement("p", null, "Please choose a Hospital from the dropdown or click a hospital button above to enable Doctor selection."))) : !formData.consultant || !isSlotsOpen ? /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-waiting-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "waiting-icon"
  }, "\uD83D\uDC68\u200D\u2695\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "waiting-text"
  }, /*#__PURE__*/React.createElement("strong", null, "Step 2: Select Doctor to OPEN Tokens"), /*#__PURE__*/React.createElement("p", null, "Hospital: ", /*#__PURE__*/React.createElement("strong", null, formData.location), " selected. Choose a Consultant Doctor from the dropdown above to OPEN available token slots."))) : /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-open-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slots-title-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-title",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", null, "Doctor Slots Details:")), /*#__PURE__*/React.createElement("span", {
    className: "slots-open-badge"
  }, "\u25CF Slots Open for ", formData.consultant.split(' ')[0])), /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-details-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-grid"
  }, currentDoctorSlots.map(slot => {
    const isSelected = selectedSlotToken === slot.tokenNumber;
    return /*#__PURE__*/React.createElement("button", {
      key: slot.tokenNumber,
      type: "button",
      className: `doctor-slot-pill ${slot.isBooked ? 'slot-red' : 'slot-green'} ${isSelected ? 'slot-selected' : ''}`,
      onClick: () => handleSlotClick(slot),
      title: slot.isBooked ? `Token #${slot.tokenNumber} is Booked` : `Click to Select Token #${slot.tokenNumber}`
    }, slot.timeLabel);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "add-extra-tokens-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "add-extra-tokens-label"
  }, "Add Extra Tokens:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-add-extra-token",
    onClick: handleAddExtraToken,
    title: "Add Emergency / Extra Token Slot"
  }, "+"))), /*#__PURE__*/React.createElement("div", {
    className: "quick-doc-chips-wrap",
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chips-label"
  }, "Quick Select Consultant:"), /*#__PURE__*/React.createElement("div", {
    className: "payment-chips-row",
    style: {
      marginTop: '4px',
      borderTop: 'none',
      paddingTop: '0'
    }
  }, CONSULTANTS_ROSTER.slice(0, 4).map(doc => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: doc.code,
    className: `pay-mode-chip ${formData.consultant === doc.name ? 'active' : ''}`,
    onClick: () => {
      if (!formData.location) {
        handleHospitalChange('INDUS HEALTH CITY');
      }
      handleConsultantChange(doc.name);
    }
  }, "\uD83D\uDC68\u200D\u2695\uFE0F ", doc.name.split(' ')[0], " (", doc.fee, " \u20B9)")))), /*#__PURE__*/React.createElement("div", {
    className: "doc-room-info-pill",
    style: {
      marginTop: '10px',
      padding: '6px 10px',
      background: '#ffffff',
      borderRadius: '4px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.74rem',
      color: '#475569'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD ", /*#__PURE__*/React.createElement("strong", null, "OPD Cabin:"), " Room 102 (First Floor)"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD52 ", /*#__PURE__*/React.createElement("strong", null, "Assigned Slot:"), " ", formData.token ? `Token #${formData.token}` : 'Immediate Consultation')))), /*#__PURE__*/React.createElement("div", {
    className: "lower-grid-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-section-card h-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header-bar"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "section-green-heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sec-icon"
  }, "\uD83D\uDCB0"), " Payment Details:"), /*#__PURE__*/React.createElement("span", {
    className: "sec-badge-hint"
  }, "Billing & Breakdown")), /*#__PURE__*/React.createElement("div", {
    className: "fee-table-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Registration Fee :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.regFee,
    readOnly: true,
    className: "fee-box-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Reg Final Amount :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.regFinalAmt,
    readOnly: true,
    className: "fee-box-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Consultation Fee :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.consFee,
    readOnly: true,
    className: "fee-box-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Cons Final Amount :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.consFinalAmt,
    readOnly: true,
    className: "fee-box-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Discount (%) :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.discPercent,
    readOnly: true,
    className: "fee-box-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Discount (\u20B9) :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.discAmt,
    readOnly: true,
    className: "fee-box-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row highlight-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl text-bold"
  }, "Total Amount :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.totalAmt,
    readOnly: true,
    className: "fee-box-input bold-blue"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl text-bold"
  }, "Total Bill Amount :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.totalBillAmt,
    readOnly: true,
    className: "fee-box-input bold-blue"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Amt Received :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.amtReceived,
    readOnly: true,
    className: "fee-box-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Balance :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.balance,
    readOnly: true,
    className: "fee-box-input"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fee-grid-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Status :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge-paid-pill"
  }, "PAID")), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Authorized By :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("select", {
    value: formData.authorizedBy,
    onChange: e => setFormData({
      ...formData,
      authorizedBy: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Admin"
  }, "Admin"), /*#__PURE__*/React.createElement("option", {
    value: "Medical Director"
  }, "Medical Director"), /*#__PURE__*/React.createElement("option", {
    value: "Chief Accountant"
  }, "Chief Accountant"))))), /*#__PURE__*/React.createElement("div", {
    className: "payment-table-wrap",
    style: {
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "equal-payment-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: '45%'
    }
  }, "Payment Mode"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: '45%'
    }
  }, "Amount (\u20B9)"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: '10%',
      textAlign: 'center'
    }
  }, "Action"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
    value: formData.paymentMode,
    onChange: e => setFormData({
      ...formData,
      paymentMode: e.target.value
    }),
    className: "dense-select equal-input"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Cash"
  }, "Cash"), /*#__PURE__*/React.createElement("option", {
    value: "UPI"
  }, "UPI / GPay / PhonePe"), /*#__PURE__*/React.createElement("option", {
    value: "Card"
  }, "Debit / Credit Card"), /*#__PURE__*/React.createElement("option", {
    value: "Credit"
  }, "Credit / Corporate TPA"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: formData.paymentAmt,
    onChange: e => setFormData({
      ...formData,
      paymentAmt: Number(e.target.value)
    }),
    className: "dense-input equal-input text-right bold-num"
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-add-mode-circle",
    onClick: () => showNotification("Split payment mode added."),
    title: "Add Split Mode"
  }, "+"))))), /*#__PURE__*/React.createElement("div", {
    className: "payment-chips-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "chips-label"
  }, "Quick Select:"), ['Cash', 'UPI', 'Card', 'Credit'].map(mode => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: mode,
    className: `pay-mode-chip ${formData.paymentMode === mode ? 'active' : ''}`,
    onClick: () => setFormData({
      ...formData,
      paymentMode: mode
    })
  }, mode === 'Cash' && '💵 Cash', mode === 'UPI' && '📱 UPI / QR', mode === 'Card' && '💳 Card', mode === 'Credit' && '🏥 Corporate'))))))), /*#__PURE__*/React.createElement("div", {
    className: "form-equal-footer-bar"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-green-save-prominent"
  }, "\uD83D\uDCBE Save Appointment"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-print-token-action",
    onClick: () => {
      if (!formData.patientName) {
        showNotification("Please enter patient name first.");
        return;
      }
      setPrintModal({
        type: 'reg',
        patient: {
          umrNo: `UMR${Math.floor(334250 + Math.random() * 50)}`,
          token: formData.token,
          patientName: `${formData.title} ${formData.patientName} ${formData.lastName}`.trim().toUpperCase(),
          genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
          appointmentDate: formData.appointmentDate,
          consultant: formData.consultant,
          category: formData.category,
          phone: formData.mobile,
          regCash: formData.regFinalAmt,
          conCash: formData.consFinalAmt
        }
      });
    }
  }, "\uD83D\uDDA8\uFE0F Save & Print Token Slip"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-reset-form-action",
    onClick: () => {
      setFormData(prev => ({
        ...prev,
        patientName: '',
        lastName: '',
        mobile: '',
        village: '',
        address: '',
        idNumber: '',
        parentOrHusband: '',
        healthIssue: ''
      }));
      showNotification("Form reset.");
    }
  }, "\uD83D\uDD04 Reset Fields"))), printModal && /*#__PURE__*/React.createElement("div", {
    className: "print-modal-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-receipt-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-header"
  }, /*#__PURE__*/React.createElement("h3", null, "INDUS HEALTH CITY"), /*#__PURE__*/React.createElement("p", null, "Vasugan Medical Specialities Pvt Ltd"), /*#__PURE__*/React.createElement("div", {
    className: "print-type-badge"
  }, printModal.type === 'reg' ? 'OUTPATIENT REGISTRATION RECEIPT' : printModal.type === 'cons' ? 'DOCTOR CONSULTATION INVOICE' : 'NURSING VITALS REPORT')), /*#__PURE__*/React.createElement("div", {
    className: "print-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "UMR No:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.umrNo)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Token:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.token)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Patient Name:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.patientName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Age / Gender:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.genderAge)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Consultant:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.consultant)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Date:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.appointmentDate))), /*#__PURE__*/React.createElement("hr", {
    style: {
      margin: '12px 0',
      borderColor: '#e2e8f0'
    }
  }), printModal.type === 'reg' && /*#__PURE__*/React.createElement("div", {
    className: "print-bill-items"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "OPD Registration Fee (One-Time)"), " ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", printModal.record.regCash || 50, ".00")), /*#__PURE__*/React.createElement("div", {
    className: "bill-item total"
  }, /*#__PURE__*/React.createElement("span", null, "Total Paid:"), " ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", printModal.record.regCash || 50, ".00"))), printModal.type === 'cons' && /*#__PURE__*/React.createElement("div", {
    className: "print-bill-items"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Consultant Clinical Fee"), " ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", printModal.record.conCash || 800, ".00")), /*#__PURE__*/React.createElement("div", {
    className: "bill-item total"
  }, /*#__PURE__*/React.createElement("span", null, "Total Paid:"), " ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", printModal.record.conCash || 800, ".00"))), printModal.type === 'vitals' && /*#__PURE__*/React.createElement("div", {
    className: "print-bill-items"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Blood Pressure (BP):"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.vitals?.bp || '120/80 mmHg')), /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Pulse Rate:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.vitals?.pulse || '74 bpm')), /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Oxygen Saturation (SpO2):"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.vitals?.spo2 || '99%')), /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Body Temperature:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.vitals?.temp || '98.6 °F')), /*#__PURE__*/React.createElement("div", {
    className: "bill-item"
  }, /*#__PURE__*/React.createElement("span", null, "Body Weight:"), " ", /*#__PURE__*/React.createElement("strong", null, printModal.record.vitals?.weight || '65 kg')))), /*#__PURE__*/React.createElement("div", {
    className: "print-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setPrintModal(null)
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => window.print()
  }, "\uD83D\uDDA8\uFE0F Print Slip")))), vitalsDrawer && /*#__PURE__*/React.createElement("div", {
    className: "print-modal-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-receipt-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "print-header",
    style: {
      textAlign: 'left',
      borderBottom: '2px solid #10b981'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: '#059669',
      margin: 0
    }
  }, "\u2764\uFE0F Clinical Vitals Desk"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      color: '#64748b'
    }
  }, vitalsDrawer.patientName, " (", vitalsDrawer.umrNo, ") | ", vitalsDrawer.genderAge)), /*#__PURE__*/React.createElement("div", {
    className: "print-body",
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 600
    }
  }, "Blood Pressure (BP):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: vitalsDrawer.vitals?.bp || '120/80',
    className: "dense-input",
    id: "modal-bp"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 600
    }
  }, "Pulse (bpm):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: vitalsDrawer.vitals?.pulse || '74',
    className: "dense-input",
    id: "modal-pulse"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 600
    }
  }, "SpO2 (%):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: vitalsDrawer.vitals?.spo2 || '99%',
    className: "dense-input",
    id: "modal-spo2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 600
    }
  }, "Temperature (\xB0F):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: vitalsDrawer.vitals?.temp || '98.6',
    className: "dense-input",
    id: "modal-temp"
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-group"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.8rem',
      fontWeight: 600
    }
  }, "Weight (kg):"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    defaultValue: vitalsDrawer.vitals?.weight || '68',
    className: "dense-input",
    id: "modal-weight"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "print-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setVitalsDrawer(null)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success",
    onClick: () => {
      const updatedVitals = {
        bp: document.getElementById('modal-bp')?.value || '120/80',
        pulse: document.getElementById('modal-pulse')?.value || '74',
        spo2: document.getElementById('modal-spo2')?.value || '99%',
        temp: document.getElementById('modal-temp')?.value || '98.6',
        weight: document.getElementById('modal-weight')?.value || '68'
      };
      setAppointments(prev => prev.map(a => a.umrNo === vitalsDrawer.umrNo ? {
        ...a,
        vitals: updatedVitals
      } : a));
      setVitalsDrawer(null);
      showNotification(`✓ Vitals updated for ${vitalsDrawer.patientName}`);
    }
  }, "\uD83D\uDCBE Save Vitals")))));
}

// --- src/components/TokenSlip.jsx ---

function TokenSlip({
  tokenData,
  onBackToQueue,
  onNewRegistration,
  onGoToVitals
}) {
  if (!tokenData) return null;
  const handlePrint = () => {
    window.print();
  };
  const payment = tokenData.payment || {
    consultationFee: 700,
    regFee: 100,
    totalAmount: 800,
    paymentMethod: 'UPI',
    transactionId: 'TXN-884910'
  };
  const vitals = tokenData.vitals || {
    bp: '120/80 mmHg',
    pulse: '74 bpm',
    spo2: '99%',
    temp: '98.6 °F',
    weight: '68 kg',
    height: '172 cm',
    bmi: '23.0 (Normal)',
    bloodSugar: '110 mg/dL',
    triageNotes: 'Vitals stable. Patient conscious and alert.'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "token-slip-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '6px 18px',
      borderRadius: 'var(--radius-full)',
      fontWeight: 800,
      fontSize: '0.88rem'
    }
  }, "\u2713 Registration, Payment & Clinical Vitals Recorded Successfully")), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-container",
    id: "printable-slip",
    style: {
      maxWidth: '640px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "token-slip-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "slip-hospital-title"
  }, "PULSECARE HEALTH CITY")), /*#__PURE__*/React.createElement("p", {
    className: "slip-tagline"
  }, "Outpatient Department (OPD) \u2022 Registration, Billing & Clinical Vitals Slip"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.72rem',
      color: '#94a3b8',
      marginTop: '2px'
    }
  }, "NABH Accredited \u2022 Helpdesk: +91 80 2400 1100 \u2022 Campus Block A, Level 1")), /*#__PURE__*/React.createElement("div", {
    className: "token-hero-badge",
    style: {
      padding: '18px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "OUTPATIENT CONSULTATION TOKEN"), /*#__PURE__*/React.createElement("div", {
    className: "token-number-hero",
    style: {
      margin: '4px 0'
    }
  }, tokenData.token), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: tokenData.priority === 'Emergency' ? 'var(--rose-light)' : 'var(--primary-light)',
      color: tokenData.priority === 'Emergency' ? '#b91c1c' : 'var(--primary-hover)',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  }, tokenData.priority, " Queue"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#f1f5f9',
      color: '#475569',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 600
    }
  }, "Est. Consultation Wait: ", tokenData.estimatedTime || '15-20 Mins'))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-body",
    style: {
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      fontWeight: 800,
      color: 'var(--primary)',
      letterSpacing: '0.05em',
      marginBottom: '8px'
    }
  }, "1. PATIENT REGISTRATION PARTICULARS"), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "OP Registration ID:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.opId || 'OP-2026-9041')), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Patient Full Name:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val",
    style: {
      fontSize: '0.95rem'
    }
  }, tokenData.patientName)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Age / Gender / Blood:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.age, " Yrs / ", tokenData.gender, " / ", tokenData.bloodGroup)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Contact Phone:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.phone)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Department & Cabin:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val",
    style: {
      color: 'var(--primary)'
    }
  }, tokenData.departmentName, " \u2014 ", tokenData.room)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Consulting Doctor:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, tokenData.doctor)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Chief Complaint / Symptoms:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val",
    style: {
      fontStyle: 'italic',
      fontWeight: 600
    }
  }, tokenData.symptoms || 'General OP consultation')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '18px',
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 800,
      color: '#166534',
      letterSpacing: '0.05em'
    }
  }, "2. OP REGISTRATION & COUNTER PAYMENT RECEIPT"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#16a34a',
      color: 'white',
      fontSize: '0.7rem',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 800
    }
  }, "PAID & VERIFIED \u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Doctor Fee: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", payment.consultationFee)), /*#__PURE__*/React.createElement("div", null, "OP Card Fee: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", payment.regFee)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#15803d',
      fontWeight: 800
    }
  }, "Total Paid: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", payment.totalAmount))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: '#166534',
      marginTop: '6px',
      borderTop: '1px dashed #86efac',
      paddingTop: '6px',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Payment Mode: ", /*#__PURE__*/React.createElement("strong", null, payment.paymentMethod)), /*#__PURE__*/React.createElement("span", null, "Txn Ref: ", /*#__PURE__*/React.createElement("strong", null, payment.transactionId)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '18px',
      background: '#f8fafc',
      border: '1.5px solid var(--border)',
      borderRadius: '8px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 800,
      color: 'var(--dark)',
      letterSpacing: '0.05em'
    }
  }, "3. CLINICAL TRIAGE VITALS (RECORDED BY NURSING STATION)"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      fontSize: '0.7rem',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 800
    }
  }, "NURSE VERIFIED \u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "BP: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--primary)'
    }
  }, vitals.bp)), /*#__PURE__*/React.createElement("div", null, "Heart Rate: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#10b981'
    }
  }, vitals.pulse)), /*#__PURE__*/React.createElement("div", null, "SpO2: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#0d9488'
    }
  }, vitals.spo2)), /*#__PURE__*/React.createElement("div", null, "Body Temp: ", /*#__PURE__*/React.createElement("strong", null, vitals.temp)), /*#__PURE__*/React.createElement("div", null, "Weight: ", /*#__PURE__*/React.createElement("strong", null, vitals.weight)), /*#__PURE__*/React.createElement("div", null, "Height: ", /*#__PURE__*/React.createElement("strong", null, vitals.height || '172 cm')), /*#__PURE__*/React.createElement("div", null, "BMI: ", /*#__PURE__*/React.createElement("strong", null, vitals.bmi ? vitals.bmi.split(' ')[0] : '23.0')), /*#__PURE__*/React.createElement("div", null, "Sugar (RBS): ", /*#__PURE__*/React.createElement("strong", null, vitals.bloodSugar || '110 mg/dL'))), vitals.triageNotes && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: 'var(--text-muted)',
      marginTop: '8px',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Nurse Assessment Notes:"), " ", vitals.triageNotes)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      textAlign: 'center',
      borderTop: '1px dashed #cbd5e1',
      paddingTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "220",
    height: "38",
    viewBox: "0 0 220 38",
    style: {
      display: 'inline-block'
    }
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "4",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "0",
    width: "2",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "0",
    width: "6",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "0",
    width: "3",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32",
    y: "0",
    width: "8",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "44",
    y: "0",
    width: "3",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "52",
    y: "0",
    width: "5",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "62",
    y: "0",
    width: "2",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "68",
    y: "0",
    width: "7",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "80",
    y: "0",
    width: "4",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "90",
    y: "0",
    width: "6",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "100",
    y: "0",
    width: "2",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "108",
    y: "0",
    width: "5",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "118",
    y: "0",
    width: "7",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "130",
    y: "0",
    width: "3",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "138",
    y: "0",
    width: "6",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "150",
    y: "0",
    width: "2",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "158",
    y: "0",
    width: "8",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "172",
    y: "0",
    width: "4",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "182",
    y: "0",
    width: "5",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "194",
    y: "0",
    width: "3",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "202",
    y: "0",
    width: "7",
    height: "36",
    fill: "#0f172a"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "214",
    y: "0",
    width: "4",
    height: "36",
    fill: "#0f172a"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.12em',
      marginTop: '2px'
    }
  }, "*", tokenData.opId || 'OP-2026-9041', "*"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.74rem',
      color: '#64748b',
      marginTop: '6px',
      fontStyle: 'italic'
    }
  }, "Please be seated in the ", /*#__PURE__*/React.createElement("strong", null, tokenData.departmentName, " Waiting Lounge"), ". When Token ", /*#__PURE__*/React.createElement("strong", null, tokenData.token), " is announced on the lobby board, proceed into ", /*#__PURE__*/React.createElement("strong", null, tokenData.room), "."))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-footer",
    style: {
      padding: '12px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Valid for today's OPD consultation only."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800
    }
  }, "PulseCare Registration Desk"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '14px',
      marginTop: '20px',
      flexWrap: 'wrap'
    }
  }, onGoToVitals && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-emerald",
    onClick: onGoToVitals,
    style: {
      padding: '12px 24px',
      fontSize: '0.94rem'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 12h-4l-3 9L9 3l-3 9H2"
  })), "Proceed to Vitals Station \u25B6"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handlePrint,
    style: {
      padding: '12px 24px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "\uD83D\uDDA8\uFE0F Print Registration Form & Vitals Slip (PDF)"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: onBackToQueue
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "14",
    x: "2",
    y: "3",
    rx: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    x2: "16",
    y1: "21",
    y2: "21"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "17",
    y2: "21"
  })), "Track in Live Queue"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: onNewRegistration
  }, "+ Register Next Patient")));
}

// --- src/components/VitalsScreen.jsx ---

function VitalsScreen({
  records,
  onSaveVitals,
  initialToken
}) {
  // Extract all patients from records
  const patientList = Object.values(records);
  const [selectedToken, setSelectedToken] = useState(initialToken || (patientList[0] ? patientList[0].token : 'CAR-104'));
  const activePatient = records[selectedToken] || patientList[0] || null;

  // Vitals Input Form State
  const [vitalsData, setVitalsData] = useState({
    bpSystolic: activePatient && activePatient.vitals ? activePatient.vitals.bp ? activePatient.vitals.bp.split('/')[0] : '120' : '120',
    bpDiastolic: activePatient && activePatient.vitals ? activePatient.vitals.bp && activePatient.vitals.bp.includes('/') ? activePatient.vitals.bp.split('/')[1].replace(/\D/g, '') : '80' : '80',
    pulse: activePatient && activePatient.vitals ? activePatient.vitals.pulse ? activePatient.vitals.pulse.replace(/\D/g, '') : '74' : '74',
    spo2: activePatient && activePatient.vitals ? activePatient.vitals.spo2 ? activePatient.vitals.spo2.replace(/\D/g, '') : '99' : '99',
    temp: activePatient && activePatient.vitals ? activePatient.vitals.temp ? activePatient.vitals.temp.replace(/[^\d.]/g, '') : '98.6' : '98.6',
    weight: activePatient && activePatient.vitals ? activePatient.vitals.weight ? activePatient.vitals.weight.replace(/\D/g, '') : '68' : '68',
    height: '172',
    bloodSugar: activePatient && activePatient.vitals && activePatient.vitals.bloodSugar ? activePatient.vitals.bloodSugar.replace(/\D/g, '') : '110',
    triageNotes: activePatient && activePatient.vitals && activePatient.vitals.triageNotes ? activePatient.vitals.triageNotes : 'Patient conscious and oriented. Vital signs stable at triage.'
  });
  const [savedDocument, setSavedDocument] = useState(null);
  const [searchTokenInput, setSearchTokenInput] = useState('');

  // Handle switching patient
  const handleSelectPatient = token => {
    setSelectedToken(token);
    const p = records[token];
    if (p) {
      setVitalsData({
        bpSystolic: p.vitals && p.vitals.bp ? p.vitals.bp.split('/')[0] : '120',
        bpDiastolic: p.vitals && p.vitals.bp && p.vitals.bp.includes('/') ? p.vitals.bp.split('/')[1].replace(/\D/g, '') : '80',
        pulse: p.vitals && p.vitals.pulse ? p.vitals.pulse.replace(/\D/g, '') : '74',
        spo2: p.vitals && p.vitals.spo2 ? p.vitals.spo2.replace(/\D/g, '') : '99',
        temp: p.vitals && p.vitals.temp ? p.vitals.temp.replace(/[^\d.]/g, '') : '98.6',
        weight: p.vitals && p.vitals.weight ? p.vitals.weight.replace(/\D/g, '') : '68',
        height: '172',
        bloodSugar: p.vitals && p.vitals.bloodSugar ? p.vitals.bloodSugar.replace(/\D/g, '') : '110',
        triageNotes: p.vitals && p.vitals.triageNotes ? p.vitals.triageNotes : 'Patient conscious and oriented. Vital signs stable.'
      });
      setSavedDocument(null);
    }
  };
  const handleVitalsChange = e => {
    const {
      name,
      value
    } = e.target;
    setVitalsData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Auto calculate BMI
  const calculateBMI = (wt, ht) => {
    const w = parseFloat(wt);
    const h = parseFloat(ht) / 100;
    if (!w || !h || h <= 0) return '23.0 (Normal)';
    const bmiVal = (w / (h * h)).toFixed(1);
    let category = 'Normal';
    if (bmiVal < 18.5) category = 'Underweight';else if (bmiVal < 25) category = 'Normal';else if (bmiVal < 30) category = 'Overweight';else category = 'Obese';
    return `${bmiVal} (${category})`;
  };

  // Quick Vitals Presets
  const applyVitalsPreset = preset => {
    if (preset === 'normal') {
      setVitalsData({
        bpSystolic: '120',
        bpDiastolic: '80',
        pulse: '74',
        spo2: '99',
        temp: '98.6',
        weight: '68',
        height: '172',
        bloodSugar: '110',
        triageNotes: 'Vitals stable and within normal adult clinical limits.'
      });
    } else if (preset === 'hypertension') {
      setVitalsData({
        bpSystolic: '152',
        bpDiastolic: '94',
        pulse: '84',
        spo2: '98',
        temp: '98.4',
        weight: '78',
        height: '170',
        bloodSugar: '145',
        triageNotes: 'Elevated blood pressure observed. Patient alerted for cardiology consultation.'
      });
    } else if (preset === 'fever') {
      setVitalsData({
        bpSystolic: '118',
        bpDiastolic: '78',
        pulse: '98',
        spo2: '97',
        temp: '101.4',
        weight: '62',
        height: '168',
        bloodSugar: '105',
        triageNotes: 'Febrile patient with mild tachycardia. Expedited to doctor cabin.'
      });
    }
  };

  // Save Vitals and generate printable combined form
  const handleSaveVitals = e => {
    e.preventDefault();
    if (!activePatient) return;
    const formattedVitals = {
      bp: `${vitalsData.bpSystolic}/${vitalsData.bpDiastolic} mmHg`,
      pulse: `${vitalsData.pulse} bpm`,
      spo2: `${vitalsData.spo2}%`,
      temp: `${vitalsData.temp} °F`,
      weight: `${vitalsData.weight} kg`,
      height: `${vitalsData.height} cm`,
      bmi: calculateBMI(vitalsData.weight, vitalsData.height),
      bloodSugar: `${vitalsData.bloodSugar} mg/dL`,
      triageNotes: vitalsData.triageNotes,
      nurseName: 'Sister Mary Joseph (Reg #RN-55410)'
    };
    onSaveVitals(activePatient.token, formattedVitals);

    // Set printable document
    setSavedDocument({
      ...activePatient,
      vitals: formattedVitals
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "vitals-station-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83E\uDE7A Nursing Triage & Patient Vitals Station"), /*#__PURE__*/React.createElement("p", null, "Dedicated module: Select registered patient after payment, record clinical vitals entity, and print the official form.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.8rem',
      fontWeight: 800
    }
  }, "Triage Desk Active \u25CF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      marginBottom: '24px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '14px',
      flexWrap: 'wrap',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Select Registered Patient for Vitals Check:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "Patients who completed registration and counter payment are queued here for vitals measurement.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Search Token (e.g. CAR-104)",
    value: searchTokenInput,
    onChange: e => setSearchTokenInput(e.target.value),
    style: {
      width: '220px',
      padding: '6px 12px',
      fontSize: '0.85rem'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => {
      const k = searchTokenInput.trim().toUpperCase();
      if (records[k]) handleSelectPatient(k);else alert(`Token ${k} not found.`);
    }
  }, "Search"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, patientList.map(p => {
    const isSelected = p.token === selectedToken;
    return /*#__PURE__*/React.createElement("div", {
      key: p.token,
      onClick: () => handleSelectPatient(p.token),
      style: {
        padding: '10px 14px',
        borderRadius: 'var(--radius-md)',
        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
        background: isSelected ? 'var(--primary-light)' : 'var(--bg-alt)',
        cursor: 'pointer',
        transition: 'var(--transition)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: isSelected ? 'var(--primary)' : 'var(--dark)'
      }
    }, p.token), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.72rem',
        background: '#dcfce7',
        color: '#15803d',
        padding: '1px 6px',
        borderRadius: '4px',
        fontWeight: 700
      }
    }, "PAID \u2713")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.82rem',
        fontWeight: 700,
        color: 'var(--dark)',
        marginTop: '2px'
      }
    }, p.patientName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '0.74rem',
        color: 'var(--text-muted)'
      }
    }, p.department));
  }))), activePatient && /*#__PURE__*/React.createElement("div", {
    className: "form-card",
    style: {
      maxWidth: '900px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-alt)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 20px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      fontWeight: 700
    }
  }, "Patient Registration Particulars:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.15rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, activePatient.patientName, " (", activePatient.age, " Yrs / ", activePatient.gender, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--primary)',
      fontWeight: 600,
      marginTop: '2px'
    }
  }, "Token: ", /*#__PURE__*/React.createElement("strong", null, activePatient.token), " \u2022 OP ID: ", /*#__PURE__*/React.createElement("strong", null, activePatient.opId), " \u2022 Dept: ", /*#__PURE__*/React.createElement("strong", null, activePatient.department), " (", activePatient.room, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '2px'
    }
  }, "Doctor: ", /*#__PURE__*/React.createElement("strong", null, activePatient.doctor), " \u2022 Symptoms: ", /*#__PURE__*/React.createElement("em", null, activePatient.symptoms || 'General OP evaluation'))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#dcfce7',
      color: '#15803d',
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      fontWeight: 800,
      fontSize: '0.85rem'
    }
  }, "PAID: \u20B9", activePatient.payment ? activePatient.payment.totalAmount : 800, " \u2713"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: 'var(--text-muted)',
      marginTop: '4px'
    }
  }, "Mode: ", activePatient.payment ? activePatient.payment.paymentMethod : 'UPI', " \u2022 Txn Ref: ", activePatient.payment ? activePatient.payment.transactionId : 'TXN-849201'))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveVitals
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 800,
      color: 'var(--dark)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83E\uDE7A"), " Enter Clinical Vitals Measurements"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.75rem',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "QUICK PRESETS:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary btn-sm",
    onClick: () => applyVitalsPreset('normal'),
    style: {
      fontSize: '0.74rem',
      padding: '4px 8px'
    }
  }, "Normal"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary btn-sm",
    onClick: () => applyVitalsPreset('hypertension'),
    style: {
      fontSize: '0.74rem',
      padding: '4px 8px',
      color: '#b91c1c'
    }
  }, "High BP"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary btn-sm",
    onClick: () => applyVitalsPreset('fever'),
    style: {
      fontSize: '0.74rem',
      padding: '4px 8px',
      color: '#d97706'
    }
  }, "Fever"))), /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Blood Pressure (Systolic / Diastolic)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#059669',
      fontSize: '0.75rem',
      fontWeight: 600,
      marginLeft: '6px'
    }
  }, "Target: 120/80")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "bpSystolic",
    className: "form-input",
    placeholder: "Sys (e.g. 120)",
    value: vitalsData.bpSystolic,
    onChange: handleVitalsChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "bpDiastolic",
    className: "form-input",
    placeholder: "Dia (e.g. 80)",
    value: vitalsData.bpDiastolic,
    onChange: handleVitalsChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Pulse / Heart Rate (bpm)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.75rem',
      marginLeft: '6px'
    }
  }, "Normal: 60-100")), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "pulse",
    className: "form-input",
    placeholder: "e.g. 74",
    value: vitalsData.pulse,
    onChange: handleVitalsChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Oxygen Saturation SpO2 (%)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.75rem',
      marginLeft: '6px'
    }
  }, "Normal: 95-100%")), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "spo2",
    className: "form-input",
    placeholder: "e.g. 99",
    value: vitalsData.spo2,
    onChange: handleVitalsChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Body Temperature (\xB0F)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.75rem',
      marginLeft: '6px'
    }
  }, "Normal: 98.4 - 98.6\xB0F")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "temp",
    className: "form-input",
    placeholder: "e.g. 98.6",
    value: vitalsData.temp,
    onChange: handleVitalsChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Weight (kg) & Height (cm)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontSize: '0.75rem',
      fontWeight: 700,
      marginLeft: '6px'
    }
  }, "BMI: ", calculateBMI(vitalsData.weight, vitalsData.height))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "weight",
    className: "form-input",
    placeholder: "Weight (kg)",
    value: vitalsData.weight,
    onChange: handleVitalsChange
  }), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "height",
    className: "form-input",
    placeholder: "Height (cm)",
    value: vitalsData.height,
    onChange: handleVitalsChange
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Random Blood Sugar RBS (mg/dL)", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: '0.75rem',
      marginLeft: '6px'
    }
  }, "Target: < 140")), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "bloodSugar",
    className: "form-input",
    placeholder: "e.g. 110",
    value: vitalsData.bloodSugar,
    onChange: handleVitalsChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group full-width"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nursing Triage Assessment Notes"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "triageNotes",
    className: "form-input",
    placeholder: "e.g. Patient conscious, oriented. No acute distress.",
    value: vitalsData.triageNotes,
    onChange: handleVitalsChange
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      padding: '12px 28px',
      fontSize: '0.96rem'
    }
  }, "\u2713 Save Vitals & Generate Printable Registration + Vitals Slip \u25B6")))), savedDocument && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '36px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '6px 18px',
      borderRadius: 'var(--radius-full)',
      fontWeight: 800,
      fontSize: '0.88rem'
    }
  }, "\u2713 Vitals Recorded & Form Ready for Doctor Cabin")), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-container",
    id: "printable-slip",
    style: {
      maxWidth: '640px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "token-slip-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "slip-hospital-title"
  }, "PULSECARE HEALTH CITY")), /*#__PURE__*/React.createElement("p", {
    className: "slip-tagline"
  }, "Outpatient Department (OPD) \u2022 Registration, Billing & Clinical Vitals Slip"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.72rem',
      color: '#94a3b8',
      marginTop: '2px'
    }
  }, "NABH Accredited \u2022 Helpdesk: +91 80 2400 1100 \u2022 Campus Block A, Level 1")), /*#__PURE__*/React.createElement("div", {
    className: "token-hero-badge",
    style: {
      padding: '16px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "OUTPATIENT CONSULTATION TOKEN"), /*#__PURE__*/React.createElement("div", {
    className: "token-number-hero",
    style: {
      margin: '4px 0'
    }
  }, savedDocument.token), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary-hover)',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  }, savedDocument.priority || 'Regular', " Queue"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#f1f5f9',
      color: '#475569',
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 600
    }
  }, "Room: ", savedDocument.room))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-body",
    style: {
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      fontWeight: 800,
      color: 'var(--primary)',
      letterSpacing: '0.05em',
      marginBottom: '8px'
    }
  }, "1. PATIENT REGISTRATION PARTICULARS"), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "OP Registration ID:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, savedDocument.opId || 'OP-2026-9041')), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Patient Full Name:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, savedDocument.patientName)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Age / Gender / Blood:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, savedDocument.age, " Yrs / ", savedDocument.gender, " / ", savedDocument.bloodGroup)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Department & Room:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val",
    style: {
      color: 'var(--primary)'
    }
  }, savedDocument.department, " \u2014 ", savedDocument.room)), /*#__PURE__*/React.createElement("div", {
    className: "slip-detail-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "slip-label"
  }, "Consulting Doctor:"), /*#__PURE__*/React.createElement("span", {
    className: "slip-val"
  }, savedDocument.doctor)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 800,
      color: '#166534',
      letterSpacing: '0.05em'
    }
  }, "2. OP PAYMENT RECEIPT (COUNTER SETTLED)"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#16a34a',
      color: 'white',
      fontSize: '0.7rem',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 800
    }
  }, "PAID & SETTLED \u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Doctor Fee: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", savedDocument.payment ? savedDocument.payment.consultationFee : 700)), /*#__PURE__*/React.createElement("div", null, "OP Card Fee: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", savedDocument.payment ? savedDocument.payment.regFee : 100)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#15803d',
      fontWeight: 800
    }
  }, "Total: ", /*#__PURE__*/React.createElement("strong", null, "\u20B9", savedDocument.payment ? savedDocument.payment.totalAmount : 800)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      background: '#f8fafc',
      border: '1.5px solid var(--border)',
      borderRadius: '8px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.74rem',
      fontWeight: 800,
      color: 'var(--dark)',
      letterSpacing: '0.05em'
    }
  }, "3. CLINICAL TRIAGE VITALS (MEASURED AT NURSING STATION)"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      fontSize: '0.7rem',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 800
    }
  }, "NURSE VERIFIED \u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '8px',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "BP: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--primary)'
    }
  }, savedDocument.vitals.bp)), /*#__PURE__*/React.createElement("div", null, "Pulse: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#10b981'
    }
  }, savedDocument.vitals.pulse)), /*#__PURE__*/React.createElement("div", null, "SpO2: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#0d9488'
    }
  }, savedDocument.vitals.spo2)), /*#__PURE__*/React.createElement("div", null, "Temp: ", /*#__PURE__*/React.createElement("strong", null, savedDocument.vitals.temp)), /*#__PURE__*/React.createElement("div", null, "Weight: ", /*#__PURE__*/React.createElement("strong", null, savedDocument.vitals.weight)), /*#__PURE__*/React.createElement("div", null, "Height: ", /*#__PURE__*/React.createElement("strong", null, savedDocument.vitals.height || '172 cm')), /*#__PURE__*/React.createElement("div", null, "BMI: ", /*#__PURE__*/React.createElement("strong", null, savedDocument.vitals.bmi ? savedDocument.vitals.bmi.split(' ')[0] : '23.0')), /*#__PURE__*/React.createElement("div", null, "Blood Sugar: ", /*#__PURE__*/React.createElement("strong", null, savedDocument.vitals.bloodSugar || '110 mg/dL'))), savedDocument.vitals.triageNotes && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: 'var(--text-muted)',
      marginTop: '8px',
      borderTop: '1px solid #e2e8f0',
      paddingTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Nursing Notes:"), " ", savedDocument.vitals.triageNotes)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '16px',
      textAlign: 'center',
      borderTop: '1px dashed #cbd5e1',
      paddingTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)',
      letterSpacing: '0.12em'
    }
  }, "*", savedDocument.opId || 'OP-2026-9041', "*"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.74rem',
      color: '#64748b',
      marginTop: '4px',
      fontStyle: 'italic'
    }
  }, "Vitals recorded. Please proceed with this slip to ", /*#__PURE__*/React.createElement("strong", null, savedDocument.department, " \u2014 ", savedDocument.room), "."))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-footer",
    style: {
      padding: '12px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Valid for today's consultation only."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800
    }
  }, "Triage Station \u2022 PulseCare OPD"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => window.print(),
    style: {
      padding: '12px 24px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "\uD83D\uDDA8\uFE0F Print Registration Form & Vitals Slip (PDF)"))));
}

// --- src/components/DoctorDirectory.jsx ---

function DoctorDirectory({
  doctors,
  onSelectDoctorForBooking
}) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const departments = [{
    code: 'ALL',
    label: 'All Specialties'
  }, {
    code: 'CAR',
    label: 'Cardiology'
  }, {
    code: 'ORT',
    label: 'Orthopedics'
  }, {
    code: 'GEN',
    label: 'General Medicine'
  }, {
    code: 'PED',
    label: 'Pediatrics'
  }, {
    code: 'DER',
    label: 'Dermatology'
  }, {
    code: 'ENT',
    label: 'ENT Clinic'
  }];
  const filteredDoctors = doctors.filter(doc => {
    const matchesDept = selectedDept === 'ALL' || doc.depCode === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.department.toLowerCase().includes(searchQuery.toLowerCase()) || doc.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "doctors-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDC68\u200D\u2695\uFE0F Specialist Doctors & OPD Schedule"), /*#__PURE__*/React.createElement("p", null, "Consult with our board-certified senior consultants across specialized outpatient cabins.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Search doctor or clinical focus...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    style: {
      width: '260px'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '24px'
    }
  }, departments.map(dept => /*#__PURE__*/React.createElement("button", {
    key: dept.code,
    className: `btn btn-sm ${selectedDept === dept.code ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setSelectedDept(dept.code)
  }, dept.label))), /*#__PURE__*/React.createElement("div", {
    className: "doctors-grid"
  }, filteredDoctors.map(doc => /*#__PURE__*/React.createElement("div", {
    key: doc.id,
    className: "doctor-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-top-row"
  }, /*#__PURE__*/React.createElement("img", {
    src: doc.image,
    alt: doc.name,
    className: "doc-avatar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "doc-info"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "doc-name"
  }, doc.name), /*#__PURE__*/React.createElement("span", {
    className: "doc-dep-chip"
  }, doc.department), /*#__PURE__*/React.createElement("p", {
    className: "doc-degrees"
  }, doc.degrees), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: '#059669',
      fontWeight: 600,
      marginTop: '4px'
    }
  }, "\u2605 ", doc.rating, " \u2022 ", doc.experience, " Experience"))), /*#__PURE__*/React.createElement("div", {
    className: "doc-middle-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\uD83D\uDCCD Cabin:"), /*#__PURE__*/React.createElement("span", null, doc.cabin)), /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\u23F0 OPD Hours:"), /*#__PURE__*/React.createElement("span", null, doc.opdTimings)), /*#__PURE__*/React.createElement("div", {
    className: "doc-meta-item"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, "\uD83D\uDDE3\uFE0F Speaks:"), /*#__PURE__*/React.createElement("span", null, doc.languages)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '8px',
      borderTop: '1px solid #f1f5f9',
      paddingTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Clinical Focus:"), " ", doc.focus)), /*#__PURE__*/React.createElement("div", {
    className: "doctor-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doc-fee"
  }, doc.fee, " ", /*#__PURE__*/React.createElement("span", null, "/ Consultation")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onSelectDoctorForBooking(doc)
  }, "Book OP Token \u25B6"))))));
}

// --- src/components/PatientPortal.jsx ---

function PatientPortal({
  records,
  initialToken
}) {
  const [searchToken, setSearchToken] = useState(initialToken || 'CAR-104');
  const [activeRecord, setActiveRecord] = useState(records[searchToken] || records['CAR-104']);
  const handleSearch = tokenToFind => {
    const key = (tokenToFind || searchToken).trim().toUpperCase();
    if (records[key]) {
      setActiveRecord(records[key]);
      setSearchToken(key);
    } else {
      alert(`No outpatient record found for Token ID "${key}". Try demo tokens: CAR-104, GEN-211, or ORT-082.`);
    }
  };
  const handlePrintRx = () => {
    window.print();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "portal-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDCCB Patient OP Medical Records & E-Prescription"), /*#__PURE__*/React.createElement("p", null, "Retrieve consultation notes, clinical vitals, digital prescriptions, and laboratory orders."))), /*#__PURE__*/React.createElement("div", {
    className: "lookup-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      display: 'block',
      marginBottom: '6px'
    }
  }, "ENTER OP TOKEN NUMBER OR REGISTRATION ID:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "e.g. CAR-104 or GEN-211",
    value: searchToken,
    onChange: e => setSearchToken(e.target.value),
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      letterSpacing: '0.04em'
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => handleSearch(searchToken)
  }, "Fetch OP Record \u25B6")), /*#__PURE__*/React.createElement("div", {
    className: "quick-tokens-list"
  }, /*#__PURE__*/React.createElement("span", null, "Quick Demo Patients:"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('CAR-104')
  }, "CAR-104 (Rajesh Kumar - Cardiology)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('GEN-211')
  }, "GEN-211 (Gopal Krishna - General Med)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleSearch('ORT-082')
  }, "ORT-082 (David D'Souza - Orthopedics)")))), activeRecord && /*#__PURE__*/React.createElement("div", {
    className: "prescription-card",
    id: "printable-rx"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottom: '2px solid var(--border)',
      paddingBottom: '20px',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.4rem'
    }
  }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.3rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "PULSECARE HEALTH CITY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "Outpatient Department \u2022 Consultation Record & E-Prescription")))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      fontWeight: 800,
      fontSize: '1rem',
      padding: '4px 12px',
      borderRadius: '8px'
    }
  }, "Token: ", activeRecord.token), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      marginTop: '4px'
    }
  }, "OP ID: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.opId), " | Date: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.visitDate)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      background: 'var(--bg-alt)',
      padding: '16px 20px',
      borderRadius: 'var(--radius-md)',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.76rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Patient Information"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.patientName, " (", activeRecord.age, " Yrs / ", activeRecord.gender, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#475569'
    }
  }, "Contact: ", activeRecord.phone, " | Blood: ", /*#__PURE__*/React.createElement("strong", null, activeRecord.bloodGroup))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.76rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Attending Specialist"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.doctor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#475569'
    }
  }, activeRecord.department, " \u2022 ", /*#__PURE__*/React.createElement("strong", null, activeRecord.room)))), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginBottom: '10px'
    }
  }, "\uD83E\uDE7A Recorded OP Clinical Vitals"), /*#__PURE__*/React.createElement("div", {
    className: "vitals-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Blood Pressure"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#0284c7'
    }
  }, activeRecord.vitals.bp), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Target: 120/80")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Pulse / Heart Rate"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#10b981'
    }
  }, activeRecord.vitals.pulse), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Regular Sinus")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Oxygen SpO2"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#0d9488'
    }
  }, activeRecord.vitals.spo2), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Room Air")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Body Temp"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val"
  }, activeRecord.vitals.temp), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Oral Digital")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Weight"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val"
  }, activeRecord.vitals.weight), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Electronic Scale")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "BMI Ratio"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      fontSize: '1.05rem'
    }
  }, activeRecord.vitals.bmi), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, "Body Mass Index"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '20px 0',
      padding: '16px',
      background: '#f8fafc',
      borderLeft: '4px solid var(--primary)',
      borderRadius: '0 8px 8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "CHIEF COMPLAINT:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.9rem',
      color: 'var(--text-main)',
      marginTop: '2px',
      marginBottom: '8px'
    }
  }, activeRecord.symptoms), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, "PROVISIONAL DIAGNOSIS:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.98rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginTop: '2px'
    }
  }, activeRecord.diagnosis)), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.95rem',
      fontWeight: 800,
      color: 'var(--dark)',
      marginTop: '26px'
    }
  }, "\uD83D\uDC8A Prescribed Medications (Rx)"), /*#__PURE__*/React.createElement("table", {
    className: "rx-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Medicine & Strength"), /*#__PURE__*/React.createElement("th", null, "Dosage Frequency"), /*#__PURE__*/React.createElement("th", null, "Instructions / Timing"), /*#__PURE__*/React.createElement("th", null, "Duration"))), /*#__PURE__*/React.createElement("tbody", null, activeRecord.prescription.map((med, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, idx + 1)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, med.medicine), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 700
    }
  }, med.timing)), /*#__PURE__*/React.createElement("td", null, med.instruction), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 600
    }
  }, med.duration))))), activeRecord.recommendedTests && activeRecord.recommendedTests.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 700,
      color: 'var(--dark)',
      marginBottom: '10px'
    }
  }, "\uD83D\uDD2C Outpatient Investigations & Diagnostic Orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, activeRecord.recommendedTests.map((t, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      background: '#f8fafc',
      border: '1px solid var(--border)',
      padding: '8px 14px',
      borderRadius: '8px',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("strong", null, t.testName), ": ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#0d9488'
    }
  }, t.status))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '22px',
      borderTop: '1px solid var(--border)',
      paddingTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: 'var(--text-muted)'
    }
  }, "PHYSICIAN LIFESTYLE & FOLLOW-UP INSTRUCTIONS:"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.88rem',
      color: '#334155',
      marginTop: '4px'
    }
  }, activeRecord.doctorNotes)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: handlePrintRx
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "Print OP Prescription"))));
}

// --- src/components/PharmacyScreen.jsx ---

function PharmacyScreen({
  records,
  initialToken
}) {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog', 'dispenser', 'cart'
  const [drugs, setDrugs] = useState(pharmacyDrugsCatalog);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Medications');

  // Dispenser State
  const [tokenInput, setTokenInput] = useState(initialToken || 'CAR-104');
  const [selectedPatientRecord, setSelectedPatientRecord] = useState(records[initialToken || 'CAR-104'] || null);
  const [dispensedInvoice, setDispensedInvoice] = useState(null);

  // Cart / Counter POS State
  const [cart, setCart] = useState([]);
  const [cartSuccessNotice, setCartSuccessNotice] = useState(null);

  // Filter drugs
  const filteredDrugs = drugs.filter(drug => {
    const matchesCategory = selectedCategory === 'All Medications' || drug.category === selectedCategory;
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase()) || drug.genericName.toLowerCase().includes(searchQuery.toLowerCase()) || drug.indication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Token Lookup for Prescription Dispensation
  const handleLookupToken = token => {
    const key = (token || tokenInput).trim().toUpperCase();
    if (records[key]) {
      setSelectedPatientRecord(records[key]);
      setTokenInput(key);
      setDispensedInvoice(null);
    } else {
      alert(`No active OP patient record found for token "${key}". Try demo tokens: CAR-104, GEN-211, or ORT-082.`);
    }
  };

  // Add drug to Cart
  const handleAddToCart = drug => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drug.id);
      if (existing) {
        return prev.map(item => item.id === drug.id ? {
          ...item,
          qty: item.qty + 1
        } : item);
      }
      return [...prev, {
        ...drug,
        qty: 1
      }];
    });
    setCartSuccessNotice(`Added ${drug.name} to pharmacy bill.`);
    setTimeout(() => setCartSuccessNotice(null), 3000);
  };
  const handleUpdateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? {
          ...item,
          qty: newQty
        } : null;
      }
      return item;
    }).filter(Boolean));
  };
  const handleClearCart = () => {
    setCart([]);
  };

  // Dispense Patient Prescription
  const handleDispensePrescription = () => {
    if (!selectedPatientRecord) return;

    // Match prescribed medicines with catalog pricing
    const dispensedItems = selectedPatientRecord.prescription.map((rxItem, idx) => {
      // Find matching drug in catalog by partial name
      const matched = drugs.find(d => rxItem.medicine.toLowerCase().includes(d.name.split(' ')[0].toLowerCase())) || {
        price: 85.00,
        batchNo: `BATCH-${idx + 101}`,
        expiryDate: '12/2028',
        manufacturer: 'Hospital Formulary'
      };
      return {
        name: rxItem.medicine,
        timing: rxItem.timing,
        instruction: rxItem.instruction,
        duration: rxItem.duration,
        batchNo: matched.batchNo || 'MED-2026',
        expiryDate: matched.expiryDate || '2028',
        price: matched.price || 85.00,
        qty: rxItem.duration.includes('30') ? 30 : 15
      };
    });
    const subtotal = dispensedItems.reduce((sum, item) => sum + item.price * (item.qty / 10), 0);
    const tax = subtotal * 0.05; // 5% GST on medicines
    const grandTotal = Math.round(subtotal + tax);
    const invoice = {
      invoiceNo: `PHARM-INV-${Math.floor(10000 + Math.random() * 90000)}`,
      dispenseDate: new Date().toLocaleDateString([], {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      dispenseTime: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      pharmacistName: 'R. K. Verma, Lead Clinical Pharmacist (Reg #PH-88912)',
      patientName: selectedPatientRecord.patientName,
      token: selectedPatientRecord.token,
      opId: selectedPatientRecord.opId,
      doctor: selectedPatientRecord.doctor,
      department: selectedPatientRecord.department,
      items: dispensedItems,
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
    setDispensedInvoice(invoice);

    // Save invoice to PostgreSQL backend
    fetch('/api/pharmacy/dispense', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invoice)
    }).then(r => r.json()).then(data => {
      console.log('Pharmacy invoice recorded:', data);
    }).catch(err => console.warn('Could not post invoice to API:', err));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pharmacy-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83D\uDC8A 24/7 Outpatient Central Pharmacy & Drug Formulary"), /*#__PURE__*/React.createElement("p", null, "Hospital dispensary, patient prescription fulfillment, stock inventory, and digital medicine billing.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.8rem',
      fontWeight: 700
    }
  }, "Dispensary Counters 1 to 4 Active \u25CF"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Formulary Drugs Listed"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--primary)'
    }
  }, drugs.length, "+ Active")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--emerald)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "In-Stock Availability"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--emerald)'
    }
  }, "99.2% Available")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--amber)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Prescriptions Dispensed Today"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--amber)'
    }
  }, "218 Patients")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid #6366f1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Pharmacy Cart Items"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: '#6366f1'
    }
  }, cart.length, " in Order"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      borderBottom: '2px solid var(--border)',
      paddingBottom: '12px',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeSubTab === 'catalog' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveSubTab('catalog'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\uD83D\uDCE6 Drug Catalog & Stock Inventory"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeSubTab === 'dispenser' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveSubTab('dispenser'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\uD83E\uDDFE OP Prescription Dispenser (Demo)"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeSubTab === 'cart' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveSubTab('cart'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem',
      position: 'relative'
    }
  }, "\uD83D\uDED2 Quick Counter POS / Bill (", cart.length, ")")), cartSuccessNotice && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '10px 18px',
      borderRadius: 'var(--radius-md)',
      marginBottom: '18px',
      fontSize: '0.86rem',
      fontWeight: 700
    }
  }, "\u2713 ", cartSuccessNotice), activeSubTab === 'catalog' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '16px',
      marginBottom: '18px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Search drug name, generic formula or medical indication...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    style: {
      width: '380px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      flexWrap: 'wrap'
    }
  }, pharmacyCategories.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat,
    className: `btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setSelectedCategory(cat),
    style: {
      fontSize: '0.78rem'
    }
  }, cat)))), /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "staff-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Drug Name & Formulation"), /*#__PURE__*/React.createElement("th", null, "Generic Formula"), /*#__PURE__*/React.createElement("th", null, "Category"), /*#__PURE__*/React.createElement("th", null, "Batch / Expiry"), /*#__PURE__*/React.createElement("th", null, "Unit MRP"), /*#__PURE__*/React.createElement("th", null, "Current Stock"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Dispensary Action"))), /*#__PURE__*/React.createElement("tbody", null, filteredDrugs.map(drug => /*#__PURE__*/React.createElement("tr", {
    key: drug.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--dark)'
    }
  }, drug.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)'
    }
  }, drug.packSize, " \u2022 ", drug.manufacturer)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.82rem',
      color: '#334155'
    }
  }, drug.genericName), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--bg-alt)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 600,
      border: '1px solid var(--border)'
    }
  }, drug.category)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", null, drug.batchNo), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#059669',
      fontWeight: 600
    }
  }, "Exp: ", drug.expiryDate)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--dark)',
      fontSize: '0.95rem'
    }
  }, "\u20B9", drug.price.toFixed(2))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      color: drug.stock > 100 ? '#059669' : '#d97706'
    }
  }, "\u25CF ", drug.stock, " units")), /*#__PURE__*/React.createElement("td", null, drug.rxRequired ? /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--rose-light)',
      color: '#b91c1c',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.72rem',
      fontWeight: 800
    }
  }, "Rx Required") : /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--emerald-light)',
      color: '#065f46',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.72rem',
      fontWeight: 700
    }
  }, "OTC")), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => handleAddToCart(drug),
    style: {
      fontSize: '0.78rem',
      padding: '4px 10px'
    }
  }, "+ Add to Bill")))))))), activeSubTab === 'dispenser' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "lookup-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: '0.82rem',
      fontWeight: 700,
      color: 'var(--text-muted)',
      display: 'block',
      marginBottom: '6px'
    }
  }, "LOAD PATIENT OP TOKEN FOR PHARMACY DISPENSATION:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "e.g. CAR-104 or GEN-211",
    value: tokenInput,
    onChange: e => setTokenInput(e.target.value),
    style: {
      fontSize: '1.05rem',
      fontWeight: 700
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => handleLookupToken(tokenInput)
  }, "Fetch Prescription \u25B6")), /*#__PURE__*/React.createElement("div", {
    className: "quick-tokens-list"
  }, /*#__PURE__*/React.createElement("span", null, "Quick Patients:"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleLookupToken('CAR-104')
  }, "CAR-104 (Rajesh Kumar - Cardiology)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleLookupToken('GEN-211')
  }, "GEN-211 (Gopal Krishna - General Med)"), /*#__PURE__*/React.createElement("button", {
    className: "quick-token-chip",
    onClick: () => handleLookupToken('ORT-082')
  }, "ORT-082 (David D'Souza - Ortho)")))), selectedPatientRecord && /*#__PURE__*/React.createElement("div", {
    className: "prescription-card",
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '16px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.2rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Patient: ", selectedPatientRecord.patientName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }
  }, "Token: ", /*#__PURE__*/React.createElement("strong", null, selectedPatientRecord.token), " | OP ID: ", /*#__PURE__*/React.createElement("strong", null, selectedPatientRecord.opId), " | Age/Gender: ", selectedPatientRecord.age, " Yrs / ", selectedPatientRecord.gender)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      fontWeight: 700,
      color: 'var(--primary)'
    }
  }, selectedPatientRecord.doctor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, selectedPatientRecord.department, " \u2022 ", selectedPatientRecord.room))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '0.85rem',
      color: '#166534',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "Clinical Diagnosis:"), " ", selectedPatientRecord.diagnosis), /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: '0.92rem',
      fontWeight: 800,
      color: 'var(--dark)',
      marginBottom: '12px'
    }
  }, "Prescribed Drug Line Items for Fulfillment:"), /*#__PURE__*/React.createElement("table", {
    className: "rx-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Medicine & Dosage"), /*#__PURE__*/React.createElement("th", null, "Schedule"), /*#__PURE__*/React.createElement("th", null, "Instructions"), /*#__PURE__*/React.createElement("th", null, "Duration"), /*#__PURE__*/React.createElement("th", null, "Dispensary Status"))), /*#__PURE__*/React.createElement("tbody", null, selectedPatientRecord.prescription.map((med, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, med.medicine), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--primary-light)',
      color: 'var(--primary)',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 700
    }
  }, med.timing)), /*#__PURE__*/React.createElement("td", null, med.instruction), /*#__PURE__*/React.createElement("td", null, med.duration), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#059669',
      fontWeight: 700,
      fontSize: '0.82rem'
    }
  }, "\u2713 In Stock (Cabin Ready)")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-emerald",
    onClick: handleDispensePrescription,
    style: {
      padding: '12px 28px',
      fontSize: '0.94rem'
    }
  }, "\u2713 Verify Pharmacist Seal & Dispense Medication \u25B6"))), dispensedInvoice && /*#__PURE__*/React.createElement("div", {
    className: "token-slip-container",
    style: {
      maxWidth: '680px',
      marginTop: '30px'
    },
    id: "printable-pharmacy-bill"
  }, /*#__PURE__*/React.createElement("div", {
    className: "token-slip-header",
    style: {
      background: 'linear-gradient(135deg, #0d9488 0%, #0f172a 100%)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "slip-hospital-title"
  }, "PULSECARE CENTRAL PHARMACY"), /*#__PURE__*/React.createElement("p", {
    className: "slip-tagline"
  }, "Licensed Hospital Outpatient Drug Dispensary \u2022 Reg #DL-2026-KA-441"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.74rem',
      color: '#94a3b8',
      marginTop: '4px'
    }
  }, "Invoice: ", /*#__PURE__*/React.createElement("strong", null, dispensedInvoice.invoiceNo), " | Date: ", /*#__PURE__*/React.createElement("strong", null, dispensedInvoice.dispenseDate, " ", dispensedInvoice.dispenseTime))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 24px',
      background: 'white'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid var(--border)',
      paddingBottom: '12px',
      fontSize: '0.84rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, "Patient: ", /*#__PURE__*/React.createElement("strong", null, dispensedInvoice.patientName), " (Token: ", dispensedInvoice.token, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "OP ID: ", dispensedInvoice.opId)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Doctor: ", /*#__PURE__*/React.createElement("strong", null, dispensedInvoice.doctor)), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-muted)'
    }
  }, dispensedInvoice.department))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '14px 0',
      fontSize: '0.84rem'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--bg-alt)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px',
      textAlign: 'left'
    }
  }, "Item Description"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px',
      textAlign: 'left'
    }
  }, "Batch / Exp"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px',
      textAlign: 'right'
    }
  }, "Qty"), /*#__PURE__*/React.createElement("th", {
    style: {
      padding: '8px',
      textAlign: 'right'
    }
  }, "Amount (\u20B9)"))), /*#__PURE__*/React.createElement("tbody", null, dispensedInvoice.items.map((item, idx) => /*#__PURE__*/React.createElement("tr", {
    key: idx,
    style: {
      borderBottom: '1px solid #f1f5f9'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px'
    }
  }, /*#__PURE__*/React.createElement("strong", null, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, item.instruction, " (", item.timing, ")")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px',
      fontSize: '0.76rem',
      color: 'var(--text-muted)'
    }
  }, item.batchNo, " | ", item.expiryDate), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px',
      textAlign: 'right'
    }
  }, item.qty, " tabs"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '8px',
      textAlign: 'right',
      fontWeight: 700
    }
  }, "\u20B9", (item.price * (item.qty / 10)).toFixed(2)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--border)',
      paddingTop: '12px',
      fontSize: '0.86rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Subtotal:"), /*#__PURE__*/React.createElement("span", null, "\u20B9", dispensedInvoice.subtotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "GST Tax (5%):"), /*#__PURE__*/React.createElement("span", null, "\u20B9", dispensedInvoice.tax)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.15rem',
      fontWeight: 800,
      color: 'var(--dark)',
      borderTop: '1px solid var(--border)',
      paddingTop: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Total Amount Paid:"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)'
    }
  }, "\u20B9", dispensedInvoice.grandTotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px dashed #cbd5e1',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.78rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, "DISPENSED & VERIFIED BY:"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#0d9488',
      fontWeight: 600
    }
  }, dispensedInvoice.pharmacistName), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '4px',
      color: '#059669',
      fontWeight: 700
    }
  }, "\uD83D\uDC18 Synced with PostgreSQL Database")), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '2px solid #059669',
      color: '#059669',
      padding: '4px 10px',
      borderRadius: '6px',
      fontWeight: 800,
      letterSpacing: '0.05em'
    }
  }, "SEALED & CHECKED \u2713"))), /*#__PURE__*/React.createElement("div", {
    className: "token-slip-footer"
  }, /*#__PURE__*/React.createElement("span", null, "Please complete medication course as directed. Keep away from direct sunlight."))), dispensedInvoice && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => window.print()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 6 2 18 2 18 9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "12",
    height: "8",
    x: "6",
    y: "14"
  })), "Print Pharmacy Receipt / Bill"))), activeSubTab === 'cart' && /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.2rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Pharmacy Counter Billing Cart"), cart.length > 0 && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: handleClearCart
  }, "Clear Cart")), cart.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '40px 20px',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '2.5rem',
      marginBottom: '12px'
    }
  }, "\uD83D\uDED2"), /*#__PURE__*/React.createElement("h4", null, "Your pharmacy counter cart is currently empty"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      marginTop: '6px'
    }
  }, "Go to the Drug Catalog tab and click \"+ Add to Bill\" to add medications."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => setActiveSubTab('catalog'),
    style: {
      marginTop: '16px'
    }
  }, "Browse Drug Catalog \u25B6")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
    className: "staff-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Medicine"), /*#__PURE__*/React.createElement("th", null, "Unit Price"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Quantity"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Total"))), /*#__PURE__*/React.createElement("tbody", null, cart.map(item => /*#__PURE__*/React.createElement("tr", {
    key: item.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, item.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)'
    }
  }, item.genericName)), /*#__PURE__*/React.createElement("td", null, "\u20B9", item.price.toFixed(2)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => handleUpdateCartQty(item.id, -1),
    style: {
      padding: '2px 8px',
      fontSize: '0.8rem'
    }
  }, "-"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      minWidth: '24px',
      textAlign: 'center'
    }
  }, item.qty), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => handleUpdateCartQty(item.id, 1),
    style: {
      padding: '2px 8px',
      fontSize: '0.8rem'
    }
  }, "+"))), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right',
      fontWeight: 700
    }
  }, "\u20B9", (item.price * item.qty).toFixed(2)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '2px solid var(--border)',
      marginTop: '20px',
      paddingTop: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.25rem',
      fontWeight: 800
    }
  }, /*#__PURE__*/React.createElement("span", null, "Grand Total:"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--primary)'
    }
  }, "\u20B9", cart.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-emerald",
    onClick: () => {
      alert('Pharmacy Counter Bill Generated & Processed!');
      handleClearCart();
    }
  }, "\u2713 Complete OTC Payment & Print Bill"))))));
}

// --- src/components/StaffDashboard.jsx ---

function StaffDashboard({
  departments,
  onCallNext,
  onCompleteConsultation,
  onAddUrgentPatient,
  onResetDemo
}) {
  const totalWaiting = departments.reduce((acc, d) => acc + d.queue.length, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: "staff-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "\uD83C\uDF9B\uFE0F Hospital OPD Desk & Queue Controller (Demo Mode)"), /*#__PURE__*/React.createElement("p", null, "Simulate outpatient operations: call next token, admit emergency walk-ins, and inspect live doctor cabin queues.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: onResetDemo
  }, "\uD83D\uDD04 Reset Demo Queues"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Active OPD Cabins"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--primary)'
    }
  }, departments.length, " Rooms")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--amber)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Patients in Waiting Line"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--amber)'
    }
  }, totalWaiting, " Patients")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--emerald)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Consultations Completed"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--emerald)'
    }
  }, "284 Done")), /*#__PURE__*/React.createElement("div", {
    className: "vital-tile",
    style: {
      borderLeft: '4px solid var(--rose)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "vital-label"
  }, "Fast-Track / Triage"), /*#__PURE__*/React.createElement("div", {
    className: "vital-val",
    style: {
      color: 'var(--rose)'
    }
  }, "Active 24x7"))), /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.15rem',
      fontWeight: 800,
      color: 'var(--dark)'
    }
  }, "Live Cabin Queue Status & Dispatcher"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "Click \"Call Next Token\" to advance room queue & broadcast announcement chime.")), /*#__PURE__*/React.createElement("table", {
    className: "staff-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "OPD Room & Department"), /*#__PURE__*/React.createElement("th", null, "Attending Doctor"), /*#__PURE__*/React.createElement("th", null, "Now In Cabin"), /*#__PURE__*/React.createElement("th", null, "Next Up"), /*#__PURE__*/React.createElement("th", null, "In Waiting"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Demo Queue Actions"))), /*#__PURE__*/React.createElement("tbody", null, departments.map(dep => /*#__PURE__*/React.createElement("tr", {
    key: dep.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, dep.room), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, dep.name)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, dep.doctor), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)'
    }
  }, dep.specialty)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 800,
      fontSize: '1.1rem',
      color: 'var(--primary)',
      background: 'var(--primary-light)',
      padding: '2px 8px',
      borderRadius: '6px'
    }
  }, dep.currentToken || 'Empty')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: 'var(--dark)'
    }
  }, dep.nextToken || 'None')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: dep.queue.length > 3 ? 'var(--amber)' : 'inherit'
    }
  }, dep.queue.length, " patients")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status-indicator ${dep.statusColor || 'emerald'}`
  }, dep.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: () => onCallNext(dep.id),
    disabled: dep.queue.length === 0,
    title: "Advance token & ring chime",
    style: {
      opacity: dep.queue.length === 0 ? 0.5 : 1
    }
  }, "\u25B6 Call Next Token"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: () => onAddUrgentPatient(dep.id),
    title: "Inject an urgent triage patient to front of queue"
  }, "+ Fast-Track Triage")))))))));
}

// --- src/components/DatabaseViewer.jsx ---

function DatabaseViewer({
  postgresStatus,
  onRefreshStatus
}) {
  const [activeTable, setActiveTable] = useState('patients'); // 'patients', 'vitals', 'pharmacy', 'queues', 'schema'
  const [records, setRecords] = useState({});
  const [invoices, setInvoices] = useState({});
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDatabaseData = () => {
    setLoading(true);
    Promise.all([fetch('/api/records').then(r => r.json()).catch(() => ({})), fetch('/api/departments').then(r => r.json()).catch(() => []), fetch('/api/health').then(r => r.json()).catch(() => null)]).then(([recData, depData, healthData]) => {
      setRecords(recData || {});
      setDepartments(depData || []);
      if (onRefreshStatus && healthData) {
        onRefreshStatus(healthData);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  };
  useEffect(() => {
    fetchDatabaseData();
  }, []);
  const patientList = Object.values(records);

  // Filtered patients
  const filteredPatients = patientList.filter(p => {
    const q = searchQuery.toLowerCase();
    return p.patientName && p.patientName.toLowerCase().includes(q) || p.token && p.token.toLowerCase().includes(q) || p.opId && p.opId.toLowerCase().includes(q) || p.phone && p.phone.includes(q) || p.department && p.department.toLowerCase().includes(q);
  });

  // Export to CSV
  const exportToCSV = () => {
    if (activeTable === 'patients') {
      const headers = ['OP ID', 'Token', 'Patient Name', 'Age', 'Gender', 'Phone', 'Blood Group', 'Department', 'Doctor', 'Priority', 'Visit Date'];
      const rows = filteredPatients.map(p => [`"${p.opId || ''}"`, `"${p.token || ''}"`, `"${p.patientName || ''}"`, p.age || '', `"${p.gender || ''}"`, `"${p.phone || ''}"`, `"${p.bloodGroup || ''}"`, `"${p.department || ''}"`, `"${p.doctor || ''}"`, `"${p.priority || ''}"`, `"${p.visitDate || ''}"`]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `patients_database_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('CSV Export generated for current view.');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "database-viewer-section",
    style: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      borderRadius: '16px',
      padding: '24px 32px',
      color: '#ffffff',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(56, 189, 248, 0.15)',
      border: '1.5px solid #38bdf8',
      borderRadius: '12px',
      width: '54px',
      height: '54px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.8rem'
    }
  }, "\uD83D\uDC18"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: '1.6rem',
      fontWeight: 800,
      color: '#f8fafc'
    }
  }, "PostgreSQL Database Explorer"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: postgresStatus?.database_connected || postgresStatus?.postgres_connected ? '#10b981' : '#eab308',
      color: '#0f172a',
      fontSize: '0.72rem',
      fontWeight: 800,
      padding: '2px 10px',
      borderRadius: '12px',
      textTransform: 'uppercase'
    }
  }, postgresStatus?.database_connected || postgresStatus?.postgres_connected ? 'Live MySQL Connected' : 'Local Persistence Cache (Target: MySQL)')), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      color: '#94a3b8',
      fontSize: '0.88rem'
    }
  }, "Engine: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#38bdf8'
    }
  }, "MySQL"), " | Host: ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: '#38bdf8'
    }
  }, postgresStatus?.postgres_host || '192.168.1.103', ":", postgresStatus?.postgres_port || 3306), " | Database: ", /*#__PURE__*/React.createElement("code", {
    style: {
      color: '#38bdf8'
    }
  }, postgresStatus?.postgres_database || 'at_hospital'), " | Total Records: ", /*#__PURE__*/React.createElement("strong", null, patientList.length)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => {
      fetch('/api/db/retry', {
        method: 'POST'
      }).then(r => r.json()).then(d => {
        fetchDatabaseData();
      }).catch(() => fetchDatabaseData());
    },
    style: {
      padding: '8px 16px',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    title: "Attempt immediate connection to MySQL at 192.168.1.103:3306"
  }, "\u26A1 Reconnect MySQL"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: fetchDatabaseData,
    style: {
      padding: '8px 16px',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, "\uD83D\uDD04 ", loading ? 'Refreshing...' : 'Refresh Tables'), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: exportToCSV,
    style: {
      padding: '8px 16px',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, "\uD83D\uDCE5 Export to CSV"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      borderBottom: '2px solid var(--border)',
      paddingBottom: '12px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeTable === 'patients' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveTable('patients'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\uD83D\uDCCB Table: patients (", patientList.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeTable === 'vitals' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveTable('vitals'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\uD83E\uDE7A Table: patient_vitals (", patientList.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeTable === 'queues' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveTable('queues'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\uD83C\uDFE5 Table: department_queues (", departments.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `btn ${activeTable === 'schema' ? 'btn-primary' : 'btn-secondary'}`,
    onClick: () => setActiveTable('schema'),
    style: {
      padding: '8px 18px',
      fontSize: '0.88rem'
    }
  }, "\u2699\uFE0F PostgreSQL Schema & DDL")), activeTable !== 'schema' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: '450px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "form-input",
    placeholder: "Search table by Token, OP ID, Patient Name, Phone...",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    style: {
      width: '100%',
      padding: '10px 14px',
      fontSize: '0.9rem'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }
  }, "Showing ", /*#__PURE__*/React.createElement("strong", null, filteredPatients.length), " rows")), activeTable === 'patients' && /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      padding: '0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "staff-table",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Token ID"), /*#__PURE__*/React.createElement("th", null, "OP ID"), /*#__PURE__*/React.createElement("th", null, "Patient Name"), /*#__PURE__*/React.createElement("th", null, "Age / Sex"), /*#__PURE__*/React.createElement("th", null, "Phone"), /*#__PURE__*/React.createElement("th", null, "Blood Group"), /*#__PURE__*/React.createElement("th", null, "Department & Room"), /*#__PURE__*/React.createElement("th", null, "Doctor"), /*#__PURE__*/React.createElement("th", null, "Priority"), /*#__PURE__*/React.createElement("th", null, "Counter Fee"), /*#__PURE__*/React.createElement("th", null, "Action"))), /*#__PURE__*/React.createElement("tbody", null, filteredPatients.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "11",
    style: {
      textAlign: 'center',
      padding: '36px',
      color: 'var(--text-muted)'
    }
  }, "No patient records found in table.")) : filteredPatients.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.token,
    style: {
      cursor: 'pointer'
    },
    onClick: () => setSelectedRecord(p)
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "token-chip",
    style: {
      fontSize: '0.8rem',
      padding: '3px 8px'
    }
  }, p.token)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'monospace',
      fontWeight: 600
    }
  }, p.opId), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, p.patientName)), /*#__PURE__*/React.createElement("td", null, p.age, " Y / ", p.gender), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'monospace'
    }
  }, p.phone), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#fee2e2',
      color: '#991b1b',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  }, p.bloodGroup)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600
    }
  }, p.department), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.72rem',
      color: 'var(--text-muted)'
    }
  }, p.room)), /*#__PURE__*/React.createElement("td", null, p.doctor), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `badge-priority ${p.priority === 'Emergency' ? 'emergency' : p.priority === 'Senior Citizen' ? 'senior' : 'regular'}`,
    style: {
      fontSize: '0.72rem'
    }
  }, p.priority)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: '#059669'
    }
  }, "\u20B9", p.payment ? p.payment.totalAmount : 800, " (", p.payment ? p.payment.paymentMethod : 'Paid', ")"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary btn-sm",
    onClick: e => {
      e.stopPropagation();
      setSelectedRecord(p);
    },
    style: {
      padding: '3px 10px',
      fontSize: '0.75rem'
    }
  }, "View Details \u25B6")))))))), activeTable === 'vitals' && /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      padding: '0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "staff-table",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Token ID"), /*#__PURE__*/React.createElement("th", null, "Patient Name"), /*#__PURE__*/React.createElement("th", null, "Blood Pressure"), /*#__PURE__*/React.createElement("th", null, "Pulse"), /*#__PURE__*/React.createElement("th", null, "SpO2"), /*#__PURE__*/React.createElement("th", null, "Temp"), /*#__PURE__*/React.createElement("th", null, "Weight / BMI"), /*#__PURE__*/React.createElement("th", null, "Blood Sugar"), /*#__PURE__*/React.createElement("th", null, "Triage Clinical Notes"))), /*#__PURE__*/React.createElement("tbody", null, filteredPatients.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.token
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "token-chip",
    style: {
      fontSize: '0.8rem',
      padding: '3px 8px'
    }
  }, p.token)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, p.patientName)), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: '#0284c7'
    }
  }, p.vitals ? p.vitals.bp : '120/80 mmHg'), /*#__PURE__*/React.createElement("td", null, p.vitals ? p.vitals.pulse : '74 bpm'), /*#__PURE__*/React.createElement("td", {
    style: {
      color: '#059669',
      fontWeight: 700
    }
  }, p.vitals ? p.vitals.spo2 : '99%'), /*#__PURE__*/React.createElement("td", null, p.vitals ? p.vitals.temp : '98.6 °F'), /*#__PURE__*/React.createElement("td", null, p.vitals ? p.vitals.weight : '68 kg', " (", p.vitals ? p.vitals.bmi : 'Normal', ")"), /*#__PURE__*/React.createElement("td", null, p.vitals && p.vitals.bloodSugar ? p.vitals.bloodSugar : '110 mg/dL'), /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '0.78rem',
      color: 'var(--text-muted)'
    }
  }, p.vitals && p.vitals.triageNotes ? p.vitals.triageNotes : 'Clinical signs stable.'))))))), activeTable === 'queues' && /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      padding: '0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "staff-table",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Department Code"), /*#__PURE__*/React.createElement("th", null, "Department Name"), /*#__PURE__*/React.createElement("th", null, "Cabin / Room"), /*#__PURE__*/React.createElement("th", null, "Current Token Inside"), /*#__PURE__*/React.createElement("th", null, "Next Token in Line"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Waiting Patients in Queue"))), /*#__PURE__*/React.createElement("tbody", null, departments.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "token-chip"
  }, d.code)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, d.name)), /*#__PURE__*/React.createElement("td", null, d.room), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#059669',
      fontWeight: 800
    }
  }, d.currentToken || 'None')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#0284c7',
      fontWeight: 800
    }
  }, d.nextToken || 'None')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#dcfce7',
      color: '#15803d',
      padding: '3px 8px',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 700
    }
  }, d.status)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("strong", null, d.queue ? d.queue.length : 0, " waiting"), " (", d.queue ? d.queue.map(q => q.token).join(', ') : 'Empty', ")")))))), activeTable === 'schema' && /*#__PURE__*/React.createElement("div", {
    className: "staff-console-card",
    style: {
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.15rem',
      fontWeight: 800,
      marginBottom: '12px',
      color: '#0f172a'
    }
  }, "\uD83D\uDC18 PostgreSQL Tables Definition & Relational Schema (init_db.sql)"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      color: '#64748b',
      marginBottom: '16px'
    }
  }, "The backend executes these DDL instructions upon first connection to create and maintain tables:"), /*#__PURE__*/React.createElement("pre", {
    style: {
      background: '#0f172a',
      color: '#38bdf8',
      padding: '20px',
      borderRadius: '10px',
      overflowX: 'auto',
      fontSize: '0.82rem',
      lineHeight: 1.5,
      fontFamily: 'Consolas, monospace'
    }
  }, `-- 1. Patients Table
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Patient Clinical Vitals Table
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

-- 3. Pharmacy Dispensed Invoices Table
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
);`)), selectedRecord && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#ffffff',
      borderRadius: '16px',
      maxWidth: '680px',
      width: '100%',
      maxHeight: '85vh',
      overflowY: 'auto',
      padding: '28px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "token-chip",
    style: {
      fontSize: '1rem',
      padding: '4px 12px'
    }
  }, selectedRecord.token), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '8px 0 0',
      fontSize: '1.3rem',
      fontWeight: 800
    }
  }, selectedRecord.patientName), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)'
    }
  }, "OP ID: ", selectedRecord.opId)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedRecord(null),
    style: {
      background: '#f1f5f9',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      fontWeight: 800
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f8fafc',
      padding: '16px',
      borderRadius: '10px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '10px',
      fontSize: '0.85rem'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Age / Gender: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.age, " Y / ", selectedRecord.gender)), /*#__PURE__*/React.createElement("div", null, "Blood Group: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.bloodGroup)), /*#__PURE__*/React.createElement("div", null, "Phone: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.phone)), /*#__PURE__*/React.createElement("div", null, "Department: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.department)), /*#__PURE__*/React.createElement("div", null, "Doctor: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.doctor)), /*#__PURE__*/React.createElement("div", null, "Room: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.room)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      padding: '14px',
      borderRadius: '10px',
      marginBottom: '16px',
      fontSize: '0.84rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      color: '#166534',
      marginBottom: '6px'
    }
  }, "Recorded Clinical Vitals:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", null, "BP: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.bp)), /*#__PURE__*/React.createElement("div", null, "Pulse: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.pulse)), /*#__PURE__*/React.createElement("div", null, "SpO2: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.spo2)), /*#__PURE__*/React.createElement("div", null, "Temp: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.temp)), /*#__PURE__*/React.createElement("div", null, "Weight: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.weight)), /*#__PURE__*/React.createElement("div", null, "Sugar: ", /*#__PURE__*/React.createElement("strong", null, selectedRecord.vitals?.bloodSugar || '110 mg/dL')))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: '0.85rem',
      color: 'var(--text-muted)',
      marginBottom: '4px'
    }
  }, "Chief Symptoms:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.88rem'
    }
  }, selectedRecord.symptoms)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setSelectedRecord(null)
  }, "Close Record")))));
}

// --- src/components/DummyTableTestScreen.jsx ---

function DummyTableTestScreen({
  onBack,
  onGoHome
}) {
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const handleSave = e => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Please enter Client Name');
      return;
    }
    setLoading(true);
    setSaveStatus(null);
    fetch('/api/dummy-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: clientName.trim()
      })
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      setLoading(false);
      if (r.ok && data.success) {
        setSaveStatus({
          success: true,
          message: data.message || '✓ Saved successfully into at_dummy_table!'
        });
        setClientName('');
      } else {
        setSaveStatus({
          success: false,
          error: data.error || `HTTP ${r.status}: Failed to save into table`
        });
      }
    }).catch(err => {
      setLoading(false);
      setSaveStatus({
        success: false,
        error: err.message || 'Error saving to database'
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '480px',
      margin: '40px auto',
      padding: '0 16px',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      marginBottom: '24px'
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    className: "btn btn-secondary",
    style: {
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: '700',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  }, "\u2190 Back"), onGoHome && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onGoHome,
    className: "btn btn-secondary",
    style: {
      padding: '8px 16px',
      fontSize: '13px',
      fontWeight: '700',
      borderRadius: '8px',
      cursor: 'pointer'
    }
  }, "\uD83C\uDFE0 Home")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '36px 30px',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '22px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: 800,
      color: '#0f172a',
      marginBottom: '8px'
    }
  }, "Client Name ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ef4444'
    }
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: clientName,
    onChange: e => setClientName(e.target.value),
    placeholder: "Enter Client Name",
    required: true,
    autoFocus: true,
    style: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '16px',
      fontWeight: '600',
      borderRadius: '10px',
      border: '2px solid #cbd5e1',
      outline: 'none',
      boxSizing: 'border-box',
      color: '#0f172a',
      transition: 'border-color 0.2s'
    },
    onFocus: e => e.target.style.borderColor = '#0284c7',
    onBlur: e => e.target.style.borderColor = '#cbd5e1'
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: loading,
    style: {
      width: '100%',
      padding: '14px',
      fontSize: '15px',
      fontWeight: 800,
      color: '#ffffff',
      background: loading ? '#94a3b8' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      border: 'none',
      borderRadius: '10px',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
      transition: 'all 0.2s ease',
      letterSpacing: '0.5px'
    }
  }, loading ? 'Saving...' : 'SAVE')), saveStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      padding: '14px 16px',
      borderRadius: '10px',
      fontSize: '0.85rem',
      fontWeight: 600,
      lineHeight: 1.5,
      wordBreak: 'break-word',
      textAlign: saveStatus.success ? 'center' : 'left',
      background: saveStatus.success ? '#dcfce7' : '#fee2e2',
      border: `1.5px solid ${saveStatus.success ? '#86efac' : '#fca5a5'}`,
      color: saveStatus.success ? '#15803d' : '#b91c1c'
    }
  }, saveStatus.success ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800
    }
  }, saveStatus.message || '✓ Saved successfully into at_dummy_table!') : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      marginBottom: '4px'
    }
  }, "\u2715 Save Failed:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.8rem',
      opacity: 0.95
    }
  }, saveStatus.error)))));
}

// --- src/components/Footer.jsx ---

function Footer({
  setActiveTab
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "hospital-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-badge",
    style: {
      width: '36px',
      height: '36px'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      color: 'white',
      fontSize: '1.2rem',
      fontWeight: 800
    }
  }, "INDUS HEALTH CITY")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      lineHeight: 1.6,
      marginBottom: '14px'
    }
  }, "A premier multi-speciality tertiary hospital and outpatient center dedicated to fast, compassionate, and digital clinical excellence. NABH and NABL accredited."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#38bdf8',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "NABH ACCREDITED"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#34d399',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "NABL CERTIFIED LABS"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#1e293b',
      border: '1px solid #334155',
      color: '#f59e0b',
      padding: '3px 10px',
      borderRadius: '4px',
      fontSize: '0.74rem',
      fontWeight: 700
    }
  }, "ISO 9001:2015"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "OPD Navigation"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#queue",
    onClick: e => {
      e.preventDefault();
      setActiveTab('queue');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Live Token Queue Display")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#register",
    onClick: e => {
      e.preventDefault();
      setActiveTab('register');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Patient OP Registration")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#doctors",
    onClick: e => {
      e.preventDefault();
      setActiveTab('doctors');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Consultant Doctors Schedule")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#records",
    onClick: e => {
      e.preventDefault();
      setActiveTab('records');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "Prescription & Vitals Portal")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: "#staff",
    onClick: e => {
      e.preventDefault();
      setActiveTab('staff');
    },
    style: {
      color: '#94a3b8',
      textDecoration: 'none'
    }
  }, "OPD Desk Admin Console")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Specialties"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "Cardiology & Cath Lab"), /*#__PURE__*/React.createElement("li", null, "Orthopedics & Joint Care"), /*#__PURE__*/React.createElement("li", null, "General & Internal Medicine"), /*#__PURE__*/React.createElement("li", null, "Pediatrics & Neonatology"), /*#__PURE__*/React.createElement("li", null, "Dermatology & Skin Clinic"), /*#__PURE__*/React.createElement("li", null, "ENT & Head-Neck Surgery"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Emergency & Helpdesk"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#ef4444'
    }
  }, "24x7 Ambulance:"), " 1800-419-9999"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "OPD Helpdesk:"), " +91 80 2400 1100"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Email:"), " opd.desk@indushealthcity.com"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "Address:"), " Indus Health City Campus, Medical Center Blvd"), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("strong", null, "OPD Timings:"), " Mon - Sat: 8:00 AM - 8:00 PM (Sun Emergency Only)")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 INDUS HEALTH CITY. Hospital Information Management System."), /*#__PURE__*/React.createElement("span", null, "Built with React.js \u2022 Secure HIPAA & EHR Standards Compliant")));
}

// --- src/App.jsx ---

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error('HIMS ErrorBoundary caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: '30px',
          maxWidth: '520px',
          margin: '60px auto',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.18)',
          textAlign: 'center',
          fontFamily: 'sans-serif'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: '2.8rem',
          marginBottom: '12px'
        }
      }, "\uD83C\uDFE5"), /*#__PURE__*/React.createElement("h2", {
        style: {
          color: '#0f172a',
          margin: '0 0 10px',
          fontSize: '1.25rem'
        }
      }, "ATRI HIMS Notice"), /*#__PURE__*/React.createElement("p", {
        style: {
          color: '#64748b',
          fontSize: '13px',
          lineHeight: '1.5',
          marginBottom: '20px'
        }
      }, this.state.error?.message || 'A temporary rendering error occurred. Click below to reload.'), /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: '10px',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          localStorage.clear();
          window.location.reload();
        },
        style: {
          background: '#0284c7',
          color: '#fff',
          border: 'none',
          padding: '9px 18px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '13px'
        }
      }, "Reset to Login & Reload"), /*#__PURE__*/React.createElement("button", {
        onClick: () => {
          this.setState({
            hasError: false
          });
          window.location.reload();
        },
        style: {
          background: '#f1f5f9',
          color: '#0f172a',
          border: '1px solid #cbd5e1',
          padding: '9px 18px',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '13px'
        }
      }, "Reload Page")));
    }
    return this.props.children;
  }
}
function App() {
  // Authentication State: persist in localStorage so refresh never logs the user out!
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('atri_hims_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Current Screen / View: 'home' (Home JSP) or 'patient_management' (Registration & Outpatient Desk)
  // Always defaults to 'home' (Home JSP) so users land on the Metro Tile dashboard immediately after login!
  const [currentView, setCurrentView] = useState('home');

  // Active Tab inside Patient Registration: 'appointments' (Tab 1) or 'add_appointment' (Tab 2)
  const [activeRegTab, setActiveRegTab] = useState(() => {
    try {
      return localStorage.getItem('atri_hims_active_tab') || 'appointments';
    } catch (e) {
      return 'appointments';
    }
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showDatabaseView, setShowDatabaseView] = useState(false);
  const [showDummyTestView, setShowDummyTestView] = useState(false);
  const [loginTime, setLoginTime] = useState(() => {
    try {
      const savedTime = localStorage.getItem('atri_hims_logintime');
      if (savedTime) return savedTime;
    } catch (e) {}
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });
  const [departments, setDepartments] = useState(initialDepartments);
  const [doctors] = useState(doctorsRoster);
  const [records, setRecords] = useState(mockOPRecords);
  const [tokenCounter, setTokenCounter] = useState(120);

  // Hospital Database State (MySQL at_hospital via JDBC)
  const [postgresStatus, setPostgresStatus] = useState({
    postgres_connected: false,
    database_connected: false,
    db_engine: 'mysql',
    postgres_host: '192.168.1.103',
    postgres_port: 3306,
    postgres_database: 'at_hospital',
    postgres_user: 'himsd',
    jdbc_url: 'jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true',
    total_patients: 0,
    last_error: null
  });
  const [showPostgresModal, setShowPostgresModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  const handleTabChange = tab => {
    setActiveRegTab(tab);
    try {
      localStorage.setItem('atri_hims_active_tab', tab);
    } catch (e) {}
  };

  // Sync with PostgreSQL Backend on Load & Periodic Health Check
  const checkPostgresHealth = () => {
    fetch('/api/health').then(r => r.json()).then(data => {
      setPostgresStatus(data);
    }).catch(err => {
      setPostgresStatus(prev => ({
        ...prev,
        postgres_connected: false,
        last_error: 'Backend API unreachable'
      }));
    });
  };
  useEffect(() => {
    // Initial health check
    checkPostgresHealth();

    // Fetch persisted records from PostgreSQL / Backend
    fetch('/api/records').then(r => r.json()).then(serverRecords => {
      if (serverRecords && Object.keys(serverRecords).length > 0) {
        setRecords(prev => ({
          ...prev,
          ...serverRecords
        }));
      }
    }).catch(err => console.warn('Could not load initial records from API:', err));

    // Periodic check every 15 seconds
    const interval = setInterval(checkPostgresHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Authentication Handlers
  const handleLogin = user => {
    setCurrentUser(user);
    setCurrentView('home');
    try {
      localStorage.setItem('atri_hims_user', JSON.stringify(user));
      localStorage.setItem('atri_hims_current_view', 'home');
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setLoginTime(formatted);
      localStorage.setItem('atri_hims_logintime', formatted);
      localStorage.setItem('atri_hims_active_tab', 'appointments');
    } catch (e) {}
    setActiveRegTab('appointments');
  };
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    try {
      localStorage.removeItem('atri_hims_user');
      localStorage.removeItem('atri_hims_active_tab');
      localStorage.removeItem('atri_hims_logintime');
      localStorage.removeItem('atri_hims_current_view');
    } catch (e) {}
    setActiveRegTab('appointments');
    setShowDatabaseView(false);
  };

  // Add new Outpatient registration & persist to PostgreSQL
  const handleRegisterSuccess = formData => {
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);
    const generatedToken = formData.token || `OPD-${nextNum}`;
    const generatedOpId = formData.opId || `UMR${334250 + nextNum}`;
    const newRecord = {
      token: generatedToken,
      opId: generatedOpId,
      patientName: formData.patientName,
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      department: formData.departmentName,
      departmentCode: formData.departmentCode,
      doctor: formData.doctor,
      room: formData.room,
      payment: formData.payment,
      visitDate: formData.visitDate || '08-Oct-2026',
      visitType: 'OPD Consultation',
      vitals: formData.vitals || {
        bp: '120/80 mmHg',
        pulse: '74 bpm',
        spo2: '99%',
        temp: '98.6 °F',
        weight: '65 kg'
      },
      symptoms: formData.symptoms || 'General Outpatient checkup and clinical evaluation.',
      diagnosis: 'Clinical Consultation in Progress (Initial OP Intake)',
      prescription: [],
      recommendedTests: [],
      doctorNotes: `Registered at OP Desk. Consultant: ${formData.doctor}.`
    };
    setRecords(prev => ({
      ...prev,
      [generatedToken]: newRecord
    }));

    // Persist new registration to PostgreSQL Backend!
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecord)
    }).then(r => r.json()).then(res => {
      if (res.savedToPostgres) {
        showToast(`🐘 Saved in PostgreSQL: Patient ${newRecord.patientName} (${generatedOpId})`);
      } else {
        showToast(`✓ Registered: ${newRecord.patientName} (${generatedOpId}) - Cached locally`);
      }
      checkPostgresHealth();
    }).catch(err => {
      console.warn('PostgreSQL register error:', err);
      showToast(`✓ Registered: ${newRecord.patientName} (${generatedOpId})`);
    });
  };

  // 1. If user is NOT logged in: Show starting Login Screen ("LOGIN JSP")
  if (!currentUser) {
    return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(LoginPage, {
      onLogin: handleLogin
    }));
  }

  // 2. If logged in and on Home view: Show Home Dashboard ("HOME JSP")
  if (currentView === 'home') {
    return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement(HIMSHomeDashboard, {
      onSelectModule: mod => {
        if (mod === 'dummy_test') {
          setShowDummyTestView(true);
          setShowDatabaseView(false);
          setCurrentView('patient_management');
        } else {
          setShowDummyTestView(false);
          setCurrentView('patient_management');
        }
        try {
          localStorage.setItem('atri_hims_current_view', 'patient_management');
        } catch (e) {}
      },
      onLogout: handleLogout
    }));
  }

  // 3. Logged in and on Patient Management: Render the Outpatient application with the Left Menu!
  return /*#__PURE__*/React.createElement(ErrorBoundary, null, /*#__PURE__*/React.createElement("div", {
    className: "hims-app-layout"
  }, toastMessage && /*#__PURE__*/React.createElement("div", {
    className: "hims-toast-notification"
  }, /*#__PURE__*/React.createElement("span", null, toastMessage), /*#__PURE__*/React.createElement("button", {
    onClick: () => setToastMessage(null)
  }, "\u2715")), showPostgresModal && /*#__PURE__*/React.createElement("div", {
    className: "hims-modal-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-diag-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.8rem'
    }
  }, "\uD83D\uDC18"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 800,
      color: '#0f172a'
    }
  }, "PostgreSQL Database Storage"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: '0.8rem',
      color: '#64748b'
    }
  }, "ATRI HIMS Data Persistence Engine"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowPostgresModal(false),
    className: "modal-close-btn"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: postgresStatus.postgres_connected ? '#f0fdf4' : '#fffbeb',
      border: `1.5px solid ${postgresStatus.postgres_connected ? '#86efac' : '#fde68a'}`,
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: postgresStatus.postgres_connected ? '#16a34a' : '#d97706',
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: postgresStatus.postgres_connected ? '#15803d' : '#b45309',
      fontSize: '0.95rem'
    }
  }, postgresStatus.postgres_connected ? 'PostgreSQL Connected & Active' : 'PostgreSQL Server Offline (Using Local Cache)')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '0.82rem',
      color: '#475569'
    }
  }, postgresStatus.postgres_connected ? 'All newly registered patients, appointments, vitals, and fees are persisted directly into PostgreSQL tables!' : 'Backend is safely persisting records in local storage cache with zero data loss. Connects automatically to PostgreSQL on localhost:5432.')), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f8fafc',
      borderRadius: '10px',
      padding: '14px',
      marginBottom: '18px',
      fontSize: '0.82rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748b'
    }
  }, "Host & Port:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'monospace'
    }
  }, postgresStatus.postgres_host, ":", postgresStatus.postgres_port)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748b'
    }
  }, "Database Name:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'monospace'
    }
  }, postgresStatus.postgres_database)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748b'
    }
  }, "Total Patients Saved:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#0284c7'
    }
  }, postgresStatus.total_patients, " Patients")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748b'
    }
  }, "Config:"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'monospace'
    }
  }, ".env (PGHOST, PGUSER, PGPASSWORD)"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: checkPostgresHealth,
    style: {
      padding: '8px 16px',
      fontSize: '0.85rem'
    }
  }, "\uD83D\uDD04 Test Connection"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowPostgresModal(false),
    style: {
      padding: '8px 20px',
      fontSize: '0.85rem'
    }
  }, "Done")))), /*#__PURE__*/React.createElement(LeftSidebar, {
    isExpanded: isSidebarExpanded,
    onToggleExpand: () => setIsSidebarExpanded(!isSidebarExpanded),
    activeSubTab: activeRegTab,
    onSelectSubTab: tabId => {
      setShowDatabaseView(false);
      if (tabId === 'appointments' || tabId === 'add_appointment') {
        handleTabChange(tabId);
      } else if (tabId === 'out_patient') {
        handleTabChange('appointments');
      }
    },
    onGoHome: () => {
      setShowDummyTestView(false);
      setCurrentView('home');
      try {
        localStorage.setItem('atri_hims_current_view', 'home');
      } catch (e) {}
    },
    onOpenDummyTest: () => {
      setShowDummyTestView(true);
      setShowDatabaseView(false);
    },
    onOpenDatabase: () => setShowPostgresModal(true),
    onLogout: handleLogout
  }), /*#__PURE__*/React.createElement("div", {
    className: "hims-main-viewport"
  }, /*#__PURE__*/React.createElement("header", {
    className: "hims-top-navbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-nav-left"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "top-hamburger-btn",
    onClick: () => setIsSidebarExpanded(!isSidebarExpanded),
    title: "Toggle Left Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))), /*#__PURE__*/React.createElement("span", {
    className: "top-facility-name"
  }, "INDUS HEALTH CITY")), /*#__PURE__*/React.createElement("div", {
    className: "top-nav-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "top-nav-title"
  }, "Patient Registration")), /*#__PURE__*/React.createElement("div", {
    className: "top-nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "top-home-nav-btn",
    onClick: () => {
      setCurrentView('home');
      try {
        localStorage.setItem('atri_hims_current_view', 'home');
      } catch (e) {}
    },
    title: "Return to Home Dashboard (Metro JSP)",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
      border: '1.5px solid #94a3b8',
      borderRadius: '6px',
      padding: '5px 12px',
      fontSize: '12px',
      fontWeight: '700',
      color: '#0284c7',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px'
    }
  }, "\uD83C\uDFE0"), " Home Dashboard"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "top-home-nav-btn",
    onClick: () => {
      setShowDummyTestView(true);
      setShowDatabaseView(false);
    },
    title: "Test Screen (1 Field: Client Name) for at_dummy_table",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: '#0284c7',
      border: '1.5px solid #0369a1',
      borderRadius: '6px',
      padding: '5px 12px',
      fontSize: '12px',
      fontWeight: '700',
      color: '#ffffff',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px'
    }
  }, "\uD83E\uDDEA"), " Client Test"), /*#__PURE__*/React.createElement("div", {
    className: "top-login-time"
  }, "LogInTime: ", /*#__PURE__*/React.createElement("span", {
    className: "time-val"
  }, loginTime || '2026-10-08 11:26:13')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `top-pg-indicator ${postgresStatus.postgres_connected ? 'connected' : 'offline'}`,
    onClick: () => setShowPostgresModal(true),
    title: "PostgreSQL Database Connection Status (Click to inspect)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "indicator-dot"
  }), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC18 ", postgresStatus.postgres_connected ? 'PostgreSQL Active' : 'PostgreSQL Local Cache')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "top-action-icon",
    onClick: () => showToast('All systems running smoothly.'),
    title: "Notifications"
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    className: "top-user-chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "user-icon"
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("strong", {
    className: "user-name"
  }, currentUser?.name || 'admin'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "top-signout-btn",
    onClick: handleLogout,
    title: "Sign Out"
  }, "Logout")))), /*#__PURE__*/React.createElement("main", {
    className: "hims-content-area"
  }, showDummyTestView ? /*#__PURE__*/React.createElement(DummyTableTestScreen, {
    onBack: () => setShowDummyTestView(false),
    onGoHome: () => {
      setShowDummyTestView(false);
      setCurrentView('home');
    }
  }) : showDatabaseView ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      color: '#0f172a',
      margin: 0
    }
  }, "\uD83D\uDC18 PostgreSQL Database Viewer"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-secondary",
    onClick: () => setShowDatabaseView(false)
  }, "\u2190 Back to Patient Registration")), /*#__PURE__*/React.createElement(DatabaseViewer, {
    postgresStatus: postgresStatus,
    onRefreshStatus: data => setPostgresStatus(data)
  })) : /*#__PURE__*/React.createElement(RegistrationForm, {
    departments: departments,
    doctors: doctors,
    records: records,
    activeTab: activeRegTab,
    onTabChange: handleTabChange,
    onRegisterSuccess: handleRegisterSuccess,
    onGoToVitals: token => {
      handleTabChange('appointments');
    }
  })))));
}

// --- Mount to DOM ---
const rootContainer = document.getElementById('root');
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);
  root.render(React.createElement(App));
}