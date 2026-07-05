import { useEffect, useState } from 'react';
import { imageUrl, resolveImageSrc } from '../utils';

export default function SafeImage({ src, fallback = '', alt = '', className, ...props }) {
  const fallbackUrl = imageUrl(fallback);
  const [useFallback, setUseFallback] = useState(false);

  const displaySrc = useFallback
    ? fallbackUrl
    : resolveImageSrc(src, fallback);

  useEffect(() => {
    setUseFallback(false);
  }, [src]);

  const handleError = () => {
    if (fallbackUrl && !useFallback) {
      setUseFallback(true);
      return;
    }
  };

  if (!displaySrc) return null;

  return (
    <img
      key={displaySrc}
      src={displaySrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
