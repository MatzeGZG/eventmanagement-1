import React from 'react';
import { Trophy, Calendar, Users, Star } from 'lucide-react';
import { useChallenges } from '../hooks/useChallenges';

export const ChallengeList: React.FC = () => {
  const { activeChallenges, completeChallenge } = useChallenges();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h3>
      
      <div className="space-y-4">
        {/* Daily Challenge */}
        <ChallengeCard
          icon={<Calendar className="w-5 h-5" />}
          title="Daily Attendance"
          description="Attend an event today"
          reward={25}
          progress={0}
          total={1}
        />

        {/* Weekly Challenge */}
        <ChallengeCard
          icon={<Users className="w-5 h-5" />}
          title="Social Butterfly"
          description="Connect with 5 new people this week"
          reward={100}
          progress={2}
          total={5}
        />

        {/* Monthly Challenge */}
        <ChallengeCard
          icon={<Star className="w-5 h-5" />}
          title="Event Explorer"
          description="Attend events in 3 different categories"
          reward={250}
          progress={1}
          total={3}
        />
      </div>
    </div>
  );
};

interface ChallengeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  icon,
  title,
  description,
  reward,
  progress,
  total
}) => {
  const percentage = (progress / total) * 100;
  const isComplete = progress >= total;

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <div className="text-indigo-600 mr-3">{icon}</div>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex items-center bg-indigo-100 px-2 py-1 rounded-full">
          <Trophy className="w-4 h-4 text-indigo-600 mr-1" />
          <span className="text-sm font-medium text-indigo-600">+{reward} XP</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress} / {total}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isComplete ? 'bg-green-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};