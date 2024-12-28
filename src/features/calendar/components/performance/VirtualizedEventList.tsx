```typescript
import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Event } from '../../../types/event';
import { EventCard } from '../EventCard';

interface VirtualizedEventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const VirtualizedEventList: React.FC<VirtualizedEventListProps> = ({
  events,
  onEventClick
}) => {
  return (
    <Virtuoso
      style={{ height: '100%' }}
      totalCount={events.length}
      itemContent={index => (
        <div className="p-2">
          <EventCard
            event={events[index]}
            onClick={() => onEventClick(events[index])}
          />
        </div>
      )}
      components={{
        List: React.forwardRef((props, ref) => (
          <div {...props} ref={ref as any} className="space-y-2" />
        ))
      }}
      increaseViewportBy={{ top: 200, bottom: 200 }}
    />
  );
};
```