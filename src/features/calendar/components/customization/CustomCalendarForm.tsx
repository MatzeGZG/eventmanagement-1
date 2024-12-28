import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Filter, Palette } from 'lucide-react';
import { CustomCalendar, CalendarFilters } from '../../types/customCalendar';

interface CustomCalendarFormProps {
  onSubmit: (data: Partial<CustomCalendar>) => void;
  onCancel: () => void;
  initialData?: Partial<CustomCalendar>;
}

export const CustomCalendarForm: React.FC<CustomCalendarFormProps> = ({
  onSubmit,
  onCancel,
  initialData
}) => {
  const { register, handleSubmit, watch } = useForm<Partial<CustomCalendar>>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Calendar Name
        </label>
        <input
          {...register('name', { required: true })}
          className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          placeholder="My Custom Calendar"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          placeholder="Calendar description..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-2">
          Color
        </label>
        <input
          type="color"
          {...register('color')}
          className="w-full h-10 rounded-lg cursor-pointer"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('isDefault')}
          className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
        />
        <label className="text-sm text-white">
          Set as default calendar
        </label>
      </div>

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
          Save Calendar
        </button>
      </div>
    </form>
  );
};