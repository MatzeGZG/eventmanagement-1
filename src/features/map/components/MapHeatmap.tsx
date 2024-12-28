import React, { useMemo } from 'react';
import { Layer, Source } from 'react-map-gl';

interface HeatmapPoint {
  latitude: number;
  longitude: number;
  weight: number;
}

interface MapHeatmapProps {
  points: HeatmapPoint[];
  intensity?: number;
  radius?: number;
  opacity?: number;
}

export const MapHeatmap: React.FC<MapHeatmapProps> = ({
  points,
  intensity = 1,
  radius = 30,
  opacity = 0.6
}) => {
  const data = useMemo(() => ({
    type: 'FeatureCollection',
    features: points.map(point => ({
      type: 'Feature',
      properties: {
        weight: point.weight
      },
      geometry: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude]
      }
    }))
  }), [points]);

  return (
    <Source type="geojson" data={data}>
      <Layer
        id="heatmap-layer"
        type="heatmap"
        paint={{
          'heatmap-weight': ['get', 'weight'],
          'heatmap-intensity': intensity,
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
          'heatmap-radius': radius,
          'heatmap-opacity': opacity
        }}
      />
    </Source>
  );
};