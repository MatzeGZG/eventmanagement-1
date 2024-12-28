import { LiveRegions } from './liveRegions';

export class AriaAnnouncer {
  static init() {
    // Initialize if needed
  }

  static announcePageLoad(pageName: string): void {
    LiveRegions.announce(pageName + ' page loaded', 'polite');
  }

  static announceModalOpen(modalName: string): void {
    LiveRegions.announce(modalName + ' dialog opened', 'polite');
  }

  static announceModalClose(modalName: string): void {
    LiveRegions.announce(modalName + ' dialog closed', 'polite');
  }

  static announceLoadingState(context: string, isLoading: boolean): void {
    const message = isLoading ? 'Loading ' + context : context + ' loaded';
    LiveRegions.announce(message, 'polite');
  }

  static announceUpdateCount(count: number, itemType: string): void {
    if (count === 0) return;
    
    const message = count === 1
      ? '1 new ' + itemType
      : count + ' new ' + itemType + 's';
      
    LiveRegions.announce(message, 'polite');
  }

  static announceActionResult(action: string, success: boolean, error?: string): void {
    const message = success 
      ? action + ' successful'
      : action + ' failed. ' + (error || 'Please try again.');
      
    LiveRegions.announce(message, success ? 'polite' : 'assertive');
  }
}