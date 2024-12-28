```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Heart } from 'lucide-react';
import { CompatibilityFactors } from '../../types/enhanced';

interface CompatibilityPreferencesProps {
  factors: CompatibilityFactors;
}

export const CompatibilityPreferences: React.FC<CompatibilityPreferencesProps> = ({ factors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-fjs-charcoal rounded-xl p-6"
    >
      <div className="flex items-center mb-6">
        <Heart className="w-6 h-6 text-fjs-gold mr-2" />
        <h3 className="text-lg font-semibold text-fjs-gold">Compatibility Preferences</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Group */}
        {factors.ageGroupPreference && (
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-fjs-silver mb-2">Age Group</div>
            <div className="text-white">
              {factors.ageGroupPreference.min} - {factors.ageGroupPreference.max} years
            </div>
          </div>
        )}

        {/* Group Size */}
        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Users className="w-4 h-4 text-fjs-gold mr-2" />
            <div className="text-sm text-fjs-silver">Preferred Group Size</div>
          </div>
          <div className="text-white capitalize">{factors.groupSizePreference}</div>
        </div>

        {/* Activity Level */}
        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Activity className="w-4 h-4 text-fjs-gold mr-2" />
            <div className="text-sm text-fjs-silver">Activity Level</div>
          </div>
          <div className="text-white capitalize">{factors.activityLevel}</div>
        </div>

        {/* Social Values */}
        {factors.socialValues.length > 0 && (
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-fjs-silver mb-2">Social Values</div>
            <div className="flex flex-wrap gap-2">
              {factors.socialValues.map((value) => (
                <span
                  key={value}
                  className="px-2 py-1 bg-fjs-gold/20 text-fjs-gold rounded-full text-sm"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
```