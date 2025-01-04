import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { FormInput } from '../../../components/common/FormInput';
import { useSecureAuth } from '../hooks/useSecureAuth';
import { useNavigate } from 'react-router-dom';
import { PasswordRequirements } from '../../../components/common/PasswordRequirements';

export const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);
  const { updatePassword, loading } = useSecureAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(password);
      navigate('/');
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-fjs-gold">
          Set New Password
        </h2>
        <p className="mt-2 text-center text-sm text-fjs-silver">
          Please enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black/80 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FormInput
                icon={Lock}
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordReqs(true)}
                placeholder="Enter your new password"
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
                password={password}
                visible={showPasswordReqs}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-fjs-gold hover:bg-fjs-dark-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fjs-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 