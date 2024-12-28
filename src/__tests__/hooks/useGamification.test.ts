```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGamification } from '../../features/gamification/hooks/useGamification';
import { useTestStore } from '../../utils/testing/hooks/useTestStore';

describe('useGamification', () => {
  const { resetStore } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('calculates level progress correctly', () => {
    const { setUser } = useTestStore();
    setUser({
      level: 'New Explorer',
      xp: 50,
      points: 100
    } as any);

    const { result } = renderHook(() => useGamification());
    const { progress } = result.current;

    expect(progress.percentage).toBe(50);
    expect(progress.current).toBe(50);
    expect(progress.next).toBe(100);
  });

  it('applies point multiplier based on level', () => {
    const { setUser } = useTestStore();
    setUser({
      level: 'PassionPioneer',
      xp: 1500,
      points: 1000
    } as any);

    const { result } = renderHook(() => useGamification());
    expect(result.current.pointMultiplier).toBe(4);
  });

  it('tracks streaks correctly', () => {
    const { setUser } = useTestStore();
    setUser({
      currentStreak: 5,
      longestStreak: 10
    } as any);

    const { result } = renderHook(() => useGamification());
    expect(result.current.currentStreak).toBe(5);
    expect(result.current.longestStreak).toBe(10);
  });
});
```