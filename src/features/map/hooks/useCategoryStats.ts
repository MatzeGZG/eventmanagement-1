import { useMemo } from 'react';
import { useStore } from '../../../store';

interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export const useCategoryStats = (userInterests: string[]) => {
  const events = useStore(state => state.events);

  const categoryStats = useMemo(() => {
    const stats = userInterests.map(category => {
      const categoryEvents = events.filter(event => 
        event.tags.includes(category)
      );

      return {
        category,
        count: categoryEvents.length,
        percentage: (categoryEvents.length / events.length) * 100
      };
    });

    return stats.sort((a, b) => b.count - a.count);
  }, [events, userInterests]);

  return { categoryStats };
};