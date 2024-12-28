import { PredictHQAPI } from '../../features/events/api/predictHQ';
import { transformPredictHQEvent } from '../../features/events/api/transformers';
import { useStore } from '../../store';

const LOCATIONS = {
  LONDON: { latitude: 51.5074, longitude: -0.1278 },
  DAVOS: { latitude: 46.8011, longitude: 9.8339 },
  ZUG: { latitude: 47.1662, longitude: 8.5155 },
  ST_MORITZ: { latitude: 46.4908, longitude: 9.8355 }
};

export const fetchEventsForLocations = async () => {
  const api = new PredictHQAPI();
  const addEvent = useStore.getState().addEvent;

  // Calculate date range
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  for (const [city, coords] of Object.entries(LOCATIONS)) {
    try {
      const response = await api.searchEvents({
        location: {
          ...coords,
          radius: '20km'
        },
        dateRange: {
          start: startDate,
          end: endDate
        }
      });

      const events = response.results.map(event => ({
        ...transformPredictHQEvent(event),
        location: {
          ...transformPredictHQEvent(event).location,
          city: city.replace('_', ' ')
        }
      }));

      // Add events to store
      events.forEach(addEvent);
      
      console.log(`Fetched ${events.length} events for ${city}`);
    } catch (error) {
      console.error(`Error fetching events for ${city}:`, error);
    }
  }
};