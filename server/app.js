import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getSettings,
  updateSettings,
  verifyAdmin,
  changeAdminPassword,
  getMenuCategories,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  getSpecialDishes,
  addSpecialDish,
  updateSpecialDish,
  deleteSpecialDish,
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadsDir,
  initDb,
} from './db.js';
import { hasBlob, uploadImageToBlob } from './blobStorage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(async (_req, _res, next) => {
  try {
    await initDb();
    next();
  } catch (err) {
    next(err);
  }
});

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use('/uploads', express.static(uploadsDir));

function serveUploadedFile(req, res) {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(uploadsDir, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }
  res.sendFile(path.resolve(filePath));
}

app.get('/uploads/:filename', serveUploadedFile);
app.get('/api/uploads/:filename', serveUploadedFile);

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

const storage = isServerless
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: uploadsDir,
      filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
      },
    });

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'));
  },
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !verifyAdmin(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/content', (_req, res) => {
  res.json({
    settings: getSettings(),
    menuCategories: getMenuCategories(),
    specialDishes: getSpecialDishes(),
    testimonials: getTestimonials(),
  });
});

function siteBaseUrl(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

app.get('/robots.txt', (req, res) => {
  const base = siteBaseUrl(req);
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const base = siteBaseUrl(req);
  const lastmod = new Date().toISOString().split('T')[0];
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${base}/#menu</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/#specials</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${base}/#about</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${base}/#contact</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`);
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (verifyAdmin(password)) {
    res.json({ success: true, token: password });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

app.post('/api/admin/change-password', authMiddleware, (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  changeAdminPassword(newPassword);
  res.json({ success: true, token: newPassword });
});

app.post('/api/admin/upload', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded. Use JPG or PNG under 5MB.' });

  try {
    const buffer = req.file.buffer ?? fs.readFileSync(req.file.path);
    const mime = req.file.mimetype || 'image/jpeg';
    let url;

    if (hasBlob()) {
      try {
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
        url = await uploadImageToBlob(filename, buffer, mime);
        if (req.file.path) fs.unlinkSync(req.file.path);
      } catch (blobErr) {
        console.error('Blob upload failed, using inline image:', blobErr);
      }
    }

    if (!url) {
      if (isServerless) {
        if (buffer.length > 900 * 1024) {
          if (req.file.path) fs.unlinkSync(req.file.path);
          return res.status(400).json({ error: 'Image too large after compression. Try a smaller photo.' });
        }
        if (req.file.path) fs.unlinkSync(req.file.path);
        url = `data:${mime};base64,${buffer.toString('base64')}`;
      } else if (!req.file.path) {
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, buffer);
        url = `/uploads/${filename}`;
      } else {
        url = `/uploads/${req.file.filename}`;
      }
    }

    const saveKey = req.query.saveKey;
    if (saveKey && /^[a-z0-9_]+$/i.test(saveKey)) {
      updateSettings({ [saveKey]: url });
      return res.json({ url, settings: getSettings() });
    }

    res.json({ url });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.patch('/api/admin/settings/:key', authMiddleware, (req, res) => {
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ error: 'Missing value' });
  }
  updateSettings({ [req.params.key]: value });
  res.json({ success: true, settings: getSettings() });
});

app.put('/api/admin/settings', authMiddleware, (req, res) => {
  updateSettings(req.body);
  res.json({ success: true, settings: getSettings() });
});

app.post('/api/admin/menu', authMiddleware, (req, res) => {
  const { name, image } = req.body;
  addMenuCategory(name, image);
  res.json(getMenuCategories());
});

app.put('/api/admin/menu/:id', authMiddleware, (req, res) => {
  const { name, image } = req.body;
  updateMenuCategory(req.params.id, name, image);
  res.json(getMenuCategories());
});

app.delete('/api/admin/menu/:id', authMiddleware, (req, res) => {
  deleteMenuCategory(req.params.id);
  res.json(getMenuCategories());
});

app.post('/api/admin/dishes', authMiddleware, (req, res) => {
  const { name, description, price, image } = req.body;
  addSpecialDish(name, description, parseFloat(price), image);
  res.json(getSpecialDishes());
});

app.put('/api/admin/dishes/:id', authMiddleware, (req, res) => {
  const { name, description, price, image } = req.body;
  updateSpecialDish(req.params.id, name, description, parseFloat(price), image);
  res.json(getSpecialDishes());
});

app.delete('/api/admin/dishes/:id', authMiddleware, (req, res) => {
  deleteSpecialDish(req.params.id);
  res.json(getSpecialDishes());
});

app.post('/api/admin/testimonials', authMiddleware, (req, res) => {
  const { name, text } = req.body;
  addTestimonial(name, text);
  res.json(getTestimonials());
});

app.put('/api/admin/testimonials/:id', authMiddleware, (req, res) => {
  const { name, text } = req.body;
  updateTestimonial(req.params.id, name, text);
  res.json(getTestimonials());
});

app.delete('/api/admin/testimonials/:id', authMiddleware, (req, res) => {
  deleteTestimonial(req.params.id);
  res.json(getTestimonials());
});

// Serve React build when running as standalone server (Render/local)
if (!process.env.VERCEL) {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }
}

export default app;
