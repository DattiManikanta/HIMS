import React, { useState } from 'react';

export function PatientPortal({ records, initialToken }) {
  const [searchToken, setSearchToken] = useState(initialToken || 'CAR-104');
  const [activeRecord, setActiveRecord] = useState(records[searchToken] || records['CAR-104']);

  const handleSearch = (tokenToFind) => {
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

  return (
    <div className="portal-section">
      <div className="section-header">
        <div>
          <h2>📋 Patient OP Medical Records & E-Prescription</h2>
          <p>Retrieve consultation notes, clinical vitals, digital prescriptions, and laboratory orders.</p>
        </div>
      </div>

      {/* Lookup Bar */}
      <div className="lookup-box">
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            ENTER OP TOKEN NUMBER OR REGISTRATION ID:
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CAR-104 or GEN-211"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.04em' }}
            />
            <button className="btn btn-primary" onClick={() => handleSearch(searchToken)}>
              Fetch OP Record ▶
            </button>
          </div>

          <div className="quick-tokens-list">
            <span>Quick Demo Patients:</span>
            <button className="quick-token-chip" onClick={() => handleSearch('CAR-104')}>
              CAR-104 (Rajesh Kumar - Cardiology)
            </button>
            <button className="quick-token-chip" onClick={() => handleSearch('GEN-211')}>
              GEN-211 (Gopal Krishna - General Med)
            </button>
            <button className="quick-token-chip" onClick={() => handleSearch('ORT-082')}>
              ORT-082 (David D'Souza - Orthopedics)
            </button>
          </div>
        </div>
      </div>

      {/* Active Record Display */}
      {activeRecord && (
        <div className="prescription-card" id="printable-rx">
          {/* Header of Prescription */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.4rem' }}>🏥</span>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--dark)' }}>PULSECARE HEALTH CITY</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Outpatient Department • Consultation Record & E-Prescription
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{ 
                background: 'var(--primary-light)', 
                color: 'var(--primary)', 
                fontWeight: 800, 
                fontSize: '1rem', 
                padding: '4px 12px', 
                borderRadius: '8px' 
              }}>
                Token: {activeRecord.token}
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                OP ID: <strong>{activeRecord.opId}</strong> | Date: <strong>{activeRecord.visitDate}</strong>
              </div>
            </div>
          </div>

          {/* Patient and Doctor Demographics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', background: 'var(--bg-alt)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Patient Information</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', marginTop: '2px' }}>
                {activeRecord.patientName} ({activeRecord.age} Yrs / {activeRecord.gender})
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                Contact: {activeRecord.phone} | Blood: <strong>{activeRecord.bloodGroup}</strong>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attending Specialist</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--dark)', marginTop: '2px' }}>
                {activeRecord.doctor}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                {activeRecord.department} • <strong>{activeRecord.room}</strong>
              </div>
            </div>
          </div>

          {/* Vitals Grid */}
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '10px' }}>
            🩺 Recorded OP Clinical Vitals
          </h4>
          <div className="vitals-grid">
            <div className="vital-tile">
              <div className="vital-label">Blood Pressure</div>
              <div className="vital-val" style={{ color: '#0284c7' }}>{activeRecord.vitals.bp}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target: 120/80</div>
            </div>
            <div className="vital-tile">
              <div className="vital-label">Pulse / Heart Rate</div>
              <div className="vital-val" style={{ color: '#10b981' }}>{activeRecord.vitals.pulse}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Regular Sinus</div>
            </div>
            <div className="vital-tile">
              <div className="vital-label">Oxygen SpO2</div>
              <div className="vital-val" style={{ color: '#0d9488' }}>{activeRecord.vitals.spo2}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Room Air</div>
            </div>
            <div className="vital-tile">
              <div className="vital-label">Body Temp</div>
              <div className="vital-val">{activeRecord.vitals.temp}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Oral Digital</div>
            </div>
            <div className="vital-tile">
              <div className="vital-label">Weight</div>
              <div className="vital-val">{activeRecord.vitals.weight}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Electronic Scale</div>
            </div>
            <div className="vital-tile">
              <div className="vital-label">BMI Ratio</div>
              <div className="vital-val" style={{ fontSize: '1.05rem' }}>{activeRecord.vitals.bmi}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Body Mass Index</div>
            </div>
          </div>

          {/* Clinical Findings */}
          <div style={{ margin: '20px 0', padding: '16px', background: '#f8fafc', borderLeft: '4px solid var(--primary)', borderRadius: '0 8px 8px 0' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>CHIEF COMPLAINT:</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px', marginBottom: '8px' }}>{activeRecord.symptoms}</p>
            
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary)' }}>PROVISIONAL DIAGNOSIS:</div>
            <p style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--dark)', marginTop: '2px' }}>{activeRecord.diagnosis}</p>
          </div>

          {/* Medication Table (Rx) */}
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--dark)', marginTop: '26px' }}>
            💊 Prescribed Medications (Rx)
          </h4>
          <table className="rx-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Medicine & Strength</th>
                <th>Dosage Frequency</th>
                <th>Instructions / Timing</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {activeRecord.prescription.map((med, idx) => (
                <tr key={idx}>
                  <td><strong>{idx + 1}</strong></td>
                  <td style={{ fontWeight: 700, color: 'var(--dark)' }}>{med.medicine}</td>
                  <td>
                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                      {med.timing}
                    </span>
                  </td>
                  <td>{med.instruction}</td>
                  <td style={{ fontWeight: 600 }}>{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Recommended Diagnostics / Lab Orders */}
          {activeRecord.recommendedTests && activeRecord.recommendedTests.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--dark)', marginBottom: '10px' }}>
                🔬 Outpatient Investigations & Diagnostic Orders
              </h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {activeRecord.recommendedTests.map((t, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem' }}>
                    <strong>{t.testName}</strong>: <span style={{ color: '#0d9488' }}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctor's Advice */}
          <div style={{ marginTop: '22px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>PHYSICIAN LIFESTYLE & FOLLOW-UP INSTRUCTIONS:</h4>
            <p style={{ fontSize: '0.88rem', color: '#334155', marginTop: '4px' }}>
              {activeRecord.doctorNotes}
            </p>
          </div>

          {/* Print / Export Action */}
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={handlePrintRx}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print OP Prescription
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
