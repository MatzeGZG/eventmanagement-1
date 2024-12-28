```typescript
import { useCallback } from 'react';
import { addDays, addWeeks, addMonths } from 'date-fns';

interface GestureConfig {
  view: 'month' | 'week' | 'day';
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const useGestures = ({ view, selectedDate, onDateChange }: GestureConfig) => {
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    const increment = direction === 'left' ? 1 : -1;
    
    switch (view) {
      case 'day':
        onDateChange(addDays(selectedDate, increment));
        break;
      case 'week':
        onDateChange(addWeeks(selectedDate, increment));
        break;
      case 'month':
        onDateChange(addMonths(selectedDate, increment));
        break;
    }
  }, [view, selectedDate, onDateChange]);

  const getTouchHandlers = () => ({
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const startX = touch.clientX;
      
      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const diff = startX - touch.clientX;
        
        if (Math.abs(diff) > 50) {
          handleSwipe(diff > 0 ? 'left' : 'right');
          document.removeEventListener('touchmove', handleTouchMove);
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { once: true });
    }
  });

  return {
    handleSwipe,
    getTouchHandlers
  };
};
```