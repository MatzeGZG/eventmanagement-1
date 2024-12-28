```typescript
export interface SubEvent {
  id: string;
  parentEventId: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: Location;
  capacity: number;
  attendees: string[];
}

export interface MultiDayEvent extends Event {
  dateRange: {
    start: Date;
    end: Date;
  };
  subEvents: SubEvent[];
  template?: EventTemplate;
  waitlist: string[];
  schedule: EventSchedule;
}

export interface EventTemplate {
  id: string;
  name: string;
  type: 'conference' | 'festival' | 'workshop' | 'course';
  defaultSchedule: EventSchedule;
  defaultCapacity: number;
  pricing: {
    fullEvent: number;
    singleDay: number;
    earlyBird?: number;
  };
}

export interface EventSchedule {
  days: {
    [date: string]: {
      startTime: string;
      endTime: string;
      sessions: EventSession[];
    };
  };
}

export interface EventSession {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  speakers?: string[];
  location: Location;
  capacity: number;
}
```