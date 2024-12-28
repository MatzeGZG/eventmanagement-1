import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Calendar, Plus } from 'lucide-react';
import { useChat } from '../../../features/chat/hooks/useChat';
import { useNavigate } from 'react-router-dom';

interface ChatDropdownProps {
  onClose: () => void;
}

export const ChatDropdown: React.FC<ChatDropdownProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { recentChats } = useChat();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-80 bg-fjs-charcoal rounded-xl shadow-lg overflow-hidden z-50"
    >
      <div className="p-4 border-b border-black/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-fjs-gold">Messages</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('/chat/new')}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-lg"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="p-2">
        <QuickAction
          icon={MessageCircle}
          label="Direct Messages"
          onClick={() => handleNavigation('/chat/direct')}
        />
        <QuickAction
          icon={Users}
          label="Group Chats"
          onClick={() => handleNavigation('/chat/groups')}
        />
        <QuickAction
          icon={Calendar}
          label="Event Discussions"
          onClick={() => handleNavigation('/chat/events')}
        />
      </div>

      {recentChats?.length > 0 && (
        <div className="border-t border-black/20 pt-2">
          <div className="px-4 py-2">
            <span className="text-sm text-fjs-silver">Recent Chats</span>
          </div>
          {recentChats.map(chat => (
            <RecentChatItem
              key={chat.id}
              chat={chat}
              onClick={() => handleNavigation(`/chat/${chat.id}`)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const QuickAction: React.FC<{
  icon: React.FC<any>;
  label: string;
  onClick: () => void;
}> = ({ icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="w-full flex items-center space-x-3 px-4 py-2 text-fjs-silver hover:text-white hover:bg-black/20 rounded-lg"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </motion.button>
);

const RecentChatItem: React.FC<{
  chat: any;
  onClick: () => void;
}> = ({ chat, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-black/20"
  >
    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
      <MessageCircle className="w-4 h-4 text-fjs-gold" />
    </div>
    <div className="flex-1 text-left">
      <div className="text-white font-medium truncate">{chat.name}</div>
      <div className="text-sm text-fjs-silver truncate">{chat.lastMessage}</div>
    </div>
  </motion.button>
);