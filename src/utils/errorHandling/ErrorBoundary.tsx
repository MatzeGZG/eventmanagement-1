import React, { Component, ErrorInfo } from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { PerformanceMonitor } from '../performance/performanceMonitor';
import { AuditLogger } from '../security/auditLogger';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Record performance impact
    PerformanceMonitor.record('error-boundary-catch', Date.now());
    
    // Log to audit system
    await AuditLogger.log('error_boundary_catch', { 
      error: error.message,
      componentStack: errorInfo.componentStack
    }, 'error');

    // Call error handler if provided
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorDisplay
          title="Something went wrong"
          message="We're sorry for the inconvenience. Please try refreshing the page."
          onRetry={() => {
            this.setState({ hasError: false, error: undefined });
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}