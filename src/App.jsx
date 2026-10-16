import React, { useState, useEffect } from 'react';
import { initialDepartments, doctorsRoster, mockOPRecords } from './data/hospitalData.js';
import { LoginPage } from './components/LoginPage.jsx';
import { HIMSHomeDashboard } from './components/HIMSHomeDashboard.jsx';
import { LeftSidebar } from './components/LeftSidebar.jsx';
import { RegistrationForm } from './components/RegistrationForm.jsx';
import { DatabaseViewer } from './components/DatabaseViewer.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('HIMS ErrorBoundary caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '30px', maxWidth: '520px', margin: '60px auto', background: '#ffffff', borderRadius: '12px', boxShadow: '0 12px 36px rgba(0,0,0,0.18)', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '12px' }}>🏥</div>
          <h2 style={{ color: '#0f172a', margin: '0 0 10px', fontSize: '1.25rem' }}>ATRI HIMS Notice</h2>
          <p style={{ color: '#64748b', fontSize: '13px', lineHeight: '1.5', marginBottom: '20px' }}>
            {this.state.error?.message || 'A temporary rendering error occurred. Click below to reload.'}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => { localStorage.clear(); window.location.reload(); }}
              style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
            >
              Reset to Login & Reload
            </button>
            <button 
              onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
              style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '9px 18px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  // Authentication State: persist in localStorage so refresh never logs the user out!
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('atri_hims_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Current Screen / View: 'home' (Home JSP) or 'patient_management' (Registration & Outpatient Desk)
  // Always defaults to 'home' (Home JSP) so users land on the Metro Tile dashboard immediately after login!
  const [currentView, setCurrentView] = useState('home');

  // Active Tab inside Patient Registration: 'appointments' (Tab 1) or 'add_appointment' (Tab 2)
  const [activeRegTab, setActiveRegTab] = useState(() => {
    try {
      return localStorage.getItem('atri_hims_active_tab') || 'appointments';
    } catch (e) {
      return 'appointments';
    }
  });
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showDatabaseView, setShowDatabaseView] = useState(false);
  
  const [loginTime, setLoginTime] = useState(() => {
    try {
      const savedTime = localStorage.getItem('atri_hims_logintime');
      if (savedTime) return savedTime;
    } catch (e) {}
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  });

  const [departments, setDepartments] = useState(initialDepartments);
  const [doctors] = useState(doctorsRoster);
  const [records, setRecords] = useState({});
  const [tokenCounter, setTokenCounter] = useState(120);

  // Hospital Database State (MySQL at_hospital via JDBC)
  const [postgresStatus, setPostgresStatus] = useState({
    postgres_connected: false,
    database_connected: false,
    db_engine: 'mysql',
    postgres_host: '192.168.1.103',
    postgres_port: 3306,
    postgres_database: 'at_hospital',
    postgres_user: 'himsd',
    jdbc_url: 'jdbc:mysql://192.168.1.103:3306/at_hospital?allowMultiQueries=true',
    total_patients: 0,
    last_error: null
  });
  const [showPostgresModal, setShowPostgresModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleTabChange = (tab) => {
    setActiveRegTab(tab);
    try {
      localStorage.setItem('atri_hims_active_tab', tab);
    } catch (e) {}
  };

  // Sync with PostgreSQL Backend on Load & Periodic Health Check
  const checkPostgresHealth = () => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => {
        setPostgresStatus(data);
      })
      .catch(err => {
        setPostgresStatus(prev => ({
          ...prev,
          postgres_connected: false,
          last_error: 'Backend API unreachable'
        }));
      });
  };

  useEffect(() => {
    // Initial health check
    checkPostgresHealth();

    // Fetch persisted records from PostgreSQL / Backend
    fetch('/api/records')
      .then(r => r.json())
      .then(serverRecords => {
        if (serverRecords && Object.keys(serverRecords).length > 0) {
          setRecords(prev => ({
            ...prev,
            ...serverRecords
          }));
        }
      })
      .catch(err => console.warn('Could not load initial records from API:', err));

    // Periodic check every 15 seconds
    const interval = setInterval(checkPostgresHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  // Authentication Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView('home');
    try {
      localStorage.setItem('atri_hims_user', JSON.stringify(user));
      localStorage.setItem('atri_hims_current_view', 'home');
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      setLoginTime(formatted);
      localStorage.setItem('atri_hims_logintime', formatted);
      localStorage.setItem('atri_hims_active_tab', 'appointments');
    } catch (e) {}
    setActiveRegTab('appointments');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
    try {
      localStorage.removeItem('atri_hims_user');
      localStorage.removeItem('atri_hims_active_tab');
      localStorage.removeItem('atri_hims_logintime');
      localStorage.removeItem('atri_hims_current_view');
    } catch (e) {}
    setActiveRegTab('appointments');
    setShowDatabaseView(false);
  };

  // Add new Outpatient registration & persist to PostgreSQL
  const handleRegisterSuccess = (formData) => {
    const nextNum = tokenCounter + 1;
    setTokenCounter(nextNum);

    const generatedToken = formData.token || `OPD-${nextNum}`;
    const generatedOpId = formData.opId || `UMR${334250 + nextNum}`;

    const newRecord = {
      token: generatedToken,
      opId: generatedOpId,
      patientName: formData.patientName,
      age: Number(formData.age),
      gender: formData.gender,
      phone: formData.phone,
      bloodGroup: formData.bloodGroup,
      department: formData.departmentName,
      departmentCode: formData.departmentCode,
      doctor: formData.doctor,
      room: formData.room,
      payment: formData.payment,
      visitDate: formData.visitDate || '08-Oct-2026',
      visitType: 'OPD Consultation',
      vitals: formData.vitals || {
        bp: '120/80 mmHg',
        pulse: '74 bpm',
        spo2: '99%',
        temp: '98.6 °F',
        weight: '65 kg'
      },
      symptoms: formData.symptoms || 'General Outpatient checkup and clinical evaluation.',
      diagnosis: 'Clinical Consultation in Progress (Initial OP Intake)',
      prescription: [],
      recommendedTests: [],
      doctorNotes: `Registered at OP Desk. Consultant: ${formData.doctor}.`
    };

    setRecords(prev => ({
      ...prev,
      [generatedToken]: newRecord
    }));

    // Already saved directly to database in RegistrationForm.jsx
    showToast(`✓ Registered: ${newRecord.patientName} (${generatedOpId})`);
  };

  // 1. If user is NOT logged in: Show starting Login Screen ("LOGIN JSP")
  if (!currentUser) {
    return (
      <ErrorBoundary>
        <LoginPage 
          onLogin={handleLogin} 
        />
      </ErrorBoundary>
    );
  }

  // 2. If logged in and on Home view: Show Home Dashboard ("HOME JSP")
  if (currentView === 'home') {
    return (
      <ErrorBoundary>
        <HIMSHomeDashboard 
          onSelectModule={(mod) => {
            setCurrentView('patient_management');
            try {
              localStorage.setItem('atri_hims_current_view', 'patient_management');
            } catch (e) {}
          }}
          onLogout={handleLogout}
        />
      </ErrorBoundary>
    );
  }

  // 3. Logged in and on Patient Management: Render the Outpatient application with the Left Menu!
  return (
    <ErrorBoundary>
      <div className="hims-app-layout">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="hims-toast-notification">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}

      {/* PostgreSQL Diagnostics Modal */}
      {showPostgresModal && (
        <div className="hims-modal-overlay">
          <div className="hims-diag-modal">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>🐘</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                    PostgreSQL Database Storage
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                    ATRI HIMS Data Persistence Engine
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowPostgresModal(false)}
                className="modal-close-btn"
              >✕</button>
            </div>

            {/* Status Card */}
            <div style={{
              background: postgresStatus.postgres_connected ? '#f0fdf4' : '#fffbeb',
              border: `1.5px solid ${postgresStatus.postgres_connected ? '#86efac' : '#fde68a'}`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: postgresStatus.postgres_connected ? '#16a34a' : '#d97706',
                  display: 'inline-block'
                }}></span>
                <strong style={{ color: postgresStatus.postgres_connected ? '#15803d' : '#b45309', fontSize: '0.95rem' }}>
                  {postgresStatus.postgres_connected ? 'PostgreSQL Connected & Active' : 'PostgreSQL Server Offline (Using Local Cache)'}
                </strong>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                {postgresStatus.postgres_connected 
                  ? 'All newly registered patients, appointments, vitals, and fees are persisted directly into PostgreSQL tables!' 
                  : 'Backend is safely persisting records in local storage cache with zero data loss. Connects automatically to PostgreSQL on localhost:5432.'}
              </div>
            </div>

            {/* Connection Details */}
            <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px', marginBottom: '18px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Host & Port:</span>
                <strong style={{ fontFamily: 'monospace' }}>{postgresStatus.postgres_host}:{postgresStatus.postgres_port}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Database Name:</span>
                <strong style={{ fontFamily: 'monospace' }}>{postgresStatus.postgres_database}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Total Patients Saved:</span>
                <strong style={{ color: '#0284c7' }}>{postgresStatus.total_patients} Patients</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Config:</span>
                <strong style={{ fontFamily: 'monospace' }}>.env (PGHOST, PGUSER, PGPASSWORD)</strong>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={checkPostgresHealth}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                🔄 Test Connection
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowPostgresModal(false)}
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Menu Sidebar (Matching Screenshot 1 & 2) */}
      <LeftSidebar 
        isExpanded={isSidebarExpanded}
        onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
        activeSubTab={activeRegTab}
        onSelectSubTab={(tabId) => {
          setShowDatabaseView(false);
          if (tabId === 'appointments' || tabId === 'add_appointment') {
            handleTabChange(tabId);
          } else if (tabId === 'out_patient') {
            handleTabChange('appointments');
          }
        }}
        onGoHome={() => {
          setCurrentView('home');
          try {
            localStorage.setItem('atri_hims_current_view', 'home');
          } catch (e) {}
        }}
        onOpenDatabase={() => setShowPostgresModal(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="hims-main-viewport">
        {/* Top Navbar Matching Screenshot 1 & 2 */}
        <header className="hims-top-navbar">
          <div className="top-nav-left">
            <button 
              type="button" 
              className="top-hamburger-btn" 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              title="Toggle Left Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="top-facility-name">INDUS HEALTH CITY</span>
          </div>

          <div className="top-nav-center">
            <span className="top-nav-title">Patient Registration</span>
          </div>

          <div className="top-nav-right">
            {/* Quick Home Dashboard Navigation Button */}
            <button
              type="button"
              className="top-home-nav-btn"
              onClick={() => {
                setCurrentView('home');
                try {
                  localStorage.setItem('atri_hims_current_view', 'home');
                } catch (e) {}
              }}
              title="Return to Home Dashboard (Metro JSP)"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
                border: '1.5px solid #94a3b8',
                borderRadius: '6px',
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: '700',
                color: '#0284c7',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
              }}
            >
              <span style={{ fontSize: '14px' }}>🏠</span> Home Dashboard
            </button>


            <div className="top-login-time">
              LogInTime: <span className="time-val">{loginTime || '2026-10-08 11:26:13'}</span>
            </div>



            {/* Bell Icon */}
            <button 
              type="button" 
              className="top-action-icon" 
              onClick={() => showToast('All systems running smoothly.')}
              title="Notifications"
            >
              🔔
            </button>

            {/* Admin Profile Chip */}
            <div className="top-user-chip">
              <span className="user-icon">👤</span>
              <strong className="user-name">{currentUser?.name || 'admin'}</strong>
              <button 
                type="button" 
                className="top-signout-btn" 
                onClick={handleLogout}
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main View: Patient Registration or Database Viewer */}
        <main className="hims-content-area">
          {showDatabaseView ? (
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ color: '#0f172a', margin: 0 }}>🐘 PostgreSQL Database Viewer</h2>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setShowDatabaseView(false)}
                >
                  ← Back to Patient Registration
                </button>
              </div>
              <DatabaseViewer 
                postgresStatus={postgresStatus}
                onRefreshStatus={(data) => setPostgresStatus(data)}
              />
            </div>
          ) : (
            <RegistrationForm 
              departments={departments}
              doctors={doctors}
              records={records}
              activeTab={activeRegTab}
              onTabChange={handleTabChange}
              onRegisterSuccess={handleRegisterSuccess}
              onGoToVitals={(token) => {
                handleTabChange('appointments');
              }}
            />
          )}
        </main>
      </div>
    </div>
    </ErrorBoundary>
  );
}
