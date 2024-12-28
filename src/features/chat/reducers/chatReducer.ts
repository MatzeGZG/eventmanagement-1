import { ChatState } from '../types';
import { ChatAction } from '../types/actions';

export const initialState: ChatState = {
  rooms: [],
  activeRoom: null,
  messages: {},
  requests: []
};

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_ACTIVE_ROOM':
      const room = state.rooms.find(r => r.id === action.payload);
      return {
        ...state,
        activeRoom: room || null
      };

    case 'SEND_MESSAGE':
      const newMessage = {
        id: crypto.randomUUID(),
        roomId: action.payload.roomId,
        senderId: 'current-user', // Replace with actual user ID
        content: action.payload.content,
        type: 'text',
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false
      };

      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] || []),
            newMessage
          ]
        }
      };

    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] || []),
            action.payload
          ]
        }
      };

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload
      };

    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: action.payload.messages
        }
      };

    case 'SET_REQUESTS':
      return {
        ...state,
        requests: action.payload
      };

    default:
      return state;
  }
};