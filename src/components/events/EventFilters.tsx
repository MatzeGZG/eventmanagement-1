import React from 'react';
import { Search } from 'lucide-react';
import { EventCategory } from '../../types/event';

interface EventFiltersProps {
  selectedCategory: EventCategory | null;
  onCategoryChange: (category: EventCategory | null) => void;
  onSearchChange: (search: string) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {Object.values(EventCategory).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() =>
                onCategoryChange(selectedCategory === category ? null : category)
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};