```typescript
type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

export class IntersectionManager {
  private static observers = new Map<string, IntersectionObserver>();

  static observe(
    element: Element,
    callback: IntersectionCallback,
    options: IntersectionObserverInit = {}
  ): () => void {
    const key = JSON.stringify(options);
    let observer = this.observers.get(key);

    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(callback);
      }, options);
      this.observers.set(key, observer);
    }

    observer.observe(element);
    return () => observer?.unobserve(element);
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
  }
}
```