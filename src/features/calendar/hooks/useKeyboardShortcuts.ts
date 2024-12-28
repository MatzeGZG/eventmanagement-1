```typescript
import { useEffect, useCallback } from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';
import { addDays, addWeeks, addMonths } from 'date-fns';

export const useKeyboardShortcuts = () => {
  const { view, setView, selectedDate, setSelectedDate } = useCalendar();

  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    // Ignore if focus is in input/textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // View switching shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'm': e.preventDefault(); setView('month'); break;
        case 'w': e.preventDefault(); setView('week'); break;
        case 'd': e.preventDefault(); setView('day'); break;
        case 't': e.preventDefault(); setSelectedDate(new Date()); break;
        case '/': e.preventDefault(); document.querySelector<HTMLInputElement>('[data-calendar-search]')?.focus(); break;
      }
      return;
    }

    // Navigation shortcuts
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedDate(addDays(selectedDate, -1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedDate(addDays(selectedDate, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedDate(addWeeks(selectedDate, -1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedDate(addWeeks(selectedDate, 1));
        break;
      case 'PageUp':
        e.preventDefault();
        setSelectedDate(addMonths(selectedDate, -1));
        break;
      case 'PageDown':
        e.preventDefault();
        setSelectedDate(addMonths(selectedDate, 1));
        break;
    }
  }, [view, selectedDate, setView, setSelectedDate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [handleKeyboardNavigation]);
};
```