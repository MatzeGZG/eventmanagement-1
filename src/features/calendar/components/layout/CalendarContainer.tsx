import React, { useState } from 'react';
import { CalendarLayout } from './CalendarLayout';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import { CalendarProvider } from '../../../../contexts/CalendarContext';

export const CalendarContainer: React.FC = () => {
  const [showMyEvents, setShowMyEvents] = useState(false);
  const { events, loading } = useCalendarEvents(showMyEvents);

  return (
    <CalendarProvider>
      <div className="w-full min-w-[640px]">
        <CalendarLayout 
          events={events} 
          loading={loading}
          showMyEvents={showMyEvents}
          onToggleMyEvents={() => setShowMyEvents(!showMyEvents)}
        />
      </div>
    </CalendarProvider>
  );
};