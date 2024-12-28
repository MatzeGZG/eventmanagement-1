import React, { useState } from 'react';
import { Search, Filter, Users, Calendar, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatRoom } from '../../types';

interface ChatRoomFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: ChatRoomFilters) => void;
}

export interface ChatRoomFilters {
  type?: 'direct' | 'group' | 'event';
  unreadOnly?: boolean;
  sortBy?: 'recent' | 'unread' | 'active';
}

export const ChatRoomFilters: React.FC<ChatRoomFiltersProps> = ({
  onSearch,
  onFilterChange
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ChatRoomFilters>({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const updateFilters = (newFilters: Partial<ChatRoomFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div className="p-4 border-b border-fjs-charcoal space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-fjs-gold w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search chats..."
          className="w-full pl-10 pr-4 py-2 bg-fjs-charcoal text-white rounded-lg 
                   focus:ring-2 focus:ring-fjs-gold"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <FilterButton
            icon={MessageCircle}
            label="Direct"
            active={filters.type === 'direct'}
            onClick={() => updateFilters({ type: 'direct' })}
          />
          <FilterButton
            icon={Users}
            label="Groups"
            active={filters.type === 'group'}
            onClick={() => updateFilters({ type: 'group' })}
          />
          <FilterButton
            icon={Calendar}
            label="Events"
            active={filters.type === 'event'}
            onClick={() => updateFilters({ type: 'event' })}
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 text-fjs-silver hover:text-fjs-gold rounded-lg 
                   hover:bg-black/20 transition-colors"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.unreadOnly}
                  onChange={(e) => updateFilters({ unreadOnly: e.target.checked })}
                  className="text-fjs-gold rounded border-fjs-charcoal 
                           focus:ring-fjs-gold"
                />
                <span className="text-fjs-silver">Show unread only</span>
              </label>

              <div>
                <label className="block text-sm text-fjs-silver mb-2">Sort by</label>
                <select
                  value={filters.sortBy || 'recent'}
                  onChange={(e) => updateFilters({ sortBy: e.target.value as any })}
                  className="w-full bg-black text-white rounded-lg px-3 py-2 
                           border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
                >
                  <option value="recent">Most Recent</option>
                  <option value="unread">Unread First</option>
                  <option value="active">Most Active</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FilterButtonProps {
  icon: React.FC<any>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  icon: Icon,
  label,
  active,
  onClick
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg flex items-center space-x-1
              ${active 
                ? 'bg-fjs-gold text-black' 
                : 'text-fjs-silver hover:bg-black/20'}`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm font-medium">{label}</span>
  </motion.button>
);