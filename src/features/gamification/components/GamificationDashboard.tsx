```typescript
import React from 'react';
import { LevelProgress } from './LevelProgress';
import { PointsOverview } from './PointsOverview';
import { ChallengeList } from './ChallengeList';
import { useStore } from '../../../store';

export const GamificationDashboard: React.FC = () => {
  const user = useStore(state => state.user);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LevelProgress
          currentXP={user.xp}
          level={user.level}
        />
        <PointsOverview />
      </div>

      <div className="space-y-6">
        <ChallengeList />
      </div>
    </div>
  );
};
```