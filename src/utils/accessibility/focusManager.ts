```typescript
export class FocusManager {
  private static trapStack: HTMLElement[] = [];

  static init() {
    this.setupGlobalHandlers();
  }

  private static setupGlobalHandlers() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.handleTabNavigation(e);
      }
      if (e.key === 'Escape') {
        this.handleEscape();
      }
    });
  }

  static trapFocus(element: HTMLElement) {
    this.trapStack.push(element);
    this.updateFocusTrap();
  }

  static releaseFocus(element: HTMLElement) {
    this.trapStack = this.trapStack.filter(el => el !== element);
    this.updateFocusTrap();
  }

  private static updateFocusTrap() {
    const currentTrap = this.trapStack[this.trapStack.length - 1];
    if (!currentTrap) return;

    const focusableElements = currentTrap.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstFocusable?.focus();

    currentTrap.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    });
  }

  private static handleTabNavigation(e: KeyboardEvent) {
    document.body.classList.add('keyboard-user');
  }

  private static handleEscape() {
    if (this.trapStack.length > 0) {
      this.releaseFocus(this.trapStack[this.trapStack.length - 1]);
    }
  }
}
```