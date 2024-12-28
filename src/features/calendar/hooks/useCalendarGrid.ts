import { useMemo } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useCalendar } from '../../../contexts/CalendarContext';

export const useCalendarGrid = () => {
  const { view } = useCalendar();
  
  const days = useMemo(() => {
    const monthStart = startOfMonth(view.date);
    const monthEnd = endOfMonth(view.date);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [view.date]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return {
    days,
    weekDays
  };
};