import { useState, useCallback } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { processNaturalLanguage } from '../utils/nlpProcessor';
import { calculateRelevanceScore } from '../utils/relevanceCalculator';

export const useNaturalLanguageSearch = () => {
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const events = useStore(state => state.events);
  const user = useStore(state => state.user);

  const searchWithNLP = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Process natural language query
      const parsedQuery = await processNaturalLanguage(query);
      
      // Filter and score events
      const scoredResults = events
        .map(event => ({
          event,
          score: calculateRelevanceScore(event, parsedQuery, user?.interests || [])
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score);

      setResults(scoredResults.map(r => r.event));

      // Generate contextual suggestions
      const newSuggestions = generateSuggestions(query, parsedQuery, user?.interests || []);
      setSuggestions(newSuggestions);
    } finally {
      setLoading(false);
    }
  }, [events, user]);

  return {
    results,
    loading,
    suggestions,
    searchWithNLP
  };
};

const generateSuggestions = (
  query: string,
  parsedQuery: any,
  userInterests: string[]
): string[] => {
  const suggestions: string[] = [];

  // Add time-based suggestions
  if (!parsedQuery.dateRange) {
    suggestions.push(
      'events this weekend',
      'events next week',
      'upcoming events'
    );
  }

  // Add interest-based suggestions
  userInterests.forEach(interest => {
    suggestions.push(`${interest} events near me`);
  });

  // Add location-based suggestions
  if (!parsedQuery.location) {
    suggestions.push(
      'events near me',
      'events in my city'
    );
  }

  return suggestions
    .filter(s => !query.toLowerCase().includes(s.toLowerCase()))
    .slice(0, 5);
};