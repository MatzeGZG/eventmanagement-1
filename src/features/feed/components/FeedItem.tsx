import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MapPin, Calendar } from 'lucide-react';
import { FeedItem as FeedItemType } from '../types';
import { formatDate } from '../../../utils/date';
import { useInteractions } from '../hooks/useInteractions';

interface FeedItemProps {
  item: FeedItemType;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item }) => {
  const { handleLike, handleComment, handleShare } = useInteractions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl overflow-hidden"
    >
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
        <h3 className="text-xl font-semibold text-fjs-gold mb-2">
          {item.title}
        </h3>
        <p className="text-fjs-silver mb-4">{item.description}</p>

        {item.type === 'event' && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-fjs-silver">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(item.data.date)}
            </div>
            <div className="flex items-center text-sm text-fjs-silver">
              <MapPin className="w-4 h-4 mr-2" />
              {item.data.location.city}, {item.data.location.country}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-black/20">
          <button
            onClick={() => handleLike(item)}
            className="flex items-center space-x-2 text-fjs-silver hover:text-fjs-gold"
          >
            <Heart className="w-5 h-5" />
            <span>{item.likes}</span>
          </button>
          <button
            onClick={() => handleComment(item)}
            className="flex items-center space-x-2 text-fjs-silver hover:text-fjs-gold"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{item.comments}</span>
          </button>
          <button
            onClick={() => handleShare(item)}
            className="flex items-center space-x-2 text-fjs-silver hover:text-fjs-gold"
          >
            <Share2 className="w-5 h-5" />
            <span>{item.shares}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};