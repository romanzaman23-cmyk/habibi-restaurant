import { orderDish } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './Offers.css';

export default function Offers({ offers, settings }) {
  if (!offers?.length) return null;

  return (
    <section id="offers" className="offers-section">
      <div className="container">
        <SectionHeader
          label="Special Offers"
          title="Today's Offers"
          subtitle="Limited-time deals — order now on WhatsApp before they end!"
        />
        <div className="offers-grid">
          {offers.map((offer) => (
            <article key={offer.id} className="offer-card">
              <div className="offer-card-img">
                <SafeImage src={offer.image} alt={offer.title} loading="lazy" />
                <span className="offer-badge">OFFER</span>
              </div>
              <div className="offer-card-body">
                <h3>{offer.title}</h3>
                {offer.description && <p>{offer.description}</p>}
                <div className="offer-footer">
                  <span className="offer-price">Rs. {Number(offer.price).toLocaleString()}</span>
                  <button
                    type="button"
                    className="btn-gold btn-whatsapp offer-btn"
                    onClick={() => orderDish(settings, { name: offer.title, price: offer.price })}
                  >
                    Order Offer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
