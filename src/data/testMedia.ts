import { MediaItem } from '../features/media/types';

export const TEST_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
    author: 'Sarah Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    description: 'Amazing networking event at Tech Hub',
    likes: 245,
    comments: 18,
    timestamp: new Date('2024-01-15T20:00:00'),
    eventId: 'event-1'
  },
  {
    id: 'media-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329',
    author: 'Sarah Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    description: 'VIP Launch Party',
    likes: 567,
    comments: 42,
    timestamp: new Date('2024-01-20T21:30:00'),
    eventId: 'event-2'
  },
  {
    id: 'media-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    author: 'Sarah Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    description: 'Fashion Week Highlights',
    likes: 789,
    comments: 56,
    timestamp: new Date('2024-01-25T19:15:00'),
    eventId: 'event-3'
  },
  {
    id: 'media-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
    author: 'Sarah Wilson',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    description: 'Startup Meetup',
    likes: 432,
    comments: 28,
    timestamp: new Date('2024-01-30T18:45:00'),
    eventId: 'event-4'
  }
];