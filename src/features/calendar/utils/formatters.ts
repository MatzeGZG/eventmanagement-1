import { format } from 'date-fns';

export const formatTime = (date: Date): string => {
  return format(date, 'HH:mm');
};

export const formatDateRange = (start: Date, end: Date): string => {
  if (start.toDateString() === end.toDateString()) {
    return `${format(start, 'MMM d, yyyy')} ${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'MMM d, yyyy HH:mm')} - ${format(end, 'MMM d, yyyy HH:mm')}`;
};