```typescript
export const ResourceHints = {
  init() {
    // Preconnect to critical domains
    this.preconnect('https://api.mapbox.com');
    this.preconnect('https://events.mapbox.com');
    this.preconnect(import.meta.env.VITE_SUPABASE_URL);
    
    // Prefetch critical assets
    this.prefetch('/manifest.json');
    this.prefetch('/offline.html');
  },

  preconnect(url: string, crossorigin = true) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    if (crossorigin) link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  },

  prefetch(url: string) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
};
```