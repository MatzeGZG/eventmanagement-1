import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  placeholder = 'Write a comment...'
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (!comment.trim()) return;
    onSubmit(comment);
    setComment('');
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder={placeholder}
        className="flex-1 bg-black/30 text-white px-4 py-2 rounded-full 
                   focus:outline-none focus:ring-2 focus:ring-fjs-gold"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSubmit}
        disabled={!comment.trim()}
        className="p-2 text-fjs-gold hover:bg-black/20 rounded-full 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
      </motion.button>
    </div>
  );
};