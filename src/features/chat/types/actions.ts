import { ChatRoom, ChatMessage, ChatRequest } from './index';

export type ChatAction =
  | { type: 'SET_ACTIVE_ROOM'; payload: string }
  | { type: 'SEND_MESSAGE'; payload: { roomId: string; content: string } }
  | { type: 'RECEIVE_MESSAGE'; payload: ChatMessage }
  | { type: 'SEND_CHAT_REQUEST'; payload: { recipientId: string; message: string } }
  | { type: 'ACCEPT_CHAT_REQUEST'; payload: string }
  | { type: 'DECLINE_CHAT_REQUEST'; payload: string }
  | { type: 'SET_ROOMS'; payload: ChatRoom[] }
  | { type: 'SET_MESSAGES'; payload: { roomId: string; messages: ChatMessage[] } }
  | { type: 'SET_REQUESTS'; payload: ChatRequest[] };