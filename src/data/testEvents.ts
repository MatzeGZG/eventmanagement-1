import { Event, EventCategory, EventStatus } from '../types/event';
import { TEST_USERS } from './testUsers';

export const TEST_EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'Tech Meetup Zug',
    description: 'Join us for an evening of networking and tech talks about the latest in web development and blockchain technology.',
    organizer: TEST_USERS[0],
    date: new Date('2024-02-15T18:00:00'),
    location: {
      address: 'Technologiepark',
      city: 'Zug',
      country: 'Switzerland',
      coordinates: {
        latitude: 47.1662,
        longitude: 8.5155
      }
    },
    category: EventCategory.Tech,
    tags: ['Networking', 'Technology', 'Innovation', 'Blockchain'],
    capacity: 100,
    attendees: ['test1', 'test2'],
    price: 0,
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87'],
    status: EventStatus.Published
  },
  {
    id: 'event-2',
    title: 'Startup Weekend Zug',
    description: 'Build a startup in 54 hours! Join entrepreneurs, developers, and designers for an intense weekend of innovation.',
    organizer: TEST_USERS[1],
    date: new Date('2024-02-20T09:00:00'),
    location: {
      address: 'V-Zug Innovation Center',
      city: 'Zug',
      country: 'Switzerland',
      coordinates: {
        latitude: 47.1690,
        longitude: 8.5170
      }
    },
    category: EventCategory.Business,
    tags: ['Startup', 'Innovation', 'Business', 'Networking'],
    capacity: 50,
    attendees: ['test1', 'test3'],
    price: 99,
    images: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622'],
    status: EventStatus.Published
  },
  {
    id: 'event-3',
    title: 'Crypto Valley Conference',
    description: 'The largest blockchain and cryptocurrency conference in Switzerland.',
    organizer: TEST_USERS[2],
    date: new Date('2024-03-05T10:00:00'),
    location: {
      address: 'Casino Zug',
      city: 'Zug',
      country: 'Switzerland',
      coordinates: {
        latitude: 47.1672,
        longitude: 8.5160
      }
    },
    category: EventCategory.Tech,
    tags: ['Crypto', 'Blockchain', 'Finance', 'Technology'],
    capacity: 200,
    attendees: ['test2', 'test3'],
    price: 299,
    images: ['https://images.unsplash.com/photo-1516245834210-c4c142787335'],
    status: EventStatus.Published
  },
  {
    id: 'event-4',
    title: 'Wellness & Yoga Retreat',
    description: 'A day of mindfulness, yoga, and wellness workshops by the lake.',
    organizer: TEST_USERS[0],
    date: new Date('2024-03-10T08:00:00'),
    location: {
      address: 'Zugersee Promenade',
      city: 'Zug',
      country: 'Switzerland',
      coordinates: {
        latitude: 47.1682,
        longitude: 8.5145
      }
    },
    category: EventCategory.Wellness,
    tags: ['Yoga', 'Mindfulness', 'Health', 'Wellness'],
    capacity: 30,
    attendees: ['test1'],
    price: 150,
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b'],
    status: EventStatus.Published
  },
  // Today's event in Zug
  {
    id: 'event-5',
    title: 'Luxury Networking Soirée',
    description: 'An exclusive evening of networking with Zug\'s elite entrepreneurs and innovators. Featuring gourmet catering and live jazz.',
    organizer: TEST_USERS[0],
    date: new Date(), // Today's date
    location: {
      address: 'Park Hotel Zug',
      city: 'Zug',
      country: 'Switzerland',
      coordinates: {
        latitude: 47.1665,
        longitude: 8.5158
      }
    },
    category: EventCategory.Business,
    tags: ['Networking', 'Luxury', 'Business', 'Innovation'],
    capacity: 75,
    attendees: ['test1', 'test2', 'test3'], // All test users attending
    price: 250,
    images: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30'],
    status: EventStatus.Published
  },
  // Today's event in London
  {
    id: 'event-6',
    title: 'London Tech Leaders Summit',
    description: 'Join London\'s most influential tech leaders for an evening of insights, networking, and future-focused discussions at the iconic Shard.',
    organizer: TEST_USERS[0],
    date: new Date(), // Today's date
    location: {
      address: 'The Shard',
      city: 'London',
      country: 'United Kingdom',
      coordinates: {
        latitude: 51.5045,
        longitude: -0.0865
      }
    },
    category: EventCategory.Tech,
    tags: ['Technology', 'Leadership', 'Innovation', 'Networking'],
    capacity: 100,
    attendees: ['test1', 'test2', 'test3'], // All test users attending
    price: 350,
    images: ['https://images.unsplash.com/photo-1533929736458-ca588d08c8be'],
    status: EventStatus.Published
  }
];