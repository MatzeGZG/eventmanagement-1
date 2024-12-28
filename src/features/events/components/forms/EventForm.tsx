```tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, MapPin, Tag, DollarSign, Users, Image } from 'lucide-react';
import { Event, EventCategory } from '../../../../types/event';
import { LocationSearch } from './LocationSearch';
import { ImageUpload } from './ImageUpload';

interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (data: Event) => void;
  loading?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  loading
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Event>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Event Title
        </label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          placeholder="Enter event title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Description
        </label>
        <textarea
          {...register('description', { required: 'Description is required' })}
          rows={4}
          className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          placeholder="Describe your event"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            <Calendar className="w-4 h-4 inline-block mr-2" />
            Date
          </label>
          <input
            type="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            Time
          </label>
          <input
            type="time"
            {...register('time', { required: 'Time is required' })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>

      {/* Location */}
      <LocationSearch onSelect={(location) => setValue('location', location)} />

      {/* Category and Tags */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            <Tag className="w-4 h-4 inline-block mr-2" />
            Category
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          >
            {Object.values(EventCategory).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            Tags
          </label>
          <input
            {...register('tags')}
            placeholder="Separate tags with commas"
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>

      {/* Capacity and Price */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            <Users className="w-4 h-4 inline-block mr-2" />
            Capacity
          </label>
          <input
            type="number"
            {...register('capacity', { required: 'Capacity is required', min: 1 })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            <DollarSign className="w-4 h-4 inline-block mr-2" />
            Price
          </label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', min: 0 })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          <Image className="w-4 h-4 inline-block mr-2" />
          Event Images
        </label>
        <ImageUpload
          onImagesSelected={(urls) => setValue('images', urls)}
          maxImages={5}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-gradient-gold text-black rounded-lg font-medium hover:bg-fjs-light-gold transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating Event...' : 'Create Event'}
      </button>
    </form>
  );
};
```