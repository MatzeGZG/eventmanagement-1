```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp } from 'lucide-react';
import { useForums } from '../hooks/useForums';
import { ForumCard } from './ForumCard';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';

export const ForumList: React.FC = () => {
  const { forums, loading, error } = useForums();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-fjs-gold">Discussion Forums</h2>
          <p className="text-fjs-silver">Join conversations about shared interests</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black rounded-lg font-medium">
          Start Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </div>
    </div>
  );
};
```