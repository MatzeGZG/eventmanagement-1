import React from 'react';
import { Tag } from 'lucide-react';
import { useStore } from '../../../../store';

export const UserInterests: React.FC = () => {
  const user = useStore(state => state.user);

  if (!user?.interests.length) return null;

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Tag className="w-5 h-5 text-fjs-gold" />
        <h2 className="text-lg font-semibold text-fjs-gold">Your Interests</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {user.interests.map(interest => (
          <span
            key={interest}
            className="px-3 py-1 bg-fjs-charcoal text-fjs-silver rounded-full text-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};