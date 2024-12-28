import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { StepProps } from './types';
import { StepButtons } from '../StepButtons';
import { validatePassword } from '../../../../utils/security/authValidation';

export const BasicInfoStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  onNext,
  loading
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordErrors = validatePassword(formData.password);
      if (passwordErrors.length > 0) {
        newErrors.password = passwordErrors[0];
      }
    }

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
              placeholder="First name"
              disabled={loading}
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-fjs-silver mb-1">
            Surname
          </label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className="w-full px-4 py-2 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
            placeholder="Surname (optional)"
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-fjs-silver mb-1">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fjs-gold w-5 h-5" />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-black text-white rounded-lg border border-fjs-gold focus:ring-2 focus:ring-fjs-light-gold"
            placeholder="Create a password"
            disabled={loading}
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <StepButtons 
        onNext={onNext}
        disabled={loading || !formData.email || !formData.password || !formData.firstName}
      />
    </form>
  );
};