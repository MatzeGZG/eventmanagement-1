import { useState, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToast } from '../../../hooks/useToast';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const useLiveChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('support_messages')
        .insert([{ content, user_id: user.id }]);

      if (error) throw error;

      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);

      // Simulate support response
      setTimeout(() => {
        const response: ChatMessage = {
          id: crypto.randomUUID(),
          content: "Thanks for your message! Our support team will get back to you soon.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);

    } catch (error) {
      showToast('Failed to send message', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  return {
    messages,
    sendMessage,
    loading
  };
};