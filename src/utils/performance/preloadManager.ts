```typescript
export class PreloadManager {
  private static preloadedResources = new Set<string>();

  static preloadRoute(route: string) {
    if (this.preloadedResources.has(route)) return;

    const routeModules = {
      '/map': () => import('../../features/map'),
      '/calendar': () => import('../../features/calendar'),
      '/feed': () => import('../../features/feed')
    };

    if (route in routeModules) {
      // Preload route module
      routeModules[route as keyof typeof routeModules]();
      this.preloadedResources.add(route);
    }
  }

  static preloadImage(src: string) {
    if (this.preloadedResources.has(src)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
    this.preloadedResources.add(src);
  }

  static preloadFont(url: string, type = 'woff2') {
    if (this.preloadedResources.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = `font/${type}`;
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    this.preloadedResources.add(url);
  }
}
```