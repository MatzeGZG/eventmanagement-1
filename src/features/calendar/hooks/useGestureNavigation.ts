```typescript
import { useCallback, useRef } from 'react';
import { addDays, addWeeks, addMonths } from 'date-fns';

interface GestureConfig {
  view: 'month' | 'week' | 'day';
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const useGestureNavigation = ({ 
  view, 
  selectedDate, 
  onDateChange 
}: GestureConfig) => {
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (!isLeftSwipe && !isRightSwipe) return;

    switch (view) {
      case 'day':
        onDateChange(addDays(selectedDate, isLeftSwipe ? 1 : -1));
        break;
      case 'week':
        onDateChange(addWeeks(selectedDate, isLeftSwipe ? 1 : -1));
        break;
      case 'month':
        onDateChange(addMonths(selectedDate, isLeftSwipe ? 1 : -1));
        break;
    }
  }, [view, selectedDate, onDateChange]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};
```