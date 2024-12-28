```typescript
import { useState, useCallback } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import { chatService } from '../services/chatService';
import { useToast } from '../../../hooks/useToast';
import { usePoints } from '../../../hooks/usePoints';
import { useAIModeration } from '../../moderation/hooks/useAIModeration';

export const useChatMessages = (roomId: string) => {
  const [sending, setSending] = useState(false);
  const { dispatch } = useChat();
  const { showToast } = useToast();
  const { awardPoints } = usePoints();

  // Initialize AI moderation
  const { moderateContent } = useAIModeration({
    enabled: true,
    autoBlock: true,
    minimumConfidence: 0.8,
    flaggedContentCallback: (result) => {
      console.warn('Content moderation flag:', result);
      // Could implement admin notification here
    }
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    setSending(true);
    try {
      // First, moderate the content
      const moderationResult = await moderateContent(content);
      
      if (!moderationResult.isAllowed) {
        showToast(
          moderationResult.reason || 'This message cannot be sent as it violates our community guidelines.',
          'error'
        );
        return;
      }

      const message = await chatService.sendMessage({
        roomId,
        content,
        type: 'text'
      });

      dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
      awardPoints(5); // Award points for engagement
    } catch (error) {
      showToast('Failed to send message', 'error');
      throw error;
    } finally {
      setSending(false);
    }
  }, [roomId, dispatch, awardPoints, showToast, moderateContent]);

  const sendMediaMessage = useCallback(async (file: File) => {
    setSending(true);
    try {
      // For media messages, we could implement additional checks
      // like scanning images for inappropriate content
      const message = await chatService.sendMessage({
        roomId,
        content: '[Media]',
        type: 'image',
        metadata: { fileName: file.name }
      });

      dispatch({ type: 'RECEIVE_MESSAGE', payload: message });
      awardPoints(10); // Extra points for media sharing
    } catch (error) {
      showToast('Failed to send media', 'error');
      throw error;
    } finally {
      setSending(false);
    }
  }, [roomId, dispatch, awardPoints, showToast]);

  return {
    sending,
    sendMessage,
    sendMediaMessage
  };
};
```