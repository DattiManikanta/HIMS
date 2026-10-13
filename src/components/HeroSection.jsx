import React from 'react';

export function HeroSection({ setActiveTab, onOpenRegister, waitingTotal, activeDoctorsCount }) {
  return (
    <section className="hero-banner">
      <div className="hero-card">
        <div className="hero-content">
          <div className="hero-pill">
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8' }}></span>
            Next-Gen Outpatient (OPD) System
          </div>
          <h2 className="hero-title">
            Smart & Seamless <span className="highlight">OP Patient Care</span>, Real-Time Queue & Digital Records.
          </h2>
          <p className="hero-desc">
            PulseCare Hospital provides zero-delay outpatient services. Register online in 60 seconds, track your consultation token from your mobile, consult top specialists, and access instant digital prescriptions.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onOpenRegister} style={{ padding: '13px 26px', fontSize: '0.96rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              Register OP Patient / Get Token
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('queue')} style={{ padding: '13px 24px', fontSize: '0.96rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              View Live Waiting Lobby
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setActiveTab('records')}
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21"ライ2="16.65"/></svg>
              View OP Prescription
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="stat-item">
              <div className="stat-num">348 <span className="unit">+</span></div>
              <div className="stat-lbl">Today's OP Consultations</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{activeDoctorsCount} <span className="unit">active</span></div>
              <div className="stat-lbl">Specialists in OPD Cabins</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">{waitingTotal} <span className="unit">patients</span></div>
              <div className="stat-lbl">Tokens Currently in Queue</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12 <span className="unit">mins</span></div>
              <div className="stat-lbl">Avg Consultation Turnaround</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
