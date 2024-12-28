import React from 'react';
import { Filter, Calendar, Grid, List } from 'lucide-react';
import { MediaFilters as MediaFiltersType } from '../../types';

interface MediaFiltersProps {
  filters: MediaFiltersType;
  onFiltersChange: (filters: MediaFiltersType) => void;
}

export const MediaFilters: React.FC<MediaFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 bg-fjs-charcoal rounded-lg p-4">
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-fjs-gold" />
        <select
          value={filters.sort}
          onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value })}
          className="bg-black text-fjs-silver border border-fjs-gold rounded-lg px-3 py-2"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
        
        <select
          value={filters.timeframe}
          onChange={(e) => onFiltersChange({ ...filters, timeframe: e.target.value })}
          className="bg-black text-fjs-silver border border-fjs-gold rounded-lg px-3 py-2"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onFiltersChange({ ...filters, view: 'grid' })}
          className={`p-2 rounded-lg transition-colors ${
            filters.view === 'grid' 
              ? 'bg-fjs-gold text-black' 
              : 'text-fjs-gold hover:bg-black/20'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>
        <button
          onClick={() => onFiltersChange({ ...filters, view: 'list' })}
          className={`p-2 rounded-lg transition-colors ${
            filters.view === 'list' 
              ? 'bg-fjs-gold text-black' 
              : 'text-fjs-gold hover:bg-black/20'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};