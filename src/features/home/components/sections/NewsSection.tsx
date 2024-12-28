import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Star } from 'lucide-react';
import { useNewsRecommendations } from '../../hooks/useNewsRecommendations';
import { NewsCard } from '../NewsCard';
import { fadeInUp, staggerChildren } from '../../../../utils/animations/variants';

interface NewsSectionProps {
  userId?: string;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ userId }) => {
  const { news, recommendations } = useNewsRecommendations(userId);

  return (
    <motion.div 
      className="space-y-12"
      variants={staggerChildren}
      initial="initial"
      animate="animate"
    >
      {/* Trending Events */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-fjs-gold mr-2" />
          <h2 className="text-2xl font-bold text-fjs-gold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.trending.map((item, index) => (
            <NewsCard 
              key={`trending-${item.id}`}
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center mb-6">
          <Calendar className="w-6 h-6 text-fjs-gold mr-2" />
          <h2 className="text-2xl font-bold text-fjs-gold">Coming Up</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.upcoming.map((item, index) => (
            <NewsCard 
              key={`upcoming-${item.id}`}
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </motion.div>

      {/* Personalized Recommendations */}
      {recommendations.length > 0 && (
        <motion.div variants={fadeInUp}>
          <div className="flex items-center mb-6">
            <Star className="w-6 h-6 text-fjs-gold mr-2" />
            <h2 className="text-2xl font-bold text-fjs-gold">For You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((item, index) => (
              <NewsCard 
                key={`recommended-${item.id}`}
                item={item} 
                index={index} 
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};