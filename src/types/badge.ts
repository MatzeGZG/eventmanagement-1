export enum BadgeTier {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold'
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: BadgeTier;
  unlockedAt?: Date;
}