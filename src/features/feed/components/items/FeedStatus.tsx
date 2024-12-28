import React, { useState } from 'react';
import { Status } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { InteractionButtons } from '../interactions/InteractionButtons';
import { CommentInput } from '../interactions/CommentInput';
import { useInteractions } from '../../hooks/useInteractions';

interface FeedStatusProps {
  status: Status;
}

export const FeedStatus: React.FC<FeedStatusProps> = ({ status }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { handleLike, handleComment, handleShare } = useInteractions();

  const onLike = async () => {
    await handleLike({ id: status.id, type: 'status', data: status, timestamp: status.timestamp });
    setIsLiked(!isLiked);
  };

  const onComment = () => {
    setShowComments(true);
  };

  const onSubmitComment = async (comment: string) => {
    await handleComment(
      { id: status.id, type: 'status', data: status, timestamp: status.timestamp },
      comment
    );
  };

  return (
    <div className="bg-fjs-charcoal rounded-xl overflow-hidden shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={status.author.avatar || 'https://via.placeholder.com/40'}
            alt={status.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-medium text-white">{status.author.name}</h4>
            <p className="text-sm text-fjs-silver">
              {formatDistanceToNow(status.timestamp, { addSuffix: true })}
            </p>
          </div>
        </div>

        <p className="text-white mb-4">{status.content}</p>

        {status.image && (
          <img
            src={status.image}
            alt="Status update"
            className="w-full rounded-lg mb-4"
          />
        )}

        <InteractionButtons
          likes={status.likes}
          comments={status.comments}
          shares={status.shares}
          onLike={onLike}
          onComment={onComment}
          onShare={() => handleShare({ 
            id: status.id, 
            type: 'status', 
            data: status, 
            timestamp: status.timestamp 
          })}
          isLiked={isLiked}
        />

        {showComments && (
          <div className="mt-4">
            <CommentInput onSubmit={onSubmitComment} />
          </div>
        )}
      </div>
    </div>
  );
};