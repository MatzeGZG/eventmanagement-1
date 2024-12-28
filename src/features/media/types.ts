export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  author: string;
  authorAvatar?: string;
  description?: string;
  likes: number;
  comments: number;
  timestamp: Date;
  eventId: string;
}

export interface MediaFilters {
  view: 'grid' | 'list';
  sort: 'latest' | 'popular' | 'trending';
  timeframe: 'all' | 'today' | 'week' | 'month';
}