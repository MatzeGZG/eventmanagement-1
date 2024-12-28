import { User } from '../../../types/user';

export enum MembershipTier {
  Basic = 'Basic',
  Premium = 'Premium',
  Elite = 'Elite'
}

export interface MembershipRequirement {
  tier: MembershipTier;
  minPoints: number;
  maxPoints: number;
  pointMultiplier: number;
  benefits: string[];
}

export const MEMBERSHIP_REQUIREMENTS: MembershipRequirement[] = [
  {
    tier: MembershipTier.Basic,
    minPoints: 0,
    maxPoints: 2499,
    pointMultiplier: 1,
    benefits: [
      'Access to all core platform features',
      'Basic event recommendations',
      'Calendar integration',
      'Standard point earning rate'
    ]
  },
  {
    tier: MembershipTier.Premium,
    minPoints: 2500,
    maxPoints: 7499,
    pointMultiplier: 1.25,
    benefits: [
      'Ad-free experience',
      'Priority event recommendations',
      'Exclusive premium events access',
      '1.25x point earning rate',
      'Early access to popular events'
    ]
  },
  {
    tier: MembershipTier.Elite,
    minPoints: 7500,
    maxPoints: Infinity,
    pointMultiplier: 2,
    benefits: [
      'Double points earning rate',
      'VIP event access',
      'Exclusive challenges',
      'Private events and experiences',
      'Dedicated support',
      'Custom profile badges'
    ]
  }
];