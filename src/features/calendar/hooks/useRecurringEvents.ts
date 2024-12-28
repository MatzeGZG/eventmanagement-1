```typescript
import { useState, useCallback } from 'react';
import { addDays, addWeeks, addMonths, addYears, isBefore } from 'date-fns';
import { RecurrenceRule, RecurringEvent } from '../types/recurrence';
import { Event } from '../../../types/event';

export const useRecurringEvents = () => {
  const [recurringEvents, setRecurringEvents] = useState<RecurringEvent[]>([]);

  const generateInstances = useCallback((
    event: Event,
    rule: RecurrenceRule,
    startDate: Date,
    endDate: Date
  ): Date[] => {
    const instances: Date[] = [];
    let currentDate = new Date(startDate);

    while (isBefore(currentDate, endDate)) {
      if (rule.exceptions?.includes(currentDate)) {
        currentDate = getNextDate(currentDate, rule);
        continue;
      }

      if (rule.count && instances.length >= rule.count) break;
      if (rule.endDate && isBefore(rule.endDate, currentDate)) break;

      instances.push(new Date(currentDate));
      currentDate = getNextDate(currentDate, rule);
    }

    return instances;
  }, []);

  const addRecurringEvent = useCallback((event: Event, rule: RecurrenceRule) => {
    const endDate = rule.endDate || addYears(new Date(), 1);
    const instances = generateInstances(event, rule, event.date, endDate);

    setRecurringEvents(prev => [...prev, {
      eventId: event.id,
      rule,
      instances
    }]);
  }, [generateInstances]);

  const removeRecurringEvent = useCallback((eventId: string) => {
    setRecurringEvents(prev => prev.filter(re => re.eventId !== eventId));
  }, []);

  return {
    recurringEvents,
    addRecurringEvent,
    removeRecurringEvent
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