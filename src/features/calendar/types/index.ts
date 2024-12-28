```typescript
import { Event } from '../../../types/event';

export interface CalendarEvent extends Event {
  source: 'internal' | 'google' | 'apple' | 'outlook' | 'predictHQ';
  sourceId?: string;
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
  };
}

export interface CalendarView {
  type: 'month' | 'week' | 'day' | 'agenda';
  date: Date;
}

export interface CalendarFilter {
  categories?: string[];
  radius?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export type SyncProvider = 'google' | 'apple' | 'outlook';

export interface SyncConfig {
  provider: SyncProvider;
  syncDirection: 'import' | 'export' | 'both';
  dateRange?: {
    start: Date;
    end: Date;
  };
}
```