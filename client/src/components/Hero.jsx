import { formatTel, openWhatsApp } from '../utils';
import SafeImage from './SafeImage';
import './Hero.css';

const DEFAULTS = [
  'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop&q=80',
];

export default function Hero({ settings }) {
  const phone = formatTel(settings?.phone || '');

  return (
    <section id="home" className="hero" aria-label="Welcome">
      <div className="hero-bg" />

      <div className="hero-images" aria-hidden="true">
        {DEFAULTS.map((fallback, i) => (
          <div key={i} className={`hero-food hero-food-${i + 1}`}>
            <SafeImage
              src={settings?.[`hero_image_${i + 1}`] || fallback}
              fallback={fallback}
              alt={`${settings?.site_name || 'Habibi Restaurant'} signature dish ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
            />
          </div>
        ))}
      </div>

      <div className="hero-content fade-in">
        <span className="hero-badge">✦ Authentic Pakistani Cuisine</span>
        <h1>{settings?.hero_title || 'Welcome to Habibi Restaurant'}</h1>
        <p>{settings?.hero_subtitle || 'Fresh, flavorful & unforgettable — dine in or order delivery'}</p>
        <div className="btn-group">
          <button type="button" className="btn-gold btn-whatsapp hero-btn" onClick={() => openWhatsApp(settings)}>
            Order on WhatsApp
          </button>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline hero-btn-outline">
            Call to Order
          </a>
        </div>
      </div>
    </section>
  );
}
