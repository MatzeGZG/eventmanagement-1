import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { useToast } from '../../hooks/useToast';
import { AuditLogger } from '../../utils/security/auditLogger';

export const GlobalErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const handleError = (error: Error) => {
    AuditLogger.log('error_boundary_catch', { error: error.message }, 'critical');
    showToast('An unexpected error occurred', 'error');
  };

  return (
    <ErrorBoundary 
      onError={handleError}
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-fjs-charcoal rounded-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-bold text-fjs-gold mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-fjs-silver mb-4">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-gold text-black px-6 py-2 rounded-lg font-medium hover:shadow-gold transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};