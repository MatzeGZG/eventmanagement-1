import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../store';

interface UserDropdownProps {
  onNavigate: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const user = useStore(state => state.user);

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-64 bg-fjs-charcoal rounded-xl shadow-lg overflow-hidden"
    >
      {user && (
        <div className="p-4 border-b border-black/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
              <User className="w-5 h-5 text-fjs-gold" />
            </div>
            <div>
              <div className="font-medium text-white">{user.name}</div>
              <div className="text-sm text-fjs-silver">{user.level}</div>
            </div>
          </div>
        </div>
      )}

      <div className="p-2">
        <MenuItem
          icon={User}
          label="Profile"
          onClick={() => handleNavigation('/profile')}
        />
        <MenuItem
          icon={Award}
          label="Achievements"
          onClick={() => handleNavigation('/achievements')}
        />
        <MenuItem
          icon={Heart}
          label="My Events"
          onClick={() => handleNavigation('/my-events')}
        />
        <MenuItem
          icon={Settings}
          label="Settings"
          onClick={() => handleNavigation('/settings')}
        />
        <MenuItem
          icon={LogOut}
          label="Sign Out"
          onClick={() => {/* Implement sign out */}}
          className="text-red-400 hover:bg-red-500/10"
        />
      </div>
    </motion.div>
  );
};

interface MenuItemProps {
  icon: React.FC<any>;
  label: string;
  onClick: () => void;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  className = 'text-fjs-silver hover:text-white'
}) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-black/20 transition-colors ${className}`}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
);