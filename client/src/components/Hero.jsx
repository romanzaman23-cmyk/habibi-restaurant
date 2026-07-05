import { formatTel } from '../utils';
import SafeImage from './SafeImage';
import './Hero.css';

const DEFAULTS = [
  'https://images.unsplash.com/photo-1529042410799-b5843042feaa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1563379091339-03246963d29c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
];

export default function Hero({ settings }) {
  const phone = formatTel(settings?.phone || '');

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />

      <div className="hero-images">
        {DEFAULTS.map((fallback, i) => (
          <div key={i} className={`hero-food hero-food-${i + 1}`}>
            <SafeImage
              src={settings?.[`hero_image_${i + 1}`] || fallback}
              fallback={fallback}
              alt={`Dish ${i + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="hero-content">
        <h1>{settings?.hero_title || 'WELCOME TO HABIBI RESTAURANT'}</h1>
        <p>{settings?.hero_subtitle || 'AUTHENTIC PAKISTANI CUISINE — FRESH, FLAVORFUL & UNFORGETTABLE'}</p>
        <a href={phone ? `tel:${phone}` : '#contact'} className="btn-gold hero-btn">
          Order Now
        </a>
      </div>
    </section>
  );
}
