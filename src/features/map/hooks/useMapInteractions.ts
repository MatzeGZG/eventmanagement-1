import { useState, useCallback } from 'react';
import type { ViewState } from 'react-map-gl';
import { Event } from '../../../types/event';
import { useLocation } from '../../../hooks/useLocation';

export const useMapInteractions = () => {
  const { coordinates } = useLocation();
  
  const [viewState, setViewState] = useState<ViewState>({
    latitude: coordinates?.latitude || 51.5074, // London as fallback
    longitude: coordinates?.longitude || -0.1278,
    zoom: 11,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const [selectedItem, setSelectedItem] = useState<Event | null>(null);

  const handleViewStateChange = useCallback((newViewState: ViewState) => {
    setViewState(newViewState);
  }, []);

  const handleMarkerClick = useCallback((item: Event) => {
    setSelectedItem(item);
  }, []);

  const handlePopupClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return {
    viewState,
    selectedItem,
    handleViewStateChange,
    handleMarkerClick,
    handlePopupClose
  };
};