```typescript
export class OptimizationManager {
  static init() {
    this.setupLazyLoading();
    this.setupServiceWorker();
    this.optimizeMobileExperience();
  }

  private static setupLazyLoading() {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              imageObserver.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    document.querySelectorAll('img[data-src]').forEach(img => 
      imageObserver.observe(img)
    );
  }

  private static setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }

  private static optimizeMobileExperience() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData) {
        document.body.classList.add('save-data');
      }
    }
  }
}
```