import React from 'react';
import { Badge, BadgeTier } from '../../../types/badge';

interface BadgeCollectionProps {
  badges: Badge[];
}

export const BadgeCollection: React.FC<BadgeCollectionProps> = ({ badges }) => {
  const getBadgeColor = (tier: BadgeTier) => {
    switch (tier) {
      case BadgeTier.Bronze:
        return 'from-orange-400 to-orange-600';
      case BadgeTier.Silver:
        return 'from-gray-300 to-gray-500';
      case BadgeTier.Gold:
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Badges</h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="group relative flex flex-col items-center"
          >
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${getBadgeColor(
                badge.tier
              )} p-1`}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-2xl">{badge.icon}</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm font-medium text-gray-900">
                {badge.name}
              </span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {badge.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};