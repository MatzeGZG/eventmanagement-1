import { Event } from '../../../types/event';
import { SearchFilters } from '../types';

export const filterEventsByFilters = (
  events: Event[],
  filters: SearchFilters
): Event[] => {
  return events.filter(event => {
    // Category filtering
    if (filters.categories.length > 0 && 
        !filters.categories.includes(event.category)) {
      return false;
    }

    // Location filtering
    if (filters.location) {
      // TODO: Implement distance calculation
      if (!event.location.city.toLowerCase().includes(filters.location.city.toLowerCase())) {
        return false;
      }
    }

    // Date range filtering
    if (filters.dateRange) {
      const eventDate = new Date(event.date);
      if (eventDate < filters.dateRange.start || eventDate > filters.dateRange.end) {
        return false;
      }
    }

    // Price range filtering
    if (filters.priceRange) {
      if (event.price < filters.priceRange.min || event.price > filters.priceRange.max) {
        return false;
      }
    }

    return true;
  });
};