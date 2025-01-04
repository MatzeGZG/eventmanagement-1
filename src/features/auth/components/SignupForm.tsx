import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { FormInput } from '../../../components/common/FormInput';
import { PasswordRequirements } from '../../../components/common/PasswordRequirements';
import { useSecureAuth } from '../hooks/useSecureAuth';
import { useNavigate } from 'react-router-dom';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);
  const { register, loading } = useSecureAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
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
        autoComplete="name"
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
        autoComplete="email"
      />

      <div className="relative">
        <FormInput
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          onFocus={() => setShowPasswordReqs(true)}
          placeholder="Create a password"
          required
          disabled={loading}
          autoComplete="new-password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[12px] text-fjs-silver hover:text-fjs-gold"
          disabled={loading}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
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
    </form>
  );
};