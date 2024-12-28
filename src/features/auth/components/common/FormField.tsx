import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
  touched?: boolean;
  onBlur?: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  icon: Icon,
  label,
  error,
  touched,
  onBlur,
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
          className={`w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border-2 ${
            error && touched ? 'border-red-500' : 'border-fjs-gold/50'
          } focus:border-fjs-gold focus:ring-1 focus:ring-fjs-gold placeholder:text-fjs-silver/50 transition-all`}
          onBlur={onBlur}
          {...props}
        />
      </div>
      {error && touched && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};