import React from 'react';
import { Layer, Source } from 'react-map-gl';
import { Event } from '../../../../types/event';

interface HeatmapLayerProps {
  events: Event[];
  visible: boolean;
}

export const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ events, visible }) => {
  const data = {
    type: 'FeatureCollection',
    features: events.map(event => ({
      type: 'Feature',
      properties: {
        weight: event.attendees.length / event.capacity
      },
      geometry: {
        type: 'Point',
        coordinates: [
          event.location.coordinates.longitude,
          event.location.coordinates.latitude
        ]
      }
    }))
  };

  if (!visible) return null;

  return (
    <Source type="geojson" data={data}>
      <Layer
        id="events-heat"
        type="heatmap"
        paint={{
          'heatmap-weight': ['get', 'weight'],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            9, 20
          ],
          'heatmap-opacity': 0.7
        }}
      />
    </Source>
  );
};