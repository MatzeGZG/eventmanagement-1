export class A11yManager {
  static init() {
    this.enhanceKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
    this.setupFocusManagement();
  }

  static enhanceKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-user');
    });
  }

  static setupScreenReaderAnnouncements() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  static setupFocusManagement() {
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-focus-visible-added')) {
        target.classList.add('focus-visible');
      }
    });
  }

  static announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcer = document.querySelector(`[aria-live="${priority}"]`);
    if (announcer) {
      announcer.textContent = message;
    }
  }
}