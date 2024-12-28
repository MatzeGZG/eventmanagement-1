```typescript
import { useState, useEffect } from 'react';
import { ImageLoader } from '../utils/performance/imageLoader';

export const useProgressiveImage = (src: string, previewSrc?: string) => {
  const [currentSrc, setCurrentSrc] = useState(previewSrc || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) return;

    setLoading(true);
    setError(null);

    ImageLoader.preloadImage(src)
      .then(() => {
        setCurrentSrc(src);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [src]);

  return { src: currentSrc, loading, error };
};
```