```tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdaptiveUI } from '../hooks/useAdaptiveUI';
import { PersonalizedFeed } from './PersonalizedFeed';
import { FilterPanel } from './FilterPanel';
import { GuidedTour } from './GuidedTour';

export const AdaptiveUI: React.FC = () => {
  const { 
    showFilters,
    showGuidedTour,
    filters,
    updateFilters,
    dismissGuidedTour,
    userPreferences,
    updatePreferences
  } = useAdaptiveUI();

  // Adapt UI based on user preferences
  useEffect(() => {
    if (userPreferences.preferredLayout) {
      document.documentElement.setAttribute('data-layout', userPreferences.preferredLayout);
    }
  }, [userPreferences.preferredLayout]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatePresence>
        {showGuidedTour && (
          <GuidedTour onDismiss={dismissGuidedTour} />
        )}
      </AnimatePresence>

      <div className="flex gap-6">
        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 flex-shrink-0"
          >
            <FilterPanel 
              filters={filters}
              onFilterChange={updateFilters}
            />
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          <PersonalizedFeed />
        </div>
      </div>
    </div>
  );
};
```