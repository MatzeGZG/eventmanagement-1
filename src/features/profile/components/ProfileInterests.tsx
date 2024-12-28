```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Plus } from 'lucide-react';

interface ProfileInterestsProps {
  interests: string[];
  onAdd?: () => void;
  onRemove?: (interest: string) => void;
  editable?: boolean;
}

export const ProfileInterests: React.FC<ProfileInterestsProps> = ({
  interests,
  onAdd,
  onRemove,
  editable = false
}) => {
  return (
    <motion.div
      className="bg-fjs-charcoal rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-fjs-gold">Interests</h2>
        {editable && onAdd && (
          <motion.button
            onClick={onAdd}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <motion.div
            key={interest}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center bg-black/30 text-fjs-gold px-3 py-1.5 rounded-full">
              <Tag className="w-4 h-4 mr-2" />
              <span>{interest}</span>
              {editable && onRemove && (
                <button
                  onClick={() => onRemove(interest)}
                  className="ml-2 hover:text-fjs-light-gold"
                >
                  ×
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
```