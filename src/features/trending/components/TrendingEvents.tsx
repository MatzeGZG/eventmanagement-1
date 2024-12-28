import React from 'react';
import { Flame } from 'lucide-react';
import { useTrendingEvents } from '../hooks/useTrendingEvents';
import { EventCard } from '../../../components/events/EventCard';

export const TrendingEvents: React.FC = () => {
  const { trendingEvents } = useTrendingEvents();

  return (
    <div className="bg-black rounded-lg p-6 shadow-xl">
      <div className="flex items-center mb-6">
        <Flame className="w-6 h-6 text-fjs-gold mr-2" />
        <h2 className="text-2xl font-bold text-fjs-gold">Hot Right Now</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendingEvents.map(({ event, metrics }) => (
          <EventCard
            key={event.id}
            event={event}
            metrics={metrics}
            showTrendingIndicator
          />
        ))}
      </div>
    </div>
  );
};