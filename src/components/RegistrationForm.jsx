import React, { useState, useEffect, useMemo } from 'react';

// Baseline patient appointments matching Indus Hospitals Screenshot 1 & 2
const INITIAL_APPOINTMENTS = [
  {
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
    vitals: { bp: '120/80', pulse: '72', spo2: '99%', temp: '98.4', weight: '68' }
  },
  {
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
    vitals: { bp: '120/80', pulse: '74', spo2: '99%', temp: '98.4', weight: '68' }
  },
  {
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
    vitals: { bp: '130/85', pulse: '78', spo2: '98%', temp: '98.6', weight: '72' }
  },
  {
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
    vitals: { bp: '118/76', pulse: '72', spo2: '99%', temp: '98.4', weight: '58' }
  },
  {
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
    vitals: { bp: '124/80', pulse: '76', spo2: '98%', temp: '98.6', weight: '75' }
  },
  {
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
    vitals: { bp: '115/75', pulse: '70', spo2: '99%', temp: '98.2', weight: '64' }
  },
  {
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
    vitals: { bp: '140/90', pulse: '82', spo2: '97%', temp: '98.4', weight: '60' }
  },
  {
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
    vitals: { bp: '122/82', pulse: '75', spo2: '99%', temp: '98.5', weight: '71' }
  },
  {
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
    vitals: { bp: '128/84', pulse: '76', spo2: '98%', temp: '98.6', weight: '80' }
  }
];

const CONSULTANTS_ROSTER = [
  { name: 'SATYANARAYANA V VSN / ', code: 'EMP00006', spec: 'NEUROLOGIST', fee: 1000, depCode: 'NEU' },
  { name: 'R LALITHA LA', code: 'EMP00001', spec: 'SENIOR GENERAL PHYSICIAN / OPD', fee: 800, depCode: 'GEN' },
  { name: 'RAKESH TUMULA RT', code: 'EMP00002', spec: 'ORTHOPEDICS & SPINE SPECIALIST', fee: 1450, depCode: 'ORT' },
  { name: 'ANIL KUMAR MAHAPATRO AKM', code: 'EMP00003', spec: 'CARDIOLOGY & INTERVENTIONAL SPECIALIST', fee: 850, depCode: 'CAR' },
  { name: 'RAMESH NAIDU M RNM', code: 'EMP00004', spec: 'GENERAL MEDICINE & DIABETOLOGY', fee: 600, depCode: 'GEN' },
  { name: 'Dr. Ananya Iyer', code: 'EMP00005', spec: 'CHIEF CARDIOLOGIST', fee: 700, depCode: 'CAR' },
  { name: 'Dr. Sandeep K. Banerjee', code: 'EMP00007', spec: 'CHIEF PHYSICIAN', fee: 600, depCode: 'GEN' },
  { name: 'Dr. Vikramaditya Rathore', code: 'EMP00008', spec: 'CONSULTANT ORTHOPEDIC SURGEON', fee: 750, depCode: 'ORT' },
  { name: 'Dr. Shalini Deshmukh', code: 'EMP00009', spec: 'SENIOR PEDIATRICIAN', fee: 500, depCode: 'PED' },
  { name: 'Dr. Neil Chatterjee', code: 'EMP00010', spec: 'CLINICAL DERMATOLOGIST', fee: 650, depCode: 'DER' }
];

