import { useState, useCallback } from 'react';
import type { MapStyle } from '../types';

const MAP_STYLE_URLS = {
  dark: 'mapbox://styles/mapbox/dark-v11',
  light: 'mapbox://styles/mapbox/light-v11',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  streets: 'mapbox://styles/mapbox/streets-v12'
} as const;

export const useMapStyle = () => {
  const [currentStyle, setCurrentStyle] = useState<MapStyle>('dark');

  const getStyleUrl = useCallback((style: MapStyle) => {
    return MAP_STYLE_URLS[style];
  }, []);

  return {
    currentStyle,
    setCurrentStyle,
    getStyleUrl
  };
};