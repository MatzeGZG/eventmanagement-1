// API Response Types
export interface PredictHQEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  start: string;
  end: string;
  location: [number, number];
  entities?: {
    name: string;
    type: string;
  }[];
  labels?: string[];
  rank: number;
  local_rank?: number;
  aviation_rank?: number;
  phq_attendance?: number;
}

export interface SearchEventsResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PredictHQEvent[];
}

// API Request Types
export interface SearchEventsParams {
  q?: string;
  category?: string;
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in kilometers
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  limit?: number;
  offset?: number;
}

export interface APIConfig {
  accessToken: string;
  timeout?: number;
}