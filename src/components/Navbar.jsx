import React from 'react';

export function Navbar({ activeTab, setActiveTab, onOpenRegister, waitingTotal, currentUser, onLogout, postgresStatus, onOpenPostgresModal }) {
  return (
    <header>
      {/* Top Urgent / Operational Notification Bar */}
      <div className="top-emergency-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span className="emergency-chip">
            <span className="pulse-dot"></span>
            24/7 OP Emergency & Triage Hotline: 1800-419-9999
          </span>
          <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
            OPD Hours Today: <strong>08:00 AM - 08:00 PM</strong> | Central Pharmacy & Diagnostics Open
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.8rem', color: '#94a3b8', flexWrap: 'wrap' }}>
          {currentUser && (
            <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>User:</span>
              <strong style={{ color: '#38bdf8' }}>{currentUser.name}</strong>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem' }}>
                ADMIN
              </span>
            </span>
          )}
          
          {/* PostgreSQL Live Indicator */}
          <button 
            type="button"
            onClick={onOpenPostgresModal}
            style={{ 
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
            }}
            title="Click to view PostgreSQL Database Details & Connection Settings"
          >
            <span style={{ 
              width: '7px', 
              height: '7px', 
              borderRadius: '50%', 
              background: postgresStatus?.postgres_connected ? '#10b981' : '#eab308',
              boxShadow: postgresStatus?.postgres_connected ? '0 0 6px #10b981' : '0 0 6px #eab308'
            }}></span>
            <span>🐘 PostgreSQL: {postgresStatus?.postgres_connected ? 'Connected' : 'Offline (Local Cache)'}</span>
          </button>

          <span>ATRI HIMS: <strong style={{ color: '#34d399' }}>Active ✓</strong></span>
          <span>Waiting Tokens: <strong style={{ color: '#38bdf8' }}>{waitingTotal}</strong></span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="hospital-navbar">
        <div className="brand-logo" onClick={() => setActiveTab('hims_home')} title="Return to ATRI HIMS Home Tiles">
          <div className="logo-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 5v14"/>
              <path d="M5 12h14"/>
            </svg>
          </div>
          <div className="brand-text">
            <h1>ATRI <span className="accent">HIMS</span></h1>
            <p>Integrated Hospital Information Management System</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'hims_home' ? 'active' : ''}`}
            onClick={() => setActiveTab('hims_home')}
            style={{ fontWeight: 700, color: '#0284c7' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            HIMS Home Tiles
          </button>
          <button 
            className={`nav-item ${activeTab === 'queue' ? 'active' : ''}`}
            onClick={() => setActiveTab('queue')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            Patient Queue
          </button>
          <button 
            className={`nav-item ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Patient Registration
          </button>
          <button 
            className={`nav-item ${activeTab === 'vitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('vitals')}
            style={{ color: '#059669' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            Nursing / Vitals
          </button>
          <button 
            className={`nav-item ${activeTab === 'doctors' ? 'active' : ''}`}
            onClick={() => setActiveTab('doctors')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
            Human Resource (Doctors)
          </button>
          <button 
            className={`nav-item ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Lab Records & Rx
          </button>
          <button 
            className={`nav-item ${activeTab === 'pharmacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('pharmacy')}
            style={{ color: '#0284c7' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
            Pharmacy
          </button>
          <button 
            className={`nav-item ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
            style={{ color: '#0d9488' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1 2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            Admin / Desk Control
          </button>
          <button 
            className={`nav-item ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
            style={{ color: '#0284c7', fontWeight: 700 }}
          >
            <span style={{ fontSize: '1rem', marginRight: '2px' }}>🐘</span>
            Database Explorer
          </button>
        </div>

        {/* Quick Actions & Logout */}
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={onOpenRegister}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            New OP Token
          </button>

          {onLogout && (
            <button 
              className="btn btn-secondary btn-logout" 
              onClick={onLogout} 
              title="Logout from ATRI HIMS"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
              LOGOUT
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
