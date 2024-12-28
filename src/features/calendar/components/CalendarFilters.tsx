import React from 'react';
import { CalendarFilter } from '../types';
import { CategoryFilter } from './filters/CategoryFilter';
import { DateRangeFilter } from './filters/DateRangeFilter';
import { LocationFilter } from './filters/LocationFilter';

interface CalendarFiltersProps {
  filters: CalendarFilter;
  onFiltersChange: (filters: CalendarFilter) => void;
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={filters.categories}
        onChange={categories => onFiltersChange({ ...filters, categories })}
      />
      
      <DateRangeFilter
        dateRange={filters.dateRange}
        onChange={dateRange => onFiltersChange({ ...filters, dateRange })}
      />
      
      <LocationFilter
        location={filters.location}
        onChange={location => onFiltersChange({ ...filters, location })}
      />
    </div>
  );
};