```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';
import { Forum } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ForumCardProps {
  forum: Forum;
}

export const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-fjs-charcoal rounded-lg overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{forum.title}</h3>
          {forum.isHot && (
            <div className="flex items-center text-fjs-gold">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">Hot</span>
            </div>
          )}
        </div>

        <p className="text-sm text-fjs-silver mt-2 line-clamp-2">
          {forum.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4 text-sm text-fjs-silver">
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {forum.postCount} posts
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {forum.participantCount} participants
            </div>
          </div>
          <span className="text-xs text-fjs-silver">
            Last active {formatDistanceToNow(forum.lastActivityAt)} ago
          </span>
        </div>
      </div>
    </motion.div>
  );
};
```