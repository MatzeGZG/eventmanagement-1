```typescript
import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../../../store';
import { useLocation } from '../../../hooks/useLocation';

interface UIPreferences {
  preferredLayout: 'grid' | 'list';
  showFilters: boolean;
  defaultView: 'map' | 'calendar' | 'list';
  colorScheme: 'light' | 'dark';
}

export const useAdaptiveUI = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UIPreferences>({
    preferredLayout: 'grid',
    showFilters: true,
    defaultView: 'map',
    colorScheme: 'dark'
  });

  const user = useStore(state => state.user);
  const { coordinates } = useLocation();

  // Load user preferences
  useEffect(() => {
    if (user?.id) {
      const savedPrefs = localStorage.getItem(`ui-prefs-${user.id}`);
      if (savedPrefs) {
        setUserPreferences(JSON.parse(savedPrefs));
      }
    }
  }, [user]);

  // Show guided tour for new users
  useEffect(() => {
    if (user && !localStorage.getItem(`guided-tour-${user.id}`)) {
      setShowGuidedTour(true);
    }
  }, [user]);

  // Update preferences
  const updatePreferences = useCallback((updates: Partial<UIPreferences>) => {
    setUserPreferences(prev => {
      const newPrefs = { ...prev, ...updates };
      if (user?.id) {
        localStorage.setItem(`ui-prefs-${user.id}`, JSON.stringify(newPrefs));
      }
      return newPrefs;
    });
  }, [user]);

  // Dismiss guided tour
  const dismissGuidedTour = useCallback(() => {
    setShowGuidedTour(false);
    if (user?.id) {
      localStorage.setItem(`guided-tour-${user.id}`, 'completed');
    }
  }, [user]);

  // Toggle filters based on screen size
  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    showFilters,
    showGuidedTour,
    userPreferences,
    updatePreferences,
    dismissGuidedTour,
    setShowFilters
  };
};
```