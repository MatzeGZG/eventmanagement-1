import React, { useState } from 'react';
import { Filter, Search, MapPin } from 'lucide-react';
import { EventCategory } from '../../../types/event';
import { motion } from 'framer-motion';

interface MapControlsProps {
  showFilters: boolean;
  onToggleFilters: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  showFilters,
  onToggleFilters
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [radius, setRadius] = useState(10);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-4 z-10 bg-black/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-80"
    >
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category
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
        <div className="flex items-center justify-between text-sm text-fjs-silver">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span>Distance</span>
          </div>
          <span>{radius} km</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full accent-fjs-gold"
        />
      </div>
    </motion.div>
  );
};