import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ErrorBoundary } from '../../../../components/common/ErrorBoundary';
import { useToast } from '../../../../hooks/useToast';

export const AuthErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  return (
    <ErrorBoundary
      onError={(error) => {
        showToast('An error occurred during authentication', 'error');
        console.error('Auth error:', error);
      }}
      fallback={
        <div className="text-center p-4">
          <AlertTriangle className="w-12 h-12 text-fjs-gold mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            Authentication Error
          </h3>
          <p className="text-fjs-silver mb-4">
            Please try again or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};