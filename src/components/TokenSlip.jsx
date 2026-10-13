import React from 'react';

export function TokenSlip({ tokenData, onBackToQueue, onNewRegistration, onGoToVitals }) {
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

  return (
    <div className="token-slip-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ 
          background: 'var(--emerald-light)', 
          color: '#065f46', 
          padding: '6px 18px', 
          borderRadius: 'var(--radius-full)', 
          fontWeight: 800, 
          fontSize: '0.88rem' 
        }}>
          ✓ Registration, Payment & Clinical Vitals Recorded Successfully
        </span>
      </div>

      <div className="token-slip-container" id="printable-slip" style={{ maxWidth: '640px' }}>
        {/* Slip Header */}
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

        {/* Hero Token Number */}
        <div className="token-hero-badge" style={{ padding: '18px 24px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            OUTPATIENT CONSULTATION TOKEN
          </div>
          <div className="token-number-hero" style={{ margin: '4px 0' }}>
            {tokenData.token}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span style={{ 
              background: tokenData.priority === 'Emergency' ? 'var(--rose-light)' : 'var(--primary-light)', 
              color: tokenData.priority === 'Emergency' ? '#b91c1c' : 'var(--primary-hover)', 
              padding: '2px 10px', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.75rem', 
              fontWeight: 700 
            }}>
              {tokenData.priority} Queue
            </span>
            <span style={{ background: '#f1f5f9', color: '#475569', padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
              Est. Consultation Wait: {tokenData.estimatedTime || '15-20 Mins'}
            </span>
          </div>
        </div>

        {/* Slip Body */}
        <div className="token-slip-body" style={{ padding: '20px 24px' }}>
          {/* SECTION 1: PATIENT REGISTRATION DEMOGRAPHICS */}
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.05em', marginBottom: '8px' }}>
            1. PATIENT REGISTRATION PARTICULARS
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">OP Registration ID:</span>
            <span className="slip-val">{tokenData.opId || 'OP-2026-9041'}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Patient Full Name:</span>
            <span className="slip-val" style={{ fontSize: '0.95rem' }}>{tokenData.patientName}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Age / Gender / Blood:</span>
            <span className="slip-val">{tokenData.age} Yrs / {tokenData.gender} / {tokenData.bloodGroup}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Contact Phone:</span>
            <span className="slip-val">{tokenData.phone}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Department & Cabin:</span>
            <span className="slip-val" style={{ color: 'var(--primary)' }}>{tokenData.departmentName} — {tokenData.room}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Consulting Doctor:</span>
            <span className="slip-val">{tokenData.doctor}</span>
          </div>
          <div className="slip-detail-row">
            <span className="slip-label">Chief Complaint / Symptoms:</span>
            <span className="slip-val" style={{ fontStyle: 'italic', fontWeight: 600 }}>{tokenData.symptoms || 'General OP consultation'}</span>
          </div>

          {/* SECTION 2: OP PAYMENT & BILLING RECEIPT */}
          <div style={{ marginTop: '18px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534', letterSpacing: '0.05em' }}>
                2. OP REGISTRATION & COUNTER PAYMENT RECEIPT
              </span>
              <span style={{ background: '#16a34a', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                PAID & VERIFIED ✓
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
              <div>Doctor Fee: <strong>₹{payment.consultationFee}</strong></div>
              <div>OP Card Fee: <strong>₹{payment.regFee}</strong></div>
              <div style={{ color: '#15803d', fontWeight: 800 }}>Total Paid: <strong>₹{payment.totalAmount}</strong></div>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#166534', marginTop: '6px', borderTop: '1px dashed #86efac', paddingTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Payment Mode: <strong>{payment.paymentMethod}</strong></span>
              <span>Txn Ref: <strong>{payment.transactionId}</strong></span>
            </div>
          </div>

          {/* SECTION 3: CLINICAL VITALS RECORDED AT TRIAGE */}
          <div style={{ marginTop: '18px', background: '#f8fafc', border: '1.5px solid var(--border)', borderRadius: '8px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--dark)', letterSpacing: '0.05em' }}>
                3. CLINICAL TRIAGE VITALS (RECORDED BY NURSING STATION)
              </span>
              <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                NURSE VERIFIED ✓
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
              <div>BP: <strong style={{ color: 'var(--primary)' }}>{vitals.bp}</strong></div>
              <div>Heart Rate: <strong style={{ color: '#10b981' }}>{vitals.pulse}</strong></div>
              <div>SpO2: <strong style={{ color: '#0d9488' }}>{vitals.spo2}</strong></div>
              <div>Body Temp: <strong>{vitals.temp}</strong></div>
              <div>Weight: <strong>{vitals.weight}</strong></div>
              <div>Height: <strong>{vitals.height || '172 cm'}</strong></div>
              <div>BMI: <strong>{vitals.bmi ? vitals.bmi.split(' ')[0] : '23.0'}</strong></div>
              <div>Sugar (RBS): <strong>{vitals.bloodSugar || '110 mg/dL'}</strong></div>
            </div>

            {vitals.triageNotes && (
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                <strong>Nurse Assessment Notes:</strong> {vitals.triageNotes}
              </div>
            )}
          </div>

          {/* SECTION 4: BARCODE & INSTRUCTIONS */}
          <div style={{ marginTop: '16px', textAlign: 'center', borderTop: '1px dashed #cbd5e1', paddingTop: '14px' }}>
            {/* SVG Barcode simulation */}
            <svg width="220" height="38" viewBox="0 0 220 38" style={{ display: 'inline-block' }}>
              <rect x="0" y="0" width="4" height="36" fill="#0f172a" />
              <rect x="8" y="0" width="2" height="36" fill="#0f172a" />
              <rect x="14" y="0" width="6" height="36" fill="#0f172a" />
              <rect x="24" y="0" width="3" height="36" fill="#0f172a" />
              <rect x="32" y="0" width="8" height="36" fill="#0f172a" />
              <rect x="44" y="0" width="3" height="36" fill="#0f172a" />
              <rect x="52" y="0" width="5" height="36" fill="#0f172a" />
              <rect x="62" y="0" width="2" height="36" fill="#0f172a" />
              <rect x="68" y="0" width="7" height="36" fill="#0f172a" />
              <rect x="80" y="0" width="4" height="36" fill="#0f172a" />
              <rect x="90" y="0" width="6" height="36" fill="#0f172a" />
              <rect x="100" y="0" width="2" height="36" fill="#0f172a" />
              <rect x="108" y="0" width="5" height="36" fill="#0f172a" />
              <rect x="118" y="0" width="7" height="36" fill="#0f172a" />
              <rect x="130" y="0" width="3" height="36" fill="#0f172a" />
              <rect x="138" y="0" width="6" height="36" fill="#0f172a" />
              <rect x="150" y="0" width="2" height="36" fill="#0f172a" />
              <rect x="158" y="0" width="8" height="36" fill="#0f172a" />
              <rect x="172" y="0" width="4" height="36" fill="#0f172a" />
              <rect x="182" y="0" width="5" height="36" fill="#0f172a" />
              <rect x="194" y="0" width="3" height="36" fill="#0f172a" />
              <rect x="202" y="0" width="7" height="36" fill="#0f172a" />
              <rect x="214" y="0" width="4" height="36" fill="#0f172a" />
            </svg>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.12em', marginTop: '2px' }}>
              *{tokenData.opId || 'OP-2026-9041'}*
            </div>
            <p style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '6px', fontStyle: 'italic' }}>
              Please be seated in the <strong>{tokenData.departmentName} Waiting Lounge</strong>. When Token <strong>{tokenData.token}</strong> is announced on the lobby board, proceed into <strong>{tokenData.room}</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="token-slip-footer" style={{ padding: '12px 20px' }}>
          <span>Valid for today's OPD consultation only.</span>
          <span style={{ fontWeight: 800 }}>PulseCare Registration Desk</span>
        </div>
      </div>

      {/* Slip Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '20px', flexWrap: 'wrap' }}>
        {onGoToVitals && (
          <button className="btn btn-emerald" onClick={onGoToVitals} style={{ padding: '12px 24px', fontSize: '0.94rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Proceed to Vitals Station ▶
          </button>
        )}
        <button className="btn btn-primary" onClick={handlePrint} style={{ padding: '12px 24px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
          🖨️ Print Registration Form & Vitals Slip (PDF)
        </button>
        <button className="btn btn-secondary" onClick={onBackToQueue}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
          Track in Live Queue
        </button>
        <button className="btn btn-secondary" onClick={onNewRegistration}>
          + Register Next Patient
        </button>
      </div>
    </div>
  );
}
