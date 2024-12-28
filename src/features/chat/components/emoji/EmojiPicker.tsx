```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Clock, Search } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'emoji' | 'recent'>('emoji');

  const categories = [
    { name: 'Smileys', emojis: ['😀', '😂', '🥰', '😎', '🤔', '😴'] },
    { name: 'Gestures', emojis: ['👍', '👎', '👏', '🙌', '🤝', '✌️'] },
    { name: 'Objects', emojis: ['❤️', '🎉', '🎈', '🎁', '⭐', '🔥'] }
  ];

  const recentEmojis = ['😀', '👍', '❤️'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute bottom-full mb-2 w-72 bg-fjs-charcoal rounded-lg shadow-lg p-2"
    >
      {/* Search */}
      <div className="relative mb-2">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-fjs-silver" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search emojis..."
          className="w-full pl-8 pr-4 py-1.5 bg-black/20 text-white rounded-md 
                   placeholder:text-fjs-silver/50 focus:ring-1 focus:ring-fjs-gold"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-2">
        <TabButton
          active={activeTab === 'emoji'}
          onClick={() => setActiveTab('emoji')}
          icon={<Smile className="w-4 h-4" />}
          label="Emojis"
        />
        <TabButton
          active={activeTab === 'recent'}
          onClick={() => setActiveTab('recent')}
          icon={<Clock className="w-4 h-4" />}
          label="Recent"
        />
      </div>

      {/* Content */}
      <div className="h-48 overflow-y-auto">
        {activeTab === 'emoji' ? (
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm text-fjs-silver px-2 mb-1">
                  {category.name}
                </h3>
                <div className="grid grid-cols-8 gap-1">
                  {category.emojis.map((emoji) => (
                    <EmojiButton
                      key={emoji}
                      emoji={emoji}
                      onClick={() => {
                        onSelect(emoji);
                        onClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-8 gap-1">
            {recentEmojis.map((emoji) => (
              <EmojiButton
                key={emoji}
                emoji={emoji}
                onClick={() => {
                  onSelect(emoji);
                  onClose();
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm
              ${active 
                ? 'bg-fjs-gold text-black' 
                : 'text-fjs-silver hover:bg-black/20'}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface EmojiButtonProps {
  emoji: string;
  onClick: () => void;
}

const EmojiButton: React.FC<EmojiButtonProps> = ({ emoji, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className="w-8 h-8 flex items-center justify-center rounded hover:bg-black/20"
  >
    <span className="text-lg">{emoji}</span>
  </motion.button>
);
```