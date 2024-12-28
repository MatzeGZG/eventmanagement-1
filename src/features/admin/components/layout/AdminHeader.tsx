import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { User as UserType } from '../../../../types/user';

interface AdminHeaderProps {
  user: UserType | null;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ user }) => {
  return (
    <header className="bg-fjs-charcoal border-b border-fjs-gold/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-fjs-gold text-xl font-bold">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-fjs-silver hover:text-fjs-gold rounded-lg">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-fjs-silver hover:text-fjs-gold rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-fjs-silver">{user?.name}</span>
            <div className="w-8 h-8 bg-fjs-gold rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};