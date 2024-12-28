```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { LevelProgress } from '../../../features/gamification/components/LevelProgressCard';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('LevelProgress', () => {
  const { resetStore } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('displays current level', () => {
    const { setUser } = useTestStore();
    setUser({
      level: 'New Explorer',
      xp: 50,
      points: 100
    } as any);

    renderWithProviders(<LevelProgress />);
    expect(screen.getByText('New Explorer')).toBeInTheDocument();
  });

  it('shows progress to next level', () => {
    const { setUser } = useTestStore();
    setUser({
      level: 'New Explorer',
      xp: 50,
      points: 100
    } as any);

    renderWithProviders(<LevelProgress />);
    expect(screen.getByText(/50 \/ 100 XP/)).toBeInTheDocument();
  });

  it('displays current benefits', () => {
    const { setUser } = useTestStore();
    setUser({
      level: 'New Explorer',
      xp: 0,
      points: 0
    } as any);

    renderWithProviders(<LevelProgress />);
    expect(screen.getByText('Current Benefits:')).toBeInTheDocument();
    expect(screen.getByText('Access to all core platform features')).toBeInTheDocument();
  });
});
```