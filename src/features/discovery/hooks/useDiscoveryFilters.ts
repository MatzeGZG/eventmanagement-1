```typescript
import { useState, useCallback } from 'react';
import { EventCategory } from '../../../types/event';

interface DiscoveryFilters {
  categories: EventCategory[];
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  location?: {
    city: string;
    radius: number;
  };
}

const initialFilters: DiscoveryFilters = {
  categories: [],
  dateRange: undefined,
  priceRange: undefined,
  location: undefined
};

export const useDiscoveryFilters = () => {
  const [filters, setFilters] = useState<DiscoveryFilters>(initialFilters);

  const updateFilters = useCallback((newFilters: Partial<DiscoveryFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters
  };
};
```