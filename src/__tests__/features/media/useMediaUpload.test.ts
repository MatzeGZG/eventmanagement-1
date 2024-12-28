```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaUpload } from '../../../features/media/hooks/useMediaUpload';
import { useTestStore } from '../../../utils/testing/hooks/useTestStore';

describe('useMediaUpload', () => {
  const { resetStore } = useTestStore();

  beforeEach(() => {
    resetStore();
  });

  it('handles file upload', async () => {
    const { result } = renderHook(() => useMediaUpload());
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await act(async () => {
      const uploadResult = await result.current.uploadMedia(file);
      expect(uploadResult.success).toBe(true);
    });
  });

  it('validates file types', async () => {
    const { result } = renderHook(() => useMediaUpload());
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    await act(async () => {
      const uploadResult = await result.current.uploadMedia(file);
      expect(uploadResult.success).toBe(false);
      expect(uploadResult.error?.message).toMatch(/unsupported file type/i);
    });
  });

  it('awards points for uploads', async () => {
    const { result } = renderHook(() => useMediaUpload());
    const { getState } = useTestStore();
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    await act(async () => {
      await result.current.uploadMedia(file);
    });

    const state = getState();
    expect(state.points).toBeGreaterThan(0);
  });
});
```