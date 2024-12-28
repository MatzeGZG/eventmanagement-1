import { LngLatBounds } from 'mapbox-gl';
import { Event } from '../../../types/event';

export const isEventInBounds = (event: Event, bounds: LngLatBounds): boolean => {
  if (!event?.location?.coordinates || !bounds) return false;

  const { latitude, longitude } = event.location.coordinates;
  return (
    latitude >= bounds.getSouth() &&
    latitude <= bounds.getNorth() &&
    longitude >= bounds.getWest() &&
    longitude <= bounds.getEast()
  );
};

export const calculateMapBounds = (events: Event[]): LngLatBounds | null => {
  if (!events?.length) return null;

  const bounds = new LngLatBounds();
  events.forEach(event => {
    const { latitude, longitude } = event.location.coordinates;
    bounds.extend([longitude, latitude]);
  });

  return bounds;
};