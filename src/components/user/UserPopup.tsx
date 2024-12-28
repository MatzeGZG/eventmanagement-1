import React from 'react';
import { MessageCircle, UserPlus, Award } from 'lucide-react';
import { User } from '../../types/user';
import { useStore } from '../../store';

interface UserPopupProps {
  user: User;
}

export const UserPopup: React.FC<UserPopupProps> = ({ user }) => {
  const currentUser = useStore((state) => state.user);
  
  return (
    <div className="p-4 max-w-sm">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={user.avatar || 'https://via.placeholder.com/40'}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.level}</p>
          
          <div className="flex items-center mt-1 space-x-1">
            <Award className="w-4 h-4 text-fjs-gold" />
            <span className="text-sm text-gray-600">{user.badges.length} badges</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-fjs-gold text-black rounded-lg hover:bg-fjs-dark-gold transition-colors">
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-fjs-charcoal text-white rounded-lg hover:bg-opacity-80 transition-colors">
          <UserPlus className="w-4 h-4 mr-2" />
          Connect
        </button>
      </div>
    </div>
  );
};