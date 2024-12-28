import React from 'react';
import { Filter, Search, MapPin } from 'lucide-react';
import { EventCategory } from '../../types/event';

interface MapControlsProps {
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  showFilters,
  onToggleFilters
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-black rounded-lg shadow-lg">
      {/* Search Input */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Search on map..."
            className="w-full pl-10 pr-4 py-2 bg-fjs-charcoal text-white rounded-md border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
          />
        </div>
      </div>

      {/* Filters Toggle */}
      <button
        onClick={onToggleFilters}
        className="w-full px-4 py-2 border-t border-fjs-charcoal flex items-center justify-between text-fjs-gold hover:bg-fjs-charcoal"
      >
        <span className="flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </span>
        <span className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Filter Options */}
      {showFilters && (
        <div className="p-4 border-t border-fjs-charcoal">
          {/* Category Filters */}
          <div className="space-y-2">
            {Object.values(EventCategory).map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input type="checkbox" className="text-fjs-gold" />
                <span className="text-white text-sm">{category}</span>
              </label>
            ))}
          </div>

          {/* Distance Filter */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-fjs-silver mb-2">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Distance</span>
              </div>
              <span>10 km</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              defaultValue="10"
              className="w-full accent-fjs-gold"
            />
          </div>
        </div>
      )}
    </div>
  );
};