import React from 'react';
import { Badge, BadgeTier } from '../../types/badge';

interface BadgeDisplayProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badge,
  size = 'md',
}) => {
  const tierColors = {
    [BadgeTier.Bronze]: 'from-orange-400 to-orange-600',
    [BadgeTier.Silver]: 'from-gray-300 to-gray-500',
    [BadgeTier.Gold]: 'from-yellow-400 to-yellow-600',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="relative group">
      <div
        className={`rounded-full bg-gradient-to-r ${
          tierColors[badge.tier]
        } p-1 ${sizeClasses[size]}`}
      >
        <img
          src={badge.icon}
          alt={badge.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {badge.name}
      </div>
    </div>
  );
};