import { BREAKPOINTS } from './breakpoints';

export class AdaptiveLayout {
  private static mediaQueries: Record<string, MediaQueryList> = {};
  private static listeners: Record<string, (e: MediaQueryListEvent) => void> = {};

  static init() {
    if (typeof window === 'undefined') return;

    // Initialize media queries with proper breakpoint ranges
    this.mediaQueries = {
      mobile: window.matchMedia(`(max-width: ${BREAKPOINTS.sm - 1}px)`),
      tablet: window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.lg - 1}px)`),
      desktop: window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`)
    };

    // Setup listeners
    Object.entries(this.mediaQueries).forEach(([key, query]) => {
      const listener = (e: MediaQueryListEvent) => {
        this.handleBreakpointChange(key, e.matches);
      };
      
      this.listeners[key] = listener;
      query.addEventListener('change', listener);
    });

    // Initial setup
    this.setupInitialLayout();
  }

  private static setupInitialLayout() {
    Object.entries(this.mediaQueries).forEach(([key, query]) => {
      if (query.matches) {
        this.handleBreakpointChange(key, true);
      }
    });
  }

  private static handleBreakpointChange(breakpoint: string, matches: boolean) {
    if (matches) {
      document.documentElement.setAttribute('data-layout', breakpoint);
      this.applyLayoutOptimizations(breakpoint);
    }
  }

  private static applyLayoutOptimizations(breakpoint: string) {
    switch (breakpoint) {
      case 'mobile':
        document.documentElement.classList.add('touch-optimized');
        document.documentElement.classList.remove('hybrid-layout', 'desktop-layout');
        break;
      case 'tablet':
        document.documentElement.classList.add('hybrid-layout');
        document.documentElement.classList.remove('touch-optimized', 'desktop-layout');
        break;
      case 'desktop':
        document.documentElement.classList.add('desktop-layout');
        document.documentElement.classList.remove('touch-optimized', 'hybrid-layout');
        break;
    }
  }

  static cleanup() {
    Object.entries(this.mediaQueries).forEach(([key, query]) => {
      const listener = this.listeners[key];
      if (listener) {
        query.removeEventListener('change', listener);
      }
    });

    this.mediaQueries = {};
    this.listeners = {};
  }
}