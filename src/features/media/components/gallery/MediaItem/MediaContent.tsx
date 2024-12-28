import React from 'react';
import { Play } from 'lucide-react';
import { LazyImage } from '../../../../../components/common/LazyImage';
import { MediaItem } from '../../../types';

interface MediaContentProps {
  item: MediaItem;
}

export const MediaContent: React.FC<MediaContentProps> = ({ item }) => (
  <div className="aspect-square relative">
    <LazyImage
      src={item.url}
      alt={`Posted by ${item.author}`}
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />
    {item.type === 'video' && <VideoOverlay />}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
);

const VideoOverlay: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
      <Play className="w-6 h-6 text-white" />
    </div>
  </div>
);