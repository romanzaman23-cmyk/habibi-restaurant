import { imageUrl, orderDish } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './SpecialDishes.css';

export default function SpecialDishes({ dishes, settings }) {
  return (
    <section id="specials" className="special-section">
      <div className="container">
        <SectionHeader
          label="Chef's Picks"
          title="Special Dishes"
          subtitle="Our most loved dishes — tap Order on WhatsApp and we'll prepare it fresh for you."
        />
        <div className="dishes-grid">
          {dishes?.map((dish) => (
            <article key={dish.id} className="dish-card">
              <div className="dish-img-wrap">
                <span className="dish-price">Rs. {Number(dish.price).toLocaleString()}</span>
                <SafeImage src={dish.image} alt={dish.name} loading="lazy" />
              </div>
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <button
                  type="button"
                  className="btn-gold btn-whatsapp dish-btn"
                  onClick={() => orderDish(settings, dish)}
                >
                  Order on WhatsApp
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
