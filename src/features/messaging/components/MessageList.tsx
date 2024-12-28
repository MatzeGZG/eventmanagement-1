```typescript
import React from 'react';
import { format } from 'date-fns';
import { useStore } from '../../../store';
import { Message } from '../types';

interface MessageListProps {
  roomId: string;
}

export const MessageList: React.FC<MessageListProps> = ({ roomId }) => {
  const user = useStore(state => state.user);
  const messages: Message[] = []; // TODO: Get messages from store/backend

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.senderId === user?.id;

        return (
          <div
            key={message.id}
            className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                isOwnMessage
                  ? 'bg-fjs-gold text-black'
                  : 'bg-fjs-charcoal text-white'
              }`}
            >
              {!isOwnMessage && (
                <div className="text-xs text-fjs-silver mb-1">
                  {message.senderId}
                </div>
              )}
              <div className="break-words">{message.content}</div>
              <div className="text-xs mt-1 opacity-75">
                {format(message.timestamp, 'HH:mm')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
```