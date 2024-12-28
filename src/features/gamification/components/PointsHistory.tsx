import React from 'react';
import { formatDistance } from 'date-fns';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PointActivity, PointSpending } from '../types';

interface PointsHistoryProps {
  activities: (PointActivity | PointSpending)[];
}

export const PointsHistory: React.FC<PointsHistoryProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Points History</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {'type' in activity ? (
                  <ArrowUpRight className="w-5 h-5 text-green-500 mr-3" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-500 mr-3" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistance(activity.timestamp, new Date(), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                'type' in activity ? 'text-green-600' : 'text-red-600'
              }`}>
                {('type' in activity ? '+' : '-')}{activity.points}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};