```typescript
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicMap } from '../../map/components/DynamicMap';
import { CalendarContainer } from '../../calendar/components/CalendarContainer';
import { EventList } from '../../events/components/EventList';
import { Event } from '../../../types/event';

interface ViewContentProps {
  view: 'map' | 'calendar' | 'list';
  selectedEvent: Event | null;
  onEventSelect: (event: Event) => void;
}

export const ViewContent: React.FC<ViewContentProps> = ({
  view,
  selectedEvent,
  onEventSelect
}) => {
  const viewComponents = {
    map: (
      <DynamicMap 
        onEventSelect={onEventSelect}
        selectedEvent={selectedEvent}
      />
    ),
    calendar: (
      <CalendarContainer 
        onEventSelect={onEventSelect}
        selectedEvent={selectedEvent}
      />
    ),
    list: (
      <EventList 
        onEventSelect={onEventSelect}
        selectedEvent={selectedEvent}
      />
    )
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
      >
        {viewComponents[view]}
      </motion.div>
    </AnimatePresence>
  );
};
```