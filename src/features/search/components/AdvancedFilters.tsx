```tsx
import React from 'react';
import { Filter, Calendar, MapPin, DollarSign, Heart } from 'lucide-react';
import { SearchFilters } from '../types';
import { colors } from '../../../styles/colors';

interface AdvancedFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className={`bg-[${colors.background.dark}] rounded-lg p-4 space-y-4`}>
      {/* Location Filter */}
      <div>
        <div className="flex items-center mb-2">
          <MapPin className={`w-4 h-4 mr-2 text-[${colors.primary.gold}]`} />
          <span className="text-white font-medium">Location</span>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="City"
            value={filters.location?.city || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              location: { ...filters.location, city: e.target.value }
            })}
            className="flex-1 px-3 py-2 bg-black rounded border border-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Radius (km)"
            value={filters.location?.radius || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              location: { ...filters.location, radius: Number(e.target.value) }
            })}
            className="w-24 px-3 py-2 bg-black rounded border border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Accessibility Filters */}
      <div>
        <div className="flex items-center mb-2">
          <Heart className={`w-4 h-4 mr-2 text-[${colors.primary.gold}]`} />
          <span className="text-white font-medium">Accessibility</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(filters.accessibility).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onFiltersChange({
                  ...filters,
                  accessibility: {
                    ...filters.accessibility,
                    [key]: e.target.checked
                  }
                })}
                className="form-checkbox text-[${colors.primary.gold}]"
              />
              <span className="text-white text-sm">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
```