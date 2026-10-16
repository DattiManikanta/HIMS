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
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "heart-pulse",
  queue: []
}, {
  id: "dep-ortho",
  name: "Orthopedics & Joint Clinic",
  shortName: "Orthopedics",
  code: "ORT",
  room: "Cabin 102 (1st Floor)",
  doctor: "Dr. Vikramaditya Rathore",
  specialty: "Consultant Orthopedic Surgeon",
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "bone",
  queue: []
}, {
  id: "dep-genmed",
  name: "General Medicine & Health",
  shortName: "General Medicine",
  code: "GEN",
  room: "Cabin 103 (Ground Floor)",
  doctor: "Dr. Sandeep K. Banerjee",
  specialty: "Chief Physician & Diabetologist",
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "stethoscope",
  queue: []
}, {
  id: "dep-ped",
  name: "Pediatrics & Child Wellness",
  shortName: "Pediatrics",
  code: "PED",
  room: "Cabin 104 (Ground Floor)",
  doctor: "Dr. Shalini Deshmukh",
  specialty: "Senior Pediatrician & Neonatologist",
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "baby",
  queue: []
}, {
  id: "dep-derma",
  name: "Dermatology & Skin Care",
  shortName: "Dermatology",
  code: "DER",
  room: "Cabin 105 (2nd Floor)",
  doctor: "Dr. Neil Chatterjee",
  specialty: "Cosmetic & Clinical Dermatologist",
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "sparkles",
  queue: []
}, {
  id: "dep-ent",
  name: "ENT & Head-Neck Clinic",
  shortName: "ENT",
  code: "ENT",
  room: "Cabin 106 (2nd Floor)",
  doctor: "Dr. Priya Sundaram",
  specialty: "ENT & Cochlear Implant Surgeon",
  currentToken: "-",
  nextToken: "-",
  waitingCount: 0,
  avgWaitTime: "0 mins",
  status: "Available",
  statusColor: "emerald",
  icon: "ear",
  queue: []
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
const mockOPRecords = {};

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
  }, "Metro Tiles Screen")))), /*#__PURE__*/React.createElement("div", {
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
  }, "\u2715")), /*#__PURE__*/React.createElement("header", {
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
  const [selectedQueueToken, setSelectedQueueToken] = useState(null);
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
    }, dep.queue.slice(0, 4).map((item, idx) => {
      const isSelected = selectedQueueToken === item.token;
      return /*#__PURE__*/React.createElement("span", {
        key: item.token,
        onClick: () => setSelectedQueueToken(isSelected ? null : item.token),
        style: {
          fontSize: '0.75rem',
          padding: '3px 8px',
          background: isSelected ? '#dc2626' : idx === 0 ? 'var(--primary-light)' : 'var(--bg-alt)',
          color: isSelected ? '#ffffff' : idx === 0 ? 'var(--primary)' : 'var(--text-main)',
          fontWeight: isSelected ? 800 : idx === 0 ? 700 : 500,
          borderRadius: '6px',
          border: isSelected ? '1.5px solid #991b1b' : '1px solid var(--border)',
          boxShadow: isSelected ? '0 0 10px rgba(220, 38, 38, 0.7)' : 'none',
          cursor: 'pointer',
          transition: 'all 0.15s ease'
        },
        title: `${item.patientName} (${item.priority}) ${isSelected ? '— SELECTED & OCCUPIED (RED)' : '— Click to Select Token'}`
      }, item.token, " ", isSelected ? '🔴' : item.priority === 'Senior Citizen' ? '👴' : '');
    }), dep.queue.length > 4 && /*#__PURE__*/React.createElement("span", {
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

// Patient appointments queue initialized empty; strictly populated query-wise from database
const INITIAL_APPOINTMENTS = [];
const CONSULTANTS_ROSTER = [{
  name: 'SATYANARAYANA V VSN / ',
  code: 'EMP00006',
  spec: 'NEUROLOGIST',
  fee: 1000,
  depCode: 'NEU',
  doctorId: 6,
  doctorDetails: '6:EMP00006:NEUROLOGIST'
}, {
  name: 'R LALITHA LA',
  code: 'EMP00001',
  spec: 'SENIOR GENERAL PHYSICIAN / OPD',
  fee: 800,
  depCode: 'GEN',
  doctorId: 1,
  doctorDetails: '1:EMP00001:GENERAL MEDICINE'
}, {
  name: 'RAKESH TUMULA RT',
  code: 'EMP00002',
  spec: 'ORTHOPEDICS & SPINE SPECIALIST',
  fee: 1450,
  depCode: 'ORT',
  doctorId: 2,
  doctorDetails: '2:EMP00002:ORTHOPEDICS'
}, {
  name: 'ANIL KUMAR MAHAPATRO AKM',
  code: 'EMP00003',
  spec: 'CARDIOLOGY & INTERVENTIONAL SPECIALIST',
  fee: 850,
  depCode: 'CAR',
  doctorId: 3,
  doctorDetails: '3:EMP00003:CARDIOLOGY'
}, {
  name: 'RAMESH NAIDU M RNM',
  code: 'EMP00004',
  spec: 'GENERAL MEDICINE & DIABETOLOGY',
  fee: 600,
  depCode: 'GEN',
  doctorId: 4,
  doctorDetails: '4:EMP00004:GENERAL MEDICINE'
}, {
  name: 'Dr. Ananya Iyer',
  code: 'EMP00005',
  spec: 'CHIEF CARDIOLOGIST',
  fee: 700,
  depCode: 'CAR',
  doctorId: 5,
  doctorDetails: '5:EMP00005:CARDIOLOGY'
}, {
  name: 'Dr. Sandeep K. Banerjee',
  code: 'EMP00007',
  spec: 'CHIEF PHYSICIAN',
  fee: 600,
  depCode: 'GEN',
  doctorId: 7,
  doctorDetails: '7:EMP00007:GENERAL MEDICINE'
}, {
  name: 'Dr. Vikramaditya Rathore',
  code: 'EMP00008',
  spec: 'CONSULTANT ORTHOPEDIC SURGEON',
  fee: 750,
  depCode: 'ORT',
  doctorId: 8,
  doctorDetails: '8:EMP00008:ORTHOPEDICS'
}, {
  name: 'Dr. Shalini Deshmukh',
  code: 'EMP00009',
  spec: 'SENIOR PEDIATRICIAN',
  fee: 500,
  depCode: 'PED',
  doctorId: 9,
  doctorDetails: '9:EMP00009:PEDIATRICS'
}, {
  name: 'Dr. Neil Chatterjee',
  code: 'EMP00010',
  spec: 'CLINICAL DERMATOLOGIST',
  fee: 650,
  depCode: 'DER',
  doctorId: 10,
  doctorDetails: '10:EMP00010:DERMATOLOGY'
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
const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_NAMES_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function formatToDdMmmYyyy(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = MONTH_NAMES_SHORT[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
function formatToYyyyMmDd(date) {
  if (!date) return '';
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}
function parseAnyDate(str) {
  if (!str) return null;
  if (str instanceof Date) return isNaN(str.getTime()) ? null : str;
  let s = String(str).trim();
  if (s.includes('T')) s = s.split('T')[0];
  if (s.includes(' ')) s = s.split(' ')[0];
  // YYYY-MM-DD
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) {
    const parts = s.split('-').map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  // DD-MMM-YYYY (e.g. 14-Oct-2026)
  const parts = s.split('-');
  if (parts.length === 3) {
    const d = Number(parts[0]);
    const m = MONTH_NAMES_SHORT.findIndex(x => x.toLowerCase() === parts[1].toLowerCase());
    const y = Number(parts[2]);
    if (!isNaN(d) && m !== -1 && !isNaN(y)) {
      return new Date(y, m, d);
    }
  }
  // DD/MM/YYYY
  const slashParts = s.split('/');
  if (slashParts.length === 3) {
    const d = Number(slashParts[0]);
    const m = Number(slashParts[1]) - 1;
    const y = Number(slashParts[2]);
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m, d);
    }
  }
  const dt = new Date(s);
  return isNaN(dt.getTime()) ? null : dt;
}

// Age in Years, Months, Days calculation matching patientQueue.jsp lines 6511-6535
function getAgeInYMD(dobStr) {
  if (!dobStr) return {
    years: '',
    months: 0,
    days: 0
  };
  const dob = parseAnyDate(dobStr);
  if (!dob) return {
    years: '',
    months: 0,
    days: 0
  };
  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days)
  };
}

// Format today's date into 'dd-MMM-yyyy' (e.g. 14-Oct-2026)
function getTodayDateFormatted() {
  return formatToDdMmmYyyy(new Date());
}

// Format today's date range into 'D Month, YYYY - D Month, YYYY'
function getTodayDateRangeFormatted() {
  const d = new Date();
  const day = d.getDate();
  const month = MONTH_NAMES_FULL[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month}, ${year} - ${day} ${month}, ${year}`;
}

// Custom DatePicker (matches bootstrap-datepicker from patientQueue.jsp)
function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  format = "dd-MMM-yyyy",
  // "dd-MMM-yyyy" or "yyyy-mm-dd"
  className = "",
  id,
  showYearSelect = false,
  alignRight = false,
  disableFuture = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);
  const initialDate = parseAnyDate(value) || new Date();
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  useEffect(() => {
    const d = parseAnyDate(value);
    if (d) {
      setViewYear(d.getFullYear());
      setViewMonth(d.getMonth());
    }
  }, [value]);
  useEffect(() => {
    const handleOutside = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sun

  const handlePrevMonth = e => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };
  const handleNextMonth = e => {
    e.preventDefault();
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };
  const handleSelectDay = (dayNum, e) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = new Date(viewYear, viewMonth, dayNum);
    const formatted = format === "yyyy-mm-dd" ? formatToYyyyMmDd(selected) : formatToDdMmmYyyy(selected);
    onChange(formatted);
    setIsOpen(false);
  };
  const handleSelectToday = e => {
    e.preventDefault();
    e.stopPropagation();
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    const formatted = format === "yyyy-mm-dd" ? formatToYyyyMmDd(today) : formatToDdMmmYyyy(today);
    onChange(formatted);
    setIsOpen(false);
  };
  const handleClear = e => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  // Year options for fast dropdown
  const yearsOptions = [];
  const startYr = showYearSelect ? 1920 : 2020;
  const endYr = 2035;
  for (let y = endYr; y >= startYr; y--) {
    yearsOptions.push(y);
  }

  // Selected date comparison
  const parsedVal = parseAnyDate(value);
  const isSelected = dayNum => {
    if (!parsedVal) return false;
    return parsedVal.getFullYear() === viewYear && parsedVal.getMonth() === viewMonth && parsedVal.getDate() === dayNum;
  };
  const today = new Date();
  const isToday = dayNum => {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === dayNum;
  };
  const isFuture = dayNum => {
    const d = new Date(viewYear, viewMonth, dayNum);
    d.setHours(0, 0, 0, 0);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return d > now;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "hims-datepicker-container",
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-datepicker-input-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-datepicker-icon-btn",
    onClick: () => setIsOpen(!isOpen),
    title: "Open Calendar Date Picker"
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: id,
    value: value || '',
    onChange: e => onChange(e.target.value),
    onClick: () => setIsOpen(true),
    placeholder: placeholder,
    className: `hims-datepicker-input ${className}`,
    autoComplete: "off"
  })), isOpen && /*#__PURE__*/React.createElement("div", {
    className: `hims-datepicker-dropdown ${alignRight ? 'align-right' : ''}`,
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-dp-header"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-dp-nav-btn",
    onClick: handlePrevMonth,
    title: "Previous Month"
  }, "\u25C0"), /*#__PURE__*/React.createElement("div", {
    className: "hims-dp-title"
  }, /*#__PURE__*/React.createElement("select", {
    value: viewMonth,
    onChange: e => setViewMonth(Number(e.target.value)),
    className: "hims-dp-select"
  }, MONTH_NAMES_SHORT.map((name, i) => /*#__PURE__*/React.createElement("option", {
    key: name,
    value: i
  }, MONTH_NAMES_FULL[i]))), /*#__PURE__*/React.createElement("select", {
    value: viewYear,
    onChange: e => setViewYear(Number(e.target.value)),
    className: "hims-dp-select"
  }, yearsOptions.map(y => /*#__PURE__*/React.createElement("option", {
    key: y,
    value: y
  }, y)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-dp-nav-btn",
    onClick: handleNextMonth,
    title: "Next Month"
  }, "\u25B6")), /*#__PURE__*/React.createElement("div", {
    className: "hims-dp-grid"
  }, ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => /*#__PURE__*/React.createElement("div", {
    key: w,
    className: "hims-dp-weekday"
  }, w)), Array.from({
    length: firstDayOfWeek
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: `empty-${i}`,
    className: "hims-dp-day empty"
  })), Array.from({
    length: daysInMonth
  }).map((_, i) => {
    const dayNum = i + 1;
    const sel = isSelected(dayNum);
    const tod = isToday(dayNum);
    const fut = disableFuture && isFuture(dayNum);
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: dayNum,
      disabled: fut,
      onClick: e => !fut && handleSelectDay(dayNum, e),
      className: `hims-dp-day ${sel ? 'selected' : ''} ${tod ? 'today' : ''} ${fut ? 'disabled' : ''}`
    }, dayNum);
  })), /*#__PURE__*/React.createElement("div", {
    className: "hims-dp-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-dp-footer-btn",
    onClick: handleSelectToday
  }, "Today"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-dp-footer-btn",
    onClick: handleClear
  }, "Clear"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "hims-dp-footer-btn",
    onClick: () => setIsOpen(false)
  }, "Close"))));
}

// Custom DateRangePicker matching #reportRangeDiv in patientQueue.jsp (lines 397-414 & 14060-14120)
function CustomDateRangePicker({
  value,
  onChange,
  onRangeApply
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef(null);
  const today = new Date();
  const [rangeStart, setRangeStart] = useState(today);
  const [rangeEnd, setRangeEnd] = useState(today);
  const [activePreset, setActivePreset] = useState('today');

  // Month navigation for left calendar
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Fast manual input dates
  const [inputFrom, setInputFrom] = useState(formatToDdMmmYyyy(today));
  const [inputTo, setInputTo] = useState(formatToDdMmmYyyy(today));
  useEffect(() => {
    const handleOutside = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);
  const applyRange = (start, end, presetName = '') => {
    const s = start || new Date();
    const e = end || s;
    const startStr = `${s.getDate()} ${MONTH_NAMES_FULL[s.getMonth()]}, ${s.getFullYear()}`;
    const endStr = `${e.getDate()} ${MONTH_NAMES_FULL[e.getMonth()]}, ${e.getFullYear()}`;
    const rangeText = `${startStr} - ${endStr}`;
    setRangeStart(s);
    setRangeEnd(e);
    setInputFrom(formatToDdMmmYyyy(s));
    setInputTo(formatToDdMmmYyyy(e));
    if (presetName) setActivePreset(presetName);
    onChange(rangeText);
    if (onRangeApply) onRangeApply(s, e);
    setIsOpen(false);
  };
  const selectPreset = type => {
    const t = new Date();
    let start = new Date(t);
    let end = new Date(t);
    if (type === 'today') {
      start = t;
      end = t;
    } else if (type === 'yesterday') {
      start = new Date(t);
      start.setDate(t.getDate() - 1);
      end = new Date(start);
    } else if (type === 'last7') {
      start = new Date(t);
      start.setDate(t.getDate() - 6);
      end = t;
    } else if (type === 'last30') {
      start = new Date(t);
      start.setDate(t.getDate() - 29);
      end = t;
    } else if (type === 'thisMonth') {
      start = new Date(t.getFullYear(), t.getMonth(), 1);
      end = new Date(t.getFullYear(), t.getMonth() + 1, 0);
    } else if (type === 'last6Months') {
      start = new Date(t.getFullYear(), t.getMonth() - 6, 1);
      end = t;
    } else if (type === 'all') {
      setActivePreset('all');
      onChange("All Appointments");
      if (onRangeApply) onRangeApply(null, null);
      setIsOpen(false);
      return;
    }
    applyRange(start, end, type);
  };
  const handleDayClick = date => {
    setActivePreset('custom');
    if (!rangeStart || rangeStart && rangeEnd) {
      setRangeStart(date);
      setRangeEnd(null);
      setInputFrom(formatToDdMmmYyyy(date));
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
        setInputFrom(formatToDdMmmYyyy(date));
        setInputTo(formatToDdMmmYyyy(rangeStart));
      } else {
        setRangeEnd(date);
        setInputTo(formatToDdMmmYyyy(date));
      }
    }
  };
  const isInRange = d => {
    if (!rangeStart || !rangeEnd) return false;
    const s = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate()).getTime();
    const e = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate()).getTime();
    const cur = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    return cur > s && cur < e;
  };
  const isStart = d => {
    if (!rangeStart) return false;
    return d.getFullYear() === rangeStart.getFullYear() && d.getMonth() === rangeStart.getMonth() && d.getDate() === rangeStart.getDate();
  };
  const isEnd = d => {
    if (!rangeEnd) return false;
    return d.getFullYear() === rangeEnd.getFullYear() && d.getMonth() === rangeEnd.getMonth() && d.getDate() === rangeEnd.getDate();
  };
  const handleApplyCustom = () => {
    const s = parseAnyDate(inputFrom) || rangeStart || new Date();
    const e = parseAnyDate(inputTo) || rangeEnd || s;
    applyRange(s, e, 'custom');
  };
  const renderMonthCalendar = (y, m, isLeft) => {
    const daysCount = new Date(y, m + 1, 0).getDate();
    const firstDay = new Date(y, m, 1).getDay();
    return /*#__PURE__*/React.createElement("div", {
      className: "hims-dr-cal-box",
      key: `${y}-${m}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "hims-dr-cal-header"
    }, isLeft ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "hims-dp-nav-btn",
      onClick: e => {
        e.stopPropagation();
        if (viewMonth === 0) {
          setViewMonth(11);
          setViewYear(prev => prev - 1);
        } else {
          setViewMonth(prev => prev - 1);
        }
      },
      title: "Previous Month"
    }, "\u25C0") : /*#__PURE__*/React.createElement("div", {
      style: {
        width: '24px'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: '700',
        fontSize: '12px',
        color: '#1e293b'
      }
    }, MONTH_NAMES_FULL[m], " ", y), !isLeft ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "hims-dp-nav-btn",
      onClick: e => {
        e.stopPropagation();
        if (viewMonth === 11) {
          setViewMonth(0);
          setViewYear(prev => prev + 1);
        } else {
          setViewMonth(prev => prev + 1);
        }
      },
      title: "Next Month"
    }, "\u25B6") : /*#__PURE__*/React.createElement("div", {
      style: {
        width: '24px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "hims-dr-grid"
    }, ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => /*#__PURE__*/React.createElement("div", {
      key: w,
      className: "hims-dr-weekday"
    }, w)), Array.from({
      length: firstDay
    }).map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: `empty-${i}`,
      className: "hims-dr-day-cell empty"
    })), Array.from({
      length: daysCount
    }).map((_, i) => {
      const dayNum = i + 1;
      const thisDate = new Date(y, m, dayNum);
      const startSelected = isStart(thisDate);
      const endSelected = isEnd(thisDate);
      const inRangeSelected = isInRange(thisDate);
      const isTodayCell = today.getFullYear() === y && today.getMonth() === m && today.getDate() === dayNum;
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        key: dayNum,
        onClick: e => {
          e.stopPropagation();
          handleDayClick(thisDate);
        },
        className: `hims-dr-day-cell ${startSelected ? 'range-start' : ''} ${endSelected ? 'range-end' : ''} ${inRangeSelected ? 'in-range' : ''} ${isTodayCell ? 'today-dot' : ''}`,
        title: formatToDdMmmYyyy(thisDate)
      }, dayNum);
    })));
  };
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "hims-daterange-container",
    ref: containerRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "reportRangeDiv",
    className: "reg-date-range-box hims-report-range-btn",
    onClick: () => setIsOpen(!isOpen),
    title: "Click to select Date Range (patientQueue.jsp daterangepicker)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cal-icon",
    style: {
      fontSize: '15px'
    }
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("span", {
    className: "dr-val-text"
  }, value || getTodayDateRangeFormatted()), /*#__PURE__*/React.createElement("span", {
    className: "caret-icon",
    style: {
      marginLeft: '8px',
      fontSize: '10px',
      color: '#64748b'
    }
  }, "\u25BC")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    id: "reportFromDt",
    name: "reportFromDt",
    value: formatToDdMmmYyyy(rangeStart || today)
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    id: "reportToDt",
    name: "reportToDt",
    value: formatToDdMmmYyyy(rangeEnd || today)
  }), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "hims-daterange-dropdown",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-main-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-sidebar-presets"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      fontWeight: '800',
      color: '#475569',
      textTransform: 'uppercase',
      marginBottom: '4px'
    }
  }, "Quick Ranges:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'today' ? 'active' : ''}`,
    onClick: () => selectPreset('today')
  }, "\uD83D\uDCC5 Today"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'yesterday' ? 'active' : ''}`,
    onClick: () => selectPreset('yesterday')
  }, "\u25C0 Yesterday"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'last7' ? 'active' : ''}`,
    onClick: () => selectPreset('last7')
  }, "7\uFE0F\u20E3 Last 7 Days"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'last30' ? 'active' : ''}`,
    onClick: () => selectPreset('last30')
  }, "\uD83D\uDDD3\uFE0F Last 30 Days"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'thisMonth' ? 'active' : ''}`,
    onClick: () => selectPreset('thisMonth')
  }, "\uD83D\uDCC6 This Month"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'last6Months' ? 'active' : ''}`,
    onClick: () => selectPreset('last6Months')
  }, "\u23EE\uFE0F Last 6 Months"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `hims-dr-preset-item-btn ${activePreset === 'all' ? 'active' : ''}`,
    onClick: () => selectPreset('all')
  }, "\uD83C\uDF10 Show All")), /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-calendars-wrap"
  }, renderMonthCalendar(viewYear, viewMonth, true), renderMonthCalendar(rightYear, rightMonth, false))), /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-bottom-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-inputs-inline"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#475569'
    }
  }, "From:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputFrom,
    onChange: e => setInputFrom(e.target.value),
    placeholder: "dd-MMM-yyyy",
    className: "hims-dr-mini-input"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#475569'
    }
  }, "To:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputTo,
    onChange: e => setInputTo(e.target.value),
    placeholder: "dd-MMM-yyyy",
    className: "hims-dr-mini-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "hims-dr-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-secondary btn-sm",
    onClick: () => setIsOpen(false),
    style: {
      padding: '4px 10px',
      fontSize: '11.5px'
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary btn-sm",
    onClick: handleApplyCustom,
    style: {
      background: '#0284c7',
      borderColor: '#0284c7',
      color: '#fff',
      padding: '4px 12px',
      fontSize: '11.5px'
    }
  }, "Apply Range")))));
}

// Master Dropdowns Query-Wise Datasets (Matching legacy patientQueue.jsp & PatientMapper.xml)
const MASTER_CITIES = ['Visakhapatnam', 'Hyderabad', 'Bhubaneswar', 'Vijayawada', 'Guntur', 'Rajahmundry', 'Kakinada', 'Srikakulam', 'Vizianagaram', 'Tirupati', 'Kurnool', 'Nellore', 'Warangal', 'Cuttack', 'Berhampur', 'Bangalore', 'Chennai', 'Mumbai', 'Kolkata', 'New Delhi', 'Other City'];
const MASTER_STATES = ['Andhra Pradesh', 'Telangana', 'Odisha', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Kerala', 'West Bengal', 'Madhya Pradesh', 'Chhattisgarh', 'Delhi', 'Bihar', 'Gujarat', 'Uttar Pradesh', 'Rajasthan'];
const MASTER_ORGANIZATIONS = ['--Select Organization--', 'Self Pay / Individual', 'APTRANSCO', 'NTPC', 'HPCL', 'INDIAN NAVY', 'SOUTH CENTRAL RAILWAY', 'SBI (State Bank of India)', 'BSNL', 'RINL / VIZAG STEEL PLANT', 'VISAKHAPATNAM PORT TRUST', 'WALTAIR DIVISION RAILWAYS', 'EHS (Govt Employee Health Scheme)', 'AROGYASRI HEALTH CARE TRUST', 'CORPORATE INSURANCE TPA'];
const MASTER_CATEGORIES = ['GENERAL - TRI', 'VIP', 'STAFF', 'CORPORATE', 'HEALTH INSURANCE', 'AROGYASRI', 'EHS', 'TRUST', 'CAMP', 'BPL'];
const MASTER_REF_TYPES = ['Walk In', 'Doctor', 'Hospital', 'Organization', 'Staff', 'Online', 'Emergency'];
const MASTER_OCCUPATIONS = ['--Select Occupation--', 'Farmer', 'Business', 'Employee', 'House Wife', 'Labour', 'Retired', 'Self Employee', 'Student', 'Not Specified'];
const MASTER_ID_TYPES = ['Aadhaar', 'PAN Card', 'Voter ID', 'Medical Card No.', 'Driving License', 'Passport'];
const MASTER_RELIGIONS = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Other'];
const MASTER_MARITAL_STATUS = ['Married', 'Single', 'Widow', 'Divorced'];
const MASTER_BLOOD_GROUPS = ['B+', 'A+', 'O+', 'AB+', 'B-', 'A-', 'O-', 'AB-'];
const MASTER_CARE_BY = ['Self', 'Father', 'Mother', 'Husband', 'Spouse', 'Guardian', 'Other'];
const MASTER_BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'Kotak Mahindra Bank', 'Andhra Bank', 'IndusInd Bank', 'Indian Bank'];
const MASTER_AUTHORIZED = ['Admin', 'Medical Superintendent', 'Managing Director', 'Duty Medical Officer', 'Billing Supervisor'];
function normalizeDocName(name) {
  if (!name) return '';
  return String(name).replace(/^Dr\.?\s+/i, '').replace(/[\/\s]+$/g, '').trim().toUpperCase();
}

// Generate slots for a doctor & date matching Indus schedule (strictly query-wise)
function generateDoctorSlots(doctorName, dateStr, appointmentsList, extraTokens = 0) {
  const startHour = 8;
  const startMin = 30;
  const totalSlotsCount = 12 + (extraTokens || 0);
  const slots = [];

  // Determine booked tokens strictly from existing appointments query-wise (no fake dummy bookings)
  const bookedSet = new Set();
  const targetDoc = normalizeDocName(doctorName);
  if (appointmentsList && appointmentsList.length > 0) {
    appointmentsList.forEach(apt => {
      const aptDoc = normalizeDocName(apt.consultant || apt.doctor || apt.docName || apt.doctorName);
      if (aptDoc && targetDoc && (aptDoc === targetDoc || targetDoc.includes(aptDoc) || aptDoc.includes(targetDoc))) {
        // Date matching: if dateStr is provided and apt has a date, ensure same day
        if (dateStr && (apt.appointmentDate || apt.apptDt || apt.visitDate)) {
          const d1 = parseAnyDate(dateStr);
          const d2 = parseAnyDate(apt.appointmentDate || apt.apptDt || apt.visitDate);
          if (d1 && d2) {
            if (d1.getFullYear() !== d2.getFullYear() || d1.getMonth() !== d2.getMonth() || d1.getDate() !== d2.getDate()) {
              return;
            }
          }
        }
        const rawToken = String(apt.tokenNum !== undefined && apt.tokenNum !== null && apt.tokenNum !== '' ? apt.tokenNum : apt.token || '');
        const numMatch = rawToken.match(/\d+/);
        if (numMatch) {
          const num = parseInt(numMatch[0], 10);
          if (num > 0) bookedSet.add(num);
        }
      }
    });
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
  // Tabs: Always defaults to 'appointments' (Tab 1: Saved List)
  const [internalTab, setInternalTab] = useState('appointments');
  const activeTab = propActiveTab || internalTab;
  const setActiveTab = tab => {
    setInternalTab(tab);
    if (propOnTabChange) propOnTabChange(tab);
  };

  // Initialize appointments immediately from localStorage cache so there is ZERO waiting time on refresh!
  const [appointments, setAppointments] = useState(() => {
    try {
      const cached = localStorage.getItem('atri_hims_saved_appointments');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_APPOINTMENTS;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [selectedHospital, setSelectedHospital] = useState('INDUS HEALTH CITY');
  const [dateRange, setDateRange] = useState(getTodayDateRangeFormatted());
  const [dateFilterRange, setDateFilterRange] = useState(() => {
    const today = new Date();
    return {
      start: today,
      end: today
    };
  });
  const [printModal, setPrintModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [vitalsDrawer, setVitalsDrawer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Existing Patient Search in Tab 2 State (query-wise based on PatientMapper DetailedView)
  const [existingSearchTerm, setExistingSearchTerm] = useState('');
  const [existingSearchResults, setExistingSearchResults] = useState([]);
  const [isSearchingExisting, setIsSearchingExisting] = useState(false);
  const [isExistingPatientSelected, setIsExistingPatientSelected] = useState(false);
  const [selectedPatientUmr, setSelectedPatientUmr] = useState('');

  // Fetch live queue from backend and merge seamlessly with local cache
  const fetchServerQueue = async () => {
    try {
      let serverData = null;
      const res = await fetch('/api/patient/queue');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          serverData = data;
        }
      }
      if (!serverData) {
        const fallbackRes = await fetch('/patient/patientQueue');
        if (fallbackRes.ok) {
          const fbData = await fallbackRes.json();
          if (Array.isArray(fbData) && fbData.length > 0) {
            serverData = fbData;
          }
        }
      }
      if (serverData && serverData.length > 0) {
        setAppointments(prev => {
          const serverUmrs = new Set(serverData.map(p => p.umrNo || p.patientCode).filter(Boolean));
          const localOnly = prev.filter(p => p.umrNo && !serverUmrs.has(p.umrNo));
          const merged = [...localOnly, ...serverData];
          try {
            localStorage.setItem('atri_hims_saved_appointments', JSON.stringify(merged));
          } catch (e) {}
          return merged;
        });
      }
    } catch (err) {
      console.warn('Queue fetch warning:', err);
    }
  };
  useEffect(() => {
    fetchServerQueue();
  }, []);

  // Merge newly registered records from App into appointments if present
  useEffect(() => {
    if (records && Object.keys(records).length > 0) {
      const persistedList = Object.values(records).filter(rec => rec && (rec.umrNo || rec.opId || rec.patientCode)).map(rec => ({
        umrNo: rec.umrNo || rec.opId || rec.patientCode,
        token: rec.token || rec.tokenNum || '1',
        patientName: (rec.patientName || rec.pname || '').toUpperCase(),
        genderAge: rec.genderAge || `${(rec.gender || 'MALE').toUpperCase()}/${rec.age || 40}yrs`,
        gender: rec.gender || 'MALE',
        age: rec.age || 40,
        appointmentDate: rec.appointmentDate || rec.apptDt || rec.visitDate || '',
        consultant: rec.consultant || rec.docName || rec.doctor || '',
        category: rec.category || rec.patientCategory || 'GENERAL',
        billStatus: rec.billStatus || 'PAID',
        regCash: rec.payment ? rec.payment.regFee || 50 : rec.regCash || 50,
        regCredit: 0,
        regUpi: 0,
        conCash: rec.payment ? rec.payment.consultationFee || 1000 : rec.conCash || 1000,
        conCredit: 0,
        conUpi: 0,
        phone: rec.phone || rec.mobNum || '',
        vitals: rec.vitals || null
      }));
      if (persistedList.length > 0) {
        setAppointments(prev => {
          const existingUmrs = new Set(prev.map(p => p.umrNo).filter(Boolean));
          const newToAdd = persistedList.filter(p => p.umrNo && !existingUmrs.has(p.umrNo));
          return [...newToAdd, ...prev];
        });
      }
    }
  }, [records]);

  // Tab 2 Form Data State (Matching Screenshot 2 & Exact Doctor Details - ZERO dummy data)
  const [formData, setFormData] = useState({
    title: 'Mr.',
    patientName: '',
    lastName: '',
    gender: 'Male',
    dob: '',
    years: '',
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
    // Appointment Details (Empty initially so user selects Hospital and Doctor freely)
    location: '',
    appointmentDate: getTodayDateFormatted(),
    token: '',
    consultant: '',
    doctorCode: '',
    specialization: '',
    // Fee Details
    regFee: 50,
    regFinalAmt: 50,
    consFee: 0,
    discPercent: 0,
    discAmt: 0,
    consFinalAmt: 0,
    totalAmt: 50,
    totalBillAmt: 50,
    amtReceived: 50,
    balance: 0,
    status: 'PAID',
    authorizedBy: 'Admin',
    // Payment Mode
    paymentMode: 'Cash',
    paymentAmt: 50
  });

  // Doctor Slots & Extra Tokens State (Opened dynamically when Doctor is selected)
  const [extraTokensCount, setExtraTokensCount] = useState(0);
  const [selectedSlotToken, setSelectedSlotToken] = useState(null);
  const [isSlotsOpen, setIsSlotsOpen] = useState(false);

  // Exact Payment Table (#payModeTable) State matching patientQueue.jsp (lines 3521-3625)
  const [paymentRows, setPaymentRows] = useState([]);
  const [payMode, setPayMode] = useState('275'); // 275 = Cash, 276 = CARD, 277 = UPI
  const [payAmount, setPayAmount] = useState('50.00');
  const [cardType, setCardType] = useState('0'); // 'Credit', 'Debit'
  const [cardTransNo, setCardTransNo] = useState('');
  const [cardBankName, setCardBankName] = useState('0');
  const [cardExpDate, setCardExpDate] = useState('');
  const [payModeError, setPayModeError] = useState('');
  const handleAddPayment = () => {
    setPayModeError('');
    const amt = parseFloat(payAmount) || 0;
    if (payMode === '0') {
      setPayModeError('Select Cash Mode');
      return;
    }
    if (amt <= 0) {
      setPayModeError('Enter Credit Amount');
      return;
    }
    if (payMode === '276') {
      // CARD
      if (cardType === '0') {
        setPayModeError('Enter Card Type');
        return;
      }
      if (!cardTransNo.trim()) {
        setPayModeError('Enter Credit No / Trans Id');
        return;
      }
      if (cardBankName === '0') {
        setPayModeError('Enter Bank Name');
        return;
      }
      if (!cardExpDate.trim()) {
        setPayModeError('Enter Credit Date (MM/YYYY)');
        return;
      }
    } else if (payMode === '277') {
      // UPI
      if (!cardTransNo.trim()) {
        setPayModeError('Enter Trans Id / UPI Ref');
        return;
      }
    }
    const modeLabel = payMode === '275' ? 'Cash' : payMode === '276' ? 'CARD' : 'UPI';
    const newRow = {
      id: Date.now() + Math.random(),
      modeId: payMode,
      modeLabel: modeLabel,
      amount: amt,
      cardType: payMode === '276' ? cardType : '',
      transNo: cardTransNo.trim(),
      bankName: payMode === '276' ? cardBankName : '',
      expDate: payMode === '276' ? cardExpDate.trim() : ''
    };
    const updated = [...paymentRows, newRow];
    setPaymentRows(updated);
    const totalRecd = updated.reduce((sum, r) => sum + r.amount, 0);
    const bal = Math.max(0, (formData.totalBillAmt || 1050) - totalRecd);
    setFormData(prev => ({
      ...prev,
      amtReceived: totalRecd,
      balance: bal,
      status: bal <= 0 ? 'PAID' : 'PENDING'
    }));
    setPayAmount(bal.toFixed(2));
    setCardTransNo('');
    setCardType('0');
    setCardBankName('0');
    setCardExpDate('');
    showNotification(`✓ Added ${modeLabel} payment: ₹${amt.toFixed(2)}`);
  };
  const handleDeletePayment = rowId => {
    const updated = paymentRows.filter(r => r.id !== rowId);
    setPaymentRows(updated);
    const totalRecd = updated.reduce((sum, r) => sum + r.amount, 0);
    const bal = Math.max(0, (formData.totalBillAmt || 1050) - totalRecd);
    setFormData(prev => ({
      ...prev,
      amtReceived: totalRecd,
      balance: bal,
      status: bal <= 0 ? 'PAID' : 'PENDING'
    }));
    setPayAmount(bal.toFixed(2));
    showNotification('Removed payment entry.');
  };

  // Dynamic slot generation for currently selected doctor, date, and extra tokens
  const currentDoctorSlots = (React.useMemo || useMemo || (fn => fn()))(() => {
    if (!formData.consultant) return [];
    return generateDoctorSlots(formData.consultant, formData.appointmentDate, appointments, extraTokensCount);
  }, [formData.consultant, formData.appointmentDate, appointments, extraTokensCount]);
  const showNotification = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };
  const clearFieldError = field => {
    setFormErrors(prev => {
      if (!prev || !prev[field]) return prev;
      const next = {
        ...prev
      };
      delete next[field];
      return next;
    });
  };

  // Search Existing Patient query-wise from database
  const handleSearchExisting = async e => {
    if (e) e.preventDefault();
    if (!existingSearchTerm.trim()) {
      showNotification('Please enter UMR Number, Mobile, or Patient Name to search.');
      return;
    }
    setIsSearchingExisting(true);
    try {
      const res = await fetch(`/patient/searchPatients?term=${encodeURIComponent(existingSearchTerm.trim())}`);
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          setExistingSearchResults(list);
          showNotification(`✓ Found ${list.length} existing patient record(s) in database.`);
        } else {
          setExistingSearchResults([]);
          showNotification(`No existing records found for "${existingSearchTerm}". Enter details below to register as New Patient.`);
        }
      } else {
        setExistingSearchResults([]);
      }
    } catch (err) {
      console.warn('Search existing error:', err);
      setExistingSearchResults([]);
    } finally {
      setIsSearchingExisting(false);
    }
  };

  // Select an existing patient & auto-populate DetailedView fields query-wise
  const handleSelectExistingPatient = async item => {
    const umr = item.umrNo || item.patientCode;
    try {
      const res = await fetch(`/patient/getPatientDetails?umrNo=${encodeURIComponent(umr)}`);
      let details = item;
      if (res.ok) {
        const full = await res.json();
        if (full && !full.error) details = {
          ...item,
          ...full
        };
      }
      setFormData(prev => ({
        ...prev,
        title: details.title || prev.title,
        patientName: details.pname || details.patientName || '',
        lastName: details.lastName || '',
        gender: details.gender || 'Male',
        dob: details.dob || '',
        years: details.age || '',
        mobile: details.mobNum || details.phone || '',
        address: details.addr || details.address || '',
        village: details.village || '',
        city: details.city || 'Visakhapatnam',
        state: details.state || 'Andhra Pradesh',
        country: details.country || 'India',
        bloodGroup: details.bloodGrp || details.bloodGroup || 'B+',
        category: details.category || details.patientCategory || 'GENERAL - TRI',
        idType: details.idProofType || 'Aadhaar',
        idNumber: details.idProofNum || '',
        parentOrHusband: details.parentName || ''
      }));
      setIsExistingPatientSelected(true);
      setSelectedPatientUmr(umr);
      setExistingSearchResults([]);
      showNotification(`✓ Loaded existing patient ${details.patientName || details.pname} (${umr}) query-wise!`);
    } catch (err) {
      console.warn('Error fetching patient details:', err);
    }
  };
  const handleClearExistingPatient = () => {
    setIsExistingPatientSelected(false);
    setSelectedPatientUmr('');
    setExistingSearchTerm('');
    setExistingSearchResults([]);
    setFormData(prev => ({
      ...prev,
      patientName: '',
      lastName: '',
      dob: '',
      years: '',
      mobile: '',
      village: '',
      address: '',
      idNumber: '',
      parentOrHusband: '',
      healthIssue: '',
      token: ''
    }));
    showNotification('Switched to New Patient Registration mode.');
  };

  // Hospital Change Handler
  const handleHospitalChange = hospitalName => {
    setFormData(prev => ({
      ...prev,
      location: hospitalName
    }));
    clearFieldError('location');
  };

  // Doctor Change Handler (Query-based onchange updates fees, amounts, and slots immediately)
  const handleConsultantChange = val => {
    if (!val || val === '0') {
      setFormData(prev => ({
        ...prev,
        consultant: '',
        doctorCode: '',
        specialization: '',
        token: '',
        consFee: 0,
        consFinalAmt: 0,
        totalAmt: prev.regFinalAmt || 50,
        totalBillAmt: prev.regFinalAmt || 50,
        amtReceived: prev.regFinalAmt || 50,
        paymentAmt: prev.regFinalAmt || 50,
        balance: 0
      }));
      setPayAmount((formData.regFinalAmt || 50).toFixed(2));
      setSelectedSlotToken(null);
      setIsSlotsOpen(false);
      return;
    }
    const doc = CONSULTANTS_ROSTER.find(c => c.name === val || c.doctorDetails === val || c.code === val || String(c.doctorId) === String(val) || val.startsWith(c.name) || c.doctorDetails && val.includes(c.code));
    if (!doc) return;
    const regFee = 50;
    const consFee = Number(doc.fee);
    const discAmt = Number(formData.discAmt || 0);
    const total = regFee + consFee - discAmt;
    setExtraTokensCount(0);

    // Compute slots for newly selected doctor
    const newSlots = generateDoctorSlots(doc.name, formData.appointmentDate, appointments, 0);
    // Find first available green slot
    const firstAvail = newSlots.find(s => !s.isBooked) || newSlots[0];
    const chosenToken = firstAvail ? firstAvail.tokenNumber : 1;
    setSelectedSlotToken(chosenToken);
    setIsSlotsOpen(true);
    setFormData(prev => ({
      ...prev,
      location: prev.location || '',
      consultant: doc.name,
      doctorCode: doc.code,
      specialization: doc.spec,
      consFee: consFee,
      consFinalAmt: consFee,
      regFee: regFee,
      regFinalAmt: regFee,
      totalAmt: total,
      totalBillAmt: total,
      amtReceived: total,
      paymentAmt: total,
      balance: 0,
      token: String(chosenToken),
      status: 'PAID'
    }));
    setPayAmount(total.toFixed(2));
    setPaymentRows([]);
    clearFieldError('consultant');
    clearFieldError('token');
    clearFieldError('location');
    showNotification(`✓ Doctor ${doc.name} selected | Fee: ₹${consFee} | Total: ₹${total}`);
  };

  // Click on a slot pill - user can select ANY token of their choice, turning it to OCCUPIED RED
  const handleSlotClick = slot => {
    const tokenNum = slot.tokenNumber;
    setSelectedSlotToken(tokenNum);
    setFormData(prev => ({
      ...prev,
      token: String(tokenNum)
    }));
    clearFieldError('token');
    showNotification(`✓ Wish Token #${tokenNum} Selected! Marked as OCCUPIED (RED) for Dr. ${formData.consultant}`);
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
    clearFieldError('token');
    showNotification(`✓ Added Extra Emergency Token #${nextTokenNum} for Dr. ${formData.consultant}`);
  };

  // DOB & Age auto-sync matching patientQueue.jsp (lines 6465-6535)
  const handleDobChange = dobStr => {
    if (!dobStr) {
      setFormData(prev => ({
        ...prev,
        dob: '',
        years: '',
        months: 0,
        days: 0
      }));
      return;
    }
    const ageParts = getAgeInYMD(dobStr);
    setFormData(prev => ({
      ...prev,
      dob: dobStr,
      years: ageParts.years,
      months: ageParts.months,
      days: ageParts.days
    }));
    clearFieldError('years');
  };
  const handleAgeChange = (field, val) => {
    clearFieldError('years');
    setFormData(prev => {
      const numVal = val === '' ? '' : parseInt(val, 10);
      const updated = {
        ...prev,
        [field]: numVal
      };
      const y = parseInt(field === 'years' ? numVal : updated.years, 10) || 0;
      const m = parseInt(field === 'months' ? numVal : updated.months, 10) || 0;
      const d = parseInt(field === 'days' ? numVal : updated.days, 10) || 0;
      if (y > 0 || m > 0 || d > 0) {
        const today = new Date();
        const calcDob = new Date(today.getFullYear() - y, today.getMonth() - m, today.getDate() - d);
        updated.dob = formatToYyyyMmDd(calcDob);
      } else if (val === '') {
        updated.dob = '';
      }
      return updated;
    });
  };

  // Handle Edit Patient
  const handleEditPatient = row => {
    setIsEditMode(true);
    setEditingPatient(row);
    const rawName = row.pname || row.patientName || '';
    const parts = rawName.split(' ');
    let title = row.title || 'Mr.';
    let pName = rawName;
    let lName = row.lastName || '';
    if (!row.title && parts.length > 1 && ['Mr', 'Mr.', 'Mrs', 'Mrs.', 'Ms', 'Ms.', 'Baby', 'Master', 'Dr', 'Dr.'].includes(parts[0])) {
      title = parts[0].endsWith('.') ? parts[0] : `${parts[0]}.`;
      pName = parts.slice(1).join(' ');
    }
    setFormData(prev => ({
      ...prev,
      title: title,
      patientName: pName,
      lastName: lName,
      gender: row.gender || (row.genderAge ? row.genderAge.split('/')[0] : 'Male'),
      years: row.age || 40,
      mobile: row.mobNum || row.phone || '',
      consultant: row.consultant || row.docName || 'SATYANARAYANA V VSN',
      category: row.patientCategory || row.category || 'GENERAL - TRI',
      address: row.address || row.addr || '',
      village: row.village || '',
      city: row.city || 'Visakhapatnam',
      token: row.tokenNum || row.token || '',
      regFee: row.regFee != null ? row.regFee : 50,
      regFinalAmt: row.regFee != null ? row.regFee : 50,
      consFee: row.consFee != null ? row.consFee : 1000,
      consFinalAmt: row.consFee != null ? row.consFee : 1000,
      totalBillAmt: row.totAmt != null ? row.totAmt : 1050,
      paymentMode: row.regUpi > 0 || row.conUpi > 0 ? 'UPI' : row.regCredit > 0 || row.conCredit > 0 ? 'Credit' : 'Cash'
    }));
    setActiveTab('add_appointment');
    showNotification(`✏️ Loaded ${row.patientName} (${row.umrNo}) into form for editing.`);
  };

  // Handle Delete Patient
  const handleDeletePatient = async row => {
    if (window.confirm(`Are you sure you want to remove patient ${row.patientName} (${row.umrNo}) from active queue?`)) {
      try {
        await fetch(`/api/patient/delete?umrNo=${encodeURIComponent(row.umrNo)}`, {
          method: 'POST'
        });
        setAppointments(prev => prev.filter(p => p.umrNo !== row.umrNo));
        showNotification(`🗑️ Patient ${row.patientName} (${row.umrNo}) removed from queue.`);
      } catch (err) {
        console.warn('Delete error:', err);
      }
    }
  };

  // Handle Form Submission (Save New or Update Existing Patient - 100% Instant, Zero Freeze!)
  const handleSave = e => {
    if (e) e.preventDefault();

    // =========================================================================
    // MANDATORY FIELD VALIDATION (Exact 1:1 match with backend-spring/New/patientQueue.jsp)
    // Legacy Rules: lines 7936-7975 and lines 10914-11089
    // =========================================================================
    const errors = {};
    const charRegex = /^[^-\s][a-zA-Z .]*$/; // Matches line 8229 in patientQueue.jsp
    const numberRegex = /^[0-9]+$/; // Matches line 8230 in patientQueue.jsp
    const mobNoRegx = /^[6-9]\d{9}$/; // Matches line 8233 in patientQueue.jsp

    // 1. Patient Title: Mandatory (Line 10928: "Select Patient Title")
    if (!formData.title || formData.title === '0' || formData.title.trim() === '') {
      errors.title = "Select Patient Title";
    }

    // 2. Patient Name: Mandatory (Line 7936 & 10940: "Enter Patient Name" / "Enter valid Patient Name")
    const pName = (formData.patientName || '').trim();
    if (!pName) {
      errors.patientName = "Enter Patient Name";
    } else if (!charRegex.test(pName)) {
      errors.patientName = "Enter valid Patient Name";
    }

    // 3. Gender: Mandatory (Line 7944 & 10950: "Select Patient Gender")
    if (!formData.gender || formData.gender === '0' || formData.gender.trim() === '') {
      errors.gender = "Select Patient Gender";
    }

    // 4. Age: Mandatory (Line 7948 & 10960: "Enter Patient Age" / "Enter valid Patient Age")
    const ageVal = formData.years !== '' && formData.years !== null && formData.years !== undefined ? String(formData.years).trim() : '';
    if (ageVal === '') {
      errors.years = "Enter Patient Age";
    } else if (!numberRegex.test(ageVal) || parseInt(ageVal, 10) < 0 || parseInt(ageVal, 10) > 130) {
      errors.years = "Enter valid Patient Age";
    }

    // 5. Mobile Number: Mandatory (Line 7956, 8463, 10977: "Enter Mobile No." / "Enter valid Mobile Number")
    const mobVal = (formData.mobile || '').trim();
    if (!mobVal) {
      errors.mobile = "Enter Mobile No.";
    } else if (!mobNoRegx.test(mobVal)) {
      errors.mobile = "Enter valid Mobile Number";
    }

    // 6. State: Mandatory (Line 7964: "Select State")
    if (!formData.state || formData.state === '0' || formData.state.trim() === '') {
      errors.state = "Select State";
    }

    // 7. City: Mandatory (Line 7968 & 11003: "Select City")
    if (!formData.city || formData.city === '0' || formData.city.trim() === '') {
      errors.city = "Select City";
    }

    // 8. Patient Category: Mandatory (Line 7960 & 11024: "Select Patient Category")
    if (!formData.category || formData.category === '0' || formData.category.trim() === '') {
      errors.category = "Select Patient Category";
    }

    // 9. Hospital Location: Mandatory (Line 11033: "Select Location")
    if (!formData.location || formData.location === '0' || formData.location.trim() === '') {
      errors.location = "Select Location";
    }

    // 10. Consultant Doctor: Mandatory (Line 11037: "Select Consultant")
    if (!formData.consultant || formData.consultant === '0' || formData.consultant.trim() === '') {
      errors.consultant = "Select Consultant";
    }

    // 11. Token: Mandatory (Line 11049: "Select Token")
    const tokenVal = formData.token !== '' && formData.token !== null && formData.token !== undefined ? String(formData.token).trim() : '';
    if (!tokenVal || tokenVal === '0') {
      errors.token = "Select Token";
    }

    // If any validation error exists, halt save, highlight errors & focus first invalid field
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      const firstKey = Object.keys(errors)[0];
      const firstMsg = errors[firstKey];
      showNotification(`⚠️ ${firstMsg}`);
      const elementIdMap = {
        title: 'patientTitle',
        patientName: 'newPatientName',
        gender: 'genderVal',
        years: 'age',
        mobile: 'pntMobNum',
        state: 'state',
        city: 'city',
        category: 'patientCat',
        location: 'idLocation',
        consultant: 'idDoctor',
        token: 'tokenValue'
      };
      const targetEl = document.getElementById(elementIdMap[firstKey]);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        try {
          targetEl.focus();
        } catch (err) {}
      }
      return;
    }
    setFormErrors({});
    const fullName = `${formData.title} ${formData.patientName} ${formData.lastName}`.trim().toUpperCase();

    // -------------------------------------------------------------
    // UPDATE PATIENT (When in Edit Mode)
    // -------------------------------------------------------------
    if (isEditMode && editingPatient) {
      const updatePayload = {
        umrNo: editingPatient.umrNo,
        patientId: editingPatient.patientId,
        patientName: formData.patientName.trim(),
        pname: formData.patientName.trim(),
        lastName: formData.lastName.trim(),
        title: formData.title,
        gender: formData.gender,
        age: formData.years || 40,
        years: formData.years || 40,
        phone: formData.mobile,
        mobile: formData.mobile,
        consultant: formData.consultant,
        doctor: formData.consultant,
        category: formData.category,
        address: formData.address,
        village: formData.village,
        city: formData.city,
        bloodGroup: formData.bloodGroup
      };
      setAppointments(prev => {
        const updated = prev.map(a => {
          if (a.umrNo === editingPatient.umrNo) {
            return {
              ...a,
              patientName: fullName,
              pname: formData.patientName,
              lastName: formData.lastName,
              title: formData.title,
              genderAge: `${formData.gender.toUpperCase()}/${formData.years || 40}yrs`,
              gender: formData.gender,
              age: formData.years || 40,
              phone: formData.mobile,
              consultant: formData.consultant,
              category: formData.category,
              address: formData.address,
              village: formData.village,
              isJustAdded: true
            };
          }
          return a;
        });
        try {
          localStorage.setItem('atri_hims_saved_appointments', JSON.stringify(updated));
        } catch (err) {}
        return updated;
      });
      showNotification(`✓ Patient ${fullName} (${editingPatient.umrNo}) updated successfully!`);
      setIsEditMode(false);
      setEditingPatient(null);
      setActiveTab('appointments');

      // Async background server sync
      fetch('/api/patient/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      }).catch(err => console.warn('Background update warning:', err));
      return;
    }

    // -------------------------------------------------------------
    // REGISTER NEW PATIENT (INSTANT 0ms SAVE - IMMEDIATE LIST DISPLAY!)
    // -------------------------------------------------------------
    // Calculate breakdown from paymentRows (#payModeTable) or active row
    let finalRegCash = 0,
      finalRegCard = 0,
      finalRegUpi = 0;
    let finalConCash = 0,
      finalConCard = 0,
      finalConUpi = 0;
    let paymentModeStr = 'Cash';
    if (paymentRows.length > 0) {
      paymentModeStr = paymentRows.map(r => r.modeLabel).join(', ');
      const totalPaid = paymentRows.reduce((s, r) => s + r.amount, 0);
      const regRatio = totalPaid > 0 ? Math.min(1, (formData.regFinalAmt || 50) / totalPaid) : 0;
      paymentRows.forEach(r => {
        const regPart = r.amount * regRatio;
        const conPart = r.amount - regPart;
        if (r.modeId === '275') {
          finalRegCash += regPart;
          finalConCash += conPart;
        } else if (r.modeId === '276') {
          finalRegCard += regPart;
          finalConCard += conPart;
        } else if (r.modeId === '277') {
          finalRegUpi += regPart;
          finalConUpi += conPart;
        }
      });
    } else {
      const singleAmt = parseFloat(payAmount) || formData.totalBillAmt || 1050;
      if (payMode === '276') {
        paymentModeStr = 'CARD';
        finalRegCard = formData.regFinalAmt || 50;
        finalConCard = formData.consFinalAmt || singleAmt - finalRegCard;
      } else if (payMode === '277') {
        paymentModeStr = 'UPI';
        finalRegUpi = formData.regFinalAmt || 50;
        finalConUpi = formData.consFinalAmt || singleAmt - finalRegUpi;
      } else {
        paymentModeStr = 'Cash';
        finalRegCash = formData.regFinalAmt || 50;
        finalConCash = formData.consFinalAmt || singleAmt - finalRegCash;
      }
    }
    const savedTokenStr = String(formData.token || '1');
    const localUmrNo = `UMR${335273 + appointments.length + 1}`;
    const regPayload = {
      patientName: formData.patientName.trim(),
      pname: formData.patientName.trim(),
      lastName: formData.lastName.trim(),
      title: formData.title,
      gender: formData.gender,
      age: formData.years || 40,
      years: formData.years || 40,
      phone: formData.mobile,
      mobile: formData.mobile,
      consultant: formData.consultant,
      doctor: formData.consultant,
      docName: formData.consultant,
      token: savedTokenStr,
      tokenNum: savedTokenStr,
      appointmentDate: formData.appointmentDate || getTodayDateFormatted(),
      visitDate: formData.appointmentDate || getTodayDateFormatted(),
      location: formData.location || 'INDUS HEALTH CITY',
      state: formData.state || 'Andhra Pradesh',
      city: formData.city || 'Visakhapatnam',
      village: formData.village || '',
      address: formData.address || '',
      country: formData.country || 'India',
      category: formData.category || 'GENERAL - TRI',
      pntCat: formData.category || 'GENERAL - TRI',
      patientCategory: formData.category || 'GENERAL - TRI',
      organization: formData.organization || '--Select Organization--',
      organizationsId: formData.organization || '--Select Organization--',
      walkIn: formData.walkIn || 'Walk In',
      refType: formData.walkIn || 'Walk In',
      occupation: formData.occupation || '--Select Occupation--',
      idProofType: formData.idType || 'Aadhaar',
      idProofNum: formData.idNumber || '',
      careBy: formData.careBy || 'Self',
      parentOrHusband: formData.parentOrHusband || '',
      religion: formData.religion || 'Hindu',
      maritalStatus: formData.maritalStatus || 'Married',
      bloodGroup: formData.bloodGroup || 'B+',
      healthIssue: formData.healthIssue || '',
      paymentMode: paymentModeStr,
      regFee: formData.regFinalAmt || 50,
      consFee: formData.consFinalAmt || 1000,
      totalAmount: formData.totalBillAmt || 1050,
      totAmt: formData.totalBillAmt || 1050,
      amtReceived: formData.amtReceived || finalRegCash + finalRegCard + finalRegUpi + finalConCash + finalConCard + finalConUpi,
      amtRecd: formData.amtReceived || finalRegCash + finalRegCard + finalRegUpi + finalConCash + finalConCard + finalConUpi,
      regCash: finalRegCash,
      regCard: finalRegCard,
      regAmoCard: finalRegCard,
      regUpi: finalRegUpi,
      regAmoUpi: finalRegUpi,
      conCash: finalConCash,
      conCard: finalConCard,
      conAmoCard: finalConCard,
      conUpi: finalConUpi,
      conAmoUpi: finalConUpi
    };
    const newAppointmentRecord = {
      umrNo: localUmrNo,
      token: savedTokenStr,
      tokenNum: savedTokenStr,
      patientName: fullName,
      pname: formData.patientName.trim(),
      lastName: formData.lastName.trim(),
      genderAge: `${formData.gender.toUpperCase()}/${formData.years || 40}yrs`,
      gender: formData.gender,
      age: formData.years || 40,
      appointmentDate: formData.appointmentDate || getTodayDateFormatted(),
      apptDt: formData.appointmentDate || getTodayDateFormatted(),
      consultant: formData.consultant,
      doctor: formData.consultant,
      docName: formData.consultant,
      location: formData.location || 'INDUS HEALTH CITY',
      state: formData.state || 'Andhra Pradesh',
      city: formData.city || 'Visakhapatnam',
      category: formData.category || 'GENERAL - TRI',
      billStatus: formData.balance <= 0 ? 'PAID' : 'PENDING',
      regCash: finalRegCash,
      regCredit: finalRegCard,
      regUpi: finalRegUpi,
      conCash: finalConCash,
      conCredit: finalConCard,
      conUpi: finalConUpi,
      phone: formData.mobile,
      vitals: {
        bp: '120/80',
        pulse: '74',
        spo2: '99%',
        temp: '98.6',
        weight: '65'
      },
      isJustAdded: true
    };

    // 1. Add record to list and local cache IMMEDIATELY (0ms delay!)
    // The booked token will now show RED for this doctor!
    const updatedList = [newAppointmentRecord, ...appointments];
    setAppointments(updatedList);
    try {
      localStorage.setItem('atri_hims_saved_appointments', JSON.stringify(updatedList));
    } catch (err) {}

    // 2. Compute next available GREEN slot for this doctor so saved slot stays RED
    const nextSlots = generateDoctorSlots(formData.consultant, formData.appointmentDate, updatedList, extraTokensCount);
    const nextAvail = nextSlots.find(s => !s.isBooked);
    const nextTokenNum = nextAvail ? nextAvail.tokenNumber : parseInt(savedTokenStr, 10) + 1;
    setSelectedSlotToken(nextTokenNum);

    // 3. Notify parent component
    if (onRegisterSuccess) {
      const matchingDoc = CONSULTANTS_ROSTER.find(c => c.name === formData.consultant);
      onRegisterSuccess({
        patientName: fullName,
        age: formData.years || 40,
        gender: formData.gender,
        phone: formData.mobile,
        bloodGroup: formData.bloodGroup,
        departmentName: matchingDoc ? matchingDoc.spec : 'General Medicine',
        departmentCode: matchingDoc ? matchingDoc.depCode : 'GEN',
        doctor: formData.consultant,
        room: 'OPD Cabin 101',
        priority: 'Regular',
        opId: localUmrNo,
        token: savedTokenStr,
        payment: {
          regFee: formData.regFinalAmt,
          consultationFee: formData.consFinalAmt,
          totalAmount: formData.totalBillAmt,
          paymentMethod: paymentModeStr,
          paymentStatus: formData.balance <= 0 ? 'Paid' : 'Pending',
          transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`
        }
      });
    }

    // 4. Immediately switch to Tab 1 (Patients List)
    setActiveTab('appointments');
    showNotification(`✓ Patient ${fullName} (Token #${savedTokenStr}) successfully registered (${localUmrNo})! Record displayed in list.`);

    // 5. Reset form fields for next patient while advancing token
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
      token: String(nextTokenNum)
    }));
    setPaymentRows([]);
    setPayAmount((formData.totalBillAmt || 1050).toFixed(2));

    // 6. Asynchronously persist to backend in background without freezing the UI
    fetch('/api/patient/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(regPayload)
    }).then(r => r.ok ? r.json() : null).then(resJson => {
      if (resJson && resJson.umrNo && resJson.umrNo !== localUmrNo) {
        setAppointments(prev => {
          const updated = prev.map(a => a.umrNo === localUmrNo ? {
            ...a,
            umrNo: resJson.umrNo,
            token: resJson.tokenNum || a.token
          } : a);
          try {
            localStorage.setItem('atri_hims_saved_appointments', JSON.stringify(updated));
          } catch (err) {}
          return updated;
        });
      }
      fetchServerQueue();
    }).catch(err => console.warn('Background register warning:', err));
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

  // Filtered appointments (by searchTerm and dateFilterRange matching patientQueue.jsp)
  const filteredAppointments = appointments.filter(row => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesSearch = row.umrNo && row.umrNo.toLowerCase().includes(term) || row.patientName && row.patientName.toLowerCase().includes(term) || row.consultant && row.consultant.toLowerCase().includes(term) || row.phone && row.phone.includes(term);
      if (!matchesSearch) return false;
    }
    // Always show newly registered or edited records
    if (row.isJustAdded) return true;
    if (dateFilterRange && dateFilterRange.start && dateFilterRange.end) {
      const dateVal = row.appointmentDate || row.apptDt || row.visitDate || row.scheduleDt || row.regDt;
      const rowDate = parseAnyDate(dateVal);
      if (!rowDate) return true;
      const startCheck = new Date(dateFilterRange.start);
      startCheck.setHours(0, 0, 0, 0);
      const endCheck = new Date(dateFilterRange.end);
      endCheck.setHours(23, 59, 59, 999);
      if (rowDate < startCheck || rowDate > endCheck) {
        return false;
      }
    }
    return true;
  });

  // Calculate Summary Metrics Bar (Strictly computed from filtered date range)
  const totalPatients = filteredAppointments.length;
  const regCashTotal = filteredAppointments.reduce((sum, a) => sum + (a.regCash || 0), 0);
  const regCardTotal = filteredAppointments.reduce((sum, a) => sum + (a.regCredit || 0), 0);
  const regUpiTotal = filteredAppointments.reduce((sum, a) => sum + (a.regUpi || 0), 0);
  const consCashTotal = filteredAppointments.reduce((sum, a) => sum + (a.conCash || 0), 0);
  const consCardTotal = filteredAppointments.reduce((sum, a) => sum + (a.conCredit || 0), 0);
  const consUpiTotal = filteredAppointments.reduce((sum, a) => sum + (a.conUpi || 0), 0);
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
    onClick: () => {
      fetchServerQueue();
      showNotification("🔄 Data refreshed from database.");
    },
    title: "Refresh Appointments"
  }, "\uD83D\uDD04"), /*#__PURE__*/React.createElement("button", {
    className: "reg-icon-btn save",
    onClick: handleSave,
    disabled: isSaving,
    style: {
      opacity: isSaving ? 0.6 : 1,
      cursor: isSaving ? 'not-allowed' : 'pointer'
    },
    title: isSaving ? "Saving..." : "Save Record"
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
  }, "INDUS CLINIC & DIAGNOSTICS"))), /*#__PURE__*/React.createElement(CustomDateRangePicker, {
    value: dateRange,
    onChange: setDateRange,
    onRangeApply: (start, end) => {
      setDateFilterRange(start && end ? {
        start,
        end
      } : null);
      if (start && end) {
        showNotification(`✓ Filtered appointments: ${formatToDdMmmYyyy(start)} to ${formatToDdMmmYyyy(end)}`);
      } else {
        showNotification(`✓ Showing all appointments`);
      }
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginLeft: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      padding: '6px 14px',
      fontSize: '12px',
      fontWeight: 700,
      borderRadius: '6px',
      height: '34px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      background: dateFilterRange && dateFilterRange.start && dateFilterRange.end && formatToDdMmmYyyy(dateFilterRange.start) === formatToDdMmmYyyy(new Date()) && formatToDdMmmYyyy(dateFilterRange.end) === formatToDdMmmYyyy(new Date()) ? 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)' : '#dbeafe',
      color: dateFilterRange && dateFilterRange.start && dateFilterRange.end && formatToDdMmmYyyy(dateFilterRange.start) === formatToDdMmmYyyy(new Date()) && formatToDdMmmYyyy(dateFilterRange.end) === formatToDdMmmYyyy(new Date()) ? '#ffffff' : '#0369a1',
      border: '1px solid #93c5fd',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.15s ease'
    },
    onClick: () => {
      const today = new Date();
      setDateRange(getTodayDateRangeFormatted());
      setDateFilterRange({
        start: today,
        end: today
      });
      showNotification("📅 Filtered: Showing Today's appointments");
    },
    title: "Show only Today's patient records"
  }, "\uD83D\uDCC5 Today"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      padding: '6px 14px',
      fontSize: '12px',
      fontWeight: 700,
      borderRadius: '6px',
      height: '34px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      background: !dateFilterRange ? 'linear-gradient(180deg, #0284c7 0%, #0369a1 100%)' : '#e2e8f0',
      color: !dateFilterRange ? '#ffffff' : '#334155',
      border: '1px solid #cbd5e1',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.15s ease'
    },
    onClick: () => {
      setDateRange("All Appointments");
      setDateFilterRange(null);
      showNotification("🌐 Showing all appointment records");
    },
    title: "Show all records without date filtering"
  }, "\uD83C\uDF10 Show All"))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Token No \u21C5"), /*#__PURE__*/React.createElement("th", null, "UMR No \u21C5"), /*#__PURE__*/React.createElement("th", null, "PatientName \u21C5"), /*#__PURE__*/React.createElement("th", null, "Gender/Age \u21C5"), /*#__PURE__*/React.createElement("th", null, "Appointment Date \u21C5"), /*#__PURE__*/React.createElement("th", null, "Consultant \u21C5"), /*#__PURE__*/React.createElement("th", null, "Category \u21C5"), /*#__PURE__*/React.createElement("th", null, "Bill Status \u21C5"), /*#__PURE__*/React.createElement("th", null, "Vitals \u21C5"), /*#__PURE__*/React.createElement("th", null, "Vitals Print \u21C5"), /*#__PURE__*/React.createElement("th", null, "RegistrationFeePrint \u21C5"), /*#__PURE__*/React.createElement("th", null, "ConsultationFeePrint \u21C5"), /*#__PURE__*/React.createElement("th", null, "Ip Registration \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Cash \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Credit \u21C5"), /*#__PURE__*/React.createElement("th", null, "Reg.Upi \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Cash \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Credit \u21C5"), /*#__PURE__*/React.createElement("th", null, "Con.Upi \u21C5"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filteredAppointments.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 20,
    style: {
      textAlign: 'center',
      padding: '48px 20px',
      color: '#64748b',
      background: '#f8fafc'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '32px'
    }
  }, "\uD83D\uDCCB"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#1e293b'
    }
  }, searchTerm ? 'No matching patient records found' : 'No patient records found in queue'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: '#64748b'
    }
  }, searchTerm ? 'Try adjusting your search criteria.' : 'Click the "Add Appointment" tab above to register a new patient into the database.')))) : filteredAppointments.slice(0, entriesPerPage).map((row, idx) => /*#__PURE__*/React.createElement("tr", {
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
    className: "cell-action-icon",
    style: {
      display: 'flex',
      gap: '6px',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-icon orange-edit",
    onClick: () => handleEditPatient(row),
    title: "Edit / Update Patient Record",
    style: {
      cursor: 'pointer'
    }
  }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
    className: "btn-icon red-delete",
    onClick: () => handleDeletePatient(row),
    title: "Delete Patient Record",
    style: {
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontSize: '15px'
    }
  }, "\uD83D\uDDD1\uFE0F")))))))), activeTab === 'add_appointment' && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    className: "add-appointment-form"
  }, isEditMode && editingPatient && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fef3c7',
      border: '2px solid #f59e0b',
      borderRadius: '8px',
      padding: '12px 20px',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 8px rgba(245,158,11,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px'
    }
  }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#b45309',
      fontSize: '15px'
    }
  }, "UPDATE PATIENT RECORD:"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: '8px',
      color: '#78350f',
      fontWeight: '500'
    }
  }, "Editing ", /*#__PURE__*/React.createElement("strong", null, editingPatient.patientName), " | UMR: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#1e40af'
    }
  }, editingPatient.umrNo), " | Token: ", /*#__PURE__*/React.createElement("strong", null, editingPatient.tokenNum || editingPatient.token)))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      setIsEditMode(false);
      setEditingPatient(null);
      setFormData(prev => ({
        ...prev,
        patientName: '',
        lastName: '',
        dob: '',
        years: '',
        months: 0,
        days: 0,
        mobile: '',
        village: '',
        address: '',
        idNumber: '',
        parentOrHusband: '',
        healthIssue: '',
        appointmentDate: getTodayDateFormatted(),
        token: ''
      }));
      showNotification("Switched back to New Patient Registration mode.");
    },
    style: {
      background: '#fee2e2',
      border: '1px solid #ef4444',
      color: '#b91c1c',
      padding: '6px 14px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px'
    }
  }, "\u2715 Cancel Edit")), /*#__PURE__*/React.createElement("div", {
    className: "form-section-card existing-patient-search-card",
    style: {
      background: '#f0f9ff',
      border: '1.5px solid #0284c7',
      borderRadius: '8px',
      padding: '12px 18px',
      marginBottom: '15px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '18px'
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      color: '#0369a1',
      fontSize: '15px',
      fontWeight: 'bold'
    }
  }, "SEARCH EXISTING PATIENT (Database Query by UMR / Phone / Name):")), isExistingPatientSelected && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleClearExistingPatient,
    style: {
      background: '#dbeafe',
      color: '#1e40af',
      border: '1px solid #93c5fd',
      borderRadius: '5px',
      padding: '4px 10px',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }
  }, "Clear / New Patient Mode")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSearchExisting,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: existingSearchTerm,
    onChange: e => setExistingSearchTerm(e.target.value),
    placeholder: "Enter UMR Number (e.g. UMR334254), Mobile, or Patient Name to query database...",
    style: {
      flex: 1,
      padding: '7px 12px',
      border: '1px solid #38bdf8',
      borderRadius: '6px',
      fontSize: '13px',
      outline: 'none',
      background: '#ffffff'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSearchingExisting,
    style: {
      background: '#0284c7',
      color: '#ffffff',
      border: 'none',
      borderRadius: '6px',
      padding: '7px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      cursor: 'pointer'
    }
  }, isSearchingExisting ? 'Searching...' : 'Search Database')), existingSearchResults.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      background: '#ffffff',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      maxHeight: '180px',
      overflowY: 'auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 12px',
      background: '#f8fafc',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#64748b',
      borderBottom: '1px solid #e2e8f0'
    }
  }, "Found ", existingSearchResults.length, " patient record(s) in database (Click to select & populate form):"), existingSearchResults.map((pat, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    onClick: () => handleSelectExistingPatient(pat),
    style: {
      padding: '8px 12px',
      borderBottom: '1px solid #f1f5f9',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '13px'
    },
    onMouseEnter: e => e.currentTarget.style.background = '#e0f2fe',
    onMouseLeave: e => e.currentTarget.style.background = '#ffffff'
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#0369a1'
    }
  }, pat.umrNo || pat.patientCode), " - ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: '600'
    }
  }, pat.patientName || pat.pname), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#64748b',
      marginLeft: '10px',
      fontSize: '12px'
    }
  }, "(", pat.gender || 'MALE', " / ", pat.age || '-', " yrs)")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#0f766e',
      fontSize: '12px',
      fontWeight: '500'
    }
  }, "\uD83D\uDCDE ", pat.mobNum || pat.phone || 'No phone')))), isExistingPatientSelected && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '8px',
      fontSize: '12px',
      color: '#0369a1',
      fontWeight: '600'
    }
  }, "\u2713 Active Patient: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1e40af'
    }
  }, formData.title, " ", formData.patientName, " ", formData.lastName), " (UMR: ", selectedPatientUmr, ") loaded query-wise from database.")), /*#__PURE__*/React.createElement("div", {
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
  }, "Title ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    id: "patientTitle",
    value: formData.title,
    onChange: e => {
      setFormData({
        ...formData,
        title: e.target.value
      });
      clearFieldError('title');
    },
    className: `dense-select equal-input ${formErrors.title ? 'input-has-error' : ''}`
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
  }, "Dr.")), /*#__PURE__*/React.createElement("small", {
    id: "patientTitleText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.title ? 'block' : 'none'
    }
  }, formErrors.title)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "New Patient Name ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "newPatientName",
    value: formData.patientName,
    onChange: e => {
      const val = e.target.value.replace(/[^A-Za-z\s.]/g, '');
      setFormData({
        ...formData,
        patientName: val
      });
      clearFieldError('patientName');
    },
    placeholder: "Enter First Name *",
    className: `dense-input equal-input required-input ${formErrors.patientName ? 'input-has-error' : ''}`,
    required: true
  }), /*#__PURE__*/React.createElement("small", {
    id: "newPatientNameText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.patientName ? 'block' : 'none'
    }
  }, formErrors.patientName)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Last Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "lastName",
    value: formData.lastName,
    onChange: e => {
      const val = e.target.value.replace(/[^A-Za-z\s.]/g, '');
      setFormData({
        ...formData,
        lastName: val
      });
    },
    placeholder: "Last Name",
    className: "dense-input equal-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Gender ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    id: "genderVal",
    value: formData.gender,
    onChange: e => {
      setFormData({
        ...formData,
        gender: e.target.value
      });
      clearFieldError('gender');
    },
    className: `dense-select equal-input ${formErrors.gender ? 'input-has-error' : ''}`
  }, /*#__PURE__*/React.createElement("option", {
    value: "Male"
  }, "Male"), /*#__PURE__*/React.createElement("option", {
    value: "Female"
  }, "Female"), /*#__PURE__*/React.createElement("option", {
    value: "Other"
  }, "Other")), /*#__PURE__*/React.createElement("small", {
    id: "patientGenderText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.gender ? 'block' : 'none'
    }
  }, formErrors.gender)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Date of Birth"), /*#__PURE__*/React.createElement(CustomDatePicker, {
    id: "pntDob",
    value: formData.dob,
    onChange: handleDobChange,
    format: "yyyy-mm-dd",
    placeholder: "YYYY-MM-DD",
    showYearSelect: true,
    className: "dense-input equal-input",
    disableFuture: true,
    alignRight: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Age (Y / M / D) ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "age-multi-input-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "age",
    value: formData.years,
    onChange: e => handleAgeChange('years', e.target.value),
    placeholder: "Y",
    className: `dense-input age-val ${formErrors.years ? 'input-has-error' : ''}`,
    min: "0",
    max: "130"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "Y")), /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "ageMonths",
    value: formData.months,
    onChange: e => handleAgeChange('months', e.target.value),
    placeholder: "M",
    className: "dense-input age-val",
    min: "0",
    max: "11"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "M")), /*#__PURE__*/React.createElement("div", {
    className: "mini-age-wrap"
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    id: "ageDays",
    value: formData.days,
    onChange: e => handleAgeChange('days', e.target.value),
    placeholder: "D",
    className: "dense-input age-val",
    min: "0",
    max: "31"
  }), /*#__PURE__*/React.createElement("span", {
    className: "age-unit"
  }, "D"))), /*#__PURE__*/React.createElement("small", {
    id: "ageText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.years ? 'block' : 'none'
    }
  }, formErrors.years)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Mobile Number ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "phone-prefix-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flag-prefix"
  }, "\uD83C\uDDEE\uD83C\uDDF3 +91"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    id: "pntMobNum",
    value: formData.mobile,
    onChange: e => {
      const val = e.target.value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        mobile: val
      });
      clearFieldError('mobile');
    },
    placeholder: "10-digit mobile",
    className: `dense-input equal-input with-prefix ${formErrors.mobile ? 'input-has-error' : ''}`,
    maxLength: 10
  })), /*#__PURE__*/React.createElement("small", {
    id: "pntMobNumText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.mobile ? 'block' : 'none'
    }
  }, formErrors.mobile)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "State ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    id: "state",
    value: formData.state,
    onChange: e => {
      setFormData({
        ...formData,
        state: e.target.value
      });
      clearFieldError('state');
    },
    className: `dense-select equal-input ${formErrors.state ? 'input-has-error' : ''}`
  }, MASTER_STATES.map(st => /*#__PURE__*/React.createElement("option", {
    key: st,
    value: st
  }, st))), /*#__PURE__*/React.createElement("small", {
    id: "stateText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.state ? 'block' : 'none'
    }
  }, formErrors.state)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "City ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    id: "city",
    value: formData.city,
    onChange: e => {
      setFormData({
        ...formData,
        city: e.target.value
      });
      clearFieldError('city');
    },
    className: `dense-select equal-input ${formErrors.city ? 'input-has-error' : ''}`
  }, MASTER_CITIES.map(ct => /*#__PURE__*/React.createElement("option", {
    key: ct,
    value: ct
  }, ct))), /*#__PURE__*/React.createElement("small", {
    id: "cityText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.city ? 'block' : 'none'
    }
  }, formErrors.city)), /*#__PURE__*/React.createElement("div", {
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
    id: "refType",
    value: formData.walkIn,
    onChange: e => setFormData({
      ...formData,
      walkIn: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_REF_TYPES.map(rf => /*#__PURE__*/React.createElement("option", {
    key: rf,
    value: rf
  }, rf)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Organization"), /*#__PURE__*/React.createElement("select", {
    id: "organizationsId",
    value: formData.organization,
    onChange: e => setFormData({
      ...formData,
      organization: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_ORGANIZATIONS.map(org => /*#__PURE__*/React.createElement("option", {
    key: org,
    value: org
  }, org)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Billing Category ", /*#__PURE__*/React.createElement("span", {
    className: "req-star"
  }, "*")), /*#__PURE__*/React.createElement("select", {
    id: "patientCat",
    value: formData.category,
    onChange: e => {
      setFormData({
        ...formData,
        category: e.target.value
      });
      clearFieldError('category');
    },
    className: `dense-select equal-input ${formErrors.category ? 'input-has-error' : ''}`
  }, MASTER_CATEGORIES.map(cat => /*#__PURE__*/React.createElement("option", {
    key: cat,
    value: cat
  }, cat))), /*#__PURE__*/React.createElement("small", {
    id: "patientCatText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.category ? 'block' : 'none'
    }
  }, formErrors.category)), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Occupation"), /*#__PURE__*/React.createElement("select", {
    id: "occupation",
    value: formData.occupation,
    onChange: e => setFormData({
      ...formData,
      occupation: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_OCCUPATIONS.map(occ => /*#__PURE__*/React.createElement("option", {
    key: occ,
    value: occ
  }, occ)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Govt ID Type"), /*#__PURE__*/React.createElement("select", {
    id: "idType",
    value: formData.idType,
    onChange: e => setFormData({
      ...formData,
      idType: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_ID_TYPES.map(idt => /*#__PURE__*/React.createElement("option", {
    key: idt,
    value: idt
  }, idt)))), /*#__PURE__*/React.createElement("div", {
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
    id: "careBy",
    value: formData.careBy,
    onChange: e => setFormData({
      ...formData,
      careBy: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_CARE_BY.map(cb => /*#__PURE__*/React.createElement("option", {
    key: cb,
    value: cb
  }, cb)))), /*#__PURE__*/React.createElement("div", {
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
    id: "pntReligion",
    value: formData.religion,
    onChange: e => setFormData({
      ...formData,
      religion: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_RELIGIONS.map(rel => /*#__PURE__*/React.createElement("option", {
    key: rel,
    value: rel
  }, rel)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Marital Status"), /*#__PURE__*/React.createElement("select", {
    id: "maritalStatusVal",
    value: formData.maritalStatus,
    onChange: e => setFormData({
      ...formData,
      maritalStatus: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_MARITAL_STATUS.map(ms => /*#__PURE__*/React.createElement("option", {
    key: ms,
    value: ms
  }, ms)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group col-span-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "field-lbl"
  }, "Blood Group"), /*#__PURE__*/React.createElement("select", {
    id: "pntBloodGrp",
    value: formData.bloodGroup,
    onChange: e => setFormData({
      ...formData,
      bloodGroup: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_BLOOD_GROUPS.map(bg => /*#__PURE__*/React.createElement("option", {
    key: bg,
    value: bg
  }, bg)))), /*#__PURE__*/React.createElement("div", {
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
    className: "doctor-token-box-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-token-box-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-hospital"
  }, /*#__PURE__*/React.createElement("select", {
    id: "idLocation",
    value: formData.location,
    onChange: e => handleHospitalChange(e.target.value),
    className: `dt-select ${formErrors.location ? 'input-has-error' : ''}`,
    title: "Select Hospital *"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Hospital"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS HEALTH CITY"
  }, "INDUS HEALTH CITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS SUPER SPECIALITY"
  }, "INDUS SUPER SPECIALITY"), /*#__PURE__*/React.createElement("option", {
    value: "INDUS CLINIC & DIAGNOSTICS"
  }, "INDUS CLINIC & DIAGNOSTICS")), /*#__PURE__*/React.createElement("small", {
    id: "idLocationText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.location ? 'block' : 'none'
    }
  }, formErrors.location)), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-date"
  }, /*#__PURE__*/React.createElement(CustomDatePicker, {
    id: "scheduleDt",
    value: formData.appointmentDate,
    onChange: newDate => {
      setFormData(prev => ({
        ...prev,
        appointmentDate: newDate
      }));
      showNotification(`✓ Appointment Date set to: ${newDate}`);
    },
    format: "dd-MMM-yyyy",
    placeholder: "dd-M-yyyy",
    className: "dt-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-token"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "tokenValue",
    name: "apptModel.tokenNum",
    value: formData.token || '',
    onChange: e => {
      const val = e.target.value.replace(/\D/g, '');
      const num = val ? parseInt(val, 10) : null;
      setSelectedSlotToken(num);
      setFormData(prev => ({
        ...prev,
        token: val
      }));
      clearFieldError('token');
    },
    className: `dt-input dt-token-val ${formErrors.token ? 'input-has-error' : ''}`,
    title: "Assigned Token Number - Click any slot pill below to select your wish token *",
    placeholder: "Token *",
    style: formData.token ? {
      backgroundColor: '#fef2f2',
      borderColor: '#dc2626',
      color: '#b91c1c',
      fontWeight: '800'
    } : {}
  }), /*#__PURE__*/React.createElement("small", {
    id: "tokenValueText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.token ? 'block' : 'none'
    }
  }, formErrors.token))), /*#__PURE__*/React.createElement("div", {
    className: "doctor-token-box-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-doctor"
  }, /*#__PURE__*/React.createElement("select", {
    id: "idDoctor",
    value: formData.consultant,
    onChange: e => handleConsultantChange(e.target.value),
    className: `dt-select dt-doctor-select ${formErrors.consultant ? 'input-has-error' : ''}`,
    title: "Select Consultant Doctor *"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select Consultant"), CONSULTANTS_ROSTER.map(doc => /*#__PURE__*/React.createElement("option", {
    key: doc.code,
    value: doc.name
  }, doc.name))), /*#__PURE__*/React.createElement("small", {
    id: "idDoctorText",
    className: "field-error-text",
    style: {
      color: '#A94442',
      display: formErrors.consultant ? 'block' : 'none'
    }
  }, formErrors.consultant)), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-code"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "empCode",
    value: formData.doctorCode || '',
    readOnly: true,
    className: "dt-input dt-readonly",
    title: "Doctor Employee Code",
    placeholder: "Doctor Code"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dt-col dt-col-spec"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "specName",
    value: formData.specialization || '',
    readOnly: true,
    className: "dt-input dt-readonly",
    title: "Doctor Specialization",
    placeholder: "Specialization"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-open-wrapper",
    id: "docSlotsMainDiv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "slots-title-row",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-title",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", null, "Doctor Slots Details:")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '11px',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      color: '#15803d'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '10px',
      height: '10px',
      borderRadius: '2px',
      backgroundColor: '#008000',
      display: 'inline-block'
    }
  }), " Available (Green)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      color: '#b91c1c'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '10px',
      height: '10px',
      borderRadius: '2px',
      backgroundColor: '#dc2626',
      display: 'inline-block'
    }
  }), " Occupied / Selected (Red)"), formData.consultant && /*#__PURE__*/React.createElement("span", {
    className: "slots-open-badge"
  }, "\u25CF Dr. ", formData.consultant.split(' ')[0]))), formData.consultant && currentDoctorSlots && currentDoctorSlots.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-details-container",
    id: "docSlotsDiv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctor-slots-grid",
    id: "docSlots"
  }, currentDoctorSlots.map(slot => {
    const isSelected = selectedSlotToken === slot.tokenNumber || String(formData.token) === String(slot.tokenNumber);
    const isOccupiedRed = slot.isBooked || isSelected;
    return /*#__PURE__*/React.createElement("button", {
      key: slot.tokenNumber,
      type: "button",
      className: `doctor-slot-pill ${isOccupiedRed ? 'slot-red slot-occupied' : 'slot-green'} ${isSelected ? 'slot-selected slot-wish-selected' : ''}`,
      style: isSelected ? {
        backgroundColor: '#dc2626',
        borderColor: '#991b1b',
        color: '#ffffff',
        fontWeight: '800',
        boxShadow: '0 0 12px rgba(220, 38, 38, 0.9), inset 0 0 4px rgba(255, 255, 255, 0.45)',
        transform: 'scale(1.05)',
        outline: '2px solid #fecaca',
        outlineOffset: '1px',
        zIndex: 3
      } : slot.isBooked ? {
        backgroundColor: '#d32f2f',
        borderColor: '#b71c1c',
        color: '#ffffff',
        opacity: 0.95
      } : {
        backgroundColor: '#008000',
        borderColor: '#006400',
        color: '#ffffff'
      },
      onClick: () => handleSlotClick(slot),
      title: isSelected ? `Token #${slot.tokenNumber} (${slot.timeLabel}) - SELECTED WISH TOKEN (OCCUPIED RED)` : slot.isBooked ? `Token #${slot.tokenNumber} (${slot.timeLabel}) - Occupied / Booked (Click to select wish token)` : `Token #${slot.tokenNumber} (${slot.timeLabel}) - Available (Click to select wish token)`
    }, slot.timeLabel, " ", isSelected ? ' 🔴' : '');
  }))), /*#__PURE__*/React.createElement("div", {
    className: "add-extra-tokens-row",
    id: "addExtraTokensDiv"
  }, /*#__PURE__*/React.createElement("span", {
    className: "add-extra-tokens-label"
  }, "Add Extra Tokens:"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-add-extra-token",
    onClick: handleAddExtraToken,
    title: "Add Emergency / Extra Token Slot"
  }, "+"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      textAlign: 'center',
      color: '#64748b',
      fontSize: '13px',
      background: '#ffffff',
      borderRadius: '4px',
      border: '1px dashed #cbd5e1',
      margin: '10px 0'
    }
  }, "Select a Consultant Doctor from the dropdown above to view available token slots.")))), /*#__PURE__*/React.createElement("div", {
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
    className: formData.balance > 0 ? "badge-pending-pill" : "badge-paid-pill",
    style: formData.balance > 0 ? {
      backgroundColor: '#fef3c7',
      color: '#b45309',
      border: '1px solid #fde68a',
      padding: '2px 8px',
      borderRadius: '4px',
      fontWeight: 700
    } : {}
  }, formData.balance > 0 ? 'PENDING' : 'PAID')), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-lbl"
  }, "Authorized By :"), /*#__PURE__*/React.createElement("div", {
    className: "fee-cell-val"
  }, /*#__PURE__*/React.createElement("select", {
    id: "authorizedBy",
    name: "feeModel.authorizedBy",
    value: formData.authorizedBy,
    onChange: e => setFormData({
      ...formData,
      authorizedBy: e.target.value
    }),
    className: "dense-select equal-input"
  }, MASTER_AUTHORIZED.map(auth => /*#__PURE__*/React.createElement("option", {
    key: auth,
    value: auth
  }, auth)))))), /*#__PURE__*/React.createElement("div", {
    className: "legacy-paymode-wrapper"
  }, /*#__PURE__*/React.createElement("table", {
    id: "payModeTable",
    className: "legacy-paymode-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: '18%',
      textAlign: 'center'
    }
  }, "Mode"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: '18%',
      textAlign: 'center'
    }
  }, "Amt"), payMode === '276' && /*#__PURE__*/React.createElement("th", {
    style: {
      width: '14%',
      textAlign: 'center'
    }
  }, "Card Type"), (payMode === '276' || payMode === '277') && /*#__PURE__*/React.createElement("th", {
    style: {
      width: '20%',
      textAlign: 'center'
    }
  }, "Trans Id."), payMode === '276' && /*#__PURE__*/React.createElement("th", {
    style: {
      width: '18%',
      textAlign: 'center'
    }
  }, "Card Bank Name"), payMode === '276' && /*#__PURE__*/React.createElement("th", {
    style: {
      width: '12%',
      textAlign: 'center'
    }
  }, "Expire Dt"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: '30px',
      textAlign: 'center'
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
    id: "creditPt",
    name: "cashPt",
    value: payMode,
    onChange: e => {
      setPayMode(e.target.value);
      setPayModeError('');
    },
    className: "form-control"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "--Select--"), /*#__PURE__*/React.createElement("option", {
    value: "275"
  }, "Cash"), /*#__PURE__*/React.createElement("option", {
    value: "276"
  }, "CARD"), /*#__PURE__*/React.createElement("option", {
    value: "277"
  }, "UPI"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "creditAmount",
    name: "amount",
    value: payAmount,
    onChange: e => {
      setPayAmount(e.target.value);
      setPayModeError('');
    },
    placeholder: "0.00",
    className: "form-control"
  })), payMode === '276' && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
    id: "cardcardType",
    name: "cardType",
    value: cardType,
    onChange: e => setCardType(e.target.value),
    className: "form-control"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "--Select--"), /*#__PURE__*/React.createElement("option", {
    value: "Credit"
  }, "Credit"), /*#__PURE__*/React.createElement("option", {
    value: "Debit"
  }, "Debit"))), (payMode === '276' || payMode === '277') && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "creditNo",
    name: "creditNo",
    value: cardTransNo,
    onChange: e => setCardTransNo(e.target.value),
    placeholder: payMode === '276' ? "Enter Card Number" : "Enter UPI Ref / Trans Id",
    className: "form-control"
  })), payMode === '276' && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
    id: "cardBankName",
    name: "cardBankNames",
    value: cardBankName,
    onChange: e => setCardBankName(e.target.value),
    className: "form-control"
  }, /*#__PURE__*/React.createElement("option", {
    value: "0"
  }, "-select-"), MASTER_BANKS.map(bank => /*#__PURE__*/React.createElement("option", {
    key: bank,
    value: bank
  }, bank)))), payMode === '276' && /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "creditDate",
    name: "expDate",
    value: cardExpDate,
    onChange: e => setCardExpDate(e.target.value),
    placeholder: "MM/YYYY",
    maxLength: 7,
    className: "form-control",
    style: {
      textAlign: 'center'
    }
  })), /*#__PURE__*/React.createElement("td", {
    align: "center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "addPayments",
    className: "btn-add-payment",
    onClick: handleAddPayment,
    title: "Add Payment Mode (+)"
  }, "+"))), payModeError && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: payMode === '276' ? 7 : payMode === '277' ? 4 : 3,
    style: {
      color: '#A94442',
      fontWeight: 700,
      padding: '4px 8px'
    }
  }, payModeError))), paymentRows.length > 0 && /*#__PURE__*/React.createElement("tfoot", {
    id: "paymentsTffotAmm"
  }, paymentRows.map(row => /*#__PURE__*/React.createElement("tr", {
    key: row.id,
    style: {
      backgroundColor: '#f8fafc'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      color: '#0369a1'
    }
  }, row.modeLabel), /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 700,
      textAlign: 'right'
    }
  }, "\u20B9", row.amount.toFixed(2)), payMode === '276' && /*#__PURE__*/React.createElement("td", null, row.cardType || '-'), (payMode === '276' || payMode === '277') && /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '11px'
    }
  }, row.transNo || '-'), payMode === '276' && /*#__PURE__*/React.createElement("td", {
    style: {
      fontSize: '11px'
    }
  }, row.bankName || '-'), payMode === '276' && /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'center'
    }
  }, row.expDate || '-'), /*#__PURE__*/React.createElement("td", {
    align: "center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-del-payment",
    onClick: () => handleDeletePayment(row.id),
    title: "Delete Payment Row"
  }, "\uD83D\uDDD1\uFE0F")))))))))), /*#__PURE__*/React.createElement("div", {
    className: "form-equal-footer-bar"
  }, isEditMode && editingPatient ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-green-save-prominent",
    disabled: isSaving,
    style: {
      background: '#d97706',
      borderColor: '#b45309',
      opacity: isSaving ? 0.7 : 1,
      cursor: isSaving ? 'not-allowed' : 'pointer'
    }
  }, isSaving ? '⏳ Updating...' : `💾 Update Patient Record (${editingPatient.umrNo})`), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-print-token-action",
    disabled: isSaving,
    onClick: () => {
      if (isSaving) return;
      setIsEditMode(false);
      setEditingPatient(null);
      handleSave();
    },
    style: {
      background: '#0284c7',
      borderColor: '#0369a1',
      opacity: isSaving ? 0.7 : 1,
      cursor: isSaving ? 'not-allowed' : 'pointer'
    },
    title: "Save this entry as a new patient with fresh UMR"
  }, "\u2795 Save as New Patient"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-reset-form-action",
    disabled: isSaving,
    onClick: () => {
      setIsEditMode(false);
      setEditingPatient(null);
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
      showNotification("Cancelled edit mode.");
    },
    style: {
      background: '#ef4444',
      color: '#fff',
      borderColor: '#dc2626'
    }
  }, "\u2715 Cancel")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-green-save-prominent",
    disabled: isSaving,
    style: {
      opacity: isSaving ? 0.7 : 1,
      cursor: isSaving ? 'not-allowed' : 'pointer'
    }
  }, isSaving ? '⏳ Saving Patient...' : '💾 Save Appointment'), /*#__PURE__*/React.createElement("button", {
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
  }, "\uD83D\uDD04 Reset Fields")))), printModal && /*#__PURE__*/React.createElement("div", {
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
  }, "\uD83D\uDCBE Save Vitals")))), isSaving && /*#__PURE__*/React.createElement("div", {
    className: "print-modal-overlay",
    style: {
      zIndex: 99999
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#ffffff',
      borderRadius: '16px',
      padding: '36px 40px',
      maxWidth: '440px',
      width: '90%',
      textAlign: 'center',
      boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
      border: '1px solid #e2e8f0',
      animation: 'fadeIn 0.2s ease-out'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '56px',
      height: '56px',
      border: '5px solid #e2e8f0',
      borderTopColor: '#0284c7',
      borderRadius: '50%',
      margin: '0 auto 20px',
      animation: 'spin 0.8s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 10px',
      fontSize: '1.35rem',
      fontWeight: 800,
      color: '#0f172a'
    }
  }, "Saving Patient Registration"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 8px',
      fontSize: '0.95rem',
      color: '#0284c7',
      fontWeight: 600
    }
  }, "Securing Doctor Token & Saving to Database..."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '0.85rem',
      color: '#64748b'
    }
  }, "Please wait a moment while the appointment and billing records are finalized."))));
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

  // Current Screen / View: Persisted in localStorage so refreshing the page stays on current screen
  const [currentView, setCurrentView] = useState(() => {
    try {
      return localStorage.getItem('atri_hims_current_view') || 'home';
    } catch (e) {
      return 'home';
    }
  });

  // Active Tab inside Patient Registration: Always defaults to 'appointments' (Tab 1: List) on refresh!
  const [activeRegTab, setActiveRegTab] = useState('appointments');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showDatabaseView, setShowDatabaseView] = useState(false);
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
  const [records, setRecords] = useState({});
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
    // Note: Do not save add_appointment to localStorage so refresh always shows the appointments list first!
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

    // Already saved directly to database in RegistrationForm.jsx
    showToast(`✓ Registered: ${newRecord.patientName} (${generatedOpId})`);
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
        setCurrentView('patient_management');
        setActiveRegTab('appointments');
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
      setCurrentView('home');
      try {
        localStorage.setItem('atri_hims_current_view', 'home');
      } catch (e) {}
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
  }, "\uD83C\uDFE0"), " Home Dashboard"), /*#__PURE__*/React.createElement("div", {
    className: "top-login-time"
  }, "LogInTime: ", /*#__PURE__*/React.createElement("span", {
    className: "time-val"
  }, loginTime || '2026-10-08 11:26:13')), /*#__PURE__*/React.createElement("button", {
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
  }, showDatabaseView ? /*#__PURE__*/React.createElement("div", {
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