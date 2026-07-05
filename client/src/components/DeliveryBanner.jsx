import { formatTel } from '../utils';
import './DeliveryBanner.css';

export default function DeliveryBanner({ settings }) {
  const bg = settings?.delivery_bg;
  const phone = formatTel(settings?.phone || '');

  return (
    <section className="delivery-banner" style={{ backgroundImage: `url(${bg})` }}>
      <div className="delivery-overlay" />
      <div className="container delivery-content">
        <h2>{settings?.delivery_title || 'FREE HOME DELIVERY'}</h2>
        <p>{settings?.delivery_text}</p>
        <a href={phone ? `tel:${phone}` : '#contact'} className="btn-gold">
          Call Now
        </a>
      </div>
    </section>
  );
}
