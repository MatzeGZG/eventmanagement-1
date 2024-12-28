import React from 'react';
import { Marker } from 'react-map-gl';
import { Event } from '../../../../types/event';
import { useClusters } from '../../hooks/useClusters';

interface MarkerClusterProps {
  events: Event[];
  maxZoom: number;
  radius: number;
  onClick: (event: Event) => void;
}

export const MarkerCluster: React.FC<MarkerClusterProps> = ({
  events,
  maxZoom,
  radius,
  onClick
}) => {
  const clusters = useClusters(events, maxZoom, radius);

  return (
    <>
      {clusters.map((cluster) => (
        <Marker
          key={cluster.id}
          latitude={cluster.latitude}
          longitude={cluster.longitude}
        >
          <button
            onClick={() => onClick(cluster.events[0])}
            className={`
              flex items-center justify-center rounded-full 
              ${cluster.events.length > 1 
                ? 'w-10 h-10 bg-fjs-gold text-black font-medium' 
                : 'w-8 h-8 bg-fjs-charcoal text-fjs-gold'
              } hover:scale-110 transition-transform
            `}
          >
            {cluster.events.length}
          </button>
        </Marker>
      ))}
    </>
  );
};