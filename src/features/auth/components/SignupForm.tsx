import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { FormInput } from '../../../components/common/FormInput';
import { PasswordRequirements } from '../../../components/common/PasswordRequirements';
import { useSecureAuth } from '../hooks/useSecureAuth';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);
  const { register, loading } = useSecureAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        icon={User}
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter your name"
        required
        disabled={loading}
      />

      <FormInput
        icon={Mail}
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
        required
        disabled={loading}
      />

      <div>
        <FormInput
          icon={Lock}
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          onFocus={() => setShowPasswordReqs(true)}
          placeholder="Create a password"
          required
          disabled={loading}
        />
        <PasswordRequirements 
          password={formData.password}
          visible={showPasswordReqs}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 bg-gradient-gold text-fjs-charcoal rounded-lg font-medium hover:bg-fjs-light-gold transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-fjs-silver">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-fjs-gold hover:text-fjs-light-gold"
        >
          Sign in
        </button>
      </p>
    </form>
  );
};