import React, { useState } from 'react';

export function VitalsScreen({ records, onSaveVitals, initialToken }) {
  // Extract all patients from records
  const patientList = Object.values(records);

  const [selectedToken, setSelectedToken] = useState(initialToken || (patientList[0] ? patientList[0].token : 'CAR-104'));
  const activePatient = records[selectedToken] || patientList[0] || null;

  // Vitals Input Form State
  const [vitalsData, setVitalsData] = useState({
    bpSystolic: activePatient && activePatient.vitals ? (activePatient.vitals.bp ? activePatient.vitals.bp.split('/')[0] : '120') : '120',
    bpDiastolic: activePatient && activePatient.vitals ? (activePatient.vitals.bp && activePatient.vitals.bp.includes('/') ? activePatient.vitals.bp.split('/')[1].replace(/\D/g, '') : '80') : '80',
    pulse: activePatient && activePatient.vitals ? (activePatient.vitals.pulse ? activePatient.vitals.pulse.replace(/\D/g, '') : '74') : '74',
    spo2: activePatient && activePatient.vitals ? (activePatient.vitals.spo2 ? activePatient.vitals.spo2.replace(/\D/g, '') : '99') : '99',
    temp: activePatient && activePatient.vitals ? (activePatient.vitals.temp ? activePatient.vitals.temp.replace(/[^\d.]/g, '') : '98.6') : '98.6',
    weight: activePatient && activePatient.vitals ? (activePatient.vitals.weight ? activePatient.vitals.weight.replace(/\D/g, '') : '68') : '68',
    height: '172',
    bloodSugar: activePatient && activePatient.vitals && activePatient.vitals.bloodSugar ? activePatient.vitals.bloodSugar.replace(/\D/g, '') : '110',
    triageNotes: activePatient && activePatient.vitals && activePatient.vitals.triageNotes ? activePatient.vitals.triageNotes : 'Patient conscious and oriented. Vital signs stable at triage.'
  });

  const [savedDocument, setSavedDocument] = useState(null);
  const [searchTokenInput, setSearchTokenInput] = useState('');

  // Handle switching patient
  const handleSelectPatient = (token) => {
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

  const handleVitalsChange = (e) => {
    const { name, value } = e.target;
    setVitalsData(prev => ({ ...prev, [name]: value }));
  };

  // Auto calculate BMI
  const calculateBMI = (wt, ht) => {
    const w = parseFloat(wt);
    const h = parseFloat(ht) / 100;
    if (!w || !h || h <= 0) return '23.0 (Normal)';
    const bmiVal = (w / (h * h)).toFixed(1);
    let category = 'Normal';
    if (bmiVal < 18.5) category = 'Underweight';
    else if (bmiVal < 25) category = 'Normal';
    else if (bmiVal < 30) category = 'Overweight';
    else category = 'Obese';
    return `${bmiVal} (${category})`;
  };

  // Quick Vitals Presets
  const applyVitalsPreset = (preset) => {
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
  const handleSaveVitals = (e) => {
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

  return (
    <div className="vitals-station-section">
      <div className="section-header">
        <div>
          <h2>🩺 Nursing Triage & Patient Vitals Station</h2>
          <p>Dedicated module: Select registered patient after payment, record clinical vitals entity, and print the official form.</p>
        </div>
        <div>
          <span style={{ background: 'var(--emerald-light)', color: '#065f46', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 800 }}>
            Triage Desk Active ●
          </span>
        </div>
      </div>

      {/* Patient Selection & Token Lookup Bar */}
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)' }}>
              Select Registered Patient for Vitals Check:
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Patients who completed registration and counter payment are queued here for vitals measurement.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search Token (e.g. CAR-104)"
              value={searchTokenInput}
              onChange={(e) => setSearchTokenInput(e.target.value)}
              style={{ width: '220px', padding: '6px 12px', fontSize: '0.85rem' }}
            />
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => {
                const k = searchTokenInput.trim().toUpperCase();
                if (records[k]) handleSelectPatient(k);
                else alert(`Token ${k} not found.`);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Patient Chips List */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {patientList.map(p => {
            const isSelected = p.token === selectedToken;
            return (
              <div
                key={p.token}
                onClick={() => handleSelectPatient(p.token)}
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: isSelected ? 'var(--primary-light)' : 'var(--bg-alt)',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ color: isSelected ? 'var(--primary)' : 'var(--dark)' }}>{p.token}</strong>
                  <span style={{ fontSize: '0.72rem', background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    PAID ✓
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--dark)', marginTop: '2px' }}>
                  {p.patientName}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {p.department}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Patient Details & Vitals Form */}
      {activePatient && (
        <div className="form-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Patient Registration & Payment Verification Header */}
          <div style={{ 
            background: 'var(--bg-alt)', 
            border: '1px solid var(--border)', 
            borderRadius: 'var(--radius-md)', 
            padding: '16px 20px', 
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Patient Registration Particulars:
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)' }}>
                {activePatient.patientName} ({activePatient.age} Yrs / {activePatient.gender})
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                Token: <strong>{activePatient.token}</strong> • OP ID: <strong>{activePatient.opId}</strong> • Dept: <strong>{activePatient.department}</strong> ({activePatient.room})
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Doctor: <strong>{activePatient.doctor}</strong> • Symptoms: <em>{activePatient.symptoms || 'General OP evaluation'}</em>
              </div>
            </div>

            {/* Payment Verified Badge */}
            <div style={{ textAlign: 'right' }}>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.85rem' }}>
                PAID: ₹{activePatient.payment ? activePatient.payment.totalAmount : 800} ✓
              </span>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Mode: {activePatient.payment ? activePatient.payment.paymentMethod : 'UPI'} • Txn Ref: {activePatient.payment ? activePatient.payment.transactionId : 'TXN-849201'}
              </div>
            </div>
          </div>

          {/* Vitals Form */}
          <form onSubmit={handleSaveVitals}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🩺</span> Enter Clinical Vitals Measurements
              </h3>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>QUICK PRESETS:</span>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('normal')} style={{ fontSize: '0.74rem', padding: '4px 8px' }}>
                  Normal
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('hypertension')} style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#b91c1c' }}>
                  High BP
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => applyVitalsPreset('fever')} style={{ fontSize: '0.74rem', padding: '4px 8px', color: '#d97706' }}>
                  Fever
                </button>
              </div>
            </div>

            <div className="form-grid">
              {/* Blood Pressure */}
              <div className="form-group">
                <label className="form-label">
                  Blood Pressure (Systolic / Diastolic)
                  <span style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600, marginLeft: '6px' }}>Target: 120/80</span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="number"
                    name="bpSystolic"
                    className="form-input"
                    placeholder="Sys (e.g. 120)"
                    value={vitalsData.bpSystolic}
                    onChange={handleVitalsChange}
                  />
                  <input
                    type="number"
                    name="bpDiastolic"
                    className="form-input"
                    placeholder="Dia (e.g. 80)"
                    value={vitalsData.bpDiastolic}
                    onChange={handleVitalsChange}
                  />
                </div>
              </div>

              {/* Heart Rate / Pulse */}
              <div className="form-group">
                <label className="form-label">
                  Pulse / Heart Rate (bpm)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 60-100</span>
                </label>
                <input
                  type="number"
                  name="pulse"
                  className="form-input"
                  placeholder="e.g. 74"
                  value={vitalsData.pulse}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Oxygen Saturation SpO2 */}
              <div className="form-group">
                <label className="form-label">
                  Oxygen Saturation SpO2 (%)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 95-100%</span>
                </label>
                <input
                  type="number"
                  name="spo2"
                  className="form-input"
                  placeholder="e.g. 99"
                  value={vitalsData.spo2}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Body Temperature */}
              <div className="form-group">
                <label className="form-label">
                  Body Temperature (°F)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Normal: 98.4 - 98.6°F</span>
                </label>
                <input
                  type="text"
                  name="temp"
                  className="form-input"
                  placeholder="e.g. 98.6"
                  value={vitalsData.temp}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Weight & Height with BMI Auto-Calculation */}
              <div className="form-group">
                <label className="form-label">
                  Weight (kg) & Height (cm)
                  <span style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 700, marginLeft: '6px' }}>
                    BMI: {calculateBMI(vitalsData.weight, vitalsData.height)}
                  </span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <input
                    type="number"
                    name="weight"
                    className="form-input"
                    placeholder="Weight (kg)"
                    value={vitalsData.weight}
                    onChange={handleVitalsChange}
                  />
                  <input
                    type="number"
                    name="height"
                    className="form-input"
                    placeholder="Height (cm)"
                    value={vitalsData.height}
                    onChange={handleVitalsChange}
                  />
                </div>
              </div>

              {/* Blood Sugar */}
              <div className="form-group">
                <label className="form-label">
                  Random Blood Sugar RBS (mg/dL)
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '6px' }}>Target: &lt; 140</span>
                </label>
                <input
                  type="number"
                  name="bloodSugar"
                  className="form-input"
                  placeholder="e.g. 110"
                  value={vitalsData.bloodSugar}
                  onChange={handleVitalsChange}
                />
              </div>

              {/* Triage Nurse Notes */}
              <div className="form-group full-width">
                <label className="form-label">Nursing Triage Assessment Notes</label>
                <input
                  type="text"
                  name="triageNotes"
                  className="form-input"
                  placeholder="e.g. Patient conscious, oriented. No acute distress."
                  value={vitalsData.triageNotes}
                  onChange={handleVitalsChange}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.96rem' }}>
                ✓ Save Vitals & Generate Printable Registration + Vitals Slip ▶
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= PRINTABLE REGISTRATION + VITALS DOCUMENT ================= */}
      {savedDocument && (
        <div style={{ marginTop: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{ background: 'var(--emerald-light)', color: '#065f46', padding: '6px 18px', borderRadius: 'var(--radius-full)', fontWeight: 800, fontSize: '0.88rem' }}>
              ✓ Vitals Recorded & Form Ready for Doctor Cabin
            </span>
          </div>

          <div className="token-slip-container" id="printable-slip" style={{ maxWidth: '640px' }}>
            {/* Header */}
            <div className="token-slip-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
                <h3 className="slip-hospital-title">PULSECARE HEALTH CITY</h3>
              </div>
              <p className="slip-tagline">Outpatient Department (OPD) • Registration, Billing & Clinical Vitals Slip</p>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                NABH Accredited • Helpdesk: +91 80 2400 1100 • Campus Block A, Level 1
              </p>
            </div>

            {/* Hero Token */}
            <div className="token-hero-badge" style={{ padding: '16px 24px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                OUTPATIENT CONSULTATION TOKEN
              </div>
              <div className="token-number-hero" style={{ margin: '4px 0' }}>
                {savedDocument.token}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                <span style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary-hover)', 
                  padding: '2px 10px', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>
                  {savedDocument.priority || 'Regular'} Queue
                </span>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                  Room: {savedDocument.room}
                </span>
              </div>
            </div>

            <div className="token-slip-body" style={{ padding: '20px 24px' }}>
              {/* SECTION 1: REGISTRATION DEMOGRAPHICS */}
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em', marginBottom: '8px' }}>
                1. PATIENT REGISTRATION PARTICULARS
              </div>
              <div className="slip-detail-row">
                <span className="slip-label">OP Registration ID:</span>
                <span className="slip-val">{savedDocument.opId || 'OP-2026-9041'}</span>
              </div>
              <div className="slip-detail-row">
                <span className="slip-label">Patient Full Name:</span>
                <span className="slip-val">{savedDocument.patientName}</span>
              </div>
              <div className="slip-detail-row">
                <span className="slip-label">Age / Gender / Blood:</span>
                <span className="slip-val">{savedDocument.age} Yrs / {savedDocument.gender} / {savedDocument.bloodGroup}</span>
              </div>
              <div className="slip-detail-row">
                <span className="slip-label">Department & Room:</span>
                <span className="slip-val" style={{ color: 'var(--primary)' }}>{savedDocument.department} — {savedDocument.room}</span>
              </div>
              <div className="slip-detail-row">
                <span className="slip-label">Consulting Doctor:</span>
                <span className="slip-val">{savedDocument.doctor}</span>
              </div>

              {/* SECTION 2: PAYMENT RECEIPT */}
              <div style={{ marginTop: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534', letterSpacing: '0.05em' }}>
                    2. OP PAYMENT RECEIPT (COUNTER SETTLED)
                  </span>
                  <span style={{ background: '#16a34a', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    PAID & SETTLED ✓
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
                  <div>Doctor Fee: <strong>₹{savedDocument.payment ? savedDocument.payment.consultationFee : 700}</strong></div>
                  <div>OP Card Fee: <strong>₹{savedDocument.payment ? savedDocument.payment.regFee : 100}</strong></div>
                  <div style={{ color: '#15803d', fontWeight: 800 }}>Total: <strong>₹{savedDocument.payment ? savedDocument.payment.totalAmount : 800}</strong></div>
                </div>
              </div>

              {/* SECTION 3: CLINICAL VITALS ENTITY RECORDED */}
              <div style={{ marginTop: '16px', background: '#f8fafc', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--dark)', letterSpacing: '0.05em' }}>
                    3. CLINICAL TRIAGE VITALS (MEASURED AT NURSING STATION)
                  </span>
                  <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    NURSE VERIFIED ✓
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
                  <div>BP: <strong style={{ color: 'var(--primary)' }}>{savedDocument.vitals.bp}</strong></div>
                  <div>Pulse: <strong style={{ color: '#10b981' }}>{savedDocument.vitals.pulse}</strong></div>
                  <div>SpO2: <strong style={{ color: '#0d9488' }}>{savedDocument.vitals.spo2}</strong></div>
                  <div>Temp: <strong>{savedDocument.vitals.temp}</strong></div>
                  <div>Weight: <strong>{savedDocument.vitals.weight}</strong></div>
                  <div>Height: <strong>{savedDocument.vitals.height || '172 cm'}</strong></div>
                  <div>BMI: <strong>{savedDocument.vitals.bmi ? savedDocument.vitals.bmi.split(' ')[0] : '23.0'}</strong></div>
                  <div>Blood Sugar: <strong>{savedDocument.vitals.bloodSugar || '110 mg/dL'}</strong></div>
                </div>
                {savedDocument.vitals.triageNotes && (
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                    <strong>Nursing Notes:</strong> {savedDocument.vitals.triageNotes}
                  </div>
                )}
              </div>

              {/* Barcode & Instructions */}
              <div style={{ marginTop: '16px', textAlign: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '12px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                  *{savedDocument.opId || 'OP-2026-9041'}*
                </div>
                <p style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', fontStyle: 'italic' }}>
                  Vitals recorded. Please proceed with this slip to <strong>{savedDocument.department} — {savedDocument.room}</strong>.
                </p>
              </div>
            </div>

            <div className="token-slip-footer" style={{ padding: '12px 20px' }}>
              <span>Valid for today's consultation only.</span>
              <span style={{ fontWeight: 800 }}>Triage Station • PulseCare OPD</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => window.print()} style={{ padding: '12px 24px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              🖨️ Print Registration Form & Vitals Slip (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
