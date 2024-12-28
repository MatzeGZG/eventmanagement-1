import React from 'react';
import { Filter } from 'lucide-react';
import { FeedFilters as FiltersType } from '../../types';

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

    <div className="grid grid-cols-2 gap-4">
      <select
        value={filters.sort}
        onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value as any })}
        className="bg-black text-fjs-gold border border-fjs-gold rounded-lg px-3 py-2"
      >
        <option value="latest">Latest</option>
        <option value="popular">Most Popular</option>
        <option value="trending">Trending</option>
      </select>

      <select
        value={filters.timeframe}
        onChange={(e) => onFiltersChange({ ...filters, timeframe: e.target.value as any })}
        className="bg-black text-fjs-gold border border-fjs-gold rounded-lg px-3 py-2"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  </div>
);