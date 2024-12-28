import React from 'react';
import { Filter, Calendar, MapPin, DollarSign } from 'lucide-react';
import { SearchFilters as SearchFiltersType } from '../../features/search/types';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="p-4 border-b border-fjs-charcoal">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-fjs-gold">
          <Filter className="w-4 h-4 mr-2" />
          <span className="font-medium">Filters</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Location Filter */}
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2 text-fjs-gold" />
            <span className="text-sm text-fjs-silver">Location</span>
          </div>
          <input
            type="text"
            placeholder="Enter city"
            value={filters.location?.city || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              location: { ...filters.location, city: e.target.value }
            })}
            className="w-full px-3 py-2 bg-fjs-charcoal text-white rounded border border-fjs-charcoal focus:border-fjs-gold focus:ring-0"
          />
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center mb-2">
            <DollarSign className="w-4 h-4 mr-2 text-fjs-gold" />
            <span className="text-sm text-fjs-silver">Price Range</span>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange?.min || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                priceRange: { ...filters.priceRange, min: Number(e.target.value) }
              })}
              className="w-1/2 px-3 py-2 bg-fjs-charcoal text-white rounded border border-fjs-charcoal focus:border-fjs-gold focus:ring-0"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange?.max || ''}
              onChange={(e) => onFiltersChange({
                ...filters,
                priceRange: { ...filters.priceRange, max: Number(e.target.value) }
              })}
              className="w-1/2 px-3 py-2 bg-fjs-charcoal text-white rounded border border-fjs-charcoal focus:border-fjs-gold focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};