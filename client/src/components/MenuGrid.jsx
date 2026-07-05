import { useState, useEffect } from 'react';
import { orderDish } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './MenuGrid.css';

function CategoryModal({ category, items, settings, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="menu-modal-overlay" onClick={onClose} role="presentation">
      <div className="menu-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="menu-modal-title">
        <div className="menu-modal-header">
          <div className="menu-modal-cat-img">
            <SafeImage src={category.image} alt={category.name} />
          </div>
          <div>
            <h2 id="menu-modal-title">{category.name}</h2>
            <p className="menu-modal-count">{items.length} items</p>
          </div>
          <button type="button" className="menu-modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {items.length === 0 ? (
          <p className="menu-empty">No items in this category yet.</p>
        ) : (
          <div className="menu-modal-grid">
            {items.map((item) => (
              <article key={item.id} className="menu-item-card">
                <div className="menu-item-card-img">
                  <SafeImage
                    src={item.image}
                    fallback={item.image ? '' : category.image}
                    alt={item.name}
                    loading="lazy"
                  />
                  <span className="menu-item-card-price">Rs. {Number(item.price).toLocaleString()}</span>
                </div>
                <div className="menu-item-card-body">
                  <h3>{item.name}</h3>
                  {item.description && <p>{item.description}</p>}
                  <button
                    type="button"
                    className="btn-gold btn-whatsapp menu-item-order"
                    onClick={() => orderDish(settings, item)}
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MenuGrid({ categories, menuItems, settings }) {
  const [openCategory, setOpenCategory] = useState(null);

  const activeCategory = categories?.find((c) => c.id === openCategory);
  const activeItems = menuItems?.filter((i) => i.category_id === openCategory) || [];

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <SectionHeader
          label="Our Menu"
          title="Explore Our Menu"
          subtitle="Tap a category to view all dishes with photos and prices."
        />

        <div className="menu-grid">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="menu-card"
              onClick={() => setOpenCategory(cat.id)}
              aria-label={`Open ${cat.name} menu`}
            >
              <div className="menu-card-img">
                <SafeImage src={cat.image} alt={cat.name} loading="lazy" />
                <span className="menu-card-overlay">View Menu →</span>
              </div>
              <div className="menu-card-label">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {openCategory && activeCategory && (
        <CategoryModal
          category={activeCategory}
          items={activeItems}
          settings={settings}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </section>
  );
}
