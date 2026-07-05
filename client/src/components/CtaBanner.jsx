import { formatTel } from '../utils';
import './CtaBanner.css';

export default function CtaBanner({ settings }) {
  const phone = formatTel(settings?.phone || '');
  return (
    <section className="cta-banner" style={{ backgroundImage: `url(${settings?.cta_bg})` }}>
      <div className="cta-overlay" />
      <div className="container cta-content">
        <h2>{settings?.cta_title || 'JUST DIAL AND ORDER YOUR FAVOURITE FOOD NOW!'}</h2>
        <a href={phone ? `tel:${phone}` : '#contact'} className="btn-gold">
          Call Now
        </a>
      </div>
    </section>
  );
}
