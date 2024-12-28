import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { TrustIndicators } from './common/TrustIndicators';

export const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleForm = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsLogin(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-fjs-gold">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black/80 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
            {isLogin ? <LoginForm /> : <SignupForm />}
          </AnimatePresence>

          <div className="mt-6">
            <button
              onClick={toggleForm}
              className="w-full text-center text-sm text-fjs-silver hover:text-fjs-gold"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>

        <TrustIndicators />
      </div>
    </div>
  );
};