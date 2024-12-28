import { UserLevel } from '../types/user';

interface LevelRequirement {
  level: UserLevel;
  minXP: number;
  maxXP: number;
}

const LEVEL_REQUIREMENTS: LevelRequirement[] = [
  { level: UserLevel.NewExplorer, minXP: 0, maxXP: 99 },
  { level: UserLevel.LocalConnector, minXP: 100, maxXP: 299 },
  { level: UserLevel.SocialEnthusiast, minXP: 300, maxXP: 699 },
  { level: UserLevel.CommunityLeader, minXP: 700, maxXP: 1499 },
  { level: UserLevel.PassionPioneer, minXP: 1500, maxXP: Infinity },
];

export const calculateLevel = (xp: number): LevelRequirement => {
  return LEVEL_REQUIREMENTS.find(
    (req) => xp >= req.minXP && xp <= req.maxXP
  ) || LEVEL_REQUIREMENTS[0];
};

export const calculateNextLevelXP = (currentXP: number): number => {
  const currentLevel = calculateLevel(currentXP);
  const nextLevel = LEVEL_REQUIREMENTS[
    LEVEL_REQUIREMENTS.indexOf(currentLevel) + 1
  ];
  return nextLevel ? nextLevel.minXP : currentLevel.maxXP;
};