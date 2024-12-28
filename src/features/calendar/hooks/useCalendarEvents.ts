import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { Event } from '../../../types/event';
import { useToast } from '../../../hooks/useToast';

export const useCalendarEvents = (showMyEvents: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const storeEvents = useStore(state => state.events);
  const user = useStore(state => state.user);
  const { showToast } = useToast();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        let filteredEvents = storeEvents;
        
        // Filter for user's events if showMyEvents is true
        if (showMyEvents && user) {
          filteredEvents = storeEvents.filter(event => 
            event.attendees.includes(user.id) || 
            event.organizer.id === user.id
          );
        }
        
        setEvents(filteredEvents);
      } catch (error) {
        showToast('Failed to load events', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [storeEvents, showMyEvents, user, showToast]);

  return {
    events,
    loading
  };
};