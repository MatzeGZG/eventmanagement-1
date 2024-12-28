```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useStore } from '../../../../store';
import { usePoints } from '../../../../hooks/usePoints';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface EventCommentsProps {
  eventId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export const EventComments: React.FC<EventCommentsProps> = ({
  eventId,
  comments,
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');
  const user = useStore(state => state.user);
  const { awardPoints } = usePoints();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(newComment);
    awardPoints(5); // Award points for engagement
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <MessageCircle className="w-5 h-5 text-fjs-gold mr-2" />
        <h3 className="text-lg font-semibold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 bg-black text-white rounded-lg border border-fjs-charcoal focus:ring-2 focus:ring-fjs-gold"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={!newComment.trim()}
          className="p-2 bg-fjs-gold text-black rounded-lg disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </form>

      {/* Comments List */}
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/20 rounded-lg p-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium text-fjs-gold">
                {comment.userName}
              </span>
              <span className="text-sm text-fjs-silver">
                {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
              </span>
            </div>
            <p className="text-white">{comment.content}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
```