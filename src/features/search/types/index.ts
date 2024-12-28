import { Event, EventCategory } from '../../../types/event';

export interface SearchResult {
  event: Event;
  score: number;
}

export interface ProcessedQuery {
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
  interests?: string[];
}

export interface SearchFilters {
  categories: EventCategory[];
  accessibility: {
    wheelchairAccessible: boolean;
    familyFriendly: boolean;
    petFriendly: boolean;
    signLanguage: boolean;
    audioDescription: boolean;
  };
  location?: {
    city: string;
    radius: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}