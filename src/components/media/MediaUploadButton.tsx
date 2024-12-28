```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, Video } from 'lucide-react';

export const MediaUploadButton: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <button className="bg-gradient-gold text-black px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
        <Upload className="w-5 h-5" />
        <span>Share Moment</span>
      </button>

      <div className="absolute top-full right-0 mt-2 w-48 bg-fjs-charcoal rounded-lg shadow-lg border border-fjs-gold/10 hidden group-hover:block">
        <button className="w-full flex items-center px-4 py-2 text-fjs-silver hover:bg-black/20 hover:text-fjs-gold">
          <Camera className="w-4 h-4 mr-2" />
          Upload Photo
        </button>
        <button className="w-full flex items-center px-4 py-2 text-fjs-silver hover:bg-black/20 hover:text-fjs-gold">
          <Video className="w-4 h-4 mr-2" />
          Upload Video
        </button>
      </div>
    </motion.div>
  );
};
```