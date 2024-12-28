import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useCalendar } from '../../../../contexts/CalendarContext';

export const DateNavigation: React.FC = () => {
  const { view, navigateMonth } = useCalendar();

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <h2 className="text-lg font-bold text-fjs-gold whitespace-nowrap">
        {format(view.date, 'MMMM yyyy')}
      </h2>
    </div>
  );
};