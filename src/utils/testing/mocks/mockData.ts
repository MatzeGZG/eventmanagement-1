import { Event, EventCategory, EventStatus } from '../../../types/event';
import { User, UserLevel } from '../../../types/user';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  level: UserLevel.NewExplorer,
  xp: 0,
  points: 0,
  badges: [],
  interests: ['Tech', 'Music'],
  connections: [],
  createdAt: new Date()
};

export const mockEvent: Event = {
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
  organizer: mockUser
};