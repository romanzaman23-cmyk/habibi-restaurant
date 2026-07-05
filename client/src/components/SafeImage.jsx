import { useEffect, useState } from 'react';
import { imageUrl } from '../utils';

export default function SafeImage({ src, fallback = '', alt = '', className, ...props }) {
  const [current, setCurrent] = useState(() => imageUrl(src));
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setCurrent(imageUrl(src));
    setBroken(false);
  }, [src]);

  const handleError = () => {
    if (fallback && current !== imageUrl(fallback)) {
      setCurrent(imageUrl(fallback));
      return;
    }
    setBroken(true);
  };

  if (broken) {
    return <span className="img-broken" title="Image not found — please upload again">Missing</span>;
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
