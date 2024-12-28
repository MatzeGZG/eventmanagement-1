import React from 'react';
import { FeedContainer } from './container/FeedContainer';
import { TrendingTopics } from '../../../components/trending/TrendingTopics';

export const HomeFeed: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <TrendingTopics />
      <div className="mt-8">
        <FeedContainer />
      </div>
    </div>
  );
};