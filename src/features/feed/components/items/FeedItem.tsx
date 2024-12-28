import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { FeedItem as FeedItemType } from '../../types';

interface FeedItemProps {
  item: FeedItemType;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  return (
    <div className="bg-fjs-charcoal rounded-lg overflow-hidden">
      {item.image && (
        <div className="aspect-video relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-fjs-gold mb-2">{item.title}</h3>
        <p className="text-fjs-silver mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between text-fjs-silver">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-fjs-gold transition-colors">
              <Heart className="w-5 h-5" />
              <span>{item.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-fjs-gold transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{item.comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-fjs-gold transition-colors">
              <Share2 className="w-5 h-5" />
              <span>{item.shares}</span>
            </button>
          </div>
          <span className="text-sm">
            {formatDistanceToNow(item.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};