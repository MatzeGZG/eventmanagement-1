import { PredictHQEvent } from './types';
import { Event, EventCategory } from '../../../types/event';

const CATEGORY_MAP: Record<string, EventCategory> = {
  'concerts': EventCategory.Music,
  'conferences': EventCategory.Tech,
  'sports': EventCategory.Fitness,
  'expos': EventCategory.Business,
  'performing-arts': EventCategory.Arts,
  'community': EventCategory.Arts,
  'festivals': EventCategory.Arts
};

export function transformPredictHQEvent(event: PredictHQEvent): Event {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: new Date(event.start),
    location: {
      coordinates: {
        latitude: event.location[0],
        longitude: event.location[1]
      },
      address: '', // Would need geocoding service
      city: '',    // Would need geocoding service
      country: ''  // Would need geocoding service
    },
    category: CATEGORY_MAP[event.category] || EventCategory.Arts,
    tags: event.labels || [],
    capacity: estimateCapacity(event),
    attendees: [],
    price: 0,
    images: [],
    status: 'Published',
    organizer: {
      id: 'predicthq',
      name: 'PredictHQ Events',
      email: 'events@predicthq.com',
      level: 'New Explorer',
      xp: 0,
      points: 0,
      badges: [],
      interests: [],
      connections: [],
      createdAt: new Date()
    }
  };
}

function estimateCapacity(event: PredictHQEvent): number {
  if (event.phq_attendance) {
    return event.phq_attendance;
  }

  // Estimate based on rank (0-100)
  const baseCapacity = 50;
  return baseCapacity + Math.floor(event.rank * 5);
}