import { describe, it, expect } from 'vitest';
import { validateEvent } from '../../utils/validation';
import { Event, EventCategory, EventStatus } from '../../types/event';

describe('validateEvent', () => {
  const validEvent: Event = {
    id: '1',
    title: 'Test Event',
    description: 'Test Description',
    date: new Date(Date.now() + 86400000), // Tomorrow
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
    }
  };

  it('validates a correct event', () => {
    const errors = validateEvent(validEvent);
    expect(errors).toHaveLength(0);
  });

  it('requires a title', () => {
    const event = { ...validEvent, title: '' };
    const errors = validateEvent(event);
    expect(errors).toContain('Title is required');
  });

  it('requires a future date', () => {
    const event = { ...validEvent, date: new Date(Date.now() - 86400000) };
    const errors = validateEvent(event);
    expect(errors).toContain('Event date must be in the future');
  });

  it('validates capacity', () => {
    const event = { ...validEvent, capacity: 0 };
    const errors = validateEvent(event);
    expect(errors).toContain('Capacity must be greater than 0');
  });
});