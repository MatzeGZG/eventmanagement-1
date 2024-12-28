import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthValidation } from '../../../hooks/useAuthValidation';
import { PasswordStrengthIndicator } from '../../common/PasswordStrengthIndicator';
import { FormInput } from '../../common/FormInput';
import { StepButtons } from '../StepButtons';
import { StepProps } from '../types';

export const BasicInfoStep: React.FC<StepProps> = ({ formData, setFormData, onNext }) => {
  const { errors, validateField, getPasswordStrength } = useAuthValidation();
  const [showStrength, setShowStrength] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = ['email', 'password', 'firstName'].every(field => 
      validateField(field, formData[field])
    );

    if (isValid) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        icon={User}
        label="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        error={errors.firstName}
        required
      />

      <FormInput
        icon={Mail}
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <div>
        <FormInput
          icon={Lock}
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            setShowStrength(true);
          }}
          error={errors.password}
          required
        />
        <PasswordStrengthIndicator
          strength={getPasswordStrength(formData.password)}
          visible={showStrength}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StepButtons onNext={handleSubmit} />
      </motion.div>
    </form>
  );
};