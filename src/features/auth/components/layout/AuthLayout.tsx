import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Shield className="w-12 h-12 text-fjs-gold mx-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-fjs-gold">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm text-fjs-silver">
            {subtitle}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};