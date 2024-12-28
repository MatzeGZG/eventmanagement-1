import React from 'react';
import { Filter, Calendar, MapPin } from 'lucide-react';
import { FeedFilters as FiltersType } from '../types';

interface FeedFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export const FeedFilters: React.FC<FeedFiltersProps> = ({
  filters,
  onFiltersChange
}) => (
  <div className="bg-fjs-charcoal rounded-lg p-4 space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-fjs-gold" />
        <h2 className="text-lg font-semibold text-white">Filters</h2>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FilterSelect
        value={filters.sort}
        onChange={(value) => onFiltersChange({ ...filters, sort: value })}
        options={[
          { value: 'latest', label: 'Latest' },
          { value: 'popular', label: 'Most Popular' },
          { value: 'trending', label: 'Trending' }
        ]}
      />
      <FilterSelect
        value={filters.timeframe}
        onChange={(value) => onFiltersChange({ ...filters, timeframe: value })}
        options={[
          { value: 'all', label: 'All Time' },
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'This Week' },
          { value: 'month', label: 'This Month' }
        ]}
      />
    </div>
  </div>
);

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);