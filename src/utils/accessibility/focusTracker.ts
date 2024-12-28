export class FocusTracker {
  private static focusHistory: HTMLElement[] = [];
  private static maxHistoryLength = 10;

  static init() {
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      this.track(target);
    });
  }

  static track(element: HTMLElement) {
    this.focusHistory.push(element);
    if (this.focusHistory.length > this.maxHistoryLength) {
      this.focusHistory.shift();
    }
  }

  static restorePreviousFocus() {
    const previousElement = this.focusHistory.pop();
    if (previousElement && document.body.contains(previousElement)) {
      previousElement.focus();
    } else {
      // Fallback to main content if previous element is not available
      document.querySelector('#main-content')?.focus();
    }
  }

  static clear() {
    this.focusHistory = [];
  }
}