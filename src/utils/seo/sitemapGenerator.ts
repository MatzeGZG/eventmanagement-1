```typescript
import { Event } from '../../types/event';

export class SitemapGenerator {
  private static readonly SITE_URL = window.location.origin;

  static generateSitemap(events: Event[]): string {
    const urls = [
      // Static routes
      this.SITE_URL,
      `${this.SITE_URL}/map`,
      `${this.SITE_URL}/calendar`,
      `${this.SITE_URL}/feed`,
      
      // Dynamic event routes
      ...events.map(event => `${this.SITE_URL}/events/${event.id}`)
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls.map(url => `
          <url>
            <loc>${url}</loc>
            <changefreq>daily</changefreq>
            <priority>0.8</priority>
          </url>
        `).join('')}
      </urlset>`;
  }
}
```