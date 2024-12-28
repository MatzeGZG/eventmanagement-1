import { useCallback } from 'react';
import { useStore } from '../../../store';
import { SearchResult, SearchFilters } from '../types';
import { processNaturalLanguage } from '../utils/nlpProcessor';
import { calculateRelevanceScore } from '../utils/relevanceCalculator';
import { filterEventsByFilters } from '../utils/filterEvents';

export const useSearchResults = () => {
  const events = useStore(state => state.events);

  const getSearchResults = useCallback(async (
    query: string,
    filters: SearchFilters
  ): Promise<SearchResult[]> => {
    if (!query?.trim() || !events?.length) {
      return [];
    }

    try {
      const parsedQuery = await processNaturalLanguage(query);
      const filteredEvents = filterEventsByFilters(events, filters);

      return filteredEvents
        .map(event => ({
          event,
          score: calculateRelevanceScore(event, parsedQuery)
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
    } catch (error) {
      console.error('Error getting search results:', error);
      return [];
    }
  }, [events]);

  return { getSearchResults };
};