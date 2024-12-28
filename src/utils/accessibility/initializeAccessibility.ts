import { KeyboardManager } from './keyboardManager';
import { FocusRing } from './focusRing';
import { LiveRegions } from './liveRegions';
import { Announcer } from './announcer';
import { FocusTracker } from './focusTracker';
import { AriaAnnouncer } from './ariaAnnouncer';
import { ScreenReader } from './screenReader';

export const initializeAccessibility = (): void => {
  try {
    // Initialize keyboard navigation
    KeyboardManager.init();
    
    // Initialize focus management
    FocusRing.init();
    FocusTracker.init();
    
    // Initialize screen reader support
    LiveRegions.init();
    Announcer.init();
    AriaAnnouncer.init();
    ScreenReader.init();
  } catch (error) {
    console.error('Failed to initialize accessibility features:', error);
    // Continue loading the app even if accessibility features fail
  }
};