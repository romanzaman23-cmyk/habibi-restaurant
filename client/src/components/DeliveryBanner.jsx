import { formatTel, openWhatsApp } from '../utils';
import './DeliveryBanner.css';

export default function DeliveryBanner({ settings }) {
  const bg = settings?.delivery_bg;
  const phone = formatTel(settings?.phone || '');

  return (
    <section className="delivery-banner" style={bg ? { backgroundImage: `url(${bg})` } : undefined}>
      <div className="delivery-overlay" />
      <div className="container delivery-content fade-in">
        <span className="section-label">Delivery</span>
        <h2>{settings?.delivery_title || 'Delivery Charges'}</h2>
        <p>{settings?.delivery_text || 'Delivery charges apply.'}</p>
        <div className="btn-group">
          <button type="button" className="btn-gold btn-whatsapp" onClick={() => openWhatsApp(settings, 'Hi! I would like to order delivery.')}>
            Order Delivery
          </button>
          <a href={phone ? `tel:${phone}` : '#contact'} className="btn-outline">
            Call for Delivery
          </a>
        </div>
      </div>
    </section>
  );
}
