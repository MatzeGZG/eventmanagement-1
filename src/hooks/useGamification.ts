import { useStore } from '../store';
import { UserLevel } from '../types/user';

interface LevelInfo {
  level: string;
  benefits: string[];
}

interface GamificationProgress {
  current: number;
  next: number;
  percentage: number;
}

const LEVEL_BENEFITS: Record<UserLevel, string[]> = {
  [UserLevel.NewExplorer]: [
    'Access to basic features',
    'Join public events',
    'Create basic profile'
  ],
  [UserLevel.LocalConnector]: [
    'Create private events',
    'Advanced profile customization',
    'Direct messaging'
  ],
  [UserLevel.SocialEnthusiast]: [
    'Create group chats',
    'Event hosting tools',
    'Priority support'
  ],
  [UserLevel.CommunityLeader]: [
    'Create communities',
    'Advanced analytics',
    'Verified status'
  ],
  [UserLevel.PassionPioneer]: [
    'Custom badges',
    'Beta feature access',
    'Community spotlight'
  ]
};

const LEVEL_ORDER = [
  UserLevel.NewExplorer,
  UserLevel.LocalConnector,
  UserLevel.SocialEnthusiast,
  UserLevel.CommunityLeader,
  UserLevel.PassionPioneer
];

export const useGamification = () => {
  const user = useStore(state => state.user);

  if (!user) {
    return {
      currentLevel: {
        level: UserLevel.NewExplorer,
        benefits: LEVEL_BENEFITS[UserLevel.NewExplorer]
      },
      nextLevel: {
        level: UserLevel.LocalConnector,
        benefits: LEVEL_BENEFITS[UserLevel.LocalConnector]
      },
      progress: {
        current: 0,
        next: 1000,
        percentage: 0
      }
    };
  }

  const currentLevelIndex = LEVEL_ORDER.indexOf(user.level);
  const nextLevelIndex = currentLevelIndex + 1;
  const hasNextLevel = nextLevelIndex < LEVEL_ORDER.length;

  const currentLevel: LevelInfo = {
    level: user.level,
    benefits: LEVEL_BENEFITS[user.level]
  };

  const nextLevel: LevelInfo | null = hasNextLevel ? {
    level: LEVEL_ORDER[nextLevelIndex],
    benefits: LEVEL_BENEFITS[LEVEL_ORDER[nextLevelIndex]]
  } : null;

  const calculateNextLevelXp = (level: UserLevel) => {
    const baseXp = 1000;
    const levelIndex = LEVEL_ORDER.indexOf(level);
    return Math.floor(baseXp * Math.pow(1.2, levelIndex));
  };

  const nextLevelXp = calculateNextLevelXp(user.level);
  const progress: GamificationProgress = {
    current: user.xp,
    next: nextLevelXp,
    percentage: Math.min((user.xp / nextLevelXp) * 100, 100)
  };

  return {
    currentLevel,
    nextLevel,
    progress
  };
}; 