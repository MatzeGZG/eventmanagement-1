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
  LeaderboardReward = 'LEADERBOARD_REWARD'
}

export const POINT_VALUES: Record<PointActivityType, number> = {
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
  [PointActivityType.LeaderboardReward]: 500
};