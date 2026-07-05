import Logo from './Logo';
import SocialIcons from './SocialIcons';
import { formatTel } from '../utils';
import './Footer.css';

export default function Footer({ settings }) {
  const phone = formatTel(settings?.phone || '');

  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <Logo settings={settings} className="footer-logo-wrap" />
          </div>
          <p className="footer-tagline">Get Delivered</p>
          <SocialIcons settings={settings} />
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <ul>
            <li><span className="icon">📍</span> {settings?.address}</li>
            <li><span className="icon">📞</span> <a href={`tel:${phone}`}>{settings?.phone}</a></li>
            <li><span className="icon">✉</span> <a href={`mailto:${settings?.email}`}>{settings?.email}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Opening Hours</h4>
          <ul>
            <li>Mon - Tue: {settings?.hours_mon_tue}</li>
            <li>Wed - Thu: {settings?.hours_wed_thu}</li>
            <li>Fri - Sat: {settings?.hours_fri_sat}</li>
            <li>Sunday: {settings?.hours_sunday}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} {settings?.site_name || 'Habibi Restaurant'}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
