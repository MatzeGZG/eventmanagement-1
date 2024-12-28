import { useState, useCallback } from 'react';
import { generateResponse } from '../utils/chatbotPatterns';
import { ChatMessage } from '../types';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true);
    try {
      // Add user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Generate bot response
      const response = await generateResponse(content);
      
      // Add bot message
      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        category: response.category
      };
      setMessages(prev => [...prev, botMessage]);

    } finally {
      setLoading(false);
    }
  }, []);

  return {
    messages,
    loading,
    sendMessage
  };
};