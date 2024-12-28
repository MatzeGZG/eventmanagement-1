```tsx
import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../hooks/useCalendar';
import { colors } from '../../../styles/colors';

export const CalendarView = () => {
  const {
    events,
    currentDate,
    view,
    setView,
    navigateDate,
    syncWithExternalCalendars
  } = useCalendar();

  return (
    <div className={`bg-[${colors.background.dark}] rounded-lg shadow-xl p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <CalendarIcon className={`w-6 h-6 text-[${colors.primary.gold}]`} />
          <h2 className={`text-[${colors.primary.gold}] text-xl font-semibold`}>
            Event Calendar
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateDate('prev')}
            className={`p-2 rounded-full hover:bg-[${colors.secondary.charcoal}]`}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => navigateDate('next')}
            className={`p-2 rounded-full hover:bg-[${colors.secondary.charcoal}]`}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className={`text-center py-2 text-[${colors.primary.lightGold}] font-medium`}
          >
            {day}
          </div>
        ))}
        {/* Calendar grid implementation */}
      </div>
    </div>
  );
};
```