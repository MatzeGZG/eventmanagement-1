import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '../errorHandling/ErrorBoundary';

interface TestWrapperProps {
  children: React.ReactNode;
}

export const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => (
  <HelmetProvider>
    <BrowserRouter>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </BrowserRouter>
  </HelmetProvider>
);