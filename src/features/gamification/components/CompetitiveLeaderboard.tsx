import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useLeaderboard } from '../hooks/useLeaderboard';

export const CompetitiveLeaderboard: React.FC = () => {
  const { leaderboard, userRank, loading } = useLeaderboard();

  return (
    <div className="bg-fjs-charcoal rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-fjs-gold">Top Adventurers</h2>
        <div className="text-fjs-silver">
          Your Rank: #{userRank}
        </div>
      </div>

      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <RankBadge rank={index + 1} />
              <div>
                <h3 className="font-medium text-white">{user.name}</h3>
                <p className="text-sm text-fjs-silver">{user.level}</p>
              </div>
            </div>
            <div className="text-fjs-gold font-bold">
              {user.points.toLocaleString()} pts
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const RankBadge: React.FC<{ rank: number }> = ({ rank }) => {
  const getBadgeContent = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-fjs-silver font-medium">{rank}</span>;
    }
  };

  return (
    <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
      {getBadgeContent()}
    </div>
  );
};