import { useCallback, useEffect, useRef, useState } from 'react';

export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const element = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    startY.current = e.touches[0].pageY;
  }, []);

  const handleTouchMove = useCallback(async (e: TouchEvent) => {
    const touch = e.touches[0];
    const deltaY = touch.pageY - startY.current;

    if (deltaY > 50 && !refreshing && element.current?.scrollTop === 0) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  }, [refreshing, onRefresh]);

  useEffect(() => {
    const el = element.current;
    if (!el) return;

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);

    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleTouchStart, handleTouchMove]);

  return {
    refreshing,
    elementRef: element
  };
};