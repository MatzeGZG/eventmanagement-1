import React from 'react';
import { User, Camera } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import { StepButtons } from '../StepButtons';

interface BasicInfoForm {
  name: string;
  bio: string;
  location: string;
  avatar?: FileList;
}

export const BasicInfoStep: React.FC<StepProps> = ({ onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BasicInfoForm>();

  const onSubmit = (data: BasicInfoForm) => {
    // Handle form submission
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-black/30 flex items-center justify-center">
            <Camera className="w-8 h-8 text-fjs-silver" />
          </div>
          <input
            type="file"
            {...register('avatar')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            Full Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-fjs-gold"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Bio
        </label>
        <textarea
          {...register('bio')}
          rows={4}
          className="w-full bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-fjs-gold"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Location
        </label>
        <input
          type="text"
          {...register('location')}
          className="w-full bg-black/30 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-fjs-gold"
          placeholder="City, Country"
        />
      </div>

      <StepButtons onNext={handleSubmit(onSubmit)} />
    </form>
  );
};