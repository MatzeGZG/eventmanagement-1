```typescript
import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { MultiDayEvent, EventTemplate } from '../types/multiDayEvent';

interface MultiDayEventFormProps {
  templates?: EventTemplate[];
  onSubmit: (data: MultiDayEvent) => void;
  initialData?: Partial<MultiDayEvent>;
}

export const MultiDayEventForm: React.FC<MultiDayEventFormProps> = ({
  templates,
  onSubmit,
  initialData
}) => {
  const { register, control, handleSubmit } = useForm<MultiDayEvent>({
    defaultValues: initialData
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subEvents'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Main Event Details */}
      <div className="bg-fjs-charcoal rounded-xl p-6">
        <h2 className="text-xl font-semibold text-fjs-gold mb-4">Main Event</h2>
        
        <div className="space-y-4">
          <input
            {...register('title')}
            placeholder="Event Title"
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="datetime-local"
              {...register('dateRange.start')}
              className="px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
            />
            <input
              type="datetime-local"
              {...register('dateRange.end')}
              className="px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
            />
          </div>

          <textarea
            {...register('description')}
            placeholder="Event Description"
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
            rows={4}
          />
        </div>
      </div>

      {/* Sub Events */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-fjs-gold">Sub Events</h3>
          <button
            type="button"
            onClick={() => append({})}
            className="flex items-center px-4 py-2 bg-fjs-gold text-black rounded-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Sub Event
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="bg-fjs-charcoal rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h4 className="text-white font-medium">Sub Event {index + 1}</h4>
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                {...register(`subEvents.${index}.title`)}
                placeholder="Sub Event Title"
                className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  {...register(`subEvents.${index}.startTime`)}
                  className="px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
                />
                <input
                  type="datetime-local"
                  {...register(`subEvents.${index}.endTime`)}
                  className="px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
                />
              </div>

              <textarea
                {...register(`subEvents.${index}.description`)}
                placeholder="Sub Event Description"
                className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-gradient-gold text-black rounded-lg font-medium"
      >
        Create Multi-Day Event
      </button>
    </form>
  );
};
```