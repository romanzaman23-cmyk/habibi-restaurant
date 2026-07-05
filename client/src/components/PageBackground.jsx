import { imageUrl } from '../utils';
import './PageBackground.css';

export default function PageBackground({ settings }) {
  const bg = settings?.page_bg;
  if (!bg) return null;

  return (
    <div
      className="page-background"
      style={{ backgroundImage: `url(${imageUrl(bg)})` }}
      aria-hidden="true"
    />
  );
}
