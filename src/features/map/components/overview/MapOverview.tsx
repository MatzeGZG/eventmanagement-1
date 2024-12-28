import React from 'react';
import { TrendingEvents } from './TrendingEvents';
import { CategoryOverview } from './CategoryOverview';
import { useStore } from '../../../../store';

export const MapOverview: React.FC = () => {
  const user = useStore(state => state.user);

  return (
    <div className="absolute top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-fjs-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendingEvents />
          {user && <CategoryOverview userInterests={user.interests} />}
        </div>
      </div>
    </div>
  );
};