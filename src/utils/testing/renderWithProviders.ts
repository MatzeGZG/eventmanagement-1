import { render, RenderOptions } from '@testing-library/react';
import { TestWrapper } from './TestWrapper';

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });