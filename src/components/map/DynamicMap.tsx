import React from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl';
import { useMapData } from '../../features/map/hooks/useMapData';
import { useMapInteractions } from '../../features/map/hooks/useMapInteractions';
import { EventMarkers } from './markers/EventMarkers';
import { useLocation } from '../../hooks/useLocation';
import 'mapbox-gl/dist/mapbox-gl.css';

export const DynamicMap: React.FC = () => {
  const { loading, visibleEvents, updateVisibleEvents } = useMapData();
  const { viewState, selectedItem, handleViewStateChange, handleMarkerClick, handlePopupClose } = useMapInteractions();
  const { coordinates } = useLocation();

  return (
    <Map
      {...viewState}
      onMove={evt => handleViewStateChange(evt.viewState)}
      onMoveEnd={evt => {
        const bounds = evt.target.getBounds();
        updateVisibleEvents(bounds);
      }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      initialViewState={{
        latitude: coordinates?.latitude || 47.1662,
        longitude: coordinates?.longitude || 8.5155,
        zoom: 11
      }}
    >
      <GeolocateControl position="top-right" />
      <NavigationControl position="top-right" />
      <EventMarkers
        events={visibleEvents}
        onMarkerClick={handleMarkerClick}
        selectedEvent={selectedItem}
        onPopupClose={handlePopupClose}
      />
    </Map>
  );
};