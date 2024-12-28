```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEventRecommendations } from '../../hooks/useEventRecommendations';
import { EventCard } from '../EventCard';

export const EventRecommendations: React.FC = () => {
  const { recommendations, loading, getRecommendations } = useEventRecommendations();

  React.useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  if (loading) {
    return (
      <div className="text-center text-fjs-silver">
        Finding perfect matches for you...
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="text-center text-fjs-silver">
        No recommendations found. Try updating your interests!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="w-6 h-6 text-fjs-gold mr-2" />
          <h2 className="text-2xl font-bold text-fjs-gold">Recommended for You</h2>
        </div>
        <button
          onClick={() => getRecommendations()}
          className="text-fjs-silver hover:text-fjs-gold"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(({ event, score, matchingFactors }, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard 
              event={event}
              score={score}
              matchingFactors={matchingFactors}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```