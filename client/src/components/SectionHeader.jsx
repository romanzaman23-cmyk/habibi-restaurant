export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="section-header fade-in">
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
