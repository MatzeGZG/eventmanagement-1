import React from 'react';
import { Filter } from 'lucide-react';
import { useCalendar } from '../../../hooks/useCalendar';

export const CalendarSidebar: React.FC = () => {
  const { filters, updateFilters } = useCalendar();

  return (
    <div className="w-80 border-r border-fjs-charcoal bg-black p-4 space-y-6">
      {/* Calendar Filters */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-fjs-gold" />
          <h3 className="text-lg font-semibold text-fjs-gold">Filters</h3>
        </div>
        {/* Add filter components here */}
      </div>
    </div>
  );
};