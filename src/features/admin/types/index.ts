export interface AdminStats {
  totalUsers: number;
  activeEvents: number;
  mediaItems: number;
  platformGrowth: number;
  userGrowth: number;
  eventGrowth: number;
  mediaGrowth: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'active' | 'suspended' | 'banned';
  lastLogin: Date;
}

export interface AdminEvent {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  reportCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminMedia {
  id: string;
  type: 'image' | 'video';
  status: 'pending' | 'approved' | 'rejected';
  reportCount: number;
  uploadedAt: Date;
  reviewedAt?: Date;
}