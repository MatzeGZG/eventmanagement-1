import React from 'react';
import { Image, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

export const GalleryEmptyState: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fjs-charcoal mb-4">
      <Image className="w-8 h-8 text-fjs-gold" />
    </div>
    <h3 className="text-xl font-semibold text-fjs-gold mb-2">
      No Media Yet
    </h3>
    <p className="text-fjs-silver mb-6">
      Be the first to share a moment from this event
    </p>
    <button className="inline-flex items-center px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium hover:shadow-lg transition-shadow">
      <Upload className="w-5 h-5 mr-2" />
      Share a Moment
    </button>
  </motion.div>
);