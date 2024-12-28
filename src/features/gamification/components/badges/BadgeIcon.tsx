import React from 'react';
import { Badge, BadgeTier } from '../../types/badge';

interface BadgeIconProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({
  badge,
  size = 'md',
  showTooltip = true
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const tierColors = {
    [BadgeTier.Bronze]: 'from-orange-400 to-orange-600',
    [BadgeTier.Silver]: 'from-gray-300 to-gray-500',
    [BadgeTier.Gold]: 'from-yellow-400 to-yellow-600'
  };

  return (
    <div className="relative group">
      <div
        className={`rounded-full bg-gradient-to-r ${tierColors[badge.tier]} p-1 ${
          sizeClasses[size]
        }`}
      >
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className={`${size === 'sm' ? 'text-xl' : 'text-2xl'}`}>
            {badge.icon}
          </span>
        </div>
      </div>
      
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <div className="font-medium">{badge.name}</div>
          <div className="text-gray-300">{badge.description}</div>
        </div>
      )}
    </div>
  );
};