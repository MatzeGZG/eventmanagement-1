```tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Image, Smile } from 'lucide-react';
import { ReactionPicker } from '../reactions/ReactionPicker';

interface MessageInputProps {
  onSend: (content: string) => void;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  placeholder = "Type a message..."
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 text-fjs-gold hover:bg-black/20 rounded-full"
        >
          <Image className="w-5 h-5" />
        </motion.button>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-full"
          >
            <Smile className="w-5 h-5" />
          </motion.button>

          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2">
              <ReactionPicker onSelect={handleEmojiSelect} />
            </div>
          )}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 bg-black text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-fjs-gold"
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="p-2 text-fjs-gold hover:bg-black/20 rounded-full disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
```