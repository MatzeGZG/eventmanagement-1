import { EventCategory } from '../../types/event';

export interface CalendarFilters {
  categories: EventCategory[];
  location?: {
    city: string;
    radius: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export type CalendarViewType = 'month' | 'week' | 'day' | 'agenda';

export interface CalendarView {
  type: CalendarViewType;
  date: Date;
}