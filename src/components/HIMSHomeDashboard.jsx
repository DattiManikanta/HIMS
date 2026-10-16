import React, { useState, useEffect } from 'react';
import { AtriBizLogo } from './LoginPage.jsx';

export function HIMSHomeDashboard({ onSelectModule, onLogout }) {
  const [loginTime, setLoginTime] = useState('');
  const [readonlyNotice, setReadonlyNotice] = useState(null);

  useEffect(() => {
    // Format timestamp like: 2026-10-07 11:40:27
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    setLoginTime(formatted);
  }, []);

  const handleReadOnlyClick = (moduleName) => {
    setReadonlyNotice(`${moduleName} is currently in Read-Only mode. Please click Patient Management.`);
    setTimeout(() => {
      setReadonlyNotice(null);
    }, 3000);
  };

  return (
    <div className="hims-home-screen">
      {/* Read-Only Notice Toast */}
      {readonlyNotice && (
        <div className="hims-readonly-notice-toast">
          <span className="toast-icon">🔒</span>
          <span className="toast-text">{readonlyNotice}</span>
          <button 
            type="button" 
            className="toast-dismiss" 
            onClick={() => setReadonlyNotice(null)}
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}



      {/* Top Header Bar */}
      <header className="hims-top-bar">
        {/* Left: AB Logo */}
        <div className="hims-top-logo">
          <AtriBizLogo width={125} height={60} />
        </div>

        {/* Center: Red Login Time */}
        <div className="hims-login-time">
          LogInTime: <span className="time-val">{loginTime || '2026-10-07 11:40:27'}</span>
        </div>

        {/* Right: Actions */}
        <div className="hims-top-actions">
          <button
            type="button"
            className="hims-quick-opd-btn"
            onClick={() => onSelectModule('patient_management')}
            title="Open Patient Registration & OPD Desk"
          >
            <span>📋</span> Enter Patient Management
          </button>

          <button 
            type="button" 
            className="hims-logout-circle-btn" 
            onClick={onLogout}
            title="Logout from ATRI HIMS"
          >
            <div className="hims-power-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                <line x1="12" y1="2" x2="12" y2="12" />
              </svg>
            </div>
            <span className="hims-logout-text">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Center Area with Headline & Metro Tile Grid */}
      <main className="hims-main-area">
        <div className="hims-content-wrapper">
          {/* Full 3D Metro Tile Grid with HD Photos & Vibrant 3D Functional Tiles */}

          {/* Full 3D Metro Tile Grid with HD Photos & Vibrant 3D Functional Tiles */}
          <div className="hims-3d-tile-grid">
            {/* ROW 1 */}
            {/* Col 1-4: Stepped Metro spacer */}
            <div className="hims-tile-spacer-row1"></div>

            {/* Col 5: Photo Tile - Medical Faculty (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-img hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Medical Faculty')}
              title="Hospital Medical Faculty (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <img src="./tile_hr.jpg" alt="Medical Faculty" className="hims-tile-photo" />
              <div className="hims-tile-glass-tag">FACULTY</div>
            </div>

            {/* Col 6: Empty spacer */}
            <div className="hims-tile-empty"></div>


            {/* ROW 2 */}
            {/* Col 1: HIGHLIGHT 3D CYAN TILE - PATIENT MANAGEMENT (ONLY CLICKABLE TILE) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-cyan hims-tile-highlight hims-tile-clickable" 
              onClick={() => onSelectModule('patient_management')}
              title="Patient Management — Click to open OPD Registration & Appointments"
            >
              <span className="hims-tile-active-pill">CLICK TO OPEN</span>
              <div className="hims-tile-icon-wrap">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="7" r="3.5" fill="#ffffff" />
                  <path d="M3.5 18c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" stroke="#ffffff" strokeWidth="2.2" fill="none" />
                  <circle cx="16" cy="9" r="3" fill="#ffffff" />
                  <path d="M12.5 18c.3-2 1.8-3.5 3.5-3.5 2 0 3.5 1.5 3.5 3.5" stroke="#ffffff" strokeWidth="2.2" fill="none" />
                </svg>
              </div>
              <span className="hims-tile-label">Patient Management</span>
              <span className="hims-tile-subtag">OPD & Tokens</span>
            </div>

            {/* Col 2: Photo Tile - Doctor Laptop Workstation (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-img hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Clinical Desk')}
              title="Clinical Desk & Workstation (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <img src="./tile_laptop.jpg" alt="Clinical Desk" className="hims-tile-photo" />
              <div className="hims-tile-glass-tag">CLINICAL DESK</div>
            </div>

            {/* Col 3: Photo Tile - Lab Diagnostics Flask (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-img hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Diagnostics Lab')}
              title="Diagnostics Laboratory (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <img src="./tile_flask.jpg" alt="Lab Flask" className="hims-tile-photo" />
              <div className="hims-tile-glass-tag">DIAGNOSTICS</div>
            </div>

            {/* Col 4: 3D Orange Tile - Lab Management (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-orange hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Lab Management')}
              title="Laboratory Information & Orders (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18h8" />
                  <path d="M3 22h18" />
                  <path d="M14 22a7 7 0 1 0 0-14h-1" />
                  <path d="M9 14h2" />
                  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" fill="rgba(255,255,255,0.25)" />
                  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
                </svg>
              </div>
              <span className="hims-tile-label">Lab Management</span>
            </div>

            {/* Col 5: Photo Tile - Pharmacy Dispensary (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-img hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Pharmacy')}
              title="Central Pharmacy & Dispensary (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <img src="./tile_pharmacy.jpg" alt="Pharmacy" className="hims-tile-photo" />
              <div className="hims-tile-glass-tag">PHARMACY</div>
            </div>

            {/* Col 6: 3D Teal Tile - Credit Billing (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-teal hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Credit Billing')}
              title="Credit Billing & Cashier Desk (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="10" x="2" y="3" rx="2" />
                  <path d="M6 13v2" />
                  <path d="M10 13v2" />
                  <path d="M4 17h8" />
                  <rect width="8" height="6" x="14" y="14" rx="1" fill="rgba(255,255,255,0.25)" />
                  <line x1="16" x2="20" y1="12" y2="12" />
                </svg>
              </div>
              <span className="hims-tile-label">Credit Billing</span>
            </div>


            {/* ROW 3 */}
            {/* Col 1 & 2: Empty spacers */}
            <div className="hims-tile-empty"></div>
            <div className="hims-tile-empty"></div>

            {/* Col 3: 3D Magenta Tile - CSSD Sterile (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-magenta hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('CSSD')}
              title="Central Sterile Services Department (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M8 8 C8 4 16 4 16 8 Z" fill="#ffffff" />
                  <circle cx="12" cy="9" r="3.5" fill="#fbcfe8" />
                  <rect x="9" y="9" width="6" height="3" rx="1" fill="#ffffff" />
                  <path d="M5 20c0-3.5 3-6 7-6s7 2.5 6 6" fill="#ffffff" />
                </svg>
              </div>
              <span className="hims-tile-label">CSSD</span>
            </div>

            {/* Col 4: 3D Light Green Tile - Nursing Care (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-lightgreen hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Nursing')}
              title="Nursing Care & Vitals Station (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <div className="hims-tile-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
                  <path d="M9 5 L15 5 L14 7 L10 7 Z" fill="#ffffff" />
                  <path d="M11.5 5.5 v2 M10.5 6.5 h2" stroke="#dc2626" strokeWidth="1.8" />
                  <circle cx="12" cy="10" r="3.5" fill="#ffffff" />
                  <path d="M6 21c0-3.5 2.5-6 6-6s6 2.5 6 6" fill="#ffffff" />
                </svg>
              </div>
              <span className="hims-tile-label">Nursing</span>
            </div>

            {/* Col 5: Photo Tile - Operations Strategy Puzzle (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-img hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Operations')}
              title="Operations & Administration (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <img src="./tile_puzzle.jpg" alt="Operations" className="hims-tile-photo" />
              <div className="hims-tile-glass-tag">OPERATIONS</div>
            </div>

            {/* Col 6: 3D Purple Tile - Human Resource (READ ONLY) */}
            <div 
              className="hims-tile hims-tile-3d hims-tile-purple hims-tile-readonly" 
              onClick={() => handleReadOnlyClick('Human Resource')}
              title="Human Resources & Personnel (Read-Only module)"
            >
              <span className="hims-tile-readonly-pill">Read Only</span>
              <div className="hims-tile-icon-wrap">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="3.5" fill="#ffffff" />
                  <path d="M7 19c0-2.8 2.2-5 5-5s5 2.2 5 5" fill="#ffffff" />
                  <circle cx="5" cy="9" r="2.2" fill="rgba(255,255,255,0.75)" />
                  <path d="M1 19c0-2.2 1.8-4 4-4 .8 0 1.5.2 2.2.6-.7 1-.9 2.2-.9 3.4" fill="rgba(255,255,255,0.75)" />
                  <circle cx="19" cy="9" r="2.2" fill="rgba(255,255,255,0.75)" />
                  <path d="M17.7 15.6c.7-.4 1.4-.6 2.3-.6 2.2 0 4 1.8 4 4h-5.4c0-1.2-.2-2.4-.9-3.4" fill="rgba(255,255,255,0.75)" />
                </svg>
              </div>
              <span className="hims-tile-label">Human Resource</span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer Bar */}
      <footer className="atri-footer-bar">
        <span>Developed and Supported by : </span>
        <a href="mailto:info@atribiz.com" className="atri-footer-highlight">AtriBiz Solutions LLP</a>
        <span>, info@atribiz.com, Phone: +91 7995881582.</span>
      </footer>
    </div>
  );
}
