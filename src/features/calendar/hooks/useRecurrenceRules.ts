```typescript
import { useState, useCallback } from 'react';
import { addDays, addWeeks, addMonths, addYears, isBefore } from 'date-fns';
import { RecurrenceRule, RecurrenceFrequency } from '../types/recurrence';
import { Event } from '../../../types/event';

export const useRecurrenceRules = () => {
  const [rules, setRules] = useState<Map<string, RecurrenceRule>>(new Map());

  const addRule = useCallback((eventId: string, rule: RecurrenceRule) => {
    setRules(prev => {
      const updated = new Map(prev);
      updated.set(eventId, rule);
      return updated;
    });
  }, []);

  const removeRule = useCallback((eventId: string) => {
    setRules(prev => {
      const updated = new Map(prev);
      updated.delete(eventId);
      return updated;
    });
  }, []);

  const generateInstances = useCallback((
    event: Event,
    rule: RecurrenceRule,
    rangeStart: Date,
    rangeEnd: Date
  ): Date[] => {
    const instances: Date[] = [];
    let currentDate = new Date(event.date);

    while (isBefore(currentDate, rangeEnd)) {
      if (isBefore(currentDate, rangeStart)) {
        currentDate = getNextDate(currentDate, rule);
        continue;
      }

      if (rule.endDate && isBefore(rule.endDate, currentDate)) break;
      if (rule.count && instances.length >= rule.count) break;

      // Check for exceptions
      if (!rule.exceptions?.some(date => 
        date.getTime() === currentDate.getTime()
      )) {
        instances.push(new Date(currentDate));
      }

      currentDate = getNextDate(currentDate, rule);
    }

    return instances;
  }, []);

  return {
    rules,
    addRule,
    removeRule,
    generateInstances
  };
};

const getNextDate = (date: Date, rule: RecurrenceRule): Date => {
  switch (rule.frequency) {
    case 'daily':
      return addDays(date, rule.interval);
    case 'weekly':
      if (rule.weekDays?.length) {
        // Handle specific weekdays
        let nextDate = addDays(date, 1);
        while (!rule.weekDays.includes(nextDate.getDay())) {
          nextDate = addDays(nextDate, 1);
        }
        return nextDate;
      }
      return addWeeks(date, rule.interval);
    case 'monthly':
      if (rule.monthDay) {
        // Handle specific day of month
        const nextDate = addMonths(date, rule.interval);
        nextDate.setDate(rule.monthDay);
        return nextDate;
      }
      return addMonths(date, rule.interval);
    case 'yearly':
      return addYears(date, rule.interval);
    default:
      throw new Error(`Unsupported frequency: ${rule.frequency}`);
  }
};
```