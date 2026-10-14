import React, { useState } from 'react';

// AtriBiz AB Logo Vector Component
export function AtriBizLogo({ width = 120, height = 62 }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 170 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="atri-logo-svg"
      style={{ display: 'block', margin: '0 auto' }}
    >
      {/* Top Blue Orbital Ellipse Arc */}
      <path 
        d="M 18 42 C 16 18, 52 8, 96 8 C 132 8, 156 18, 158 32" 
        stroke="#0284c7" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Bottom Red Orbital Ellipse Arc */}
      <path 
        d="M 154 44 C 154 66, 118 76, 76 76 C 36 76, 16 66, 14 52" 
        stroke="#dc2626" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Red Letter 'A' */}
      <text 
        x="42" 
        y="58" 
        fontFamily="'Arial Black', Impact, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fontStyle="italic"
        fill="#dc2626"
        letterSpacing="-2"
      >
        A
      </text>
      {/* Blue Letter 'B' */}
      <text 
        x="80" 
        y="58" 
        fontFamily="'Arial Black', Impact, sans-serif" 
        fontSize="48" 
        fontWeight="900" 
        fontStyle="italic"
        fill="#0284c7"
      >
        B
      </text>
      {/* Sharp Black Checkmark Sweeping Through */}
      <path 
        d="M 32 46 L 55 64 L 126 18" 
        stroke="#0f172a" 
        strokeWidth="6.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  );
}

const ROLES = [
  { id: 'admin', label: 'Admin', icon: '🛡️', user: 'admin', color: '#0284c7', desc: 'System Administrator' },
  { id: 'doctor', label: 'Doctors', icon: '🩺', user: 'dr.madam', color: '#059669', desc: 'Chief & Consultant Doctors' },
  { id: 'sister', label: 'Sisters', icon: '👩‍⚕️', user: 'sister', color: '#ec4899', desc: 'Nursing & Ward Stations' },
  { id: 'reception', label: 'Receptionist', icon: '📋', user: 'reception', color: '#7c3aed', desc: 'OP Registration Desk' },
  { id: 'ot', label: 'Operation Theater', icon: '🏥', user: 'ot.lead', color: '#f59e0b', desc: 'OT & Surgical Suites' },
  { id: 'billing', label: 'Billing', icon: '💳', user: 'billing', color: '#10b981', desc: 'Billing & Cashless TPA' },
  { id: 'pharmacy', label: 'Pharmacy', icon: '💊', user: 'pharmacy', color: '#ea580c', desc: 'Central Pharmacy' }
];

