```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProfileSetup } from '../../../features/profile/hooks/useProfileSetup';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('useProfileSetup', () => {
  const { resetStore } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('handles profile updates', async () => {
    const { result } = renderHook(() => useProfileSetup());
    const profileData = {
      firstName: 'Test',
      interests: ['Tech', 'Music'],
      location: 'London'
    };

    await act(async () => {
      await result.current.updateProfile(profileData);
    });

    const state = useTestStore.getState();
    expect(state.user?.firstName).toBe('Test');
  });

  it('validates profile data', async () => {
    const { result } = renderHook(() => useProfileSetup());
    const invalidData = { firstName: '' };

    await act(async () => {
      await expect(
        result.current.updateProfile(invalidData)
      ).rejects.toThrow(/first name is required/i);
    });
  });

  it('completes setup process', async () => {
    const { result } = renderHook(() => useProfileSetup());

    await act(async () => {
      await result.current.completeSetup();
    });

    const state = useTestStore.getState();
    expect(state.user?.setupComplete).toBe(true);
  });
});
```