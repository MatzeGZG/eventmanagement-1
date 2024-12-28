```typescript
import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Repeat } from 'lucide-react';
import { RecurrenceRule, RecurrenceFrequency } from '../../types/recurrence';

interface EventSeriesFormProps {
  onSubmit: (rule: RecurrenceRule) => void;
  onCancel: () => void;
  initialRule?: RecurrenceRule;
}

export const EventSeriesForm: React.FC<EventSeriesFormProps> = ({
  onSubmit,
  onCancel,
  initialRule
}) => {
  const { register, handleSubmit, watch } = useForm<RecurrenceRule>({
    defaultValues: initialRule || {
      frequency: 'weekly',
      interval: 1
    }
  });

  const frequency = watch('frequency');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Repeat Frequency
        </label>
        <select
          {...register('frequency')}
          className="w-full bg-black text-white rounded-lg px-4 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Repeat Every
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            {...register('interval', { min: 1 })}
            className="w-20 bg-black text-white rounded-lg px-4 py-2 border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
          <span className="text-fjs-silver">
            {frequency === 'daily' && 'days'}
            {frequency === 'weekly' && 'weeks'}
            {frequency === 'monthly' && 'months'}
            {frequency === 'yearly' && 'years'}
          </span>
        </div>
      </div>

      {frequency === 'weekly' && (
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-2">
            Repeat On
          </label>
          <div className="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={index}
                  {...register('weekDays')}
                  className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
                />
                <span className="text-white">{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-fjs-silver hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-fjs-gold text-black rounded-lg hover:bg-fjs-light-gold transition-colors"
        >
          Save Series
        </button>
      </div>
    </form>
  );
};
```