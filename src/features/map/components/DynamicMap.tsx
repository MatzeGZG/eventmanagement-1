import React from 'react';
import Map, { NavigationControl, GeolocateControl, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DynamicMapProps {
  interactive?: boolean;
  initialViewState?: Partial<ViewState>;
  children?: React.ReactNode;
  mapStyle?: string;
}

export const DynamicMap: React.FC<DynamicMapProps> = ({
  interactive = true,
  initialViewState,
  children,
  mapStyle = "mapbox://styles/mapbox/dark-v11"
}) => {
  if (!import.meta.env.VITE_MAPBOX_TOKEN) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <p className="text-fjs-gold">Mapbox token not configured</p>
      </div>
    );
  }

  return (
    <Map
      mapStyle={mapStyle}
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      interactive={interactive}
      initialViewState={{
        latitude: 47.1662,
        longitude: 8.5155,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        ...initialViewState
      }}
    >
      {interactive && (
        <>
          <GeolocateControl position="top-right" />
          <NavigationControl position="top-right" />
        </>
      )}
      {children}
    </Map>
  );
};