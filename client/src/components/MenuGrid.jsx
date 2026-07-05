import { imageUrl } from '../utils';
import SafeImage from './SafeImage';
import SectionHeader from './SectionHeader';
import './MenuGrid.css';

export default function MenuGrid({ categories }) {
  const scrollToSpecials = () => {
    document.getElementById('specials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <SectionHeader
          label="Our Menu"
          title="Explore Our Menu"
          subtitle="From sizzling BBQ to aromatic biryani — browse our categories and order your favourites today."
        />
        <div className="menu-grid">
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="menu-card"
              onClick={scrollToSpecials}
              aria-label={`Browse ${cat.name} — view special dishes`}
            >
              <div className="menu-card-img">
                <SafeImage src={cat.image} alt={cat.name} loading="lazy" />
                <span className="menu-card-overlay">View Specials →</span>
              </div>
              <div className="menu-card-label">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
