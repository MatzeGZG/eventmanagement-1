import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  icon: Icon,
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-fjs-silver w-24 flex-shrink-0">
          {label}
        </label>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-fjs-gold" aria-hidden="true" />
          </div>
          <input
            {...props}
            aria-label={label}
            className={`
              w-full pl-10 pr-4 py-2 
              bg-fjs-charcoal text-fjs-pearl 
              rounded-lg border-2 
              ${error ? 'border-red-500' : 'border-fjs-dark-gold'} 
              focus:border-fjs-gold focus:ring-1 focus:ring-fjs-gold 
              placeholder:text-fjs-silver/50 
              transition-all
              ${className}
            `}
          />
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 pl-28">
          {error}
        </p>
      )}
    </div>
  );
};