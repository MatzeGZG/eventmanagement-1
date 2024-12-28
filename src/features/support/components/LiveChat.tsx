import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { useLiveChat } from '../hooks/useLiveChat';

export const LiveChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, loading } = useLiveChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="bg-fjs-charcoal rounded-lg overflow-hidden h-[600px] flex flex-col">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] rounded-lg p-3 ${
              msg.isUser ? 'bg-fjs-gold text-black' : 'bg-black/30 text-white'
            }`}>
              <p>{msg.content}</p>
              <span className="text-xs opacity-75 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-black/20">
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-full"
          >
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-black text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fjs-gold"
          />
          <button
            type="submit"
            disabled={!message.trim() || loading}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-full disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};