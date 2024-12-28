import { Event } from '../../../types/event';
import { SearchFilters } from '../types';

export const normalizeString = (str: string): string => 
  str?.toLowerCase().trim() || '';

export const matchesSearchTerm = (event: Event, searchTerm: string): boolean => {
  if (!searchTerm) return true;
  
  const normalized = normalizeString(searchTerm);
  return (
    normalizeString(event.title).includes(normalized) ||
    normalizeString(event.description).includes(normalized) ||
    event.tags.some(tag => normalizeString(tag).includes(normalized))
  );
};

export const matchesFilters = (event: Event, filters: SearchFilters): boolean => {
  // Category filter
  if (filters.categories.length && !filters.categories.includes(event.category)) {
    return false;
  }

  // Price range filter
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    if (event.price < min || event.price > max) {
      return false;
    }
  }

  // Date range filter
  if (filters.dateRange) {
    const eventDate = new Date(event.date);
    if (eventDate < filters.dateRange.start || eventDate > filters.dateRange.end) {
      return false;
    }
  }

  return true;
};