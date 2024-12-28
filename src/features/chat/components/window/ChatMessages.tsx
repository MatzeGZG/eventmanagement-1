import React, { useEffect, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';
import { useChat } from '../../../../contexts/ChatContext';
import { MessageGroup } from './MessageGroup';
import { chatService } from '../../services/chatService';
import { ChatMessage } from '../../types';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';

interface ChatMessagesProps {
  roomId: string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ roomId }) => {
  const { messages } = useChat();
  const roomMessages = messages[roomId] || [];
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Group messages by date and sender
  const groupedMessages = useMemo(() => {
    const groups: ChatMessage[][] = [];
    let currentGroup: ChatMessage[] = [];
    
    roomMessages.forEach((message, index) => {
      const prevMessage = roomMessages[index - 1];
      
      const shouldStartNewGroup = () => {
        if (!prevMessage) return true;
        
        const sameDay = isSameDay(message.createdAt, prevMessage.createdAt);
        const sameSender = message.senderId === prevMessage.senderId;
        const timeGap = message.createdAt.getTime() - prevMessage.createdAt.getTime();
        
        return !sameDay || !sameSender || timeGap > 5 * 60 * 1000; // 5 minutes gap
      };

      if (shouldStartNewGroup()) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }, [roomMessages]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    
    setLoading(true);
    try {
      const olderMessages = await chatService.getMessages(roomId, {
        before: roomMessages[0]?.createdAt,
        limit: 50
      });
      
      if (olderMessages.length < 50) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more messages:', error);
    } finally {
      setLoading(false);
    }
  }, [roomId, roomMessages, hasMore, loading]);

  return (
    <div className="flex-1 relative">
      <Virtuoso
        data={groupedMessages}
        firstItemIndex={groupedMessages.length - 1}
        initialTopMostItemIndex={groupedMessages.length - 1}
        followOutput="smooth"
        alignToBottom
        components={{
          Header: () => (
            hasMore ? (
              <div className="p-4 text-center">
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <button 
                    onClick={loadMore}
                    className="text-sm text-fjs-gold hover:text-fjs-light-gold"
                  >
                    Load more messages
                  </button>
                )}
              </div>
            ) : null
          )
        }}
        itemContent={(index, messageGroup) => (
          <div className="px-4 py-2">
            {index === 0 || !isSameDay(messageGroup[0].createdAt, groupedMessages[index - 1][0].createdAt) && (
              <div className="text-center my-4">
                <span className="px-3 py-1 bg-fjs-charcoal rounded-full text-xs text-fjs-silver">
                  {formatDateDivider(messageGroup[0].createdAt)}
                </span>
              </div>
            )}
            <MessageGroup messages={messageGroup} />
          </div>
        )}
      />
    </div>
  );
};

const formatDateDivider = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMMM d, yyyy');
};