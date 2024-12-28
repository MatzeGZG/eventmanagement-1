```tsx
import React from 'react';
import { CalendarEvent, CalendarFilter } from '../types';
import { EventRecommendations } from './EventRecommendations';
import { CalendarFilters } from './CalendarFilters';

interface CalendarSidebarProps {
  recommendations: CalendarEvent[];
  filters: CalendarFilter;
  onFiltersChange: (filters: CalendarFilter) => void;
}

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  recommendations,
  filters,
  onFiltersChange
}) => {
  return (
    <div className="w-80 border-r border-fjs-charcoal p-4 space-y-6">
      <CalendarFilters
        filters={filters}
        onChange={onFiltersChange}
      />
      <EventRecommendations events={recommendations} />
    </div>
  );
};
```