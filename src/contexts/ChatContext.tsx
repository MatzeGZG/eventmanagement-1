import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { ChatRoom, ChatMessage, ChatRequest } from '../features/chat/types';
import { chatReducer, initialState } from '../features/chat/reducers/chatReducer';
import { ChatAction } from '../features/chat/types/actions';

interface ChatContextType {
  rooms: ChatRoom[];
  activeRoom: ChatRoom | null;
  messages: Record<string, ChatMessage[]>;
  requests: ChatRequest[];
  setActiveRoom: (roomId: string) => void;
  sendMessage: (roomId: string, content: string) => Promise<void>;
  sendChatRequest: (recipientId: string, message: string) => Promise<void>;
  acceptChatRequest: (requestId: string) => Promise<void>;
  declineChatRequest: (requestId: string) => Promise<void>;
  dispatch: React.Dispatch<ChatAction>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const setActiveRoom = useCallback((roomId: string) => {
    dispatch({ type: 'SET_ACTIVE_ROOM', payload: roomId });
  }, []);

  const sendMessage = useCallback(async (roomId: string, content: string) => {
    dispatch({ type: 'SEND_MESSAGE', payload: { roomId, content } });
  }, []);

  const sendChatRequest = useCallback(async (recipientId: string, message: string) => {
    dispatch({ type: 'SEND_CHAT_REQUEST', payload: { recipientId, message } });
  }, []);

  const acceptChatRequest = useCallback(async (requestId: string) => {
    dispatch({ type: 'ACCEPT_CHAT_REQUEST', payload: requestId });
  }, []);

  const declineChatRequest = useCallback(async (requestId: string) => {
    dispatch({ type: 'DECLINE_CHAT_REQUEST', payload: requestId });
  }, []);

  return (
    <ChatContext.Provider value={{
      ...state,
      setActiveRoom,
      sendMessage,
      sendChatRequest,
      acceptChatRequest,
      declineChatRequest,
      dispatch
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};