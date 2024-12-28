export enum UserLevel {
  NewExplorer = 'New Explorer',
  LocalConnector = 'Local Connector',
  SocialEnthusiast = 'Social Enthusiast',
  CommunityLeader = 'Community Leader',
  PassionPioneer = 'Passion Pioneer'
}

export enum PointActivityType {
  PROFILE_COMPLETION = 'PROFILE_COMPLETION',
  EVENT_RSVP = 'EVENT_RSVP',
  EVENT_ATTENDANCE = 'EVENT_ATTENDANCE',
  EVENT_REVIEW = 'EVENT_REVIEW',
  DETAILED_REVIEW = 'DETAILED_REVIEW',
  PLATFORM_ONBOARDING = 'PLATFORM_ONBOARDING',
  REFERRAL = 'REFERRAL',
  REFERRAL_BONUS = 'REFERRAL_BONUS',
  GROUP_CHAT = 'GROUP_CHAT',
  CREATE_GROUP = 'CREATE_GROUP',
  SOCIAL_SHARE = 'SOCIAL_SHARE',
  CHALLENGE_COMPLETION = 'CHALLENGE_COMPLETION',
  LEADERBOARD_REWARD = 'LEADERBOARD_REWARD'
}

export interface GamificationState {
  points: number;
  level: UserLevel;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt: Date | null;
}