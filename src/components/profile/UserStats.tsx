import React from 'react';
import { Calendar, Users, Star, Award } from 'lucide-react';
import { useStore } from '../../store';

export const UserStats = () => {
  const user = useStore((state) => state.user);
  const events = useStore((state) => state.events);

  if (!user) return null;

  const attendedEvents = events.filter((event) => 
    event.attendees.includes(user.id)
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Calendar className="w-5 h-5 text-indigo-600" />}
          label="Events Attended"
          value={attendedEvents}
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-indigo-600" />}
          label="Connections"
          value={user.connections.length}
        />
        <StatCard
          icon={<Star className="w-5 h-5 text-indigo-600" />}
          label="XP Earned"
          value={user.xp}
        />
        <StatCard
          icon={<Award className="w-5 h-5 text-indigo-600" />}
          label="Badges"
          value={user.badges.length}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
    {icon}
    <div>
      <div className="text-xl font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);