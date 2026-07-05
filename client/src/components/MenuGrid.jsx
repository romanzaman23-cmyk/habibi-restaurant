import { useState } from 'react';
import { orderDish } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './MenuGrid.css';

export default function MenuGrid({ categories, menuItems, settings }) {
  const [activeId, setActiveId] = useState(categories?.[0]?.id);

  const scrollToCategory = (catId) => {
    setActiveId(catId);
    document.getElementById(`menu-cat-${catId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <SectionHeader
          label="Our Menu"
          title="Explore Our Menu"
          subtitle="Browse categories and order your favourite dishes on WhatsApp."
        />

        <div className="menu-grid">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`menu-card ${activeId === cat.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(cat.id)}
              aria-label={`View ${cat.name} menu`}
            >
              <div className="menu-card-img">
                <SafeImage src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className="menu-card-label">{cat.name}</div>
            </button>
          ))}
        </div>

        <div className="menu-categories-list">
          {categories?.map((cat) => {
            const items = menuItems?.filter((i) => i.category_id === cat.id) || [];
            return (
              <div key={cat.id} id={`menu-cat-${cat.id}`} className="menu-category-block">
                <h3 className="menu-category-title">{cat.name}</h3>
                {items.length === 0 ? (
                  <p className="menu-empty">Items coming soon</p>
                ) : (
                  <ul className="menu-items">
                    {items.map((item) => (
                      <li key={item.id} className="menu-item-row">
                        <div className="menu-item-info">
                          <span className="menu-item-name">{item.name}</span>
                          {item.description && (
                            <span className="menu-item-desc">{item.description}</span>
                          )}
                        </div>
                        <div className="menu-item-right">
                          <span className="menu-item-price">Rs. {Number(item.price).toLocaleString()}</span>
                          <button
                            type="button"
                            className="menu-order-btn"
                            onClick={() => orderDish(settings, item)}
                          >
                            Order
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
