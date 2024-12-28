```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../features/auth/context/AuthContext';
import { renderWithProviders } from '../../../utils/testing/renderWithProviders';
import { supabase } from '../../../lib/supabase';

vi.mock('../../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      }))
    }
  }
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with loading state', () => {
    renderWithProviders(
      <AuthProvider>
        <div data-testid="child" />
      </AuthProvider>
    );
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('handles successful authentication', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    vi.mocked(supabase.auth.getSession).mockResolvedValueOnce({
      data: { session: { user: mockUser } },
      error: null
    });

    renderWithProviders(
      <AuthProvider>
        <div data-testid="child" />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  it('handles authentication errors', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValueOnce(new Error('Auth error'));

    renderWithProviders(
      <AuthProvider>
        <div data-testid="child" />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/authentication error/i)).toBeInTheDocument();
    });
  });
});
```