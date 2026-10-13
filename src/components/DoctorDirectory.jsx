import React, { useState } from 'react';

export function DoctorDirectory({ doctors, onSelectDoctorForBooking }) {
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const departments = [
    { code: 'ALL', label: 'All Specialties' },
    { code: 'CAR', label: 'Cardiology' },
    { code: 'ORT', label: 'Orthopedics' },
    { code: 'GEN', label: 'General Medicine' },
    { code: 'PED', label: 'Pediatrics' },
    { code: 'DER', label: 'Dermatology' },
    { code: 'ENT', label: 'ENT Clinic' }
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesDept = selectedDept === 'ALL' || doc.depCode === selectedDept;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.focus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="doctors-section">
      <div className="section-header">
        <div>
          <h2>👨‍⚕️ Specialist Doctors & OPD Schedule</h2>
          <p>Consult with our board-certified senior consultants across specialized outpatient cabins.</p>
        </div>
        <div>
          <input
            type="text"
            className="form-input"
            placeholder="Search doctor or clinical focus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '260px' }}
          />
        </div>
      </div>

      {/* Specialty Filter Chips */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {departments.map(dept => (
          <button
            key={dept.code}
            className={`btn btn-sm ${selectedDept === dept.code ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedDept(dept.code)}
          >
            {dept.label}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="doctors-grid">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="doctor-card">
            <div className="doctor-top-row">
              <img src={doc.image} alt={doc.name} className="doc-avatar" />
              <div className="doc-info">
                <h3 className="doc-name">{doc.name}</h3>
                <span className="doc-dep-chip">{doc.department}</span>
                <p className="doc-degrees">{doc.degrees}</p>
                <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '4px' }}>
                  ★ {doc.rating} • {doc.experience} Experience
                </div>
              </div>
            </div>

            <div className="doc-middle-body">
              <div className="doc-meta-item">
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>📍 Cabin:</span>
                <span>{doc.cabin}</span>
              </div>
              <div className="doc-meta-item">
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>⏰ OPD Hours:</span>
                <span>{doc.opdTimings}</span>
              </div>
              <div className="doc-meta-item">
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>🗣️ Speaks:</span>
                <span>{doc.languages}</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                <strong>Clinical Focus:</strong> {doc.focus}
              </p>
            </div>

            <div className="doctor-footer">
              <div className="doc-fee">
                {doc.fee} <span>/ Consultation</span>
              </div>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onSelectDoctorForBooking(doc)}
              >
                Book OP Token ▶
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
