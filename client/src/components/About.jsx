import { formatTel, openWhatsApp, googleMapsUrl } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './About.css';

const ABOUT_FALLBACK = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=700&fit=crop&q=80';

export default function About({ settings }) {
  const phone = formatTel(settings?.phone || '');
  const mapsUrl = googleMapsUrl(settings?.address);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <SafeImage
              src={settings?.about_image || ABOUT_FALLBACK}
              fallback={ABOUT_FALLBACK}
              alt={`${settings?.site_name || 'Habibi Restaurant'} restaurant interior and dining`}
              loading="lazy"
            />
          </div>
          <div className="about-text">
            <SectionHeader
              label={settings?.about_label || 'About Us'}
              title={settings?.about_title}
              subtitle={settings?.about_text}
            />
            <div className="about-actions btn-group" style={{ justifyContent: 'flex-start' }}>
              <button type="button" className="btn-gold btn-whatsapp" onClick={() => openWhatsApp(settings)}>
                Order on WhatsApp
              </button>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                Get Directions
              </a>
              <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline">
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
