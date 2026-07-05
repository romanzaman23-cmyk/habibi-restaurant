import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchContent, adminLogin, uploadImage, updateSettings, updateSetting, apiRequest, changeAdminPassword } from '../api';
import { compressImage } from '../compressImage';
import { imageUrl } from '../utils';
import SafeImage from '../components/SafeImage';
import './Admin.css';

const HERO_DEFAULTS = [
  'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop&q=80',
];

function ImageUpload({ token, value, onChange, label, fallback, saveKey, onSaved }) {
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let objectUrl = '';
    try {
      objectUrl = URL.createObjectURL(file);
      setLocalPreview(objectUrl);
      setUploading(true);

      const compressed = await compressImage(file);
      const result = await uploadImage(token, compressed, saveKey);
      onChange(result.url);
      if (result.settings) {
        onSaved?.(result.settings);
      } else if (saveKey) {
        const res = await updateSetting(token, saveKey, result.url);
        onSaved?.(res.settings);
      }
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setLocalPreview('');
      setUploading(false);
      e.target.value = '';
    }
  };

  const previewSrc = localPreview || value;

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="image-upload-row">
        {previewSrc && (
          <SafeImage src={previewSrc} fallback={fallback} alt="" className="preview-thumb" />
        )}
        <label className="upload-btn">
          {uploading ? 'Uploading...' : 'Choose Image'}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleFile} disabled={uploading} hidden />
        </label>
      </div>
    </div>
  );
}

