const API = '';

export async function fetchContent() {
  const res = await fetch(`${API}/api/content`);
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function adminLogin(password) {
  const res = await fetch(`${API}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Invalid password');
  return res.json();
}

export async function uploadImage(token, file) {
  const form = new FormData();
  form.append('image', file);
  const res = await fetch(`${API}/api/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data;
}

export async function updateSettings(token, settings) {
  const res = await fetch(`${API}/api/admin/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(settings),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function apiRequest(token, method, url, body) {
  const res = await fetch(`${API}${url}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export async function changeAdminPassword(token, newPassword) {
  const res = await fetch(`${API}/api/admin/change-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) throw new Error('Password change failed');
  return res.json();
}
