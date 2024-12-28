```typescript
import React, { useState } from 'react';
import { Send, Image, Smile, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChat } from '../../../../contexts/ChatContext';
import { VoiceMessage } from '../voice/VoiceMessage';
import { EmojiPicker } from '../emoji/EmojiPicker';
import { useChatMessages } from '../../hooks/useChatMessages';

interface ChatInputProps {
  roomId: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ roomId }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const { sending, sendMessage } = useChatMessages(roomId);

  const handleSubmit = async () => {
    if (!message.trim() || sending) return;
    
    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      // Error is handled by the hook
      console.error('Failed to send message:', error);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 border-t border-fjs-charcoal">
      {showVoiceRecorder ? (
        <VoiceMessage onRecord={() => {}} />
      ) : (
        <div className="flex items-center space-x-2">
          <button className="p-2 text-fjs-gold hover:bg-black/20 rounded-full transition-colors">
            <Image className="w-5 h-5" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-fjs-gold hover:bg-black/20 rounded-full transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            {showEmojiPicker && (
              <EmojiPicker
                onSelect={handleEmojiSelect}
                onClose={() => setShowEmojiPicker(false)}
              />
            )}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1 bg-fjs-charcoal text-white px-4 py-2 rounded-full 
                     focus:outline-none focus:ring-2 focus:ring-fjs-gold
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />

          <button
            onClick={() => setShowVoiceRecorder(true)}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-full transition-colors"
          >
            <Mic className="w-5 h-5" />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!message.trim() || sending}
            className="p-2 text-fjs-gold hover:bg-black/20 rounded-full transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
};
```