import { describe, it, expect, beforeEach } from 'vitest';
import { renderWithProviders } from './testSetup';
import { LoginForm } from '../../features/auth/components/LoginForm';
import { fireEvent, screen, waitFor } from '@testing-library/react';

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('LoginForm', () => {
    it('validates email format', async () => {
      renderWithProviders(<LoginForm />);
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
      });
    });

    it('validates password requirements', async () => {
      renderWithProviders(<LoginForm />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      fireEvent.change(passwordInput, { target: { value: 'short' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument();
      });
    });
  });
});