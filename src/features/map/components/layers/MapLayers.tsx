```typescript
import React from 'react';
import { Event } from '../../../../types/event';
import { MapLayers as MapLayersType } from '../../types';
import { HeatmapLayer } from './HeatmapLayer';
import { MarkerCluster } from '../clustering/MarkerCluster';
import { EventMarkers } from '../markers/EventMarkers';

interface MapLayersProps {
  events: Event[];
  layers: MapLayersType;
  selectedItem: Event | null;
  onMarkerClick: (event: Event) => void;
  onPopupClose: () => void;
}

export const MapLayers: React.FC<MapLayersProps> = ({
  events,
  layers,
  selectedItem,
  onMarkerClick,
  onPopupClose
}) => {
  return (
    <>
      {layers.heatmap && (
        <HeatmapLayer events={events} visible={true} />
      )}
      
      {layers.clusters ? (
        <MarkerCluster 
          events={events}
          maxZoom={18}
          radius={50}
          onClick={onMarkerClick}
        />
      ) : (
        <EventMarkers
          events={events}
          onMarkerClick={onMarkerClick}
          selectedEvent={selectedItem}
          onPopupClose={onPopupClose}
        />
      )}
    </>
  );
};
```