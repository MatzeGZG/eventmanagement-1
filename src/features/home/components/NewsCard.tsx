import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NewsItem } from '../types';
import { BaseCard } from '../../../components/cards/BaseCard';

interface NewsCardProps {
  item: NewsItem;
  index: number;
}

export const NewsCard: React.FC<NewsCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <BaseCard>
        <div className="aspect-video relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {item.relevanceScore && (
            <div className="absolute top-4 right-4 flex items-center bg-fjs-gold/90 text-black px-3 py-1 rounded-full text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{Math.round(item.relevanceScore * 100)}% Match</span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-fjs-gold mb-2">
            {item.title}
          </h3>
          <p className="text-fjs-silver mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-fjs-silver">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDistanceToNow(item.date, { addSuffix: true })}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-fjs-gold text-black rounded-lg font-medium"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </BaseCard>
    </motion.div>
  );
};