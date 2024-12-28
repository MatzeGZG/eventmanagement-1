```typescript
export class ViewportOptimizer {
  private static readonly VIEWPORT_BUFFER = 50; // pixels
  private static isIntersectionObserverSupported = 'IntersectionObserver' in window;

  static optimizeRendering(element: HTMLElement, callback: () => void): () => void {
    if (!this.isIntersectionObserverSupported) {
      callback();
      return () => {};
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      {
        rootMargin: `${this.VIEWPORT_BUFFER}px`,
        threshold: 0.1
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }

  static deferOffscreenRendering<T>(
    items: T[],
    isItemVisible: (item: T) => boolean
  ): T[] {
    return items.filter(item => isItemVisible(item));
  }
}
```