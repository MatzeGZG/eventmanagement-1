```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSecureAuth } from '../../../features/auth/hooks/useSecureAuth';
import { supabase } from '../../../lib/supabase';

vi.mock('../../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn()
    }
  }
}));

describe('useSecureAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles registration', async () => {
    vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
      data: { user: { id: '1' } },
      error: null
    });

    const { result } = renderHook(() => useSecureAuth());
    
    await act(async () => {
      await result.current.register({
        email: 'test@example.com',
        password: 'ValidPassword123!',
        firstName: 'Test'
      });
    });

    expect(supabase.auth.signUp).toHaveBeenCalled();
  });

  it('handles login', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
      data: { user: { id: '1' } },
      error: null
    });

    const { result } = renderHook(() => useSecureAuth());
    
    await act(async () => {
      await result.current.login('test@example.com', 'ValidPassword123!');
    });

    expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
  });

  it('handles authentication errors', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockRejectedValueOnce(
      new Error('Invalid credentials')
    );

    const { result } = renderHook(() => useSecureAuth());
    
    await act(async () => {
      await expect(
        result.current.login('test@example.com', 'wrong-password')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```