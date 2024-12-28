import { differenceInDays } from 'date-fns';

export const getEventTimingColor = (eventDate: Date): string => {
  const daysUntilEvent = differenceInDays(eventDate, new Date());
  
  if (daysUntilEvent <= 1) return '#EF4444'; // Red - Today/Tomorrow
  if (daysUntilEvent <= 7) return '#F59E0B'; // Orange - Within a week
  return '#10B981'; // Green - More than a week away
};

export const getMarkerSize = (attendees: number, capacity: number): number => {
  const baseSize = 24; // Base marker size in pixels
  const ratio = attendees / capacity;
  
  if (ratio >= 0.8) return baseSize * 1.5; // Very popular
  if (ratio >= 0.5) return baseSize * 1.25; // Moderately popular
  return baseSize; // Default size
};