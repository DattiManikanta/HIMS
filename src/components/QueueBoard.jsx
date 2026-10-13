import React, { useState } from 'react';

export function QueueBoard({ departments, onCallNext, activeAlertToken, onPlayChime }) {
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = departments.filter(dep => 
    dep.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    dep.doctor.toLowerCase().includes(filterQuery.toLowerCase()) ||
    dep.room.toLowerCase().includes(filterQuery.toLowerCase()) ||
    dep.currentToken.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="queue-section">
      <div className="section-header">
        <div>
          <h2>🏥 Live Outpatient (OPD) Waiting Board</h2>
          <p>Real-time token status across all outpatient consulting cabins. Updated dynamically.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Filter department, room or token..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{ width: '260px', padding: '8px 12px', fontSize: '0.85rem' }}
          />
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onPlayChime}
            title="Test announcement chime"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            Lobby Chime
          </button>
        </div>
      </div>

      {activeAlertToken && (
        <div className="announcement-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🔔</span>
            <span>
              <strong>ATTENTION PLEASE:</strong> Token <strong style={{ textDecoration: 'underline' }}>{activeAlertToken.token}</strong> ({activeAlertToken.patient}) please proceed to <strong>{activeAlertToken.room}</strong>.
            </span>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
            NOW CALLING
          </span>
        </div>
      )}

      <div className="queue-board-grid">
        {filtered.map((dep) => {
          const isFlashed = activeAlertToken && activeAlertToken.depCode === dep.code;
          return (
            <div key={dep.id} className={`queue-card ${isFlashed ? 'flash-active' : ''}`}>
              <div className="room-badge-row">
                <span className="cabin-tag">{dep.room}</span>
                <span className={`status-indicator ${dep.statusColor || 'emerald'}`}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                  {dep.status}
                </span>
              </div>

              <h3 className="department-title">{dep.name}</h3>
              <div className="doctor-subtext">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.38 8.38 0 0 1 13 0"/></svg>
                {dep.doctor} • {dep.specialty}
              </div>

              {/* Spotlight box for current and next token */}
              <div className="token-spotlight-box">
                <div>
                  <div className="token-big-label">Now Serving</div>
                  <div className="token-big-number">{dep.currentToken || 'None'}</div>
                </div>
                <div className="token-next-col">
                  <div className="token-big-label">Next In Line</div>
                  <div className="token-next-num">{dep.nextToken || 'None'}</div>
                </div>
              </div>

              {/* Waiting List Preview */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Queue Line ({dep.queue.length} in waiting)
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {dep.queue.slice(0, 4).map((item, idx) => (
                    <span 
                      key={item.token}
                      style={{
                        fontSize: '0.75rem',
                        padding: '3px 8px',
                        background: idx === 0 ? 'var(--primary-light)' : 'var(--bg-alt)',
                        color: idx === 0 ? 'var(--primary)' : 'var(--text-main)',
                        fontWeight: idx === 0 ? 700 : 500,
                        borderRadius: '6px',
                        border: '1px solid var(--border)'
                      }}
                      title={`${item.patientName} (${item.priority})`}
                    >
                      {item.token} {item.priority === 'Senior Citizen' ? '👴' : ''}
                    </span>
                  ))}
                  {dep.queue.length > 4 && (
                    <span style={{ fontSize: '0.75rem', padding: '3px 6px', color: 'var(--text-muted)' }}>
                      +{dep.queue.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="queue-submeta">
                <div className="wait-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Est. Wait: <strong>{dep.avgWaitTime}</strong>
                </div>
                
                {onCallNext && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onCallNext(dep.id)}
                    style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                  >
                    Call Next Token ▶
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
