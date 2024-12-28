```typescript
import { useCallback, useEffect } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';

export const useChatRequests = () => {
  const { dispatch } = useChat();
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  const loadRequests = useCallback(async () => {
    try {
      const requests = await chatService.getChatRequests();
      dispatch({ type: 'SET_REQUESTS', payload: requests });
    } catch (error) {
      showToast('Failed to load chat requests', 'error');
    }
  }, [dispatch, showToast]);

  const handleNewRequest = useCallback(async (recipientId: string, message: string) => {
    try {
      const request = await chatService.sendChatRequest({
        recipientId,
        message,
        status: 'pending'
      });
      dispatch({ type: 'SET_REQUESTS', payload: [request] });
      showToast('Chat request sent successfully', 'success');
    } catch (error) {
      showToast('Failed to send chat request', 'error');
      throw error;
    }
  }, [dispatch, showToast]);

  const handleAcceptRequest = useCallback(async (requestId: string) => {
    try {
      await chatService.updateChatRequest(requestId, 'accepted');
      loadRequests();
      awardPoints(10); // Award points for social interaction
      showToast('Chat request accepted', 'success');
    } catch (error) {
      showToast('Failed to accept request', 'error');
      throw error;
    }
  }, [loadRequests, awardPoints, showToast]);

  const handleDeclineRequest = useCallback(async (requestId: string) => {
    try {
      await chatService.updateChatRequest(requestId, 'declined');
      loadRequests();
      showToast('Chat request declined', 'info');
    } catch (error) {
      showToast('Failed to decline request', 'error');
      throw error;
    }
  }, [loadRequests, showToast]);

  useEffect(() => {
    loadRequests();

    const subscription = chatService.subscribeToRequests((request) => {
      loadRequests();
      showToast('New chat request received', 'info');
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadRequests, showToast]);

  return {
    handleNewRequest,
    handleAcceptRequest,
    handleDeclineRequest
  };
};
```