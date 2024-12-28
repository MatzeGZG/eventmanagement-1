```typescript
import React from 'react';
import { Marker } from 'react-map-gl';
import { motion } from 'framer-motion';
import { Event } from '../../../../types/event';
import { useClusters } from '../../hooks/useClusters';

interface EventMarkerClusterProps {
  events: Event[];
  maxZoom: number;
  radius: number;
  onClusterClick: (events: Event[]) => void;
}

export const EventMarkerCluster: React.FC<EventMarkerClusterProps> = ({
  events,
  maxZoom,
  radius,
  onClusterClick
}) => {
  const clusters = useClusters(events, maxZoom, radius);

  return (
    <>
      {clusters.map(cluster => (
        <Marker
          key={cluster.id}
          latitude={cluster.latitude}
          longitude={cluster.longitude}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onClusterClick(cluster.events)}
            className={`
              flex items-center justify-center rounded-full 
              ${cluster.events.length > 1 
                ? 'w-10 h-10 bg-fjs-gold text-black font-medium' 
                : 'w-8 h-8 bg-fjs-charcoal text-fjs-gold'
              }
            `}
          >
            {cluster.events.length}
          </motion.button>
        </Marker>
      ))}
    </>
  );
};
```