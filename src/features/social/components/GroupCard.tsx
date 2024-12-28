import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface GroupCardProps {
  group: any;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-fjs-charcoal rounded-lg overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={group.coverImage || 'https://images.unsplash.com/photo-1523580494863-6f3031224c94'}
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{group.name}</h3>
          {group.relevanceScore > 0.7 && (
            <span className="px-2 py-1 bg-fjs-gold/20 text-fjs-gold text-xs rounded-full">
              {Math.round(group.relevanceScore * 100)}% Match
            </span>
          )}
        </div>

        <p className="text-sm text-fjs-silver mb-4 line-clamp-2">
          {group.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex space-x-4 text-fjs-silver">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {group.memberCount} members
            </div>
            <div className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              {group.discussionCount} discussions
            </div>
          </div>
          <div className="text-fjs-silver">
            <Calendar className="w-4 h-4 inline-block mr-1" />
            {formatDistanceToNow(new Date(group.lastActivityAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};