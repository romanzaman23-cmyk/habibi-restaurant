import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  MENU_OFFERS,
  MENU_SPECIAL_DISHES,
} from '../menuSeed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const dataPath = path.join(dataDir, 'content.json');

const defaultSettings = {
  site_name: 'Habibi Restaurant',
  logo: '',
  logo_tagline: 'Good Food, Great Taste!',
  hero_title: 'WELCOME TO HABIBI RESTAURANT',
  hero_subtitle: 'AUTHENTIC PAKISTANI CUISINE — FRESH, FLAVORFUL & UNFORGETTABLE',
  hero_image_1: 'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop',
  hero_image_2: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
  hero_image_3: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
  hero_image_4: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop',
  delivery_title: 'DELIVERY CHARGES',
  delivery_text: 'Home Delivery Only. ڈیلیوری کی چارجز لی جاتی ہے',
  delivery_bg: 'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=1600&h=600&fit=crop',
  about_label: 'ABOUT US',
  about_title: 'HABIBI RESTAURANT — GOOD FOOD, GREAT TASTE!',
  about_text: 'At Habibi Restaurant, we bring you the rich flavors of traditional Pakistani cuisine. From sizzling BBQ to aromatic biryanis, every dish is prepared with love using the finest ingredients.',
  about_image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=700&fit=crop',
  cta_title: 'JUST DIAL AND ORDER YOUR FAVOURITE FOOD NOW!',
  cta_bg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&h=500&fit=crop',
  phone: '03359904401',
  call_number: '03359904401',
  whatsapp_number: '03359904401',
  whatsapp_message: 'Hi! I would like to place an order from Habibi Restaurant.',
  whatsapp_order_message: 'Hi, I want to order: {dish_name} (Rs. {price})',
  page_bg: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&h=1080&fit=crop',
  email: 'info@habibirestaurant.com',
  address: 'Main Road, Your City',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  tiktok: 'https://tiktok.com',
  hours_mon_tue: '12:00 PM - 12:00 AM',
  hours_wed_thu: '12:00 PM - 12:00 AM',
  hours_fri_sat: '12:00 PM - 1:00 AM',
  hours_sunday: '12:00 PM - 11:00 PM',
  admin_password: 'admin123',
};

const content = {
  settings: (() => {
    if (fs.existsSync(dataPath)) {
      try {
        const existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        if (existing.settings) return { ...defaultSettings, ...existing.settings };
      } catch { /* use defaults */ }
    }
    return defaultSettings;
  })(),
  menuCategories: MENU_CATEGORIES,
  menuItems: MENU_ITEMS,
  specialDishes: MENU_SPECIAL_DISHES,
  offers: MENU_OFFERS,
  testimonials: [
    { id: 1, name: 'Ahmed Khan', text: 'Best biryani and BBQ in town! Habibi Restaurant never disappoints.', sort_order: 0 },
    { id: 2, name: 'Fatima Ali', text: 'Amazing food and friendly staff. We order from here every week!', sort_order: 1 },
  ],
  nextId: { menu: 9, dish: 5, testimonial: 3, menuItem: 55, offer: 4 },
  menuVersion: 3,
};

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
fs.writeFileSync(dataPath, JSON.stringify(content, null, 2));
console.log('Seeded content.json with full Habibi menu (54 items, 8 categories)');
