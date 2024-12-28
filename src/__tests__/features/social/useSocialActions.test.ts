```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSocialActions } from '../../../features/social/hooks/useSocialActions';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('useSocialActions', () => {
  const { resetStore, setUser } = useTestStore();

  beforeEach(() => {
    resetStore();
    setUser({
      id: '1',
      points: 0,
      connections: []
    } as any);
  });

  it('handles connect with user', async () => {
    const { result } = renderHook(() => useSocialActions());
    const { getState } = useTestStore();

    await act(async () => {
      await result.current.connectWithUser('2');
    });

    const state = getState();
    expect(state.points).toBeGreaterThan(0);
  });

  it('handles event sharing', async () => {
    const { result } = renderHook(() => useSocialActions());
    const { getState } = useTestStore();

    await act(async () => {
      await result.current.shareEvent('event-1', 'twitter');
    });

    const state = getState();
    expect(state.points).toBeGreaterThan(0);
  });

  it('prevents duplicate connections', async () => {
    const { result } = renderHook(() => useSocialActions());

    await act(async () => {
      await result.current.connectWithUser('2');
      await expect(
        result.current.connectWithUser('2')
      ).rejects.toThrow('Already connected');
    });
  });
});
```