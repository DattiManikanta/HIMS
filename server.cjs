const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// Auto-spawn Spring Boot / Python backend if not running
function ensureBackendRunning() {
  const testReq = http.get(`http://127.0.0.1:${BACKEND_PORT}/api/health`, (res) => {
    // Backend is already alive
    console.log(`[Proxy] Spring Boot / HIMS API backend is actively responding on port ${BACKEND_PORT}.`);
  });

  testReq.on('error', () => {
    const jarPath = path.join(ROOT, 'backend-spring', 'target', 'healthcity-backend-1.0.0.jar');
    if (fs.existsSync(jarPath)) {
      console.log(`[Launcher] Starting Spring Boot MySQL backend from ${jarPath} on port ${BACKEND_PORT}...`);
      const javaArgs = process.env.JAVA_OPTS 
        ? process.env.JAVA_OPTS.split(' ').concat(['-jar', jarPath])
        : ['-Xmx256m', '-XX:+UseSerialGC', '-jar', jarPath];
      const javaProc = spawn('java', javaArgs, {
        cwd: ROOT,
        stdio: 'inherit',
        detached: false
      });

      javaProc.on('error', (err) => {
        console.warn(`[Launcher] Warning: Could not auto-launch Spring Boot JAR: ${err.message}`);
      });
    } else {
      console.log(`[Launcher] Starting Python backend on port ${BACKEND_PORT}...`);
      const pyCmd = process.platform === 'win32' ? 'py' : 'python3';
      const pyProc = spawn(pyCmd, ['backend.py'], {
        cwd: ROOT,
        stdio: 'inherit',
        detached: false
      });

      pyProc.on('error', (err) => {
        console.warn(`[Launcher] Warning: Could not auto-launch '${pyCmd} backend.py': ${err.message}`);
      });
    }
  });
}

ensureBackendRunning();

// Auto-Sync from GitHub (checks every 60 seconds if code was pushed from another system)
function syncFromGitHub(callback) {
  const gitCmd = fs.existsSync(path.join(ROOT, 'tools', 'git', 'cmd', 'git.exe'))
    ? path.join(ROOT, 'tools', 'git', 'cmd', 'git.exe')
    : 'git';
  const { exec } = require('child_process');

  exec(`"${gitCmd}" fetch origin main`, { cwd: ROOT }, (err) => {
    if (err) {
      if (callback) callback({ success: false, error: err.message });
      return;
    }

    exec(`"${gitCmd}" rev-list HEAD..origin/main --count`, { cwd: ROOT }, (err2, stdout) => {
      if (err2) {
        if (callback) callback({ success: false, error: err2.message });
        return;
      }

      const behindCount = parseInt((stdout || '').trim(), 10) || 0;
      if (behindCount > 0) {
        console.log(`[Auto-Sync] Found ${behindCount} new commit(s) on GitHub! Automatically retrieving into this system...`);
        exec(`"${gitCmd}" pull origin main`, { cwd: ROOT }, (err3, pullOut) => {
          if (err3) {
            console.warn(`[Auto-Sync] Pull warning: ${err3.message}`);
            if (callback) callback({ success: false, error: err3.message });
            return;
          }

          console.log(`[Auto-Sync] Code successfully synchronized with your other system:\n${pullOut.trim()}`);
          
          const buildScript = path.join(ROOT, 'tools', 'build.cjs');
          if (fs.existsSync(buildScript)) {
            exec(`node "${buildScript}"`, { cwd: ROOT });
          }

          if (callback) callback({ success: true, updated: true, commitsPulled: behindCount, details: pullOut.trim() });
        });
      } else {
        if (callback) callback({ success: true, updated: false, message: 'Already up to date with GitHub.' });
      }
    });
  });
}

// Background auto-sync check every 60 seconds
setTimeout(() => {
  syncFromGitHub();
  setInterval(() => syncFromGitHub(), 60 * 1000);
}, 3000);

