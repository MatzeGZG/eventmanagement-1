```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { InterestsMetadata } from '../../types/enhanced';

interface InterestEvolutionChartProps {
  metadata: InterestsMetadata;
}

export const InterestEvolutionChart: React.FC<InterestEvolutionChartProps> = ({ metadata }) => {
  const topCategories = Object.entries(metadata.categoriesRanking)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <div className="flex items-center mb-4">
        <TrendingUp className="w-6 h-6 text-fjs-gold mr-2" />
        <h3 className="text-lg font-semibold text-fjs-gold">Interest Evolution</h3>
      </div>

      <div className="space-y-4">
        {topCategories.map(([category, score]) => (
          <div key={category} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white">{category}</span>
              <span className="text-fjs-silver">Level {Math.round(score)}</span>
            </div>
            <div className="h-2 bg-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score / 10) * 100}%` }}
                className="h-full bg-gradient-gold"
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            {metadata.expertiseLevels[category] && (
              <div className="text-xs text-fjs-silver">
                {metadata.expertiseLevels[category]} level
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-black/20 rounded-lg">
        <div className="text-sm text-fjs-silver mb-2">Discovery Preference</div>
        <div className="text-white font-medium capitalize">
          {metadata.discoveryPreferences}
        </div>
      </div>
    </motion.div>
  );
};
```