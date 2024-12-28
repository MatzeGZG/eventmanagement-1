import { Event, EventCategory, EventStatus } from '../../../types/event';

export const createMockEvent = (overrides?: Partial<Event>): Event => ({
  id: '1',
  title: 'Test Event',
  description: 'Test Description',
  date: new Date(Date.now() + 86400000),
  location: {
    address: '123 Test St',
    city: 'Test City',
    country: 'Test Country',
    coordinates: { latitude: 0, longitude: 0 }
  },
  category: EventCategory.Tech,
  tags: ['test'],
  capacity: 100,
  attendees: [],
  price: 0,
  images: [],
  status: EventStatus.Published,
  organizer: {
    id: '1',
    name: 'Test Organizer',
    email: 'test@example.com',
    level: 'New Explorer',
    xp: 0,
    points: 0,
    badges: [],
    interests: [],
    connections: [],
    createdAt: new Date()
  },
  ...overrides
});