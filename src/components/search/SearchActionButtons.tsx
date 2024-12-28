import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

interface SearchActionButton {
  icon: React.ReactNode;
  onClick: () => void;
}

export const SearchActionButtons: React.FC = () => {
  const buttons: SearchActionButton[] = [
    { icon: <MapPin className="w-5 h-5 text-fjs-gold" />, onClick: () => {} },
    { icon: <Calendar className="w-5 h-5 text-fjs-gold" />, onClick: () => {} },
    { icon: <Users className="w-5 h-5 text-fjs-gold" />, onClick: () => {} }
  ];

  return (
    <div className="flex space-x-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="p-2 hover:bg-fjs-charcoal rounded-full transition-colors"
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
};