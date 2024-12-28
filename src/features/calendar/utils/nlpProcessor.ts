import { addDays, addWeeks, addMonths } from 'date-fns';
import { EventCategory } from '../../../types/event';

interface ProcessedQuery {
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: EventCategory[];
  location?: string;
}

export const processNaturalLanguage = (query: string): ProcessedQuery => {
  const result: ProcessedQuery = {};
  const lowerQuery = query.toLowerCase();

  // Process date ranges
  if (lowerQuery.includes('next week')) {
    const start = addDays(new Date(), 7);
    const end = addDays(start, 7);
    result.dateRange = { start, end };
  } else if (lowerQuery.includes('this month')) {
    const start = new Date();
    const end = addMonths(start, 1);
    result.dateRange = { start, end };
  } else if (lowerQuery.includes('next month')) {
    const start = addMonths(new Date(), 1);
    const end = addMonths(start, 1);
    result.dateRange = { start, end };
  }

  // Process categories
  const categoryMatches = Object.values(EventCategory)
    .filter(category => lowerQuery.includes(category.toLowerCase()));
  if (categoryMatches.length > 0) {
    result.categories = categoryMatches;
  }

  // Process location
  const locationMatch = query.match(/in ([A-Za-z\s]+)(?=\s|$)/i);
  if (locationMatch) {
    result.location = locationMatch[1].trim();
  }

  return result;
};