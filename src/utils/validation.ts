import { Event } from '../types/event';

export const validateEvent = (event: Event): string[] => {
  const errors: string[] = [];

  if (!event.title?.trim()) {
    errors.push('Title is required');
  }

  if (!event.description?.trim()) {
    errors.push('Description is required');
  }

  if (!event.date || event.date < new Date()) {
    errors.push('Event date must be in the future');
  }

  if (!event.location?.address || !event.location?.city || !event.location?.country) {
    errors.push('Complete location information is required');
  }

  if (event.capacity <= 0) {
    errors.push('Capacity must be greater than 0');
  }

  if (event.price < 0) {
    errors.push('Price cannot be negative');
  }

  return errors;
};