```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { SearchResult } from '../../types';
import { formatDate } from '../../../../utils/date';

interface EventSearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

export const EventSearchResults: React.FC<EventSearchResultsProps> = ({
  results,
  loading
}) => {
  if (loading) {
    return (
      <div className="mt-4 text-center text-fjs-silver">
        Searching for events...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-4 text-center text-fjs-silver">
        No events found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {results.map(({ event, score }) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-fjs-charcoal rounded-lg p-4 hover:bg-black/20 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-fjs-gold mb-2">
                {event.title}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-fjs-silver">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-fjs-silver">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location.city}, {event.location.country}
                </div>
                <div className="flex items-center text-sm text-fjs-silver">
                  <Users className="w-4 h-4 mr-2" />
                  {event.attendees.length} / {event.capacity} attendees
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-black/30 text-fjs-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {score > 0 && (
              <div className="ml-4">
                <div className="px-2 py-1 bg-fjs-gold/20 text-fjs-gold text-sm rounded-full">
                  {Math.round(score * 100)}% match
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```