import React from 'react';
import { motion } from 'framer-motion';
import { DiscoveryFeed } from './DiscoveryFeed';
import { GuidedTour } from './GuidedTour';
import { EngagementPrompts } from './EngagementPrompts';
import { FriendFinder } from '../../social/components/FriendFinder';
import { GroupList } from '../../social/components/GroupList';
import { ForumList } from '../../forums/components/ForumList';

export const DiscoveryHub: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Guided Tour for new users */}
      <GuidedTour />

      {/* Engagement Prompts */}
      <EngagementPrompts />

      {/* Discovery Feed */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DiscoveryFeed />
      </motion.section>

      {/* Social Connections */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FriendFinder />
      </motion.section>

      {/* Groups */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GroupList />
      </motion.section>

      {/* Forums */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ForumList />
      </motion.section>
    </div>
  );
};