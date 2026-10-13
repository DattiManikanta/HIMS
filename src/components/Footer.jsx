import React from 'react';

export function Footer({ setActiveTab }) {
  return (
    <footer className="hospital-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div className="logo-badge" style={{ width: '36px', height: '36px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>INDUS HEALTH CITY</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '14px' }}>
            A premier multi-speciality tertiary hospital and outpatient center dedicated to fast, compassionate, and digital clinical excellence. NABH and NABL accredited.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', padding: '3px 10px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 700 }}>
              NABH ACCREDITED
            </span>
            <span style={{ background: '#1e293b', border: '1px solid #334155', color: '#34d399', padding: '3px 10px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 700 }}>
              NABL CERTIFIED LABS
            </span>
            <span style={{ background: '#1e293b', border: '1px solid #334155', color: '#f59e0b', padding: '3px 10px', borderRadius: '4px', fontSize: '0.74rem', fontWeight: 700 }}>
              ISO 9001:2015
            </span>
          </div>
        </div>

        <div className="footer-col">
          <h4>OPD Navigation</h4>
          <ul>
            <li><a href="#queue" onClick={(e) => { e.preventDefault(); setActiveTab('queue'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Live Token Queue Display</a></li>
            <li><a href="#register" onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Patient OP Registration</a></li>
            <li><a href="#doctors" onClick={(e) => { e.preventDefault(); setActiveTab('doctors'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Consultant Doctors Schedule</a></li>
            <li><a href="#records" onClick={(e) => { e.preventDefault(); setActiveTab('records'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>Prescription & Vitals Portal</a></li>
            <li><a href="#staff" onClick={(e) => { e.preventDefault(); setActiveTab('staff'); }} style={{ color: '#94a3b8', textDecoration: 'none' }}>OPD Desk Admin Console</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Specialties</h4>
          <ul>
            <li>Cardiology & Cath Lab</li>
            <li>Orthopedics & Joint Care</li>
            <li>General & Internal Medicine</li>
            <li>Pediatrics & Neonatology</li>
            <li>Dermatology & Skin Clinic</li>
            <li>ENT & Head-Neck Surgery</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Emergency & Helpdesk</h4>
          <ul>
            <li><strong style={{ color: '#ef4444' }}>24x7 Ambulance:</strong> 1800-419-9999</li>
            <li><strong>OPD Helpdesk:</strong> +91 80 2400 1100</li>
            <li><strong>Email:</strong> opd.desk@indushealthcity.com</li>
            <li><strong>Address:</strong> Indus Health City Campus, Medical Center Blvd</li>
            <li><strong>OPD Timings:</strong> Mon - Sat: 8:00 AM - 8:00 PM (Sun Emergency Only)</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 INDUS HEALTH CITY. Hospital Information Management System.</span>
        <span>Built with React.js • Secure HIPAA & EHR Standards Compliant</span>
      </div>
    </footer>
  );
}
