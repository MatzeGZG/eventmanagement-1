import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const TrendingTopics: React.FC = () => {
  const trendingTopics = [
    { id: 1, name: 'Tech Meetups', count: 156 },
    { id: 2, name: 'Live Music', count: 89 },
    { id: 3, name: 'Networking', count: 234 },
    { id: 4, name: 'Workshops', count: 167 }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4 sm:px-0">
      <div className="flex items-center text-fjs-gold">
        <TrendingUp className="w-5 h-5 mr-2" />
        <span className="font-medium">Trending Now</span>
      </div>
      
      <div className="w-full sm:w-auto flex flex-wrap gap-2">
        {trendingTopics.map((topic) => (
          <motion.button
            key={topic.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 sm:flex-none flex items-center justify-between px-4 py-2 bg-fjs-charcoal rounded-full hover:bg-opacity-80 transition-colors"
          >
            <span className="text-white">{topic.name}</span>
            <span className="ml-2 text-sm text-fjs-gold">{topic.count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};