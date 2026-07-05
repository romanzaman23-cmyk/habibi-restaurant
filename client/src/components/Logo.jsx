import { imageUrl } from '../utils';
import './Logo.css';

export default function Logo({ settings, showText = true, className = '', variant = 'default' }) {
  const name = settings?.site_name || 'Habibi Restaurant';
  const logo = settings?.logo;
  const tagline = settings?.logo_tagline?.trim();

  if (variant === 'header') {
    return (
      <div className={`logo-header ${className}`}>
        {logo && <img src={imageUrl(logo)} alt={name} className="logo-header-img" />}
        <div className="logo-header-text">
          <span className="logo-header-name">{name}</span>
          {tagline && <span className="logo-header-tagline">{tagline}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className={`logo-wrap ${className}`}>
      {logo ? (
        <img src={imageUrl(logo)} alt={name} className="logo-img" />
      ) : (
        <span className="logo-icon">🍽</span>
      )}
      {showText && (
        <div className="logo-text-block">
          <span className="logo-text">{name}</span>
          {tagline && <span className="logo-tagline">{tagline}</span>}
        </div>
      )}
    </div>
  );
}
