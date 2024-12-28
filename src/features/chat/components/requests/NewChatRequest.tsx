import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useChat } from '../../../../contexts/ChatContext';

interface NewChatRequestProps {
  recipientId: string;
  onClose: () => void;
}

export const NewChatRequest: React.FC<NewChatRequestProps> = ({ recipientId, onClose }) => {
  const [message, setMessage] = useState('');
  const { sendChatRequest } = useChat();

  const handleSubmit = async () => {
    if (!message.trim()) return;
    await sendChatRequest(recipientId, message);
    onClose();
  };

  return (
    <div className="p-4 bg-fjs-charcoal rounded-lg">
      <h3 className="text-lg font-semibold text-fjs-gold mb-4">
        Send Chat Request
      </h3>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message to introduce yourself..."
        className="w-full h-32 bg-black/30 text-white rounded-lg p-3 mb-4
                 focus:ring-2 focus:ring-fjs-gold resize-none"
      />

      <div className="flex justify-end space-x-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-4 py-2 text-fjs-silver hover:text-white transition-colors"
        >
          Cancel
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!message.trim()}
          className="px-4 py-2 bg-fjs-gold text-black rounded-lg font-medium
                   hover:bg-fjs-light-gold transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4 inline-block mr-2" />
          Send Request
        </motion.button>
      </div>
    </div>
  );
};