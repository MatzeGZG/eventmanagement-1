```typescript
import React from 'react';
import { useStore } from '../../store';
import { MembershipStatus, PointsDisplay, ChallengeList, BadgeCollection } from '../../features/gamification';
import { UserStats } from './UserStats';
import { UserInterests } from './UserInterests';
import { UserEvents } from './UserEvents';
import { LocationSettings } from './LocationSettings';

export const UserProfile = () => {
  const user = useStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={user.avatar || 'https://via.placeholder.com/96'}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">Member since {user.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Settings & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LocationSettings />
        <UserInterests interests={user.interests} />
      </div>

      {/* Gamification Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <MembershipStatus />
          <ChallengeList />
        </div>
        <div className="space-y-6">
          <PointsDisplay points={user.points} />
          <BadgeCollection badges={user.badges} />
        </div>
      </div>

      {/* User Stats & Events */}
      <div className="space-y-6">
        <UserStats />
        <UserEvents />
      </div>
    </div>
  );
};
```