import { PerformanceMonitor } from '../performance/performanceMonitor';

export class MobileOptimizer {
  static init() {
    this.optimizeImages();
    this.deferNonCriticalContent();
    this.setupTouchHandling();
  }

  private static optimizeImages() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const isSlowConnection = connection?.effectiveType === '3g' || connection?.saveData;
      
      if (isSlowConnection) {
        document.documentElement.style.setProperty('--image-quality', 'low');
      }
    }
  }

  private static deferNonCriticalContent() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        document.querySelectorAll('[data-defer]').forEach(element => {
          element.removeAttribute('data-defer');
        });
      });
    }
  }

  private static setupTouchHandling() {
    document.addEventListener('touchstart', () => {
      document.documentElement.classList.add('touch-device');
    }, { once: true });
  }

  static monitorPerformance() {
    PerformanceMonitor.start('mobile-interaction');
    // Monitor FPS, touch response time, etc.
  }
}