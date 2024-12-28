```typescript
import { useCallback, useEffect, useRef, useState } from 'react';

export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const pulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { scrollTop } = containerRef.current || {};
    if (scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!pulling.current) return;
    
    currentY.current = e.touches[0].clientY;
    const delta = currentY.current - startY.current;
    
    if (delta > 0) {
      e.preventDefault();
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(${delta / 2}px)`;
      }
    }
  }, []);

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    
    pulling.current = false;
    const delta = currentY.current - startY.current;
    
    if (delta > 70 && !refreshing) {
      setRefreshing(true);
      if (containerRef.current) {
        containerRef.current.style.transform = '';
      }
      
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
      }
    } else {
      if (containerRef.current) {
        containerRef.current.style.transform = '';
      }
    }
  }, [onRefresh, refreshing]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { containerRef, refreshing };
};
```