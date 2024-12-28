import React from 'react';
import { Tag } from 'lucide-react';

interface UserInterestsProps {
  interests: string[];
}

export const UserInterests: React.FC<UserInterestsProps> = ({ interests }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Tag className="w-5 h-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  );
};