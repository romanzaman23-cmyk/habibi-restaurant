const CONTENT_PATH = 'habibi/content.json';

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function loadContentFromBlob() {
  if (!hasBlob()) return null;
  try {
    const { head } = await import('@vercel/blob');
    const meta = await head(CONTENT_PATH, { token: process.env.BLOB_READ_WRITE_TOKEN });
    const res = await fetch(meta.url);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function saveContentToBlob(data) {
  if (!hasBlob()) return;
  const { put } = await import('@vercel/blob');
  await put(CONTENT_PATH, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function uploadImageToBlob(filename, buffer, contentType) {
  const { put } = await import('@vercel/blob');
  const blob = await put(`habibi/uploads/${filename}`, buffer, {
    access: 'public',
    contentType: contentType || 'application/octet-stream',
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

export { hasBlob };
