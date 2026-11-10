// Sivasankari Makeup Artist — website server
// Serves the static site, the public gallery/booking API and the private admin API.
// Storage is plain JSON files + an uploads folder, so it runs anywhere Node runs.

const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Load admin credentials etc. from .env if present
if (fs.existsSync(path.join(__dirname, '.env'))) process.loadEnvFile(path.join(__dirname, '.env'));

const PORT = process.env.PORT || 3000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');

const CATEGORIES = ['bridal', 'reception', 'engagement', 'party', 'saree', 'hair', 'other'];
const MAX_FILE_MB = 10;
const MAX_FILES_PER_UPLOAD = 20;
const SESSION_DAYS = 7;
const COOKIE = 'ssma_admin';

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set (in .env or the environment).');
  process.exit(1);
}

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// First run: start the gallery with the sample photos in public/img/photos (see data/seed/gallery.json).
// Once gallery.json exists, the admin page is the only thing that changes it.
const GALLERY_SEED = path.join(DATA_DIR, 'seed', 'gallery.json');
if (!fs.existsSync(GALLERY_FILE) && fs.existsSync(GALLERY_SEED)) fs.copyFileSync(GALLERY_SEED, GALLERY_FILE);

// ---------- tiny JSON store ----------
function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function writeJson(file, data) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}

const clean = (v, max = 200) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);

// ---------- simple per-IP rate limit ----------
const hits = new Map();
function rateLimit(limit, windowMs) {
  return (req, res, next) => {
    const key = req.ip + req.path;
    const now = Date.now();
    const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
    if (list.length >= limit) {
      return res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' });
    }
    list.push(now);
    hits.set(key, list);
    next();
  };
}

// ---------- admin sessions ----------
// Sessions live in memory: a server restart simply asks the admin to sign in again.
const sessions = new Map();

// Compare via SHA-256 digests so lengths never leak and timingSafeEqual always gets equal-size buffers
const sameSecret = (a, b) =>
  crypto.timingSafeEqual(
    crypto.createHash('sha256').update(String(a)).digest(),
    crypto.createHash('sha256').update(String(b)).digest()
  );

function readCookie(req, name) {
  const match = (req.get('cookie') || '').split(/;\s*/).find((c) => c.startsWith(name + '='));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}

