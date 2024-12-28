import React from 'react';
import { Calendar, Grid, Clock, List } from 'lucide-react';
import { useCalendar } from '../../../../contexts/CalendarContext';
import { ViewButton } from './ViewButton';

export const ViewSelector: React.FC = () => {
  const { view, setView } = useCalendar();

  const views = [
    { type: 'agenda' as const, icon: List, label: 'MyFun' },
    { type: 'month' as const, icon: Calendar, label: 'Month' },
    { type: 'week' as const, icon: Grid, label: 'Week' },
    { type: 'day' as const, icon: Clock, label: 'Day' }
  ];

  return (
    <div className="flex space-x-1">
      {views.map(({ type, icon, label }) => (
        <ViewButton
          key={type}
          type={type}
          icon={icon}
          label={label}
          isActive={view.type === type}
          onClick={() => setView({ ...view, type })}
        />
      ))}
    </div>
  );
};