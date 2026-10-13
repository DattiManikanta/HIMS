// OPD Departments and their current room status
export const initialDepartments = [
  {
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
    status: "In Consultation", // In Consultation, Next Patient, Break
    statusColor: "emerald",
    icon: "heart-pulse",
    queue: [
      { token: "CAR-104", patientName: "Rajesh Kumar", status: "Inside", time: "09:15 AM", priority: "Regular" },
      { token: "CAR-105", patientName: "Meenakshi S.", status: "Next", time: "09:30 AM", priority: "Senior Citizen" },
      { token: "CAR-106", patientName: "Arjun Verma", status: "Waiting", time: "09:45 AM", priority: "Regular" },
      { token: "CAR-107", patientName: "Kavita Rao", status: "Waiting", time: "10:00 AM", priority: "Regular" },
      { token: "CAR-108", patientName: "Mohammed Farooq", status: "Waiting", time: "10:15 AM", priority: "Regular" }
    ]
  },
  {
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
    queue: [
      { token: "ORT-082", patientName: "David D'Souza", status: "Inside", time: "09:20 AM", priority: "Regular" },
      { token: "ORT-083", patientName: "Sunita Patel", status: "Next", time: "09:35 AM", priority: "Senior Citizen" },
      { token: "ORT-084", patientName: "Harpreet Singh", status: "Waiting", time: "09:50 AM", priority: "Regular" },
      { token: "ORT-085", patientName: "Priya Nair", status: "Waiting", time: "10:05 AM", priority: "Regular" }
    ]
  },
  {
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
    queue: [
      { token: "GEN-211", patientName: "Gopal Krishna", status: "Inside", time: "09:10 AM", priority: "Regular" },
      { token: "GEN-212", patientName: "Lakshmi Narayanan", status: "Next", time: "09:20 AM", priority: "Senior Citizen" },
      { token: "GEN-213", patientName: "Rohan Sen", status: "Waiting", time: "09:30 AM", priority: "Regular" },
      { token: "GEN-214", patientName: "Deepa Menon", status: "Waiting", time: "09:40 AM", priority: "Regular" },
      { token: "GEN-215", patientName: "Amitabh Roy", status: "Waiting", time: "09:50 AM", priority: "Regular" }
    ]
  },
  {
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
    queue: [
      { token: "PED-049", patientName: "Baby Aavya (Parent: Sneha)", status: "Inside", time: "09:25 AM", priority: "Child Care" },
      { token: "PED-050", patientName: "Master Vihaan", status: "Next", time: "09:40 AM", priority: "Child Care" },
      { token: "PED-051", patientName: "Baby Reyansh", status: "Waiting", time: "09:55 AM", priority: "Child Care" }
    ]
  },
  {
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
    queue: [
      { token: "DER-031", patientName: "Neha Kapoor", status: "Completing", time: "09:15 AM", priority: "Regular" },
      { token: "DER-032", patientName: "Aditya Jain", status: "Next", time: "09:30 AM", priority: "Regular" },
      { token: "DER-033", patientName: "Simran Kaur", status: "Waiting", time: "09:45 AM", priority: "Regular" }
    ]
  },
  {
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
    queue: [
      { token: "ENT-055", patientName: "Venkat Raman", status: "Inside", time: "09:18 AM", priority: "Regular" },
      { token: "ENT-056", patientName: "Alka Pandey", status: "Next", time: "09:32 AM", priority: "Regular" },
      { token: "ENT-057", patientName: "Karan Malhotra", status: "Waiting", time: "09:46 AM", priority: "Regular" }
    ]
  }
];

export const doctorsRoster = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  }
];

export const mockOPRecords = {
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
    prescription: [
      { medicine: "Telmisartan 40mg", timing: "1 - 0 - 0", instruction: "Once daily, morning after food", duration: "30 Days" },
      { medicine: "Atorvastatin 10mg", timing: "0 - 0 - 1", instruction: "Night after dinner", duration: "30 Days" },
      { medicine: "Ecosprin 75mg", timing: "0 - 1 - 0", instruction: "After lunch", duration: "30 Days" }
    ],
    recommendedTests: [
      { testName: "12-Lead ECG", status: "Completed Today (Normal sinus rhythm)" },
      { testName: "2D Echocardiography", status: "Scheduled 11:30 AM" },
      { testName: "Lipid Profile & Serum Creatinine", status: "Fasting sample tomorrow" }
    ],
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
    prescription: [
      { medicine: "Paracetamol 650mg", timing: "1 - 1 - 1", instruction: "As needed for body aches/fever (SOS)", duration: "3 Days" },
      { medicine: "Levocetirizine 5mg", timing: "0 - 0 - 1", instruction: "At bedtime", duration: "5 Days" },
      { medicine: "Vitamin C + Zinc Chewable", timing: "1 - 0 - 0", instruction: "After breakfast", duration: "10 Days" }
    ],
    recommendedTests: [
      { testName: "Complete Blood Count (CBC)", status: "Report Awaited (12:00 PM)" },
      { testName: "CRP Qualitative", status: "Ordered" }
    ],
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
    prescription: [
      { medicine: "Diacerein + Glucosamine", timing: "1 - 0 - 1", instruction: "After meals", duration: "60 Days" },
      { medicine: "Etoricoxib 90mg", timing: "0 - 0 - 1", instruction: "SOS when pain is severe", duration: "5 Days max" },
      { medicine: "Diclofenac Gel", timing: "Local", instruction: "Apply gently twice daily over knees", duration: "15 Days" }
    ],
    recommendedTests: [
      { testName: "Digital X-Ray Both Knees (Standing AP & Lateral)", status: "Completed (Reduced joint space noted)" },
      { testName: "Serum Vitamin D3 & Uric Acid", status: "Recommended" }
    ],
    doctorNotes: "Quadriceps strengthening exercises demonstrated. Avoid cross-legged sitting. Weight management advice given."
  }
};
