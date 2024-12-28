import { PointActivityType, SpendingType } from './types';

export const POINT_VALUES = {
  [PointActivityType.ProfileCompletion]: 50,
  [PointActivityType.EventRSVP]: 10,
  [PointActivityType.EventAttendance]: 50,
  [PointActivityType.EventReview]: 20,
  [PointActivityType.DetailedReview]: 30,
  [PointActivityType.PlatformOnboarding]: 20,
  [PointActivityType.Referral]: 50,
  [PointActivityType.ReferralBonus]: 100,
  [PointActivityType.GroupChat]: 5,
  [PointActivityType.CreateGroup]: 30,
  [PointActivityType.SocialShare]: 15,
  [PointActivityType.ChallengeCompletion]: 100,
  [PointActivityType.LeaderboardReward]: 500,
  [PointActivityType.FeedbackSubmission]: 20,
  [PointActivityType.BugReport]: 50,
  [PointActivityType.PlatformSuggestion]: 30
} as const;

export const SPENDING_COSTS = {
  [SpendingType.EventBoost]: {
    min: 50,
    max: 100,
    description: 'Boost event visibility'
  },
  [SpendingType.ExclusiveAccess]: {
    min: 100,
    max: 500,
    description: 'Access exclusive events'
  },
  [SpendingType.ProfileCustomization]: {
    min: 200,
    max: 500,
    description: 'Unlock profile themes and avatars'
  },
  [SpendingType.MysteryBox]: {
    fixed: 150,
    description: 'Get surprise rewards'
  },
  [SpendingType.MarketplaceDiscount]: {
    min: 100,
    max: 1000,
    description: 'Get discounts on marketplace items'
  },
  [SpendingType.ChallengeUnlock]: {
    fixed: 50,
    description: 'Unlock bonus challenges'
  },
  [SpendingType.XPBoost]: {
    fixed: 200,
    description: 'Double XP for 48 hours'
  }
} as const;