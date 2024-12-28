import React from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Feedback } from '../../types/issues';
import { formatDistanceToNow } from 'date-fns';

interface FeedbackListProps {
  feedback: Feedback[];
  loading: boolean;
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ feedback, loading }) => {
  if (loading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="bg-fjs-charcoal rounded-xl p-6">
      <h3 className="text-lg font-semibold text-fjs-gold mb-4">User Feedback</h3>
      
      <div className="space-y-4">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="bg-black/20 rounded-lg p-4 hover:bg-black/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-fjs-gold" />
                  <span className="text-sm font-medium text-white">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-fjs-silver mt-2">{item.content}</p>
              </div>
              <span className="text-xs text-fjs-silver">
                {formatDistanceToNow(item.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-fjs-silver">
                  From {item.userName}
                </span>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="w-3 h-3 text-fjs-silver" />
                  <span className="text-xs text-fjs-silver">{item.upvotes}</span>
                </div>
              </div>
              <button className="text-sm text-fjs-gold hover:text-fjs-light-gold">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};