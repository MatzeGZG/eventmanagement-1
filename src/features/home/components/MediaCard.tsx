import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Play } from 'lucide-react';
import { MediaItem } from '../../../types';
import { formatDistanceToNow } from 'date-fns';
import { BaseCard } from '../../../components/cards/BaseCard';

interface MediaCardProps {
  item: MediaItem;
}

export const MediaCard: React.FC<MediaCardProps> = ({ item }) => {
  return (
    <BaseCard>
      <div className="aspect-square relative">
        <img
          src={item.url}
          alt={`Posted by ${item.author}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <img
            src={item.authorAvatar}
            alt={item.author}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-white">{item.author}</p>
            <p className="text-xs text-fjs-silver">
              {formatDistanceToNow(item.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-fjs-silver hover:text-fjs-gold transition-colors">
              <Heart className="w-4 h-4" />
              <span>{item.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-fjs-silver hover:text-fjs-gold transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{item.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};