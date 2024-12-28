export interface SocialProfile {
  interests: string[];
  locations: string[];
  activities: string[];
  connections: number;
  engagement: number;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  allowMessagesFrom: 'everyone' | 'friends' | 'none';
  showOnlineStatus: boolean;
  allowTagging: boolean;
  showLocation: boolean;
  ageRestriction?: number;
}

export interface ChatAccessLevels {
  directMessages: 'everyone' | 'friends' | 'none';
  groupChats: 'public' | 'friends' | 'invite';
  eventChats: 'participants' | 'friends' | 'none';
}

export interface ProfileSetupStep {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}