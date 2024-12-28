export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  replyTo?: string;
}

export interface ChatRoom {
  id: string;
  type: 'direct' | 'group' | 'event';
  name: string;
  description?: string;
  createdBy: string;
  eventId?: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  metadata: Record<string, any>;
  settings: {
    maxMembers: number;
    allowMedia: boolean;
    messageRetentionDays: number;
  };
}

export interface ChatMembership {
  roomId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
  lastReadAt: Date;
  isMuted: boolean;
  notificationPreferences: {
    mentions: boolean;
    allMessages: boolean;
  };
}

export interface ChatRequest {
  id: string;
  senderId: string;
  recipientId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  updatedAt: Date;
}