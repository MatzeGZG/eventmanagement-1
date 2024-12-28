import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ThumbsUp, Smile, Party, Angry, Sad } from 'lucide-react';

interface ReactionOverlayProps {
  isVisible: boolean;
  onReact: (type: string) => void;
  onClose: () => void;
}

export const ReactionOverlay: React.FC<ReactionOverlayProps> = ({
  isVisible,
  onReact,
  onClose
}) => {
  const reactions = [
    { icon: ThumbsUp, type: 'like', label: '👍' },
    { icon: Heart, type: 'love', label: '❤️' },
    { icon: Smile, type: 'haha', label: '😂' },
    { icon: Party, type: 'wow', label: '😮' },
    { icon: Sad, type: 'sad', label: '😢' },
    { icon: Angry, type: 'angry', label: '😠' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-full left-0 mb-2 p-2 bg-fjs-charcoal 
                     rounded-lg shadow-lg flex space-x-1"
          >
            {reactions.map(({ type, label }) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onReact(type)}
                className="w-8 h-8 flex items-center justify-center rounded-full 
                         hover:bg-black/20 text-xl"
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};