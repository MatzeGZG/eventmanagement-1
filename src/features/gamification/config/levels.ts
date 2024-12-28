import { UserLevel } from '../../../types';

export interface LevelConfig {
  level: UserLevel;
  minXP: number;
  maxXP: number;
  benefits: string[];
}

export const LEVEL_REQUIREMENTS: LevelConfig[] = [
  {
    level: UserLevel.NewExplorer,
    minXP: 0,
    maxXP: 99,
    benefits: [
      'Access to all core platform features',
      'Basic event recommendations',
      'Calendar integration',
      'Standard point earning rate'
    ]
  },
  {
    level: UserLevel.LocalConnector,
    minXP: 100,
    maxXP: 299,
    benefits: [
      'Ad-free experience',
      'Priority event recommendations',
      'Exclusive premium events access',
      '1.25x point earning rate'
    ]
  },
  {
    level: UserLevel.SocialEnthusiast,
    minXP: 300,
    maxXP: 699,
    benefits: [
      'Double points earning rate',
      'VIP event access',
      'Exclusive challenges',
      'Private events and experiences'
    ]
  },
  {
    level: UserLevel.CommunityLeader,
    minXP: 700,
    maxXP: 1499,
    benefits: [
      'Triple points earning rate',
      'Early access to high-demand events',
      'Custom profile badges',
      'Dedicated support'
    ]
  },
  {
    level: UserLevel.PassionPioneer,
    minXP: 1500,
    maxXP: Infinity,
    benefits: [
      'Maximum points multiplier (4x)',
      'VIP concierge service',
      'Exclusive event creation rights',
      'Premium analytics access'
    ]
  }
];