import React, { useState } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '../../../../types/event';
import { formatDate } from '../../../../utils/date';
import { LazyImage } from '../../../../components/common/LazyImage';
import { InteractionButtons } from '../interactions/InteractionButtons';
import { CommentInput } from '../interactions/CommentInput';
import { useInteractions } from '../../hooks/useInteractions';

interface FeedEventProps {
  event: Event;
}

export const FeedEvent: React.FC<FeedEventProps> = ({ event }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { handleLike, handleComment, handleShare } = useInteractions();

  const onLike = async () => {
    await handleLike({ id: event.id, type: 'event', data: event, timestamp: event.date });
    setIsLiked(!isLiked);
  };

  const onComment = () => {
    setShowComments(true);
  };

  const onSubmitComment = async (comment: string) => {
    await handleComment(
      { id: event.id, type: 'event', data: event, timestamp: event.date },
      comment
    );
  };

  return (
    <div className="bg-fjs-charcoal rounded-xl overflow-hidden shadow-lg hover:shadow-gold transition-all">
      {event.images[0] && (
        <div className="aspect-video relative">
          <LazyImage
            src={event.images[0]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-fjs-gold mb-3">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-fjs-silver">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center text-fjs-silver">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location.city}, {event.location.country}
          </div>
          <div className="flex items-center text-fjs-silver">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees.length} / {event.capacity} attendees
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-full bg-black/30 text-fjs-gold"
            >
              {tag}
            </span>
          ))}
        </div>

        <InteractionButtons
          likes={event.likes || 0}
          comments={event.comments || 0}
          shares={event.shares || 0}
          onLike={onLike}
          onComment={onComment}
          onShare={() => handleShare({ 
            id: event.id, 
            type: 'event', 
            data: event, 
            timestamp: event.date 
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