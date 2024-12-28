```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarView, CalendarFilter } from '../types';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { AgendaView } from './views/AgendaView';
import { CalendarHeader } from './CalendarHeader';
import { CalendarNavigation } from './CalendarNavigation';
import { CalendarSidebar } from './CalendarSidebar';
import { useCalendarEvents } from '../hooks/useCalendarEvents';
import { useCalendarView } from '../hooks/useCalendarView';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const Calendar: React.FC = () => {
  const [filters, setFilters] = useState<CalendarFilter>({});
  const { view, navigateMonth, changeViewType } = useCalendarView();
  const { events, loading, fetchEvents } = useCalendarEvents();

  useEffect(() => {
    fetchEvents(filters);
  }, [fetchEvents, filters]);

  const renderView = () => {
    const props = { events, date: view.date };
    
    switch (view.type) {
      case 'month':
        return <MonthView {...props} />;
      case 'week':
        return <WeekView {...props} />;
      case 'day':
        return <DayView {...props} />;
      case 'agenda':
        return <AgendaView {...props} />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <CalendarSidebar
        recommendations={[]}
        filters={filters}
        onFiltersChange={setFilters}
      />
      
      <div className="flex-1 p-6">
        <CalendarHeader 
          view={view}
          onViewChange={changeViewType}
        />
        
        <CalendarNavigation
          date={view.date}
          onPrevious={() => navigateMonth('prev')}
          onNext={() => navigateMonth('next')}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[600px]"
            >
              <LoadingSpinner size="lg" />
            </motion.div>
          ) : (
            <motion.div
              key={view.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
```