import React from 'react';
import { Award } from 'lucide-react';

interface PointsBadgeProps {
  points: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PointsBadge: React.FC<PointsBadgeProps> = ({
  points,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div
      className={`flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full ${sizeClasses[size]}`}
    >
      <Award className="w-4 h-4 mr-1" />
      <span className="font-medium">{points} pts</span>
    </div>
  );
};