```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';

interface DraggableEventProps {
  event: Event;
  onDragStart: (event: Event) => void;
}

export const DraggableEvent: React.FC<DraggableEventProps> = ({
  event,
  onDragStart
}) => {
  return (
    <motion.div
      draggable
      onDragStart={() => onDragStart(event)}
      whileHover={{ scale: 1.02 }}
      className="p-2 bg-fjs-charcoal rounded-lg cursor-move 
                hover:shadow-lg hover:shadow-fjs-gold/10 transition-all"
    >
      <div className="text-sm font-medium text-fjs-gold truncate">
        {event.title}
      </div>
      <div className="text-xs text-fjs-silver mt-1">
        {formatDate(event.date)}
      </div>
    </motion.div>
  );
};
```