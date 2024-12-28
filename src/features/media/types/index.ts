export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  author: string;
  likes: number;
  comments: number;
  location: string;
  timestamp: Date;
  dimensions?: {
    width: number;
    height: number;
  };
  fileSize: number;
  mimeType: string;
}

export interface MediaItemProps {
  item: MediaItem;
}

export interface MediaFilters {
  view: MediaViewMode;
  sort: MediaSortOption;
  timeframe: MediaTimeframe;
}

export interface MediaUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface MediaUploadResult {
  success: boolean;
  points?: number;
  mediaUrl?: string;
  error?: {
    code: string;
    message: string;
  };
}

export type MediaViewMode = 'grid' | 'list';
export type MediaSortOption = 'latest' | 'popular' | 'trending';
export type MediaTimeframe = 'all' | 'today' | 'week' | 'month';