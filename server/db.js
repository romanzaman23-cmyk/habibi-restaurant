import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadContentFromBlob, saveContentToBlob } from './blobStorage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isVercel = process.env.VERCEL === '1';
const storageRoot = isVercel
  ? path.join('/tmp', 'habibi-restaurant')
  : __dirname;

const dataPath = path.join(storageRoot, 'data', 'content.json');
export const uploadsDir = path.join(storageRoot, 'uploads');

if (!fs.existsSync(path.join(storageRoot, 'data'))) {
  fs.mkdirSync(path.join(storageRoot, 'data'), { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const defaultData = {
  settings: {
    site_name: 'Habibi Restaurant',
    logo: '',
    logo_tagline: '',
    hero_title: 'WELCOME TO HABIBI RESTAURANT',
    hero_subtitle: 'AUTHENTIC PAKISTANI CUISINE — FRESH, FLAVORFUL & UNFORGETTABLE',
    hero_image_1: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop',
    hero_image_2: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
    hero_image_3: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
    hero_image_4: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
    delivery_title: 'DELIVERY CHARGES',
    delivery_text: 'Home Delivery Only.',
    delivery_bg: 'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=1600&h=600&fit=crop',
    about_label: 'ABOUT US',
    about_title: 'HABIBI RESTAURANT — WHERE AUTHENTIC TASTE MEETS TIMELESS HOSPITALITY',
    about_text: 'At Habibi Restaurant, we bring you the rich flavors of traditional Pakistani cuisine. From sizzling BBQ to aromatic biryanis, every dish is prepared with love using the finest ingredients.',
    about_image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=700&fit=crop',
    cta_title: 'JUST DIAL AND ORDER YOUR FAVOURITE FOOD NOW!',
    cta_bg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=500&fit=crop',
    phone: '+92 300 1234567',
    call_number: '+92 300 1234567',
    whatsapp_number: '+92 300 1234567',
    whatsapp_message: 'Hi! I would like to place an order from your website.',
    whatsapp_order_message: 'Hi, I want to order: {dish_name} (Rs. {price})',
    page_bg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
    email: 'info@khaanekhaas.com',
    address: '123 Food Street, Lahore, Pakistan',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    tiktok: 'https://tiktok.com',
    hours_mon_tue: '12:00 PM - 12:00 AM',
    hours_wed_thu: '12:00 PM - 12:00 AM',
    hours_fri_sat: '12:00 PM - 1:00 AM',
    hours_sunday: '12:00 PM - 11:00 PM',
    admin_password: 'admin123',
  },
  menuCategories: [
    { id: 1, name: 'Starters & Soups', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop', sort_order: 0 },
    { id: 2, name: 'Burgers & Sandwiches', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop', sort_order: 1 },
    { id: 3, name: 'Pizza & Pasta', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop', sort_order: 2 },
    { id: 4, name: 'Chinese Corner', image: 'https://images.unsplash.com/photo-1585032226651-759b368d8c05?w=300&h=300&fit=crop', sort_order: 3 },
    { id: 5, name: 'BBQ Corner', image: 'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=300&h=300&fit=crop', sort_order: 4 },
    { id: 6, name: 'Karahi & Handi', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop', sort_order: 5 },
    { id: 7, name: 'Biryani & Rice', image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=300&h=300&fit=crop', sort_order: 6 },
    { id: 8, name: 'Fish Corner', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b9a2?w=300&h=300&fit=crop', sort_order: 7 },
    { id: 9, name: 'Fast Food', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=300&fit=crop', sort_order: 8 },
    { id: 10, name: 'Beverages', image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop', sort_order: 9 },
  ],
  menuItems: [
    { id: 1, category_id: 5, name: 'Chicken Tikka (Full)', description: 'Marinated chicken grilled to perfection', price: 850, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop', sort_order: 0 },
    { id: 2, category_id: 5, name: 'Seekh Kabab (4 pcs)', description: 'Spiced minced meat skewers', price: 480, image: 'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=400&h=400&fit=crop', sort_order: 1 },
    { id: 3, category_id: 7, name: 'Chicken Biryani', description: 'Aromatic basmati rice with spiced chicken', price: 350, image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop', sort_order: 0 },
    { id: 4, category_id: 7, name: 'Mutton Biryani', description: 'Slow-cooked mutton with saffron rice', price: 450, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop', sort_order: 1 },
  ],
  specialDishes: [
    { id: 1, name: 'Lahori Chargah Platter', description: 'Crispy whole chicken marinated in Lahori spices, served with naan and chutney.', price: 1899, image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=350&fit=crop', sort_order: 0 },
    { id: 2, name: 'Mutton Karahi', description: 'Tender mutton cooked in traditional wok with tomatoes, ginger and green chilies.', price: 1599, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=350&fit=crop', sort_order: 1 },
    { id: 3, name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken, saffron and fried onions.', price: 899, image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=350&fit=crop', sort_order: 2 },
  ],
  offers: [
    { id: 1, title: 'BBQ Family Platter', description: 'Chicken Tikka, Seekh Kabab, Naan & Raita — perfect for 4 persons', price: 2499, image: 'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=500&h=400&fit=crop', sort_order: 0 },
    { id: 2, title: 'Biryani Combo Deal', description: '2 Chicken Biryani + 2 Cold Drinks at special price', price: 699, image: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=500&h=400&fit=crop', sort_order: 1 },
  ],
  testimonials: [
    { id: 1, name: 'Ahmed Khan', text: 'The best biryani in town! Authentic flavors and generous portions. Khaane Khaas never disappoints.', sort_order: 0 },
    { id: 2, name: 'Fatima Ali', text: 'Amazing BBQ and friendly staff. We celebrate every family occasion here. Highly recommended!', sort_order: 1 },
  ],
  nextId: { menu: 11, dish: 4, testimonial: 3, menuItem: 5, offer: 3 },
};

function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  saveContentToBlob(data).catch((err) => console.error('Blob save failed:', err));
}

function mergeMissingSettings(settings) {
  const phone = settings.phone || defaultData.settings.phone;
  const extras = {
    call_number: phone,
    whatsapp_number: phone,
    whatsapp_message: defaultData.settings.whatsapp_message,
    whatsapp_order_message: defaultData.settings.whatsapp_order_message,
    logo: '',
    tiktok: defaultData.settings.tiktok,
    logo_tagline: '',
    page_bg: defaultData.settings.page_bg,
  };
  let changed = false;
  for (const [key, val] of Object.entries(extras)) {
    if (settings[key] === undefined) {
      settings[key] = val;
      changed = true;
    }
  }
  if (settings.twitter !== undefined) {
    delete settings.twitter;
    changed = true;
  }
  return changed;
}

function loadData() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2));
    return structuredClone(defaultData);
  }
  const parsed = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  if (mergeMissingSettings(parsed.settings)) {
    saveData(parsed);
  }
  return parsed;
}

let data = structuredClone(defaultData);
let dbReady = false;

function sanitizeBrokenUploads(data) {
  let changed = false;
  const scrub = (val) => {
    if (typeof val !== 'string' || !val) return val;
    if (val.startsWith('/uploads/')) {
      changed = true;
      return '';
    }
    if (val.startsWith('data:image/') && val.length < 500) {
      changed = true;
      return '';
    }
    return val;
  };

  for (const key of Object.keys(data.settings)) {
    const cleaned = scrub(data.settings[key]);
    if (cleaned !== data.settings[key]) data.settings[key] = cleaned;
  }
  for (const cat of data.menuCategories) cat.image = scrub(cat.image);
  for (const dish of data.specialDishes) dish.image = scrub(dish.image);
  if (data.menuItems) {
    for (const item of data.menuItems) item.image = scrub(item.image);
  }
  if (data.offers) {
    for (const offer of data.offers) offer.image = scrub(offer.image);
  }
  return changed;
}

function migrateData(loaded) {
  let changed = false;
  if (!loaded.menuItems) {
    loaded.menuItems = [];
    changed = true;
  }
  if (!loaded.offers) {
    loaded.offers = [];
    changed = true;
  }
  if (!loaded.nextId) loaded.nextId = {};
  if (!loaded.nextId.menuItem) {
    loaded.nextId.menuItem = 1;
    changed = true;
  }
  if (!loaded.nextId.offer) {
    loaded.nextId.offer = 1;
    changed = true;
  }
  if (changed) saveData(loaded);
  return loaded;
}

function finalizeData(loaded) {
  loaded = migrateData(loaded);
  if (mergeMissingSettings(loaded.settings)) {
    saveData(loaded);
  }
  if (sanitizeBrokenUploads(loaded)) {
    saveData(loaded);
  }
  return loaded;
}

export async function initDb() {
  if (dbReady) return;

  if (isVercel) {
    const blobData = await loadContentFromBlob();
    if (blobData?.settings) {
      data = finalizeData(blobData);
      dbReady = true;
      return;
    }
  }

  data = finalizeData(loadData());
  dbReady = true;
}

export function getSettings() {
  const { admin_password, ...rest } = data.settings;
  return rest;
}

export function updateSettings(updates) {
  for (const [key, value] of Object.entries(updates)) {
    if (key !== 'admin_password') data.settings[key] = value;
  }
  saveData(data);
}

export function verifyAdmin(password) {
  return data.settings.admin_password === password;
}

export function changeAdminPassword(newPassword) {
  data.settings.admin_password = newPassword;
  saveData(data);
}

export function getMenuCategories() {
  return [...data.menuCategories].sort((a, b) => a.sort_order - b.sort_order);
}

export function addMenuCategory(name, image) {
  const id = data.nextId.menu++;
  const sort_order = data.menuCategories.length;
  data.menuCategories.push({ id, name, image, sort_order });
  saveData(data);
}

export function updateMenuCategory(id, name, image) {
  const cat = data.menuCategories.find((c) => c.id === Number(id));
  if (cat) { cat.name = name; cat.image = image; saveData(data); }
}

export function deleteMenuCategory(id) {
  const numId = Number(id);
  data.menuCategories = data.menuCategories.filter((c) => c.id !== numId);
  if (data.menuItems) {
    data.menuItems = data.menuItems.filter((i) => i.category_id !== numId);
  }
  saveData(data);
}

export function getMenuItems(categoryId) {
  let items = [...(data.menuItems || [])];
  if (categoryId) {
    items = items.filter((i) => i.category_id === Number(categoryId));
  }
  return items.sort((a, b) => a.sort_order - b.sort_order);
}

export function addMenuItem(category_id, name, description, price, image) {
  if (!data.menuItems) data.menuItems = [];
  if (!data.nextId.menuItem) data.nextId.menuItem = 1;
  const id = data.nextId.menuItem++;
  const catItems = data.menuItems.filter((i) => i.category_id === Number(category_id));
  data.menuItems.push({
    id,
    category_id: Number(category_id),
    name,
    description: description || '',
    price: parseFloat(price),
    image: image || '',
    sort_order: catItems.length,
  });
  saveData(data);
}

export function updateMenuItem(id, category_id, name, description, price, image) {
  const item = data.menuItems?.find((i) => i.id === Number(id));
  if (item) {
    Object.assign(item, {
      category_id: Number(category_id),
      name,
      description: description || '',
      price: parseFloat(price),
      image: image || '',
    });
    saveData(data);
  }
}

export function deleteMenuItem(id) {
  data.menuItems = data.menuItems.filter((i) => i.id !== Number(id));
  saveData(data);
}

export function getSpecialDishes() {
  return [...data.specialDishes].sort((a, b) => a.sort_order - b.sort_order);
}

export function addSpecialDish(name, description, price, image) {
  const id = data.nextId.dish++;
  data.specialDishes.push({ id, name, description, price, image, sort_order: data.specialDishes.length });
  saveData(data);
}

export function updateSpecialDish(id, name, description, price, image) {
  const dish = data.specialDishes.find((d) => d.id === Number(id));
  if (dish) { Object.assign(dish, { name, description, price, image }); saveData(data); }
}

export function deleteSpecialDish(id) {
  data.specialDishes = data.specialDishes.filter((d) => d.id !== Number(id));
  saveData(data);
}

export function getTestimonials() {
  return [...data.testimonials].sort((a, b) => a.sort_order - b.sort_order);
}

export function addTestimonial(name, text) {
  const id = data.nextId.testimonial++;
  data.testimonials.push({ id, name, text, sort_order: data.testimonials.length });
  saveData(data);
}

export function updateTestimonial(id, name, text) {
  const t = data.testimonials.find((x) => x.id === Number(id));
  if (t) { t.name = name; t.text = text; saveData(data); }
}

export function deleteTestimonial(id) {
  data.testimonials = data.testimonials.filter((t) => t.id !== Number(id));
  saveData(data);
}

export function getOffers() {
  return [...(data.offers || [])].sort((a, b) => a.sort_order - b.sort_order);
}

export function addOffer(title, description, price, image) {
  if (!data.offers) data.offers = [];
  if (!data.nextId.offer) data.nextId.offer = 1;
  const id = data.nextId.offer++;
  data.offers.push({ id, title, description: description || '', price: parseFloat(price), image, sort_order: data.offers.length });
  saveData(data);
}

export function updateOffer(id, title, description, price, image) {
  const offer = data.offers?.find((o) => o.id === Number(id));
  if (offer) {
    Object.assign(offer, { title, description: description || '', price: parseFloat(price), image });
    saveData(data);
  }
}

export function deleteOffer(id) {
  data.offers = data.offers.filter((o) => o.id !== Number(id));
  saveData(data);
}
