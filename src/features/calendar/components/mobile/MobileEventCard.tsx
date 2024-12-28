```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../../../types/event';
import { formatDate } from '../../../../utils/date';

interface MobileEventCardProps {
  event: Event;
  onPress: () => void;
}

export const MobileEventCard: React.FC<MobileEventCardProps> = ({
  event,
  onPress
}) => {
  return (
    <motion.button
      onClick={onPress}
      className="w-full bg-fjs-charcoal rounded-lg p-4 mb-3"
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div>
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
              {event.location.address}
            </div>
            <div className="flex items-center text-sm text-fjs-silver">
              <Users className="w-4 h-4 mr-2" />
              {event.attendees.length} / {event.capacity}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};
```