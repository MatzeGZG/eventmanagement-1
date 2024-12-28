import React from 'react';
import { OrganizerLevelCard } from './OrganizerLevelCard';
import { ActionsList } from './ActionsList';

export const OrganizerGamification: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Organizer Progress
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrganizerLevelCard />
        <ActionsList />
      </div>
    </div>
  );
};