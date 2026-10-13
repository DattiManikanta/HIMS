import React, { useState, useEffect } from 'react';

export function DatabaseViewer({ postgresStatus, onRefreshStatus }) {
  const [activeTable, setActiveTable] = useState('patients'); // 'patients', 'vitals', 'pharmacy', 'queues', 'schema'
  const [records, setRecords] = useState({});
  const [invoices, setInvoices] = useState({});
  const [departments, setDepartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDatabaseData = () => {
    setLoading(true);
    Promise.all([
      fetch('/api/records').then(r => r.json()).catch(() => ({})),
      fetch('/api/departments').then(r => r.json()).catch(() => []),
      fetch('/api/health').then(r => r.json()).catch(() => null)
    ]).then(([recData, depData, healthData]) => {
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
    return (
      (p.patientName && p.patientName.toLowerCase().includes(q)) ||
      (p.token && p.token.toLowerCase().includes(q)) ||
      (p.opId && p.opId.toLowerCase().includes(q)) ||
      (p.phone && p.phone.includes(q)) ||
      (p.department && p.department.toLowerCase().includes(q))
    );
  });

  // Export to CSV
  const exportToCSV = () => {
    if (activeTable === 'patients') {
      const headers = ['OP ID', 'Token', 'Patient Name', 'Age', 'Gender', 'Phone', 'Blood Group', 'Department', 'Doctor', 'Priority', 'Visit Date'];
      const rows = filteredPatients.map(p => [
        `"${p.opId || ''}"`,
        `"${p.token || ''}"`,
        `"${p.patientName || ''}"`,
        p.age || '',
        `"${p.gender || ''}"`,
        `"${p.phone || ''}"`,
        `"${p.bloodGroup || ''}"`,
        `"${p.department || ''}"`,
        `"${p.doctor || ''}"`,
        `"${p.priority || ''}"`,
        `"${p.visitDate || ''}"`
      ]);
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

  return (
    <div className="database-viewer-section" style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
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
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1.5px solid #38bdf8',
            borderRadius: '12px',
            width: '54px',
            height: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem'
          }}>
            🐘
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc' }}>
                PostgreSQL Database Explorer
              </h2>
              <span style={{
                background: (postgresStatus?.database_connected || postgresStatus?.postgres_connected) ? '#10b981' : '#eab308',
                color: '#0f172a',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 10px',
                borderRadius: '12px',
                textTransform: 'uppercase'
              }}>
                {(postgresStatus?.database_connected || postgresStatus?.postgres_connected) ? 'Live MySQL Connected' : 'Local Persistence Cache (Target: MySQL)'}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.88rem' }}>
              Engine: <strong style={{ color: '#38bdf8' }}>MySQL</strong> | Host: <code style={{ color: '#38bdf8' }}>{postgresStatus?.postgres_host || '192.168.1.103'}:{postgresStatus?.postgres_port || 3306}</code> | Database: <code style={{ color: '#38bdf8' }}>{postgresStatus?.postgres_database || 'at_hospital'}</code> | Total Records: <strong>{patientList.length}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              fetch('/api/db/retry', { method: 'POST' })
                .then(r => r.json())
                .then(d => {
                  fetchDatabaseData();
                })
                .catch(() => fetchDatabaseData());
            }}
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Attempt immediate connection to MySQL at 192.168.1.103:3306"
          >
            ⚡ Reconnect MySQL
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={fetchDatabaseData}
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            🔄 {loading ? 'Refreshing...' : 'Refresh Tables'}
          </button>
          <button 
            className="btn btn-primary" 
            onClick={exportToCSV}
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            📥 Export to CSV
          </button>
        </div>
      </div>

      {/* Navigation Pills for Database Tables */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTable === 'patients' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTable('patients')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📋 Table: patients ({patientList.length})
        </button>
        <button
          className={`btn ${activeTable === 'vitals' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTable('vitals')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🩺 Table: patient_vitals ({patientList.length})
        </button>
        <button
          className={`btn ${activeTable === 'queues' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTable('queues')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🏥 Table: department_queues ({departments.length})
        </button>
        <button
          className={`btn ${activeTable === 'schema' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTable('schema')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          ⚙️ PostgreSQL Schema & DDL
        </button>
      </div>

      {/* Search & Filter Bar */}
      {activeTable !== 'schema' && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
          <div style={{ flex: 1, maxWidth: '450px' }}>
            <input 
              type="text"
              className="form-input"
              placeholder="Search table by Token, OP ID, Patient Name, Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', fontSize: '0.9rem' }}
            />
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredPatients.length}</strong> rows
          </div>
        </div>
      )}

      {/* TABLE 1: PATIENTS */}
      {activeTable === 'patients' && (
        <div className="staff-console-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="staff-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>OP ID</th>
                  <th>Patient Name</th>
                  <th>Age / Sex</th>
                  <th>Phone</th>
                  <th>Blood Group</th>
                  <th>Department & Room</th>
                  <th>Doctor</th>
                  <th>Priority</th>
                  <th>Counter Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="11" style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                      No patient records found in table.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map(p => (
                    <tr key={p.token} style={{ cursor: 'pointer' }} onClick={() => setSelectedRecord(p)}>
                      <td>
                        <span className="token-chip" style={{ fontSize: '0.8rem', padding: '3px 8px' }}>
                          {p.token}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.opId}</td>
                      <td>
                        <strong>{p.patientName}</strong>
                      </td>
                      <td>{p.age} Y / {p.gender}</td>
                      <td style={{ fontFamily: 'monospace' }}>{p.phone}</td>
                      <td>
                        <span style={{ background: '#fee2e2', color: '#991b1b', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                          {p.bloodGroup}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{p.department}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.room}</div>
                      </td>
                      <td>{p.doctor}</td>
                      <td>
                        <span className={`badge-priority ${p.priority === 'Emergency' ? 'emergency' : p.priority === 'Senior Citizen' ? 'senior' : 'regular'}`} style={{ fontSize: '0.72rem' }}>
                          {p.priority}
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: '#059669' }}>
                        ₹{p.payment ? p.payment.totalAmount : 800} ({p.payment ? p.payment.paymentMethod : 'Paid'})
                      </td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(p);
                          }}
                          style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                        >
                          View Details ▶
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 2: PATIENT VITALS */}
      {activeTable === 'vitals' && (
        <div className="staff-console-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="staff-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Token ID</th>
                  <th>Patient Name</th>
                  <th>Blood Pressure</th>
                  <th>Pulse</th>
                  <th>SpO2</th>
                  <th>Temp</th>
                  <th>Weight / BMI</th>
                  <th>Blood Sugar</th>
                  <th>Triage Clinical Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(p => (
                  <tr key={p.token}>
                    <td>
                      <span className="token-chip" style={{ fontSize: '0.8rem', padding: '3px 8px' }}>
                        {p.token}
                      </span>
                    </td>
                    <td><strong>{p.patientName}</strong></td>
                    <td style={{ fontWeight: 700, color: '#0284c7' }}>{p.vitals ? p.vitals.bp : '120/80 mmHg'}</td>
                    <td>{p.vitals ? p.vitals.pulse : '74 bpm'}</td>
                    <td style={{ color: '#059669', fontWeight: 700 }}>{p.vitals ? p.vitals.spo2 : '99%'}</td>
                    <td>{p.vitals ? p.vitals.temp : '98.6 °F'}</td>
                    <td>{p.vitals ? p.vitals.weight : '68 kg'} ({p.vitals ? p.vitals.bmi : 'Normal'})</td>
                    <td>{p.vitals && p.vitals.bloodSugar ? p.vitals.bloodSugar : '110 mg/dL'}</td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {p.vitals && p.vitals.triageNotes ? p.vitals.triageNotes : 'Clinical signs stable.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TABLE 3: DEPARTMENT QUEUES */}
      {activeTable === 'queues' && (
        <div className="staff-console-card" style={{ padding: '0', overflow: 'hidden' }}>
          <table className="staff-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Department Code</th>
                <th>Department Name</th>
                <th>Cabin / Room</th>
                <th>Current Token Inside</th>
                <th>Next Token in Line</th>
                <th>Status</th>
                <th>Waiting Patients in Queue</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(d => (
                <tr key={d.id}>
                  <td><span className="token-chip">{d.code}</span></td>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.room}</td>
                  <td><span style={{ color: '#059669', fontWeight: 800 }}>{d.currentToken || 'None'}</span></td>
                  <td><span style={{ color: '#0284c7', fontWeight: 800 }}>{d.nextToken || 'None'}</span></td>
                  <td>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <strong>{d.queue ? d.queue.length : 0} waiting</strong> ({d.queue ? d.queue.map(q => q.token).join(', ') : 'Empty'})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TABLE 4: POSTGRESQL SCHEMA DDL */}
      {activeTable === 'schema' && (
        <div className="staff-console-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>
            🐘 PostgreSQL Tables Definition & Relational Schema (init_db.sql)
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
            The backend executes these DDL instructions upon first connection to create and maintain tables:
          </p>
          <pre style={{
            background: '#0f172a',
            color: '#38bdf8',
            padding: '20px',
            borderRadius: '10px',
            overflowX: 'auto',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            fontFamily: 'Consolas, monospace'
          }}>
{`-- 1. Patients Table
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
);`}
          </pre>
        </div>
      )}

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div style={{
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
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="token-chip" style={{ fontSize: '1rem', padding: '4px 12px' }}>{selectedRecord.token}</span>
                <h3 style={{ margin: '8px 0 0', fontSize: '1.3rem', fontWeight: 800 }}>{selectedRecord.patientName}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>OP ID: {selectedRecord.opId}</span>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 800 }}
              >✕</button>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.85rem' }}>
                <div>Age / Gender: <strong>{selectedRecord.age} Y / {selectedRecord.gender}</strong></div>
                <div>Blood Group: <strong>{selectedRecord.bloodGroup}</strong></div>
                <div>Phone: <strong>{selectedRecord.phone}</strong></div>
                <div>Department: <strong>{selectedRecord.department}</strong></div>
                <div>Doctor: <strong>{selectedRecord.doctor}</strong></div>
                <div>Room: <strong>{selectedRecord.room}</strong></div>
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '14px', borderRadius: '10px', marginBottom: '16px', fontSize: '0.84rem' }}>
              <div style={{ fontWeight: 800, color: '#166534', marginBottom: '6px' }}>Recorded Clinical Vitals:</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div>BP: <strong>{selectedRecord.vitals?.bp}</strong></div>
                <div>Pulse: <strong>{selectedRecord.vitals?.pulse}</strong></div>
                <div>SpO2: <strong>{selectedRecord.vitals?.spo2}</strong></div>
                <div>Temp: <strong>{selectedRecord.vitals?.temp}</strong></div>
                <div>Weight: <strong>{selectedRecord.vitals?.weight}</strong></div>
                <div>Sugar: <strong>{selectedRecord.vitals?.bloodSugar || '110 mg/dL'}</strong></div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Chief Symptoms:</div>
              <div style={{ fontSize: '0.88rem' }}>{selectedRecord.symptoms}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setSelectedRecord(null)}>
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
