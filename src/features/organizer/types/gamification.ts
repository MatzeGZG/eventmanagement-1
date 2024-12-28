export enum OrganizerLevel {
  Host = 'Host',
  Planner = 'Planner',
  Manager = 'Manager',
  Leader = 'Leader'
}

export interface OrganizerLevelRequirement {
  level: OrganizerLevel;
  minXP: number;
  maxXP: number;
  benefits: string[];
}

export interface OrganizerAction {
  type: OrganizerActionType;
  points: number;
  description: string;
}

export enum OrganizerActionType {
  SuccessfulEvent = 'SUCCESSFUL_EVENT',
  FiveStarReviews = 'FIVE_STAR_REVIEWS',
  AttendeeQuery = 'ATTENDEE_QUERY',
  RecurringEventSeries = 'RECURRING_EVENT_SERIES',
  ReferralOrganizer = 'REFERRAL_ORGANIZER'
}

export const ORGANIZER_LEVELS: OrganizerLevelRequirement[] = [
  {
    level: OrganizerLevel.Host,
    minXP: 0,
    maxXP: 499,
    benefits: ['Access to standard tools']
  },
  {
    level: OrganizerLevel.Planner,
    minXP: 500,
    maxXP: 1499,
    benefits: [
      'Analytics dashboard',
      'Moderate event boosts (100 points)',
      'Custom registration forms'
    ]
  },
  {
    level: OrganizerLevel.Manager,
    minXP: 1500,
    maxXP: 3499,
    benefits: [
      'Priority sponsorship visibility',
      'Access to co-organizer tools',
      'Advanced analytics features'
    ]
  },
  {
    level: OrganizerLevel.Leader,
    minXP: 3500,
    maxXP: Infinity,
    benefits: [
      'Discounts on event creation costs',
      'Free premium listings',
      'VIP support access',
      'Custom event badges'
    ]
  }
];

export const ORGANIZER_ACTIONS: Record<OrganizerActionType, OrganizerAction> = {
  [OrganizerActionType.SuccessfulEvent]: {
    type: OrganizerActionType.SuccessfulEvent,
    points: 100,
    description: 'Event achieves >80% attendance'
  },
  [OrganizerActionType.FiveStarReviews]: {
    type: OrganizerActionType.FiveStarReviews,
    points: 50,
    description: 'Average of five 5-star reviews per event'
  },
  [OrganizerActionType.AttendeeQuery]: {
    type: OrganizerActionType.AttendeeQuery,
    points: 20,
    description: 'Responding to attendee queries within 24 hours'
  },
  [OrganizerActionType.RecurringEventSeries]: {
    type: OrganizerActionType.RecurringEventSeries,
    points: 200,
    description: 'Creating a series with at least three successful events'
  },
  [OrganizerActionType.ReferralOrganizer]: {
    type: OrganizerActionType.ReferralOrganizer,
    points: 100,
    description: 'Referring another organizer who completes an event'
  }
};