// Helper to format minutes into 12-hour AM/PM string (e.g. 08:30 AM)
function formatSlotTime(totalMins) {
  let h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  let displayH = h % 12;
  if (displayH === 0) displayH = 12;
  const pad = (n) => String(n).padStart(2, '0');
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

export function RegistrationForm({ 
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
  const setActiveTab = (tab) => {
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  // Fetch live queue from backend
  const fetchServerQueue = async () => {
    try {
      const res = await fetch('/api/patient/queue');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setAppointments(data);
        }
      }
    } catch (err) {
      console.warn('Queue fetch warning:', err);
    }
  };

  useEffect(() => {
    fetchServerQueue();
  }, []);

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
        regCash: rec.payment ? (rec.payment.regFee || 50) : 50,
        regCredit: 0,
        regUpi: 0,
        conCash: rec.payment ? (rec.payment.consultationFee || 1000) : 1000,
        conCredit: 0,
        conUpi: 0,
        phone: rec.phone || '',
        vitals: rec.vitals || { bp: '120/80', pulse: '74', spo2: '99%', temp: '98.6', weight: '65' }
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
  const currentDoctorSlots = (React.useMemo || useMemo || ((fn) => fn()))(() => {
    if (!formData.consultant) return [];
    return generateDoctorSlots(
      formData.consultant,
      formData.appointmentDate,
      appointments,
      extraTokensCount
    );
  }, [formData.consultant, formData.appointmentDate, appointments, extraTokensCount]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  // Step 1: Hospital Change Handler
  const handleHospitalChange = (hospitalName) => {
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
  const handleConsultantChange = (name) => {
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
  const handleSlotClick = (slot) => {
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
  const handleDobChange = (dobStr) => {
    if (!dobStr) return;
    const birth = new Date(dobStr);
    const now = new Date('2026-10-08');
    let yrs = now.getFullYear() - birth.getFullYear();
    if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) {
      yrs--;
    }
    setFormData(prev => ({ ...prev, dob: dobStr, years: Math.max(0, yrs) }));
  };

  const handleYearsChange = (yrs) => {
    const y = parseInt(yrs, 10) || 0;
    const bYear = 2026 - y;
    setFormData(prev => ({ ...prev, years: y, dob: `${bYear}-01-01` }));
  };

  // Handle Edit Patient
  const handleEditPatient = (row) => {
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
      paymentMode: (row.regUpi > 0 || row.conUpi > 0) ? 'UPI' : (row.regCredit > 0 || row.conCredit > 0) ? 'Credit' : 'Cash'
    }));

    setActiveTab('add_appointment');
    showNotification(`✏️ Loaded ${row.patientName} (${row.umrNo}) into form for editing.`);
  };

  // Handle Delete Patient
  const handleDeletePatient = async (row) => {
    if (window.confirm(`Are you sure you want to remove patient ${row.patientName} (${row.umrNo}) from active queue?`)) {
      try {
        await fetch(`/api/patient/delete?umrNo=${encodeURIComponent(row.umrNo)}`, { method: 'POST' });
        setAppointments(prev => prev.filter(p => p.umrNo !== row.umrNo));
        showNotification(`🗑️ Patient ${row.patientName} (${row.umrNo}) removed from queue.`);
      } catch (err) {
        console.warn('Delete error:', err);
      }
    }
  };

  // Handle Form Submission (Save New or Update Existing Patient)
  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (!formData.patientName.trim()) {
      alert('Please enter Patient Name.');
      return;
    }

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
        age: formData.years,
        years: formData.years,
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

      try {
        await fetch('/api/patient/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatePayload)
        });
      } catch (err) {
        console.warn('Update API error:', err);
      }

      setAppointments(prev => prev.map(a => {
        if (a.umrNo === editingPatient.umrNo) {
          return {
            ...a,
            patientName: fullName,
            pname: formData.patientName,
            lastName: formData.lastName,
            title: formData.title,
            genderAge: `${formData.gender.toUpperCase()}/${formData.years}yrs`,
            gender: formData.gender,
            age: formData.years,
            phone: formData.mobile,
            consultant: formData.consultant,
            category: formData.category,
            address: formData.address,
            village: formData.village
          };
        }
        return a;
      }));

      showNotification(`✓ Patient ${fullName} (${editingPatient.umrNo}) updated in database!`);
      setIsEditMode(false);
      setEditingPatient(null);
      setActiveTab('appointments');
      fetchServerQueue();
      return;
    }

    // -------------------------------------------------------------
    // REGISTER NEW PATIENT
    // -------------------------------------------------------------
    const regPayload = {
      patientName: formData.patientName.trim(),
      pname: formData.patientName.trim(),
      lastName: formData.lastName.trim(),
      title: formData.title,
      gender: formData.gender,
      age: formData.years,
      years: formData.years,
      phone: formData.mobile,
      mobile: formData.mobile,
      consultant: formData.consultant,
      doctor: formData.consultant,
      category: formData.category,
      paymentMode: formData.paymentMode,
      regFee: formData.regFinalAmt,
      consFee: formData.consFinalAmt,
      totalAmount: formData.totalBillAmt,
      address: formData.address,
      village: formData.village,
      city: formData.city,
      bloodGroup: formData.bloodGroup,
      healthIssue: formData.healthIssue,
      idProofType: formData.idType,
      idProofNum: formData.idNumber,
      parentOrHusband: formData.parentOrHusband
    };

    let newUmrNo = `UMR${334253 + appointments.length + 1}`;
    let tokenStr = formData.token || `OPD-${120 + appointments.length + 1}`;

    try {
      const resp = await fetch('/api/patient/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regPayload)
      });
      if (resp.ok) {
        const resJson = await resp.json();
        if (resJson.umrNo) newUmrNo = resJson.umrNo;
        if (resJson.tokenNum) tokenStr = resJson.tokenNum;
      }
    } catch (err) {
      console.warn('Register API error:', err);
    }

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
      vitals: { bp: '120/80', pulse: '74', spo2: '99%', temp: '98.6', weight: '65' }
    };

    // Add to local list at top
    setAppointments(prev => [newAppointmentRecord, ...prev]);

    // Parent callback
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

    // Switch to Tab 1
    setActiveTab('appointments');
    showNotification(`✓ Patient ${fullName} successfully registered (${newUmrNo}). Saved to database.`);

    // Reset form
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

    fetchServerQueue();
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
    link.setAttribute("download", `Indus_Hospitals_Appointments_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification("📥 Appointments list exported to Excel (CSV).");
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(row => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      row.umrNo.toLowerCase().includes(term) ||
      row.patientName.toLowerCase().includes(term) ||
      row.consultant.toLowerCase().includes(term) ||
      (row.phone && row.phone.includes(term))
    );
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

  return (
    <div className="patient-reg-page">
      {/* Toast Alert */}
      {toast && (
        <div className="patient-reg-toast">
          <span>{toast}</span>
          <button onClick={() => setToast(null)}>✕</button>
        </div>
      )}

      {/* Top Breadcrumb & User Info Header */}
      <div className="patient-reg-top-bar">
        <div className="reg-center-title">
          <h1>Patient Registration</h1>
        </div>
        <div className="reg-top-right">
          <span className="reg-breadcrumb">
            <span style={{ color: '#dc2626' }}>⌂ Home</span> &gt; Patient Management &gt; Patient Queue
          </span>
          <div className="reg-top-icons">
            <button 
              className="reg-icon-btn refresh" 
              onClick={() => {
                fetchServerQueue();
                showNotification("🔄 Data refreshed from database.");
              }} 
              title="Refresh Appointments"
            >
              🔄
            </button>
            <button 
              className="reg-icon-btn save" 
              onClick={handleSave} 
              title="Save Record"
            >
              💾
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar (Exact Screenshot 1 & 2 Tabs) */}
      <div className="reg-tabs-header">
        <div className="reg-tab-buttons">
          <button 
            type="button"
            className={`reg-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </button>
          <button 
            type="button"
            className={`reg-tab-btn ${activeTab === 'add_appointment' ? 'active' : ''}`}
            onClick={() => setActiveTab('add_appointment')}
          >
            Add Appointment
          </button>
        </div>
        <div className="reg-tab-right-help">
          <span className="reg-help-link">
            <span className="green-circle-help">?</span> Help
          </span>
          <span className="reg-mgmt-link">
            👤 Patient Management
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: APPOINTMENTS (Matching Screenshot 1 Precisely) */}
      {/* ========================================================================= */}
      {activeTab === 'appointments' && (
        <div className="appointments-tab-pane">
          {/* Top Organization & Hospital Filter Row */}
          <div className="reg-org-filter-row">
            <div className="reg-company-box">
              <input 
                type="text" 
                defaultValue="Vasugan Medical Specialities Pvt Ltd" 
                readOnly 
                className="reg-company-input"
              />
            </div>

            <div className="reg-hospital-select-box">
              <select 
                value={selectedHospital} 
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="reg-hospital-select"
              >
                <option value="INDUS HEALTH CITY">INDUS HEALTH CITY</option>
                <option value="INDUS SUPER SPECIALITY">INDUS SUPER SPECIALITY</option>
                <option value="INDUS CLINIC & DIAGNOSTICS">INDUS CLINIC & DIAGNOSTICS</option>
              </select>
            </div>

            <div className="reg-date-range-box">
              <span className="cal-icon">📅</span>
              <input 
                type="text" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="reg-date-input"
              />
            </div>
          </div>

          {/* Light Blue Summary Metrics Pill Bar (Matching Screenshot 1) */}
          <div className="reg-summary-pill-bar">
            <div className="metric-chip">
              <span className="lbl">Total Patients:</span>
              <span className="val blue">{totalPatients}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg Cash:</span>
              <span className="val blue">{regCashTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg Card:</span>
              <span className="val blue">{regCardTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Reg UPI:</span>
              <span className="val blue">{regUpiTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Cash:</span>
              <span className="val blue">{consCashTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Card:</span>
              <span className="val blue">{consCardTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Cons Upi:</span>
              <span className="val blue">{consUpiTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Paid Amt:</span>
              <span className="val blue">{paidAmtTotal.toFixed(2)}</span>
            </div>
            <div className="metric-chip">
              <span className="lbl">Refund Amt:</span>
              <span className="val blue">0.00</span>
            </div>
          </div>

          {/* Table Controls (Show Entries, Excel, PDF, Search) */}
          <div className="reg-table-controls">
            <div className="table-left-tools">
              <div className="entries-dropdown-wrap">
                <span>Show</span>
                <select 
                  value={entriesPerPage} 
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="entries-select"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>
              <button className="export-btn" onClick={handleExportExcel} title="Export to Excel / CSV">
                Excel
              </button>
              <button className="export-btn" onClick={() => window.print()} title="Print Table to PDF">
                PDF
              </button>
            </div>

            <div className="table-search-wrap">
              <label>Search:</label>
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search UMR, Patient, Doctor..."
                className="table-search-input"
              />
            </div>
          </div>

          {/* Appointments Clinical Data Table */}
          <div className="reg-table-container">
            <table className="reg-appointments-table">
              <thead>
                <tr>
                  <th>Token No ⇅</th>
                  <th>UMR No ⇅</th>
                  <th>PatientName ⇅</th>
                  <th>Gender/Age ⇅</th>
                  <th>Appointment Date ⇅</th>
                  <th>Consultant ⇅</th>
                  <th>Category ⇅</th>
                  <th>Bill Status ⇅</th>
                  <th>Vitals ⇅</th>
                  <th>Vitals Print ⇅</th>
                  <th>RegistrationFeePrint ⇅</th>
                  <th>ConsultationFeePrint ⇅</th>
                  <th>Ip Registration ⇅</th>
                  <th>Reg.Cash ⇅</th>
                  <th>Reg.Credit ⇅</th>
                  <th>Reg.Upi ⇅</th>
                  <th>Con.Cash ⇅</th>
                  <th>Con.Credit ⇅</th>
                  <th>Con.Upi ⇅</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.slice(0, entriesPerPage).map((row, idx) => (
                  <tr key={row.umrNo || idx} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td className="cell-token">
                      <span className="badge-token" title={`Token Number: ${row.token || '1'}`}>
                        🎫 {row.token || '1'}
                      </span>
                    </td>
                    <td className="cell-umr"><strong>{row.umrNo}</strong></td>
                    <td className="cell-name">{row.patientName}</td>
                    <td className="cell-gender-age">{row.genderAge}</td>
                    <td className="cell-date">{row.appointmentDate}</td>
                    <td className="cell-consultant">{row.consultant}</td>
                    <td className="cell-category">{row.category}</td>
                    <td className="cell-status">
                      <span className="badge-paid">PAID</span>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon heart" 
                        onClick={() => setVitalsDrawer(row)}
                        title="Record / View Vitals"
                      >
                        ❤️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'vitals', record: row })}
                        title="Print Vitals Slip"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'reg', record: row })}
                        title="Print Registration Receipt"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon print" 
                        onClick={() => setPrintModal({ type: 'cons', record: row })}
                        title="Print Consultation Bill"
                      >
                        🖨️
                      </button>
                    </td>
                    <td className="cell-action-icon">
                      <button 
                        className="btn-icon ip" 
                        onClick={() => showNotification(`IP Registration initiated for ${row.patientName} (${row.umrNo})`)}
                        title="IP Admission / Registration"
                      >
                        👍
                      </button>
                    </td>
                    <td>{row.regCash}</td>
                    <td>{row.regCredit}</td>
                    <td>{row.regUpi}</td>
                    <td><strong>{row.conCash}</strong></td>
                    <td>{row.conCredit}</td>
                    <td>{row.conUpi}</td>
                    <td className="cell-action-icon" style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button 
                        className="btn-icon orange-edit" 
                        onClick={() => handleEditPatient(row)}
                        title="Edit / Update Patient Record"
                        style={{ cursor: 'pointer' }}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon red-delete" 
                        onClick={() => handleDeletePatient(row)}
                        title="Delete Patient Record"
                        style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '15px' }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ADD APPOINTMENT - PATIENT DETAILS AT TOP, THEN DOCTOR & PAYMENT    */}
      {/* ========================================================================= */}
      {activeTab === 'add_appointment' && (
        <form onSubmit={handleSave} className="add-appointment-form">
          
          {/* Edit Mode Alert Banner */}
          {isEditMode && editingPatient && (
            <div style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              padding: '12px 20px',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 2px 8px rgba(245,158,11,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>✏️</span>
                <div>
                  <strong style={{ color: '#b45309', fontSize: '15px' }}>UPDATE PATIENT RECORD:</strong>
                  <span style={{ marginLeft: '8px', color: '#78350f', fontWeight: '500' }}>
                    Editing <strong>{editingPatient.patientName}</strong> | UMR: <strong style={{ color: '#1e40af' }}>{editingPatient.umrNo}</strong> | Token: <strong>{editingPatient.tokenNum || editingPatient.token}</strong>
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => {
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
                    healthIssue: '',
                    token: `OPD-${Math.floor(120 + appointments.length + 2)}`
                  }));
                  showNotification("Switched back to New Patient Registration mode.");
                }}
                style={{
                  background: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                ✕ Cancel Edit
              </button>
            </div>
          )}
          
          {/* ===================================================================== */}
          {/* 1. TOP: PATIENT DETAILS (FULL WIDTH ACROSS SCREEN, EQUAL 6-COL GRID)  */}
          {/* ===================================================================== */}
          <div className="form-section-card patient-details-top-card">
            <div className="card-header-bar">
              <h3 className="section-green-heading">
                <span className="sec-icon">👤</span> Patient Details:
              </h3>
              <span className="sec-badge-hint">Fields marked * are required</span>
            </div>

            <div className="patient-fields-grid-6col">
              {/* Row 1: Title (1), Name (2), Last Name (1), Gender (1), DOB (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Title</label>
                <select 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Master">Master</option>
                  <option value="Baby">Baby</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              <div className="input-group col-span-2">
                <label className="field-lbl">New Patient Name *</label>
                <input 
                  type="text" 
                  value={formData.patientName} 
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter First Name *"
                  className="dense-input equal-input required-input"
                  required
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName} 
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Gender</label>
                <select 
                  value={formData.gender} 
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob} 
                  onChange={(e) => handleDobChange(e.target.value)}
                  className="dense-input equal-input"
                />
              </div>

              {/* Row 2: Age (1), Mobile (2), State (1), City (1), Village (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Age (Y / M / D)</label>
                <div className="age-multi-input-box">
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      value={formData.years} 
                      onChange={(e) => handleYearsChange(e.target.value)}
                      placeholder="Y" 
                      className="dense-input age-val"
                    />
                    <span className="age-unit">Y</span>
                  </div>
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      value={formData.months} 
                      onChange={(e) => setFormData({ ...formData, months: Number(e.target.value) })}
                      placeholder="M" 
                      className="dense-input age-val"
                    />
                    <span className="age-unit">M</span>
                  </div>
                  <div className="mini-age-wrap">
                    <input 
                      type="number" 
                      value={formData.days} 
                      onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                      placeholder="D" 
                      className="dense-input age-val"
                    />
                    <span className="age-unit">D</span>
                  </div>
                </div>
              </div>

              <div className="input-group col-span-2">
                <label className="field-lbl">Mobile Number</label>
                <div className="phone-prefix-wrap">
                  <span className="flag-prefix">🇮🇳 +91</span>
                  <input 
                    type="tel" 
                    value={formData.mobile} 
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="10-digit mobile" 
                    className="dense-input equal-input with-prefix"
                  />
                </div>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">State</label>
                <select 
                  value={formData.state} 
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">City</label>
                <select 
                  value={formData.city} 
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Visakhapatnam">Visakhapatnam</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bhubaneswar">Bhubaneswar</option>
                  <option value="Vijayawada">Vijayawada</option>
                  <option value="Guntur">Guntur</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Village / Locality</label>
                <input 
                  type="text" 
                  value={formData.village} 
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder="Village / Town" 
                  className="dense-input equal-input"
                />
              </div>

              {/* Row 3: Address (2), Walk In (1), Organization (1), Category (1), Occupation (1) = 6 cols */}
              <div className="input-group col-span-2">
                <label className="field-lbl">Address</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street / House No" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Visit Category</label>
                <select 
                  value={formData.walkIn} 
                  onChange={(e) => setFormData({ ...formData, walkIn: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Walk In">Walk In</option>
                  <option value="Referral">Referral</option>
                  <option value="Online">Online</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Organization</label>
                <select 
                  value={formData.organization} 
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="--Select Organization--">Self Pay / Individual</option>
                  <option value="Individual">Individual Self-Pay</option>
                  <option value="EHS">EHS (Govt)</option>
                  <option value="Arogyasri">Arogyasri Trust</option>
                  <option value="Corporate TPA">Corporate Insurance TPA</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Billing Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="GENERAL - TRI">GENERAL - TRI</option>
                  <option value="VIP">VIP</option>
                  <option value="STAFF">STAFF</option>
                  <option value="BPL">BPL</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Occupation</label>
                <select 
                  value={formData.occupation} 
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="--Select Occupation--">--Select Occupation--</option>
                  <option value="Private Service">Private Service</option>
                  <option value="Govt Employee">Govt Employee</option>
                  <option value="Business">Business</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Student">Student</option>
                  <option value="Homemaker">Homemaker</option>
                </select>
              </div>

              {/* Row 4: ID Type (1), ID Number (1), Care By (1), Parent/Spouse (1), Religion (1), Marital (1) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Govt ID Type</label>
                <select 
                  value={formData.idType} 
                  onChange={(e) => setFormData({ ...formData, idType: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">ID Number</label>
                <input 
                  type="text" 
                  value={formData.idNumber} 
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="Enter ID Number" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Care By</label>
                <select 
                  value={formData.careBy} 
                  onChange={(e) => setFormData({ ...formData, careBy: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Parent / Spouse Name</label>
                <input 
                  type="text" 
                  value={formData.parentOrHusband} 
                  onChange={(e) => setFormData({ ...formData, parentOrHusband: e.target.value })}
                  placeholder="Father / Spouse Name" 
                  className="dense-input equal-input"
                />
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Religion</label>
                <select 
                  value={formData.religion} 
                  onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group col-span-1">
                <label className="field-lbl">Marital Status</label>
                <select 
                  value={formData.maritalStatus} 
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              {/* Row 5: Blood Group (1), Health Issue / Complaints (5) = 6 cols */}
              <div className="input-group col-span-1">
                <label className="field-lbl">Blood Group</label>
                <select 
                  value={formData.bloodGroup} 
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="dense-select equal-input"
                >
                  <option value="B+">B+</option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="B-">B-</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="input-group col-span-5">
                <label className="field-lbl">Health Issue / Chief Complaints</label>
                <input 
                  type="text" 
                  value={formData.healthIssue} 
                  onChange={(e) => setFormData({ ...formData, healthIssue: e.target.value })}
                  placeholder="Chief complaints, symptoms, fever, pain, etc." 
                  className="dense-input equal-input"
                />
              </div>
            </div>

            {/* Status Ribbon Bar */}
            <div className="reg-validity-ribbon-bar">
              <div className="ribbon-item">
                <span className="ribbon-lbl">VISIT TYPE:</span>
                <strong className="ribbon-val text-blue">NEW VISIT</strong>
              </div>
              <div className="ribbon-item">
                <span className="ribbon-lbl">REGISTRATION VALIDITY:</span>
                <strong className="ribbon-val text-blue">NO - 0</strong>
              </div>
              <div className="ribbon-item">
                <span className="ribbon-lbl">CONSULTANT VALIDITY:</span>
                <strong className="ribbon-val text-blue">NO - 0</strong>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* 2. THEN AFTER: DOCTOR TOKEN DETAILS & PAYMENT DETAILS (EQUAL 50%/50%) */}
          {/* ===================================================================== */}
          <div className="add-appointment-lower-split-grid">
            
            {/* LEFT 50%: Doctor & Token Details */}
            <div className="lower-grid-col">
              <div className="form-section-card h-100">
                <div className="card-header-bar">
                  <h3 className="section-green-heading">
                    <span className="sec-icon">🏥</span> Doctor & Token Details:
                  </h3>
                  <span className="sec-badge-hint">Token & Consultant Routing</span>
                </div>

                {/* Step 1 Quick Hospital Pill Buttons for fast 1-click selection */}
                <div className="hospital-quick-selector">
                  <span className="hosp-step-tag">Step 1: Hospital</span>
                  {['INDUS HEALTH CITY', 'INDUS SUPER SPECIALITY', 'INDUS CLINIC & DIAGNOSTICS'].map(hosp => (
                    <button
                      type="button"
                      key={hosp}
                      className={`hosp-quick-btn ${formData.location === hosp ? 'active' : ''}`}
                      onClick={() => handleHospitalChange(hosp)}
                      title={`Select ${hosp}`}
                    >
                      🏥 {hosp}
                    </button>
                  ))}
                </div>

                {/* 1. TOP BOX: Light Blue Container with 2 Rows (Matching Indus Screenshot) */}
                <div className="doctor-token-box-container">
                  {/* Row 1: Hospital Select (Step 1), Appointment Date, Token number input */}
                  <div className="doctor-token-box-row">
                    <div className="dt-col dt-col-hospital">
                      <select 
                        value={formData.location} 
                        onChange={(e) => handleHospitalChange(e.target.value)}
                        className="dt-select"
                        title="Step 1: Select Hospital"
                      >
                        <option value="">-- Step 1: Select Hospital --</option>
                        <option value="INDUS HEALTH CITY">INDUS HEALTH CITY</option>
                        <option value="INDUS SUPER SPECIALITY">INDUS SUPER SPECIALITY</option>
                        <option value="INDUS CLINIC & DIAGNOSTICS">INDUS CLINIC & DIAGNOSTICS</option>
                      </select>
                    </div>

                    <div className="dt-col dt-col-date">
                      <div className="dt-date-input-wrap">
                        <span className="dt-cal-icon">📅</span>
                        <input 
                          type="text" 
                          value={formData.appointmentDate} 
                          onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                          className="dt-input"
                          title="Appointment Date"
                        />
                      </div>
                    </div>

                    <div className="dt-col dt-col-token">
                      <input 
                        type="text" 
                        value={formData.token || '-'} 
                        readOnly 
                        className="dt-input dt-token-val"
                        title="Assigned Token Number"
                        placeholder="Token"
                      />
                    </div>
                  </div>

                  {/* Row 2: Doctor select (Step 2 - ONCHANGE OPENS TOKENS), Doctor Code, Specialization */}
                  <div className="doctor-token-box-row">
                    <div className="dt-col dt-col-doctor">
                      <select 
                        value={formData.consultant} 
                        onChange={(e) => handleConsultantChange(e.target.value)}
                        className={`dt-select dt-doctor-select ${formData.location && !formData.consultant ? 'ready-for-doc' : ''}`}
                        title="Step 2: Select Consultant Doctor (Opens Tokens)"
                        disabled={!formData.location}
                      >
                        <option value="">
                          {!formData.location 
                            ? '-- 1st Select Hospital Above --' 
                            : '-- Step 2: Select Consultant Doctor (Opens Tokens) --'}
                        </option>
                        {CONSULTANTS_ROSTER.map(doc => (
                          <option key={doc.code} value={doc.name}>{doc.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="dt-col dt-col-code">
                      <input 
                        type="text" 
                        value={formData.doctorCode || '-'} 
                        readOnly 
                        className="dt-input dt-readonly"
                        title="Doctor Employee Code"
                        placeholder="Emp Code"
                      />
                    </div>

                    <div className="dt-col dt-col-spec">
                      <input 
                        type="text" 
                        value={formData.specialization || '-'} 
                        readOnly 
                        className="dt-input dt-readonly"
                        title="Doctor Specialization"
                        placeholder="Specialization"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. DOCTOR SLOTS DETAILS (OPENS ON DOCTOR ONCHANGE) */}
                {!formData.location ? (
                  <div className="doctor-slots-waiting-box">
                    <div className="waiting-icon">🏥</div>
                    <div className="waiting-text">
                      <strong>Step 1: Select Hospital First</strong>
                      <p>
                        Please choose a Hospital from the dropdown or click a hospital button above to enable Doctor selection.
                      </p>
                    </div>
                  </div>
                ) : !formData.consultant || !isSlotsOpen ? (
                  <div className="doctor-slots-waiting-box">
                    <div className="waiting-icon">👨‍⚕️</div>
                    <div className="waiting-text">
                      <strong>Step 2: Select Doctor to OPEN Tokens</strong>
                      <p>
                        Hospital: <strong>{formData.location}</strong> selected. Choose a Consultant Doctor from the dropdown above to OPEN available token slots.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="doctor-slots-open-wrapper">
                    {/* Doctor Slots Details Heading */}
                    <div className="slots-title-row">
                      <div className="doctor-slots-title" style={{ margin: 0 }}>
                        <span>Doctor Slots Details:</span>
                      </div>
                      <span className="slots-open-badge">● Slots Open for {formData.consultant.split(' ')[0]}</span>
                    </div>

                    {/* Doctor Slots Details Container with 3 Columns of Red/Green Slot Pills */}
                    <div className="doctor-slots-details-container">
                      <div className="doctor-slots-grid">
                        {currentDoctorSlots.map((slot) => {
                          const isSelected = selectedSlotToken === slot.tokenNumber;
                          return (
                            <button
                              key={slot.tokenNumber}
                              type="button"
                              className={`doctor-slot-pill ${slot.isBooked ? 'slot-red' : 'slot-green'} ${isSelected ? 'slot-selected' : ''}`}
                              onClick={() => handleSlotClick(slot)}
                              title={slot.isBooked ? `Token #${slot.tokenNumber} is Booked` : `Click to Select Token #${slot.tokenNumber}`}
                            >
                              {slot.timeLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Add Extra Tokens Row with [+] Button */}
                    <div className="add-extra-tokens-row">
                      <span className="add-extra-tokens-label">Add Extra Tokens:</span>
                      <button 
                        type="button" 
                        className="btn-add-extra-token"
                        onClick={handleAddExtraToken}
                        title="Add Emergency / Extra Token Slot"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Consultant Doctor Select Chips */}
                <div className="quick-doc-chips-wrap" style={{ marginTop: '12px' }}>
                  <span className="chips-label">Quick Select Consultant:</span>
                  <div className="payment-chips-row" style={{ marginTop: '4px', borderTop: 'none', paddingTop: '0' }}>
                    {CONSULTANTS_ROSTER.slice(0, 4).map(doc => (
                      <button
                        type="button"
                        key={doc.code}
                        className={`pay-mode-chip ${formData.consultant === doc.name ? 'active' : ''}`}
                        onClick={() => {
                          if (!formData.location) {
                            handleHospitalChange('INDUS HEALTH CITY');
                          }
                          handleConsultantChange(doc.name);
                        }}
                      >
                        👨‍⚕️ {doc.name.split(' ')[0]} ({doc.fee} ₹)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Department & Cabin Info */}
                <div className="doc-room-info-pill" style={{ marginTop: '10px', padding: '6px 10px', background: '#ffffff', borderRadius: '4px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#475569' }}>
                  <span>📍 <strong>OPD Cabin:</strong> Room 102 (First Floor)</span>
                  <span>🕒 <strong>Assigned Slot:</strong> {formData.token ? `Token #${formData.token}` : 'Immediate Consultation'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT 50%: Payment Details (Fee Table & Payment Type) */}
            <div className="lower-grid-col">
              <div className="form-section-card h-100">
                <div className="card-header-bar">
                  <h3 className="section-green-heading">
                    <span className="sec-icon">💰</span> Payment Details:
                  </h3>
                  <span className="sec-badge-hint">Billing & Breakdown</span>
                </div>

                <div className="fee-table-grid">
                  {/* Row 1: Registration Fee | Reg Final Amount */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Registration Fee :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.regFee} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Reg Final Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.regFinalAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 2: Consultation Fee | Cons Final Amount */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Consultation Fee :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.consFee} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Cons Final Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.consFinalAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 3: Disc (%) | Disc (₹) */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Discount (%) :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.discPercent} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Discount (₹) :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.discAmt} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 4: Total Amount | Total Bill Amount */}
                  <div className="fee-grid-row highlight-row">
                    <div className="fee-cell-lbl text-bold">Total Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.totalAmt} readOnly className="fee-box-input bold-blue" />
                    </div>
                    <div className="fee-cell-lbl text-bold">Total Bill Amount :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.totalBillAmt} readOnly className="fee-box-input bold-blue" />
                    </div>
                  </div>

                  {/* Row 5: Amt Received | Balance */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Amt Received :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.amtReceived} readOnly className="fee-box-input" />
                    </div>
                    <div className="fee-cell-lbl">Balance :</div>
                    <div className="fee-cell-val">
                      <input type="number" value={formData.balance} readOnly className="fee-box-input" />
                    </div>
                  </div>

                  {/* Row 6: Status | Authorized By */}
                  <div className="fee-grid-row">
                    <div className="fee-cell-lbl">Status :</div>
                    <div className="fee-cell-val">
                      <span className="badge-paid-pill">PAID</span>
                    </div>
                    <div className="fee-cell-lbl">Authorized By :</div>
                    <div className="fee-cell-val">
                      <select 
                        value={formData.authorizedBy} 
                        onChange={(e) => setFormData({ ...formData, authorizedBy: e.target.value })}
                        className="dense-select equal-input"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Medical Director">Medical Director</option>
                        <option value="Chief Accountant">Chief Accountant</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selector Box */}
                <div className="payment-table-wrap" style={{ marginTop: '10px' }}>
                  <table className="equal-payment-table">
                    <thead>
                      <tr>
                        <th style={{ width: '45%' }}>Payment Mode</th>
                        <th style={{ width: '45%' }}>Amount (₹)</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select 
                            value={formData.paymentMode} 
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="dense-select equal-input"
                          >
                            <option value="Cash">Cash</option>
                            <option value="UPI">UPI / GPay / PhonePe</option>
                            <option value="Card">Debit / Credit Card</option>
                            <option value="Credit">Credit / Corporate TPA</option>
                          </select>
                        </td>
                        <td>
                          <input 
                            type="number" 
                            value={formData.paymentAmt} 
                            onChange={(e) => setFormData({ ...formData, paymentAmt: Number(e.target.value) })}
                            className="dense-input equal-input text-right bold-num"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            type="button" 
                            className="btn-add-mode-circle" 
                            onClick={() => showNotification("Split payment mode added.")}
                            title="Add Split Mode"
                          >
                            +
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Quick Payment Mode Selector Chips */}
                  <div className="payment-chips-row">
                    <span className="chips-label">Quick Select:</span>
                    {['Cash', 'UPI', 'Card', 'Credit'].map(mode => (
                      <button
                        type="button"
                        key={mode}
                        className={`pay-mode-chip ${formData.paymentMode === mode ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, paymentMode: mode })}
                      >
                        {mode === 'Cash' && '💵 Cash'}
                        {mode === 'UPI' && '📱 UPI / QR'}
                        {mode === 'Card' && '💳 Card'}
                        {mode === 'Credit' && '🏥 Corporate'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* 3. BOTTOM: EQUAL CENTERED ACTION FOOTER BAR                           */}
          {/* ===================================================================== */}
          <div className="form-equal-footer-bar">
            {isEditMode && editingPatient ? (
              <>
                <button type="submit" className="btn-green-save-prominent" style={{ background: '#d97706', borderColor: '#b45309' }}>
                  💾 Update Patient Record ({editingPatient.umrNo})
                </button>
                <button 
                  type="button" 
                  className="btn-print-token-action"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditingPatient(null);
                    handleSave();
                  }}
                  style={{ background: '#0284c7', borderColor: '#0369a1' }}
                  title="Save this entry as a new patient with fresh UMR"
                >
                  ➕ Save as New Patient
                </button>
                <button 
                  type="button" 
                  className="btn-reset-form-action"
                  onClick={() => {
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
                  }}
                  style={{ background: '#ef4444', color: '#fff', borderColor: '#dc2626' }}
                >
                  ✕ Cancel
                </button>
              </>
            ) : (
              <>
                <button type="submit" className="btn-green-save-prominent">
                  💾 Save Appointment
                </button>
                <button 
                  type="button" 
                  className="btn-print-token-action"
                  onClick={() => {
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
                  }}
                >
                  🖨️ Save & Print Token Slip
                </button>
                <button 
                  type="button" 
                  className="btn-reset-form-action"
                  onClick={() => {
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
                  }}
                >
                  🔄 Reset Fields
                </button>
              </>
            )}
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* PRINT RECEIPT / INVOICE MODAL */}
      {/* ========================================================================= */}
      {printModal && (
        <div className="print-modal-overlay">
          <div className="print-receipt-card">
            <div className="print-header">
              <h3>INDUS HEALTH CITY</h3>
              <p>Vasugan Medical Specialities Pvt Ltd</p>
              <div className="print-type-badge">
                {printModal.type === 'reg' ? 'OUTPATIENT REGISTRATION RECEIPT' : 
                 printModal.type === 'cons' ? 'DOCTOR CONSULTATION INVOICE' : 'NURSING VITALS REPORT'}
              </div>
            </div>

            <div className="print-body">
              <div className="print-grid">
                <div><span>UMR No:</span> <strong>{printModal.record.umrNo}</strong></div>
                <div><span>Token:</span> <strong>{printModal.record.token}</strong></div>
                <div><span>Patient Name:</span> <strong>{printModal.record.patientName}</strong></div>
                <div><span>Age / Gender:</span> <strong>{printModal.record.genderAge}</strong></div>
                <div><span>Consultant:</span> <strong>{printModal.record.consultant}</strong></div>
                <div><span>Date:</span> <strong>{printModal.record.appointmentDate}</strong></div>
              </div>

              <hr style={{ margin: '12px 0', borderColor: '#e2e8f0' }} />

              {printModal.type === 'reg' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>OPD Registration Fee (One-Time)</span> <strong>₹{printModal.record.regCash || 50}.00</strong></div>
                  <div className="bill-item total"><span>Total Paid:</span> <strong>₹{printModal.record.regCash || 50}.00</strong></div>
                </div>
              )}

              {printModal.type === 'cons' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>Consultant Clinical Fee</span> <strong>₹{printModal.record.conCash || 800}.00</strong></div>
                  <div className="bill-item total"><span>Total Paid:</span> <strong>₹{printModal.record.conCash || 800}.00</strong></div>
                </div>
              )}

              {printModal.type === 'vitals' && (
                <div className="print-bill-items">
                  <div className="bill-item"><span>Blood Pressure (BP):</span> <strong>{printModal.record.vitals?.bp || '120/80 mmHg'}</strong></div>
                  <div className="bill-item"><span>Pulse Rate:</span> <strong>{printModal.record.vitals?.pulse || '74 bpm'}</strong></div>
                  <div className="bill-item"><span>Oxygen Saturation (SpO2):</span> <strong>{printModal.record.vitals?.spo2 || '99%'}</strong></div>
                  <div className="bill-item"><span>Body Temperature:</span> <strong>{printModal.record.vitals?.temp || '98.6 °F'}</strong></div>
                  <div className="bill-item"><span>Body Weight:</span> <strong>{printModal.record.vitals?.weight || '65 kg'}</strong></div>
                </div>
              )}
            </div>

            <div className="print-actions">
              <button className="btn btn-secondary" onClick={() => setPrintModal(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => window.print()}>🖨️ Print Slip</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Vitals View / Record Modal */}
      {vitalsDrawer && (
        <div className="print-modal-overlay">
          <div className="print-receipt-card">
            <div className="print-header" style={{ textAlign: 'left', borderBottom: '2px solid #10b981' }}>
              <h3 style={{ color: '#059669', margin: 0 }}>❤️ Clinical Vitals Desk</h3>
              <p style={{ margin: '4px 0 0', color: '#64748b' }}>
                {vitalsDrawer.patientName} ({vitalsDrawer.umrNo}) | {vitalsDrawer.genderAge}
              </p>
            </div>

            <div className="print-body" style={{ marginTop: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Blood Pressure (BP):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.bp || '120/80'} 
                    className="dense-input" 
                    id="modal-bp"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Pulse (bpm):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.pulse || '74'} 
                    className="dense-input" 
                    id="modal-pulse"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>SpO2 (%):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.spo2 || '99%'} 
                    className="dense-input" 
                    id="modal-spo2"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Temperature (°F):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.temp || '98.6'} 
                    className="dense-input" 
                    id="modal-temp"
                  />
                </div>
                <div className="field-group">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Weight (kg):</label>
                  <input 
                    type="text" 
                    defaultValue={vitalsDrawer.vitals?.weight || '68'} 
                    className="dense-input" 
                    id="modal-weight"
                  />
                </div>
              </div>
            </div>

            <div className="print-actions">
              <button className="btn btn-secondary" onClick={() => setVitalsDrawer(null)}>Cancel</button>
              <button 
                className="btn btn-success" 
                onClick={() => {
                  const updatedVitals = {
                    bp: document.getElementById('modal-bp')?.value || '120/80',
                    pulse: document.getElementById('modal-pulse')?.value || '74',
                    spo2: document.getElementById('modal-spo2')?.value || '99%',
                    temp: document.getElementById('modal-temp')?.value || '98.6',
                    weight: document.getElementById('modal-weight')?.value || '68'
                  };
                  setAppointments(prev => prev.map(a => a.umrNo === vitalsDrawer.umrNo ? { ...a, vitals: updatedVitals } : a));
                  setVitalsDrawer(null);
                  showNotification(`✓ Vitals updated for ${vitalsDrawer.patientName}`);
                }}
              >
                💾 Save Vitals
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
