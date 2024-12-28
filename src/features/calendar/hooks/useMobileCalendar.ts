```typescript
import { useState, useCallback } from 'react';
import { addDays, addWeeks, addMonths } from 'date-fns';
import { useGestureNavigation } from './useGestureNavigation';
import { usePullToRefresh } from './usePullToRefresh';

export const useMobileCalendar = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { onTouchStart, onTouchMove, onTouchEnd } = useGestureNavigation({
    view,
    selectedDate,
    onDateChange: setSelectedDate
  });

  const handleRefresh = useCallback(async () => {
    // Implement refresh logic
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const { containerRef, refreshing } = usePullToRefresh(handleRefresh);

  const handlePinchZoom = useCallback((scale: number) => {
    if (scale > 1.5 && view === 'week') setView('day');
    else if (scale < 0.5 && view === 'day') setView('week');
  }, [view]);

  return {
    view,
    setView,
    selectedDate,
    setSelectedDate,
    containerRef,
    refreshing,
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd
    },
    handlePinchZoom
  };
};
```