import './TrustBar.css';

const ITEMS = [
  { icon: '🍽️', title: 'Fresh Daily', text: 'Prepared with premium ingredients' },
  { icon: '🛵', title: 'Home Delivery', text: 'Delivery charges apply' },
  { icon: '⭐', title: 'Authentic Taste', text: 'Traditional Pakistani recipes' },
  { icon: '📱', title: 'Easy Ordering', text: 'Order via WhatsApp in seconds' },
];

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Why choose us">
      <div className="container trust-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="trust-item">
            <span className="trust-icon" aria-hidden="true">{item.icon}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
