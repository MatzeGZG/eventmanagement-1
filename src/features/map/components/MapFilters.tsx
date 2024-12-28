import React from 'react';
import { Search, Filter, MapPin, Layers } from 'lucide-react';
import { EventCategory } from '../../../types/event';
import { colors } from '../../../styles/colors';

interface MapFiltersProps {
  filters: {
    search: string;
    categories: EventCategory[];
    distance: number;
    date: Date | null;
  };
  onFiltersChange: (filters: any) => void;
  showHeatmap: boolean;
  onHeatmapToggle: () => void;
}

export const MapFilters: React.FC<MapFiltersProps> = ({
  filters,
  onFiltersChange,
  showHeatmap,
  onHeatmapToggle
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-black rounded-lg shadow-lg p-4 w-80">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-fjs-gold rounded-md bg-fjs-charcoal text-white focus:ring-2 focus:ring-fjs-light-gold focus:border-transparent"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {Object.values(EventCategory).map((category) => (
            <button
              key={category}
              onClick={() => {
                const categories = filters.categories.includes(category)
                  ? filters.categories.filter(c => c !== category)
                  : [...filters.categories, category];
                onFiltersChange({ ...filters, categories });
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filters.categories.includes(category)
                  ? 'bg-fjs-gold text-black'
                  : 'bg-fjs-charcoal text-fjs-silver hover:bg-fjs-dark-gold hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-fjs-silver">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Distance</span>
            </div>
            <span className="text-sm text-fjs-silver">{filters.distance} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={filters.distance}
            onChange={(e) => onFiltersChange({ ...filters, distance: Number(e.target.value) })}
            className="w-full accent-fjs-gold"
          />
        </div>

        {/* Heatmap Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-fjs-silver">
            <Layers className="w-4 h-4 mr-2" />
            <span>Show Heatmap</span>
          </div>
          <button
            onClick={onHeatmapToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showHeatmap ? 'bg-fjs-gold' : 'bg-fjs-charcoal'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showHeatmap ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};