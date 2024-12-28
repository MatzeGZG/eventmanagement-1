import { useState, useCallback } from 'react';
import { ViewMode, ViewState } from '../types';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { Announcer } from '../../../utils/accessibility/announcer';

export const useViewState = (): ViewState => {
  const [currentView, setCurrentView] = useState<ViewMode>('map');
  const [transitioning, setTransitioning] = useState(false);
  const [previousView, setPreviousView] = useState<ViewMode>();

  const handleViewChange = useCallback((view: ViewMode) => {
    if (view === currentView) return;
    
    setTransitioning(true);
    setPreviousView(currentView);
    setCurrentView(view);
    
    // Announce view change for screen readers
    Announcer.announce(`Switching to ${view} view`);
  }, [currentView]);

  const handleTransitionEnd = useCallback(() => {
    setTransitioning(false);
  }, []);

  // Setup keyboard shortcuts
  useKeyboardNavigation({
    'm': () => handleViewChange('map'),
    'c': () => handleViewChange('calendar'),
    'l': () => handleViewChange('list')
  });

  return {
    currentView,
    transitioning,
    previousView,
    handleViewChange,
    handleTransitionEnd
  };
};