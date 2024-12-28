import { startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';

export const getMonthDays = (date: Date) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  return eachDayOfInterval({ start: monthStart, end: monthEnd });
};

export const isCurrentMonth = (date: Date, baseDate: Date) => {
  return isSameMonth(date, baseDate);
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;