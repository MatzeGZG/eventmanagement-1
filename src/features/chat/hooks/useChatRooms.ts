```typescript
import { useCallback, useEffect } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { useToast } from '../../../hooks/useToast';
import { ChatRoom } from '../types';

export const useChatRooms = () => {
  const { dispatch } = useChat();
  const { showToast } = useToast();

  const loadRooms = useCallback(async () => {
    try {
      const rooms = await chatService.getRooms();
      dispatch({ type: 'SET_ROOMS', payload: rooms });
    } catch (error) {
      showToast('Failed to load chat rooms', 'error');
    }
  }, [dispatch, showToast]);

  const createRoom = useCallback(async (room: Partial<ChatRoom>) => {
    try {
      const newRoom = await chatService.createRoom(room);
      dispatch({ type: 'SET_ROOMS', payload: [newRoom] });
      showToast('Chat room created successfully', 'success');
      return newRoom;
    } catch (error) {
      showToast('Failed to create chat room', 'error');
      throw error;
    }
  }, [dispatch, showToast]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  return {
    loadRooms,
    createRoom
  };
};
```