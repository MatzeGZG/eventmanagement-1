```typescript
import { useCallback, useEffect } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { useToast } from '../../../hooks/useToast';

export const useChatRoom = (roomId: string) => {
  const { dispatch } = useChat();
  const { showToast } = useToast();

  const loadMessages = useCallback(async () => {
    try {
      const messages = await chatService.getMessages(roomId);
      dispatch({ 
        type: 'SET_MESSAGES', 
        payload: { roomId, messages } 
      });
    } catch (error) {
      showToast('Failed to load messages', 'error');
    }
  }, [roomId, dispatch, showToast]);

  useEffect(() => {
    loadMessages();

    const subscription = chatService.subscribeToMessages(roomId, (message) => {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, loadMessages, dispatch]);

  return { loadMessages };
};
```