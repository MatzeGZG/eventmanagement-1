export enum MembershipTier {
  Basic = 'Basic',
  Premium = 'Premium',
  Elite = 'Elite'
}

export interface MembershipBenefit {
  id: string;
  name: string;
  description: string;
  tier: MembershipTier;
}

export interface MembershipRequirement {
  tier: MembershipTier;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}