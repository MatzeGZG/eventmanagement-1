export interface PointActivity {
  id: string;
  type: PointActivityType;
  points: number;
  description: string;
  timestamp: Date;
}

export enum PointActivityType {
  ProfileCompletion = 'PROFILE_COMPLETION',
  EventRSVP = 'EVENT_RSVP',
  EventAttendance = 'EVENT_ATTENDANCE',
  EventReview = 'EVENT_REVIEW',
  DetailedReview = 'DETAILED_REVIEW',
  PlatformOnboarding = 'PLATFORM_ONBOARDING',
  Referral = 'REFERRAL',
  ReferralBonus = 'REFERRAL_BONUS',
  GroupChat = 'GROUP_CHAT',
  CreateGroup = 'CREATE_GROUP',
  SocialShare = 'SOCIAL_SHARE',
  ChallengeCompletion = 'CHALLENGE_COMPLETION',
  LeaderboardReward = 'LEADERBOARD_REWARD',
  StreakBonus = 'STREAK_BONUS',
  FeedbackSubmission = 'FEEDBACK_SUBMISSION',
  BugReport = 'BUG_REPORT',
  PlatformSuggestion = 'PLATFORM_SUGGESTION'
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  reward: number;
  progress: number;
  total: number;
  startDate: Date;
  endDate: Date;
  completed: boolean;
  claimed: boolean;
}

export enum ChallengeType {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Seasonal = 'SEASONAL'
}

export interface PointSpending {
  id: string;
  type: SpendingType;
  points: number;
  description: string;
  timestamp: Date;
}

export enum SpendingType {
  EventBoost = 'EVENT_BOOST',
  ExclusiveAccess = 'EXCLUSIVE_ACCESS',
  ProfileCustomization = 'PROFILE_CUSTOMIZATION',
  MysteryBox = 'MYSTERY_BOX',
  MarketplaceDiscount = 'MARKETPLACE_DISCOUNT',
  ChallengeUnlock = 'CHALLENGE_UNLOCK',
  XPBoost = 'XP_BOOST'
}