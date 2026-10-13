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
      const javaProc = spawn('java', ['-jar', jarPath], {
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

  // Forward /api routes to Python PostgreSQL backend
  if (pathname.startsWith('/api/')) {
    return proxyApiRequest(req, res);
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
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`================================================================`);
  console.log(`INDUS HEALTH CITY - HIMS Server running at: http://localhost:${PORT}`);
  console.log(`PostgreSQL API Proxy active -> http://localhost:${PORT}/api/* -> :${BACKEND_PORT}`);
  console.log(`================================================================`);
});
