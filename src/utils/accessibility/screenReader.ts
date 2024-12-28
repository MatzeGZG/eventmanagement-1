import { LiveRegions } from './liveRegions';

export class ScreenReader {
  static init() {
    // Initialize if needed
  }

  static announceNavigation(route: string) {
    const routeNames = {
      '/': 'Home',
      '/feed': 'Feed', 
      '/calendar': 'Calendar',
      '/map': 'Map'
    };

    const pageName = routeNames[route as keyof typeof routeNames] || 'Page';
    LiveRegions.announce(`Navigated to ${pageName}`, 'polite');
  }

  static announceLoadingState(isLoading: boolean, context?: string) {
    const message = isLoading 
      ? `Loading ${context || 'content'}...`
      : `${context || 'Content'} loaded`;
    LiveRegions.announce(message, 'polite');
  }

  static announceError(message: string) {
    LiveRegions.announce(`Error: ${message}`, 'assertive');
  }

  static announceSuccess(message: string) {
    LiveRegions.announce(`Success: ${message}`, 'polite');
  }
}