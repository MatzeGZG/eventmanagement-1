export class LiveRegions {
  private static container: HTMLElement | null = null;

  static init() {
    this.container = document.createElement('div');
    this.container.setAttribute('aria-live', 'polite');
    this.container.setAttribute('aria-atomic', 'true');
    this.container.className = 'sr-only';
    document.body.appendChild(this.container);
  }

  static announce(message: string, priority: 'polite' | 'assertive' = 'polite') {
    if (!this.container) return;

    // Update ARIA-live region
    this.container.setAttribute('aria-live', priority);
    this.container.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      if (this.container) {
        this.container.textContent = '';
      }
    }, 3000);
  }

  static cleanup() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }
  }
}