import React from 'react';
import { Event } from '../../../../types/event';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';
import { useCalendar } from '../../../../contexts/CalendarContext';
import { MonthView } from '../views/MonthView';
import { WeekView } from '../views/WeekView';
import { DayView } from '../views/DayView';
import { AgendaView } from '../views/AgendaView';
import { useCalendarFilters } from '../../hooks/useCalendarFilters';

interface CalendarLayoutProps {
  events: Event[];
  loading: boolean;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({ events, loading }) => {
  const { view } = useCalendar();
  const { filters, showMyEvents } = useCalendarFilters();

  // Filter events based on current filters and MyFun toggle
  const filteredEvents = events.filter(event => {
    // MyFun filter
    if (showMyEvents && !event.attendees.includes('current-user-id')) {
      return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(event.category)) {
      return false;
    }

    // Location filter
    if (filters.location) {
      // Implement location filtering logic
    }

    // Date range filter
    if (filters.dateRange) {
      const eventDate = new Date(event.date);
      if (eventDate < filters.dateRange.start || eventDate > filters.dateRange.end) {
        return false;
      }
    }

    return true;
  });

  const renderView = () => {
    switch (view.type) {
      case 'month':
        return <MonthView events={filteredEvents} date={view.date} />;
      case 'week':
        return <WeekView events={filteredEvents} date={view.date} />;
      case 'day':
        return <DayView events={filteredEvents} date={view.date} />;
      case 'agenda':
        return <AgendaView events={filteredEvents} date={view.date} />;
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] overflow-hidden">
      <div className="hidden lg:block w-64 xl:w-80 border-r border-fjs-charcoal overflow-y-auto">
        <CalendarSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <CalendarHeader />
        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin text-fjs-gold">Loading...</div>
            </div>
          ) : (
            renderView()
          )}
        </div>
      </div>
    </div>
  );
};