export interface MapLayers {
  clusters: boolean;
  heatmap: boolean;
  terrain: boolean;
}

export interface MapViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export type MapStyle = 'dark' | 'light' | 'satellite' | 'streets';

export interface MapFilters {
  searchTerm: string;
  categories: string[];
  maxDistance: number;
}