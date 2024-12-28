```tsx
import React from 'react';
import { Calendar, MapPin, Tag, DollarSign } from 'lucide-react';
import { EventCategory } from '../../../../types/event';
import { SearchFilters } from '../../types';

interface EventFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          <Tag className="w-4 h-4 inline-block mr-2" />
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(EventCategory).map((category) => (
            <button
              key={category}
              onClick={() => onFiltersChange({
                ...filters,
                categories: filters.categories.includes(category)
                  ? filters.categories.filter(c => c !== category)
                  : [...filters.categories, category]
              })}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                filters.categories.includes(category)
                  ? 'bg-fjs-gold text-black'
                  : 'bg-black/30 text-fjs-silver hover:bg-black/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          <Calendar className="w-4 h-4 inline-block mr-2" />
          Date Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={filters.dateRange?.start?.toISOString().split('T')[0] || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: {
                ...filters.dateRange,
                start: new Date(e.target.value)
              }
            })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
          <input
            type="date"
            value={filters.dateRange?.end?.toISOString().split('T')[0] || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dateRange: {
                ...filters.dateRange,
                end: new Date(e.target.value)
              }
            })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          <MapPin className="w-4 h-4 inline-block mr-2" />
          Location
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="City"
            value={filters.location?.city || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              location: {
                ...filters.location,
                city: e.target.value
              }
            })}
            className="flex-1 px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
          <input
            type="number"
            placeholder="Radius (km)"
            value={filters.location?.radius || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              location: {
                ...filters.location,
                radius: Number(e.target.value)
              }
            })}
            className="w-24 px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          <DollarSign className="w-4 h-4 inline-block mr-2" />
          Price Range
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange?.min || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              priceRange: {
                ...filters.priceRange,
                min: Number(e.target.value)
              }
            })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange?.max || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              priceRange: {
                ...filters.priceRange,
                max: Number(e.target.value)
              }
            })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>
    </div>
  );
};
```