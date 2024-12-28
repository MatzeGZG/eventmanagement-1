```tsx
import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { Event } from '../../../types';
import { useStore } from '../../../store';
import { useUserLocation } from '../../location/hooks/useUserLocation';
import { colors } from '../../../styles/colors';
import 'mapbox-gl/dist/mapbox-gl.css';

export const EventMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 40.7128,
    longitude: -74.0060,
    zoom: 11
  });

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events = useStore(state => state.events);
  const { location } = useUserLocation();

  useEffect(() => {
    if (location?.coordinates) {
      setViewport(prev => ({
        ...prev,
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude
      }));
    }
  }, [location]);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <Map
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />

        {events.map(event => (
          <Marker
            key={event.id}
            latitude={event.location.coordinates.latitude}
            longitude={event.location.coordinates.longitude}
            anchor="bottom"
          >
            <button
              onClick={() => setSelectedEvent(event)}
              className="transform transition-transform hover:scale-110"
            >
              <MapPin className={`w-8 h-8 text-[${colors.primary.gold}]`} />
            </button>
          </Marker>
        ))}

        {selectedEvent && (
          <Popup
            latitude={selectedEvent.location.coordinates.latitude}
            longitude={selectedEvent.location.coordinates.longitude}
            onClose={() => setSelectedEvent(null)}
            closeButton={true}
            closeOnClick={false}
            anchor="bottom"
          >
            <div className="p-4 max-w-sm">
              <h3 className={`text-lg font-semibold text-[${colors.primary.gold}] mb-2`}>
                {selectedEvent.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedEvent.description}
              </p>
              <div className="flex justify-end">
                <button
                  className={`px-4 py-2 bg-[${colors.primary.gold}] text-white rounded-lg hover:bg-[${colors.primary.darkGold}] transition-colors`}
                >
                  View Details
                </button>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
```