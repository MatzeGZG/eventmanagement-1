import React from 'react';
import { useDeviceType } from '../../utils/responsive';
import { ChevronLeft } from 'lucide-react';

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  onBack,
  rightElement
}) => {
  const { isIOS, hasNotch } = useDeviceType();

  return (
    <header className={`
      sticky top-0 z-10
      bg-black/90 backdrop-blur-lg
      ${hasNotch ? 'pt-12' : 'pt-4'}
      ${isIOS ? 'ios-tap-highlight-none' : ''}
    `}>
      <div className="flex items-center justify-between px-4 pb-4">
        {onBack ? (
          <button 
            onClick={onBack}
            className="p-2 -ml-2 text-fjs-gold"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-10" />
        )}
        
        <h1 className="text-lg font-semibold text-fjs-gold">
          {title}
        </h1>
        
        {rightElement || <div className="w-10" />}
      </div>
    </header>
  );
};