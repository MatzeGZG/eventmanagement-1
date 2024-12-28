import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface InteractionButtonsProps {
  likes: number;
  comments: number;
  shares: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  isLiked?: boolean;
}

export const InteractionButtons: React.FC<InteractionButtonsProps> = ({
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
  isLiked = false
}) => {
  return (
    <div className="flex items-center justify-between text-fjs-silver">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onLike}
        className={`flex items-center space-x-2 hover:text-fjs-gold transition-colors ${
          isLiked ? 'text-fjs-gold' : ''
        }`}
      >
        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        <span>{likes}</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onComment}
        className="flex items-center space-x-2 hover:text-fjs-gold transition-colors"
      >
        <MessageCircle className="w-5 h-5" />
        <span>{comments}</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onShare}
        className="flex items-center space-x-2 hover:text-fjs-gold transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span>{shares}</span>
      </motion.button>
    </div>
  );
};