// Reverse proxy /api/* requests to Flask backend
function proxyApiRequest(req, res) {
  const options = {
    hostname: '127.0.0.1',
    port: BACKEND_PORT,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: `127.0.0.1:${BACKEND_PORT}`
    }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, {
      ...proxyRes.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error(`[Proxy Error] Failed to proxy to backend: ${err.message}`);
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Backend API service unavailable',
      message: err.message,
      suggestion: 'Ensure py backend.py is running on port 5000'
    }));
  });

  req.pipe(proxyReq);
}

const server = http.createServer((req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Handle GitHub Sync Routes directly
  if (pathname === '/api/sync/pull' || pathname === '/api/sync/status') {
    return syncFromGitHub((result) => {
      res.writeHead(200, { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(JSON.stringify(result));
    });
  }

  // Forward /api and /patient routes to backend
  if (pathname.startsWith('/api/') || pathname.startsWith('/patient/')) {
    return proxyApiRequest(req, res);
  }

  const os = require('os');
  function getLocalIps() {
    const interfaces = os.networkInterfaces();
    const ips = [];
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          ips.push(net.address);
        }
      }
    }
    return ips;
  }

  // QR Code / Mobile Helper Route
  if (pathname === '/mobile' || pathname === '/qr') {
    const ips = getLocalIps();
    const primaryIp = ips[0] || '10.150.250.111';
    const mobileUrl = `http://${primaryIp}:${PORT}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(mobileUrl)}`;
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile &amp; Other Laptop Access - INDUS HEALTH CITY</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; box-sizing: border-box; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 32px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    h1 { font-size: 1.4rem; margin: 0 0 8px; color: #38bdf8; }
    p { color: #94a3b8; font-size: 0.95rem; margin: 0 0 24px; line-height: 1.5; }
    .qr-box { background: white; padding: 16px; border-radius: 16px; display: inline-block; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .qr-box img { display: block; border-radius: 8px; width: 220px; height: 220px; }
    .url-box { background: #0f172a; border: 1px solid #38bdf8; color: #38bdf8; padding: 12px 16px; border-radius: 12px; font-family: monospace; font-size: 1.05rem; font-weight: bold; word-break: break-all; margin-bottom: 16px; }
    .btn { display: inline-block; background: #0284c7; color: white; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 0.95rem; transition: background 0.2s; }
    .btn:hover { background: #0369a1; }
    .note { font-size: 0.8rem; color: #64748b; margin-top: 20px; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="card">
    <h1>📱 Connect Phone / Other Laptop</h1>
    <p>Scan this QR code with your phone camera, or open the link below on any laptop or phone connected to the same Wi-Fi:</p>
    <div class="qr-box">
      <img src="${qrUrl}" alt="Scan QR Code to open on phone">
    </div>
    <div class="url-box">${mobileUrl}</div>
    <a href="${mobileUrl}" class="btn" target="_blank">Open App</a>
    <div class="note">
      Ensure your phone or other laptop is connected to the same Wi-Fi / network.<br>
      To open from mobile data anywhere in the world, double-click <strong>start_mobile_access.bat</strong>!
    </div>
  </div>
</body>
</html>`);
    return;
  }

  if (pathname === '/') pathname = '/index.html';

  const filePath = path.join(ROOT, pathname);

  // Security check: ensure path is within ROOT
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Access Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  const localIps = [];
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        localIps.push(net.address);
      }
    }
  }

  console.log(`================================================================`);
  console.log(`🏥 INDUS HEALTH CITY — MULTI-DEVICE NETWORK SERVER RUNNING`);
  console.log(`================================================================`);
  console.log(`💻 This Computer:        http://localhost:${PORT}`);
  localIps.forEach(ip => {
    console.log(`📱 Phones & Other PCs:   http://${ip}:${PORT}`);
  });
  console.log(`📷 Phone QR Code Screen: http://localhost:${PORT}/qr`);
  console.log(`⚡ Spring Boot Backend:  http://localhost:${BACKEND_PORT}/api/health`);
  console.log(`🌐 Anywhere Access:      Run start_mobile_access.bat`);
  console.log(`================================================================`);
});
