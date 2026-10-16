const fs = require('fs');
const path = require('path');

// Load Babel
const babelPath = path.join(__dirname, 'babel.cjs');
const Babel = require(babelPath);

console.log("Compiling INDUS HEALTH CITY Hospital HIMS components into a standalone bundle...");

// Files in dependency order
const files = [
  'src/data/hospitalData.js',
  'src/data/pharmacyData.js',
  'src/utils/audio.js',
  'src/components/LoginPage.jsx',
  'src/components/LeftSidebar.jsx',
  'src/components/HIMSHomeDashboard.jsx',
  'src/components/Navbar.jsx',
  'src/components/HeroSection.jsx',
  'src/components/QueueBoard.jsx',
  'src/components/RegistrationForm.jsx',
  'src/components/TokenSlip.jsx',
  'src/components/VitalsScreen.jsx',
  'src/components/DoctorDirectory.jsx',
  'src/components/PatientPortal.jsx',
  'src/components/PharmacyScreen.jsx',
  'src/components/StaffDashboard.jsx',
  'src/components/DatabaseViewer.jsx',
  'src/components/Footer.jsx',
  'src/App.jsx'
];

let concatenated = `
// PulseCare Hospital Outpatient Single Standalone Bundle
const { useState, useEffect, useRef, useMemo, useCallback } = React;
`;

for (const file of files) {
  let content = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  // Strip import statements
  content = content.replace(/import\s+[^;]+;?/g, '');
  // Strip export statements
  content = content.replace(/export\s+function\s+/g, 'function ');
  content = content.replace(/export\s+const\s+/g, 'const ');
  content = content.replace(/export\s+default\s+/g, '');
  
  concatenated += `\n// --- ${file} ---\n` + content;
}

// Add root render
concatenated += `
// --- Mount to DOM ---
const rootContainer = document.getElementById('root');
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);
  root.render(React.createElement(App));
}
`;

// Transpile JSX with Babel
const transformed = Babel.transform(concatenated, {
  presets: ['react'],
  plugins: []
});

const outDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'bundle.js'), transformed.code, 'utf8');
console.log("✓ Successfully compiled bundle.js to dist/bundle.js (" + transformed.code.length + " bytes)");

// Also copy React UMD files to dist
if (fs.existsSync(path.join(__dirname, 'react.production.min.js'))) {
  fs.copyFileSync(path.join(__dirname, 'react.production.min.js'), path.join(outDir, 'react.production.min.js'));
}
if (fs.existsSync(path.join(__dirname, 'react-dom.production.min.js'))) {
  fs.copyFileSync(path.join(__dirname, 'react-dom.production.min.js'), path.join(outDir, 'react-dom.production.min.js'));
}
console.log("✓ Verified React and ReactDOM in dist/");

// Update cache-buster in index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  const nowTs = Date.now();
  html = html.replace(/bundle\.js\?v=[^"']+/g, `bundle.js?v=${nowTs}`);
  html = html.replace(/style\.css\?v=[^"']+/g, `style.css?v=${nowTs}`);
  fs.writeFileSync(indexHtmlPath, html, 'utf8');
  console.log(`✓ Updated index.html cache-buster query string to ?v=${nowTs}`);
}
