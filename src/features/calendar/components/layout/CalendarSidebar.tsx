import React from 'react';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryFilter } from '../filters/CategoryFilter';
import { LocationFilter } from '../filters/LocationFilter';
import { DateRangeFilter } from '../filters/DateRangeFilter';
import { MyFunToggle } from '../filters/MyFunToggle';
import { useCalendarFilters } from '../../hooks/useCalendarFilters';

export const CalendarSidebar: React.FC = () => {
  const {
    filters,
    showMyEvents,
    updateFilters,
    setShowMyEvents
  } = useCalendarFilters();

  return (
    <div className="p-4 space-y-6 bg-black">
      {/* MyFun Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-fjs-gold">View Options</h3>
        <MyFunToggle 
          enabled={showMyEvents} 
          onToggle={setShowMyEvents} 
        />
      </div>

      {/* Filters Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-fjs-gold" />
          <h3 className="text-lg font-semibold text-fjs-gold">Filters</h3>
        </div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <CategoryFilter
            selectedCategories={filters.categories}
            onChange={categories => updateFilters({ categories })}
          />

          <LocationFilter
            location={filters.location}
            onChange={location => updateFilters({ location })}
          />

          <DateRangeFilter
            dateRange={filters.dateRange}
            onChange={dateRange => updateFilters({ dateRange })}
          />
        </motion.div>
      </div>
    </div>
  );
};