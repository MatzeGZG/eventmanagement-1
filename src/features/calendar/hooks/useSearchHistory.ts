```typescript
import { useState, useCallback } from 'react';

const MAX_HISTORY_ITEMS = 10;
const STORAGE_KEY = 'calendar-search-history';

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const addToHistory = useCallback((query: string) => {
    setHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)]
        .slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    history,
    addToHistory,
    clearHistory
  };
};
```