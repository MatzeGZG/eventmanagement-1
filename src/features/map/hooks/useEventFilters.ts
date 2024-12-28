import { useState, useCallback, useMemo } from 'react';
import { Event, EventCategory } from '../../../types/event';
import { useStore } from '../../../store';
import * as turf from '@turf/turf';

export const useEventFilters = (events: Event[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(10); // in kilometers
  const user = useStore(state => state.user);

  const filterBySearch = useCallback((event: Event) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }, [searchTerm]);

  const filterByCategory = useCallback((event: Event) => {
    if (!selectedCategory) return true;
    return event.category === selectedCategory;
  }, [selectedCategory]);

  const filterByDistance = useCallback((event: Event) => {
    if (!user?.location) return true;
    
    const from = turf.point([
      user.location.coordinates.longitude,
      user.location.coordinates.latitude
    ]);
    
    const to = turf.point([
      event.location.coordinates.longitude,
      event.location.coordinates.latitude
    ]);
    
    const distance = turf.distance(from, to);
    return distance <= maxDistance;
  }, [user, maxDistance]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      filterBySearch(event) &&
      filterByCategory(event) &&
      filterByDistance(event)
    );
  }, [events, filterBySearch, filterByCategory, filterByDistance]);

  const sortedEvents = useMemo(() => {
    if (!user) return filteredEvents;

    return [...filteredEvents].sort((a, b) => {
      // Calculate relevance score based on matching interests
      const aScore = a.tags.filter(tag => user.interests.includes(tag)).length;
      const bScore = b.tags.filter(tag => user.interests.includes(tag)).length;
      return bScore - aScore;
    });
  }, [filteredEvents, user]);

  return {
    filteredEvents: sortedEvents,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    maxDistance,
    setMaxDistance
  };
};