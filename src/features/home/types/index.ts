```typescript
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  type: 'event' | 'news';
  relevanceScore?: number;
  eventId: string;
}

export interface HomeState {
  mediaItems: MediaItem[];
  loading: boolean;
  error: string | null;
}
```