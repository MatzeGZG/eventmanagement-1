```typescript
export class MobileOptimizer {
  static init() {
    this.setupPullToRefresh();
    this.optimizeTouchTargets();
    this.setupOfflineSupport();
  }

  private static setupPullToRefresh() {
    let startY = 0;
    let isPulling = false;

    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].pageY;
      isPulling = window.scrollY === 0;
    });

    document.addEventListener('touchmove', (e) => {
      if (!isPulling) return;
      
      const pullDistance = e.touches[0].pageY - startY;
      if (pullDistance > 60) {
        // Trigger refresh
        window.location.reload();
      }
    });
  }

  private static optimizeTouchTargets() {
    const smallTargets = document.querySelectorAll('.touch-target');
    smallTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        target.classList.add('min-touch-target');
      }
    });
  }

  private static setupOfflineSupport() {
    window.addEventListener('online', () => {
      document.body.classList.remove('offline');
    });

    window.addEventListener('offline', () => {
      document.body.classList.add('offline');
    });
  }
}
```