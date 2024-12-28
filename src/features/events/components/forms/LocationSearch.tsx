```tsx
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Location } from '../../../../types/location';
import { useLocationSearch } from '../../../../hooks/useLocationSearch';

interface LocationSearchProps {
  onSelect: (location: Location) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const { results, loading, searchLocation } = useLocationSearch();

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-fjs-silver mb-1">
        <MapPin className="w-4 h-4 inline-block mr-2" />
        Location
      </label>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchLocation(e.target.value);
        }}
        placeholder="Search for a location"
        className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
      />

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-fjs-charcoal rounded-lg shadow-lg overflow-hidden"
          >
            {results.map((result) => (
              <button
                key={result.location.placeId}
                onClick={() => {
                  onSelect(result.location);
                  setQuery(result.location.formattedAddress || '');
                }}
                className="w-full px-4 py-2 text-left hover:bg-black/20 text-white"
              >
                {result.location.formattedAddress}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```