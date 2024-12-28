```typescript
export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  readBy: string[];
  attachments?: {
    type: 'image' | 'link' | 'event';
    url: string;
    preview?: string;
  }[];
}

export interface ChatRoom {
  id: string;
  type: 'direct' | 'group' | 'event';
  name?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  eventId?: string; // For event-specific chat rooms
}

export interface NotificationPreferences {
  directMessages: boolean;
  groupMessages: boolean;
  eventMessages: boolean;
  mentions: boolean;
  sound: boolean;
  desktop: boolean;
}
```