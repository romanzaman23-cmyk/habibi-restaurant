import Logo from './Logo';
import SocialIcons from './SocialIcons';
import { formatTel, googleMapsUrl } from '../utils';
import './Footer.css';

export default function Footer({ settings }) {
  const phone = formatTel(settings?.phone || '');
  const mapsUrl = googleMapsUrl(settings?.address);
  const name = settings?.site_name || 'Habibi Restaurant';

  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <Logo settings={settings} className="footer-logo-wrap" />
          </div>
          <p className="footer-tagline">Authentic Pakistani cuisine — dine in, takeaway & delivery.</p>
          <SocialIcons settings={settings} />
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>
              <strong>Address</strong>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{settings?.address}</a>
            </li>
            <li>
              <strong>Phone</strong>
              <a href={`tel:${phone}`}>{settings?.phone}</a>
            </li>
            <li>
              <strong>Email</strong>
              <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#specials">Special Dishes</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <ul className="hours-list">
            <li><span>Mon – Tue</span><span>{settings?.hours_mon_tue}</span></li>
            <li><span>Wed – Thu</span><span>{settings?.hours_wed_thu}</span></li>
            <li><span>Fri – Sat</span><span>{settings?.hours_fri_sat}</span></li>
            <li><span>Sunday</span><span>{settings?.hours_sunday}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
