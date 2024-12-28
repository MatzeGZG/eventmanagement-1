import { Event } from '../types/event';

export const POINTS_CONFIG = {
  RSVP: 10,
  ATTENDANCE: 50,
  REVIEW: 20,
  DETAILED_REVIEW: 30,
  PROFILE_COMPLETION: 50,
  REFERRAL: 50,
  GROUP_CHAT: 5,
  CREATE_GROUP: 30,
  SOCIAL_SHARE: 15,
} as const;

export const calculateEventPoints = (event: Event): number => {
  let points = POINTS_CONFIG.ATTENDANCE;
  
  // Bonus points for early bird RSVPs (>7 days before event)
  const daysTillEvent = Math.floor(
    (event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysTillEvent > 7) {
    points += 10;
  }

  return points;
};