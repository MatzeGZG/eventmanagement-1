import { ProcessedQuery } from '../types';
import { extractLocation } from './nlp/locationExtractor';
import { extractDateRange } from './nlp/dateExtractor';
import { extractCategories } from './nlp/categoryExtractor';
import { extractInterests } from './nlp/interestExtractor';

export const processNaturalLanguage = async (query: string): Promise<ProcessedQuery> => {
  const result: ProcessedQuery = {
    location: undefined,
    dateRange: undefined,
    categories: [],
    interests: []
  };

  if (!query?.trim()) {
    return result;
  }

  try {
    // Extract location
    const location = extractLocation(query);
    if (location) {
      result.location = location;
    }

    // Extract date range
    const dateRange = extractDateRange(query);
    if (dateRange) {
      result.dateRange = dateRange;
    }

    // Extract categories
    const categories = extractCategories(query);
    if (categories.length > 0) {
      result.categories = categories;
    }

    // Extract interests
    const interests = extractInterests(query);
    if (interests.length > 0) {
      result.interests = interests;
    }

    return result;
  } catch (error) {
    console.error('Error processing natural language:', error);
    return result;
  }
};