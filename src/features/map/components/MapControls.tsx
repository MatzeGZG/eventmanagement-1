import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { EventCategory } from '../../../types/event';

interface MapControlsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: EventCategory | null;
  onCategoryChange: (category: EventCategory | null) => void;
  maxDistance: number;
  onDistanceChange: (distance: number) => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  maxDistance,
  onDistanceChange
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-80">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {Object.values(EventCategory).map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Distance Filter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>Distance</span>
            </div>
            <span className="text-sm text-gray-600">{maxDistance} km</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={maxDistance}
            onChange={(e) => onDistanceChange(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};