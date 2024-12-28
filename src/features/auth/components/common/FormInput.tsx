import React from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
  showToggle?: boolean;
  onToggleVisibility?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  icon: Icon,
  label,
  error,
  showToggle,
  onToggleVisibility,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-fjs-silver">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type={type}
          className={`
            w-full pl-10 pr-${showToggle ? '10' : '4'} py-2 
            bg-black text-white rounded-lg 
            border-2 ${error ? 'border-red-500' : 'border-fjs-gold/50'} 
            focus:border-fjs-gold focus:ring-1 focus:ring-fjs-gold 
            placeholder:text-fjs-silver/50 transition-all
            ${className}
          `}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-fjs-silver hover:text-fjs-gold"
          >
            {type === 'password' ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};