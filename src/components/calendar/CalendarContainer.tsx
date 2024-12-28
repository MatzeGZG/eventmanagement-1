import React from 'react';
import { CalendarProvider } from '../../contexts/CalendarContext';
import { CalendarLayout } from '../../features/calendar/components/layout/CalendarLayout';
import { useCalendarEvents } from '../../features/calendar/hooks/useCalendarEvents';

export const CalendarContainer: React.FC = () => {
  const { events, loading } = useCalendarEvents();

  return (
    <CalendarProvider>
      <CalendarLayout events={events} loading={loading} />
    </CalendarProvider>
  );
};