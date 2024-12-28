import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { MediaItem } from '../../../types';

interface MediaInfoProps {
  item: MediaItem;
}

export const MediaInfo: React.FC<MediaInfoProps> = ({ item }) => (
  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
    <p className="font-medium truncate">{item.author}</p>
    <p className="text-sm text-fjs-silver truncate">{item.location}</p>
    
    <div className="flex items-center space-x-4 mt-2">
      <button className="flex items-center space-x-1 text-sm">
        <Heart className="w-4 h-4" />
        <span>{item.likes}</span>
      </button>
      <button className="flex items-center space-x-1 text-sm">
        <MessageCircle className="w-4 h-4" />
        <span>{item.comments}</span>
      </button>
    </div>
  </div>
);