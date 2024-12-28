```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, MapPin, Tag, DollarSign } from 'lucide-react';
import { EventCategory } from '../../../types/event';

interface FilterPanelProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-fjs-charcoal rounded-lg p-6 space-y-6"
    >
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-fjs-gold" />
        <h3 className="text-lg font-semibold text-white">Filters</h3>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-fjs-silver">Categories</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(EventCategory).map(category => (
            <button
              key={category}
              onClick={() => onFilterChange({
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-fjs-silver">Date Range</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={filters.dateRange?.start}
            onChange={(e) => onFilterChange({
              ...filters,
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
          <input
            type="date"
            value={filters.dateRange?.end}
            onChange={(e) => onFilterChange({
              ...filters,
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-fjs-silver">Price Range</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange?.min}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: { ...filters.priceRange, min: Number(e.target.value) }
            })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange?.max}
            onChange={(e) => onFilterChange({
              ...filters,
              priceRange: { ...filters.priceRange, max: Number(e.target.value) }
            })}
            className="bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-fjs-silver">Location</label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="City"
            value={filters.location?.city}
            onChange={(e) => onFilterChange({
              ...filters,
              location: { ...filters.location, city: e.target.value }
            })}
            className="flex-1 bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
          <input
            type="number"
            placeholder="Radius (km)"
            value={filters.location?.radius}
            onChange={(e) => onFilterChange({
              ...filters,
              location: { ...filters.location, radius: Number(e.target.value) }
            })}
            className="w-24 bg-black text-white rounded-lg px-3 py-2 border border-fjs-charcoal"
          />
        </div>
      </div>
    </motion.div>
  );
};
```