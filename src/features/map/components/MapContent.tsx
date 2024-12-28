import React from 'react';
import Map, { NavigationControl, GeolocateControl } from 'react-map-gl';
import { useMapData } from '../hooks/useMapData';
import { useMapInteractions } from '../hooks/useMapInteractions';
import { MapControls } from './controls/MapControls';
import { EventMarkers } from './markers/EventMarkers';
import 'mapbox-gl/dist/mapbox-gl.css';

export const MapContent = () => {
  const { visibleEvents, updateVisibleEvents } = useMapData();
  const { viewState, selectedItem, handleViewStateChange, handleMarkerClick, handlePopupClose } = useMapInteractions();

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
    >
      <GeolocateControl position="top-right" />
      <NavigationControl position="top-right" />
      
      <EventMarkers
        events={visibleEvents}
        onMarkerClick={handleMarkerClick}
        selectedEvent={selectedItem}
        onPopupClose={handlePopupClose}
      />
      <MapControls />
    </Map>
  );
};