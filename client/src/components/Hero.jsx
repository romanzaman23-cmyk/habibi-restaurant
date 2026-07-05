import { imageUrl, formatTel } from '../utils';
import './Hero.css';

const DECOR = [
  { cls: 'hero-decor-1', src: 'https://images.unsplash.com/photo-1622206151226-18ca2c9e247f?w=120&h=120&fit=crop', alt: 'Leaf' },
  { cls: 'hero-decor-2', src: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=100&h=100&fit=crop', alt: 'Tomato' },
  { cls: 'hero-decor-3', src: 'https://images.unsplash.com/photo-1622206151226-18ca2c9e247f?w=100&h=100&fit=crop', alt: 'Leaf' },
  { cls: 'hero-decor-4', src: 'https://images.unsplash.com/photo-1622206151226-18ca2c9e247f?w=80&h=80&fit=crop', alt: 'Leaf' },
];

export default function Hero({ settings }) {
  const phone = formatTel(settings?.phone || '');
  const heroImages = [
    settings?.hero_image_1,
    settings?.hero_image_2,
    settings?.hero_image_3,
    settings?.hero_image_4,
  ].filter(Boolean);

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />

      <div className="hero-images">
        {heroImages.map((img, i) => (
          <div key={i} className={`hero-food hero-food-${i + 1}`}>
            <img src={imageUrl(img)} alt="Food" />
          </div>
        ))}
      </div>

      {DECOR.map((d) => (
        <img key={d.cls} className={`hero-decor ${d.cls}`} src={d.src} alt={d.alt} />
      ))}

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