function setSessionCookie(req, res, value, maxAgeSec) {
  const parts = [`${COOKIE}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Strict', `Max-Age=${maxAgeSec}`];
  if (req.secure) parts.push('Secure');
  res.set('Set-Cookie', parts.join('; '));
}

function requireAdmin(req, res, next) {
  const token = readCookie(req, COOKIE);
  const expires = sessions.get(token);
  if (token && expires && expires > Date.now()) return next();
  if (token) sessions.delete(token);
  res.status(401).json({ error: 'Please sign in.' });
}

// ---------- uploads ----------
const ALLOWED = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, crypto.randomUUID() + ALLOWED[file.mimetype]),
  }),
  limits: { fileSize: MAX_FILE_MB * 1024 * 1024, files: MAX_FILES_PER_UPLOAD },
  fileFilter: (req, file, cb) => {
    if (ALLOWED[file.mimetype]) cb(null, true);
    else cb(new Error('Only JPG, PNG or WEBP images are allowed.'));
  },
});

function handleUpload(req, res, next) {
  upload.array('photos', MAX_FILES_PER_UPLOAD)(req, res, (err) => {
    if (!err) return next();
    const msg =
      err.code === 'LIMIT_FILE_SIZE' ? `Each photo must be under ${MAX_FILE_MB} MB.` :
      err.code === 'LIMIT_FILE_COUNT' ? `You can upload up to ${MAX_FILES_PER_UPLOAD} photos at a time.` :
      err.message;
    res.status(400).json({ error: msg });
  });
}

// ---------- app ----------
const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '50kb' }));

// Keep the admin page out of search engines and caches
app.use(['/admin', '/admin.html', '/api/admin'], (req, res, next) => {
  res.set('X-Robots-Tag', 'noindex, nofollow');
  res.set('Cache-Control', 'no-store');
  next();
});

// ---------- site pages ----------
// Each page in pages/ pulls in shared partials via <!--#include name-->,
// so the header, footer etc. are edited in one place.
const PAGES_DIR = path.join(__dirname, 'pages');
const ROUTES = { '/': 'home', '/services': 'services', '/gallery': 'gallery', '/about': 'about', '/faq': 'faq', '/contact': 'contact' };
const pageCache = new Map();

function renderPage(name) {
  if (process.env.NODE_ENV === 'production' && pageCache.has(name)) return pageCache.get(name);
  const html = fs
    .readFileSync(path.join(PAGES_DIR, name + '.html'), 'utf8')
    .replace(/<!--#include (\w+)-->/g, (_, part) => fs.readFileSync(path.join(PAGES_DIR, 'partials', part + '.html'), 'utf8'))
    .replace(`data-nav="${name}"`, `data-nav="${name}" aria-current="page"`);
  pageCache.set(name, html);
  return html;
}

for (const [route, name] of Object.entries(ROUTES)) {
  app.get(route, (req, res) => res.type('html').send(renderPage(name)));
  // Old-style links such as /services.html → /services
  if (route !== '/') app.get(route + '.html', (req, res) => res.redirect(301, route));
}
app.get('/index.html', (req, res) => res.redirect(301, '/'));

app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

// Public: gallery photos
app.get('/api/gallery', (req, res) => {
  const items = readJson(GALLERY_FILE)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(({ id, url, caption, category, createdAt }) => ({ id, url, caption, category, createdAt }));
  res.json(items);
});

// Public: booking enquiry (also opened in WhatsApp on the client)
app.post('/api/bookings', rateLimit(10, 60 * 60 * 1000), (req, res) => {
  const b = req.body || {};
  const booking = {
    id: crypto.randomUUID(),
    name: clean(b.name, 80),
    phone: clean(b.phone, 20),
    eventDate: clean(b.eventDate, 20),
    eventType: clean(b.eventType, 60),
    venue: clean(b.venue, 160),
    message: clean(b.message, 600),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  if (!booking.name || !/^[+\d\s-]{8,20}$/.test(booking.phone) || !booking.eventDate) {
    return res.status(400).json({ error: 'Please fill in your name, a valid mobile number and the event date.' });
  }
  const bookings = readJson(BOOKINGS_FILE);
  bookings.push(booking);
  writeJson(BOOKINGS_FILE, bookings);
  res.json({ ok: true });
});

// ---------- admin API ----------
app.post('/api/admin/login', rateLimit(8, 15 * 60 * 1000), (req, res) => {
  const { username, password } = req.body || {};
  const userOk = sameSecret(username ?? '', ADMIN_USERNAME);
  const passOk = sameSecret(password ?? '', ADMIN_PASSWORD);
  if (!(userOk && passOk)) return res.status(401).json({ error: 'Wrong username or password.' });

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, Date.now() + SESSION_DAYS * 864e5);
  setSessionCookie(req, res, token, SESSION_DAYS * 86400);
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  sessions.delete(readCookie(req, COOKIE));
  setSessionCookie(req, res, '', 0);
  res.json({ ok: true });
});

app.get('/api/admin/me', requireAdmin, (req, res) => res.json({ ok: true }));

app.post('/api/admin/gallery', requireAdmin, handleUpload, (req, res) => {
  const files = req.files || [];
  if (!files.length) return res.status(400).json({ error: 'Please choose at least one photo.' });
  const category = CATEGORIES.includes(req.body.category) ? req.body.category : 'other';
  const gallery = readJson(GALLERY_FILE);
  const now = new Date().toISOString();
  for (const f of files) {
    gallery.push({
      id: path.parse(f.filename).name,
      url: '/uploads/' + f.filename,
      file: f.filename,
      caption: clean(req.body.caption, 140),
      category,
      createdAt: now,
    });
  }
  writeJson(GALLERY_FILE, gallery);
  res.json({ ok: true, count: files.length });
});

app.patch('/api/admin/gallery/:id', requireAdmin, (req, res) => {
  const gallery = readJson(GALLERY_FILE);
  const item = gallery.find((p) => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  const { caption, category } = req.body || {};
  if (caption !== undefined) item.caption = clean(caption, 140);
  if (CATEGORIES.includes(category)) item.category = category;
  writeJson(GALLERY_FILE, gallery);
  res.json(item);
});

app.delete('/api/admin/gallery/:id', requireAdmin, (req, res) => {
  const gallery = readJson(GALLERY_FILE);
  const idx = gallery.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const [item] = gallery.splice(idx, 1);
  // Sample photos (no `file`) live in public/img/photos and are only removed from the list.
  if (item.file) fs.rm(path.join(UPLOAD_DIR, path.basename(item.file)), () => {});
  writeJson(GALLERY_FILE, gallery);
  res.json({ ok: true });
});

app.get('/api/admin/bookings', requireAdmin, (req, res) => {
  res.json(readJson(BOOKINGS_FILE).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
});

app.patch('/api/admin/bookings/:id', requireAdmin, (req, res) => {
  const bookings = readJson(BOOKINGS_FILE);
  const item = bookings.find((b) => b.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (['new', 'contacted', 'confirmed', 'closed'].includes(req.body?.status)) item.status = req.body.status;
  writeJson(BOOKINGS_FILE, bookings);
  res.json(item);
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));
app.use((req, res) => res.status(404).type('html').send(renderPage('404')));

app.listen(PORT, () => console.log(`Sivasankari Makeup Artist site running on http://localhost:${PORT}`));
