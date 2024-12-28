export enum OrganizerSpendingType {
  EventListing = 'EVENT_LISTING',
  EventBoost = 'EVENT_BOOST',
  PremiumAnalytics = 'PREMIUM_ANALYTICS',
  CustomBadges = 'CUSTOM_BADGES',
  SponsorshipVisibility = 'SPONSORSHIP_VISIBILITY',
  MarketplacePromotion = 'MARKETPLACE_PROMOTION',
  TeamCollaboration = 'TEAM_COLLABORATION'
}

export interface SpendingOption {
  type: OrganizerSpendingType;
  cost: number;
  description: string;
  duration?: number; // in days
  icon: string;
}

export const SPENDING_OPTIONS: SpendingOption[] = [
  {
    type: OrganizerSpendingType.EventListing,
    cost: 100,
    description: 'Create and publish an event on the platform',
    icon: '🎪'
  },
  {
    type: OrganizerSpendingType.EventBoost,
    cost: 200,
    description: 'Boost event visibility in searches and recommendations',
    duration: 7,
    icon: '🚀'
  },
  {
    type: OrganizerSpendingType.PremiumAnalytics,
    cost: 300,
    description: 'Access detailed attendee insights and engagement trends',
    duration: 30,
    icon: '📊'
  },
  {
    type: OrganizerSpendingType.CustomBadges,
    cost: 250,
    description: 'Create unique badges for event participants',
    icon: '🏅'
  },
  {
    type: OrganizerSpendingType.SponsorshipVisibility,
    cost: 500,
    description: 'Premium visibility in the sponsorship marketplace',
    duration: 14,
    icon: '💎'
  },
  {
    type: OrganizerSpendingType.MarketplacePromotion,
    cost: 150,
    description: 'Highlight event merchandise and services',
    duration: 7,
    icon: '🛍️'
  },
  {
    type: OrganizerSpendingType.TeamCollaboration,
    cost: 200,
    description: 'Advanced tools for team management',
    duration: 30,
    icon: '👥'
  }
];