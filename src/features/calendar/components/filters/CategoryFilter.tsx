import React from 'react';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { EventCategory } from '../../../../types/event';

interface CategoryFilterProps {
  selectedCategories: EventCategory[];
  onChange: (categories: EventCategory[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onChange
}) => {
  const toggleCategory = (category: EventCategory) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    onChange(newCategories);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Tag className="w-4 h-4 text-fjs-gold" />
        <span className="text-sm font-medium text-fjs-silver">Categories</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.values(EventCategory).map(category => (
          <motion.button
            key={category}
            onClick={() => toggleCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selectedCategories.includes(category)
                ? 'bg-fjs-gold text-black'
                : 'bg-fjs-charcoal text-fjs-silver hover:bg-fjs-charcoal/80'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};