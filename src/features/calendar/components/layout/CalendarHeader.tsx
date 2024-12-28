import React from 'react';
import { DateNavigation } from '../navigation/DateNavigation';
import { ViewSelector } from '../navigation/ViewSelector';

export const CalendarHeader: React.FC = () => {
  return (
    <div className="p-2 sm:p-3 border-b border-fjs-charcoal bg-black sticky top-0 z-20">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <DateNavigation />
        <ViewSelector />
      </div>
    </div>
  );
};