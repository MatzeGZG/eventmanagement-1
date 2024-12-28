import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { useOrganizerLevel } from '../../hooks/useOrganizerLevel';

export const OrganizerLevelCard: React.FC = () => {
  const { currentLevel, nextLevel, progress } = useOrganizerLevel();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Award className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            {currentLevel.level}
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          {progress.current} / {progress.next} XP
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {nextLevel && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next Level:</span>
          <div className="flex items-center text-indigo-600">
            {nextLevel.level}
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Benefits:</h4>
        <ul className="space-y-1">
          {currentLevel.benefits.map((benefit, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center">
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};