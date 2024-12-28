import React from 'react';
import { Calendar, Grid, Clock, List } from 'lucide-react';
import { CalendarViewType } from '../../types';

interface ViewSelectorProps {
  currentView: CalendarViewType;
  onViewChange: (view: CalendarViewType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views = [
    { type: 'agenda' as const, icon: List, label: 'MyFun' },
    { type: 'month' as const, icon: Calendar, label: 'Month' },
    { type: 'week' as const, icon: Grid, label: 'Week' },
    { type: 'day' as const, icon: Clock, label: 'Day' }
  ];

  return (
    <div className="flex space-x-1">
      {views.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          onClick={() => onViewChange(type)}
          className={`flex items-center px-3 py-1.5 rounded-lg transition-colors ${
            currentView === type
              ? 'bg-fjs-gold text-black'
              : 'text-fjs-silver hover:bg-fjs-charcoal'
          }`}
        >
          <Icon className="w-4 h-4 mr-1.5" />
          <span className="text-sm font-medium whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
};