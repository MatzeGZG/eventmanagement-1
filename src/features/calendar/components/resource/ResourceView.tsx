```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../../../types/event';
import { formatDate } from '../../../utils/date';

interface Resource {
  id: string;
  name: string;
  type: string;
  capacity: number;
}

interface ResourceViewProps {
  resources: Resource[];
  events: Event[];
  onEventClick: (event: Event) => void;
}

export const ResourceView: React.FC<ResourceViewProps> = ({
  resources,
  events,
  onEventClick
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="grid grid-cols-[100px_repeat(auto-fill,minmax(200px,1fr))] border-b border-fjs-charcoal">
          <div className="p-4 text-fjs-silver font-medium">Time</div>
          {resources.map(resource => (
            <div key={resource.id} className="p-4 text-fjs-gold font-medium">
              {resource.name}
              <div className="text-xs text-fjs-silver">
                Capacity: {resource.capacity}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="relative">
          {hours.map(hour => (
            <div
              key={hour}
              className="grid grid-cols-[100px_repeat(auto-fill,minmax(200px,1fr))] border-b border-fjs-charcoal"
            >
              <div className="p-2 text-fjs-silver text-sm">
                {hour.toString().padStart(2, '0')}:00
              </div>
              {resources.map(resource => (
                <ResourceCell
                  key={resource.id}
                  resource={resource}
                  hour={hour}
                  events={events.filter(event => 
                    event.date.getHours() === hour &&
                    event.location.address === resource.name // Assuming resource name matches location
                  )}
                  onEventClick={onEventClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ResourceCellProps {
  resource: Resource;
  hour: number;
  events: Event[];
  onEventClick: (event: Event) => void;
}

const ResourceCell: React.FC<ResourceCellProps> = ({
  resource,
  hour,
  events,
  onEventClick
}) => {
  return (
    <div className="p-1 min-h-[60px] relative">
      {events.map(event => (
        <motion.button
          key={event.id}
          onClick={() => onEventClick(event)}
          className="absolute inset-x-1 bg-fjs-charcoal rounded p-2 text-left"
          style={{
            top: `${(event.date.getMinutes() / 60) * 100}%`,
            height: '50px'
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-sm font-medium text-fjs-gold truncate">
            {event.title}
          </div>
          <div className="text-xs text-fjs-silver">
            {formatDate(event.date)}
          </div>
        </motion.button>
      ))}
    </div>
  );
};
```