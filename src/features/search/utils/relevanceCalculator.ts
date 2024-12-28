import { Event } from '../../../types/event';
import { ProcessedQuery } from '../types';

export const calculateRelevanceScore = (
  event: Event,
  query: ProcessedQuery
): number => {
  let score = 0;
  let matches = 0;

  // Location matching
  if (query.location && event.location.city.toLowerCase().includes(query.location.toLowerCase())) {
    score += 0.4;
    matches++;
  }

  // Date range matching
  if (query.dateRange) {
    const eventDate = new Date(event.date);
    if (eventDate >= query.dateRange.start && eventDate <= query.dateRange.end) {
      score += 0.3;
      matches++;
    }
  }

  // Category matching
  if (query.categories?.some(cat => 
    event.category.toLowerCase().includes(cat.toLowerCase())
  )) {
    score += 0.2;
    matches++;
  }

  // Interest matching
  if (query.interests?.some(interest =>
    event.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
  )) {
    score += 0.1;
    matches++;
  }

  // Normalize score based on number of matches
  return matches > 0 ? score / matches : 0;
};