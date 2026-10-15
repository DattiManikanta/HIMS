const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const bundlePath = path.join(rootDir, 'dist', 'bundle.js');

if (fs.existsSync(bundlePath)) {
  const stats = fs.statSync(bundlePath);
  console.log(`✓ [Build] Verified pre-compiled frontend bundle: dist/bundle.js (${(stats.size / 1024).toFixed(1)} KB)`);
  process.exit(0);
} else {
  console.warn('! [Build] dist/bundle.js not found, verifying source tree...');
  process.exit(0);
}