function SettingsTab({ token, settings, onSave, onImageSaved, onPasswordChanged }) {
  const [form, setForm] = useState(settings);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => setForm(settings), [settings]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleImageSaved = (savedSettings) => {
    setForm(savedSettings);
    onImageSaved(savedSettings);
  };

  const handleSave = async () => {
    try {
      await onSave(form);
      alert('Settings saved!');
    } catch {
      alert('Save failed. Please login again.');
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await changeAdminPassword(token, newPassword);
      localStorage.setItem('adminToken', res.token);
      onPasswordChanged(res.token);
      setNewPassword('');
      setConfirmPassword('');
      alert('Password updated successfully!');
    } catch {
      alert('Failed to update password');
    }
  };

  return (
    <div className="admin-tab">
      <h3>Site Settings</h3>

      <h4>Change Admin Password</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>
      </div>
      <button type="button" className="btn-save btn-password" onClick={handlePasswordChange}>
        Update Password
      </button>
      <p className="field-hint">Default password is admin123 — change it after first login.</p>

      <div className="form-grid">
        <div className="form-group">
          <label>Restaurant Name (shown in header, footer & website)</label>
          <input value={form.site_name || ''} onChange={(e) => set('site_name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={form.email || ''} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input value={form.address || ''} onChange={(e) => set('address', e.target.value)} />
        </div>
      </div>

      <h4>Logo</h4>
      <ImageUpload token={token} label="Restaurant Logo (header & footer)" value={form.logo} onChange={(v) => set('logo', v)} saveKey="logo" onSaved={handleImageSaved} />
      <div className="form-group">
        <label>Logo Tagline (small text below logo)</label>
        <input value={form.logo_tagline || ''} onChange={(e) => set('logo_tagline', e.target.value)} placeholder="e.g. Authentic Pakistani Cuisine" />
      </div>
      <p className="field-hint">Upload your logo image. Leave empty to show default icon.</p>

      <h4>Scroll Background</h4>
      <ImageUpload token={token} label="Page Background Image" value={form.page_bg} onChange={(v) => set('page_bg', v)} saveKey="page_bg" onSaved={handleImageSaved} />
      <p className="field-hint">This image stays fixed behind the page when customers scroll.</p>

      <h4>WhatsApp & Call Buttons (Floating Icons)</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Call Number</label>
          <input value={form.call_number || ''} onChange={(e) => set('call_number', e.target.value)} placeholder="+92 300 1234567" />
        </div>
        <div className="form-group">
          <label>WhatsApp Number</label>
          <input value={form.whatsapp_number || ''} onChange={(e) => set('whatsapp_number', e.target.value)} placeholder="+92 300 1234567" />
        </div>
      </div>
      <div className="form-group">
        <label>WhatsApp Message (when customer clicks WhatsApp icon)</label>
        <textarea
          value={form.whatsapp_message || ''}
          onChange={(e) => set('whatsapp_message', e.target.value)}
          rows={3}
          placeholder="Hi! I would like to place an order."
        />
      </div>
      <div className="form-group">
        <label>WhatsApp Order Message (for Add to Cart button)</label>
        <textarea
          value={form.whatsapp_order_message || ''}
          onChange={(e) => set('whatsapp_order_message', e.target.value)}
          rows={2}
          placeholder="Hi, I want to order: {dish_name} (Rs. {price})"
        />
        <p className="field-hint">Use {'{dish_name}'} and {'{price}'} for dish name and price.</p>
      </div>

      <h4>Hero Section</h4>
      <div className="form-group">
        <label>Hero Title</label>
        <input value={form.hero_title || ''} onChange={(e) => set('hero_title', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Hero Subtitle</label>
        <input value={form.hero_subtitle || ''} onChange={(e) => set('hero_subtitle', e.target.value)} />
      </div>
      <ImageUpload token={token} label="Hero Food Image 1" value={form.hero_image_1} onChange={(v) => set('hero_image_1', v)} saveKey="hero_image_1" onSaved={handleImageSaved} fallback={HERO_DEFAULTS[0]} />
      <ImageUpload token={token} label="Hero Food Image 2" value={form.hero_image_2} onChange={(v) => set('hero_image_2', v)} saveKey="hero_image_2" onSaved={handleImageSaved} fallback={HERO_DEFAULTS[1]} />
      <ImageUpload token={token} label="Hero Food Image 3" value={form.hero_image_3} onChange={(v) => set('hero_image_3', v)} saveKey="hero_image_3" onSaved={handleImageSaved} fallback={HERO_DEFAULTS[2]} />
      <ImageUpload token={token} label="Hero Food Image 4" value={form.hero_image_4} onChange={(v) => set('hero_image_4', v)} saveKey="hero_image_4" onSaved={handleImageSaved} fallback={HERO_DEFAULTS[3]} />

      <h4>Delivery Banner</h4>
      <div className="form-group">
        <label>Title</label>
        <input value={form.delivery_title || ''} onChange={(e) => set('delivery_title', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={form.delivery_text || ''} onChange={(e) => set('delivery_text', e.target.value)} rows={3} />
      </div>
      <ImageUpload token={token} label="Background Image" value={form.delivery_bg} onChange={(v) => set('delivery_bg', v)} saveKey="delivery_bg" onSaved={handleImageSaved} />

      <h4>About Us</h4>
      <div className="form-group">
        <label>About Title</label>
        <input value={form.about_title || ''} onChange={(e) => set('about_title', e.target.value)} />
      </div>
      <div className="form-group">
        <label>About Text</label>
        <textarea value={form.about_text || ''} onChange={(e) => set('about_text', e.target.value)} rows={4} />
      </div>
      <ImageUpload token={token} label="About Image" value={form.about_image} onChange={(v) => set('about_image', v)} saveKey="about_image" onSaved={handleImageSaved} />

      <h4>Call to Action Banner</h4>
      <div className="form-group">
        <label>CTA Title</label>
        <input value={form.cta_title || ''} onChange={(e) => set('cta_title', e.target.value)} />
      </div>
      <ImageUpload token={token} label="CTA Background" value={form.cta_bg} onChange={(v) => set('cta_bg', v)} saveKey="cta_bg" onSaved={handleImageSaved} />

      <h4>Opening Hours</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>Mon - Tue</label>
          <input value={form.hours_mon_tue || ''} onChange={(e) => set('hours_mon_tue', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Wed - Thu</label>
          <input value={form.hours_wed_thu || ''} onChange={(e) => set('hours_wed_thu', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Fri - Sat</label>
          <input value={form.hours_fri_sat || ''} onChange={(e) => set('hours_fri_sat', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Sunday</label>
          <input value={form.hours_sunday || ''} onChange={(e) => set('hours_sunday', e.target.value)} />
        </div>
      </div>

      <h4>Social Media Links</h4>
      <div className="form-grid">
        <div className="form-group">
          <label>TikTok</label>
          <input value={form.tiktok || ''} onChange={(e) => set('tiktok', e.target.value)} placeholder="https://tiktok.com/@username" />
        </div>
        <div className="form-group">
          <label>Instagram</label>
          <input value={form.instagram || ''} onChange={(e) => set('instagram', e.target.value)} placeholder="https://instagram.com/username" />
        </div>
        <div className="form-group">
          <label>YouTube</label>
          <input value={form.youtube || ''} onChange={(e) => set('youtube', e.target.value)} placeholder="https://youtube.com/@channel" />
        </div>
        <div className="form-group">
          <label>Facebook</label>
          <input value={form.facebook || ''} onChange={(e) => set('facebook', e.target.value)} placeholder="https://facebook.com/page" />
        </div>
      </div>

      <p className="field-hint">Images save automatically when you upload them.</p>

      <button className="btn-save" onClick={handleSave}>Save All Settings</button>
    </div>
  );
}

function MenuTab({ token, categories, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', image: '' });

  const startEdit = (cat) => {
    setEditing(cat.id);
    setForm({ name: cat.name, image: cat.image });
  };

  const startNew = () => {
    setEditing('new');
    setForm({ name: '', image: '' });
  };

  const save = async () => {
    if (!form.name.trim()) {
      alert('Please enter category name');
      return;
    }
    try {
      if (editing === 'new') {
        await apiRequest(token, 'POST', '/api/admin/menu', form);
      } else {
        await apiRequest(token, 'PUT', `/api/admin/menu/${editing}`, form);
      }
      setEditing(null);
      onUpdate();
      alert('Saved!');
    } catch {
      alert('Save failed. Please try again.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this category?')) return;
    try {
      await apiRequest(token, 'DELETE', `/api/admin/menu/${id}`);
      onUpdate();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h3>Menu Categories</h3>
        <button className="btn-add" onClick={startNew}>+ Add Category</button>
      </div>

      {editing && (
        <div className="edit-card">
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <ImageUpload token={token} label="Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          <div className="edit-actions">
            <button className="btn-save" onClick={save}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="item-list">
        {categories.map((cat) => (
          <div key={cat.id} className="item-row">
            <img src={imageUrl(cat.image)} alt="" />
            <span>{cat.name}</span>
            <div className="item-actions">
              <button onClick={() => startEdit(cat)}>Edit</button>
              <button className="btn-delete" onClick={() => remove(cat.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DishesTab({ token, dishes, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' });

  const startEdit = (d) => {
    setEditing(d.id);
    setForm({ name: d.name, description: d.description, price: d.price, image: d.image });
  };

  const startNew = () => {
    setEditing('new');
    setForm({ name: '', description: '', price: '', image: '' });
  };

  const save = async () => {
    if (!form.name.trim()) {
      alert('Please enter dish name');
      return;
    }
    if (!form.price) {
      alert('Please enter price');
      return;
    }
    try {
      if (editing === 'new') {
        await apiRequest(token, 'POST', '/api/admin/dishes', form);
      } else {
        await apiRequest(token, 'PUT', `/api/admin/dishes/${editing}`, form);
      }
      setEditing(null);
      onUpdate();
      alert('Saved!');
    } catch {
      alert('Save failed. Please try again.');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this dish?')) return;
    try {
      await apiRequest(token, 'DELETE', `/api/admin/dishes/${id}`);
      onUpdate();
    } catch {
      alert('Delete failed.');
    }
  };

  return (
    <div className="admin-tab">
      <div className="tab-header">
        <h3>Special Dishes</h3>
        <button className="btn-add" onClick={startNew}>+ Add Dish</button>
      </div>

      {editing && (
        <div className="edit-card">
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} />
          </div>
          <div className="form-group">
            <label>Price (Rs.)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <ImageUpload token={token} label="Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
          <div className="edit-actions">
            <button className="btn-save" onClick={save}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="item-list">
        {dishes.map((d) => (
          <div key={d.id} className="item-row">
            <img src={imageUrl(d.image)} alt="" />
            <span>{d.name} — Rs. {d.price}</span>
            <div className="item-actions">
              <button onClick={() => startEdit(d)}>Edit</button>
              <button className="btn-delete" onClick={() => remove(d.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tab, setTab] = useState('settings');
  const [data, setData] = useState(null);

  const loadData = useCallback(() => {
    fetchContent().then(setData).catch(console.error);
  }, []);

  useEffect(() => {
    if (token) loadData();
  }, [token, loadData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(password);
      setToken(res.token);
      localStorage.setItem('adminToken', res.token);
      setLoginError('');
    } catch {
      setLoginError('Wrong password');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const handleSaveSettings = async (form) => {
    const res = await updateSettings(token, form);
    setData((d) => ({ ...d, settings: res.settings }));
  };

  const handleImageSaved = (settings) => {
    setData((d) => ({ ...d, settings }));
  };

  const refreshMenu = async () => {
    const content = await fetchContent();
    setData((d) => ({ ...d, menuCategories: content.menuCategories }));
  };

  const refreshDishes = async () => {
    const content = await fetchContent();
    setData((d) => ({ ...d, specialDishes: content.specialDishes }));
  };

  if (!token) {
    return (
      <div className="admin-login">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <p className="login-hint">Default password: admin123</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="login-error">{loginError}</p>}
          <button type="submit" className="btn-save">Login</button>
          <Link to="/" className="back-link">← Back to Website</Link>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'menu', label: 'Menu' },
    { id: 'dishes', label: 'Special Dishes' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <h1>Admin Panel</h1>
        <div className="topbar-actions">
          <Link to="/" target="_blank" className="btn-preview">View Website</Link>
          <button onClick={handleLogout} className="btn-cancel">Logout</button>
        </div>
      </div>

      <div className="admin-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            className={`tab-btn ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {data && tab === 'settings' && (
          <SettingsTab
            token={token}
            settings={data.settings}
            onSave={handleSaveSettings}
            onImageSaved={handleImageSaved}
            onPasswordChanged={setToken}
          />
        )}
        {data && tab === 'menu' && (
          <MenuTab token={token} categories={data.menuCategories} onUpdate={refreshMenu} />
        )}
        {data && tab === 'dishes' && (
          <DishesTab token={token} dishes={data.specialDishes} onUpdate={refreshDishes} />
        )}
      </div>
    </div>
  );
}
