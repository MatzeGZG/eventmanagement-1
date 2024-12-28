```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUp, ArrowDown, X } from 'lucide-react';
import { ChatMessage } from '../../types';

interface MessageSearchProps {
  messages: ChatMessage[];
  onResultSelect: (messageId: string) => void;
}

export const MessageSearch: React.FC<MessageSearchProps> = ({
  messages,
  onResultSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = messages.filter(message =>
    message.content.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (direction: 'up' | 'down') => {
    setSelectedIndex(current => {
      if (direction === 'up') {
        return current > 0 ? current - 1 : results.length - 1;
      } else {
        return current < results.length - 1 ? current + 1 : 0;
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-fjs-silver hover:text-fjs-gold hover:bg-black/20 
                 rounded-full transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-80 bg-fjs-charcoal 
                     rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-2 flex items-center space-x-2">
              <Search className="w-4 h-4 text-fjs-gold" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search messages..."
                className="flex-1 bg-transparent text-white placeholder-fjs-silver 
                         focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-fjs-silver hover:text-fjs-gold rounded-full
                         hover:bg-black/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {query && (
              <div className="border-t border-black/20">
                <div className="p-2 flex items-center justify-between text-sm text-fjs-silver">
                  <span>{results.length} results</span>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => navigate('up')}
                      className="p-1 hover:bg-black/20 rounded-full transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate('down')}
                      className="p-1 hover:bg-black/20 rounded-full transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {results.map((message, index) => (
                    <button
                      key={message.id}
                      onClick={() => {
                        onResultSelect(message.id);
                        setIsOpen(false);
                      }}
                      className={`w-full p-2 text-left hover:bg-black/20 transition-colors
                              ${index === selectedIndex ? 'bg-black/20' : ''}`}
                    >
                      <p className="text-sm text-white font-medium truncate">
                        {message.senderId}
                      </p>
                      <p className="text-sm text-fjs-silver truncate">
                        {message.content}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```