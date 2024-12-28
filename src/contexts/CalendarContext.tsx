import React, { createContext, useContext, useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarViewType } from '../features/calendar/types';

interface CalendarContextValue {
  view: {
    type: CalendarViewType;
    date: Date;
  };
  setView: (view: { type: CalendarViewType; date: Date }) => void;
  navigateMonth: (direction: 'prev' | 'next') => void;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState({
    type: 'month' as CalendarViewType,
    date: new Date()
  });

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setView(prev => ({
      ...prev,
      date: direction === 'next' ? addMonths(prev.date, 1) : subMonths(prev.date, 1)
    }));
  }, []);

  return (
    <CalendarContext.Provider value={{ view, setView, navigateMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};