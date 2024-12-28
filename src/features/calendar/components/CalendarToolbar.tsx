```tsx
import React from 'react';
import { Calendar, List, RefreshCw } from 'lucide-react';
import { CalendarView } from '../types';

interface CalendarToolbarProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onSync: () => void;
  isLoading: boolean;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  view,
  onViewChange,
  onSync,
  isLoading
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-fjs-charcoal">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onViewChange({ ...view, type: 'month' })}
          className={`p-2 rounded-md ${
            view.type === 'month' ? 'bg-fjs-gold text-black' : 'text-fjs-silver'
          }`}
        >
          <Calendar className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewChange({ ...view, type: 'agenda' })}
          className={`p-2 rounded-md ${
            view.type === 'agenda' ? 'bg-fjs-gold text-black' : 'text-fjs-silver'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onSync}
        disabled={isLoading}
        className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-md hover:bg-fjs-dark-gold disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        Sync Calendar
      </button>
    </div>
  );
};
```