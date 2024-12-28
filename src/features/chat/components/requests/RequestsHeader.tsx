import React from 'react';
import { MessageSquarePlus } from 'lucide-react';

interface RequestsHeaderProps {
  count: number;
}

export const RequestsHeader: React.FC<RequestsHeaderProps> = ({ count }) => {
  return (
    <div className="p-4 border-b border-fjs-charcoal">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MessageSquarePlus className="w-5 h-5 text-fjs-gold mr-2" />
          <h3 className="text-lg font-semibold text-fjs-gold">Chat Requests</h3>
        </div>
        {count > 0 && (
          <span className="px-2 py-1 bg-fjs-gold text-black text-xs font-medium rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};