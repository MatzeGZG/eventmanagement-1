import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangeFilterProps {
  dateRange?: { start: Date; end: Date };
  onChange: (dateRange?: { start: Date; end: Date }) => void;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  onChange
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-fjs-gold" />
        <span className="text-sm font-medium text-fjs-silver">Date Range</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-fjs-silver">From</label>
          <input
            type="date"
            value={dateRange?.start?.toISOString().split('T')[0] || ''}
            onChange={(e) => onChange({
              start: new Date(e.target.value),
              end: dateRange?.end || new Date()
            })}
            className="w-full px-3 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-fjs-silver">To</label>
          <input
            type="date"
            value={dateRange?.end?.toISOString().split('T')[0] || ''}
            onChange={(e) => onChange({
              start: dateRange?.start || new Date(),
              end: new Date(e.target.value)
            })}
            className="w-full px-3 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>
    </div>
  );
};