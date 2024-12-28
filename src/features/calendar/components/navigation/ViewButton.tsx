import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CalendarViewType } from '../../types';

interface ViewButtonProps {
  type: CalendarViewType;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ViewButton: React.FC<ViewButtonProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`flex items-center px-2.5 py-1.5 rounded-lg transition-colors ${
      isActive
        ? 'bg-fjs-gold text-black'
        : 'text-fjs-silver hover:bg-fjs-charcoal'
    }`}
  >
    <Icon className="w-4 h-4 mr-1.5" />
    <span className="text-sm font-medium whitespace-nowrap">{label}</span>
  </button>
);