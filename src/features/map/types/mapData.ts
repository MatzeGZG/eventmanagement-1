import { Event } from '../../../types/event';
import { LngLatBounds } from 'mapbox-gl';

export interface MapData {
  visibleEvents: Event[];
  loading: boolean;
  updateVisibleEvents: (bounds: LngLatBounds) => void;
}