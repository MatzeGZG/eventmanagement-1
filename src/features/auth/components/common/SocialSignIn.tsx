import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';

export const SocialSignIn: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-fjs-charcoal" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-fjs-silver">
            Or continue with
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex justify-center items-center px-4 py-2 border border-fjs-charcoal rounded-lg text-fjs-silver hover:bg-fjs-charcoal transition-colors"
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex justify-center items-center px-4 py-2 border border-fjs-charcoal rounded-lg text-fjs-silver hover:bg-fjs-charcoal transition-colors"
        >
          <Twitter className="w-5 h-5 mr-2" />
          Twitter
        </motion.button>
      </div>
    </div>
  );
};