```typescript
export type RecurrenceFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  interval: number;
  endDate?: Date;
  count?: number;
  weekDays?: number[];
  monthDay?: number;
  monthWeek?: number;
  exceptions?: Date[];
}

export interface RecurringEvent {
  eventId: string;
  rule: RecurrenceRule;
  instances: Date[];
}
```