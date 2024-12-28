import { useState, useCallback } from 'react';

export const useTerrainControls = () => {
  const [terrainEnabled, setTerrainEnabled] = useState(true);
  const [exaggeration, setExaggeration] = useState(1.5);

  const toggleTerrain = useCallback(() => {
    setTerrainEnabled(prev => !prev);
  }, []);

  const updateExaggeration = useCallback((value: number) => {
    setExaggeration(value);
  }, []);

  return {
    terrainEnabled,
    exaggeration,
    toggleTerrain,
    updateExaggeration
  };
};