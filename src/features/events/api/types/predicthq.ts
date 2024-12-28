export interface PredictHQLocation {
  around: {
    lat: number;
    lon: number;
    radius: string;
  };
}

export interface PredictHQSearchParams {
  location?: PredictHQLocation;
  'start.gte'?: string;
  'start.lte'?: string;
  category?: string;
  limit?: number;
  offset?: number;
  sort?: string;
  rank?: {
    gte?: number;
    lte?: number;
  };
  active?: boolean;
}

export interface PredictHQEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  location: [number, number];
  category: string;
  labels?: string[];
  rank: number;
  local_rank?: number;
  phq_attendance?: number;
  entities?: {
    name: string;
    type: string;
  }[];
}

export interface PredictHQResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PredictHQEvent[];
}