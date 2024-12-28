import React from 'react';
import { Heart, MessageCircle, Play } from 'lucide-react';
import { MediaItem as MediaItemType } from '../../types';
import { LazyImage } from '../../../../components/common/LazyImage';

interface MediaItemProps {
  item: MediaItemType;
}

export const MediaItem: React.FC<MediaItemProps> = ({ item }) => (
  <div className="group relative bg-fjs-charcoal rounded-xl overflow-hidden">
    <div className="aspect-square relative">
      <LazyImage
        src={item.url}
        alt={`Posted by ${item.author}`}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      {item.type === 'video' && <VideoOverlay />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <MediaInfo item={item} />
  </div>
);

const VideoOverlay: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
      <Play className="w-6 h-6 text-white" />
    </div>
  </div>
);

const MediaInfo: React.FC<{ item: MediaItemType }> = ({ item }) => (
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