import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Calendar, MapPin } from 'lucide-react';
import { useChatbot } from '../../support/hooks/useChatbot';

interface ChatbotSuggestionsProps {
  onSuggestionSelect: (suggestion: string) => void;
}

export const ChatbotSuggestions: React.FC<ChatbotSuggestionsProps> = ({ onSuggestionSelect }) => {
  const { messages, sendMessage } = useChatbot();

  const suggestions = [
    { icon: Search, text: "Find tech events in my area" },
    { icon: Calendar, text: "What's happening this weekend?" },
    { icon: MapPin, text: "Show me networking events nearby" },
    { icon: MessageCircle, text: "Help me discover new experiences" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-fjs-charcoal rounded-lg shadow-lg p-4"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">I can help you find:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {suggestions.map((suggestion, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionSelect(suggestion.text)}
              className="flex items-center space-x-2 p-3 bg-black/20 rounded-lg text-fjs-silver hover:text-fjs-gold"
            >
              <suggestion.icon className="w-5 h-5" />
              <span>{suggestion.text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mt-4 space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`rounded-lg p-3 max-w-[80%] ${
                message.isUser ? 'bg-fjs-gold text-black' : 'bg-black/20 text-white'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};