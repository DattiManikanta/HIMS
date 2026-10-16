import React, { useState } from 'react';
import { AtriBizLogo } from './LoginPage.jsx';

export function LeftSidebar({ 
  isExpanded, 
  onToggleExpand, 
  activeSubTab, 
  onSelectSubTab, 
  onGoHome,
  onLogout 
}) {
  // Accordion state: Patient Management expanded by default
  const [isPatientMgmtOpen, setIsPatientMgmtOpen] = useState(true);

  // Toggle Patient Management
  const handleTogglePatientMgmt = () => {
    if (!isExpanded && onToggleExpand) {
      onToggleExpand(); // Auto expand sidebar if collapsed
      setIsPatientMgmtOpen(true);
    } else {
      setIsPatientMgmtOpen(prev => !prev);
    }
  };

  const isOutPatientActive = activeSubTab === 'appointments' || activeSubTab === 'add_appointment';

  return (
    <aside className={`hims-left-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Top Logo & Toggle Header */}
      <div className="sidebar-top-cap">
        <div className="sidebar-logo-wrap" title="INDUS HEALTH CITY">
          <AtriBizLogo width={isExpanded ? 70 : 38} height={isExpanded ? 36 : 20} />
        </div>
        <button 
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleExpand}
          title={isExpanded ? "Collapse Left Menu" : "Expand Left Menu"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu: Home Dashboard + Patient Management */}
      <nav className="sidebar-nav">
        {/* Home Dashboard Link */}
        <div className="sidebar-menu-group" style={{ marginBottom: '8px' }}>
          <button
            type="button"
            className="sidebar-nav-item"
            onClick={onGoHome}
            title="Go to Home Dashboard (Metro JSP)"
            style={{
              background: 'linear-gradient(90deg, rgba(2, 132, 199, 0.18) 0%, rgba(2, 132, 199, 0.04) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              borderRadius: '8px',
              color: '#38bdf8'
            }}
          >
            <div className="sidebar-icon-wrap" style={{ color: '#38bdf8' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            {isExpanded && (
              <div className="sidebar-item-text">
                <span className="sidebar-item-title" style={{ color: '#ffffff', fontWeight: 700 }}>Home Dashboard</span>
                <span className="sidebar-item-sub" style={{ color: '#7dd3fc' }}>Metro Tiles Screen</span>
              </div>
            )}
          </button>
        </div>

        
        {/* Main Item: Patient Management */}
        <div className="sidebar-menu-group">
          <button
            type="button"
            className={`sidebar-nav-item parent-item ${isOutPatientActive ? 'parent-active' : ''}`}
            onClick={handleTogglePatientMgmt}
            title="Patient Management"
          >
            <div className="sidebar-icon-wrap" style={{ color: isOutPatientActive ? '#38bdf8' : '#94a3b8' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            
            {isExpanded && (
              <>
                <div className="sidebar-item-text" style={{ flex: 1 }}>
                  <span className="sidebar-item-title">Patient Management</span>
                  <span className="sidebar-item-sub">OPD Patient Services</span>
                </div>
                <div className="sidebar-arrow-wrap" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ 
                      transform: isPatientMgmtOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </>
            )}
          </button>

          {/* Submenu: Out Patient -> Patient Registration (ONLY ONE, no appointment list / add appointment) */}
          {isExpanded && isPatientMgmtOpen && (
            <div className="sidebar-submenu-container">
              <div className="sidebar-outpatient-box">
                {/* Out Patient Label */}
                <div className="sidebar-outpatient-heading">
                  <span className="sub-icon-bullet">🏥</span>
                  <span className="outpatient-lbl">Out Patient</span>
                </div>

                {/* ONLY ONE: Patient Registration */}
                <div className="sidebar-single-item-wrap">
                  <button
                    type="button"
                    className={`sidebar-tab-link single-patient-reg-btn ${isOutPatientActive ? 'active-tab' : ''}`}
                    onClick={() => {
                      if (onSelectSubTab) onSelectSubTab('appointments');
                    }}
                    title="Patient Registration"
                  >
                    <span className="tab-bullet-dot">📋</span>
                    <span className="patient-reg-text">Patient Registration</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </nav>

      {/* Bottom Sign Out Button */}
      <div className="sidebar-bottom-action">
        <button
          type="button"
          className="sidebar-nav-item logout"
          onClick={onLogout}
          title="Sign Out from System"
        >
          <div className="sidebar-icon-wrap" style={{ color: '#ef4444' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          {isExpanded && (
            <div className="sidebar-item-text">
              <span className="sidebar-item-title" style={{ color: '#ef4444' }}>Sign Out</span>
              <span className="sidebar-item-sub">Exit to Login</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
