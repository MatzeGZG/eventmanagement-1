import React from 'react';
import { ORGANIZER_ACTIONS } from '../../types/gamification';

export const ActionsList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Ways to Earn Points
      </h3>

      <div className="space-y-4">
        {Object.values(ORGANIZER_ACTIONS).map((action) => (
          <div
            key={action.type}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{action.description}</p>
              <p className="text-sm text-gray-600">
                {action.type.split('_').map(word => 
                  word.charAt(0) + word.slice(1).toLowerCase()
                ).join(' ')}
              </p>
            </div>
            <div className="bg-indigo-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-indigo-600">
                +{action.points} points
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};