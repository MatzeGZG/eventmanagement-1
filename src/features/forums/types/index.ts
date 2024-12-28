```typescript
export interface Forum {
  id: string;
  title: string;
  description: string;
  category: string;
  postCount: number;
  participantCount: number;
  lastActivityAt: Date;
  isHot: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  forumId: string;
  authorId: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumParticipant {
  userId: string;
  forumId: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: Date;
  lastActivityAt: Date;
}
```