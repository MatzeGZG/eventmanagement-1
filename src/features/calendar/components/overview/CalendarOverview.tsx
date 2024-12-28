import React from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrendingEvents } from './TrendingEvents';
import { UserInterests } from './UserInterests';

export const CalendarOverview: React.FC = () => {
  return (
    <div className="bg-black/90 backdrop-blur-sm border-b border-fjs-charcoal p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendingEvents />
        <UserInterests />
      </div>
    </div>
  );
};