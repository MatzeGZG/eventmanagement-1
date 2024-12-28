import { useCallback } from 'react';
import { Event } from '../../../types/event';
import { SearchResult } from '../types';
import { processNaturalLanguage } from '../utils/nlpProcessor';
import { calculateRelevanceScore } from '../utils/relevanceCalculator';

export const useSearchSuggestions = () => {
  const getSuggestions = useCallback(async (
    query: string,
    events: Event[]
  ): Promise<SearchResult[]> => {
    const parsedQuery = await processNaturalLanguage(query);

    const results = events
      .map(event => ({
        event,
        score: calculateRelevanceScore(event, parsedQuery)
      }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return results;
  }, []);

  return { getSuggestions };
};