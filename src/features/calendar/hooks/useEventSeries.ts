```typescript
import { useState, useCallback } from 'react';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { Event } from '../../../types/event';
import { RecurrenceRule, RecurrenceFrequency } from '../types/recurrence';

export const useEventSeries = () => {
  const [seriesEvents, setSeriesEvents] = useState<Map<string, Event[]>>(new Map());

  const generateSeriesEvents = useCallback((
    baseEvent: Event,
    rule: RecurrenceRule,
    count: number
  ): Event[] => {
    const events: Event[] = [];
    let currentDate = new Date(baseEvent.date);

    for (let i = 0; i < count; i++) {
      if (rule.endDate && currentDate > rule.endDate) break;

      const event: Event = {
        ...baseEvent,
        id: `${baseEvent.id}-${i}`,
        date: currentDate,
        seriesId: baseEvent.id
      };

      events.push(event);
      currentDate = getNextDate(currentDate, rule);
    }

    return events;
  }, []);

  const createEventSeries = useCallback((
    baseEvent: Event,
    rule: RecurrenceRule
  ) => {
    const events = generateSeriesEvents(baseEvent, rule, 52); // Generate a year's worth
    setSeriesEvents(prev => new Map(prev).set(baseEvent.id, events));
    return events;
  }, [generateSeriesEvents]);

  const updateEventSeries = useCallback((
    seriesId: string,
    updates: Partial<Event>
  ) => {
    setSeriesEvents(prev => {
      const series = prev.get(seriesId);
      if (!series) return prev;

      const updatedSeries = series.map(event => ({
        ...event,
        ...updates
      }));

      return new Map(prev).set(seriesId, updatedSeries);
    });
  }, []);

  return {
    seriesEvents,
    createEventSeries,
    updateEventSeries
  };
};

const getNextDate = (date: Date, rule: RecurrenceRule): Date => {
  switch (rule.frequency) {
    case 'daily':
      return addDays(date, rule.interval);
    case 'weekly':
      return addWeeks(date, rule.interval);
    case 'monthly':
      return addMonths(date, rule.interval);
    case 'yearly':
      return addYears(date, rule.interval);
  }
};
```