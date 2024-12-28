export interface CustomCalendar {
  id: string;
  userId: string;
  name: string;
  description?: string;
  filters: CalendarFilters;
  color?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarFilters {
  categories?: string[];
  tags?: string[];
  locations?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface CalendarPreferences {
  userId: string;
  defaultCalendarId?: string;
  defaultView: 'month' | 'week' | 'day' | 'agenda';
  timeZone?: string;
  weekStartsOn: number;
  showWeekends: boolean;
}

export interface CalendarSource {
  id: string;
  userId: string;
  calendarId: string;
  provider: 'google' | 'apple' | 'outlook' | 'meetup';
  credentials?: Record<string, any>;
  syncFrequency: string;
  lastSynced?: Date;
}