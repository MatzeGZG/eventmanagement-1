import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface AuthOverlayProps {
  children: React.ReactNode;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <div className="bg-gradient-gold p-3 rounded-xl shadow-gold">
            <MapPin className="w-8 h-8 text-black" />
          </div>
        </div>
        
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
          FunJetSetter
        </h1>
        <p className="mt-2 text-center text-sm text-fjs-silver">
          Discover amazing events and connect with like-minded people
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 relative sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-black/80 backdrop-blur-md py-8 px-4 shadow-xl ring-1 ring-fjs-gold/10 sm:rounded-lg sm:px-10">
          {children}
        </div>
      </motion.div>
    </div>
  );
};