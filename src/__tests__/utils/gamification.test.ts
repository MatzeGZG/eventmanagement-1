```typescript
import { describe, it, expect } from 'vitest';
import { calculateLevel, calculateNextLevelXP } from '../../utils/gamification';
import { UserLevel } from '../../types/user';

describe('gamification utils', () => {
  describe('calculateLevel', () => {
    it('returns correct level for XP ranges', () => {
      expect(calculateLevel(0).level).toBe(UserLevel.NewExplorer);
      expect(calculateLevel(150).level).toBe(UserLevel.LocalConnector);
      expect(calculateLevel(500).level).toBe(UserLevel.SocialEnthusiast);
      expect(calculateLevel(1000).level).toBe(UserLevel.CommunityLeader);
      expect(calculateLevel(2000).level).toBe(UserLevel.PassionPioneer);
    });

    it('handles edge cases', () => {
      expect(calculateLevel(-1).level).toBe(UserLevel.NewExplorer);
      expect(calculateLevel(99).level).toBe(UserLevel.NewExplorer);
      expect(calculateLevel(100).level).toBe(UserLevel.LocalConnector);
    });
  });

  describe('calculateNextLevelXP', () => {
    it('returns correct XP requirement for next level', () => {
      expect(calculateNextLevelXP(0)).toBe(100);
      expect(calculateNextLevelXP(150)).toBe(300);
      expect(calculateNextLevelXP(500)).toBe(700);
    });

    it('handles max level', () => {
      expect(calculateNextLevelXP(2000)).toBe(2000);
    });
  });
});
```