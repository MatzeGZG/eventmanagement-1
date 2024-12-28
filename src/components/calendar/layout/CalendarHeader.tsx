import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useCalendar } from '../../../contexts/CalendarContext';
import { ViewSelector } from './ViewSelector';

export const CalendarHeader: React.FC = () => {
  const { view, setView, navigateMonth } = useCalendar();

  return (
    <div className="p-4 border-b border-fjs-charcoal flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold text-fjs-gold">
          {format(view.date, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-fjs-silver hover:text-fjs-gold rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ViewSelector currentView={view.type} onViewChange={type => setView({ ...view, type })} />
    </div>
  );
};