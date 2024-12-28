import { useState, useCallback } from 'react';
import { LngLatBounds } from 'mapbox-gl';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';

export const useMapData = () => {
  const [loading, setLoading] = useState(true);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);
  const events = useStore(state => state.events);

  const updateVisibleEvents = useCallback((bounds: LngLatBounds | null) => {
    if (!events?.length || !bounds) {
      setVisibleEvents([]);
      return;
    }

    const filtered = events.filter(event => {
      const { latitude, longitude } = event.location.coordinates;
      return (
        latitude >= bounds.getSouth() &&
        latitude <= bounds.getNorth() &&
        longitude >= bounds.getWest() &&
        longitude <= bounds.getEast()
      );
    });

    setVisibleEvents(filtered);
    setLoading(false);
  }, [events]);

  return {
    loading,
    visibleEvents,
    updateVisibleEvents
  };
};