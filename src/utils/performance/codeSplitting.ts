```typescript
import { lazy } from 'react';

// Lazy load components with loading states
export const lazyLoad = (
  factory: () => Promise<{ default: React.ComponentType<any> }>,
  fallback: React.ReactNode
) => {
  const LazyComponent = lazy(factory);
  return (props: any) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Preload critical components
export const preloadComponents = () => {
  const criticalComponents = [
    () => import('../features/map/components/MapContainer'),
    () => import('../features/calendar/components/CalendarContainer')
  ];

  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      criticalComponents.forEach(component => {
        component();
      });
    });
  }
};
```