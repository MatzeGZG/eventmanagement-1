import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

interface SearchActionProps {
  onLocationClick?: () => void;
  onCalendarClick?: () => void;
  onPeopleClick?: () => void;
}

export const SearchActions: React.FC<SearchActionProps> = ({
  onLocationClick,
  onCalendarClick,
  onPeopleClick
}) => (
  <div className="flex space-x-2">
    <ActionButton icon={<MapPin />} onClick={onLocationClick} />
    <ActionButton icon={<Calendar />} onClick={onCalendarClick} />
    <ActionButton icon={<Users />} onClick={onPeopleClick} />
  </div>
);

const ActionButton: React.FC<{
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
  >
    <div className="w-5 h-5 text-fjs-gold">
      {icon}
    </div>
  </button>
);