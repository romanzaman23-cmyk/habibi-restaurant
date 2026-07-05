import { imageUrl, formatTel } from '../utils';
import './About.css';

export default function About({ settings }) {
  const phone = formatTel(settings?.phone || '');
  return (
    <section id="about" className="about-section">
      <div className="container about-grid">
        <div className="about-image">
          <img src={imageUrl(settings?.about_image)} alt="About us" />
        </div>
        <div className="about-text">
          <span className="about-label">{settings?.about_label || 'ABOUT US'}</span>
          <h2>{settings?.about_title}</h2>
          <p>{settings?.about_text}</p>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-gold">
            Book Now
          </a>
        </div>
      </div>
    </section>
  );
}
