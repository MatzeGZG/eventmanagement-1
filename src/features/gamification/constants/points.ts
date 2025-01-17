import { PointActivityType } from '../types';

export const POINT_VALUES: Record<PointActivityType, number> = {
  PROFILE_COMPLETION: 50,
  EVENT_RSVP: 10,
  EVENT_ATTENDANCE: 50,
  EVENT_REVIEW: 20,
  DETAILED_REVIEW: 30,
  PLATFORM_ONBOARDING: 20,
  REFERRAL: 50,
  REFERRAL_BONUS: 100,
  GROUP_CHAT: 5,
  CREATE_GROUP: 30,
  SOCIAL_SHARE: 15,
  CHALLENGE_COMPLETION: 100,
  LEADERBOARD_REWARD: 500
};

export const STREAK_BONUSES = {
  THREE_DAY: 25,
  FIVE_DAY: 50,
  SEVEN_DAY: 100,
  THIRTY_DAY: 500
};