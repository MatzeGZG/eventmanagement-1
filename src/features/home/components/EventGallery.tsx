import React from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEventMedia } from '../hooks/useEventMedia';
import { MediaCard } from './MediaCard';
import { GridLayout } from '../../../components/layout/GridLayout';

interface EventGalleryProps {
  userId?: string;
}

export const EventGallery: React.FC<EventGalleryProps> = ({ userId }) => {
  const { mediaItems, loading } = useEventMedia(userId);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-fjs-gold">Your Event Memories</h2>
          <p className="text-fjs-silver mt-2">Relive your favorite moments</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-gold text-black px-4 py-2 rounded-lg font-medium flex items-center"
        >
          <Camera className="w-5 h-5 mr-2" />
          Share Memory
        </motion.button>
      </div>

      <GridLayout>
        {mediaItems.map(item => (
          <MediaCard key={item.id} item={item} />
        ))}
      </GridLayout>
    </div>
  );
};