export interface FeedItem {
  id: string;
  type: 'event' | 'status';
  title: string;
  description: string;
  image?: string;
  data: any;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  userLiked: boolean;
}

export interface FeedFilters {
  sort: 'latest' | 'popular' | 'trending';
  timeframe: 'all' | 'today' | 'week' | 'month';
}