export function LoginPage({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotMsg, setShowForgotMsg] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectRole = (role) => {
    if (!role) return;
    setSelectedRole(role.id);
    setUsername(role.user);
    setPassword('admin');
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setLoading(true);

    const activeRoleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];

    setTimeout(() => {
      setLoading(false);
      onLogin({
        id: `HIMS-${activeRoleObj.id.toUpperCase()}-01`,
        role: activeRoleObj.id,
        roleName: activeRoleObj.desc,
        badgeColor: activeRoleObj.color,
        icon: activeRoleObj.icon,
        name: username || 'Administrator',
        qualification: activeRoleObj.desc,
        department: 'INDUS HEALTH CITY HIMS',
        initialTab: 'overview',
        email: `${activeRoleObj.id}@healthcity.com`
      });
    }, 400);
  };

  return (
    <div className="atri-login-screen">
      {/* Background Animated Ambient Glowing Orbs */}
      <div className="login-ambient-orb orb-1" />
      <div className="login-ambient-orb orb-2" />

      {/* Left Scenery: Indus Hospital Building (Original High-Res, Clean Pure Photo) */}
      <div className="atri-scenery-hospital">
        <div className="scenery-card-frame hospital-frame">
          <img 
            src="./hospital_building.png?v=20261014indus" 
            alt="Indus Hospital Building" 
            className="atri-scenery-hospital-img" 
            onError={(e) => { e.currentTarget.src = './hospital_building.jpg'; }}
          />
        </div>
      </div>

      {/* Right Scenery: Madam Doctor Photo (Original High-Res, Clean Pure Photo) */}
      <div className="atri-scenery-doctor">
        <div className="scenery-card-frame doctor-frame">
          <img 
            src="./doctor_profile.png?v=20261014madam" 
            alt="Doctor Madam" 
            className="atri-scenery-doctor-img" 
            onError={(e) => { e.currentTarget.src = './doctor_profile.jpg'; }}
          />
        </div>
      </div>

      {/* Center Healthcare Unity Tree & Authentication Pod */}
      <div className="unity-tree-wrapper">
        {/* Healthcare Unity Tree Canopy & Department Emblem */}
        <div className="unity-tree-emblem">
          <div className="unity-tree-crest">
            <span className="unity-tree-icon">🌳</span>
            <div className="unity-tree-title-group">
              <span className="unity-tree-headline">HEALTHCARE UNITY TREE</span>
              <span className="unity-tree-motto">One Tree • United Departments • Compassionate Healing</span>
            </div>
            <span className="unity-tree-leaf">🌿</span>
          </div>
        </div>

        {/* Unity Tree Wings Layout: Flanking Department Branches & Login Pod */}
        <div className="unity-tree-wings">
          {/* Left Branch Wing: Doctors, Sisters, Operation Theater */}
          <div className="unity-tree-wing left-wing">
            <div 
              className={`unity-branch-chip ${selectedRole === 'doctor' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'doctor'))}
              title="Click to select Doctors Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">🩺</span>
              <div className="branch-info">
                <strong>DOCTORS</strong>
                <small>Consultants & Specialists</small>
              </div>
            </div>

            <div 
              className={`unity-branch-chip ${selectedRole === 'sister' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'sister'))}
              title="Click to select Sisters (Nursing) Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">👩‍⚕️</span>
              <div className="branch-info">
                <strong>SISTERS</strong>
                <small>Compassionate Nursing</small>
              </div>
            </div>

            <div 
              className={`unity-branch-chip ${selectedRole === 'ot' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'ot'))}
              title="Click to select Operation Theater Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">🏥</span>
              <div className="branch-info">
                <strong>OPERATION THEATER</strong>
                <small>Surgeons & Sterile OT</small>
              </div>
            </div>
          </div>

          {/* Main Centered Login Pod Widget */}
          <div className="atri-login-container">
            {/* Top Header Plate with Logo */}
            <div className="atri-card-top-cap">
              <AtriBizLogo width={120} height={58} />
            </div>

            {/* Circular / Rounded Dark Slate Pod */}
            <div className="atri-card-dark-pod">
              {/* Interactive Role Switcher Chips */}
              <div className="login-role-selector">
                <span className="login-role-hint">Quick Role Select:</span>
                <div className="login-role-chips">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`login-role-chip ${selectedRole === r.id ? 'active' : ''}`}
                      onClick={() => selectRole(r)}
                      title={`Switch to ${r.label}`}
                    >
                      <span className="role-chip-icon">{r.icon}</span>
                      <span className="role-chip-label">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="atri-form" autoComplete="off">
                <div className="atri-input-box">
                  <span className="input-prefix-icon">👤</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username or Email"
                    className="atri-field"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                  />
                </div>

                <div className="atri-input-box password-box">
                  <span className="input-prefix-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="atri-field"
                    autoComplete="off"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>

                <div className="atri-forgot-row">
                  <button
                    type="button"
                    className="atri-forgot-link"
                    onClick={() => setShowForgotMsg(!showForgotMsg)}
                  >
                    Forgot Password ?
                  </button>
                </div>

                {showForgotMsg && (
                  <div className="atri-forgot-popover">
                    <span>Contact IT Support: <strong>+91 7995881582</strong> or <strong>info@atribiz.com</strong></span>
                  </div>
                )}

                <div className="atri-btn-row">
                  <button 
                    type="submit" 
                    className="atri-login-btn effect-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="btn-loading-wrap">
                        <span className="btn-spinner" />
                        <span>AUTHENTICATING...</span>
                      </span>
                    ) : (
                      <span>LOGIN TO HIMS</span>
                    )}
                  </button>
                </div>

                {/* Live Security Badge */}
                <div className="login-security-badge">
                  <span className="security-pulse-dot" />
                  <span>256-Bit SSL Encrypted • Spring Boot &amp; MySQL Connected</span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Branch Wing: Receptionist, Billing, Pharmacy */}
          <div className="unity-tree-wing right-wing">
            <div 
              className={`unity-branch-chip ${selectedRole === 'reception' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'reception'))}
              title="Click to select Receptionist Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">📋</span>
              <div className="branch-info">
                <strong>RECEPTIONIST</strong>
                <small>OP Desk &amp; Registration</small>
              </div>
            </div>

            <div 
              className={`unity-branch-chip ${selectedRole === 'billing' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'billing'))}
              title="Click to select Billing &amp; TPA Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">💳</span>
              <div className="branch-info">
                <strong>BILLING</strong>
                <small>Cashless TPA &amp; Invoices</small>
              </div>
            </div>

            <div 
              className={`unity-branch-chip ${selectedRole === 'pharmacy' ? 'active' : ''}`}
              onClick={() => selectRole(ROLES.find(r => r.id === 'pharmacy'))}
              title="Click to select Pharmacy Department"
            >
              <span className="branch-leaf">🌿</span>
              <span className="branch-icon">💊</span>
              <div className="branch-info">
                <strong>PHARMACY</strong>
                <small>24/7 Dispensary &amp; Stock</small>
              </div>
            </div>
          </div>
        </div>

        {/* Unity Tree Root Crest */}
        <div className="unity-tree-root-crest">
          <span className="unity-badge-symbol">🌱</span>
          <span>INDUS HEALTH CITY • ONE TREE, ALL ROLES UNITED FOR HEALING</span>
          <span className="unity-badge-symbol">🌱</span>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <footer className="atri-footer-bar">
        <span>Developed and Supported by : </span>
        <a href="mailto:info@atribiz.com" className="atri-footer-highlight">AtriBiz Solutions LLP</a>
        <span>, info@atribiz.com, Phone: +91 7995881582.</span>
      </footer>
    </div>
  );
}
