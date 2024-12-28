import { useState, useCallback } from 'react';
import { ViewState } from 'react-map-gl';

const DEFAULT_VIEWPORT: ViewState = {
  latitude: 40.7128,
  longitude: -74.0060,
  zoom: 11,
  bearing: 0,
  pitch: 0
};

export const useViewport = (initialViewport: Partial<ViewState> = {}) => {
  const [viewport, setViewport] = useState<ViewState>({
    ...DEFAULT_VIEWPORT,
    ...initialViewport
  });

  const updateViewport = useCallback((newViewport: Partial<ViewState>) => {
    setViewport(current => ({
      ...current,
      ...newViewport
    }));
  }, []);

  return { viewport, updateViewport };
};