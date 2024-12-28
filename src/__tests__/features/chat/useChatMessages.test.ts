```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChatMessages } from '../../../features/chat/hooks/useChatMessages';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('useChatMessages', () => {
  const { resetStore } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('sends messages', async () => {
    const { result } = renderHook(() => useChatMessages('room-1'));

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toContainEqual(
      expect.objectContaining({
        content: 'Hello',
        roomId: 'room-1'
      })
    );
  });

  it('handles message moderation', async () => {
    const { result } = renderHook(() => useChatMessages('room-1'));

    await act(async () => {
      await expect(
        result.current.sendMessage('inappropriate content')
      ).rejects.toThrow();
    });
  });

  it('awards points for participation', async () => {
    const { result } = renderHook(() => useChatMessages('room-1'));
    const { getState } = useTestStore();

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    const state = getState();
    expect(state.points).toBeGreaterThan(0);
  });
});
```