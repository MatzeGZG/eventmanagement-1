import { useState, useCallback } from 'react';

export const useMapProjection = () => {
  const [projection, setProjection] = useState<'globe' | 'mercator'>('globe');

  const toggleProjection = useCallback(() => {
    setProjection(prev => prev === 'globe' ? 'mercator' : 'globe');
  }, []);

  return {
    projection,
    toggleProjection
  };
};