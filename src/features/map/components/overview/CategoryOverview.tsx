import React from 'react';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCategoryStats } from '../../hooks/useCategoryStats';

interface CategoryOverviewProps {
  userInterests: string[];
}

export const CategoryOverview: React.FC<CategoryOverviewProps> = ({ userInterests }) => {
  const { categoryStats } = useCategoryStats(userInterests);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Tag className="w-5 h-5 text-fjs-gold" />
        <h2 className="text-lg font-semibold text-fjs-gold">Your Interests</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categoryStats.map(stat => (
          <motion.div
            key={stat.category}
            whileHover={{ scale: 1.02 }}
            className="bg-fjs-charcoal rounded-lg p-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{stat.category}</span>
              <span className="text-fjs-gold font-medium">{stat.count}</span>
            </div>
            <div className="mt-2">
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.percentage}%` }}
                  className="h-full bg-fjs-gold"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};