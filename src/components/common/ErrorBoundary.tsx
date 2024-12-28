import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { PerformanceMonitor } from '../../utils/performance/performanceMonitor';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    PerformanceMonitor.record('error-boundary-catch', Date.now());
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-fjs-charcoal rounded-xl p-8 max-w-md text-center">
            <AlertTriangle className="w-16 h-16 text-fjs-gold mx-auto mb-4" />
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
      );
    }

    return this.props.children;
  }
}