import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Key, Book, Gift, MessageCircle } from 'lucide-react';
import { PasswordReset } from './PasswordReset';
import { GamificationGuide } from './GamificationGuide';
import { HelpCenter } from './HelpCenter';
import { LiveChat } from './LiveChat';

export const SupportHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'help' | 'password' | 'gamification' | 'chat'>('help');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <TabButton
          icon={HelpCircle}
          label="Help Center"
          active={activeTab === 'help'}
          onClick={() => setActiveTab('help')}
        />
        <TabButton
          icon={Key}
          label="Password Reset"
          active={activeTab === 'password'}
          onClick={() => setActiveTab('password')}
        />
        <TabButton
          icon={Gift}
          label="Rewards Guide"
          active={activeTab === 'gamification'}
          onClick={() => setActiveTab('gamification')}
        />
        <TabButton
          icon={MessageCircle}
          label="Live Chat"
          active={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'help' && <HelpCenter />}
        {activeTab === 'password' && <PasswordReset />}
        {activeTab === 'gamification' && <GamificationGuide />}
        {activeTab === 'chat' && <LiveChat />}
      </motion.div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.FC<any>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
      active ? 'bg-fjs-gold text-black' : 'text-fjs-silver hover:bg-fjs-charcoal'
    }`}
  >
    <Icon className="w-5 h-5 mr-2" />
    <span className="font-medium">{label}</span>
  </motion.button>
);