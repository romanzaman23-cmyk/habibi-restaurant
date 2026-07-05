import { formatTel, openWhatsApp } from '../utils';
import './CtaBanner.css';

export default function CtaBanner({ settings }) {
  const phone = formatTel(settings?.phone || '');
  return (
    <section className="cta-banner" style={settings?.cta_bg ? { backgroundImage: `url(${settings.cta_bg})` } : undefined}>
      <div className="cta-overlay" />
      <div className="container cta-content fade-in">
        <h2>{settings?.cta_title || 'Hungry? Order Your Favourite Food Now!'}</h2>
        <div className="btn-group">
          <button type="button" className="btn-gold btn-whatsapp" onClick={() => openWhatsApp(settings)}>
            Order on WhatsApp
          </button>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
