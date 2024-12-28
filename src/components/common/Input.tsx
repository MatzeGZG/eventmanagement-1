import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  icon: Icon,
  error,
  label,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-fjs-silver">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-fjs-gold" />
        )}
        <input
          className={`
            w-full bg-black/80 text-white rounded-lg
            border-2 ${error ? 'border-red-500' : 'border-fjs-gold/50'}
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            focus:border-fjs-gold focus:ring-1 focus:ring-fjs-gold
            placeholder:text-fjs-silver/50 transition-all
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};