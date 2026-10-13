import React from 'react';

export function StaffDashboard({ departments, onCallNext, onCompleteConsultation, onAddUrgentPatient, onResetDemo }) {
  const totalWaiting = departments.reduce((acc, d) => acc + d.queue.length, 0);

  return (
    <div className="staff-section">
      <div className="section-header">
        <div>
          <h2>🎛️ Hospital OPD Desk & Queue Controller (Demo Mode)</h2>
          <p>Simulate outpatient operations: call next token, admit emergency walk-ins, and inspect live doctor cabin queues.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary btn-sm" onClick={onResetDemo}>
            🔄 Reset Demo Queues
          </button>
        </div>
      </div>

      {/* Operations Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div className="vital-label">Active OPD Cabins</div>
          <div className="vital-val" style={{ color: 'var(--primary)' }}>{departments.length} Rooms</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--amber)' }}>
          <div className="vital-label">Patients in Waiting Line</div>
          <div className="vital-val" style={{ color: 'var(--amber)' }}>{totalWaiting} Patients</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--emerald)' }}>
          <div className="vital-label">Consultations Completed</div>
          <div className="vital-val" style={{ color: 'var(--emerald)' }}>284 Done</div>
        </div>
        <div className="vital-tile" style={{ borderLeft: '4px solid var(--rose)' }}>
          <div className="vital-label">Fast-Track / Triage</div>
          <div className="vital-val" style={{ color: 'var(--rose)' }}>Active 24x7</div>
        </div>
      </div>

      {/* OPD Management Console Card */}
      <div className="staff-console-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)' }}>
            Live Cabin Queue Status & Dispatcher
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click "Call Next Token" to advance room queue & broadcast announcement chime.
          </span>
        </div>

        <table className="staff-table">
          <thead>
            <tr>
              <th>OPD Room & Department</th>
              <th>Attending Doctor</th>
              <th>Now In Cabin</th>
              <th>Next Up</th>
              <th>In Waiting</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Demo Queue Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.id}>
                <td>
                  <strong>{dep.room}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{dep.name}</div>
                </td>
                <td>
                  <strong>{dep.doctor}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dep.specialty}</div>
                </td>
                <td>
                  <span style={{ 
                    fontFamily: 'Space Grotesk, sans-serif', 
                    fontWeight: 800, 
                    fontSize: '1.1rem', 
                    color: 'var(--primary)',
                    background: 'var(--primary-light)',
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {dep.currentToken || 'Empty'}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: 'var(--dark)' }}>
                    {dep.nextToken || 'None'}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, color: dep.queue.length > 3 ? 'var(--amber)' : 'inherit' }}>
                    {dep.queue.length} patients
                  </span>
                </td>
                <td>
                  <span className={`status-indicator ${dep.statusColor || 'emerald'}`}>
                    {dep.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onCallNext(dep.id)}
                      disabled={dep.queue.length === 0}
                      title="Advance token & ring chime"
                      style={{ opacity: dep.queue.length === 0 ? 0.5 : 1 }}
                    >
                      ▶ Call Next Token
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onAddUrgentPatient(dep.id)}
                      title="Inject an urgent triage patient to front of queue"
                    >
                      + Fast-Track Triage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
