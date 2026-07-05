import { imageUrl, orderDish } from '../utils';
import './SpecialDishes.css';

export default function SpecialDishes({ dishes, settings }) {

  return (
    <section className="special-section">
      <div className="container">
        <h2 className="section-title">Special Dish</h2>
        <div className="dishes-grid">
          {dishes?.map((dish) => (
            <div key={dish.id} className="dish-card">
              <div className="dish-img-wrap">
                <span className="dish-price">Rs. {dish.price}</span>
                <img src={imageUrl(dish.image)} alt={dish.name} />
              </div>
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <button
                  type="button"
                  className="btn-gold dish-btn"
                  onClick={() => orderDish(settings, dish)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
