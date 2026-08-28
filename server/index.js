import http from 'http';
import { createClient } from '@supabase/supabase-js';

const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://wjwtgzwhzrzusacntmra.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqd3RnendoenJ6dXNhY250bXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzk4NjYsImV4cCI6MjEwMTc1NTg2Nn0.vZoMOZm4a-S4QNUCUY-9cBCzQM3ySR44kpp-VaVhTeg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In-Memory Rate Limiting: 100 requests per minute per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 100;
const ipRequestCounts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    ipRequestCounts.set(ip, { count: 1, startTime: now });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Clean up stale rate limiting entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      ipRequestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://masung-smokehouse.vercel.app',
  'https://masung-smokehouse.onrender.com'
];

const server = http.createServer(async (req, res) => {
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';

  // Security Headers (OWASP Hardening)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // CORS Policy (Origin validation)
  const reqOrigin = req.headers['origin'];
  if (reqOrigin && (ALLOWED_ORIGINS.includes(reqOrigin) || reqOrigin.endsWith('.vercel.app') || reqOrigin.endsWith('.onrender.com'))) {
    res.setHeader('Access-Control-Allow-Origin', reqOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Rate Limiter Guard
  if (isRateLimited(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Too many requests. Please slow down.' }));
    return;
  }

  // Health check endpoint
  if (req.url === '/api/health' || req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      service: 'Masung Smokehouse API & Render Worker',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // Live Pit Status endpoint
  if (req.url === '/api/pit-status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      pitStatus: 'Active & Slicing',
      batch: 'Batch #4 (Oakwood 12-Hour)',
      woodType: 'Philippine Oak & Hickory',
      internalTemp: '203°F (Peak Tenderness)',
      slicedReady: ['Texas Smoked Beef Brisket', 'Smoked Pork Belly', 'Sizzling Sisig'],
      unlimitedRiceAvailable: true,
      boneBrothRefill: 'Piping Hot'
    }));
    return;
  }

  // Recent Orders Query endpoint
  if (req.url === '/api/orders' && req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('masung_orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, orders: data }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`Masung Smokehouse API listening on port ${PORT}`);
});
