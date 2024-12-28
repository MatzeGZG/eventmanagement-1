import React from 'react';
import { CalendarHeader } from './layout/CalendarHeader';
import { CalendarGrid } from './layout/CalendarGrid';
import { CalendarSidebar } from './layout/CalendarSidebar';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarProvider } from '../../../contexts/CalendarContext';

export const CalendarContainer: React.FC = () => {
  const { events, loading } = useCalendar();

  return (
    <CalendarProvider>
      <div className="flex h-[calc(100vh-4rem)]">
        <CalendarSidebar />
        <div className="flex-1 flex flex-col">
          <CalendarHeader />
          <CalendarGrid events={events} loading={loading} />
        </div>
      </div>
    </CalendarProvider>
  );
};