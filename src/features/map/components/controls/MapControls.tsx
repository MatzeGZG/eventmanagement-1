import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMapFilters } from '../../hooks/useMapFilters';
import { useLocation } from '../../../../hooks/useLocation';
import { EventCategory } from '../../../../types/event';

export const MapControls: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { filters, updateFilters } = useMapFilters();
  const { coordinates } = useLocation();

  return (
    <motion.div 
      className="absolute top-4 left-4 z-10 bg-black/90 rounded-lg shadow-lg p-4 w-80"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={filters.searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          placeholder="Search events..."
          className="w-full pl-10 pr-4 py-2 bg-fjs-charcoal text-white rounded-lg focus:ring-2 focus:ring-fjs-gold"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {Object.values(EventCategory).map((category) => (
            <button
              key={category}
              onClick={() => updateFilters({ 
                categories: filters.categories.includes(category)
                  ? filters.categories.filter(c => c !== category)
                  : [...filters.categories, category]
              })}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.categories.includes(category)
                  ? 'bg-fjs-gold text-black'
                  : 'bg-fjs-charcoal text-fjs-silver hover:bg-fjs-dark-gold'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Distance Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-fjs-silver">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Distance</span>
          </div>
          <span className="text-sm text-fjs-silver">
            {filters.maxDistance} km
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={filters.maxDistance}
          onChange={(e) => updateFilters({ maxDistance: Number(e.target.value) })}
          className="w-full accent-fjs-gold"
        />
      </div>
    </motion.div>
  );
};