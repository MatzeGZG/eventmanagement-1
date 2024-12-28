```typescript
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ProfileContainer } from '../../../features/profile/components/ProfileContainer';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('ProfileContainer', () => {
  const { resetStore, setUser } = useTestStore();

  beforeEach(() => {
    resetStore();
    setUser({
      id: '1',
      name: 'Test User',
      level: 'New Explorer',
      xp: 100,
      points: 500,
      badges: [],
      interests: ['Tech', 'Music'],
      connections: []
    } as any);
  });

  it('displays user profile information', () => {
    renderWithProviders(<ProfileContainer />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('New Explorer')).toBeInTheDocument();
  });

  it('shows gamification stats', () => {
    renderWithProviders(<ProfileContainer />);
    expect(screen.getByText('500 points')).toBeInTheDocument();
    expect(screen.getByText('100 XP')).toBeInTheDocument();
  });

  it('displays user interests', () => {
    renderWithProviders(<ProfileContainer />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });
});
```