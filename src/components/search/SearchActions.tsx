import React from 'react';
import { MapPin, Calendar, Users, Filter } from 'lucide-react';

interface SearchActionsProps {
  onToggleFilters: () => void;
  showFilters: boolean;
}

export const SearchActions: React.FC<SearchActionsProps> = ({
  onToggleFilters,
  showFilters
}) => (
  <div className="flex space-x-2">
    <ActionButton icon={<MapPin />} onClick={() => {}} />
    <ActionButton icon={<Calendar />} onClick={() => {}} />
    <ActionButton icon={<Users />} onClick={() => {}} />
    <ActionButton 
      icon={<Filter />} 
      onClick={onToggleFilters}
      active={showFilters}
    />
  </div>
);

const ActionButton: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}> = ({ icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full transition-colors ${
      active 
        ? 'bg-fjs-gold text-black' 
        : 'hover:bg-fjs-charcoal text-fjs-gold'
    }`}
  >
    <div className="w-5 h-5">
      {icon}
    </div>
  </button>
);