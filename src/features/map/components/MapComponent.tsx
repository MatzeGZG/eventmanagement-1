import React, { useCallback } from 'react';
import Map, { NavigationControl, GeolocateControl, Marker, Popup } from 'react-map-gl';
import { useMapData } from '../hooks/useMapData';
import { useMapUsers } from '../hooks/useMapUsers';
import { EventMarkerWithTiming } from './markers/EventMarkerWithTiming';
import { UserMarker } from './UserMarker';
import { UserPopup } from './UserPopup';
import { MapLegend } from './MapLegend';
import { useToast } from '../../../hooks/useToast';
import { Event } from '../../../types/event';
import { User } from '../../../types/user';

const MapComponent: React.FC = () => {
  const { visibleEvents, updateVisibleEvents } = useMapData();
  const { visibleUsers, updateVisibleUsers } = useMapUsers();
  const [selectedItem, setSelectedItem] = React.useState<Event | User | null>(null);
  const { showToast } = useToast();

  const handleMessage = useCallback((userId: string) => {
    // TODO: Implement messaging
    showToast('Opening chat...', 'info');
  }, [showToast]);

  const handleConnect = useCallback((userId: string) => {
    // TODO: Implement connection
    showToast('Connection request sent!', 'success');
  }, [showToast]);

  return (
    <Map
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      onMoveEnd={evt => {
        const bounds = evt.target.getBounds();
        updateVisibleEvents(bounds);
        updateVisibleUsers(bounds);
      }}
    >
      <GeolocateControl position="top-right" />
      <NavigationControl position="top-right" />

      {/* Event Markers */}
      {visibleEvents.map(event => (
        <Marker
          key={event.id}
          latitude={event.location.coordinates.latitude}
          longitude={event.location.coordinates.longitude}
        >
          <EventMarkerWithTiming
            event={event}
            onClick={() => setSelectedItem(event)}
          />
        </Marker>
      ))}

      {/* User Markers */}
      {visibleUsers.map(user => (
        <Marker
          key={user.id}
          latitude={user.location!.coordinates.latitude}
          longitude={user.location!.coordinates.longitude}
        >
          <UserMarker
            user={user}
            onClick={() => setSelectedItem(user)}
          />
        </Marker>
      ))}

      {/* Popups */}
      {selectedItem && 'date' in selectedItem ? (
        <Popup
          latitude={selectedItem.location.coordinates.latitude}
          longitude={selectedItem.location.coordinates.longitude}
          onClose={() => setSelectedItem(null)}
          closeButton={true}
          closeOnClick={false}
        >
          {/* Event Popup content */}
        </Popup>
      ) : selectedItem && (
        <Popup
          latitude={selectedItem.location!.coordinates.latitude}
          longitude={selectedItem.location!.coordinates.longitude}
          onClose={() => setSelectedItem(null)}
          closeButton={true}
          closeOnClick={false}
        >
          <UserPopup
            user={selectedItem}
            onMessage={handleMessage}
            onConnect={handleConnect}
          />
        </Popup>
      )}

      <MapLegend />
    </Map>
  );
};

export default MapComponent;