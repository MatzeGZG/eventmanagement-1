```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FriendFinder } from '../../../features/social/components/FriendFinder';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('FriendFinder', () => {
  const { resetStore, setUser } = useTestStore();

  beforeEach(() => {
    resetStore();
    setUser({
      id: '1',
      interests: ['Tech', 'Music'],
      connections: []
    } as any);
  });

  it('displays friend suggestions', () => {
    renderWithProviders(<FriendFinder />);
    expect(screen.getByText(/people you may know/i)).toBeInTheDocument();
  });

  it('handles connect button click', async () => {
    renderWithProviders(<FriendFinder />);
    const connectButton = screen.getByRole('button', { name: /connect/i });
    
    await userEvent.click(connectButton);
    expect(screen.getByText(/connection request sent/i)).toBeInTheDocument();
  });

  it('shows mutual connections', () => {
    renderWithProviders(<FriendFinder />);
    expect(screen.getByText(/mutual connections/i)).toBeInTheDocument();
  });

  it('awards points for social engagement', async () => {
    const { getState } = useTestStore();
    renderWithProviders(<FriendFinder />);
    
    await userEvent.click(screen.getByRole('button', { name: /connect/i }));
    
    const state = getState();
    expect(state.points).toBeGreaterThan(0);
  });
});
```