import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Play } from 'lucide-react';
import { MediaItem } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { LazyImage } from '../../../../components/common/LazyImage';

interface MediaCardProps {
  item: MediaItem;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-fjs-charcoal rounded-xl overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-square relative">
        <LazyImage
          src={item.url}
          alt={item.description || `Event moment by ${item.author}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0.8, scale: 1 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center"
            >
              <Play className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={item.authorAvatar || 'https://via.placeholder.com/32'}
              alt={item.author}
              className="w-8 h-8 rounded-full border-2 border-white/20"
            />
            <div>
              <p className="font-medium">{item.author}</p>
              <p className="text-xs text-fjs-silver">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-sm hover:text-fjs-gold transition-colors">
                <Heart className="w-4 h-4" />
                <span>{item.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-sm hover:text-fjs-gold transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{item.comments}</span>
              </button>
            </div>
            <button className="p-2 hover:text-fjs-gold transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};