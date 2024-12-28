import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLocationSearch } from '../../../../hooks/useLocationSearch';
import { useDebounce } from '../../../../utils/hooks/useDebounce';

interface LocationFilterProps {
  location?: { city: string; radius: number };
  onChange: (location?: { city: string; radius: number }) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  location,
  onChange
}) => {
  const [searchQuery, setSearchQuery] = useState(location?.city || '');
  const { results, loading, searchLocation } = useLocationSearch();
  const debouncedSearch = useDebounce(searchLocation, 300);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-fjs-gold" />
        <span className="text-sm font-medium text-fjs-silver">Location</span>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search location..."
          className="w-full px-3 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
        />

        <div className="flex items-center justify-between">
          <span className="text-xs text-fjs-silver">Search radius</span>
          <span className="text-xs text-fjs-gold">{location?.radius || 10}km</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="100"
          value={location?.radius || 10}
          onChange={(e) => onChange({ 
            city: location?.city || '', 
            radius: Number(e.target.value) 
          })}
          className="w-full accent-fjs-gold"
        />
      </div>

      {/* Location Results */}
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-black border border-fjs-charcoal rounded-lg shadow-lg">
          {results.map((result) => (
            <button
              key={result.location.placeId}
              onClick={() => onChange({
                city: result.location.city,
                radius: location?.radius || 10
              })}
              className="w-full px-3 py-2 text-left hover:bg-fjs-charcoal text-fjs-silver"
            >
              {result.location.formattedAddress}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};