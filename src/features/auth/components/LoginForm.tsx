import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormInput } from './common/FormInput';
import { PasswordRequirements } from '../../../components/common/PasswordRequirements';

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-6 w-full max-w-md mx-auto">
      <FormInput
        icon={Mail}
        label="Email"
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
        aria-label="Email address"
      />

      <div className="space-y-2">
        <FormInput
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
          showToggle
          onToggleVisibility={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-fjs-gold rounded border-fjs-charcoal focus:ring-fjs-gold"
            />
            <span className="ml-2 text-fjs-silver">Remember me</span>
          </label>

          <a href="/forgot-password" className="text-fjs-gold hover:text-fjs-light-gold">
            Forgot password?
          </a>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-black py-3 rounded-lg font-medium 
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </motion.button>
    </form>
  );
};