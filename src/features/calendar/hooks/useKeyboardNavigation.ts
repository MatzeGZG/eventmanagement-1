```typescript
import { useCallback, useEffect } from 'react';
import { addDays, addWeeks, addMonths } from 'date-fns';

export const useKeyboardNavigation = (
  selectedDate: Date,
  onDateChange: (date: Date) => void,
  view: 'month' | 'week' | 'day'
) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onDateChange(addDays(selectedDate, -1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        onDateChange(addDays(selectedDate, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        onDateChange(view === 'month' ? addWeeks(selectedDate, -1) : addDays(selectedDate, -7));
        break;
      case 'ArrowDown':
        e.preventDefault();
        onDateChange(view === 'month' ? addWeeks(selectedDate, 1) : addDays(selectedDate, 7));
        break;
      case 'PageUp':
        e.preventDefault();
        onDateChange(addMonths(selectedDate, -1));
        break;
      case 'PageDown':
        e.preventDefault();
        onDateChange(addMonths(selectedDate, 1));
        break;
      case 'Home':
        e.preventDefault();
        onDateChange(new Date());
        break;
    }
  }, [selectedDate, onDateChange, view]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
```