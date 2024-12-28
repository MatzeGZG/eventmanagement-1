import React from 'react';
import { Marker, Popup } from 'react-map-gl';
import { Event } from '../../../types/event';
import { EventMarker } from './EventMarker';
import { EventPopup } from '../popups/EventPopup';

interface EventMarkersProps {
  events: Event[];
  onMarkerClick: (event: Event) => void;
  selectedEvent: Event | null;
  onPopupClose: () => void;
}

export const EventMarkers: React.FC<EventMarkersProps> = ({
  events,
  onMarkerClick,
  selectedEvent,
  onPopupClose
}) => {
  return (
    <>
      {events.map(event => (
        <Marker
          key={event.id}
          latitude={event.location.coordinates.latitude}
          longitude={event.location.coordinates.longitude}
          anchor="bottom"
        >
          <EventMarker
            event={event}
            onClick={() => onMarkerClick(event)}
            isHot={event.attendees.length > event.capacity * 0.8}
          />
        </Marker>
      ))}

      {selectedEvent && (
        <Popup
          latitude={selectedEvent.location.coordinates.latitude}
          longitude={selectedEvent.location.coordinates.longitude}
          onClose={onPopupClose}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
        >
          <EventPopup event={selectedEvent} onClose={onPopupClose} />
        </Popup>
      )}
    </>
  );
};