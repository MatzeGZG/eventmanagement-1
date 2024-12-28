export const STORE_CONFIG = {
  name: 'funjet-setter-storage',
  version: 1,
  partialize: (state: any) => ({
    user: state.user ? {
      id: state.user.id,
      name: state.user.name,
      level: state.user.level,
      points: state.user.points,
      xp: state.user.xp
    } : null,
    gamification: {
      level: state.level,
      xp: state.xp,
      points: state.points,
      currentStreak: state.currentStreak,
      longestStreak: state.longestStreak,
      lastActivityAt: state.lastActivityAt
    }
  })
};