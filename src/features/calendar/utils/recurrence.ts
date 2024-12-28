```typescript
import { addDays, addWeeks, addMonths, addYears, isBefore } from 'date-fns';
import { RecurrenceRule, RecurrenceInstance } from '../types/recurrence';
import { CalendarEvent } from '../types';

export const generateRecurrenceInstances = (
  event: CalendarEvent,
  rule: RecurrenceRule,
  rangeStart: Date,
  rangeEnd: Date
): RecurrenceInstance[] => {
  const instances: RecurrenceInstance[] = [];
  let currentDate = new Date(event.date);

  while (isBefore(currentDate, rangeEnd)) {
    if (isBefore(currentDate, rangeStart)) {
      currentDate = getNextDate(currentDate, rule);
      continue;
    }

    if (rule.endDate && isBefore(rule.endDate, currentDate)) {
      break;
    }

    if (!rule.exceptions?.includes(currentDate)) {
      instances.push({
        originalEventId: event.id,
        date: new Date(currentDate),
        isException: false
      });
    }

    currentDate = getNextDate(currentDate, rule);
  }

  return instances;
};

const getNextDate = (date: Date, rule: RecurrenceRule): Date => {
  switch (rule.pattern) {
    case 'daily':
      return addDays(date, rule.interval);
    case 'weekly':
      return addWeeks(date, rule.interval);
    case 'monthly':
      return addMonths(date, rule.interval);
    case 'yearly':
      return addYears(date, rule.interval);
    default:
      return date;
  }
};
```