import { useState, useCallback } from 'react';
import { CalendarView } from '../types';
import { addMonths, subMonths, startOfMonth, startOfWeek, startOfDay } from 'date-fns';

export const useCalendarView = () => {
  const [view, setView] = useState<CalendarView>({
    type: 'month',
    date: startOfMonth(new Date())
  });

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setView(prev => ({
      ...prev,
      date: direction === 'next' ? addMonths(prev.date, 1) : subMonths(prev.date, 1)
    }));
  }, []);

  const changeViewType = useCallback((type: CalendarView['type']) => {
    setView(prev => {
      let date = prev.date;
      switch (type) {
        case 'month':
          date = startOfMonth(date);
          break;
        case 'week':
          date = startOfWeek(date);
          break;
        case 'day':
          date = startOfDay(date);
          break;
      }
      return { type, date };
    });
  }, []);

  return {
    view,
    navigateMonth,
    changeViewType
  };
};