```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, TrendingUp } from 'lucide-react';
import { usePersonalization } from '../hooks/usePersonalization';
import { EventCard } from '../../../components/events/EventCard';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const PersonalizedFeed: React.FC = () => {
  const { personalizedEvents, loading, refresh } = usePersonalization();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-fjs-gold" />
          <h2 className="text-2xl font-bold text-fjs-gold">For You</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refresh}
          className="text-fjs-silver hover:text-fjs-gold"
        >
          <TrendingUp className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalizedEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard 
              event={event}
              showTrendingIndicator
            />
          </motion.div>
        ))}
      </div>

      {personalizedEvents.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-8 h-8 text-fjs-gold mx-auto mb-4" />
          <p className="text-fjs-silver">
            No events found nearby. Try expanding your search area or interests.
          </p>
        </div>
      )}
    </div>
  );
};
```