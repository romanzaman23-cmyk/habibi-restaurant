import { imageUrl } from '../utils';
import './MenuGrid.css';

export default function MenuGrid({ categories }) {
  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <h2 className="section-title">Explore Menu</h2>
        <div className="menu-grid">
          {categories?.map((cat) => (
            <div key={cat.id} className="menu-card">
              <div className="menu-card-img">
                <img src={imageUrl(cat.image)} alt={cat.name} />
              </div>
              <div className="menu-card-label">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
