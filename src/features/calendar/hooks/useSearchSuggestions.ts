```typescript
import { useState, useCallback, useEffect } from 'react';
import { Event } from '../../../types/event';
import { useStore } from '../../../store';

export const useSearchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const events = useStore(state => state.events);

  const generateSuggestions = useCallback((input: string) => {
    if (!input.trim()) return [];

    // Extract unique categories, locations, and popular terms
    const categories = new Set(events.map(e => e.category));
    const locations = new Set(events.map(e => e.location.city));
    const terms = new Set(events.flatMap(e => e.tags));

    // Generate contextual suggestions
    const suggestions = [
      ...Array.from(categories).map(c => `${c} events`),
      ...Array.from(locations).map(l => `events in ${l}`),
      ...Array.from(terms).map(t => `${t} events`),
      'events this weekend',
      'events next week',
      'upcoming events'
    ].filter(s => 
      s.toLowerCase().includes(input.toLowerCase())
    );

    return suggestions.slice(0, 5);
  }, [events]);

  return { generateSuggestions };
};
```